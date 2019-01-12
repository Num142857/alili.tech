---
title: 'socket.io搭配pm2（cluster）集群解决方案' 
date: 2019-01-13 2:30:11
hidden: true
slug: sukzah87jdn
categories: [reprint]
---

{{< raw >}}

                    
<p>可以收藏<a href="http://www.cnblogs.com/accordion/" rel="nofollow noreferrer" target="_blank">我的博客</a></p>
<h2 id="articleHeader0">socket.io与cluster</h2>
<p>在线上系统中，需要使用node的多进程模型，我们可以自己实现简易的基于cluster模式的socket分发模型，也可以使用比较稳定的pm2这样进程管理工具。在常规的http服务中，这套模式一切正常，可是一旦server中集成了socket.io服务就会导致ws通道建立失败，即使通过backup的polling方式仍会出现时断时连的现象，因此我们需要解决这种问题，让socket.io充分利用多核。</p>
<blockquote><p>在这里之所以提到socket.io而未说websocket服务，是因为socket.io在封装websocket基础上又保证了可用性。在客户端未提供websocket功能的基础上使用xhr polling、jsonp或forever iframe的方式进行兼容，同时在建立ws连接前往往通过几次http轮训确保ws服务可用，因此socket.io并不等于websocket。再往底层深入研究，socket.io其实并没有做真正的websocket兼容，而是提供了上层的接口以及namespace服务，真正的逻辑则是在“engine.io”模块。该模块实现握手的http代理、连接升级、心跳、传输方式等，因此研究engine.io模块才能清楚的了解socket.io实现机制。</p></blockquote>
<h2 id="articleHeader1">场景重现</h2>
<p>服务端采用express+socket.io的组合方案，搭配pm2的cluster模式，实现一个简易的b/s通信demo：</p>
<p>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

io
  .on('connection', function(socket) {
      socket.on('disconnect', function() {
          console.log('/: disconnect-------->')
      });

      socket.on('b:message', function() {
          socket.emit('s:message', '/: '+port);
          console.log('/: '+port)
      });
  });

io.of('/ws')
  .on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('/ws: disconnect-------->')
    });

    socket.on('b:message', function() {
        socket.emit('/ws: message', port);
    });
});

app.get('/page',function(req,res){
    res.sendFile(path.join(process.cwd(),'./index.html'));
});

server.listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)(),
    server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer(app),
    io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(server);

io
  .on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{
      socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'/: disconnect--------&gt;'</span>)
      });

      socket.on(<span class="hljs-string">'b:message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          socket.emit(<span class="hljs-string">'s:message'</span>, <span class="hljs-string">'/: '</span>+port);
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'/: '</span>+port)
      });
  });

io.of(<span class="hljs-string">'/ws'</span>)
  .on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{
    socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'/ws: disconnect--------&gt;'</span>)
    });

    socket.on(<span class="hljs-string">'b:message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        socket.emit(<span class="hljs-string">'/ws: message'</span>, port);
    });
});

app.get(<span class="hljs-string">'/page'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    res.sendFile(path.join(process.cwd(),<span class="hljs-string">'./index.html'</span>));
});

server.listen(<span class="hljs-number">8080</span>);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
        var btn = document.getElementById('btn1');
        btn.addEventListener('click',function(){
            var socket = io.connect('http://127.0.0.1:8080/ws',{
                reconnection: false
            });
            socket.on('connect',function(){
                // 发起“脚手架安装”请求
                socket.emit('b:message',{});

                socket.on('s:message',function(d){
                    console.log(d);
                });

            });

            socket.on('error',function(err){
                console.log(err);
            })
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn1'</span>);
        btn.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> socket = io.connect(<span class="hljs-string">'http://127.0.0.1:8080/ws'</span>,{
                <span class="hljs-attr">reconnection</span>: <span class="hljs-literal">false</span>
            });
            socket.on(<span class="hljs-string">'connect'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">// 发起“脚手架安装”请求</span>
                socket.emit(<span class="hljs-string">'b:message'</span>,{});

                socket.on(<span class="hljs-string">'s:message'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d</span>)</span>{
                    <span class="hljs-built_in">console</span>.log(d);
                });

            });

            socket.on(<span class="hljs-string">'error'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                <span class="hljs-built_in">console</span>.log(err);
            })
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>pm2.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;apps&quot;: [
    {
      &quot;name&quot;: &quot;ws&quot;,
      &quot;script&quot;: &quot;./app.js&quot;,
      &quot;env&quot;: {
        &quot;NODE_ENV&quot;: &quot;development&quot;
      },
      &quot;env_production&quot;: {
        &quot;NODE_ENV&quot;: &quot;production&quot;
      },
      &quot;instances&quot;: 4,
      &quot;exec_mode&quot;: &quot;cluster&quot;,
      &quot;max_restarts&quot; : 3,
      &quot;restart_delay&quot; : 5000,
      &quot;log_date_format&quot; : &quot;YYYY-MM-DD HH:mm Z&quot;,
      &quot;combine_logs&quot; : true
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"apps"</span>: [
    {
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"ws"</span>,
      <span class="hljs-attr">"script"</span>: <span class="hljs-string">"./app.js"</span>,
      <span class="hljs-attr">"env"</span>: {
        <span class="hljs-attr">"NODE_ENV"</span>: <span class="hljs-string">"development"</span>
      },
      <span class="hljs-attr">"env_production"</span>: {
        <span class="hljs-attr">"NODE_ENV"</span>: <span class="hljs-string">"production"</span>
      },
      <span class="hljs-attr">"instances"</span>: <span class="hljs-number">4</span>,
      <span class="hljs-attr">"exec_mode"</span>: <span class="hljs-string">"cluster"</span>,
      <span class="hljs-attr">"max_restarts"</span> : <span class="hljs-number">3</span>,
      <span class="hljs-attr">"restart_delay"</span> : <span class="hljs-number">5000</span>,
      <span class="hljs-attr">"log_date_format"</span> : <span class="hljs-string">"YYYY-MM-DD HH:mm Z"</span>,
      <span class="hljs-attr">"combine_logs"</span> : <span class="hljs-literal">true</span>
    }
  ]
}</code></pre>
<p>这样，执行命令<code>pm2 start pm2.json</code>即可开启服务，访问<code>127.0.0.1:8080/page</code>，点击按钮发起ws连接，观察控制台即可。</p>
<p>下图清晰显示了socket.io握手的错误：<br><span class="img-wrap"><img data-src="/img/remote/1460000009622161?w=1628&amp;h=412" src="https://static.alili.tech/img/remote/1460000009622161?w=1628&amp;h=412" alt="ws握手失败" title="ws握手失败" style="cursor: pointer; display: inline;"></span></p>
<p>可见在websocket连接建立之前多出了3个xhr请求，而websocket连接建立失败后又多出了几个xhr请求，同时最后两个xhr请求失败了。</p>
<p>socket.io没有采用直接建立websocket连接的粗暴方式，而是首先通过http请求（xhr）访问服务端的相关轮训配置信息以及<strong>sid</strong>。此处sid类似sessionID，但是它唯一标识连接，可理解为socketId，以后每次http请求cookie中都必须携带sid（httponly）；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009622162?w=1478&amp;h=182" src="https://static.alili.tech/img/remote/1460000009622162?w=1478&amp;h=182" alt="初次握手信息" title="初次握手信息" style="cursor: pointer; display: inline;"></span></p>
<p>第二、三个请求用于确认连接，在socket.io中，post请求是客户端发送消息给服务端的唯一形式，而且post响应一定是“ok”，它的“content-length”一定为2；而get请求主要用于轮训，同时获取服务端的相关消息，这会在下文中有体现；</p>
<p>第四个websocket连接请求失败，这主要是由于与后端http握手失败造成的；</p>
<p>第五个请求为xhr方式的post请求，它是作为websocket通道建立失败后的一种兼容性处理，上文讲述了socket.io的post请求只在<strong>客户端需要发送消息给服务端时才会使用</strong>，因此，为了证实我们查看消息体：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009622163?w=1574&amp;h=426" src="https://static.alili.tech/img/remote/1460000009622163?w=1574&amp;h=426" alt="post消息体" title="post消息体" style="cursor: pointer;"></span></p>
<p>可见，它携带了客户端发出的消息类型<strong>b:message</strong>,同时包含消息体<strong>{}</strong>空对象。对应的，服务端返回“OK”；</p>
<p>第六个请求为xhr方式的get请求，用来获取服务端对第五个请求的响应。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009622164?w=520&amp;h=150" src="https://static.alili.tech/img/remote/1460000009622164?w=520&amp;h=150" alt="响应" title="响应" style="cursor: pointer;"></span></p>
<p>至此，大致分析了socket.io建立连接的大致过程以及连接建立失败后如何兜底的方案，下面分析为何出现握手失败的问题。</p>
<h2 id="articleHeader2">原因何在</h2>
<p>实例中pm2主进程开启了4个工作进程，由主进程侦听8080端口并分发请求给工作进程。pm2进程在分发请求的阶段采用了某种算法的均衡，如round-robin或者其他hash方式（但不是iphash），因此在socket.io客户端连接建立阶段发送的多个xhr请求，会被pm2定位到不同的worker进程中。前文中提到每个xhr请求都会携带sid字段标识当前连接，因此当一个携带sid字段的请求被pm2定位到另一个与该连接无关的worker时，就会造成请求失败，返回<strong>{"code":1,"message":"Session ID unknown"}</strong>错误；即使前三次xhr握手成功，进入websocket连接升级阶段，负责侦听update事件的worker也往往不是之前的那个worder，因此导致websocket连接建立失败。</p>
<p>一言以蔽之，客户端多次请求的服务端进程不是同一个进程才导致的ws连接无法成功建立。<br>那么如何才能解决呢？最简单的方案就是确保客户端的每次请求都可以定位到同一个服务进程即可。当然，分布式session同样可以解决问题，依托第三方缓存类似redis并配合一致性hash算法，确保所有服务进程都可以获取到连接信息，相互配合完成连接建立。但这也仅仅是作者在理论上分析的一种实现方式，并没有测试通过，因为这种分布式架构不仅实现繁杂而且引入了相关依赖redis，不太可取。</p>
<p>那么下文主要针对<strong>确保客户端的每次请求都可以定位到同一个服务进程</strong>这一点实现解决方案。</p>
<h2 id="articleHeader3">多种实现</h2>
<h3 id="articleHeader4">官方实现</h3>
<p>官方提供了一种比较轻便的架构：<strong>nginx反向代理+iphash</strong></p>
<p>我们的示例demo中的http服务器只侦听8080端口，因此必须由pm2分发请求，否则会出现端口占用的错误发生。但是，官方的解决方案是每个进程的socket.io服务器创建不同端口的http服务器，专注用于http握手和升级，由nginx做握手请求的代理。而且针对nginx必须设置<strong>iphash</strong>，保证同一个客户端的多次请求定位到后端同一个服务进程。</p>
<p>这样，示例demo中会占用5个端口，其中8080端口为公用的http服务器使用，其他四个端口则只用于ws连接握手。但是这四个端口却如何选取呢？为了保证扩展性以及顺序性，采用与pm2相兼容的方案。pm2会为每个worker进程分配一个id，并且将该id绑定到进程的环境变量中，那么我们就可以利用该worker id生成4个不同的端口号。</p>
<p>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var app = require('express')(),
    server = require('http').createServer(app),
    port = 3131 + parseInt(process.env.NODE_APP_INSTANCE),
    io = require('socket.io')(port);

io
  .on('connection', function(socket) {
      socket.on('disconnect', function() {
          console.log('/: disconnect-------->')
      });

      socket.on('b:message', function() {
          socket.emit('s:message', '/: '+port);
          console.log('/: '+port)
      });
  });

io.of('/ws')
  .on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('disconnect-------->')
    });

    socket.on('b:message', function() {
        socket.emit('s:message', port);
    });
});

app.get('/abc',function(req,res){
    res.sendFile(path.join(process.cwd(),'./index.html'));
});

server.listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)(),
    server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer(app),
    port = <span class="hljs-number">3131</span> + <span class="hljs-built_in">parseInt</span>(process.env.NODE_APP_INSTANCE),
    io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(port);

io
  .on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{
      socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'/: disconnect--------&gt;'</span>)
      });

      socket.on(<span class="hljs-string">'b:message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          socket.emit(<span class="hljs-string">'s:message'</span>, <span class="hljs-string">'/: '</span>+port);
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'/: '</span>+port)
      });
  });

io.of(<span class="hljs-string">'/ws'</span>)
  .on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{
    socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'disconnect--------&gt;'</span>)
    });

    socket.on(<span class="hljs-string">'b:message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        socket.emit(<span class="hljs-string">'s:message'</span>, port);
    });
});

app.get(<span class="hljs-string">'/abc'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    res.sendFile(path.join(process.cwd(),<span class="hljs-string">'./index.html'</span>));
});

server.listen(<span class="hljs-number">8080</span>);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <script>
        var btn = document.getElementById('btn1');
        btn.addEventListener('click',function(){
            var socket = io.connect('http://ws.vd.net/ws',{
                reconnection: false
            });
            socket.on('connect',function(){
                // 发起“脚手架安装”请求
                socket.emit('b:message',{a:1});

                socket.on('s:message',function(d){
                    console.log(d);
                });

            });

            socket.on('error',function(err){
                console.log(err);
            })
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn1'</span>);
        btn.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> socket = io.connect(<span class="hljs-string">'http://ws.vd.net/ws'</span>,{
                <span class="hljs-attr">reconnection</span>: <span class="hljs-literal">false</span>
            });
            socket.on(<span class="hljs-string">'connect'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">// 发起“脚手架安装”请求</span>
                socket.emit(<span class="hljs-string">'b:message'</span>,{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>});

                socket.on(<span class="hljs-string">'s:message'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d</span>)</span>{
                    <span class="hljs-built_in">console</span>.log(d);
                });

            });

            socket.on(<span class="hljs-string">'error'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                <span class="hljs-built_in">console</span>.log(err);
            })
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>nginx.conf</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    upstream io_nodes {
      ip_hash;
      server 127.0.0.1:3131;
      server 127.0.0.1:3132;
      server 127.0.0.1:3133;
      server 127.0.0.1:3134;
    }
    server {
        listen 80;
        server_name ws.vd.net;
        location / {
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection &quot;upgrade&quot;;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_http_version 1.1;
          proxy_pass http://io_nodes;
        }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>    upstream io_nodes {
      ip_hash<span class="hljs-comment">;</span>
      server <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">3131</span><span class="hljs-comment">;</span>
      server <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">3132</span><span class="hljs-comment">;</span>
      server <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">3133</span><span class="hljs-comment">;</span>
      server <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">3134</span><span class="hljs-comment">;</span>
    }
    server {
        listen <span class="hljs-number">80</span><span class="hljs-comment">;</span>
        server_name ws.vd.net<span class="hljs-comment">;</span>
        location / {
          proxy_set_header Upgrade $http_upgrade<span class="hljs-comment">;</span>
          proxy_set_header Connection <span class="hljs-string">"upgrade"</span><span class="hljs-comment">;</span>
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for<span class="hljs-comment">;</span>
          proxy_set_header Host $host<span class="hljs-comment">;</span>
          proxy_http_version <span class="hljs-number">1.1</span><span class="hljs-comment">;</span>
          proxy_pass http://io_nodes<span class="hljs-comment">;</span>
        }
  }</code></pre>
<p>在本机绑定hosts地址后开启nginx服务，同时开启服务器，点击按钮建立ws连接成功。</p>
<h2 id="articleHeader5">服务端路由</h2>
<p>服务端路由，意义在于“<strong>服务端做worker的负载均衡，并将选择的worker ip和端口渲染在页面，之后浏览器的所有ws连接默认连接到对应 ip:port的服务器中</strong>”。这样只要是服务端渲染的页面都可以采用这种方式实现。</p>
<p>如果页面采用前端异步渲染，仍可以采用这种方式，不过首先通过xhr请求向服务端获取需要握手的http服务器的ip和端口，然后在进行ws连接。</p>
<p>服务端路由的前提仍然是需要针对每个ws服务器分配一个端口，只不过去掉nginx由服务端做ip hash。采用服务端路由架构清晰，而且实现容易，兼容性好。</p>
<h2 id="articleHeader6">上帝进程路由</h2>
<p>此处的上帝进程即为主进程，类似pm2进程。上帝进程路由则是在上帝进程层面上做请求的定向分发，保证请求主机和进程的一致性。在上帝进程中，针对每个请求的ip做hash，并对每一个ws服务器创建单独的http服务器用于握手升级。</p>
<p>简易代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express'),
    cluster = require('cluster'),
    net = require('net'),
    sio = require('socket.io');

var port = 3000,
    num_processes = require('os').cpus().length;

if (cluster.isMaster) {
    var workers = [];

    var spawn = function(i) {
        workers[i] = cluster.fork();
        workers[i].on('exit', function(code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });
    };

    for (var i = 0; i < num_processes; i++) {
        spawn(i);
    }

    // ip hash
    var worker_index = function(ip, len) {
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (!isNaN(ip[i])) {
                s += ip[i];
            }
        }

        return Number(s) % len;
    };

    var server = net.createServer({ pauseOnConnect: true }, function(connection) {
        var worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send('sticky-session:connection', connection);
    }).listen(port);
} else {
    // worker
    var app = new express();

    // handshake server.
    var server = app.listen(0, 'localhost'),
        io = sio(server);

    process.on('message', function(message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }

        server.emit('connection', connection);

        connection.resume();
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>),
    cluster = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cluster'</span>),
    net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>),
    sio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>);

<span class="hljs-keyword">var</span> port = <span class="hljs-number">3000</span>,
    num_processes = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>).cpus().length;

<span class="hljs-keyword">if</span> (cluster.isMaster) {
    <span class="hljs-keyword">var</span> workers = [];

    <span class="hljs-keyword">var</span> spawn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{
        workers[i] = cluster.fork();
        workers[i].on(<span class="hljs-string">'exit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code, signal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'respawning worker'</span>, i);
            spawn(i);
        });
    };

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; num_processes; i++) {
        spawn(i);
    }

    <span class="hljs-comment">// ip hash</span>
    <span class="hljs-keyword">var</span> worker_index = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ip, len</span>) </span>{
        <span class="hljs-keyword">var</span> s = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, _len = ip.length; i &lt; _len; i++) {
            <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(ip[i])) {
                s += ip[i];
            }
        }

        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Number</span>(s) % len;
    };

    <span class="hljs-keyword">var</span> server = net.createServer({ <span class="hljs-attr">pauseOnConnect</span>: <span class="hljs-literal">true</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">connection</span>) </span>{
        <span class="hljs-keyword">var</span> worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send(<span class="hljs-string">'sticky-session:connection'</span>, connection);
    }).listen(port);
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// worker</span>
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> express();

    <span class="hljs-comment">// handshake server.</span>
    <span class="hljs-keyword">var</span> server = app.listen(<span class="hljs-number">0</span>, <span class="hljs-string">'localhost'</span>),
        io = sio(server);

    process.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, connection</span>) </span>{
        <span class="hljs-keyword">if</span> (message !== <span class="hljs-string">'sticky-session:connection'</span>) {
            <span class="hljs-keyword">return</span>;
        }

        server.emit(<span class="hljs-string">'connection'</span>, connection);

        connection.resume();
    });
}</code></pre>
<h2 id="articleHeader7">总结</h2>
<p>本文实现了三种解决方案，归根到底就是“ip hash”，不同点在于在请求处理的不同阶段做ip hash。</p>
<p>可以在请求处理最前端做iphash，即nginx方式，这也就是第一种方案；<br>可以在请求处理的第二层分发处做iphash，即上帝进程路由的方式，即第三种；<br>也可以在请求处理的终端做iphash，即服务端路由的方式，也就是第二种；<br>同时共享session也同样可以实现，借助socket.io-redis模块也可以实现。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
socket.io搭配pm2（cluster）集群解决方案

## 原文链接
[https://segmentfault.com/a/1190000009622158](https://segmentfault.com/a/1190000009622158)


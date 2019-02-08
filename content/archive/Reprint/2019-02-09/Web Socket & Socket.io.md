---
title: 'Web Socket & Socket.io' 
date: 2019-02-09 2:30:58
hidden: true
slug: 2x1yu484a2
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">HTTP</h1>
<p>HTTP无法轻松实现实时应用：</p>
<ul>
<li>HTTP协议是无状态的，服务器只会响应来自客户端的请求，但是它与客户端之间不具备持续连接。</li>
<li>我们可以非常轻松的捕获浏览器上发生的事件（比如用户点击了盒子），这个事件可以轻松产生与服务器的数据交互（比如Ajax）。但是，反过来却是不可能的：服务器端发生了一个事件，服务器无法将这个事件的信息实时主动通知它的客户端。只有在客户端查询服务器的当前状态的时候，所发生事件的信息才会从服务器传递到客户端。</li>
</ul>
<p>但是，确实聊天室确实存在</p>
<p>方法：</p>
<ul>
<li>长轮询：客户端每隔很短的时间，都会对服务器发出请求，查看是否有新的消息，只要轮询速度足够快，例如1秒，就能给人造成交互是实时进行的印象。这种做法是无奈之举，实际上对服务器、客户端双方都造成了大量的性能浪费。</li>
<li>长连接：客户端只请求一次，但是服务器会将连接保持，不会返回结果（想象一下我们没有写res.end()时，浏览器一直转小菊花）。服务器有了新数据，就将数据发回来，又有了新数据，就将数据发回来，而一直保持挂起状态。这种做法的也造成了大量的性能浪费。</li>
</ul>
<h1 id="articleHeader1">WebSocket协议</h1>
<p>WebSocket协议能够让浏览器和服务器全双工实时通信，互相的，服务器也能主动通知客户端</p>
<ul>
<li>WebSocket的原理非常的简单：利用HTTP请求产生握手，HTTP头部中含有WebSocket协议的请求，所以握手之后，二者转用TCP协议进行交流（QQ的协议）。现在的浏览器和服务器之间，就是QQ和QQ服务器的关系了。所以WebSocket协议，需要浏览器支持，更需要服务器支持。</li>
<li>支持WebSocket协议的浏览器有：Chrome 4、火狐4、IE10、Safari5</li>
<li>支持WebSocket协议的服务器有：Node 0、Apach7.0.2、Nginx1.3</li>
<li>Socket.IO是业界良心，新手福音。它屏蔽了所有底层细节，让顶层调用非常简单。并且还为不支持WebSocket协议的浏览器，提供了长轮询的透明模拟机制。</li>
<li>Node.js上需要写一些程序，来处理TCP请求。 使用require('dgram') 模块</li>
<li>Node的单线程、非阻塞I/O、事件驱动机制，使它非常适合Socket服务器。</li>
</ul>
<h1 id="articleHeader2">Socket.io</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install socket.io" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> socket.io</code></pre>
<p>制作index.html页面。页面中必须引入 /socket.io/socket.io.js, 调用io函数，取得socket对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/socket.io/socket.io.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
<script type=&quot;text/javascript&quot;>
    var socket = io();  //socket 对象
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/socket.io/socket.io.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> socket = io();  <span class="hljs-comment">//socket 对象</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>服务器中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var io = require('sockte.io')(server);
io.on('connection',function( socket ){
    //socket 对象
    socket.on('tiwen',function( msg ){
        console.log('服务器接受到了请求');
        //sockte.emit('huida','ok'); //单条返回
        //广播 , 就是给当前所有用户的发送信息。
        io.emit('huida','ok');
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'sockte.io'</span>)(server);
io.on(<span class="hljs-string">'connection'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> socket </span>)</span>{
    <span class="hljs-comment">//socket 对象</span>
    socket.on(<span class="hljs-string">'tiwen'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> msg </span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'服务器接受到了请求'</span>);
        <span class="hljs-comment">//sockte.emit('huida','ok'); //单条返回</span>
        <span class="hljs-comment">//广播 , 就是给当前所有用户的发送信息。</span>
        io.emit(<span class="hljs-string">'huida'</span>,<span class="hljs-string">'ok'</span>);
    });
});</code></pre>
<p>客户端和服务器，都有socket对象。 两个对象都具有emit，和on的时间。emit用于发送，on用户接受。    <br>发送的内容可以是任何类型的值。</p>
<h1 id="articleHeader3">案例</h1>
<p>前台页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>

<h1>index页面</h1>
信息内容：<input type=&quot;text&quot; name=&quot;&quot; id=&quot;info&quot; value=&quot;&quot; />
发送： <input type=&quot;button&quot; name=&quot;&quot; id=&quot;btn&quot; value=&quot;发送&quot; />
<script src=&quot;/socket.io/socket.io.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
  var socket = io();
  document.getElementById(&quot;btn&quot;).onclick = function (  ) {
    socket.emit('tiwen',document.getElementById(&quot;info&quot;).value);
  }
  socket.on('huida',function ( msg ) {
    console.log('回答：' +　msg);
  });
</script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>index页面<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
信息内容：<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"info"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> /&gt;</span>
发送： <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"发送"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/socket.io/socket.io.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> socket = io();
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">  </span>) </span>{
    socket.emit(<span class="hljs-string">'tiwen'</span>,<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"info"</span>).value);
  }
  socket.on(<span class="hljs-string">'huida'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> msg </span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'回答：'</span> +　msg);
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>后台：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');
var fs = require('fs');

var server = http.createServer(function ( req,res ) {
  if (  req.url == '/' ) {
    // 显示首页
    fs.readFile('./index.html',function ( err,data ) {
      res.end(data);
    });
  }
});


// 创建io对象
var io = require('socket.io')(server);

// 监听连接事件
io.on('connection',function ( socket ) {
  console.log( '一个客户端连接了' );
  socket.on('tiwen',function ( msg ) {
        // console.log( '提问为：' + msg );
        // socket.emit('huida','好呀');
    // 加上广播
    io.emit('huida',msg);
  });
});

server.listen(80);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> req,res </span>) </span>{
  <span class="hljs-keyword">if</span> (  req.url == <span class="hljs-string">'/'</span> ) {
    <span class="hljs-comment">// 显示首页</span>
    fs.readFile(<span class="hljs-string">'./index.html'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> err,data </span>) </span>{
      res.end(data);
    });
  }
});


<span class="hljs-comment">// 创建io对象</span>
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(server);

<span class="hljs-comment">// 监听连接事件</span>
io.on(<span class="hljs-string">'connection'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> socket </span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'一个客户端连接了'</span> );
  socket.on(<span class="hljs-string">'tiwen'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> msg </span>) </span>{
        <span class="hljs-comment">// console.log( '提问为：' + msg );</span>
        <span class="hljs-comment">// socket.emit('huida','好呀');</span>
    <span class="hljs-comment">// 加上广播</span>
    io.emit(<span class="hljs-string">'huida'</span>,msg);
  });
});

server.listen(<span class="hljs-number">80</span>);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web Socket & Socket.io

## 原文链接
[https://segmentfault.com/a/1190000005690589](https://segmentfault.com/a/1190000005690589)


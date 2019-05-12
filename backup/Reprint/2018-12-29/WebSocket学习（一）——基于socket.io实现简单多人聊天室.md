---
title: 'WebSocket学习（一）——基于socket.io实现简单多人聊天室' 
date: 2018-12-29 2:30:10
hidden: true
slug: 4xhlbswigg8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>什么是<code>Websocket</code>呢？<br>我们都知道在<code>Http</code>协议中，客户端与服务器端的通信是靠客户端发起请求，然后服务器端收到请求再进行回应，这个过程中，客户端是主动的，服务器端是被动的。<code>Websocket</code>协议就不一样了，它是基于<code>TCP</code>的一种新的网络协议，它与<code>Http</code>协议不同之处就在于<code>Websocket</code>能实现服务器端主动推送消息到客户端，服务器端与客户端都能发起通信，这一次，服务器端终于也拥有了主动权。</p>
<p>什么是<code>socket.io</code>？<br><code>socket.io</code>封装了<code>Websocket</code>以及其他的一些协议，并且实现了<code>Websocket</code>的服务端代码。同时还有很强的兼容性，兼容各种浏览器以及移动设备。有了它，我们能更方便快捷地实现服务器端与客户端之间的实时通讯。</p>
<h2 id="articleHeader1">实现功能简述</h2>
<p>要实现多人聊天室的核心就是区分当前用户发送的消息与其他用户发送的消息，在这里我通过用户登录使用的用户名来进行区分。所以用户进入首先展示登录页面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011538421?w=321&amp;h=572" src="https://static.alili.tech/img/remote/1460000011538421?w=321&amp;h=572" alt="图1.登录页面" title="图1.登录页面" style="cursor: pointer; display: inline;"></span><br>登录成功之后，新用户加入聊天室<br><span class="img-wrap"><img data-src="/img/remote/1460000011538422?w=333&amp;h=562" src="https://static.alili.tech/img/remote/1460000011538422?w=333&amp;h=562" alt="图2.登录成功" title="图2.登录成功" style="cursor: pointer;"></span><br>如果用户重名，会弹出提示，保持吴彦祖的登录状态，我们再打开一个标签，输入“吴彦祖”查看效果<br><span class="img-wrap"><img data-src="/img/remote/1460000011538423?w=682&amp;h=657" src="https://static.alili.tech/img/remote/1460000011538423?w=682&amp;h=657" alt="图3.昵称重复" title="图3.昵称重复" style="cursor: pointer;"></span><br>只有当昵称唯一时，才允许登录，我们再登录一个查看效果<br><span class="img-wrap"><img data-src="/img/remote/1460000011538424?w=682&amp;h=696" src="https://static.alili.tech/img/remote/1460000011538424?w=682&amp;h=696" alt="图4.登录提示" title="图4.登录提示" style="cursor: pointer; display: inline;"></span><br>可以看到，当新用户登录时，其他在线用户会收到提示，接下来就是发送消息了<br><span class="img-wrap"><img data-src="/img/remote/1460000011538425?w=573&amp;h=696" src="https://static.alili.tech/img/remote/1460000011538425?w=573&amp;h=696" alt="图5.发送消息展示" title="图5.发送消息展示" style="cursor: pointer; display: inline;"></span><br>发送的消息是实时推送的，当前用户发送的消息与其他用户发送的消息对话框做了区分。<br>当用户退出时，系统也会给出提示，效果如下<br><span class="img-wrap"><img data-src="/img/remote/1460000011538426?w=573&amp;h=696" src="https://static.alili.tech/img/remote/1460000011538426?w=573&amp;h=696" alt="图6.退出登录" title="图6.退出登录" style="cursor: pointer; display: inline;"></span><br>怎么样，有没有兴趣继续了解呢？下面就开始着手开发吧。</p>
<h2 id="articleHeader2">环境搭建</h2>
<h3 id="articleHeader3">1.安装node.js</h3>
<p>后端服务是用的<code>node.js</code>，所以我们首先要进行安装，安装方法很简单，我在之前一篇文章也提过。首先在<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node.js官网</a>下载稳定版本，下载完成后点击安装，安装过程也很简单，一直next即可，安装完成会自动添加<code>node</code>及<code>npm</code>环境变量。</p>
<p>检验是否安装成功，在cmd输入命令<code> node -v</code>,回车 及 <code>npm -v</code>,回车，如出现下图所示版本信息，表示安装成功</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011538427?w=445&amp;h=155" src="https://static.alili.tech/img/remote/1460000011538427?w=445&amp;h=155" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">2.新建项目文件夹，安装socket.io</h3>
<p>新建文件夹<code>chatroom</code>，在这里我把它建到D盘根目录下。打开cmd，定位到刚建的<code>chatroom</code>文件夹下，输入<code>npm install socket.io</code>安装<code>socket.io</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011538428?w=528&amp;h=138" src="https://static.alili.tech/img/remote/1460000011538428?w=528&amp;h=138" alt="安装socket.io" title="安装socket.io" style="cursor: pointer;"></span><br>安装完成之后，可以看到文件夹下多了<code>node_modules</code>文件，里面全是刚下载的<code>socket.io</code>依赖包。</p>
<h3 id="articleHeader5">3.新建页面</h3>
<p>在<code>chatroom</code>文件夹下新建页面文件<code>index.html</code>，样式<code>chat.css</code>，后端js<code>app.js</code>，前端js<code>chat.js</code>，并下载jquery.min.js，<a href="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js" rel="nofollow noreferrer" target="_blank">socket.io.js</a>。再下载一张图片作为用户头像，放在<code>images/user/</code>下。<br>目录结构如下<br><span class="img-wrap"><img data-src="/img/remote/1460000011538429?w=184&amp;h=220" src="https://static.alili.tech/img/remote/1460000011538429?w=184&amp;h=220" alt="文件结构" title="文件结构" style="cursor: pointer;"></span></p>
<p>好了，环境搭建完成，开始撸码吧。</p>
<h2 id="articleHeader6">项目搭建</h2>
<h3 id="articleHeader7">1.构建node服务器</h3>
<p>在app.js里面构建服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*app.js*/
/*构建http服务*/
var app = require('http').createServer()
/*引入socket.io*/
var io = require('socket.io')(app);
/*定义监听端口，可以自定义，端口不要被占用*/
var PORT = 8081;
/*监听端口*/
app.listen(PORT);

console.log('app listen at'+PORT);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*app.js*/</span>
<span class="hljs-comment">/*构建http服务*/</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer()
<span class="hljs-comment">/*引入socket.io*/</span>
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(app);
<span class="hljs-comment">/*定义监听端口，可以自定义，端口不要被占用*/</span>
<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">8081</span>;
<span class="hljs-comment">/*监听端口*/</span>
app.listen(PORT);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app listen at'</span>+PORT);</code></pre>
<p>接着启动服务<br>打开<code>cmd</code>，定位到<code>app.js</code>所在目录，输入<code>node app.js</code>，如图所示，打印出了我们写的内容，表示服务启动成功。<br><span class="img-wrap"><img data-src="/img/remote/1460000011538430?w=326&amp;h=141" src="https://static.alili.tech/img/remote/1460000011538430?w=326&amp;h=141" alt="启动服务" title="启动服务" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">2.建立服务端socket连接监听</h3>
<p>先给大家简单讲一下服务器端与客户端通信的基本方法<br>大家可以看一下<a href="https://socket.io/docs/" rel="nofollow noreferrer" target="_blank">socket.io</a>的文档<br><strong>（1）socket.emit</strong><br>客户端与服务器端之间发送消息是用<code>emit</code><br>例如客户端向服务端发送登录请求<br><code>socket.emit('login',{username:uname})</code> <code>login</code>是自定义的事件，后面是带的参数<br><strong>（2）socket.on</strong><br>服务器端要接收客户端发送的<code>login</code>事件，就得对该事件进行监听<br><code>socket.on('login',function(data){})</code>在回调函数中进行处理<br>同理，服务器端也可以向客户端发送事件，只要客户端也对该事件进行监听就行<br><strong>（3）io.sockets.emit</strong><br>服务器端向连接的所有客户端发送消息得用<code>io.sockets.emit</code><br><strong>（4）socket.broadcast.emit</strong><br>给除了自己以外的客户端广播消息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*app.js*/
/*构建http服务*/
var app = require('http').createServer()
/*引入socket.io*/
var io = require('socket.io')(app);
/*定义监听端口，可以自定义，端口不要被占用*/
var PORT = 8081;
/*监听端口*/
app.listen(PORT);

/**
*监听客户端连接
*io是我们定义的服务端的socket
*回调函数里面的socket是本次连接的客户端socket
*io与socket是一对多的关系
*/
io.on('connection', function (socket) {
  /*所有的监听on，与发送emit都得写在连接里面，包括断开连接*/
})
console.log('app listen at'+PORT);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*app.js*/</span>
<span class="hljs-comment">/*构建http服务*/</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer()
<span class="hljs-comment">/*引入socket.io*/</span>
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(app);
<span class="hljs-comment">/*定义监听端口，可以自定义，端口不要被占用*/</span>
<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">8081</span>;
<span class="hljs-comment">/*监听端口*/</span>
app.listen(PORT);

<span class="hljs-comment">/**
*监听客户端连接
*io是我们定义的服务端的socket
*回调函数里面的socket是本次连接的客户端socket
*io与socket是一对多的关系
*/</span>
io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">socket</span>) </span>{
  <span class="hljs-comment">/*所有的监听on，与发送emit都得写在连接里面，包括断开连接*/</span>
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app listen at'</span>+PORT);</code></pre>
<h3 id="articleHeader9">3.前端页面</h3>
<p><code>index.html</code>页面中需引入<code>socket.io.js</code>，<a href="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js" rel="nofollow noreferrer" target="_blank">socket.io.js下载地址</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*index.html*/
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no&quot;>
    <title>聊天室</title>
    <link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;css/chat.css&quot;>
    <script type=&quot;text/javascript&quot; src=&quot;js/jquery.min.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;js/socket.io.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;js/chat.js&quot;></script>
</head>
<body>
    /*登录界面*/
    <div class=&quot;login-wrap&quot;>
        <div class=&quot;login-con&quot;>
            <h3>用户登录</h3>
            <input type=&quot;text&quot; placeholder=&quot;请输入昵称&quot; id=&quot;loginName&quot;>
            <button class=&quot;login-btn&quot;>登录</button>
        </div>
    </div>
    
    /*聊天界面，一开始隐藏，用户登录成功后再显示*/
    <div class=&quot;chat-wrap hide&quot;>
        <h1>多人聊天室</h1>
        <div class=&quot;chat-con clearfix&quot;></div>
        <div class=&quot;bottom&quot;>
            <input type=&quot;text&quot; id=&quot;sendtxt&quot;>
            <button class=&quot;sendBtn&quot;>发送</button>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>/*index.html*/
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>聊天室<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/chat.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/socket.io.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/chat.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    /*登录界面*/
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login-wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login-con"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>用户登录<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入昵称"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"loginName"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login-btn"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    /*聊天界面，一开始隐藏，用户登录成功后再显示*/
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"chat-wrap hide"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>多人聊天室<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"chat-con clearfix"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bottom"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sendtxt"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sendBtn"</span>&gt;</span>发送<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader10">4.样式</h3>
<p>样式可以自己编写，我这里随便写了一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*公共样式*/
*{padding:0; margin:0;}
html,body{width:100%;height: 100%;}
.clearfix:after{content:&quot;.&quot;;display:block;height:0;clear:both;visibility:hidden}
.clearfix{*zoom:1}
.cred{color:#f03e3e;}
.cgreen{color:#459d36;}
.hide{display:none;}
.fr{float:right;}
.fl{float: left;}
.rela{position: relative;}
.abs{position:absolute;}
h1{position: fixed; z-index:20; width: 100%; height:50px; line-height:50px; font-size:20px; left: 0; top: 0; background: #000; color: #fff;}

/*登录界面*/
.login-wrap{background:#e7e7e7;width:100%;height:100%; text-align:center;}
.login-con{padding-top: 50px;}
.login-con h3{margin-bottom: 20px;}
.login-con input{width:60%; display:block; margin:0 auto; height: 40px; line-height: 40px; margin-bottom: 20px;}
.login-con button{width:60%;display:block; margin:0 auto; height: 40px; line-height:40px; border:none; background:#459d36; color:#fff; border-radius:5px;}

/*聊天界面*/
.chat-wrap{width: 100%; height: 100%;overflow-y:scroll; background:#e7e7e7; text-align:center;}
.chat-con{padding: 50px 0; background:#e7e7e7;}
.chat-con p{display:inline-block; padding:5px 10px; background:#999;border-radius:5px; color:#fff; margin:5px 0;}
.bottom{position:fixed;bottom:0; left: 0; width:100%; height: 50px; background: #fff;}
.bottom input{width: 78%; height: 50px; line-height: 50px; float:left;border:none;}
.bottom button{width: 20%;height: 50px; float: right; border:none; background:#459d36;color: #fff;}
.chat-item{width:100%; margin-bottom:20px;}
.item-right .message{background: #62b900;}
.item-left .message{background: #fff; margin-top:20px;}
.item-left .img{margin-right:10px;}
.item-left .uname{font-size:12px; left:50px; top:0;}
.chat-item .message{width:60%;display:block; padding:10px;border-radius:5px; margin-right:10px;}
.chat-item .img{display:inline-block; width:40px; height:40px; background:url(../images/user/user.jpg) no-repeat; background-size:100% 100%;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/*公共样式*/</span>
*{<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;}
<span class="hljs-selector-class">.clearfix</span>:after{<span class="hljs-attribute">content</span>:<span class="hljs-string">"."</span>;<span class="hljs-attribute">display</span>:block;<span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">clear</span>:both;<span class="hljs-attribute">visibility</span>:hidden}
.clearfix{*zoom:<span class="hljs-number">1</span>}
.cred{color:<span class="hljs-number">#f03e3e</span>;}
<span class="hljs-selector-class">.cgreen</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#459d36</span>;}
<span class="hljs-selector-class">.hide</span>{<span class="hljs-attribute">display</span>:none;}
<span class="hljs-selector-class">.fr</span>{<span class="hljs-attribute">float</span>:right;}
<span class="hljs-selector-class">.fl</span>{<span class="hljs-attribute">float</span>: left;}
<span class="hljs-selector-class">.rela</span>{<span class="hljs-attribute">position</span>: relative;}
<span class="hljs-selector-class">.abs</span>{<span class="hljs-attribute">position</span>:absolute;}
<span class="hljs-selector-tag">h1</span>{<span class="hljs-attribute">position</span>: fixed; <span class="hljs-attribute">z-index</span>:<span class="hljs-number">20</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>; <span class="hljs-attribute">line-height</span>:<span class="hljs-number">50px</span>; <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>; <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;}

<span class="hljs-comment">/*登录界面*/</span>
<span class="hljs-selector-class">.login-wrap</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#e7e7e7</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>; <span class="hljs-attribute">text-align</span>:center;}
<span class="hljs-selector-class">.login-con</span>{<span class="hljs-attribute">padding-top</span>: <span class="hljs-number">50px</span>;}
<span class="hljs-selector-class">.login-con</span> <span class="hljs-selector-tag">h3</span>{<span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;}
<span class="hljs-selector-class">.login-con</span> <span class="hljs-selector-tag">input</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">60%</span>; <span class="hljs-attribute">display</span>:block; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto; <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>; <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;}
<span class="hljs-selector-class">.login-con</span> <span class="hljs-selector-tag">button</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">60%</span>;<span class="hljs-attribute">display</span>:block; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto; <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>; <span class="hljs-attribute">line-height</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">border</span>:none; <span class="hljs-attribute">background</span>:<span class="hljs-number">#459d36</span>; <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>; <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">5px</span>;}

<span class="hljs-comment">/*聊天界面*/</span>
<span class="hljs-selector-class">.chat-wrap</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">overflow-y</span>:scroll; <span class="hljs-attribute">background</span>:<span class="hljs-number">#e7e7e7</span>; <span class="hljs-attribute">text-align</span>:center;}
<span class="hljs-selector-class">.chat-con</span>{<span class="hljs-attribute">padding</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span>; <span class="hljs-attribute">background</span>:<span class="hljs-number">#e7e7e7</span>;}
<span class="hljs-selector-class">.chat-con</span> <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">display</span>:inline-block; <span class="hljs-attribute">padding</span>:<span class="hljs-number">5px</span> <span class="hljs-number">10px</span>; <span class="hljs-attribute">background</span>:<span class="hljs-number">#999</span>;<span class="hljs-attribute">border-radius</span>:<span class="hljs-number">5px</span>; <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>; <span class="hljs-attribute">margin</span>:<span class="hljs-number">5px</span> <span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.bottom</span>{<span class="hljs-attribute">position</span>:fixed;<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;}
<span class="hljs-selector-class">.bottom</span> <span class="hljs-selector-tag">input</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">78%</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">float</span>:left;<span class="hljs-attribute">border</span>:none;}
<span class="hljs-selector-class">.bottom</span> <span class="hljs-selector-tag">button</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">20%</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">float</span>: right; <span class="hljs-attribute">border</span>:none; <span class="hljs-attribute">background</span>:<span class="hljs-number">#459d36</span>;<span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;}
<span class="hljs-selector-class">.chat-item</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>; <span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">20px</span>;}
<span class="hljs-selector-class">.item-right</span> <span class="hljs-selector-class">.message</span>{<span class="hljs-attribute">background</span>: <span class="hljs-number">#62b900</span>;}
<span class="hljs-selector-class">.item-left</span> <span class="hljs-selector-class">.message</span>{<span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>; <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">20px</span>;}
<span class="hljs-selector-class">.item-left</span> <span class="hljs-selector-class">.img</span>{<span class="hljs-attribute">margin-right</span>:<span class="hljs-number">10px</span>;}
<span class="hljs-selector-class">.item-left</span> <span class="hljs-selector-class">.uname</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>; <span class="hljs-attribute">left</span>:<span class="hljs-number">50px</span>; <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.chat-item</span> <span class="hljs-selector-class">.message</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">60%</span>;<span class="hljs-attribute">display</span>:block; <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;<span class="hljs-attribute">border-radius</span>:<span class="hljs-number">5px</span>; <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">10px</span>;}
<span class="hljs-selector-class">.chat-item</span> <span class="hljs-selector-class">.img</span>{<span class="hljs-attribute">display</span>:inline-block; <span class="hljs-attribute">width</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">background</span>:url(../images/user/user.jpg) no-repeat; <span class="hljs-attribute">background-size</span>:<span class="hljs-number">100%</span> <span class="hljs-number">100%</span>;}</code></pre>
<h3 id="articleHeader11">5.逻辑编写</h3>
<h5>（1）登录</h5>
<p><strong>客户端</strong><br>浏览器端将获得的用户输入的昵称信息，发送到服务器端，告诉服务器端我要触发<code>login</code>事件。<br>在客户端<code>chat.js</code>中发送登录事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*chat.js*/
$(function(){
    /*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/
    var socket = io('ws://localhost:8081');
    /*定义用户名*/
    var uname = null;

    /*登录*/
    $('.login-btn').click(function(){
        uname = $.trim($('#loginName').val());
        if(uname){
            /*向服务端发送登录事件*/
            socket.emit('login',{username:uname})
        }else{
            alert('请输入昵称')
        }
    })

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*chat.js*/</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">/*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/</span>
    <span class="hljs-keyword">var</span> socket = io(<span class="hljs-string">'ws://localhost:8081'</span>);
    <span class="hljs-comment">/*定义用户名*/</span>
    <span class="hljs-keyword">var</span> uname = <span class="hljs-literal">null</span>;

    <span class="hljs-comment">/*登录*/</span>
    $(<span class="hljs-string">'.login-btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        uname = $.trim($(<span class="hljs-string">'#loginName'</span>).val());
        <span class="hljs-keyword">if</span>(uname){
            <span class="hljs-comment">/*向服务端发送登录事件*/</span>
            socket.emit(<span class="hljs-string">'login'</span>,{<span class="hljs-attr">username</span>:uname})
        }<span class="hljs-keyword">else</span>{
            alert(<span class="hljs-string">'请输入昵称'</span>)
        }
    })

})</code></pre>
<p><strong>服务器端</strong><br>服务器端监听<code>login</code>事件，在后台打印出获取到的昵称信息。<br>在服务器端<code>app.js</code>中监听登录事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*app.js*/
var app = require('http').createServer()
var io = require('socket.io')(app);
var PORT = 8081;

app.listen(PORT);
io.on('connection', function (socket) {
    /*监听登录*/
    socket.on('login',function(data){
        console.log(data)
    })
})

console.log('app listen at'+PORT);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*app.js*/</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer()
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(app);
<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">8081</span>;

app.listen(PORT);
io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">socket</span>) </span>{
    <span class="hljs-comment">/*监听登录*/</span>
    socket.on(<span class="hljs-string">'login'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-built_in">console</span>.log(data)
    })
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app listen at'</span>+PORT);</code></pre>
<blockquote><p>注：更改了app.js，需再次启动服务才能看见效果</p></blockquote>
<p>打开cmd，按<code>Ctrl</code>+<code>C</code>退出上次服务，再次输入<code>node app.js</code>启动服务，打开浏览器，查看效果<br><span class="img-wrap"><img data-src="/img/remote/1460000011538431?w=886&amp;h=387" src="https://static.alili.tech/img/remote/1460000011538431?w=886&amp;h=387" alt="" title="" style="cursor: pointer; display: inline;"></span><br>可以看到，点击登录按钮时，服务器端打印出了接收到的用户名信息，没问题，继续往下写登录成功事件。</p>
<h5>（2）登录成功与失败</h5>
<p>由于没有使用到数据库，所以我们就定义一个用户数组，用户每次登录之后，我们就判断该昵称是否已存在，如果已存在就弹出提示，转到登录失败事件，如果该昵称不存在数组里面，就视为新用户，转到登录成功事件，并且将该昵称存入数组。</p>
<p><strong>服务器端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*app.js*/
var app = require('http').createServer()
var io = require('socket.io')(app);
var PORT = 8081;
/*定义用户数组*/
var users = [];

app.listen(PORT);
io.on('connection', function (socket) {
    /*是否是新用户标识*/
    var isNewPerson = true; 
    /*当前登录用户*/
    var username = null;
    /*监听登录*/
    socket.on('login',function(data){
        for(var i=0;i<users.length;i++){
            if(users[i].username === data.username){
                  isNewPerson = false
                  break;
            }else{
                  isNewPerson = true
            }
        }
        if(isNewPerson){
            username = data.username
            users.push({
              username:data.username
            })
            /*登录成功*/
            socket.emit('loginSuccess',data)
            /*向所有连接的客户端广播add事件*/
            io.sockets.emit('add',data)
        }else{
            /*登录失败*/
            socket.emit('loginFail','')
        }  
    })
})

console.log('app listen at'+PORT);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*app.js*/</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer()
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(app);
<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">8081</span>;
<span class="hljs-comment">/*定义用户数组*/</span>
<span class="hljs-keyword">var</span> users = [];

app.listen(PORT);
io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">socket</span>) </span>{
    <span class="hljs-comment">/*是否是新用户标识*/</span>
    <span class="hljs-keyword">var</span> isNewPerson = <span class="hljs-literal">true</span>; 
    <span class="hljs-comment">/*当前登录用户*/</span>
    <span class="hljs-keyword">var</span> username = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">/*监听登录*/</span>
    socket.on(<span class="hljs-string">'login'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;users.length;i++){
            <span class="hljs-keyword">if</span>(users[i].username === data.username){
                  isNewPerson = <span class="hljs-literal">false</span>
                  <span class="hljs-keyword">break</span>;
            }<span class="hljs-keyword">else</span>{
                  isNewPerson = <span class="hljs-literal">true</span>
            }
        }
        <span class="hljs-keyword">if</span>(isNewPerson){
            username = data.username
            users.push({
              <span class="hljs-attr">username</span>:data.username
            })
            <span class="hljs-comment">/*登录成功*/</span>
            socket.emit(<span class="hljs-string">'loginSuccess'</span>,data)
            <span class="hljs-comment">/*向所有连接的客户端广播add事件*/</span>
            io.sockets.emit(<span class="hljs-string">'add'</span>,data)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">/*登录失败*/</span>
            socket.emit(<span class="hljs-string">'loginFail'</span>,<span class="hljs-string">''</span>)
        }  
    })
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app listen at'</span>+PORT);</code></pre>
<p><strong>客户端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*chat.js*/
$(function(){
    /*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/
    var socket = io('ws://localhost:8081');
    /*定义用户名*/
    var uname = null;

    /*登录*/
    $('.login-btn').click(function(){
        uname = $.trim($('#loginName').val());
        if(uname){
            /*向服务端发送登录事件*/
            socket.emit('login',{username:uname})
        }else{
            alert('请输入昵称')
        }
    })

    /*登录成功*/
    socket.on('loginSuccess',function(data){
        if(data.username === uname){
            checkin(data)
        }else{
            alert('用户名不匹配，请重试')
        }
    })

    /*登录失败*/
    socket.on('loginFail',function(){
        alert('昵称重复')
    })

    /*新人加入提示*/
    socket.on('add',function(data){
        var html = '<p>系统消息:'+data.username+'已加入群聊</p>';
        $('.chat-con').append(html);
    })

    /*隐藏登录界面 显示聊天界面*/
    function checkin(data){
        $('.login-wrap').hide('slow');
        $('.chat-wrap').show('slow');
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*chat.js*/</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">/*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/</span>
    <span class="hljs-keyword">var</span> socket = io(<span class="hljs-string">'ws://localhost:8081'</span>);
    <span class="hljs-comment">/*定义用户名*/</span>
    <span class="hljs-keyword">var</span> uname = <span class="hljs-literal">null</span>;

    <span class="hljs-comment">/*登录*/</span>
    $(<span class="hljs-string">'.login-btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        uname = $.trim($(<span class="hljs-string">'#loginName'</span>).val());
        <span class="hljs-keyword">if</span>(uname){
            <span class="hljs-comment">/*向服务端发送登录事件*/</span>
            socket.emit(<span class="hljs-string">'login'</span>,{<span class="hljs-attr">username</span>:uname})
        }<span class="hljs-keyword">else</span>{
            alert(<span class="hljs-string">'请输入昵称'</span>)
        }
    })

    <span class="hljs-comment">/*登录成功*/</span>
    socket.on(<span class="hljs-string">'loginSuccess'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">if</span>(data.username === uname){
            checkin(data)
        }<span class="hljs-keyword">else</span>{
            alert(<span class="hljs-string">'用户名不匹配，请重试'</span>)
        }
    })

    <span class="hljs-comment">/*登录失败*/</span>
    socket.on(<span class="hljs-string">'loginFail'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">'昵称重复'</span>)
    })

    <span class="hljs-comment">/*新人加入提示*/</span>
    socket.on(<span class="hljs-string">'add'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">var</span> html = <span class="hljs-string">'&lt;p&gt;系统消息:'</span>+data.username+<span class="hljs-string">'已加入群聊&lt;/p&gt;'</span>;
        $(<span class="hljs-string">'.chat-con'</span>).append(html);
    })

    <span class="hljs-comment">/*隐藏登录界面 显示聊天界面*/</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkin</span>(<span class="hljs-params">data</span>)</span>{
        $(<span class="hljs-string">'.login-wrap'</span>).hide(<span class="hljs-string">'slow'</span>);
        $(<span class="hljs-string">'.chat-wrap'</span>).show(<span class="hljs-string">'slow'</span>);
    }
})</code></pre>
<p>再次重启服务，打开浏览器查看效果，登录成功效果如上面图2所示，登录失败效果如上面图3所示。</p>
<h5>（3）退出登录</h5>
<p>退出登录，只需服务器端在用户数组里面删除退出的用户即可。<br><strong>服务器端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*app.js*/
/*退出登录*/
/*写在io.on('connection', function (socket) {})里面*/
socket.on('disconnect',function(){
    /*向所有连接的客户端广播leave事件*/
    io.sockets.emit('leave',username)
    users.map(function(val,index){
        if(val.username === username){
              users.splice(index,1);
        }
    })
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*app.js*/</span>
<span class="hljs-comment">/*退出登录*/</span>
<span class="hljs-comment">/*写在io.on('connection', function (socket) {})里面*/</span>
socket.on(<span class="hljs-string">'disconnect'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">/*向所有连接的客户端广播leave事件*/</span>
    io.sockets.emit(<span class="hljs-string">'leave'</span>,username)
    users.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val,index)</span></span>{
        <span class="hljs-keyword">if</span>(val.username === username){
              users.splice(index,<span class="hljs-number">1</span>);
        }
    })
 })</code></pre>
<p><strong>客户端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*chat.js*/
/*退出群聊提示*/
socket.on('leave',function(name){
    if(name != null){
        var html = '<p>FBI warning:'+name+'已退出群聊</p>';
        $('.chat-con').append(html);
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*chat.js*/</span>
<span class="hljs-comment">/*退出群聊提示*/</span>
socket.on(<span class="hljs-string">'leave'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">if</span>(name != <span class="hljs-literal">null</span>){
        <span class="hljs-keyword">var</span> html = <span class="hljs-string">'&lt;p&gt;FBI warning:'</span>+name+<span class="hljs-string">'已退出群聊&lt;/p&gt;'</span>;
        $(<span class="hljs-string">'.chat-con'</span>).append(html);
    }
})
</code></pre>
<h5>（4）发送消息</h5>
<p><strong>客户端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*chat.js*/
/*发送消息*/
$('.sendBtn').click(function(){
    sendMessage()
});
$(document).keydown(function(event){
    if(event.keyCode == 13){
        sendMessage()
    }
})
function sendMessage(){
    var txt = $('#sendtxt').val();
    $('#sendtxt').val('');
    if(txt){
        socket.emit('sendMessage',{username:uname,message:txt});
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*chat.js*/</span>
<span class="hljs-comment">/*发送消息*/</span>
$(<span class="hljs-string">'.sendBtn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    sendMessage()
});
$(<span class="hljs-built_in">document</span>).keydown(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-keyword">if</span>(event.keyCode == <span class="hljs-number">13</span>){
        sendMessage()
    }
})
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendMessage</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> txt = $(<span class="hljs-string">'#sendtxt'</span>).val();
    $(<span class="hljs-string">'#sendtxt'</span>).val(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">if</span>(txt){
        socket.emit(<span class="hljs-string">'sendMessage'</span>,{<span class="hljs-attr">username</span>:uname,<span class="hljs-attr">message</span>:txt});
    }
}</code></pre>
<p><strong>服务器端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*app.js*/
socket.on('sendMessage',function(data){
    io.sockets.emit('receiveMessage',data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*app.js*/</span>
socket.on(<span class="hljs-string">'sendMessage'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
    io.sockets.emit(<span class="hljs-string">'receiveMessage'</span>,data)
})</code></pre>
<p><strong>客户端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*chat.js*/
/*接收消息*/
socket.on('receiveMessage',function(data){
    showMessage(data)
})

/*显示消息*/
function showMessage(data){
    var html
    if(data.username === uname){
        html = '<div class=&quot;chat-item item-right clearfix&quot;><span class=&quot;img fr&quot;></span><span class=&quot;message fr&quot;>'+data.message+'</span></div>'
    }else{
        html='<div class=&quot;chat-item item-left clearfix rela&quot;><span class=&quot;abs uname&quot;>'+data.username+'</span><span class=&quot;img fl&quot;></span><span class=&quot;fl message&quot;>'+data.message+'</span></div>'
    }
    $('.chat-con').append(html);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">/*chat.js*/</span>
<span class="hljs-comment">/*接收消息*/</span>
socket.on(<span class="hljs-symbol">'receiveMessag</span>e',function(data){
    showMessage(data)
})

<span class="hljs-comment">/*显示消息*/</span>
function showMessage(data){
    <span class="hljs-keyword">var</span> html
    <span class="hljs-keyword">if</span>(data.username === uname){
        html = '&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"chat-item item-right clearfix"</span>&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"img fr"</span>&gt;&lt;/span&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"message fr"</span>&gt;'+data.message+'&lt;/span&gt;&lt;/div&gt;'
    }<span class="hljs-keyword">else</span>{
        html='&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"chat-item item-left clearfix rela"</span>&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"abs uname"</span>&gt;'+data.username+'&lt;/span&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"img fl"</span>&gt;&lt;/span&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"fl message"</span>&gt;'+data.message+'&lt;/span&gt;&lt;/div&gt;'
    }
    $('.chat-con').append(html);
}</code></pre>
<p>到这里，一个简单的多人聊天室已基本实现了，先回顾一下准备工作<br><strong>（1）下载node.js</strong>；<br><strong>（2）安装socket.io</strong>；<br><code>npm install socket.io</code><br><strong>（3）服务器端构建http服务，引入socket.io，并设置监听端口</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = require('http').createServer()
var io = require('socket.io')(app);
var PORT = 8081;
app.listen(PORT);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer()
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(app);
<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">8081</span>;
app.listen(PORT);</code></pre>
<p><strong>（4）客户端进行socket连接，使用websocket协议</strong><br><code>var socket = io('ws://localhost:8081');</code></p>
<hr>
<p>再回顾一下整个逻辑流程：<br><strong>（1）客户端获取用户输入昵称，发送给服务器端；</strong><br><strong>（2）服务器端接收昵称，判断是否新用户，是则发送登录成功事件，否则发送登录失败事件</strong>；<br><strong>（3）客户端收到服务器端发送的登录成功或失败事件，进行相应处理</strong>；<br><strong>（4）浏览器端获取登录用户输入的消息，将消息与用户昵称一起发送给服务器端</strong>；<br><strong>（5）服务器端接收到用户发送的消息，广播该消息给当前连接的所有客户端</strong>；<br><strong>（6）客户端接收服务器端发送来的消息，判断昵称是否是自己，进行相应对话框显示</strong><br>最后附上<a href="https://github.com/yicenburan/chatroom" rel="nofollow noreferrer" target="_blank">github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebSocket学习（一）——基于socket.io实现简单多人聊天室

## 原文链接
[https://segmentfault.com/a/1190000011538416](https://segmentfault.com/a/1190000011538416)


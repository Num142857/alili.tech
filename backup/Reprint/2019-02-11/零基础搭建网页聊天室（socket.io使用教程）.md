---
title: '零基础搭建网页聊天室（socket.io使用教程）' 
date: 2019-02-11 2:30:49
hidden: true
slug: gv43kwo5rxu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文实际为翻译<a href="http://socket.io/" rel="nofollow noreferrer" target="_blank">Socket.io</a>官方教程——<a href="http://socket.io/get-started/chat/" rel="nofollow noreferrer" target="_blank">《Get Started: Chat application》</a></p></blockquote>
<h2 id="articleHeader0">开始吧，我们做个聊天应用！</h2>
<p>在这个教程里，我们将制作一个简单的网页聊天应用。它机会不要求你有任何关于<code>Node.js</code>或<code>Socket.io</code>的基础，所以这份教程适合任何水平的开发者。先看看<a href="http://socket.io/demos/chat/" rel="nofollow noreferrer" target="_blank">Demo</a>。</p>
<h2 id="articleHeader1">介绍</h2>
<p>曾经写一个网页聊天应用可能会用到网页工具套件LAMP、PHP，那时候非常困难。因为客户端要不断地像服务器发送请求，查看是否有信息变化，体验起来非常慢。</p>
<p><code>Socket</code>通信是传统解决实时通讯的一种方案，它提供了服务器和客户端之间的双向通信。</p>
<p>这就意味着，服务器可以把消息推送给客户端，无论何时你发送了一个消息，客户端都能接受到你的消息，并将它推送给其他连接的用户。</p>
<h2 id="articleHeader2">网站框架</h2>
<p>我们的第一个目标是建立起一个简单的<code>HTML</code>页面（提供一个提交输入信息的Form表单，和一个对话的列表）。我还还将通过<code>Node.js</code>的web框架<code>express</code>。首先，我们需要保证电脑已经安装了<code>Node.js</code><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">（如何安装Node）</a>。</p>
<p>第一步，我们先创建一个<code>package.json</code>文件，它用来描述这个项目。我推荐你把它放在一个新建的空文件夹内。（我把我新建的文件夹名叫做<code>chat-example</code>.）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;socket-chat-example&quot;,
  &quot;version&quot;: &quot;0.0.1&quot;,
  &quot;description&quot;: &quot;my first socket.io app&quot;,
  &quot;dependencies&quot;: {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"socket-chat-example"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"my first socket.io app"</span>,
  <span class="hljs-attr">"dependencies"</span>: {}
}
</code></pre>
<p>现在，为了简单的<code>package.json</code>中的<code>dependencies</code>（依赖），我们将使用<code>npm install --save</code>命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save express@4.10.2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">--save</span> <span class="hljs-selector-tag">express</span>@<span class="hljs-keyword">4</span>.<span class="hljs-keyword">10</span>.<span class="hljs-keyword">2</span>
</code></pre>
<p>现在，我们已经装好了<code>express</code>，接下来，我们创建一个新的文件<code>index.js</code>来当做我们的服务器端文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)();
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).Server(app);

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
  res.send(<span class="hljs-string">'&lt;h1&gt;Hello world&lt;/h1&gt;'</span>);
});

http.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on *:3000'</span>);
});</code></pre>
<p>这三段代码可以解释为：</p>
<ul>
<li><p>Express初始化了<code>app</code>，让它充当一个HTTP服务器。</p></li>
<li><p>我们定义了一个路由处理器<code>／</code>，当我们输入网址的时候，它进入到文件根目录。</p></li>
<li><p>我们让HTTP服务器监听3000端口<br>这时，如果你输入<br>   node index.js<br>你将会看到</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVpVXa" src="https://static.alili.tech/img/bVpVXa" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>如果你在浏览器中输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//localhost:3000</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVpVXf" src="https://static.alili.tech/img/bVpVXf" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">提供HTML</h2>
<p>到目前为止，我们<code>index.js</code>中用了<code>res.send</code>来传递了一段HTML字符串，如果我们将整段HTML代码用这样的方式传递，会显得很奇怪，所以我们将创建<code>index.html并</code>传递它 </p>
<p>我们用<code>sendFile</code>重新写一下路由处理器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span></span>{
  res.sendFile(__dirname + <span class="hljs-string">'/index.html'</span>);
});</code></pre>
<p>并创建<code>index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
  <title>Socket.IO chat</title>
  <style>
    body,form,#message,li {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font: 13px Helvetica, Arial;
    }
    
    form {
      background: #000;
      padding: 3px;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    
    form input {
      border: 0;
      padding: 10px;
      width: 90%;
      margin-right: .5%;
    }
    
    form button {
      width: 9%;
      background: rgb(130, 224, 255);
      border: none;
      padding: 10px;
    }
    
    #messages {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    
    #messages li {
      padding: 5px 10px;
    }
    
    #messages li:nth-child(odd) {
      background: #eee;
    }
  </style>
</head>

<body>
  <ul id=&quot;messages&quot;></ul>
  <form action=&quot;&quot;>
    <input id=&quot;m&quot; autocomplete=&quot;off&quot; />
    <button>Send</button>
  </form>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Socket.IO chat<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-id">#message</span>,<span class="hljs-selector-tag">li</span> {
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">box-sizing</span>: border-box;
    }
    
    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-attribute">font</span>: <span class="hljs-number">13px</span> Helvetica, Arial;
    }
    
    <span class="hljs-selector-tag">form</span> {
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">3px</span>;
      <span class="hljs-attribute">position</span>: fixed;
      <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    }
    
    <span class="hljs-selector-tag">form</span> <span class="hljs-selector-tag">input</span> {
      <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
      <span class="hljs-attribute">margin-right</span>: .<span class="hljs-number">5%</span>;
    }
    
    <span class="hljs-selector-tag">form</span> <span class="hljs-selector-tag">button</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">9%</span>;
      <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(130, 224, 255);
      <span class="hljs-attribute">border</span>: none;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    }
    
    <span class="hljs-selector-id">#messages</span> {
      <span class="hljs-attribute">list-style-type</span>: none;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#messages</span> <span class="hljs-selector-tag">li</span> {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">10px</span>;
    }
    
    <span class="hljs-selector-id">#messages</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"messages"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"m"</span> <span class="hljs-attr">autocomplete</span>=<span class="hljs-string">"off"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Send<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>如果你重启了这个进程（按<code>Ctrl/Cmd + C再</code>输入<code>node index.js</code>），刷新页面就可以看到：<br><span class="img-wrap"><img data-src="/img/bVpYGU" src="https://static.alili.tech/img/bVpYGU" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">使用Socket.io</h2>
<p>Socket.io由两部分组成：</p>
<ul>
<li><p>一个Node.js HTTP服务器的应用<code>socket.io</code>（此处原文为：A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io）</p></li>
<li>
<p>一个客户端的js库<code>socket.io-client</code><br>我们只需安装一个模块就可以来使用：<br>   npm install --save socket.io</p>
<p>这样会自动保存<code>dependency</code>到<code>package.json</code>。现在，我们开始编辑<code>index.js</code>吧！<br>   var app = require('express')();<br>   var http = require('http').Server(app);<br>   var io = require('socket.io')(http);</p>
<p>app.get('/', function(req, res){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" res.sendfile('index.html');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.sendfile</span>(<span class="hljs-string">'index.html'</span>);</code></pre>
<p>});</p>
<p>io.on('connection', function(socket){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" console.log('a user connected');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"> console.log('a <span class="hljs-keyword">user</span> <span class="hljs-title">connected</span>');</code></pre>
<p>});</p>
<p>http.listen(3000, function(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" console.log('listening on *:3000');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"> console.<span class="hljs-built_in">log</span>('listening <span class="hljs-keyword">on</span> *:<span class="hljs-number">3000</span>');</code></pre>
<p>});<br>注意到，我通过传递了http对象（HTTP服务器）新建了一个<code>socket.io</code>实例，接着，我对传递进来的套接字（socket），监听<code>connection</code>事件，并将事件答应到console。</p>
</li>
</ul>
<p>现在在<code>index.html</code>中，我在<code>&lt;/body&gt;</code>添加了如下语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/socket.io/socket.io.js&quot;></script>
<script>
  var socket = io();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/socket.io/socket.io.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">var</span> socket = io();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这会让网页加载<code>socket.io-client</code>，它会暴露一个<code>io</code>全局对象，并连接socket。</p>
<p>注意：当我调用<code>io()</code>时，我没有特别声明任何<code>url</code>。因为它默认连接这个页面的host服务器。</p>
<p>如果你重现启动服务器，你将会看到console输出“a user connected”。多打开几个页面，你将会看到：<br><span class="img-wrap"><img data-src="/img/bVpYJS" src="https://static.alili.tech/img/bVpYJS" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>每个socket同样会触发<code>disconnect</code>事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a user connected'</span>);
  socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'user disconnected'</span>);
  });
});</code></pre>
<p>这样你刷新网页的多次，你就会看到：<br><span class="img-wrap"><img data-src="/img/bVpYJ7" src="https://static.alili.tech/img/bVpYJ7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">触发事件</h2>
<p><code>Socket.IO</code>背后最主要的作用时可以让服务器和客户端发送和接受事件触发，任何能被编辑成<code>JSON或二进制</code>的对象都可以传递。</p>
<p>我们先来实现这种情况：用户输入信息，服务器端接收到<code>chat message</code>事件，这是<code>index.html</code>中的<code>script</code>应该这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/socket.io/socket.io.js&quot;></script>
<script src=&quot;http://code.jquery.com/jquery-1.11.1.js&quot;></script>
<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/socket.io/socket.io.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://code.jquery.com/jquery-1.11.1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> socket = io();
  $(<span class="hljs-string">'form'</span>).submit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    socket.emit(<span class="hljs-string">'chat message'</span>, $(<span class="hljs-string">'#m'</span>).val());
    $(<span class="hljs-string">'#m'</span>).val(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在<code>index.js</code>，我们输出<code>chat message</code>事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>)</span>{
  socket.on(<span class="hljs-string">'chat message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'message: '</span> + msg);
  });
});
</code></pre>
<h2 id="articleHeader6">广播</h2>
<p>下一个目标就是由服务器触发每一个客户端的事件</p>
<p>为了给每个客户端发送时间，<code>Socket.io提供</code>了<code>io.emit</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.emit('some event', { for: 'everyone' });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;">io.<span class="hljs-keyword">emit</span>(<span class="hljs-string">'some event'</span>, { <span class="hljs-keyword">for</span>: <span class="hljs-string">'everyone'</span> });</code></pre>
<p>如果你想给每个人发送消息，出了某个特定的socket连接，我们可以用<code>boardcast</code>标示符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(socket)</span></span>{
  socket.broadcast.emit(<span class="hljs-string">'hi'</span>);
});</code></pre>
<p>在我们这个项目中，为了简便，我们给每个连接的用户都发送消息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(socket)</span></span>{
  socket.on(<span class="hljs-string">'chat message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(msg)</span></span>{
    io.emit(<span class="hljs-string">'chat message'</span>, msg);
  });
});
</code></pre>
<p>在客户端这一侧，当我们捕获到了<code>chat message</code>事件，我们将它体现在页面中，所有的JavaScript如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> socket = io();
  $(<span class="hljs-string">'form'</span>).submit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    socket.emit(<span class="hljs-string">'chat message'</span>, $(<span class="hljs-string">'#m'</span>).val());
    $(<span class="hljs-string">'#m'</span>).val(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  });
  socket.on(<span class="hljs-string">'chat message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    $(<span class="hljs-string">'#messages'</span>).append($(<span class="hljs-string">'&lt;li&gt;'</span>).text(msg));
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这时我们就完成了我们的聊天应用，仅仅只有20行代码！！！</p>
<h2 id="articleHeader7">后话</h2>
<blockquote>
<p>当然，学好前端，你还需要关注一个公众号！——<strong>每日前端</strong><br>各位兄弟姐妹，共勉！</p>
<p><span class="img-wrap"><img data-src="/img/bVuObD" src="https://static.alili.tech/img/bVuObD" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
零基础搭建网页聊天室（socket.io使用教程）

## 原文链接
[https://segmentfault.com/a/1190000004925844](https://segmentfault.com/a/1190000004925844)


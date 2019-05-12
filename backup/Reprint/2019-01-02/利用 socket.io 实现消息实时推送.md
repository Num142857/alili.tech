---
title: '利用 socket.io 实现消息实时推送' 
date: 2019-01-02 2:30:09
hidden: true
slug: h9cfvak6hwc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目背景介绍</h2>
<p>最近在写的项目中存在着社交模块，需要实现这样的一个功能：当发生了用户被点赞、评论、关注等操作时，需要由服务器向用户实时地推送一条消息。最终完成的项目地址为：<a href="https://github.com/noiron/socket-message-push" rel="nofollow noreferrer" target="_blank">socket-message-push</a>，这里将介绍一下实现的思路及部分代码。</p>
<p>项目的流程中存在着这样的几个对象：</p>
<ul>
<li><p>用 Java 实现的后端服务器</p></li>
<li><p>用 Node.js 实现的消息推送服务器</p></li>
<li><p>用户进行操作的客户端</p></li>
</ul>
<p>事件处理的流程如下：</p>
<ol>
<li><p>用户进行点赞操作时，后端服务器会进行处理，并向 Node.js 消息推送服务器发送一条消息</p></li>
<li><p>Node.js 消息推送服务器接收到后端发送的消息后，处理数据，并确定向哪个用户进行推送</p></li>
<li><p>用户的客户端接收到由 Node.js 服务器推送来的消息后，即可进行通知的显示。</p></li>
</ol>
<p>上面的流程中，Java 后端服务器是如何实现的不在此篇文章的讨论范围内，本文将主要介绍如何使用 Node.js 来实现这个消息推送服务器。</p>
<p>考虑消息推送服务器上必须记录下当前在线用户的信息，这样才能向特定的用户推送消息。所以当用户登录时，必须将自身的用户信息发到 Node.js 服务器上。为了达到这种双向的实时消息传递，很明显地考虑用 WebSocket 来实现。既然我们在消息推送服务器上使用了 Node.js，我们就有了一个很方便的选项：socket.io。</p>
<h2 id="articleHeader1">Socket.io 介绍</h2>
<p><a href="https://socket.io" rel="nofollow noreferrer" target="_blank">Socket.io</a>是一个用 JavaScript 实现的实时双向通信的库，利用它来实现我们的功能会很简单。</p>
<p><code>socket.io</code> 包含两个部分：</p>
<ul>
<li><p>服务器端（server）：运行在 Node.js 服务器上</p></li>
<li><p>客户端（client）：运行在浏览器中</p></li>
</ul>
<p>可以看看如下的 <code>socket.io</code> 的示例代码，它给出了 <code>socket.io</code> 发出及监听事件的基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection', function(socket){
  socket.emit('request', /* */); // emit an event to the socket
  io.emit('broadcast', /* */); // emit an event to all connected sockets
  socket.on('reply', function(){ /* */ }); // listen to the event
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>)</span>{
  socket.emit(<span class="hljs-string">'request'</span>, <span class="hljs-comment">/* */</span>); <span class="hljs-comment">// emit an event to the socket</span>
  io.emit(<span class="hljs-string">'broadcast'</span>, <span class="hljs-comment">/* */</span>); <span class="hljs-comment">// emit an event to all connected sockets</span>
  socket.on(<span class="hljs-string">'reply'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/* */</span> }); <span class="hljs-comment">// listen to the event</span>
});</code></pre>
<p>关于 Socket.io 还有一点需要注意：Socke.io 并不完全是 WebSocket 的实现。</p>
<blockquote><p>Note: Socket.IO is not a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed.</p></blockquote>
<p>接下来我们需要用 Express.js 来建立一个服务器端程序，并在其中引入 Socket.io。</p>
<h2 id="articleHeader2">Node.js 服务器的搭建</h2>
<h3 id="articleHeader3">利用 Express.js 搭建基础服务器</h3>
<p>我们使用了 Express.js 来搭建 Node.js 消息推送服务器，先利用一个简要的例子来浏览其功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server.js
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);

const port = 4001;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', function(req, res) {
    res.send('.');
});

http.listen(port, function() {
    console.log(`listening on port:${port}`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// server.js</span>
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).Server(app);

<span class="hljs-keyword">const</span> port = <span class="hljs-number">4001</span>;

app.use(express.static(path.join(__dirname, <span class="hljs-string">'public'</span>)));

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.sendFile(__dirname + <span class="hljs-string">'/public/index.html'</span>);
});

app.get(<span class="hljs-string">'/api'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">'.'</span>);
});

http.listen(port, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`listening on port:<span class="hljs-subst">${port}</span>`</span>);
});</code></pre>
<p>将上面的代码保存为 <code>server.js</code>，新建一个 <code>public</code> 文件夹，在其中放入 <code>index.html</code> 文件。运行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js
</code></pre>
<p>现在即可在 <code>localhost:4001</code> 查看效果了。</p>
<h3 id="articleHeader4">引入 Socket.io</h3>
<p>现在已经有了一个基础的 Express 服务器，接下来需要将 Socket.io 加入其中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.broadcast.emit('new_user', {});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(http);

io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a user connected'</span>);
    socket.broadcast.emit(<span class="hljs-string">'new_user'</span>, {});
}</code></pre>
<p>这里的 <code>io</code> 监听 <code>connection</code> 事件，当 <code>client</code> 与 <code>server</code> 建立了连接之后，这里的回调函数会被调用（<code>client</code> 中的代码将在下一节介绍）。</p>
<p>函数的参数 <code>socket</code> 代表的是当前的 <code>client</code> 和 <code>server</code> 间建立的这个连接。可在 <code>client</code> 程序中将这个建立的 socket 连接打印出来，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVUc4e?w=713&amp;h=385" src="https://static.alili.tech/img/bVUc4e?w=713&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>其中的 <code>id</code> 属性可以用于标识出这一连接，从而 <code>server</code> 可以向特定的用户发送消息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.broadcast.emit('new_user', {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">socket.broadcast.emit(<span class="hljs-string">'new_user'</span>, {});</code></pre>
<p>这一行代码表示 <code>socket</code> 将向当前所有与 <code>server</code> 建立了连接的 <code>client</code>（不包括自己） 广播一条名为 <code>new_user</code> 的消息。</p>
<h3 id="articleHeader5">后端推送消息的处理流程</h3>
<ol>
<li><p>在 Node 服务器建立一个用户信息和 socket id 的映射表，因为同一用户可能打开了多个页面，所以他的 socket id 可能存在多个值。当用户建立连接时，往其中添加值；用户断开连接后，删除相应值。</p></li>
<li><p>当 Java 后台存在需要推送的消息时，会向 Node 服务器的 <code>/api</code> 路径 post 一条消息，其中包括用于标识用户的 tokenId 和其它数据。</p></li>
<li><p>Node 服务器接收到 post 请求后，对请求内容进行处理。根据 tokenId 找出与该用户对应的 socket id，socket.io 会根据 id 来向用户推送消息。</p></li>
</ol>
<h3 id="articleHeader6">对用户信息的处理</h3>
<p>方便起见，这里只用一个数组保存用户信息，实际工作中可以根据需要放入数据库中保存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="global.users = []; // 记录下登录用户的tokenId, socketId" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">global.users = []; <span class="hljs-comment">// 记录下登录用户的tokenId, socketId</span></code></pre>
<p>当用户登录时，<code>client</code> 会向 <code>server</code> 发送 <code>user_login</code> 事件，服务器接收到后会做如下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.on('user_login', function(info) {
    const { tokenId, userId, socketId } = info;
    addSocketId(users, { tokenId, socketId, userId });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">socket.on(<span class="hljs-string">'user_login'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">info</span>) </span>{
    <span class="hljs-keyword">const</span> { tokenId, userId, socketId } = info;
    addSocketId(users, { tokenId, socketId, userId });
});</code></pre>
<p><code>addSocketId()</code> 会向 <code>users</code> 数组中添加用户信息，不同用户通过 tokenId 进行区分，每个用户有一个 <code>socketIds</code> 数组，保存可能存在的多个 <code>socketId</code>。该函数的具体代码可见 <code>src/utils.js</code> 文件。</p>
<p>同理，还有一个 <code>deleteSocketId()</code> 函数用于删除用户信息，代码可见同一文件。</p>
<p>在获取了用户的 tokenId 之后，就需要找到对应的 socketId，然后向特定用户推送消息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只向 id = socketId 的这一连接发送消息 
io.sockets.to(socketId).emit('receive_message', {
    entityType,
    data
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 只向 id = socketId 的这一连接发送消息 </span>
io.sockets.to(socketId).emit(<span class="hljs-string">'receive_message'</span>, {
    entityType,
    data
});</code></pre>
<p>服务器的思路大致如此，接下来介绍客户端中是如何进行相应的处理的。</p>
<h2 id="articleHeader7">客户端</h2>
<h3 id="articleHeader8">Socket.io 的初始化</h3>
<p>首先在 html 文件中引入 Socket.io 的 client 端文件，例如通过 CDN 引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>其它的引入方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/socket.io/socket.io.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/socket.io/socket.io.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const io = require('socket.io-client');
// or with import syntax
import io from 'socket.io-client';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io-client'</span>);
<span class="hljs-comment">// or with import syntax</span>
<span class="hljs-keyword">import</span> io <span class="hljs-keyword">from</span> <span class="hljs-string">'socket.io-client'</span>;</code></pre>
<p>引入 Socket.io 后就获得了 <code>io</code> 函数，通过它来与消息推送服务器建立连接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假设你将 Node 服务器部署后的地址为：https://www.example.com/ws
// 则： WS_HOST = 'https://www.example.com'
const msgSocket = io(`${WS_HOST}`, {
    secure: true,
    path: '/ws/socket.io'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 假设你将 Node 服务器部署后的地址为：https://www.example.com/ws</span>
<span class="hljs-comment">// 则： WS_HOST = 'https://www.example.com'</span>
<span class="hljs-keyword">const</span> msgSocket = io(<span class="hljs-string">`<span class="hljs-subst">${WS_HOST}</span>`</span>, {
    <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/ws/socket.io'</span>
});</code></pre>
<p>如果监听本地：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const msgSocket = io('http://localhost:4001');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> msgSocket = io(<span class="hljs-string">'http://localhost:4001'</span>);</code></pre>
<p>这里如果写成 <code>io('https://www.example.com/ws')</code> 会出现错误，需要将 <code>/ws</code> 写入path中。</p>
<p>为了能在其它文件使用这一变量，可将 <code>msgSocket</code> 作为一个全局变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.msgSocket = msgSocket;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.msgSocket = msgSocket;</code></pre>
<h3 id="articleHeader9">用户建立连接</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用户登录时，向服务器发送用户的信息。服务器会在收到信息后建立 socket 与用户的映射。
msgSocket.emit('user_login', {
    userId,
    socketId: msgSocket.id,
    tokenId
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 用户登录时，向服务器发送用户的信息。服务器会在收到信息后建立 socket 与用户的映射。</span>
msgSocket.emit(<span class="hljs-string">'user_login'</span>, {
    userId,
    <span class="hljs-attr">socketId</span>: msgSocket.id,
    tokenId
});</code></pre>
<h3 id="articleHeader10">接收到推送的消息后的处理</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// WebSocket 连接建立后，监听名为 receive_message 的事件 
msgSocket.on('receive_message', msg => {
    store.dispatch({
        type: 'NEW_SOCKET_MSG',
        payload: msg
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// WebSocket 连接建立后，监听名为 receive_message 的事件 </span>
msgSocket.on(<span class="hljs-string">'receive_message'</span>, msg =&gt; {
    store.dispatch({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'NEW_SOCKET_MSG'</span>,
        <span class="hljs-attr">payload</span>: msg
    });
});</code></pre>
<p>当 WebSocket 服务器向客户端推送了消息之后，客户端需要监听 <code>receive_message</code> 事件，接收到的参数中有相应待处理的信息。</p>
<p>由于使用了 Redux 进行数据的处理，所以这里 dispatch 了一个 <code>NEW_SOCKET_MSG</code> action，后续则是常规的 redux 处理流程了。</p>
<h2 id="articleHeader11">项目的使用</h2>
<p>GitHub 上的项目地址：<a href="https://github.com/noiron/socket-message-push" rel="nofollow noreferrer" target="_blank">socket-message-push</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>即可在 devlopment 环境下进行测试，现在你就有了一个运行在4001端口的消息推送服务器了。</p>
<p>但是这里并没有后端的服务器来向我们发送消息，所以我们将利用 Postman 来模拟发送消息。</p>
<p>为了展示程序的功能，在项目的 client 文件夹下放置了一个 <code>index.html</code> 文件。注意这个文件并不能用在实际的项目中，只是用来显示消息推送的效果而已。</p>
<p>在开启了服务器之后，打开 <code>client/index.html</code>，根据提示随意输入一个 tokenId 即可。</p>
<p>现在利用 Postman 向 <code>localhost:4001/api</code> post 如下的一条信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ 
    // tokens 数组表示你想向哪个用户推送消息
    &quot;tokens&quot;: [&quot;1&quot;, &quot;2&quot;], 
    &quot;data&quot;: &quot;You shall not pass!!!&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{ 
    // tokens 数组表示你想向哪个用户推送消息
    <span class="hljs-string">"tokens"</span>: [<span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>], 
    <span class="hljs-string">"data"</span>: <span class="hljs-string">"You shall not pass!!!"</span>
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUc4h?w=849&amp;h=246" src="https://static.alili.tech/img/bVUc4h?w=849&amp;h=246" alt="postman-post-a-message" title="postman-post-a-message" style="cursor: pointer;"></span></p>
<p>至此，如果一切顺利，你应该能够在 client 的控制台中看到收到的消息了。</p>
<p><span class="img-wrap"><img data-src="/img/bVUc4m?w=896&amp;h=79" src="https://static.alili.tech/img/bVUc4m?w=896&amp;h=79" alt="client-message" title="client-message" style="cursor: pointer;"></span></p>
<p>你可以打开多个 client 页面，输入不同的 tokenId，然后检查消息是否发送给了正确的用户。</p>
<h2 id="articleHeader12">参考资料</h2>
<blockquote><p><a href="https://github.com/socketio/socket.io/tree/master/examples/chat" rel="nofollow noreferrer" target="_blank">https://github.com/socketio/s...</a><br><a href="https://socket.io/docs/" rel="nofollow noreferrer" target="_blank">https://socket.io/docs/</a></p></blockquote>
<hr>
<p>本文在我博客上的原地址：<a href="http://www.wukai.me/2017/08/27/push-message-with-socketio/" rel="nofollow noreferrer" target="_blank">利用 socket.io 实现消息实时推送</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用 socket.io 实现消息实时推送

## 原文链接
[https://segmentfault.com/a/1190000010974426](https://segmentfault.com/a/1190000010974426)


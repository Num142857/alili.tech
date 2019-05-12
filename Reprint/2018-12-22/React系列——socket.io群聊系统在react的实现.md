---
title: 'React系列——socket.io群聊系统在react的实现' 
date: 2018-12-22 2:30:11
hidden: true
slug: hbd3hm21v94
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前奏</h3>
<p>这篇文章仅对不熟悉在react中使用socket.io的人、以及socket入门者有帮助。</p>
<p>下面这个动态图展示的聊天系统是用react+express+socket搭建的，很模糊吧，要得就是这样的效果，我自己开了2个窗口，创建2个用户自问自答。没有什么高深的技术，对于很多想接触socket的前端工程师来说，不擅长后端的socket代码可能是硬伤。</p>
<p><span class="img-wrap"><img data-src="/img/bV0eV1?w=600&amp;h=352" src="https://static.alili.tech/img/bV0eV1?w=600&amp;h=352" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">开发环境</h3>
<p>服务端：express服务器</p>
<p>客户端：react技术栈，开发环境采用前端服务器的方式，打包后将静态资源放到服务端目录下做测试。</p>
<h3 id="articleHeader2">基本介绍</h3>
<p>想要实现一种实时的双向通信聊天系统，你可能会想到ajax轮询（长或短），但你最想要的还是socket的实现。</p>
<p>在写测试代码之前，我纠结于前端用什么，后端用什么，后来后端选择了express、前端是react。</p>
<p>1、服务端使用到的js库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="express

socket.io" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">express

socket.io</code></pre>
<p>2、前端使用到的js库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;react&quot;: &quot;^16.2.0&quot;,
&quot;react-dom&quot;: &quot;^16.2.0&quot;,
&quot;socket.io-client&quot;: &quot;^2.0.4&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"react"</span>: <span class="hljs-string">"^16.2.0"</span>,
<span class="hljs-string">"react-dom"</span>: <span class="hljs-string">"^16.2.0"</span>,
<span class="hljs-string">"socket.io-client"</span>: <span class="hljs-string">"^2.0.4"</span></code></pre>
<h3 id="articleHeader3">express服务端的实现</h3>
<p>服务端的实现我不想多讲，你可以去看官方demo，代码很详细：<a href="https://socket.io/demos/chat/" rel="nofollow noreferrer" target="_blank">socket官方demo实现</a></p>
<p>服务端的核心代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection', function (socket) {
    // 当客户端发出“new message”时，服务端监听到并执行相关代码
    socket.on('new message', function (data) {
        // 广播给用户执行“new message”
        socket.broadcast.emit('new message', {});
    });
    
    // 当客户端发出“add user”时，服务端监听到并执行相关代码
    socket.on('add user', function (username) {
        socket.username = username;
        //服务端告诉当前用户执行'login'指令
        socket.emit('login', {});
    });
    
    // 当用户断开时执行此指令
    socket.on('disconnect', function () {});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">socket</span>) </span>{
    <span class="hljs-comment">// 当客户端发出“new message”时，服务端监听到并执行相关代码</span>
    socket.on(<span class="hljs-string">'new message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-comment">// 广播给用户执行“new message”</span>
        socket.broadcast.emit(<span class="hljs-string">'new message'</span>, {});
    });
    
    <span class="hljs-comment">// 当客户端发出“add user”时，服务端监听到并执行相关代码</span>
    socket.on(<span class="hljs-string">'add user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">username</span>) </span>{
        socket.username = username;
        <span class="hljs-comment">//服务端告诉当前用户执行'login'指令</span>
        socket.emit(<span class="hljs-string">'login'</span>, {});
    });
    
    <span class="hljs-comment">// 当用户断开时执行此指令</span>
    socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{});
});</code></pre>
<p>socket和mongodb有点像，它需要创建一个socket服务，创建成功之后，就可以通过on()去监听一个action，action在这里表示的是 'new message'、'add user'、'login'等指令，这些指令是可以自己命名的。</p>
<p>这些指令有什么作用呢？</p>
<p>当客户端和服务端建立socket通信之后，服务端可以向客户端发出指令，客户端也可以向服务端发出指令，开发者需要先给双方的通信约定一套指令系统。</p>
<p>比如服务端创建了一个 'new message'的指令，但是客户端没有创建这个指令，就会导致客户端无法接收到服务端发出的这个指令。客户端心里可能在想：服务端老兄在瞎bb什么？</p>
<p>客户端也需要 ’new message’指令，这样双方就能达成一套通信的协议，双方可以互相发出这条指令告诉对方最新的状态。</p>
<p>上面代码提到了socket.emit()和socket.broadcast.emit()2种用法，可以看看下面关于emit用法的详细解释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 发送到当前请求socket通信的客户端
socket.emit('message', &quot;this is a test&quot;);

// 发送给所有客户端，除了发件人
socket.broadcast.emit('message', &quot;this is a test&quot;);

// 发送给“游戏”房间（频道）中的所有客户，发件人除外
socket.broadcast.to('game').emit('message', 'nice game');

// 发送给所有的客户，包括发件人
io.sockets.emit('message', &quot;this is a test&quot;);

// 发送给“游戏”房间（频道）的所有客户，包括发件人
io.sockets.in('game').emit('message', 'cool game');

// 发送给指定的socketid
io.sockets.socket(socketid).emit('message', 'for your eyes only');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 发送到当前请求socket通信的客户端</span>
socket.emit(<span class="hljs-string">'message'</span>, <span class="hljs-string">"this is a test"</span>);

<span class="hljs-comment">// 发送给所有客户端，除了发件人</span>
socket.broadcast.emit(<span class="hljs-string">'message'</span>, <span class="hljs-string">"this is a test"</span>);

<span class="hljs-comment">// 发送给“游戏”房间（频道）中的所有客户，发件人除外</span>
socket.broadcast.to(<span class="hljs-string">'game'</span>).emit(<span class="hljs-string">'message'</span>, <span class="hljs-string">'nice game'</span>);

<span class="hljs-comment">// 发送给所有的客户，包括发件人</span>
io.sockets.emit(<span class="hljs-string">'message'</span>, <span class="hljs-string">"this is a test"</span>);

<span class="hljs-comment">// 发送给“游戏”房间（频道）的所有客户，包括发件人</span>
io.sockets.in(<span class="hljs-string">'game'</span>).emit(<span class="hljs-string">'message'</span>, <span class="hljs-string">'cool game'</span>);

<span class="hljs-comment">// 发送给指定的socketid</span>
io.sockets.socket(socketid).emit(<span class="hljs-string">'message'</span>, <span class="hljs-string">'for your eyes only'</span>);</code></pre>
<p><strong>socket的这种行为更像是redux，但是redux是单向数据流，而socket是双向。</strong></p>
<h3 id="articleHeader4">React客户端的实现</h3>
<p>React端的实现，才是我们应该关注的重点。</p>
<p>作为一个前端工程师，往往只需要和后端大神配合即可（全栈除外）。</p>
<p><strong>1、在react组件中导入socket.io-client</strong></p>
<p>前端使用的是socket.io-client库，这个库使用非常简单。下面的代码中，直接导入socket.io-client并且指向服务端的ip+端口即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

//require('socket.io-client')('服务端ip+端口')
const socket = require('socket.io-client')('http://localhost:3077');

class App extends Component {
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-comment">//require('socket.io-client')('服务端ip+端口')</span>
<span class="hljs-keyword">const</span> socket = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io-client'</span>)(<span class="hljs-string">'http://localhost:3077'</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    
}</code></pre>
<p><strong>2、在componentDidMount写socket的接收指令action</strong></p>
<p>socket.on()设置了服务端约定好的指令，当服务端发出这些指令时，客户端就能接收到。这时候，你可以在回调函数里面根据后端返回的数据 data 做前端的处理，比如设置state的状态，渲染服务端推送的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
        socket.on('login', (data) => {
            console.log(data)
        });
        socket.on('add user', (data) => {
            console.log(data)
        });
        socket.on('new message', (data) => {
            console.log(data)
        });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
        socket.on(<span class="hljs-string">'login'</span>, (data) =&gt; {
            <span class="hljs-built_in">console</span>.log(data)
        });
        socket.on(<span class="hljs-string">'add user'</span>, (data) =&gt; {
            <span class="hljs-built_in">console</span>.log(data)
        });
        socket.on(<span class="hljs-string">'new message'</span>, (data) =&gt; {
            <span class="hljs-built_in">console</span>.log(data)
        });
    }</code></pre>
<p><strong>3、客户端推送数据到服务端</strong></p>
<p>很多时候，客户端也需要告诉服务端有新的数据更新，当你在聊天界面发了一条新消息，这时候要告诉服务端，就通过socket.emit()方法，和服务端推送的方法是一样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.emit('new message', value)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">socket.emit(<span class="hljs-string">'new message'</span>, value)</code></pre>
<h3 id="articleHeader5">总结</h3>
<p>1、当你想要告诉对方一些话时，使用socket.emit()。</p>
<p>2、当你想接收对方的话时，使用socket.on()。</p>
<p>3、emit还有点对点、广播等用法。</p>
<p>4、最后说一句，这些都是基础知识。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——socket.io群聊系统在react的实现

## 原文链接
[https://segmentfault.com/a/1190000012411572](https://segmentfault.com/a/1190000012411572)


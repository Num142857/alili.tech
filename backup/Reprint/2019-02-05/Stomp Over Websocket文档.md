---
title: 'Stomp Over Websocket文档' 
date: 2019-02-05 2:30:09
hidden: true
slug: u8kafrx7x4a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>前两天整理了<code>websocket</code>的资料，今天就把上次没说完的<code>Stomp.js</code>好好说一说~  <br>Stomp Over Webscoket参考文档：<a href="http://jmesnil.net/stomp-websocket/doc/" rel="nofollow noreferrer" target="_blank">http://jmesnil.net/stomp-webs...</a>  <br>本文为参考文档的部分翻译，技术不佳，如有失误请指正。<br>本文转载自个人博客：<a href="http://lsxj615.com/2016/08/17/STOMP-over-WebSocket/" rel="nofollow noreferrer" target="_blank">http://lsxj615.com/2016/08/17...</a></p>
<h2 id="articleHeader1">什么是Stomp</h2>
<blockquote>STOMP即Simple (or Streaming) Text Orientated Messaging Protocol，简单(流)文本定向消息协议，它提供了一个可互操作的连接格式，允许STOMP客户端与任意STOMP消息代理（Broker）进行交互。STOMP协议由于设计简单，易于开发客户端，因此在多种语言和多种平台上得到广泛地应用。</blockquote>
<h2 id="articleHeader2">协议支持</h2>
<p>该库支持多种版本的STOMP协议：</p>
<ul>
<li><a href="http://stomp.github.io/stomp-specification-1.0.html" rel="nofollow noreferrer" target="_blank">STOMP 1.0</a></li>
<li>[STOMP 1.1]<a>2</a>
</li>
</ul>
<h2 id="articleHeader3">下载STOMP.JS</h2>
<p>你可以下载 <a href="https://raw.githubusercontent.com/jmesnil/stomp-websocket/master/lib/stomp.js" rel="nofollow noreferrer" target="_blank">stomp.js</a> 并在你自己的WEB应用程序中使用。<br>提供了<a href="https://raw.githubusercontent.com/jmesnil/stomp-websocket/master/lib/stomp.min.js" rel="nofollow noreferrer" target="_blank">多种版本</a>也可以直接用于生产。<br>这个js文件由CoffeeScript文件构建，请查看<a href="http://jmesnil.net/stomp-websocket/doc/#contribute" rel="nofollow noreferrer" target="_blank">Contribute</a>部分下载源码或浏览 <a href="http://jmesnil.net/stomp-websocket/doc/stomp.html" rel="nofollow noreferrer" target="_blank">annote source code</a></p>
<h2 id="articleHeader4">服务端要求</h2>
<p>这个库不是单纯的Stomp 客户端。它旨在WebSockets上运行而不是TCP。基本上，WebSocket协议需要在浏览器客户端和服务端之间进行握手，确保浏览器的“same-origin”（同源）安全模型仍然有效。</p>
<p>这意味着该库不能连接常规的STOMP代理，因为Websocket初始化的握手不是STOMP协议的一部分，他们不能理解从而会拒绝连接。</p>
<p>有一些正在进行的工作添加了WebSocket支持STOMP代理，从而他们可以在WebSocket协议上接受STOMP连接。</p>
<h3 id="articleHeader5">HornetQ</h3>
<p>HornetQ是由Red Hat and JBoss创立的开源消息系统.</p>
<p>要使HornetQ支持STOMP Over WebSocket，下载最新版本并按照下列步骤执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd hornetq-x.y.z/examples/jms/stomp-websockets
$ mvn clean install
...
INFO: HQ221020: Started Netty Acceptor version 3.6.2.Final-c0d783c         localhost:61614 for STOMP_WS protocol
Apr 15, 2013 1:15:33 PM org.hornetq.core.server.impl.HornetQServerImpl$SharedStoreLiveActivation run
INFO: HQ221007: Server is now live
Apr 15, 2013 1:15:33 PM org.hornetq.core.server.impl.HornetQServerImpl start
INFO: HQ221001: HornetQ Server version 2.3.0.CR2 (black'n'yellow2, 123) [c9e29e45-a5bd-11e2-976a-b3fef7ceb5df]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>$ cd hornetq-x<span class="hljs-selector-class">.y</span><span class="hljs-selector-class">.z</span>/examples/jms/stomp-websockets
$ mvn clean install
...
INFO: HQ221020: Started Netty Acceptor version <span class="hljs-number">3.6</span>.<span class="hljs-number">2</span><span class="hljs-selector-class">.Final-c0d783c</span>         localhost:<span class="hljs-number">61614</span> <span class="hljs-keyword">for</span> STOMP_WS protocol
Apr <span class="hljs-number">15</span>, <span class="hljs-number">2013</span> <span class="hljs-number">1</span>:<span class="hljs-number">15</span>:<span class="hljs-number">33</span> PM org<span class="hljs-selector-class">.hornetq</span><span class="hljs-selector-class">.core</span><span class="hljs-selector-class">.server</span><span class="hljs-selector-class">.impl</span><span class="hljs-selector-class">.HornetQServerImpl</span><span class="hljs-variable">$SharedStoreLiveActivation</span> run
INFO: HQ221007: Server is now live
Apr <span class="hljs-number">15</span>, <span class="hljs-number">2013</span> <span class="hljs-number">1</span>:<span class="hljs-number">15</span>:<span class="hljs-number">33</span> PM org<span class="hljs-selector-class">.hornetq</span><span class="hljs-selector-class">.core</span><span class="hljs-selector-class">.server</span><span class="hljs-selector-class">.impl</span><span class="hljs-selector-class">.HornetQServerImpl</span> start
INFO: HQ221001: HornetQ Server version <span class="hljs-number">2.3</span>.<span class="hljs-number">0</span><span class="hljs-selector-class">.CR2</span> (black<span class="hljs-string">'n'</span>yellow2, <span class="hljs-number">123</span>) [c9e29e45-a5bd-<span class="hljs-number">11</span>e2-<span class="hljs-number">976</span>a-b3fef7ceb5df]
</code></pre>
<p>此时HornetQ已经开启了，并且61614在端口监听STOMP over WebSocket<br>它从URL为ws://localhost:61614/stomp 接受WebSocket的连接。</p>
<p><a href="http://docs.jboss.org/hornetq/2.3.0.CR2/docs/user-manual/html/interoperability.html#stomp.websockets" rel="nofollow noreferrer" target="_blank">配置文档</a></p>
<h3 id="articleHeader6">ActiveMQ</h3>
<p><a href="http://activemq.apache.org/websockets.html" rel="nofollow noreferrer" target="_blank">配置文档</a></p>
<h3 id="articleHeader7">ActiveMQ Apollo</h3>
<p><a href="http://activemq.apache.org/apollo/documentation/user-manual.html#WebSocket_Transports" rel="nofollow noreferrer" target="_blank">配置文档</a></p>
<h3 id="articleHeader8">RabbitMQ</h3>
<p><a>配置文档</a></p>
<h3 id="articleHeader9">Stilts &amp; Torquebox</h3>
<p><a href="http://stilts.projectodd.org/" rel="nofollow noreferrer" target="_blank">Stilts</a> 是一个STOMP原生的消息框架。</p>
<p><a href="http://torquebox.org/" rel="nofollow noreferrer" target="_blank">TorqueBox</a> 使用Stilts去提供它的<a href="http://torquebox.org/documentation/2.1.2/stomp.html" rel="nofollow noreferrer" target="_blank">Websockets and STOMP stack</a>。</p>
<h2 id="articleHeader10">Stomp API</h2>
<h3 id="articleHeader11">STOMP 帧（Frame）</h3>
<p>STOMP Over WebSocket 提供了一个直接从<code>Stomp Frame</code>映射到 Javascript 对象的方式。  <br><code>Stomp Frame</code>帧格式如下：</p>
<table>
<thead><tr>
<th>Property</th>
<th align="center">Type</th>
<th align="right">Notes</th>
</tr></thead>
<tbody>
<tr>
<td>command</td>
<td align="center">String</td>
<td align="right">name of the frame ("CONNECT", "SEND", etc.)</td>
</tr>
<tr>
<td>headers</td>
<td align="center">JavaScript object</td>
</tr>
<tr>
<td>body</td>
<td align="center">String</td>
</tr>
</tbody>
</table>
<p><code>command</code>和<code>headers</code>属性始终会被定义，不过当这个<code>frame</code>没有头部时，<code>headers</code>可以为空。若这个<code>frame</code>没有<code>body</code>，<code>body</code>的值可以为<code>null</code>。</p>
<h3 id="articleHeader12">创建<code>STOMP</code>客户端</h3>
<h4>在web浏览器中使用普通的Web Socket</h4>
<p>STOMP javascript 客户端会使用<code>ws://</code>的URL与STOMP 服务端进行交互。</p>
<p>为了创建一个STOMP客户端js对象，你需要使用<code>Stomp.client(url)</code>，而这个URL连接着服务端的WebSocket的代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = &quot;ws://localhost:61614/stomp&quot;;
var client = Stomp.client(url);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var url</span> = <span class="hljs-string">"ws://localhost:61614/stomp"</span>;
<span class="hljs-attribute">var client</span> = Stomp.client(url);
</code></pre>
<p><code>Stomp.client(url, protocols)</code>也可以用来覆盖默认的<code>subprotocols</code>。第二个参数可以是一个字符串或一个字符串数组去指定多个<code>subprotocols</code>。</p>
<h4>在web浏览器中使用定制的WebSocket</h4>
<p>浏览器提供了不同的WebSocket的协议，一些老的浏览器不支持WebSocket的脚本或者使用别的名字。默认下，<code>stomp.js</code>会使用浏览器原生的<code>WebSocket class</code>去创建WebSocket。</p>
<p>但是利用<code>Stomp.over(ws)</code>这个方法可以使用其他类型的WebSockets。这个方法得到一个满足WebSocket定义的对象。</p>
<p>例如，可以使用由<code>SockJS</code>实现的Websocket：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://cdn.sockjs.org/sockjs-0.3.min.js&quot;></script>
<script>
    // use SockJS implementation instead of the browser's native implementation
    var ws = new SockJS(url);
    var client = Stomp.over(ws);
    [...]
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.sockjs.org/sockjs-0.3.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">// use SockJS implementation instead of the browser's native implementation</span>
    <span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> SockJS(url);
    <span class="hljs-keyword">var</span> client = Stomp.over(ws);
    [...]
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>如果使用原生的Websockets就使用<code>Stomp.client(url)</code>，如果需要使用其他类型的Websocket（例如由SockJS包装的Websocket）就使用<code>Stomp.over(ws)</code>。</p>
<p>除了初始化有差别，Stomp API在这两种方式下是相同的。</p>
<h4>在<code>node.js</code>程序中</h4>
<p>通过<code>stompjs npm package</code>同样也可以在<code>node.js</code>程序中使用这个库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install stompjs
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>$ npm <span class="hljs-keyword">install</span> stompjs
</code></pre>
<p>在node.js<code>app</code>中, <code>require</code>这个模块:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Stomp = require('stompjs');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var Stomp</span> = require(<span class="hljs-string">'stompjs'</span>);
</code></pre>
<p>为了与建立在TCP socket的STOMP-broker连接，使用<code>Stomp.overTCP(host, port)</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var client = Stomp.overTCP('localhost', 61613);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var client</span> = Stomp.overTCP(<span class="hljs-string">'localhost'</span>, 61613);
</code></pre>
<p>为了与建立在Web Socket的STOMP broker连接，使用<code>Stomp.overWS(url)</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var client = Stomp.overWS('ws://localhost:61614/stomp');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var client</span> = Stomp.overWS(<span class="hljs-string">'ws://localhost:61614/stomp'</span>);
</code></pre>
<p>除了初始化不同，无论是浏览器还是node.js环境下，Stomp API都是相同的。</p>
<h3 id="articleHeader13">连接服务端</h3>
<p>一旦Stomp 客户端建立了，必须调用它的<code>connect()</code>方法去连接，从而Stomp服务端进行验证。这个方法需要两个参数，用户的登录和密码凭证。</p>
<p>这种情况下，客户端会使用Websocket打开连接，并发送一个<code>CONNECT frame</code>。</p>
<p>这个连接是异步进行的：你不能保证当这个方法返回时是有效连接的。为了知道连接的结果，你需要一个回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var connect_callback = function() {
    // called back after the client is connected and authenticated to the STOMP server
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> connect_callback = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// called back after the client is connected and authenticated to the STOMP server</span>
};
</code></pre>
<p>但是如果连接失败会发生什么呢？<code>connect()</code>方法接受一个可选的参数(<code>error_callback</code>)，当客户端不能连接上服务端时，这个回调函数<code>error_callback</code>会被调用，该函数的参数为对应的错误对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var error_callback = function(error) {
    // display the error's message header:
    alert(error.headers.message);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> error_callback = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span> </span>{
    <span class="hljs-comment">// display the error's message header:</span>
    alert(error.headers.message);
};
</code></pre>
<p>在大多数情况下，<code>connect()</code>方法可接受不同数量的参数来提供简单的API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.connect(login, passcode, connectCallback);
client.connect(login, passcode, connectCallback, errorCallback);
client.connect(login, passcode, connectCallback, errorCallback, host);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>client.<span class="hljs-built_in">connect</span>(login, passcode, connectCallback);
client.<span class="hljs-built_in">connect</span>(login, passcode, connectCallback, errorCallback);
client.<span class="hljs-built_in">connect</span>(login, passcode, connectCallback, errorCallback, host);
</code></pre>
<p><code>login</code>和<code>passcode</code>是strings，<code>connectCallback</code>和<code>errorCallback</code>则是functions。（有些brokers（代理）还需要传递一个<code>host</code>（String类型）参数。）</p>
<p>如果你需要附加一个<code>headers</code>头部，<code>connect</code>方法还接受其他两种形式的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.connect(headers, connectCallback);
client.connect(headers, connectCallback, errorCallback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>client.<span class="hljs-built_in">connect</span>(headers, connectCallback);
client.<span class="hljs-built_in">connect</span>(headers, connectCallback, errorCallback);
</code></pre>
<p><code>header</code>是<code>map</code>形式，<code>connectCallback</code>和<code>errorCallback</code>为functions。</p>
<p>需要注意：如果你使用上述这种方式，你需要自行在<code>headers</code>添加<code>login</code>,<code>passcode</code>（甚至<code>host</code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var headers = {
    login: 'mylogin',
    passcode: 'mypasscode',
    // additional header
    'client-id': 'my-client-id'
};
client.connect(headers, connectCallback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> headers = {
    login: <span class="hljs-string">'mylogin'</span>,
    passcode: <span class="hljs-string">'mypasscode'</span>,
    <span class="hljs-comment">// additional header</span>
    <span class="hljs-string">'client-id'</span>: <span class="hljs-string">'my-client-id'</span>
};
client.connect(headers, connectCallback);
</code></pre>
<p>断开连接时，调用<code>disconnect</code>方法，这个方法也是异步的，当断开成功后会接收一个额外的回调函数的参数。如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.disconnect(function() {
    alert(&quot;See you next time!&quot;);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>client.disconnect(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    alert(<span class="hljs-string">"See you next time!"</span>);
};
</code></pre>
<p>当客户端与服务端断开连接，就不会再发送或接收消息了。</p>
<h3 id="articleHeader14">Heart-beating</h3>
<p>如果STOMP broker(代理)接收STOMP 1.1版本的帧，<code>heart-beating</code>是默认启用的。<code>heart-beating</code>也就是频率，<code>incoming</code>是接收频率，<code>outgoing</code>是发送频率。</p>
<p>通过改变<code>incoming</code>和<code>outgoing</code>可以更改客户端的<code>heart-beating</code>(默认为10000ms)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.heartbeat.outgoing = 20000; 
// client will send heartbeats every 20000ms
client.heartbeat.incoming = 0;
// client does not want to receive heartbeats
// from the server

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-keyword">client</span>.heartbeat.outgoing = <span class="hljs-number">20000</span>; 
<span class="hljs-comment">// client will send heartbeats every 20000ms</span>
<span class="hljs-keyword">client</span>.heartbeat.incoming = <span class="hljs-number">0</span>;
<span class="hljs-comment">// client does not want to receive heartbeats</span>
<span class="hljs-comment">// from the server</span>

</code></pre>
<p><code>heart-beating</code>是利用<code>window.setInterval()</code>去规律地发送<code>heart-beats</code>或者检查服务端的<code>heart-beats</code>。</p>
<h3 id="articleHeader15">发送消息</h3>
<p>当客户端与服务端连接成功后，可以调用<code>send()</code>来发送STOMP消息。这个方法必须有一个参数，用来描述对应的STOMP的目的地。另外可以有两个可选的参数：<code>headers</code>，<code>object</code>类型包含额外的信息头部；<code>body</code>，一个String类型的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.send(&quot;/queue/test&quot;, {priority: 9}, &quot;Hello, STOMP&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>client.<span class="hljs-built_in">send</span>(<span class="hljs-string">"/queue/test"</span>, {priority: <span class="hljs-number">9</span>}, <span class="hljs-string">"Hello, STOMP"</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>client会发送一个STOMP发送帧给<code>/queue/test</code>，这个帧包含一个设置了<code>priority</code>为9的<code>header</code>和内容为“Hello, STOMP”的<code>body</code>。</p>
<p>如果你想发送一个有<code>body</code>的信息，也必须传递<code>headers</code>参数。如果没有<code>headers</code>需要传递，那么就传<code>{}</code>即可，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.send(destination, {}, body);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">client</span><span class="hljs-selector-class">.send</span>(<span class="hljs-selector-tag">destination</span>, {}, <span class="hljs-selector-tag">body</span>);

</code></pre>
<h3 id="articleHeader16">订阅（Subscribe）和接收（receive）消息</h3>
<p>为了在浏览器中接收消息，STOMP客户端必须先订阅一个目的地<code>destination</code>。</p>
<p>你可以使用<code>subscribe()</code>去订阅。这个方法有2个必需的参数：目的地(<code>destination</code>)，回调函数(<code>callback</code>)；还有一个可选的参数<code>headers</code>。其中<code>destination</code>是String类型，对应目的地，回调函数是伴随着一个参数的<code>function</code>类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subscription = client.subscribe(&quot;/queue/test&quot;, callback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var subscription</span> = client.subscribe(<span class="hljs-string">"/queue/test"</span>, callback);
</code></pre>
<p><code>subscribe()</code>方法返回一个<code>object</code>，这个<code>object</code>包含一个<code>id</code>属性，对应这个这个客户端的订阅ID。而<code>unsubscribe()</code>可以用来取消客户端对这个目的地<code>destination</code>的订阅。</p>
<p>默认情况下，如果没有在<code>headers</code>额外添加，这个库会默认构建一个独一无二的<code>ID</code>。在传递<code>headers</code>这个参数时，可以使用你自己的<code>ID</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mysubid = '...';
var subscription = client.subscribe(destination, callback, { id: mysubid });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var mysubid</span> = <span class="hljs-string">'...'</span>;
<span class="hljs-attribute">var subscription</span> = client.subscribe(destination, callback, { id: mysubid });
</code></pre>
<p>这个客户端会向服务端发送一个STOMP订阅帧（<code>SUBSCRIBE frame</code>）并注册回调事件。每次服务端向客户端发送消息时，客户端都会轮流调用回调函数，参数为对应消息的STOMP帧对象（<code>Frame object</code>）。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
        alert(&quot;got message with body &quot; + message.body)
    } else {
        alert(&quot;got empty message&quot;);
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code>callback = function(<span class="hljs-class"><span class="hljs-keyword">message</span>) {</span>
    <span class="hljs-comment">// called when the client receives a STOMP message from the server</span>
    if (<span class="hljs-class"><span class="hljs-keyword">message</span>.<span class="hljs-title">body</span>) </span>{
        alert(<span class="hljs-string">"got message with body "</span> + <span class="hljs-class"><span class="hljs-keyword">message</span>.<span class="hljs-title">body</span>)
    } else </span>{
        alert(<span class="hljs-string">"got empty message"</span>);
    }
});
</code></pre>
<p><code>subscribe()</code>方法，接受一个可选的<code>headers</code>参数用来标识附加的头部。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var headers = {ack: 'client', 'selector': &quot;location = 'Europe'&quot;};

client.subscribe(&quot;/queue/test&quot;, message_callback, headers);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> headers = {ack: <span class="hljs-string">'client'</span>, <span class="hljs-string">'selector'</span>: <span class="hljs-string">"location = 'Europe'"</span>};

client.subscribe(<span class="hljs-string">"/queue/test"</span>, message_callback, headers);

</code></pre>
<p>这个客户端指定了它会确认接收的信息，只接收符合这个<code>selector : location = 'Europe'</code>的消息。</p>
<p>如果想让客户端订阅多个目的地，你可以在接收所有信息的时候调用相同的回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onmessage = function(message) {
    // called every time the client receives a message
}
var sub1 = client.subscribe(&quot;queue/test&quot;, onmessage);
var sub2 = client.subscribe(&quot;queue/another&quot;, onmessage)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(message)</span> </span>{
    <span class="hljs-comment">// called every time the client receives a message</span>
}
<span class="hljs-keyword">var</span> sub1 = client.subscribe(<span class="hljs-string">"queue/test"</span>, onmessage);
<span class="hljs-keyword">var</span> sub2 = client.subscribe(<span class="hljs-string">"queue/another"</span>, onmessage)

</code></pre>
<p>如果要中止接收消息，客户端可以在<code>subscribe()</code>返回的<code>object</code>对象调用<code>unsubscribe()</code>来结束接收。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subscription = client.subscribe(...);

...

subscription.unsubscribe();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">var</span> <span class="hljs-keyword">subscription </span>= client.<span class="hljs-keyword">subscribe(...);
</span>
<span class="hljs-symbol">...</span>

<span class="hljs-keyword">subscription.unsubscribe();
</span></code></pre>
<h3 id="articleHeader17">支持JSON</h3>
<p>STOMP消息的<code>body</code>必须为字符串。如果你需要发送/接收<code>JSON</code>对象，你可以使用<code>JSON.stringify()</code>和<code>JSON.parse()</code>去转换JSON对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var quote = {symbol: 'APPL', value: 195.46};
client.send(&quot;/topic/stocks&quot;, {}, JSON.stringify(quote));

client.subcribe(&quot;/topic/stocks&quot;, function(message) {
    var quote = JSON.parse(message.body);
    alert(quote.symbol + &quot; is at &quot; + quote.value);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> quote = {<span class="hljs-attr">symbol</span>: <span class="hljs-string">'APPL'</span>, <span class="hljs-attr">value</span>: <span class="hljs-number">195.46</span>};
client.send(<span class="hljs-string">"/topic/stocks"</span>, {}, <span class="hljs-built_in">JSON</span>.stringify(quote));

client.subcribe(<span class="hljs-string">"/topic/stocks"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>) </span>{
    <span class="hljs-keyword">var</span> quote = <span class="hljs-built_in">JSON</span>.parse(message.body);
    alert(quote.symbol + <span class="hljs-string">" is at "</span> + quote.value);
};
</code></pre>
<h3 id="articleHeader18">Acknowledgment(确认)</h3>
<p>默认情况，在消息发送给客户端之前，服务端会自动确认（<code>acknowledged</code>）。</p>
<p>客户端可以选择通过订阅一个目的地时设置一个<code>ack header</code>为<code>client</code>或<code>client-individual</code>来处理消息确认。</p>
<p>在下面这个例子，客户端必须调用<code>message.ack()</code>来通知服务端它已经接收了消息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subscription = client.subscribe(&quot;/queue/test&quot;,
    function(message) {
        // do something with the message
        ...
        // and acknowledge it
        message.ack();
    },
    {ack: 'client'}
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> subscription = client.subscribe(<span class="hljs-string">"/queue/test"</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(message)</span> </span>{
        <span class="hljs-comment">// do something with the message</span>
        ...
        <span class="hljs-comment">// and acknowledge it</span>
        message.ack();
    },
    {ack: <span class="hljs-string">'client'</span>}
);
</code></pre>
<p><code>ack()</code>接受<code>headers</code>参数用来附加确认消息。例如，将消息作为事务(transaction)的一部分，当要求接收消息时其实代理（broker）已经将<code>ACK STOMP frame</code>处理了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tx = client.begin();
message.ack({ transaction: tx.id, receipt: 'my-receipt' });
tx.commit();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var tx = client.begin();
message.ack({ <span class="hljs-keyword">transaction</span>: tx.<span class="hljs-built_in">id</span>, receipt: '<span class="hljs-keyword">my</span>-receipt' });
tx.commit();
</code></pre>
<p><code>nack()</code>也可以用来通知STOMP 1.1.brokers（代理）：客户端不能消费这个消息。与<code>ack()</code>方法的参数相同。</p>
<h3 id="articleHeader19">事务(Transactions)</h3>
<p>可以在将消息的发送和确认接收放在一个事务中。</p>
<p>客户端调用自身的<code>begin()</code>方法就可以开始启动事务了，<code>begin()</code>有一个可选的参数<code>transaction</code>，一个唯一的可标识事务的字符串。如果没有传递这个参数，那么库会自动构建一个。</p>
<p>这个方法会返回一个object。这个对象有一个<code>id</code>属性对应这个事务的ID，还有两个方法：<br><code>commit()</code>提交事务<br><code>abort()</code>中止事务</p>
<p>在一个事务中，客户端可以在发送/接受消息时指定transaction id来设置transaction。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// start the transaction
var tx = client.begin();
// send the message in a transaction
client.send(&quot;/queue/test&quot;, {transaction: tx.id}, &quot;message in a transaction&quot;);
// commit the transaction to effectively send the message
tx.commit();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">// start the transaction</span>
var tx = <span class="hljs-keyword">client</span>.begin();
<span class="hljs-comment">// send the message in a transaction</span>
<span class="hljs-keyword">client</span>.send(<span class="hljs-string">"/queue/test"</span>, {transaction: tx.id}, <span class="hljs-string">"message in a transaction"</span>);
<span class="hljs-comment">// commit the transaction to effectively send the message</span>
tx.commit();
</code></pre>
<p>如果你在调用<code>send()</code>方法发送消息的时候忘记添加transction header，那么这不会称为事务的一部分，这个消息会直接发送，不会等到事务完成后才发送。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var txid = &quot;unique_transaction_identifier&quot;;
// start the transaction
var tx = client.begin();
// oops! send the message outside the transaction
client.send(&quot;/queue/test&quot;, {}, &quot;I thought I was in a transaction!&quot;);
tx.abort(); // Too late! the message has been sent
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> txid = <span class="hljs-string">"unique_transaction_identifier"</span>;
<span class="hljs-comment">// start the transaction</span>
<span class="hljs-built_in">var</span> tx = client.begin();
<span class="hljs-comment">// oops! send the message outside the transaction</span>
client.send(<span class="hljs-string">"/queue/test"</span>, {}, <span class="hljs-string">"I thought I was in a transaction!"</span>);
tx.<span class="hljs-keyword">abort</span>(); <span class="hljs-comment">// Too late! the message has been sent</span>
</code></pre>
<h3 id="articleHeader20">调试（Debug）</h3>
<p>有一些测试代码能有助于你知道库发送或接收的是什么，从而来调试程序。</p>
<p>客户端可以将其<code>debug</code>属性设置为一个函数，传递一个字符串参数去观察库所有的debug语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.debug = function(str) {
    // append the debug log to a #debug div somewhere in the page using JQuery:
    $(&quot;#debug&quot;).append(str + &quot;\n&quot;);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>client.debug = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-comment">// append the debug log to a #debug div somewhere in the page using JQuery:</span>
    $(<span class="hljs-string">"#debug"</span>).append(str + <span class="hljs-string">"\n"</span>);
};
</code></pre>
<p>默认情况，debug消息会被记录在在浏览器的控制台。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Stomp Over Websocket文档

## 原文链接
[https://segmentfault.com/a/1190000006617344](https://segmentfault.com/a/1190000006617344)


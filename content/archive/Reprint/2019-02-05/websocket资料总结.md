---
title: 'websocket资料总结' 
date: 2019-02-05 2:30:09
hidden: true
slug: z1vm4iautp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>之前的项目中使用了<code>websocket</code>、<code>socketJS</code>，趁此机会将一些知识点及资料进行整理总结。正所谓温故而知新~<br>本文源地址： <a href="http://lsxj615.com/2016/08/14/websocket-notes/" rel="nofollow noreferrer" target="_blank">http://lsxj615.com/2016/08/14...</a></p></blockquote>
<h2 id="articleHeader0">websocket是什么</h2>
<p>按照惯例，在使用之前，先了解一下概念。</p>
<blockquote><p><code>websocket</code>是在<code>html5</code>中提供了一种浏览器和服务器间进行<strong>全双工</strong>通讯的网络技术。</p></blockquote>
<p>浏览器向服务端发送一个请求，通过报文头部<code>Upgrade</code>来表明需要从<code>HTTP</code>切换至<code>Websocket</code>协议。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET ws://echo.websocket.org/?encoding=text HTTP/1.1
Origin: http://websocket.org
Cookie: __utma=99as
Connection: Upgrade
Host: echo.websocket.org
Sec-WebSocket-Key: uRovscZjNol/umbTt5uKmw==
Upgrade: websocket
Sec-WebSocket-Version: 13
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>GET <span class="hljs-string">ws:</span><span class="hljs-comment">//echo.websocket.org/?encoding=text HTTP/1.1</span>
<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//websocket.org</span>
<span class="hljs-string">Cookie:</span> __utma=<span class="hljs-number">99</span><span class="hljs-keyword">as</span>
<span class="hljs-string">Connection:</span> Upgrade
<span class="hljs-string">Host:</span> echo.websocket.org
Sec-WebSocket-<span class="hljs-string">Key:</span> uRovscZjNol/umbTt5uKmw==
<span class="hljs-string">Upgrade:</span> websocket
Sec-WebSocket-<span class="hljs-string">Version:</span> <span class="hljs-number">13</span>
</code></pre>
<p>如果服务端理解websocket协议，它也是通过报文<code>Upgrade</code>从HTTP转换为Websocket协议。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 WebSocket Protocol Handshake
Date: Fri, 10 Feb 2012 17:38:18 GMT
Connection: Upgrade
Server: Kaazing Gateway
Upgrade: WebSocket
Access-Control-Allow-Origin: http://websocket.org
Access-Control-Allow-Credentials: true
Sec-WebSocket-Accept: rLHCkw/SKsO9GAH/ZSFhBATDKrU=
Access-Control-Allow-Headers: content-type
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">101</span> WebSocket Protocol Handshake
<span class="hljs-string">Date:</span> Fri, <span class="hljs-number">10</span> Feb <span class="hljs-number">2012</span> <span class="hljs-number">17</span>:<span class="hljs-number">38</span>:<span class="hljs-number">18</span> GMT
<span class="hljs-string">Connection:</span> Upgrade
<span class="hljs-string">Server:</span> Kaazing Gateway
<span class="hljs-string">Upgrade:</span> WebSocket
Access-Control-Allow-<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//websocket.org</span>
Access-Control-Allow-<span class="hljs-string">Credentials:</span> <span class="hljs-literal">true</span>
Sec-WebSocket-<span class="hljs-string">Accept:</span> rLHCkw<span class="hljs-regexp">/SKsO9GAH/</span>ZSFhBATDKrU=
Access-Control-Allow-<span class="hljs-string">Headers:</span> content-type
</code></pre>
<p>这个时候就建立起了websocket连接，基于TCP/IP。使用端口与HTTP(80)和HTTPS(443)一样。</p>
<h2 id="articleHeader1">为什么要用websocket？</h2>
<p>知道了什么是websocket，那么为什么要使用websocket呢？除了websocket之外，浏览器进行即时通信的方式还有以下几种：</p>
<ul>
<li><p>定期查询<br>每隔一个时间段就向服务器发送一个请求，请求服务器的最新数据再进行更新。但这样做的后果就是浪费大量流量，对服务端造成了巨大压力。</p></li>
<li>
<p>Comet<br>基于http长连接的“服务器推”技术。客户端与服务器端保持一个长连接，只有客户端需要的数据更新时，服务器才主动将数据推送给客户端。有两种形式：</p>
<ul>
<li><p>基于<code>Ajax</code>的长轮询（long-polling）方式<br>浏览器发出XMLHttpRequest请求，服务器端接收到请求后，会阻塞请求直到有数据或者超时才返回，浏览器在处理请求返回信息（超时或有效数据）后再次发出请求，重新建立连接。在此期间服务器端可能已经有新的数据到达，服务器会选择把数据保存，直到重新建立连接，浏览器会把所有数据一次性取回。</p></li>
<li><p>基于<code>Iframe</code>及<code>htmlfile</code>的流（http streaming）方式<br>通常的做法是在页面中嵌入一个隐藏的iframe,然后让这个iframe的src属性指向我们请求的一个服务端地址，并且为了数据更新，我们将页面上数据更新操作封装为一个js函数，将函数名当做参数传递到这个地址当中。服务端收到请求后解析地址取出参数（客户端js函数调用名），每当有数据更新的时候，返回对客户端函数的调用，并且将要跟新的数据以js函数的参数填入到返回内容当中，例如返回“&lt;script type="text/javascript"&gt;update("data")&lt;/script&gt;”这样一个字符串，意味着以data为参数调用客户端update函数进行客户端view更新。</p></li>
</ul>
<p>当应用程序有高吞吐量的需求，Comet的长轮询就不适合了。</p>
</li>
<li><p>SSE<br>SSE(服务端推送事件)是一种允许服务端向客户端推送新数据的HTML5技术。与websocket相比，WebSocket相较SSE最大的优势在于它是双向交流的，这意味向服务端发送数据就像从服务端接收数据一样简单。用SSE时，一般通过一个独立的Ajax请求从客户端向服务端传送数据。相对于WebSocket，这样使用Ajax会增加开销，但也就多一点点而已。</p></li>
</ul>
<p>相比于间断的轮询或长轮询来模拟全双工连接的解决方式，Websocket极大的减少了不必要的网络流量和延迟。除此之外，Websocket-based的应用减轻了服务器的负担，让现有的机器能支持更多的并发连接。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVArRk" src="https://static.alili.tech/img/bVArRk" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">如何使用websocket</h2>
<p>【以下例子来源于<a href="http://www.websocket.org/aboutwebsocket.html" rel="nofollow noreferrer" target="_blank">http://www.websocket.org/abou...</a>】<br>只需要创建一个新的Websocket实例，提供一个URL，这个URL表示的是你希望连接的那个end-point。如下所示。<br>需要注意的是: <code>ws://</code>和<code>wss://</code>的前缀表示了Websokcet和安全协议的Websocket连接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var myWebsocket = new Websocket(&quot;ws://www.websocket.org&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>
<span class="hljs-keyword">var</span> myWebsocket = <span class="hljs-keyword">new</span> <span class="hljs-type">Websocket</span>(<span class="hljs-string">"ws://www.websocket.org"</span>);
</code></pre>
<p>在连接到一个端点发送消息之前，你可以将一系列的事件监听器来处理连接的生命周期的每个阶段。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myWebSocket.onopen = function(evt) { 
    alert(&quot;Connection open ...&quot;); 
};
myWebSocket.onmessage = function(evt) { 
    alert( &quot;Received Message: &quot; + evt.data); 
};
myWebSocket.onclose = function(evt) { 
    alert(&quot;Connection closed.&quot;); 
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>myWebSocket.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(evt)</span> </span>{ 
    alert(<span class="hljs-string">"Connection open ..."</span>); 
};
myWebSocket.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(evt)</span> </span>{ 
    alert( <span class="hljs-string">"Received Message: "</span> + evt.data); 
};
myWebSocket.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(evt)</span> </span>{ 
    alert(<span class="hljs-string">"Connection closed."</span>); 
};
</code></pre>
<p>向服务端发送信息，只需要简单的<code>send</code>并提供你希望传递的内容。发送信息后，<code>close</code>终止连接。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
myWebSocket.send(&quot;Hello WebSockets!&quot;);
myWebSocket.close();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>
myWebSocket.send(<span class="hljs-string">"Hello WebSockets!"</span>)<span class="hljs-comment">;</span>
myWebSocket.close()<span class="hljs-comment">;</span>
</code></pre>
<h2 id="articleHeader3">socketJS</h2>
<p>我们都知道，webscoket是HTML5的新玩意，那么兼容性方面，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVArSF" src="https://static.alili.tech/img/bVArSF" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看出IE8以及Android 4.3是不支持的。这个时候，我们就可以来看看<code>socketJS</code>的优势了。</p>
<blockquote><p>SockJS is a browser JavaScript library that provides a WebSocket-like object. SockJS gives you a coherent, cross-browser, Javascript API which creates a low latency, full duplex, cross-domain communication channel between the browser and the web server.</p></blockquote>
<p><code>socketJS</code>的一大好处在于<strong>提供了浏览器兼容性</strong>。优先使用原生<code>websocket</code>，如果在不支持<code>websocket</code>的浏览器中，会自动降为轮询的方式。<br>除此之外，<code>spring</code>也对<code>socketJS</code>提供了支持。如果代码中添加了<code>withSockJS()</code>如下，服务器也会自动降级为轮询。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registry.addEndpoint(&quot;/coordination&quot;).withSockJS();  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">registry</span><span class="hljs-selector-class">.addEndpoint</span>(<span class="hljs-string">"/coordination"</span>)<span class="hljs-selector-class">.withSockJS</span>();  
</code></pre>
<h2 id="articleHeader4">如何使用socketJS</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//cdn.jsdelivr.net/sockjs/1.0.0/sockjs.min.js&quot;></script>

var sock = new SockJS('/coordination');  
sock.onopen = function() {
    console.log('open');
};
sock.onmessage = function(e) {
    console.log('message', e.data);
};
sock.onclose = function() {
    console.log('close');
};
sock.send('test');
sock.close();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;script src=<span class="hljs-string">"//cdn.jsdelivr.net/sockjs/1.0.0/sockjs.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

<span class="hljs-keyword">var</span> sock = <span class="hljs-keyword">new</span> SockJS(<span class="hljs-string">'/coordination'</span>);  
sock.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'open'</span>);
};
sock.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'message'</span>, e.data);
};
sock.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'close'</span>);
};
sock.send(<span class="hljs-string">'test'</span>);
sock.close();
</code></pre>
<p>更多内容，可查看github地址：<a href="https://github.com/sockjs/sockjs-client" rel="nofollow noreferrer" target="_blank">https://github.com/sockjs/soc...</a></p>
<h2 id="articleHeader5">什么是Stomp</h2>
<p>通过以上部分我们可以知道<code>websocket</code>的优势，兼容性的问题<code>socketJS</code>也帮我们解决了。不过这个时候，我还要安利一个好东西，也就是<code>Stomp</code>。</p>
<blockquote><p>STOMP is a simple text-orientated messaging protocol. It defines an interoperable wire format so that any of the available STOMP clients can communicate with any STOMP message broker to provide easy and widespread messaging interoperability among languages and platforms (the STOMP web site has a list of STOMP client and server implementations.</p></blockquote>
<p>具体内容，可查看官网：<a href="http://jmesnil.net/stomp-websocket/doc/" rel="nofollow noreferrer" target="_blank">http://jmesnil.net/stomp-webs...</a>。或者等我下一篇文章详谈吧~</p>
<p>参考资料：</p>
<ol>
<li><p><a href="http://blog.csdn.net/xjyzxx/article/details/24182677" rel="nofollow noreferrer" target="_blank">Spring WebSocket教程（一）</a></p></li>
<li><p><a href="http://www.52im.net/forum.php?mod=viewthread&amp;tid=331&amp;ctid=15" rel="nofollow noreferrer" target="_blank">WebSocket详解（一）：初步认识WebSocket技术</a></p></li>
<li><p><a href="http://jmesnil.net/stomp-websocket/doc/" rel="nofollow noreferrer" target="_blank">STOMP Over WebSocket</a></p></li>
<li><p><a href="https://github.com/sockjs/sockjs-client" rel="nofollow noreferrer" target="_blank">sockjs/sockjs-client</a></p></li>
<li><p><a href="http://blog.csdn.net/yxb19870428vv/article/details/41495543" rel="nofollow noreferrer" target="_blank">Spring websocket 使用</a></p></li>
<li><p><a href="http://www.tuicool.com/articles/uINBfiZ" rel="nofollow noreferrer" target="_blank">Web端即时通讯技术盘点：短轮询、Comet、Websocket、SSE</a></p></li>
<li><p><a href="http://www.websocket.org/aboutwebsocket.html" rel="nofollow noreferrer" target="_blank">websocket官网About HTML5 WebSocket</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
websocket资料总结

## 原文链接
[https://segmentfault.com/a/1190000006265489](https://segmentfault.com/a/1190000006265489)


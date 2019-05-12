---
title: '再也不学AJAX了！（三）跨域获取资源 ③ - WebSocket & postMessage' 
date: 2018-12-22 2:30:11
hidden: true
slug: dcwq9ixbye
categories: [reprint]
---

{{< raw >}}

                    
<p>让我们先简单回顾一下之前谈到的内容，AJAX是一种<strong>无页面刷新的获取服务器资源的混合技术</strong>。而基于浏览器的“同源策略”，不同“域”之间不可以发送AJAX请求。但是在某些情境下，我们需要“跨域获取资源”，为了满足这一需求，我们可以使用“JSONP”与“CORS”两种技术。</p>
<p>现在，我们将要简要了解“跨域共享资源”的另外两种方式：WebSocket 和 postMessage。让我们先大概看看他们是什么，以及究竟是基于怎样的原理，满足了我们的需求 - “跨域获取资源”。</p>
<h2 id="articleHeader0">一、WebSocket</h2>
<p>基于<a href="https://zh.wikipedia.org/wiki/WebSocket" rel="nofollow noreferrer" target="_blank">维基百科</a>的定义，WebSocket是一种<strong>在单个TCP连接上进行全双工通讯的协议</strong>。在这里我并不打算解释“TCP连接”和“全双工通讯”这两个专业术语（这样做会让这篇文章变得很长，而且也偏离了我们的主题），让我们聚焦这段定义的最后两个字<strong>协议</strong>。</p>
<p>说到协议，你是否联想到“HTTP协议”？没错，HTML5标准之所以提出了一种新的互联网通信协议 - WebSocket，就是为了弥补在<strong>某些情景</strong>下使用HTTP协议通信的一些不足。但是注意，这并不意味WebSocket协议就可以完全取代HTTP协议了，其实两者的关系更像是两兄弟，各自有着各自擅长的领域，而且时不时还一同协作解决难题。</p>
<p>那么上面提到的<strong>某些情景</strong>具体是指什么呢？答案是“<strong>服务端与客户端的双向通信</strong>”。我们知道，当我们使用HTTP协议时，客户端与服务端的通信模式始终是由客户端向服务端发送请求，服务端只负责验证请求并返回响应。</p>
<p>我们可以这样想象，在HTTP协议下，服务端扮演着“守门人”的角色，而客户端则是一个邮局，它每发送一个请求就像是委托一个信使携带一封信（信里注明自己的身份和需要获取资源的名称）到服务端，当信使到达时，“守门人”会拆开信封，检查里面的身份信息，如果身份合法则打开资源宝库的大门，将相应的资源交给信使，令其返回给客户端。</p>
<p>在这个故事里，服务端的角色有些枯燥呆板对吧？不仅如此，故事中服务端扮演的“守门人”角色还患有严重的脸盲症，在工作中他只“认信不认人”，也就是说客户端发送的每一个请求，对于服务而言都是全新的，守门人不会因为信使上次来过，或是收到两次相同的信而觉得眼熟，对信使有额外的寒暄。这也就是为什么我们说HTTP协议是“<strong>无状态的</strong>”。乍看起来，这似乎有些不合理，但是这种设计却使服务器的工作变得简单可控，提升了服务器的工作效率。</p>
<p>但是这样的设计仍然存在两个问题：</p>
<ol>
<li>每一个请求都需要身份验证，这对于用户而言意味着需要在每一次发送请求时输入身份信息；</li>
<li>当客户端所请求的资源是动态生成的时，客户端无法在资源生成时得到通知（还记得吧，服务器只是一个原地不动的“守门人”）；</li>
</ol>
<p>如何解决这两个问题呢？对于前者，答案是使用“<strong>Cookie</strong>”，而对于后者，则轮到我们今天的主角“<strong>WebSocket</strong>”大显身手。</p>
<p>在讨论WebSocket之前，让我们先稍微绕点路，谈谈“Cookie”是如何解决“每一个请求都需要身份验证”的问题的。</p>
<h3 id="articleHeader1">（一）为HTTP协议添加状态 - Cookie</h3>
<p>我们之前提到，HTTP协议下，客户端与服务端的通信是“无状态”的，也就是说，如果服务器中的某部分资源是由某个客户专属的，那么每当这个客户想要获取资源时，都需要首先在浏览器中输入账号密码，然后再发送请求，并在被服务器识别身份信息成功后获取请求的资源。我们当然不想每次发送一个请求都要输入一遍账号密码，因此我们需要Cookie，这个既可以存储在浏览器，又会被浏览器发送HTTP请求时默认发送至服务端，并且还受浏览器“同源策略”保护的东西帮助我们提高发起一次请求的效率。</p>
<p>在有了Cookie之后，我们可以在一次会话中（从用户登录到浏览器关闭）只输入一次账号密码，然后将其保存在Cookie中，在整个会话期间，Cookie都会伴随着HTTP请求的发送被服务器识别，从而避免了我们重复的输入身份信息。</p>
<p>不仅如此，基于Cookie的特性：可以保存在浏览器内，还会在浏览器发送HTTP请求时默认携带，服务端也可以操作Cookie。Cookie还可以帮助我们节省网络请求的发起数量。例如，当我们在制作一个购物网站时，我们当然不希望用户在每添加一个商品到购物车就向服务器发送一个请求（请求数量越少，服务器压力就越小），此时，我们就可以将添加商品所导致的数据变动存储在Cookie内，然后等待下次发送请求时，一并发送给服务器处理。</p>
<p>现在我们可以说，Cookie的出现，为无状态的HTTP协议通信添加了状态。</p>
<p>最后需要注意，Cookie大多数情况下，都保存着用户的身份信息，因此各种恶意攻击者对于Cookie的攻击便花样百出，层出不穷。其本质上就是想要获得用户的Cookie，再利用其中的身份信息伪装成用户获取相应资源，而浏览器的“同源策略”本质上就是保护用户的Cookie信息不会泄露。</p>
<h3 id="articleHeader2">（二）让服务器也动起来 - WebSocket</h3>
<p>绕了一个小弯，现在可以回过头来继续谈谈我们的主角WebSocket了。再让我们回忆一下WebSocket要解决的问题：</p>
<p>“<strong>客户端无法获知请求的动态资源何时到位</strong>“，让我们描述的更详细一点，有时候客户端想要请求的资源，服务器需要一定时间后才能返回（比如该资源依赖于其他服务器的计算返回结果），由于在HTTP协议下，网络通信是单向的，因此服务器并不具备当资源准备就绪时，通知浏览器的功能（因为我们要保障服务器的工作效率）。因此，基于HTTP协议通常的做法是，设置一个定时器，每隔一定时间由浏览器向服务器发送一次请求以探测资源是否到位。</p>
<p>这种做法显然浪费了很多请求，换句话说，浪费了很多带宽（我们每个请求都要携带Cookie和报头，这些都会占用带宽传输），不仅低效率，而且也不够优雅。</p>
<p>理所当然的，在这种情况下，我们希望当服务器资源到位时，能够主动通知浏览器并返回相应资源。而为了实现这一点，HTML5标准推出了WebSocket协议，使浏览器和服务器实现了双向通信，更妙的是，除了IE9及以下的IE浏览器，所有的浏览器都支持WebSocket协议。</p>
<p>让我们也同样构建一个基于WebSocket协议的心智模型，在这个心智模型中，服务端扮演的角色发生了一些改变，服务端不再只是一个“守门人”，同时它也运营着一个和客户端一样的“邮局”，也就是说，他也拥有了可以向客户端发送数据的能力。至此一个完整的基于WebSocket协议的通信流程为：</p>
<p>客户端派发一个信使向服务器送信，服务器扮演的“守门人”检查信件，发现信件中写到“让我们用更加潮流的WebSocket方式交流吧”，服务器在在信件末尾添加上一句“没问题，浏览器伙计”，让信使原路返回告知浏览器。当浏览器再次向服务器告知收到消息时（第三次握手），服务器就开始运转“邮局”，向客户端派发信使与浏览器互发信息，转发资源。</p>
<p>让我们看看这个模型的具体实现：</p>
<p>下面是客户端告知服务端要升级为WebSocket协议的报头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/chat</span> HTTP/1.1
<span class="hljs-attribute">Host</span>: server.example.com
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Sec-WebSocket-Key</span>: x3JJHMbDL1EzLkh9GBhXDw==
<span class="hljs-attribute">Sec-WebSocket-Protocol</span>: chat, superchat
<span class="hljs-attribute">Sec-WebSocket-Version</span>: 13
<span class="hljs-attribute">Origin</span>: http://example.com
</code></pre>
<p>下面是服务端向客户端返回的响应报头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>HTTP/1.1 <span class="hljs-number">101</span> Switching Protocols
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Sec-WebSocket-Accept</span>: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
<span class="hljs-attribute">Sec-WebSocket-Protocol</span>: chat
</code></pre>
<p>想知道这些报头中的字段中代表什么？可以参考<a href="https://zh.wikipedia.org/wiki/WebSocket" rel="nofollow noreferrer" target="_blank">维基百科</a>下的说明。</p>
<h3 id="articleHeader3">（三）客户端发起WebSocket请求</h3>
<p>既然我们已经为了解释“什么是WebSocket”，“WebSocket的意义”花了那么多篇幅，那么不妨添加上最后一个环节，让这个主题变得更加完整，接下来我们将要简单讲解一下客户端如何发起一个WebSocket请求。</p>
<p>像发起AJAX请求一样，发起WebSocket请求需要借助浏览器提供的<code>WebSocket</code>对象，该对象提供了用于创建和管理WebSocket连接，以及通过该连接收发数据的API。所有的浏览器都默认提供了WebSocket对象。让我们看看该对象的用法：</p>
<p>和使用<code>XHRHttpRequest</code>对象一样，我们首先要实例化一个<code>WebSocket</code>对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ws = new WebSocket(&quot;wss://echo.websocket.org&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-type">WebSocket</span>(<span class="hljs-string">"wss://echo.websocket.org"</span>)
</code></pre>
<p>传入的参数为响应WebSocket请求的地址。</p>
<p>同样类似AJAX的是，<code>WebSocket</code>对象也有一个<code>readyState</code>属性，用来表示对象实例当前所处的链接状态，有四个值：</p>
<ul>
<li>
<strong>0</strong>：表示正在连接中（CONNECTING）；</li>
<li>
<strong>1</strong>：表示连接成功，可以通信（OPEN）；</li>
<li>
<strong>2</strong>：表示连接正在关闭（CLOSING）；</li>
<li>
<strong>3</strong>：表示连接已经关闭或打开连接失败（CLOSED）；</li>
</ul>
<p>我们可以通过判断这个值来执行我们相应的代码。</p>
<p>除此之外，<code>WebSocket</code>对象还提供给我们一系列事件属性，使我们控制连接过程中的通信行为：</p>
<ul>
<li>
<code>onopen</code>：用于指定连接成功后的回调函数；</li>
<li>
<code>onclose</code>：用于指定连接关闭后的回调函数；</li>
<li>
<code>onmessage</code>：用于指定收到服务器数据后的回调函数；</li>
<li>
<code>onerror</code>：用于指定报错时的回调函数；</li>
</ul>
<p>通过<code>.send()</code>方法，我们拥有了向服务器发送数据的能力（WebSocket还允许我们发送二进制数据）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.send('Hi, server!')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>ws.<span class="hljs-built_in">send</span>(<span class="hljs-string">'Hi, server!'</span>)
</code></pre>
<p>如何知道何时我们的数据发送完毕呢？我们需要使用<code>WebSocket</code>对象的<code>bufferedAmount</code>属性，该属性的返回值表示了还有多少字节的二进制数据没有发送出去，所以我们可以通过判断该值是否为0而确定数据是否发送结束。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = new ArrayBuffer(1000000)
ws.send(data)

if (socket.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 还在发送
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">data</span> = <span class="hljs-literal">new</span> ArrayBuffer(<span class="hljs-number">1000000</span>)
ws.send(<span class="hljs-built_in">data</span>)

<span class="hljs-keyword">if</span> (socket.bufferedAmount === <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 发送完毕</span>
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 还在发送</span>
}
</code></pre>
<hr>
<p>OK，目前为止我们花了大量篇幅解释了WebSocket协议是什么，它能够帮助我们做什么，以及客户端发送WebSocket请求的方式。但是目前为止，我们还是没有谈论一丁点关于WebSocket是如何帮助我们绕过浏览器的“同源策略”让我们实现“跨域资源共享”，你是否已经有点等的不耐烦了？</p>
<p>但是别急，当你清楚的了解到WebSocket是什么之后，答案就呼之欲出了，那就是<strong>当客户端与服务端创建WebSocket连接后，本身就可以天然的实现跨域资源共享</strong>，WebSocket协议本身就不受浏览器“同源策略”的限制（还记得吧，同源策略只是限制了跨域的AJAX请求？），所以问题本身就不成立（有点赖皮是吧？）。</p>
<p>但是你可能又会问，如果没有浏览器“同源策略”的限制，那么用户的Cookie安全又由谁来保护呢？问得好，看来你有认真阅读上面的文字，为了解答这个问题，让我们换一种角度思考，我们说过Cookie的存在就是为了给无状态的HTTP协议通讯添加状态，因为Cookie是明文传输的，且通常包含用户的身份信息，所以非常受到网络攻击者的“关注”。但是想想WebSocket协议下的通讯机制，客户端和服务端一旦建立连接，就可以顺畅的互发数据，因此WebSocket协议本身就是“<strong>有状态的</strong>”，不需要Cookie的帮忙，既然没有Cookie，自然也不需要“同源策略”去保护，因此其实这个问题也不成立。</p>
<p>至此，已经将关于WebSocket的所有内容都大致讲述了一遍，真没想到是如此巨大的工作量。看来本篇文章不应该叫做“再也不学AJAX了”，而是“再也不学AJAX，JSONP，CORS，WebSocket..”。</p>
<p>真是了不起。</p>
<hr>
<h2 id="articleHeader4">二、postMessage</h2>
<p>回头一看，我们已经在“跨域”这个主题上整整停留了三篇文章，涉及的技术包括JSONP，CORS与WebSocket。需要注意的是，以上这些跨域技术都只适用于客户端请求异域服务端资源的情景。而除此之外，有时候我们还需要在异域的两个客户端之间共享数据，例如页面与内嵌iframe窗口通讯，页面与新打开异域页面通讯。</p>
<p>这就是使用HTML5提供的新API -- <code>postMessage</code>的时候了。</p>
<p>使用<code>postMessage</code>技术实现跨域的原理非常简单，一方面，主窗口通过<code>postMessage</code>API向异域的窗口发送数据，另一方面我们在异域的页面脚本中始终监听<code>message</code>事件，当获取主窗口数据时处理数据或者以同样的方式返回数据从而实现跨窗口的异域通讯。</p>
<p>让我们用具体的业务场景与代码进一步说明，假如我们的页面现在有两个窗口，窗口1命名为“window_1”， 窗口2命名为“window_2”，当然，窗口1与窗口2的“域”是不同的，我们的需求是由窗口1向窗口2发送数据，而当窗口2接收到数据时，将数据再返回给窗口1。先让我们看看窗口1<code>script</code>标签内的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// window_1 域名为 http://winodow1.com:8080
window.postMessage(&quot;Hi, How are you!&quot;, &quot;http://window2.com:8080&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> window_1 域名为 http:<span class="hljs-regexp">//</span>winodow1.com:<span class="hljs-number">8080</span>
window.postMessage(<span class="hljs-string">"Hi, How are you!"</span>, <span class="hljs-string">"http://window2.com:8080"</span>)
</code></pre>
<p>可以看到，<code>postMessage</code>函数接收两个参数，第一个为要发送的信息（可以是任何JavaScript类型数据，但部分浏览器只支持字符串格式），第二个为信息发送的目标地址。让我们再看看窗口2<code>script</code>标签内的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// window_2 域名为 http://window2.com:8080
window.addEventListener(&quot;message&quot;, receiveMessage, false)

function receiveMessage(event) {
    // 对于Chorme，origin属性为originalEvent.origin属性
    var origin = event.origin || event.originalEvent.origin
    if (origin !== &quot;http://window1.com:8080&quot;) {
        return 
    }
    window.postMessage(&quot;I\'m ok&quot;, &quot;http://window1.com:8080&quot;)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// window_2 域名为 http://window2.com:8080</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"message"</span>, receiveMessage, <span class="hljs-literal">false</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">receiveMessage</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-comment">// 对于Chorme，origin属性为originalEvent.origin属性</span>
    <span class="hljs-keyword">var</span> origin = event.origin || event.originalEvent.origin
    <span class="hljs-keyword">if</span> (origin !== <span class="hljs-string">"http://window1.com:8080"</span>) {
        <span class="hljs-keyword">return</span> 
    }
    <span class="hljs-built_in">window</span>.postMessage(<span class="hljs-string">"I\'m ok"</span>, <span class="hljs-string">"http://window1.com:8080"</span>)
}
</code></pre>
<p>看到了吗，我们在window上绑定了一个事件监听函数，监听<code>message</code>事件。一旦我们接收到其他域通过<code>postMessage</code>发送的信息，就会触发我们的<code>receiveMessage</code>回调函数。该函数会首先检查发送信息的域是否是我们想要的（之后我们会对此详细说明），如果验证成功则会像窗口1发送一条消息。</p>
<p>看起来很好懂不是吗，一方发送信息，一方捕捉信息。但是，我需要格外提醒你的是所有“跨域”技术都需要关注的“安全问题”。让我们想想postMessage技术之所以能实现跨域资源共享，本质上是要依赖于客户端脚本设置了相应的<code>message</code>监听事件。因此只要有消息通过<code>postMessage</code>发送过来，我们的脚本都会接收并进行处理。由于任何域都可以通过<code>postMessage</code>发送跨域信息，因此对于设置了事件监听器的页面来说，判断到达页面的信息是否是安全的是非常重要的事，因为我们并不想要执行有危险的数据。</p>
<p>那么接下来的问题便是，如何鉴别发送至页面的信息呢？答案是通过 <code>message</code>事件监听函数的事件对象，我们称它为<code>event</code>，该对象有三个属性：</p>
<ul>
<li>
<strong>data</strong>：值为其他window传递过来的对象；</li>
<li>
<strong>origin</strong>：值为消息发送方窗口的域名；</li>
<li>
<strong>source</strong>：值为对发送消息的窗口对象的引用；</li>
</ul>
<p>很显然的，我们应该着重检测<code>event</code>对象的<code>origin</code>属性，建立一个白名单对<code>origin</code>属性进行检测通常是一个明智的做法。</p>
<p>最后，再让我们谈谈<code>postMessage</code>对象的浏览器兼容性，这方面到是很幸运，除了IE8以下的IE浏览器，所有的浏览器都支持postMessage方法！</p>
<hr>
<p>至此，我们终于完全讲完了“跨域共享资源”这一主题。花了不少力气是吧？希望这是值得的。</p>
<hr>
<p><br><br><br><br><br><br>?  Hey！到这里《再也不学AJAX了！》这个专题系列就完全结束了，还记得我们的初心吗？我希望你能通过阅读这个系列的文章，以较为轻松的方式，系统完整地掌握AJAX技术，从此再也不用刻意学习零散的AJAX知识。希望我达成了我的目标，也希望你在阅读学习的过程中感到愉快。</p>
<p>关于AJAX技术这个专题，其实我还想讲述的两个话题是：<strong>更优雅的资源获取方式：fetch API</strong> 以及 <strong>深入jQuery：AJAX的实现</strong>，但是鉴于我个人时间精力有限（完成一个系列文章真的比我想的要付出更多时间！），就决定暂时先放下，等将来有机会再以这个系列的番外篇的形式补充上去，希望你们可以理解和接受：）。</p>
<p>这是我第一次在技术平台中以“系列”的方式发表技术文章，我个人觉得这样的方式更容易令人在整体上把握和理解一个技术，从而做到更灵活熟练的使用。希望你们也认同这一点并在阅读过程中感到愉快。之后，我也会继续在专栏中发表关于Web开发技术的系列文章，希望得到你们的认可和支持。</p>
<p>最后，再谈谈我在技术平台发表文章的初心：之所以开始在各平台（目前为稀土掘金和segmentfault）发表技术文章，主要是为了帮助我消化知识，锻炼写作的文笔，验证我对某个技术的理解是否正确，以及积攒人气满足虚荣心。在这个过程中，也希望读者能够通过阅读我的文章，加深对某一技术的理解。我认为这是一件双赢的事情，因此我十分欢迎，甚至是期待你在阅读我任何文章的过程中都能够：</p>
<ol>
<li>如果觉得有所收获，毫不犹豫的<strong>点击赞赏按钮</strong>（我真的真的会很开心?）；</li>
<li>如果想到了其他相关知识，或发现我对某个技术的理解不正确，毫不犹豫的<strong>在评论区留言与我交流</strong>；</li>
<li>如果对于我讲述中的某个概念还是不懂，毫不犹豫的<strong>在留言区告知我你的困惑</strong>，我会思考怎么样把这个概念讲述的更加清楚明白；</li>
<li>如果觉得我的文章不错，毫不犹豫的<strong>将我的文章推荐给他人</strong>，邀请他们成为我的读者；</li>
<li>如果你觉得阅读我的文章所花费的时间很值得，对你有很大帮助并且也认可我的劳动成果，你大可以<strong>点击下方红色的“赞赏支持”按钮为这篇文章付费</strong>，同时表达你对我创作的认可与支持。写作能够对人有益又能获得报酬，这着实令人倍感欣慰。</li>
</ol>
<p>我的创作和成长需要你们的帮助和支持，作为报答，我会持续发布优质的文章，陪同你们一起成长。关注我，一起加油吧！ ?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再也不学AJAX了！（三）跨域获取资源 ③ - WebSocket & postMessage

## 原文链接
[https://segmentfault.com/a/1190000012370451](https://segmentfault.com/a/1190000012370451)


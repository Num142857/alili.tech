---
title: '前端经典面试题: 从输入URL到页面加载发生了什么？' 
date: 2019-02-04 2:30:58
hidden: true
slug: 9gihavqse1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从输入URL到页面加载发生了什么</h1>
<p>最近在进行前端面试方面的一些准备，看了网上许多相关的文章，发现有一个问题始终绕不开: 在浏览器中输入URL到整个页面显示在用户面前时这个过程中到底发生了什么。仔细思考这个问题，发现确实很深，这个过程涉及到的东西很多。这个问题的回答真的能够很好的考验一个web工程师的水平，于是我自问自答一番。</p>
<p>总体来说分为以下几个过程:</p>
<ol>
<li><p>DNS解析</p></li>
<li><p>TCP连接</p></li>
<li><p>发送HTTP请求</p></li>
<li><p>服务器处理请求并返回HTTP报文</p></li>
<li><p>浏览器解析渲染页面</p></li>
<li><p>连接结束</p></li>
</ol>
<h2 id="articleHeader1">具体过程</h2>
<h3 id="articleHeader2">DNS解析</h3>
<p>DNS解析的过程就是寻找哪台机器上有你需要资源的过程。当你在浏览器中输入一个地址时，例如www.baidu.com，其实不是百度网站真正意义上的地址。互联网上每一台计算机的唯一标识是它的IP地址，但是IP地址并不方便记忆。用户更喜欢用方便记忆的网址去寻找互联网上的其它计算机，也就是上面提到的百度的网址。所以互联网设计者需要在用户的方便性与可用性方面做一个权衡，这个权衡就是一个网址到IP地址的转换，这个过程就是DNS解析。它实际上充当了一个翻译的角色，实现了网址到IP地址的转换。网址到IP地址转换的过程是如何进行的?</p>
<h4>解析过程</h4>
<p>DNS解析是一个递归查询的过程。</p>
<p><span class="img-wrap"><img data-src="/img/bVDM45?w=1928&amp;h=1248" src="https://static.alili.tech/img/bVDM45?w=1928&amp;h=1248" alt="DNS解析过程" title="DNS解析过程" style="cursor: pointer;"></span></p>
<p>上述图片是查找www.google.com的IP地址过程。首先在本地域名服务器中查询IP地址，如果没有找到的情况下，本地域名服务器会向根域名服务器发送一个请求，如果根域名服务器也不存在该域名时，本地域名会向com顶级域名服务器发送一个请求，依次类推下去。直到最后本地域名服务器得到google的IP地址并把它缓存到本地，供下次查询使用。从上述过程中，可以看出网址的解析是一个从右向左的过程: com -&gt; google.com -&gt; www.google.com。但是你是否发现少了点什么，根域名服务器的解析过程呢？事实上，真正的网址是www.google.com.，并不是我多打了一个.，这个.对应的就是根域名服务器，默认情况下所有的网址的最后一位都是.，既然是默认情况下，为了方便用户，通常都会省略，浏览器在请求DNS的时候会自动加上，所有网址真正的解析过程为: . -&gt; .com -&gt; google.com. -&gt; www.google.com.。</p>
<h4>DNS优化</h4>
<p>了解了DNS的过程，可以为我们带来哪些？上文中请求到google的IP地址时，经历了8个步骤，这个过程中存在多个请求(同时存在UDP和TCP请求，为什么有两种请求方式，请自行查找)。如果每次都经过这么多步骤，是否太耗时间？如何减少该过程的步骤呢？那就是DNS缓存。</p>
<h5>DNS缓存</h5>
<p>DNS存在着多级缓存，从离浏览器的距离排序的话，有以下几种: 浏览器缓存，系统缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存。</p>
<ul>
<li><p>在你的chrome浏览器中输入:chrome://dns/，你可以看到chrome浏览器的DNS缓存。</p></li>
<li><p>系统缓存主要存在/etc/hosts(Linux系统)中:</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVDM5c?w=956&amp;h=366" src="https://static.alili.tech/img/bVDM5c?w=956&amp;h=366" alt="DNS系统缓存" title="DNS系统缓存" style="cursor: pointer;"></span></p>
<ul><li><p>...</p></li></ul>
<h5>DNS负载均衡</h5>
<p>不知道大家有没有思考过一个问题: DNS返回的IP地址是否每次都一样？如果每次都一样是否说明你请求的资源都位于同一台机器上面，那么这台机器需要多高的性能和储存才能满足亿万请求呢？其实真实的互联网世界背后存在成千上百台服务器，大型的网站甚至更多。但是在用户的眼中，它需要的只是处理他的请求，哪台机器处理请求并不重要。DNS可以返回一个合适的机器的IP给用户，例如可以根据每台机器的负载量，该机器离用户地理位置的距离等等，这种过程就是DNS负载均衡，又叫做DNS重定向。大家耳熟能详的CDN(Content Delivery Network)就是利用DNS的重定向技术，DNS服务器会返回一个跟用户最接近的点的IP地址给用户，CDN节点的服务器负责响应用户的请求，提供所需的内容。在这里打个免费的广告，我平时使用的比较多的是七牛云的CDN(免费)储存图片，作为我个人博客的图床使用。</p>
<h3 id="articleHeader3">TCP连接</h3>
<p>HTTP协议是使用TCP作为其传输层协议的，当TCP出现瓶颈时，HTTP也会受到影响。但由于TCP优化这一块我平常接触的并不是很多，再加上大学时的计算机网络的基础基本上忘完，所以这一部分我也就不在这里分析了。</p>
<h4>HTTPS协议</h4>
<p>我不知道把HTTPS放在这个部分是否合适，但是放在这里好像又说的过去。HTTP报文是包裹在TCP报文中发送的，服务器端收到TCP报文时会解包提取出HTTP报文。但是这个过程中存在一定的风险，HTTP报文是明文，如果中间被截取的话会存在一些信息泄露的风险。那么在进入TCP报文之前对HTTP做一次加密就可以解决这个问题了。HTTPS协议的本质就是HTTP + SSL(or TLS)。在HTTP报文进入TCP报文之前，先使用SSL对HTTP报文进行加密。从网络的层级结构看它位于HTTP协议与TCP协议之间。</p>
<p><span class="img-wrap"><img data-src="/img/bVp65j" src="https://static.alili.tech/img/bVp65j" alt="HTTPS" title="HTTPS" style="cursor: pointer; display: inline;"></span></p>
<h4>HTTPS过程</h4>
<p>HTTPS在传输数据之前需要客户端与服务器进行一个握手(TLS/SSL握手)，在握手过程中将确立双方加密传输数据的密码信息。TLS/SSL使用了非对称加密，对称加密以及hash等。具体过程请参考经典的阮一峰先生的博客<a href="http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html" rel="nofollow noreferrer" target="_blank">TLS/SSL握手过程</a>。<br>HTTPS相比于HTTP，虽然提供了安全保证，但是势必会带来一些时间上的损耗，如握手和加密等过程，是否使用HTTPS需要根据具体情况在安全和性能方面做出权衡。</p>
<h3 id="articleHeader4">HTTP请求</h3>
<p>其实这部分又可以称为前端工程师眼中的HTTP，它主要发生在客户端。发送HTTP请求的过程就是构建HTTP请求报文并通过TCP协议中发送到服务器指定端口(HTTP协议80/8080, HTTPS协议443)。HTTP请求报文是由三部分组成: <strong>请求行</strong>, <strong>请求报头</strong>和<strong>请求正文</strong>。</p>
<h4>请求行</h4>
<p>格式如下:<br><code>Method Request-URL HTTP-Version CRLF</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eg: GET index.html HTTP/1.1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>eg: GET index<span class="hljs-selector-class">.html</span> HTTP/<span class="hljs-number">1.1</span>
</code></pre>
<p>常用的方法有: GET, POST, PUT, DELETE, OPTIONS, HEAD。</p>
<p>TODO：</p>
<ul><li><p>GET和POST有什么区别？</p></li></ul>
<h4>请求报头</h4>
<p>请求报头允许客户端向服务器传递请求的附加信息和客户端自身的信息。<br>PS: 客户端不一定特指浏览器，有时候也可使用Linux下的CURL命令以及HTTP客户端测试工具等。<br>常见的请求报头有: Accept, Accept-Charset, Accept-Encoding, Accept-Language, Content-Type, Authorization, Cookie, User-Agent等。</p>
<p><span class="img-wrap"><img data-src="/img/bVC1BZ?w=1919&amp;h=822" src="https://static.alili.tech/img/bVC1BZ?w=1919&amp;h=822" alt="HTTP分析" title="HTTP分析" style="cursor: pointer;"></span></p>
<p>上图是使用Chrome开发者工具截取的对百度的HTTP请求以及响应报文，从图中可以看出，请求报头中使用了Accept, Accept-Encoding, Accept-Language, Cache-Control, Connection, Cookie等字段。Accept用于指定客户端用于接受哪些类型的信息，Accept-Encoding与Accept类似，它用于指定接受的编码方式。Connection设置为Keep-alive用于告诉客户端本次HTTP请求结束之后并不需要关闭TCP连接，这样可以使下次HTTP请求使用相同的TCP通道，节省TCP连接建立的时间。</p>
<h4>请求正文</h4>
<p>当使用POST, PUT等方法时，通常需要客户端向服务器传递数据。这些数据就储存在请求正文中。在请求包头中有一些与请求正文相关的信息，例如: 现在的Web应用通常采用Rest架构，请求的数据格式一般为json。这时就需要设置Content-Type: application/json。</p>
<h3 id="articleHeader5">服务器处理请求并返回HTTP报文</h3>
<p>自然而然这部分对应的就是后端工程师眼中的HTTP。后端从在固定的端口接收到TCP报文开始，这一部分对应于编程语言中的socket。它会对TCP连接进行处理，对HTTP协议进行解析，并按照报文格式进一步封装成HTTP Request对象，供上层使用。这一部分工作一般是由Web服务器去进行，我使用过的Web服务器有Tomcat, Jetty和Netty等等。</p>
<p>HTTP响应报文也是由三部分组成: <strong>状态码</strong>, <strong>响应报头</strong>和<strong>响应报文</strong>。</p>
<h4>状态码</h4>
<p>状态码是由3位数组成，第一个数字定义了响应的类别，且有五种可能取值:</p>
<ul>
<li><p>1xx：指示信息–表示请求已接收，继续处理。</p></li>
<li><p>2xx：成功–表示请求已被成功接收、理解、接受。</p></li>
<li><p>3xx：重定向–要完成请求必须进行更进一步的操作。</p></li>
<li><p>4xx：客户端错误–请求有语法错误或请求无法实现。</p></li>
<li><p>5xx：服务器端错误–服务器未能实现合法的请求。<br>平时遇到比较常见的状态码有:200, 204, 301, 302, 304, 400, 401, 403, 404, 422, 500(分别表示什么请自行查找)。</p></li>
</ul>
<p>TODO:</p>
<ul>
<li><p>301和302有什么区别？</p></li>
<li><p>HTTP缓存</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVDNI1?w=2404&amp;h=1342" src="https://static.alili.tech/img/bVDNI1?w=2404&amp;h=1342" alt="状态码" title="状态码" style="cursor: pointer; display: inline;"></span></p>
<p>该图是本公司对状态码的一个总结，绘制而成的status code map，请大家参考。</p>
<h4>响应报头</h4>
<p>常见的响应报头字段有: Server, Connection...。</p>
<h4>响应报文</h4>
<p>服务器返回给浏览器的文本信息，通常HTML, CSS, JS, 图片等文件就放在这一部分。</p>
<h3 id="articleHeader6">浏览器解析渲染页面</h3>
<p>浏览器在收到HTML,CSS,JS文件后，它是如何把页面呈现到屏幕上的？下图对应的就是WebKit渲染的过程。</p>
<p><span class="img-wrap"><img data-src="/img/bVCZ1H?w=694&amp;h=340" src="https://static.alili.tech/img/bVCZ1H?w=694&amp;h=340" alt="WebKit渲染过程" title="WebKit渲染过程" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器是一个边解析边渲染的过程。首先浏览器解析HTML文件构建DOM树，然后解析CSS文件构建渲染树，等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上。这个过程比较复杂，涉及到两个概念: reflow(回流)和repain(重绘)。DOM节点中的各个元素都是以盒模型的形式存在，这些都需要浏览器去计算其位置和大小等，这个过程称为relow;当盒模型的位置,大小以及其他属性，如颜色,字体,等确定下来之后，浏览器便开始绘制内容，这个过程称为repain。页面在首次加载时必然会经历reflow和repain。reflow和repain过程是非常消耗性能的，尤其是在移动设备上，它会破坏用户体验，有时会造成页面卡顿。所以我们应该尽可能少的减少reflow和repain。</p>
<p><span class="img-wrap"><img data-src="/img/bVC1uE?w=734&amp;h=689" src="https://static.alili.tech/img/bVC1uE?w=734&amp;h=689" alt="Event loop" title="Event loop" style="cursor: pointer;"></span></p>
<p>JS的解析是由浏览器中的JS解析引擎完成的。JS是单线程运行，也就是说，在同一个时间内只能做一件事，所有的任务都需要排队，前一个任务结束，后一个任务才能开始。但是又存在某些任务比较耗时，如IO读写等，所以需要一种机制可以先执行排在后面的任务，这就是：同步任务(synchronous)和异步任务(asynchronous)。JS的执行机制就可以看做是一个主线程加上一个任务队列(task queue)。同步任务就是放在主线程上执行的任务，异步任务是放在任务队列中的任务。所有的同步任务在主线程上执行，形成一个执行栈;异步任务有了运行结果就会在任务队列中放置一个事件；脚本运行时先依次运行执行栈，然后会从任务队列里提取事件，运行任务队列中的任务，这个过程是不断重复的，所以又叫做事件循环(Event loop)。</p>
<p>浏览器在解析过程中，如果遇到请求外部资源时，如图像,iconfont,JS等。浏览器将重复1-6过程下载该资源。请求过程是异步的，并不会影响HTML文档进行加载，但是当文档加载过程中遇到JS文件，HTML文档会挂起渲染过程，不仅要等到文档中JS文件加载完毕还要等待解析执行完毕，才会继续HTML的渲染过程。原因是因为JS有可能修改DOM结构，这就意味着JS执行完成前，后续所有资源的下载是没有必要的，这就是JS阻塞后续资源下载的根本原因。CSS文件的加载不影响JS文件的加载，但是却影响JS文件的执行。JS代码执行前浏览器必须保证CSS文件已经下载并加载完毕。</p>
<h2 id="articleHeader7">Web优化</h2>
<p>上面部分主要介绍了一次完整的请求对应的过程，了解该过程的目的无非就是为了Web优化。在谈到Web优化之前，我们回到一个更原始的问题，Web前端的本质是什么。我的理解是: 将信息快速并友好的展示给用户并能够与用户进行交互。快速的意思就是在尽可能短的时间内完成页面的加载，试想一下当你在淘宝购买东西的时候，淘宝页面加载了10几秒才显示出物品，这个时候你还有心情去购买吗？怎么快速的完成页面的加载呢？优雅的学院派雅虎给出了常用的一些手段，也就是我们熟悉的<a href="https://developer.yahoo.com/performance/" rel="nofollow noreferrer" target="_blank">雅虎34条军规</a>。这34军规实际上就是围绕请求过程进行的一些优化方式。</p>
<p>如何尽快的加载资源？答案就是能不从网络中加载的资源就不从网络中加载，当我们合理使用缓存，将资源放在浏览器端，这是最快的方式。如果资源必须从网络中加载，则要考虑缩短连接时间，即DNS优化部分;减少响应内容大小，即对内容进行压缩。另一方面，如果加载的资源数比较少的话，也可以快速的响应用户。当资源到达浏览器之后，浏览器开始进行解析渲染，浏览器中最耗时的部分就是reflow，所以围绕这一部分就是考虑如何减少reflow的次数。</p>
<h2 id="articleHeader8">总结</h2>
<p>写这篇文章真的非常纠结，前前后后断断续续写了两个星期，因为涉及到的东西比较多，再加上有些东西记忆的没有那么清晰了，所以不好下笔。所涉及到的大部分内容，也基本上是一笔带过，只是给读者一个浅显的认知，当遇到相关的问题时，知道如何去查询。大家可以当成一篇Web开发的科普类文章去阅读。</p>
<p>另外在这里为公司的产品打个广告，在Chrome store中搜索<a href="https://chrome.google.com/webstore/detail/dhc-rest-client/aejoelaoggembcahagimdiliamlcdmfm?utm_source=chrome-ntp-icon" rel="nofollow noreferrer" target="_blank">DHC</a>，这是一款超级好用的Web客户端工具，囊括了很多的功能: 报文分析，API测试等等，可谓说是WEB工程师必备工具。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端经典面试题: 从输入URL到页面加载发生了什么？

## 原文链接
[https://segmentfault.com/a/1190000006879700](https://segmentfault.com/a/1190000006879700)


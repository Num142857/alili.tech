---
title: '从输入url到页面展现发生了什么？' 
date: 2018-12-12 2:30:10
hidden: true
slug: kc7jkj85y3a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>从用户的角度出发，得益于各大浏览器厂商的不懈努力，这一切都显得已经很理所当然，输入一个地址，访问网络，显示一个绚丽多彩的界面，你可以可以在上面浏览视频，看文章，甚至玩游戏。<br>但是站在开发者的角度，这是一个纵观全局的大问题，每一个步骤都是一个可以延伸的话题。对于项目的优化都离不开这里的方方面面，是有深入理解的价值的。我们可以从一个总览出发，看看背后发生了什么。</blockquote>
<h4>大致是如下步骤</h4>
<ol>
<li>根据地址栏输入的地址向<a href="https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F" rel="nofollow noreferrer" target="_blank">DNS（Domain Name System）</a>查询IP</li>
<li>通过IP向服务器发起TCP连接</li>
<li>向服务器发起请求</li>
<li>服务器返回请求内容</li>
<li>浏览器开始解析渲染页面并显示</li>
<li>关闭连接</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV4T2o?w=2140&amp;h=842" src="https://static.alili.tech/img/bV4T2o?w=2140&amp;h=842" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>一.DNS</h4>
<p>首先我们要知道什么是DNS</p>
<blockquote>域名系统（英文：Domain Name System，缩写：DNS）是互联网的一项服务。它作为将域名和IP地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。DNS使用TCP和UDP端口53。当前，对于每一级域名长度的限制是63个字符，域名总长度则不能超过253个字符。   --维基百科</blockquote>
<p>域名解析的过程是逐级查询的</p>
<ol>
<li>
<strong>浏览器缓存</strong>: 首先会向浏览器的缓存中读取上一次访问的记录，在chrome可以通过地址栏中输入<a>chrome://net-internals/#dns</a>查看缓存的当前状态</li>
<li>
<strong>操作系统缓存</strong>：查找存储在系统运行内存中的缓存。在mac中可以通过下面的命令清除系统中的DNS缓存。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dscacheutil -flushcache" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">dscacheutil -flushcache</span></code></pre>
<ol>
<li>
<strong>在host文件中查找</strong>：如果在缓存中都查找不到的情况下，就会读取系统中预设的host文件中的设置。</li>
<li>
<strong>路由器缓存</strong>：有些路由器也有DNS缓存的功能，访问过的域名会存在路由器上。</li>
<li>
<strong>ISP DNS缓存</strong>：互联网服务提供商（如中国电信）也会提供DNS服务，比如比较著名的 114.114.114.114，在本地查找不到的情况下，就会向ISP进行查询，ISP会在当前服务器的缓存内查找是否有记录，如果有，则返回这个IP，若没有，则会开始向根域名服务器请求查询。</li>
<li>
<strong>顶级DNS服务器/根DNS服务器</strong>：根域名收到请求后，会判别这个域名(.com)是授权给哪台服务器管理,并返回这个顶级DNS服务器的IP。请求者收到这台顶级DNS的服务器IP后，会向该服务器发起查询，如果该服务器无法解析，该服务器就会返回下一级的DNS服务器IP（nicefilm.com），本机继续查找，直到服务器找到(www.nicefilm.com)的主机。</li>
</ol>
<p>我们可以通过dig命令查看域名解析的记录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dig math.stackexchange.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">dig math<span class="hljs-selector-class">.stackexchange</span><span class="hljs-selector-class">.com</span></code></pre>
<p>我们重点看返回的应答，会看到有四条记录，返回了该网址的四个IP</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";; ANSWER SECTION:
math.stackexchange.com.    31    IN    A    151.101.1.69
math.stackexchange.com.    31    IN    A    151.101.129.69
math.stackexchange.com.    31    IN    A    151.101.193.69
math.stackexchange.com.    31    IN    A    151.101.65.69" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>;; <span class="hljs-selector-tag">ANSWER</span> <span class="hljs-selector-tag">SECTION</span>:
<span class="hljs-selector-tag">math</span><span class="hljs-selector-class">.stackexchange</span><span class="hljs-selector-class">.com</span>.    31    <span class="hljs-selector-tag">IN</span>    <span class="hljs-selector-tag">A</span>    151<span class="hljs-selector-class">.101</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.69</span>
<span class="hljs-selector-tag">math</span><span class="hljs-selector-class">.stackexchange</span><span class="hljs-selector-class">.com</span>.    31    <span class="hljs-selector-tag">IN</span>    <span class="hljs-selector-tag">A</span>    151<span class="hljs-selector-class">.101</span><span class="hljs-selector-class">.129</span><span class="hljs-selector-class">.69</span>
<span class="hljs-selector-tag">math</span><span class="hljs-selector-class">.stackexchange</span><span class="hljs-selector-class">.com</span>.    31    <span class="hljs-selector-tag">IN</span>    <span class="hljs-selector-tag">A</span>    151<span class="hljs-selector-class">.101</span><span class="hljs-selector-class">.193</span><span class="hljs-selector-class">.69</span>
<span class="hljs-selector-tag">math</span><span class="hljs-selector-class">.stackexchange</span><span class="hljs-selector-class">.com</span>.    31    <span class="hljs-selector-tag">IN</span>    <span class="hljs-selector-tag">A</span>    151<span class="hljs-selector-class">.101</span><span class="hljs-selector-class">.65</span><span class="hljs-selector-class">.69</span></code></pre>
<p>31是TTL的值，表示该域名的缓存时间，即该时间内不用重新查询。A是该DNS查询的记录类型，表示返回一个IPv4格式的地址。还有其他记录类型诸如 NS（返回查询的服务器地址）、AAAA（返回IPV6格式的地址）、CNAME（域名的别名）等。</p>
<hr>
<h4>二.TCP 连接</h4>
<p>拿到了要请求的资源服务器IP后，浏览器通过操作OS的socket与服务器进行TCP连接（一般来说操作系统已经封装好了TCP/IP等协议，提供套接字给应用去使用，该部分涉及到标准网络模型的知识，另外再开篇拓展。）</p>
<p>这个连接就是我们所熟知的<strong>三次握手</strong><br>本机主动打开连接</p>
<ul>
<li>第一次，本机将标识位 SYN 置为 1, seq = x(Sequence number)发送给服务端。此时本机状态为<strong>SYN-SENT</strong>
</li>
<li>第二次，服务器收到包之后，将状态切换为<strong>SYN-RECEIVED</strong>，并将标识位 SYN 和 ACK都置为1, seq = y, ack = x + 1, 并发送给客户端。</li>
<li>第三次，客户端收到包后，将状态切换为<strong>ESTABLISHED</strong>，并将标识位ACK置为1，seq = x + 1, ack = y + 1, 并发送给服务端。服务端收到包之后，也将状态切换为<strong>ESTABLISHED</strong>。</li>
</ul>
<p><strong>需要注意的一点是，有一些文章对ACK标识位 和 ack（Acknowledgement Number）的解释比较模糊，有一些画图的时候干脆就写在一起了。虽然这两者有关联，但不是同一个东西，搞清楚这个误区可以更方便去理解。还有一些会把第二次握手描述成两个包（比如某百科……），实际上这也是不正确的</strong></p>
<ul>
<li>标识位ACK置为1 表示我已确认收到seq为x的包，并回复确认序号ack = x + 1</li>
<li>而SYN表示这是我第一次随机生成seq的序列x，此后我每次发送的包都会在上一次发送的基础上增加y（有数据的时候，y是数据的长度，没有的时候y = 1）。<strong>所以，当seq已初始化完成之后，没必要再把SYN置为1</strong>
</li>
</ul>
<p>理解了这两点，也就不难理解为什么三次握手分别是SYN、ACK/SYN、ACK了。</p>
<h5>标识位（TCP FLAG）</h5>
<p>TCP的头部固定有20个字节，其中分配了6bits给TCP FLAG，组合起来用来表示当前包的类型。分别是<br>URGACKPSHRSTSYNFIN（CWRECE放在保留位，暂不考虑）</p>
<ul>
<li>
<strong>URG</strong>：紧急指针，用于将要发送的包标识为“紧急”，这意味着不必等待前段数据被响应处理完即可发送给接收端。</li>
<li>
<strong>ACK</strong>：确认标识，用于表示对数据包的成功接收。</li>
<li>
<strong>PSH</strong>：推送标识，表示这个数据包应该被立即发送，不需要等待额外的数据。</li>
<li>
<strong>RST</strong>：reset标识，用来异常关闭连接。</li>
<li>
<strong>SYN</strong>：同步标识，表示TCP连接已初始化。</li>
<li>
<strong>FIN</strong>：完成标识，用于拆除上一个SYN标识。一个完整的TCP连接过程一定会有SYN 和 FIN包。</li>
</ul>
<p>至此我们了解了一个TCP 连接的过程，通道通了，是时候利用这个通道送东西了。<br>我们从传输层再回到应用层。</p>
<hr>
<h4>三.HTTP请求与响应</h4>
<blockquote>
<a href="https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE" rel="nofollow noreferrer" target="_blank">超文本传输协议</a>（英文：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议[1]。HTTP是万维网的数据通信的基础。设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。通过HTTP或者HTTPS协议请求的资源由统一资源标识符（Uniform Resource Identifiers，URI）来标识。  --wiki</blockquote>
<p>我们用 <a href="https://www.segmentfault.com">https://www.segmentfault.com</a> 举例子。<br>在应用层，浏览器会分析这个url，并设置好请求报文发出。请求报文中包括请求行、请求头、空行、请求主体。https默认请求端口443， http默认80。</p>
<ul>
<li>
<strong>请求行</strong>：请求行中包括请求的方法，路径和协议版本。</li>
<li>
<strong>请求头</strong>：请求头中包含了请求的一些附加的信息，一般是以键值的形式成对存在，比如设置请求文件的类型accept-type，以及服务器对缓存的设置。</li>
<li>
<strong>空行</strong>：协议中规定请求头和请求主体间必须用一个空行隔开</li>
<li>
<strong>请求主体</strong>：对于post请求，所需要的参数都不会放在url中，这时候就需要一个载体了，这个载体就是请求主题。</li>
</ul>
<p>服务端收到请求之后，会根据url匹配到的路径做相应的处理，最后返回浏览器需要的页面资源。浏览器会收到一个响应报文，而所需要的资源就就在报文主体上。与请求报文相同，响应报文也有与之对应的起始行、首部、空行、报文主体，不同的地方在于包含的东西不一样。</p>
<ul>
<li>
<strong>响应行</strong>：响应报文的起始行同样包含了协议版本，与请求的起始行不同的是其包含的还有状态码和状态码的原因短语。</li>
<li>
<strong>响应头</strong>：对应请求报文中的请求头，格式一致，但是各自有不同的首部。也有一起用的通用首部。</li>
<li><strong>空行</strong></li>
<li>
<strong>报文主体</strong>：请求所需要的资源。</li>
</ul>
<h5>http缓存</h5>
<p>请求是浏览器的一个优化点，我们可以通过缓存来减少不必要的请求，进而加快页面的呈现。通过简单地设置http头部可以使用缓存的功能。一般来说有三种设置的方式</p>
<h5>Last-Modify(响应头) + If-Modified-Since（请求头）</h5>
<p>服务器在返回资源的时候设置Last-Modify当前资源最后一次修改的时间，浏览器会把这个时间保存下来，在下次请求的时候，请求头部If-Modified-Since 会包含这个时间，服务端收到请求后，会比对资源最后更新的时间是否在If-Modified-Since设置的时间之后，<strong>如果不是，返回304状态码，浏览器将从缓存中获取资源。反之返回200和资源内容</strong>。</p>
<h5>ETag（响应头） + If-None-Match（请求头）</h5>
<p>根据资源标识符来确定文件是否存在修改，服务器每一次返回资源，都会在Etag中存放资源的标识符，浏览器收到这个标识符，在下一次请求的时候将标识符放在If-None-Match中，服务端将判断是否匹配，<strong>如果不匹配，返回200以及新的资源，反之返回304，浏览器从缓存中获取资源</strong></p>
<h5>Cache-Control/Expires(响应头)</h5>
<p>首先这不是一种方法，而是协议更替中的一种演化。<br>在http 1.0的时代，我们基于Pragma 和 Expires 控制缓存的生命周期。我们可以通过设置Pragma为no-cache关闭缓存功能，同样也可以在Expires中设置一个缓存失效的时间。需要注意的是，这个失效的时间是相对于服务器的实践而言的，如果人为地改变了客户端的时间，是会导致缓存失效的。</p>
<p>所以，为了解决这个问题，HTTP1.1的协议加入了Cache-Control，通过设置Cache-Control的max-age可以控制缓存的周期。在这个周期内，资源是新鲜的，浏览器再一次需要使用资源的时候，就不会发出请求了。</p>
<hr>
<h4>四.页面呈现</h4>
<p>至此浏览器已经拿到了一个HTML文档，并为了呈现文档而开始解析。呈现引擎开始工作，基本流程如下（以webkit为例）</p>
<ul>
<li>通过HTML解析器解析HTML文档，构建一个DOM Tree，同时通过CSS解析器解析HTML中存在的CSS，构建Style Rules，两者结合形成一个Attachment。</li>
<li>通过Attachment构造出一个呈现树（Render Tree）</li>
<li>Render Tree构建完毕，进入到布局阶段（layout/reflow），将会为每个阶段分配一个应出现在屏幕上的确切坐标。</li>
<li>最后将全部的节点遍历绘制出来后，一个页面就展现出来了。</li>
</ul>
<p>从构建DOM树到呈现的过程如下</p>
<div id="flowDiagram0" class="flowChart"><svg height="321" version="1.1" width="282.640625" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.0625px;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><marker id="raphael-marker-endblock33" markerheight="3" markerwidth="3" orient="auto" refx="1.5" refy="1.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><use xlink:href="#raphael-marker-block" transform="rotate(180 1.5 1.5) scale(0.6,0.6)" stroke-width="1.6667" fill="black" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/></marker></defs><rect x="0" y="0" width="273.640625" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op" transform="matrix(1,0,0,1,6,6)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="opt" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,6,6)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Parsing HTML to construct the DOM tree</tspan></text><rect x="0" y="0" width="177.4375" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op1" transform="matrix(1,0,0,1,54.1016,98)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="op1t" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,54.1016,98)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Render Tree construction</tspan></text><rect x="0" y="0" width="182.90625" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op2" transform="matrix(1,0,0,1,51.3672,190)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="op2t" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,51.3672,190)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Layout of the Render Tree</tspan></text><rect x="0" y="0" width="175.90625" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op3" transform="matrix(1,0,0,1,54.8672,282)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="op3t" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,54.8672,282)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Painting the Render Tree</tspan></text><path fill="none" stroke="#000000" d="M142.8203125,42C142.8203125,42,142.8203125,80.20077085494995,142.8203125,93.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M142.8203125,134C142.8203125,134,142.8203125,172.20077085494995,142.8203125,185.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M142.8203125,226C142.8203125,226,142.8203125,264.20077085494995,142.8203125,277.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/></svg></div>
<p>需要注意的是，这是一个渐进的过程，呈现引擎为了力求显示的及时，会在文档请求不完全的情况下就开始渲染页面，同时，如果在解析的过程中遇到script的时候，文档的解析将会停止下来，立即解析执行脚本，如果脚本是外部的，则会等待请求完成并解析执行。所以，为了不阻塞页面地呈现，一般会把script脚本放在文档的最后。</p>
<p>在最新的HTML4和HTML5规范中，也可以将脚本标注为defer，这样就不会停止文档解析，而是等到解析结束后才执行。HTML5 增加了一个选项，可将脚本标记为async，以便由其他线程解析和执行。</p>
<hr>
<h4>五. 连接关闭</h4>
<p>现在的页面为了优化请求的耗时，默认都会开启持久连接（keep-alive），那么一个TCP连接确切关闭的时机，是这个tab标签页关闭的时候。这个关闭的过程就是著名的四次挥手。关闭是一个全双工的过程，发包的顺序的不一定的。一般来说是客户端主动发起的关闭，过程如下。</p>
<p>假如最后一次客户端发出的数据seq = x, ack = y;</p>
<ol>
<li>客户端发送一个FIN置为1的包，ack = y， seq = x + 1，此时客户端的状态为 <strong>FIN_WAIT_1</strong>
</li>
<li>服务端收到包后，状态切换为<strong>CLOSE_WAIT</strong>发送一个ACK为1的包， ack = x + 2。客户端收到包之后状态切换为<strong>FNI_WAIT_2</strong>
</li>
<li>服务端处理完任务后，向客户端发送一个 FIN包，seq = y; 同时将自己的状态置为<strong>LAST_ACK</strong>
</li>
<li>客户端收到包后状态切换为<strong>TIME_WAIT</strong>，并向服务端发送ACK包，ack = y + 1，等待2MSL后关闭连接。</li>
</ol>
<h5>为什么客户端等待2MSL？</h5>
<p>MSL: 全程Maximum Segment Lifetime，中文可以翻译为报文最大生存时间。<br>等待是为了保证连接的可靠性，确保服务端收到ACK包，如果服务端没有收到这个ACK包，将会重发FIN包给客户端，而这个时间刚好是服务端等待超时重发的时间 + FIN的传输时间。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从输入url到页面展现发生了什么？

## 原文链接
[https://segmentfault.com/a/1190000013522717](https://segmentfault.com/a/1190000013522717)


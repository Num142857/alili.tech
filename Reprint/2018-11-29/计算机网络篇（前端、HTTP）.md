---
title: '计算机网络篇（前端、HTTP）' 
date: 2018-11-29 9:34:56
hidden: true
slug: dn2k38kfbrn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">全端工程师需知道的计算机网络知识</h2>
<h3 id="articleHeader1">一、网络篇—http报文详解</h3>
<h3 id="articleHeader2">1. 分类</h3>
<ol>
<li>请求报文</li>
<li>响应报文</li>
</ol>
<h3 id="articleHeader3">2. 报文结构</h3>
<h4>（一）、请求报文</h4>
<blockquote>一个HTTP请求报文由<strong>请求行（request line）、请求头部（header）、空行和请求数据</strong>4个部分组成；</blockquote>
<ol><li><strong>请求行</strong></li></ol>
<ul>
<li>由请求方法字段、URL字段和HTTP协议字段3个字段组成，它们由空格分隔；</li>
<li>例如，GET /index.html HTTP/1.1。</li>
<li>HTTP协议的请求方法有GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT。</li>
</ul>
<ol><li><strong>请求头部</strong></li></ol>
<ul>
<li>请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。</li>
<li>请求头部通知服务器有关于客户端请求的信息；</li>
<li>
<p><strong>常用的请求头：</strong></p>
<ol>
<li>Accept 设置接受的内容类型<code>Accept: text/plain</code>;</li>
<li>Accept-Charset 设置接受的字符编码:<code>Accept-Charset: utf-8</code>;</li>
<li>Accept-Encoding 设置接受的编码格式:<code>Accept-Encoding: gzip, deflate</code>;</li>
<li>Accept-Language 设置接受的语言:<code>Accept-Language: en-US</code>;</li>
<li>Cache-Control 设置请求响应链上所有的缓存机制必须遵守的指令:<code>Cache-Control: no-cache</code>;</li>
<li>Connection 设置当前连接和hop-by-hop协议请求字段列表的控制选项:<code>Connection: keep-alive</code>;</li>
<li>Content-Length 设置请求体的字节长度:<code>Content-Length: 348</code>;</li>
<li>Content-Type 设置请求体的MIME类型（适用POST和PUT请求）:<code>Content-Type: application/x-www-form-urlencoded</code>;</li>
<li>Cookie 设置服务器使用Set-Cookie发送的http cookie:<code>Cookie: $Version=1; Skin=new;</code>;</li>
<li>Host 设置服务器域名和TCP端口号，如果使用的是服务请求标准端口号，端口号可以省略:<code>Host: en.wikipedia.org:8080</code>;</li>
<li>Origin 标识跨域资源请求（请求服务端设置Access-Control-Allow-Origin响应字段）:<code>Origin: http://www.example-social-network.com</code>;</li>
<li>Expires 设置响应体的过期时间:<code>Expires: Thu, 01 Dec 1994 16:00:00 GMT</code>;</li>
<li>ETag 特定版本资源的标识符，通常是消息摘要:<code>ETag: "737060cd8c284d8af7ad3082f209582d"</code>;</li>
<li>Last-Modified 设置请求对象最后一次的修改日期:<code>Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT</code>;</li>
</ol>
</li>
</ul>
<ol><li><strong>空行</strong></li></ol>
<ul><li>最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头。</li></ul>
<ol><li><strong>请求主体（数据）</strong></li></ol>
<ul><li>请求数据不在GET方法中使用，而是在POST方法中使用。POST方法适用于需要客户填写表单的场合。与请求数据相关的最常使用的请求头是Content-Type和Content-Length。</li></ul>
<h4>（二）、响应报文</h4>
<blockquote>HTTP响应也由四个部分组成，分别是：状态行、消息报头、空行、响应正文。</blockquote>
<ol>
<li>在响应中唯一真正的区别在于第一行中用状态信息代替了请求信息。状态行（status line）通过提供一个状态码来说明所请求的资源情况。</li>
<li><strong>状态行</strong></li>
</ol>
<ul>
<li>格式：服务器HTTP协议的版本 响应状态代码 状态代码的文本描述；</li>
<li>
<p>状态代码由三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：</p>
<ul>
<li>1xx：指示信息--表示请求已接收，继续处理。</li>
<li>2xx：成功--表示请求已被成功接收、理解、接受。</li>
<li>3xx：重定向--要完成请求必须进行更进一步的操作。</li>
<li>4xx：客户端错误--请求有语法错误或请求无法实现。</li>
<li>5xx：服务器端错误--服务器未能实现合法的请求。</li>
</ul>
</li>
<li>
<p>常见状态代码：</p>
<ul>
<li>200 OK ：表示请求成功 一切正常</li>
<li>301 Moved Permanently：重定向，客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL</li>
<li>302 Found：临时重定向，类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。</li>
<li>304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求。服务器告诉客户，原来缓冲的文档还可以继续使用。</li>
<li>400 Bad Request：请求出现语法错误。</li>
<li>403 Forbidden：资源不可用。</li>
<li>404 Not Found：无法找到指定位置的资源。</li>
<li>405 Method Not Allowed：请求方法（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用。</li>
<li>500 Internal Server Error：服务器遇到了意料不到的情况，不能完成客户的请求。</li>
<li>501 Not Implemented：服务器不支持实现请求所需要的功能</li>
</ul>
</li>
</ul>
<h4>（三）、关于请求post和get的区别</h4>
<ol>
<li>GET提交，请求的数据会附在URL之后（就是把数据放置在HTTP协议头＜request-line＞中）；</li>
<li>POST提交：把提交的数据放置在是HTTP包的包体＜request-body＞中；</li>
<li>传输数据的大小：</li>
</ol>
<ul>
<li>HTTP协议没有对传输的数据大小进行限制，HTTP协议规范也没有对URL长度进行限制。</li>
<li>
<p>而在实际开发中存在的限制主要有：</p>
<ul>
<li>GET:特定浏览器和服务器对URL长度有限制，例如IE对URL长度的限制是2083字节(2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系统的支持。因此对于GET提交时，传输数据就会受到URL长度的限制。</li>
<li>POST:由于不是通过URL传值，理论上数据不受限。但实际各个WEB服务器会规定对post提交数据大小进行限制，Apache、IIS6都有各自的配置。</li>
</ul>
</li>
</ul>
<p>4.安全性：</p>
<ul>
<li>POST的安全性要比GET的安全性高。</li>
<li>通过GET提交数据，用户名和密码将明文出现在URL上，因为</li>
<li>(1)登录页面有可能被浏览器缓存，</li>
<li>(2)其他人查看浏览器的历史纪录，那么别人就可以拿到你的账号和密码了</li>
</ul>
<h4>（四）、http和https</h4>
<p><strong>1. HTTP和HTTPS</strong></p>
<ul>
<li>HTTP协议通常承载于TCP协议之上，在HTTP和TCP之间添加一个安全协议层（SSL或TSL），这个时候，就成了我们常说的HTTPS</li>
<li>默认HTTP的端口号为80，HTTPS的端口号为443</li>
</ul>
<p><strong>2. 为什么HTTPS安全</strong></p>
<ul><li>因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用HTTPS，密钥在你和终点站才有。https之所以比http安全，是因为他利用ssl/tls协议传输。它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer传递等。保障了传输过程的安全性</li></ul>
<p><strong>3. 关于Http 2.0</strong></p>
<ul>
<li>HTTP/2引入了“服务端推（server push）”的概念，它允许服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能。</li>
<li>HTTP/2提供更多的加密支持</li>
<li>HTTP/2使用多路技术，允许多个消息在一个连接上同时交差。</li>
<li>它增加了头压缩（header compression），因此即使非常小的请求，其请求和响应的header都只会占用很小比例的带宽</li>
</ul>
<p><strong>4. http缺点：</strong></p>
<ul>
<li>通信使用明文不加密，内容可能被窃取；</li>
<li>不验证通信方身份，可能遭到伪装；</li>
<li>无法验证报文完整性，可能被篡改。</li>
</ul>
<blockquote>https是加上加密处理（一般是SSL安全通信线路）+认证+完整性保护</blockquote>
<p><strong>5. HTTP/2 与 HTTP/1.x 的关键区别</strong></p>
<ul>
<li>二进制协议代替文本协议，更加简洁高效</li>
<li>针对每个域只使用一个多路复用的连接</li>
<li>压缩头部信息减小开销</li>
<li>允许服务器主动推送应答到客户端的缓存中</li>
</ul>
<h4>（五）、http状态码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 简单版
    [
        100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
        200  OK         正常返回信息
        201  Created    请求成功并且服务器创建了新的资源
        202  Accepted   服务器已接受请求，但尚未处理
        301  Moved Permanently  请求的网页已永久移动到新位置。
        302 Found       临时性重定向。
        303 See Other   临时性重定向，且总是使用 GET 请求新的 URI。
        304  Not Modified 自从上次请求后，请求的网页未修改过。

        400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
        401 Unauthorized 请求未授权。
        403 Forbidden   禁止访问。
        404 Not Found   找不到如何与 URI 相匹配的资源。

        500 Internal Server Error  最常见的服务器端错误。
        503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> 简单版
    [
        <span class="hljs-number">100</span>  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
        <span class="hljs-number">200</span>  OK         正常返回信息
        <span class="hljs-number">201</span>  Created    请求成功并且服务器创建了新的资源
        <span class="hljs-number">202</span>  Accepted   服务器已接受请求，但尚未处理
        <span class="hljs-number">301</span>  Moved Permanently  请求的网页已永久移动到新位置。
        <span class="hljs-number">302</span> Found       临时性重定向。
        <span class="hljs-number">303</span> See Other   临时性重定向，且总是使用 GET 请求新的 URI。
        <span class="hljs-number">304</span>  Not Modified 自从上次请求后，请求的网页未修改过。

        <span class="hljs-number">400</span> Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
        <span class="hljs-number">401</span> Unauthorized 请求未授权。
        <span class="hljs-number">403</span> Forbidden   禁止访问。
        <span class="hljs-number">404</span> Not Found   找不到如何与 URI 相匹配的资源。

        <span class="hljs-number">500</span> Internal Server Error  最常见的服务器端错误。
        <span class="hljs-number">503</span> Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
    ]</code></pre>
<h3 id="articleHeader4">二、网络——其他</h3>
<p><strong>1. 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）</strong><br><a href="https://segmentfault.com/a/1190000014872028">一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么</a></p>
<p><strong>2. 说说网络分层里七层模型是哪七层</strong></p>
<ul>
<li>应用层：应用层、表示层、会话层（从上往下）（HTTP、FTP、SMTP、DNS）</li>
<li>传输层（TCP和UDP）</li>
<li>网络层（IP）</li>
<li>物理和数据链路层（以太网）</li>
<li>每一层的作用如下：</li>
<li>
<p>物理层：通过媒介传输比特,确定机械及电气规范（比特Bit）数据链路层：将比特组装成帧和点到点的传递（帧Frame）</p>
<ul>
<li>网络层：负责数据包从源到宿的传递和网际互连（包PackeT）</li>
<li>传输层：提供端到端的可靠报文传递和错误恢复（段Segment）</li>
<li>会话层：建立、管理和终止会话（会话协议数据单元SPDU）</li>
<li>表示层：对数据进行翻译、加密和压缩（表示协议数据单元PPDU）</li>
<li>应用层：允许访问OSI环境的手段（应用协议数据单元APDU）</li>
</ul>
</li>
</ul>
<p><strong>3. 304缓存的原理</strong></p>
<ul>
<li>服务器首先产生ETag，服务器可在稍后使用它来判断页面是否已经被修改。本质上，客户端通过将该记号传回服务器要求服务器验证其（客户端）缓存</li>
<li>304是HTTP状态码，服务器用来标识这个文件没修改，不返回内容，浏览器在接收到个状态码后，会使用浏览器已缓存的文件</li>
<li>客户端请求一个页面（A）。 服务器返回页面A，并在给A加上一个ETag。 客户端展现该页面，并将页面连同ETag一起缓存。 客户再次请求页面A，并将上次请求时服务器返回的ETag一起传递给服务器。 服务器检查该ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304（未修改——Not Modified）和一个空的响应体</li>
<li><a href="https://segmentfault.com/a/1190000014888462" target="_blank">认识更多--浏览器缓存篇</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
计算机网络篇（前端、HTTP）

## 原文链接
[https://segmentfault.com/a/1190000015017908](https://segmentfault.com/a/1190000015017908)


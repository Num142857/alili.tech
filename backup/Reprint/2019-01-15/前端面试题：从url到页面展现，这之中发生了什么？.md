---
title: '前端面试题：从url到页面展现，这之中发生了什么？' 
date: 2019-01-15 2:30:12
hidden: true
slug: zkqggv0rp3k
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009317499?w=700&amp;h=466" src="https://static.alili.tech/img/remote/1460000009317499?w=700&amp;h=466" alt="输入网址" title="输入网址" style="cursor: pointer; display: inline;"></span></p>
<blockquote><h3 id="articleHeader0">这里markdown格式跟简书不太一样，排版可能不是很好，可以转到<a href="http://www.jianshu.com/p/fc957e25102e" rel="nofollow noreferrer" target="_blank">我的简书</a>上看</h3></blockquote>
<blockquote><p>我们平常在地址栏里输入一些网址时，页面很快就会出现，但在这之中到底发生了什么事情呢？</p></blockquote>
<h2 id="articleHeader1">大概是这样的流程：</h2>
<ul>
<li>在浏览器的地址栏中敲入了url</li>
<li>域名解析</li>
<li>服务器处理请求</li>
<li>浏览器处理</li>
<li>绘制网页</li>
</ul>
<h3 id="articleHeader2">一、在浏览器的地址栏中敲入了url</h3>
<h5>首先，我们要知道url是什么？</h5>
<p>URL（Uniform Resource Locator），统一资源定位符，用于定位互联网上的资源，实际上就是网站网址。url的格式一般为：</p>
<blockquote><p>协议类型://&lt;主机名&gt;:&lt;端口&gt;/&lt;路径&gt;/文件名</p></blockquote>
<p>其中协议类型可以是http（超文本传输协议）、https、ftp（文件传输协议）、telnet（远程登录协议）、file等等。而http是最常见的网络传输协议，https则是进行加密的网络传输。</p>
<p>例如，我的简书url为<code>http://www.jianshu.com/u/b473784d730c</code>，其中，“http”表示与web服务器通讯采用<code>http</code>协议，简书web服务器域名为<code>www.jianshu.com</code>，<code>u/b473784d730c</code>表示所访问的文件存在于web服务器上的路径。</p>
<p>url格式中主机名冒号后面的数字是端口编号，因为一台计算机常常会同时作为Web，FTP等服务器，端口编号用来告诉web服务器所在的主机要将请求交给哪个服务。默认情况下http服务的端口为80，不需要在url中输入，如果web服务器采用的不是这一个默认端口，就需要写明服务所用的端口。常见的协议默认端口如下：</p>
<table>
<thead><tr>
<th>协议类型</th>
<th align="center">默认端口</th>
</tr></thead>
<tbody>
<tr>
<td>http</td>
<td align="center">80</td>
</tr>
<tr>
<td>ftp</td>
<td align="center">21</td>
</tr>
<tr>
<td>https</td>
<td align="center">443</td>
</tr>
<tr>
<td>telnet</td>
<td align="center">23</td>
</tr>
</tbody>
</table>
<h5>IP是什么</h5>
<p>IP是因特网中的每台连接到网络的计算机为实现相互通信而遵循的规则协议。每个处于互联网中的设备都有IP 地址，形如 192.168.0.1，而127.0.0.1代表本机的 IP。IP又分为局域网IP和公网IP。而局域网 IP 和公网 IP 是有差别的。每个网站就是靠IP来定位的。</p>
<p>为了便于记忆或辨识，人们使用域名来登录网站，每个域名背后有对应的IP地址。</p>
<p>比如对于 <code>http://www.jianshu.com</code>的URL，浏览器实际上不知道 <code>www.jianshu.com</code>到底是什么东西，需要查找<code>www.jianshu.com</code>网站所在服务器的IP地址，才能找到目标，这就是下文要说的域名解析。</p>
<h4>二、域名解析</h4>
<p>当用户在浏览器中输入url后,你使用的电脑会发出一个DNS请求到本地DNS服务器。本地DNS服务器一般都是你的网络接入服务器商提供，比如中国电信，中国移动,DNS请求到达本地DNS服务器之后会有以下几个步骤：</p>
<ul><li>查找浏览器缓存</li></ul>
<blockquote><p>浏览器会检查缓存中有没有这个域名对应的解析过的IP地址，如果缓存中有，这个解析过程就将结束。Chrome浏览器看本身的DNS缓存时间比较方便，在地址栏输入<code>chrome://net-internals/#dns</code>，就可以看到了</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009317500?w=1240&amp;h=289" src="https://static.alili.tech/img/remote/1460000009317500?w=1240&amp;h=289" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>查找操作系统缓存</li></ul>
<blockquote><p>如果用户的浏览器缓存中没有，浏览器会从hosts文件查找是否有存储DNS信息，查找是否有目标域名和对应的IP地址</p></blockquote>
<ul><li>查找路由器缓存</li></ul>
<blockquote><p>如果系统缓存中也找不到，那么查询请求就会发向路由器，路由器一般会有自己的DNS缓存。</p></blockquote>
<ul><li>查找ISP(Internet Service Provider) DNS 缓存</li></ul>
<blockquote><p>如果路由器缓存中也找不到，那么就查询ISP DNS 缓存服务器了。</p></blockquote>
<p>我们都知道在我们的网络配置中都会有"DNS服务器地址"这一项，操作系统会把这个域名发送给这里设置的DNS，比如<code>114.114.114.114</code>,也就是本地区的域名服务器，通常是提供给你接入互联网的应用提供商。而<code>114.114.114.114</code>是国内移动、电信和联通通用的DNS。</p>
<ul><li>迭代查询</li></ul>
<blockquote><p>如果前面都找不到DNS缓存的话，会有以下几个步骤：</p></blockquote>
<ul>
<li>本地 DNS服务器将该请求转发到互联网上的根域（根域没有名字，在DNS系统中就用一个空字符串来表示。例如<code>www.baidu.com.</code>现在的DNS系统都不会要求域名以<code>.</code>来结束，即<code>www.baidu.com</code>就可以解析了，但是现在很多DNS解析服务商还是会要求在填写DNS记录的时候以<code>.</code>来结尾域名。）</li>
<li>根域将所要查询域名中的顶级域（比如要查询<code>www.baidu,com</code>，该域名的顶级域就是<code>com</code>）的服务器IP地址返回到本地DNS。</li>
<li>本地DNS根据返回的IP地址，再向顶级域（就是com域）发送请求， com域服务器再将域名中的二级域（即<code>www.baidu.com</code>中的<code>baidu.com</code>）的IP地址返回给本地DNS。</li>
<li>本地DNS再向二级域发送请求进行查询。</li>
<li>之后不断重复这样的过程，直到本地DNS服务器得到最终的查询结果，并返回到主机。这时候主机才能通过域名访问该网站。<br>下图能很好的说明这个<em>迭代查询</em>:</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319671?w=1188&amp;h=769" src="https://static.alili.tech/img/remote/1460000009319671?w=1188&amp;h=769" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当查找到对应的IP地址之后，通过IP地址查找到对应的服务器，浏览器将用户发起的http请求发送给服务器。例如：<code>GET http://www.baidu.com/ HTTP/1.1</code></p>
<h3 id="articleHeader3">三、服务器处理请求</h3>
<p>每台服务器上都会安装处理请求的应用——<code>Web server</code>。常见的web server产品有<code>apache</code>、<code>nginx</code>、<code>IIS</code>、<code>Lighttpd</code>等。</p>
<p>当web server接收到一个HTTP请求(request)，会返回一个HTTP响应(response)，例如送回一个HTML页面。对于不同用户发送的请求，会结合配置文件，把不同请求委托给服务器上处理对应请求的程序进行处理（例如CGI脚本，JSP脚本，servlets，ASP脚本，服务器端JavaScript，或者一些其它的服务器端技术等）。</p>
<p>无论它们(脚本)的目的如何，这些服务器端(server-side)的程序通常产生一个HTML的响应(response)来让浏览器可以浏览。</p>
<p>那么如何处理请求？实际上就是后台处理的工作。后台开发现在有很多框架，但大部分都还是按照<a href="https://zh.wikipedia.org/wiki/MVC" rel="nofollow noreferrer" target="_blank">MVC设计模式</a>进行搭建的。</p>
<p>处理的过程如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009317502?w=1026&amp;h=958" src="https://static.alili.tech/img/remote/1460000009317502?w=1026&amp;h=958" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>MVC</strong>的处理过程是这样的：对于每一个用户输入的请求，首先被控制器接收，控制器决定用哪个模型来进行处理，然后模型用业务逻辑来处理用户的请求并返回数据，最后控制器确定用哪个视图模型，用相应的视图格式化模型返回html字符串给浏览器，并通过显示页面呈现给用户。</p>
<h3 id="articleHeader4">四、浏览器处理</h3>
<p>接下来就是浏览器进行处理， 通过后台处理返回的HTML字符串被浏览器接受后被一句句读取解析，html页面经历加载、解析、渲染。</p>
<ul>
<li>
<h5>加载</h5>
<p>浏览器对一个html页面的加载顺序是从上而下的。如果加载过程中遇到外部css文件，浏览器另外发出一个请求，来获取css文件。遇到图片资源，浏览器也会另外发出一个请求，来获取图片资源。但是当文档加载过程中遇到js文件，html文档会挂起渲染（加载解析渲染同步）的线程，不仅要等待文档中js文件加载完毕，还要等待解析执行完毕，才可以恢复html文档的渲染线程。</p>
</li>
<li>
<h5>解析</h5>
<p><strong>解析文档</strong>是指将文档转化成为有意义的结构，也就是可让代码理解和使用的结构。解析得到的结果通常是代表了文档结构的节点树，它称作解析树或者语法树，也就是DOM树。如下图：</p>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009317503?w=486&amp;h=266" src="https://static.alili.tech/img/remote/1460000009317503?w=486&amp;h=266" alt="" title="" style="cursor: pointer;"></span><br><strong>css解析</strong>将css文件解析为样式表对象。如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000009317504?w=500&amp;h=393" src="https://static.alili.tech/img/remote/1460000009317504?w=500&amp;h=393" alt="" title="" style="cursor: pointer;"></span><br><strong>js解析</strong>文件在加载的同时也进行解析<br>如果想深入如何解析的话可以看<a href="https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Parsing_general" rel="nofollow noreferrer" target="_blank">浏览器的工作原理：新式网络浏览器幕后揭秘</a>这篇文章</p>
<ul><li>
<h5>渲染</h5>
<p>即为构建渲染树的过程，就是将DOM树进行可视化表示。构建这棵树是为了以正确的顺序绘制文档内容。</p>
</li></ul>
<h3 id="articleHeader5">五、绘制网页</h3>
<p>浏览器根据 HTML 和 CSS 计算得到渲染树，最终绘制到屏幕上</p>
<hr>
<p>参考的文章：<br><a href="https://segmentfault.com/a/1190000006879700">前端经典面试题: 从输入URL到页面加载发生了什么？</a><br><a href="http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/" rel="nofollow noreferrer" target="_blank">What really happens when you navigate to a URL</a><br><a href="http://book.jirengu.com/jrg-team/frontend-knowledge-ppt/www/%E5%89%8D%E7%AB%AF%E5%85%A5%E9%97%A8-%E4%BB%8E%20URL%E8%BE%93%E5%85%A5%E5%88%B0%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%8E%B0.html#/" rel="nofollow noreferrer" target="_blank">从URL输入到页面展现</a><br>&nbsp;<a href="http://blog.csdn.net/nawuyao/article/details/50386409" rel="nofollow noreferrer" target="_blank">MVC模型结构是什么</a><br><a href="http://weizhifeng.net/talking-about-domain.html" rel="nofollow noreferrer" target="_blank">域名详解</a><br><a href="http://www.jianshu.com/p/e141d1543143" rel="nofollow noreferrer" target="_blank">浏览器~加载，解析，渲染</a></p>
<hr>
<p>由于本人的能力有限，如果哪里写的不对的话，请指出！感谢您的观看?</p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题：从url到页面展现，这之中发生了什么？

## 原文链接
[https://segmentfault.com/a/1190000009317496](https://segmentfault.com/a/1190000009317496)


---
title: '来说说DNS解析' 
date: 2019-01-29 2:30:10
hidden: true
slug: 48d12cl9t0n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">0x01.DNS</h2>
<blockquote><p>DNS（Domain Name System，域名系统），因特网上作为域名和IP地址相互映射的一个分布式数据库，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。通过主机名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。DNS协议运行在UDP协议之上，使用端口号53。在RFC文档中RFC 2181对DNS有规范说明，RFC 2136对DNS的动态更新进行说明，RFC 2308对DNS查询的反向缓存进行说明。</p></blockquote>
<h3 id="articleHeader1">域名结构</h3>
<p>通常 Internet 主机域名的一般结构为：主机名.三级域名.二级域名.顶级域名。 Internet 的顶级域名由 Internet网络协会域名注册查询负责网络地址分配的委员会进行登记和管理，它还为 Internet的每一台主机分配唯一的 IP 地址。全世界现有三个大的网络信息中心： 位于美国的 Inter-NIC，负责美国及其他地区； 位于荷兰的RIPE-NIC，负责欧洲地区；位于日本的APNIC ，负责亚太地区 。</p>
<h3 id="articleHeader2">域的划分</h3>
<p>我们可以将域名系统理解为一个有多个层级的树，根节点叫做<code>根域</code>，在根域下面是根据行业性质或者国家地区划分的顶级域，每个域都会有域名服务器，也叫权威域名服务器。在顶级域下还会有各种二级域、三级域。大概的结构如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007913264?w=852&amp;h=564" src="https://static.alili.tech/img/remote/1460000007913264?w=852&amp;h=564" alt="http://oigpnnjhq.bkt.clouddn.com/lalalal.png" title="http://oigpnnjhq.bkt.clouddn.com/lalalal.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">域名解析</h3>
<p>域名解析是把域名指向网站空间IP，让人们通过注册的域名可以方便地访问到网站的一种服务。IP地址是网络上标识站点的数字地址，为了方便记忆，采用域名来代替IP地址标识站点地址。域名解析就是域名到IP地址的转换过程。域名的解析工作由DNS服务器完成。</p>
<h3 id="articleHeader4">常见域名解析的记录类型</h3>
<ul>
<li><p>A记录：又称为IP指向用户可以在此设置子域名并指向到自己的目标主机地址上，从而实现通过域名找到服务器。</p></li>
<li><p>CNAME：通常称别名指向。CNAME的目标主机地址只能使用主机名</p></li>
<li><p>MX记录：邮件交换记录</p></li>
<li><p>NS记录：解析服务器记录，用来表明哪台服务器对该域名进行解析。这里的NS记录支队自域名生效</p></li>
</ul>
<h2 id="articleHeader5">0x02.域名解析的过程</h2>
<p>当我们在浏览器输入一个地址过后（或者浏览器自动的向我们脚本或其他资源发起请求过后），浏览器所发出的请求通常只是一串<code>域名+资源路径</code>组成的字符串，需要由操作系统帮助完成DNS解析的过程。</p>
<p>大概的流程：</p>
<ol>
<li><p>操作系统检查自身本地的hosts文件是否有这个网址的映射关系，如果有，直接返回完成域名解析</p></li>
<li><p>如果hosts文件没有这个域名映射，则查找本地DNS解析器缓存，如果有映射关系则完成域名解析</p></li>
<li><p>如果hosts和本地dns缓存都没有映射关系，则查找TCP/IP中的首选DNS服务器（本地DNS服务器），收到查询时，如果查询的资源在本地配置区域中，则返回解析地址给客户机，完成域名解析。</p></li>
<li><p>如果不在本地DNS服务器区域解析，但是该服务器缓存了相关的信息，则从缓存中调用这个映射关系，完成解析，但是这个解析<strong>不具备权威性</strong></p></li>
<li><p>如果本地DNS服务器本地区域文件与缓存都解析失败，则根据本地DNS服务器的设置进行查询，如果没有启用转发模式，本地DNS就把请求发给13台根DNS，根DNS判断这个域名所述的顶级域名服务器，并返回负责该顶级域名的服务器的一个IP地址。本地DNS服务器收到ip信息后联系对应的顶级域的这台服务器。这台负责顶级域的服务器收到请求后，如果自己无法解析，它会找到下一集DNS的地址并返回给本地DNS服务器。当本地DNS服务器收到这个地址后，就会取新的服务器上查询一直重复这个动作，直到找到主机</p></li>
<li><p>如果使用了转发模式，此DNS服务器会把请求转发至上一级DNS服务器，由上一级服务器进行解析如果也不能解析则继续转发到上机，知道找到能够解析的服务器。</p></li>
</ol>
<p>流程图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007913265?w=1046&amp;h=1365" src="https://static.alili.tech/img/remote/1460000007913265?w=1046&amp;h=1365" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">0x03.DNS劫持</h2>
<blockquote><p>DNS劫持又称域名劫持，是指在劫持的网络范围内拦截域名解析的请求，分析请求的域名，把审查范围以外的请求放行，否则返回假的IP地址或者什么都不做使请求失去响应，其效果就是对特定的网络不能反应或访问的是假网址。</p></blockquote>
<h3 id="articleHeader7">基本原理</h3>
<p>DNS（域名系统）的作用是把网络地址（域名，以一个字符串的形式）对应到真实的计算机能够识别的网络地址（IP地址），以便计算机能够进一步通信，传递网址和内容等。由于域名劫持往往只能在特定的被劫持的网络范围内进行，所以在此范围外的域名服务器(DNS)能够返回正常的IP地址，高级用户可以在网络设置把DNS指向这些正常的域名服务器以实现对网址的正常访问。所以域名劫持通常相伴的措施——封锁正常DNS的IP。</p>
<h3 id="articleHeader8">HTTPS防止劫持</h3>
<blockquote><p>HTTPS（全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。 它是一个URI scheme（抽象标识符体系），句法类同http:体系。用于安全的HTTP数据传输。<a href="https:URL">https:URL</a>表明它使用了HTTP，但HTTPS存在不同于HTTP的默认端口及一个加密/身份验证层（在HTTP与TCP之间）。</p></blockquote>
<p>在SSL握手阶段，客户端浏览器会认证服务器的身份，这是通过“证书”来实现的，证书由证书权威（CA）为某个域名签发，可以理解为网站的身份证件，客户端需要对这个证件进行认证，需要确定该证书是否属于目标网站并确认证书本身是否有效。最后在握手阶段，通信的双方还会协商出一个用于加密和解密的会话密钥。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007913266" src="https://static.alili.tech/img/remote/1460000007913266" alt="" title="" style="cursor: pointer;"></span></p>
<p>SSL握手阶段结束之后，服务器和客户端使用协商出的会话密钥对交互的数据进行加密/解密操作，对于HTTP协议来说，就是将HTTP请求和应答经过加密之后再发送到网络上。</p>
<p>由此可见，因为SSL协议提供了对服务器的身份认证，所以DNS劫持导致连接错误服务器的情况将会被发现进而终止连接，最终导致DNS挟持攻击无法实现。此外SSL协议还提供数据的加密和完整性校验，这就解决了关键信息被嗅探以及数据内容被修改的可能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
来说说DNS解析

## 原文链接
[https://segmentfault.com/a/1190000007913261](https://segmentfault.com/a/1190000007913261)


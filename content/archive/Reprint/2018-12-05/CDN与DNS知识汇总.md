---
title: 'CDN与DNS知识汇总' 
date: 2018-12-05 2:30:09
hidden: true
slug: hxyna8j4ik7
categories: [reprint]
---

{{< raw >}}

                    
<p>在性能优化的时候，比较常见的一个建议是，把资源部署在CDN上，那么问题来了，CDN是什么？这样做有什么好处？</p>
<h4>DNS</h4>
<p>我们先讲一下域名系统DNS(Domain Name System)吧。</p>
<p>他是一个分布式数据库，功能是联系域名和ip地址。域名与ip的对应关系，被称为记录(record)，可分为各种类型</p>
<ul>
<li>A: Address，域名指向的IP地址，一个域名可以有多个A记录。</li>
<li>NS：Name Server，保存下一级域名信息的服务器地址</li>
<li>MX：Mail eXchange，接受电子邮件的服务器地址</li>
<li>CNAME：Canonical Name，返回另一个域名，令当前查询域名挑去该域名，多个域名-&gt;服务器的映射。</li>
<li>PTR： Pointer Record，只用于ip地址查询域名</li>
</ul>
<p>DNS由下面三个部分组成</p>
<ul>
<li>名称解析器（resolver）</li>
<li>域名空间（domain name space）</li>
<li>名称服务器（name server）</li>
</ul>
<p>假如你要访问baidu.com，需要先通过dns系统查出他的ip地址如220.181.57.216，才能访问。</p>
<h5>dns查询的过程</h5>
<p>那么问题来了，dns是怎么通过域名来查出ip的呢?我们以浏览器输入www.example.com为例，</p>
<ol>
<li>检查浏览器缓存</li>
<li>检查操作系统缓存，常见的如hosts文件</li>
<li>检查路由器缓存</li>
<li>如果前几步都没没找到，会向ISP(网络服务提供商)的LDNS服务器查询</li>
<li>
<p>如果LDNS服务器没找到，会向跟域名服务器(Root Server)请求解析，分为以下几步：</p>
<ol>
<li>跟服务器返回顶级域名(TLD)服务器如.com，.cn，.org等的地址，全球只有13台，该例子中会返回.com的地址</li>
<li>接着向TLD发送请求，然后会返回次级域名(SLD)服务器的地址，本例子会返回.example的地址</li>
<li>接着向SLD域名服务器通过域名查询目标IP，本例子会返回www.example.com的地址</li>
<li>Local DNS Server会缓存结果，并返回给用户，缓存在系统中。</li>
</ol>
</li>
</ol>
<h5>DNS安全问题</h5>
<ol>
<li>DNS反射/放大攻击<p>向大量开放DNS服务器发送大范围域名查询的DNS请求，并将该DNS请求的源IP地址伪造成想要攻击的目标IP地址。由于请求数据比相应数据小得多，攻击者可以利用该技术放大掌握的带宽资源和攻击流量。</p>
</li>
<li>DDOS攻击可能造成域名解析瘫痪</li>
<li>DNS/域名劫持<br>在劫持的网络范围内拦截域名解析的请求，分析请求的域名，返回假的IP地址或者使请求失去响应。DNS劫持通过篡改DNS服务器上的数据返回给用户一个错误的查询结果来实现的。</li>
<li>DNS污染</li>
</ol>
<p>DNS污染是一种让一般用户由于得到虚假目标主机IP而不能与其通信的方法，指的是用户访问一个地址，国内的服务器(非DNS)监控到用户访问的已经被标记地址时，服务器伪装成DNS服务器向用户发回错误的地址的行为。<br>dns污染与dns劫持的区别在于，dns劫持修改了dns的解析结果，dns污染是不经过dns服务器，返回错误信息</p>
<ol><li>DNS信息黑客被修改</li></ol>
<h5>DNS优化</h5>
<p>可以看出，dns解析是一个漫长的过程，如何优化这一过程呢？</p>
<ol><li>DNS Prefetching<p>用户在请求某个链接之前，浏览器先尝试解析该链接的域名再将其进行缓存。这样真正请求的时候就不需要进行DNS解析。</p>
</li></ol>
<p>可以</p>
<li><ul>
<li>在服务器中响应设置<code>X-DNS-Prefetch-Control</code>的值为<code>on</code>启动预解析</li>
<li>HTML中，<code>&lt;meta http-equiv="x-dns-prefetch-control" content="on"&gt;</code>
</li>
<li>对特定域名预解析<code>&lt;link rel=”dns-prefetch” href=”//fonts.googleapis.com”&gt;</code>
</li>
</ul></li>
<ol>
<li>
<p>域名收敛</p>
<p>建议将静态资源只放在一个域名下面，可以有效减少dns的请求</p>
</li>
<li>httpdns<p>基于Http协议向HTTPDNS服务器发送域名解析请求，替代了基于DNS协议向运营商Local DNS发起解析请求的传统方式，可以避免运营商的域名劫持和进行精准调度。</p>
</li>
</ol>
<p>这过程分为两步</p>
<ol>
<li>客户端直接访问HttpDNS接口，获取业务在域名配置管理系统上配置的访问延迟最优的IP。（基于容灾考虑，还是保留次选使用运营商LocalDNS解析域名的方式）</li>
<li>客户端向获取到的IP后就向直接往此IP发送业务协议请求。以Http请求为例，通过在header中指定host字段，向HttpDNS返回的IP发送标准的Http请求即可。</li>
</ol>
<h4>CDN</h4>
<h5>CDN是什么</h5>
<p>讲完DNS，现在可以开始讲CDN了，CDN的全称是Content Delivery Network，即内容分发网络，它能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。</p>
<p>典型的CDN系统由下面三个部分组成</p>
<ul>
<li>分发服务系统<p>最基本的工作单元就是Cache设备，cache（边缘cache）负责直接响应最终用户的访问请求，把缓存在本地的内容快速地提供给用 户。同时cache还负责与源站点进行内容同步，把更新的内容以及本地没有的内容从源站点获取并保存在本地。Cache设备的数量、规模、总服务能力是衡 量一个CDN系统服务能力的最基本的指标</p>
</li>
<li>负载均衡系统<p>主要功能是负责对所有发起服务请求的用户进行访问调度，确定提供给用户的最终实际访问地址。两级调度体系分为全局负载均衡（GSLB）和本 地负载均衡（SLB）。GSLB主要根据用户就近性原则，通过对每个服务节点进行“最优”判断，确定向用户提供服务的cache的物理位置。SLB主要负 责节点内部的设备负载均衡</p>
</li>
<li>运营管理系统<p>分为运营管理和网络管理子系统，负责处理业务层面的与外界系统交互所必须的收集、整理、交付工作，包含客户管理、产品管理、计费管理、统计分析等功能。</p>
</li>
</ul>
<h5>CDN的过程</h5>
<p>使用CDN的方法很简单，只需要修改自己的DNS解析，设置一个CNAME指向CDN服务商即可。</p>
<p>用户访问未使用CDN缓存资源的过程为:</p>
<ol>
<li>浏览器通过前面提到的过程对域名进行解析，以得到此域名对应的IP地址；</li>
<li>浏览器使用所得到的IP地址，向域名的服务主机发出数据访问请求；</li>
<li>服务器向浏览器返回响应数据</li>
</ol>
<p>使用CDN后</p>
<ol>
<li>当用户点击网站页面上的内容URL，经过本地DNS系统解析，DNS系统会最终将域名的解析权交给CNAME指向的CDN专用DNS服务器。</li>
<li>CDN的DNS服务器将CDN的全局负载均衡设备IP地址返回用户。</li>
<li>用户向CDN的全局负载均衡设备发起内容URL访问请求。</li>
<li>CDN全局负载均衡设备根据用户IP地址，以及用户请求的内容URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。</li>
<li>区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户IP地址，判断哪一台服务器距用户最近；根据用户所请求的URL中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的IP地址。</li>
<li>全局负载均衡设备把服务器的IP地址返回给用户</li>
<li>用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。</li>
</ol>
<p>上面的字太多，有点绕？通俗点就是用户访问的资源原本是存放在你自己的服务器，通过修改DNS让用户根据IP等情况来选择合适的CDN缓存服务器来获取资源。</p>
<h5>CDN的优点</h5>
<p>这样做有什么好处呢？</p>
<ol>
<li>本地Cache加速，加快访问速度</li>
<li>镜像服务，消除运营商之间互联的瓶颈影响，保证不同网络的用户都能得到良好的访问质量</li>
<li>远程加速，自动选择cache服务器</li>
<li>带宽优化，分担网络流量，减轻压力，</li>
<li>集群抗攻击</li>
<li>节约成本</li>
</ol>
<h4>最后</h4>
<p>本文章为<a href="http://hpoenixf.com/%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6%E7%B3%BB%E5%88%97-%E7%9B%AE%E5%BD%95.html" rel="nofollow noreferrer" target="_blank">前端进阶系列</a>的一部分,<br>欢迎关注和<a href="https://github.com/hpoenixf/hpoenixf.github.io" rel="nofollow noreferrer" target="_blank">star</a>本博客或是关注我的<a href="https://github.com/hpoenixf" rel="nofollow noreferrer" target="_blank">github</a></p>
<h4>引用</h4>
<ol>
<li><a href="https://www.linuxhot.com/cache-dns.html" rel="nofollow noreferrer" target="_blank">浏览器缓存之DNS</a></li>
<li><a href="https://link.zhihu.com/?target=http%3A//book.51cto.com/art/201205/338756.htm" rel="nofollow noreferrer" target="_blank">1.2 CDN的基本工作过程 - 51CTO.COM</a></li>
<li><a href="https://www.cnblogs.com/losbyday/p/5843960.html" rel="nofollow noreferrer" target="_blank">CDN技术详解</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching" rel="nofollow noreferrer" target="_blank">DNS 预读取</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CDN与DNS知识汇总

## 原文链接
[https://segmentfault.com/a/1190000014407824](https://segmentfault.com/a/1190000014407824)


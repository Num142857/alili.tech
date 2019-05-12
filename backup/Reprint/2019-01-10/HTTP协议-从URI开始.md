---
title: 'HTTP协议-从URI开始' 
date: 2019-01-10 2:30:08
hidden: true
slug: 78coqs7qnvo
categories: [reprint]
---

{{< raw >}}

                    
<p>原文连接 <a href="https://github.com/jkchao/blog/issues/10" rel="nofollow noreferrer" target="_blank">blog</a></p>
<h1 id="articleHeader0">URI</h1>
<p>URI, 既是统一资源标识符号，每个 Web 服务器都有一个 URI 标识符，它在世界范围内唯一标识并定位信息资源。</p>
<p>它具有两种形式，URN （统一资源名）、URL（统一资源定位符）。</p>
<h2 id="articleHeader1">URN</h2>
<p>URN (统一资源名)，是作为特定内容的唯一名称使用的，与目前资源所在地无关。使用这些与位置无关的 URN，就可以将资源四处搬移。通过 URN，还可以用同一个名字通过多种网络访问协议来访问资源。</p>
<h2 id="articleHeader2">URL</h2>
<p>URL（统一资源定位符），是 URI 最常见的形式，它描述了一台特定服务器上某资源的特定位置。它们可以明确说明如何从一个精确、固定的位置获取资源。</p>
<p>一个完整的 URL 通常包括以下三部分：</p>
<ul>
<li>方案：方案部分，说明了 Web客户端 访问资源时所使用的协议类型。通常是HTTP协议。方案可以使用其他协议来访问资源，它们可以指向因特网上的任意资源，比如：E-mail: <code>jkchaom@gmail.com</code> ，或者其他协议。</li>
<li>服务器位置：这部分告知服务器端的位置位于何处。通常的组成是“主机名 + 端口”的形式告知，也有“ IP 地址 + 端口”的形式。端口标识出服务器正在监听的网络端口，对下层使用了 TCP 协议的 HTTP 来说，默认端口号为80；</li>
<li>资源路径：路径说明了请求的是服务器上哪个特定的本地资源。</li>
</ul>
<p>整合到结构，既是“方案 :// 服务器位置／路径”</p>
<p>此外，一些非必需的 URL 组件也在其中扮演着非常重要的作用：</p>
<ul>
<li>查询：主要用来缩小所请求资源类型范围。通常以一个“ ？”，开始，比如以下URL 地址，<a href="https://api.jkchao.cn/api/article?current_page=2&amp;type=1" rel="nofollow noreferrer" target="_blank">https://api.jkchao.cn/api/art...</a> 。按照常规，查询组件的组成是以一系列的“名／值”，对的形式出现，名值对之间用字符“&amp;”分隔。</li>
<li>片段：有些资源类型，可以做进一步划分，比如 HTML ，URL 支持使用片段组件来表示一个资源内部的片段。通常以“#” 开始，比如：<a href="https://github.com/jkchao/blog#http" rel="nofollow noreferrer" target="_blank">https://github.com/jkchao/blo...</a> ， <strong>HTTP 服务器通常只处理整个对象，而不是对象的片段，客户端不能将片段传送给服务器，浏览器从服务器获得了整个资源之后，会根据片段来显示片段资源。</strong> 因此，片段组件，仅由客户端使用。</li>
</ul>
<h3 id="articleHeader3">URL 的缺点</h3>
<p>URL 表示的是实际的地址，而不是准确的名字。这就意味着 URL 会告诉你资源此时处于什么位置，它会为你提供特定端口上特定服务器的名字，告诉你在何处可以找到这个资源。这种方案的最大弊端在于，如果资源被移走了，URL 也就不再有效了。那时，它就无法对对象进行定位了。</p>
<p><em>永久统一资源定位符（PURL）</em>，是用 URL 实现 URN 功能的一个例子。其基本思路是在搜索资源的过程中引入另一个中间层，通过一个中间资源定位符服务器对资源的实际 URL 进行登记和跟踪，客户端可以向定位符请求一个永久 URL ，定位符可以以一个资源作为响应，将客户端重定向到资源当前实际 URL 上去。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010035919" src="https://static.alili.tech/img/remote/1460000010035919" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTTP协议-从URI开始

## 原文链接
[https://segmentfault.com/a/1190000010035914](https://segmentfault.com/a/1190000010035914)


---
title: 6 个可以帮你理解互联网工作原理的 RFC
hidden: true
categories: [reprint]
slug: efd6a16f
date: 2018-10-20 00:00:00
---

{{< raw >}}

            <h1><a href="#6-个可以帮你理解互联网工作原理的-rfc"></a>6 个可以帮你理解互联网工作原理的 RFC</h1>
<blockquote>
<p>以及 3 个有趣的 RFC。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/b349a1f9d7c09bbf7466a4d0390b9a515fa541f6/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f4c41572d496e7465726e65745f636f6e737472756374696f6e5f393430313436375f353230783239325f303531325f64632e706e673f69746f6b3d52506b5050744465"><img src="https://p0.ssl.qhimg.com/t019941e5835ceb80c6.png" alt=""></a></p>
<p>阅读源码是开源软件的重要组成部分。这意味着用户可以查看代码并了解做了什么。</p>
<p>但“阅读源码”并不仅适用于代码。理解代码实现的标准同样重要。这些标准编写在由<a href="https://www.ietf.org">互联网工程任务组</a>Internet Engineering Task Force（IETF）发布的称为“意见征集Requests for Comment”（RFC）的文档中。多年来已经发布了数以千计的 RFC，因此我们收集了一些我们的贡献者认为必读的内容。</p>
<h3><a href="#6-个必读的-rfc"></a>6 个必读的 RFC</h3>
<h4><a href="#rfc-2119---在-rfc-中用于指示需求级别的关键字"></a>RFC 2119 - 在 RFC 中用于指示需求级别的关键字</h4>
<p>这是一个快速阅读，但它对了解其它 RFC 非常重要。 <a href="https://www.rfc-editor.org/rfc/rfc2119.txt">RFC 2119</a> 定义了后续 RFC 中使用的需求级别。 “MAY” 究竟意味着什么？如果标准说 “SHOULD”，你_真的_必须这样做吗？通过为需求提供明确定义的分类，RFC 2119 有助于避免歧义。</p>
<h4><a href="#rfc-3339---互联网上的日期和时间时间戳"></a>RFC 3339 - 互联网上的日期和时间：时间戳</h4>
<p>时间是全世界程序员的祸根。 <a href="https://www.rfc-editor.org/rfc/rfc3339.txt">RFC 3339</a> 定义了如何格式化时间戳。基于 <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601</a> 标准，3339 为我们提供了一种表达时间的常用方法。例如，像星期几这样的冗余信息不应该包含在存储的时间戳中，因为它很容易计算。</p>
<h4><a href="#rfc-1918---私有互联网的地址分配"></a>RFC 1918 - 私有互联网的地址分配</h4>
<p>有属于每个人的互联网，也有只属于你的互联网。私有网络一直在使用，<a href="https://www.rfc-editor.org/rfc/rfc1918.txt">RFC 1918</a> 定义了这些网络。当然，你可以在路由器上设置在内部使用公网地址，但这是一个坏主意。或者，你可以将未使用的公共 IP 地址视为内部网络。在任何一种情况下都表明你从未阅读过 RFC 1918。</p>
<h4><a href="#rfc-1912---常见的-dns-操作和配置错误"></a>RFC 1912 - 常见的 DNS 操作和配置错误</h4>
<p>一切都是 #@%@ 的 DNS 问题，对吧？ <a href="https://www.rfc-editor.org/rfc/rfc1912.txt">RFC 1912</a> 列出了管理员在试图保持互联网运行时所犯的错误。虽然它是在 1996 年发布的，但 DNS（以及人们犯的错误）并没有真正改变这么多。为了理解我们为什么首先需要 DNS，如今我们再来看看 <a href="https://www.rfc-editor.org/rfc/rfc289.txt">RFC 289 - 我们希望正式的主机列表是什么样子的</a> 就知道了。</p>
<h4><a href="#rfc-2822--互联网邮件格式"></a>RFC 2822 — 互联网邮件格式</h4>
<p>想想你知道什么是有效的电子邮件地址么？如果你知道有多少个站点不接受我邮件地址中 “+” 的话，你就知道你知道不知道了。 <a href="https://www.rfc-editor.org/rfc/rfc2822.txt">RFC 2822</a> 定义了有效的电子邮件地址。它还详细介绍了电子邮件的其余部分。</p>
<h4><a href="#rfc-7231---超文本传输协议http11语义和内容"></a>RFC 7231 - 超文本传输​​协议（HTTP/1.1）：语义和内容</h4>
<p>想想看，几乎我们在网上做的一切都依赖于 HTTP。 <a href="https://www.rfc-editor.org/rfc/rfc7231.txt">RFC 7231</a> 是该协议的最新更新。它有超过 100 页，定义了方法、请求头和状态代码。</p>
<h3><a href="#3-个应该阅读的-rfc"></a>3 个应该阅读的 RFC</h3>
<p>好吧，并非每个 RFC 都是严肃的。</p>
<h4><a href="#rfc-1149---在禽类载体上传输-ip-数据报的标准"></a>RFC 1149 - 在禽类载体上传输 IP 数据报的标准</h4>
<p>网络以多种不同方式传递数据包。 <a href="https://www.rfc-editor.org/rfc/rfc1149.txt">RFC 1149</a> 描述了鸽子载体的使用。当我距离州际高速公路一英里以外时，它们的可靠性不会低于我的移动提供商。</p>
<h4><a href="#rfc-2324--超文本咖啡壶控制协议htcpcp10"></a>RFC 2324 — 超文本咖啡壶控制协议（HTCPCP/1.0）</h4>
<p>咖啡对于完成工作非常重要，当然，我们需要一个用于管理咖啡壶的程序化界面。 <a href="https://www.rfc-editor.org/rfc/rfc2324.txt">RFC 2324</a> 定义了一个用于与咖啡壶交互的协议，并添加了 HTTP 418（“我是一个茶壶”）。</p>
<h4><a href="#rfc-69--mit的分发列表更改"></a>RFC 69 — M.I.T.的分发列表更改</h4>
<p><a href="https://www.rfc-editor.org/rfc/rfc69.txt">RFC 69</a> 是否是第一个误导取消订阅请求的发布示例？</p>
<p>你必须阅读的 RFC 是什么（无论它们是否严肃）？在评论中分享你的列表。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/7/requests-for-comments-to-know">https://opensource.com/article/18/7/requests-for-comments-to-know</a></p>
<p>作者：<a href="https://opensource.com/users/bcotton">Ben Cotton</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/6-rfcs-for-understanding-how-the-internet-works](https://www.zcfy.cc/article/6-rfcs-for-understanding-how-the-internet-works)
原文标题: 6 个可以帮你理解互联网工作原理的 RFC
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

---
title: 'cURL 与 wget：你应该选用哪一个？' 
date: 2019-01-20 2:30:11
hidden: true
slug: bmvnker0bz
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#curl-与-wget你应该选用哪一个"></a>cURL 与 wget：你应该选用哪一个？</h1>
<p>当想要直接通过 Linux 命令行下载文件，马上就能想到两个工具：wget 和 cURL。它们有很多一样的特征，可以很轻易的完成一些相同的任务。</p>
<p>虽然它们有一些相似的特征，但它们并不是完全一样。这两个程序适用与不同的场合，在特定场合下，都拥有各自的特性。</p>
<h3><a href="#curl-vs-wget-相似之处"></a>cURL vs wget： 相似之处</h3>
<p>wget 和 cURL 都可以下载内容。它们的核心就是这么设计的。它们都可以向互联网发送请求并返回请求项。这可以是文件、图片或者是其他诸如网站的原始 HTML 之类。</p>
<p>这两个程序都可以进行 HTTP POST 请求。这意味着它们都可以向网站发送数据，比如说填充表单什么的。</p>
<p>由于这两者都是命令行工具，它们都被设计成可脚本化。wget 和 cURL 都可以写进你的 <a href="https://www.maketecheasier.com/beginners-guide-scripting-linux/">Bash 脚本</a> ，自动与新内容交互，下载所需内容。</p>
<h3><a href="#wget-的优势"></a>wget 的优势</h3>
<p><a href="https://camo.githubusercontent.com/a26d5226dc53343ab28773d2a7df8672d74b4fe9/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f31322f7767632d776765742e6a7067"><img src="http://p0.qhimg.com/t0129ac80cbd89d08ef.jpg" alt="wget download" title="wget download"></a></p>
<p>wget 简单直接。这意味着你能享受它超凡的下载速度。wget 是一个独立的程序，无需额外的资源库，更不会做其范畴之外的事情。</p>
<p>wget 是专业的直接下载程序，支持递归下载。同时，它也允许你下载网页中或是 FTP 目录中的任何内容。</p>
<p>wget 拥有智能的默认设置。它规定了很多在常规浏览器里的事物处理方式，比如 cookies 和重定向，这都不需要额外的配置。可以说，wget 简直就是无需说明，开罐即食！</p>
<h3><a href="#curl-优势"></a>cURL 优势</h3>
<p><a href="https://camo.githubusercontent.com/117a8e00ef7e0db92c16c8a6318b83be4a8fad1d/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f31322f7767632d6375726c2e6a7067"><img src="http://p0.qhimg.com/t0179338a32467fde0d.jpg" alt="cURL Download" title="cURL Download"></a></p>
<p>cURL是一个多功能工具。当然，它可以下载网络内容，但同时它也能做更多别的事情。</p>
<p>cURL 技术支持库是：libcurl。这就意味着你可以基于 cURL 编写整个程序，允许你基于 libcurl 库中编写图形环境的下载程序，访问它所有的功能。</p>
<p>cURL 宽泛的网络协议支持可能是其最大的卖点。cURL 支持访问 HTTP 和 HTTPS 协议，能够处理 FTP 传输。它支持 LDAP 协议，甚至支持 Samba 分享。实际上，你还可以用 cURL 收发邮件。</p>
<p>cURL 也有一些简洁的安全特性。cURL 支持安装许多 SSL/TLS 库，也支持通过网络代理访问，包括 SOCKS。这意味着，你可以越过 Tor 来使用cURL。</p>
<p>cURL 同样支持让数据发送变得更容易的 gzip 压缩技术。</p>
<h3><a href="#思考总结"></a>思考总结</h3>
<p>那你应该使用 cURL 还是使用 wget？这个比较得看实际用途。如果你想快速下载并且没有担心参数标识的需求，那你应该使用轻便有效的 wget。如果你想做一些更复杂的使用，直觉告诉你，你应该选择 cRUL。</p>
<p>cURL 支持你做很多事情。你可以把 cURL 想象成一个精简的命令行网页浏览器。它支持几乎你能想到的所有协议，可以交互访问几乎所有在线内容。唯一和浏览器不同的是，cURL 不会渲染接收到的相应信息。</p>
<hr>
<p>via: <a href="https://www.maketecheasier.com/curl-vs-wget/">https://www.maketecheasier.com/curl-vs-wget/</a></p>
<p>作者：<a href="https://www.maketecheasier.com/author/nickcongleton/">Nick Congleton</a> 译者：<a href="https://github.com/CYLeft">CYLeft</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
cURL 与 wget：你应该选用哪一个？

## 原文链接
[https://www.zcfy.cc/article/curl-vs-wget-their-differences-usage-and-which-one-you-should-use](https://www.zcfy.cc/article/curl-vs-wget-their-differences-usage-and-which-one-you-should-use)


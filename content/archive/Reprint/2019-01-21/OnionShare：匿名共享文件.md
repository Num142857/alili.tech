---
title: 'OnionShare：匿名共享文件' 
date: 2019-01-21 2:30:06
hidden: true
slug: vzsx3b6ueef
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#onionshare匿名共享文件"></a>OnionShare：匿名共享文件</h1>
<p>在这个数字世界中，我们通过互联网使用 Dropbox、Mega、Google Drive 等不同云存储分享我们的媒体、文档和重要文件。但是每个云存储都有两个主要问题，一个是大小和另一个安全。习惯 Bit Torrent 之后，大小已经不是问题了，但安全性仍旧是。</p>
<p>你即使通过安全的云服务发送文件，该公司也会注意到这些文件，如果这些文件是保密的，政府甚至可以拿到它们。因此，为了克服这些问题，我们使用 OnionShare，如它的名字那样它使用洋葱网络也就是 Tor 来匿名分享文件给任何人。</p>
<h3><a href="#如何使用-onionshare"></a>如何使用 <strong>OnionShare</strong>？</h3>
<p>首先下载 <a href="https://onionshare.org/">OnionShare</a> 和 <a href="https://www.torproject.org/projects/torbrowser.html.en">Tor浏览器</a>。下载后安装它们。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/Icons.png"><img src="https://p0.ssl.qhimg.com/t0101fa9d6125f41b1e.png" alt="install onionshare and tor browser"></a></p>
<p>现在从开始菜单打开 OnionShare</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/Onion-Share.png"><img src="https://p0.ssl.qhimg.com/t014f99233b5af11af2.png" alt="onionshare share files anonymously"></a></p>
<p>点击添加并添加一个文件/文件夹共享。</p>
<p>点击开始分享。它会产生一个 .onion 网址，你可以与你的收件人分享这个网址。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/With-Link.png"><img src="https://p0.ssl.qhimg.com/t01e36c2db39bd2366a.png" alt="share file with onionshare anonymously"></a></p>
<p>从 URL 下载文件，复制 URL 并打开 Tor 浏览器并粘贴。打开 URL 并下载文件/文件夹。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/Tor.png"><img src="https://p0.ssl.qhimg.com/t01c1c2afa864ce2886.png" alt="receive file with onionshare anonymously"></a></p>
<h3><a href="#onionshare-的起源"></a>OnionShare 的起源</h3>
<p>几年前，Glenn Greenwald 发现他从 Edward Snowden 收到的一些 NSA 的文件已经被损坏。但他需要该文件，并决定通过使用 USB 获取那些文件。这并不成功。</p>
<p>在阅读了 Greenwald 写的书后，The Intercept 的安全专家 Micah Lee 发布了 OnionShare —— 一个简单的免费软件，可以匿名和安全地共享文件。他创建了一个程序，通过一个被匿名软件 Tor 加密和保护的直接通道来分享大型数据转储，使窃取者难以获取文件。</p>
<h3><a href="#onionshare-如何工作"></a>OnionShare 如何工作？</h3>
<p>OnionShare 在 127.0.0.1 上启动了一个 Web 服务器，用于在随机端口上共享文件。它从有 6880 个单词的单词列表中选择任意两个单词，称为 slug。它使服务器可以作为 Tor 洋葱服务发送文件。最终的 URL 看起来像这样：</p>
<pre><code class="hljs dts"><span class="hljs-symbol">http:</span><span class="hljs-comment">//qx2d7lctsnqwfdxh.onion/subside-durable</span>

</code></pre><p>OnionShare 在下载后关闭。有一个选项允许多次下载文件。这使得该文件在互联网上不能再次得到。</p>
<h3><a href="#使用-onionshare-好处"></a>使用 OnionShare 好处</h3>
<p>其他网站或程序可以访问你的文件：发件人使用 OnionShare 共享的文件不存储在任何服务器上。它直接托管在发件人的系统上。</p>
<p>没有人可以窥探共享文件：由于用户之间的连接是由洋葱服务和 Tor 浏览器加密的。这使得连接安全，很难窃取文件。</p>
<p>用户双方都是匿名的：OnionShare 和 Tor 浏览器使发件人和收件人匿名。</p>
<h3><a href="#结论"></a>结论</h3>
<p>在这篇文章中，我已经解释了如何<strong>匿名分享你的文档、文件</strong>。我也解释了它是如何工作的。希望你了解 OnionShare 是如何工作的，如果你对任何事情仍有疑问，只需留言。</p>
<hr>
<p>via: <a href="https://www.theitstuff.com/onionshare-share-files-anonymously-2">https://www.theitstuff.com/onionshare-share-files-anonymously-2</a></p>
<p>作者：<a href="https://www.theitstuff.com">Anirudh Rayapeddi</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
OnionShare：匿名共享文件

## 原文链接
[https://www.zcfy.cc/article/onionshare-share-files-anonymously](https://www.zcfy.cc/article/onionshare-share-files-anonymously)


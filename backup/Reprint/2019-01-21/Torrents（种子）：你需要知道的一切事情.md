---
title: 'Torrents（种子）：你需要知道的一切事情' 
date: 2019-01-21 2:30:06
hidden: true
slug: lp564ec6s7d
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#torrents种子你需要知道的一切事情"></a>Torrents（种子）：你需要知道的一切事情</h1>
<p><strong>Torrents（种子）</strong> — 每次听到这个词时，在我的脑海里想到的唯一的事情就是免费的电影、游戏、和被破解的软件。但是我们并不知道它们是如何工作的，在“种子”中涉及到各种概念。因此，通过这篇文章我们从技术的角度来了解<strong>种子下载</strong>是什么。</p>
<h3><a href="#种子是什么"></a>“种子”是什么？</h3>
<p>“种子”是一个到因特网上文件位置的链接。它们不是一个文件，它们仅仅是动态指向到你想去下载的原始文件上。</p>
<p>例如：如果你点击 <a href="https://www.google.com/chrome/">Google Chrome</a>，你可以从谷歌的服务器上下载 Google Chrome 浏览器。</p>
<p>如果你明天、或者下周、或者下个月再去点击那个链接，这个文件仍然可以从谷歌服务器上去下载。</p>
<p>但是当我们使用“种子”下载时，它并没有固定的服务器。文件是从以前使用“种子”下载的其它人的个人电脑上下载的。</p>
<h3><a href="#torrents-是如何工作的"></a>Torrents 是如何工作的？</h3>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/torrent_orig.png"><img src="https://p0.ssl.qhimg.com/t01fe9deea9a0d66818.png" alt="Peer to peer network"></a></p>
<p>假设 ‘A’ 上有一些视频，它希望以“种子”方式去下载。因此，他创建了一个“种子”，并将这个链接发送给 ‘B’，这个链接包含了那个视频在因特网上的准确 IP 地址的信息。因此，当 ‘B’ 开始下载那个文件的时候，‘B’ 连接到 ‘A’ 的计算机。在 ‘B’ 下载完成这个视频之后，‘B’ 将开始做为种子，也就是 ‘B’ 将允许其它的 ‘C’ 或者 ‘D’ 从 ‘B’ 的计算机上下载它。</p>
<p>因此每个人先下载文件然后会上传，下载的人越多，下载的速度也越快。并且在任何情况下，如果想停止上传，也没有问题，随时可以。这样做并不会成为什么问题，除非很多的人下载而上传的人很少。</p>
<h3><a href="#播种者和索取者"></a>播种者和索取者</h3>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/seeders_orig.png"><img src="https://p0.ssl.qhimg.com/t01984232a5d0fa194e.png" alt="kickass torrents website"></a></p>
<p>下载完成特定文件的用户将会即刻做为上传者，因此，可以被新用户下载的已下载者称为播种者。</p>
<p>而一些还没有完成特定文件的下载者，并且还正在下载的用户称为索取者。</p>
<h3><a href="#块"></a>块</h3>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/peers_orig.png"><img src="https://p0.ssl.qhimg.com/t0103dffe0801f28986.png" alt="qbittorrent software for linux"></a></p>
<p>所有的“种子”文件都独立分割成固定大小的数据包，因此，它们可以非线性顺序和随机顺序下载。每个块都有唯一的标识，因此，一旦所有的块下载完成之后，它们会被拼接出原始文件。</p>
<p>正是因为这种机制，如果你正在从某人处下载一个文件，假如这个时候因某些原因他停止了上传，你可以继续从其它的播种者处继续下载，而不需要从头开始重新下载。</p>
<h3><a href="#对端"></a>对端</h3>
<p>对端是指当前连接到你的索取者。一个正在上传的索取者，不论它下载了多少块，它就是一个对端。</p>
<p><strong>例如：</strong></p>
<p>一个已经下载了文件的前 50 个块的用户就是一个索取者，但是，他又同时上传这些文件，而你只有前 10 个块，因此，你可以从他那里下载最多 50 个块。这时候他就成了你的对端。</p>
<h3><a href="#最佳实践"></a>最佳实践</h3>
<p>当你下载一个“种子”时，总是选择最大的播种者。这就是最佳经验。</p>
<p>这里并没有最小的标准，但是只要确保你选择的是最大的那一个播种者就可以了。</p>
<h3><a href="#种子相关的法律"></a>“种子”相关的法律</h3>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/torrent-laws_orig.png"><img src="https://p0.ssl.qhimg.com/t01a51548fd59602ad9.png" alt="piracy is illegal"></a></p>
<p>“种子”相关的法律和其它的法律并没有什么区别，对受版权保护的其它任何东西一样，侵权行为会受到法律的制裁。大多数的政府都拦截“种子”站点和协议，但是“种子”下载本身并不是有害的东西。</p>
<p>“种子”对快速分享文件是非常有用的，并且它们被用来共享开源社区的软件，因为它们能节约大量的服务器资源。但是，许多人却因为盗版而使用它们。</p>
<h3><a href="#结束语"></a>结束语</h3>
<p>Torrenting 是降低服务器上负载的一个非常完美的技术。“种子”下载可以使我们将下载速度提升到网卡的极限，这是非常好的。但是，在这种非中心化的服务器上，盗版成为一种必然发生的事。限制我们分享的内容，从不去下载盗版的东西，这是我们的道德责任。</p>
<p>请在下面的评论中分享你使用“种子”的心得，分享你喜欢的、法律许可下载的“种子”网站。</p>
<hr>
<p>via: <a href="http://www.linuxandubuntu.com/home/torrents-everything-you-need-to-know">http://www.linuxandubuntu.com/home/torrents-everything-you-need-to-know</a></p>
<p>作者：<a href="http://www.linuxandubuntu.com">LINUXANDUBUNTU</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Torrents（种子）：你需要知道的一切事情

## 原文链接
[https://www.zcfy.cc/article/torrents-everything-you-need-to-know](https://www.zcfy.cc/article/torrents-everything-you-need-to-know)


---
title: '9 个提高系统运行速度的轻量级 Linux 应用' 
date: 2019-01-23 2:30:08
hidden: true
slug: oz38n2b0yo8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#9-个提高系统运行速度的轻量级-linux-应用"></a>9 个提高系统运行速度的轻量级 Linux 应用</h1>
<p><strong>简介：</strong> <a href="https://itsfoss.com/speed-up-ubuntu-1310/">加速 Ubuntu 系统</a>有很多方法，办法之一是使用轻量级应用来替代一些常用应用程序。我们之前之前发布过一篇 <a href="https://itsfoss.com/essential-linux-applications/">Linux 必备的应用程序</a>，如今将分享这些应用程序在 Ubuntu 或其他 Linux 发行版的轻量级替代方案。</p>
<p><a href="https://camo.githubusercontent.com/3305b7e2295e906508a87b4afa50242e3ab2c91e/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4c696768747765696768742d616c7465726e61746976652d6170706c69636174696f6e732d666f722d4c696e75782d383030783435302e6a7067"><img src="https://p5.ssl.qhimg.com/t01d29bf901fe88d158.jpg" alt="在 ubunt 使用轻量级应用程序替代方案"></a></p>
<h3><a href="#9-个常用-linux-应用程序的轻量级替代方案"></a>9 个常用 Linux 应用程序的轻量级替代方案</h3>
<p>你的 Linux 系统很慢吗？应用程序是不是很久才能打开？你最好的选择是使用<a href="https://itsfoss.com/lightweight-linux-beginners/">轻量级的 Linux 系统</a>。但是重装系统并非总是可行，不是吗？</p>
<p>所以如果你想坚持使用你现在用的 Linux 发行版，但是想要提高性能，你应该使用更轻量级应用来替代你一些常用的应用。这篇文章会列出各种 Linux 应用程序的轻量级替代方案。</p>
<p>由于我使用的是 Ubuntu，因此我只提供了基于 Ubuntu 的 Linux 发行版的安装说明。但是这些应用程序可以用于几乎所有其他 Linux 发行版。你只需去找这些轻量级应用在你的 Linux 发行版中的安装方法就可以了。</p>
<h3><a href="#1-midori-web-浏览器"></a>1. Midori： Web 浏览器</h3>
<p><a href="http://midori-browser.org/">Midori</a> 是与现代互联网环境具有良好兼容性的最轻量级网页浏览器之一。它是开源的，使用与 Google Chrome 最初所基于的相同的渲染引擎 —— WebKit。并且超快速，最小化但高度可定制。</p>
<p><a href="https://camo.githubusercontent.com/3caf536798ea2b077707a6c4605706c521ca1407/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4d69646f72692d383030783439372e706e67"><img src="https://p0.ssl.qhimg.com/t01589317d4e6c6f5bf.png" alt="Midori Browser"></a></p>
<p>Midori 浏览器有很多可以定制的扩展和选项。如果你有最高权限，使用这个浏览器也是一个不错的选择。如果在浏览网页的时候遇到了某些问题，请查看其网站上<a href="http://midori-browser.org/faqs/">常见问题</a>部分 -- 这包含了你可能遇到的常见问题及其解决方案。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-midori"></a>在基于 Ubuntu 的发行版上安装 Midori</h4>
<p>在 Ubuntu 上，可通过官方源找到 Midori 。运行以下指令即可安装它：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> midori

</code></pre><h3><a href="#2-trojita电子邮件客户端"></a>2. Trojita：电子邮件客户端</h3>
<p><a href="http://trojita.flaska.net/">Trojita</a> 是一款开源强大的 IMAP 电子邮件客户端。它速度快，资源利用率高。我可以肯定地称它是 <a href="https://itsfoss.com/best-email-clients-linux/">Linux 最好的电子邮件客户端之一</a>。如果你只需电子邮件客户端提供 IMAP 支持，那么也许你不用再进一步考虑了。</p>
<p><a href="https://camo.githubusercontent.com/b16d78c756ef19b22cf9d79b8c68061083ef56a0/687474703a2f2f74726f6a6974612e666c61736b612e6e65742f696d672f323031362d30332d32322d74726f6a6974612d686f6d652e706e67"><img src="https://p4.ssl.qhimg.com/t018eeeb39cea101b5c.png" alt="Trojitá"></a></p>
<p>Trojita 使用各种技术 —— 按需电子邮件加载、离线缓存、带宽节省模式等 —— 以实现其令人印象深刻的性能。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-trojita"></a>在基于 Ubuntu 的发行版上安装 Trojita</h4>
<p>Trojita 目前没有针对 Ubuntu 的官方 PPA 。但这应该不成问题。您可以使用以下命令轻松安装它:</p>
<pre><code class="hljs processing">sudo sh -c <span class="hljs-string">"echo 'deb http://download.opensuse.org/repositories/home:/jkt-gentoo:/trojita/xUbuntu_16.04/ /' &gt; /etc/apt/sources.list.d/trojita.list"</span>
wget http:<span class="hljs-comment">//download.opensuse.org/repositories/home:jkt-gentoo:trojita/xUbuntu_16.04/Release.key</span>
sudo apt-<span class="hljs-built_in">key</span> <span class="hljs-built_in">add</span> - &lt; Release.<span class="hljs-built_in">key</span>
sudo apt update
sudo apt install trojita

</code></pre><h3><a href="#3-gdebi包安装程序"></a>3. GDebi：包安装程序</h3>
<p>有时您需要快速安装 DEB 软件包。Ubuntu 软件中心是一个消耗资源严重的应用程序，仅用于安装 .deb 文件并不明智。</p>
<p>Gdebi 无疑是一款可以完成同样目的的漂亮工具，而它只有个极简的图形界面。</p>
<p><a href="https://camo.githubusercontent.com/54850b3cace15f2459cb02fb9ae1fb5db446e114/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f47446562692e706e67"><img src="https://p2.ssl.qhimg.com/t01ce3e8a0ec52539df.png" alt="GDebi"></a></p>
<p>GDebi 是完全轻量级的，完美无缺地完成了它的工作。你甚至应该<a href="https://itsfoss.com/gdebi-default-ubuntu-software-center/">让 Gdebi 成为 DEB 文件的默认安装程序</a>。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-gdebi"></a>在基于 Ubuntu 的发行版上安装 GDebi</h4>
<p>只需一行指令，你便可以在 Ubuntu 上安装 GDebi：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> gdebi

</code></pre><h3><a href="#4-app-grid软件中心"></a>4. App Grid：软件中心</h3>
<p>如果您经常在 Ubuntu 上使用软件中心搜索、安装和管理应用程序，则 <a href="http://www.appgrid.org/">App Grid</a> 是必备的应用程序。它是默认的 Ubuntu 软件中心最具视觉吸引力且速度最快的替代方案。</p>
<p><a href="https://camo.githubusercontent.com/2dfdbc3a991f05c8ab6c4d72af8bbba3bccc6ee5/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f417070477269642d383030783535332e706e67"><img src="https://p1.ssl.qhimg.com/t0122ef75029f6315ec.png" alt="App Grid"></a></p>
<p>App Grid 支持应用程序的评分、评论和屏幕截图。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-app-grid"></a>在基于 Ubuntu 的发行版上安装 App Grid</h4>
<p>App Grid 拥有 Ubuntu 的官方 PPA。使用以下指令安装 App Grid：</p>
<pre><code class="hljs smali">sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:appgrid/stable
sudo apt update
sudo apt install appgrid

</code></pre><h3><a href="#5-yarock音乐播放器"></a>5. Yarock：音乐播放器</h3>
<p><a href="https://seb-apps.github.io/yarock/">Yarock</a> 是一个优雅的音乐播放器，拥有现代而最轻量级的用户界面。尽管在设计上是轻量级的，但 Yarock 有一个全面的高级功能列表。</p>
<p><a href="https://camo.githubusercontent.com/4e98e0314cae0436fbc9cb37e766bdb79544cca7/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f5961726f636b2d383030783532392e706e67"><img src="https://p1.ssl.qhimg.com/t01ebd0d0a48c0ab20e.png" alt="Yarock"></a></p>
<p>Yarock 的主要功能包括多种音乐收藏、评级、智能播放列表、多种后端选项、桌面通知、音乐剪辑、上下文获取等。</p>
<h3><a href="#在基于-ubuntu-的发行版上安装-yarock"></a>在基于 Ubuntu 的发行版上安装 Yarock</h3>
<p>您得通过 PPA 使用以下指令在 Ubuntu 上安装 Yarock：</p>
<pre><code class="hljs smali">sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:nilarimogard/webupd8
sudo apt update
sudo apt install yarock

</code></pre><h3><a href="#6-vlc视频播放器"></a>6. VLC：视频播放器</h3>
<p>谁不需要视频播放器？谁还从未听说过 <a href="http://www.videolan.org/index.html">VLC</a>？我想并不需要对它做任何介绍。</p>
<p><a href="https://camo.githubusercontent.com/6fd0dd76f9bb8ae98e945854fe6a92398f0c8e4c/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f564c432d383030783532362e706e67"><img src="https://p0.ssl.qhimg.com/t01c55497e12fc8645d.png" alt="VLC"></a></p>
<p>VLC 能满足你在 Ubuntu 上播放各种媒体文件的全部需求，而且它非常轻便。它甚至可以在非常旧的 PC 上完美运行。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-vlc"></a>在基于 Ubuntu 的发行版上安装 VLC</h4>
<p>VLC 为 Ubuntu 提供官方 PPA。可以输入以下命令来安装它：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> vlc

</code></pre><h3><a href="#7-pcmanfm文件管理器"></a>7. PCManFM：文件管理器</h3>
<p>PCManFM 是 LXDE 的标准文件管理器。与 LXDE 的其他应用程序一样，它也是轻量级的。如果您正在为文件管理器寻找更轻量级的替代品，可以尝试使用这个应用。</p>
<p><a href="https://camo.githubusercontent.com/71bce80fca77628cdd54e9f7b61abf513a3de844/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f50434d616e464d2e706e67"><img src="https://p1.ssl.qhimg.com/t016d31ed9d2cc627d4.png" alt="PCManFM"></a></p>
<p>尽管来自 LXDE，PCManFM 也同样适用于其他桌面环境。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-pcmanfm"></a>在基于 Ubuntu 的发行版上安装 PCManFM</h4>
<p>在 Ubuntu 上安装 PCManFM 只需要一条简单的指令：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> pcmanfm

</code></pre><h3><a href="#8-mousepad文本编辑器"></a>8. Mousepad：文本编辑器</h3>
<p>在轻量级方面，没有什么可以击败像 nano、vim 等命令行文本编辑器。但是，如果你想要一个图形界面，你可以尝试一下 Mousepad -- 一个最轻量级的文本编辑器。它非常轻巧，速度非常快。带有简单的可定制的用户界面和多个主题。</p>
<p><a href="https://camo.githubusercontent.com/4bc6bf52d60e67b7b95ebb99108cade8a6ef0a3b/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4d6f7573657061642e706e67"><img src="https://p3.ssl.qhimg.com/t0162aaf848c67f4098.png" alt="Mousepad"></a></p>
<p>Mousepad 支持语法高亮显示。所以，你也可以使用它作为基础的代码编辑器。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-mousepad"></a>在基于 Ubuntu 的发行版上安装 Mousepad</h4>
<p>想要安装 Mousepad ，可以使用以下指令：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> mousepad

</code></pre><h3><a href="#9-gnome-office办公软件"></a>9. GNOME Office：办公软件</h3>
<p>许多人需要经常使用办公应用程序。通常，大多数办公应用程序体积庞大且很耗资源。Gnome Office 在这方面非常轻便。Gnome Office 在技术上不是一个完整的办公套件。它由不同的独立应用程序组成，在这之中 AbiWord＆Gnumeric 脱颖而出。</p>
<p><strong>AbiWord</strong> 是文字处理器。它比其他替代品轻巧并且快得多。但是这样做是有代价的 —— 你可能会失去宏、语法检查等一些功能。AdiWord 并不完美，但它可以满足你基本的需求。</p>
<p><a href="https://camo.githubusercontent.com/7f1b9d8d395329b143f20cc8a1e14a6f2c771860/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f416269576f72642d383030783632362e706e67"><img src="https://p2.ssl.qhimg.com/t0166db8928ce95d862.png" alt="AbiWord"></a></p>
<p><strong>Gnumeric</strong> 是电子表格编辑器。就像 AbiWord 一样，Gnumeric 也非常快速，提供了精确的计算功能。如果你正在寻找一个简单轻便的电子表格编辑器，Gnumeric 已经能满足你的需求了。</p>
<p><a href="https://camo.githubusercontent.com/cd29f5e11bcac0e4a9c64accdee08ef212e2e5f6/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f476e756d657269632d383030783437302e706e67"><img src="https://p0.ssl.qhimg.com/t01803a3f90dbe707c1.png" alt="Gnumeric"></a></p>
<p>在 <a href="https://gnome.org/gnome-office/">Gnome Office</a> 下面还有一些其它应用程序。你可以在官方页面找到它们。</p>
<h4><a href="#在基于-ubuntu-的发行版上安装-abiwordgnumeric"></a>在基于 Ubuntu 的发行版上安装 AbiWord＆Gnumeric</h4>
<p>要安装 AbiWord＆Gnumeric，只需在终端中输入以下指令：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> abiword gnumeric

</code></pre><hr>
<p>via: <a href="https://itsfoss.com/lightweight-alternative-applications-ubuntu/">https://itsfoss.com/lightweight-alternative-applications-ubuntu/</a></p>
<p>作者：<a href="https://itsfoss.com/author/munif/">Munif Tanjim</a> 译者：<a href="https://github.com/imquanquan">imquanquan</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
9 个提高系统运行速度的轻量级 Linux 应用

## 原文链接
[https://www.zcfy.cc/article/9-lightweight-linux-applications-to-speed-up-your-system](https://www.zcfy.cc/article/9-lightweight-linux-applications-to-speed-up-your-system)


---
title: 'WattOS：一个稳如磐石、快如闪电、面向所有人的轻量级 Linux 发行版' 
date: 2019-01-31 2:31:16
hidden: true
slug: rfe7raqg58o
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#wattos一个稳如磐石快如闪电面向所有人的轻量级-linux-发行版"></a>WattOS：一个稳如磐石、快如闪电、面向所有人的轻量级 Linux 发行版</h1>
<p><em>Jack Wallen 将介绍一下是什么让 WattOS 这么特别。 <a href="https://www.linux.com/licenses/category/used-permission">使用许可</a></em></p>
<p>Linux 领域里的每个人不是听说过就是使用过某个轻量级的 Linux 发行版。大家都知道我们不断追求的是：占用内存少，配置资源要求低，包含一个轻量级的桌面环境（或者窗口管理器），并且提供和其他发行版相似的桌面布局，把赌注押在相同的需求之上。</p>
<p>这种发行版大多用来工作。有一个可以击垮很多轻量级 Linux 发行版的问题，它们没有真正含有一般用户完成工作需要的工具。结果就是，它们沦落为用来完成特殊任务（像数据恢复、做信息亭等）。</p>
<p>在某种程度上，WattOS 陷入了同样的困境（它唯一含有的生产力工具是 PDF 阅读器，而且它使用标准的“任务栏/开始菜单”象征桌面）。然而幸运的是，WattOS 通过难以置信的运行速度、稳定性以及内置新立得包管理器弥补了这些缺点；所以，WattOS 可以很容易的成为一个适合所有人的轻量级 Linux 发行版。</p>
<p>到底是什么让 WattOS 如此特别，让我们一起一探究竟。</p>
<h3><a href="#内核"></a>内核</h3>
<p>事实上当我发现 WattOS 基于 kernel 4.4 内核时我非常吃惊。升级系统之后，执行 <code>uname -r</code> 命令可以看到是 4.4.0-38-generic。鉴于这个发行版的目的是让老旧和运行卡顿的机器重获新生，它和我的 Elementary OS Loki 发行版内置相同版本的内核真是一个可爱的惊喜。这意味着 WattOS 在新旧硬件上都会有良好的工作表现。</p>
<p>真正的惊喜不止于此，当你去 WattOS 的网站，你会同时发现 32 位和 64 位版本的下载地址（现在大多数新的发行版都倾向于放弃 32 位发行版本）。所以，不仅系统内核对新式硬件提供支持，而且系统发行版本的多种架构也能让那些老式的 32 位机器重获新生。</p>
<h3><a href="#运行速度"></a>运行速度</h3>
<p>当安装上 WattOS 的时候，有那么一刻我对它有纯粹的羡慕。WattOS 的运行速度快的令人难以置信。甚至当它的桌面版作为客户机在 VirtualBox 虚拟机平台工作时，运行速度依然远远超过了我的 Elementary OS Loki 桌面发行版。后来我才了解到当时运行的宿主机是 <a href="https://system76.com/desktops/leopard">System76 Leopard</a>，配置有水冷装置的 i7 处理器和 16GB 的运行内存。分配给 WattOS 大约 2G 的内存，让它看起来没有什么任务可以拖慢它。WattOS 的运行速度壮观的令人难以诉说，它越来越成熟了。我从没见过火狐浏览器能打开的这么快。</p>
<p>接下来说说 LibreOffice 应用的启动。由于想测试 LibreOffice 的启动速度，所以我打开了新立得软件包管理器，计划安装这一开源办公软件套件的佼佼者。</p>
<p>无果。</p>
<p>安装 LibreOffice 的主要问题是缺少一个依赖软件包 python3-uno，而且无论怎么尝试都无法安装成功。然而，最后我在 <a href="https://www.libreoffice.org/">LibreOffice 官方网站</a> 上下载了 deb 格式的软件包。把下载的文件解压之后，<code>cd</code> 到 LibreOffice_5.2.2.2_Linux_x86-64_deb/DEBS/ 目录下，最后通过执行 <code>sudo dpkg -i *.deb</code> 命令成功的安装好了 LibreOffice。</p>
<p>LibreOffice 运行的怎么样呢？速度快到要疯了。值得再提的是，我从没见过这个应用能像在 WattOS 上运行的这么快。点击 LibreOffice Writer 的图标，它花费的时间是在 Elementary OS Loki （已经很快了）主机上花费的一半。</p>
<h3><a href="#桌面"></a>桌面</h3>
<p>我个人偏爱于桌面向更加现代化的趋势进行迭代。我是 Ubuntu 的 Unity 桌面，GNOME 3 桌面，以及（特别是） <a href="https://elementary.io/">Elementary OS</a> 的粉丝。所以使用古老风格桌面的主意意味着对我几乎没有吸引力。即便如此，WattOS 在把现代设计风格融入老式设计时做的非常好。举例来说，默认的桌面主题（图 1）。WattOS 的 UI 设计者巧妙设计了桌面主题，所以它没有完全偏离 Windows XP 或者老式 Linux CDE 风格的窗口管理器的设计理念。</p>
<p><a href="https://camo.githubusercontent.com/875cfe1f40b91368048279013285e57914db2b63/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f776174746f735f612e706e673f69746f6b3d6561766d6b56674c"><img src="https://p3.ssl.qhimg.com/t012a4f4068d95e98dd.png" alt="WattOS"></a></p>
<p><em>图 1：WattOS 的文件管理器展示了有些现代化的主题 <a href="https://www.linux.com/licenses/category/used-permission">使用许可</a></em></p>
<p>关于 WattOS 的桌面（基于 <a href="http://lxde.org/">LXDE</a>）的确有一些要说的但以前从来没说过，就是每个拥有像简洁、直接，有足够灵活度和自定义度这些特点的 Linux 桌面版，对每个使用过 Windows 95 的电脑使用者来说都会很熟悉。</p>
<h3><a href="#惊喜之处优点和缺点"></a>惊喜之处，优点和缺点</h3>
<p>正像每个新的 Linux 桌面版的体验那样，WattOS 有让人惊喜的地方，同时也有优点和缺点。首先，说说优点。</p>
<p>WattOS 除了绝对的速度（用一个简单的 “WOW” 来评论），还在桌面上固定了一些特别的惊喜（大多数都是预置的应用）。额外的软件中最好的是 <a href="https://www.keepassx.org/">KeePassX</a>（一个极少被默认包含在桌面版的应用）。我认为密码管理器应该默认安装在每一个电脑桌面上，值得骄傲的是 WattOS 预装了这个杰出的工具。</p>
<p>下一个讨论的是预装火狐浏览器。许多轻量级的发行版会预装像 <a href="http://surf.suckless.org/">Surf</a> 或者 <a href="http://midori-browser.org/">Midori</a> 这样的浏览器。这两个浏览器都不错，但是它们的兼容性经常达不到像谷歌文档这样网站的要求。因为 WattOS 含有成熟的火狐浏览器，你会发现该系统的功能在火狐浏览器兼容的网站上表现的很完美。</p>
<p>最后，算不上好的意外。正如我已经提到的，在安装 LibreOffice 时马上就有了故障。然而安装像 GIMP 这样的软件就很顺利（所以我认为这是偶然问题）。除了这一个问题，我觉得默认桌面菜单有些混乱。例如，新立得软件包管理器放在个性化菜单里。我更愿在主菜单中突出显示项中看到它，并且加上类似“软件安装”（或任何其他新用户容易理解）的标签。从我的视角来说，个性化菜单项应该用于放置配置该平台各种风格的工具，而不是安装软件的工具。</p>
<p>除此之外，若想在 WattOS 主攻方向上的找茬的话，特别是你要找一个面对老旧硬件 Linux 发行版时，你会发现这非常困难。</p>
<h3><a href="#结论"></a>结论</h3>
<p>尽管 WattOS 主要为老旧硬件设计，但你完全可以把它运行在现代桌面电脑上，并且会运行的很好。根据零学习曲线，你很快就会熟悉 WattOS，并发现它运行极快而且稳定。试试这个小排量的 Linux 发行版吧，相信它会给你同样深刻的印象。如果你发现 WattOS 运行的不够快（发生了一些我没有预料到的事），你完全可以去使用 <a href="http://planetwatt.com/new/index.php/2016/09/23/microwatt-r10-released/">Microwatt</a>（一个更轻的轻量级发行版）。</p>
<hr>
<p>via: <a href="https://www.linux.com/learn/wattos-rock-solid-lightning-fast-lightweight-linux-distro-all">https://www.linux.com/learn/wattos-rock-solid-lightning-fast-lightweight-linux-distro-all</a></p>
<p>作者：<a href="https://www.linux.com/users/jlwallen">JACK WALLEN</a> 译者：<a href="https://github.com/fuowang">fuowang</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WattOS：一个稳如磐石、快如闪电、面向所有人的轻量级 Linux 发行版

## 原文链接
[https://www.zcfy.cc/article/wattos-a-rock-solid-lightning-fast-lightweight-linux-distro-for-all](https://www.zcfy.cc/article/wattos-a-rock-solid-lightning-fast-lightweight-linux-distro-for-all)


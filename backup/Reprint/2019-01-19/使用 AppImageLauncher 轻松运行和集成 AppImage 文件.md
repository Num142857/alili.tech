---
title: '使用 AppImageLauncher 轻松运行和集成 AppImage 文件' 
date: 2019-01-19 2:30:10
hidden: true
slug: xyxahwqu05s
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-appimagelauncher-轻松运行和集成-appimage-文件"></a>使用 AppImageLauncher 轻松运行和集成 AppImage 文件</h1>
<p>你有没有下载过 AppImage 文件，而你不知道如何使用它？或许你可能知道如何使用它，但是你每次要运行它时必须要进入到下载了该 .AppImage 的文件夹中来运行它，或者手动为其创建启动程序。</p>
<p>使用 AppImageLauncher，这些就都是过去的问题。该程序可让你轻松运行 AppImage 文件，而无需使其可执行。但它最有趣的特点是可以轻松地将 AppImage 与你的系统进行整合：AppImageLauncher 可以自动将 AppImage 程序快捷方式添加到桌面环境的程序启动器/菜单（包括程序图标和合适的说明）中。</p>
<p>这 里有个例子，我想在 Ubuntu 上使用 <a href="https://kdenlive.org/download/">Kdenlive</a>，但我不想从仓库中安装它，因为它有大量的 KDE 依赖，我不想把它们弄到我的 Gnome 系统中。因为没有它的 Flatpak 或 Snap 镜像，我只能去下载了 Kdenlive 的 AppImage。</p>
<p>在没有把下载的 <a href="https://kdenlive.org/download/">Kdenline</a> AppImage 变成可执行的情况下，我第一次双击它时（安装好了 AppImageLauncher），AppImageLauncher 提供了两个选项：</p>
<p>“Run once”或者“Integrate and run”。</p>
<p><a href="https://camo.githubusercontent.com/60e352789a37c8ab641f9b6a5dcf10f82c81e78f/68747470733a2f2f332e62702e626c6f6773706f742e636f6d2f2d6b314f34426c33777577552f5773383277777a764577492f4141414141414141414c6f2f6d54436d6e457a46706d736d4f7a304278483641534f58497163356a7036334d77434c63424741732f73313630302f617070696d6167656c61756e636865725f312e706e67"><img src="https://p0.ssl.qhimg.com/t01e3feedf1c4b0268e.png" alt=""></a></p>
<p>点击 “Integrate and run”，这个 AppImage 就被复制到 <code>~/.bin/</code> （家目录中的隐藏文件夹）并添加到菜单中，然后启动该程序。</p>
<p>要删除它也很简单，只要您使用的桌面环境支持桌面动作就行。例如，在 Gnome Shell 中，只需右键单击“活动概览”中的应用程序图标，然后选择“Remove from system”：</p>
<p><a href="https://camo.githubusercontent.com/7a07b95811b36ad020e7bdecd375413ac697398a/68747470733a2f2f312e62702e626c6f6773706f742e636f6d2f2d2d594f4e4d4b396d4a794d2f5773383235485a437063492f4141414141414141414c732f544a793949564f6a41306b6c4d557148514d4f64757365724d546a6d66545f7467434c63424741732f73313630302f617070696d6167656c61756e636865722d72656d6f76652d6170702e706e67"><img src="https://p0.ssl.qhimg.com/t01a584507cbac5d64c.png" alt=""></a></p>
<p>更新：该应用只初步为 Ubuntu 和 Mint 做了开发，但它最近会提供 Debian、 Netrunner 和 openSUSE 支持。本文首次发布后添加的另一个功能是支持 AppImage 的更新；你在启动器中可以找到 “Update AppImage”。</p>
<h3><a href="#下载-appimagelauncher"></a>下载 AppImageLauncher</h3>
<p>AppImageLauncher 支持 Ubuntu、 Debian、Netrunner 和 openSUSE。如果你使用 Ubuntu 18.04，请确保你下载的 deb 包的名字中有“bionic”，而其它的 deb 是用于旧一些的 Ubuntu 版本的。</p>
<ul>
<li><a href="https://github.com/TheAssassin/AppImageLauncher/releases">下载 AppImageLauncher</a></li>
</ul>
<hr>
<p>via: <a href="https://www.linuxuprising.com/2018/04/easily-run-and-integrate-appimage-files.html">https://www.linuxuprising.com/2018/04/easily-run-and-integrate-appimage-files.html</a></p>
<p>作者：<a href="https://plus.google.com/118280394805678839070">Logix</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 AppImageLauncher 轻松运行和集成 AppImage 文件

## 原文链接
[https://www.zcfy.cc/article/easily-run-and-integrate-appimage-files-with-appimagelauncher](https://www.zcfy.cc/article/easily-run-and-integrate-appimage-files-with-appimagelauncher)


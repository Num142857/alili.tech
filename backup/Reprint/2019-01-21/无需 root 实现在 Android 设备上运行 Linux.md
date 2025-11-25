---
title: '无需 root 实现在 Android 设备上运行 Linux' 
date: 2019-01-21 2:30:06
hidden: true
slug: pg9k6wj3u6
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#无需-root-实现在-android-设备上运行-linux"></a>无需 root 实现在 Android 设备上运行 Linux</h1>
<p>曾经，我尝试过搜索一种简单的可以在 Android 上运行 Linux 的方法。我当时唯一的意图只是想使用 Linux 以及一些基本的应用程序，比如 SSH，Git，awk 等。要求的并不多！我不想 root 我的 Android 设备。我有一台平板电脑，主要用于阅读电子书、新闻和少数 Linux 博客。除此之外也不怎么用它了。因此我决定用它来实现一些 Linux 的功能。在 Google Play 商店上浏览了几分钟后，一个应用程序瞬间引起了我的注意，勾起了我实验的欲望。如果你也想在 Android 设备上运行 Linux，这个应用可能会有所帮助。</p>
<h3><a href="#termux---在-android-和-chrome-os-上运行的-android-终端模拟器"></a>Termux - 在 Android 和 Chrome OS 上运行的 Android 终端模拟器</h3>
<p><strong>Termux</strong> 是一个 Android 终端模拟器以及提供 Linux 环境的应用程序。跟许多其他应用程序不同，你无需 root 设备也无需进行设置。它是开箱即用的！它会自动安装好一个最基本的 Linux 系统，当然你也可以使用 APT 软件包管理器来安装其他软件包。总之，你可以让你的 Android 设备变成一台袖珍的 Linux 电脑。它不仅适用于 Android，你还能在 Chrome OS 上安装它。</p>
<p><a href="https://camo.githubusercontent.com/cb861f44411ca131cf2e070cdd272bd1ecd9622e/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f7465726d75782e706e67"><img src="https://p0.ssl.qhimg.com/t0185aa481fa935f2de.png" alt=""></a></p>
<p>Termux 提供了许多重要的功能，比您想象的要多。</p>
<ul>
<li>它允许你通过 openSSH 登录远程服务器。</li>
<li>你还能够从远程系统 SSH 到 Android 设备中。</li>
<li>使用 rsync 和 curl 将您的智能手机通讯录同步到远程系统。</li>
<li>支持不同的 shell，比如 BASH、ZSH，以及 FISH 等等。</li>
<li>可以选择不同的文本编辑器来编辑/查看文件，支持 Emacs、Nano 和 Vim。</li>
<li>使用 APT 软件包管理器在 Android 设备上安装你想要的软件包。支持 Git、Perl、Python、Ruby 和 Node.js 的最新版本。</li>
<li>可以将 Android 设备与蓝牙键盘、鼠标和外置显示器连接起来，就像是整合在一起的设备一样。Termux 支持键盘快捷键。</li>
<li>Termux 支持几乎所有 GNU/Linux 命令。</li>
</ul>
<p>此外通过安装插件可以启用其他一些功能。例如，<strong>Termux：API</strong> 插件允许你访问 Android 和 Chrome 的硬件功能。其他有用的插件包括：</p>
<ul>
<li>Termux：Boot - 设备启动时运行脚本</li>
<li>Termux：Float - 在浮动窗口中运行 Termux</li>
<li>Termux：Styling - 提供配色方案和支持 Powerline 的字体来定制 Termux 终端的外观。</li>
<li>Termux：Task - 提供一种从任务栏类的应用中调用 Termux 可执行文件的简易方法。</li>
<li>Termux：Widget - 提供一种从主屏幕启动小脚本的建议方法。</li>
</ul>
<p>要了解更多有关 termux 的信息，请长按终端上的任意位置并选择“帮助”菜单选项来打开内置的帮助部分。它唯一的缺点就是<strong>需要 Android 5.0 及更高版本</strong>。如果它支持 Android 4.x 和旧版本的话，将会更有用的多。你可以在 <strong>Google Play 商店</strong>和 <strong>F-Droid</strong> 中找到并安装 Termux。</p>
<p>要在 Google Play 商店中安装 Termux，点击下面按钮。</p>
<p><a href="https://play.google.com/store/apps/details?id=com.termux"><img src="https://p0.ssl.qhimg.com/t019485c0a10e7b344c.png" alt=""></a></p>
<p>若要在 F-Droid 中安装，则点击下面按钮。</p>
<p><a href="https://f-droid.org/packages/com.termux/"><img src="https://p0.ssl.qhimg.com/t0157ed2522e4ba2efd.png" alt=""></a></p>
<p>你现在知道如何使用 Termux 在 Android 设备上使用 Linux 了。你有用过其他更好的应用吗？请在下面留言框中留言。我很乐意也去尝试他们！</p>
<p>此致敬礼！</p>
<p>相关资源：</p>
<ul>
<li><a href="https://termux.com/">Termux 官网</a></li>
</ul>
<hr>
<p>via: <a href="https://www.ostechnix.com/termux-run-linux-android-devices-no-rooting-required/">https://www.ostechnix.com/termux-run-linux-android-devices-no-rooting-required/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
无需 root 实现在 Android 设备上运行 Linux

## 原文链接
[https://www.zcfy.cc/article/run-linux-on-android-devices-no-rooting-required](https://www.zcfy.cc/article/run-linux-on-android-devices-no-rooting-required)


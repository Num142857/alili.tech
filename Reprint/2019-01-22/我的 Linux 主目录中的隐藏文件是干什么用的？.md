---
title: '我的 Linux 主目录中的隐藏文件是干什么用的？' 
date: 2019-01-22 2:30:07
hidden: true
slug: mp18c7w80r9
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#我的-linux-主目录中的隐藏文件是干什么用的"></a>我的 Linux 主目录中的隐藏文件是干什么用的？</h1>
<p>在 Linux 系统中，你可能会在主目录中存储了大量文件和文件夹。但在这些文件之外，你知道你的主目录还附带了很多隐藏的文件和文件夹吗？如果你在主目录中运行 <code>ls -a</code>，你会发现一堆带有点前缀的隐藏文件和目录。这些隐藏的文件到底做了什么？</p>
<h3><a href="#在主目录中隐藏的文件是干什么用的"></a>在主目录中隐藏的文件是干什么用的?</h3>
<p><a href="https://camo.githubusercontent.com/ce996fd2ba11198116ff5746364520e8affabcfb/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f30362f68696464656e2d66696c65732d6c69756e75782d322e706e67"><img src="https://p0.ssl.qhimg.com/t0117fe93afb8e7b4ba.png" alt="hidden-files-liunux-2" title="hidden-files-liunux-2"></a></p>
<p>通常，主目录中的隐藏文件和目录包含该用户程序访问的设置或数据。它们不打算让用户编辑，只需要应用程序进行编辑。这就是为什么它们被隐藏在用户的正常视图之外。</p>
<p>通常，删除和修改自己主目录中的文件不会损坏操作系统。然而，依赖这些隐藏文件的应用程序可能不那么灵活。从主目录中删除隐藏文件时，通常会丢失与其关联的应用程序的设置。</p>
<p>依赖该隐藏文件的程序通常会重新创建它。 但是，你将从“开箱即用”设置开始，如全新用户一般。如果你在使用应用程序时遇到问题，那实际上可能是一个巨大的帮助。它可以让你删除可能造成麻烦的自定义设置。但如果你不这样做，这意味着你需要把所有的东西都设置成原来的样子。</p>
<h3><a href="#主目录中某些隐藏文件的特定用途是什么"></a>主目录中某些隐藏文件的特定用途是什么？</h3>
<p><a href="https://camo.githubusercontent.com/7bf2e6d256d67123b356fb9bd6eabd1177c3c23d/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f30362f68696464656e2d66696c65732d6c696e75782d332e706e67"><img src="https://p0.ssl.qhimg.com/t0130a5cb2b813ab768.png" alt="hidden-files-linux-3" title="hidden-files-linux-3"></a></p>
<p>每个人在他们的主目录中都会有不同的隐藏文件。每个人都有一些。但是，无论应用程序如何，这些文件都有类似的用途。</p>
<h4><a href="#系统设置"></a>系统设置</h4>
<p>系统设置包括桌面环境和 shell 的配置。</p>
<ul>
<li>shell 和命令行程序的<strong>配置文件</strong>：根据你使用的特定 shell 和类似命令的应用程序，特定的文件名称会变化。你会看到 <code>.bashrc</code>、<code>.vimrc</code> 和 <code>.zshrc</code>。这些文件包含你已经更改的有关 shell 的操作环境的任何设置，或者对 <code>vim</code> 等命令行实用工具的设置进行的调整。删除这些文件将使关联的应用程序返回到其默认状态。考虑到许多 Linux 用户多年来建立了一系列微妙的调整和设置，删除这个文件可能是一个非常头疼的问题。</li>
<li><strong>用户配置文件</strong>：像上面的配置文件一样，这些文件（通常是 <code>.profile</code> 或 <code>.bash_profile</code>）保存 shell 的用户设置。该文件通常包含你的 <code>PATH</code> 环境变量。它还包含你设置的<a href="https://www.maketecheasier.com/making-the-linux-command-line-a-little-friendlier/#aliases">别名</a>。用户也可以在 <code>.bashrc</code> 或其他位置放置别名。<code>PATH</code> 环境变量控制着 shell 寻找可执行命令的位置。通过添加或修改 <code>PATH</code>，可以更改 shell 的命令查找位置。别名更改了原有命令的名称。例如：一个别名可能将 <code>ls -l</code> 设置为 <code>ll</code>。这为经常使用的命令提供基于文本的快捷方式。如果删除 <code>.profile</code> 文件，通常可以在 <code>/etc/skel</code> 目录中找到默认版本。</li>
<li><strong>桌面环境设置</strong>：这里保存你的桌面环境的任何定制。其中包括桌面背景、屏幕保护程序、快捷键、菜单栏和任务栏图标以及用户针对其桌面环境设置的其他任何内容。当你删除这个文件时，用户的环境会在下一次登录时恢复到新的用户环境。</li>
</ul>
<h4><a href="#应用配置文件"></a>应用配置文件</h4>
<p>你会在 Ubuntu 的 <code>.config</code> 文件夹中找到它们。 这些是针对特定应用程序的设置。 它们将包含喜好列表和设置等内容。</p>
<ul>
<li><strong>应用程序的配置文件</strong>：这包括应用程序首选项菜单中的设置、工作区配置等。 你在这里找到的具体取决于应用程序。</li>
<li><strong>Web 浏览器数据</strong>：这可能包括书签和浏览历史记录等内容。这些文件大部分是缓存。这是 Web 浏览器临时存储下载文件（如图片）的地方。删除这些内容可能会降低你首次访问某些媒体网站的速度。</li>
<li><strong>缓存</strong>：如果用户应用程序缓存仅与该用户相关的数据（如 <a href="https://www.maketecheasier.com/clear-spotify-cache/">Spotify 应用程序存储播放列表的缓存</a>），则主目录是存储该目录的默认地点。 这些缓存可能包含大量数据或仅包含几行代码：这取决于应用程序需要什么。 如果你删除这些文件，则应用程序会根据需要重新创建它们。</li>
<li><strong>日志</strong>：一些用户应用程序也可能在这里存储日志。根据开发人员设置应用程序的方式，你可能会发现存储在你的主目录中的日志文件。然而，这不是一个常见的选择。</li>
</ul>
<h3><a href="#结论"></a>结论</h3>
<p>在大多数情况下，你的 Linux 主目录中的隐藏文件用于存储用户设置。 这包括命令行程序以及基于 GUI 的应用程序的设置。删除它们将删除用户设置。 通常情况下，它不会导致程序被破坏。</p>
<hr>
<p>via: <a href="https://www.maketecheasier.com/hidden-files-linux-home-directory/">https://www.maketecheasier.com/hidden-files-linux-home-directory/</a></p>
<p>作者：<a href="https://www.maketecheasier.com/author/alexfox/">Alexander Fox</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的 Linux 主目录中的隐藏文件是干什么用的？

## 原文链接
[https://www.zcfy.cc/article/what-are-the-hidden-files-in-my-linux-home-directory-for](https://www.zcfy.cc/article/what-are-the-hidden-files-in-my-linux-home-directory-for)


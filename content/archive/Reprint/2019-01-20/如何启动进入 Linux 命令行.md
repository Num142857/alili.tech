---
title: '如何启动进入 Linux 命令行' 
date: 2019-01-20 2:30:11
hidden: true
slug: c7dhm9t8ega
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何启动进入-linux-命令行"></a>如何启动进入 Linux 命令行</h1>
<p>可能有时候你启动 Linux 时需要或者希望不使用 GUI（图形用户界面），也就是没有 X，而是选择命令行。不管是什么原因，幸运的是，直接启动进入 Linux 命令行 非常简单。它需要在其他内核选项之后对引导参数进行简单的更改。此更改将系统引导到指定的运行级别。</p>
<h3><a href="#为什么要这样做"></a>​为什么要这样做？</h3>
<p>如果你的系统由于无效配置或者显示管理器损坏或任何可能导致 GUI 无法正常启动的情况而无法运行 Xorg，那么启动到命令行将允许你通过登录到终端进行故障排除（假设你知道要怎么做），并能做任何你需要做的东西。引导到命令行也是一个很好的熟悉终端的方式，不然，你也可以为了好玩这么做。</p>
<h3><a href="#访问-grub-菜单"></a>​访问 GRUB 菜单</h3>
<p>在启动时，你需要访问 GRUB 启动菜单。如果在每次启动计算机时菜单未设置为显示，那么可能需要在系统启动之前按住 <code>SHIFT</code> 键。在菜单中，需要选择 Linux 发行版条目。高亮显示后该条目，按下 <code>e</code> 编辑引导参数。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/gnu-grub_orig.png"><img src="http://p0.qhimg.com/t0141f1cb191e44134c.png" alt="zorin os grub menu"></a></p>
<p>较老的 GRUB 版本遵循类似的机制。启动管理器应提供有关如何编辑启动参数的说明。</p>
<h3><a href="#指定运行级别"></a>​​指定运行级别</h3>
<p>​会出现一个编辑器，你将看到 GRUB 会解析给内核的选项。移动到以 <code>linux</code> 开头的行（旧的 GRUB 版本可能是 <code>kernel</code>，选择它并按照说明操作）。这指定了要解析给内核的参数。在该行的末尾（可能会出现跨越多行，具体取决于你的终端分辨率），只需指定要引导的运行级别，即 <code>3</code>（多用户模式，纯文本）。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/runlevel_orig.png"><img src="http://p0.qhimg.com/t019bbfd623f9114736.png" alt="customize grub menu"></a></p>
<p>按下 <code>Ctrl-X</code> 或 <code>F10</code> 将使用这些参数启动系统。开机和以前一样。唯一改变的是启动的运行级别。</p>
<p>这是启动后的页面：</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/runlevel_1_orig.png"><img src="http://p0.qhimg.com/t016086d11d671d9d82.png" alt="boot linux in command line"></a></p>
<h3><a href="#运行级别"></a>运行级别</h3>
<p>你可以指定不同的运行级别，默认运行级别是 <code>5</code> （多用户图形界面）。<code>1</code> 启动到“单用户”模式，它会启动进入 root shell。<code>3</code> 提供了一个多用户命令行系统。</p>
<h3><a href="#从命令行切换"></a>从命令行切换</h3>
<p>在某个时候，你可能想要运行显示管理器来再次使用 GUI，最快的方法是运行这个：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo init 5</span>

</code></pre><p>就这么简单。就我个人而言，我发现命令行比使用 GUI 工具更令人兴奋和上手。不过，这只是我的个人偏好。</p>
<hr>
<p>via: <a href="http://www.linuxandubuntu.com/home/how-to-boot-into-linux-command-line">http://www.linuxandubuntu.com/home/how-to-boot-into-linux-command-line</a></p>
<p>作者：<a href="http://www.linuxandubuntu.com">LinuxAndUbuntu</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何启动进入 Linux 命令行

## 原文链接
[https://www.zcfy.cc/article/how-to-boot-into-linux-command-line](https://www.zcfy.cc/article/how-to-boot-into-linux-command-line)


---
title: '在 Linux 中查看你的时区' 
date: 2019-02-15 2:30:44
hidden: true
slug: khv1dtplc5s
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-中查看你的时区"></a>在 Linux 中查看你的时区</h1>
<p>在这篇短文中，我们将向你简单介绍几种 Linux 下查看系统时区的简单方法。在 Linux 机器中，尤其是生产服务器上的时间管理技能，是在系统管理中一个极其重要的方面。</p>
<p>Linux 包含多种可用的时间管理工具，比如 <code>date</code> 或 <code>timedatectlcommands</code>，你可以用它们来获取当前系统时区，也可以<a href="http://www.tecmint.com/install-ntp-server-in-centos/">将系统时间与 NTP 服务器同步</a>，来自动地、更精确地进行时间管理。</p>
<p>好，我们一起来看几种查看我们的 Linux 系统时区的不同方法。</p>
<h3><a href="#1我们从使用传统的-date-命令开始"></a>1、我们从使用传统的 <code>date</code> 命令开始</h3>
<p>使用下面的命令，来看一看我们的当前时区：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> date</span>

</code></pre><p>或者，你也可以使用下面的命令。其中 <code>%Z</code> 格式可以输出字符形式的时区，而 <code>%z</code> 输出数字形式的时区：</p>
<pre><code class="hljs mel">$ <span class="hljs-keyword">date</span> +”%Z %z”

</code></pre><p><a href="https://camo.githubusercontent.com/f73077c9b9131f46e462df9eb61cc290828cf474/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31302f46696e642d4c696e75782d54696d657a6f6e652e706e67"><img src="https://p2.ssl.qhimg.com/t0151c431c8a5f89613.png" alt="Find Linux Timezone"></a></p>
<p><em>查看 Linux 时区</em></p>
<p>注意：<code>date</code> 的手册页中包含很多输出格式，你可以利用它们，来替换你的 <code>date</code> 命令的输出内容：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man date</span>

</code></pre><h3><a href="#2接下来你同样可以用-timedatectl-命令"></a>2、接下来，你同样可以用 <code>timedatectl</code> 命令</h3>
<p>当你不带任何参数运行它时，这条命令可以像下图一样，输出系统时间概览，其中包含当前时区：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> timedatectl</span>

</code></pre><p>然后，你可以在命令中提供一条管道，然后用 <a href="http://www.tecmint.com/12-practical-examples-of-linux-grep-command/">grep 命令</a> 来像下面一样，只过滤出时区信息：</p>
<pre><code class="hljs coq">$ timedatectl | <span class="hljs-type">grep</span> “<span class="hljs-keyword">Time</span> zone”

</code></pre><p><a href="https://camo.githubusercontent.com/d34c921f84a8688e8465313cec000b2a908c5a67/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31302f46696e642d43757272656e742d4c696e75782d54696d657a6f6e652e706e67"><img src="https://p2.ssl.qhimg.com/t0138c9060ed10803f6.png" alt="Find Current Linux Timezone"></a></p>
<p><em>查看当前 Linux 时区</em></p>
<p>同样，我们可以学习如何使用 timedatectl 来<a href="http://www.tecmint.com/set-time-timezone-and-synchronize-time-using-timedatectl-command/">设置 Linux 时区</a>。</p>
<p>###3、进一步，显示文件 /etc/timezone 的内容</p>
<p>使用 <a href="http://www.tecmint.com/13-basic-cat-command-examples-in-linux/">cat 工具</a>显示文件 <code>/etc/timezone</code> 的内容，来查看你的时区：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cat /etc/timezone</span>

</code></pre><p><a href="https://camo.githubusercontent.com/e4d5040c1eb85109be15e89210ace4aa5cfe0028/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31302f436865636b2d54696d657a6f6e652d6f662d4c696e75782e706e67"><img src="https://p5.ssl.qhimg.com/t01f6819e291d4e43c7.png" alt="Check Timezone of Linux"></a></p>
<p><em>在 Linux 中查看时区</em></p>
<p>对于 RHEL/CentOS/Fedora 用户，这里还有一条可以起到同样效果的命令：</p>
<pre><code class="hljs routeros">$ grep ZONE /etc/sysconfig<span class="hljs-built_in">/clock
</span>
</code></pre><p>就这些了！别忘了在下面的反馈栏中分享你对于这篇文章中的看法。重要的是：你应该通过这篇 Linux 时区管理指南来学习更多系统时间管理的知识，因为它含有很多易于操作的实例。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/check-linux-timezone">http://www.tecmint.com/check-linux-timezone</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/StdioA">StdioA</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 中查看你的时区

## 原文链接
[https://www.zcfy.cc/article/how-to-check-timezone-in-linux](https://www.zcfy.cc/article/how-to-check-timezone-in-linux)


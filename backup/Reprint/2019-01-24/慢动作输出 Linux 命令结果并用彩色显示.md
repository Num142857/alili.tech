---
title: '慢动作输出 Linux 命令结果并用彩色显示' 
date: 2019-01-24 2:30:11
hidden: true
slug: a6v5q6rx65w
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#慢动作输出-linux-命令结果并用彩色显示"></a>慢动作输出 Linux 命令结果并用彩色显示</h1>
<p>本篇中，我们会展示一个很酷及简单的方法在屏幕中显示彩色的输出，并且可以为了某个原因减慢输出的速度。</p>
<p><a href="https://linux.cn/article-5798-1.html">lolcat 命令</a>可以满足上面的需求。它基本上通过与 <a href="http://www.tecmint.com/13-basic-cat-command-examples-in-linux/">cat 命令</a>类似的方式将文件或标准输入定向到标准输出来运行，覆盖某个命令的默认屏幕输出颜色，并为其添加彩色。</p>
<h3><a href="#如何在-linux-中安装-lolcat-程序"></a>如何在 Linux 中安装 lolcat 程序</h3>
<p>lolcat 可以在大多数现代 Linux 发行版的默认仓库中得到，但是可用的版本有点老。你可以使用下面的指导来从 git 仓库中安装最新的 lolcat 版本。</p>
<ul>
<li><a href="https://linux.cn/article-5798-1.html">安装 lolcat 来在 Linux 中显示彩色输出</a></li>
</ul>
<p>lolcat 安装后，基本的 lolcat 语法是：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> lolcat [<span class="hljs-keyword">options</span>] [<span class="hljs-keyword">files</span>] ...

</code></pre><p>有几个选项可以控制它的行为，下面是一些我们在本指导中会强调的几个最重要的标志：</p>
<ol>
<li><code>-a</code> - 将每行输出都显示动态效果。</li>
<li><code>-d</code> – 指定动画效果间隔（显示下一行之前的帧），默认是 12。</li>
<li><code>-s</code> – 它指定了动画效果的速度（帧速-每秒的显示帧数），默认是 20。</li>
<li><code>-f</code> – 强制显示彩色以防止标准输出不是 tty。</li>
</ol>
<p>你可以在 lolcat 的 man 页可以找到更多的选项：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man lolcat </span>

</code></pre><h3><a href="#如何在-linux-中使用-lolcat"></a>如何在 Linux 中使用 lolcat</h3>
<p>要使用 lolcat，直接将相关命令的输出通过管道给 lolcat，即可见证魔法。</p>
<p>比如：</p>
<pre><code class="hljs coq">$ ls -l | <span class="hljs-type">lolcat</span> -<span class="hljs-built_in">as</span> <span class="hljs-number">25</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Colorful-Linux-Terminal-Output.gif"><img src="https://p2.ssl.qhimg.com/t01d5e8667cf8131812.gif" alt="colorful Linux Terminal Output"></a></p>
<p>除此之外你也可以改变默认速度，在下面的命令中，我们会使用一个相对较慢的速度，每秒显示 10 帧：</p>
<pre><code class="hljs coq">$ ls -l | <span class="hljs-type">lolcat</span> -<span class="hljs-built_in">as</span> <span class="hljs-number">10</span>

</code></pre><p>你可以使用任何命令结合 lolcat 在 Linux 终端中输出彩色结果，比如 <code>ps</code>、<code>date</code> 和 <code>cal</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ps | lolcat</span>
<span class="hljs-meta">$</span><span class="bash"> date | lolcat</span>
<span class="hljs-meta">$</span><span class="bash"> cal | lolcat</span>

</code></pre><p>本篇中，我们了解了如何显著降低屏幕输出的速度，并显示彩色效果。</p>
<p>通常上，你可以在下面的评论栏中留下任何关于本篇的问题或评论。最后，你可以留下任何你发现的有用命令。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/add-colors-to-command-output-terminal-linux/">http://www.tecmint.com/add-colors-to-command-output-terminal-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
慢动作输出 Linux 命令结果并用彩色显示

## 原文链接
[https://www.zcfy.cc/article/add-rainbow-colors-to-linux-command-output-in-slow-motion](https://www.zcfy.cc/article/add-rainbow-colors-to-linux-command-output-in-slow-motion)


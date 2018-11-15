---
title: Linux 中一种友好的 find 替代工具
hidden: true
categories: reprint
slug: b14f61b5
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#linux-中一种友好的-find-替代工具"></a>Linux 中一种友好的 find 替代工具</h1>
<blockquote>
<p>fd 命令提供了一种简单直白的搜索 Linux 文件系统的方式。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/2dffbd409955679283aefd332bb944c138a9e40d/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f66696e642d66696c652d6c696e75782d636f64655f6d61676e696679696e675f676c6173735f7a65726f2e706e673f69746f6b3d4532486f50446730"><img src="https://p0.ssl.qhimg.com/t01c256aef046099597.png" alt=""></a></p>
<p><a href="https://github.com/sharkdp/fd">fd</a> 是一个超快的，基于 <a href="https://www.rust-lang.org/en-US/">Rust</a> 的 Unix/Linux <code>find</code> 命令的替代品。它不提供所有 <code>find</code> 的强大功能。但是，它确实提供了足够的功能来覆盖你可能遇到的 80％ 的情况。诸如良好的规划和方便的语法、彩色输出、智能大小写、正则表达式以及并行命令执行等特性使 <code>fd</code> 成为一个非常有能力的后继者。</p>
<h3><a href="#安装"></a>安装</h3>
<p>进入 <a href="https://github.com/sharkdp/fd">fd</a> GitHub 页面，查看安装部分。它涵盖了如何在<a href="https://en.wikipedia.org/wiki/MacOS">macOS</a>、 <a href="https://www.ubuntu.com/community/debian">Debian/Ubuntu</a> <a href="https://www.redhat.com/en">Red Hat</a> 和 <a href="https://www.archlinux.org/">Arch Linux</a> 上安装程序。安装完成后，你可以通过运行帮助来获得所有可用命令行选项的完整概述，通过 <code>fd -h</code> 获取简明帮助，或者通过 <code>fd --help</code> 获取更详细的帮助。</p>
<h3><a href="#简单搜索"></a>简单搜索</h3>
<p><code>fd</code> 旨在帮助你轻松找到文件系统中的文件和文件夹。你可以用 <code>fd</code> 带上一个参数执行最简单的搜索，该参数就是你要搜索的任何东西。例如，假设你想要找一个 Markdown 文档，其中包含单词 <code>services</code> 作为文件名的一部分：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fd services</span>
downloads/services.md

</code></pre><p>如果仅带一个参数调用，那么 <code>fd</code> 递归地搜索当前目录以查找与莫的参数匹配的任何文件和/或目录。使用内置的 <code>find</code> 命令的等效搜索如下所示：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> find . -name <span class="hljs-string">'services'</span></span>
downloads/services.md

</code></pre><p>如你所见，<code>fd</code> 要简单得多，并需要更少的输入。在我心中用更少的输入做更多的事情总是对的。</p>
<h3><a href="#文件和文件夹"></a>文件和文件夹</h3>
<p>您可以使用 <code>-t</code> 参数将搜索范围限制为文件或目录，后面跟着代表你要搜索的内容的字母。例如，要查找当前目录中文件名中包含 <code>services</code> 的所有文件，可以使用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fd -tf services</span>
downloads/services.md

</code></pre><p>以及，找到当前目录中文件名中包含 <code>services</code> 的所有目录：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fd -td services</span>
applications/services
library/services

</code></pre><p>如何在当前文件夹中列出所有带 <code>.md</code> 扩展名的文档？</p>
<pre><code class="hljs stylus">$ fd <span class="hljs-selector-class">.md</span>
administration/administration<span class="hljs-selector-class">.md</span>
development/elixir/elixir_install<span class="hljs-selector-class">.md</span>
readme<span class="hljs-selector-class">.md</span>
sidebar<span class="hljs-selector-class">.md</span>
linux<span class="hljs-selector-class">.md</span>

</code></pre><p>从输出中可以看到，<code>fd</code> 不仅可以找到并列出当前文件夹中的文件，还可以在子文件夹中找到文件。很简单。</p>
<p>你甚至可以使用 <code>-H</code> 参数来搜索隐藏文件：</p>
<pre><code class="hljs stylus">fd -H sessions .
<span class="hljs-selector-class">.bash_sessions</span>

</code></pre><h3><a href="#指定目录"></a>指定目录</h3>
<p>如果你想搜索一个特定的目录，这个目录的名字可以作为第二个参数传给 <code>fd</code>：</p>
<pre><code class="hljs groovy">$ fd passwd /etc
<span class="hljs-regexp">/etc/</span><span class="hljs-keyword">default</span>/passwd
<span class="hljs-regexp">/etc/</span>pam.d/passwd
<span class="hljs-regexp">/etc/</span>passwd

</code></pre><p>在这个例子中，我们告诉 <code>fd</code> 我们要在 <code>etc</code> 目录中搜索 <code>passwd</code> 这个单词的所有实例。</p>
<h3><a href="#全局搜索"></a>全局搜索</h3>
<p>如果你知道文件名的一部分，但不知道文件夹怎么办？假设你下载了一本关于 Linux 网络管理的书，但你不知道它的保存位置。没有问题：</p>
<pre><code class="hljs routeros">fd Administration /
/Users/pmullins/Documents/Books/Linux/Mastering Linux<span class="hljs-built_in"> Network </span>Administration.epub

</code></pre><h3><a href="#总结"></a>总结</h3>
<p><code>fd</code> 是 <code>find</code> 命令的极好的替代品，我相信你会和我一样发现它很有用。要了解该命令的更多信息，只需浏览手册页。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/6/friendly-alternative-find">https://opensource.com/article/18/6/friendly-alternative-find</a></p>
<p>作者：<a href="https://opensource.com/users/pmullins">Patrick H. Mullins</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [Linux 中一种友好的 find 替代工具](https://www.zcfy.cc/article/a-friendly-alternative-to-the-find-tool-in-linux)
原文标题: Linux 中一种友好的 find 替代工具
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

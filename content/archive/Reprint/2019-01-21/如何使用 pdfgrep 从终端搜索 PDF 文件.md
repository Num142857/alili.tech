---
title: '如何使用 pdfgrep 从终端搜索 PDF 文件' 
date: 2019-01-21 2:30:06
hidden: true
slug: vaysdy6e31e
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-pdfgrep-从终端搜索-pdf-文件"></a>如何使用 pdfgrep 从终端搜索 PDF 文件</h1>
<p>诸如 <a href="https://www.maketecheasier.com/what-is-grep-and-uses/">grep</a> 和 <a href="https://www.maketecheasier.com/ack-a-better-grep/">ack-grep</a> 之类的命令行工具对于搜索匹配指定<a href="https://www.maketecheasier.com/the-beginner-guide-to-regular-expressions/">正则表达式</a>的纯文本非常有用。但是你有没有试过使用这些工具在 PDF 中搜索？不要这么做！由于这些工具无法读取PDF文件，因此你不会得到任何结果。它们只能读取纯文本文件。</p>
<p>顾名思义，<a href="https://pdfgrep.org/">pdfgrep</a> 是一个可以在不打开文件的情况下搜索 PDF 中的文本的小命令行程序。它非常快速 —— 比几乎所有 PDF 浏览器提供的搜索更快。<code>grep</code> 和 <code>pdfgrep</code> 的最大区别在于 <code>pdfgrep</code> 对页进行操作，而 <code>grep</code> 对行操作。<code>grep</code> 如果在一行上找到多个匹配项，它也会多次打印单行。让我们看看如何使用该工具。</p>
<h3><a href="#安装"></a>安装</h3>
<p>对于 Ubuntu 和其他基于 Ubuntu 的 Linux 发行版来说，这非常简单：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> pdfgrep

</code></pre><p>对于其他发行版，只要在<a href="https://www.maketecheasier.com/install-software-in-various-linux-distros/">包管理器</a>里输入 “pdfgrep” 查找，它就应该能够安装它。万一你想浏览其代码，你也可以查看项目的 <a href="https://gitlab.com/pdfgrep/pdfgrep">GitLab 页面</a>。</p>
<h3><a href="#测试运行"></a>测试运行</h3>
<p>现在你已经安装了这个工具，让我们去测试一下。<code>pdfgrep</code> 命令采用以下格式：</p>
<pre><code class="hljs accesslog">pdfgrep <span class="hljs-string">[OPTION...]</span> PATTERN <span class="hljs-string">[FILE...]</span>

</code></pre><ul>
<li><p><code>OPTION</code> 是一个额外的属性列表，给出诸如 <code>-i</code> 或 <code>--ignore-case</code> 这样的命令，这两者都会忽略匹配正则中的大小写。</p>
</li>
<li><p><code>PATTERN</code> 是一个扩展正则表达式。</p>
</li>
<li><p><code>FILE</code> 如果它在相同的工作目录就是文件的名称，或文件的路径。</p>
</li>
</ul>
<p>我对 Python 3.6 官方文档运行该命令。下图是结果。</p>
<p><a href="https://camo.githubusercontent.com/4a0bce4ecd4f10c3bc25ab4875e690d0dc840301/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f31312f706466677265702d73637265656e73686f742e706e67"><img src="https://p0.ssl.qhimg.com/t016d304e77ee4ec911.png" alt="pdfgrep search" title="pdfgrep search"></a></p>
<p>红色高亮显示所有遇到单词 “queue” 的地方。在命令中加入 <code>-i</code> 选项将会匹配单词 “Queue”。请记住，当加入 <code>-i</code> 时，大小写并不重要。</p>
<h3><a href="#其它"></a>其它</h3>
<p><code>pdfgrep</code> 有相当多的有趣的选项。不过，我只会在这里介绍几个。</p>
<ul>
<li><code>-c</code> 或者 <code>--count</code>：这会抑制匹配的正常输出。它只显示在文件中遇到该单词的次数，而不是显示匹配的长输出。</li>
<li><code>-p</code> 或者 <code>--page-count</code>：这个选项打印页面上匹配的页码和页面上的该匹配模式出现次数。</li>
<li><code>-m</code> 或者 <code>--max-count</code> [number]：指定匹配的最大数目。这意味着当达到匹配次数时，该命令停止读取文件。</li>
</ul>
<p>所支持的选项的完整列表可以在 man 页面或者 <code>pdfgrep</code> 在线<a href="https://pdfgrep.org/doc.html">文档</a>中找到。如果你在批量处理一些文件，不要忘记，<code>pdfgrep</code> 可以同时搜索多个文件。可以通过更改 <code>GREP_COLORS</code> 环境变量来更改默认的匹配高亮颜色。</p>
<h3><a href="#总结"></a>总结</h3>
<p>下一次你想在 PDF 中搜索一些东西。请考虑使用 <code>pdfgrep</code>。该工具会派上用场，并且节省你的时间。</p>
<hr>
<p>via: <a href="https://www.maketecheasier.com/search-pdf-files-pdfgrep/">https://www.maketecheasier.com/search-pdf-files-pdfgrep/</a></p>
<p>作者：<a href="https://www.maketecheasier.com">Bruno Edoh</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 pdfgrep 从终端搜索 PDF 文件

## 原文链接
[https://www.zcfy.cc/article/how-to-search-pdf-files-from-the-terminal-with-pdfgrep](https://www.zcfy.cc/article/how-to-search-pdf-files-from-the-terminal-with-pdfgrep)


---
title: '使用 groff 编写 man 手册页' 
date: 2019-01-21 2:30:06
hidden: true
slug: 5greqjtll8g
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-groff-编写-man-手册页"></a>使用 groff 编写 man 手册页</h1>
<p><code>groff</code> 是大多数 Unix 系统上所提供的流行的文本格式化工具 nroff/troff 的 GNU 版本。它一般用于编写手册页，即命令、编程接口等的在线文档。在本文中，我们将给你展示如何使用 <code>groff</code> 编写你自己的 man 手册页。</p>
<p>在 Unix 系统上最初有两个文本处理系统：troff 和 nroff，它们是由贝尔实验室为初始的 Unix 所开发的（事实上，开发 Unix 系统的部分原因就是为了支持这样的一个文本处理系统）。这个文本处理器的第一个版本被称作 roff（意为 “runoff”——径流）；稍后出现了 troff，在那时用于为特定的排字机Typesetter生成输出。nroff 是更晚一些的版本，它成为了各种 Unix 系统的标准文本处理器。groff 是 nroff 和 troff 的 GNU 实现，用在 Linux 系统上。它包括了几个扩展功能和一些打印设备的驱动程序。</p>
<p><code>groff</code> 能够生成文档、文章和书籍，很多时候它就像是其它的文本格式化系统（如 TeX）的血管一样。然而，<code>groff</code>（以及原来的 nroff）有一个固有的功能是 TeX 及其变体所缺乏的：生成普通 ASCII 输出。其它的系统在生成打印的文档方面做得很好，而 <code>groff</code> 却能够生成可以在线浏览的普通 ASCII（甚至可以在最简单的打印机上直接以普通文本打印）。如果要生成在线浏览的文档以及打印的表单，<code>groff</code> 也许是你所需要的（虽然也有替代品，如 Texinfo、Lametex 等等）。</p>
<p><code>groff</code> 还有一个好处是它比 TeX 小很多；它所需要的支持文件和可执行程序甚至比最小化的 TeX 版本都少。</p>
<p><code>groff</code> 一个特定的用途是用于格式化 Unix 的 man 手册页。如果你是一个 Unix 程序员，你肯定需要编写和生成各种 man 手册页。在本文中，我们将通过编写一个简短的 man 手册页来介绍 <code>groff</code> 的使用。</p>
<p>像 TeX 一样，<code>groff</code> 使用特定的文本格式化语言来描述如何处理文本。这种语言比 TeX 之类的系统更加神秘一些，但是更加简洁。此外，<code>groff</code> 在基本的格式化器之上提供了几个宏软件包；这些宏软件包是为一些特定类型的文档所定制的。举个例子， mgs 宏对于写作文章或论文很适合，而 man 宏可用于 man 手册页。</p>
<h3><a href="#编写-man-手册页"></a>编写 man 手册页</h3>
<p>用 <code>groff</code> 编写 man 手册页十分简单。要让你的 man 手册页看起来和其它的一样，你需要从源头上遵循几个惯例，如下所示。在这个例子中，我们将为一个虚构的命令 <code>coffee</code> 编写 man 手册页，它用于以各种方式控制你的联网咖啡机。</p>
<p>使用任意文本编辑器，输入如下代码，并保存为 <code>coffee.man</code>。不要输入每行的行号，它们仅用于本文中的说明。</p>
<pre><code class="hljs livescript">.TH COFFEE <span class="hljs-number">1</span> <span class="hljs-string">"23 March 94"</span>
.SH NAME
coffee <span class="hljs-string">\-</span> Control remote coffee machine
.SH SYNOPSIS
<span class="hljs-string">\fBcoffee\fP</span> [ -h | -b ] [ -t <span class="hljs-string">\fItype\fP</span> ]
<span class="hljs-string">\fIamount\fP</span>
.SH DESCRIPTION
<span class="hljs-string">\fBcoffee\fP</span> queues a request <span class="hljs-keyword">to</span> the remote
coffee machine at the device <span class="hljs-string">\fB/dev/cf0\fR.</span>
The required <span class="hljs-string">\fIamount\fP</span> argument specifies
the number <span class="hljs-keyword">of</span> cups, generally between <span class="hljs-number">0</span> <span class="hljs-keyword">and</span>
<span class="hljs-number">12</span> <span class="hljs-literal">on</span> ISO standard coffee machines.
.SS Options
.TP
<span class="hljs-string">\fB-h\fP</span>
Brew hot coffee. Cold <span class="hljs-keyword">is</span> the <span class="hljs-keyword">default</span>.
.TP
<span class="hljs-string">\fB-b\fP</span>
Burn coffee. Especially useful <span class="hljs-keyword">when</span> executing
<span class="hljs-string">\fBcoffee\fP</span> <span class="hljs-literal">on</span> behalf <span class="hljs-keyword">of</span> your boss.
.TP
<span class="hljs-string">\fB-t</span> <span class="hljs-string">\fItype\fR</span>
Specify the type <span class="hljs-keyword">of</span> coffee <span class="hljs-keyword">to</span> brew, where
<span class="hljs-string">\fItype\fP</span> <span class="hljs-keyword">is</span> one <span class="hljs-keyword">of</span> <span class="hljs-string">\fBcolumbian\fP,</span>
<span class="hljs-string">\fBregular\fP,</span> <span class="hljs-keyword">or</span> <span class="hljs-string">\fBdecaf\fP.</span>
.SH FILES
.TP
<span class="hljs-string">\fC/dev/cf0\fR</span>
The remote coffee machine device
.SH <span class="hljs-string">"SEE ALSO"</span>
milk(<span class="hljs-number">5</span>), sugar(<span class="hljs-number">5</span>)
.SH BUGS
May <span class="hljs-built_in">require</span> human intervention <span class="hljs-keyword">if</span> coffee
supply <span class="hljs-keyword">is</span> exhausted.

</code></pre><p><em>清单 1：示例 man 手册页源文件</em></p>
<p>不要让这些晦涩的代码吓坏了你。字符串序列 <code>\fB</code>、<code>\fI</code> 和 <code>\fR</code> 分别用来改变字体为粗体、斜体和正体（罗马字体）。<code>\fP</code> 设置字体为前一个选择的字体。</p>
<p>其它的 <code>groff</code> 请求request以点（<code>.</code>）开头出现在行首。第 1 行中，我们看到的 <code>.TH</code> 请求用于设置该 man 手册页的标题为 <code>COFFEE</code>、man 的部分为 <code>1</code>、以及该 man 手册页的最新版本的日期。（说明，man 手册的第 1 部分用于用户命令、第 2 部分用于系统调用等等。使用 <code>man man</code> 命令了解各个部分）。</p>
<p>在第 2 行，<code>.SH</code> 请求用于标记一个节section的开始，并给该节名称为 <code>NAME</code>。注意，大部分的 Unix man 手册页依次使用 <code>NAME</code>、 <code>SYNOPSIS</code>、<code>DESCRIPTION</code>、<code>FILES</code>、<code>SEE ALSO</code>、<code>NOTES</code>、<code>AUTHOR</code> 和 <code>BUGS</code> 等节，个别情况下也需要一些额外的可选节。这只是编写 man 手册页的惯例，并不强制所有软件都如此。</p>
<p>第 3 行给出命令的名称，并在一个横线（<code>-</code>）后给出简短描述。在 <code>NAME</code> 节使用这个格式以便你的 man 手册页可以加到 whatis 数据库中——它可以用于 <code>man -k</code> 或 <code>apropos</code> 命令。</p>
<p>第 4-6 行我们给出了 <code>coffee</code> 命令格式的大纲。注意，斜体 <code>\fI...\fP</code> 用于表示命令行的参数，可选参数用方括号扩起来。</p>
<p>第 7-12 行给出了该命令的摘要介绍。粗体通常用于表示程序或文件的名称。</p>
<p>在 13 行，使用 <code>.SS</code> 开始了一个名为 <code>Options</code> 的子节。</p>
<p>接着第 14-25 行是选项列表，会使用参数列表样式表示。参数列表中的每一项以 <code>.TP</code> 请求来标记；<code>.TP</code> 后的行是参数，再之后是该项的文本。例如，第 14-16 行：</p>
<pre><code class="hljs livescript">.TP
<span class="hljs-string">\fB-h\P</span>
Brew hot coffee. Cold <span class="hljs-keyword">is</span> the <span class="hljs-keyword">default</span>.

</code></pre><p>将会显示如下：</p>
<pre><code class="hljs actionscript">-h     Brew hot coffee. Cold <span class="hljs-keyword">is</span> the <span class="hljs-keyword">default</span>.

</code></pre><p>第 26-29 行创建该 man 手册页的 <code>FILES</code> 节，它用于描述该命令可能使用的文件。可以使用 <code>.TP</code> 请求来表示文件列表。</p>
<p>第 30-31 行，给出了 <code>SEE ALSO</code> 节，它提供了其它可以参考的 man 手册页。注意，第 30 行的 <code>.SH</code> 请求中 <code>"SEE ALSO"</code> 使用括号扩起来，这是因为 <code>.SH</code> 使用第一个空格来分隔该节的标题。任何超过一个单词的标题都需要使用引号扩起来成为一个单一参数。</p>
<p>最后，第 32-34 行，是 <code>BUGS</code> 节。</p>
<h3><a href="#格式化和安装-man-手册页"></a>格式化和安装 man 手册页</h3>
<p>为了在你的屏幕上查看这个手册页格式化的样式，你可以使用如下命令：</p>
<pre><code class="hljs stata">$ groff -Tascii -<span class="hljs-keyword">man</span> coffee.<span class="hljs-keyword">man</span> | <span class="hljs-keyword">more</span>

</code></pre><p><code>-Tascii</code> 选项告诉 <code>groff</code> 生成普通 ASCII 输出；<code>-man</code> 告诉 <code>groff</code> 使用 man 手册页宏集合。如果一切正常，这个 man 手册页显示应该如下。</p>
<pre><code class="hljs routeros">COFFEE(1)                                               COFFEE(1)
NAME
       coffee - Control remote coffee machine
SYNOPSIS
       coffee [ -h | -b ] [ -t<span class="hljs-built_in"> type </span>] amount
DESCRIPTION
       coffee  queues  a  request <span class="hljs-keyword">to</span> the remote coffee machine at
       the device /dev/cf0\. The required amount  argument  speci-
       fies the number of cups, generally between 0 <span class="hljs-keyword">and</span> 12 on ISO
       standard coffee machines.
   Options
       -h     Brew hot coffee. Cold is the default.
       -b     Burn coffee. Especially useful when executing  cof-
              fee on behalf of your boss.
       -t<span class="hljs-built_in"> type
</span>              Specify  the <span class="hljs-built_in"> type </span>of coffee <span class="hljs-keyword">to</span> brew, where<span class="hljs-built_in"> type </span>is
              one of columbian, regular, <span class="hljs-keyword">or</span> decaf.
FILES
       /dev/cf0
              The remote coffee machine device
SEE ALSO
       milk(5), sugar(5)
BUGS
       May  require  human  intervention  <span class="hljs-keyword">if</span>  coffee  supply   is
       exhausted.

</code></pre><p><em>格式化的 man 手册页</em></p>
<p>如之前提到过的，<code>groff</code> 能够生成其它类型的输出。使用 <code>-Tps</code> 选项替代 <code>-Tascii</code> 将会生成 PostScript 输出，你可以将其保存为文件，用 GhostView 查看，或用一个 PostScript 打印机打印出来。<code>-Tdvi</code> 会生成设备无关的 .dvi 输出，类似于 TeX 的输出。</p>
<p>如果你希望让别人在你的系统上也可以查看这个 man 手册页，你需要安装这个 groff 源文件到其它用户的 <code>%MANPATH</code> 目录里面。标准的 man 手册页放在 <code>/usr/man</code>。第一部分的 man 手册页应该放在 <code>/usr/man/man1</code> 下，因此，使用命令：</p>
<pre><code class="hljs awk">$ cp coffee.man <span class="hljs-regexp">/usr/m</span>an<span class="hljs-regexp">/man1/</span>coffee.<span class="hljs-number">1</span>

</code></pre><p>这将安装该 man 手册页到 <code>/usr/man</code> 中供所有人使用（注意使用 <code>.1</code> 扩展名而不是 <code>.man</code>）。当接下来执行 <code>man coffee</code> 命令时，该 man 手册页会被自动重新格式化，并且可查看的文本会被保存到 <code>/usr/man/cat1/coffee.1.Z</code> 中。</p>
<p>如果你不能直接复制 man 手册页的源文件到 <code>/usr/man</code>（比如说你不是系统管理员），你可创建你自己的 man 手册页目录树，并将其加入到你的 <code>%MANPATH</code>。<code>%MANPATH</code> 环境变量的格式同 <code>%PATH</code> 一样，举个例子，要添加目录 <code>/home/mdw/man</code> 到 <code>%MANPATH</code> ，只需要：</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">export</span> <span class="hljs-attribute">MANPATH</span>=/home/mdw/man:$MANPATH

</code></pre><p><code>groff</code> 和 man 手册页宏还有许多其它的选项和格式化命令。找到它们的最好办法是查看 <code>/usr/lib/groff</code> 中的文件； <code>tmac</code> 目录包含了宏文件，自身通常会包含其所提供的命令的文档。要让 <code>groff</code> 使用特定的宏集合，只需要使用 <code>-m macro</code> （或 <code>-macro</code>） 选项。例如，要使用 mgs 宏，使用命令：</p>
<pre><code class="hljs gams"><span class="hljs-function"><span class="hljs-title">groff</span></span> -Tascii -mgs <span class="hljs-keyword">files</span>...

</code></pre><p><code>groff</code> 的 man 手册页对这个选项描述了更多细节。</p>
<p>不幸的是，随同 <code>groff</code> 提供的宏集合没有完善的文档。第 7 部分的 man 手册页提供了一些，例如，<code>man 7 groff_mm</code> 会给你 mm 宏集合的信息。然而，该文档通常只覆盖了在 <code>groff</code> 实现中不同和新功能，而假设你已经了解过原来的 nroff/troff 宏集合（称作 DWB：the Documentor's Work Bench）。最佳的信息来源或许是一本覆盖了那些经典宏集合细节的书。要了解更多的编写 man 手册页的信息，你可以看看 man 手册页源文件（<code>/usr/man</code> 中），并通过它们来比较源文件的输出。</p>
<p>这篇文章是《Running Linux》 中的一章，由 Matt Welsh 和 Lar Kaufman 著，奥莱理出版（ISBN 1-56592-100-3）。在本书中，还包括了 Linux 下使用的各种文本格式化系统的教程。这期的《Linux Journal》中的内容及《Running Linux》应该可以给你提供在 Linux 上使用各种文本工具的良好开端。</p>
<h3><a href="#祝好撰写快乐"></a>祝好，撰写快乐！</h3>
<p>Matt Welsh （<a href="mailto:mdw@cs.cornell.edu">mdw@cs.cornell.edu</a>）是康奈尔大学的一名学生和系统程序员，在机器人和视觉实验室从事于时时机器视觉研究。</p>
<hr>
<p>via: <a href="http://www.linuxjournal.com/article/1158">http://www.linuxjournal.com/article/1158</a></p>
<p>作者：<a href="http://www.linuxjournal.com/user/800006">Matt Welsh</a> 译者：<a href="https://github.com/wxy">wxy</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 groff 编写 man 手册页

## 原文链接
[https://www.zcfy.cc/article/writing-man-pages-using-groff](https://www.zcfy.cc/article/writing-man-pages-using-groff)


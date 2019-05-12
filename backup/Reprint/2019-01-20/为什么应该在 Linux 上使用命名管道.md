---
title: '为什么应该在 Linux 上使用命名管道' 
date: 2019-01-20 2:30:11
hidden: true
slug: dqt55q5dg5f
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#为什么应该在-linux-上使用命名管道"></a>为什么应该在 Linux 上使用命名管道</h1>
<blockquote>
<p>命名管道并不常用，但是它们为进程间通讯提供了一些有趣的特性。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/c229dd9818ee68e51614dc790eb515c616fa5e72/68747470733a2f2f696d616765732e74656368686976652e636f6d2f696d616765732f61727469636c652f323031372f30352f626c75652d313834353830365f313238302d3130303732323937362d6c617267652e6a7067"><img src="http://p0.qhimg.com/t0175756f04d033ed35.jpg" alt=""></a></p>
<p>估计每一位 Linux 使用者都熟悉使用 “|” 符号将数据从一个进程传输到另一个进程的操作。它使用户能简便地从一个命令输出数据到另一个命令，并筛选出想要的数据而无须写脚本进行选择、重新格式化等操作。</p>
<p>还有另一种管道， 虽然也叫“管道”这个名字却有着非常不同的性质。即您可能尚未使用甚至尚未知晓的——命名管道。</p>
<p>普通管道与命名管道的一个主要区别就是命名管道是以文件形式实实在在地存在于文件系统中的，没错，它们表现出来就是文件。但是与其它文件不同的是，命名管道文件似乎从来没有文件内容。即使用户往命名管道中写入大量数据，该文件看起来还是空的。</p>
<h3><a href="#如何在-linux-上创建命名管道"></a>如何在 Linux 上创建命名管道</h3>
<p>在我们研究这些空空如也的命名管道之前，先追根溯源来看看命名管道是如何被创建的。您应该使用名为 <code>mkfifo</code> 的命令来创建它们。为什么提及“FIFO”？是因为命名管道也被认为是一种 FIFO 特殊文件。术语 “FIFO” 指的是它的先进先出first-in, first-out特性。如果你将冰淇淋盛放到碟子中，然后可以品尝它，那么你执行的就是一个LIFO（后进先出last-in, first-out操作。如果你通过吸管喝奶昔，那你就在执行一个 FIFO 操作。好，接下来是一个创建命名管道的例子。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkfifo mypipe</span>
<span class="hljs-meta">$</span><span class="bash"> ls -l mypipe</span>
prw-r-----. 1 shs staff 0 Jan 31 13:59 mypipe

</code></pre><p>注意一下特殊的文件类型标记 “p” 以及该文件大小为 0。您可以将重定向数据写入命名管道文件，而文件大小依然为 0。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"Can you read this?"</span> &gt; mypipe</span>

</code></pre><p>正如上面所说，敲击回车后似乎什么都没有发生（LCTT 译注：没有返回命令行提示符）。</p>
<p>另外再开一个终端，查看该命名管道的大小，依旧是 0：</p>
<pre><code class="hljs tap">$ ls -l mypipe
prw-r-----.<span class="hljs-number"> 1 </span>shs staff<span class="hljs-number"> 0 </span>Jan<span class="hljs-number"> 31 </span>13:59 mypipe

</code></pre><p>也许这有违直觉，用户输入的文本已经进入该命名管道，而你仍然卡在输入端。你或者其他人应该等在输出端，并准备读取放入管道的数据。现在让我们读取看看。</p>
<pre><code class="hljs arduino">$ cat mypipe
Can you <span class="hljs-built_in">read</span> <span class="hljs-keyword">this</span>?

</code></pre><p>一旦被读取之后，管道中的内容就没有了。</p>
<p>另一种研究命名管道如何工作的方式是通过将放入数据的操作置入后台来执行两个操作（将数据放入管道，而在另外一段读取它）。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"Can you read this?"</span> &gt; mypipe &amp;</span>
[1] 79302
<span class="hljs-meta">$</span><span class="bash"> cat mypipe</span>
Can you read this?
[1]+ Done echo "Can you read this?" &gt; mypipe

</code></pre><p>一旦管道被读取或“耗干”，该管道就清空了，尽管我们还能看见它并再次使用。可为什么要费此周折呢？</p>
<h3><a href="#为何要使用命名管道"></a>为何要使用命名管道？</h3>
<p>命名管道很少被使用的理由似乎很充分。毕竟在 Unix 系统上，总有多种不同的方式完成同样的操作。有多种方式写文件、读文件、清空文件，尽管命名管道比它们来得更高效。</p>
<p>值得注意的是，命名管道的内容驻留在内存中而不是被写到硬盘上。数据内容只有在输入输出端都打开时才会传送。用户可以在管道的输出端打开之前向管道多次写入。通过使用命名管道，用户可以创建一个进程写入管道并且另外一个进程读取管道的流程，而不用关心协调二者时间上的同步。</p>
<p>用户可以创建一个单纯等待数据出现在管道输出端的进程，并在拿到输出数据后对其进行操作。下列命令我们采用 <code>tail</code> 来等待数据出现。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tail -f mypipe</span>

</code></pre><p>一旦供给管道数据的进程结束了，我们就可以看到一些输出。</p>
<pre><code class="hljs routeros">$ tail -f mypipe
Uranus replicated <span class="hljs-keyword">to</span> WCDC7
Saturn replicated <span class="hljs-keyword">to</span> WCDC8
Pluto replicated <span class="hljs-keyword">to</span> WCDC9<span class="hljs-built_in">
Server </span>replication operation completed

</code></pre><p>如果研究一下向命名管道写入的进程，用户也许会惊讶于它的资源消耗之少。在下面的 <code>ps</code> 命令输出中，唯一显著的资源消耗是虚拟内存（VSZ 那一列）。</p>
<pre><code class="hljs routeros">ps u -P 80038<span class="hljs-built_in">
USER </span>PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
shs 80038 0.0 0.0 108488 764 pts/4 S 15:25 0:00 -bash

</code></pre><p>命名管道与 Unix/Linux 系统上更常用的管道相比足以不同到拥有另一个名号，但是“管道”确实能反映出它们如何在进程间传送数据的形象，故将称其为“命名管道”还真是恰如其分。也许您在执行操作时就能从这个聪明的 Unix/Linux 特性中获益匪浅呢。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3251853/linux/why-use-named-pipes-on-linux.html">https://www.networkworld.com/article/3251853/linux/why-use-named-pipes-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/YPBlib">YPBlib</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么应该在 Linux 上使用命名管道

## 原文链接
[https://www.zcfy.cc/article/why-you-should-use-named-pipes-on-linux](https://www.zcfy.cc/article/why-you-should-use-named-pipes-on-linux)


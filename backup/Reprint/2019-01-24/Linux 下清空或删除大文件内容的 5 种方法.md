---
title: 'Linux 下清空或删除大文件内容的 5 种方法' 
date: 2019-01-24 2:30:11
hidden: true
slug: k5suef4xtyp
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-下清空或删除大文件内容的-5-种方法"></a>Linux 下清空或删除大文件内容的 5 种方法</h1>
<p>在 Linux 终端下处理文件时，有时我们想直接清空文件的内容但又不必使用任何 <a href="http://www.tecmint.com/linux-command-line-editors/"><strong>Linux 命令行编辑器</strong></a> 去打开这些文件。那怎样才能达到这个目的呢？在这篇文章中，我们将介绍几种借助一些实用的命令来清空文件内容的方法。</p>
<p><strong>注意：</strong>在我们进一步深入了解这些方法之前，请记住: 由于<a href="http://www.tecmint.com/explanation-of-everything-is-a-file-and-types-of-files-in-linux/"><strong>在 Linux 中一切皆文件</strong></a>，你需要时刻注意，确保你将要清空的文件不是重要的用户文件或者系统文件。清空重要的系统文件或者配置文件可能会引发严重的应用失败或者系统错误。</p>
<p>前面已经说道，下面的这些方法都是从命令行中达到清空文件的目的。</p>
<p><strong>提示：</strong>在下面的示例中，我们将使用名为 <code>access.log</code> 的文件来作为示例样本。</p>
<h3><a href="#1-通过重定向到-null-来清空文件内容"></a>1. 通过重定向到 Null 来清空文件内容</h3>
<p>清空或者让一个文件成为空白的最简单方式，是像下面那样，通过 shell 重定向 <code>null</code> （不存在的事物）到该文件：</p>
<pre><code class="hljs fortran"># &gt; <span class="hljs-keyword">access</span>.<span class="hljs-built_in">log</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-Large-File-in-Linux.png"><img src="https://p0.ssl.qhimg.com/t015ac7c6b7f7127edf.png" alt="Empty Large File Using Null Redirect in Linux"></a></p>
<p><em>在 Linux 下使用 Null 重定向来清空大文件</em></p>
<h3><a href="#2-使用-true-命令重定向来清空文件"></a>2. 使用 ‘true’ 命令重定向来清空文件</h3>
<p>下面我们将使用 <code>:</code> 符号，它是 shell 的一个内置命令，等同于 <code>true</code> 命令，它可被用来作为一个 no-op（即不进行任何操作）。</p>
<p>另一种清空文件的方法是将 <code>:</code> 或者 <code>true</code> 内置命令的输出重定向到文件中，具体如下：</p>
<pre><code class="hljs ada"># : &gt; <span class="hljs-keyword"><span class="hljs-keyword">access</span>.</span><span class="hljs-type">log</span>
或 
# <span class="hljs-literal">true</span> &gt; <span class="hljs-keyword">access</span>.log

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-Large-File-Using-Linux-Commands.png"><img src="https://p0.ssl.qhimg.com/t016b2766e90e657892.png" alt="Empty Large File Using Linux Commands"></a></p>
<p><em>使用 Linux 命令清空大文件</em></p>
<h3><a href="#3-使用-catcpdd-实用工具及-devnull-设备来清空文件"></a>3. 使用 <code>cat</code>/<code>cp</code>/<code>dd</code> 实用工具及 <code>/dev/null</code> 设备来清空文件</h3>
<p>在 Linux 中， <code>null</code> 设备基本上被用来丢弃某个进程不再需要的输出流，或者作为某个输入流的空白文件，这些通常可以利用重定向机制来达到。</p>
<p>所以 <code>/dev/null</code> 设备文件是一个特殊的文件，它将清空送到它这里来的所有输入，而它的输出则可被视为一个空文件。</p>
<p>另外，你可以通过使用 <a href="http://www.tecmint.com/13-basic-cat-command-examples-in-linux/"><strong>cat 命令</strong></a> 显示 <code>/dev/null</code> 的内容然后重定向输出到某个文件，以此来达到清空该文件的目的。</p>
<pre><code class="hljs fortran"># cat /dev/null &gt; <span class="hljs-keyword">access</span>.<span class="hljs-built_in">log</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-File-Using-cat-Command.png"><img src="https://p1.ssl.qhimg.com/t011caf96de995cf677.png" alt="Empty File Using cat Command"></a></p>
<p><em>使用 cat 命令来清空文件</em></p>
<p>下面，我们将使用 <a href="http://www.tecmint.com/progress-monitor-check-progress-of-linux-commands/"><strong>cp 命令</strong></a> 复制 <code>/dev/null</code> 的内容到某个文件来达到清空该文件的目的，具体如下所示：</p>
<pre><code class="hljs fortran"># cp /dev/null <span class="hljs-keyword">access</span>.<span class="hljs-built_in">log</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-File-Content-Using-cp-Command.png"><img src="https://p3.ssl.qhimg.com/t01c791e49a0d1fc11d.png" alt="Empty File Content Using cp Command"></a></p>
<p><em>使用 cp 命令来清空文件</em></p>
<p>而下面的命令中， <code>if</code> 代表输入文件，<code>of</code> 代表输出文件。</p>
<pre><code class="hljs vhdl"># dd <span class="hljs-keyword">if</span>=/dev/<span class="hljs-keyword">null</span> <span class="hljs-keyword">of</span>=<span class="hljs-keyword">access</span>.log

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-File-Content-Using-dd-Command.png"><img src="https://p0.ssl.qhimg.com/t01e4de4b7da827bf37.png" alt="Empty File Content Using dd Command"></a></p>
<p><em>使用 dd 命令来清空文件内容</em></p>
<h3><a href="#4-使用-echo-命令清空文件"></a>4. 使用 echo 命令清空文件</h3>
<p>在这里，你可以使用 <a href="http://www.tecmint.com/echo-command-in-linux/"><strong>echo 命令</strong></a> 将空字符串的内容重定向到文件中，具体如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">""</span> &gt; access.log</span>
或者
<span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> &gt; access.log</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-File-Using-echo-Command.png"><img src="https://p5.ssl.qhimg.com/t012a09aeaedefdf640.png" alt="Empty File Using echo Command"></a></p>
<p><em>使用 echo 命令来清空文件</em></p>
<p><strong>注意：</strong>你应该记住空字符串并不等同于 <code>null</code> 。字符串表明它是一个具体的事物，只不过它的内容可能是空的，但 <code>null</code> 则意味着某个事物并不存在。</p>
<p>基于这个原因，当你将 <a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a> 的输出作为输入重定向到文件后，使用 <a href="http://www.tecmint.com/13-basic-cat-command-examples-in-linux/">cat 命令</a> 来查看该文件的内容时，你将看到一个空白行（即一个空字符串）。</p>
<p>要将 null 做为输出输入到文件中，你应该使用 <code>-n</code> 选项，这个选项将告诉 echo 不再像上面的那个命令那样输出结尾的那个新行。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> -n <span class="hljs-string">""</span> &gt; access.log</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Empty-File-Using-Null-Redirect.png"><img src="https://p1.ssl.qhimg.com/t0143e77ccb52b70d0b.png" alt="Empty File Using Null Redirect"></a></p>
<p><em>使用 Null 重定向来清空文件</em></p>
<h3><a href="#5-使用-truncate-命令来清空文件内容"></a>5. 使用 truncate 命令来清空文件内容</h3>
<p><code>truncate</code> 可被用来<a href="http://www.tecmint.com/parted-command-to-create-resize-rescue-linux-disk-partitions/"><strong>将一个文件缩小或者扩展到某个给定的大小</strong></a>。</p>
<p>你可以利用它和 <code>-s</code> 参数来特别指定文件的大小。要清空文件的内容，则在下面的命令中将文件的大小设定为 0:</p>
<pre><code class="hljs fortran"># truncate -s <span class="hljs-number">0</span> <span class="hljs-keyword">access</span>.<span class="hljs-built_in">log</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Truncate-File-Content-in-Linux.png"><img src="https://p3.ssl.qhimg.com/t0131f35c4c694c0697.png" alt="Truncate File Content in Linux"></a></p>
<p><em>在 Linux 中截断文件内容</em></p>
<p>我要介绍的就是这么多了。在本文中，我们介绍了几种通过使用一些简单的命令行工具和 shell 重定向机制来清除或清空文件内容的方法。</p>
<p>上面介绍的这些可能并不是达到清空文件内容这个目的的所有可行的实践方法，所以你也可以通过下面的评论栏告诉我们本文中尚未提及的其他方法。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/empty-delete-file-content-linux/">http://www.tecmint.com/empty-delete-file-content-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/FSSlc">FSSlc</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 下清空或删除大文件内容的 5 种方法

## 原文链接
[https://www.zcfy.cc/article/5-ways-to-empty-or-delete-a-large-file-content-in-linux](https://www.zcfy.cc/article/5-ways-to-empty-or-delete-a-large-file-content-in-linux)


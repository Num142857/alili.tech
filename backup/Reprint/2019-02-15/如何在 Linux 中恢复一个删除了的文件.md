---
title: '如何在 Linux 中恢复一个删除了的文件' 
date: 2019-02-15 2:30:44
hidden: true
slug: lh4tj7epycq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中恢复一个删除了的文件"></a>如何在 Linux 中恢复一个删除了的文件</h1>
<p>你曾经是否遇到这样的事？当你发现的时候，你已经通过删除键，或者在命令行中使用 <code>rm</code> 命令，错误的删除了一个不该删除的文件。</p>
<p>在第一种情况下，你可以到垃圾箱，<a href="http://www.tecmint.com/linux-find-command-to-search-multiple-filenames-extensions/">搜索那个文件</a>，然后把它复原到原始位置。但是第二种情况又该怎么办呢？你可能知道，Linux 命令行不会把删除的文件转移到任何位置，而是直接把它们移除了，biu~，它们就不复存在了。</p>
<p>在这篇文章里，将分享一个很有用的技巧来避免此事发生。同时，也会分享一个工具，不小心删除了某些不该删除的文件时，也许用得上。</p>
<h3><a href="#把删除创建为-rm--i-的别名"></a>把删除创建为 <code>rm -i</code> 的别名</h3>
<p>当 <code>-i</code> 选项配合 <code>rm</code> 命令（也包括其他<a href="http://www.tecmint.com/progress-monitor-check-progress-of-linux-commands/">文件处理命令比如 <code>cp</code> 或者 <code>mv</code></a>）使用时，在删除文件前会出现一个提示。</p>
<p>这同样也可以运用到当<a href="http://www.tecmint.com/rename-multiple-files-in-linux/">复制，移动或重命名一个文件</a>，当所在位置已经存在一个和目标文件同名的文件时。</p>
<p>这个提示会给你第二次机会来考虑是否真的要删除该文件 - 如果你在这个提示上选择确定，那么文件就被删除了。这种情况下，很抱歉，这个技巧并不能防止你的粗心大意。</p>
<p>为了 <code>rm -i</code> 别名替代 <code>rm</code> ，这样做：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> rm=<span class="hljs-string">'rm -i'</span>

</code></pre><p>运行 <code>alias</code> 命令可以确定 <code>rm</code> 现在已经被别名了：</p>
<p><a href="https://camo.githubusercontent.com/748835ced7a4f62a6a692ea1cb063b2a6fb82cba/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4164642d416c6961732d726d2d436f6d6d616e642e706e67"><img src="https://p0.ssl.qhimg.com/t01b74481607aed1469.png" alt="增加 rm 别名的命令"></a></p>
<p><em>为 rm 增加别名</em></p>
<p>然而，这只能在当前用户的当前 shell 上有效。为了永久改变，你必须像下面展示的这样把它保存到　<code>~/.bashrc</code>　中（一些版本的　Linux 系统可能是　<code>~/.profile</code>）。</p>
<p><a href="https://camo.githubusercontent.com/a4e199e277782b6a7aa949b9c528fe02b7f09327/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4164642d416c6961732d5065726d616e656e746c792d696e2d4c696e75782e706e67"><img src="https://p2.ssl.qhimg.com/t01e0613863d214e8d6.png" alt="在 Linux 中永久增添别名"></a></p>
<p><em>在 Linux 中永久增添别名</em></p>
<p>为了让 <code>~/.bashrc</code>（或 <code>~/.profile</code>）中所做的改变立即生效，从当前 shell 中运行文件：</p>
<pre><code class="hljs stylus">. ~/<span class="hljs-selector-class">.bashrc</span>

</code></pre><p><a href="https://camo.githubusercontent.com/e4c3642dfd9971db1faab463a37719e23e3aee92/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4163746976652d416c6961732d696e2d4c696e75782e706e67"><img src="https://p2.ssl.qhimg.com/t01f342cfedc120ba9a.png" alt="在 Linux 中激活别名"></a></p>
<p><em>在 Linux 中激活别名</em></p>
<h3><a href="#取证工具foremost"></a>取证工具　－　Foremost</h3>
<p>但愿你对于你的文件足够小心，当你要从外部磁盘或 USB 设备中恢复丢失的文件时，你只需使用这个工具即可。</p>
<p>然而，当你意识到你意外的删除了系统中的一个文件并感到恐慌时－不用担心。让我们来看一看 <code>foremost</code>，一个用来处理这种状况的取证工具。</p>
<p>要在 CentOS/RHEL 7　中安装　Foremost，需要首先启用 Repoforge：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> rpm -Uvh http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm</span>
<span class="hljs-meta">#</span><span class="bash"> yum install foremost</span>

</code></pre><p>然而在 Debian 及其衍生系统中，需这样做：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> aptitude install foremost</span>

</code></pre><p>安装完成后，我们做一个简单的测试吧。首先删除 <code>/boot/images</code> 目录下一个名为 <code>nosdos.jpg</code> 的图像文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">cd</span> images</span>
<span class="hljs-meta">#</span><span class="bash"> rm nosdos.jpg</span>

</code></pre><p>要恢复这个文件，如下所示使用 <code>foremost</code>（要先确认所在分区 - 本例中， <code>/boot</code> 位于 <code>/dev/sda1</code> 分区中）。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> foremost -t jpg -i /dev/sda1 -o /home/gacanepa/rescued</span>

</code></pre><p>其中，<code>/home/gacanepa/rescued</code> 是另外一个磁盘中的目录 － 请记住，把文件恢复到被删除文件所在的磁盘中不是一个明智的做法。</p>
<p>如果在恢复过程中，占用了被删除文件之前所在的磁盘分区，就可能无法恢复文件。另外，进行文件恢复操作前不要做任何其他操作。</p>
<p>当 <code>foremost</code> 执行完成以后，恢复的文件（如果可以恢复）将能够在目录 ·/home/gacanepa/rescue/jpg` 中找到。</p>
<h5><a href="#总结"></a>总结</h5>
<p>在这篇文章中，我们阐述了如何避免意外删除一个不该删除的文件，以及万一这类事情发生，如何恢复文件。还要警告一下， <code>foremost</code> 可能运行很长时间，时间长短取决于分区的大小。</p>
<p>如果您有什么问题或想法，和往常一样，不要犹豫，告诉我们。可以给我们留言。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/recover-deleted-file-in-linux/">http://www.tecmint.com/recover-deleted-file-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中恢复一个删除了的文件

## 原文链接
[https://www.zcfy.cc/article/how-to-recover-a-deleted-file-in-linux](https://www.zcfy.cc/article/how-to-recover-a-deleted-file-in-linux)


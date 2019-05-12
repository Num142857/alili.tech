---
title: '在 Linux 上寻找你正在寻找的东西' 
date: 2019-01-19 2:30:10
hidden: true
slug: r32xk5me94n
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-上寻找你正在寻找的东西"></a>在 Linux 上寻找你正在寻找的东西</h1>
<blockquote>
<p>怎样在 Linux 系统上使用 find、locate、mlocate、which、 whereis、 whatis 和 apropos 命令寻找文件。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/724a3e0f64630a281b3b6f6d7fab6c3e022f66c8/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031382f30342f62696e6f63756c6172732d3130303735343936372d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01e275e1c04bffca7b.jpg" alt=""></a></p>
<p>在 Linux 系统上找到你要找的文件或命令并不难， 有很多种方法可以寻找。</p>
<h3><a href="#find"></a>find</h3>
<p>最显然的无疑是 <code>find</code> 命令，并且 <code>find</code> 变得比过去几年更容易使用了。它过去需要一个搜索的起始位置，但是现在，如果你想将搜索限制在当下目录中，你还可以使用仅包含文件名或正则表达式的 <code>find</code> 命令。</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">find</span> e*
empty
examples.desktop

</code></pre><p>这样，它就像 <code>ls</code> 命令一样工作，并没有做太多的搜索。</p>
<p>对于更专业的搜索，<code>find</code> 命令需要一个起点和一些搜索条件（除非你只是希望它提供该起点目录的递归列表）。命令 <code>find -type f</code> 从当前目录开始将递归列出所有常规文件，而 <code>find ~nemo -type f -empty</code> 将在 nemo 的主目录中找到空文件。</p>
<pre><code class="hljs vim">$ <span class="hljs-keyword">find</span> ~nemo -<span class="hljs-built_in">type</span> <span class="hljs-keyword">f</span> -<span class="hljs-built_in">empty</span>
/home/nemo/<span class="hljs-built_in">empty</span>

</code></pre><p>参见：<a href="http://www.networkworld.com/article/2926630/linux/11-pointless-but-awesome-linux-terminal-tricks.html#tk.nww-fsb">11 个好玩的 Linux 终端技巧</a>。</p>
<h3><a href="#locate"></a>locate</h3>
<p><code>locate</code> 命令的名称表明它与 <code>find</code> 命令基本相同，但它的工作原理完全不同。<code>find</code> 命令可以根据各种条件 —— 名称、大小、所有者、权限、状态（如空文件）等等选择文件并作为搜索选择深度，<code>locate</code> 命令通过名为 <code>/var/lib/mlocate/mlocate.db</code> 的文件查找你要查找的内容。该数据文件会定期更新，因此你刚创建的文件的位置它可能无法找到。如果这让你感到困扰，你可以运行 <code>updatedb</code> 命令立即获得更新。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo updatedb</span>

</code></pre><h3><a href="#mlocate"></a>mlocate</h3>
<p><code>mlocate</code> 命令的工作类似于 <code>locate</code> 命令，它使用与 <code>locate</code> 相同的 <code>mlocate.db</code> 文件。</p>
<h3><a href="#which"></a>which</h3>
<p><code>which</code> 命令的工作方式与 <code>find</code> 命令和 <code>locate</code> 命令有很大的区别。它使用你的搜索路径（<code>$PATH</code>）并检查其上的每个目录中具有你要查找的文件名的可执行文件。一旦找到一个，它会停止搜索并显示该可执行文件的完整路径。</p>
<p><code>which</code> 命令的主要优点是它回答了“如果我输入此命令，将运行什么可执行文件？”的问题。它会忽略不可执行文件，并且不会列出系统上带有该名称的所有可执行文件 —— 列出的就是它找到的第一个。如果你想查找具有某个名称的所有可执行文件，则可以像这样运行 <code>find</code> 命令，但是要比非常高效 <code>which</code> 命令用更长的时间。</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">find</span> / -name locate -perm <span class="hljs-attribute">-a</span>=x 2&gt;/dev/<span class="hljs-literal">null</span>
/usr/bin/locate
/etc/alternatives/locate

</code></pre><p>在这个 <code>find</code> 命令中，我们在寻找名为 “locate” 的所有可执行文件（任何人都可以运行的文件）。我们也选择了不要查看所有“拒绝访问”的消息，否则这些消息会混乱我们的屏幕。</p>
<h3><a href="#whereis"></a>whereis</h3>
<p><code>whereis</code> 命令与 <code>which</code> 命令非常类似，但它提供了更多信息。它不仅仅是寻找可执行文件，它还寻找手册页（man page）和源文件。像 <code>which</code> 命令一样，它使用搜索路径（<code>$PATH</code>） 来驱动搜索。</p>
<pre><code class="hljs groovy">$ whereis locate
<span class="hljs-string">locate:</span> <span class="hljs-regexp">/usr/</span>bin<span class="hljs-regexp">/locate /</span>usr<span class="hljs-regexp">/share/</span>man<span class="hljs-regexp">/man1/</span>locate<span class="hljs-number">.1</span>.gz

</code></pre><h3><a href="#whatis"></a>whatis</h3>
<p><code>whatis</code> 命令有其独特的使命。它不是实际查找文件，而是在手册页中查找有关所询问命令的信息，并从手册页的顶部提供该命令的简要说明。</p>
<pre><code class="hljs applescript">$ whatis locate
locate (<span class="hljs-number">1</span>) - find files <span class="hljs-keyword">by</span> <span class="hljs-built_in">name</span>

</code></pre><p>如果你询问你刚刚设置的脚本，它不会知道你指的是什么，并会告诉你。</p>
<pre><code class="hljs llvm">$ whatis <span class="hljs-keyword">cleanup</span>
<span class="hljs-keyword">cleanup</span>: nothing appropriate.

</code></pre><h3><a href="#apropos"></a>apropos</h3>
<p>当你知道你想要做什么，但不知道应该使用什么命令来执行此操作时，<code>apropos</code> 命令很有用。例如，如果你想知道如何查找文件，那么 <code>apropos find</code> 和 <code>apropos locate</code> 会提供很多建议。</p>
<pre><code class="hljs routeros">$ apropos <span class="hljs-builtin-name">find</span>
File::IconTheme (3pm) - <span class="hljs-builtin-name">find</span> icon directories
File::MimeInfo::Applications (3pm) - <span class="hljs-builtin-name">Find</span> programs <span class="hljs-keyword">to</span> open a file by mimetype
File::UserDirs (3pm) - <span class="hljs-builtin-name">find</span> extra media <span class="hljs-keyword">and</span> documents directories
<span class="hljs-builtin-name">find</span> (1) - search <span class="hljs-keyword">for</span> files <span class="hljs-keyword">in</span> a directory hierarchy
findfs (8) - <span class="hljs-builtin-name">find</span> a filesystem by label <span class="hljs-keyword">or</span> UUID
findmnt (8) - <span class="hljs-builtin-name">find</span> a filesystem
gst-typefind-1.0 (1) - <span class="hljs-builtin-name">print</span> Media<span class="hljs-built_in"> type </span>of file
ippfind (1) - <span class="hljs-builtin-name">find</span> internet printing protocol printers
locate (1) - <span class="hljs-builtin-name">find</span> files by name
mlocate (1) - <span class="hljs-builtin-name">find</span> files by name
pidof (8) - <span class="hljs-builtin-name">find</span> the process ID of a running program.
sane-find-scanner (1) - <span class="hljs-builtin-name">find</span> SCSI <span class="hljs-keyword">and</span> USB scanners <span class="hljs-keyword">and</span> their device files
systemd-delta (1) - <span class="hljs-builtin-name">Find</span> overridden configuration files
xdg-user-dir (1) - <span class="hljs-builtin-name">Find</span> an XDG<span class="hljs-built_in"> user </span>dir
$
$ apropos locate
blkid (8) - locate/<span class="hljs-builtin-name">print</span> block device attributes
deallocvt (1) - deallocate unused virtual consoles
fallocate (1) - preallocate <span class="hljs-keyword">or</span> deallocate space <span class="hljs-keyword">to</span> a file
IO::Tty (3pm) - Low-level allocate a pseudo-Tty, import constants.
locate (1) - <span class="hljs-builtin-name">find</span> files by name
mlocate (1) - <span class="hljs-builtin-name">find</span> files by name
mlocate.db (5) - a mlocate database
mshowfat (1) - shows FAT clusters allocated <span class="hljs-keyword">to</span> file
ntfsfallocate (8) - preallocate space <span class="hljs-keyword">to</span> a file on an NTFS volume
systemd-sysusers (8) - Allocate<span class="hljs-built_in"> system users </span><span class="hljs-keyword">and</span> groups
systemd-sysusers.service (8) - Allocate<span class="hljs-built_in"> system users </span><span class="hljs-keyword">and</span> groups
updatedb (8) - update a database <span class="hljs-keyword">for</span> mlocate
updatedb.mlocate (8) - update a database <span class="hljs-keyword">for</span> mlocate
whereis (1) - locate the binary, source, <span class="hljs-keyword">and</span><span class="hljs-built_in"> manual page </span>files <span class="hljs-keyword">for</span> a<span class="hljs-built_in">..</span>.
which (1) - locate a command

</code></pre><h3><a href="#总结"></a>总结</h3>
<p>Linux 上可用于查找和识别文件的命令有很多种，但它们都非常有用。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3268768/linux/finding-what-you-re-looking-for-on-linux.html">https://www.networkworld.com/article/3268768/linux/finding-what-you-re-looking-for-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 上寻找你正在寻找的东西

## 原文链接
[https://www.zcfy.cc/article/finding-what-you-re-looking-for-on-linux](https://www.zcfy.cc/article/finding-what-you-re-looking-for-on-linux)


---
title: '如何在 Linux 中恢复仍在活动进程中的已删除文件' 
date: 2019-01-22 2:30:08
hidden: true
slug: hkvj9rwzgq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中恢复仍在活动进程中的已删除文件"></a>如何在 Linux 中恢复仍在活动进程中的已删除文件</h1>
<blockquote>
<p>使用终端恢复你 Linux 系统上仍在运行进程的已删除文件的快速指南。</p>
</blockquote>
<p>许多情况下，删除的文件都可以恢复，比如在该文件有活动的进程在操作它，并且目前被单个或多个用户使用时。在 Linux 系统中，每个当前正在运行的进程都会获得 ID，其被称之为进程标识符 “PID”，并将它们存放在 <code>/proc</code> 目录中。这正是我们恢复仍在运行的进程中（具有PID）已删除的文件所需要的东西。这里就是介绍我们如何做到这一点的。</p>
<p>假设你打开了一个压缩文件，之后你删除了这个文件。为了演示目的，压缩文件称为 “opengapps.zip”，这将是之后我们将打开和删除的文件。</p>
<h3><a href="#计算原始文件的-md5-哈希"></a>计算原始文件的 MD5 哈希</h3>
<p>删除之前，我们将计算该文件的 MD5。这样我们可以将原来的 MD5 哈希值与恢复文件的 MD5 哈希进行比较。这个过程将保证我们恢复的压缩文件的完整性是一样的，它没有被破坏。</p>
<pre><code class="hljs stylus">md5sum opengapps<span class="hljs-selector-class">.zip</span> &gt;&gt; md5-opengapps<span class="hljs-selector-class">.txt</span>

</code></pre><p>要显示文本文件的内容。</p>
<pre><code class="hljs stylus">cat md5-opengapps<span class="hljs-selector-class">.txt</span>

<span class="hljs-number">86489</span>b68b40d144f0e00a0ea8407f7c0  opengapps<span class="hljs-selector-class">.zip</span>

</code></pre><p>检查压缩文件的 MD5 哈希值之后。我们将压缩文件保持打开（LCTT 译注：此处是使用 file-roller 这个图形界面的解压程序保持对该压缩文件的打开，其内置在 GNOME 环境中；在桌面环境中，使用桌面工具打开一个压缩包也能起到同样的作用。又及，本文举例不是很恰当，如果是删除了某个服务进程的已经打开的配置文件，那么这种恢复就很有意义），并将其删除。之后，我们将从文件的恢复过程开始，步骤如下：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">rm</span> opengapps.<span class="hljs-keyword">zip</span>

</code></pre><h3><a href="#删除文件的恢复过程"></a>删除文件的恢复过程</h3>
<p>正如我们前面提到的，运行的进程在 <code>/proc</code> 目录中。我们可以使用以下命令搜索该目录中需要的进程：</p>
<p>由于我们已经知道文件名包括 .zip 扩展名，因此我们可以使用 .zip 扩展名进行搜索。它将限制输出结果并显示所需的进程。</p>
<pre><code class="hljs tap">ps -axu | grep .zip

m       <span class="hljs-number"> 13119 </span> 0.8  1.0<span class="hljs-number"> 121788 </span>30788 ?        Sl   06:17   0:00 file-roller /home/m/Downloads/Compressed/opengapps.zip
m       <span class="hljs-number"> 13164 </span> 0.0  0.0  <span class="hljs-number"> 5108 </span> <span class="hljs-number"> 832 </span>pts/20   S+   06:18   0:00 grep --color=auto .zip

</code></pre><p>然后我们将进入到包含 PID <code>13119</code> 的目录并打开 <code>fd</code> 子目录。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> <span class="hljs-string">/proc/13119/fd</span>

</code></pre><p><code>fd</code> （文件描述符）目录包含多个文件，包括我们需要恢复的文件。该文件以硬链接的方式链接到原始文件。 <code>fd</code> 目录中的所有文件都以数字链接到“文件名”。因此，要确定这些文件中的哪一个链接到该原始文件，我们将用详细列表选项列出 /fd 目录。</p>
<pre><code class="hljs tap">ls -l

total 0
lr-x------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 0 </span>-&gt; /dev/null
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 1 </span>-&gt; socket:[26161]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 10 </span>-&gt; anon_inode:[eventfd]
lr-x------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 11 </span>-&gt; anon_inode:inotify
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 12 </span>-&gt; socket:[5752671]
lr-x------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 13 </span>-&gt; /home/m/Downloads/Compressed/opengapps.zip (deleted)
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 2 </span>-&gt; socket:[26161]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 3 </span>-&gt; anon_inode:[eventfd]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 4 </span>-&gt; anon_inode:[eventfd]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 5 </span>-&gt; socket:[5751361]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 6 </span>-&gt; anon_inode:[eventfd]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 7 </span>-&gt; anon_inode:[eventfd]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 8 </span>-&gt; socket:[5751363]
lrwx------<span class="hljs-number"> 1 </span>m m<span class="hljs-number"> 64 </span>Jul<span class="hljs-number"> 14 </span>06:17<span class="hljs-number"> 9 </span>-&gt; socket:[5751365]

</code></pre><p>正如你在终端输出中看到的，原始文件 “opengapps.zip” 已被删除，但它仍然链接到一个文件名 <code>13</code>，其进程 PID <code>13119</code>。但是，我们仍然可以通过将链接的文件复制到安全的地方来恢复它。</p>
<pre><code class="hljs awk">cp <span class="hljs-number">13</span> <span class="hljs-regexp">/home/m</span><span class="hljs-regexp">/Downloads/</span>Compressed

</code></pre><p>文件复制后。我们将返回包含恢复文件的目录，并使用以下命令重命名它。</p>
<pre><code class="hljs stylus">mv <span class="hljs-number">13</span> opengapps-recovered<span class="hljs-selector-class">.zip</span>

</code></pre><h3><a href="#计算恢复文件的-md5-哈希"></a>计算恢复文件的 MD5 哈希</h3>
<p>由于我们已经恢复了该文件。让我们检查该文件的完整性，这只是为了确保文件没有损坏，并且和原来一样。早先我们保存了原始文件的 MD5 哈希值。</p>
<pre><code class="hljs stylus">md5sum opengapps-recovered<span class="hljs-selector-class">.zip</span> &gt;&gt; md5-opengapps<span class="hljs-selector-class">.txt</span>

</code></pre><p>该命令将检查文件的 MD5 哈希值，并在文件中追加新恢复文件的 MD5 哈希值，以轻松比较两个 MD5 哈希值。</p>
<p>可以显示文本文件的内容来比较原始文件和恢复文件的 MD5 哈希值。</p>
<pre><code class="hljs stylus">cat md5-opengapps<span class="hljs-selector-class">.txt</span>

<span class="hljs-number">86489</span>b68b40d144f0e00a0ea8407f7c0  opengapps<span class="hljs-selector-class">.zip</span>
<span class="hljs-number">86489</span>b68b40d144f0e00a0ea8407f7c0  opengapps-recovered<span class="hljs-selector-class">.zip</span>

</code></pre><p>恢复文件的 MD5 哈希是一样的。所以，我们成功地恢复了我们以前删除的文件，并且恢复后文件完整性一致，并且工作正常。</p>
<p><a href="http://www.linuxnov.com/wp-content/uploads/2017/07/Recovering-a-deleted-file-using-terminal-LinuxNov.png"><img src="https://p0.ssl.qhimg.com/t0107632883e9eec186.png" alt=""></a></p>
<p><strong>注意：</strong> 在某些情况下，某些文件无法通过 <code>ps -axu</code> 命令看到。 所以，尝试检查运行的程序，并从中恢复文件。</p>
<p>假设我们有一个使用 Totem 媒体播放器播放中的以 .avi 为扩展名的视频。你需要做的就是检查 Totem 的 PID，并按照本示例中提到的相同说明进行操作。</p>
<p>要查找正在运行的程序的 PID，请使用以下命令，后面跟程序的名称。</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">pidof</span> 程序名

</code></pre><p>通过分享支持我们。</p>
<hr>
<p>via: <a href="http://www.linuxnov.com/recover-deleted-files-still-running-active-processes-linux/">http://www.linuxnov.com/recover-deleted-files-still-running-active-processes-linux/</a></p>
<p>作者：<a href="http://www.linuxnov.com/author/mhnassif/">mhnassif</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中恢复仍在活动进程中的已删除文件

## 原文链接
[https://www.zcfy.cc/article/how-to-recover-deleted-files-still-running-with-active-processes-on-linux](https://www.zcfy.cc/article/how-to-recover-deleted-files-still-running-with-active-processes-on-linux)


---
title: '如何在 Linux 中压缩及解压缩 .bz2 文件' 
date: 2019-03-02 2:30:07
hidden: true
slug: qs8kc0dpin
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中压缩及解压缩-bz2-文件"></a>如何在 Linux 中压缩及解压缩 .bz2 文件</h1>
<p>对文件进行压缩，可以通过使用较少的字节对文件中的数据进行编码来显著地减小文件的大小，并且在跨网络的<a href="http://www.tecmint.com/rsync-local-remote-file-synchronization-commands/">文件的备份和传送</a>时很有用。 另一方面，解压文件意味着将文件中的数据恢复到初始状态。</p>
<p>Linux 中有几个<a href="http://www.tecmint.com/command-line-archive-tools-for-linux/">文件压缩和解压缩工具</a>，比如gzip、7-zip、Lrzip、<a href="http://www.tecmint.com/peazip-linux-file-manager-and-file-archive-tool/">PeaZip</a> 等等。</p>
<p>本篇教程中，我们将介绍如何在 Linux 中使用 bzip2 工具压缩及解压缩<code>.bz2</code>文件。</p>
<p>bzip2 是一个非常有名的压缩工具，并且在大多数主流 Linux 发行版上都有，你可以在你的发行版上用合适的命令来安装它。</p>
<pre><code class="hljs cmake">$ sudo apt <span class="hljs-keyword">install</span> bzip2     [<span class="hljs-keyword">On</span> Debian/Ubuntu] 
$ sudo yum <span class="hljs-keyword">install</span>  bzip2    [<span class="hljs-keyword">On</span> CentOS/RHEL]
$ sudo dnf <span class="hljs-keyword">install</span> bzip2     [<span class="hljs-keyword">On</span> Fedora <span class="hljs-number">22</span>+]

</code></pre><p>使用 bzip2 的常规语法是：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> bzip2 <span class="hljs-keyword">option</span>(s) filenames 

</code></pre><h3><a href="#如何在-linux-中使用bzip2压缩文件"></a>如何在 Linux 中使用“bzip2”压缩文件</h3>
<p>你可以如下压缩一个文件，使用<code>-z</code>标志启用压缩：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> bzip2 filename</span>
或者
<span class="hljs-meta">$</span><span class="bash"> bzip2 -z filename</span>

</code></pre><p>要压缩一个<code>.tar</code>文件，使用的命令为：</p>
<pre><code class="hljs armasm">$ <span class="hljs-keyword">bzip2 </span>-z <span class="hljs-keyword">backup.tar
</span>
</code></pre><p>重要：bzip2 默认会在压缩及解压缩文件时删除输入文件（原文件），要保留输入文件，使用<code>-k</code>或者<code>--keep</code>选项。</p>
<p>此外，<code>-f</code>或者<code>--force</code>标志会强制让 bzip2 覆盖已有的输出文件。</p>
<pre><code class="hljs shell">------ 要保留输入文件  ------
<span class="hljs-meta">$</span><span class="bash"> bzip2 -zk filename</span>
<span class="hljs-meta">$</span><span class="bash"> bzip2 -zk backup.tar</span>

</code></pre><p>你也可以设置块的大小，从 100k 到 900k，分别使用<code>-1</code>或者<code>--fast</code>到<code>-9</code>或者<code>--best</code>：</p>
<pre><code class="hljs stylus">$ bzip2 -k1  Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span>
$ ls -lh  Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span><span class="hljs-selector-class">.bz2</span> 
$ bzip2 -k9  Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span> 
$ bzip2 -kf9  Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span> 
$ ls -lh Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span><span class="hljs-selector-class">.bz2</span> 

</code></pre><p>下面的截屏展示了如何使用选项来保留输入文件，强制 bzip2 覆盖输出文件，并且在压缩中设置块的大小。</p>
<p><a href="https://camo.githubusercontent.com/9999f020cdbd6b37715b4811eb40c874b4794abc/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f436f6d70726573732d46696c65732d5573696e672d627a6970322d696e2d4c696e75782e706e67"><img src="https://p4.ssl.qhimg.com/t01cb720064a2d822c2.png" alt="Compress Files Using bzip2 in Linux"></a></p>
<p><em>在 Linux 中使用 bzip2 压缩文件</em></p>
<h3><a href="#如何在-linux-中使用bzip2解压缩文件"></a>如何在 Linux 中使用“bzip2”解压缩文件</h3>
<p>要解压缩<code>.bz2</code>文件，确保使用<code>-d</code>或者<code>--decompress</code>选项：</p>
<pre><code class="hljs armasm">$ <span class="hljs-keyword">bzip2 </span>-d filename.<span class="hljs-keyword">bz2
</span>
</code></pre><p>注意：这个文件必须是<code>.bz2</code>的扩展名，上面的命令才能使用。</p>
<pre><code class="hljs stylus">$ bzip2 -vd Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span><span class="hljs-selector-class">.bz2</span> 
$ bzip2 -vfd Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span><span class="hljs-selector-class">.bz2</span> 
$ ls -l Etcher-linux-x64<span class="hljs-selector-class">.AppImage</span> 

</code></pre><p><a href="https://camo.githubusercontent.com/bf1e47588f21c5da8c38e665159b7ec15b8688c9/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4465636f6d7072657373696f6e2d627a6970322d46696c652d696e2d4c696e75782e706e67"><img src="https://p0.ssl.qhimg.com/t01668caf24041df122.png" alt="Decompress bzip2 File in Linux"></a></p>
<p><em>在 Linux 中解压 bzip2 文件</em></p>
<p>要浏览 bzip2 的帮助及 man 页面，输入下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> bzip2  -h</span>
<span class="hljs-meta">$</span><span class="bash"> man bzip2</span>

</code></pre><p>最后，通过上面简单的阐述，我相信你现在已经可以在 Linux 中压缩及解压缩<code>bz2</code>文件了。然而，有任何的问题和反馈，可以在评论区中留言。</p>
<p>重要的是，你可能想在 Linux 中查看一些重要的 <a href="http://www.tecmint.com/18-tar-command-examples-in-linux/">tar 命令示例</a>，以便学习使用 tar 命令来<a href="http://www.tecmint.com/compress-files-and-finding-files-in-linux/">创建压缩归档文件</a>。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/linux-compress-decompress-bz2-files-using-bzip2">http://www.tecmint.com/linux-compress-decompress-bz2-files-using-bzip2</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中压缩及解压缩 .bz2 文件

## 原文链接
[https://www.zcfy.cc/article/how-to-compress-and-decompress-a-bz2-file-in-linux](https://www.zcfy.cc/article/how-to-compress-and-decompress-a-bz2-file-in-linux)


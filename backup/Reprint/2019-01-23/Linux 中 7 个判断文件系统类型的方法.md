---
title: 'Linux 中 7 个判断文件系统类型的方法' 
date: 2019-01-23 2:30:08
hidden: true
slug: 59v1u7v2wor
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-中-7-个判断文件系统类型的方法"></a>Linux 中 7 个判断文件系统类型的方法</h1>
<p>文件通过文件系统在磁盘及分区上命名、存储、检索以及更新，文件系统是在磁盘上组织文件的方式。</p>
<p>文件系统分为两个部分：用户数据和元数据（文件名、创建时间、修改时间、大小以及目录层次结构中的位置等）。</p>
<p>在本指南中，我们将用 7 种方法来识别你的 Linux 文件系统类型，如 Ext2、Ext3、Ext4、BtrFS、GlusterFS 等等。</p>
<h3><a href="#1-使用-df-命令"></a>1、 使用 df 命令</h3>
<p><code>df</code> 命令报告文件系统磁盘空间利用率，要显示特定的磁盘分区的文件系统类型，像下面那样使用 <code>-T</code> 标志：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> df -Th</span>
或者
<span class="hljs-meta">$</span><span class="bash"> df -Th | grep <span class="hljs-string">"^/dev"</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Find-Filesystem-Type-Using-df-Command.png"><img src="https://p2.ssl.qhimg.com/t012d14ba1e3d84a36d.png" alt="df Command - Find Filesystem Type"></a></p>
<p><em>df 命令 – 找出文件系统类型</em></p>
<p>要更好理解 <code>df</code> 命令，阅读下面的文章：</p>
<ol>
<li><a href="http://www.tecmint.com/how-to-check-disk-space-in-linux/">12 个有用的 df 命令来检查 Linux 中的磁盘空间</a></li>
<li><a href="http://www.tecmint.com/pyd-command-to-check-disk-usage/">Pydf - 一个替代 df 的命令，用颜色显示磁盘使用率</a></li>
</ol>
<h3><a href="#2-使用-fsck-命令"></a>2、 使用 fsck 命令</h3>
<p><code>fsck</code> 用来检查以及<a href="http://www.tecmint.com/defragment-linux-system-partitions-and-directories/">修复 Linux 文件系统</a>，它也可以输出<a href="http://www.tecmint.com/manage-file-types-and-set-system-time-in-linux/">指定磁盘分区的文件系统类型</a>。</p>
<p><code>-N</code> 标志禁用检查文件系统错误，它只是显示会做什么（但是我们只需要文件系统类型）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -N /dev/sda3</span>
<span class="hljs-meta">$</span><span class="bash"> fsck -N /dev/sdb1</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/fsck-Print-Linux-Filesystem-Type.png"><img src="https://p2.ssl.qhimg.com/t018f6eb34b89f5c270.png" alt="fsck - Print Linux Filesystem Type"></a></p>
<p><em>fsck – 打印 Linux 文件系统类型</em></p>
<h3><a href="#3-使用-lsblk-命令"></a>3、 使用 lsblk 命令</h3>
<p><code>lsblk</code> 会显示块设备，当使用 <code>-f</code> 选项时，它也会打印分区的文件系统类型：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> lsblk -f</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/lsblk-Shows-Linux-Filesystem-Type.png"><img src="https://p5.ssl.qhimg.com/t017b7363b34c75da24.png" alt="lsblk - Shows Linux Filesystem Type"></a></p>
<p><em>lsblk – 显示 Linux 文件系统类型</em></p>
<h3><a href="#4-使用-mount-命令"></a>4、 使用 mount 命令</h3>
<p><code>mount</code> 命令用来<a href="http://www.tecmint.com/sshfs-mount-remote-linux-filesystem-directory-using-ssh/">在 Linux 中挂载文件系统</a>，它也可以用来<a href="http://www.tecmint.com/extract-files-from-iso-files-linux/">挂载一个 ISO 镜像</a>，<a href="http://www.tecmint.com/sshfs-mount-remote-linux-filesystem-directory-using-ssh/">挂载远程 Linux 文件系统</a>等等。</p>
<p>当不带任何参数运行时，它会打印包含文件系统类型在内的<a href="http://www.tecmint.com/linux-tools-to-monitor-disk-partition-usage/">磁盘分区的信息</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mount | grep <span class="hljs-string">"^/dev"</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Mount-Show-Filesystem-Type.png"><img src="https://p2.ssl.qhimg.com/t0128687ab249715f5a.png" alt="Mount - Show Filesystem Type in Linux"></a></p>
<p><em>Mount – 在 Linux 中显示文件系统类型</em></p>
<h3><a href="#5-使用-blkid-命令"></a>5、 使用 blkid 命令</h3>
<p><code>blkid</code> 命令用来<a href="http://www.tecmint.com/find-usb-device-name-in-linux/">找出或打印块设备属性</a>，只要将磁盘分区作为参数就行了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> blkid /dev/sda3</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/blkid-Find-Filesystem-Type.png"><img src="https://p5.ssl.qhimg.com/t011d02a06ab44b9dfb.png" alt="blkid - Find Filesystem Type"></a></p>
<p><em>blkid – 找出文件系统类型</em></p>
<h3><a href="#6-使用-file-命令"></a>6、 使用 file 命令</h3>
<p><code>file</code> 命令会识别文件类型，使用 <code>-s</code> 标志启用读取块设备或字符设备，<code>-L</code> 启用符号链接跟随：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> sudo <span class="hljs-keyword">file</span> -sL /dev/sda3

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/file-command-identifies-filesystem-type.png"><img src="https://p4.ssl.qhimg.com/t01c68b8496f7ba84c8.png" alt="file - Identifies Filesystem Type"></a></p>
<p><em>file – 识别文件系统类型</em></p>
<h3><a href="#7-使用-fstab-文件"></a>7、 使用 fstab 文件</h3>
<p><code>/etc/fstab</code> 是一个静态文件系统信息（比如挂载点、文件系统类型、挂载选项等等）文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cat /etc/fstab</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/fstab-shows-filesystem-types.png"><img src="https://p1.ssl.qhimg.com/t01ba782fdfd523d997.png" alt="Fstab - Shows Linux Filesystem Type"></a></p>
<p><em>fstab – 显示 Linux 文件系统类型</em></p>
<p>就是这样了！在这篇指南中，我们用 7 种方法来识别你的 Linux 文件系统类型。你还知道这里没有提到的其他方法么？在评论中与我们分享。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili是一名 Linux 和 F.O.S.S 的爱好者，未来的 Linux 系统管理员、网站开发人员，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并乐于分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/find-linux-filesystem-type/">http://www.tecmint.com/find-linux-filesystem-type/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 中 7 个判断文件系统类型的方法

## 原文链接
[https://www.zcfy.cc/article/7-ways-to-determine-the-file-system-type-in-linux](https://www.zcfy.cc/article/7-ways-to-determine-the-file-system-type-in-linux)


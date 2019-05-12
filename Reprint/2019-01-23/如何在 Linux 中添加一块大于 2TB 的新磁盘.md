---
title: '如何在 Linux 中添加一块大于 2TB 的新磁盘' 
date: 2019-01-23 2:30:08
hidden: true
slug: 206ycsoqu5oh
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中添加一块大于-2tb-的新磁盘"></a>如何在 Linux 中添加一块大于 2TB 的新磁盘</h1>
<p>你有没有试过使用 <a href="http://www.tecmint.com/fdisk-commands-to-manage-linux-disk-partitions/">fdisk</a> 对大于 2TB 的硬盘进行分区，并且纳闷为什么会得到需要使用 GPT 的警告？ 是的，你看到的没错。我们无法使用 fdisk 对大于 2TB 的硬盘进行分区。</p>
<p>在这种情况下，我们可以使用 <code>parted</code> 命令。它的主要区别在于 fdisk 使用 DOS 分区表格式而 parted 使用 GPT 格式。</p>
<p>提示：你可以使用 <code>gdisk</code> 来代替 <code>parted</code>。</p>
<p>在本文中，我们将介绍如何将大于 2TB 的新磁盘添加到现有的 Linux 服务器中（如 RHEL/CentOS 或 Debian/Ubuntu）中。</p>
<p>我使用的是 <code>fdisk</code> 和 <code>parted</code> 来进行此配置。</p>
<p>首先使用 <code>fdisk</code> 命令列出当前的分区详细信息，如图所示。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk -l</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/04/List-Linux-Partition-Table.png"><img src="https://p1.ssl.qhimg.com/t01e7478d79bcca39ea.png" alt="List Linux Partition Table"></a></p>
<p><em>列出 Linux 分区表</em></p>
<p>为了本文的目的，我加了一块 20GB 的磁盘，这也可以是大于 2TB 的磁盘。在你加完磁盘后，使用相同的 <code>fdisk</code> 命令验证分区表。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk -l</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/04/List-New-Partition-Table.png"><img src="https://p1.ssl.qhimg.com/t011574f2eace3c9414.png" alt="List New Partition Table"></a></p>
<p><em>列出新的分区表</em></p>
<p>提示：如果你添加了一块物理磁盘，你可能会发现分区已经创建了。此种情况下，你可以在使用 <code>parted</code> 之前使用 <code>fdisk</code> 删除它。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk /dev/xvdd</span>

</code></pre><p>在命令中使用 <code>d</code> 开关删除分区，使用 <code>w</code> 保存更改并退出。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/04/Delete-Linux-Partition.png"><img src="https://p4.ssl.qhimg.com/t017e88cf8eee854388.png" alt="Delete Linux Partition"></a></p>
<p><em>删除 Linux 分区</em></p>
<p><strong>重要：在删除分区时你需要小心点。这会擦除磁盘上的数据。</strong></p>
<p>现在是使用 <code>parted</code> 命令分区新的磁盘了。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> parted /dev/xvdd</span>

</code></pre><p>将分区表格式化成 GPT</p>
<pre><code class="hljs lisp">(<span class="hljs-name">parted</span>) mklabel gpt

</code></pre><p>创建主分区并分配磁盘容量，这里我使用 20GB （在你这里可能是 2TB）。</p>
<pre><code class="hljs lisp">(<span class="hljs-name">parted</span>) mkpart primary <span class="hljs-number">0</span>GB <span class="hljs-number">20</span>GB

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/04/Create-Partition-using-Parted.png"><img src="https://p3.ssl.qhimg.com/t01bcf43b1cafd74e42.png" alt="Create Partition using Parted"></a></p>
<p><em>使用 parted 创建分区</em></p>
<p>出于好奇，让我们用 <code>fdisk</code> 看看新的分区。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk /dev/xvdd</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/04/Verify-Partition-Details.png"><img src="https://p0.ssl.qhimg.com/t012eade7ac53bc73cb.png" alt="Verify Partition Details"></a></p>
<p><em>验证分区细节</em></p>
<p>现在格式化并挂载分区，并在 <code>/etc/fstab</code> 添加相同的信息，它控制在系统启动时挂载文件系统。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkfs.ext4 /dev/xvdd1</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/04/Format-Linux-Partition.png"><img src="https://p2.ssl.qhimg.com/t010e23d97817571472.png" alt="Format Linux Partition"></a></p>
<p><em>格式化 Linux 分区</em></p>
<p>一旦分区格式化之后，是时候在 <code>/data1</code> 下挂载分区了。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mount /dev/xvdd1 /data1</span>

</code></pre><p>要永久挂载，在 <code>/etc/fstab</code> 添加条目。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-string">/dev/xvdd1</span>     <span class="hljs-string">/data1</span>      ext4      defaults  0   0

</code></pre><p>重要：要使用 GPT 分区格式需要内核支持。默认上 RHEL/CentOS 的内核已经支持 GPT，但是对于 Debian/Ubuntu，你需要在修改配置之后重新编译内核。</p>
<p>就是这样了！在本文中，我们向你展示了如何使用 <code>parted</code> 命令。与我们分享你的评论和反馈。</p>
<hr>
<p>作者简介：</p>
<p>我在包括 IBM-AIX、Solaris、HP-UX 以及 ONTAP 和 OneFS 存储技术的不同平台上工作，并掌握 Oracle 数据库。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/add-disk-larger-than-2tb-to-an-existing-linux/">http://www.tecmint.com/add-disk-larger-than-2tb-to-an-existing-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/lakshmi/">Lakshmi Dhandapani</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中添加一块大于 2TB 的新磁盘

## 原文链接
[https://www.zcfy.cc/article/how-to-add-a-new-disk-larger-than-2tb-to-an-existing-linux](https://www.zcfy.cc/article/how-to-add-a-new-disk-larger-than-2tb-to-an-existing-linux)


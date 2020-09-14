---
title: '如何在现有的 Linux 系统上添加新的磁盘' 
date: 2019-01-23 2:30:08
hidden: true
slug: losxvcdu2t7
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在现有的-linux-系统上添加新的磁盘"></a>如何在现有的 Linux 系统上添加新的磁盘</h1>
<p>作为一个系统管理员，我们会有这样的一些需求：作为升级服务器容量的一部分，或者有时出现磁盘故障时更换磁盘，我们需要将新的硬盘配置到现有服务器。</p>
<p>在这篇文章中，我会向你逐步介绍添加新硬盘到现有 <strong>RHEL/CentOS</strong> 或者 <strong>Debian/Ubuntu Linux</strong> 系统的步骤。</p>
<p><strong>推荐阅读：</strong> <a href="https://linux.cn/article-8398-1.html">如何将超过 2TB 的新硬盘添加到现有 Linux</a>。</p>
<p>重要：请注意这篇文章的目的只是告诉你如何创建新的分区，而不包括分区扩展或者其它选项。</p>
<p>我使用 <a href="http://www.tecmint.com/fdisk-commands-to-manage-linux-disk-partitions/">fdisk 工具</a> 完成这些配置。</p>
<p>我已经添加了一块 <strong>20GB</strong> 容量的硬盘，挂载到了 <code>/data</code> 分区。</p>
<p><code>fdisk</code> 是一个在 Linux 系统上用于显示和管理硬盘和分区命令行工具。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk -l</span>

</code></pre><p>这个命令会列出当前分区和配置。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Find-Linux-Partition-Details.png"><img src="https://p1.ssl.qhimg.com/t015ee1b5c4f41d8815.png" alt="查看 Linux 分区详情"></a></p>
<p><em>查看 Linux 分区详情</em></p>
<p>添加了 20GB 容量的硬盘后，<code>fdisk -l</code> 的输出像下面这样。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk -l</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Find-New-Partition-Details.png"><img src="https://p2.ssl.qhimg.com/t015787a5ed81a8cad3.png" alt="查看新分区详情"></a></p>
<p><em>查看新分区详情</em></p>
<p>新添加的磁盘显示为 <code>/dev/xvdc</code>。如果我们添加的是物理磁盘，基于磁盘类型它会显示为类似 <code>/dev/sda</code>。这里我使用的是虚拟磁盘。</p>
<p>要在特定硬盘上分区，例如 <code>/dev/xvdc</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> fdisk /dev/xvdc</span>

</code></pre><p>常用的 fdisk 命令。</p>
<ul>
<li><code>n</code> - 创建分区</li>
<li><code>p</code> - 打印分区表</li>
<li><code>d</code> - 删除一个分区</li>
<li><code>q</code> - 不保存更改退出</li>
<li><code>w</code> - 保存更改并退出</li>
</ul>
<p>这里既然我们是要创建一个分区，就用 <code>n</code> 选项。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Create-New-Partition-in-Linux.png"><img src="https://p4.ssl.qhimg.com/t01c1d5dc00bb7894b6.png" alt="在 Linux 上创建新分区"></a></p>
<p><em>在 Linux 上创建新分区</em></p>
<p>创建主分区或者扩展分区。默认情况下我们最多可以有 4 个主分区。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Create-Primary-Partition.png"><img src="https://p4.ssl.qhimg.com/t01ae2f7edf514646ae.png" alt="创建主分区"></a></p>
<p><em>创建主分区</em></p>
<p>按需求输入分区编号。推荐使用默认的值 <code>1</code>。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Assign-a-Partition-Number.png"><img src="https://p5.ssl.qhimg.com/t014e5a7f1098d4f7ff.png" alt="分配分区编号"></a></p>
<p><em>分配分区编号</em></p>
<p>输入第一个扇区的大小。如果是一个新的磁盘，通常选择默认值。如果你是在同一个磁盘上创建第二个分区，我们需要在前一个分区的最后一个扇区的基础上加 <code>1</code>。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Assign-Sector-to-Partition.png"><img src="https://p3.ssl.qhimg.com/t0181e9ecefea8aabd2.png" alt="为分区分配扇区"></a></p>
<p><em>为分区分配扇区</em></p>
<p>输入最后一个扇区或者分区大小的值。通常推荐输入分区的大小。总是添加前缀 <code>+</code> 以防止值超出范围错误。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Assign-Partition-Size.png"><img src="https://p0.ssl.qhimg.com/t01986815230ca607f7.png" alt="分配分区大小"></a></p>
<p><em>分配分区大小</em></p>
<p>保存更改并退出。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Save-Partition-Changes.png"><img src="https://p4.ssl.qhimg.com/t01804aba0728ce08f7.png" alt="保存分区更改"></a></p>
<p><em>保存分区更改</em></p>
<p>现在使用 <strong>mkfs</strong> 命令格式化磁盘。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkfs.ext4 /dev/xvdc1</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Format-New-Partition.png"><img src="https://p0.ssl.qhimg.com/t0153f20241a154482e.png" alt="格式化新分区"></a></p>
<p><em>格式化新分区</em></p>
<p>格式化完成后，按照下面的命令挂载分区。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mount /dev/xvdc1 /data</span>

</code></pre><p>在 <code>/etc/fstab</code> 文件中添加条目以便永久启动时自动挂载。</p>
<pre><code class="hljs haskell">/dev/xvdc1    /<span class="hljs-class"><span class="hljs-keyword">data</span>    ext4    defaults     0   0</span>

</code></pre><h5><a href="#总结"></a>总结</h5>
<p>现在你知道如何使用 <a href="http://www.tecmint.com/fdisk-commands-to-manage-linux-disk-partitions/">fdisk 命令</a> 在新磁盘上创建分区并挂载了。</p>
<p>当处理分区、尤其是编辑已配置磁盘的时候，我们需要格外的小心。请分享你的反馈和建议吧。</p>
<hr>
<p>作者简介：</p>
<p>我的工作内容包括 IBM-AIX、Solaris、HP-UX 多种平台以及存储技术 ONTAP 和 OneFS，并具有 Oracle 数据库的经验。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/add-new-disk-to-an-existing-linux/">http://www.tecmint.com/add-new-disk-to-an-existing-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/lakshmi/">Lakshmi Dhandapani</a> 译者：<a href="https://github.com/ictlyh">ictlyh</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在现有的 Linux 系统上添加新的磁盘

## 原文链接
[https://www.zcfy.cc/article/how-to-add-a-new-disk-to-an-existing-linux-server](https://www.zcfy.cc/article/how-to-add-a-new-disk-to-an-existing-linux-server)


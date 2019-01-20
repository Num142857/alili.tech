---
title: '如何在 Ubuntu 上使用 ZFS 文件系统' 
date: 2019-01-21 2:30:06
hidden: true
slug: p69fqotuq7c
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-上使用-zfs-文件系统"></a>如何在 Ubuntu 上使用 ZFS 文件系统</h1>
<p>在 Linux 系统上，有大量的<a href="https://www.maketecheasier.com/best-linux-filesystem-for-ssd/">文件系统</a>可以使用，那么我们为什么还要尝试一个新的文件系统？它们都工作的很好，不是吗？但是它们并不完全相同，其中的一些文件系统具有非常突出的优点，例如 ZFS。</p>
<h3><a href="#为什么选择-zfs"></a>为什么选择 ZFS</h3>
<p>ZFS 非常的优秀。这是一个真正现代的文件系统，内置的功能对于处理大量的数据很有意义。</p>
<p>现在，如果您正在考虑将 ZFS 用于您的超高速 NVMe SSD，这可能不是一个最佳选择。 它比别的文件系统要慢，不过，这完全没有问题， 它旨在存储大量的数据并保持安全。</p>
<p>ZFS 消除了建立传统 RAID 阵列（LCTT 译注：独立磁盘冗余阵列）的需要。 相反，您可以创建 ZFS 池，甚至可以随时将驱动器添加到这些池中。 ZFS 池的行为操作与 RAID 几乎完全相同，但功能内置于文件系统中。</p>
<p>ZFS 也可以替代 LVM （LCTT 译注：逻辑盘卷管理），使您能够动态地进行分区和管理分区，而无需处理底层的细节，也不必担心相关的风险。</p>
<p>这也是一个 CoW （LCTT 译注：写时复制）文件系统。 这里不会提及太多的技术性，这意味着 ZFS 可以保护您的数据免受逐渐损坏的影响。 ZFS 会创建文件的校验和，并允许您将这些文件回滚到以前的工作版本。</p>
<h3><a href="#安装-zfs"></a>安装 ZFS</h3>
<p><a href="https://camo.githubusercontent.com/5fdb23e7e180a0932f41ab6abf23e9e82e7fe7f5/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f30392f7a66732d696e7374616c6c2e6a7067"><img src="https://p0.ssl.qhimg.com/t0195d6ea2e08e90834.jpg" alt="Install ZFS on Ubuntu" title="Install ZFS on Ubuntu"></a></p>
<p>在 Ubuntu 上安装 ZFS 非常简单，但对于 Ubuntu LTS （LCTT 译注：长时间支持版本）和最新版本来说，这个过程稍有不同。</p>
<p><strong>Ubuntu 16.04 LTS</strong></p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> zfs

</code></pre><p><strong>Ubuntu 17.04 及以后</strong></p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> zfsutils

</code></pre><p>当你安装好程序后，可以使用 ZFS 提供的工具创建 ZFS 驱动器和分区。</p>
<h3><a href="#创建池"></a>创建池</h3>
<p><a href="https://camo.githubusercontent.com/fd05affb5de721238827c4af402a135da43ac901/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f30392f7a66732d6372656174652d706f6f6c2e6a7067"><img src="https://p0.ssl.qhimg.com/t01262e9604a535d812.jpg" alt="Create ZFS Pool" title="Create ZFS Pool"></a></p>
<p>在 ZFS 中，池大致相当于 RAID 。 它们很灵活且易于操作。</p>
<h4><a href="#raid0"></a>RAID0</h4>
<p>RAID0 只是把你的硬盘集中到一个池子里面，就像一个巨大的驱动器一样。 它可以提高你的驱动器速度，（LCTT 译注：数据条带化后，并行访问，可以提高文件读取速度）但是如果你的驱动器有损坏，你可能会失丢失数据。</p>
<p>要使用 ZFS 实现 RAID0，只需创建一个普通的池。</p>
<pre><code class="hljs awk">sudo zpool create your-pool <span class="hljs-regexp">/dev/</span>sdc <span class="hljs-regexp">/dev/</span>sdd

</code></pre><h4><a href="#raid1镜像"></a>RAID1（镜像）</h4>
<p>您可以在 ZFS 中使用 <code>mirror</code> 关键字来实现 RAID1 功能。 RAID1 会创建一个一对一的驱动器副本。 这意味着您的数据一直在备份。 它也提高了性能。 当然，你将一半的存储空间用于了复制。</p>
<pre><code class="hljs routeros">sudo zpool create your-pool<span class="hljs-built_in"> mirror </span>/dev/sdc /dev/sdd

</code></pre><h4><a href="#raid5raidz1"></a>RAID5/RAIDZ1</h4>
<p>ZFS 将 RAID5 功能实现为 RAIDZ1。 RAID5 要求驱动器至少是 3 个。并允许您通过将备份奇偶校验数据写入驱动器空间的 1/n（n 是驱动器数），留下的是可用的存储空间。 如果一个驱动器发生故障，阵列仍将保持联机状态，但应尽快更换发生故障的驱动器（LCTT 译注：与原文翻译略有不同，原文是驱动器的数目是三的倍数，根据 wiki， RAID5 至少需要 3 块驱动器，也可以从下面的命令中猜测)。</p>
<pre><code class="hljs awk">sudo zpool create your-pool raidz1 <span class="hljs-regexp">/dev/</span>sdc <span class="hljs-regexp">/dev/</span>sdd <span class="hljs-regexp">/dev/</span>sde

</code></pre><h4><a href="#raid6raidz2"></a>RAID6/RAIDZ2</h4>
<p>RAID6 与 RAID5 几乎完全相同，但它至少需要四个驱动器。 它将奇偶校验数据加倍，最多允许两个驱动器损坏，而不会导致阵列关闭（LCTT 译注：这里也与原文略有出入，原文是驱动器的数目是四的倍数，根据 wiki ，RAID6 至少需要四个驱动器)。</p>
<pre><code class="hljs awk">sudo zpool create your-pool raidz2 <span class="hljs-regexp">/dev/</span>sdc <span class="hljs-regexp">/dev/</span>sdd <span class="hljs-regexp">/dev/</span>sde <span class="hljs-regexp">/dev/</span>sdf

</code></pre><h4><a href="#raid10条带化镜像"></a>RAID10（条带化镜像）</h4>
<p>RAID10 旨在通过数据条带化提高存取速度和数据冗余来成为一个两全其美的解决方案。 你至少需要四个驱动器，但只能使用一半的空间。 您可以通过在同一个池中创建两个镜像来创建 RAID10 中的池（LCTT 译注：这里也与原文略有出入，原文是驱动器的数目是四的倍数，根据 wiki， RAID10 至少需要四个驱动器）。</p>
<pre><code class="hljs routeros">sudo zpool create your-pool<span class="hljs-built_in"> mirror </span>/dev/sdc /dev/sdd<span class="hljs-built_in"> mirror </span>/dev/sde /dev/sdf

</code></pre><h3><a href="#池的操作"></a>池的操作</h3>
<p><a href="https://camo.githubusercontent.com/1719ac90253de57a9bfcee03c20dff14c8eb4018/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f30392f7a66732d706f6f6c2d7374617475732e6a7067"><img src="https://p0.ssl.qhimg.com/t011783998b3a4a8681.jpg" alt="ZFS pool Status" title="ZFS pool Status"></a></p>
<p>还有一些管理工具，一旦你创建了你的池，你就必须使用它们来操作。 首先，检查你的池的状态。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo zpool status</span>

</code></pre><h4><a href="#更新"></a>更新</h4>
<p>当你更新 ZFS 时，你也需要更新你的池。 当您检查它们的状态时，您的池会通知您任何更新。 要更新池，请运行以下命令。</p>
<pre><code class="hljs routeros">sudo zpool<span class="hljs-built_in"> upgrade </span>your-pool

</code></pre><p>你也可以更新全部池。</p>
<pre><code class="hljs routeros">sudo zpool<span class="hljs-built_in"> upgrade </span>-a

</code></pre><h4><a href="#添加驱动器"></a>添加驱动器</h4>
<p>您也可以随时将驱动器添加到池中。 告诉 <code>zpool</code> 池的名称和驱动器的位置，它会处理好一切。</p>
<pre><code class="hljs dockerfile">sudo zpool <span class="hljs-keyword">add</span><span class="bash"> your-pool /dev/sdx
</span>
</code></pre><h3><a href="#其它的一些想法"></a>其它的一些想法</h3>
<p><a href="https://camo.githubusercontent.com/26f288973f6d1f249767f120810d1e6c9fc428fc/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f30392f7a66732d706f6f6c2d6f70656e2e6a7067"><img src="https://p0.ssl.qhimg.com/t01588a08d1a59636ca.jpg" alt="ZFS in File Browser" title="ZFS in File Browser"></a></p>
<p>ZFS 会在您的池的根文件系统中创建一个目录。 您可以使用 GUI 文件管理器或 CLI 按名称浏览它们。</p>
<p>ZFS 非常强大，还有很多其它的东西可以用它来做，但这些都是基础。 这是一个优秀的存储负载文件系统，即使它只是一个用于文件的硬盘驱动器的 RAID 阵列。 ZFS 在 NAS 系统上也非常出色。</p>
<p>无论 ZFS 的稳定性和可靠性如何，在您的硬盘上实施新的功能时，最好备份您的数据。</p>
<hr>
<p>via: <a href="https://www.maketecheasier.com/use-zfs-filesystem-ubuntu-linux/">https://www.maketecheasier.com/use-zfs-filesystem-ubuntu-linux/</a></p>
<p>作者：<a href="https://www.maketecheasier.com/author/nickcongleton/">Nick Congleton</a> 译者：<a href="https://github.com/amwps290">amwps290</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu 上使用 ZFS 文件系统

## 原文链接
[https://www.zcfy.cc/article/how-to-use-the-zfs-filesystem-on-ubuntu-linux](https://www.zcfy.cc/article/how-to-use-the-zfs-filesystem-on-ubuntu-linux)


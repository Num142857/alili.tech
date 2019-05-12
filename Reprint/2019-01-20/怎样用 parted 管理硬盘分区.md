---
title: '怎样用 parted 管理硬盘分区' 
date: 2019-01-20 2:30:11
hidden: true
slug: yix6kukb02i
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#怎样用-parted-管理硬盘分区"></a>怎样用 parted 管理硬盘分区</h1>
<p>众所周知，对硬盘分区是 Linux 管理员一项最重要的管理任务之一，他们不能不知道这个。</p>
<p>在最糟糕的时候，你至少每周会收到一次依赖小组的请求，而在更大的环境里会更加频繁 。</p>
<p>你可能会问为什么我们要用 <code>parted</code> 而不是 <code>fdisk</code>？ 它们有什么区别？好问题，我会告诉你这两者的区别。</p>
<ul>
<li><code>parted</code> 支持用户在大于 2TB 的硬盘上创建硬盘分区， 但 <code>fdisk</code> 命令不支持</li>
<li>对比 <code>fdisk</code> 来说，<code>parted</code> 是一个更高级的工具</li>
<li>支持更多的分区表类型，包括 GPT （LCTT 译注：全局唯一标识分区表）</li>
<li>它允许用户调整分区大小， 但当缩减分区空间的时候，它没有如我意料的工作，多数情况下我会得到错误消息。所以我会建议用户不要用 <code>parted</code> 来缩减分区大小。</li>
</ul>
<h3><a href="#什么是-parted"></a>什么是 parted</h3>
<p><code>parted</code> 是一个操作硬盘分区的程序。它支持多种分区表类型，包括 MS-DOS 和 GPT。</p>
<p>它允许用户创建、删除、调整、缩减、移动和复制分区，以及重新组织硬盘的使用，复制数据到新的硬盘上。<code>gparted</code> 是 <code>parted</code> 的图形界面前端。</p>
<h3><a href="#怎样安装-parted"></a>怎样安装 parted</h3>
<p>大部分发行版已经预安装了 <code>parted</code>。如果没有，用下列命令来安装 <code>parted</code>。</p>
<p>对于 Debian/Ubuntu 用户, 使用 <a href="https://www.2daygeek.com/apt-get-apt-cache-command-examples-manage-packages-debian-ubuntu-systems/">APT-GET 命令</a> 或者 <a href="https://www.2daygeek.com/apt-command-examples-manage-packages-debian-ubuntu-systems/">APT 命令</a> 来安装 <code>parted</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install parted</span>

</code></pre><p>对于 RHEL/CentOS 用户，用 <a href="https://www.2daygeek.com/yum-command-examples-manage-packages-rhel-centos-systems/">YUM 命令</a> 来安装 <code>parted</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum install parted</span>

</code></pre><p>对于 Fedora 用户，用 <a href="https://www.2daygeek.com/dnf-command-examples-manage-packages-fedora-system/">DNF 命令</a> 来安装 <code>parted</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo dnf install parted</span>

</code></pre><p>对于 Arch Linux 用户，用 <a href="https://www.2daygeek.com/pacman-command-examples-manage-packages-arch-linux-system/">Pacman 命令</a>来安装 <code>parted</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo pacman -S parted</span>


</code></pre><p>对于 openSUSE 用户， 用 <a href="https://www.2daygeek.com/zypper-command-examples-manage-packages-opensuse-system/">Zypper 命令</a>来安装 <code>parted</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo zypper <span class="hljs-keyword">in</span> parted</span>

</code></pre><h3><a href="#怎样启动-parted"></a>怎样启动 parted</h3>
<p>下面的 <code>parted</code> 命令会自动选择 <code>/dev/sda</code> ，因为这是系统的第一个硬盘。</p>
<pre><code class="hljs oxygene">$ sudo parted
GNU parted <span class="hljs-number">3.2</span>
<span class="hljs-keyword">Using</span> /dev/sda
Welcome <span class="hljs-keyword">to</span> GNU parted! <span class="hljs-keyword">Type</span> <span class="hljs-string">'help'</span> <span class="hljs-keyword">to</span> view a list <span class="hljs-keyword">of</span> commands.
(parted)

</code></pre><p>同时我们也可以用下面的命令来重新选择对应的的硬盘。</p>
<pre><code class="hljs lisp">(<span class="hljs-name">parted</span>) select /dev/sdb
Using /dev/sdb
(<span class="hljs-name">parted</span>)

</code></pre><p>如果你想选择特定的硬盘, 用下列的格式来输入命令。 这次 ，我们将选择 <code>/dev/sdb</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo parted [Device Name]</span>

</code></pre><pre><code class="hljs oxygene">$ sudo parted /dev/sdb
GNU parted <span class="hljs-number">3.2</span>
<span class="hljs-keyword">Using</span> /dev/sdb
Welcome <span class="hljs-keyword">to</span> GNU parted! <span class="hljs-keyword">Type</span> <span class="hljs-string">'help'</span> <span class="hljs-keyword">to</span> view a list <span class="hljs-keyword">of</span> commands.
(parted)

</code></pre><h3><a href="#怎样用-parted-列出所有可用的硬盘"></a>怎样用 parted 列出所有可用的硬盘</h3>
<p>如果你不知道你的电脑上有什么硬盘，只需要运行下列命令，该命令会显示所有可用硬盘的名字，以及其它的有用信息比如储存空间、型号、扇区大小、硬盘标志以及分区信息。</p>
<pre><code class="hljs routeros">$ sudo parted -l
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sda: 32.2GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 1 1049kB 32.2GB 32.2GB primary ext4 boot


Error: /dev/sdb: unrecognised disk label
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: unknown
Disk Flags:

</code></pre><p>上面的错误信息清晰地显示出硬盘 <code>/dev/sdb</code> 没有有效的磁盘标签disk label。 它不会自动得到磁盘标签，所以， 我们便要自己设置硬盘标签。</p>
<h3><a href="#怎样用-parted-创建硬盘分区"></a>怎样用 parted 创建硬盘分区</h3>
<p><code>parted</code> 允许用户创建主分区或者拓展分区。创建这两种类型的分区的步骤还是一样，但请确保你已经指定了需要的分区类型，比如 <code>primary</code> （主分区）或者 <code>extended</code> （扩展分区）。</p>
<p>为了演示这项操作 ，我们安装了一个新的 <code>50 GB</code> 的硬盘到到电脑上，挂载在 <code>/dev/sdb</code> 上。</p>
<p>有两种方法创建分区，第一种是更详细的方法，另一种只是一个命令。 在下面的例子中，我们将用更详细的方法添加一个主分区。提醒一下， 我们应该先设置磁盘标签，因为它不会自动设置任何标签。</p>
<p>在下面的例子中，我们将要创建一个 <code>10 GB</code> 的分区</p>
<pre><code class="hljs vim">$ sudo parted /dev/sdb
GNU parted <span class="hljs-number">3.2</span>
Using /dev/sdb
Welcome <span class="hljs-keyword">to</span> GNU parted! Type <span class="hljs-string">'help'</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">view</span> <span class="hljs-keyword">a</span> <span class="hljs-keyword">list</span> of commands.
(parted) mklabel msdos
(parted) unit GB
(parted) mkpart
Partition <span class="hljs-built_in">type</span>? primary/extended? primary
File <span class="hljs-built_in">system</span> <span class="hljs-built_in">type</span>? [ext2]? ext4
Start? <span class="hljs-number">0.00</span>GB
End? <span class="hljs-number">10.00</span>GB
(parted) <span class="hljs-keyword">print</span>
Mode<span class="hljs-variable">l:</span> ATA VBOX HARDDISK (scsi)
Disk /dev/sd<span class="hljs-variable">b:</span> <span class="hljs-number">53.7</span>GB
Sector size (logical/physical): <span class="hljs-number">512</span>B/<span class="hljs-number">512</span>B
Partition Table: msdos
Disk Flag<span class="hljs-variable">s:</span>

Number Start End Size Type File <span class="hljs-built_in">system</span> Flags
 <span class="hljs-number">1</span> <span class="hljs-number">0.00</span>GB <span class="hljs-number">10.0</span>GB <span class="hljs-number">10.0</span>GB primary ext4 lba

(parted) <span class="hljs-keyword">quit</span>
Information: You may need <span class="hljs-keyword">to</span> <span class="hljs-keyword">update</span> /etc/fstab.

</code></pre><p>同时，我们也可以使用单条 <code>parted</code> 命令</p>
<p>在下面的例子中，我们将在硬盘上创建一个 <code>10 GB</code> 的分区。</p>
<pre><code class="hljs accesslog">$ sudo parted <span class="hljs-string">[Disk Name]</span> <span class="hljs-string">[mkpart]</span> <span class="hljs-string">[Partition Type]</span> <span class="hljs-string">[Filesystem Type]</span> <span class="hljs-string">[Partition Start Size]</span> <span class="hljs-string">[Partition End Size]</span>

</code></pre><pre><code class="hljs dts">$ sudo parted <span class="hljs-meta-keyword">/dev/</span>sdb mkpart primary ext4 <span class="hljs-number">10.0</span>GB <span class="hljs-number">20.0</span>GB
<span class="hljs-symbol">Information:</span> You may need to update <span class="hljs-meta-keyword">/etc/</span>fstab.

</code></pre><h3><a href="#怎样使用所有剩余空间创建分区"></a>怎样使用所有剩余空间创建分区</h3>
<p>你已经创建了除了 <code>/home</code> 之外等所有要求的分区，而且你想要用硬盘上所有剩余的空间来创建 <code>/home</code> 分区，要怎样做？可以使用下面的命令来创建分区。</p>
<p>下面的命令创建了一个 33.7 GB 的分区，从 <code>20 GB</code> 开始到 <code>53 GB</code> 结束。 <code>100%</code> 使用率允许用户用硬盘上所有剩余的空余空间。</p>
<pre><code class="hljs prolog">$ sudo parted [<span class="hljs-symbol">Disk</span> <span class="hljs-symbol">Name</span>] [mkpart] [<span class="hljs-symbol">Partition</span> <span class="hljs-symbol">Type</span>] [<span class="hljs-symbol">Filesystem</span> <span class="hljs-symbol">Type</span>] [<span class="hljs-symbol">Partition</span> <span class="hljs-symbol">Start</span> <span class="hljs-symbol">Size</span>] [<span class="hljs-symbol">Partition</span> <span class="hljs-symbol">End</span> <span class="hljs-symbol">Size</span>]

$ sudo parted /dev/sdb mkpart primary ext4 <span class="hljs-number">20.0</span><span class="hljs-symbol">GB</span> <span class="hljs-number">100</span><span class="hljs-comment">%</span>
<span class="hljs-symbol">Information</span>: <span class="hljs-symbol">You</span> may need to update /etc/fstab.

</code></pre><h3><a href="#怎样用-parted-列出所有的分区"></a>怎样用 parted 列出所有的分区</h3>
<p>你也许注意到了，我们已经在上述步骤中创建了三个分区，如果你想要列出所有在硬盘上可用的分区，可以使用 <code>print</code> 命令。</p>
<pre><code class="hljs routeros">$ sudo parted /dev/sdb <span class="hljs-builtin-name">print</span>
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 1 1049kB 10.0GB 9999MB primary ext4
 2 10.0GB 20.0GB 9999MB primary ext4
 3 20.0GB 53.7GB 33.7GB primary ext4

</code></pre><h3><a href="#怎样用-mkfs-格式化分区"></a>怎样用 mkfs 格式化分区</h3>
<p>用户可以用 <code>mkfs</code> 命令格式化分区。下面的步骤会用 <code>mkfs</code> 来格式化分区。</p>
<pre><code class="hljs routeros">$ sudo mkfs.ext4 /dev/sdb1
mke2fs 1.43.4 (31-Jan-2017)
Creating filesystem with 2621440 4k blocks <span class="hljs-keyword">and</span> 656640 inodes
Filesystem UUID: 415cf467-634c-4403-8c9f-47526bbaa381
Superblock backups stored on blocks:
    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632

Allocating<span class="hljs-built_in"> group </span>tables: done
Writing inode tables: done
Creating journal (16384 blocks): done
Writing superblocks <span class="hljs-keyword">and</span> filesystem<span class="hljs-built_in"> accounting </span>information: done

</code></pre><p>同样的。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo mkfs.ext4 /dev/sdb2</span>
<span class="hljs-meta">$</span><span class="bash"> sudo mkfs.ext4 /dev/sdb3</span>

</code></pre><p>创建必要的文件夹然后将这些分区挂载在上面。</p>
<pre><code class="hljs jboss-cli">$ sudo mkdir <span class="hljs-string">/par1</span> <span class="hljs-string">/par2</span> <span class="hljs-string">/par3</span>

</code></pre><pre><code class="hljs jboss-cli">$ sudo mount <span class="hljs-string">/dev/sdb1</span> <span class="hljs-string">/par1</span>
$ sudo mount <span class="hljs-string">/dev/sdb2</span> <span class="hljs-string">/par2</span>
$ sudo mount <span class="hljs-string">/dev/sdb3</span> <span class="hljs-string">/par3</span>

</code></pre><p>运行下列命令来检查是否成功挂载上新创建的分区。</p>
<pre><code class="hljs lsl">$ df -h /dev/sdb[<span class="hljs-number">1</span><span class="hljs-number">-3</span>]
Filesystem Size Used Avail Use% Mounted on
/dev/sdb1 <span class="hljs-number">9.2</span>G <span class="hljs-number">37</span>M <span class="hljs-number">8.6</span>G <span class="hljs-number">1</span>% /par1
/dev/sdb2 <span class="hljs-number">9.2</span>G <span class="hljs-number">37</span>M <span class="hljs-number">8.6</span>G <span class="hljs-number">1</span>% /par2
/dev/sdb3 <span class="hljs-number">31</span>G <span class="hljs-number">49</span>M <span class="hljs-number">30</span>G <span class="hljs-number">1</span>% /par3

</code></pre><h3><a href="#怎样检查硬盘空闲空间"></a>怎样检查硬盘空闲空间</h3>
<p>运行下列命令来检查硬盘上的空闲空间，这块硬盘上有 <code>25.7 GB</code> 的空闲空间。</p>
<pre><code class="hljs routeros">$ sudo parted /dev/sdb <span class="hljs-builtin-name">print</span> free
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 32.3kB 1049kB 1016kB Free Space
 1 1049kB 10.0GB 9999MB primary ext4
 2 10.0GB 20.0GB 9999MB primary ext4
 3 20.0GB 28.0GB 8001MB primary ext4
 28.0GB 53.7GB 25.7GB Free Space

</code></pre><h3><a href="#怎样使用-parted-命令来重新调整分区大小"></a>怎样使用 parted 命令来重新调整分区大小</h3>
<p><code>parted</code> 允许用户重新调整分区大小。不过我已在文章的开头说了，不要缩小分区大小，不然会有许多错误。</p>
<p>运行下列命令来检查硬盘分区以及所有可用空间。 可以看到硬盘上有 <code>25.7GB</code> 的可用空间。</p>
<pre><code class="hljs routeros">$ sudo parted /dev/sdb <span class="hljs-builtin-name">print</span> free
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 32.3kB 1049kB 1016kB Free Space
 1 1049kB 10.0GB 9999MB primary ext4
 2 10.0GB 20.0GB 9999MB primary ext4
 3 20.0GB 28.0GB 8001MB primary ext4
 28.0GB 53.7GB 25.7GB Free Space

</code></pre><p>运行下列命令来重新调整分区大小。 我们将要重新调整（增加）分区 3 的结束位置，从 <code>28GB</code> 到 <code>33GB</code>。</p>
<pre><code class="hljs mathematica">$ sudo parted [<span class="hljs-keyword">Disk</span> Name] [resizepart] [<span class="hljs-keyword">Partition</span> <span class="hljs-keyword">Number</span>] [<span class="hljs-keyword">Partition</span> New <span class="hljs-keyword">End</span> Size]

$ sudo parted /dev/sdb resizepart <span class="hljs-number">3</span> <span class="hljs-number">33.0</span>GB
<span class="hljs-keyword">Information</span>: You may need to update /etc/fstab.

</code></pre><p>运行下列命令来确认分区是否已经扩容。可以看到，分区 3 已经从 <code>8GB</code> 增加到 <code>13GB</code>。</p>
<pre><code class="hljs routeros">$ sudo parted /dev/sdb <span class="hljs-builtin-name">print</span>
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 1 1049kB 10.0GB 9999MB primary ext4
 2 10.0GB 20.0GB 9999MB primary ext4
 3 20.0GB 33.0GB 13.0GB primary ext4


</code></pre><p>重新调整文件系统大小。</p>
<pre><code class="hljs lsl">$ sudo resize2fs /dev/sdb3
resize2fs <span class="hljs-number">1.43</span><span class="hljs-number">.4</span> (<span class="hljs-number">31</span>-Jan<span class="hljs-number">-2017</span>)
Resizing the filesystem on /dev/sdb3 to <span class="hljs-number">3173952</span> (<span class="hljs-number">4</span>k) blocks.
The filesystem on /dev/sdb3 is now <span class="hljs-number">3173952</span> (<span class="hljs-number">4</span>k) blocks long.

</code></pre><p>最后，确认分区是否已经扩容。</p>
<pre><code class="hljs lsl">$ df -h /dev/sdb[<span class="hljs-number">1</span><span class="hljs-number">-3</span>]
Filesystem Size Used Avail Use% Mounted on
/dev/sdb1 <span class="hljs-number">9.2</span>G <span class="hljs-number">5.1</span>G <span class="hljs-number">3.6</span>G <span class="hljs-number">59</span>% /par1
/dev/sdb2 <span class="hljs-number">9.2</span>G <span class="hljs-number">2.1</span>G <span class="hljs-number">6.6</span>G <span class="hljs-number">24</span>% /par2
/dev/sdb3 <span class="hljs-number">12</span>G <span class="hljs-number">1.1</span>G <span class="hljs-number">11</span>G <span class="hljs-number">10</span>% /par3

</code></pre><h3><a href="#怎样用-parted-删除分区"></a>怎样用 parted 删除分区</h3>
<p>我们用 <code>rm</code> 命令方便地删除未使用的分区（如果该分区不会再被用到了）。下列步骤中，我们将会删除分区 3 （<code>/dev/sdb3</code>）。</p>
<pre><code class="hljs sql">$ sudo parted [Disk Name] [rm] [Partition Number]

$ sudo parted /dev/sdb rm 3
Warning: Partition /dev/sdb3 is being used. Are you sure you want to continue?
Yes/No? Yes
Error: Partition(s) 3 on /dev/sdb have been written, but we have been unable to inform the kernel of the <span class="hljs-keyword">change</span>, probably because it/they <span class="hljs-keyword">are</span> <span class="hljs-keyword">in</span> use. <span class="hljs-keyword">As</span> a <span class="hljs-keyword">result</span>, the <span class="hljs-keyword">old</span> <span class="hljs-keyword">partition</span>(s) will remain <span class="hljs-keyword">in</span> use.
You should reboot <span class="hljs-keyword">now</span> <span class="hljs-keyword">before</span> making further changes.
<span class="hljs-keyword">Ignore</span>/<span class="hljs-keyword">Cancel</span>? <span class="hljs-keyword">Ignore</span>
Information: You may need <span class="hljs-keyword">to</span> <span class="hljs-keyword">update</span> /etc/fstab.

</code></pre><p>我们也可以用下列的命令检查。可以看到，分区 3 已经被成功移除。</p>
<pre><code class="hljs routeros">$ sudo parted /dev/sdb <span class="hljs-builtin-name">print</span>
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 1 1049kB 10.0GB 9999MB primary ext4
 2 10.0GB 20.0GB 9999MB primary ext4


</code></pre><h3><a href="#怎样用-parted-命令设置更改分区标志"></a>怎样用 parted 命令设置/更改分区标志</h3>
<p>我们可以用下列的命令来轻易更改分区的标志。 我们将对 <code>/dev/sdb2</code> 设置 <code>lvm</code> 标志。</p>
<pre><code class="hljs sql">$ sudo parted [Disk Name] [<span class="hljs-keyword">set</span>] [<span class="hljs-keyword">Partition</span> <span class="hljs-built_in">Number</span>] [Flags <span class="hljs-keyword">Name</span>] [Flag <span class="hljs-keyword">On</span>/<span class="hljs-keyword">Off</span>]

$ sudo parted /dev/sdb <span class="hljs-keyword">set</span> <span class="hljs-number">2</span> lvm <span class="hljs-keyword">on</span>
Information: You may need <span class="hljs-keyword">to</span> <span class="hljs-keyword">update</span> /etc/fstab.

</code></pre><p>我们可以列出分区来验证这次的更改。</p>
<pre><code class="hljs routeros">$ sudo parted /dev/sdb <span class="hljs-builtin-name">print</span>
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 53.7GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number Start End Size<span class="hljs-built_in"> Type </span>File<span class="hljs-built_in"> system </span>Flags
 1 1049kB 10.0GB 9999MB primary ext4
 2 10.0GB 20.0GB 9999MB primary ext4 lvm


</code></pre><p>如果你想知道可用的标志，只需要用如下的命令。</p>
<pre><code class="hljs sql">$ (parted) <span class="hljs-keyword">help</span> <span class="hljs-keyword">set</span>
 <span class="hljs-keyword">set</span> <span class="hljs-built_in">NUMBER</span> FLAG STATE <span class="hljs-keyword">change</span> the FLAG <span class="hljs-keyword">on</span> <span class="hljs-keyword">partition</span> <span class="hljs-built_in">NUMBER</span>

    <span class="hljs-built_in">NUMBER</span> <span class="hljs-keyword">is</span> the <span class="hljs-keyword">partition</span> <span class="hljs-built_in">number</span> used <span class="hljs-keyword">by</span> Linux. <span class="hljs-keyword">On</span> MS-DOS disk labels, the primary <span class="hljs-keyword">partitions</span> <span class="hljs-built_in">number</span> <span class="hljs-keyword">from</span> <span class="hljs-number">1</span> <span class="hljs-keyword">to</span> <span class="hljs-number">4</span>, <span class="hljs-keyword">logical</span> <span class="hljs-keyword">partitions</span> <span class="hljs-keyword">from</span> <span class="hljs-number">5</span> onwards.
 FLAG <span class="hljs-keyword">is</span> one <span class="hljs-keyword">of</span>: boot, root, swap, hidden, raid, lvm, lba, hp-service, palo, prep, msftres, bios_grub, atvrecv, diag, legacy_boot, msftdata, irst, esp
 STATE <span class="hljs-keyword">is</span> one <span class="hljs-keyword">of</span>: <span class="hljs-keyword">on</span>, <span class="hljs-keyword">off</span>

</code></pre><p>如果你想知道 <code>parted</code> 的其它可用命令， 只需要去到 <code>help</code> 页面。</p>
<pre><code class="hljs livecodeserver">$ sudo parted
GNU parted <span class="hljs-number">3.2</span>
Using /dev/sda
Welcome <span class="hljs-built_in">to</span> GNU parted! Type <span class="hljs-string">'help'</span> <span class="hljs-built_in">to</span> view <span class="hljs-keyword">a</span> list <span class="hljs-keyword">of</span> commands.
(parted) help
 align-check TYPE N check partition N <span class="hljs-keyword">for</span> TYPE(<span class="hljs-built_in">min</span>|opt) alignment
 help [COMMAND] print general help, <span class="hljs-keyword">or</span> help <span class="hljs-keyword">on</span> <span class="hljs-title">COMMAND</span>
 mklabel,mktable LABEL-TYPE <span class="hljs-built_in">create</span> <span class="hljs-keyword">a</span> <span class="hljs-built_in">new</span> disklabel (partition table)
 mkpart PART-TYPE [FS-TYPE] START END make <span class="hljs-keyword">a</span> partition
 name NUMBER NAME name partition NUMBER <span class="hljs-keyword">as</span> NAME
 print [devices|free|list,all|NUMBER] display <span class="hljs-keyword">the</span> partition table, available devices, free <span class="hljs-literal">space</span>, all found partitions, <span class="hljs-keyword">or</span> <span class="hljs-keyword">a</span> particular partition
 quit exit program
 rescue START END rescue <span class="hljs-keyword">a</span> lost partition near START <span class="hljs-keyword">and</span> END
 resizepart NUMBER END resize partition NUMBER
 rm NUMBER <span class="hljs-built_in">delete</span> partition NUMBER
 select DEVICE choose <span class="hljs-keyword">the</span> device <span class="hljs-built_in">to</span> edit
 disk_set FLAG STATE change <span class="hljs-keyword">the</span> FLAG <span class="hljs-keyword">on</span> <span class="hljs-title">selected</span> <span class="hljs-title">device</span>
 disk_toggle [FLAG] toggle <span class="hljs-keyword">the</span> state <span class="hljs-keyword">of</span> FLAG <span class="hljs-keyword">on</span> <span class="hljs-title">selected</span> <span class="hljs-title">device</span>
 <span class="hljs-built_in">set</span> NUMBER FLAG STATE change <span class="hljs-keyword">the</span> FLAG <span class="hljs-keyword">on</span> <span class="hljs-title">partition</span> <span class="hljs-title">NUMBER</span>
 toggle [NUMBER [FLAG]] toggle <span class="hljs-keyword">the</span> state <span class="hljs-keyword">of</span> FLAG <span class="hljs-keyword">on</span> <span class="hljs-title">partition</span> <span class="hljs-title">NUMBER</span>
 unit UNIT <span class="hljs-built_in">set</span> <span class="hljs-keyword">the</span> default unit <span class="hljs-built_in">to</span> UNIT
 <span class="hljs-built_in">version</span> display <span class="hljs-keyword">the</span> <span class="hljs-built_in">version</span> <span class="hljs-built_in">number</span> <span class="hljs-keyword">and</span> copyright information <span class="hljs-keyword">of</span> GNU parted
(parted) quit

</code></pre><hr>
<p>via: <a href="https://www.2daygeek.com/how-to-manage-disk-partitions-using-parted-command/">https://www.2daygeek.com/how-to-manage-disk-partitions-using-parted-command/</a></p>
<p>作者：<a href="https://www.2daygeek.com/author/magesh/">Magesh Maruthamuthu</a> 译者：<a href="https://github.com/zyk2290">zyk2290</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怎样用 parted 管理硬盘分区

## 原文链接
[https://www.zcfy.cc/article/how-to-manage-disk-partitions-using-parted-command](https://www.zcfy.cc/article/how-to-manage-disk-partitions-using-parted-command)


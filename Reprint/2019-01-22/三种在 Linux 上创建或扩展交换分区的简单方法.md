---
title: '三种在 Linux 上创建或扩展交换分区的简单方法' 
date: 2019-01-22 2:30:08
hidden: true
slug: h9nyauglz7w
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#三种在-linux-上创建或扩展交换分区的简单方法"></a>三种在 Linux 上创建或扩展交换分区的简单方法</h1>
<p>用户可以在任何 Linux� 操作系统的安装过程中或者是其它必要的时候创建交换空间。如果你在安装 Linux 的时候忘记了创建或是你想要再增加交换分区的空间，你随时都可以再创建或增加。</p>
<p>有时候在你安装后摇升级 RAM 的时候需要增加一点交换分区的空间，比如你要将你的系统的 RAM 从 1GB 升级到 2GB 你，那么你就不得不将你的交换分区空间也升级一下（从 2GB 到 4GB），这是因为它使用的容量是物理 RAM 的双倍容量。（LCTT 译注：其实这里是个误区，交换分区不一定非得是双倍的物理内存容量，只是惯例如此。事实上，如果你的物理内存足够的话，你完全可以不用交换分区——在这里的情形下，或许你增加了物理内存，就没必要增加交换分区大小了。）</p>
<p>��交换空间是当物理内存（RAM 随机存取存储器）的用量已满时，被保留用作虚拟内存的磁盘上的空间。 如果系统在 RAM 满载时需要更多的内存资源，内存中的非活动页面将被移动到交换空间，这样可以帮助系统运行应用程序更多的时间，但不应�该把它当做 RAM 的扩展。</p>
<p>建议你创建一个专用的交换分区，但是如果你没有可用的分区，那么可以使用交换文件，或交换分区和交换文件的组合。 交换空间通常建议用户至少 4 GB，用户也可以根据自己的要求和环境创建交换空间。</p>
<p>我发现大部分 VM 和 云服务器都没有交换分区，所以在这种情况下，我们可以使用以下三种方法创建，扩展或增加交换空间。</p>
<h3><a href="#如何检测当前交换分区大小"></a>如何检测当前交换分区大小</h3>
<p>通过 <a href="http://www.2daygeek.com/free-command-to-check-memory-usage-statistics-in-linux/">free</a> &amp; <code>swapon</code> 命令来检测当前的交换分区空间的大小。 </p>
<pre><code class="hljs routeros">$ free -h
              total        used        free      shared  buff/cache   available
Mem:           2.0G        1.3G        139M         45M        483M        426M
Swap:          2.0G        655M        1.4G

$ swapon --show
NAME     <span class="hljs-built_in"> TYPE </span>     SIZE   USED PRIO
/dev/sda5 partition   2G 655.2M   -1

</code></pre><p>上面的输出显示了�当前的交换分区空间是 <code>2GB</code> 。</p>
<h3><a href="#方法-1--通过-fallocate-命令创建交换文件"></a>方法 1 : 通过 fallocate 命令创建交换文件</h3>
<p><code>fallocate</code> 程序是立即创建预分配大小的文件的最佳方法。</p>
<p>下面这个命令会创建一个 1GB 大小�的 <code>/swapfile</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo fallocate -l 1G /swapfile</span>

</code></pre><p>检查�一下创建的文件的大小是否正确。</p>
<pre><code class="hljs jboss-cli">$ <span class="hljs-keyword">ls</span> -lh <span class="hljs-string">/swapfile</span>
-rw-r<span class="hljs-params">--r--</span> 1 root root 1.0G Jun  7 09<span class="hljs-function">:49</span> <span class="hljs-string">/swapfile</span>

</code></pre><p>将该文件的权限设置为 <code>600</code> 这样只有 root 用户可以�访问这个文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo chmod 600 /swapfile</span>

</code></pre><p>通过�运行以下的命令来将此文件�转换为交换文件。</p>
<pre><code class="hljs lsl">$ sudo mkswap /swapfile
Setting up swapspace version <span class="hljs-number">1</span>, size = <span class="hljs-number">1024</span> MiB (<span class="hljs-number">1073737728</span> bytes)
no label, UUID=cda50e0e<span class="hljs-number">-41</span>f3<span class="hljs-number">-49</span>c7-af61-b8cb4a33a464

</code></pre><p>通过运行以下的命令来使交换文件生效。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo swapon /swapfile</span>

</code></pre><p>将新创建的交换文件添加到 <code>fstab</code> 文件中，这样交换分区空间�的修改即使在重启后也可以生效。</p>
<pre><code class="hljs avrasm">$ vi /etc/fstab

/swapfile  <span class="hljs-keyword">swap</span>  <span class="hljs-keyword">swap</span>  defaults  <span class="hljs-number">0</span> <span class="hljs-number">0</span>

</code></pre><p>检查一下新创建的交换文件。</p>
<pre><code class="hljs routeros">$ swapon --show
NAME     <span class="hljs-built_in"> TYPE </span>      SIZE   USED PRIO
/dev/sda5 partition    2G 657.8M   -1
/swapfile file      1024M     0B   -2

</code></pre><p>现在�我可以看到一个新的  1GB 的 <code>/swapfile1</code> 文件了。重启系统以使新的交换文件生效。</p>
<h3><a href="#方法-2--通过-dd-命令来创建交换文件"></a>方法 2 : 通过 dd 命令来创建交换文件</h3>
<p><code>dd</code> 命令是另一个实用程序，可以帮助我们立即创建预分配大小的文件。</p>
<p>以下 dd 命令将创建 1GB 的 <code>/swapfile1</code>。</p>
<pre><code class="hljs lsl">$ sudo dd if=/dev/zero of=/swapfile1 bs=<span class="hljs-number">1</span>G count=<span class="hljs-number">1</span>
<span class="hljs-number">1</span>+<span class="hljs-number">0</span> records in
<span class="hljs-number">1</span>+<span class="hljs-number">0</span> records out
<span class="hljs-number">1073741824</span> bytes (<span class="hljs-number">1.1</span> GB, <span class="hljs-number">1.0</span> GiB) copied, <span class="hljs-number">16.6154</span> s, <span class="hljs-number">64.6</span> MB/s

</code></pre><p><strong>详解：</strong></p>
<ul>
<li><code>if=/dev/zero</code> 是输入文件，<code>/dev/zero</code> 是类 Unix 操作系统中的一个特殊文件，它提供从它读取的尽可能多的空字符（ASCII NUL，0x00）。</li>
<li><code>of=/swapfile1</code> �设置输出文件。</li>
<li><code>bs=1G</code> 一次性读写的�大小为 1GB</li>
<li><code>count=1</code> 仅复制一个输入块</li>
</ul>
<p>检查�一下创建的文件的大小是否正确。</p>
<pre><code class="hljs jboss-cli">$ <span class="hljs-keyword">ls</span> -lh <span class="hljs-string">/swapfile1</span>
-rw-r<span class="hljs-params">--r--</span> 1 root root 1.0G Jun  7 09<span class="hljs-function">:58</span> <span class="hljs-string">/swapfile1</span>

</code></pre><p>将该文件的权限设置为 <code>600</code> 这样只有 root 用户可以�访问这个文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo chmod 600 /swapfile1</span>

</code></pre><p>通过�运行以下的命令来将此文件�转换为交换文件。</p>
<pre><code class="hljs lsl">$ sudo mkswap /swapfile1
Setting up swapspace version <span class="hljs-number">1</span>, size = <span class="hljs-number">1024</span> MiB (<span class="hljs-number">1073737728</span> bytes)
no label, UUID=<span class="hljs-number">96</span>def6d7-b2da<span class="hljs-number">-4954</span>-aa72-aa32316ec993

</code></pre><p>通过运行以下的命令来使交换文件生效。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo swapon /swapfile1</span>

</code></pre><p>将新创建的交换文件添加到 <code>fstab</code> 文件中，这样交换分区空间�的修改即使在重启后也可以生效。</p>
<pre><code class="hljs avrasm">$ vi /etc/fstab

/swapfile1  <span class="hljs-keyword">swap</span>  <span class="hljs-keyword">swap</span>  defaults  <span class="hljs-number">0</span> <span class="hljs-number">0</span>

</code></pre><p>检查新创建的交换文件。</p>
<pre><code class="hljs routeros">$ swapon --show
NAME      <span class="hljs-built_in"> TYPE </span>      SIZE USED PRIO
/dev/sda5  partition    2G 1.3G   -1
/swapfile  file      1024M   0B   -2
/swapfile1 file      1024M   0B   -3

</code></pre><p>现在�我可以看到一个新的  1GB 的 <code>/swapfile1</code> 了。重启系统以使新的交换文件生效。</p>
<h3><a href="#方法-3--通过硬盘分区来创建交换文件"></a>方法 3 : 通过硬盘分区来创建�交换文件</h3>
<p>我们也推荐使用通过硬盘分区的方式来创建交换分区。</p>
<p>如果你已经在你的另一个硬盘上通过 <code>fdisk</code> 命令创建了一个新的分区，假设我们已经创建了一个叫做 <code>/dev/sda4</code> 的分区。</p>
<p>使用 <code>mkswap</code> 命令来将这个分区转换成交换�分区。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo mkswap /dev/sda4</span>

</code></pre><p>通过�运行以下命令来使交换文件生效。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo swapon /dev/sda4</span>

</code></pre><p>把新增的交换文件添加到 <code>fstab</code> 文件中，这样即使是重启了系统交换分区的�修改也能生效。</p>
<pre><code class="hljs avrasm">$ vi /etc/fstab

/dev/sda4  <span class="hljs-keyword">swap</span>  <span class="hljs-keyword">swap</span>  defaults  <span class="hljs-number">0</span> <span class="hljs-number">0</span>

</code></pre><p>检查新创建的交换文件。</p>
<pre><code class="hljs lsl">$ swapon --show
NAME       TYPE       SIZE USED PRIO
/dev/sda5  partition    <span class="hljs-number">2</span>G <span class="hljs-number">1.3</span>G   <span class="hljs-number">-1</span>
/swapfile  file      <span class="hljs-number">1024</span>M   <span class="hljs-number">0</span>B   <span class="hljs-number">-2</span>
/swapfile1 file      <span class="hljs-number">1024</span>M   <span class="hljs-number">0</span>B   <span class="hljs-number">-3</span>
/dev/sda4  partition    <span class="hljs-number">1</span>G   <span class="hljs-number">0</span>B   <span class="hljs-number">-4</span>

</code></pre><p>我可以看到新的交换分区 1GB 的 <code>/dev/sda4</code>。重启系统就可以使用新的交换分区了。</p>
<hr>
<p>via: <a href="http://www.2daygeek.com/add-extend-increase-swap-space-memory-file-partition-linux/">http://www.2daygeek.com/add-extend-increase-swap-space-memory-file-partition-linux/</a></p>
<p>作者：<a href="http://www.2daygeek.com/author/2daygeek/">2DAYGEEK</a> 译者：<a href="https://github.com/chenxinlong">chenxinlong</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
三种在 Linux 上创建或扩展交换分区的简单方法

## 原文链接
[https://www.zcfy.cc/article/3-easy-ways-to-create-or-extend-swap-space-in-linux](https://www.zcfy.cc/article/3-easy-ways-to-create-or-extend-swap-space-in-linux)


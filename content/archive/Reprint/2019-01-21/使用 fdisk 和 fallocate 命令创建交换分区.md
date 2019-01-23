---
title: '使用 fdisk 和 fallocate 命令创建交换分区' 
date: 2019-01-21 2:30:06
hidden: true
slug: 1csjhl9eqoi
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-fdisk-和-fallocate-命令创建交换分区"></a>使用 fdisk 和 fallocate 命令创建交换分区</h1>
<p>交换分区在物理内存（RAM）被填满时用来保持内存中的内容。当 RAM 被耗尽，Linux 会将内存中不活动的页移动到交换空间中，从而空出内存给系统使用。虽然如此，但交换空间不应被认为是物理内存的替代品。</p>
<p>大多数情况下，建议交换内存的大小为物理内存的 1 到 2 倍。也就是说如果你有 8GB 内存, 那么交换空间大小应该介于8-16 GB。</p>
<p>若系统中没有配置交换分区，当内存耗尽后，系统可能会杀掉正在运行中的进程/应用，从而导致系统崩溃。在本文中，我们将学会如何为 Linux 系统添加交换分区，我们有两个办法：</p>
<ul>
<li>使用 fdisk 命令</li>
<li>使用 fallocate 命令</li>
</ul>
<h3><a href="#第一个方法使用-fdisk-命令"></a>第一个方法（使用 fdisk 命令）</h3>
<p>通常，系统的第一块硬盘会被命名为 <code>/dev/sda</code>，而其中的分区会命名为 <code>/dev/sda1</code> 、 <code>/dev/sda2</code>。 本文我们使用的是一块有两个主分区的硬盘，两个分区分别为 <code>/dev/sda1</code>、 <code>/dev/sda2</code>，而我们使用 <code>/dev/sda3</code> 来做交换分区。</p>
<p>首先创建一个新分区，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fdisk /dev/sda</span>

</code></pre><p>按 <code>n</code> 来创建新分区。系统会询问你从哪个柱面开始，直接按回车键使用默认值即可。然后系统询问你到哪个柱面结束, 这里我们输入交换分区的大小（比如 1000MB）。这里我们输入 <code>+1000M</code>。</p>
<p><a href="https://camo.githubusercontent.com/93e8c4864b1123e9d12f8776608a5e83c37d9f0d/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f666964736b2e6a70673f726573697a653d363638253243323131"><img src="https://p0.ssl.qhimg.com/t01a41c409f6e2394df.jpg" alt="swap"></a></p>
<p>现在我们创建了一个大小为 1000MB 的磁盘了。但是我们并没有设置该分区的类型，我们按下 <code>t</code> 然后回车，来设置分区类型。</p>
<p>现在我们要输入分区编号，这里我们输入 <code>3</code>，然后输入磁盘分类号，交换分区的分区类型为 <code>82</code> （要显示所有可用的分区类型，按下 <code>l</code> ) ，然后再按下 <code>w</code> 保存磁盘分区表。</p>
<p><a href="https://camo.githubusercontent.com/def980e3b1b541594b2aca94a1e4b4edecdb5e37/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f666964736b2d737761702d73656c6563742e6a70673f726573697a653d363230253243313537"><img src="https://p0.ssl.qhimg.com/t01fb982bc941829f3d.jpg" alt="swap"></a></p>
<p>再下一步使用 <code>mkswap</code> 命令来格式化交换分区：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkswap /dev/sda3</span>

</code></pre><p>然后激活新建的交换分区：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> swapon /dev/sda3</span>

</code></pre><p>然而我们的交换分区在重启后并不会自动挂载。要做到永久挂载，我们需要添加内容到 <code>/etc/fstab</code> 文件中。打开 <code>/etc/fstab</code> 文件并输入下面行：</p>
<pre><code class="hljs routeros">$ vi /etc/fstab

/dev/sda3 swap  swap <span class="hljs-built_in"> default </span> 0  0

</code></pre><p>保存并关闭文件。现在每次重启后都能使用我们的交换分区了。</p>
<h3><a href="#第二种方法使用-fallocate-命令"></a>第二种方法（使用 fallocate 命令）</h3>
<p>我推荐用这种方法因为这个是最简单、最快速的创建交换空间的方法了。<code>fallocate</code> 是最被低估和使用最少的命令之一了。 <code>fallocate</code> 命令用于为文件预分配块/大小。</p>
<p>使用 <code>fallocate</code> 创建交换空间，我们首先在 <code>/</code> 目录下创建一个名为 <code>swap_space</code> 的文件。然后分配 2GB 到 <code>swap_space</code> 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fallocate -l 2G /swap_space</span>

</code></pre><p>我们运行下面命令来验证文件大小：</p>
<pre><code class="hljs jboss-cli">$ <span class="hljs-keyword">ls</span> -lh <span class="hljs-string">/swap_space</span>

</code></pre><p>然后更改文件权限，让 <code>/swap_space</code> 更安全：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod 600 /swap_space</span>

</code></pre><p>这样只有 root 可以读写该文件了。我们再来格式化交换分区（LCTT 译注：虽然这个 <code>swap_space</code> 是个文件，但是我们把它当成是分区来挂载）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkswap /swap_space</span>

</code></pre><p>然后启用交换空间：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> swapon -s</span>

</code></pre><p>每次重启后都要重新挂载磁盘分区。因此为了使之持久化，就像上面一样，我们编辑 <code>/etc/fstab</code> 并输入下面行：</p>
<pre><code class="hljs avrasm">/swap_space <span class="hljs-keyword">swap</span>  <span class="hljs-keyword">swap</span>  sw  <span class="hljs-number">0</span>  <span class="hljs-number">0</span> 

</code></pre><p>保存并退出文件。现在我们的交换分区会一直被挂载了。我们重启后可以在终端运行 <code>free -m</code> 来检查交换分区是否生效。</p>
<p>我们的教程至此就结束了，希望本文足够容易理解和学习，如果有任何疑问欢迎提出。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/create-swap-using-fdisk-fallocate/">http://linuxtechlab.com/create-swap-using-fdisk-fallocate/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 fdisk 和 fallocate 命令创建交换分区

## 原文链接
[https://www.zcfy.cc/article/creating-swap-partition-using-fdisk-fallocate-commands](https://www.zcfy.cc/article/creating-swap-partition-using-fdisk-fallocate-commands)


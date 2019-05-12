---
title: '检查 Linux 文件系统中的错误：通过案例学习 FSCK 命令' 
date: 2019-01-21 2:30:06
hidden: true
slug: 0wso8cru532
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#检查-linux-文件系统中的错误通过案例学习-fsck-命令"></a>检查 Linux 文件系统中的错误：通过案例学习 FSCK 命令</h1>
<p>FSCK 是一个很重要的 Linux/Unix 工具，它用于检测并修复文件系统中的错误。它类似于 Windows 操作系统中的 “chkdsk” 工具，但它是为 Linux、MacOS、FreeBSD 操作系统所准备的。</p>
<p>FSCK 全称为 File System Consistency Check。在大多数时候，它在系统启动时运行，但是如果需要的话，它也能被超级用户手工启动。</p>
<p>它可以进行三种模式的操作，</p>
<ol>
<li>查错并在发现错误时由用户决定如何处理，</li>
<li>查错并自动修复，</li>
<li>查错但在发现错误时只显示错误而不进行修复。</li>
</ol>
<h3><a href="#fsck-的语法"></a>FSCK 的语法</h3>
<p>手工执行 FSCK 的语法为，</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> fsck <span class="hljs-keyword">options</span> drives

</code></pre><p><code>fsck</code> 支持的选项有，</p>
<ul>
<li><code>-p</code> 自动修复（不询问）</li>
<li><code>-n</code> 不对文件系统做出改动</li>
<li><code>-y</code> 对所有问题都回答 "yes"</li>
<li><code>-c</code> 检查所有的坏块并将之添加到坏块列表中</li>
<li><code>-f</code> 即使文件系统标记为 clean 也强制进行检查</li>
<li><code>-v</code> 输出详细信息</li>
<li><code>-b superblock</code> 使用替代的超级块</li>
<li><code>-B blocksize</code> 指定超级块的块大小</li>
<li><code>-j external_journal</code> 指定外部日志的位置</li>
<li><code>-l bad_blocks_file</code> 添加到指定的坏块列表（文件）</li>
<li><code>-L bad_blocks_file</code> 指定坏块列表（文件）</li>
</ul>
<p>我们可以根据要做的操作任意指定这些选项。下面让我们来看一些例子。</p>
<h3><a href="#fsck-命令的案例"></a>Fsck 命令的案例</h3>
<p>注意： 在开始讨论案例之前，请先读完这段话。我们不应该用 <code>fsck</code> 检查已挂载的磁盘，这很可能会对磁盘造成永久性的伤害。因此在开始使用 <code>fsck</code> 之前，我们需要使用下面命令来卸载磁盘，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> umount drivename</span>

</code></pre><p>比如像这样，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> umount /dev/sdb1</span>

</code></pre><p>可以通过下面命令来查看分区编号，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fdisk -l</span>

</code></pre><p>另外，在运行 fsck 时，可能出错并返回一些错误码。下面是一些常见的错误及其意义的列表，</p>
<ul>
<li><code>0</code> - 没有错误</li>
<li><code>1</code> - 修复了一些文件系统错误</li>
<li><code>2</code> - 系统需要被重启</li>
<li><code>4</code> - 文件系统错误未被修复</li>
<li><code>8</code> - 操作错</li>
<li><code>16</code> - 使用或语法错</li>
<li><code>32</code> - fsck 被用户取消</li>
<li><code>128</code> - 共享库出错</li>
</ul>
<p>现在让我们来看一些 <code>fsck</code> 命令的例子，</p>
<h3><a href="#在单个分区上进行错误检查"></a>在单个分区上进行错误检查</h3>
<p>在终端运行下面过命令来对单个分区进行检查，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> umount /dev/sdb1</span>
<span class="hljs-meta">$</span><span class="bash"> fsck /dev/sdb1</span>

</code></pre><h3><a href="#检查文件系统错误并自动修复"></a>检查文件系统错误并自动修复</h3>
<p>使用选项 <code>-a</code> 进行一致性检查并自动修复这些错误。也可以用 <code>-y</code> 替代 <code>-a</code> 选项。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -a /dev/sdb1</span>

</code></pre><h3><a href="#检查文件系统错误但并不进行修复"></a>检查文件系统错误但并不进行修复</h3>
<p>若我们只想知道文件系统上有哪些错误而不想修复这些错误，那么可以使用选项 <code>-n</code>，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -n /dev/sdb1</span>

</code></pre><h3><a href="#检查所有分区中的错误"></a>检查所有分区中的错误</h3>
<p><code>-A</code> 选项一次性检查所有分区上的文件系统错误，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -A</span>

</code></pre><p>若要禁止对根文件系统进行检查可以使用选项 <code>-R</code>，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -AR</span>

</code></pre><h3><a href="#只检查指定文件系统类型的分区"></a>只检查指定文件系统类型的分区</h3>
<p>使用选项 <code>-t</code> 及文件系统类型，可以让 fsck 只检查指定文件系统类型的分区，比如指定文件系统类型为 “ext4”，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -t ext4 /dev/sdb1</span>

</code></pre><p>或者，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -t -A ext4</span>

</code></pre><h3><a href="#只在卸载的磁盘上进行一致性检查"></a>只在卸载的磁盘上进行一致性检查</h3>
<p>要保证 fsck 只在卸载的磁盘上操作，可以使用选项 <code>-M</code>，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> fsck -AM</span>

</code></pre><p>这就是我们的案例教程了。有任何疑问欢迎在下面的留言框中留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/linux-filesystem-errors-fsck-command-with-examples/">http://linuxtechlab.com/linux-filesystem-errors-fsck-command-with-examples/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
检查 Linux 文件系统中的错误：通过案例学习 FSCK 命令

## 原文链接
[https://www.zcfy.cc/article/check-linux-filesystem-for-errors-fsck-command-with-examples](https://www.zcfy.cc/article/check-linux-filesystem-for-errors-fsck-command-with-examples)


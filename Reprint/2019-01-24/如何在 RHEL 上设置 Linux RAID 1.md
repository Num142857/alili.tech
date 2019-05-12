---
title: '如何在 RHEL 上设置 Linux RAID 1' 
date: 2019-01-24 2:30:11
hidden: true
slug: v8g014ec72
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-rhel-上设置-linux-raid-1"></a>如何在 RHEL 上设置 Linux RAID 1</h1>
<h3><a href="#设置-linux-raid-1"></a>设置 Linux RAID 1</h3>
<p>配置 LINUX RAID 1 非常重要，因为它提供了冗余性。</p>
<p>RAID 分区拥有高级功能，如冗余和更好的性能。所以让我们来说下如何实现 RAID，以及让我们来看看不同类型的 RAID：</p>
<ul>
<li>RAID 0（条带）：磁盘组合在一起，形成一个更大的驱动器。这以可用性为代价提供了更好的性能。如果 RAID 中的任何一块磁盘出现故障，则整个磁盘集将无法使用。最少需要两块磁盘。</li>
<li>RAID 1（镜像）：磁盘从一个复制到另一个，提供了冗余。如果一块磁盘发生故障，则另一块磁盘接管，它有另外一份原始磁盘的数据的完整副本。其缺点是写入时间慢。最少需要两块磁盘。</li>
<li>RAID 5（带奇偶校验的条带）：磁盘类似于 RAID 0，并且连接在一起以形成一个大型驱动器。这里的区别是，25％ 的磁盘用于奇偶校验位，这允许在单个磁盘发生故障时可以恢复磁盘。最少需要三块盘。</li>
</ul>
<p>让我们继续进行 Linux RAID 1 配置。</p>
<p>安装 Linux RAID 1 的要求：</p>
<p>1、系统中应该安装了 mdam，请用下面的命令确认。</p>
<pre><code class="hljs autoit">[root<span class="hljs-symbol">@rhel1</span> ~]<span class="hljs-meta"># rpm -qa | grep -i mdadm</span>
mdadm<span class="hljs-number">-3.2</span><span class="hljs-number">.2</span><span class="hljs-number">-9.</span>el6.x86_64
[root<span class="hljs-symbol">@rhel1</span> ~]<span class="hljs-meta">#</span>

</code></pre><p>2、 系统应该连接了 2 块磁盘。</p>
<p>创建两个分区，一个磁盘一个分区（sdc、sdd），每个分区占据整块磁盘。</p>
<pre><code class="hljs tap">Disk /dev/sdc:<span class="hljs-number"> 1073 </span>MB,<span class="hljs-number"> 1073741824 </span>bytes
255 heads,<span class="hljs-number"> 63 </span>sectors/track,<span class="hljs-number"> 130 </span>cylinders
Units = cylinders of<span class="hljs-number"> 16065 </span>*<span class="hljs-number"> 512 </span>=<span class="hljs-number"> 8225280 </span>bytes
Sector size (logical/physical):<span class="hljs-number"> 512 </span>bytes /<span class="hljs-number"> 512 </span>bytes
I/O size (minimum/optimal):<span class="hljs-number"> 512 </span>bytes /<span class="hljs-number"> 512 </span>bytes
Disk identifier: 0x67cc8cfb

Device Boot Start End Blocks Id System
/dev/sdc1<span class="hljs-number"> 1 </span>130 1044193+<span class="hljs-number"> 83 </span>Linux

Disk /dev/sdd:<span class="hljs-number"> 1073 </span>MB,<span class="hljs-number"> 1073741824 </span>bytes
255 heads,<span class="hljs-number"> 63 </span>sectors/track,<span class="hljs-number"> 130 </span>cylinders
Units = cylinders of<span class="hljs-number"> 16065 </span>*<span class="hljs-number"> 512 </span>=<span class="hljs-number"> 8225280 </span>bytes
Sector size (logical/physical):<span class="hljs-number"> 512 </span>bytes /<span class="hljs-number"> 512 </span>bytes
I/O size (minimum/optimal):<span class="hljs-number"> 512 </span>bytes /<span class="hljs-number"> 512 </span>bytes
Disk identifier: 0x0294382b

Device Boot Start End Blocks Id System
/dev/sdd1<span class="hljs-number"> 1 </span>130 1044193+<span class="hljs-number"> 83 </span>Linux

</code></pre><hr>
<p>作者简介：</p>
<p>大家好！我是 Manmohan Mirkar。我很高兴见到你们！我在 10 多年前开始使用 Linux，我从来没有想过我会到今天这个地步。我的激情是帮助你们获取 Linux 知识。谢谢阅读！</p>
<hr>
<p>via: <a href="http://www.linuxroutes.com/linux-raid-1/">http://www.linuxroutes.com/linux-raid-1/</a></p>
<p>作者：<a href="http://www.linuxroutes.com/author/admin/">Manmohan Mirkar</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 RHEL 上设置 Linux RAID 1

## 原文链接
[https://www.zcfy.cc/article/how-to-setup-linux-raid-1-device-on-rhel](https://www.zcfy.cc/article/how-to-setup-linux-raid-1-device-on-rhel)


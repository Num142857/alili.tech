---
title: '在 Linux 系统里识别 USB 设备名字的 4 种方法' 
date: 2019-02-15 2:30:44
hidden: true
slug: 6dzmclsnu5
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-系统里识别-usb-设备名字的-4-种方法"></a>在 Linux 系统里识别 USB 设备名字的 4 种方法</h1>
<p>对于初学者来说，在 Linux 系统里你必须掌握的技术之一就是识别出插入系统里的各种设备。这也许是你的系统硬盘、外部的存储设备或者是可移动设备，比如 USB 设备或 SD 闪存卡等。</p>
<p>现如今，使用 USB 设备来传输文件是十分常见的事，对于那些喜欢使用命令行的新手来说，当你需要格式化 USB 设备时，学会使用不同的方法来识别 USB 设备名是非常重要的。</p>
<p>如果在系统中插入一个设备，尤其是在桌面环境下，比如 USB 设备，它会自动挂载到一个指定目录，一般是在 <code>/media/username/device-label</code> 目录下，之后你就可以进入到该目录下访问那些文件了。然而，在服务器上就不是这么回事了，你必须<a href="http://www.tecmint.com/mount-filesystem-in-linux/">手动挂载</a>这个设备，并且指定一个挂载点。</p>
<p>Linux 系统使用 <code>/dev</code> 目录下特定的设备文件来标识插入的设备。你会发现该目录下的某些文件，包括 <code>/dev/sda</code> 或者 <code>/dev/hda</code> 表示你的第一个主设备，每个分区使用一个数字来表示，比如 <code>/dev/sda1</code> 或 <code>/dev/hda1</code> 表示主设备的第一个分区等等。</p>
<pre><code class="hljs jboss-cli">$ <span class="hljs-keyword">ls</span> <span class="hljs-string">/dev/sda</span>*

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/10/List-All-Linux-Device-Names.png"><img src="https://p3.ssl.qhimg.com/t01c229cb7982a58e82.png" alt="List All Linux Device Names"></a></p>
<p><em>列出 Linux 系统下所有的设备名</em></p>
<p>现在让我们来使用下面一些特殊的命令行工具找出设备名：</p>
<h3><a href="#使用-df-命令来找出插入的-usb-设备名"></a>使用 df 命令来找出插入的 USB 设备名</h3>
<p>查看插入你系统里的每一个设备及对应的挂载点，你可以使用下图中的 <code>df</code> 命令检查 Linux 系统磁盘空间使用情况：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> df -h</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/10/Find-USB-Device-Name.png"><img src="https://p4.ssl.qhimg.com/t01b1a8a59cfb154488.png" alt="Find USB Device Name Using df Command"></a></p>
<p><em>使用 df 命令查找 USB 设备名</em></p>
<h3><a href="#使用-lsblk-命令查找-usb-设备名"></a>使用 lsblk 命令查找 USB 设备名</h3>
<p>你也可以使用下面的 <code>lsblk</code> 命令（列出块设备）来列出插入你系统里的所有块设备：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> lsblk</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/10/List-Linux-Block-Devices.png"><img src="https://p0.ssl.qhimg.com/t017cf48d1bc0c358c1.png" alt="List Linux Block Devices"></a></p>
<p><em>列出 Linux 系统里的块设备</em></p>
<h3><a href="#使用-fdisk-工具识别-usb-设备名"></a>使用 fdisk 工具识别 USB 设备名</h3>
<p><a href="http://www.tecmint.com/fdisk-commands-to-manage-linux-disk-partitions/">fdisk 是一个功能强大的工具</a>，用于查看你系统中的所有分区表，包括所有的 USB 设备，使用 root 权限执行如下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo fdisk -l</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/10/List-Partition-Table.png"><img src="https://p5.ssl.qhimg.com/t0127dbe13485160a6e.png" alt="List Partition Table of Block Devices"></a></p>
<p><em>列出块设备的分区表</em></p>
<h3><a href="#使用-dmesg-命令来识别出-usb-设备名"></a>使用 dmesg 命令来识别出 USB 设备名</h3>
<p><code>dmesg</code> 是一个用于打印或者控制内核环形缓冲区（kernel ring buffer）的重要命令。环形缓冲区是一种数据结构，它<a href="http://www.tecmint.com/dmesg-commands/">存放着内核操作数据的信息</a>。</p>
<p>运行如下命令来查看内核操作信息，它同时也会打印出 USB 设备的信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> dmesg</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/10/dmesg-shows-kernel-information.png"><img src="https://p0.ssl.qhimg.com/t018281ca3fc94f4ef5.png" alt="dmesg - Prints USB Device Name"></a></p>
<p><em>dmesg – 打印 USB 设备名</em></p>
<p>以上就是这篇文章中提及到的所有命令，我们在命令行下使用不同的方法来找出 USB 设备名。你也可以跟大家分享下实现这个目的的其它方法，或者如果你对这篇文章有什么想法也可以在下面跟大家交流下。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/find-usb-device-name-in-linux">http://www.tecmint.com/find-usb-device-name-in-linux</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/rusking">rusking</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 系统里识别 USB 设备名字的 4 种方法

## 原文链接
[https://www.zcfy.cc/article/4-useful-way-to-know-plugged-usb-device-name-in-linux](https://www.zcfy.cc/article/4-useful-way-to-know-plugged-usb-device-name-in-linux)


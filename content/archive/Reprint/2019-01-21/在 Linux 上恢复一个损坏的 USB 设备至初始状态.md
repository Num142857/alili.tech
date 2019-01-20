---
title: '在 Linux 上恢复一个损坏的 USB 设备至初始状态' 
date: 2019-01-21 2:30:06
hidden: true
slug: ijtfh1l80pa
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-上恢复一个损坏的-usb-设备至初始状态"></a>在 Linux 上恢复一个损坏的 USB 设备至初始状态</h1>
<p>很多时候我们诸如 SD 卡和 U 盘这样的储存器可能会被损坏，并且因此或其他原因不能继续使用。</p>
<p>这可能是因为使用这个设备创建了一个引导媒体或者是通过错误的平台格式化亦或是创建了一个新的分区在这个设备上。</p>
<h3><a href="#恢复损坏的-usb-设备至初始状态"></a>恢复损坏的 USB 设备至初始状态</h3>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/usb.png"><img src="https://p0.ssl.qhimg.com/t017b64a9f7f9e77069.png" alt="Linux 系统磁盘管理器"></a></p>
<p><strong>警告：接下来的操作会将你设备上的所有数据格式化。</strong></p>
<p>无论是上面提及的什么原因，最终的结果是我们无法继续使用这个设备。</p>
<p>所以这里有一个恢复 USB 设备或者是 SD 卡到出厂状态的方法。</p>
<p>大多数时候通过文件浏览器进行一次简单格式化可以解决问题，但是在一些极端情况下，比如文件管理器没有作用，而你又需要你的设备可以继续工作时，你可以使用下面的指导：</p>
<p>我们将会使用一个叫做 <code>mkusb</code> 的小工具来实现目标，这个工具的安装非常简单。</p>
<p>添加 mkusb 的仓库：</p>
<pre><code class="hljs dockerfile">sudo apt <span class="hljs-keyword">add</span><span class="bash"> repository ppa:mkusb/ppa
</span>
</code></pre><p>现在更新你的包列表：</p>
<pre><code class="hljs q">sudo apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>

</code></pre><p>安装 `mkusb：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install mkusb

</code></pre><p>现在运行 <code>mkusb</code> 你将会看到这个提示，点击 ‘Yes’。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/run-mkusb.png"><img src="https://p0.ssl.qhimg.com/t0125ca8f34f5ae4654.png" alt="运行 mkusb dus"></a></p>
<p>现在 <code>mkusb</code> 将会最后一次询问你是否希望继续格式化你的数据，‘Stop’是被默认选择的，你现在选择 ‘Go’ 并点击 ‘OK’。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/final-checkpoint_1.png"><img src="https://p0.ssl.qhimg.com/t0141078e3d82481b56.png" alt="Linux mkusb"></a></p>
<p>窗口将会关闭，此时你的终端看起来是这样的。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/mkusb.png"><img src="https://p0.ssl.qhimg.com/t01727542447b956e4f.png" alt="mkusb usb 控制台"></a></p>
<p>在几秒钟之后，整个过程将会完成，并且你将看到一个这样的弹出窗口。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/usb_1.png"><img src="https://p0.ssl.qhimg.com/t01b10ced0b7e92f1ca.png" alt="恢复损坏的 USB 设备"></a></p>
<p>你现在需要把你的设备从系统推出，然后再重新插进去。你的设备将被恢复成为一个普通设备而且还能像原来一样的工作。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/usb_2.png"><img src="https://p0.ssl.qhimg.com/t01bd8266af0fd6bbff.png" alt="Linux 磁盘管理器"></a></p>
<p>我们现在所做的操作本可以通过终端命令或是 gparted 或者其他的软件来完成，但是那将会需要一些关于分区管理的知识。</p>
<p>所以有一个像这样可以自动解决专一问题的小工具总是一个好事。</p>
<h3><a href="#结论"></a>结论</h3>
<p><code>mkusb</code> 是一个很容易使用的程序，它可以修复你的 USB 储存设备和 SD 卡。<code>mkusb</code> 通过 mkusb 的 PPA 来下载。所有在 <code>mkusb</code> 上的操作都需要超级管理员的权限，并且你在这个设备上的所有数据将会被格式化。</p>
<p>一旦操作完成，你将会重置这个设备并让它继续工作。</p>
<p>如果你感到任何疑惑，你可以在下面的评论栏里免费发表。</p>
<hr>
<p>via: <a href="http://www.linuxandubuntu.com/home/restore-corrupted-usb-drive-to-original-state-in-linux">http://www.linuxandubuntu.com/home/restore-corrupted-usb-drive-to-original-state-in-linux</a></p>
<p>作者：<a href="http://www.linuxandubuntu.com">LINUXANDUBUNTU</a> 译者：<a href="https://github.com/Drshu">Drshu</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 上恢复一个损坏的 USB 设备至初始状态

## 原文链接
[https://www.zcfy.cc/article/restore-corrupted-usb-drive-to-original-state-in-linux](https://www.zcfy.cc/article/restore-corrupted-usb-drive-to-original-state-in-linux)


---
title: 'Linux 上如何禁用 USB 存储' 
date: 2019-01-21 2:30:06
hidden: true
slug: ufww9fdfh5k
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-上如何禁用-usb-存储"></a>Linux 上如何禁用 USB 存储</h1>
<p>为了保护数据不被泄漏，我们使用软件和硬件防火墙来限制外部未经授权的访问，但是数据泄露也可能发生在内部。 为了消除这种可能性，机构会限制和监测访问互联网，同时禁用 USB 存储设备。</p>
<p>在本教程中，我们将讨论三种不同的方法来禁用 Linux 机器上的 USB 存储设备。所有这三种方法都在 CentOS 6＆7 机器上通过测试。那么让我们一一讨论这三种方法，</p>
<p>（另请阅读: <a href="http://linuxtechlab.com/ultimate-guide-to-securing-ssh-sessions/">Ultimate guide to securing SSH sessions</a>）</p>
<h3><a href="#方法-1--伪安装"></a>方法 1 – 伪安装</h3>
<p>在本方法中，我们往配置文件中添加一行 <code>install usb-storage /bin/true</code>， 这会让安装 usb-storage 模块的操作实际上变成运行 <code>/bin/true</code>， 这也是为什么这种方法叫做<code>伪安装</code>的原因。 具体来说就是，在文件夹 <code>/etc/modprobe.d</code> 中创建并打开一个名为 <code>block_usb.conf</code> (也可能叫其他名字) ，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vim /etc/modprobe.d/block_usb.conf</span>

</code></pre><p>然后将下行内容添加进去：</p>
<pre><code class="hljs sql"><span class="hljs-keyword">install</span> usb-<span class="hljs-keyword">storage</span> /<span class="hljs-keyword">bin</span>/<span class="hljs-literal">true</span>

</code></pre><p>最后保存文件并退出。</p>
<h3><a href="#方法-2--删除-usb-驱动"></a>方法 2 – 删除 USB 驱动</h3>
<p>这种方法要求我们将 USB 存储的驱动程序（<code>usb_storage.ko</code>）删掉或者移走，从而达到无法再访问 USB 存储设备的目的。 执行下面命令可以将驱动从它默认的位置移走：</p>
<pre><code class="hljs crystal">$ sudo mv /<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">modules</span>/$(<span class="hljs-title">uname</span> -<span class="hljs-title">r</span>)/<span class="hljs-title">kernel</span>/<span class="hljs-title">drivers</span>/<span class="hljs-title">usb</span>/<span class="hljs-title">storage</span>/<span class="hljs-title">usb</span>-<span class="hljs-title">storage</span>.<span class="hljs-title">ko</span> /<span class="hljs-title">home</span>/<span class="hljs-title">user1</span></span>

</code></pre><p>现在在默认的位置上无法再找到驱动程序了，因此当 USB 存储器连接到系统上时也就无法加载到驱动程序了，从而导致磁盘不可用。 但是这个方法有一个小问题，那就是当系统内核更新的时候，<code>usb-storage</code> 模块会再次出现在它的默认位置。</p>
<h3><a href="#方法-3---将-usb-存储器纳入黑名单"></a>方法 3 - 将 USB 存储器纳入黑名单</h3>
<p>我们也可以通过 <code>/etc/modprobe.d/blacklist.conf</code> 文件将 usb-storage 纳入黑名单。这个文件在 RHEL/CentOS 6 是现成就有的，但在 7 上可能需要自己创建。 要将 USB 存储列入黑名单，请使用 vim 打开/创建上述文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vim /etc/modprobe.d/blacklist.conf</span>

</code></pre><p>并输入以下行将 USB 纳入黑名单：</p>
<pre><code class="hljs armasm"><span class="hljs-keyword">blacklist </span>usb-storage

</code></pre><p>保存文件并退出。<code>usb-storage</code> 就在就会被系统阻止加载，但这种方法有一个很大的缺点，即任何特权用户都可以通过执行以下命令来加载 <code>usb-storage</code> 模块，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo modprobe usb-storage</span>

</code></pre><p>这个问题使得这个方法不是那么理想，但是对于非特权用户来说，这个方法效果很好。</p>
<p>在更改完成后重新启动系统，以使更改生效。请尝试用这些方法来禁用 USB 存储，如果您遇到任何问题或有什么疑问，请告知我们。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/disable-usb-storage-linux/">http://linuxtechlab.com/disable-usb-storage-linux/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a>原创编译，<a href="https://linux.cn/">Linux 中国</a>荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 上如何禁用 USB 存储

## 原文链接
[https://www.zcfy.cc/article/how-to-disable-usb-storage-on-linux](https://www.zcfy.cc/article/how-to-disable-usb-storage-on-linux)


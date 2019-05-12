---
title: '如何在 Ubuntu 中升级到最新内核' 
date: 2019-01-23 2:30:08
hidden: true
slug: 27867x2k3vf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-中升级到最新内核"></a>如何在 Ubuntu 中升级到最新内核</h1>
<p>每过段时间，就有新的设备和技术出来，因此如果我们想要充分利用它，保持最新的 Linux 内核就显得很重要。此外，更新系统内核将使我们能够利用新的内核优化，并且它还可以帮助我们避免在早期版本中发现的漏洞。</p>
<p><strong>建议阅读：</strong> <a href="http://www.tecmint.com/install-upgrade-kernel-version-in-centos-7/">如何升级 CentOS 7内核</a></p>
<p>准备好了在 Ubuntu 16.04 或其衍生版本（如 Debian 和 Linux Mint）中更新你的内核了么？如果准备好了，请你继续阅读！</p>
<h3><a href="#第一步检查安装的内核版本"></a>第一步：检查安装的内核版本</h3>
<p>要发现当前系统安装的版本，我们可以：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uname -sr</span>

</code></pre><p>下面的截图显示了在 Ubuntu 16.04 server 中上面命令的输出：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Check-Kernel-Version-in-Ubuntu.png"><img src="https://p0.ssl.qhimg.com/t01cc30297b48f5afc3.png" alt="Check Kernel Version in Ubuntu"></a></p>
<p><em>在 Ubuntu 中检查内核版本</em></p>
<h3><a href="#第二步在-ubuntu-1604-中升级内核"></a>第二步：在 Ubuntu 16.04 中升级内核</h3>
<p>要升级 Ubuntu 16.04 的内核，打开 <a href="http://kernel.ubuntu.com/%7Ekernel-ppa/mainline/">http://kernel.ubuntu.com/~kernel-ppa/mainline/</a> 并选择列表中需要的版本（发布此文时最新内核是 4.10.1）。</p>
<p>接下来，根据你的系统架构下载 <code>.deb</code> 文件：</p>
<p>对于 64 位系统：</p>
<pre><code class="hljs x86asm">$ wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>/linux-headers-<span class="hljs-number">4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001_4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001.</span>201702260735_all.deb
$ wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>/linux-headers-<span class="hljs-number">4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001</span>-generic_4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001.</span>201702260735_amd64.deb
$ wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>/linux-image-<span class="hljs-number">4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001</span>-generic_4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001.</span>201702260735_amd64.deb


</code></pre><p>这是 32 位系统的：</p>
<pre><code class="hljs x86asm">$ wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>/linux-headers-<span class="hljs-number">4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001_4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001.</span>201702260735_all.deb
$ wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>/linux-headers-<span class="hljs-number">4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001</span>-generic_4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001.</span>201702260735_i386.deb
$ wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>/linux-image-<span class="hljs-number">4.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001</span>-generic_4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>-<span class="hljs-number">041001.</span>201702260735_i386.deb

</code></pre><p>下载完成这些所有内核文件后，如下安装：</p>
<pre><code class="hljs stylus">$ sudo dpkg -<span class="hljs-selector-tag">i</span> *<span class="hljs-selector-class">.deb</span>

</code></pre><p>安装完成后，重启并验证新的内核已经被使用了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uname -sr</span>

</code></pre><p>就是这样。你下载就可以使用比 Ubuntu 16.04 默认安装的内核的更新版本了。</p>
<h3><a href="#总结"></a>总结</h3>
<p>本文我们展示了如何在 Ubuntu 系统上轻松升级Linux内核。这里还有另一个流程，但我们在这里没有展示，因为它需要从源代码编译内核，这不推荐在生产 Linux 系统上使用。</p>
<p>如果你仍然有兴趣编译内核作为一个学习经验，你可以在 <a href="https://kernelnewbies.org/KernelBuild">Kernel Newbies</a> 网站中得到指导该如何做。</p>
<p>一如既往，如果你对本文有任何问题或意见，请随时使用下面的评论栏。</p>
<hr>
<p>作者简介：</p>
<p>Gabriel Cánepa - 一位来自阿根廷圣路易斯梅塞德斯镇 (Villa Mercedes, San Luis, Argentina) 的 GNU/Linux 系统管理员，Web 开发者。就职于一家世界领先级的消费品公司，乐于在每天的工作中能使用 FOSS 工具来提高生产力。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/upgrade-kernel-in-ubuntu/">http://www.tecmint.com/upgrade-kernel-in-ubuntu/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu 中升级到最新内核

## 原文链接
[https://www.zcfy.cc/article/how-to-upgrade-kernel-to-latest-version-in-ubuntu](https://www.zcfy.cc/article/how-to-upgrade-kernel-to-latest-version-in-ubuntu)


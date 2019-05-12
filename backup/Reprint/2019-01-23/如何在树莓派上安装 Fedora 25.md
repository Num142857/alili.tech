---
title: '如何在树莓派上安装 Fedora 25' 
date: 2019-01-23 2:30:08
hidden: true
slug: dp3nrr9fsq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在树莓派上安装-fedora-25"></a>如何在树莓派上安装 Fedora 25</h1>
<blockquote>
<p>了解 Fedora 第一个官方支持树莓派的版本</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/2be63b05cf99fb47137a8774aa7baf37c4188672/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f676e6f6d655f7261737062657272795f70695f6665646f72612e6a70673f69746f6b3d45666d36494b7850"><img src="https://camo.githubusercontent.com/2be63b05cf99fb47137a8774aa7baf37c4188672/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f676e6f6d655f7261737062657272795f70695f6665646f72612e6a70673f69746f6b3d45666d36494b7850" alt="How to install Fedora 25 on your Raspberry Pi" title="How to install Fedora 25 on your Raspberry Pi"></a></p>
<blockquote>
<p>图片提供 opensource.com</p>
</blockquote>
<p>2016 年 10 月，Fedora 25 Beta 发布了，随之而来的还有对 <a href="https://fedoramagazine.org/raspberry-pi-support-fedora-25-beta/">树莓派 2 和 3 的初步支持</a>。Fedora 25 的最终“通用”版在一个月后发布，从那时起，我一直在树莓派上尝试不同的 Fedora spins。</p>
<p>这篇文章不仅是一篇树莓派Raspberry Pi 3 上的 Fedora 25 的点评，还集合了技巧、截图以及我对 Fedora 第一个官方支持 Pi 的这个版本的一些个人看法。</p>
<p>在我开始之前，需要说一下的是，为写这篇文章所做的所有工作都是在我的运行 Fedora 25 的个人笔记本电脑上完成的。我使用一张 microSD 插到 SD 适配器中，复制和编辑所有的 Fedora 镜像到 32GB 的 microSD 卡中，然后用它在一台三星电视上启动了树莓派 3。 因为 Fedora 25 尚不支持内置 Wi-Fi，所以树莓派 3 使用了以太网线缆进行网络连接。最后，我使用了 Logitech K410 无线键盘和触摸板进行输入。</p>
<p>如果你没有条件使用以太网线连接在你的树莓派上玩 Fedora 25，我曾经用过一个 Edimax Wi-Fi USB 适配器，它也可以在 Fedora 25 上工作，但在本文中，我只使用了以太网连接。</p>
<h3><a href="#在树莓派上安装-fedora-25-之前"></a>在树莓派上安装 Fedora 25 之前</h3>
<p>阅读 Fedora 项目 wiki 上的<a href="https://fedoraproject.org/wiki/Raspberry_Pi">树莓派支持文档</a>。你可以从 wiki 下载 Fedora 25 安装所需的镜像，那里还列出了所有支持和不支持的内容。</p>
<p>此外，请注意，这是初始支持版本，还有许多新的工作和支持将随着 Fedora 26 的发布而出现，所以请随时报告 bug，并通过 <a href="https://bugzilla.redhat.com/show_bug.cgi?id=245418">Bugzilla</a>、Fedora 的 <a href="https://lists.fedoraproject.org/admin/lists/arm%40lists.fedoraproject.org/">ARM 邮件列表</a>、或者 Freenode IRC 频道＃fedora-arm，分享你在树莓派上使用 Fedora 25 的体验反馈。</p>
<h3><a href="#安装"></a>安装</h3>
<p>我下载并安装了五个不同的 Fedora 25 spin：GNOME（默认工作站）、KDE、Minimal、LXDE 和 Xfce。在多数情况下，它们都有一致和易于遵循的步骤，以确保我的树莓派 3 上启动正常。有的 spin 有已知 bug 的正在解决之中，而有的按照 Fedora wik 遵循标准操作程序即可。</p>
<p><a href="https://camo.githubusercontent.com/e6dad92869d48501eb13925a92f06f287f6ccd67/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f676e6f6d655f6f6e5f7270692e706e67"><img src="https://p1.ssl.qhimg.com/t01021e3675d208613a.png" alt="GNOME on Raspberry Pi" title="GNOME on Raspberry Pi"></a></p>
<p><em>树莓派 3 上的 Fedora 25 workstation、 GNOME 版本</em></p>
<h3><a href="#安装步骤"></a>安装步骤</h3>
<p>1、 在你的笔记本上，从支持文档页面的链接下载一个树莓派的 Fedora 25 镜像。</p>
<p>2、 在笔记本上，使用 <code>fedora-arm-installer</code> 或下述命令行将镜像复制到 microSD：</p>
<pre><code class="hljs routeros">xzcat Fedora-Workstation-armhfp-25-1.3-sda.raw.xz | dd <span class="hljs-attribute">bs</span>=4M <span class="hljs-attribute">status</span>=progress <span class="hljs-attribute">of</span>=/dev/mmcblk0

</code></pre><p>注意：<code>/dev/mmclk0</code> 是我的 microSD 插到 SD 适配器后，在我的笔记本电脑上挂载的设备名。虽然我在笔记本上使用 Fedora，可以使用 <code>fedora-arm-installer</code>，但我还是喜欢命令行。</p>
<p>3、 复制完镜像后，<em>先不要启动你的系统</em>。我知道你很想这么做，但你仍然需要进行几个调整。</p>
<p>4、 为了使镜像文件尽可能小以便下载，镜像上的根文件系统是很小的，因此你必须增加根文件系统的大小。如果你不这么做，你仍然可以启动你的派，但如果你一旦运行 <code>dnf update</code> 来升级你的系统，它就会填满文件系统，导致糟糕的事情发生，所以趁着 microSD 还在你的笔记本上进行分区：</p>
<pre><code class="hljs awk">growpart <span class="hljs-regexp">/dev/mm</span>cblk0 <span class="hljs-number">4</span>
resize2fs <span class="hljs-regexp">/dev/mm</span>cblk0p4

</code></pre><p>注意：在 Fedora 中，<code>growpart</code> 命令由 <code>cloud-utils-growpart.noarch</code> 这个 RPM 提供的。</p>
<p>5、文件系统更新后，您需要将 <code>vc4</code> 模块列入黑名单。<a href="https://bugzilla.redhat.com/show_bug.cgi?id=1387733">更多有关此 bug 的信息在此。</a></p>
<p>我建议在启动树莓派之前这样做，因为不同的 spin 有不同表现方式。例如，（至少对我来说）在没有黑名单 <code>vc4</code> 的情况下，GNOME 在我启动后首先出现，但在系统更新后，它不再出现。 KDE spin 则在第一次启动时根本不会出现 KDE。因此我们可能需要在我们的第一次启动之前将 <code>vc4</code> 加入黑名单，直到这个错误以后解决了。</p>
<p>黑名单应该出现在两个不同的地方。首先，在你的 microSD 根分区上，在 <code>etc/modprode.d/</code> 下创建一个 <code>vc4.conf</code>，内容是：<code>blacklist vc4</code>。第二，在你的 microSD 启动分区，添加 <code>rd.driver.blacklist=vc4</code> 到 <code>extlinux/extlinux.conf</code> 文件的末尾。</p>
<p>6、 现在，你可以启动你的树莓派了。</p>
<h3><a href="#启动"></a>启动</h3>
<p>你要有耐心，特别是对于 GNOME 和 KDE 发行版来说。在 SSD（固态驱动器）几乎即时启动的时代，你很容易就对派的启动速度感到不耐烦，特别是第一次启动时。在第一次启动 Window Manager 之前，会先弹出一个初始配置页面，可以配置 root 密码、常规用户、时区和网络。配置完毕后，你就应该能够 SSH 到你的树莓派上，方便地调试显示问题了。</p>
<h3><a href="#系统更新"></a>系统更新</h3>
<p>在树莓派上运行 Fedora 25 后，你最终（或立即）会想要更新系统。</p>
<p>首先，进行内核升级时，先熟悉你的 <code>/boot/extlinux/extlinux.conf</code> 文件。如果升级内核，下次启动时，除非手动选择正确的内核，否则很可能会启动进入救援（ Rescue ）模式。避免这种情况发生最好的方法是，在你的 <code>extlinux.conf</code> 中将定义 Rescue 镜像的那五行移动到文件的底部，这样最新的内核将在下次自动启动。你可以直接在派上或通过在笔记本挂载来编辑 <code>/boot/extlinux/extlinux.conf</code>：</p>
<pre><code class="hljs stylus"><span class="hljs-selector-tag">label</span> Fedora <span class="hljs-number">25</span> Rescue fdcb76d0032447209f782a184f35eebc (<span class="hljs-number">4.9</span>.<span class="hljs-number">9</span>-<span class="hljs-number">200</span><span class="hljs-selector-class">.fc25</span><span class="hljs-selector-class">.armv7hl</span>)
            kernel /vmlinuz-<span class="hljs-number">0</span>-rescue-fdcb76d0032447209f782a184f35eebc
            append ro root=UUID=c19816a7-cbb8-<span class="hljs-number">4</span>cbb-<span class="hljs-number">8608</span>-<span class="hljs-number">7</span>fec6d4994d0 rd<span class="hljs-selector-class">.driver</span><span class="hljs-selector-class">.blacklist</span>=vc4
            fdtdir /dtb-<span class="hljs-number">4.9</span>.<span class="hljs-number">9</span>-<span class="hljs-number">200</span><span class="hljs-selector-class">.fc25</span><span class="hljs-selector-class">.armv7hl</span>/
            initrd /initramfs-<span class="hljs-number">0</span>-rescue-fdcb76d0032447209f782a184f35eebc<span class="hljs-selector-class">.img</span>

</code></pre><p>第二点，如果无论什么原因，如果你的显示器在升级后再次变暗，并且你确定已经将 <code>vc4</code> 加入黑名单，请运行 <code>lsmod | grep vc4</code>。你可以先启动到多用户模式而不是图形模式，并从命令行中运行 <code>startx</code>。 请阅读 <code>/etc/inittab</code> 中的内容，了解如何切换 target 的说明。</p>
<p><a href="https://camo.githubusercontent.com/fe2af2d872dda20b6ea7b2fd5f054bbee758453a/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6b64655f6f6e5f7270692e706e67"><img src="https://p3.ssl.qhimg.com/t0114fa92578779d35a.png" alt="KDE on Raspberry Pi 3" title="KDE on Raspberry Pi 3"></a></p>
<p><em>树莓派 3 上的 Fedora 25 workstation、 KDE 版本</em></p>
<h3><a href="#fedora-spin"></a>Fedora Spin</h3>
<p>在我尝试过的所有 Fedora Spin 中，唯一有问题的是 XFCE spin，我相信这是由于这个<a href="https://bugzilla.redhat.com/show_bug.cgi?id=1389163">已知的 bug</a> 导致的。</p>
<p>按照我在这里分享的步骤操作，GNOME、KDE、LXDE 和 minimal 都运行得很好。考虑到 KDE 和 GNOME 会占用更多资源，我会推荐想要在树莓派上使用 Fedora 25 的人使用 LXDE 和 Minimal。如果你是一位系统管理员，想要一台廉价的 SELinux 支持的服务器来满足你的安全考虑，而且只是想要使用树莓派作为你的服务器，开放 22 端口以及 vi 可用，那就用 Minimal 版本。对于开发人员或刚开始学习 Linux 的人来说，LXDE 可能是更好的方式，因为它可以快速方便地访问所有基于 GUI 的工具，如浏览器、IDE 和你可能需要的客户端。</p>
<p><a href="https://camo.githubusercontent.com/60ba34141a91d8048f2a14277f9182d7eb902696/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6c7864655f6f6e5f7270692e706e67"><img src="https://p2.ssl.qhimg.com/t01924d76daafd6c507.png" alt="LXES on Raspberry Pi" title="LXDE on Raspberry Pi 3"></a></p>
<p><em>树莓派 3 上的 Fedora 25 workstation、LXDE。</em></p>
<p>看到越来越多的 Linux 发行版在基于 ARM 的树莓派上可用，那真是太棒了。对于其第一个支持的版本，Fedora 团队为日常 Linux 用户提供了更好的体验。我很期待 Fedora 26 的改进和 bug 修复。</p>
<hr>
<p>作者简介：</p>
<p>Anderson Silva - Anderson 于 1996 年开始使用 Linux。更精确地说是 Red Hat Linux。 2007 年，他作为 IT 部门的发布工程师时加入红帽，他的职业梦想成为了现实。此后，他在红帽担任过多个不同角色，从发布工程师到系统管理员、高级经理和信息系统工程师。他是一名 RHCE 和 RHCA 以及一名活跃的 Fedora 包维护者。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/3/how-install-fedora-on-raspberry-pi">https://opensource.com/article/17/3/how-install-fedora-on-raspberry-pi</a></p>
<p>作者：<a href="https://opensource.com/users/ansilva">Anderson Silva</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在树莓派上安装 Fedora 25

## 原文链接
[https://www.zcfy.cc/article/how-to-install-fedora-25-on-your-raspberry-pi](https://www.zcfy.cc/article/how-to-install-fedora-25-on-your-raspberry-pi)


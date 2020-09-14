---
title: '如何安装 Debian 的非 systemd 复刻版本 Devuan Linux' 
date: 2019-01-23 2:30:08
hidden: true
slug: 15jk0bprzf2
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何安装-debian-的非-systemd-复刻版本-devuan-linux"></a>如何安装 Debian 的非 systemd 复刻版本 Devuan Linux</h1>
<p>Devuan Linux 是 Debian 最新的复刻版本，是基于 Debian 的一个被设计为完全去除了 systemd 的版本。</p>
<p>Devuan 宣布于 2014 年底，并经过了一段活跃的开发。最新的发行版本是 beta2，发行代号为： Jessie （没错，和当前 Debian 的稳定版同名）。</p>
<p>当前稳定版的最后发行据说会在 2017 年初。如果想了解关于该项目的更多信息，请访问社区官网：<a href="https://devuan.org/">https://devuan.org/</a> 。</p>
<p>本文将阐述 Devuan 当前发行版的安装。在 Debian 上可用的大多数软件包在 Devuan 上也是可用的，这有利于用户从 Debian 到 Devuan 的无缝过渡，他们应该更喜欢自由选择自己的初始化系统。</p>
<h3><a href="#系统要求"></a>系统要求</h3>
<p>Devuan 和 Debian 类似，对系统的要求非常低。最大的决定性因素是，用户希望使用什么样的桌面环境。这篇指南假设用户将使用一个“俗气的”桌面环境，建议至少满足下面所示的最低系统要求：</p>
<ol>
<li>至少 15GB 的硬盘空间；强烈鼓励有更大空间</li>
<li>至少 2GB 的内存空间；鼓励更多</li>
<li>支持 USB 或 CD/DVD 启动</li>
<li>网络连接；安装过程中将会从网上下载文件</li>
</ol>
<h3><a href="#devuan-linux-安装"></a>Devuan Linux 安装</h3>
<p>正如所有的指南一样，这篇指南假设你有一个 USB 驱动器，可作为安装媒介。注意，USB 驱动器应该有大约 4GB 或 8 GB 大，<strong>并且需要删除所有数据</strong>。</p>
<p>作者在使用太大的 USB 驱动器遇到过问题，不过你的也许可以工作。无论如何，在接下来的一些步骤中，<strong>将导致 USB 驱动上的数据全部丢失</strong>。</p>
<p>在开始准备安装之前，请先备份 USB 驱动器上的所有数据。这个可启动的 Linux USB 启动器要在另一个 Linux 系统上创建。</p>
<p>1、首先，从 <a href="https://devuan.org/">https://devuan.org/</a> 获取最新发行版的 Devuan 安装镜像，或者，你也可以在 Linux 终端上输入下面的命令来获取安装镜像：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> ~/Downloads</span>
<span class="hljs-meta">$</span><span class="bash"> wget -c https://files.devuan.org/devuan_jessie_beta/devuan_jessie_1.0.0-beta2_amd64_CD.iso</span>

</code></pre><p>2、上面的命令将会把安装镜像文件下载到用户的 <code>Downloads</code> 目录。下一步是把安装镜像写入 USB 驱动器中，从而启动安装程序。</p>
<p>为了写入镜像，需要使用一个在 Linux 中叫做 <code>dd</code> 的工具。首先，需要使用 <a href="http://www.tecmint.com/find-usb-device-name-in-linux/">lsblk 命令</a>来定位硬盘名字：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> lsblk</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Find-Device-Name-in-Linux.png"><img src="https://p1.ssl.qhimg.com/t018eee4e3276782219.png" alt="Find Device Name in Linux"></a></p>
<p><em>找到 Linux 中的设备名字</em></p>
<p>USB 驱动器的名字为 <code>／dev/sdc</code>，现在，可以使用 <code>dd</code> 工具把 Devuan 镜像写入驱动器中：</p>
<pre><code class="hljs stylus">$ sudo <span class="hljs-selector-tag">dd</span> <span class="hljs-keyword">if</span>=~/Downloads/devuan_jessie_1.<span class="hljs-number">0.0</span>-beta2_amd64_CD<span class="hljs-selector-class">.iso</span> of=/dev/sdc

</code></pre><p>重点：上面的命令需要有 root 权限，你可以使用 <code>sudo</code> 或者以 root 用户登录来运行命令。同时，这个命令将会删除 USB 驱动器上的所有数据，所以请确保备份了需要的数据。</p>
<p>3、当镜像写入 USB 驱动器以后，把 USB 驱动器插入要安装 Devuan 的电脑上，然后从 USB 驱动器启动电脑。</p>
<p>从 USB 驱动器成功启动以后，将会出现下面所示的屏幕，你需要在 “Install” 和 “Graphical Install” 这两个选项间选择一个继续安装进程。</p>
<p>在这篇指南中，我将使用 “Graphical Install” 方式。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Graphic-Installation.png"><img src="https://p4.ssl.qhimg.com/t0147ffa1234487080b.png" alt="Devuan Graphic Installation"></a></p>
<p><em>Devuan Graphic 安装</em></p>
<p>4、当安装程序启动到“本地化”菜单以后，将会提示用户选择键盘布局和语言。只需选择你想要的选项，然后继续安装。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Language-Selection.png"><img src="https://p0.ssl.qhimg.com/t0152c8ad62934083df.png" alt="Devuan Language Selection"></a></p>
<p><em>Devuan 语言选择</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Location-Selection.png"><img src="https://p3.ssl.qhimg.com/t01649c340423709bcc.png" alt="Devuan Location Selection"></a></p>
<p><em>Devuan 地区选择</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Keyboard-Configuration.png"><img src="https://p3.ssl.qhimg.com/t018f5060bbd8b89e66.png" alt="Devuan Keyboard Configuration"></a></p>
<p><em>Devuan 键盘配置</em></p>
<p>5、下一步是向安装程序提供主机名和该机器所属的域名。</p>
<p>需要填写一个唯一的主机名，但如果电脑不属于任何域，那么域名可以不填。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Set-Devuan-Linux-Hostname.png"><img src="https://p0.ssl.qhimg.com/t01da2e66fb6f87200d.png" alt="Set Devuan Linux Hostname"></a></p>
<p><em>设置 Devuan Linux 的主机名</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Set-Devuan-Linux-Domain-Name.png"><img src="https://p0.ssl.qhimg.com/t01c3ec6674a9f5fc88.png" alt="Set Devuan Linux Domain Name"></a></p>
<p><em>设置 Devuan Linux 的域名</em></p>
<p>6、填好主机名和域名信息以后，需要提供一个 root 用户密码。</p>
<p>请务必记住这个密码，因为当你在这台 Devuan 机器上执行管理任务时需要提供这个密码。默认情况下， Devuan 不会安装 sudo 包，所以当安装完成以后，管理用户就是 root 用户。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Setup-Devuan-Linux-Root-User.png"><img src="https://p3.ssl.qhimg.com/t01831d645eea2fe993.png" alt="Setup Devuan Linux Root User"></a></p>
<p><em>设置 Devuan Linux Root 用户</em></p>
<p>7、下一步需要做的事情是创建一个非 root 用户。在任何可能的情况下，避免以 root 用户使用系统总是更好的。此时，安装程序将会提示你创建一个非 root 用户。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Setup-Devuan-Linux-User-Account.png"><img src="https://p5.ssl.qhimg.com/t01caec87e81c074ea6.png" alt="Setup Devuan Linux User Account"></a></p>
<p><em>创建 Devuan Linux 用户账户</em></p>
<p>8、一旦输入 root 用户密码，提示非 root 用户已经创建好以后，安装程序将会请求<a href="http://www.tecmint.com/install-and-configure-ntp-server-client-in-debian/">通过 NTP 设置时钟</a>。</p>
<p>这时需要再次连接网络，大多数系统都需要这样。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Configure-Clock-on-Devuan-Linux.png"><img src="https://p5.ssl.qhimg.com/t0146de7b48f9d00515.png" alt="Devuan Linux Timezone Setup"></a></p>
<p><em>设置 Devuan Linux 的时区</em></p>
<p>9、下一步需要做的是系统分区。对于绝大多数用户来说，选择“Guided – use entire disk”就够了。然而，如果需要进行高级分区，就需要进行分区。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Partitioning.png"><img src="https://p1.ssl.qhimg.com/t01cd96962f7fd56142.png" alt="Devuan Linux Partitioning"></a></p>
<p><em>Devuan Linux 分区</em></p>
<p>在上面点击 “continue” 以后，请确认分区更改，从而把分区信息写入硬盘。</p>
<p>10、分区完成以后，安装程序为 Devuan 安装一些基础文件。这个过程将会花费几分钟时间，直到系统开始配置网络镜像（软件库）才会停下来。当提示使用网络镜像时，通常点击 “yes”。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Configure-Package-Manager.png"><img src="https://p1.ssl.qhimg.com/t01c10cee32ae6bcce6.png" alt="Devuan Linux Configure Package Manager"></a></p>
<p><em>Devuan Linux 配置包管理器</em></p>
<p>点击 “yes” 以后将会给用户呈现一系列以国家分类的网络镜像。通常最好选择地理位置上离你的机器最近的镜像。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Mirror-Selection.png"><img src="https://p2.ssl.qhimg.com/t018f2331940bc30a6b.png" alt="Devuan Linux Mirror Selection"></a></p>
<p><em>Devuan Linux 镜像选择</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Mirrors.png"><img src="https://p1.ssl.qhimg.com/t01ca495b47ba88425e.png" alt="Devuan Linux Mirrors"></a></p>
<p><em>Devuan Linux 镜像</em></p>
<p>11、下一步是设置 Debian 传统的 “popularity contest”，它能够追踪已下载包的使用统计。</p>
<p>在安装过程中，可以在管理员首选项中启用或禁用该功能。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Configure-Devuan-Linux-Popularity-Contest.png"><img src="https://p2.ssl.qhimg.com/t01897effcea7af97f3.png" alt="Configure Devuan Linux Popularity Contest"></a></p>
<p><em>配置 Devuan Linux 的 Popularity Contest</em></p>
<p>12、在简单浏览仓库和一些包的更新以后，安装程序会给用户展示一系列软件包，安装这些包可以提供一个桌面环境、SSH 访问和其它系统工具。</p>
<p>Devuan 会列举出一些主流桌面环境，但应该指出的是，并不是所有的桌面在 Devuan 上均可用。作者在 Devuan 上成功使用过 Xfce 、LXDE 和 Mate（未来的文章将会探究如何从源代码安装这些桌面环境）。</p>
<p>如果想要安装别的桌面环境，不要点击 “Devuan Desktop Environment” 复选框。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Software-Selection.png"><img src="https://p3.ssl.qhimg.com/t01bedc0895aca97c6e.png" alt="Devuan Linux Software Selection"></a></p>
<p><em>Devuan Linux 软件选择</em></p>
<p>根据在上面的安装屏幕中选择的项目数，可能需要几分钟的时间来下载和安装软件。</p>
<p>当所有的软件都安装好以后，安装程序将会提示用户选择 grub 的安装位置。典型情况是选择安装在 <code>/dev/sda</code> 目录下。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Grub-Install.png"><img src="https://p2.ssl.qhimg.com/t01af31562ec498028a.png" alt="Devuan Linux Grub Install"></a></p>
<p><em>Devuan Linux 安装 grub 引导程序</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Grub-Install-Disk.png"><img src="https://p2.ssl.qhimg.com/t01fe88910223ce33a0.png" alt="Devuan Linux Grub Install Disk"></a></p>
<p><em>Devuan Linux Grub 程序的安装硬盘</em></p>
<p>13、当 GRUB 程序成功安装到引导驱动器以后，安装程序将会提示用户安装已经完成，请重启系统。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Installation-Completes.png"><img src="https://p5.ssl.qhimg.com/t0160b954eb46eb4740.png" alt="Devuan Linux Installation Completes"></a></p>
<p><em>Devuan Linux 安装完成</em></p>
<p>14、如果安装顺利完成了，那么系统要么启动到选择桌面环境，或者如果没有选择桌面环境的话，会启动到一个基于文本的控制台。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Devuan-Linux-Console.png"><img src="https://p0.ssl.qhimg.com/t0150f671177f6f89f5.png" alt="Devuan Linux Console"></a></p>
<p>Devuan Linux 控制台。</p>
<p>这篇文章总结了最新版本的 Devuan Linux 的安装。在这个系列的下一篇文章将会阐述<a href="http://www.tecmint.com/install-enlightenment-on-devuan-linux/">如何从源代码为 Devuan Linux 安装 Enlightenment 桌面环境</a>。如果你有任何问题或疑问，请记得让我们知道。</p>
<hr>
<p>作者简介：</p>
<p>作者是 Ball 州立大学的计算机系讲师，目前教授计算机系的所有 Linux 课程，同时也教授 Cisco 网络课程。他是 Debian 以及其他 Debian 的衍生版比如 Mint、Ubuntu 和 Kali 的狂热用户。他拥有信息学和通信科学的硕士学位，同时获得了 Cisco、EC 理事会和 Linux 基金会的行业认证。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/installation-of-devuan-linux/">http://www.tecmint.com/installation-of-devuan-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/robturner/">Rob Turner</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何安装 Debian 的非 systemd 复刻版本 Devuan Linux

## 原文链接
[https://www.zcfy.cc/article/installation-of-devuan-linux-fork-of-debian](https://www.zcfy.cc/article/installation-of-devuan-linux-fork-of-debian)


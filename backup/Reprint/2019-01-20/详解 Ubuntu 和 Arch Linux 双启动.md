---
title: '详解 Ubuntu 和 Arch Linux 双启动' 
date: 2019-01-20 2:30:11
hidden: true
slug: u2rvlj3u5u
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#详解-ubuntu-和-arch-linux-双启动"></a>详解 Ubuntu 和 Arch Linux 双启动</h1>
<p>Ubuntu 和 Arch Linux 双启动不像听起来那么容易，然而，我将使这个过程尽可能地简单明了。首先，我们需要安装 Ubuntu，然后安装 Arch Linux，因为配置 Ubuntu grub 更容易实现 Ubuntu 和 Arch Linux 双启动。</p>
<h3><a href="#ubuntu-和-arch-linux-双启动"></a>Ubuntu 和 Arch Linux 双启动</h3>
<p>你需要准备好以下内容：</p>
<p>1、你需要准备你所选择的 Ubuntu 的特色版本，在这个例子中，我将使用 Ubuntu 17.10 ISO 2、两个优盘 3、Windows 或者 Linux 操作系统的 PC 机 4、Arch Linux ISO 5、基于 Windows 的 Rufus 或是基于 Linux 发行版的 etcher 的两款软件中的一种，要根据自己的系统类型来选择哦。</p>
<h3><a href="#安装-ubuntu"></a>​安装 Ubuntu</h3>
<p>​首先, 利用 Rufus 为 Ubuntu 和 Arch Linux <a href="http://www.linuxandubuntu.com/home/etcher-burn-images-to-sd-card-make-bootable-usb">创建可启动的闪存驱动器</a>。另外，也可以使用 <code>etcher</code> 创建 Ubuntu 和 Arch Linux 的可启动闪存驱动器。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/bootable-ubuntu-usb-etcher-image-writer_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01324cd4364b95a73c.jpg" alt="Ubuntu 可启动 USB 镜像写入工具"></a></p>
<p>为 Ubuntu 选择 ISO 映像文件，然后选择闪存驱动器，然后单击 <code>Flash!</code> 创建可引导的闪存驱动器。等到它完成，瞧！你的可启动闪存驱动器已经准备好使用了。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/make-ubuntu-usb-bootable-in-linux_orig.jpg"><img src="https://p0.ssl.qhimg.com/t016e420fd604fa5e45.jpg" alt="在 linux 下创建 Ubuntu USB 启动程序"></a></p>
<p>打开你的机器并使用载有 Ubuntu 安装媒体的可启动闪存驱动器进行启动。确保引导到 UEFI 或 BIOS 兼容模式，这取决于您所使用的 PC 的类型。我更喜欢使用 UEFI 来构建新的 PC。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/live-ubuntu-boot_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01139e910f1c4d4f42.jpg" alt="live Ubuntu 启动"></a></p>
<p>​在成功启动后，您将看到如上图显示，要求您尝试 Ubuntu 或安装 Ubuntu，选择安装 Ubuntu。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/install-usb-from-live-usb_orig.jpg"><img src="https://p0.ssl.qhimg.com/t012cffdaca22cf48f0.jpg" alt="从可启动 USB 安装"></a></p>
<p>然后检查安装第三方软件的图形和 WiFi 硬件、MP3 和其他媒体。如果你有一个互联网连接，你可以选择在安装 Ubuntu 的时候下载更新，因为它会节省安装时间，并且确保安装的是最新更新。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/custom-partition-hd-install-ubuntu_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01469d2d695928a70e.jpg" alt="自定义磁盘分区安装 Ubuntu"></a></p>
<p>​然后选择点击“Something else”，这样我们就可以对硬盘进行分区，并预留出 Ubuntu 和 Archlinux 的分区以及它们的交换分区的空间。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/create-swap-partition-ubuntu_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01d0a3590afccb4ecb.jpg" alt="创建交换分区"></a></p>
<p>​创建一个交换分区。最好是内存的一半大小。在我的例子中，我有 1 GB 的内存，因此创建一个 512 MB 的交换空间。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/install-ubuntu-root-partition_orig.jpg"><img src="https://p0.ssl.qhimg.com/t012012f8f70fa086b3.jpg" alt="安装 Ubuntu 到根（/）分区"></a></p>
<p>然后创建挂载点为 <code>/</code> 的分区，并且点击“Install Now”按钮。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/select-ubuntu-timezone_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01828fd2373e980893.jpg" alt="选择时区"></a></p>
<p>接下来选择你的位置以选择语言和键盘设置。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/install-ubuntu-select-location-keyboard-layout_orig.jpg"><img src="https://p0.ssl.qhimg.com/t014248043e221b1c56.jpg" alt="选择键盘布局"></a></p>
<p>​然后创建新用户的用户凭据。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/create-username-system-name-ubuntu-install_orig.jpg"><img src="https://p0.ssl.qhimg.com/t016c8b611d9aa3c4e1.jpg" alt="创建用户名、系统名并开始安装"></a></p>
<p>​点击“Next”开始安装。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/ubuntu-installation-finishing_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01f3382fd42ee2599b.jpg" alt="ubuntu installation finishing"></a></p>
<p>​当安装完成后点击“Restart Now”重启 PC。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/ubuntu-installation-finished_orig.jpg"><img src="https://p0.ssl.qhimg.com/t014ffdc455697007e2.jpg" alt="完成 Ubuntu 安装并重启系统"></a></p>
<p>​移除安装媒介，按下回车继续。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/remove-installation-media-after-ubuntu_orig.jpg"><img src="https://p0.ssl.qhimg.com/t010fcd03d23247b28e.jpg" alt="移除安装媒介"></a></p>
<p>在确认成功安装后，重新启动并利用 Arch Linux 安装媒介引导。</p>
<h3><a href="#安装-arch-linux"></a>​安装 Arch Linux</h3>
<p>​在引导到 Arch Linux 安装媒体时，您应该看到如下所示的初始屏幕。选择 “Boot Arch Linux(x86_64)”。注意 Arch Linux 更类似于一种 <a href="http://www.linuxandubuntu.com/home/arch-linux-take-your-linux-knowledge-to-next-level-review">DIY</a>（自我定制）的操作系统。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/arch-linux-installation-boot-menu_orig.jpg"><img src="https://p0.ssl.qhimg.com/t0158edc20a33583316.jpg" alt="Arch Linux 安装引导菜单"></a></p>
<p>选择之后，它将打开一个<code>tty1</code>终端，您将使用它来安装操作系统。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/arch-linux-tty1-linux_orig.png"><img src="https://p0.ssl.qhimg.com/t01b1f4017c93421623.png" alt="tty终端"></a></p>
<p>注意：为了成功安装 Arch Linux，您需要一个互联网连接来下载一些必须的系统安装包。所以我们需要检查一下互联网是否运行正常。输入以下命令到终端以检查网络连接。</p>
<pre><code class="hljs stylus">ping linuxandubuntu<span class="hljs-selector-class">.com</span> -c <span class="hljs-number">4</span>

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/arch-linux-ping-check-internet-connection_orig.png"><img src="https://p0.ssl.qhimg.com/t019a4103e2196ddacf.png" alt="检查互联网连接"></a></p>
<p>​如果互联网运行正常，你应该得到一个回显，显示发送和接收的数据包的数量。在这种情况下，我们发送了 4 个包，并得到了 4 个反馈，这意味着连接是正常的。</p>
<p>如果想在 Arch Linux 中设置 Wifi，请阅读<a href="http://www.linuxandubuntu.com/home/how-to-setup-a-wifi-in-arch-linux-using-terminal">本文</a>以在 Arch Linux 中配置 Wifi。 ​ ​接下来，我们需要选择之前在安装 Ubuntu 时预留出的空闲分区。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">fdisk -l</span>

</code></pre><p>​上面的命令应该显示可用的磁盘分区在哪里。您应该能看到 Ubuntu 分区以及预留的空闲空间。我们将使用 <code>cfdisk</code>命令进行分区。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">cfdisk</span>

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/install-arch-partition-disk-with-cfdisk_orig.png"><img src="https://p0.ssl.qhimg.com/t0109b1ddd4e80ec360.png" alt="利用cfdisk命令安装 Arch 分区"></a></p>
<p>执行命令后将看到分区情况。选择其它已分配分区下面的空闲空间。</p>
<p>您需要选择 “New”，然后输入分区大小。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/partition-free-space-swap-arch-linux_orig.png"><img src="https://p0.ssl.qhimg.com/t01b62f2be4638cc5b3.png" alt="为 Archlinux 分区"></a></p>
<p>例如，9.3G - G 表示千兆字节。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/install-arch-linux-partition_orig.png"><img src="https://p0.ssl.qhimg.com/t012287f1d911b8bfa9.png" alt="挂载 Arch Linux 分区"></a></p>
<p>如下图所示，选择“primary”进行分区</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/make-arch-linux-root-as-primary-partition_orig.png"><img src="https://p0.ssl.qhimg.com/t01ae40e214170e57e3.png" alt="将 Arch Linux 的根（root）分区设置成主分区"></a></p>
<p>然后选择写分区条目。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/select-partition-to-install-arch_orig.png"><img src="https://p0.ssl.qhimg.com/t019fbf22512ace7c98.png" alt="选择分区安装 Arch"></a></p>
<p>​键入“yes”，以确认写入分区表。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/install-arch-linux-confirm-create-partition_orig.png"><img src="https://p0.ssl.qhimg.com/t0192efa4114af2ad16.png" alt="确认创建分区并安装 Arch Linux"></a></p>
<p>然后选择 “Quit”（退出）选项。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/quit-cfdisk-arch-linux_orig.png"><img src="https://p0.ssl.qhimg.com/t01f93c78c48218f0aa.png" alt="退出 Arch Linux 的‘cfdisk’"></a> 然后键入：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">fdisk -l</span>

</code></pre><p>​确认修改。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/confirm-partition-changes_orig.png"><img src="https://p0.ssl.qhimg.com/t01ea13263adba30795.png" alt="确认分区修改"></a></p>
<p>​然后使用磁盘分区命令： ​</p>
<pre><code class="hljs stylus">mkfs<span class="hljs-selector-class">.ext4</span> /dev/sda3

</code></pre><p>​确保您选择的分区是我们创建的最后一个分区，这样我们就不会破坏 Ubuntu 分区。 ​ <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/complete-arch-linux-installation-partition_orig.png"><img src="https://p0.ssl.qhimg.com/t01a838f3b37d497829.png" alt="完成 Arch Linux 分区安装"></a></p>
<p>​然后使用以下命令安装这个分区： ​</p>
<pre><code class="hljs jboss-cli">mount <span class="hljs-string">/dev/sda3</span> <span class="hljs-string">/mnt</span>

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/mount-base-partition-in-arch-linux.png"><img src="https://p0.ssl.qhimg.com/t0185b5edf5fb299e96.png" alt="安装基础分区"></a></p>
<p>用下面命令创建“home”目录：</p>
<pre><code class="hljs arduino"><span class="hljs-built_in">mkdir</span> .mnt/<span class="hljs-built_in">home</span>

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/mount-home-partition-arch-linux.png"><img src="https://p0.ssl.qhimg.com/t01431dc116c048edda.png" alt="安装家目录"></a></p>
<p>​用以下命令安装“home”目录到这个分区上：</p>
<pre><code class="hljs awk">mount <span class="hljs-regexp">/dev/</span>sda3 <span class="hljs-regexp">/mnt/</span>home

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/make-mount-home-directory.png"><img src="https://p0.ssl.qhimg.com/t0128ae4acc448d0319.png" alt="安装家目录"></a></p>
<p>现在使用以下命令安装 Archlinux 的基本系统：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">pacstrap</span> /mnt <span class="hljs-keyword">base
</span>
</code></pre><p>请确保网络连接正常。 ​</p>
<p>接下来开始下载和配置安装所用时间取决于你的网速。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/install-arch-linux-base.png"><img src="https://p0.ssl.qhimg.com/t01832ef8fb33ed51e0.png" alt="安装Arch Linux 基础系统"></a></p>
<p>这一步骤完成后，将完成 Archlinux 基本安装。</p>
<p>Arch Linux 基础系统安装完成后，使用以下命令创建一个 <code>fstab</code> 文件：</p>
<pre><code class="hljs awk">genfstab -U <span class="hljs-regexp">/mnt &gt;&gt; /m</span>nt<span class="hljs-regexp">/etc/</span>fstab

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/create-fstab-file-in-arch-linux.png"><img src="https://p0.ssl.qhimg.com/t0118239985a3693b97.png" alt="创建 fstab文件"></a></p>
<p>在此之后，您需要验证<code>fstab</code>文件，使用下面命令:</p>
<pre><code class="hljs dts">cat <span class="hljs-meta-keyword">/mnt/</span>etc/fstab

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/cat-fstab-file-data-terminal.png"><img src="https://p0.ssl.qhimg.com/t0150edcc35ceb01b16.png" alt="查看 fstab 文件的终端显示"></a></p>
<h3><a href="#配置-arch-linux-的基础配置"></a>​配置 Arch Linux 的基础配置</h3>
<p>您将需要在安装时配置以下内容：</p>
<ol>
<li>系统语言和系统语言环境</li>
<li>系统时区</li>
<li>Root 用户密码</li>
<li>设置主机名</li>
</ol>
<p>首先，您需要使用以下命令将<code>root</code>切换为新安装的基础系统用户：</p>
<pre><code class="hljs jboss-cli">arch-chroot <span class="hljs-string">/mnt</span>

</code></pre><h4><a href="#1-系统语言和系统语言环境"></a>1. 系统语言和系统语言环境</h4>
<p>然后必须配置系统语言。必须取消对 en_Utf-8 UTF-8的注释，并加载到文件 <code>/etc/local.gen</code> 中。</p>
<p>键入：</p>
<pre><code class="hljs stata">nano /etc/<span class="hljs-keyword">local</span>.<span class="hljs-keyword">gen</span>

</code></pre><p>然后将 en_UTF-8 UTF-8 取消注释。</p>
<p>键入命令：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">locale-gen</span>

</code></pre><p>生成本地化设置如下：</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/generate-localization-arch-linux.png"><img src="https://p0.ssl.qhimg.com/t016c3fb61fb3e56e87.png" alt="生成本地化配置"></a></p>
<p>相应的需要在 <code>locale.conf</code> 文件中配置 LANG 变量。例如：</p>
<pre><code class="hljs stylus">nano /etc/locale<span class="hljs-selector-class">.conf</span>

</code></pre><p>​修改为：</p>
<pre><code class="hljs ini"><span class="hljs-attr">LANG</span>=en_US.UTF-<span class="hljs-number">8</span>

</code></pre><p>配置键盘布局，则在文件 <code>vconsole.conf</code> 中进行更改，如下操作：</p>
<pre><code class="hljs stylus">nano /etc/vconsole<span class="hljs-selector-class">.conf</span>

</code></pre><p>​修改为：</p>
<pre><code class="hljs ini"><span class="hljs-attr">KEYMAP</span>=us-eng

</code></pre><h4><a href="#2-系统时区"></a>2. 系统时区</h4>
<p>​配置时区需要利用以下命令实现：</p>
<pre><code class="hljs dts">ln -sf <span class="hljs-meta-keyword">/usr/</span>share<span class="hljs-meta-keyword">/zoneinfo/</span>Region/City <span class="hljs-meta-keyword">/etc/</span>localtime

</code></pre><p>要查看可用时区，可以在终端使用以下命令：</p>
<p>注意可选时区在屏幕截图中显示为蓝色：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">ls</span> <span class="hljs-string">/usr/share/zoneinfo</span>

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/setup-zonefile-in-arch-linux.png"><img src="https://p0.ssl.qhimg.com/t01b970e0372c12e288.png" alt="配置时区文件"></a></p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/setup-country-zonefile_orig.png"><img src="https://p0.ssl.qhimg.com/t018a1546246864d2ae.png" alt="配置地区"></a></p>
<p>运行 <code>hwclock</code> 命令来生成 <code>/etc/adjtime</code>（假设硬件时钟被设置为 UTC）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> hwclock --systohc</span>

</code></pre><h4><a href="#3-配置-root-用户密码"></a>3. 配置 root 用户密码</h4>
<p>​要为 Arch Linux 系统用户 root 设置密码，请使用：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">passwd</span>

</code></pre><p>​为 root 用户提供一个新的密码并确认密码使其生效。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/setup-arch-linux-root-password.png"><img src="https://p0.ssl.qhimg.com/t01e12952a3267622ce.png" alt="配置系统用户root密码"></a></p>
<h4><a href="#4-配置主机名和网络"></a>4. 配置主机名和网络</h4>
<p>​需要创建主机名文件：</p>
<pre><code class="hljs awk">nano <span class="hljs-regexp">/etc/</span>hostname

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/set-arch-linux-hostname.png"><img src="https://p0.ssl.qhimg.com/t014169c6a872f3b015.png" alt="配置主机名"></a></p>
<p>将名字更改为您的用户名:</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/set-arch-linux-username.png"><img src="https://p0.ssl.qhimg.com/t014f0b85c46c08b19d.png" alt="set arch linux username"></a></p>
<p>然后向主机添加一个匹配的条目：</p>
<pre><code class="hljs awk">nano <span class="hljs-regexp">/etc/</span>hosts

</code></pre><pre><code class="hljs css">127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span> <span class="hljs-selector-tag">localhost</span><span class="hljs-selector-class">.localdomain</span> <span class="hljs-selector-tag">localhost</span>

<span class="hljs-selector-pseudo">::1</span> <span class="hljs-selector-tag">localhost</span><span class="hljs-selector-class">.localdomain</span> <span class="hljs-selector-tag">localhost</span>

127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span> <span class="hljs-selector-tag">LinuxandUbuntu</span><span class="hljs-selector-class">.localdomain</span> <span class="hljs-selector-tag">LinuxandUbuntu</span>

</code></pre><p>您需要使网络保持连接，然后使用：</p>
<pre><code class="hljs routeros">systemctl <span class="hljs-builtin-name">enable</span> dhcpd

</code></pre><h4><a href="#配置-grub"></a>配置 Grub</h4>
<p>然后重启机器，进入 Ubuntu 配置 grub。</p>
<p>你可以键入：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">reboot</span>

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/reboot-system-after-arch-linux-installation.png"><img src="https://p0.ssl.qhimg.com/t01a2e483c89c069b27.png" alt="安装完成后重启"></a></p>
<p>Arch Linux 仍然没有出现，因此我们需要在 Ubuntu 中使用 <code>update-grub</code> 来安装它。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/ubuntu-grub-menu.png"><img src="https://p0.ssl.qhimg.com/t01d2aa35badc0b6fbd.png" alt="Ubuntu grub 菜单"></a></p>
<p>在Ubuntu中打开终端，输入:</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo update-grub</span>

</code></pre><p>这将更新 grub，添加 Arch Linux 记录。</p>
<h3><a href="#小结"></a>小结</h3>
<p>祝贺您成功地将 Ubuntu 和 Arch Linux 设置为双引导。Ubuntu 安装很简单，但是 Arch Linux 安装对新的 Linux 用户来说是一个挑战。我试着让这个教程变得简单。但是如果你对这篇文章有任何疑问，请在评论部分告诉我。还可以与您的朋友分享这篇文章，并帮助他们学习 Linux。</p>
<hr>
<p>via: <a href="http://www.linuxandubuntu.com/home/dual-boot-ubuntu-and-arch-linux">http://www.linuxandubuntu.com/home/dual-boot-ubuntu-and-arch-linux</a></p>
<p>作者：<a href="http://www.linuxandubuntu.com">LinuxAndUbuntu</a> 译者：<a href="https://github.com/stevenzdg988">stevenzdg988</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解 Ubuntu 和 Arch Linux 双启动

## 原文链接
[https://www.zcfy.cc/article/dual-boot-ubuntu-and-arch-linux](https://www.zcfy.cc/article/dual-boot-ubuntu-and-arch-linux)


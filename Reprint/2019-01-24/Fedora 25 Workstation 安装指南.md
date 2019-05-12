---
title: 'Fedora 25 Workstation 安装指南' 
date: 2019-01-24 2:30:11
hidden: true
slug: c8b4dlf57kc
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#fedora-25-workstation-安装指南"></a>Fedora 25 Workstation 安装指南</h1>
<p>在这篇教程中，我们将会走完在电脑上安装 Fedora 25 workstation 的每一步。该指南包括整个安装过程中的每一步截图，因此，请认真跟着操作。</p>
<h4><a href="#fedora-25-workstation-有哪些新特性"></a>Fedora 25 Workstation 有哪些新特性?</h4>
<p>正如大家所期待的那样，Fedora 的这个最新版本在基础组件上做了很多的改变以及修复大量的 bugs，除此之外，它带来了很多新的功能强大的软件，如下所示：</p>
<ul>
<li>GNOME 3.22, 可以重命名多个文件，重新设计的键盘布局工具以及一些用户界面上的改进。</li>
<li>使用 Wayland 代替 X11 系统,以满足现代图形硬件设备。</li>
<li>支持 MP3 格式解码。</li>
<li>Docker 1.12。</li>
<li>Node.js 6.9.1。</li>
<li>支持 Rust 系统编程语言。</li>
<li>支持多个版本的 Python 编程语言，包括 Python2.6, 2.7, 3.3, 3.4 和 3.5。</li>
<li>不再检查 GNOME Shell 扩展与当前的 Shell 版本的兼容性等等。</li>
</ul>
<p>注意：如果电脑上已安装了前一个版本 Fedora 24，或许你可以考虑使用更简单的几个步骤<a href="http://www.tecmint.com/upgrade-fedora-24-to-fedora-25-workstation-server/">将 Fedora 24 升级到 Fedora 25</a> 以避免全新的安装过程。</p>
<h3><a href="#安装-fedora-25-workstation-版本"></a>安装 Fedora 25 Workstation 版本</h3>
<p>从下面的链接下载 ISO 系统镜像开始，本安装教程将使用 64 位的镜像来安装。</p>
<ul>
<li><a href="https://download.fedoraproject.org/pub/fedora/linux/releases/25/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-25-1.3.iso">下载 Fedora 25 Workstation 64 位版本</a></li>
<li><a href="https://download.fedoraproject.org/pub/fedora/linux/releases/25/Workstation/i386/iso/Fedora-Workstation-Live-i386-25-1.3.iso">下载 Fedora 25 Workstation 32位版本</a></li>
</ul>
<p>下载完 Fedora 25 的系统镜像后，第一步是创建一个可启动设备（DVD 或 USB 设备），使用 <a href="http://www.tecmint.com/install-linux-from-usb-device/">Unetbootin 和 dd 命令</a>来制作 USB 启动工具，或使用其它你想用的方法也行。</p>
<ol>
<li>创建完成启动设备后，插入并从该设备（DVD/USB）启动，此时，你应该看到如下图所示的 <strong>Fedora Workstation Live</strong> 的启动界面。</li>
</ol>
<p>选择 “<strong>Start Fedora-Workstation-Live 25</strong>” 选项，然后单点 Enter 按钮。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Start-Fedora-25.png"><img src="https://p3.ssl.qhimg.com/t0140394e301f6d06d3.png" alt="Fedora 25 Boot Menu"></a></p>
<p><em>Fedora 25 启动菜单</em></p>
<ol>
<li>接下来，你会进入到登录界面，单击“<strong>Live System User</strong>”以 Live user 身份进入系统。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Fedora-25-Live-User-Login.png"><img src="https://p5.ssl.qhimg.com/t018a7f24bd55bf45e4.png" alt="Fedora 25 Live User Login"></a></p>
<p>*Fedora 25 Live User 登录</p>
<ol>
<li>登入系统后，几秒钟后桌面上会出现下面的欢迎界面，如果你想在安装前试用 Fedora 系统，单击 “<strong>Try Fedora</strong>”，否则单击 “<strong>Install to Hard Disk</strong>” 进入到全新安装过程。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Fedora-25-Welcome-Screen.png"><img src="https://p5.ssl.qhimg.com/t01d2383efbd3f4d6a4.png" alt="Fedora 25 Welcome Screen"></a></p>
<p><em>Fedora 25 欢迎界面</em></p>
<ol>
<li>在下面的界面中，选择想要使用的安装语言，然后单击“<strong>Continue</strong>"按钮进入到安装总结页面。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Select-Installation-Language-Type.png"><img src="https://p1.ssl.qhimg.com/t01a7c3a96b5444bf29.png" alt="Select Installation Language Type"></a></p>
<p><em>选择安装语言类型</em></p>
<ol>
<li>下图是安装总结界面，显示默认的区域及系统设置内容。你可以根据自己的位置和喜好来定制区域及系统设置。</li>
</ol>
<p>从键盘设置开始。单击“<strong>KEYBOARD</strong>”进入到键盘布局自定义设置界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Fedora-25-Installation-Summary.png"><img src="https://p5.ssl.qhimg.com/t01a7b9f75f3759fa38.png" alt="Fedora 25 Installation Summary"></a></p>
<p><em>Fedora 25 安装总结</em></p>
<ol>
<li>在这个界面中，根据你电脑之前的设置使用<code>+</code>号来添加你需要的键盘布局，然后单击“<strong>Done</strong>"返回到安装总结界面。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Set-Keyboard-Layout.png"><img src="https://camo.githubusercontent.com/17cd11880d01a574b73fdadf2be9492c4fcaa77a/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f5365742d4b6579626f6172642d4c61796f75742e706e67" alt="Set Keyboard Layout"></a></p>
<p><em>设置键盘布局</em></p>
<ol>
<li>下一步，单击“<strong>TIME &amp; DATA</strong>"调整系统时间和日期。输入所在地区和城市来设置时区，或者快速从地图上选择。</li>
</ol>
<p>注意你可以从右上角启用或者停用网络时间。设置完系统时间和日期后，单击“<strong>Done</strong>”返回到安装总结界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Set-System-Timezone.png"><img src="https://p2.ssl.qhimg.com/t01a11bd75a81311535.png" alt="Set System Timezone"></a></p>
<p><em>设置系统时区</em></p>
<ol>
<li>返回到安装总结界面，单击“<strong>NETWORK &amp; HOSTNAME</strong>” 设置网络和主机名。</li>
</ol>
<p>主机名设置完成后，单击 <strong>Apply</strong> 应用按钮检查主机名是否可用，如果可用，单击“<strong>Done</strong>”。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Set-Hostname-Fedora-25.png"><img src="https://p5.ssl.qhimg.com/t019d42a2f30ecdbc9c.png" alt="Set Hostname for Fedora 25"></a></p>
<p><em>设置 Fedora 25 的主机名</em></p>
<ol>
<li>此时，在安装总结界面，单击“<strong>INSTALLATION DESTINATION</strong>”来为系统文件划分安装空间。</li>
</ol>
<p>在“<strong>Other Storage Options</strong>（其它存储选项）上选择“<strong>I will configure partitioning</strong>”来执行手动分区，然后单击 “<strong>Done</strong>” 前进至手动分区界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Select-Installation-Destination-Drive.png"><img src="https://p5.ssl.qhimg.com/t011d58707e6a249a32.png" alt="Select Installation Destination Drive"></a></p>
<p><em>选择安装位置</em></p>
<ol>
<li>下面是手动分区界面，选择“<strong>Standard Partition</strong>”（标准分区）为新的分区模式来安装。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Manual-Partitioning-Selection.png"><img src="https://p4.ssl.qhimg.com/t0198e480525dd4fa74.png" alt="Manual Partitioning Selection"></a></p>
<p><em>手动配置分区</em></p>
<ol>
<li>现在通过点<code>+</code>号增加一个挂载点来创建一个<code>/root</code>分区。</li>
</ol>
<pre><code class="hljs gams">Mount Point: /root
Desired Capacity: <span class="hljs-keyword">set</span> appropriate <span class="hljs-comment">size( eg 100 GB)</span>

</code></pre><p>之后，单击“<strong>Add mount point</strong>”添加刚刚创建的分区/挂载点。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Create-New-Root-Partition.png"><img src="https://p5.ssl.qhimg.com/t010265b7b16543749d.png" alt="Create New Root Partition"></a></p>
<p>创建新的 Root 分区</p>
<p>下图展示为 <code>/root</code> 分区设置。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Root-Partition-Settings.png"><img src="https://p4.ssl.qhimg.com/t01acd04e086aebc1e2.png" alt="Root Partition Settings"></a></p>
<p><em>Root 分区设置</em></p>
<p>12.下一步，通过<code>+</code>号创建 swap 分区</p>
<p>Swap 分区是硬盘上的一个虚拟的磁盘空间，用于临时存放那些当前 CPU 不使用的内存数据。</p>
<pre><code class="hljs avrasm">Mount Point: <span class="hljs-keyword">swap</span>
Desired Capacity: <span class="hljs-keyword">set</span> appropriate size( eg <span class="hljs-number">4</span> GB)

</code></pre><p>单击 <strong>Add mount point</strong> 来添加swap分区。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Create-Swap-Partition.png"><img src="https://p4.ssl.qhimg.com/t010923fe321b1900c4.png" alt="Create Swap Partition"></a></p>
<p><em>创建 Swap 分区</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Swap-Partition-Settings.png"><img src="https://p1.ssl.qhimg.com/t0187b356d6a1a7f9b7.png" alt="Swap Partition Settings"></a></p>
<p><em>Swap 分区设置</em></p>
<ol>
<li>创建完 <code>root</code> 分区和 <code>swap</code> 分区后，单击“<strong>Done</strong>”按钮来查看这些要对磁盘进行的更改。单击 “<strong>Accept Changes</strong>” 允许执行所有的分区调整。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Accept-Partition-Changes.png"><img src="https://p2.ssl.qhimg.com/t01db4a7041de85fbf1.png" alt="Accept Partition Changes"></a></p>
<p><em>接受分区调整</em></p>
<ol>
<li>你最后的安装总结内容应该跟下图显示的差不多。单击“<strong>Begin Installation</strong>”开始真正安装系统。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Final-Installation-Summary.png"><img src="https://p1.ssl.qhimg.com/t0148bcba9cac596f91.png" alt="Final Installation Summary"></a></p>
<p><em>最后的安装总结内容</em></p>
<ol>
<li>系统文件安装开始后，你可以在下面的界面中，创建一个常用的系统用户，并为 root 账号设置密码。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/User-Configuration-Settings.png"><img src="https://camo.githubusercontent.com/f052d521b2d5423c8ecf09e4be3e8087e7e1bce7/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f557365722d436f6e66696775726174696f6e2d53657474696e67732e706e67" alt="User Configuration Settings"></a></p>
<p><em>用户配置设置</em></p>
<ol>
<li>之后，单击 <strong>ROOT PASSWORD</strong> 来设置 root 账号密码。像之前一样，单击 <strong>Done</strong> 返回到用户配置界面。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Set-Root-Account-Password.png"><img src="https://p2.ssl.qhimg.com/t01422c8de281629705.png" alt="Set Root Account Password"></a></p>
<p><em>设置root账号密码</em></p>
<ol>
<li>之后，在用户配置界面单击 <strong>USER CREATION</strong> 按钮来创建一个常用的系统用户。你也可以勾选“<strong>Make the user administrator</strong>”选项把该用户提升为系统管理员。</li>
</ol>
<p>再次单击 <strong>Done</strong> 按钮继续。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Create-System-User-Account.png"><img src="https://p3.ssl.qhimg.com/t01f0e281ceaac9ae77.png" alt="Create System User Account"></a></p>
<p><em>创建系统用户账号</em></p>
<ol>
<li>安装过程将会持续一段时间，你可以去休息会了。安装完成之后，单击 <strong>Quit</strong> 重启系统，并弹出你使用的启动设备。终于，你可以登录进入新的Fedora 25 Workstation了。 </li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Fedora-25-Login-Screen.png"><img src="https://camo.githubusercontent.com/a425392f68e491d0c79a2fa4c952dd953538d5fb/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4665646f72612d32352d4c6f67696e2d53637265656e2e706e67" alt="Fedora 25 Login Screen"></a></p>
<p><em>Fedora 25登录界面</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Fedora-25-Workstation-Desktop.png"><img src="https://p4.ssl.qhimg.com/t01f6f4c3823cdffda4.png" alt="Fedora 25 Workstation Desktop"></a></p>
<p><em>Fedora 25 Workstation 桌面</em></p>
<p>就写到这里吧！请在下面提出相关的问题并发表评论。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/fedora-25-installation-guide/">http://www.tecmint.com/fedora-25-installation-guide/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/rusking">rusking</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Fedora 25 Workstation 安装指南

## 原文链接
[https://www.zcfy.cc/article/fedora-25-workstation-installation-guide](https://www.zcfy.cc/article/fedora-25-workstation-installation-guide)


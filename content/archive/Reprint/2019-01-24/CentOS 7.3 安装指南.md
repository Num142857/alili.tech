---
title: 'CentOS 7.3 安装指南' 
date: 2019-01-24 2:30:11
hidden: true
slug: vcsrvadj6tf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#centos-73-安装指南"></a>CentOS 7.3 安装指南</h1>
<p>基于 Red Hat 企业版的源代码的最新版本的 CentOS 7 在今年的 12月发布了 CentOS Linux 7 (1611) ，包含了许多 bug 修复、新的包更新，比如 Samba、Squid、libreoffice、SELinux、systemd 及其它软件，并支持第七代 Intel 酷睿 i3、i5、i7 处理器。</p>
<p>本指南会向你展示如何在 UEFI 的机器上使用 DVD ISO 镜像来安装 CentOS 7.3。</p>
<p>如果你要是用 RHEL，看下我们的 <a href="http://www.tecmint.com/red-hat-enterprise-linux-7-3-installation-guide/">RHEL 7.3 安装指南</a>。</p>
<h4><a href="#要求"></a>要求</h4>
<ul>
<li><a href="http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1611.iso">下载 CentOS 7.3 ISO 镜像</a></li>
</ul>
<p>要在 UEFI 的机器上正确安装 CentOS 7.3，首先按下键（<code>F2</code>、<code>F11</code> 或 <code>F12</code>，取决与你的主板类型）进入主板的 UEFI 设置，并且确保 QuickBoot/FastBoot 以及 Secure Boot 已被禁用。</p>
<h3><a href="#centos-73-安装"></a>CentOS 7.3 安装</h3>
<p>1、 在你从上面的链接下载完成镜像之后，使用 <a href="https://rufus.akeo.ie/">Rufus</a>将它烧录到 DVD 或者创建一个可启动的 UEFI 兼容 USB 盘。</p>
<p>将 USB/DVD 放入主板上连接的驱动器中，重启电脑并用特定的功能键（<code>F12</code>、 <code>F10</code>，取决于主板类型）让 BIOS/UEFI 从 DVD/USB 启动。</p>
<p>ISO 镜像启动完成后，你机器上会显示如下首屏。在菜单中选择 “Install CentOS 7”并按下回车继续。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/CentOS-7.3-Boot-Menu.png"><img src="https://p5.ssl.qhimg.com/t01e8abbb445aae8d49.png" alt="CentOS 7.3 Boot Menu"></a></p>
<p><em>CentOS 7.3 启动菜单</em></p>
<p>2、 在安装镜像加载到内存完成后，会显示一个欢迎页面。选择你在安装中使用的语言并按下“继续（Continue）”按钮。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-CentOS-7.3-Installation-Language.png"><img src="https://p3.ssl.qhimg.com/t019cfa034410b47038.png" alt="Select CentOS 7.3 Installation Language"></a></p>
<p><em>选择 CentOS 7.3 安装语言</em></p>
<p>3、 在下一个页面点击“日期和时间（Date and Time）”，从地图中选择你的地理位置。确认日期和时间正确配置了并点击“完成（Done）”按钮来回到主安装界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/CentOS-7.3-Installation-Summary.png"><img src="https://p3.ssl.qhimg.com/t01800710cf53e95ba0.png" alt="CentOS 7.3 Installation Summary"></a></p>
<p><em>CentOS 7.3 安装总结</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-Date-and-Time.png"><img src="https://p0.ssl.qhimg.com/t01924b94bf86efe53e.png" alt="Select Date and Time"></a></p>
<p><em>选择日期和时间</em></p>
<p>4、 点击“键盘（Keyboard）”菜单进入键盘布局页面。选择或者添加一个键盘布局并点击“完成（Done）”按钮继续。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-Keyboard-Layout.png"><img src="https://p3.ssl.qhimg.com/t01b360c31c6040d6d5.png" alt="Select Keyboard Layout"></a></p>
<p><em>选择键盘布局</em></p>
<p>5、 接下来，为你的系统添加或者配置一个语言并点击“完成（Done）”按钮进入下一步。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-Language-Support.png"><img src="https://p2.ssl.qhimg.com/t01dbddfff3d0051563.png" alt="Select Language Support"></a></p>
<p><em>选择语言支持</em></p>
<p>6、 在这步中，你可以通过选择列表中安全配置来设置你的系统“安全策略（Security Policy）”。</p>
<p>点击选择配置按钮来选择你想要的安全配置并点击“应用安全策略（Apply security policy）”按钮到 On。点击“完成（Done）”按钮后继续安装流程。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Enable-CentOS-7-Security-Policy.png"><img src="https://p4.ssl.qhimg.com/t011709dda713478f08.png" alt="Enable CentOS 7.3 Security Policy"></a></p>
<p><em>启用 CentOS 7.3 安全策略</em></p>
<p>7、 下一步中你可以点击“软件选择（Software Selection）”按钮来配置你的基础机器环境。</p>
<p>左边的列表是你可以选择安装桌面环境（Gnome、KDE Plasma 或者创意工作站）或者安装一个服务器环境（Web 服务器、计算节点、虚拟化主机、基础设施服务器、带图形界面的服务器或者文件及打印服务器）或者执行一个最小化的安装。</p>
<p>为了随后能自定义你的系统，选择最小化安装并附加兼容库，点击“完成（Done）”按钮继续。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/CentOs-7.3-Software-Selection.png"><img src="https://camo.githubusercontent.com/a477c1bda89be57c6b2c6d026ea50d946659008b/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31322f43656e744f732d372e332d536f6674776172652d53656c656374696f6e2e706e67" alt="CentOS 7.3 Software Selection"></a></p>
<p><em>CentOS 7.3 软件选择</em></p>
<p>对于完整的 Gnome 或者 KDE 桌面环境，使用下面的截图作为指引。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Gnome-Desktop-Software-Selection.png"><img src="https://p1.ssl.qhimg.com/t01089c8bbf239a9494.png" alt="Gnome Desktop Software Selection"></a></p>
<p><em>Gnome 桌面软件选择</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/KDE-Desktop-Software-Selection.png"><img src="https://p4.ssl.qhimg.com/t01fc20fb8730303e54.png" alt="KDE Desktop Software Selection"></a></p>
<p><em>KDE 桌面软件选择</em></p>
<p>8、 假设你要在服务器上安装一个图形界面，选择左边那栏“带 GUI 的服务器（Server with GUI）”那项，并在右边那栏中根据你需要提供给客户端的服务选择合适的附加软件。</p>
<p>你可以选择的服务是非常多样化的，从备份、DNS 或者 e-mail 服务到文件存储服务、FTP、HA 或者<a href="http://www.tecmint.com/command-line-tools-to-monitor-linux-performance/">监控工具</a>。只选择对你网络设置最重要的服务。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-Server-with-Gui.png"><img src="https://p5.ssl.qhimg.com/t01d3c13bb74273aa43.png" alt="Select Server with GUI"></a></p>
<p><em>选择带 GUI 的服务器</em></p>
<p>9、 如果你不使用特定的网络协议比如 HTTP、HTTPS、FTP 或者 NFS 的额外仓库，安装源保持默认，并点击“安装位置（Installation Destination）”来创建一个磁盘分区。</p>
<p>在“设备选择（Device selection）”页面，确保你已经选择了本地磁盘。同样，在“其他存储选项（Other Storage Options）”中确保选择了“自动配置分区（Automatically configure partitioning）”。</p>
<p>这个选项可以确保你的磁盘会恰当地根据磁盘空间和 Linux 文件系统层次结构进行分区。它会为你自动创建 <code>/（root）</code>、<code>/home</code>和 swap 分区。点击“完成（Done）”来应用磁盘分区方案并回到主安装界面。</p>
<p>重要提醒：<strong>如果你想要创建自定义分区及自定义分区大小，你可以选择“我要配置分区（I will configure partitioning）”选项来创建自定义分区。</strong></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-CentOS-7.3-Installation-Destination.png"><img src="https://p5.ssl.qhimg.com/t01dc9966af9f806c5f.png" alt="Select CentOS 7.3 Installation Destination"></a></p>
<p><em>安装 CentOS 7.3 安装位置</em></p>
<p>10、 接下来，如果你想要释放系统内存，点击 KDUMP 选项并禁用它。点击“完成（Done）”并回到主安装界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Kdump-Selection.png"><img src="https://p4.ssl.qhimg.com/t01cc5429d4fe92aeeb.png" alt="Kdump Selection"></a></p>
<p><em>Kdump 选择</em></p>
<p>11、 在下一步中设置你的主机名并启用网络服务。点击“网络和主机名（Network &amp; Hostname）”，在主机名中输入你的 FQDN（完整限定网域名称），如果你在局域网中有一个 DHCP 服务器，将以太网按钮从 OFF 切换到 ON 来激活网络接口。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Set-Network-Hostname.png"><img src="https://p1.ssl.qhimg.com/t01c21de76292540454.png" alt="Set Network and Hostname"></a></p>
<p><em>设置网络及主机名</em></p>
<p>12、 为了静态配置你的网络接口，点击“配置（Configure）”按钮，手动如截图所示添加 IP 设置，并点击“保存（Save）”按钮来应用更改。完成后，点击“完成（Done）”按钮来回到主安装菜单。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Configure-Network-and-IP-Address.png"><img src="https://p3.ssl.qhimg.com/t01b574a1e7e781d026.png" alt="Configure Network and IP Address"></a></p>
<p><em>配置网络和 IP 地址</em></p>
<p>13、 最后检查下所有到目前为止的配置，如果一切没问题，点击“开始安装（Begin Installation）”按钮开始安装。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Begin-CentOS-7.3-Installation.png"><img src="https://p1.ssl.qhimg.com/t01a2c7779846c83dad.png" alt="Begin CentOS 7.3 Installation Guide"></a></p>
<p><em>开始 CentOS 7.3 安装向导</em></p>
<p>14、 开始安装后，一个新的设置用户界面会显示出来。首先点击 “root 密码（ROOT PASSWORD）”并添加一个强密码。</p>
<p>root 账户是每个 Linux 系统的最高管理账户密码，它拥有所有的权限。设置完成后点击完成按回到用户设置界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Select-Root-Password.png"><img src="https://p3.ssl.qhimg.com/t01e138c09064372487.png" alt="Select Root Password"></a></p>
<p><em>选择 root 密码</em></p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Set-Root-Password.png"><img src="https://p1.ssl.qhimg.com/t0145486495f1937b13.png" alt="Set Root Password"></a></p>
<p><em>设置 root 密码</em></p>
<p>15、 用 root 账户运行系统是非常不安全和危险的，因此建议你点击“创建用户（User Creation）”按钮创建一个新的系统账户来<a href="http://www.tecmint.com/file-and-directory-management-in-linux/">执行每日的系统任务</a>。</p>
<p>添加新的用户，并同时选择下面的两个选项来授予用户 root 权限以及每次在登录系统时手动输入密码。</p>
<p>当你完成最后一项点击“完成（Done）”按钮并等待安装完成。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Create-User-Account.png"><img src="https://p4.ssl.qhimg.com/t010459ae4c81b13318.png" alt="Create User Account"></a></p>
<p><em>创建用户账户</em></p>
<p>16、 几分钟后安装程序会报告 CentOS 已经成功安装在你机器中。要使用系统，你只需要移除安装媒介并重启机器。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/CentO-7.3-Installation-Complete.png"><img src="https://p2.ssl.qhimg.com/t01e17ef80e0ed8c61f.png" alt="CentOS 7.3 Installation Complete"></a></p>
<p><em>CentOS 7.3 安装完成</em></p>
<p>17、 重启之后，使用安装中创建的用户登录系统，并且用 root 权限执行下面的命令来执行系统更新。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum update</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Update-CentOS-7.3.png"><img src="https://p1.ssl.qhimg.com/t013217b878697e18dc.png" alt="Update CentOS 7.3"></a></p>
<p><em>更新 CentOS 7.3</em></p>
<p>所有 <a href="http://www.tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement/">yum 管理器</a>的问题都选择<code>yes</code>，最后再次重启电脑（使用 <code>sudo init 6</code>）来应用新的内核升级。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo init 6</span>

</code></pre><p>就是这样！在你的机器中享受最新的 CentOS 7.3 吧。</p>
<hr>
<p>作者简介:</p>
<p>Matei Cezar</p>
<p><a href="https://camo.githubusercontent.com/f195240d9259689ae1968d4919088a0c3e74509f/687474703a2f2f322e67726176617461722e636f6d2f6176617461722f62653136653534303236633734323964323834393063636534316231653135373f733d31323826643d626c616e6b26723d67"><img src="https://p4.ssl.qhimg.com/t0155420a0f8970018c.jpg" alt=""></a></p>
<p>我是一个电脑上瘾的家伙，一个开源和 Linux 系统软件的粉丝，有大约 4 年的 Linux 桌面、服务器和 bash 脚本的经验。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/centos-7-3-installation-guide/">http://www.tecmint.com/centos-7-3-installation-guide/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/cezarmatei/">Matei Cezar</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CentOS 7.3 安装指南

## 原文链接
[https://www.zcfy.cc/article/installation-of-centos-7-3-guide](https://www.zcfy.cc/article/installation-of-centos-7-3-guide)


---
title: '如何配置 VirtualBox 中的客户机与宿主机之间的网络连接' 
date: 2019-01-23 2:30:08
hidden: true
slug: qudo0ug20h8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何配置-virtualbox-中的客户机与宿主机之间的网络连接"></a>如何配置 VirtualBox 中的客户机与宿主机之间的网络连接</h1>
<p>当你在 <a href="http://www.tecmint.com/install-virtualbox-on-redhat-centos-fedora/">VirtualBox 虚拟机软件</a> 中安装了各种操作系统时，你可能需要实现宿主机与虚拟机之间的相互访问。</p>
<p>在这篇文章中，我们将会以最简单明了的方式来说明如何配置客户机与 Linux 宿主机的网络，以实现两者相互访问或者让客户机连接到外网。（LCTT 译注：客户机指 Oracle VirtualBox 虚拟机软件中安装的操作系统，如本文中用到的 CentOS 7 和 Ubuntu 16.10 。宿主机就是你自己的笔记本电脑或台式机，注意这篇文章中作者的宿主机上安装的操作系统是 Linux Mint 18 ，而不是我们平时使用的 Windows 系统。）</p>
<p>本文测试环境： 1、宿主机操作系统—— Linux Mint 18 2、客户机操作系统—— CentOS 7 和 Ubuntu 16.10</p>
<h4><a href="#要求"></a>要求</h4>
<p>1、宿主机上安装的 <a href="http://www.tecmint.com/install-virtualbox-on-redhat-centos-fedora/">Oracle VirtualBox 虚拟机</a> 能正常使用。 2、你得事先在 Oracle virtualBox 虚拟机软件中安装好客户机操作系统，比如 Ubuntu、Fedora、CentOS、 Linux Mint 或者其它的 Linux 系统也行。 3、在你配置网络前，请先关闭客户机。</p>
<p>为了让宿主机和客户机能够互相联通，这两个机器的默认网卡 IP 必须设置在同一网段，你可以为客户机添加多达 4 块网卡。</p>
<p>默认网卡（网卡 1）通常用于使用 NAT 连接方式连接到宿主机进行上网。</p>
<p>重要提示：通常总是设置第一块网卡与宿主机通信，第二块网卡连接到外网。</p>
<h3><a href="#为客户机和宿主机创建网卡"></a>为客户机和宿主机创建网卡</h3>
<p>在下面的 VirtualBox 管理器界面，创建客户机和宿主机之间的通信网卡。</p>
<p>打开文件-&gt;首选项配置，或者使用组合键 <code>Ctrl + G</code> ：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Virtualbox-Preferences-Window.png"><img src="https://p1.ssl.qhimg.com/t01cb7fab630de99873.png" alt="Virtualbox Preferences Window"></a></p>
<p><em>Virtualbox 首选项界面</em></p>
<p>在下图中有两个选项，单击并选择仅主机（ Host-only ）网络。然后使用右侧的 <code>+</code> 按钮来添加一个新的仅主机网络。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Set-Guest-Network.png"><img src="https://p4.ssl.qhimg.com/t01e1e9c0bff8edf3b2.png" alt="Set Guest Network"></a></p>
<p><em>设置客户机网络</em></p>
<p>这样就创建好了一个名为 vboxnet0 的新的仅主机模式网卡。</p>
<p>如果你愿意，你可以使用中间的 <code>-</code> 按钮来删除这个网卡，你可以单击编辑按钮来查看这个网卡的详细配置信息。</p>
<p>你也可以根据自己的实际环境修改配置信息，比如网络地址，子网掩码等等。</p>
<p>注意：下图中的 IPv4 地址就是你的宿主机的 IP 地址。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Host-Network-Details.png"><img src="https://p5.ssl.qhimg.com/t014a0a764856a4b681.png" alt="Host Network Details"></a></p>
<p><em>宿主机网络信息</em></p>
<p>下图中，如果你想让客户机使用动态 IP 地址，你可以通过配置 DHCP 服务来完成（在使用前请确保启用 DHCP ）。但是我建议你为客户机配置一个静态 IP 地址。</p>
<p>在下面的设置所有网络界面单击 OK 按钮来保存修改的配置。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Set-Guest-Static-IP-Address.png"><img src="https://p0.ssl.qhimg.com/t012f515d9e2f2049ba.png" alt="Set Guest Static IP aAddress"></a></p>
<p><em>为客户机设置静态 IP 地址</em></p>
<h4><a href="#配置客户机网络设置"></a>配置客户机网络设置</h4>
<p>注意：你可以根据下面的步骤来为任何需要与宿主机通信的客户机添加网卡。</p>
<p>回到 VirtualBox 管理器界面，选择客户机，比如  Ubuntu 16.10 Server 或者 CentOS 7 ，然后单击设置菜单。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Configure-VM-Settings.png"><img src="https://p1.ssl.qhimg.com/t019ac2af4b5d989748.png" alt="Configure VM Settings"></a></p>
<p><em>配置客户机网络设置</em></p>
<h4><a href="#配置客户机网卡以连接到宿主机"></a>配置客户机网卡以连接到宿主机</h4>
<p>从下图的界面中选择网络选项。然后配置第一块网卡（ 网卡 1 ）的信息如下：</p>
<p>1、勾选选项：“启用网卡”来开启该网卡。 2、在连接方式选项：选择仅主机（ Host-only ）网络。 3、然后选择网卡名称：vboxnet0</p>
<p>如下图所示，单击 OK 来保存设置：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Enable-Network-Adapter-for-Guest-VM.png"><img src="https://p3.ssl.qhimg.com/t01a824eaedd007d182.png" alt="Enable Network Adapter for Guest VM"></a></p>
<p><em>启用客户机网络</em></p>
<h4><a href="#配置客户机网卡连接外网"></a>配置客户机网卡连接外网</h4>
<p>之后添加第二块网卡（网卡 2 ）来让客户机连接到宿主机进行上网。使用下面的设置：</p>
<p>1、勾选选项：“启用网络连接”来激活这块网卡。 2、在连接方式选项：选择 NAT 方式。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Enable-Network-Adapter-for-VM.png"><img src="https://p4.ssl.qhimg.com/t0165a70f3b193f42a7.png" alt="Enable Network Adapter for VM"></a></p>
<p>为客户机启用网络连接</p>
<h4><a href="#为客户机设置静态-ip-地址"></a>为客户机设置静态 IP 地址</h4>
<p>启动客户机，登录系统并<a href="http://www.tecmint.com/set-add-static-ip-address-in-linux/">配置静态 IP 地址</a>。在客户机上执行下面的命令来查看所有网卡配置信息，然后分配一个 IP 地址：</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span><span class="hljs-builtin-name">add</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Configure-Static-IP-Address-for-VM.png"><img src="https://p4.ssl.qhimg.com/t0116de7f8a17775dcb.png" alt="Configure Static IP Address for VM"></a></p>
<p><em>为客户机配置静态 IP 地址</em></p>
<p>从上面的截图中可以看出客户机已启用了三块网卡：</p>
<p>1、<code>lo</code> ——回环网络接口 2、<code>enp0s3</code> （网卡 1）—— 前一步我们配置的连接方式为仅主机（ Host-Only）模式并且已启用 DHCP 的网卡，之后我们又配置成了静态 IP 地址。 3、<code>enp0s8</code> （网卡 2）—— 用于连接到外网。该网卡默认情况下使用 DHCP 来动态获取 IP 地址。</p>
<h5><a href="#在-debianubuntulinux-mint-系统下的配置"></a>在 Debian/Ubuntu/Linux Mint 系统下的配置</h5>
<p>重要提示: 这里我使用的是 Ubuntu 16.10 Server ， IP 地址为 192.168.56.5 。</p>
<p>使用你喜欢的编辑器及管理员账号打开 <code>/etc/network/interfaces</code> 配置文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vi /etc/network/interfaces</span>

</code></pre><p>修改网卡 enp0s3 的配置信息如下（根据你的实际环境进行修改）：</p>
<pre><code class="hljs routeros">auto  enp0s3
iface enp0s3 inet static<span class="hljs-built_in">
address </span> 192.168.56.5<span class="hljs-built_in">
network </span> 192.168.56.0
netmask  255.255.255.0
gateway  192.168.56.1
dns-nameservers  8.8.8.8  192.168.56.1

</code></pre><p>保存并退出。</p>
<p>然后使用下面的命令来重启网络服务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo systemctl restart networking</span>

</code></pre><p>或者，正常重启系统，然后检查网络配置是否为新的 IP 地址：</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span><span class="hljs-builtin-name">add</span>

</code></pre><p>#####在 RHEL/CentOS/Fedora 系统下的配置</p>
<p>重要提示: 这里我使用的是 CentOS 7 系统， IP 地址为： 192.168.56.10 。</p>
<p>使用管理员帐号及你喜欢的编辑器打开 enp0s3 （仅主机网络）的网卡配置文件 <code>/etc/sysconfig/network-scripts/ifcfg-enp0s3</code> ：</p>
<pre><code class="hljs awk">$ sudo vi <span class="hljs-regexp">/etc/</span>sysconfig<span class="hljs-regexp">/network-scripts/i</span>fcfg-enp0s3

</code></pre><p>创建或修改配置文件信息如下（根据你实际的环境进行修改）：</p>
<pre><code class="hljs routeros"><span class="hljs-attribute">BOOTPROTO</span>=static
<span class="hljs-attribute">ONBOOT</span>=<span class="hljs-literal">yes</span>
<span class="hljs-attribute">IPADDR</span>=192.168.56.10
<span class="hljs-attribute">NETWORK</span>=192.168.56.0
<span class="hljs-attribute">NETMASK</span>=255.255.255.0
<span class="hljs-attribute">GATEWAY</span>=192.168.56.1
<span class="hljs-attribute">DNS</span>=8.8.8.8 192.168.56.1
<span class="hljs-attribute">NM_CONTROLLED</span>=<span class="hljs-literal">no</span>     #use this file <span class="hljs-keyword">not</span><span class="hljs-built_in"> network </span>manager <span class="hljs-keyword">to</span> manage<span class="hljs-built_in"> interface
</span>
</code></pre><p>保存并退出。然后使用下面的命令重启网络服务（也可以重启系统）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo systemctl restart network.service </span>

</code></pre><p>检查修改的配置地信息是否生效：</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span><span class="hljs-builtin-name">add</span>

</code></pre><h4><a href="#在宿主机上使用-ssh-工具来管理客户机"></a>在宿主机上使用 SSH 工具来管理客户机</h4>
<p>在宿主机上使用 SSH 工具来管理你的客户机。在下面的实例中，我将使用 SSH 工具连接到 CentOS 7 服务器（192.168.56.10）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ssh tecmint@192.168.56.10</span>
<span class="hljs-meta">$</span><span class="bash"> who</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Connect-Guest-VM-using-SSH.png"><img src="https://p3.ssl.qhimg.com/t0171b1dccb74a2cc98.png" alt="Connect Guest VM using SSH"></a></p>
<p><em>使用 SSH 工具连接客户机</em></p>
<p>就写到这里吧！在这篇文章中，我们用简单易懂的方法讲述了如何在宿主机与客户机之间设置网络连接方式。请在下面的评论区跟大家分享下你的想法。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是一名 Linux 和 F.O.S.S 爱好者，即将从事 Linux 系统管理员和网页开发工作，他日前是 TecMint 技术网站的原创作者，非常喜欢使用电脑工作，坚信分享知识是一种美德。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/network-between-guest-vm-and-host-virtualbox/">http://www.tecmint.com/network-between-guest-vm-and-host-virtualbox/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/rusking">rusking</a> 校对：<a href="https://github.com/Bestony">Bestony</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何配置 VirtualBox 中的客户机与宿主机之间的网络连接

## 原文链接
[https://www.zcfy.cc/article/how-to-configure-network-between-guest-vm-and-host-in-oracle-virtualbox](https://www.zcfy.cc/article/how-to-configure-network-between-guest-vm-and-host-in-oracle-virtualbox)


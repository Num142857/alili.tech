---
title: 如何在 Ubuntu 18.04 服务器上安装和配置 KVM
hidden: true
categories: [reprint]
slug: 42a45001
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-1804-服务器上安装和配置-kvm"></a>如何在 Ubuntu 18.04 服务器上安装和配置 KVM</h1>
<p><strong>KVM</strong>（基于内核的虚拟机）是一款为类 Linux 系统提供的开源的全虚拟化解决方案，KVM 使用虚拟化扩展（如 <strong>Intel VT</strong> 或 <strong>AMD-V</strong>）提供虚拟化功能。无论何时我们在任何 Linux 机器上安装 KVM，都会通过加载诸如 <code>kvm-intel.ko</code>（基于 Intel 的机器）和 <code>kvm-amd.ko</code>（基于 amd 的机器）的内核模块，使其成为管理程序hyervisor（LCTT 译注：一种监控和管理虚拟机运行的核心软件层）。</p>
<p>KVM 允许我们安装和运行多个虚拟机（Windows 和 Linux）。我们可以通过 <code>virt-manager</code> 的图形用户界面或使用 <code>virt-install</code> 和 <code>virsh</code> 命令在命令行界面来创建和管理基于 KVM 的虚拟机。</p>
<p>在本文中，我们将讨论如何在 Ubuntu 18.04 LTS 服务器上安装和配置 <strong>KVM 管理程序</strong>。我假设你已经在你的服务器上安装了 Ubuntu 18.04 LTS 。接下来登录到您的服务器执行以下步骤。</p>
<h3><a href="#第一步确认您的硬件是否支持虚拟化"></a>第一步：确认您的硬件是否支持虚拟化</h3>
<p>执行 <code>egrep</code> 命令以验证您的服务器的硬件是否支持虚拟化，</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>egrep -c <span class="hljs-string">'(vmx|svm)'</span> /proc/cpuinfo
<span class="hljs-number">1</span>

</code></pre><p>如果输出结果大于 0，就意味着您的硬件支持虚拟化。重启，进入 BIOS 设置中启用 VT 技术。</p>
<p>现在使用下面的命令安装 <code>kvm-ok</code> 实用程序，该程序用于确定您的服务器是否能够运行硬件加速的 KVM 虚拟机。</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo apt install cpu-checker

</code></pre><p>运行 kvm-ok 命令确认输出结果，</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo kvm-ok
<span class="hljs-symbol">INFO:</span> /dev/kvm exists
KVM acceleration can be used

</code></pre><h3><a href="#第二步安装-kvm-及其依赖包"></a>第二步：安装 KVM 及其依赖包</h3>
<p>运行下面的 apt 命令安装 KVM 及其依赖项：</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo apt update
linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo apt install qemu qemu-kvm libvirt-bin  bridge-utils  virt-manager

</code></pre><p>只要上图相应的软件包安装成功，那么你的本地用户（对于我来说是 <code>linuxtechi</code>）将被自动添加到 <code>libvirtd</code> 群组。</p>
<h3><a href="#第三步启动并启用-libvirtd-服务"></a>第三步：启动并启用 libvirtd 服务</h3>
<p>我们在 Ubuntu 18.04 服务器上安装 qemu 和 libvirtd 软件包之后，它就会自动启动并启用 <code>libvirtd</code> 服务，如果 <code>libvirtd</code> 服务没有开启，则运行以下命令开启，</p>
<pre><code class="hljs routeros">linuxtechi@kvm-ubuntu18-04:~$ sudo<span class="hljs-built_in"> service </span>libvirtd start
linuxtechi@kvm-ubuntu18-04:~$ sudo update-rc.d libvirtd <span class="hljs-builtin-name">enable</span>

</code></pre><p>现在使用下面的命令确认 libvirtd 服务的状态，</p>
<pre><code class="hljs routeros">linuxtechi@kvm-ubuntu18-04:~$<span class="hljs-built_in"> service </span>libvirtd status

</code></pre><p>输出结果如下所示：</p>
<p><a href="https://camo.githubusercontent.com/5eed2515142d5155b6da6f9c485b2b645d026a90/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f6c696276697274642d636f6d6d616e642d7562756e747531382d30342e6a7067"><img src="https://p0.ssl.qhimg.com/t01817a62ffd5931a33.jpg" alt=""></a></p>
<h3><a href="#第四步为-kvm-虚拟机配置桥接网络"></a>第四步：为 KVM 虚拟机配置桥接网络</h3>
<p>只有通过桥接网络，KVM 虚拟机才能访问外部的 KVM 管理程序或主机。在Ubuntu 18.04中，网络由 <code>netplan</code> 实用程序管理，每当我们新安装一个 Ubuntu 18.04 系统时，会自动创建一个名称为 <code>/etc/netplan/50-cloud-init.yaml</code> 文件，其配置了静态 IP 和桥接网络，<code>netplan</code> 实用工具将引用这个文件。</p>
<p>截至目前，我已经在此文件配置了静态 IP，文件的具体内容如下：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">network:</span>
<span class="hljs-attr">  ethernets:</span>
<span class="hljs-attr">    ens33:</span>
<span class="hljs-attr">      addresses:</span> <span class="hljs-string">[192.168.0.51/24]</span>
<span class="hljs-attr">      gateway4:</span> <span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>
<span class="hljs-attr">      nameservers:</span>
<span class="hljs-attr">        addresses:</span> <span class="hljs-string">[192.168.0.1]</span>
<span class="hljs-attr">      dhcp4:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">      optional:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  version:</span> <span class="hljs-number">2</span>

</code></pre><p>我们在这个文件中添加桥接网络的配置信息，</p>
<pre><code class="hljs yaml"><span class="hljs-string">linuxtechi@kvm-ubuntu18-04:~$</span> <span class="hljs-string">sudo</span> <span class="hljs-string">vi</span> <span class="hljs-string">/etc/netplan/50-cloud-init.yaml</span>

<span class="hljs-attr">network:</span>
<span class="hljs-attr">  version:</span> <span class="hljs-number">2</span>
<span class="hljs-attr">  ethernets:</span>
<span class="hljs-attr">    ens33:</span>
<span class="hljs-attr">      dhcp4:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">      dhcp6:</span> <span class="hljs-literal">no</span>

<span class="hljs-attr">  bridges:</span>
<span class="hljs-attr">    br0:</span>
<span class="hljs-attr">      interfaces:</span> <span class="hljs-string">[ens33]</span>
<span class="hljs-attr">      dhcp4:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">      addresses:</span> <span class="hljs-string">[192.168.0.51/24]</span>
<span class="hljs-attr">      gateway4:</span> <span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>
<span class="hljs-attr">      nameservers:</span>
<span class="hljs-attr">        addresses:</span> <span class="hljs-string">[192.168.0.1]</span>


</code></pre><p>正如你所看到的，我们已经从接口（<code>ens33</code>）中删除了 IP 地址，并将该 IP 添加到 <code>br0</code> 中，并且还将接口（<code>ens33</code>）添加到 <code>br0</code>。使用下面的 <code>netplan</code> 命令使更改生效，</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo netplan apply

</code></pre><p>如果您想查看 debug 日志请使用以下命令，</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo netplan --debug  apply

</code></pre><p>现在使用以下方法确认网络桥接状态：</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo networkctl status -a

</code></pre><p><a href="https://camo.githubusercontent.com/bd0942617b2ae69472f7c6f72a5ea6a3c33748bc/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f6e6574776f726b63746c2d636f6d6d616e642d6f75747075742d7562756e747531382d30342e6a7067"><img src="https://p0.ssl.qhimg.com/t0130efc696d5fc938d.jpg" alt=""></a></p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>ifconfig

</code></pre><p><a href="https://camo.githubusercontent.com/c1da7f3a64cf806a66dc10e2460483758769819b/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f6966636f6e6669672d636f6d6d616e642d6f75747075742d7562756e747531382d30342e6a7067"><img src="https://p0.ssl.qhimg.com/t012ecc41c4d97b2576.jpg" alt=""></a></p>
<h3><a href="#第五步创建虚拟机使用-virt-manager-或-virt-install-命令"></a>第五步：创建虚拟机（使用 virt-manager 或 virt-install 命令）</h3>
<p>有两种方式创建虚拟机：</p>
<ul>
<li><code>virt-manager</code>（图形化工具）</li>
<li><code>virt-install</code>（命令行工具）</li>
</ul>
<h4><a href="#使用-virt-manager-创建虚拟机"></a>使用 virt-manager 创建虚拟机</h4>
<p>通过执行下面的命令启动 <code>virt-manager</code>：</p>
<pre><code class="hljs elixir">linuxtechi<span class="hljs-variable">@kvm</span>-ubuntu18-<span class="hljs-number">04</span><span class="hljs-symbol">:~</span><span class="hljs-variable">$ </span>sudo virt-manager

</code></pre><p><a href="https://camo.githubusercontent.com/9ab1267c73269667376a8073203016e1d219f765/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f53746172742d566972742d4d616e616765722d5562756e747531382d30342e6a7067"><img src="https://p0.ssl.qhimg.com/t011dabb74e2da1d7bc.jpg" alt=""></a></p>
<p>创建一个新的虚拟机：</p>
<p><a href="https://camo.githubusercontent.com/2c052c748e23ec7a3304f56405d79655df6eb064/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f49534f2d66696c652d566972742d4d616e616765722e6a7067"><img src="https://p0.ssl.qhimg.com/t0156538c452ba96890.jpg" alt=""></a></p>
<p>点击“下一步”然后选择 ISO 镜像文件，我使用的是 RHEL 7.3 iso 镜像。</p>
<p><a href="https://camo.githubusercontent.com/04eebcc4ffb07d13e72eee3c2693c77f186890f3/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f53656c6563742d49534f2d66696c652d766972742d6d616e616765722d5562756e747531382d30342d5365727665722e6a7067"><img src="https://p0.ssl.qhimg.com/t010a90999c8ad4c10b.jpg" alt=""></a></p>
<p>点击“下一步”。</p>
<p>在接下来的几个窗口中，系统会提示要求您为 VM 分配内存，处理器数量和磁盘空间。</p>
<p>并指定虚拟机名字和桥接网络名：</p>
<p><a href="https://camo.githubusercontent.com/69ced8c4729dd98cd9fced21000c059dd344f791/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f564d2d4e616d652d4e6574776f726b2d566972742d4d616e616765722d5562756e747531382d30342e6a7067"><img src="https://p0.ssl.qhimg.com/t01f79dfa34f8fb3ed9.jpg" alt=""></a></p>
<p>点击“结束”。</p>
<p><a href="https://camo.githubusercontent.com/f5e7295413f0e10d83b0e0ca03800c2946308e64/68747470733a2f2f7777772e6c696e757874656368692e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f5248454c372d332d496e7374616c6c6174696f6e2d566972742d4d616e616765722e6a7067"><img src="https://p0.ssl.qhimg.com/t01267b005da8d9ddf6.jpg" alt=""></a></p>
<p>接下来只需要按照屏幕指示安装系统。</p>
<h4><a href="#使用virt-install命令从命令行界面创建虚拟机"></a>使用virt-install命令从命令行界面创建虚拟机</h4>
<p>使用下面的 <code>virt-install</code> 命令从终端创建一个虚拟机，它将在命令行界面中开始安装，并根据您对虚拟机的名字，说明，ISO 文件位置和桥接配置的设置创建虚拟机。</p>
<pre><code class="hljs jboss-cli">linuxtechi@kvm-ubuntu18-04:~$ sudo virt-install  -n DB-Server  <span class="hljs-params">--description</span> <span class="hljs-string">"Test VM for Database"</span>  <span class="hljs-params">--os-type=Linux</span>  <span class="hljs-params">--os-variant=rhel7</span>  <span class="hljs-params">--ram=1096</span>  <span class="hljs-params">--vcpus=1</span>  <span class="hljs-params">--disk</span> path=<span class="hljs-string">/var/lib/libvirt/images/dbserver.img</span>,bus=virtio,size=10  <span class="hljs-params">--network</span> bridge<span class="hljs-function">:br0</span> <span class="hljs-params">--graphics</span> none  <span class="hljs-params">--location</span> <span class="hljs-string">/home/linuxtechi/rhel-server-7.3-x86_64-dvd.iso</span> <span class="hljs-params">--extra-args</span> console=ttyS0

</code></pre><p>本文到此为止，我希望这篇文章能帮助你能够在 Ubuntu 18.04 服务器上成功安装 KVM。 除此之外，KVM 也是 Openstack 默认的管理程序。</p>
<p>阅读更多：“<a href="https://www.linuxtechi.com/create-revert-delete-kvm-virtual-machine-snapshot-virsh-command/"><strong>如何使用 virsh 命令创建，还原和删除 KVM 虚拟机快照</strong></a>”</p>
<hr>
<p>via: <a href="https://www.linuxtechi.com/install-configure-kvm-ubuntu-18-04-server/">https://www.linuxtechi.com/install-configure-kvm-ubuntu-18-04-server/</a></p>
<p>作者：<a href="http://www.linuxtechi.com/author/pradeep/">Pradeep Kumar</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/wyxplus">wyxplus</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-to-install-and-configure-kvm-on-ubuntu-18-04-lts-server](https://www.zcfy.cc/article/how-to-install-and-configure-kvm-on-ubuntu-18-04-lts-server)
原文标题: 如何在 Ubuntu 18.04 服务器上安装和配置 KVM
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

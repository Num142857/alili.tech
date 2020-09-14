---
title: '如何在 Ubuntu Linux 上使用 KVM 云镜像' 
date: 2019-01-20 2:30:11
hidden: true
slug: ecunmmzd4ab
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-linux-上使用-kvm-云镜像"></a>如何在 Ubuntu Linux 上使用 KVM 云镜像</h1>
<p>如何下载并使用运行在 Ubuntu Linux 服务器上的 KVM 云镜像？如何在 Ubuntu Linux 16.04 LTS 服务器上无需完整安装即可创建虚拟机？如何在 Ubuntu Linux 上使用 KVM 云镜像？</p>
<p>基于内核的虚拟机（KVM）是 Linux 内核的虚拟化模块，可将其转变为虚拟机管理程序。你可以在命令行使用 Ubuntu 为 libvirt 和 KVM 提供的虚拟化前端通过 KVM 创建 Ubuntu 云镜像。</p>
<p>这个快速教程展示了如何安装和使用 uvtool，它为 Ubuntu 云镜像下载，libvirt 和 clout_int 提供了统一的集成虚拟机前端。</p>
<h3><a href="#步骤-1---安装-kvm"></a>步骤 1 - 安装 KVM</h3>
<p>你必须安装并配置 KVM。使用 <a href="https://www.cyberciti.biz/faq/ubuntu-lts-debian-linux-apt-command-examples/" title="See Linux/Unix apt command examples for more info">apt 命令</a>/<a href="https://www.cyberciti.biz/tips/linux-debian-package-management-cheat-sheet.html" title="See Linux/Unix apt-get command examples for more info">apt-get 命令</a>，如下所示：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install qemu-kvm libvirt-bin virtinst bridge-utils cpu-checker</span>
<span class="hljs-meta">$</span><span class="bash"> kvm-ok</span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-comment"># [configure bridged networking as described here][3]</span></span>
<span class="hljs-meta">$</span><span class="bash"> sudo vi /etc/network/interfaces</span>
<span class="hljs-meta">$</span><span class="bash"> sudo systemctl restart networking</span>
<span class="hljs-meta">$</span><span class="bash"> sudo brctl show</span>

</code></pre><p>参阅<a href="https://www.cyberciti.biz/faq/installing-kvm-on-ubuntu-16-04-lts-server/">如何在 Ubuntu 16.04 LTS Headless 服务器上安装 KVM</a> 以获得更多信息。（LCTT 译注：Headless 服务器是指没有本地接口的计算设备，专用于向其他计算机及其用户提供服务。）</p>
<h3><a href="#步骤-2---安装-uvtool"></a>步骤 2 - 安装 uvtool</h3>
<p>键入以下 <a href="https://www.cyberciti.biz/faq/ubuntu-lts-debian-linux-apt-command-examples/" title="See Linux/Unix apt command examples for more info">apt 命令</a>/<a href="https://www.cyberciti.biz/tips/linux-debian-package-management-cheat-sheet.html" title="See Linux/Unix apt-get command examples for more info">apt-get 命令</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install uvtool</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs vim">[sudo] password <span class="hljs-keyword">for</span> vivek: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed <span class="hljs-built_in">and</span> are <span class="hljs-keyword">no</span> longer required:
  gksu libgksu2-<span class="hljs-number">0</span> libqt5designer5 libqt5help5 libqt5printsupport5 libqt5sql5 libqt5sql5-sqlite libqt5xml5 <span class="hljs-keyword">python3</span>-dbus.mainloop.pyqt5 <span class="hljs-keyword">python3</span>-notify2 <span class="hljs-keyword">python3</span>-pyqt5 <span class="hljs-keyword">python3</span>-sip
Use <span class="hljs-string">'sudo apt autoremove'</span> <span class="hljs-keyword">to</span> <span class="hljs-built_in">remove</span> them.
The following additional packages will <span class="hljs-keyword">be</span> installed:
  cloud-image-utils distro-info <span class="hljs-keyword">python</span>-boto <span class="hljs-keyword">python</span>-pyinotify <span class="hljs-keyword">python</span>-simplestreams socat ubuntu-cloudimage-keyring uvtool-libvirt
Suggested package<span class="hljs-variable">s:</span>
  cloud-utils-euca shunit2 <span class="hljs-keyword">python</span>-pyinotify-doc
The following NEW packages will <span class="hljs-keyword">be</span> installed:
  cloud-image-utils distro-info <span class="hljs-keyword">python</span>-boto <span class="hljs-keyword">python</span>-pyinotify <span class="hljs-keyword">python</span>-simplestreams socat ubuntu-cloudimage-keyring uvtool uvtool-libvirt
<span class="hljs-number">0</span> upgraded, <span class="hljs-number">9</span> newly installed, <span class="hljs-number">0</span> <span class="hljs-keyword">to</span> <span class="hljs-built_in">remove</span> <span class="hljs-built_in">and</span> <span class="hljs-number">0</span> not upgraded.
Need <span class="hljs-keyword">to</span> <span class="hljs-built_in">get</span> <span class="hljs-number">1</span>,<span class="hljs-number">211</span> kB of archives.
After this operation, <span class="hljs-number">6</span>,<span class="hljs-number">876</span> kB of additional disk space will <span class="hljs-keyword">be</span> used.
Ge<span class="hljs-variable">t:1</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/main amd64 distro-info amd64 <span class="hljs-number">0.17</span> [<span class="hljs-number">20.3</span> kB]
Ge<span class="hljs-variable">t:2</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/universe amd64 <span class="hljs-keyword">python</span>-boto <span class="hljs-keyword">all</span> <span class="hljs-number">2.44</span>.<span class="hljs-number">0</span>-<span class="hljs-number">1</span>ubuntu2 [<span class="hljs-number">740</span> kB]
Ge<span class="hljs-variable">t:3</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/main amd64 <span class="hljs-keyword">python</span>-pyinotify <span class="hljs-keyword">all</span> <span class="hljs-number">0.9</span>.<span class="hljs-number">6</span>-<span class="hljs-number">1</span> [<span class="hljs-number">24.6</span> kB]
Ge<span class="hljs-variable">t:4</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/main amd64 ubuntu-cloudimage-keyring <span class="hljs-keyword">all</span> <span class="hljs-number">2013.11</span>.<span class="hljs-number">11</span> [<span class="hljs-number">4</span>,<span class="hljs-number">504</span> B]
Ge<span class="hljs-variable">t:5</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/main amd64 cloud-image-utils <span class="hljs-keyword">all</span> <span class="hljs-number">0.30</span>-<span class="hljs-number">0</span>ubuntu2 [<span class="hljs-number">17.2</span> kB]
Ge<span class="hljs-variable">t:6</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/universe amd64 <span class="hljs-keyword">python</span>-simplestreams <span class="hljs-keyword">all</span> <span class="hljs-number">0.1</span>.<span class="hljs-number">0</span>~bzr450-<span class="hljs-number">0</span>ubuntu1 [<span class="hljs-number">29.7</span> kB]
Ge<span class="hljs-variable">t:7</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/universe amd64 socat amd64 <span class="hljs-number">1.7</span>.<span class="hljs-number">3.2</span>-<span class="hljs-number">1</span> [<span class="hljs-number">342</span> kB]
Ge<span class="hljs-variable">t:8</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/universe amd64 uvtool <span class="hljs-keyword">all</span> <span class="hljs-number">0</span>~git122-<span class="hljs-number">0</span>ubuntu1 [<span class="hljs-number">6</span>,<span class="hljs-number">498</span> B]
Ge<span class="hljs-variable">t:9</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/universe amd64 uvtool-libvirt <span class="hljs-keyword">all</span> <span class="hljs-number">0</span>~git122-<span class="hljs-number">0</span>ubuntu1 [<span class="hljs-number">26.9</span> kB]
Fetched <span class="hljs-number">1</span>,<span class="hljs-number">211</span> kB in <span class="hljs-number">3</span>s (<span class="hljs-number">393</span> kB/s)        
Selecting previously unselected package distro-info.
(Reading database ... <span class="hljs-number">199933</span> <span class="hljs-keyword">files</span> <span class="hljs-built_in">and</span> directories currently installed.)
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">0</span>-distro-info_0.<span class="hljs-number">17</span>_amd64.<span class="hljs-keyword">deb</span> ...
Unpacking distro-info (<span class="hljs-number">0.17</span>) ...
Selecting previously unselected package <span class="hljs-keyword">python</span>-boto.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">1</span>-<span class="hljs-keyword">python</span>-boto_2.<span class="hljs-number">44.0</span>-<span class="hljs-number">1</span>ubuntu2_all.<span class="hljs-keyword">deb</span> ...
Unpacking <span class="hljs-keyword">python</span>-boto (<span class="hljs-number">2.44</span>.<span class="hljs-number">0</span>-<span class="hljs-number">1</span>ubuntu2) ...
Selecting previously unselected package <span class="hljs-keyword">python</span>-pyinotify.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">2</span>-<span class="hljs-keyword">python</span>-pyinotify_0.<span class="hljs-number">9.6</span>-<span class="hljs-number">1</span>_all.<span class="hljs-keyword">deb</span> ...
Unpacking <span class="hljs-keyword">python</span>-pyinotify (<span class="hljs-number">0.9</span>.<span class="hljs-number">6</span>-<span class="hljs-number">1</span>) ...
Selecting previously unselected package ubuntu-cloudimage-keyring.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">3</span>-ubuntu-cloudimage-keyring_2013.<span class="hljs-number">11.11</span>_all.<span class="hljs-keyword">deb</span> ...
Unpacking ubuntu-cloudimage-keyring (<span class="hljs-number">2013.11</span>.<span class="hljs-number">11</span>) ...
Selecting previously unselected package cloud-image-utils.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">4</span>-cloud-image-utils_0.<span class="hljs-number">30</span>-<span class="hljs-number">0</span>ubuntu2_all.<span class="hljs-keyword">deb</span> ...
Unpacking cloud-image-utils (<span class="hljs-number">0.30</span>-<span class="hljs-number">0</span>ubuntu2) ...
Selecting previously unselected package <span class="hljs-keyword">python</span>-simplestreams.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">5</span>-<span class="hljs-keyword">python</span>-simplestreams_0.<span class="hljs-number">1.0</span>~bzr450-<span class="hljs-number">0</span>ubuntu1_all.<span class="hljs-keyword">deb</span> ...
Unpacking <span class="hljs-keyword">python</span>-simplestreams (<span class="hljs-number">0.1</span>.<span class="hljs-number">0</span>~bzr450-<span class="hljs-number">0</span>ubuntu1) ...
Selecting previously unselected package socat.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">6</span>-socat_1.<span class="hljs-number">7.3</span>.<span class="hljs-number">2</span>-<span class="hljs-number">1</span>_amd64.<span class="hljs-keyword">deb</span> ...
Unpacking socat (<span class="hljs-number">1.7</span>.<span class="hljs-number">3.2</span>-<span class="hljs-number">1</span>) ...
Selecting previously unselected package uvtool.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">7</span>-uvtool_0~git122-<span class="hljs-number">0</span>ubuntu1_all.<span class="hljs-keyword">deb</span> ...
Unpacking uvtool (<span class="hljs-number">0</span>~git122-<span class="hljs-number">0</span>ubuntu1) ...
Selecting previously unselected package uvtool-libvirt.
Preparing <span class="hljs-keyword">to</span> unpack .../<span class="hljs-number">8</span>-uvtool-libvirt_0~git122-<span class="hljs-number">0</span>ubuntu1_all.<span class="hljs-keyword">deb</span> ...
Unpacking uvtool-libvirt (<span class="hljs-number">0</span>~git122-<span class="hljs-number">0</span>ubuntu1) ...
Setting <span class="hljs-keyword">up</span> distro-info (<span class="hljs-number">0.17</span>) ...
Setting <span class="hljs-keyword">up</span> ubuntu-cloudimage-keyring (<span class="hljs-number">2013.11</span>.<span class="hljs-number">11</span>) ...
Setting <span class="hljs-keyword">up</span> cloud-image-utils (<span class="hljs-number">0.30</span>-<span class="hljs-number">0</span>ubuntu2) ...
Setting <span class="hljs-keyword">up</span> socat (<span class="hljs-number">1.7</span>.<span class="hljs-number">3.2</span>-<span class="hljs-number">1</span>) ...
Setting <span class="hljs-keyword">up</span> <span class="hljs-keyword">python</span>-pyinotify (<span class="hljs-number">0.9</span>.<span class="hljs-number">6</span>-<span class="hljs-number">1</span>) ...
Setting <span class="hljs-keyword">up</span> <span class="hljs-keyword">python</span>-boto (<span class="hljs-number">2.44</span>.<span class="hljs-number">0</span>-<span class="hljs-number">1</span>ubuntu2) ...
Setting <span class="hljs-keyword">up</span> <span class="hljs-keyword">python</span>-simplestreams (<span class="hljs-number">0.1</span>.<span class="hljs-number">0</span>~bzr450-<span class="hljs-number">0</span>ubuntu1) ...
Processing triggers <span class="hljs-keyword">for</span> doc-base (<span class="hljs-number">0.10</span>.<span class="hljs-number">7</span>) ...
Processing <span class="hljs-number">1</span> added doc-base <span class="hljs-keyword">file</span>...
Setting <span class="hljs-keyword">up</span> uvtool (<span class="hljs-number">0</span>~git122-<span class="hljs-number">0</span>ubuntu1) ...
Processing triggers <span class="hljs-keyword">for</span> man-db (<span class="hljs-number">2.7</span>.<span class="hljs-number">6.1</span>-<span class="hljs-number">2</span>) ...
Setting <span class="hljs-keyword">up</span> uvtool-libvirt (<span class="hljs-number">0</span>~git122-<span class="hljs-number">0</span>ubuntu1) ...

</code></pre><h3><a href="#步骤-3---下载-ubuntu-云镜像"></a>步骤 3 - 下载 Ubuntu 云镜像</h3>
<p>你需要使用 <code>uvt-simplestreams-libvirt</code> 命令。它维护一个 libvirt 容量存储池，作为一个简单流simplestreams源的镜像子集的本地镜像，比如 Ubuntu 云镜像。要使用当前所有 amd64 镜像更新 uvtool 的 libvirt 容量存储池，运行：</p>
<pre><code class="hljs routeros">$ uvt-simplestreams-libvirt sync <span class="hljs-attribute">arch</span>=amd64

</code></pre><p>要更新/获取 Ubuntu 16.04 LTS (xenial/amd64) 镜像，运行：</p>
<pre><code class="hljs routeros">$ uvt-simplestreams-libvirt --verbose sync <span class="hljs-attribute">release</span>=xenial <span class="hljs-attribute">arch</span>=amd64

</code></pre><p>示例输出：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">Adding</span>: <span class="hljs-selector-tag">com</span><span class="hljs-selector-class">.ubuntu</span><span class="hljs-selector-class">.cloud</span><span class="hljs-selector-pseudo">:server</span><span class="hljs-selector-pseudo">:16.04</span><span class="hljs-selector-pseudo">:amd64</span> 20171121<span class="hljs-selector-class">.1</span>

</code></pre><p>通过 query 选项查询本地镜像：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uvt-simplestreams-libvirt query</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs routeros"><span class="hljs-attribute">release</span>=xenial <span class="hljs-attribute">arch</span>=amd64 <span class="hljs-attribute">label</span>=release (20171121.1)

</code></pre><p>现在，我为 Ubuntu xenial 创建了一个镜像，接下来我会创建虚拟机。</p>
<h3><a href="#步骤-4---创建-ssh-密钥"></a>步骤 4 - 创建 SSH 密钥</h3>
<p>你需要使用 SSH 密钥才能登录到 KVM 虚拟机。如果你根本没有任何密钥，请使用 <code>ssh-keygen</code> 命令创建一个新的密钥。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ssh-keygen</span>

</code></pre><p>参阅“<a href="https://www.cyberciti.biz/faq/how-to-set-up-ssh-keys-on-linux-unix/">如何在 Linux / Unix 系统上设置 SSH 密钥</a>” 和 “<a href="https://www.cyberciti.biz/faq/linux-unix-generating-ssh-keys/">Linux / UNIX: 生成 SSH 密钥</a>” 以获取更多信息。</p>
<h3><a href="#步骤-5---创建-vm"></a>步骤 5 - 创建 VM</h3>
<p>是时候创建虚拟机了，它叫 vm1，即创建一个 Ubuntu Linux 16.04 LTS 虚拟机：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uvt-kvm create vm1</span>

</code></pre><p>默认情况下 vm1 使用以下配置创建：</p>
<ol>
<li>内存：512M</li>
<li>磁盘大小：8GiB</li>
<li>CPU：1 vCPU core</li>
</ol>
<p>要控制内存、磁盘、CPU 和其他配置，使用以下语法：</p>
<pre><code class="hljs haml">$ uvt-kvm create vm1 \
-<span class="ruby">-memory MEMORY \
</span>-<span class="ruby">-cpu CPU \
</span>-<span class="ruby">-disk DISK \
</span>-<span class="ruby">-bridge BRIDGE \
</span>-<span class="ruby">-ssh-public-key-file /path/to/your/SSH_PUBLIC_KEY_FILE \
</span>-<span class="ruby">-packages PACKAGES1, PACKAGES2, .. \
</span>-<span class="ruby">-run-script-once RUN_SCRIPT_ONCE \
</span>-<span class="ruby">-password PASSWORD
</span>
</code></pre><p>其中</p>
<ol>
<li><code>--password PASSWORD</code>：设置 ubuntu 用户的密码和允许使用 ubuntu 的用户登录（不推荐，使用 ssh 密钥）。</li>
<li><code>--run-script-once RUN_SCRIPT_ONCE</code> : 第一次启动时，在虚拟机上以 root 身份运行 <code>RUN_SCRIPT_ONCE</code> 脚本，但再也不会运行。这里给出完整的路径。这对于在虚拟机上运行自定义任务时非常有用，例如设置安全性或其他内容。</li>
<li><code>--packages PACKAGES1, PACKAGES2, ..</code> : 在第一次启动时安装以逗号分隔的软件包。</li>
</ol>
<p>要获取帮助，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uvt-kvm -h</span>
<span class="hljs-meta">$</span><span class="bash"> uvt-kvm create -h</span>

</code></pre><h4><a href="#如何删除虚拟机"></a>如何删除虚拟机？</h4>
<p>要销毁/删除名为 vm1 的虚拟机，运行（请小心使用以下命令，因为没有确认框）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uvt-kvm destroy vm1</span>

</code></pre><h4><a href="#获取-vm1-的-ip-地址运行"></a>获取 vm1 的 IP 地址，运行：</h4>
<pre><code class="hljs routeros">$ uvt-kvm<span class="hljs-built_in"> ip </span>vm1
192.168.122.52

</code></pre><h4><a href="#列出所有运行的虚拟机"></a>列出所有运行的虚拟机</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uvt-kvm list</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">vm1</span>
<span class="hljs-selector-tag">freebsd11</span><span class="hljs-selector-class">.1</span>

</code></pre><h3><a href="#步骤-6---如何登录-vm1"></a>步骤 6 - 如何登录 vm1</h3>
<p>语法是：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uvt-kvm ssh vm1</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs vim">Welcome <span class="hljs-keyword">to</span> Ubuntu <span class="hljs-number">16.04</span>.<span class="hljs-number">3</span> LTS (GNU/Linux <span class="hljs-number">4.4</span>.<span class="hljs-number">0</span>-<span class="hljs-number">101</span>-generic x86_64)

 * Documentation:  http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">help</span>.ubuntu.<span class="hljs-keyword">com</span>
 * Managemen<span class="hljs-variable">t:</span>     http<span class="hljs-variable">s:</span>//landscape.canonical.<span class="hljs-keyword">com</span>
 * Suppor<span class="hljs-variable">t:</span>        http<span class="hljs-variable">s:</span>//ubuntu.<span class="hljs-keyword">com</span>/advantage

  Get cloud support with Ubuntu Advantage Cloud Gues<span class="hljs-variable">t:</span>
    http://www.ubuntu.<span class="hljs-keyword">com</span>/business/services/cloud

<span class="hljs-number">0</span> packages can <span class="hljs-keyword">be</span> updated.
<span class="hljs-number">0</span> updates are security updates.


Last login: Thu Dec  <span class="hljs-number">7</span> <span class="hljs-number">09</span>:<span class="hljs-number">55</span>:<span class="hljs-number">06</span> <span class="hljs-number">2017</span> from <span class="hljs-number">192.168</span>.<span class="hljs-number">122.1</span>

</code></pre><p>另一个选择是从 macOS/Linux/Unix/Windows 客户端使用常规的 ssh 命令：</p>
<pre><code class="hljs lsl">$ ssh ubuntu@<span class="hljs-number">192.168</span><span class="hljs-number">.122</span><span class="hljs-number">.52</span>
$ ssh -i ~/.ssh/id_rsa ubuntu@<span class="hljs-number">192.168</span><span class="hljs-number">.122</span><span class="hljs-number">.52</span>

</code></pre><p>示例输出：</p>
<p><a href="https://www.cyberciti.biz/media/new/faq/2017/12/connect-to-the-running-VM-using-ssh.jpg"><img src="https://p0.ssl.qhimg.com/t016e509a5fc99e8852.jpg" alt="Connect to the running VM using ssh"></a></p>
<p>一旦创建了 vim，你可以照常使用 <code>virsh</code> 命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> virsh list</span>

</code></pre><hr>
<p>via: <a href="https://www.cyberciti.biz/faq/how-to-use-kvm-cloud-images-on-ubuntu-linux/">https://www.cyberciti.biz/faq/how-to-use-kvm-cloud-images-on-ubuntu-linux/</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu Linux 上使用 KVM 云镜像

## 原文链接
[https://www.zcfy.cc/article/how-to-use-kvm-cloud-images-on-ubuntu-linux](https://www.zcfy.cc/article/how-to-use-kvm-cloud-images-on-ubuntu-linux)


---
title: '在 Ubuntu 上体验 LXD 容器' 
date: 2019-01-21 2:30:06
hidden: true
slug: n7ay2k3se2l
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-ubuntu-上体验-lxd-容器"></a>在 Ubuntu 上体验 LXD 容器</h1>
<p>本文的主角是容器，一种类似虚拟机但更轻量级的构造。你可以轻易地在你的 Ubuntu 桌面系统中创建一堆容器！</p>
<p>虚拟机会虚拟出整个电脑让你来安装客户机操作系统。<strong>相比之下</strong>，容器<strong>复用</strong>了主机的 Linux 内核，只是简单地 <strong>包容</strong> 了我们选择的根文件系统（也就是运行时环境）。Linux 内核有很多功能可以将运行的 Linux 容器与我们的主机分割开（也就是我们的 Ubuntu 桌面）。</p>
<p>Linux 本身需要一些手工操作来直接管理他们。好在，有 LXD（读音为 Lex-deeh），这是一款为我们管理 Linux 容器的服务。</p>
<p>我们将会看到如何：</p>
<ol>
<li>在我们的 Ubuntu 桌面上配置容器，</li>
<li>创建容器，</li>
<li>安装一台 web 服务器，</li>
<li>测试一下这台 web 服务器，以及</li>
<li>清理所有的东西。</li>
</ol>
<h3><a href="#设置-ubuntu-容器"></a>设置 Ubuntu 容器</h3>
<p>如果你安装的是 Ubuntu 16.04，那么你什么都不用做。只要安装下面所列出的一些额外的包就行了。若你安装的是 Ubuntu 14.04.x 或 Ubuntu 15.10，那么按照 <a href="https://linux.cn/article-7687-1.html">LXD 2.0 系列（二）：安装与配置</a> 来进行一些操作，然后再回来。</p>
<p>确保已经更新了包列表：</p>
<pre><code class="hljs routeros">sudo apt update
sudo apt<span class="hljs-built_in"> upgrade
</span>
</code></pre><p>安装 <code>lxd</code> 包：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> lxd

</code></pre><p>若你安装的是 Ubuntu 16.04，那么还可以让你的容器文件以 ZFS 文件系统的格式进行存储。Ubuntu 16.04 的 Linux kernel 包含了支持 ZFS 必要的内核模块。若要让 LXD 使用 ZFS 进行存储，我们只需要安装 ZFS 工具包。没有 ZFS，容器会在主机文件系统中以单独的文件形式进行存储。通过 ZFS，我们就有了写入时拷贝等功能，可以让任务完成更快一些。</p>
<p>安装 <code>zfsutils-linux</code> 包（若你安装的是 Ubuntu 16.04.x）：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> zfsutils-linux

</code></pre><p>安装好 LXD 后，包安装脚本应该会将你加入 <code>lxd</code> 组。该组成员可以使你无需通过 <code>sudo</code> 就能直接使用 LXD 管理容器。根据 Linux 的习惯，<strong>你需要先登出桌面会话然后再登录</strong> 才能应用 <code>lxd</code> 的组成员关系。（若你是高手，也可以通过在当前 shell 中执行 <code>newgrp lxd</code> 命令，就不用重登录了）。</p>
<p>在开始使用前，LXD 需要初始化存储和网络参数。</p>
<p>运行下面命令：</p>
<pre><code class="hljs routeros">$ sudo lxd init
Name of the storage backend <span class="hljs-keyword">to</span> use (dir <span class="hljs-keyword">or</span> zfs): zfs
Create a new ZFS<span class="hljs-built_in"> pool </span>(<span class="hljs-literal">yes</span>/<span class="hljs-literal">no</span>)? <span class="hljs-literal">yes</span>
Name of the new ZFS pool: lxd-pool
Would you like <span class="hljs-keyword">to</span> use an existing block device (<span class="hljs-literal">yes</span>/<span class="hljs-literal">no</span>)? <span class="hljs-literal">no</span>
Size <span class="hljs-keyword">in</span> GB of the new loop device (1GB minimum): 30
Would you like LXD <span class="hljs-keyword">to</span> be available over the<span class="hljs-built_in"> network </span>(<span class="hljs-literal">yes</span>/<span class="hljs-literal">no</span>)? <span class="hljs-literal">no</span>
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> configure the LXD<span class="hljs-built_in"> bridge </span>(<span class="hljs-literal">yes</span>/<span class="hljs-literal">no</span>)? <span class="hljs-literal">yes</span> 
&gt; You will be asked about the<span class="hljs-built_in"> network bridge </span>configuration. Accept all defaults <span class="hljs-keyword">and</span> continue.
Warning: Stopping lxd.service, but it can still be activated by:
 lxd.socket
 LXD has been successfully configured.
$ _

</code></pre><p>我们在一个（单独）的文件而不是块设备（即分区）中构建了一个文件系统来作为 ZFS 池，因此我们无需进行额外的分区操作。在本例中我指定了 30GB 大小，这个空间取之于根（<code>/</code>） 文件系统中。这个文件就是 <code>/var/lib/lxd/zfs.img</code>。</p>
<p>行了！最初的配置完成了。若有问题，或者想了解其他信息，请阅读 <a href="https://www.stgraber.org/2016/03/15/lxd-2-0-installing-and-configuring-lxd-212/">https://www.stgraber.org/2016/03/15/lxd-2-0-installing-and-configuring-lxd-212/</a> 。</p>
<h3><a href="#创建第一个容器"></a>创建第一个容器</h3>
<p>所有 LXD 的管理操作都可以通过 <code>lxc</code> 命令来进行。我们通过给 <code>lxc</code> 不同参数来管理容器。</p>
<pre><code class="hljs applescript">lxc <span class="hljs-built_in">list</span>

</code></pre><p>可以列出所有已经安装的容器。很明显，这个列表现在是空的，但这表示我们的安装是没问题的。</p>
<pre><code class="hljs sqf">lxc <span class="hljs-built_in">image</span> <span class="hljs-built_in">list</span>

</code></pre><p>列出可以用来启动容器的（已经缓存的）镜像列表。很明显这个列表也是空的，但这也说明我们的安装是没问题的。</p>
<pre><code class="hljs sqf">lxc <span class="hljs-built_in">image</span> <span class="hljs-built_in">list</span> ubuntu：

</code></pre><p>列出可以下载并启动容器的远程镜像。而且指定了显示 Ubuntu 镜像。</p>
<pre><code class="hljs sqf">lxc <span class="hljs-built_in">image</span> <span class="hljs-built_in">list</span> images：

</code></pre><p>列出可以用来启动容器的（已经缓存的）各种发行版的镜像列表。这会列出各种发行版的镜像比如 Alpine、Debian、Gentoo、Opensuse 以及 Fedora。</p>
<p>让我们启动一个 Ubuntu 16.04 容器，并称之为 <code>c1</code>：</p>
<pre><code class="hljs llvm">$ lxc launch ubuntu：<span class="hljs-keyword">x</span> <span class="hljs-keyword">c</span><span class="hljs-number">1</span>
Creating <span class="hljs-keyword">c</span><span class="hljs-number">1</span>
Starting <span class="hljs-keyword">c</span><span class="hljs-number">1</span>
$ 

</code></pre><p>我们使用 <code>launch</code> 动作，然后选择镜像 <code>ubuntu：x</code> （<code>x</code> 表示 Xenial/16.04 镜像），最后我们使用名字 <code>c1</code> 作为容器的名称。</p>
<p>让我们来看看安装好的首个容器，</p>
<pre><code class="hljs gherkin">$ lxc list

+---------|<span class="hljs-string">---------</span>|<span class="hljs-string">----------------------</span>|<span class="hljs-string">------</span>|<span class="hljs-string">------------</span>|<span class="hljs-string">-----------+
</span>|<span class="hljs-string"> NAME </span>|<span class="hljs-string"> STATE </span>|<span class="hljs-string"> IPV4 </span>|<span class="hljs-string"> IPV6 </span>|<span class="hljs-string"> TYPE </span>|<span class="hljs-string"> SNAPSHOTS </span>|
+---------|<span class="hljs-string">---------</span>|<span class="hljs-string">----------------------</span>|<span class="hljs-string">------</span>|<span class="hljs-string">------------</span>|<span class="hljs-string">-----------+
</span>|<span class="hljs-string"> c1 </span>|<span class="hljs-string"> RUNNING </span>|<span class="hljs-string"> 10.173.82.158 (eth0) </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> PERSISTENT </span>|<span class="hljs-string"> 0 </span>|
+---------|<span class="hljs-string">---------</span>|<span class="hljs-string">----------------------</span>|<span class="hljs-string">------</span>|<span class="hljs-string">------------</span>|<span class="hljs-string">-----------+

</span></code></pre><p>我们的首个容器 c1 已经运行起来了，它还有自己的 IP 地址（可以本地访问）。我们可以开始用它了！</p>
<h3><a href="#安装-web-服务器"></a>安装 web 服务器</h3>
<p>我们可以在容器中运行命令。运行命令的动作为 <code>exec</code>。</p>
<pre><code class="hljs lsl">$ lxc exec c1 -- uptime
 <span class="hljs-number">11</span>：<span class="hljs-number">47</span>：<span class="hljs-number">25</span> up <span class="hljs-number">2</span> min，<span class="hljs-number">0</span> users，load average：<span class="hljs-number">0.07</span>，<span class="hljs-number">0.05</span>，<span class="hljs-number">0.04</span>
$ _

</code></pre><p>在 <code>exec</code> 后面，我们指定容器、最后输入要在容器中运行的命令。该容器的运行时间只有 2 分钟，这是个新出炉的容器：-)。</p>
<p>命令行中的 <code>--</code> 跟我们 shell 的参数处理过程有关。若我们的命令没有任何参数，则完全可以省略 <code>-</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> lxc <span class="hljs-built_in">exec</span> c1 -- df -h</span>

</code></pre><p>这是一个必须要 <code>-</code> 的例子，由于我们的命令使用了参数 <code>-h</code>。若省略了 <code>-</code>，会报错。</p>
<p>然后我们运行容器中的 shell 来更新包列表。</p>
<pre><code class="hljs clean">$ lxc exec c1 bash
root@c1:~# apt update
Ign http:<span class="hljs-comment">//archive.ubuntu.com trusty InRelease</span>
Get:<span class="hljs-number">1</span> http:<span class="hljs-comment">//archive.ubuntu.com trusty-updates InRelease [65.9 kB]</span>
Get:<span class="hljs-number">2</span> http:<span class="hljs-comment">//security.ubuntu.com trusty-security InRelease [65.9 kB]</span>
...
Hit http:<span class="hljs-comment">//archive.ubuntu.com trusty/universe Translation-en </span>
Fetched <span class="hljs-number">11.2</span> MB <span class="hljs-keyword">in</span> <span class="hljs-number">9</span>s (<span class="hljs-number">1228</span> kB/s) 
Reading package lists... Done
root@c1:~# apt upgrade
Reading package lists... Done
Building dependency tree 
...
Processing triggers for man-db (<span class="hljs-number">2.6</span><span class="hljs-number">.7</span><span class="hljs-number">.1</span><span class="hljs-number">-1</span>ubuntu1) ...
Setting up dpkg (<span class="hljs-number">1.17</span><span class="hljs-number">.5</span>ubuntu5<span class="hljs-number">.7</span>) ...
root@c1:~# _

</code></pre><p>我们使用 nginx 来做 web 服务器。nginx 在某些方面要比 Apache web 服务器更酷一些。</p>
<pre><code class="hljs clean">root@c1:~# apt install nginx
Reading package lists... Done
Building dependency tree
...
Setting up nginx-core (<span class="hljs-number">1.4</span><span class="hljs-number">.6</span><span class="hljs-number">-1</span>ubuntu3<span class="hljs-number">.5</span>) ...
Setting up nginx (<span class="hljs-number">1.4</span><span class="hljs-number">.6</span><span class="hljs-number">-1</span>ubuntu3<span class="hljs-number">.5</span>) ...
Processing triggers for libc-bin (<span class="hljs-number">2.19</span><span class="hljs-number">-0</span>ubuntu6<span class="hljs-number">.9</span>) ...
root@c1:~# _

</code></pre><p>让我们用浏览器访问一下这个 web 服务器。记住 IP 地址为 10.173.82.158，因此你需要在浏览器中输入这个 IP。</p>
<p><a href="https://i2.wp.com/blog.simos.info/wp-content/uploads/2016/06/lxd-nginx.png?ssl=1"><img src="https://p0.ssl.qhimg.com/t01998102156c1c5da8.png" alt="lxd-nginx"></a></p>
<p>让我们对页面文字做一些小改动。回到容器中，进入默认 HTML 页面的目录中。</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@c1</span><span class="hljs-symbol">:~</span><span class="hljs-comment"># cd /var/www/html/</span>
root<span class="hljs-variable">@c1</span><span class="hljs-symbol">:/var/www/html</span><span class="hljs-comment"># ls -l</span>
total <span class="hljs-number">2</span>
-rw-r--r-- <span class="hljs-number">1</span> root root <span class="hljs-number">612</span> Jun <span class="hljs-number">25</span> <span class="hljs-number">12</span><span class="hljs-symbol">:</span><span class="hljs-number">15</span> index.nginx-debian.html
root<span class="hljs-variable">@c1</span><span class="hljs-symbol">:/var/www/html</span><span class="hljs-comment">#</span>

</code></pre><p>使用 nano 编辑文件，然后保存：</p>
<p><a href="https://i2.wp.com/blog.simos.info/wp-content/uploads/2016/06/lxd-nginx-nano.png?ssl=1"><img src="https://p0.ssl.qhimg.com/t01435cad93ee0528b4.png" alt="lxd-nginx-nano"></a></p>
<p>之后，再刷一下页面看看，</p>
<p><a href="https://i1.wp.com/blog.simos.info/wp-content/uploads/2016/06/lxd-nginx-modified.png?ssl=1"><img src="https://p0.ssl.qhimg.com/t015dc90a573e5d055b.png" alt="lxd-nginx-modified"></a></p>
<h3><a href="#清理"></a>清理</h3>
<p>让我们清理一下这个容器，也就是删掉它。当需要的时候我们可以很方便地创建一个新容器出来。</p>
<pre><code class="hljs asciidoc"><span class="hljs-section">$ lxc list
+---------+---------+----------------------+------+------------+-----------+</span>
<span class="hljs-section">| NAME | STATE   | IPV4                 | IPV6 | TYPE       | SNAPSHOTS    |
+---------+---------+----------------------+------+------------+-----------+</span>
<span class="hljs-section">| c1   | RUNNING | 10.173.82.169 (eth0) |      | PERSISTENT | 0            |
+---------+---------+----------------------+------+------------+-----------+</span>
$ lxc stop c1
$ lxc delete c1
<span class="hljs-section">$ lxc list
+---------+---------+----------------------+------+------------+-----------+</span>
<span class="hljs-section">| NAME | STATE   | IPV4                 | IPV6 | TYPE       | SNAPSHOTS    |
+---------+---------+----------------------+------+------------+-----------+</span>
<span class="hljs-code">+---------+</span>---------<span class="hljs-code">+----------------------+</span>------<span class="hljs-code">+------------+</span>-----------+

</code></pre><p>我们停止（关闭）这个容器，然后删掉它了。</p>
<p>本文至此就结束了。关于容器有很多玩法。而这只是配置 Ubuntu 并尝试使用容器的第一步而已。</p>
<hr>
<p>via: <a href="https://blog.simos.info/trying-out-lxd-containers-on-our-ubuntu/">https://blog.simos.info/trying-out-lxd-containers-on-our-ubuntu/</a></p>
<p>作者：<a href="https://blog.simos.info/author/simos/">Simos Xenitellis</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Ubuntu 上体验 LXD 容器

## 原文链接
[https://www.zcfy.cc/article/trying-out-lxd-containers-on-our-ubuntu](https://www.zcfy.cc/article/trying-out-lxd-containers-on-our-ubuntu)


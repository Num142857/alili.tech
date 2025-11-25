---
title: '使用 Orange Pi 搭建 Time Machine 服务器' 
date: 2019-01-23 2:30:08
hidden: true
slug: 2rupjvqz5dw
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-orange-pi-搭建-time-machine-服务器"></a>使用 Orange Pi 搭建 Time Machine 服务器</h1>
<p>我的工作之一是为各类家用计算机安排进行自动备份，包括存放重要数据的一组 Mac 计算机。我决定使用运行 <a href="https://www.armbian.com/">Armbian Linux</a> 的便宜的 <a href="https://www.amazon.com/gp/product/B018W6OTIM/ref=as_li_tl?ie=UTF8&amp;tag=piboards-20&amp;camp=1789&amp;creative=9325&amp;linkCode=as2&amp;creativeASIN=B018W6OTIM&amp;linkId=08bd6573c99ddb8a79746c8590776c39">Orange Pi</a> 做实验，目的是希望 <a href="https://support.apple.com/kb/PH25710?locale=en_US">Time Machine</a> 可以通过网络使用挂载在 Orange Pi 主板上的 USB 驱动器。在这种情况下，我找到并成功地安装了 Netatalk。</p>
<p><a href="http://netatalk.sourceforge.net/">Netatalk</a> 是一个用作苹果文件服务器的开源软件。通过 <a href="https://en.wikipedia.org/wiki/Avahi_(software">Avahi</a>) 和 Netatalk 配合运行，你的 Mac 设备能够识别网络上的 Orange Pi 设备，甚至会将 Orange pi 设备当作 “Mac” 类型的设备。这使得你能够手动连接到该网络设备，更重要的是使得 Time Machine 能够发现并使用远程驱动器。如果你想在 Mac 上设置类似的备份机制，下面的指南也许能够帮到你。</p>
<h3><a href="#准备工作"></a>准备工作</h3>
<p>为了配置该 USB 驱动器，我首先尝试了 HFS+ 格式文件系统，不幸的是我没能成功写入。所以我选择创建一个 EXT4 文件系统，并确保用户 <code>pi</code> 有读写权限。Linux 有很多格式化磁盘的方法，但是我最喜欢（而且推荐）的仍然是 <a href="http://gparted.org/">gparted</a>。由于 gparted 已经集成在 Armbian 桌面了，所以我直接使用了该工具。</p>
<p>我需要当 Orange Pi 启动或者 USB 驱动连接的时候，这个设备能够自动挂载到相同的位置。于是我创建了一个目录（<code>timemachine</code>）用于挂载：在其下新建一个 <code>tm</code> 目录用于真正的备份路径，并将 <code>tm</code> 的所有者更改为用户 <code>pi</code>。</p>
<pre><code class="hljs vim"><span class="hljs-keyword">cd</span> /mnt
sudo <span class="hljs-built_in">mkdir</span> timemachine
<span class="hljs-keyword">cd</span> timemachine
sudo <span class="hljs-built_in">mkdir</span> <span class="hljs-keyword">tm</span>
sudo chown pi:pi <span class="hljs-keyword">tm</span>

</code></pre><p>下一步，我打开一个终端并编辑 <code>/etc/fstab</code> 文件。</p>
<pre><code class="hljs awk">sudo nano <span class="hljs-regexp">/etc/</span>fstab

</code></pre><p>并在该文件末尾添加了一行我的设备信息（根据我的设备情况，设置为 <code>sdc2</code>）：</p>
<pre><code class="hljs awk"><span class="hljs-regexp">/dev/</span>sdc2 <span class="hljs-regexp">/mnt/</span>timemachine ext4 rw,user,exec <span class="hljs-number">0</span> <span class="hljs-number">0</span>

</code></pre><p>你需要通过命令行预装一些包，可能其中一些已经安装在你的系统上了：</p>
<pre><code class="hljs q">sudo apt-<span class="hljs-built_in">get</span> install build-essential libevent-<span class="hljs-built_in">dev</span> libssl-<span class="hljs-built_in">dev</span> libgcrypt11-<span class="hljs-built_in">dev</span> libkrb5-<span class="hljs-built_in">dev</span> libpam0g-<span class="hljs-built_in">dev</span> libwrap0-<span class="hljs-built_in">dev</span> libdb-<span class="hljs-built_in">dev</span> libtdb-<span class="hljs-built_in">dev</span> libmysqlclient-<span class="hljs-built_in">dev</span> avahi-daemon libavahi-client-<span class="hljs-built_in">dev</span> libacl1-<span class="hljs-built_in">dev</span> libldap2-<span class="hljs-built_in">dev</span> libcrack2-<span class="hljs-built_in">dev</span> systemtap-sdt-<span class="hljs-built_in">dev</span> libdbus<span class="hljs-number">-1</span>-<span class="hljs-built_in">dev</span> libdbus-glib<span class="hljs-number">-1</span>-<span class="hljs-built_in">dev</span> libglib2<span class="hljs-number">.0</span>-<span class="hljs-built_in">dev</span> libio-socket-inet6-perl tracker libtracker-sparql<span class="hljs-number">-1.0</span>-<span class="hljs-built_in">dev</span> libtracker-miner<span class="hljs-number">-1.0</span>-<span class="hljs-built_in">dev</span> hfsprogs hfsutils avahi-daemon

</code></pre><h3><a href="#安装并配置-netatalk"></a>安装并配置 Netatalk</h3>
<p>下一步是下载 Netatalk，解压下载的文件，然后切换到 Netatalk 目录：</p>
<pre><code class="hljs awk">wget https:<span class="hljs-regexp">//</span>sourceforge.net<span class="hljs-regexp">/projects/</span>netatalk<span class="hljs-regexp">/files/</span>netatalk<span class="hljs-regexp">/3.1.10/</span>netatalk-<span class="hljs-number">3.1</span>.<span class="hljs-number">10</span>.tar.bz2
tar xvf netatalk-<span class="hljs-number">3.1</span>.<span class="hljs-number">10</span>.tar.bz2
cd netatalk-<span class="hljs-number">3.1</span>.<span class="hljs-number">10</span>

</code></pre><p>然后需要顺序执行 <code>./configure</code>，<code>make</code>，<code>make install</code> 命令安装软件。在 netatalk-3.1.10 目录中执行 如下的 <code>./configure</code> 命令，这个命令需要花点时间才能执行完。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-string">./configure</span> <span class="hljs-params">--with-init-style=debian-systemd</span> <span class="hljs-params">--without-libevent</span> <span class="hljs-params">--without-tdb</span> <span class="hljs-params">--with-cracklib</span> <span class="hljs-params">--enable-krbV-uam</span> <span class="hljs-params">--with-pam-confdir=/etc/pam</span>.d <span class="hljs-params">--with-dbus-daemon=/usr/bin/dbus-daemon</span> <span class="hljs-params">--with-dbus-sysconf-dir=/etc/dbus-1/system</span>.d <span class="hljs-params">--with-tracker-pkgconfig-version=1</span>.0

</code></pre><p><code>./configure</code> 运行完成后执行 <code>make</code>：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">make</span>

</code></pre><p>执行完 <code>make</code> 命令需要花较长时间，可以考虑喝杯咖啡或者做点其他什么。之后，执行以下命令：</p>
<pre><code class="hljs cmake">sudo make <span class="hljs-keyword">install</span>

</code></pre><p>这个命令能够快速执行完成。现在你可以通过下面两个命令验证安装是否成功，同时找到配置文件位置。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo netatalk -V
sudo afpd -V</span>

</code></pre><p>然后你需要编辑 <code>afp.conf</code> 配置文件并在其中指定 Time Machine 备份路径，可以访问的帐号名并指定是否使用 <a href="https://support.apple.com/en-us/HT204014">Spotlight</a> 为备份建立索引。</p>
<pre><code class="hljs awk">sudo nano <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/etc/</span>afp.conf

</code></pre><p>下面是 <code>afp.conf</code> 的配置示例：</p>
<pre><code class="hljs routeros">[My Time Machine Volume]
path = /mnt/timemachine/tm
valid<span class="hljs-built_in"> users </span>= pi
time machine = <span class="hljs-literal">yes</span>
spotlight = <span class="hljs-literal">no</span>

</code></pre><p>最后，启用 Avahi 和 Netatalk 并启动它们。</p>
<pre><code class="hljs routeros">sudo systemctl <span class="hljs-builtin-name">enable</span> avahi-daemon
sudo systemctl <span class="hljs-builtin-name">enable</span> netatalk
sudo systemctl start avahi-daemon
sudo systemctl start netatalk

</code></pre><h3><a href="#连接到网络驱动器"></a>连接到网络驱动器</h3>
<p>此时，你的 Mac 可能已经发现并识别了你的 Pi 设备和网络驱动器。打开 Mac 中的 Finder，看看是否有像下面的内容：</p>
<p><a href="https://camo.githubusercontent.com/94131597c6bf29bfb2166519c63336bc2aec446e/68747470733a2f2f69322e77702e636f6d2f7069626f617264732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f544d5f64726976652e706e673f726573697a653d3234312532433839"><img src="https://p0.ssl.qhimg.com/t01d4fed4661707022a.png" alt=""></a></p>
<p>当然你也可以通过主机名或者 ip 地址访问，比如：</p>
<pre><code class="hljs dts"><span class="hljs-symbol">afp:</span><span class="hljs-comment">//192.168.1.25</span>

</code></pre><h3><a href="#time-machine-备份"></a>Time Machine 备份</h3>
<p>最后，打开 Mac 上的 Time Machine，然后“选择硬盘”，选择你的 Orange pi。</p>
<p><a href="https://camo.githubusercontent.com/b8e9849a24367ab594b3b8451d6ab884c7329e5c/68747470733a2f2f69312e77702e636f6d2f7069626f617264732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f4f5069544d2e706e673f726573697a653d353739253243333831"><img src="https://p3.ssl.qhimg.com/t011cd4cb3726b5a383.png" alt=""></a></p>
<p>这样设置肯定有效，Orange Pi 能够很好的处理进程，不过这可能并不是最快速的备份方式。但是，这个方法比较简单且便宜，并且正如其展示的一样能够正常工作。如果对这些设置你已经成功或者进行了改进，请在下面留言或者发送消息给我。</p>
<p><a href="https://camo.githubusercontent.com/211080cd48d06d577b3fc572579b8e6d95d4f41f/68747470733a2f2f69302e77702e636f6d2f7069626f617264732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6261636b75705f636f6d706c6574652e706e673f726573697a653d3330302532433731"><img src="https://p0.ssl.qhimg.com/t01a83f30ae37885f36.png" alt=""></a></p>
<p>Amazon 上有售卖 Orange Pi 主板。</p>
<hr>
<p>via: <a href="http://piboards.com/2017/02/13/orange-pi-as-time-machine-server/">http://piboards.com/2017/02/13/orange-pi-as-time-machine-server/</a></p>
<p>作者：<a href="http://piboards.com/author/piguy/">MIKE WILMOTH</a> 译者：<a href="https://github.com/beyondworld">beyondworld</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Orange Pi 搭建 Time Machine 服务器

## 原文链接
[https://www.zcfy.cc/article/orange-pi-as-time-machine-server](https://www.zcfy.cc/article/orange-pi-as-time-machine-server)


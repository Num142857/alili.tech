---
title: '如何在 Linux/Unix/Windows 中发现隐藏的进程和端口' 
date: 2019-01-21 2:30:06
hidden: true
slug: 6j2m6njhnt4
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linuxunixwindows-中发现隐藏的进程和端口"></a>如何在 Linux/Unix/Windows 中发现隐藏的进程和端口</h1>
<p><code>unhide</code> 是一个小巧的网络取证工具，能够发现那些借助 rootkit、LKM 及其它技术隐藏的进程和 TCP/UDP 端口。这个工具在 Linux、UNIX 类、MS-Windows 等操作系统下都可以工作。根据其 man 页面的说明：</p>
<blockquote>
<p>Unhide 通过下述三项技术来发现隐藏的进程。</p>
<ol>
<li>进程相关的技术，包括将 <code>/proc</code> 目录与 <a href="https://www.cyberciti.biz/faq/show-all-running-processes-in-linux/" title="Linux / Unix ps command">/bin/ps</a> 命令的输出进行比较。</li>
<li>系统相关的技术，包括将 <a href="https://www.cyberciti.biz/faq/show-all-running-processes-in-linux/" title="Linux / Unix ps command">/bin/ps</a> 命令的输出结果同从系统调用方面得到的信息进行比较。</li>
<li>穷举法相关的技术，包括对所有的进程 ID 进行暴力求解，该技术仅限于在基于 Linux2.6 内核的系统中使用。</li>
</ol>
</blockquote>
<p>绝大多数的 Rootkit 工具或者恶意软件借助内核来实现进程隐藏，这些进程只在内核内部可见。你可以使用 <code>unhide</code> 或者诸如 <a href="https://www.cyberciti.biz/faq/howto-check-linux-rootkist-with-detectors-software/">rkhunter 等工具，扫描 rootkit 程序 、后门程序以及一些可能存在的本地漏洞</a>。</p>
<p><a href="https://camo.githubusercontent.com/51ee31c20a799512dcd09d88cacbe8dd04731529/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323031312f31312f4c696e75782d467265654253442d556e69782d57696e646f77732d46696e642d48696464656e2d50726f636573732d506f7274732e6a7067"><img src="https://p0.ssl.qhimg.com/t0170c8e3c6a8de71b0.jpg" alt="本文讲解如何在多个操作系统下安装和使用unhide"></a></p>
<p>这篇文章描述了如何安装 unhide 并搜索隐藏的进程和 TCP/UDP 端口。</p>
<h3><a href="#如何安装-unhide"></a>如何安装 unhide</h3>
<p>首先建议你在只读介质上运行这个工具。如果使用的是 Ubuntu 或者 Debian 发行版，输入下述的 <a href="https://www.cyberciti.biz/tips/linux-debian-package-management-cheat-sheet.html" title="See Linux/Unix apt-get command examples for more info">apt-get</a>/<a href="//www.cyberciti.biz/faq/ubuntu-lts-debian-linux-apt-command-examples/" title="See Linux/Unix apt command examples for more info">apt</a> 命令以安装 Unhide：</p>
<pre><code class="hljs routeros">$ sudo apt-<span class="hljs-builtin-name">get</span> install unhide

</code></pre><p>一切顺利的话你的命令行会输出以下内容：</p>
<pre><code class="hljs vim">[sudo] password <span class="hljs-keyword">for</span> vivek: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Suggested package<span class="hljs-variable">s:</span>
  rkhunter
The following NEW packages will <span class="hljs-keyword">be</span> installed:
  <span class="hljs-keyword">unhide</span>
<span class="hljs-number">0</span> upgraded, <span class="hljs-number">1</span> newly installed, <span class="hljs-number">0</span> <span class="hljs-keyword">to</span> <span class="hljs-built_in">remove</span> <span class="hljs-built_in">and</span> <span class="hljs-number">0</span> not upgraded.
Need <span class="hljs-keyword">to</span> <span class="hljs-built_in">get</span> <span class="hljs-number">46.6</span> kB of archives.
After this operation, <span class="hljs-number">136</span> kB of additional disk space will <span class="hljs-keyword">be</span> used.
Ge<span class="hljs-variable">t:1</span> http://in.archive.ubuntu.<span class="hljs-keyword">com</span>/ubuntu artful/universe amd64 <span class="hljs-keyword">unhide</span> amd64 <span class="hljs-number">20130526</span>-<span class="hljs-number">1</span> [<span class="hljs-number">46.6</span> kB]
Fetched <span class="hljs-number">46.6</span> kB in <span class="hljs-number">0</span>s (<span class="hljs-number">49.0</span> kB/s)
Selecting previously unselected package <span class="hljs-keyword">unhide</span>.
(Reading database ... <span class="hljs-number">205367</span> <span class="hljs-keyword">files</span> <span class="hljs-built_in">and</span> directories currently installed.)
Preparing <span class="hljs-keyword">to</span> unpack .../unhide_20130526-<span class="hljs-number">1</span>_amd64.<span class="hljs-keyword">deb</span> ...
Unpacking <span class="hljs-keyword">unhide</span> (<span class="hljs-number">20130526</span>-<span class="hljs-number">1</span>) ...
Setting <span class="hljs-keyword">up</span> <span class="hljs-keyword">unhide</span> (<span class="hljs-number">20130526</span>-<span class="hljs-number">1</span>) ...
Processing triggers <span class="hljs-keyword">for</span> man-db (<span class="hljs-number">2.7</span>.<span class="hljs-number">6.1</span>-<span class="hljs-number">2</span>) ...

</code></pre><h3><a href="#如何在-rhelcentosoraclescientificfedora-上安装-unhide"></a>如何在 RHEL/CentOS/Oracle/Scientific/Fedora 上安装 unhide</h3>
<p>输入下列 yum Type the following yum command (first turn on EPLE repo on a CentOS/RHEL version 6.x or version 7.x):</p>
<p>输入以下的 <a href="https://www.cyberciti.biz/faq/rhel-centos-fedora-linux-yum-command-howto/" title="See Linux/Unix yum command examples for more info">yum</a> 命令（CentOS/RHEL <a href="https://www.cyberciti.biz/faq/fedora-sl-centos-redhat6-enable-epel-repo/">6.x</a> 或 <a href="https://www.cyberciti.biz/faq/installing-rhel-epel-repo-on-centos-redhat-7-x/">7.x</a> 上首先打开 EPEL 仓库）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum install unhide</span>

</code></pre><p>在 Fedora 上则使用以下 dnf 命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo dnf install unhide</span>

</code></pre><h3><a href="#如何在-arch-上安装-unhide"></a>如何在 Arch 上安装 unhide</h3>
<p>键入以下 pacman 命令安装：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo pacman -S unhide</span>

</code></pre><h3><a href="#如何在-freebsd-上安装-unhide"></a>如何在 FreeBSD 上安装 unhide</h3>
<p>可以通过以下的命令使用 port 来安装 unhide：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">cd</span> /usr/ports/security/unhide/</span>
<span class="hljs-meta">#</span><span class="bash"> make install clean</span>

</code></pre><p>或者可以通过二进制文件安装 hide，使用 pkg 命令安装：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pkg install unhide</span>

</code></pre><h3><a href="#如何使用-unhide-工具"></a>如何使用 unhide 工具？</h3>
<p>unhide 的语法是：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">unhide</span> [<span class="hljs-keyword">options</span>] test_list

</code></pre><p><code>test_list</code> 参数可以是以下测试列表中的一个或者多个标准测试：</p>
<ol>
<li>brute</li>
<li>proc</li>
<li>procall</li>
<li>procfs</li>
<li>quick</li>
<li>reverse</li>
<li>sys</li>
</ol>
<p>或基本测试：</p>
<ol>
<li>checkbrute</li>
<li>checkchdir</li>
<li>checkgetaffinity</li>
<li>checkgetparam</li>
<li>checkgetpgid</li>
<li>checkgetprio</li>
<li>checkRRgetinterval</li>
<li>checkgetsched</li>
<li>checkgetsid</li>
<li>checkkill</li>
<li>checknoprocps</li>
<li>checkopendir</li>
<li>checkproc</li>
<li>checkquick</li>
<li>checkreaddir</li>
<li>checkreverse</li>
<li>checksysinfo</li>
<li>checksysinfo2</li>
<li>checksysinfo3</li>
</ol>
<p>你可以通过以下示例命令使用 <code>unhide</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> unhide proc</span>
<span class="hljs-meta">#</span><span class="bash"> unhide sys</span>
<span class="hljs-meta">#</span><span class="bash"> unhide quick</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs vim">Unhide <span class="hljs-number">20130526</span>
Copyright © <span class="hljs-number">2013</span> Yago Jesus &amp; Patrick Gouin
License GPLv3+ : GNU GPL <span class="hljs-keyword">version</span> <span class="hljs-number">3</span> <span class="hljs-built_in">or</span> <span class="hljs-keyword">later</span>
http://www.<span class="hljs-keyword">unhide</span>-forensics.info

NOTE : This <span class="hljs-keyword">version</span> of <span class="hljs-keyword">unhide</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">for</span> systems using Linux &gt;= <span class="hljs-number">2.6</span> 

Used option<span class="hljs-variable">s:</span> 
[*]Searching <span class="hljs-keyword">for</span> Hidden processes through  comparison of results of <span class="hljs-built_in">system</span> calls, proc, dir <span class="hljs-built_in">and</span> <span class="hljs-keyword">ps</span>

</code></pre><h3><a href="#如何使用-unhide-tcp-工具辨明-tcpudp-端口的身份"></a>如何使用 unhide-tcp 工具辨明 TCP/UDP 端口的身份</h3>
<p>以下是来自 man 页面的介绍：</p>
<blockquote>
<p><code>unhide-tcp</code> 取证工具通过对所有可用的 TCP/IP 端口进行暴力求解的方式，辨别所有正在监听，却没有列入 <a href="https://www.cyberciti.biz/tips/linux-display-open-ports-owner.html" title="Linux netstat command">/bin/netstat</a> 或者 <a href="https://www.cyberciti.biz/tips/linux-investigate-sockets-network-connections.html">/bin/ss</a> 命令输出的 TCP/IP 端口身份。</p>
</blockquote>
<blockquote>
<p>注一：对于 FreeBSD、OpenBSD系统，一般使用 netstat 命令取代在这些操作系统上不存在的 iproute2，此外，sockstat 命令也用于替代 fuser。</p>
</blockquote>
<blockquote>
<p>注二：如果操作系统不支持 iproute2 命令，在使用 <code>unhide</code> 时需要在命令上加上 <code>-n</code> 或者 <code>-s</code> 选项。</p>
</blockquote>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> unhide-tcp</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs dts">Unhide <span class="hljs-number">20100201</span>
<span class="hljs-symbol">http:</span><span class="hljs-comment">//www.security-projects.com/?Unhide</span>

Starting TCP checking

Starting UDP checking

</code></pre><p>上述操作中，没有发现隐藏的端口。</p>
<p>但在下述示例中，我展示了一些有趣的事。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> unhide-tcp</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs mizar">Unhide 20100201
http://www.security-projects.com/?Unhide


Starting TCP checking

Found Hidden port <span class="hljs-keyword">that</span> <span class="hljs-keyword">not</span> appears <span class="hljs-keyword">in</span> netstat: 1048
Found Hidden port <span class="hljs-keyword">that</span> <span class="hljs-keyword">not</span> appears <span class="hljs-keyword">in</span> netstat: 1049
Found Hidden port <span class="hljs-keyword">that</span> <span class="hljs-keyword">not</span> appears <span class="hljs-keyword">in</span> netstat: 1050
Starting UDP checking

</code></pre><p>可以看到 <code>netstat -tulpn</code> 和 <code>ss</code> 命令确实没有反映出这三个隐藏的端口：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> netstat -tulpn | grep 1048</span>
<span class="hljs-meta">#</span><span class="bash"> ss -lp</span>
<span class="hljs-meta">#</span><span class="bash"> ss -l | grep 1048</span>

</code></pre><p>通过下述的 man 命令可以更多地了解 <code>unhide</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man unhide</span>
<span class="hljs-meta">$</span><span class="bash"> man unhide-tcp</span>

</code></pre><h3><a href="#windows-用户如何安装使用-unhide"></a>Windows 用户如何安装使用 unhide</h3>
<p>你可以通过这个<a href="http://www.unhide-forensics.info/?Windows:Download">页面</a>获取 Windows 版本的 unhide。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/linux-unix-windows-find-hidden-processes-tcp-udp-ports.html">https://www.cyberciti.biz/tips/linux-unix-windows-find-hidden-processes-tcp-udp-ports.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/ljgibbslf">ljgibbslf</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux/Unix/Windows 中发现隐藏的进程和端口

## 原文链接
[https://www.zcfy.cc/article/how-to-find-hidden-processes-and-ports-on-linux-unix-windows](https://www.zcfy.cc/article/how-to-find-hidden-processes-and-ports-on-linux-unix-windows)


---
title: '在 Kali Linux 下实战 Nmap（网络安全扫描器）' 
date: 2019-02-15 2:30:44
hidden: true
slug: c34420j4015
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-kali-linux-下实战-nmap网络安全扫描器"></a>在 Kali Linux 下实战 Nmap（网络安全扫描器）</h1>
<p>在这第二篇 Kali Linux 文章中, 将讨论称为 ‘<a href="http://www.tecmint.com/nmap-command-examples/">nmap</a>‘ 的网络工具。虽然 nmap 不是 Kali 下唯一的一个工具，但它是最<a href="http://www.tecmint.com/bcc-best-linux-performance-monitoring-tools/">有用的网络映射工具</a>之一。</p>
<ul>
<li><a href="http://www.tecmint.com/kali-linux-installation-guide">第一部分-为初学者准备的Kali Linux安装指南</a></li>
</ul>
<p>Nmap， 是 Network Mapper 的缩写，由 Gordon Lyon 维护(更多关于 Mr. Lyon 的信息在这里: <a href="http://insecure.org/fyodor/">http://insecure.org/fyodor/</a>) ，并被世界各地许多的安全专业人员使用。</p>
<p>这个工具在 Linux 和 Windows 下都能使用，并且是用命令行驱动的。相对于那些令人害怕的命令行，对于 nmap，在这里有一个美妙的图形化前端叫做 zenmap。</p>
<p>强烈建议个人去学习 nmap 的命令行版本，因为与图形化版本 zenmap 相比，它提供了更多的灵活性。</p>
<p>对服务器进行 nmap 扫描的目的是什么？很好的问题。Nmap 允许管理员快速彻底地了解网络上的系统，因此，它的名字叫 Network MAPper 或者 nmap。</p>
<p>Nmap 能够快速找到活动的主机和与该主机相关联的服务。Nmap 的功能还可以通过结合 Nmap 脚本引擎（通常缩写为 NSE）进一步被扩展。</p>
<p>这个脚本引擎允许管理员快速创建可用于确定其网络上是否存在新发现的漏洞的脚本。已经有许多脚本被开发出来并且包含在大多数的 nmap 安装中。</p>
<p>提醒一句 - 使用 nmap 的人既可能是善意的，也可能是恶意的。应该非常小心，确保你不要使用 nmap 对没有明确得到书面许可的系统进行扫描。请在使用 nmap 工具的时候注意！</p>
<h4><a href="#系统要求"></a>系统要求</h4>
<ol>
<li><a href="http://www.tecmint.com/kali-linux-installation-guide">Kali Linux</a> (nmap 可以用于其他操作系统，并且功能也和这个指南里面讲的类似)。</li>
<li>另一台计算机，并且装有 nmap 的计算机有权限扫描它 - 这通常很容易通过软件来实现，例如通过 <a href="http://www.tecmint.com/install-virtualbox-on-redhat-centos-fedora/">VirtualBox</a> 创建虚拟机。<ol>
<li>想要有一个好的机器来练习一下，可以了解一下 Metasploitable 2。</li>
<li>下载 MS2 ：<a href="https://sourceforge.net/projects/metasploitable/files/Metasploitable2/">Metasploitable2</a>。</li>
</ol>
</li>
<li>一个可以工作的网络连接，或者是使用虚拟机就可以为这两台计算机建立有效的内部网络连接。</li>
</ol>
<h3><a href="#kali-linux--使用-nmap"></a>Kali Linux – 使用 Nmap</h3>
<p>使用 nmap 的第一步是登录 Kali Linux，如果需要，就启动一个图形会话（本系列的第一篇文章安装了 [Kali Linux 的 Enlightenment 桌面环境] <a href="http://www.tecmint.com/kali-linux-installation-guide">27</a>）。</p>
<p>在安装过程中，安装程序将提示用户输入用来登录的“root”用户和密码。 一旦登录到 Kali Linux 机器，使用命令<code>startx</code>就可以启动 Enlightenment 桌面环境 - 值得注意的是 nmap 不需要运行桌面环境。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> startx</span>


</code></pre><p><a href="https://camo.githubusercontent.com/21da8f3763af7e16537e331a87fd49a96aa02895/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f53746172742d4465736b746f702d456e7669726f6e6d656e742d696e2d4b616c692d4c696e75782e706e67"><img src="https://p4.ssl.qhimg.com/t015e7de2e8dc26ec75.png" alt="Start Desktop Environment in Kali Linux"></a></p>
<p><em>在 Kali Linux 中启动桌面环境</em></p>
<p>一旦登录到 Enlightenment，将需要打开终端窗口。通过点击桌面背景，将会出现一个菜单。导航到终端可以进行如下操作：应用程序 -&gt; 系统 -&gt; 'Xterm' 或 'UXterm' 或 '根终端'。</p>
<p>作者是名为 '[Terminator] <a href="http://www.tecmint.com/terminator-a-linux-terminal-emulator-to-manage-multiple-terminal-windows/">25</a>' 的 shell 程序的粉丝，但是这可能不会显示在 Kali Linux 的默认安装中。这里列出的所有 shell 程序都可用于使用 nmap 。</p>
<p><a href="https://camo.githubusercontent.com/f691a6ab9f01da6c84dfbf4770f2c88982e6f881/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4c61756e63682d5465726d696e616c2d696e2d4b616c692d4c696e75782e706e67"><img src="https://p0.ssl.qhimg.com/t01a814a2baf51a1693.png" alt="Launch Terminal in Kali Linux"></a></p>
<p><em>在 Kali Linux 下启动终端</em></p>
<p>一旦终端启动，nmap 的乐趣就开始了。 对于这个特定的教程，将会创建一个 Kali 机器和 Metasploitable机器之间的私有网络。</p>
<p>这会使事情变得更容易和更安全，因为私有的网络范围将确保扫描保持在安全的机器上，防止易受攻击的 Metasploitable 机器被其他人攻击。</p>
<h3><a href="#怎样在我的网络上找到活动主机"></a>怎样在我的网络上找到活动主机</h3>
<p>在此示例中，这两台计算机都位于专用的 192.168.56.0/24 网络上。 Kali 机器的 IP 地址为 192.168.56.101，要扫描的 Metasploitable 机器的 IP 地址为 192.168.56.102。</p>
<p>假如我们不知道 IP 地址信息，但是可以通过快速 nmap 扫描来帮助确定在特定网络上哪些是活动主机。这种扫描称为 “简单列表” 扫描，将 <code>-sL</code>参数传递给 nmap 命令。</p>
<pre><code class="hljs lsl"># nmap -sL <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.0</span>/<span class="hljs-number">24</span>


</code></pre><p><a href="https://camo.githubusercontent.com/f1af26b0c3c8a769b6888dac27570864f165b249/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d4e6574776f726b2e706e67"><img src="https://p4.ssl.qhimg.com/t0100c45b4d86b06432.png" alt="Nmap - Scan Network for Live Hosts"></a></p>
<p><em>Nmap – 扫描网络上的活动主机</em></p>
<p>悲伤的是，这个初始扫描没有返回任何活动主机。 有时，这是某些操作系统处理<a href="http://www.tecmint.com/audit-network-performance-security-and-troubleshooting-in-linux/">端口扫描网络流量</a>的一个方法。</p>
<p>###在我的网络中找到并 ping 所有活动主机</p>
<p>不用担心，在这里有一些技巧可以使 nmap 尝试找到这些机器。 下一个技巧会告诉 nmap 尝试去 ping 192.168.56.0/24 网络中的所有地址。</p>
<pre><code class="hljs lsl"># nmap -sn <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.0</span>/<span class="hljs-number">24</span>


</code></pre><p><a href="https://camo.githubusercontent.com/ef33998bc77d0e8d9cba07e6a0d70ce1600b24d0/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d50696e672d416c6c2d4e6574776f726b2d4c6976652d486f7374732e706e67"><img src="https://p4.ssl.qhimg.com/t01f822d76781f5b9ca.png" alt="Nmap - Ping All Connected Live Network Hosts"></a></p>
<p><em>Nmap – Ping 所有已连接的活动网络主机</em></p>
<p>这次 nmap 会返回一些潜在的主机来进行扫描！ 在此命令中，<code>-sn</code> 禁用 nmap 的尝试对主机端口扫描的默认行为，只是让 nmap 尝试 ping 主机。</p>
<h3><a href="#找到主机上的开放端口"></a>找到主机上的开放端口</h3>
<p>让我们尝试让 nmap 端口扫描这些特定的主机，看看会出现什么。</p>
<pre><code class="hljs lsl"># nmap <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.1</span>,<span class="hljs-number">100</span><span class="hljs-number">-102</span>


</code></pre><p><a href="https://camo.githubusercontent.com/ebcf878860468dea4b5ffdcfed8918fa3d52fd01/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d666f722d506f7274732d6f6e2d486f7374732e706e67"><img src="https://p1.ssl.qhimg.com/t010fbbaae00d0de44b.png" alt="Nmap - Network Ports Scan on Host"></a></p>
<p><em>Nmap – 在主机上扫描网络端口</em></p>
<p>哇! 这一次 nmap 挖到了一个金矿。 这个特定的主机有相当多的<a href="http://www.tecmint.com/find-open-ports-in-linux/">开放网络端口</a>。</p>
<p>这些端口全都代表着在此特定机器上的某种监听服务。 我们前面说过，192.168.56.102 的 IP 地址会分配给一台易受攻击的机器，这就是为什么在这个主机上会有这么多<a href="http://www.tecmint.com/find-open-ports-in-linux/">开放端口</a>。</p>
<p>在大多数机器上打开这么多端口是非常不正常的，所以赶快调查这台机器是个明智的想法。管理员可以检查下网络上的物理机器，并在本地查看这些机器，但这不会很有趣，特别是当 nmap 可以为我们更快地做到时！</p>
<h3><a href="#找到主机上监听端口的服务"></a>找到主机上监听端口的服务</h3>
<p>下一个扫描是服务扫描，通常用于尝试确定机器上什么<a href="http://www.tecmint.com/find-linux-processes-memory-ram-cpu-usage/">服务监听在特定的端口</a>。</p>
<p>Nmap 将探测所有打开的端口，并尝试从每个端口上运行的服务中获取信息。</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">nmap</span> <span class="hljs-selector-tag">-sV</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>


</code></pre><p><a href="https://camo.githubusercontent.com/6565c01466206c49cbacf93836a30bf2561196f8/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d4e6574776f726b2d53657276696365732d506f7274732e706e67"><img src="https://p3.ssl.qhimg.com/t01c18a534ea9df6a77.png" alt="Nmap - Scan Network Services Listening of Ports"></a></p>
<p><em>Nmap – 扫描网络服务监听端口</em></p>
<p>请注意这次 nmap 提供了一些关于 nmap 在特定端口运行的建议（在白框中突出显示），而且 nmap 也试图确认运行在这台机器上的<a href="http://www.tecmint.com/commands-to-collect-system-and-hardware-information-in-linux/">这个操作系统的信息</a>和它的主机名（也非常成功！）。</p>
<p>查看这个输出，应该引起网络管理员相当多的关注。 第一行声称 VSftpd 版本 2.3.4 正在这台机器上运行！ 这是一个真正的旧版本的 VSftpd。</p>
<p>通过查找 ExploitDB，对于这个版本早在 2001 年就发现了一个非常严重的漏洞（ExploitDB ID – 17491）。</p>
<h3><a href="#发现主机上上匿名-ftp-登录"></a>发现主机上上匿名 ftp 登录</h3>
<p>让我们使用 nmap 更加清楚的查看这个端口，并且看看可以确认什么。</p>
<pre><code class="hljs lsl"># nmap -sC <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.102</span> -p <span class="hljs-number">21</span>


</code></pre><p><a href="https://camo.githubusercontent.com/35719cba6d3cba96a91595e0066ccfa06678ab44/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d506172746963756c61722d506f72742d6f6e2d486f73742e706e67"><img src="https://p3.ssl.qhimg.com/t0102d458c8b3c1118a.png" alt="Nmap - Scan Particular Post on Machine"></a></p>
<p><em>Nmap – 扫描机器上的特定端口</em></p>
<p>使用此命令，让 nmap 在主机上的 FTP 端口（<code>-p 21</code>）上运行其默认脚本（<code>-sC</code>）。 虽然它可能是、也可能不是一个问题，但是 nmap 确实发现在这个特定的服务器<a href="http://www.tecmint.com/setup-ftp-anonymous-logins-in-linux/">是允许匿名 FTP 登录的</a>。</p>
<h3><a href="#检查主机上的漏洞"></a>检查主机上的漏洞</h3>
<p>这与我们早先知道 VSftd 有旧漏洞的知识相匹配，应该引起一些关注。 让我们看看 nmap有没有脚本来尝试检查 VSftpd 漏洞。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> locate .nse | grep ftp</span>


</code></pre><p><a href="https://camo.githubusercontent.com/ae3e18ff71caf4aa3804f4c4ddd2d76620c0d8f8/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d536572766963652d56756c6e65726162696c6974792e706e67"><img src="https://p3.ssl.qhimg.com/t01e98f32250d477667.png" alt="Nmap - Scan VSftpd Vulnerability"></a></p>
<p><em>Nmap – 扫描 VSftpd 漏洞</em></p>
<p>注意 nmap 已有一个 NSE 脚本已经用来处理 VSftpd 后门问题！让我们尝试对这个主机运行这个脚本，看看会发生什么，但首先知道如何使用脚本可能是很重要的。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> nmap --script-help=ftp-vsftd-backdoor.nse</span>


</code></pre><p><a href="https://camo.githubusercontent.com/7510c4bd5d0d38f5ccb61821cc927a4172500fe7/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d4c6561726e2d4e53452d5363726970742e706e67"><img src="https://p2.ssl.qhimg.com/t010599159bdeefcb1f.png" alt="Learn Nmap NSE Script Usage"></a></p>
<p><em>了解 Nmap NSE 脚本使用</em></p>
<p>通过这个描述，很明显，这个脚本可以用来试图查看这个特定的机器是否容易受到先前识别的 ExploitDB 问题的影响。</p>
<p>让我们运行这个脚本，看看会发生什么。</p>
<pre><code class="hljs lsl"># nmap --script=ftp-vsftpd-backdoor.nse <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.102</span> -p <span class="hljs-number">21</span>


</code></pre><p><a href="https://camo.githubusercontent.com/009d4cf6f6c1268adc0d3f4b85fc17967d167cf5/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d486f73742d666f722d56756c6e657261626c652e706e67"><img src="https://p1.ssl.qhimg.com/t01d8ac7f7f7c2ac200.png" alt="Nmap - Scan Host for Vulnerable"></a></p>
<p><em>Nmap – 扫描易受攻击的主机</em></p>
<p>耶！Nmap 的脚本返回了一些危险的消息。 这台机器可能面临风险，之后可以进行更加详细的调查。虽然这并不意味着机器缺乏对风险的抵抗力和可以被用于做一些可怕/糟糕的事情，但它应该给网络/安全团队带来一些关注。</p>
<p>Nmap 具有极高的选择性，非常平稳。 到目前为止已经做的大多数扫描， nmap 的网络流量都保持适度平稳，然而以这种方式扫描对个人拥有的网络可能是非常耗时的。</p>
<p>Nmap 有能力做一个更积极的扫描，往往一个命令就会产生之前几个命令一样的信息。 让我们来看看积极的扫描的输出（注意 - 积极的扫描会触发<a href="http://www.tecmint.com/protect-apache-using-mod_security-and-mod_evasive-on-rhel-centos-fedora/">入侵检测/预防系统</a>!）。</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">nmap</span> <span class="hljs-selector-tag">-A</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>


</code></pre><p><a href="https://camo.githubusercontent.com/3638098147ba04235d2d9facbca5fd95bbfb8a1f/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f4e6d61702d5363616e2d4e6574776f726b2d486f73742e706e67"><img src="https://p5.ssl.qhimg.com/t01e27994101862f21c.png" alt="Nmap - Complete Network Scan on Host"></a></p>
<p><em>Nmap – 在主机上完成网络扫描</em></p>
<p>注意这一次，使用一个命令，nmap 返回了很多关于在这台特定机器上运行的开放端口、服务和配置的信息。 这些信息中的大部分可用于帮助确定<a href="http://www.tecmint.com/security-and-hardening-centos-7-guide/">如何保护本机</a>以及评估网络上可能运行的软件。</p>
<p>这只是 nmap 可用于在主机或网段上找到的许多有用信息的很短的一个列表。强烈敦促个人在个人拥有的网络上继续<a href="http://www.tecmint.com/nmap-command-examples/">以nmap</a> 进行实验。（不要通过扫描其他主机来练习！）。</p>
<p>有一个关于 Nmap 网络扫描的官方指南，作者 Gordon Lyon，可从<a href="http://amzn.to/2eFNYrD">亚马逊</a>上获得。</p>
<p>方便的话可以留下你的评论和问题（或者使用 nmap 扫描器的技巧）。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/nmap-network-security-scanner-in-kali-linux/">http://www.tecmint.com/nmap-network-security-scanner-in-kali-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/robturner/">Rob Turner</a> 译者：<a href="https://github.com/DockerChen">DockerChen</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Kali Linux 下实战 Nmap（网络安全扫描器）

## 原文链接
[https://www.zcfy.cc/article/a-practical-guide-to-nmap-network-security-scanner-in-kali-linux](https://www.zcfy.cc/article/a-practical-guide-to-nmap-network-security-scanner-in-kali-linux)


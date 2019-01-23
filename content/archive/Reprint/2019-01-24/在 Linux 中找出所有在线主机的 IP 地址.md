---
title: '在 Linux 中找出所有在线主机的 IP 地址' 
date: 2019-01-24 2:30:11
hidden: true
slug: ca5xjgu1mwi
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-中找出所有在线主机的-ip-地址"></a>在 Linux 中找出所有在线主机的 IP 地址</h1>
<p>你可以在 Linux 的生态系统中找到很多<a href="http://www.tecmint.com/command-line-tools-to-monitor-linux-performance/">网络监控工具</a>，它们可以为你生成出网络中所有设备的摘要，包括它们的 IP 地址等信息。</p>
<p>然而，实际上有时候你只需要一个简单的命令行工具，运行一个简单的命令就能提供同样的信息。</p>
<p>本篇教程会向你展示如何找出所有连接到给定网络的主机的 IP 地址。这里我们会使用 <a href="http://www.tecmint.com/nmap-network-security-scanner-in-kali-linux/">Nmap 工具</a>来找出所有连接到相同网络的设备的IP地址。</p>
<p><a href="http://www.tecmint.com/nmap-command-examples/">Nmap</a> (Network Mapper 的简称)是一款开源、强大并且多功能的探查网络的命令行工具，用来<a href="http://www.tecmint.com/audit-network-performance-security-and-troubleshooting-in-linux/">执行安全扫描、网络审计</a>、<a href="http://www.tecmint.com/find-open-ports-in-linux/">查找远程主机的开放端口</a>等等。</p>
<p>如果你的系统中还没有安装 Nmap，在你的发行版中运行合适的命令来安装：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum install nmap         [在基于 RedHat 的系统中]</span>
<span class="hljs-meta">$</span><span class="bash"> sudo dnf install nmap         [在基于Fedora 22+ 的版本中]</span>
<span class="hljs-meta">$</span><span class="bash"> sudo apt-get install nmap     [在基于 Debian/Ubuntu 的系统中]</span>

</code></pre><p>安装完成后，使用的语法是：</p>
<pre><code class="hljs elm">$ nmap  [scan <span class="hljs-keyword">type</span>...]  options  {target specification}

</code></pre><p>其中，<strong>{target specification}</strong>这个参数可以用<strong>主机名、IP 地址、网络</strong>等来替代。</p>
<p>所以要列出所有连接到指定网络的主机 IP 地址，首先要使用 <a href="http://www.tecmint.com/ifconfig-command-examples/">ifconfig 命令</a>或者<a href="http://www.tecmint.com/ip-command-examples/">ip 命令</a>来识别网络以及它的子网掩码：</p>
<pre><code class="hljs routeros">$ ifconfig
或者
$<span class="hljs-built_in"> ip </span>addr show

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Find-Network-Details-in-Linux.png"><img src="https://p4.ssl.qhimg.com/t01c12a1c7f9ca79628.png" alt="Find Network Details in Linux"></a></p>
<p><em>在 Linux 中查找网络细节</em></p>
<p>接下来，如下运行 Nmap 命令：</p>
<pre><code class="hljs lsl">$ nmap  -sn  <span class="hljs-number">10.42</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">24</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Find-All-Live-Hosts-on-Network.png"><img src="https://p2.ssl.qhimg.com/t01e0cf2ba25b3fb872.png" alt="Find All Live Hosts on Network"></a></p>
<p><em>查找网络中所有活跃的主机</em></p>
<p>上面的命令中：</p>
<ul>
<li><code>-sn</code> - 是扫描的类型，这里是 ping 方式扫描。默认上，Nmap 使用端口扫描，但是这种扫描会禁用端口扫描。</li>
<li><code>10.42.0.0/24</code> - 是目标网络，用你实际的网络来替换。</li>
</ul>
<p>要了解全面的信息，查看 Nmap 的手册：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man nmap</span>

</code></pre><p>或者不带任何参数直接运行 Nmap 查看使用信息摘要：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> nmap</span>

</code></pre><p>此外，对于有兴趣学习 Linux 安全扫描技术的人，可以阅读 <a href="http://www.tecmint.com/nmap-network-security-scanner-in-kali-linux/">Nmap in Kali Linux</a> 这篇实践指导。</p>
<p>好了，就是这样了，记得在下面的回复区给我们发送问题或者评论。你也可以跟我们分享其他列出指定网络已连接设备的 IP 地址的方法。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/find-live-hosts-ip-addresses-on-linux-network/">http://www.tecmint.com/find-live-hosts-ip-addresses-on-linux-network/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 中找出所有在线主机的 IP 地址

## 原文链接
[https://www.zcfy.cc/article/find-out-all-live-hosts-ip-addresses-connected-on-network-in-linux](https://www.zcfy.cc/article/find-out-all-live-hosts-ip-addresses-connected-on-network-in-linux)


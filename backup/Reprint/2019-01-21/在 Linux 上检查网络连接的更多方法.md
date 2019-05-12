---
title: '在 Linux 上检查网络连接的更多方法' 
date: 2019-01-21 2:30:06
hidden: true
slug: ftauj86u1m
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-上检查网络连接的更多方法"></a>在 Linux 上检查网络连接的更多方法</h1>
<blockquote>
<p>有几个命令可以帮助你在 Linux 系统上看到网络状况，这些包括 ip、ethtool、traceroute、tcptraceroute 和 tcpdump。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/e270a032b72b6abc5737da40c223b2f003f70bcf/68747470733a2f2f696d616765732e74656368686976652e636f6d2f696d616765732f61727469636c652f323031362f31312f65746865726e65745f6361626c65732d3130303639343431392d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01c0bf01404c9f5dfc.jpg" alt=""></a></p>
<p><code>ifconfig</code> 和 <code>netstat</code> 命令当然非常有用，但还有很多其它命令能帮你查看 Linux 系统上的网络状况。本文探索了一些检查网络连接的非常简便的命令。</p>
<h3><a href="#ip-命令"></a>ip 命令</h3>
<p><code>ip</code> 命令显示了许多与你使用 <code>ifconfig</code> 命令时的一样信息。其中一些信息以不同的格式呈现，比如显示 <code>192.168.0.6/24</code>，而不是 <code>inet addr:192.168.0.6 Bcast:192.168.0.255</code>，尽管 <code>ifconfig</code> 更适合数据包计数，但 <code>ip</code> 命令有许多有用的选项。</p>
<p>首先，<code>ip a</code> 命令可以列出所有网络接口的信息。</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span>a
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN<span class="hljs-built_in"> group default </span>qlen 1
 link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
 inet 127.0.0.1/8 scope host lo
 valid_lft forever preferred_lft forever
 inet6 ::1/128 scope host
 valid_lft forever preferred_lft forever
2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP<span class="hljs-built_in"> group default </span>qlen 1000
 link/ether 00:1e:4f:c8:43:fc brd ff:ff:ff:ff:ff:ff
 inet 192.168.0.6/24 brd 192.168.0.255 scope global eth0
 valid_lft forever preferred_lft forever
 inet6 fe80::21e:4fff:fec8:43fc/64 scope link
 valid_lft forever preferred_lft forever

</code></pre><p>如果你只想看到简单的网络接口列表，你可以用 <code>grep</code> 限制它的输出。</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span>a | grep inet
 inet 127.0.0.1/8 scope host lo
 inet6 ::1/128 scope host
 inet 192.168.0.6/24 brd 192.168.0.255 scope global eth0
 inet6 fe80::21e:4fff:fec8:43fc/64 scope link

</code></pre><p>使用如下面的命令，你可以看到你的默认路由：</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip route </span>show<span class="hljs-built_in">
default </span>via 192.168.0.1 dev eth0
192.168.0.0/24 dev eth0 proto kernel scope link src 192.168.0.6

</code></pre><p>在这个输出中，你可以看到通过 <code>eth0</code> 的默认网关是 <code>192.168.0.1</code>，并且本地网络是相当标准的 <code>192.168.0.0/24</code>。</p>
<p>你也可以使用 <code>ip</code> 命令来启用和禁用网络接口。</p>
<pre><code class="hljs routeros">$ sudo<span class="hljs-built_in"> ip </span>link <span class="hljs-builtin-name">set</span> eth1 up
$ sudo<span class="hljs-built_in"> ip </span>link <span class="hljs-builtin-name">set</span> eth1 down

</code></pre><h3><a href="#ethtool-命令"></a>ethtool 命令</h3>
<p>另一个检查网络非常有用的工具是 <code>ethtool</code>。这个命令提供了网络接口上的许多描述性的数据。</p>
<pre><code class="hljs yaml"><span class="hljs-string">$</span> <span class="hljs-string">ethtool</span> <span class="hljs-string">eth0</span>
<span class="hljs-string">Settings</span> <span class="hljs-string">for</span> <span class="hljs-attr">eth0:</span>
 <span class="hljs-string">Supported</span> <span class="hljs-attr">ports:</span> <span class="hljs-string">[</span> <span class="hljs-string">TP</span> <span class="hljs-string">]</span>
 <span class="hljs-string">Supported</span> <span class="hljs-string">link</span> <span class="hljs-attr">modes:</span> <span class="hljs-number">10</span><span class="hljs-string">baseT/Half</span> <span class="hljs-number">10</span><span class="hljs-string">baseT/Full</span>
 <span class="hljs-number">100</span><span class="hljs-string">baseT/Half</span> <span class="hljs-number">100</span><span class="hljs-string">baseT/Full</span>
 <span class="hljs-number">1000</span><span class="hljs-string">baseT/Full</span>
 <span class="hljs-string">Supported</span> <span class="hljs-string">pause</span> <span class="hljs-string">frame</span> <span class="hljs-attr">use:</span> <span class="hljs-literal">No</span>
 <span class="hljs-string">Supports</span> <span class="hljs-attr">auto-negotiation:</span> <span class="hljs-literal">Yes</span>
 <span class="hljs-string">Advertised</span> <span class="hljs-string">link</span> <span class="hljs-attr">modes:</span> <span class="hljs-number">10</span><span class="hljs-string">baseT/Half</span> <span class="hljs-number">10</span><span class="hljs-string">baseT/Full</span>
 <span class="hljs-number">100</span><span class="hljs-string">baseT/Half</span> <span class="hljs-number">100</span><span class="hljs-string">baseT/Full</span>
 <span class="hljs-number">1000</span><span class="hljs-string">baseT/Full</span>
 <span class="hljs-string">Advertised</span> <span class="hljs-string">pause</span> <span class="hljs-string">frame</span> <span class="hljs-attr">use:</span> <span class="hljs-literal">No</span>
 <span class="hljs-string">Advertised</span> <span class="hljs-attr">auto-negotiation:</span> <span class="hljs-literal">Yes</span>
<span class="hljs-attr"> Speed:</span> <span class="hljs-number">100</span><span class="hljs-string">Mb/s</span>
<span class="hljs-attr"> Duplex:</span> <span class="hljs-string">Full</span>
<span class="hljs-attr"> Port:</span> <span class="hljs-string">Twisted</span> <span class="hljs-string">Pair</span>
<span class="hljs-attr"> PHYAD:</span> <span class="hljs-number">1</span>
<span class="hljs-attr"> Transceiver:</span> <span class="hljs-string">internal</span>
<span class="hljs-attr"> Auto-negotiation:</span> <span class="hljs-string">on</span>
<span class="hljs-attr"> MDI-X:</span> <span class="hljs-string">on</span> <span class="hljs-string">(auto)</span>
<span class="hljs-string">Cannot</span> <span class="hljs-string">get</span> <span class="hljs-string">wake-on-lan</span> <span class="hljs-attr">settings:</span> <span class="hljs-string">Operation</span> <span class="hljs-string">not</span> <span class="hljs-string">permitted</span>
 <span class="hljs-string">Current</span> <span class="hljs-string">message</span> <span class="hljs-attr">level:</span> <span class="hljs-number">0x00000007</span> <span class="hljs-string">(7)</span>
 <span class="hljs-string">drv</span> <span class="hljs-string">probe</span> <span class="hljs-string">link</span>
 <span class="hljs-string">Link</span> <span class="hljs-attr">detected:</span> <span class="hljs-literal">yes</span>

</code></pre><p>你也可以使用 <code>ethtool</code> 命令来检查以太网驱动程序的设置。</p>
<pre><code class="hljs yaml"><span class="hljs-string">$</span> <span class="hljs-string">ethtool</span> <span class="hljs-bullet">-i</span> <span class="hljs-string">eth0</span>
<span class="hljs-attr">driver:</span> <span class="hljs-string">e1000e</span>
<span class="hljs-attr">version:</span> <span class="hljs-number">3.2</span><span class="hljs-number">.6</span><span class="hljs-bullet">-k</span>
<span class="hljs-attr">firmware-version:</span> <span class="hljs-number">1.4</span><span class="hljs-bullet">-0</span>
<span class="hljs-attr">expansion-rom-version:</span>
<span class="hljs-attr">bus-info:</span> <span class="hljs-number">0000</span><span class="hljs-string">:00:19.0</span>
<span class="hljs-attr">supports-statistics:</span> <span class="hljs-literal">yes</span>
<span class="hljs-attr">supports-test:</span> <span class="hljs-literal">yes</span>
<span class="hljs-attr">supports-eeprom-access:</span> <span class="hljs-literal">yes</span>
<span class="hljs-attr">supports-register-dump:</span> <span class="hljs-literal">yes</span>
<span class="hljs-attr">supports-priv-flags:</span> <span class="hljs-literal">no</span>

</code></pre><p>自动协商的详细信息可以用这样的命令来显示：</p>
<pre><code class="hljs livecodeserver">$ ethtool -<span class="hljs-keyword">a</span> eth0
Pause parameters <span class="hljs-keyword">for</span> eth0:
Autonegotiate: <span class="hljs-keyword">on</span>
RX: <span class="hljs-keyword">on</span>
TX: <span class="hljs-keyword">on</span>

</code></pre><h3><a href="#traceroute-命令"></a>traceroute 命令</h3>
<p><code>traceroute</code> 命令用于显示路由路径。它通过在一系列数据包中设置数据包头的 TTL（生存时间）字段来捕获数据包所经过的路径，以及数据包从一跳到下一跳需要的时间。<code>traceroute</code> 的输出有助于评估网络连接的健康状况，因为某些路由可能需要花费更长的时间才能到达最终的目的地。</p>
<pre><code class="hljs lsl">$ sudo traceroute world.std.com
traceroute to world.std.com (<span class="hljs-number">192.74</span><span class="hljs-number">.137</span><span class="hljs-number">.5</span>), <span class="hljs-number">30</span> hops max, <span class="hljs-number">60</span> byte packets
 <span class="hljs-number">1</span> <span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span> (<span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>) <span class="hljs-number">3.691</span> ms <span class="hljs-number">3.678</span> ms <span class="hljs-number">3.665</span> ms
 <span class="hljs-number">2</span> <span class="hljs-number">10.224</span><span class="hljs-number">.64</span><span class="hljs-number">.1</span> (<span class="hljs-number">10.224</span><span class="hljs-number">.64</span><span class="hljs-number">.1</span>) <span class="hljs-number">26.273</span> ms <span class="hljs-number">27.354</span> ms <span class="hljs-number">28.574</span> ms
 <span class="hljs-number">3</span> <span class="hljs-number">10.20</span><span class="hljs-number">.0</span><span class="hljs-number">.33</span> (<span class="hljs-number">10.20</span><span class="hljs-number">.0</span><span class="hljs-number">.33</span>) <span class="hljs-number">28.293</span> ms <span class="hljs-number">30.625</span> ms <span class="hljs-number">33.959</span> ms
 <span class="hljs-number">4</span> <span class="hljs-number">10.20</span><span class="hljs-number">.0</span><span class="hljs-number">.226</span> (<span class="hljs-number">10.20</span><span class="hljs-number">.0</span><span class="hljs-number">.226</span>) <span class="hljs-number">36.807</span> ms <span class="hljs-number">37.868</span> ms <span class="hljs-number">37.857</span> ms
 <span class="hljs-number">5</span> <span class="hljs-number">204.111</span><span class="hljs-number">.0</span><span class="hljs-number">.132</span> (<span class="hljs-number">204.111</span><span class="hljs-number">.0</span><span class="hljs-number">.132</span>) <span class="hljs-number">38.256</span> ms <span class="hljs-number">39.091</span> ms <span class="hljs-number">40.429</span> ms
 <span class="hljs-number">6</span> ash-b1-link.telia.net (<span class="hljs-number">80.239</span><span class="hljs-number">.161</span><span class="hljs-number">.69</span>) <span class="hljs-number">41.612</span> ms <span class="hljs-number">28.214</span> ms <span class="hljs-number">29.573</span> ms
 <span class="hljs-number">7</span> xe<span class="hljs-number">-1</span><span class="hljs-number">-3</span><span class="hljs-number">-1.</span>er1.iad10.us.zip.zayo.com (<span class="hljs-number">64.125</span><span class="hljs-number">.13</span><span class="hljs-number">.157</span>) <span class="hljs-number">30.429</span> ms <span class="hljs-number">27.915</span> ms <span class="hljs-number">29.065</span> ms
 <span class="hljs-number">8</span> ae6.cr1.dca2.us.zip.zayo.com (<span class="hljs-number">64.125</span><span class="hljs-number">.20</span><span class="hljs-number">.117</span>) <span class="hljs-number">31.353</span> ms <span class="hljs-number">32.413</span> ms <span class="hljs-number">33.821</span> ms
 <span class="hljs-number">9</span> ae27.cs1.dca2.us.eth.zayo.com (<span class="hljs-number">64.125</span><span class="hljs-number">.30</span><span class="hljs-number">.246</span>) <span class="hljs-number">43.474</span> ms <span class="hljs-number">44.519</span> ms <span class="hljs-number">46.037</span> ms
<span class="hljs-number">10</span> ae4.cs1.lga5.us.eth.zayo.com (<span class="hljs-number">64.125</span><span class="hljs-number">.29</span><span class="hljs-number">.202</span>) <span class="hljs-number">48.107</span> ms <span class="hljs-number">48.960</span> ms <span class="hljs-number">50.024</span> ms
<span class="hljs-number">11</span> ae8.mpr3.bos2.us.zip.zayo.com (<span class="hljs-number">64.125</span><span class="hljs-number">.30</span><span class="hljs-number">.139</span>) <span class="hljs-number">51.626</span> ms <span class="hljs-number">51.200</span> ms <span class="hljs-number">39.283</span> ms
<span class="hljs-number">12</span> <span class="hljs-number">64.124</span><span class="hljs-number">.51</span><span class="hljs-number">.229</span>.t495-rtr.towerstream.com (<span class="hljs-number">64.124</span><span class="hljs-number">.51</span><span class="hljs-number">.229</span>) <span class="hljs-number">40.233</span> ms <span class="hljs-number">41.295</span> ms <span class="hljs-number">39.651</span> ms
<span class="hljs-number">13</span> <span class="hljs-number">69.38</span><span class="hljs-number">.149</span><span class="hljs-number">.18</span> (<span class="hljs-number">69.38</span><span class="hljs-number">.149</span><span class="hljs-number">.18</span>) <span class="hljs-number">44.955</span> ms <span class="hljs-number">46.210</span> ms <span class="hljs-number">55.673</span> ms
<span class="hljs-number">14</span> <span class="hljs-number">64.119</span><span class="hljs-number">.137</span><span class="hljs-number">.154</span> (<span class="hljs-number">64.119</span><span class="hljs-number">.137</span><span class="hljs-number">.154</span>) <span class="hljs-number">56.076</span> ms <span class="hljs-number">56.064</span> ms <span class="hljs-number">56.052</span> ms
<span class="hljs-number">15</span> world.std.com (<span class="hljs-number">192.74</span><span class="hljs-number">.137</span><span class="hljs-number">.5</span>) <span class="hljs-number">63.440</span> ms <span class="hljs-number">63.886</span> ms <span class="hljs-number">63.870</span> ms

</code></pre><h3><a href="#tcptraceroute-命令"></a>tcptraceroute 命令</h3>
<p><code>tcptraceroute</code> 命令与 <code>traceroute</code> 基本上是一样的，只是它能够绕过最常见的防火墙的过滤。正如该命令的手册页所述，<code>tcptraceroute</code> 发送 TCP SYN 数据包而不是 UDP 或 ICMP ECHO 数据包，所以其不易被阻塞。</p>
<h3><a href="#tcpdump-命令"></a>tcpdump 命令</h3>
<p><code>tcpdump</code> 命令允许你捕获网络数据包来进一步分析。使用 <code>-D</code> 选项列出可用的网络接口。</p>
<pre><code class="hljs stylus">$ tcpdump -D
<span class="hljs-number">1</span><span class="hljs-selector-class">.eth0</span> [Up, Running]
<span class="hljs-number">2</span><span class="hljs-selector-class">.any</span> (Pseudo-device that captures on all interfaces) [Up, Running]
<span class="hljs-number">3</span><span class="hljs-selector-class">.lo</span> [Up, Running, Loopback]
<span class="hljs-number">4</span><span class="hljs-selector-class">.nflog</span> (Linux netfilter log (NFLOG) interface)
<span class="hljs-number">5</span><span class="hljs-selector-class">.nfqueue</span> (Linux netfilter queue (NFQUEUE) interface)
<span class="hljs-number">6</span><span class="hljs-selector-class">.usbmon1</span> (USB bus number <span class="hljs-number">1</span>)
<span class="hljs-number">7</span><span class="hljs-selector-class">.usbmon2</span> (USB bus number <span class="hljs-number">2</span>)
<span class="hljs-number">8</span><span class="hljs-selector-class">.usbmon3</span> (USB bus number <span class="hljs-number">3</span>)
<span class="hljs-number">9</span><span class="hljs-selector-class">.usbmon4</span> (USB bus number <span class="hljs-number">4</span>)
<span class="hljs-number">10</span><span class="hljs-selector-class">.usbmon5</span> (USB bus number <span class="hljs-number">5</span>)
<span class="hljs-number">11</span><span class="hljs-selector-class">.usbmon6</span> (USB bus number <span class="hljs-number">6</span>)
<span class="hljs-number">12</span><span class="hljs-selector-class">.usbmon7</span> (USB bus number <span class="hljs-number">7</span>)

</code></pre><p><code>-v</code> 选项控制你看到的细节程度——越多的 <code>v</code>，越详细，但超过 3 个 <code>v</code> 不会有更多意义。</p>
<pre><code class="hljs routeros">$ sudo tcpdump -vv host 192.168.0.32
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
20:26:31.321816<span class="hljs-built_in"> IP </span>(tos 0x10, ttl 64, id 22411, offset 0, flags [DF], proto TCP (6), length 184)
 192.168.0.6.ssh &gt; 192.168.0.32.57294: Flags [P.], cksum 0x8221 (incorrect -&gt; 0x0254), seq 3891093411:3891093555, ack 2388988308, win 329, length 144
20:26:31.321984<span class="hljs-built_in"> IP </span>(tos 0x10, ttl 64, id 22412, offset 0, flags [DF], proto TCP (6), length 200)
 192.168.0.6.ssh &gt; 192.168.0.32.57294: Flags [P.], cksum 0x8231 (incorrect -&gt; 0x3db0), seq 144:304, ack 1, win 329, length 160
20:26:31.323791<span class="hljs-built_in"> IP </span>(tos 0x0, ttl 128, id 20259, offset 0, flags [DF], proto TCP (6), length 40)
 192.168.0.32.57294 &gt; 192.168.0.6.ssh: Flags [.], cksum 0x643d (correct), seq 1, ack 304, win 385, length 0
20:26:31.383954<span class="hljs-built_in"> IP </span>(tos 0x10, ttl 64, id 22413, offset 0, flags [DF], proto TCP (6), length 248)
<span class="hljs-built_in">..</span>.

</code></pre><p>当你运行像这样的命令时，会看到<strong>非常多</strong>的输出。</p>
<p>这个命令捕获来自特定主机和 <code>eth0</code> 上的 <code>11</code> 个数据包。<code>-w</code> 选项标识保存捕获包的文件。在这个示例命令中，我们只要求捕获 <code>11</code> 个数据包。</p>
<pre><code class="hljs routeros">$ sudo tcpdump -c 11 -i eth0 src 192.168.0.32 -w packets.pcap
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
11 packets captured
11 packets received by<span class="hljs-built_in"> filter
</span>0 packets dropped by kernel

</code></pre><h3><a href="#arp-命令"></a>arp 命令</h3>
<p><code>arp</code> 命令将 IPv4 地址映射到硬件地址。它所提供的信息也可以在一定程度上用于识别系统，因为网络适配器可以告诉你使用它们的系统的一些信息。下面的第二个 MAC 地址，以 <code>f8:8e:85</code> 开头，很容易被识别出是 Comtrend 路由器。</p>
<pre><code class="hljs livecodeserver">$ arp -<span class="hljs-keyword">a</span>
? (<span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.12</span>) <span class="hljs-keyword">at</span> b0:c0:<span class="hljs-number">90</span>:<span class="hljs-number">3</span>f:<span class="hljs-number">10</span>:<span class="hljs-number">15</span> [ether] <span class="hljs-keyword">on</span> <span class="hljs-title">eth0</span>
? (<span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>) <span class="hljs-keyword">at</span> f8:<span class="hljs-number">8</span>e:<span class="hljs-number">85</span>:<span class="hljs-number">35</span>:<span class="hljs-number">7</span>f:b9 [ether] <span class="hljs-keyword">on</span> <span class="hljs-title">eth0</span>

</code></pre><p>上面的第一行显示了系统本身的网络适配器的 MAC 地址。该网络适配器似乎已由台湾 Chicony 电子公司制造。你可以很容易地在网上查找 MAC 地址关联，例如来自 Wireshark 的这个工具 —— <a href="https://www.wireshark.org/tools/oui-lookup.html">https://www.wireshark.org/tools/oui-lookup.html</a> 。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3233306/linux/more-ways-to-examine-network-connections-on-linux.html">https://www.networkworld.com/article/3233306/linux/more-ways-to-examine-network-connections-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/kimii">kimii</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 上检查网络连接的更多方法

## 原文链接
[https://www.zcfy.cc/article/more-ways-to-examine-network-connections-on-linux](https://www.zcfy.cc/article/more-ways-to-examine-network-connections-on-linux)


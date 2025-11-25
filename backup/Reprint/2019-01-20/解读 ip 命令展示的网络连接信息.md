---
title: '解读 ip 命令展示的网络连接信息' 
date: 2019-01-20 2:30:11
hidden: true
slug: z5ouuo3ned
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#解读-ip-命令展示的网络连接信息"></a>解读 ip 命令展示的网络连接信息</h1>
<p><code>ip</code> 命令可以告诉你很多网络连接配置和状态的信息，但是所有这些词和数字意味着什么？ 让我们深入了解一下，看看所有显示的值都试图告诉你什么。</p>
<p>当您使用 <code>ip a</code>（或 <code>ip addr</code>）命令获取系统上所有网络接口的信息时，您将看到如下所示的内容：</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span>a
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN<span class="hljs-built_in"> group default </span>qlen 1000
 link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
 inet 127.0.0.1/8 scope host lo
 valid_lft forever preferred_lft forever
 inet6 ::1/128 scope host
 valid_lft forever preferred_lft forever
2: enp0s25: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP<span class="hljs-built_in"> group default </span>qlen 1000
 link/ether 00:1e:4f:c8:43:fc brd ff:ff:ff:ff:ff:ff
 inet 192.168.0.24/24 brd 192.168.0.255 scope global dynamic enp0s25
 valid_lft 57295sec preferred_lft 57295sec
 inet6 fe80::2c8e:1de0:a862:14fd/64 scope link
 valid_lft forever preferred_lft forever

</code></pre><p>这个系统上的两个接口 - 环回（<code>lo</code>）和网络（<code>enp0s25</code>）——显示了很多统计数据。 <code>lo</code> 接口显然是环回地址loolback。 我们可以在列表中看到环回 IPv4 地址（<code>127.0.0.1</code>）和环回 IPv6（<code>::1</code>）。 而普通的网络接口更有趣。</p>
<h3><a href="#为什么是-enp0s25-而不是-eth0"></a>为什么是 enp0s25 而不是 eth0</h3>
<p>如果你想知道为什么它在这个系统上被称为 <code>enp0s25</code>，而不是可能更熟悉的 <code>eth0</code>，那我们可以稍微解释一下。</p>
<p>新的命名方案被称为“可预测的网络接口Predictable Network Interface”。 它已经在基于systemd 的 Linux 系统上使用了一段时间了。 接口名称取决于硬件的物理位置。 <code>en</code> 仅仅就是 “ethernet” 的意思，就像 “eth” 用于对应 <code>eth0</code>，一样。 <code>p</code> 是以太网卡的总线编号，<code>s</code> 是插槽编号。 所以 <code>enp0s25</code> 告诉我们很多我们正在使用的硬件的信息。</p>
<p><code>&lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt;</code> 这个配置串告诉我们：</p>
<pre><code class="hljs armasm"><span class="hljs-keyword">BROADCAST </span>    该接口支持广播
<span class="hljs-keyword">MULTICAST </span>    该接口支持多播
<span class="hljs-symbol">UP</span>             网络接口已启用
<span class="hljs-symbol">LOWER_UP</span>     网络电缆已插入，设备已连接至网络

</code></pre><p>列出的其他值也告诉了我们很多关于接口的知识，但我们需要知道 <code>brd</code> 和 <code>qlen</code> 这些词代表什么意思。 所以，这里显示的是上面展示的 <code>ip</code> 信息的其余部分的翻译。</p>
<pre><code class="hljs routeros">mtu 1500                                     最大传输单位（数据包大小）为1,500字节
qdisc pfifo_fast                             用于数据包排队
state UP                                     网络接口已启用<span class="hljs-built_in">
group default </span>                                接口组
qlen 1000                                     传输队列长度
link/ether 00:1e:4f:c8:43:fc                 接口的 MAC（硬件）地址
brd ff:ff:ff:ff:ff:ff                         广播地址
inet 192.168.0.24/24                         IPv4 地址
brd 192.168.0.255                             广播地址
scope global                                 全局有效
dynamic enp0s25                             地址是动态分配的
valid_lft 80866sec                             IPv4 地址的有效使用期限
preferred_lft 80866sec                         IPv4 地址的首选生存期
inet6 fe80::2c8e:1de0:a862:14fd/64           <span class="hljs-built_in"> IPv6 </span>地址
scope link                                     仅在此设备上有效
valid_lft forever                            <span class="hljs-built_in"> IPv6 </span>地址的有效使用期限
preferred_lft forever                        <span class="hljs-built_in"> IPv6 </span>地址的首选生存期

</code></pre><p>您可能已经注意到，<code>ifconfig</code> 命令提供的一些信息未包含在 <code>ip a</code> 命令的输出中 —— 例如传输数据包的统计信息。 如果您想查看发送和接收的数据包数量以及冲突数量的列表，可以使用以下 <code>ip</code> 命令：</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip </span>-s link show enp0s25
2: enp0s25: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP mode<span class="hljs-built_in"> DEFAULT group default </span>qlen 1000
 link/ether 00:1e:4f:c8:43:fc brd ff:ff:ff:ff:ff:ff
 RX: bytes packets errors dropped overrun mcast
 224258568 418718 0 0 0 84376
 TX: bytes packets errors dropped carrier collsns
 6131373 78152 0 0 0 0

</code></pre><p>另一个 <code>ip</code> 命令提供有关系统路由表的信息。</p>
<pre><code class="hljs routeros">$<span class="hljs-built_in"> ip route </span>show<span class="hljs-built_in">
default </span>via 192.168.0.1 dev enp0s25 proto static metric 100
169.254.0.0/16 dev enp0s25 scope link metric 1000
192.168.0.0/24 dev enp0s25 proto kernel scope link src 192.168.0.24 metric 100

</code></pre><p><code>ip</code> 命令是非常通用的。 您可以从 <code>ip</code> 命令及其来自<a href="https://access.redhat.com/sites/default/files/attachments/rh_ip_command_cheatsheet_1214_jcs_print.pdf">Red Hat</a>的选项获得有用的备忘单。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3262045/linux/checking-your-network-connections-on-linux.html">https://www.networkworld.com/article/3262045/linux/checking-your-network-connections-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/Flowsnow">Flowsnow</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解读 ip 命令展示的网络连接信息

## 原文链接
[https://www.zcfy.cc/article/how-to-check-your-network-connections-on-linux](https://www.zcfy.cc/article/how-to-check-your-network-connections-on-linux)


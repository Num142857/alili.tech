---
title: 如何在 Linux 中找到你的 IP 地址
hidden: true
categories: [reprint]
slug: 27b45adc
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1><a href="#如何在-linux-中找到你的-ip-地址"></a>如何在 Linux 中找到你的 IP 地址</h1>
<blockquote>
<p>每个网站都有一个独有的公开 IP 地址，可供任何人从任何地方访问。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/ea0ec36e18dbe3e08c46d91dcd73c85ac58df23c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f736174656c6c6974655f726164696f5f6c6f636174696f6e2e6a70673f69746f6b3d4b4a554b53423678"><img src="https://p0.ssl.qhimg.com/t019eb801d7c514fb58.jpg" alt=""></a></p>
<p>互联网协议Internet Protocol（IP）不需要介绍 —— 我们每天都在使用它。即使你不直接使用它，当你在浏览器上输入 website-name.com 时，它会查找该 URL 的 IP 地址，然后加载该网站。</p>
<p>我们将 IP 地址分为两类：私有和公共。私有 IP 地址是你的无线路由（和公司内网）提供的私有 IP 地址。它们的范围是 10.xxx、172.16.xx-172.31.xx 和 192.168.xx，其中 x=0 到 255。公有 IP 地址，顾名思义，是“公共”的，你可以在世界上任何地方访问它。每个网站都有一个唯一的 IP 地址，任何人可在任何地点访问，这可被视为公共 IP 地址。</p>
<p>此外，还有两种类型的 IP 地址：IPv4 和 IPv6。</p>
<p>IPv4 地址格式为 x.x.x.x，其中 x=0 到 255。有 2^32（大约 40 亿个）可能的 IPv4 地址。</p>
<p>IPv6 地址使用更复杂的十六进制。总的比特数是 128，这意味着有 2^128 （340 后面有 36 个零！）个可能的 IPv6 地址。IPv6 已经被引入解决了可预见的 IPv4 地址耗尽问题。</p>
<p>作为网络工程师，我建议不要与任何人共享你机器的公有 IP 地址。你的 WiFi 路由器有公共 IP，即 WAN（广域网）IP 地址，并且连接到该 WiFi 的任何设备都是相同的。连接到相同 WiFi 的所有设备都有上面所说的私有 IP 地址。例如，我的笔记本电脑的 IP 地址 192.168.0.5，而我的电话是 192.168.0.8。这些是私有 IP 地址，但两者都有相同的公有 IP 地址。</p>
<p>以下命令将列出IP地址列表，以查找你计算机的公有 IP 地址：</p>
<ol>
<li><code>ifconfig.me</code></li>
<li><code>curl -4/-6 icanhazip.com</code></li>
<li><code>curl ipinfo.io/ip</code></li>
<li><code>curl api.ipify.org</code></li>
<li><code>curl checkip.dyndns.org</code></li>
<li><code>dig +short myip.opendns.com @resolver1.opendns.com</code></li>
<li><code>host myip.opendns.com resolver1.opendns.com</code></li>
<li><code>curl ident.me</code></li>
<li><code>curl bot.whatismyipaddress.com</code></li>
<li><code>curl ipecho.net/plain</code></li>
</ol>
<p>以下命令将为你提供接口的私有 IP 地址：</p>
<ol>
<li><code>ifconfig -a</code></li>
<li><code>ip addr (ip a)</code></li>
<li><code>hostname -I | awk ‘{print $1}’</code></li>
<li><code>ip route get 1.2.3.4 | awk '{print $7}'</code></li>
<li><code>(Fedora) Wifi-Settings→ click the setting icon next to the Wifi name that you are connected to → Ipv4 and Ipv6 both can be seen</code></li>
<li><code>nmcli -p device show</code></li>
</ol>
<p><em>注意：一些工具需要根据你正在使用的 Linux 发行版安装在你的系统上。另外，一些提到的命令使用第三方网站来获取 IP</em></p>
<hr>
<p>via: <a href="https://opensource.com/article/18/5/how-find-ip-address-linux">https://opensource.com/article/18/5/how-find-ip-address-linux</a></p>
<p>作者：<a href="https://opensource.com/users/architmodi">Archit Modi</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/how-to-find-your-ip-address-in-linux](https://www.zcfy.cc/article/how-to-find-your-ip-address-in-linux)

## 原文标题
如何在 Linux 中找到你的 IP 地址

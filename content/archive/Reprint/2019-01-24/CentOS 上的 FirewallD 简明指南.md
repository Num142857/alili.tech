---
title: 'CentOS 上的 FirewallD 简明指南' 
date: 2019-01-24 2:30:11
hidden: true
slug: w2rd4i9hu9
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#centos-上的-firewalld-简明指南"></a>CentOS 上的 FirewallD 简明指南</h1>
<p><a href="http://www.firewalld.org/">FirewallD</a> 是 iptables 的前端控制器，用于实现持久的网络流量规则。它提供命令行和图形界面，在大多数 Linux 发行版的仓库中都有。与直接控制 iptables 相比，使用 FirewallD 有两个主要区别：</p>
<ol>
<li>FirewallD 使用区域和服务而不是链式规则。</li>
<li>它动态管理规则集，允许更新规则而不破坏现有会话和连接。</li>
</ol>
<blockquote>
<p>FirewallD 是 iptables 的一个封装，可以让你更容易地管理 iptables 规则 - 它并_不是_ iptables 的替代品。虽然 iptables 命令仍可用于 FirewallD，但建议使用 FirewallD 时仅使用 FirewallD 命令。</p>
</blockquote>
<p>本指南将向您介绍 FirewallD 的区域和服务的概念，以及一些基本的配置步骤。</p>
<h3><a href="#安装与管理-firewalld"></a>安装与管理 FirewallD</h3>
<p>CentOS 7 和 Fedora 20+ 已经包含了 FirewallD，但是默认没有激活。可以像其它的 systemd 单元那样控制它。</p>
<p>1、 启动服务，并在系统引导时启动该服务：</p>
<pre><code class="hljs routeros">sudo systemctl start firewalld
sudo systemctl <span class="hljs-builtin-name">enable</span> firewalld

</code></pre><p>要停止并禁用：</p>
<pre><code class="hljs gauss">sudo systemctl <span class="hljs-keyword">stop</span> firewalld
sudo systemctl <span class="hljs-keyword">disable</span> firewalld

</code></pre><p>2、 检查防火墙状态。输出应该是 <code>running</code> 或者 <code>not running</code>。</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --state
</span>
</code></pre><p>3、 要查看 FirewallD 守护进程的状态：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo systemctl status firewalld</span>

</code></pre><p>示例输出</p>
<pre><code class="hljs routeros">firewalld.service - firewalld - dynamic<span class="hljs-built_in"> firewall </span>daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled)
   Active: active (running) since Wed 2015-09-02 18:03:22 UTC; 1min 12s ago
 Main PID: 11954 (firewalld)
   CGroup: /system.slice/firewalld.service
   └─11954 /usr/bin/python -Es /usr/sbin/firewalld --nofork --nopid

</code></pre><p>4、 重新加载 FirewallD 配置：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --reload
</span>
</code></pre><h3><a href="#配置-firewalld"></a>配置 FirewallD</h3>
<p>FirewallD 使用 XML 进行配置。除非是非常特殊的配置，你不必处理它们，而应该使用 <code>firewall-cmd</code>。</p>
<p>配置文件位于两个目录中：</p>
<ul>
<li><code>/usr/lib/FirewallD</code> 下保存默认配置，如默认区域和公用服务。 避免修改它们，因为每次 firewall 软件包更新时都会覆盖这些文件。</li>
<li><code>/etc/firewalld</code> 下保存系统配置文件。 这些文件将覆盖默认配置。</li>
</ul>
<h4><a href="#配置集"></a>配置集</h4>
<p>FirewallD 使用两个<em>配置集</em>：“运行时”和“持久”。 在系统重新启动或重新启动 FirewallD 时，不会保留运行时的配置更改，而对持久配置集的更改不会应用于正在运行的系统。</p>
<p>默认情况下，<code>firewall-cmd</code> 命令适用于运行时配置，但使用 <code>--permanent</code> 标志将保存到持久配置中。要添加和激活持久性规则，你可以使用两种方法之一。</p>
<p>1、 将规则同时添加到持久规则集和运行时规则集中。 �</p>
<pre><code class="hljs routeros">sudo firewall-cmd <span class="hljs-attribute">--zone</span>=public <span class="hljs-attribute">--add-service</span>=http --permanent
sudo firewall-cmd <span class="hljs-attribute">--zone</span>=public <span class="hljs-attribute">--add-service</span>=http

</code></pre><p>2、 将规则添加到持久规则集中并重新加载 FirewallD。 �</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=public --add-service=http --permanent
</span>sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --reload
</span>
</code></pre><blockquote>
<p><code>reload</code> 命令会删除所有运行时配置并应用永久配置。因为 firewalld 动态管理规则集，所以它不会破坏现有的连接和会话。</p>
</blockquote>
<h3><a href="#防火墙的区域"></a>防火墙的区域</h3>
<p>“区域”是针对给定位置或场景（例如家庭、公共、受信任等）可能具有的各种信任级别的预构建规则集。不同的区域允许不同的网络服务和入站流量类型，而拒绝其他任何流量。 首次启用 FirewallD 后，<code>public</code> 将是默认区域。</p>
<p>区域也可以用于不同的网络接口。例如，要分离内部网络和互联网的接口，你可以在 <code>internal</code> 区域上允许 DHCP，但在<code>external</code> 区域仅允许 HTTP 和 SSH。未明确设置为特定区域的任何接口将添加到默认区域。</p>
<p>要找到默认区域： �</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --get-default-zone
</span>
</code></pre><p>要修改默认区域：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --<span class="hljs-built_in">set</span>-default-zone=internal
</span>
</code></pre><p>要查看你网络接口使用的区域：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --get-active-zones
</span>
</code></pre><p>示例输出：</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">public</span>
  interfaces: eth0

</code></pre><p>要得到特定区域的所有配置：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=public --list-all
</span>
</code></pre><p>示例输出：</p>
<pre><code class="hljs yaml"><span class="hljs-string">public</span> <span class="hljs-string">(default,</span> <span class="hljs-string">active)</span>
<span class="hljs-attr">  interfaces:</span> <span class="hljs-string">ens160</span>
<span class="hljs-attr">  sources:</span>
<span class="hljs-attr">  services:</span> <span class="hljs-string">dhcpv6-client</span> <span class="hljs-string">http</span> <span class="hljs-string">ssh</span>
<span class="hljs-attr">  ports:</span> <span class="hljs-number">12345</span><span class="hljs-string">/tcp</span>
<span class="hljs-attr">  masquerade:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">  forward-ports:</span>
<span class="hljs-attr">  icmp-blocks:</span>
  <span class="hljs-string">rich</span> <span class="hljs-attr">rules:</span>

</code></pre><p>要得到所有区域的配置： �</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --list-all-zones
</span>
</code></pre><p>示例输出：</p>
<pre><code class="hljs yaml"><span class="hljs-string">block</span>
<span class="hljs-attr">  interfaces:</span>
<span class="hljs-attr">  sources:</span>
<span class="hljs-attr">  services:</span>
<span class="hljs-attr">  ports:</span>
<span class="hljs-attr">  masquerade:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">  forward-ports:</span>
<span class="hljs-attr">  icmp-blocks:</span>
  <span class="hljs-string">rich</span> <span class="hljs-attr">rules:</span>

  <span class="hljs-string">...</span>

<span class="hljs-string">work</span>
<span class="hljs-attr">  interfaces:</span>
<span class="hljs-attr">  sources:</span>
<span class="hljs-attr">  services:</span> <span class="hljs-string">dhcpv6-client</span> <span class="hljs-string">ipp-client</span> <span class="hljs-string">ssh</span>
<span class="hljs-attr">  ports:</span>
<span class="hljs-attr">  masquerade:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">  forward-ports:</span>
<span class="hljs-attr">  icmp-blocks:</span>
  <span class="hljs-string">rich</span> <span class="hljs-attr">rules:</span>

</code></pre><h4><a href="#与服务一起使用"></a>与服务一起使用</h4>
<p>FirewallD 可以根据特定网络服务的预定义规则来允许相关流量。你可以创建自己的自定义系统规则，并将它们添加到任何区域。 默认支持的服务的配置文件位于 <code>/usr/lib /firewalld/services</code>，用户创建的服务文件在 <code>/etc/firewalld/services</code> 中。</p>
<p>要查看默认的可用服务：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --get-services
</span>
</code></pre><p>比如，要启用或禁用 HTTP 服务： �</p>
<pre><code class="hljs routeros">sudo firewall-cmd <span class="hljs-attribute">--zone</span>=public <span class="hljs-attribute">--add-service</span>=http --permanent
sudo firewall-cmd <span class="hljs-attribute">--zone</span>=public <span class="hljs-attribute">--remove-service</span>=http --permanent

</code></pre><h4><a href="#允许或者拒绝任意端口协议"></a>允许或者拒绝任意端口/协议</h4>
<p>比如：允许或者禁用 12345 端口的 TCP 流量。</p>
<pre><code class="hljs routeros">sudo firewall-cmd <span class="hljs-attribute">--zone</span>=public <span class="hljs-attribute">--add-port</span>=12345/tcp --permanent
sudo firewall-cmd <span class="hljs-attribute">--zone</span>=public <span class="hljs-attribute">--remove-port</span>=12345/tcp --permanent

</code></pre><h4><a href="#端口转发"></a>端口转发</h4>
<p>下面是<strong>在同一台服务器上</strong>将 80 端口的流量转发到 12345 端口。</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=<span class="hljs-string">"public"</span> --add-forward-port=port=80:proto=tcp:toport=12345
</span>
</code></pre><p>要将端口转发到<strong>另外一台服务器上</strong>：</p>
<p>1、 在需要的区域中激活 masquerade。</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=public --add-masquerade
</span>
</code></pre><p>2、 添加转发规则。例子中是将 IP 地址为 ：123.456.78.9 的<em>远程服务器上</em> 80 端口的流量转发到 8080 上。</p>
<p>�</p>
<pre><code class="hljs elixir">sudo firewall-cmd --zone=<span class="hljs-string">"public"</span> --add-forward-port=port=<span class="hljs-number">80</span><span class="hljs-symbol">:proto=tcp</span><span class="hljs-symbol">:toport=</span><span class="hljs-number">8080</span><span class="hljs-symbol">:toaddr=</span><span class="hljs-number">123.456</span>.<span class="hljs-number">78.9</span>

</code></pre><p>要删除规则，用 <code>--remove</code> 替换 <code>--add</code>。比如：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=public --remove-masquerade
</span>
</code></pre><h3><a href="#用-firewalld-构建规则集"></a>用 FirewallD 构建规则集</h3>
<p>例如，以下是如何使用 FirewallD 为你的服务器配置基本规则（如果您正在运行 web 服务器）。</p>
<ol>
<li>将 <code>eth0</code> 的默认区域设置为 <code>dmz</code>。 在所提供的默认区域中，dmz（非军事区）是最适合于这个程序的，因为它只允许 SSH 和 ICMP。</li>
</ol>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --<span class="hljs-built_in">set</span>-default-zone=dmz
</span>sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=dmz --add-interface=eth0
</span>
</code></pre><p>2、 把 HTTP 和 HTTPS 添加永久的服务规则到 dmz 区域中：</p>
<pre><code class="hljs routeros">sudo firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=http --permanent
sudo firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=https --permanent

</code></pre><p>� 3、 重新加载 FirewallD 让规则立即生效：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --reload
</span>
</code></pre><p>� 如果你运行 <code>firewall-cmd --zone=dmz --list-all</code>， 会有下面的输出：</p>
<pre><code class="hljs yaml"><span class="hljs-string">dmz</span> <span class="hljs-string">(default)</span>
<span class="hljs-attr">  interfaces:</span> <span class="hljs-string">eth0</span>
<span class="hljs-attr">  sources:</span>
<span class="hljs-attr">  services:</span> <span class="hljs-string">http</span> <span class="hljs-string">https</span> <span class="hljs-string">ssh</span>
<span class="hljs-attr">  ports:</span>
<span class="hljs-attr">  masquerade:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">  forward-ports:</span>
<span class="hljs-attr">  icmp-blocks:</span>
  <span class="hljs-string">rich</span> <span class="hljs-attr">rules:</span>

</code></pre><p>� 这告诉我们，<code>dmz</code> 区域是我们的<strong>默认</strong>区域，它被用于 <code>eth0</code> 接口<strong>中所有网络的</strong>源地址<strong>和</strong>端口<strong>。 允许传入 HTTP（端口 80）、HTTPS（端口 443）和 SSH（端口 22）的流量，并且由于没有 IP 版本控制的限制，这些适用于 IPv4 和 IPv6。 不允许</strong>IP 伪装<strong>以及</strong>端口转发<strong>。 我们没有 </strong>ICMP 块<strong>，所以 ICMP 流量是完全允许的。没有</strong>丰富（Rich）规则**，允许所有出站流量。</p>
<h3><a href="#高级配置"></a>高级配置</h3>
<p>服务和端口适用于基本配置，但对于高级情景可能会限制较多。 丰富（Rich）规则和直接（Direct）接口允许你为任何端口、协议、地址和操作向任何区域 添加完全自定义的防火墙规则。</p>
<h4><a href="#丰富规则"></a>丰富规则</h4>
<p>丰富规则的语法有很多，但都完整地记录在 <a href="https://jpopelka.fedorapeople.org/firewalld/doc/firewalld.richlanguage.html">firewalld.richlanguage(5)</a> 的手册页中（或在终端中 <code>man firewalld.richlanguage</code>）。 使用 <code>--add-rich-rule</code>、<code>--list-rich-rules</code> 、 <code>--remove-rich-rule</code> 和 firewall-cmd 命令来管理它们。</p>
<p>这里有一些常见的例子：</p>
<p>允许来自主机 192.168.0.14 的所有 IPv4 流量。</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --zone=public --add-rich-rule <span class="hljs-string">'rule family="ipv4" source address=192.168.0.14 accept'</span>
</span>
</code></pre><p>拒绝来自主机 192.168.1.10 到 22 端口的 IPv4 的 TCP 流量。</p>
<pre><code class="hljs nix">sudo firewall-cmd <span class="hljs-attr">--zone=public</span> --add-rich-rule 'rule <span class="hljs-attr">family="ipv4"</span> source <span class="hljs-attr">address="192.168.1.10"</span> port <span class="hljs-attr">port=22</span> <span class="hljs-attr">protocol=tcp</span> reject'

</code></pre><p>允许来自主机 10.1.0.3 到 80 端口的 IPv4 的 TCP 流量，并将流量转发到 6532 端口上。 �</p>
<pre><code class="hljs nix">sudo firewall-cmd <span class="hljs-attr">--zone=public</span> --add-rich-rule 'rule <span class="hljs-attr">family=ipv4</span> source <span class="hljs-attr">address=10.1.0.3</span> forward-port <span class="hljs-attr">port=80</span> <span class="hljs-attr">protocol=tcp</span> <span class="hljs-attr">to-port=6532'</span>

</code></pre><p>将主机 172.31.4.2 上 80 端口的 IPv4 流量转发到 8080 端口（需要在区域上激活 masquerade）。</p>
<pre><code class="hljs nix">sudo firewall-cmd <span class="hljs-attr">--zone=public</span> --add-rich-rule 'rule <span class="hljs-attr">family=ipv4</span> forward-port <span class="hljs-attr">port=80</span> <span class="hljs-attr">protocol=tcp</span> <span class="hljs-attr">to-port=8080</span> <span class="hljs-attr">to-addr=172.31.4.2'</span>

</code></pre><p>列出你目前的丰富规则：</p>
<pre><code class="hljs dockerfile">sudo firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --list-rich-rules
</span>
</code></pre><h3><a href="#iptables-的直接接口"></a>iptables 的直接接口</h3>
<p>对于最高级的使用，或对于 iptables 专家，FirewallD 提供了一个直接（Direct）接口，允许你给它传递原始 iptables 命令。 直接接口规则不是持久的，除非使用 <code>--permanent</code>。</p>
<p>要查看添加到 FirewallD 的所有自定义链或规则：</p>
<pre><code class="hljs dockerfile">firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --direct --get-all-chains
</span>firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --direct --get-all-rules
</span>
</code></pre><p>讨论 iptables 的具体语法已经超出了这篇文章的范围。如果你想学习更多，你可以查看我们的 <a href="https://www.linode.com/docs/networking/firewalls/control-network-traffic-with-iptables">iptables 指南</a>。</p>
<h3><a href="#更多信息"></a>更多信息</h3>
<p>你可以查阅以下资源以获取有关此主题的更多信息。虽然我们希望我们提供的是有效的，但是请注意，我们不能保证外部材料的准确性或及时性。</p>
<ul>
<li><a href="http://www.firewalld.org/">FirewallD 官方网站</a></li>
<li><a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Using_Firewalls.html#sec-Introduction_to_firewalld">RHEL 7 安全指南：FirewallD 简介</a></li>
<li><a href="https://fedoraproject.org/wiki/FirewallD">Fedora Wiki：FirewallD</a></li>
</ul>
<hr>
<p>via: <a href="https://www.linode.com/docs/security/firewalls/introduction-to-firewalld-on-centos">https://www.linode.com/docs/security/firewalls/introduction-to-firewalld-on-centos</a></p>
<p>作者：<a href="https://www.linode.com/docs/security/firewalls/introduction-to-firewalld-on-centos">Linode</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CentOS 上的 FirewallD 简明指南

## 原文链接
[https://www.zcfy.cc/article/introduction-to-firewalld-on-centos](https://www.zcfy.cc/article/introduction-to-firewalld-on-centos)


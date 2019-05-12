---
title: 'CentOS 7 上的 FirewallD 简明指南' 
date: 2019-01-23 2:30:08
hidden: true
slug: g3e70lckxjj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#centos-7-上的-firewalld-简明指南"></a>CentOS 7 上的 FirewallD 简明指南</h1>
<p>FirewallD 是 CentOS 7 服务器上默认可用的防火墙管理工具。基本上，它是 iptables 的封装，有图形配置工具 firewall-config 和命令行工具 <code>firewall-cmd</code>。使用 iptables 服务，每次改动都要求刷新旧规则，并且从 <code>/etc/sysconfig/iptables</code> 读取新规则，然而 firewalld 只应用改动了的不同部分。</p>
<h3><a href="#firewalld-的区域zone"></a>FirewallD 的区域（zone）</h3>
<p>FirewallD 使用服务（service） 和区域（zone）来代替 iptables 的规则（rule）和链（chain）。</p>
<p>默认情况下，有以下的区域（zone）可用：</p>
<ul>
<li><strong>drop</strong> – 丢弃所有传入的网络数据包并且无回应，只有传出网络连接可用。</li>
<li><strong>block</strong> — 拒绝所有传入网络数据包并回应一条主机禁止的 ICMP 消息，只有传出网络连接可用。</li>
<li><strong>public</strong> — 只接受被选择的传入网络连接，用于公共区域。</li>
<li><strong>external</strong> — 用于启用了地址伪装的外部网络，只接受选定的传入网络连接。</li>
<li><strong>dmz</strong> — DMZ 隔离区，外部受限地访问内部网络，只接受选定的传入网络连接。</li>
<li><strong>work</strong> — 对于处在你工作区域内的计算机，只接受被选择的传入网络连接。</li>
<li><strong>home</strong> — 对于处在你家庭区域内的计算机，只接受被选择的传入网络连接。</li>
<li><strong>internal</strong> — 对于处在你内部网络的计算机，只接受被选择的传入网络连接。</li>
<li><strong>trusted</strong> — 所有网络连接都接受。</li>
</ul>
<p>要列出所有可用的区域，运行：</p>
<pre><code class="hljs vala"><span class="hljs-meta"># firewall-cmd --get-zones</span>
work drop <span class="hljs-keyword">internal</span> external trusted home dmz <span class="hljs-keyword">public</span> block

</code></pre><p>列出默认的区域 ：</p>
<pre><code class="hljs kotlin"># firewall-cmd --<span class="hljs-keyword">get</span>-<span class="hljs-keyword">default</span>-zone
<span class="hljs-keyword">public</span>

</code></pre><p>改变默认的区域 ：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> firewall-cmd --<span class="hljs-built_in">set</span>-default-zone=dmz</span>
<span class="hljs-meta">#</span><span class="bash"> firewall-cmd --get-default-zone</span>
dmz

</code></pre><h3><a href="#firewalld-服务"></a>FirewallD 服务</h3>
<p>FirewallD 服务使用 XML 配置文件，记录了 firewalld 服务信息。</p>
<p>列出所有可用的服务：</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># firewall-cmd --get-services</span>
amanda-client amanda-k5-client bacula bacula-client ceph ceph-mon dhcp dhcpv6 dhcpv6-client<span class="hljs-built_in"> dns </span>docker-registry dropbox-lansync freeipa-ldap freeipa-ldaps freeipa-replication ftp high-availability http https imap imaps ipp ipp-client<span class="hljs-built_in"> ipsec </span>iscsi-target kadmin kerberos kpasswd ldap ldaps libvirt libvirt-tls mdns mosh mountd ms-wbt mysql nfs<span class="hljs-built_in"> ntp </span>openvpn pmcd pmproxy pmwebapi pmwebapis pop3 pop3s postgresql privoxy proxy-dhcp ptp pulseaudio puppetmaster<span class="hljs-built_in"> radius </span>rpc-bind rsyncd samba samba-client sane smtp smtps<span class="hljs-built_in"> snmp </span>snmptrap squid ssh synergy syslog syslog-tls telnet tftp tftp-client tinc tor-socks transmission-client vdsm vnc-server wbem-https xmpp-bosh xmpp-client xmpp-local xmpp-server

</code></pre><p>XML 配置文件存储在 <code>/usr/lib/firewalld/services/</code> 和 <code>/etc/firewalld/services/</code> 目录下。</p>
<h3><a href="#用-firewalld-配置你的防火墙"></a>用 FirewallD 配置你的防火墙</h3>
<p>作为一个例子，假设你正在运行一个 web 服务器，SSH 服务端口为 7022 ，以及邮件服务，你可以利用 FirewallD 这样配置你的服务器:</p>
<p>首先设置默认区为 dmz。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> firewall-cmd --<span class="hljs-built_in">set</span>-default-zone=dmz</span>
<span class="hljs-meta">#</span><span class="bash"> firewall-cmd --get-default-zone</span>
dmz

</code></pre><p>为 dmz 区添加持久性的 HTTP 和 HTTPS 规则：</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">zone=dmz</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">add</span><span class="hljs-literal">-</span><span class="hljs-comment">service=http</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">permanent</span>
<span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">zone=dmz</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">add</span><span class="hljs-literal">-</span><span class="hljs-comment">service=https</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">permanent</span>

</code></pre><p>开启端口 25 (SMTP) 和端口 465 (SMTPS) ：</p>
<pre><code class="hljs routeros">firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=smtp --permanent
firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=smtps --permanent

</code></pre><p>开启 IMAP、IMAPS、POP3 和 POP3S 端口：</p>
<pre><code class="hljs routeros">firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=imap --permanent
firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=imaps --permanent
firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=pop3 --permanent
firewall-cmd <span class="hljs-attribute">--zone</span>=dmz <span class="hljs-attribute">--add-service</span>=pop3s --permanent

</code></pre><p>因为将 SSH 端口改到了 7022，所以要移除 ssh 服务（端口 22），开启端口 7022：</p>
<pre><code class="hljs dockerfile">firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --remove-service=ssh --permanent
</span>firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --add-port=7022/tcp --permanent
</span>
</code></pre><p>要应用这些更改，我们需要重新加载防火墙：</p>
<pre><code class="hljs dockerfile">firewall-<span class="hljs-keyword">cmd</span><span class="bash"> --reload
</span>
</code></pre><p>最后可以列出这些规则：</p>
<pre><code class="hljs yaml"><span class="hljs-comment"># firewall-cmd –list-all</span>
<span class="hljs-string">dmz</span>
<span class="hljs-attr">target:</span> <span class="hljs-string">default</span>
<span class="hljs-attr">icmp-block-inversion:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">interfaces:</span>
<span class="hljs-attr">sources:</span>
<span class="hljs-attr">services:</span> <span class="hljs-string">http</span> <span class="hljs-string">https</span> <span class="hljs-string">imap</span> <span class="hljs-string">imaps</span> <span class="hljs-string">pop3</span> <span class="hljs-string">pop3s</span> <span class="hljs-string">smtp</span> <span class="hljs-string">smtps</span>
<span class="hljs-attr">ports:</span> <span class="hljs-number">7022</span><span class="hljs-string">/tcp</span>
<span class="hljs-attr">protocols:</span>
<span class="hljs-attr">masquerade:</span> <span class="hljs-literal">no</span>
<span class="hljs-attr">forward-ports:</span>
<span class="hljs-attr">sourceports:</span>
<span class="hljs-attr">icmp-blocks:</span>
<span class="hljs-string">rich</span> <span class="hljs-attr">rules:</span>

</code></pre><hr>
<p>PS. 如果你喜欢这篇文章，请在下面留下一个回复。谢谢。</p>
<hr>
<p>via: <a href="https://www.rosehosting.com/blog/set-up-and-configure-a-firewall-with-firewalld-on-centos-7/">https://www.rosehosting.com/blog/set-up-and-configure-a-firewall-with-firewalld-on-centos-7/</a></p>
<p>译者简介：</p>
<p><a href="http://locez.com">Locez</a> 是一个喜欢技术，喜欢折腾的 Linuxer，靠着对 Linux 的兴趣自学了很多 Linux 相关的知识，并且志在于为 Linux 在中国普及出一份力。</p>
<p>作者：<a href="https://www.rosehosting.com/blog/set-up-and-configure-a-firewall-with-firewalld-on-centos-7/">rosehosting.com</a> 译者：<a href="https://github.com/locez">Locez</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CentOS 7 上的 FirewallD 简明指南

## 原文链接
[https://www.zcfy.cc/article/set-up-and-configure-a-firewall-with-firewalld-on-centos-7](https://www.zcfy.cc/article/set-up-and-configure-a-firewall-with-firewalld-on-centos-7)


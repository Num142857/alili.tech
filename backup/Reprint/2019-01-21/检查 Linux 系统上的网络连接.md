---
title: '检查 Linux 系统上的网络连接' 
date: 2019-01-21 2:30:06
hidden: true
slug: czh8ye12e3
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#检查-linux-系统上的网络连接"></a>检查 Linux 系统上的网络连接</h1>
<blockquote>
<p>Linux 系统提供了许多有用的命令来检查网络配置和连接。下面来看几个，包括 <code>ifquery</code>、<code>ifup</code>、<code>ifdown</code> 和 <code>ifconfig</code>。</p>
</blockquote>
<p>Linux 上有许多可用于查看网络设置和连接的命令。在今天的文章中，我们将会通过一些非常方便的命令来看看它们是如何工作的。</p>
<h3><a href="#ifquery-命令"></a>ifquery 命令</h3>
<p>一个非常有用的命令是 <code>ifquery</code>。这个命令应该会显示一个网络接口列表。但是，你可能只会看到类似这样的内容 - 仅显示回环接口：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ifquery --list</span>
lo

</code></pre><p>如果是这种情况，那说明你的 <code>/etc/network/interfaces</code> 不包括除了回环接口之外的网络接口信息。在下面的例子中，假设你使用 DHCP 来分配地址，且如果你希望它更有用的话，你可以添加例子最后的两行。</p>
<pre><code class="hljs vim"># interfaces(<span class="hljs-number">5</span>) <span class="hljs-keyword">file</span> used by ifup(<span class="hljs-number">8</span>) <span class="hljs-built_in">and</span> ifdown(<span class="hljs-number">8</span>)
auto <span class="hljs-keyword">lo</span>
iface <span class="hljs-keyword">lo</span> inet loopback
auto eth0
iface eth0 inet dhcp

</code></pre><h3><a href="#ifup-和-ifdown-命令"></a>ifup 和 ifdown 命令</h3>
<p>可以使用相关的 <code>ifup</code> 和 <code>ifdown</code> 命令来打开网络连接并根据需要将其关闭，只要该文件具有所需的描述性数据即可。请记住，“if” 在这里意思是接口interface，这与 <code>ifconfig</code> 命令中的一样，而不是如果我只有一个大脑if I only had a brain 中的 “if”。</p>
<h3><a href="#ifconfig-命令"></a>ifconfig 命令</h3>
<p>另外，<code>ifconfig</code> 命令完全不读取 <code>/etc/network/interfaces</code>，但是仍然提供了网络接口相当多的有用信息 —— 配置数据以及可以告诉你每个接口有多忙的数据包计数。<code>ifconfig</code> 命令也可用于关闭和重新启动网络接口（例如：<code>ifconfig eth0 down</code>）。</p>
<pre><code class="hljs groovy">$ ifconfig eth0
eth0      Link <span class="hljs-string">encap:</span>Ethernet  HWaddr <span class="hljs-number">00</span>:<span class="hljs-number">1</span><span class="hljs-string">e:</span><span class="hljs-number">4</span><span class="hljs-string">f:</span><span class="hljs-string">c8:</span><span class="hljs-number">43</span>:fc
          inet <span class="hljs-string">addr:</span><span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.6</span>  <span class="hljs-string">Bcast:</span><span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.255</span>  <span class="hljs-string">Mask:</span><span class="hljs-number">255.255</span><span class="hljs-number">.255</span><span class="hljs-number">.0</span>
          inet6 <span class="hljs-string">addr:</span> <span class="hljs-string">fe80:</span>:<span class="hljs-string">b44b:</span><span class="hljs-string">bdb6:</span><span class="hljs-number">2527</span>:<span class="hljs-number">6</span>ae9/<span class="hljs-number">64</span> <span class="hljs-string">Scope:</span>Link
          UP BROADCAST RUNNING MULTICAST  <span class="hljs-string">MTU:</span><span class="hljs-number">1500</span>  <span class="hljs-string">Metric:</span><span class="hljs-number">1</span>
          RX <span class="hljs-string">packets:</span><span class="hljs-number">60474</span> <span class="hljs-string">errors:</span><span class="hljs-number">0</span> <span class="hljs-string">dropped:</span><span class="hljs-number">0</span> <span class="hljs-string">overruns:</span><span class="hljs-number">0</span> <span class="hljs-string">frame:</span><span class="hljs-number">0</span>
          TX <span class="hljs-string">packets:</span><span class="hljs-number">33463</span> <span class="hljs-string">errors:</span><span class="hljs-number">0</span> <span class="hljs-string">dropped:</span><span class="hljs-number">0</span> <span class="hljs-string">overruns:</span><span class="hljs-number">0</span> <span class="hljs-string">carrier:</span><span class="hljs-number">0</span>
<span class="hljs-symbol">          collisions:</span><span class="hljs-number">0</span> <span class="hljs-string">txqueuelen:</span><span class="hljs-number">1000</span>
          RX <span class="hljs-string">bytes:</span><span class="hljs-number">43922053</span> (<span class="hljs-number">43.9</span> MB)  TX <span class="hljs-string">bytes:</span><span class="hljs-number">4000460</span> (<span class="hljs-number">4.0</span> MB)
<span class="hljs-symbol">          Interrupt:</span><span class="hljs-number">21</span> <span class="hljs-string">Memory:</span>fe9e0000-fea00000

</code></pre><p>输出中的 RX 和 TX 数据包计数很低。此外，没有报告错误或数据包冲突。或许可以用 <code>uptime</code> 命令确认此系统最近才重新启动。</p>
<p>上面显示的广播 （Bcast） 和网络掩码 （Mask） 地址表明系统运行在 C 类等效网络（默认）上，所以本地地址范围从 <code>192.168.0.1</code> 到 <code>192.168.0.254</code>。</p>
<h3><a href="#netstat-命令"></a>netstat 命令</h3>
<p><code>netstat</code> 命令提供有关路由和网络连接的信息。<code>netstat -rn</code> 命令显示系统的路由表。192.168.0.1 是本地网关 （Flags=UG)。</p>
<pre><code class="hljs lsl">$ netstat -rn
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>         <span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>     <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>         UG        <span class="hljs-number">0</span> <span class="hljs-number">0</span>          <span class="hljs-number">0</span> eth0
<span class="hljs-number">169.254</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>     <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>         <span class="hljs-number">255.255</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>     U         <span class="hljs-number">0</span> <span class="hljs-number">0</span>          <span class="hljs-number">0</span> eth0
<span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>     <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>         <span class="hljs-number">255.255</span><span class="hljs-number">.255</span><span class="hljs-number">.0</span>   U         <span class="hljs-number">0</span> <span class="hljs-number">0</span>          <span class="hljs-number">0</span> eth0

</code></pre><p>上面输出中的 <code>169.254.0.0</code> 条目仅在你正在使用或计划使用本地链路通信时才有必要。如果不是这样的话，你可以在 <code>/etc/network/if-up.d/avahi-autoipd</code> 中注释掉相关的行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tail -12 /etc/network/<span class="hljs-keyword">if</span>-up.d/avahi-autoipd</span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-keyword">if</span> [ -x /bin/ip ]; <span class="hljs-keyword">then</span></span>
<span class="hljs-meta">#</span><span class="bash">       <span class="hljs-comment"># route already present?</span></span>
<span class="hljs-meta">#</span><span class="bash">       ip route show | grep -q <span class="hljs-string">'^169.254.0.0/16[[:space:]]'</span> &amp;&amp; <span class="hljs-built_in">exit</span> 0</span>
<span class="hljs-meta">#</span><span class="bash"></span>
<span class="hljs-meta">#</span><span class="bash">       /bin/ip route add 169.254.0.0/16 dev <span class="hljs-variable">$IFACE</span> metric 1000 scope link</span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-keyword">elif</span> [ -x /sbin/route ]; <span class="hljs-keyword">then</span></span>
<span class="hljs-meta">#</span><span class="bash">       <span class="hljs-comment"># route already present?</span></span>
<span class="hljs-meta">#</span><span class="bash">       /sbin/route -n | egrep -q <span class="hljs-string">"^169.254.0.0[[:space:]]"</span> &amp;&amp; <span class="hljs-built_in">exit</span> 0</span>
<span class="hljs-meta">#</span><span class="bash"></span>
<span class="hljs-meta">#</span><span class="bash">       /sbin/route add -net 169.254.0.0 netmask 255.255.0.0 dev <span class="hljs-variable">$IFACE</span> metric 1000</span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-keyword">fi</span></span>

</code></pre><h3><a href="#netstat--a-命令"></a>netstat -a 命令</h3>
<p><code>netstat -a</code> 命令将显示“所有”网络连接。为了将其限制为显示正在监听和已建立的连接（通常更有用），请改用 <code>netstat -at</code> 命令。</p>
<pre><code class="hljs routeros">$ netstat -at
Active Internet connections (servers <span class="hljs-keyword">and</span> established)
Proto Recv-Q Send-Q Local<span class="hljs-built_in"> Address </span>          Foreign<span class="hljs-built_in"> Address </span>        State
tcp        0      0 *:ssh                   *:*                     LISTEN
tcp        0      0 localhost:ipp           *:*                     LISTEN
tcp        0      0 localhost:smtp          *:*                     LISTEN
tcp        0    256 192.168.0.6:ssh         192.168.0.32:53550      ESTABLISHED
tcp6       0      0 [::]:http               [::]:*                  LISTEN
tcp6       0      0 [::]:ssh                [::]:*                  LISTEN
tcp6       0      0 ip6-localhost:ipp       [::]:*                  LISTEN
tcp6       0      0 ip6-localhost:smtp      [::]:*                  LISTEN

</code></pre><h3><a href="#host-命令"></a>host 命令</h3>
<p><code>host</code> 命令就像 <code>nslookup</code> 一样，用来查询远程系统的 IP 地址，但是还提供系统的邮箱处理地址。</p>
<pre><code class="hljs stylus">$ host world<span class="hljs-selector-class">.std</span><span class="hljs-selector-class">.com</span>
world<span class="hljs-selector-class">.std</span><span class="hljs-selector-class">.com</span> has <span class="hljs-selector-tag">address</span> <span class="hljs-number">192.74</span>.<span class="hljs-number">137.5</span>
world<span class="hljs-selector-class">.std</span><span class="hljs-selector-class">.com</span> mail is handled by <span class="hljs-number">10</span> smtp<span class="hljs-selector-class">.theworld</span><span class="hljs-selector-class">.com</span>.

</code></pre><h3><a href="#nslookup-命令"></a>nslookup 命令</h3>
<p><code>nslookup</code> 还提供系统中（本例中是本地系统）提供 DNS 查询服务的信息。</p>
<pre><code class="hljs stylus">$ nslookup world<span class="hljs-selector-class">.std</span><span class="hljs-selector-class">.com</span>
Server:         <span class="hljs-number">127.0</span>.<span class="hljs-number">1.1</span>
Address:        <span class="hljs-number">127.0</span>.<span class="hljs-number">1.1</span>#<span class="hljs-number">53</span>

Non-authoritative answer:
Name:   world<span class="hljs-selector-class">.std</span><span class="hljs-selector-class">.com</span>
Address: <span class="hljs-number">192.74</span>.<span class="hljs-number">137.5</span>

</code></pre><h3><a href="#dig-命令"></a>dig 命令</h3>
<p><code>dig</code> 命令提供了很多有关连接到远程系统的信息 - 包括与我们通信的名称服务器以及查询需要多长时间进行响应，并经常用于故障排除。</p>
<pre><code class="hljs yaml"><span class="hljs-string">$</span> <span class="hljs-string">dig</span> <span class="hljs-string">world.std.com</span>

<span class="hljs-string">;</span> <span class="hljs-string">&lt;&lt;&gt;&gt;</span> <span class="hljs-string">DiG</span> <span class="hljs-number">9.10</span><span class="hljs-number">.3</span><span class="hljs-bullet">-P4-Ubuntu</span> <span class="hljs-string">&lt;&lt;&gt;&gt;</span> <span class="hljs-string">world.std.com</span>
<span class="hljs-string">;;</span> <span class="hljs-string">global</span> <span class="hljs-attr">options:</span> <span class="hljs-string">+cmd</span>
<span class="hljs-string">;;</span> <span class="hljs-string">Got</span> <span class="hljs-attr">answer:</span>
<span class="hljs-string">;;</span> <span class="hljs-bullet">-&gt;&gt;HEADER&lt;&lt;-</span> <span class="hljs-attr">opcode:</span> <span class="hljs-string">QUERY,</span> <span class="hljs-attr">status:</span> <span class="hljs-string">NOERROR,</span> <span class="hljs-attr">id:</span> <span class="hljs-number">28679</span>
<span class="hljs-string">;;</span> <span class="hljs-attr">flags:</span> <span class="hljs-string">qr</span> <span class="hljs-string">rd</span> <span class="hljs-string">ra;</span> <span class="hljs-attr">QUERY:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">ANSWER:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">AUTHORITY:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">ADDITIONAL:</span> <span class="hljs-number">1</span>

<span class="hljs-string">;;</span> <span class="hljs-string">OPT</span> <span class="hljs-attr">PSEUDOSECTION:</span>
<span class="hljs-string">;</span> <span class="hljs-attr">EDNS:</span> <span class="hljs-attr">version:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">flags:;</span> <span class="hljs-attr">udp:</span> <span class="hljs-number">512</span>
<span class="hljs-string">;;</span> <span class="hljs-string">QUESTION</span> <span class="hljs-attr">SECTION:</span>
<span class="hljs-string">;world.std.com.</span>                 <span class="hljs-string">IN</span>      <span class="hljs-string">A</span>

<span class="hljs-string">;;</span> <span class="hljs-string">ANSWER</span> <span class="hljs-attr">SECTION:</span>
<span class="hljs-string">world.std.com.</span>          <span class="hljs-number">78146</span>   <span class="hljs-string">IN</span>      <span class="hljs-string">A</span>       <span class="hljs-number">192.74</span><span class="hljs-number">.137</span><span class="hljs-number">.5</span>

<span class="hljs-string">;;</span> <span class="hljs-string">Query</span> <span class="hljs-attr">time:</span> <span class="hljs-number">37</span> <span class="hljs-string">msec</span>
<span class="hljs-string">;;</span> <span class="hljs-attr">SERVER:</span> <span class="hljs-number">127.0</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-comment">#53(127.0.1.1)</span>
<span class="hljs-string">;;</span> <span class="hljs-attr">WHEN:</span> <span class="hljs-string">Mon</span> <span class="hljs-string">Oct</span> <span class="hljs-number">09</span> <span class="hljs-number">13</span><span class="hljs-string">:26:46</span> <span class="hljs-string">EDT</span> <span class="hljs-number">2017</span>
<span class="hljs-string">;;</span> <span class="hljs-string">MSG</span> <span class="hljs-string">SIZE</span>  <span class="hljs-attr">rcvd:</span> <span class="hljs-number">58</span>

</code></pre><h3><a href="#nmap-命令"></a>nmap 命令</h3>
<p><code>nmap</code> 经常用于探查远程系统，但是同样也用于报告本地系统提供的服务。在下面的输出中，我们可以看到登录可以使用 ssh、smtp 用于电子邮箱、web 站点也是启用的，并且 ipp 打印服务正在运行。</p>
<pre><code class="hljs vim">$ <span class="hljs-keyword">nmap</span> localhost

Starting Nmap <span class="hljs-number">7.01</span> ( http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">nmap</span>.org ) at <span class="hljs-number">2017</span>-<span class="hljs-number">10</span>-<span class="hljs-number">09</span> <span class="hljs-number">15</span>:<span class="hljs-number">01</span> EDT
Nmap scan report <span class="hljs-keyword">for</span> localhost (<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>)
Host <span class="hljs-keyword">is</span> <span class="hljs-keyword">up</span> (<span class="hljs-number">0.00016</span>s latency).
Not shown: <span class="hljs-number">996</span> closed ports
PORT    STATE SERVICE
<span class="hljs-number">22</span>/tcp  <span class="hljs-keyword">open</span>  ssh
<span class="hljs-number">25</span>/tcp  <span class="hljs-keyword">open</span>  smtp
<span class="hljs-number">80</span>/tcp  <span class="hljs-keyword">open</span>  http
<span class="hljs-number">631</span>/tcp <span class="hljs-keyword">open</span>  ipp

Nmap done: <span class="hljs-number">1</span> IP address (<span class="hljs-number">1</span> host <span class="hljs-keyword">up</span>) scanned in <span class="hljs-number">0.09</span> seconds

</code></pre><p>Linux 系统提供了很多有用的命令用于查看网络配置和连接。如果你都探索完了，请记住 <code>apropos network</code> 或许会让你了解更多。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3230519/linux/examining-network-connections-on-linux-systems.html">https://www.networkworld.com/article/3230519/linux/examining-network-connections-on-linux-systems.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
检查 Linux 系统上的网络连接

## 原文链接
[https://www.zcfy.cc/article/examining-network-connections-on-linux-systems](https://www.zcfy.cc/article/examining-network-connections-on-linux-systems)


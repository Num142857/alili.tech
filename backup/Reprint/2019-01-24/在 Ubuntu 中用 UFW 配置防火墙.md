---
title: '在 Ubuntu 中用 UFW 配置防火墙' 
date: 2019-01-24 2:30:11
hidden: true
slug: witof9hdksk
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-ubuntu-中用-ufw-配置防火墙"></a>在 Ubuntu 中用 UFW 配置防火墙</h1>
<p>UFW，即简单防火墙（uncomplicated firewall），是一个 Arch Linux、Debian 或 Ubuntu 中管理防火墙规则的前端。 UFW 通过命令行使用（尽管它有可用的 GUI），它的目的是使防火墙配置简单（即不复杂（uncomplicated））。</p>
<p><a href="https://camo.githubusercontent.com/1d2cde63b145a80432b06787dcf0eb6f605e93d6/68747470733a2f2f7777772e6c696e6f64652e636f6d2f646f63732f6173736574732f7566775f74672e706e67"><img src="https://camo.githubusercontent.com/1d2cde63b145a80432b06787dcf0eb6f605e93d6/68747470733a2f2f7777772e6c696e6f64652e636f6d2f646f63732f6173736574732f7566775f74672e706e67" alt="How to Configure a Firewall with UFW" title="How to Configure a Firewall with UFW"></a></p>
<h3><a href="#开始之前"></a>开始之前</h3>
<p>1、 熟悉我们的<a href="https://www.linode.com/docs/getting-started">入门</a>指南，并完成设置服务器主机名和时区的步骤。</p>
<p>2、 本指南将尽可能使用 <code>sudo</code>。 在完成<a href="https://www.linode.com/docs/security/securing-your-server">保护你的服务器</a>指南的章节，创建一个标准用户帐户，强化 SSH 访问和移除不必要的网络服务。 <strong>但不要</strong>跟着创建防火墙部分 - 本指南是介绍使用 UFW 的，它对于 iptables 而言是另外一种控制防火墙的方法。</p>
<p>3、 更新系统</p>
<p><strong>Arch Linux</strong></p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo pacman -Syu</span>

</code></pre><p><strong>Debian / Ubuntu</strong></p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> update &amp;&amp; sudo apt-<span class="hljs-builtin-name">get</span><span class="hljs-built_in"> upgrade
</span>
</code></pre><h3><a href="#安装-ufw"></a>安装 UFW</h3>
<p>UFW 默认包含在 Ubuntu 中，但在 Arch 和 Debian 中需要安装。 Debian 将自动启用 UFW 的 systemd 单元，并使其在重新启动时启动，但 Arch 不会。 这与告诉 UFW 启用防火墙规则不同，因为使用 systemd 或者 upstart 启用 UFW 仅仅是告知 init 系统打开 UFW 守护程序。</p>
<p>默认情况下，UFW 的规则集为空，因此即使守护程序正在运行，也不会强制执行任何防火墙规则。 强制执行防火墙规则集的部分<a href="http://localhost:4567/docs/security/firewalls/configure-firewall-with-ufw#enable-the-firewall">在下面</a>。</p>
<h4><a href="#arch-linux"></a>Arch Linux</h4>
<p>1、 安装 UFW：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo pacman -S ufw</span>

</code></pre><p>2、 启动并启用 UFW 的 systemd 单元：</p>
<pre><code class="hljs routeros">sudo systemctl start ufw
sudo systemctl <span class="hljs-builtin-name">enable</span> ufw

</code></pre><h4><a href="#debian--ubuntu"></a>Debian / Ubuntu</h4>
<p>1、 安装 UFW</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install ufw

</code></pre><h3><a href="#使用-ufw-管理防火墙规则"></a>使用 UFW 管理防火墙规则</h3>
<h4><a href="#设置默认规则"></a>设置默认规则</h4>
<p>大多数系统只需要打开少量的端口接受传入连接，并且关闭所有剩余的端口。 从一个简单的规则基础开始，<code>ufw default</code>命令可以用于设置对传入和传出连接的默认响应动作。 要拒绝所有传入并允许所有传出连接，那么运行：</p>
<pre><code class="hljs routeros">sudo ufw<span class="hljs-built_in"> default </span>allow outgoing
sudo ufw<span class="hljs-built_in"> default </span>deny<span class="hljs-built_in"> incoming
</span>
</code></pre><p><code>ufw default</code> 也允许使用 <code>reject</code> 参数。</p>
<blockquote>
<p>警告：</p>
</blockquote>
<blockquote>
<p>除非明确设置允许规则，否则配置默认 <code>deny</code> 或 <code>reject</code> 规则会锁定你的服务器。确保在应用默认 <code>deny</code> 或 <code>reject</code> 规则之前，已按照下面的部分配置了 SSH 和其他关键服务的允许规则。</p>
</blockquote>
<h4><a href="#添加规则"></a>添加规则</h4>
<p>可以有两种方式添加规则：用<strong>端口号</strong>或者<strong>服务名</strong>表示。</p>
<p>要允许 SSH 的 22 端口的传入和传出连接，你可以运行：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo ufw allow ssh</span>

</code></pre><p>你也可以运行：</p>
<pre><code class="hljs lsl">sudo ufw allow <span class="hljs-number">22</span>

</code></pre><p>相似的，要在特定端口（比如 111）上 <code>deny</code> 流量，你需要运行：</p>
<pre><code class="hljs crmsh">sudo ufw <span class="hljs-keyword">deny</span> <span class="hljs-number">111</span>

</code></pre><p>为了更好地调整你的规则，你也可以允许基于 TCP 或者 UDP 的包。下面例子会允许 80 端口的 TCP 包：</p>
<pre><code class="hljs livecodeserver">sudo ufw allow <span class="hljs-number">80</span>/tcp
sudo ufw allow <span class="hljs-keyword">http</span>/tcp

</code></pre><p>这个会允许 1725 端口上的 UDP 包：</p>
<pre><code class="hljs lsl">sudo ufw allow <span class="hljs-number">1725</span>/udp

</code></pre><h4><a href="#高级规则"></a>高级规则</h4>
<p>除了基于端口的允许或阻止，UFW 还允许您按照 IP 地址、子网和 IP 地址/子网/端口的组合来允许/阻止。</p>
<p>允许从一个 IP 地址连接：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">sudo</span> <span class="hljs-selector-tag">ufw</span> <span class="hljs-selector-tag">allow</span> <span class="hljs-selector-tag">from</span> 123<span class="hljs-selector-class">.45</span><span class="hljs-selector-class">.67</span><span class="hljs-selector-class">.89</span>

</code></pre><p>允许特定子网的连接：</p>
<pre><code class="hljs lsl">sudo ufw allow from <span class="hljs-number">123.45</span><span class="hljs-number">.67</span><span class="hljs-number">.89</span>/<span class="hljs-number">24</span>

</code></pre><p>允许特定 IP/ 端口的组合：</p>
<pre><code class="hljs routeros">sudo ufw allow <span class="hljs-keyword">from</span> 123.45.67.89 <span class="hljs-keyword">to</span> any<span class="hljs-built_in"> port </span>22 proto tcp

</code></pre><p><code>proto tcp</code> 可以删除或者根据你的需求改成 <code>proto udp</code>，所有例子的 <code>allow</code> 都可以根据需要变成 <code>deny</code>。</p>
<h4><a href="#删除规则"></a>删除规则</h4>
<p>要删除一条规则，在规则的前面加上 <code>delete</code>。如果你希望不再允许 HTTP 流量，你可以运行：</p>
<pre><code class="hljs sql">sudo ufw <span class="hljs-keyword">delete</span> <span class="hljs-keyword">allow</span> <span class="hljs-number">80</span>

</code></pre><p>删除规则同样可以使用服务名。</p>
<h3><a href="#编辑-ufw-的配置文件"></a>编辑 UFW 的配置文件</h3>
<p>虽然可以通过命令行添加简单的规则，但仍有可能需要添加或删除更高级或特定的规则。 在运行通过终端输入的规则之前，UFW 将运行一个文件 <code>before.rules</code>，它允许回环接口、ping 和 DHCP 等服务。要添加或改变这些规则，编辑 <code>/etc/ufw/before.rules</code> 这个文件。 同一目录中的 <code>before6.rules</code> 文件用于 IPv6 。</p>
<p>还存在一个 <code>after.rule</code> 和 <code>after6.rule</code> 文件，用于添加在 UFW 运行你通过命令行输入的规则之后需要添加的任何规则。</p>
<p>还有一个配置文件位于 <code>/etc/default/ufw</code>。 从此处可以禁用或启用 IPv6，可以设置默认规则，并可以设置 UFW 以管理内置防火墙链。</p>
<h3><a href="#ufw-状态"></a>UFW 状态</h3>
<p>你可以在任何时候使用命令：<code>sudo ufw status</code> 查看 UFW 的状态。这会显示所有规则列表，以及 UFW 是否处于激活状态：</p>
<pre><code class="hljs http"><span class="hljs-attribute">Status</span>: active

<span class="lisp">To                         Action      From
--                         ------      ----
<span class="hljs-number">22</span>                         ALLOW       Anywhere
<span class="hljs-number">80</span>/tcp                     ALLOW       Anywhere
<span class="hljs-number">443</span>                        ALLOW       Anywhere
<span class="hljs-number">22</span> (<span class="hljs-name">v6</span>)                    ALLOW       Anywhere (<span class="hljs-name">v6</span>)
<span class="hljs-number">80</span>/tcp (<span class="hljs-name">v6</span>)                ALLOW       Anywhere (<span class="hljs-name">v6</span>)
<span class="hljs-number">443</span> (<span class="hljs-name">v6</span>)                   ALLOW       Anywhere (<span class="hljs-name">v6</span>)

</span></code></pre><h3><a href="#启用防火墙"></a>启用防火墙</h3>
<p>随着你选择规则完成，你初始运行 <code>ufw status</code> 可能会输出 <code>Status: inactive</code>。 启用 UFW 并强制执行防火墙规则：</p>
<pre><code class="hljs routeros">sudo ufw <span class="hljs-builtin-name">enable</span>

</code></pre><p>相似地，禁用 UFW 规则：</p>
<pre><code class="hljs routeros">sudo ufw <span class="hljs-builtin-name">disable</span>

</code></pre><blockquote>
<p>UFW 会继续运行，并且在下次启动时会再次启动。</p>
</blockquote>
<h3><a href="#日志记录"></a>日志记录</h3>
<p>你可以用下面的命令启动日志记录：</p>
<pre><code class="hljs routeros">sudo ufw<span class="hljs-built_in"> logging </span>on

</code></pre><p>可以通过运行 <code>sudo ufw logging low|medium|high</code> 设计日志级别，可以选择 <code>low</code>、 <code>medium</code> 或者 <code>high</code>。默认级别是 <code>low</code>。</p>
<p>常规日志类似于下面这样，位于 <code>/var/logs/ufw</code>：</p>
<pre><code class="hljs routeros">Sep 16 15:08:14 &lt;hostname&gt; kernel: [UFW BLOCK] <span class="hljs-attribute">IN</span>=eth0 OUT= <span class="hljs-attribute">MAC</span>=00:00:00:00:00:00:00:00:00:00:00:00:00:00 <span class="hljs-attribute">SRC</span>=123.45.67.89 <span class="hljs-attribute">DST</span>=987.65.43.21 <span class="hljs-attribute">LEN</span>=40 <span class="hljs-attribute">TOS</span>=0x00 <span class="hljs-attribute">PREC</span>=0x00 <span class="hljs-attribute">TTL</span>=249 <span class="hljs-attribute">ID</span>=8475 <span class="hljs-attribute">PROTO</span>=TCP <span class="hljs-attribute">SPT</span>=48247 <span class="hljs-attribute">DPT</span>=22 <span class="hljs-attribute">WINDOW</span>=1024 <span class="hljs-attribute">RES</span>=0x00 SYN <span class="hljs-attribute">URGP</span>=0

</code></pre><p>前面的值列出了你的服务器的日期、时间、主机名。剩下的重要信息包括：</p>
<ul>
<li><strong>[UFW BLOCK]</strong>：这是记录事件的描述开始的位置。在此例中，它表示阻止了连接。</li>
<li><strong>IN</strong>：如果它包含一个值，那么代表该事件是传入事件</li>
<li><strong>OUT</strong>：如果它包含一个值，那么代表事件是传出事件</li>
<li><strong>MAC</strong>：目的地和源 MAC 地址的组合</li>
<li><strong>SRC</strong>：包源的 IP</li>
<li><strong>DST</strong>：包目的地的 IP</li>
<li><strong>LEN</strong>：数据包长度</li>
<li><strong>TTL</strong>：数据包 TTL，或称为 time to live。 在找到目的地之前，它将在路由器之间跳跃，直到它过期。</li>
<li><strong>PROTO</strong>：数据包的协议</li>
<li><strong>SPT</strong>：包的源端口</li>
<li><strong>DPT</strong>：包的目标端口</li>
<li><strong>WINDOW</strong>：发送方可以接收的数据包的大小</li>
<li><strong>SYN URGP</strong>：指示是否需要三次握手。 <code>0</code> 表示不需要。</li>
</ul>
<hr>
<p>via: <a href="https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw">https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw</a></p>
<p>作者：<a href="https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw">Linode</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Ubuntu 中用 UFW 配置防火墙

## 原文链接
[https://www.zcfy.cc/article/how-to-configure-a-firewall-with-ufw](https://www.zcfy.cc/article/how-to-configure-a-firewall-with-ufw)


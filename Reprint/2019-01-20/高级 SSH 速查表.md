---
title: '高级 SSH 速查表' 
date: 2019-01-20 2:30:11
hidden: true
slug: 778iaozprkj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#高级-ssh-速查表"></a>高级 SSH 速查表</h1>
<p>所有人都知道 SSH 是一种远程登录工具，然而它也有许多其他用途。</p>
<p>创建一个 SOCKS 代理来浏览网页（也就是翻墙啦）：</p>
<p>ssh -D &lt;remote_host&gt;</p>
<pre><code class="hljs shell"><span class="hljs-meta">&gt;</span><span class="bash"> 设置 `localhost:&lt;port&gt;` 作为你浏览器的代理</span>

连接一个堡垒机后的 Windows RDP 主机：
<span class="hljs-meta">
&gt;</span><span class="bash"></span>
</code></pre><p>ssh -L &lt;port&gt;:&lt;target_host&gt;:3389 &lt;bastion_server&gt; </p>
<pre><code class="hljs vim">
&gt; 让你的 RDP 客户端连接到 `localhos<span class="hljs-variable">t:</span><span class="hljs-symbol">&lt;port&gt;</span>`

在不使用 VNC 端口的情况下，连接远程 VNC 主机：

ssh -L <span class="hljs-number">5901</span>:localhos<span class="hljs-variable">t:5901</span> <span class="hljs-symbol">&lt;remote_host&gt;</span>

</code></pre><blockquote>
<p>让你的 VNC 客户端连接到 <code>localhost:5901</code> </p>
</blockquote>
<p>按照这个思路，你可以映射任意端口：LDAP (389)、631 (CUPS)、8080 (替代的 HTTP)，等等。</p>
<p>产生一个新的 SSH 密钥对：</p>
<blockquote>
<p><code>`</code>
ssh-keygen</p>
</blockquote>
<pre><code class="hljs stylus">
更新密钥对的密码：

ssh-keygen -<span class="hljs-selector-tag">p</span>

</code></pre><p>把公钥复制到远程主机上：</p>
<blockquote>
<p><code>`</code>
ssh-copy-id -i &lt;identity file&gt; &lt;remote_host&gt;</p>
</blockquote>
<pre><code class="hljs routeros">
SSH 有一堆命令行选项，但是如果有一些是你经常使用的，你可以为它们在 SSH 配置文件 (<span class="hljs-variable">${HOME}</span>/.ssh/config) 里创建一个入口。比如：

host myhouse<span class="hljs-built_in"> User </span>itsme    HostName house.example.com

</code></pre><p>那么你就可以输入 <code>ssh myhouse</code> 来代替 <code>ssh itsme@house.example.com</code>。 </p>
<p>以下是常用的命令行选项和他们的配置文件写法。一些是常用的简化写法。请查看 <code>ssh(1)</code> 和 <code>ssh_config(5)</code> 的手册页来获取详尽信息。</p>
<table>
<thead>
<tr>
<th>命令行</th>
<th>配置文件</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-l &lt;login name&gt;</code></td>
<td><code>User &lt;login name&gt;</code></td>
<td>远程主机的登录用户名。</td>
</tr>
<tr>
<td><code>-i &lt;identity file&gt;</code></td>
<td><code>IdentityFile &lt;identity file&gt;</code></td>
<td>指定要使用的鉴权文件（SSH 密码对）。</td>
</tr>
<tr>
<td><code>-p &lt;remote port&gt;</code></td>
<td><code>Port &lt;remote port&gt;</code></td>
<td>远程 SSH 守护进程监听的端口号。 (默认为 22)</td>
</tr>
<tr>
<td><code>-C</code></td>
<td><code>Compression &lt;yes,no&gt;</code></td>
<td>压缩往来信息。 (默认为 no)</td>
</tr>
<tr>
<td><code>-D &lt;port&gt;</code></td>
<td><code>DynamicForward &lt;port&gt;</code></td>
<td>把本地端口的报文转发到远程主机。</td>
</tr>
<tr>
<td><code>-X</code></td>
<td><code>ForwardX11 &lt;yes,no&gt;</code></td>
<td>把 X11 的图像数据转发到远程主机的端口. (默认为 no)</td>
</tr>
<tr>
<td><code>-A</code></td>
<td><code>ForwardAgent &lt;yes,no&gt;</code></td>
<td>把授权代理的报文转发给远程主机。如果你使用第三方主机登录，这个功能将很有用。 (默认为 no)</td>
</tr>
<tr>
<td><code>-4</code>（仅使用 IPv4） <code>-6</code> （仅使用 IPv6）</td>
<td><code>AddressFamily &lt;any,inet4,inet6&gt;</code></td>
<td>指定仅使用 IPv4 或者 IPv6。</td>
</tr>
<tr>
<td><code>-L &lt;local port&gt;:&lt;target host&gt;:&lt;target port&gt;</code></td>
<td><code>LocalForward &lt;local port&gt;:&lt;target host&gt;:&lt;target port&gt;</code></td>
<td>把本地主机指定端口的报文转发到远程主机的某个端口。</td>
</tr>
</tbody>
</table>
<p>opensource.com Twitter @opensourceway  |  facebook.com/opensourceway  |  IRC: #opensource.com on Freenode</p>
<hr>
<p>作者简介：</p>
<p>Ben Cotton 是业余的气象学家和职业的高性能计算工程师。Ben 是微软 Azure 的产品营销经理，专注于高性能计算。他是一个 Fedora 用户和贡献者，共同创立了一个当地的开放源码群，并且是开源促进会的成员和保护自由软件的支持者。通过以下方式联系他 Twitter (@FunnelFiasco) 或者 FunnelFiasco.com.</p>
<hr>
<p>via: <a href="https://opensource.com/sites/default/files/gated-content/cheat_sheet_ssh_v03.pdf">https://opensource.com/sites/default/files/gated-content/cheat_sheet_ssh_v03.pdf</a></p>
<p>作者：<a href="https://opensource.com/users/bcotton">BEN COTTON</a>
译者：<a href="https://github.com/kennethXia">kennethXia</a>
校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>
<p><code>`</code></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 SSH 速查表

## 原文链接
[https://www.zcfy.cc/article/advanced-ssh-cheat-sheet](https://www.zcfy.cc/article/advanced-ssh-cheat-sheet)


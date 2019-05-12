---
title: 'SSH 协议端口号 22 背后的故事' 
date: 2019-01-23 2:30:08
hidden: true
slug: ys5dklv7ll
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ssh-协议端口号-22-背后的故事"></a>SSH 协议端口号 22 背后的故事</h1>
<p>为什么 <a href="https://www.ssh.com/ssh/">SSH</a>（安全终端）的端口号是 22 呢，这不是一个巧合，这其中有个我（<a href="https://www.ssh.com/people/tatu-ylonen">Tatu Ylonen</a>，SSH 协议的设计者）未曾诉说的故事。</p>
<h3><a href="#将-ssh-协议端口号设为-22-的故事"></a>将 SSH 协议端口号设为 22 的故事</h3>
<p>1995 年春我编写了 SSH 协议的最初版本，那时候 <a href="https://www.ssh.com/ssh/telnet">telnet</a> 和 <a href="https://www.ssh.com/ssh/ftp/">FTP</a> 正被广泛使用。</p>
<p>当时我设计 SSH 协议想着是为了替代 <code>telnet</code>（端口 23）和 <code>ftp</code>（端口21）两个协议的，而端口 22 是空闲的。我想当然地就选择了夹在 <code>telnet</code> 和 <code>ftp</code> 的端口中间的数字。我觉得端口号虽然是个小事但似乎又存在着某种信念。但我到底要怎么拿到那个端口号呢？我未曾拥有过任何一个端口号，但我却认识几个拥有端口号的人！</p>
<p>在那时取得端口号的事情其实说来挺简单的。毕竟当时的因特网（Internet）并不是很大，是因特网爆炸的早期。端口号分配的活儿是 IANA（Internet Assigned Numbers Authority，互联网数字分配机构）干的。在那时这机构可相当于是因特网先驱 <a href="https://en.wikipedia.org/wiki/Jon_Postel">Jon Postel</a> 和 <a href="https://en.wikipedia.org/wiki/Joyce_K._Reynolds">Joyce K. Reynolds</a> 一般的存在。Jon 参与编写了多项主要的协议标准，例如 IP（RFC 791）、ICMP（RFC 792）和 TCP（RFC 793）等一些你应该早有耳闻的协议。</p>
<p>我可以说是敬畏 Jon 先生的，他参与编写了几乎所有主要的因特网标准文档（Internet RFC）！</p>
<p>1995 年 7 月，就在我发布 <code>ssh-1.0</code> 前，我发送了一封邮件给 IANA：</p>
<pre><code class="hljs dts">From ylo Mon Jul <span class="hljs-number">10</span> <span class="hljs-number">11</span>:<span class="hljs-number">45</span>:<span class="hljs-number">48</span> +<span class="hljs-number">0300</span> <span class="hljs-number">1995</span>
<span class="hljs-symbol">From:</span> Tatu Ylonen <span class="hljs-params">&lt;ylo@cs.hut.fi&gt;</span>
<span class="hljs-symbol">To:</span> Internet Assigned Numbers Authority <span class="hljs-params">&lt;iana@isi.edu&gt;</span>
<span class="hljs-symbol">Subject:</span> 请求取得一个端口号
<span class="hljs-symbol">Organization:</span> 芬兰赫尔辛基理工大学

亲爱的机构成员：

我写了个可以在不安全的网络环境中安全地从一台机器登录到另一台机器的程序。它主要是对现有的
telnet 协议以及 rlogin 协议的功能性提升和安全性改进。说的具体些，就是可以防御 IP、DNS 
或路由等欺骗行为。我打算将我的软件免费地发布在因特网上，以得到广泛地使用。

我希望为该软件注册一个特权端口号，要是这个端口号在 <span class="hljs-number">1</span> 到 <span class="hljs-number">255</span> 之间就更好了，这样它就可以用
在名字服务器的 WKS 字段中了。

我在附件中附上了协议标准的草案。这个软件已经在本地运行了几个月了，我已准备在获得端口号后
就发布。如果端口号分配一事安排的及时，我希望这周就将要发布的软件准备好。我目前在 beta 版
测试时使用的端口号是 <span class="hljs-number">22</span>，如果要是能够分配到这个端口，我就不用做什么更改了（目前这个端口在
列表中还是空闲的）。

软件中服务的名称叫 `ssh`（系 Secure Shell 的缩写）。

您最真诚的，

Tatu Ylonen <span class="hljs-params">&lt;ylo@cs.hut.fi&gt;</span>

... 附件：ssh<span class="hljs-number">-1.0</span> 协议标准

</code></pre><p>（LCTT 译注：DNS 协议中的 WKS 记录类型意即“众所周知的业务描述”，是类似于 A、MX 这样的 DNS 记录类型，用于描述某个 IP 所提供的服务，目前鲜见使用。参见： <a href="https://docs.oracle.com/cd/E19683-01/806-4077/dnsintro-154/index.html">https://docs.oracle.com/cd/E19683-01/806-4077/dnsintro-154/index.html</a> 。）</p>
<p>第二天，我就收到了 Joyce 发来的邮件：</p>
<pre><code class="hljs less"><span class="hljs-attribute">Date</span>: Mon, <span class="hljs-number">10</span> Jul <span class="hljs-number">1995</span> <span class="hljs-number">15</span>:<span class="hljs-number">35</span>:<span class="hljs-number">33</span> -<span class="hljs-number">0700</span>
<span class="hljs-attribute">From</span>: jkrey<span class="hljs-variable">@ISI</span>.EDU
<span class="hljs-attribute">To</span>: ylo<span class="hljs-variable">@cs</span>.hut.fi
<span class="hljs-attribute">Subject</span>: 回复：请求取得一个端口号
<span class="hljs-attribute">Cc</span>: iana<span class="hljs-variable">@ISI</span>.EDU

Tatu,

我们将端口号 <span class="hljs-number">22</span> 分配给 ssh 服务了，你目前是该服务的主要联系人。

Joyce

</code></pre><p>这就搞定了！SSH 的端口正式使用 22！！！</p>
<p>1995 年 7 月 12 日上午 2 点 21 分，我给我在赫尔辛基理工大学的测试者们宣布了 SSH 的最后 beta 版本。当日下午 5 点 23 分，我给测试者们宣布了 ssh-1.0.0 版本。1995 年 7 月 12 日，下午 5 点 51 分，我将一份 SSH（安全终端）的宣告发给了 <a href="mailto:`cypherpunks@toad.com">`cypherpunks@toad.com</a>` 的邮件列表，此外我还将其发给了一些新闻组、邮件列表和一些在因特网上讨论相关话题的人们。</p>
<h3><a href="#如何更改-ssh-服务的端口号"></a>如何更改 SSH 服务的端口号</h3>
<p>SSH 服务器是默认运行在 22 号端口上的。然而，由于某些原因需要，它也可以运行在别的端口上。比如为了方便测试使用，又比如在同一个宿主机上运行多个不同的配置。当然，极少情况下，不使用 root 权限运行它也可以，比如某些必须运行在非特权的端口的情况（端口号大于等于 1024）。</p>
<p>端口号可以在配置文件 <a href="https://www.ssh.com/ssh/sshd_config/">/etc/ssh/sshd_config</a> 中将 <code>Port 22</code> 更改。也可以使用 <code>-p &lt;port&gt;</code> 选项运行 <a href="https://www.ssh.com/ssh/sshd/">sshd</a>。SSH 客户端和 <a href="https://www.ssh.com/ssh/sftp/">sftp</a> 程序也可以使用 <code>-p &lt;port&gt;</code> 选项。</p>
<h3><a href="#配置-ssh-协议穿越防火墙"></a>配置 SSH 协议穿越防火墙</h3>
<p>SSH 是少数通常被许可穿越防火墙的协议之一。通常的做法是不限制出站的 SSH 连接，尤其常见于一些较小的或者比较技术型的组织中，而入站的 SSH 连接通常会限制到一台或者是少数几台服务器上。</p>
<h4><a href="#出站的-ssh-连接"></a>出站的 SSH 连接</h4>
<p>在防火墙中配置出站的 SSH 连接十分简单。如果完全限制了外发连接，那么只需要创建一个允许 TCP 端口 22 可以外发的规则即可。如果你想限制目标地址，你可以限制该规则仅允许访问你的组织放在云端的外部服务器或保护该云端的<a href="https://www.ssh.com/iam/jump-server">跳板服务器</a>即可。</p>
<h4><a href="#反向通道是有风险的"></a>反向通道是有风险的</h4>
<p>其实不限制出站的 SSH 连接虽然是可以的，但是是存在风险的，SSH 协议是支持 <a href="https://www.ssh.com/ssh/tunneling/">通道访问</a> 的。最初的想法是在外部服务器搭建一个 SSH 服务监听来自各处的连接，将进入的连接转发到组织，并让这个连接可以访问某个内部服务器。</p>
<p>在某些场景下这当然非常的方便。开发者和系统管理员经常使用它打开一个通道以便于他们可以远程访问，比如在家里或者在旅行中使用笔记本电脑等场景。</p>
<p>然而通常来讲这些做法是违背安全策略的，跳过了防火墙管理员和安全团队保护的控制无疑是违背安全策略的，比如这些： <a href="https://www.ssh.com/compliance/pci/">PCI</a>、<a href="https://www.ssh.com/compliance/hipaa/security-rule">HIPAA</a>、<a href="https://www.ssh.com/compliance/nist-800-53/">NIST SP 800-53</a> 等。它可以被黑客和外国情报机构用来在组织内留下后门。</p>
<p><a href="https://www.ssh.com/products/cryptoauditor/">CryptoAuditor</a> 是一款可以控制通道穿过防火墙或者一组云端服务器入口的产品。该款产品可以配合 <a href="https://www.ssh.com/products/universal-ssh-key-manager/">通用 SSH 密钥管理器（Universal SSH Key Manager）</a> 来获得对 <a href="https://www.ssh.com/ssh/host-key">主机密钥（host keys）</a>的访问，以在启用防火墙并阻挡未授权转发的场景中解密 SSH 会话。</p>
<h4><a href="#入站的-ssh-访问"></a>入站的 SSH 访问</h4>
<p>对于入站访问而言，这里有几点需要说一下：</p>
<ul>
<li>配置防火墙，并转发所有去往 22 端口的连接只能流向到一个特定的内部网络 IP 地址或者一个 <a href="https://en.wikipedia.org/wiki/DMZ_(computing">DMZ</a>) 主机。在该 IP 上运行 <a href="https://www.ssh.com/products/cryptoauditor/">CryptoAuditor</a> 或者跳板机来控制和审查所有访问该组织的连接。</li>
<li>在防火墙上使用不同的端口访问不同的服务器。</li>
<li>只允许使用 <a href="https://www.ssh.com/network/ipsec/">IPsec</a> 协议这样的 VPN（虚拟专用网）登录后连接 SSH 服务。</li>
</ul>
<h3><a href="#通过-iptables-服务限制-ssh-访问"></a>通过 iptables 服务限制 SSH 访问</h3>
<p><a href="https://en.wikipedia.org/wiki/Iptables">iptables</a> 是一款内建在 Linux 内核的宿主防火墙。通常配置用于保护服务器以防止被访问那些未明确开启的端口。</p>
<p>如果服务器上启用了 <code>iptables</code>，使用下面的命令将可以允许进入的 SSH 访问，当然命令需要以 root 身份运行。</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">iptables</span> <span class="hljs-literal">-</span><span class="hljs-comment">A</span> <span class="hljs-comment">INPUT</span> <span class="hljs-literal">-</span><span class="hljs-comment">p</span> <span class="hljs-comment">tcp</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">dport</span> <span class="hljs-comment">22</span> <span class="hljs-literal">-</span><span class="hljs-comment">m</span> <span class="hljs-comment">conntrack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ctstate</span> <span class="hljs-comment">NEW</span><span class="hljs-string">,</span><span class="hljs-comment">ESTABLISHED</span> <span class="hljs-literal">-</span><span class="hljs-comment">j</span> <span class="hljs-comment">ACCEPT</span>
<span class="hljs-comment">iptables</span> <span class="hljs-literal">-</span><span class="hljs-comment">A</span> <span class="hljs-comment">OUTPUT</span> <span class="hljs-literal">-</span><span class="hljs-comment">p</span> <span class="hljs-comment">tcp</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">sport</span> <span class="hljs-comment">22</span> <span class="hljs-literal">-</span><span class="hljs-comment">m</span> <span class="hljs-comment">conntrack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ctstate</span> <span class="hljs-comment">ESTABLISHED</span> <span class="hljs-literal">-</span><span class="hljs-comment">j</span> <span class="hljs-comment">ACCEPT</span>

</code></pre><p>如果你想将上述命令创建的规则持久地保存，在某些系统版本中，可使用如下命令：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">service iptables save</span>

</code></pre><p><a href="https://camo.githubusercontent.com/25900664b2ea105ab750d94450faeeab1ea5b8d0/68747470733a2f2f7777772e7373682e636f6d2f732f7373682d706f72742d6669726577616c6c2d6163636573732d62616e6b732d393530783333332d732b5a70527669502e706e67"><img src="https://p0.ssl.qhimg.com/t01b2ffd2cfee688aa7.png" alt="防火墙开启 SSH 端口可以让我挖隧道去银行"></a></p>
<hr>
<p>via: <a href="https://www.ssh.com/ssh/port">https://www.ssh.com/ssh/port</a></p>
<p>作者：<a href="https://www.ssh.com/ssh/port">Tatu Ylonen</a> 译者：<a href="https://github.com/kenxx">kenxx</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SSH 协议端口号 22 背后的故事

## 原文链接
[https://www.zcfy.cc/article/the-story-of-getting-ssh-port-22](https://www.zcfy.cc/article/the-story-of-getting-ssh-port-22)


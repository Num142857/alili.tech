---
title: '为你的 Linux 服务器加把锁' 
date: 2019-01-24 2:30:11
hidden: true
slug: ipoekksj8q
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#为你的-linux-服务器加把锁"></a>为你的 Linux 服务器加把锁</h1>
<blockquote>
<p>无论你使用的哪种 Linux 发行版，你都需要使用基于 iptables 的防火墙来保护它。</p>
</blockquote>
<p>啊哈！你已经设置好了你的第一台 Linux 服务器并且已经准备发车了！是么？嗯，慢着。</p>
<p>默认情况下，你的 Linux 系统对攻击者来说并非是足够安全的。当然，它比 Windows XP 要安全多了，但这说明不了什么。</p>
<p>想要使你的 Linux 系统真正稳固，你需要按照 <a href="https://www.linode.com/">Linode</a> 的 <a href="https://www.linode.com/docs/security/securing-your-server">服务器安全指南</a> 来操作。</p>
<p>总的来说，<strong>首先你必须</strong>关闭那些你不需要的服务。当然要这样做的话，你先要知道你正在使用哪些网络服务。</p>
<p>你可以使用 shell 命令来找到是哪些服务：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">netstat -tulpn</span>

</code></pre><p><a href="http://www.faqs.org/docs/linux_network/x-087-2-iface.netstat.html">netstat</a> 将会告诉你正在运行哪些服务和这些服务正在使用的端口是什么。如果你不需要其中的某项服务或端口，你就应该关闭它。例如，除非你正在运行一个网站，否则你是不需要运行中的 <a href="https://httpd.apache.org/">Apache</a> 或 <a href="https://www.nginx.com/">Nginx</a> 服务器，也不需要开启 80 或 8080 端口。</p>
<p>总之一句话，不确定的话，就关了它先。</p>
<p>在一个最简单的，没有做过任何额外更改的 Linux 服务器上，你会看到 <a href="https://www.linode.com/docs/tools-reference/ssh/">SSH</a>、 <a href="http://www.linux.org/threads/tcp-ip-service-remote-procedure-call-rpc.4913/">RPC</a> 和 <a href="https://help.ubuntu.com/lts/serverguide/NTP.html">NTPdate</a> 运行在它们的公开端口上。不要添加像 <a href="http://www.telnet.org/htm/faq.htm">telnet</a> 这样陈旧而不安全的 shell 程序，否则老司机就会在你不经意间将你的 Linux 小跑车开走了。也许，在上世纪 80 年代的时候你喜欢把 telnet 当作你 SunOS 机器上的备份登录方式，但是那早已成为了过去。</p>
<p>就 SSH 来说，你应该使用 <a href="https://www.linode.com/docs/security/securing-your-server/#create-an-authentication-key-pair">RSA 密钥</a> 和 <a href="https://www.linode.com/docs/security/securing-your-server/#use-fail2ban-for-ssh-login-protection">Fail2Ban</a> 来加固。除非你需要 RPC，否则就卸载它——如果你不知道需要不需要它的话，那就是不需要。</p>
<p>关于如何关门已经说的够多了；让我们来聊聊利用 iptables 来锁定进来的流量吧。</p>
<p>当你启动 Linux 服务器的时候它是没有任何规则的。这就意味着所有的流量都是被允许的。这当然是<strong>不好的</strong>。因此，你需要及时的设置你的防火墙。</p>
<p>Iptables 是一种用来给 <a href="https://www.netfilter.org/">netfilter</a> 设置网络策略规则的 shell 工具，netfilter 是Linux 系统下的默认防火墙，它利用一组规则来允许或禁止流量。当有人尝试连接上你的系统——有些人无时不刻地尝试这么干，而且从不气馁——iptables 就会检查这些请求是否与规则列表相匹配。如果没有匹配到任何的规则，它就会采取默认操作。</p>
<p>这个默认操作应该是将连接“Drop”掉，即禁掉这些意图闯入者。而且这不会让他们知道这些网络探测行为发生了什么。（你也可以将链接“Reject”掉，但是这会同时让他们知道你有一个正在运行的 Linux 防火墙。就目前而言，让陌生人能获取到我们系统的信息越少越好。至少，我是这么认为的。）</p>
<p>现在，你可以用 iptables 来设置你的防火墙了。我已经这么做了。就像以前，我骑着自行车去六英里外上班，并且两边都是上坡。而现在，我开车去。</p>
<p>这其实比喻的是我使用 Fedora 发行版的 <a href="http://www.firewalld.org/">FirewallD</a> 和 Debian 系发行版的 <a href="https://help.ubuntu.com/community/UFW">UFW</a>（Uncomplicated Firewall）。这些都是易用的 iptables 的 shell 前端。你可以在以下的 Linode 指南中找到适合的使用方式：<a href="https://www.linode.com/docs/security/firewalls/introduction-to-firewalld-on-centos">FirewallD</a> 和 <a href="https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw">UFW</a>。</p>
<p>从本质上来说设置这些规则就是在你的服务器上放置“非请勿入”的告示牌。用起来吧。</p>
<p>但是也别太兴奋地把所有的链接都关闭了。例如：</p>
<pre><code class="hljs routeros">sudo ufw<span class="hljs-built_in"> default </span>deny<span class="hljs-built_in"> incoming
</span>
</code></pre><p>看起来是个好主意哦。别忘了，它禁止了所有链接，包括你自己哦！</p>
<p>很好，它就是这么干的。这意味着它也同样禁止了 SSH 的登录。也就是说你再也不能登录你那新服务器了。哇哦！</p>
<p>不过，如果你犯了错，错误的将更多的链接都禁止了。你看，老司机也同样被你挡在门外了。</p>
<p>或者，更准确得说，这不是你或你的服务器所遇到的个别现象。当然，你也不是<a href="http://thehackernews.com/2016/02/nsa-utah-data-center.html">每天受到 3 亿多次攻击尝试的美国国家安全局（NSA）</a>。但是攻击脚本根本不在乎你是谁。它只是不断的检查寻找网络中存在已知漏洞的服务器。在平常的一天中我自己的小服务器就会受到数以百计的攻击。</p>
<p>都这样了，你还在等什么呢？去吧，加固你的网络服务吧。安装 FirewallD 或者 UFW 来加固你的服务器吧。你会愿意去做的。</p>
<hr>
<p>关于作者：</p>
<p>Steven J. Vaughan-Nichols 是一位资深的 IT 专栏作家，他的作品出现在许多行业领袖媒体上，包括 ZDNet.com、PC Magazine、InfoWorld、ComputerWorld、Linux Today 和 eWEEK 等。Steven 在 IT 专业方面的见解犀利，虽然他的观点和云计算方面的认识，并不代表 Linode 观点，但是我们仍然非常感谢他的贡献。你可以在 Twitter 上关注他 （@sjvn）。</p>
<hr>
<p>via: <a href="https://medium.com/linode-cube/locking-down-your-linux-server-24d8516ae374#.qy8qq4bx2">https://medium.com/linode-cube/locking-down-your-linux-server-24d8516ae374#.qy8qq4bx2</a></p>
<p>作者：<a href="https://medium.com/linode-cube/locking-down-your-linux-server-24d8516ae374#.qy8qq4bx2">Steven J. Vaughan-Nichols</a> 译者：<a href="https://github.com/wcnnbdk1">wcnnbdk1</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 组织编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为你的 Linux 服务器加把锁

## 原文链接
[https://www.zcfy.cc/article/locking-down-your-linux-server](https://www.zcfy.cc/article/locking-down-your-linux-server)


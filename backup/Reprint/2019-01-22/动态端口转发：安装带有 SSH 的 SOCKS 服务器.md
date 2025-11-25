---
title: '动态端口转发：安装带有 SSH 的 SOCKS 服务器' 
date: 2019-01-22 2:30:07
hidden: true
slug: 4cphvukmryc
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#动态端口转发安装带有-ssh-的-socks-服务器"></a>动态端口转发：安装带有 SSH 的 SOCKS 服务器</h1>
<p>在上一篇文章（<a href="https://linux.cn/article-8945-1.html">通过 SSH 实现 TCP / IP 隧道（端口转发）：使用 OpenSSH 可能的 8 种场景</a>）中，我们看到了处理端口转发的所有可能情况，不过那只是静态端口转发。也就是说，我们只介绍了通过 SSH 连接来访问另一个系统的端口的情况。</p>
<p>在那篇文章中，我们未涉及动态端口转发，此外一些读者没看过该文章，本篇文章中将尝试补充完整。</p>
<p>当我们谈论使用 SSH 进行动态端口转发时，我们说的是将 SSH 服务器转换为 <a href="https://wesharethis.com/goto/http://en.wikipedia.org/wiki/SOCKS">SOCKS</a> 服务器。那么什么是 SOCKS 服务器？</p>
<p>你知道 <a href="https://wesharethis.com/goto/http://en.wikipedia.org/wiki/Proxy_server">Web 代理</a>是用来做什么的吗？答案可能是肯定的，因为很多公司都在使用它。它是一个直接连接到互联网的系统，允许没有互联网访问的<a href="https://wesharethis.com/goto/http://en.wikipedia.org/wiki/Intranet">内部网</a>客户端让其浏览器通过代理来（尽管也有<a href="https://wesharethis.com/goto/http://en.wikipedia.org/wiki/Proxy_server#Transparent_and_non-transparent_proxy_server">透明代理</a>）浏览网页。Web 代理除了允许输出到 Internet 之外，还可以缓存页面、图像等。已经由某客户端下载的资源，另一个客户端不必再下载它们。此外，它还可以过滤内容并监视用户的活动。当然了，它的基本功能是转发 HTTP 和 HTTPS 流量。</p>
<p>一个 SOCKS 服务器提供的服务类似于公司内部网络提供的代理服务器服务，但不限于 HTTP/HTTPS，它还允许转发任何 TCP/IP 流量（SOCKS 5 也支持 UDP）。</p>
<p>例如，假设我们希望在一个没有直接连接到互联网的内部网上通过 Thunderbird 使用 POP3 、 ICMP 和 SMTP 的邮件服务。如果我们只有一个 web 代理可以用，我们可以使用的唯一的简单方式是使用某个 webmail（也可以使用 <a href="https://wesharethis.com/goto/http://webmail.mozdev.org/">Thunderbird 的 Webmail 扩展</a>）。我们还可以通过 <a href="https://wesharethis.com/goto/http://en.wikipedia.org/wiki/HTTP_tunnel_(software">HTTP 隧道</a>)来起到代理的用途。但最简单的方式是在网络中设置一个 SOCKS 服务器，它可以让我们使用 POP3、ICMP 和 SMTP，而不会造成任何的不便。</p>
<p>虽然有很多软件可以配置非常专业的 SOCKS 服务器，但用 OpenSSH 设置一个只需要简单的一条命令：</p>
<pre><code class="hljs elixir">Clientessh <span class="hljs-variable">$ </span>ssh -D <span class="hljs-number">1080</span> user<span class="hljs-variable">@servidorssh</span>

</code></pre><p>或者我们可以改进一下：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">Clientessh</span> $ ssh -fN -D <span class="hljs-number">0.0.0.0:1080</span> user<span class="hljs-variable">@servidorssh</span>

</code></pre><p>其中：</p>
<ul>
<li><p>选项 <code>-D</code> 类似于选项为 <code>-L</code> 和 <code>-R</code> 的静态端口转发。像那些一样，我们可以让客户端只监听本地请求或从其他节点到达的请求，具体取决于我们将请求关联到哪个地址：</p>
<pre><code class="hljs routeros">-D [bind_address:]<span class="hljs-built_in"> port
</span>
</code></pre><p>在静态端口转发中可以看到，我们使用选项 <code>-R</code> 进行反向端口转发，而动态转发是不可能的。我们只能在 SSH 客户端创建 SOCKS 服务器，而不能在 SSH 服务器端创建。</p>
</li>
<li><p>1080 是 SOCKS 服务器的典型端口，正如 8080 是 Web 代理服务器的典型端口一样。</p>
</li>
<li><p>选项 <code>-N</code> 防止实际启动远程 shell 交互式会话。当我们只用 <code>ssh</code> 来建立隧道时很有用。</p>
</li>
<li><p>选项 <code>-f</code> 会使 <code>ssh</code> 停留在后台并将其与当前 shell 分离，以便使该进程成为守护进程。如果没有选项 <code>-N</code>（或不指定命令），则不起作用，否则交互式 shell 将与后台进程不兼容。</p>
</li>
</ul>
<p>使用 <a href="https://wesharethis.com/goto/http://www.chiark.greenend.org.uk/%7Esgtatham/putty/download.html">PuTTY</a> 也可以非常简单地进行端口重定向。与 <code>ssh -D 0.0.0.0:1080</code> 相当的配置如下：</p>
<p><a href="https://camo.githubusercontent.com/1f80e3fd482fb6848670ca7ca4a1452819a40c9d/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f70757474795f736f636b732e706e67"><img src="https://p0.ssl.qhimg.com/t018dfbcdc2531042a9.png" alt="PuTTY SOCKS"></a></p>
<p>对于通过 SOCKS 服务器访问另一个网络的应用程序，如果应用程序提供了对 SOCKS 服务器的特别支持，就会非常方便（虽然不是必需的），就像浏览器支持使用代理服务器一样。作为一个例子，如 Firefox 或 Internet Explorer 这样的浏览器使用 SOCKS 服务器访问另一个网络的应用程序：</p>
<p><a href="https://camo.githubusercontent.com/c772c1acd3ee32cde371dd91c72f41037b554fc5/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f66697265666f785f736f636b732e706e67"><img src="https://p0.ssl.qhimg.com/t01aee33bf67ade0216.png" alt="Firefox SOCKS"></a></p>
<p><a href="https://camo.githubusercontent.com/8bc68bd75491e7dae3e565ecad48c91fb24b6cbd/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f696e7465726e65746578706c6f7265725f736f636b732e706e67"><img src="https://p0.ssl.qhimg.com/t01e170432859f4d61e.png" alt="Internet Explorer SOCKS"></a></p>
<p>注意：上述截图来自 <a href="https://wesharethis.com/goto/http://www.tatanka.com.br/ies4linux/page/Main_Page">IE for Linux</a> ：如果您需要在 Linux 上使用 Internet Explorer，强烈推荐！</p>
<p>然而，最常见的浏览器并不要求 SOCKS 服务器，因为它们通常与代理服务器配合得更好。</p>
<p>不过，Thunderbird 也支持 SOCKS，而且很有用：</p>
<p><a href="https://camo.githubusercontent.com/99c5aded8ac6cd2f329032a007c71935f040fb40/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f7468756e646572626972645f736f636b732e706e67"><img src="https://p0.ssl.qhimg.com/t01969448d299831111.png" alt="Thunderbird SOCKS"></a></p>
<p>另一个例子：<a href="https://wesharethis.com/goto/https://www.spotify.com/int/download/linux/">Spotify</a> 客户端同样支持 SOCKS：</p>
<p><a href="https://camo.githubusercontent.com/0d5ad72e42e5b27c1c3fdb93660af244b2f5c8aa/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f73706f746966795f736f636b732e706e67"><img src="https://p0.ssl.qhimg.com/t01dce9826ad207902a.png" alt="Spotify SOCKS"></a></p>
<p>需要关注一下名称解析。有时我们会发现，在目前的网络中，我们无法解析 SOCKS 服务器另一端所要访问的系统的名称。SOCKS 5 还允许我们通过隧道传播 DNS 请求（ 因为 SOCKS 5 允许我们使用 UDP）并将它们发送到另一端：可以指定是本地还是远程解析（或者也可以两者都试试）。支持此功能的应用程序也必须考虑到这一点。例如，Firefox 具有参数 <code>network.proxy.socks_remote_dns</code>（在 <code>about:config</code> 中），允许我们指定远程解析。而默认情况下，它在本地解析。</p>
<p>Thunderbird 也支持参数 <code>network.proxy.socks_remote_dns</code>，但由于没有地址栏来放置 <code>about:config</code>，我们需要改变它，就像在 <a href="https://wesharethis.com/goto/http://kb.mozillazine.org/About:config">MozillaZine:about:config</a> 中读到的，依次点击 工具 → 选项 → 高级 → 常规 → 配置编辑器（按钮）。</p>
<p>没有对 SOCKS 特别支持的应用程序可以被 sock 化socksified。这对于使用 TCP/IP 的许多应用程序都没有问题，但并不是全部。“sock 化” 需要加载一个额外的库，它可以检测对 TCP/IP 堆栈的请求，并修改请求，以通过 SOCKS 服务器重定向，从而不需要特别编程来支持 SOCKS 便可以正常通信。</p>
<p>在 Windows 和 <a href="https://wesharethis.com/2017/07/10/linux-swap-partition/">Linux</a> 上都有 “Sock 化工具”。</p>
<p>对于 Windows，我们举个例子，SocksCap 是一种闭源，但对非商业使用免费的产品，我使用了很长时间都十分满意。SocksCap 由一家名为 Permeo 的公司开发，该公司是创建 SOCKS 参考技术的公司。Permeo 被 <a href="https://wesharethis.com/goto/http://www.bluecoat.com/">Blue Coat</a> 买下后，它<a href="https://wesharethis.com/goto/http://www.bluecoat.com/products/sockscap">停止了 SocksCap 项目</a>。现在你仍然可以在互联网上找到 <code>sc32r240.exe</code> 文件。<a href="https://wesharethis.com/goto/http://www.freecap.ru/eng/">FreeCap</a> 也是面向 Windows 的免费代码项目，外观和使用都非常类似于 SocksCap。然而，它工作起来更加糟糕，多年来一直没有缺失维护。看起来，它的作者倾向于推出需要付款的新产品 <a href="https://wesharethis.com/goto/http://widecap.ru/en/support/">WideCap</a>。</p>
<p>这是 SocksCap 的一个界面，可以看到我们 “sock 化” 了的几个应用程序。当我们从这里启动它们时，这些应用程序将通过 SOCKS 服务器访问网络：</p>
<p><a href="https://camo.githubusercontent.com/26a8de045e1af1be43bc4e3982f7fa55f52fe9f2/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f736f636b736361702e706e67"><img src="https://p0.ssl.qhimg.com/t017e7c39cbd83c67f5.png" alt="SocksCap"></a></p>
<p>在配置对话框中可以看到，如果选择了协议 SOCKS 5，我们可以选择在本地或远程解析名称：</p>
<p><a href="https://camo.githubusercontent.com/1d9c3be060ea636aeb7b82b0166584883f9dbc7c/68747470733a2f2f77657368617265746869732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30372f736f636b736361705f73657474696e67732e706e67"><img src="https://p0.ssl.qhimg.com/t01ea8c1bebef65cecc.png" alt="SocksCap settings"></a></p>
<p>在 Linux 上，如同往常一样，对某个远程命令我们都有许多替代方案。在 Debian/Ubuntu 中，命令行：</p>
<pre><code class="hljs routeros">$ Apt-cache search<span class="hljs-built_in"> socks
</span>
</code></pre><p>的输出会告诉我们很多。</p>
<p>最著名的是 <a href="https://wesharethis.com/goto/http://tsocks.sourceforge.net/">tsocks</a> 和 <a href="https://wesharethis.com/goto/http://proxychains.sourceforge.net/">proxychains</a>。它们的工作方式大致相同：只需用它们启动我们想要 “sock 化” 的应用程序就行。使用 <code>proxychains</code> 的 <code>wget</code> 的例子：</p>
<pre><code class="hljs fsharp">$ Proxychains wget http:<span class="hljs-comment">//www.google.com</span>
ProxyChains<span class="hljs-number">-3.1</span> (http:<span class="hljs-comment">//proxychains.sf.net)</span>
-<span class="hljs-number">-19</span>: <span class="hljs-number">13</span>: <span class="hljs-number">20</span>-- http:<span class="hljs-comment">//www.google.com/</span>
Resolving www.google.com ...
DNS-request | Www.google.com
| S-chain | - &lt;- - <span class="hljs-number">10.23</span><span class="hljs-number">.37</span><span class="hljs-number">.3</span>:<span class="hljs-number">1080</span>-&lt;&gt;&lt;&gt;<span class="hljs-number">-4.2</span><span class="hljs-number">.2</span><span class="hljs-number">.2</span>:<span class="hljs-number">53</span>-&lt;&gt;&lt;&gt;-OK
| DNS-response | Www.google.com is <span class="hljs-number">72.14</span><span class="hljs-number">.221</span><span class="hljs-number">.147</span>
<span class="hljs-number">72.14</span><span class="hljs-number">.221</span><span class="hljs-number">.147</span>
Connecting <span class="hljs-keyword">to</span> www.google.com | <span class="hljs-number">72.14</span><span class="hljs-number">.221</span><span class="hljs-number">.147</span> |: <span class="hljs-number">80</span> ...
| S-chain | - &lt;- - <span class="hljs-number">10.23</span><span class="hljs-number">.37</span><span class="hljs-number">.3</span>:<span class="hljs-number">1080</span>-&lt;&gt;&lt;&gt;<span class="hljs-number">-72.14</span><span class="hljs-number">.221</span><span class="hljs-number">.147</span>:<span class="hljs-number">80</span>-&lt;&gt;&lt;&gt;-OK
Connected.
HTTP request sent, awaiting response ... <span class="hljs-number">200</span> OK
Length: unspecified [text / html]
Saving <span class="hljs-keyword">to</span>: `index.html '

    <span class="hljs-meta">[&lt;=&gt;]</span> <span class="hljs-number">6</span>,<span class="hljs-number">016</span> <span class="hljs-number">24.0</span>K / s <span class="hljs-keyword">in</span> <span class="hljs-number">0.2</span>s

<span class="hljs-number">19</span>:<span class="hljs-number">13</span>:<span class="hljs-number">21</span> (<span class="hljs-number">24.0</span> KB / s) - `index.html 'saved [<span class="hljs-number">6016</span>]

</code></pre><p>要让它可以工作，我们必须在 <code>/etc/proxychains.conf</code> 中指定要使用的代理服务器：</p>
<pre><code class="hljs accesslog"><span class="hljs-string">[ProxyList]</span>
Socks5 clientessh <span class="hljs-number">1080</span>

</code></pre><p>我们也设置远程进行 DNS 请求：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> Proxy DNS requests - no leak <span class="hljs-keyword">for</span> DNS data</span>
Proxy_dns

</code></pre><p>另外，在前面的输出中，我们已经看到了同一个 <code>proxychains</code> 的几条信息性的消息， 非 <code>wget</code> 的行是标有字符串 <code>|DNS-request|</code>、<code>|S-chain|</code> 或 <code>|DNS-response|</code> 的。如果我们不想看到它们，也可以在配置中进行调整：</p>
<pre><code class="hljs clean"># Quiet mode (no output <span class="hljs-keyword">from</span> library)
Quiet_mode

</code></pre><hr>
<p>via: <a href="https://wesharethis.com/2017/07/15/dynamic-port-forwarding-mount-socks-server-ssh/">https://wesharethis.com/2017/07/15/dynamic-port-forwarding-mount-socks-server-ssh/</a></p>
<p>作者：<a href="https://wesharethis.com/author/ahmad/">Ahmad</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
动态端口转发：安装带有 SSH 的 SOCKS 服务器

## 原文链接
[https://www.zcfy.cc/article/dynamic-port-forwarding-mount-a-socks-server-with-ssh](https://www.zcfy.cc/article/dynamic-port-forwarding-mount-a-socks-server-with-ssh)


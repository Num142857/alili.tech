---
title: '匿名上网：学习在 Linux 上安装 TOR 网络' 
date: 2019-01-21 2:30:06
hidden: true
slug: gykqld63vs
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#匿名上网学习在-linux-上安装-tor-网络"></a>匿名上网：学习在 Linux 上安装 TOR 网络</h1>
<p>Tor 网络是一个用来保护你的互联网以及隐私的匿名网络。Tor 网络是一组志愿者运营的服务器。Tor 通过在由志愿者运营的分布式中继系统之间跳转来保护互联网通信。这避免了人们窥探我们的网络，他们无法了解我们访问的网站或者用户身在何处，并且也可以让我们访问被屏蔽的网站。</p>
<p>在本教程中，我们将学习在各种 Linux 操作系统上安装 Tor 网络，以及如何使用它来配置我们的程序来保护通信。</p>
<p>推荐阅读：<a href="http://linuxtechlab.com/install-tor-browser-linux-ubuntu-centos/">如何在 Linux 上安装 Tor 浏览器（Ubuntu、Mint、RHEL、Fedora、CentOS）</a></p>
<h3><a href="#centosrhelfedora"></a>CentOS/RHEL/Fedora</h3>
<p>Tor 包是 EPEL 仓库的一部分，所以如果我们安装了 EPEL 仓库，我们可以直接使用 <code>yum</code> 来安装 Tor。如果你需要在您的系统上安装 EPEL 仓库，请使用下列适当的命令（基于操作系统和体系结构）：</p>
<p>RHEL/CentOS 7：</p>
<pre><code class="hljs awk">$ sudo rpm -Uvh https:<span class="hljs-regexp">//</span>dl.fedoraproject.org<span class="hljs-regexp">/pub/</span>epel<span class="hljs-regexp">/7/</span>x86_64<span class="hljs-regexp">/e/</span>epel-release-<span class="hljs-number">7</span>-<span class="hljs-number">11</span>.noarch.rpm

</code></pre><p>RHEL/CentOS 6 (64 位)：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>sudo rpm -Uvh <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/download.fedoraproject.org/pub</span><span class="hljs-regexp">/epel/</span><span class="hljs-number">6</span>/x86_64/epel-release-<span class="hljs-number">6</span>-<span class="hljs-number">8</span>.noarch.rpm

</code></pre><p>RHEL/CentOS 6 (32 位)：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>sudo rpm -Uvh <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/dl.fedoraproject.org/pub</span><span class="hljs-regexp">/epel/</span><span class="hljs-number">6</span>/i386/epel-release-<span class="hljs-number">6</span>-<span class="hljs-number">8</span>.noarch.rpm

</code></pre><p>安装完成后，我们可以用下面的命令安装 Tor 浏览器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum install tor</span>

</code></pre><h3><a href="#ubuntu"></a>Ubuntu</h3>
<p>为了在 Ubuntu 机器上安装 Tor 网络，我们需要添加官方 Tor 仓库。我们需要将仓库信息添加到 <code>/etc/apt/sources.list</code> 中。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo nano /etc/apt/sources.list</span>

</code></pre><p>现在根据你的操作系统添加下面的仓库信息：</p>
<p>Ubuntu 16.04：</p>
<pre><code class="hljs avrasm">deb http://deb.torproject<span class="hljs-meta">.org</span>/torproject<span class="hljs-meta">.org</span> xenial main
deb-src http://deb.torproject<span class="hljs-meta">.org</span>/torproject<span class="hljs-meta">.org</span> xenial main

</code></pre><p>Ubuntu 14.04</p>
<pre><code class="hljs avrasm">deb http://deb.torproject<span class="hljs-meta">.org</span>/torproject<span class="hljs-meta">.org</span> trusty main
deb-src http://deb.torproject<span class="hljs-meta">.org</span>/torproject<span class="hljs-meta">.org</span> trusty main

</code></pre><p>接下来打开终端并执行以下两个命令添加用于签名软件包的 gpg 密钥：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> gpg -keyserver keys.gnupg.net -recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89</span>
<span class="hljs-meta">$</span><span class="bash"> gpg -<span class="hljs-built_in">export</span> A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -</span>

</code></pre><p>现在运行更新并安装 Tor 网络：</p>
<pre><code class="hljs routeros">$ sudo apt-<span class="hljs-builtin-name">get</span> update
$ sudo apt-<span class="hljs-builtin-name">get</span> install tor deb.torproject.org-keyring

</code></pre><h3><a href="#debian"></a>Debian</h3>
<p>我们可以无需添加任何仓库在 Debian 上安装 Tor 网络。只要打开终端并以 root 身份执行以下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> apt install tor</span>

</code></pre><h3><a href="#tor-配置"></a>Tor 配置</h3>
<p>如果你最终目的只是为了保护互联网浏览，而没有其他要求，直接使用 Tor 更好，但是如果你需要保护即时通信、IRC、Jabber 等程序，则需要配置这些应用程序进行安全通信。但在做之前，让我们先看看<a href="https://www.torproject.org/download/download.html.en#warning">Tor 网站上提到的警告</a>。</p>
<ul>
<li>不要大流量使用 Tor</li>
<li>不要在 Tor 中使用任何浏览器插件</li>
<li>只使用 HTTPS 版本的网站</li>
<li>不要在线打开通过 Tor 下载的任何文档。</li>
<li>尽可能使用 Tor 桥</li>
</ul>
<p>现在配置程序来使用 Tor，例如 jabber。首先选择 “SOCKS代理” 而不是使用 HTTP 代理，并使用端口号 <code>9050</code>，或者也可以使用端口 9150（Tor 浏览器使用）。</p>
<p><a href="https://camo.githubusercontent.com/d98713a865557a8a79fb375b8dd2b936b05890e6/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31322f746f722d312d636f6d70726573736f722e706e673f726573697a653d333333253243323430"><img src="https://p0.ssl.qhimg.com/t01342b21792a5a71cf.png" alt="install tor network"></a></p>
<p>你也可以配置 Firefox 浏览器使用 Tor 网络。打开 Firefox 浏览器，在“常规”选项卡的“首选项”中进入“网络代理”设置，并按以下步骤输入代理：</p>
<p><a href="https://camo.githubusercontent.com/26a6e4be3d02e7f2db1a4c2b74e91118db74452f/68747470733a2f2f69312e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31322f746f722d322d636f6d70726573736f722e706e673f726573697a653d373330253243363430"><img src="https://p0.ssl.qhimg.com/t01d5db02ff3eb7c9b9.png" alt="install tor network"></a></p>
<p>现在你可以在 Firefox 中使用 Tor 网络完全匿名访问了。</p>
<p>这就是我们如何安装 Tor 网络并使用 Tor 浏览互联网的教程。请在下面的评论栏中提出你的问题和建议。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/learn-install-tor-network-linux/">http://linuxtechlab.com/learn-install-tor-network-linux/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
匿名上网：学习在 Linux 上安装 TOR 网络

## 原文链接
[https://www.zcfy.cc/article/surf-anonymously-learn-to-install-tor-network-on-linux](https://www.zcfy.cc/article/surf-anonymously-learn-to-install-tor-network-on-linux)


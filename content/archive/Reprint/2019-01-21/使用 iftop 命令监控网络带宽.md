---
title: '使用 iftop 命令监控网络带宽' 
date: 2019-01-21 2:30:06
hidden: true
slug: si2dth9lq1
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-iftop-命令监控网络带宽"></a>使用 iftop 命令监控网络带宽</h1>
<p>系统管理员需要监控 IT 基础设施来确保一切正常运行。我们需要监控硬件，也就是内存、硬盘和 CPU 等的性能，我们也必须监控我们的网络。我们需要确保我们的网络不被过度使用，否则我们的程序，网站可能无法正常工作。在本教程中，我们将学习使用 <code>iftop</code>。</p>
<p>（<strong>推荐阅读</strong>：<a href="http://linuxtechlab.com/installing-configuring-nagios-server/"><strong>使用 Nagios</strong> 进行资源监控</a>、<a href="http://linuxtechlab.com/commands-system-hardware-info/"><strong>用于检查系统信息的工具</strong></a> 、<a href="http://linuxtechlab.com/important-logs-monitor-identify-issues/"><strong>要监控的重要日志</strong></a> ）</p>
<p><code>iftop</code> 是网络监控工具，它提供实时带宽监控。 <code>iftop</code> 测量进出各个套接字连接的总数据量，即它捕获通过网络适配器收到或发出的数据包，然后将这些数据相加以得到使用的带宽。</p>
<h3><a href="#在-debianubuntu-上安装"></a>在 Debian/Ubuntu 上安装</h3>
<p>iftop 存在于 Debian/Ubuntu 的默认仓库中，可以使用下面的命令安装：</p>
<pre><code class="hljs routeros">$ sudo apt-<span class="hljs-builtin-name">get</span> install iftop

</code></pre><h3><a href="#使用-yum-在-rhelcentos-上安装"></a>使用 yum 在 RHEL/Centos 上安装</h3>
<p>要在 CentOS 或 RHEL 上安装 iftop，我们需要启用 EPEL 仓库。要启用仓库，请在终端上运行以下命令：</p>
<p><strong>RHEL/CentOS 7：</strong></p>
<pre><code class="hljs awk">$ rpm -Uvh https:<span class="hljs-regexp">//</span>dl.fedoraproject.org<span class="hljs-regexp">/pub/</span>epel<span class="hljs-regexp">/7/</span>x86_64<span class="hljs-regexp">/e/</span>epel-release-<span class="hljs-number">7</span>-<span class="hljs-number">10</span>.noarch.rpm

</code></pre><p><strong>RHEL/CentOS 6（64 位）：</strong></p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>rpm -Uvh <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/download.fedoraproject.org/pub</span><span class="hljs-regexp">/epel/</span><span class="hljs-number">6</span>/x86_64/epel-release-<span class="hljs-number">6</span>-<span class="hljs-number">8</span>.noarch.rpm

</code></pre><p><strong>RHEL/CentOS 6 （32 位）：</strong></p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>rpm -Uvh <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/dl.fedoraproject.org/pub</span><span class="hljs-regexp">/epel/</span><span class="hljs-number">6</span>/i386/epel-release-<span class="hljs-number">6</span>-<span class="hljs-number">8</span>.noarch.rpm

</code></pre><p>EPEL 仓库安装完成后，我们可以用下面的命令安装 <code>iftop</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yum install iftop</span>

</code></pre><p>这将在你的系统上安装 <code>iftop</code>。我们现在将用它来监控我们的网络。</p>
<h3><a href="#使用-iftop"></a>使用 iftop</h3>
<p>可以打开终端窗口，并输入下面的命令使用 <code>iftop</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> iftop</span>

</code></pre><p><a href="https://camo.githubusercontent.com/595cbf9a79eacc51cbfd591647412e93e48aeb91/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30342f6966746f702d312e6a70673f726573697a653d363631253243343234"><img src="https://p0.ssl.qhimg.com/t01ecbfb2e8dcadd9ab.jpg" alt="network monitoring"></a></p>
<p>现在你将看到计算机上发生的网络活动。你也可以使用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> iftop -n</span>

</code></pre><p>这将在屏幕上显示网络信息，但使用 <code>-n</code>，则不会显示与 IP 地址相关的名称，只会显示 IP 地址。这个选项能节省一些将 IP 地址解析为名称的带宽。</p>
<p>我们也可以看到 <code>iftop</code> 可以使用的所有命令。运行 <code>iftop</code> 后，按下键盘上的 <code>h</code> 查看 <code>iftop</code> 可以使用的所有命令。</p>
<p><a href="https://camo.githubusercontent.com/4aa07a8f060f10150fd7b88080f28bd74767d9d7/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30342f6966746f702d68656c702e6a70673f726573697a653d363633253243343136"><img src="https://p0.ssl.qhimg.com/t018ed6769db9dda18f.jpg" alt="network monitoring"></a></p>
<p>要监控特定的网络接口，我们可以在 <code>iftop</code> 后加上接口名：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> iftop -I enp0s3</span>

</code></pre><p>如上所述，你可以使用帮助来查看 <code>iftop</code> 可以使用的更多选项。但是这些提到的例子只是可能只是监控网络。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/monitoring-network-bandwidth-iftop-command/">http://linuxtechlab.com/monitoring-network-bandwidth-iftop-command/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">SHUSAIN</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 iftop 命令监控网络带宽

## 原文链接
[https://www.zcfy.cc/article/monitoring-network-bandwidth-with-iftop-command](https://www.zcfy.cc/article/monitoring-network-bandwidth-with-iftop-command)


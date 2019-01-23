---
title: '通过实例学习 tcpdump 命令' 
date: 2019-01-21 2:30:06
hidden: true
slug: 3bwdghiimhw
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#通过实例学习-tcpdump-命令"></a>通过实例学习 tcpdump 命令</h1>
<p><code>tcpdump</code> 是一个很常用的网络包分析工具，可以用来显示通过网络传输到本系统的 TCP/IP 以及其他网络的数据包。<code>tcpdump</code> 使用 libpcap 库来抓取网络报，这个库在几乎在所有的 Linux/Unix 中都有。</p>
<p><code>tcpdump</code> 可以从网卡或之前创建的数据包文件中读取内容，也可以将包写入文件中以供后续使用。必须是 root 用户或者使用 sudo 特权来运行 <code>tcpdump</code>。</p>
<p>在本文中，我们将会通过一些实例来演示如何使用 <code>tcpdump</code> 命令，但首先让我们来看看在各种 Linux 操作系统中是如何安装 <code>tcpdump</code> 的。</p>
<ul>
<li>推荐阅读：<a href="http://linuxtechlab.com/monitoring-network-bandwidth-iftop-command/">使用 iftop 命令监控网络带宽</a></li>
</ul>
<h3><a href="#安装"></a>安装</h3>
<p><code>tcpdump</code> 默认在几乎所有的 Linux 发行版中都可用，但若你的 Linux 上没有的话，使用下面方法进行安装。</p>
<h4><a href="#centosrhel"></a>CentOS/RHEL</h4>
<p>使用下面命令在 CentOS 和 RHEL 上安装 <code>tcpdump</code>，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum install tcpdump*</span>

</code></pre><h4><a href="#fedora"></a>Fedora</h4>
<p>使用下面命令在 Fedora 上安装 <code>tcpdump</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> dnf install tcpdump</span>

</code></pre><h4><a href="#ubuntudebianlinux-mint"></a>Ubuntu/Debian/Linux Mint</h4>
<p>在 Ubuntu/Debain/Linux Mint 上使用下面命令安装 <code>tcpdump</code>：</p>
<pre><code class="hljs routeros">$ apt-<span class="hljs-builtin-name">get</span> install tcpdump

</code></pre><p>安装好 <code>tcpdump</code> 后，现在来看一些例子。</p>
<h3><a href="#案例演示"></a>案例演示</h3>
<h4><a href="#从所有网卡中捕获数据包"></a>从所有网卡中捕获数据包</h4>
<p>运行下面命令来从所有网卡中捕获数据包：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tcpdump -i any</span>

</code></pre><h4><a href="#从指定网卡中捕获数据包"></a>从指定网卡中捕获数据包</h4>
<p>要从指定网卡中捕获数据包，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tcpdump -i eth0</span>

</code></pre><h4><a href="#将捕获的包写入文件"></a>将捕获的包写入文件</h4>
<p>使用 <code>-w</code> 选项将所有捕获的包写入文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tcpdump -i eth1 -w packets_file</span>

</code></pre><h4><a href="#读取之前产生的-tcpdump-文件"></a>读取之前产生的 tcpdump 文件</h4>
<p>使用下面命令从之前创建的 tcpdump 文件中读取内容：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tcpdump -r packets_file</span>

</code></pre><h4><a href="#获取更多的包信息并且以可读的形式显示时间戳"></a>获取更多的包信息，并且以可读的形式显示时间戳</h4>
<p>要获取更多的包信息同时以可读的形式显示时间戳，使用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tcpdump -ttttnnvvS</span>

</code></pre><h4><a href="#查看整个网络的数据包"></a>查看整个网络的数据包</h4>
<p>要获取整个网络的数据包，在终端执行下面命令：</p>
<pre><code class="hljs lsl">$ tcpdump net <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.0</span>/<span class="hljs-number">24</span>

</code></pre><h4><a href="#根据-ip-地址查看报文"></a>根据 IP 地址查看报文</h4>
<p>要获取指定 IP 的数据包，不管是作为源地址还是目的地址，使用下面命令：</p>
<pre><code class="hljs lsl">$ tcpdump host <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.100</span>

</code></pre><p>要指定 IP 地址是源地址或是目的地址则使用：</p>
<pre><code class="hljs lsl">$ tcpdump src <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.100</span>
$ tcpdump dst <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.100</span>

</code></pre><h4><a href="#查看某个协议或端口号的数据包"></a>查看某个协议或端口号的数据包</h4>
<p>要查看某个协议的数据包，运行下面命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tcpdump ssh</span>

</code></pre><p>要捕获某个端口或一个范围的数据包，使用：</p>
<pre><code class="hljs routeros">$ tcpdump<span class="hljs-built_in"> port </span>22
$ tcpdump portrange 22-125

</code></pre><p>我们也可以与 <code>src</code> 和 <code>dst</code> 选项连用来捕获指定源端口或指定目的端口的报文。</p>
<p>我们还可以使用“与” （<code>and</code>，<code>&amp;&amp;</code>）、“或” （<code>or</code>，<code>||</code> ) 和“非”（<code>not</code>，<code>!</code>） 来将两个条件组合起来。当我们需要基于某些条件来分析网络报文是非常有用。</p>
<h4><a href="#使用与"></a>使用“与”</h4>
<p>可以使用 <code>and</code> 或者符号 <code>&amp;&amp;</code> 来将两个或多个条件组合起来。比如：</p>
<pre><code class="hljs routeros">$ tcpdump src 192.168.1.100 &amp;&amp;<span class="hljs-built_in"> port </span>22 -w ssh_packets

</code></pre><h4><a href="#使用或"></a>使用“或”</h4>
<p>“或”会检查是否匹配命令所列条件中的其中一条，像这样：</p>
<pre><code class="hljs routeros">$ tcpdump src 192.168.1.100 <span class="hljs-keyword">or</span> dst 192.168.1.50 &amp;&amp;<span class="hljs-built_in"> port </span>22 -w ssh_packets
$ tcpdump<span class="hljs-built_in"> port </span>443 <span class="hljs-keyword">or</span> 80 -w http_packets

</code></pre><h4><a href="#使用非"></a>使用“非”</h4>
<p>当我们想表达不匹配某项条件时可以使用“非”，像这样：</p>
<pre><code class="hljs routeros">$ tcpdump -i eth0 src<span class="hljs-built_in"> port </span><span class="hljs-keyword">not</span> 22

</code></pre><p>这会捕获 eth0 上除了 22 号端口的所有通讯。</p>
<p>我们的教程至此就结束了，在本教程中我们讲解了如何安装并使用 <code>tcpdump</code> 来捕获网络数据包。如有任何疑问或建议，欢迎留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/learn-use-tcpdump-command-examples/">http://linuxtechlab.com/learn-use-tcpdump-command-examples/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过实例学习 tcpdump 命令

## 原文链接
[https://www.zcfy.cc/article/learn-how-to-use-tcpdump-command-with-examples](https://www.zcfy.cc/article/learn-how-to-use-tcpdump-command-with-examples)


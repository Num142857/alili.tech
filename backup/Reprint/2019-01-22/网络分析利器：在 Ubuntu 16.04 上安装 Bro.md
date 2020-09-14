---
title: '网络分析利器：在 Ubuntu 16.04 上安装 Bro' 
date: 2019-01-22 2:30:08
hidden: true
slug: o0qtzvwgb89
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#网络分析利器在-ubuntu-1604-上安装-bro"></a>网络分析利器：在 Ubuntu 16.04 上安装 Bro</h1>
<h3><a href="#简介bro-网络分析框架"></a>简介：Bro 网络分析框架</h3>
<p>Bro 是一个开源的网络分析框架，侧重于网络安全监控。这是一项长达 15 年的研究成果，被各大学、研究实验室、超级计算机中心和许多开放科学界广泛使用。它主要由伯克利国际计算机科学研究所和伊利诺伊大学厄巴纳-香槟分校的国家超级计算机应用中心开发。</p>
<p>Bro 的功能包括：</p>
<ul>
<li>Bro 的脚本语言支持针对站点定制监控策略</li>
<li>针对高性能网络</li>
<li>分析器支持许多协议，可以在应用层面实现高级语义分析</li>
<li>它保留了其所监控的网络的丰富的应用层统计信息</li>
<li>Bro 能够与其他应用程序接口实时地交换信息</li>
<li>它的日志全面地记录了一切信息，并提供网络活动的高级存档</li>
</ul>
<p>本教程将介绍如何从源代码构建，并在 Ubuntu 16.04 服务器上安装 Bro。</p>
<h3><a href="#准备工作"></a>准备工作</h3>
<p>Bro 有许多依赖文件:</p>
<ul>
<li>Libpcap (<a href="http://www.tcpdump.org/">http://www.tcpdump.org</a>)</li>
<li>OpenSSL 库 (<a href="http://www.openssl.org/">http://www.openssl.org</a>)</li>
<li>BIND8 库</li>
<li>Libz</li>
<li>Bash (BroControl 所需要)</li>
<li>Python 2.6+ (BroControl 所需要)</li>
</ul>
<p>从源代码构建还需要：</p>
<ul>
<li>CMake 2.8+</li>
<li>Make</li>
<li>GCC 4.8+ or Clang 3.3+</li>
<li>SWIG</li>
<li>GNU Bison</li>
<li>Flex</li>
<li>Libpcap headers</li>
<li>OpenSSL headers</li>
<li>zlib headers</li>
</ul>
<h3><a href="#起步"></a>起步</h3>
<p>首先，通过执行以下命令来安装所有必需的依赖项：</p>
<pre><code class="hljs q"># apt-<span class="hljs-built_in">get</span> install cmake make gcc g++ flex bison libpcap-<span class="hljs-built_in">dev</span> libssl-<span class="hljs-built_in">dev</span> python-<span class="hljs-built_in">dev</span> swig zlib1g-<span class="hljs-built_in">dev</span>

</code></pre><h4><a href="#安装定位-ip-地理位置的-geoip-数据库"></a>安装定位 IP 地理位置的 GeoIP 数据库</h4>
<p>Bro 使用 GeoIP 的定位地理位置。安装 IPv4 和 IPv6 版本：</p>
<pre><code class="hljs crystal">$ wget <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/geolite.maxmind.com/download</span><span class="hljs-regexp">/geoip/database</span><span class="hljs-regexp">/GeoLiteCity.dat.gz
$wget http:/</span><span class="hljs-regexp">/geolite.maxmind.com/download</span><span class="hljs-regexp">/geoip/database</span><span class="hljs-regexp">/GeoLiteCityv6-beta/</span>GeoLiteCityv6.dat.gz

</code></pre><p>解压这两个压缩包：</p>
<pre><code class="hljs stylus">$ gzip -d GeoLiteCity<span class="hljs-selector-class">.dat</span><span class="hljs-selector-class">.gz</span>
$ gzip -d GeoLiteCityv6<span class="hljs-selector-class">.dat</span><span class="hljs-selector-class">.gz</span>

</code></pre><p>将解压后的文件移动到 <code>/usr/share/GeoIP</code> 目录下：</p>
<pre><code class="hljs gradle"># mvGeoLiteCity.dat <span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/GeoIP/</span>GeoIPCity.dat
# mv GeoLiteCityv6.dat <span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/GeoIP/</span>GeoIPCityv6.dat

</code></pre><p>现在，可以从源代码构建 Bro 了。</p>
<h3><a href="#构建-bro"></a>构建 Bro</h3>
<p>最新的 Bro 开发版本可以通过 <code>git</code> 仓库获得。执行以下命令：</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">--recursive</span> git://git.bro.org/bro

</code></pre><p>转到克隆下来的目录，然后使用以下命令就可以简单地构建 Bro：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> bro</span>
<span class="hljs-meta">$</span><span class="bash"> ./configure</span>
<span class="hljs-meta">$</span><span class="bash"> make</span>

</code></pre><p><code>make</code> 命令需要一些时间来构建一切。确切的时间取决于服务器的性能。</p>
<p>可以使用一些参数来执行 <code>configure</code> 脚本，以指定要构建的依赖关系，特别是 <code>--with-*</code> 选项。</p>
<h3><a href="#安装-bro"></a>安装 Bro</h3>
<p>在克隆的 <code>bro</code> 目录中执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> make install</span>

</code></pre><p>默认安装路径为 <code>/usr/local/bro</code>。</p>
<h3><a href="#配置-bro"></a>配置 Bro</h3>
<p>Bro 的配置文件位于 <code>/usr/local/bro/etc</code> 目录下。 这里有三个文件:</p>
<ul>
<li><code>node.cfg</code>，用于配置要监视的单个节点（或多个节点）。</li>
<li><code>broctl.cfg</code>，BroControl 的配置文件。</li>
<li><code>networks.cgf</code>，包含一个使用 CIDR 标记法表示的网络列表。</li>
</ul>
<h4><a href="#配置邮件设置"></a>配置邮件设置</h4>
<p>打开 <code>broctl.cfg</code> 配置文件:</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$EDITOR</span> /usr/<span class="hljs-built_in">local</span>/bro/etc/broctl.cfg</span>

</code></pre><p>查看 <code>Mail Options</code> 选项，并编辑 <code>MailTo</code> 行如下:</p>
<pre><code class="hljs armasm"># Recipient <span class="hljs-keyword">address </span>for emails sent out <span class="hljs-keyword">by </span><span class="hljs-keyword">Bro </span><span class="hljs-keyword">and </span><span class="hljs-keyword">BroControl
</span><span class="hljs-symbol">MailTo</span> = admin<span class="hljs-comment">@example.com</span>

</code></pre><p>保存并关闭。还有许多其他选项，但在大多数情况下，默认值就足够好了。</p>
<h4><a href="#选择要监视的节点"></a>选择要监视的节点</h4>
<p>开箱即用，Bro 被配置为以独立模式运行。在本教程中，我们就是做一个独立的安装，所以没有必要改变。但是，也请查看 <code>node.cfg</code> 配置文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$EDITOR</span> /usr/<span class="hljs-built_in">local</span>/bro/etc/node.cfg</span>

</code></pre><p>在 <code>[bro]</code> 部分，你应该看到这样的东西：</p>
<pre><code class="hljs ini"><span class="hljs-section">[bro]</span>
<span class="hljs-attr">type</span>=standalone
<span class="hljs-attr">host</span>=localhost
<span class="hljs-attr">interface</span>=eth0

</code></pre><p>请确保 <code>inferface</code> 与 Ubuntu 16.04 服务器的公网接口相匹配。</p>
<p>保存并退出。</p>
<h4><a href="#配置监视节点的网络"></a>配置监视节点的网络</h4>
<p>最后一个要编辑的文件是 <code>network.cfg</code>。使用文本编辑器打开它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$EDITOR</span> /usr/<span class="hljs-built_in">local</span>/bro/etc/networks.cfg</span>

</code></pre><p>默认情况下，你应该看到以下内容：</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># List of local networks in CIDR notation, optionally followed by a</span>
<span class="hljs-comment"># descriptive tag.</span>
<span class="hljs-comment"># For example, "10.0.0.0/8" or "fe80::/64" are valid prefixes.</span>

10.0.0.0/8          Private<span class="hljs-built_in"> IP </span>space
172.16.0.0/12       Private<span class="hljs-built_in"> IP </span>space
192.168.0.0/16      Private<span class="hljs-built_in"> IP </span>space

</code></pre><p>删除这三个条目（这只是如何使用此文件的示例），并输入服务器的公用和专用 IP 空间，格式如下：</p>
<pre><code class="hljs routeros">X.X.X.X/X        Public<span class="hljs-built_in"> IP </span>space
X.X.X.X/X        Private<span class="hljs-built_in"> IP </span>space

</code></pre><p>保存并退出。</p>
<h3><a href="#使用-brocontrol-管理-bro-的安装"></a>使用 BroControl 管理 Bro 的安装</h3>
<p>管理 Bro 需要使用 BroControl，它支持交互式 shell 和命令行工具两种形式。启动该 shell：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> /usr/<span class="hljs-built_in">local</span>/bro/bin/broctl</span>

</code></pre><p>要想使用命令行工具，只需将参数传递给上一个命令，例如：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> /usr/<span class="hljs-built_in">local</span>/bro/bin/broctl status</span>

</code></pre><p>这将通过显示以下的输出来检查 Bro 的状态：</p>
<pre><code class="hljs routeros">Name        <span class="hljs-built_in"> Type </span>      Host          Status    Pid    Started
bro          standalone localhost     running   6807   20 Jul 12:30:50

</code></pre><h3><a href="#结论"></a>结论</h3>
<p>这是一篇 Bro 的安装教程。我们使用基于源代码的安装，因为它是获得可用的最新版本的最有效的方法，但是该网络分析框架也可以下载预构建的二进制格式文件。</p>
<p>下次见！</p>
<hr>
<p>via: <a href="https://www.unixmen.com/how-to-install-bro-ubuntu-1604/">https://www.unixmen.com/how-to-install-bro-ubuntu-1604/</a></p>
<p>作者：<a href="https://www.unixmen.com/author/tutan/">Giuseppe Molica</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
网络分析利器：在 Ubuntu 16.04 上安装 Bro

## 原文链接
[https://www.zcfy.cc/article/network-analysis-how-to-install-bro-on-ubuntu-16-04](https://www.zcfy.cc/article/network-analysis-how-to-install-bro-on-ubuntu-16-04)


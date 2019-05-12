---
title: '在 Ubuntu 中使用 NTP 进行时间同步' 
date: 2019-01-24 2:30:11
hidden: true
slug: 6637i94gfh3
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-ubuntu-中使用-ntp-进行时间同步"></a>在 Ubuntu 中使用 NTP 进行时间同步</h1>
<p>NTP 是通过网络来同步时间的一种 TCP/IP 协议。通常客户端向服务器请求当前的时间，并根据结果来设置其时钟。</p>
<p>这个描述是挺简单的，实现这一功能却是极为复杂的 - 首先要有多层 NTP 服务器，第一层 NTP 服务器连接原子时钟，第二层、第三层服务器则担起负载均衡的责任，以处理因特网传来的所有请求。另外，客户端可能也超乎你想象的复杂 - 它必须排除通讯延迟，调整时间的同时不干扰其它在服务器中运行的进程。幸运的是，所有的这些复杂性都进行了封装，你是不可见也不需要见到的。</p>
<p>在 Ubuntu 中，是使用 <code>ntpdate</code> 和 <code>ntpd</code> 来同步时间的。</p>
<ul>
<li><a href="#timedatectl">timedatectl</a></li>
<li><a href="#timesyncd">timesyncd</a></li>
<li><a href="#ntpdate">ntpdate</a></li>
<li><a href="#timeservers">timeservers</a></li>
<li><a href="#ntpd">ntpd</a></li>
<li><a href="#installation">安装</a></li>
<li><a href="#configuration">配置</a></li>
<li><a href="#status">View status</a></li>
<li><a href="#Support">PPS Support</a></li>
<li><a href="#reference">参考资料</a></li>
</ul>
<h3><a href="#timedatectl"></a>timedatectl</h3>
<p>在最新的 Ubuntu 版本中，<code>timedatectl</code> 替代了老旧的 <code>ntpdate</code>。默认情况下，<code>timedatectl</code> 在系统启动的时候会立刻同步时间，并在稍后网络连接激活后通过 socket 再次检查一次。</p>
<p>如果已安装了 <code>ntpdate</code> / <code>ntp</code>，<code>timedatectl</code> 会退而让你使用之前的设置。这样确保了两个时间同步服务不会相互冲突，同时在你升级的时候还保留原本的行为和配置。但这也意味着从旧版本的发行版升级时 <code>ntp</code>/<code>ntpdate</code> 仍会安装，因此会导致新的基于 systemd 的时间服务被禁用。</p>
<h3><a href="#timesyncd"></a>timesyncd</h3>
<p>在最新的 Ubuntu 版本中，<code>timesyncd</code> 替代了 <code>ntpd</code> 的客户端的部分。默认情况下 <code>timesyncd</code> 会定期检测并同步时间。它还会在本地存储更新的时间，以便在系统重启时做时间单步调整。</p>
<p>通过 <code>timedatectl</code> 和 <code>timesyncd</code> 设置的当前时间状态和时间配置，可以使用 <code>timedatectl status</code> 命令来进行确认。</p>
<pre><code class="hljs routeros">timedatectl status
      Local time: Fri 2016-04-29 06:32:57 UTC
  Universal time: Fri 2016-04-29 06:32:57 UTC
        RTC time: Fri 2016-04-29 07:44:02
       Time zone: Etc/UTC (UTC, +0000)
<span class="hljs-built_in"> Network </span>time on: <span class="hljs-literal">yes</span><span class="hljs-built_in">
NTP </span>synchronized: <span class="hljs-literal">no</span>
 RTC <span class="hljs-keyword">in</span> local TZ: <span class="hljs-literal">no</span>

</code></pre><p>如果安装了 NTP，并用它替代 <code>timedatectl</code> 来同步时间，则 <code>NTP synchronized</code> 将被设置为 <code>yes</code>。</p>
<p><code>timedatectl</code> 和 <code>timesyncd</code> 用来获取时间的 nameserver 可以通过 <code>/etc/systemd/timesyncd.conf</code> 来指定，另外在 <code>/etc/systemd/timesyncd.conf.d/</code> 下还有灵活的附加配置文件。</p>
<h3><a href="#ntpdate"></a>ntpdate</h3>
<p>由于 <code>timedatectl</code> 的存在，各发行版已经弃用了 <code>ntpdate</code>，默认不再进行安装。如果你安装了，它会在系统启动的时候根据 Ubuntu 的 NTP 服务器来设置你电脑的时间。之后每当一个新的网络接口启动时，它就会重新尝试同步时间 —— 在这期间只要其涵盖的时间差不是太大，它就会慢慢偏移时间。该行为可以通过 <code>-B</code>/<code>-b</code> 开关来进行控制。</p>
<pre><code class="hljs stylus">ntpdate ntp<span class="hljs-selector-class">.ubuntu</span><span class="hljs-selector-class">.com</span>

</code></pre><h3><a href="#时间服务器"></a>时间服务器</h3>
<p>默认情况下，基于 systemd 的工具都是从 <code>ntp.ubuntu.com</code> 请求时间同步的。经典的基于 <code>ntpd</code> 的服务基本上都是使用 <code>[0-3].ubuntu.pool.ntp.org</code> 池中的 <code>2.ubuntu.pool.ntp.org</code>，还有 <code>ntp.ubuntu.com</code>，此外需要的话还支持 IPv6。如果想强制使用 IPv6，可以使用 <code>ipv6.ntp.ubuntu.com</code>，不过这并非默认配置。</p>
<h3><a href="#ntpd"></a>ntpd</h3>
<p>ntp 的守护进程 <code>ntpd</code> 会计算你的系统时钟的时间偏移量并且持续的进行调整，所以不会出现时间差距较大的更正，比如说，不会导致不连续的日志。该进程只花费少量的进程资源和内存，但对于现代的服务器来说实在是微不足道的了。</p>
<h3><a href="#安装"></a>安装</h3>
<p>要安装 <code>ntpd</code>，在终端命令行中输入：</p>
<pre><code class="hljs routeros">sudo apt install<span class="hljs-built_in"> ntp
</span>
</code></pre><h3><a href="#配置"></a>配置</h3>
<p>编辑 <code>/etc/ntp.conf</code> —— 增加/移除 <code>server</code> 行。默认配置有以下服务器：</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># Use servers from the NTP Pool Project. Approved by Ubuntu Technical Board</span>
<span class="hljs-comment"># on 2011-02-08 (LP: #104525). See http://www.pool.ntp.org/join.html for</span>
<span class="hljs-comment"># more information.</span><span class="hljs-built_in">
server </span>0.ubuntu.pool.ntp.org<span class="hljs-built_in">
server </span>1.ubuntu.pool.ntp.org<span class="hljs-built_in">
server </span>2.ubuntu.pool.ntp.org<span class="hljs-built_in">
server </span>3.ubuntu.pool.ntp.org

</code></pre><p>修改配置文件之后，你需要重新加载 <code>ntpd</code>：</p>
<pre><code class="hljs stylus">sudo systemctl reload ntp<span class="hljs-selector-class">.service</span>

</code></pre><h3><a href="#查看状态"></a>查看状态</h3>
<p>使用 <code>ntpq</code> 来查看更多信息：</p>
<pre><code class="hljs lsl"># sudo ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
+stratum2<span class="hljs-number">-2.</span>NTP. <span class="hljs-number">129.70</span><span class="hljs-number">.130</span><span class="hljs-number">.70</span>    <span class="hljs-number">2</span> u    <span class="hljs-number">5</span>   <span class="hljs-number">64</span>  <span class="hljs-number">377</span>   <span class="hljs-number">68.461</span>  <span class="hljs-number">-44.274</span> <span class="hljs-number">110.334</span>
+ntp2.m-online.n <span class="hljs-number">212.18</span><span class="hljs-number">.1</span><span class="hljs-number">.106</span>     <span class="hljs-number">2</span> u    <span class="hljs-number">5</span>   <span class="hljs-number">64</span>  <span class="hljs-number">377</span>   <span class="hljs-number">54.629</span>  <span class="hljs-number">-27.318</span>  <span class="hljs-number">78.882</span>
*<span class="hljs-number">145.253</span><span class="hljs-number">.66</span><span class="hljs-number">.170</span>  .DCFa.           <span class="hljs-number">1</span> u   <span class="hljs-number">10</span>   <span class="hljs-number">64</span>  <span class="hljs-number">377</span>   <span class="hljs-number">83.607</span>  <span class="hljs-number">-30.159</span>  <span class="hljs-number">68.343</span>
+stratum2<span class="hljs-number">-3.</span>NTP. <span class="hljs-number">129.70</span><span class="hljs-number">.130</span><span class="hljs-number">.70</span>    <span class="hljs-number">2</span> u    <span class="hljs-number">5</span>   <span class="hljs-number">64</span>  <span class="hljs-number">357</span>   <span class="hljs-number">68.795</span>  <span class="hljs-number">-68.168</span> <span class="hljs-number">104.612</span>
+europium.canoni <span class="hljs-number">193.79</span><span class="hljs-number">.237</span><span class="hljs-number">.14</span>    <span class="hljs-number">2</span> u   <span class="hljs-number">63</span>   <span class="hljs-number">64</span>  <span class="hljs-number">337</span>   <span class="hljs-number">81.534</span>  <span class="hljs-number">-67.968</span>  <span class="hljs-number">92.792</span>

</code></pre><h3><a href="#pps-支持"></a>PPS 支持</h3>
<p>从 Ubuntu 16.04 开始，ntp 支持 PPS 规范，给 ntp 提供了本地时间源，以提供更高的精度。查看下边列出的链接来获取更多配置信息。</p>
<h3><a href="#参考资料"></a>参考资料</h3>
<ul>
<li><p>参考 <a href="https://help.ubuntu.com/community/UbuntuTime">Ubuntu Time</a> wiki 页来获取更多信息</p>
</li>
<li><p><a href="http://www.ntp.org/">ntp.org，网络时间协议项目主页</a></p>
</li>
<li><p><a href="http://www.ntp.org/ntpfaq/NTP-s-config-adv.htm#S-CONFIG-ADV-PPS">ntp.org，关于配置 PPS 的 FAQ</a></p>
</li>
</ul>
<hr>
<p>via: <a href="https://help.ubuntu.com/lts/serverguide/NTP.html">https://help.ubuntu.com/lts/serverguide/NTP.html</a></p>
<p>作者：<a href="https://help.ubuntu.com/lts/serverguide/NTP.html">Ubuntu</a> 译者：<a href="https://github.com/GHLandy">GHLandy</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Ubuntu 中使用 NTP 进行时间同步

## 原文链接
[https://www.zcfy.cc/article/using-the-ntp-time-synchronization](https://www.zcfy.cc/article/using-the-ntp-time-synchronization)


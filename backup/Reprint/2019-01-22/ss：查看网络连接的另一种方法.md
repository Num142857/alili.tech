---
title: 'ss：查看网络连接的另一种方法' 
date: 2019-01-22 2:30:08
hidden: true
slug: vd3jm5r2f2i
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ss查看网络连接的另一种方法"></a>ss：查看网络连接的另一种方法</h1>
<p>在之前的文章中，我提到过 <code>ss</code>，它是 iproute2 包附带的另一个工具，允许你查询 socket 的有关统计信息。可以完成 <code>netstat</code> 同样的任务，但是，<code>ss</code> 稍微快一点而且命令更简短。</p>
<p>直接输入 <code>ss</code>，默认会显示与 <code>netstat</code> 同样的内容，并且输入类似的参数可以获取你想要的类似输出。例如：</p>
<pre><code class="hljs x86asm">$ <span class="hljs-built_in">ss</span> -t
State       Recv-Q Send-Q       Local Address:Port                        Peer Address:Port
ESTAB       <span class="hljs-number">0</span>      <span class="hljs-number">0</span>                <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:postgresql                     <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">48154</span>
ESTAB       <span class="hljs-number">0</span>      <span class="hljs-number">0</span>            <span class="hljs-number">192.168</span><span class="hljs-meta">.0</span><span class="hljs-meta">.136</span>:<span class="hljs-number">35296</span>                      <span class="hljs-number">192.168</span><span class="hljs-meta">.0</span><span class="hljs-meta">.120</span>:<span class="hljs-number">8009</span>
ESTAB       <span class="hljs-number">0</span>      <span class="hljs-number">0</span>            <span class="hljs-number">192.168</span><span class="hljs-meta">.0</span><span class="hljs-meta">.136</span>:<span class="hljs-number">47574</span>                     <span class="hljs-number">173.194</span><span class="hljs-meta">.74</span><span class="hljs-meta">.189</span>:https
[…]

</code></pre><p><code>ss -t</code> 只显示 TCP 连接。<code>ss -u</code> 用于显示 UDP 连接，<code>-l</code> 参数只会显示监听的端口，而且可以进一步过滤到任何想要的信息。</p>
<p>我并没有测试所有可用参数，但是你甚至可以使用 <code>-K</code> 强制关闭 socket。</p>
<p><code>ss</code> 真正耀眼的地方是其内置的过滤能力。让我们列出所有端口为 22（ssh）的连接：</p>
<pre><code class="hljs routeros">$ ss state all sport = :ssh
Netid State      Recv-Q Send-Q     Local Address:Port                     <span class="hljs-built_in"> Peer </span>Address:Port
tcp   LISTEN     0      128                    *:ssh                                  *:*
tcp   ESTAB      0      0          192.168.0.136:ssh                      192.168.0.102:46540
tcp   LISTEN     0      128                   :::ssh                                 :::*

</code></pre><p>如果只想看已建立的 socket（排除了 <em>listening</em> 和 <em>closed</em> ）：</p>
<pre><code class="hljs routeros">$ ss state connected sport = :ssh
Netid State      Recv-Q Send-Q     Local Address:Port                     <span class="hljs-built_in"> Peer </span>Address:Port
tcp   ESTAB      0      0          192.168.0.136:ssh                      192.168.0.102:46540

</code></pre><p>类似的，可以列出指定的 host 或者 ip 段。例如，列出到达 74.125.0.0/16 子网的连接，这个子网属于 Google：</p>
<pre><code class="hljs x86asm">$ <span class="hljs-built_in">ss</span> state all dst <span class="hljs-number">74.125</span><span class="hljs-meta">.0</span><span class="hljs-meta">.0</span>/<span class="hljs-number">16</span>
Netid State      Recv-Q Send-Q     Local Address:Port                      Peer Address:Port
tcp   ESTAB      <span class="hljs-number">0</span>      <span class="hljs-number">0</span>          <span class="hljs-number">192.168</span><span class="hljs-meta">.0</span><span class="hljs-meta">.136</span>:<span class="hljs-number">33616</span>                   <span class="hljs-number">74.125</span><span class="hljs-meta">.142</span><span class="hljs-meta">.189</span>:https
tcp   ESTAB      <span class="hljs-number">0</span>      <span class="hljs-number">0</span>          <span class="hljs-number">192.168</span><span class="hljs-meta">.0</span><span class="hljs-meta">.136</span>:<span class="hljs-number">42034</span>                    <span class="hljs-number">74.125</span><span class="hljs-meta">.70</span><span class="hljs-meta">.189</span>:https
tcp   ESTAB      <span class="hljs-number">0</span>      <span class="hljs-number">0</span>          <span class="hljs-number">192.168</span><span class="hljs-meta">.0</span><span class="hljs-meta">.136</span>:<span class="hljs-number">57408</span>                   <span class="hljs-number">74.125</span><span class="hljs-meta">.202</span><span class="hljs-meta">.189</span>:https

</code></pre><p><code>ss</code>与 iptables 的语法非常相同，如果已经熟悉了其语法，<code>ss</code> 非常容易上手。也可以安装 iproute2-doc 包， 通过 <code>/usr/share/doc/iproute2-doc/ss.html</code> 获得完整文档。</p>
<p>还不快试试! 你就可以知道它有多棒。无论如何，让我输入的字符越少我越高兴。</p>
<hr>
<p>via: <a href="https://insights.ubuntu.com/2017/07/25/ss-another-way-to-get-socket-statistics/">https://insights.ubuntu.com/2017/07/25/ss-another-way-to-get-socket-statistics/</a></p>
<p>作者：<a href="https://insights.ubuntu.com/author/mathieu-trudel-lapierre/">Mathieu Trudel-Lapierre</a> 译者：<a href="https://vicyu.com">VicYu</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ss：查看网络连接的另一种方法

## 原文链接
[https://www.zcfy.cc/article/ss-another-way-to-get-socket-statistics](https://www.zcfy.cc/article/ss-another-way-to-get-socket-statistics)


---
title: 关于 BPF 和 eBPF 的笔记
hidden: true
categories: [reprint]
slug: 389eef2b
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h1><a href="#关于-bpf-和-ebpf-的笔记"></a>关于 BPF 和 eBPF 的笔记</h1>
<p>今天，我喜欢的 meetup 网站上有一篇我超爱的文章！<a href="http://suchakra.in/">Suchakra Sharma</a>（<a href="https://twitter.com/tuxology">@tuxology</a> 在 twitter/github）的一篇非常棒的关于传统 BPF 和在 Linux 中最新加入的 eBPF 的讨论文章，正是它促使我想去写一个 eBPF 的程序！</p>
<p>这篇文章就是 —— <a href="http://www.vodun.org/papers/net-papers/van_jacobson_the_bpf_packet_filter.pdf">BSD 包过滤器：一个新的用户级包捕获架构</a></p>
<p>我想在讨论的基础上去写一些笔记，因为，我觉得它超级棒！</p>
<p>开始前，这里有个 <a href="https://speakerdeck.com/tuxology/the-bsd-packet-filter">幻灯片</a> 和一个 <a href="http://step.polymtl.ca/%7Esuchakra/PWL-Jun28-MTL.pdf">pdf</a>。这个 pdf 非常好，结束的位置有一些链接，在 PDF 中你可以直接点击这个链接。</p>
<h3><a href="#什么是-bpf"></a>什么是 BPF？</h3>
<p>在 BPF 出现之前，如果你想去做包过滤，你必须拷贝所有的包到用户空间，然后才能去过滤它们（使用 “tap”）。</p>
<p>这样做存在两个问题：</p>
<ol>
<li>如果你在用户空间中过滤，意味着你将拷贝所有的包到用户空间，拷贝数据的代价是很昂贵的。</li>
<li>使用的过滤算法很低效。</li>
</ol>
<p>问题 #1 的解决方法似乎很明显，就是将过滤逻辑移到内核中。（虽然具体实现的细节并没有明确，我们将在稍后讨论）</p>
<p>但是，为什么过滤算法会很低效？</p>
<p>如果你运行 <code>tcpdump host foo</code>，它实际上运行了一个相当复杂的查询，用下图的这个树来描述它：</p>
<p><a href="https://camo.githubusercontent.com/51721a6b74c8f092d56c1c7381c51350d22d5d04/68747470733a2f2f6a766e732e63612f696d616765732f6270662d312e706e67"><img src="https://p0.ssl.qhimg.com/t01b03a8b8c53751882.png" alt=""></a></p>
<p>评估这个树有点复杂。因此，可以用一种更简单的方式来表示这个树，像这样：</p>
<p><a href="https://camo.githubusercontent.com/25ad8890a999867e7424a86851dbe52f8ed50e8c/68747470733a2f2f6a766e732e63612f696d616765732f6270662d322e706e67"><img src="https://p0.ssl.qhimg.com/t018b81fbbfc4e22c98.png" alt=""></a></p>
<p>然后，如果你设置 <code>ether.type = IP</code> 和  <code>ip.src = foo</code>，你必然明白匹配的包是 <code>host foo</code>，你也不用去检查任何其它的东西了。因此，这个数据结构（它们称为“控制流图” ，或者 “CFG”）是表示你真实希望去执行匹配检查的程序的最佳方法，而不是用前面的树。</p>
<h3><a href="#为什么-bpf-要工作在内核中"></a>为什么 BPF 要工作在内核中</h3>
<p>这里的关键点是，包仅仅是个字节的数组。BPF 程序是运行在这些字节的数组之上。它们不允许有循环（loop），但是，它们 _可以_  有聪明的办法知道 IP 包头（IPv6 和 IPv4 长度是不同的）以及基于它们的长度来找到 TCP 端口：</p>
<pre><code class="hljs routeros">x = ip_header_length<span class="hljs-built_in">
port </span>= *(packet_start + x + port_offset) 

</code></pre><p>（看起来不一样，其实它们基本上都相同）。在这个论文/幻灯片上有一个非常详细的虚拟机的描述，因此，我不打算解释它。</p>
<p>当你运行 <code>tcpdump host foo</code> 后，这时发生了什么？就我的理解，应该是如下的过程。</p>
<ol>
<li>转换 <code>host foo</code> 为一个高效的 DAG 规则</li>
<li>转换那个 DAG 规则为 BPF 虚拟机的一个 BPF 程序（BPF 字节码）</li>
<li>发送 BPF 字节码到 Linux 内核，由 Linux 内核验证它</li>
<li>编译这个 BPF 字节码程序为一个原生native代码。例如，这是个<a href="https://github.com/torvalds/linux/blob/v4.10/arch/arm/net/bpf_jit_32.c#L512">ARM 上的 JIT 代码</a> 以及 <a href="https://github.com/torvalds/linux/blob/v3.18/arch/x86/net/bpf_jit_comp.c#L189">x86</a> 的机器码</li>
<li>当包进入时，Linux 运行原生代码去决定是否过滤这个包。对于每个需要去处理的包，它通常仅需运行 100 - 200 个 CPU 指令就可以完成，这个速度是非常快的！</li>
</ol>
<h3><a href="#现状ebpf"></a>现状：eBPF</h3>
<p>毕竟 BPF 出现已经有很长的时间了！现在，我们可以拥有一个更加令人激动的东西，它就是 eBPF。我以前听说过 eBPF，但是，我觉得像这样把这些片断拼在一起更好（我在 4 月份的 netdev 上我写了这篇 <a href="https://jvns.ca/blog/2017/04/07/xdp-bpf-tutorial/">XDP &amp; eBPF 的文章</a>回复）</p>
<p>关于 eBPF 的一些事实是：</p>
<ul>
<li>eBPF 程序有它们自己的字节码语言，并且从那个字节码语言编译成内核原生代码，就像 BPF 程序一样</li>
<li>eBPF 运行在内核中</li>
<li>eBPF 程序不能随心所欲的访问内核内存。而是通过内核提供的函数去取得一些受严格限制的所需要的内容的子集</li>
<li>它们  _可以_  与用户空间的程序通过 BPF 映射进行通讯</li>
<li>这是 Linux 3.18 的 <code>bpf</code> 系统调用</li>
</ul>
<h3><a href="#kprobes-和-ebpf"></a>kprobes 和 eBPF</h3>
<p>你可以在 Linux 内核中挑选一个函数（任意函数），然后运行一个你写的每次该函数被调用时都运行的程序。这样看起来是不是很神奇。</p>
<p>例如：这里有一个 <a href="https://github.com/iovisor/bcc/blob/0c8c179fc1283600887efa46fe428022efc4151b/examples/tracing/disksnoop.py">名为 disksnoop 的 BPF 程序</a>，它的功能是当你开始/完成写入一个块到磁盘时，触发它执行跟踪。下图是它的代码片断：</p>
<pre><code class="hljs cs">BPF_HASH(start, <span class="hljs-keyword">struct</span> request *);
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">trace_start</span>(<span class="hljs-params"><span class="hljs-keyword">struct</span> pt_regs *ctx, <span class="hljs-keyword">struct</span> request *req</span>) </span>{
    <span class="hljs-comment">// stash start timestamp by request ptr</span>
    u64 ts = bpf_ktime_get_ns();
    start.update(&amp;req, &amp;ts);
}
...
b.attach_kprobe(<span class="hljs-keyword">event</span>=<span class="hljs-string">"blk_start_request"</span>, fn_name=<span class="hljs-string">"trace_start"</span>)
b.attach_kprobe(<span class="hljs-keyword">event</span>=<span class="hljs-string">"blk_mq_start_request"</span>, fn_name=<span class="hljs-string">"trace_start"</span>)


</code></pre><p>本质上它声明一个 BPF 哈希（它的作用是当请求开始/完成时，这个程序去触发跟踪），一个名为 <code>trace_start</code> 的函数将被编译进 BPF 字节码，然后附加 <code>trace_start</code> 到内核函数 <code>blk_start_request</code> 上。</p>
<p>这里使用的是 <code>bcc</code> 框架，它可以让你写 Python 式的程序去生成 BPF 代码。你可以在 <a href="https://github.com/iovisor/bcc">https://github.com/iovisor/bcc</a> 找到它（那里有非常多的示例程序）。</p>
<h3><a href="#uprobes-和-ebpf"></a>uprobes 和 eBPF</h3>
<p>因为我知道可以附加 eBPF 程序到内核函数上，但是，我不知道能否将 eBPF 程序附加到用户空间函数上！那会有更多令人激动的事情。这是 <a href="https://github.com/iovisor/bcc/blob/00f662dbea87a071714913e5c7382687fef6a508/tests/lua/test_uprobes.lua">在 Python 中使用一个 eBPF 程序去计数 malloc 调用的示例</a>。</p>
<h3><a href="#附加-ebpf-程序时应该考虑的事情"></a>附加 eBPF 程序时应该考虑的事情</h3>
<ul>
<li>带 XDP 的网卡（我之前写过关于这方面的文章）</li>
<li>tc egress/ingress （在网络栈上）</li>
<li>kprobes（任意内核函数）</li>
<li>uprobes（很明显，任意用户空间函数？？像带调试符号的任意 C 程序）</li>
<li>probes 是为 dtrace 构建的名为 “USDT probes” 的探针（像 <a href="https://dev.mysql.com/doc/refman/5.7/en/dba-dtrace-ref-query.html">这些 mysql 探针</a>)。这是一个 <a href="https://github.com/iovisor/bcc/blob/master/examples/tracing/mysqld_query.py">使用 dtrace 探针的示例程序</a></li>
<li><a href="http://blogs.microsoft.co.il/sasha/2016/03/31/probing-the-jvm-with-bpfbcc/">JVM</a></li>
<li>跟踪点</li>
<li>seccomp / landlock 安全相关的事情</li>
<li>等等</li>
</ul>
<h3><a href="#这个讨论超级棒"></a>这个讨论超级棒</h3>
<p>在幻灯片里有很多非常好的链接，并且在  iovisor 仓库里有个 <a href="https://github.com/iovisor/bcc/blob/master/LINKS.md">LINKS.md</a>。虽然现在已经很晚了，但是我马上要去写我的第一个 eBPF 程序了！</p>
<hr>
<p>via: <a href="https://jvns.ca/blog/2017/06/28/notes-on-bpf---ebpf/">https://jvns.ca/blog/2017/06/28/notes-on-bpf---ebpf/</a></p>
<p>作者：<a href="https://jvns.ca/">Julia Evans</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/notes-on-bpf-and-ebpf](https://www.zcfy.cc/article/notes-on-bpf-and-ebpf)
原文标题: 关于 BPF 和 eBPF 的笔记
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

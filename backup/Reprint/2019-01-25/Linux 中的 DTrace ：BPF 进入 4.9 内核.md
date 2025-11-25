---
title: 'Linux 中的 DTrace ：BPF 进入 4.9 内核' 
date: 2019-01-25 2:30:23
hidden: true
slug: jjzixyvvoi
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-中的-dtrace-bpf-进入-49-内核"></a>Linux 中的 DTrace ：BPF 进入 4.9 内核</h1>
<p>随着 BPF 追踪系统（基于时间采样）最后一个主要功能被合并至 Linux 4.9-rc1 版本的内核中，现在 Linux 内核拥有类似 DTrace 的原生追踪功能。DTrace 是 Solaris 系统中的高级追踪器。对于长期使用 DTrace 的用户和专家，这将是一个振奋人心的里程碑！现在在 Linux 系统上，你可以在生产环境中使用安全的、低负载的定制追踪系统，通过执行时间的柱状图和频率统计等信息，分析应用的性能以及内核。</p>
<p>用于 Linux 的追踪项目有很多，但是这个最终被合并进 Linux 内核的技术从一开始就根本不是一个追踪项目：它是最开始是用于伯克利包过滤器（Berkeley Packet Filter）（BPF）的增强功能。这些补丁允许 BPF 重定向数据包，从而创建软件定义网络（SDN）。久而久之，对事件追踪的支持就被添加进来了，使得程序追踪可用于 Linux 系统。</p>
<p>尽管目前 BPF 没有像 DTrace 一样的高级语言，但它所提供的前端已经足够让我创建很多 BPF 工具了，其中有些是基于我以前的 <a href="https://github.com/opendtrace/toolkit">DTraceToolkit</a>。这个帖子将告诉你怎么去用这些 BPF 提供的前端工具，以及畅谈这项技术将会何去何从。</p>
<h3><a href="#示例"></a>示例</h3>
<p>我已经将基于 BPF 的追踪工具添加到了开源的 <a href="https://github.com/iovisor/bcc">bcc</a> 项目里（感谢 PLUMgrid 公司的 Brenden Blanco 带领 bcc 项目的发展）。详见 <a href="https://github.com/iovisor/bcc/blob/master/INSTALL.md">bcc 安装</a> 手册。它会在 <code>/usr/share/bcc/tools</code> 目录下添加一系列工具，包括接下来的那些工具。</p>
<p>捕获新进程：</p>
<pre><code class="hljs lsl"># execsnoop
PCOMM            PID    RET ARGS
bash             <span class="hljs-number">15887</span>    <span class="hljs-number">0</span> /usr/bin/man ls
preconv          <span class="hljs-number">15894</span>    <span class="hljs-number">0</span> /usr/bin/preconv -e UTF<span class="hljs-number">-8</span>
man              <span class="hljs-number">15896</span>    <span class="hljs-number">0</span> /usr/bin/tbl
man              <span class="hljs-number">15897</span>    <span class="hljs-number">0</span> /usr/bin/nroff -mandoc -rLL=<span class="hljs-number">169</span>n -rLT=<span class="hljs-number">169</span>n -Tutf8
man              <span class="hljs-number">15898</span>    <span class="hljs-number">0</span> /usr/bin/pager -s
nroff            <span class="hljs-number">15900</span>    <span class="hljs-number">0</span> /usr/bin/locale charmap
nroff            <span class="hljs-number">15901</span>    <span class="hljs-number">0</span> /usr/bin/groff -mtty-char -Tutf8 -mandoc -rLL=<span class="hljs-number">169</span>n -rLT=<span class="hljs-number">169</span>n
groff            <span class="hljs-number">15902</span>    <span class="hljs-number">0</span> /usr/bin/troff -mtty-char -mandoc -rLL=<span class="hljs-number">169</span>n -rLT=<span class="hljs-number">169</span>n -Tutf8
groff            <span class="hljs-number">15903</span>    <span class="hljs-number">0</span> /usr/bin/grotty

</code></pre><p>硬盘 I/O 延迟的柱状图：</p>
<pre><code class="hljs tap"><span class="hljs-comment"># biolatency -m</span>
Tracing block device I/O... Hit Ctrl-C to end.
^C
     msecs           : count     distribution
      <span class="hljs-number"> 0 </span>-&gt;<span class="hljs-number"> 1 </span>       :<span class="hljs-number"> 96 </span>      |************************************  |
      <span class="hljs-number"> 2 </span>-&gt;<span class="hljs-number"> 3 </span>       :<span class="hljs-number"> 25 </span>      |*********                             |
      <span class="hljs-number"> 4 </span>-&gt;<span class="hljs-number"> 7 </span>       :<span class="hljs-number"> 29 </span>      |***********                           |
      <span class="hljs-number"> 8 </span>-&gt;<span class="hljs-number"> 15 </span>      :<span class="hljs-number"> 62 </span>      |***********************               |
     <span class="hljs-number"> 16 </span>-&gt;<span class="hljs-number"> 31 </span>      :<span class="hljs-number"> 100 </span>     |**************************************|
     <span class="hljs-number"> 32 </span>-&gt;<span class="hljs-number"> 63 </span>      :<span class="hljs-number"> 62 </span>      |***********************               |
     <span class="hljs-number"> 64 </span>-&gt;<span class="hljs-number"> 127 </span>     :<span class="hljs-number"> 18 </span>      |******                                |

</code></pre><p>追踪慢于 5 毫秒的 ext4 常见操作：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ext4slower</span> 5
<span class="hljs-selector-tag">Tracing</span> <span class="hljs-selector-tag">ext4</span> <span class="hljs-selector-tag">operations</span> <span class="hljs-selector-tag">slower</span> <span class="hljs-selector-tag">than</span> 5 <span class="hljs-selector-tag">ms</span>
<span class="hljs-selector-tag">TIME</span>     <span class="hljs-selector-tag">COMM</span>           <span class="hljs-selector-tag">PID</span>    <span class="hljs-selector-tag">T</span> <span class="hljs-selector-tag">BYTES</span>   <span class="hljs-selector-tag">OFF_KB</span>   <span class="hljs-selector-tag">LAT</span>(<span class="hljs-selector-tag">ms</span>) <span class="hljs-selector-tag">FILENAME</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:45</span> <span class="hljs-selector-tag">supervise</span>      3570   <span class="hljs-selector-tag">W</span> 18      0           5<span class="hljs-selector-class">.48</span> <span class="hljs-selector-tag">status</span><span class="hljs-selector-class">.new</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">supervise</span>      12770  <span class="hljs-selector-tag">R</span> 128     0           7<span class="hljs-selector-class">.55</span> <span class="hljs-selector-tag">run</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12770  <span class="hljs-selector-tag">R</span> 497     0          16<span class="hljs-selector-class">.46</span> <span class="hljs-selector-tag">nsswitch</span><span class="hljs-selector-class">.conf</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12770  <span class="hljs-selector-tag">R</span> 1680    0          17<span class="hljs-selector-class">.42</span> <span class="hljs-selector-tag">netflix_environment</span><span class="hljs-selector-class">.sh</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12770  <span class="hljs-selector-tag">R</span> 1079    0           9<span class="hljs-selector-class">.53</span> <span class="hljs-selector-tag">service_functions</span><span class="hljs-selector-class">.sh</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12772  <span class="hljs-selector-tag">R</span> 128     0          17<span class="hljs-selector-class">.74</span> <span class="hljs-selector-tag">svstat</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">svstat</span>         12772  <span class="hljs-selector-tag">R</span> 18      0           8<span class="hljs-selector-class">.67</span> <span class="hljs-selector-tag">status</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12774  <span class="hljs-selector-tag">R</span> 128     0          15<span class="hljs-selector-class">.76</span> <span class="hljs-selector-tag">stat</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12777  <span class="hljs-selector-tag">R</span> 128     0           7<span class="hljs-selector-class">.89</span> <span class="hljs-selector-tag">grep</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12776  <span class="hljs-selector-tag">R</span> 128     0           8<span class="hljs-selector-class">.25</span> <span class="hljs-selector-tag">ps</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12780  <span class="hljs-selector-tag">R</span> 128     0          11<span class="hljs-selector-class">.07</span> <span class="hljs-selector-tag">xargs</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">ps</span>             12776  <span class="hljs-selector-tag">R</span> 832     0          12<span class="hljs-selector-class">.02</span> <span class="hljs-selector-tag">libprocps</span><span class="hljs-selector-class">.so</span><span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>
21<span class="hljs-selector-pseudo">:49</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">run</span>            12779  <span class="hljs-selector-tag">R</span> 128     0          13<span class="hljs-selector-class">.21</span> <span class="hljs-selector-tag">cut</span>
<span class="hljs-selector-attr">[...]</span>

</code></pre><p>追踪新建的 TCP 活跃连接（<code>connect()</code>）:</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">tcpconnect</span>
<span class="hljs-selector-tag">PID</span>    <span class="hljs-selector-tag">COMM</span>         <span class="hljs-selector-tag">IP</span> <span class="hljs-selector-tag">SADDR</span>            <span class="hljs-selector-tag">DADDR</span>            <span class="hljs-selector-tag">DPORT</span>
1479   <span class="hljs-selector-tag">telnet</span>       4  127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>        127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>        23
1469   <span class="hljs-selector-tag">curl</span>         4  10<span class="hljs-selector-class">.201</span><span class="hljs-selector-class">.219</span><span class="hljs-selector-class">.236</span>   54<span class="hljs-selector-class">.245</span><span class="hljs-selector-class">.105</span><span class="hljs-selector-class">.25</span>    80
1469   <span class="hljs-selector-tag">curl</span>         4  10<span class="hljs-selector-class">.201</span><span class="hljs-selector-class">.219</span><span class="hljs-selector-class">.236</span>   54<span class="hljs-selector-class">.67</span><span class="hljs-selector-class">.101</span><span class="hljs-selector-class">.145</span>    80
1991   <span class="hljs-selector-tag">telnet</span>       6  <span class="hljs-selector-pseudo">::1</span>              <span class="hljs-selector-pseudo">::1</span>              23
2015   <span class="hljs-selector-tag">ssh</span>          6  <span class="hljs-selector-tag">fe80</span><span class="hljs-selector-pseudo">::2000</span><span class="hljs-selector-pseudo">:bff</span><span class="hljs-selector-pseudo">:fe82</span><span class="hljs-selector-pseudo">:3ac</span> <span class="hljs-selector-tag">fe80</span><span class="hljs-selector-pseudo">::2000</span><span class="hljs-selector-pseudo">:bff</span><span class="hljs-selector-pseudo">:fe82</span><span class="hljs-selector-pseudo">:3ac</span> 22

</code></pre><p>通过跟踪 <code>getaddrinfo()</code>/<code>gethostbyname()</code> 库的调用来追踪 DNS 延迟：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">gethostlatency</span>
<span class="hljs-selector-tag">TIME</span>      <span class="hljs-selector-tag">PID</span>    <span class="hljs-selector-tag">COMM</span>          <span class="hljs-selector-tag">LATms</span> <span class="hljs-selector-tag">HOST</span>
06<span class="hljs-selector-pseudo">:10</span><span class="hljs-selector-pseudo">:24</span>  28011  <span class="hljs-selector-tag">wget</span>          90<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.iovisor</span><span class="hljs-selector-class">.org</span>
06<span class="hljs-selector-pseudo">:10</span><span class="hljs-selector-pseudo">:28</span>  28127  <span class="hljs-selector-tag">wget</span>           0<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.iovisor</span><span class="hljs-selector-class">.org</span>
06<span class="hljs-selector-pseudo">:10</span><span class="hljs-selector-pseudo">:41</span>  28404  <span class="hljs-selector-tag">wget</span>           9<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.netflix</span><span class="hljs-selector-class">.com</span>
06<span class="hljs-selector-pseudo">:10</span><span class="hljs-selector-pseudo">:48</span>  28544  <span class="hljs-selector-tag">curl</span>          35<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.netflix</span><span class="hljs-selector-class">.com</span><span class="hljs-selector-class">.au</span>
06<span class="hljs-selector-pseudo">:11</span><span class="hljs-selector-pseudo">:10</span>  29054  <span class="hljs-selector-tag">curl</span>          31<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.plumgrid</span><span class="hljs-selector-class">.com</span>
06<span class="hljs-selector-pseudo">:11</span><span class="hljs-selector-pseudo">:16</span>  29195  <span class="hljs-selector-tag">curl</span>           3<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.facebook</span><span class="hljs-selector-class">.com</span>
06<span class="hljs-selector-pseudo">:11</span><span class="hljs-selector-pseudo">:25</span>  29404  <span class="hljs-selector-tag">curl</span>          72<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">foo</span>
06<span class="hljs-selector-pseudo">:11</span><span class="hljs-selector-pseudo">:28</span>  29475  <span class="hljs-selector-tag">curl</span>           1<span class="hljs-selector-class">.00</span> <span class="hljs-selector-tag">foo</span>

</code></pre><p>按类别划分 VFS 操作的时间间隔统计：</p>
<pre><code class="hljs tap"><span class="hljs-comment"># vfsstat</span>
TIME         READ/s  WRITE/s CREATE/s   OPEN/s  FSYNC/s
18:35:32:      <span class="hljs-number"> 231 </span>     <span class="hljs-number"> 12 </span>      <span class="hljs-number"> 4 </span>     <span class="hljs-number"> 98 </span>       0
18:35:33:      <span class="hljs-number"> 274 </span>     <span class="hljs-number"> 13 </span>      <span class="hljs-number"> 4 </span>    <span class="hljs-number"> 106 </span>       0
18:35:34:      <span class="hljs-number"> 586 </span>     <span class="hljs-number"> 86 </span>      <span class="hljs-number"> 4 </span>    <span class="hljs-number"> 251 </span>       0
18:35:35:      <span class="hljs-number"> 241 </span>     <span class="hljs-number"> 15 </span>      <span class="hljs-number"> 4 </span>     <span class="hljs-number"> 99 </span>       0

</code></pre><p>对一个给定的 PID，通过内核和用户堆栈轨迹来追踪 CPU 处理之外的时间（由内核进行统计）：</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># offcputime -d -p 24347</span>
Tracing off-CPU time (us) of PID 24347 by<span class="hljs-built_in"> user </span>+ kernel stack<span class="hljs-built_in">..</span>. Hit Ctrl-C <span class="hljs-keyword">to</span> end.
^C
[<span class="hljs-built_in">..</span>.]
    ffffffff810a9581 finish_task_switch
    ffffffff8185d385 schedule
    ffffffff81085672 do_wait
    ffffffff8108687b sys_wait4
    ffffffff81861bf6 entry_SYSCALL_64_fastpath
    --
    00007f6733a6b64a waitpid
    -                bash (24347)
        4952

    ffffffff810a9581 finish_task_switch
    ffffffff8185d385 schedule
    ffffffff81860c48 schedule_timeout
    ffffffff810c5672 wait_woken
    ffffffff8150715a n_tty_read
    ffffffff815010f2 tty_read
    ffffffff8122cd67 __vfs_read
    ffffffff8122df65 vfs_read
    ffffffff8122f465 sys_read
    ffffffff81861bf6 entry_SYSCALL_64_fastpath
    --
    00007f6733a969b0 read
    -                bash (24347)
        1450908

</code></pre><p>追踪 MySQL 查询延迟（通过 USDT 探针）：</p>
<pre><code class="hljs oxygene"># mysqld_qslower `pgrep -n mysqld`
Tracing MySQL server queries <span class="hljs-keyword">for</span> PID <span class="hljs-number">14371</span> slower than <span class="hljs-number">1</span> ms...
TIME(s)        PID          MS QUERY
<span class="hljs-number">0.000000</span>       <span class="hljs-number">18608</span>   <span class="hljs-number">130.751</span> <span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> words <span class="hljs-keyword">WHERE</span> word REGEXP <span class="hljs-string">'^bre.*n$'</span>
<span class="hljs-number">2.921535</span>       <span class="hljs-number">18608</span>   <span class="hljs-number">130.590</span> <span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> words <span class="hljs-keyword">WHERE</span> word REGEXP <span class="hljs-string">'^alex.*$'</span>
<span class="hljs-number">4.603549</span>       <span class="hljs-number">18608</span>    <span class="hljs-number">24.164</span> <span class="hljs-keyword">SELECT</span> COUNT<span class="hljs-comment">(*) FROM words
9.733847       18608   130.936 SELECT count(*)</span> <span class="hljs-keyword">AS</span> count <span class="hljs-keyword">FROM</span> words <span class="hljs-keyword">WHERE</span> word REGEXP <span class="hljs-string">'^bre.*n$'</span>
<span class="hljs-number">17.864776</span>      <span class="hljs-number">18608</span>   <span class="hljs-number">130.298</span> <span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> words <span class="hljs-keyword">WHERE</span> word REGEXP <span class="hljs-string">'^bre.*n$'</span> <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> word

</code></pre><p>监测 pam 库并使用多种追踪工具观察登录请求：</p>
<pre><code class="hljs autoit"><span class="hljs-meta"># trace <span class="hljs-string">'pam:pam_start "%s: %s", arg1, arg2'</span></span>
TIME     PID    COMM         <span class="hljs-function"><span class="hljs-keyword">FUNC</span>             -</span>
<span class="hljs-number">17</span>:<span class="hljs-number">49</span>:<span class="hljs-number">45</span> <span class="hljs-number">5558</span>   sshd         pam_start        sshd: root
<span class="hljs-number">17</span>:<span class="hljs-number">49</span>:<span class="hljs-number">47</span> <span class="hljs-number">5662</span>   sudo         pam_start        sudo: root
<span class="hljs-number">17</span>:<span class="hljs-number">49</span>:<span class="hljs-number">49</span> <span class="hljs-number">5727</span>   login        pam_start        login: bgregg

</code></pre><p>bcc 项目里的很多工具都有帮助信息（<code>-h</code> 选项），并且都应该包含有示例的 man 页面和文本文件。</p>
<h3><a href="#必要性"></a>必要性</h3>
<p>2014 年，Linux 追踪程序就有一些内核相关的特性（来自 <code>ftrace</code> 和 <code>pref_events</code>），但是我们仍然要转储并报告进程数据，这种几十年前的老技术有很多的限制。你不能频繁地访问进程名、函数名、堆栈轨迹或内核中的任意的其它数据。你不能在将变量保存到一个监测事件里，又在另一个事件里访问它们，这意味着你不能在你需要的地方计算延迟（或者说时间增量）。你也不能创建一个内核内部的延迟柱状图，也不能追踪 USDT 探针，甚至不能写个自定义的程序。DTrace 可以做到所有这些，但仅限于 Solaris 或 BSD 系统。在 Linux 系统中，有些不在主线内核的追踪器，比如 SystemTap 就可以满足你的这些需求，但它也有自身的不足。（理论上说，你可以写一个基于探针的内核模块来满足需求-但实际上没人这么做。）</p>
<p>2014 年我加入了 Netflix cloud performance 团队。做了这么久的 DTrace 方面的专家，转到 Linux 对我来说简直不可思议。但我确实这么做了，而且遇到了巨大的挑战：在应用快速变化、采用微服务架构和分布式系统的情况下，调优 Netflix cloud。有时要用到系统追踪，而我之前是用的 DTrace。在 Linux 系统上可没有 DTrace，我就开始用 Linux 内核内建的 <code>ftrace</code> 和 <code>perf_events</code> 工具，构建了一个追踪工具（<a href="https://github.com/brendangregg/perf-tools">perf-tools</a>）。这些工具很有用，但有些工作还是没法完成，尤其是延迟柱状图以及堆栈踪迹计数。我们需要的是内核追踪的可程序化。</p>
<h3><a href="#发生了什么"></a>发生了什么？</h3>
<p>BPF 将程序化的功能添加到现有的内核追踪工具中（<code>tracepoints</code>、<code>kprobes</code>、<code>uprobes</code>）。在 Linux 4.x 系列的内核里，这些功能大大加强了。</p>
<p>时间采样是最主要的部分，它被 Linux 4.9-rc1 所采用（<a href="https://lkml.org/lkml/2016/9/1/831">patchset</a>）。十分感谢 Alexei Starovoitov（在 Facebook 致力于 BPF 的开发），他是这些 BPF 增强功能的主要开发者。</p>
<p>Linux 内核现在内建有以下这些特性（自 2.6 版本到 4.9 版本之间增加）：</p>
<ul>
<li>内核级的动态追踪（BPF 对 <code>kprobes</code> 的支持）</li>
<li>用户级的动态追踪（BPF 对 <code>uprobes</code> 的支持）</li>
<li>内核级的静态追踪（BPF 对 <code>tracepoints</code> 的支持）</li>
<li>时间采样事件（BPF 的 <code>pref_event_open</code>）</li>
<li>PMC 事件（BPF 的 <code>pref_event_open</code>）</li>
<li>过滤器（通过 BPF 程序）</li>
<li>调试输出（<code>bpf_trace_printk()</code>）</li>
<li>按事件输出（<code>bpf_perf_event_output()</code>）</li>
<li>基础变量（全局的和每个线程的变量，基于 BPF 映射）</li>
<li>关联数组（通过 BPF 映射）</li>
<li>频率计数（基于 BPF 映射）</li>
<li>柱状图（2 的冥次方、线性及自定义，基于 BPF 映射）</li>
<li>时间戳和时间增量（<code>bpf_ktime_get_ns()</code>，和 BPF 程序）</li>
<li>内核态的堆栈轨迹（BPF 栈映射）</li>
<li>用户态的堆栈轨迹 (BPF 栈映射)</li>
<li>重写 ring 缓存（<code>pref_event_attr.write_backward</code>）</li>
</ul>
<p>我们采用的前端是 bcc，它同时提供 Python 和 lua 接口。bcc 添加了：</p>
<ul>
<li>用户级静态追踪（基于 <code>uprobes</code> 的 USDT 探针）</li>
<li>调试输出（Python 中调用 <code>BPF.trace_pipe()</code> 和 <code>BPF.trace_fields()</code> 函数 ）</li>
<li>按事件输出（<code>BPF_PERF_OUTPUT</code> 宏和 <code>BPF.open_perf_buffer()</code>）</li>
<li>间隔输出（<code>BPF.get_table()</code> 和 <code>table.clear()</code>）</li>
<li>打印柱状图（<code>table.print_log2_hist()</code>）</li>
<li>内核级的 C 结构体导航（bcc 重写器映射到 <code>bpf_probe_read()</code> 函数）</li>
<li>内核级的符号解析（<code>ksym()</code>、 <code>ksymaddr()</code>）</li>
<li>用户级的符号解析（<code>usymaddr()</code>）</li>
<li>BPF 跟踪点支持（通过 <code>TRACEPOINT_PROBE</code>）</li>
<li>BPF 堆栈轨迹支持（包括针对堆栈框架的 <code>walk</code> 方法）</li>
<li>其它各种辅助宏和方法</li>
<li>例子（位于 <code>/examples</code> 目录）</li>
<li>工具（位于 <code>/tools</code> 目录）</li>
<li>教程（<code>/docs/tutorial*.md</code>）</li>
<li>参考手册（<code>/docs/reference_guide.md</code>）</li>
</ul>
<p>直到最新也是最主要的特性被整合进来，我才开始写这篇文章，现在它在 4.9-rc1 内核中。我们还需要去完成一些次要的东西，还有另外一些事情要做，但是现在我们所拥有的已经值得欢呼了。现在 Linux 拥有了内建的高级追踪能力。</p>
<h3><a href="#安全性"></a>安全性</h3>
<p>设计 BPF 及其增强功能时就考虑到生产环境级安全，它被用在大范围的生产环境里。不过你想的话，你还是可以找到一个挂起内核的方法。这种情况是偶然的，而不是必然，类似的漏洞会被快速修复，尤其是当 BPF 合并入了 Linux。因为 Linux 可是公众的焦点。</p>
<p>在开发过程中我们碰到了一些非 BPF 的漏洞，它们需要被修复：rcu 不可重入，这可能导致内核由于 funccount 挂起，在 4.6 内核版本中这个漏洞被 “bpf: map pre-alloc” 补丁集所修复，旧版本内核的漏洞 bcc 有个临时处理方案。还有一个是 uprobe 的内存计算问题，这导致 uprobe 分配内存失败，在 4.8 内核版本这个漏洞由 “uprobes: Fix the memcg accounting” 补丁所修复，并且该补丁还将被移植到之前版本的内核中（例如，它现在被移植到了 4.4.27 和 4.4.0-45.66 版本中）。</p>
<h3><a href="#为什么-linux-追踪用了这么久才加进来"></a>为什么 Linux 追踪用了这么久才加进来？</h3>
<p>首要任务被分到了若干追踪器中间：这些不是某个追踪器单个的事情。想要了解更多关于这个或其它方面的问题，可以看一看我在 2014 年 <a href="http://www.slideshare.net/brendangregg/from-dtrace-to-linux">tracing summit 上的讲话</a>。我忽视了部分方案的反面影响：有些公司发现其它追踪器（SystemTap 和 LTTng）能满足他们的需求，尽管他们乐于听到 BPF 的开发进程，但考虑到他们现有的解决方案，帮助 BPF 的开发就不那么重要了。</p>
<p>BPF 仅在近两年里在追踪领域得到加强。这一过程原本可以更快的，但早期缺少全职从事于 BPF 追踪的工程师。Alexei Starovoitov (BPF 领导者)，Brenden Blanco (bcc 领导者)，我还有其它一些开发者，都有其它的事情要做。我在 Netflix 公司花了大量时间（志愿地），大概有 7% 的时间是花在 BPF 和 bcc 上。某种程度上这不是我的首要任务，因为我还有自己的工作（包括我的 perf-tools，一个可以工作在旧版本内核上的程序）。</p>
<p>现在BPF 追踪器已经推出了，已经有科技公司开始寻找会 BPF 的人了。但我还是推荐 <a href="http://www.brendangregg.com/blog/2016-03-30/working-at-netflix-2016.html">Netflix 公司</a>。（如果你为了 BPF 而要聘请我，那我还是十分乐于待在 Netflix 公司的！）</p>
<h3><a href="#使用简单"></a>使用简单</h3>
<p>DTrace 和 bcc/BPF 现在的最大区别就是哪个更好使用。这取决于你要用 BPF 追踪做什么了。如果你要</p>
<ul>
<li><strong>使用 BPF 工具/度量</strong>：应该是没什么区别的。工具的表现都差不多，图形用户界面都能取得类似度量指标。大部分用户通过这种方式使用 BPF。</li>
<li><strong>开发工具/度量</strong>：bcc 的开发可难多了。DTrace 有一套自己的简单语言，D 语音，和 awk 语言相似，而 bcc 使用已有的语言（C 语言，Python 和 lua）及其类库。一个用 C 和 Python 写的 bcc 工具与仅仅用 D 语言写出来的工具相比，可能要多十多倍行数的代码，或者更多。但是很多 DTrace 工具用 shell 封装来提供参数和差错检查，会让代码变得十分臃肿。编程的难处是不同的：重写 bcc 更需要巧妙性，这导致某些脚本更加难开发。（尤其是 <code>bpf_probe_read()</code> 这类的函数，需要了解更多 BPF 的内涵知识）。当计划改进 bcc 时，这一情形将得到改善。</li>
<li><strong>运行常见的命令</strong>：十分相近。通过 <code>dtrace</code> 命令，DTrace 能做很多事，但 bcc 有各种工具，<code>trace</code>、<code>argdist</code>、<code>funccount</code>、<code>funclatency</code> 等等。</li>
<li><strong>编写自定义的特殊命令</strong>：使用 DTrace 的话，这就没有必要了。允许定制消息快速传递和系统快速响应，DTrace 的高级分析很快。而 bcc 现在受限于它的多种工具以及它们的适用范围。</li>
</ul>
<p>简单来说，如果你只使用 BPF 工具的话，就不必关注这些差异了。如果你经验丰富，是个开发者（像我一样），目前 bcc 的使用更难一些。</p>
<p>举一个 bcc 的 Python 前端的例子，下面是追踪硬盘 I/O 并打印出 I/O 大小的柱状图代码：</p>
<pre><code class="hljs python"><span class="hljs-keyword">from</span> bcc <span class="hljs-keyword">import</span> BPF
<span class="hljs-keyword">from</span> time <span class="hljs-keyword">import</span> sleep

<span class="hljs-comment"># load BPF program</span>
b = BPF(text=<span class="hljs-string">"""
#include &lt;uapi/linux/ptrace.h&gt;
#include &lt;linux/blkdev.h&gt;

BPF_HISTOGRAM(dist);

int kprobe__blk_account_io_completion(struct pt_regs *ctx, struct request *req)
{
    dist.increment(bpf_log2l(req-&gt;__data_len / 1024));
    return 0;
}
"""</span>)

<span class="hljs-comment"># header</span>
print(<span class="hljs-string">"Tracing... Hit Ctrl-C to end."</span>)

<span class="hljs-comment"># trace until Ctrl-C</span>
<span class="hljs-keyword">try</span>:
    sleep(<span class="hljs-number">99999999</span>)
<span class="hljs-keyword">except</span> KeyboardInterrupt:
    <span class="hljs-keyword">print</span>

<span class="hljs-comment"># output</span>
b[<span class="hljs-string">"dist"</span>].print_log2_hist(<span class="hljs-string">"kbytes"</span>)

</code></pre><p>注意 Python 代码中嵌入的 C 语句（<code>text=</code>）。</p>
<p>这就完成了任务，但仍有改进的空间。好在我们有时间去做：人们使用 Linux 4.9 并能用上 BPF 还得好几个月呢，所以我们有时间来制造工具和前端。</p>
<h3><a href="#高级语言"></a>高级语言</h3>
<p>前端越简单，比如高级语言，所改进的可能就越不如你所期望的。绝大多数人使用封装好的工具（和图形界面），仅有少部分人能写出这些工具。但我不反对使用高级语言，比如 SystemTap，毕竟已经开发出来了。</p>
<pre><code class="hljs d"><span class="hljs-meta">#!/usr/bin/stap</span>
<span class="hljs-comment">/*
 * opensnoop.stp    Trace file open()s.  Basic version of opensnoop.
 */</span>

probe begin
{
    printf(<span class="hljs-string">"\n%6s %6s %16s %s\n"</span>, <span class="hljs-string">"UID"</span>, <span class="hljs-string">"PID"</span>, <span class="hljs-string">"COMM"</span>, <span class="hljs-string">"PATH"</span>);
}

probe syscall.open
{
    printf(<span class="hljs-string">"%6d %6d %16s %s\n"</span>, uid(), pid(), execname(), filename);
}

</code></pre><p>如果拥有整合了语言和脚本的 SystemTap 前端与高性能的内置在内核中的 BPF 后端，会不会令人满意呢？RedHat 公司的 Richard Henderson 已经在进行相关工作了，并且发布了 <a href="https://lkml.org/lkml/2016/6/14/749">初代版本</a>！</p>
<p>这是 <a href="https://wkz.github.io/ply/">ply</a>，一个完全新颖的 BPF 高级语言：</p>
<pre><code class="hljs d"><span class="hljs-meta">#!/usr/bin/env ply</span>

kprobe:SyS_*
{
    $syscalls[func].count()
}

</code></pre><p>这也是一份承诺。</p>
<p>尽管如此，我认为工具开发者的实际难题不是使用什么语言：而是要了解要用这些强大的工具做什么？</p>
<h3><a href="#如何帮助我们"></a>如何帮助我们</h3>
<ul>
<li><strong>推广</strong>：BPF 追踪器目前还没有什么市场方面的进展。尽管有公司了解并在使用它（Facebook、Netflix、Github 和其它公司），但要广为人知尚需时日。你可以分享关于 BPF 的文章和资源给业内的其它公司来帮助我们。</li>
<li><strong>教育</strong>：你可以撰写文章，发表演讲，甚至参与 bcc 文档的编写。分享 BPF 如何解决实际问题以及为公司带来收益的实例。</li>
<li><strong>解决 bcc 的问题</strong>：参考 <a href="https://github.com/iovisor/bcc/issues">bcc issue list</a>，这包含了错误和需要的特性。</li>
<li><strong>提交错误</strong>：使用 bcc/BPF，提交你发现的错误。</li>
<li><strong>创造工具</strong>：有很多可视化的工具需要开发，但请不要太草率，因为大家会先花几个小时学习使用你做的工具，所以请尽量把工具做的直观好用（参考我的<a href="https://github.com/iovisor/bcc/blob/master/CONTRIBUTING-SCRIPTS.md">文档</a>）。就像 Mike Muuss 提及到他自己的 <a href="http://ftp.arl.army.mil/%7Emike/ping.html">ping</a> 程序：“要是我早知道这是我一生中最出名的成就，我就多开发一两天，添加更多选项。”</li>
<li><strong>高级语言</strong>：如果现有的 bcc 前端语言让你很困扰，或许你能弄门更好的语言。要是你想将这门语言内建到 bcc 里面，你需要使用 libbcc。或者你可以帮助 SystemTap BPF 或 ply 的工作。</li>
<li><strong>整合图形界面</strong>：除了 bcc 可以使用的 CLI 命令行工具，怎么让这些信息可视呢？延迟热点图，火焰图等等。</li>
</ul>
<h3><a href="#其它追踪器"></a>其它追踪器</h3>
<p>那么 SystemTap、ktap、sysdig、LTTng 等追踪器怎么样呢？它们有个共同点，要么使用了 BPF，要么在自己的领域做得更好。会有单独的文章介绍它们自己。</p>
<p>至于 DTrace ？我们公司目前还在基于 FreeBSD 系统的 CDN 中使用它。</p>
<h3><a href="#更多-bccbpf-的信息"></a>更多 bcc/BPF 的信息</h3>
<p>我已经写了一篇《<a href="https://github.com/iovisor/bcc/blob/master/docs/tutorial.md">bcc/BPF 工具最终用户教程</a>》，一篇《<a href="https://github.com/iovisor/bcc/blob/master/docs/tutorial_bcc_python_developer.md">bcc Python 开发者教程</a>》，一篇《<a href="https://github.com/iovisor/bcc/blob/master/docs/reference_guide.md">bcc/BPF 参考手册</a>》，并提供了一些有用的<a href="https://github.com/iovisor/bcc/tree/master/tools">工具</a>，每一个工具都有一个 <a href="https://github.com/iovisor/bcc/tree/master/tools">example.txt</a> 文件和 <a href="https://github.com/iovisor/bcc/tree/master/man/man8">man page</a>。我之前写过的关于 bcc 和 BPF 的文章有：</p>
<ul>
<li><a href="http://www.brendangregg.com/blog/2015-05-15/ebpf-one-small-step.html">eBPF: One Small Step</a> （后来就叫做 BPF）</li>
<li><a href="http://www.brendangregg.com/blog/2015-09-22/bcc-linux-4.3-tracing.html">bcc: Taming Linux 4.3+ Tracing Superpowers</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-01-18/ebpf-stack-trace-hack.html">Linux eBPF Stack Trace Hack</a> （现在官方支持追踪堆栈了）</li>
<li><a href="http://www.brendangregg.com/blog/2016-01-20/ebpf-offcpu-flame-graph.html">Linux eBPF Off-CPU Flame Graph</a> </li>
<li><a href="http://www.brendangregg.com/blog/2016-02-01/linux-wakeup-offwake-profiling.html">Linux Wakeup and Off-Wake Profiling</a> </li>
<li><a href="http://www.brendangregg.com/blog/2016-02-05/ebpf-chaingraph-prototype.html">Linux Chain Graph Prototype</a> </li>
<li><a href="http://www.brendangregg.com/blog/2016-02-08/linux-ebpf-bcc-uprobes.html">Linux eBPF/bcc uprobes</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-03-05/linux-bpf-superpowers.html">Linux BPF Superpowers</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-06-14/ubuntu-xenial-bcc-bpf.html">Ubuntu Xenial bcc/BPF</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-01/linux-bcc-security-capabilities.html">Linux bcc Tracing Security Capabilities</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-04/linux-bcc-mysqld-qslower.html">Linux MySQL Slow Query Tracing with bcc/BPF</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-06/linux-bcc-ext4dist-ext4slower.html">Linux bcc ext4 Latency Tracing</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-08/linux-bcc-runqlat.html">Linux bcc/BPF Run Queue (Scheduler) Latency</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-12/linux-bcc-nodejs-usdt.html">Linux bcc/BPF Node.js USDT Tracing</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-15/linux-bcc-tcptop.html">Linux bcc tcptop</a></li>
<li><a href="http://www.brendangregg.com/blog/2016-10-21/linux-efficient-profiler.html">Linux 4.9's Efficient BPF-based Profiler</a></li>
</ul>
<p>我在 Facebook 的 Performance@Scale <a href="http://www.brendangregg.com/blog/2016-03-05/linux-bpf-superpowers.html">Linux BPF Superpowers</a> 大会上发表过一次演讲。十二月份，我将在 Boston 发表关于 BPF/bcc 在 <a href="https://www.usenix.org/conference/lisa16">USENIX LISA</a> 方面的演讲和教程。</p>
<h3><a href="#致谢"></a>致谢</h3>
<ul>
<li>Van Jacobson 和 Steve McCanne，他们创建了最初用作过滤器的 BPF 。</li>
<li>Barton P. Miller，Jeffrey K. Hollingsworth，and Jon Cargille，发明了动态追踪，并发表论文《Dynamic Program Instrumentation for Scalable Performance Tools》，可扩展高性能计算协议 （SHPCC），于田纳西州诺克斯维尔市，1994 年 5 月发表。</li>
<li>kerninst (ParaDyn, UW-Madison)，展示了动态跟踪的价值的早期动态跟踪工具（上世纪 90 年代后期）</li>
<li>Mathieu Desnoyers (在 LTTng)，内核的主要开发者，主导 tracepoints 项目。</li>
<li>IBM 开发的作为 DProbes 一部分的 kprobes，DProbes 在 2000 年时曾与 LTT 一起提供 Linux 动态追踪，但没有整合到一起。</li>
<li>Bryan Cantrill, Mike Shapiro, and Adam Leventhal (Sun Microsystems)，DTrace 的核心开发者，DTrace 是一款很棒的动态追踪工具，安全而且简单（2004 年）。对于动态追踪技术，DTrace 是科技的重要转折点：它很安全，默认安装在 Solaris 以及其它以可靠性著称的系统里。</li>
<li>来自 Sun Microsystems 的各部门的许多员工，促进了 DTrace，为我们带来了高级系统追踪的意识。</li>
<li>Roland McGrath (在 Red Hat)，utrace 项目的主要开发者，utrace 变成了后来的 uprobes。</li>
<li>Alexei Starovoitov (PLUMgrid， 后来是 Facebook)，加强版 BPF（可编程内核部件）的主要开发者。</li>
<li>那些帮助反馈、提交代码、测试以及针对增强版 BPF 补丁（请在 lkml 搜索 BPF）的 Linux 内核工程师： Wang Nan、 Daniel Borkmann、 David S. Miller、 Peter Zijlstra 以及其它很多人。</li>
<li>Brenden Blanco (PLUMgrid)，bcc 的主要开发者。</li>
<li>Sasha Goldshtein (Sela) 开发了 bcc 中的跟踪点支持，和功能最强大的 bcc 工具 trace 及 argdist，帮助 USDT 项目的开发。</li>
<li>Vicent Martí 和其它 Github 上的工程师，为 bcc 编写了基于 lua 的前端，帮助 USDT 部分项目的开发。</li>
<li>Allan McAleavy、 Mark Drayton，和其他的改进 bcc 的贡献者。</li>
</ul>
<p>感觉 Netflix 提供的环境和支持，让我能够编写 BPF 和 bcc 跟踪器并完成它们。我已经编写了多年的追踪工具（使用 TNF/prex、DTrace、SystemTap、ktap、ftrace、perf，现在是 bcc/BPF），并写书、博客以及评论，</p>
<p>最后，感谢 <a href="http://www.brendangregg.com/blog/2016-07-23/deirdre.html">Deirdré</a> 编辑了另外一篇文章。</p>
<h3><a href="#总结"></a>总结</h3>
<p>Linux 没有 DTrace（语言），但它现在有了，或者说拥有了 DTraceTookit（工具）。</p>
<p>通过增强内置的 BPF 引擎，Linux 4.9 内核拥有了用来支持现代化追踪的最后一项能力。内核支持这一最难的部分已经做完了。今后的任务包括更多的命令行执行工具，以及高级语言和图形用户界面。</p>
<p>对于性能分析产品的客户，这也是一件好事：你能查看延迟柱状图和热点图，CPU 处理和 CPU 之外的火焰图，拥有更好的时延断点和更低耗的工具。在用户空间按包跟踪和处理是没有效率的方式。</p>
<p>那么你什么时候会升级到 Linux 4.9 呢？一旦官方发布，新的性能测试工具就来了：<code>apt-get install bcc-tools</code> 。</p>
<p>开始享受它吧!</p>
<p>Brendan</p>
<hr>
<p>via: <a href="http://www.brendangregg.com/blog/2016-10-27/dtrace-for-linux-2016.html">http://www.brendangregg.com/blog/2016-10-27/dtrace-for-linux-2016.html</a></p>
<p>作者：<a href="http://www.brendangregg.com/">Brendan Gregg</a> 译者：<a href="https://github.com/GitFuture">GitFuture</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 中的 DTrace ：BPF 进入 4.9 内核

## 原文链接
[https://www.zcfy.cc/article/dtrace-for-linux-2016](https://www.zcfy.cc/article/dtrace-for-linux-2016)


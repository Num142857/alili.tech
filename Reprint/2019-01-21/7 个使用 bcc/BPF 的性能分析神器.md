---
title: '7 个使用 bcc/BPF 的性能分析神器' 
date: 2019-01-21 2:30:06
hidden: true
slug: iksbk0p5k29
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#7-个使用-bccbpf-的性能分析神器"></a>7 个使用 bcc/BPF 的性能分析神器</h1>
<blockquote>
<p>使用伯克利包过滤器Berkeley Packet Filter（BPF）编译器集合Compiler Collection（BCC）工具深度探查你的 linux 代码。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/8672dd995fc51fcd5fa8c8a7e3f90cc5bad3001e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f70656e6775696e73253230696e25323073706163655f302e6a70673f69746f6b3d756d70435441756c"><img src="https://p0.ssl.qhimg.com/t0113ff115bf8265227.jpg" alt="7 superpowers for Fedora bcc/BPF performance analysis"></a></p>
<p>在 Linux 中出现的一种新技术能够为系统管理员和开发者提供大量用于性能分析和故障排除的新工具和仪表盘。它被称为增强的伯克利数据包过滤器enhanced Berkeley Packet Filter（eBPF，或 BPF），虽然这些改进并不是由伯克利开发的，而且它们不仅仅是处理数据包，更多的是过滤。我将讨论在 Fedora 和 Red Hat Linux 发行版中使用 BPF 的一种方法，并在 Fedora 26 上演示。</p>
<p>BPF 可以在内核中运行由用户定义的沙盒程序，可以立即添加新的自定义功能。这就像按需给 Linux 系统添加超能力一般。 你可以使用它的例子包括如下：</p>
<ul>
<li><strong>高级性能跟踪工具</strong>：对文件系统操作、TCP 事件、用户级事件等的可编程的低开销检测。</li>
<li><strong>网络性能</strong>： 尽早丢弃数据包以提高对 DDoS 的恢复能力，或者在内核中重定向数据包以提高性能。</li>
<li><strong>安全监控</strong>： 7x24 小时的自定义检测和记录内核空间与用户空间内的可疑事件。</li>
</ul>
<p>在可能的情况下，BPF 程序必须通过一个内核验证机制来保证它们的安全运行，这比写自定义的内核模块更安全。我在此假设大多数人并不编写自己的 BPF 程序，而是使用别人写好的。在 GitHub 上的 <a href="https://github.com/iovisor/bcc">BPF Compiler Collection (bcc)</a> 项目中，我已发布许多开源代码。bcc 为 BPF 开发提供了不同的前端支持，包括 Python 和 Lua，并且是目前最活跃的 BPF 工具项目。</p>
<h3><a href="#7-个有用的-bccbpf-新工具"></a>7 个有用的 bcc/BPF 新工具</h3>
<p>为了了解 bcc/BPF 工具和它们的检测内容，我创建了下面的图表并添加到 bcc 项目中。</p>
<p><a href="https://camo.githubusercontent.com/f7a7950340893c3c6be15498a2aef4156ec9e69d/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6263635f74726163696e675f746f6f6c732e706e67"><img src="https://p0.ssl.qhimg.com/t0112ac0bf7eea0d191.png" alt="Linux bcc/BPF 跟踪工具图"></a></p>
<p>这些是命令行界面工具，你可以通过 SSH 使用它们。目前大多数分析，包括我的老板，都是用 GUI 和仪表盘进行的。SSH 是最后的手段。但这些命令行工具仍然是预览 BPF 能力的好方法，即使你最终打算通过一个可用的 GUI 使用它。我已着手向一个开源 GUI 添加 BPF 功能，但那是另一篇文章的主题。现在我想向你分享今天就可以使用的 CLI 工具。</p>
<h4><a href="#1-execsnoop"></a>1、 execsnoop</h4>
<p>从哪儿开始呢？如何查看新的进程。那些会消耗系统资源，但很短暂的进程，它们甚至不会出现在 <code>top(1)</code> 命令或其它工具中的显示之中。这些新进程可以使用 <a href="https://github.com/brendangregg/perf-tools/blob/master/execsnoop">execsnoop</a> 进行检测（或使用行业术语说，可以被追踪traced）。 在追踪时，我将在另一个窗口中通过 SSH 登录：</p>
<pre><code class="hljs tap"><span class="hljs-comment"># /usr/share/bcc/tools/execsnoop</span>
PCOMM            PID    PPID   RET ARGS
sshd            <span class="hljs-number"> 12234 </span><span class="hljs-number"> 727 </span>    <span class="hljs-number"> 0 </span>/usr/sbin/sshd -D -R
unix_chkpwd     <span class="hljs-number"> 12236 </span><span class="hljs-number"> 12234 </span>  <span class="hljs-number"> 0 </span>/usr/sbin/unix_chkpwd root nonull
unix_chkpwd     <span class="hljs-number"> 12237 </span><span class="hljs-number"> 12234 </span>  <span class="hljs-number"> 0 </span>/usr/sbin/unix_chkpwd root chkexpiry
bash            <span class="hljs-number"> 12239 </span><span class="hljs-number"> 12238 </span>  <span class="hljs-number"> 0 </span>/bin/bash
id              <span class="hljs-number"> 12241 </span><span class="hljs-number"> 12240 </span>  <span class="hljs-number"> 0 </span>/usr/bin/id -un
hostname        <span class="hljs-number"> 12243 </span><span class="hljs-number"> 12242 </span>  <span class="hljs-number"> 0 </span>/usr/bin/hostname
pkg-config      <span class="hljs-number"> 12245 </span><span class="hljs-number"> 12244 </span>  <span class="hljs-number"> 0 </span>/usr/bin/pkg-config --variable=completionsdir bash-completion
grepconf.sh     <span class="hljs-number"> 12246 </span><span class="hljs-number"> 12239 </span>  <span class="hljs-number"> 0 </span>/usr/libexec/grepconf.sh -c
grep            <span class="hljs-number"> 12247 </span><span class="hljs-number"> 12246 </span>  <span class="hljs-number"> 0 </span>/usr/bin/grep -qsi ^COLOR.*none /etc/GREP_COLORS
tty             <span class="hljs-number"> 12249 </span><span class="hljs-number"> 12248 </span>  <span class="hljs-number"> 0 </span>/usr/bin/tty -s
tput            <span class="hljs-number"> 12250 </span><span class="hljs-number"> 12248 </span>  <span class="hljs-number"> 0 </span>/usr/bin/tput colors
dircolors       <span class="hljs-number"> 12252 </span><span class="hljs-number"> 12251 </span>  <span class="hljs-number"> 0 </span>/usr/bin/dircolors --sh /etc/DIR_COLORS
grep            <span class="hljs-number"> 12253 </span><span class="hljs-number"> 12239 </span>  <span class="hljs-number"> 0 </span>/usr/bin/grep -qi ^COLOR.*none /etc/DIR_COLORS
grepconf.sh     <span class="hljs-number"> 12254 </span><span class="hljs-number"> 12239 </span>  <span class="hljs-number"> 0 </span>/usr/libexec/grepconf.sh -c
grep            <span class="hljs-number"> 12255 </span><span class="hljs-number"> 12254 </span>  <span class="hljs-number"> 0 </span>/usr/bin/grep -qsi ^COLOR.*none /etc/GREP_COLORS
grepconf.sh     <span class="hljs-number"> 12256 </span><span class="hljs-number"> 12239 </span>  <span class="hljs-number"> 0 </span>/usr/libexec/grepconf.sh -c
grep            <span class="hljs-number"> 12257 </span><span class="hljs-number"> 12256 </span>  <span class="hljs-number"> 0 </span>/usr/bin/grep -qsi ^COLOR.*none /etc/GREP_COLORS

</code></pre><p>哇哦。 那是什么？ 什么是 <code>grepconf.sh</code>？ 什么是 <code>/etc/GREP_COLORS</code>？ 是 <code>grep</code> 在读取它自己的配置文件……由 <code>grep</code> 运行的？ 这究竟是怎么工作的？</p>
<p>欢迎来到有趣的系统追踪世界。 你可以学到很多关于系统是如何工作的（或者根本不工作，在有些情况下），并且发现一些简单的优化方法。 <code>execsnoop</code> 通过跟踪 <code>exec()</code> 系统调用来工作，<code>exec()</code> 通常用于在新进程中加载不同的程序代码。</p>
<h4><a href="#2-opensnoop"></a>2、 opensnoop</h4>
<p>接着上面继续，所以，<code>grepconf.sh</code> 可能是一个 shell 脚本，对吧？ 我将运行 <code>file(1)</code> 来检查它，并使用<a href="https://github.com/brendangregg/perf-tools/blob/master/opensnoop">opensnoop</a> bcc 工具来查看打开的文件：</p>
<pre><code class="hljs lsl"># /usr/share/bcc/tools/opensnoop
PID    COMM               FD ERR PATH
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /etc/ld.so.cache
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libmagic.so<span class="hljs-number">.1</span>
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libz.so<span class="hljs-number">.1</span>
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libc.so<span class="hljs-number">.6</span>
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /usr/lib/locale/locale-archive
<span class="hljs-number">12420</span>  file               <span class="hljs-number">-1</span>   <span class="hljs-number">2</span> /etc/magic.mgc
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /etc/magic
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /usr/share/misc/magic.mgc
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /usr/lib64/gconv/gconv-modules.cache
<span class="hljs-number">12420</span>  file                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /usr/libexec/grepconf.sh
<span class="hljs-number">1</span>      systemd            <span class="hljs-number">16</span>   <span class="hljs-number">0</span> /proc/<span class="hljs-number">565</span>/cgroup
<span class="hljs-number">1</span>      systemd            <span class="hljs-number">16</span>   <span class="hljs-number">0</span> /proc/<span class="hljs-number">536</span>/cgroup

</code></pre><p>像 <code>execsnoop</code> 和 <code>opensnoop</code> 这样的工具会将每个事件打印一行。上图显示 <code>file(1)</code> 命令当前打开（或尝试打开）的文件：返回的文件描述符（“FD” 列）对于 <code>/etc/magic.mgc</code> 是 -1，而 “ERR” 列指示它是“文件未找到”。我不知道该文件，也不知道 <code>file(1)</code> 正在读取的 <code>/usr/share/misc/magic.mgc</code> 文件是什么。我不应该感到惊讶，但是 <code>file(1)</code> 在识别文件类型时没有问题：</p>
<pre><code class="hljs gradle"># <span class="hljs-keyword">file</span> <span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/misc/m</span>agic.mgc <span class="hljs-regexp">/etc/m</span>agic
<span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/misc/m</span>agic.mgc: magic binary <span class="hljs-keyword">file</span> <span class="hljs-keyword">for</span> <span class="hljs-keyword">file</span>(<span class="hljs-number">1</span>) cmd (version <span class="hljs-number">14</span>) (little endian)
<span class="hljs-regexp">/etc/m</span>agic:                magic text <span class="hljs-keyword">file</span> <span class="hljs-keyword">for</span> <span class="hljs-keyword">file</span>(<span class="hljs-number">1</span>) cmd, ASCII text

</code></pre><p><code>opensnoop</code> 通过跟踪 <code>open()</code> 系统调用来工作。为什么不使用 <code>strace -feopen file</code> 命令呢？ 在这种情况下是可以的。然而，<code>opensnoop</code> 的一些优点在于它能在系统范围内工作，并且跟踪所有进程的 <code>open()</code> 系统调用。注意上例的输出中包括了从 systemd 打开的文件。<code>opensnoop</code> 应该系统开销更低：BPF 跟踪已经被优化过，而当前版本的 <code>strace(1)</code> 仍然使用较老和较慢的 <code>ptrace(2)</code> 接口。</p>
<h4><a href="#3-xfsslower"></a>3、 xfsslower</h4>
<p>bcc/BPF 不仅仅可以分析系统调用。<a href="https://github.com/iovisor/bcc/blob/master/tools/xfsslower.py">xfsslower</a> 工具可以跟踪大于 1 毫秒（参数）延迟的常见 XFS 文件系统操作。</p>
<pre><code class="hljs tap"><span class="hljs-comment"># /usr/share/bcc/tools/xfsslower 1</span>
Tracing XFS operations slower than<span class="hljs-number"> 1 </span>ms
TIME     COMM           PID    T BYTES   OFF_KB   LAT(ms) FILENAME
14:17:34 systemd-journa<span class="hljs-number"> 530 </span>   S<span class="hljs-number"> 0 </span>     <span class="hljs-number"> 0 </span>          1.69 system.journal
14:17:35 auditd        <span class="hljs-number"> 651 </span>   S<span class="hljs-number"> 0 </span>     <span class="hljs-number"> 0 </span>          2.43 audit.log
14:17:42 cksum         <span class="hljs-number"> 4167 </span>  R<span class="hljs-number"> 52976 </span> <span class="hljs-number"> 0 </span>          1.04 at
14:17:45 cksum         <span class="hljs-number"> 4168 </span>  R<span class="hljs-number"> 53264 </span> <span class="hljs-number"> 0 </span>          1.62 [
14:17:45 cksum         <span class="hljs-number"> 4168 </span>  R<span class="hljs-number"> 65536 </span> <span class="hljs-number"> 0 </span>          1.01 certutil
14:17:45 cksum         <span class="hljs-number"> 4168 </span>  R<span class="hljs-number"> 65536 </span> <span class="hljs-number"> 0 </span>          1.01 dir
14:17:45 cksum         <span class="hljs-number"> 4168 </span>  R<span class="hljs-number"> 65536 </span> <span class="hljs-number"> 0 </span>          1.17 dirmngr-client
14:17:46 cksum         <span class="hljs-number"> 4168 </span>  R<span class="hljs-number"> 65536 </span> <span class="hljs-number"> 0 </span>          1.06 grub2-file
14:17:46 cksum         <span class="hljs-number"> 4168 </span>  R<span class="hljs-number"> 65536 </span> <span class="hljs-number"> 128 </span>        1.01 grub2-fstest
[...]

</code></pre><p>在上图输出中，我捕获到了多个延迟超过 1 毫秒 的 <code>cksum(1)</code> 读取操作（字段 “T” 等于 “R”）。这是在 <code>xfsslower</code> 工具运行的时候，通过在 XFS 中动态地检测内核函数实现的，并当它结束的时候解除该检测。这个 bcc 工具也有其它文件系统的版本：<code>ext4slower</code>、<code>btrfsslower</code>、<code>zfsslower</code> 和 <code>nfsslower</code>。</p>
<p>这是个有用的工具，也是 BPF 追踪的重要例子。对文件系统性能的传统分析主要集中在块 I/O 统计信息 —— 通常你看到的是由 <code>iostat(1)</code> 工具输出，并由许多性能监视 GUI 绘制的图表。这些统计数据显示的是磁盘如何执行，而不是真正的文件系统如何执行。通常比起磁盘来说，你更关心的是文件系统的性能，因为应用程序是在文件系统中发起请求和等待。并且，文件系统的性能可能与磁盘的性能大为不同！文件系统可以完全从内存缓存中读取数据，也可以通过预读算法和回写缓存来填充缓存。<code>xfsslower</code> 显示了文件系统的性能 —— 这是应用程序直接体验到的性能。通常这对于排除整个存储子系统的问题是有用的；如果确实没有文件系统延迟，那么性能问题很可能是在别处。</p>
<h4><a href="#4-biolatency"></a>4、 biolatency</h4>
<p>虽然文件系统性能对于理解应用程序性能非常重要，但研究磁盘性能也是有好处的。当各种缓存技巧都无法挽救其延迟时，磁盘的低性能终会影响应用程序。 磁盘性能也是容量规划研究的目标。</p>
<p><code>iostat(1)</code> 工具显示了平均磁盘 I/O 延迟，但平均值可能会引起误解。 以直方图的形式研究 I/O 延迟的分布是有用的，这可以通过使用 [biolatency] 来实现<a href="https://github.com/iovisor/bcc/blob/master/tools/biolatency.py">18</a>：</p>
<pre><code class="hljs tap"><span class="hljs-comment"># /usr/share/bcc/tools/biolatency</span>
Tracing block device I/O... Hit Ctrl-C to end.
^C
     usecs               : count     distribution
        <span class="hljs-number"> 0 </span>-&gt;<span class="hljs-number"> 1 </span>         :<span class="hljs-number"> 0 </span>       |                                        |
        <span class="hljs-number"> 2 </span>-&gt;<span class="hljs-number"> 3 </span>         :<span class="hljs-number"> 0 </span>       |                                        |
        <span class="hljs-number"> 4 </span>-&gt;<span class="hljs-number"> 7 </span>         :<span class="hljs-number"> 0 </span>       |                                        |
        <span class="hljs-number"> 8 </span>-&gt;<span class="hljs-number"> 15 </span>        :<span class="hljs-number"> 0 </span>       |                                        |
       <span class="hljs-number"> 16 </span>-&gt;<span class="hljs-number"> 31 </span>        :<span class="hljs-number"> 0 </span>       |                                        |
       <span class="hljs-number"> 32 </span>-&gt;<span class="hljs-number"> 63 </span>        :<span class="hljs-number"> 1 </span>       |                                        |
       <span class="hljs-number"> 64 </span>-&gt;<span class="hljs-number"> 127 </span>       :<span class="hljs-number"> 63 </span>      |****                                    |
      <span class="hljs-number"> 128 </span>-&gt;<span class="hljs-number"> 255 </span>       :<span class="hljs-number"> 121 </span>     |*********                               |
      <span class="hljs-number"> 256 </span>-&gt;<span class="hljs-number"> 511 </span>       :<span class="hljs-number"> 483 </span>     |************************************    |
      <span class="hljs-number"> 512 </span>-&gt;<span class="hljs-number"> 1023 </span>      :<span class="hljs-number"> 532 </span>     |****************************************|
     <span class="hljs-number"> 1024 </span>-&gt;<span class="hljs-number"> 2047 </span>      :<span class="hljs-number"> 117 </span>     |********                                |
     <span class="hljs-number"> 2048 </span>-&gt;<span class="hljs-number"> 4095 </span>      :<span class="hljs-number"> 8 </span>       |                                        |

</code></pre><p>这是另一个有用的工具和例子；它使用一个名为 maps 的 BPF 特性，它可以用来实现高效的内核摘要统计。从内核层到用户层的数据传输仅仅是“计数”列。 用户级程序生成其余的。</p>
<p>值得注意的是，这种工具大多支持 CLI 选项和参数，如其使用信息所示：</p>
<pre><code class="hljs stata"># /usr/share/bcc/tools/biolatency -<span class="hljs-built_in">h</span>
usage: biolatency [-<span class="hljs-keyword">h</span>] [-T] [-Q] [-<span class="hljs-keyword">m</span>] [-<span class="hljs-keyword">D</span>] [interval] [<span class="hljs-keyword">count</span>]

<span class="hljs-keyword">Summarize</span> block device I/O latency <span class="hljs-keyword">as</span> a <span class="hljs-keyword">histogram</span>

positional arguments:
  interval            output interval, <span class="hljs-keyword">in</span> seconds
  <span class="hljs-keyword">count</span>               number of outputs

optional arguments:
  -<span class="hljs-keyword">h</span>, --<span class="hljs-keyword">help</span>          show this <span class="hljs-keyword">help</span> message and <span class="hljs-keyword">exit</span>
  -T, --timestamp     <span class="hljs-keyword">include</span> timestamp <span class="hljs-keyword">on</span> output
  -Q, --queued        <span class="hljs-keyword">include</span> OS queued time <span class="hljs-keyword">in</span> I/O time
  -<span class="hljs-keyword">m</span>, --milliseconds  millisecond <span class="hljs-keyword">histogram</span>
  -<span class="hljs-keyword">D</span>, --disks         <span class="hljs-keyword">print</span> a <span class="hljs-keyword">histogram</span> per disk device

examples:
    ./biolatency            # <span class="hljs-keyword">summarize</span> block I/O latency <span class="hljs-keyword">as</span> a <span class="hljs-keyword">histogram</span>
    ./biolatency 1 10       # <span class="hljs-keyword">print</span> 1 second summaries, 10 times
    ./biolatency -mT 1      # 1s summaries, milliseconds, and timestamps
    ./biolatency -Q         # <span class="hljs-keyword">include</span> OS queued time <span class="hljs-keyword">in</span> I/O time
    ./biolatency -<span class="hljs-keyword">D</span>         # show each disk device separately

</code></pre><p>它们的行为就像其它 Unix 工具一样，以利于采用而设计。</p>
<h4><a href="#5-tcplife"></a>5、 tcplife</h4>
<p>另一个有用的工具是 <a href="https://github.com/iovisor/bcc/blob/master/tools/tcplife.py">tcplife</a> ，该例显示 TCP 会话的生命周期和吞吐量统计。</p>
<pre><code class="hljs lsl"># /usr/share/bcc/tools/tcplife
PID   COMM       LADDR           LPORT RADDR           RPORT TX_KB RX_KB MS
<span class="hljs-number">12759</span> sshd       <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.101</span>  <span class="hljs-number">22</span>    <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.1</span>    <span class="hljs-number">60639</span>     <span class="hljs-number">2</span>     <span class="hljs-number">3</span> <span class="hljs-number">1863.82</span>
<span class="hljs-number">12783</span> sshd       <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.101</span>  <span class="hljs-number">22</span>    <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.1</span>    <span class="hljs-number">60640</span>     <span class="hljs-number">3</span>     <span class="hljs-number">3</span> <span class="hljs-number">9174.53</span>
<span class="hljs-number">12844</span> wget       <span class="hljs-number">10.0</span><span class="hljs-number">.2</span><span class="hljs-number">.15</span>       <span class="hljs-number">34250</span> <span class="hljs-number">54.204</span><span class="hljs-number">.39</span><span class="hljs-number">.132</span>   <span class="hljs-number">443</span>      <span class="hljs-number">11</span>  <span class="hljs-number">1870</span> <span class="hljs-number">5712.26</span>
<span class="hljs-number">12851</span> curl       <span class="hljs-number">10.0</span><span class="hljs-number">.2</span><span class="hljs-number">.15</span>       <span class="hljs-number">34252</span> <span class="hljs-number">54.204</span><span class="hljs-number">.39</span><span class="hljs-number">.132</span>   <span class="hljs-number">443</span>       <span class="hljs-number">0</span>    <span class="hljs-number">74</span> <span class="hljs-number">505.90</span>

</code></pre><p>在你说 “我不是可以只通过 <code>tcpdump(8)</code> 就能输出这个？” 之前请注意，运行 <code>tcpdump(8)</code> 或任何数据包嗅探器，在高数据包速率的系统上的开销会很大，即使 <code>tcpdump(8)</code> 的用户层和内核层机制已经过多年优化（要不可能更差）。<code>tcplife</code> 不会测试每个数据包；它只会有效地监视 TCP 会话状态的变化，并由此得到该会话的持续时间。它还使用已经跟踪了吞吐量的内核计数器，以及进程和命令信息（“PID” 和 “COMM” 列），这些对于 <code>tcpdump(8)</code> 等线上嗅探工具是做不到的。</p>
<h4><a href="#6-gethostlatency"></a>6、 gethostlatency</h4>
<p>之前的每个例子都涉及到内核跟踪，所以我至少需要一个用户级跟踪的例子。 这就是 <a href="https://github.com/iovisor/bcc/blob/master/tools/gethostlatency.py">gethostlatency</a>，它检测用于名称解析的 <code>gethostbyname(3)</code> 和相关的库调用：</p>
<pre><code class="hljs less"># /<span class="hljs-selector-tag">usr</span>/<span class="hljs-selector-tag">share</span>/<span class="hljs-selector-tag">bcc</span>/<span class="hljs-selector-tag">tools</span>/<span class="hljs-selector-tag">gethostlatency</span>
<span class="hljs-selector-tag">TIME</span>      <span class="hljs-selector-tag">PID</span>    <span class="hljs-selector-tag">COMM</span>                  <span class="hljs-selector-tag">LATms</span> <span class="hljs-selector-tag">HOST</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:43</span><span class="hljs-selector-pseudo">:33</span>  <span class="hljs-selector-tag">12903</span>  <span class="hljs-selector-tag">curl</span>                 <span class="hljs-selector-tag">188</span><span class="hljs-selector-class">.98</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.com</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:43</span><span class="hljs-selector-pseudo">:36</span>  <span class="hljs-selector-tag">12905</span>  <span class="hljs-selector-tag">curl</span>                   <span class="hljs-selector-tag">8</span><span class="hljs-selector-class">.45</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.com</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:43</span><span class="hljs-selector-pseudo">:40</span>  <span class="hljs-selector-tag">12907</span>  <span class="hljs-selector-tag">curl</span>                   <span class="hljs-selector-tag">6</span><span class="hljs-selector-class">.55</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.com</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:43</span><span class="hljs-selector-pseudo">:44</span>  <span class="hljs-selector-tag">12911</span>  <span class="hljs-selector-tag">curl</span>                   <span class="hljs-selector-tag">9</span><span class="hljs-selector-class">.67</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.com</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:45</span><span class="hljs-selector-pseudo">:02</span>  <span class="hljs-selector-tag">12948</span>  <span class="hljs-selector-tag">curl</span>                  <span class="hljs-selector-tag">19</span><span class="hljs-selector-class">.66</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.cats</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:45</span><span class="hljs-selector-pseudo">:06</span>  <span class="hljs-selector-tag">12950</span>  <span class="hljs-selector-tag">curl</span>                  <span class="hljs-selector-tag">18</span><span class="hljs-selector-class">.37</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.cats</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:45</span><span class="hljs-selector-pseudo">:07</span>  <span class="hljs-selector-tag">12952</span>  <span class="hljs-selector-tag">curl</span>                  <span class="hljs-selector-tag">13</span><span class="hljs-selector-class">.64</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.cats</span>
<span class="hljs-selector-tag">06</span><span class="hljs-selector-pseudo">:45</span><span class="hljs-selector-pseudo">:19</span>  <span class="hljs-selector-tag">13139</span>  <span class="hljs-selector-tag">curl</span>                  <span class="hljs-selector-tag">13</span><span class="hljs-selector-class">.10</span> <span class="hljs-selector-tag">opensource</span><span class="hljs-selector-class">.cats</span>

</code></pre><p>是的，总是有 DNS 请求，所以有一个工具来监视系统范围内的 DNS 请求会很方便（这只有在应用程序使用标准系统库时才有效）。看看我如何跟踪多个对 “opensource.com” 的查找？ 第一个是 188.98 毫秒，然后更快，不到 10 毫秒，毫无疑问，这是缓存的作用。它还追踪多个对 “opensource.cats” 的查找，一个不存在的可怜主机名，但我们仍然可以检查第一个和后续查找的延迟。（第二次查找后是否有一些否定缓存的影响？）</p>
<h4><a href="#7-trace"></a>7、 trace</h4>
<p>好的，再举一个例子。 <a href="https://github.com/iovisor/bcc/blob/master/tools/trace.py">trace</a> 工具由 Sasha Goldshtein 提供，并提供了一些基本的 <code>printf(1)</code> 功能和自定义探针。 例如：</p>
<pre><code class="hljs autoit"><span class="hljs-meta"># /usr/share/bcc/tools/trace <span class="hljs-string">'pam:pam_start "%s: %s", arg1, arg2'</span></span>
PID    TID    COMM         <span class="hljs-function"><span class="hljs-keyword">FUNC</span>             -</span>
<span class="hljs-number">13266</span>  <span class="hljs-number">13266</span>  sshd         pam_start        sshd: root

</code></pre><p>在这里，我正在跟踪 <code>libpam</code> 及其 <code>pam_start(3)</code> 函数，并将其两个参数都打印为字符串。 <code>libpam</code> 用于插入式身份验证模块系统，该输出显示 sshd 为 “root” 用户调用了 <code>pam_start()</code>（我登录了）。 其使用信息中有更多的例子（<code>trace -h</code>），而且所有这些工具在 bcc 版本库中都有手册页和示例文件。 例如 <code>trace_example.txt</code> 和 <code>trace.8</code>。</p>
<h3><a href="#通过包安装-bcc"></a>通过包安装 bcc</h3>
<p>安装 bcc 最佳的方法是从 iovisor 仓储库中安装，按照 bcc 的 <a href="https://github.com/iovisor/bcc/blob/master/INSTALL.md#fedora---binary">INSTALL.md</a> 进行即可。<a href="https://www.iovisor.org/">IO Visor</a> 是包括了 bcc 的 Linux 基金会项目。4.x 系列 Linux 内核中增加了这些工具所使用的 BPF 增强功能，直到 4.9 添加了全部支持。这意味着拥有 4.8 内核的 Fedora 25 可以运行这些工具中的大部分。 使用 4.11 内核的 Fedora 26 可以全部运行它们（至少在目前是这样）。</p>
<p>如果你使用的是 Fedora 25（或者 Fedora 26，而且这个帖子已经在很多个月前发布了 —— 你好，来自遥远的过去！），那么这个通过包安装的方式是可以工作的。 如果您使用的是 Fedora 26，那么请跳至“通过源代码安装”部分，它避免了一个<a href="https://reviews.llvm.org/rL302055">已修复的</a>的<a href="https://github.com/iovisor/bcc/issues/1221">已知</a>错误。 这个错误修复目前还没有进入 Fedora 26 软件包的依赖关系。 我使用的系统是：</p>
<pre><code class="hljs llvm"># uname -a
Linux localhost.localdomain <span class="hljs-number">4.11</span>.<span class="hljs-number">8</span><span class="hljs-number">-300</span>.fc<span class="hljs-number">26</span>.<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-symbol">#1</span> SMP Thu Jun <span class="hljs-number">29</span> <span class="hljs-number">20</span>:<span class="hljs-number">09</span>:<span class="hljs-number">48</span> UTC <span class="hljs-number">2017</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> GNU/Linux
# cat /etc/fedora-<span class="hljs-keyword">release</span>
Fedora <span class="hljs-keyword">release</span> <span class="hljs-number">26</span> (Twenty Six)

</code></pre><p>以下是我所遵循的安装步骤，但请参阅 INSTALL.md 获取更新的版本：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> -e <span class="hljs-string">'[iovisor]\nbaseurl=https://repo.iovisor.org/yum/nightly/f25/$basearch\nenabled=1\ngpgcheck=0'</span> | sudo tee /etc/yum.repos.d/iovisor.repo</span>
<span class="hljs-meta">#</span><span class="bash"> dnf install bcc-tools</span>
[...]
Total download size: 37 M
Installed size: 143 M
Is this ok [y/N]: y

</code></pre><p>安装完成后，您可以在 <code>/usr/share</code> 中看到新的工具：</p>
<pre><code class="hljs mipsasm"><span class="hljs-comment"># ls /usr/share/bcc/tools/</span>
argdist       dcsnoop              killsnoop       softirqs    trace
<span class="hljs-keyword">bashreadline </span> dcstat               <span class="hljs-keyword">llcstat </span>        solisten    ttysnoop
[...]

</code></pre><p>试着运行其中一个：</p>
<pre><code class="hljs livecodeserver"><span class="hljs-comment"># /usr/share/bcc/tools/opensnoop</span>
chdir(/lib/modules/<span class="hljs-number">4.11</span><span class="hljs-number">.8</span><span class="hljs-number">-300.</span>fc26.x86_64/build): No such <span class="hljs-built_in">file</span> <span class="hljs-keyword">or</span> <span class="hljs-built_in">directory</span>
Traceback (most recent call <span class="hljs-keyword">last</span>):
  File <span class="hljs-string">"/usr/share/bcc/tools/opensnoop"</span>, <span class="hljs-built_in">line</span> <span class="hljs-number">126</span>, <span class="hljs-keyword">in</span> 
    b = BPF(<span class="hljs-keyword">text</span>=bpf_text)
  File <span class="hljs-string">"/usr/lib/python3.6/site-packages/bcc/__init__.py"</span>, <span class="hljs-built_in">line</span> <span class="hljs-number">284</span>, <span class="hljs-keyword">in</span> __init__
    raise Exception(<span class="hljs-string">"Failed to compile BPF module %s"</span> % src_file)
Exception: Failed <span class="hljs-built_in">to</span> compile BPF module

</code></pre><p>运行失败，提示 <code>/lib/modules/4.11.8-300.fc26.x86_64/build</code> 丢失。 如果你也遇到这个问题，那只是因为系统缺少内核头文件。 如果你看看这个文件指向什么（这是一个符号链接），然后使用 <code>dnf whatprovides</code> 来搜索它，它会告诉你接下来需要安装的包。 对于这个系统，它是：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">dnf</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">kernel-devel-4</span><span class="hljs-selector-class">.11</span><span class="hljs-selector-class">.8-300</span><span class="hljs-selector-class">.fc26</span><span class="hljs-selector-class">.x86_64</span>
<span class="hljs-selector-attr">[...]</span>
<span class="hljs-selector-tag">Total</span> <span class="hljs-selector-tag">download</span> <span class="hljs-selector-tag">size</span>: 20 <span class="hljs-selector-tag">M</span>
<span class="hljs-selector-tag">Installed</span> <span class="hljs-selector-tag">size</span>: 63 <span class="hljs-selector-tag">M</span>
<span class="hljs-selector-tag">Is</span> <span class="hljs-selector-tag">this</span> <span class="hljs-selector-tag">ok</span> <span class="hljs-selector-attr">[y/N]</span>: <span class="hljs-selector-tag">y</span>
<span class="hljs-selector-attr">[...]</span>

</code></pre><p>现在：</p>
<pre><code class="hljs lsl"># /usr/share/bcc/tools/opensnoop
PID    COMM               FD ERR PATH
<span class="hljs-number">11792</span>  ls                  <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /etc/ld.so.cache
<span class="hljs-number">11792</span>  ls                  <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libselinux.so<span class="hljs-number">.1</span>
<span class="hljs-number">11792</span>  ls                  <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libcap.so<span class="hljs-number">.2</span>
<span class="hljs-number">11792</span>  ls                  <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libc.so<span class="hljs-number">.6</span>
[...]

</code></pre><p>运行起来了。 这是捕获自另一个窗口中的 ls 命令活动。 请参阅前面的部分以使用其它有用的命令。</p>
<h3><a href="#通过源码安装"></a>通过源码安装</h3>
<p>如果您需要从源代码安装，您还可以在 <a href="https://github.com/iovisor/bcc/blob/master/INSTALL.md#fedora---source">INSTALL.md</a> 中找到文档和更新说明。 我在 Fedora 26 上做了如下的事情：</p>
<pre><code class="hljs sql">sudo dnf <span class="hljs-keyword">install</span> -y bison cmake ethtool flex git iperf libstdc++-<span class="hljs-keyword">static</span> \
  python-netaddr python-pip gcc gcc-c++ make zlib-devel \
  elfutils-libelf-devel
sudo dnf <span class="hljs-keyword">install</span> -y luajit luajit-devel  # <span class="hljs-keyword">for</span> Lua support
sudo dnf <span class="hljs-keyword">install</span> -y \
  <span class="hljs-keyword">http</span>://pkgs.repoforge.org/netperf/netperf<span class="hljs-number">-2.6</span><span class="hljs-number">.0</span><span class="hljs-number">-1.</span>el6.rf.x86_64.rpm
sudo pip <span class="hljs-keyword">install</span> pyroute2
sudo dnf <span class="hljs-keyword">install</span> -y clang clang-devel llvm llvm-devel llvm-<span class="hljs-keyword">static</span> ncurses-devel

</code></pre><p>除 <code>netperf</code> 外一切妥当，其中有以下错误：</p>
<pre><code class="hljs livecodeserver">Curl error (<span class="hljs-number">28</span>): Timeout was reached <span class="hljs-keyword">for</span> <span class="hljs-keyword">http</span>://pkgs.repoforge.org/netperf/netperf<span class="hljs-number">-2.6</span><span class="hljs-number">.0</span><span class="hljs-number">-1.</span>el6.rf.x86_64.rpm [Connection timed out <span class="hljs-keyword">after</span> <span class="hljs-number">120002</span> <span class="hljs-built_in">milliseconds</span>]

</code></pre><p>不必理会，<code>netperf</code> 是可选的，它只是用于测试，而 bcc 没有它也会编译成功。</p>
<p>以下是余下的 bcc 编译和安装步骤：</p>
<pre><code class="hljs jboss-cli">git clone https:<span class="hljs-string">//github.com/iovisor/bcc.git</span>
mkdir bcc/build; <span class="hljs-keyword">cd</span> bcc/build
cmake <span class="hljs-string">..</span> -DCMAKE_INSTALL_PREFIX=<span class="hljs-string">/usr</span>
make
sudo make install

</code></pre><p>现在，命令应该可以工作了：</p>
<pre><code class="hljs lsl"># /usr/share/bcc/tools/opensnoop
PID    COMM               FD ERR PATH
<span class="hljs-number">4131</span>   date                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /etc/ld.so.cache
<span class="hljs-number">4131</span>   date                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /lib64/libc.so<span class="hljs-number">.6</span>
<span class="hljs-number">4131</span>   date                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /usr/lib/locale/locale-archive
<span class="hljs-number">4131</span>   date                <span class="hljs-number">3</span>   <span class="hljs-number">0</span> /etc/localtime
[...]

</code></pre><h3><a href="#写在最后和其他的前端"></a>写在最后和其他的前端</h3>
<p>这是一个可以在 Fedora 和 Red Hat 系列操作系统上使用的新 BPF 性能分析强大功能的快速浏览。我演示了 BPF 的流行前端 <a href="https://github.com/iovisor/bcc">bcc</a> ，并包括了其在 Fedora 上的安装说明。bcc 附带了 60 多个用于性能分析的新工具，这将帮助您充分利用 Linux 系统。也许你会直接通过 SSH 使用这些工具，或者一旦 GUI 监控程序支持 BPF 的话，你也可以通过它们来使用相同的功能。</p>
<p>此外，bcc 并不是正在开发的唯一前端。<a href="https://github.com/iovisor/ply">ply</a> 和 <a href="https://github.com/ajor/bpftrace">bpftrace</a>，旨在为快速编写自定义工具提供更高级的语言支持。此外，<a href="https://sourceware.org/systemtap/">SystemTap</a> 刚刚发布<a href="https://sourceware.org/ml/systemtap/2017-q4/msg00096.html">版本3.2</a>，包括一个早期的实验性 eBPF 后端。 如果这个继续开发，它将为运行多年来开发的许多 SystemTap 脚本和 tapset（库）提供一个安全和高效的生产级引擎。（随同 eBPF 使用 SystemTap 将是另一篇文章的主题。）</p>
<p>如果您需要开发自定义工具，那么也可以使用 bcc 来实现，尽管语言比 SystemTap、ply 或 bpftrace 要冗长得多。我的 bcc 工具可以作为代码示例，另外我还贡献了用 Python 开发 bcc 工具的<a href="https://github.com/iovisor/bcc/blob/master/docs/tutorial_bcc_python_developer.md">教程</a>。 我建议先学习 bcc 的 multi-tools，因为在需要编写新工具之前，你可能会从里面获得很多经验。 您可以从它们的 bcc 存储库[funccount] <a href="https://github.com/iovisor/bcc/blob/master/tools/funccount_example.txt">34</a>，[funclatency] <a href="https://github.com/iovisor/bcc/blob/master/tools/funclatency_example.txt">35</a>，[funcslower] <a href="https://github.com/iovisor/bcc/blob/master/tools/funcslower_example.txt">36</a>，[stackcount] <a href="https://github.com/iovisor/bcc/blob/master/tools/stackcount_example.txt">37</a>，[trace] <a href="https://github.com/iovisor/bcc/blob/master/tools/trace_example.txt">38</a> ，[argdist] <a href="https://github.com/iovisor/bcc/blob/master/tools/argdist_example.txt">39</a> 的示例文件中研究 bcc。</p>
<p>感谢[Opensource.com] <a href="http://opensource.com/">40</a>进行编辑。</p>
<h3><a href="#关于作者"></a>关于作者</h3>
<p><a href="https://opensource.com/users/brendang"><img src="https://p0.ssl.qhimg.com/t0121386fac38ad1e63.png" alt="Brendan Gregg"></a></p>
<p>Brendan Gregg 是 Netflix 的一名高级性能架构师，在那里他进行大规模的计算机性能设计、分析和调优。</p>
<p>（题图：opensource.com）</p>
<hr>
<p>via:<a href="https://opensource.com/article/17/11/bccbpf-performance">https://opensource.com/article/17/11/bccbpf-performance</a></p>
<p>作者：<a href="https://opensource.com/users/brendang">Brendan Gregg</a> 译者：<a href="https://github.com/yongshouzhang">yongshouzhang</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
7 个使用 bcc/BPF 的性能分析神器

## 原文链接
[https://www.zcfy.cc/article/7-tools-for-analyzing-performance-in-linux-with-bccbpf](https://www.zcfy.cc/article/7-tools-for-analyzing-performance-in-linux-with-bccbpf)


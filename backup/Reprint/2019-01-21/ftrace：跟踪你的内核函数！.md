---
title: 'ftrace：跟踪你的内核函数！' 
date: 2019-01-21 2:30:06
hidden: true
slug: 2dcqdgdjn8y
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ftrace跟踪你的内核函数"></a>ftrace：跟踪你的内核函数！</h1>
<p>大家好！今天我们将去讨论一个调试工具：ftrace，之前我的博客上还没有讨论过它。还有什么能比一个新的调试工具更让人激动呢？</p>
<p>这个非常棒的 ftrace 并不是个新的工具！它大约在 Linux 的 2.6 内核版本中就有了，时间大约是在 2008 年。<a href="https://lwn.net/Articles/290277/">这一篇是我用谷歌能找到的最早的文档</a>。因此，如果你是一个调试系统的“老手”，可能早就已经使用它了！</p>
<p>我知道，ftrace 已经存在了大约 2.5 年了（LCTT 译注：距本文初次写作时），但是还没有真正的去学习它。假设我明天要召开一个专题研究会，那么，关于 ftrace 应该讨论些什么？因此，今天是时间去讨论一下它了！</p>
<h3><a href="#什么是-ftrace"></a>什么是 ftrace？</h3>
<p>ftrace 是一个 Linux 内核特性，它可以让你去跟踪 Linux 内核的函数调用。为什么要这么做呢？好吧，假设你调试一个奇怪的问题，而你已经得到了你的内核版本中这个问题在源代码中的开始的位置，而你想知道这里到底发生了什么？</p>
<p>每次在调试的时候，我并不会经常去读内核源代码，但是，极个别的情况下会去读它！例如，本周在工作中，我有一个程序在内核中卡死了。查看到底是调用了什么函数，能够帮我更好的理解在内核中发生了什么，哪些系统涉及其中！（在我的那个案例中，它是虚拟内存系统）。</p>
<p>我认为 ftrace 是一个十分好用的工具（它肯定没有 <code>strace</code> 那样使用广泛，也比它难以使用），但是它还是值得你去学习。因此，让我们开始吧！</p>
<h3><a href="#使用-ftrace-的第一步"></a>使用 ftrace 的第一步</h3>
<p>不像 <code>strace</code> 和 <code>perf</code>，ftrace 并不是真正的 <strong>程序</strong> – 你不能只运行 <code>ftrace my_cool_function</code>。那样太容易了！</p>
<p>如果你去读 <a href="https://lwn.net/Articles/365835/">使用 ftrace 调试内核</a>，它会告诉你从 <code>cd /sys/kernel/debug/tracing</code> 开始，然后做很多文件系统的操作。</p>
<p>对于我来说，这种办法太麻烦——一个使用 ftrace 的简单例子像是这样：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">cd</span> /sys/kernel/<span class="hljs-keyword">debug</span>/tracing
<span class="hljs-keyword">echo</span> <span class="hljs-function"><span class="hljs-keyword">function</span> &gt; <span class="hljs-title">current_tracer</span></span>
<span class="hljs-keyword">echo</span> do_page_fault &gt; set_ftrace_filter
<span class="hljs-keyword">cat</span> trace

</code></pre><p>这个文件系统是跟踪系统的接口（“给这些神奇的文件赋值，然后该发生的事情就会发生”）理论上看起来似乎可用，但是它不是我的首选方式。</p>
<p>幸运的是，ftrace 团队也考虑到这个并不友好的用户界面，因此，它有了一个更易于使用的界面，它就是 <code>trace-cmd</code>！！！<code>trace-cmd</code> 是一个带命令行参数的普通程序。我们后面将使用它！我在 LWN 上找到了一个 <code>trace-cmd</code> 的使用介绍：<a href="https://lwn.net/Articles/410200/">trace-cmd: Ftrace 的一个前端</a>。</p>
<h3><a href="#开始使用-trace-cmd让我们仅跟踪一个函数"></a>开始使用 trace-cmd：让我们仅跟踪一个函数</h3>
<p>首先，我需要去使用 <code>sudo apt-get install trace-cmd</code> 安装 <code>trace-cmd</code>，这一步很容易。</p>
<p>对于第一个 ftrace 的演示，我决定去了解我的内核如何去处理一个页面故障。当 Linux 分配内存时，它经常偷懒，（“你并不是_真的_计划去使用内存，对吗？”）。这意味着，当一个应用程序尝试去对分配给它的内存进行写入时，就会发生一个页面故障，而这个时候，内核才会真正的为应用程序去分配物理内存。</p>
<p>我们开始使用 <code>trace-cmd</code> 并让它跟踪 <code>do_page_fault</code> 函数！</p>
<pre><code class="hljs dockerfile">$ sudo trace-<span class="hljs-keyword">cmd</span><span class="bash"> record -p <span class="hljs-keyword">function</span> -l do_page_fault
</span>  plugin <span class="hljs-string">'function'</span>
Hit Ctrl^C to stop recording

</code></pre><p>我将它运行了几秒钟，然后按下了 <code>Ctrl+C</code>。 让我大吃一惊的是，它竟然产生了一个 2.5MB 大小的名为 <code>trace.dat</code> 的跟踪文件。我们来看一下这个文件的内容！</p>
<pre><code class="hljs delphi">$ sudo trace-cmd report
          chrome-<span class="hljs-number">15144</span> [<span class="hljs-number">000</span>] <span class="hljs-number">11446.466121</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
          chrome-<span class="hljs-number">15144</span> [<span class="hljs-number">000</span>] <span class="hljs-number">11446.467910</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
          chrome-<span class="hljs-number">15144</span> [<span class="hljs-number">000</span>] <span class="hljs-number">11446.469174</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
          chrome-<span class="hljs-number">15144</span> [<span class="hljs-number">000</span>] <span class="hljs-number">11446.474225</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
          chrome-<span class="hljs-number">15144</span> [<span class="hljs-number">000</span>] <span class="hljs-number">11446.474386</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
          chrome-<span class="hljs-number">15144</span> [<span class="hljs-number">000</span>] <span class="hljs-number">11446.478768</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
 CompositorTileW-<span class="hljs-number">15154</span> [<span class="hljs-number">001</span>] <span class="hljs-number">11446.480172</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
          chrome-<span class="hljs-number">1830</span>  [<span class="hljs-number">003</span>] <span class="hljs-number">11446.486696</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
 CompositorTileW-<span class="hljs-number">15154</span> [<span class="hljs-number">001</span>] <span class="hljs-number">11446.488983</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
 CompositorTileW-<span class="hljs-number">15154</span> [<span class="hljs-number">001</span>] <span class="hljs-number">11446.489034</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault
 CompositorTileW-<span class="hljs-number">15154</span> [<span class="hljs-number">001</span>] <span class="hljs-number">11446.489045</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>:</span>             do_page_fault


</code></pre><p>看起来很整洁 – 它展示了进程名（chrome）、进程 ID（15144）、CPU ID（000），以及它跟踪的函数。</p>
<p>通过察看整个文件，（<code>sudo trace-cmd report | grep chrome</code>）可以看到，我们跟踪了大约 1.5 秒，在这 1.5 秒的时间段内，Chrome 发生了大约 500 个页面故障。真是太酷了！这就是我们做的第一个 ftrace！</p>
<h3><a href="#下一个-ftrace-技巧我们来跟踪一个进程"></a>下一个 ftrace 技巧：我们来跟踪一个进程！</h3>
<p>好吧，只看一个函数是有点无聊！假如我想知道一个程序中都发生了什么事情。我使用一个名为 Hugo 的静态站点生成器。看看内核为 Hugo 都做了些什么事情？</p>
<p>在我的电脑上 Hugo 的 PID 现在是 25314，因此，我使用如下的命令去记录所有的内核函数：</p>
<pre><code class="hljs dockerfile">sudo trace-<span class="hljs-keyword">cmd</span><span class="bash"> record --<span class="hljs-built_in">help</span> <span class="hljs-comment"># I read the help!</span>
</span>sudo trace-<span class="hljs-keyword">cmd</span><span class="bash"> record -p <span class="hljs-keyword">function</span> -P 25314 <span class="hljs-comment"># record for PID 25314</span>
</span>
</code></pre><p><code>sudo trace-cmd report</code> 输出了 18,000 行。如果你对这些感兴趣，你可以看 <a href="https://gist.githubusercontent.com/jvns/e5c2d640f7ec76ed9ed579be1de3312e/raw/78b8425436dc4bb5bb4fa76a4f85d5809f7d1ef2/trace-cmd-report.txt">这里是所有的 18,000 行的输出</a>。</p>
<p>18,000 行太多了，因此，在这里仅摘录其中几行。</p>
<p>当系统调用 <code>clock_gettime</code> 运行的时候，都发生了什么：</p>
<pre><code class="hljs sqf"> compat_SyS_clock_gettime
    SyS_clock_gettime
       clockid_to_kclock
       posix_clock_realtime_get
          getnstimeofday64
             <span class="hljs-variable">__getnstimeofday64</span>
                arch_counter_read
    <span class="hljs-variable">__compat_put_timespec</span>

</code></pre><p>这是与进程调试相关的一些东西：</p>
<pre><code class="hljs sqf"> cpufreq_sched_irq_work
    wake_up_process
       try_to_wake_up
          <span class="hljs-variable">_raw_spin_lock_irqsave</span>
             do_raw_spin_lock
          <span class="hljs-variable">_raw_spin_lock</span>
             do_raw_spin_lock
          walt_ktime_clock
             ktime_get
                arch_counter_read
          walt_update_task_ravg
             exiting_task


</code></pre><p>虽然你可能还不理解它们是做什么的，但是，能够看到所有的这些函数调用也是件很酷的事情。</p>
<h3><a href="#function-graph-跟踪"></a>“function graph” 跟踪</h3>
<p>这里有另外一个模式，称为 <code>function_graph</code>。除了它既可以进入也可以退出一个函数外，其它的功能和函数跟踪器是一样的。<a href="https://gist.githubusercontent.com/jvns/f32e9b06bcd2f1f30998afdd93e4aaa5/raw/8154d9828bb895fd6c9b0ee062275055b3775101/function_graph.txt">这里是那个跟踪器的输出</a></p>
<pre><code class="hljs dockerfile">sudo trace-<span class="hljs-keyword">cmd</span><span class="bash"> record -p function_graph -P 25314
</span>
</code></pre><p>同样，这里只是一个片断（这次来自 futex 代码）：</p>
<pre><code class="hljs 1c">             <span class="hljs-string">|      futex_wake() {</span>
             <span class="hljs-string">|        get_futex_key() {</span>
             <span class="hljs-string">|          get_user_pages_fast() {</span>
  <span class="hljs-number">1.458</span> us   <span class="hljs-string">|            __get_user_pages_fast();</span>
  <span class="hljs-number">4.375</span> us   <span class="hljs-string">|          }</span>
             <span class="hljs-string">|          __might_sleep() {</span>
  <span class="hljs-number">0.292</span> us   <span class="hljs-string">|            ___might_sleep();</span>
  <span class="hljs-number">2.333</span> us   <span class="hljs-string">|          }</span>
  <span class="hljs-number">0.584</span> us   <span class="hljs-string">|          get_futex_key_refs();</span>
             <span class="hljs-string">|          unlock_page() {</span>
  <span class="hljs-number">0.291</span> us   <span class="hljs-string">|            page_waitqueue();</span>
  <span class="hljs-number">0.583</span> us   <span class="hljs-string">|            __wake_up_bit();</span>
  <span class="hljs-number">5.250</span> us   <span class="hljs-string">|          }</span>
  <span class="hljs-number">0.583</span> us   <span class="hljs-string">|          put_page();</span>
+ <span class="hljs-number">24.208</span> us  <span class="hljs-string">|        }</span>

</code></pre><p>我们看到在这个示例中，在 <code>futex_wake</code> 后面调用了 <code>get_futex_key</code>。这是在源代码中真实发生的事情吗？我们可以检查一下！！<a href="https://github.com/torvalds/linux/blob/v4.4/kernel/futex.c#L1313-L1324">这里是在 Linux 4.4 中 futex_wake 的定义</a> (我的内核版本是 4.4）。</p>
<p>为节省时间我直接贴出来，它的内容如下：</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-keyword">int</span>
<span class="hljs-title">futex_wake</span><span class="hljs-params">(u32 __user *uaddr, <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">int</span> flags, <span class="hljs-keyword">int</span> nr_wake, u32 <span class="hljs-built_in">bitset</span>)</span>
</span>{
    <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">futex_hash_bucket</span> *<span class="hljs-title">hb</span>;</span>
    <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">futex_q</span> *<span class="hljs-title">this</span>, *<span class="hljs-title">next</span>;</span>
    <span class="hljs-keyword">union</span> futex_key key = FUTEX_KEY_INIT;
    <span class="hljs-keyword">int</span> ret;
    WAKE_Q(wake_q);

    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">bitset</span>)
        <span class="hljs-keyword">return</span> -EINVAL;

    ret = get_futex_key(uaddr, flags &amp; FLAGS_SHARED, &amp;key, VERIFY_READ);

</code></pre><p>如你所见，在 <code>futex_wake</code> 中的第一个函数调用真的是 <code>get_futex_key</code>！ 太棒了！相比阅读内核代码，阅读函数跟踪肯定是更容易的找到结果的办法，并且让人高兴的是，还能看到所有的函数用了多长时间。</p>
<h3><a href="#如何知道哪些函数可以被跟踪"></a>如何知道哪些函数可以被跟踪</h3>
<p>如果你去运行 <code>sudo trace-cmd list -f</code>，你将得到一个你可以跟踪的函数的列表。它很简单但是也很重要。</p>
<h3><a href="#最后一件事事件"></a>最后一件事：事件！</h3>
<p>现在，我们已经知道了怎么去跟踪内核中的函数，真是太酷了！</p>
<p>还有一类我们可以跟踪的东西！有些事件与我们的函数调用并不相符。例如，你可能想知道当一个程序被调度进入或者离开 CPU 时，都发生了什么事件！你可能想通过“盯着”函数调用计算出来，但是，我告诉你，不可行！</p>
<p>由于函数也为你提供了几种事件，因此，你可以看到当重要的事件发生时，都发生了什么事情。你可以使用 <code>sudo cat /sys/kernel/debug/tracing/available_events</code> 来查看这些事件的一个列表。 </p>
<p>我查看了全部的 sched_switch 事件。我并不完全知道 sched_switch 是什么，但是，我猜测它与调度有关。</p>
<pre><code class="hljs dockerfile">sudo cat /sys/kernel/debug/tracing/available_events
sudo trace-<span class="hljs-keyword">cmd</span><span class="bash"> record -e <span class="hljs-built_in">sched</span>:sched_switch
</span>sudo trace-<span class="hljs-keyword">cmd</span><span class="bash"> report
</span>
</code></pre><p>输出如下：</p>
<pre><code class="hljs accesslog"> <span class="hljs-number">16169</span>.<span class="hljs-number">624862</span>:   Chrome_ChildIOT:<span class="hljs-number">24817</span> <span class="hljs-string">[112]</span> S ==&gt; chrome:<span class="hljs-number">15144</span> <span class="hljs-string">[120]</span>
 <span class="hljs-number">16169</span>.<span class="hljs-number">624992</span>:   chrome:<span class="hljs-number">15144</span> <span class="hljs-string">[120]</span> S ==&gt; swapper/<span class="hljs-number">3</span>:<span class="hljs-number">0</span> <span class="hljs-string">[120]</span>
 <span class="hljs-number">16169</span>.<span class="hljs-number">625202</span>:   swapper/<span class="hljs-number">3</span>:<span class="hljs-number">0</span> <span class="hljs-string">[120]</span> R ==&gt; Chrome_ChildIOT:<span class="hljs-number">24817</span> <span class="hljs-string">[112]</span>
 <span class="hljs-number">16169</span>.<span class="hljs-number">625251</span>:   Chrome_ChildIOT:<span class="hljs-number">24817</span> <span class="hljs-string">[112]</span> R ==&gt; chrome:<span class="hljs-number">1561</span> <span class="hljs-string">[112]</span>
 <span class="hljs-number">16169</span>.<span class="hljs-number">625437</span>:   chrome:<span class="hljs-number">1561</span> <span class="hljs-string">[112]</span> S ==&gt; chrome:<span class="hljs-number">15144</span> <span class="hljs-string">[120]</span>


</code></pre><p>现在，可以很清楚地看到这些切换，从 PID 24817 -&gt; 15144 -&gt; kernel -&gt; 24817 -&gt; 1561 -&gt; 15114。(所有的这些事件都发生在同一个 CPU 上）。</p>
<h3><a href="#ftrace-是如何工作的"></a>ftrace 是如何工作的？</h3>
<p>ftrace 是一个动态跟踪系统。当我们开始 ftrace 内核函数时，<strong>函数的代码会被改变</strong>。让我们假设去跟踪 <code>do_page_fault</code> 函数。内核将在那个函数的汇编代码中插入一些额外的指令，以便每次该函数被调用时去提示跟踪系统。内核之所以能够添加额外的指令的原因是，Linux 将额外的几个 NOP 指令编译进每个函数中，因此，当需要的时候，这里有添加跟踪代码的地方。</p>
<p>这是一个十分复杂的问题，因为，当不需要使用 ftrace 去跟踪我的内核时，它根本就不影响性能。而当我需要跟踪时，跟踪的函数越多，产生的开销就越大。</p>
<p>（或许有些是不对的，但是，我认为的 ftrace 就是这样工作的）</p>
<h3><a href="#更容易地使用-ftracebrendan-gregg-的工具及-kernelshark"></a>更容易地使用 ftrace：brendan gregg 的工具及 kernelshark</h3>
<p>正如我们在文件中所讨论的，你需要去考虑很多的关于单个的内核函数/事件直接使用 ftrace 都做了些什么。能够做到这一点很酷！但是也需要做大量的工作！</p>
<p>Brendan Gregg （我们的 Linux 调试工具“大神”）有个工具仓库，它使用 ftrace 去提供关于像 I/O 延迟这样的各种事情的信息。这是它在 GitHub 上全部的 <a href="https://github.com/brendangregg/perf-tools">perf-tools</a> 仓库。</p>
<p>这里有一个权衡，那就是这些工具易于使用，但是你被限制仅能用于 Brendan Gregg 认可并做到工具里面的方面。它包括了很多方面！:)</p>
<p>另一个工具是将 ftrace 的输出可视化，做的比较好的是 <a href="https://lwn.net/Articles/425583/">kernelshark</a>。我还没有用过它，但是看起来似乎很有用。你可以使用 <code>sudo apt-get install kernelshark</code> 来安装它。</p>
<h3><a href="#一个新的超能力"></a>一个新的超能力</h3>
<p>我很高兴能够花一些时间去学习 ftrace！对于任何内核工具，不同的内核版本有不同的功效，我希望有一天你能发现它很有用！</p>
<h3><a href="#ftrace-系列文章的一个索引"></a>ftrace 系列文章的一个索引</h3>
<p>最后，这里是我找到的一些 ftrace 方面的文章。它们大部分在 LWN （Linux 新闻周刊）上，它是 Linux 的一个极好的资源（你可以购买一个 <a href="https://lwn.net/subscribe/Info">订阅</a>！）</p>
<ul>
<li><a href="https://lwn.net/Articles/365835/">使用 Ftrace 调试内核 - part 1</a> (Dec 2009, Steven Rostedt)</li>
<li><a href="https://lwn.net/Articles/366796/">使用 Ftrace 调试内核 - part 2</a> (Dec 2009, Steven Rostedt)</li>
<li><a href="https://lwn.net/Articles/370423/">Linux 函数跟踪器的秘密</a> (Jan 2010, Steven Rostedt)</li>
<li><a href="https://lwn.net/Articles/410200/">trace-cmd：Ftrace 的一个前端</a> (Oct 2010, Steven Rostedt)</li>
<li><a href="https://lwn.net/Articles/425583/">使用 KernelShark 去分析实时调试器</a> (2011, Steven Rostedt)</li>
<li><a href="https://lwn.net/Articles/608497/">Ftrace: 神秘的开关</a> (2014, Brendan Gregg)</li>
<li>内核文档：（它十分有用） <a href="https://raw.githubusercontent.com/torvalds/linux/v4.4/Documentation/trace/ftrace.txt">Documentation/ftrace.txt</a></li>
<li>你能跟踪的事件的文档 <a href="https://raw.githubusercontent.com/torvalds/linux/v4.4/Documentation/trace/events.txt">Documentation/events.txt</a></li>
<li>linux 内核开发上的一些 ftrace 设计文档 （不是有用，而是有趣！) <a href="https://raw.githubusercontent.com/torvalds/linux/v4.4/Documentation/trace/ftrace-design.txt">Documentation/ftrace-design.txt</a></li>
</ul>
<hr>
<p>via: <a href="https://jvns.ca/blog/2017/03/19/getting-started-with-ftrace/">https://jvns.ca/blog/2017/03/19/getting-started-with-ftrace/</a></p>
<p>作者：<a href="https://jvns.ca">Julia Evans</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ftrace：跟踪你的内核函数！

## 原文链接
[https://www.zcfy.cc/article/ftrace-trace-your-kernel-functions](https://www.zcfy.cc/article/ftrace-trace-your-kernel-functions)


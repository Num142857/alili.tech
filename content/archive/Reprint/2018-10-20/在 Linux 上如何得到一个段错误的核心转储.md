---
title: 在 Linux 上如何得到一个段错误的核心转储
hidden: true
categories: reprint
slug: 18b31796
date: 2018-10-20 00:00:00
---

{{< raw >}}

            <h1><a href="#在-linux-上如何得到一个段错误的核心转储"></a>在 Linux 上如何得到一个段错误的核心转储</h1>
<p>本周工作中，我花了整整一周的时间来尝试调试一个段错误。我以前从来没有这样做过，我花了很长时间才弄清楚其中涉及的一些基本事情（获得核心转储、找到导致段错误的行号）。于是便有了这篇博客来解释如何做那些事情！</p>
<p>在看完这篇博客后，你应该知道如何从“哦，我的程序出现段错误，但我不知道正在发生什么”到“我知道它出现段错误时的堆栈、行号了！ “。</p>
<h3><a href="#什么是段错误"></a>什么是段错误？</h3>
<p>“段错误segmentation fault”是指你的程序尝试访问不允许访问的内存地址的情况。这可能是由于：</p>
<ul>
<li>试图解引用空指针（你不被允许访问内存地址 <code>0</code>）；</li>
<li>试图解引用其他一些不在你内存（LCTT 译注：指不在合法的内存地址区间内）中的指针；</li>
<li>一个已被破坏并且指向错误的地方的 C++ 虚表指针C++ vtable pointer，这导致程序尝试执行没有执行权限的内存中的指令；</li>
<li>其他一些我不明白的事情，比如我认为访问未对齐的内存地址也可能会导致段错误（LCTT 译注：在要求自然边界对齐的体系结构，如 MIPS、ARM 中更容易因非对齐访问产生段错误）。</li>
</ul>
<p>这个“C++ 虚表指针”是我的程序发生段错误的情况。我可能会在未来的博客中解释这个，因为我最初并不知道任何关于 C++ 的知识，并且这种虚表查找导致程序段错误的情况也是我所不了解的。</p>
<p>但是！这篇博客后不是关于 C++ 问题的。让我们谈论的基本的东西，比如，我们如何得到一个核心转储？</p>
<h3><a href="#步骤1运行-valgrind"></a>步骤1：运行 valgrind</h3>
<p>我发现找出为什么我的程序出现段错误的最简单的方式是使用 <code>valgrind</code>：我运行</p>
<pre><code class="hljs fortran">valgrind -v your-<span class="hljs-function"><span class="hljs-keyword">program</span></span>

</code></pre><p>这给了我一个故障时的堆栈调用序列。 简洁！</p>
<p>但我想也希望做一个更深入调查，并找出些 <code>valgrind</code> 没告诉我的信息！ 所以我想获得一个核心转储并探索它。</p>
<h3><a href="#如何获得一个核心转储"></a>如何获得一个核心转储</h3>
<p>核心转储core dump是您的程序内存的一个副本，并且当您试图调试您的有问题的程序哪里出错的时候它非常有用。</p>
<p>当您的程序出现段错误，Linux 的内核有时会把一个核心转储写到磁盘。 当我最初试图获得一个核心转储时，我很长一段时间非常沮丧，因为 - Linux 没有生成核心转储！我的核心转储在哪里？</p>
<p>这就是我最终做的事情：</p>
<ol>
<li>在启动我的程序之前运行 <code>ulimit -c unlimited</code></li>
<li>运行 <code>sudo sysctl -w kernel.core_pattern=/tmp/core-%e.%p.%h.%t</code></li>
</ol>
<h3><a href="#ulimit设置核心转储的最大尺寸"></a>ulimit：设置核心转储的最大尺寸</h3>
<p><code>ulimit -c</code> 设置核心转储的最大尺寸。 它往往设置为 0，这意味着内核根本不会写核心转储。 它以千字节为单位。 <code>ulimit</code> 是按每个进程分别设置的 —— 你可以通过运行 <code>cat /proc/PID/limit</code> 看到一个进程的各种资源限制。</p>
<p>例如这些是我的系统上一个随便一个 Firefox 进程的资源限制：</p>
<pre><code class="hljs tcl">$ cat /<span class="hljs-keyword">proc</span>/6309/limits<span class="hljs-title"> 
Limit</span> <span class="hljs-title">                    Soft</span> Limit<span class="hljs-title">           Hard</span> Limit<span class="hljs-title">           Units</span> <span class="hljs-title">    
Max</span> cpu<span class="hljs-title"> time</span> <span class="hljs-title">             unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           seconds</span> <span class="hljs-title">  
Max</span> file<span class="hljs-title"> size</span> <span class="hljs-title">            unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           bytes</span> <span class="hljs-title">    
Max</span> data<span class="hljs-title"> size</span> <span class="hljs-title">            unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           bytes</span> <span class="hljs-title">    
Max</span> stack<span class="hljs-title"> size</span>            8388608<span class="hljs-title">              unlimited</span> <span class="hljs-title">           bytes</span> <span class="hljs-title">    
Max</span> core<span class="hljs-title"> file</span> size        0<span class="hljs-title">                    unlimited</span> <span class="hljs-title">           bytes</span> <span class="hljs-title">    
Max</span> resident<span class="hljs-title"> set</span> <span class="hljs-title">         unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           bytes</span> <span class="hljs-title">    
Max</span> processes             30571                30571<span class="hljs-title">                processes</span> <span class="hljs-title">
Max</span> open<span class="hljs-title"> files</span>            1024                 1048576<span class="hljs-title">              files</span> <span class="hljs-title">    
Max</span> locked<span class="hljs-title"> memory</span>         65536                65536<span class="hljs-title">                bytes</span> <span class="hljs-title">    
Max</span> address<span class="hljs-title"> space</span> <span class="hljs-title">        unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           bytes</span> <span class="hljs-title">    
Max</span> file<span class="hljs-title"> locks</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           locks</span> <span class="hljs-title">    
Max</span> pending<span class="hljs-title"> signals</span>       30571                30571<span class="hljs-title">                signals</span> <span class="hljs-title">  
Max</span> msgqueue<span class="hljs-title"> size</span>         819200               819200<span class="hljs-title">               bytes</span> <span class="hljs-title">    
Max</span> nice<span class="hljs-title"> priority</span>         0                    0<span class="hljs-title">                    
Max</span> realtime<span class="hljs-title"> priority</span>     0                    0<span class="hljs-title">                    
Max</span> realtime<span class="hljs-title"> timeout</span> <span class="hljs-title">     unlimited</span> <span class="hljs-title">           unlimited</span> <span class="hljs-title">           us</span>   

</code></pre><p>内核在决定写入多大的核心转储文件时使用软限制soft limit（在这种情况下，<code>max core file size = 0</code>）。 您可以使用 shell 内置命令 <code>ulimit</code>（<code>ulimit -c unlimited</code>） 将软限制增加到硬限制hard limit。</p>
<h3><a href="#kernelcore_pattern核心转储保存在哪里"></a>kernel.core_pattern：核心转储保存在哪里</h3>
<p><code>kernel.core_pattern</code> 是一个内核参数，或者叫 “sysctl 设置”，它控制 Linux 内核将核心转储文件写到磁盘的哪里。</p>
<p>内核参数是一种设定您的系统全局设置的方法。您可以通过运行 <code>sysctl -a</code> 得到一个包含每个内核参数的列表，或使用 <code>sysctl kernel.core_pattern</code> 来专门查看 <code>kernel.core_pattern</code> 设置。</p>
<p>所以 <code>sysctl -w kernel.core_pattern=/tmp/core-%e.%p.%h.%t</code> 将核心转储保存到目录 <code>/tmp</code> 下，并以 <code>core</code> 加上一系列能够标识（出故障的）进程的参数构成的后缀为文件名。</p>
<p>如果你想知道这些形如 <code>%e</code>、<code>%p</code> 的参数都表示什么，请参考 <a href="http://man7.org/linux/man-pages/man5/core.5.html">man core</a>。</p>
<p>有一点很重要，<code>kernel.core_pattern</code> 是一个全局设置 —— 修改它的时候最好小心一点，因为有可能其它系统功能依赖于把它被设置为一个特定的方式（才能正常工作）。</p>
<h3><a href="#kernelcore_pattern-和-ubuntu"></a>kernel.core_pattern 和 Ubuntu</h3>
<p>默认情况下在 ubuntu 系统中，<code>kernel.core_pattern</code> 被设置为下面的值：</p>
<pre><code class="hljs cos">$ sysctl kernel.core_pattern
kernel.core_pattern = |/usr/share/apport/apport <span class="hljs-built_in">%p</span> <span class="hljs-built_in">%s</span> <span class="hljs-built_in">%c</span> <span class="hljs-built_in">%d</span> <span class="hljs-built_in">%P</span>

</code></pre><p>这引起了我的迷惑（这 apport 是干什么的，它对我的核心转储做了什么？）。以下关于这个我了解到的：</p>
<ul>
<li>Ubuntu 使用一种叫做 apport 的系统来报告 apt 包有关的崩溃信息。</li>
<li>设定 <code>kernel.core_pattern=|/usr/share/apport/apport %p %s %c %d %P</code> 意味着核心转储将被通过管道送给 <code>apport</code> 程序。</li>
<li>apport 的日志保存在文件 <code>/var/log/apport.log</code> 中。</li>
<li>apport 默认会忽略来自不属于 Ubuntu 软件包一部分的二进制文件的崩溃信息</li>
</ul>
<p>我最终只是跳过了 apport，并把 <code>kernel.core_pattern</code> 重新设置为 <code>sysctl -w kernel.core_pattern=/tmp/core-%e.%p.%h.%t</code>，因为我在一台开发机上，我不在乎 apport 是否工作，我也不想尝试让 apport 把我的核心转储留在磁盘上。</p>
<h3><a href="#现在你有了核心转储接下来干什么"></a>现在你有了核心转储，接下来干什么？</h3>
<p>好的，现在我们了解了 <code>ulimit</code> 和 <code>kernel.core_pattern</code> ，并且实际上在磁盘的 <code>/tmp</code> 目录中有了一个核心转储文件。太好了！接下来干什么？我们仍然不知道该程序为什么会出现段错误！</p>
<p>下一步将使用 <code>gdb</code> 打开核心转储文件并获取堆栈调用序列。</p>
<h3><a href="#从-gdb-中得到堆栈调用序列"></a>从 gdb 中得到堆栈调用序列</h3>
<p>你可以像这样用 <code>gdb</code> 打开一个核心转储文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> gdb -c my_core_file</span>

</code></pre><p>接下来，我们想知道程序崩溃时的堆栈是什么样的。在 <code>gdb</code> 提示符下运行 <code>bt</code> 会给你一个调用序列backtrace。在我的例子里，<code>gdb</code> 没有为二进制文件加载符号信息，所以这些函数名就像 “??????”。幸运的是，（我们通过）加载符号修复了它。</p>
<p>下面是如何加载调试符号。</p>
<pre><code class="hljs applescript">symbol-<span class="hljs-built_in">file</span> /path/<span class="hljs-keyword">to</span>/<span class="hljs-keyword">my</span>/binary
sharedlibrary

</code></pre><p>这从二进制文件及其引用的任何共享库中加载符号。一旦我这样做了，当我执行 <code>bt</code> 时，gdb 给了我一个带有行号的漂亮的堆栈跟踪！</p>
<p>如果你想它能工作，二进制文件应该以带有调试符号信息的方式被编译。在试图找出程序崩溃的原因时，堆栈跟踪中的行号非常有帮助。:)</p>
<h3><a href="#查看每个线程的堆栈"></a>查看每个线程的堆栈</h3>
<p>通过以下方式在 <code>gdb</code> 中获取每个线程的调用栈！</p>
<pre><code class="hljs lasso"><span class="hljs-keyword">thread</span> apply <span class="hljs-literal">all</span> bt <span class="hljs-literal">full</span>

</code></pre><h3><a href="#gdb--核心转储--惊喜"></a>gdb + 核心转储 = 惊喜</h3>
<p>如果你有一个带调试符号的核心转储以及 <code>gdb</code>，那太棒了！您可以上下查看调用堆栈（LCTT 译注：指跳进调用序列不同的函数中以便于查看局部变量），打印变量，并查看内存来得知发生了什么。这是最好的。</p>
<p>如果您仍然正在基于 gdb 向导来工作上，只打印出栈跟踪与bt也可以。 :)</p>
<h3><a href="#asan"></a>ASAN</h3>
<p>另一种搞清楚您的段错误的方法是使用 AddressSanitizer 选项编译程序（“ASAN”，即 <code>$CC -fsanitize=address</code>）然后运行它。 本文中我不准备讨论那个，因为本文已经相当长了，并且在我的例子中打开 ASAN 后段错误消失了，可能是因为 ASAN 使用了一个不同的内存分配器（系统内存分配器，而不是 tcmalloc）。</p>
<p>在未来如果我能让 ASAN 工作，我可能会多写点有关它的东西。（LCTT 译注：这里指使用 ASAN 也能复现段错误）</p>
<h3><a href="#从一个核心转储得到一个堆栈跟踪真的很亲切"></a>从一个核心转储得到一个堆栈跟踪真的很亲切！</h3>
<p>这个博客听起来很多，当我做这些的时候很困惑，但说真的，从一个段错误的程序中获得一个堆栈调用序列不需要那么多步骤：</p>
<ol>
<li>试试用 <code>valgrind</code></li>
</ol>
<p>如果那没用，或者你想要拿到一个核心转储来调查：</p>
<ol>
<li>确保二进制文件编译时带有调试符号信息；</li>
<li>正确的设置 <code>ulimit</code> 和 <code>kernel.core_pattern</code>；</li>
<li>运行程序；</li>
<li>一旦你用 <code>gdb</code> 调试核心转储了，加载符号并运行 <code>bt</code>；</li>
<li>尝试找出发生了什么！</li>
</ol>
<p>我可以使用 <code>gdb</code> 弄清楚有个 C++ 的虚表条目指向一些被破坏的内存，这有点帮助，并且使我感觉好像更懂了 C++ 一点。也许有一天我们会更多地讨论如何使用 <code>gdb</code> 来查找问题！</p>
<hr>
<p>via: <a href="https://jvns.ca/blog/2018/04/28/debugging-a-segfault-on-linux/">https://jvns.ca/blog/2018/04/28/debugging-a-segfault-on-linux/</a></p>
<p>作者：<a href="https://jvns.ca/about/">Julia Evans</a> 译者：<a href="https://github.com/stephenxs">stephenxs</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-to-get-a-core-dump-for-a-segfault-on-linux](https://www.zcfy.cc/article/how-to-get-a-core-dump-for-a-segfault-on-linux)
原文标题: 在 Linux 上如何得到一个段错误的核心转储
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

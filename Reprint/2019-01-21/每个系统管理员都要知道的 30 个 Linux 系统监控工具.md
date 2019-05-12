---
title: '每个系统管理员都要知道的 30 个 Linux 系统监控工具' 
date: 2019-01-21 2:30:06
hidden: true
slug: dagwxuophhg
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#每个系统管理员都要知道的-30-个-linux-系统监控工具"></a>每个系统管理员都要知道的 30 个 Linux 系统监控工具</h1>
<p>您需要监控 Linux 服务器的性能吗？试试用这些内置命令和附加工具吧！大多数 Linux 发行版都附带了大量的监控工具。这些工具提供了获取系统活动的相关指标。您可以使用这些工具来查找性能问题的可能原因。本文提到的是一些基本的命令，用于系统分析和服务器调试等，例如：</p>
<ol>
<li>找出系统瓶颈</li>
<li>磁盘（存储）瓶颈</li>
<li>CPU 和内存瓶颈</li>
<li>网络瓶颈</li>
</ol>
<h3><a href="#1-top---进程活动监控命令"></a>1. top - 进程活动监控命令</h3>
<p><code>top</code> 命令会显示 Linux 的进程。它提供了一个运行中系统的实时动态视图，即实际的进程活动。默认情况下，它显示在服务器上运行的 CPU 占用率最高的任务，并且每五秒更新一次。</p>
<p><a href="https://camo.githubusercontent.com/4784caa312fac86829f6bcececb8e084c932923c/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f746f702d4c696e75782d6d6f6e69746f72696e672d636f6d6d616e642e6a7067"><img src="https://p0.ssl.qhimg.com/t017cb5e03bd14d4737.jpg" alt=""></a></p>
<p><em>图 01：Linux top 命令</em></p>
<h4><a href="#top-的常用快捷键"></a>top 的常用快捷键</h4>
<p>常用快捷键列表：</p>
<p>快捷键</p>
<p>用法</p>
<p><code>t</code></p>
<p>是否显示汇总信息</p>
<p><code>m</code></p>
<p>是否显示内存信息</p>
<p><code>A</code></p>
<p>根据各种系统资源的利用率对进程进行排序，有助于快速识别系统中性能不佳的任务。</p>
<p><code>f</code></p>
<p>进入 <code>top</code> 的交互式配置屏幕，用于根据特定的需求而设置 <code>top</code> 的显示。</p>
<p><code>o</code></p>
<p>交互式地调整 <code>top</code> 每一列的顺序。</p>
<p><code>r</code></p>
<p>调整优先级（<code>renice</code>）</p>
<p><code>k</code></p>
<p>杀掉进程（<code>kill</code>）</p>
<p><code>z</code></p>
<p>切换彩色或黑白模式</p>
<p>相关链接：<a href="https://www.cyberciti.biz/tips/how-do-i-find-out-linux-cpu-utilization.html">Linux 如何查看 CPU 利用率？</a></p>
<h3><a href="#2-vmstat---虚拟内存统计"></a>2. vmstat - 虚拟内存统计</h3>
<p><code>vmstat</code> 命令报告有关进程、内存、分页、块 IO、中断和 CPU 活动等信息。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vmstat 3</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs lsl">procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu------
 r b swpd free buff cache si so bi bo in cs us sy id wa st
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2540988</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130400</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2</span> <span class="hljs-number">32</span> <span class="hljs-number">4</span> <span class="hljs-number">2</span> <span class="hljs-number">4</span> <span class="hljs-number">1</span> <span class="hljs-number">96</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
 <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2540988</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130400</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">720</span> <span class="hljs-number">1199</span> <span class="hljs-number">665</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">99</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2540956</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130400</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1151</span> <span class="hljs-number">1569</span> <span class="hljs-number">4</span> <span class="hljs-number">1</span> <span class="hljs-number">95</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2540956</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130500</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6</span> <span class="hljs-number">1117</span> <span class="hljs-number">439</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">99</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2540940</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130512</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">536</span> <span class="hljs-number">1189</span> <span class="hljs-number">932</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">98</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2538444</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130588</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1187</span> <span class="hljs-number">1417</span> <span class="hljs-number">4</span> <span class="hljs-number">1</span> <span class="hljs-number">96</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2490060</span> <span class="hljs-number">522188</span> <span class="hljs-number">5130640</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">18</span> <span class="hljs-number">1253</span> <span class="hljs-number">1123</span> <span class="hljs-number">5</span> <span class="hljs-number">1</span> <span class="hljs-number">94</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>

</code></pre><h4><a href="#显示-slab-缓存的利用率"></a>显示 Slab 缓存的利用率</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vmstat -m</span>

</code></pre><h4><a href="#获取有关活动和非活动内存页面的信息"></a>获取有关活动和非活动内存页面的信息</h4>
<pre><code class="hljs apache"><span class="hljs-comment"># vmstat -a</span>

</code></pre><p>相关链接：<a href="https://www.cyberciti.biz/tips/linux-resource-utilization-to-detect-system-bottlenecks.html">如何查看 Linux 的资源利用率从而找到系统瓶颈？</a></p>
<h3><a href="#3-w---找出登录的用户以及他们在做什么"></a>3. w - 找出登录的用户以及他们在做什么</h3>
<p><a href="https://www.cyberciti.biz/faq/unix-linux-w-command-examples-syntax-usage-2/" title="See Linux/Unix w command examples for more info">w 命令</a> 显示了当前登录在该系统上的用户及其进程。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> w username</span>
<span class="hljs-meta">#</span><span class="bash"> w vivek</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs routeros"> 17:58:47 up 5 days, 20:28, 2 users, load average: 0.36, 0.26, 0.24<span class="hljs-built_in">
USER </span>TTY <span class="hljs-keyword">FROM</span> LOGIN@ IDLE JCPU PCPU WHAT
root pts/0 10.1.3.145 14:55 5.00s 0.04s 0.02s vim /etc/resolv.conf
root pts/1 10.1.3.145 17:43 0.00s 0.03s 0.00s w

</code></pre><h3><a href="#4-uptime---linux-系统运行了多久"></a>4. uptime - Linux 系统运行了多久</h3>
<p><code>uptime</code> 命令可以用来查看服务器运行了多长时间：当前时间、已运行的时间、当前登录的用户连接数，以及过去 1 分钟、5 分钟和 15 分钟的系统负载平均值。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> uptime</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs css"> 18<span class="hljs-selector-pseudo">:02</span><span class="hljs-selector-pseudo">:41</span> <span class="hljs-selector-tag">up</span> 41 <span class="hljs-selector-tag">days</span>, 23<span class="hljs-selector-pseudo">:42</span>, 1 <span class="hljs-selector-tag">user</span>, <span class="hljs-selector-tag">load</span> <span class="hljs-selector-tag">average</span>: 0<span class="hljs-selector-class">.00</span>, 0<span class="hljs-selector-class">.00</span>, 0<span class="hljs-selector-class">.00</span>

</code></pre><p><code>1</code> 可以被认为是最佳负载值。不同的系统会有不同的负载：对于单核 CPU 系统来说，<code>1</code> 到 <code>3</code> 的负载值是可以接受的；而对于 SMP（对称多处理）系统来说，负载可以是 <code>6</code> 到 <code>10</code>。</p>
<h3><a href="#5-ps---显示系统进程"></a>5. ps - 显示系统进程</h3>
<p><code>ps</code> 命令显示当前运行的进程。要显示所有的进程，请使用 <code>-A</code> 或 <code>-e</code> 选项：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># ps -A</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs less"> <span class="hljs-selector-tag">PID</span> <span class="hljs-selector-tag">TTY</span> <span class="hljs-selector-tag">TIME</span> <span class="hljs-selector-tag">CMD</span>
 <span class="hljs-selector-tag">1</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:02</span> <span class="hljs-selector-tag">init</span>
 <span class="hljs-selector-tag">2</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:02</span> <span class="hljs-selector-tag">migration</span>/<span class="hljs-selector-tag">0</span>
 <span class="hljs-selector-tag">3</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:01</span> <span class="hljs-selector-tag">ksoftirqd</span>/<span class="hljs-selector-tag">0</span>
 <span class="hljs-selector-tag">4</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">watchdog</span>/<span class="hljs-selector-tag">0</span>
 <span class="hljs-selector-tag">5</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">migration</span>/<span class="hljs-selector-tag">1</span>
 <span class="hljs-selector-tag">6</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:15</span> <span class="hljs-selector-tag">ksoftirqd</span>/<span class="hljs-selector-tag">1</span>
....
.....
 <span class="hljs-selector-tag">4881</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:53</span><span class="hljs-selector-pseudo">:28</span> <span class="hljs-selector-tag">java</span>
 <span class="hljs-selector-tag">4885</span> <span class="hljs-selector-tag">tty1</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">mingetty</span>
 <span class="hljs-selector-tag">4886</span> <span class="hljs-selector-tag">tty2</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">mingetty</span>
 <span class="hljs-selector-tag">4887</span> <span class="hljs-selector-tag">tty3</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">mingetty</span>
 <span class="hljs-selector-tag">4888</span> <span class="hljs-selector-tag">tty4</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">mingetty</span>
 <span class="hljs-selector-tag">4891</span> <span class="hljs-selector-tag">tty5</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">mingetty</span>
 <span class="hljs-selector-tag">4892</span> <span class="hljs-selector-tag">tty6</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">mingetty</span>
 <span class="hljs-selector-tag">4893</span> <span class="hljs-selector-tag">ttyS1</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">agetty</span>
<span class="hljs-selector-tag">12853</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">cifsoplockd</span>
<span class="hljs-selector-tag">12854</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">cifsdnotifyd</span>
<span class="hljs-selector-tag">14231</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:10</span><span class="hljs-selector-pseudo">:34</span> <span class="hljs-selector-tag">lighttpd</span>
<span class="hljs-selector-tag">14232</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">php-cgi</span>
<span class="hljs-selector-tag">54981</span> <span class="hljs-selector-tag">pts</span>/<span class="hljs-selector-tag">0</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">vim</span>
<span class="hljs-selector-tag">55465</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">php-cgi</span>
<span class="hljs-selector-tag">55546</span> ? <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">bind9-snmp-stat</span>
<span class="hljs-selector-tag">55704</span> <span class="hljs-selector-tag">pts</span>/<span class="hljs-selector-tag">1</span> <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span> <span class="hljs-selector-tag">ps</span>

</code></pre><p><code>ps</code> 与 <code>top</code> 类似，但它提供了更多的信息。</p>
<h4><a href="#显示长输出格式"></a>显示长输出格式</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -Al</span>

</code></pre><p>显示完整输出格式（它将显示传递给进程的命令行参数）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -AlF</span>

</code></pre><h4><a href="#显示线程轻量级进程lwp和线程的数量nlwp"></a>显示线程（轻量级进程（LWP）和线程的数量（NLWP））</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -AlFH</span>

</code></pre><h4><a href="#在进程后显示线程"></a>在进程后显示线程</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -AlLm</span>

</code></pre><h4><a href="#显示系统上所有的进程"></a>显示系统上所有的进程</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps ax</span>
<span class="hljs-meta">#</span><span class="bash"> ps axu</span>

</code></pre><h4><a href="#显示进程树"></a>显示进程树</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -ejH</span>
<span class="hljs-meta">#</span><span class="bash"> ps axjf</span>
<span class="hljs-meta">#</span><span class="bash"> pstree</span>

</code></pre><h4><a href="#显示进程的安全信息"></a>显示进程的安全信息</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -eo euser,ruser,suser,fuser,f,comm,label</span>
<span class="hljs-meta">#</span><span class="bash"> ps axZ</span>
<span class="hljs-meta">#</span><span class="bash"> ps -eM</span>

</code></pre><h4><a href="#显示指定用户如-vivek运行的进程"></a>显示指定用户（如 vivek）运行的进程</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -U vivek -u vivek u</span>

</code></pre><h4><a href="#设置用户自定义的输出格式"></a>设置用户自定义的输出格式</h4>
<pre><code class="hljs kotlin"># ps -eo pid,tid,<span class="hljs-class"><span class="hljs-keyword">class</span>,<span class="hljs-type">rtprio</span>,<span class="hljs-type">ni</span>,<span class="hljs-type">pri</span>,<span class="hljs-type">psr</span>,<span class="hljs-type">pcpu</span>,<span class="hljs-type">stat</span>,<span class="hljs-type">wchan:14</span>,<span class="hljs-type">comm</span></span>
# ps axo stat,euid,ruid,tty,tpgid,sess,pgrp,ppid,pid,pcpu,comm
# ps -eopid,tt,user,fname,tmout,f,wchan

</code></pre><h4><a href="#显示某进程如-lighttpd的-pid"></a>显示某进程（如 lighttpd）的 PID</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -C lighttpd -o pid=</span>

</code></pre><p>或</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pgrep lighttpd</span>

</code></pre><p>或</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pgrep -u vivek php-cgi</span>

</code></pre><h4><a href="#显示指定-pid如-55977的进程名称"></a>显示指定 PID（如 55977）的进程名称</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ps -p 55977 -o comm=</span>

</code></pre><h4><a href="#找出占用内存资源最多的前-10-个进程"></a>找出占用内存资源最多的前 10 个进程</h4>
<pre><code class="hljs coq"># ps -auxf | <span class="hljs-type">sort</span> -nr -k <span class="hljs-number">4</span> | <span class="hljs-type">head</span> <span class="hljs-number">-10</span>

</code></pre><h4><a href="#找出占用-cpu-资源最多的前-10-个进程"></a>找出占用 CPU 资源最多的前 10 个进程</h4>
<pre><code class="hljs coq"># ps -auxf | <span class="hljs-type">sort</span> -nr -k <span class="hljs-number">3</span> | <span class="hljs-type">head</span> <span class="hljs-number">-10</span>

</code></pre><p>相关链接：<a href="https://www.cyberciti.biz/faq/show-all-running-processes-in-linux/">显示 Linux 上所有运行的进程</a></p>
<h3><a href="#6-free---内存使用情况"></a>6. free - 内存使用情况</h3>
<p><code>free</code> 命令显示了系统的可用和已用的物理内存及交换内存的总量，以及内核用到的缓存空间。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> free</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs dns"> total used free shared buffers cached
Mem: <span class="hljs-number">12302896</span> <span class="hljs-number">9739664</span> <span class="hljs-number">2563232 0</span> <span class="hljs-number">523124</span> <span class="hljs-number">5154740</span>
-/+ buffers/cache: <span class="hljs-number">4061800</span> <span class="hljs-number">8241096</span>
Swap: <span class="hljs-number">1052248 0</span> <span class="hljs-number">1052248</span>

</code></pre><p>相关链接：</p>
<ol>
<li><a href="https://www.cyberciti.biz/faq/linux-check-the-size-of-pagesize/">获取 Linux 的虚拟内存的内存页大小（PAGESIZE）</a></li>
<li><a href="https://www.cyberciti.biz/faq/cpu-usage-limiter-for-linux/">限制 Linux 每个进程的 CPU 使用率</a></li>
<li><a href="https://www.cyberciti.biz/tips/how-much-ram-does-my-linux-system.html">我的 Ubuntu 或 Fedora Linux 系统有多少内存？</a></li>
</ol>
<h3><a href="#7-iostat---cpu-平均负载和磁盘活动"></a>7. iostat - CPU 平均负载和磁盘活动</h3>
<p><code>iostat</code> 命令用于汇报 CPU 的使用情况，以及设备、分区和网络文件系统（NFS）的 IO 统计信息。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> iostat</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs dns">Linux <span class="hljs-number">2.6.18-128</span>.<span class="hljs-number">1</span>.<span class="hljs-number">14</span>.el5 (www03.nixcraft.in)     <span class="hljs-number">06/26/2009</span>

avg-cpu: %user %nice %system %iowait %steal %idle
 <span class="hljs-number">3.50 0.09</span> <span class="hljs-number">0.51 0.03</span> <span class="hljs-number">0.00 95.86</span>

Device: tps Blk_read/s Blk_wrtn/s Blk_read Blk_wrtn
sda <span class="hljs-number">22.04 31.88</span> <span class="hljs-number">512</span>.<span class="hljs-number">03 16193351</span> <span class="hljs-number">260102868</span>
sda<span class="hljs-number">1 0.00 0</span>.<span class="hljs-number">00</span> <span class="hljs-number">0.00 2166</span> <span class="hljs-number">180</span>
sda<span class="hljs-number">2 22.04 31</span>.<span class="hljs-number">87 512.03</span> <span class="hljs-number">16189010</span> <span class="hljs-number">260102688</span>
sda<span class="hljs-number">3 0.00 0</span>.<span class="hljs-number">00</span> <span class="hljs-number">0.00 1615</span> <span class="hljs-number">0</span>

</code></pre><p>相关链接：<a href="https://www.cyberciti.biz/faq/howto-linux-track-nfs-client-disk-metrics/">如何跟踪 Linux 系统的 NFS 目录或磁盘的 IO 负载情况</a></p>
<h3><a href="#8-sar---监控收集和汇报系统活动"></a>8. sar - 监控、收集和汇报系统活动</h3>
<p><code>sar</code> 命令用于收集、汇报和保存系统活动信息。要查看网络统计，请输入：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># sar -n DEV | more</span>

</code></pre><p>显示 24 日的网络统计：</p>
<p><code># sar -n DEV -f /var/log/sa/sa24 | more</code></p>
<p>您还可以使用 <code>sar</code> 显示实时使用情况：</p>
<pre><code class="hljs lsl"># sar <span class="hljs-number">4</span> <span class="hljs-number">5</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs dns">Linux <span class="hljs-number">2.6.18-128</span>.<span class="hljs-number">1</span>.<span class="hljs-number">14</span>.el5 (www03.nixcraft.in)         <span class="hljs-number">06/26/2009</span>

<span class="hljs-number">06</span>:<span class="hljs-number">45</span>:<span class="hljs-number">12</span> PM CPU %user %nice %system %iowait %steal %idle
<span class="hljs-number">06</span>:<span class="hljs-number">45</span>:<span class="hljs-number">16</span> PM all <span class="hljs-number">2.00 0.00</span> <span class="hljs-number">0.22 0.00</span> <span class="hljs-number">0.00 97.78</span>
<span class="hljs-number">06</span>:<span class="hljs-number">45</span>:<span class="hljs-number">20</span> PM all <span class="hljs-number">2.07 0.00</span> <span class="hljs-number">0.38 0.03</span> <span class="hljs-number">0.00 97.52</span>
<span class="hljs-number">06</span>:<span class="hljs-number">45</span>:<span class="hljs-number">24</span> PM all <span class="hljs-number">0.94 0.00</span> <span class="hljs-number">0.28 0.00</span> <span class="hljs-number">0.00 98.78</span>
<span class="hljs-number">06</span>:<span class="hljs-number">45</span>:<span class="hljs-number">28</span> PM all <span class="hljs-number">1.56 0.00</span> <span class="hljs-number">0.22 0.00</span> <span class="hljs-number">0.00 98.22</span>
<span class="hljs-number">06</span>:<span class="hljs-number">45</span>:<span class="hljs-number">32</span> PM all <span class="hljs-number">3.53 0.00</span> <span class="hljs-number">0.25 0.03</span> <span class="hljs-number">0.00 96.19</span>
Average: all <span class="hljs-number">2.02 0.00</span> <span class="hljs-number">0.27 0.01</span> <span class="hljs-number">0.00 97.70</span>

</code></pre><p>相关链接：</p>
<ul>
<li><a href="https://www.cyberciti.biz/tips/howto-write-system-utilization-data-to-file.html">如何将 Linux 系统资源利用率的数据写入文件中</a></li>
<li><a href="https://www.cyberciti.biz/tips/identifying-linux-bottlenecks-sar-graphs-with-ksar.html">如何使用 kSar 创建 sar 性能图以找出系统瓶颈</a></li>
</ul>
<h3><a href="#9-mpstat---监控多处理器的使用情况"></a>9. mpstat - 监控多处理器的使用情况</h3>
<p><code>mpstat</code> 命令显示每个可用处理器的使用情况，编号从 0 开始。命令 <code>mpstat -P ALL</code> 显示了每个处理器的平均使用率：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mpstat -P ALL</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs dns">Linux <span class="hljs-number">2.6.18-128</span>.<span class="hljs-number">1</span>.<span class="hljs-number">14</span>.el5 (www03.nixcraft.in)         <span class="hljs-number">06/26/2009</span>

<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM CPU %user %nice %sys %iowait %irq %soft %steal %idle intr/s
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM all <span class="hljs-number">3.50 0.09</span> <span class="hljs-number">0.34 0.03</span> <span class="hljs-number">0.01 0.17</span> <span class="hljs-number">0.00 95.86</span> <span class="hljs-number">1218</span>.<span class="hljs-number">04</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">0 3.44 0</span>.<span class="hljs-number">08 0.31 0</span>.<span class="hljs-number">02 0.00 0</span>.<span class="hljs-number">12 0.00 96</span>.<span class="hljs-number">04 1000.31</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">1 3.10 0</span>.<span class="hljs-number">08 0.32 0</span>.<span class="hljs-number">09 0.02 0</span>.<span class="hljs-number">11 0.00 96</span>.<span class="hljs-number">28</span> <span class="hljs-number">34</span>.<span class="hljs-number">93</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">2 4.16 0</span>.<span class="hljs-number">11 0.36 0</span>.<span class="hljs-number">02 0.00 0</span>.<span class="hljs-number">11 0.00 95</span>.<span class="hljs-number">25</span> <span class="hljs-number">0</span>.<span class="hljs-number">00</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">3 3.77 0</span>.<span class="hljs-number">11 0.38 0</span>.<span class="hljs-number">03 0.01 0</span>.<span class="hljs-number">24 0.00 95</span>.<span class="hljs-number">46</span> <span class="hljs-number">44</span>.<span class="hljs-number">80</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">4 2.96 0</span>.<span class="hljs-number">07 0.29 0</span>.<span class="hljs-number">04 0.02 0</span>.<span class="hljs-number">10 0.00 96</span>.<span class="hljs-number">52</span> <span class="hljs-number">25</span>.<span class="hljs-number">91</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">5 3.26 0</span>.<span class="hljs-number">08 0.28 0</span>.<span class="hljs-number">03 0.01 0</span>.<span class="hljs-number">10 0.00 96</span>.<span class="hljs-number">23</span> <span class="hljs-number">14</span>.<span class="hljs-number">98</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">6 4.00 0</span>.<span class="hljs-number">10 0.34 0</span>.<span class="hljs-number">01 0.00 0</span>.<span class="hljs-number">13 0.00 95</span>.<span class="hljs-number">42</span> <span class="hljs-number">3</span>.<span class="hljs-number">75</span>
<span class="hljs-number">06</span>:<span class="hljs-number">48</span>:<span class="hljs-number">11</span> PM <span class="hljs-number">7 3.30 0</span>.<span class="hljs-number">11 0.39 0</span>.<span class="hljs-number">03 0.01 0</span>.<span class="hljs-number">46 0.00 95</span>.<span class="hljs-number">69</span> <span class="hljs-number">76</span>.<span class="hljs-number">89</span>

</code></pre><p>相关链接：<a href="https://www.cyberciti.biz/faq/linux-mpstat-command-report-processors-related-statistics/">多处理器的 Linux 上单独显示每个 CPU 的使用率</a>.</p>
<h3><a href="#10-pmap---监控进程的内存使用情况"></a>10. pmap - 监控进程的内存使用情况</h3>
<p><code>pmap</code> 命令用以显示进程的内存映射，使用此命令可以查找内存瓶颈。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pmap -d PID</span>

</code></pre><p>显示 PID 为 47394 的进程的内存信息，请输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pmap -d 47394</span>

</code></pre><p>输出示例：</p>
<pre><code class="hljs dns"><span class="hljs-number">47394</span>: /usr/bin/php-cgi
Address Kbytes Mode Offset Device Mapping
<span class="hljs-number">0000000000400000</span> <span class="hljs-number">2584</span> r-x-- <span class="hljs-number">0000000000000000</span> <span class="hljs-number">008:00002</span> php-cgi
<span class="hljs-number">0000000000886000</span> <span class="hljs-number">140</span> rw--- <span class="hljs-number">0000000000286000</span> <span class="hljs-number">008:00002</span> php-cgi
<span class="hljs-number">00000000008</span>a9000 <span class="hljs-number">52</span> rw--- <span class="hljs-number">00000000008</span>a<span class="hljs-number">9000 000</span>:<span class="hljs-number">00000</span> [ anon ]
<span class="hljs-number">0000000000</span>aa8000 <span class="hljs-number">76</span> rw--- <span class="hljs-number">00000000002</span>a<span class="hljs-number">8000 008</span>:<span class="hljs-number">00002</span> php-cgi
<span class="hljs-number">000000000</span>f6<span class="hljs-number">78000 1980</span> rw--- <span class="hljs-number">000000000</span>f6<span class="hljs-number">78000 000</span>:<span class="hljs-number">00000</span> [ anon ]
<span class="hljs-number">000000314</span>a<span class="hljs-number">600000 112</span> r-x-- <span class="hljs-number">0000000000000000</span> <span class="hljs-number">008:00002</span> ld-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">000000314</span>a<span class="hljs-number">81b000 4</span> r---- <span class="hljs-number">000000000001</span>b<span class="hljs-number">000 008</span>:<span class="hljs-number">00002</span> ld-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">000000314</span>a<span class="hljs-number">81c000 4</span> rw--- <span class="hljs-number">000000000001</span>c<span class="hljs-number">000 008</span>:<span class="hljs-number">00002</span> ld-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">000000314</span>aa<span class="hljs-number">00000 1328</span> r-x-- <span class="hljs-number">0000000000000000</span> <span class="hljs-number">008:00002</span> libc-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">000000314</span>ab4c<span class="hljs-number">000 2048</span> ----- <span class="hljs-number">000000000014</span>c<span class="hljs-number">000 008</span>:<span class="hljs-number">00002</span> libc-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
.....
......
..
<span class="hljs-number">00002</span>af8d48fd000 <span class="hljs-number">4</span> rw--- <span class="hljs-number">0000000000006000</span> <span class="hljs-number">008:00002</span> xsl.so
<span class="hljs-number">00002</span>af8d<span class="hljs-number">490c000</span> <span class="hljs-number">40</span> r-x-- <span class="hljs-number">0000000000000000</span> <span class="hljs-number">008:00002</span> libnss_files-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">00002</span>af<span class="hljs-number">8d4916000</span> <span class="hljs-number">2044</span> ----- <span class="hljs-number">000000000000</span>a<span class="hljs-number">000 008</span>:<span class="hljs-number">00002</span> libnss_files-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">00002</span>af<span class="hljs-number">8d4b15000</span> <span class="hljs-number">4</span> r---- <span class="hljs-number">0000000000009000</span> <span class="hljs-number">008:00002</span> libnss_files-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">00002</span>af<span class="hljs-number">8d4b16000</span> <span class="hljs-number">4</span> rw--- <span class="hljs-number">000000000000</span>a<span class="hljs-number">000 008</span>:<span class="hljs-number">00002</span> libnss_files-<span class="hljs-number">2</span>.<span class="hljs-number">5</span>.so
<span class="hljs-number">00002</span>af<span class="hljs-number">8d4b17000</span> <span class="hljs-number">768000</span> rw-s- <span class="hljs-number">0000000000000000</span> <span class="hljs-number">000:00009</span> zero (deleted)
<span class="hljs-number">00007</span>fffc95fe000 <span class="hljs-number">84</span> rw--- <span class="hljs-number">00007</span>ffffffea<span class="hljs-number">000 000</span>:<span class="hljs-number">00000</span> [ stack ]
ffffffffff6<span class="hljs-number">00000 8192</span> ----- <span class="hljs-number">0000000000000000</span> <span class="hljs-number">000:00000</span> [ anon ]
mapped: <span class="hljs-number">933712</span>K writeable/private: <span class="hljs-number">4304</span>K shared: <span class="hljs-number">768000</span>K

</code></pre><p>最后一行非常重要：</p>
<ul>
<li><code>mapped: 933712K</code> 映射到文件的内存量</li>
<li><code>writeable/private: 4304K</code> 私有地址空间</li>
<li><code>shared: 768000K</code> 此进程与其他进程共享的地址空间</li>
</ul>
<p>相关链接：<a href="https://www.cyberciti.biz/tips/howto-find-memory-used-by-program.html">使用 pmap 命令查看 Linux 上单个程序或进程使用的内存</a></p>
<h3><a href="#11-netstat---linux-网络统计监控工具"></a>11. netstat - Linux 网络统计监控工具</h3>
<p><code>netstat</code> 命令显示网络连接、路由表、接口统计、伪装连接和多播连接等信息。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> netstat -tulpn</span>
<span class="hljs-meta">#</span><span class="bash"> netstat -nat</span>

</code></pre><h3><a href="#12-ss---网络统计"></a>12. ss - 网络统计</h3>
<p><code>ss</code> 命令用于获取套接字统计信息。它可以显示类似于 <code>netstat</code> 的信息。不过 <code>netstat</code> 几乎要过时了，<code>ss</code> 命令更具优势。要显示所有 TCP 或 UDP 套接字：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># ss -t -a</span>

</code></pre><p>或</p>
<pre><code class="hljs apache"><span class="hljs-comment"># ss -u -a</span>

</code></pre><p>显示所有带有 SELinux 安全上下文Security Context的 TCP 套接字：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># ss -t -a -Z</span>

</code></pre><p>请参阅以下关于 <code>ss</code> 和 <code>netstat</code> 命令的资料：</p>
<ul>
<li><a href="https://www.cyberciti.biz/tips/linux-investigate-sockets-network-connections.html">ss：显示 Linux TCP / UDP 网络套接字信息</a></li>
<li><a href="https://www.cyberciti.biz/tips/netstat-command-tutorial-examples.html">使用 netstat 命令获取有关特定 IP 地址连接的详细信息</a></li>
</ul>
<h3><a href="#13-iptraf---获取实时网络统计信息"></a>13. iptraf - 获取实时网络统计信息</h3>
<p><code>iptraf</code> 命令是一个基于 ncurses 的交互式 IP 网络监控工具。它可以生成多种网络统计信息，包括 TCP 信息、UDP 计数、ICMP 和 OSPF 信息、以太网负载信息、节点统计信息、IP 校验错误等。它以简单的格式提供了以下信息：</p>
<ul>
<li>基于 TCP 连接的网络流量统计</li>
<li>基于网络接口的 IP 流量统计</li>
<li>基于协议的网络流量统计</li>
<li>基于 TCP/UDP 端口和数据包大小的网络流量统计</li>
<li>基于二层地址的网络流量统计</li>
</ul>
<p><a href="https://camo.githubusercontent.com/7f14030dc2aa57705f76207a11d9ccbbeda07f5a/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030392f30362f697074726166332e706e67"><img src="https://p0.ssl.qhimg.com/t0100a029cf16387eda.png" alt="Fig.02: General interface statistics: IP traffic statistics by network interface" title="Fig.02: General interface statistics: IP traffic statistics by network interface"></a></p>
<p><em>图 02：常规接口统计：基于网络接口的 IP 流量统计</em></p>
<p><a href="https://camo.githubusercontent.com/9f3f36a305d20247b1843647ea9e6bc1f9747aa4/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030392f30362f697074726166322e706e67"><img src="https://p0.ssl.qhimg.com/t018e0d43352ecf3df4.png" alt="Fig.03 Network traffic statistics by TCP connection" title="Fig.03 Network traffic statistics by TCP connection"></a></p>
<p><em>图 03：基于 TCP 连接的网络流量统计</em></p>
<p>相关链接：<a href="https://www.cyberciti.biz/faq/install-iptraf-centos-redhat-fedora-linux/">在 Centos / RHEL / Fedora Linux 上安装 IPTraf 以获取网络统计信息</a></p>
<h3><a href="#14-tcpdump---详细的网络流量分析"></a>14. tcpdump - 详细的网络流量分析</h3>
<p><code>tcpdump</code> 命令是简单的分析网络通信的命令。您需要充分了解 TCP/IP 协议才便于使用此工具。例如，要显示有关 DNS 的流量信息，请输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> tcpdump -i eth1 <span class="hljs-string">'udp port 53'</span></span>

</code></pre><p>查看所有去往和来自端口 80 的 IPv4 HTTP 数据包，仅打印真正包含数据的包，而不是像 SYN、FIN 和仅含 ACK 这类的数据包，请输入：</p>
<pre><code class="hljs accesslog"># tcpdump 'tcp port <span class="hljs-number">80</span> and (((ip<span class="hljs-string">[2:2]</span> - ((ip<span class="hljs-string">[0]</span>&amp;0xf)&lt;&lt;<span class="hljs-number">2</span>)) - ((tcp<span class="hljs-string">[12]</span>&amp;0xf0)&gt;&gt;<span class="hljs-number">2</span>)) != <span class="hljs-number">0</span>)'

</code></pre><p>显示所有目标地址为 202.54.1.5 的 FTP 会话，请输入：</p>
<pre><code class="hljs lsl"># tcpdump -i eth1 'dst <span class="hljs-number">202.54</span><span class="hljs-number">.1</span><span class="hljs-number">.5</span> and (port <span class="hljs-number">21</span> or <span class="hljs-number">20</span>'

</code></pre><p>打印所有目标地址为 192.168.1.5 的 HTTP 会话：</p>
<pre><code class="hljs sml"># tcpdump -ni eth0 <span class="hljs-symbol">'dst</span> <span class="hljs-number">192.168</span>.<span class="hljs-number">1.5</span> <span class="hljs-keyword">and</span> tcp <span class="hljs-keyword">and</span> port http'

</code></pre><p>使用 <a href="https://www.cyberciti.biz/faq/linux-unix-bsd-apache-tcpdump-http-packets-sniffing/">wireshark</a> 查看文件的详细内容，请输入：</p>
<pre><code class="hljs excel"># tcpdump -<span class="hljs-built_in">n</span> -i eth1 -s <span class="hljs-number">0</span> -w output.txt src <span class="hljs-built_in">or</span> dst port <span class="hljs-number">80</span>

</code></pre><h3><a href="#15-iotop---io-监控"></a>15. iotop - I/O 监控</h3>
<p><code>iotop</code> 命令利用 Linux 内核监控 I/O 使用情况，它按进程或线程的顺序显示 I/O 使用情况。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo iotop</span>

</code></pre><p>输出示例：</p>
<p><a href="https://camo.githubusercontent.com/2da631084c70c0fa8c218cac0f67355490ed1149/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f696f746f702d6d6f6e69746f72696e672d6c696e75782d6469736b2d726561642d77726974652d494f2e6a7067"><img src="https://p0.ssl.qhimg.com/t01a7e61b4d2c7d2152.jpg" alt="iotop monitoring linux disk read write IO"></a></p>
<p>相关链接：<a href="https://www.cyberciti.biz/hardware/linux-iotop-simple-top-like-io-monitor/">Linux iotop：什么进程在增加硬盘负载</a></p>
<h3><a href="#16-htop---交互式的进程查看器"></a>16. htop - 交互式的进程查看器</h3>
<p><code>htop</code> 是一款免费并开源的基于 ncurses 的 Linux 进程查看器。它比 <code>top</code> 命令更简单易用。您无需使用 PID、无需离开 <code>htop</code> 界面，便可以杀掉进程或调整其调度优先级。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> htop</span>

</code></pre><p>输出示例：</p>
<p><a href="https://camo.githubusercontent.com/352e84186dcd2cbd4571175c3c3ce60e3c37d8b3/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f68746f702d70726f636573732d7669657765722d666f722d4c696e75782e6a7067"><img src="https://p0.ssl.qhimg.com/t01394574ffbecf009c.jpg" alt="htop process viewer for Linux"></a></p>
<p>相关链接：<a href="https://www.cyberciti.biz/faq/centos-redhat-linux-install-htop-command-using-yum/">CentOS / RHEL：安装 htop——交互式文本模式进程查看器</a></p>
<h3><a href="#17-atop---高级版系统与进程监控工具"></a>17. atop - 高级版系统与进程监控工具</h3>
<p><code>atop</code> 是一个非常强大的交互式 Linux 系统负载监控器，它从性能的角度显示最关键的硬件资源信息。您可以快速查看 CPU、内存、磁盘和网络性能。它还可以从进程的级别显示哪些进程造成了相关 CPU 和内存的负载。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> atop</span>

</code></pre><p><a href="https://camo.githubusercontent.com/cdccab9da3aed833d78dd9eaa602b90ccedd246d/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f61746f702d436f6d6d616e642d4c696e652d546f6f6c732d746f2d4d6f6e69746f722d4c696e75782d506572666f726d616e63652e6a7067"><img src="https://p0.ssl.qhimg.com/t01a7bdc566fccfb715.jpg" alt="atop Command Line Tools to Monitor Linux Performance"></a></p>
<p>相关链接：<a href="https://www.cyberciti.biz/faq/centos-redhat-linux-install-atop-command-using-yum/">CentOS / RHEL：安装 atop 工具——高级系统和进程监控器</a></p>
<h3><a href="#18-ac-和-lastcomm"></a>18. ac 和 lastcomm</h3>
<p>您一定需要监控 Linux 服务器上的进程和登录活动吧。<code>psacct</code> 或 <code>acct</code> 软件包中包含了多个用于监控进程活动的工具，包括：</p>
<ol>
<li><code>ac</code> 命令：显示有关用户连接时间的统计信息</li>
<li><a href="https://www.cyberciti.biz/faq/linux-unix-lastcomm-command-examples-usage-syntax/" title="See Linux/Unix lastcomm command examples for more info">lastcomm 命令</a>：显示已执行过的命令</li>
<li><code>accton</code> 命令：打开或关闭进程账号记录功能</li>
<li><code>sa</code> 命令：进程账号记录信息的摘要</li>
</ol>
<p>相关链接：<a href="https://www.cyberciti.biz/tips/howto-log-user-activity-using-process-accounting.html">如何对 Linux 系统的活动做详细的跟踪记录</a></p>
<h3><a href="#19-monit---进程监控器"></a>19. monit - 进程监控器</h3>
<p><code>monit</code> 是一个免费且开源的进程监控软件，它可以自动重启停掉的服务。您也可以使用 Systemd、daemontools 或其他类似工具来达到同样的目的。<a href="https://www.cyberciti.biz/faq/how-to-install-and-use-monit-on-ubuntudebian-linux-server/">本教程演示如何在 Debian 或 Ubuntu Linux 上安装和配置 monit 作为进程监控器</a>。</p>
<h3><a href="#20-nethogs---找出占用带宽的进程"></a>20. NetHogs - 找出占用带宽的进程</h3>
<p>NetHogs 是一个轻便的网络监控工具，它按照进程名称（如 Firefox、wget 等）对带宽进行分组。如果网络流量突然爆发，启动 NetHogs，您将看到哪个进程（PID）导致了带宽激增。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo nethogs</span>

</code></pre><p><a href="https://camo.githubusercontent.com/f6e58dc1a9b64ff2fd5cddbc76a9d9d08a286fb1/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f6e6574686f67732d6c696e75782d6d6f6e69746f72696e672d746f6f6c732d6f70656e2d736f757263652e6a7067"><img src="https://p0.ssl.qhimg.com/t0153940bb4b0332167.jpg" alt="nethogs linux monitoring tools open source"></a></p>
<p>相关链接：<a href="https://www.cyberciti.biz/faq/linux-find-out-what-process-is-using-bandwidth/">Linux：使用 Nethogs 工具查看每个进程的带宽使用情况</a></p>
<h3><a href="#21-iftop---显示主机上网络接口的带宽使用情况"></a>21. iftop - 显示主机上网络接口的带宽使用情况</h3>
<p><code>iftop</code> 命令监听指定接口（如 eth0）上的网络通信情况。<a href="https://www.cyberciti.biz/tips/linux-display-bandwidth-usage-on-network-interface-by-host.html">它显示了一对主机的带宽使用情况</a>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo iftop</span>

</code></pre><p><a href="https://camo.githubusercontent.com/5c89c36b845c637c0653040013ba8e147117d64a/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f696d616765732f6661712f323031332f31312f6966746f702d6f7574707574732d736d616c6c2e676966"><img src="https://p0.ssl.qhimg.com/t019f4b6da4e6b2e31b.gif" alt="iftop in action"></a></p>
<h3><a href="#22-vnstat---基于控制台的网络流量监控工具"></a>22. vnstat - 基于控制台的网络流量监控工具</h3>
<p><code>vnstat</code> 是一个简单易用的基于控制台的网络流量监视器，它为指定网络接口保留每小时、每天和每月网络流量日志。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vnstat</span>

</code></pre><p><a href="https://camo.githubusercontent.com/7d1b4476ecfd20878a78a07ebc46cdbb89953ef7/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f766e737461742d6c696e75782d6e6574776f726b2d747261666669632d6d6f6e69746f722e6a7067"><img src="https://p0.ssl.qhimg.com/t01eaf88828bb97df88.jpg" alt="vnstat linux network traffic monitor"></a></p>
<p>相关链接：</p>
<ul>
<li><a href="https://www.cyberciti.biz/tips/linux-display-bandwidth-usage-on-network-interface-by-host.html">为 ADSL 或专用远程 Linux 服务器保留日常网络流量日志</a></li>
<li><a href="https://www.cyberciti.biz/faq/centos-redhat-fedora-linux-install-vnstat-bandwidth-monitor/">CentOS / RHEL：安装 vnStat 网络流量监控器以保留日常网络流量日志</a></li>
<li><a href="https://www.cyberciti.biz/faq/centos-redhat-fedora-linux-vnstat-php-webinterface-frontend-config/">CentOS / RHEL：使用 PHP 网页前端接口查看 Vnstat 图表</a></li>
</ul>
<h3><a href="#23-nmon---linux-系统管理员的调优和基准测量工具"></a>23. nmon - Linux 系统管理员的调优和基准测量工具</h3>
<p><code>nmon</code> 是 Linux 系统管理员用于性能调优的利器，它在命令行显示 CPU、内存、网络、磁盘、文件系统、NFS、消耗资源最多的进程和分区信息。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> nmon</span>

</code></pre><p><a href="https://camo.githubusercontent.com/7f3bb21de57451f3ce4af8dbb70c81d6a56347bc/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f6e6d6f6e2d636f6d6d616e642e6a7067"><img src="https://p0.ssl.qhimg.com/t01af848ff458566cb6.jpg" alt="nmon command"></a></p>
<p>相关链接：<a href="https://www.cyberciti.biz/faq/nmon-performance-analyzer-linux-server-tool/">安装并使用 nmon 工具来监控 Linux 系统的性能</a></p>
<h3><a href="#24-glances---密切关注-linux-系统"></a>24. glances - 密切关注 Linux 系统</h3>
<p><code>glances</code> 是一款开源的跨平台监控工具。它在小小的屏幕上提供了大量的信息，还可以工作于客户端-服务器模式下。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> glances</span>

</code></pre><p><a href="https://camo.githubusercontent.com/4efa3aad05b7bdf0c594c96988a0d4a967cfdd90/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323030392f30362f676c616e6365732d6b6565702d616e2d6579652d6f6e2d6c696e75782e6a7067"><img src="https://p0.ssl.qhimg.com/t01170ba5740c128199.jpg" alt="Glances"></a></p>
<p>相关链接：<a href="https://www.cyberciti.biz/faq/linux-install-glances-monitoring-tool/">Linux：通过 Glances 监控器密切关注您的系统</a></p>
<h3><a href="#25-strace---查看系统调用"></a>25. strace - 查看系统调用</h3>
<p>想要跟踪 Linux 系统的调用和信号吗？试试 <code>strace</code> 命令吧。它对于调试网页服务器和其他服务器问题很有用。了解如何利用其 <a href="https://www.cyberciti.biz/tips/linux-strace-command-examples.html">追踪进程</a> 并查看它在做什么。</p>
<h3><a href="#26-proc-文件系统---各种内核信息"></a>26. /proc 文件系统 - 各种内核信息</h3>
<p><code>/proc</code> 文件系统提供了不同硬件设备和 Linux 内核的详细信息。更多详细信息，请参阅 <a href="https://www.cyberciti.biz/files/linux-kernel/Documentation/filesystems/proc.txt">Linux 内核 /proc</a> 文档。常见的 <code>/proc</code> 例子：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> cat /proc/cpuinfo</span>
<span class="hljs-meta">#</span><span class="bash"> cat /proc/meminfo</span>
<span class="hljs-meta">#</span><span class="bash"> cat /proc/zoneinfo</span>
<span class="hljs-meta">#</span><span class="bash"> cat /proc/mounts</span>

</code></pre><h3><a href="#27-nagios---linux-服务器和网络监控"></a>27. Nagios - Linux 服务器和网络监控</h3>
<p><a href="http://www.nagios.org/">Nagios</a> 是一款普遍使用的开源系统和网络监控软件。您可以轻松地监控所有主机、网络设备和服务，当状态异常和恢复正常时它都会发出警报通知。<a href="http://fannagioscd.sourceforge.net/drupal/">FAN</a> 是“全自动 Nagios”的缩写。FAN 的目标是提供包含由 Nagios 社区提供的大多数工具包的 Nagios 安装。FAN 提供了标准 ISO 格式的 CD-Rom 镜像，使安装变得更加容易。除此之外，为了改善 Nagios 的用户体验，发行版还包含了大量的工具。</p>
<h3><a href="#28-cacti---基于-web-的-linux-监控工具"></a>28. Cacti - 基于 Web 的 Linux 监控工具</h3>
<p>Cacti 是一个完整的网络图形化解决方案，旨在充分利用 RRDTool 的数据存储和图形功能。Cacti 提供了快速轮询器、高级图形模板、多种数据采集方法和用户管理功能。这些功能被包装在一个直观易用的界面中，确保可以实现从局域网到拥有数百台设备的复杂网络上的安装。它可以提供有关网络、CPU、内存、登录用户、Apache、DNS 服务器等的数据。了解如何在 CentOS / RHEL 下 <a href="https://www.cyberciti.biz/faq/fedora-rhel-install-cacti-monitoring-rrd-software/">安装和配置 Cacti 网络图形化工具</a>。</p>
<h3><a href="#29-kde-系统监控器---实时系统报告和图形化显示"></a>29. KDE 系统监控器 - 实时系统报告和图形化显示</h3>
<p>KSysguard 是 KDE 桌面的网络化系统监控程序。这个工具可以通过 ssh 会话运行。它提供了许多功能，比如可以监控本地和远程主机的客户端-服务器模式。前端图形界面使用传感器来检索信息。传感器可以返回简单的值或更复杂的信息，如表格。每种类型的信息都有一个或多个显示界面，并被组织成工作表的形式，这些工作表可以分别保存和加载。所以，KSysguard 不仅是一个简单的任务管理器，还是一个控制大型服务器平台的强大工具。</p>
<p><a href="https://camo.githubusercontent.com/1727defa67de6aafa4efc192ae3a664ec8b37c66/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030392f30362f6b64652d73797374656d67756172642d73637265656e73686f742e706e67"><img src="https://p0.ssl.qhimg.com/t013d5b648d7eff10f3.png" alt="Fig.05 KDE System Guard" title="Fig.05 KDE System Guard KDE task manager and performance monitor."></a></p>
<p><em>图 05：KDE System Guard {图片来源：维基百科}</em></p>
<p>详细用法，请参阅 <a href="https://docs.kde.org/stable5/en/kde-workspace/ksysguard/index.html">KSysguard 手册</a>。</p>
<h3><a href="#30-gnome-系统监控器"></a>30. GNOME 系统监控器</h3>
<p>系统监控程序能够显示系统基本信息，并监控系统进程、系统资源使用情况和文件系统。您还可以用其修改系统行为。虽然不如 KDE System Guard 强大，但它提供的基本信息对新用户还是有用的：</p>
<ul>
<li>显示关于计算机硬件和软件的各种基本信息</li>
<li>Linux 内核版本</li>
<li>GNOME 版本</li>
<li>硬件</li>
<li>安装的内存</li>
<li>处理器和速度</li>
<li>系统状况</li>
<li>可用磁盘空间</li>
<li>进程</li>
<li>内存和交换空间</li>
<li>网络使用情况</li>
<li>文件系统</li>
<li>列出所有挂载的文件系统及其基本信息</li>
</ul>
<p><a href="https://camo.githubusercontent.com/0e131307c08a75b79a3e6b6704270b5ee1edf27f/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030392f30362f676e6f6d652d73797374656d2d6d6f6e69746f722e706e67"><img src="https://p0.ssl.qhimg.com/t014f03ae9a439faa14.png" alt="Fig.06 The Gnome System Monitor application" title="Fig.06 The Gnome System Monitor application"></a></p>
<p><em>图 06：Gnome 系统监控程序</em></p>
<h3><a href="#福利其他工具"></a>福利：其他工具</h3>
<p>更多工具：</p>
<ul>
<li><a href="https://www.cyberciti.biz/tips/linux-scanning-network-for-open-ports.html">nmap</a> - 扫描服务器的开放端口</li>
<li><a href="https://www.cyberciti.biz/tips/tag/lsof-command">lsof</a> - 列出打开的文件和网络连接等</li>
<li><a href="https://www.cyberciti.biz/faq/debian-ubuntu-install-ntop-network-traffic-monitoring-software/" title="Debian / Ubuntu Linux Install ntop To See Network Usage / Network Status">ntop</a> 基于网页的工具 - <code>ntop</code> 是查看网络使用情况的最佳工具，与 <code>top</code> 命令之于进程的方式类似，即网络流量监控工具。您可以查看网络状态和 UDP、TCP、DNS、HTTP 等协议的流量分发。</li>
<li><a href="https://github.com/brndnmtthws/conky">Conky</a> - X Window 系统下的另一个很好的监控工具。它具有很高的可配置性，能够监视许多系统变量，包括 CPU 状态、内存、交换空间、磁盘存储、温度、进程、网络接口、电池、系统消息和电子邮件等。</li>
<li><a href="http://gkrellm.srcbox.net/">GKrellM</a> - 它可以用来监控 CPU 状态、主内存、硬盘、网络接口、本地和远程邮箱及其他信息。</li>
<li><a href="https://www.cyberciti.biz/tips/finding-out-a-bad-or-simply-overloaded-network-link-with-linuxunix-oses.html">mtr</a> - <code>mtr</code> 将 <code>traceroute</code> 和 <code>ping</code> 程序的功能结合在一个网络诊断工具中。</li>
<li><a href="https://www.cyberciti.biz/faq/how-to-install-and-use-vtop-graphical-terminal-activity-monitor-on-linux/">vtop</a> - 图形化活动监控终端</li>
</ul>
<p>如果您有其他推荐的系统监控工具，欢迎在评论区分享。</p>
<h3><a href="#关于作者"></a>关于作者</h3>
<p>作者 Vivek Gite 是 nixCraft 的创建者，也是经验丰富的系统管理员，以及 Linux 操作系统和 Unix shell 脚本的培训师。他的客户遍布全球，行业涉及 IT、教育、国防航天研究以及非营利部门等。您可以在 <a href="https://twitter.com/nixcraft">Twitter</a>、<a href="https://facebook.com/nixcraft">Facebook</a> 和 <a href="https://plus.google.com/+CybercitiBiz">Google+</a> 上关注他。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/top-linux-monitoring-tools.html">https://www.cyberciti.biz/tips/top-linux-monitoring-tools.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/jessie-pang">jessie-pang</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
每个系统管理员都要知道的 30 个 Linux 系统监控工具

## 原文链接
[https://www.zcfy.cc/article/30-linux-system-monitoring-tools-every-sysadmin-should-know](https://www.zcfy.cc/article/30-linux-system-monitoring-tools-every-sysadmin-should-know)


---
title: '开发一个 Linux 调试器（二）：断点' 
date: 2019-01-22 2:30:08
hidden: true
slug: 51qpzjb4wb4
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#开发一个-linux-调试器二断点"></a>开发一个 Linux 调试器（二）：断点</h1>
<p>在该系列的第一部分，我们写了一个小的进程启动器，作为我们调试器的基础。在这篇博客中，我们会学习在 x86 Linux 上断点是如何工作的，以及如何给我们工具添加设置断点的能力。</p>
<h3><a href="#系列文章索引"></a>系列文章索引</h3>
<p>随着后面文章的发布，这些链接会逐渐生效。</p>
<ol>
<li><a href="https://linux.cn/article-8626-1.html">准备环境</a></li>
<li><a href="https://github.com/TartanLlama/minidbg/tree/tut_break">断点</a></li>
<li>寄存器和内存</li>
<li>Elves 和 dwarves</li>
<li>源码和信号</li>
<li>源码层逐步执行</li>
<li>源码层断点</li>
<li>调用栈</li>
<li>读取变量 10.之后步骤</li>
</ol>
<h3><a href="#断点是如何形成的"></a>断点是如何形成的？</h3>
<p>有两种类型的断点：硬件和软件。硬件断点通常涉及到设置与体系结构相关的寄存器来为你产生断点，而软件断点则涉及到修改正在执行的代码。在这篇文章中我们只会关注软件断点，因为它们比较简单，而且可以设置任意多断点。在 x86 机器上任一时刻你最多只能有 4 个硬件断点，但是它们能让你在读取或者写入给定地址时触发，而不是只有当代码执行到那里的时候。</p>
<p>我前面说软件断点是通过修改正在执行的代码实现的，那么问题就来了：</p>
<ul>
<li>我们如何修改代码？</li>
<li>为了设置断点我们要做什么修改？</li>
<li>如何告知调试器？</li>
</ul>
<p>第一个问题的答案显然是 <code>ptrace</code>。我们之前已经用它为我们的程序设置跟踪并继续程序的执行，但我们也可以用它来读或者写内存。</p>
<p>当执行到断点时，我们的更改要让处理器暂停并给程序发送信号。在 x86 机器上这是通过 <code>int 3</code> 重写该地址上的指令实现的。x86 机器有个中断向量表（interrupt vector table），操作系统能用它来为多种事件注册处理程序，例如页故障、保护故障和无效操作码。它就像是注册错误处理回调函数，但是是在硬件层面的。当处理器执行 <code>int 3</code> 指令时，控制权就被传递给断点中断处理器，对于 Linux 来说，就是给进程发送 <code>SIGTRAP</code> 信号。你可以在下图中看到这个进程，我们用 <code>0xcc</code> 覆盖了 <code>mov</code> 指令的第一个字节，它是 <code>init 3</code> 的指令代码。</p>
<p><a href="https://camo.githubusercontent.com/16fd4bb6d9b7f425fd25c7363397887f062f16c6/687474703a2f2f626c6f672e74617274616e6c6c616d612e78797a2f6173736574732f627265616b706f696e742e706e67"><img src="https://p0.ssl.qhimg.com/t013dc58426e9891f6d.png" alt="断点"></a></p>
<p>谜题的最后一个部分是调试器如何被告知中断的。如果你回顾前面的文章，我们可以用 <code>waitpid</code> 来监听被发送给被调试的程序的信号。这里我们也可以这样做：设置断点、继续执行程序、调用 <code>waitpid</code> 并等待直到发生 <code>SIGTRAP</code>。然后就可以通过打印已运行到的源码位置、或改变有图形用户界面的调试器中关注的代码行，将这个断点传达给用户。</p>
<h3><a href="#实现软件断点"></a>实现软件断点</h3>
<p>我们会实现一个 <code>breakpoint</code> 类来表示某个位置的断点，我们可以根据需要启用或者停用该断点。</p>
<pre><code class="hljs java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">breakpoint</span> </span>{
<span class="hljs-keyword">public</span>:
    breakpoint(pid_t pid, std::intptr_t addr)
        : m_pid{pid}, m_addr{addr}, m_enabled{<span class="hljs-keyword">false</span>}, m_saved_data{}
    {}

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">enable</span><span class="hljs-params">()</span></span>;
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">disable</span><span class="hljs-params">()</span></span>;

    <span class="hljs-function">auto <span class="hljs-title">is_enabled</span><span class="hljs-params">()</span> <span class="hljs-keyword">const</span> -&gt; bool </span>{ <span class="hljs-keyword">return</span> m_enabled; }
    <span class="hljs-function">auto <span class="hljs-title">get_address</span><span class="hljs-params">()</span> <span class="hljs-keyword">const</span> -&gt; std::intptr_t </span>{ <span class="hljs-keyword">return</span> m_addr; }

<span class="hljs-keyword">private</span>:
    pid_t m_pid;
    std::intptr_t m_addr;
    bool m_enabled;
    uint64_t m_saved_data; <span class="hljs-comment">//data which used to be at the breakpoint address</span>
};

</code></pre><p>这里的大部分代码都是跟踪状态；真正神奇的地方是 <code>enable</code> 和 <code>disable</code> 函数。</p>
<p>正如我们上面学到的，我们要用 <code>int 3</code> 指令 - 编码为 <code>0xcc</code> - 替换当前指定地址的指令。我们还要保存该地址之前的值，以便后面恢复该代码；我们不想忘了执行用户（原来）的代码。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">void</span> breakpoint::enable() {
    m_saved_data = ptrace(PTRACE_PEEKDATA, m_pid, m_addr, <span class="hljs-literal">nullptr</span>);
    <span class="hljs-keyword">uint64_t</span> int3 = <span class="hljs-number">0xcc</span>;
    <span class="hljs-keyword">uint64_t</span> data_with_int3 = ((m_saved_data &amp; ~<span class="hljs-number">0xff</span>) | int3); <span class="hljs-comment">//set bottom byte to 0xcc</span>
    ptrace(PTRACE_POKEDATA, m_pid, m_addr, data_with_int3);

    m_enabled = <span class="hljs-literal">true</span>;
}

</code></pre><p><code>PTRACE_PEEKDATA</code> 请求告知 <code>ptrace</code> 如何读取被跟踪进程的内存。我们给它一个进程 ID 和一个地址，然后它返回给我们该地址当前的 64 位内容。 <code>(m_saved_data &amp; ~0xff)</code> 把这个数据的低位字节置零，然后我们用它和我们的 <code>int 3</code> 指令按位或（<code>OR</code>）来设置断点。最后我们通过 <code>PTRACE_POKEDATA</code> 用我们的新数据覆盖那部分内存来设置断点。</p>
<p><code>disable</code> 的实现比较简单，我们只需要恢复用 <code>0xcc</code> 所覆盖的原始数据。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">void</span> breakpoint::disable() {
    ptrace(PTRACE_POKEDATA, m_pid, m_addr, m_saved_data);
    m_enabled = <span class="hljs-literal">false</span>;
}

</code></pre><h3><a href="#在调试器中增加断点"></a>在调试器中增加断点</h3>
<p>为了支持通过用户界面设置断点，我们要在 debugger 类修改三个地方：</p>
<ol>
<li>给 <code>debugger</code> 添加断点存储数据结构</li>
<li>添加 <code>set_breakpoint_at_address</code> 函数</li>
<li>给我们的 <code>handle_command</code> 函数添加 <code>break</code> 命令</li>
</ol>
<p>我会将我的断点保存到 <code>std::unordered_map&lt;std::intptr_t, breakpoint&gt;</code> 结构，以便能简单快速地判断一个给定的地址是否有断点，如果有的话，取回该 breakpoint 对象。</p>
<pre><code class="hljs cpp"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">debugger</span> {</span>
    <span class="hljs-comment">//...</span>
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">set_breakpoint_at_address</span><span class="hljs-params">(<span class="hljs-built_in">std</span>::<span class="hljs-keyword">intptr_t</span> addr)</span></span>;
    <span class="hljs-comment">//...</span>
<span class="hljs-keyword">private</span>:
    <span class="hljs-comment">//...</span>
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">unordered_map</span>&lt;<span class="hljs-built_in">std</span>::<span class="hljs-keyword">intptr_t</span>,breakpoint&gt; m_breakpoints;
}

</code></pre><p>在 <code>set_breakpoint_at_address</code> 函数中我们会新建一个 breakpoint 对象，启用它，把它添加到数据结构里，并给用户打印一条信息。如果你喜欢的话，你可以重构所有的输出信息，从而你可以将调试器作为库或者命令行工具使用，为了简便，我把它们都整合到了一起。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">void</span> debugger::set_breakpoint_at_address(<span class="hljs-built_in">std</span>::<span class="hljs-keyword">intptr_t</span> addr) {
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"Set breakpoint at address 0x"</span> &lt;&lt; <span class="hljs-built_in">std</span>::hex &lt;&lt; addr &lt;&lt; <span class="hljs-built_in">std</span>::<span class="hljs-built_in">endl</span>;
    breakpoint bp {m_pid, addr};
    bp.enable();
    m_breakpoints[addr] = bp;
}

</code></pre><p>现在我们会在我们的命令处理程序中增加对我们新函数的调用。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">void</span> debugger::handle_command(<span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span>&amp; line) {
    <span class="hljs-keyword">auto</span> args = split(line,<span class="hljs-string">' '</span>);
    <span class="hljs-keyword">auto</span> command = args[<span class="hljs-number">0</span>];

    <span class="hljs-keyword">if</span> (is_prefix(command, <span class="hljs-string">"cont"</span>)) {
        continue_execution();
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(is_prefix(command, <span class="hljs-string">"break"</span>)) {
        <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> addr {args[<span class="hljs-number">1</span>], <span class="hljs-number">2</span>}; <span class="hljs-comment">//naively assume that the user has written 0xADDRESS</span>
        set_breakpoint_at_address(<span class="hljs-built_in">std</span>::stol(addr, <span class="hljs-number">0</span>, <span class="hljs-number">16</span>));
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cerr</span> &lt;&lt; <span class="hljs-string">"Unknown command\n"</span>;
    }
}

</code></pre><p>我删除了字符串中的前两个字符并对结果调用 <code>std::stol</code>，你也可以让该解析更健壮一些。<code>std::stol</code> 可以将字符串按照所给基数转化为整数。</p>
<h3><a href="#从断点继续执行"></a>从断点继续执行</h3>
<p>如果你尝试这样做，你可能会发现，如果你从断点处继续执行，不会发生任何事情。这是因为断点仍然在内存中，因此一直被重复命中。简单的解决办法就是停用这个断点、运行到下一步、再次启用这个断点、然后继续执行。不过我们还需要更改程序计数器，指回到断点前面，这部分内容会留到下一篇关于操作寄存器的文章中介绍。</p>
<h3><a href="#测试它"></a>测试它</h3>
<p>当然，如果你不知道要在哪个地址设置，那么在某些地址设置断点并非很有用。后面我们会学习如何在函数名或者代码行设置断点，但现在我们可以通过手动实现。</p>
<p>测试你调试器的简单方法是写一个 hello world 程序，这个程序输出到 <code>std::err</code>（为了避免缓存），并在调用输出操作符的地方设置断点。如果你继续执行被调试的程序，执行很可能会停止而不会输出任何东西。然后你可以重启调试器并在调用之后设置一个断点，现在你应该看到成功地输出了消息。</p>
<p>查找地址的一个方法是使用 <code>objdump</code>。如果你打开一个终端并执行 <code>objdump -d &lt;your program&gt;</code>，然后你应该看到你的程序的反汇编代码。你就可以找到 <code>main</code> 函数并定位到你想设置断点的 <code>call</code> 指令。例如，我编译了一个 hello world 程序，反汇编它，然后得到了如下的 <code>main</code> 的反汇编代码：</p>
<pre><code class="hljs perl"><span class="hljs-number">0000000000400</span>936 &lt;main&gt;:
  <span class="hljs-number">400936</span>:    <span class="hljs-number">55</span>                       <span class="hljs-keyword">push</span>   %rbp
  <span class="hljs-number">400937</span>:    <span class="hljs-number">48</span> <span class="hljs-number">89</span> e5                 mov    %rsp,%rbp
  <span class="hljs-number">40093</span>a:    be <span class="hljs-number">35</span> 0a <span class="hljs-number">40</span> <span class="hljs-number">00</span>           mov    $0x400a35,%esi
  <span class="hljs-number">40093</span>f:    bf <span class="hljs-number">60</span> <span class="hljs-number">10</span> <span class="hljs-number">60</span> <span class="hljs-number">00</span>           mov    $0x60106<span class="hljs-number">0</span>,%edi
  <span class="hljs-number">400944</span>:    e8 d7 fe ff ff           callq  <span class="hljs-number">400820</span> &lt;_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@plt&gt;
  <span class="hljs-number">400949</span>:    b8 <span class="hljs-number">00</span> <span class="hljs-number">00</span> <span class="hljs-number">00</span> <span class="hljs-number">00</span>           mov    $0<span class="hljs-keyword">x</span><span class="hljs-number">0</span>,%eax
  <span class="hljs-number">40094</span>e:    <span class="hljs-number">5</span>d                       <span class="hljs-keyword">pop</span>    %rbp
  <span class="hljs-number">40094</span>f:    c3                       retq

</code></pre><p>正如你看到的，要没有输出，我们要在 <code>0x400944</code> 设置断点，要看到输出，要在 <code>0x400949</code> 设置断点。</p>
<h3><a href="#总结"></a>总结</h3>
<p>现在你应该有了一个可以启动程序、允许在内存地址上设置断点的调试器。后面我们会添加读写内存和寄存器的功能。再次说明，如果你有任何问题请在评论框中告诉我。</p>
<p>你可以在<a href="https://github.com/TartanLlama/minidbg/tree/tut_break">这里</a> 找到该项目的代码。</p>
<hr>
<p>via: <a href="http://blog.tartanllama.xyz/c++/2017/03/24/writing-a-linux-debugger-breakpoints/">http://blog.tartanllama.xyz/c++/2017/03/24/writing-a-linux-debugger-breakpoints/</a></p>
<p>作者：<a href="http://blog.tartanllama.xyz/">Simon Brand</a> 译者：<a href="https://github.com/ictlyh">ictlyh</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开发一个 Linux 调试器（二）：断点

## 原文链接
[https://www.zcfy.cc/article/writing-a-linux-debugger-part-2-breakpoints](https://www.zcfy.cc/article/writing-a-linux-debugger-part-2-breakpoints)


---
title: '开发一个 Linux 调试器（一）：准备环境' 
date: 2019-01-22 2:30:08
hidden: true
slug: 5kgm1r8chuv
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#开发一个-linux-调试器一准备环境"></a>开发一个 Linux 调试器（一）：准备环境</h1>
<p>任何写过比 hello world 复杂一些的程序的人都应该使用过调试器（如果你还没有，那就停下手头的工作先学习一下吧）。但是，尽管这些工具已经得到了广泛的使用，却并没有太多的资源告诉你它们的工作原理以及如何开发，尤其是和其它那些比如编译器等工具链技术相比而言。</p>
<blockquote>
<p>此处有一些其它的资源可以参考：</p>
</blockquote>
<blockquote>
<ul>
<li><a href="http://eli.thegreenplace.net/2011/01/23/how-debuggers-work-part-1">http://eli.thegreenplace.net/2011/01/23/how-debuggers-work-part-1</a></li>
</ul>
</blockquote>
<blockquote>
<ul>
<li><a href="https://t-a-w.blogspot.co.uk/2007/03/how-to-code-debuggers.html">https://t-a-w.blogspot.co.uk/2007/03/how-to-code-debuggers.html</a></li>
</ul>
</blockquote>
<blockquote>
<ul>
<li><a href="https://www.codeproject.com/Articles/43682/Writing-a-basic-Windows-debugger">https://www.codeproject.com/Articles/43682/Writing-a-basic-Windows-debugger</a></li>
</ul>
</blockquote>
<blockquote>
<ul>
<li><a href="http://system.joekain.com/debugger/">http://system.joekain.com/debugger/</a></li>
</ul>
</blockquote>
<p>我们将会支持以下功能：</p>
<ul>
<li>启动、暂停、继续执行</li>
<li>在不同地方设置断点<ul>
<li>内存地址</li>
<li>源代码行</li>
<li>函数入口</li>
</ul>
</li>
<li>读写寄存器和内存</li>
<li>单步执行<ul>
<li>指令</li>
<li>进入函数</li>
<li>跳出函数</li>
<li>跳过函数</li>
</ul>
</li>
<li>打印当前代码地址</li>
<li>打印函数调用栈</li>
<li>打印简单变量的值</li>
</ul>
<p>在最后一部分，我还会大概介绍如何给你的调试器添加下面的功能：</p>
<ul>
<li>远程调试</li>
<li>共享库和动态库支持</li>
<li>表达式计算</li>
<li>多线程调试支持</li>
</ul>
<p>在本项目中我会将重点放在 C 和 C++，但对于那些将源码编译为机器码并输出标准 DWARE 调试信息的语言也应该能起作用（如果你还不知道这些东西是什么，别担心，马上就会介绍到啦）。另外，我只关注如何将程序运行起来并在大部分情况下能正常工作，为了简便，会避开类似健壮错误处理方面的东西。</p>
<h3><a href="#系列文章索引"></a>系列文章索引</h3>
<p>随着后面文章的发布，这些链接会逐渐生效。</p>
<ol>
<li><a href="http://blog.tartanllama.xyz/c++/2017/03/21/writing-a-linux-debugger-setup/">准备环境</a></li>
<li><a href="http://blog.tartanllama.xyz/c++/2017/03/24/writing-a-linux-debugger-breakpoints/">断点</a></li>
<li>寄存器和内存</li>
<li>Elves 和 dwarves</li>
<li>源码和信号</li>
<li>源码层逐步执行</li>
<li>源码层断点</li>
<li>调用栈</li>
<li>读取变量</li>
<li>之后步骤</li>
</ol>
<p>LCTT 译注：ELF —— 可执行文件格式<a href="https://en.wikipedia.org/wiki/Executable_and_Linkable_Format" title="Executable and Linkable Format">Executable and Linkable Format</a>；DWARF（一种广泛使用的调试数据格式，参考 <a href="https://en.wikipedia.org/wiki/DWARF" title="DWARF WIKI">WIKI</a>）。</p>
<h3><a href="#准备环境"></a>准备环境</h3>
<p>在我们正式开始之前，我们首先要设置环境。在这篇文章中我会依赖两个工具：<a href="https://github.com/antirez/linenoise">Linenoise</a> 用于处理命令行输入，<a href="https://github.com/TartanLlama/libelfin/tree/fbreg">libelfin</a> 用于解析调试信息。你也可以使用更传统的 libdwarf 而不是 libelfin，但是界面没有那么友好，另外 libelfin 还提供了基本完整的 DWARF 表达式求值器，当你想读取变量的值时这能帮你节省很多时间。确认你使用的是 libelfin 我的 fbreg 分支，因为它提供 x86 上读取变量的额外支持。</p>
<p>一旦你在系统上安装或者使用你喜欢的编译系统编译好了这些依赖工具，就可以开始啦。我在 CMake 文件中把它们设置为和我其余的代码一起编译。</p>
<h3><a href="#启动可执行程序"></a>启动可执行程序</h3>
<p>在真正调试任何程序之前，我们需要启动被调试的程序。我们会使用经典的 <code>fork</code>/<code>exec</code> 模式。</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">char</span>* argv[])</span> </span>{
    <span class="hljs-keyword">if</span> (argc &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cerr</span> &lt;&lt; <span class="hljs-string">"Program name not specified"</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }

    <span class="hljs-keyword">auto</span> prog = argv[<span class="hljs-number">1</span>];

    <span class="hljs-keyword">auto</span> pid = fork();
    <span class="hljs-keyword">if</span> (pid == <span class="hljs-number">0</span>) {
        <span class="hljs-comment">//we're in the child process</span>
        <span class="hljs-comment">//execute debugee</span>

    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (pid &gt;= <span class="hljs-number">1</span>)  {
        <span class="hljs-comment">//we're in the parent process</span>
        <span class="hljs-comment">//execute debugger</span>
    }

</code></pre><p>我们调用 <code>fork</code> 把我们的程序分成两个进程。如果我们是在子进程，<code>fork</code> 返回 0，如果我们是在父进程，它会返回子进程的进程 ID。</p>
<p>如果我们是在子进程，我们要用希望调试的程序替换正在执行的程序。</p>
<pre><code class="hljs lisp">   ptrace(<span class="hljs-name">PTRACE_TRACEME</span>, <span class="hljs-number">0</span>, nullptr, nullptr)<span class="hljs-comment">;</span>
   execl(<span class="hljs-name">prog</span>.c_str(), prog.c_str(), nullptr)<span class="hljs-comment">;</span>

</code></pre><p>这里我们第一次遇到了 <code>ptrace</code>，它会在我们编写调试器的时候经常遇到。<code>ptrace</code> 通过读取寄存器、内存、逐步调试等让我们观察和控制另一个进程的执行。其 API 非常简单；你需要给这个简单函数提供一个枚举值指定你想要进行的操作，然后是一些取决于你所提供的值可能会被使用也可能会被忽略的参数。函数原型看起来类似：</p>
<pre><code class="hljs crystal">long ptrace(<span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">__ptrace_request</span> <span class="hljs-title">request</span>, <span class="hljs-title">pid_t</span> <span class="hljs-title">pid</span>,</span>
            void *addr, void *data);

</code></pre><p><code>request</code> 是我们想对被跟踪进程进行的操作；<code>pid</code> 是被跟踪进程的进程 ID；<code>addr</code> 是一个内存地址，用于在一些调用中指定被跟踪程序的地址；<code>data</code> 是 <code>request</code> 相应的资源。返回值通常是一些错误信息，因此在你实际的代码中你也许应该检查返回值；为了简洁我这里就省略了。你可以查看 man 手册获取更多（关于 ptrace）的信息。</p>
<p>上面代码中我们发送的请求 <code>PTRACE_TRACEME</code> 表示这个进程应该允许父进程跟踪它。所有其它参数都会被忽略，因为 API 设计并不是很重要，哈哈。</p>
<p>下一步，我们会调用 <code>execl</code>，这是很多诸多的 <code>exec</code> 函数格式之一。我们执行指定的程序，通过命令行参数传递它的名称，然后用一个 <code>nullptr</code> 终止列表。如果你愿意，你还可以传递其它执行你的程序所需的参数。</p>
<p>在完成这些后，我们就会和子进程一起结束；在我们结束它之前它会一直执行。</p>
<h3><a href="#添加调试循环"></a>添加调试循环</h3>
<p>现在我们已经启动了子进程，我们想要能够和它进行交互。为此，我们会创建一个 <code>debugger</code> 类，循环监听用户输入，然后在我们父进程的 <code>main</code> 函数中启动它。</p>
<pre><code class="hljs stata"><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (pid &gt;= 1)  {
    <span class="hljs-comment">//parent</span>
    debugger dbg{<span class="hljs-keyword">prog</span>, pid};
    dbg.<span class="hljs-keyword">run</span>();
}

</code></pre><pre><code class="hljs cpp"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">debugger</span> {</span>
<span class="hljs-keyword">public</span>:
    debugger (<span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> prog_name, <span class="hljs-keyword">pid_t</span> pid)
        : m_prog_name{<span class="hljs-built_in">std</span>::move(prog_name)}, m_pid{pid} {}

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">run</span><span class="hljs-params">()</span></span>;

<span class="hljs-keyword">private</span>:
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> m_prog_name;
    <span class="hljs-keyword">pid_t</span> m_pid;
};

</code></pre><p>在 <code>run</code> 函数中，我们需要等待，直到子进程完成启动，然后一直从 <code>linenoise</code> 获取输入直到收到 <code>EOF</code>（<code>CTRL+D</code>）。</p>
<pre><code class="hljs arduino"><span class="hljs-keyword">void</span> debugger::<span class="hljs-built_in">run</span>() {
    <span class="hljs-keyword">int</span> wait_status;
    <span class="hljs-keyword">auto</span> options = <span class="hljs-number">0</span>;
    waitpid(m_pid, &amp;wait_status, options);

    <span class="hljs-keyword">char</span>* <span class="hljs-built_in">line</span> = nullptr;
    <span class="hljs-built_in">while</span>((<span class="hljs-built_in">line</span> = linenoise(<span class="hljs-string">"minidbg&gt; "</span>)) != nullptr) {
        handle_command(<span class="hljs-built_in">line</span>);
        linenoiseHistoryAdd(<span class="hljs-built_in">line</span>);
        linenoiseFree(<span class="hljs-built_in">line</span>);
    }
}

</code></pre><p>当被跟踪的进程启动时，会发送一个 <code>SIGTRAP</code> 信号给它，这是一个跟踪或者断点中断。我们可以使用 <code>waitpid</code> 函数等待这个信号发送。</p>
<p>当我们知道进程可以被调试之后，我们监听用户输入。<code>linenoise</code> 函数它自己会用一个窗口显示和处理用户输入。这意味着我们不需要做太多的工作就会有一个支持历史记录和导航命令的命令行。当我们获取到输入时，我们把命令发给我们写的小程序 <code>handle_command</code>，然后我们把这个命令添加到 <code>linenoise</code> 历史并释放资源。</p>
<h3><a href="#处理输入"></a>处理输入</h3>
<p>我们的命令类似 gdb 以及 lldb 的格式。要继续执行程序，用户需要输入 <code>continue</code> 或 <code>cont</code> 甚至只需 <code>c</code>。如果他们想在一个地址中设置断点，他们会输入 <code>break 0xDEADBEEF</code>，其中 <code>0xDEADBEEF</code> 就是所需地址的 16 进制格式。让我们来增加对这些命令的支持吧。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">void</span> debugger::handle_command(<span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span>&amp; line) {
    <span class="hljs-keyword">auto</span> args = split(line,<span class="hljs-string">' '</span>);
    <span class="hljs-keyword">auto</span> command = args[<span class="hljs-number">0</span>];

    <span class="hljs-keyword">if</span> (is_prefix(command, <span class="hljs-string">"continue"</span>)) {
        continue_execution();
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cerr</span> &lt;&lt; <span class="hljs-string">"Unknown command\n"</span>;
    }
}

</code></pre><p><code>split</code> 和 <code>is_prefix</code> 是一对有用的小程序：</p>
<pre><code class="hljs cpp"><span class="hljs-built_in">std</span>::<span class="hljs-built_in">vector</span>&lt;<span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span>&gt; split(<span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> &amp;s, <span class="hljs-keyword">char</span> delimiter) {
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">vector</span>&lt;<span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span>&gt; out{};
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">stringstream</span> ss {s};
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> item;

    <span class="hljs-keyword">while</span> (<span class="hljs-built_in">std</span>::getline(ss,item,delimiter)) {
        out.push_back(item);
    }

    <span class="hljs-keyword">return</span> out;
}

<span class="hljs-function"><span class="hljs-keyword">bool</span> <span class="hljs-title">is_prefix</span><span class="hljs-params">(<span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span>&amp; s, <span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span>&amp; of)</span> </span>{
    <span class="hljs-keyword">if</span> (s.size() &gt; of.size()) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">std</span>::equal(s.begin(), s.end(), of.begin());
}

</code></pre><p>我们会把 <code>continue_execution</code> 函数添加到 <code>debuger</code> 类。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">void</span> debugger::continue_execution() {
    ptrace(PTRACE_CONT, m_pid, <span class="hljs-literal">nullptr</span>, <span class="hljs-literal">nullptr</span>);

    <span class="hljs-keyword">int</span> wait_status;
    <span class="hljs-keyword">auto</span> options = <span class="hljs-number">0</span>;
    waitpid(m_pid, &amp;wait_status, options);
}

</code></pre><p>现在我们的 <code>continue_execution</code> 函数会用 <code>ptrace</code> 告诉进程继续执行，然后用 <code>waitpid</code> 等待直到收到信号。</p>
<hr>
<h3><a href="#总结"></a>总结</h3>
<p>现在你应该编译一些 C 或者 C++ 程序，然后用你的调试器运行它们，看它是否能在函数入口暂停、从调试器中继续执行。在下一篇文章中，我们会学习如何让我们的调试器设置断点。如果你遇到了任何问题，在下面的评论框中告诉我吧！</p>
<p>你可以在<a href="https://github.com/TartanLlama/minidbg/tree/tut_setup">这里</a>找到该项目的代码。</p>
<hr>
<p>via: <a href="http://blog.tartanllama.xyz/c++/2017/03/21/writing-a-linux-debugger-setup/">http://blog.tartanllama.xyz/c++/2017/03/21/writing-a-linux-debugger-setup/</a></p>
<p>作者：<a href="https://www.linkedin.com/in/simon-brand-36520857">Simon Brand</a> 译者：<a href="https://github.com/ictlyh">ictlyh</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开发一个 Linux 调试器（一）：准备环境

## 原文链接
[https://www.zcfy.cc/article/writing-a-linux-debugger-part-1-setup](https://www.zcfy.cc/article/writing-a-linux-debugger-part-1-setup)


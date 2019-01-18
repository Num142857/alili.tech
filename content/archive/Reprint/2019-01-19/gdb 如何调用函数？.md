---
title: 'gdb 如何调用函数？' 
date: 2019-01-19 2:30:10
hidden: true
slug: igyifnr89hd
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#gdb-如何调用函数"></a>gdb 如何调用函数？</h1>
<p>（之前的 gdb 系列文章：<a href="https://linux.cn/article-9491-1.html">gdb 如何工作（2016）</a> 和<a href="https://linux.cn/article-9276-1.html">三步上手 gdb（2014）</a>）</p>
<p>在这周，我发现我可以从 gdb 上调用 C 函数。这看起来很酷，因为在过去我认为 gdb 最多只是一个只读调试工具。</p>
<p>我对 gdb 能够调用函数感到很吃惊。正如往常所做的那样，我在 <a href="https://twitter.com/b0rk/status/948060808243765248">Twitter</a> 上询问这是如何工作的。我得到了大量的有用答案。我最喜欢的答案是 <a href="https://github.com/eklitzke/ptrace-call-userspace/blob/master/call_fprintf.c">Evan Klitzke 的示例 C 代码</a>，它展示了 gdb 如何调用函数。代码能够运行，这很令人激动！</p>
<p>我（通过一些跟踪和实验）认为那个示例 C 代码和 gdb 实际上如何调用函数不同。因此，在这篇文章中，我将会阐述 gdb 是如何调用函数的，以及我是如何知道的。</p>
<p>关于 gdb 如何调用函数，还有许多我不知道的事情，并且，在这儿我写的内容有可能是错误的。</p>
<h3><a href="#从-gdb-中调用-c-函数意味着什么"></a>从 gdb 中调用 C 函数意味着什么？</h3>
<p>在开始讲解这是如何工作之前，我先快速的谈论一下我是如何发现这件令人惊讶的事情的。</p>
<p>假如，你已经在运行一个 C 程序（目标程序）。你可以运行程序中的一个函数，只需要像下面这样做：</p>
<ul>
<li>暂停程序（因为它已经在运行中）</li>
<li>找到你想调用的函数的地址（使用符号表）</li>
<li>使程序（目标程序）跳转到那个地址</li>
<li>当函数返回时，恢复之前的指令指针和寄存器</li>
</ul>
<p>通过符号表来找到想要调用的函数的地址非常容易。下面是一段非常简单但能够工作的代码，我在 Linux 上使用这段代码作为例子来讲解如何找到地址。这段代码使用 <a href="https://cole14.github.io/rust-elf">elf crate</a>。如果我想找到 PID 为 2345 的进程中的 <code>foo</code> 函数的地址，那么我可以运行 <code>elf_symbol_value("/proc/2345/exe", "foo")</code>。</p>
<pre><code class="hljs rust"><span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">elf_symbol_value</span></span>(file_name: &amp;<span class="hljs-built_in">str</span>, symbol_name: &amp;<span class="hljs-built_in">str</span>) -&gt; <span class="hljs-built_in">Result</span>&lt;<span class="hljs-built_in">u64</span>, <span class="hljs-built_in">Box</span>&lt;std::error::Error&gt;&gt; {
    <span class="hljs-comment">// 打开 ELF 文件 </span>
    <span class="hljs-keyword">let</span> file = elf::File::open_path(file_name).ok().ok_or(<span class="hljs-string">"parse error"</span>)?;
    <span class="hljs-comment">// 在所有的段 &amp; 符号中循环，直到找到正确的那个</span>
    <span class="hljs-keyword">let</span> sections = &amp;file.sections;
    <span class="hljs-keyword">for</span> s <span class="hljs-keyword">in</span> sections {
        <span class="hljs-keyword">for</span> sym <span class="hljs-keyword">in</span> file.get_symbols(&amp;s).ok().ok_or(<span class="hljs-string">"parse error"</span>)? {
            <span class="hljs-keyword">if</span> sym.name == symbol_name {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">Ok</span>(sym.value);
            }
        }
    }
    <span class="hljs-literal">None</span>.ok_or(<span class="hljs-string">"No symbol found"</span>)?
}

</code></pre><p>这并不能够真的发挥作用，你还需要找到文件的内存映射，并将符号偏移量加到文件映射的起始位置。找到内存映射并不困难，它位于 <code>/proc/PID/maps</code> 中。</p>
<p>总之，找到想要调用的函数地址对我来说很直接，但是其余部分（改变指令指针，恢复寄存器等）看起来就不这么明显了。</p>
<h3><a href="#你不能仅仅进行跳转"></a>你不能仅仅进行跳转</h3>
<p>我已经说过，你不能够仅仅找到你想要运行的那个函数地址，然后跳转到那儿。我在 gdb 中尝试过那样做（<code>jump foo</code>），然后程序出现了段错误。毫无意义。</p>
<h3><a href="#如何从-gdb-中调用-c-函数"></a>如何从 gdb 中调用 C 函数</h3>
<p>首先，这是可能的。我写了一个非常简洁的 C 程序，它所做的事只有 <code>sleep</code> 1000 秒，把这个文件命名为 <code>test.c</code> ：</p>
<pre><code class="hljs cpp"><span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;unistd.h&gt;</span></span>

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}
<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
    sleep(<span class="hljs-number">1000</span>);
}

</code></pre><p>接下来，编译并运行它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> gcc -o <span class="hljs-built_in">test</span>  test.c</span>
<span class="hljs-meta">$</span><span class="bash"> ./<span class="hljs-built_in">test</span></span>

</code></pre><p>最后，我们使用 gdb 来跟踪 <code>test</code> 这一程序：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo gdb -p $(pgrep -f <span class="hljs-built_in">test</span>)</span>
(gdb) p foo()
<span class="hljs-meta">$</span><span class="bash">1 = 3</span>
(gdb) quit

</code></pre><p>我运行 <code>p foo()</code> 然后它运行了这个函数！这非常有趣。</p>
<h3><a href="#这有什么用"></a>这有什么用？</h3>
<p>下面是一些可能的用途：</p>
<ul>
<li>它使得你可以把 gdb 当成一个 C 应答式程序（REPL），这很有趣，我想对开发也会有用</li>
<li>在 gdb 中进行调试的时候展示/浏览复杂数据结构的功能函数（感谢 <a href="https://twitter.com/invalidop/status/949161146526781440">@invalidop</a>）</li>
<li><a href="https://github.com/baloo/setns/blob/master/setns.c">在进程运行时设置一个任意的名字空间</a>（我的同事 <a href="https://github.com/nelhage">nelhage</a> 对此非常惊讶）</li>
<li>可能还有许多我所不知道的用途</li>
</ul>
<h3><a href="#它是如何工作的"></a>它是如何工作的</h3>
<p>当我在 Twitter 上询问从 gdb 中调用函数是如何工作的时，我得到了大量有用的回答。许多答案是“你从符号表中得到了函数的地址”，但这并不是完整的答案。</p>
<p>有个人告诉了我两篇关于 gdb 如何工作的系列文章：<a href="https://www.cl.cam.ac.uk/%7Esrk31/blog/2016/02/25/#native-debugging-part-1">原生调试：第一部分</a>，<a href="https://www.cl.cam.ac.uk/%7Esrk31/blog/2017/01/30/#native-debugging-part-2">原生调试：第二部分</a>。第一部分讲述了 gdb 是如何调用函数的（指出了 gdb 实际上完成这件事并不简单，但是我将会尽力）。</p>
<p>步骤列举如下：</p>
<ol>
<li>停止进程</li>
<li>创建一个新的栈框（远离真实栈）</li>
<li>保存所有寄存器</li>
<li>设置你想要调用的函数的寄存器参数</li>
<li>设置栈指针指向新的栈框stack frame</li>
<li>在内存中某个位置放置一条陷阱指令</li>
<li>为陷阱指令设置返回地址</li>
<li>设置指令寄存器的值为你想要调用的函数地址</li>
<li>再次运行进程！</li>
</ol>
<p>（LCTT 译注：如果将这个调用的函数看成一个单独的线程，gdb 实际上所做的事情就是一个简单的线程上下文切换）</p>
<p>我不知道 gdb 是如何完成这些所有事情的，但是今天晚上，我学到了这些所有事情中的其中几件。</p>
<h4><a href="#创建一个栈框"></a>创建一个栈框</h4>
<p>如果你想要运行一个 C 函数，那么你需要一个栈来存储变量。你肯定不想继续使用当前的栈。准确来说，在 gdb 调用函数之前（通过设置函数指针并跳转），它需要设置栈指针到某个地方。</p>
<p>这儿是 Twitter 上一些关于它如何工作的猜测：</p>
<blockquote>
<p>我认为它在当前栈的栈顶上构造了一个新的栈框来进行调用！</p>
</blockquote>
<p>以及</p>
<blockquote>
<p>你确定是这样吗？它应该是分配一个伪栈，然后临时将 sp （栈指针寄存器）的值改为那个栈的地址。你可以试一试，你可以在那儿设置一个断点，然后看一看栈指针寄存器的值，它是否和当前程序寄存器的值相近？</p>
</blockquote>
<p>我通过 gdb 做了一个试验：</p>
<pre><code class="hljs stylus">(gdb) <span class="hljs-selector-tag">p</span> <span class="hljs-variable">$rsp</span>
$<span class="hljs-number">7</span> = (void *) <span class="hljs-number">0</span>x7ffea3d0bca8
(gdb) break foo
Breakpoint <span class="hljs-number">1</span> at <span class="hljs-number">0</span>x40052a
(gdb) <span class="hljs-selector-tag">p</span> foo()
Breakpoint <span class="hljs-number">1</span>, <span class="hljs-number">0</span>x000000000040052a <span class="hljs-keyword">in</span> foo ()
(gdb) <span class="hljs-selector-tag">p</span> <span class="hljs-variable">$rsp</span>
$<span class="hljs-number">8</span> = (void *) <span class="hljs-number">0</span>x7ffea3d0bc00

</code></pre><p>这看起来符合“gdb 在当前栈的栈顶构造了一个新的栈框”这一理论。因为栈指针（<code>$rsp</code>）从 <code>0x7ffea3d0bca8</code> 变成了 <code>0x7ffea3d0bc00</code> —— 栈指针从高地址往低地址长。所以 <code>0x7ffea3d0bca8</code> 在 <code>0x7ffea3d0bc00</code> 的后面。真是有趣！</p>
<p>所以，看起来 gdb 只是在当前栈所在位置创建了一个新的栈框。这令我很惊讶！</p>
<h4><a href="#改变指令指针"></a>改变指令指针</h4>
<p>让我们来看一看 gdb 是如何改变指令指针的！</p>
<pre><code class="hljs stylus">(gdb) <span class="hljs-selector-tag">p</span> <span class="hljs-variable">$rip</span>
$<span class="hljs-number">1</span> = (void (*)()) <span class="hljs-number">0</span>x7fae7d29a2f0 &lt;__nanosleep_nocancel+<span class="hljs-number">7</span>&gt;
(gdb) <span class="hljs-selector-tag">b</span> foo
Breakpoint <span class="hljs-number">1</span> at <span class="hljs-number">0</span>x40052a
(gdb) <span class="hljs-selector-tag">p</span> foo()
Breakpoint <span class="hljs-number">1</span>, <span class="hljs-number">0</span>x000000000040052a <span class="hljs-keyword">in</span> foo ()
(gdb) <span class="hljs-selector-tag">p</span> <span class="hljs-variable">$rip</span>
$<span class="hljs-number">3</span> = (void (*)()) <span class="hljs-number">0</span>x40052a &lt;foo+<span class="hljs-number">4</span>&gt;


</code></pre><p>的确是！指令指针从 <code>0x7fae7d29a2f0</code> 变为了 <code>0x40052a</code>（<code>foo</code> 函数的地址）。</p>
<p>我盯着输出看了很久，但仍然不理解它是如何改变指令指针的，但这并不影响什么。</p>
<h4><a href="#如何设置断点"></a>如何设置断点</h4>
<p>上面我写到 <code>break foo</code> 。我跟踪 gdb 运行程序的过程，但是没有任何发现。</p>
<p>下面是 gdb 用来设置断点的一些系统调用。它们非常简单。它把一条指令用 <code>cc</code> 代替了（这告诉我们 <code>int3</code> 意味着 <code>send SIGTRAP</code> <a href="https://defuse.ca/online-x86-assembler.htm">https://defuse.ca/online-x86-assembler.html</a>），并且一旦程序被打断了，它就把指令恢复为原先的样子。</p>
<p>我在函数 <code>foo</code> 那儿设置了一个断点，地址为 <code>0x400528</code> 。</p>
<p><code>PTRACE_POKEDATA</code> 展示了 gdb 如何改变正在运行的程序。</p>
<pre><code class="hljs lsl"><span class="hljs-comment">// 改变 0x400528 处的指令</span>
<span class="hljs-number">25622</span> ptrace(PTRACE_PEEKTEXT, <span class="hljs-number">25618</span>, <span class="hljs-number">0x400528</span>, [<span class="hljs-number">0x5d00000003b8e589</span>]) = <span class="hljs-number">0</span>
<span class="hljs-number">25622</span> ptrace(PTRACE_POKEDATA, <span class="hljs-number">25618</span>, <span class="hljs-number">0x400528</span>, <span class="hljs-number">0x5d00000003cce589</span>) = <span class="hljs-number">0</span>
<span class="hljs-comment">// 开始运行程序</span>
<span class="hljs-number">25622</span> ptrace(PTRACE_CONT, <span class="hljs-number">25618</span>, <span class="hljs-number">0x1</span>, SIG_0) = <span class="hljs-number">0</span>
<span class="hljs-comment">// 当到达断点时获取一个信号</span>
<span class="hljs-number">25622</span> ptrace(PTRACE_GETSIGINFO, <span class="hljs-number">25618</span>, NULL, {si_signo=SIGTRAP, si_code=SI_KERNEL, si_value={int=<span class="hljs-number">-1447215360</span>, ptr=<span class="hljs-number">0x7ffda9bd3f00</span>"}}") = <span class="hljs-number">0</span>
<span class="hljs-comment">// 将 0x400528 处的指令更改为之前的样子</span>
<span class="hljs-number">25622</span> ptrace(PTRACE_PEEKTEXT, <span class="hljs-number">25618</span>, <span class="hljs-number">0x400528</span>, [<span class="hljs-number">0x5d00000003cce589</span>]) = <span class="hljs-number">0</span>
<span class="hljs-number">25622</span> ptrace(PTRACE_POKEDATA, <span class="hljs-number">25618</span>, <span class="hljs-number">0x400528</span>, <span class="hljs-number">0x5d00000003b8e589</span>) = <span class="hljs-number">0</span>

</code></pre><h4><a href="#在某处放置一条陷阱指令"></a>在某处放置一条陷阱指令</h4>
<p>当 gdb 运行一个函数的时候，它也会在某个地方放置一条陷阱指令。这是其中一条。它基本上是用 <code>cc</code> 来替换一条指令（<code>int3</code>）。</p>
<pre><code class="hljs basic"><span class="hljs-symbol">5908 </span> ptrace(PTRACE_PEEKTEXT, <span class="hljs-number">5810</span>, <span class="hljs-number">0</span>x7f6fa7c0b260, [<span class="hljs-number">0</span>x48f389fd89485355]) = <span class="hljs-number">0</span>
<span class="hljs-symbol">5908 </span> ptrace(PTRACE_PEEKTEXT, <span class="hljs-number">5810</span>, <span class="hljs-number">0</span>x7f6fa7c0b260, [<span class="hljs-number">0</span>x48f389fd89485355]) = <span class="hljs-number">0</span>
<span class="hljs-symbol">5908 </span>ptrace(PTRACE_POKEDATA, <span class="hljs-number">5810</span>, <span class="hljs-number">0</span>x7f6fa7c0b260, <span class="hljs-number">0</span>x48f389fd894853cc) = <span class="hljs-number">0</span>

</code></pre><p><code>0x7f6fa7c0b260</code> 是什么？我查看了进程的内存映射，发现它位于 <code>/lib/x86_64-linux-gnu/libc-2.23.so</code> 中的某个位置。这很奇怪，为什么 gdb 将陷阱指令放在 libc 中？</p>
<p>让我们看一看里面的函数是什么，它是 <code>__libc_siglongjmp</code> 。其他 gdb 放置陷阱指令的地方的函数是 <code>__longjmp</code> 、<code>___longjmp_chk</code> 、<code>dl_main</code> 和 <code>_dl_close_worker</code> 。</p>
<p>为什么？我不知道！也许出于某种原因，当函数 <code>foo()</code> 返回时，它调用 <code>longjmp</code> ，从而 gdb 能够进行返回控制。我不确定。</p>
<h3><a href="#gdb-如何调用函数是很复杂的"></a>gdb 如何调用函数是很复杂的！</h3>
<p>我将要在这儿停止了（现在已经凌晨 1 点），但是我知道的多一些了！</p>
<p>看起来“gdb 如何调用函数”这一问题的答案并不简单。我发现这很有趣并且努力找出其中一些答案，希望你也能够找到。</p>
<p>我依旧有很多未回答的问题，关于 gdb 是如何完成这些所有事的，但是可以了。我不需要真的知道关于 gdb 是如何工作的所有细节，但是我很开心，我有了一些进一步的理解。</p>
<hr>
<p>via: <a href="https://jvns.ca/blog/2018/01/04/how-does-gdb-call-functions/">https://jvns.ca/blog/2018/01/04/how-does-gdb-call-functions/</a></p>
<p>作者：<a href="https://jvns.ca/">Julia Evans</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
gdb 如何调用函数？

## 原文链接
[https://www.zcfy.cc/article/how-does-gdb-call-functions](https://www.zcfy.cc/article/how-does-gdb-call-functions)


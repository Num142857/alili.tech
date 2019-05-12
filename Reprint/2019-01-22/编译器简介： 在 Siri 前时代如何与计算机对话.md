---
title: '编译器简介： 在 Siri 前时代如何与计算机对话' 
date: 2019-01-22 2:30:07
hidden: true
slug: 3ze6xns8nkr
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#编译器简介-在-siri-前时代如何与计算机对话"></a>编译器简介： 在 Siri 前时代如何与计算机对话</h1>
<p>简单说来，一个编译器compiler不过是一个可以翻译其他程序的程序。传统的编译器可以把源代码翻译成你的计算机能够理解的可执行机器代码。（一些编译器将源代码翻译成别的程序语言，这样的编译器称为源到源翻译器或转化器transpilers。）<a href="http://llvm.org/">LLVM</a> 是一个广泛使用的编译器项目，包含许多模块化的编译工具。</p>
<p>传统的编译器设计包含三个部分：</p>
<p><a href="https://camo.githubusercontent.com/e9e8707ccfa75c722ca2b73c71f25414be67d2ea/68747470733a2f2f6e69636f6c656f7263686172642e636f6d2f696d672f626c6f672f636f6d70696c6572732f636f6d70696c6572312e6a7067"><img src="https://p0.ssl.qhimg.com/t01ff8f0c70040ba300.jpg" alt=""></a></p>
<ul>
<li>前端Frontend将源代码翻译为中间表示intermediate representation (IR)* 。<a href="http://clang.llvm.org/">clang</a> 是 LLVM 中用于 C 家族语言的前端工具。</li>
<li>优化器Optimizer分析 IR 然后将其转化为更高效的形式。<a href="http://llvm.org/docs/CommandGuide/opt.html">opt</a> 是 LLVM 的优化工具。</li>
<li>后端Backend通过将 IR 映射到目标硬件指令集从而生成机器代码。<a href="http://llvm.org/docs/CommandGuide/llc.html">llc</a> 是 LLVM 的后端工具。</li>
</ul>
<p>注：LLVM 的 IR 是一种和汇编类似的低级语言。然而，它抽离了特定硬件信息。</p>
<h3><a href="#hello-compiler"></a>Hello, Compiler</h3>
<p>下面是一个打印 “Hello, Compiler!” 到标准输出的简单 C 程序。C 语法是人类可读的，但是计算机却不能理解，不知道该程序要干什么。我将通过三个编译阶段使该程序变成机器可执行的程序。</p>
<pre><code class="hljs cpp"><span class="hljs-comment">// compile_me.c</span>
<span class="hljs-comment">// Wave to the compiler. The world can wait.</span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">"Hello, Compiler!\n"</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}

</code></pre><h4><a href="#前端"></a>前端</h4>
<p>正如我在上面所提到的，<code>clang</code> 是 LLVM 中用于 C 家族语言的前端工具。Clang 包含 C 预处理器C preprocessor、词法分析器lexer、语法解析器parser、语义分析器semantic analyzer和 IR 生成器IR generator。</p>
<p><strong>C 预处理器</strong>在将源程序翻译成 IR 前修改源程序。预处理器处理外部包含文件，比如上面的 <code>#include &lt;stdio.h&gt;</code>。 它将会把这一行替换为 <code>stdio.h</code> C 标准库文件的完整内容，其中包含 <code>printf</code> 函数的声明。</p>
<p>通过运行下面的命令来查看预处理步骤的输出：</p>
<pre><code class="hljs stylus">clang -E compile_me<span class="hljs-selector-class">.c</span> -o preprocessed<span class="hljs-selector-class">.i</span>

</code></pre><p><strong>词法分析器</strong>（或扫描器scanner或分词器tokenizer）将一串字符转化为一串单词。每一个单词或记号token，被归并到五种语法类别之一：标点符号、关键字、标识符、文字或注释。</p>
<p>compile_me.c 的分词过程：</p>
<p><a href="https://camo.githubusercontent.com/ea8c0cef3eeea3c9c058f87bb2949684dd7408df/68747470733a2f2f6e69636f6c656f7263686172642e636f6d2f696d672f626c6f672f636f6d70696c6572732f6c657865722e6a7067"><img src="https://p0.ssl.qhimg.com/t01c2fb0f4137f11e6b.jpg" alt=""></a></p>
<p><strong>语法分析器</strong>确定源程序中的单词流是否组成了合法的句子。在分析记号流的语法后，它会输出一个抽象语法树abstract syntax tree（AST）。Clang 的 AST 中的节点表示声明、语句和类型。</p>
<p>compile_me.c 的语法树：</p>
<p><a href="https://camo.githubusercontent.com/609046c6a698383910b23ceafae5bf2e71328c95/68747470733a2f2f6e69636f6c656f7263686172642e636f6d2f696d672f626c6f672f636f6d70696c6572732f747265652e6a7067"><img src="https://p0.ssl.qhimg.com/t015ff11b1628d4933b.jpg" alt=""></a></p>
<p><strong>语义分析器</strong>会遍历抽象语法树，从而确定代码语句是否有正确意义。这个阶段会检查类型错误。如果 <code>compile_me.c</code> 的 main 函数返回 <code>"zero"</code>而不是 <code>0</code>， 那么语义分析器将会抛出一个错误，因为 <code>"zero"</code> 不是 <code>int</code> 类型。</p>
<p><strong>IR 生成器</strong>将抽象语法树翻译为 IR。</p>
<p>对 compile_me.c 运行 clang 来生成 LLVM IR：</p>
<pre><code class="hljs stylus">clang -S -emit-llvm -o llvm_ir<span class="hljs-selector-class">.ll</span> compile_me<span class="hljs-selector-class">.c</span>

</code></pre><p>在 <code>llvm_ir.ll</code> 中的 main 函数：</p>
<pre><code class="hljs llvm"><span class="hljs-comment">; llvm_ir.ll
</span><span class="hljs-title">@.str</span> = <span class="hljs-keyword">private</span> <span class="hljs-keyword">unnamed_addr</span> <span class="hljs-keyword">constant</span> [<span class="hljs-number">18</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>] <span class="hljs-keyword">c</span><span class="hljs-string">"Hello, Compiler!\0A\00"</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">1</span>

<span class="hljs-keyword">define</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@main</span>() {
  <span class="hljs-symbol">%1</span> = <span class="hljs-keyword">alloca</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- memory allocated on the stack
</span>  <span class="hljs-keyword">store</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%1</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span>
  <span class="hljs-symbol">%2</span> = <span class="hljs-keyword">call</span> <span class="hljs-keyword">i32</span> (<span class="hljs-keyword">i8</span>*, ...) <span class="hljs-title">@printf</span>(<span class="hljs-keyword">i8</span>* <span class="hljs-keyword">getelementptr</span> <span class="hljs-keyword">inbounds</span> ([<span class="hljs-number">18</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>], [<span class="hljs-number">18</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>]* <span class="hljs-title">@.str</span>, <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>, <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>))
  <span class="hljs-keyword">ret</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@printf</span>(<span class="hljs-keyword">i8</span>*, ...)

</code></pre><h4><a href="#优化程序"></a>优化程序</h4>
<p>优化程序的工作是基于其对程序的运行时行为的理解来提高代码效率。优化程序将 IR 作为输入，然后生成改进后的 IR 作为输出。LLVM 的优化工具 <code>opt</code> 将会通过标记 <code>-O2</code>（大写字母 <code>o</code>，数字 2）来优化处理器速度，通过标记 <code>Os</code>（大写字母 <code>o</code>，小写字母 <code>s</code>）来减少指令数目。</p>
<p>看一看上面的前端工具生成的 LLVM IR 代码和运行下面的命令生成的结果之间的区别：</p>
<pre><code class="hljs stylus">opt -O2 -S llvm_ir<span class="hljs-selector-class">.ll</span> -o optimized<span class="hljs-selector-class">.ll</span>

</code></pre><p>在 <code>optimized.ll</code> 中的 main 函数：</p>
<pre><code class="hljs llvm">optimized.ll

<span class="hljs-title">@str</span> = <span class="hljs-keyword">private</span> <span class="hljs-keyword">unnamed_addr</span> <span class="hljs-keyword">constant</span> [<span class="hljs-number">17</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>] <span class="hljs-keyword">c</span><span class="hljs-string">"Hello, Compiler!\00"</span>

<span class="hljs-keyword">define</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@main</span>() {
  <span class="hljs-symbol">%puts</span> = <span class="hljs-keyword">tail</span> <span class="hljs-keyword">call</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@puts</span>(<span class="hljs-keyword">i8</span>* <span class="hljs-keyword">getelementptr</span> <span class="hljs-keyword">inbounds</span> ([<span class="hljs-number">17</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>], [<span class="hljs-number">17</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>]* <span class="hljs-title">@str</span>, <span class="hljs-keyword">i64</span> <span class="hljs-number">0</span>, <span class="hljs-keyword">i64</span> <span class="hljs-number">0</span>))
  <span class="hljs-keyword">ret</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@puts</span>(<span class="hljs-keyword">i8</span>* <span class="hljs-keyword">nocapture</span> <span class="hljs-keyword">readonly</span>)

</code></pre><p>优化后的版本中， main 函数没有在栈中分配内存，因为它不使用任何内存。优化后的代码中调用 <code>puts</code> 函数而不是 <code>printf</code> 函数，因为程序中并没有使用 <code>printf</code> 函数的格式化功能。</p>
<p>当然，优化程序不仅仅知道何时可以把 <code>printf</code> 函数用 <code>puts</code> 函数代替。优化程序也能展开循环并内联简单计算的结果。考虑下面的程序，它将两个整数相加并打印出结果。</p>
<pre><code class="hljs cpp"><span class="hljs-comment">// add.c</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">int</span> a = <span class="hljs-number">5</span>, b = <span class="hljs-number">10</span>, c = a + b;
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%i + %i = %i\n"</span>, a, b, c);
}

</code></pre><p>下面是未优化的 LLVM IR：</p>
<pre><code class="hljs llvm"><span class="hljs-title">@.str</span> = <span class="hljs-keyword">private</span> <span class="hljs-keyword">unnamed_addr</span> <span class="hljs-keyword">constant</span> [<span class="hljs-number">14</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>] <span class="hljs-keyword">c</span><span class="hljs-string">"%i + %i = %i\0A\00"</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">1</span>

<span class="hljs-keyword">define</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@main</span>() {
  <span class="hljs-symbol">%1</span> = <span class="hljs-keyword">alloca</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- allocate stack space for var a
</span>  <span class="hljs-symbol">%2</span> = <span class="hljs-keyword">alloca</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- allocate stack space for var b
</span>  <span class="hljs-symbol">%3</span> = <span class="hljs-keyword">alloca</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- allocate stack space for var c
</span>  <span class="hljs-keyword">store</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">5</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%1</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span>  <span class="hljs-comment">; &lt;- store 5 at memory location %1
</span>  <span class="hljs-keyword">store</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">10</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%2</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- store 10 at memory location %2
</span>  <span class="hljs-symbol">%4</span> = <span class="hljs-keyword">load</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%1</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- load the value at memory address %1 into register %4
</span>  <span class="hljs-symbol">%5</span> = <span class="hljs-keyword">load</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%2</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- load the value at memory address %2 into register %5
</span>  <span class="hljs-symbol">%6</span> = <span class="hljs-keyword">add</span> <span class="hljs-keyword">nsw</span> <span class="hljs-keyword">i32</span> <span class="hljs-symbol">%4</span>, <span class="hljs-symbol">%5</span> <span class="hljs-comment">; &lt;- add the values in registers %4 and %5\. put the result in register %6
</span>  <span class="hljs-keyword">store</span> <span class="hljs-keyword">i32</span> <span class="hljs-symbol">%6</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%3</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- put the value of register %6 into memory address %3
</span>  <span class="hljs-symbol">%7</span> = <span class="hljs-keyword">load</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%1</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- load the value at memory address %1 into register %7
</span>  <span class="hljs-symbol">%8</span> = <span class="hljs-keyword">load</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%2</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- load the value at memory address %2 into register %8
</span>  <span class="hljs-symbol">%9</span> = <span class="hljs-keyword">load</span> <span class="hljs-keyword">i32</span>, <span class="hljs-keyword">i32</span>* <span class="hljs-symbol">%3</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">4</span> <span class="hljs-comment">; &lt;- load the value at memory address %3 into register %9
</span>  <span class="hljs-symbol">%10</span> = <span class="hljs-keyword">call</span> <span class="hljs-keyword">i32</span> (<span class="hljs-keyword">i8</span>*, ...) <span class="hljs-title">@printf</span>(<span class="hljs-keyword">i8</span>* <span class="hljs-keyword">getelementptr</span> <span class="hljs-keyword">inbounds</span> ([<span class="hljs-number">14</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>], [<span class="hljs-number">14</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>]* <span class="hljs-title">@.str</span>, <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>, <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>), <span class="hljs-keyword">i32</span> <span class="hljs-symbol">%7</span>, <span class="hljs-keyword">i32</span> <span class="hljs-symbol">%8</span>, <span class="hljs-keyword">i32</span> <span class="hljs-symbol">%9</span>)
  <span class="hljs-keyword">ret</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@printf</span>(<span class="hljs-keyword">i8</span>*, ...)

</code></pre><p>下面是优化后的 LLVM IR：</p>
<pre><code class="hljs llvm"><span class="hljs-title">@.str</span> = <span class="hljs-keyword">private</span> <span class="hljs-keyword">unnamed_addr</span> <span class="hljs-keyword">constant</span> [<span class="hljs-number">14</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>] <span class="hljs-keyword">c</span><span class="hljs-string">"%i + %i = %i\0A\00"</span>, <span class="hljs-keyword">align</span> <span class="hljs-number">1</span>

<span class="hljs-keyword">define</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@main</span>() {
  <span class="hljs-symbol">%1</span> = <span class="hljs-keyword">tail</span> <span class="hljs-keyword">call</span> <span class="hljs-keyword">i32</span> (<span class="hljs-keyword">i8</span>*, ...) <span class="hljs-title">@printf</span>(<span class="hljs-keyword">i8</span>* <span class="hljs-keyword">getelementptr</span> <span class="hljs-keyword">inbounds</span> ([<span class="hljs-number">14</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>], [<span class="hljs-number">14</span> <span class="hljs-keyword">x</span> <span class="hljs-keyword">i8</span>]* <span class="hljs-title">@.str</span>, <span class="hljs-keyword">i64</span> <span class="hljs-number">0</span>, <span class="hljs-keyword">i64</span> <span class="hljs-number">0</span>), <span class="hljs-keyword">i32</span> <span class="hljs-number">5</span>, <span class="hljs-keyword">i32</span> <span class="hljs-number">10</span>, <span class="hljs-keyword">i32</span> <span class="hljs-number">15</span>)
  <span class="hljs-keyword">ret</span> <span class="hljs-keyword">i32</span> <span class="hljs-number">0</span>
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">i32</span> <span class="hljs-title">@printf</span>(<span class="hljs-keyword">i8</span>* <span class="hljs-keyword">nocapture</span> <span class="hljs-keyword">readonly</span>, ...)

</code></pre><p>优化后的 main 函数本质上是未优化版本的第 17 行和 18 行，伴有变量值内联。<code>opt</code> 计算加法，因为所有的变量都是常数。很酷吧，对不对？</p>
<h4><a href="#后端"></a>后端</h4>
<p>LLVM 的后端工具是 <code>llc</code>。它分三个阶段将 LLVM IR 作为输入生成机器代码。</p>
<ul>
<li><strong>指令选择</strong>是将 IR 指令映射到目标机器的指令集。这个步骤使用虚拟寄存器的无限名字空间。</li>
<li><strong>寄存器分配</strong>是将虚拟寄存器映射到目标体系结构的实际寄存器。我的 CPU 是 x86 结构，它只有 16 个寄存器。然而，编译器将会尽可能少的使用寄存器。</li>
<li><strong>指令安排</strong>是重排操作，从而反映出目标机器的性能约束。</li>
</ul>
<p>运行下面这个命令将会产生一些机器代码：</p>
<pre><code class="hljs stylus">llc -o compiled-assembly<span class="hljs-selector-class">.s</span> optimized<span class="hljs-selector-class">.ll</span>

</code></pre><pre><code class="hljs cos">_main:
    pushq    <span class="hljs-built_in">%rbp</span>
    movq    <span class="hljs-built_in">%rsp</span>, <span class="hljs-built_in">%rbp</span>
    leaq    L_str(<span class="hljs-built_in">%rip</span>), <span class="hljs-built_in">%rdi</span>
    callq    _puts
    xorl    <span class="hljs-built_in">%eax</span>, <span class="hljs-built_in">%eax</span>
    popq    <span class="hljs-built_in">%rbp</span>
    retq
L_str:
    .asciz    <span class="hljs-string">"Hello, Compiler!"</span>

</code></pre><p>这个程序是 x86 汇编语言，它是计算机所说的语言，并具有人类可读语法。某些人最后也许能理解我。</p>
<hr>
<p>相关资源：</p>
<ol>
<li><a href="https://www.amazon.com/Engineering-Compiler-Second-Keith-Cooper/dp/012088478X">设计一个编译器</a></li>
<li><a href="https://www.amazon.com/Getting-Started-LLVM-Core-Libraries/dp/1782166920">开始探索 LLVM 核心库</a></li>
</ol>
<hr>
<p>via: <a href="https://nicoleorchard.com/blog/compilers">https://nicoleorchard.com/blog/compilers</a></p>
<p>作者：<a href="https://nicoleorchard.com/">Nicole Orchard</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编译器简介： 在 Siri 前时代如何与计算机对话

## 原文链接
[https://www.zcfy.cc/article/an-intro-to-compilers](https://www.zcfy.cc/article/an-intro-to-compilers)


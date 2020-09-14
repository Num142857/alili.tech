---
title: 'WebAssembly 那些事儿' 
date: 2018-12-12 2:30:10
hidden: true
slug: 0ouajri28ndg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">WebAssembly 那些事儿</h1>
<h2 id="articleHeader1">什么是 WebAssembly？</h2>
<blockquote>WebAssembly 是除 JavaScript 以外，另一种可以在网页中运行的编程语言，并且相比之下在某些功能和性能问题上更具优势，过去我们想在浏览器中运行代码来对网页中各种元素进行控制，只有 JavaScript 这一种选择，而如今我们可以将其它语言（C/C++ etc.）编译成 wasm 格式的代码在浏览器中运行。</blockquote>
<p>WebAssembly 的目标是对高级程序中间表示的适当低级抽象，即 wasm 代码旨在由编译器生成而不是由人来写。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480476?w=500&amp;h=306" src="https://static.alili.tech/img/remote/1460000013480476?w=500&amp;h=306" alt="image_1c5a3tb6r1os61dfc1sfvbgbkts9.png-48.2kB" title="image_1c5a3tb6r1os61dfc1sfvbgbkts9.png-48.2kB" style="cursor: pointer; display: inline;"></span></p>
<p>每一种目标汇编语言（x86、ARM etc.）都依赖于特定的机器结构，当我们想要把代码放到用户的机器上执行的时候，并不知道目标机器结构是什么样的，而 WebAssembly 与其他的汇编语言不一样，它不依赖于具体的物理机器，可以抽象地理解成它是 <em>概念机器的机器语言，而不是实际的物理机器的机器语言</em>，正因为如此 WebAssembly 指令有时也被称为虚拟指令，它比 JavaScript 代码更直接地映射到机器码，同时它也代表了“如何能在通用的硬件上更有效地执行代码”的一种理念。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480477" src="https://static.alili.tech/img/remote/1460000013480477" alt="image_1c5a42e5o14f91ddl2opue1rkrm.png-44.5kB" title="image_1c5a42e5o14f91ddl2opue1rkrm.png-44.5kB" style="cursor: pointer;"></span></p>
<p>目前对于 WebAssembly 支持情况最好的编译器工具链是 <em>LLVM</em>，还有一个易用的工具叫做 Emscripten，它通过自己的后端先把代码转换成自己的中间代码（asm.js），然后再转化成 WebAssembly，实际上它是基于 LLVM 的一系列编译工具的集合。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480478?w=500&amp;h=411" src="https://static.alili.tech/img/remote/1460000013480478?w=500&amp;h=411" alt="image_1c5a5656en211lqd1s74mt119rj1g.png-50.5kB" title="image_1c5a5656en211lqd1s74mt119rj1g.png-50.5kB" style="cursor: pointer; display: inline;"></span></p>
<blockquote>Tip：很多 WebAssembly 开发者用 C 语言或者 Rust 开发，再编译成 WebAssembly，其实还有其他的方式来开发 WebAssembly 模块：<a href="https://github.com/rsms/wasm-util" rel="nofollow noreferrer" target="_blank">使用 TypeScript 开发 WebAssembly 模块</a>，或者<a href="https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format" rel="nofollow noreferrer" target="_blank">直接书写 WebAssembly 文本</a> etc.。</blockquote>
<p>WebAssembly 代码存储在 <em>.wasm</em> 文件内，这类文件是要浏览器直接执行的，因为 .wasm 文件内是二进制文件难以阅读，为方便开发者查看官方给出对 .wasm 文件的阅读方法：<br>把 .wasm 文件通过工具转为 .wast 的文本格式，开发者可以在一定程度上理解这个 .wast 文件（通过 S- 表达式写成，类似于 lisp 语言的代码书写风格）。</p>
<blockquote>Tip：.wast 文件和 .wasm 文件之间的相互转化可以通过工具 <a href="https://github.com/WebAssembly/wabt" rel="nofollow noreferrer" target="_blank">wabt</a> 实现。</blockquote>
<h2 id="articleHeader2">为什么 WebAssembly 更快？</h2>
<h3 id="articleHeader3">一些关于性能的历史</h3>
<p>- JavaScript 于 1995 年问世，它的设计初衷并不是为了执行起来快，在前 10 个年头它的执行速度也确实不快。</p>
<p>- 紧接着，浏览器市场竞争开始激烈起来。</p>
<p>- 广为流传的“性能大战”在 2008 年打响，许多浏览器引入 JIT 编译器，JavaScript 代码的运行速度渐渐变快（10倍！），这使得 JavaScript 的性能达到一个转折点。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480479?w=500&amp;h=409" src="https://static.alili.tech/img/remote/1460000013480479?w=500&amp;h=409" alt="image_1c5a6csratpbb311e3m1mano101t.png-21kB" title="image_1c5a6csratpbb311e3m1mano101t.png-21kB" style="cursor: pointer;"></span></p>
<hr>
<h4>知识迁移：Javascript JIT 工作原理</h4>
<p>在代码的世界中，通常有两种方式来翻译机器语言：解释器和编译器。</p>
<ul>
<li>如果是通过解释器，翻译是一行行地边解释边执行</li>
<li>编译器是把源代码整个编译成目标代码，执行时不再需要编译器，直接在支持目标代码的平台上运行</li>
</ul>
<p>解释器启动和执行的更快，我们不需要等待整个编译过程完成就可以运行代码，从第一行开始翻译就可以依次继续执行。正是因为这个原因，解释器看起来更加适合 JavaScript，对于一个 Web 开发人员来讲，能够快速执行代码并看到结果是非常重要的。可是当我们运行同样的代码一次以上的时候，解释器的弊处就显现出来：比如执行一个循环，那解释器就不得不一次又一次的进行翻译，这是一种效率低下的表现。</p>
<p>编译器的问题则恰好相反：它需要花一些时间对整个源代码进行编译，然后生成目标文件才能在机器上执行。对于有循环的代码执行的很快，因为它不需要重复的去翻译每一次循环。</p>
<p>另外一个不同是，编译器可以用更多的时间对代码进行优化，以使的代码执行的更快；而解释器是在 runtime 时进行这一步骤的，这就决定它不可能在翻译的时候用很多时间进行优化。</p>
<h5>Just-in-time 编译器：综合两者的优点</h5>
<p>为了解决解释器的低效问题，后来的浏览器把编译器也引入进来，形成混合模式。不同的浏览器实现这一功能的方式不同，不过其基本思想是一致的：在 JavaScript 引擎中增加一个监视器（也叫分析器），监视器监控着代码的运行情况，记录代码一共运行多少次、如何运行等信息。</p>
<p>起初，监视器监视着所有通过解释器的代码，如果同一行代码运行多次，这个代码段就被标记成 “warm”，如果运行很多次则被标记成 “hot”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480480" src="https://static.alili.tech/img/remote/1460000013480480" alt="image_1c5ah8t9r27e42isdgh4b1580b9.png-120.6kB" title="image_1c5ah8t9r27e42isdgh4b1580b9.png-120.6kB" style="cursor: pointer; display: inline;"></span></p>
<h6>基线编译器</h6>
<p>如果一段代码变成 “warm”，那么 JIT 就把它送到编译器去编译，并且把编译结果存储起来。</p>
<p>代码段的每一行都会被编译成一个“桩”（stub），同时给这个桩分配一个以“行号 + 变量类型”的索引，如果监视器监视到执行同样的代码和同样的变量类型，那么就直接把这个已编译的版本 push 出来给浏览器。通过这样的做法可以加快执行速度，但是正如前我所说的，编译器还可以找到更有效地执行代码的方法（优化）。</p>
<p>基线编译器可以做一部分这样的优化，不过基线编译器优化的时间不能太久，因为会使得程序的执行在这里 hold 住，不过如果代码确实非常 “hot”（也就是说几乎所有的执行时间都耗费在这里），那么花点时间做优化也是值得的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480481?w=500&amp;h=368" src="https://static.alili.tech/img/remote/1460000013480481?w=500&amp;h=368" alt="image_1c5ahdnvidih1g5u6o318ig1r1rbm.png-129.7kB" title="image_1c5ahdnvidih1g5u6o318ig1r1rbm.png-129.7kB" style="cursor: pointer;"></span></p>
<h6>优化编译器</h6>
<p>如果一个代码段变得 “very hot”，监视器会把它发送到优化编译器中，生成一个更快速和高效的代码版本出来，并且存储之。为了生成一个更快速的代码版本，优化编译器必须做一些假设：例如它会假设由同一个构造函数生成的实例都有相同的形状，就是说所有的实例都有相同的属性名，并且都以同样的顺序初始化，那么就可以针对这一模式进行优化。</p>
<p>整个优化器起作用的链条是这样的，监视器从他所监视代码的执行情况做出自己的判断，接下来把它所整理的信息传递给优化器进行优化，如果某个循环中先前每次迭代的对象都有相同的形状，那么就可以认为它以后迭代的对象的形状都是相同的，可是对于 JavaScript 从来就没有保证这么一说，前 99 个对象保持着形状，可能第 100 个就减少某个属性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480482?w=500&amp;h=365" src="https://static.alili.tech/img/remote/1460000013480482?w=500&amp;h=365" alt="image_1c5ahgjjt1nugr01cjf8r91untc3.png-161.7kB" title="image_1c5ahgjjt1nugr01cjf8r91untc3.png-161.7kB" style="cursor: pointer;"></span></p>
<p>正是由于这样的情况，编译代码需要在运行之前检查其假设是不是合理的，如果合理那么优化的编译代码会运行，如果不合理那么 JIT 会认为这是一个错误的假设，并且把优化代码丢掉，这时执行过程将会回到解释器或者基线编译器，这一过程叫做<em>去优化</em>。</p>
<p>通常优化编译器会使得代码变得更快，但是一些情况也会引起一些意想不到的性能问题。如果代码一直陷入优化去优化的怪圈，那么程序执行将会变慢，还不如基线编译器快。大多数的浏览器限制当优化去优化循环发生的时候会尝试跳出这种循环，比如如果 JIT 反复做 10 次以上的优化并且又丢弃的操作，那么就不继续尝试去优化这段代码。</p>
<h6>一个优化的例子：类型特化（Type specialization）</h6>
<p>JavaScript 所使用的动态类型体系在运行时需要进行额外的解释工作，例如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function arraySum(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arraySum</span><span class="hljs-params">(arr)</span> {</span>
  var sum = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; arr.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++) {
    sum += arr[i];
  }
}</code></pre>
<p>+= 循环中这一步看起来很简单，只需要进行一步计算，但是恰恰因为是用动态类型，所需要的步骤要比我们所想象的更复杂一些：我们假设 arr 是一个有 100 个整数的数组，当代码被标记为 “warm” 时，基线编译器就为函数中的每一个操作生成一个桩，sum += arr[i]会有一个相应的桩，并且把里面的 += 操作当成整数加法，但是 sum 和 arr[i] 两个数并不保证都是整数，因为在 JavaScript 中类型都是动态类型，在接下来的循环当中 arr[i] 很有可能变成了string 类型，整数加法和字符串连接是完全不同的两个操作，会被编译成不同的机器码。</p>
<p>JIT 处理这个问题的方法是编译多基线桩：如果一个代码段是单一形态的（即总是以同一类型被调用），则只生成一个桩：如果是多形态的（即调用的过程中，类型不断变化），则会为操作所调用的每一个类型组合生成一个桩。这就是说 JIT 在选择一个桩之前会进行多分枝选择（类似于决策树），问自己很多问题才会确定最终选择哪个。</p>
<p>正是因为在基线编译器中每行代码都有自己的桩，所以 JIT 在每行代码被执行的时候都会检查数据类型，在循环的每次迭代 JIT 也都会重复一次分枝选择。</p>
<p>如果代码在执行的过程中 JIT 不是每次都重复检查的话，那么执行的还会更快一些，而这就是优化编译器所需要做的工作之一。在优化编译器中，整个函数被统一编译，这样的话就可以在循环开始执行之前进行类型检查。</p>
<blockquote>一些浏览器的 JIT 优化更加复杂：在 Firefox 中给一些数组设定特定的类型，比如数组里面只包含整型，如果 arr 是这种数组类型，那么 JIT 就不需要检查 arr[i] 是不是整型，这也意味着 JIT 可以在进入循环之前进行所有的类型检查。</blockquote>
<hr>
<p>- 随着性能的提升 JavaScript 可以应用到更多领域（Node.js etc.）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480483?w=500&amp;h=412" src="https://static.alili.tech/img/remote/1460000013480483?w=500&amp;h=412" alt="image_1c5a6fun91dr0n4p1khg1k461fel2a.png-29.5kB" title="image_1c5a6fun91dr0n4p1khg1k461fel2a.png-29.5kB" style="cursor: pointer;"></span></p>
<p>- 通过 WebAssembly 我们很有可能正处于第二个拐点！</p>
<h3 id="articleHeader4">当前的 JavaScript 性能如何？</h3>
<p>下图片介绍 JS 引擎性能使用的大概分布情况，各个部分所花的时间取决于页面所用的 JavaScript 代码，其比例并不代表真实情况下的确切比例情况，并且这些任务并不是离散执行或者按固定顺序依次执行的，而是交叉执行：比如某些代码在进行解析时，其他一些代码正在运行而另一些正在编译。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480484?w=500&amp;h=129" src="https://static.alili.tech/img/remote/1460000013480484?w=500&amp;h=129" alt="image_1c5a7f6521jqq1ikv2eb1rno1hte2n.png-15.4kB" title="image_1c5a7f6521jqq1ikv2eb1rno1hte2n.png-15.4kB" style="cursor: pointer;"></span></p>
<ul>
<li>Parsing：表示把源代码变成解释器可以运行的代码所花的时间；</li>
<li>Compiling + optimizing：表示基线编译器和优化编译器所花的时间（某些优化编译器的工作并不在主线程运行）</li>
<li>Re-optimizing：当 JIT 发现优化假设错误，丢弃优化代码所花的时间（包括重优化的时间、抛弃并返回到基线编译器的时间）</li>
<li>Execution：执行代码的时间</li>
<li>Garbage collection：垃圾回收、清理内存的时间</li>
</ul>
<p>早期的 JavaScript 执行类似于下图，各个过程顺序进行：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480485?w=500&amp;h=147" src="https://static.alili.tech/img/remote/1460000013480485?w=500&amp;h=147" alt="image_1c5a8gpur1t1l1fvmiah1mst19gf34.png-21.3kB" title="image_1c5a8gpur1t1l1fvmiah1mst19gf34.png-21.3kB" style="cursor: pointer;"></span></p>
<p>各个浏览器处理下图中不同的过程有着细微的差别，我们使用 SpiderMonkey 作为模型来讲解不同的阶段：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480486?w=500&amp;h=214" src="https://static.alili.tech/img/remote/1460000013480486?w=500&amp;h=214" alt="image_1c5a90233d7i1rnc11j51pce1oja3h.png-15kB" title="image_1c5a90233d7i1rnc11j51pce1oja3h.png-15kB" style="cursor: pointer; display: inline;"></span></p>
<h4>文件获取</h4>
<p>这一步并没有显示在图表中，但是看似简单的从服务器获取文件得这个步骤，却会花费很长时间，WebAssembly 比 JavaScript 的压缩率更高，即在服务器和客户端之间传输文件更快，尤其在网络不好的情况下。</p>
<h4>解析</h4>
<p>当文件到达浏览器时 JavaScript 源代码就被解析成抽象语法树，浏览器采用懒加载的方式进行，只解析真正需要的部分，而对于浏览器暂时不需要的函数只保留它的桩。解析过后 AST（抽象语法树）就变成了中间代码（字节码：一种中间代码，通过虚拟机转换为机器语言）提供给 JS 引擎编译，而 WebAssembly 则不需要这种转换，因为它本身就是中间代码，要做的只是解码并且检查确认代码没有错误即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480487?w=500&amp;h=169" src="https://static.alili.tech/img/remote/1460000013480487?w=500&amp;h=169" alt="image_1c5a9f7djtnk1lgk1mtu1o7ns4m7e.png-13kB" title="image_1c5a9f7djtnk1lgk1mtu1o7ns4m7e.png-13kB" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h5>知识迁移：抽象语法树</h5>
<blockquote>抽象语法树（Abstract Syntax Tree）也称为 AST 语法树，指的是源代码语法所对应的树状结构。</blockquote>
<p>程序代码本身可以被映射成为一棵语法树，而通过操纵语法树我们能够精准的获得程序代码中的某个节点。Espsrima 提供一个在线解析的工具，我们可以借助于这个<a href="http://esprima.org/demo/parse.html" rel="nofollow noreferrer" target="_blank">工具</a>将 JavaScript 代码解析为一个 JSON 文件表示的树状结构，举例如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Life, Universe, and Everything
var answer = 6 * 7;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// Life, Universe, and Everything</span>
var answer = <span class="hljs-number">6</span> * <span class="hljs-number">7</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;type&quot;: &quot;Program&quot;,
    &quot;body&quot;: [
        {
            &quot;type&quot;: &quot;VariableDeclaration&quot;,
            &quot;declarations&quot;: [
                {
                    &quot;type&quot;: &quot;VariableDeclarator&quot;,
                    &quot;id&quot;: {
                        &quot;type&quot;: &quot;Identifier&quot;,
                        &quot;name&quot;: &quot;answer&quot;
                    },
                    &quot;init&quot;: {
                        &quot;type&quot;: &quot;BinaryExpression&quot;,
                        &quot;operator&quot;: &quot;*&quot;,
                        &quot;left&quot;: {
                            &quot;type&quot;: &quot;Literal&quot;,
                            &quot;value&quot;: 6,
                            &quot;raw&quot;: &quot;6&quot;
                        },
                        &quot;right&quot;: {
                            &quot;type&quot;: &quot;Literal&quot;,
                            &quot;value&quot;: 7,
                            &quot;raw&quot;: &quot;7&quot;
                        }
                    }
                }
            ],
            &quot;kind&quot;: &quot;var&quot;
        }
    ],
    &quot;sourceType&quot;: &quot;script&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"Program"</span>,
    <span class="hljs-attr">"body"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"VariableDeclaration"</span>,
            <span class="hljs-attr">"declarations"</span>: [
                {
                    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"VariableDeclarator"</span>,
                    <span class="hljs-attr">"id"</span>: {
                        <span class="hljs-attr">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                        <span class="hljs-attr">"name"</span>: <span class="hljs-string">"answer"</span>
                    },
                    <span class="hljs-attr">"init"</span>: {
                        <span class="hljs-attr">"type"</span>: <span class="hljs-string">"BinaryExpression"</span>,
                        <span class="hljs-attr">"operator"</span>: <span class="hljs-string">"*"</span>,
                        <span class="hljs-attr">"left"</span>: {
                            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"Literal"</span>,
                            <span class="hljs-attr">"value"</span>: <span class="hljs-number">6</span>,
                            <span class="hljs-attr">"raw"</span>: <span class="hljs-string">"6"</span>
                        },
                        <span class="hljs-attr">"right"</span>: {
                            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"Literal"</span>,
                            <span class="hljs-attr">"value"</span>: <span class="hljs-number">7</span>,
                            <span class="hljs-attr">"raw"</span>: <span class="hljs-string">"7"</span>
                        }
                    }
                }
            ],
            <span class="hljs-attr">"kind"</span>: <span class="hljs-string">"var"</span>
        }
    ],
    <span class="hljs-attr">"sourceType"</span>: <span class="hljs-string">"script"</span>
}</code></pre>
<p>抽象语法树的作用非常的多，比如编译器、IDE、压缩优化代码 etc.，在 JavaScript 中虽然我们并不会常常与 AST 直接打交道，但却也会经常涉及到它的使用：例如使用 UglifyJS 来压缩代码时，这背后的原理就是在对 JavaScript 的抽象语法树进行操作。</p>
<hr>
<h4>编译和优化</h4>
<p>JavaScript 是在代码的执行阶段编译的，因为它是弱类型语言，当变量类型发生变化时，同样的代码会被编译成不同版本，不同浏览器处理 WebAssembly 的编译过程也不同，有些浏览器只对 WebAssembly 做基线编译，而另一些浏览器用 JIT 来编译，不论哪种方式，WebAssembly 都更贴近机器码所以它更快：</p>
<ol>
<li>在编译优化代码之前不需要提前运行代码以知道变量都是什么类型</li>
<li>编译器不需要对同样的代码做不同版本的编译</li>
<li>很多优化在 LLVM 阶段就已经完成</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480488?w=500&amp;h=175" src="https://static.alili.tech/img/remote/1460000013480488?w=500&amp;h=175" alt="image_1c5a9kpq41tdj1vmr1rgvluss3o7r.png-12.3kB" title="image_1c5a9kpq41tdj1vmr1rgvluss3o7r.png-12.3kB" style="cursor: pointer; display: inline;"></span></p>
<h4>重优化</h4>
<p>有些情况下 JIT 会反复地进行抛弃优化代重优化过程，当 JIT 在优化假设阶段做的假设在执行阶段发现是不正确的时候，就会发生这种情况：比如当循环中发现本次循环所使用的变量类型和上次循环的类型不一样，或者原型链中插入了新的函数，都会使 JIT 抛弃已优化的代码。</p>
<ol>
<li>需要花时间丢掉已优化的代码并且回到基线版本</li>
<li>如果函数依旧频繁被调用，JIT 可能会再次把它发送到优化编译器又做一次优化编译</li>
</ol>
<p>而在 WebAssembly 中类型都是确定的，所以 JIT 不需要根据变量的类型做优化假设，也就是说 WebAssembly 没有重优化阶段。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480489?w=500&amp;h=201" src="https://static.alili.tech/img/remote/1460000013480489?w=500&amp;h=201" alt="image_1c5a9rtcdnavqgk9i8g0v4eq98.png-13.4kB" title="image_1c5a9rtcdnavqgk9i8g0v4eq98.png-13.4kB" style="cursor: pointer; display: inline;"></span></p>
<h4>执行</h4>
<p>开发人员自己也可以写出执行效率很高的 JavaScript 代码，这需要了解 JIT 的优化机制，例如要知道什么样的代码编译器会对其进行特殊处理，然而大多数的开发者是不知道 JIT 内部的实现机制的，即使知道 JIT 的内部机制也很难写出符合 JIT 标准的代码，因为人们通常为了代码可读性更好而使用的编码模式恰恰不合适编译器对代码的优化；加之 JIT 会针对不同的浏览器做不同的优化，所以对于一个浏览器优化的比较好，很可能在另外一个浏览器上执行效率就比较差。</p>
<p>正是因为这样执行 WebAssembly 通常会比较快，很多 JIT 为 JavaScript 所做的优化在 WebAssembly 并不需要；另外 WebAssembly 就是为编译器而设计的，开发人员不直接对其进行编程，这样就使得 WebAssembly 专注于提供更加理想的指令（执行效率更高的指令）给机器即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480490?w=500&amp;h=171" src="https://static.alili.tech/img/remote/1460000013480490?w=500&amp;h=171" alt="image_1c5aa1mdj1g561dpe1h9h16f11mnd9l.png-12.1kB" title="image_1c5aa1mdj1g561dpe1h9h16f11mnd9l.png-12.1kB" style="cursor: pointer;"></span></p>
<h4>垃圾回收</h4>
<p>JavaScript 中开发者不需要手动清理内存中不用的变量，JS 引擎会自动地做这件事情即垃圾回收的过程。可是当我们想要实现性能可控，垃圾回收可能就是一个大问题：垃圾回收器会自动开始，这是不受控制的，所以很有可能它会在一个不合适的时机启动，目前的大多数浏览器已经能给垃圾回收安排一个合理的启动时间，不过这还是会增加代码执行的开销。</p>
<p>目前为止 WebAssembly 不支持垃圾回收，内存操作都是手动控制的，这对于开发者来讲确实会增加开发成本，不过也使得代码的执行效率更高。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480491?w=500&amp;h=204" src="https://static.alili.tech/img/remote/1460000013480491?w=500&amp;h=204" alt="image_1c5aa1trojd91q6i1kg6q8fu1pa2.png-14.5kB" title="image_1c5aa1trojd91q6i1kg6q8fu1pa2.png-14.5kB" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">WebAssembly 的现在与未来</h2>
<h3 id="articleHeader6">JavaScript 和 WebAssembly 之间调用的中间函数</h3>
<p>目前在 Javascript 中调用 WebAssembly 的速度比本应达到的速度要慢，这是因为中间需要做一次“蹦床运动”：JIT 没有办法直接处理 WebAssembly，所以 JIT 要先把 WebAssembly 函数发送到懂它的地方，这一过程是引擎中比较慢的地方。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480492?w=500&amp;h=399" src="https://static.alili.tech/img/remote/1460000013480492?w=500&amp;h=399" alt="image_1c5agdelenhv4tr1di822te0saf.png-100.1kB" title="image_1c5agdelenhv4tr1di822te0saf.png-100.1kB" style="cursor: pointer; display: inline;"></span></p>
<p>按理来讲，如果 JIT 知道如何直接处理 WebAssembly 函数，那么速度会有百倍的提升，如果我们传递的是单一任务给 WebAssembly 模块，那么不用担心这个开销，因为只有一次转换，也会比较快，但是如果是频繁地从 WebAssembly 和 JavaScript 之间切换，那么这个开销就必须要考虑了。</p>
<h3 id="articleHeader7">快速加载</h3>
<p>JIT 必须要在快速加载和快速执行之间做权衡，如果在编译和优化阶段花了大量的时间，那么执行的必然会很快，但是启动会比较慢。目前有大量的工作正在研究，如何使预编译时间和程序真正执行时间两者平衡。WebAssembly 不需要对变量类型做优化假设，所以引擎也不关心在运行时的变量类型，这就给效率的提升提供了更多的可能性，比如可以使编译和执行这两个过程并行。加之最新增加的 JavaScript API 允许 WebAssembly 的流编译，这就使得在字节流还在下载的时候就启动编译。</p>
<p>FireFox 目前正在开发两个编译器系统：一个编译器先启动，对代码进行部分优化，在代码已经开始运行时，第二个编译器会在后台对代码进行全优化，当全优化过程完毕，就会将代码替换成全优化版本继续执行。</p>
<h3 id="articleHeader8">添加后续特性到 WebAssembly 标准的过程</h3>
<h4>直接操作 DOM</h4>
<p>目前 WebAssembly 没有任何方法可以与 DOM 直接交互，就是说我们还不能通过比如 element.innerHTML 的方法来更新节点。想要操作 DOM 必须要通过 JS，那么就要在 WebAssembly 中调用 JavaScript 函数，不管怎么样都要通过 JS 来实现，这比直接访问 DOM 要慢得多，所以这是未来一定要解决的一个问题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013480493?w=500&amp;h=418" src="https://static.alili.tech/img/remote/1460000013480493?w=500&amp;h=418" alt="image_1c5agk7hn2rd1p0o1mv111er1q85as.png-88kB" title="image_1c5agk7hn2rd1p0o1mv111er1q85as.png-88kB" style="cursor: pointer;"></span></p>
<h4>共享内存的并发性</h4>
<p>提升代码执行速度的一个方法是使代码并行运行，不过有时也会适得其反，因为不同的线程在同步的时候可能会花费更多的时间。这时如果能够使不同的线程共享内存，那就能降低这种开销，实现这一功能 WebAssembly 将会使用 JavaScript 中的 SharedArrayBuffer，而这一功能的实现将会提高程序执行的效率。</p>
<h4>SIMD（单指令，多数据）</h4>
<p>SIMD（Single Instruction, Multiple Data）在处理存放大量数据的数据结构有其独特的优势，比如存放很多不同数据的 vector（容器），就可以用同一个指令同时对容器的不同部分做处理，这种方法会大幅提高复杂计算的效率比如游戏或者 VR 应用。</p>
<h4>异常处理</h4>
<p>许多语言都仿照 C++ 式的异常处理，但是 WebAssembly 并没有包含异常处理，如果我们用 Emscripten 编译代码，就知道它会模拟异常处理，但是这一过程非常之慢，慢到想用 “DISABLEEXCEPTIONCATCHING” 标记把异常处理关掉。如果异常处理加入到 WebAssembly 中那就不必再采用模拟的方式，而异常处理对于开发者来讲又特别重要，所以这也是未来的一大功能点。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebAssembly 那些事儿

## 原文链接
[https://segmentfault.com/a/1190000013480473](https://segmentfault.com/a/1190000013480473)


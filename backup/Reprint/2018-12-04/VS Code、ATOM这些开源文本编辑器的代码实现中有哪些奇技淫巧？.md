---
title: 'VS Code、ATOM这些开源文本编辑器的代码实现中有哪些奇技淫巧？' 
date: 2018-12-04 2:30:05
hidden: true
slug: 8tthqhcnbfl
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇是我在知乎的回答，原文在这里：<a href="https://www.zhihu.com/question/272156541/answer/367784539" rel="nofollow noreferrer">justjavac: VS Code、ATOM这些开源文本编辑器的代码实现中有哪些奇技淫巧？</a></p>
<p>研究 V8 比较多，也关注了一下 vscode 和 atom 的性能，每次 vscode、atom 的 change log 我都会看一遍。印象最深的是 vscode 1.14 的一次更新日志，<a href="https://github.com/Microsoft/monaco-editor/issues/351" rel="nofollow noreferrer">doApplyEdits Lines inserted using splice · Issue #351 · Microsoft/monaco-editor</a>：<strong>不要在循环中使用 splice</strong>。</p>
<p>下图是我一年前跑的测试结果：<a href="https://jsperf.com/inserting-an-array-within-an-array" rel="nofollow noreferrer">Inserting an array within an array</a></p>
<p><span class="img-wrap"><img data-src="/img/bV9bJY?w=241&amp;h=122" src="https://static.alili.tech/img/bV9bJY?w=241&amp;h=122" alt="" title=""></span></p>
<p>300+倍的差距。</p>
<p>在之前 vscode 还有一次很大的性能提升，在版本 1.9 的时候，改进了语法高亮的算法。</p>
<p>语法高亮的过程通常分为 2 个阶段(tokenization 和 render)：先将源码分割为 token，然后使用不同的主题对分割后的 token 进行着色。</p>
<p>tokenization 的过程是：从上到下逐行运行。tokenizer 在行的末尾存储一些状态，在 tokenize 下一行时会用到这些状态。这样，在用户进行编辑时仅需要重新 tokenize 行的一小部分，而不需要扫描整个文件内容。</p>
<p><span class="img-wrap"><img data-src="/img/bV9bK9?w=686&amp;h=356" src="https://static.alili.tech/img/bV9bK9?w=686&amp;h=356" alt="" title=""></span></p>
<p>还有一种情况是当前行的输入会影响到后面（甚至是前面）的行，这时会用到结束状态：</p>
<p><span class="img-wrap"><img data-src="/img/bV9bLf?w=686&amp;h=356" src="https://static.alili.tech/img/bV9bLf?w=686&amp;h=356" alt="" title=""></span></p>
<p>在 1.9 之前的版本，vscode 如何 tokenization 呢？</p>
<p>比如上面的代码：</p>
<p><span class="img-wrap"><img data-src="/img/bV9bLM?w=651&amp;h=65" src="https://static.alili.tech/img/bV9bLM?w=651&amp;h=65" alt="" title=""></span></p>
<p>在 vscode 种这样存储：</p>
<pre><code class="js">tokens = [
    { startIndex:  0, type: 'keyword.js' },
    { startIndex:  8, type: '' },
    { startIndex:  9, type: 'identifier.js' },
    { startIndex: 11, type: 'delimiter.paren.js' },
    { startIndex: 12, type: 'delimiter.paren.js' },
    { startIndex: 13, type: '' },
    { startIndex: 14, type: 'delimiter.curly.js' },
]</code></pre>
<p>{ startIndex: 0, type: 'keyword.js' } 表示从 0 开始的 token 是一个 keyword。</p>
<p>VSCode 团队在博客种指出这在 Chrome 中占据 648 个字节，因此存储这样的对象在内存方面的代价非常高（每个对象实例必须保留指向其原型的空间，以及其属性列表等）。为 15 个字符存储 648 字节是不可接受的。</p>
<p>所以，vscode 使用二进制来存储token：</p>
<pre><code class="js">//     0        1               2                  3                      4
map = ['', 'keyword.js', 'identifier.js', 'delimiter.paren.js', 'delimiter.curly.js'];
tokens = [
    { startIndex:  0, type: 1 },
    { startIndex:  8, type: 0 },
    { startIndex:  9, type: 2 },
    { startIndex: 11, type: 3 },
    { startIndex: 12, type: 3 },
    { startIndex: 13, type: 0 },
    { startIndex: 14, type: 4 },
]</code></pre>
<p>和上面的表示法相比，只是把 type 由字符串变成了数字，本质上并没有节约太多的内存。但是别着急，vscode 还有黑科技。</p>
<p>我们都知道 JavaScript 使用 IEEE-754 标准存储双精度浮点数，尾数为 53bit。能够在不丢失精度的情况下处理的最大整数为 2^53-1。因此 vscode 使用其中的 48big 进行编码：使用 32bit 来存储 startIndex，16bit 来存储type。 于是上面的对象在 vscode 种被存储为：</p>
<pre><code class="js">tokens = [
                 //       type                 startIndex
     4294967296, // 0000000000000001 00000000000000000000000000000000
              8, // 0000000000000000 00000000000000000000000000001000
     8589934601, // 0000000000000010 00000000000000000000000000001001
    12884901899, // 0000000000000011 00000000000000000000000000001011
    12884901900, // 0000000000000011 00000000000000000000000000001100
             13, // 0000000000000000 00000000000000000000000000001101
    17179869198, // 0000000000000100 00000000000000000000000000001110
]</code></pre>
<p>每个数字是 64bit(8字节)，一共是 7 个数字，存储这些元素一共需要 7*8 = 56 字节，再加上数组的额外开销共需要 104 个字节，只有之前的 648 字节的 1/6。</p>
<p>而主题的渲染则用到了 <a href="https://en.wikipedia.org/wiki/Trie" rel="nofollow noreferrer">Trie</a> 数据结构。</p>
<p><span class="img-wrap"><img data-src="/img/bV9bMs?w=601&amp;h=431" src="https://static.alili.tech/img/bV9bMs?w=601&amp;h=431" alt="" title=""></span></p>
<p>这个学过《数据结构》的都懂，算不上奇技淫巧，就不展开了。</p>
<p>这一切都是 2017 年 3 月发布的 vscode 1.9。</p>
<p>而今年 3 月，vscode 又重写了 <a href="https://code.visualstudio.com/blogs/2018/03/23/text-buffer-reimplementation" rel="nofollow noreferrer">Text Buffer</a>。用户使用编辑器，大部分时间就是写新代码，改旧代码，说到底还是对 text 进行编辑。</p>
<p>对于高性能的文本操作，vscode 最初尝试使用 C++ 进行编写，毕竟 C++ 的性能要比 JavaScript 高出不少，但是事实却不够理想，使用 C++ 确实节约了内存，但是在使用 C++ 模块时，需要在 JavaScript 和 C++ 之间往返数次，这大大减慢了 vscode 的性能。</p>
<p>vscode 团队从 Vyacheslav Egorov  的一篇文章 <a href="https://mrale.ph/blog/2018/02/03/maybe-you-dont-need-rust-to-speed-up-your-js.html" rel="nofollow noreferrer">Maybe you don't need Rust and WASM to speed up your JS</a> 收到了启发，如何充分压榨 V8 引擎的性能。mrale.ph 的博客我几乎每篇都看，非常经典，也非常难懂 。</p>
<p>大多编辑器都是基于行的。程序员逐行编写代码，编译器提供基于行的反馈信息，堆栈跟踪包含行号，tokenization 引擎逐行运行…… 在 vscode 的早期版本中也是直接把每行代码作为字符串存储在数组中。</p>
<p>但是这种方式存在一些问题：</p>
<ul>
<li>无法打开大文件，因为把所有内容读入数组中可能导致内存不足。</li>
<li>即使文件不大，但是行数太多也无法打开。例如，一个用户无法打开一个 <a href="https://github.com/Microsoft/vscode/issues/13187" rel="nofollow noreferrer">35 MB 的文件</a>。根本原因是该文件的行数太多，1370 万行。引擎将为ModelLine每行和每个对象使用大约 40-60 个字节，因此整个数组使用大约 600MB 内存来存储文档。也就是说打开这个 35M 的文件需要 600M 的内容，20 倍啊！！！</li>
<li>另一个问题就是速度。为了构建这个数组，必须通过换行符分割内容，以便每行获得一个字符串对象。</li>
</ul>
<p>于是 vscode 开始寻找新的数据结果，最终选择了 <a href="https://en.wikipedia.org/wiki/Piece_table" rel="nofollow noreferrer">Piece table</a>。不知道为什么这么晚才选择 piece table，要知道在微软的 office word 中早就已经使用了 piece table。我也是在一次 Java 读取 word 的 jar 包源码中第一次知道的 piece table 数据结构。</p>
<p>推荐几篇延伸阅读的文章：</p>
<ul>
<li>Emacs 编辑器的 buffer 论文：<a href="https://www.common-lisp.net/project/flexichain/download/StrandhVilleneuveMoore.pdf" rel="nofollow noreferrer">Flexichain: An editable sequence and its gap-buffer implementation</a> 2004-04-05</li>
<li>piece table 的：<a href="https://www.cs.unm.edu/~crowley/papers/sds.pdf" rel="nofollow noreferrer">Data Structures for Text Sequences</a> 1998-06-10</li>
<li>Ropes: <a href="https://www.cs.rit.edu/usr/local/pub/jeh/courses/QUARTERS/FP/Labs/CedarRope/rope-paper.pdf" rel="nofollow noreferrer">An Alternative to Strings</a> 1995-12</li>
</ul>
<p>目前主要的三种编辑方式有 gap buffer, rope, piece table。</p>
<hr>
<p>最近用 Atom 少了。</p>
<p>上一次让我兴奋的地方是：<a href="http://blog.atom.io/2018/01/10/the-state-of-atoms-performance.html" rel="nofollow noreferrer">The State of Atom's Performance</a>。在2017年6月 Atom 使用了 piece table 数据结构，使用 C++ 重新实现了 text buffer：<a href="http://blog.atom.io/2017/10/12/atoms-new-buffer-implementation.html" rel="nofollow noreferrer">Atom's new concurrency-friendly buffer implementation</a>。比 vscode 还要早半年，但是为什么还是这么慢呢？？？</p>
<p>Atom 使用 V8 的自定义快照（snapshot）提升启动性能，最终删除了影响性能的 jQuery 和自定义 element。就连 V8 的</p>
<p><span class="img-wrap"><img data-src="/img/bV9bM7?w=720&amp;h=309" src="https://static.alili.tech/img/bV9bM7?w=720&amp;h=309" alt="" title=""></span></p>
<p>Atom 还更新了 DOM 渲染的方式：<a href="http://blog.atom.io/2017/06/22/a-new-approach-to-text-rendering.html" rel="nofollow noreferrer">A new approach to text rendering</a>，而这个新算法包括一个类似 React 的 vdom，从 issue 来看这是一个大工程啊，包含了近 <a href="https://github.com/atom/atom/pull/13880" rel="nofollow noreferrer">100 个 task</a></p>
<p><span class="img-wrap"><img data-src="/img/bV9Alb?w=727&amp;h=314" src="https://static.alili.tech/img/bV9Alb?w=727&amp;h=314" alt="图片描述" title="图片描述"></span></p>
<p>经过一系列优化，官方说道：</p>
<blockquote>we made loading Atom almost 50% faster and snapshots were a crucial tool that enabled some otherwise impossible optimizations.</blockquote>
<p>我们使 Atom 快了 50%，snapshot 功不可没。（PS：我一定是使用了假的 Atom）</p>
<p>不过 snapshot 确实是 V8 的神器，Nodejs 也看到了 Atom 的成果，于 2017-11-16 开了 issue ：speeding up Node.js startup using V8 snapshot · Issue #17058 · nodejs/node。这在我之前的专栏里面有介绍：Node.js 新计划：<a href="https://zhuanlan.zhihu.com/p/31139813" rel="nofollow noreferrer">使用 V8 snapshot 将启动速度提升 8 倍</a>。</p>
<hr>
<p>最近一次关注 Atom 是 <a href="https://github.com/atom/xray" rel="nofollow noreferrer">atom/xray</a>。知乎上也有相关的讨论，atom 开发的下一代编辑器（莫非已经定义 atom 为上一代编辑器了吗）。大概就是一种“大号废了，开小号重练”的感觉。</p>
<p>值得学习的地方是 text 处理使用 copy-on-write CRDT：</p>
<p><span class="img-wrap"><img data-src="/img/bV9bNK?w=720&amp;h=405" src="https://static.alili.tech/img/bV9bNK?w=720&amp;h=405" alt="" title=""></span></p>
<p>如果一直关注 Atom，对于 CRDT 应该不会陌生。Atom 的多人实时共同编辑插件 <a href="https://teletype.atom.io/" rel="nofollow noreferrer">https://teletype.atom.io/</a> 就是使用的 CRDT。</p>
<p>CRDT 全称：Conflict-Free Replicated Data Types，强行翻译过来就是“无冲突可复制数据类型”。</p>
<ul><li>CRDT 论文： <a href="https://hal.inria.fr/file/index/docid/555588/filename/techreport.pdf" rel="nofollow noreferrer">A comprehensive study of Convergent and Commutative Replicated Data Types</a> 2011-01-13</li></ul>
<p>CAP定理：在分布式系统中，最多只能同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition tolerance）这三项中的两项。</p>
<p><span class="img-wrap"><img data-src="/img/bV9bNX?w=345&amp;h=300" src="https://static.alili.tech/img/bV9bNX?w=345&amp;h=300" alt="" title=""></span></p>
<p>很多分布式系统都舍弃了C（一致性）：允许可以在某些时刻不一致，转而求其次要求系统满足最终一致性。这也是目前很多 nosql 数据库追求的方式（另一种是传统的符合 ACID 特性的数据库系统，放弃了A(可用性)，这种系统称为强一致性）。</p>
<p>而在最终一致性分布式系统中，一个最基本的问题就是，应该采用什么样的数据结构来保证最终一致性？ 答案就是 CRDT。</p>
<ul><li><a href="https://github.com/atom/teletype-crdt" rel="nofollow noreferrer">atom/teletype-crdt</a></li></ul>
<hr>
<p>这篇文章只是一个提纲，里面的每个知识点都可以展开了讲上三天三夜。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VS Code、ATOM这些开源文本编辑器的代码实现中有哪些奇技淫巧？

## 原文链接
[https://segmentfault.com/a/1190000014544333](https://segmentfault.com/a/1190000014544333)


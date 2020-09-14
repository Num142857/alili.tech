---
title: 'JavaScript到底是解释型语言还是编译型语言?' 
date: 2018-12-14 2:30:11
hidden: true
slug: mlw8afd1ep
categories: [reprint]
---

{{< raw >}}

                    
<p>几天前我的一个刚接触JavaScript的朋友问我JavaScript是编译型语言还是解释型语言。从一个初学者那里得到这样的问题让我有些惊讶，因为所有初学者都知道JS是一个解释型语言；特别是当你之前使用像Java这样的语言的时候，她就是这样。</p>
<p>当一些人深入JavaScript以及开始研究V8引擎、SpiderMonkey、JIT等的时候，他们开始对于解释型还是编译型有更多的疑问。但是很高兴看到她已经在这个阶段了。</p>
<h2 id="articleHeader0">令人困惑的是什么？</h2>
<p>最开始的时候，JavaScript的圣经——MDN明确地说JavaScript是一个解释型语言（同时还说到了及时编译，后面我会强调这一点）。但是下面几点仍然会让JavaScript是否真的是一个解释型语言产生疑问：</p>
<ul>
<li>如果是解释型语言那么声明提升为什么会发生</li>
<li>JIT(及时编译)做代码优化(同时生成编译版本)；解释型语言无法做到这些。</li>
</ul>
<h3 id="articleHeader1">快速回答</h3>
<p>困惑和问题是有根据的而且不能片面的解答，因为JavaScript规范没有对这一点做特别说明。所以让我们基于理论定义和工作流程来弄清楚JavaScript到底是什么。</p>
<h2 id="articleHeader2">编译型语言 VS 解释型语言</h2>
<p>主要问题是没有团体或者组织规定这些；例如：编译型语言和解释型语言的定义以及如何划分。 而这两个都是概念。</p>
<p>所以根据概念，编译型语言是代码在运行前编译器将人类可以理解的语言（编程语言）转换成机器可以理解的语言。</p>
<p>解释型语言也是人类可以理解的语言（编程语言），也需要转换成机器可以理解的语言才能执行，但是是在运行时转换的。所以执行前需要解释器安装在环境中；但是编译型语言编写的应用在编译后能直接运行。</p>
<p>许多人认为解释型语言意味着当遇到程序中行号为<code>xyz</code>时直接将其传给CPU就能运行；但是事实不是这样。所有的编程语言都是为人类创建的。他们是人类能够理解的。你必须将编程语言转换为机器语言。编译器获取整个代码，转换它，做合适的优化并且创建一个可以运行的输出文件。编译器根据上下文来转换语句。</p>
<h2 id="articleHeader3">那么声明提升呢？</h2>
<p>我觉得你应该已经知道了JavaScript的声明提升。在函数作用域内的任何变量的声明都会被提升到顶部并且是<code>undeinfed</code>值。<br>所以JavaScript引擎解释同样的脚本文件两次？做完所有的声明提升然后执行代码？还是先编译整个代码然后运行它？这两种情况都不对。<br>下面是JavaScript处理声明的过程：</p>
<ul>
<li>一旦V8引擎进入一个执行具体代码的执行上下文（函数），它就对代码进行词法分析或者分词。这意味着代码将被分割成像<code>foo</code> <code>=</code> <code>10</code>这样的原子标记。</li>
<li>在对当前的整个作用域分析完成后，引擎将解析成一个AST（抽象语法书）的翻译版本。</li>
<li>引擎每一次遇到声明，它就把声明传到作用域来创建一个绑定。对每一次声明它都会为变量分配内存。只是分配内存而不是把代码修改成声明提升。正如你所知道的，在JS中分配内存意味着将默认值设为<code>undefined</code>。</li>
<li>在这之后，引擎每一次遇到赋值或者取值，它都会通过作用域查找绑定。如果在当前作用域中没有查找到就接着向上级作用域查找直到找到为止。</li>
<li>接着引擎生成CPU可以执行的机器码。</li>
<li>最后， 代码执行完毕。</li>
</ul>
<p>所以变量提升不过是执行上下文的游戏，而不是网站描述的代码修改。在执行任何语句之前，解释器就已经从运行上下文创建的作用域中找到变量的值了。</p>
<h2 id="articleHeader4">解释JavaScript中的即时编译(JIT)</h2>
<p>JIT或者说及时编译编译器不是JavaScript所特有的。像Java这样的其他语言也有一些在执行前编译代码的机制。</p>
<p>现代JavaScript引擎同样有JIT。是的，它们有编译器。让我来为你解释一下为什么它们需要JIT以及JIT如何在JavaScript的执行中起作用。</p>
<p>编译型和解释型语言最重要的区别是编译语言话很长的时间来准备执行。因为它需要对整个代码进行词法分析、做一些极致的优化等工作。另一方面解释型语言几乎在执行后一瞬间就开始，但是没有任何代码优化。所以没一条语句都是分开转换的，考虑下面这一段代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(i=0; i&amp;lt;1000; i++){
    sum += i;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span>(<span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>; <span class="hljs-built_in">i</span>&amp;lt;<span class="hljs-number">1000</span>; <span class="hljs-built_in">i</span>++){
    sum += i;
}</code></pre>
<p>在编译型语言中sum += i部分在循环运行时已经编译成了机器码，机器码将直接运行一千次。</p>
<p>但是在解释型语言中，他会在执行时将sum += i解释一千次。所以因为对相同的代码进行一千次转换会造成非常大的性能损耗。</p>
<p>这就是Google和Mozilla的开发人员将JIT加入JavaScript的原因。</p>
<h3 id="articleHeader5">编译</h3>
<p>在JavaScript中如果一段代码运行超过一次，那么就称为warm。如果一个函数开始变得更加warm（译者注：运行更多次），JIT将把这段代码送到编译器中编译并且保存一个编译后的版本。下一次同样代码执行的时候，引擎会跳过翻译过程直接使用编译后的版本。</p>
<p>这将优化性能。在真正的编译器中，因为编译器能访问整个代码所以能做更多的事。</p>
<h2 id="articleHeader6">优化</h2>
<p>如果一段warm代码变得hot或者hotter（译者注：指运行更多次以及比更多还要多的次数）JIT会尝试更多的优化并且保存优化后的版本。在编译器进行优化的过程中会做一些关于变量类型和环境中值的假设；但是如果假设不成立就将这个优化的版本回退，如果假设成立的话，这将让代码性能更高。</p>
<p>了解更多关于JIT的事情你可以阅读Lin Clarks<a href="https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/" rel="nofollow noreferrer" target="_blank">关于JIT的课程</a>。</p>
<h2 id="articleHeader7">结论</h2>
<p>所以现在我们了解了当JavaScript执行时到底发生了什么，我想我们可以分类JavaScript到底是编译型还是解释型语言了。下面是这篇文章的要点。</p>
<ul>
<li>JavaScript代码需要在机器（node或者浏览器）上安装一个工具（JS引擎）才能执行。这是解释型语言需要的。编译型语言产品能够自由地直接运行。</li>
<li>声明提升等不是代码修改。在这个过程中没有生成中间代码。这只是JS解释器处理事情的方式。</li>
<li>JIT是唯一一点我们可以对JavaScript是否是一个解释型语言提出疑问的理由。但是JIT不是纯粹的编译器，它在执行前进行编译。而且JIT知识Mozilla和Google的开发人员为了在他们的浏览器产品中提升性能才引入的。JavaScript或TC39从来没有要求这样做。</li>
</ul>
<p>因此，虽然JavaScript执行时像是编译过的或者是一种混合，但是我仍然认为说JavaScript是一个解释型语言要好过说他是一个编译型语言或者最近很多人说的一个混合型的语言。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript到底是解释型语言还是编译型语言?

## 原文链接
[https://segmentfault.com/a/1190000013126460](https://segmentfault.com/a/1190000013126460)


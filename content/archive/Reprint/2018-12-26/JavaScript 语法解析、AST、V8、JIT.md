---
title: 'JavaScript 语法解析、AST、V8、JIT' 
date: 2018-12-26 2:30:14
hidden: true
slug: 017u1nimt9m1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JavaScript 语法解析、AST、V8、JIT</h1>
<h4>JavaScript 是如何执行的</h4>
<p><a href="https://github.com/cheogo/learn-javascript" rel="nofollow noreferrer" target="_blank">原文地址</a>，对于常见编译型语言（例如：Java）来说，编译步骤分为：词法分析-&gt;语法分析-&gt;语义检查-&gt;代码优化和字节码生成。</p>
<p>对于解释型语言（例如 JavaScript）来说，通过词法分析 -&gt; 语法分析 -&gt; 语法树，就可以开始解释执行了。</p>
<p><span class="img-wrap"><img data-src="/img/bVXU4c?w=678&amp;h=363" src="https://static.alili.tech/img/bVXU4c?w=678&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>具体过程是这样的：  </p>
<p>1.词法分析是将字符流(char stream)转换为记号流(token stream)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NAME &quot;AST&quot;  
EQUALS  
NAME &quot;is Tree&quot;  
SEMICOLON " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-built_in">NAME</span> <span class="hljs-string">"AST"</span>  
EQUALS  
<span class="hljs-built_in">NAME</span> <span class="hljs-string">"is Tree"</span>  
SEMICOLON </code></pre>
<p>2.语法分析成 AST (Abstract Syntax Tree)，你可以在这里试试 <a href="http://esprima.org/demo/parse.html#" rel="nofollow noreferrer" target="_blank">http://esprima.org/</a>  </p>
<p>3.预编译，当JavaScript引擎解析脚本时，它会在预编译期对所有声明的变量和函数进行处理！并且是先预声明变量，再预定义函数！</p>
<p>4.解释执行，在执行过程中，JavaScript 引擎是严格按着作用域机制（scope）来执行的，并且 JavaScript 的变量和函数作用域是在定义时决定的，而不是执行时决定的。JavaScript 中的变量作用域在函数体内有效，无块作用域；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
    for(var i = 0; i < array.length; i++){  
      //do something here.  
    }
    //此时 i 仍然有值，及 i == array.length  
    console.log(i); // 但在 java 语言中，则无效
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; array.length; i++){  
      <span class="hljs-comment">//do something here.  </span>
    }
    <span class="hljs-comment">//此时 i 仍然有值，及 i == array.length  </span>
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 但在 java 语言中，则无效</span>
}</code></pre>
<p>JavaScript 引擎通过作用域链（scope chain）把多个嵌套的作用域串连在一起，并借助这个链条帮助 JavaScript 解释器检索变量的值。这个作用域链相当于一个索引表，并通过编号来存储它们的嵌套关系。当 JavaScript 解释器检索变量的值，会按着这个索引编号进行快速查找，直到找到全局对象（global object）为止，如果没有找到值，则传递一个特殊的 undefined 值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global&quot;;
scopeTest();
function scopeTest(){  
    console.log(scope);  
    var scope = &quot;local&quot;;  
    console.log(scope); 
}
打印结果：undefined，local；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global"</span>;
scopeTest();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scopeTest</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-built_in">console</span>.log(scope);  
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"local"</span>;  
    <span class="hljs-built_in">console</span>.log(scope); 
}
打印结果：<span class="hljs-literal">undefined</span>，local；</code></pre>
<h4>V8、JIT</h4>
<p>我们常说的 V8 是 Google 发布的开源 JavaScript 引擎，采用 C++ 编写。SpiderMonkey（Mozilla，基于 C）、Rhino（Mozilla，基于 Java），而 Nodejs 依赖于 V8 引擎开发，接下来的内容是 JavaScript 在 V8 引擎中的运行状态，而类似的 JavaScript 现代引擎对于这些实现大同小异。</p>
<p>在本文的开头提到了编译型语言，解释型语言。JavaScript 是解释型语言且<code>弱类型</code>，在生成 AST 之后，就开始一边解释，一边执行，但是有个弊端，当某段代码被多次执行时，它就有了可优化的空间（比如类型判断优化），而不用一次次的去重复之前的解释执行。<br>编译型语言如 JAVA，可以在执行前就进行优化编译，但是这会耗费大量的时间，显然不适用于 Web 交互。</p>
<p>于是就有了，JIT（Just-in-time），JIT 是两种模式的混合。</p>
<p><span class="img-wrap"><img data-src="/img/bVXU4d?w=422&amp;h=119" src="https://static.alili.tech/img/bVXU4d?w=422&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>它是如何工作的呢：</p>
<p>1.在 JavaScript 引擎中增加一个监视器（也叫分析器）。监视器监控着代码的运行情况，记录代码一共运行了多少次、如何运行的等信息，如果同一行代码运行了几次，这个代码段就被标记成了 “warm”，如果运行了很多次，则被标记成 “hot”。</p>
<p>2.（基线编译器）如果一段代码变成了 “warm”，那么 JIT 就把它送到基线编译器去编译，并且把编译结果存储起来。比如，监视器监视到了，某行、某个变量执行同样的代码、使用了同样的变量类型，那么就会把编译后的版本，替换这一行代码的执行，并且存储。</p>
<p>3.（优化编译器）如果一个代码段变得 “hot”，监视器会把它发送到优化编译器中。生成一个更快速和高效的代码版本出来，并且存储。例如：循环加一个对象属性时，假设它是 INT 类型，优先做 INT 类型的判断</p>
<p>4.（去优化）可是对于 JavaScript 从来就没有确定这么一说，前 99 个对象属性保持着 INT 类型，可能第 100 个就没有这个属性了，那么这时候 JIT 会认为做了一个错误的假设，并且把优化代码丢掉，执行过程将会回到解释器或者基线编译器，这一过程叫做去优化。</p>
<h6>优化代码图例：</h6>
<p>“hot” 代码</p>
<p><span class="img-wrap"><img data-src="/img/bVKnOy?w=500&amp;h=257" src="https://static.alili.tech/img/bVKnOy?w=500&amp;h=257" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>优化前</p>
<p><span class="img-wrap"><img data-src="/img/bVKnOB?w=500&amp;h=323" src="https://static.alili.tech/img/bVKnOB?w=500&amp;h=323" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>优化后</p>
<p><span class="img-wrap"><img data-src="/img/bVKnOA?w=500&amp;h=318" src="https://static.alili.tech/img/bVKnOA?w=500&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>总结</h4>
<p>明白一些基本原理能拓展出更多的东西，比如：</p>
<p>1.var a = 10; var b = 20; ==&gt; var a=10, b=20; 这些改代码的好处是什么，如何从原理解释？</p>
<p>2.JavaScript 的函数和变量是在什么时候声明的，函数声明和函数表达式的区别？</p>
<p>3.如何通过编译器的优化原理，如何提高 JavaScript 的执行效率？  </p>
<p><a href="https://github.com/cheogo/learn-javascript" rel="nofollow noreferrer" target="_blank">阅读原文</a></p>
<hr>
<p>作者：肖沐宸，<a href="https://github.com/cheogo/learn-javascript" rel="nofollow noreferrer" target="_blank">github</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 语法解析、AST、V8、JIT

## 原文链接
[https://segmentfault.com/a/1190000011858383](https://segmentfault.com/a/1190000011858383)


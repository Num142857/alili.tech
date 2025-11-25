---
title: 'ES6 变量作用域与提升：变量的生命周期详解' 
date: 2019-01-04 2:30:10
hidden: true
slug: 5qzftgfle6q
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/28494566" rel="nofollow noreferrer" target="_blank">ES6 变量作用域与提升：变量的生命周期详解</a>从属于笔者的<a href="https://parg.co/bjK" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发：语法基础与实践技巧</a>系列文章。本文详细讨论了 JavaScript 中作用域、执行上下文、不同作用域下变量提升与函数提升的表现、顶层对象以及如何避免创建全局对象等内容；建议阅读前文<a href="https://parg.co/bjn" rel="nofollow noreferrer" target="_blank"> ES6 变量声明与赋值</a>。</p></blockquote>
<h1 id="articleHeader0">变量作用域与提升</h1>
<p>在 ES6 之前，JavaScript 中只存在着函数作用域；而在 ES6 中，JavaScript 引入了 let、const 等变量声明关键字与块级作用域，在不同作用域下变量与函数的提升表现也是不一致的。在 JavaScript 中，所有绑定的声明会在控制流到达它们出现的作用域时被初始化；这里的作用域其实就是所谓的执行上下文（Execution Context），每个执行上下文分为内存分配（Memory Creation Phase）与执行（Execution）这两个阶段。在执行上下文的内存分配阶段会进行变量创建，即开始进入了变量的生命周期；变量的生命周期包含了声明（Declaration phase）、初始化（Initialization phase）与赋值（Assignment phase）过程这三个过程。</p>
<p>传统的 var 关键字声明的变量允许在声明之前使用，此时该变量被赋值为 undefined；而函数作用域中声明的函数同样可以在声明前使用，其函数体也被提升到了头部。这种特性表现也就是所谓的提升（Hoisting）；虽然在 ES6 中以 let 与 const 关键字声明的变量同样会在作用域头部被初始化，不过这些变量仅允许在实际声明之后使用。在作用域头部与变量实际声明处之间的区域就称为所谓的暂时死域（Temporal Dead Zone），TDZ 能够避免传统的提升引发的潜在问题。另一方面，由于 ES6 引入了块级作用域，在块级作用域中声明的函数会被提升到该作用域头部，即允许在实际声明前使用；而在部分实现中该函数同时被提升到了所处函数作用域的头部，不过此时被赋值为 undefined。</p>
<h1 id="articleHeader1">作用域</h1>
<p>作用域（Scope）即代码执行过程中的变量、函数或者对象的可访问区域，作用域决定了变量或者其他资源的可见性；计算机安全中一条基本原则即是用户只应该访问他们需要的资源，而作用域就是在编程中遵循该原则来保证代码的安全性。除此之外，作用域还能够帮助我们提升代码性能、追踪错误并且修复它们。JavaScript 中的作用域主要分为全局作用域（Global Scope）与局部作用域（Local Scope）两大类，在 ES5 中定义在函数内的变量即是属于某个局部作用域，而定义在函数外的变量即是属于全局作用域。</p>
<h2 id="articleHeader2">全局作用域</h2>
<p>当我们在浏览器控制台或者 Node.js 交互终端中开始编写 JavaScript 时，即进入了所谓的全局作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the scope is by default global
var name = 'Hammad';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> the scope <span class="hljs-keyword">is</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span> <span class="hljs-built_in">global</span>
var name = <span class="hljs-string">'Hammad'</span>;</code></pre>
<p>定义在全局作用域中的变量能够被任意的其他作用域中访问：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'Hammad';

console.log(name); // logs 'Hammad'

function logName() {
    console.log(name); // 'name' is accessible here and everywhere else
}

logName(); // logs 'Hammad'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var name = <span class="hljs-symbol">'Hammad</span>';

console.log(name); // logs <span class="hljs-symbol">'Hammad</span>'

<span class="hljs-keyword">function</span> <span class="hljs-title">logName</span>() {
    console.log(name); // <span class="hljs-symbol">'name</span>' <span class="hljs-keyword">is</span> accessible here <span class="hljs-keyword">and</span> everywhere <span class="hljs-keyword">else</span>
}

logName(); // logs <span class="hljs-symbol">'Hammad</span>'</code></pre>
<h2 id="articleHeader3">函数作用域</h2>
<p>定义在某个函数内的变量即从属于当前函数作用域，在每次函数调用中都会创建出新的上下文；换言之，我们可以在不同的函数中定义同名变量，这些变量会被绑定到各自的函数作用域中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Global Scope
function someFunction() {
    // Local Scope #1
    function someOtherFunction() {
        // Local Scope #2
    }
}

// Global Scope
function anotherFunction() {
    // Local Scope #3
}
// Global Scope" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// Global Scope</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someFunction</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Local Scope #1</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someOtherFunction</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// Local Scope #2</span>
    }
}

<span class="hljs-comment">// Global Scope</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anotherFunction</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Local Scope #3</span>
}
<span class="hljs-comment">// Global Scope</span></code></pre>
<p>函数作用域的缺陷在于粒度过大，在使用闭包或者其他特性时导致异常的变量传递：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var callbacks = [];

// 这里的 i 被提升到了当前函数作用域头部
for (var i = 0; i <= 2; i++) {
    callbacks[i] = function () {
            return i * 2;
        };
}

console.log(callbacks[0]()); //6
console.log(callbacks[1]()); //6
console.log(callbacks[2]()); //6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> callbacks = [];

<span class="hljs-comment">// 这里的 i 被提升到了当前函数作用域头部</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;= <span class="hljs-number">2</span>; i++) {
    callbacks[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> i * <span class="hljs-number">2</span>;
        };
}

<span class="hljs-built_in">console</span>.log(callbacks[<span class="hljs-number">0</span>]()); <span class="hljs-comment">//6</span>
<span class="hljs-built_in">console</span>.log(callbacks[<span class="hljs-number">1</span>]()); <span class="hljs-comment">//6</span>
<span class="hljs-built_in">console</span>.log(callbacks[<span class="hljs-number">2</span>]()); <span class="hljs-comment">//6</span></code></pre>
<h2 id="articleHeader4">块级作用域</h2>
<p>类似于 if、switch 条件选择或者 for、while 这样的循环体即是所谓的块级作用域；在 ES5 中，要实现块级作用域，即需要在原来的函数作用域上包裹一层，即在需要限制变量提升的地方手动设置一个变量来替代原来的全局变量，譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var callbacks = [];
for (var i = 0; i <= 2; i++) {
    (function (i) {
        // 这里的 i 仅归属于该函数作用域
        callbacks[i] = function () {
            return i * 2;
        };
    })(i);
}
callbacks[0]() === 0;
callbacks[1]() === 2;
callbacks[2]() === 4;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> callbacks = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;= <span class="hljs-number">2</span>; i++) {
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(i)</span> </span>{
        <span class="hljs-comment">// 这里的 i 仅归属于该函数作用域</span>
        callbacks[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> i * <span class="hljs-number">2</span>;
        };
    })(i);
}
callbacks[<span class="hljs-number">0</span>]() === <span class="hljs-number">0</span>;
callbacks[<span class="hljs-number">1</span>]() === <span class="hljs-number">2</span>;
callbacks[<span class="hljs-number">2</span>]() === <span class="hljs-number">4</span>;</code></pre>
<p>而在 ES6 中，可以直接利用 <code>let</code> 关键字达成这一点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let callbacks = []
for (let i = 0; i <= 2; i++) {
    // 这里的 i 属于当前块作用域
    callbacks[i] = function () {
        return i * 2
    }
}
callbacks[0]() === 0
callbacks[1]() === 2
callbacks[2]() === 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let callbacks = []
for (let i = <span class="hljs-number">0</span>; i &lt;= <span class="hljs-number">2</span>; i++) {
    <span class="hljs-comment">// 这里的 i 属于当前块作用域</span>
    callbacks[i] = function () {
        return i * <span class="hljs-number">2</span>
    }
}
callbacks[<span class="hljs-number">0</span>]() === <span class="hljs-number">0</span>
callbacks[<span class="hljs-number">1</span>]() === <span class="hljs-number">2</span>
callbacks[<span class="hljs-number">2</span>]() === <span class="hljs-number">4</span></code></pre>
<h2 id="articleHeader5">词法作用域</h2>
<p>词法作用域是 JavaScript 闭包特性的重要保证，笔者在<a href="https://parg.co/bF0" rel="nofollow noreferrer" target="_blank">基于 JSX 的动态数据绑定</a>一文中也介绍了如何利用词法作用域的特性来实现动态数据绑定。一般来说，在编程语言里我们常见的变量作用域就是词法作用域与动态作用域（Dynamic Scope），绝大部分的编程语言都是使用的词法作用域。词法作用域注重的是所谓的 Write-Time，即编程时的上下文，而动态作用域以及常见的 this 的用法，都是 Run-Time，即运行时上下文。词法作用域关注的是函数在何处被定义，而动态作用域关注的是函数在何处被调用。JavaScript 是典型的词法作用域的语言，即一个符号参照到语境中符号名字出现的地方，局部变量缺省有着词法作用域。此二者的对比可以参考如下这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( a ); // 2 in Lexical Scope ，But 3 in Dynamic Scope
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;

bar();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( a ); <span class="hljs-comment">// 2 in Lexical Scope ，But 3 in Dynamic Scope</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
    foo();
}

<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;

bar();</code></pre>
<h1 id="articleHeader6">执行上下文与提升</h1>
<p>作用域（Scope）与上下文（Context）常常被用来描述相同的概念，不过上下文更多的关注于代码中 <code>this</code> 的使用，而作用域则与变量的可见性相关；而 JavaScript 规范中的执行上下文（Execution Context）其实描述的是变量的作用域。众所周知，JavaScript 是单线程语言，同时刻仅有单任务在执行，而其他任务则会被压入执行上下文队列中（更多知识可以阅读 <a href="https://parg.co/bjF" rel="nofollow noreferrer" target="_blank">Event Loop 机制详解与实践应用</a>）；每次函数调用时都会创建出新的上下文，并将其添加到执行上下文队列中。</p>
<h2 id="articleHeader7">执行上下文</h2>
<p>每个执行上下文又会分为内存创建（Creation Phase）与代码执行（Code Execution Phase）两个步骤，在创建步骤中会进行变量对象的创建（Variable Object）、作用域链的创建以及设置当前上下文中的 <code>this</code> 对象。所谓的 Variable Object ，又称为 Activation Object，包含了当前执行上下文中的所有变量、函数以及具体分支中的定义。当某个函数被执行时，解释器会先扫描所有的函数参数、变量以及其他声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'variableObject': {
    // contains function arguments, inner variable and function declarations
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-symbol">'variableObject</span>': {
    // contains <span class="hljs-keyword">function</span> <span class="hljs-title">arguments,</span> inner variable and <span class="hljs-keyword">function</span> <span class="hljs-title">declarations</span>
}</code></pre>
<p>在 Variable Object 创建之后，解释器会继续创建作用域链（Scope Chain）；作用域链往往指向其副作用域，往往被用于解析变量。当需要解析某个具体的变量时，JavaScript 解释器会在作用域链上递归查找，直到找到合适的变量或者任何其他需要的资源。作用域链可以被认为是包含了其自身 Variable Object 引用以及所有的父 Variable Object 引用的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'scopeChain': {
    // contains its own variable object and other variable objects of the parent execution contexts
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-string">'scopeChain'</span>: {
    <span class="hljs-comment">// contains its own variable object and other variable objects of the parent execution contexts</span>
}</code></pre>
<p>而执行上下文则可以表述为如下抽象对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="executionContextObject = {
    'scopeChain': {}, // contains its own variableObject and other variableObject of the parent execution contexts
    'variableObject': {}, // contains function arguments, inner variable and function declarations
    'this': valueOfThis
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>executionContextObject = {
    <span class="hljs-symbol">'scopeChain</span>': {}, // contains its own variableObject <span class="hljs-keyword">and</span> other variableObject <span class="hljs-keyword">of</span> the parent execution contexts
    <span class="hljs-symbol">'variableObject</span>': {}, // contains <span class="hljs-keyword">function</span> <span class="hljs-title">arguments,</span> inner variable and <span class="hljs-keyword">function</span> <span class="hljs-title">declarations</span>
    'this': valueOfThis
}</code></pre>
<h2 id="articleHeader8">变量的生命周期与提升</h2>
<p>变量的生命周期包含着变量声明（Declaration Phase）、变量初始化（Initialization Phase）以及变量赋值（Assignment Phase）三个步骤；其中声明步骤会在作用域中注册变量，初始化步骤负责为变量分配内存并且创建作用域绑定，此时变量会被初始化为 undefined，最后的分配步骤则会将开发者指定的值分配给该变量。传统的使用 var 关键字声明的变量的生命周期如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010640230" src="https://static.alili.tech/img/remote/1460000010640230" alt="" title="" style="cursor: pointer;"></span></p>
<p>而 let 关键字声明的变量生命周期如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010640231" src="https://static.alili.tech/img/remote/1460000010640231" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上文所说，我们可以在某个变量或者函数定义之前访问这些变量，这即是所谓的变量提升（Hoisting）。传统的 var 关键字声明的变量会被提升到作用域头部，并被赋值为 undefined：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var hoisting
num;     // => undefined  
var num;  
num = 10;  
num;     // => 10  
// function hoisting
getPi;   // => function getPi() {...}  
getPi(); // => 3.14  
function getPi() {  
  return 3.14;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// <span class="hljs-keyword">var</span> hoisting
num;     // =&gt; undefined  
<span class="hljs-keyword">var</span> num;  
num = <span class="hljs-number">10</span>;  
num;     // =&gt; <span class="hljs-number">10</span>  
// function hoisting
getPi;   // =&gt; function getPi() <span class="hljs-meta">{...}</span>  
getPi(); // =&gt; <span class="hljs-number">3</span>.<span class="hljs-number">14</span>  
function getPi() {  
  <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>.<span class="hljs-number">14</span>;
}</code></pre>
<p>变量提升只对 var 命令声明的变量有效，如果一个变量不是用 var 命令声明的，就不会发生变量提升。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(b);
b = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(b);
b = <span class="hljs-number">1</span>;</code></pre>
<p>上面的语句将会报错，提示 <code>ReferenceError: b is not defined</code>，即变量 b 未声明，这是因为 b 不是用 var 命令声明的，JavaScript 引擎不会将其提升，而只是视为对顶层对象的 b 属性的赋值。ES6 引入了块级作用域，块级作用域中使用 <code>let</code> 声明的变量同样会被提升，只不过不允许在实际声明语句前使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> let x = x;
ReferenceError: x is not defined
    at repl:1:9
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:433:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
    at REPLServer.Interface._onLine (readline.js:278:10)
    at REPLServer.Interface._line (readline.js:625:8)
> let x = 1;
SyntaxError: Identifier 'x' has already been declared" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>&gt; let x = x<span class="hljs-comment">;</span>
<span class="hljs-symbol">ReferenceError:</span> x is not defined
    <span class="hljs-built_in">at</span> repl:<span class="hljs-number">1</span>:<span class="hljs-number">9</span>
    <span class="hljs-built_in">at</span> ContextifyScript.<span class="hljs-keyword">Script.runInThisContext </span>(vm.<span class="hljs-keyword">js:44:33)
</span>    <span class="hljs-built_in">at</span> REPLServer.defaultEval (repl.<span class="hljs-keyword">js:239:29)
</span>    <span class="hljs-built_in">at</span> <span class="hljs-keyword">bound </span>(domain.<span class="hljs-keyword">js:301:14)
</span>    <span class="hljs-built_in">at</span> REPLServer.runBound [as eval] (domain.<span class="hljs-keyword">js:314:12)
</span>    <span class="hljs-built_in">at</span> REPLServer.onLine (repl.<span class="hljs-keyword">js:433:10)
</span>    <span class="hljs-built_in">at</span> emitOne (events.<span class="hljs-keyword">js:120:20)
</span>    <span class="hljs-built_in">at</span> REPLServer.emit (events.<span class="hljs-keyword">js:210:7)
</span>    <span class="hljs-built_in">at</span> REPLServer.Interface._onLine (readline.<span class="hljs-keyword">js:278:10)
</span>    <span class="hljs-built_in">at</span> REPLServer.Interface._line (readline.<span class="hljs-keyword">js:625:8)
</span>&gt; let x = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
<span class="hljs-symbol">SyntaxError:</span> Identifier <span class="hljs-string">'x'</span> has already <span class="hljs-keyword">been </span>declared</code></pre>
<h2 id="articleHeader9">函数的生命周期与提升</h2>
<p>基础的函数提升同样会将声明提升至作用域头部，不过不同于变量提升，函数同样会将其函数体定义提升至头部；譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function b() {  
   a = 10;  
   return;  
   function a() {} 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">()</span> </span>{  
   a = <span class="hljs-number">10</span>;  
   <span class="hljs-keyword">return</span>;  
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span> </span>{} 
} </code></pre>
<p>会被编译器修改为如下模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function b() {
  function a() {}
  a = 10;
  return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span> </span>{}
  a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">return</span>;
}</code></pre>
<p>在内存创建步骤中，JavaScript 解释器会通过 function 关键字识别出函数声明并且将其提升至头部；函数的生命周期则比较简单，声明、初始化与赋值三个步骤都被提升到了作用域头部：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010640232" src="https://static.alili.tech/img/remote/1460000010640232" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果我们在作用域中重复地声明同名函数，则会由后者覆盖前者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sayHello();

function sayHello () {
    function hello () {
        console.log('Hello!');
    }
    
    hello();
    
    function hello () {
        console.log('Hey!');
    }
}

// Hey!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>sayHello();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello!'</span>);
    }
    
    hello();
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hey!'</span>);
    }
}

<span class="hljs-comment">// Hey!</span></code></pre>
<p>而 JavaScript 中提供了两种函数的创建方式，函数声明（Function Declaration）与函数表达式（Function Expression）；函数声明即是以 function 关键字开始，跟随者函数名与函数体。而函数表达式则是先声明函数名，然后赋值匿名函数给它；典型的函数表达式如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sayHello = function() {
  console.log('Hello!');
};

sayHello();

// Hello!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello!'</span>);
};

sayHello();

<span class="hljs-comment">// Hello!</span></code></pre>
<p>函数表达式遵循变量提升的规则，函数体并不会被提升至作用域头部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sayHello();

function sayHello () {
    function hello () {
        console.log('Hello!');
    }
    
    hello();
    
    var hello = function () {
        console.log('Hey!');
    }
}

// Hello!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>sayHello();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello!'</span>);
    }
    
    hello();
    
    <span class="hljs-keyword">var</span> hello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hey!'</span>);
    }
}

<span class="hljs-comment">// Hello!</span></code></pre>
<p>在 ES5 中，是不允许在块级作用域中创建函数的；而 ES6 中允许在块级作用域中创建函数，块级作用域中创建的函数同样会被提升至当前块级作用域头部与函数作用域头部。不同的是函数体并不会再被提升至函数作用域头部，而仅会被提升到块级作用域头部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f; // Uncaught ReferenceError: f is not defined
(function () {
  f; // undefined
  x; // Uncaught ReferenceError: x is not defined
  if (true) {
    f();
    let x;
    function f() { console.log('I am function!'); }
  }
  
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>f; <span class="hljs-comment">// Uncaught ReferenceError: f is not defined</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
  f; <span class="hljs-comment">// undefined</span>
  x; <span class="hljs-comment">// Uncaught ReferenceError: x is not defined</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    f();
    <span class="hljs-built_in">let</span> x;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">()</span> {</span> console.<span class="hljs-built_in">log</span>('I am <span class="hljs-function"><span class="hljs-keyword">function</span>!'); }
  }
  
}<span class="hljs-params">()</span>);</span></code></pre>
<h1 id="articleHeader10">避免全局变量</h1>
<p>在计算机编程中，全局变量指的是在所有作用域中都能访问的变量。全局变量是一种不好的实践，因为它会导致一些问题，比如一个已经存在的方法和全局变量的覆盖，当我们不知道变量在哪里被定义的时候，代码就变得很难理解和维护了。在 ES6 中可以利用 <code>let</code> 关键字来声明本地变量，好的 JavaScript 代码就是没有定义全局变量的。在 JavaScript 中，我们有时候会无意间创建出全局变量，即如果我们在使用某个变量之前忘了进行声明操作，那么该变量会被自动认为是全局变量，譬如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(){
  hello = &quot;Hello World&quot;;
  return hello;
}
sayHello();
console.log(hello);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params"></span>)</span>{
  hello = <span class="hljs-string">"Hello World"</span>;
  <span class="hljs-keyword">return</span> hello;
}
sayHello();
<span class="hljs-built_in">console</span>.log(hello);</code></pre>
<p>在上述代码中因为我们在使用 sayHello 函数的时候并没有声明 hello 变量，因此其会创建作为某个全局变量。如果我们想要避免这种偶然创建全局变量的错误，可以通过强制使用 <a href="https://www.sitepoint.com/premium/books/javascript-novice-to-ninja/preview/strict-mode-719892c" rel="nofollow noreferrer" target="_blank">strict mode</a> 来禁止创建全局变量。</p>
<h2 id="articleHeader11">函数包裹</h2>
<p>为了避免全局变量，第一件事情就是要确保所有的代码都被包在函数中。最简单的办法就是把所有的代码都直接放到一个函数中去:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(win) {
    &quot;use strict&quot;; // 进一步避免创建全局变量
    var doc = window.document;
    // 在这里声明你的变量
    // 一些其他的代码
}(window));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">win</span>) </span>{
<span class="hljs-meta">    "use strict"</span>; <span class="hljs-comment">// 进一步避免创建全局变量</span>
    <span class="hljs-keyword">var</span> doc = <span class="hljs-built_in">window</span>.document;
    <span class="hljs-comment">// 在这里声明你的变量</span>
    <span class="hljs-comment">// 一些其他的代码</span>
}(<span class="hljs-built_in">window</span>));</code></pre>
<h2 id="articleHeader12">声明命名空间</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyApp = {
    namespace: function(ns) {
        var parts = ns.split(&quot;.&quot;),
            object = this, i, len;
        for(i = 0, len = parts.lenght; i < len; i ++) {
            if(!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }
    return object;
    }
};

// 定义命名空间
MyApp.namespace(&quot;Helpers.Parsing&quot;);

// 你现在可以使用该命名空间了
MyApp.Helpers.Parsing.DateParser = function() {
    //做一些事情
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> MyApp = {
    <span class="hljs-attr">namespace</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ns</span>) </span>{
        <span class="hljs-keyword">var</span> parts = ns.split(<span class="hljs-string">"."</span>),
            object = <span class="hljs-keyword">this</span>, i, len;
        <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>, len = parts.lenght; i &lt; len; i ++) {
            <span class="hljs-keyword">if</span>(!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }
    <span class="hljs-keyword">return</span> object;
    }
};

<span class="hljs-comment">// 定义命名空间</span>
MyApp.namespace(<span class="hljs-string">"Helpers.Parsing"</span>);

<span class="hljs-comment">// 你现在可以使用该命名空间了</span>
MyApp.Helpers.Parsing.DateParser = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//做一些事情</span>
};</code></pre>
<h2 id="articleHeader13">模块化</h2>
<p>另一项开发者用来避免全局变量的技术就是封装到模块 <code>Module</code> 中。一个模块就是不需要创建新的全局变量或者命名空间的通用的功能。不要将所有的代码都放一个负责执行任务或者发布接口的函数中。这里以异步模块定义 <code>Asynchronous Module Definition (AMD)</code> 为例，更详细的 JavaScript 模块化相关知识参考 <a href="https://zhuanlan.zhihu.com/p/26231889" rel="nofollow noreferrer" target="_blank">JavaScript 模块演化简史</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义
define( &quot;parsing&quot;, //模块名字
        [ &quot;dependency1&quot;, &quot;dependency2&quot; ], // 模块依赖
        function( dependency1, dependency2) { //工厂方法

            // Instead of creating a namespace AMD modules
            // are expected to return their public interface
            var Parsing = {};
            Parsing.DateParser = function() {
              //do something
            };
            return Parsing;
        }
);

// 通过 Require.js 加载模块
require([&quot;parsing&quot;], function(Parsing) {
    Parsing.DateParser(); // 使用模块
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-comment">//定义</span>
define( <span class="hljs-string">"parsing"</span>, <span class="hljs-comment">//模块名字</span>
        [ <span class="hljs-string">"dependency1"</span>, <span class="hljs-string">"dependency2"</span> ], <span class="hljs-comment">// 模块依赖</span>
        function( dependency1, dependency2) { <span class="hljs-comment">//工厂方法</span>

            <span class="hljs-comment">// Instead of creating a namespace AMD modules</span>
            <span class="hljs-comment">// are expected to return their public interface</span>
            var Parsing = {};
            Parsing.DateParser = function() {
              <span class="hljs-comment">//do something</span>
            };
            <span class="hljs-keyword">return</span> Parsing;
        }
);

<span class="hljs-comment">// 通过 Require.js 加载模块</span>
require([<span class="hljs-string">"parsing"</span>], function(Parsing) {
    Parsing.DateParser(); <span class="hljs-comment">// 使用模块</span>
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 变量作用域与提升：变量的生命周期详解

## 原文链接
[https://segmentfault.com/a/1190000010640225](https://segmentfault.com/a/1190000010640225)


---
title: 'JavaScript arguments 对象全面介绍' 
date: 2019-02-02 2:30:11
hidden: true
slug: k9uktrr2ck
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 什么是 arguments</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">MDN</a> 上解释：</p>
<blockquote><p>arguments 是一个类数组对象。代表传给一个function的参数列表。</p></blockquote>
<p>我们先用一个例子直观了解下 JavaScript 中的 arguments 长什么样子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function printArgs() {
    console.log(arguments);
}

printArgs(&quot;A&quot;, &quot;a&quot;, 0, { foo: &quot;Hello, arguments&quot; })；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printArgs</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>);
}

printArgs(<span class="hljs-string">"A"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-number">0</span>, { <span class="hljs-attr">foo</span>: <span class="hljs-string">"Hello, arguments"</span> })；
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;A&quot;, &quot;a&quot;, 0, Object]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[<span class="hljs-string">"A"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-number">0</span>, Object]
</code></pre>
<p>乍一看，结果是个数组，但并不是真正的数组，所以说 arguments 是一个类数组的对象（想了解真正数组与类数组对象的区别可以一直翻到最后）。</p>
<p>再看看 arguments 表示的内容，其表示了函数执行时传入函数的所有参数。在上面的例子中，代表了传入 <code>printArgs</code> 函数中的四个参数，可以分别用 <code>arguments[0]</code>、 <code>arguments[1]</code>... 来获取单个的参数。</p>
<h2 id="articleHeader1">2. arguments 操作</h2>
<h3 id="articleHeader2">2.1 arguments length</h3>
<p>arguments 是个类数组对象，其包含一个 <code>length</code> 属性，可以用 <code>arguments.length</code> 来获得传入函数的参数个数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func() {
    console.log(&quot;The number of parameters is &quot; + arguments.length);
}

func();
func(1, 2);
func(1, 2, 3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"The number of parameters is "</span> + arguments.length)<span class="hljs-comment">;</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span>
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)</span>;</span>
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)</span>;</span>
</code></pre>
<p>执行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="The number of parameters is 0
The number of parameters is 2
The number of parameters is 3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>The <span class="hljs-built_in">number</span> <span class="hljs-keyword">of</span> parameters <span class="hljs-keyword">is</span> <span class="hljs-number">0</span>
The <span class="hljs-built_in">number</span> <span class="hljs-keyword">of</span> parameters <span class="hljs-keyword">is</span> <span class="hljs-number">2</span>
The <span class="hljs-built_in">number</span> <span class="hljs-keyword">of</span> parameters <span class="hljs-keyword">is</span> <span class="hljs-number">3</span>
</code></pre>
<h3 id="articleHeader3">2.2 arguments 转数组</h3>
<p>通常使用下面的方法来将 arguments 转换成数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.slice.call(arguments);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Array</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.slice</span><span class="hljs-selector-class">.call</span>(<span class="hljs-selector-tag">arguments</span>);
</code></pre>
<p>还有一个更简短的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].slice.call(arguments);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[]</span><span class="hljs-selector-class">.slice</span><span class="hljs-selector-class">.call</span>(<span class="hljs-selector-tag">arguments</span>);
</code></pre>
<p>在这里，只是简单地调用了空数组的 slice 方法，而没有从 Array 的原型层面调用。</p>
<p>为什么上面两种方法可以转换呢？</p>
<p>首先，slice 方法得到的结果是一个数组，参数便是 arguments。事实上，满足一定条件的对象都能被 slice 方法转换成数组。看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { 0: &quot;A&quot;, 1: &quot;B&quot;, length: 2 };
const result = [].slice.call(obj);
console.log(Array.isArray(result), result);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-keyword">const</span> obj = { <span class="hljs-number">0</span>: <span class="hljs-string">"A"</span>, <span class="hljs-number">1</span>: <span class="hljs-string">"B"</span>, length: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> result = [].slice.<span class="hljs-keyword">call</span>(obj);
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Array</span>.<span class="hljs-built_in">isArray</span>(result), result);
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true [&quot;A&quot;, &quot;B&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code><span class="hljs-literal">true</span> [<span class="hljs-string">"A"</span>, <span class="hljs-string">"B"</span>]
</code></pre>
<p>从上面例子可以看出，条件就是： 1) 属性为 0，1，2...；2） 具有 length 属性；</p>
<p>另外，有一个需要注意的地方就是，<strong>不能将函数的 arguments 泄露或者传递出去</strong>。什么意思呢？看下面的几个泄露 arguments 的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Leaking arguments example1:
function getArgs() {
    return arguments;
}

// Leaking arguments example2:
function getArgs() {
    const args = [].slice.call(arguments);
    return args;
}

// Leaking arguments example3:
function getArgs() {
    const args = arguments;
    return function() {
        return args;
    };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Leaking arguments example1:</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArgs</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>;
}

<span class="hljs-comment">// Leaking arguments example2:</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArgs</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> args;
}

<span class="hljs-comment">// Leaking arguments example3:</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArgs</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> args;
    };
}
</code></pre>
<p>上面的做法就直接将函数的 arguments 对象泄露出去了，最终的结果就是 V8 引擎将会跳过优化，导致相当大的性能损失。</p>
<p>你可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getArgs() {
    const args = new Array(arguments.length);
    for(let i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    return args;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArgs</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-built_in">arguments</span>.length);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; args.length; ++i) {
        args[i] = <span class="hljs-built_in">arguments</span>[i];
    }
    <span class="hljs-keyword">return</span> args;
}
</code></pre>
<p>那就很好奇了，我们每次使用 arguments 时通常第一步都会将其转换为数组，同时 arguments 使用不当还容易导致性能损失，那么为什么不将 arguments 直接设计成数组对象呢？</p>
<p>这需要从这门语言的一开始说起。arguments 在语言的早期就引入了，当时的 Array 对象具有 4 个方法： toString、 join、 reverse 和 sort。arguments 继承于 Object 的很大原因是不需要这四个方法。而现在，Array 添加了很多强大的方法，比如 forEach、map、filter 等等。那为什么现在不在新的版本里让 arguments 重新继承自 Array呢？其实 ES5 的草案中就包含这一点，但为了向前兼容，最终还是被委员会否决了。</p>
<h3 id="articleHeader4">2.3 修改 arguments 值</h3>
<p>在严格模式与非严格模式下，修改函数参数值表现的结果不一样。看下面的两个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a) {
    &quot;use strict&quot;;
    console.log(a, arguments[0]);
    a = 10;
    console.log(a, arguments[0]);
    arguments[0] = 20;
    console.log(a, arguments[0]);
}
foo(1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-built_in">console</span>.log(a, <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
    a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a, <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
    <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">20</span>;
    <span class="hljs-built_in">console</span>.log(a, <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
}
foo(<span class="hljs-number">1</span>);
</code></pre>
<p>输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 1
10 1
10 20
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span><span class="hljs-number">1</span>
<span class="hljs-symbol">10 </span><span class="hljs-number">1</span>
<span class="hljs-symbol">10 </span><span class="hljs-number">20</span>
</code></pre>
<p>另一个非严格模式的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a) {
    console.log(a, arguments[0]);
    a = 10;
    console.log(a, arguments[0]);
    arguments[0] = 20;
    console.log(a, arguments[0]);
}
foo(1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a, <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
    a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a, <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
    <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">20</span>;
    <span class="hljs-built_in">console</span>.log(a, <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
}
foo(<span class="hljs-number">1</span>);
</code></pre>
<p>输出结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 1
10 10
20 20
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span><span class="hljs-number">1</span>
<span class="hljs-symbol">10 </span><span class="hljs-number">10</span>
<span class="hljs-symbol">20 </span><span class="hljs-number">20</span>
</code></pre>
<p>从上面的两个例子中可以看出，在严格模式下，函数中的参数与 arguments 对象没有联系，修改一个值不会改变另一个值。而在非严格模式下，两个会互相影响。</p>
<h3 id="articleHeader5">2.4 将参数从一个函数传递到另一个函数</h3>
<p>下面是将参数从一个函数传递到另一个函数的推荐做法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    bar.apply(this, arguments);
}
function bar(a, b, c) {
    // logic
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    bar.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-comment">// logic</span>
}
</code></pre>
<h3 id="articleHeader6">2.5 arguments 与重载</h3>
<p>很多语言中都有重载，但 JavaScript 中没有。先看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(num1, num2) {
    console.log(&quot;Method one&quot;);
    return num1 + num2;
}

function add(num1, num2, num3) {
    console.log(&quot;Method two&quot;);
    return num1 + num2 + num3;
}

add(1, 2);
add(1, 2, 3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>function <span class="hljs-keyword">add</span><span class="bash">(num1, num2) {
</span>    console.log(<span class="hljs-string">"Method one"</span>);
    return num1 + num2;
}

function <span class="hljs-keyword">add</span><span class="bash">(num1, num2, num3) {
</span>    console.log(<span class="hljs-string">"Method two"</span>);
    return num1 + num2 + num3;
}

<span class="hljs-keyword">add</span><span class="bash">(1, 2);
</span><span class="hljs-keyword">add</span><span class="bash">(1, 2, 3);
</span></code></pre>
<p>执行结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Method two
Method two
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-function"><span class="hljs-keyword">Method</span> <span class="hljs-title">two</span>
<span class="hljs-title">Method</span> <span class="hljs-title">two</span>
</span></code></pre>
<p>所以，JavaScript 中，函数并没有根据参数的不同而产生不同的调用。</p>
<p>是不是 JavaScript 中就没有重载了呢？并不是，我们可以利用 arguments 模拟重载。还是上面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(num1, num2, num3) {
    if (arguments.length === 2) {
        console.log(&quot;Result is &quot; + (num1 + num2));
    }
    else if (arguments.length === 3) {
        console.log(&quot;Result is &quot; + (num1 + num2 + num3));
    }
}

add(1, 2);
add(1, 2, 3)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">num1, num2, num3</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">2</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Result is "</span> + (num1 + num2));
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">3</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Result is "</span> + (num1 + num2 + num3));
    }
}

add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
</code></pre>
<p>执行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Result is 3
Result is 6
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">Result</span> <span class="hljs-keyword">is</span> <span class="hljs-number">3</span>
<span class="hljs-keyword">Result</span> <span class="hljs-keyword">is</span> <span class="hljs-number">6</span>
</code></pre>
<h2 id="articleHeader7">3. ES6 中的 arguments</h2>
<h3 id="articleHeader8">3.1 扩展操作符</h3>
<p>直接上栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func() {
    console.log(...arguments);
}

func(1, 2, 3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(...arguments)<span class="hljs-comment">;</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)</span>;</span>
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 2 3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span><span class="hljs-number">2</span> <span class="hljs-number">3</span>
</code></pre>
<p>简洁地讲，扩展操作符可以将 arguments 展开成独立的参数。</p>
<h3 id="articleHeader9">3.2 Rest 参数</h3>
<p>还是上栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(firstArg, ...restArgs) {
    console.log(Array.isArray(restArgs));
    console.log(firstArg, restArgs);
}

func(1, 2, 3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span><span class="hljs-params">(firstArg, <span class="hljs-rest_arg">...restArgs</span>)</span> </span>{
    console.log(Array.isArray(restArgs));
    console.log(firstArg, restArgs);
}

func(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true
1 [2, 3]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>true
<span class="hljs-number">1</span> [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
</code></pre>
<p>从上面的结果可以看出，Rest 参数表示除了明确指定剩下的参数集合，类型是 Array。</p>
<h3 id="articleHeader10">3.3 默认参数</h3>
<p>栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(firstArg = 0, secondArg = 1) {
    console.log(arguments[0], arguments[1]);
    console.log(firstArg, secondArg);
}

func(99);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(firstArg = <span class="hljs-number">0</span>, secondArg = <span class="hljs-number">1</span>)</span> {</span>
    console.<span class="hljs-built_in">log</span>(arguments[<span class="hljs-number">0</span>], arguments[<span class="hljs-number">1</span>])<span class="hljs-comment">;</span>
    console.<span class="hljs-built_in">log</span>(firstArg, secondArg)<span class="hljs-comment">;</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(<span class="hljs-number">99</span>)</span>;</span>
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="99 undefined
99 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">99 </span>undefined
<span class="hljs-symbol">99 </span><span class="hljs-number">1</span>
</code></pre>
<p>可见，默认参数对 arguments 没有影响，arguments 还是仅仅表示调用函数时所传入的所有参数。</p>
<h3 id="articleHeader11">3.4 arguments 转数组</h3>
<p><code>Array.from()</code> 是个非常推荐的方法，其可以将所有类数组对象转换成数组。</p>
<h2 id="articleHeader12">4. 数组与类数组对象</h2>
<p>数组具有一个基本特征：索引。这是一般对象所没有的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { 0: &quot;a&quot;, 1: &quot;b&quot; };
const arr = [ &quot;a&quot;, &quot;b&quot; ];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const obj</span> = { 0: <span class="hljs-string">"a"</span>, 1: <span class="hljs-string">"b"</span> };
<span class="hljs-attribute">const arr</span> = [ <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span> ];
</code></pre>
<p>我们利用 <code>obj[0]</code>、<code>arr[0]</code> 都能取得自己想要的数据，但取得数据的方式确实不同的。<code>obj[0]</code> 是利用对象的键值对存取数据，而 <code>arr[0]</code> 却是利用数组的索引。事实上，Object 与 Array 的唯一区别就是 Object 的属性是 string，而 Array 的索引是 number。</p>
<p>下面看看类数组对象。</p>
<p>伪数组的特性就是长得像数组，包含一组数据以及拥有一个 length 属性，但是没有任何 Array 的方法。再具体的说，length 属性是个非负整数，上限是 JavaScript 中能精确表达的最大数字；另外，类数组对象的 length 值无法自动改变。</p>
<p>如何自己创建一个类数组对象？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo() {}
Foo.prototype = Object.create(Array.prototype);

const foo = new Foo();
foo.push('A');
console.log(foo, foo.length);
console.log(&quot;foo is an array? &quot; + Array.isArray(foo));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{}
Foo.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Array</span>.prototype);

<span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">new</span> Foo();
foo.push(<span class="hljs-string">'A'</span>);
<span class="hljs-built_in">console</span>.log(foo, foo.length);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"foo is an array? "</span> + <span class="hljs-built_in">Array</span>.isArray(foo));
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;A&quot;] 1
foo is an array? false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>[<span class="hljs-string">"A"</span>] <span class="hljs-number">1</span>
foo <span class="hljs-keyword">is</span> an <span class="hljs-keyword">array</span>? <span class="hljs-literal">false</span>
</code></pre>
<p>也就是说 Foo 的示例拥有 Array 的所有方法，但类型不是 Array。</p>
<p>如果不需要 Array 的所有方法，只需要部分怎么办呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Bar() {}
Bar.prototype.push = Array.prototype.push;

const bar = new Bar();
bar.push('A');
bar.push('B');
console.log(bar);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>function <span class="hljs-built_in">Bar</span>() {}
<span class="hljs-built_in">Bar</span>.prototype.<span class="hljs-keyword">push</span> = Array.prototype.<span class="hljs-keyword">push</span>;

const <span class="hljs-built_in">bar</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Bar</span>();
<span class="hljs-built_in">bar</span>.<span class="hljs-keyword">push</span>('A');
<span class="hljs-built_in">bar</span>.<span class="hljs-keyword">push</span>('B');
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">bar</span>);
</code></pre>
<p>执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Bar {0: &quot;A&quot;, 1: &quot;B&quot;, length: 2}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Bar</span> {<span class="hljs-attribute">0</span>: <span class="hljs-string">"A"</span>, <span class="hljs-number">1</span>: <span class="hljs-string">"B"</span>, <span class="hljs-attribute">length</span>: <span class="hljs-number">2</span>}
</code></pre>
<p>参考：</p>
<ol>
<li><p><a href="http://www.cnblogs.com/chenpingzhao/p/4764791.html" rel="nofollow noreferrer" target="_blank">JavaScript中的数组与伪数组的区别</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">MDN arguments</a></p></li>
<li><p><a href="http://www.jstips.co/en/avoid-modifying-or-passing-arguments-into-other-functions-it-kills-optimization/" rel="nofollow noreferrer" target="_blank">Avoid modifying or passing arguments into other functions — it kills optimization</a></p></li>
<li><p><a href="https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments" rel="nofollow noreferrer" target="_blank">Optimization killers</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/3242485/why-isnt-a-functions-arguments-object-an-array-in-javascript" rel="nofollow noreferrer" target="_blank">Why isn't a function's arguments object an array in Javascript?</a></p></li>
<li><p><a href="http://wiki.jikexueyuan.com/project/javascript-garden/function/arguments.html" rel="nofollow noreferrer" target="_blank">arguments 对象</a></p></li>
<li><p><a href="http://www.nfriedly.com/techblog/2009/06/advanced-javascript-objects-arrays-and-array-like-objects/" rel="nofollow noreferrer" target="_blank">Advanced Javascript: Objects, Arrays, and Array-Like objects</a></p></li>
<li><p><a href="http://web.jobbole.com/86581/" rel="nofollow noreferrer" target="_blank">JavaScript 特殊对象 Array-Like Objects 详解</a></p></li>
<li><p><a href="http://codereview.stackexchange.com/questions/12142/what-is-a-good-way-create-a-javascript-array-like-object" rel="nofollow noreferrer" target="_blank">What is a good way create a Javascript array-like object?</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript arguments 对象全面介绍

## 原文链接
[https://segmentfault.com/a/1190000007091243](https://segmentfault.com/a/1190000007091243)


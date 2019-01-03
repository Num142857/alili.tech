---
title: 'JavaScript专题之偏函数' 
date: 2019-01-04 2:30:10
hidden: true
slug: 848i2ls8bcw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十四篇，讲解偏函数以及如何实现一个 partial 函数</p></blockquote>
<h2 id="articleHeader0">定义</h2>
<p>维基百科中对偏函数 (Partial application) 的定义为：</p>
<blockquote><p>In computer science, partial application (or partial function application) refers to the process of fixing a number of arguments to a function, producing another function of smaller arity.</p></blockquote>
<p>翻译成中文：</p>
<p>在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。</p>
<p>什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。</p>
<p>举个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 partial 函数可以做到局部应用
var addOne = partial(add, 1);

addOne(2) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// 执行 add 函数，一次传入两个参数即可</span>
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span>

<span class="hljs-comment">// 假设有一个 partial 函数可以做到局部应用</span>
<span class="hljs-keyword">var</span> addOne = partial(add, <span class="hljs-number">1</span>);

addOne(<span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span></code></pre>
<p>个人觉得翻译成“局部应用”或许更贴切些，以下全部使用“局部应用”。</p>
<h2 id="articleHeader1">柯里化与局部应用</h2>
<p>如果看过上一篇文章<a href="https://github.com/mqyqingfeng/Blog/issues/42" rel="nofollow noreferrer" target="_blank">《JavaScript专题之柯里化》</a>，实际上你会发现这个例子和柯里化太像了，所以两者到底是有什么区别呢？</p>
<p>其实也很明显：</p>
<p>柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。</p>
<p>局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。</p>
<p>如果说两者有什么关系的话，引用 <a href="https://github.com/hemanth/functional-programming-jargon#partial-application" rel="nofollow noreferrer" target="_blank">functional-programming-jargon</a> 中的描述就是：</p>
<blockquote><p>Curried functions are automatically partially applied.</p></blockquote>
<h2 id="articleHeader2">partial</h2>
<p>我们今天的目的是模仿 underscore 写一个 partial 函数，比起 curry 函数，这个显然简单了很多。</p>
<p>也许你在想我们可以直接使用 bind 呐，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b;
}

var addOne = add.bind(null, 1);

addOne(2) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-keyword">var</span> addOne = add.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>);

addOne(<span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span></code></pre>
<p>然而使用 bind 我们还是改变了 this 指向，我们要写一个不改变 this 指向的方法。</p>
<h2 id="articleHeader3">第一版</h2>
<p>根据之前的表述，我们可以尝试着写出第一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
// 似曾相识的代码
function partial(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-comment">// 似曾相识的代码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partial</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> newArgs = args.concat([].slice.call(<span class="hljs-built_in">arguments</span>));
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, newArgs);
    };
};</code></pre>
<p>我们来写个 demo 验证下 this 的指向：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b + this.value;
}

// var addOne = add.bind(null, 1);
var addOne = partial(add, 1);

var value = 1;
var obj = {
    value: 2,
    addOne: addOne
}
obj.addOne(2); // ???
// 使用 bind 时，结果为 4
// 使用 partial 时，结果为 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b + <span class="hljs-keyword">this</span>.value;
}

<span class="hljs-comment">// var addOne = add.bind(null, 1);</span>
<span class="hljs-keyword">var</span> addOne = partial(add, <span class="hljs-number">1</span>);

<span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">addOne</span>: addOne
}
obj.addOne(<span class="hljs-number">2</span>); <span class="hljs-comment">// ???</span>
<span class="hljs-comment">// 使用 bind 时，结果为 4</span>
<span class="hljs-comment">// 使用 partial 时，结果为 5</span></code></pre>
<h2 id="articleHeader4">第二版</h2>
<p>然而正如 curry 函数可以使用占位符一样，我们希望 partial 函数也可以实现这个功能，我们再来写第二版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
var _ = {};

function partial(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var position = 0, len = args.length;
        for(var i = 0; i < len; i++) {
            args[i] = args[i] === _ ? arguments[position++] : args[i]
        }
        while(position < arguments.length) args.push(argumetns[position++]);
        return fn.apply(this, args);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-keyword">var</span> _ = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partial</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> position = <span class="hljs-number">0</span>, len = args.length;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
            args[i] = args[i] === _ ? <span class="hljs-built_in">arguments</span>[position++] : args[i]
        }
        <span class="hljs-keyword">while</span>(position &lt; <span class="hljs-built_in">arguments</span>.length) args.push(argumetns[position++]);
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, args);
    };
};</code></pre>
<p>我们验证一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subtract = function(a, b) { return b - a; };
subFrom20 = partial(subtract, _, 20);
subFrom20(5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subtract = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{ <span class="hljs-keyword">return</span> b - a; };
subFrom20 = partial(subtract, _, <span class="hljs-number">20</span>);
subFrom20(<span class="hljs-number">5</span>);</code></pre>
<h2 id="articleHeader5">写在最后</h2>
<p>值得注意的是：underscore 和 lodash 都提供了 partial 函数，但只有 lodash 提供了 curry 函数。</p>
<h2 id="articleHeader6">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之偏函数

## 原文链接
[https://segmentfault.com/a/1190000010686144](https://segmentfault.com/a/1190000010686144)


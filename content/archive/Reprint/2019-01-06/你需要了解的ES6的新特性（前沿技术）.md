---
title: '你需要了解的ES6的新特性（前沿技术）' 
date: 2019-01-06 2:30:10
hidden: true
slug: p0ig7q2v9ac
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">ES6新特性</h1>
<blockquote>最近在项目中遇到了很多ES6的语法，遇到了不少坑坑洼洼，因此，在这里就简单介绍一下ES6中的一些新特性</blockquote>
<ul>
<li>如果想真正的了解ES6和ES5有什么不同，这里推荐看一下阮一峰的一本<a href="http://es6.ruanyifeng.com/#README" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a>
</li>
<li>在我下面，主要介绍一下ES6标准下的let, const, "=&gt;", "..."的介绍和用法</li>
</ul>
<h2 id="articleHeader1">ES6背景介绍</h2>
<p>ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。</p>
<hr>
<p>那么，<strong>ECMAScript</strong> 和 <strong>JavaScript</strong> 到底是什么关系？</p>
<p>要讲清楚这个问题，需要回顾历史。1996年11月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是1.0版</p>
<h2 id="articleHeader2">let命令</h2>
<h3 id="articleHeader3">基本用法</h3>
<p>ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span>;
}

a <span class="hljs-comment">// ReferenceError: a is not defined.</span>
b <span class="hljs-comment">// 1</span></code></pre>
<p>上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。看到这里，是不是觉得let和C语言还有其他语言的语言很像了呢，确实，其实原理基本都差不多。</p>
<h3 id="articleHeader4">使用注意</h3>
<ol><li>
<strong>不存在变量提升</strong>：var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// var 的情况</span>
console.<span class="hljs-built_in">log</span>(foo); <span class="hljs-comment">// 输出undefined</span>
var foo = <span class="hljs-number">2</span>;

<span class="hljs-comment">// let 的情况</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">bar</span>); <span class="hljs-comment">// 报错ReferenceError</span>
<span class="hljs-keyword">let</span> <span class="hljs-built_in">bar</span> = <span class="hljs-number">2</span>;</code></pre>
<ol><li>
<strong>暂时性死区</strong>：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> tmp = <span class="hljs-number">123</span>;

<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  tmp = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// ReferenceError</span>
  <span class="hljs-keyword">let</span> tmp;
}</code></pre>
<ol><li>
<strong>不允许重复声明</strong>：let不允许在相同作用域内，重复声明同一个变量。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// 报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
}</code></pre>
<ol><li>
<strong>快级作用域</strong>：这个特性是我觉得最奇怪的，原本javascript是作用域链的形式，为什么无缘无故要突然改变了自己之前的主意呢。不过这个也很容易理解，有过C语言和C++等语言基础的就会很了解快级作用域</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> n = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> n = <span class="hljs-number">10</span>;
  }
  <span class="hljs-built_in">console</span>.log(n); <span class="hljs-comment">// 5</span>
}</code></pre>
<p>上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是10。</p>
<hr>
<h2 id="articleHeader5">const命令</h2>
<h3 id="articleHeader6">基本用法</h3>
<p>const声明一个只读的常量。一旦声明，常量的值就不能改变。const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const <span class="hljs-literal">PI</span> = <span class="hljs-number">3.1415</span>;
<span class="hljs-literal">PI</span> <span class="hljs-comment">// 3.1415</span>

<span class="hljs-literal">PI</span> = <span class="hljs-number">3</span>;
<span class="hljs-comment">// TypeError: Assignment to constant variable.</span></code></pre>
<h3 id="articleHeader7">使用注意</h3>
<ol><li>
<strong>仅仅保证地址不变</strong>const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> a = [];
a.push(<span class="hljs-string">'Hello'</span>); <span class="hljs-comment">// 可执行</span>
a.length = <span class="hljs-number">0</span>;    <span class="hljs-comment">// 可执行</span>
a = [<span class="hljs-string">'Dave'</span>];    <span class="hljs-comment">// 报错</span></code></pre>
<hr>
<h2 id="articleHeader8">箭头函数"=&gt;"</h2>
<h3 id="articleHeader9">基本用法</h3>
<p>ES6 允许使用“箭头”（=&gt;）定义函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = v => v;

//等同于
var f = function(v) {
  return v;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v;

<span class="hljs-comment">//等同于</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
  <span class="hljs-keyword">return</span> v;
};</code></pre>
<h3 id="articleHeader10">使用注意</h3>
<ol>
<li>函数体内的<strong>this对象</strong>，就是定义时所在的对象，而不是使用时所在的对象。</li>
<li>不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。</li>
<li>不可以使用<strong>arguments</strong>对象，该对象在函数体内不存在。如果要用，可以用<strong> rest </strong>参数代替。</li>
<li>不可以使用<strong>yield</strong>命令，因此箭头函数不能用作 Generator 函数。</li>
</ol>
<blockquote>这里说一下最重要的第一点吧</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, <span class="hljs-keyword">this</span>.id);
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-keyword">var</span> id = <span class="hljs-number">21</span>;

foo.call({ <span class="hljs-attr">id</span>: <span class="hljs-number">42</span> });
<span class="hljs-comment">// id: 42</span></code></pre>
<p>上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。</p>
<hr>
<h2 id="articleHeader11">数组拓展运算符"..." rest 参数</h2>
<h3 id="articleHeader12">基本用法</h3>
<p>扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(...[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
<span class="hljs-comment">// 1 2 3</span>

console.log(<span class="hljs-number">1</span>, ...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-number">5</span>)
<span class="hljs-comment">// 1 2 3 4 5</span>

[...document.querySelectorAll('div')]
<span class="hljs-comment">// [&lt;div&gt;, &lt;div&gt;, &lt;div&gt;]</span></code></pre>
<p>也可以运用于函数及其他</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-rest_arg">...values</span>)</span> </span>{
  let sum = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> val of values) {
    sum += val;
  }

  <span class="hljs-keyword">return</span> sum;
}

add(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// 10</span></code></pre>
<hr>
<p>文中就简单介绍这么多，想更加了解ES6新特性的可以自寻查看一下阮一峰的一本<a href="http://es6.ruanyifeng.com/#README" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你需要了解的ES6的新特性（前沿技术）

## 原文链接
[https://segmentfault.com/a/1190000010365014](https://segmentfault.com/a/1190000010365014)


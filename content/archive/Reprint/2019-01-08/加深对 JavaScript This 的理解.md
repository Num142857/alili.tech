---
title: '加深对 JavaScript This 的理解' 
date: 2019-01-08 2:30:11
hidden: true
slug: y5pbv9508k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>欢迎来我的博客阅读：<a href="http://huang-jerryc.com/2017/07/15/understand-this-of-javascript/" rel="nofollow noreferrer" target="_blank">《加深对 JavaScript This 的理解》</a></p></blockquote>
<p>我相信你已经看过很多关于 JavaScript 的 <code>this</code>  的谈论了，既然你点进来了，不妨继续看下去，看是否能帮你加深对 <code>this</code> 的理解。</p>
<p>最近在看 <a href="https://github.com/getify/You-Dont-Know-JS" rel="nofollow noreferrer" target="_blank">《You Dont Know JS》</a> 这本书，不得感叹，就算用了 JS 很多年的老前端来看这本书，我觉得还是会有不少的收获。</p>
<p>其中关于 <code>this</code> 的讲解，更是加深了我对 <code>this</code> 的理解，故整理知识点，再加上自身的理解，以自己的语言来描述。<br>对读者来说，算是二手知识，这本书是开源的，可以到本书的 Github 项目地址学习一手的知识。</p>
<p>首先有一句大家都明白的话，我还是要强调一遍：<br><strong>「<code>this</code> 是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。」</strong></p>
<p>这句话很重要，这是理解 <code>this</code> 原理的基础。<br>而在讲解 <code>this</code> 之前，先要理解一下作用域的相关概念。</p>
<h1 id="articleHeader0">「词法作用域」与「动态作用域」</h1>
<p>通常来说，作用域一共有两种主要的工作模型。</p>
<ul>
<li>词法作用域</li>
<li>动态作用域</li>
</ul>
<p>词法作用域是大多数编程语言所采用的模式，而动态作用域仍有一些编程语言在用，例如 Bash 脚本。<br>而 JavaScript 就是采用的词法作用域，也就是在编程阶段，作用域就已经明确下来了。</p>
<p>思考下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  console.log(a);   // 输出 2
}

function bar(){
  let a = 3;
  foo();
}

let a = 2;

bar()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">// 输出 2</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">3</span>;
  foo();
}

<span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>;

bar()</code></pre>
<p>因为 JavaScript 所用的是词法作用域，自然 <code>foo()</code> 声明的阶段，就已经确定了变量 <code>a</code> 的作用域了。</p>
<p>倘若，JavaScript 是采用的动态作用域，<code>foo()</code> 中打印的将是 <code>3</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  console.log(a);   // 输出 3 （不是 2）
}

function bar(){
  let a = 3;
  foo();
}

let a = 2;

bar()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">// 输出 3 （不是 2）</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">3</span>;
  foo();
}

<span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>;

bar()</code></pre>
<p>而 JavaScript 的 <code>this</code> 机制跟动态作用域很相似，是在运行时在被调用的地方动态绑定的。</p>
<h1 id="articleHeader1">this 的四种绑定规则</h1>
<p>在 JavaScript 中，影响 this 指向的绑定规则有四种：</p>
<ul>
<li>默认绑定</li>
<li>隐式绑定</li>
<li>显式绑定</li>
<li>new 绑定</li>
</ul>
<h2 id="articleHeader2">默认绑定</h2>
<p>这是最直接的一种方式，就是不加任何的修饰符直接调用函数，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log(this.a)   // 输出 a
}

var a = 2;  //  变量声明到全局对象中

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)   <span class="hljs-comment">// 输出 a</span>
}

<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;  <span class="hljs-comment">//  变量声明到全局对象中</span>

foo();</code></pre>
<p>使用 <code>var</code> 声明的变量 <code>a</code>，被绑定到全局对象中，如果是浏览器，则是在 <code>window</code> 对象。<br><code>foo()</code> 调用时，引用了默认绑定，<code>this</code> 指向了全局对象。</p>
<h2 id="articleHeader3">隐式绑定</h2>
<p>这种情况会发生在调用位置存在「上下文对象」的情况，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log(this.a);
}

let obj1 = {
  a: 1,
  foo,
};

let obj2 = {
  a: 2,
  foo,
}

obj1.foo();   // 输出 1
obj2.foo();   // 输出 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}

<span class="hljs-keyword">let</span> obj1 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  foo,
};

<span class="hljs-keyword">let</span> obj2 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
  foo,
}

obj1.foo();   <span class="hljs-comment">// 输出 1</span>
obj2.foo();   <span class="hljs-comment">// 输出 2</span></code></pre>
<p>当函数调用的时候，拥有上下文对象的时候，<code>this</code> 会被绑定到该上下文对象。<br>正如上面的代码，<br><code>obj1.foo()</code> 被调用时，<code>this</code> 绑定到了 <code>obj1</code>, <br>而 <code>obj2.foo()</code> 被调用时，<code>this</code> 绑定到了 <code>obj2</code>。</p>
<h2 id="articleHeader4">显式绑定</h2>
<p>这种就是使用 <code>Function.prototype</code> 中的三个方法 <code>call()</code>, <code>apply()</code>, <code>bind()</code> 了。<br>这三个函数，都可以改变函数的 <code>this</code> 指向到指定的对象，<br>不同之处在于，<code>call()</code> 和 <code>apply()</code> 是立即执行函数，并且接受的参数的形式不同：</p>
<ul>
<li><code>call(this, arg1, arg2, ...)</code></li>
<li><code>apply(this, [arg1, arg2, ...])</code></li>
</ul>
<p>而 <code>bind()</code> 则是创建一个新的包装函数，并且返回，而不是立刻执行。</p>
<ul><li><code>bind(this, arg1, arg2, ...)</code></li></ul>
<p><code>apply()</code> 接收参数的形式，有助于函数嵌套函数的时候，把 <code>arguments</code> 变量传递到下一层函数中。</p>
<p>思考下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log(this.a);  // 输出 1
  bar.apply({a: 2}, arguments);
}

function bar(b) {
  console.log(this.a + b);  // 输出 5
}

var a = 1;
foo(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);  <span class="hljs-comment">// 输出 1</span>
  bar.apply({<span class="hljs-attr">a</span>: <span class="hljs-number">2</span>}, <span class="hljs-built_in">arguments</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">b</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a + b);  <span class="hljs-comment">// 输出 5</span>
}

<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
foo(<span class="hljs-number">3</span>);</code></pre>
<p>上面代码中， <code>foo()</code> 内部的 <code>this</code> 遵循默认绑定规则，绑定到全局变量中。<br>而 <code>bar()</code> 在调用的时候，调用了 <code>apply()</code> 函数，把 <code>this</code> 绑定到了一个新的对象中 <code>{a: 2}</code>，而且原封不动的接收 <code>foo()</code> 接收的函数。</p>
<h2 id="articleHeader5">new 绑定</h2>
<p>最后一种，则是使用 <code>new</code> 操作符会产生 <code>this</code> 的绑定。<br>在理解 <code>new</code> 操作符对 <code>this</code> 的影响，首先要理解 <code>new</code> 的原理。<br>在 JavaScript 中，<code>new</code> 操作符并不像其他面向对象的语言一样，而是一种模拟出来的机制。<br>在 JavaScript 中，所有的函数都可以被 <code>new</code> 调用，这时候这个函数一般会被称为「构造函数」，实际上并不存在所谓「构造函数」，更确切的理解应该是对于函数的「构造调用」。</p>
<p>使用 <code>new</code> 来调用函数，会自动执行下面操作：</p>
<ol>
<li>创建一个全新的对象。</li>
<li>这个新对象会被执行 [[Prototype]] 连接。</li>
<li>这个新对象会绑定到函数调用的 this。</li>
<li>如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。</li>
</ol>
<p>所以如果 <code>new</code> 是一个函数的话，会是这样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function New(Constructor, ...args){
    let obj = {};   // 创建一个新对象
    Object.setPrototypeOf(obj, Constructor.prototype);  // 连接新对象与函数的原型
    return Constructor.apply(obj, args) || obj;   // 执行函数，改变 this 指向新的对象
}

function Foo(a){
    this.a = a;
}

New(Foo, 1);  // Foo { a: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">New</span>(<span class="hljs-params">Constructor, ...args</span>)</span>{
    <span class="hljs-keyword">let</span> obj = {};   <span class="hljs-comment">// 创建一个新对象</span>
    <span class="hljs-built_in">Object</span>.setPrototypeOf(obj, Constructor.prototype);  <span class="hljs-comment">// 连接新对象与函数的原型</span>
    <span class="hljs-keyword">return</span> Constructor.apply(obj, args) || obj;   <span class="hljs-comment">// 执行函数，改变 this 指向新的对象</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">this</span>.a = a;
}

New(Foo, <span class="hljs-number">1</span>);  <span class="hljs-comment">// Foo { a: 1 }</span></code></pre>
<p>所以，在使用 <code>new</code> 来调用函数时候，我们会构造一个新对象并把它绑定到函数调用中的 <code>this</code> 上。</p>
<h1 id="articleHeader6">优先级</h1>
<p>如果一个位置发生了多条改变 this 的规则，那么优先级是如何的呢？</p>
<p>看几段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 显式绑定 > 隐式绑定
function foo() {
    console.log(this.a);
}

let obj1 = {
    a: 2,
    foo,
}

obj1.foo();     // 输出 2
obj1.foo.call({a: 1});      // 输出 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 显式绑定 &gt; 隐式绑定</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}

<span class="hljs-keyword">let</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    foo,
}

obj1.foo();     <span class="hljs-comment">// 输出 2</span>
obj1.foo.call({<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>});      <span class="hljs-comment">// 输出 1</span></code></pre>
<p>这说明「显式绑定」的优先级大于「隐式绑定」</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// new 绑定 > 显式绑定
function foo(a) {
    this.a = a;
}

let obj1 = {};

let bar = foo.bind(obj1);
bar(2);
console.log(obj1); // 输出 {a:2}

let obj2 = new bar(3);
console.log(obj1); // 输出 {a:2}
console.log(obj2); // 输出 foo { a: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// new 绑定 &gt; 显式绑定</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">this</span>.a = a;
}

<span class="hljs-keyword">let</span> obj1 = {};

<span class="hljs-keyword">let</span> bar = foo.bind(obj1);
bar(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(obj1); <span class="hljs-comment">// 输出 {a:2}</span>

<span class="hljs-keyword">let</span> obj2 = <span class="hljs-keyword">new</span> bar(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(obj1); <span class="hljs-comment">// 输出 {a:2}</span>
<span class="hljs-built_in">console</span>.log(obj2); <span class="hljs-comment">// 输出 foo { a: 3 }</span></code></pre>
<p>这说明「new 绑定」的优先级大于「显式绑定」<br>而「默认绑定」，毫无疑问是优先级最低的。<br>所以优先级顺序为：</p>
<p><strong>「new 绑定」 &gt; 「显式绑定」 &gt; 「隐式绑定」 &gt; 「默认绑定。」</strong></p>
<h1 id="articleHeader7">所以，this 到底是什么</h1>
<p><code>this</code> 并不是在编写的时候绑定的，而是在运行时绑定的。它的上下文取决于函数调用时的各种条件。<br><code>this</code> 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。<br>当一个函数被调用时，会创建一个「执行上下文」，这个上下文会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。<code>this</code> 就是这个记录的一个属性，会在函数执行的过程中用到。</p>
<h1 id="articleHeader8">参考</h1>
<p><a href="https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&amp;%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes" rel="nofollow noreferrer" target="_blank">《You Dont Know JS》- this &amp; Object Prototypes</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
加深对 JavaScript This 的理解

## 原文链接
[https://segmentfault.com/a/1190000010202788](https://segmentfault.com/a/1190000010202788)


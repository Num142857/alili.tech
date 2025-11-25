---
title: 'ES6 系列之 let 和 const' 
date: 2018-11-29 9:34:56
hidden: true
slug: o83stw5cqqr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">块级作用域的出现</h2>
<p>通过 var 声明的变量存在变量提升的特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (condition) {
    var value = 1;
}
console.log(value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (condition) {
    <span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(value);</code></pre>
<p>初学者可能会觉得只有 condition 为 true 的时候，才会创建 value，如果 condition 为 false，结果应该是报错，然而因为变量提升的原因，代码相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value;
if (condition) {
    value = 1;
}
console.log(value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value;
<span class="hljs-keyword">if</span> (condition) {
    value = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(value);</code></pre>
<p>如果 condition 为 false，结果会是 undefined。</p>
<p>除此之外，在 for 循环中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 10; i++) {
    ...
}
console.log(i); // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    ...
}
<span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 10</span></code></pre>
<p>即便循环已经结束了，我们依然可以访问 i 的值。</p>
<p>为了加强对变量生命周期的控制，ECMAScript 6 引入了块级作用域。</p>
<p>块级作用域存在于：</p>
<ul>
<li>函数内部</li>
<li>块中(字符 { 和 } 之间的区域)</li>
</ul>
<h2 id="articleHeader1">let 和 const</h2>
<p>块级声明用于声明在指定块的作用域之外无法访问的变量。</p>
<p>let 和 const 都是块级声明的一种。</p>
<p>我们来回顾下 let 和 const 的特点：</p>
<p><strong>1.不会被提升</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (false) {
    let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">let</span> value = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// Uncaught ReferenceError: value is not defined</span></code></pre>
<p><strong>2.重复声明报错</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> value = <span class="hljs-number">2</span>; <span class="hljs-comment">// Uncaught SyntaxError: Identifier 'value' has already been declared</span></code></pre>
<p><strong>3.不绑定全局作用域</strong></p>
<p>当在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;
console.log(window.value); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.value); <span class="hljs-comment">// 1</span></code></pre>
<p>然而 let 和 const 不会：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let value = 1;
console.log(window.value); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> value = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.value); <span class="hljs-comment">// undefined</span></code></pre>
<p>再来说下 let 和 const 的区别：</p>
<p>const 用于声明常量，其值一旦被设定不能再被修改，否则会报错。</p>
<p>值得一提的是：const 声明不允许修改绑定，但允许修改值。这意味着当用 const 声明对象时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = {
    value: 1
}

// 没有问题
data.value = 2;
data.num = 3;

// 报错
data = {}; // Uncaught TypeError: Assignment to constant variable." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> data = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
}

<span class="hljs-comment">// 没有问题</span>
data.value = <span class="hljs-number">2</span>;
data.num = <span class="hljs-number">3</span>;

<span class="hljs-comment">// 报错</span>
data = {}; <span class="hljs-comment">// Uncaught TypeError: Assignment to constant variable.</span></code></pre>
<h2 id="articleHeader2">临时死区</h2>
<p>临时死区(Temporal Dead Zone)，简写为 TDZ。</p>
<p>let 和 const 声明的变量不会被提升到作用域顶部，如果在声明之前访问这些变量，会导致报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof value); // Uncaught ReferenceError: value is not defined
let value = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> value); <span class="hljs-comment">// Uncaught ReferenceError: value is not defined</span>
<span class="hljs-keyword">let</span> value = <span class="hljs-number">1</span>;</code></pre>
<p>这是因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 var 声明)，要么将声明放在 TDZ 中(遇到 let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。</p>
<p>看似很好理解，不保证你不犯错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = &quot;global&quot;;

// 例子1
(function() {
    console.log(value);

    let value = 'local';
}());

// 例子2
{
    console.log(value);

    const value = 'local';
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-string">"global"</span>;

<span class="hljs-comment">// 例子1</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);

    <span class="hljs-keyword">let</span> value = <span class="hljs-string">'local'</span>;
}());

<span class="hljs-comment">// 例子2</span>
{
    <span class="hljs-built_in">console</span>.log(value);

    <span class="hljs-keyword">const</span> value = <span class="hljs-string">'local'</span>;
};</code></pre>
<p>两个例子中，结果并不会打印 "global"，而是报错 <code>Uncaught ReferenceError: value is not defined</code>，就是因为 TDZ 的缘故。</p>
<h2 id="articleHeader3">循环中的块级作用域</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
    funcs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    };
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 3</span></code></pre>
<p>一个老生常谈的面试题，解决方案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = (function(i){
        return function() {
            console.log(i);
        }
    }(i))
}
funcs[0](); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
    funcs[i] = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(i);
        }
    }(i))
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 0</span></code></pre>
<p>ES6 的 let 为这个问题提供了新的解决方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
    funcs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    };
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 0</span></code></pre>
<p>问题在于，上面讲了 let 不提升，不能重复声明，不能绑定全局作用域等等特性，可是为什么在这里就能正确打印出 i 值呢？</p>
<p>如果是不重复声明，在循环第二次的时候，又用 let 声明了 i，应该报错呀，就算因为某种原因，重复声明不报错，一遍一遍迭代，i 的值最终还是应该是 5 呀，还有人说 for 循环的<br>设置循环变量的那部分是一个单独的作用域，就比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
  <span class="hljs-keyword">let</span> i = <span class="hljs-string">'abc'</span>;
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">// abc</span>
<span class="hljs-comment">// abc</span>
<span class="hljs-comment">// abc</span></code></pre>
<p>这个例子是对的，如果我们把 let 改成 var 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 3; i++) {
  var i = 'abc';
  console.log(i);
}
// abc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
  <span class="hljs-keyword">var</span> i = <span class="hljs-string">'abc'</span>;
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">// abc</span></code></pre>
<p>为什么结果就不一样了呢，如果有单独的作用域，结果应该是相同的呀……</p>
<p>如果要追究这个问题，就要抛弃掉之前所讲的这些特性！这是因为 let 声明在循环内部的行为是标准中专门定义的，不一定就与 let 的不提升特性有关，其实，在早期的 let 实现中就不包含这一行为。</p>
<p>我们查看<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-for-statement-runtime-semantics-labelledevaluation" rel="nofollow noreferrer" target="_blank"> ECMAScript 规范第 13.7.4.7 节</a>:</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/let/let-ecma.png" src="https://static.alili.techhttps://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/let/let-ecma.png" alt="let 规范" title="let 规范" style="cursor: pointer;"></span></p>
<p>我们会发现，在 for 循环中使用 let 和 var，底层会使用不同的处理方式。</p>
<p>那么当使用 let 的时候底层到底是怎么做的呢？</p>
<p>简单的来说，就是在 <code>for (let i = 0; i &lt; 3; i++)</code> 中，即圆括号之内建立一个隐藏的作用域，这就可以解释为什么:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
  <span class="hljs-keyword">let</span> i = <span class="hljs-string">'abc'</span>;
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">// abc</span>
<span class="hljs-comment">// abc</span>
<span class="hljs-comment">// abc</span></code></pre>
<p>然后<strong>每次迭代循环时都创建一个新变量，并以之前迭代中同名变量的值将其初始化</strong>。这样对于下面这样一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
    funcs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    };
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 0</span></code></pre>
<p>就相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 伪代码
(let i = 0) {
    funcs[0] = function() {
        console.log(i)
    };
}

(let i = 1) {
    funcs[1] = function() {
        console.log(i)
    };
}

(let i = 2) {
    funcs[2] = function() {
        console.log(i)
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 伪代码</span>
(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>) {
    funcs[<span class="hljs-number">0</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i)
    };
}

(<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>) {
    funcs[<span class="hljs-number">1</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i)
    };
}

(<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>) {
    funcs[<span class="hljs-number">2</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i)
    };
};</code></pre>
<p>当执行函数的时候，根据词法作用域就可以找到正确的值，其实你也可以理解为 let 声明模仿了闭包的做法来简化循环过程。</p>
<h2 id="articleHeader4">循环中的 let 和 const</h2>
<p>不过到这里还没有结束，如果我们把 let 改成 const 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];
for (const i = 0; i < 10; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // Uncaught TypeError: Assignment to constant variable." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    };
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// Uncaught TypeError: Assignment to constant variable.</span></code></pre>
<p>结果会是报错，因为虽然我们每次都创建了一个新的变量，然而我们却在迭代中尝试修改 const 的值，所以最终会报错。</p>
<p>说完了普通的 for 循环，我们还有 for in 循环呢~</p>
<p>那下面的结果是什么呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [], object = {a: 1, b: 1, c: 1};
for (var key in object) {
    funcs.push(function(){
        console.log(key)
    });
}

funcs[0]()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [], object = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">1</span>};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> object) {
    funcs.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(key)
    });
}

funcs[<span class="hljs-number">0</span>]()</code></pre>
<p>结果是 'c';</p>
<p>那如果把 var 改成 let 或者 const 呢？</p>
<p>使用 let，结果自然会是 'a'，const 呢？ 报错还是 'a'?</p>
<p>结果是正确打印 'a'，这是因为在 for in 循环中，每次迭代不会修改已有的绑定，而是会创建一个新的绑定。</p>
<h2 id="articleHeader5">Babel</h2>
<p>在 Babel 中是如何编译 let 和 const 的呢？我们来看看编译后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let value = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> value = <span class="hljs-number">1</span>;</code></pre>
<p>编译为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;</code></pre>
<p>我们可以看到 Babel 直接将 let 编译成了 var，如果是这样的话，那么我们来写个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (false) {
    let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">let</span> value = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// Uncaught ReferenceError: value is not defined</span></code></pre>
<p>如果还是直接编译成 var，打印的结果肯定是 undefined，然而 Babel 很聪明，它编译成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (false) {
    var _value = 1;
}
console.log(value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">var</span> _value = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(value);</code></pre>
<p>我们再写个直观的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let value = 1;
{
    let value = 2;
}
value = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> value = <span class="hljs-number">1</span>;
{
    <span class="hljs-keyword">let</span> value = <span class="hljs-number">2</span>;
}
value = <span class="hljs-number">3</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;
{
    var _value = 2;
}
value = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
{
    <span class="hljs-keyword">var</span> _value = <span class="hljs-number">2</span>;
}
value = <span class="hljs-number">3</span>;</code></pre>
<p>本质是一样的，就是改变量名，使内外层的变量名称不一样。</p>
<p>那像 const 的修改值时报错，以及重复声明报错怎么实现的呢？</p>
<p>其实就是在编译的时候直接给你报错……</p>
<p>那循环中的 let 声明呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];
for (let i = 0; i < 10; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    };
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 0</span></code></pre>
<p>Babel 巧妙的编译成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = [];

var _loop = function _loop(i) {
    funcs[i] = function () {
        console.log(i);
    };
};

for (var i = 0; i < 10; i++) {
    _loop(i);
}
funcs[0](); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> funcs = [];

<span class="hljs-keyword">var</span> _loop = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_loop</span>(<span class="hljs-params">i</span>) </span>{
    funcs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    };
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    _loop(i);
}
funcs[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 0</span></code></pre>
<h2 id="articleHeader6">最佳实践</h2>
<p>在我们开发的时候，可能认为应该默认使用 let 而不是 var ，这种情况下，对于需要写保护的变量要使用 const。然而另一种做法日益普及：默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量之的改变是很多 bug 的源头。</p>
<h2 id="articleHeader7">ES6 系列</h2>
<p>ES6 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfen...</a></p>
<p>ES6 系列预计写二十篇左右，旨在加深 ES6 部分知识点的理解，重点讲解块级作用域、标签模板、箭头函数、Symbol、Set、Map 以及 Promise 的模拟实现、模块加载方案、异步处理等内容。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之 let 和 const

## 原文链接
[https://segmentfault.com/a/1190000014951691](https://segmentfault.com/a/1190000014951691)


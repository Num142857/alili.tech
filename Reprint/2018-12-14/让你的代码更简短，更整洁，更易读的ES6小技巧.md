---
title: '让你的代码更简短，更整洁，更易读的ES6小技巧' 
date: 2018-12-14 2:30:11
hidden: true
slug: ffpztasnx8k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">让你的代码更简短，更整洁，更易读的ES6小技巧</h1>
<h2 id="articleHeader1">写在文章前面</h2>
<p>这篇文章翻译自<a href="https://medium.freecodecamp.org/make-your-code-cleaner-shorter-and-easier-to-read-es6-tips-and-tricks-afd4ce25977c" rel="nofollow noreferrer" target="_blank">ES6 tips and tricks to make your code cleaner, shorter, and easier to read!</a>. 文章就代码整洁方面对es6进行了总结。如有错误欢迎指出。</p>
<h2 id="articleHeader2">template literals 模板字符串</h2>
<p>模板字符串使字符串的使用变得比以前更简单了，他们以反引号开始（`），并且能过使用<code>${变量}</code>来插入变量。我们来比较一下下面两行代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fName = 'Peter', sName = 'Smith', age = 43, job= 'photographer';
var a = 'Hi, I\'m ' + fName + ' ' + sName + ', I\'m ' + age + ' and work as a ' + job + '.';
var b = `Hi, I'm ${ fName } ${ sName }, I'm ${ age } and work as a ${ job }.`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fName = <span class="hljs-string">'Peter'</span>, sName = <span class="hljs-string">'Smith'</span>, age = <span class="hljs-number">43</span>, job= <span class="hljs-string">'photographer'</span>;
<span class="hljs-keyword">var</span> a = <span class="hljs-string">'Hi, I\'m '</span> + fName + <span class="hljs-string">' '</span> + sName + <span class="hljs-string">', I\'m '</span> + age + <span class="hljs-string">' and work as a '</span> + job + <span class="hljs-string">'.'</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-string">`Hi, I'm <span class="hljs-subst">${ fName }</span> <span class="hljs-subst">${ sName }</span>, I'm <span class="hljs-subst">${ age }</span> and work as a <span class="hljs-subst">${ job }</span>.`</span>;</code></pre>
<p>一切都变得很美好了是不是，代码更易读了是不是？你可以在大括号内放入任何东西：变量，等式，或者函数的调用。 我将会在后面的整个文章的示例中使用这些方式。</p>
<h2 id="articleHeader3">块级作用域语法</h2>
<p>JavaScript是使用函数作用域的，这就是为什么我们是为什么我们越来越频繁的使用匿名的立即执行函数表达式（iife）来实现整个JavaScript文件的封装。我们这么做是为了把所有的变量隔离在文件内从而避免变量冲突。</p>
<p>现在我们有了块级作用域和两个崭新的块级作用域的变量声明</p>
<h3 id="articleHeader4">
<code>let</code> declaration let命令</h3>
<p>这个命令和var很相似但却又有着显著的不同。因为他是有块级作用域的，声明一个相同名字的新变量可以完全不影响外部的变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 'car' ;
{
    let a = 5;
    console.log(a) // 5
}
console.log(a) // car" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-string">'car'</span> ;
{
    <span class="hljs-keyword">let</span> a = <span class="hljs-number">5</span>;
    <span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// 5</span>
}
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// car</span></code></pre>
<p>因为他是被限制在块级作用域的，他解决了那道非常经典的面试题：“下面这个代码的输出是什么，如何修改让他运行之后成为你想的那个样子？”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 1; i < 5; i++){
    setTimeout(() => { console.log(i); }, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">for</span> (var i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">5</span>; i++){
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(i); }, <span class="hljs-number">1000</span>);
}</code></pre>
<p>这个例子中，输出是“5 5 5 5 5”因为变量<code>i</code>在每次迭代中都会改变。</p>
<p>如果我们把<code>var</code>变为<code>let</code>,一切都变了。 现在，每次循环都会创建一个全新的块级作用域吧i限制在当前的循环，他可以理解为这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{let i = 1; setTimeout(() => { console.log(i) }, 1000)} 
{let i = 2; setTimeout(() => { console.log(i) }, 1000)} 
{let i = 3; setTimeout(() => { console.log(i) }, 1000)} 
{let i = 4; setTimeout(() => { console.log(i) }, 1000)} 
{let i = 5; setTimeout(() => { console.log(i) }, 1000)} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>{let i = <span class="hljs-number">1</span>; setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(i) }, <span class="hljs-number">1000</span>)} 
{let i = <span class="hljs-number">2</span>; setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(i) }, <span class="hljs-number">1000</span>)} 
{let i = <span class="hljs-number">3</span>; setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(i) }, <span class="hljs-number">1000</span>)} 
{let i = <span class="hljs-number">4</span>; setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(i) }, <span class="hljs-number">1000</span>)} 
{let i = <span class="hljs-number">5</span>; setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(i) }, <span class="hljs-number">1000</span>)} </code></pre>
<p><code>var</code> 和 <code>let</code>的另外一个区别是 <code>let</code> 不会像 <code>var</code>一样被变量提升</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ 
    console.log(a); // undefined
    console.log(b); // ReferenceError
    var a = 'car';
    let b = 5;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{ 
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// ReferenceError</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-string">'car'</span>;
    <span class="hljs-keyword">let</span> b = <span class="hljs-number">5</span>;
}</code></pre>
<p>因为他有更为局限的作用域，以及更能被预测的行为，因此一些人甚至认为你应该使用<code>let</code>来代替<code>var</code>, 除非当你真的特别需要变量提升或者更宽松的作用域范围，你再使用<code>var</code></p>
<p>Const</p>
<p>在以前，如果你想在JavaScript中声明一个常量， 习惯性的做法是使用全大写来命名。然鹅，这不是真的去保护了这个变量不能被更改---只是让其他的开发者知道，这是一个常量，它不应该被更改。</p>
<p>现在我们有了<code>const</code>命令.</p>
<p><code>const</code>没有让变量完全不可变，只是锁定他的赋值，当你有一个复杂的变量（数组或者对象）的时候，值还是可以被修改的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    const d = [1, 2, 3, 4];
    const dave = { name: 'David Jones', age: 32};
    d.push(5); 
    dave.job = &quot;salesman&quot;;
    console.log(d);  // [1, 2, 3, 4, 5]
    console.log(dave);  // { age: 32, job: &quot;salesman&quot;, name: 'David Jones'}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    const d = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]<span class="hljs-comment">;</span>
    const dave = { name: 'David Jones', age: <span class="hljs-number">32</span>}<span class="hljs-comment">;</span>
    d.push(<span class="hljs-number">5</span>)<span class="hljs-comment">; </span>
    dave.job = <span class="hljs-string">"salesman"</span><span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">d</span>)<span class="hljs-comment">;  // [1, 2, 3, 4, 5]</span>
    console.log(<span class="hljs-name">dave</span>)<span class="hljs-comment">;  // { age: 32, job: "salesman", name: 'David Jones'}</span>
}</code></pre>
<h3 id="articleHeader5">Problem with block scoping functions函数块级作用域化带来的问题</h3>
<p>函数的声明也可以限制在块级作用域中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    bar(); // works
    function bar() { /* do something */ }
}
bar();  // doesn't work" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
    bar(); <span class="hljs-comment">// works</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span> </span>{ <span class="hljs-comment">/* do something */</span> }
}
bar();  <span class="hljs-comment">// doesn't work</span></code></pre>
<p>但是当你在一个<code>if</code>语句中声明一个函数的时候问题来了。</p>
<p>想一下这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ( something) {
    function baz() { console.log('I passed') }
} else {
    function baz() { console.log('I didn\'t pass') } 
} 
baz();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> ( something) {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I passed'</span>) }
} <span class="hljs-keyword">else</span> {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I didn\'t pass'</span>) } 
} 
baz();</code></pre>
<p>在ES6之前，这两个函数声明都被变量提升，而且结果一定是<code>I didn't pass</code> 不论条件中的something是什么。但现在我们会得到输出<code>ReferenceError</code>, 因为 <code>baz</code>一直被限定在块级作用域内。</p>
<h2 id="articleHeader6">Spread 扩展运算符</h2>
<p>ES6介绍了<code>...</code>操作符，这个操作符指的就是‘扩展运算符‘。他的主要用途有两个：1. 将一个数组或者对象放到一个新的数组或者对象中 2. 将数组中的多个参数合并在一起</p>
<p>第一个用途可能是你将会使用的最多的。所以我们先来看他。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [3, 4, 5];
let b = [1, 2, ...a, 6];
console.log(b);  // [1, 2, 3, 4, 5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let a = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
let b = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, ...a, <span class="hljs-number">6</span>];
console.log(b);  <span class="hljs-comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>
<p>如果我们想把一个数组内的一组参数传递给函数，这个时候扩展运算符就十分的有用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a, b, c) { 
console.log(`a=${a}, b=${b}, c=${c}`)
} 
let data = [5, 15, 2];
foo( ...data); // a=5, b=15, c=2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b, c</span>) </span>{ 
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`a=<span class="hljs-subst">${a}</span>, b=<span class="hljs-subst">${b}</span>, c=<span class="hljs-subst">${c}</span>`</span>)
} 
<span class="hljs-keyword">let</span> data = [<span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">2</span>];
foo( ...data); <span class="hljs-comment">// a=5, b=15, c=2</span></code></pre>
<p>一个对象也可以扩展的，它会把每个键值对写入新的对象中。（ 对象扩展已经在提议的第四阶段，而且将会在es2018中正式出现 。但这种特性目前只被chrome60及以后的版本，Firefox55及以后，node 6.4.0及以后的版本所支持）【译者注：在<a href="http://2ality.com/2017/02/ecmascript-2018.html" rel="nofollow noreferrer" target="_blank">2ality博客中的es2018</a>一文中得知，在刚刚结束的TC39会议中，ECMA2018的特性被敲定了。】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let car = { type: 'vehicle ', wheels: 4};
let fordGt = { make: 'Ford', ...car, model: 'GT'};
console.log(fordGt); // {make: 'Ford', model: 'GT', type: 'vehicle', wheels: 4}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> car = { type: <span class="hljs-string">'vehicle '</span>, wheels: <span class="hljs-number">4</span>};
<span class="hljs-keyword">let</span> fordGt = { make: <span class="hljs-string">'Ford'</span>, ...car, model: <span class="hljs-string">'GT'</span>};
console.log(fordGt); // {make: <span class="hljs-string">'Ford'</span>, model: <span class="hljs-string">'GT'</span>, type: <span class="hljs-string">'vehicle'</span>, wheels: <span class="hljs-number">4</span>}</code></pre>
<p>扩展运算符的另一个特点是，他可以生成一个&lt;mark&gt;新的数组或者对象&lt;/mark&gt;. 下面的这个例子，就是b就是新建的数组，但c只是引用同一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [1, 2, 3];
let b = [ ...a ];
let c = a;
b.push(4);
console.log(a);  // [1, 2, 3]
console.log(b);  // [1, 2, 3, 4] 不同的数组
c.push(5);
console.log(a);  // [1, 2, 3, 5] 
console.log(c);  // [1, 2, 3, 5] 同一个数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> b = [ ...a ];
<span class="hljs-keyword">let</span> c = a;
b.<span class="hljs-keyword">push</span>(<span class="hljs-number">4</span>);
console.<span class="hljs-built_in">log</span>(a);  <span class="hljs-comment">// [1, 2, 3]</span>
console.<span class="hljs-built_in">log</span>(b);  <span class="hljs-comment">// [1, 2, 3, 4] 不同的数组</span>
c.<span class="hljs-keyword">push</span>(<span class="hljs-number">5</span>);
console.<span class="hljs-built_in">log</span>(a);  <span class="hljs-comment">// [1, 2, 3, 5] </span>
console.<span class="hljs-built_in">log</span>(c);  <span class="hljs-comment">// [1, 2, 3, 5] 同一个数组</span></code></pre>
<p>第二个用法是把变量聚集到一个数组里面。当你不知道一个函数到底有多少的传参的时候会这个方法会变得非常的有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(...args) {
    console.log(args); 
} 
foo( 'car', 54, 'tree');  //  [ 'car', 54, 'tree' ] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    console.log(args); 
} 
foo( <span class="hljs-string">'car'</span>, <span class="hljs-number">54</span>, <span class="hljs-string">'tree'</span>);  <span class="hljs-comment">//  [ 'car', 54, 'tree' ] </span></code></pre>
<h2 id="articleHeader7">Default Parameter 参数默认值</h2>
<p>函数现在可以使用默认的参数值来定义了。不传参或者未定义值都被初始化为默认值。但是需要注意的是，null和false都会被强转为0.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo( a = 5, b = 10) {
    console.log( a + b);
} 
foo();  // 15
foo( 7, 12 );  // 19
foo( undefined, 8 ); // 13
foo( 8 ); // 18
foo( null ); // 10 as null is coerced to 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">foo</span>( a = <span class="hljs-number">5</span>, b = <span class="hljs-number">10</span>) {
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>( a + b);
} 
<span class="hljs-selector-tag">foo</span>();  <span class="hljs-comment">// 15</span>
<span class="hljs-selector-tag">foo</span>( <span class="hljs-number">7</span>, <span class="hljs-number">12</span> );  <span class="hljs-comment">// 19</span>
<span class="hljs-selector-tag">foo</span>( undefined, <span class="hljs-number">8</span> ); <span class="hljs-comment">// 13</span>
<span class="hljs-selector-tag">foo</span>( <span class="hljs-number">8</span> ); <span class="hljs-comment">// 18</span>
<span class="hljs-selector-tag">foo</span>( null ); <span class="hljs-comment">// 10 as null is coerced to 0</span></code></pre>
<p>默认值的类型可以不仅仅是值类型---还可以是表达式或者函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo( a ) { return a * 4; }
function bar( x = 2, y = x + 4, z = foo(x)) {
    console.log([ x, y, z ]);
}
bar();  // [ 2, 6, 8 ]
bar( 1, 2, 3 ); //[ 1, 2, 3 ] 
bar( 10, undefined, 3 );  // [ 10, 14, 3 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"> a </span>) </span>{ <span class="hljs-keyword">return</span> a * <span class="hljs-number">4</span>; }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"> x = <span class="hljs-number">2</span>, y = x + <span class="hljs-number">4</span>, z = foo(x</span>)) </span>{
    <span class="hljs-built_in">console</span>.log([ x, y, z ]);
}
bar();  <span class="hljs-comment">// [ 2, 6, 8 ]</span>
bar( <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ); <span class="hljs-comment">//[ 1, 2, 3 ] </span>
bar( <span class="hljs-number">10</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-number">3</span> );  <span class="hljs-comment">// [ 10, 14, 3 ]</span></code></pre>
<h2 id="articleHeader8">Destructuring解构</h2>
<p>解构是拆开等号左边的数组或者对象的过程。这个数组或者对象可以来自一个变量，一个函数，或者一个等式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [ a, b, c ] = [ 6, 2, 9];
console.log(`a=${a}, b=${b}, c=${c}`); //a=6, b=2, c=9

function foo() { return ['car', 'dog', 6 ]; } 
let [ x, y, z ] = foo();
console.log(`x=${x}, y=${y}, z=${z}`);  // x=car, y=dog, z=6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> [ a, b, c ] = [ <span class="hljs-number">6</span>, <span class="hljs-number">2</span>, <span class="hljs-number">9</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`a=<span class="hljs-subst">${a}</span>, b=<span class="hljs-subst">${b}</span>, c=<span class="hljs-subst">${c}</span>`</span>); <span class="hljs-comment">//a=6, b=2, c=9</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> [<span class="hljs-string">'car'</span>, <span class="hljs-string">'dog'</span>, <span class="hljs-number">6</span> ]; } 
<span class="hljs-keyword">let</span> [ x, y, z ] = foo();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`x=<span class="hljs-subst">${x}</span>, y=<span class="hljs-subst">${y}</span>, z=<span class="hljs-subst">${z}</span>`</span>);  <span class="hljs-comment">// x=car, y=dog, z=6</span></code></pre>
<p>对象类型的结构，可以在花括号内列出对象的键来提取键值对。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bar() { return {a: 1, b: 2, c: 3}; }
let { a, c } = bar();
console.log(a); // 1
console.log(c); // 3
console.log(b); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>}; }
<span class="hljs-keyword">let</span> { a, c } = bar();
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(c); <span class="hljs-comment">// 3</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// undefined</span></code></pre>
<p>有时，你可能想提取出值然后费赔给新的变量，这个可以通过在等号左侧使用一个“key:variable”(键：变量名)来完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function baz() { 
    return {
        x: 'car',
        y: 'London',
        z: { name: 'John', age: 21}
    }; 
}
let { x: vehicle, y: city, z: { name: driver } } = baz();
console.log(
    `I'm going to ${city} with ${driver} in their ${vehicle}.`
); // I'm going to London with John in their car. " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span>: <span class="hljs-string">'car'</span>,
        <span class="hljs-attr">y</span>: <span class="hljs-string">'London'</span>,
        <span class="hljs-attr">z</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'John'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>}
    }; 
}
<span class="hljs-keyword">let</span> { <span class="hljs-attr">x</span>: vehicle, <span class="hljs-attr">y</span>: city, <span class="hljs-attr">z</span>: { <span class="hljs-attr">name</span>: driver } } = baz();
<span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">`I'm going to <span class="hljs-subst">${city}</span> with <span class="hljs-subst">${driver}</span> in their <span class="hljs-subst">${vehicle}</span>.`</span>
); <span class="hljs-comment">// I'm going to London with John in their car. </span></code></pre>
<p>此外，对象的结构允许给多个变量赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { x: first, x: second } = { x: 4 };
console.log( first, second ); // 4, 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> { x: <span class="hljs-built_in">first</span>, x: <span class="hljs-built_in">second</span> } = { x: <span class="hljs-number">4</span> };
console.<span class="hljs-built_in">log</span>( <span class="hljs-built_in">first</span>, <span class="hljs-built_in">second</span> ); // <span class="hljs-number">4</span>, <span class="hljs-number">4</span></code></pre>
<h2 id="articleHeader9">对象字面量和属性的简洁表达法</h2>
<p>当你从许多参数创建对象字面量的时候，ES6允许你在键与变量名字相同的情况下省略该键。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 4, b = 7;
let c = { a: a, b: b };
let concise = { a, b };
console.log(c, concise) // {a: 4, b: 7}, {a: 4, b: 7}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">let</span> a = <span class="hljs-number">4</span>, b = <span class="hljs-number">7</span>;
<span class="hljs-keyword">let</span> <span class="hljs-built_in">c</span> = { a: a, b: b };
<span class="hljs-keyword">let</span> concise = { a, b };
console.log(<span class="hljs-built_in">c</span>, concise) <span class="hljs-comment">// {a: 4, b: 7}, {a: 4, b: 7}</span></code></pre>
<p>这个还可以与解构一起用来使你的代码更干净整洁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    return {
        name: 'Anna', 
        age: 56,
       job: { company: 'Tesco', title: 'Manager' }
    };
} 
// pre ES6
let a = foo(), name = a.name, age = a.age, company = a.job.company;
// ES6 destructuring and concise parameters 
let { name, age, job: {company"}}" = foo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Anna'</span>, 
        <span class="hljs-attr">age</span>: <span class="hljs-number">56</span>,
       <span class="hljs-attr">job</span>: { <span class="hljs-attr">company</span>: <span class="hljs-string">'Tesco'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Manager'</span> }
    };
} 
<span class="hljs-comment">// pre ES6</span>
<span class="hljs-keyword">let</span> a = foo(), name = a.name, age = a.age, company = a.job.company;
<span class="hljs-comment">// ES6 destructuring and concise parameters </span>
<span class="hljs-keyword">let</span> { name, age, <span class="hljs-attr">job</span>: {company"}}" = foo();
</code></pre>
<p>简洁表示法还可以用于解构对象并把它传入函数。方法1和2是你在es6之前要怎么做， 方法三是使用解构和简洁表达法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let person = {
    name: 'Anna', 
    age: 56,
    job: { company: 'Tesco', title: 'Manager' }
};
// method 1
function old1( person) {
    var yearOfBirth = 2018 - person.age;
    console.log( `${ person.name } works at ${ person.job.company } and was born in ${ yearOfBirth }.`);
}
// method 2
function old1( person) {
    var age = person.age,
        yearOfBirth = 2018 - age, 
        name = person.name,
        company = person.job.company;
    console.log( `${ name } works at ${ company } and was born in ${ yearOfBirth }.`);
} 
// method 3
function es6({ age, name, job: {company"}}") {
    var yearOfBirth = 2018 - age;
    console.log( `${ name } works at ${ company } and was born in ${ yearOfBirth }.`);
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Anna'</span>, 
    <span class="hljs-attr">age</span>: <span class="hljs-number">56</span>,
    <span class="hljs-attr">job</span>: { <span class="hljs-attr">company</span>: <span class="hljs-string">'Tesco'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Manager'</span> }
};
<span class="hljs-comment">// method 1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">old1</span>(<span class="hljs-params"> person</span>) </span>{
    <span class="hljs-keyword">var</span> yearOfBirth = <span class="hljs-number">2018</span> - person.age;
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">`<span class="hljs-subst">${ person.name }</span> works at <span class="hljs-subst">${ person.job.company }</span> and was born in <span class="hljs-subst">${ yearOfBirth }</span>.`</span>);
}
<span class="hljs-comment">// method 2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">old1</span>(<span class="hljs-params"> person</span>) </span>{
    <span class="hljs-keyword">var</span> age = person.age,
        yearOfBirth = <span class="hljs-number">2018</span> - age, 
        name = person.name,
        company = person.job.company;
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">`<span class="hljs-subst">${ name }</span> works at <span class="hljs-subst">${ company }</span> and was born in <span class="hljs-subst">${ yearOfBirth }</span>.`</span>);
} 
<span class="hljs-comment">// method 3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">es6</span>(<span class="hljs-params">{ age, name, job: {company"}}"</span>) </span>{
    <span class="hljs-keyword">var</span> yearOfBirth = <span class="hljs-number">2018</span> - age;
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">`<span class="hljs-subst">${ name }</span> works at <span class="hljs-subst">${ company }</span> and was born in <span class="hljs-subst">${ yearOfBirth }</span>.`</span>);
} 
</code></pre>
<p>通过使用ES6，我们能提取出<code>age</code>，<code>name</code>，和 <code>company</code>,而不需要任何其他的变量声明。</p>
<h2 id="articleHeader10">动态属性名称</h2>
<p>ES6添加了使用动态分配的键创建或添加属性的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let  city= 'sheffield_';
let a = {
    [ city + 'population' ]: 350000
};
a[ city + 'county' ] = 'South Yorkshire';
console.log(a); // {sheffield_population: 350000, sheffield_county: 'South Yorkshire' }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span>  city= <span class="hljs-string">'sheffield_'</span>;
<span class="hljs-keyword">let</span> a = {
    [ city + <span class="hljs-string">'population'</span> ]: <span class="hljs-number">350000</span>
};
a[ city + <span class="hljs-string">'county'</span> ] = <span class="hljs-string">'South Yorkshire'</span>;
console.log(a); // {sheffield_population: <span class="hljs-number">350000</span>, sheffield_county: <span class="hljs-string">'South Yorkshire'</span> }
</code></pre>
<h2 id="articleHeader11">箭头函数</h2>
<p>箭头函数有两个比较重要的特点： 他们的结构以及他们的<code>this</code> 指向</p>
<p>他们比传统的函数有更简单的结构因为他们不需要关键字<code>function</code> 而且他们可以自动返回在箭头后面的一部分，无论箭头后面的是什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function( a, b ) {
    return a * b;
} 
let bar = ( a, b ) => a * b;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> a, b </span>) </span>{
    <span class="hljs-keyword">return</span> a * b;
} 
<span class="hljs-keyword">let</span> bar = <span class="hljs-function">(<span class="hljs-params"> a, b </span>) =&gt;</span> a * b;</code></pre>
<p>如果函数有多于一个的计算式，可以使用花括号来包起来，然后函数返回块作用域返回的任何内容。</p>
<p>箭头函数一个最重要的用途之一就是应用在数组的相关函数中，像<code>.map</code>，<code>.forEach</code>,<code>.sort</code>等等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [ 5, 6, 7, 8, 'a' ];
let b = arr.map( item => item + 3 );
console.log(b); // [ 8, 9, 10, 11, 'a3' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [ <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'a'</span> ];
<span class="hljs-keyword">let</span> b = arr.map( <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item + <span class="hljs-number">3</span> );
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// [ 8, 9, 10, 11, 'a3' ]</span></code></pre>
<p>在拥有一个更短的表达方式的同时，箭头函数还修复了有关于this绑定行为经常出现的问题。ES6之前解决这个问题通常是使用一个<code>self</code>变量来存储这个指向。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var clickController = {
    doSomething: function (..) {
        var self = this;
        btn.addEventListener(
            'click', 
            function() { self.doSomething(..) }, 
            False
       );
   } 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> clickController = {
    doSomething: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(..)</span> </span>{
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;
        btn.addEventListener(
            <span class="hljs-string">'click'</span>, 
            <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">self</span>.doSomething(..) }, 
            <span class="hljs-keyword">False</span>
       );
   } 
};</code></pre>
<p>这个this的赋值是一定要做的，因为this的绑定是动态的。这就意味着this在eventlistener内部和在doSomething内部指的并不是同一个东西。</p>
<p>在箭头函数内部，this的绑定是语义上的就是指当前的，而不是动态的。这也是箭头函数的主要设计特点。</p>
<p>虽然这种词法上的this很棒，但是有些时候，他却不是我们想要的那样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = {
    oneThing: ( a ) => {
         let b = a * 2;
         this.otherThing(b);
    }, 
    otherThing: ( b ) => {....} 
};
a.oneThing(6);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">let</span> a = {
    oneThing: ( a ) =&gt; {
         <span class="hljs-keyword">let</span> b = a * <span class="hljs-number">2</span>;
         this.otherThing(b);
    }, 
    otherThing: ( b ) =&gt; <span class="hljs-meta">{....}</span> 
};
a.oneThing(<span class="hljs-number">6</span>);</code></pre>
<p>当我们使用<code>a.oneThing(6)</code>,  这个<code>this.otherThing(6)</code> 会抛出引用失败的错误，因为<code>this</code>没有指向对象<code>a</code>,而是指向了环境作用域。如果你正在使用ES6的代码使用ES6的语法，这个是你需要注意的事情。</p>
<h2 id="articleHeader12">for...of loops (for...of循环)</h2>
<p>ES6新添加了一种方式来迭代数组中的每个值，这个方式是与已经存在的<code>for...in</code>的通过索引的循环方式不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = ['a', 'b', 'c', 'd' ];
// ES6 
for ( var val of a ) {
    console.log( val );
} // &quot;a&quot; &quot;b&quot; &quot;c&quot; &quot;d&quot;
// pre-ES6 
for ( var idx in a ) {
    console.log( idx );
}  // 0 1 2 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> a = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span> ];
<span class="hljs-comment">// ES6 </span>
<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> val <span class="hljs-keyword">of</span> a ) {
    <span class="hljs-built_in">console</span>.log( val );
} <span class="hljs-comment">// "a" "b" "c" "d"</span>
<span class="hljs-comment">// pre-ES6 </span>
<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> idx <span class="hljs-keyword">in</span> a ) {
    <span class="hljs-built_in">console</span>.log( idx );
}  <span class="hljs-comment">// 0 1 2 3</span></code></pre>
<p>使用新的<code>for ... of</code>循环，在每个循环内部保存了一个<code>let val = a[idx]</code>。</p>
<p>数组，字符串，generator以及从collection 在标准JavaScript中都是可迭代的。普通的对象无法正常的使用for...of来迭代，除非你自己定义一个迭代器。</p>
<h2 id="articleHeader13">Number Literals 数字字面量</h2>
<p>ES5代码很好处理了十进制和十六进制的数字格式，但并未指定八进制的格式。实际上，八进制在严格模式中是被禁止使用的。</p>
<p>ES6 添加了一个全新的格式，在最开始的0后面添加一个o来声明一个八进制的数。与此同时，在es6中还添加了二进制格式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number( 29 )  // 29
Number( 035 ) // 35 in old octal form. 
Number( 0o35 ) // 29 in new octal form 
Number( 0x1d ) // 29 in hexadecimal 
Number( 0b11101 ) // 29 in binary form" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">( <span class="hljs-number">29</span> )</span></span>  <span class="hljs-comment">// 29</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">( <span class="hljs-number">035</span> )</span></span> <span class="hljs-comment">// 35 in old octal form. </span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">( <span class="hljs-number">0</span>o35 )</span></span> <span class="hljs-comment">// 29 in new octal form </span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">( <span class="hljs-number">0</span>x1d )</span></span> <span class="hljs-comment">// 29 in hexadecimal </span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">( <span class="hljs-number">0</span>b11101 )</span></span> <span class="hljs-comment">// 29 in binary form</span></code></pre>
<h2 id="articleHeader14">更多</h2>
<p>ES6还提供了我们很多很多其他的方式来使我们的代码更简洁，更易读，以及更稳定。我的目标时写一篇这篇文章的延续，来包括一些ES6中不太知名的部分。</p>
<p>如果你已经等不及了，可以读一读Kyle Simpson的<a href="https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md" rel="nofollow noreferrer" target="_blank">YOU DONT KNOW JAVASCRIPT ON ES6</a>,或者看一下这个<a href="http://es6-features.org/#Constants" rel="nofollow noreferrer" target="_blank">超赞的小网站</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让你的代码更简短，更整洁，更易读的ES6小技巧

## 原文链接
[https://segmentfault.com/a/1190000013241971](https://segmentfault.com/a/1190000013241971)


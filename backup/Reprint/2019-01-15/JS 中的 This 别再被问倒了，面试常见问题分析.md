---
title: 'JS 中的 This 别再被问倒了，面试常见问题分析' 
date: 2019-01-15 2:30:12
hidden: true
slug: z1mb1bkel1
categories: [reprint]
---

{{< raw >}}

                    
<p>GitHub地址：<a href="https://github.com/SimonZhangITer/MyBlog/issues/12" rel="nofollow noreferrer" target="_blank">https://github.com/SimonZhang...</a></p>
<blockquote><p>this的指向问题应该是让每一个前端er都头疼的问题，我也一样，曾经遇到甚至都是一顿乱猜。最近在研读一些书籍如《你不知道的JavaScript》和《JavaScript语言精粹与编程实践》，让我对this的问题豁然开朗。故写下此篇文章，分享一下我的心得。</p></blockquote>
<h1 id="articleHeader0">隐式绑定</h1>
<p>关于this，一般来说，谁调用了方法，该方法的this就指向谁，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    console.log(this.a)
}

var a = 3;

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 输出2,因为是obj调用的foo，所以foo的this指向了obj，而obj.a = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)
}

<span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">foo</span>: foo
};

obj.foo(); <span class="hljs-comment">// 输出2,因为是obj调用的foo，所以foo的this指向了obj，而obj.a = 2</span></code></pre>
<p>如果存在多次调用，<code>对象属性引用链只有上一层或者说最后一层在调用位置中起作用</code>，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a )
}

var obj2 = { 
    a: 42,
    foo: foo
}

var obj1 = {
    a: 2,
    obj2: obj2
}

obj1.obj2.foo(); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a )
}

<span class="hljs-keyword">var</span> obj2 = { 
    <span class="hljs-attr">a</span>: <span class="hljs-number">42</span>,
    <span class="hljs-attr">foo</span>: foo
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">obj2</span>: obj2
}

obj1.obj2.foo(); <span class="hljs-comment">// 42</span></code></pre>
<h2 id="articleHeader1">隐式丢失</h2>
<p>一个最常见的this绑定问题就是被<code>隐式绑定</code>的函数会丢失绑定对象，也就是说他回应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a )
}

var obj1 = {
    a: 2,
    foo: foo
}

var bar = obj1.foo; // 函数别名！

var a = &quot;oops, global&quot;; // a是全局对象的属性

bar(); // &quot;oops, global&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a )
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">foo</span>: foo
}

<span class="hljs-keyword">var</span> bar = obj1.foo; <span class="hljs-comment">// 函数别名！</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-string">"oops, global"</span>; <span class="hljs-comment">// a是全局对象的属性</span>

bar(); <span class="hljs-comment">// "oops, global"</span></code></pre>
<p><code>虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身，因此此时的bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定</code></p>
<p>一个更微妙、更常见并且更出乎意料的情况发生在<code>传入回调函数时</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a )
}

function doFoo( fn ){
    // fn 其实引用的是 foo
    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
}

var a = &quot;oops, global&quot;; // a是全局对象的属性

doFoo( obj.foo ); // &quot;oops, global&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doFoo</span>(<span class="hljs-params"> fn </span>)</span>{
    <span class="hljs-comment">// fn 其实引用的是 foo</span>
    fn(); <span class="hljs-comment">// &lt;-- 调用位置！</span>
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">foo</span>: foo
}

<span class="hljs-keyword">var</span> a = <span class="hljs-string">"oops, global"</span>; <span class="hljs-comment">// a是全局对象的属性</span>

doFoo( obj.foo ); <span class="hljs-comment">// "oops, global"</span></code></pre>
<p><code>参数传递其实就是一种隐式赋值</code>，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样，如果把函数传入语言内置的函数而不是传入自己声明的函数（如setTimeout等），<code>结果也是一样的</code></p>
<h1 id="articleHeader2">显式绑定</h1>
<p>简单的说，就是指定this，如：call、apply、bind、new绑定等</p>
<h2 id="articleHeader3">硬绑定</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo( something ) {
    console.log( this.a, something)
    return this.a + something
}

var obj = {
    a: 2
}

var bar = function() {
    return foo.apply( obj, arguments)
}

var b = bar(3); // 2 3
console.log(b); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"> something </span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a, something)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + something
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> foo.apply( obj, <span class="hljs-built_in">arguments</span>)
}

<span class="hljs-keyword">var</span> b = bar(<span class="hljs-number">3</span>); <span class="hljs-comment">// 2 3</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 5</span></code></pre>
<p>这里简单做一下解释：<br>在bar函数中，foo使用apply函数绑定了obj，也就是说foo中的this将指向obj，与此同时，使用arguments（不限制传入参数的数量）作为参数传入foo函数中；所以在运行bar(3)的时候，首先输出obj.a也就是2和传入的3，然后foo返回了两者的相加值，所以b的值为5</p>
<p>同样，本例也可以使用<code>bind</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo( something ) {
    console.log( this.a, something)
    return this.a + something
}

var obj = {
    a: 2
}

var bar = foo.bind(obj)

var b = bar(3); // 2 3
console.log(b); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"> something </span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a, something)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + something
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">var</span> bar = foo.bind(obj)

<span class="hljs-keyword">var</span> b = bar(<span class="hljs-number">3</span>); <span class="hljs-comment">// 2 3</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 5</span></code></pre>
<h2 id="articleHeader4">new绑定</h2>
<p>在传统面向类的语言中，使用new初始化类的时候会调用类中的构造函数，但是JS中new的机制实际上和面向类和语言完全不同。</p>
<p>使用<code>new</code>来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：</p>
<ul>
<li><p>创建（或者说构造）一个全新的对象</p></li>
<li><p>这个新对象会被执行[[Prototype]]连接</p></li>
<li><p>这个新对象会绑定到函数调用的this</p></li>
<li><p>如果函数没有返回其他对象，那么new表达式中的函数会自动返回这个新对象<br>如：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a){
    this.a = a
}

var bar = new foo(2);
console.log(bar.a); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">this</span>.a = a
}

<span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> foo(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(bar.a); <span class="hljs-comment">// 2</span></code></pre>
<p>使用new来调用foo(...)时，我们会构造一个新对象并把它绑定到foo(...)调用中的this上。new是最后一种可以影响函数调用时this绑定行为的方法，我们称之为new绑定。</p>
<h1 id="articleHeader5">this的优先级</h1>
<p>毫无疑问，默认绑定的优先级是四条规则中最低的，所以我们可以先不考虑它。</p>
<p>隐式绑定和显式绑定哪个优先级更高？我们来测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a){
    console.log(this.a)
}

var obj1 = {
    a: 2,
    foo: foo
}

var obj2 = {
    a: 3,
    foo: foo
}

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">foo</span>: foo
}

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">foo</span>: foo
}

obj1.foo(); <span class="hljs-comment">// 2</span>
obj2.foo(); <span class="hljs-comment">// 3</span>

obj1.foo.call(obj2); <span class="hljs-comment">// 3</span>
obj2.foo.call(obj1); <span class="hljs-comment">// 2</span></code></pre>
<p>可以看到，<code>显式绑定</code>优先级更高，也就是说在判断时应当先考虑是否可以存在显式绑定。</p>
<p>现在我们要搞清楚<code>new绑定</code>和<code>隐式绑定</code>的优先级谁高谁低 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a){
    this.a = something
}

var obj1 = {
    foo: foo
}

var obj2 = {}

obj1.foo(2); 
console.log(obj1.a); // 2

obj1.foo.call(obj2,3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4)
console.log(obj1.a); // 2
console.log(bar.a); // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">this</span>.a = something
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">foo</span>: foo
}

<span class="hljs-keyword">var</span> obj2 = {}

obj1.foo(<span class="hljs-number">2</span>); 
<span class="hljs-built_in">console</span>.log(obj1.a); <span class="hljs-comment">// 2</span>

obj1.foo.call(obj2,<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(obj2.a); <span class="hljs-comment">// 3</span>

<span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> obj1.foo(<span class="hljs-number">4</span>)
<span class="hljs-built_in">console</span>.log(obj1.a); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(bar.a); <span class="hljs-comment">// 4</span></code></pre>
<p>可以看到<code>new绑定</code>比<code>隐式绑定</code>优先级高。但是<code>new绑定</code>和<code>显式绑定</code>谁的优先级更高呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(something){
    this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>)</span>{
    <span class="hljs-keyword">this</span>.a = something
}

<span class="hljs-keyword">var</span> obj1 = {}

<span class="hljs-keyword">var</span> bar = foo.bind(obj1);
bar(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(obj1.a); <span class="hljs-comment">// 2</span>

<span class="hljs-keyword">var</span> baz = <span class="hljs-keyword">new</span> bar(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(obj1.a); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(baz.a); <span class="hljs-comment">// 3</span></code></pre>
<p>可以看到，<code>new绑定</code>修改了<code>硬绑定</code>中的this，所以<code>new绑定</code>的优先级比<code>显式绑定</code>更高。</p>
<p>之所以要在new中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用new进行初始化时就可以只传入其余的参数。bind(...)的功能之一就是可以把除了第一个参数（第一个参数用于绑定this）之外的其他参数都传给下层的函数（这种技术称为“部分应用”，是“<code>柯里化</code>”的一种）。举例来说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(p1,p2){
    this.val = p1 + p2;
}

// 之所以使用null是因为在本例中我们并不关心硬绑定的this是什么
// 反正使用new时this会被修改
var bar = foo.bind(null,'p1');

var baz = new bar('p2');

baz.val; // p1p2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">p1,p2</span>)</span>{
    <span class="hljs-keyword">this</span>.val = p1 + p2;
}

<span class="hljs-comment">// 之所以使用null是因为在本例中我们并不关心硬绑定的this是什么</span>
<span class="hljs-comment">// 反正使用new时this会被修改</span>
<span class="hljs-keyword">var</span> bar = foo.bind(<span class="hljs-literal">null</span>,<span class="hljs-string">'p1'</span>);

<span class="hljs-keyword">var</span> baz = <span class="hljs-keyword">new</span> bar(<span class="hljs-string">'p2'</span>);

baz.val; <span class="hljs-comment">// p1p2</span>
}</code></pre>
<blockquote><p>柯里化:在直觉上，柯里化声称“如果你固定某些参数，你将得到接受余下参数的一个函数”。所以对于有两个变量的函数yx，如果固定了 y = 2，则得到有一个变量的函数 2x</p></blockquote>
<h1 id="articleHeader6">This在箭头函数中的应用</h1>
<p>箭头函数不使用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this。</p>
<p>我们来看一下箭头函数的词法作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log(this.a)
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call(obj1);
bar.call(obj2); // 2, 不是3！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 返回一个箭头函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
        <span class="hljs-comment">// this继承自foo()</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)
    };
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">3</span>
};

<span class="hljs-keyword">var</span> bar = foo.call(obj1);
bar.call(obj2); <span class="hljs-comment">// 2, 不是3！</span></code></pre>
<p>foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到obj1，bar（引用箭头函数）的this也会绑定到obj1，箭头函数的绑定无法被修改。（new也不行!）</p>
<h1 id="articleHeader7">总结</h1>
<p>如果要判断一个运行中的函数的this绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断this的绑定对象。</p>
<ol>
<li><p>由new调用？绑定到新创建的对象。</p></li>
<li><p>由call或者apply（或者bind）调用？绑定到指定的对象。</p></li>
<li><p>由上下文对象调用？绑定到那个上下文对象。</p></li>
<li><p>默认：在严格模式下绑定到undefined，否则绑定到全局对象。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 中的 This 别再被问倒了，面试常见问题分析

## 原文链接
[https://segmentfault.com/a/1190000009215974](https://segmentfault.com/a/1190000009215974)


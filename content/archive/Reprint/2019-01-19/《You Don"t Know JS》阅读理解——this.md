---
title: '《You Don"t Know JS》阅读理解——this' 
date: 2019-01-19 2:30:10
hidden: true
slug: 7cc4y8xfoli
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. <code>this</code>的诞生</h2>
<p>假设我们有一个<code>speak</code>函数，通过<code>this</code>的运行机制，当使用不同的方法调用它时，我们可以灵活的输出不同的name。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var me = {name: &quot;me&quot;};

function speak() {
  console.log(this.name);
}

speak.call(me) //me" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> me = {<span class="hljs-attr">name</span>: <span class="hljs-string">"me"</span>};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speak</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

speak.call(me) <span class="hljs-comment">//me</span></code></pre>
<p>但是如果没有<code>this</code>, 这时我们需要显示的传递上下文给该函数。这时必须硬性的指定上下文，代码的复杂度增加，灵活性也欠缺。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function speak(context) {
  console.log(context.name);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> speak(context) {
  console.<span class="hljs-built_in">log</span>(context.<span class="hljs-keyword">name</span>);
}</code></pre>
<h2 id="articleHeader1">2. <code>this</code>的运行机制</h2>
<h3 id="articleHeader2">2.1 运行原理</h3>
<blockquote>
<p>When a function is invoked, an activation record, otherwise known as an execution context, is created. This record contains information about where the function was called from (the call-stack), how the function was invoked, what parameters were passed, etc. One of the properties of this record is the this reference which will be used for the duration of that function's execution.</p>
<p>当函数被<strong>调用</strong>时, 函数会创建一个activation object(执行上下文), 这个对象包括了函数在哪里被调用（调用栈），函数的调用方式，传入的参数，以及this值。</p>
</blockquote>
<p>因此，我们可以看到，<code>this</code>值是在函数<strong>调用</strong>时赋值的，而不是在声明的时候。是动态的。</p>
<h3 id="articleHeader3">2.2 运行规则</h3>
<p>根据<code>this</code>的运作原理，我们可以看到，<code>this</code>的值和调用栈（通过哪些函数的调用运行到调用当前函数的过程）以及如何被调用有关。</p>
<h4>2.2.1 Default Binding(默认绑定)</h4>
<p>当函数是被独立调用时，<code>this</code>值在非严格模式下为全局对象, 严格模式下为<code>undefined</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function foo() {
  var a = 2;
  console.log(this.a);
}

function bar() {
  debuuger;
  foo();
}

bar();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  debuuger;
  foo();
}

bar();</code></pre>
<p>打开chrome devtool可以看到，在调用<code>foo</code>时，函数的调用栈为<code>bar -&gt; foo</code>，调用方式是独立调用，且是在非严格模式下，此时<code>this</code>值指向<code>window</code>，输出1。</p>
<p><span class="img-wrap"><img data-src="/img/bVKee2?w=850&amp;h=382" src="https://static.alili.tech/img/bVKee2?w=850&amp;h=382" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>2.2.2 Implicit Binding(隐式绑定)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var = 1;
function foo() {
  debugger;
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
}

obj.foo(); //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">debugger</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">foo</span>: foo
}

obj.foo(); <span class="hljs-comment">//2</span></code></pre>
<p>此时，调用<code>foo</code>时，函数前加上了对<code>obj</code>这个对象的引用，输出<code>obj.a</code>。</p>
<p><strong>因此，如果有上下文对象引用了函数，隐式绑定规则会指定<code>this</code>值为该引用对象。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVKegX?w=920&amp;h=386" src="https://static.alili.tech/img/bVKegX?w=920&amp;h=386" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>但是我们再看看下面这种情况。要注意的是，<code>bar</code>的值是对函数<code>foo</code>的引用，因此此时<code>foo</code>的调用并没有上下文对象的引用，因此应用的是default binding， 输出1。要注意这种赋值的情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function foo() {
  debugger;
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
}

var bar = obj.foo;

bar(); //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">debugger</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">foo</span>: foo
}

<span class="hljs-keyword">var</span> bar = obj.foo;

bar(); <span class="hljs-comment">//1</span></code></pre>
<h4>2.2.3 Explicit Binding(显式绑定)</h4>
<p>上面两种情况，要么<code>this</code>值为全局对象（非严格模式），要么通过对象方法调用，<code>this</code>指向调用的对象。<br>那我想不通过对象调用，而是独立调用时又能指定<code>this</code>值为某个对象呢？这时，<code>call</code>,<code>apply</code>就诞生了。它的第一个参数是<code>this</code>值，帮助我们明确指定函数调用时<code>this</code>的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function foo() {
  debugger;
  console.log(this.a);
}
var obj = {
  a: 2
}

foo.call(obj); //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">debugger</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
}

foo.call(obj); <span class="hljs-comment">//2</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKesJ?w=954&amp;h=408" src="https://static.alili.tech/img/bVKesJ?w=954&amp;h=408" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过<code>call, apply</code>，我们可以在调用时明确指定<code>this</code>值。还有一种情况是，有时候我们希望<code>this</code>值绑定在我们给定的对象上，而函数只需要接受一些参数。特别是在第三方库中，它会提供一种方法，接收方法需要的参数，但是不希望你意外的修改了方法的<code>this</code>值，这时它可能会采用<code>bind</code>这种硬性绑定的方法<strong>明确</strong>的指出<code>this</code>值。</p>
<p>在ES5中提供了<code>Function.prototype.bind</code>，它的应用场景就是帮助你<strong>predicable</strong>的绑定<code>this</code>值。常用的应用场景为包裹函数、事件绑定函数、<code>setTimeout</code>中绑定<code>this</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//包裹函数，用来接受参数
function multiple(num) {
  console.log(this.pen, num);
  return this.pen * num;
}

var priceMapping = {
  pen: 10
}

function calTotalPrices() {
  return multiple.apply(priceMapping, arguments);
}

var total = calTotalPrices(3);
console.log(total); //30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//包裹函数，用来接受参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiple</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.pen, num);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.pen * num;
}

<span class="hljs-keyword">var</span> priceMapping = {
  <span class="hljs-attr">pen</span>: <span class="hljs-number">10</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calTotalPrices</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> multiple.apply(priceMapping, <span class="hljs-built_in">arguments</span>);
}

<span class="hljs-keyword">var</span> total = calTotalPrices(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(total); <span class="hljs-comment">//30</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//事件绑定
var states = {
  clickCount: 0
}
function clickHandler() {
  this.clickCount++;
  console.log(this.clickCount);
}
button.addEventListener('click', clickHandler.bind(states));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//事件绑定</span>
<span class="hljs-keyword">var</span> states = {
  <span class="hljs-attr">clickCount</span>: <span class="hljs-number">0</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clickHandler</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.clickCount++;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.clickCount);
}
button.addEventListener(<span class="hljs-string">'click'</span>, clickHandler.bind(states));</code></pre>
<p><strong>注意</strong>：当使用显示绑定时，如果第一个参数是<code>null, undefined</code>，则应用默认绑定规则。为避免传入<code>null, undefined</code>时错误的改变了全局值，最好创建一个空对象代替<code>null, undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ø = Object.create(null);

foo.call(ø);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> ø = <span class="hljs-built_in">Object</span>.create(<span class="hljs-keyword">null</span>);

foo.call(ø);</code></pre>
<h4>2.2.4 new Binding(new绑定)</h4>
<p>明白<code>new</code>的运作原理：</p>
<ol>
<li><p>创建一个新对象；</p></li>
<li><p>对象链接到[[prototype]]上；</p></li>
<li><p>将<code>this</code>绑定到这个新对象上；</p></li>
<li><p>有显式的<code>return</code>，返回<code>return</code>，否则返回这个新对象。</p></li>
</ol>
<h4>2.2.5 优先级</h4>
<p>new &gt; 显示绑定(call,apply,bind) &gt; 隐式绑定(方法调用) &gt; 默认绑定(独立函数调用)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(sth) {
  this.b = sth;
  console.log(&quot;a:&quot;, this.a, &quot;b:&quot;, this.b);
}

var a = &quot;window&quot;;
var obj1 = {
  a: &quot;obj1&quot;,
  foo: foo,
}

var obj2 = {
  a: &quot;obj2&quot;,
  foo: foo,
}

obj1.foo(&quot;obj1&quot;); //a: obj1 b: obj1
obj1.foo.call(obj2, &quot;obj2&quot;); //a: obj2 b: obj2; 显示 > 隐式
var bar = foo.bind(obj1);
new bar(&quot;new&quot;); //new > 显示" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">sth</span>) </span>{
  <span class="hljs-keyword">this</span>.b = sth;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a:"</span>, <span class="hljs-keyword">this</span>.a, <span class="hljs-string">"b:"</span>, <span class="hljs-keyword">this</span>.b);
}

<span class="hljs-keyword">var</span> a = <span class="hljs-string">"window"</span>;
<span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-attr">a</span>: <span class="hljs-string">"obj1"</span>,
  <span class="hljs-attr">foo</span>: foo,
}

<span class="hljs-keyword">var</span> obj2 = {
  <span class="hljs-attr">a</span>: <span class="hljs-string">"obj2"</span>,
  <span class="hljs-attr">foo</span>: foo,
}

obj1.foo(<span class="hljs-string">"obj1"</span>); <span class="hljs-comment">//a: obj1 b: obj1</span>
obj1.foo.call(obj2, <span class="hljs-string">"obj2"</span>); <span class="hljs-comment">//a: obj2 b: obj2; 显示 &gt; 隐式</span>
<span class="hljs-keyword">var</span> bar = foo.bind(obj1);
<span class="hljs-keyword">new</span> bar(<span class="hljs-string">"new"</span>); <span class="hljs-comment">//new &gt; 显示</span></code></pre>
<h2 id="articleHeader4">4. 箭头函数</h2>
<p>箭头函数中的<code>this</code>并不适用于以上四种规则。因为这里的<code>this</code>不是使用的传统<code>this</code>机制，而是使用的词法作用域，根据外层的作用域来决定<code>this</code>。应用机制不一样，该<code>this</code>也不能通过显示绑定来修改。</p>
<h2 id="articleHeader5">5. 总结</h2>
<p>下一次再看到<code>this</code>的时候，我们问自己两个问题：</p>
<ol>
<li><p>where to call: 函数的调用位置是？</p></li>
<li><p>how to call: 函数的调用方法是？应用的规则是？</p></li>
<li>
<p>应用规则4条(按优先级排序)：</p>
<ul>
<li><p>new （新创建的对象）</p></li>
<li><p>显式绑定 (绑定到指定对象，<code>call, apply, bind</code>：可预测的<code>this</code>);</p></li>
<li><p>隐式绑定 (调用的上下文对象，注意间接引用的错误);</p></li>
<li><p>默认绑定 (全局对象或<code>undefined</code>注意函数体是否为严格模式);</p></li>
</ul>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《You Don't Know JS》阅读理解——this

## 原文链接
[https://segmentfault.com/a/1190000008592227](https://segmentfault.com/a/1190000008592227)


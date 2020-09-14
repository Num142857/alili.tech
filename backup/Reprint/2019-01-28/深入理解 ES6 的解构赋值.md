---
title: '深入理解 ES6 的解构赋值' 
date: 2019-01-28 2:30:09
hidden: true
slug: fh1soowqpmv
categories: [reprint]
---

{{< raw >}}

                    
<p>解构赋值（destructuring assignment）语法是一个Javascript表达式，这种语法能够更方便的提取出 Object 或者 Array 中的数据。这种语法可以在接受提取的数据的地方使用，比如一个表达式的左边。有明确的语法模式来告诉我们如何使用这种语法提取需要的数据值。</p>
<h3 id="articleHeader0">Object 的解构</h3>
<p>解构 Object:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { first: 'Jane', last: 'Doe' };
const {first: f, last: l} = obj;
// f = 'Jane'; l = 'Doe'

// {prop} is short for {prop: prop}
const {first, last} = obj;
// first = 'Jane'; last = 'Doe'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">first</span>: <span class="hljs-string">'Jane'</span>, <span class="hljs-attr">last</span>: <span class="hljs-string">'Doe'</span> };
<span class="hljs-keyword">const</span> {<span class="hljs-attr">first</span>: f, <span class="hljs-attr">last</span>: l} = obj;
<span class="hljs-comment">// f = 'Jane'; l = 'Doe'</span>

<span class="hljs-comment">// {prop} is short for {prop: prop}</span>
<span class="hljs-keyword">const</span> {first, last} = obj;
<span class="hljs-comment">// first = 'Jane'; last = 'Doe'</span></code></pre>
<p>解构能帮助更好地处理方法返回的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { foo: 123 };

const {writable, configurable} = Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(writable, configurable); // true true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">foo</span>: <span class="hljs-number">123</span> };

<span class="hljs-keyword">const</span> {writable, configurable} = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, <span class="hljs-string">'foo'</span>);

<span class="hljs-built_in">console</span>.log(writable, configurable); <span class="hljs-comment">// true true</span></code></pre>
<h3 id="articleHeader1">Array 的解构</h3>
<p>解构数组，对所有可遍历的值有效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;];

let [one, two, three] = foo;
console.log(one); // &quot;one&quot;
console.log(two); // &quot;two&quot;
console.log(three); // &quot;three&quot;

const iterable = ['a', 'b'];
const [x, y] = iterable;
// x = 'a'; y = 'b'

[x, y] = iterable;

// window.x = 'a'; window.y = 'b';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> foo = [<span class="hljs-string">"one"</span>, <span class="hljs-string">"two"</span>, <span class="hljs-string">"three"</span>];

<span class="hljs-keyword">let</span> [one, two, three] = foo;
<span class="hljs-built_in">console</span>.log(one); <span class="hljs-comment">// "one"</span>
<span class="hljs-built_in">console</span>.log(two); <span class="hljs-comment">// "two"</span>
<span class="hljs-built_in">console</span>.log(three); <span class="hljs-comment">// "three"</span>

<span class="hljs-keyword">const</span> iterable = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>];
<span class="hljs-keyword">const</span> [x, y] = iterable;
<span class="hljs-comment">// x = 'a'; y = 'b'</span>

[x, y] = iterable;

<span class="hljs-comment">// window.x = 'a'; window.y = 'b';</span>
</code></pre>
<p>同样的，解构数组也能帮助我们更好地处理函数返回值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [all, year, month, day] =
    /^(\d\d\d\d)-(\d\d)-(\d\d)$/
    .exec('2999-12-31');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [all, year, month, day] =
    <span class="hljs-regexp">/^(\d\d\d\d)-(\d\d)-(\d\d)$/</span>
    .exec(<span class="hljs-string">'2999-12-31'</span>);
</code></pre>
<p>而且，你也可以忽略你不感兴趣的返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  return [1, 2, 3];
}

let [a, , b] = f();
console.log(a); // 1
console.log(b); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
}

<span class="hljs-keyword">let</span> [a, , b] = f();
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 3</span></code></pre>
<p>你也可以忽略全部返回值，不过似乎没啥用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[,,] = f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[,,] = f();</code></pre>
<p>当解构一个数组时，可以使用剩余模式（<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator" rel="nofollow noreferrer" target="_blank">拓展语句，Spread operator</a>），将数组剩余部分赋值给一个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> [a, ...b] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// [2, 3]</span></code></pre>
<h3 id="articleHeader2">在什么地方可以使用解构</h3>
<p>解构可以在下面这些情景中使用，只展现了数组模式的演示，对象模式也是如此。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 变量声明:
const [x] = ['a'];
let [x] = ['a'];
var [x] = ['a'];

// 赋值: 下面这种情况将会在全局变量上添加一个 x 属性，值为‘a‘
[x] = ['a']; 

// 参数的定义:
function userId({id}) {
  return id;
}

function whois({displayName: displayName, fullName: {firstName: name"}}"){
  console.log(displayName + &quot; is &quot; + name);
}

var user = { 
  id: 42, 
  displayName: &quot;jdoe&quot;,
  fullName: { 
      firstName: &quot;John&quot;,
      lastName: &quot;Doe&quot;
  }
};

console.log(&quot;userId: &quot; + userId(user)); // &quot;userId: 42&quot;
whois(user); // &quot;jdoe is John&quot;

function f([x]) { ··· }
f(['a']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 变量声明:</span>
<span class="hljs-keyword">const</span> [x] = [<span class="hljs-string">'a'</span>];
<span class="hljs-keyword">let</span> [x] = [<span class="hljs-string">'a'</span>];
<span class="hljs-keyword">var</span> [x] = [<span class="hljs-string">'a'</span>];

<span class="hljs-comment">// 赋值: 下面这种情况将会在全局变量上添加一个 x 属性，值为‘a‘</span>
[x] = [<span class="hljs-string">'a'</span>]; 

<span class="hljs-comment">// 参数的定义:</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">userId</span>(<span class="hljs-params">{id}</span>) </span>{
  <span class="hljs-keyword">return</span> id;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">whois</span>(<span class="hljs-params">{displayName: displayName, fullName: {firstName: name"}}"</span>)</span>{
  <span class="hljs-built_in">console</span>.log(displayName + <span class="hljs-string">" is "</span> + name);
}

<span class="hljs-keyword">var</span> user = { 
  <span class="hljs-attr">id</span>: <span class="hljs-number">42</span>, 
  <span class="hljs-attr">displayName</span>: <span class="hljs-string">"jdoe"</span>,
  <span class="hljs-attr">fullName</span>: { 
      <span class="hljs-attr">firstName</span>: <span class="hljs-string">"John"</span>,
      <span class="hljs-attr">lastName</span>: <span class="hljs-string">"Doe"</span>
  }
};

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"userId: "</span> + userId(user)); <span class="hljs-comment">// "userId: 42"</span>
whois(user); <span class="hljs-comment">// "jdoe is John"</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">[x]</span>) </span>{ ··· }
f([<span class="hljs-string">'a'</span>]);</code></pre>
<p>也可以在 for-of 循环中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = ['a', 'b'];
for (const [index, element] of arr.entries()) {
    console.log(index, element);
}
// Output:
// 0 a
// 1 b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [index, element] <span class="hljs-keyword">of</span> arr.entries()) {
    <span class="hljs-built_in">console</span>.log(index, element);
}
<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 0 a</span>
<span class="hljs-comment">// 1 b</span></code></pre>
<h3 id="articleHeader3">解构赋值的模型 patterns</h3>
<p>在解构中，有下面两部分参与：</p>
<ul>
<li><p><strong>Destructuring source:</strong> 解构的源，将要被解构的数据，比如解构赋值表达式的右边部分。</p></li>
<li><p><strong>Destructuring target:</strong> 解构的目标，比如解构复制表达式的左边部分。</p></li>
</ul>
<p>解构的目标可以是下面三个的任意一个：</p>
<ul>
<li>
<p>赋值对象，Assigment Patterns。例如 x</p>
<ul><li><p>赋值对象通常来说是一个变量。但是在解构赋值中，你有更多的选择，稍后会讲到。</p></li></ul>
</li>
<li><p>对象模型，Object Patterns。比如：<code>{ first: «pattern», last: «pattern» }</code></p></li>
<li><p>数组模型，Object Patterns。比如：<code>[ «pattern», «pattern» ]</code></p></li>
</ul>
<p>可以任意嵌套模型，而且是可以非常任性的嵌套。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { a: [{ foo: 123, bar: 'abc' }, {}], b: true };
const { a: [{foo: f}] } = obj; // f = 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">a</span>: [{ <span class="hljs-attr">foo</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">'abc'</span> }, {}], <span class="hljs-attr">b</span>: <span class="hljs-literal">true</span> };
<span class="hljs-keyword">const</span> { <span class="hljs-attr">a</span>: [{<span class="hljs-attr">foo</span>: f}] } = obj; <span class="hljs-comment">// f = 123</span></code></pre>
<h3 id="articleHeader4">解构的 patterns 如何访问到值的内部结构？</h3>
<p>在一个表达式<code>pattern = someValue</code>中，<code>pattern</code>是如何访问<code>someValue</code>的呢？</p>
<h3 id="articleHeader5">Object patterns 将 value 转换成 Object</h3>
<p>在访问属性之前，object pattern 将解构的源数据（destructuing source）转换成对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {length : len} = 'abc'; // len = 3
const {toString: s} = 123; // s = Number.prototype.toString" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {<span class="hljs-attr">length</span> : len} = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// len = 3</span>
<span class="hljs-keyword">const</span> {<span class="hljs-attr">toString</span>: s} = <span class="hljs-number">123</span>; <span class="hljs-comment">// s = Number.prototype.toString</span></code></pre>
<h4>使用“对象解构”的缺点</h4>
<p>在这个过程中，强制转换成对象的过程不是通过<code>Object()</code>方法，而是通过内置的操作方法<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-toobject" rel="nofollow noreferrer" target="_blank">toObject()</a>。这两个操作处理<code>undefined</code>和<code>null</code>的方式不太一样。</p>
<p>Object()方法将原始类型值转换成包装类型对象（wrapper object），原来的值原封不动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> typeof Object('abc')
'object'

> var obj = {};
> Object(obj) === obj
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; typeof Object(<span class="hljs-string">'abc'</span>)
<span class="hljs-string">'object'</span>

&gt; var obj = {};
&gt; Object(obj) === obj
<span class="hljs-literal">true</span></code></pre>
<p>也会将<code>undefined</code> 和 <code>null</code> 转换成一个空的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Object(undefined)
{}
> Object(null)
{}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; Object(undefined)
{}
&gt; Object(null)
{}</code></pre>
<p>对比之下，当遇到<code>undefined</code>和<code>null</code>的时候，toObject()方法则会抛出一个错误。所以下面的解构是失败的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { prop: x } = undefined; // TypeError
const { prop: y } = null; // TypeError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { <span class="hljs-attr">prop</span>: x } = <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// TypeError</span>
<span class="hljs-keyword">const</span> { <span class="hljs-attr">prop</span>: y } = <span class="hljs-literal">null</span>; <span class="hljs-comment">// TypeError</span></code></pre>
<p>因此，你可以使用空对象模型{}来检查一个值是否被强制转换成了一个对象。正如前面提到的规则，<code>undefined</code>和<code>null</code>将会抛出错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="({} = [true, false]); // OK, Arrays are coercible to objects
({} = 'abc'); // OK, strings are coercible to objects

({} = undefined); // TypeError
({} = null); // TypeError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">({} = [<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>]); // OK, Arrays are coercible to objects
({} = <span class="hljs-string">'abc'</span>); // OK, strings are coercible to objects

({} = undefined); // TypeError
({} = null); // TypeError</code></pre>
<p>表达式两边的括号是必须的，因为在 JavaScript 中，声明不能以花括号开始。</p>
<h3 id="articleHeader6">在可遍历的量中使用数组模型</h3>
<p>数组解构使用一个迭代器来获取数据源中的元素。因此，你可以对任何可以遍历的值使用数组解构。</p>
<p>字符串是可遍历的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x, ...y] = 'abc'; // x='a'; y=['b', 'c']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [x, ...y] = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// x='a'; y=['b', 'c']</span></code></pre>
<p>我们无法通过索引访问 Set中的元素，但是可以通过迭代器。所以，数组解构能够在 Sets上工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x,y] = new Set(['a', 'b']); // x='a'; y='b’;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [x,y] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>]); <span class="hljs-comment">// x='a'; y='b’;</span></code></pre>
<p><code>Set</code>的迭代器总是按照元素插入的顺序将元素返回，所以上述的解构返回的结果总是相同的。</p>
<h4>使用“数组解构”的缺点</h4>
<p>如果一个值有一个 key 为<code>Symbol.iterator</code>的方法，这个方法返回的是一个对象，那么这个值是可以遍历的。如果被解构的值不能遍历的，那么“数组解构”会抛出一个<code>TypeError</code>错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x;
[x] = [true, false]; // OK, Arrays are iterable
[x] = 'abc'; // OK, strings are iterable
[x] = { * [Symbol.iterator]() { yield 1 } }; // OK, iterable

[x] = {}; // TypeError, empty objects are not iterable
[x] = undefined; // TypeError, not iterable
[x] = null; // TypeError, not iterable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x;
[x] = [<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>]; <span class="hljs-comment">// OK, Arrays are iterable</span>
[x] = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// OK, strings are iterable</span>
[x] = { * [<span class="hljs-built_in">Symbol</span>.iterator]() { <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span> } }; <span class="hljs-comment">// OK, iterable</span>

[x] = {}; <span class="hljs-comment">// TypeError, empty objects are not iterable</span>
[x] = <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// TypeError, not iterable</span>
[x] = <span class="hljs-literal">null</span>; <span class="hljs-comment">// TypeError, not iterable</span></code></pre>
<p>可以用一个空的数组模型[]来检查值是不是可遍历的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[] = {}; // TypeError, empty objects are not iterable
[] = undefined; // TypeError, not iterable
[] = null; // TypeError, not iterable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[] = {}; <span class="hljs-comment">// TypeError, empty objects are not iterable</span>
[] = <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// TypeError, not iterable</span>
[] = <span class="hljs-literal">null</span>; <span class="hljs-comment">// TypeError, not iterable</span></code></pre>
<h3 id="articleHeader7">默认值</h3>
<p>默认值是可选的，在数据源中找不到对应的值时，如果设置了默认值，则匹配这个默认值作为匹配结果，否则返回 undefined。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x=3, y] = []; // x = 3; y = undefined。
const {foo: x=3, bar: y} = {}; // x = 3; y = undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [x=<span class="hljs-number">3</span>, y] = []; <span class="hljs-comment">// x = 3; y = undefined。</span>
<span class="hljs-keyword">const</span> {<span class="hljs-attr">foo</span>: x=<span class="hljs-number">3</span>, <span class="hljs-attr">bar</span>: y} = {}; <span class="hljs-comment">// x = 3; y = undefined</span></code></pre>
<h4>undefined 也会触发默认值</h4>
<p>当解构模式有匹配结果，且匹配结果是 undefined 时，也会使用默认值作为返回结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x=1] = [undefined]; // x = 1
const {prop: y=2} = {prop: undefined}; // y = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [x=<span class="hljs-number">1</span>] = [<span class="hljs-literal">undefined</span>]; <span class="hljs-comment">// x = 1</span>
<span class="hljs-keyword">const</span> {<span class="hljs-attr">prop</span>: y=<span class="hljs-number">2</span>} = {<span class="hljs-attr">prop</span>: <span class="hljs-literal">undefined</span>}; <span class="hljs-comment">// y = 2</span></code></pre>
<h4>默认值是根据需要计算出来的</h4>
<p>也就是说下面的解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {prop: y=someFunc()} = someValue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> {<span class="hljs-attr">prop</span>: y=someFunc()} = someValue;</code></pre>
<p>相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let y;
if (someValue.prop === undefined) {
    y = someFunc();
} else {
    y = someValue.prop;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> y;
<span class="hljs-keyword">if</span> (someValue.prop === <span class="hljs-literal">undefined</span>) {
    y = someFunc();
} <span class="hljs-keyword">else</span> {
    y = someValue.prop;
}</code></pre>
<p>使用<code>console.log()</code>可以观察到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> function log(x) { console.log(x); return 'YES' }
> const [a=log('hello')] = [];
> a
'YES'
> const [b=log('hello')] = [123];
> b
123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params">x</span>) </span>{ <span class="hljs-built_in">console</span>.log(x); <span class="hljs-keyword">return</span> <span class="hljs-string">'YES'</span> }
&gt; <span class="hljs-keyword">const</span> [a=log(<span class="hljs-string">'hello'</span>)] = [];
&gt; a
<span class="hljs-string">'YES'</span>
&gt; <span class="hljs-keyword">const</span> [b=log(<span class="hljs-string">'hello'</span>)] = [<span class="hljs-number">123</span>];
&gt; b
<span class="hljs-number">123</span></code></pre>
<p>在第二个解构中，默认值没有触发，并且<code>log()</code>没有被调用。</p>
<h4>默认值可以引用模式中的其他变量</h4>
<p>默认值可以引用模式中的任何变量，包括相同模式中的其他变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x=3, y=x] = [];     // x=3; y=3
const [x=3, y=x] = [7];    // x=7; y=7
const [x=3, y=x] = [7, 2]; // x=7; y=2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [x=<span class="hljs-number">3</span>, y=x] = [];     <span class="hljs-comment">// x=3; y=3</span>
<span class="hljs-keyword">const</span> [x=<span class="hljs-number">3</span>, y=x] = [<span class="hljs-number">7</span>];    <span class="hljs-comment">// x=7; y=7</span>
<span class="hljs-keyword">const</span> [x=<span class="hljs-number">3</span>, y=x] = [<span class="hljs-number">7</span>, <span class="hljs-number">2</span>]; <span class="hljs-comment">// x=7; y=2</span></code></pre>
<p>但是，变量的顺序很关键，从左到右，先声明的变量不能引用后声明的变量，也就是左边的不能引用右边的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x=y, y=3] = []; // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [x=y, y=<span class="hljs-number">3</span>] = []; <span class="hljs-comment">// ReferenceError</span></code></pre>
<h3 id="articleHeader8">patterns 的默认值</h3>
<p>到目前为止，我们所看到的都是模式中变量的默认值，我们也可以为模式设置默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [{prop: x} = {}] = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [{<span class="hljs-attr">prop</span>: x} = {}] = [];</code></pre>
<p>如果整个模式没有匹配结果，则使用<code>{}</code>作为数据源来匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { prop: x } = {}; // x = undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> { <span class="hljs-attr">prop</span>: x } = {}; <span class="hljs-comment">// x = undefined</span></code></pre>
<p>上面的例子中，x 为 undefined 可能还是不够直观。看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [{prop: x} = {props: 'abc'}] = []; // x=abc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [{<span class="hljs-attr">prop</span>: x} = {<span class="hljs-attr">props</span>: <span class="hljs-string">'abc'</span>}] = []; <span class="hljs-comment">// x=abc</span></code></pre>
<h3 id="articleHeader9">对象解构的更多特性</h3>
<h4>属性，属性值的简写</h4>
<p>如果属性值是一个变量，和属性的 key相同，就可以忽略这个 key:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { x, y } = { x: 11, y: 8 }; // x = 11; y = 8

// 等价于
const { x: x, y: y } = { x: 11, y: 8 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { x, y } = { <span class="hljs-attr">x</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">8</span> }; <span class="hljs-comment">// x = 11; y = 8</span>

<span class="hljs-comment">// 等价于</span>
<span class="hljs-keyword">const</span> { <span class="hljs-attr">x</span>: x, <span class="hljs-attr">y</span>: y } = { <span class="hljs-attr">x</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">8</span> };</code></pre>
<h4>计算后的属性的键</h4>
<p>如果把表达式放入方括号中，可以用这个表达式声明属性的键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const FOO = 'foo';
const { [FOO]: f} = {fooL 123}; // f = 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> FOO = <span class="hljs-string">'foo'</span>;
<span class="hljs-keyword">const</span> { [FOO]: f} = {fooL <span class="hljs-number">123</span>}; <span class="hljs-comment">// f = 123</span></code></pre>
<p>这也使得可以使用 symbols 来做属性的键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Create and destructure a property whose key is a symbol
const KEY = Symbol();
const obj = { [KEY]: 'abc' };
const { [KEY]: x } = obj; // x = 'abc'

// Extract Array.prototype[Symbol.iterator]
const { [Symbol.iterator]: func } = [];
console.log(typeof func); // function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Create and destructure a property whose key is a symbol</span>
<span class="hljs-keyword">const</span> KEY = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">const</span> obj = { [KEY]: <span class="hljs-string">'abc'</span> };
<span class="hljs-keyword">const</span> { [KEY]: x } = obj; <span class="hljs-comment">// x = 'abc'</span>

<span class="hljs-comment">// Extract Array.prototype[Symbol.iterator]</span>
<span class="hljs-keyword">const</span> { [<span class="hljs-built_in">Symbol</span>.iterator]: func } = [];
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> func); <span class="hljs-comment">// function</span></code></pre>
<h3 id="articleHeader10">数组解构的更多特性</h3>
<h4>省略</h4>
<p>在解构的过程中可以跳过一些元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [,,x,y] = [1,2,3,4]; // x= 3 y = 4;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [,,x,y] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]; <span class="hljs-comment">// x= 3 y = 4;</span></code></pre>
<h4>剩余运算符 Rest operator (...)</h4>
<p>剩余运算符可以将一个可遍历对象中剩余的元素提取到一个数组中。如果这个运算符在数组模式中使用，运算符必须放在最后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x, ...y] = [1,2,3,4]; // x=1; y=[2,3,4];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [x, ...y] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]; <span class="hljs-comment">// x=1; y=[2,3,4];</span></code></pre>
<p>要注意的时，拓展运算符（spread operator）与剩余操作符有着相同的语法-三个点。但是它们之间有区别：前者将数组变成多个元素；后者则用来解构和提取数据，多个元素压缩成一个元素。</p>
<p>如果运算符找不到任何元素，将会匹配一个空的数组，永远不会返回undefined 或者 null。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x, y, ...z] = ['a']; // x='a'; y=undefined; z" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [x, y, ...z] = [<span class="hljs-string">'a'</span>]; <span class="hljs-comment">// x='a'; y=undefined; z</span></code></pre>
<p>操作符不一定非要是一个变量，也可以使用模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [x, ...[y, z]] = ['a', 'b', 'c']; // x = 'a'; y = 'b'; z = 'c'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [x, ...[y, z]] = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]; <span class="hljs-comment">// x = 'a'; y = 'b'; z = 'c'</span></code></pre>
<h3 id="articleHeader11">解构的陷阱</h3>
<p>在使用解构的时候，有两点要考虑清楚：</p>
<ol>
<li><p>不能使用大括号作为声明语句的开头；</p></li>
<li><p>在解构的过程中，可以申明变量或者分配给变量，但是不能同时这么做；</p></li>
</ol>
<h3 id="articleHeader12">解构的几个例子</h3>
<p>在 for-of 中使用解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = new Map().set(false, 'no').set(true, 'yes');
for (const [key, value] of map) {
  console.log(key + ' is ' + value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>().set(<span class="hljs-literal">false</span>, <span class="hljs-string">'no'</span>).set(<span class="hljs-literal">true</span>, <span class="hljs-string">'yes'</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [key, value] <span class="hljs-keyword">of</span> map) {
  <span class="hljs-built_in">console</span>.log(key + <span class="hljs-string">' is '</span> + value);
}</code></pre>
<p>使用解构交换两个变量的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[a, b] = [b, a];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[a, b] = [b, a];</code></pre>
<p>或者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[a, b, c] = [c, a, b];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[a, b, c] = [c, a, b];</code></pre>
<p>还可以分割数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [first, ...rest] = ['a', 'b', 'c']; // first = 'a'; rest = ['b', 'c']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [first, ...rest] = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]; <span class="hljs-comment">// first = 'a'; rest = ['b', 'c']</span></code></pre>
<p>处理方法返回的数组更加方便：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [all, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');

const cells = 'Jane\tDoe\tCTO'
const [firstName, lastName, title] = cells.split('\t');
console.log(firstName, lastName, title);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [all, year, month, day] = <span class="hljs-regexp">/^(\d\d\d\d)-(\d\d)-(\d\d)$/</span>.exec(<span class="hljs-string">'2999-12-31'</span>);

<span class="hljs-keyword">const</span> cells = <span class="hljs-string">'Jane\tDoe\tCTO'</span>
<span class="hljs-keyword">const</span> [firstName, lastName, title] = cells.split(<span class="hljs-string">'\t'</span>);
<span class="hljs-built_in">console</span>.log(firstName, lastName, title);</code></pre>
<p>要注意的一点是：exec等一些方法可能会返回 null，导致程序抛出错误<code>TypeError</code>，此时需要添加一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec(someStr) || [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [, year, month, day] = <span class="hljs-regexp">/^(\d\d\d\d)-(\d\d)-(\d\d)$/</span>.exec(someStr) || [];</code></pre>
<p>参考资料：</p>
<ol>
<li><p><a href="http://exploringjs.com/es6/ch_destructuring.html" rel="nofollow noreferrer" target="_blank">Exploringjs Destructuring</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" rel="nofollow noreferrer" target="_blank">MDN Destructing assignment</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 ES6 的解构赋值

## 原文链接
[https://segmentfault.com/a/1190000008038703](https://segmentfault.com/a/1190000008038703)


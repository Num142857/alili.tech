---
title: 'es6 Generators详解' 
date: 2018-12-23 2:30:06
hidden: true
slug: q22frs8zn3i
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://exploringjs.com/es6/ch_generators.html" rel="nofollow noreferrer" target="_blank">翻译自</a></p>
<p><a href="https://github.com/xiyuyizhi/notes" rel="nofollow noreferrer" target="_blank">github</a></p>
<h2 id="articleHeader0">概述</h2>
<ol><li><h3 id="articleHeader1">什么是generators？</h3></li></ol>
<p>我们可以把generators理解成一段<code>可以暂停并重新开始执行的函数</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFunc() {
    // (A)
    console.log('First');
    yield; //(B)
    console.log('Second'); //(C)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFunc</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// (A)</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'First'</span>);
    <span class="hljs-keyword">yield</span>; <span class="hljs-comment">//(B)</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Second'</span>); <span class="hljs-comment">//(C)</span>
}</code></pre>
<p>function*是定义generator函数的关键字，yield是一个操作符，generator 可以通过yield暂停自己执行，另外，<code>generator可以通过yield接受输入和对外输入</code></p>
<p>当我们调用genFunc(),我们得到一个generator对象genObj,我们可以通过这个genObj控制程序的执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const genObj = genFunc()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> genObj = genFunc()</code></pre>
<p><em><code>上面的程序初始会暂停在行A</code>，调用genObj.next()会使程序继续执行直到遇到下一个yield</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> genObj.next();
First
{ value: undefined, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&gt; <span class="hljs-selector-tag">genObj</span><span class="hljs-selector-class">.next</span>();
<span class="hljs-selector-tag">First</span>
{ <span class="hljs-attribute">value</span>: undefined, done: false }</code></pre>
<p>这里先忽略genObj.next()返回的对象，之后会介绍</p>
<p>现在，程序暂停在了行B，再次调用 genObj.next(),程序又开始执行，行C被执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> genObj.next()
Second
{ value: undefined, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&gt; <span class="hljs-selector-tag">genObj</span><span class="hljs-selector-class">.next</span>()
<span class="hljs-selector-tag">Second</span>
{ <span class="hljs-attribute">value</span>: undefined, done: true }</code></pre>
<p>然后，函数就执行结束了，再次调用genObj.next()也不会有什么效果了</p>
<ol><li><h3 id="articleHeader2">generator能扮演的角色</h3></li></ol>
<p><strong>generators 可以扮演三种角色</strong></p>
<ul><li>迭代器(数据生产者)</li></ul>
<p>每一个yield可以通过next()返回一个值，这意味着generators可以通过循环或递归生产一系列的值，因为generator对象实现了Iterable接口，<code>generator生产的一系列值可以被ES6中任意支持可迭代对象的结构处理</code>，两个例子，for of循环和扩展操作（...）</p>
<ul><li>观察者(数据消费者)</li></ul>
<p>yield可以通过next()接受一个值，这意味着<code>generator变成了一个暂停执行的数据消费者直到通过next()给generator传递了一个新值</code></p>
<ul><li>协作程序(数据生产者和消费者)</li></ul>
<p>考虑到generators是可以暂停的并且可以同时作为数据生产者和消费者，不会做太多的工作就可以把generator转变成协作程序(合作进行的多任务)</p>
<p>下面详细介绍这三种</p>
<h2 id="articleHeader3">generators作为数据生产者(iterators)</h2>
<p>generators同时实现了接口Iterable 和 Iterator（如下所示），这意味着，generator函数返回的对象<code>是一个迭代器也是一个可迭代的对象</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs capnproto"><code><span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">Iterable</span> </span>{
    [Symbol.iterator]() : Iterator;
}
<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">Iterator</span> </span>{
    next() : IteratorResult;
}
<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">IteratorResult</span> </span>{
    value : any;
    done : boolean;
}</code></pre>
<p>generator对象完整的接口后面会提到，这里删掉了接口Iterable的return()方法，因为这个方法这一小节用不到</p>
<p><em>generator函数通过yield生产一系列的值，这些值可以通过迭代器的next()方法来使用，</em>例如下面的generator函数生成了值a和b</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFunc(){
    yield 'a'
    yield 'b'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFunc</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'b'</span>
}</code></pre>
<p>交互展示如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> const genObj = genFunc();
> genObj.next()
{ value: 'a', done: false }

> genObj.next()
{ value: 'b', done: false }

> genObj.next() // done: true => end of sequence
{ value: undefined, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; const genObj = genFunc();
&gt; genObj.next()
{ <span class="hljs-string">value:</span> <span class="hljs-string">'a'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; genObj.next()
{ <span class="hljs-string">value:</span> <span class="hljs-string">'b'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; genObj.next() <span class="hljs-comment">// done: true =&gt; end of sequence</span>
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">true</span> }</code></pre>
<ol><li>
<h3 id="articleHeader4">迭代generator的三种方式</h3>
<ul><li>for of循环</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   for (const x of genFunc()) {
       console.log(x);
   }
   // Output:
   // a
   // b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> x <span class="hljs-keyword">of</span> genFunc()) {
       <span class="hljs-built_in">console</span>.log(x);
   }
   <span class="hljs-comment">// Output:</span>
   <span class="hljs-comment">// a</span>
   <span class="hljs-comment">// b</span></code></pre>
</li></ol>
<ul><li>扩展操作符(...)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [...genFunc()]; // ['a', 'b']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;">const arr = [...genFunc()]; // [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>]</code></pre>
<ul><li>解构赋值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> const [x, y] = genFunc();
> x
'a'
> y
'b'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>&gt; <span class="hljs-keyword">const</span> [x, y] = genFunc();
&gt; x
<span class="hljs-comment">'a'</span>
&gt; y
<span class="hljs-comment">'b'</span></code></pre>
<ol><li><h3 id="articleHeader5">generator中的return</h3></li></ol>
<p>上面的generator函数没有包含一个显式的return,一个隐式的return 返回undefined,让我们试验一个显式返回return的generator</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'result';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFuncWithReturn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'b'</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">'result'</span>;
}</code></pre>
<p>下面的结构表明<code>return 指定的值保存在最后一个next()返回的对象中</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> const genObjWithReturn = genFuncWithReturn();
> genObjWithReturn.next()
{ value: 'a', done: false }
> genObjWithReturn.next()
{ value: 'b', done: false }
> genObjWithReturn.next()
{ value: 'result', done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; const genObjWithReturn = genFuncWithReturn();
&gt; genObjWithReturn.next()
{ <span class="hljs-string">value:</span> <span class="hljs-string">'a'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }
&gt; genObjWithReturn.next()
{ <span class="hljs-string">value:</span> <span class="hljs-string">'b'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }
&gt; genObjWithReturn.next()
{ <span class="hljs-string">value:</span> <span class="hljs-string">'result'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">true</span> }</code></pre>
<p>然而，<code>大部分和可迭代对象一起工作的结构会忽略done属性是true的对象的value值</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (const x of genFuncWithReturn()) {
    console.log(x);
}
// Output:
// a
// b

const arr = [...genFuncWithReturn()]; // ['a', 'b']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> x <span class="hljs-keyword">of</span> genFuncWithReturn()) {
    <span class="hljs-built_in">console</span>.log(x);
}
<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// a</span>
<span class="hljs-comment">// b</span>

<span class="hljs-keyword">const</span> arr = [...genFuncWithReturn()]; <span class="hljs-comment">// ['a', 'b']</span></code></pre>
<p><code>yield*会考虑done属性为true的value值，后面会介绍</code></p>
<ol><li><h3 id="articleHeader6">generator函数中抛异常</h3></li></ol>
<p><code>如果一个异常离开了generator函数，next()可以抛出它</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFunc() {
    throw new Error('Problem!');
}
const genObj = genFunc();
genObj.next(); // Error: Problem!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFunc</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Problem!'</span>);
}
<span class="hljs-keyword">const</span> genObj = genFunc();
genObj.next(); <span class="hljs-comment">// Error: Problem!</span></code></pre>
<p>这意味着next()可以生产三种类型的值</p>
<ul>
<li>对于可迭代序列中的一项x，它返回 {value:x,done:false}</li>
<li>对于可迭代序列的最后一项,明确是return返回的z，它返回{value:z,done:true}</li>
<li>对于异常，它抛出这个异常</li>
</ul>
<ol><li><h3 id="articleHeader7">通过 yield*递归</h3></li></ol>
<p>我们只能在generator函数中使用yield，如果我们想通过generator实现递归算法，我们就需要一种方式来在一个generator中调用另一个generator，这就用到了yield*，现在，我们只介绍<code>yield*用在generator函数产生值的情况，之后介绍yield*用在generator接受值的情况</code></p>
<p>generator递归调用另一个generator的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'b'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'x'</span>;
    <span class="hljs-keyword">yield</span>* foo();
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'y'</span>;
}</code></pre>
<p>执行结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [...bar()];
//['x', 'a', 'b', 'y']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>const arr = [...bar()];
//[<span class="hljs-string">'x'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'y'</span>]</code></pre>
<p>在内部，yield*像下面这样工作的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* bar() {
    yield 'x';
    for (const value of foo()) {
        yield value;
    }
    yield 'y';
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'x'</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> value <span class="hljs-keyword">of</span> foo()) {
        <span class="hljs-keyword">yield</span> value;
    }
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'y'</span>;
}
</code></pre>
<p>另外，yield*的操作数不一定非得是一个generator函数生成的对象，可以是任何可迭代的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* bla() {
    yield 'sequence';
    yield* ['of', 'yielded'];
    yield 'values';
}
const arr = [...bla()];
// ['sequence', 'of', 'yielded', 'values']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">bla</span><span class="hljs-params">()</span></span> {
    <span class="hljs-built_in">yield</span> <span class="hljs-string">'sequence'</span>;
    <span class="hljs-built_in">yield</span>* [<span class="hljs-string">'of'</span>, <span class="hljs-string">'yielded'</span>];
    <span class="hljs-built_in">yield</span> <span class="hljs-string">'values'</span>;
}
const arr = [...bla()];
// [<span class="hljs-string">'sequence'</span>, <span class="hljs-string">'of'</span>, <span class="hljs-string">'yielded'</span>, <span class="hljs-string">'values'</span>]</code></pre>
<p><strong>yield*考虑可迭代对象的最后一个值</strong></p>
<p>ES6中的很多结构会忽略generator函数返回的可迭代对象的最后一个值(例如 for of，扩展操作符,如上面介绍过的那样)，但是，<code>yield*的结果是这个值</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
}
function* logReturned(genObj) {
    const result = yield* genObj;
    console.log(result); // (A)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFuncWithReturn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'b'</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">'The result'</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">logReturned</span>(<span class="hljs-params">genObj</span>) </span>{
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span>* genObj;
    <span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// (A)</span>
}</code></pre>
<p>执行结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> [...logReturned(genFuncWithReturn())]
The result
[ 'a', 'b' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>&gt; [...logReturned(genFuncWithReturn())]
<span class="hljs-symbol">The</span> result
[ <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span> ]</code></pre>
<h2 id="articleHeader8">generators作为数据消费者(observers)</h2>
<p>作为数据的消费者，generator函数返回的对象也实现了接口Observer</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Observer {
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">interface</span> <span class="hljs-title">Observer</span> {
    next(<span class="hljs-keyword">value</span>? : any) : <span class="hljs-keyword">void</span>;
    <span class="hljs-keyword">return</span>(<span class="hljs-keyword">value</span>? : any) : <span class="hljs-keyword">void</span>;
    <span class="hljs-keyword">throw</span>(error) : <span class="hljs-keyword">void</span>;
}</code></pre>
<p><code>作为observer,generator暂停执行直到它接受到输入值</code>，这有三种类型的输入，通过以下三种observer接口提供的方法</p>
<ul>
<li>next() 发送正常的输入</li>
<li>return() 终止generator</li>
<li>throw() 发送一个错误</li>
</ul>
<ol><li><h3 id="articleHeader9">通过next()发送值</h3></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`); // (A)
    console.log(`2. ${yield}`);
    return 'result';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">dataConsumer</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`1. <span class="hljs-subst">${<span class="hljs-keyword">yield</span>}</span>`</span>); <span class="hljs-comment">// (A)</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`2. <span class="hljs-subst">${<span class="hljs-keyword">yield</span>}</span>`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'result'</span>;
}</code></pre>
<p>首先得到generator对象</p>
<blockquote>const genObj = dataConsumer();</blockquote>
<p>然后执行genObj.next(),这会开始这个generator.执行到第一个yield处然后暂停。此时next()的结果是yield在行A产出的值(<code>是undifined，因为这地方的yield后面没有操作数</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> genObj.next()
//Started
{ value: undefined, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; genObj.next()
<span class="hljs-comment">//Started</span>
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }</code></pre>
<p>然后再调用next()两次，第一次传个参数'a',第二次传参数'b'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> genObj.next('a')
//1. a
{ value: undefined, done: false }

> genObj.next('b')
//2. b
{ value: 'result', done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; genObj.next(<span class="hljs-string">'a'</span>)
<span class="hljs-comment">//1. a</span>
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; genObj.next(<span class="hljs-string">'b'</span>)
<span class="hljs-comment">//2. b</span>
{ <span class="hljs-string">value:</span> <span class="hljs-string">'result'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">true</span> }</code></pre>
<p>可以看到，<code>第一个next()调用的作用仅仅是开始这个generator，只是为了后面的输入做准备</code></p>
<p>可以封装一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function coroutine(generatorFunction) {
    return function (...args) {
        const generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">coroutine</span><span class="hljs-params">(generatorFunction)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
        <span class="hljs-keyword">const</span> generatorObject = generatorFunction(...args);
        generatorObject.next();
        <span class="hljs-keyword">return</span> generatorObject;
    };
}</code></pre>
<p>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const wrapped = coroutine(function* () {
    console.log(`First input: ${yield}`);
    return 'DONE';
});

> wrapped().next('hello!')
First input: hello!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> wrapped = coroutine(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`First input: <span class="hljs-subst">${<span class="hljs-keyword">yield</span>}</span>`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'DONE'</span>;
});

&gt; wrapped().next(<span class="hljs-string">'hello!'</span>)
First input: hello!
</code></pre>
<ol><li><h3 id="articleHeader10">return() 和 throw()</h3></li></ol>
<p>generator对象有两个另外的方法,return()和throw(),和next()类似</p>
<p>让我们回顾一下next()是怎么工作的：</p>
<ol>
<li>generator暂停在yield操作符</li>
<li>发送x给这个yield</li>
<li>
<p>继续执行到下一个yield，return或者throw:</p>
<ul>
<li>yield x 导致 next() 返回 {value: x, done: false}</li>
<li>return x 导致 next() 返回 {value:x, done:true}</li>
<li>throw err 导致 next() 抛出err</li>
</ul>
</li>
</ol>
<p>return()和throw() 和next()类似工作，但在第二步有所不同</p>
<ul>
<li>return(x) 在 yield的位置执行 return x</li>
<li>throw(x) 在yield的位置执行throw x</li>
</ul>
<p><strong>return()终止generator</strong></p>
<p>return() 在 yield的位置执行return</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFunc1() {
    try {
        console.log('Started');
        yield; // (A)
    } finally {
        console.log('Exiting');
    }
}

> const genObj1 = genFunc1();
> genObj1.next()
Started
{ value: undefined, done: false }
> genObj1.return('Result')
Exiting
{ value: 'Result', done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFunc1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>);
        <span class="hljs-keyword">yield</span>; <span class="hljs-comment">// (A)</span>
    } <span class="hljs-keyword">finally</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Exiting'</span>);
    }
}

&gt; <span class="hljs-keyword">const</span> genObj1 = genFunc1();
&gt; genObj1.next()
Started
{ <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> }
&gt; genObj1.return(<span class="hljs-string">'Result'</span>)
Exiting
{ <span class="hljs-attr">value</span>: <span class="hljs-string">'Result'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> }</code></pre>
<p><strong>阻止终止</strong></p>
<p>我们可以阻止return()终止generator如果yield是在finally块内（或者在finally中使用return语句）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFunc2() {
    try {
        console.log('Started');
        yield;
    } finally {
        yield 'Not done, yet!';
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFunc2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>);
        <span class="hljs-keyword">yield</span>;
    } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">yield</span> <span class="hljs-string">'Not done, yet!'</span>;
    }
}</code></pre>
<p>这一次，return()没有退出generator函数，当然，return()返回的对象的done属性就是false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> const genObj2 = genFunc2();

> genObj2.next()
Started
{ value: undefined, done: false }

> genObj2.return('Result')
{ value: 'Not done, yet!', done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; const genObj2 = genFunc2();

&gt; genObj2.next()
Started
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; genObj2.<span class="hljs-keyword">return</span>(<span class="hljs-string">'Result'</span>)
{ <span class="hljs-string">value:</span> <span class="hljs-string">'Not done, yet!'</span>, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }</code></pre>
<p>可以再执行一次next()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> genObj2.next()
{ value: 'Result', done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&gt; <span class="hljs-selector-tag">genObj2</span><span class="hljs-selector-class">.next</span>()
{ <span class="hljs-attribute">value</span>: <span class="hljs-string">'Result'</span>, done: true }</code></pre>
<p><strong>发送一个错误</strong></p>
<p>throw()在yield的位置抛一个异常</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFunc1() {
    try {
        console.log('Started');
        yield; // (A)
    } catch (error) {
        console.log('Caught: ' + error);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFunc1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>);
        <span class="hljs-keyword">yield</span>; <span class="hljs-comment">// (A)</span>
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Caught: '</span> + error);
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> const genObj1 = genFunc1();

> genObj1.next()
Started
{ value: undefined, done: false }

> genObj1.throw(new Error('Problem!'))
Caught: Error: Problem!
{ value: undefined, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; const genObj1 = genFunc1();

&gt; genObj1.next()
Started
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; genObj1.<span class="hljs-keyword">throw</span>(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'Problem!'</span>))
<span class="hljs-string">Caught:</span> <span class="hljs-string">Error:</span> Problem!
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">true</span> }</code></pre>
<ol><li><h3 id="articleHeader11">yield* 完整的故事</h3></li></ol>
<p>到目前为止，我们只看到以yield<em>的一个层面: 它传播生成的值从被调用者到调用者。既然我们现在对generator接受值感兴趣，我们就来看一下yield</em>的另一个层面：yield*可以发送调用者接受的值给被调用者。<code>在某种程度上，被调用者变成了活跃的generator,它可以被调用者生成的对象控制</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* callee() {
    console.log('callee: ' + (yield));
}
function* caller() {
    while (true) {
        yield* callee();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">callee</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'callee: '</span> + (<span class="hljs-keyword">yield</span>));
}
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">caller</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">yield</span>* callee();
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> const callerObj = caller();

> callerObj.next() // start
{ value: undefined, done: false }

> callerObj.next('a')
callee: a
{ value: undefined, done: false }

> callerObj.next('b')
callee: b
{ value: undefined, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; const callerObj = caller();

&gt; callerObj.next() <span class="hljs-comment">// start</span>
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; callerObj.next(<span class="hljs-string">'a'</span>)
<span class="hljs-string">callee:</span> a
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }

&gt; callerObj.next(<span class="hljs-string">'b'</span>)
<span class="hljs-string">callee:</span> b
{ <span class="hljs-string">value:</span> undefined, <span class="hljs-string">done:</span> <span class="hljs-literal">false</span> }</code></pre>
<h2 id="articleHeader12">generators作为协同程序(协作多个任务)</h2>
<p>这一节介绍generator完整的接口(组合作为数据生产者和消费者两种角色)和一个同时要使用这两种角色的使用场景：协同操作多任务</p>
<ol><li><h4>完整的接口</h4></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Generator {
    next(value? : any) : IteratorResult;
    throw(value? : any) : IteratorResult;
    return(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">Generator</span> {</span>
    next(value? : any) : IteratorResult;
    <span class="hljs-keyword">throw</span>(value? : any) : IteratorResult;
    <span class="hljs-keyword">return</span>(value? : any) : IteratorResult;
}
<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">IteratorResult</span> {</span>
    <span class="hljs-string">value :</span> any;
    <span class="hljs-string">done :</span> <span class="hljs-keyword">boolean</span>;
}</code></pre>
<p>接口Generator结合了我们之前介绍过的两个接口：输出的Iterator和输入的Observer</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Iterator { // data producer
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}

interface Observer { // data consumer
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">interface</span> <span class="hljs-title">Iterator</span> { <span class="hljs-comment">// data producer</span>
    next() : IteratorResult;
    <span class="hljs-keyword">return</span>?(<span class="hljs-keyword">value</span>? : any) : IteratorResult;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title">Observer</span> { <span class="hljs-comment">// data consumer</span>
    next(<span class="hljs-keyword">value</span>? : any) : <span class="hljs-keyword">void</span>;
    <span class="hljs-keyword">return</span>(<span class="hljs-keyword">value</span>? : any) : <span class="hljs-keyword">void</span>;
    <span class="hljs-keyword">throw</span>(error) : <span class="hljs-keyword">void</span>;
}</code></pre>
<ol><li><h3 id="articleHeader13">合作多任务</h3></li></ol>
<p>合作多任务是我们需要generators同时处理输入和输出，在介绍generator是如何工作的之前，让我们先复习一下<code>JavaScript当前的并行状态</code></p>
<p>js是单线程的，但有两种方式可以消除这种限制</p>
<ul>
<li>多进程： Web Worker可以让我们以多进程的方式运行js，对数据的共享访问是多进程的最大缺陷之一，Web Worker避免这种缺陷通过不分享任何数据。也就是说，如果你想让Web Worker拥有一段数据，要么发送给它一个数据的副本，要么把数据传给它(这样之后，你就不能再访问这些数据了)</li>
<li>合作多任务：有不同的模式和库可以尝试进行多任务处理，运行多个任务，但每次只执行一个任务。每个任务必须显式地挂起自己，在任务切换发生时给予它完全的控制。在这些尝试中，数据经常在任务之间共享。但由于明确的暂停，几乎没有风险。</li>
</ul>
<p><strong>通过generators来简化异步操作</strong></p>
<p>一些基于Promise的库通过generator来简化了异步代码，generators作为Promise的客户是非常理想的，因为它们可以暂停直到结果返回</p>
<p>下面的例子表明<a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co</a>是如何工作的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="co(function* () {
    try {
        const [croftStr, bondStr] = yield Promise.all([  // (A)
            getFile('http://localhost:8000/croft.json'),
            getFile('http://localhost:8000/bond.json'),
        ]);
        const croftJson = JSON.parse(croftStr);
        const bondJson = JSON.parse(bondStr);

        console.log(croftJson);
        console.log(bondJson);
    } catch (e) {
        console.log('Failure to read: ' + e);
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>co(<span class="hljs-name">function*</span> () {
    try {
        const [croftStr, bondStr] = yield Promise.all([  // (<span class="hljs-name">A</span>)
            getFile('http<span class="hljs-symbol">://localhost</span>:<span class="hljs-number">8000</span>/croft.json'),
            getFile('http<span class="hljs-symbol">://localhost</span>:<span class="hljs-number">8000</span>/bond.json'),
        ])<span class="hljs-comment">;</span>
        const croftJson = JSON.parse(<span class="hljs-name">croftStr</span>)<span class="hljs-comment">;</span>
        const bondJson = JSON.parse(<span class="hljs-name">bondStr</span>)<span class="hljs-comment">;</span>

        console.log(<span class="hljs-name">croftJson</span>)<span class="hljs-comment">;</span>
        console.log(<span class="hljs-name">bondJson</span>)<span class="hljs-comment">;</span>
    } catch (<span class="hljs-name">e</span>) {
        console.log('Failure to read: ' + e)<span class="hljs-comment">;</span>
    }
})<span class="hljs-comment">;</span>
</code></pre>
<p>注意这段代码看起来是多么的同步啊，虽然它在行A处执行了一个异步调用。</p>
<p>使用generators对co的一个简单的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function co(genFunc) {
    const genObj = genFunc();
    step(genObj.next());

    function step({value,done}) {
        if (!done) {
            // A Promise was yielded
            value
            .then(result => {
                step(genObj.next(result)); // (A)
            })
            .catch(error => {
                step(genObj.throw(error)); // (B)
            });
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">genFunc</span>) </span>{
    <span class="hljs-keyword">const</span> genObj = genFunc();
    step(genObj.next());

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params">{value,done}</span>) </span>{
        <span class="hljs-keyword">if</span> (!done) {
            <span class="hljs-comment">// A Promise was yielded</span>
            value
            .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
                step(genObj.next(result)); <span class="hljs-comment">// (A)</span>
            })
            .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                step(genObj.throw(error)); <span class="hljs-comment">// (B)</span>
            });
        }
    }
}
</code></pre>
<p>这里忽略了next()（行A）和throw（）（行B）可以回抛异常</p>
<p>借助上面的使用分析一下：</p>
<p>首先得到generator对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const genObj = genFunc();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">const genObj</span> = genFunc();</code></pre>
<p>然后将genObj.next()的返回值传递给step方法</p>
<p>step()中获取到value和done，如果generator没有执行完，当前的value就是上面使用中定义的promise</p>
<p>等到promise执行完，然后将结果result传递给generator函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="genObj.next(result)

然后在generator中程序继续往下执行

const [croftStr, bondStr] = yield XXXX
.
.
.
.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>genObj.next(result)

然后在generator中程序继续往下执行

const [croftStr, bondStr] = yield <span class="hljs-symbol">XXXX</span>
.
.
.
.
</code></pre>
<p>注意行A处递归调用step(genObj.next(result)),使得generator函数中可以存在多个异步调用，而co都能处理</p>
<p>整个过程多么的巧妙啊。。。。。。。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6 Generators详解

## 原文链接
[https://segmentfault.com/a/1190000012358863](https://segmentfault.com/a/1190000012358863)


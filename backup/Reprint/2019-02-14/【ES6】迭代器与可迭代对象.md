---
title: '【ES6】迭代器与可迭代对象' 
date: 2019-02-14 2:30:37
hidden: true
slug: vjzydjcscsb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>ES6 新的数组方法、集合、for-of 循环、展开运算符（...）甚至异步编程都依赖于迭代器（Iterator ）实现。本文会详解 ES6 的迭代器与生成器，并进一步挖掘可迭代对象的内部原理与使用方法</blockquote>
<h1 id="articleHeader0">一、迭代器的原理</h1>
<blockquote>在编程语言中处理数组或集合时，使用循环语句必须要初始化一个变量记录迭代位置，而程序化地使用迭代器可以简化这种数据操作</blockquote>
<p><strong>如何设计一个迭代器呢？</strong></p>
<p>迭代器的本身是一个对象，这个对象有 next( ) 方法返回结果对象，这个结果对象有下一个返回值 value、迭代完成布尔值 done，模拟创建一个简单迭代器如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createIterator(iterms) {
  let i = 0
  return {
    next() {
      let done = (i >= iterms.length)
      let value = !done ? iterms[i++] : undefined
      return {
        done,
        value
      }
    }
  }
}

let arrayIterator = createIterator([1, 2, 3])

console.log(arrayIterator.next()) // { done: false, value: 1 }
console.log(arrayIterator.next()) // { done: false, value: 2 }
console.log(arrayIterator.next()) // { done: false, value: 3 }
console.log(arrayIterator.next()) // { done: true, value: undefined }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIterator</span>(<span class="hljs-params">iterms</span>) </span>{
  <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>
  <span class="hljs-keyword">return</span> {
    next() {
      <span class="hljs-keyword">let</span> done = (i &gt;= iterms.length)
      <span class="hljs-keyword">let</span> value = !done ? iterms[i++] : <span class="hljs-literal">undefined</span>
      <span class="hljs-keyword">return</span> {
        done,
        value
      }
    }
  }
}

<span class="hljs-keyword">let</span> arrayIterator = createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])

<span class="hljs-built_in">console</span>.log(arrayIterator.next()) <span class="hljs-comment">// { done: false, value: 1 }</span>
<span class="hljs-built_in">console</span>.log(arrayIterator.next()) <span class="hljs-comment">// { done: false, value: 2 }</span>
<span class="hljs-built_in">console</span>.log(arrayIterator.next()) <span class="hljs-comment">// { done: false, value: 3 }</span>
<span class="hljs-built_in">console</span>.log(arrayIterator.next()) <span class="hljs-comment">// { done: true, value: undefined }</span></code></pre>
<blockquote>对以上语法感到困惑的，可参考：<a href="https://segmentfault.com/a/1190000016746873">【ES6】对象的新功能与解构赋值</a>
</blockquote>
<p>每次调用迭代器的 next( ) 都会返回下一个对象，直到数据集被用尽。</p>
<p>ES6 中迭代器的编写规则类似，但引入了<strong>生成器对象</strong>，更简单的创建迭代器对象</p>
<h1 id="articleHeader1">二、创建迭代器</h1>
<p>ES6 封装了一个<strong>生成器</strong>用来创建迭代器。显然生成器是返回迭代器的函数，这个函数通过 function 后的星号（*）表示，并使用新的<strong>内部专用</strong>关键字<code>yield</code>指定迭代器 next( ) 方法的返回值。</p>
<p><strong>如何使用 ES6 生成器创建一个迭代器呢？</strong>一个简单的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator() {
  yield 123;
  yield 'someValue'
}

let someIterator = createIterator()

console.log(someIterator.next()) // { value: 123, done: false }
console.log(someIterator.next()) // { value: 'someValue', done: false }
console.log(someIterator.next()) // { value: undefined, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">123</span>;
  <span class="hljs-keyword">yield</span> <span class="hljs-string">'someValue'</span>
}

<span class="hljs-keyword">let</span> someIterator = createIterator()

<span class="hljs-built_in">console</span>.log(someIterator.next()) <span class="hljs-comment">// { value: 123, done: false }</span>
<span class="hljs-built_in">console</span>.log(someIterator.next()) <span class="hljs-comment">// { value: 'someValue', done: false }</span>
<span class="hljs-built_in">console</span>.log(someIterator.next()) <span class="hljs-comment">// { value: undefined, done: true }</span></code></pre>
<p>使用<code>yield</code>关键字可以返回任意值或表达式，可以给迭代器批量添加元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// let createIterator = function *(items) { // 生成器函数表达式
function *createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i]
  }
}

let someIterator = createIterator([123, 'someValue'])

console.log(someIterator.next()) // { value: 123, done: false }
console.log(someIterator.next()) // { value: 'someValue', done: false }
console.log(someIterator.next()) // { value: undefined, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// let createIterator = function *(items) { // 生成器函数表达式</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params">items</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; items.length; i++) {
    <span class="hljs-keyword">yield</span> items[i]
  }
}

<span class="hljs-keyword">let</span> someIterator = createIterator([<span class="hljs-number">123</span>, <span class="hljs-string">'someValue'</span>])

<span class="hljs-built_in">console</span>.log(someIterator.next()) <span class="hljs-comment">// { value: 123, done: false }</span>
<span class="hljs-built_in">console</span>.log(someIterator.next()) <span class="hljs-comment">// { value: 'someValue', done: false }</span>
<span class="hljs-built_in">console</span>.log(someIterator.next()) <span class="hljs-comment">// { value: undefined, done: true }</span></code></pre>
<p>由于生成器本身是函数，所以可添加到对象中，使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  // createIterator: function *(items) { // ES5
  *createIterator(items) { // ES6
    for (let i = 0; i < items.length; i++) {
      yield items[i]
    }
  }
}
let someIterator = obj.createIterator([123, 'someValue'])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-comment">// createIterator: function *(items) { // ES5</span>
  *createIterator(items) { <span class="hljs-comment">// ES6</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; items.length; i++) {
      <span class="hljs-keyword">yield</span> items[i]
    }
  }
}
<span class="hljs-keyword">let</span> someIterator = obj.createIterator([<span class="hljs-number">123</span>, <span class="hljs-string">'someValue'</span>])</code></pre>
<blockquote>生成器函数的一个特点是，<strong>当执行完一句 yield 语句后函数会自动停止执行</strong>，再次调用迭代器的 next( ) 方法才会继续执行下一个 yield 语句。<br>这种<strong>自动中止函数执行</strong>的能力衍生出很多高级用法。</blockquote>
<h1 id="articleHeader2">三、可迭代对象</h1>
<p>在 ES6 中常用的<strong>集合对象（数组、Set/Map集合）和字符串都是可迭代对象</strong>，这些对象都有默认的迭代器和<code>Symbol.iterator</code>属性。</p>
<p><strong>通过生成器创建的迭代器也是可迭代对象</strong>，因为生成器默认会为<code>Symbol.iterator</code>属性赋值。</p>
<h2 id="articleHeader3">3.1 Symbol.iterator</h2>
<p>可迭代对象具有<code>Symbol.iterator</code>属性，即具有<code>Symbol.iterator</code>属性的对象都有默认迭代器。</p>
<p>我们可以用<code>Symbol.iterator</code>来<strong>访问对象的默认迭代器</strong>，例如对于一个数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let list = [11, 22, 33]
let iterator = list[Symbol.iterator]()
console.log(iterator.next()) // { value: 11, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> list = [<span class="hljs-number">11</span>, <span class="hljs-number">22</span>, <span class="hljs-number">33</span>]
<span class="hljs-keyword">let</span> iterator = list[<span class="hljs-built_in">Symbol</span>.iterator]()
<span class="hljs-built_in">console</span>.log(iterator.next()) <span class="hljs-comment">// { value: 11, done: false }</span></code></pre>
<p><code>Symbol.iterator</code>获得了数组这个可迭代对象的默认迭代器，并操作它遍历了数组中的元素。</p>
<p>反之，我们可以用<code>Symbol.iterator</code>来<strong>检测对象是否为可迭代对象</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isIterator(obj) {
  return typeof obj[Symbol.iterator] === 'function'
}

console.log(isIterator([11, 22, 33])) // true
console.log(isIterator('sometring')) // true
console.log(isIterator(new Map())) // true
console.log(isIterator(new Set())) // true
console.log(isIterator(new WeakMap())) // false
console.log(isIterator(new WeakSet())) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isIterator</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> obj[<span class="hljs-built_in">Symbol</span>.iterator] === <span class="hljs-string">'function'</span>
}

<span class="hljs-built_in">console</span>.log(isIterator([<span class="hljs-number">11</span>, <span class="hljs-number">22</span>, <span class="hljs-number">33</span>])) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterator(<span class="hljs-string">'sometring'</span>)) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterator(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>())) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterator(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>())) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterator(<span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>())) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(isIterator(<span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakSet</span>())) <span class="hljs-comment">// false</span></code></pre>
<p>显然数组、Set/Map 集合、字符串都是可迭代对象，而 WeakSet/WeakMap 集合（弱引用集合）是不可迭代的。</p>
<h2 id="articleHeader4">3.2 创建可迭代对象</h2>
<p>默认情况下，自定义的对象都是不可迭代的。</p>
<p>刚才讲过，通过生成器创建的迭代器也是一种可迭代对象，生成器默认会为<code>Symbol.iterator</code>属性赋值。</p>
<p>那如何<strong>将自定义对象变为可迭代对象</strong>呢？通过给<code>Symbol.iterator</code>属性添加一个生成器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let collection = {
  items: [11,22,33],
  *[Symbol.iterator]() {
    for (let item of this.items){
      yield item
    }
  }
}

console.log(isIterator(collection)) // true

for (let item of collection){
  console.log(item) // 11 22 33
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> collection = {
  <span class="hljs-attr">items</span>: [<span class="hljs-number">11</span>,<span class="hljs-number">22</span>,<span class="hljs-number">33</span>],
  *[<span class="hljs-built_in">Symbol</span>.iterator]() {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.items){
      <span class="hljs-keyword">yield</span> item
    }
  }
}

<span class="hljs-built_in">console</span>.log(isIterator(collection)) <span class="hljs-comment">// true</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> collection){
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// 11 22 33</span>
}</code></pre>
<p>数组 items 是可迭代对象，collection 对象通过给<code>Symbol.iterator</code>属性赋值也成为可迭代对象。</p>
<h2 id="articleHeader5">3.3 for-of</h2>
<p>注意到上个栗子使用了<code>for-of</code>代替索引循环，<code>for-of</code>是 ES6 为可迭代对象新加入的特性。</p>
<p><strong>思考一下<code>for-of</code>循环的实现原理</strong>。</p>
<p>对于使用<code>for-of</code>的可迭代对象，<code>for-of</code>每执行一次就会调用这个可迭代对象的 next( )，并将返回结果存储在一个变量中，持续执行直到可迭代对象 done 属性值为 false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 迭代一个字符串
let str = 'somestring'

for (let item of str){
  console.log(item) // s o m e s t r i n g
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 迭代一个字符串</span>
<span class="hljs-keyword">let</span> str = <span class="hljs-string">'somestring'</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> str){
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// s o m e s t r i n g</span>
}</code></pre>
<p>本质上来说，<code>for-of</code>调用 str 字符串的<code>Symbol.iterator</code>属性方法获取迭代器（这个过程由 JS 引擎完成），然后多次调用 next( ) 方法将对象 value 值存储在 item 变量。</p>
<blockquote>将<code>for-of</code>用于不可迭代对象、null 或 undefined 会报错！</blockquote>
<h2 id="articleHeader6">3.4 展开运算符（...）</h2>
<p>ES6 语法糖<strong>展开运算符（...）也是服务于可迭代对象</strong>，即只可以“展开”数组、集合、字符串、自定义可迭代对象。</p>
<p>以下栗子输出不同可迭代对象展开运算符计算的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = 'somestring'
console.log(...str) // s o m e s t r i n g


let set = new Set([1, 2, 2, 5, 8, 8, 8, 9])
console.log(set) // Set { 1, 2, 5, 8, 9 }
console.log(...set) // 1 2 5 8 9


let map = new Map([['name', 'jenny'], ['id', 123]])
console.log(map) // Map { 'name' => 'jenny', 'id' => 123 }
console.log(...map) // [ 'name', 'jenny' ] [ 'id', 123 ]


let num1 = [1, 2, 3], num2 = [7, 8, 9]
console.log([...num1, ...num2]) // [ 1, 2, 3, 7, 8, 9 ]


let udf
console.log(...udf) // TypeError: undefined is not iterable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> str = <span class="hljs-string">'somestring'</span>
<span class="hljs-built_in">console</span>.log(...str) <span class="hljs-comment">// s o m e s t r i n g</span>


<span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>])
<span class="hljs-built_in">console</span>.log(set) <span class="hljs-comment">// Set { 1, 2, 5, 8, 9 }</span>
<span class="hljs-built_in">console</span>.log(...set) <span class="hljs-comment">// 1 2 5 8 9</span>


<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-string">'name'</span>, <span class="hljs-string">'jenny'</span>], [<span class="hljs-string">'id'</span>, <span class="hljs-number">123</span>]])
<span class="hljs-built_in">console</span>.log(map) <span class="hljs-comment">// Map { 'name' =&gt; 'jenny', 'id' =&gt; 123 }</span>
<span class="hljs-built_in">console</span>.log(...map) <span class="hljs-comment">// [ 'name', 'jenny' ] [ 'id', 123 ]</span>


<span class="hljs-keyword">let</span> num1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], num2 = [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>]
<span class="hljs-built_in">console</span>.log([...num1, ...num2]) <span class="hljs-comment">// [ 1, 2, 3, 7, 8, 9 ]</span>


<span class="hljs-keyword">let</span> udf
<span class="hljs-built_in">console</span>.log(...udf) <span class="hljs-comment">// TypeError: undefined is not iterable</span></code></pre>
<p>由以上代码可以看出，展开运算符（...）可以便捷地将可迭代对象转换为数组。同<code>for-of</code>一样，展开运算符（...）用于不可迭代对象、null 或 undefined 会报错！</p>
<h1 id="articleHeader7">四. 默认迭代器</h1>
<p>ES6 为很多内置对象提供了默认的迭代器，只有当内建的迭代器不能满足需求时才自己创建迭代器。</p>
<p>ES6 的 三个集合对象：Set、Map、Array 都有默认的迭代器，常用的如<code>values()</code>方法、<code>entries()</code>方法都返回一个迭代器，其值区别如下：</p>
<ul>
<li>
<code>entries()</code>：多个键值对</li>
<li>
<code>values()</code>：集合的值</li>
<li>
<code>keys()</code>：集合的键</li>
</ul>
<p>调用以上方法都可以得到集合的迭代器，并使用<code>for-of</code>循环，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******** Map ***********/
let map = new Map([['name', 'jenny'], ['id', 123]])

for(let item of map.entries()){
  console.log(item) // [ 'name', 'jenny' ]  [ 'id', 123 ]
}
for(let item of map.keys()){
  console.log(item) // name id
}
for (let item of map.values()) {
  console.log(item) // jenny 123
}

/******** Set ***********/
let set = new Set([1, 4, 4, 5, 5, 5, 6, 6,])

for(let item of set.entries()){
  console.log(item) // [ 1, 1 ] [ 4, 4 ] [ 5, 5 ] [ 6, 6 ]
}

/********* Array **********/
let array = [11, 22, 33]

for(let item of array.entries()){
  console.log(item) // [ 0, 11 ] [ 1, 22 ] [ 2, 33 ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/******** Map ***********/</span>
<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-string">'name'</span>, <span class="hljs-string">'jenny'</span>], [<span class="hljs-string">'id'</span>, <span class="hljs-number">123</span>]])

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> map.entries()){
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// [ 'name', 'jenny' ]  [ 'id', 123 ]</span>
}
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> map.keys()){
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// name id</span>
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> map.values()) {
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// jenny 123</span>
}

<span class="hljs-comment">/******** Set ***********/</span>
<span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">6</span>,])

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.entries()){
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// [ 1, 1 ] [ 4, 4 ] [ 5, 5 ] [ 6, 6 ]</span>
}

<span class="hljs-comment">/********* Array **********/</span>
<span class="hljs-keyword">let</span> array = [<span class="hljs-number">11</span>, <span class="hljs-number">22</span>, <span class="hljs-number">33</span>]

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> array.entries()){
  <span class="hljs-built_in">console</span>.log(item) <span class="hljs-comment">// [ 0, 11 ] [ 1, 22 ] [ 2, 33 ]</span>
}</code></pre>
<p>此外 String 和 NodeList 类型都有默认的迭代器，虽然没有提供其它的方法，但可以用<code>for-of</code>循环</p>
<hr>
<p><em>推荐阅读《深入理解ES6》</em></p>
<hr>
<h4>加油哦~ 少年！</h4>
<p><span class="img-wrap"><img data-src="/img/bVbiSAN?w=750&amp;h=359" src="https://static.alili.tech/img/bVbiSAN?w=750&amp;h=359" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【ES6】迭代器与可迭代对象

## 原文链接
[https://segmentfault.com/a/1190000016824284](https://segmentfault.com/a/1190000016824284)


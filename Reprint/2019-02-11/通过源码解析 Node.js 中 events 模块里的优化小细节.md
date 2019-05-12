---
title: '通过源码解析 Node.js 中 events 模块里的优化小细节' 
date: 2019-02-11 2:30:49
hidden: true
slug: m3bhdbe6at9
categories: [reprint]
---

{{< raw >}}

                    
<p>之前的文章里有说，在 Node.js 中，流（<code>stream</code>）是许许多多原生对象的父类，角色可谓十分重要。但是，当我们沿着“族谱”往上看时，会发现 <code>EventEmitter</code> 类是流（<code>stream</code>）类的父类，所以可以说，<code>EventEmitter</code> 类是 Node.js 的根基类之一，地位可显一般。虽然 <code>EventEmitter</code> 类暴露的接口并不多而且十分简单，并且是少数纯 <code>JavaScript</code> 实现的模块之一，但因为它的应用实在是太广泛，身份太基础，所以在它的实现里处处闪光着一些优化代码执行效率，和保证极端情况下代码结果正确性的小细节。在了解之后，我们也可以将其使用到我们的日常编码之后，学以致用。</p>
<p>好，现在就让我们跟随 Node.js 项目中的 <code>lib/events.js</code> 中的代码，来逐一了解：</p>
<ul>
<li><p>效率更高的 键 / 值 对存储对象的创建。</p></li>
<li><p>效率更高的从数组中去除一个元素。</p></li>
<li><p>效率更高的不定参数的函数调用。</p></li>
<li><p>如果防止在一个事件监听器中监听同一个事件，接而导致死循环？</p></li>
<li><p><code>emitter.once</code> 是怎么办到的？</p></li>
</ul>
<h2 id="articleHeader0">效率更高的 键 / 值 对存储对象的创建</h2>
<p>在 <code>EventEmitter</code> 类中，以 键 / 值 对的方式来存储事件名和对应的监听器。在 <code>Node.js</code>里 ，最简单的 键 / 值 对的存储方式就是直接创建一个空对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = {}
store.key = 'value'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> store = {}
store.key = <span class="hljs-string">'value'</span></code></pre>
<p>你可能会说，ES2015 中的 <code>Map</code> 已经在目前版本的 Node.js 中可用了，在语义上它更有优势：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Map()
store.set('key', 'value')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> store = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()
store.set(<span class="hljs-string">'key'</span>, <span class="hljs-string">'value'</span>)</code></pre>
<p>不过，你可能只需要一个纯粹的 键 / 值 对存储对象，并不需要 <code>Object</code> 和 <code>Map</code> 这两个类的原型中的提供的那些多余的方法，所以你直接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = Object.create(null)
store.key = 'value'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> store = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
store.key = <span class="hljs-string">'value'</span></code></pre>
<p>好，我们已经做的挺极致了，但这还不是 <code>EventEmitter</code> 中的最终实现，它的办法是使用一个空的构造函数，并且把这个构造的原型事先置空：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Store () {}
Store.prototype = Object.create(null)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Store</span> (<span class="hljs-params"></span>) </span>{}
Store.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)</code></pre>
<p>然后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Store()
store.key = 'value'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> store = <span class="hljs-keyword">new</span> Store()
store.key = <span class="hljs-string">'value'</span></code></pre>
<p>现在让我们来比一比效率，代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* global suite bench */
'use strict'

suite('key / value store', function () {
  function Store () {}
  Store.prototype = Object.create(null)

  bench('let store = {}', function () {
    let store = {}
    store.key = 'value'
  })

  bench('let store = new Map()', function () {
    let store = new Map()
    store.set('key', 'value')
  })

  bench('let store = Object.create(null)', function () {
    let store = Object.create(null)
    store.key = 'value'
  })

  bench('EventEmitter way', function () {
    let store = new Store()
    store.key = 'value'
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* global suite bench */</span>
<span class="hljs-meta">'use strict'</span>

suite(<span class="hljs-string">'key / value store'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Store</span> (<span class="hljs-params"></span>) </span>{}
  Store.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)

  bench(<span class="hljs-string">'let store = {}'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> store = {}
    store.key = <span class="hljs-string">'value'</span>
  })

  bench(<span class="hljs-string">'let store = new Map()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> store = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()
    store.set(<span class="hljs-string">'key'</span>, <span class="hljs-string">'value'</span>)
  })

  bench(<span class="hljs-string">'let store = Object.create(null)'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> store = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
    store.key = <span class="hljs-string">'value'</span>
  })

  bench(<span class="hljs-string">'EventEmitter way'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> store = <span class="hljs-keyword">new</span> Store()
    store.key = <span class="hljs-string">'value'</span>
  })
})</code></pre>
<p>比较结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      key / value store
      83,196,978 op/s » let store = {}
       4,826,143 op/s » let store = new Map()
       7,405,904 op/s » let store = Object.create(null)
     165,608,103 op/s » EventEmitter way" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>                      <span class="hljs-type">key</span> / value store
      <span class="hljs-number">83</span>,<span class="hljs-number">196</span>,<span class="hljs-number">978</span> op/s » let store = {}
       <span class="hljs-number">4</span>,<span class="hljs-number">826</span>,<span class="hljs-number">143</span> op/s » let store = new Map()
       <span class="hljs-number">7</span>,<span class="hljs-number">405</span>,<span class="hljs-number">904</span> op/s » let store = Object.create(null)
     <span class="hljs-number">165</span>,<span class="hljs-number">608</span>,<span class="hljs-number">103</span> op/s » EventEmitter way</code></pre>
<h2 id="articleHeader1">效率更高的从数组中去除一个元素</h2>
<p>在 <code>EventEmitter#removeListener</code> 这个 API 的实现里，需要从存储的监听器数组中除去一个元素，我们首先想到的就是使用 <code>Array#splice</code> 这个 API ，即 <code>arr.splice(i, 1)</code> 。不过这个 API 所提供的功能过于多了，它支持去除自定义数量的元素，还支持向数组中添加自定义的元素。所以，源码中选择自己实现一个最小可用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/events.js
// ...

function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/events.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spliceOne</span>(<span class="hljs-params">list, index</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = index, k = i + <span class="hljs-number">1</span>, n = list.length; k &lt; n; i += <span class="hljs-number">1</span>, k += <span class="hljs-number">1</span>)
    list[i] = list[k];
  list.pop();
}</code></pre>
<p>比一比，代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* global suite bench */
'use strict'

suite('Remove one element from an array', function () {
  function spliceOne (list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k]
    }
    list.pop()
  }

  bench('Array#splice', function () {
    let array = [1, 2, 3]
    array.splice(1, 1)
  })

  bench('EventEmitter way', function () {
    let array = [1, 2, 3]
    spliceOne(array, 1)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* global suite bench */</span>
<span class="hljs-meta">'use strict'</span>

suite(<span class="hljs-string">'Remove one element from an array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spliceOne</span> (<span class="hljs-params">list, index</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = index, k = i + <span class="hljs-number">1</span>, n = list.length; k &lt; n; i += <span class="hljs-number">1</span>, k += <span class="hljs-number">1</span>) {
      list[i] = list[k]
    }
    list.pop()
  }

  bench(<span class="hljs-string">'Array#splice'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
    array.splice(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>)
  })

  bench(<span class="hljs-string">'EventEmitter way'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
    spliceOne(array, <span class="hljs-number">1</span>)
  })
})</code></pre>
<p>结果，好吧，秒了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      Remove one element from an array
       4,262,168 op/s » Array#splice
      54,829,749 op/s » EventEmitter way" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>                      Remove one element from an<span class="hljs-built_in"> array
</span>       4,262,168 op/s » Array<span class="hljs-comment">#splice</span>
      54,829,749 op/s » EventEmitter way</code></pre>
<h2 id="articleHeader2">效率更高的不定参数的函数调用</h2>
<p>在事件触发时，监听器拥有的参数数量是任意的，所以源码中优化了不定参数的函数调用。</p>
<p>不过好吧，这里使用的是笨办法，即...把不定参数的函数调用转变成固定参数的函数调用，且最多支持到三个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/events.js
// ...

function emitNone(handler, isFn, self) {
  // ...
}
function emitOne(handler, isFn, self, arg1) {
  // ...
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  // ...
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  // ...
}

function emitMany(handler, isFn, self, args) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/events.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emitNone</span>(<span class="hljs-params">handler, isFn, self</span>) </span>{
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emitOne</span>(<span class="hljs-params">handler, isFn, self, arg1</span>) </span>{
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emitTwo</span>(<span class="hljs-params">handler, isFn, self, arg1, arg2</span>) </span>{
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emitThree</span>(<span class="hljs-params">handler, isFn, self, arg1, arg2, arg3</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emitMany</span>(<span class="hljs-params">handler, isFn, self, args</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>虽然结果不言而喻，我们还是比较下会差多少，以三个参数为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* global suite bench */
'use strict'

suite('calling function with any amount of arguments', function () {
  function nope () {}

  bench('Function#apply', function () {
    function callMany () { nope.apply(null, arguments) }
    callMany(1, 2, 3)
  })

  bench('EventEmitter way', function () {
    function callThree (a, b, c) { nope.call(null, a, b, c) }
    callThree(1, 2, 3)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* global suite bench */</span>
<span class="hljs-meta">'use strict'</span>

suite(<span class="hljs-string">'calling function with any amount of arguments'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nope</span> (<span class="hljs-params"></span>) </span>{}

  bench(<span class="hljs-string">'Function#apply'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callMany</span> (<span class="hljs-params"></span>) </span>{ nope.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>) }
    callMany(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
  })

  bench(<span class="hljs-string">'EventEmitter way'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callThree</span> (<span class="hljs-params">a, b, c</span>) </span>{ nope.call(<span class="hljs-literal">null</span>, a, b, c) }
    callThree(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
  })
})</code></pre>
<p>结果显示差了一倍：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      calling function with any amount of arguments
      11,354,996 op/s » Function#apply
      23,773,458 op/s » EventEmitter way" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>                      calling function with any amount of arguments
      <span class="hljs-number">11</span>,<span class="hljs-number">354</span>,<span class="hljs-number">996</span> op/s » Function#apply
      <span class="hljs-number">23</span>,<span class="hljs-number">773</span>,<span class="hljs-number">458</span> op/s » EventEmitter way</code></pre>
<h2 id="articleHeader3">如果防止在一个事件监听器中监听同一个事件，接而导致死循环？</h2>
<p>在注册事件监听器时，你可否曾想到过这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const EventEmitter = require('events')

let myEventEmitter = new EventEmitter()

myEventEmitter.on('wtf', function wtf () {
  myEventEmitter.on('wtf', wtf)
})

myEventEmitter.emit('wtf')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>)

<span class="hljs-keyword">let</span> myEventEmitter = <span class="hljs-keyword">new</span> EventEmitter()

myEventEmitter.on(<span class="hljs-string">'wtf'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wtf</span> (<span class="hljs-params"></span>) </span>{
  myEventEmitter.on(<span class="hljs-string">'wtf'</span>, wtf)
})

myEventEmitter.emit(<span class="hljs-string">'wtf'</span>)</code></pre>
<p>运行上述代码，是否会直接导致死循环？答案是不会，因为源码中做了处理。</p>
<p>我们先看一下具体的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/events.js
// ...

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

// ...
function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/events.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emitMany</span>(<span class="hljs-params">handler, isFn, self, args</span>) </span>{
  <span class="hljs-keyword">if</span> (isFn)
    handler.apply(self, args);
  <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> len = handler.length;
    <span class="hljs-keyword">var</span> listeners = arrayClone(handler, len);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; ++i)
      listeners[i].apply(self, args);
  }
}

<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arrayClone</span>(<span class="hljs-params">arr, i</span>) </span>{
  <span class="hljs-keyword">var</span> copy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i);
  <span class="hljs-keyword">while</span> (i--)
    copy[i] = arr[i];
  <span class="hljs-keyword">return</span> copy;
}</code></pre>
<p>其中的 <code>handler</code> 便是具体的事件监听器数组，不难看出，源码中的解决方案是，使用 <code>arrayClone</code> 方法，拷贝出另一个一模一样的数组，来执行它，这样一来，当我们在监听器内监听同一个事件时，的确给原监听器数组添加了新的函数，但并没有影响到当前这个被拷贝出来的副本数组。</p>
<h2 id="articleHeader4">
<code>emitter.once</code> 是怎么办到的</h2>
<p>这个很简单，使用了闭包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_onceWrap</span>(<span class="hljs-params">target, type, listener</span>) </span>{
  <span class="hljs-keyword">var</span> fired = <span class="hljs-literal">false</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params"></span>) </span>{
    target.removeListener(type, g);
    <span class="hljs-keyword">if</span> (!fired) {
      fired = <span class="hljs-literal">true</span>;
      listener.apply(target, <span class="hljs-built_in">arguments</span>);
    }
  }
  g.listener = listener;
  <span class="hljs-keyword">return</span> g;
}</code></pre>
<p>你可能会问，我既然已经在 <code>g</code> 函数中的第一行中移除了当前的监听器，为何还要使用 <code>fired</code> 这个 flag ？我个人觉得是因为，在 <code>removeListener</code> 这个同步方法中，会将这个 <code>g</code> 函数暴露出来给 <code>removeListener</code> 事件的监听器，所以该 flag 用来保证 <code>once</code> 注册的函数只会被调用一次。</p>
<h2 id="articleHeader5">最后</h2>
<p>分析就到这里啦，在了解了这些做法之后，在今后我们写一些有性能要求的底层工具库等东西时，我们便可以用上它们啦。<code>EventEmitter</code> 类的源码并不复杂，并且是纯 <code>JavaScript</code> 实现的，所以也非常推荐大家闲时一读。</p>
<p>参考：<a href="https://github.com/nodejs/node/blob/master/lib/events.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/events.js</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过源码解析 Node.js 中 events 模块里的优化小细节

## 原文链接
[https://segmentfault.com/a/1190000005004884](https://segmentfault.com/a/1190000005004884)


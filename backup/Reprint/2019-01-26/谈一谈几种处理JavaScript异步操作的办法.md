---
title: '谈一谈几种处理JavaScript异步操作的办法' 
date: 2019-01-26 2:30:18
hidden: true
slug: 2bc86gel3ek
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">引言</h1>
<p>js的异步操作，已经是一个老生常谈的话题，关于这个话题的文章随便google一下都可以看到一大堆。那么为什么我还要写这篇东西呢？在最近的工作中，为了编写一套相对比较复杂的插件，需要处理各种各样的异步操作。但是为了体积和兼容性，不打算引入任何的pollyfill，甚至连babel也不允许使用，这也意味着只能以es5的方式去处理。使用回调的方式对于解耦非常不利，于是找了别的方法去处理这个问题。问题是处理完了，却也引发了自己的一些思考：处理js的异步操作，都有一些什么方法呢？</p>
<h1 id="articleHeader1">一、回调函数</h1>
<p>传说中的“callback hell”就是来自回调函数。而回调函数也是最基础最常用的处理js异步操作的办法。我们来看一个简单的例子：</p>
<p>首先定义三个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1 () {
  console.log('Function 1')
}

function fn2 () {
  setTimeout(() => {
    console.log('Function 2')
  }, 500)
}

function fn3 () {
  console.log('Function 3')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 1'</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span> (<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 2'</span>)
  }, <span class="hljs-number">500</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn3</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 3'</span>)
}</code></pre>
<p>其中<code>fn2</code>可以视作一个延迟了500毫秒执行的异步函数。现在我希望可以依次执行<code>fn1</code>，<code>fn2</code>，<code>fn3</code>。为了保证<code>fn3</code>在最后执行，我们可以把它作为<code>fn2</code>的回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn2 (f) {
  setTimeout(() => {
    console.log('Function 2')
    f()
  }, 500)
}

fn2(fn3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span> (<span class="hljs-params">f</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 2'</span>)
    f()
  }, <span class="hljs-number">500</span>)
}

fn2(fn3)</code></pre>
<p>可以看到，<code>fn2</code>和<code>fn3</code>完全耦合在一起，如果有多个类似的函数，很有可能会出现<code>fn1(fn2(fn3(fn4(...))))</code>这样的情况。回调地狱的坏处我就不赘述了，相信各位读者一定有自己的体会。</p>
<h1 id="articleHeader2">二、事件发布/订阅</h1>
<p>发布/订阅模式也是诸多设计模式当中的一种，恰好这种方式可以在es5下相当优雅地处理异步操作。什么是发布/订阅呢？以上一节的例子来说，<code>fn1</code>，<code>fn2</code>，<code>fn3</code>都可以视作一个事件的发布者，只要执行它，就会发布一个事件。这个时候，我们可以通过一个事件的订阅者去批量订阅并处理这些事件，包括它们的先后顺序。下面我们基于上一章节的例子，增加一个消息订阅者的方法（为了简单起见，代码使用了es6的写法）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AsyncFunArr {
  constructor (...arr) {
    this.funcArr = [...arr]
  }

  next () {
    const fn = this.funcArr.shift()
    if (typeof fn === 'function') fn()
  }

  run () {
    this.next()
  }
}

const asyncFunArr = new AsyncFunArr(fn1, fn2, fn3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncFunArr</span> </span>{
  <span class="hljs-keyword">constructor</span> (...arr) {
    <span class="hljs-keyword">this</span>.funcArr = [...arr]
  }

  next () {
    <span class="hljs-keyword">const</span> fn = <span class="hljs-keyword">this</span>.funcArr.shift()
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">'function'</span>) fn()
  }

  run () {
    <span class="hljs-keyword">this</span>.next()
  }
}

<span class="hljs-keyword">const</span> asyncFunArr = <span class="hljs-keyword">new</span> AsyncFunArr(fn1, fn2, fn3)</code></pre>
<p>然后在<code>fn1</code>，<code>fn2</code>，<code>fn3</code>内调用其<code>next()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1 () {
  console.log('Function 1')
  asyncFunArr.next()
}

function fn2 () {
  setTimeout(() => {
    console.log('Function 2')
    asyncFunArr.next()
  }, 500)
}

function fn3 () {
  console.log('Function 3')
  asyncFunArr.next()
}

// output =>
// Function 1
// Function 2
// Function 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 1'</span>)
  asyncFunArr.next()
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span> (<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 2'</span>)
    asyncFunArr.next()
  }, <span class="hljs-number">500</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn3</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 3'</span>)
  asyncFunArr.next()
}

<span class="hljs-comment">// output =&gt;</span>
<span class="hljs-comment">// Function 1</span>
<span class="hljs-comment">// Function 2</span>
<span class="hljs-comment">// Function 3</span></code></pre>
<p>可以看到，函数的处理顺序等于传入<code>AsyncFunArr</code>的参数顺序。<code>AsyncFunArr</code>在内部维护一个数组，每一次调用<code>next()</code>方法都会按顺序推出数组所保存的一个对象并执行，这也是我在实际的工作中比较常用的方法。</p>
<h1 id="articleHeader3">三、Promise</h1>
<p>使用Promise的方式，就不需要额外地编写一个消息订阅者函数了，只需要异步函数返回一个Promise即可。且看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1 () {
  console.log('Function 1')
}

function fn2 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Function 2')
      resolve()
    }, 500)
  })
}

function fn3 () {
  console.log('Function 3')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 1'</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 2'</span>)
      resolve()
    }, <span class="hljs-number">500</span>)
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn3</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 3'</span>)
}</code></pre>
<p>同样的，我们定义了三个函数，其中<code>fn2</code>是一个返回Promise的异步函数，现在我们希望按顺序执行它们，只需要按以下方式即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn1()
fn2().then(() => { fn3() })

// output =>
// Function 1
// Function 2
// Function 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">fn1</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">fn2</span><span class="hljs-params">()</span></span>.then(() =&gt; { fn3() })

<span class="hljs-comment">// output =&gt;</span>
<span class="hljs-comment">// Function 1</span>
<span class="hljs-comment">// Function 2</span>
<span class="hljs-comment">// Function 3</span></code></pre>
<p>使用Promise与回调有两个最大的不同，第一个是<code>fn2</code>与<code>fn3</code>得以解耦；第二是把函数嵌套改为了链式调用，无论从语义还是写法上都对开发者更加友好。</p>
<h1 id="articleHeader4">四、generator</h1>
<p>如果说Promise的使用能够化回调为链式，那么generator的办法则可以消灭那一大堆的Promise特征方法，比如一大堆的<code>then()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1 () {
  console.log('Function 1')
}

function fn2 () {
  setTimeout(() => {
    console.log('Function 2')
    af.next()
  }, 500)
}

function fn3 () {
  console.log('Function 3')
}

function* asyncFunArr (...fn) {
  fn[0]()
  yield fn[1]()
  fn[2]()
}

const af = asyncFunArr(fn1, fn2, fn3)

af.next()

// output =>
// Function 1
// Function 2
// Function 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>function fn1 () {
  console.log('Function 1')
}

function fn2 () {
  setTimeout(() =&gt; {
<span class="hljs-code">    console.log('Function 2')</span>
<span class="hljs-code">    af.next()</span>
  }, 500)
}

function fn3 () {
  console.log('Function 3')
}

function* asyncFunArr (...fn) {
  fn[<span class="hljs-string">0</span>](<span class="hljs-link"></span>)
  yield fn[<span class="hljs-string">1</span>](<span class="hljs-link"></span>)
  fn[<span class="hljs-string">2</span>](<span class="hljs-link"></span>)
}

const af = asyncFunArr(fn1, fn2, fn3)

af.next()

// output =&gt;
// Function 1
// Function 2
// Function 3</code></pre>
<p>在这个例子中，generator函数<code>asyncFunArr()</code>接受一个待执行函数列表<code>fn</code>，异步函数将会通过<code>yield</code>来执行。在异步函数内，通过<code>af.next()</code>激活generator函数的下一步操作。</p>
<p>这么粗略的看起来，其实和发布/订阅模式非常相似，都是通过在异步函数内部主动调用方法，告诉订阅者去执行下一步操作。但是这种方式还是不够优雅，比如说如果有多个异步函数，那么这个generator函数肯定得改写，而且在语义化的程度来说也有一点不太直观。</p>
<h1 id="articleHeader5">五、优雅的async/await</h1>
<p>使用最新版本的Node已经可以原生支持<code>async/await</code>写法了，通过各种pollyfill也能在旧的浏览器使用。那么为什么说<code>async/await</code>方法是最优雅的呢？且看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1 () {
  console.log('Function 1')
}

function fn2 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Function 2')
      resolve()
    }, 500)
  })
}

function fn3 () {
  console.log('Function 3')
}

async function asyncFunArr () {
  fn1()
  await fn2()
  fn3()
}

asyncFunArr()

// output =>
// Function 1
// Function 2
// Function 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 1'</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 2'</span>)
      resolve()
    }, <span class="hljs-number">500</span>)
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn3</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Function 3'</span>)
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncFunArr</span> (<span class="hljs-params"></span>) </span>{
  fn1()
  <span class="hljs-keyword">await</span> fn2()
  fn3()
}

asyncFunArr()

<span class="hljs-comment">// output =&gt;</span>
<span class="hljs-comment">// Function 1</span>
<span class="hljs-comment">// Function 2</span>
<span class="hljs-comment">// Function 3</span></code></pre>
<p>有没有发现，在定义异步函数<code>fn2</code>的时候，其内容和前文使用Promise的时候一模一样？再看执行函数<code>asyncFunArr()</code>，其执行的方式和使用generator的时候也非常类似。</p>
<p>异步的操作都返回Promise，需要顺序执行时只需要await相应的函数即可，这种方式在语义化方面非常友好，对于代码的维护也很简单——只需要返回Promise并await它就好，无需像generator那般需要自己去维护内部<code>yield</code>的执行。</p>
<h1 id="articleHeader6">六、尾声</h1>
<p>作为一个归纳和总结，本文内容的诸多知识点也是来自于他人的经验，不过加入了一些自己的理解和体会。不求科普于他人，但求作为个人的积累。希望读者可以提出订正的意见，共同学习进步！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈一谈几种处理JavaScript异步操作的办法

## 原文链接
[https://segmentfault.com/a/1190000008489550](https://segmentfault.com/a/1190000008489550)


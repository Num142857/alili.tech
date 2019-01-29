---
title: 'Promise介绍--规范篇' 
date: 2019-01-30 2:30:23
hidden: true
slug: yr7v8e9fao
categories: [reprint]
---

{{< raw >}}

                    
<p>本篇文章是<code>Promise</code>系列文章的第二篇，主要是讲解基于<code>Promise/A+</code>规范，在传入不同类型的参数时，<code>promise</code>内部分别会如何处理。本章的主要目的是让大家对<code>promise</code>有一个更加深入的理解，也为下一篇讲如何实现一个<code>promise</code>库做准备。（写完之后觉得好水。。。）</p>
<p>英文版本的规范见<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">这里</a>，segmentfault上也有人把规范翻译为中文，见<a href="https://segmentfault.com/a/1190000002452115">这里</a>。</p>
<p>在此，我主要是通过使用例子，讲解一下规范中<code>then</code>方法和<code>Promise Resolution Procedure</code>的每一种情况。</p>
<h2 id="articleHeader0">constructor</h2>
<p>规范中对于构造函数没有明确说明，所以在此处拿出来讲解一下。</p>
<p>和普通JavaScript对象一样，我们同样是通过new关键词来创建一个<code>Promise</code>对象实例。构造函数只接收一个参数，且该参数必须是一个函数，任何其他的值比如<code>undefined</code>、<code>null</code>、<code>5</code>、<code>true</code>等都会报一个<code>TypeError</code>的错误。例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(true)
// Uncaught TypeError: Promise resolver true is not a function(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-literal">true</span>)
// Uncaught TypeError: Promise resolver <span class="hljs-literal">true</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> a <span class="hljs-keyword">function</span>(…)</code></pre>
<p>同样，如果你没有通过new关键词创建，而是直接执行Promise()，同样也会报一个<code>TypeError</code>的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise()
// Uncaught TypeError: undefined is not a promise(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Promise</span><span class="hljs-params">()</span></span>
<span class="hljs-comment">// Uncaught TypeError: undefined is not a promise(…)</span></code></pre>
<p>所以，我们必须通过<code>new Promise(function()=&gt;{})</code>的方式来创建一个Promise实例。通常我们见到的创建一个Promise实例的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function(resolve, reject) {
    // 进行一些异步操作
    // 然后调用resolve或reject方法
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-comment">// 进行一些异步操作</span>
    <span class="hljs-comment">// 然后调用resolve或reject方法</span>
});</code></pre>
<p>这才是正确的姿势~ 从该例子中，我们可以看到创建Promise实例时传入的函数，同时还接受两个参数，它们分别对应Promise内部实现的两个方法。上一篇文章中，我提到过Promise有三种状态，<code>pending</code>、<code>fulfilled</code>、<code>rejected</code>，实例刚创建时处于<code>pending</code>状态，当执行<code>reject</code>方法时，变为<code>rejected</code>状态，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject){
    reject(Promise.resolve(5))
}).then(function(value){
    console.log('fulfill', value)
}, function(reason){
    console.log('reject', reason)
})
// reject Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: 5}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>new Promise(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(resolve, reject)</span></span>{
    reject(Promise.resolve(<span class="hljs-number">5</span>))
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
    console.log(<span class="hljs-string">'fulfill'</span>, value)
}, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(reason)</span></span>{
    console.log(<span class="hljs-string">'reject'</span>, reason)
})
// reject Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">5</span>}</code></pre>
<p>而当执行<code>resolve</code>方法时，它可能变为<code>fulfilled</code>，也有可能变为<code>rejected</code>状态。也就是说<code>resolve != fulfill</code>。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject){
    resolve(Promise.reject(5))
}).then(function(value){
    console.log('fulfill', value)
}, function(reason){
    console.log('reject', reason)
})
// reject 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    resolve(<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-number">5</span>))
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, reason)
})
<span class="hljs-comment">// reject 5</span></code></pre>
<p>那么<code>resolve</code>是个什么东西呢？它是根据什么变为<code>fulfilled</code>或<code>rejected</code>的呢？这就是我们接下来要讲解的<code>Promise Resolution Procedure</code>，我把它称作“Promise处理程序”。</p>
<h2 id="articleHeader1">Promise Resolution Procedure</h2>
<p>讲之前，我们先说几个<code>promise</code>规范中的几个术语。</p>
<p><strong>promise</strong> 它是一个拥有<code>then</code>方法的对象或函数，且符合该规范<br><strong>thenable</strong> 拥有<code>then</code>方法的对象或函数<br><strong>value</strong> 是指一个合法的 <code>Javascript</code> 值<br><strong>exception</strong> <code>throw</code>语句抛出的异常<br><strong>reason</strong> 描述promise为什么失败的值</p>
<p><code>Promise Resolution Procedure</code>是对传入的promise和value进行抽象操作。我们可一个把它理解成<code>resolve(promise, value)</code>，对参数promise和value进行一系列处理操作。下面我们按照规范中的顺序，依次介绍每种情况。</p>
<p><strong>2.3.1</strong> 如果<code>promise</code>和<code>value</code>指向同一个对象，则<code>reject</code>该<code>promise</code>并以一个<code>TypeError</code>作为<code>reason</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defer = {}
var promise = new Promise(function(resolve){ 
    defer.resolve = resolve
})
promise.catch(function(reason){
    console.log(reason)
})
defer.resolve(promise)
// TypeError: Chaining cycle detected for promise #<Promise>(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> defer = {}
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{ 
    defer.resolve = resolve
})
promise.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
defer.resolve(promise)
<span class="hljs-comment">// TypeError: Chaining cycle detected for promise #&lt;Promise&gt;(…)</span></code></pre>
<p>我们把resolve函数保存在defer中，这样就可以在外部对<code>promise</code>进行状态改变，<code>defer.resolve(promise)</code>中的<code>promise</code>正是我们创建的对象，根据规范抛出了<code>TypeError</code>。</p>
<p><strong>2.3.2</strong> 如果<code>value</code>是一个<code>promise</code>对象，且是基于当前实现创建的。</p>
<p>2.3.2.1 如果<code>value</code>处于<code>pending</code>状态，则<code>promise</code>同样<code>pending</code>并直到<code>value</code>状态改变。<br>2.3.2.2 如果<code>value</code>处于<code>fulfilled</code>状态，则使用相同的value值fulfill <code>promise</code>。<br>2.3.2.3 如果<code>value</code>处于<code>rejected</code>状态，则使用相同的reason值reject <code>promise</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(5)
    },3000)
});
console.time('fulfill')
var promise = new Promise((resolve) => {
    resolve(promise1)
})
promise.then((value) => {
    console.timeEnd('fulfill')
    console.log('fulfill', value)
})
setTimeout(()=>{
    console.log('setTimeout', promise)
}, 1000)

// setTimeout Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}
// fulfill: 3.01e+03ms
// fulfill 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var promise1 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">5</span>)
    },<span class="hljs-number">3000</span>)
});
<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'fulfill'</span>)
var promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    resolve(promise1)
})
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'fulfill'</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)
})
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>, promise)
}, <span class="hljs-number">1000</span>)

<span class="hljs-regexp">//</span> setTimeout Promise {[[PromiseStatus]]: <span class="hljs-string">"pending"</span>, [[PromiseValue]]: <span class="hljs-literal">undefined</span>}
<span class="hljs-regexp">//</span> fulfill: <span class="hljs-number">3.01e+03</span>ms
<span class="hljs-regexp">//</span> fulfill <span class="hljs-number">5</span></code></pre>
<p>通过该例子可以看出，最后<code>setTimeout</code>延迟1秒查看<code>promise</code>状态时，它依然处于<code>pending</code>状态，当3秒后<code>promise1</code>变为<code>fulfilled</code>后，<code>promise</code>随即变为<code>fulfilled</code>并以5作为value传给<code>then</code>添加的成功回调函数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('error'))
    }, 3000)
});
console.time('reject')
var promise = new Promise((resolve) => {
    resolve(promise1)
})
promise.catch((reason) => {
    console.timeEnd('reject')
    console.log('reject', reason)
})
setTimeout(()=>{
    console.log('setTimeout', promise)
}, 1000)

// setTimeout Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}
// reject: 3e+03ms
// reject Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var promise1 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        reject(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'error'</span>))
    }, <span class="hljs-number">3000</span>)
});
<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'reject'</span>)
var promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    resolve(promise1)
})
promise.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'reject'</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, reason)
})
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>, promise)
}, <span class="hljs-number">1000</span>)

<span class="hljs-regexp">//</span> setTimeout Promise {[[PromiseStatus]]: <span class="hljs-string">"pending"</span>, [[PromiseValue]]: <span class="hljs-literal">undefined</span>}
<span class="hljs-regexp">//</span> reject: <span class="hljs-number">3e+03</span>ms
<span class="hljs-regexp">//</span> reject Error: error(…)</code></pre>
<p>失败时例子与成功时类似。</p>
<p><strong>2.3.3</strong> 如果<code>value</code>是一个对象或函数<br>2.3.3.1 使<code>then</code>等于<code>value.then</code><br>2.3.3.2 如果获取<code>value.then</code>的值时抛出异常，这通过该异常<code>reject</code> <code>promise</code>，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:(()=>{
        throw new Error('error')
        })()
    })
}).catch((reason)=>{
    console.log(reason)
})
// Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span>{
    resolve({then:<span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>)=&gt;{
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-params">'error'</span>)
        }</span>)<span class="hljs-params">()</span>
    })
}).<span class="hljs-params">catch</span>(<span class="hljs-params">(<span class="hljs-params">reason</span>)=&gt;{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-params">reason</span>)
}</span>)
// <span class="hljs-params">Error</span>: <span class="hljs-params">error</span>(<span class="hljs-params">…</span>)</span></code></pre>
<p>上例中获取<code>value.then</code>时，会抛出异常</p>
<p>2.3.3.3 如果<code>then</code>是一个函数，则把<code>value</code>作为函数中<code>this</code>指向来调用它，第一个参数是<code>resolvePromise</code>，第二个参数是<code>rejectPromise</code>。</p>
<p>其实这里主要是为了兼容两种情况，第一种是传入的<code>value</code>是个<code>Deferred</code>对象，则状态和<code>Deferred</code>对象一致；另一种情况是不是使用当前构造函数创建的<code>Promise</code>对象，通过这种方式可以兼容，达到一致的效果。</p>
<p>2.3.3.3.1 如果<code>resolvePromise</code>通过传入<code>y</code>来调用，则执行<code>resolve(promise, y)</code>，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:(resolvePromise, rejectPromise)=>{
        resolvePromise(5)
        }
    })
}).then((value)=>{
    console.log(value)
})
// 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({then:<span class="hljs-function"><span class="hljs-params">(resolvePromise, rejectPromise)</span>=&gt;</span>{
        resolvePromise(<span class="hljs-number">5</span>)
        }
    })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(value)
})
<span class="hljs-regexp">//</span> <span class="hljs-number">5</span></code></pre>
<p>2.3.3.3.2 如果<code>rejectPromise </code>通过传入原因<code>r</code>来调用，则传入<code>r</code>来<code>reject</code> <code>promise</code>，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:(resolvePromise, rejectPromise)=>{
        rejectPromise(new Error('error'))
        }
    })
}).catch((reason)=>{
    console.log(reason)
})
// Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({then:<span class="hljs-function"><span class="hljs-params">(resolvePromise, rejectPromise)</span>=&gt;</span>{
        rejectPromise(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'error'</span>))
        }
    })
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(reason)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-regexp">//</span> Error: error(…)</code></pre>
<p>2.3.3.3.3 如果<code>resolvePromise</code>和<code>rejectPromise</code>都被调用，或其中一个被调用了多次，则以第一次调用的为准，并忽略之后的调用。例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:(resolvePromise, rejectPromise)=>{
        resolvePromise(5)
        rejectPromise(new Error('error'))
        }
    })
}).then((value)=>{
    console.log(value)
}, (reason)=>{
    console.log(reason)
})
// 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({then:<span class="hljs-function"><span class="hljs-params">(resolvePromise, rejectPromise)</span>=&gt;</span>{
        resolvePromise(<span class="hljs-number">5</span>)
        rejectPromise(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'error'</span>))
        }
    })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(value)
}, <span class="hljs-function"><span class="hljs-params">(reason)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-regexp">//</span> <span class="hljs-number">5</span></code></pre>
<p>2.3.3.3.4 如果调用<code>then</code>抛出异常<code>e</code>:</p>
<p>2.3.3.3.4.1 如果<code>resolvePromise</code>或<code>rejectPromise</code>已经调用，则忽略它，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:(resolvePromise, rejectPromise)=>{
        resolvePromise(5)
        throw new Error('error')
        }
    })
}).then((value)=>{
    console.log(value)
}, (reason)=>{
    console.log(reason)
})
// 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({then:<span class="hljs-function"><span class="hljs-params">(resolvePromise, rejectPromise)</span>=&gt;</span>{
        resolvePromise(<span class="hljs-number">5</span>)
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">'error'</span>)
        }
    })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(value)
}, <span class="hljs-function"><span class="hljs-params">(reason)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-regexp">//</span> <span class="hljs-number">5</span></code></pre>
<p>2.3.3.3.4.2 否则，则传入<code>e</code>来<code>reject</code> <code>promise</code>，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:(resolvePromise, rejectPromise)=>{
        throw new Error('error')
        }
    })
}).then((value)=>{
    console.log(value)
}, (reason)=>{
    console.log(reason)
})
// Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({then:<span class="hljs-function"><span class="hljs-params">(resolvePromise, rejectPromise)</span>=&gt;</span>{
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">'error'</span>)
        }
    })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(value)
}, <span class="hljs-function"><span class="hljs-params">(reason)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-regexp">//</span> Error: error(…)</code></pre>
<p>2.3.3.4 如果<code>then</code>不是一个函数，则传入<code>value</code>来<code>fulfill</code> <code>promise</code>，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve)=>{
    resolve({then:5})
}).then((value)=>{
    console.log(value)
}, (reason)=>{
    console.log(reason)
})
// Object {then: 5}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({then:<span class="hljs-number">5</span>})
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(value)
}, <span class="hljs-function"><span class="hljs-params">(reason)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-regexp">//</span> Object {then: <span class="hljs-number">5</span>}</code></pre>
<h1 id="articleHeader2">
<code>then</code> 方法</h1>
<p>一个<code>promise</code>必须提供一个<code>then</code>方法来处理成功或失败。</p>
<p><code>then</code>方法接收两个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then(onFulfilled, onRejected)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mercury"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">promise</span>.<span class="hljs-built_in">then</span>(onFulfilled, onRejected)</code></pre>
<p><strong>2.2.1</strong> <code>onFulfilled</code>和<code>onRejected</code>都是可选的<br>2.2.1.1 如果<code>onFulfilled</code>不是一个函数，则忽略。例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5)
    .then(true,function(reason){
        console.log(reason)
    })
    .then(function(value){
        console.log(value)
    })
// 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Promise.<span class="hljs-built_in">resolve</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-keyword">then</span>(<span class="hljs-literal">true</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">reason</span>){</span>
        console.<span class="hljs-built_in">log</span>(reason)
    })
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">value</span>){</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">value</span>)
    })<span class="hljs-comment">
// 5</span></code></pre>
<p>2.2.1.2 如果<code>onRejected</code>不是一个函数，则忽略。例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(new Error('error'))
    .then(true,null)
    .then(undefined,function(reason){
        console.log(reason)
    })

// Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>))
    .then(<span class="hljs-literal">true</span>,<span class="hljs-literal">null</span>)
    .then(<span class="hljs-literal">undefined</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
        <span class="hljs-built_in">console</span>.log(reason)
    })

<span class="hljs-comment">// Error: error(…)</span></code></pre>
<p><strong>2.2.2</strong> 如果<code>onFulfilled</code>是一个函数<br>2.2.2.1 它必须在<code>promise</code>变为<code>fulfilled</code>之后调用，且把<code>promise</code>的<code>value</code>作为它的第一个参数</p>
<p>这个从我们所有的例子中都可以看出</p>
<p>2.2.2.2 它不可以在<code>promise</code>变为<code>fulfilled</code>之前调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defer = {}
console.time('fulfill')
var promise = new Promise((resolve)=>{
    defer.resolve = resolve
});
promise.then((value)=>{
    console.timeEnd('fulfill')
})
setTimeout(()=>{
    defer.resolve(5)
},1000);
// fulfill: 1e+03ms  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var defer = {}
<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'fulfill'</span>)
var promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    defer.resolve = resolve
});
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'fulfill'</span>)
})
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    defer.resolve(<span class="hljs-number">5</span>)
},<span class="hljs-number">1000</span>);
<span class="hljs-regexp">//</span> fulfill: <span class="hljs-number">1e+03</span>ms  </code></pre>
<p>从<code>onFulfilled</code>执行的时间可以看出<code>promise</code>直到变为<code>fulfilled</code>后才调用</p>
<p>2.2.2.3 它只可以被调用一次</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defer = {}
var promise = new Promise((resolve)=>{
    defer.resolve = resolve
});
promise.then((value)=>{
    console.log(value++)
})
defer.resolve(5)
// 5
defer.resolve(6)
// 后面不再次执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> defer = {}
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span>{
    defer.resolve = resolve
});
promise.then(<span class="hljs-function">(<span class="hljs-params">value</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(value++)
})
defer.resolve(<span class="hljs-number">5</span>)
<span class="hljs-comment">// 5</span>
defer.resolve(<span class="hljs-number">6</span>)
<span class="hljs-comment">// 后面不再次执行</span></code></pre>
<p><strong>2.2.3</strong> 如果<code>onRejected</code>是一个函数<br>2.2.3.1 它必须在<code>promise</code>变为<code>rejected</code>之后调用，且把<code>promise</code>的<code>reason</code>作为它的第一个参数<br>2.2.3.2 它不可以在<code>promise</code>变为<code>rejected</code>之前调用<br>2.2.3.3 它只可以被调用一次</p>
<p><code>onRejected</code>和<code>onFulfilled</code>基本类似，这里不再次赘述</p>
<p><strong>2.2.4</strong> <code>onFulfilled</code>和<code>onRejected</code>是在执行环境中仅包含平台代码时调用</p>
<p>这里有一个备注，平台代码是指引擎、执行环境、以及<code>promise</code>的实现代码。实际过程中，要确保<code>onFulfilled</code>和<code>onRejected</code>是异步执行的，它是在<code>event loop</code>过程中<code>then</code>方法被调用之后的新调用栈中执行。我们可以使用<code>setTimeout</code>或<code>setImmediate</code>等<code>macro-task</code>机制来实现，也可以使用<code>MutationObserver</code>或<code>process.nextTick</code>等<code>micro-task</code>机制来实现。<code>promise</code>的实现本身就被看作是平台代码，它本身就包含一个处理器可以调用的任务调度队列。</p>
<p>才疏学浅，没理解它这一条到底要表达一个什么意思。。。应该指的就是异步执行，因为异步执行的时候，页面中同步的逻辑都已经执行完毕，所以只剩下平台代码。</p>
<p>注：原生的<code>Promise</code>实现属于<code>micro-task</code>机制。<code>macro-task</code>和<code>micro-task</code>分别是两种异步任务，它们的不同后面会单独讲一下。下面列出了常见的异步方法都属于那种异步机制：</p>
<p><strong>macro-task</strong>: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering<br><strong>micro-task</strong>: process.nextTick, 原生Promise, Object.observe, MutationObserver</p>
<p><strong>2.2.5</strong> <code>onFulfilled</code>和<code>onRejected</code>必须作为函数来调用，没有<code>this</code>值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(function(){
    console.log(this)
})
// Window {speechSynthesis: SpeechSynthesis, caches: CacheStorage, localStorage: Storage, sessionStorage: Storage, webkitStorageInfo: DeprecatedStorageInfo…}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
})
<span class="hljs-comment">// Window {speechSynthesis: SpeechSynthesis, caches: CacheStorage, localStorage: Storage, sessionStorage: Storage, webkitStorageInfo: DeprecatedStorageInfo…}</span></code></pre>
<p><strong>2.2.6</strong> 同一个<code>promise</code>上的<code>then</code>方法可能会调用多次<br>2.2.6.1 如果<code>promise</code> <code>fulfilled</code>，则所有的<code>onFulfilled</code>回调函数按照它们添加的顺序依次调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defer = {}
var promise = new Promise((resolve)=>{
    defer.resolve = resolve
});
promise.then((value)=>{
    console.log(1,value++)
})
promise.then((value)=>{
    console.log(2,value++)
})
promise.then((value)=>{
    console.log(3,value++)
})
defer.resolve(5)

// 1 5
// 2 5
// 3 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var defer = {}
var promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    defer.resolve = resolve
});
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>,value++)
})
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>,value++)
})
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>,value++)
})
defer.resolve(<span class="hljs-number">5</span>)

<span class="hljs-regexp">//</span> <span class="hljs-number">1</span> <span class="hljs-number">5</span>
// <span class="hljs-number">2</span> <span class="hljs-number">5</span>
// <span class="hljs-number">3</span> <span class="hljs-number">5</span></code></pre>
<p>2.2.6.2 如果<code>promise</code> <code>rejected</code>，则所有的<code>onRejected</code>回调函数按照它们添加的顺序依次调用。</p>
<p>例子与上例类似</p>
<p><strong>2.2.7</strong> <code>then</code>方法会返回一个全新的<code>promise</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise2 = promise1.then(onFulfilled, onRejected);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">promise2</span> = promise1.then(<span class="hljs-literal">on</span>Fulfilled, <span class="hljs-literal">on</span>Rejected);</code></pre>
<p>2.2.7.1 如果<code>onFulfilled</code>或<code>onRejected</code>返回了一个值<code>x</code>，则执行<code>resolve(promise2, x)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(function(value){
    return ++value
}).then(function(value){
    console.log(value)
})
// 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>Promise.resolve(<span class="hljs-number">5</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
    <span class="hljs-keyword">return</span> ++<span class="hljs-keyword">value</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>)
})
// <span class="hljs-number">6</span></code></pre>
<p>2.2.7.2 如果<code>onFulfilled</code>或<code>onRejected</code>抛出了异常<code>e</code>，则<code>reject</code> <code>promise2</code>并传入原因<code>e</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(function(value){
    throw new Error('error')
}).catch(function(reason){
    console.log(reason)
})
// Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-comment">// Error: error(…)</span></code></pre>
<p>2.2.7.3 如果<code>onFulfilled</code>不是一个函数且<code>promise1</code> <code>fulfilled</code>，则<code>promise2</code>以同样的<code>value</code> <code>fulfill</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(&quot;tiaoguo&quot;).then(function(value){
    console.log(value)
})
// 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Promise.<span class="hljs-built_in">resolve</span>(<span class="hljs-number">5</span>).<span class="hljs-keyword">then</span>(<span class="hljs-string">"tiaoguo"</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">value</span>){</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">value</span>)
})<span class="hljs-comment">
// 5</span></code></pre>
<p>2.2.7.4 如果<code>onRejected</code>不是一个函数且<code>promise1</code> <code>rejected</code>，则<code>promise2</code>以同样的<code>reason</code> <code>reject</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(new Error('error')).catch('tiaoguo').catch(function(reason){
    console.log(reason)
})
// Error: error(…)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)).catch(<span class="hljs-string">'tiaoguo'</span>).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason)
})
<span class="hljs-comment">// Error: error(…)</span></code></pre>
<p>更多的测试代码，大家可以去<a href="https://github.com/promises-aplus/promises-tests" rel="nofollow noreferrer" target="_blank">promises-tests</a>中查看，这是一个基于规范的<code>promise</code>测试库。</p>
<p>以上基本是整个<code>Promise/A+</code>规范的所有内容，如有错误，欢迎批评指正。下一篇我会根据规范一步一步实现一个<code>Promise</code> <code>polyfill</code>库。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise介绍--规范篇

## 原文链接
[https://segmentfault.com/a/1190000007719379](https://segmentfault.com/a/1190000007719379)


---
title: '《深入理解ES6》笔记—— Promise与异步编程（11）' 
date: 2019-01-06 2:30:10
hidden: true
slug: 7n8kh6ef1qv
categories: [reprint]
---

{{< raw >}}

                    
<h4>为什么要异步编程</h4>
<p>我们在写前端代码时，经常会对dom做事件处理操作，比如点击、激活焦点、失去焦点等；再比如我们用ajax请求数据，使用回调函数获取返回值。这些都属于异步编程。</p>
<p>也许你已经大概知道JavaScript引擎单线程的概念，那么这种单线程模式和异步编程有什么关系呢？</p>
<p><strong>JavaScript引擎中，只有一个主线程，当执行JavaScript代码块时，不允许其他代码块执行，而事件机制和回调机制的代码块会被添加到任务队列（或者叫做堆栈）中，当符合某个触发回调或者事件的时候，就会执行该事件或者回调函数。</strong></p>
<p>上面这段话的意思可以这样理解，假设你是一个修仙者，你去闯一个秘境，这个秘境就是主线程，你只能一直深入下去，直到找到宝物和出口，而你还有一个自身的储物空间，这个空间就类似堆栈，你在储物空间放了很多你可能用到的法宝或者丹药，这些东西就是回调函数和事件函数，当你遇到危险或者满足某个条件时，就可以从储物空间拿出你当前需要的东西。</p>
<p>好吧，不扯这么远，下面看正题。</p>
<p><strong>事件模型：</strong><br>浏览器初次渲染DOM的时候，我们会给一些DOM绑定事件函数，只有当触发了这些DOM事件函数，才会执行他们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const btn = document.querySelector('.button')
btn.onclick = function(event) {
  console.log(event)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.button'</span>)
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-built_in">console</span>.log(event)
}
</code></pre>
<p><strong>回调模式：</strong><br>nodejs中可能非常常见这种回调模式，但是对于前端来说，ajax的回调是最熟悉不过了。ajax回调有多个状态，当响应成功和失败都有不同的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post('/router', function(data) {
  console.log(data)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.post(<span class="hljs-string">'/router'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(data)
})
</code></pre>
<p>回调也可能带来一个问题，那就是地狱回调，不过幸运的是，我从进入前端界开始，就使用react，跳过了很多坑，特别是地狱回调，一直没有机会在工作中遇见到，真是遗憾。</p>
<h3 id="articleHeader0">Promise</h3>
<p>事件函数没有问题，我们用的很爽，问题出在回调函数，尤其是指地狱回调，Promise的出现正是为了避免地狱回调带来的困扰。</p>
<p>推荐你看<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">JavaScript MDN Promise教程</a>，然后再结合本文看，你就能学会使用Promise了。</p>
<h4>Promise是什么</h4>
<p>Promise的中文意思是承诺，也就是说，JavaScript对你许下一个承诺，会在未来某个时刻兑现承诺。</p>
<h4>Promise生命周期</h4>
<p>react有生命周期，vue也有生命周期，就连Promise也有生命周期，现在生命周期咋这么流行了。</p>
<p><strong>Promise的生命周期：进行中（pending），已经完成（fulfilled），拒绝（rejected）</strong></p>
<p>Promise被称作异步结果的占位符，它不能直接返回异步函数的执行结果，需要使用then()，当获取异常回调的时候，使用catch()。</p>
<p>这次我们使用axios插件的代码做例子。axios是前端比较热门的http请求插件之一。</p>
<p>1、创建axios实例instance。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
export const instance = axios.create()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">export</span> const <span class="hljs-keyword">instance</span> = axios.create()
</code></pre>
<p>2、使用axios实例 + Promise获取返回值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = instance.get('url')

promise.then(result => console.log(result)).catch(err => console.log(err))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> promise = instance.get(<span class="hljs-string">'url'</span>)

promise.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(result)).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
</code></pre>
<h4>使用Promise构建函数创建新的Promise</h4>
<p>Promise构造函数只有一个参数，该参数是一个函数，被称作执行器，执行器有2个参数，分别是resolve()和reject()，一个表示成功的回调，一个表示失败的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject) {
  setTimeout(() => resolve(5), 0)
}).then(v => console.log(v)) // 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-number">5</span>), <span class="hljs-number">0</span>)
}).then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v)) <span class="hljs-comment">// 5</span>
</code></pre>
<p><strong>记住，Promise实例只能通过resolve或者reject函数来返回，并且使用then()或者catch()获取，不能在new Promise里面直接return，这样是获取不到Promise返回值的。</strong></p>
<p>1、我们也可以使用Promise直接resolve(value)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(v => console.log(v)) // 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>).then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v)) <span class="hljs-comment">// 5</span>
</code></pre>
<p>2、也可以使用reject(value)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(5).catch(v => console.log(v)) // 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-number">5</span>).catch(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v)) <span class="hljs-comment">// 5</span>
</code></pre>
<p>3、执行器错误通过catch捕捉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject) {
  if(true) {
    throw new Error('error!!')
  }
}).catch(v => console.log(v.message)) // error!!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error!!'</span>)
  }
}).catch(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v.message)) <span class="hljs-comment">// error!!</span>
</code></pre>
<h4>全局的Promise拒绝处理</h4>
<p>不重要的内容，不用细看。</p>
<p>这里涉及到nodejs环境和浏览器环境的全局，主要说的是如果执行了Promise.reject()，浏览器或者node环境并不会强制报错，只有在你调用catch的时候，才能知道Promise被拒绝了。</p>
<p>这种行为就像是，你写了一个函数，函数内部有true和false两种状态，而我们希望false的时候抛出错误，但是在Promise中，并不能直接抛出错误，<strong>无论Promise是成功还是拒绝状态，你获取Promise生命周期的方法只能通过then()和catch()。</strong></p>
<p><strong>nodejs环境：</strong></p>
<p>node环境下有个对象叫做process，即使你没写过后端node，如果写过前端node服务器，也应该知道可以使用process.ENV_NODE获取环境变量。为了监听Promise的reject（拒绝）情况，NodeJS提供了一个process.on()，类似jQuery的on方法，事件绑定函数。</p>
<p>process.on()有2个事件</p>
<p>unhandledRjection:在一个事件循环中，当Promise执行reject()，并且没有提供catch()时被调用。</p>
<p>正常情况下，你可以使用catch捕捉reject。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(&quot;It was my wrong!&quot;).catch(v => console.log(v))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"It was my wrong!"</span>).catch(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v))
</code></pre>
<p>但是，有时候你不总是记得使用catch。你就需要使用process.on()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let rejected
rejected = Promise.reject(&quot;It was my wrong!&quot;)

process.on(&quot;unhandledRjection&quot;, function(reason, promise) {
  console.log(reason.message) // It was my wrong!
  console.log(rejected === promise) // true
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> rejected
rejected = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"It was my wrong!"</span>)

process.on(<span class="hljs-string">"unhandledRjection"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason, promise</span>) </span>{
  <span class="hljs-built_in">console</span>.log(reason.message) <span class="hljs-comment">// It was my wrong!</span>
  <span class="hljs-built_in">console</span>.log(rejected === promise) <span class="hljs-comment">// true</span>
})
</code></pre>
<p>rejectionHandled:在一个事件循环后，当Promise执行reject，并且没有提供catch()时被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let rejected
rejected = Promise.reject(new Error(&quot;It was my wrong!&quot;))

process.on(&quot;rejectionHandled&quot;, function(promise) {
  console.log(rejected === promise) // true
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> rejected
rejected = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"It was my wrong!"</span>))

process.on(<span class="hljs-string">"rejectionHandled"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise</span>) </span>{
  <span class="hljs-built_in">console</span>.log(rejected === promise) <span class="hljs-comment">// true</span>
})
</code></pre>
<p><strong>异同：</strong></p>
<p>事件循环中、事件循环后，你可能很难理解这2个的区别，但是这不重要，重要的是，如果你通过了catch()方法来捕捉reject操作，那么，这2个事件就不会生效。</p>
<p><strong>浏览器环境：</strong></p>
<p>和node环境一样，都提供了unhandledRjection、rejectionHandled事件，不同的是浏览器环境是通过window对象来定义事件函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let rejected
rejected = Promise.reject(new Error(&quot;It was my wrong!&quot;))

window.rejectionHandled = function(event) {
  console.log(event) // true
}
rejectionHandled()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> rejected
rejected = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"It was my wrong!"</span>))

<span class="hljs-built_in">window</span>.rejectionHandled = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-built_in">console</span>.log(event) <span class="hljs-comment">// true</span>
}
rejectionHandled()
</code></pre>
<p>将代码在浏览器控制台执行一遍，你就会发现报错了：Uncaught (in promise) Error: It was my wrong!</p>
<p>耶，你成功了！报错内容正是你写的reject()方法里面的错误提示。</p>
<h4>Promise链式调用</h4>
<p>这个例子中，使用了3个then，第一个then返回 s * s，第二个then捕获到上一个then的返回值，最后一个then直接输出end。这就叫链式调用，很好理解的。我只使用了then()，实际开发中，你还应该加上catch()。</p>
<p>new Promise(function(resolve, reject) {<br>  try {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve(5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">resolve</span><span class="hljs-params">(<span class="hljs-number">5</span>)</span></span></code></pre>
<p>} catch (error) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reject('It was my wrong!!!')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">reject</span><span class="hljs-params">(<span class="hljs-string">'It was my wrong!!!'</span>)</span></span></code></pre>
<p>}<br>}).then(s =&gt; s * s).then(s2 =&gt; console.log(s2)).then(() =&gt; console.log('end'))<br>// 25  "end"</p>
<h4>Promise的其他方法</h4>
<p>在Promise的构造函数中，除了reject()和resolve()之外，还有2个方法，Promise.all()、Promise.race()。</p>
<p><strong>Promise.all()：</strong></p>
<p>前面我们的例子都是只有一个Promise，现在我们使用all()方法包装多个Promise实例。</p>
<p>语法很简单：参数只有一个，可迭代对象，可以是数组，或者Symbol类型等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all(iterable).then().catch()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Promise</span><span class="hljs-selector-class">.all</span>(<span class="hljs-selector-tag">iterable</span>)<span class="hljs-selector-class">.then</span>()<span class="hljs-selector-class">.catch</span>()
</code></pre>
<p>示例：传入3个Promise实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([
  new Promise(function(resolve, reject) {
    resolve(1)
  }),
  new Promise(function(resolve, reject) {
    resolve(2)
  }),
  new Promise(function(resolve, reject) {
    resolve(3)
  })
]).then(arr => {
  console.log(arr) // [1, 2, 3]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all([
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-number">1</span>)
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-number">2</span>)
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-number">3</span>)
  })
]).then(<span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(arr) <span class="hljs-comment">// [1, 2, 3]</span>
})
</code></pre>
<p><strong>Promise.race()：</strong>语法和all()一样，但是返回值有所不同，race根据传入的多个Promise实例，只要有一个实例resolve或者reject，就只返回该结果，其他实例不再执行。</p>
<p>还是使用上面的例子，只是我给每个resolve加了一个定时器，最终结果返回的是3，因为第三个Promise最快执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race([
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000)
  }),
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(2), 100)
  }),
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(3), 10)
  })
]).then(value => {
  console.log(value) // 3
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.race([
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-number">1</span>), <span class="hljs-number">1000</span>)
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-number">2</span>), <span class="hljs-number">100</span>)
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-number">3</span>), <span class="hljs-number">10</span>)
  })
]).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(value) <span class="hljs-comment">// 3</span>
})
</code></pre>
<h4>Promise派生</h4>
<p>派生的意思是定义一个新的Promise对象，继承Promise方法和属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyPromise extends Promise {

  //重新封装then()
  success(resolve, reject) {
    return this.then(resolve, reject)
  }
  //重新封装catch()
  failer(reject) {
    return this.catch(reject)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyPromise</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Promise</span> </span>{

  <span class="hljs-comment">//重新封装then()</span>
  success(resolve, reject) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(resolve, reject)
  }
  <span class="hljs-comment">//重新封装catch()</span>
  failer(reject) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-keyword">catch</span>(reject)
  }
}
</code></pre>
<p>接着我们来使用一下这个派生类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
new MyPromise(function(resolve, reject) {
  resolve(10)
}).success(v => console.log(v)) // 10
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  resolve(<span class="hljs-number">10</span>)
}).success(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v)) <span class="hljs-comment">// 10</span>
</code></pre>
<p>如果只是派生出来和then、catch一样的方法，我想，你不会干这么无聊的事情。</p>
<h4>Promise和异步的联系</h4>
<p>Promise本身不是异步的，只有他的then()或者catch()方法才是异步，也可以说Promise的返回值是异步的。通常Promise被使用在node，或者是前端的ajax请求、前端DOM渲染顺序等地方。</p>
<h3 id="articleHeader1">比Promise更牛逼的异步方案</h3>
<p>在本章你只需要了解有async这个未来的方案，推荐不会的赶紧去网上找资料学，反正我是已经在实际项目中全面开展async了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function a() {
    await function() {"}}"
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{"}}"
}
</code></pre>
<h3 id="articleHeader2">总结</h3>
<p>Promise是什么、怎么用、怎么获取返回值？是本章的中心内容，多看几遍，你会发现使用Promise是非常简单的事情。</p>
<p><a href="https://segmentfault.com/a/1190000010199272">=&gt; 返回文章目录</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《深入理解ES6》笔记—— Promise与异步编程（11）

## 原文链接
[https://segmentfault.com/a/1190000010444236](https://segmentfault.com/a/1190000010444236)


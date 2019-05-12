---
title: '从零实现一个简单的 Promise' 
date: 2019-01-06 2:30:10
hidden: true
slug: g2l5bwplc0q
categories: [reprint]
---

{{< raw >}}

                    
<p>本文参考了<div class="video-prev vp_XMjY4MjM4MjA2MA=="><div class="clearfix video-header"><img class="pull-left" src="https://static.alili.techundefined"><div class="pull-left"><h5>Node.js 实践教程 - Promise 实现</h5><span class="text-muted">http://v.youku.com/v_show/id_XMjY4MjM4MjA2MA==.html</span></div></div></div>这个视频，并添加了自己的一些想法。</p>
<p>首先来看 Promise 的构造：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里用 Prometheus 代替 Promise
let p = new Prometheus((resolve, reject) => {
    resolve('hello')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这里用 Prometheus 代替 Promise</span>
<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Prometheus(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'hello'</span>)
})</code></pre>
<p>下面我们来实现它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三种状态
const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

function Prometheus (fn) {
    // fn 必须是函数
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function!')
    }

    let state = PENDING // 初始状态是 PENDING
    let value = null // 返回值

    function fulfill (result) {
        state = FULFILLED
        value = result
    }

    // 完成时调用的方法，这里做了容错
    function resolve (result) {
        try {
            fulfill(result)
        } catch (err) {
            reject(err)
        }
    }

    // 拒绝时调用的方法
    function reject (error) {
        state = REJECTED
        value = error
    }

    fn(resolve, reject)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 三种状态</span>
<span class="hljs-keyword">const</span> PENDING = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-built_in">Symbol</span>()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Prometheus</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// fn 必须是函数</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'fn must be a function!'</span>)
    }

    <span class="hljs-keyword">let</span> state = PENDING <span class="hljs-comment">// 初始状态是 PENDING</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span> <span class="hljs-comment">// 返回值</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span> (<span class="hljs-params">result</span>) </span>{
        state = FULFILLED
        value = result
    }

    <span class="hljs-comment">// 完成时调用的方法，这里做了容错</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">try</span> {
            fulfill(result)
        } <span class="hljs-keyword">catch</span> (err) {
            reject(err)
        }
    }

    <span class="hljs-comment">// 拒绝时调用的方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span> (<span class="hljs-params">error</span>) </span>{
        state = REJECTED
        value = error
    }

    fn(resolve, reject)
}</code></pre>
<p>第二步，实现 then 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Prometheus((resolve, reject) => {
    resolve('hello')
})

p.then(val => {
    console.log(val)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Prometheus(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'hello'</span>)
})

p.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val)
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三种状态
const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

function Prometheus (fn) {
    // fn 必须是函数
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function!')
    }

    let state = PENDING // 初始状态是 PENDING
    let value = null // 返回值

    function fulfill (result) {
        state = FULFILLED
        value = result
    }

    // 完成时调用的方法，这里做了容错
    function resolve (result) {
        try {
            fulfill(result)
        } catch (err) {
            reject(err)
        }
    }

    // 拒绝时调用的方法
    function reject (error) {
        state = REJECTED
        value = error
    }

    this.then = function (onFulfill, onReject) {
        switch (state) {
            case FULFILLED:
                onFulfill(value)
                break
            case REJECTED:
                onReject(value)
                break
        }
    }

    fn(resolve, reject)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 三种状态</span>
<span class="hljs-keyword">const</span> PENDING = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-built_in">Symbol</span>()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Prometheus</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// fn 必须是函数</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'fn must be a function!'</span>)
    }

    <span class="hljs-keyword">let</span> state = PENDING <span class="hljs-comment">// 初始状态是 PENDING</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span> <span class="hljs-comment">// 返回值</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span> (<span class="hljs-params">result</span>) </span>{
        state = FULFILLED
        value = result
    }

    <span class="hljs-comment">// 完成时调用的方法，这里做了容错</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">try</span> {
            fulfill(result)
        } <span class="hljs-keyword">catch</span> (err) {
            reject(err)
        }
    }

    <span class="hljs-comment">// 拒绝时调用的方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span> (<span class="hljs-params">error</span>) </span>{
        state = REJECTED
        value = error
    }

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfill, onReject</span>) </span>{
        <span class="hljs-keyword">switch</span> (state) {
            <span class="hljs-keyword">case</span> FULFILLED:
                onFulfill(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> REJECTED:
                onReject(value)
                <span class="hljs-keyword">break</span>
        }
    }

    fn(resolve, reject)
}</code></pre>
<p>第三步，在 Promise 里使用异步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Prometheus((resolve, reject) => {
    setTimeout(() => {
        resolve('hello')
    }, 0)
})

p.then(val => {
    console.log(val)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Prometheus(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-string">'hello'</span>)
    }, <span class="hljs-number">0</span>)
})

p.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val)
})</code></pre>
<p>直接运行上面的代码发现控制台没有打印出 <code>hello</code>，原因是 <code>Prometheus</code> 里的代码是异步执行，导致记下来执行 <code>then</code> 方法的时候，<code>state</code> 是 <code>PENDING</code>，后面再执行 <code>resolve</code> 的时候就不会走到 <code>onFulfill</code> 了，所以我们要在 <code>then</code> 方法里添加 <code>state</code> 为 <code>PENDING</code> 的分支判断，把 <code>onFulfill</code> 和 <code>onReject</code> 存到一个变量中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三种状态
const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

function Prometheus (fn) {
    // fn 必须是函数
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function!')
    }

    let state = PENDING // 初始状态是 PENDING
    let value = null // 返回值
    let hanler = {}

    function fulfill (result) {
        state = FULFILLED
        value = result
        handler.onFulfill(result)
    }

    // 完成时调用的方法，这里做了容错
    function resolve (result) {
        try {
            fulfill(result)
        } catch (err) {
            reject(err)
        }
    }

    // 拒绝时调用的方法
    function reject (error) {
        state = REJECTED
        value = error
        handler.onReject(error)
    }

    this.then = function (onFulfill, onReject) {
        switch (state) {
            case FULFILLED:
                onFulfill(value)
                break
            case REJECTED:
                onReject(value)
                break
            case PENDING:
                handler = { onFulfill, onReject }
        }
    }

    fn(resolve, reject)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 三种状态</span>
<span class="hljs-keyword">const</span> PENDING = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-built_in">Symbol</span>()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Prometheus</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// fn 必须是函数</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'fn must be a function!'</span>)
    }

    <span class="hljs-keyword">let</span> state = PENDING <span class="hljs-comment">// 初始状态是 PENDING</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span> <span class="hljs-comment">// 返回值</span>
    <span class="hljs-keyword">let</span> hanler = {}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span> (<span class="hljs-params">result</span>) </span>{
        state = FULFILLED
        value = result
        handler.onFulfill(result)
    }

    <span class="hljs-comment">// 完成时调用的方法，这里做了容错</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">try</span> {
            fulfill(result)
        } <span class="hljs-keyword">catch</span> (err) {
            reject(err)
        }
    }

    <span class="hljs-comment">// 拒绝时调用的方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span> (<span class="hljs-params">error</span>) </span>{
        state = REJECTED
        value = error
        handler.onReject(error)
    }

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfill, onReject</span>) </span>{
        <span class="hljs-keyword">switch</span> (state) {
            <span class="hljs-keyword">case</span> FULFILLED:
                onFulfill(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> REJECTED:
                onReject(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> PENDING:
                handler = { onFulfill, onReject }
        }
    }

    fn(resolve, reject)
}</code></pre>
<p>异步实现了，我们再回过头看看同步是否正常运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Prometheus((resolve, reject) => {
  resolve('hello')
})

p.then(val => {
    console.log(val)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Prometheus(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  resolve(<span class="hljs-string">'hello'</span>)
})

p.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val)
})</code></pre>
<p>发现报错信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TypeError: handler.onReject is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">TypeError: handler.onReject is not a <span class="hljs-keyword">function</span></code></pre>
<p>因为同步执行的时候，<code>fulfill</code> 里 <code>handler</code> 是 <code>{}</code>，所以会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三种状态
const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

function Prometheus (fn) {
    // fn 必须是函数
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function!')
    }

    let state = PENDING // 初始状态是 PENDING
    let value = null // 返回值
    let handler = {}

    function fulfill (result) {
        state = FULFILLED
        value = result
        next(handler)
    }

    // 完成时调用的方法，这里做了容错
    function resolve (result) {
        try {
            fulfill(result)
        } catch (err) {
            reject(err)
        }
    }

    // 拒绝时调用的方法
    function reject (error) {
        state = REJECTED
        value = error
        next(handler)
    }

    function next({ onFulfill, onReject }) {
        switch (state) {
            case FULFILLED:
                onFulfill &amp;&amp; onFulfill(value)
                break
            case REJECTED:
                onReject &amp;&amp; onReject(value)
                break
            case PENDING:
                handler = { onFulfill, onReject }
        }
    }

    this.then = function (onFulfill, onReject) {
        next({onFulfill, onReject})
    }

    fn(resolve, reject)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 三种状态</span>
<span class="hljs-keyword">const</span> PENDING = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-built_in">Symbol</span>()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Prometheus</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// fn 必须是函数</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'fn must be a function!'</span>)
    }

    <span class="hljs-keyword">let</span> state = PENDING <span class="hljs-comment">// 初始状态是 PENDING</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span> <span class="hljs-comment">// 返回值</span>
    <span class="hljs-keyword">let</span> handler = {}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span> (<span class="hljs-params">result</span>) </span>{
        state = FULFILLED
        value = result
        next(handler)
    }

    <span class="hljs-comment">// 完成时调用的方法，这里做了容错</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">try</span> {
            fulfill(result)
        } <span class="hljs-keyword">catch</span> (err) {
            reject(err)
        }
    }

    <span class="hljs-comment">// 拒绝时调用的方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span> (<span class="hljs-params">error</span>) </span>{
        state = REJECTED
        value = error
        next(handler)
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">{ onFulfill, onReject }</span>) </span>{
        <span class="hljs-keyword">switch</span> (state) {
            <span class="hljs-keyword">case</span> FULFILLED:
                onFulfill &amp;&amp; onFulfill(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> REJECTED:
                onReject &amp;&amp; onReject(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> PENDING:
                handler = { onFulfill, onReject }
        }
    }

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfill, onReject</span>) </span>{
        next({onFulfill, onReject})
    }

    fn(resolve, reject)
}</code></pre>
<p>现在同步也可以正常运行了，接下来看看多个 <code>then</code> 链式调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Prometheus((resolve, reject) => {
  resolve('hello')
})

p.then(val => {
    console.log(val)
    return 'world'
}).then(val => {
    console.log(val)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Prometheus(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  resolve(<span class="hljs-string">'hello'</span>)
})

p.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val)
    <span class="hljs-keyword">return</span> <span class="hljs-string">'world'</span>
}).then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val)
})</code></pre>
<p>执行代码会发现如下报错信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TypeError: Cannot read property 'then' of undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">TypeError: Cannot <span class="hljs-built_in">read</span> <span class="hljs-keyword">property</span> '<span class="hljs-keyword">then</span>' <span class="hljs-keyword">of</span> undefined</code></pre>
<p>原因是 <code>then</code> 方法没有返回 <code>Promise</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三种状态
const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

function Prometheus (fn) {
    // fn 必须是函数
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function!')
    }

    let state = PENDING // 初始状态是 PENDING
    let value = null // 返回值
    let handler = {}

    function fulfill (result) {
        state = FULFILLED
        value = result
        next(handler)
    }

    // 完成时调用的方法，这里做了容错
    function resolve (result) {
        try {
            fulfill(result)
        } catch (err) {
            reject(err)
        }
    }

    // 拒绝时调用的方法
    function reject (error) {
        state = REJECTED
        value = error
        next(handler)
    }

    function next({ onFulfill, onReject }) {
        switch (state) {
            case FULFILLED:
                onFulfill &amp;&amp; onFulfill(value)
                break
            case REJECTED:
                onReject &amp;&amp; onReject(value)
                break
            case PENDING:
                handler = { onFulfill, onReject }
        }
    }

    this.then = function (onFulfill, onReject) {
        return new Prometheus((resolve, reject) => {
            next({
                onFulfill: val => {
                    resolve(onFulfill(val))
                },
                onReject: err => {
                    reject(onReject(err))
                }
            })
        })
    }

    fn(resolve, reject)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 三种状态</span>
<span class="hljs-keyword">const</span> PENDING = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-built_in">Symbol</span>()
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-built_in">Symbol</span>()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Prometheus</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// fn 必须是函数</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'fn must be a function!'</span>)
    }

    <span class="hljs-keyword">let</span> state = PENDING <span class="hljs-comment">// 初始状态是 PENDING</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span> <span class="hljs-comment">// 返回值</span>
    <span class="hljs-keyword">let</span> handler = {}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span> (<span class="hljs-params">result</span>) </span>{
        state = FULFILLED
        value = result
        next(handler)
    }

    <span class="hljs-comment">// 完成时调用的方法，这里做了容错</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">try</span> {
            fulfill(result)
        } <span class="hljs-keyword">catch</span> (err) {
            reject(err)
        }
    }

    <span class="hljs-comment">// 拒绝时调用的方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span> (<span class="hljs-params">error</span>) </span>{
        state = REJECTED
        value = error
        next(handler)
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">{ onFulfill, onReject }</span>) </span>{
        <span class="hljs-keyword">switch</span> (state) {
            <span class="hljs-keyword">case</span> FULFILLED:
                onFulfill &amp;&amp; onFulfill(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> REJECTED:
                onReject &amp;&amp; onReject(value)
                <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> PENDING:
                handler = { onFulfill, onReject }
        }
    }

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfill, onReject</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Prometheus(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            next({
                <span class="hljs-attr">onFulfill</span>: <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
                    resolve(onFulfill(val))
                },
                <span class="hljs-attr">onReject</span>: <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                    reject(onReject(err))
                }
            })
        })
    }

    fn(resolve, reject)
}</code></pre>
<p>再次运行，正确打印出结果。</p>
<p>到此，一个非常简单的 Promise 就实现了，当然，这里其实还有很多细节没有考虑，具体还要参考 <a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">Promise/A+</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零实现一个简单的 Promise

## 原文链接
[https://segmentfault.com/a/1190000010410543](https://segmentfault.com/a/1190000010410543)


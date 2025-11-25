---
title: '十几行代码教你实现一个最简版的promise' 
date: 2019-01-12 2:30:24
hidden: true
slug: 5f97wv4qsn5
categories: [reprint]
---

{{< raw >}}

                    
<p>最近研究了一下promise的实现，这篇文章使用了十几行代码实现了一个简单的promise；以便帮助读者对promise'有更深的了解。本篇文章实现的promise，遵循规范是 Promises/A+。</p>
<p>阅读本篇文章时，已经假定你会promise的基本使用和一些简单的es6语法；如果你还没掌握promise的基本使用，请学习完毕后再来。推荐可以看《promise迷你书》、《你不知道的js》及阮一峰老师的《ECMAScript 6 入门》。</p>
<h2 id="articleHeader0">promise的核心实现</h2>
<p>首先，我们看一下一个promise的基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve(20)
    }, 300)
})
p.then( (msg) => console.log(msg) );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var p = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">20</span>)
    }, <span class="hljs-number">300</span>)
})
p.<span class="hljs-keyword">then</span>( <span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(msg) );</code></pre>
<p>MyPromise是一个构造函数，这个构造函数会被传递一个函数；函数中有两个参数，是两个函数resolve,reject。另外一个promise有三种状态PENDING、RESOLVED、REJECTED。所以我们有以下的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;  
function MyPromise(func){
    let state = PENDING;
    let value = null;
    function resolve(newValue){
        value = newValue;
        state = RESOLVED;
    }
    function reject(err){
        value = err;
        state = REJECTED;
    }
    func(resolve, reject);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> PENDING = <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> RESOLVED = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-number">2</span>;  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyPromise</span>(<span class="hljs-params">func</span>)</span>{
    <span class="hljs-keyword">let</span> state = PENDING;
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>)</span>{
        value = newValue;
        state = RESOLVED;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">err</span>)</span>{
        value = err;
        state = REJECTED;
    }
    func(resolve, reject);
}</code></pre>
<p>然后我们实现then函数,每次then函数的执行会返回一个新的promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.then = function(onFullFill, onReject){
    return new MyPromise((resolve, reject) => {
        
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFullFill, onReject</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        
    })
}</code></pre>
<p>传递给then函数onFullFill函数返回值，会传递给第二个then中onFullFill中。即要能这样使用<code>p.then( (msg) =&gt; msg ).then( data =&gt; console.log(data) );</code><br>这行代码实际是什么呢？让我们变换一下上面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p
  .then( function fn1(msg){
      return msg;
  })
  .then( function fn2(data){
      console.log(data);
  })
//以上代码的实质
fn2(fn1(msg))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>p
  .<span class="hljs-keyword">then</span>( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span><span class="hljs-params">(msg)</span>{</span>
      <span class="hljs-keyword">return</span> msg;
  })
  .<span class="hljs-keyword">then</span>( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span><span class="hljs-params">(data)</span>{</span>
      console.<span class="hljs-built_in">log</span>(data);
  })
<span class="hljs-comment">//以上代码的实质</span>
fn2(fn1(msg))</code></pre>
<p>我们要在then函数里面如何执行resolve函数呢？首先resolve函数是必须执行的，因为它要改变p.then()生成的promise的状态；其次，resolve这个函数还要能接受到onFullFill执行的值；以便传递给下一个回调函数。你可能想到了这种方案:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;  
function MyPromise(func){
    let state = PENDING;
    let value = null;
    function resolve(newValue){
        value = newValue;
        state = RESOLVED;
    }
    function reject(err){
        value = err;
        state = REJECTED;
    }
    this.then = function(onFullFill, onReject){
        return new MyPromise((resolve, reject) => {
            resolve(onFullFill(value));
        })
    }
    func(resolve, reject);
}

var p = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve(20)
    }, 300)
})

p.then( (msg) => msg ).then( data => console.log(data) );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> PENDING = <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> RESOLVED = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-number">2</span>;  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyPromise</span>(<span class="hljs-params">func</span>)</span>{
    <span class="hljs-keyword">let</span> state = PENDING;
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>)</span>{
        value = newValue;
        state = RESOLVED;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">err</span>)</span>{
        value = err;
        state = REJECTED;
    }
    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFullFill, onReject</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            resolve(onFullFill(value));
        })
    }
    func(resolve, reject);
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">20</span>)
    }, <span class="hljs-number">300</span>)
})

p.then( <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> msg ).then( <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data) );</code></pre>
<p>但是当你把以上代码拼凑在一起，执行；打印出来的是null。why？</p>
<p>因为<code>setTimeout(fn, 300)</code>这行代码是异步执行的，而当promise中的state!==RESOLVED时，这行代码<code>resolve(onFullFill(value))</code>；不应该执行。所以我们有了以下的优化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyPromise(func){
    let state = PENDING;
    let value = null;
    let handlers = [];
    function resolve(newValue){
        value = newValue;
        state = RESOLVED;
        handlers.forEach( handler => handle(handler));
    }
    function reject(err){
        value = err;
        state = REJECTED;
    }
    function handle(handler){
        if(state === PENDING){
            handlers.push(handler);
            return;
        }
        handler.resolve(handler.onFullFill(value));
    }
    this.then = function(onFullFill, onReject){
        return new MyPromise((resolve, reject) => {
            handle({
                resolve: resolve,
                onFullFill: onFullFill
            })
        })
    }
    func(resolve, reject);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyPromise</span>(<span class="hljs-params">func</span>)</span>{
    <span class="hljs-keyword">let</span> state = PENDING;
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">let</span> handlers = [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>)</span>{
        value = newValue;
        state = RESOLVED;
        handlers.forEach( <span class="hljs-function"><span class="hljs-params">handler</span> =&gt;</span> handle(handler));
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">err</span>)</span>{
        value = err;
        state = REJECTED;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">handler</span>)</span>{
        <span class="hljs-keyword">if</span>(state === PENDING){
            handlers.push(handler);
            <span class="hljs-keyword">return</span>;
        }
        handler.resolve(handler.onFullFill(value));
    }
    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFullFill, onReject</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            handle({
                <span class="hljs-attr">resolve</span>: resolve,
                <span class="hljs-attr">onFullFill</span>: onFullFill
            })
        })
    }
    func(resolve, reject);
}</code></pre>
<p>这样在then函数里和resolve函数里我们都会执行handle函数，但只有在resolve函数执行后才会执行<code>handler.resolve(handler.onFullFill(value))</code>。<br>现在还有一个问题，如果Promise中封装的不是异步操作，而是同步操作；那么resolve函数就会比then函数更先执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new MyPromise((resolve, reject) => {
    resolve('同步操作')
})
p.then(console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var p = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    resolve(<span class="hljs-string">'同步操作'</span>)
})
p.<span class="hljs-keyword">then</span>(<span class="hljs-built_in">console</span>.log)</code></pre>
<p>所以我们执行resolve中的回调的时候，应该异步执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(newValue){
    value = newValue;
    state = RESOLVED;
    setTimeout( () => {
        handlers.forEach( handler => handle(handler));
    }, 0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>)</span>{
    value = newValue;
    state = RESOLVED;
    setTimeout( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        handlers.forEach( <span class="hljs-function"><span class="hljs-params">handler</span> =&gt;</span> handle(handler));
    }, <span class="hljs-number">0</span>)
}</code></pre>
<p>同时，由于then函数中可以接收一个promise；我们需要对这种情况进行处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve = (newValue) => {
  if(newValue &amp;&amp; (typeof newValue === 'object' || typeonewValue === 'function') {
    let then = newValue.then
    if(typeof then === 'function'){
      return then.call(newValue, resolve)
    }
  
  state = FULFILLED;
  value = newValue;
  setTimeout(() => {
    handlers.forEach(handler => {
      handle(handler)
    })
  }, 0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>function resolve = <span class="hljs-function"><span class="hljs-params">(newValue)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span>(newValue &amp;&amp; (<span class="hljs-keyword">typeof</span> newValue === <span class="hljs-string">'object'</span> || typeonewValue === <span class="hljs-string">'function'</span>) {
    let <span class="hljs-keyword">then</span> = newValue.<span class="hljs-keyword">then</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">then</span> === <span class="hljs-string">'function'</span>){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">then</span>.call(newValue, resolve)
    }
  
  state = FULFILLED;
  value = newValue;
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    handlers.forEach(handler =&gt; {
      handle(handler)
    })
  }, <span class="hljs-number">0</span>)
}</code></pre>
<p>至此，我们已经完成了一个基本promise的实现。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
十几行代码教你实现一个最简版的promise

## 原文链接
[https://segmentfault.com/a/1190000009809466](https://segmentfault.com/a/1190000009809466)


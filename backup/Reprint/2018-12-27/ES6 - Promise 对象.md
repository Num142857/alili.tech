---
title: 'ES6 - Promise 对象' 
date: 2018-12-27 2:30:13
hidden: true
slug: peoedtbjnqk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>ECMAScript 6 的正式版后，我们看到新增加了一个对象<code>Promise</code>,它是用来处理异步操作的，以前的异步操作书写并不是很美观，而且在回调函数中 <code>return</code>和 <code>throw </code>并不会带到我们想要的状态。而<code>Promise</code> 很好的解决了这些问题。</p>
<h2 id="articleHeader1">了解 promise</h2>
<p>promise 对象存在三种状态，进行中、结束、失败。当从进行中到结束状态或从进行中到失败状态时，会触发<code>reslove</code>、<code>reject</code>函数。</p>
<h2 id="articleHeader2">Promise 对象用法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建 promise
let promise = new Promise(function(reslove,reject){
    
    if(/ * 成功 */){  
       reslove(values) // 成功调用reslove函数
    }else{
       reject(values)  // 失败调用 reject函数
    }
})


// 调用

promise.then(function(val){
   // 调用reslove() 函数
},function(val){
   调用 reject() 函数
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 创建 promise</span>
<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reslove,reject</span>)</span>{
    
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/ * 成功 */</span>){  
       reslove(values) <span class="hljs-comment">// 成功调用reslove函数</span>
    }<span class="hljs-keyword">else</span>{
       reject(values)  <span class="hljs-comment">// 失败调用 reject函数</span>
    }
})


<span class="hljs-comment">// 调用</span>

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>)</span>{
   <span class="hljs-comment">// 调用reslove() 函数</span>
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>)</span>{
   调用 reject() 函数
})
</code></pre>
<p><code>reslove</code> 和 <code>reject</code> 函数并不我们自己声明的，而是js底层为我们封装好的。当我们在 <code>promise</code>对象中成功时调用<code>reslove</code>函数，它会触发then方法中的第一个函数，当我们在 <code>promise</code>对象中成功时调用<code>reject</code>函数，它会触发then方法中的第二个函数，另外then中的第二个方法我们可以省略。我们可以使用 <code>catch</code> 来接受一些错误信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then((val) =>{
    // 成功处理
}).catch((val) =>{
    // 错误处理
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(val)</span> =&gt;</span>{
    <span class="hljs-regexp">//</span> 成功处理
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(val)</span> =&gt;</span>{
    <span class="hljs-regexp">//</span> 错误处理
})</code></pre>
<p>在创建的<code>promise</code>构造函数里或<code>then</code>的回调函数里遇到的错误信息都会被<code>catch</code>捕获到，我们来看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = function(time){

    return new Promise(function(relove, reject){
      if(typeof time == 'number'){
        setTimeout(relove,time,&quot;调用成功&quot;);
      }else{
          reject(&quot;调用失败&quot;)
      }
       
    })
}


promise(100).then((val) =>{
    console.log(val)  // 调用成功
})

promise(&quot;fda&quot;).then((val) =>{
    console.log(val)  // 调用失败
})

promise(100).then((val) =>{
    new throw(&quot;出错了&quot;)
    console.log(val)  // 不执行
}).catch((val) => {
    console.log(val)  //出错了 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> promise = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>)</span>{

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">relove, reject</span>)</span>{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> time == <span class="hljs-string">'number'</span>){
        setTimeout(relove,time,<span class="hljs-string">"调用成功"</span>);
      }<span class="hljs-keyword">else</span>{
          reject(<span class="hljs-string">"调用失败"</span>)
      }
       
    })
}


promise(<span class="hljs-number">100</span>).then(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span>{
    <span class="hljs-built_in">console</span>.log(val)  <span class="hljs-comment">// 调用成功</span>
})

promise(<span class="hljs-string">"fda"</span>).then(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span>{
    <span class="hljs-built_in">console</span>.log(val)  <span class="hljs-comment">// 调用失败</span>
})

promise(<span class="hljs-number">100</span>).then(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span>{
    <span class="hljs-keyword">new</span> <span class="hljs-keyword">throw</span>(<span class="hljs-string">"出错了"</span>)
    <span class="hljs-built_in">console</span>.log(val)  <span class="hljs-comment">// 不执行</span>
}).catch(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val)  <span class="hljs-comment">//出错了 </span>
})</code></pre>
<p>现在我们应该对promise有一定的了解，使用<code>promise</code>还有一定的好处是，我们可以在<code>then</code>回调函数中去使用 <code>return</code> 语句和 <code>throw</code> 语句，上面我们已经使用了<code>throw</code> 语句。另外我们还可以在then的回调函数中去使用调用另一 <code>promise</code> 对象。这样比我们使用AJAX交互时嵌套访问清晰的多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promiseOne.then(()=>{
    promiseTwo.then(() =>{

    })
}).catch(() =>{
    
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>promiseOne.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    promiseTwo.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>{

    })
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>{
    
})</code></pre>
<p>另外，我们应该知道，<code>then</code> 方法和 <code>catch</code> 方法是绑定到了 <code>promise</code>对象的原型上边了。</p>
<h2 id="articleHeader3">Promise 对象的其他用法</h2>
<p><strong> 1. Promise.all() </strong></p>
<p>该方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = Promise.all([promiseOne,promiseTwo]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let promise</span> = Promise.all([promiseOne,promiseTwo]);</code></pre>
<p>这种情况下当 <code>promiseOne</code> 和 <code>promiseTwo</code> 都成功调用 <code>promise</code> 才会被成功调用，</p>
<p><strong> 2. Promise.race() </strong></p>
<p>该方法同样是将多个<code>Promise</code>实例，包装成一个新的<code>Promise</code>实例。只不过在这种情况下，只要其中一个被成功调用，<code>promise</code> 就会被成功调用。</p>
<ol><li>Promise.resolve()</li></ol>
<p>将对象转换为 <code>Promise</code>,这里有四中情况</p>
<p>(1)参数是一个Promise实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise(function(relove,reject){
    
})

// 返回promise
let promiseNew = Promise.resolve(promise) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">relove,reject</span>)</span>{
    
})

<span class="hljs-comment">// 返回promise</span>
<span class="hljs-keyword">let</span> promiseNew = <span class="hljs-built_in">Promise</span>.resolve(promise) 
</code></pre>
<p>如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。</p>
<p>(2)参数是一个thenable对象</p>
<p>thenable对象就是带有 <code>then</code> 方法的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj ={
    then(relove,reject){
        relove(111)
    }
}


let promiseNew = Promise.resolve(obj) 
promiseNew.then((val) =>{
    console.log(val)  // 111
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">let</span> obj ={
    <span class="hljs-keyword">then</span>(relove,reject){
        relove(<span class="hljs-number">111</span>)
    }
}


<span class="hljs-keyword">let</span> promiseNew = Promise.resolve(obj) 
promiseNew.<span class="hljs-keyword">then</span>((<span class="hljs-keyword">val</span>) =&gt;{
    console.log(<span class="hljs-keyword">val</span>)  <span class="hljs-comment">// 111</span>
})</code></pre>
<p>这时<code>Promise.resolve(obj) </code> 会将obj转化为<code>Promise</code>对象，并立即执行then方法</p>
<p>(3)参数不是具有then方法的对象，或根本就不是对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promiseNew = Promise.resolve(1234) 

promiseNew.then((val) =>{
    console.log(val) // 1234
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> promiseNew = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1234</span>) 

promiseNew.then(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span>{
    <span class="hljs-built_in">console</span>.log(val) <span class="hljs-comment">// 1234</span>
})
</code></pre>
<p>(4)不带有任何参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 返回一个 relove状态的Promise对象
let promiseNew = Promise.resolve()  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 返回一个 relove状态的Promise对象</span>
<span class="hljs-keyword">let</span> promiseNew = <span class="hljs-built_in">Promise</span>.resolve()  </code></pre>
<p>需要注意的是，立即<code>resolve</code>的Promise对象，实在事件循环结束时，而不是开始时，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){
    console.log(111)
})

Promise.resolve().then(() =>{
    console.log(222)
})

console.log(333)

// 333
// 222
// 111" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">111</span>)
})

<span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">222</span>)
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">333</span>)

<span class="hljs-comment">// 333</span>
<span class="hljs-comment">// 222</span>
<span class="hljs-comment">// 111</span></code></pre>
<p><code>setTimeout</code> 是在下一个事件循环时执行，<code>Promise.reslove</code> 是在事件循环结束是调用， <code>console</code> 是立即调用</p>
<ol><li>Promise.reject()</li></ol>
<p><code>Promise.reject(reason)</code>方法也会返回一个新的 Promise 实例，该实例的状态为<code>rejected</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'出错了'</span>);
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> reject(<span class="hljs-string">'出错了'</span>))

p.then(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">s</span>) </span>{
  <span class="hljs-built_in">console</span>.log(s)
});
<span class="hljs-comment">// 出错了</span></code></pre>
<p>注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。</p>
<ol><li>done()</li></ol>
<p>该方法是<code>Promise</code> 对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then()
       .catch()
       .then()
       .catch()
       .done() // 接收错误，并向全局抛出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">promise</span><span class="hljs-selector-class">.then</span>()
       <span class="hljs-selector-class">.catch</span>()
       <span class="hljs-selector-class">.then</span>()
       <span class="hljs-selector-class">.catch</span>()
       <span class="hljs-selector-class">.done</span>() <span class="hljs-comment">// 接收错误，并向全局抛出</span></code></pre>
<ol><li>finally()</li></ol>
<p>finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then()
       .finally() // 不管then() 是否有错，finally都会执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>promise.<span class="hljs-keyword">then</span>()
       .<span class="hljs-keyword">finally</span>() <span class="hljs-regexp">//</span> 不管<span class="hljs-keyword">then</span>() 是否有错，<span class="hljs-keyword">finally</span>都会执行</code></pre>
<h2 id="articleHeader4">结束</h2>
<p>promise 对象的使用并不是很难，这里我参考了阮一峰老师的书籍。</p>
<p>参考书籍：<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 - Promise 对象

## 原文链接
[https://segmentfault.com/a/1190000011742644](https://segmentfault.com/a/1190000011742644)


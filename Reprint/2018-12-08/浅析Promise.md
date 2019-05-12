---
title: '浅析Promise' 
date: 2018-12-08 2:30:30
hidden: true
slug: k8cwcdq82q
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>声明，只是简单地提了提promise的基本使用，大牛绕道^_^</blockquote>
<h2 id="articleHeader0">1.先看一个例子</h2>
<p>你需要知道<br><code>1.axios是个库</code><br><code>2.axios()返回一个Promise实例</code><br><code>3.你可以把axios()理解为$.ajax()，它们功能相近，只不过axios遵循promise规范</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    url: '.'
}).then((resolve) => {
    console.log(resolve)
    return '我是第二个then'
}, (reject) => {
    console.log(reject)
}).then((resolve_2) => {
    console.log(resolve_2) // '我是第二个then'
}, (reject_2) => { 
    console.log(reject_2)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>axios({
    url: <span class="hljs-string">'.'</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(resolve)
    <span class="hljs-keyword">return</span> <span class="hljs-string">'我是第二个then'</span>
}, <span class="hljs-function"><span class="hljs-params">(reject)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(reject)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(resolve_2)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(resolve_2) <span class="hljs-regexp">//</span> <span class="hljs-string">'我是第二个then'</span>
}, <span class="hljs-function"><span class="hljs-params">(reject_2)</span> =&gt;</span> { 
    <span class="hljs-built_in">console</span>.log(reject_2)
})
</code></pre>
<p>为了防止你对这个<code>链式调用</code>看得眼花缭乱，我把这个给简化一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    url: '.'
}).then(成功回调, 失败回调)
  .then(成功回调2, 失败回调2)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">axios</span>({
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'.'</span>
})<span class="hljs-selector-class">.then</span>(成功回调, 失败回调)
  <span class="hljs-selector-class">.then</span>(成功回调2, 失败回调2)
</code></pre>
<p>ok，准备好了吗？下面我们先来了解Promise的一些基本概念</p>
<h2 id="articleHeader1">2.Promise的基本概念</h2>
<h3 id="articleHeader2">2.1Promise的作用</h3>
<p><strong>Promise是专门用来解决异步编程问题的，避免了层层嵌套的回调函数[Callback Hell]</strong><br>下面是一个用传统方法Callback Hell来写的异步代码<br>可以非常明显地看出来，Callback Hell的方式让代码的可读性变得非常差</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadImg(src, callback, fail) {
    let img = new Image()
    img.onload = function () {
        // 成功回调
        callback(img)
    }
    img.onerror = fail // 失败回调
    img.src = src
}

let src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
loadImg(src, function (img) {
    console.log(img.width)
}, function () {
    console.log('error')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function loadImg(src, callback, fail) {
    let <span class="hljs-selector-tag">img</span> = new Image()
    <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.onload</span> = function () {
        <span class="hljs-comment">// 成功回调</span>
        callback(img)
    }
    <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.onerror</span> = fail <span class="hljs-comment">// 失败回调</span>
    <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.src</span> = src
}

let src = <span class="hljs-string">'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'</span>
<span class="hljs-function"><span class="hljs-title">loadImg</span><span class="hljs-params">(src, function (img)</span></span> {
    console.log(<span class="hljs-selector-tag">img</span>.<span class="hljs-attribute">width</span>)
}, function () {
    console.log(<span class="hljs-string">'error'</span>)
})</code></pre>
<h3 id="articleHeader3">2.2 Promise的三个状态</h3>
<ol>
<li>
<code>pending</code>初始态，既不成功也不失败</li>
<li>
<code>fulfilled</code>异步操作成功</li>
<li>
<code>rejected</code>异步操作失败</li>
</ol>
<p><strong>Promise对象代表一个异步操作</strong>，且<strong><code>只有异步操作的结果，可以决定当前是哪一种状态</code></strong>，任何其他操作都无法改变这个状态，<code>peding可转化为fulfilled与rejected，但fulfilled与rejected不可相互转化</code></p>
<p>那知道这三个状态又有什么用咧？<br>OK，我们看下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    url: '.'
}).then(成功回调, 失败回调)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">axios</span>({
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'.'</span>
})<span class="hljs-selector-class">.then</span>(成功回调, 失败回调)</code></pre>
<p><code>axios({url: '.'})</code><br><strong>异步操作成功</strong>代表了<code>pending</code> -&gt; <code>fulfilled</code> -&gt; then里的<code>第一个参数</code>【成功回调】<br><strong>异步操作失败</strong>代表了<code>pending</code> -&gt; <code>rejected</code> -&gt; then里的<code>第二个参数</code>【失败回调】</p>
<h2 id="articleHeader4">3.then和catch的链式调用</h2>
<p>因为 <code>Promise.prototype.then</code> 和  <code>Promise.prototype.catch</code> 方法<code>返回promise 对象</code><br>所以它们可以被链式调用。</p>
<p>OK，下面让我们仔细看一下回调触发机制究竟怎样的过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    url: '.'
}).then(成功回调, 失败回调)
  .then(成功回调2, 失败回调2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">axios</span>({
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'.'</span>
})<span class="hljs-selector-class">.then</span>(成功回调, 失败回调)
  <span class="hljs-selector-class">.then</span>(成功回调2, 失败回调2)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVz3Ka?w=801&amp;h=297" src="https://static.alili.tech/img/bVz3Ka?w=801&amp;h=297" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>是不是看的有点晕？没关系，下面我来详细解释一下<br>1.异步操作<code>成功</code> -&gt; 进入第一个then的<code>成功回调</code> -&gt; <code>成功回调</code>执行异步操作成功 -&gt; 由于又返回了一个Promise实例，其状态由于异步操作成功，由<code>pending</code>转为了<code>fullfiled</code>，所以还可以再调用第二个then -&gt; 进入第二个then的<code>成功回调2</code><br>2.异步操作<code>失败</code>-&gt; 进入第一个then的<code>失败回调</code> -&gt; <code>失败回调</code>执行异步操作成功 -&gt; 由于又返回了一个Promise实例，其状态由于异步操作成功，由<code>pending</code>转为了<code>fullfiled</code>，所以还可以再调用第二个then -&gt; 进入第二个then的<code>成功回调2</code></p>
<p>你的问题：<br>1.<strong>为什么第一个then不论调用<code>成功回调</code>还是<code>失败回调</code>，第二个then都会调用<code>成功回调2</code>呢</strong><br>答：因为第二个then调用进入哪个回调函数，完全是看第一个then返回的Promise是什么状态，换言之 —— 看<code>异步操作成功与否</code></p>
<p><span class="img-wrap"><img data-src="/img/bV6Z75?w=1424&amp;h=528" src="https://static.alili.tech/img/bV6Z75?w=1424&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>举一个栗子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    url: '.'
}).then((resolve) => {
    return xxx 
    // 注意xxx是个未声明的变量
    // 浏览器会报错，说明异步操作失败了
    // 所以第一个then返回的Promise的状态是 rejected
}, (reject) => {})
    .then((resolve_2) => {
    console.log(1)
}, (reject_2) => {
    // 所以第二个then只会调用它的第二个参数
    console.log(2)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>axios({
    url: <span class="hljs-string">'.'</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> xxx 
    <span class="hljs-regexp">//</span> 注意xxx是个未声明的变量
    <span class="hljs-regexp">//</span> 浏览器会报错，说明异步操作失败了
    <span class="hljs-regexp">//</span> 所以第一个<span class="hljs-keyword">then</span>返回的Promise的状态是 rejected
}, <span class="hljs-function"><span class="hljs-params">(reject)</span> =&gt;</span> {})
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(resolve_2)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}, <span class="hljs-function"><span class="hljs-params">(reject_2)</span> =&gt;</span> {
    <span class="hljs-regexp">//</span> 所以第二个<span class="hljs-keyword">then</span>只会调用它的第二个参数
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
})
</code></pre>
<p>2.<strong>你咋不提catch咧？</strong><br>因为<code>catch就是then的一个语法糖呀</code><br><code>catch等价于then只有第二个参数【失败回调】的形式</code><br>上面的例子用catch，可以这么写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    url: '.'
}).then((fulfilled) => {
    return xxx
    // 注意xxx是个未声明的变量
    // 所以第一个then返回的Promise的状态是 rejected
}, (rejected) => {
}).catch((rejected) => {
    // 所以直接进入catch
    console.log(2)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>axios({
    url: <span class="hljs-string">'.'</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(fulfilled)</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> xxx
    <span class="hljs-regexp">//</span> 注意xxx是个未声明的变量
    <span class="hljs-regexp">//</span> 所以第一个<span class="hljs-keyword">then</span>返回的Promise的状态是 rejected
}, <span class="hljs-function"><span class="hljs-params">(rejected)</span> =&gt;</span> {
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(rejected)</span> =&gt;</span> {
    <span class="hljs-regexp">//</span> 所以直接进入<span class="hljs-keyword">catch</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
})</code></pre>
<h2 id="articleHeader5">4.自己写一个Promise</h2>
<p><strong>第一步</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明一个函数 让这个函数返回一个Promise实例
let setPromise = function () {
    return new Promise()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 声明一个函数 让这个函数返回一个Promise实例</span>
<span class="hljs-keyword">let</span> setPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>()
}</code></pre>
<p><strong>第二步</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// new Promise()接受一个函数
// 规定这个函数必须要有两个参数【成功回调，失败回调】
let a = 0
let setPromise = function () {
    let fn = (x, y) => {
        setTimeout(() => {
            x('success') 
            // 一定要写上异步操作成功后，会调用的回调函数
        }, 2000)
    }
    return new Promise(fn)
    // 在new的过程中一定有一句fn.call(undefined, fulfilled, rejected)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// new Promise()接受一个函数</span>
<span class="hljs-comment">// 规定这个函数必须要有两个参数【成功回调，失败回调】</span>
<span class="hljs-keyword">let</span> a = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> setPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> fn = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            x(<span class="hljs-string">'success'</span>) 
            <span class="hljs-comment">// 一定要写上异步操作成功后，会调用的回调函数</span>
        }, <span class="hljs-number">2000</span>)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(fn)
    <span class="hljs-comment">// 在new的过程中一定有一句fn.call(undefined, fulfilled, rejected)</span>
}</code></pre>
<p><strong>第三步</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 写的更装逼点，顺别把x，y换个名字【其实是规定】
let setPromise = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 2000)
    }) // 在new的过程中一定有一句fn.call(undefined, fulfilled, rejected)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 写的更装逼点，顺别把x，y换个名字【其实是规定】</span>
<span class="hljs-keyword">let</span> setPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            resolve(<span class="hljs-string">'success'</span>)
        }, <span class="hljs-number">2000</span>)
    }) <span class="hljs-comment">// 在new的过程中一定有一句fn.call(undefined, fulfilled, rejected)</span>
}</code></pre>
<p><strong>第四步</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 你要做什么，就用then输入到这个Promise实例里面去
let promiseInstance = setPromise()
promiseInstance.then((success) => {
    console.log(success) // 'success'
}, () => { 
    console.log('失败啦')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> 你要做什么，就用<span class="hljs-keyword">then</span>输入到这个Promise实例里面去
let promiseInstance = setPromise()
promiseInstance.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(success)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(success) <span class="hljs-regexp">//</span> <span class="hljs-string">'success'</span>
}, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'失败啦'</span>)
})</code></pre>
<p><strong>总结</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let setPromise = function () {
    return new Promise((resolve, reject) => {
        // 你的异步代码
        setTimeout(() => {
            resolve('success') // 给成功回调resolve传递一个参数 'success'
            console.log('测试一下') // 两秒之后被执行
        }, 2000)
    })
}
// 你要做什么，就用then输入到这个Promise实例里面去
let promiseInstance = setPromise()
promiseInstance.then((resolve) => {
    // 异步操作执行成功后执行
    console.log(resolve) // 'success'
    console.log('完美运行') // '完美运行'
}, () => {
    console.log('失败啦')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> setPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-comment">// 你的异步代码</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            resolve(<span class="hljs-string">'success'</span>) <span class="hljs-comment">// 给成功回调resolve传递一个参数 'success'</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'测试一下'</span>) <span class="hljs-comment">// 两秒之后被执行</span>
        }, <span class="hljs-number">2000</span>)
    })
}
<span class="hljs-comment">// 你要做什么，就用then输入到这个Promise实例里面去</span>
<span class="hljs-keyword">let</span> promiseInstance = setPromise()
promiseInstance.then(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-comment">// 异步操作执行成功后执行</span>
    <span class="hljs-built_in">console</span>.log(resolve) <span class="hljs-comment">// 'success'</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完美运行'</span>) <span class="hljs-comment">// '完美运行'</span>
}, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'失败啦'</span>)
})</code></pre>
<h2 id="articleHeader6">5.最后</h2>
<p>其实对于Promise和then有一个更具象化的理解<br>Promise的中文翻译是<code>承诺</code>，then的中文翻译是<code>然后</code><br>所以，<strong>你可以想象你去买橘子，结果店里没有进货，店员对你<code>Promise</code>，只要他店里到货，<code>then</code>他就会通知你</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析Promise

## 原文链接
[https://segmentfault.com/a/1190000014024922](https://segmentfault.com/a/1190000014024922)


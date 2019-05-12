---
title: '理解 JavaScript 的 async/await' 
date: 2019-01-31 2:31:16
hidden: true
slug: xxz347l8ci
categories: [reprint]
---

{{< raw >}}

                    
<p>随着 <a href="https://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node 7</a> 的发布，越来越多的人开始研究据说是异步编程终级解决方案的 async/await。我第一次看到这组关键字并不是在 JavaScript 语言里，而是在 c# 5.0 的语法中。C# 的 async/await 需要在 .NET Framework 4.5 以上的版本中使用，因此我还很悲伤了一阵——为了要兼容 XP 系统，我们开发的软件不能使用高于 4.0 版本的 .NET Framework。</p>
<p>我之前在<a href="https://segmentfault.com/a/1190000003742890">《闲谈异步调用“扁平”化》</a> 中就谈到了这个问题。无论是在 C# 还是 JavaScript 中，async/await 都是非常棒的特性，它们也都是非常甜的语法糖。C# 的 async/await 实现离不开 <a href="https://msdn.microsoft.com/library/dd321424.aspx" rel="nofollow noreferrer" target="_blank">Task 或 Task&lt;Result&gt;</a> 类，而 JavaScript 的 async/await 实现，也离不开 <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">Promise</a>。</p>
<p>现在抛开 C# 和 .NET Framework，专心研究下 JavaScript 的 async/await。</p>
<h2 id="articleHeader0">async 和 await 在干什么</h2>
<p>任意一个名称都是有意义的，先从字面意思来理解。async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。</p>
<p>另外还有一个很有意思的语法规定，await 只能出现在 async 函数中。然后细心的朋友会产生一个疑问，如果 await 只能出现在 async 函数中，那这个 async 函数应该怎么调用？</p>
<p>如果需要通过 await 来调用一个 async 函数，那这个调用的外面必须得再包一个 async 函数，然后……进入死循环，永无出头之日……</p>
<p>如果 async 函数不需要 await 来调用，那 async 到底起个啥作用？</p>
<h3 id="articleHeader1">async 起什么作用</h3>
<p>这个问题的关键在于，async 函数是怎么处理它的返回值的！</p>
<p>我们当然希望它能直接通过 <code>return</code> 语句返回我们想要的值，但是如果真是这样，似乎就没 await 什么事了。所以，写段代码来试试，看它到底会返回什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testAsync() {
    return &quot;hello async&quot;;
}

const result = testAsync();
console.log(result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"hello async"</span>;
}

<span class="hljs-keyword">const</span> result = testAsync();
<span class="hljs-built_in">console</span>.log(result);</code></pre>
<p>看到输出就恍然大悟了——输出的是一个 Promise 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="c:\var\test> node --harmony_async_await .
Promise { 'hello async' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">c:\var\<span class="hljs-built_in">test</span>&gt; node --harmony_async_await .
Promise { <span class="hljs-string">'hello async'</span> }</code></pre>
<p>所以，async 函数返回的是一个 Promise 对象。从<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow noreferrer" target="_blank">文档</a>中也可以得到这个信息。async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，如果在函数中 <code>return</code> 一个直接量，async 会把这个直接量通过 <code>Promise.resolve()</code> 封装成 Promise 对象。</p>
<p>async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，我们当然应该用原来的方式：<code>then()</code> 链来处理这个 Promise 对象，就像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="testAsync().then(v => {
    console.log(v);    // 输出 hello async
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">testAsync().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(v);    <span class="hljs-comment">// 输出 hello async</span>
});</code></pre>
<p>现在回过头来想下，如果 async 函数没有返回值，又该如何？很容易想到，它会返回 <code>Promise.resolve(undefined)</code>。</p>
<p>联想一下 Promise 的特点——无等待，所以在没有 <code>await</code> 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。</p>
<p>那么下一个关键点就在于 await 关键字了。</p>
<h3 id="articleHeader2">await 到底在等啥</h3>
<p>一般来说，都认为 await 是在等待一个 async 函数完成。不过按<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await" rel="nofollow noreferrer" target="_blank">语法说明</a>，await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。</p>
<p>因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSomething() {
    return &quot;something&quot;;
}

async function testAsync() {
    return Promise.resolve(&quot;hello async&quot;);
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSomething</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"something"</span>;
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"hello async"</span>);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> v1 = <span class="hljs-keyword">await</span> getSomething();
    <span class="hljs-keyword">const</span> v2 = <span class="hljs-keyword">await</span> testAsync();
    <span class="hljs-built_in">console</span>.log(v1, v2);
}

test();</code></pre>
<h3 id="articleHeader3">await 等到了要等的，然后呢</h3>
<p>await 等到了它要等的东西，一个 Promise 对象，或者其它值，然后呢？我不得不先说，<code>await</code> 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。</p>
<p>如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。</p>
<p>如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。</p>
<blockquote><p>看到上面的阻塞一词，心慌了吧……放心，这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。</p></blockquote>
<h2 id="articleHeader4">async/await 帮我们干了啥</h2>
<h3 id="articleHeader5">作个简单的比较</h3>
<p>上面已经说明了 async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。</p>
<p>现在举例，用 <code>setTimeout</code> 模拟耗时的异步操作，先来看看不用 async/await 会怎么写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve(&quot;long_time_value&quot;), 1000);
    });
}

takeLongTime().then(v => {
    console.log(&quot;got&quot;, v);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">takeLongTime</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">"long_time_value"</span>), <span class="hljs-number">1000</span>);
    });
}

takeLongTime().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"got"</span>, v);
});</code></pre>
<p>如果改用 async/await 呢，会是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve(&quot;long_time_value&quot;), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">takeLongTime</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">"long_time_value"</span>), <span class="hljs-number">1000</span>);
    });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> v = <span class="hljs-keyword">await</span> takeLongTime();
    <span class="hljs-built_in">console</span>.log(v);
}

test();</code></pre>
<p>眼尖的同学已经发现 <code>takeLongTime()</code> 没有申明为 <code>async</code>。实际上，<code>takeLongTime()</code> 本身就是返回的 Promise 对象，加不加 <code>async</code> 结果都一样，如果没明白，请回过头再去看看上面的“async 起什么作用”。</p>
<p>又一个疑问产生了，这两段代码，两种方式对异步调用的处理（实际就是对 Promise 对象的处理）差别并不明显，甚至使用 async/await 还需要多写一些代码，那它的优势到底在哪？</p>
<h3 id="articleHeader6">async/await 的优势在于处理 then 链</h3>
<p>单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。</p>
<p>假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 <code>setTimeout</code> 来模拟异步操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">takeLongTime</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(n + <span class="hljs-number">200</span>), n);
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step1</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step1 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step2</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step2 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step3</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step3 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}</code></pre>
<p>现在用 Promise 方式来实现这三个步骤的处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doIt() {
    console.time(&quot;doIt&quot;);
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd(&quot;doIt&quot;);
        });
}

doIt();

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doIt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">"doIt"</span>);
    <span class="hljs-keyword">const</span> time1 = <span class="hljs-number">300</span>;
    step1(time1)
        .then(<span class="hljs-function"><span class="hljs-params">time2</span> =&gt;</span> step2(time2))
        .then(<span class="hljs-function"><span class="hljs-params">time3</span> =&gt;</span> step3(time3))
        .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`result is <span class="hljs-subst">${result}</span>`</span>);
            <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"doIt"</span>);
        });
}

doIt();

<span class="hljs-comment">// c:\var\test&gt;node --harmony_async_await .</span>
<span class="hljs-comment">// step1 with 300</span>
<span class="hljs-comment">// step2 with 500</span>
<span class="hljs-comment">// step3 with 700</span>
<span class="hljs-comment">// result is 900</span>
<span class="hljs-comment">// doIt: 1507.251ms</span></code></pre>
<p>输出结果 <code>result</code> 是 <code>step3()</code> 的参数 <code>700 + 200</code> = <code>900</code>。<code>doIt()</code> 顺序执行了三个步骤，一共用了 <code>300 + 500 + 700 = 1500</code> 毫秒，和 <code>console.time()/console.timeEnd()</code> 计算的结果一致。</p>
<p>如果用 async/await 来实现呢，会是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function doIt() {
    console.time(&quot;doIt&quot;);
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd(&quot;doIt&quot;);
}

doIt();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doIt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">"doIt"</span>);
    <span class="hljs-keyword">const</span> time1 = <span class="hljs-number">300</span>;
    <span class="hljs-keyword">const</span> time2 = <span class="hljs-keyword">await</span> step1(time1);
    <span class="hljs-keyword">const</span> time3 = <span class="hljs-keyword">await</span> step2(time2);
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> step3(time3);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`result is <span class="hljs-subst">${result}</span>`</span>);
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"doIt"</span>);
}

doIt();</code></pre>
<p>结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样</p>
<h3 id="articleHeader7">还有更酷的</h3>
<p>现在把业务要求改一下，仍然是三个步骤，但每一个步骤都需要之前每个步骤的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step1</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step1 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step2</span>(<span class="hljs-params">m, n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step2 with <span class="hljs-subst">${m}</span> and <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(m + n);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step3</span>(<span class="hljs-params">k, m, n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step3 with <span class="hljs-subst">${k}</span>, <span class="hljs-subst">${m}</span> and <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(k + m + n);
}</code></pre>
<p>这回先用 async/await 来写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function doIt() {
    console.time(&quot;doIt&quot;);
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd(&quot;doIt&quot;);
}

doIt();

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 800 = 300 + 500
// step3 with 1800 = 300 + 500 + 1000
// result is 2000
// doIt: 2907.387ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doIt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">"doIt"</span>);
    <span class="hljs-keyword">const</span> time1 = <span class="hljs-number">300</span>;
    <span class="hljs-keyword">const</span> time2 = <span class="hljs-keyword">await</span> step1(time1);
    <span class="hljs-keyword">const</span> time3 = <span class="hljs-keyword">await</span> step2(time1, time2);
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> step3(time1, time2, time3);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`result is <span class="hljs-subst">${result}</span>`</span>);
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"doIt"</span>);
}

doIt();

<span class="hljs-comment">// c:\var\test&gt;node --harmony_async_await .</span>
<span class="hljs-comment">// step1 with 300</span>
<span class="hljs-comment">// step2 with 800 = 300 + 500</span>
<span class="hljs-comment">// step3 with 1800 = 300 + 500 + 1000</span>
<span class="hljs-comment">// result is 2000</span>
<span class="hljs-comment">// doIt: 2907.387ms</span></code></pre>
<p>除了觉得执行时间变长了之外，似乎和之前的示例没啥区别啊！别急，认真想想如果把它写成 Promise 方式实现会是什么样子？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doIt() {
    console.time(&quot;doIt&quot;);
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd(&quot;doIt&quot;);
        });
}

doIt();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doIt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">"doIt"</span>);
    <span class="hljs-keyword">const</span> time1 = <span class="hljs-number">300</span>;
    step1(time1)
        .then(<span class="hljs-function"><span class="hljs-params">time2</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> step2(time1, time2)
                .then(<span class="hljs-function"><span class="hljs-params">time3</span> =&gt;</span> [time1, time2, time3]);
        })
        .then(<span class="hljs-function"><span class="hljs-params">times</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> [time1, time2, time3] = times;
            <span class="hljs-keyword">return</span> step3(time1, time2, time3);
        })
        .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`result is <span class="hljs-subst">${result}</span>`</span>);
            <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"doIt"</span>);
        });
}

doIt();</code></pre>
<p>有没有感觉有点复杂的样子？那一堆参数处理，就是 Promise 方案的死穴—— 参数传递太麻烦了，看着就晕！</p>
<h2 id="articleHeader8">洗洗睡吧</h2>
<p>就目前来说，已经理解 async/await 了吧？但其实还有一些事情没提及——Promise 有可能 reject 啊，怎么处理呢？如果需要并行处理3个步骤，再等待所有结果，又该怎么处理呢？</p>
<p><a href="http://www.ruanyifeng.com/blog/2015/05/async.html" rel="nofollow noreferrer" target="_blank">阮一峰老师已经说过了</a>，我就懒得说了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解 JavaScript 的 async/await

## 原文链接
[https://segmentfault.com/a/1190000007535316](https://segmentfault.com/a/1190000007535316)


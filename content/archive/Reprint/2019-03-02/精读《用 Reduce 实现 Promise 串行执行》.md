---
title: '精读《用 Reduce 实现 Promise 串行执行》' 
date: 2019-03-02 2:30:07
hidden: true
slug: ft16mznsx5f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 引言</h2>
<p>本周精读的文章是 <a href="https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/" rel="nofollow noreferrer" target="_blank">why-using-reduce-to-sequentially-resolve-promises-works</a>，讲了如何利用 reduce 实现 Promise 串行执行。</p>
<p>在 async/await 以前 Promise 串行执行还是比较麻烦的，希望根据这篇文章可以理清楚串行 Promise 的思维脉络。</p>
<h2 id="articleHeader1">2 概述</h2>
<p>除了依赖 <a href="https://github.com/caolan/async" rel="nofollow noreferrer" target="_blank">async</a> <a href="https://github.com/sindresorhus/promise-fun" rel="nofollow noreferrer" target="_blank">promise-fun</a> 等工具库，最常用的队列操作就是 <code>Array.prototype.reduce()</code> 了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = [1, 2, 5].reduce((accumulator, item) => {
  return accumulator + item;
}, 0); // <-- Our initial value.

console.log(result); // 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> result = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>].reduce(<span class="hljs-function">(<span class="hljs-params">accumulator, item</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> accumulator + item;
}, <span class="hljs-number">0</span>); <span class="hljs-comment">// &lt;-- Our initial value.</span>

<span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// 8</span></code></pre>
<p>最后一个值 0 是起始值，每次 reduce 返回的值都会作为下次 reduce 回调函数的第一个参数，直到队列循环完毕，因此可以进行累加计算。</p>
<p>那么将 <code>reduce</code> 的特性用在 Promise 试试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function runPromiseByQueue(myPromises) {
  myPromises.reduce(
    (previousPromise, nextPromise) => previousPromise.then(() => nextPromise()),
    Promise.resolve()
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runPromiseByQueue</span>(<span class="hljs-params">myPromises</span>) </span>{
  myPromises.reduce(
    <span class="hljs-function">(<span class="hljs-params">previousPromise, nextPromise</span>) =&gt;</span> previousPromise.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> nextPromise()),
    <span class="hljs-built_in">Promise</span>.resolve()
  );
}</code></pre>
<p>当上一个 Promise 开始执行（<code>previousPromise.then</code>），当其执行完毕后再调用下一个 Promise，并作为一个新 Promise 返回，下次迭代就会继续这个循环。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createPromise = (time, id) => () =>
  new Promise(solve =>
    setTimeout(() => {
      console.log(&quot;promise&quot;, id);
      solve();
    }, time)
  );

runPromiseByQueue([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createPromise = <span class="hljs-function">(<span class="hljs-params">time, id</span>) =&gt;</span> () =&gt;
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">solve</span> =&gt;</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise"</span>, id);
      solve();
    }, time)
  );

runPromiseByQueue([
  createPromise(<span class="hljs-number">3000</span>, <span class="hljs-number">1</span>),
  createPromise(<span class="hljs-number">2000</span>, <span class="hljs-number">2</span>),
  createPromise(<span class="hljs-number">1000</span>, <span class="hljs-number">3</span>)
]);</code></pre>
<p>得到的输出是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise 1
promise 2
promise 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>promise <span class="hljs-number">1</span>
promise <span class="hljs-number">2</span>
promise <span class="hljs-number">3</span></code></pre>
<h2 id="articleHeader2">3 精读</h2>
<p><code>Reduce</code> 是同步执行的，在一个事件循环就会完成（更多请参考 <a href="https://github.com/dt-fe/weekly/blob/master/30.%E7%B2%BE%E8%AF%BB%E3%80%8AJavascript%20%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E4%B8%8E%E5%BC%82%E6%AD%A5%E3%80%8B.md" rel="nofollow noreferrer" target="_blank">精读《Javascript 事件循环与异步》</a>），但这仅仅是在内存快速构造了 Promise 执行队列，展开如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
  // Promise #1

  resolve();
})
  .then(result => {
    // Promise #2

    return result;
  })
  .then(result => {
    // Promise #3

    return result;
  }); // ... and so on!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-comment">// Promise #1</span>

  resolve();
})
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// Promise #2</span>

    <span class="hljs-keyword">return</span> result;
  })
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// Promise #3</span>

    <span class="hljs-keyword">return</span> result;
  }); <span class="hljs-comment">// ... and so on!</span></code></pre>
<p><code>Reduce</code> 的作用就是在内存中生成这个队列，而不需要把这个冗余的队列写在代码里！</p>
<h3 id="articleHeader3">更简单的方法</h3>
<p>感谢 <a href="https://github.com/eos3tion" rel="nofollow noreferrer" target="_blank">eos3tion</a> 同学补充，在 async/await 的支持下，<code>runPromiseByQueue</code> 函数可以更为简化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function runPromiseByQueue(myPromises) {
  for (let value of myPromises) {
    await value();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runPromiseByQueue</span>(<span class="hljs-params">myPromises</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> myPromises) {
    <span class="hljs-keyword">await</span> value();
  }
}</code></pre>
<p>多亏了 async/await，代码看起来如此简洁明了。</p>
<p>不过要注意，这个思路与 <code>reduce</code> 思路不同之处在于，利用 <code>reduce</code> 的函数整体是个同步函数，自己先执行完毕构造 Promise 队列，然后在内存异步执行；而利用 async/await 的函数是利用将自己改造为一个异步函数，等待每一个 Promise 执行完毕。</p>
<h3 id="articleHeader4">更多 Promise 拓展</h3>
<p><a href="https://github.com/atian25" rel="nofollow noreferrer" target="_blank">天猪</a> 同学分享的 <a href="https://github.com/sindresorhus/promise-fun" rel="nofollow noreferrer" target="_blank">promise-fun</a> 除了串行 Promise 解决方案，还提供了一系列 Promise 功能拓展（有一些逐渐被 ES 标准采纳，比如 <a href="https://github.com/tc39/proposal-promise-finally" rel="nofollow noreferrer" target="_blank">finally</a> 已经进入 Stage 4），如果你的项目还无法使用 async/await，是不需要自己重新写一遍的，当然本文的原理还是需要好好理解。</p>
<blockquote>Stage 相关可以进行拓展阅读 <a href="https://github.com/dt-fe/weekly/blob/master/15.%E7%B2%BE%E8%AF%BB%20TC39%20%E4%B8%8E%20ECMAScript%20%E6%8F%90%E6%A1%88.md" rel="nofollow noreferrer" target="_blank">精读《TC39 与 ECMAScript 提案》</a>。</blockquote>
<h2 id="articleHeader5">4 总结</h2>
<p>Promise 串行队列一般情况下用的不多，因为串行会阻塞，而用户交互往往是并行的。那么对于并行发请求，前端按串行顺序接收 Response 也是一个有意思的话题，留给大家思考。</p>
<h2 id="articleHeader6">5 更多讨论</h2>
<blockquote>讨论地址是：<a href="https://github.com/dt-fe/weekly/issues/109" rel="nofollow noreferrer" target="_blank">精读《用 Reduce 实现 Promise 串行执行》 · Issue #109 · dt-fe/weekly</a>
</blockquote>
<p><strong>如果你想参与讨论，请<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">点击这里</a>，每周都有新的主题，周末或周一发布。前端精读 - 帮你筛选靠谱的内容。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《用 Reduce 实现 Promise 串行执行》

## 原文链接
[https://segmentfault.com/a/1190000016832285](https://segmentfault.com/a/1190000016832285)


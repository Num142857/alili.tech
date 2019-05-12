---
title: '1 分钟读完《10 分钟学会 JavaScript 的 Async/Await》' 
date: 2018-12-27 2:30:12
hidden: true
slug: kz60duc5xtg
categories: [reprint]
---

{{< raw >}}

                    
<p>1 分钟读完 <a href="https://tutorialzine.com/2017/07/javascript-async-await-explained" rel="nofollow noreferrer" target="_blank">JavaScript Async/Await Explained in 10 Minutes</a></p>
<p><span class="img-wrap"><img data-src="/img/bVXJt5?w=1856&amp;h=957" src="https://static.alili.tech/img/bVXJt5?w=1856&amp;h=957" alt="10 分钟学会 JavaScript 的 Async/Await" title="10 分钟学会 JavaScript 的 Async/Await" style="cursor: pointer; display: inline;"></span></p>
<p>以前我们使用 callback。</p>
<p>后来我们使用 Promise。</p>
<p>现在我们使用 Async/Await。</p>
<h2 id="articleHeader0">1、什么是 Async/Await？</h2>
<p>Async - 定义异步函数(<code>async function someName(){...}</code>)</p>
<ul>
<li>自动把函数转换为 Promise</li>
<li>当调用异步函数时，函数返回值会被 resolve 处理</li>
<li>异步函数内部可以使用 <code>await</code>
</li>
</ul>
<p>Await - 暂停异步函数的执行 (<code>var result = await someAsyncCall();</code>)</p>
<ul>
<li>当使用在 Promise 前面时，<code>await</code> 等待 Promise 完成，并返回 Promise 的结果</li>
<li>
<code>await</code> <strong>只能</strong>和 Promise 一起使用，<strong>不能</strong>和 callback 一起使用</li>
<li>
<code>await</code> 只能用在 <code>async</code> 函数中</li>
</ul>
<h2 id="articleHeader1">2、Async/Await 是否会取代 Promise</h2>
<p>不会。</p>
<ul>
<li>Async/Await 底层依然使用了 Promise。</li>
<li>多个异步函数同时执行时，需要借助 <code>Promise.all</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getABC() {
  let A = await getValueA(); // getValueA 花费 2 秒
  let B = await getValueB(); // getValueA 花费 4 秒
  let C = await getValueC(); // getValueA 花费 3 秒

  return A*B*C;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getABC</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> A = <span class="hljs-keyword">await</span> getValueA(); <span class="hljs-comment">// getValueA 花费 2 秒</span>
  <span class="hljs-keyword">let</span> B = <span class="hljs-keyword">await</span> getValueB(); <span class="hljs-comment">// getValueA 花费 4 秒</span>
  <span class="hljs-keyword">let</span> C = <span class="hljs-keyword">await</span> getValueC(); <span class="hljs-comment">// getValueA 花费 3 秒</span>

  <span class="hljs-keyword">return</span> A*B*C;
}</code></pre>
<p>每次遇到 <code>await</code> 关键字时，Promise 都会停下在，一直到运行结束，所以总共花费是 2+4+3 = 9 秒。<strong><code>await</code> 把异步变成了同步</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getABC() {
  // Promise.all() 允许同时执行所有的异步函数
  let results = await Promise.all([ getValueA, getValueB, getValueC ]); 

  return results.reduce((total,value) => total * value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getABC</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// Promise.all() 允许同时执行所有的异步函数</span>
  <span class="hljs-keyword">let</span> results = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([ getValueA, getValueB, getValueC ]); 

  <span class="hljs-keyword">return</span> results.reduce(<span class="hljs-function">(<span class="hljs-params">total,value</span>) =&gt;</span> total * value);
}</code></pre>
<p>函数总耗时为 4 秒（<code>getValueB</code> 的耗时）。</p>
<h2 id="articleHeader2">3、Async/Await 的错误处理</h2>
<p>在 Async/Await 语法中，我们可以使用 try/catch 进行错误处理。在 Promise 中的 <code>.catch()</code> 分支会进入 <code>catch</code> 语句。</p>
<hr>
<blockquote>
<p>阅读原文：<a href="https://tutorialzine.com/2017/07/javascript-async-await-explained" rel="nofollow noreferrer" target="_blank">JavaScript Async/Await Explained in 10 Minutes</a></p>
<p>讨论地址：<a href="https://github.com/dev-reading/fe/issues/3" rel="nofollow noreferrer" target="_blank">10 分钟学会 JavaScript 的 Async/Await</a></p>
<p>如果你想参与讨论，请<a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">点击这里</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
1 分钟读完《10 分钟学会 JavaScript 的 Async/Await》

## 原文链接
[https://segmentfault.com/a/1190000011813934](https://segmentfault.com/a/1190000011813934)


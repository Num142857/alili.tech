---
title: '译文：JS事件循环机制（event loop）之宏任务、微任务' 
date: 2018-11-29 9:34:56
hidden: true
slug: s6twl73qqce
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">译文：JS事件循环机制（event loop）之宏任务、微任务</h1>
<h3 id="articleHeader1">原文标题：《Tasks, microtasks, queues and schedules》</h3>
<p><em>这是一篇谷歌大神文章，写得非常精彩。译者想借这次翻译深入学习一下，由于水平有限，英文好的同学建议直接阅读原文。</em><br><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly" rel="nofollow noreferrer" target="_blank">原文地址：Tasks, microtasks, queues and schedules</a><br>下面正文开始：</p>
<h4>Tasks, microtasks, queues and schedules</h4>
<p>首先看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'script start'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'setTimeout'</span>);
}, <span class="hljs-number">0</span>);

Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'promise1'</span>);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'promise2'</span>);
});

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'script end'</span>);</code></pre>
<p>打印顺序是什么？<br>正确答案是<br>script start, script end, promise1, promise2, setTimeout<br>但是在不同浏览器上的结果却是让人懵逼的。</p>
<p>Microsoft Edge, Firefox 40, iOS Safari 和 desktop Safari 8.0.8在promise1，promise2之前打印了setTimeout，--虽然看起来像竞态条件。<br>但让人懵逼的是Firefox 39 ， Safari 8.0.7会打印出正确顺序。<br><em>译者注：译者的Microsoft Edge 38.14393.2068.0，Firefox 59.0.2 版本会打印出正确顺序，应该已经支持了吧，其他浏览器未验证。</em></p>
<h3 id="articleHeader2">为什么会出现这样打印顺序呢？</h3>
<p>要理解这些你首先需要对事件循环机制处理宏任务和微任务的方式有了解。<br>如果是第一次接触信息量会有点大。深呼吸……</p>
<p>每个线程都会有它自己的event loop(事件循环)，所以都能独立运行。然而所有同源窗口会共享一个event loop以同步通信。event loop会一直运行，来执行进入队列的宏任务。一个event loop有多种的宏任务源（译者注：event等等），这些宏任务源保证了在本任务源内的顺序。但是浏览器每次都会选择一个源中的一个宏任务去执行。这保证了浏览器给与一些宏任务（如用户输入）以更高的优先级。好的，跟着我继续……</p>
<h4>宏任务（task）</h4>
<p>浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task-&gt;渲染-&gt;task-&gt;...）<br>鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTMl。还有下面这个例子，setTimeout</p>
<p>setTimeout的作用是等待给定的时间后为它的回调产生一个新的宏任务。这就是为什么打印‘setTimeout’在‘script end’之后。因为打印‘script end’是第一个宏任务里面的事情，而‘setTimeout’是另一个独立的任务里面打印的。</p>
<h4>微任务（Microtasks ）</h4>
<p>微任务通常来说就是需要在当前 task 执行结束后立即执行的任务，比如对一系列动作做出反馈，或或者是需要异步的执行任务而又不需要分配一个新的 task，这样便可以减小一点性能的开销。只要执行栈中没有其他的js代码正在执行且每个宏任务执行完，微任务队列会立即执行。如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行。微任务包括了mutation observe的回调还有接下来的例子promise的回调。</p>
<p>一旦一个pormise有了结果，或者早已有了结果（有了结果是指这个promise到了fulfilled或rejected状态），他就会为它的回调产生一个微任务，这就保证了回调异步的执行即使这个promise早已有了结果。所以对一个已经有了结果的promise调用.then(yey, nay)会立即产生一个微任务。这就是为什么‘promise1’,'promise2'会打印在‘script end’之后，因为所有微任务执行的时候，当前执行栈的代码必须已经执行完毕。‘promise1’,'promise2'会打印在‘setTimeout’之前是因为所有微任务总会在下一个宏任务之前全部执行完毕。</p>
<p>逐步执行demo:<em>译者注，这里作者实现了一个类似于debug，逐步执行的demo，其中还加入了执行栈的动画还有讲解，建议大家去原文观看</em><br><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly" rel="nofollow noreferrer" target="_blank">原文</a></p>
<p>是的，我弄了一个逐步的图标。你怎么度过你的周六？和你的朋友出去享受阳光？emmmm,如果对我惊艳的ui交互设计看不懂，点击左右箭头试试吧。</p>
<h3 id="articleHeader3">那为什么那些浏览器打印顺序不一样咧？</h3>
<p>有些浏览会会打印出：<br>script start, script end, setTimeout, promise1, promise2。<br>他们会在setTimeout之后执行promise的回调，就好像这些浏览器会把promise的回调视作一个新的宏任务而不是微任务。</p>
<p>其实无可厚非，因为promises 来自于ECMAScript 的标准而不是HTML标准。<br>ECMAScript 有个关于jobs的概念和微任务挺类似的，但是否明确具有关联关系却尚未定论<a href="https://esdiscuss.org/topic/the-initialization-steps-for-web-browsers#content-16" rel="nofollow noreferrer" target="_blank">（相关讨论）</a>。然而，普遍的观点是promise应该属于微任务。</p>
<p>如果说把 promise 当做一个新的 task 来执行的话，这将会造成一些性能上的问题，因为 promise 的回调函数可能会被延迟执行，因为在每一个 task 执行结束后浏览器可能会进行一些渲染工作。由于作为一个 task 将会和其他任务来源（task source）相互影响，这也会造成一些不确定性，同时这也将打破一些与其他 API 的交互，这样一来便会造成一系列的问题。</p>
<p>这里有一个关于让Edge把promise加入微任务的提议，其实WebKit 早已悄悄正确实现。所以我猜Safari最终会修复，Firefox 43好像已修复。</p>
<h3 id="articleHeader4">如何分辨宏任务和微任务？</h3>
<p>实际测试是一种方法，观察日志打印顺序与promise和setTimeout的关系，但是首先浏览器对这两者的实现要正确。<br>还有一个稳妥方法就是看文档，比如<a href="https://html.spec.whatwg.org/multipage/webappapis.html#timer-initialisation-steps" rel="nofollow noreferrer" target="_blank">setTimeout</a>是宏任务，<a href="https://dom.spec.whatwg.org/#queue-a-mutation-record" rel="nofollow noreferrer" target="_blank">mutation</a>是微任务。<br>正如上文提到的，ECMAScript 中把微任务叫做jobs，<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-performpromisethen" rel="nofollow noreferrer" target="_blank">EnqueueJob</a><br>是微任务。<br>接下来，让我们看一些复杂的例子吧</p>
<h3 id="articleHeader5">一级boss战</h3>
<p>写这篇文章前我就犯了这个错。来看代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;outer&quot;>
  <div class=&quot;inner&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"outer"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>在看接下来的js代码，如果我点击div.inner会打印什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
//监听element属性变化
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Let's get hold of those elements</span>
<span class="hljs-keyword">var</span> outer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.outer'</span>);
<span class="hljs-keyword">var</span> inner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);

<span class="hljs-comment">// Let's listen for attribute changes on the</span>
<span class="hljs-comment">// outer element</span>
<span class="hljs-comment">//监听element属性变化</span>
<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mutate'</span>);
}).observe(outer, {
  <span class="hljs-attr">attributes</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// Here's a click listener…</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>);

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>);
  }, <span class="hljs-number">0</span>);

  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise'</span>);
  });

  outer.setAttribute(<span class="hljs-string">'data-random'</span>, <span class="hljs-built_in">Math</span>.random());
}

<span class="hljs-comment">// …which we'll attach to both elements</span>
inner.addEventListener(<span class="hljs-string">'click'</span>, onClick);
outer.addEventListener(<span class="hljs-string">'click'</span>, onClick);</code></pre>
<p>偷看答案前先试一试啊，tips:日志可能出现多次哦。<br>结果如下：<br>click<br>promise<br>mutate<br>click<br>promise<br>mutate<br>timeout<br>timeout<br>你猜对了吗。你可能猜对了，但是许多浏览器却不这样觉得。<br><span class="img-wrap"><img data-src="/img/bVbaQYd?w=610&amp;h=340" src="https://static.alili.tech/img/bVbaQYd?w=610&amp;h=340" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><em>译者注：译者本机测试</em><br>Chrome( 64.0.3282.167（正式版本） （64 位）)相同，<br>Edge(Edge 38.14393.2068.0)不同（与Chrome顺序相同）<br>Firefox 32位 59.0.2</p>
<ul>
<li>click</li>
<li>mutate</li>
<li>click</li>
<li>mutate</li>
<li>promise</li>
<li>promise</li>
<li>timeout</li>
<li>timeout</li>
</ul>
<h3 id="articleHeader6">哪个是对的？</h3>
<p>分发click event是一个宏任务，Mutation observer和promise都会进入微任务队列，setTimeout回调是一个宏任务，所以来看demo<br><em>作者演示demo，建议原文观看</em><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly" rel="nofollow noreferrer" target="_blank">demo</a><br>所以chrome是对的，我之前也不知道只要执行栈中没有js代码在执行，微任务会在回调后立即执行，我之前认为它只会在宏任务结束后执行（Although we are mid-task,microtasks are processed after callbacks if the stack is empty）.这个规则来自于HTML标准中关于回调调用的部分</p>
<blockquote>If the stack of script settings objects is now empty, perform a microtask checkpoint<br>— HTML: Cleaning up after a callback step 3</blockquote>
<p>如果<a href="https://html.spec.whatwg.org/multipage/webappapis.html#stack-of-script-settings-objects" rel="nofollow noreferrer" target="_blank">js执行栈</a>空了,立即执行<a href="https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint" rel="nofollow noreferrer" target="_blank">microtask checkpoint </a><br>—— <a href="https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-a-callback" rel="nofollow noreferrer" target="_blank">HTML: Cleaning up after a callback</a><br>microtask checkpoint 会检查整个微任务队列，除非正在执行这个检查动作。ECMAScript 标准中说到</p>
<blockquote>Execution of a Job can be initiated only when there is no running execution context and the execution context stack is empty…<br>— ECMAScript: Jobs and Job Queues</blockquote>
<p>HTML环境下，必须执行。</p>
<h3 id="articleHeader7">浏览器哪里出错了？</h3>
<p>Firefox和Safari在click监听器回调之间正确执行了mutation 回调的微任务，但promise打印结果却出现在了错误的位置。<br>无可厚非的是jobs和微任务的关系太含糊不清，不过我仍认为应该在click监听器回调之间执行。<br>Edge我们早就知道会把promise回调放进错误的队列，但他也也没在click监听器回调之间执行微任务队列，而是在所有监听器回调后执行，这打印click之后只打印了一次muteta，为此我给它提了个bug。</p>
<h3 id="articleHeader8">一级boss愤怒的大哥来了</h3>
<p>用刚才的代码，如果我们这样执行会发生什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inner.click();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">inner.click()<span class="hljs-comment">;</span></code></pre>
<p>这依旧会开始分发事件，但这次是使用脚本而不是交互点击。<br>click<br>click<br>promise<br>mutate<br>promise<br>timeout<br>timeout<br><span class="img-wrap"><img data-src="/img/bVbaQYt?w=670&amp;h=320" src="https://static.alili.tech/img/bVbaQYt?w=670&amp;h=320" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我发誓我从chrome得到的答案一直不一样- -。我已经更新了这个表许许多次了。我觉得我是错误地测试了Canary。假如你在 Chrome 中得到了不同的结果，请在评论中告诉我是哪个版本。</p>
<h3 id="articleHeader9">为什么不一样呢？</h3>
<p><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly" rel="nofollow noreferrer" target="_blank">来看demo发生了什么,原作者的演示demo</a><br>所以正确的顺序是click, click, promise, mutate, promise, timeout, timeout,看来chrome是对的。<br>在每个监听器回调调用之后</p>
<blockquote>If the stack of script settings objects is now empty, perform a microtask checkpoint<br>— HTML: Cleaning up after a callback step 3</blockquote>
<p>之前的例子，微任务会在监听器回调之间执行。但这里的例子，click()会导致事件同步分发，所以在监听器回调之间Js执行栈不为空，而上述的这个规则保证了微任务不会打断正在执行的js.这意味着我们不能在监听器回调之间执行微任务，微任务会在监听器之后执行。</p>
<h3 id="articleHeader10">这能影响到什么？</h3>
<p><em>译者注：对IndexedDB 理解不深入，这段就不翻译了- -</em><br>Yeah, it'll bite you in obscure places (ouch). I encountered this while trying to create a simple wrapper library for IndexedDB that uses promises rather than weird IDBRequest objects. It almost makes IDB fun to use.</p>
<p>When IDB fires a success event, the related transaction object becomes inactive after dispatching (step 4). If I create a promise that resolves when this event fires, the callbacks should run before step 4 while the transaction is still active, but that doesn't happen in browsers other than Chrome, rendering the library kinda useless.</p>
<p>You can actually work around this problem in Firefox, because promise polyfills such as es6-promise use mutation observers for callbacks, which correctly use microtasks. Safari seems to suffer from race conditions with that fix, but that could just be their broken implementation of IDB. Unfortunately, things consistently fail in IE/Edge, as mutation events aren't handled after callbacks.</p>
<p>Hopefully we'll start to see some interoperability here soon.</p>
<h3 id="articleHeader11">干得不错！</h3>
<p>总结一下：</p>
<ul>
<li>宏任务按顺序执行，且浏览器在每个宏任务之间渲染页面</li>
<li>
<p>所有微任务也按顺序执行，且在以下场景会立即执行所有微任务</p>
<ul>
<li>每个回调之后且js执行栈中为空。</li>
<li>每个宏任务结束后。</li>
</ul>
</li>
</ul>
<p>希望你已经熟悉了eventloop.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
译文：JS事件循环机制（event loop）之宏任务、微任务

## 原文链接
[https://segmentfault.com/a/1190000014940904](https://segmentfault.com/a/1190000014940904)


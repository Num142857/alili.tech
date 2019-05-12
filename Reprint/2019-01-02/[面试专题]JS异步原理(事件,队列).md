---
title: '[面试专题]JS异步原理(事件,队列)' 
date: 2019-01-02 2:30:09
hidden: true
slug: 41gx5y1hb4q
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JS异步原理(事件,队列)</h1>
<hr>
<h3 id="articleHeader1">调用栈</h3>
<ul>
<li><p>JS执行时会形成调用栈,调用一个函数时,返回地址、参数、本地变量都会被推入栈中,如果当前正在运行的函数中调用另外一个函数,则该函数相关内容也会被推入栈顶.该函数执行完毕,则会被弹出调用栈.变量也随之弹出,由于复杂类型值存放于堆中,因此弹出的只是指针,他们的值依然在堆中,由GC决定回收.</p></li>
<li><p>尾调用:指某个函数的最后一步是调用另一个函数。由调用栈可知,调用栈中有a函数,如果a函数调用b函数,则b函数也随之入栈,此时栈中就会有两个函数.但是如果b函数是a函数最后一步,并且不需保留外层函数调用记录,即a函数调用位置变量等都不需要用到,则该调用栈中会只保留b函数,这就叫做"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function a() {
          let m = 1;
          let n = 2;
          return b(m + n);
        }
        a();
        
        // 等同于
        function a() {
          return b(3);
        }
        a();
        
        // 等同于
        b(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">let</span> m = <span class="hljs-number">1</span>;
          <span class="hljs-keyword">let</span> n = <span class="hljs-number">2</span>;
          <span class="hljs-keyword">return</span> b(m + n);
        }
        a();
        
        <span class="hljs-comment">// 等同于</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> b(<span class="hljs-number">3</span>);
        }
        a();
        
        <span class="hljs-comment">// 等同于</span>
        b(<span class="hljs-number">3</span>);</code></pre>
<h3 id="articleHeader2">事件循环(event loop)和任务队列(task queue)</h3>
<ul>
<li><p>JS的异步机制由事件循环和任务队列构成.JS本身是单线程语言,所谓异步依赖于浏览器或者操作系统等完成. JavaScript 主线程拥有一个执行栈以及一个任务队列，主线程会依次执行代码，当遇到函数时，会先将函数入栈，函数运行完毕后再将该函数出栈，直到所有代码执行完毕。</p></li>
<li><p>遇到异步操作（例如：setTimeout, AJAX）时，异步操作会由浏览器(OS)执行，浏览器会在这些任务完成后，将事先定义的回调函数推入主线程的任务队列(task queue)中,当主线程的执行栈清空之后会读取task queue中的回调函数,当task queue被读取完毕之后,主线程接着执行,从而进入一个无限的循环,这就是事件循环.</p></li>
</ul>
<blockquote><p>However, we only have one main thread and one call-stack, so in case there is another request being served when the said file is read, its callback will need to wait for the stack to become empty. The limbo where callbacks are waiting for their turn to be executed is called the task queue (or event queue, or message queue). Callbacks are being called in an infinite loop whenever the main thread has finished its previous task, hence the name 'event loop'.</p></blockquote>
<h3 id="articleHeader3">Microtask 与 Macrotask</h3>
<ul>
<li><p>一个浏览器环境（unit of related similar-origin browsing contexts.）只能有一个事件循环（Event loop），而一个事件循环可以多个任务队列（Task queue），每个任务都有一个任务源（Task source）。例如,客户端可能实现了一个包含鼠标键盘事件的任务队列，还有其他的任务队列，而给鼠标键盘事件的任务队列更高优先级，例如75%的可能性执行它。这样就能保证流畅的交互性，而且别的任务也能执行到了。但是，同一个任务队列中的任务必须按先进先出的顺序执行。多个任务队列，是为了方便控制优先级。任务队列是一个先进先出的队列.</p></li>
<li><p>macrotask 和 microtask 是异步任务的两种分类。在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，首先在 macrotask 的队列（这个队列也被叫做 task queue）中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完。</p></li>
<li><p>全部代码(script)是一个macrotask,js先执行一个macrotask,执行过程中遇到(setTimeout, setInterval, setImmediate等)异步操作则创建一个macrotask,遇到(process.nextTick, Promises等)创建一个microtask,这两个queue分别被挂起.执行栈为空时开始处理macrotask,完成后处理microtask,直到该microtask全部执行完,然后继续主线程调用栈.</p></li>
</ul>
<p>注:每一次事件循环（one cycle of the event loop），只处理一个 (macro)task。待该 macrotask 完成后，所有的 microtask 会在同一次循环中处理。处理这些 microtask 时，还可以将更多的 microtask 入队，它们会一一执行，直到整个 microtask 队列处理完。<br><span class="img-wrap"><img data-src="/img/remote/1460000010913954" src="https://static.alili.tech/img/remote/1460000010913954" alt="异步示意图" title="异步示意图" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>两个类别的具体分类如下：</p></blockquote>
<p>macro-task: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering<br>micro-task: process.nextTick, Promises（这里指浏览器实现的原生 Promise）, Object.observe, MutationObserver</p>
<p>参考文章:<br><a href="https://www.zhihu.com/question/36972010" rel="nofollow noreferrer" target="_blank">Promise的队列与setTimeout的队列有何关联？</a><br><a href="http://www.zcfy.cc/article/node-js-at-scale-understanding-the-node-js-event-loop-risingstack-1652.html" rel="nofollow noreferrer" target="_blank">node事件循环</a><br><a href="https://zhuanlan.zhihu.com/p/26238030?utm_source=weibo&amp;utm_medium=social" rel="nofollow noreferrer" target="_blank">深入浅出JavaScript事件循环机制(下)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[面试专题]JS异步原理(事件,队列)

## 原文链接
[https://segmentfault.com/a/1190000010913949](https://segmentfault.com/a/1190000010913949)


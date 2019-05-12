---
title: 'js事件循环机制' 
date: 2018-12-22 2:30:11
hidden: true
slug: i84ddqbyz2f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">从一个例子说起</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var start = new Date()

setTimeout(function () {
    var end = new Date
    console.log('Time elapsed:', end - start, 'ms')
}, 500)

while (new Date() - start < 1000) {
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>var <span class="hljs-keyword">start</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()

setTimeout(<span class="hljs-keyword">function</span> () {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">end</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>
    console.log(<span class="hljs-string">'Time elapsed:'</span>, <span class="hljs-keyword">end</span> - <span class="hljs-keyword">start</span>, <span class="hljs-string">'ms'</span>)
}, <span class="hljs-number">500</span>)

<span class="hljs-keyword">while</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - <span class="hljs-keyword">start</span> &lt; <span class="hljs-number">1000</span>) {
}
</code></pre>
<p>有其他语言能完成预期的功能吗？Java, 在Java.util.Timer中，对于定时任务的解决方案是通过多线程手段实现的，任务对象存储在任务队列，由专门的调度线程，在新的子线程中完成任务的执行</p>
<h3 id="articleHeader1">js是单线程的</h3>
<p>JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。</p>
<p>为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。</p>
<h2 id="articleHeader2">函数调用栈和任务队列</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012399891?w=536&amp;h=420" src="https://static.alili.tech/img/remote/1460000012399891?w=536&amp;h=420" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">调用栈</h3>
<p>JS执行时会形成调用栈,调用一个函数时,返回地址、参数、本地变量都会被推入栈中,如果当前正在运行的函数中调用另外一个函数,则该函数相关内容也会被推入栈顶.该函数执行完毕,则会被弹出调用栈.变量也随之弹出,由于复杂类型值存放于堆中,因此弹出的只是指针,他们的值依然在堆中,由GC决定回收.</p>
<h3 id="articleHeader4">事件循环（event loop） &amp; 任务队列（task queue）</h3>
<p>JavaScript 主线程拥有一个执行栈以及一个任务队列</p>
<p>遇到异步操作（例如：setTimeout, AJAX）时，异步操作会由浏览器(OS)执行，浏览器会在这些任务完成后，将事先定义的回调函数推入主线程的任务队列(task queue)中,当主线程的执行栈清空之后会读取task queue中的回调函数,当task queue被读取完毕之后,主线程接着执行,从而进入一个无限的循环,这就是事件循环.</p>
<p>主线程执行栈 &amp; 任务队列 循环执行，构成事件循环</p>
<h3 id="articleHeader5">结论</h3>
<p>setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。</p>
<h2 id="articleHeader6">另一个例子</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function test() {
    setTimeout(function() {console.log(4)}, 0);
    new Promise(function executor(resolve) {
        console.log(1);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 &amp;&amp; resolve();
        }
        console.log(2);
    }).then(function() {
        console.log(5);
    });
    console.log(3);
})()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span> test() {
    setTimeout(<span class="hljs-name">function</span>() {console.log(<span class="hljs-name">4</span>)}, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
    new Promise(<span class="hljs-name">function</span> executor(<span class="hljs-name">resolve</span>) {
        console.log(<span class="hljs-name">1</span>)<span class="hljs-comment">;</span>
        for( var i=0 <span class="hljs-comment">; i&lt;10000 ; i++ ) {</span>
            i == <span class="hljs-number">9999</span> &amp;&amp; resolve()<span class="hljs-comment">;</span>
        }
        console.log(<span class="hljs-name">2</span>)<span class="hljs-comment">;</span>
    }).then(<span class="hljs-name">function</span>() {
        console.log(<span class="hljs-name">5</span>)<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">3</span>)<span class="hljs-comment">;</span>
})()
</code></pre>
<h3 id="articleHeader7">Macrotask &amp; Microtask</h3>
<p>macrotask 和 microtask 是异步任务的两种分类。在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，首先在 macrotask 的队列（这个队列也被叫做 task queue）中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完。</p>
<ul>
<li>macro-task: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering</li>
<li>micro-task: process.nextTick, Promises（这里指浏览器实现的原生 Promise）, Object.observe, MutationObserver</li>
</ul>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/remote/1460000010913954" src="https://static.alili.techhttps://segmentfault.com/img/remote/1460000010913954" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">结论</h3>
<p>全部代码(script) macrotask -&gt; microtask queue (含有promise.then) -&gt; macrotask(setTimeout) -&gt; 下一个microtask</p>
<h2 id="articleHeader9">Node.js的事件循环</h2>
<h3 id="articleHeader10">process.nextTick &amp; setImmediate</h3>
<ul>
<li>process.nextTick指定的任务总是发生在所有异步任务之前</li>
<li>setImmediate指定的任务总是在下一次Event Loop时执行</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);});
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'TIMEOUT FIRED'</span>);
}, <span class="hljs-number">0</span>)
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})
process.nextTick(function() {
    console.log('glob1_nextTick');
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'glob1_promise'</span>);
    resolve();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'glob1_then'</span>)
})
process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'glob1_nextTick'</span>);
})
</code></pre>
<h2 id="articleHeader11">总结</h2>
<p>通过学习<code>函数调用栈，任务队列，MacroTask, MicroTask</code>等概念，对js中的事件循环机制有更深的理解，在以后面对<code>setTimeout, setInterval</code>等异步操作时，更清晰的理解其运行机制，避免写出不可控的代码。</p>
<h2 id="articleHeader12">参考链接：</h2>
<p><a href="https://zhuanlan.zhihu.com/p/26229293" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/26238030?utm_source=weibo&amp;utm_medium=social" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p>
<p><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js事件循环机制

## 原文链接
[https://segmentfault.com/a/1190000012399886](https://segmentfault.com/a/1190000012399886)


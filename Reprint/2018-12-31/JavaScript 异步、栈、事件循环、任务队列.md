---
title: 'JavaScript 异步、栈、事件循环、任务队列' 
date: 2018-12-31 2:30:30
hidden: true
slug: 05l1jzfr0ne8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">概览</h2>
<p><span class="img-wrap"><img data-src="/img/bVU9kG?w=922&amp;h=706" src="https://static.alili.tech/img/bVU9kG?w=922&amp;h=706" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>我们经常会听到引擎和runtime，它们的区别是什么呢？</p>
<ul>
<li>引擎：解释并编译代码，让它变成能交给机器运行的代码（runnable commands）。</li>
<li>runtime：就是运行环境，它提供一些对外接口供Js调用，以跟外界打交道，比如，浏览器环境、Node.js环境。不同的runtime，会提供不同的接口，比如，在 Node.js 环境中，我们可以通过 <code>require</code> 来引入模块；而在浏览器中，我们有 <code>window</code>、 DOM。</li>
</ul>
<p>Js引擎是单线程的，如上图中，它负责维护任务队列，并通过 Event Loop 的机制，按顺序把任务放入栈中执行。而图中的异步处理模块，就是 runtime 提供的，拥有和Js引擎互不干扰的线程。接下来，我们会细说图中的：栈和任务队列。</p>
<h2 id="articleHeader1">栈</h2>
<p>现在，我们要运行下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bar() {
    console.log(1);
}

function foo() {
    console.log(2);
    far();
}

setTimeout(() => {
    console.log(3)
});

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    far();
}

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
});

foo();</code></pre>
<p>它在栈中的入栈、出栈过程，如下图：<br><span class="img-wrap"><img data-src="/img/bVU9kK?w=1181&amp;h=993" src="https://static.alili.tech/img/bVU9kK?w=1181&amp;h=993" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">任务队列</h2>
<p>Js 中，有两类任务队列：宏任务队列（macro tasks）和微任务队列（micro tasks）。宏任务队列可以有多个，微任务队列只有一个。那么什么任务，会分到哪个队列呢？</p>
<ul>
<li>宏任务：script（全局任务）, setTimeout, setInterval, setImmediate, I/O, UI rendering.</li>
<li>微任务：process.nextTick, Promise, Object.observer, MutationObserver.</li>
</ul>
<h3 id="articleHeader3">浏览器的 Event Loop</h3>
<p><strong>浏览器的 Event Loop 遵循的是 HTML5 标准，而 NodeJs 的 Event Loop 遵循的是 libuv。</strong> 区别较大，分开讲。</p>
<p>我们上面讲到，当stack空的时候，就会从任务队列中，取任务来执行。浏览器这边，共分3步：</p>
<ol>
<li>取一个宏任务来执行。执行完毕后，下一步。</li>
<li>取一个微任务来执行，执行完毕后，再取一个微任务来执行。直到微任务队列为空，执行下一步。</li>
<li>更新UI渲染。</li>
</ol>
<p>Event Loop 会无限循环执行上面3步，这就是Event Loop的主要控制逻辑。其中，第3步（更新UI渲染）会根据浏览器的逻辑，决定要不要马上执行更新。毕竟更新UI成本大，所以，一般都会比较长的时间间隔，执行一次更新。</p>
<p>从执行步骤来看，我们发现微任务，受到了特殊待遇！我们代码开始执行都是从script（全局任务）开始，所以，一旦我们的全局任务（属于宏任务）执行完，就马上执行完整个微任务队列。看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('script start');

// 微任务
Promise.resolve().then(() => {
    console.log('p 1');
});

// 宏任务
setTimeout(() => {
    console.log('setTimeout');
}, 0);

var s = new Date();
while(new Date() - s < 50); // 阻塞50ms

// 微任务
Promise.resolve().then(() => {
    console.log('p 2');
});

console.log('script ent');


/*** output ***/

// one macro task
script start
script ent

// all micro tasks
p 1
p 2

// one macro task again
setTimeout
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>);

<span class="hljs-comment">// 微任务</span>
<span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p 1'</span>);
});

<span class="hljs-comment">// 宏任务</span>
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>);
}, <span class="hljs-number">0</span>);

<span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">while</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - s &lt; <span class="hljs-number">50</span>); <span class="hljs-comment">// 阻塞50ms</span>

<span class="hljs-comment">// 微任务</span>
<span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p 2'</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script ent'</span>);


<span class="hljs-comment">/*** output ***/</span>

<span class="hljs-comment">// one macro task</span>
script start
script ent

<span class="hljs-comment">// all micro tasks</span>
p <span class="hljs-number">1</span>
p <span class="hljs-number">2</span>

<span class="hljs-comment">// one macro task again</span>
setTimeout
</code></pre>
<p>上面之所以加50ms的阻塞，是因为 <code>setTimeout</code> 的 delayTime 最少是 4ms. 为了避免认为 <code>setTimeout</code> 是因为4ms的延迟而后面才被执行的，我们加了50ms阻塞。</p>
<h3 id="articleHeader4">NodeJs 的 Event Loop</h3>
<p>NodeJs 的运行是这样的：</p>
<ul>
<li>初始化 Event Loop</li>
<li>执行您的主代码。这里同样，遇到异步处理，就会分配给对应的队列。直到主代码执行完毕。</li>
<li>执行主代码中出现的所有微任务：<strong>先执行完所有nextTick()，然后在执行其它所有微任务。</strong>
</li>
<li>开始 Event Loop</li>
</ul>
<p>NodeJs 的 Event Loop 分6个阶段执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>   ┌───────────────────────────┐
┌─&gt;│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │&lt;─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │          <span class="hljs-built_in"> check </span>          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘</code></pre>
<p>以上的6个阶段，具体处理的任务如下：</p>
<ul>
<li>timers: 这个阶段执行<code>setTimeout()</code>和<code>setInterval()</code>设定的回调。</li>
<li>pending callbacks: 上一轮循环中有少数的 I/O callback 会被延迟到这一轮的这一阶段执行。</li>
<li>idle, prepare: 仅内部使用。</li>
<li>poll: 执行 I/O callback，在适当的条件下会阻塞在这个阶段</li>
<li>check: 执行<code>setImmediate()</code>设定的回调。</li>
<li>close callbacks: 执行比如<code>socket.on('close', ...)</code>的回调。</li>
</ul>
<p><strong>每个阶段执行完毕后，都会执行所有微任务（先 nextTick，后其它），然后再进入下一个阶段。</strong></p>
<h2 id="articleHeader5">Links</h2>
<ul>
<li><a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loop" rel="nofollow noreferrer" target="_blank">Event loops</a></li>
<li><a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/" rel="nofollow noreferrer" target="_blank">NodeJs 的 Event Loop 官方文档</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop" rel="nofollow noreferrer" target="_blank">并发模型与事件循环</a></li>
<li><a href="https://vimeo.com/96425312" rel="nofollow noreferrer" target="_blank">Philip Roberts: Help, I’m stuck in an event-loop.</a></li>
<li><a href="https://www.zhihu.com/question/36972010" rel="nofollow noreferrer" target="_blank">Promise的队列与setTimeout的队列有何关联？</a></li>
<li><a href="https://segmentfault.com/a/1190000004322358">JavaScript：彻底理解同步、异步和事件循环(Event Loop)</a></li>
<li><a href="https://github.com/aooy/blog/issues/5" rel="nofollow noreferrer" target="_blank">从event loop规范探究javaScript异步及浏览器更新渲染时机</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop - 阮一峰的网络日志</a></li>
<li><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout" rel="nofollow noreferrer" target="_blank">WindowOrWorkerGlobalScope.setTimeout()</a></li>
<li><a href="https://stackoverflow.com/questions/29027845/what-is-the-difference-between-javascript-engine-and-javascript-runtime-environm" rel="nofollow noreferrer" target="_blank">What is the difference between JavaScript Engine and JavaScript Runtime Environment</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 异步、栈、事件循环、任务队列

## 原文链接
[https://segmentfault.com/a/1190000011198232](https://segmentfault.com/a/1190000011198232)


---
title: '【Node.js】理解事件循环机制' 
date: 2018-12-23 2:30:07
hidden: true
slug: fff516k4tzt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前沿</h2>
<blockquote><p>Node.js 是基于V8引擎的javascript运行环境. Node.js具有<code>事件驱动</code>, <code>非阻塞I/O</code>等特点. 结合Node API, Node.js 具有网络编程, 文件系统等服务端的功能, Node.js用<code>libuv</code>库进行异步事件处理.</p></blockquote>
<h2 id="articleHeader1">线程</h2>
<blockquote><p>Node.js的单线程含义, 实际上说的是执行同步代码的主线程. 一个Node程序的启动, 不止是分配了一个线程，而是我们只能在一个线程执行代码. 当出现I/O资源调用, TCP连接等外部资源申请的时候, 不会阻塞主线程, 而是委托给I/O线程进行处理,并且进入等待队列. 一旦主线程执行完成，将会消费事件队列(Event Queue). 因为只有一个主线程, 只占用CPU内核处理逻辑计算, 因此不适合在CPU密集型进行使用.</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVZBap?w=800&amp;h=316" src="https://static.alili.tech/img/bVZBap?w=800&amp;h=316" alt="Node核心" title="Node核心" style="cursor: pointer; display: inline;"></span></p>
<p><strong>注意，上图的<code>EVENT_QUEUE</code> 给人看起来是只有一个队列, 根据Node.js官方介绍, <code>EventLoop</code>有6个阶段, 同时每个阶段都有对应的一个先进先出的回调队列. </strong></p>
<h2 id="articleHeader2">什么是事件循环(EventLoop) ?</h2>
<blockquote><p>In computer science, the event loop, message dispatcher, message loop, message pump, or run loop is a programming construct that waits for and dispatches events or messages in a program. -- <a href="https://en.wikipedia.org/wiki/Event_loop" rel="nofollow noreferrer" target="_blank">from wiki</a></p></blockquote>
<p><strong>大概含义: EventLoop 是一种常用的机制，通过对内部或外部的事件提供者发出请求, 如文件读写, 网络连接 等异步操作, 完成后调用事件处理程序. 整个过程都是异步阶段</strong></p>
<h2 id="articleHeader3">Node.js的事件循环机制</h2>
<blockquote><p>When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the REPL, which is not covered in this document) which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop. -- from <a href="https://github.com/nodejs/node/blob/v6.x/doc/topics/event-loop-timers-and-nexttick.md" rel="nofollow noreferrer" target="_blank">node.js doc</a></p></blockquote>
<p><strong>大致含义: 当Node.js 启动, 就会初始化一个 event loop, 处理脚本时, 可能会发生异步API行为调用, 使用定时器任务或者nexTick, 处理完成后进入事件循环处理过程</strong></p>
<h3 id="articleHeader4">事件循环阶段</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>   ┌───────────────────────┐
┌─&gt;│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │&lt;─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │       <span class="hljs-built_in"> check </span>         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘</code></pre>
<p><strong>每一个阶段都有一个FIFO的callbacks队列, 每个阶段都有自己的事件处理方式. 当事件循环进入某个阶段时, 将会在该阶段内执行回调，直到队列耗尽或者回调的最大数量已执行, 那么将进入下一个处理阶段. </strong></p>
<ul>
<li>
<strong>timers</strong> 阶段: 这个阶段执行setTimeout(callback) and setInterval(callback)预定的callback;</li>
<li>
<strong>I/O callbacks</strong> 阶段: 执行除了close事件的callbacks、被timers(定时器，setTimeout、setInterval等)设定的callbacks、setImmediate()设定的callbacks之外的callbacks; (目前这个阶段)</li>
<li>
<strong>idle, prepare</strong> 阶段: 仅node内部使用;</li>
<li>
<strong>poll</strong> 阶段: 获取新的I/O事件, 适当的条件下node将阻塞在这里;</li>
<li>
<strong>check</strong> 阶段: 执行setImmediate() 设定的callbacks;</li>
<li>
<strong>close callbacks</strong> 阶段: 比如socket.on(‘close’, callback)的callback会在这个阶段执行.</li>
</ul>
<p>下面是摘抄<a href="https://github.com/creeperyang/blog/issues/26" rel="nofollow noreferrer" target="_blank">creeperyang</a> 对上面6个阶段的 (<a href="https://github.com/nodejs/node/blob/v6.x/doc/topics/event-loop-timers-and-nexttick.md" rel="nofollow noreferrer" target="_blank">原文翻译</a>)</p>
<h4><strong>timers阶段</strong></h4>
<p>一个timer指定一个下限时间而不是准确时间，在达到这个下限时间后执行回调。在指定时间过后，timers会尽可能早地执行回调，但系统调度或者其它回调的执行可能会延迟它们。</p>
<p>注意：技术上来说，poll 阶段控制 timers 什么时候执行。</p>
<p>注意：这个下限时间有个范围：[1, 2147483647]，如果设定的时间不在这个范围，将被设置为1。</p>
<h4><strong>I/O callbacks阶段</strong></h4>
<p>这个阶段执行一些系统操作的回调。比如TCP错误，如一个TCP socket在想要连接时收到ECONNREFUSED,<br>类unix系统会等待以报告错误，这就会放到 I/O callbacks 阶段的队列执行.<br>名字会让人误解为执行I/O回调处理程序, 实际上I/O回调会由poll阶段处理.</p>
<h4><strong>poll阶段</strong></h4>
<p>poll 阶段有两个主要功能：</p>
<p>执行下限时间已经达到的timers的回调，然后<br>处理 poll 队列里的事件。<br>当event loop进入 poll 阶段，并且 没有设定的timers（there are no timers scheduled），会发生下面两件事之一：</p>
<p>如果 poll 队列不空，event loop会遍历队列并同步执行回调，直到队列清空或执行的回调数到达系统上限；</p>
<p>如果 poll 队列为空，则发生以下两件事之一：</p>
<ol>
<li>如果代码已经被setImmediate()设定了回调, event loop将结束 poll 阶段进入 check 阶段来执行 check 队列（里的回调）。</li>
<li>如果代码没有被setImmediate()设定回调，event loop将阻塞在该阶段等待回调被加入 poll 队列，并立即执行。</li>
</ol>
<p>但是，当event loop进入 poll 阶段，并且 有设定的timers，一旦 poll 队列为空（poll 阶段空闲状态）：</p>
<ol><li>event loop将检查timers,如果有1个或多个timers的下限时间已经到达，event loop将绕回 <strong>timers</strong> 阶段，并执行 <strong>timer</strong> 队列。</li></ol>
<h3 id="articleHeader5"><strong>check阶段</strong></h3>
<p>这个阶段允许在 poll 阶段结束后立即执行回调。如果 poll 阶段空闲，并且有被setImmediate()设定的回调，event loop会转到 check 阶段而不是继续等待。</p>
<p>setImmediate()实际上是一个特殊的timer，跑在event loop中一个独立的阶段。它使用libuv的API<br>来设定在 poll 阶段结束后立即执行回调。</p>
<p>通常上来讲，随着代码执行，event loop终将进入 poll 阶段，在这个阶段等待 incoming connection, request 等等。但是，只要有被setImmediate()设定了回调，一旦 poll 阶段空闲，那么程序将结束 poll 阶段并进入 check 阶段，而不是继续等待 poll 事件们 （poll events）。</p>
<h3 id="articleHeader6"><strong>close callbacks 阶段</strong></h3>
<p>如果一个 socket 或 handle 被突然关掉（比如 socket.destroy()），close事件将在这个阶段被触发，否则将通过process.nextTick()触发</p>
<p><strong>简单的 EventLoop</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
let counts = 0;

function wait (mstime) {
  let date = Date.now();
  while (Date.now() - date < mstime) {
    // do nothing
  }
}

function asyncOperation (callback) {
  fs.readFile(__dirname + '/' + __filename, callback);
}

const lastTime = Date.now();

setTimeout(() => {
  console.log('timers', Date.now() - lastTime + 'ms');
}, 0);

process.nextTick(() => {
  // 进入event loop
  // timers阶段之前执行
  wait(20);
  asyncOperation(() => {
    console.log('poll');
  });  
});

/**
 * result:
 * timers 21ms
 * poll
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> counts = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wait</span> (<span class="hljs-params">mstime</span>) </span>{
  <span class="hljs-keyword">let</span> date = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">Date</span>.now() - date &lt; mstime) {
    <span class="hljs-comment">// do nothing</span>
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncOperation</span> (<span class="hljs-params">callback</span>) </span>{
  fs.readFile(__dirname + <span class="hljs-string">'/'</span> + __filename, callback);
}

<span class="hljs-keyword">const</span> lastTime = <span class="hljs-built_in">Date</span>.now();

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timers'</span>, <span class="hljs-built_in">Date</span>.now() - lastTime + <span class="hljs-string">'ms'</span>);
}, <span class="hljs-number">0</span>);

process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 进入event loop</span>
  <span class="hljs-comment">// timers阶段之前执行</span>
  wait(<span class="hljs-number">20</span>);
  asyncOperation(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'poll'</span>);
  });  
});

<span class="hljs-comment">/**
 * result:
 * timers 21ms
 * poll
 */</span></code></pre>
<p>为了让<code>setTimeout</code>优先于<code>fs.readFile</code> 回调, 执行了process.nextTick, 表示在进入 timers阶段前, 等待20ms后执行文件读取.</p>
<h3 id="articleHeader7">nextTick 与 setImmediate</h3>
<p>process.nextTick 不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调。有给人一种插队的感觉. </p>
<p>setImmediate的回调处于check阶段, 当poll阶段的队列为空, 且check阶段的事件队列存在的时候，切换到check阶段执行. </p>
<p><strong>nextTick 递归的危害</strong> <br>由于nextTick具有插队的机制，nextTick的递归会让事件循环机制无法进入下一个阶段. 导致I/O处理完成或者定时任务超时后仍然无法执行, 导致了其它事件处理程序处于饥饿状态. 为了防止递归产生的问题, Node.js 提供了一个 process.maxTickDepth (默认 1000)。 </p>
<p>递归nextTick</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
let counts = 0;

function wait (mstime) {
  let date = Date.now();
  while (Date.now() - date < mstime) {
    // do nothing
  }
}

function nextTick () {
  process.nextTick(() => {
    wait(20);
    nextTick();
  });
}

const lastTime = Date.now();

setTimeout(() => {
  console.log('timers', Date.now() - lastTime + 'ms');
}, 0);

nextTick();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> counts = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wait</span> (<span class="hljs-params">mstime</span>) </span>{
  <span class="hljs-keyword">let</span> date = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">Date</span>.now() - date &lt; mstime) {
    <span class="hljs-comment">// do nothing</span>
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextTick</span> (<span class="hljs-params"></span>) </span>{
  process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    wait(<span class="hljs-number">20</span>);
    nextTick();
  });
}

<span class="hljs-keyword">const</span> lastTime = <span class="hljs-built_in">Date</span>.now();

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timers'</span>, <span class="hljs-built_in">Date</span>.now() - lastTime + <span class="hljs-string">'ms'</span>);
}, <span class="hljs-number">0</span>);

nextTick();</code></pre>
<p>此时永远无法跳到timer阶段, 因为在进入timers阶段前有不断的nextTick插入执行. 除非执行了1000次到了执行上限.</p>
<p><strong>setImmediate</strong><br>如果在一个I/O周期内进行调度，setImmediate（）将始终在任何定时器之前执行.</p>
<h3 id="articleHeader8">setTimeout 与 setImmediate</h3>
<ul>
<li>setImmediate()被设计在 poll 阶段结束后立即执行回调；</li>
<li>setTimeout()被设计在指定下限时间到达后执行回调;</li>
</ul>
<p>无 I/O 处理情况下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function timeout () {
  console.log('timeout');
},0);

setImmediate(function immediate () {
  console.log('immediate');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>);
},<span class="hljs-number">0</span>);

setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">immediate</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'immediate'</span>);
});</code></pre>
<p><strong>输出结果是 不确定 的！</strong><br>setTimeout(fn, 0) 具有几毫秒的不确定性. 无法保证进入timers阶段, 定时器能够立即执行处理程序.</p>
<p>在I/O事件处理程序下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs')

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

fs.readFile(__filename, () =&gt; {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>)
  }, <span class="hljs-number">0</span>)
  setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'immediate'</span>)
  })
})</code></pre>
<p>此时 <code>setImmediate</code> 优先于 <code>setTimeout</code> 执行，因为 poll阶段执行完成后 进入 check阶段. timers阶段处于下一个事件循环阶段了.</p>
<h2 id="articleHeader9">相关文章</h2>
<ul>
<li><a href="https://www.cnblogs.com/onepixel/p/7143769.html" rel="nofollow noreferrer" target="_blank">浅析 Node.js 单线程模型</a></li>
<li><a href="http://cnodejs.org/topic/57d68794cb6f605d360105bf" rel="nofollow noreferrer" target="_blank">Node.js Event Loop 的理解 Timers，process.nextTick()</a></li>
<li><a href="https://github.com/creeperyang/blog/issues/26" rel="nofollow noreferrer" target="_blank">Node.js的event loop及timer/setImmediate/nextTick</a></li>
<li><a href="https://github.com/nodejs/node/blob/v6.x/doc/topics/event-loop-timers-and-nexttick.md" rel="nofollow noreferrer" target="_blank">The Node.js Event Loop, Timers, and process.nextTick()</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Node.js】理解事件循环机制

## 原文链接
[https://segmentfault.com/a/1190000012258592](https://segmentfault.com/a/1190000012258592)


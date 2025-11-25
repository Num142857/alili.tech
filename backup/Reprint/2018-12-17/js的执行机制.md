---
title: 'js的执行机制' 
date: 2018-12-17 2:30:06
hidden: true
slug: v6yyypsiyxn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">js在哪执行</h2>
<p>js的执行引擎基于v8(c++编写),在chrome和node中都有应用,执行时有以下两部分构成</p>
<blockquote><ul>
<li>内存堆(内存分配)</li>
<li>调用栈(代码执行)</li>
</ul></blockquote>
<p>上述两部分的联系就是代码在调用栈中执行,执行过程中会存取一些对象在内存堆上。</p>
<p>我们写的js代码经过js引擎(解释器)转化为高效的机器码,现在的v8引擎由TurboFan和Ignition两部分构成,其中Ignition是解释器,而TurboFan主要对代码做些优化,以提高执行性能。</p>
<p>基于执行引擎的执行原理在代码层面我们可以做些优化,可以参考我之前的<a href="https://segmentfault.com/a/1190000011531171">一篇文章</a></p>
<h2 id="articleHeader1">js如何执行</h2>
<h3 id="articleHeader2">js同步执行</h3>
<p>js按照代码顺序执行,在栈上分配执行空间,按照调用顺序,会有出栈入栈等各种情况,比较好分析,唯一值的说的地方就是js只有一个主线程,栈空间有限,如果递归执行过深会发生溢出,所以在编写代码层面需要注意这种情况。</p>
<h3 id="articleHeader3">js异步执行</h3>
<h3 id="articleHeader4">为什么要有异步?</h3>
<p>同步单线程代码处理起来方便,代码表达也容易,更符合我们的思维方式,为什么还会出现异步呢? <br>  因为同步会发生阻塞,在现在这个高并发时代,不能很好的处理海量请求,同时也不能充分利用硬件资源(想想cpu和io之间处理速度差异你就深有体会)。<br>  但是为什么不多线程呢,例如java,主要是单个线程上运行代码相对来多线程来说说容易写，不必考虑在多线程环境中出现的复杂场景，例如死锁等等。</p>
<h3 id="articleHeader5">异步执行机制?</h3>
<p>异步执行相对来说复杂些,所以详细描述下,关键是在各种使用情况下执行顺序问题,在此就需要引入一个概念--&gt;Event Loop。结合下面这幅图进行大致说明下:<br><span class="img-wrap"><img data-src="/img/remote/1460000012919766?w=710&amp;h=749" src="https://static.alili.tech/img/remote/1460000012919766?w=710&amp;h=749" alt="event-loop-gcy" title="event-loop-gcy" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Event Loop的概念" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-keyword">Event</span> <span class="hljs-keyword">Loop</span>的概念</code></pre>
<blockquote><ul>
<li>所有任务在主线程上执行，形成一个执行栈（execution context stack),上图stack区域所示。</li>
<li>执行过程中可能会调用异步api,其中Background Threads负责具体异步任务执行,结束后将宏任务回调逻辑放入task queue中,微任务回调逻辑放入micro task队列中。</li>
<li>主线程执行完毕,检查microtask队列是否为空,会执行到队列空为止</li>
<li>从宏任务队列中取出一个在执行,执行完后,检查并取出执行microtask队列的任务,然后不断重复这个步骤,对于这整个循环过程,一个对应的描述名词就叫做event loop。</li>
</ul></blockquote>
<h3 id="articleHeader6">node中异步</h3>
<p>异步任务分类</p>
<blockquote><ul>
<li>macrotask类型包括 script整体代码,setTimeout,setInterval,setImmediate,I/O……</li>
<li>microtask类型包括  Promise process.nextTick Object.observe  MutaionObserver……</li>
</ul></blockquote>
<p>node中event loop各个阶段的操作如下图所示</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012919767?w=900&amp;h=572" src="https://static.alili.tech/img/remote/1460000012919767?w=900&amp;h=572" alt="node-event-loop" title="node-event-loop" style="cursor: pointer;"></span><br>说明,上图中每个盒子表示了event loop的一个阶段,每个阶段执行完毕后,或者执行的回调数量达到上限后，event loop会进入下个阶段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="timers: 在达到这个下限时间后执行setTimeout()和setInterval()这些定时器设定的回调。
I/O callbacks: 执行除了close回调，timer的回调，和setImmediate()的回调,例如操作系统回调tcp错误。
idle, prepare: 仅内部使用。
poll: 获取新的I/O事件,例如socket的读写事件；node会在适当条件下阻塞在这里,如果poll阶段空闲,才会进入下一阶段。
check: 执行setImmediate()设定的回调。
close callbacks: 执行比如socket.on('close', ...)的回调。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>timer<span class="hljs-variable">s:</span> 在达到这个下限时间后执行setTimeout()和setInterval()这些定时器设定的回调。
I/O callback<span class="hljs-variable">s:</span> 执行除了<span class="hljs-keyword">close</span>回调，timer的回调，和setImmediate()的回调,例如操作系统回调tcp错误。
idle, prepare: 仅内部使用。
pol<span class="hljs-variable">l:</span> 获取新的I/O事件,例如socket的读写事件；node会在适当条件下阻塞在这里,如果poll阶段空闲,才会进入下一阶段。
check: 执行setImmediate()设定的回调。
<span class="hljs-keyword">close</span> callback<span class="hljs-variable">s:</span> 执行比如socket.<span class="hljs-keyword">on</span>(<span class="hljs-string">'close'</span>, ...)的回调。</code></pre>
<p>下面结合一些具体例子进行说明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
require('fs').readFile('./case1.js', () => {
    setTimeout(() => {
        console.log('setTimeout in poll phase');
    });
    setImmediate(() => {
        console.log('setImmediate in poll phase');
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>).readFile(<span class="hljs-string">'./case1.js'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout in poll phase'</span>);
    });
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setImmediate in poll phase'</span>);
    });
});
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="输出结果是:
setImmediate in poll phase
setTimeout in poll phase
Process finished with exit code 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>输出结果是:
setImmediate <span class="hljs-keyword">in</span> poll phase
setTimeout <span class="hljs-keyword">in</span> poll phase
Process finished with <span class="hljs-keyword">exit</span> code <span class="hljs-number">0</span></code></pre>
<p><strong>说明</strong> setImmediate的回调永远先执行,因为readFile的回调执行是在 poll 阶段，所以接下来的 check 阶段会先执行 setImmediate 的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => console.log('setTimeout1'), 1000);
setTimeout(() => {
    console.log('setTimeout2');
    process.nextTick(() => console.log('nextTick1'));
}, 0);
setTimeout(() => console.log('setTimeout3'), 0);

process.nextTick(() => console.log('nextTick2'));
process.nextTick(() => {
    process.nextTick(console.log.bind(console, 'nextTick3'));
});
 Promise.resolve('xxx').then(() => {
    console.log('promise');
    testPromise();
});
process.nextTick(() => console.log('nextTick4'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout1'</span>), <span class="hljs-number">1000</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout2'</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick1'</span>));
}, <span class="hljs-number">0</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout3'</span>), <span class="hljs-number">0</span>);

process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick2'</span>));
process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    process.nextTick(<span class="hljs-built_in">console</span>.log.bind(<span class="hljs-built_in">console</span>, <span class="hljs-string">'nextTick3'</span>));
});
 Promise.resolve(<span class="hljs-string">'xxx'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise'</span>);
    testPromise();
});
process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick4'</span>));</code></pre>
<p>结果是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nextTick2
nextTick4
nextTick3
promise
setTimeout2
setTimeout3
nextTick1
setTimeout1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-symbol">nextTick2</span>
<span class="hljs-symbol">nextTick4</span>
<span class="hljs-symbol">nextTick3</span>
promise
setTimeout<span class="hljs-number">2</span>
setTimeout<span class="hljs-number">3</span>
<span class="hljs-symbol">nextTick1</span>
setTimeout<span class="hljs-number">1</span></code></pre>
<p>在描述什么是event loop中,大概描述了microtask机制,但具体到nextTick比较特别,有一个Tick-Task-Queue专门用于存放process.nextTick的任务,且有调用深度限制,上限是1000。js引擎执行 Macro Task 任务结束后,会先遍历执行Tick-Task-Queue的所有任务,紧接着再遍历 Micro Task Queue 的所有任务。具体执行逻辑可以下面代码表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (macroTask of macroTaskQueue) {

    // 1. Handle current MACRO-TASK
    handleMacroTask();

    // 2. Handle all NEXT-TICK
    for (nextTick of nextTickQueue) {
        handleNextTick(nextTick);
    }

    // 3. Handle all MICRO-TASK
    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">for</span> (macroTask <span class="hljs-keyword">of</span> macroTaskQueue) {

    // <span class="hljs-number">1</span>. Handle current MACRO-<span class="hljs-keyword">TASK</span>
    handleMacroTask();

    // <span class="hljs-number">2</span>. Handle <span class="hljs-keyword">all</span> NEXT-TICK
    <span class="hljs-keyword">for</span> (nextTick <span class="hljs-keyword">of</span> nextTickQueue) {
        handleNextTick(nextTick);
    }

    // <span class="hljs-number">3</span>. Handle <span class="hljs-keyword">all</span> MICRO-<span class="hljs-keyword">TASK</span>
    <span class="hljs-keyword">for</span> (microTask <span class="hljs-keyword">of</span> microTaskQueue) {
        handleMicroTask(microTask);
    }
}</code></pre>
<p>所以才会先输出process.nextTick然后才会是promise,其它的输出顺序不在赘述,前面讲event-loop机制时已经说明了。根据上面代码表述的执行逻辑,很显然可以得到下面的个结论,当递归调用时会发生死循环,而宏任务就不会。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="testPromise();
function testPromise() {
    promise = Promise.resolve('xxx').then(() => {
        console.log('promise');
        testPromise();
    });
}
//将之前步骤的promise任务换成这个,setTimeout2以及之后的输出永远没机会出来,类比到nextTick也是这种效果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>testPromise();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testPromise</span>(<span class="hljs-params"></span>) </span>{
    promise = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'xxx'</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise'</span>);
        testPromise();
    });
}
<span class="hljs-comment">//将之前步骤的promise任务换成这个,setTimeout2以及之后的输出永远没机会出来,类比到nextTick也是这种效果</span></code></pre>
<p>看了一些书,参考了很多资料,将自己学习的东西,理解后在输出,希望大家辩证的看待,有空的话接下来研究一下源码,毕竟通过demo验证结论的说服力没有源码来的那么直接。</p>
<p>参考链接<br><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">https://jakearchibald.com/201...</a><br><a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf" rel="nofollow noreferrer" target="_blank">https://blog.sessionstack.com...</a><br><a href="https://cnodejs.org/topic/592e377e855efbac2cf7a4dd" rel="nofollow noreferrer" target="_blank">https://cnodejs.org/topic/592...</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/docs/gu...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js的执行机制

## 原文链接
[https://segmentfault.com/a/1190000012919761](https://segmentfault.com/a/1190000012919761)


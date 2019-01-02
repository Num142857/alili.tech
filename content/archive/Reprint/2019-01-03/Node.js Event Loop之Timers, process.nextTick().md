---
title: 'Node.js Event Loop之Timers, process.nextTick()' 
date: 2019-01-03 2:30:11
hidden: true
slug: hy68c9soav
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>Node.js以异步I/O和事件驱动的特性著称,但异步I/O是怎么实现的呢?其中核心的一部分就是event loop,下文中内容基本来自于<a href="https://github.com/nodejs/node/blob/v6.x/doc/topics/event-loop-timers-and-nexttick.md" rel="nofollow noreferrer" target="_blank">Node.js文档</a>,有不准确地方请指出.</p>
<h2 id="articleHeader1">什么是Event loop</h2>
<p>event loop能让Node.js的I/O操作表现得无阻塞,尽管JavaScript是单线程的但通过尽可能的将操作放到操作系统内核.</p>
<p>由于现在大多数内核都是多线程的,它们可以在后台执行多个操作. 当这些操作完成时,内核通知Node.js应该把回调函数添加到<strong>poll</strong>队列被执行.我们将在接下来的话题里详细讨论.</p>
<h2 id="articleHeader2">Event Loop 说明</h2>
<p>当Node.js开始时,它将会初始化event loop,处理提供可能造成异步API调用,timers任务,或调用<code>process.nextTick()</code>的脚本(或者将它放到[REPL][]中,这篇文章中将不会讨论),然后开始处理event loop.</p>
<p>下面是一张event loop操作的简单概览图.</p>
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
      </div><pre class="hljs smali"><code class="txt">   ┌───────────────────────┐
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
<p><em>注意: 每一个方框将被简称为一个event loop的阶段.</em></p>
<p>每一个阶段都有一个回调函数的FIFO队列被执行.每一个阶段都有自己特有的方式,通常even loop进入一个给定的阶段时,它将执行该阶段任何的特定操作,然后执行该阶段队列中的回调函数,直到执行完所有回调或执行了最大回调的次数.当队列中的回调已被执行完或者到达了限制次数,eventloop将会从下一个阶段开始依次执行.</p>
<p>由于这些操作可能造成更多的操作,并且在<strong>poll</strong>阶段中产生的新事件被内核推入队列,所以poll事件可以被推入队列当有其它poll事件正在执行时.因此长时间执行回调可以允许poll阶段超过timers设定的时间.详细内容请看<a><strong>timers</strong></a>和<a><strong>poll</strong></a>章节.</p>
<p>ps: 个人理解-在轮询阶段一个回调执行可能会产生新的事件处理,这些新事件会被推入到轮询队列中,所以poll阶段可以一直执行回调,即使timers的回调已到时间应该被执行时.</p>
<p><em><strong>注意:</strong> Windows和Unix/Linux在实现时有一些细微的差异,但那都不是事儿.重点是: 实际上有7或8个步骤,Node.js实际上使用的是它们所有.</em></p>
<h2 id="articleHeader3">阶段概览</h2>
<ul>
<li>
<strong>timers</strong>: 这个阶段执行<code>setTimeout()</code>和 <code>setInterval()</code>产生的回调.</li>
<li>
<strong>I/O callbacks</strong>: 执行大多数的回调,除了close callbacks,timers和<code>setImmediate()</code>的回调.</li>
<li>
<strong>idle, prepare</strong>: 仅供内部使用.</li>
<li>
<strong>poll</strong>: 获取新的I/O事件;node会在适当时候在这里阻塞.</li>
<li>
<strong>check</strong>: 执行<code>setImmediate()</code>回调.</li>
<li>
<strong>close callbacks</strong>: e.g. <code>socket.on('close', ...)</code>.</li>
</ul>
<p>在每次event loop之间,Node.js会检查它是否正在等待任何异步I/O或计时器,如果没有就会完全关闭.</p>
<h2 id="articleHeader4">阶段详情</h2>
<h3 id="articleHeader5">timers</h3>
<p>一个定时器指定的是执行回调函数的<strong>阈值</strong>,而不是<strong>确定</strong>的时间点.定时器的回调将在规定的时间过后运行;然而,操作系统调度或其他回调函数的运行可能会使执行回调延迟.</p>
<p><em><strong>注意</strong>: 技术上,<a><strong>poll</strong> 阶段</a>控制了timers被执行.</em></p>
<p>例如, 你要在100ms的延时后在回调函数并且执行一个耗时95ms的异步读取文本操作:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(function() {

  const delay = Date.now() - timeoutScheduled;

  console.log(delay + 'ms have passed since I was scheduled');
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(function() {

  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }

});

// 输出: 105ms have passed since I was scheduled" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someAsyncOperation</span>(<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-comment">// Assume this takes 95ms to complete</span>
  fs.readFile(<span class="hljs-string">'/path/to/file'</span>, callback);
}

<span class="hljs-keyword">const</span> timeoutScheduled = <span class="hljs-built_in">Date</span>.now();

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">const</span> delay = <span class="hljs-built_in">Date</span>.now() - timeoutScheduled;

  <span class="hljs-built_in">console</span>.log(delay + <span class="hljs-string">'ms have passed since I was scheduled'</span>);
}, <span class="hljs-number">100</span>);


<span class="hljs-comment">// do someAsyncOperation which takes 95 ms to complete</span>
someAsyncOperation(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">const</span> startCallback = <span class="hljs-built_in">Date</span>.now();

  <span class="hljs-comment">// do something that will take 10ms...</span>
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">Date</span>.now() - startCallback &lt; <span class="hljs-number">10</span>) {
    <span class="hljs-comment">// do nothing</span>
  }

});

<span class="hljs-comment">// 输出: 105ms have passed since I was scheduled</span></code></pre>
<p>当event loop进入<strong>poll</strong>阶段时,它是一个空的队列(<code>fs.readFile()</code>还没有完成),所以它会等待数毫秒等待timers设定时间的到达.直到等待95 ms过后, <code>fs.readFile()</code>完成文件读取然后它的回调函数会被添加至<strong>poll</strong>队列然后执行.当执行完成后队列中没有其他回调,所以event loop会查看定时器设定的时间已经到达然后回撤到timers阶段执行timers的回调函数.在例子里你会发现,从定时器被记录到执行回调函数耗时105ms.</p>
<p>注意: 为了防止<strong>poll</strong>阶段阻塞死event loop, [libuv]<br>(<a href="http://libuv.org/)" rel="nofollow noreferrer" target="_blank">http://libuv.org/)</a> (实现Node.js事件循环的C库和平台的所有异步行为)<br>也有一个固定最大值(系统依赖).</p>
<h3 id="articleHeader6">I/O callbacks</h3>
<p>这个阶段执行一些系统操作的回调,例如TCP错误等类型.例如TCP socket 尝试连接时收到了<code>ECONNREFUSED</code>,一些*nix系统想等待错误日志记录.这些都将在<strong>I/O callbacks</strong>阶段被推入队列执行.</p>
<h3 id="articleHeader7">poll</h3>
<p><strong>poll</strong> 阶段有两个主要的功能:</p>
<ol>
<li>为已经到达或超时的定时器执行脚本</li>
<li>处理在<strong>poll</strong>队列中的事件.</li>
</ol>
<p>当event loop进入<strong>poll</strong>阶段并且没有timers任务时会执行下面某一条操作:</p>
<ul>
<li>如果<strong>poll</strong>队列<strong>不为空</strong>,则event loop会同步的执行回调队列,直到执行完回调或达到系统最大限制.</li>
<li>
<p>如果<strong>poll</strong>队列<strong>为空</strong>,会执行下面某一条操做:</p>
<ul>
<li>如果脚本被<code>setImmediate()</code>执行,则event loop会结束 <strong>poll</strong>阶段,继续向下进入到<strong>check</strong>阶段执行<code>setImmediate()</code>的脚本.</li>
<li>如果脚本不是被<code>setImmediate()</code>执行,event loop会等待回调函数被添加至队列,然后立刻执行它们.</li>
</ul>
</li>
</ul>
<p>一旦<strong>poll</strong>队列空了,event loop会检查timers是否有以满足条件的定时器,如果有一个以上满足执行条件的定时器,event loop将会撤回至<strong>timers</strong>阶段去执行定时器的回调函数.</p>
<h3 id="articleHeader8">check</h3>
<p>这个阶段允许立刻执行一个回调在<strong>poll</strong>阶段完成后.如果<strong>poll</strong>阶段已经执行完成或脚本已经使用<code>setImmediate()</code>,event loop 可能就会继续到<strong>check</strong>阶段而不是等待.</p>
<p><code>setImmediate()</code>实际是在event loop 独立阶段运行的特殊定时器.它使用了libuv API来使回调函数在<strong>poll</strong>阶段后执行.</p>
<p>通常在代码执行时,event loop 最终会到达poll阶段,等待传入连接,请求等等.然而,如果有一个被<code>setImmediate()</code>执行的回调,<strong>poll</strong>阶段会变得空闲,它将会结束并进入<strong>check</strong>阶段而不是等待新的<strong>poll</strong>事件.</p>
<h3 id="articleHeader9">close callbacks</h3>
<p>如果一个socket或者操作被突然关闭(例如.<code>socket.destroy()</code>),这个<code>close</code>事件将在这个阶段被触发.否则它将会通过<code>process.nextTick()</code>被触发.</p>
<h2 id="articleHeader10">
<code>setImmediate()</code> vs <code>setTimeout()</code>
</h2>
<p><code>setImmediate</code> 和 <code>setTimeout()</code> 是很相似的,但是它们的调用方式不同导致了会有不同的表现.</p>
<ul>
<li>
<code>setImmediate()</code> 会中断<strong>poll</strong>阶段,立即执行..</li>
<li>
<code>setTimeout()</code> 将在给定的毫秒后执行设定的脚本.</li>
</ul>
<p>timers的执行顺序会根据它们被调用的上下文而变化.如果两个都在主模块内被调用，则时序将受到进程的性能的限制（可能受机器上运行的其他应用程序的影响）.</p>
<p>例如,我们执行下面两个不在I/O周期内(主模块)的脚本,这两个timers的执行顺序是不确定的,它受到进程性能的影响:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// timeout_vs_immediate.js
setTimeout(function timeout() {
  console.log('timeout');
}, 0);

setImmediate(function immediate() {
  console.log('immediate');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// timeout_vs_immediate.js</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>);
}, <span class="hljs-number">0</span>);

setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">immediate</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'immediate'</span>);
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="console">$ <span class="hljs-keyword">node</span> <span class="hljs-title">timeout_vs_immediate</span>.js
timeout
immediate

$ <span class="hljs-keyword">node</span> <span class="hljs-title">timeout_vs_immediate</span>.js
immediate
timeout</code></pre>
<p>然而,如果你把这两个调用放到I/O周期内,则immediate的回调总会被先执行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// timeout_vs_immediate.js</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

fs.readFile(__filename, () =&gt; {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>);
  }, <span class="hljs-number">0</span>);
  setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'immediate'</span>);
  });
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="console">$ <span class="hljs-keyword">node</span> <span class="hljs-title">timeout_vs_immediate</span>.js
immediate
timeout

$ <span class="hljs-keyword">node</span> <span class="hljs-title">timeout_vs_immediate</span>.js
immediate
timeout</code></pre>
<p>使用<code>setImmediate()</code>比<code>setTimeout()</code>的好处是<code>setImmediate()</code>在I/O周期内总是比所有timers先执行,无论有多少timers存在.</p>
<h2 id="articleHeader11"><code>process.nextTick()</code></h2>
<h3 id="articleHeader12">理解 <code>process.nextTick()</code>
</h3>
<p>你可能已经注意到<code>process.nextTick()</code>没有在概览图中列出,尽管他是异步API的一部分.这是因为<code>process.nextTick()</code>在技术上不是event loop的一部分.反而<code>nextTickQueue</code>会在当前操作完成后会被执行,无论当前处于event loop的什么阶段.</p>
<p>再看看概览图,在给定的阶段你任何时候调用<code>process.nextTick()</code>,通过<code>process.nextTick()</code>指定的回调函数都会在event loop继续执行前被解析.这可能会造成一些不好的情况,因为<strong>它允许你通过递归调用<code>process.nextTick()</code>而造成I/O阻塞死</strong>,因为它阻止了event loop到达<strong>poll</strong>阶段.</p>
<h3 id="articleHeader13">为什么这种操作会被允许呢?</h3>
<p>部分原因是一个API应该是异步事件尽管它可能不是异步的.看看下面代码片段:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback,
                            new TypeError('argument should be string'));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apiCall</span>(<span class="hljs-params">arg, callback</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> arg !== <span class="hljs-string">'string'</span>)
    <span class="hljs-keyword">return</span> process.nextTick(callback,
                            <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'argument should be string'</span>));
}</code></pre>
<p>代码里对参数做了校验,如果不正确,它将会在回调函数中抛出错误.API最近更新，允许传递参数给 process.nextTick() ，process.nextTick()可以接受任何参数，回调函数被当做参数传递给回调函数后，你就不必使用嵌套函数了.</p>
<p>我们所做的就是将错误回传给用户当用户的其它代码执行后.通过使用<code>process.nextTick()</code>我们确保<code>apiCall()</code>执行回调函数在用户的代码之后,在event loop运行的阶段之前.为了实现这一点,JS调用的堆栈被允许释放掉,然后立刻执行提供的回调函数,回调允许用户递归的调用<code>process.nextTick()</code>直到v8限制的调用堆栈最大值.</p>
<p>这种理念可能会导致一些潜在的问题.来看这段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {

  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined

});

bar = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> bar;

<span class="hljs-comment">// this has an asynchronous signature, but calls callback synchronously</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someAsyncApiCall</span>(<span class="hljs-params">callback</span>) </span>{ callback(); }

<span class="hljs-comment">// the callback is called before `someAsyncApiCall` completes.</span>
someAsyncApiCall(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {

  <span class="hljs-comment">// since someAsyncApiCall has completed, bar hasn't been assigned any value</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>, bar); <span class="hljs-comment">// undefined</span>

});

bar = <span class="hljs-number">1</span>;</code></pre>
<p>用户定义了一个有异步标签的函数<code>someAsyncApiCall()</code>,尽管他的操作是同步的.当它被调用的时候,提供的回调函数在event loop的同一阶段中被调用,因为<code>someAsyncApiCall()</code>没有任何异步操作.所以回调函数尝试引用<code>bar</code>尽管这个变量在作用域没有值,因为代码还没有执行到最后.</p>
<p>通过将回调函数放在<code>process.nextTick()</code>里,代码仍然有执行完的能力,允许所有的变量,函数等先被初始化来供回调函数调用.它还有不允许event loop继续执行的优势.它可能在event loop继续执行前抛出一个错误给用户很有用.这里提供一个使用<code>process.nextTick()</code>的示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> bar;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someAsyncApiCall</span>(<span class="hljs-params">callback</span>) </span>{
  process.nextTick(callback);
}

someAsyncApiCall(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>, bar); <span class="hljs-comment">// 1</span>
});

bar = <span class="hljs-number">1</span>;</code></pre>
<p>这里有另一个真实的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> server = net.createServer(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}).listen(<span class="hljs-number">8080</span>);

server.on(<span class="hljs-string">'listening'</span>, () =&gt; {});</code></pre>
<p>仅当端口可用时端口立即被绑定.所以<code>'listening'</code>的回调函数能立即被调用.问题是那时候不会设置<code>.on('listening')</code>.</p>
<p>为了解决这个问题,<code>'listening'</code>事件被放入<code>nextTick()</code>队列来允许代码执行完.这会允许用户设置他们想要的任何事件处理.</p>
<h2 id="articleHeader14">
<code>process.nextTick()</code> vs <code>setImmediate()</code>
</h2>
<p>我们有两个直到现在用户都关心的相似的调用,但他们的名字令人困惑.</p>
<ul>
<li>
<code>process.nextTick()</code> 在同一阶段立即触发</li>
<li>
<code>setImmediate()</code> 在以下迭代器或者event loop的'tick'中触发</li>
</ul>
<p>本质上,这两个名字应该交换.<code>process.nextTick()</code>比<code>setImmediate()</code>触发要快但这是一个不想改变的历史的命名.做这个改变会破坏npm上大多数包.每天都有新模块被增加,意味着每天我们都在等待更多的潜在错误发生.当他们困惑时,这个名字就不会被改变.</p>
<p><em>我们建议开发者使用<code>setImmediate()</code>因为它更容易被理解(并且它保持了更好的兼容性,例如浏览器的JS)</em></p>
<h2 id="articleHeader15">为什么使用<code>process.nextTick()</code>?</h2>
<p>有两个主要原因:</p>
<ol>
<li>允许用户处理错误，清除任何不需要的资源，或者可能在事件循环继续之前再次尝试该请求.</li>
<li>同时有必要允许回调函数执行在调用堆栈释放之后但在event loop继续之前.</li>
</ol>
<p>一个满足用户期待的简单例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const server = net.createServer();
server.on('connection', function(conn) { });

server.listen(8080);
server.on('listening', function() { });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> server = net.createServer();
server.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">conn</span>) </span>{ });

server.listen(<span class="hljs-number">8080</span>);
server.on(<span class="hljs-string">'listening'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ });</code></pre>
<p><code>listen()</code>在event loop开始时执行,但是listening的回调函数被放在一个<code>setImmediate()</code>中.现在除非主机名可用于绑定端口会立即执行.现在为了event loop继续执行,它必须进入<strong>poll</strong>阶段,意味着在监听事件前且没有触发允许连接事件时没有接收到请求的可能.</p>
<p>另一个例子是运行一个函数构造函数，例如，继承自<code>EventEmitter</code>，并且想要在构造函数中调用一个事件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', function() {
  console.log('an event occurred!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>);
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyEmitter</span>(<span class="hljs-params"></span>) </span>{
  EventEmitter.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'event'</span>);
}
util.inherits(MyEmitter, EventEmitter);

<span class="hljs-keyword">const</span> myEmitter = <span class="hljs-keyword">new</span> MyEmitter();
myEmitter.on(<span class="hljs-string">'event'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'an event occurred!'</span>);
});</code></pre>
<p>你不能在构造函数中立即触发事件,因为代码不会执行到用户为该事件分配回调函数的地方,所以,在构造函数本身中,你可以使用<code>process.nextTick()</code>设置回调函数来在够咱函数完成后触发事件.有一个小栗子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(function() {
    this.emit('event');
  }.bind(this));
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', function() {
  console.log('an event occurred!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>);
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyEmitter</span>(<span class="hljs-params"></span>) </span>{
  EventEmitter.call(<span class="hljs-keyword">this</span>);

  <span class="hljs-comment">// use nextTick to emit the event once a handler is assigned</span>
  process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'event'</span>);
  }.bind(<span class="hljs-keyword">this</span>));
}
util.inherits(MyEmitter, EventEmitter);

<span class="hljs-keyword">const</span> myEmitter = <span class="hljs-keyword">new</span> MyEmitter();
myEmitter.on(<span class="hljs-string">'event'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'an event occurred!'</span>);
});</code></pre>
<h2 id="articleHeader16">部分个人理解</h2>
<p>前面基本是基于文档的翻译(由于英文能力问题,很多地方都模模糊糊,甚至是狗屁不通[捂脸]),下面写一些重点部分的理解</p>
<h4>几个概念</h4>
<ol>
<li>event loop是跑在主进程上的一个<code>while(true) {}</code>循环.</li>
<li>timers阶段包括<code>setTimeout()</code>,<code>setInterval()</code>两个定时器,回调执行时间等于或者晚于定时器设定的时间,因为在<strong>poll</strong>阶段会执行其它回调函数,在空闲时才回去检查定时器(event loop的开始和结束时检查).</li>
<li>在I/O callback阶段,虽然在阶段介绍里说的是执行除timers,Immediate,close之外的所有回调,但后面详细介绍中又说了,这里执行的大多是stream, pipe, tcp, udp通信错误的回调,例如fs产生的回调应该还是在<strong>poll</strong>阶段执行的.</li>
<li>
<strong>poll</strong>阶段应该才是真正的执行了除timers,Immediate,close外的所有回调.</li>
<li>
<strong>process.nextTick()</strong>没有在任何一个阶段执行,它执行的时间应该是在各个阶段切换的中间执行.</li>
</ol>
<h4>几段代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');

fs.readFile('../mine.js', () => {
    setTimeout(() => { console.log(&quot;setTimeout&quot;) }, 0);
    process.nextTick(() => { console.log(&quot;process.nextTick&quot;) })
    setImmediate(() => { console.log(&quot;setImmediate&quot;) })
});
/*log -------------------
process.nextTick
setImmediate
setTimeout
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

fs.readFile(<span class="hljs-string">'../mine.js'</span>, () =&gt; {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setTimeout"</span>) }, <span class="hljs-number">0</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"process.nextTick"</span>) })
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setImmediate"</span>) })
});
<span class="hljs-comment">/*log -------------------
process.nextTick
setImmediate
setTimeout
*/</span></code></pre>
<ol>
<li>当文件读取完成后在<strong>poll</strong>阶段执行回调函数</li>
<li>将<code>setTimeout</code>添加至timers队列,解析<code>process.nextTick()</code>回调函数,将<code>setImmediate</code>添加至<strong>check</strong>队列</li>
<li>
<strong>poll</strong>队列为空,有<code>setImmediate</code>的代码,继续向下一个阶段.</li>
<li>在到达<strong>check</strong>阶段前执行<code>process.nextTick()</code>回调函数</li>
<li>在<strong>check</strong>阶段执行<code>setImmediate</code>
</li>
<li>在<strong>timers</strong>阶段执行<code>setTimeout</code>回调</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');

const start = new Date();
fs.readFile('../mine.js', () => {
    setTimeout(() => { console.log(&quot;setTimeout spend: &quot;, new Date() - start) }, 0);
    setImmediate(() => { console.log(&quot;setImmediate spend: &quot;, new Date() - start) })
    process.nextTick(() => { console.log(&quot;process.nextTick spend: &quot;, new Date() - start) })
});
setTimeout(() => { console.log(&quot;setTimeout-main spend: &quot;, new Date() - start) }, 0);
setImmediate(() => { console.log(&quot;setImmediate-main spend: &quot;, new Date() - start) })
process.nextTick(() => { console.log(&quot;process.nextTick-main spend: &quot;, new Date() - start) })
/* log ----------------
process.nextTick-main spend:  9
setTimeout-main spend:  12
setImmediate-main spend:  13
process.nextTick spend:  14
setImmediate spend:  15
setTimeout spend:  15
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">const</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
fs.readFile(<span class="hljs-string">'../mine.js'</span>, () =&gt; {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setTimeout spend: "</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) }, <span class="hljs-number">0</span>);
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setImmediate spend: "</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) })
    process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"process.nextTick spend: "</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) })
});
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setTimeout-main spend: "</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) }, <span class="hljs-number">0</span>);
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setImmediate-main spend: "</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) })
process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"process.nextTick-main spend: "</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) })
<span class="hljs-comment">/* log ----------------
process.nextTick-main spend:  9
setTimeout-main spend:  12
setImmediate-main spend:  13
process.nextTick spend:  14
setImmediate spend:  15
setTimeout spend:  15
*/</span></code></pre>
<p>这里没有搞懂为什么主进程内的<code>setTimeout</code>总是比<code>setImmediate</code>先执行,按文档所说,两个应该是不确定谁先执行.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js Event Loop之Timers, process.nextTick()

## 原文链接
[https://segmentfault.com/a/1190000010832691](https://segmentfault.com/a/1190000010832691)


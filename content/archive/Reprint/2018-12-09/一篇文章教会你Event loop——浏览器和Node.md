---
title: '一篇文章教会你Event loop——浏览器和Node' 
date: 2018-12-09 2:30:09
hidden: true
slug: sd6otxqjjzr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近对Event loop比较感兴趣，所以了解了一下。但是发现整个Event loop尽管有很多篇文章，但是没有一篇可以看完就对它所有内容都了解的文章。大部分的文章都只阐述了浏览器或者Node二者之一，没有对比的去看的话，认识总是浅一点。所以才有了这篇整理了百家之长的文章。</blockquote>
<h2 id="articleHeader0">1. 定义</h2>
<blockquote>Event loop：为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。（3月29修订）</blockquote>
<p>那什么是事件？</p>
<blockquote>事件：事件就是由于某种外在或内在的信息状态发生的变化，从而导致出现了对应的反应。比如说用户点击了一个按钮，就是一个事件；HTML页面完成加载，也是一个事件。一个事件中会包含多个任务。</blockquote>
<p>我们在之前的文章中提到过，JavaScript引擎又称为JavaScript解释器，是JavaScript解释为机器码的工具，分别运行在浏览器和Node中。而根据上下文的不同，Event loop也有不同的实现：其中Node使用了libuv库来实现Event loop; 而在浏览器中，html规范定义了Event loop，具体的实现则交给不同的厂商去完成。</p>
<p>所以，<strong>浏览器的Event loop和Node的Event loop是两个概念</strong>，下面分别来看一下。</p>
<h2 id="articleHeader1">2. 意义</h2>
<p>在实际工作中，了解Event loop的意义能帮助你<strong>分析一些异步次序的问题</strong>（当然，随着es7 async和await的流行，这样的机会越来越少了）。除此以外，它还对你<strong>了解浏览器和Node的内部机制</strong>有积极的作用；对于<strong>参加面试</strong>，被问到一堆异步操作的执行顺序时，也不至于两眼抓瞎。</p>
<h2 id="articleHeader2">3. 浏览器上的实现</h2>
<p>在JavaScript中，任务被分为Task（又称为MacroTask,宏任务）和MicroTask（微任务）两种。它们分别包含以下内容：</p>
<blockquote>
<strong>MacroTask</strong>: script(整体代码), setTimeout, setInterval, setImmediate（node独有）, I/O, UI rendering<br><strong>MicroTask</strong>: process.nextTick（node独有）, Promises, Object.observe(废弃), MutationObserver</blockquote>
<p>需要<strong>注意</strong>的一点是：在同一个上下文中，<strong>总的执行顺序为同步代码—&gt;microTask—&gt;macroTask</strong>[6]。这一块我们在下文中会讲。</p>
<p>浏览器中，一个事件循环里有很多个来自不同任务源的任务队列（task queues），每一个任务队列里的任务是严格按照<strong>先进先出</strong>的顺序执行的。但是，因为<strong>浏览器自己调度</strong>的关系，<strong>不同任务队列的任务的执行顺序是不确定</strong>的。</p>
<p>具体来说，浏览器会不<strong>断从task队列中按顺序取task执行，每执行完一个task都会检查microtask队列是否为空</strong>（执行完一个task的具体标志是函数执行栈为空），<strong>如果不为空则会一次性执行完所有microtask</strong>。然后再进入下一个循环去task队列中取下一个task执行，以此类推。</p>
<p><span class="img-wrap"><img data-src="/img/bV6itK?w=810&amp;h=414" src="https://static.alili.tech/img/bV6itK?w=810&amp;h=414" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>注意：图中橙色的MacroTask任务队列也应该是在不断被切换着的。</p>
<p>本段大批量引用了《<a href="https://segmentfault.com/a/1190000010622146">什么是浏览器的事件循环（Event Loop）</a>》的相关内容，想看更加详细的描述可以自行取用。</p>
<h2 id="articleHeader3">4. Node上的实现</h2>
<p>nodejs的event loop分为6个阶段，它们会按照顺序反复运行，分别如下：</p>
<blockquote><ol>
<li>timers：执行setTimeout() 和 setInterval()中到期的callback。</li>
<li>I/O callbacks：上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行</li>
<li>idle, prepare：队列的移动，仅内部使用</li>
<li>poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段</li>
<li>check：执行setImmediate的callback</li>
<li>close callbacks：执行close事件的callback，例如socket.on("close",func)</li>
</ol></blockquote>
<p>不同于浏览器的是，在每个阶段完成后，而不是MacroTask任务完成后，microTask队列就会被执行。这就导致了<strong>同样的代码在不同的上下文环境下会出现不同的结果</strong>。我们在下文中会探讨。</p>
<p>另外需要<strong>注意</strong>的是，如果在timers阶段执行时创建了setImmediate则会在此轮循环的check阶段执行，如果在timers阶段创建了setTimeout，由于timers已取出完毕，则会进入下轮循环，check阶段创建timers任务同理。</p>
<p><span class="img-wrap"><img data-src="/img/bV6iwC?w=655&amp;h=503" src="https://static.alili.tech/img/bV6iwC?w=655&amp;h=503" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">5. 示例</h2>
<h3 id="articleHeader5">5.1 浏览器与Node执行顺序的区别</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)



浏览器输出：
time1
promise1
time2
promise2

Node输出：
time1
time2
promise1
promise2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer1'</span>)

    <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
    })
}, <span class="hljs-number">0</span>)

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer2'</span>)

    <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>)
    })
}, <span class="hljs-number">0</span>)



浏览器输出：
time1
promise1
time2
promise2

Node输出：
time1
time2
promise1
promise2</code></pre>
<p>在这个例子中，Node的逻辑如下：</p>
<p>最初timer1和timer2就在timers阶段中。开始时首先进入timers阶段，执行timer1的回调函数，打印timer1，并将promise1.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；<br>至此，timer阶段执行结束，event loop进入下一个阶段之前，执行microtask队列的所有任务，依次打印promise1、promise2。</p>
<p>而浏览器则因为两个setTimeout作为两个MacroTask, 所以先输出timer1, promise1，再输出timer2，promise2。</p>
<p>更加详细的信息可以查阅《<a href="http://lynnelv.github.io/js-event-loop-nodejs" rel="nofollow noreferrer" target="_blank">深入理解js事件循环机制（Node.js篇）</a>》</p>
<p>为了证明我们的理论，把代码改成下面的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setImmediate(() => {
  console.log('timer1')

  Promise.resolve().then(function () {
    console.log('promise1')
  })
})

setTimeout(() => {
  console.log('timer2')

  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)

Node输出：
timer1               timer2
promise1    或者     promise2
timer2               timer1
promise2             promise1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer1'</span>)

  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
  })
})

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer2'</span>)

  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>)
  })
}, <span class="hljs-number">0</span>)

Node输出：
timer1               timer2
promise1    或者     promise2
timer2               timer1
promise2             promise1</code></pre>
<p>按理说<code>setTimeout(fn,0)</code>应该比<code>setImmediate(fn)</code>快，应该只有第二种结果，为什么会出现两种结果呢？<br>这是因为Node 做不到0毫秒，最少也需要1毫秒。实际执行的时候，进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行setImmediate的回调函数。</p>
<p>另外，如果已经过了Timer阶段，那么setImmediate会比setTimeout更快，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');

fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

fs.readFile(<span class="hljs-string">'test.js'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>));
  setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>));
});</code></pre>
<p>上面代码会先进入 I/O callbacks 阶段，然后是 check 阶段，最后才是 timers 阶段。因此，setImmediate才会早于setTimeout执行。</p>
<p>具体可以看《<a href="http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html" rel="nofollow noreferrer" target="_blank">Node 定时器详解</a>》。</p>
<h3 id="articleHeader6">5.2 不同异步任务执行的快慢</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => console.log(1));
setImmediate(() => console.log(2));

Promise.resolve().then(() => console.log(3));
process.nextTick(() => console.log(4));


输出结果：4 3 1 2或者4 3 2 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>));
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>));

Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>));
process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>));


输出结果：<span class="hljs-number">4</span> <span class="hljs-number">3</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span>或者<span class="hljs-number">4</span> <span class="hljs-number">3</span> <span class="hljs-number">2</span> <span class="hljs-number">1</span></code></pre>
<p>因为我们上文说过microTask会优于macroTask运行，所以先输出下面两个，而在Node中process.nextTick比Promise更加优先[3]，所以4在3前。而根据我们之前所说的Node没有绝对意义上的0ms，所以1,2的顺序不固定。</p>
<h3 id="articleHeader7">5.3 MicroTask队列与MacroTask队列</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   setTimeout(function () {
       console.log(1);
   },0);
   console.log(2);
   process.nextTick(() => {
       console.log(3);
   });
   new Promise(function (resolve, rejected) {
       console.log(4);
       resolve()
   }).then(res=>{
       console.log(5);
   })
   setImmediate(function () {
       console.log(6)
   })
   console.log('end');

Node输出：
2 4 end 3 5 1 6
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
   },<span class="hljs-number">0</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
   process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
   });
   <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, rejected</span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
       resolve()
   }).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
   })
   setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>)
   })
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);

Node输出：
<span class="hljs-number">2</span> <span class="hljs-number">4</span> end <span class="hljs-number">3</span> <span class="hljs-number">5</span> <span class="hljs-number">1</span> <span class="hljs-number">6</span>
</code></pre>
<p>这个例子来源于《<a href="https://juejin.im/post/5a623a11f265da3e2d33846b#heading-1" rel="nofollow noreferrer" target="_blank">JavaScript中的执行机制</a>》。Promise的代码是同步代码，then和catch才是异步的，所以4要同步输出，然后Promise的then位于microTask中，优于其他位于macroTask队列中的任务，所以5会优于1,6输出，而Timer优于Check阶段,所以1,6。</p>
<h2 id="articleHeader8">6. 总结</h2>
<p>综上，关于最关键的顺序，我们要<strong>依据以下几条规则</strong>:</p>
<ol>
<li>同一个上下文下，MicroTask会比MacroTask先运行</li>
<li>然后浏览器按照一个MacroTask任务，所有MicroTask的顺序运行，Node按照六个阶段的顺序运行，并在每个阶段后面都会运行MicroTask队列</li>
<li>同个MicroTask队列下<code>process.tick()</code>会优于<code>Promise</code>
</li>
</ol>
<p>Event loop还是比较深奥的，深入进去会有很多有意思的东西，有任何问题还望不吝指出。</p>
<h4>参考文档：</h4>
<ol>
<li>《<a href="https://segmentfault.com/a/1190000010622146">什么是浏览器的事件循环（Event Loop）</a>》</li>
<li>《<a href="https://cnodejs.org/topic/5a9108d78d6e16e56bb80882" rel="nofollow noreferrer" target="_blank">不要混淆nodejs和浏览器中的event loop</a>》</li>
<li>《<a href="http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html" rel="nofollow noreferrer" target="_blank">Node 定时器详解</a>》</li>
<li>《<a href="https://segmentfault.com/a/1190000013660033">浏览器和Node不同的事件循环（Event Loop）</a>》</li>
<li>《<a href="http://lynnelv.github.io/js-event-loop-nodejs" rel="nofollow noreferrer" target="_blank">深入理解js事件循环机制（Node.js篇）</a>》</li>
<li>《<a href="https://juejin.im/post/5a623a11f265da3e2d33846b#heading-1" rel="nofollow noreferrer" target="_blank">JavaScript中的执行机制</a>》</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇文章教会你Event loop——浏览器和Node

## 原文链接
[https://segmentfault.com/a/1190000013861128](https://segmentfault.com/a/1190000013861128)


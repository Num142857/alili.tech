---
title: 带你彻底弄懂Event Loop
hidden: true
categories: [reprint]
slug: bc9bb1af
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>我在学习浏览器和NodeJS的Event Loop时看了大量的文章，那些文章都写的很好，但是往往是每篇文章有那么几个关键的点，很多篇文章凑在一起综合来看，才可以对这些概念有较为深入的理解。</p>
<p>于是，我在看了大量文章之后，想要写这么一篇博客，不采用官方的描述，结合自己的理解以及示例代码，用最通俗的语言表达出来。希望大家可以通过这篇文章，了解到Event Loop到底是一种什么机制，浏览器和NodeJS的Event Loop又有什么区别。如果在文中出现书写错误的地方，欢迎大家留言一起探讨。</p>
<p>（PS：说到Event Loop肯定会提到Promise，我根据Promise A+规范自己实现了一个简易Promise库，<a href="https://github.com/leocoder351/my-promise" rel="nofollow noreferrer" target="_blank">源码</a>放到Github上，大家有需要的可以当做参考，后续我也会也写一篇博客来讲Promise，如果对你有用，就请给个Star吧~）</p>
<h1 id="articleHeader1">正文</h1>
<h2 id="articleHeader2">Event Loop是什么</h2>
<p><strong>event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。</strong></p>
<ul>
<li>浏览器的Event Loop是在<a href="https://www.w3.org/TR/html5/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">html5的规范</a>中明确定义。</li>
<li>NodeJS的Event Loop是基于libuv实现的。可以参考Node的<a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/" rel="nofollow noreferrer" target="_blank">官方文档</a>以及libuv的<a href="http://docs.libuv.org/en/v1.x/design.html" rel="nofollow noreferrer" target="_blank">官方文档</a>。</li>
<li>libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商。</li>
</ul>
<h2 id="articleHeader3">宏队列和微队列</h2>
<p><strong>宏队列，macrotask，也叫tasks。</strong> 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：</p>
<ul>
<li>setTimeout</li>
<li>setInterval</li>
<li>setImmediate (Node独有)</li>
<li>requestAnimationFrame (浏览器独有)</li>
<li>I/O</li>
<li>UI rendering (浏览器独有)</li>
</ul>
<p><strong>微队列，microtask，也叫jobs。</strong> 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：</p>
<ul>
<li>process.nextTick (Node独有)</li>
<li>Promise</li>
<li>Object.observe</li>
<li>MutationObserver</li>
</ul>
<p>（注：这里只针对浏览器和NodeJS）</p>
<h2 id="articleHeader4">浏览器的Event Loop</h2>
<p>我们先来看一张图，再看完这篇文章后，请返回来再仔细看一下这张图，相信你会有更深的理解。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016278118?w=710&amp;h=749" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="browser-eventloop" title="browser-eventloop" style="cursor: pointer;"></span></p>
<p>这张图将浏览器的Event Loop完整的描述了出来，我来讲执行一个JavaScript代码的具体流程：</p>
<ol>
<li>执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；</li>
<li>全局Script代码执行完毕后，调用栈Stack会清空；</li>
<li>从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；</li>
<li>继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。<strong>注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行</strong>；</li>
<li>microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；</li>
<li>取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；</li>
<li>执行完毕后，调用栈Stack为空；</li>
<li>重复第3-7个步骤；</li>
<li>重复第3-7个步骤；</li>
<li>......</li>
</ol>
<p><strong>可以看到，这就是浏览器的事件循环Event Loop</strong></p>
<p>这里归纳3个重点：</p>
<ol>
<li>宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；</li>
<li>微任务队列中所有的任务都会被依次取出来执行，知道microtask queue为空；</li>
<li>图中没有画UI rendering的节点，因为这个是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。</li>
</ol>
<p>好了，概念性的东西就这么多，来看几个示例代码，测试一下你是否掌握了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
  });
});

<span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)
  resolve(<span class="hljs-number">5</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data);
})

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>);
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>);</code></pre>
<p>这里结果会是什么呢？运用上面了解到的知识，先自己做一下试试看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确答案
1
4
7
5
2
3
6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 正确答案</span>
<span class="hljs-number">1</span>
<span class="hljs-number">4</span>
<span class="hljs-number">7</span>
<span class="hljs-number">5</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">6</span></code></pre>
<p>你答对了吗？</p>
<p>我们来分析一下整个流程：</p>
<hr>
<ul><li>执行全局Script代码</li></ul>
<hr>
<p><strong>Step 1</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span>)</code></pre>
<p>Stack Queue: [console]</p>
<p>Macrotask Queue: []</p>
<p>Microtask Queue: []</p>
<blockquote>打印结果：     <br>1</blockquote>
<p><strong>Step 2</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
  // 这个回调函数叫做callback1，setTimeout属于macrotask，所以放到macrotask queue中
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> 这个回调函数叫做callback1，setTimeout属于macrotask，所以放到macrotask queue中
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
  });
});</code></pre>
<p>Stack Queue: [setTimeout]</p>
<p>Macrotask Queue: [callback1]</p>
<p>Microtask Queue: []</p>
<blockquote>打印结果：     <br>1</blockquote>
<p><strong>Step 3</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
  // 注意，这里是同步执行的，如果不太清楚，可以去看一下我开头自己实现的promise啦~~
  console.log(4)
  resolve(5)
}).then((data) => {
  // 这个回调函数叫做callback2，promise属于microtask，所以放到microtask queue中
  console.log(data);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> 注意，这里是同步执行的，如果不太清楚，可以去看一下我开头自己实现的promise啦~~
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)
  resolve(<span class="hljs-number">5</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> 这个回调函数叫做callback2，promise属于microtask，所以放到microtask queue中
  <span class="hljs-built_in">console</span>.log(data);
})</code></pre>
<p>Stack Queue: [promise]</p>
<p>Macrotask Queue: [callback1]</p>
<p>Microtask Queue: [callback2]</p>
<blockquote>打印结果：     <br>1      <br>4</blockquote>
<p><strong>Step 5</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
  // 这个回调函数叫做callback3，setTimeout属于macrotask，所以放到macrotask queue中
  console.log(6);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> 这个回调函数叫做callback3，setTimeout属于macrotask，所以放到macrotask queue中
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>);
})</code></pre>
<p>Stack Queue: [setTimeout]</p>
<p>Macrotask Queue: [callback1, callback3]</p>
<p>Microtask Queue: [callback2]</p>
<blockquote>打印结果：     <br>1      <br>4</blockquote>
<p><strong>Step 6</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(7)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-number">7</span>)</code></pre>
<p>Stack Queue: [console]</p>
<p>Macrotask Queue: [callback1, callback3]</p>
<p>Microtask Queue: [callback2]</p>
<blockquote>打印结果：     <br>1      <br>4    <br>7</blockquote>
<hr>
<ul><li>好啦，全局Script代码执行完了，进入下一个步骤，从microtask queue中依次取出任务执行，直到microtask queue队列为空。</li></ul>
<hr>
<p><strong>Step 7</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(data)       // 这里data是Promise的决议值5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>)       // 这里<span class="hljs-keyword">data</span>是Promise的决议值<span class="hljs-number">5</span></code></pre>
<p>Stack Queue: [callback2]</p>
<p>Macrotask Queue: [callback1, callback3]</p>
<p>Microtask Queue: []</p>
<blockquote>打印结果：     <br>1      <br>4    <br>7    <br>5</blockquote>
<hr>
<ul><li>这里microtask queue中只有一个任务，执行完后开始从宏任务队列macrotask queue中取位于队首的任务执行</li></ul>
<hr>
<p><strong>Step 8</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>)</code></pre>
<p>Stack Queue: [callback1]</p>
<p>Macrotask Queue: [callback3]</p>
<p>Microtask Queue: []</p>
<blockquote>打印结果：     <br>1      <br>4    <br>7    <br>5    <br>2</blockquote>
<p>但是，执行callback1的时候又遇到了另一个Promise，Promise异步执行完后在microtask queue中又注册了一个callback4回调函数</p>
<p><strong>Step 9</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve().then(() => {
  // 这个回调函数叫做callback4，promise属于microtask，所以放到microtask queue中
  console.log(3)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> 这个回调函数叫做callback4，promise属于microtask，所以放到microtask queue中
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
});</code></pre>
<p>Stack Queue: [promise]</p>
<p>Macrotask v: [callback3]</p>
<p>Microtask Queue: [callback4]</p>
<blockquote>打印结果：     <br>1      <br>4    <br>7    <br>5    <br>2</blockquote>
<hr>
<ul><li>取出一个宏任务macrotask执行完毕，然后再去微任务队列microtask queue中依次取出执行</li></ul>
<hr>
<p><strong>Step 10</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-number">3</span>)</code></pre>
<p>Stack Queue: [callback4]</p>
<p>Macrotask Queue: [callback3]</p>
<p>Microtask Queue: []</p>
<blockquote>打印结果：     <br>1      <br>4    <br>7    <br>5    <br>2    <br>3</blockquote>
<hr>
<ul><li>微任务队列全部执行完，再去宏任务队列中取第一个任务执行</li></ul>
<hr>
<p><strong>Step 11</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(6)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-number">6</span>)</code></pre>
<p>Stack Queue: [callback3]</p>
<p>Macrotask Queue: []</p>
<p>Microtask Queue: []</p>
<blockquote>打印结果：     <br>1      <br>4    <br>7    <br>5    <br>2    <br>3    <br>6</blockquote>
<hr>
<ul><li>以上，全部执行完后，Stack Queue为空，Macrotask Queue为空，Micro Queue为空</li></ul>
<hr>
<p>Stack Queue: []</p>
<p>Macrotask Queue: []</p>
<p>Microtask Queue: []</p>
<blockquote>最终打印结果：     <br>1      <br>4    <br>7    <br>5    <br>2    <br>3    <br>6</blockquote>
<p>因为是第一个例子，所以这里分析的比较详细，大家仔细看一下，接下来我们再来一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
  
  Promise.resolve().then(() => {
    console.log(6)
  }).then(() => {
    console.log(7)
    
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

setTimeout(() => {
  console.log(9);
})

console.log(10);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
  });
});

<span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)
  resolve(<span class="hljs-number">5</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data);
  
  Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>)
  }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>)
    
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>)
    }, <span class="hljs-number">0</span>);
  });
})

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">9</span>);
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">10</span>);
</code></pre>
<p>最终输出结果是什么呢？参考前面的例子，好好想一想......</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确答案
1
4
10
5
6
7
2
3
9
8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 正确答案</span>
<span class="hljs-number">1</span>
<span class="hljs-number">4</span>
<span class="hljs-number">10</span>
<span class="hljs-number">5</span>
<span class="hljs-number">6</span>
<span class="hljs-number">7</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">9</span>
<span class="hljs-number">8</span></code></pre>
<p>相信大家都答对了，这里的关键在前面已经提过：</p>
<p><strong>在执行微队列microtask queue中任务的时候，如果又产生了microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到microtask queue为空停止。</strong></p>
<p>注：当然如果你在microtask中不断的产生microtask，那么其他宏任务macrotask就无法执行了，但是这个操作也不是无限的，拿NodeJS中的微任务process.nextTick()来说，它的上限是1000个，后面我们会讲到。</p>
<p>浏览器的Event Loop就说到这里，下面我们看一下NodeJS中的Event Loop，它更复杂一些，机制也不太一样。</p>
<h2 id="articleHeader5">NodeJS中的Event Loop</h2>
<h3 id="articleHeader6">libuv</h3>
<p>先来看一张libuv的结构图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016278119?w=800&amp;h=316" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="node-libuv" title="node-libuv" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">NodeJS中的宏队列和微队列</h3>
<p>NodeJS的Event Loop中，执行宏队列的回调任务有<strong>6个阶段</strong>，如下图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016278120?w=670&amp;h=339" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="node-eventloop-6phase" title="node-eventloop-6phase" style="cursor: pointer;"></span></p>
<p>各个阶段执行的任务如下：</p>
<ul>
<li>
<strong>timers阶段</strong>：这个阶段执行setTimeout和setInterval预定的callback</li>
<li>
<strong>I/O callback阶段</strong>：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks</li>
<li>
<strong>idle, prepare阶段</strong>：仅node内部使用</li>
<li>
<strong>poll阶段：获取新的I/O事件</strong>，适当的条件下node将阻塞在这里</li>
<li>
<strong>check阶段</strong>：执行setImmediate()设定的callbacks</li>
<li>
<strong>close callbacks阶段</strong>：执行socket.on('close', ....)这些callbacks</li>
</ul>
<p><strong>NodeJS中宏队列主要有4个</strong></p>
<p>由上面的介绍可以看到，回调事件主要位于4个macrotask queue中：</p>
<ol>
<li>Timers Queue</li>
<li>IO Callbacks Queue</li>
<li>Check Queue</li>
<li>Close Callbacks Queue</li>
</ol>
<p>这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。</p>
<p><strong>NodeJS中微队列主要有2个</strong>：</p>
<ol>
<li>Next Tick Queue：是放置process.nextTick(callback)的回调任务的</li>
<li>Other Micro Queue：放置其他microtask，比如Promise等</li>
</ol>
<p>在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。</p>
<p>具体可以通过下图加深一下理解：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016278121?w=951&amp;h=526" src="https://static.alili.tech/img/remote/1460000016278121?w=951&amp;h=526" alt="node-eventloop" title="node-eventloop" style="cursor: pointer; display: inline;"></span></p>
<p>大体解释一下NodeJS的Event Loop过程：</p>
<ol>
<li>执行全局Script的同步代码</li>
<li>执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务</li>
<li>开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2</li>
<li>Timers Queue -&gt; 步骤2 -&gt; I/O Queue -&gt; 步骤2 -&gt; Check Queue -&gt; 步骤2 -&gt; Close Callback Queue -&gt; 步骤2 -&gt; Timers Queue ......</li>
<li>这就是Node的Event Loop</li>
</ol>
<p><strong>关于NodeJS的macrotask queue和microtask queue，我画了两张图，大家作为参考：</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016278122?w=420&amp;h=433" src="https://static.alili.tech/img/remote/1460000016278122?w=420&amp;h=433" alt="node-microtaskqueue" title="node-microtaskqueue" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016278123?w=676&amp;h=449" src="https://static.alili.tech/img/remote/1460000016278123?w=676&amp;h=449" alt="node-macrotaskqueue" title="node-macrotaskqueue" style="cursor: pointer; display: inline;"></span></p>
<p>好啦，概念理解了我们通过几个例子来实战一下：</p>
<p>第一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('start');

setTimeout(() => {          // callback1
  console.log(111);
  setTimeout(() => {        // callback2
    console.log(222);
  }, 0);
  setImmediate(() => {      // callback3
    console.log(333);
  })
  process.nextTick(() => {  // callback4
    console.log(444);  
  })
}, 0);

setImmediate(() => {        // callback5
  console.log(555);
  process.nextTick(() => {  // callback6
    console.log(666);  
  })
})

setTimeout(() => {          // callback7              
  console.log(777);
  process.nextTick(() => {  // callback8
    console.log(888);   
  })
}, 0);

process.nextTick(() => {    // callback9
  console.log(999);  
})

console.log('end');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {          <span class="hljs-regexp">//</span> callback1
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">111</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {        <span class="hljs-regexp">//</span> callback2
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">222</span>);
  }, <span class="hljs-number">0</span>);
  setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {      <span class="hljs-regexp">//</span> callback3
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">333</span>);
  })
  process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  <span class="hljs-regexp">//</span> callback4
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">444</span>);  
  })
}, <span class="hljs-number">0</span>);

setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {        <span class="hljs-regexp">//</span> callback5
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">555</span>);
  process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  <span class="hljs-regexp">//</span> callback6
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">666</span>);  
  })
})

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {          <span class="hljs-regexp">//</span> callback7              
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">777</span>);
  process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  <span class="hljs-regexp">//</span> callback8
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">888</span>);   
  })
}, <span class="hljs-number">0</span>);

process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {    <span class="hljs-regexp">//</span> callback9
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">999</span>);  
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);</code></pre>
<p>请运用前面学到的知识，仔细分析一下......</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确答案
start
end
999
111
777
444
888
555
333
666
222" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 正确答案</span>
start
end
<span class="hljs-number">999</span>
<span class="hljs-number">111</span>
<span class="hljs-number">777</span>
<span class="hljs-number">444</span>
<span class="hljs-number">888</span>
<span class="hljs-number">555</span>
<span class="hljs-number">333</span>
<span class="hljs-number">666</span>
<span class="hljs-number">222</span></code></pre>
<hr>
<hr>
<blockquote><strong>跟新 2018.9.20</strong></blockquote>
<p>上面这段代码你执行的结果可能会有多种情况，原因解释如下。</p>
<ul>
<li>setTimeout(fn, 0)不是严格的0，一般是setTimeout(fn, 3)或什么，会有一定的延迟时间，当setTimeout(fn, 0)和setImmediate(fn)出现在同一段同步代码中时，就会存在两种情况。</li>
<li>
<strong>第1种情况</strong>：同步代码执行完了，Timer还没到期，setImmediate回调先注册到Check Queue中，开始执行微队列，然后是宏队列，先从Timers Queue中开始，发现没回调，往下走直到Check Queue中有回调，执行，然后timer到期（只要在执行完Timer Queue后到期效果就都一样），timer回调注册到Timers Queue中，下一轮循环执行到Timers Queue中才能执行那个timer 回调；<strong>所以，这种情况下，setImmediate(fn)回调先于setTimeout(fn, 0)回调执行</strong>。</li>
<li>
<strong>第2种情况</strong>：同步代码还没执行完，timer先到期，timer回调先注册到Timers Queue中，执行到setImmediate了，它的回调再注册到Check Queue中。 然后，同步代码执行完了，执行微队列，然后开始先执行Timers Queue，先执行Timer 回调，再到Check Queue，执行setImmediate回调；<strong>所以，这种情况下，setTimeout(fn, 0)回调先于setImmediate(fn)回调执行</strong>。</li>
<li>所以，在同步代码中同时调setTimeout(fn, 0)和setImmediate情况是不确定的，但是如果把他们放在一个IO的回调，比如readFile('xx', function () {// ....})回调中，那么IO回调是在IO Queue中，setTimeout到期回调注册到Timers Queue，setImmediate回调注册到Check Queue，IO Queue执行完到Check Queue，timer Queue得到下个周期，所以setImmediate回调这种情况下肯定比setTimeout(fn, 0)回调先执行。</li>
</ul>
<p>综上，这个例子是不太好的，setTimeout(fn, 0)和setImmediate(fn)如果想要保证结果唯一，就放在一个IO Callback中吧，上面那段代码可以把所有它俩同步执行的代码都放在一个IO Callback中，结果就唯一了。</p>
<p>更新结束</p>
<hr>
<hr>
<p>你答对了吗？我们来一起分析一下：</p>
<ul><li>执行全局Script代码，先打印<strong>start</strong>，向下执行，将setTimeout的回调callback1注册到Timers Queue中，再向下执行，将setImmediate的回调callback5注册到Check Queue中，接着向下执行，将setTimeout的回调callback7注册到Timers Queue中，继续向下，将process.nextTick的回调callback9注册到微队列Next Tick Queue中,最后一步打印<strong>end</strong>。此时，各个队列的回调情况如下：</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: [callback1, callback7]</p>
<p>Check Queue: [callback5]</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: [callback9]</p>
<p>Other Microtask Queue: []</p>
<blockquote>打印结果    <br>start    <br>end</blockquote>
<ul><li>全局Script执行完了，开始依次执行微任务Next Tick Queue中的全部回调任务。此时Next Tick Queue中只有一个callback9，将其取出放入调用栈中执行，打印<strong>999</strong>。</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: [callback1, callback7]</p>
<p>Check Queue: [callback5]</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: []</p>
<p>Other Microtask Queue: []</p>
<blockquote>打印结果    <br>start    <br>end   <br>999</blockquote>
<ul><li>开始依次执行6个阶段各自宏队列中的所有任务，先执行第1个阶段Timers Queue中的所有任务，先取出callback1执行，打印<strong>111</strong>，callback1函数继续向下，依次把callback2放入Timers Queue中，把callback3放入Check Queue中，把callback4放入Next Tick Queue中，然后callback1执行完毕。再取出Timers Queue中此时排在首位的callback7执行，打印<strong>777</strong>，把callback8放入Next Tick Queue中，执行完毕。此时，各队列情况如下：</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: [callback2]</p>
<p>Check Queue: [callback5, callback3]</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: [callback4, callback8]</p>
<p>Other Microtask Queue: []</p>
<blockquote>打印结果    <br>start    <br>end   <br>999    <br>111    <br>777</blockquote>
<ul><li>6个阶段每阶段的宏任务队列执行完毕后，都会开始执行微任务，此时，先取出Next Tick Queue中的所有任务执行，callback4开始执行，打印<strong>444</strong>，然后callback8开始执行，打印<strong>888</strong>，Next Tick Queue执行完毕，开始执行Other Microtask Queue中的任务，因为里面为空，所以继续向下。</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: [callback2]</p>
<p>Check Queue: [callback5, callback3]</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: []</p>
<p>Other Microtask Queue: []</p>
<blockquote>打印结果    <br>start    <br>end   <br>999    <br>111    <br>777    <br>444    <br>888</blockquote>
<ul><li>第2个阶段IO Callback Queue队列为空，跳过，第3和第4个阶段一般是Node内部使用，跳过，进入第5个阶段Check Queue。取出callback5执行，打印<strong>555</strong>，把callback6放入Next Tick Queue中，执行callback3，打印<strong>333</strong>。</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: [callback2]</p>
<p>Check Queue: []</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: [callback6]</p>
<p>Other Microtask Queue: []</p>
<blockquote>打印结果    <br>start    <br>end   <br>999    <br>111    <br>777    <br>444    <br>888   <br>555    <br>333</blockquote>
<ul><li>执行微任务队列，先执行Next Tick Queue，取出callback6执行，打印<strong>666</strong>，执行完毕，因为Other Microtask Queue为空，跳过。</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: [callback2]</p>
<p>Check Queue: []</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: [callback6]</p>
<p>Other Microtask Queue: []</p>
<blockquote>打印结果    <br>start    <br>end   <br>999    <br>111    <br>777    <br>444    <br>888   <br>555    <br>333</blockquote>
<ul><li>执行第6个阶段Close Callback Queue中的任务，为空，跳过，好了，此时一个循环已经结束。进入下一个循环，执行第1个阶段Timers Queue中的所有任务，取出callback2执行，打印<strong>222</strong>，完毕。此时，所有队列包括宏任务队列和微任务队列都为空，不再打印任何东西。</li></ul>
<p><strong>宏队列</strong></p>
<p>Timers Queue: []</p>
<p>Check Queue: []</p>
<p>IO Callback Queue： []</p>
<p>Close Callback Queue: []</p>
<p><strong>微队列</strong></p>
<p>Next Tick Queue: [callback6]</p>
<p>Other Microtask Queue: []</p>
<blockquote>最终结果    <br>start    <br>end   <br>999    <br>111   <br>777    <br>444    <br>888   <br>555    <br>333       <br>666    <br>222</blockquote>
<p>以上就是这道题目的详细分析，如果没有明白，一定要多看几次。</p>
<hr>
<p>下面引入Promise再来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})
process.nextTick(function() {
  console.log('6');
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
    })
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
        resolve();
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'5'</span>)
    })
})

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'7'</span>);
    resolve();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'8'</span>)
})
process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'6'</span>);
})

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'9'</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'10'</span>);
    })
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'11'</span>);
        resolve();
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'12'</span>)
    })
})</code></pre>
<p>大家仔细分析，相比于上一个例子，这里由于存在Promise，所以Other Microtask Queue中也会有回调任务的存在，执行到微任务阶段时，先执行Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务，然后才会进入下一个阶段的宏任务。明白了这一点，相信大家都可以分析出来，下面直接给出正确答案，如有疑问，欢迎留言和我讨论。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确答案
1
7
6
8
2
4
9
11
3
10
5
12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 正确答案</span>
<span class="hljs-number">1</span>
<span class="hljs-number">7</span>
<span class="hljs-number">6</span>
<span class="hljs-number">8</span>
<span class="hljs-number">2</span>
<span class="hljs-number">4</span>
<span class="hljs-number">9</span>
<span class="hljs-number">11</span>
<span class="hljs-number">3</span>
<span class="hljs-number">10</span>
<span class="hljs-number">5</span>
<span class="hljs-number">12</span></code></pre>
<h3 id="articleHeader8">setTimeout 对比 setImmediate</h3>
<ul>
<li>setTimeout(fn, 0)在Timers阶段执行，并且是在poll阶段进行判断是否达到指定的timer时间才会执行</li>
<li>setImmediate(fn)在Check阶段执行</li>
</ul>
<p>两者的执行顺序要根据当前的执行环境才能确定：</p>
<ul>
<li>如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机</li>
<li>如果两者都不在主模块调用，即在一个I/O Circle中调用，那么setImmediate的回调永远先执行，因为会先到Check阶段</li>
</ul>
<h3 id="articleHeader9">setImmediate 对比 process.nextTick</h3>
<ul>
<li>setImmediate(fn)的回调任务会插入到宏队列Check Queue中</li>
<li>process.nextTick(fn)的回调任务会插入到微队列Next Tick Queue中</li>
<li>process.nextTick(fn)调用深度有限制，上限是1000，而setImmedaite则没有</li>
</ul>
<h1 id="articleHeader10">总结</h1>
<ol>
<li>浏览器的Event Loop和NodeJS的Event Loop是不同的，实现机制也不一样，不要混为一谈。</li>
<li>浏览器可以理解成只有1个宏任务队列和1个微任务队列，先执行全局Script代码，执行完同步代码调用栈清空后，从微任务队列中依次取出所有的任务放入调用栈执行，微任务队列清空后，从宏任务队列中只取位于队首的任务放入调用栈执行，注意这里和Node的区别，只取一个，然后继续执行微队列中的所有任务，再去宏队列取一个，以此构成事件循环。</li>
<li>NodeJS可以理解成有4个宏任务队列和2个微任务队列，但是执行宏任务时有6个阶段。先执行全局Script代码，执行完同步代码调用栈清空后，先从微任务队列Next Tick Queue中依次取出所有的任务放入调用栈中执行，再从微任务队列Other Microtask Queue中依次取出所有的任务放入调用栈中执行。然后开始宏任务的6个阶段，每个阶段都将该宏任务队列中的所有任务都取出来执行（注意，这里和浏览器不一样，浏览器只取一个），6个阶段执行完毕后，再开始执行微任务，以此构成事件循环。</li>
<li>MacroTask包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering</li>
<li>Microtask包括： process.nextTick(Node)、Promise、Object.observe、MutationObserver</li>
</ol>
<h3 id="articleHeader11">参考链接</h3>
<p><a href="https://cnodejs.org/topic/5a9108d78d6e16e56bb80882" rel="nofollow noreferrer" target="_blank">不要混淆nodejs和浏览器中的event loop</a><br><a href="https://github.com/SunShinewyf/issue-blog/issues/34#issuecomment-371106502" rel="nofollow noreferrer" target="_blank">node中的Event模块</a><br><a href="https://jsblog.insiderattack.net/promises-next-ticks-and-immediates-nodejs-event-loop-part-3-9226cbe7a6aa" rel="nofollow noreferrer" target="_blank">Promises, process.nextTick And setImmediate</a><br><a href="https://segmentfault.com/a/1190000013660033">浏览器和Node不同的事件循环</a><br><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a><br><a href="https://github.com/ccforward/cc/issues/47" rel="nofollow noreferrer" target="_blank">理解事件循环浅析</a></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016278115](https://segmentfault.com/a/1190000016278115)

## 原文标题
带你彻底弄懂Event Loop

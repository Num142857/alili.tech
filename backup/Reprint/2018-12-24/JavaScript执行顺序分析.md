---
title: 'JavaScript执行顺序分析' 
date: 2018-12-24 2:30:07
hidden: true
slug: 1lsilnwzcxm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>上星期面试被问到了事件执行顺序的问题，想起来之前看<code>《深入浅出Node.js》</code>时看到这一章就忽略了，这次来分析一下JavaScript的事件执行顺序。废话少说，正题开始。</p>
<h1 id="articleHeader1">单线程JavaScript</h1>
<p>首先我们要知道<code>JavaScript</code>是一门<strong>单线程解释型</strong>语言。这就意味着在同一个时间下，我们只能执行一条命令。之所以它是一门单线程语言，和它的用途有关。<br>JavaScript设计出来的初衷是为了增强浏览器与用户的交互，尤其是表单的交互，而之后的Ajax技术也是为了使表单的交互更加人性化而发明出来的。因为JavaScript是一门解释型的语言，而解释器内嵌于浏览器，这个解释器是单线程的。<br>之所以不设计成多线程是因为渲染网页的时候多线程容易引起死锁或者资源冲突等问题。但是浏览器本身是多线程的，比如解释运行JavaScript的同时还在加载网络资源。</p>
<p><a href="https://stackoverflow.com/questions/39879/why-doesnt-javascript-support-multithreading" rel="nofollow noreferrer" target="_blank">Why doesn't JavaScript support multithreading?</a></p>
<p>&lt;!-- more --&gt;</p>
<h1 id="articleHeader2">事件循环</h1>
<p>单线程就意味着如果你要运行很多命令，那么这些命令需要排序，一般情况下，这些命令是从上到下排序执行（因为解释器是从文件顶部开始）。比如以下代码是按照顺序执行的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;1&quot;);
console.log(&quot;2&quot;);
console.log(&quot;3&quot;);
//1
//2
//3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"1"</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"2"</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"3"</span>);
<span class="hljs-comment">//1</span>
<span class="hljs-comment">//2</span>
<span class="hljs-comment">//3</span></code></pre>
<hr>
<p>但是我们还有知道在JavaScript里有异步编程的说法，比如Ajax，setTimeout，setInterval或者ES6中的Promise，async，await。</p>
<h3 id="articleHeader3"><strong>那么什么是同步和异步呢？</strong></h3>
<p>一条命令的执行在计算机里的意思就是它此时在使用CPU等资源，那么因为想要获得CPU资源的命令有很多，而CPU执行命令也需要时间去运算获得结果，于是就有了同步异步的概念。</p>
<p><strong>同步就是在发出一个CPU请求时，在没有得到结果之前，该CPU请求就不返回。但是一旦调用返回，就得到返回值了。</strong></p>
<p><strong>异步表示CPU请求在发出之后，这个调用就直接返回了，所以没有返回结果。在运行结束后，需要通过一系列手段来获得返回值</strong></p>
<hr>
<p>这时候就要引入进程和线程的概念。</p>
<h3 id="articleHeader4">进程与线程</h3>
<h4>进程</h4>
<p>概念：<strong>进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。</strong></p>
<h4>线程</h4>
<p>由于进程对于CPU的使用是轮流的，那么就存在进程的切换，但是由于现在的程序都比较大，切换的开销很大会浪费CPU的资源，于是就发明了线程，把一个大的进程分解成多个线程共同执行。</p>
<h4>区别</h4>
<ul>
<li>进程是操作系统分配资源的最小单位，线程是程序执行的最小单位。</li>
<li>一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线；</li>
<li>进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)。</li>
<li>调度和切换：线程上下文切换比进程上下文切换要快得多。</li>
</ul>
<h4>举个例子</h4>
<p>假如我是鸣人，我想吃很多拉面，如果我一个人吃10碗的话，那我就是一个进程一个线程完成吃拉面这件事情。<br>但是如果我用9个分身和我一起吃10碗拉面，那我就是一个进程用9个线程去完成吃拉面这件事情。<br>而多进程这表示名人在一乐拉面里面吃拉面的同时，好色仙人在偷看妹子洗澡~ ~。好色仙人是单进程单线程去偷看的哦！</p>
<h3 id="articleHeader5">浏览器的线程</h3>
<p>浏览器的内核是多线程的，在内核控制下各线程相互配合以保持同步，一个浏览器通常由一下线程组成：</p>
<ul>
<li>GUI 渲染线程</li>
<li>JavaScript引擎线程</li>
<li>事件触发线程</li>
<li>异步http请求线程</li>
<li>EventLoop轮询的处理线程</li>
</ul>
<p>这些线程的作用：</p>
<ul>
<li>UI线程用于渲染页面</li>
<li>js线程用于执行js任务</li>
<li>浏览器事件触发线程用于控制交互，响应用户</li>
<li>http线程用于处理请求，ajax是委托给浏览器新开一个http线程</li>
<li>EventLoop处理线程用于轮询消息队列</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012220314?w=674&amp;h=368" src="https://static.alili.tech/img/remote/1460000012220314?w=674&amp;h=368" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">JavaScript事件循环和消息队列（浏览器环境）</h3>
<p>因为JavaScript是单线程的，而浏览器是多线程的，所以为了执行不同的同步异步的代码，JavaScript运行的环境采用里事件循环和消息队列来达到目的。<br><strong>每个线程的任务执行顺序都是FIFO(先进先出)</strong><br>在JavaScript运行的环境中，有一个负责程序本身的运行，作为主线程；另一个负责主线程与其他线程的通信，被称为<code>Event Loop 线程</code>。<br>每当主线程遇到异步的任务，把他们移入到<code>Event Loop 线程</code>，然后主线程继续运行，等到主线程完全运行完之后，再去<code>Event Loop 线程</code>拿结果。<br>而每个异步任务都包含着与它相关联的信息，比如运行状态，回调函数等。<br><span class="img-wrap"><img data-src="/img/remote/1460000006763057?w=581&amp;h=420" src="https://static.alili.tech/img/remote/1460000006763057?w=581&amp;h=420" alt="事件循环" title="事件循环" style="cursor: pointer;"></span><br>由此我们可以知道，同步任务和异步任务会被分发到不同的线程去执行。<br>现在我们就可以分析一下一下代码的运行结果了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(()=>{console.log(&quot;我才是第一&quot;);},0);
console.log(&quot;我是第一&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我才是第一"</span>);},<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我是第一"</span>);</code></pre>
<ol>
<li>因为setTimeout是异步的事件，所以主线程把它调入Event Loop线程进行注册。</li>
<li>主线程继续执行<code>console.log("我是第一");</code>
</li>
<li>主线程执行完毕，从Event Loop 线程读取回调函数。再执行<code>console.log("我才是第一");</code>;</li>
</ol>
<h3 id="articleHeader7">setTimeout 和 setInterval</h3>
<h4>setTimeout</h4>
<p>这里值得一提的是，<code>setTimeout(callback,0)</code>指的是主线程中的同步任务运行完了之后立刻由Event Loop 线程调入主线程。<br>而计时是在调入Event Loop线程注册时开始的，此时<code>setTimeout的回调函数执行时间</code>与主线程运行结束的时间相关。<br>关于setTimeout要补充的是，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。</p>
<h4>setInterval</h4>
<p>需要注意的是，此函数是每隔一段时间将回调函数放入Event Loop线程。<br><strong>一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了</strong></p>
<h4>
<code>micro-task（微任务）</code> 与 <code>macro-task（宏任务）</code>
</h4>
<p><code>Event Loop线程</code>中包含任务队列（用来对不同优先级的异步事件进行排序），而任务队列又分为<code>macro-task（宏任务）</code>与<code>micro-task（微任务）</code>，在最新标准中，它们被分别称为<code>task</code>与<code>jobs</code>。</p>
<ul>
<li>macro-task大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。</li>
<li>micro-task大概包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)</li>
<li>setTimeout/Promise等我们称之为<code>任务源</code>。而进入任务队列的是他们指定的具体执行任务（回调函数）。</li>
</ul>
<p>来自不同的任务源的任务会进入到不同的任务队列中，而不同的任务队列执行过程如下：<br>执行过程如下：<br>JavaScript引擎首先从<code>macro-task</code>中取出第一个任务，<br>执行完毕后，将<code>micro-task</code>中的所有任务取出，按顺序全部执行；<br>然后再从<code>macro-task</code>中取下一个，<br>执行完毕后，再次将<code>micro-task</code>中的全部取出；<br>循环往复，直到两个队列中的任务都取完。</p>
<h4>举个大例子</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;start&quot;);
var promise = new Promise((resolve) => {
    console.log(&quot;promise start..&quot;);
    resolve(&quot;promise&quot;);
}); //3
promise.then((val) => console.log(val));
setTimeout(()=>{console.log(&quot;setTime1&quot;)},0);
console.log(&quot;test end...&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"start"</span>);
var promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise start.."</span>);
    resolve(<span class="hljs-string">"promise"</span>);
}); <span class="hljs-regexp">//</span><span class="hljs-number">3</span>
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(val)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(val));
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setTime1"</span>)},<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test end..."</span>)</code></pre>
<p>这里我们按顺序来分析。</p>
<h5>第一轮</h5>
<ol>
<li>整体script代码作为一个宏任务进入主线程，运行<code>console.log("start");</code>。</li>
<li>然后遇到<code>Promises</code>直接运行<code>console.log("promise start..")</code>。</li>
<li>然后遇到<code>promise.then</code>，存入到<code>micro-task队列</code>中。</li>
<li>然后遇到<code>setTimeout</code>,存入到<code>macro-task队列</code>中。</li>
<li>于然后运行<code>console.log("test end...")</code>;</li>
<li>在这一轮中，宏任务运行结束，运行micro-task队列中的 <code>promise.then</code>，输出<code>promise</code>
</li>
</ol>
<h5>第二轮</h5>
<ol><li>取出<code>macro-task队列</code>中的<code>setTimeout</code>，运行<code>console.log("setTime1");</code>
</li></ol>
<h5>结果</h5>
<p>输出的顺序就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// start
// promise start
// test end...
// promise
//setTime1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// start</span>
<span class="hljs-comment">// promise start</span>
<span class="hljs-comment">// test end...</span>
<span class="hljs-comment">// promise</span>
<span class="hljs-comment">//setTime1</span></code></pre>
<h4>留一个案例你们去分析</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testSometing() {
    console.log(&quot;执行testSometing&quot;);
    return &quot;testSometing&quot;;
}

async function testAsync() {
    console.log(&quot;执行testAsync&quot;);
    return Promise.resolve(&quot;hello async&quot;);
}

async function test() {
    console.log(&quot;test start...&quot;);
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

var promise = new Promise((resolve) => {
    console.log(&quot;promise start..&quot;);
    resolve(&quot;promise&quot;);
}); //3
promise.then((val) => console.log(val));
setTimeout(()=>{console.log(&quot;setTime1&quot;)},3000);
console.log(&quot;test end...&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testSometing</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执行testSometing"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">"testSometing"</span>;
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执行testAsync"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"hello async"</span>);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test start..."</span>);
    <span class="hljs-keyword">const</span> v1 = <span class="hljs-keyword">await</span> testSometing();
    <span class="hljs-built_in">console</span>.log(v1);
    <span class="hljs-keyword">const</span> v2 = <span class="hljs-keyword">await</span> testAsync();
    <span class="hljs-built_in">console</span>.log(v2);
    <span class="hljs-built_in">console</span>.log(v1, v2);
}

test();

<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise start.."</span>);
    resolve(<span class="hljs-string">"promise"</span>);
}); <span class="hljs-comment">//3</span>
promise.then(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(val));
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setTime1"</span>)},<span class="hljs-number">3000</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test end..."</span>)</code></pre>
<h1 id="articleHeader8">感谢以下文章</h1>
<ul>
<li><a href="http://www.jianshu.com/p/12b9f73c5a4f#" rel="nofollow noreferrer" target="_blank">前端基础进阶（十二）：深入核心，详解事件循环机制</a></li>
<li>[[JavaScript] Macrotask Queue和Microtask Queue](<a href="http://www.jianshu.com/p/3ed992529cfc)" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/3ed9...</a>
</li>
<li><a href="http://blog.csdn.net/newfishcoder/article/details/70843741" rel="nofollow noreferrer" target="_blank">JavaScript运行机制（堆、栈、消息队列）</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop</a></li>
<li><a href="https://juejin.im/post/59e85eebf265da430d571f89" rel="nofollow noreferrer" target="_blank">这一次，彻底弄懂 JavaScript 执行机制</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript执行顺序分析

## 原文链接
[https://segmentfault.com/a/1190000012220307](https://segmentfault.com/a/1190000012220307)


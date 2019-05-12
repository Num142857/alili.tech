---
title: 'Javascript系列之javascript机制' 
date: 2018-12-08 2:30:30
hidden: true
slug: uy3d6j1nija
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JavaScript运行</h1>
<p>JavaScript引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行JavaScript程序.浏览器的内核是多线程的，它们在内核制控下相互配合以保持同步，一个浏览器至少实现三个常驻线程：javascript引擎线程，GUI渲染线程，浏览器事件触发线程。这些异步线程都会产生不同的异步的事件.<br><span class="img-wrap"><img data-src="/img/bV67vd?w=698&amp;h=399" src="https://static.alili.tech/img/bV67vd?w=698&amp;h=399" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>javascript引擎是基于事件驱动单线程执行的，JS引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS线程在运行JS程序。</li>
<li>GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行。但需要注意 GUI渲染线程与JS引擎是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。</li>
<li>事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理。（当线程中没有执行任何同步代码的前提下才会执行异步代码）</li>
</ol>
<h1 id="articleHeader1">JavaScript运行机制</h1>
<p>程序中跑两个线程，一个负责程序本身的运行，作为主线程； 另一个负责主线程与其他线程的的通信，被称为“Event Loop 线程" 。每当遇到异步任务，交给 EventLoop 线程，然后自己往后运行，等到主线程运行完后，再去 EventLoop 线程拿结果。</p>
<p>1）所有任务都在主线程上执行，形成一个执行栈（execution context stack）。</p>
<p>2）主线程之外，还存在一个"任务队列"（task queue）。系统把异步任务放到"任务队列"之中，然后继续执行后续的任务。</p>
<p>3）一旦"执行栈"中的所有任务执行完毕，系统就会读取"任务队列"。如果这个时候，异步任务已经结束了等待状态，就会从"任务队列"进入执行栈，恢复执行。</p>
<p>4）主线程不断重复上面的第三步。</p>
<p>"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当异步任务从"任务队列"回到执行栈，回调函数就会执行。"任务队列"是一个先进先出的数据结构，排在前面的事件，优先返回主线程。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动返回主线程。</p>
<h2 id="articleHeader2">Event Loop（事件循环)</h2>
<p>主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop。<br>Event Loop 是一个很重要的概念，指的是计算机系统的一种运行机制。JavaScript语言就采用这种机制，来解决单线程运行带来的一些问题。</p>
<p><span class="img-wrap"><img data-src="/img/bV67wF?w=601&amp;h=527" src="https://static.alili.tech/img/bV67wF?w=601&amp;h=527" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">异步setTimeout &amp; setInterval</h1>
<h2 id="articleHeader4">概念</h2>
<p>setTimeout：在指定的毫秒数后，将定时任务处理的函数添加到执行队列的队尾。<br>setInterval：按照指定的周期(以毫秒数计时)，将定时任务处理函数添加到执行队列的队尾。</p>
<p>从主线程的角度看，一个异步过程包括下面两个要素：</p>
<ul>
<li>发起函数(或叫注册函数)A</li>
<li>回调函数callbackFn</li>
</ul>
<p>它们都是在主线程上调用的，其中注册函数用来发起异步过程，回调函数用来处理结果。</p>
<p>例如setTimeout(fn, 1000)，其中的setTimeout就是异步过程的发起函数，fn是回调函数。用一句话概括：工作线程将消息放到消息队列，主线程通过事件循环过程去取消息。</p>
<ul>
<li>消息队列：消息队列是一个先进先出的队列，它里面存放着各种消息。</li>
<li>事件循环：事件循环是指主线程重复从消息队列中取消息、执行的过程。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV67w9?w=782&amp;h=368" src="https://static.alili.tech/img/bV67w9?w=782&amp;h=368" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript系列之javascript机制

## 原文链接
[https://segmentfault.com/a/1190000014051247](https://segmentfault.com/a/1190000014051247)


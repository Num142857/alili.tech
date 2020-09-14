---
title: 'JavaScript工作机制：第1部分' 
date: 2019-01-03 2:30:11
hidden: true
slug: d0223z1j1tq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JavaScript工作机制：第1部分</h1>
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@bigshaw" rel="nofollow noreferrer" target="_blank">网络埋伏纪事</a><br>链接：<a href="http://www.zcfy.cc/article/3965" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/3965</a><br>原文：<a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf" rel="nofollow noreferrer" target="_blank">https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf</a></p></blockquote>
<p>随着JavaScript越来越受欢迎，开发团队正在将其用在技术栈的各个方面，包括 - 前端、后端、混合应用、嵌入式设备等等。</p>
<p>如<a href="http://githut.info/" rel="nofollow noreferrer" target="_blank">GitHut统计</a>所示，JavaScript在GitHub中的活动存储库和总推送方面位于前列，在其他方面也不差。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818781" src="https://static.alili.tech/img/remote/1460000010818781" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>（<a href="https://madnight.github.io/githut/" rel="nofollow noreferrer" target="_blank">查看最新的GitHub语言统计信息</a>）。</p>
<p>如果项目越来越依赖于JavaScript，这意味着开发人员必须更深入地了解内部机制，才能利用语言和生态系统提供的所有技术，构建出惊艳的软件。</p>
<p>事实证明，虽然有很多开发人员每天都在使用JavaScript，但并不知道它的工作机制。</p>
<h2 id="articleHeader1">概述</h2>
<p>几乎所有人都已经听说过V8引擎的概念，大多数人都知道JavaScript是单线程的，或者是使用回调队列。</p>
<p>在这篇文章中，我们将详细介绍所有这些概念，并解释JavaScript的工作机制。通过了解这些细节，您将能够正确利用提供的API，编写更好的非阻塞应用程序。</p>
<p>如果您是一个JavaScript新手，此博文将帮助您了解为什么JavaScript与其他语言相比是如此“怪异”。</p>
<p>而如果您是一位经验丰富的JavaScript开发人员，希望能够提供与您每天使用的JavaScript运行时有关的一些新鲜见解。</p>
<h2 id="articleHeader2">JavaScript引擎</h2>
<p>JavaScript引擎的一个流行示例是Google的V8引擎。例如，V8引擎在Chrome和Node.js中使用。如下是它看起来像什么的一个简单视图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818782" src="https://static.alili.tech/img/remote/1460000010818782" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>引擎由两个主要组成部分组成：</p>
<ul>
<li>内存堆 - 这是内存分配发生的地方</li>
<li>调用栈 - 这是您的代码执行所在的栈帧</li>
</ul>
<h2 id="articleHeader3">运行时</h2>
<p>浏览器中已经有几个几乎所有JavaScript开发人员都会使用的API（比如 <code>setTimeout</code>）。不过，这些API不是由引擎提供的。</p>
<p>那么，它们是来自哪里呢？</p>
<p>事实证明，现实有点复杂。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818783" src="https://static.alili.tech/img/remote/1460000010818783" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>所以，除了引擎以外，实际上还有更多东西。有一些由浏览器提供的，称为Web API的东西，比如DOM、AJAX、setTimeout等等。还有超受欢迎的<strong>事件循环</strong>和<strong>回调队列</strong>。</p>
<h2 id="articleHeader4">调用栈</h2>
<p>JavaScript是一种单线程编程语言，这意味着它只有一个调用栈。因此，它一次只能做一件事。</p>
<p>调用栈是一种数据结构，它基本上是记录了我们处于程序中哪个地方。如果单步执行进一个函数，就把该函数放在栈顶。如果从函数返回，就把它从栈顶弹出。这就是栈所做的事情。</p>
<p>下面我们来看一个示例。看看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function multiply(x, y) {
    return x * y;
}

function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}

printSquare(5);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x * y;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printSquare</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">var</span> s = multiply(x, x);
    <span class="hljs-built_in">console</span>.log(s);
}

printSquare(<span class="hljs-number">5</span>);
</code></pre>
<p>引擎开始执行这段代码时，调用栈是空的。之后，步骤将是如下这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818784" src="https://static.alili.tech/img/remote/1460000010818784" alt="" title="" style="cursor: pointer;"></span></p>
<p>调用栈中的每个条目称为栈帧。</p>
<p>而这正是在异常被抛出时，栈跟踪被构造的方式 - 当异常发生时，它基本上是调用栈的状态。看看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    throw new Error('SessionStack will help you resolve crashes :)');
}

function bar() {
    foo();
}

function start() {
    bar();
}

start();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'SessionStack will help you resolve crashes :)'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    foo();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
    bar();
}

start();
</code></pre>
<p>如果是在Chrome中执行这段代码（假设此代码位于一个名为foo.js的文件中），则会产生以下栈跟踪信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818785" src="https://static.alili.tech/img/remote/1460000010818785" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>“<strong>爆栈</strong>” - 当达到最大调用栈大小时，就会发生这种情况。并且这非常容易发生，特别是如果使用递归而不充分测试代码时。请看如下示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    foo();
}

foo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    foo();
}</span>

<span class="hljs-title">foo</span><span class="hljs-params">()</span>;</span>
</code></pre>
<p>当引擎开始执行这段代码时，它首先调用函数“foo”。不过，这个函数是递归的，并且开始调用自身而没有任何终止条件。所以在执行的每个步骤中，相同的函数都被一次又一次地添加到调用栈中。看起来像这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818786" src="https://static.alili.tech/img/remote/1460000010818786" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然而，在某些时候，如果调用栈中的函数调用量超过了调用栈的实际大小，浏览器就会决定采取行动，抛出一个错误，看起来像这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818787" src="https://static.alili.tech/img/remote/1460000010818787" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在单个线程上运行代码可能很容易，因为您不必处理在多线程环境中出现的复杂场景，例如死锁。</p>
<p>但在单线程上运行也有很大限制。由于JavaScript有一个调用栈，<strong>当事情缓慢时会发生什么</strong>？</p>
<h2 id="articleHeader5">并发和事件循环</h2>
<p>当在调用栈中有函数调用需要大量时间才能处理完时，会发生什么？例如，假设想在浏览器中使用JavaScript进行一些复杂的图像转换。</p>
<p>你可能会问 - 这怎么就成了一个问题呢？原因是，在调用堆有函数要执行的同时，浏览器实际上不能做任何事情 - 它被阻塞了。这意味着浏览器无法渲染，它不能运行任何其他代码，它只是卡住了。如果想在应用中有流畅的UI，这会出问题。</p>
<p>而这不是唯一的问题。一旦浏览器开始处理调用栈中的许多任务，它可能会停止响应很长时间。大多数浏览器通过引发一个错误来采取行动，询问您是否要终止网页。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818788" src="https://static.alili.tech/img/remote/1460000010818788" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在，这不是最好的用户体验，对吧？</p>
<p>那么，如何执行繁重的代码，而不阻塞UI并且不会使浏览器无响应呢？好吧，解决方案是<strong>异步回调</strong>。</p>
<p>我将在教程的第2部分中详细介绍。敬请关注 ：）</p>
<hr>
<p>欢迎关注我的公众号，关注前端文章：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004841853" src="https://static.alili.tech/img/remote/1460000004841853" alt="justjavac微信公众号" title="justjavac微信公众号" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript工作机制：第1部分

## 原文链接
[https://segmentfault.com/a/1190000010818776](https://segmentfault.com/a/1190000010818776)


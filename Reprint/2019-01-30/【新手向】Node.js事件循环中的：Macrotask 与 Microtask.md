---
title: '【新手向】Node.js事件循环中的：Macrotask 与 Microtask' 
date: 2019-01-30 2:30:23
hidden: true
slug: f8iw24vnt1k
categories: [reprint]
---

{{< raw >}}

                    
<p>在Node学习过程中，不可避免的需要对事件循环机制做深入理解，其中Macrotask（大型任务）和Microtask（小型任务）比较令人困惑，在一番google之后，我发现了几篇资料能比较好地解释他们的原理。因此在这里汇总+搬运一下。</p>
<h3 id="articleHeader0">一句话解释</h3>
<p>在Nodejs事件循环机制中，有任务两个队列：Macrotask队列和Microtask队列。<strong>在一个事件循环里，这两个队列会分两步执行，第一步会固定地执行一个（且仅一个）Macrotask任务，第二步会执行整个Microtask队列中的所有任务。</strong>并且，在执行Microtask队列任务的时候，也允许加入新的Microtask任务，直到所有Microtask任务全部执行完毕，才会结束循环。</p>
<p>Macrotasks一般包括: <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code>, I/O, UI rendering；<br>Microtasks一般包括: <code>process.nextTick</code>, <code>Promises</code>, <code>Object.observe</code>, <code>MutationObserver</code>。</p>
<h3 id="articleHeader1">事件循环机制详解</h3>
<p>从一个事件循环开始，到结束会经历以下步骤：</p>
<ol>
<li><p>检查Macrotask队列，选择其中最早加入（即最老的）的任务X，设置为“目前运行的任务”。如果任务X不存在，那么直接跳到步骤4。</p></li>
<li><p>运行任务X，即运行对应的回调函数。</p></li>
<li><p>设置“目前运行的任务”为null，从Macrotask队列中移除任务X。</p></li>
<li>
<p>检查Microtask队列：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1）选择其中最老的任务a，如果任务a不存在，直接结束Microtask队列。
2）设置任务a为“目前运行的任务”，并执行。
3）设置“目前运行的任务”为null，从Microtask队列中移除任务a。
4）选择下一个最老的任务b，跳到步骤2）。
5）直到队列里没有剩余的任务，结束队列。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>）选择其中最老的任务a，如果任务a不存在，直接结束Microtask队列。
<span class="hljs-number">2</span>）设置任务a为“目前运行的任务”，并执行。
<span class="hljs-number">3</span>）设置“目前运行的任务”为null，从Microtask队列中移除任务a。
<span class="hljs-number">4</span>）选择下一个最老的任务b，跳到步骤<span class="hljs-number">2</span>）。
<span class="hljs-number">5</span>）直到队列里没有剩余的任务，结束队列。</code></pre>
</li>
<li><p>跳回步骤1，检查下一个Macrotask任务。</p></li>
</ol>
<p>关于事件循环步骤，参考文档中的《理解 Node.js 事件循环》这篇文章讲的非常好也非常详细，强烈推荐想了解的同学一定要看。</p>
<h3 id="articleHeader2">如何选用Macrotask或Microtask呢？</h3>
<p>可以这样简单理解：<strong>如果你想让一个任务立即执行，那么就把它设置为Microtask，除此之外都用Macrotask比较好。</strong>因为可以看出，虽然Node是异步非阻塞的，但在一个事件循环中，Microtask的执行方式基本上就是用同步的。</p>
<h3 id="articleHeader3">可能存在的问题</h3>
<p>相信读到这里你已经意识到，如果一个Microtask队列太长，或者执行过程中不断加入新的Microtask任务，会导致下一个Macrotask任务很久都执行不了。结果就是，你可能会遇到UI一直刷新不了，或者I/O任务一直完成不了。</p>
<p>应该是考虑到了这一点，至少Microtask任务中的<code>process.nextTick</code>任务，是被设置了（在一个事件循环中的）最大调用次数的，叫<code>process.maxTickDepth</code>。默认是1000。一定程度上避免了上述情况。</p>
<h3 id="articleHeader4">参考材料</h3>
<p><a href="http://www.zcfy.cc/article/node-js-at-scale-understanding-the-node-js-event-loop-risingstack-1652.html" rel="nofollow noreferrer" target="_blank">理解 Node.js 事件循环</a><br><a href="http://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context" rel="nofollow noreferrer" target="_blank">Difference between microtask and macrotask within an event loop context</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【新手向】Node.js事件循环中的：Macrotask 与 Microtask

## 原文链接
[https://segmentfault.com/a/1190000007710772](https://segmentfault.com/a/1190000007710772)


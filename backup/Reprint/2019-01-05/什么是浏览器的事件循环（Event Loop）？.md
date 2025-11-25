---
title: '什么是浏览器的事件循环（Event Loop）？' 
date: 2019-01-05 2:30:10
hidden: true
slug: jspac2304gh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文围绕浏览器的事件循环，而node.js有自己的另一套事件循环机制，不在本文讨论范围。网上的许多相关技术文章提到了<code>process.nextTick</code>和<code>setImmediate</code>两个node.js的API，这里不予讨论。</blockquote>
<hr>
<p>先看<a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">HTML标准</a>的一系列解释：</p>
<blockquote>为了协调<code>事件</code>（event），<code>用户交互</code>（user interaction），<code>脚本</code>（script），<code>渲染</code>（rendering），<code>网络</code>（networking）等，用户代理（user agent）必须使用<code>事件循环</code>（event loops）。<p>有两类事件循环：一种针对<code>浏览上下文</code>（browsing context），还有一种针对<code>worker</code>（web worker）。</p>
</blockquote>
<p>现在我们知道了浏览器运行时有一个叫<strong>事件循环</strong>的机制。</p>
<blockquote>一个事件循环有一个或者多个<code>任务队列</code>（task queues）。任务队列是task的有序列表，这些task是以下工作的对应算法：Events，Parsing，Callbacks，Using a resource，Reacting to DOM manipulation。<p>每一个任务都来自一个特定的<code>任务源</code>（task source）。所有来自一个特定任务源并且属于特定事件循环的任务，通常必须被加入到同一个任务队列中，但是来自不同任务源的任务可能会放在不同的任务队列中。</p>
<p>举个例子，用户代理有一个处理鼠标和键盘事件的任务队列。用户代理可以给这个队列比其他队列多3/4的执行时间，以确保交互的响应而不让其他任务队列饿死（starving），并且不会乱序处理任何一个任务队列的事件。</p>
<p>每个事件循环都有一个进入<code>microtask</code>检查点（performing a microtask checkpoint）的flag标志，这个标志初始为false。它被用来组织反复调用‘进入microtask检查点’的算法。</p>
</blockquote>
<p>总结一下，一个事件循环里有很多个任务队列（task queues）来自不同任务源，每一个任务队列里的任务是严格按照先进先出的顺序执行的，但是不同任务队列的任务的执行顺序是不确定的。按我的理解就是，浏览器会自己<strong>调度</strong>不同任务队列。网上很多文章会提到<code>macrotask</code>这个概念，其实就是指代了标准里阐述的<code>task</code>。</p>
<p>标准同时还提到了<code>microtask</code>的概念，也就是微任务。看一下标准阐述的事件循环的进程模型：</p>
<blockquote><ol>
<li>选择当前要执行的任务队列，选择一个最先进入任务队列的任务，如果没有任务可以选择，则会跳转至microtask的执行步骤。</li>
<li>将事件循环的当前运行任务设置为已选择的任务。</li>
<li>运行任务。</li>
<li>将事件循环的当前运行任务设置为null。</li>
<li>将运行完的任务从任务队列中移除。</li>
<li>microtasks步骤：进入microtask检查点（performing a microtask checkpoint ）。</li>
<li>更新界面渲染。</li>
<li>返回第一步。</li>
</ol></blockquote>
<p>执行进入microtask检查点时，用户代理会执行以下步骤：</p>
<blockquote><ol>
<li>设置进入microtask检查点的标志为true。</li>
<li>当事件循环的微任务队列不为空时：选择一个最先进入microtask队列的microtask；设置事件循环的当前运行任务为已选择的microtask；运行microtask；设置事件循环的当前运行任务为null；将运行结束的microtask从microtask队列中移除。</li>
<li>对于相应事件循环的每个环境设置对象（environment settings object）,通知它们哪些promise为rejected。</li>
<li>清理indexedDB的事务。</li>
<li>设置进入microtask检查点的标志为false。</li>
</ol></blockquote>
<p><strong>现在我们知道了。在事件循环中，用户代理会不断从task队列中按顺序取task执行，每执行完一个task都会检查microtask队列是否为空（执行完一个task的具体标志是函数执行栈为空），如果不为空则会一次性执行完所有microtask。然后再进入下一个循环去task队列中取下一个task执行...</strong></p>
<p>那么哪些行为属于task或者microtask呢？标准没有阐述，但各种技术文章总结都如下：</p>
<ul>
<li>
<code>macrotasks</code>: script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering</li>
<li>
<code>microtasks</code>: process.nextTick, Promises, Object.observe(废弃), MutationObserver</li>
</ul>
<p>来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>);
}, <span class="hljs-number">0</span>);

<span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>);</code></pre>
<p>（代码来自<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a>，<strong>推荐观看原文的代码可视化执行步骤</strong>）</p>
<p>如果你测试的浏览器支持的Promise不支持Promise/A+标准，或是你使用了其他Promise polyfill，运行结果可能有差异。</p>
<p>运行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="script start
script end
promise1
promise2
setTimeout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">script</span> start
<span class="hljs-keyword">script</span> <span class="hljs-keyword">end</span>
promise1
promise2
setTimeout</code></pre>
<p>解释一下过程。</p>
<ol><li>一开始task队列中只有script，则script中所有函数放入函数执行栈执行，代码按顺序执行。</li></ol>
<p>接着遇到了<code>setTimeout</code>,<strong>它的作用是0ms后将回调函数放入task队列中</strong>，也就是说这个函数将在下一个事件循环中执行（注意这时候setTimeout执行完毕就返回了）。</p>
<ol>
<li>接着遇到了<code>Promise</code>，按照前面所述Promise属于microtask，所以第一个.then()会放入microtask队列。</li>
<li>当所有script代码执行完毕后，<strong>此时函数执行栈为空</strong>。开始检查microtask队列，此时队列不为空,执行.then()的回调函数输出'promise1'，由于.then()返回的依然是promise,所以第二个.then()会放入microtask队列继续执行,输出'promise2'。</li>
<li>此时microtask队列为空了，进入下一个事件循环，检查task队列发现了setTimeout的回调函数，立即执行回调函数输出'setTimeout'，代码执行完毕。</li>
</ol>
<p>继续看一个更有趣的例子：</p>
<p>HTML代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;outer&quot;>
  <div class=&quot;inner&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outer"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>JavaScript代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Let's get hold of those elements</span>
<span class="hljs-keyword">var</span> outer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.outer'</span>);
<span class="hljs-keyword">var</span> inner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);

<span class="hljs-comment">// Let's listen for attribute changes on the</span>
<span class="hljs-comment">// outer element</span>
<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mutate'</span>);
}).observe(outer, {
  <span class="hljs-attr">attributes</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// Here's a click listener…</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>);

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>);
  }, <span class="hljs-number">0</span>);

  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise'</span>);
  });

  outer.setAttribute(<span class="hljs-string">'data-random'</span>, <span class="hljs-built_in">Math</span>.random());
}

<span class="hljs-comment">// …which we'll attach to both elements</span>
inner.addEventListener(<span class="hljs-string">'click'</span>, onClick);
outer.addEventListener(<span class="hljs-string">'click'</span>, onClick);</code></pre>
<p>（代码来自<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a>，<strong>推荐观看原文的代码可视化执行步骤</strong>）<br>点击内框后，结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="click
promise
mutate
click
promise
mutate
timeout
timeout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>click
promise
mutate
click
promise
mutate
<span class="hljs-keyword">timeout</span>
<span class="hljs-keyword">timeout</span></code></pre>
<p>解释一下过程：<br>点击inner输出'click'，Promise和设置outer属性会依次把Promise和MutationObserver推入microtask队列，setTimeout则会推入task队列。此时执行栈为空，虽然后面还有冒泡触发，但是此时microtask队列会先执行，所以依次输入'promise'和'mutate'。接下来事件冒泡再次触发事件，过程和开始一样。接着代码执行完毕，此时进入下一次事件循环，执行task队列中的任务，输出两个'timeout'。</p>
<p>好了，如果你理解了这个，那么现在换一下事件触发的方式。在上面的代码后面加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inner.click()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">inner.<span class="hljs-built_in">click</span>()</code></pre>
<p>思考看看会有什么不同。</p>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="click
click
promise
mutate
promise
timeout
timeout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>click
click
promise
mutate
promise
<span class="hljs-keyword">timeout</span>
<span class="hljs-keyword">timeout</span></code></pre>
<p>造成这个差异的结果是什么呢？因为第一次执行完第一个click事件后函数执行栈并不为空。<br>具体代码运行解释，可以查看<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a>。</p>
<p>本文参考：<br><a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">html.spec.whatwg.org</a><br><a href="https://blog.keifergu.me/2017/03/23/difference-between-javascript-macrotask-and-microtask/" rel="nofollow noreferrer" target="_blank">difference-between-javascript-macrotask-and-microtask</a><br><a href="http://www.jianshu.com/p/1ee6c21f6efa" rel="nofollow noreferrer" target="_blank">Event loop</a></p>
<p>墙裂建议大家阅读HTML标准里阐述的Event Loop，欢迎指正和建议。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
什么是浏览器的事件循环（Event Loop）？

## 原文链接
[https://segmentfault.com/a/1190000010622146](https://segmentfault.com/a/1190000010622146)


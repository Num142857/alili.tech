---
title: '从setTimeout-setInterval看JS线程' 
date: 2018-12-10 2:30:07
hidden: true
slug: b4kdyfbtwqm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近项目中遇到了一个场景，其实很常见，就是定时获取接口刷新数据。那么问题来了，假设我设置的定时时间为1s，而数据接口返回大于1s，应该用同步阻塞还是异步？我们先整理下js中定时器的相关知识，再来看这个问题。</blockquote>
<h2 id="articleHeader0">初识setTimeout 与 setInterval</h2>
<blockquote>先来简单认识，后面我们试试用setTimeout 实现 setInterval 的功能</blockquote>
<ul><li>setTimeout 延迟一段时间执行一次 <strong>(Only one)</strong>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function, milliseconds, param1, param2, ...)
clearTimeout() // 阻止定时器运行

e.g.
setTimeout(function(){ alert(&quot;Hello&quot;); }, 3000); // 3s后弹出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>, <span class="hljs-title">milliseconds</span>, <span class="hljs-title">param1</span>, <span class="hljs-title">param2</span>, ...)
<span class="hljs-title">clearTimeout</span>(<span class="hljs-params"></span>) // 阻止定时器运行

<span class="hljs-title">e</span>.<span class="hljs-title">g</span>.
<span class="hljs-title">setTimeout</span>(<span class="hljs-params">function(</span>)</span>{ alert(<span class="hljs-string">"Hello"</span>); }, <span class="hljs-number">3000</span>); <span class="hljs-comment">// 3s后弹出</span></code></pre>
<ul><li>setInterval 每隔一段时间执行一次 <strong>(Many times)</strong>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setInterval(function, milliseconds, param1, param2, ...)

e.g.
setInterval(function(){ alert(&quot;Hello&quot;); }, 3000); // 每隔3s弹出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>, <span class="hljs-title">milliseconds</span>, <span class="hljs-title">param1</span>, <span class="hljs-title">param2</span>, ...)

<span class="hljs-title">e</span>.<span class="hljs-title">g</span>.
<span class="hljs-title">setInterval</span>(<span class="hljs-params">function(</span>)</span>{ alert(<span class="hljs-string">"Hello"</span>); }, <span class="hljs-number">3000</span>); <span class="hljs-comment">// 每隔3s弹出</span></code></pre>
<blockquote>setTimeout和setInterval的延时最小间隔是4ms（W3C在HTML标准中规定）；在JavaScript中没有任何代码是立刻执行的，但一旦进程空闲就尽快执行。这意味着无论是setTimeout还是setInterval，所设置的时间都只是n毫秒被添加到队列中，而不是过n毫秒后立即执行。</blockquote>
<h2 id="articleHeader1">进程与线程，傻傻分不清楚</h2>
<p>为了讲清楚这两个抽象的概念，我们借用阮大大借用的比喻，先来模拟一个场景:</p>
<ul>
<li>这里有一个大型工厂</li>
<li>工厂里有若干车间，每次只能有一个车间在作业</li>
<li>每个车间里有若干房间，有若干工人在流水线作业</li>
</ul>
<p>那么：</p>
<ul>
<li>一个工厂对应的就是计算机的一个CPU，平时讲的多核就代表多个工厂</li>
<li>每个工厂里的车间，就是<strong>进程</strong>，意味着同一时刻一个CPU只运行一个<strong>进程</strong>，其余<strong>进程</strong>在怠工</li>
<li>这个运行的车间（<strong>进程</strong>）里的工人，就是<strong>线程</strong>，可以有多个工人（<strong>线程</strong>）协同完成一个任务</li>
<li>车间（<strong>进程</strong>）里的房间，代表内存。</li>
</ul>
<p>再深入点：</p>
<ul>
<li>车间（<strong>进程</strong>）里工人可以随意在多个房间（内存）之间走动，意味着一个<strong>进程</strong>里，多个<strong>线程</strong>可以共享内存</li>
<li>部分房间（内存）有限，只允许一个工人（<strong>线程</strong>）使用，此时其他工人（<strong>线程</strong>）要等待</li>
<li>房间里有工人进去后上锁，其他工人需要等房间（内存）里的工人（<strong>线程</strong>）开锁出来后，才能才进去，这就是<strong>互斥锁</strong>（Mutual exclusion，缩写 Mutex）</li>
<li>有些房间只能容纳部分的人，意味着部分内存只能给有限的<strong>线程</strong>
</li>
</ul>
<p>再再深入:</p>
<ul>
<li>如果同时有多个车间作业，就是<strong>多进程</strong>
</li>
<li>如果一个车间里有多个工人协同作业，就是<strong>多线程</strong>
</li>
<li>当然不同车间之间的工人也可以有相互协作，就需要协调机制</li>
</ul>
<h2 id="articleHeader2">JavaScript 单线程</h2>
<p>总所周知，JavaScript 这门语言的核心特征，就是单线程（是指在<strong>JS引擎</strong>中负责解释和执行JavaScript代码的线程只有一个）。这和 JavaScript 最初设计是作为一门 GUI 编程语言有关，最初用于浏览器端，单一线程控制 GUI 是很普遍的做法。但这里特别要划个重点，虽然JavaScript是单线程，但<strong>浏览器是多线程的！！！</strong>例如Webkit或是Gecko引擎，可能有javascript引擎线程、界面渲染线程、浏览器事件触发线程、Http请求线程，读写文件的线程(例如在Node.js中)。ps：可能要总结一篇浏览器渲染的文章了。</p>
<blockquote>HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。</blockquote>
<h2 id="articleHeader3">同步与异步，傻傻分不清楚</h2>
<blockquote>之前阮大大写了一篇<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">《JavaScript 运行机制详解：再谈Event Loop》</a>，然后被<a href="https://app.yinxiang.com/shard/s8/sh/b72fe246-a89d-434b-85f0-a36420849b84/59bad790bdcf6b0a66b8b93d5eacbead" rel="nofollow noreferrer" target="_blank">朴灵评注</a>了，特别是同步异步的理解上，两位大牛有很大的歧义。</blockquote>
<ul><li>同步(synchronous)：假如一个函数返回时，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，这就是同步函数。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.g.
alert('马上能看到我拉');
console.log('也能马上看到我哦');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">e</span><span class="hljs-selector-class">.g</span>.
<span class="hljs-selector-tag">alert</span>(<span class="hljs-string">'马上能看到我拉'</span>);
<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'也能马上看到我哦'</span>);</code></pre>
<ul><li>异步(asynchronous)：假如一个函数返回时，调用者不能得到预期结果，需要通过一定手段才能获得，这就是异步函数。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.g.
setTimeout(function() {
    // 过一段时间才能执行我哦
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>e.g.
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 过一段时间才能执行我哦</span>
}, <span class="hljs-number">1000</span>);</code></pre>
<h3 id="articleHeader4">异步构成要素</h3>
<blockquote>一个异步过程通常是这样的：主线程发起一个异步请求，相应的工作线程（比如浏览器的其他线程）接收请求并告知主线程已收到(异步函数返回)；主线程可以继续执行后面的代码，同时工作线程执行异步任务；工作线程完成工作后，通知主线程；主线程收到通知后，执行一定的动作(调用回调函数)。</blockquote>
<ul>
<li>发起（注册）函数 -- 发起异步过程</li>
<li>回调函数 -- 处理结果</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.g.
setTimeout(fn, 1000);
// setTimeout就是异步过程的发起函数，fn是回调函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>e.g.
setTimeout(<span class="hljs-keyword">fn</span>, <span class="hljs-number">1000</span>);
<span class="hljs-regexp">//</span> setTimeout就是异步过程的发起函数，<span class="hljs-keyword">fn</span>是回调函数</code></pre>
<h2 id="articleHeader5">通信机制</h2>
<blockquote>异步过程的通信机制：工作线程将消息放到消息队列，主线程通过事件循环过程去取消息。</blockquote>
<h3 id="articleHeader6">消息队列 Message Queue</h3>
<blockquote>一个先进先出的队列，存放各类消息。</blockquote>
<h3 id="articleHeader7">事件循环 Event Loop</h3>
<blockquote>主线程（js线程）只会做一件事，就是从消息队列里面取消息、执行消息，再取消息、再执行。消息队列为空时，就会等待直到消息队列变成非空。只有当前的消息执行结束，才会去取下一个消息。这种机制就叫做事件循环机制<strong>Event Loop</strong>，取一个消息并执行的过程叫做一次循环。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV5mEF?w=800&amp;h=600" src="https://static.alili.tech/img/bV5mEF?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>工作线程是生产者，主线程是消费者。工作线程执行异步任务，执行完成后把对应的回调函数封装成一条消息放到消息队列中；主线程不断地从消息队列中取消息并执行，当消息队列空时主线程阻塞，直到消息队列再次非空。</blockquote>
<h2 id="articleHeader8">setTimeout(function, 0) 发生了什么</h2>
<p>其实到这儿，应该能很好解释setTimeout(function, 0) 这个常用的“奇技淫巧”了。很简单，就是为了将<code>function</code>里的任务异步执行，0不代表立即执行，而是将任务推到消息队列的最后，再由主线程的事件循环去调用它执行。</p>
<blockquote>HTML5 中规定setTimeout 的最小时间不是0ms，而是4ms。</blockquote>
<h2 id="articleHeader9">setInterval 缺点</h2>
<blockquote>再次强调，定时器指定的时间间隔，表示的是何时将定时器的代码添加到<strong>消息队列</strong>，而<strong>不是</strong>何时执行代码。所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setInterval(function, N)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">setInterval</span><span class="hljs-params">(function, N)</span></span></code></pre>
<p>那么显而易见，上面这段代码意味着，每隔N秒把function事件推到消息队列中，什么时候执行？母鸡啊！</p>
<p><span class="img-wrap"><img data-src="/img/bV5yai?w=660&amp;h=458" src="https://static.alili.tech/img/bV5yai?w=660&amp;h=458" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上图可见，setInterval每隔100ms往队列中添加一个事件；100ms后，添加T1定时器代码至队列中，主线程中还有任务在执行，所以等待，<code>some event</code>执行结束后执行T1定时器代码；又过了100ms，T2定时器被添加到队列中，主线程还在执行T1代码，所以等待；又过了100ms，理论上又要往队列里推一个定时器代码，但由于此时T2还在队列中，所以T3不会被添加，结果就是此时被跳过；这里我们可以看到，T1定时器执行结束后马上执行了T2代码，所以并没有达到定时器的效果。</p>
<p>综上所述，setInterval有两个缺点：</p>
<ul>
<li>使用setInterval时，某些间隔会被跳过；</li>
<li>可能多个定时器会连续执行；</li>
</ul>
<h3 id="articleHeader10">链式setTimeout</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function () {
    // 任务
    setTimeout(arguments.callee, interval);
}, interval)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 任务</span>
    setTimeout(<span class="hljs-built_in">arguments</span>.callee, interval);
}, interval)</code></pre>
<blockquote>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee" rel="nofollow noreferrer" target="_blank">警告</a>：在严格模式下，第5版 ECMAScript (ES5) 禁止使用 arguments.callee()。当一个函数必须调用自身的时候, 避免使用 arguments.callee(), 通过要么给函数表达式一个名字,要么使用一个函数声明.</blockquote>
<p>上述函数每次执行的时候都会创建一个新的定时器，第二个setTimeout使用了arguments.callee()获取当前函数的引用，并且为其设置另一个定时器。好处：</p>
<ul>
<li>在前一个定时器执行完前，不会向队列插入新的定时器（解决缺点一）</li>
<li>保证定时器间隔（解决缺点二）</li>
</ul>
<h2 id="articleHeader11">So...</h2>
<p>回顾最开始的业务场景的问题，用同步阻塞还是异步，答案已经出来了...</p>
<p>PS：其实还有macrotask与microtask等知识点没有提到，总结了那么多，其实JavaScript深入下去还有很多，任重而道远呀。</p>
<hr>
<p>参考:</p>
<p><a href="http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html" rel="nofollow noreferrer" target="_blank">进程与线程的一个简单解释 -- 阮大大</a></p>
<p><a href="https://juejin.im/post/5a221d35f265da43356291cc" rel="nofollow noreferrer" target="_blank">【译】JavaScript 如何工作的: 事件循环和异步编程的崛起 + 5 个关于如何使用 async/await 编写更好的技巧</a></p>
<blockquote>已同步至个人博客-<a href="http://palmer.arkstack.cn/2017/12/%5C%E4%BB%8EsetTimeout-setInterval%E7%9C%8BJS%E7%BA%BF%E7%A8%8B/" rel="nofollow noreferrer" target="_blank">软硬皆施</a><br><a href="https://github.com/palmerye/palmerye.github.io" rel="nofollow noreferrer" target="_blank">Github</a> 欢迎star :)</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从setTimeout-setInterval看JS线程

## 原文链接
[https://segmentfault.com/a/1190000013702430](https://segmentfault.com/a/1190000013702430)


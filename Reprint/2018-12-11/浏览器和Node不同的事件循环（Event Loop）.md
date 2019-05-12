---
title: '浏览器和Node不同的事件循环（Event Loop）' 
date: 2018-12-11 2:30:10
hidden: true
slug: ur3w5vdls9e
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">背景</h1>
<p>Event Loop也是js老生常谈的一个话题了。2月底看了阮一峰老师的《Node定时器详解》一文后，发现无法完全对标之前看过的js事件循环执行机制，又查阅了一些其他资料，记为笔记，感觉不妥，总结成文。</p>
<p><strong>浏览器中与node中事件循环与执行机制不同，不可混为一谈。</strong><br>浏览器的<a href="https://www.w3.org/TR/html5/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">Event loop</a>是在HTML5中定义的规范，而node中则由<a href="http://thlorenz.com/learnuv/book/history/history_1.html" rel="nofollow noreferrer" target="_blank">libuv</a>库实现。同时阅读《深入浅出nodeJs》一书时发现比较当时node机制已有不同，所以本文node部分针对为此文发布时版本。强烈推荐读下参考链接中的前三篇。</p>
<h1 id="articleHeader1">浏览器环境</h1>
<p>js执行为单线程（不考虑web worker），所有代码皆在执行线程调用栈完成执行。当执行线程任务清空后才会去轮询取任务队列中任务。</p>
<h2 id="articleHeader2">任务队列</h2>
<p>异步任务分为task（宏任务，也可称为macroTask）和microtask（微任务）两类。<br>当满足执行条件时，task和microtask会被放入各自的队列中等待放入执行线程执行，我们把这两个队列称为Task Queue(也叫Macrotask Queue)和Microtask Queue。</p>
<ul>
<li>task：script中代码、setTimeout、setInterval、I/O、UI render。</li>
<li>microtask: promise、Object.observe、MutationObserver。</li>
</ul>
<h2 id="articleHeader3">具体过程</h2>
<ol>
<li>执行完主执行线程中的任务。</li>
<li>取出Microtask Queue中任务执行直到清空。</li>
<li>取出Macrotask Queue中<strong>一个</strong>任务执行。</li>
<li>取出Microtask Queue中任务执行直到清空。</li>
<li>重复3和4。</li>
</ol>
<p>即为同步完成，一个宏任务，所有微任务，一个宏任务，所有微任务......</p>
<h2 id="articleHeader4">注意</h2>
<ul>
<li>在浏览器页面中可以认为初始执行线程中没有代码，每一个script标签中的代码是一个独立的task，即会执行完前面的script中创建的microtask再执行后面的script中的同步代码。</li>
<li>如果microtask一直被添加，则会继续执行microtask，“卡死”macrotask。</li>
<li>部分版本浏览器有执行顺序与上述不符的情况，可能是不符合标准或js与html部分标准冲突。可阅读参考文章中第一篇。</li>
<li>
<code>new Promise((resolve, reject) =&gt;{console.log(‘同步’);resolve()}).then(() =&gt; {console.log('异步')})</code>，即<code>promise</code>的<code>then</code>和<code>catch</code>才是microtask，本身的内部代码不是。</li>
<li>个别浏览器独有API未列出。</li>
</ul>
<h2 id="articleHeader5">伪代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while (true) {
  宏任务队列.shift()
  微任务队列全部任务()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-keyword">while</span> <span class="hljs-comment">(true)</span> {
  宏任务队列.shift<span class="hljs-comment">()</span>
  微任务队列全部任务<span class="hljs-comment">()</span>
}</code></pre>
<h1 id="articleHeader6">node环境</h1>
<p>js执行为单线程，所有代码皆在执行线程调用栈完成执行。当执行线程任务清空后才会去轮询取任务队列中任务。</p>
<h2 id="articleHeader7">循环阶段</h2>
<p>在node中事件<strong>每一轮</strong>循环按照<strong>顺序</strong>分为6个阶段，来自libuv的实现：</p>
<ol>
<li>timers：执行满足条件的setTimeout、setInterval回调。</li>
<li>I/O callbacks：是否有已完成的I/O操作的回调函数，来自上一轮的poll残留。</li>
<li>idle，prepare：可忽略</li>
<li>poll：等待还没完成的I/O事件，会因timers和超时时间等结束等待。</li>
<li>check：执行setImmediate的回调。</li>
<li>close callbacks：关闭所有的closing handles，一些onclose事件。</li>
</ol>
<h2 id="articleHeader8">执行机制</h2>
<h3 id="articleHeader9">几个队列</h3>
<p>除上述循环阶段中的任务类型，我们还剩下浏览器和node共有的microtask和node独有的<code>process.nextTick</code>，我们称之为Microtask Queue和NextTick Queue。</p>
<p>我们把循环中的几个阶段的执行队列也分别称为Timers Queue、I/O Queue、Check Queue、Close Queue。</p>
<h3 id="articleHeader10">循环之前</h3>
<p>在进入第一次循环之前，会先进行如下操作：</p>
<ul>
<li>同步任务</li>
<li>发出异步请求</li>
<li>规划定时器生效的时间</li>
<li>执行<code>process.nextTick()</code>
</li>
</ul>
<h3 id="articleHeader11">开始循环</h3>
<p>按照我们的循环的6个阶段依次执行，每次拿出当前阶段中的全部任务执行，清空NextTick Queue，清空Microtask Queue。再执行下一阶段，全部6个阶段执行完毕后，进入下轮循环。即：</p>
<ul>
<li>清空当前循环内的Timers Queue，清空NextTick Queue，清空Microtask Queue。</li>
<li>清空当前循环内的I/O Queue，清空NextTick Queue，清空Microtask Queue。</li>
<li>清空当前循环内的Check Queu，清空NextTick Queue，清空Microtask Queue。</li>
<li>清空当前循环内的Close Queu，清空NextTick Queue，清空Microtask Queue。</li>
<li>进入下轮循环。</li>
</ul>
<p>可以看出，<code>nextTick</code>优先级比<code>promise</code>等microtask高。<code>setTimeout</code>和<code>setInterval</code>优先级比<code>setImmediate</code>高。</p>
<h2 id="articleHeader12">注意</h2>
<ul>
<li>如果在timers阶段执行时创建了<code>setImmediate</code>则会在此轮循环的check阶段执行，如果在timers阶段创建了<code>setTimeout</code>，由于timers已取出完毕，则会进入下轮循环，check阶段创建timers任务同理。</li>
<li>
<code>setTimeout</code>优先级比<code>setImmediate</code>高，但是由于<code>setTimeout(fn,0)</code>的真正延迟不可能完全为0秒，可能出现先创建的<code>setTimeout(fn,0)</code>而比<code>setImmediate</code>的回调后执行的情况。</li>
</ul>
<h2 id="articleHeader13">伪代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while (true) {
  loop.forEach((阶段) => {
    阶段全部任务()
    nextTick全部任务()
    microTask全部任务()
  })
  loop = loop.next
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
  <span class="hljs-keyword">loop</span>.forEach(<span class="hljs-function"><span class="hljs-params">(阶段)</span> =&gt;</span> {
    阶段全部任务()
    nextTick全部任务()
    microTask全部任务()
  })
  <span class="hljs-keyword">loop</span> = <span class="hljs-keyword">loop</span>.next
}</code></pre>
<h1 id="articleHeader14">测试代码</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(time) {
  let startTime = new Date()
  while (new Date() - startTime < time) {}
  console.log('1s over')
}
setTimeout(() => {
  console.log('setTimeout - 1')
  setTimeout(() => {
      console.log('setTimeout - 1 - 1')
      sleep(1000)
  })
  new Promise(resolve => resolve()).then(() => {
      console.log('setTimeout - 1 - then')
      new Promise(resolve => resolve()).then(() => {
          console.log('setTimeout - 1 - then - then')
      })
  })
  sleep(1000)
})

setTimeout(() => {
  console.log('setTimeout - 2')
  setTimeout(() => {
      console.log('setTimeout - 2 - 1')
      sleep(1000)
  })
  new Promise(resolve => resolve()).then(() => {
      console.log('setTimeout - 2 - then')
      new Promise(resolve => resolve()).then(() => {
          console.log('setTimeout - 2 - then - then')
      })
  })
  sleep(1000)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">time</span>) </span>{
  <span class="hljs-keyword">let</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-keyword">while</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - startTime &lt; time) {}
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1s over'</span>)
}
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 1'</span>)
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 1 - 1'</span>)
      sleep(<span class="hljs-number">1000</span>)
  })
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 1 - then'</span>)
      <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 1 - then - then'</span>)
      })
  })
  sleep(<span class="hljs-number">1000</span>)
})

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 2'</span>)
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 2 - 1'</span>)
      sleep(<span class="hljs-number">1000</span>)
  })
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 2 - then'</span>)
      <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout - 2 - then - then'</span>)
      })
  })
  sleep(<span class="hljs-number">1000</span>)
})</code></pre>
<ul>
<li>
<p>浏览器输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout - 1 //1为单个task
1s over
setTimeout - 1 - then
setTimeout - 1 - then - then 
setTimeout - 2 //2为单个task
1s over
setTimeout - 2 - then
setTimeout - 2 - then - then
setTimeout - 1 - 1
1s over
setTimeout - 2 - 1
1s over" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>setTimeout - <span class="hljs-number">1</span> <span class="hljs-comment">//1为单个task</span>
<span class="hljs-number">1</span>s over
setTimeout - <span class="hljs-number">1</span> - then
setTimeout - <span class="hljs-number">1</span> - then - then 
setTimeout - <span class="hljs-number">2</span> <span class="hljs-comment">//2为单个task</span>
<span class="hljs-number">1</span>s over
setTimeout - <span class="hljs-number">2</span> - then
setTimeout - <span class="hljs-number">2</span> - then - then
setTimeout - <span class="hljs-number">1</span> - <span class="hljs-number">1</span>
<span class="hljs-number">1</span>s over
setTimeout - <span class="hljs-number">2</span> - <span class="hljs-number">1</span>
<span class="hljs-number">1</span>s over</code></pre>
</li>
<li>
<p>node输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout - 1 
1s over
setTimeout - 2 //1、2为单阶段task
1s over
setTimeout - 1 - then
setTimeout - 2 - then
setTimeout - 1 - then - then
setTimeout - 2 - then - then
setTimeout - 1 - 1
1s over
setTimeout - 2 - 1
1s over" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>setTimeout - <span class="hljs-number">1</span> 
<span class="hljs-number">1</span>s over
setTimeout - <span class="hljs-number">2</span> <span class="hljs-comment">//1、2为单阶段task</span>
<span class="hljs-number">1</span>s over
setTimeout - <span class="hljs-number">1</span> - then
setTimeout - <span class="hljs-number">2</span> - then
setTimeout - <span class="hljs-number">1</span> - then - then
setTimeout - <span class="hljs-number">2</span> - then - then
setTimeout - <span class="hljs-number">1</span> - <span class="hljs-number">1</span>
<span class="hljs-number">1</span>s over
setTimeout - <span class="hljs-number">2</span> - <span class="hljs-number">1</span>
<span class="hljs-number">1</span>s over</code></pre>
</li>
</ul>
<p>由此也可看出事件循环在浏览器和node中的不同。</p>
<h1 id="articleHeader15">参考文章</h1>
<ul>
<li>
<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a> 强烈推荐</li>
<li>
<a href="https://cnodejs.org/topic/5a9108d78d6e16e56bb80882" rel="nofollow noreferrer" target="_blank">不要混淆nodejs和浏览器中的event loop</a> 强烈推荐</li>
<li>
<a href="https://github.com/SunShinewyf/issue-blog/issues/34#issuecomment-371106502" rel="nofollow noreferrer" target="_blank">node中的Event模块</a> 强烈推荐</li>
<li><a href="https://github.com/ccforward/cc/issues/47" rel="nofollow noreferrer" target="_blank">理解事件循环一(浅析)</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html" rel="nofollow noreferrer" target="_blank">Node 定时器详解</a></li>
</ul>
<p>???</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浏览器和Node不同的事件循环（Event Loop）

## 原文链接
[https://segmentfault.com/a/1190000013660033](https://segmentfault.com/a/1190000013660033)


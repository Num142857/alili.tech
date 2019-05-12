---
title: 'Javascript事件循环机制以及渲染引擎何时渲染UI' 
date: 2018-12-14 2:30:11
hidden: true
slug: evffgu05xwo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>JavaScript的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。</blockquote>
<h2 id="articleHeader0">事件循环基本概念</h2>
<ul>
<li>JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。</li>
<li>一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。</li>
<li>任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。</li>
<li>macro-task大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。</li>
<li>micro-task大概包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)</li>
<li>setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// setTimeout中的回调函数才是进入任务队列的任务
setTimeout(function() {
    console.log('xxxx');
})
// 非常多的同学对于setTimeout的理解存在偏差。所以大概说一下误解：
// setTimeout作为一个任务分发器，这个函数会立即执行，而它所要分发的任务，也就是它的第一个参数，才是延迟执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// setTimeout中的回调函数才是进入任务队列的任务</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xxxx'</span>);
})
<span class="hljs-comment">// 非常多的同学对于setTimeout的理解存在偏差。所以大概说一下误解：</span>
<span class="hljs-comment">// setTimeout作为一个任务分发器，这个函数会立即执行，而它所要分发的任务，也就是它的第一个参数，才是延迟执行</span></code></pre>
<ul>
<li>来自不同任务源的任务会进入到不同的任务队列。其中setTimeout与setInterval是同源的。</li>
<li>其中每一个任务的执行，无论是macro-task还是micro-task，都是借助函数调用栈来完成。</li>
</ul>
<h2 id="articleHeader1">事件循环执行循序</h2>
<p><strong>事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(</strong>只剩全局<strong>)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之后，本轮循环结束。下一轮循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。</strong></p>
<p><strong>当我们在执行setTimeout任务中遇到setTimeout时，它仍然会将对应的任务分发到setTimeout队列中去，但是该任务就得等到下一轮事件循环执行。</strong></p>
<h3 id="articleHeader2">那么整个事件循环中何时进行ui render呢？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;div&quot;>
    begin
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"div"</span>&gt;</span>
    begin
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function() {
    // 应该是这里执行前开始渲染ui，试试用alert阻塞下。
    alert(' ui 已经渲染完毕了吗？ ');
    console.log('timeout1');
})

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 &amp;&amp; resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
    alert(' ui 开始渲染 ');
})

console.log('global1');

div.innerHTML = 'end';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 应该是这里执行前开始渲染ui，试试用alert阻塞下。</span>
    alert(<span class="hljs-string">' ui 已经渲染完毕了吗？ '</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout1'</span>);
})

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
        i == <span class="hljs-number">99</span> &amp;&amp; resolve();
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'then1'</span>);
    alert(<span class="hljs-string">' ui 开始渲染 '</span>);
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'global1'</span>);

div.innerHTML = <span class="hljs-string">'end'</span>;</code></pre>
<p>上述代码中修改了div的内容，那么在执行那句js代码之后渲染引擎开始修改div的内容呢？</p>
<p><strong>根据HTML Standard，一轮事件循环执行结束之后，下轮事件循环执行之前开始进行UI render。即：macro-task任务执行完毕，接着执行完所有的micro-task任务后，此时本轮循环结束，开始执行UI render。UI render完毕之后接着下一轮循环。</strong></p>
<p>在chrome浏览器中执行以上代码，控制台先输出promise1,promise2,global1,then1(micro-task任务输出)，弹出'ui 开始渲染'警告框，点击确定之后，页面中的'begin'变为'end'，再弹出警告框'ui 已经渲染完毕了吗？' ，点击确认之后再输入timeout1.</p>
<h5>再来一个稍微复杂一点的例子</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;outer&quot; style=&quot;width:200px;height:200px;background-color: #ccc&quot;>
    1
    <div class=&quot;inner&quot; style=&quot;width:100px;height:100px;background-color: #ddd&quot;>begin</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outer"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;height:200px;background-color: #ccc"</span>&gt;</span>
    1
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;background-color: #ddd"</span>&gt;</span>begin<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

var i = 0;

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
    console.log('mutate');
}).observe(outer, {
    attributes: true
});

// Here's a click listener…
function onClick() {
    i++;

    if(i === 1) {
        inner.innerHTML = 'end';
    }

    console.log('click');

    setTimeout(function() {
        alert('锚点');
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Let's get hold of those elements</span>
<span class="hljs-keyword">var</span> outer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.outer'</span>);
<span class="hljs-keyword">var</span> inner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);

<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;

<span class="hljs-comment">// Let's listen for attribute changes on the</span>
<span class="hljs-comment">// outer element</span>
<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mutate'</span>);
}).observe(outer, {
    <span class="hljs-attr">attributes</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// Here's a click listener…</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params"></span>) </span>{
    i++;

    <span class="hljs-keyword">if</span>(i === <span class="hljs-number">1</span>) {
        inner.innerHTML = <span class="hljs-string">'end'</span>;
    }

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>);

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">'锚点'</span>);
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
<p>当我们点击 inner div 时程序依次的执行顺序是：</p>
<ol>
<li>onclick 入 JS stack</li>
<li>打印出 click</li>
<li>将 timeout 压入到 macrotask</li>
<li>将 promise 压入到 microtask</li>
<li>修改 outer 属性 data-random</li>
<li>将 mutate 压入到 microtask，</li>
<li>onclick 出 JS stack</li>
</ol>
<p>此时，由于用户点击事件onclick产生的macrotask执行完毕，JS stack 清空，开始执行microtask.</p>
<ol>
<li>promise 入 JS stack</li>
<li>打印出 promise</li>
<li>promise 出 JS stack</li>
<li>mutate 入 JS stack</li>
<li>打印出 mutate</li>
<li>mutate 出 JS stack</li>
</ol>
<p>此时，microtask 执行完毕，JS stack 清空，但是由于事件冒泡，接着执行outer上的onclick事件.</p>
<ol>
<li>onclick 入 JS stack</li>
<li>打印出 click</li>
<li>将 timeout 压入到 macrotask</li>
<li>将 promise 压入到 microtask</li>
<li>修改 outer 属性 data-random</li>
<li>将 mutate 压入到 microtask，</li>
<li>onclick 出 JS stack</li>
</ol>
<p>此时，由于outer上的onclick事件产生的macrotask执行完毕，JS stack 清空，开始执行microtask.</p>
<ol>
<li>promise 入 JS stack</li>
<li>打印出 promise</li>
<li>promise 出 JS stack</li>
<li>mutate 入 JS stack</li>
<li>打印出 mutate</li>
<li>mutate 出 JS stack</li>
</ol>
<p>此时，本轮事件循环结束，UI 开始 render.</p>
<ol><li>页面中inner的innerHTML变为end</li></ol>
<p>此时，UI render 完毕，开始下一轮事件循环.</p>
<ol>
<li>timeout 入 JS stack</li>
<li>弹出警告 锚点.</li>
<li>打印出 timeout</li>
<li>timeout 出 JS stack</li>
<li>timeout 入 JS stack</li>
<li>弹出警告 锚点.</li>
<li>打印出 timeout</li>
<li>timeout 出 JS stack</li>
</ol>
<p>到此为止，整个事件执行完毕，<strong>我们可以看到在弹出警告框之前inner的内容已经改变</strong>。</p>
<h5>那如果不是用户点击事件触发onclick，而是js触发呢？</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
inner.click();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">inner.addEventListener(<span class="hljs-string">'click'</span>, onClick);
outer.addEventListener(<span class="hljs-string">'click'</span>, onClick);
inner.click();</code></pre>
<p>此时的执行顺序是：</p>
<ol>
<li>首先是script(整体代码)入 JS stack</li>
<li>onclick 入 JS stack</li>
<li>打印出 click</li>
<li>将 timeout 压入到 macrotask</li>
<li>将 promise 压入到 microtask</li>
<li>修改 outer 属性 data-random</li>
<li>将 mutate 压入到 microtask，</li>
<li>onclick 出 JS stack</li>
</ol>
<p>此时，inner 的 onclick 已经出 JS stack，但是script(整体代码)还没有出 JS stack，还不能执行microtask，由于冒泡，接着执行 outer 的 onclick.</p>
<ol>
<li>onclick 入 JS stack</li>
<li>打印出 click</li>
<li>将 timeout 压入到 macrotask</li>
<li>将 promise 压入到 microtask</li>
<li>修改 outer 属性 data-random</li>
</ol>
<p>接着执行的outer.setAttribute('data-random', Math.random());，但是由于上一个mutation microtask还处于等待状态，不能再添加mutation microtask，所以这里不会将 mutate 压入到 microtask。接着执行：</p>
<ol>
<li>onclick 出 JS stack</li>
<li>script(整体代码)出 JS stack</li>
</ol>
<p>此时，inner.click()执行完毕，script(整体代码)已出 JS stack，JS stack 清空，开始执行mircotask.</p>
<ol>
<li>promise 入 JS stack</li>
<li>打印出 promise</li>
<li>promise 出 JS stack</li>
<li>mutate 入 JS stack</li>
<li>打印出 mutate</li>
<li>mutate 出 JS stack</li>
<li>promise 入 JS stack</li>
<li>打印出 promise</li>
<li>promise 出 JS stack</li>
</ol>
<p>此时，所有的mircotask执行完毕，本轮事件循环结束，UI 开始 render.</p>
<ol><li>页面中inner的innerHTML变为end</li></ol>
<p>此时，UI render 完毕，开始下一轮事件循环.</p>
<ol>
<li>timeout 入 JS stack</li>
<li>弹出警告 锚点.</li>
<li>打印出 timeout</li>
<li>timeout 出 JS stack</li>
<li>timeout 入 JS stack</li>
<li>弹出警告 锚点.</li>
<li>打印出 timeout</li>
<li>timeout 出 JS stack</li>
</ol>
<p>到此为止，整个事件执行完毕，<strong>我们可以看到在弹出警告框之前inner的内容已经改变</strong>。</p>
<p><strong>总结：首先执行macrotask，当js stack为空时执行microtask，接着开始UI render，接着再开始下一轮循环</strong></p>
<p>参考文献：<br><a href="https://segmentfault.com/a/1190000012646373">深入核心，详解事件循环机制</a><br><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript事件循环机制以及渲染引擎何时渲染UI

## 原文链接
[https://segmentfault.com/a/1190000013212944](https://segmentfault.com/a/1190000013212944)


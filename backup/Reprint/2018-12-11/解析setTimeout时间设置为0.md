---
title: '解析setTimeout时间设置为0' 
date: 2018-12-11 2:30:10
hidden: true
slug: q5urp95b7n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1、开胃菜，setTimeout为何物</h1>
<p>首先看一下<code>w3school</code>上面对于<code>setTimeout</code>的解释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(fn,millisec) 方法用于在指定的毫秒数后调用函数或计算表达式。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">setTimeout</span><span class="hljs-params">(fn,millisec)</span></span> 方法用于在指定的毫秒数后调用函数或计算表达式。</code></pre>
<p>很简单，<code>setTimeout()</code> 只执行 <code>fn</code> 一次，到底什么时候执行取决于第二个参数<code>millisec</code>设定的毫秒数，所以很多人习惯上称之为<code>延迟</code>，无非就是延迟一段时间后再执行里面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){
    console.log('我是setTimeout');
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是setTimeout'</span>);
}, <span class="hljs-number">1000</span>);</code></pre>
<p>正常情况下，<code>我是setTimeout</code> 这句话并不会马上输出而是等1000毫秒以后会在浏览器的控制台输出。</p>
<h1 id="articleHeader1">2、主菜，js是单线程的</h1>
<p>OK，看一个例子，这个例子的输出结果是什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){
    console.log(1);
}, 0);
console.log(2);
console.log(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span>);
}, <span class="hljs-number">0</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">3</span>);</code></pre>
<p>出乎一些人的意料，得到的结果竟然是<code>2、3、1</code>。这似乎不按套路出牌啊，明明是等待了0毫秒也就是不等待直接输出啊，为啥<code>1</code>却在最后输出了呢？</p>
<p>这就需要搞清楚一个很重要的概念：<strong><em>js是单线程的，单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。</em></strong><br>其实很好理解，就像大家去超市买东西一样，所有买东西的人都需要在收银台排队结账，正常情况下每个收银台同一时间只能为一位顾客结账，这位顾客结账完成才能为下一位顾客服务。</p>
<p>而浏览器的内核是多线程的，它们在内核制控下相互配合以保持同步，一个浏览器至少实现三个常驻线程：<code>javascript引擎线程</code>，<code>GUI渲染线程</code>，<code>浏览器事件触发线程</code>。</p>
<blockquote><ul>
<li>javascript引擎是基于事件驱动单线程执行的，JS引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS线程在运行JS程序。</li>
<li>GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行。但需要注意 GUI渲染线程与JS引擎是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。</li>
<li>事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理。（当线程中没有执行任何同步代码的前提下才会执行异步代码）</li>
</ul></blockquote>
<p>其实，当js代码执行遇到<code>setTimeout(fn,millisec)</code>时，会把<code>fn</code>这个函数放在任务队列中，当js引擎线程空闲时并达到<code>millisec</code>指定的时间时，才会把<code>fn</code>放到js引擎线程中执行。</p>
<p>setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。</p>
<p>HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用requestAnimationFrame()的效果要好于setTimeout()。</p>
<p>需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。</p>
<h1 id="articleHeader2">3、甜品，setTimeout的妙用</h1>
<p>其实<code>setTimeout</code>是有一些妙用的，这里简单列举几个。</p>
<h2 id="articleHeader3">函数去抖</h2>
<p>让一个函数在一定间隔内没有被调用时，才开始执行被调用方法。比如当你在使用 google 搜索内容的时候，有些关键词输入到一半，谷歌会展示一个可选列表，根据你当前输入的内容作出的一个猜测联想。需要监听文字改变，每一次改变都会调用一次回调函数，现在需要的一种实现是在用户停止键盘事件一段时间后，去发送一个请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var debounce = function(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    },100);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code>var debounce = <span class="hljs-function"><span class="hljs-keyword">function</span>(</span><span class="hljs-function"><span class="hljs-keyword">method</span>, <span class="hljs-title">context</span>) {</span>
    clearTimeout(<span class="hljs-function"><span class="hljs-keyword">method</span>.<span class="hljs-title">tId</span>);</span>
    <span class="hljs-function"><span class="hljs-keyword">method</span>.<span class="hljs-title">tId</span> =</span> setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(</span>){
        <span class="hljs-function"><span class="hljs-keyword">method</span>.<span class="hljs-title">call</span>(</span>context);
    },<span class="hljs-number">100</span>);
}</code></pre>
<h2 id="articleHeader4">轮训任务</h2>
<p>js中可以使用<code>setInterval</code>开启轮询，但是这种存在一个问题就是执行间隔往往就不是你希望的间隔时间。</p>
<p>比如有个轮询任务间隔是100ms，但是执行方法的时间需要450ms，那么在200ms、300ms、400ms本来是计划中执行任务的时间，浏览器发现第一个还未执行完，那么就会放弃2、3、4次的任务执行，并且在500ms之后再次执行任务，这样的话，其实再次执行的间隔就只有50ms。使用setTimeout构造轮询能保证每次轮询的间隔。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function () {
    console.log('我被调用了');
    setTimeout(arguments.callee, 100);
}, 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我被调用了'</span>);
    setTimeout(<span class="hljs-built_in">arguments</span>.callee, <span class="hljs-number">100</span>);
}, <span class="hljs-number">100</span>);</code></pre>
<h2 id="articleHeader5">延迟js引擎的调用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var div = document.createElement('div');
div.innerHTML = '我是一个div';
div.setAttribute('style', 'width:200px; height:200px;background-color:#f00; ');
document.body.appendChild(div);

setTimeout(function() {
    console.log('我被调用了');
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">div</span> = document.createElement(<span class="hljs-string">'div'</span>);
<span class="hljs-keyword">div</span>.innerHTML = <span class="hljs-string">'我是一个div'</span>;
<span class="hljs-keyword">div</span>.setAttribute(<span class="hljs-string">'style'</span>, <span class="hljs-string">'width:200px; height:200px;background-color:#f00; '</span>);
document.body.appendChild(<span class="hljs-keyword">div</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    console.log('我被调用了');
}</span>, 1000);</span></code></pre>
<p><strong>虽然setTimeout有一些妙用，但是他确实是在宏观任务队列中新增任务了，所以万万不能滥用啊。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解析setTimeout时间设置为0

## 原文链接
[https://segmentfault.com/a/1190000013538587](https://segmentfault.com/a/1190000013538587)


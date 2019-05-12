---
title: 'JavaScript同步和异步' 
date: 2018-12-15 2:30:11
hidden: true
slug: bvt4b1de5zj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>大家好，我是wmingren，小伙伴们都知道JavaScript是单线程的语言，所谓的单线程呢就是指如果有多个任务就必须去排队，前面任务执行完成后，后面任务再执行。到这里我们就产生了一个疑问，既然是单线程的，又怎么会有异步操作呢？首先了解一下同步和异步的概念吧。</blockquote>
<h1 id="articleHeader0">一、同步和异步</h1>
<p><span class="img-wrap"><img data-src="/img/bV2ShQ?w=640&amp;h=306" src="https://static.alili.tech/img/bV2ShQ?w=640&amp;h=306" alt="7neIbm2.png" title="7neIbm2.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">同步</h2>
<blockquote>如果在函数返回结果的时候，调用者能够拿到预期的结果(就是函数计算的结果)，那么这个函数就是同步的.</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('hello');//执行后，获得了返回结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);<span class="hljs-comment">//执行后，获得了返回结果</span></code></pre>
<p>如果函数是同步的，即使调用函数执行任务比较耗时，也会一致等待直到得到执行结果。如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wait(){
    var time = (new Date()).getTime();//获取当前的unix时间戳
    while((new Date()).getTime() - time > 5000){}
    console.log('5秒过去了');
}
wait();
console.log('慢死了');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wait</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> time = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime();<span class="hljs-comment">//获取当前的unix时间戳</span>
    <span class="hljs-keyword">while</span>((<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime() - time &gt; <span class="hljs-number">5000</span>){}
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'5秒过去了'</span>);
}
wait();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'慢死了'</span>);</code></pre>
<p>上面代码中，函数wait是一个耗时程序，持续5秒，在它执行的这漫长的5秒中，下面的console.log()函数只能等待，这就是同步。</p>
<h2 id="articleHeader2">异步</h2>
<blockquote>如果在函数返回的时候，调用者还不能购得到预期结果，而是将来通过一定的手段得到（例如回调函数），这就是异步。例如ajax操作。  <br>如果函数是异步的，发出调用之后，马上返回，但是不会马上返回预期结果。调用者不必主动等待，当被调用者得到结果之后会通过回调函数主动通知调用者。</blockquote>
<h1 id="articleHeader3">二、单线程与多线程</h1>
<blockquote>了解完同步和异步之后，我们再来看看我们的问题：单线程又怎么会有异步呢？  <br>JavaScript其实就是一门语言，说是单线程还是多线程得结合具体运行环境。众所周知，js的运行环境就是浏览器，具体由js引擎取解析和执行。下面我们来了解下浏览器。</blockquote>
<h2 id="articleHeader4">浏览器</h2>
<p>一个浏览器通常由以下几个常驻的线程：</p>
<ul>
<li>渲染引擎线程，负责页面的渲染</li>
<li>js引擎线程，负责js的解析和执行</li>
<li>定时触发器线程，处理setInterval和setTimeout</li>
<li>事件触发线程,处理DOM事件</li>
<li>异步http请求线程，处理http请求</li>
</ul>
<blockquote>要注意的是渲染引擎和js引擎线程是不能同时进行的。渲染线程在执行任务的时候，js引擎线程会被挂起。因为若是在渲染页面的时候，js处理了DOM，浏览器就不知道该听谁的了</blockquote>
<h2 id="articleHeader5">JS引擎</h2>
<blockquote>通常讲到浏览器的时候，我们会说到两个引擎：渲染引擎和JS引擎。<br>1、<strong>渲染引擎:</strong>Chrome/Safari/Opera用的是Webkit引擎，IE用的是Trdent引擎，FireFox用的是Gecko引擎。不同的引擎对同一个样式的实现不一致，就导致浏览器的兼容性问题。<br>2、<strong>JS引擎:</strong>js引擎可以说是js虚拟机，负责解析js代码的解析和执行。通常有以下步骤：</blockquote>
<ul>
<li>词法解析：将源代码分解位有意义的分词</li>
<li>语法分析：用语法分析器将分词解析成语法树</li>
<li>代码生成：生成机器能运行的代码</li>
<li>代码执行</li>
</ul>
<blockquote>不同浏览器的js引擎也各不相同，Chrome用的是V8，FireFox用的是SpiderMonkey,Safari用的是JavaScriptCore，IE用的是Chakra。  <p>之所以说js是单线程就是因为浏览器运行时只开启一个js解释器，原因是若有两个线程操作DOM，浏览器就又晕了。</p>
<p>JavaScript是单线程的，但是浏览器不是单线程的。一些I/O操作，定时器的计时和事件监听是由其他线程完成的。</p>
</blockquote>
<h1 id="articleHeader6">三、消息队列与事件循环</h1>
<blockquote>由上面浏览器一篇的介绍可以知道，浏览器中多个线程的合作完成了异步的操作，那么异步的回调函数又是怎样完成执行的呢？  <br><span class="img-wrap"><img data-src="/img/bV2Sh6?w=596&amp;h=548" src="https://static.alili.tech/img/bV2Sh6?w=596&amp;h=548" alt="6JbIbeB.png" title="6JbIbeB.png" style="cursor: pointer;"></span>
</blockquote>
<p>这就需要了解消息队列和事件循环了。</p>
<blockquote>如上图所示，左边的栈存储的是同步任务，就是那些能立即执行、不耗时的任务，如变量和函数的初始化、事件的绑定等等那些不需要回调函数的操作都可归为这一类。<p>右边的堆用来存储声明的变量、对象。下面的队列就是消息队列，一旦某个异步任务有了响应就会被推入队列中。如用户的点击事件、浏览器收到服务的响应和setTimeout中待执行的事件，每个异步任务都和回调函数相关联。</p>
<p>JS引擎线程用来执行栈中的同步任务，当所有同步任务执行完毕后，栈被清空，然后读取消息队列中的一个待处理任务，并把相关回调函数压入栈中，单线程开始执行新的同步任务。</p>
<p>JS引擎线程从消息队列中读取任务是不断循环的，每次栈被清空后，都会在消息队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫事件循环。<br><span class="img-wrap"><img data-src="/img/bV2Si5?w=649&amp;h=361" src="https://static.alili.tech/img/bV2Si5?w=649&amp;h=361" alt="RV7jYfV.png" title="RV7jYfV.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图以AJAX异步请求为例，发起异步任务后，由AJAX线程执行耗时的异步操作，而JS引擎线程继续执行堆中的其他同步任务，直到堆中的所有异步任务执行完毕。然后，从消息队列中依次按照顺序取出消息作为一个同步任务在JS引擎线程中执行，那么AJAX的回调函数就会在某一时刻被调用执行。</p>
</blockquote>
<h1 id="articleHeader7">四、实例</h1>
<blockquote>最后来一个经典的面试题来帮助大家理解js的同步和异步。<br>代码如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//执行下面这段代码，执行后，在 5s 内点击两下，过一段时间（>5s）后，再点击两下，整个过程的输出结果是什么？
setTimeout(function(){
    for(var i = 0; i < 100000000; i++){}
    console.log('timer a');
}, 0)

for(var j = 0; j < 5; j++){
    console.log(j);
}

setTimeout(function(){
    console.log('timer b');
}, 0)

function waitFiveSeconds(){
    var now = (new Date()).getTime();
    while(((new Date()).getTime() - now) < 5000){}
    console.log('finished waiting');
}

document.addEventListener('click', function(){
    console.log('click');
})

console.log('click begin');
waitFiveSeconds();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//执行下面这段代码，执行后，在 5s 内点击两下，过一段时间（&gt;5s）后，再点击两下，整个过程的输出结果是什么？</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000000</span>; i++){}
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer a'</span>);
}, <span class="hljs-number">0</span>)

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">5</span>; j++){
    <span class="hljs-built_in">console</span>.log(j);
}

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer b'</span>);
}, <span class="hljs-number">0</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">waitFiveSeconds</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> now = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime();
    <span class="hljs-keyword">while</span>(((<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime() - now) &lt; <span class="hljs-number">5000</span>){}
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished waiting'</span>);
}

<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>);
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click begin'</span>);
waitFiveSeconds();</code></pre>
<p>要想了解上述代码的输出结果，首先介绍下定时器。</p>
<blockquote>setTimeout 的作用是在间隔一定的时间后，将回调函数插入消息队列中，等栈中的同步任务都执行完毕后，再执行。因为栈中的同步任务也会耗时， 所以间隔的时间一般会大于等于指定的时间 。<p>setTimeout(fn, 0) 的意思是，将回调函数fn立刻插入消息队列，等待执行，而不是立即执行。看一个例子：</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function() {
    console.log(&quot;a&quot;)
}, 0)

for(let i=0; i<10000; i++) {}
console.log(&quot;b&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a"</span>)
}, <span class="hljs-number">0</span>)

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">10000</span>; i++) {}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"b"</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//打印结果，说明回调函数没有立即执行，而是等待同步任务执行完成后才执行的
b a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//打印结果，说明回调函数没有立即执行，而是等待同步任务执行完成后才执行的</span>
<span class="hljs-selector-tag">b</span> a</code></pre>
<blockquote>下面来解释一下面试题吧。<p>先执行同步任务，for循环，然后是console.log('click begin') 最后是waitFiveSeconds函数</p>
<p>在同步任务执行的期间，‘timera’，‘timerb’对应的回调和click事件的回调先后入队列。</p>
<p>同步任务结束后，js引擎线程空闲后会线查看是否有事件可执行，接着在处理其他异步任务，因此会有下面的输出：</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0
1
2
3
4
click begin
finished waiting
2 click  //5s中两次点击
timer a
timer b
2 click  //5s后两次点击" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">0</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">4</span>
click begin
finished waiting
<span class="hljs-number">2</span> click  <span class="hljs-comment">//5s中两次点击</span>
<span class="hljs-section">timer</span> a
<span class="hljs-section">timer</span> b
<span class="hljs-number">2</span> click  <span class="hljs-comment">//5s后两次点击</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript同步和异步

## 原文链接
[https://segmentfault.com/a/1190000013039660](https://segmentfault.com/a/1190000013039660)


---
title: 'JavaScript 运行机制详解(理解同步、异步和事件循环)' 
date: 2019-01-07 2:30:11
hidden: true
slug: 6q1oum6e9os
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1.为什么JavaScript是单线程？</h3>
<p>JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。<br>JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？<br>所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。<br>**<br>为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。<br>**</p>
<hr>
<p>JS引擎中负责解释和执行JavaScript代码的线程只有一个。我们叫它<strong>主线程</strong>。</p>
<p>但是实际上还存在其他的线程。例如：处理AJAX请求的线程、处理DOM事件的线程、定时器线程、读写文件的线程(例如在Node.js中)等等。这些线程可能存在于JS引擎之内，也可能存在于JS引擎之外，在此我们不做区分。不妨叫它们<strong>工作线程</strong>。</p>
<hr>
<h3 id="articleHeader1">2.同步与异步</h3>
<p>看一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('我要做第一件事情');
console.log('我要做第二件事情');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'我要做第一件事情'</span>)<span class="hljs-comment">;</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'我要做第二件事情'</span>)<span class="hljs-comment">;</span></code></pre>
<p>这段代码的实现就叫做同步,也就是说按照顺序去做,做完第一件事情之后,再去做第二件事情</p>
<p>再看一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('我要做第一件事情');
setTimeout(function () {
  console.log('我突然有事,晚点再做第二件事情');
},1000)
console.log('我要做第三件事情');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我要做第一件事情'</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我突然有事,晚点再做第二件事情'</span>);
},<span class="hljs-number">1000</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我要做第三件事情'</span>);</code></pre>
<p>这段代码的实现就叫做异步,也就是说不完全按照顺序去做,<br>突发情况,第二件事情不能立刻完成,所以等待一段时间再去完成,<br>优先去做后面的第三件事情,这样就不耽搁时间。</p>
<hr>
<h3 id="articleHeader2">3.异步的形成过程</h3>
<p><strong>为什么需要异步呢</strong></p>
<p>前面提过JavaScript是单线程的,<br>那么单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。<br>如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。<br>JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。<br>所以这就是异步过程的由来。</p>
<hr>
<p><strong>那么异步又是如何实现的呢？</strong></p>
<blockquote><p>1.主线程发起一个异步请求，相应的工作线程接收请求并告知主线程已收到(异步函数返回)；<br>2.主线程可以继续执行后面的代码，同时工作线程执行异步任务；</p></blockquote>
<p>3.工作线程完成工作后，通知主线程；<br>4.主线程收到通知后，执行一定的动作(调用回调函数)。</p>
<p><strong>其实我们经常用到的dom事件也是属于一个异步行为</strong></p>
<p>举一个栗子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var button = document.getElement('#btn');
button.addEventListener('click', function(e) {
    console.log('按钮');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.getElement(<span class="hljs-string">'#btn'</span>);
button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'按钮'</span>);
});
</code></pre>
<p>从事件的角度来看，上述代码表示：在按钮上添加了一个鼠标单击事件的事件监听器；当用户点击按钮时，鼠标单击事件触发，事件监听器函数被调用。</p>
<p>从异步过程的角度看，addEventListener函数就是异步过程的发起函数，事件监听函数就是异步过程的回调函数。<br>事件触发时，表示异步任务完成，会将事件监听器函数封装成一条消息放到消息队列中，等待主线程执行。</p>
<hr>
<h3 id="articleHeader3">4.任务队列(消息队列)</h3>
<p>"任务队列"是一个事件的队列（也可以理解成消息的队列），工作线程完成一项任务，就在"任务队列"中添加一个事件(也可以理解为发送一条消息)，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。</p>
<p><strong>那么这边就要提到JavaScript 的运行机制了</strong></p>
<blockquote><ul>
<li><p>所有同步任务都在主线程上执行，形成一个执行栈</p></li>
<li><p>主线程发起异步请求,相应的工作线程就会去执行异步任务,</p></li>
</ul></blockquote>
<p>主线程可以继续执行后面的代码</p>
<blockquote><ul><li><p>主线程之外，还存在一个"任务队列"（task queue）。只要异步任务</p></li></ul></blockquote>
<p>有了运行结果，就在"任务队列"之中放置一个事件,也就是一个消息。</p>
<blockquote><ul><li><p>一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队</p></li></ul></blockquote>
<p>列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状<br>  态，进入执行栈，开始执行。</p>
<blockquote><ul><li><p>主线程把当前的事件执行完成之后,再去读取任务队列,如此反复重复</p></li></ul></blockquote>
<p>执行,这样就行程了事件循环</p>
<p><strong>只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。</strong></p>
<p>用一张图来表示整个过程</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010292801" src="https://static.alili.tech/img/remote/1460000010292801" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<h3 id="articleHeader4">5.Event Loop(事件循环)</h3>
<p><strong>主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）</strong></p>
<hr>
<h4>macrotasks与microtasks的区别</h4>
<blockquote><ul>
<li><p><strong>macrotasks: setTimeout setInterval setImmediate I/O UI渲染</strong></p></li>
<li><p><strong>microtasks: Promise process.nextTick Object.observe MutationObserver</strong></p></li>
</ul></blockquote>
<h6>一个事件循环(EventLoop)中会有一个正在执行的任务(Task)，而这个任务就是从 macrotask 队列中来的。当这个 macrotask 执行结束后所有可用的 microtask 将会在同一个事件循环中执行，当这些 microtask 执行结束后还能继续添加 microtask 一直到整个 microtask 队列执行结束。</h6>
<p><strong>通俗点来理解的话,就是microtask会在当前循环中执行完成,而macrotask会在下一个循环中执行</strong><br>下面我们来看一段代码,自己思考一下运行结果会是什么?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('1');
setTimeout(function () {
  console.log('2');
  new Promise(function(resolve, reject) {
    console.log('promise-start2');
    resolve();
  }).then(function() {
    console.log('promise-end2');
 });
},0);
new Promise(function(resolve, reject) {
    console.log('promise-start');
    resolve();
}).then(function() {
    console.log('promise-end');
});
setTimeout(function () {
    console.log('3');
},0);
console.log('4');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise-start2'</span>);
    resolve();
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise-end2'</span>);
 });
},<span class="hljs-number">0</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise-start'</span>);
    resolve();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise-end'</span>);
});
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
},<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);</code></pre>
<p>运行结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1
promise-start
4
promise-end
2
promise-start2
promise-end2
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>
promise-start
<span class="hljs-number">4</span>
promise-end
<span class="hljs-number">2</span>
promise-start2
promise-end2
<span class="hljs-number">3</span></code></pre>
<p>从结果可以看出<br>主进程这个macroTask（也就是1、promise-start和4）执行完了，自然会去执行promise then这个microTask。这是第一个循环。之后的setTimeout和promise属于第二个循环。</p>
<h4>这边有一个注意点,就是主进程的代码也属于macroTask,因为主线程可以被视为没有异步任务的异步执行</h4>
<hr>
<h3 id="articleHeader5">6.定时器</h3>
<p>定时器功能主要由setTimeout()和setInterval()这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。以下主要讨论setTimeout()。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('1');
setTimeout(function () {
  console.log('2');
},0);
console.log('3');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
},<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);</code></pre>
<p>这段代码的运行结果是1,3,2,表示0毫秒间隔运行指定的回调函数<br>那么竟然是0秒,为啥3会是在2前面打印呢</p>
<p><strong>总之，setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。</strong></p>
<p>HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于<strong>4毫秒</strong>，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为<strong>10毫秒</strong>。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用<strong>requestAnimationFrame()</strong>的效果要好于setTimeout()。</p>
<p>需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，<strong>所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行</strong>。</p>
<hr>
<h3 id="articleHeader6">7.总结</h3>
<p>以上是我对于JavaScript 运行机制的一些了解,<br>知道这些知识,对于我们去理解js的运行机智,还有对于同步异步的处理会有很大的帮助,如果您有不同的意见或者文章有错误的地方,可以给我留言,一起讨论,谢谢<br>参考资料:<br><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 运行机制详解(理解同步、异步和事件循环)

## 原文链接
[https://segmentfault.com/a/1190000010292798](https://segmentfault.com/a/1190000010292798)


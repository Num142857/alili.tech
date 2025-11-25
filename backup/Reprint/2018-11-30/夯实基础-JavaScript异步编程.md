---
title: '夯实基础-JavaScript异步编程' 
date: 2018-11-30 2:30:12
hidden: true
slug: s8h9y2cssdi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">异步编程</h2>
<p>JavaScript中异步编程问题可以说是基础中的重点，也是比较难理解的地方。首先要弄懂的是什么叫异步？</p>
<p>我们的代码在执行的时候是从上到下按顺序执行，一段代码执行了之后才会执行下一段代码，这种方式叫同步（synchronous）执行，也是我们最容易理解的方式。但是在某些场景下：</p>
<ol>
<li>网络请求：常见的ajax</li>
<li>IO操作：比如readFile</li>
<li>定时器：setTimeout</li>
</ol>
<p>上面这些场景可能非常耗时，而且时间不定长，这时候这些代码就不应该同步执行了，<strong>先执行可以执行的代码，在未来的某个时间再来执行他们的handler</strong>，这就是异步。</p>
<p>通过这篇文章我们来了解几个知识点：</p>
<ol>
<li>进程线程区别</li>
<li>消息队列与事件循环</li>
<li>JavaScript处理异步的几种方法</li>
<li>generator与async/await的关系</li>
</ol>
<h2 id="articleHeader1">基础知识</h2>
<p>先做些准备工作，补一补一些非常重要的前置的概念。</p>
<h3 id="articleHeader2">进程与线程</h3>
<p>一个程序（program）至少包含一个进程（process），一个进程至少包含一个线程（thread）。</p>
<p>进程有以下特点：</p>
<ol>
<li>一个进程可以包含一个或多个线程。</li>
<li>进程在执行过程中拥有独立的内存单元。</li>
<li>一个进程可以创建和撤销另一个进程，这个进程是父进程，被创建的进程称为子进程。</li>
</ol>
<p>线程有以下特点：</p>
<ol>
<li>线程不能独立运行，必须依赖进程空间。</li>
<li>线程自己基本上不拥有系统资源，只拥有一点在运行中必不可少的资源(如程序计数器,一组寄存器和栈)，但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源。</li>
<li>一个线程可以创建和撤销另一个线程；同一个进程中的多个线程之间可以并发执行。</li>
</ol>
<blockquote>从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。<strong>这就是进程和线程的重要区别。</strong>
</blockquote>
<p>画张图来简单描述下：<br><span class="img-wrap"><img data-src="/img/bVbazJn?w=1394&amp;h=522" src="https://static.alili.tech/img/bVbazJn?w=1394&amp;h=522" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>所有的程序都要交给CPU实现计算任务，但是CPU一个时间点只能处理一个任务。这时如果多个程序在运行，就涉及到了《操作系统原理》中重要的<a href="https://blog.csdn.net/yangzhongblog/article/details/9881753" rel="nofollow noreferrer" target="_blank">线程调度算法</a>，线程是CPU轮转的最小单位，其他上下文信息用所在进程中的。</p>
<blockquote>进程是资源的分配单位，线程是CPU在进程内切换的单位。</blockquote>
<h3 id="articleHeader3">JavaScript单线程</h3>
<p>浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：</p>
<ol>
<li>GUI 渲染线程</li>
<li>JavaScript引擎线程</li>
<li>定时触发器线程</li>
<li>事件触发线程</li>
<li>异步http请求线程</li>
</ol>
<p>Javascript是单线程的，那么为什么Javascript要是单线程的？</p>
<blockquote>这是因为Javascript这门脚本语言诞生的使命所致：JavaScript为处理页面中用户的交互，以及操作DOM树、CSS样式树来给用户呈现一份动态而丰富的交互体验和服务器逻辑的交互处理。如果JavaScript是多线程的方式来操作这些UI DOM，则可能出现UI操作的冲突； 如果Javascript是多线程的话，在多线程的交互下，处于UI中的DOM节点就可能成为一个临界资源，假设存在两个线程同时操作一个DOM，一个负责修改一个负责删除，那么这个时候就需要浏览器来裁决如何生效哪个线程的执行结果。当然我们可以通过锁来解决上面的问题。但为了避免因为引入了锁而带来更大的复杂性，Javascript在最初就选择了单线程执行。</blockquote>
<h3 id="articleHeader4">阻塞和非阻塞</h3>
<p>这时候再理解阻塞非阻塞就好理解了，对于异步任务，单线程的JavaScript如果什么也不干等待异步任务结束，这种状态就是阻塞的；如果将异步消息放到一边，过会再处理，就是非阻塞的。</p>
<blockquote>请求不能立即得到应答，需要等待，那就是阻塞；否则可以理解为非阻塞。</blockquote>
<p>生活中这种场景太常见了，上厕所排队就是阻塞，没人直接上就是非阻塞。</p>
<h3 id="articleHeader5">事件循环（event-loop）</h3>
<p>因为JavaScript是单线程的，每个时刻都只能一个事件，所以JavaScript中的同步和异步事件就有了一个奇妙的执行顺序。</p>
<p>JavaScript在运行时（runtime）会产生一个函数调用栈，先入栈的函数先被执行。但是有一些任务是不需要进入调用栈的，这些任务被加入到<strong>消息队列</strong>中。当函数调用栈被清空时候，就会执行消息队列中的任务（任务总会关联一个函数，并加入到调用栈），依次执行直至所有任务被清空。由于JavaScript是事件驱动，当用户触发事件JavaScript再次运行直至清空所有任务，这就是事件循环。</p>
<blockquote>函数调用栈中的任务永远优先执行，调用栈无任务时候，遍历消息队列中的任务。消息队列中的任务关联的函数（一般就是callback）放入调用栈中执行。</blockquote>
<p>举两个例子：异步请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax (url, callback){
    var req = new XMLHttpRequest();

    req.onloadend = callback;
    req.open('GET', url, true);
    req.send();
};

console.log(1);
ajax('/api/xxxx', function(res){
    console.log(res);
});
console.log(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span> (<span class="hljs-params">url, callback</span>)</span>{
    <span class="hljs-keyword">var</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();

    req.onloadend = callback;
    req.open(<span class="hljs-string">'GET'</span>, url, <span class="hljs-literal">true</span>);
    req.send();
};

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
ajax(<span class="hljs-string">'/api/xxxx'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    <span class="hljs-built_in">console</span>.log(res);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);</code></pre>
<p>一个开发经常遇到的业务场景，异步请求一个数据，上述过程用图表示：<br><span class="img-wrap"><img data-src="/img/bVbazJt?w=2000&amp;h=642" src="https://static.alili.tech/img/bVbazJt?w=2000&amp;h=642" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>图中三条线分别表示函数执行的调用栈，异步消息队列，以及请求所依赖的网络请求线程（浏览器自带）。执行顺序：</p>
<ol>
<li>调用栈执行<code>console.log(1);</code>。</li>
<li>调用栈执行<code>ajax</code>方法，方法里面配置<code>XMLHttpRequest</code>的回调函数，并交由线程执行异步请求。</li>
<li>调用栈继续执行<code>console.log(2);</code>。</li>
<li>调用栈被清空，消息队列中并无任务，JavaScript线程停止，事件循环结束。</li>
<li>不确定的时间点请求返回，将设定好的回调函数放入消息队列。</li>
<li>事件循环再次启动，调用栈中无函数，执行消息队列中的任务<code>function(res){console.log(res);}</code>。</li>
</ol>
<p>定时器任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);
setTimeout(function(){
    console.log(2);
}, 100);
setTimeout(function(){
    console.log(3);
}, 10);
console.log(4);

// 1
// 4
// 3
// 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
}, <span class="hljs-number">100</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
}, <span class="hljs-number">10</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);

<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 4</span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// 2</span></code></pre>
<p>跟上面的例子很像，只不过异步请求变成了定时器，上述代码的指向过程图：<br><span class="img-wrap"><img data-src="/img/bVbazJz?w=2122&amp;h=786" src="https://static.alili.tech/img/bVbazJz?w=2122&amp;h=786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>执行顺序如下：</p>
<ol>
<li>调用栈执行<code>console.log(1);</code>。</li>
<li>执行<code>setTimeout</code>向消息队列添加一个定时器任务1。</li>
<li>执行<code>setTimeout</code>向消息队列添加一个定时器任务2。</li>
<li>调用栈执行<code>console.log(4);</code>。</li>
<li>调用栈执行完毕执行消息队列任务1。</li>
<li>调用栈执行完毕执行消息队列任务2。</li>
<li>消息队列任务2执行完毕调用回调函数<code>console.log(3);</code>。</li>
<li>消息队列任务1执行完毕调用回调函数<code>console.log(2);</code>。</li>
</ol>
<p>通过上面例子可以很好理解，就像工作中你正在做一件事情，这时候领导给你安排一个不着急的任务，你停下来跟领导说<strong>'等我忙完手里的活就去干'</strong>，然后把手里的活干完去干领导安排的任务。所有任务完成相当于完成了一个事件循环。</p>
<h3 id="articleHeader6">macrotasks 和 microtasks</h3>
<p>macrotask 和 microtask 都是属于上述的异步任务中的一种，分别是一下 API ：</p>
<ul>
<li>
<strong>macrotasks</strong>: <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code>, I/O, UI rendering</li>
<li>
<strong>microtasks</strong>: <code>process.nextTick</code>(node), <code>Promises</code>, <code>Object.observe</code>(废弃), <code>MutationObserver</code>
</li>
</ul>
<p><code>setTimeout</code> 的 macrotask ,和 <code>Promise</code> 的 microtask 有什么不同呢：</p>
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
console.log('script end');

// &quot;script start&quot;
// &quot;script end&quot;
// &quot;promise1&quot;
// &quot;promise2&quot;
// &quot;setTimeout&quot;" title="" data-original-title="复制"></span>
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
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>);

<span class="hljs-comment">// "script start"</span>
<span class="hljs-comment">// "script end"</span>
<span class="hljs-comment">// "promise1"</span>
<span class="hljs-comment">// "promise2"</span>
<span class="hljs-comment">// "setTimeout"</span></code></pre>
<p>这里的运行结果是<code>Promise</code>的立即返回的异步任务会优先于<code>setTimeout</code>延时为0的任务执行。</p>
<p>原因是任务队列分为 macrotasks 和 microtasks，而<code>Promise</code>中的<code>then</code>方法的函数会被推入 microtasks 队列，而<code>setTimeout</code>的任务会被推入 macrotasks 队列。<strong>在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microtasks 队列清空</strong>。</p>
<p>所以上面实现循环的顺序：</p>
<ol>
<li>执行函数调用栈中的任务。</li>
<li>函数调用栈清空之后，执行microtasks队列任务至清空。</li>
<li>执行microtask队列任务至清空。</li>
</ol>
<h3 id="articleHeader7">并发（Concurrency）</h3>
<p>并发我们应该经常听过，跟他类似的一个词叫并行。</p>
<p>并发：多个进程在一台处理机上同时运行，一个时间段内处理多件事情，宏观上好比一个人边唱边跳，微观上这个人唱一句跳一步。（可以类比时间片轮转法，多个线程同时占用一个CPU，外部看来可以并发处理多个线程）</p>
<p>并行：多态拥有相同处理能力的处理机在同时处理不同的任务，好比广场上多个大妈同时再调广场舞。（多个CPU同时处理多个线程任务）</p>
<p>在JavaScript中，因为其是单线程的原因，所以决定了其每时刻只能干一件事情，事件循环是并发在JavaScript单线程中的一种处理方式。</p>
<p>但是在日常开发中我们肯定见过，同时发送多个请求。这种情况下多个网络线程和js线程共同占用一个CPU，就是并发。</p>
<h2 id="articleHeader8">异步解决方法</h2>
<p>虽然已经理解了JavaScript中运行异步任务的过程，但是这样显然对开发不友好，因为我们通常并不知道异步任务在何时结束。所以前人开发了多种处理异步的方法。每种方法我们都从三个角度考虑其优缺点：</p>
<ol>
<li>单个异步写法是否简便。</li>
<li>多个异步按顺序执行。</li>
<li>多个异步并发执行。</li>
</ol>
<h3 id="articleHeader9">回调函数 （callback）</h3>
<p>一种最常见的处理异步问题的方法，将异步任务结束时候要干的事情（回调函数）作为参数传给他，等任务结束时候运行回调函数。我们常用的<code>$.ajax()</code>和<code>setTimeout</code>都属于这种方式，但是这样的问题很明显：多个异步任务按顺序执行非常恐怖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 著名的回调金字塔
asyncEvent1(()=>{
    asyncEvent2(()=>{
        asyncEvent3(()=>{
            asyncEvent4(()=>{
                ....
            });    
        });
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 著名的回调金字塔</span>
asyncEvent1(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    asyncEvent2(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        asyncEvent3(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            asyncEvent4(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                ....
            });    
        });
    });
});</code></pre>
<p>上面这种情况非常难以维护，在早期Node项目中经常出现这种情况，有人对上面小改动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncEvent1CB (){
    asyncEvent2(asyncEvent2CB);
}

function asyncEvent2CB (){
    asyncEvent3(asyncEvent3CB);
}

function asyncEvent3CB (){
    asyncEvent4(asyncEvent4CB);
}

function asyncEvent4CB () {
    // ...
}

asyncEvent1(asyncEvent1CB);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncEvent1CB</span> (<span class="hljs-params"></span>)</span>{
    asyncEvent2(asyncEvent2CB);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncEvent2CB</span> (<span class="hljs-params"></span>)</span>{
    asyncEvent3(asyncEvent3CB);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncEvent3CB</span> (<span class="hljs-params"></span>)</span>{
    asyncEvent4(asyncEvent4CB);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncEvent4CB</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
}

asyncEvent1(asyncEvent1CB);</code></pre>
<p>这样讲回调函数分离出来，逻辑清晰了一些，但是还是很明显：方法调用顺序是硬编码，耦合性还是很高。而且一旦同时发送多个请求，这多个请求的回调函数执行顺序很难保证，维护起来非常麻烦。</p>
<p>这就是<strong>回调函数的弊端</strong>：</p>
<ol>
<li>虽然简单，但是不利于阅读维护。</li>
<li>多层回调顺序执行耦合性很高。</li>
<li>请求并发回调函数执行顺序无法确定。</li>
<li>每次只能指定一个回调函数，出现错误程序中断易崩溃。</li>
</ol>
<p>虽然回调函数这种方式问题很多，但是不可否认的是在ES6之前，他就是处理异步问题普遍较好的方式，而且后面很多方式仍然基于回调函数。</p>
<h3 id="articleHeader10">事件监听（litenter）</h3>
<p>JavaScript是事件驱动，任务的执行不取决代码的顺序，而取决于某一个事件是否发生。DOM中有大量事件如<code>onclick</code>，<code>onload</code>，<code>onerror</code>等等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.element1').on('click', function(){
    console.log(1);
});

$('#element2').on('click', function(){
    console.log(2);
});

document.getElementById('#element3').addEventListener('click', function(){
    console.log(3);
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'.element1'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
});

$(<span class="hljs-string">'#element2'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
});

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'#element3'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
}, <span class="hljs-literal">false</span>);</code></pre>
<p>例如上面这段代码 你无法预知输出结果，因为事件触发无法被预知。跟这个很像的还有订阅者发布者模式：</p>
<p><a href="https://github.com/Aus0049/js-patterns-demo/blob/master/observer.js" rel="nofollow noreferrer" target="_blank">github</a>上有个有意思的小demo。注册在发布者里面的回调函数何时被触发取决于发布者何时发布事件，这个很多时候也是不可预知的。</p>
<p>回调函数与事件监听的区别：</p>
<ol>
<li>回调函数多是一对一的关系，事件监听可以是多对一。</li>
<li>运行异步函数，在一个不确定的时间段之后运行回调函数；不确定何时触发事件，但是触发事件同步响应事件的回调。</li>
<li>事件监听相对于回调函数，可配置的监听（可增可减）关系减少了耦合性。</li>
</ol>
<p>不过事件监听也存在问题：</p>
<ol>
<li>多对多的监听组成了一个复杂的事件网络，单个节点通常监听了多个事件，维护成本很大。</li>
<li>多个异步事件仍然还是回调的形式。</li>
</ol>
<h3 id="articleHeader11">Promise</h3>
<p>promise出场了，当年理解promise花了我不少功夫。Promise确实跟前两者很不一样，简单说下promise。</p>
<ol>
<li>Promise中文可以翻译成承诺，现在与未来的一种关系，我承诺我会调用你的函数。</li>
<li>Promise三种状态：pending（进行中），fulfilled（已成功），rejected（已失败），其状态只能从进行中到成功或者是失败，不可逆。</li>
<li>已成功和已失败可以承接不同的回调函数。</li>
<li>支持.then链式调用，将异步的写法改成同步。</li>
<li>原生支持了race, all等方法，方便适用常见开发场景。</li>
</ol>
<p>promise更详细的内容可以看<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">阮一峰老师的文章</a>。</p>
<p>Promise对于异步处理已经十分友好，大多生产环境已经在使用，不过仍有些缺点：</p>
<ol>
<li>Promise一旦运行，不能终止掉。</li>
<li>利用Promise处理一个异步的后续处理十分简便，但是处理多个请求按顺序执行仍然很不方便。</li>
</ol>
<h3 id="articleHeader12">Generator</h3>
<p>中文翻译成'生成器'，ES6中提供的一种异步编程解决方案，语法行为与传统函数完全不同。简单来说，我可以声明一个生成器，<strong>生成器可以在执行的时候暂停，交出函数执行权给其他函数，然后其他函数可以在需要的时候让该函数再次运行。</strong>这与之前的JavaScript听起来完全不同。</p>
<p>详细的内容参考<a href="http://es6.ruanyifeng.com/#docs/generator" rel="nofollow noreferrer" target="_blank">阮一峰老师的文章</a>，这里我们来据几个例子，正常的ajax调用写法看起来如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用setTimeout模拟异步
function ajax (url, cb){
    setTimeout(function(){
        cb('result');
    }, 100);
}

ajax('/api/a', function(result){
    console.log(result);
});

// 'result'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用setTimeout模拟异步</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span> (<span class="hljs-params">url, cb</span>)</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        cb(<span class="hljs-string">'result'</span>);
    }, <span class="hljs-number">100</span>);
}

ajax(<span class="hljs-string">'/api/a'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
    <span class="hljs-built_in">console</span>.log(result);
});

<span class="hljs-comment">// 'result'</span></code></pre>
<p>一旦我们想要多个异步按顺序执行，简直是噩梦。这里使用generator处理异步函数利用了一个特点：调用<code>next()</code>函数就会继续执行下去，所以利用这个特点我们处理异步原理：</p>
<ol>
<li>将异步逻辑封装成一个生成器。</li>
<li>将生成器的异步部分<code>yield</code>出去。</li>
<li>在异步的回调部分调用<code>next()</code>将生成器继续进行下去。</li>
<li>这样同步，异步，回调分离，处理异步写起来非常简便。</li>
</ol>
<p>我们对上面的例子加以改进：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用setTimeout模拟异步
function ajax (url, cb){
    setTimeout(function(){
        cb(url + ' result.');
    }, 100);
}

function ajaxCallback(result){
    console.log(result);
    it.next(result);
}

function* ajaxGen (){
    var aResult = yield ajax('/api/a', ajaxCallback); 
    console.log('aResult: ' + aResult);
    var bResult = yield ajax('/api/b', ajaxCallback); 
    console.log('bResult: ' + bResult);
}

var it = ajaxGen();
it.next();

// /api/a result.
// aResult: /api/a result.
// /api/b result.
// bResult: /api/b result." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用setTimeout模拟异步</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span> (<span class="hljs-params">url, cb</span>)</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        cb(url + <span class="hljs-string">' result.'</span>);
    }, <span class="hljs-number">100</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxCallback</span>(<span class="hljs-params">result</span>)</span>{
    <span class="hljs-built_in">console</span>.log(result);
    it.next(result);
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">ajaxGen</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> aResult = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'/api/a'</span>, ajaxCallback); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aResult: '</span> + aResult);
    <span class="hljs-keyword">var</span> bResult = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'/api/b'</span>, ajaxCallback); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bResult: '</span> + bResult);
}

<span class="hljs-keyword">var</span> it = ajaxGen();
it.next();

<span class="hljs-comment">// /api/a result.</span>
<span class="hljs-comment">// aResult: /api/a result.</span>
<span class="hljs-comment">// /api/b result.</span>
<span class="hljs-comment">// bResult: /api/b result.</span></code></pre>
<p>运行下上面代码，可以看到控制台输出结果居然跟我们书写的顺序一样！我们稍加改动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用setTimeout模拟异步
function ajax (url, cb){
    setTimeout(function(){
        cb(url + ' result.');
    }, 100);
}

function run (generator) {
    var it = generator(ajaxCallback);
    
    function ajaxCallback(result){
        console.log(result);
        it.next(result);
    }
    
    it.next();
};

run(function* (cb){
    var aResult = yield ajax('/api/a', cb); 
    console.log('aResult: ' + aResult);
    var bResult = yield ajax('/api/b', cb); 
    console.log('bResult: ' + bResult);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用setTimeout模拟异步</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span> (<span class="hljs-params">url, cb</span>)</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        cb(url + <span class="hljs-string">' result.'</span>);
    }, <span class="hljs-number">100</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span> (<span class="hljs-params">generator</span>) </span>{
    <span class="hljs-keyword">var</span> it = generator(ajaxCallback);
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxCallback</span>(<span class="hljs-params">result</span>)</span>{
        <span class="hljs-built_in">console</span>.log(result);
        it.next(result);
    }
    
    it.next();
};

run(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">cb</span>)</span>{
    <span class="hljs-keyword">var</span> aResult = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'/api/a'</span>, cb); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aResult: '</span> + aResult);
    <span class="hljs-keyword">var</span> bResult = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'/api/b'</span>, cb); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bResult: '</span> + bResult);
});</code></pre>
<p>简单几下改造便可以生成一个自执行的生成器函数，同时也完成了异步场景同步化写法。generator的核心在于：<strong>同步，异步，回调三者分离，遇到异步交出函数执行权，再利用回调控制程序生成器继续进行</strong>。上面的run函数只是一个简单的实现，业界已经有<a href="http://es6.ruanyifeng.com/#docs/generator-async#co-%E6%A8%A1%E5%9D%97" rel="nofollow noreferrer" target="_blank">CO</a>这样成熟的工具。实际上开发过程中通常使用generator搭配Promise实现，再来修改上面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用setTimeout模拟异步
function ajax (url){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(url + ' result.');
        }, 100);
    });
}

function run (generator) {
    var it = generator();
    
    function next(result){
        var result = it.next(result);
        if (result.done) return result.value;
        result.value.then(function(data){
            console.log(data);
              next(data);
        });
    }
    
    next();
};

run(function* (){
    var aResult = yield ajax('/api/a'); 
    console.log('aResult: ' + aResult);
    var bResult = yield ajax('/api/b'); 
    console.log('bResult: ' + bResult);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用setTimeout模拟异步</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span> (<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(url + <span class="hljs-string">' result.'</span>);
        }, <span class="hljs-number">100</span>);
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span> (<span class="hljs-params">generator</span>) </span>{
    <span class="hljs-keyword">var</span> it = generator();
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">result</span>)</span>{
        <span class="hljs-keyword">var</span> result = it.next(result);
        <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span> result.value;
        result.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
            <span class="hljs-built_in">console</span>.log(data);
              next(data);
        });
    }
    
    next();
};

run(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> aResult = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'/api/a'</span>); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aResult: '</span> + aResult);
    <span class="hljs-keyword">var</span> bResult = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'/api/b'</span>); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bResult: '</span> + bResult);
});</code></pre>
<p>使用Promise来代替callback，理解上花费点时间，大大提高了效率。上面是一种常见，之前我用过<a href="https://segmentfault.com/a/1190000010034177">generator实现多张图片并发上传</a>，这种情况下利用generator控制上传上传数量，达到断断续续上传的效果。</p>
<p>进化到generator这一步可以说是相当智能了，无论是单个异步，多个按顺序异步，并发异步处理都十分友好，但是也有几个问题：</p>
<ol>
<li>ES6浏览器支持问题，需要polyfill和babel的支持。</li>
<li>需要借助CO这样的工具来完成，流程上理解起来需要一定时间。</li>
</ol>
<p>有没有更简便的方法？</p>
<h3 id="articleHeader13">async/await</h3>
<p>理解了上面的generator，再来理解async/await就简单多了。</p>
<blockquote>ES2017 标准引入了 async 函数，使得异步操作变得更加方便。async 函数是什么？一句话，它就是 Generator 函数的语法糖。</blockquote>
<p>再看一遍上面的例子，然后修改上面的例子用async/await：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用setTimeout模拟异步
function ajax (url){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log(url + ' result.');
            resolve(url + ' result.');
        }, 100);
    });
}

async function ajaxAsync () {
    var aResult = await ajax('/api/a'); 
    console.log('aResult: ' + aResult);
    var bResult = await ajax('/api/b'); 
    console.log('bResult: ' + bResult);
}

ajaxAsync();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用setTimeout模拟异步</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span> (<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(url + <span class="hljs-string">' result.'</span>);
            resolve(url + <span class="hljs-string">' result.'</span>);
        }, <span class="hljs-number">100</span>);
    });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxAsync</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> aResult = <span class="hljs-keyword">await</span> ajax(<span class="hljs-string">'/api/a'</span>); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aResult: '</span> + aResult);
    <span class="hljs-keyword">var</span> bResult = <span class="hljs-keyword">await</span> ajax(<span class="hljs-string">'/api/b'</span>); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bResult: '</span> + bResult);
}

ajaxAsync();</code></pre>
<p>可以明显的看到，async/await写法跟generator最后一个例子很像，基本上就是使用async/await关键字封装了一个自执行的run方法。</p>
<blockquote>
<p><code>async</code>函数对 Generator 函数的改进，体现在以下四点。</p>
<ol>
<li>内置执行器：Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。</li>
<li>更好的语义：<code>async</code>和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。</li>
<li>更广的适用性：<code>co</code>模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。</li>
<li>返回值是 Promise：<code>async</code>函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。</li>
</ol>
</blockquote>
<p>这里async/await不做深入介绍，详情移步<a href="http://es6.ruanyifeng.com/#docs/async" rel="nofollow noreferrer" target="_blank">阮一峰老师的博客</a>。</p>
<h3 id="articleHeader14">Web worker</h3>
<p>一个很不常用的api，但是是一个异步编程的方法，跟以上几种又不太一样。</p>
<p>你可能会遇到一个非常耗时的计算任务，如果在js线程里运行会造成页面卡顿，这时使用web worker，将计算任务丢到里面去，等计算完成再以事件监听的方式通知主线程处理，这是一个web work的应用场景。在这时候，浏览器中是有多个线程在处理js的，worker同时可以在创建子线程，实现js'多线程'。<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers" rel="nofollow noreferrer" target="_blank">web worker的文档</a>。实战的话看<a href="http://xgfe.github.io/2017/05/03/LexHuang/web-worker/" rel="nofollow noreferrer" target="_blank">这篇</a>。</p>
<p>与前面几种方法不同的是，我们绞尽脑汁想把异步事件同步化，但是web worker却反其道而行，将同步的代码放到异步的线程中。</p>
<p>目前，web worker通常用于页面优化的一种手段，使用场景：</p>
<ol>
<li>使用专用线程进行数学运算：Web Worker最简单的应用就是用来做后台计算，而这种计算并不会中断前台用户的操作。</li>
<li>图像处理：通过使用从<code>&lt;canvas&gt;</code>或者<code>&lt;video&gt;</code>元素中获取的数据，可以把图像分割成几个不同的区域并且把它们推送给并行的不同Workers来做计算。</li>
<li>大量数据的检索：当需要在调用 ajax后处理大量的数据，如果处理这些数据所需的时间长短非常重要，可以在Web Worker中来做这些，避免冻结UI线程。</li>
<li>背景数据分析：由于在使用Web Worker的时候，我们有更多潜在的CPU可用时间，我们现在可以考虑一下JavaScript中的新应用场景。例如，我们可以想像在不影响UI体验的情况下实时处理用户输入。利用这样一种可能，我们可以想像一个像Word（Office Web Apps 套装）一样的应用：当用户打字时后台在词典中进行查找，帮助用户自动纠错等等。</li>
</ol>
<h2 id="articleHeader15">总结</h2>
<p>JavaScript中的异步编程方式目前来说大致这些，其中回调函数这种方式是最简单最常见的，Promise是目前最受欢迎的方式。前四种方式让异步编码模式使我们能够编写更高效的代码，而最后一种web worker则让性能更优。这里主要是对异步编程流程梳理，前提知识点的补充，而对于真正的异步编程方式则是以思考分析为主，使用没有过多介绍。最后补充一个连接：<a href="https://github.com/Aus0049/blog/blob/master/201805/js-async-practice.md" rel="nofollow noreferrer" target="_blank">JavaScript异步编程常见面试题</a>，帮助理解。</p>
<h2 id="articleHeader16">参考</h2>
<ol>
<li>《你所不知道JavaScript》</li>
<li>《JavaScript高级程序设计》</li>
<li><a href="http://imweb.io/topic/58e3bfa845e5c13468f567d5" rel="nofollow noreferrer" target="_blank">浏览器进程？线程？傻傻分不清楚！</a></li>
<li><a href="https://www.zhihu.com/question/25532384" rel="nofollow noreferrer" target="_blank">线程和进程的区别是什么？</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop" rel="nofollow noreferrer" target="_blank">并发模型与事件循环</a></li>
<li><a href="https://juejin.im/entry/58d4df3b5c497d0057eb99ff" rel="nofollow noreferrer" target="_blank">理解 JavaScript 中的 macrotask 和 microtask</a></li>
<li><a href="http://www.alloyteam.com/2015/11/deep-in-web-worker/" rel="nofollow noreferrer" target="_blank">【转向Javascript系列】深入理解Web Worker</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
夯实基础-JavaScript异步编程

## 原文链接
[https://segmentfault.com/a/1190000014874668](https://segmentfault.com/a/1190000014874668)


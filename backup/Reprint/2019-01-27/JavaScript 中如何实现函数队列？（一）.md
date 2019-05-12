---
title: 'JavaScript 中如何实现函数队列？（一）' 
date: 2019-01-27 2:30:59
hidden: true
slug: ujljiit481c
categories: [reprint]
---

{{< raw >}}

                    
<p>假设你有几个函数<code>fn1</code>、<code>fn2</code>和<code>fn3</code>需要按顺序调用，最简单的方式当然是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn1();
fn2();
fn3();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>f<span class="hljs-symbol">n1</span><span class="hljs-comment">()</span>;
f<span class="hljs-symbol">n2</span><span class="hljs-comment">()</span>;
f<span class="hljs-symbol">n3</span><span class="hljs-comment">()</span>;</code></pre>
<p>但有时候这些函数是运行时一个个添加进来的，调用的时候并不知道都有些什么函数；这个时候可以预先定义一个数组，添加函数的时候把函数push 进去，需要的时候从数组中按顺序一个个取出来，依次调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stack = [];
// 执行其他操作，定义fn1
stack.push(fn1);
// 执行其他操作，定义fn2、fn3
stack.push(fn2, fn3);
// 调用的时候
stack.forEach(function(fn) { fn() });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">stack</span> = [];
<span class="hljs-comment">// 执行其他操作，定义fn1</span>
<span class="hljs-keyword">stack</span>.push(fn1);
<span class="hljs-comment">// 执行其他操作，定义fn2、fn3</span>
<span class="hljs-keyword">stack</span>.push(fn2, fn3);
<span class="hljs-comment">// 调用的时候</span>
<span class="hljs-keyword">stack</span>.<span class="hljs-keyword">forEach</span>(function(fn) { fn() });</code></pre>
<p>这样函数有没名字也不重要，直接把匿名函数传进去也可以。来测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stack = [];

function fn1() {
    console.log('第一个调用');
}
stack.push(fn1);

function fn2() {
    console.log('第二个调用');
}
stack.push(fn2, function() { console.log('第三个调用') });

stack.forEach(function(fn) { fn() }); // 按顺序输出'第一个调用'、'第二个调用'、'第三个调用'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> stack = [];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个调用'</span>);
}
stack.push(fn1);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个调用'</span>);
}
stack.push(fn2, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三个调用'</span>) });

stack.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{ fn() }); <span class="hljs-comment">// 按顺序输出'第一个调用'、'第二个调用'、'第三个调用'</span></code></pre>
<p>这个实现目前为止工作正常，但我们忽略了一个情况，就是异步函数的调用。异步是JavaScript 中无法避免的一个话题，这里不打算探讨JavaScript 中有关异步的各种术语和概念，请读者自行查阅（例如某篇著名的<a href="http://blog.csdn.net/lin_credible/article/details/40143961" rel="nofollow noreferrer" target="_blank">评注</a>）。如果你知道下面代码会输出1、3、2，那请继续往下看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);

setTimeout(function() {
    console.log(2);
}, 0);

console.log(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);
}, <span class="hljs-number">0</span>);

console.<span class="hljs-built_in">log</span>(<span class="hljs-number">3</span>);</code></pre>
<p>假如stack 队列中有某个函数是类似的异步函数，我们的实现就乱套了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stack = [];

function fn1() { console.log('第一个调用') };
stack.push(fn1);

function fn2() {
    setTimeout(function fn2Timeout() {
         console.log('第二个调用');
    }, 0);
}
stack.push(fn2, function() { console.log('第三个调用') });

stack.forEach(function(fn) { fn() }); // 输出'第一个调用'、'第三个调用'、'第二个调用'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> stack = [];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个调用'</span>) };
stack.push(fn1);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2Timeout</span>(<span class="hljs-params"></span>) </span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个调用'</span>);
    }, <span class="hljs-number">0</span>);
}
stack.push(fn2, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三个调用'</span>) });

stack.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{ fn() }); <span class="hljs-comment">// 输出'第一个调用'、'第三个调用'、'第二个调用'</span></code></pre>
<p>问题很明显，<code>fn2</code>确实按顺序调用了，但<code>setTimeout</code>里的<code>function fn2Timeout() { console.log('第二个调用') }</code>却不是立即执行的（即使把timeout 设为0）；<code>fn2</code>调用之后马上返回，接着执行<code>fn3</code>，<code>fn3</code>执行完了然才真正轮到<code>fn2Timeout</code>。<br>怎么解决？我们分析下，这里的关键在于<code>fn2Timeout</code>，我们必须等到它真正执行完才调用<code>fn3</code>，理想情况下大概像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn2() {
    setTimeout(function() {
        fn2Timeout();
        fn3();
    }, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span><span class="hljs-params">()</span> </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        fn2Timeout();
        fn3();
    }, <span class="hljs-number">0</span>);
}</code></pre>
<p>但这样做相当于把原来的<code>fn2Timeout</code>整个拿掉换成一个新函数，再把原来的<code>fn2Timeout</code>和<code>fn3</code>插进去。这种动态改掉原函数的写法有个专门的名词叫<strong>Monkey Patch</strong>。按我们程序员的口头禅：“做肯定是能做”，但写起来有点拧巴，而且容易把自己绕进去。有没更好的做法？<br>我们退一步，不强求等<code>fn2Timeout</code>完全执行完才去执行<code>fn3</code>，而是在<code>fn2Timeout</code>函数体的最后一行去调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn2() {
    setTimeout(function fn2Timeout() {
        console.log('第二个调用');
        fn3();       // 注{1}
    }, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2Timeout</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个调用'</span>);
        fn3();       <span class="hljs-comment">// 注{1}</span>
    }, <span class="hljs-number">0</span>);
}</code></pre>
<p>这样看起来好了点，不过定义<code>fn2</code>的时候都还没有<code>fn3</code>，这<code>fn3</code>哪来的？</p>
<p>还有一个问题，<code>fn2</code>里既然要调用<code>fn3</code>，那我们就不能通过<code>stack.forEach</code>去调用<code>fn3</code>了,否则<code>fn3</code>会重复调用两次。</p>
<p>我们不能把<code>fn3</code>写死在<code>fn2</code>里。相反，我们只需要在<code>fn2Timeout</code>末尾里找出<code>stack</code>中<code>fn2</code>的下一个函数，再调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn2() {
    setTimeout(function fn2Timeout() {
        console.log('第二个调用');
        next();
    }, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2Timeout</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个调用'</span>);
        next();
    }, <span class="hljs-number">0</span>);
}</code></pre>
<p>这个<code>next</code>函数负责找出stack 中的下一个函数并执行。我们现在来实现<code>next</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var index = 0;

function next() {
    var fn = stack[index];
    index = index + 1; // 其实也可以用shift 把fn 拿出来
    if (typeof fn === 'function') fn();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> fn = stack[index];
    index = index + <span class="hljs-number">1</span>; <span class="hljs-comment">// 其实也可以用shift 把fn 拿出来</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">'function'</span>) fn();
}</code></pre>
<p><code>next</code>通过<code>stack[index]</code>去获取<code>stack</code>中的函数，每调用<code>next</code>一次<code>index</code>会加1，从而达到取出下一个函数的目的。</p>
<p><code>next</code>这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stack = [];

// 定义index 和next

function fn1() {
    console.log('第一个调用');
    next();  // stack 中每一个函数都必须调用`next`
};
stack.push(fn1);

function fn2() {
    setTimeout(function fn2Timeout() {
         console.log('第二个调用');
         next();  // 调用`next`
    }, 0);
}
stack.push(fn2, function() {
    console.log('第三个调用');
    next(); // 最后一个可以不调用，调用也没用。
});

next(); // 调用next，最终按顺序输出'第一个调用'、'第二个调用'、'第三个调用'。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>var stack = [];

// 定义index 和<span class="hljs-built_in">next</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span><span class="hljs-params">()</span></span> {
    console.log(<span class="hljs-string">'第一个调用'</span>);
    <span class="hljs-built_in">next</span>();  // stack 中每一个函数都必须调用`<span class="hljs-built_in">next</span>`
};
stack.push(fn1);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span><span class="hljs-params">()</span></span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2Timeout</span><span class="hljs-params">()</span></span> {
         console.log(<span class="hljs-string">'第二个调用'</span>);
         <span class="hljs-built_in">next</span>();  // 调用`<span class="hljs-built_in">next</span>`
    }, <span class="hljs-number">0</span>);
}
stack.push(fn2, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {
    console.log(<span class="hljs-string">'第三个调用'</span>);
    <span class="hljs-built_in">next</span>(); // 最后一个可以不调用，调用也没用。
});

<span class="hljs-built_in">next</span>(); // 调用<span class="hljs-built_in">next</span>，最终按顺序输出<span class="hljs-string">'第一个调用'</span>、<span class="hljs-string">'第二个调用'</span>、<span class="hljs-string">'第三个调用'</span>。</code></pre>
<p>现在<code>stack.forEach</code>一行已经删掉了，我们自行调用一次<code>next</code>，<code>next</code>会找出<code>stack</code>中的第一个函数<code>fn1</code>执行，<code>fn1</code> 里调用<code>next</code>，去找出下一个函数<code>fn2</code>并执行，<code>fn2</code>里再调用<code>next</code>，依此类推。</p>
<p>每一个函数里都必须调用<code>next</code>，如果某个函数里不写，执行完该函数后程序就会直接结束，没有任何机制继续。</p>
<p>了解了函数队列的这个实现后，你应该可以解决下面这道面试题了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)
/* 输出: 
Hi! This is Hank!
*/

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
/* 输出: 
Hi! This is Hank!
// 等待10秒..
Wake up after 10
Eat dinner~
*/

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)
/* 输出: 
Hi This is Hank!
Eat dinner~
Eat supper~
*/

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)
/* 等待5秒，输出
Wake up after 5
Hi This is Hank!
Eat supper
*/

// 以此类推。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 实现一个LazyMan，可以按照以下方式调用:</span>
<span class="hljs-function"><span class="hljs-title">LazyMan</span><span class="hljs-params">(“Hank”)</span></span>
<span class="hljs-comment">/* 输出: 
Hi! This is Hank!
*/</span>

<span class="hljs-function"><span class="hljs-title">LazyMan</span><span class="hljs-params">(“Hank”)</span></span>.sleep(<span class="hljs-number">10</span>).eat(“dinner”)输出
<span class="hljs-comment">/* 输出: 
Hi! This is Hank!
// 等待10秒..
Wake up after 10
Eat dinner~
*/</span>

<span class="hljs-function"><span class="hljs-title">LazyMan</span><span class="hljs-params">(“Hank”)</span></span>.eat(“dinner”).eat(“supper”)
<span class="hljs-comment">/* 输出: 
Hi This is Hank!
Eat dinner~
Eat supper~
*/</span>

<span class="hljs-function"><span class="hljs-title">LazyMan</span><span class="hljs-params">(“Hank”)</span></span>.sleepFirst(<span class="hljs-number">5</span>).eat(“supper”)
<span class="hljs-comment">/* 等待5秒，输出
Wake up after 5
Hi This is Hank!
Eat supper
*/</span>

<span class="hljs-comment">// 以此类推。</span></code></pre>
<p>Node.js 中大名鼎鼎的<code>connect</code>框架正是这样实现中间件队列的。有兴趣可以去看看它的<a href="https://github.com/senchalabs/connect/blob/master/index.js" rel="nofollow noreferrer" target="_blank">源码</a>或者这篇解读<a href="https://github.com/alsotang/node-lessons/tree/master/lesson18" rel="nofollow noreferrer" target="_blank">《何为 connect 中间件》</a>。</p>
<p>细心的你可能看出来，这个<code>next</code>暂时只能放在函数的末尾，如果放在中间，原来的问题还会出现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
    console.log(1);
    next();
    console.log(2); // next()如果调用了异步函数，console.log(2)就会先执行
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">next</span>();
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>); // <span class="hljs-keyword">next</span>()如果调用了异步函数，console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>)就会先执行
}</code></pre>
<p><a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">redux</a> 和<a href="http://koajs.com/" rel="nofollow noreferrer" target="_blank">koa</a> 通过不同的实现，可以让<code>next</code>放在函数中间，执行完后面的函数再折回来执行<code>next</code>下面的代码，非常巧妙。有空再写写。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 中如何实现函数队列？（一）

## 原文链接
[https://segmentfault.com/a/1190000008320677](https://segmentfault.com/a/1190000008320677)


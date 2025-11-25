---
title: 'JavaScript中的递归' 
date: 2019-01-11 2:30:08
hidden: true
slug: feqdcys3ubv
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按:</strong> 程序员应该知道递归，但是你真的知道是怎么回事么？</p>
<ul>
<li>原文: <a href="http://lucasfcosta.com/2017/05/08/All-About-Recursion-PTC-TCO-and-STC-in-JavaScript.html" rel="nofollow noreferrer" target="_blank">All About Recursion, PTC, TCO and STC in JavaScript</a>
</li>
<li>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。</strong></p>
<h3 id="articleHeader0">递归简介</h3>
<blockquote>一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量。</blockquote>
<p>我们来举个例子，我们可以用4的阶乘乘以4来定义5的阶乘，3的阶乘乘以4来定义4的阶乘，以此类推。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="factorial(5) = factorial(4) * 5
factorial(5) = factorial(3) * 4 * 5
factorial(5) = factorial(2) * 3 * 4 * 5
factorial(5) = factorial(1) * 2 * 3 * 4 * 5
factorial(5) = factorial(0) * 1 * 2 * 3 * 4 * 5
factorial(5) = 1 * 1 * 2 * 3 * 4 * 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">factorial(<span class="hljs-number">5</span>) = factorial(<span class="hljs-number">4</span>) * <span class="hljs-number">5</span>
factorial(<span class="hljs-number">5</span>) = factorial(<span class="hljs-number">3</span>) * <span class="hljs-number">4</span> * <span class="hljs-number">5</span>
factorial(<span class="hljs-number">5</span>) = factorial(<span class="hljs-number">2</span>) * <span class="hljs-number">3</span> * <span class="hljs-number">4</span> * <span class="hljs-number">5</span>
factorial(<span class="hljs-number">5</span>) = factorial(<span class="hljs-number">1</span>) * <span class="hljs-number">2</span> * <span class="hljs-number">3</span> * <span class="hljs-number">4</span> * <span class="hljs-number">5</span>
factorial(<span class="hljs-number">5</span>) = factorial(<span class="hljs-number">0</span>) * <span class="hljs-number">1</span> * <span class="hljs-number">2</span> * <span class="hljs-number">3</span> * <span class="hljs-number">4</span> * <span class="hljs-number">5</span>
factorial(<span class="hljs-number">5</span>) = <span class="hljs-number">1</span> * <span class="hljs-number">1</span> * <span class="hljs-number">2</span> * <span class="hljs-number">3</span> * <span class="hljs-number">4</span> * <span class="hljs-number">5</span></code></pre>
<p>用Haskell的Pattern matching 可以很直观的定义factorial函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="factorial n = factorial (n-1)  * n
factorial 0 = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell"><span class="hljs-title">factorial</span> n = factorial (n<span class="hljs-number">-1</span>)  * n
<span class="hljs-title">factorial</span> <span class="hljs-number">0</span> = <span class="hljs-number">1</span></code></pre>
<p>在递归的例子中，从第一个调用<code>factorial(5)</code>开始，一直递归调用<code>factorial</code>函数自身直到参数的值为0。下面是一个形象的图例：<br><span class="img-wrap"><img data-src="/img/remote/1460000009857475?w=1096&amp;h=1040" src="https://static.alili.tech/img/remote/1460000009857475?w=1096&amp;h=1040" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">递归的调用栈</h3>
<p>为了理解调用栈，我们回到<code>factorial</code>函数的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n) {
    if (n === 0) {
        return 1
    }

    return n * factorial(n - 1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    }

    <span class="hljs-keyword">return</span> n * factorial(n - <span class="hljs-number">1</span>)
}</code></pre>
<p>如果我们传入参数3，将会递归调用<code>factorial(2)</code>、<code>factorial(1)</code>和<code>factorial(0)</code>，因此会额外再调用<code>factorial</code>三次。</p>
<p>每次函数调用都会压入调用栈，整个调用栈如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="factorial(0) // 0的阶乘为1 
factorial(1) // 该调用依赖factorial(0)
factorial(2) // 该调用依赖factorial(1)
factorial(3) // 该掉用依赖factorial(2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">factorial(<span class="hljs-number">0</span>) <span class="hljs-comment">// 0的阶乘为1 </span>
factorial(<span class="hljs-number">1</span>) <span class="hljs-comment">// 该调用依赖factorial(0)</span>
factorial(<span class="hljs-number">2</span>) <span class="hljs-comment">// 该调用依赖factorial(1)</span>
factorial(<span class="hljs-number">3</span>) <span class="hljs-comment">// 该掉用依赖factorial(2)</span></code></pre>
<p>现在我们修改代码，插入<code>console.trace()</code>来查看每一次当前的调用栈的状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n) {
    console.trace()
    if (n === 0) {
        return 1
    }

    return n * factorial(n - 1)
}

factorial(3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.trace()
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    }

    <span class="hljs-keyword">return</span> n * factorial(n - <span class="hljs-number">1</span>)
}

factorial(<span class="hljs-number">3</span>)</code></pre>
<p>接下来我们看看调用栈是怎样的。<br>第一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Trace
    at factorial (repl:2:9)
    at repl:1:1 // 请忽略以下底层实现细节代码
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.onLine (repl.js:513:10)
    at emitOne (events.js:101:20)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Trace
    at factorial (repl:<span class="hljs-number">2</span>:<span class="hljs-number">9</span>)
    at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span> <span class="hljs-comment">// 请忽略以下底层实现细节代码</span>
    at realRunInThisContextScript (vm.js:<span class="hljs-number">22</span>:<span class="hljs-number">35</span>)
    at sigintHandlersWrap (vm.js:<span class="hljs-number">98</span>:<span class="hljs-number">12</span>)
    at ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">24</span>:<span class="hljs-number">12</span>)
    at REPLServer.defaultEval (repl.js:<span class="hljs-number">313</span>:<span class="hljs-number">29</span>)
    at bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)
    at REPLServer.runBound [<span class="hljs-keyword">as</span> <span class="hljs-built_in">eval</span>] (domain.js:<span class="hljs-number">293</span>:<span class="hljs-number">12</span>)
    at REPLServer.onLine (repl.js:<span class="hljs-number">513</span>:<span class="hljs-number">10</span>)
    at emitOne (events.js:<span class="hljs-number">101</span>:<span class="hljs-number">20</span>)</code></pre>
<p>你会发现，该调用栈包含一个对<code>factorial</code>函数的调用，这里是<code>factorial(3)</code>。接下来就更加有趣了，我们来看第二次打印出来的调用栈：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Trace
    at factorial (repl:2:9)
    at factorial (repl:7:12)
    at repl:1:1 // 请忽略以下底层实现细节代码
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.onLine (repl.js:513:10)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Trace
    at factorial (repl:<span class="hljs-number">2</span>:<span class="hljs-number">9</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">12</span>)
    at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span> <span class="hljs-comment">// 请忽略以下底层实现细节代码</span>
    at realRunInThisContextScript (vm.js:<span class="hljs-number">22</span>:<span class="hljs-number">35</span>)
    at sigintHandlersWrap (vm.js:<span class="hljs-number">98</span>:<span class="hljs-number">12</span>)
    at ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">24</span>:<span class="hljs-number">12</span>)
    at REPLServer.defaultEval (repl.js:<span class="hljs-number">313</span>:<span class="hljs-number">29</span>)
    at bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)
    at REPLServer.runBound [<span class="hljs-keyword">as</span> <span class="hljs-built_in">eval</span>] (domain.js:<span class="hljs-number">293</span>:<span class="hljs-number">12</span>)
    at REPLServer.onLine (repl.js:<span class="hljs-number">513</span>:<span class="hljs-number">10</span>)</code></pre>
<p>现在我们有两个对<code>factorial</code>函数的调用。</p>
<p>第三次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Trace
    at factorial (repl:2:9)
    at factorial (repl:7:12)
    at factorial (repl:7:12)
    at repl:1:1
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Trace
    at factorial (repl:<span class="hljs-number">2</span>:<span class="hljs-number">9</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">12</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">12</span>)
    at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span>
    at realRunInThisContextScript (vm.js:<span class="hljs-number">22</span>:<span class="hljs-number">35</span>)
    at sigintHandlersWrap (vm.js:<span class="hljs-number">98</span>:<span class="hljs-number">12</span>)
    at ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">24</span>:<span class="hljs-number">12</span>)
    at REPLServer.defaultEval (repl.js:<span class="hljs-number">313</span>:<span class="hljs-number">29</span>)
    at bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)
    at REPLServer.runBound [<span class="hljs-keyword">as</span> <span class="hljs-built_in">eval</span>] (domain.js:<span class="hljs-number">293</span>:<span class="hljs-number">12</span>)</code></pre>
<p>第四次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Trace
    at factorial (repl:2:9)
    at factorial (repl:7:12)
    at factorial (repl:7:12)
    at factorial (repl:7:12)
    at repl:1:1
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Trace
    at factorial (repl:<span class="hljs-number">2</span>:<span class="hljs-number">9</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">12</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">12</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">12</span>)
    at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span>
    at realRunInThisContextScript (vm.js:<span class="hljs-number">22</span>:<span class="hljs-number">35</span>)
    at sigintHandlersWrap (vm.js:<span class="hljs-number">98</span>:<span class="hljs-number">12</span>)
    at ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">24</span>:<span class="hljs-number">12</span>)
    at REPLServer.defaultEval (repl.js:<span class="hljs-number">313</span>:<span class="hljs-number">29</span>)
    at bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)</code></pre>
<p>设想，如果传入的参数值特别大，那么这个调用栈将会非常之大，最终可能超出调用栈的缓存大小而崩溃导致程序执行失败。那么如何解决这个问题呢？使用尾递归。</p>
<h3 id="articleHeader2">尾递归</h3>
<p>尾递归是一种递归的写法，可以避免不断的将函数压栈最终导致堆栈溢出。通过设置一个累加参数，并且每一次都将当前的值累加上去，然后递归调用。    </p>
<p>我们来看如何改写之前定义<code>factorial</code>函数为尾递归：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n, total = 1) {
    if (n === 0) {
        return total
    }

    return factorial(n - 1, n * total)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, total = <span class="hljs-number">1</span></span>) </span>{
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> total
    }

    <span class="hljs-keyword">return</span> factorial(n - <span class="hljs-number">1</span>, n * total)
}</code></pre>
<p><code>factorial(3)</code>的执行步骤如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="factorial(3, 1) 
factorial(2, 3) 
factorial(1, 6) 
factorial(0, 6) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">factorial(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>) 
factorial(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>) 
factorial(<span class="hljs-number">1</span>, <span class="hljs-number">6</span>) 
factorial(<span class="hljs-number">0</span>, <span class="hljs-number">6</span>) </code></pre>
<p>调用栈不再需要多次对<code>factorial</code>进行压栈处理，因为每一个递归调用都不在依赖于上一个递归调用的值。因此，空间的复杂度为o(1)而不是0(n)。</p>
<p>接下来，通过<code>console.trace()</code>函数将调用栈打印出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n, total = 1) {
    console.trace()
    if (n === 0) {
        return total
    }

    return factorial(n - 1, n * total)
}

factorial(3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, total = <span class="hljs-number">1</span></span>) </span>{
    <span class="hljs-built_in">console</span>.trace()
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> total
    }

    <span class="hljs-keyword">return</span> factorial(n - <span class="hljs-number">1</span>, n * total)
}

factorial(<span class="hljs-number">3</span>)</code></pre>
<p>很惊讶的发现，依然有很多压栈!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
// 下面是最后两次对factorial的调用
Trace
    at factorial (repl:2:9) // 3次压栈
    at factorial (repl:7:8)
    at factorial (repl:7:8)
    at repl:1:1 // 请忽略以下底层实现细节代码
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
Trace
    at factorial (repl:2:9) // 最后第一调用再次压栈
    at factorial (repl:7:8)
    at factorial (repl:7:8)
    at factorial (repl:7:8)
    at repl:1:1 // 请忽略以下底层实现细节代码
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ...</span>
<span class="hljs-comment">// 下面是最后两次对factorial的调用</span>
Trace
    at factorial (repl:<span class="hljs-number">2</span>:<span class="hljs-number">9</span>) <span class="hljs-comment">// 3次压栈</span>
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">8</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">8</span>)
    at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span> <span class="hljs-comment">// 请忽略以下底层实现细节代码</span>
    at realRunInThisContextScript (vm.js:<span class="hljs-number">22</span>:<span class="hljs-number">35</span>)
    at sigintHandlersWrap (vm.js:<span class="hljs-number">98</span>:<span class="hljs-number">12</span>)
    at ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">24</span>:<span class="hljs-number">12</span>)
    at REPLServer.defaultEval (repl.js:<span class="hljs-number">313</span>:<span class="hljs-number">29</span>)
    at bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)
    at REPLServer.runBound [<span class="hljs-keyword">as</span> <span class="hljs-built_in">eval</span>] (domain.js:<span class="hljs-number">293</span>:<span class="hljs-number">12</span>)
Trace
    at factorial (repl:<span class="hljs-number">2</span>:<span class="hljs-number">9</span>) <span class="hljs-comment">// 最后第一调用再次压栈</span>
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">8</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">8</span>)
    at factorial (repl:<span class="hljs-number">7</span>:<span class="hljs-number">8</span>)
    at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span> <span class="hljs-comment">// 请忽略以下底层实现细节代码</span>
    at realRunInThisContextScript (vm.js:<span class="hljs-number">22</span>:<span class="hljs-number">35</span>)
    at sigintHandlersWrap (vm.js:<span class="hljs-number">98</span>:<span class="hljs-number">12</span>)
    at ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">24</span>:<span class="hljs-number">12</span>)
    at REPLServer.defaultEval (repl.js:<span class="hljs-number">313</span>:<span class="hljs-number">29</span>)
    at bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)</code></pre>
<p>这是为什么呢？<br>在Nodejs下面，我们可以通过开启<code>strict mode</code>, 并且使用<code>--harmony_tailcalls</code>来开启尾递归(proper tail call)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

function factorial(n, total = 1) {
    console.trace()
    if (n === 0) {
        return total
    }

    return factorial(n - 1, n * total)
}

factorial(3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, total = <span class="hljs-number">1</span></span>) </span>{
    <span class="hljs-built_in">console</span>.trace()
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> total
    }

    <span class="hljs-keyword">return</span> factorial(n - <span class="hljs-number">1</span>, n * total)
}

factorial(<span class="hljs-number">3</span>)</code></pre>
<p>使用如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --harmony_tailcalls factorial.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">--harmony_tailcalls</span> factorial.js</code></pre>
<p>调用栈信息如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Trace
    at factorial (/Users/stefanzan/factorial.js:3:13)
    at Object.<anonymous> (/Users/stefanzan/factorial.js:9:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
Trace
    at factorial (/Users/stefanzan/factorial.js:3:13)
    at Object.<anonymous> (/Users/stefanzan/factorial.js:9:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
Trace
    at factorial (/Users/stefanzan/factorial.js:3:13)
    at Object.<anonymous> (/Users/stefanzan/factorial.js:9:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
Trace
    at factorial (/Users/stefanzan/factorial.js:3:13)
    at Object.<anonymous> (/Users/stefanzan/factorial.js:9:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Trace
    at factorial (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">3</span>:<span class="hljs-number">13</span>)
    at <span class="hljs-built_in">Object</span>.&lt;anonymous&gt; (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">9</span>:<span class="hljs-number">1</span>)
    at Module._compile (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">570</span>:<span class="hljs-number">32</span>)
    at <span class="hljs-built_in">Object</span>.Module._extensions..js (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">579</span>:<span class="hljs-number">10</span>)
    at Module.load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">487</span>:<span class="hljs-number">32</span>)
    at tryModuleLoad (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">446</span>:<span class="hljs-number">12</span>)
    at <span class="hljs-built_in">Function</span>.Module._load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">438</span>:<span class="hljs-number">3</span>)
    at Module.runMain (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">604</span>:<span class="hljs-number">10</span>)
    at run (bootstrap_node.js:<span class="hljs-number">394</span>:<span class="hljs-number">7</span>)
    at startup (bootstrap_node.js:<span class="hljs-number">149</span>:<span class="hljs-number">9</span>)
Trace
    at factorial (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">3</span>:<span class="hljs-number">13</span>)
    at <span class="hljs-built_in">Object</span>.&lt;anonymous&gt; (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">9</span>:<span class="hljs-number">1</span>)
    at Module._compile (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">570</span>:<span class="hljs-number">32</span>)
    at <span class="hljs-built_in">Object</span>.Module._extensions..js (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">579</span>:<span class="hljs-number">10</span>)
    at Module.load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">487</span>:<span class="hljs-number">32</span>)
    at tryModuleLoad (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">446</span>:<span class="hljs-number">12</span>)
    at <span class="hljs-built_in">Function</span>.Module._load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">438</span>:<span class="hljs-number">3</span>)
    at Module.runMain (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">604</span>:<span class="hljs-number">10</span>)
    at run (bootstrap_node.js:<span class="hljs-number">394</span>:<span class="hljs-number">7</span>)
    at startup (bootstrap_node.js:<span class="hljs-number">149</span>:<span class="hljs-number">9</span>)
Trace
    at factorial (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">3</span>:<span class="hljs-number">13</span>)
    at <span class="hljs-built_in">Object</span>.&lt;anonymous&gt; (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">9</span>:<span class="hljs-number">1</span>)
    at Module._compile (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">570</span>:<span class="hljs-number">32</span>)
    at <span class="hljs-built_in">Object</span>.Module._extensions..js (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">579</span>:<span class="hljs-number">10</span>)
    at Module.load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">487</span>:<span class="hljs-number">32</span>)
    at tryModuleLoad (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">446</span>:<span class="hljs-number">12</span>)
    at <span class="hljs-built_in">Function</span>.Module._load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">438</span>:<span class="hljs-number">3</span>)
    at Module.runMain (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">604</span>:<span class="hljs-number">10</span>)
    at run (bootstrap_node.js:<span class="hljs-number">394</span>:<span class="hljs-number">7</span>)
    at startup (bootstrap_node.js:<span class="hljs-number">149</span>:<span class="hljs-number">9</span>)
Trace
    at factorial (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">3</span>:<span class="hljs-number">13</span>)
    at <span class="hljs-built_in">Object</span>.&lt;anonymous&gt; (<span class="hljs-regexp">/Users/</span>stefanzan/factorial.js:<span class="hljs-number">9</span>:<span class="hljs-number">1</span>)
    at Module._compile (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">570</span>:<span class="hljs-number">32</span>)
    at <span class="hljs-built_in">Object</span>.Module._extensions..js (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">579</span>:<span class="hljs-number">10</span>)
    at Module.load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">487</span>:<span class="hljs-number">32</span>)
    at tryModuleLoad (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">446</span>:<span class="hljs-number">12</span>)
    at <span class="hljs-built_in">Function</span>.Module._load (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">438</span>:<span class="hljs-number">3</span>)
    at Module.runMain (<span class="hljs-built_in">module</span>.js:<span class="hljs-number">604</span>:<span class="hljs-number">10</span>)
    at run (bootstrap_node.js:<span class="hljs-number">394</span>:<span class="hljs-number">7</span>)
    at startup (bootstrap_node.js:<span class="hljs-number">149</span>:<span class="hljs-number">9</span>)</code></pre>
<p>你会发现，不会在每次调用的时候压栈，只有一个<code>factorial</code>。</p>
<p>注意：尾递归不一定会将你的代码执行速度提高；相反，<a href="https://github.com/tc39/proposal-ptc-syntax#performance" rel="nofollow noreferrer" target="_blank">可能会变慢</a>。不过，尾递归可以让你使用更少的内存，使你的递归函数更加安全 (前提是你要开启harmony模式)。</p>
<p>那么，博主这里就疑问了：为什么尾递归一定要开启<code>harmony</code>模式才可以呢？ 欢迎各位留言讨论。</p>
<h3 id="articleHeader3">关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了6亿+错误事件，得到了Google、360、金山软件等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/bVbhDhe?w=400&amp;h=225" src="https://static.alili.tech/img/bVbhDhe?w=400&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">版权声明</h3>
<p>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2017/06/14/all-about-recursions/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2017/06/14/all-about-recursions/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中的递归

## 原文链接
[https://segmentfault.com/a/1190000009857470](https://segmentfault.com/a/1190000009857470)


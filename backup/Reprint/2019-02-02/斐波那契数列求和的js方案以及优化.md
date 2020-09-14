---
title: '斐波那契数列求和的js方案以及优化' 
date: 2019-02-02 2:30:11
hidden: true
slug: ra80vichgxj
categories: [reprint]
---

{{< raw >}}

                    
<p>在<a href="https://www.codewars.com/" rel="nofollow noreferrer" target="_blank">codewars</a>上做了一道斐波那契数列求和的题目，做完之后做了一些简单的优化和用另一种方法实现。</p>
<h2 id="articleHeader0">题目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fibonacci(n) {
    if(n==0 || n == 1)
        return n;
    return fibonacci(n-1) + fibonacci(n-2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">if</span>(n==<span class="hljs-number">0</span> || n == <span class="hljs-number">1</span>)
        <span class="hljs-keyword">return</span> n;
    <span class="hljs-keyword">return</span> fibonacci(n<span class="hljs-number">-1</span>) + fibonacci(n<span class="hljs-number">-2</span>);
}</code></pre>
<p>以上函数使用递归的方式进行斐波那契数列求和，但效率十分低，很多值会重复求值。题目要求使用 memoization方案进行优化。</p>
<h2 id="articleHeader1">My Solution</h2>
<p>memoization方案在《JavaScript模式》和《JavaScript设计模式》都有提到。memoization是一种将函数执行结果用变量缓存起来的方法。当函数进行计算之前，先看缓存对象中是否有次计算结果，如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fibonacci = (function() {
  let memory = []
  return function(n) {
      if(memory[n] !== undefined) {
        return memory[n]
    }
    return memory[n] = (n === 0 || n === 1) ? n : fibonacci(n-1) + fibonacci(n-2)
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> fibonacci = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> memory = []
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
      <span class="hljs-keyword">if</span>(memory[n] !== <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">return</span> memory[n]
    }
    <span class="hljs-keyword">return</span> memory[n] = (n === <span class="hljs-number">0</span> || n === <span class="hljs-number">1</span>) ? n : fibonacci(n<span class="hljs-number">-1</span>) + fibonacci(n<span class="hljs-number">-2</span>)
  }
})()</code></pre>
<p>使用闭包实现的memoization函数。测试通过之后，突然我有一个小疑问，如果将memory的类型由数组换成对象，它的运算效率会有什么变化？于是，我将memory的类型换成了对象，并写了一个函数测试两种数据类型的运算效率。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function speed(n) {
    let start = performance.now()
    fibonacci(n)
    let end = performance.now()
    console.log(end - start)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speed</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">let</span> start = performance.now()
    fibonacci(n)
    <span class="hljs-keyword">let</span> end = performance.now()
    <span class="hljs-built_in">console</span>.log(end - start)
}</code></pre>
<blockquote><p>所有测试只在Chrome控制台测试,并且测试次数不多，结果不严谨，请多多包涵。</p></blockquote>
<p>memory类型为数组时（单位：毫秒）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="speed(500)      // 0.8150000050663948
speed(5000)     // 3.1799999997019768
speed(7500)     // 4.234999991953373
speed(10000)    // 8.390000000596046" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">speed(<span class="hljs-number">500</span>)      <span class="hljs-comment">// 0.8150000050663948</span>
speed(<span class="hljs-number">5000</span>)     <span class="hljs-comment">// 3.1799999997019768</span>
speed(<span class="hljs-number">7500</span>)     <span class="hljs-comment">// 4.234999991953373</span>
speed(<span class="hljs-number">10000</span>)    <span class="hljs-comment">// 8.390000000596046</span></code></pre>
<p>memory类型为对象时（单位：毫秒）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="speed(500)      // 0.32499999552965164
speed(5000)     // 1.6499999985098839
speed(7500)     // 2.485000006854534
speed(10000)    // 2.9999999925494194" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">speed(<span class="hljs-number">500</span>)      <span class="hljs-comment">// 0.32499999552965164</span>
speed(<span class="hljs-number">5000</span>)     <span class="hljs-comment">// 1.6499999985098839</span>
speed(<span class="hljs-number">7500</span>)     <span class="hljs-comment">// 2.485000006854534</span>
speed(<span class="hljs-number">10000</span>)    <span class="hljs-comment">// 2.9999999925494194</span></code></pre>
<p>虽然测试过程不严谨，但还是可以说明一点问题的。memory类型为对象是明显比类型为数组时，运算速度快很多。<del>至于为什么对象操作比数组操作的速度快，请原谅我水平有限，暂时答不上来。（先挖好坑，以后回来填坑，逃）</del>现在回来填坑，例如我们调用fibonacci(100)，这时候，fibonacci函数在第一次计算的时候会设置memory[100]=xxx，此时数组长度为101，而前面100项会初始化为undefined。正因为如此，memory的类型为数组的时候比类型是对象的时候慢。（这里药感谢<a href="https://segmentfault.com/u/hsfzxjy">hsfzxjy</a>的提醒）</p>
<h2 id="articleHeader2">Best Solution</h2>
<p>别人的解决方案给了我灵感，让我想出了一个缓存效率高很多的方案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fibonacci = (function () {
  var memory = {}
  return function(n) {
    if(n==0 || n == 1) {
      return n
    }
    if(memory[n-2] === undefined) {
      memory[n-2] = fibonacci(n-2)
    }
    if(memory[n-1] === undefined) {
      memory[n-1] = fibonacci(n-1)
    }
    return memory[n] = memory[n-1] + memory[n-2]
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fibonacci = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> memory = {}
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">if</span>(n==<span class="hljs-number">0</span> || n == <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">return</span> n
    }
    <span class="hljs-keyword">if</span>(memory[n<span class="hljs-number">-2</span>] === <span class="hljs-literal">undefined</span>) {
      memory[n<span class="hljs-number">-2</span>] = fibonacci(n<span class="hljs-number">-2</span>)
    }
    <span class="hljs-keyword">if</span>(memory[n<span class="hljs-number">-1</span>] === <span class="hljs-literal">undefined</span>) {
      memory[n<span class="hljs-number">-1</span>] = fibonacci(n<span class="hljs-number">-1</span>)
    }
    <span class="hljs-keyword">return</span> memory[n] = memory[n<span class="hljs-number">-1</span>] + memory[n<span class="hljs-number">-2</span>]
  }
})()</code></pre>
<p>测试结果就不放了（因为我发现在Chrome控制台中运行测试代码时，输出结果不稳定）。不过，这里的缓存效率的确是提高了，前面的方案，一次计算最多缓存一个结果，而这个方案，一次计算最多缓存三个结果。从这个方面考虑，运算速度理论上是会比前面的方案快的。</p>
<h2 id="articleHeader3">动态规划解决方案</h2>
<p>斐波那契数列求和除了可以用递归的方法解决，还可以用动态规划的方法解决。由于我是算法渣，对动态规划了解不多，只懂一点点皮毛，所以这里就不解释动态规划的概念了。（一不小心又挖了一个坑，逃）   </p>
<p>直接贴代码好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fibonacci(n) {
    let n1 = 1,
        n2 = 1,
        sum = 1
    for(let i = 3; i <= n; i += 1) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    return sum
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">let</span> n1 = <span class="hljs-number">1</span>,
        n2 = <span class="hljs-number">1</span>,
        sum = <span class="hljs-number">1</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">3</span>; i &lt;= n; i += <span class="hljs-number">1</span>) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    <span class="hljs-keyword">return</span> sum
}</code></pre>
<h2 id="articleHeader4">尾递归方案</h2>
<p>在ES6规范中，有一个<a href="http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96" rel="nofollow noreferrer" target="_blank">尾调用优化</a>，可以实现高效的尾递归方案。（感谢<a href="https://segmentfault.com/u/browsnet">李引证</a>的提醒）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
function fibonacci(n, n1, n2) {
    if(n <= 1) {
        return n2
    }
    return fibonacci(n - 1, n2, n1 + n2)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jacascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span>(<span class="hljs-params">n, n1, n2</span>) </span>{
    <span class="hljs-keyword">if</span>(n &lt;= <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> n2
    }
    <span class="hljs-keyword">return</span> fibonacci(n - <span class="hljs-number">1</span>, n2, n1 + n2)
}</code></pre>
<blockquote><p>ES6的尾调用优化只在严格模式下开启，正常模式是无效的。</p></blockquote>
<h2 id="articleHeader5">通项公式方案</h2>
<p>斐波那契数列是有<a href="http://baike.baidu.com/view/816.htm#2_2" rel="nofollow noreferrer" target="_blank">通项公式</a>的，但通项公式中有开方运算，在js中会存在误差，而<code>fib函数</code>中的Math.round正式解决这一问题的。（感谢<a href="https://segmentfault.com/u/lizheming">公子</a>的指导）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fibonacci(n){
    var sum = 0
    for(let i = 1; i <= n; i += 1) {
        sum += fib(i)
    }
    return sum

    function fib(n) {
      const SQRT_FIVE = Math.sqrt(5);
      return Math.round(1/SQRT_FIVE * (Math.pow(0.5 + SQRT_FIVE/2, n) - Math.pow(0.5 - SQRT_FIVE/2, n)));
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span>(<span class="hljs-params">n</span>)</span>{
    <span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= n; i += <span class="hljs-number">1</span>) {
        sum += fib(i)
    }
    <span class="hljs-keyword">return</span> sum

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fib</span>(<span class="hljs-params">n</span>) </span>{
      <span class="hljs-keyword">const</span> SQRT_FIVE = <span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">5</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.round(<span class="hljs-number">1</span>/SQRT_FIVE * (<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">0.5</span> + SQRT_FIVE/<span class="hljs-number">2</span>, n) - <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">0.5</span> - SQRT_FIVE/<span class="hljs-number">2</span>, n)));
    }
}</code></pre>
<h2 id="articleHeader6">结语</h2>
<p>只要注意细节，我们的代码还是有很大的优化空间的。有时候，你可能会疑惑，优化前后的性能没有明显的变化。我认为，那是你的应用规模或者数据量不够大而已，当它们大到一定程度的时候，优化的效果就很明显了。优化还是要坚持的，万一哪一天我们接手大型应用呢？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
斐波那契数列求和的js方案以及优化

## 原文链接
[https://segmentfault.com/a/1190000007115162](https://segmentfault.com/a/1190000007115162)


---
title: JavaScript循环和作用域
hidden: true
categories: [reprint]
slug: db5efcc5
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><a href="https://flaviocopes.com/javascript/">JavaScript</a>有一个特点，也许会让开发者头痛, 是与循环和作用域相关的.</p>
<p>举个例子:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> operations = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  operations.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(i)
  })
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> operation <span class="hljs-keyword">of</span> operations) {
  operation()
}


</code></pre><p>它基本是循环了5次，将一个函数添加到operations数组里面。这个函数可打印出循环变量索引值<code>i</code>.</p>
<p>运行这些函数后</p>
<p>期望的结果应该是:</p>
<pre><code class="hljs lsl"><span class="hljs-number">0</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">4</span>


</code></pre><p>但实际发生的是这样的:</p>
<pre><code class="hljs lsl"><span class="hljs-number">5</span>
<span class="hljs-number">5</span>
<span class="hljs-number">5</span>
<span class="hljs-number">5</span>
<span class="hljs-number">5</span>


</code></pre><p>为什么会有这种情况? 因为使用的是<code>var</code>.</p>
<p>由于<strong>提升</strong>了<code>var</code>变量, 上面的代码等同于</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> i;
<span class="hljs-keyword">const</span> operations = []

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  operations.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(i)
  })
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> operation <span class="hljs-keyword">of</span> operations) {
  operation()
}


</code></pre><p>因此，在for-of循环中, <code>i</code> 依然是可见的, 它等于5，并且每次在函数中涉及到<code>i</code> ,都将使用这个值。</p>
<p>那么我们应该如何做让其变成我们想的这样呢?</p>
<p>最简单的方案是用 <code>let</code> 声明. 在ES2015中介绍到, 它们有很大的帮助，能避免关于使用<code>var</code>声明的一些奇怪问题。</p>
<p>简单的在循环变量时将<code>var</code> 变成 <code>let</code> ,能够很好的运行：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> operations = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  operations.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(i)
  })
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> operation <span class="hljs-keyword">of</span> operations) {
  operation()
}


</code></pre><p>这是输出结果:</p>
<pre><code class="hljs lsl"><span class="hljs-number">0</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">4</span>


</code></pre><p>这是怎么实现的呢?这是因为每次循环重复的时候，都将重新创造 <code>i</code> ,同时每个函数添加<code>operations</code>数组时，能获取它本身的<code>i</code>。</p>
<p>记住你不能使用 <code>const</code>在这种情况下, 因为这会导致<code>for</code>在第二次循环时， 尝试赋新值报错。</p>
<p>另外一个非常普遍的解决这个问题是使用pre-ES6代码, 同时它被称作<strong>即时调用函数表达式</strong> (IIFE).</p>
<p>在这种情况下，你可以包装整个函数，并将<code>i</code> 绑定在它上面。自这种方式，你正在创造一个能立即执行的函数，你从其返回的一个新的函数。因此我们可以稍后执行它。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> operations = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  operations.push(<span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params">j</span>) =&gt; {
    <span class="hljs-keyword">return</span> (<span class="hljs-params"></span>) =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-params">j</span>)
  }</span>)(<span class="hljs-params">i</span>))
}

<span class="hljs-params">for</span> (<span class="hljs-params"><span class="hljs-keyword">const</span> operation of operations</span>) {
  <span class="hljs-params">operation</span><span class="hljs-params">()</span>
}


</span></code></pre>
          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/javascript-loops-and-scope](https://www.zcfy.cc/article/javascript-loops-and-scope)
原文标题: JavaScript循环和作用域

本文仅用于学习、研究和交流目的，欢迎非商业转载。转载请注明出处、完整链接。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

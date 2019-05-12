---
title: '我所不知的 JS' 
date: 2019-01-25 2:30:23
hidden: true
slug: rglihqnm4j
categories: [reprint]
---

{{< raw >}}

            <h1>我所不知的 JS</h1>
<p>几天前在阅读 MDN 文档时我发现了一些我从来不知道的 JS 特性和 API。 下面是一份简短的清单， 无论有用不有用 -- 学习 JS 的道路似乎是没有尽头的。</p>
<h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label">标签语句</a></h2>
<p>在 JS 中，你可以对 <code>for</code> 循环和代码块起名字... 谁知道呢（显然我不知道）！ 稍后你可以在<code>for</code> 循环中对该代码使用 <code>break</code> 或 <code>continue</code> 语句， 同时在代码块中也可以使用 <code>break</code>。</p>
<pre><code class="hljs jboss-cli">loop1: <span class="hljs-string">//</span> labeling <span class="hljs-string">"loop1"</span> 
for <span class="hljs-params">(let <span class="hljs-attr">i</span> = 0; i &lt; 3; i++)</span> { <span class="hljs-string">//</span> <span class="hljs-string">"loop1"</span>
   loop2: <span class="hljs-string">//</span> labeling <span class="hljs-string">"loop2"</span>
   for <span class="hljs-params">(let <span class="hljs-attr">j</span> = 0; j &lt; 3; j++)</span> { <span class="hljs-string">//</span> <span class="hljs-string">"loop2"</span>
      <span class="hljs-keyword">if</span> <span class="hljs-params">(<span class="hljs-attr">i</span> === 1)</span> {
         continue loop1; <span class="hljs-string">//</span> continues upper <span class="hljs-string">"loop1"</span>
         <span class="hljs-string">//</span> break loop1; <span class="hljs-string">//</span> breaks out of upper <span class="hljs-string">"loop1"</span>
      }
      console.log<span class="hljs-params">(`<span class="hljs-attr">i</span> = ${i}, <span class="hljs-attr">j</span> = ${j}`)</span>;
   }
}

/* 
 * <span class="hljs-comment"># Output</span>
 * i = 0, j = 0
 * i = 0, j = 1
 * i = 0, j = 2
 * i = 2, j = 0
 * i = 2, j = 1
 * i = 2, j = 2
 */

</code></pre><p>这是一个对代码块命名的例子，在代码块中只能使用 <code>break</code></p>
<pre><code class="hljs javascript">foo: {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'one'</span>);
  <span class="hljs-keyword">break</span> foo;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this log will not be executed'</span>);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'two'</span>);

<span class="hljs-comment">/*
 * # Output
 * one
 * two
 */</span>

</code></pre><h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void">"void" 操作符</a></h2>
<p>这之前我一直以为我掌握了所有的操作符，直到我看到了这个 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.1">从 1996 年就有</a>.的操作符。 所有浏览器都支持也非常的好理解， 用 MDN 的话：</p>
<blockquote>
<p>void 操作符执行表达式之后同时返回 undefined</p>
</blockquote>
<p>这样可以写出立即执行函数的另一种形式：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iife</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
}();

<span class="hljs-comment">// is the same as...</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iife</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
})()

</code></pre><p>对 void 的使用需要注意的是，表达式的执行结果是 空（undefined）！</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> word = <span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iife</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span>;
}();

<span class="hljs-comment">// word is "undefined"</span>

<span class="hljs-keyword">const</span> word = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iife</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span>;
})();

<span class="hljs-comment">// word is "hello"</span>

</code></pre><p>你可以将 <code>async</code> 与 <code>void</code> 相结合， 即可作为代码中的异步入口点：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">void</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'air.ghost.io'</span>); 
        <span class="hljs-keyword">const</span> text = <span class="hljs-keyword">await</span> response.text();
        <span class="hljs-built_in">console</span>.log(text);
    } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
}()

<span class="hljs-comment">// or just stick to this :)</span>

(<span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'air.ghost.io'</span>); 
        <span class="hljs-keyword">const</span> text = <span class="hljs-keyword">await</span> response.text();
        <span class="hljs-built_in">console</span>.log(text);
    } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
})();

</code></pre><h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator">逗号操作符</a></h2>
<p>在阅读完逗号表达式之后， 我并没有感到我完全理解了它是如何工作的。 引用 MDN 的话：</p>
<blockquote>
<p>逗号操作符执行其所有的操作数（从左到右）并返回最后一个操作数的结果。</p>
</blockquote>
<pre><code class="hljs coffeescript">function myFunc() {
  let x = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> (x += <span class="hljs-number">1</span>, x); <span class="hljs-regexp">//</span> same <span class="hljs-keyword">as</span> <span class="hljs-keyword">return</span> ++x;
}

y = <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>; <span class="hljs-regexp">//</span> returns <span class="hljs-literal">true</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">console</span>
<span class="hljs-built_in">console</span>.log(y); <span class="hljs-regexp">//</span> <span class="hljs-literal">false</span> (left-most)

z = (<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>); <span class="hljs-regexp">//</span> returns <span class="hljs-literal">true</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">console</span>
<span class="hljs-built_in">console</span>.log(z); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span> (right-most)

</code></pre><h3>与 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator">条件操作符</a> 一起使用</h3>
<p>逗号操作符的最后一个结果总是作为条件操作符的结果。 所以你可以在这之前放入任意数量的表达式， 在下面的例子中，我在返回的布尔值之前都放了一句 console log。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> <span class="hljs-keyword">type</span> = <span class="hljs-string">'man'</span>;

<span class="hljs-keyword">const</span> isMale = <span class="hljs-keyword">type</span> === <span class="hljs-string">'man'</span> ? (
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hi Man!'</span>),
    <span class="hljs-literal">true</span>
) : (
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hi Lady!'</span>),
    <span class="hljs-literal">false</span>
);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`isMale is "<span class="hljs-subst">${isMale}</span>"`</span>);

</code></pre><h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl">国际化 API</a></h2>
<p>在当前国际化要做好很难， 幸运的是，在大部门浏览器中都有 <a href="https://caniuse.com/#feat=internationalization">较好的 API 支持。</a> 其中我所喜欢的其中一项就是日期格式化， 看下面的例子。</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

<span class="hljs-keyword">const</span> options = {
  <span class="hljs-attribute">year</span>: <span class="hljs-string">'numeric'</span>, 
  <span class="hljs-attribute">month</span>: <span class="hljs-string">'long'</span>, 
  <span class="hljs-attribute">day</span>: <span class="hljs-string">'numeric'</span>
};

<span class="hljs-keyword">const</span> formatter1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.DateTimeFormat(<span class="hljs-string">'es-es'</span>, options);
<span class="hljs-built_in">console</span>.log(formatter1.format(<span class="hljs-built_in">date</span>)); <span class="hljs-comment">// 22 de diciembre de 2017</span>

<span class="hljs-keyword">const</span> formatter2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.DateTimeFormat(<span class="hljs-string">'en-us'</span>, options);
<span class="hljs-built_in">console</span>.log(formatter2.format(<span class="hljs-built_in">date</span>)); <span class="hljs-comment">// December 22, 2017</span>

</code></pre><h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator">管道操作符</a></h2>
<p>在撰写本篇文章时，此功能仅在 Firefox 58+ 使用参数开启， 然而在 Babel 中已经有一个针对此操作符提案的 <a href="https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator">插件</a>了。 看起来非常好，我很喜欢！</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> square = <span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n * n;
<span class="hljs-keyword">const</span> increment = <span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n + <span class="hljs-number">1</span>;

<span class="hljs-comment">// without pipeline operator</span>
square(increment(square(<span class="hljs-number">2</span>))); <span class="hljs-comment">// 25</span>

<span class="hljs-comment">// with pipeline operator</span>
<span class="hljs-number">2</span> |&gt; square |&gt; increment |&gt; square; <span class="hljs-comment">// 25</span>

</code></pre><h1>值得注意的</h1>
<h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics">原子性</a></h2>
<p>原子操作带来了可预测的读写结果，特别是当数据在多个线程中共享时，下一个操作会等待其他操作完成之后才会被执行。 对于主线程和其他 WebWorker 之间保持数据同步来说非常有用。</p>
<p>我很喜欢其他编程语言中的原子特性，例如 Java 中。 我觉得在之后使用 WebWorker 将事务从主线程中转移出来之后会使用得更多。</p>
<h2><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight">Array.prototype.reduceRight</a></h2>
<p>我之前从未见过其使用，因为基本上他就是 <code>Array.prototype.reduce()</code> 和 <code>Array.prototype.reverse()</code> 的结合，对于它的使用应该是比较少见的，如果你需要的话，那这个还是挺合适你的！</p>
<pre><code class="hljs smali">const flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
   <span class="hljs-built_in"> return </span>a.concat(b);
}, []);

// flattened<span class="hljs-built_in"> array </span>is [4, 5, 2, 3, 0, 1]

</code></pre><h2><a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval">setTimeout() 参数</a></h2>
<p>在了解到这个功能之后节省了 <code>.bind()</code> 的使用，这个特性从一开始就有了。</p>
<pre><code class="hljs mel">setTimeout(alert, <span class="hljs-number">1000</span>, <span class="hljs-string">'Hello world!'</span>);

<span class="hljs-comment">/*
 * # Output (alert)
 * Hello World!
 */</span>

function <span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>, textTwo) {
    console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>, textTwo);
}

setTimeout(<span class="hljs-keyword">log</span>, <span class="hljs-number">1000</span>, <span class="hljs-string">'Hello World!'</span>, <span class="hljs-string">'And Mars!'</span>);

<span class="hljs-comment">/*
 * # Output
 * Hello World! And Mars!
 */</span>

</code></pre><h2><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset">HTMLElement.dataset</a></h2>
<p>在之前我在 HTML 元素上使用自定义数据属性 <code>data-*</code>，但我浑然不知有 API 能够轻松的做读取。 抛开一些特殊的命名限制（看标题链接），其基本上就是横线隔开在 JS 中使用时则用驼峰规则。 所以属性 <code>data-birth-planet</code> 在 JS 中会变成 <code>birthPlanet</code>。</p>
<pre><code class="hljs coffeescript">`<span class="javascript">&lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></span>`

</code></pre><p>读取:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> personEl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#person'</span>);

<span class="hljs-built_in">console</span>.log(person.dataset) <span class="hljs-comment">// DOMStringMap {name: "john", birthPlanet: "earth"}</span>
<span class="hljs-built_in">console</span>.log(personEl.dataset.name) <span class="hljs-comment">// john</span>
<span class="hljs-built_in">console</span>.log(personEl.dataset.birthPlanet) <span class="hljs-comment">// earth</span>

<span class="hljs-comment">// you can programmatically add more too</span>
personEl.dataset.foo = <span class="hljs-string">'bar'</span>;
<span class="hljs-built_in">console</span>.log(personEl.dataset.foo); <span class="hljs-comment">// bar</span>

</code></pre><h1>结语</h1>
<p>希望你能在JS想我一样发现新东西。 同时为新的 MDN 网站给 Mozilla 打Call， 在我看来好多了 - 看完比我预期的时间要长。</p>
<p>Happy New 2018!</p>
<h4><a href="http://air.ghost.io/author/skyllo/">Nick</a></h4>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我所不知的 JS

## 原文链接
[https://www.zcfy.cc/article/js-things-i-never-knew-existed](https://www.zcfy.cc/article/js-things-i-never-knew-existed)


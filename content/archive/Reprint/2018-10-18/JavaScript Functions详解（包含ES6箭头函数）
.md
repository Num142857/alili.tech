---
title: JavaScript Functions详解（包含ES6箭头函数）
hidden: true
categories: [reprint]
slug: 2d483fa4
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h2>简介</h2>
<p>JavaScript中的所有内容都发生在函数中。</p>
<p>函数是一个代码块，可以定义一次并随时运行。</p>
<p>函数可以选择接受参数，并返回一个值。</p>
<p>JavaScript中的函数是<strong>对象</strong>，一种特殊的对象：<strong>函数对象</strong>。</p>
<p>另外，函数被称为<strong>第一类函数</strong>，因为它们可以被赋值给一个值，它们可以作为参数传递并用作返回值。</p>
<h2>句法</h2>
<p>让我们从“旧的”，ES6 / ES2015之前的语法开始。这是一个<strong>函数声明</strong>：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span><span class="hljs-params">(foo)</span> </span>{
  <span class="hljs-comment">// do something</span>
}


</code></pre><p>（现在，在ES6 / ES2015世界中，被称为<strong>常规函数</strong>）</p>
<p>函数可以分配给变量（这称为<strong>函数表达式</strong>）：</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(foo)</span> </span>{
  <span class="hljs-comment">// do something</span>
}


</code></pre><p><strong>命名函数表达式</strong>类似，但在堆栈调用跟踪中更好用，这在发生错误时很有用 - 它保存函数的名称：</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span><span class="hljs-params">(foo)</span> </span>{
  <span class="hljs-comment">// do something</span>
}


</code></pre><p>ES6 / ES2015引入了<strong>箭头函数</strong>，在使用内联函数时，特别适合用作参数或回调函数：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function"><span class="hljs-params">foo</span> =&gt;</span> {
  <span class="hljs-comment">//do something</span>
}


</code></pre><p>箭头函数与上面的其他函数定义有很大的不同，我们稍后会解释。</p>
<h2>参数</h2>
<p>一个函数可以有一个或多个参数。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">//do something</span>
}

<span class="hljs-keyword">const</span> dosomethingElse = <span class="hljs-function"><span class="hljs-params">foo</span> =&gt;</span> {
  <span class="hljs-comment">//do something</span>
}

<span class="hljs-keyword">const</span> dosomethingElseAgain = <span class="hljs-function">(<span class="hljs-params">foo, bar</span>) =&gt;</span> {
  <span class="hljs-comment">//do something</span>
}


</code></pre><p>从ES6 / ES2015开始，函数可以具有参数的默认值：</p>
<pre><code class="hljs coffeescript">const dosomething = <span class="hljs-function"><span class="hljs-params">(foo = <span class="hljs-number">1</span>, bar = <span class="hljs-string">'hey'</span>)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span><span class="hljs-keyword">do</span> something
}


</code></pre><p>这允许您在不填充所有参数的情况下调用函数：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">dosomething</span><span class="hljs-params">(<span class="hljs-number">3</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">dosomething</span><span class="hljs-params">()</span></span>


</code></pre><p>ES2018引入了参数的尾随逗号，这个功能有助于减少因移动参数时丢失逗号而导致的错误（例如，移动中间的最后一个）：</p>
<pre><code class="hljs coffeescript">const dosomething = <span class="hljs-function"><span class="hljs-params">(foo = <span class="hljs-number">1</span>, bar = <span class="hljs-string">'hey'</span>)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span><span class="hljs-keyword">do</span> something
}

dosomething(<span class="hljs-number">2</span>, <span class="hljs-string">'ho!'</span>)


</code></pre><p>您可以将所有参数包装在一个数组中，并在调用函数时使用spread运算符：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function">(<span class="hljs-params">foo = <span class="hljs-number">1</span>, bar = <span class="hljs-string">'hey'</span></span>) =&gt;</span> {
  <span class="hljs-comment">//do something</span>
}
<span class="hljs-keyword">const</span> args = [<span class="hljs-number">2</span>, <span class="hljs-string">'ho!'</span>]
dosomething(...args)


</code></pre><p>当使用许多参数的时候，记住这些参数可能很困难。这里可以使用对象，解构保留参数名称：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function">(<span class="hljs-params">{ foo = <span class="hljs-number">1</span>, bar = <span class="hljs-string">'hey'</span> }</span>) =&gt;</span> {
  <span class="hljs-comment">//do something</span>
  <span class="hljs-built_in">console</span>.log(foo) <span class="hljs-comment">// 2</span>
  <span class="hljs-built_in">console</span>.log(bar) <span class="hljs-comment">// 'ho!'</span>
}
<span class="hljs-keyword">const</span> args = { <span class="hljs-attr">foo</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">'ho!'</span> }
dosomething(args)


</code></pre><h2>返回值</h2>
<p>每个函数都返回一个值，默认情况下为“undefined”。</p>
<p><img src="https://p0.ssl.qhimg.com/t010130d4733855f140.png" alt="Undefined return value"></p>
<p>任何函数在其代码行结束时，或者当执行流找到<code>return</code>关键字时终止。</p>
<p>当JavaScript遇到此关键字时，它退出函数执行并将控制权交还给其调用者。</p>
<p>如果传递一个值，则该值将作为函数的结果返回：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> dosomething = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">'test'</span>
}
<span class="hljs-keyword">const</span> result = dosomething() <span class="hljs-comment">// result === 'test'</span>


</code></pre><p>您只能返回一个值。</p>
<p>要_模拟_返回多个值，您可以返回<strong>对象文字</strong>或<strong>数组</strong>，并在调用时使用<a href="https://flaviocopes.com/ecmascript/#destructuring-assignments">解构赋值</a>功能。</p>
<p>使用数组：</p>
<p><img src="https://p0.ssl.qhimg.com/t010acfea4f4be3a7b3.png" alt="Destructuring using arrays"></p>
<p>使用对象：</p>
<p><img src="https://p0.ssl.qhimg.com/t01a912818eeb605c4c.png" alt="Destructuring using objects"></p>
<h2>嵌套函数</h2>
<p>可以在其他函数中定义函数：</p>
<pre><code class="hljs coffeescript">const dosomething = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  const dosomethingelse = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
  dosomethingelse()
  <span class="hljs-keyword">return</span> <span class="hljs-string">'test'</span>
}


</code></pre><p>嵌套函数的作用域是外部函数，不能从外部调用。</p>
<h2>对象方法</h2>
<p>当用作对象属性时，函数称为方法：</p>
<pre><code class="hljs vim">const car = {
  brand: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-keyword">mode</span><span class="hljs-variable">l:</span> <span class="hljs-string">'Fiesta'</span>,
  <span class="hljs-keyword">star</span><span class="hljs-variable">t:</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(Started)
  }
}

car.start()


</code></pre><h2>箭头函数中的<code>this</code></h2>
<p>当箭头函数与常规函数用作对象方法时，有一个重要的行为。考虑这个例子：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> car = {
  <span class="hljs-attr">brand</span>: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">'Fiesta'</span>,
  <span class="hljs-attr">start</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(Started ${<span class="hljs-keyword">this</span>.brand} ${<span class="hljs-keyword">this</span>.model})
  },
  <span class="hljs-attr">stop</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(Stopped ${<span class="hljs-keyword">this</span>.brand} ${<span class="hljs-keyword">this</span>.model})
  }
}


</code></pre><p><code>stop（）</code>方法不能像你期望的那样工作。</p>
<p><img src="https://p0.ssl.qhimg.com/t01002a63df67722931.png" alt="Difference in arrow functions of this in methods"></p>
<p>这是因为<code>this</code>的处理在两个函数声明样式中是不同的。箭头函数中的<code>this</code>指的是封闭函数上下文，在本例中是<code>window</code>对象</p>
<p><img src="https://p0.ssl.qhimg.com/t01d733b90bb9e19d70.png" alt="this points to the window object"></p>
<p><code>this</code>，使用<code>function（）</code>引用宿主对象</p>
<p>这意味着<strong>箭头函数不适合用于对象方法</strong>和构造函数（箭头函数构造函数实际上会在调用时引发<code>TypeError</code>）。</p>
<h2>IIFE，立即调用函数表达式</h2>
<p>IIFE是一个在声明后立即执行的功能：</p>
<pre><code class="hljs javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'executed'</span>)
})()


</code></pre><p>您可以将结果分配给变量：</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> something = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'something'</span>
})()


</code></pre><p>它们非常方便，因为您无需在定义后单独调用该函数。</p>
<h2>Function 挂载</h2>
<p>执行代码之前的JavaScript会根据某些规则对其进行重新排序。</p>
<p>会将函数移动到其范围的顶部。这就是下面例子不会报错的原因;</p>
<pre><code class="hljs javascript">dosomething()
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'did something'</span>)
}


</code></pre><p><img src="https://p0.ssl.qhimg.com/t0102a94671f266ff7b.png" alt="Hoisting example"></p>
<p>在内部，JavaScript在调用之前移动函数，以及在同一范围内找到的所有其他函数：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'did something'</span>)
}
dosomething()


</code></pre><p>现在，如果你使用命名函数表达式，因为你正在使用<a href="https://flaviocopes.com/javascript-variables/">变量</a>，会发生不同的事情。变量声明被提升，但不是值，因此不是函数。</p>
<pre><code class="hljs javascript">dosomething()
<span class="hljs-keyword">const</span> dosomething = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'did something'</span>)
}


</code></pre><p>不会工作：</p>
<p><img src="https://p0.ssl.qhimg.com/t01d1d015db154dd89a.png" alt="Hoisting named functions"></p>
<p>这是因为内部发生的事情是：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> dosomething
dosomething()
dosomething = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'did something'</span>)
}


</code></pre><p>“let”声明也是如此。<code>var</code>声明也不起作用，但是报的不是同样的错误：</p>
<p><img src="https://p0.ssl.qhimg.com/t012b57898c7f816900.png" alt="Hoisting var declarations"></p>
<p>这是因为<code>var</code>声明被提升并用<code>undefined</code>作为值初始化，而<code>const</code>和<code>let</code>被提升但未初始化。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/javascript-functions](https://www.zcfy.cc/article/javascript-functions)
原文标题: JavaScript Functions详解（包含ES6箭头函数）

本文仅用于学习、研究和交流目的，欢迎非商业转载。转载请注明出处、完整链接。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

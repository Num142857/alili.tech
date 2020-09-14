---
title: '生成器（Generator）' 
date: 2019-02-11 2:30:49
hidden: true
slug: 3w4rq2vmuyy
categories: [reprint]
---

{{< raw >}}

                    
<p>生成器（Generator）可以说是在 ES2015 中最为强悍的一个新特性，因为生成器是涉及到 ECMAScript 引擎运行底层的特性，生成器可以实现一些从前无法想象的事情。</p>
<h2 id="articleHeader0">来龙</h2>
<p>生成器第一次出现在 CLU<sup>1</sup> 语言中，这门语言是由 MIT （美国麻省理工大学）的 Barbara Liskov 教授和她的学生们在 1974 年至 1975 年所设计和开发出来的。这门语言虽然古老，但是却提出了很多如今被广泛使用的编程语言特性，而生成器便是其中的一个。</p>
<p>而在 CLU 语言之后，有 Icon 语言<sup>2</sup>、Python 语言<sup>3</sup>、C# 语言<sup>4</sup>和 Ruby 语言<sup>5</sup>等都受 CLU 语言影响，实现了生成器的特性。在 CLU 语言和 C# 语言中，生成器被称为迭代器（Iterator），而在 Ruby 语言中称为枚举器（Enumerator）。</p>
<p>然而无论它被成为什么，所被赋予的能力都是相同的。生成器的主要目的是用于通过一段程序，来持续被迭代或枚举出符合某个公式或算法的有序数列中的元素，而这个程序便是用于实现这个公式或算法，而不需要将目标数列完整写出。</p>
<p>我们来举一个简单的例子，斐波那契数列是非常著名一个理论数学基础数列。它的前两项是 0 和 1，从第三项开始所有的元素都遵循这样的一条公式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004993566" src="https://static.alili.tech/img/remote/1460000004993566" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>那么，依靠程序我们可以这样实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fibonacci = [ 0, 1 ]
const n = 10

for (let i = 2; i < n - 1; ++i) {
  fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2])
}
console.log(fibonacci) //=> [0, 1, 1, 2, 3, 5, 8, 13, 21]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fibonacci = [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]
<span class="hljs-keyword">const</span> n = <span class="hljs-number">10</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>; i &lt; n - <span class="hljs-number">1</span>; ++i) {
  fibonacci.push(fibonacci[i - <span class="hljs-number">1</span>] + fibonacci[i - <span class="hljs-number">2</span>])
}
<span class="hljs-built_in">console</span>.log(fibonacci) <span class="hljs-comment">//=&gt; [0, 1, 1, 2, 3, 5, 8, 13, 21]</span></code></pre>
<p>但是这种需要确定一个数量来取得相应的数列，但若需要按需获取元素，那就可以使用生成器来实现了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* fibo() {
  let a = 0
  let b = 1

  yield a
  yield b

  while (true) {
    let next = a + b
    a = b
    b = next
    yield next
  }
}

let generator = fibo()

for (var i = 0; i < 10; i++)
  console.log(generator.next().value) //=> 0 1 1 2 3 5 8 13 21 34 55" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fibo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> b = <span class="hljs-number">1</span>

  <span class="hljs-keyword">yield</span> a
  <span class="hljs-keyword">yield</span> b

  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> next = a + b
    a = b
    b = next
    <span class="hljs-keyword">yield</span> next
  }
}

<span class="hljs-keyword">let</span> generator = fibo()

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++)
  <span class="hljs-built_in">console</span>.log(generator.next().value) <span class="hljs-comment">//=&gt; 0 1 1 2 3 5 8 13 21 34 55</span></code></pre>
<p>你一定会对这段代码感到很奇怪：为什么 <code>function</code> 语句后会有一个 <code>*</code>？为什么函数里使用了 <code>while (true)</code> 却没有因为进入死循环而导致程序卡死？而这个 <code>yield</code> 又是什么语句？k4</p>
<p>不必着急，我们一一道来。</p>
<h2 id="articleHeader1">基本概念</h2>
<p>生成器是 ES2015 中同时包含语法和底层支持的一个新特性，其中有几个相关的概念是需要先了解的。</p>
<h3 id="articleHeader2">生成器函数（Generator Function）</h3>
<p>生成器函数是 ES2015 中生成器的最主要表现方式，它与普通的函数语法差别在于，在 <code>function</code> 语句之后和函数名之前，有一个 <code>*</code> 作为它是一个生成器函数的标示符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* fibo() {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fibo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>生成器函数的定义并不是强制性使用声明式的，与普通函数一样可以使用定义式进行定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fnName = function*() { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> fnName = <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>生成器函数的函数体内容将会是所生成的生成器的执行内容，在这些内容之中，<code>yield</code> 语句的引入使得生成器函数与普通函数有了区别。<code>yield</code> 语句的作用与 <code>return</code> 语句有些相似，但 <code>yield</code> 语句的作用并非退出函数体，而是<strong>切出当前函数的运行时</strong>（此处为一个类协程，Semi-coroutine），并与此同时可以讲一个值（可以是任何类型）带到主线程中。</p>
<p>我们以一个比较形象的例子来做比喻，你可以把整个生成器运行时看成一条长长的瑞士卷（<code>while (true)</code> 则就是无限长的），ECMAScript 引擎在每一次遇到 <code>yield</code> 就要切一刀，而切面所成的“纹路”则是 <code>yield</code> 出来的值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006771593" src="https://static.alili.tech/img/remote/1460000006771593" alt="Swiss Roll" title="Swiss Roll" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">生成器（Generator）</h3>
<p>从计算机科学角度上看，生成器是一种类协程或半协程（Semi-coroutine），生成器提供了一种可以通过特定语句或方法来使生成器的执行对象（Execution）暂停，而这语句一般都是 <code>yield</code>。上面的斐波那契数列的生成器便是通过 <code>yield</code> 语句将每一次的公式计算结果切出执行对象，并带到主线程上来。</p>
<p>在 ES2015 中，<code>yield</code> 可以将一个值带出协程，而主线程也可以通过生成器对象的方法将一个值带回生成器的执行对象中去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const inputValue = yield outputValue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> inputValue = <span class="hljs-keyword">yield</span> outputValue</code></pre>
<p>生成器切出执行对象并带出 <code>outputValue</code>，主线程经过同步或异步的处理后，通过 <code>.next(val)</code> 方法将 <code>inputValue</code> 带回生成器的执行对象中。</p>
<h2 id="articleHeader4">使用方法</h2>
<p>在了解了生成器的背景知识后，我们就可以开始来看看在 ES2015 中，我们要如何使用这个新特性。</p>
<h3 id="articleHeader5">构建生成器函数</h3>
<p>使用生成器的第一步自然是要构建一个生成器函数，以生成相对应的生成器对象。假设我们需要按照下面这个公式来生成一个数列，并以生成器作为构建基础。（此处我们暂不作公式化简）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004993568" src="https://static.alili.tech/img/remote/1460000004993568" alt="" title="" style="cursor: pointer;"></span></p>
<p>为了使得生成器能够不断根据公式输出数列元素，我们与上面的斐波那契数列实例一样，使用 <code>while (true)</code> 循环以保持程序的不断执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFn() {
  let a = 2
  
  yield a
  
  while (true) {
    yield a = a / (2 * a + 1)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>
  
  <span class="hljs-keyword">yield</span> a
  
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span> a = a / (<span class="hljs-number">2</span> * a + <span class="hljs-number">1</span>)
  }
}</code></pre>
<p>在定义首项为 2 之后，首先将首项通过 <code>yield</code> 作为第一个值切出，其后通过循环和公式将每一项输出。</p>
<h3 id="articleHeader6">启动生成器</h3>
<p>生成器函数不能直接作为函数来使用，执行生成器函数会返回一个生成器对象，将用于运行生成器内容和接受其中的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const gen = genFn()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> gen = genFn()</code></pre>
<p>生成器是是通过生成器函数的一个生成器（类）实例，我们可以简单地用一段伪代码来说明生成器这个类的基本内容和用法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Generator {
  next(value)
  throw(error)
  [@iterator]()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Generator</span> </span>{
  next(value)
  <span class="hljs-keyword">throw</span>(error)
  [@iterator]()
}</code></pre>
<table>
<thead><tr>
<th>操作方法（语法）</th>
<th>方法内容</th>
</tr></thead>
<tbody>
<tr>
<td><code>generator.next(value)</code></td>
<td>获取下一个生成器切出状态。（第一次执行时为第一个切出状态）。</td>
</tr>
<tr>
<td><code>generator.throw(error)</code></td>
<td>向当前生成器执行对象抛出一个错误，并终止生成器的运行。</td>
</tr>
<tr>
<td><code>generator[@iterator]</code></td>
<td>
<code>@iterator</code> 即 <code>Symbol.iterator</code>，为生成器提供实现可迭代对象的方法。使其可以直接被 <code>for...of</code> 循环语句直接使用。</td>
</tr>
</tbody>
</table>
<p>其中 <code>.next(value)</code> 方法会返回一个状态对象，其中包含当前生成器的运行状态和所返回的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  value: Any,
  done: Boolean
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">value</span>: Any,
  <span class="hljs-attr">done</span>: <span class="hljs-built_in">Boolean</span>
}</code></pre>
<p>生成器执行对象会不断检查生成器的状态，一旦遇到生成器内的最后一个 <code>yield</code> 语句或第一个 <code>return</code> 语句时，生成器便进入终止状态，即状态对象中的 <code>done</code> 属性会从 <code>false</code> 变为 <code>true</code>。</p>
<p>而 <code>.throw(error)</code> 方法会提前让生成器进入终止状态，并将 <code>error</code> 作为错误抛出。</p>
<h3 id="articleHeader7">运行生成器内容</h3>
<p>因为生成器对象自身也是一种可迭代对象，所以我们直接使用 <code>for...of</code> 循环将其中输出的值打印出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (const a of gen) {
  if (a < 1/100) break
    
  console.log(a)
}
//=>
//  2
//  0.4
//  0.2222222222
//  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> a <span class="hljs-keyword">of</span> gen) {
  <span class="hljs-keyword">if</span> (a &lt; <span class="hljs-number">1</span>/<span class="hljs-number">100</span>) <span class="hljs-keyword">break</span>
    
  <span class="hljs-built_in">console</span>.log(a)
}
<span class="hljs-comment">//=&gt;</span>
<span class="hljs-comment">//  2</span>
<span class="hljs-comment">//  0.4</span>
<span class="hljs-comment">//  0.2222222222</span>
<span class="hljs-comment">//  ...</span></code></pre>
<h2 id="articleHeader8">深入理解</h2>
<h3 id="articleHeader9">运行模式</h3>
<p>为了能更好地理解生成器内部的运行模式，我们将上面的这个例子以流程图的形式展示出来。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004993545" src="https://static.alili.tech/img/remote/1460000004993545" alt="图解 Generator" title="图解 Generator" style="cursor: pointer;"></span></p>
<p>生成器是一种可以被暂停的运行时，在这个例子中，每一次 <code>yield</code> 都会将当前生成器执行对象暂停并输出一个值到主线程。而这在生成器内部的代码是不需要做过多体现的，只需要清楚 <code>yield</code> 语句是暂停的标志及其作用即可。</p>
<h3 id="articleHeader10">生成器函数以及生成器对象的检测</h3>
<p>事实上 ES2015 的生成器函数也是一种构造函数或类，开发者定义的每一个生成器函数都可以看做对应生成器的类，而所产生的生成器都是这些类的派生实例。</p>
<p>在很多基于类（或原型）的库中，我们可以经常看到这样的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Point(x, y) {
  if (!(this instanceof Point)) return new Point(x, y)
  // ...
}

const p1 = new Point(1, 2)
const p2 = Point(2, 3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Point)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Point(x, y)
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">const</span> p1 = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
<span class="hljs-keyword">const</span> p2 = Point(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)</code></pre>
<p>这一句代码的作用是为了避免开发者在创建某一个类的实例时，没有使用 <code>new</code> 语句而导致的错误。而 ECMAScript 內部中的绝大部分类型构造函数（不包括 <code>Map</code> 和 <code>Set</code> 及他们的 <code>Weak</code> 版本）都带有这种特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String()  //=> &quot;&quot;
Number()  //=> 0
Boolean() //=> false
Object()  //=> Object {}
Array()   //=> []
Date()    //=> the current time
RegExp()  //=> /(?:)/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">String</span>()  <span class="hljs-comment">//=&gt; ""</span>
<span class="hljs-built_in">Number</span>()  <span class="hljs-comment">//=&gt; 0</span>
<span class="hljs-built_in">Boolean</span>() <span class="hljs-comment">//=&gt; false</span>
<span class="hljs-built_in">Object</span>()  <span class="hljs-comment">//=&gt; Object {}</span>
<span class="hljs-built_in">Array</span>()   <span class="hljs-comment">//=&gt; []</span>
<span class="hljs-built_in">Date</span>()    <span class="hljs-comment">//=&gt; the current time</span>
<span class="hljs-built_in">RegExp</span>()  <span class="hljs-comment">//=&gt; /(?:)/</span></code></pre>
<blockquote><p>TIPS: 在代码风格检查工具 ESLint 中有一个可选特性名为 <code>no-new</code> 即相比使用 <code>new</code>，更倾向于使用直接调用构造函数来创建实例。</p></blockquote>
<p>那么同样的，生成器函数也支持这种特性，而在互联网上的大多数文献都使用了直接执行的方法创建生成器实例。如果我们尝试嗅探生成器函数和生成器实例的原型，我们可以到这样的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFn() {}
const gen = genFn()

console.log(genFn.constructor.prototype) //=> GeneratorFunction
console.log(gen.constructor.prototype)   //=> Generator" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFn</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">const</span> gen = genFn()

<span class="hljs-built_in">console</span>.log(genFn.constructor.prototype) <span class="hljs-comment">//=&gt; GeneratorFunction</span>
<span class="hljs-built_in">console</span>.log(gen.constructor.prototype)   <span class="hljs-comment">//=&gt; Generator</span></code></pre>
<p>这样我们便可知，我们可以通过使用 <code>instanceof</code> 语句来得知一个生成器实例是否为一个生成器函数所对应的实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(gen instanceof genFn) //=> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(gen <span class="hljs-keyword">instanceof</span> genFn) <span class="hljs-comment">//=&gt; true</span></code></pre>
<p>十分可惜的是，目前原生支持生成器的主流 JavaScript 引擎（如 Google V8、Mozilla SpiderMonkey）并没有将 <code>GeneratorFunction</code> 和 <code>Generator</code> 类暴露出来。这就意味着没办法简单地使用 <code>instanceof</code> 来判定一个对象是否是生成器函数或生成器实例。但如果你确实希望对一个未知的对象检测它是否是一个生成器函数或者生成器实例，也可以通过一些取巧的办法来实现。</p>
<p>对于原生支持生成器的运行环境来说，生成器函数自身带有一个 <code>constructor</code> 属性指向并没有被暴露出来的 <code>GeneratorFunction</code>。那么我们就可以利用一个我们已知的生成器函数的 <code>constructor</code> 来检验一个函数是否是生成器函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isGeneratorFunction(fn) {
  const genFn = (function*(){}).constructor

  return fn instanceof genFn
}

function* genFn() {
  let a = 2
  
  yield a
  
  while (true) {
    yield a = a / (2 * a + 1)
  }
}

console.log(isGeneratorFunction(genFn)) //=> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isGeneratorFunction</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">const</span> genFn = (<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>)</span>{}).constructor

  <span class="hljs-keyword">return</span> fn <span class="hljs-keyword">instanceof</span> genFn
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>
  
  <span class="hljs-keyword">yield</span> a
  
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span> a = a / (<span class="hljs-number">2</span> * a + <span class="hljs-number">1</span>)
  }
}

<span class="hljs-built_in">console</span>.log(isGeneratorFunction(genFn)) <span class="hljs-comment">//=&gt; true</span></code></pre>
<p>显然出于性能考虑，我们可以将这个判定函数利用惰性加载进行优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isGeneratorFunction(fn) {
  const genFn = (function*(){}).constructor

  return (isGeneratorFunction = fn => fn instanceof genFn)(fn)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isGeneratorFunction</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">const</span> genFn = (<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>)</span>{}).constructor

  <span class="hljs-keyword">return</span> (isGeneratorFunction = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> fn <span class="hljs-keyword">instanceof</span> genFn)(fn)
}</code></pre>
<p>相对于生成器函数，生成器实例的检测就更为困难。因为无法通过对已知生成器实例自身的属性来获取被运行引擎所隐藏起来的 <code>Generator</code> 构造函数，所以无法直接用 <code>instanceof</code> 语句来进行类型检测。也就是说我们需要利用别的方法来实现这个需求。</p>
<p>在上一个章节中，我们介绍到了在 ECMAScript 中，每一个对象都会有一个 <code>toString()</code> 方法的实现以及其中一部分有 <code>Symbol.toStringTag</code> 作为属性键的属性，以用于输出一个为了填补引用对象无法被直接序列化的字符串。而这个字符串是可以间接地探测出这个对象的构造函数名称，即带有直接关系的类。</p>
<p>那么对于生成器对象来说，与它拥有直接关系的类除了其对应的生成器函数以外，便是被隐藏起来的 <code>Generator</code> 类了。而生成器对象的 <code>@@toStringTag</code> 属性正正也是 <code>Generator</code>，这样的话我们就有了实现的思路了。在著名的 JavaScript 工具类库 LoDash<sup>6</sup> 的类型检测中，正式使用了（包括但不限于）这种方法来对未知对象进行类型检查，而我们也可以试着使用这种手段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isGenerator(obj) {
  return obj.toString ? obj.toString() === '[object Generator]' : false
}

function* genFn() {}
const gen = genFn()

console.log(isGenerator(gen)) //=> true
console.log(isGenerator({}))  //=> false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isGenerator</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> obj.toString ? obj.toString() === <span class="hljs-string">'[object Generator]'</span> : <span class="hljs-literal">false</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFn</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">const</span> gen = genFn()

<span class="hljs-built_in">console</span>.log(isGenerator(gen)) <span class="hljs-comment">//=&gt; true</span>
<span class="hljs-built_in">console</span>.log(isGenerator({}))  <span class="hljs-comment">//=&gt; false</span></code></pre>
<p>而另外一方面，我们既然已经知道了生成器实例必定带有 <code>@@toStringTag</code> 属性并其值夜必定为 <code>Generator</code>，我们也可以通过这个来检测位置对象是否为生成器实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isGenerator(obj) {
  return obj[Symbol &amp;&amp; Symbol.toStringTag ? Symbol.toStringTag : false] === 'Generator'
}

console.log(isGenerator(gen)) //=> true
console.log(isGenerator({}))  //=> false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isGenerator</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> obj[<span class="hljs-built_in">Symbol</span> &amp;&amp; <span class="hljs-built_in">Symbol</span>.toStringTag ? <span class="hljs-built_in">Symbol</span>.toStringTag : <span class="hljs-literal">false</span>] === <span class="hljs-string">'Generator'</span>
}

<span class="hljs-built_in">console</span>.log(isGenerator(gen)) <span class="hljs-comment">//=&gt; true</span>
<span class="hljs-built_in">console</span>.log(isGenerator({}))  <span class="hljs-comment">//=&gt; false</span></code></pre>
<p>此处为了防止因为运行环境不支持 <code>Symbol</code> 或 <code>@@toStringTag</code> 而导致报错，需要使用先做兼容性检测以完成兼容降级。</p>
<p>而我们再回过头来看看生成器函数，我们是否也可以使用 <code>@@toStringTag</code> 属性来对生成器函数进行类型检测呢？我们在一个同时支持生成器和 <code>@@toStringTag</code> 的运行环境中运行下面这段代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* genFn() {}

console.log(genFn[Symbol.toStringTag]) //=> GeneratorFunction" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genFn</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-built_in">console</span>.log(genFn[<span class="hljs-built_in">Symbol</span>.toStringTag]) <span class="hljs-comment">//=&gt; GeneratorFunction</span></code></pre>
<p>这显然是可行的，那么我们就来为前面的 <code>isGeneratorFunction</code> 方法再进行优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isGeneratorFunction(fn) {
  return fn[Symbol &amp;&amp; Symbol.toStringTag ? Symbol.toStringTag : false] === 'GeneratorFunction'
}

console.log(isGeneratorFunction(genFn)) //=> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isGeneratorFunction</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> fn[<span class="hljs-built_in">Symbol</span> &amp;&amp; <span class="hljs-built_in">Symbol</span>.toStringTag ? <span class="hljs-built_in">Symbol</span>.toStringTag : <span class="hljs-literal">false</span>] === <span class="hljs-string">'GeneratorFunction'</span>
}

<span class="hljs-built_in">console</span>.log(isGeneratorFunction(genFn)) <span class="hljs-comment">//=&gt; true</span></code></pre>
<p>而当运行环境不支持 <code>@@toStringTag</code> 时也可以通过 <code>instanceof</code> 语句来进行检测。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isGeneratorFunction(fn) {
  // If the current engine supports Symbol and @@toStringTag
  if (Symbol &amp;&amp; Symbol.toStringTag) {
    return (isGeneratorFunction = fn => fn[Symbol.toStringTag] === 'GeneratorFunction')(fn)
  }

  // Using instanceof statement for detecting
  const genFn = (function*(){}).constructor

  return (isGeneratorFunction = fn => fn instanceof genFn)(fn)
}

console.log(isGeneratorFunction(genFn)) //=> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isGeneratorFunction</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-comment">// If the current engine supports Symbol and @@toStringTag</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Symbol</span> &amp;&amp; <span class="hljs-built_in">Symbol</span>.toStringTag) {
    <span class="hljs-keyword">return</span> (isGeneratorFunction = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> fn[<span class="hljs-built_in">Symbol</span>.toStringTag] === <span class="hljs-string">'GeneratorFunction'</span>)(fn)
  }

  <span class="hljs-comment">// Using instanceof statement for detecting</span>
  <span class="hljs-keyword">const</span> genFn = (<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>)</span>{}).constructor

  <span class="hljs-keyword">return</span> (isGeneratorFunction = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> fn <span class="hljs-keyword">instanceof</span> genFn)(fn)
}

<span class="hljs-built_in">console</span>.log(isGeneratorFunction(genFn)) <span class="hljs-comment">//=&gt; true</span></code></pre>
<h3 id="articleHeader11">生成器嵌套</h3>
<p>虽然说到现在为止，我们所举出的生成器例子都是单一生成器进行使用。但是在实际开发中，我们同样会遇到需要一个生成器嵌套在另一个生成器内的情况，就比如数学中的分段函数或嵌套的数组公式等。</p>
<p>我们假设有这样的一个分段函数，我们需要对其进行积分计算。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004993570" src="https://static.alili.tech/img/remote/1460000004993570" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004993572" src="https://static.alili.tech/img/remote/1460000004993572" alt="" title="" style="cursor: pointer;"></span></p>
<p>分别对分段函数的各分段作积分，以便编写程序进行积分。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004993574" src="https://static.alili.tech/img/remote/1460000004993574" alt="" title="" style="cursor: pointer;"></span></p>
<p>此处我们可以分别对分段函数的两个部分分别建立生成器函数并使用牛顿-科特斯公式（Newton-Cotes formulas）<sup>7</sup>来进行积分计算。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Newton-Cotes formulas
function* newton_cotes(f, a, b, n) {
  const gaps = (b - a) / n
  const h = gaps / 2

  for (var i = 0; i < n; i++) {
    yield h / 45 *
      (7 * f(a + i * gaps) +
      32 * f(a + i * gaps + 0.25 * gaps) +
      12 * f(a + i * gaps + 0.5 * gaps) +
      32 * f(a + i * gaps + 0.75 * gaps) +
      7 * f(a + (i + 1) * gaps))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Newton-Cotes formulas</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">newton_cotes</span>(<span class="hljs-params">f, a, b, n</span>) </span>{
  <span class="hljs-keyword">const</span> gaps = (b - a) / n
  <span class="hljs-keyword">const</span> h = gaps / <span class="hljs-number">2</span>

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
    <span class="hljs-keyword">yield</span> h / <span class="hljs-number">45</span> *
      (<span class="hljs-number">7</span> * f(a + i * gaps) +
      <span class="hljs-number">32</span> * f(a + i * gaps + <span class="hljs-number">0.25</span> * gaps) +
      <span class="hljs-number">12</span> * f(a + i * gaps + <span class="hljs-number">0.5</span> * gaps) +
      <span class="hljs-number">32</span> * f(a + i * gaps + <span class="hljs-number">0.75</span> * gaps) +
      <span class="hljs-number">7</span> * f(a + (i + <span class="hljs-number">1</span>) * gaps))
  }
}</code></pre>
<p>在编写两个分段部分的生成器之前，我们需要先引入一个新语法 <code>yield*</code>。它与 <code>yield</code> 的区别在于，<code>yield*</code> 的功能是为了将一个生成器对象嵌套于另一个生成器内，并将其展开。我们以一个简单地例子说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* foo() {
  yield 1
  yield 2
}

function* bar() {
  yield* foo()
  yield 3
  yield 4
}

for (const n of bar()) console.log(n)
//=>
//  1
//  2
//  3
//  4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span>* foo()
  <span class="hljs-keyword">yield</span> <span class="hljs-number">3</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">4</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> n <span class="hljs-keyword">of</span> bar()) <span class="hljs-built_in">console</span>.log(n)
<span class="hljs-comment">//=&gt;</span>
<span class="hljs-comment">//  1</span>
<span class="hljs-comment">//  2</span>
<span class="hljs-comment">//  3</span>
<span class="hljs-comment">//  4</span></code></pre>
<p>利用 <code>yield*</code> 语句我们就可以将生成器进行嵌套和组合，使得不同的生成器所输出的值可以被同一个生成器连续输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* Part1(n) {
  yield* newton_cotes(x => Math.pow(x, 2), -2, 0, n)
}

function* Part2(n) {
  yield* newton_cotes(x => Math.sin(x), 0, 2, n)
}

function* sum() {
  const n = 100

  yield* Part1(n)
  yield* Part2(n)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">Part1</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">yield</span>* newton_cotes(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">Math</span>.pow(x, <span class="hljs-number">2</span>), <span class="hljs-number">-2</span>, <span class="hljs-number">0</span>, n)
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">Part2</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">yield</span>* newton_cotes(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">Math</span>.sin(x), <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, n)
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">sum</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> n = <span class="hljs-number">100</span>

  <span class="hljs-keyword">yield</span>* Part1(n)
  <span class="hljs-keyword">yield</span>* Part2(n)
}</code></pre>
<p>最终我们将 <code>sum()</code> 生成器的所有输出值相加即可。</p>
<h3 id="articleHeader12">生成器 ≈ 协程？</h3>
<p>从运行机制的角度上看，生成器拥有暂停运行时的能力，那么生成器的运用是否只仅限于生成数据呢？在上文中，我们提到了生成器是一种类协程，而协程自身是可以通过生成器的特性来进行模拟呢。</p>
<p>在现代 JavaScript 应用开发中，我们经常会使用到异步操作（如在 Node.js 开发中绝大部分使用到的 IO 操作都是异步的）。但是当异步操作的层级过深时，就可能会出现回调地狱（Callback Hell）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io1((err, res1) => {
  io2(res1, (err, res2) => {
    io3(res2, (err, res3) => {
      io4(res3, (err, res4) => {
        io5(res5, (err, res5) => {
          // ......
        })
      })
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">io1(<span class="hljs-function">(<span class="hljs-params">err, res1</span>) =&gt;</span> {
  io2(res1, (err, res2) =&gt; {
    io3(res2, (err, res3) =&gt; {
      io4(res3, (err, res4) =&gt; {
        io5(res5, (err, res5) =&gt; {
          <span class="hljs-comment">// ......</span>
        })
      })
    })
  })
})</code></pre>
<p>显然这样很不适合真正的复杂开发场景，而我们究竟要如何对着进行优化呢？我们知道 <code>yield</code> 语句可以将一个值带出生成器执行环境，而这个值可以是任何类型的值，这就意味着我们可以利用这一特性做一些更有意思的事情了。</p>
<p>我们回过头来看看生成器对象的操作方法，生成器执行对象的暂停状态可以用 <code>.next(value)</code> 方法恢复，而这个方法是可以被异步执行的。这就说明如果我们将异步 IO 的操作通过 <code>yield</code> 语句来从生成器执行对象带到主线程中，在主线程中完成后再通过 <code>.next(value)</code> 方法将执行结果带回到生成器执行对象中，这一流程在生成器的代码中是可以以同步的写法完成的。</p>
<p>具体思路成型后，我们先以一个简单的例子来实现。为了实现以生成器作为逻辑执行主体，把异步方法带到主线程去，就要先将异步函数做一层包装，使得其可以在带出生成器执行对象之后再执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
function echo(content, callback) {
  callback(null, content)
}

// After
function echo(content) {
  return callback => {
    callback(null, content)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Before</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">echo</span>(<span class="hljs-params">content, callback</span>) </span>{
  callback(<span class="hljs-literal">null</span>, content)
}

<span class="hljs-comment">// After</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">echo</span>(<span class="hljs-params">content</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> {
    callback(<span class="hljs-literal">null</span>, content)
  }
}</code></pre>
<p>这样我们就可以在生成器内使用这个异步方法了。但是还不足够，将方法带出生成器执行对象后，还需要在主线程将带出的函数执行才可实现应有的需求。上面我们通过封装所得到的异步方法在生成器内部执行后，可以通过 <code>yield</code> 语句将内层的函数带到主线程中。这样我们就可以在主线程中执行这个函数并得到返回值，然后将其返回到生成器执行对象中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function run(genFn) {
  const gen = genFn()
  
  const next = value => {
    const ret = gen.next(value)
    if (ret.done) return
    
    ret.value((err, val) => {
      if (err) return console.error(err)
      
      // Looop
      next(val)
    })
  }
  
  // First call
  next()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">genFn</span>) </span>{
  <span class="hljs-keyword">const</span> gen = genFn()
  
  <span class="hljs-keyword">const</span> next = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> ret = gen.next(value)
    <span class="hljs-keyword">if</span> (ret.done) <span class="hljs-keyword">return</span>
    
    ret.value(<span class="hljs-function">(<span class="hljs-params">err, val</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err)
      
      <span class="hljs-comment">// Looop</span>
      next(val)
    })
  }
  
  <span class="hljs-comment">// First call</span>
  next()
}</code></pre>
<p>通过这个运行工具，我们便可以将生成器函数作为逻辑的运行载体，从而将之前多层嵌套的异步操作全部扁平化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="run(function*() {
  const msg1 = yield echo('Hello')
  const msg2 = yield echo(`${msg1} World`)

  console.log(msg2) //=> Hello Wolrd
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">run(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> msg1 = <span class="hljs-keyword">yield</span> echo(<span class="hljs-string">'Hello'</span>)
  <span class="hljs-keyword">const</span> msg2 = <span class="hljs-keyword">yield</span> echo(<span class="hljs-string">`<span class="hljs-subst">${msg1}</span> World`</span>)

  <span class="hljs-built_in">console</span>.log(msg2) <span class="hljs-comment">//=&gt; Hello Wolrd</span>
})</code></pre>
<p>通过简单地封装，我们已经尝到了一些甜头，那么再进一步增强之后又会有什么有趣的东西呢？Node.js 社区中有一个第三方库名为 co，意为 coroutine，这个库的意义在于利用生成器来模拟协程。而我们这里介绍的就是其中的一部分，co 的功能则更为丰富，可以直接使用 Promise 封装工具，如果异步方法有自带 Promise 的接口，就无需再次封装。此外 co 还可以直接实现生成器的嵌套调用，也就是说可以通过 co 来实现逻辑代码的全部同步化开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import co from 'co'
import { promisify } from 'bluebird'
import fs from 'fs'
import path from 'path'
  
const filepath = path.resolve(process.cwd(), './data.txt')
const defaultData = new Buffer('Hello World')

co(function*() {
  const exists = yield promisify(fs.exists(filepath))

  if (exists) {
    const data = yield promisify(fs.readFile(filepath))
    // ...
  } else {
    yield promisify(fs.writeFile(filepath, defaultData))
    // ...
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> co <span class="hljs-keyword">from</span> <span class="hljs-string">'co'</span>
<span class="hljs-keyword">import</span> { promisify } <span class="hljs-keyword">from</span> <span class="hljs-string">'bluebird'</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">'fs'</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>
  
<span class="hljs-keyword">const</span> filepath = path.resolve(process.cwd(), <span class="hljs-string">'./data.txt'</span>)
<span class="hljs-keyword">const</span> defaultData = <span class="hljs-keyword">new</span> Buffer(<span class="hljs-string">'Hello World'</span>)

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> exists = <span class="hljs-keyword">yield</span> promisify(fs.exists(filepath))

  <span class="hljs-keyword">if</span> (exists) {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">yield</span> promisify(fs.readFile(filepath))
    <span class="hljs-comment">// ...</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">yield</span> promisify(fs.writeFile(filepath, defaultData))
    <span class="hljs-comment">// ...</span>
  }
})</code></pre>
<h2 id="articleHeader13">Reference</h2>
<p>[1] CLU Language <a href="http://www.pmg.lcs.mit.edu/CLU.html" rel="nofollow noreferrer" target="_blank">http://www.pmg.lcs.mit.edu/CLU.html</a><br>[2] Icon Language <a href="http://www.cs.arizona.edu/icon" rel="nofollow noreferrer" target="_blank">http://www.cs.arizona.edu/icon</a><br>[3] Python Language <a href="http://www.python.org" rel="nofollow noreferrer" target="_blank">http://www.python.org</a><br>[4] C# Language <a href="http://msdn.microsoft.com/pt-br/vcsharp/default.aspx" rel="nofollow noreferrer" target="_blank">http://msdn.microsoft.com/pt-br/vcsharp/default.aspx</a><br>[5] Ruby Language <a href="http://www.ruby-lang.org" rel="nofollow noreferrer" target="_blank">http://www.ruby-lang.org</a><br>[6] LoDash <a href="https://lodash.com" rel="nofollow noreferrer" target="_blank">https://lodash.com</a><br>[7] Newton-Cotes formulas <a href="https://en.wikipedia.org/wiki/Newton%E2%80%93Cotes_formulas" rel="nofollow noreferrer" target="_blank">https://en.wikipedia.org/wiki/Newton%E2%80%93Cotes_formulas</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
生成器（Generator）

## 原文链接
[https://segmentfault.com/a/1190000004993542](https://segmentfault.com/a/1190000004993542)


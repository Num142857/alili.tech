---
title: 'JavaScript 函数式编程介绍' 
date: 2019-01-22 2:30:07
hidden: true
slug: tp8mw9zcza
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#javascript-函数式编程介绍"></a>JavaScript 函数式编程介绍</h1>
<blockquote>
<p>探索函数式编程，通过它让你的程序更具有可读性和易于调试</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/05461992b5df47b90841e7008cd1234a4eb87359/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f6275732d726f636b65742e706e673f69746f6b3d7851714b524d6c61"><img src="https://p0.ssl.qhimg.com/t014849e46b6e5198d8.png" alt="An introduction to functional programming in JavaScript" title="An introduction to functional programming in JavaScript"></a></p>
<blockquote>
<p>Image credits : Steve Jurvetson via <a href="https://www.flickr.com/photos/jurvetson/882193732/">Flickr</a> (CC-BY-2.0)</p>
</blockquote>
<p>当 Brendan Eich 在 1995 年创造 JavaScript 时，他原本打算<a href="https://brendaneich.com/2008/04/popularity/">将 Scheme 移植到浏览器里</a> 。Scheme 作为 Lisp 的方言，是一种函数式编程语言。而当 Eich 被告知新的语言应该是一种可以与 Java 相比的脚本语言后，他最终确立了一种拥有 C 风格语法的语言（也和 Java 一样），但将函数视作一等公民。而 Java 直到版本 8 才从技术上将函数视为一等公民，虽然你可以用匿名类来模拟它。这个特性允许 JavaScript 通过函数式范式编程。</p>
<p>JavaScript 是一个多范式语言，允许你自由地混合和使用面向对象式、过程式和函数式的编程范式。最近，函数式编程越来越火热。在诸如 <a href="https://angular-2-training-book.rangle.io/handout/change-detection/change_detection_strategy_onpush.html">Angular</a> 和 <a href="https://facebook.github.io/react/docs/optimizing-performance.html#the-power-of-not-mutating-data">React</a> 这样的框架中，通过使用不可变数据结构可以切实提高性能。不可变是函数式编程的核心原则，它以及纯函数使得编写和调试程序变得更加容易。使用函数来代替程序的循环可以提高程序的可读性并使它更加优雅。总之，函数式编程拥有很多优点。</p>
<h3><a href="#什么不是函数式编程"></a>什么不是函数式编程</h3>
<p>在讨论什么是函数式编程前，让我们先排除那些不属于函数式编程的东西。实际上它们是你需要丢弃的语言组件（再见，老朋友）：</p>
<ul>
<li>循环：<ul>
<li><code>while</code></li>
<li><code>do...while</code></li>
<li><code>for</code></li>
<li><code>for...of</code></li>
<li><code>for...in</code></li>
</ul>
</li>
<li>用 <code>var</code> 或者 <code>let</code> 来声明变量</li>
<li>没有返回值的函数</li>
<li>改变对象的属性 (比如: <code>o.x = 5;</code>)</li>
<li>改变数组本身的方法：<ul>
<li><code>copyWithin</code></li>
<li><code>fill</code></li>
<li><code>pop</code></li>
<li><code>push</code></li>
<li><code>reverse</code></li>
<li><code>shift</code></li>
<li><code>sort</code></li>
<li><code>splice</code></li>
<li><code>unshift</code></li>
</ul>
</li>
<li>改变映射本身的方法：<ul>
<li><code>clear</code></li>
<li><code>delete</code></li>
<li><code>set</code></li>
</ul>
</li>
<li>改变集合本身的方法：<ul>
<li><code>add</code></li>
<li><code>clear</code></li>
<li><code>delete</code></li>
</ul>
</li>
</ul>
<p>脱离这些特性应该如何编写程序呢？这是我们将在后面探索的问题。</p>
<h3><a href="#纯函数"></a>纯函数</h3>
<p>你的程序中包含函数不一定意味着你正在进行函数式编程。函数式范式将纯函数pure function和非纯函数impure function区分开。鼓励你编写纯函数。纯函数必须满足下面的两个属性：</p>
<ul>
<li>引用透明：函数在传入相同的参数后永远返回相同的返回值。这意味着该函数不依赖于任何可变状态。</li>
<li>无副作用：函数不能导致任何副作用。副作用可能包括 I/O（比如向终端或者日志文件写入），改变一个不可变的对象，对变量重新赋值等等。</li>
</ul>
<p>我们来看一些例子。首先，<code>multiply</code> 就是一个纯函数的例子，它在传入相同的参数后永远返回相同的返回值，并且不会导致副作用。</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(a, b) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> * b;
}

</code></pre><p>下面是非纯函数的例子。<code>canRide</code> 函数依赖捕获的 <code>heightRequirement</code> 变量。被捕获的变量不一定导致一个函数是非纯函数，除非它是一个可变的变量（或者可以被重新赋值）。这种情况下使用 <code>let</code> 来声明这个变量，意味着可以对它重新赋值。<code>multiply</code> 函数是非纯函数，因为它会导致在 console 上输出。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> heightRequirement = <span class="hljs-number">46</span>;

<span class="hljs-comment">// Impure because it relies on a mutable (reassignable) variable.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">canRide</span>(<span class="hljs-params">height</span>) </span>{
  <span class="hljs-keyword">return</span> height &gt;= heightRequirement;
}

<span class="hljs-comment">// Impure because it causes a side-effect by logging to the console.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Arguments: '</span>, a, b);
  <span class="hljs-keyword">return</span> a * b;
}

</code></pre><p>下面的列表包含着 JavaScript 内置的非纯函数。你可以指出它们不满足两个属性中的哪个吗？</p>
<ul>
<li><code>console.log</code></li>
<li><code>element.addEventListener</code></li>
<li><code>Math.random</code></li>
<li><code>Date.now</code></li>
<li><code>$.ajax</code> (这里 <code>$</code> 代表你使用的 Ajax 库)</li>
</ul>
<p>理想的程序中所有的函数都是纯函数，但是从上面的函数列表可以看出，任何有意义的程序都将包含非纯函数。大多时候我们需要进行 AJAX 调用，检查当前日期或者获取一个随机数。一个好的经验法则是遵循 80/20 规则：函数中有 80％ 应该是纯函数，剩下的 20％ 的必要性将不可避免地是非纯函数。</p>
<p>使用纯函数有几个优点：</p>
<ul>
<li>它们很容易导出和调试，因为它们不依赖于可变的状态。</li>
<li>返回值可以被缓存或者“记忆”来避免以后重复计算。</li>
<li>它们很容易测试，因为没有需要模拟（mock）的依赖（比如日志，AJAX，数据库等等）。</li>
</ul>
<p>你编写或者使用的函数返回空（换句话说它没有返回值），那代表它是非纯函数。</p>
<h3><a href="#不变性"></a>不变性</h3>
<p>让我们回到捕获变量的概念上。来看看 <code>canRide</code> 函数。我们认为它是一个非纯函数，因为 <code>heightRequirement</code> 变量可以被重新赋值。下面是一个构造出来的例子来说明如何用不可预测的值来对它重新赋值。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> heightRequirement = <span class="hljs-number">46</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">canRide</span>(<span class="hljs-params">height</span>) </span>{
  <span class="hljs-keyword">return</span> height &gt;= heightRequirement;
}

<span class="hljs-comment">// Every half second, set heightRequirement to a random number between 0 and 200.</span>
setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> heightRequirement = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">201</span>), <span class="hljs-number">500</span>);

<span class="hljs-keyword">const</span> mySonsHeight = <span class="hljs-number">47</span>;

<span class="hljs-comment">// Every half second, check if my son can ride.</span>
<span class="hljs-comment">// Sometimes it will be true and sometimes it will be false.</span>
setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(canRide(mySonsHeight)), <span class="hljs-number">500</span>);

</code></pre><p>我要再次强调被捕获的变量不一定会使函数成为非纯函数。我们可以通过只是简单地改变 <code>heightRequirement</code> 的声明方式来使 <code>canRide</code> 函数成为纯函数。</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> heightRequirement = <span class="hljs-number">46</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">canRide</span><span class="hljs-params">(height)</span> </span>{
  <span class="hljs-keyword">return</span> height &gt;= heightRequirement;
}

</code></pre><p>通过用 <code>const</code> 来声明变量意味着它不能被再次赋值。如果尝试对它重新赋值，运行时引擎将抛出错误；那么，如果用对象来代替数字来存储所有的“常量”怎么样？</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> constants = {
  heightRequirement: <span class="hljs-number">46</span>,
  <span class="hljs-comment">// ... other constants go here</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">canRide</span><span class="hljs-params">(height)</span> </span>{
  <span class="hljs-keyword">return</span> height &gt;= constants.heightRequirement;
}

</code></pre><p>我们用了 <code>const</code> ，所以这个变量不能被重新赋值，但是还有一个问题：这个对象可以被改变。下面的代码展示了，为了真正使其不可变，你不仅需要防止它被重新赋值，你也需要不可变的数据结构。JavaScript 语言提供了 <code>Object.freeze</code> 方法来阻止对象被改变。</p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// CASE 1: 对象的属性是可变的，并且变量可以被再次赋值。</span>
<span class="hljs-keyword">let</span> o1 = { <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span> };

<span class="hljs-comment">// 改变对象的属性</span>
o1.foo = <span class="hljs-string">'something different'</span>;

<span class="hljs-comment">// 对变量再次赋值</span>
o1 = { <span class="hljs-attr">message</span>: <span class="hljs-string">"I'm a completely new object"</span> };


<span class="hljs-comment">// CASE 2: 对象的属性还是可变的，但是变量不能被再次赋值。</span>
<span class="hljs-keyword">const</span> o2 = { <span class="hljs-attr">foo</span>: <span class="hljs-string">'baz'</span> };

<span class="hljs-comment">// 仍然能改变对象</span>
o2.foo = <span class="hljs-string">'Something different, yet again'</span>;

<span class="hljs-comment">// 不能对变量再次赋值</span>
<span class="hljs-comment">// o2 = { message: 'I will cause an error if you uncomment me' }; // Error!</span>


<span class="hljs-comment">// CASE 3: 对象的属性是不可变的，但是变量可以被再次赋值。</span>
<span class="hljs-keyword">let</span> o3 = <span class="hljs-built_in">Object</span>.freeze({ <span class="hljs-attr">foo</span>: <span class="hljs-string">"Can't mutate me"</span> });

<span class="hljs-comment">// 不能改变对象的属性</span>
<span class="hljs-comment">// o3.foo = 'Come on, uncomment me. I dare ya!'; // Error!</span>

<span class="hljs-comment">// 还是可以对变量再次赋值</span>
o3 = { <span class="hljs-attr">message</span>: <span class="hljs-string">"I'm some other object, and I'm even mutable -- so take that!"</span> };


<span class="hljs-comment">// CASE 4: 对象的属性是不可变的，并且变量不能被再次赋值。这是我们想要的！！！！！！！！</span>
<span class="hljs-keyword">const</span> o4 = <span class="hljs-built_in">Object</span>.freeze({ <span class="hljs-attr">foo</span>: <span class="hljs-string">'never going to change me'</span> });

<span class="hljs-comment">// 不能改变对象的属性</span>
<span class="hljs-comment">// o4.foo = 'talk to the hand' // Error!</span>

<span class="hljs-comment">// 不能对变量再次赋值</span>
<span class="hljs-comment">// o4 = { message: "ain't gonna happen, sorry" }; // Error</span>

</code></pre><p>不变性适用于所有的数据结构，包括数组、映射和集合。它意味着不能调用例如 <code>Array.prototype.push</code> 等会导致本身改变的方法，因为它会改变已经存在的数组。可以通过创建一个含有原来元素和新加元素的新数组，而不是将新元素加入一个已经存在的数组。其实所有会导致数组本身被修改的方法都可以通过一个返回修改好的新数组的函数代替。</p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> a = <span class="hljs-built_in">Object</span>.freeze([<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]);

<span class="hljs-comment">// Instead of: a.push(7, 8, 9);</span>
<span class="hljs-keyword">const</span> b = a.concat(<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>);

<span class="hljs-comment">// Instead of: a.pop();</span>
<span class="hljs-keyword">const</span> c = a.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>);

<span class="hljs-comment">// Instead of: a.unshift(1, 2, 3);</span>
<span class="hljs-keyword">const</span> d = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].concat(a);

<span class="hljs-comment">// Instead of: a.shift();</span>
<span class="hljs-keyword">const</span> e = a.slice(<span class="hljs-number">1</span>);

<span class="hljs-comment">// Instead of: a.sort(myCompareFunction);</span>
<span class="hljs-keyword">const</span> f = R.sort(myCompareFunction, a); <span class="hljs-comment">// R = Ramda</span>

<span class="hljs-comment">// Instead of: a.reverse();</span>
<span class="hljs-keyword">const</span> g = R.reverse(a); <span class="hljs-comment">// R = Ramda</span>

<span class="hljs-comment">// 留给读者的练习:</span>
<span class="hljs-comment">// copyWithin</span>
<span class="hljs-comment">// fill</span>
<span class="hljs-comment">// splice</span>

</code></pre><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">映射</a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set">集合</a> 也很相似。可以通过返回一个新的修改好的映射或者集合来代替使用会修改其本身的函数。</p>
<pre><code class="hljs vhdl">const <span class="hljs-keyword">map</span> = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Map</span>([
  [<span class="hljs-number">1</span>, <span class="hljs-symbol">'one</span>'],
  [<span class="hljs-number">2</span>, <span class="hljs-symbol">'two</span>'],
  [<span class="hljs-number">3</span>, <span class="hljs-symbol">'three</span>']
]);

// Instead <span class="hljs-keyword">of</span>: <span class="hljs-keyword">map</span>.set(<span class="hljs-number">4</span>, <span class="hljs-symbol">'four</span>');
const map2 = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Map</span>([...<span class="hljs-keyword">map</span>, [<span class="hljs-number">4</span>, <span class="hljs-symbol">'four</span>']]);

// Instead <span class="hljs-keyword">of</span>: <span class="hljs-keyword">map</span>.delete(<span class="hljs-number">1</span>);
const map3 = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Map</span>([...<span class="hljs-keyword">map</span>].filter(([key]) =&gt; key !== <span class="hljs-number">1</span>));

// Instead <span class="hljs-keyword">of</span>: <span class="hljs-keyword">map</span>.clear();
const map4 = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Map</span>();

</code></pre><pre><code class="hljs dart"><span class="hljs-keyword">const</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]);

<span class="hljs-comment">// Instead of: set.add('D');</span>
<span class="hljs-keyword">const</span> set2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...<span class="hljs-keyword">set</span>, <span class="hljs-string">'D'</span>]);

<span class="hljs-comment">// Instead of: set.delete('B');</span>
<span class="hljs-keyword">const</span> set3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...<span class="hljs-keyword">set</span>].filter(key =&gt; key !== <span class="hljs-string">'B'</span>));

<span class="hljs-comment">// Instead of: set.clear();</span>
<span class="hljs-keyword">const</span> set4 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();

</code></pre><p>我想提一句如果你在使用 TypeScript（我非常喜欢 TypeScript），你可以用 <code>Readonly&lt;T&gt;</code>、<code>ReadonlyArray&lt;T&gt;</code>、<code>ReadonlyMap&lt;K, V&gt;</code> 和 <code>ReadonlySet&lt;T&gt;</code> 接口来在编译期检查你是否尝试更改这些对象，有则抛出编译错误。如果在对一个对象字面量或者数组调用 <code>Object.freeze</code>，编译器会自动推断它是只读的。由于映射和集合在其内部表达，所以在这些数据结构上调用 <code>Object.freeze</code> 不起作用。但是你可以轻松地告诉编译器它们是只读的变量。</p>
<p><a href="https://camo.githubusercontent.com/d19e25eb5615d10a2363300a8bc9a8c56e1dfeda/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f747970657363726970742d726561646f6e6c792e706e67"><img src="https://p0.ssl.qhimg.com/t0190bd1616e7f0659f.png" alt="TypeScript Readonly Interfaces" title="TypeScript Readonly Interfaces"></a></p>
<p><em>TypeScript 只读接口</em></p>
<p>好，所以我们可以通过创建新的对象来代替修改原来的对象，但是这样不会导致性能损失吗？当然会。确保在你自己的应用中做了性能测试。如果你需要提高性能，可以考虑使用 <a href="https://facebook.github.io/immutable-js/">Immutable.js</a>。Immutable.js 用<a href="https://en.wikipedia.org/wiki/Persistent_data_structure">持久的数据结构</a> 实现了<a href="https://facebook.github.io/immutable-js/docs/#/List">链表</a>、<a href="https://facebook.github.io/immutable-js/docs/#/Stack">堆栈</a>、<a href="https://facebook.github.io/immutable-js/docs/#/Map">映射</a>、<a href="https://facebook.github.io/immutable-js/docs/#/Set">集合</a>和其他数据结构。使用了如同 Clojure 和 Scala 这样的函数式语言中相同的技术。</p>
<pre><code class="hljs prolog">// <span class="hljs-symbol">Use</span> in place of <span class="hljs-string">`[]`</span>.
const list1 = <span class="hljs-symbol">Immutable</span>.<span class="hljs-symbol">List</span>([<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]);
const list2 = list1.push(<span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>);

console.log([...list1]); // [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]
console.log([...list2]); // [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>]


// <span class="hljs-symbol">Use</span> in place of <span class="hljs-string">`new Map()`</span>
const map1 = <span class="hljs-symbol">Immutable</span>.<span class="hljs-symbol">Map</span>([
  [<span class="hljs-string">'one'</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-string">'two'</span>, <span class="hljs-number">2</span>],
  [<span class="hljs-string">'three'</span>, <span class="hljs-number">3</span>]
]);
const map2 = map1.set(<span class="hljs-string">'four'</span>, <span class="hljs-number">4</span>);

console.log([...map1]); // [[<span class="hljs-string">'one'</span>, <span class="hljs-number">1</span>], [<span class="hljs-string">'two'</span>, <span class="hljs-number">2</span>], [<span class="hljs-string">'three'</span>, <span class="hljs-number">3</span>]]
console.log([...map2]); // [[<span class="hljs-string">'one'</span>, <span class="hljs-number">1</span>], [<span class="hljs-string">'two'</span>, <span class="hljs-number">2</span>], [<span class="hljs-string">'three'</span>, <span class="hljs-number">3</span>], [<span class="hljs-string">'four'</span>, <span class="hljs-number">4</span>]]


// <span class="hljs-symbol">Use</span> in place of <span class="hljs-string">`new Set()`</span>
const set1 = <span class="hljs-symbol">Immutable</span>.<span class="hljs-symbol">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]);
const set2 = set1.add(<span class="hljs-number">5</span>);

console.log([...set1]); // [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
console.log([...set2]); // [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]

</code></pre><h3><a href="#函数组合"></a>函数组合</h3>
<p>记不记得在中学时我们学过一些像 <code>(f ∘ g)(x)</code> 的东西？你那时可能想，“我什么时候会用到这些？”，好了，现在就用到了。你准备好了吗？<code>f ∘ g</code>读作 “函数 f 和函数 g 组合”。对它的理解有两种等价的方式，如等式所示： <code>(f ∘ g)(x) = f(g(x))</code>。你可以认为 <code>f ∘ g</code> 是一个单独的函数，或者视作将调用函数 <code>g</code> 的结果作为参数传给函数 <code>f</code>。注意这些函数是从右向左依次调用的，先执行 <code>g</code>，接下来执行 <code>f</code>。</p>
<p>关于函数组合的几个要点:</p>
<ol>
<li>我们可以组合任意数量的函数（不仅限于 2 个）。</li>
<li>组合函数的一个方式是简单地把一个函数的输出作为下一个函数的输入（比如 <code>f(g(x))</code>）。</li>
</ol>
<pre><code class="hljs javascript"><span class="hljs-comment">// h(x) = x + 1</span>
<span class="hljs-comment">// number -&gt; number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">h</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x + <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// g(x) = x^2</span>
<span class="hljs-comment">// number -&gt; number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x * x;
}

<span class="hljs-comment">// f(x) = convert x to string</span>
<span class="hljs-comment">// number -&gt; string</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x.toString();
}

<span class="hljs-comment">// y = (f ∘ g ∘ h)(1)</span>
<span class="hljs-keyword">const</span> y = f(g(h(<span class="hljs-number">1</span>)));
<span class="hljs-built_in">console</span>.log(y); <span class="hljs-comment">// '4'</span>

</code></pre><p><a href="http://ramdajs.com/">Ramda</a> 和 <a href="https://github.com/lodash/lodash/wiki/FP-Guide">lodash</a> 之类的库提供了更优雅的方式来组合函数。我们可以在更多的在数学意义上处理函数组合，而不是简单地将一个函数的返回值传递给下一个函数。我们可以创建一个由这些函数组成的单一复合函数(就是 <code>(f ∘ g)(x)</code>)。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// h(x) = x + 1</span>
<span class="hljs-comment">// number -&gt; number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">h</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x + <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// g(x) = x^2</span>
<span class="hljs-comment">// number -&gt; number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x * x;
}

<span class="hljs-comment">// f(x) = convert x to string</span>
<span class="hljs-comment">// number -&gt; string</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x.toString();
}

<span class="hljs-comment">// R = Ramda</span>
<span class="hljs-comment">// composite = (f ∘ g ∘ h)</span>
<span class="hljs-keyword">const</span> composite = R.compose(f, g, h);

<span class="hljs-comment">// Execute single function to get the result.</span>
<span class="hljs-keyword">const</span> y = composite(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(y); <span class="hljs-comment">// '4'</span>

</code></pre><p>好了，我们可以在 JavaScript 中组合函数了。接下来呢？好，如果你已经入门了函数式编程，理想中你的程序将只有函数的组合。代码里没有循环（<code>for</code>, <code>for...of</code>, <code>for...in</code>, <code>while</code>, <code>do</code>），基本没有。你可能觉得那是不可能的。并不是这样。我们下面的两个话题是：递归和高阶函数。</p>
<h3><a href="#递归"></a>递归</h3>
<p>假设你想实现一个计算数字的阶乘的函数。 让我们回顾一下数学中阶乘的定义：</p>
<p><code>n! = n * (n-1) * (n-2) * ... * 1</code>.</p>
<p><code>n!</code> 是从 <code>n</code> 到 <code>1</code> 的所有整数的乘积。我们可以编写一个循环轻松地计算出结果。</p>
<pre><code class="hljs matlab"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iterativeFactorial</span><span class="hljs-params">(n)</span> {</span>
  let product = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">for</span> (let <span class="hljs-built_in">i</span> = <span class="hljs-number">1</span>; <span class="hljs-built_in">i</span> &lt;= n; <span class="hljs-built_in">i</span>++) {
    product *= i;
  }
  <span class="hljs-keyword">return</span> product;
}

</code></pre><p>注意 <code>product</code> 和 <code>i</code> 都在循环中被反复重新赋值。这是解决这个问题的标准过程式方法。如何用函数式的方法解决这个问题呢？我们需要消除循环，确保没有变量被重新赋值。递归是函数式程序员的最有力的工具之一。递归需要我们将整体问题分解为类似整体问题的子问题。</p>
<p>计算阶乘是一个很好的例子，为了计算 <code>n!</code> 我们需要将 n 乘以所有比它小的正整数。它的意思就相当于：</p>
<p><code>n! = n * (n-1)!</code> </p>
<p>啊哈！我们发现了一个解决 <code>(n-1)!</code> 的子问题，它类似于整个问题 <code>n!</code>。还有一个需要注意的地方就是基础条件。基础条件告诉我们何时停止递归。 如果我们没有基础条件，那么递归将永远持续。 实际上，如果有太多的递归调用，程序会抛出一个堆栈溢出错误。啊哈！</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recursiveFactorial</span><span class="hljs-params">(n)</span> </span>{
  <span class="hljs-comment">// Base case -- stop the recursion</span>
  <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; <span class="hljs-comment">// 0! is defined to be 1.</span>
  }
  <span class="hljs-keyword">return</span> n * recursiveFactorial(n - <span class="hljs-number">1</span>);
}

</code></pre><p>然后我们来计算 <code>recursiveFactorial(20000)</code> 因为……，为什么不呢？当我们这样做的时候，我们得到了这个结果：</p>
<p><a href="https://camo.githubusercontent.com/320f1d143ad5548fe4df2bd57b09a9ce39eef483/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f737461636b2d6f766572666c6f772e706e67"><img src="https://p0.ssl.qhimg.com/t0160734898dc95fb83.png" alt="Stack overflow error" title="Stack overflow error"></a></p>
<p><em>堆栈溢出错误</em></p>
<p>这里发生了什么？我们得到一个堆栈溢出错误！这不是无穷的递归导致的。我们已经处理了基础条件(<code>n === 0</code> 的情况)。那是因为浏览器的堆栈大小是有限的，而我们的代码使用了越过了这个大小的堆栈。每次对 <code>recursiveFactorial</code> 的调用导致了新的帧被压入堆栈中，就像一个盒子压在另一个盒子上。每当 <code>recursiveFactorial</code> 被调用，一个新的盒子被放在最上面。下图展示了在计算 <code>recursiveFactorial(3)</code> 时堆栈的样子。注意在真实的堆栈中，堆栈顶部的帧将存储在执行完成后应该返回的内存地址，但是我选择用变量 <code>r</code> 来表示返回值，因为 JavaScript 开发者一般不需要考虑内存地址。</p>
<p><a href="https://camo.githubusercontent.com/c6dc6bc971ee1125ce70a87808965c54d6a540c3/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f737461636b2d6672616d65732e706e67"><img src="https://p0.ssl.qhimg.com/t01239568dee9da00ea.png" alt="The stack for recursively calculating 3! (three factorial)" title="The stack for recursively calculating 3! (three factorial)"></a></p>
<p><em>递归计算 3! 的堆栈（三次乘法）</em></p>
<p>你可能会想象当计算 <code>n = 20000</code> 时堆栈会更高。我们可以做些什么优化它吗？当然可以。作为 ES2015 (又名 ES6) 标准的一部分，有一个优化用来解决这个问题。它被称作尾调用优化proper tail calls optimization（PTC）。当递归函数做的最后一件事是调用自己并返回结果的时候，它使得浏览器删除或者忽略堆栈帧。实际上，这个优化对于相互递归函数也是有效的，但是为了简单起见，我们还是来看单一递归函数。</p>
<p>你可能会注意到，在递归函数调用之后，还要进行一次额外的计算（<code>n * r</code>）。那意味着浏览器不能通过 PTC 来优化递归；然而，我们可以通过重写函数使最后一步变成递归调用以便优化。一个窍门是将中间结果（在这里是 <code>product</code>）作为参数传递给函数。</p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// Optimized for tail call optimization.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, product = <span class="hljs-number">1</span></span>) </span>{
  <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> product;
  }
  <span class="hljs-keyword">return</span> factorial(n - <span class="hljs-number">1</span>, product * n)
}

</code></pre><p>让我们来看看优化后的计算 <code>factorial(3)</code> 时的堆栈。如下图所示，堆栈不会增长到超过两层。原因是我们把必要的信息都传到了递归函数中（比如 <code>product</code>）。所以，在 <code>product</code> 被更新后，浏览器可以丢弃掉堆栈中原先的帧。你可以在图中看到每次最上面的帧下沉变成了底部的帧，原先底部的帧被丢弃，因为不再需要它了。</p>
<p><a href="https://camo.githubusercontent.com/19339200bea064a781685dc9cc833bf910bf4638/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6f7074696d697a65642d737461636b2d6672616d65732e706e67"><img src="https://p0.ssl.qhimg.com/t01733df7df81734897.png" alt="The optimized stack for recursively calculating 3! (three factorial) using PTC" title="The optimized stack for recursively calculating 3! (three factorial) using PTC"></a></p>
<p><em>递归计算 3! 的堆栈（三次乘法）使用 PTC</em></p>
<p>现在选一个浏览器运行吧，假设你在使用 Safari，你会得到 <code>Infinity</code>（它是比在 JavaScript 中能表达的最大值更大的数）。但是我们没有得到堆栈溢出错误，那很不错！现在在其他的浏览器中呢怎么样呢？Safari 可能现在乃至将来是实现 PTC 的唯一一个浏览器。看看下面的兼容性表格：</p>
<p><a href="https://camo.githubusercontent.com/7fd78cc2834a1f222736ee55a09e7bd00f4c330e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7074632d636f6d7061746962696c6974792e706e67"><img src="https://p0.ssl.qhimg.com/t01727bc2bff74161c1.png" alt="PTC compatibility" title="PTC compatibility"></a></p>
<p><em>PTC 兼容性</em></p>
<p>其他浏览器提出了一种被称作<a href="https://github.com/tc39/proposal-ptc-syntax#syntactic-tail-calls-stc">语法级尾调用</a>syntactic tail calls（STC）的竞争标准。“语法级”意味着你需要用新的语法来标识你想要执行尾递归优化的函数。即使浏览器还没有广泛支持，但是把你的递归函数写成支持尾递归优化的样子还是一个好主意。</p>
<h3><a href="#高阶函数"></a>高阶函数</h3>
<p>我们已经知道 JavaScript 将函数视作一等公民，可以把函数像其他值一样传递。所以，把一个函数传给另一个函数也很常见。我们也可以让函数返回一个函数。就是它！我们有高阶函数。你可能已经很熟悉几个在 <code>Array.prototype</code> 中的高阶函数。比如 <code>filter</code>、<code>map</code> 和 <code>reduce</code> 就在其中。对高阶函数的一种理解是：它是接受（一般会调用）一个回调函数参数的函数。让我们来看看一些内置的高阶函数的例子：</p>
<pre><code class="hljs groovy">const vehicles = [
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Honda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'CR-V'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">24045</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Honda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Accord'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'sedan'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">22455</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Mazda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Mazda 6'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'sedan'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">24195</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Mazda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'CX-9'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">31520</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'4Runner'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">34210</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Sequoia'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">45560</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Tacoma'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'truck'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">24320</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Ford'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'F-150'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'truck'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">27110</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Ford'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Fusion'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'sedan'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">22120</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Ford'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Explorer'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">31660</span> }
];

const averageSUVPrice = vehicles
  .filter(v =&gt; v.type === <span class="hljs-string">'suv'</span>)
  .map(v =&gt; v.price)
  .reduce((sum, price, i, array) =&gt; sum + price / array.length, <span class="hljs-number">0</span>);

console.log(averageSUVPrice); <span class="hljs-comment">// 33399</span>

</code></pre><p>注意我们在一个数组对象上调用其方法，这是面向对象编程的特性。如果我们想要更函数式一些，我们可以用 Rmmda 或者 lodash/fp 提供的函数。注意如果我们使用 <code>R.compose</code> 的话，需要倒转函数的顺序，因为它从右向左依次调用函数（从底向上）；然而，如果我们想从左向右调用函数就像上面的例子，我们可以用 <code>R.pipe</code>。下面两个例子用了 Rmmda。注意 Rmmda 有一个 <code>mean</code> 函数用来代替 <code>reduce</code> 。</p>
<pre><code class="hljs groovy">const vehicles = [
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Honda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'CR-V'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">24045</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Honda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Accord'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'sedan'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">22455</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Mazda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Mazda 6'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'sedan'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">24195</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Mazda'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'CX-9'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">31520</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'4Runner'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">34210</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Sequoia'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">45560</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Tacoma'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'truck'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">24320</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Ford'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'F-150'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'truck'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">27110</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Ford'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Fusion'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'sedan'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">22120</span> },
  { <span class="hljs-string">make:</span> <span class="hljs-string">'Ford'</span>, <span class="hljs-string">model:</span> <span class="hljs-string">'Explorer'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'suv'</span>, <span class="hljs-string">price:</span> <span class="hljs-number">31660</span> }
];

<span class="hljs-comment">// Using `pipe` executes the functions from top-to-bottom. </span>
const averageSUVPrice1 = R.pipe(
  R.filter(v =&gt; v.type === <span class="hljs-string">'suv'</span>),
  R.map(v =&gt; v.price),
  R.mean
)(vehicles);

console.log(averageSUVPrice1); <span class="hljs-comment">// 33399</span>

<span class="hljs-comment">// Using `compose` executes the functions from bottom-to-top.</span>
const averageSUVPrice2 = R.compose(
  R.mean,
  R.map(v =&gt; v.price),
  R.filter(v =&gt; v.type === <span class="hljs-string">'suv'</span>)
)(vehicles);

console.log(averageSUVPrice2); <span class="hljs-comment">// 33399</span>

</code></pre><p>使用函数式方法的优点是清楚地分开了数据（<code>vehicles</code>）和逻辑（函数 <code>filter</code>，<code>map</code> 和 <code>reduce</code>）。面向对象的代码相比之下把数据和函数用以方法的对象的形式混合在了一起。</p>
<h3><a href="#柯里化"></a>柯里化</h3>
<p>不规范地说，柯里化currying是把一个接受 <code>n</code> 个参数的函数变成 <code>n</code> 个每个接受单个参数的函数的过程。函数的 <code>arity</code> 是它接受参数的个数。接受一个参数的函数是 <code>unary</code>，两个的是 <code>binary</code>，三个的是 <code>ternary</code>，<code>n</code> 个的是 <code>n-ary</code>。那么，我们可以把柯里化定义成将一个 <code>n-ary</code> 函数转换成 <code>n</code> 个 <code>unary</code> 函数的过程。让我们通过简单的例子开始，一个计算两个向量点积的函数。回忆一下线性代数，两个向量 <code>[a, b, c]</code> 和 <code>[x, y, z]</code> 的点积是 <code>ax + by + cz</code>。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dot</span>(<span class="hljs-params">vector1, vector2</span>) </span>{
  <span class="hljs-keyword">return</span> vector1.reduce(<span class="hljs-function">(<span class="hljs-params">sum, element, index</span>) =&gt;</span> sum += element * vector2[index], <span class="hljs-number">0</span>);
}

<span class="hljs-keyword">const</span> v1 = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">-5</span>];
<span class="hljs-keyword">const</span> v2 = [<span class="hljs-number">4</span>, <span class="hljs-number">-2</span>, <span class="hljs-number">-1</span>];

<span class="hljs-built_in">console</span>.log(dot(v1, v2)); <span class="hljs-comment">// 1(4) + 3(-2) + (-5)(-1) = 4 - 6 + 5 = 3</span>

</code></pre><p><code>dot</code> 函数是 binary，因为它接受两个参数；然而我们可以将它手动转换成两个 unary 函数，就像下面的例子。注意 <code>curriedDot</code> 是一个 unary 函数，它接受一个向量并返回另一个接受第二个向量的 unary 函数。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curriedDot</span>(<span class="hljs-params">vector1</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">vector2</span>) </span>{
    <span class="hljs-keyword">return</span> vector1.reduce(<span class="hljs-function">(<span class="hljs-params">sum, element, index</span>) =&gt;</span> sum += element * vector2[index], <span class="hljs-number">0</span>);
  }
}

<span class="hljs-comment">// Taking the dot product of any vector with [1, 1, 1]</span>
<span class="hljs-comment">// is equivalent to summing up the elements of the other vector.</span>
<span class="hljs-keyword">const</span> sumElements = curriedDot([<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>]);

<span class="hljs-built_in">console</span>.log(sumElements([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">-5</span>])); <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(sumElements([<span class="hljs-number">4</span>, <span class="hljs-number">-2</span>, <span class="hljs-number">-1</span>])); <span class="hljs-comment">// 1</span>

</code></pre><p>很幸运，我们不需要把每一个函数都手动转换成柯里化以后的形式。<a href="http://ramdajs.com/docs/#curry">Ramda</a> 和 <a href="https://lodash.com/docs/4.17.4#curry">lodash</a> 等库可以为我们做这些工作。实际上，它们是柯里化的混合形式。你既可以每次传递一个参数，也可以像原来一样一次传递所有参数。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dot</span>(<span class="hljs-params">vector1, vector2</span>) </span>{
  <span class="hljs-keyword">return</span> vector1.reduce(<span class="hljs-function">(<span class="hljs-params">sum, element, index</span>) =&gt;</span> sum += element * vector2[index], <span class="hljs-number">0</span>);
}

<span class="hljs-keyword">const</span> v1 = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">-5</span>];
<span class="hljs-keyword">const</span> v2 = [<span class="hljs-number">4</span>, <span class="hljs-number">-2</span>, <span class="hljs-number">-1</span>];

<span class="hljs-comment">// Use Ramda to do the currying for us!</span>
<span class="hljs-keyword">const</span> curriedDot = R.curry(dot);

<span class="hljs-keyword">const</span> sumElements = curriedDot([<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>]);

<span class="hljs-built_in">console</span>.log(sumElements(v1)); <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(sumElements(v2)); <span class="hljs-comment">// 1</span>

<span class="hljs-comment">// This works! You can still call the curried function with two arguments.</span>
<span class="hljs-built_in">console</span>.log(curriedDot(v1, v2)); <span class="hljs-comment">// 3</span>

</code></pre><p>Ramda 和 lodash 都允许你“跳过”一些变量之后再指定它们。它们使用置位符来做这些工作。因为点积的计算可以交换两项。传入向量的顺序不影响结果。让我们换一个例子来阐述如何使用一个置位符。Ramda 使用双下划线作为其置位符。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> giveMe3 = R.curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item1, item2, item3</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`
    1: <span class="hljs-subst">${item1}</span>
    2: <span class="hljs-subst">${item2}</span>
    3: <span class="hljs-subst">${item3}</span>
  `</span>;
});

<span class="hljs-keyword">const</span> giveMe2 = giveMe3(R.__, R.__, <span class="hljs-string">'French Hens'</span>);   <span class="hljs-comment">// Specify the third argument.</span>
<span class="hljs-keyword">const</span> giveMe1 = giveMe2(<span class="hljs-string">'Partridge in a Pear Tree'</span>);  <span class="hljs-comment">// This will go in the first slot.</span>
<span class="hljs-keyword">const</span> result = giveMe1(<span class="hljs-string">'Turtle Doves'</span>);               <span class="hljs-comment">// Finally fill in the second argument.</span>

<span class="hljs-built_in">console</span>.log(result);
<span class="hljs-comment">// 1: Partridge in a Pear Tree</span>
<span class="hljs-comment">// 2: Turtle Doves</span>
<span class="hljs-comment">// 3: French Hens</span>

</code></pre><p>在我们结束探讨柯里化之前最后的议题是偏函数应用partial application。偏函数应用和柯里化经常同时出场，尽管它们实际上是不同的概念。一个柯里化的函数还是柯里化的函数，即使没有给它任何参数。偏函数应用，另一方面是仅仅给一个函数传递部分参数而不是所有参数。柯里化是偏函数应用常用的方法之一，但是不是唯一的。</p>
<p>JavaScript 拥有一个内置机制可以不依靠柯里化来做偏函数应用。那就是 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind">function.prototype.bind</a> 方法。这个方法的一个特殊之处在于，它要求你将 <code>this</code> 作为第一个参数传入。 如果你不进行面向对象编程，那么你可以通过传入 <code>null</code> 来忽略 <code>this</code>。</p>
<pre><code class="hljs typescript"><span class="hljs-number">1</span><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">giveMe3</span>(<span class="hljs-params">item1, item2, item3</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`
    1: <span class="hljs-subst">${item1}</span>
    2: <span class="hljs-subst">${item2}</span>
    3: <span class="hljs-subst">${item3}</span>
  `</span>;
}

<span class="hljs-keyword">const</span> giveMe2 = giveMe3.bind(<span class="hljs-literal">null</span>, <span class="hljs-string">'rock'</span>);
<span class="hljs-keyword">const</span> giveMe1 = giveMe2.bind(<span class="hljs-literal">null</span>, <span class="hljs-string">'paper'</span>);
<span class="hljs-keyword">const</span> result = giveMe1(<span class="hljs-string">'scissors'</span>);

<span class="hljs-built_in">console</span>.log(result);
<span class="hljs-comment">// 1: rock</span>
<span class="hljs-comment">// 2: paper</span>
<span class="hljs-comment">// 3: scissors</span>

</code></pre><h3><a href="#总结"></a>总结</h3>
<p>我希望你享受探索 JavaScript 中函数式编程的过程。对一些人来说，它可能是一个全新的编程范式，但我希望你能尝试它。你会发现你的程序更易于阅读和调试。不变性还将允许你优化 Angular 和 React 的性能。</p>
<p><em>这篇文章基于 Matt 在 OpenWest 的演讲 <a href="https://www.openwest.org/schedule/#talk-5">JavaScript the Good-er Parts</a>. <a href="https://www.openwest.org/">OpenWest</a> 将在 6/12-15 ,2017 在 Salt Lake City, Utah 举行。</em></p>
<hr>
<p>作者简介：</p>
<p>Matt Banz - Matt 于 2008 年五月在犹他大学获得了数学学位毕业。一个月后他得到了一份 web 开发者的工作，他从那时起就爱上了它！在 2013 年，他在北卡罗莱纳州立大学获得了计算机科学硕士学位。他在 LDS 商学院和戴维斯学区社区教育计划教授 Web 课程。他现在是就职于 Motorola Solutions 公司的高级前端开发者。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/6/functional-javascript">https://opensource.com/article/17/6/functional-javascript</a></p>
<p>作者：<a href="https://opensource.com/users/battmanz">Matt Banz</a> 译者：<a href="https://github.com/trnhoe">trnhoe</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 函数式编程介绍

## 原文链接
[https://www.zcfy.cc/article/an-introduction-to-functional-programming-in-javascript](https://www.zcfy.cc/article/an-introduction-to-functional-programming-in-javascript)


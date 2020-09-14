---
title: '编码如作文：写出高可读 JS 的 7 条原则' 
date: 2019-01-14 2:30:07
hidden: true
slug: lf85mmjmjb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009417034" src="https://static.alili.tech/img/remote/1460000009417034" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>共 5914 字，读完需 8 分钟。编译自 <a href="https://twitter.com/_ericelliott" rel="nofollow noreferrer" target="_blank">Eric Elliott</a> 的<a href="https://medium.com/javascript-scene/elements-of-javascript-style-caa8821cb99f" rel="nofollow noreferrer" target="_blank">文章</a>，好的程序员写出来的代码就如同优美的诗赋，给阅读的人带来非常愉悦的享受。我们怎么能达到那样的水平？要搞清楚这个问题，先看看好的文章是怎么写出来的。</p></blockquote>
<p>William Strunk 在 1920 年出版的<a href="https://www.amazon.com/Elements-Style-Fourth-William-Strunk/dp/020530902X/ref=as_li_ss_tl?ie=UTF8&amp;qid=1493260884&amp;sr=8-1&amp;keywords=the+elements+of+style&amp;linkCode=ll1&amp;tag=eejs-20&amp;linkId=f7eb0eacba0eab243899626551113119" rel="nofollow noreferrer" target="_blank">《The Elements of Style》</a> 一书中列出了写出好文章的 7 条原则，过了近一个世纪，这些原则并没有过时。对于工程师来说，代码是写一遍、修改很多遍、阅读更多遍的重要产出，可读性至关重要，我们可以用这些写作原则指导日常的编码，写出高可读的代码。</p>
<p>需要注意的是，这些原则并不是法律，如果违背它们能让代码可读性更高，自然是没问题的，但我们需要保持警惕和自省，因为这些久经时间考验的原则通常是对的，我们最好不要因为奇思异想或个人偏好而违背这些原则。</p>
<p>7 条写作原则如下：</p>
<ol>
<li><p>让段落成为写作的基本单位，每个段落只说 1 件事情；</p></li>
<li><p>省略不必要的词语；</p></li>
<li><p>使用主动式；</p></li>
<li><p>避免连串的松散句子；</p></li>
<li><p>把相关内容放在一起；</p></li>
<li><p>多用肯定语句；</p></li>
<li><p>善用平行结构；</p></li>
</ol>
<p>对应的，在编码时：</p>
<ol>
<li><p>让函数成为编码的基本单位，每个函数只做 1 件事情；</p></li>
<li><p>省略不必要的代码；</p></li>
<li><p>使用主动式；</p></li>
<li><p>避免连串的松散表达式；</p></li>
<li><p>把相关的代码放在一起；</p></li>
<li><p>多用肯定语句；</p></li>
<li><p>善用平行结构；</p></li>
</ol>
<h2 id="articleHeader0">1. 让函数成为编码的基本单位，每个函数只做 1 件事情</h2>
<blockquote><p>The essence of software development is composition. We build software by composing modules, functions, and data structures together.</p></blockquote>
<p>软件开发的本质是组合，我们通过组合模块、函数、数据结构来构造软件。理解如何编写和组合函数是软件工程师的基本技能。模块通常是一个或多个函数和数据结构的集合，而数据结构是我们表示程序状态的方法，但是在我们调用一个函数之前，通常什么也不会发生。在 JS 中，我们可以把函数分为 3 种：</p>
<ul>
<li><p>I/O 型函数 (Communicating Functions)：进行磁盘或者网络 I/O；</p></li>
<li><p>过程型函数 (Procedural Functions)：组织指令序列；</p></li>
<li><p>映射型函数 (Mapping Functions)：对输入进行计算、转换，返回输出；</p></li>
</ul>
<p>虽然有用的程序都需要 I/O，大多数程序都会有过程指令，程序中的大多数函数都会是映射型函数：给定输入时，函数能返回对应的输出。</p>
<p><strong>每个函数只做一件事情</strong>: 如果你的函数是做网络请求（I/O 型）的，就不要在其中混入数据转换的代码（映射型）。如果严格按照定义，过程型函数很明显违背了这条原则，它同时也违背了另外一条原则：避免连串的松散表达式。</p>
<p>理想的函数应该是简单的、确定的、纯粹的：</p>
<ul>
<li><p>输入相同的情况下，输出始终相同；</p></li>
<li><p>没有任何副作用；</p></li>
</ul>
<p>关于纯函数的更多内容可以参照<a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader1">2. 省略不必要的代码</h2>
<blockquote><p>“Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts. This requires not that the writer make all sentences short, or avoid all detail and treat subjects only in outline, but that every word tell.”</p></blockquote>
<p>简洁的代码对软件质量至关重要，因为更多的代码等同于更多的 bug 藏身之所，换句话说：<strong>更少的代码 = 更少的 bug 藏身之所 = 更少的 bug</strong>。</p>
<p>简洁的代码读起来会更清晰，是因为它有更高的信噪比 (Signal-to-Noise Ratio)：阅读代码时更容易从较少的语法噪音中筛选出真正有意义的部分，可以说，<strong>更少的代码 = 更少的语法噪音 = 更高的信号强度</strong></p>
<p>借用《The Elements of Style》中的原话：简洁的代码更有力，比如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function secret (message) {
    return function () {
        return message;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">secret</span> (<span class="hljs-params">message</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> message;
    }
};</code></pre>
<p>可以被简化为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const secret = msg => () => msg;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> secret = <span class="hljs-function"><span class="hljs-params">msg</span> =&gt;</span> () =&gt; msg;</code></pre>
<p>显然，对熟悉箭头函数的同学来说，简化过的代码可读性更好，因为它省略了不必要的语法元素：花括号、<code>function</code> 关键字、<code>return</code> 关键字。而简化前的代码包含的语法要素对于传达代码意义本身作用并不大。当然，如果你不熟悉 ES6 的语法，这对你来说可能显得比较怪异，但 ES6 从 2015 年之后已经成为新的语言标准，如果你还不熟悉，是时候<a href="https://medium.com/javascript-scene/familiarity-bias-is-holding-you-back-its-time-to-embrace-arrow-functions-3d37e1a9bb75" rel="nofollow noreferrer" target="_blank">去升级了</a>。</p>
<h3 id="articleHeader2">省略不必要的变量</h3>
<p>我们常常忍不住去给实际上不需要命名的东西强加上名字。问题在于人的<a href="http://www.nature.com/neuro/journal/v17/n3/fig_tab/nn.3655_F2.html" rel="nofollow noreferrer" target="_blank">工作记忆是有限的</a>，阅读代码时，每个变量都会占用工作记忆的存储空间。因为这个原因，有经验的程序员会尽可能的消除不必要的变量命名。</p>
<p>比如，在大多数情况下，你可以不用给只是作为返回值的变量命名，函数名应该足够说明你要返回的是什么内容，考虑下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 稍显累赘的写法
const getFullName = ({firstName, lastName}) => {
  const fullName = firstName + ' ' + lastName;
  return fullName;
};

// 更简洁的写法
const getFullName = ({firstName, lastName}) => (
  firstName + ' ' + lastName
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 稍显累赘的写法</span>
<span class="hljs-keyword">const</span> getFullName = <span class="hljs-function">(<span class="hljs-params">{firstName, lastName}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> fullName = firstName + <span class="hljs-string">' '</span> + lastName;
  <span class="hljs-keyword">return</span> fullName;
};

<span class="hljs-comment">// 更简洁的写法</span>
<span class="hljs-keyword">const</span> getFullName = <span class="hljs-function">(<span class="hljs-params">{firstName, lastName}</span>) =&gt;</span> (
  firstName + <span class="hljs-string">' '</span> + lastName
);</code></pre>
<p>减少变量的另外一种方法是利用 <a href="http://stackoverflow.com/questions/944446/what-is-point-free-style-in-functional-programming" rel="nofollow noreferrer" target="_blank">point-free-style</a>，这是函数式编程里面的概念。</p>
<p><strong>point-free-style</strong> 是不引用函数所操作参数的一种函数定义方式，实现 <strong>point-free-style</strong> 的常见方法包括<a href="https://en.wikipedia.org/wiki/Function_composition" rel="nofollow noreferrer" target="_blank">函数组合(function composotion)</a>和<a href="https://en.wikipedia.org/wiki/Currying" rel="nofollow noreferrer" target="_blank">函数科里化(function currying)</a>。</p>
<p>先看函数科里化的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const add = a => b => a + b;

// Now we can define a point-free inc()
// that adds 1 to any number.
const inc = add(1);

inc(3); // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> add = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> b =&gt; a + b;

<span class="hljs-comment">// Now we can define a point-free inc()</span>
<span class="hljs-comment">// that adds 1 to any number.</span>
<span class="hljs-keyword">const</span> inc = add(<span class="hljs-number">1</span>);

inc(<span class="hljs-number">3</span>); <span class="hljs-comment">// 4</span></code></pre>
<p>细心的同学会发现并没有使用 <code>function</code> 关键字或者箭头函数语法来定义 <code>inc</code> 函数。<code>add</code> 也没有列出所 <code>inc</code> 需要的参数，因为 <code>add</code> 函数自己内部不需要使用这些参数，只是返回了能自己处理参数的新函数。</p>
<p><strong>函数组合</strong>是指把一个函数的输出作为另一个函数输入的过程。不管你有没有意识到，你已经在频繁的使用函数组合了，链式调用的代码基本都是这个模式，比如数组操作时使用的 <code>map</code>，<code>Promise</code> 操作时的 <code>then</code>。函数组合在函数式语言中也被称之为高阶函数，其基本形式为：<code>f(g(x))</code>。</p>
<p>把两个函数组合起来的时候，就消除了把中间结果存在变量中的需要，下面来看看函数组合让代码变简洁的例子：</p>
<p>先定义两个基本操作函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const g = n => n + 1;
const f = n => n * 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> g = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n + <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> f = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n * <span class="hljs-number">2</span>;</code></pre>
<p>我们的计算需求是：给定输入，先对其 +1，再对结果 x2，普通做法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 需要操作参数、并且存储中间结果
const incThenDoublePoints = n => {
  const incremented = g(n);
  return f(incremented);
};

incThenDoublePoints(20); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 需要操作参数、并且存储中间结果</span>
<span class="hljs-keyword">const</span> incThenDoublePoints = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> incremented = g(n);
  <span class="hljs-keyword">return</span> f(incremented);
};

incThenDoublePoints(<span class="hljs-number">20</span>); <span class="hljs-comment">// 42</span></code></pre>
<p>使用函数组合的写法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接受两个函数作为参数，直接返回组合
const compose = (f, g) => x => f(g(x));
const incThenDoublePointFree = compose(f, g);
incThenDoublePointFree(20); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 接受两个函数作为参数，直接返回组合</span>
<span class="hljs-keyword">const</span> compose = <span class="hljs-function">(<span class="hljs-params">f, g</span>) =&gt;</span> x =&gt; f(g(x));
<span class="hljs-keyword">const</span> incThenDoublePointFree = compose(f, g);
incThenDoublePointFree(<span class="hljs-number">20</span>); <span class="hljs-comment">// 42</span></code></pre>
<p>使用<a href="https://medium.com/javascript-scene/functors-categories-61e031bac53f" rel="nofollow noreferrer" target="_blank">仿函数 (funcot) </a>也能实现类似的效果，在仿函数中把参数封装成可遍历的数组，然后使用 <code>map</code> 或者 Promise 的 <code>then</code> 实现链式调用，具体的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = (f, g) => x => [x].map(g).map(f).pop();
const incThenDoublePointFree = compose(f, g);
incThenDoublePointFree(20); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> compose = <span class="hljs-function">(<span class="hljs-params">f, g</span>) =&gt;</span> x =&gt; [x].map(g).map(f).pop();
<span class="hljs-keyword">const</span> incThenDoublePointFree = compose(f, g);
incThenDoublePointFree(<span class="hljs-number">20</span>); <span class="hljs-comment">// 42</span></code></pre>
<p>如果你选择使用 Promise 链，代码看起来也会非常的像。</p>
<p>基本所有提供函数式编程工具的库都提供至少 2 种函数组合模式：</p>
<ul>
<li><p>compose：从右向左执行函数；</p></li>
<li><p>pipe：从左向右执行函数；</p></li>
</ul>
<p><code>lodash</code> 中的 <code>compose()</code> 和 <code>flow()</code> 分别对应这 2 种模式，下面是使用 <code>flow()</code> 的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import pipe from 'lodash/fp/flow';
pipe(g, f)(20); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> pipe <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/fp/flow'</span>;
pipe(g, f)(<span class="hljs-number">20</span>); <span class="hljs-comment">// 42</span></code></pre>
<p>如果不用 <code>lodash</code>，用下面的代码也可以实现相同的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
pipe(g, f)(20); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pipe = <span class="hljs-function">(<span class="hljs-params">...fns</span>) =&gt;</span> x =&gt; fns.reduce(<span class="hljs-function">(<span class="hljs-params">acc, fn</span>) =&gt;</span> fn(acc), x);
pipe(g, f)(<span class="hljs-number">20</span>); <span class="hljs-comment">// 42</span></code></pre>
<p>如果上面介绍的函数组合你觉得很异类，并且你不确定你会怎么使用它们，请仔细思考下面这句话：</p>
<blockquote><p>The essence of software development is composition. We build applications by composing smaller modules, functions, and data structures.</p></blockquote>
<p>从这句话，我们不难推论，理解函数和对象的组合方式对工程师的重要程度就像理解电钻和冲击钻对搞装修的人重要程度。当你使用命令式代码把函数和中间变量组合在一起的时候，就如同使用胶带把他们强行粘起来，而函数组合的方式看起来更自然流畅。</p>
<p>在不改变代码作用，不降低代码可读性的情况下，下面两条是永远应该谨记的：</p>
<ul>
<li><p>使用更少的代码；</p></li>
<li><p>使用更少的变量；</p></li>
</ul>
<h2 id="articleHeader3">3. 使用主动式</h2>
<blockquote><p>“The active voice is usually more direct and vigorous than the passive.”</p></blockquote>
<p>主动式通常比被动式更直接、有力，变量命名时要尽可能的直接，不拐弯抹角，例如：</p>
<ul>
<li><p><code>myFunction.wasCalled()</code> 优于 <code>myFunction.hasBeenCalled()</code>；</p></li>
<li><p><code>createUser() 优于 </code>User.create()`；</p></li>
<li><p><code>notify()</code> 优于 <code>Notifier.doNotification()</code>；</p></li>
</ul>
<p>命名布尔值时将其当做只有 “是” 和 “否” 两种答案的问题来命名：</p>
<ul>
<li><p><code>isActive(user)</code> 优于 <code>getActiveStatus(user)</code>；</p></li>
<li><p><code>isFirstRun = false;</code> 优于 <code>firstRun = false</code>;</p></li>
</ul>
<p>函数命名时尽可能使用动词：</p>
<ul>
<li><p><code>increment()</code> 优于 <code>plusOne()</code></p></li>
<li><p><code>unzip()</code> 优于 <code>filesFromZip()</code></p></li>
<li><p><code>filter(fn, array)</code> 优于 <code>matchingItemsFromArray(fn, array)</code></p></li>
</ul>
<p>事件监听函数（Event Handlers）和生命周期函数（Licecycle Methods）比较特殊因为他们更大程度是用来说明什么时候该执行而不是应该做什么，它们的命名方式可以简化为："&lt;时机&gt;，&lt;动词&gt;"。</p>
<p>下面是事件监听函数的例子：</p>
<ul>
<li><p><code>element.onClick(handleClick)</code> 优于 <code>element.click(handleClick)</code></p></li>
<li><p><code>component.onDragStart(handleDragStart)</code> 优于 <code>component.startDrag(handleDragStart)</code></p></li>
</ul>
<p>仔细审视上面两例的后半部分，你会发现，它们读起来更像是在触发事件，而不是对事件做出响应。</p>
<p>至于生命周期函数，考虑 React 中组件更新之前应该调用的函数该怎么命名：</p>
<ul>
<li><p>componentWillBeUpdated(doSomething)</p></li>
<li><p>componentWillUpdate(doSomething)</p></li>
<li><p>beforeUpdate(doSomething)</p></li>
</ul>
<p><code>componentWillBeUpdated</code> 用了被动式，意指将要被更新，而不是将要更新，有些饶舌，明显不如后面两个好。</p>
<p><code>componentWillUpdate</code> 更好点，但是这个命名更像是去调用 <code>doSomething</code>，我们的本意是：在 Component 更新之前，调用 <code>doSomething</code>，<code>beforeComponentUpdate</code> 能更清晰的表达我们的意图。</p>
<p>进一步简化，因为这些生命周期方法都是 Component 内置的，在方法中加上 Component 显得多余，可以脑补下直接在 Componenent 实例上调用这个方法的语法：<code>component.componentWillUpdate</code>，我们不需要把主语重复两次。显然，<code>component.beforeUpdate(doSomething)</code> 比 <code>component.beforeComponentUpdate(doSomething)</code> 更直接、简洁、准确。</p>
<p>还有一种函数叫 <code>[Functional Mixins][8]</code>，它们就像装配流水线给传进来的对象加上某些方法或者属性，这种函数的命名通常会使用形容词，如各种带 <code>"ing"</code> 或 <code>"able"</code> 后缀的词汇，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const duck = composeMixins(flying, quacking);   // 会像鸭子叫
const box = composeMixins(iterable, mappable);  // 可遍历的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> duck = composeMixins(flying, quacking);   <span class="hljs-comment">// 会像鸭子叫</span>
<span class="hljs-keyword">const</span> box = composeMixins(iterable, mappable);  <span class="hljs-comment">// 可遍历的</span></code></pre>
<h2 id="articleHeader4">4. 避免连串的松散表达式</h2>
<blockquote><p>“…a series soon becomes monotonous and tedious.”</p></blockquote>
<p>连串的松散代码常常会变的单调乏味，而把不强相关但按先后顺序执行的语句组合到过程式的函数中很容易写出<a href="https://en.wikipedia.org/wiki/Spaghetti_code" rel="nofollow noreferrer" target="_blank">意大利面式的代码(spaghetti code)</a>。这种写法常常会重复很多次，即使不是严格意义上的重复，也只有细微的差别。</p>
<p>比如，界面上的不同组件之间几乎共享完全相同的逻辑结构，考虑下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const drawUserProfile = ({ userId }) => {
  const userData = loadUserData(userId);
  const dataToDisplay = calculateDisplayData(userData);
  renderProfileData(dataToDisplay);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> drawUserProfile = <span class="hljs-function">(<span class="hljs-params">{ userId }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> userData = loadUserData(userId);
  <span class="hljs-keyword">const</span> dataToDisplay = calculateDisplayData(userData);
  renderProfileData(dataToDisplay);
};</code></pre>
<p><code>drawUserProfile</code> 函数实际上做了 3 件不同的事情：加载数据、根据数据计算视图状态、渲染视图。在大多数现代的前端框架里面，这 3 件事情都做了很好的分离。通过把关注点分离，每个关注点的扩展和组合方式就多了很多。</p>
<p>比如说，我们可以把渲染部分完全替换掉而不影响程序的其他部分，实例就是 React 家族的各种渲染引擎：ReactNative 用来在 iOS 和 Android 中渲染 APP，AFrame 来渲染 WebVR，ReactDOM/Server 来做服务端渲染。</p>
<p><code>drawUserProfile</code> 函数的另一个问题是：在数据加载完成之前，没有办法计算视图状态完成渲染，如果数据已经在其他地方加载过了会怎么样，就会做很多重复和浪费的事情。</p>
<p>关注点分离的设计能够使每个环节能够被独立的测试，我喜欢为应用添加单元测试，并在每次修改代码时查看测试结果。试想，如果把数据获取和视图渲染代码写在一起，单元测试将会变的困难，要么需要传入伪造的数据，要么转而采用比较笨重的 E2E 测试，而后者通常比较难立即给反馈，因为它们的运行比较耗时。</p>
<p>在使用 React 的场景下，<code>drawUserProfile</code> 中已经有了 3 个独立的函数可以接入到 Component 生命周期方法上，数据加载可以在 Component 挂载之后触发，而数据计算和渲染则可以在视图状态发生变化时触发。结果是，程序不同部分的职责被做了清晰的划分，每个 Component 都有相同的结构和生命周期方法，这样的程序运行起来会更稳定，我们也会少很多重复的代码。</p>
<h2 id="articleHeader5">5. 把相关代码放在一起</h2>
<p>很多框架和项目脚手架都规定了按代码类别来组织文件的方式，如果仅仅是开发一个简单的 TODO 应用，这样做无可厚非，但是在大型项目中，按照业务功能去组织代码通常更好。可能很多同学会忽略代码组织与代码可读性的关系，想想看是否接手过看了半天还不知道自己要修改的代码在哪里的项目呢？是什么原因造成的？</p>
<p>下面分别是按代码类别和业务功能来组织一个 TODO 应用代码的两种方式：</p>
<p><strong>按代码类别组织</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── components
│   ├── todos
│   └── user
├── reducers
│   ├── todos
│   └── user
└── tests
    ├── todos
    └── user" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>├── components
│   ├── todos
│   └── <span class="hljs-keyword">user</span>
<span class="hljs-title">├── reducers</span>
│   ├── todos
│   └── <span class="hljs-keyword">user</span>
<span class="hljs-title">└── tests</span>
    ├── todos
    └── user</code></pre>
<p><strong>按业务功能组织</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── todos
│   ├── component
│   ├── reducer
│   └── test
└── user
    ├── component
    ├── reducer
    └── test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>├── todos
│   ├── component
│   ├── reducer
│   └── test
└── <span class="hljs-keyword">user</span>
    <span class="hljs-title">├── component</span>
    ├── reducer
    └── test</code></pre>
<p>当按业务功能组织代码的时候，我们修改某个功能的时候不用在整个文件树上跳来跳去的找代码了。关于代码组织，《The Art of Readable Code》中也有部分介绍，感兴趣的同学可以去阅读。</p>
<h2 id="articleHeader6">6. 多用肯定语句</h2>
<blockquote><p>“Make definite assertions. Avoid tame, colorless, hesitating, non-committal language. Use the word _&gt; not_&gt;  as a means of denial or in antithesis, never as a means of evasion.”</p></blockquote>
<p>要做出确定的断言，避免使用温顺、无色、犹豫的语句，必要时使用 <code>not</code> 来否定、拒绝或逃避。典型的：</p>
<ul>
<li><p><code>isFlying</code> 优于 <code>isNotFlying</code></p></li>
<li><p><code>late</code> 优于 <code>notOnTime</code></p></li>
</ul>
<h3 id="articleHeader7">If 语句</h3>
<p>先处理错误情况，而后处理正常逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (err) return reject(err);
// do something..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err);
<span class="hljs-comment">// do something...</span></code></pre>
<p>优于先处理正常后处理错误：（对错误取反的判断读起来确实累）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!err) {
  // ... do something
} else {
  return reject(err);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!err) {
  <span class="hljs-comment">// ... do something</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">return</span> reject(err);
}</code></pre>
<h3 id="articleHeader8">三元表达式</h3>
<p>把肯定的放在前面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  [Symbol.iterator]: iterator ? iterator : defaultIterator
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  [<span class="hljs-built_in">Symbol</span>.iterator]: iterator ? iterator : defaultIterator
}</code></pre>
<p>优于把否定的放在前面（有个设计原则叫 Do not make me think，用到这里恰如其分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  [Symbol.iterator]: (!iterator) ? defaultIterator : iterator
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  [<span class="hljs-built_in">Symbol</span>.iterator]: (!iterator) ? defaultIterator : iterator
}</code></pre>
<h3 id="articleHeader9">恰当的使用否定</h3>
<p>有些时候我们只关心某个变量是否缺失，如果使用肯定的命名会强迫我们对变量取反，这种情况下使用 "not" 前缀和取反操作符不如使用否定语句直接，比如：</p>
<ul>
<li><p><code>if (missingValue)</code> 优于 <code>if (!hasValue)</code></p></li>
<li><p><code>if (anonymous)</code> 优于 <code>if (!user)</code></p></li>
<li><p><code>if (isEmpty(thing))</code> 优于 <code>if (notDefined(thing))</code></p></li>
</ul>
<h3 id="articleHeader10">善用命名参数对象</h3>
<p>不要期望函数调用者传入 undefined、null 来填补可选参数，要学会使用命名的参数对象，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createEvent = ({
  title = 'Untitled',
  timeStamp = Date.now(),
  description = ''
}) => ({ title, description, timeStamp });

// later...
const birthdayParty = createEvent({
  title: 'Birthday Party',
  description: 'Best party ever!'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createEvent = ({
  title = <span class="hljs-string">'Untitled'</span>,
  timeStamp = <span class="hljs-built_in">Date</span>.now(),
  description = <span class="hljs-string">''</span>
}) =&gt; ({ title, description, timeStamp });

<span class="hljs-comment">// later...</span>
<span class="hljs-keyword">const</span> birthdayParty = createEvent({
  <span class="hljs-attr">title</span>: <span class="hljs-string">'Birthday Party'</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">'Best party ever!'</span>
});</code></pre>
<p>就比下面这种形式好：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createEvent = (
  title = 'Untitled',
  timeStamp = Date.now(),
  description = ''
) => ({ title, description, timeStamp });

// later...
const birthdayParty = createEvent(
  'Birthday Party',
  undefined, // 要尽可能避免这种情况
  'Best party ever!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createEvent = (
  title = <span class="hljs-string">'Untitled'</span>,
  timeStamp = <span class="hljs-built_in">Date</span>.now(),
  description = <span class="hljs-string">''</span>
) =&gt; ({ title, description, timeStamp });

<span class="hljs-comment">// later...</span>
<span class="hljs-keyword">const</span> birthdayParty = createEvent(
  <span class="hljs-string">'Birthday Party'</span>,
  <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// 要尽可能避免这种情况</span>
  <span class="hljs-string">'Best party ever!'</span>
);</code></pre>
<h2 id="articleHeader11">7. 善用平行结构</h2>
<blockquote><p>“…parallel construction requires that expressions of similar content and function should be outwardly similar. The likeness of form enables the reader to recognize more readily the likeness of content and function.”</p></blockquote>
<p><a href="http://baike.baidu.com/link?url=49YTxXCu-zozWdvIe044c30N9MZVCixDsg9LLy4-qCMyesdRgg-UlPmRupCpkj39ZE34ekcFzd01vhJfWByfa9V_Mu-xlXWdch-pUER2EVIShApsmNCPxj00C6IyjDnJ" rel="nofollow noreferrer" target="_blank">平行结构</a>是语法中的概念，英语中的平行结构指：内容相似、结构相同、无先后顺序、无因果关系的并列句。不管是设计模式还是编程范式，都可以放在这个范畴中思考和理解，如果有重复，就肯定有模式，平行结构对阅读理解非常重要。</p>
<p>软件开发中遇到的绝大多数问题前人都遇到并解决过，如果发现在重复做同样的事情，是时候停下来做抽象了：找到相同的地方，构建一个能够很方便的添加不同的抽象层，很多库和框架的本质就是在做这类事情。</p>
<p>组件化是非常不错的例子：10 年前，使用 jQuery 写出把界面更新、应用逻辑和数据加载混在一起的代码是再常见不过的，随后人们意识到，我们可以把 MVC 模式应用到客户端，于是就开始从界面更新中剥离数据层。最后，我们有了组件化这个东西，有了组件化，我们就能用完全相同的方式去表达所有组件的更新逻辑、生命周期，而不用再写一堆命令式的代码。</p>
<p>对于熟悉组件化概念的同学，很容易理解组件是如何工作的：部分代码负责声明界面、部分负责在组件生命周期做我们期望它做的事情。当我们在重复的问题上使用相同的编码模式，熟悉这种模式的同学很快就能理解代码在干什么。</p>
<h2 id="articleHeader12">总结：代码应该简单而不是过于简化</h2>
<blockquote><p>Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts. <strong>This requires not that the writer make all sentences short, or avoid all detail and treat subjects only in outline, but that every word tell.</strong></p></blockquote>
<p>简洁的代码是有力的，它不应该包含不必要的变量、语法结构，不要求程序员一定要把代码写的最短，或者省略很多细节，而是要求代码中出现的每个变量、函数都能清晰、直观的传达我们的意图和想法。</p>
<p>代码应该是简洁的，因为简洁的代码更容易写（通常代码量更少）、更容易读、更好维护，简洁的代码就是更难出 bug、更容易调试的代码。bug 修复通常会费时费力，而修复过程可能引发更多的 bug，修复 bug 也会影响正常的开发进度。</p>
<p>认为写出熟悉的代码才是可读性更高的代码的同学，实际上是大错特错，可读性高的代码必然是简洁和简单的，虽然 ES6 早在 2015 年已经成为新的标准，但到了 2017 年，还是有很多同学不会使用诸如箭头函数、隐式 return、rest 和 spread 操作符之类的简洁语法。对新语法的熟悉需要不断的练习，投入时间去学习和熟悉新语法以及函数组合的思想和技术，熟悉之后，就会发现代码原来还可以这样写。</p>
<p>最后需要注意的是，代码应该简洁，而不是过于简化。</p>
<h2 id="articleHeader13">One More Thing</h2>
<p>本文作者王仕军，商业转载请联系作者获得授权，非商业转载请注明出处。如果你觉得本文对你有帮助，请点赞！如果对文中的内容有任何疑问，欢迎留言讨论。想知道我接下来会写些什么？欢迎订阅我的<a href="https://juejin.im/user/57a7f634d342d300576b738d" rel="nofollow noreferrer" target="_blank">掘金专栏</a>或<a href="https://zhuanlan.zhihu.com/feweekly" rel="nofollow noreferrer" target="_blank">知乎专栏</a>：《前端周刊：让你在前端领域跟上时代的脚步》。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编码如作文：写出高可读 JS 的 7 条原则

## 原文链接
[https://segmentfault.com/a/1190000009417031](https://segmentfault.com/a/1190000009417031)


---
title: 'JavaScript 函数式编程到底是个啥' 
date: 2019-01-11 2:30:08
hidden: true
slug: srk0js3d93o
categories: [reprint]
---

{{< raw >}}

                    
<p>随着大前端时代的到来，在产品开发过程中，前端所占业务比重越来越大、交互越来越重。传统的老夫拿起JQuery就是一把梭应付当下重交互页面已经十分乏力。于是乎有了Angular，React，Vue这些现代框架。</p>
<p>但随之而来的还有大量的新知识新名词，如MVC，MVVM，Flux这些设计模式就弄得很多同学傻傻分不清。这时候又见到别人讨论什么函数式编程，更是一脸懵逼了。</p>
<p>我们大多听过面向对象编程，面向过程编程，那啥又是函数式编程呢？在我们前端开发中又有哪些应用场景？我抱着这个疑惑，初步的学习了下。<em>（此文仅是学习，无甚干货）。</em></p>
<h2 id="articleHeader0">函数式编程</h2>
<h3 id="articleHeader1">定义</h3>
<p>函数式编程（Functional Programming，后面简称FP），维基百科的定义是：</p>
<blockquote><p>是一种编程范型，它将电脑运算视为数学上的函数计算，并且避免使用程序状态以及易变对象。函数编程语言最重要的基础是λ演算（lambda calculus）。而且λ演算的函数可以接受函数当作输入（引数）和输出（传出值）。比起命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。</p></blockquote>
<p>我来尝试理解下这个定义，好像就是说，在敲代码的时候，我要把过程逻辑写成函数，定义好输入参数，只关心它的输出结果。而且可以把函数作为输入输出。感觉好像平常写js时，就是这样的嘛！</p>
<h3 id="articleHeader2">特性</h3>
<p>网上FP的定义与特性琳琅满目。各种百科、博客、一些老师的网站上都有大同小异的介绍。为了方便阅读，我列下几个好像比较重要的特性，并附上我的第一眼理解。</p>
<ol>
<li><p><strong>函数是一等公民</strong>。就是说函数可以跟其他变量一样，可以作为其他函数的输入输出。喔，回调函数就是典型应用。</p></li>
<li><p><strong>不可变量</strong>。就是说，不能用var跟let咯。按这要求，我似乎有点难写代码。</p></li>
<li><p><strong>纯函数</strong>。就是没有副作用的函数。这个好理解，就是不修改函数外部的变量。</p></li>
<li><p><strong>引用透明</strong>。这个也好理解，就是说同样的输入，必定是同样的输出。函数内部不依赖外部状态，如一些全局变量。</p></li>
<li><p><strong>惰性计算</strong>。大意就是：一个表达式绑定的变量，不是声明的时候就计算出来，而是真正用到它的时候才去计算。</p></li>
</ol>
<p>还有一些衍生的特性，如柯里化与组合，三言两语说不清，就不阐述了，有兴趣的同学可以自己再了解了解。</p>
<h2 id="articleHeader3">FP在JavaScript中的应用</h2>
<p>React就是典型的FP。它不同于Vue这样的MVVM框架，它仅仅是个View层。<br><code>ReactView = render(data)</code> 它只关心你的输入，最终给你返回相应视图。所以你休想在react组件中去修改父组件的状态，更没有与dom的双向绑定。</p>
<p>这个是框架上的应用，那么在我们平常书写JavaScript时有哪些应用呢？换句话说，平常书写js时候，遇到什么情况，我们采用FP会更好。</p>
<p>从最常见的入手吧，如典型的操作数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 从users中筛选出年龄大于15岁的人的名字
const users = [
  {
    age: 10,
    name: '张三',
  }, {
    age: 20,
    name: '李四'
  }, {
    age: 30,
    name: '王五'
  }
];

// 过程式
const names = [];
for (let i = 0; i < users.length; i++)　{
  if (users[i].age > 15) {
    names.push(users[i].name);
  }
}
// 函数式
const names = users.filter(u => u.age > 15).map(u => u.name);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 从users中筛选出年龄大于15岁的人的名字</span>
<span class="hljs-keyword">const</span> users = [
  {
    <span class="hljs-attr">age</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
  }, {
    <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'李四'</span>
  }, {
    <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'王五'</span>
  }
];

<span class="hljs-comment">// 过程式</span>
<span class="hljs-keyword">const</span> names = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++)　{
  <span class="hljs-keyword">if</span> (users[i].age &gt; <span class="hljs-number">15</span>) {
    names.push(users[i].name);
  }
}
<span class="hljs-comment">// 函数式</span>
<span class="hljs-keyword">const</span> names = users.filter(<span class="hljs-function"><span class="hljs-params">u</span> =&gt;</span> u.age &gt; <span class="hljs-number">15</span>).map(<span class="hljs-function"><span class="hljs-params">u</span> =&gt;</span> u.name);
</code></pre>
<p>嗯，代码精简了很多，但是貌似带来了更大的开销。如果是非常大的数据，非常多的筛选工作，那就会循环多次。</p>
<p>这里得想到刚刚的惰性计算。按照惰性求值的要求，应该是要最后返回结果时，才真正去筛选年纪并得到姓名数组。</p>
<p>然而JavaScript的数组并不支持惰性求值。这时候我们得上一些工具库，如<a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">Lodash</a>。可以看下它文档中的例子：<a href="https://lodash.com/docs/4.17.4#chain" rel="nofollow noreferrer" target="_blank">_.chain</a>。</p>
<p>好像也没好到哪里去啊，不就是把多行代码变一行嘛？说的那么玄乎，还多了性能开销，然后又跟我说得上个工具库。。。</p>
<p>说的好像很有道理，但是for循环是有个弊端的，它产生了变量i，而这个变量又是不可控的，如果业务逻辑一复杂，谁知道它循环到什么时候i有没有发生变化，然后导致循环出问题呢？</p>
<p>我们再看一个与DOM交互的场景：<br>假如页面有一个按钮<code>button</code>，我们需要求出用户点击了几次，但是一秒钟内重复点击的不算。传统方法会这么写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var count = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var button = document.querySelector('button');
button.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> rate = <span class="hljs-number">1000</span>;
<span class="hljs-keyword">var</span> lastClick = <span class="hljs-built_in">Date</span>.now() - rate;
<span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'button'</span>);
button.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Date</span>.now() - lastClick &gt;= rate) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Clicked <span class="hljs-subst">${++count}</span> times`</span>);
    lastClick = <span class="hljs-built_in">Date</span>.now();
  }
});</code></pre>
<p>妥，完全没问题。但是发现多了很多状态，count，rate，lastClick，还得对比来对比去。那如果用FP会是怎么样的呢？</p>
<p>抱歉。。。没法写。。。除非很强大的编程能力，自己封装好方法去处理。所以在这里，我们可以上个工具---<a href="http://reactivex.io/rxjs/manual/overview.html" rel="nofollow noreferrer" target="_blank">Rx.js</a>，上述的例子就是rxjs中引用的，我们看它是如何优雅地处理的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000) // 每隔1000毫秒才能触发事件
  .scan(count => count + 1, 0) // 求值，默认值是0
  .subscribe(count => console.log(`Clicked ${count} times`)); // 订阅结果、输出值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'button'</span>);
Rx.Observable.fromEvent(button, <span class="hljs-string">'click'</span>)
  .throttleTime(<span class="hljs-number">1000</span>) <span class="hljs-comment">// 每隔1000毫秒才能触发事件</span>
  .scan(<span class="hljs-function"><span class="hljs-params">count</span> =&gt;</span> count + <span class="hljs-number">1</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// 求值，默认值是0</span>
  .subscribe(<span class="hljs-function"><span class="hljs-params">count</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Clicked <span class="hljs-subst">${count}</span> times`</span>)); <span class="hljs-comment">// 订阅结果、输出值</span></code></pre>
<p>巧夺天工！再也不用去管理状态了，不需要声明一堆变量，修改来修改去，判断来判断去，简直完美。</p>
<p>平常我们有很多需要更新dom的异步操作，如搜索行为：用户连续输入查询值，如果停顿半秒就执行搜索，如果搜索了多次，发起了多次请求，那只返回最终输入的那次搜索结果。</p>
<p>闭上眼想想，你之前是怎么实现的。反正我都是设置开始时间，结束时间，上次时间，等等变量。繁琐，而且不可控。</p>
<p>当我们以FP的思想去实现时，就会想方设法的减少变量，来优雅程序。最常见的方法就是用下别人的工具库来实现它。当然有些简单的场景也可以自己实现，最主要的还是要有这个意识。</p>
<p>其实我们平常已经写了一些FP了，只是我们没意识到，或者没怎么写好。就好比闭包，很多人都不了解闭包的概念，但实际上已经写了很多闭包代码。其实闭包本身也是函数式编程的一个应用。</p>
<p>鉴于我自己理解也不深，没法多阐述FP的应用，大家如果有兴趣，可以多了解了解。</p>
<h2 id="articleHeader4">FP在JavaScript中的优劣势</h2>
<p>总结一下FP的优劣，以便于我们在实际开发中，能更好的抉择是否采用FP。</p>
<h3 id="articleHeader5">优势</h3>
<ol>
<li><p><strong>更好的管理状态</strong>。因为它的宗旨是无状态，或者说更少的状态。而平常DOM的开发中，因为DOM的视觉呈现依托于状态变化，所以不可避免的产生了非常多的状态，而且不同组件可能还相互依赖。以FP来编程，能最大化的减少这些未知、优化代码、减少出错情况。</p></li>
<li><p><strong>更简单的复用</strong>。极端的FP代码应该是每一行代码都是一个函数，当然我们不需要这么极端。我们尽量的把过程逻辑以更纯的函数来实现，固定输入-&gt;固定输出，没有其他外部变量影响，并且无副作用。这样代码复用时，完全不需要考虑它的内部实现和外部影响。</p></li>
<li><p><strong>更优雅的组合</strong>。往大的说，网页是由各个组件组成的。往小的说，一个函数也可能是由多个小函数组成的。参考上面第二点，更强的复用性，带来更强大的组合性。</p></li>
<li><p>隐性好处。减少代码量，提高维护性。</p></li>
</ol>
<h3 id="articleHeader6">劣势</h3>
<ol>
<li><p>JavaScript不能算是严格意义上的函数式语言，很多函数式编程的特性并没有。比如上文说的数组的惰性链求值。为了实现它就得上工具库，或者自己封装实现，提高了代码编写成本。</p></li>
<li><p>跟过程式相比，它并没有提高性能。有些地方，如果强制用FP去写，由于没有中间变量，还可能会降低性能。</p></li>
<li><p>代码不易读。这个因人而异，因码而已。特别熟悉FP的人可能会觉得这段代码一目了然。而不熟悉的人，遇到写的晦涩的代码，看着一堆堆lambda演算跟匿名函数 <code>() =&gt; () =&gt; ()</code> 瞬间就懵逼了。看懂代码，得脑子里先演算半小时。</p></li>
<li><p>学习成本高。一方面继承于上一点。另一方面，很多前端coder，就是因为相对不喜欢一些底层的抽象的编程语言，才来踏入前端坑，你现在又让他们一头扎入FP，显得手足无措。</p></li>
</ol>
<h2 id="articleHeader7">总结</h2>
<p>个人觉得，FP还是好的。对于开发而言，确确实实能优化我们的代码，熟悉之后，也能提高编程效率。对于编程本身而言，也能拓展我们的思维，不局限在过程式的编程代码。</p>
<p>在编写JS中，可以尽量的运用FP的思维，如不可变量、纯函数、惰性求值。但也不必教条式的遵循函数式编程，一定要怎样怎样。比如我们看下知乎大V某温的一个回答：<a href="https://www.zhihu.com/question/59871249/answer/171201717" rel="nofollow noreferrer" target="_blank">传送门</a>。</p>
<p>唉，做个页面仔不容易啊。但是不想当大牛的页面仔不是好页面仔！</p>
<h2 id="articleHeader8">参考</h2>
<ol>
<li><p><a href="http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html" rel="nofollow noreferrer" target="_blank">函数式编程入门教程-阮一峰</a></p></li>
<li><p><a href="https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B8%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80" rel="nofollow noreferrer" target="_blank">函数编程语言-维基百科</a></p></li>
<li><p><a href="https://www.zhihu.com/question/59871249" rel="nofollow noreferrer" target="_blank">前端开发js函数式编程真实用途体现在哪里？-知乎答者</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 函数式编程到底是个啥

## 原文链接
[https://segmentfault.com/a/1190000009864459](https://segmentfault.com/a/1190000009864459)


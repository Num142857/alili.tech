---
title: 'JavaScript函数式编程（二）' 
date: 2019-02-06 2:30:08
hidden: true
slug: ivyjj3xoxs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript函数式编程（二）</h2>
<p>拖延症了好久，第二篇终于写出来了。</p>
<p>上一篇在这里：<a href="https://zhuanlan.zhihu.com/p/21714695" rel="nofollow noreferrer" target="_blank">JavaScript函数式编程（一）</a></p>
<p>上一篇文章里我们提到了纯函数的概念，所谓的纯函数就是，<strong>对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态</strong>（我偷懒复制过来的）。</p>
<p>但是实际的编程中，特别是前端的编程范畴里，“不依赖外部环境”这个条件是根本不可能的，我们总是不可避免地接触到 DOM、AJAX 这些状态随时都在变化的东西。所以我们需要用更强大的技术来干这些脏活。</p>
<h2 id="articleHeader1">一、容器、Functor</h2>
<p>如果你熟悉 jQuery 的话，应该还记得，<code>$(...)</code> 返回的对象并不是一个原生的 DOM 对象，而是对于原生对象的一种封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = $('#foo'); 

foo == document.getElementById('foo'); 
//=> false

foo[0] == document.getElementById('foo'); 
//=> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = $(<span class="hljs-string">'#foo'</span>); 

foo == <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'foo'</span>); 
<span class="hljs-comment">//=&gt; false</span>

foo[<span class="hljs-number">0</span>] == <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'foo'</span>); 
<span class="hljs-comment">//=&gt; true</span></code></pre>
<p>这在某种意义上就是一个“容器”（但它并不函数式）。</p>
<p>接下类我们会看到，容器为函数式编程里普通的变量、对象、函数提供了一层极其强大的外衣，赋予了它们一些很惊艳的特性，就好像 Tony Stark 的钢铁外衣，Dva 的机甲，明日香的2号机一样。</p>
<p>下面我们就来写一个最简单的容器吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Container = function(x) {
  this.__value = x;
}
Container.of = x => new Container(x);

//试试看
Container.of(1);
//=> Container(1)

Container.of('abcd');
//=> Container('abcd')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Container = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">this</span>.__value = x;
}
Container.of = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-keyword">new</span> Container(x);

<span class="hljs-comment">//试试看</span>
Container.of(<span class="hljs-number">1</span>);
<span class="hljs-comment">//=&gt; Container(1)</span>

Container.of(<span class="hljs-string">'abcd'</span>);
<span class="hljs-comment">//=&gt; Container('abcd')</span></code></pre>
<p>我们调用 <code>Container.of</code> 把东西装进容器里之后，由于这一层外壳的阻挡，普通的函数就对他们不再起作用了，所以我们需要加一个接口来让外部的函数也能作用到容器里面的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Container.prototype.map = function(f){
  return Container.of(f(this.__value))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Container.prototype.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>)</span>{
  <span class="hljs-keyword">return</span> Container.of(f(<span class="hljs-keyword">this</span>.__value))
}</code></pre>
<p>我们可以这样使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Container.of(3)
    .map(x => x + 1)                 //=> Container(4)
    .map(x => 'Result is ' + x);    //=> Container('Result is 4')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Container.of(<span class="hljs-number">3</span>)
    .map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-number">1</span>)                 <span class="hljs-comment">//=&gt; Container(4)</span>
    .map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-string">'Result is '</span> + x);    <span class="hljs-comment">//=&gt; Container('Result is 4')</span></code></pre>
<p>没错！我们仅花了 7 行代码就实现了很炫的<strong>链式调用</strong>，这也是我们的第一个 <strong>Functor</strong>。</p>
<p><strong>Functor（函子）是实现了 map 并遵守一些特定规则的容器类型。</strong></p>
<p>也就是说，如果我们要将普通函数应用到一个被容器包裹的值，那么我们首先需要定义一个叫 <strong>Functor</strong> 的数据类型，在这个数据类型中需要定义如何使用 <code>map</code> 来应用这个普通函数。</p>
<p>把东西装进一个容器，只留出一个接口 <code>map</code> 给容器外的函数，这么做有什么好处呢？</p>
<p><strong>本质上，Functor 是一个对于函数调用的抽象，我们赋予容器自己去调用函数的能力。当 <code>map</code> 一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如何操作这个函数，以致于拥有惰性求值、错误处理、异步调用等等非常牛掰的特性。</strong></p>
<p>举个例子，我们现在为 <code>map</code> 函数添加一个检查空值的特性，这个新的容器我们称之为 <code>Maybe</code>（原型来自于Haskell）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

//试试看
import _ from 'lodash';
var add = _.curry(_.add);

Maybe.of({name: &quot;Stark&quot;})
    .map(_.prop(&quot;age&quot;))
    .map(add(10));
//=> Maybe(null)

Maybe.of({name: &quot;Stark&quot;, age: 21})
    .map(_.prop(&quot;age&quot;))
    .map(add(10));
//=> Maybe(31)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Maybe = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">this</span>.__value = x;
}

Maybe.of = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Maybe(x);
}

Maybe.prototype.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isNothing() ? Maybe.of(<span class="hljs-literal">null</span>) : Maybe.of(f(<span class="hljs-keyword">this</span>.__value));
}

Maybe.prototype.isNothing = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.__value === <span class="hljs-literal">null</span> || <span class="hljs-keyword">this</span>.__value === <span class="hljs-literal">undefined</span>);
}

<span class="hljs-comment">//试试看</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
<span class="hljs-keyword">var</span> add = _.curry(_.add);

Maybe.of({<span class="hljs-attr">name</span>: <span class="hljs-string">"Stark"</span>})
    .map(_.prop(<span class="hljs-string">"age"</span>))
    .map(add(<span class="hljs-number">10</span>));
<span class="hljs-comment">//=&gt; Maybe(null)</span>

Maybe.of({<span class="hljs-attr">name</span>: <span class="hljs-string">"Stark"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>})
    .map(_.prop(<span class="hljs-string">"age"</span>))
    .map(add(<span class="hljs-number">10</span>));
<span class="hljs-comment">//=&gt; Maybe(31)</span>
</code></pre>
<p>看了这些代码，觉得链式调用总是要输入一堆 <code>.map(...)</code> 很烦对吧？这个问题很好解决，还记得我们上一篇文章里介绍的<strong>柯里化</strong>吗？</p>
<p>有了柯里化这个强大的工具，我们可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';
var compose = _.flowRight;
var add = _.curry(_.add);

// 创造一个柯里化的 map
var map = _.curry((f, functor) => functor.map(f));

var doEverything = map(compose(add(10), _.property(&quot;age&quot;)));

var functor = Maybe.of({name: &quot;Stark&quot;, age: 21});
doEverything(functor);
//=> Maybe(31)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
<span class="hljs-keyword">var</span> compose = _.flowRight;
<span class="hljs-keyword">var</span> add = _.curry(_.add);

<span class="hljs-comment">// 创造一个柯里化的 map</span>
<span class="hljs-keyword">var</span> map = _.curry(<span class="hljs-function">(<span class="hljs-params">f, functor</span>) =&gt;</span> functor.map(f));

<span class="hljs-keyword">var</span> doEverything = map(compose(add(<span class="hljs-number">10</span>), _.property(<span class="hljs-string">"age"</span>)));

<span class="hljs-keyword">var</span> functor = Maybe.of({<span class="hljs-attr">name</span>: <span class="hljs-string">"Stark"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>});
doEverything(functor);
<span class="hljs-comment">//=&gt; Maybe(31)</span></code></pre>
<h2 id="articleHeader2">二、错误处理、Either</h2>
<p>现在我们的容器能做的事情太少了，它甚至连做简单的错误处理都做不到，现在我们只能类似这样处理错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try{
    doSomething();
}catch(e){
    // 错误处理
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span>{
    doSomething();
}<span class="hljs-keyword">catch</span>(e){
    <span class="hljs-comment">// 错误处理</span>
}</code></pre>
<p><code>try/catch/throw</code> 并不是“纯”的，因为它从外部接管了我们的函数，并且在这个函数出错时抛弃了它的返回值。这不是我们期望的函数式的行为。</p>
<p>如果你对 <code>Promise</code> 熟悉的话应该还记得，<code>Promise</code> 是可以调用 <code>catch</code> 来集中处理错误的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doSomething()
    .then(async1)
    .then(async2)
    .catch(e => console.log(e));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">doSomething()
    .then(async1)
    .then(async2)
    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e));</code></pre>
<p>对于函数式编程我们也可以做同样的操作，如果运行正确，那么就返回正确的结果；如果错误，就返回一个用于描述错误的结果。这个概念在 Haskell 中称之为 <code>Either</code> 类，<code>Left</code> 和 <code>Right</code> 是它的两个子类。我们用 JS 来实现一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里是一样的=。=
var Left = function(x) {
  this.__value = x;
}
var Right = function(x) {
  this.__value = x;
}

// 这里也是一样的=。=
Left.of = function(x) {
  return new Left(x);
}
Right.of = function(x) {
  return new Right(x);
}

// 这里不同！！！
Left.prototype.map = function(f) {
  return this;
}
Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 这里是一样的=。=</span>
<span class="hljs-keyword">var</span> Left = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">this</span>.__value = x;
}
<span class="hljs-keyword">var</span> Right = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">this</span>.__value = x;
}

<span class="hljs-comment">// 这里也是一样的=。=</span>
Left.of = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Left(x);
}
Right.of = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Right(x);
}

<span class="hljs-comment">// 这里不同！！！</span>
Left.prototype.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
Right.prototype.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>) </span>{
  <span class="hljs-keyword">return</span> Right.of(f(<span class="hljs-keyword">this</span>.__value));
}</code></pre>
<p>下面来看看 <code>Left</code> 和 <code>Right</code> 的区别吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Right.of(&quot;Hello&quot;).map(str => str + &quot; World!&quot;);
// Right(&quot;Hello World!&quot;)

Left.of(&quot;Hello&quot;).map(str => str + &quot; World!&quot;);
// Left(&quot;Hello&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Right.of(<span class="hljs-string">"Hello"</span>).map(<span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str + <span class="hljs-string">" World!"</span>);
<span class="hljs-comment">// Right("Hello World!")</span>

Left.of(<span class="hljs-string">"Hello"</span>).map(<span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str + <span class="hljs-string">" World!"</span>);
<span class="hljs-comment">// Left("Hello")</span></code></pre>
<p><code>Left</code> 和 <code>Right</code> 唯一的区别就在于 <code>map</code> 方法的实现，<code>Right.map</code> 的行为和我们之前提到的 <code>map</code> 函数一样。但是 <code>Left.map</code> 就很不同了：<strong>它不会对容器做任何事情，只是很简单地把这个容器拿进来又扔出去。这个特性意味着，<code>Left</code> 可以用来传递一个错误消息。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getAge = user => user.age ? Right.of(user.age) : Left.of(&quot;ERROR!&quot;);

//试试
getAge({name: 'stark', age: '21'}).map(age => 'Age is ' + age);
//=> Right('Age is 21')

getAge({name: 'stark'}).map(age => 'Age is ' + age);
//=> Left('ERROR!')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> getAge = <span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> user.age ? Right.of(user.age) : Left.of(<span class="hljs-string">"ERROR!"</span>);

<span class="hljs-comment">//试试</span>
getAge({<span class="hljs-attr">name</span>: <span class="hljs-string">'stark'</span>, <span class="hljs-attr">age</span>: <span class="hljs-string">'21'</span>}).map(<span class="hljs-function"><span class="hljs-params">age</span> =&gt;</span> <span class="hljs-string">'Age is '</span> + age);
<span class="hljs-comment">//=&gt; Right('Age is 21')</span>

getAge({<span class="hljs-attr">name</span>: <span class="hljs-string">'stark'</span>}).map(<span class="hljs-function"><span class="hljs-params">age</span> =&gt;</span> <span class="hljs-string">'Age is '</span> + age);
<span class="hljs-comment">//=&gt; Left('ERROR!')</span></code></pre>
<p>是的，<code>Left</code> 可以让调用链中任意一环的错误立刻返回到调用链的尾部，这给我们错误处理带来了很大的方便，再也不用一层又一层的 <code>try/catch</code>。</p>
<p><code>Left</code> 和 <code>Right</code> 是 <code>Either</code> 类的两个子类，事实上 <code>Either</code> 并不只是用来做错误处理的，它表示了逻辑或，范畴学里的 <strong>coproduct</strong>。但这些超出了我们的讨论范围。</p>
<h2 id="articleHeader3">三、IO</h2>
<p>下面我们的程序要走出象牙塔，去接触外面“肮脏”的世界了，在这个世界里，很多事情都是有副作用的或者依赖于外部环境的，比如下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readLocalStorage(){
    return window.localStorage;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readLocalStorage</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.localStorage;
}</code></pre>
<p>这个函数显然不是纯函数，因为它强依赖外部的 <code>window.localStorage</code> 这个对象，它的返回值会随着环境的变化而变化。为了让它“纯”起来，我们可以把它包裹在一个函数内部，延迟执行它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readLocalStorage(){
    return function(){
        return window.localStorage;   
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readLocalStorage</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.localStorage;   
    }
}</code></pre>
<p>这样 <code>readLocalStorage</code> 就变成了一个真正的纯函数！ OvO为机智的程序员鼓掌！</p>
<p>额……好吧……好像确实没什么卵用……我们只是（像大多数拖延症晚期患者那样）把讨厌做的事情暂时搁置了而已。为了能彻底解决这些讨厌的事情，我们需要一个叫 <code>IO</code> 的新的 Functor：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';
var compose = _.flowRight;

var IO = function(f) {
    this.__value = f;
}

IO.of = x => new IO(_ => x);

IO.prototype.map = function(f) {
    return new IO(compose(f, this.__value))
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
<span class="hljs-keyword">var</span> compose = _.flowRight;

<span class="hljs-keyword">var</span> IO = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">this</span>.__value = f;
}

IO.of = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-keyword">new</span> IO(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> x);

IO.prototype.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> IO(compose(f, <span class="hljs-keyword">this</span>.__value))
};</code></pre>
<p><code>IO</code> 跟前面那几个 functor 不同的地方在于，它的 <code>__value</code> 是一个函数。它把不纯的操作（比如 IO、网络请求、DOM）包裹到一个函数内，从而延迟这个操作的执行。所以我们认为，<strong>IO 包含的是被包裹的操作的返回值</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var io_document = new IO(_ => window.document);

io_document.map(function(doc){ return doc.title });
//=> IO(document.title)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> io_document = <span class="hljs-keyword">new</span> IO(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">window</span>.document);

io_document.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">doc</span>)</span>{ <span class="hljs-keyword">return</span> doc.title });
<span class="hljs-comment">//=&gt; IO(document.title)</span></code></pre>
<p>注意我们这里虽然感觉上返回了一个实际的值 <code>IO(document.title)</code>，但事实上只是一个对象：<code>{ __value: [Function] }</code>，它并没有执行，而是简单地把我们想要的操作存了起来，只有当我们在真的需要这个值得时候，IO 才会真的开始求值，这个特性我们称之为 <strong>惰性求值</strong>。（培提尔其乌斯：“这是怠惰啊！”）</p>
<p>是的，我们依然需要某种方法让 IO 开始求值，并且把它返回给我们。它可能因为 <code>map</code> 的调用链积累了很多很多不纯的操作，一旦开始求值，就可能会把本来很干净的程序给“弄脏”。但是去直接执行这些“脏”操作不同，我们把这些不纯的操作带来的复杂性和不可维护性推到了 IO 的调用者身上（嗯就是这么不负责任）。</p>
<p>下面我们来做稍微复杂点的事情，编写一个函数，从当前 url 中解析出对应的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';

// 先来几个基础函数：
// 字符串
var split = _.curry((char, str) => str.split(char));
// 数组
var first = arr => arr[0];
var last = arr => arr[arr.length - 1];
var filter = _.curry((f, arr) => arr.filter(f));
//注意这里的 x 既可以是数组，也可以是 functor
var map = _.curry((f, x) => x.map(f)); 
// 判断
var eq = _.curry((x, y) => x == y);
// 结合
var compose = _.flowRight;


var toPairs = compose(map(split('=')), split('&amp;'));
// toPairs('a=1&amp;b=2')
//=> [['a', '1'], ['b', '2']]

var params = compose(toPairs, last, split('?'));
// params('http://xxx.com?a=1&amp;b=2')
//=> [['a', '1'], ['b', '2']]

// 这里会有些难懂=。= 慢慢看
// 1.首先我们先对 url 调用 params 函数，得到类似[['a', '1'], ['b', '2']]
//   这样的数组；
// 2.然后调用 filter(compose(eq(key), first))，这是一个过滤器，过滤的
//   条件是 compose(eq(key), first) 为真，它的意思就是只留下首项为 key
//   的数组；
// 3.最后调用 Maybe.of，把它包装起来。
// 4.这一系列的调用是针对 IO 的，所以我们用 map 把这些调用封装起来。
var getParam = key => map(compose(Maybe.of, filter(compose(eq(key), first)), params));

// 创建充满了洪荒之力的 IO！！！
var url = new IO(_ => window.location.href);
// 最终的调用函数！！！
var findParam = getParam(url);

// 上面的代码都是很干净的纯函数，下面我们来对它求值，求值的过程是非纯的。
// 假设现在的 url 是 http://xxx.com?a=1&amp;b=2
// 调用 __value() 来运行它！
findParam(&quot;a&quot;).__value();
//=> Maybe(['a', '1'])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-comment">// 先来几个基础函数：</span>
<span class="hljs-comment">// 字符串</span>
<span class="hljs-keyword">var</span> split = _.curry(<span class="hljs-function">(<span class="hljs-params">char, str</span>) =&gt;</span> str.split(char));
<span class="hljs-comment">// 数组</span>
<span class="hljs-keyword">var</span> first = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> last = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr[arr.length - <span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> filter = _.curry(<span class="hljs-function">(<span class="hljs-params">f, arr</span>) =&gt;</span> arr.filter(f));
<span class="hljs-comment">//注意这里的 x 既可以是数组，也可以是 functor</span>
<span class="hljs-keyword">var</span> map = _.curry(<span class="hljs-function">(<span class="hljs-params">f, x</span>) =&gt;</span> x.map(f)); 
<span class="hljs-comment">// 判断</span>
<span class="hljs-keyword">var</span> eq = _.curry(<span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> x == y);
<span class="hljs-comment">// 结合</span>
<span class="hljs-keyword">var</span> compose = _.flowRight;


<span class="hljs-keyword">var</span> toPairs = compose(map(split(<span class="hljs-string">'='</span>)), split(<span class="hljs-string">'&amp;'</span>));
<span class="hljs-comment">// toPairs('a=1&amp;b=2')</span>
<span class="hljs-comment">//=&gt; [['a', '1'], ['b', '2']]</span>

<span class="hljs-keyword">var</span> params = compose(toPairs, last, split(<span class="hljs-string">'?'</span>));
<span class="hljs-comment">// params('http://xxx.com?a=1&amp;b=2')</span>
<span class="hljs-comment">//=&gt; [['a', '1'], ['b', '2']]</span>

<span class="hljs-comment">// 这里会有些难懂=。= 慢慢看</span>
<span class="hljs-comment">// 1.首先我们先对 url 调用 params 函数，得到类似[['a', '1'], ['b', '2']]</span>
<span class="hljs-comment">//   这样的数组；</span>
<span class="hljs-comment">// 2.然后调用 filter(compose(eq(key), first))，这是一个过滤器，过滤的</span>
<span class="hljs-comment">//   条件是 compose(eq(key), first) 为真，它的意思就是只留下首项为 key</span>
<span class="hljs-comment">//   的数组；</span>
<span class="hljs-comment">// 3.最后调用 Maybe.of，把它包装起来。</span>
<span class="hljs-comment">// 4.这一系列的调用是针对 IO 的，所以我们用 map 把这些调用封装起来。</span>
<span class="hljs-keyword">var</span> getParam = <span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> map(compose(Maybe.of, filter(compose(eq(key), first)), params));

<span class="hljs-comment">// 创建充满了洪荒之力的 IO！！！</span>
<span class="hljs-keyword">var</span> url = <span class="hljs-keyword">new</span> IO(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">window</span>.location.href);
<span class="hljs-comment">// 最终的调用函数！！！</span>
<span class="hljs-keyword">var</span> findParam = getParam(url);

<span class="hljs-comment">// 上面的代码都是很干净的纯函数，下面我们来对它求值，求值的过程是非纯的。</span>
<span class="hljs-comment">// 假设现在的 url 是 http://xxx.com?a=1&amp;b=2</span>
<span class="hljs-comment">// 调用 __value() 来运行它！</span>
findParam(<span class="hljs-string">"a"</span>).__value();
<span class="hljs-comment">//=&gt; Maybe(['a', '1'])</span></code></pre>
<h2 id="articleHeader4">四、总结</h2>
<p>如果你还能坚持看到这里的话，不管看没看懂，已经是勇士了。在这篇文章里，我们先后提到了 <code>Maybe</code>、<code>Either</code>、<code>IO</code> 这三种强大的 functor，在链式调用、惰性求值、错误捕获、输入输出中都发挥着巨大的作用。事实上 functor 远不止这三种，但由于篇幅的问题就不再继续介绍了（哼才不告诉你其实是因为我还没看懂其它 functor 的原理）</p>
<p>但依然有问题困扰着我们：</p>
<ol>
<li><p>如何处理嵌套的 functor 呢？（比如 <code>Maybe(IO(42))</code>）</p></li>
<li><p>如何处理一个由非纯的或者异步的操作序列呢？</p></li>
</ol>
<p>在这个充满了容器和 functor 的世界里，我们手上的工具还不够多，函数式编程的学习还远远没有结束，在下一篇文章里会讲到 Monad 这个神奇的东西（然而我也不知道啥时候写下一篇，估计等到实习考核后吧OvO）。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript函数式编程（二）

## 原文链接
[https://segmentfault.com/a/1190000006219749](https://segmentfault.com/a/1190000006219749)


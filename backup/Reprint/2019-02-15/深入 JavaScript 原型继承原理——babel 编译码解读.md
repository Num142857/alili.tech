---
title: '深入 JavaScript 原型继承原理——babel 编译码解读' 
date: 2019-02-15 2:30:44
hidden: true
slug: bqajfm13th4
categories: [reprint]
---

{{< raw >}}

                    
<p>在[上一篇文章][]中，我们提到 ES6 的 <code>class</code> 语法糖是个近乎完美的方案，并且讲解了实现继承的许多内部机制，如 <code>prototype</code>/<code>__proto__</code>/<code>constructor</code> 等等。这篇，我们就以实际的 babel 代码为例子，来验证上节所言不虚。此外，本文还解释了 React 组件中你需要 <code>bind</code> 一下类方法的原理所在。</p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>无继承——简单的 <code>class</code> + 字段声明</li>
<li>无继承——简单的 <code>class</code> + 方法声明</li>
<li>简单继承——一层继承 + 字段覆盖</li>
<li>无继承——静态函数</li>
<li>无继承——静态变量</li>
<li>神秘的类 arrow function</li>
</ul>
<h2 id="articleHeader1">无继承——简单的 <code>class</code> + 字段声明</h2>
<p>先来看个最简单的例子，我们仅仅使用了 <code>class</code> 关键字并定义了一个变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  constructor(name) {
    this.name = name || 'Kat'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Kat'</span>
  }
}</code></pre>
<p>最后 <a href="https://babeljs.io/repl/#?babili=false&amp;browsers=&amp;build=&amp;builtIns=false&amp;spec=false&amp;loose=false&amp;code_lz=Q&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=true&amp;fileSize=false&amp;timeTravel=false&amp;sourceType=module&amp;lineWrap=true&amp;presets=es2015%2Ces2017%2Creact%2Cstage-0%2Cstage-3&amp;prettier=false&amp;targets=&amp;version=6.26.0&amp;envVersion=" rel="nofollow noreferrer" target="_blank">babel 编译出来</a>的代码如下。这里笔者用的是 Babel 6 的稳定版 6.26，不同版本编译出来可能有差异，但不至于有大的结构变动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Animal = function Animal(name) {
  _classCallCheck(this, Animal)

  this.name = name || 'Kat'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
  <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot call a class as a function'</span>)
  }
}

<span class="hljs-keyword">var</span> Animal = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  _classCallCheck(<span class="hljs-keyword">this</span>, Animal)

  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Kat'</span>
}</code></pre>
<p>确实十分简单，对吧。这段代码值得留意的点有两个：</p>
<p>一个是，使用 <code>class</code> 声明的 <code>Animal</code> 最后其实是被编译为一个函数。证明 <code>class</code> 跟类没关系，只是个语法糖。</p>
<p>另一个地方是，编译器帮我们插入了一个 <code>_classCallCheck</code> 函数调用，它会检查你有没有用 <code>new Animal()</code> 操作符来初始化这个函数。若有，则 <code>this</code> 会是被实例化的 <code>Animal</code> 对象，自然能通过 <code>animal instanceof Animal</code> 检查；若是直接调用函数，<code>this</code> 会被初始化为全局对象，自然不会是 <code>Animal</code> 实例，从而抛出运行时错误。这个检查，正解决了[上一篇文章][]提到的问题：如果忘记使用 <code>new</code> 去调用一个被设计构造函数的函数，没有任何运行时错误的毛病。</p>
<h2 id="articleHeader2">无继承——简单的 <code>class</code> + 方法声明</h2>
<p>让我们再扩展一下例子，给它加两个方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  constructor(name) {
    this.name = name || 'Kat'
  }

  move() {}
  getName() {
    return this.name
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Kat'</span>
  }

  move() {}
  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Animal = (function() {
  function Animal(name) {
    _classCallCheck(this, Animal)

    this.name = name || 'Kat'
  }

  _createClass(Animal, [
    {
      key: 'move',
      value: function move() {},
    },
    {
      key: 'getName',
      value: function getName() {
        return this.name
      },
    },
  ])

  return Animal
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-keyword">var</span> _createClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
      <span class="hljs-keyword">var</span> descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>
      descriptor.configurable = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-string">'value'</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>
      <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor)
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
    <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps)
    <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps)
    <span class="hljs-keyword">return</span> Constructor
  }
})()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
  <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot call a class as a function'</span>)
  }
}

<span class="hljs-keyword">var</span> Animal = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Animal)

    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Kat'</span>
  }

  _createClass(Animal, [
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'move'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>) </span>{},
    },
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'getName'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
      },
    },
  ])

  <span class="hljs-keyword">return</span> Animal
})()</code></pre>
<p>例子长了不少，但其实主要的变化只有两个：一是 <code>Animal</code> 被包了一层而不是直接返回；二是新增的方法 <code>move</code> 和 <code>getName</code> 是通过一个 <code>_createClass()</code> 方法来实现的。它将两个方法以 <code>key</code>/<code>value</code> 的形式作为数组传入，看起来，是要把它们设置到 <code>Animal</code> 的原型链上面，以便后续继承之用。</p>
<p>为啥 <code>Animal</code> 被包了一层呢，这是个好问题，但答案我们将留到后文揭晓。现在，我们先看一下这个长长的 <code>_createClass</code> 实现是什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _createClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
      <span class="hljs-keyword">var</span> descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>
      descriptor.configurable = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-string">'value'</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>
      <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor)
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
    <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps)
    <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps)
    <span class="hljs-keyword">return</span> Constructor
  }
})()</code></pre>
<p>它是个立即执行函数，执行又返回了另一个函数。说明啥，一定用了闭包，说明里面要封装些「私有」变量，那就是 <code>defineProperties</code> 这个函数。这很好，一是这个函数只会生成一次，二是明确了这个函数只与 <code>_createClass</code> 这个事情相关。</p>
<p>再细看这个返回的函数，接受 <code>Constructor</code>、<code>protoProps</code> 和 <code>staticProps</code> 三个参数。<code>staticProps</code> 我们暂时不会用到，回头再讲；我们传入的数组是通过 <code>protoProps</code> 接受的。接下来，看一下 <code>defineProperties</code> 做了啥事。</p>
<p>它将每一个传进来的 props 做了如下处理：分别设置了他们的 <code>enumerable</code>、<code>configurable</code>、<code>writable</code> 属性。而传进来的 <code>target</code> 是 <code>Animal.prototype</code>，相当于，这个函数最后的执行效果会是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    // 前面处理其实得到这样这个 descriptor 对象：
    var descriptor = {
      ...props[i],
      enumerable: false,
      configurable: true,
      writable: true,
    }
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
    <span class="hljs-comment">// 前面处理其实得到这样这个 descriptor 对象：</span>
    <span class="hljs-keyword">var</span> descriptor = {
      ...props[i],
      <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
    }
    <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor)
  }
}</code></pre>
<p>看到这里就很明白了，它就是把你定义的 <code>move</code>、<code>getName</code> 方法通过 <code>Object.defineProperty</code> 方法设置到 <code>Animal.prototype</code> 上去。<a href="https://blog.linesh.tw/#/post/2018-10-18-javascript-prototypal-inheritance" rel="nofollow noreferrer" target="_blank">前面</a>我们说过，<code>prototype</code> 是用来存储公共属性的。也就是说，这两个方法在你使用继承的时候，可以被子对象通过原型链上溯访问到。也就是说，我们这个小小的例子里，声明的两个方法已经具备了继承能力了。</p>
<p>至于 <code>enumerable</code>、<code>configurable</code>、<code>writable</code> 属性是什么东西呢，查一下<a href="https://www.ecma-international.org/ecma-262/6.0/#sec-property-attributes" rel="nofollow noreferrer" target="_blank">语言规范</a>就知道了。简单来说，<code>writable</code> 为 <code>false</code> 时，其值不能通过 <code>setter</code> 改变；<code>enumerable</code> 为 <code>false</code> 时，不能出现在 <code>for-in</code> 循环中。当然，这里是粗浅的理解，暂时不是这篇文章的重点。</p>
<h2 id="articleHeader3">简单继承——一层继承 + 字段覆盖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  constructor(name) {
    this.name = name || 'Kat'
  }
}

class Tiger extends Animal {
  constructor(name, type) {
    super(name)
    this.type = type || 'Paper'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Kat'</span>
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tiger</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, type) {
    <span class="hljs-keyword">super</span>(name)
    <span class="hljs-keyword">this</span>.type = type || <span class="hljs-string">'Paper'</span>
  }
}</code></pre>
<p>加一层继承和字段覆盖能看到啥东西呢？能看到继承底下的实现机制是怎么样的，以及它的 <code>constructor</code> 和 <code>__proto__</code> 属性将如何被正确设置。带着这两个问题，我们一起来看下编译后的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      &quot;this hasn't been initialised - super() hasn't been called&quot;
    )
  }
  return call &amp;&amp; (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' &amp;&amp; superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Animal = function Animal(name) {
  _classCallCheck(this, Animal)

  this.name = name || 'Kat'
}

var Tiger = (function(_Animal) {
  _inherits(Tiger, _Animal)

  function Tiger(name, type) {
    _classCallCheck(this, Tiger)

    var _this = _possibleConstructorReturn(
      this,
      (Tiger.__proto__ || Object.getPrototypeOf(Tiger)).call(this, name)
    )

    _this.type = type || 'Paper'
    return _this
  }

  return Tiger
})(Animal)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{
  <span class="hljs-keyword">if</span> (!self) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(
      <span class="hljs-string">"this hasn't been initialised - super() hasn't been called"</span>
    )
  }
  <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">'function'</span>)
    ? call
    : self
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">'function'</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(
      <span class="hljs-string">'Super expression must either be null or a function, not '</span> +
        <span class="hljs-keyword">typeof</span> superClass
    )
  }
  subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, {
    <span class="hljs-attr">constructor</span>: {
      <span class="hljs-attr">value</span>: subClass,
      <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    },
  })
  <span class="hljs-keyword">if</span> (superClass)
    <span class="hljs-built_in">Object</span>.setPrototypeOf
      ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
  <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot call a class as a function'</span>)
  }
}

<span class="hljs-keyword">var</span> Animal = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  _classCallCheck(<span class="hljs-keyword">this</span>, Animal)

  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Kat'</span>
}

<span class="hljs-keyword">var</span> Tiger = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_Animal</span>) </span>{
  _inherits(Tiger, _Animal)

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Tiger</span>(<span class="hljs-params">name, type</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Tiger)

    <span class="hljs-keyword">var</span> _this = _possibleConstructorReturn(
      <span class="hljs-keyword">this</span>,
      (Tiger.__proto__ || <span class="hljs-built_in">Object</span>.getPrototypeOf(Tiger)).call(<span class="hljs-keyword">this</span>, name)
    )

    _this.type = type || <span class="hljs-string">'Paper'</span>
    <span class="hljs-keyword">return</span> _this
  }

  <span class="hljs-keyword">return</span> Tiger
})(Animal)</code></pre>
<p>相比无继承的代码，这里主要增加了几个函数。<code>_possibleConstructorReturn</code> 顾名思义，可能不是很重要，回头再读。精华在 <code>_inherits(Tiger, Animal)</code> 这个函数，我们按顺序来读一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' &amp;&amp; superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">'function'</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(
      <span class="hljs-string">'Super expression must either be null or a function, not '</span> +
        <span class="hljs-keyword">typeof</span> superClass
    )
  }
  subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, {
    <span class="hljs-attr">constructor</span>: {
      <span class="hljs-attr">value</span>: subClass,
      <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    },
  })
  <span class="hljs-keyword">if</span> (superClass)
    <span class="hljs-built_in">Object</span>.setPrototypeOf
      ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}</code></pre>
<p>首先是一段异常处理，简单地检查了 <code>superClass</code> 要么是个函数，要么得是个 null。也就是说，如果你这样写那是不行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Something = 'not-a-function'
class Animal extends Something {}
// Error: Super expression must either be null or a function, not string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Something = <span class="hljs-string">'not-a-function'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Something</span> </span>{}
<span class="hljs-comment">// Error: Super expression must either be null or a function, not string</span></code></pre>
<p>接下来这句代码将 <code>prototype</code> 和 <code>constructor</code> 一并设置到位，是精华。注意，这个地方留个问题：为什么要用 <code>Object.create(superClass.prototype)</code>，而不是直接这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) {
  subClass.prototype = superClass &amp;&amp; superClass.prototype
  subClass.prototype.constructor = { ... }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
  subClass.prototype = superClass &amp;&amp; superClass.prototype
  subClass.prototype.constructor = { ... }
}</code></pre>
<p>很明显，是为了避免任何对 <code>subClass.prototype</code> 的修改影响到 <code>superClass.prototype</code>。使用 <code>Object.create(asPrototype)</code> 出来的对象，其实上是将 <code>subClass.prototype.__proto__ = superClass.prototype</code>，这样 <code>subClass</code> 也就继承了 <code>superClass</code>，可以达到这样两个目的：</p>
<ol>
<li>
<code>superClass.prototype</code> 原型上发生的修改都能实时反映到 <code>subClass</code> 的实例上</li>
<li>
<code>subClass.prototype</code> 上的任何修改不会影响到 <code>superClass.prototype</code>
</li>
</ol>
<p>最后，如果 <code>superClass</code> 不为空，那么将 <code>subClass.__proto__</code> 设置为 <code>superClass</code>。这是为了继承 <code>superClass</code> 的静态方法和属性。如以下的例子中，<code>Cat.TYPE</code> 能获取到 <code>Animal.TYPE</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  static TYPE = 'PAPER'
  static createTyping() {
    return Animal.TYPE
  }
}

class Cat extends Animal {}

console.log(Cat.TYPE)           // PAPER
console.log(Cat.createTyping()) // PAPER" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">static</span> TYPE = <span class="hljs-string">'PAPER'</span>
  <span class="hljs-keyword">static</span> createTyping() {
    <span class="hljs-keyword">return</span> Animal.TYPE
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{}

<span class="hljs-built_in">console</span>.log(Cat.TYPE)           <span class="hljs-comment">// PAPER</span>
<span class="hljs-built_in">console</span>.log(Cat.createTyping()) <span class="hljs-comment">// PAPER</span></code></pre>
<p>至此，一个简单的继承就完成了。在使用了 <code>extends</code> 关键字后，实际上背后发生的事情是：</p>
<ul>
<li>子「类」<code>prototype</code> 上的 <code>__proto__</code> 被正确设置，指向父「类」的 <code>prototype</code>: <code>subClass.prototype = { __proto__: superClass.prototype }</code>
</li>
<li>子「类」<code>prototype</code> 上的 <code>constructor</code> 被正确初始化，这样 <code>instanceof</code> 关系能得到正确结果</li>
<li>子「类」的 <code>__proto__</code> 被指向父「类」，这样父「类」上的静态字段和方法能被子「类」继承</li>
</ul>
<p>好，要点看完了。后面内容跟继承关系不大，但既然源码扒都扒了，我们不妨继续深入探索一些场景：</p>
<h2 id="articleHeader4">无继承——静态函数</h2>
<p>看一个简单的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  static create() {
    return new Animal()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">static</span> create() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Animal()
  }
}</code></pre>
<p>首先要知道，这个「静态」同样不是强类型类继承语言里有的「静态」的概念。所谓静态，就是说它跟实例是没关系的，而跟「类」本身有关系。比如，你可以这样调用：<code>Animal.create()</code>，但不能这样用：<code>new Animal().create</code>。什么场景下会用到这种模式呢？比如说：</p>
<ul>
<li>工厂模式或单例模式</li>
<li>
<code>Object.create</code>、<code>Object.keys</code> 等常用方法</li>
</ul>
<p>既然只有通过构造函数本身去调用，而不能通过实例来调用，期望它们被绑定到函数本身上似乎很自然。我们来看看上面这段代码将被如何编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Animal = (function() {
  function Animal() {
    _classCallCheck(this, Animal)
  }

  _createClass(Animal, null, [
    {
      key: 'create',
      value: function create() {},
    },
  ])

  return Animal
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-keyword">var</span> _createClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
      <span class="hljs-keyword">var</span> descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>
      descriptor.configurable = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-string">'value'</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>
      <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor)
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
    <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps)
    <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps)
    <span class="hljs-keyword">return</span> Constructor
  }
})()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
  <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot call a class as a function'</span>)
  }
}

<span class="hljs-keyword">var</span> Animal = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Animal)
  }

  _createClass(Animal, <span class="hljs-literal">null</span>, [
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'create'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params"></span>) </span>{},
    },
  ])

  <span class="hljs-keyword">return</span> Animal
})()</code></pre>
<p>熟悉的函数，熟悉的配方。与本文的第二个例子相比，仅有一个地方的不同：<code>create</code> 方法是作为 <code>_createClass</code> 方法的第三个参数被传入的，这正是我们上文提到的 <code>staticProps</code> 参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _createClass = (function() {
  function defineProperties(target, props) { ... }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

_createClass(Animal, null, [
  {
    key: 'create',
    value: function create() {},
  },
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _createClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{ ... }

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
    <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps)
    <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps)
    <span class="hljs-keyword">return</span> Constructor
  }
})()

_createClass(Animal, <span class="hljs-literal">null</span>, [
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">'create'</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params"></span>) </span>{},
  },
])</code></pre>
<p>可以看见，<code>create</code> 方法是直接被创建到 <code>Animal</code> 上的：<code>defineProperties(Animal, [{ key: 'create', value: function() {} }])</code>，最终会将函数赋给 <code>Animal.create</code>。我们的猜测并没有错误。</p>
<h2 id="articleHeader5">无继承——静态变量</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Tiger {
  static TYPE = 'REAL'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tiger</span> </span>{
  <span class="hljs-keyword">static</span> TYPE = <span class="hljs-string">'REAL'</span>
}</code></pre>
<p>还有个小例子。如果是静态变量的话，同样因为不希望在实例对象上所使用，我们会看到编译出来的代码中它是直接被设置到函数上。代码已经很熟悉，不必再讲。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Tiger = function Tiger() {
  _classCallCheck(this, Tiger)
}

Tiger.TYPE = 'REAL'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
  <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot call a class as a function'</span>)
  }
}

<span class="hljs-keyword">var</span> Tiger = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Tiger</span>(<span class="hljs-params"></span>) </span>{
  _classCallCheck(<span class="hljs-keyword">this</span>, Tiger)
}

Tiger.TYPE = <span class="hljs-string">'REAL'</span></code></pre>
<p>有趣的是，静态变量会不会被「子类」继承呢？这个可请读者自己做个实验，验证验证。</p>
<h2 id="articleHeader6">神秘的类 arrow function</h2>
<p>写 React 的东西，一定遇见过这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends React.Component {
  constructor() {
    super()
    this.state = {
      isToggleOn: true,
    }
    // 画重点 👇👇👇👇👇👇👇👇👇👇👇👇
    // this.toggleButton = this.toggleButton.bind(this)
  }

  static propTypes = {
    text: PropTypes.string,
  }

  // ❌❌❌ Uncaught TypeError: this.setState is not a function
  toggleButton() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    })
  }

  render() {
    return <button onClick={this.toggleButton}>Toggle Me</button>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state = {
      isToggleOn: <span class="hljs-literal">true</span>,
    }
    <span class="hljs-comment">// 画重点 👇👇👇👇👇👇👇👇👇👇👇👇</span>
    <span class="hljs-comment">// this.toggleButton = this.toggleButton.bind(this)</span>
  }

  static propTypes = {
    text: <span class="hljs-type">PropTypes</span>.string,
  }

  <span class="hljs-comment">// ❌❌❌ Uncaught TypeError: this.setState is not a function</span>
  toggleButton() {
    <span class="hljs-keyword">this</span>.setState({
      isToggleOn: !<span class="hljs-keyword">this</span>.state.isToggleOn,
    })
  }

  render() {
    <span class="hljs-keyword">return</span> &lt;button onClick={<span class="hljs-keyword">this</span>.toggleButton}&gt;<span class="hljs-type">Toggle</span> <span class="hljs-type">Me</span>&lt;/button&gt;
  }
}</code></pre>
<p>为什么会有这个问题呢？因为你扔进去的 <code>this.toggleButton</code> 函数，在 <code>button</code> 内部一定是通过 <code>onClick()</code> 这样的方式来调用的，这样的话，<code>this</code> 引用就会丢失为 <code>undefined</code>，那么 <code>React.Component</code> 上的 <code>setState</code> 就调用不到。</p>
<p>可以直接去 React 官方示例看看：<a href="https://codepen.io/gaearon/pen/xEmzGg?editors=0010" rel="nofollow noreferrer" target="_blank">https://codepen.io/gaearon/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="gaearon/pen/xEmzGg" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends React.Component {
  ...

  // ✅✅✅ This will work!
  toggleButton = () => {
    this.setState({ ... })
  }

  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  ...

  <span class="hljs-comment">// ✅✅✅ This will work!</span>
  toggleButton = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({ ... })
  }

  ...
}</code></pre>
<p>解决方案呢，自然也有很多种，比如引用 <code>@autobind</code>、使用 ES7 的 <code>::this.toggleButton</code>、使用箭头函数等。比如上面 👆 这种最常用的解决方案。那么同学们有没有想过这个问题，为什么这样写 <code>this</code> 应用就可以正确拿到呢？「因为箭头函数将 <code>this</code> 绑定到词法作用域的上下文中了呀~」那谁来给我解释一下这句话呢？反正我是从来没理解过这个「外层」的作用域，应该是绑定到哪里。因此，只好另辟路径，直接看源码来理解这个写法的含义。</p>
<p>我写了个简单的例子，足以复现这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button {
  constructor() {
    this.value = 1
  }

  increment = () => {
    this.value += 2
  }

  render() {
    const onClick = this.increment
    onClick()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.value = <span class="hljs-number">1</span>
  }

  increment = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.value += <span class="hljs-number">2</span>
  }

  render() {
    <span class="hljs-keyword">const</span> onClick = <span class="hljs-keyword">this</span>.increment
    onClick()
  }
}</code></pre>
<p>当我们调用 <code>render()</code> 时，<code>increment()</code> 这样的调用方式会使 <code>this</code> 引用无法被初始化，这也正是我们传入的 <code>onClick</code> 在 React 中会被调用的方式。而上图的 <code>increment</code> 写法可以重新拯救失去的 <code>this</code> 引用！让我们来看看源代码，一探究竟。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

var _createClass = (function() {})()
function _classCallCheck(instance, Constructor) {}

var Button = (function() {
  function Button() {
    var _this = this

    _classCallCheck(this, Button)

    this.increment = function() {
      _this.value += 2
    }

    this.value = 1
  }

  _createClass(Button, [
    {
      key: 'render',
      value: function render() {
        var increment = this.increment
        increment()
      },
    },
  ])

  return Button
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-keyword">var</span> _createClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{})()
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{}

<span class="hljs-keyword">var</span> Button = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>

    _classCallCheck(<span class="hljs-keyword">this</span>, Button)

    <span class="hljs-keyword">this</span>.increment = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      _this.value += <span class="hljs-number">2</span>
    }

    <span class="hljs-keyword">this</span>.value = <span class="hljs-number">1</span>
  }

  _createClass(Button, [
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'render'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> increment = <span class="hljs-keyword">this</span>.increment
        increment()
      },
    },
  ])

  <span class="hljs-keyword">return</span> Button
})()</code></pre>
<p>我略去了大家耳熟能详的代码，只留下关键的部分。可以看到，编译后的代码中，<strong>对 <code>Button</code> 实例的 <code>this</code> 引用被闭包保存了下来</strong>！这种写法，与以前我们 <code>var that = this</code> 的写法是一致的，我也终于理解「不再需要 that 引用了」以及各种语焉不详的作用域啊最外层变量啊这些理论。其实，就是 <code>this</code> 引用会始终被绑定到构造函数上，而这底下是通过闭包实现的。只是把你以前手写的代码自动化生成而已。</p>
<p>在本文的第二个例子中，我们留意到 <code>Animal()</code> 构造函数被额外包了一层，当时不得其解。看到这里，我们也许可以理解它的意图：就是为了将你在类中编写的箭头函数做个闭包，将 <code>this</code> 引用存储下来，以做后用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入 JavaScript 原型继承原理——babel 编译码解读

## 原文链接
[https://segmentfault.com/a/1190000016828714](https://segmentfault.com/a/1190000016828714)


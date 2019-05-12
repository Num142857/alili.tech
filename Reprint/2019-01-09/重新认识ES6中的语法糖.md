---
title: '重新认识ES6中的语法糖' 
date: 2019-01-09 2:30:11
hidden: true
slug: ooeky4znhld
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本文翻译自 Nicolas Bevacqua 的书籍 <a href="https://ponyfoo.com/books/practical-modern-javascript" rel="nofollow noreferrer" target="_blank">《Practical Modern JavaScript》</a>,这是该书的第二章。翻译采用意译，部分内容与原书有所不同。</p>
<p>本章翻译时我最大的收获有以下几点：</p>
<ul>
<li><p>对象字面量的简写属性和计算的属性名不可同时使用，原因是简写属性是一种在编译阶段的就会生效的语法糖，而计算的属性名则在运行时才生效；</p></li>
<li><p>箭头函数本身已经很简洁，但是还可以进一步简写；</p></li>
<li><p>解构也许确实可以理解为变量声明的一种语法糖，当涉及到多层解构时，其使用非常灵活；</p></li>
<li><p>学会了模板字符串的高级用法--标记模板字符串；</p></li>
<li><p><code>let</code>,<code>const</code>声明的变量同样存在变量提升，理解了TDZ机制</p></li>
</ul>
</blockquote>
<p><strong>以下为正文：</strong></p>
<hr>
<p>ES6为一些已有的功能提供了非破坏性更新，这类更新中的大部分我们可以理解为语法糖，称之为语法糖，意味着，这类新语法能做的事情其实用ES5也可以做，只是会稍微复杂一些。本章我们将着重讨论这些语法糖，看完之后，可能你会对一些你很熟悉的ES6新语法有不一样的理解。</p>
<h2 id="articleHeader0">对象字面量</h2>
<p><strong>对象字面量</strong>是指以<code>{}</code>形式直接表示的对象，比如下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var book = {
  title: 'Modular ES6',
  author: 'Nicolas',
  publisher: 'O´Reilly'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> book = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">'Modular ES6'</span>,
  <span class="hljs-attr">author</span>: <span class="hljs-string">'Nicolas'</span>,
  <span class="hljs-attr">publisher</span>: <span class="hljs-string">'O´Reilly'</span>
}</code></pre>
<p>ES6 为对象字面量的语法带来了一些改进：包括属性/方法的简洁表示，可计算的属性名等等，我们逐一来看：</p>
<h3 id="articleHeader1">属性的简洁表示法</h3>
<p>你有没有遇到过这种场景，一个我们声明的对象中包含若干属性，其属性值由变量表示，且变量名和属性名一样的。比如下面这样，我们想把一个名为 <code>listeners</code> 的数组赋值给<code>events</code>对象中的<code>listeners</code>属性，用ES5我们会这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var listeners = []
function listen() {}
var events = {
  listeners: listeners,
  listen: listen
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> listeners = []
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listen</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> events = {
  <span class="hljs-attr">listeners</span>: listeners,
  <span class="hljs-attr">listen</span>: listen
}</code></pre>
<p>ES6则允许我们简写成下面这种形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var listeners = []
function listen() {}
var events = { listeners, listen }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> listeners = []
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listen</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> events = { listeners, listen }</code></pre>
<p>怎么样，是不是感觉简洁了许多，使用对象字面量的简洁写法让我们在不影响语义的情况下减少了重复代码。</p>
<p>这是ES6带来的好处之一，它提供了众多更简洁，语义更清晰的语法，让我们的代码的可读性，可维护性大大提升。</p>
<h3 id="articleHeader2">可计算的属性名</h3>
<p>对象字面量的另一个重要更新是允许你使用可计算的属性名，在ES5中我们也可以给对象添加属性名为变量的属性，一般说来，我们要按下面方法这样做，首先声明一个名为<code>expertise</code>的变量，然后通过<code>person[expertise]</code>这种形式把变量添加为对象<code>person</code>的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expertise = 'journalism'
var person = {
  name: 'Sharon',
  age: 27
}
person[expertise] = {
  years: 5,
  interests: ['international', 'politics', 'internet']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> expertise = <span class="hljs-string">'journalism'</span>
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Sharon'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">27</span>
}
person[expertise] = {
  <span class="hljs-attr">years</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">interests</span>: [<span class="hljs-string">'international'</span>, <span class="hljs-string">'politics'</span>, <span class="hljs-string">'internet'</span>]
}</code></pre>
<p>ES6 中，对象字面量可以使用计算属性名了，把任何表达式放在中括号中，表达式的运算结果将会是对应的属性名，上面的代码，用ES6可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expertise = 'journalism'
var person = {
  name: 'Sharon',
  age: 27,
  [expertise]: {
    years: 5,
    interests: ['international', 'politics', 'internet']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> expertise = <span class="hljs-string">'journalism'</span>
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Sharon'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">27</span>,
  [expertise]: {
    <span class="hljs-attr">years</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">interests</span>: [<span class="hljs-string">'international'</span>, <span class="hljs-string">'politics'</span>, <span class="hljs-string">'internet'</span>]
  }
}</code></pre>
<p>不过需要注意的是，<strong>简写属性和计算的属性名不可同时使用</strong>。这是因为，简写属性是一种在编译阶段的就会生效的语法糖，而计算的属性名则在运行时才生效。如果你把二者混用，代码会报错。而且二者混用往往还会降低代码的可读性，所以JavaScript在语言层面上限制二者不能混用也是个好事。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expertise = 'journalism'
var journalism = {
  years: 5,
  interests: ['international', 'politics', 'internet']
}
var person = {
  name: 'Sharon',
  age: 27,
  [expertise] // 这里会报语法错误
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> expertise = <span class="hljs-string">'journalism'</span>
<span class="hljs-keyword">var</span> journalism = {
  <span class="hljs-attr">years</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">interests</span>: [<span class="hljs-string">'international'</span>, <span class="hljs-string">'politics'</span>, <span class="hljs-string">'internet'</span>]
}
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Sharon'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">27</span>,
  [expertise] <span class="hljs-comment">// 这里会报语法错误</span>
}</code></pre>
<p>遇到以下情景时，可计算的属性名会让我们的代码更简洁：</p>
<ol><li><p>某个新对象的属性引自另一个对象：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var grocery = {
  id: 'bananas',
  name: 'Bananas',
  units: 6,
  price: 10,
  currency: 'USD'
}
var groceries = {
  [grocery.id]: grocery
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> grocery = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">'bananas'</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Bananas'</span>,
  <span class="hljs-attr">units</span>: <span class="hljs-number">6</span>,
  <span class="hljs-attr">price</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">currency</span>: <span class="hljs-string">'USD'</span>
}
<span class="hljs-keyword">var</span> groceries = {
  [grocery.id]: grocery
}</code></pre>
<ol><li><p>需构建的对象的属性名来自函数参数。如果使用ES5来处理这种问题，我们需要先声明一个对象字面量，再动态的添加属性，再返回这个对象。下面的例子中，我们创建了一个响应Ajax请求的函数，这个函数的作用在于，请求失败时，返回的对象拥有一个名为<code>error</code>属性及对应的描述，请求成功时，该对象拥有一个名为<code>success</code>属性及对应的描述。</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5 写法
function getEnvelope(type, description) {
  var envelope = {
    data: {}
  }
  envelope[type] = description
  return envelope
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES5 写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEnvelope</span>(<span class="hljs-params">type, description</span>) </span>{
  <span class="hljs-keyword">var</span> envelope = {
    <span class="hljs-attr">data</span>: {}
  }
  envelope[type] = description
  <span class="hljs-keyword">return</span> envelope
}</code></pre>
<p>使用ES6提供的利用计算属性名，更简洁的实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6 写法
function getEnvelope(type, description) {
  return {
    data: {},
    [type]: description
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES6 写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEnvelope</span>(<span class="hljs-params">type, description</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">data</span>: {},
    [type]: description
  }
}</code></pre>
<p>对象字面量的属性可以简写，方法其实也是可以的。</p>
<h3 id="articleHeader3">方法定义</h3>
<p>我们先看看传统上如何定义对象方法，下述代码中，我们构建了一个事件发生器，其中的<code>on</code>方法用以注册事件，<code>emit</code>方法用以执行事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var emitter = {
  events: {},
  on: function (type, fn) {
    if (this.events[type] === undefined) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  },
  emit: function (type, event) {
    if (this.events[type] === undefined) {
      return
    }
    this.events[type].forEach(function (fn) {
      fn(event)
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> emitter = {
  <span class="hljs-attr">events</span>: {},
  <span class="hljs-attr">on</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, fn</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.events[type] === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">this</span>.events[type] = []
    }
    <span class="hljs-keyword">this</span>.events[type].push(fn)
  },
  <span class="hljs-attr">emit</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, event</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.events[type] === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">this</span>.events[type].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
      fn(event)
    })
  }
}</code></pre>
<p>ES6 的对象字面量方法简写允许我们省略对象方法的<code>function</code>关键字及之后的冒号，改写后的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var emitter = {
  events: {},
  on(type, fn) {
    if (this.events[type] === undefined) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  },
  emit(type, event) {
    if (this.events[type] === undefined) {
      return
    }
    this.events[type].forEach(function (fn) {
      fn(event)
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> emitter = {
  <span class="hljs-attr">events</span>: {},
  on(type, fn) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.events[type] === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">this</span>.events[type] = []
    }
    <span class="hljs-keyword">this</span>.events[type].push(fn)
  },
  emit(type, event) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.events[type] === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">this</span>.events[type].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
      fn(event)
    })
  }
}</code></pre>
<p>ES6中的箭头函数可谓大名鼎鼎了，它有一些特别的优点(关于<code>this</code>)，可能你和我一样，使用箭头函数很久了，不过有些细节我之前却一直不了解，比如箭头函数的几种简写形式及使用注意事项。</p>
<h2 id="articleHeader4">箭头函数</h2>
<p>JS中声明的普通函数，一般有函数名，一系列参数和函数体，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function name(parameters) {
  // function body
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">name</span>(<span class="hljs-params">parameters</span>) </span>{
  <span class="hljs-comment">// function body</span>
}</code></pre>
<p>普通匿名函数则没有函数名，匿名函数通常会被赋值给一个变量/属性，有时候还会被直接调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var example = function (parameters) {
  // function body
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> example = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parameters</span>) </span>{
  <span class="hljs-comment">// function body</span>
}</code></pre>
<p>ES6 为我们提供了一种写匿名函数的新方法，即箭头函数。箭头函数不需要使用<code>function</code>关键字，其参数和函数体之间以<code>=&gt;</code>相连接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var example = (parameters) => {
  // function body
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> example = <span class="hljs-function">(<span class="hljs-params">parameters</span>) =&gt;</span> {
  <span class="hljs-comment">// function body</span>
}</code></pre>
<p>尽管箭头函数看起来类似于传统的匿名函数，他们却具有根本性的不同：</p>
<ul>
<li><p>箭头函数不能被直接命名，不过允许它们赋值给一个变量；</p></li>
<li><p>箭头函数不能用做构造函数，你不能对箭头函数使用<code>new</code>关键字；</p></li>
<li><p>箭头函数也没有<code>prototype</code>属性；</p></li>
<li><p>箭头函数绑定了词法作用域，不会修改<code>this</code>的指向。</p></li>
</ul>
<p>最后一点是箭头函数最大的特点，我们来仔细看看。</p>
<h3 id="articleHeader5">词法作用域</h3>
<p>我们在箭头函数的函数体内使用的<code>this</code>,<code>arguments</code>,<code>super</code>等都指向包含箭头函数的上下文，箭头函数本身不产生新的上下文。下述代码中，我们创建了一个名为<code>timer</code>的对象，它的属性<code>seconds</code>用以计时，方法<code>start</code>用以开始计时，若我们在若干秒后调用<code>start</code>方法，将打印出当前的<code>seconds</code>值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
var timer = {
  seconds: 0,
  start() {
    setInterval(function(){
      this.seconds++
    }, 1000)
  }
}

timer.start()
setTimeout(function () {
  console.log(timer.seconds)
}, 3500)

> 0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES5</span>
<span class="hljs-keyword">var</span> timer = {
  <span class="hljs-attr">seconds</span>: <span class="hljs-number">0</span>,
  start() {
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">this</span>.seconds++
    }, <span class="hljs-number">1000</span>)
  }
}

timer.start()
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(timer.seconds)
}, <span class="hljs-number">3500</span>)

&gt; <span class="hljs-number">0</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
var timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++
    }, 1000)
  }
}

timer.start()
setTimeout(function () {
  console.log(timer.seconds)
}, 3500)
// <- 3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">var</span> timer = {
  <span class="hljs-attr">seconds</span>: <span class="hljs-number">0</span>,
  start() {
    setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.seconds++
    }, <span class="hljs-number">1000</span>)
  }
}

timer.start()
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(timer.seconds)
}, <span class="hljs-number">3500</span>)
<span class="hljs-comment">// &lt;- 3</span>
</code></pre>
<p>第一段代码中<code>start</code>方法使用的是常规的匿名函数定义，在调用时<code>this</code>将指向了<code>window</code>，<code>console</code>出的结果为<code>undefined</code>，想要让代码正常工作，我们需要在<code>start</code>方法开头处插入<code>var self = this</code>，然后替换匿名函数函数体中的<code>this</code>为<code>self</code>，第二段代码中，我们使用了箭头函数，就不会发生这种情况了。</p>
<p>还需要说明的是，箭头函数的作用域也不能通过<code>.call</code>,<code>.apply</code>,<code>.bind</code>等语法来改变，这使得箭头函数的上下文将永久不变。</p>
<p>我们再来看另外一个箭头函数与普通匿名函数的不同之处，你猜猜，下面的代码最终打印出的结果会是什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function puzzle() {
  return function () {
    console.log(arguments)
  }
}
puzzle('a', 'b', 'c')(1, 2, 3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">puzzle</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>)
  }
}
puzzle(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>)(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)</code></pre>
<p>答案是<code>1,2,3</code>，原因是对常规匿名函数而言，<code>arguments</code>指向匿名函数本身。</p>
<p>作为对比，我们看看下面这个例子，再猜猜，打印结果会是什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function puzzle() {
  return ()=>{
    console.log(arguments)
  }
}
puzzle('a', 'b', 'c')(1, 2, 3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">puzzle</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>)
  }
}
puzzle(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>)(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)</code></pre>
<p>答案是<code>a,b,c</code>,<strong>箭头函数的特殊性决定其本身没有<code>arguments</code>对象</strong>，这里的<code>arguments</code>其实是其父函数<code>puzzle</code>的。</p>
<p>前面我们提到过，箭头函数还可以简写，接下来我们一起看看。</p>
<h3 id="articleHeader6">简写的箭头函数</h3>
<p>完整的箭头函数是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var example = (parameters) => {
  // function body
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> example = <span class="hljs-function">(<span class="hljs-params">parameters</span>) =&gt;</span> {
  <span class="hljs-comment">// function body</span>
}</code></pre>
<p><strong>简写1：</strong></p>
<p>当只有一个参数时，我们可以省略箭头函数参数两侧的括号：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var double = value => {
  return value * 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> double = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>
}</code></pre>
<p><strong>简写2：</strong></p>
<p>对只有单行表达式且，该表达式的值为返回值的箭头函数来说，表征函数体的<code>{}</code>，可以省略，<code>return</code> 关键字可以省略，会静默返回该单一表达式的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var double = (value) => value * 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> double = <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> value * <span class="hljs-number">2</span></code></pre>
<p><strong>简写3：</strong><br>上述两种形式可以合并使用，而得到更加简洁的形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var double = value => value * 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> double = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value * <span class="hljs-number">2</span></code></pre>
<p>现在，你肯定学会了箭头函数的基本使用方法，接下来我们再看几个使用示例。</p>
<h3 id="articleHeader7">简写箭头函数带来的一些问题</h3>
<p>当你的简写箭头函数返回值为一个对象时，你需要用小括号括起你想返回的对象。否则，浏览器会把对象的<code>{}</code>解析为箭头函数函数体的开始和结束标记。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确的使用形式
var objectFactory = () => ({ modular: 'es6' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 正确的使用形式</span>
<span class="hljs-keyword">var</span> objectFactory = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">modular</span>: <span class="hljs-string">'es6'</span> })</code></pre>
<p>下面的代码会报错，箭头函数会把本想返回的对象的花括号解析为函数体，<code>number</code>被解析为<code>label</code>,<code>value</code>解释为没有做任何事情表达式，我们又没有显式使用<code>return</code>,返回值默认是<code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(value => { number: value })
// <- [undefined, undefined, undefined]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> { <span class="hljs-attr">number</span>: value })
<span class="hljs-comment">// &lt;- [undefined, undefined, undefined]</span></code></pre>
<p>当我们返回的对象字面量不止一个属性时，浏览器编译器不能正确解析第二个属性，这时会抛出语法错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(value => { number: value, verified: true })
// <- SyntaxError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> { <span class="hljs-attr">number</span>: value, <span class="hljs-attr">verified</span>: <span class="hljs-literal">true</span> })
<span class="hljs-comment">// &lt;- SyntaxError</span></code></pre>
<p>解决方案是把返回的对象字面量包裹在小括号中，以助于浏览器正确解析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(value => ({ number: value, verified: true }))
/* <- [
  { number: 1, verified: true },
  { number: 2, verified: true },
  { number: 3, verified: true }]
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> ({ <span class="hljs-attr">number</span>: value, <span class="hljs-attr">verified</span>: <span class="hljs-literal">true</span> }))
<span class="hljs-comment">/* &lt;- [
  { number: 1, verified: true },
  { number: 2, verified: true },
  { number: 3, verified: true }]
*/</span></code></pre>
<h3 id="articleHeader8">该何时使用箭头函数</h3>
<p>其实我们并不应该盲目的在一切地方使用ES6,ES6也不是一定比ES5要好，是否使用主要看其能否改善代码的可读性和可维护性。</p>
<p>箭头函数也并非适用于所有的情况，比如说，对于一个行数很多的复杂函数，使用<code>=&gt;</code>代替<code>function</code>关键字带来的简洁性并不明显。不过不得不说，对于简单函数，箭头函数确实能让我们的代码更简洁。</p>
<p>给函数以合理的命名，有助于增强程序的可读性。箭头函数并不能直接命名，但是却可以通过赋值给变量的形式实现间接命名，如下代码中，我们把箭头函数赋值给变量 <code>throwError</code>，当函数被调用时，会抛出错误，我们可以追溯到是箭头函数<code>throwError</code>报的错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var throwError = message => {
  throw new Error(message)
}
throwError('this is a warning')
<- Uncaught Error: this is a warning
  at throwError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> throwError = <span class="hljs-function"><span class="hljs-params">message</span> =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message)
}
throwError(<span class="hljs-string">'this is a warning'</span>)
&lt;- Uncaught <span class="hljs-built_in">Error</span>: <span class="hljs-keyword">this</span> is a warning
  at throwError</code></pre>
<p>如果你想完全控制你的函数中的<code>this</code>，使用箭头函数是简洁高效的，采用函数式编程尤其如此。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3, 4]
  .map(value => value * 2)
  .filter(value => value > 2)
  .forEach(value => console.log(value))
// <- 4
// <- 6
// <- 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
  .map(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value * <span class="hljs-number">2</span>)
  .filter(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value &gt; <span class="hljs-number">2</span>)
  .forEach(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
<span class="hljs-comment">// &lt;- 4</span>
<span class="hljs-comment">// &lt;- 6</span>
<span class="hljs-comment">// &lt;- 8</span></code></pre>
<h2 id="articleHeader9">解构赋值</h2>
<p>ES6提供的最灵活和富于表现性的新特性莫过于解构了。一旦你熟悉了，它用起来也很简单，某种程度上解构可以看做是变量赋值的语法糖，可应用于对象，数组甚至函数的参数。</p>
<h3 id="articleHeader10">对象解构</h3>
<p>为了更好的描述对象解构如何使用，我们先构建下面这样一个对象（漫威迷一定知道这个对象描述的是谁）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 描述Bruce Wayne的对象
var character = {
  name: 'Bruce',
  pseudonym: 'Batman',
  metadata: {
    age: 34,
    gender: 'male'
  },
  batarang: ['gas pellet', 'bat-mobile control', 'bat-cuffs']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 描述Bruce Wayne的对象</span>
<span class="hljs-keyword">var</span> character = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Bruce'</span>,
  <span class="hljs-attr">pseudonym</span>: <span class="hljs-string">'Batman'</span>,
  <span class="hljs-attr">metadata</span>: {
    <span class="hljs-attr">age</span>: <span class="hljs-number">34</span>,
    <span class="hljs-attr">gender</span>: <span class="hljs-string">'male'</span>
  },
  <span class="hljs-attr">batarang</span>: [<span class="hljs-string">'gas pellet'</span>, <span class="hljs-string">'bat-mobile control'</span>, <span class="hljs-string">'bat-cuffs'</span>]
}</code></pre>
<p>假如现有有一个名为 <code>pseudonym</code> 的变量，我们想让其变量值指向<code>character.pseudonym</code>,使用ES5，你往往会按下面这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pseudonym = character.pseudonym" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> pseudonym = character.pseudonym</code></pre>
<p>ES6致力于让我们的代码更简洁，通过ES6我们可以用下面的代码实现一样的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { pseudonym } = character" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { pseudonym } = character</code></pre>
<p>如同你可以使用<code>var</code>加逗号在一行中同时声明多个变量，解构的花括号内使用逗号可以做一样的事情。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { pseudonym, name } = character" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { pseudonym, name } = character</code></pre>
<p>我们还可以混用解构和常规的自定义变量，这也是解构语法灵活性的表现之一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { pseudonym } = character, two = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { pseudonym } = character, two = <span class="hljs-number">2</span></code></pre>
<p>解构还允许我们使用别名，比如我们想把<code>character.pseudonym</code>赋值给变量 <code>alias</code>,可以按下面的语句这样做，只需要在<code>pseudonym</code>后面加上<code>:</code>即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { pseudonym: alias } = character
console.log(alias)
// <- 'Batman'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> { <span class="hljs-attr">pseudonym</span>: alias } = character
<span class="hljs-built_in">console</span>.log(alias)
<span class="hljs-comment">// &lt;- 'Batman'</span></code></pre>
<p>解构还有另外一个强大的功能，解构值还可以是对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { metadata: { gender } } = character" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { <span class="hljs-attr">metadata</span>: { gender } } = character</code></pre>
<p>当然，对于多层解构，我们同样可以赋予别名，这样我们可以通过非常简洁的方法修改子属性的名称：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { metadata: { gender: characterGender } } = character" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { <span class="hljs-attr">metadata</span>: { <span class="hljs-attr">gender</span>: characterGender } } = character</code></pre>
<p>在ES5 中，当你调用一个未曾声明的值时，你会得到<code>undefined</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(character.boots)
// <- undefined
console.log(character['boots'])
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(character.boots)
<span class="hljs-comment">// &lt;- undefined</span>
<span class="hljs-built_in">console</span>.log(character[<span class="hljs-string">'boots'</span>])
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>使用解构，情况也是类似的，如果你在左边声明了一个右边对象中不存在的属性，你也会得到<code>undefined</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { boots } = character
console.log(boots)
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> { boots } = character
<span class="hljs-built_in">console</span>.log(boots)
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>对于多层解构，如下述代码中，<code>boots</code>并不存在于<code>character</code>中，这时程序会抛出异常，这就好比你你调用<code>undefined</code>或者<code>null</code>的属性时会出现异常。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { boots: { size } } = character
// <- Exception
var { missing } = null
// <- Exception" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> { <span class="hljs-attr">boots</span>: { size } } = character
<span class="hljs-comment">// &lt;- Exception</span>
<span class="hljs-keyword">var</span> { missing } = <span class="hljs-literal">null</span>
<span class="hljs-comment">// &lt;- Exception</span></code></pre>
<p>解构其实就是一种语法糖，看以下代码，你肯定就能很快理解为什么会抛出异常了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var nothing = null
var missing = nothing.missing
// <- Exception" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> nothing = <span class="hljs-literal">null</span>
<span class="hljs-keyword">var</span> missing = nothing.missing
<span class="hljs-comment">// &lt;- Exception</span></code></pre>
<p>解构也可以添加默认值，如果右侧不存在对应的值，默认值就会生效，添加的默认值可以是数值，字符串，函数，对象，也可以是某一个已经存在的变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { boots = { size: 10 } } = character
console.log(boots)
// <- { size: 10 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> { boots = { <span class="hljs-attr">size</span>: <span class="hljs-number">10</span> } } = character
<span class="hljs-built_in">console</span>.log(boots)
<span class="hljs-comment">// &lt;- { size: 10 }</span></code></pre>
<p>对于多层的解构，同样可以使用默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { metadata: { enemy = 'Satan' } } = character
console.log(enemy)
// <- 'Satan'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> { <span class="hljs-attr">metadata</span>: { enemy = <span class="hljs-string">'Satan'</span> } } = character
<span class="hljs-built_in">console</span>.log(enemy)
<span class="hljs-comment">// &lt;- 'Satan'</span></code></pre>
<p>默认值和别名也可以一起使用，不过需要注意的是别名要放在前面，默认值添加给别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { boots: footwear = { size: 10 } } = character" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { <span class="hljs-attr">boots</span>: footwear = { <span class="hljs-attr">size</span>: <span class="hljs-number">10</span> } } = character</code></pre>
<p>对象解构同样支持计算属性名，但是这时候你必须要添加别名，这是因为计算属性名允许任何类似的表达式，不添加别名，浏览器解析时会有问题，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { ['boo' + 'ts']: characterBoots } = character
console.log(characterBoots)
// <- true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> { [<span class="hljs-string">'boo'</span> + <span class="hljs-string">'ts'</span>]: characterBoots } = character
<span class="hljs-built_in">console</span>.log(characterBoots)
<span class="hljs-comment">// &lt;- true</span></code></pre>
<p>还是那句话，我们也不是任何情况下都应该使用解构，语句<code>characterBoots = character[type]</code>看起来比<code>{ [type]: characterBoots } = character</code>语义更清晰，但是当你需要提取对象中的子对象时，解构就很简洁方便了。</p>
<p>我们再看看在数组中该如何使用解构。</p>
<h3 id="articleHeader11">数组解构</h3>
<p>数组解构的语法和对象解构是类似的。区别在于，数组解构我们使用中括号而非花括号，下面的代码中，通过结构，我们在数组<code>coordinates</code>中提出了变量 <code>x,y</code> 。 你不需要使用<code>x = coordinates[0]</code>这样的语法了，数组解构不使用索引值，但却让你的代码更加清晰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var coordinates = [12, -7]
var [x, y] = coordinates
console.log(x)
// <- 12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> coordinates = [<span class="hljs-number">12</span>, <span class="hljs-number">-7</span>]
<span class="hljs-keyword">var</span> [x, y] = coordinates
<span class="hljs-built_in">console</span>.log(x)
<span class="hljs-comment">// &lt;- 12</span></code></pre>
<p>数组解构也允许你跳过你不想用到的值，在对应地方留白即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var names = ['James', 'L.', 'Howlett']
var [ firstName, , lastName ] = names
console.log(lastName)
// <- 'Howlett'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> names = [<span class="hljs-string">'James'</span>, <span class="hljs-string">'L.'</span>, <span class="hljs-string">'Howlett'</span>]
<span class="hljs-keyword">var</span> [ firstName, , lastName ] = names
<span class="hljs-built_in">console</span>.log(lastName)
<span class="hljs-comment">// &lt;- 'Howlett'</span></code></pre>
<p>和对象解构一样，数组解构也允许你添加默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var names = ['James', 'L.']
var [ firstName = 'John', , lastName = 'Doe' ] = names
console.log(lastName)
// <- 'Doe'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> names = [<span class="hljs-string">'James'</span>, <span class="hljs-string">'L.'</span>]
<span class="hljs-keyword">var</span> [ firstName = <span class="hljs-string">'John'</span>, , lastName = <span class="hljs-string">'Doe'</span> ] = names
<span class="hljs-built_in">console</span>.log(lastName)
<span class="hljs-comment">// &lt;- 'Doe'</span></code></pre>
<p>在ES5中，你需要借助第三个变量，才能完成两个变量值的交换，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var left = 5, right = 7;
var aux = left
left = right
right = aux" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> left = <span class="hljs-number">5</span>, right = <span class="hljs-number">7</span>;
<span class="hljs-keyword">var</span> aux = left
left = right
right = aux</code></pre>
<p>使用解构，一切就简单多了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var left = 5, right = 7;
[left, right] = [right, left]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> left = <span class="hljs-number">5</span>, right = <span class="hljs-number">7</span>;
[left, right] = [right, left]</code></pre>
<p>我们再看看函数解构。</p>
<h3 id="articleHeader12">函数默认参数</h3>
<p>在ES6中，我们可以给函数的参数添加默认值了，下例中我们就给参数 <code>exponent</code> 分配了一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function powerOf(base, exponent = 2) {
  return Math.pow(base, exponent)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">powerOf</span>(<span class="hljs-params">base, exponent = <span class="hljs-number">2</span></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.pow(base, exponent)
}</code></pre>
<p>箭头函数同样支持使用默认值，需要注意的是，就算只有一个参数，如果要给参数添加默认值，参数部分一定要用小括号括起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var double = (input = 0) => input * 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> double = <span class="hljs-function">(<span class="hljs-params">input = <span class="hljs-number">0</span></span>) =&gt;</span> input * <span class="hljs-number">2</span></code></pre>
<p>我们可以给任何位置的任何参数添加默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sumOf(a = 1, b = 2, c = 3) {
  return a + b + c
}
console.log(sumOf(undefined, undefined, 4))
// <- 1 + 2 + 4 = 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sumOf</span>(<span class="hljs-params">a = <span class="hljs-number">1</span>, b = <span class="hljs-number">2</span>, c = <span class="hljs-number">3</span></span>) </span>{
  <span class="hljs-keyword">return</span> a + b + c
}
<span class="hljs-built_in">console</span>.log(sumOf(<span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-number">4</span>))
<span class="hljs-comment">// &lt;- 1 + 2 + 4 = 7</span></code></pre>
<p>在JS中，给一个函数提供一个包含若干属性的对象字面量做为参数的情况并不常见，不过你依旧可以按下面方法这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defaultOptions = { brand: 'Volkswagen', make: 1999 }
function carFactory(options = defaultOptions) {
  console.log(options.brand)
  console.log(options.make)
}
carFactory()
// <- 'Volkswagen'
// <- 1999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> defaultOptions = { <span class="hljs-attr">brand</span>: <span class="hljs-string">'Volkswagen'</span>, <span class="hljs-attr">make</span>: <span class="hljs-number">1999</span> }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">carFactory</span>(<span class="hljs-params">options = defaultOptions</span>) </span>{
  <span class="hljs-built_in">console</span>.log(options.brand)
  <span class="hljs-built_in">console</span>.log(options.make)
}
carFactory()
<span class="hljs-comment">// &lt;- 'Volkswagen'</span>
<span class="hljs-comment">// &lt;- 1999</span></code></pre>
<p>不过这样做存在一定的问题，当你调用该函数时，如果传入的参数对象只包含一个属性，另一个属性的默认值会自动失效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="carFactory({ make: 2000 })
// <- undefined
// <- 2000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">carFactory({ <span class="hljs-attr">make</span>: <span class="hljs-number">2000</span> })
<span class="hljs-comment">// &lt;- undefined</span>
<span class="hljs-comment">// &lt;- 2000</span></code></pre>
<p>函数参数解构就可以解决这个问题。</p>
<h3 id="articleHeader13">函数参数解构</h3>
<p>通过函数参数解构，可以解决上面的问题，这里我们为每一个属性都提供了默认值，单独改变其中一个并不会影响其它的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function carFactory({ brand = 'Volkswagen', make = 1999 }) {
  console.log(brand)
  console.log(make)
}
carFactory({ make: 2000 })
// <- 'Volkswagen'
// <- 2000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">carFactory</span>(<span class="hljs-params">{ brand = <span class="hljs-string">'Volkswagen'</span>, make = <span class="hljs-number">1999</span> }</span>) </span>{
  <span class="hljs-built_in">console</span>.log(brand)
  <span class="hljs-built_in">console</span>.log(make)
}
carFactory({ <span class="hljs-attr">make</span>: <span class="hljs-number">2000</span> })
<span class="hljs-comment">// &lt;- 'Volkswagen'</span>
<span class="hljs-comment">// &lt;- 2000</span></code></pre>
<p>不过这种情况下，函数调用时，如果参数为空即<code>carFactory()</code>函数将抛出异常。这种问题可以通过下面的方法来修复，下述代码中我们添加了一个空对象作为<code>options</code>的默认值，这样当函数被调用时，如果参数为空，会自动以<code>{}</code>作为参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function carFactory({
  brand = 'Volkswagen',
  make = 1999
} = {}) {
  console.log(brand)
  console.log(make)
}
carFactory()
// <- 'Volkswagen'
// <- 1999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">carFactory</span>(<span class="hljs-params">{
  brand = <span class="hljs-string">'Volkswagen'</span>,
  make = <span class="hljs-number">1999</span>
} = {}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(brand)
  <span class="hljs-built_in">console</span>.log(make)
}
carFactory()
<span class="hljs-comment">// &lt;- 'Volkswagen'</span>
<span class="hljs-comment">// &lt;- 1999</span></code></pre>
<p>除此之外，使用函数参数解构，还可以让你的函数自行匹配对应的参数，看接下来的例子，你就能明白这一点了，我们定义一个名为<code>car</code>的对象，这个对象拥有很多属性：owner，brand，make，model，preferences等等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var car = {
  owner: {
    id: 'e2c3503a4181968c',
    name: 'Donald Draper'
  },
  brand: 'Peugeot',
  make: 2015,
  model: '208',
  preferences: {
    airbags: true,
    airconditioning: false,
    color: 'red'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> car = {
  <span class="hljs-attr">owner</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">'e2c3503a4181968c'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Donald Draper'</span>
  },
  <span class="hljs-attr">brand</span>: <span class="hljs-string">'Peugeot'</span>,
  <span class="hljs-attr">make</span>: <span class="hljs-number">2015</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">'208'</span>,
  <span class="hljs-attr">preferences</span>: {
    <span class="hljs-attr">airbags</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">airconditioning</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>
  }
}</code></pre>
<p>解构能让我们的函数方便的只使用里面的部分数据，下面代码中的函数<code>getCarProductModel</code>说明了具体该如何使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getCarProductModel = ({ brand, make, model }) => ({
  sku: brand + ':' + make + ':' + model,
  brand,
  make,
  model
})
getCarProductModel(car)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> getCarProductModel = <span class="hljs-function">(<span class="hljs-params">{ brand, make, model }</span>) =&gt;</span> ({
  <span class="hljs-attr">sku</span>: brand + <span class="hljs-string">':'</span> + make + <span class="hljs-string">':'</span> + model,
  brand,
  make,
  model
})
getCarProductModel(car)</code></pre>
<h3 id="articleHeader14">解构使用示例</h3>
<p>当一个函数的返回值为对象或者数组时，使用解构，我们可以非常简洁的获取返回对象中某个属性的值（返回数组中某一项的值）。比如说，函数<code>getCoordinates()</code>返回了一系列的值，但是我们只想用其中的<code>x,y</code>，我们可以这样写，解构帮助我们避免了很多中间变量的使用，也使得我们代码的可读性更高。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCoordinates() {
  return { x: 10, y: 22, z: -1, type: '3d' }
}
var { x, y } = getCoordinates()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCoordinates</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">x</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">22</span>, <span class="hljs-attr">z</span>: <span class="hljs-number">-1</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'3d'</span> }
}
<span class="hljs-keyword">var</span> { x, y } = getCoordinates()</code></pre>
<p>通过使用默认值，可以减少重复，比如你想写一个<code>random</code>函数，这个函数将返回一个位于<code>min</code>和<code>max</code>之间的值。我们可以分辨设置<code>min</code>默认值为1，<code>max</code>默认值为10，在需要的时候还可以单独改变其中的某一个值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function random({ min = 1, max = 10 } = {}) {
  return Math.floor(Math.random() * (max - min)) + min
}
console.log(random())
// <- 7
console.log(random({ max: 24 }))
// <- 18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">random</span>(<span class="hljs-params">{ min = <span class="hljs-number">1</span>, max = <span class="hljs-number">10</span> } = {}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (max - min)) + min
}
<span class="hljs-built_in">console</span>.log(random())
<span class="hljs-comment">// &lt;- 7</span>
<span class="hljs-built_in">console</span>.log(random({ <span class="hljs-attr">max</span>: <span class="hljs-number">24</span> }))
<span class="hljs-comment">// &lt;- 18</span></code></pre>
<p>解构还可以配合正则表达式使用。看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function splitDate(date) {
  var rdate = /(\d+).(\d+).(\d+)/
  return rdate.exec(date)
}
var [ , year, month, day] = splitDate('2015-11-06')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">splitDate</span>(<span class="hljs-params">date</span>) </span>{
  <span class="hljs-keyword">var</span> rdate = <span class="hljs-regexp">/(\d+).(\d+).(\d+)/</span>
  <span class="hljs-keyword">return</span> rdate.exec(date)
}
<span class="hljs-keyword">var</span> [ , year, month, day] = splitDate(<span class="hljs-string">'2015-11-06'</span>)</code></pre>
<p>不过当<code>.exec</code>不比配时会返回<code>null</code>,因此我们需要修改上述代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matches = splitDate('2015-11-06')
if (matches === null) {
  return
}
var [, year, month, day] = matches" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> matches = splitDate(<span class="hljs-string">'2015-11-06'</span>)
<span class="hljs-keyword">if</span> (matches === <span class="hljs-literal">null</span>) {
  <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">var</span> [, year, month, day] = matches</code></pre>
<p>下面我们继续来讲讲<code>spread</code>和<code>rest</code>操作符。</p>
<h2 id="articleHeader15">剩余参数和拓展符</h2>
<p>ES6之前，对于不确定数量参数的函数。你需要使用伪数组<code>arguments</code>，它拥有<code>length</code>属性，却又不具备很多一般数组有的特性。需要通过<code>Array#slice.call</code>转换<code>arguments</code>对象真数组后才能进行下一步的操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function join() {
  var list = Array.prototype.slice.call(arguments)
  return list.join(', ')
}
join('first', 'second', 'third')
// <- 'first, second, third'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">join</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> list = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)
  <span class="hljs-keyword">return</span> list.join(<span class="hljs-string">', '</span>)
}
join(<span class="hljs-string">'first'</span>, <span class="hljs-string">'second'</span>, <span class="hljs-string">'third'</span>)
<span class="hljs-comment">// &lt;- 'first, second, third'</span></code></pre>
<p>对于这种情况，ES6提供了一种更好的解决方案：<code>rest</code>。</p>
<h3 id="articleHeader16">剩余参数<code>rest</code>
</h3>
<p>使用<code>rest</code>, 你只需要在任意JavaScript函数的最后一个参数前添加三个点<code>...</code>即可。当<code>rest</code>参数是函数的唯一参数时，它就代表了传递给这个函数的所有参数。它起到和前面说的<code>.slice</code>一样的作用，把参数转换为了数组，不需要你再对<code>arguments</code>进行额外的转换了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function join(...list) {
  return list.join(', ')
}
join('first', 'second', 'third')
// <- 'first, second, third'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">join</span>(<span class="hljs-params">...list</span>) </span>{
  <span class="hljs-keyword">return</span> list.join(<span class="hljs-string">', '</span>)
}
join(<span class="hljs-string">'first'</span>, <span class="hljs-string">'second'</span>, <span class="hljs-string">'third'</span>)
<span class="hljs-comment">// &lt;- 'first, second, third'</span></code></pre>
<p><code>rest</code>参数之前的命名参数不会被包含在<code>rest</code>中，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function join(separator, ...list) {
  return list.join(separator)
}
join('; ', 'first', 'second', 'third')
// <- 'first; second; third'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">join</span>(<span class="hljs-params">separator, ...list</span>) </span>{
  <span class="hljs-keyword">return</span> list.join(separator)
}
join(<span class="hljs-string">'; '</span>, <span class="hljs-string">'first'</span>, <span class="hljs-string">'second'</span>, <span class="hljs-string">'third'</span>)
<span class="hljs-comment">// &lt;- 'first; second; third'</span></code></pre>
<p>在箭头函数中使用<code>rest</code>参数时，即使只有这一个参数，也需要使用圆括号把它围起来，不然就会报错<code>SyntaxError</code>，使用示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sumAll = (...numbers) => numbers.reduce(
  (total, next) => total + next
)
console.log(sumAll(1, 2, 5))
// <- 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sumAll = <span class="hljs-function">(<span class="hljs-params">...numbers</span>) =&gt;</span> numbers.reduce(
  <span class="hljs-function">(<span class="hljs-params">total, next</span>) =&gt;</span> total + next
)
<span class="hljs-built_in">console</span>.log(sumAll(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>))
<span class="hljs-comment">// &lt;- 8</span></code></pre>
<p>上述代码的ES5实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5的写法
function sumAll() {
  var numbers = Array.prototype.slice.call(arguments)
  return numbers.reduce(function (total, next) {
    return total + next
  })
}
console.log(sumAll(1, 2, 5))
// <- 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES5的写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sumAll</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> numbers = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)
  <span class="hljs-keyword">return</span> numbers.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">total, next</span>) </span>{
    <span class="hljs-keyword">return</span> total + next
  })
}
<span class="hljs-built_in">console</span>.log(sumAll(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>))
<span class="hljs-comment">// &lt;- 8</span></code></pre>
<h3 id="articleHeader17">拓展运算符</h3>
<p>拓展运算符可以把任意可枚举对象转换为数组，使用拓展运算符可以高效处理目标对象，在拓展目前前添加<code>...</code>就可以使用拓展运算符了。下例中<code>...arguments</code>就把函数的参数转换为了数组字面量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function cast() {
  return [...arguments]
}
cast('a', 'b', 'c')
// <- ['a', 'b', 'c']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cast</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [...arguments]
}
cast(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>)
<span class="hljs-comment">// &lt;- ['a', 'b', 'c']</span></code></pre>
<p>使用拓展运算符，我们也可以把字符串转换为由每一个字母组成的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...'show me']
// <- ['s', 'h', 'o', 'w', ' ', 'm', 'e']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[...<span class="hljs-string">'show me'</span>]
<span class="hljs-comment">// &lt;- ['s', 'h', 'o', 'w', ' ', 'm', 'e']</span></code></pre>
<p>使用拓展运算符，还可以拼合数组:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function cast() {
  return ['left', ...arguments, 'right']
}
cast('a', 'b', 'c')
// <- ['left', 'a', 'b', 'c', 'right']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cast</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="hljs-string">'left'</span>, ...arguments, <span class="hljs-string">'right'</span>]
}
cast(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>)
<span class="hljs-comment">// &lt;- ['left', 'a', 'b', 'c', 'right']</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var all = [1, ...[2, 3], 4, ...[5], 6, 7]
console.log(all)
// <- [1, 2, 3, 4, 5, 6, 7]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> all = [<span class="hljs-number">1</span>, ...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-number">4</span>, ...[<span class="hljs-number">5</span>], <span class="hljs-number">6</span>, <span class="hljs-number">7</span>]
<span class="hljs-built_in">console</span>.log(all)
<span class="hljs-comment">// &lt;- [1, 2, 3, 4, 5, 6, 7]</span></code></pre>
<p>这里我还想再强调一下，拓展运算符不仅仅适用于数组和<code>arguments</code>对象，对任意可迭代的对象都可以使用。迭代也是ES6新提出的一个概念，在[ Iteration and Flow Control]()这一章，我们将详细叙述迭代。</p>
<h4>Shifting和Spreading</h4>
<p>当你想要抽出一个数组的前一个或者两个元素时，常用的解决方案是使用<code>.shift</code>.尽管是函数式的，下述代码在第一次看到的时候却不好理解，我们使用了两次<code>.slice</code>从<code>list</code>中抽离出两个不同的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var list = ['a', 'b', 'c', 'd', 'e']
var first = list.shift()
var second = list.shift()
console.log(first)
// <- 'a'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> list = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>]
<span class="hljs-keyword">var</span> first = list.shift()
<span class="hljs-keyword">var</span> second = list.shift()
<span class="hljs-built_in">console</span>.log(first)
<span class="hljs-comment">// &lt;- 'a'</span></code></pre>
<p>在ES6中，结合使用拓展和解构，可以让代码的可读性更好：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [first, second, ...other] = ['a', 'b', 'c', 'd', 'e']
console.log(other)
// <- ['c', 'd', 'e']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> [first, second, ...other] = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>]
<span class="hljs-built_in">console</span>.log(other)
<span class="hljs-comment">// &lt;- ['c', 'd', 'e']</span></code></pre>
<p>除了对数组进行拓展，你同样可以对函数参数使用拓展，下例展示了如何添加任意数量的参数到<code>multiply</code>函数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function multiply(left, right) {
  return left * right
}
var result = multiply(...[2, 3])
console.log(result)
// <- 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">left, right</span>) </span>{
  <span class="hljs-keyword">return</span> left * right
}
<span class="hljs-keyword">var</span> result = multiply(...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
<span class="hljs-built_in">console</span>.log(result)
<span class="hljs-comment">// &lt;- 6</span></code></pre>
<p>向在数组中一样，函数参数中的拓展运算符同样可以结合常规参数一起使用。下例中，<code>print</code>函数结合使用了<code>rest</code>,普通参数，和拓展运算符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(...list) {
  console.log(list)
}
print(1, ...[2, 3], 4, ...[5])
// <- [1, 2, 3, 4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">...list</span>) </span>{
  <span class="hljs-built_in">console</span>.log(list)
}
print(<span class="hljs-number">1</span>, ...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-number">4</span>, ...[<span class="hljs-number">5</span>])
<span class="hljs-comment">// &lt;- [1, 2, 3, 4, 5]</span></code></pre>
<p>下表总结了，拓展运算符的常见使用方法：</p>
<table>
<thead><tr>
<th>使用示例</th>
<th>ES5</th>
<th>ES6</th>
</tr></thead>
<tbody>
<tr>
<td>Concatenation</td>
<td><code>[1, 2].concat(more)</code></td>
<td><code>[1, 2, ...more]</code></td>
</tr>
<tr>
<td>Push an array onto list</td>
<td><code>list.push.apply(list, items)</code></td>
<td><code>list.push(...items)</code></td>
</tr>
<tr>
<td>Destructuring</td>
<td><code>a = list[0], other = list.slice(1)</code></td>
<td><code>&lt;span class="Apple-tab-span" style="white-space: pre;"&gt; &lt;/span&gt;[a, ...other] = list</code></td>
</tr>
<tr>
<td>
<code>new</code> and <code>apply</code>
</td>
<td><code>new (Date.bind.apply(Date, [null,2015,31,8]))</code></td>
<td><code>new Date(...[2015,31,8])</code></td>
</tr>
</tbody>
</table>
<h2 id="articleHeader18">模板字符串</h2>
<p>模板字符串是对常规<code>JavaScript</code>字符串的重大改进，不同于在普通字符串中使用单引号或者双引号，模板字符串的声明需要使用反撇号，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var text = `This is my first template literal`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> text = <span class="hljs-string">`This is my first template literal`</span></code></pre>
<p>因为使用的是反撇号，你可以在模板字符串中随意使用单双引号了，使用时不再需要考虑转义，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var text = `I'm &quot;amazed&quot; at these opportunities!`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> text = <span class="hljs-string">`I'm "amazed" at these opportunities!`</span></code></pre>
<p>模板字符串具有很多强大的功能，可在其中插入JavaScript表达式就是其一。</p>
<h3 id="articleHeader19">在字符串中插值</h3>
<p>通过模板字符串，你可以在模板中插入任何JavaScript表达式了。当解析到表达式时，表达式会被执行，该处将渲染表达式的值，下例中，我们在字符串中插入了变量<code>name</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'Shannon'
var text = `Hello, ${ name }!`
console.log(text)
// <- 'Hello, Shannon!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'Shannon'</span>
<span class="hljs-keyword">var</span> text = <span class="hljs-string">`Hello, <span class="hljs-subst">${ name }</span>!`</span>
<span class="hljs-built_in">console</span>.log(text)
<span class="hljs-comment">// &lt;- 'Hello, Shannon!'</span></code></pre>
<p>模板字符串是支持任何表达式的。使用模板字符串，代码将更容易维护，你无须再手动连接字符串和JavaScript表达式了。</p>
<p>看下面插入日期的例子，是不是又直观又方便：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`The time and date is ${ new Date().toLocaleString() }.`
// <- 'the time and date is 8/26/2015, 3:15:20 PM'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">`The time and date is <span class="hljs-subst">${ <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString() }</span>.`</span>
<span class="hljs-comment">// &lt;- 'the time and date is 8/26/2015, 3:15:20 PM'</span></code></pre>
<p>表达式中还可以包含数学运算符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`The result of 2+3 equals ${ 2 + 3 }`
// <- 'The result of 2+3 equals 5'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">`The result of 2+3 equals <span class="hljs-subst">${ <span class="hljs-number">2</span> + <span class="hljs-number">3</span> }</span>`</span>
<span class="hljs-comment">// &lt;- 'The result of 2+3 equals 5'</span></code></pre>
<p>鉴于模板字符串本身也是JavaScript表达式，我们在模板字符串中还可以嵌套模板字符串;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`This template literal ${ `is ${ 'nested' }` }!`
// <- 'This template literal is nested!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">`This template literal <span class="hljs-subst">${ <span class="hljs-string">`is <span class="hljs-subst">${ <span class="hljs-string">'nested'</span> }</span>`</span> }</span>!`</span>
<span class="hljs-comment">// &lt;- 'This template literal is nested!'</span></code></pre>
<p>模板字符串的另外一个优点是支持多行字符串;</p>
<h3 id="articleHeader20">多行文本模板</h3>
<p>在ES6之前，如果你想表现多行字符串，你需要使用转义，数组拼合，甚至使用使用注释符做复杂的hacks.如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var escaped =
'The first line\n\
A second line\n\
Then a third line'

var concatenated =
'The first line\n' `
'A second line\n' `
'Then a third line'

var joined = [
'The first line',
'A second line',
'Then a third line'
].join('\n')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> escaped =
<span class="hljs-string">'The first line\n\
A second line\n\
Then a third line'</span>

<span class="hljs-keyword">var</span> concatenated =
<span class="hljs-string">'The first line\n'</span> <span class="hljs-string">`
'A second line\n' `</span>
<span class="hljs-string">'Then a third line'</span>

<span class="hljs-keyword">var</span> joined = [
<span class="hljs-string">'The first line'</span>,
<span class="hljs-string">'A second line'</span>,
<span class="hljs-string">'Then a third line'</span>
].join(<span class="hljs-string">'\n'</span>)</code></pre>
<p>应用ES6，这种处理就简单多了，模板字符串默认支持多行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var multiline =
`The first line
A second line
Then a third line`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> multiline =
<span class="hljs-string">`The first line
A second line
Then a third line`</span></code></pre>
<p>当你需要返回的字符串基于<code>html</code>和数据生成，使用模板字符串是很简洁高效的，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var book = {
  title: 'Modular ES6',
  excerpt: 'Here goes some properly sanitized HTML',
  tags: ['es6', 'template-literals', 'es6-in-depth']
}
var html = `<article>
  <header>
    <h1>${ book.title }</h1>
  </header>
  <section>${ book.excerpt }</section>
  <footer>
    <ul>
      ${
        book.tags
          .map(tag => `<li>${ tag }</li>`)
          .join('\n      ')
      }
    </ul>
  </footer>
</article>`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> book = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">'Modular ES6'</span>,
  <span class="hljs-attr">excerpt</span>: <span class="hljs-string">'Here goes some properly sanitized HTML'</span>,
  <span class="hljs-attr">tags</span>: [<span class="hljs-string">'es6'</span>, <span class="hljs-string">'template-literals'</span>, <span class="hljs-string">'es6-in-depth'</span>]
}
<span class="hljs-keyword">var</span> html = <span class="hljs-string">`&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;<span class="hljs-subst">${ book.title }</span>&lt;/h1&gt;
  &lt;/header&gt;
  &lt;section&gt;<span class="hljs-subst">${ book.excerpt }</span>&lt;/section&gt;
  &lt;footer&gt;
    &lt;ul&gt;
      <span class="hljs-subst">${
        book.tags
          .map(tag =&gt; <span class="hljs-string">`&lt;li&gt;<span class="hljs-subst">${ tag }</span>&lt;/li&gt;`</span>)
          .join(<span class="hljs-string">'\n      '</span>)
      }</span>
    &lt;/ul&gt;
  &lt;/footer&gt;
&lt;/article&gt;`</span></code></pre>
<p>上述代码将得到下面这样的结果。空格得以保留，多个<code>li</code>也按我们的预期被合适的渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<article>
  <header>
    <h1>Modular ES6</h1>
  </header>
  <section>Here goes some properly sanitized HTML</section>
  <footer>
    <ul>
      <li>es6</li>
      <li>template-literals</li>
      <li>es6-in-depth</li>
    </ul>
  </footer>
</article>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;article&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Modular ES6<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
  &lt;section&gt;Here goes some properly sanitized HTML&lt;<span class="hljs-regexp">/section&gt;
  &lt;footer&gt;
    &lt;ul&gt;
      &lt;li&gt;es6&lt;/</span>li&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>template-literals<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
      &lt;li&gt;es6-<span class="hljs-keyword">in</span>-depth&lt;<span class="hljs-regexp">/li&gt;
    &lt;/u</span>l&gt;
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/article&gt;</span></code></pre>
<p>不过有时候我们并不希望空格被保留，下例中我们在函数中使用包含缩进的模板字符串，我们希望结果没有缩进，但是实际的结果却有四格的缩进。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getParagraph() {
  return `
    Dear Rod,

    This is a template literal string that's indented
    four spaces. However, you may have expected for it
    to be not indented at all.

    Nico
  `
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getParagraph</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`
    Dear Rod,

    This is a template literal string that's indented
    four spaces. However, you may have expected for it
    to be not indented at all.

    Nico
  `</span>
}</code></pre>
<p>我们可以用下面这个功能函数对生成的字符串进行处理已得到我们想要的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unindent(text) {
  return text
    .split('\n')
    .map(line => line.slice(4))
    .join('\n')
    .trim()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unindent</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> text
    .split(<span class="hljs-string">'\n'</span>)
    .map(<span class="hljs-function"><span class="hljs-params">line</span> =&gt;</span> line.slice(<span class="hljs-number">4</span>))
    .join(<span class="hljs-string">'\n'</span>)
    .trim()
}</code></pre>
<p>不过，使用被称为标记模板的模板字符串新特性处理这种情况可能会更好。</p>
<h3 id="articleHeader21">标记模板</h3>
<p>默认情况下，JavaScript会把<code>\</code>解析为转义符号，对浏览器来说，以<code>\</code>开头的字符一般具有特殊的含义。比如说<code>\n</code>意味着新行，<code>\u00f1</code>表示<code>ñ</code>等等。如果你不想浏览器执行这种特殊解析，你也可以使用<code>String.raw</code>来标记模板。下面的代码就是这样做的，这里我们使用了<code>String.row</code>来处理模板字符串，相应的这里面的<code>\n</code>没有被解析为新行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var text = String.raw`&quot;\n&quot; is taken literally.
It'll be escaped instead of interpreted.`
console.log(text)
// &quot;\n&quot; is taken literally.
// It'll be escaped instead of interpreted." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> text = <span class="hljs-built_in">String</span>.raw<span class="hljs-string">`"\n" is taken literally.
It'll be escaped instead of interpreted.`</span>
<span class="hljs-built_in">console</span>.log(text)
<span class="hljs-comment">// "\n" is taken literally.</span>
<span class="hljs-comment">// It'll be escaped instead of interpreted.</span></code></pre>
<p>我们添加在模板字符串之前的<code>String.raw</code>前缀，这就是标记模板，这样的模板字符串在被渲染前被该标记代表的函数预处理。</p>
<p>一个典型的标记模板字符串如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tag`Hello, ${ name }. I am ${ emotion } to meet you!`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">tag<span class="hljs-string">`Hello, <span class="hljs-subst">${ name }</span>. I am <span class="hljs-subst">${ emotion }</span> to meet you!`</span></code></pre>
<p>实际上，上面标记模板可以用以下函数形式表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tag(
  ['Hello, ', '. I am ', ' to meet you!'],
  'Maurice',
  'thrilled'
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">tag(
  [<span class="hljs-string">'Hello, '</span>, <span class="hljs-string">'. I am '</span>, <span class="hljs-string">' to meet you!'</span>],
  <span class="hljs-string">'Maurice'</span>,
  <span class="hljs-string">'thrilled'</span>
)</code></pre>
<p>我们还是用代码来说明这个概念，下述代码中，我们先定义一个名为<code>tag</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function tag(parts, ...values) {
  return parts.reduce(
    (all, part, index) => all + values[index - 1] + part
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span>(<span class="hljs-params">parts, ...values</span>) </span>{
  <span class="hljs-keyword">return</span> parts.reduce(
    <span class="hljs-function">(<span class="hljs-params">all, part, index</span>) =&gt;</span> all + values[index - <span class="hljs-number">1</span>] + part
  )
}</code></pre>
<p>然后我们调用使用使用标记模板，不过此时的结果和不使用标记模板是一样的，这是因为我们定义的<code>tag</code>函数实际上并未对字符串进行额外的处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'Maurice'
var emotion = 'thrilled'
var text = tag`Hello, ${ name }. I am ${ emotion } to meet you!`
console.log(text)
// <- 'Hello Maurice, I am thrilled to meet you!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'Maurice'</span>
<span class="hljs-keyword">var</span> emotion = <span class="hljs-string">'thrilled'</span>
<span class="hljs-keyword">var</span> text = tag<span class="hljs-string">`Hello, <span class="hljs-subst">${ name }</span>. I am <span class="hljs-subst">${ emotion }</span> to meet you!`</span>
<span class="hljs-built_in">console</span>.log(text)
<span class="hljs-comment">// &lt;- 'Hello Maurice, I am thrilled to meet you!'</span></code></pre>
<p>我们看一个进行额外处理的例子，比如转换所有用户输入的值为大写（假设用户只会输入英语），这里我们定义标记函数<code>upper</code>来做这件事：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function upper(parts, ...values) {
  return parts.reduce((all, part, index) =>
    all + values[index - 1].toUpperCase() + part
  )
}
var name = 'Maurice'
var emotion = 'thrilled'
upper`Hello, ${ name }. I am ${ emotion } to meet you!`
// <- 'Hello MAURICE, I am THRILLED to meet you!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upper</span>(<span class="hljs-params">parts, ...values</span>) </span>{
  <span class="hljs-keyword">return</span> parts.reduce(<span class="hljs-function">(<span class="hljs-params">all, part, index</span>) =&gt;</span>
    all + values[index - <span class="hljs-number">1</span>].toUpperCase() + part
  )
}
<span class="hljs-keyword">var</span> name = <span class="hljs-string">'Maurice'</span>
<span class="hljs-keyword">var</span> emotion = <span class="hljs-string">'thrilled'</span>
upper<span class="hljs-string">`Hello, <span class="hljs-subst">${ name }</span>. I am <span class="hljs-subst">${ emotion }</span> to meet you!`</span>
<span class="hljs-comment">// &lt;- 'Hello MAURICE, I am THRILLED to meet you!'</span></code></pre>
<p>既然可以转换输入为大写，那我们再进一步想想，如果提供合适的标记模板函数，使用标记模板，我们还可以对模板中的表达式进行各种过滤处理，比如有这么一个场景，假设表达式的值都来自用户输入，假设有一个名为<code>sanitize</code>的库可用于去除用户输入中的html标签，那通过使用标记模板，就可以有效的防止XSS攻击了，使用方法如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sanitized(parts, ...values) {
  return parts.reduce((all, part, index) =>
    all + sanitize(values[index - 1]) + part
  )
}
var comment = 'Evil comment<iframe src=&quot;http://evil.corp&quot;>
    </iframe>'
var html = sanitized`<div>${ comment }</div>`
console.log(html)
// <- '<div>Evil comment</div>'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sanitized</span>(<span class="hljs-params">parts, ...values</span>) </span>{
  <span class="hljs-keyword">return</span> parts.reduce(<span class="hljs-function">(<span class="hljs-params">all, part, index</span>) =&gt;</span>
    all + sanitize(values[index - <span class="hljs-number">1</span>]) + part
  )
}
<span class="hljs-keyword">var</span> comment = <span class="hljs-string">'Evil comment&lt;iframe src="http://evil.corp"&gt;
    &lt;/iframe&gt;'</span>
<span class="hljs-keyword">var</span> html = sanitized<span class="hljs-string">`&lt;div&gt;<span class="hljs-subst">${ comment }</span>&lt;/div&gt;`</span>
<span class="hljs-built_in">console</span>.log(html)
<span class="hljs-comment">// &lt;- '&lt;div&gt;Evil comment&lt;/div&gt;'</span></code></pre>
<p>ES6中的另外一个大的改变是提供了新的变量声明方式：<code>let</code>和<code>const</code>声明，下面我们一起来学习。</p>
<h2 id="articleHeader22">
<code>let</code> &amp; <code>const</code> 声明</h2>
<p>可能很早之前你就听说过 <code>let</code> 了，它用起来像 <code>var</code> 但是，却有不同的作用域规则。</p>
<p>JavaScript的作用域有一套复杂的规则，变量提升的存在常常让新手忐忑不安。变量提升，意味着无论你在那里声明的变量，在浏览器解析时，实际上都被提升到了当前作用域的顶部被声明。看下面的这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isItTwo(value) {
  if (value === 2) {
    var two = true
  }
  return two
}
isItTwo(2)
// <- true
isItTwo('two')
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isItTwo</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">if</span> (value === <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">var</span> two = <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">return</span> two
}
isItTwo(<span class="hljs-number">2</span>)
<span class="hljs-comment">// &lt;- true</span>
isItTwo(<span class="hljs-string">'two'</span>)
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>尽管<code>two</code>是在代码分支中被声明，之后被外部分支引用，上述的JS代码还是可以工作的。<code>var</code> 声明的变量<code>two</code>实际是在<code>isItTwo</code>顶部被声明的。由于声明提升的存在，上述代码其实和下面代码的效果是一样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isItTwo(value) {
  var two
  if (value === 2) {
    two = true
  }
  return two
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isItTwo</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">var</span> two
  <span class="hljs-keyword">if</span> (value === <span class="hljs-number">2</span>) {
    two = <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">return</span> two
}</code></pre>
<p>带来了灵活性的同事，变量提升也带来了更大的迷惑性，还好ES6 为我们提供了块作用域。</p>
<h3 id="articleHeader23">块作用域和<code>let</code> 声明</h3>
<p>相比函数作用域，块作用域允许我们通过<code>if</code>,<code>for</code>,<code>while</code>声明创建新作用域，甚至任意创建<code>{}</code>块也能创建新的作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{""{{"{ var deep = 'This is available from outer scope.'; "}}""}}"}
console.log(deep)
// <- 'This is available from outer scope.'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">"{{""{{"{ <span class="hljs-keyword">var</span> deep = <span class="hljs-string">'This is available from outer scope.'</span>; "}}""}}"}
<span class="hljs-built_in">console</span>.log(deep)
<span class="hljs-comment">// &lt;- 'This is available from outer scope.'</span></code></pre>
<p>由于这里使用的是<code>var</code>，考虑到变量提升的存在，我们在外部依旧可以读取到深层中的<code>deep</code>变量，这里并不会报错。不过在以下情况下，我们可能希望这里会报错：</p>
<ul>
<li><p>访问内部变量会打破我们代码中的某种封装原则；</p></li>
<li><p>父块中已有有一个一个同名变量，但是内部也需要用同名变量；</p></li>
</ul>
<p>使用<code>let</code>就可以解决这个问题，<code>let</code> 创建的变量在块作用域内有效，在ES6提出<code>let</code>以前，想要创建深层作用域的唯一办法就是再新建一个函数。使用<code>let</code>，你只需添加另外一对<code>{}</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let topmost = {}
{
  let inner = {}
  {
    let innermost = {}
  }
  // attempts to access innermost here would throw
}
// attempts to access inner here would throw
// attempts to access innermost here would throw" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> topmost = {}
{
  <span class="hljs-keyword">let</span> inner = {}
  {
    <span class="hljs-keyword">let</span> innermost = {}
  }
  <span class="hljs-comment">// attempts to access innermost here would throw</span>
}
<span class="hljs-comment">// attempts to access inner here would throw</span>
<span class="hljs-comment">// attempts to access innermost here would throw</span></code></pre>
<p>在<code>for</code>循环中使用<code>let</code>是一个很好的实践，这样定义的变量只会在当前块作用域内生效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 2; i++) {
  console.log(i)
  // <- 0
  // <- 1
}
console.log(i)
// <- i is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2</span>; i++) {
  <span class="hljs-built_in">console</span>.log(i)
  <span class="hljs-comment">// &lt;- 0</span>
  <span class="hljs-comment">// &lt;- 1</span>
}
<span class="hljs-built_in">console</span>.log(i)
<span class="hljs-comment">// &lt;- i is not defined</span></code></pre>
<p>考虑到<code>let</code>声明的变量在每一次循环的过程中都重复声明，这在处理异步函数时就很有效，不会发生使用<code>var</code>时产生的诡异的结果，我们看一个具体的例子。</p>
<p>我们先看看 <code>var</code> 声明的变量是怎么工作的，下述代码中 <code>i</code>变量 被绑定在 <code>printNumber</code> 函数作用域中，当每个回调函数被调用时，它的值会逐步升到10，但是当每个回调函数运行时（每100us）,此时的<code>i</code>的值已经是10了，因此每次打印的结果都是10.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function printNumbers() {
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i)
    }, i * 100)
  }
}
printNumbers()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printNumbers</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(i)
    }, i * <span class="hljs-number">100</span>)
  }
}
printNumbers()</code></pre>
<p>使用<code>let</code>,则会把<code>i</code>绑定到每一个块作用域中。每一次循环 <code>i</code> 的值还是在增加，但是每次其实都是创建了一个新的 <code>i</code> ，不同的 <code>i</code> 之间不会相互影响 ，因此打印出的就是预想的0到9了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function printNumbers() {
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i)
    }, i * 100)
  }
}
printNumbers()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printNumbers</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(i)
    }, i * <span class="hljs-number">100</span>)
  }
}
printNumbers()</code></pre>
<p>为了细致的讲述<code>let</code>的工作原理， 我们还需要弄懂一个名为 <code>Temporal Dead Zone</code> 的概念。</p>
<h3 id="articleHeader24">Temporal Dead Zone</h3>
<p>简言之，如果你的代码类似下面这样，就会报错。即在某个作用域中，在<code>let</code>声明之前调用了<code>let</code>声明的变量，导致的问题就是由于，Temporal Dead Zone（TDZ）的存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log(name)
  // <- ReferenceError: name is not defined
  let name = 'Stephen Hawking'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-built_in">console</span>.log(name)
  <span class="hljs-comment">// &lt;- ReferenceError: name is not defined</span>
  <span class="hljs-keyword">let</span> name = <span class="hljs-string">'Stephen Hawking'</span>
}</code></pre>
<p>如果定义的是一个函数，函数中引用了<code>name</code>变量则是可以的，但是这个函数并未在声明前执行则不会报错。如果<code>let</code>声明之前就调用了该函数，同样会导致TDZ。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不会报错
function readName() {
  return name
}
let name = 'Stephen Hawking'
console.log(readName())
// <- 'Stephen Hawking'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 不会报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readName</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> name
}
<span class="hljs-keyword">let</span> name = <span class="hljs-string">'Stephen Hawking'</span>
<span class="hljs-built_in">console</span>.log(readName())
<span class="hljs-comment">// &lt;- 'Stephen Hawking'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 会报错
function readName() {
  return name
}
console.log(readName())
// ReferenceError: name is not defined
let name = 'Stephen Hawking'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 会报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readName</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> name
}
<span class="hljs-built_in">console</span>.log(readName())
<span class="hljs-comment">// ReferenceError: name is not defined</span>
<span class="hljs-keyword">let</span> name = <span class="hljs-string">'Stephen Hawking'</span></code></pre>
<p>即使像下面这样<code>let</code>定义的变量没有被赋值，下面的代码也会报错，原因依旧是它试图在声明前访问一个被<code>let</code>定义的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readName() {
  return name
}
console.log(readName())
// ReferenceError: name is not defined
let name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readName</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> name
}
<span class="hljs-built_in">console</span>.log(readName())
<span class="hljs-comment">// ReferenceError: name is not defined</span>
<span class="hljs-keyword">let</span> name</code></pre>
<p>下面的代码则是可行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readName() {
  return name
}
let name
console.log(readName())
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readName</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> name
}
<span class="hljs-keyword">let</span> name
<span class="hljs-built_in">console</span>.log(readName())
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>TDZ的存在使得程序更容易报错，由于声明提升和不好的编码习惯常常会存在这样的问题。在ES6中则可以比较好的避免了这种问题了，需要注意的是<code>let</code>声明的变量同样存在声明提升。这意味着，<strong>变量会在我们进入块作用域时就会创建，TDZ也是在这时候创建的</strong>，它保证该变量不许被访问，只有在代码运行到<code>let</code>声明所在位置时，这时候TDZ才会消失，访问限制才会取消，变量才可以被访问。</p>
<h3 id="articleHeader25">Const 声明</h3>
<p><code>const</code>声明也具有类似<code>let</code>的块作用域，它同样具有<code>TDZ</code>机制。实际上，TDZ机制是因为<code>const</code>才被创建，随后才被应用到<code>let</code>声明中。<code>const</code>需要TDZ的原因是为了防止由于变量提升，在程序解析到<code>const</code>语句之前，对<code>const</code>声明的变量进行了赋值操作，这样是有问题的。</p>
<p>下面的代码表明，<code>const</code>具有和<code>let</code>一致的块作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pi = 3.1415
{
  const pi = 6
  console.log(pi)
  // <- 6
}
console.log(pi)
// <- 3.1415" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> pi = <span class="hljs-number">3.1415</span>
{
  <span class="hljs-keyword">const</span> pi = <span class="hljs-number">6</span>
  <span class="hljs-built_in">console</span>.log(pi)
  <span class="hljs-comment">// &lt;- 6</span>
}
<span class="hljs-built_in">console</span>.log(pi)
<span class="hljs-comment">// &lt;- 3.1415</span></code></pre>
<p>下面我们说说<code>const</code>和<code>let</code>的主要区别，<strong>首先<code>const</code>声明的变量在声明时必须赋值</strong>,否则会报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pi = 3.1415
const e // SyntaxError, missing initializer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> pi = <span class="hljs-number">3.1415</span>
<span class="hljs-keyword">const</span> e <span class="hljs-comment">// SyntaxError, missing initializer</span></code></pre>
<p>除了必须初始化，被<code>const</code>声明的变量不能再被赋予别的值。在严格模式下，试图改变<code>const</code>声明的变量会直接报错，在非严格模式下，改变被静默被忽略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const people = ['Tesla', 'Musk']
people = []
console.log(people)
// <- ['Tesla', 'Musk']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> people = [<span class="hljs-string">'Tesla'</span>, <span class="hljs-string">'Musk'</span>]
people = []
<span class="hljs-built_in">console</span>.log(people)
<span class="hljs-comment">// &lt;- ['Tesla', 'Musk']</span></code></pre>
<p>请注意，<code>const</code>声明的变量并非意味着，其对应的值是不可变的。真正不能变的是对该值的引用，下面我们具体说明这一点。</p>
<h4>通过const声明的变量值并非不可改变</h4>
<p>使用<code>const</code>只是意味着，变量将始终指向相同的对象或初始的值。这种引用是不可变的。但是值并非不可变。</p>
<p>下面的例子说明，虽然<code>people</code>的指向不可变，但是数组本身是可以被修改的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const people = ['Tesla', 'Musk']
people.push('Berners-Lee')
console.log(people)
// <- ['Tesla', 'Musk', 'Berners-Lee']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> people = [<span class="hljs-string">'Tesla'</span>, <span class="hljs-string">'Musk'</span>]
people.push(<span class="hljs-string">'Berners-Lee'</span>)
<span class="hljs-built_in">console</span>.log(people)
<span class="hljs-comment">// &lt;- ['Tesla', 'Musk', 'Berners-Lee']</span></code></pre>
<p><code>const</code>只是阻止变量引用另外一个值，下例中，尽管我们使用<code>const</code>声明了<code>people</code>,然后把它赋值给了<code>humans</code>,我们还是可以改变<code>humans</code>的指向，因为<code>humans</code>不是由<code>const</code>声明的，其引用可随意改变。<code>people</code> 是由 <code>const</code> 声明的，则不可改变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const people = ['Tesla', 'Musk']
var humans = people
humans = 'evil'
console.log(humans)
// <- 'evil'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> people = [<span class="hljs-string">'Tesla'</span>, <span class="hljs-string">'Musk'</span>]
<span class="hljs-keyword">var</span> humans = people
humans = <span class="hljs-string">'evil'</span>
<span class="hljs-built_in">console</span>.log(humans)
<span class="hljs-comment">// &lt;- 'evil'</span></code></pre>
<p>如果我们的目的是让值不可修改，我们需要借助函数的帮助，比如使用<code>Object.freeze</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const frozen = Object.freeze(
  ['Ice', 'Icicle', 'Ice cube']
)
frozen.push('Water')
// Uncaught TypeError: Can't add property 3
// object is not extensible" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> frozen = <span class="hljs-built_in">Object</span>.freeze(
  [<span class="hljs-string">'Ice'</span>, <span class="hljs-string">'Icicle'</span>, <span class="hljs-string">'Ice cube'</span>]
)
frozen.push(<span class="hljs-string">'Water'</span>)
<span class="hljs-comment">// Uncaught TypeError: Can't add property 3</span>
<span class="hljs-comment">// object is not extensible</span></code></pre>
<p>下面我们详细讨论一下<code>const</code>和<code>let</code>的优点</p>
<h3 id="articleHeader26">
<code>const</code>和<code>let</code>的优点</h3>
<p>新功能并不应该因为是新功能而被使用，ES6语法被使用的前提是它可以显著的提升我们代码的可读写和可维护性。<code>let</code>声明在大多数情况下，可以替换<code>var</code>以避免预期之外的问题。使用<code>let</code>你可以把声明在块的顶部进行而非函数的顶部进行。</p>
<p>有时，我们希望有些变量的引用不可变，这时候使用<code>const</code>就能防止很多问题的发生。下述代码中 在<code>checklist</code>函数外给<code>items</code>变量传递引用时就非常容易出错，它返回的<code>todo</code> API和<code>items</code>有了交互。当<code>items</code>变量被改为指向另外一个列表时，我们的代码就出问题了。<code>todo</code> API 用的还是<code>items</code>之前的值，<code>items</code>本身的指代则已经改变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var items = ['a', 'b', 'c']
var todo = checklist(items)
todo.check()
console.log(items)
// <- ['b', 'c']
items = ['d', 'e']
todo.check()
console.log(items)
// <- ['d', 'e'], would be ['c'] if items had been constant
function checklist(items) {
  return {
    check: () => items.shift()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> items = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]
<span class="hljs-keyword">var</span> todo = checklist(items)
todo.check()
<span class="hljs-built_in">console</span>.log(items)
<span class="hljs-comment">// &lt;- ['b', 'c']</span>
items = [<span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>]
todo.check()
<span class="hljs-built_in">console</span>.log(items)
<span class="hljs-comment">// &lt;- ['d', 'e'], would be ['c'] if items had been constant</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checklist</span>(<span class="hljs-params">items</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">check</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> items.shift()
  }
}</code></pre>
<p>这类问题很难debug，找到问题原因就会花费你很长一段时间。使用<code>const</code>运行时就会报错，可以帮助你可以避免这种问题。</p>
<p>如果我们默认只使用<code>cosnt</code>和<code>let</code>声明变量，所有的变量都会有一样的作用域规则，这让代码更易理解，由于<code>const</code>造成的影响最小，它还曾被提议作为默认的变量声明。</p>
<p>总的来说，<code>const</code>不允许重新指定值，使用的是块作用域，存在TDZ。<code>let</code>则允许重新指定值，其它方面和<code>const</code>类似，而<code>var</code>声明使用函数作用域，可以重新指定值，可以在未声明前调用，考虑到这些，推荐尽量不要使用<code>var</code>声明了。</p>
<h2 id="articleHeader27">有用的链接</h2>
<ul>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/ECMAScript%20%E5%92%8C%20JavaScript%E7%9A%84%E6%9C%AA%E6%9D%A5.md" rel="nofollow noreferrer" target="_blank">第一章 ECMAScript简史 和 JavaScript的未来</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC2%E7%AB%A0.%20ES6%20%E6%A6%82%E8%A6%81.md" rel="nofollow noreferrer" target="_blank">第二章 ES6 概要</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC3%E7%AB%A0.%20Classes%2CSymbols%2CObjects%20%E5%92%8C%20Decorators.md" rel="nofollow noreferrer" target="_blank">第三章 Classs,Symbols,Objects拓展 和 Decorators</a></p></li>
<li><p><a href="https://ponyfoo.com/books/practical-modern-javascript/chapters/2#read" rel="nofollow noreferrer" target="_blank">原文链接：ES6 Essentials</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript" rel="nofollow noreferrer" target="_blank">本书Github地址，期待交流</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重新认识ES6中的语法糖

## 原文链接
[https://segmentfault.com/a/1190000010159725](https://segmentfault.com/a/1190000010159725)


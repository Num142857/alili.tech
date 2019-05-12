---
title: '弄清Classs,Symbols,Objects拓展 和 Decorators' 
date: 2019-01-07 2:30:11
hidden: true
slug: 6nnz6mampkt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文翻译自 Nicolas Bevacqua 的书籍&nbsp;<a href="https://ponyfoo.com/books/practical-modern-javascript" rel="nofollow noreferrer" target="_blank">《Practical Modern JavaScript》</a>,这是该书的第三章。翻译采用意译并进行一定的删减和拓展，部分内容与原书有所不同。</p></blockquote>
<p>类（<code>classes</code>)可能是ES6提供的，我们使用最广的新功能之一了，它以原型链为基础，为我们提供了一种基于类编程的模式。<code>Symbol</code>是一种新的基本类型（JS中的第七种基本类型，另外六种为<code>undefined</code>、<code>null</code>、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）），它可以用来定义不可变值。本章，我们将首先讨论类和符号，之后我们还将对ES6对对象的拓展及处于<code>stage2</code>阶段的装饰器进行简单的讲解。</p>
<h2 id="articleHeader0">类</h2>
<p>我们知道，JavaScript是一门基于原型链的语言，ES6中的类和其它面向对象语言中的类在本质上有很大的不同，JavaScript中，类实际上是一种基于原型链的语法糖。</p>
<p>虽然如此，JavaScript中的类还是给我们的很多操作带来了方便，比如说可以轻易拓展其它类，通过简单的语法我们就可以拓展内置的<code>Array</code>了，在下文中我们将详细说明如何使用。</p>
<h3 id="articleHeader1">类基础</h3>
<p>基于已有的知识学习新知识是一种非常好的学习方法，对比学习可以让我们对新知识有更深的印象。由于JS中类实际上是一种基于原型链的语法糖，我们先简单复习基于原型链的JavaScript构造器要怎么使用，然后我们用ES6中类语法实现相同的功能作为对比。</p>
<p>下面代码中，我们新建了构造函数<code>Fruit</code>用以表示某种水果。该构造函数接收两个参数，水果的名称 -- <code>name</code>，水果的卡路里含量 -- <code>calaries</code>。在<code>Fruit</code>构造函数中我们设置了默认的块数 <code>pieces=1</code> ,通过原型链，我们还为该构造函数添加了两种方法：</p>
<ul>
<li><p><code>chop</code> 方法（切水果，每次调用会使得块数加一）；</p></li>
<li><p><code>bite</code>方法（接收一个名为<code>person</code>的参数，它是一个对象，每次调用，该 <code>person</code> 将吃掉一块水果，<code>person</code> 的饱腹感 <code>person.satiety </code> 将相应的增加，增加值为一块水果的<code>calaries</code>值，水果的总的卡路里值 <code>this.calories</code>将减少相应的值）。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Fruit(name, calories) {
  this.name = name
  this.calories = calories
  this.pieces = 1
}
Fruit.prototype.chop = function () {
  this.pieces++
}
Fruit.prototype.bite = function (person) {
  if (this.pieces < 1) {
    return
  }
  const calories = this.calories / this.pieces
  person.satiety += calories
  this.calories -= calories
  this.pieces--
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fruit</span>(<span class="hljs-params">name, calories</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.calories = calories
  <span class="hljs-keyword">this</span>.pieces = <span class="hljs-number">1</span>
}
Fruit.prototype.chop = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.pieces++
}
Fruit.prototype.bite = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">person</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pieces &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">const</span> calories = <span class="hljs-keyword">this</span>.calories / <span class="hljs-keyword">this</span>.pieces
  person.satiety += calories
  <span class="hljs-keyword">this</span>.calories -= calories
  <span class="hljs-keyword">this</span>.pieces--
}</code></pre>
<p>接下来我们创建一个<code>Fruit</code>构造函数的实例，调用三次 <code>chop</code> 方法将实例 <code>apple</code> 分为四块，新建<code>person</code>对象，传入并调用三次<code>bite</code>方法，把<code>apple</code> 吃掉三块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const person = { satiety: 0 }
const apple = new Fruit('apple', 140)
apple.chop()
apple.chop()
apple.chop()
apple.bite(person)
apple.bite(person)
apple.bite(person)
console.log(person.satiety)
// <- 105
console.log(apple.pieces)
// <- 1
console.log(apple.calories)
// <- 35" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> person = { <span class="hljs-attr">satiety</span>: <span class="hljs-number">0</span> }
<span class="hljs-keyword">const</span> apple = <span class="hljs-keyword">new</span> Fruit(<span class="hljs-string">'apple'</span>, <span class="hljs-number">140</span>)
apple.chop()
apple.chop()
apple.chop()
apple.bite(person)
apple.bite(person)
apple.bite(person)
<span class="hljs-built_in">console</span>.log(person.satiety)
<span class="hljs-comment">// &lt;- 105</span>
<span class="hljs-built_in">console</span>.log(apple.pieces)
<span class="hljs-comment">// &lt;- 1</span>
<span class="hljs-built_in">console</span>.log(apple.calories)
<span class="hljs-comment">// &lt;- 35</span></code></pre>
<p>作为对比，接下来我们使用类语法来实现上述代码一样的过程。在类中，我们显式使用<code>constructor</code>方法做为构造方法（其中<code>this</code>指向类的实例），在类中定义方法类似在对象字面量中定义方法，见下述代码中<code>chop</code>,<code>bite</code>的定义。类所有的方法都声明在<code>class</code>的块中，不需要再使用<code>Fruit.prototype</code>这类样本代码，从这个角度看与基于原型的语法比起来，类语法语义清晰，使用起来也显得简洁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Fruit {
  constructor(name, calories) {
    this.name = name
    this.calories = calories
    this.pieces = 1
  }
  chop() {
    this.pieces++
  }
  bite(person) {
    if (this.pieces < 1) {
      return
    }
    const calories = this.calories / this.pieces
    person.satiety += calories
    this.calories -= calories
    this.pieces--
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Fruit</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, calories) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.calories = calories
    <span class="hljs-keyword">this</span>.pieces = <span class="hljs-number">1</span>
  }
  chop() {
    <span class="hljs-keyword">this</span>.pieces++
  }
  bite(person) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pieces &lt; <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">const</span> calories = <span class="hljs-keyword">this</span>.calories / <span class="hljs-keyword">this</span>.pieces
    person.satiety += calories
    <span class="hljs-keyword">this</span>.calories -= calories
    <span class="hljs-keyword">this</span>.pieces--
  }
}</code></pre>
<p>虽然在类中定义方法和使用对象字面量类似，但是也有一个较大的不同点，那就是类中 <strong>方法之间不能使用逗号</strong> ，这是类语法的要求。这种要求帮助我们避免混用对象和类，类和对象本来也不一样，这种要求的另外一个好处在于为未来类的改进做下了铺垫，未来JS的类中可能还会添加<code>public</code>或<code>private</code>等。</p>
<p>和普通函数声明不同的是，类声明并<strong>不会被提升到作用域的顶部</strong>，因此提前调用会报错。</p>
<p>类声明有两种方法，一种是像函数声明和函数表达式一样，声明为表达式，如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Person = class {
  constructor(name) {
    this.name = name
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Person = <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name
  }
}</code></pre>
<p>类声明的另外一种语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const class Person{
  constructor(name) {
    this.name = name
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span></span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name
  }
}</code></pre>
<p>类还可以作为函数的返回值，这使得创建类工厂非常容易，如下代码中,箭头函数接收了一个名为<code>name</code>的参数，<code>super()</code>方法把这个参数反馈给其父类<code>Person</code>.这样就创建了一个基于<code>Person</code>的新类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里实际用到的是类的第一种声明方式
const createPersonClass = name => class extends Person {
  constructor() {
    super(name)
  }
}
const JakePerson = createPersonClass('Jake')
const jake = new JakePerson()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 这里实际用到的是类的第一种声明方式</span>
<span class="hljs-keyword">const</span> createPersonClass = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>(name)
  }
}
<span class="hljs-keyword">const</span> JakePerson = createPersonClass(<span class="hljs-string">'Jake'</span>)
<span class="hljs-keyword">const</span> jake = <span class="hljs-keyword">new</span> JakePerson()</code></pre>
<p>上面代码中的<code>extends</code>关键字表明这里使用到了类继承，稍后我们将详细讨论类继承，在此之前我们先仔细如何在类中定义属性和方法。</p>
<h3 id="articleHeader2">类中的属性和方法</h3>
<p>类声明中的<code>constructor</code>方法是可选的。如果省略，JS将为我们自动添加，下面用类声明和用常规构造函数声明的<code>Fruit</code>是一样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用类声明Fruit
class Fruit {
}

// 使用构造函数声明Fruit
function Fruit() {
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 用类声明Fruit</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Fruit</span> </span>{
}

<span class="hljs-comment">// 使用构造函数声明Fruit</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fruit</span>(<span class="hljs-params"></span>) </span>{
}</code></pre>
<p>所有传入类的参数，都将做为类中<code>constructor</code>的参数，如下所有传入<code>Log()</code>的参数都将作为<code>Log</code>中<code>constructor</code>的参数，这些参数将用以初始化类的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Log {
  constructor(...args) {
    console.log(args)
  }
}
new Log('a', 'b', 'c')
// <- ['a' 'b' 'c']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Log</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-built_in">console</span>.log(args)
  }
}
<span class="hljs-keyword">new</span> Log(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>)
<span class="hljs-comment">// &lt;- ['a' 'b' 'c']</span></code></pre>
<p>下面的代码中，我们定义了类<code>Counter</code>，在<code>constructor</code>中定义的代码会在实例化类时自动执行，这里我们在实例化时为实例添加了一个<code>count</code>属性，<code>next</code>属性前面添加了<code>get</code>,则表示类<code>Counter</code>的所有实例都有一个<code>next</code>属性，每次某实例访问<code>next</code>属性值时，其值都将+1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter {
  constructor(start) {
    this.count = start
  }
  get next() {
    return this.count++
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> </span>{
  <span class="hljs-keyword">constructor</span>(start) {
    <span class="hljs-keyword">this</span>.count = start
  }
  get next() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.count++
  }
}</code></pre>
<p>我们新建了<code>Counter</code>类的实例<code>counter</code>，可以发现每一次<code>counter</code>的<code>.next</code>被调用的时，<code>count</code>值增加1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const counter = new Counter(2)
console.log(counter.next)
//  2
console.log(counter.next)
//  3
console.log(counter.next)
//  4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> counter = <span class="hljs-keyword">new</span> Counter(<span class="hljs-number">2</span>)
<span class="hljs-built_in">console</span>.log(counter.next)
<span class="hljs-comment">//  2</span>
<span class="hljs-built_in">console</span>.log(counter.next)
<span class="hljs-comment">//  3</span>
<span class="hljs-built_in">console</span>.log(counter.next)
<span class="hljs-comment">//  4</span></code></pre>
<blockquote>
<p><code>getter</code> 绑定一个属性，其后为一个函数，每次该属性被访问，其后的函数将被执行；</p>
<p><code>setter</code> 语法绑定一个属性，其后跟着一个函数，当为该函数设置为某个值时，其后的函数将被调用；</p>
</blockquote>
<p>当结合使用<code>getter</code>和<code>setter</code>时，我们可以完成一些神奇的事情，下例中，我们定义了类<code>LocalStorage</code>，这个类使用提供的存储<code>key</code>，在读取<code>data</code>值时，实现了同时在<code>localStorage</code>中存储和取出相关数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class LocalStorage {
  constructor(key) {
    this.key = key
  }
  get data() {
    return JSON.parse(localStorage.getItem(this.key))
  }
  set data(data) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LocalStorage</span> </span>{
  <span class="hljs-keyword">constructor</span>(key) {
    <span class="hljs-keyword">this</span>.key = key
  }
  get data() {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-keyword">this</span>.key))
  }
  set data(data) {
    localStorage.setItem(<span class="hljs-keyword">this</span>.key, <span class="hljs-built_in">JSON</span>.stringify(data))
  }
}</code></pre>
<p>我们看看如何使用类<code>LocalStorage</code>：</p>
<p>新建<code>LocalStorage</code>的实例<code>ls</code>,传入<code>ls</code>的<code>key</code>为<code>groceries</code>,当我们设置<code>ls.data</code>为某个值时，该值将被转换为JSON对象字符串，并存储在<code>localStorage</code>中;当使用相应的<code>key</code>进行读取时，将提取出之前存储在<code>localStorage</code>中的内容，以JSON的格式进行解析后返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ls = new LocalStorage('groceries')
ls.data = ['apples', 'bananas', 'grapes']
console.log(ls.data)
// <- ['apples', 'bananas', 'grapes']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ls = <span class="hljs-keyword">new</span> LocalStorage(<span class="hljs-string">'groceries'</span>)
ls.data = [<span class="hljs-string">'apples'</span>, <span class="hljs-string">'bananas'</span>, <span class="hljs-string">'grapes'</span>]
<span class="hljs-built_in">console</span>.log(ls.data)
<span class="hljs-comment">// &lt;- ['apples', 'bananas', 'grapes']</span></code></pre>
<p>除了使用<code>getters</code>和<code>setters</code>,我们也可以定义常规的实例方法，继续之前定义过的<code>Fruit</code>类，我们再定义了一个可以吃水果的<code>Person</code>类，我们实例化一个<code>fruit</code>和一个<code>person</code>，然后让 <code>person</code> 吃 <code>fruit</code> 。这里我们让<code>person</code>吃完了所有的<code>fruit</code>，结果是<code>person</code>的<code>satiety</code>(饱食度)上升到了40。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor() {
    this.satiety = 0
  }
  eat(fruit) {
    while (fruit.pieces > 0) {
      fruit.bite(this)
    }
  }
}
const plum = new Fruit('plum', 40)
const person = new Person()
person.eat(plum)
console.log(person.satiety)
// <- 40" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.satiety = <span class="hljs-number">0</span>
  }
  eat(fruit) {
    <span class="hljs-keyword">while</span> (fruit.pieces &gt; <span class="hljs-number">0</span>) {
      fruit.bite(<span class="hljs-keyword">this</span>)
    }
  }
}
<span class="hljs-keyword">const</span> plum = <span class="hljs-keyword">new</span> Fruit(<span class="hljs-string">'plum'</span>, <span class="hljs-number">40</span>)
<span class="hljs-keyword">const</span> person = <span class="hljs-keyword">new</span> Person()
person.eat(plum)
<span class="hljs-built_in">console</span>.log(person.satiety)
<span class="hljs-comment">// &lt;- 40</span></code></pre>
<p>有时候我们可能会希望静态方法直接定义在类上，如果使用ES6之前的语法，我们需要将该方法直接添加于构造函数上，如下面的<code>Person.isPerson</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {
  this.hunger = 100
}
Person.prototype.eat = function () {
  this.hunger--
}
Person.isPerson = function (person) {
  return person instanceof Person
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.hunger = <span class="hljs-number">100</span>
}
Person.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.hunger--
}
Person.isPerson = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">person</span>) </span>{
  <span class="hljs-keyword">return</span> person <span class="hljs-keyword">instanceof</span> Person
}</code></pre>
<p>类语法则允许通过添加前缀<code>static</code>来定义静态方法<code>Persion.isPerson</code>，</p>
<p>下属代码我们给类<code>MathHelper</code>定义了一个静态方法<code>sum</code>，这个方法将用以计算实例化时所有传入参数的总和。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MathHelper {
  static sum(...numbers) {
    return numbers.reduce((a, b) => a + b)
  }
}
console.log(MathHelper.sum(1, 2, 3, 4, 5))
// <- 15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MathHelper</span> </span>{
  <span class="hljs-keyword">static</span> sum(...numbers) {
    <span class="hljs-keyword">return</span> numbers.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b)
  }
}
<span class="hljs-built_in">console</span>.log(MathHelper.sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>))
<span class="hljs-comment">// &lt;- 15</span></code></pre>
<h3 id="articleHeader3">类的继承</h3>
<p>ES6之前，你可以使用原型链来模拟类的继承，如下代码所示，我们新建了的构造函数<code>Banana</code>，用以拓展上文中定义的<code>Fruit</code>类，为了<code>Banana</code>能够正确初始化,我们需要在<code>Banana</code>中调用<code>Fruit.call(this, 'banana', 105)</code>,此外还需要显式的设置<code>Banana</code>的<code>prototype</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Banana() {
  Fruit.call(this, 'banana', 105)
}
Banana.prototype = Object.create(Fruit.prototype)
Banana.prototype.slice = function () {
  this.pieces = 12
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Banana</span>(<span class="hljs-params"></span>) </span>{
  Fruit.call(<span class="hljs-keyword">this</span>, <span class="hljs-string">'banana'</span>, <span class="hljs-number">105</span>)
}
Banana.prototype = <span class="hljs-built_in">Object</span>.create(Fruit.prototype)
Banana.prototype.slice = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.pieces = <span class="hljs-number">12</span>
}</code></pre>
<p>上述代码一点也称不上简洁，一般JS开发者会使用库来解决继承问题。比如说Node.js就提供了<code>util.inherits</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const util = require('util')
function Banana() {
  Fruit.call(this, 'banana', 105)
}
util.inherits(Banana, Fruit)
Banana.prototype.slice = function () {
  this.pieces = 12
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Banana</span>(<span class="hljs-params"></span>) </span>{
  Fruit.call(<span class="hljs-keyword">this</span>, <span class="hljs-string">'banana'</span>, <span class="hljs-number">105</span>)
}
util.inherits(Banana, Fruit)
Banana.prototype.slice = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.pieces = <span class="hljs-number">12</span>
}</code></pre>
<p>考虑到，banana除了有确定的<code>name</code>和<code>calories</code>,以及额外的<code>slice</code>方法（用来把banana切为12块）外，<code>Banana</code>构造函数和<code>Fruit</code>构造函数其实没有区别，我们可以在<code>Banana</code>中也执行<code>bite</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const person = { satiety: 0 }
const banana = new Banana()
banana.slice()
banana.bite(person)
console.log(person.satiety)
// <- 8.75
console.log(banana.pieces)
// <- 11
console.log(banana.calories)
// <- 96.25" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> person = { <span class="hljs-attr">satiety</span>: <span class="hljs-number">0</span> }
<span class="hljs-keyword">const</span> banana = <span class="hljs-keyword">new</span> Banana()
banana.slice()
banana.bite(person)
<span class="hljs-built_in">console</span>.log(person.satiety)
<span class="hljs-comment">// &lt;- 8.75</span>
<span class="hljs-built_in">console</span>.log(banana.pieces)
<span class="hljs-comment">// &lt;- 11</span>
<span class="hljs-built_in">console</span>.log(banana.calories)
<span class="hljs-comment">// &lt;- 96.25</span></code></pre>
<p>下面我们看看ES6为继承提供的解决方案，下述代码中，这里我们创建了一个继承自<code>Fruit</code>类的名为<code>Banana</code>的类。可以看出，这种语法非常清晰，我们无须彻底弄明白原型的机制就可以获得我们想要的结果，如果想给<code>Fruit</code>类传递参数，只需要使用<code>super</code>关键字即可。<code>super</code>关键字还可以用以调用存在于父类中的方法，比如说<code>super.chop</code>,<code>super</code>`constructor`外面的方法中也可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Banana extends Fruit {
  constructor() {
    super('banana', 105)
  }
  slice() {
    this.pieces = 12
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Banana</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Fruit</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>(<span class="hljs-string">'banana'</span>, <span class="hljs-number">105</span>)
  }
  slice() {
    <span class="hljs-keyword">this</span>.pieces = <span class="hljs-number">12</span>
  }
}</code></pre>
<p>基于JS函数的返回值可以是任何表达式，下面我们构建一个构造函数工厂，下面的代码定义了一个名为 <code>createJuicyFruit</code> 的函数，通过使用<code>super</code>我们可以给<code>Fruit</code>类传入<code>name</code>和<code>calories</code>,这样就轻松的实现了对<code>createJuicyFruit</code>类的拓展。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createJuicyFruit = (...params) =>
  class JuicyFruit extends Fruit {
    constructor() {
      this.juice = 0
      super(...params)
    }
    squeeze() {
      if (this.calories <= 0) {
        return
      }
      this.calories -= 10
      this.juice += 3
    }
  }
  
class Plum extends createJuicyFruit('plum', 30) {
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createJuicyFruit = <span class="hljs-function">(<span class="hljs-params">...params</span>) =&gt;</span>
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">JuicyFruit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Fruit</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
      <span class="hljs-keyword">this</span>.juice = <span class="hljs-number">0</span>
      <span class="hljs-keyword">super</span>(...params)
    }
    squeeze() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.calories &lt;= <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">this</span>.calories -= <span class="hljs-number">10</span>
      <span class="hljs-keyword">this</span>.juice += <span class="hljs-number">3</span>
    }
  }
  
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Plum</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">createJuicyFruit</span>('<span class="hljs-title">plum</span>', 30) </span>{
}</code></pre>
<p>接下来我们来讲述<code>Symbol</code>,了解<code>Symbol</code>对于之后我们理解迭代至关重要。</p>
<h2 id="articleHeader4">Symbols</h2>
<p>Symbol是ES6提供的一种新的JS基本类型。 它代表唯一值，和字符串，数值等基本类型的一个很大的不同点在于Symbol没有字符表达形式。Symbol的主要目的是用以实现协议，比如说，使用Symbol定义的迭代协议规定了对象将如何被迭代，关于这个，我们将在[Iterator Protocol and Iterable Protocol.]()这一章详细阐述。</p>
<p>ES6提供的Symbol有如下三种不同类型：</p>
<ul>
<li><p><code>local Symbol</code>；</p></li>
<li><p><code>global Symbol</code>；</p></li>
<li><p>语言内置<code>Symbol</code>；</p></li>
</ul>
<p>这三种类型的Symbol存在着一定的不同，我们一种种来讲解，首先看<code>local Symbol</code>。</p>
<h3 id="articleHeader5">Local Symbol</h3>
<p>Local Symbol 通过 <code>Symbol</code> 包装对象创建，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const first = Symbol()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> first = <span class="hljs-built_in">Symbol</span>()</code></pre>
<p>这里有一点特别值得我们注意，在<code>Number</code>或<code>String</code>等包装对象前是可以使用<code>new</code>操作符的，在<code>Symbol</code>前则不能使用，使用了会抛出错误，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const oops = new Symbol()
// <- TypeError, Symbol is not a constructor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> oops = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Symbol</span>()
<span class="hljs-comment">// &lt;- TypeError, Symbol is not a constructor</span></code></pre>
<p>为了方便调试，我们可以给新建的<code>Symbol</code>添加描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mystery = Symbol('my symbol')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> mystery = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'my symbol'</span>)</code></pre>
<p>和数值和字符串一样，Symbol是不可变的，但是和他们不同的是，Symbol是唯一的。描述并不影响唯一性，由具有相同描述的Symbol依旧是不相等的，下面代码说明了这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Number(3) === Number(3))
// <- true
console.log(Symbol() === Symbol())
// <- false
console.log(Symbol('my symbol') === Symbol('my symbol'))
// <- false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Number</span>(<span class="hljs-number">3</span>) === <span class="hljs-built_in">Number</span>(<span class="hljs-number">3</span>))
<span class="hljs-comment">// &lt;- true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>() === <span class="hljs-built_in">Symbol</span>())
<span class="hljs-comment">// &lt;- false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'my symbol'</span>) === <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'my symbol'</span>))
<span class="hljs-comment">// &lt;- false</span></code></pre>
<p>Symbols的类别为<code>symbol</code>，使用 <code>typeof</code> 可返回其类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof Symbol())
// <- 'symbol'
console.log(typeof Symbol('my symbol'))
// <- 'symbol'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>())
<span class="hljs-comment">// &lt;- 'symbol'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'my symbol'</span>))
<span class="hljs-comment">// &lt;- 'symbol'</span></code></pre>
<p>Symbols 可以用作对象的属性名，这里我们用<strong>计算属性名</strong>来说明该如何使用，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const weapon = Symbol('weapon')
const character = {
  name: 'Penguin',
  [weapon]: 'umbrella'
}
console.log(character[weapon])
// <- 'umbrella'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> weapon = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'weapon'</span>)
<span class="hljs-keyword">const</span> character = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Penguin'</span>,
  [weapon]: <span class="hljs-string">'umbrella'</span>
}
<span class="hljs-built_in">console</span>.log(character[weapon])
<span class="hljs-comment">// &lt;- 'umbrella'</span></code></pre>
<p>需要注意的是，许多传统的从对象中提取键的方法中对Symbol无效，也就是说他们获取不到Symbol。如下代码中的<code>for...in </code>,<code>Object,keys</code>,<code>Object.getOwnPropertyNames</code>都不能访问到 Symbol 类型的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key in character) {
  console.log(key)
  // <- 'name'
}
console.log(Object.keys(character))
// <- ['name']
console.log(Object.getOwnPropertyNames(character))
// <- ['name']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> character) {
  <span class="hljs-built_in">console</span>.log(key)
  <span class="hljs-comment">// &lt;- 'name'</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(character))
<span class="hljs-comment">// &lt;- ['name']</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getOwnPropertyNames(character))
<span class="hljs-comment">// &lt;- ['name']</span></code></pre>
<p>Symbol的这方面的特性使得ES6之前的没有使用Symbol的代码并不会由于Symbol的出现而受影响。如下代码中，我们将对象解析为JSON，结果中的符号属性被丢弃了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(JSON.stringify(character))
// <- '{&quot;name&quot;:&quot;Penguin&quot;}'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(character))
<span class="hljs-comment">// &lt;- '{"name":"Penguin"}'</span></code></pre>
<p>不过，Symbols绝不是一种用来隐藏属性的安全机制。采用特定的方法，它是可见的，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.getOwnPropertySymbols(character))
// <- [Symbol(weapon)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getOwnPropertySymbols(character))
<span class="hljs-comment">// &lt;- [Symbol(weapon)]</span></code></pre>
<p>这意味着，Symbols 并非不可枚举的，只是它对一般方法不可见而已，通过<code>Object.getOwnPropertySymbols</code>我们可以获取任何对象中的所有<code>Symbol</code>。</p>
<p>现在我们已经知道了 Symbol 该如何使用，下面我们再讨论下其使用场景。</p>
<h3 id="articleHeader6">Symbols的使用实例</h3>
<p>Symbol最重要的用途就是用以避免命名冲突了，如下代码中，我们给DOM元素添加了自定义的属性，使用Symbol不用担心属性与其它属性甚至之后JS语言会加入的属性相冲突：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cache = Symbol('calendar')
function createCalendar(el) {
  if (cache in el) { // does the symbol exist in the element?
    return el[cache] // use the cache to avoid re-instantiation
  }
  const api = el[cache] = {
    // the calendar API goes here
  }
  return api
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> cache = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'calendar'</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createCalendar</span>(<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">if</span> (cache <span class="hljs-keyword">in</span> el) { <span class="hljs-comment">// does the symbol exist in the element?</span>
    <span class="hljs-keyword">return</span> el[cache] <span class="hljs-comment">// use the cache to avoid re-instantiation</span>
  }
  <span class="hljs-keyword">const</span> api = el[cache] = {
    <span class="hljs-comment">// the calendar API goes here</span>
  }
  <span class="hljs-keyword">return</span> api
}</code></pre>
<p>ES6 还提供的一种名为<code>WeakMap</code>的新数据类型,它用于唯一地将对象映射到其他对象。和数组查找表比起来，<code>WeakMap</code>查找复杂度始终为O(1),我们将在 [Leveraging ECMAScript Collections]() 一章和其它ES6新增数据类型一起讨论这个。</p>
<h3 id="articleHeader7">使用符号定义协议</h3>
<p>前文中，我们说过 <code>Symbol</code> 可以用以定义协议。协议是定义行为的通信契约或约定。</p>
<p>下述代码中，我们给<code>character</code>对象有一个<code>toJSON</code>方法，这个方法，指定了对该对象使用<code>JSON.stringify</code>时被序列化的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const character = {
  name: 'Thor',
  toJSON: () => ({
    key: 'value'
  })
}
console.log(JSON.stringify(character))
// <- '&quot;{&quot;key&quot;:&quot;value&quot;}&quot;'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> character = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Thor'</span>,
  <span class="hljs-attr">toJSON</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>
  })
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(character))
<span class="hljs-comment">// &lt;- '"{"key":"value"}"'</span></code></pre>
<p>如果<code>toJSON</code>不是函数，对<code>character</code>对象执行<code>JSON.stringify</code>则会有不同的结果，<code>character</code>对象整体将被序列化。有时候这不是我们想要的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const character = {
  name: 'Thor',
  toJSON: true
}
console.log(JSON.stringify(character))
// <- '&quot;{&quot;name&quot;:&quot;Thor&quot;,&quot;toJSON&quot;:true}&quot;'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> character = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Thor'</span>,
  <span class="hljs-attr">toJSON</span>: <span class="hljs-literal">true</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(character))
<span class="hljs-comment">// &lt;- '"{"name":"Thor","toJSON":true}"'</span></code></pre>
<p>如果<code>toJSON</code>修饰符是Symbol类型，它就不会影响其它的对象属性了，不通过<code>Object.getOwnPropertySymbols</code>Symbol永远不会暴露出来的，以下代码中我们用<code>Symbol</code>自定义序列化函数<code>stringify</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const json = Symbol('alternative to toJSON')
const character = {
  name: 'Thor',
  [json]: () => ({
    key: 'value'
  })
}
function stringify(target) {
  if (json in target) {
    return JSON.stringify(target[json]())
  }
  return JSON.stringify(target)
}
stringify(character)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> json = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'alternative to toJSON'</span>)
<span class="hljs-keyword">const</span> character = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Thor'</span>,
  [json]: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>
  })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stringify</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-keyword">if</span> (json <span class="hljs-keyword">in</span> target) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(target[json]())
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(target)
}
stringify(character)</code></pre>
<p>使用 Symbol 需要我们使用计算属性名在对象字面量中定义 <code>json</code>，这样做我们定义的变量就不会和其它的用户定义的属性或者以后JS语言可能会加入的属性有冲突。</p>
<p>接下来我们继续讲解下一类符号--<code>global symbol</code>，这类符号可以跨代码域访问。</p>
<h3 id="articleHeader8">全局符号</h3>
<p>代码域指的是任何JavaScript表达式的执行上下文，它可以是你的应用当前运行的页面、页面中的<code>&lt;iframe&gt;</code>、由<code>eval</code>运行的脚本、任意类型的<code>worker</code>（<code>web worker</code>,<code>service workers</code>或者<code>shared workers</code>）等等。这些执行上下文每一种都有其全局对象，比如说页面的全局对象<code>window</code>，但是这种全局对象不能被其它代码域比如说<code>ServiceWorker</code>使用。相比而言，全局符号则更具全局性，它可以被任何代码域访问。</p>
<p>ES6提供了两个和全局符号相关的方法，<code>Symbol.for</code>和<code>Symbol.keyFor</code>。我们看看它们分别该如何使用？</p>
<h4>通过<code>Symbol.for(key)</code>获取symbols</h4>
<p><code>Symbol.for(key)</code>方法将在运行时的符号注册表中查找<code>key</code>,如果全局注册表中存在<code>key</code>则返回其对于的<code>Symbol</code>，如果不存在该<code>key</code>对于的Symbol，该方法会在全局注册表中创建一个新的<code>key</code>值为该<code>key</code>值的Symbol。这意味着，<code>Symbol.for(key)</code>是幂等的（多次执行，结果唯一），先进行查找，不存在则新创建，然后返回查找到的或新创建的Symbol。</p>
<p>我们看看使用示例，下面的代码中，</p>
<ul>
<li><p>第一次调用<code>Symbol.for</code>创建了一个key为<code>example</code>的Symbol，添加到到注册表，并返回了该Symbol；</p></li>
<li><p>第二次调用<code>Symbol.for</code>由于该<code>key</code>已经在注册表中存在，因此返回了之前创建的全局符号。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const example = Symbol.for('example')
console.log(example === Symbol.for('example'))
// <- true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> example = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">'example'</span>)
<span class="hljs-built_in">console</span>.log(example === <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">'example'</span>))
<span class="hljs-comment">// &lt;- true</span></code></pre>
<p>全局的符号注册表通过<code>key</code>标记符号，<code>key</code>还将作为新创建符号的描述信息。考虑到这些符号在运行时是全局的，在符号的key前添加前缀用以区分你的代码可以有效避免潜在的命名冲突。</p>
<h4>使用<code>Symbol.keyFor(symbol)</code>来提取符号的key</h4>
<p>比如说现存一个名为为<code>symbol</code>的全局符号，使用<code>Symbol.keyFor(symbol)</code>将返回全局注册表中该<code>symbol</code>对应的<code>key</code>值。我们看以下实例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const example = Symbol.for('example')
console.log(Symbol.keyFor(example))
// <- 'example'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> example = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">'example'</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>.keyFor(example))
<span class="hljs-comment">// &lt;- 'example'</span></code></pre>
<p>值得注意的是，如果符号非全局符号，该方法将返回<code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Symbol.keyFor(Symbol()))
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>.keyFor(<span class="hljs-built_in">Symbol</span>()))
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>在全局符号注册表中，使用<code>local Symbol</code>是匹配不到值的，即使它们的描述相同也是如此，local Symbol 不是全局符号注册表的一部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const example = Symbol.for('example')
console.log(Symbol.keyFor(Symbol('example')))
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> example = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">'example'</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>.keyFor(<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'example'</span>)))
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>全局符号相关的方法主要就是这两个了，下面我们看看该如何实际使用：</p>
<h4>全局符号实践</h4>
<p>某符号为全局符号意味着该符号可以被任何代码域获取，且在任何代码域中调用，它们都将返回相同的值。下面的例子，我们使用<code>Symbol.for</code>分别在页面中和<code>&lt;iframe&gt;</code>中查找key 为<code>example</code> 的Symbol，实践表明，它们是相同的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const d = document
const frame = d.body.appendChild(d.createElement('iframe'))
const framed = frame.contentWindow
const s1 = window.Symbol.for('example')
const s2 = framed.Symbol.for('example')
console.log(s1 === s2)
// <- true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> d = <span class="hljs-built_in">document</span>
<span class="hljs-keyword">const</span> frame = d.body.appendChild(d.createElement(<span class="hljs-string">'iframe'</span>))
<span class="hljs-keyword">const</span> framed = frame.contentWindow
<span class="hljs-keyword">const</span> s1 = <span class="hljs-built_in">window</span>.Symbol.for(<span class="hljs-string">'example'</span>)
<span class="hljs-keyword">const</span> s2 = framed.Symbol.for(<span class="hljs-string">'example'</span>)
<span class="hljs-built_in">console</span>.log(s1 === s2)
<span class="hljs-comment">// &lt;- true</span></code></pre>
<p>使用全局符号就像我们使用全局变量一样，合理使用在某些时候非常便利，但是不合理使用又会造成灾难。全局符号在符号需要跨代码域使用时非常有用，比如说跨<code>ServiceWorker</code>和浏览器页面，但是滥用会导致Symbol难易管理，容易冲突。</p>
<p>下面我们来看，最后一种Symbol，内置的常用Symbol。</p>
<h3 id="articleHeader9">内置的常用Symbol</h3>
<p>内置的常用Symbol为JS语言行为添加了钩子，在一定程度上允许你拓展和自定义JS语言。</p>
<p><code>Symbol.toPrimitive</code>符号，是描述如何通过 Symbols 给语言添加额外的功能的最好的例子，这个Symbol的作用是，依据给定的类型返回默认值。该函数接收一个<code>hint</code>参数，参数可以是<code>string</code>,<code>number</code>或<code>default</code>，用以指明默认值的期待类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const morphling = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return Infinity
    }
    if (hint === 'string') {
      return 'a lot'
    }
    return '[object Morphling]'
  }
}
console.log(+morphling) // + 号 
// <- Infinity
console.log(`That is ${ morphling }!`)
// <- 'That is a lot!'
console.log(morphling + ' is powerful')
// <- '[object Morphling] is powerful'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> morphling = {
  [<span class="hljs-built_in">Symbol</span>.toPrimitive](hint) {
    <span class="hljs-keyword">if</span> (hint === <span class="hljs-string">'number'</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">Infinity</span>
    }
    <span class="hljs-keyword">if</span> (hint === <span class="hljs-string">'string'</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">'a lot'</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">'[object Morphling]'</span>
  }
}
<span class="hljs-built_in">console</span>.log(+morphling) <span class="hljs-comment">// + 号 </span>
<span class="hljs-comment">// &lt;- Infinity</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`That is <span class="hljs-subst">${ morphling }</span>!`</span>)
<span class="hljs-comment">// &lt;- 'That is a lot!'</span>
<span class="hljs-built_in">console</span>.log(morphling + <span class="hljs-string">' is powerful'</span>)
<span class="hljs-comment">// &lt;- '[object Morphling] is powerful'</span></code></pre>
<p>另一个常用的内置Symbol是 <code>Symbol.match</code> ,该Symbol指定了匹配的是正则表达式而不是字符串，以<code>.startWith</code>,<code>.endWith</code>或<code>.includes</code>，这三个ES6提供新字符串方法为例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;/bar/&quot;.startsWith(/bar/); 
// Throws TypeError, 因为 /bar/ 是一个正则表达式

const text = '/an example string/'
const regex = /an example string/
regex[Symbol.match] = false
console.log(text.startsWith(regex))
// <- true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"/bar/"</span>.startsWith(<span class="hljs-regexp">/bar/</span>); 
<span class="hljs-comment">// Throws TypeError, 因为 /bar/ 是一个正则表达式</span>

<span class="hljs-keyword">const</span> text = <span class="hljs-string">'/an example string/'</span>
<span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/an example string/</span>
regex[<span class="hljs-built_in">Symbol</span>.match] = <span class="hljs-literal">false</span>
<span class="hljs-built_in">console</span>.log(text.startsWith(regex))
<span class="hljs-comment">// &lt;- true</span></code></pre>
<p>如果正则表达式没有通过Symbol修改，这里将抛出错误，因为<code>.startWith</code>方法希望其参数是一个字符串而非正则表达式。</p>
<h4>内置Symbol不在全局注册表中但是跨域共享</h4>
<p>这些内置的Symbol是跨代码域共享的，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const frame = document.createElement('iframe')
document.body.appendChild(frame)
Symbol.iterator === frame.contentWindow.Symbol.iterator
// <- true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> frame = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>)
<span class="hljs-built_in">document</span>.body.appendChild(frame)
<span class="hljs-built_in">Symbol</span>.iterator === frame.contentWindow.Symbol.iterator
<span class="hljs-comment">// &lt;- true</span></code></pre>
<p>需要注意的是，虽然语言内置的这些Symbol是跨代码块共享的，但是他们并不在全局符号注册表中，我们在下述代码中想要找到<code>Symbol.iterator</code>的<code>key</code>值，返回值是<code>undefined</code>就说明了这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Symbol.keyFor(Symbol.iterator))
// <- undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>.keyFor(<span class="hljs-built_in">Symbol</span>.iterator))
<span class="hljs-comment">// &lt;- undefined</span></code></pre>
<p>另外一个常用的符号是<code>Symbol.iterator</code>,它为每一个对象定义了默认的迭代器。我们将在下一章中详细讲述<code>Symbol.iterator</code>的细节内容。</p>
<h2 id="articleHeader10">内置对象的改进</h2>
<p>我们在<a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC2%E7%AB%A0.%20ES6%20%E6%A6%82%E8%A6%81.md" rel="nofollow noreferrer" target="_blank">ES6 概要</a>一章，已经讲述过ES6中对象字面量语法的改进，这里我们再补充一下内置对象新增的方法。</p>
<p>除了前面讨论过的<code>Object.getOwnPropertySymbols</code>，新增的对象方法还有<code>Object.assign</code>,<code>Object.is</code>以及<code>Object.setPrototypeOf</code>。</p>
<h3 id="articleHeader11">使用<code>Object.assign</code>来拓展对象</h3>
<p>我们在实际开发中常常使用各种库，一些库在允许我们自定义某些行为，不过为了使用方便这些库通常也给出了默认值，而我们的自定义常常就是在默认值的基础上进行的。</p>
<p>假如说现在有这么一个Markdown库。其接收一个 <code>input</code> 参数，依据<code>input</code>代表的Markdown内容，转换其为 Html 是其默认的用法，用户不需要提供其它参数就可以简单使用这个库。不过，该库还支持多个高级的配置，只是默认是关闭的，比如说通过配置可以添加<code>&lt;script&gt;</code>或<code>&lt;iframe&gt;</code>，可以启用 css 来高亮渲染代码片段。</p>
<p>比如说，该库的默认选项如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaults = {
  scripts: false,
  iframes: false,
  highlightSyntax: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> defaults = {
  <span class="hljs-attr">scripts</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">iframes</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">highlightSyntax</span>: <span class="hljs-literal">true</span>
}</code></pre>
<p>我们可以使用解构将<code>defaults</code>对象设置为<code>options</code>的默认值，在以前，如果用户想要自定义，用户必须提供每个选项的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function md(input, options=defaults) {
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">md</span>(<span class="hljs-params">input, options=defaults</span>) </span>{
}</code></pre>
<p><code>Object.assign</code> 就是为这种场景而生，这个方法可以非常方便的合并默认值和用户提供的值，如下代码所示，我们传入<code>{}</code>作为<code>Object.assign</code>的第一个参数，之后这个参数将不断与后面的参数对比合并，后面参数中的重复值将覆盖前面以后的值，待所有的比较合并完成，我们将获得最终的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function md(input, options) {
  const config = Object.assign({}, defaults, options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">md</span>(<span class="hljs-params">input, options</span>) </span>{
  <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">Object</span>.assign({}, defaults, options)
}</code></pre>
<blockquote>
<h4>理解<code>Object.assign</code>第一个参数的特殊意义</h4>
<p><code>Object.assign</code>的返回值是依据第一个参数而来的，第一个参数最终会修改为返回值，参数可看做<code>(target, ...sources)</code>,所有的 sources 都会被应用到<code>target</code>中。</p>
<p>如果这里我们的第一个参数不是一个空对象，而是<code>defaults</code>，那么<code>Object.assign()</code>执行结束之后，<code>defaults</code>对象的值也将被改变，虽然这里我们会得到和前面那个例子中一样的结果，但是由于<code>default</code>值被改变，在别的地方可能也会导致一些意想不到的问题。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function md(input, options) {
  const config = Object.assign(defaults, options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">md</span>(<span class="hljs-params">input, options</span>) </span>{
  <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">Object</span>.assign(defaults, options)
}</code></pre>
<blockquote><p>因此，最好把<code>Object.assign</code>的第一个参数始终设置为<code>{}</code>。</p></blockquote>
<p>下面的代码加深你对<code>Object.assign</code>的理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaults = {
  first: 'first',
  second: 'second'
}
function applyDefaults(options) {
  return Object.assign({}, defaults, options)
}
applyDefaults()
// <- { first: 'first', second: 'second' }
applyDefaults({ third: 3 })
// <- { first: 'first', second: 'second', third: 3 }
applyDefaults({ second: false })
// <- { first: 'first', second: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> defaults = {
  <span class="hljs-attr">first</span>: <span class="hljs-string">'first'</span>,
  <span class="hljs-attr">second</span>: <span class="hljs-string">'second'</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyDefaults</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, defaults, options)
}
applyDefaults()
<span class="hljs-comment">// &lt;- { first: 'first', second: 'second' }</span>
applyDefaults({ <span class="hljs-attr">third</span>: <span class="hljs-number">3</span> })
<span class="hljs-comment">// &lt;- { first: 'first', second: 'second', third: 3 }</span>
applyDefaults({ <span class="hljs-attr">second</span>: <span class="hljs-literal">false</span> })
<span class="hljs-comment">// &lt;- { first: 'first', second: false }</span></code></pre>
<p>需要注意的是，<code>Object.assign</code>只会考虑可枚举的属性（包括字符串属性和符号属性）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaults = {
  [Symbol('currency')]: 'USD'
}
const options = {
  price: '0.99'
}
Object.defineProperty(options, 'name', {
  value: 'Espresso Shot',
  enumerable: false
})
console.log(Object.assign({}, defaults, options))
// <- { [Symbol('currency')]: 'USD', price: '0.99' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> defaults = {
  [<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'currency'</span>)]: <span class="hljs-string">'USD'</span>
}
<span class="hljs-keyword">const</span> options = {
  <span class="hljs-attr">price</span>: <span class="hljs-string">'0.99'</span>
}
<span class="hljs-built_in">Object</span>.defineProperty(options, <span class="hljs-string">'name'</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-string">'Espresso Shot'</span>,
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.assign({}, defaults, options))
<span class="hljs-comment">// &lt;- { [Symbol('currency')]: 'USD', price: '0.99' }</span></code></pre>
<p>不过<code>Object.assign</code>也不是万能的，比如说其复制并非深复制，<code>Object.assign</code>不会对对象进行回归处理，值为对象的属性将会被<code>target</code>直接引用。</p>
<p>下例中，你可能希望<code>f</code>属性可以被添加到<code>target.a</code>，而保持<code>b.c</code>,<code>b.d</code>不变，但是实际上，当使用<code>Object.assign</code>时，<code>b.c</code>和<code>b.d</code>属性丢失了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign({}, { a: { b: 'c', d: 'e' } }, { a: { f: 'g' } })
// <- { a: { f: 'g' } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.assign({}, { <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: <span class="hljs-string">'c'</span>, <span class="hljs-attr">d</span>: <span class="hljs-string">'e'</span> } }, { <span class="hljs-attr">a</span>: { <span class="hljs-attr">f</span>: <span class="hljs-string">'g'</span> } })
<span class="hljs-comment">// &lt;- { a: { f: 'g' } }</span></code></pre>
<p>同样的，数据也存在类似的问题，以下代码中，如果你期待<code>Object.assign</code>进行递归处理，你将大失所望。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign({}, { a: ['b', 'c', 'd'] }, { a: ['e', 'f'] })
// <- { a: ['e', 'f'] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.assign({}, { <span class="hljs-attr">a</span>: [<span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>] }, { <span class="hljs-attr">a</span>: [<span class="hljs-string">'e'</span>, <span class="hljs-string">'f'</span>] })
<span class="hljs-comment">// &lt;- { a: ['e', 'f'] }</span></code></pre>
<p>在本书写作过程中，存在一个处于<code>stage 3</code>的ECMAScript提议，用以在对象中使用拓展符，其使用类似于数组等可迭代对象。对对象使用拓展和使用<code>Object.assign</code>的结果类似。</p>
<p>下述代码展示了对象拓展符的使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const grocery = { ...details }
// Object.assign({}, details)
const grocery = { type: 'fruit', ...details }
// Object.assign({ type: 'fruit' }, details)
const grocery = { type: 'fruit', ...details, ...fruit }
// Object.assign({ type: 'fruit' }, details, fruit)
const grocery = { type: 'fruit', ...details, color: 'red' }
// Object.assign({ type: 'fruit' }, details, { color: 'red' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> grocery = { ...details }
<span class="hljs-comment">// Object.assign({}, details)</span>
<span class="hljs-keyword">const</span> grocery = { <span class="hljs-attr">type</span>: <span class="hljs-string">'fruit'</span>, ...details }
<span class="hljs-comment">// Object.assign({ type: 'fruit' }, details)</span>
<span class="hljs-keyword">const</span> grocery = { <span class="hljs-attr">type</span>: <span class="hljs-string">'fruit'</span>, ...details, ...fruit }
<span class="hljs-comment">// Object.assign({ type: 'fruit' }, details, fruit)</span>
<span class="hljs-keyword">const</span> grocery = { <span class="hljs-attr">type</span>: <span class="hljs-string">'fruit'</span>, ...details, <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span> }
<span class="hljs-comment">// Object.assign({ type: 'fruit' }, details, { color: 'red' })</span></code></pre>
<p>该提案也包含对象剩余值，使用和数组剩余值类似。</p>
<p>下面是对象剩余值的使用实例，就像数组剩余值一样，其需要位于结构的最后面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getUnknownProperties = ({ name, type, ...unknown }) =>  unknown
getUnknownProperties({
  name: 'Carrot',
  type: 'vegetable',
  color: 'orange'
})
// <- { color: 'orange' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getUnknownProperties = <span class="hljs-function">(<span class="hljs-params">{ name, type, ...unknown }</span>) =&gt;</span>  unknown
getUnknownProperties({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Carrot'</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-string">'vegetable'</span>,
  <span class="hljs-attr">color</span>: <span class="hljs-string">'orange'</span>
})
<span class="hljs-comment">// &lt;- { color: 'orange' }</span></code></pre>
<p>我们可以利用类似的方法在变量声明时解构对象，下例中，每一个未明确指明的属性都将位于<code>meta</code>对象中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { name, type, ...meta } = {
  name: 'Carrot',
  type: 'vegetable',
  color: 'orange'
}
// <- name = 'Carrot'
// <- type = 'vegetable'
// <- meta = { color: 'orange' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { name, type, ...meta } = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Carrot'</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-string">'vegetable'</span>,
  <span class="hljs-attr">color</span>: <span class="hljs-string">'orange'</span>
}
<span class="hljs-comment">// &lt;- name = 'Carrot'</span>
<span class="hljs-comment">// &lt;- type = 'vegetable'</span>
<span class="hljs-comment">// &lt;- meta = { color: 'orange' }</span></code></pre>
<p>我们将在[Practical Considerations.]()一章再详细讨论对象解构和剩余值。</p>
<h3 id="articleHeader12">使用<code>Object.is</code>对比对象</h3>
<p><code>Object.is</code>方法和严格相等运算符<code>===</code>略有不同。主要表现在两个地方，<code>NaN</code>以及，<code>-0</code>和<code>0</code>。</p>
<p>当<code>NaN</code>与<code>NaN</code>相比较时，严格相等运算符<code>===</code>将返回<code>false</code>,因为<code>NaN</code>和本身也不相等，<code>Object.is</code>则在这种情况下返回<code>true</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NaN === NaN
// <- false
Object.is(NaN, NaN)
// <- true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>
<span class="hljs-comment">// &lt;- false</span>
<span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>)
<span class="hljs-comment">// &lt;- true</span></code></pre>
<p>使用严格相等运算符比较<code>0</code>和<code>-0</code>会得到<code>true</code>,而使用<code>Object.is</code>则会返回<code>false</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-0 === +0
// <- true
Object.is(-0, +0)
// <- false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">-0</span> === +<span class="hljs-number">0</span>
<span class="hljs-comment">// &lt;- true</span>
<span class="hljs-built_in">Object</span>.is(<span class="hljs-number">-0</span>, +<span class="hljs-number">0</span>)
<span class="hljs-comment">// &lt;- false</span></code></pre>
<h3 id="articleHeader13">Object.setPrototpyeOf</h3>
<p><code>Object.setPrototypeOf</code>，名如其意，它用以设置某个对象的原型指向的对象。与遗留方法<code>__proto__</code>相比，它是被认可的设置对象原型的方法。</p>
<p>还记得吗，我们在ES5中引入了<code>Object.create</code>，这个方法允许我们以任何传递给<code>Object.create</code>的参数作为新建对象的原型链：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const baseCat = { type: 'cat', legs: 4 }
const cat = Object.create(baseCat)
cat.name = 'Milanesita'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> baseCat = { <span class="hljs-attr">type</span>: <span class="hljs-string">'cat'</span>, <span class="hljs-attr">legs</span>: <span class="hljs-number">4</span> }
<span class="hljs-keyword">const</span> cat = <span class="hljs-built_in">Object</span>.create(baseCat)
cat.name = <span class="hljs-string">'Milanesita'</span></code></pre>
<p><code>Object.create</code>方法只能在新创建的对象时指定原型，<code>Object.setPrototypeOf</code>则可以用以改变任何已经存在的对象的原型链：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const baseCat = { type: 'cat', legs: 4 }
const cat = Object.setPrototypeOf(
  { name: 'Milanesita' },
  baseCat
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> baseCat = { <span class="hljs-attr">type</span>: <span class="hljs-string">'cat'</span>, <span class="hljs-attr">legs</span>: <span class="hljs-number">4</span> }
<span class="hljs-keyword">const</span> cat = <span class="hljs-built_in">Object</span>.setPrototypeOf(
  { <span class="hljs-attr">name</span>: <span class="hljs-string">'Milanesita'</span> },
  baseCat
)</code></pre>
<p>与<code>Object.create</code>比起来，<code>Object.setPrototypeOf</code>具有严重的性能问题，因此在如果你很在乎这个，使用前应好好考虑。</p>
<blockquote>
<h4>对性能问题的说明</h4>
<p>使用<code>Object.setPrototypeOf</code>来改变一个对象的原型是一个昂贵的操作，MDN是这样解释的：<br>由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 obj.__proto__ = ... 语句上的时间花费，而且可能会延伸到任何代码，那些可以访问任何[[Prototype]]已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。</p>
</blockquote>
<h3 id="articleHeader14">装饰器(Decorators)</h3>
<p>对于大多数编程语言而言，装饰器不是一个新概念。在现代编程语言中，装饰器模式相当常见，c# 中 有<code>attributes</code>,Java中有<code>annotations</code>，Python中有<code>decorators</code>等等。目前也存在一个处于Stage2 的JavaScript的装饰器提案。</p>
<p>JavaScript中的装饰器语法和Python的非常类似。JavaScript的装饰器可以应用于任何对象或者静态声明的属性前。诸如对象字面量声明或<code>class</code>声明前，或<code>get</code>,<code>set</code>,<code>static</code>前。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@inanimate
class Car {}

@expensive
@speed('fast')
class Lamborghini extends Car {}

class View {
  @throttle(200) // reconcile once every 200ms at most
  reconcile() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@inanimate
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{}

@expensive
@speed(<span class="hljs-string">'fast'</span>)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lamborghini</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Car</span> </span>{}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">View</span> </span>{
  @throttle(<span class="hljs-number">200</span>) <span class="hljs-comment">// reconcile once every 200ms at most</span>
  reconcile() {}
}</code></pre>
<p>关于装饰器凹凸实验室的一篇文章解释的比较清楚，大家可以参考<a href="https://aotu.io/notes/2016/10/24/decorator/index.html" rel="nofollow noreferrer" target="_blank">Javascript 中的装饰器</a>。</p>
<blockquote>
<p>当装饰器作用于类本身的时候，我们操作的对象也是这个类本身，而当装饰器作用于类的某个具体的属性的时候，我们操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor），而描述符里记录着我们对这个属性的全部信息，所以，我们可以对它自由的进行扩展和封装，最后达到的目的呢，就和之前说过的装饰器的作用是一样的。可以看如下两段代码加深理解</p>
<p><strong>作用于类时</strong></p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function isAnimal(target) {
    target.isAnimal = true;
      return target;
}
@isAnimal
class Cat {
    ...
}
console.log(Cat.isAnimal);    // true

// 相当于
    
Cat = isAnimal(function Cat() { ... });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isAnimal</span>(<span class="hljs-params">target</span>) </span>{
    target.isAnimal = <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">return</span> target;
}
@isAnimal
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> </span>{
    ...
}
<span class="hljs-built_in">console</span>.log(Cat.isAnimal);    <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 相当于</span>
    
Cat = isAnimal(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params"></span>) </span>{ ... });
</code></pre>
<blockquote><p><strong>作用于类属性时</strong></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readonly(target, name, descriptor) {
    discriptor.writable = false;
    return discriptor;
}
class Cat {
    @readonly
    say() {
        console.log(&quot;meow ~&quot;);
    }
}
var kitty = new Cat();
kitty.say = function() {
    console.log(&quot;woof !&quot;);
}
kitty.say()    // meow ~

// 相当于
let descriptor = {
    value: function() {
        console.log(&quot;meow ~&quot;);
    },
    enumerable: false,
    configurable: true,
    writable: true
};
descriptor = readonly(Cat.prototype, &quot;say&quot;, descriptor) || descriptor;
Object.defineProperty(Cat.prototype, &quot;say&quot;, descriptor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readonly</span>(<span class="hljs-params">target, name, descriptor</span>) </span>{
    discriptor.writable = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> discriptor;
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> </span>{
    @readonly
    say() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"meow ~"</span>);
    }
}
<span class="hljs-keyword">var</span> kitty = <span class="hljs-keyword">new</span> Cat();
kitty.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"woof !"</span>);
}
kitty.say()    <span class="hljs-comment">// meow ~</span>

<span class="hljs-comment">// 相当于</span>
<span class="hljs-keyword">let</span> descriptor = {
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"meow ~"</span>);
    },
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>
};
descriptor = readonly(Cat.prototype, <span class="hljs-string">"say"</span>, descriptor) || descriptor;
<span class="hljs-built_in">Object</span>.defineProperty(Cat.prototype, <span class="hljs-string">"say"</span>, descriptor);</code></pre>
<h2 id="articleHeader15">有用的链接</h2>
<ul>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/ECMAScript%20%E5%92%8C%20JavaScript%E7%9A%84%E6%9C%AA%E6%9D%A5.md" rel="nofollow noreferrer" target="_blank">第一章 ECMAScript简史 和 JavaScript的未来</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC2%E7%AB%A0.%20ES6%20%E6%A6%82%E8%A6%81.md" rel="nofollow noreferrer" target="_blank">第二章 ES6 概要</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC3%E7%AB%A0.%20Classes%2CSymbols%2CObjects%20%E5%92%8C%20Decorators.md" rel="nofollow noreferrer" target="_blank">第三章 Classs,Symbols,Objects拓展 和 Decorators</a></p></li>
<li><p><a href="https://github.com/mjavascript/practical-modern-javascript/blob/master/ch03.asciidoc" rel="nofollow noreferrer" target="_blank">本章原文链接</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript" rel="nofollow noreferrer" target="_blank">本书Github地址，期待交流</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
弄清Classs,Symbols,Objects拓展 和 Decorators

## 原文链接
[https://segmentfault.com/a/1190000010341292](https://segmentfault.com/a/1190000010341292)


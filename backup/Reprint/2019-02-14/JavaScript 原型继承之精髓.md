---
title: 'JavaScript 原型继承之精髓' 
date: 2019-02-14 2:30:37
hidden: true
slug: mqqtg7nmv3
categories: [reprint]
---

{{< raw >}}

                    
<p>一篇文章让你搞清楚 JavaScript 继承的本质、<code>prototype</code>、<code>__proto__</code>、<code>constructor</code> 都是什么。</p>
<p>很多小伙伴表示不明白 JavaScript 的继承，说是原型链，看起来又像类，究竟是原型还是类？各种 <code>prototype</code>、<code>__proto__</code>、<code>constructor</code> 内部变量更是傻傻搞不清楚。其实，只要明白继承的本质就很能理解，继承是为了代码复用。复用并不一定得通过类，JS 就采用了一种轻量简明的原型方案来实现。Java/C++ 等强类型语言中有类和对象的区别，但 JS 只有对象。它的原型也是对象。只要你完全抛开面向对象的继承思路来看 JS 的原型继承，你会发现它轻便但强大。</p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>继承方案的设计要求</li>
<li>被复用的对象：<code>prototype</code>
</li>
<li>优雅的 API：ES6 <code>class</code>
</li>
<li>简明的向上查找机制：<code>__proto__</code>
</li>
<li>构造函数又是个啥玩意儿</li>
<li>双链合璧：终极全图</li>
<li>总结</li>
<li>参考</li>
</ul>
<h2 id="articleHeader1">继承方案的设计要求</h2>
<p>前面我们讲，继承的本质是为了更好地实现代码复用。再仔细思考，可以发现，这里的「代码」指的一定是「数据+行为」的复用，也就是把一组数据和数据相关的行为进行封装。为什么呢？因为，如果只是复用行为，那么使用函数就足够了；而如果只是复用数据，这使用 JavaScript 对象就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const parent = {
  some: 'data',
}
const child = {
  ...parent,
  uniq: 'data',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> parent = {
  <span class="hljs-attr">some</span>: <span class="hljs-string">'data'</span>,
}
<span class="hljs-keyword">const</span> child = {
  ...parent,
  <span class="hljs-attr">uniq</span>: <span class="hljs-string">'data'</span>,
}</code></pre>
<p>因此，只有数据+行为（已经类似于一个「对象」的概念）的封装，才是继承技术所必须出现的地方。为了满足这样的代码复用，一个继承体系的设计需要支持什么需求呢？</p>
<ul>
<li>存储公用的数据和函数</li>
<li>覆盖被继承对象数据或函数的能力</li>
<li>向上查找/调用被继承对象函数的数据或函数的能力</li>
<li>优雅的语法（API）</li>
<li>增加新成员的能力</li>
<li>支持私有数据</li>
</ul>
<p>「支持私有数据」，这个基本所有方案都没实现，此阶段我们可以不用纠结；而「增加新成员的能力」，基本所有的方案都能做到，也不再赘述，主要来看前四点。</p>
<h2 id="articleHeader2">被复用的对象：<code>prototype</code>
</h2>
<p>JavaScript 的继承有多种实现方式，具体有哪些，推荐读者可阅读：[JavaScript 语言精粹][]一书 和 <a href="https://github.com/mqyqingfeng/Blog/issues/16" rel="nofollow noreferrer" target="_blank">这篇文章</a>。这里，我们直接看一版比较优秀的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(name) {
  this.name = name
  this.getName = function() {
    return this.name
  }
}

function Cat(name, age) {
  Animal.call(this, name)
  this.age = age || 1
  this.meow = function() {
    return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`
  }
}

const cat = new Cat('Lily', 2)
console.log(cat.meow()) // 'Lilyeowww~~~~~, I'm 2 year(s) old'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name, age</span>) </span>{
  Animal.call(<span class="hljs-keyword">this</span>, name)
  <span class="hljs-keyword">this</span>.age = age || <span class="hljs-number">1</span>
  <span class="hljs-keyword">this</span>.meow = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.getName()}</span>eowww~~~~~, I'm <span class="hljs-subst">${<span class="hljs-keyword">this</span>.age}</span> year(s) old`</span>
  }
}

<span class="hljs-keyword">const</span> cat = <span class="hljs-keyword">new</span> Cat(<span class="hljs-string">'Lily'</span>, <span class="hljs-number">2</span>)
<span class="hljs-built_in">console</span>.log(cat.meow()) <span class="hljs-comment">// 'Lilyeowww~~~~~, I'm 2 year(s) old'</span></code></pre>
<p>这个方案，具备增添新成员的能力、调用被继承对象函数的能力等。一个比较重大的缺陷是：对象的所有方法 <code>getName</code> <code>meow</code>，都会随每个实例生成一份新的拷贝。这显然不是优秀的设计方案，我们期望的结果是，继承自同一对象的子对象，其所有的方法都共享自同一个函数实例。</p>
<p>怎么办呢？想法也很简单，就是把它们放到同一个地方去，并且还要跟这个「对象」关联起来。如此一想，用来生成这个「对象」的函数本身就是很好的地方。我们可以把它放在函数的任一一个变量上，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Animal.functions.getName = function() {
  return this.name
}
Cat.functions.meow = function() {
  return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Animal.functions.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
}
Cat.functions.meow = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.getName()}</span>eowww~~~~~, I'm <span class="hljs-subst">${<span class="hljs-keyword">this</span>.age}</span> year(s) old`</span>
}</code></pre>
<p>但这样调用起来，你就要写 <code>animal.functions.getName()</code>，并不方便。不要怕，JavaScript 这门语言本身已经帮你内置了这样的支持。它内部所用来存储公共函数的变量，就是你熟知的 <code>prototype</code>。当你调用对象上的方法时（如 <code>cat.getName()</code>），它会自动去 <code>Cat.prototype</code> 上去帮你找 <code>getName</code> 函数，而你只需要写 <code>cat.getName()</code> 即可。兼具了功能的实现和语法的优雅。</p>
<p>最后写出来的代码会是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(name) {
  this.name = name
}
Animal.prototype.getName = function() {
  return this.name
}

function Cat(name, age) {
  Animal.call(this, name)
  this.age = age || 1
}
Cat.prototype = Object.create(Animal.prototype, { constructor: Cat })
Cat.prototype.meow = function() {
  return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
}
Animal.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name, age</span>) </span>{
  Animal.call(<span class="hljs-keyword">this</span>, name)
  <span class="hljs-keyword">this</span>.age = age || <span class="hljs-number">1</span>
}
Cat.prototype = <span class="hljs-built_in">Object</span>.create(Animal.prototype, { <span class="hljs-attr">constructor</span>: Cat })
Cat.prototype.meow = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.getName()}</span>eowww~~~~~, I'm <span class="hljs-subst">${<span class="hljs-keyword">this</span>.age}</span> year(s) old`</span>
}</code></pre>
<p>请注意，<strong>只有函数才有 <code>prototype</code> 属性</strong>，它是用来做原型继承的必需品。</p>
<h2 id="articleHeader3">优雅的 API：ES6 <code>class</code>
</h2>
<p>然鹅，上面这个写法仍然并不优雅。在何处呢？一个是 <code>prototype</code> 这种暴露语言实现机制的关键词；一个是要命的是，这个函数内部的 <code>this</code>，依靠的是作为使用者的你记得使用 <code>new</code> 操作符去调用它才能得到正确的初始化。但是这里没有任何线索告诉你，应该使用 <code>new</code> 去调用这个函数，一旦你忘记了，也不会有任何编译期和运行期的错误信息。这样的语言特性，与其说是一个「继承方案」，不如说是一个 bug，一个不应出现的设计失误。</p>
<p>而这两个问题，在 ES6 提供的 <code>class</code> 关键词下，已经得到了非常妥善的解决，尽管它叫一个 class，但本质上其实是通过 prototype 实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class Cat extends Animal {
  constructor(name, age) {
    super(name)
    this.age = age || 1
  }

  meow() {
    return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name
  }

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, age) {
    <span class="hljs-keyword">super</span>(name)
    <span class="hljs-keyword">this</span>.age = age || <span class="hljs-number">1</span>
  }

  meow() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.getName()}</span>eowww~~~~~, I'm <span class="hljs-subst">${<span class="hljs-keyword">this</span>.age}</span> year(s) old`</span>
  }
}</code></pre>
<ul>
<li>如果你没有使用 <code>new</code> 操作符，编译器和运行时都会直接报错。为什么呢，我们将在[下一篇文章][]讲解</li>
<li>
<code>extends</code> 关键字，会使解释器直接在底下完成基于原型的继承功能</li>
</ul>
<p>现在，我们已经看到了一套比较完美的继承 API，也看到其底下使用 <code>prototype</code> 存储公共变量的地点和原理。接下来，我们要解决另外一个问题：<code>prototype</code> 有了，实例对象应该如何访问到它呢？这就关系到 JavaScript 的向上查找机制了。</p>
<h2 id="articleHeader4">简明的向上查找机制：<code>__proto__</code>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(name) {
  this.name = name
}
Animal.prototype.say = function() {
  return this.name
}
const cat = new Animal('kitty')

console.log(cat) // Animal { name: 'kitty' }
cat.hasOwnProperty('say') // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
}
Animal.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
}
<span class="hljs-keyword">const</span> cat = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'kitty'</span>)

<span class="hljs-built_in">console</span>.log(cat) <span class="hljs-comment">// Animal { name: 'kitty' }</span>
cat.hasOwnProperty(<span class="hljs-string">'say'</span>) <span class="hljs-comment">// false</span></code></pre>
<p>看上面 👆 一个最简单的例子。打出来的 <code>cat</code> 对象本身并没有 <code>say</code> 方法。那么，被实例化的 <code>cat</code> 对象本身，是怎样向上查找到 <code>Animal.prototype</code> 上的 <code>say</code> 方法的呢？如果你是 JavaScript 引擎的设计者，你会怎样来实现呢？</p>
<p>我拍脑袋这么一想，有几种方案：</p>
<ul>
<li>在 <code>Animal</code> 中初始化实例对象 <code>cat</code> 时，顺便存取一个指向 <code>Animal.prototype</code> 的引用</li>
<li>在 <code>Animal</code> 中初始化实例对象时，记录其「类型」（也即是 <code>Animal</code>）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方案1
function Animal(name) {
  this.name = name
  // 以下代码由引擎自动加入
  this.__prototype__ = Animal.prototype
}

const cat = new Animal('kitty')
cat.say() // -> cat.__prototype__.say()

// 方案2
function Animal(name) {
  this.name = name
  // 以下代码由引擎自动加入
  this.__type__ = Animal
}

const cat = new Animal('kitty')
cat.say() // -> cat.__type__.prototype.say()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方案1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-comment">// 以下代码由引擎自动加入</span>
  <span class="hljs-keyword">this</span>.__prototype__ = Animal.prototype
}

<span class="hljs-keyword">const</span> cat = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'kitty'</span>)
cat.say() <span class="hljs-comment">// -&gt; cat.__prototype__.say()</span>

<span class="hljs-comment">// 方案2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-comment">// 以下代码由引擎自动加入</span>
  <span class="hljs-keyword">this</span>.__type__ = Animal
}

<span class="hljs-keyword">const</span> cat = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'kitty'</span>)
cat.say() <span class="hljs-comment">// -&gt; cat.__type__.prototype.say()</span></code></pre>
<p>究其实质，其实就是：<strong>实例对象需要一个指向其函数的引用（变量）</strong>，以拿到这个公共原型 <code>prototype</code> 来实现继承方案的向上查找能力。读者如果有其他方案，不妨留言讨论。</p>
<p>无独有偶，这两种方案，在 JavaScript 中都有实现，只不过变量的命名与我们的取法有所差异：第一种方案中，实际的变量名叫 <code>__proto__</code> 而不是 <code>__prototype__</code>；第二种方案中，实际的变量名叫 <code>constructor</code>，不叫<del>俗气的</del> <code>__type__</code>。实际上，用来实现继承、做向上查找的这个引用，正是 <code>__proto__</code>；至于 constructor，则另有他用。不过要注意的是，尽管基本所有浏览器都支持 <code>__proto__</code>，它并不是规范的一部分，因此并不推荐在你的业务代码中直接使用 <code>__proto__</code> 这个变量。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016828689" src="https://static.alili.tech/img/remote/1460000016828689" alt="JavaScript Prototypal Inheritance" title="JavaScript Prototypal Inheritance" style="cursor: pointer;"></span></p>
<p>从上图可以清楚看到，<code>prototype</code> 是用来存储类型公共方法的一个对象（正因此每个类型有它基本的方法），而 <code>__proto__</code> 是用来实现向上查找的一个引用。任何对象都会有 <code>__proto__</code>。<code>Object.prototype</code> 的 <code>__proto__</code> 是 null，也即是原型链的终点。</p>
<h2 id="articleHeader5">构造函数又是个啥玩意儿？</h2>
<p>再加入 constructor 这个东西，它与 <code>prototype</code>、<code>__proto__</code> 是什么关系？这个地方，说复杂就很复杂了，让我们尽量把它说简单一些。开始之前，我们需要查阅一下语言规范，看一些基本的定义：</p>
<ul>
<li>
<a href="https://www.ecma-international.org/ecma-262/6.0/#sec-terms-and-definitions-object" rel="nofollow noreferrer" target="_blank">对象</a>：[对象是一组集合，其中可包含零个或多个属性。对象都有一个原型对象（译者注：即 [[Prototype]]/<code>__proto__</code>）][specification: overview]</li>
<li>函数：<a href="https://www.ecma-international.org/ecma-262/6.0/#sec-terms-and-definitions-function" rel="nofollow noreferrer" target="_blank">是对象类型的一员</a>
</li>
<li>构造函数：<a href="https://www.ecma-international.org/ecma-262/6.0/#sec-constructor" rel="nofollow noreferrer" target="_blank">构造函数是个用于创建对象的<strong>函数对象</strong>。每个构造函数都有一个 <code>prototype</code> 对象，用以实现原型式继承，作属性共享用</a>
</li>
</ul>
<p>这里说明了什么呢？说明了构造函数是函数，它比普通函数多一个 <code>prototype</code> 属性；而函数是对象，对象都有一个原型对象 <code>__proto__</code>。这个东西有什么作用呢？</p>
<p>上节我们深挖了用于继承的原型链，它链接的是原型对象。而对象是通过构造函数生成的，也就是说，普通对象、原型对象、函数对象都将有它们的构造函数，这将为我们引出另一条链——</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016828690" src="https://static.alili.tech/img/remote/1460000016828690" alt="JavaScript Constructor Chain" title="JavaScript Constructor Chain" style="cursor: pointer; display: inline;"></span></p>
<p>在 JavaScript 中，谁是谁的构造函数，是通过 <code>constructor</code> 来标识的。正常来讲，普通对象（如图中的 <code>cat</code> 和 <code>{ name: 'Lin' }</code> 对象）是没有 <code>constructor</code> 属性的，它是从原型上继承而来；而图中粉红色的部分即是函数对象（如 <code>Cat</code> <code>Animal</code> <code>Object</code> 等），它们的原型对象是 <code>Function.prototype</code>，这没毛病。关键是，它们是函数对象，对象就有构造函数，那么函数的构造函数是啥呢？是 <code>Function</code>。那么问题又来了，<code>Function</code> 也是函数，它的构造函数是谁呢？<strong>是它自己</strong>：<code>Function.constructor === Function</code>。由此，<code>Function</code> 即是构造函数链的终结。</p>
<p>上面我们提到，<code>constructor</code> 也可以用来实现原型链的向上查找，然后它却别有他用。有个啥用呢？一般认为，它是用以支撑 <code>instanceof</code> 关键字实现的数据结构。</p>
<h2 id="articleHeader6">双链合璧：终极全图</h2>
<p>好了，是时候进入最烧脑的部分了。前面我们讲了两条链：</p>
<ul>
<li>原型链。它用来实现原型继承，最上层是 <code>Object.prototype</code>，终结于 <code>null</code>，没有循环</li>
<li>构造函数链。它用来表明构造关系，最上层循环终结于 <code>Function</code>
</li>
</ul>
<p>把这两条链结合到一起，你就会看到<del>一条双螺旋 DNA</del>这几张你经常看到却又看不懂的图：</p>
<p><a href="https://juejin.im/post/5b729c24f265da280f3ad010" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000016828691" src="https://static.alili.tech/img/remote/1460000016828691" alt="constructor/prototype/proto" title="constructor/prototype/proto" style="cursor: pointer;"></span></a></p>
<p><a href="http://www.mollypages.org/tutorials/js.mp" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000016828692" src="https://static.alili.tech/img/remote/1460000016828692" alt="constructor/prototype/proto" title="constructor/prototype/proto" style="cursor: pointer;"></span></a></p>
<p>图都是引用自其它文章，点击图片可跳转到原文。其中，第一篇文章 [一张图理解 JS 的原型][] 是我见过解析得最详细的，本文的很多灵感也来自这篇文章。</p>
<p>理解了上面两条链以后，这两个全图实际上就不难理解了。分享一下，怎么来读懂这个图：</p>
<ul>
<li>首先看构造函数链。所有的普通对象，<code>constructor</code> 都会指向它们的构造函数；而构造函数也是对象，它们最终会一级一级上溯到 <code>Function</code> 这个构造函数。<code>Function</code> 的构造函数是它自己，也即此链的终结；</li>
<li>
<code>Function</code> 的 <code>prototype</code> 是 <code>Function.prototype</code>，它是个普通的原型对象；</li>
<li>其次看原型链。所有的普通对象，<code>__proto__</code> 都会指向其构造函数的原型对象 <code>[Class].prototype</code>；而所有原型对象，包括构造函数链的终点 <code>Function.prototype</code>，都会最终上溯到 <code>Object.prototype</code>，终结于 null。</li>
</ul>
<p>也即是说，构造函数链的终点 <code>Function</code>，其原型又融入到了原型链中：<code>Function.prototype -&gt; Object.prototype -&gt; null</code>，最终抵达原型链的终点 <code>null</code>。至此这两条契合到了一起。</p>
<p>总结下来，可以概括成这几句话：</p>
<ul>
<li>JS 世界的变量除了普通类型外都是对象，包括函数也是对象</li>
<li>所有对象都必须由函数生成，包括普通对象、原型对象及函数对象</li>
<li>所有函数最终都生成自 <code>Function</code>，包括 <code>Function</code> 自己</li>
<li>所有对象最终都继承自 <code>Object.prototype</code>，包括 <code>Function.prototype</code>，终止于 <code>null</code>
</li>
</ul>
<p>这里还有最后一个所谓「鸡生蛋还是蛋生🐔」的问题：是先有 <code>Object.prorotype</code>，还是先有 <code>Function</code>？如果先有前者，那么此时 <code>Function</code> 还不在，这个对象又是由谁创建呢？如果先有后者，那么 <code>Function</code> 也是个对象，它的原型 <code>Function.prototype.__proto__</code> 从哪去继承呢？这个问题，看似无解。但从 这篇文章：从__proto__和prototype来深入理解JS对象和原型链 中，我们发现了一个合理的解释，那就是：</p>
<blockquote>
<code>Object.prototype</code> 是个神之对象。它不由 <code>Function</code> 这个函数构造产生。</blockquote>
<p>证据如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype instanceof Object                // false
Object.prototype instanceof Function              // false
Object.prototype.__proto__ === Function.prototype // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>                <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>              <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.prototype.__proto__ === <span class="hljs-built_in">Function</span>.prototype <span class="hljs-comment">// false</span></code></pre>
<p>JS 对象世界的构造次序应该是：<code>Object.prototype</code> -&gt; <code>Function.prototype</code> -&gt; <code>Function</code> -&gt; <code>Object</code> -&gt; ...</p>
<h2 id="articleHeader7">总结</h2>
<p>讲到这里，我想关于 JavaScript 继承中的一些基本问题可以解释清楚了：</p>
<blockquote>JavaScript 继承是类继承还是原型继承？不是使用了 new 关键字么，应该跟类有关系吧？</blockquote>
<p>是完全的原型继承。尽管用了 <code>new</code> 关键字，但其实只是个语法糖，跟类没有关系。JavaScript 没有类。它与类继承完全不同，只是长得像。好比雷锋和雷峰塔的关系。</p>
<blockquote>
<code>prototype</code> 是什么东西？用来干啥？</blockquote>
<p><code>prototype</code> 是个对象，只有函数上有。它是用来存储对象的属性（数据和方法）的地方，是实现 JavaScript 原型继承的基础。</p>
<blockquote>
<code>__proto__</code> 是什么东西？用来干啥？</blockquote>
<p><code>__proto__</code> 是个指向 <code>prototype</code> 的引用。用以辅助原型继承中向上查找的实现。虽然它得到了所有浏览器的支持，但并不是规范所推荐的做法。严谨地说，它是一个指向 <code>[[Prototype]]</code> 的引用。</p>
<blockquote>
<code>constructor</code> 是什么东西？用来干啥？</blockquote>
<p>是对象上一个指向构造函数的引用。用来辅助 <code>instanceof</code> 等关键字的实现。</p>
<blockquote>🐔生蛋还是蛋生🐔？</blockquote>
<p>神生鸡，鸡生蛋。</p>
<h2 id="articleHeader8">参考</h2>
<ul>
<li><a href="https://juejin.im/post/5b729c24f265da280f3ad010" rel="nofollow noreferrer" target="_blank">一张图理解 JS 的原型</a></li>
<li><a href="http://crockford.com/javascript/prototypal.html" rel="nofollow noreferrer" target="_blank">Prototypal Inheritance in JavaScript</a></li>
<li><a href="http://blog.vjeux.com/2011/javascript/how-prototypal-inheritance-really-works.html" rel="nofollow noreferrer" target="_blank">How Prototypal Inheritance really works</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/6.0/" rel="nofollow noreferrer" target="_blank">ECMAScript 2015(ES6) Specification</a></li>
<li><a href="https://github.com/creeperyang/blog/issues/9" rel="nofollow noreferrer" target="_blank">从__proto__和 prototype 来深入理解 JS 对象和原型链</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/16" rel="nofollow noreferrer" target="_blank">JavaScript 深入之继承的多种方法</a></li>
<li>[MDN: Inheritance in JavaScript][]</li>
<li>[MDN: Inheritance and the prototype chain][]</li>
<li>[MDN: Details of the object model][]</li>
<li>[MDN: <code>__proto__</code>][]</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 原型继承之精髓

## 原文链接
[https://segmentfault.com/a/1190000016828686](https://segmentfault.com/a/1190000016828686)


---
title: '【ES6】对象的新功能与解构赋值' 
date: 2019-02-15 2:30:44
hidden: true
slug: ayk02krko6o
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>ES6 通过字面量语法扩展、新增方法、改进原型等多种方式加强对象的使用，并通过解构简化对象的数据提取过程。</blockquote>
<h1 id="articleHeader0">一、字面量语法扩展</h1>
<p>在 ES6 模式下使用字面量创建对象更加简洁，对于对象属性来说，<strong>属性初始值可以简写</strong>，并可以使用<strong>可计算的属性名称</strong>。对象方法的定义消除了冒号和 function 关键字，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Demo1
var value = &quot;name&quot;, age = 18
var person = {
  age, // age: age
  ['my' + value]: 'Jenny',  // myname
  sayName () {  // sayName: function()
    console.log(this.myname)
  }
}
console.log(person.age) // 18
console.log(person.myname) // Jenny
person.sayName(); // Jenny" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// Demo1</span>
<span class="hljs-keyword">var</span> value = <span class="hljs-string">"name"</span>, age = <span class="hljs-number">18</span>
<span class="hljs-keyword">var</span> person = {
  age, <span class="hljs-comment">// age: age</span>
  [<span class="hljs-string">'my'</span> + value]: <span class="hljs-string">'Jenny'</span>,  <span class="hljs-comment">// myname</span>
  sayName () {  <span class="hljs-comment">// sayName: function()</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.myname)
  }
}
<span class="hljs-built_in">console</span>.log(person.age) <span class="hljs-comment">// 18</span>
<span class="hljs-built_in">console</span>.log(person.myname) <span class="hljs-comment">// Jenny</span>
person.sayName(); <span class="hljs-comment">// Jenny</span></code></pre>
<p>针对重复定义的对象字面量属性，ES5严格模式下会进行<strong>重复属性检查</strong>从而抛出错误，而ES6移除了这个机制，无论严格模式还是非严格模式，<strong>同名属性都会取最后一个值</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo2
var person = {
  ['my' + value]: 'Jenny',
  myname: 'Tom',
  myname: 'Lee',
}
console.log(person.myname) // Lee" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// demo2</span>
<span class="hljs-keyword">var</span> person = {
  [<span class="hljs-string">'my'</span> + value]: <span class="hljs-string">'Jenny'</span>,
  <span class="hljs-attr">myname</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-attr">myname</span>: <span class="hljs-string">'Lee'</span>,
}
<span class="hljs-built_in">console</span>.log(person.myname) <span class="hljs-comment">// Lee</span></code></pre>
<h1 id="articleHeader1">二、新增方法</h1>
<blockquote>从 ES5 开始遵循的一个设计目标是，避免创建新的全局函数，也不在<code>object.prototype</code>上创建新的方法。<br>为了是某些任务更容易实现，ES6 在全局 Object 对象上引入一些新的方法。</blockquote>
<h2 id="articleHeader2">2.1 Object.is( )</h2>
<p>ES6 引入<code>Object.is()</code>方法来弥补全等运算符的不准确计算。</p>
<p>全等运算符在比较时不会触发强制转换类型，<code>Object.is()</code>运行结果也类似，但对于 +0 和 -0（在 JS 引擎中为两个不同实体）以及特殊值<code>NaN</code>的比较结果不同，示例来看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo3
console.log(5 == '5') // true
console.log(5 === '5') // false
console.log(Object.is(5, '5')) // false

console.log(+0 == -0) // true
console.log(+0 === -0) // true
console.log(Object.is(+0, -0)) // false

console.log(NaN == NaN) // false
console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// demo3</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span> == <span class="hljs-string">'5'</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span> === <span class="hljs-string">'5'</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.is(<span class="hljs-number">5</span>, <span class="hljs-string">'5'</span>)) <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(+<span class="hljs-number">0</span> == <span class="hljs-number">-0</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.is(+<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>)) <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> == <span class="hljs-literal">NaN</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>)) <span class="hljs-comment">// true</span></code></pre>
<p>总结来说，<code>Object.is()</code>对所有值进行了更严格等价判断。当然，是否使用<code>Object.is()</code>代替全等操作符（===）取决于这些特殊情况是否影响代码。</p>
<h2 id="articleHeader3">2.2 Object.assign( )</h2>
<p>ES6 添加<code>Object.assign()</code>来实现混合（Mixin）模式，即一个对象<strong>接收</strong>另一个对象的属性和方法。注意是接收而不是继承，例如接收 demo1 中的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo4
var friend = {}
Object.assign(friend, person)
friend.sayName() // Jenny
console.log(friend.age) // 18
console.log(Object.getPrototypeOf(friend) === person) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// demo4</span>
<span class="hljs-keyword">var</span> friend = {}
<span class="hljs-built_in">Object</span>.assign(friend, person)
friend.sayName() <span class="hljs-comment">// Jenny</span>
<span class="hljs-built_in">console</span>.log(friend.age) <span class="hljs-comment">// 18</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(friend) === person) <span class="hljs-comment">// false</span></code></pre>
<p>在<code>Object.assign()</code>之前，许多 JS 库自定义了混合方法 mixin( ) 来实现对象组合，代码类似于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mixin(receiver, supplier) {
  Object.keys(supplier).forEach(function (key) {
    receiver[key] = supplier[key]
  })
  return receiver
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mixin</span>(<span class="hljs-params">receiver, supplier</span>) </span>{
  <span class="hljs-built_in">Object</span>.keys(supplier).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    receiver[key] = supplier[key]
  })
  <span class="hljs-keyword">return</span> receiver
}</code></pre>
<p>可以看出 mixin( ) 方法使用“=”赋值操作，并不能复制<strong>访问器属性</strong>，同理<code>Object.assign()</code>也不能复制访问器属性，只是执行了赋值操作，访问器属性最终会转变为接收对象的数据属性。示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo5
var animal = {
  name: 'lili',
  get type () {
    return this.name + type
  },
  set type (news) {
    type = news
  }
}
animal.type = 'cat'
console.log(animal.type) // lilicat

var pet = {}
Object.assign(pet, animal)
console.log(animal) // { name: 'lili', type: [Getter/Setter] }
console.log(pet) // { name: 'lili', type: 'lilicat' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// demo5</span>
<span class="hljs-keyword">var</span> animal = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'lili'</span>,
  get type () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name + type
  },
  set type (news) {
    type = news
  }
}
animal.type = <span class="hljs-string">'cat'</span>
<span class="hljs-built_in">console</span>.log(animal.type) <span class="hljs-comment">// lilicat</span>

<span class="hljs-keyword">var</span> pet = {}
<span class="hljs-built_in">Object</span>.assign(pet, animal)
<span class="hljs-built_in">console</span>.log(animal) <span class="hljs-comment">// { name: 'lili', type: [Getter/Setter] }</span>
<span class="hljs-built_in">console</span>.log(pet) <span class="hljs-comment">// { name: 'lili', type: 'lilicat' }</span></code></pre>
<h2 id="articleHeader4">2.3 Object.setPrototypeOf( )</h2>
<p>正常情况下对通过<strong>构造函数</strong>或<code>Object.create()</code>创建时，原型是被指定的。ES6 添加<code>Object.setPrototypeOf()</code> 方法来改变对象的原型。</p>
<p>例如创建一个继承 person 对象的 coder 对象，然后改变 coder 对象的原型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo6
let person = {
  myname: 'Jenny',
  sayName () { 
    console.log(this.myname)
  }
}

// 创建原型为 person 的 coder 对象
let coder = Object.create(person) 
coder.sayName() // Jenny
console.log(Object.getPrototypeOf(coder) === person) // true

let hero = {
  myname: 'lee',
  sayName () {
    console.log(this.myname)
  }
}

// 改变 coder 对象的原型为 hero
Object.setPrototypeOf(coder, hero)
coder.sayName() // lee
console.log(Object.getPrototypeOf(coder) === hero) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// demo6</span>
<span class="hljs-keyword">let</span> person = {
  <span class="hljs-attr">myname</span>: <span class="hljs-string">'Jenny'</span>,
  sayName () { 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.myname)
  }
}

<span class="hljs-comment">// 创建原型为 person 的 coder 对象</span>
<span class="hljs-keyword">let</span> coder = <span class="hljs-built_in">Object</span>.create(person) 
coder.sayName() <span class="hljs-comment">// Jenny</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(coder) === person) <span class="hljs-comment">// true</span>

<span class="hljs-keyword">let</span> hero = {
  <span class="hljs-attr">myname</span>: <span class="hljs-string">'lee'</span>,
  sayName () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.myname)
  }
}

<span class="hljs-comment">// 改变 coder 对象的原型为 hero</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(coder, hero)
coder.sayName() <span class="hljs-comment">// lee</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(coder) === hero) <span class="hljs-comment">// true</span></code></pre>
<p>对象原型被存储在内部专有属性[[Prototype]]，调用<code>Object.getPrototypeOf()</code>返回存储在其中的值，调用<code>Object.setPrototypeOf()</code>改变其值。这个方法加强了对对象原型的操作，下一节重点讲解其它操作原型的方式。</p>
<h1 id="articleHeader5">三、增强对象原型</h1>
<p>原型是 JS 继承的基础，ES6 针对原型做了很多改进，目的是更灵活地方式使用原型。除了新增的<code>Object.setPrototypeOf()</code>改变原型外，还引入<code>Super</code>关键字简化对原型的访问，</p>
<h2 id="articleHeader6">3.1 Super关键字</h2>
<p>ES6 引入<code>Super</code>来更便捷的访问对象原型，上一节介绍 ES5 可以使用<code>Object.getPrototypeOf()</code>返回对象原型。举例说明<code>Super</code>的便捷，当对象需要复用原型方法，重新定义自己的方法时，两种实现方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo7
let coder1 = {
  getName () {
    console.log(&quot;coder1 name: &quot;)
    Object.getPrototypeOf(this).sayName.call(this)
  }
}

// 设置 coder1 对象的原型为 hero（demo6）
Object.setPrototypeOf(coder1, hero)
coder1.getName() // coder1 name: lee

let coder2 = {
  getName () {
    console.log(&quot;coder2 name: &quot;)
    super.sayName()
  }
}

Object.setPrototypeOf(coder2, hero)
coder2.getName() // coder2 name: lee" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// demo7</span>
<span class="hljs-keyword">let</span> coder1 = {
  getName () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"coder1 name: "</span>)
    <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-keyword">this</span>).sayName.call(<span class="hljs-keyword">this</span>)
  }
}

<span class="hljs-comment">// 设置 coder1 对象的原型为 hero（demo6）</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(coder1, hero)
coder1.getName() <span class="hljs-comment">// coder1 name: lee</span>

<span class="hljs-keyword">let</span> coder2 = {
  getName () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"coder2 name: "</span>)
    <span class="hljs-keyword">super</span>.sayName()
  }
}

<span class="hljs-built_in">Object</span>.setPrototypeOf(coder2, hero)
coder2.getName() <span class="hljs-comment">// coder2 name: lee</span></code></pre>
<p>在 coder1 对象的 getName 方法还需要<code>call(this)</code>保证使用的是原型方法的 this，比较复杂，并且在<strong>多重继承会出现递归调用栈溢出错误</strong>，而直接使用<code>Super</code>就很简单安全。</p>
<p><strong>注意必须在简写方法中使用<code>Super</code>，要不然会报错</strong>，例如以下代码运行语法错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let coder4= {
  getName: function () { // getName () 正确
    super.sayName() // SyntaxError: 'super' keyword unexpected here
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> coder4= {
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// getName () 正确</span>
    <span class="hljs-keyword">super</span>.sayName() <span class="hljs-comment">// SyntaxError: 'super' keyword unexpected here</span>
  }</code></pre>
<p>因为在例子中 getName 成为了匿名 function 定义的属性，在当前上下问调用<code>Super</code>引用是非法的。如果不理解，可以进一步看下方法的从属对象。</p>
<h2 id="articleHeader7">3.2 方法的从属对象</h2>
<p>ES6 之前“方法”是具有功能而非数据的对象属性，ES6 正式将方法定义为有 <code>[[HomeObject]]</code>内部属性的函数。</p>
<p><code>[[HomeObject]]</code>属性存储当前方法的从属对象，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let coder5 = {
  sayName () {
    console.log(&quot;I have HomeObject&quot;)
  }
}

function shareName () {
    console.log(&quot;No HomeObject&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> coder5 = {
  sayName () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I have HomeObject"</span>)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shareName</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"No HomeObject"</span>)
}</code></pre>
<p>coder5 对象的 sayName( ) 方法的<code>[[HomeObject]]</code>属性值为 coder5，而 function 定义的 shareName( ) 没有将其赋值给对象，所以没有定义其<code>[[HomeObject]]</code>属性，这在使用<code>Super</code>时很重要。</p>
<p><code>Super</code>就是在<code>[[HomeObject]]</code>属性上调用<code>Object.getPrototypeOf()</code>获得原型的引用，然后搜索原型得到同名函数，最后设置 this 绑定调用相应方法。</p>
<h1 id="articleHeader8">四、解构赋值</h1>
<p>ES6 为数组和对象字面量提供了新特性——解构，可以简化数据提取的过程，减少同质化的代码。解构的基本语法示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {
  name: 'jenny',
  id: 18
}
let {name, id} = user
console.log(name, id) // jenny 18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript"><span class="hljs-keyword">let</span> user = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'jenny'</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-number">18</span>
}
<span class="hljs-keyword">let</span> {name, id} = user
<span class="hljs-built_in">console</span>.log(name, id) <span class="hljs-comment">// jenny 18</span></code></pre>
<p>注意在这段代码中，user.name 存储在与对象属性名同名的 name 变量中。</p>
<h2 id="articleHeader9">4.1 默认值</h2>
<p>如果解构时变量名称与对象属性名不同，即在对象中不存在，那么这个变量会默认为<code>undefined</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {
  name: 'jenny',
  id: 18
}
let {name, id, job} = user
console.log(name, id, job) // jenny 18 undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript"><span class="hljs-keyword">let</span> user = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'jenny'</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-number">18</span>
}
<span class="hljs-keyword">let</span> {name, id, job} = user
<span class="hljs-built_in">console</span>.log(name, id, job) <span class="hljs-comment">// jenny 18 undefined</span></code></pre>
<h2 id="articleHeader10">4.2 非同名变量赋值</h2>
<p>非同名变量的默认值为<code>undefined</code>，但更多时候是需要为其赋值的，并且会将对象属性值赋值给非同名变量。ES6 为此提供了扩展语法，与对象字面量属性初始化程序很像：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {
  name: 'jenny',
  id: 18
}
let {name, id = 16, job = 'engineer'} = user
console.log(name, id, job) // jenny 18 engineer

let {name: localName, id: localId} = user
console.log(localName, localId) // jenny 18

let {name: otherName = 'lee', job: otherJob = 'teacher'} = user
console.log(otherName, otherJob) // jenny teacher" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript"><span class="hljs-keyword">let</span> user = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'jenny'</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-number">18</span>
}
<span class="hljs-keyword">let</span> {name, id = <span class="hljs-number">16</span>, job = <span class="hljs-string">'engineer'</span>} = user
<span class="hljs-built_in">console</span>.log(name, id, job) <span class="hljs-comment">// jenny 18 engineer</span>

<span class="hljs-keyword">let</span> {<span class="hljs-attr">name</span>: localName, <span class="hljs-attr">id</span>: localId} = user
<span class="hljs-built_in">console</span>.log(localName, localId) <span class="hljs-comment">// jenny 18</span>

<span class="hljs-keyword">let</span> {<span class="hljs-attr">name</span>: otherName = <span class="hljs-string">'lee'</span>, <span class="hljs-attr">job</span>: otherJob = <span class="hljs-string">'teacher'</span>} = user
<span class="hljs-built_in">console</span>.log(otherName, otherJob) <span class="hljs-comment">// jenny teacher</span></code></pre>
<p>可以看出这种语法实际与对象字面量相反，<strong>赋值名在冒号左，变量名在右</strong>，并且解构赋值时，只是更新了默认值，不能覆盖对象原有的属性值。</p>
<h2 id="articleHeader11">4.3 嵌套解构</h2>
<p>解构嵌套对象的语法仍然类似对象字面量，使用<strong>花括号</strong>继续查找下层结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {
  name: 'jenny',
  id: 18,
  desc: {
    pos: {
      lng: 111,
      lat: 333
    }
  }
}

let {desc: {pos"}}" = user
console.log(pos) // { lng: 111, lat: 333 }

let {desc: {pos: {lng"}}"} = user
console.log(lng) // 111

let {desc: {pos: {lng: longitude"}}"} = user
console.log(longitude) // 111" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript"><span class="hljs-keyword">let</span> user = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'jenny'</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-number">18</span>,
  <span class="hljs-attr">desc</span>: {
    <span class="hljs-attr">pos</span>: {
      <span class="hljs-attr">lng</span>: <span class="hljs-number">111</span>,
      <span class="hljs-attr">lat</span>: <span class="hljs-number">333</span>
    }
  }
}

<span class="hljs-keyword">let</span> {<span class="hljs-attr">desc</span>: {pos"}}" = user
<span class="hljs-built_in">console</span>.log(pos) <span class="hljs-comment">// { lng: 111, lat: 333 }</span>

<span class="hljs-keyword">let</span> {<span class="hljs-attr">desc</span>: {<span class="hljs-attr">pos</span>: {lng"}}"} = user
<span class="hljs-built_in">console</span>.log(lng) <span class="hljs-comment">// 111</span>

<span class="hljs-keyword">let</span> {<span class="hljs-attr">desc</span>: {<span class="hljs-attr">pos</span>: {<span class="hljs-attr">lng</span>: longitude"}}"} = user
<span class="hljs-built_in">console</span>.log(longitude) <span class="hljs-comment">// 111</span></code></pre>
<h1 id="articleHeader12">五、对象类别</h1>
<p>ES6 规范定义了对象的类别，特别是针对浏览器这样的执行环境。</p>
<ul>
<li>
<strong>普通（Ordinary）对象</strong><br>具有 JS 对象所有的默认内部行为</li>
<li>
<strong>特异（Exotic）对象</strong><br>具有某些与默认行为不符的内部行为</li>
<li>
<strong>标准（Standard）对象</strong><br>ES6 规范中定义的对象<br>可以是普通对象或特异对象，例如 Date、Array 等</li>
<li>
<strong>内建对象</strong><br>脚本开始执行时存在于 JS 执行环境中的对象<br>所有标准对象都是内建对象</li>
</ul>
<hr>
<p><em>推荐阅读《深入理解ES6》</em></p>
<hr>
<h4>加油哦，少年~</h4>
<p><span class="img-wrap"><img data-src="/img/bVbiSyR?w=1000&amp;h=367" src="https://static.alili.tech/img/bVbiSyR?w=1000&amp;h=367" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【ES6】对象的新功能与解构赋值

## 原文链接
[https://segmentfault.com/a/1190000016746873](https://segmentfault.com/a/1190000016746873)


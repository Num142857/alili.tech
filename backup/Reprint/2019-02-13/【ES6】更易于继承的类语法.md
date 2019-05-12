---
title: '【ES6】更易于继承的类语法' 
date: 2019-02-13 2:31:23
hidden: true
slug: 2eadc90q4m9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>和其它面向对象编程语言一样，ES6 正式定义了 class 类以及 extend 继承语法糖，并且支持静态、派生、抽象、迭代、单例等，而且根据 ES6 的新特性衍生出很多有趣的用法。</blockquote>
<h1 id="articleHeader0">一、类的基本定义</h1>
<p>基本所有面向对象的语言都支持类的封装与继承，那什么是类？</p>
<p>类是面向对象程序设计的基础，包含<strong>数据封装、数据操作以及传递消息的函数</strong>。类的实例称为对象。</p>
<p>ES5 之前通过函数来模拟类的实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数
function Person(name) {
  this.name = name;
}
// 原型上的方法
Person.prototype.sayName = function(){
  console.log(this.name);
};
// new 一个实例
var friend = new Person(&quot;Jenny&quot;);

friend.sayName(); // Jenny
console.log(friend instanceof Person);   // true
console.log(friend instanceof Object);   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
}
<span class="hljs-comment">// 原型上的方法</span>
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
};
<span class="hljs-comment">// new 一个实例</span>
<span class="hljs-keyword">var</span> friend = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Jenny"</span>);

friend.sayName(); <span class="hljs-comment">// Jenny</span>
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> Person);   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);   <span class="hljs-comment">// true</span></code></pre>
<p><strong>总结来说，定义一个类的思路如下</strong>：</p>
<ul>
<li>1.需要构造函数封装数据</li>
<li>2.在原型上添加方法操作数据，</li>
<li>3.通过New创建实例</li>
</ul>
<p>ES6 使用<code>class</code>关键字定义一个类，这个类有特殊的方法名<code>[[Construct]]</code>定义构造函数，在 new 创建实例时调用的就是<code>[[Construct]]</code>，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*ES6*/
// 等价于 let Person = class {
class Person {
  // 构造函数
  constructor(name) {
    this.name = name;
  }
  // 等价于Person.prototype.sayName
  sayName() {
    console.log(this.name);
  }
}

console.log(typeof Person);   // function
console.log(typeof Person.prototype.sayName);   // function

let friend = new Person(&quot;Jenny&quot;);

friend.sayName(); // Jenny
console.log(friend instanceof Person);   // true
console.log(friend instanceof Object);   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/*ES6*/</span>
<span class="hljs-comment">// 等价于 let Person = class {</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-comment">// 构造函数</span>
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }
  <span class="hljs-comment">// 等价于Person.prototype.sayName</span>
  sayName() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> Person);   <span class="hljs-comment">// function</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> Person.prototype.sayName);   <span class="hljs-comment">// function</span>

<span class="hljs-keyword">let</span> friend = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Jenny"</span>);

friend.sayName(); <span class="hljs-comment">// Jenny</span>
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> Person);   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);   <span class="hljs-comment">// true</span></code></pre>
<p>上面的例子中<code>class</code>定义的类与自定义的函数模拟类功能上貌似没什么不同，但本质上还有很大差异的：</p>
<ul>
<li>函数声明可以被提升，但是class类声明与let类似，不能被提升；</li>
<li>类声明自动运行在严格模式下，“use strict”；</li>
<li>类中所有方法都是不可枚举的，enumerable 为 false。</li>
</ul>
<h1 id="articleHeader1">二、更灵活的类</h1>
<p>类和函数一样，是JavaScript的一等公民（可以传入函数、从函数返回、赋值），并且注意到类与对象字面量还有更多相似之处，这些特点可以扩展出类更灵活的定义与使用。</p>
<h2 id="articleHeader2">2.1 拥有访问器属性</h2>
<p>对象的属性有数据属性和访问属性，类中也可以通过<code>get</code>、<code>set</code>关键字定义访问器属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor(name) {
    this.name = name;
  }

  get value () {
    return this.name + this.age
  }
  set value (num) {
    this.age = num
  }
}

let friend = new Person(&quot;Jenny&quot;);
// 调用的是 setter
friend.value = 18
// 调用的是 getter
console.log(friend.value) // Jenny18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }

  get value () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name + <span class="hljs-keyword">this</span>.age
  }
  set value (num) {
    <span class="hljs-keyword">this</span>.age = num
  }
}

<span class="hljs-keyword">let</span> friend = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Jenny"</span>);
<span class="hljs-comment">// 调用的是 setter</span>
friend.value = <span class="hljs-number">18</span>
<span class="hljs-comment">// 调用的是 getter</span>
<span class="hljs-built_in">console</span>.log(friend.value) <span class="hljs-comment">// Jenny18</span></code></pre>
<h2 id="articleHeader3">2.2 可计算的成员名称</h2>
<p>类似 ES6 对象字面量扩展的可计算属性名称，类也可以<strong>用[表达式]定义可计算成员名称</strong>，包括类中的方法和访问器属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let methodName = 'sayName'

class Person {
  constructor(name) {
    this.name = name;
  }

  [methodName + 'Default']() {
    console.log(this.name);
  }

  get [methodName]() {
    return this.name
  }

  set [methodName](str) {
    this.name = str
  }
}

let friend = new Person(&quot;Jenny&quot;);

// 方法
friend.sayNameDefault(); // Jenny
// 访问器属性
friend.sayName = 'lee'
console.log(friend.sayName) // lee" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> methodName = <span class="hljs-string">'sayName'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }

  [methodName + <span class="hljs-string">'Default'</span>]() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }

  get [methodName]() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }

  set [methodName](str) {
    <span class="hljs-keyword">this</span>.name = str
  }
}

<span class="hljs-keyword">let</span> friend = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Jenny"</span>);

<span class="hljs-comment">// 方法</span>
friend.sayNameDefault(); <span class="hljs-comment">// Jenny</span>
<span class="hljs-comment">// 访问器属性</span>
friend.sayName = <span class="hljs-string">'lee'</span>
<span class="hljs-built_in">console</span>.log(friend.sayName) <span class="hljs-comment">// lee</span></code></pre>
<blockquote>想进一步熟悉对象新特性可参考：<a href="https://segmentfault.com/a/1190000016746873">【ES6】对象的新功能与解构赋值</a>
</blockquote>
<h2 id="articleHeader4">2.3 定义默认迭代器</h2>
<p>ES6 中常用的集合对象（数组、Set/Map集合）和字符串都是可迭代对象，如果类是用来表示值这些可迭代对象的，那么定义一个默认迭代器会更有用。</p>
<p>ES6 通过给<code>Symbol.iterator</code>属性添加生成器的方式，定义默认迭代器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor(name) {
    this.name = name;
  }

  *[Symbol.iterator]() {
    for (let item of this.name){
      yield item
    }
  }
}

var abbrName = new Person(new Set(['j', 'j', 'e', 'e', 'n', 'y', 'y', 'y',]))
for (let x of abbrName) {
  console.log(x); // j e n y
}
console.log(...abbrName) // j e n y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }

  *[<span class="hljs-built_in">Symbol</span>.iterator]() {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.name){
      <span class="hljs-keyword">yield</span> item
    }
  }
}

<span class="hljs-keyword">var</span> abbrName = <span class="hljs-keyword">new</span> Person(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">'j'</span>, <span class="hljs-string">'j'</span>, <span class="hljs-string">'e'</span>, <span class="hljs-string">'e'</span>, <span class="hljs-string">'n'</span>, <span class="hljs-string">'y'</span>, <span class="hljs-string">'y'</span>, <span class="hljs-string">'y'</span>,]))
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x <span class="hljs-keyword">of</span> abbrName) {
  <span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">// j e n y</span>
}
<span class="hljs-built_in">console</span>.log(...abbrName) <span class="hljs-comment">// j e n y</span></code></pre>
<p>定义默认迭代器后类的实例就可以使用<code>for-of</code>循环和展开运算符（...）等迭代功能。</p>
<blockquote>对以上迭代器内容感到困惑的可参考：<a href="https://segmentfault.com/a/1190000016824284" target="_blank">【ES6】迭代器与可迭代对象</a>
</blockquote>
<h2 id="articleHeader5">2.4 作为参数的类</h2>
<p>类作为"一等公民”可以当参数使用传入函数中，当然也可以从函数中返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createClass(className, val) {
  return new className(val)
}

let person = createClass(Person,'Jenny')
console.log(person) // Person { name: 'Jenny' }
console.log(typeof person) // object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createClass</span>(<span class="hljs-params">className, val</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> className(val)
}

<span class="hljs-keyword">let</span> person = createClass(Person,<span class="hljs-string">'Jenny'</span>)
<span class="hljs-built_in">console</span>.log(person) <span class="hljs-comment">// Person { name: 'Jenny' }</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> person) <span class="hljs-comment">// object</span></code></pre>
<h2 id="articleHeader6">2.5 创建单例</h2>
<p>使用类语法创建单例的方式通过new立即调用<strong>类表达式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let singleton = new class {
  constructor(name) {
    this.name = name;
  }
}('Jenny')
 
console.log(singleton.name) // Jenny" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> singleton = <span class="hljs-keyword">new</span> <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }
}(<span class="hljs-string">'Jenny'</span>)
 
<span class="hljs-built_in">console</span>.log(singleton.name) <span class="hljs-comment">// Jenny</span></code></pre>
<p>这里先创建<strong>匿名类表达式</strong>，然后 new 调用这个类表达式，并通过小括号立即执行，这种类语法创建的单例不会在作用域中暴露类的引用。</p>
<h1 id="articleHeader7">三、类的继承</h1>
<p>回顾 ES6 之前如何实现继承？常用方式是通过原型链、构造函数以及组合继承等方式。</p>
<p>ES6 的类使用熟悉的<strong><code>extends</code>关键字指定类继承的函数</strong>，并且可以通过<strong><code>surpe()</code>方法访问父类的构造函数</strong>。</p>
<p>例如继承一个 Person 的类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Friend extends Person {
  constructor(name, phone){
    super(name)
    this.phone = phone
  }
}

let myfriend = new Friend('lee',2233)
console.log(myfriend) // Friend { name: 'lee', phone: 2233 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Friend</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, phone){
    <span class="hljs-keyword">super</span>(name)
    <span class="hljs-keyword">this</span>.phone = phone
  }
}

<span class="hljs-keyword">let</span> myfriend = <span class="hljs-keyword">new</span> Friend(<span class="hljs-string">'lee'</span>,<span class="hljs-number">2233</span>)
<span class="hljs-built_in">console</span>.log(myfriend) <span class="hljs-comment">// Friend { name: 'lee', phone: 2233 }</span></code></pre>
<p>Friend 继承了 Person，术语上称 Person 为<strong>基类</strong>，Friend 为<strong>派生类</strong>。</p>
<p>需要注意的是，<code>surpe()</code>只能在派生类中使用，它负责初始化 this，所以派生类使用 this 之前一定要用<code>surpe()</code>。</p>
<h2 id="articleHeader8">3.1 继承内建对象</h2>
<p>ES6 的类继承可以继承内建对象（Array、Set、Map 等），继承后可以拥有基类的所有内建功能。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
}

let arr = new MyArray(1, 2, 3, 4),
  subarr = arr.slice(1, 3)

console.log(arr.length) // 4
console.log(arr instanceof MyArray) // true
console.log(arr instanceof Array) // true
console.log(subarr instanceof MyArray) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
}

<span class="hljs-keyword">let</span> arr = <span class="hljs-keyword">new</span> MyArray(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>),
  subarr = arr.slice(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>)

<span class="hljs-built_in">console</span>.log(arr.length) <span class="hljs-comment">// 4</span>
<span class="hljs-built_in">console</span>.log(arr <span class="hljs-keyword">instanceof</span> MyArray) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(subarr <span class="hljs-keyword">instanceof</span> MyArray) <span class="hljs-comment">// true</span></code></pre>
<p>注意到上例中，不仅 arr 是派生类 MyArray 的实例，subarr 也是派生类 MyArray 的实例，<strong>内建对象继承的实用之处是改变返回对象的类型</strong>。</p>
<blockquote>浏览器引擎背后是通过<code>[Symbol.species]</code>属性实现这一行为，它被用于返回函数的静态访问器属性，内建对象定义了<code>[Symbol.species]</code>属性的有 Array、ArrayBuffer、Set、Map、Promise、RegExp、Typed arrays。</blockquote>
<h2 id="articleHeader9">3.2 继承表达式的类</h2>
<p>目前<code>extends</code>可以继承类和内建对象，但更强大的功能从表达式导出类！</p>
<p>这个表达式要求<strong>可以被解析为函数并具有<code>[[Construct]]</code>属性和原型</strong>，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Sup(val) {
  this.value = val
}

Sup.prototype.getVal = function () {
  return 'hello' + this.value
}

class Derived extends Sup {
  constructor(val) {
    super(val)
  }
}

let der = new Derived('world')
console.log(der) // Derived { value: 'world' }
console.log(der.getVal()) // helloworld" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sup</span>(<span class="hljs-params">val</span>) </span>{
  <span class="hljs-keyword">this</span>.value = val
}

Sup.prototype.getVal = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span> + <span class="hljs-keyword">this</span>.value
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Derived</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Sup</span> </span>{
  <span class="hljs-keyword">constructor</span>(val) {
    <span class="hljs-keyword">super</span>(val)
  }
}

<span class="hljs-keyword">let</span> der = <span class="hljs-keyword">new</span> Derived(<span class="hljs-string">'world'</span>)
<span class="hljs-built_in">console</span>.log(der) <span class="hljs-comment">// Derived { value: 'world' }</span>
<span class="hljs-built_in">console</span>.log(der.getVal()) <span class="hljs-comment">// helloworld</span></code></pre>
<h2 id="articleHeader10">3.3 只能继承的抽象类</h2>
<p>ES6 引入<code>new.target</code>元属性判断函数是否通过new关键字调用。类的构造函数也可以通过<code>new.target</code>确定类是如何被调用的。</p>
<p>可以通过<code>new.target</code>创建抽象类（不能实例化的类），例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Abstract  {
  constructor(){
    if(new.target === Abstract) {
      throw new Error('抽象类（不能直接实例化）')
    }
  }
}

class Instantiable extends Abstract {
  constructor() {
    super()
  }
}

// let abs = new Abstract() // Error: 抽象类（不能直接实例化）
 let abs = new Instantiable()
console.log(abs instanceof Abstract) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Abstract</span>  </span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span>.target === Abstract) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象类（不能直接实例化）'</span>)
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Instantiable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Abstract</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()
  }
}

<span class="hljs-comment">// let abs = new Abstract() // Error: 抽象类（不能直接实例化）</span>
 <span class="hljs-keyword">let</span> abs = <span class="hljs-keyword">new</span> Instantiable()
<span class="hljs-built_in">console</span>.log(abs <span class="hljs-keyword">instanceof</span> Abstract) <span class="hljs-comment">// true</span></code></pre>
<p>虽然不能直接使用 Abstract 抽象类创建实例，但是可以作为基类派生其它类。</p>
<h1 id="articleHeader11">四、类的静态成员</h1>
<p>ES6 使用<code>static</code>关键字声明静态成员或方法。在类的方法或访问器属性前都可以使用<code>static</code>，唯一的限制是不能用于构造函数。</p>
<p>静态成员的作用是某些类成员的私有化，及不可在实例中访问，必须要直接在类上访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor(name) {
    this.name = name;
  }

  static create(name) {
    return new Person(name);
  }
}

let beauty = Person.create(&quot;Jenny&quot;);
// beauty.create('lee') // TypeError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }

  <span class="hljs-keyword">static</span> create(name) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Person(name);
  }
}

<span class="hljs-keyword">let</span> beauty = Person.create(<span class="hljs-string">"Jenny"</span>);
<span class="hljs-comment">// beauty.create('lee') // TypeError</span></code></pre>
<p>如果基类有静态成员，那这些静态成员在派生类也可以使用。</p>
<p>例如将上例的 Person 作为基类，派生出 Friend 类并使用基类的静态方法create( )：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Friend extends Person {
  constructor(name){
    super(name)
  }
}

var friend = Friend.create('lee')
console.log(friend instanceof Person) // true
console.log(friend instanceof Friend) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Friend</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name){
    <span class="hljs-keyword">super</span>(name)
  }
}

<span class="hljs-keyword">var</span> friend = Friend.create(<span class="hljs-string">'lee'</span>)
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> Person) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> Friend) <span class="hljs-comment">// false</span></code></pre>
<p>可以看出派生类依然可以使用基类的静态方法。</p>
<hr>
<p><em>推荐阅读《深入理解ES6》</em></p>
<hr>
<h4>加油哦少年！</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【ES6】更易于继承的类语法

## 原文链接
[https://segmentfault.com/a/1190000016897289](https://segmentfault.com/a/1190000016897289)


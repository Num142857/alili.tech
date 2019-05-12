---
title: 'Js基础知识（二） - 原型链与继承精彩的讲解' 
date: 2018-12-15 2:30:11
hidden: true
slug: aa2ukqyd8yk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">作用域、原型链、继承与闭包详解</h2>
<blockquote>注意：本章讲的是在es6之前的原型链与继承。es6引入了类的概念，只是在写法上有所不同，原理是一样的。</blockquote>
<h3 id="articleHeader1">几个面试常问的几个问题，你是否知道</h3>
<ol>
<li>instanceof的原理</li>
<li>如何准确判断变量的类型</li>
<li>如何写一个原型链继承的例子</li>
<li>描述new一个对象的过程</li>
</ol>
<blockquote>也许有些同学知道这几个问题的答案，就会觉得很小儿科，如果你还不知道这几个问题的答案或者背后所涉及到的知识点，那就好好看完下文，想必对你会有帮助。先不说答案，下面先分析一下涉及到的知识点。</blockquote>
<h3 id="articleHeader2">什么是构造函数</h3>
<p>JavaScript没有类的概念，JavaScript是一种基于对象的语言，除了五中值类型（number boolean string null undefined）之外，其他的三种引用类型（object、Array、Function）本质上都是对象，而构造函数其实也是普通的函数，只是可以使用构造函数来实例化对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="事实上，当任意一个普通函数用于创建一类对象时，它就被称作构造函数。像js的内置函数Object、Array、Date等都是构造函数。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">事实上，当任意一个普通函数用于创建一类对象时，它就被称作构造函数。像js的内置函数<span class="hljs-built_in">Object</span>、<span class="hljs-built_in">Array</span>、<span class="hljs-built_in">Date</span>等都是构造函数。</code></pre>
<p>在定义构造函数有以下几个特点：</p>
<ul>
<li>以大写字母开头定义构造函数</li>
<li>在函数内部对新对象（this）的属性进行设置</li>
<li>返回值必须是this，或者其它非对象类型的值</li>
</ul>
<p>下面定义一个简单的、标准的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Obj(){
    this.name = 'name'
    return this // 默认有这一行 
}
var foo = new Obj() // 使用上面定义的构造函数创建一个对象实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Obj</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'name'</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span> <span class="hljs-comment">// 默认有这一行 </span>
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Obj() <span class="hljs-comment">// 使用上面定义的构造函数创建一个对象实例</span></code></pre>
<h3 id="articleHeader3">原型特性</h3>
<p>js原型有5个特点，记住这5条特点，相信你一定会弄明白长期困扰你的原型关系。</p>
<ol>
<li>除了null所有引用类型（Object、Array、Function）都有对象特性，也就是都可以自由扩展属性。</li>
<li>所有引用类型都有一个_proto_属性（又称为：隐式属性），_proto_是一个普通的对象。所有的对象都会有一个constructor属性，constructor始终指向创建当前对象的构造函数</li>
<li>所有的函数都有一个prototype属性（又称为：显式属性），也是一个普通对象，这个prototype有一个constructor属性指向该函数。</li>
<li>所有的引用类型的_proto_属性指向它的构造函数的prototype属性（比如：obj._proto_指向Object.prototype,obj是定义的一个普通对象，Object是js的内置函数）</li>
<li>当从一个对象中获得某个属性时，如果这个对象没有该属性，就会去它的_proto_（也就是它的构造函数的prototype）中去寻找</li>
</ol>
<p>先来解释一下这几条：<br>第一条的自由扩展性可以通过一个简单的例子来看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}
obj.name = 'name'
console.log(obj) // {name:'name'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> obj = {}
obj<span class="hljs-selector-class">.name</span> = <span class="hljs-string">'name'</span>
console.log(obj) <span class="hljs-comment">// {name:'name'}</span></code></pre>
<p>第二条和第三条是javascript就是这么规定的，没什么好说的</p>
<p>第四条可以这么理解，当定义一个引用类型的变量var obj = {} 其实是var obj = new Object()的语法糖，这样Object就是obj的构造函数，根据第4条规定，obj._proto_ === Object.prototype，如果不理解可以看看上一章我们讲的js内置函数和上面讲的构造函数</p>
<p>第五条应该好理解，当从obj中获取某个属性时，如果obj中没有定义该属性，就会逐级去它的_proto_对象中去寻找，而它的_proto_指向Object的prototype，也就是从Object的prototype对象中去寻找。</p>
<h3 id="articleHeader4">原型链与继承</h3>
<blockquote>如果上面明白了原型，那么原型链就会很好理解</blockquote>
<p>根据原型定义的第4条和第5条，很容易发现通过对象的_proto_和函数的prototype把我们变量和构造函数（自定义的构造函数以及内置构造函数）像链子一样链接起来，所以又叫他原型链。</p>
<p>有了原型链，就有了继承，继承就是一个对象像继承遗产一样继承从它的构造函数中获得一些属性的访问权。从下面一个小例子理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
// 原型继承
function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};
<span class="hljs-comment">// 原型继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params"></span>)</span>{ 
}
Cat.prototype = <span class="hljs-keyword">new</span> Animal();
Cat.prototype.name = <span class="hljs-string">'cat'</span>;</code></pre>
<p>上面例子中在Foo构造函数的prototype中自定义一个somefn函数。然后通过new Foo()创建一个对象实例并赋值给bar变量，此时bar就等于{name:'bar'}。然后bar.somefn就去bar对象中寻找somefn这个属性，发现找不到，然后就去它的_proto_（其实就是Foo的prototype）中寻找，发现somefn就在Foo的prototype中定义了，就可以愉快的调用并执行somefn了。</p>
<p>这里其实就是一个原型链与继承的典型例子，开发中可能构造函数复杂一点，属性定义的多一些，但是原理都是一样的。</p>
<blockquote>留一个问题，根据上面例子，如果执行bar.stString(),应该去哪里找toString这个方法？ （提示：prototype也是普通对象，也有自己的_proto_）</blockquote>
<h3 id="articleHeader5">几种继承方式</h3>
<p>这几种都是es5中的继承，es6中提供了class类，继承起来更方便。</p>
<h4>原型继承</h4>
<p>上述例子就是一个原型继承：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
// 原型继承
function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

var cat = new Cat()
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};
<span class="hljs-comment">// 原型继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params"></span>)</span>{ 
}
Cat.prototype = <span class="hljs-keyword">new</span> Animal();
Cat.prototype.name = <span class="hljs-string">'cat'</span>;

<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat()
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Animal); <span class="hljs-comment">//true </span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Cat); <span class="hljs-comment">//true</span></code></pre>
<p><strong>优点：</strong></p>
<ul>
<li>非常纯粹的继承关系，实例是子类的实例，也是父类的实例</li>
<li>简单，易于实现</li>
</ul>
<p><strong>缺点</strong></p>
<ul>
<li>要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中</li>
<li>无法实现多继承</li>
<li>来自原型对象的引用属性是所有实例共享的（严重缺点）</li>
<li>创建子类实例时，无法向父类构造函数传参（严重缺点）</li>
</ul>
<h4>构造继承</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
// 构造继承
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep()); // Tom正在睡觉！
// console.log(cat.eat('fish')); // cat.eat is not a function
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};
<span class="hljs-comment">// 构造继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>)</span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Tom'</span>;
}

<span class="hljs-comment">// Test Code</span>
<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat();
<span class="hljs-built_in">console</span>.log(cat.name);
<span class="hljs-built_in">console</span>.log(cat.sleep()); <span class="hljs-comment">// Tom正在睡觉！</span>
<span class="hljs-comment">// console.log(cat.eat('fish')); // cat.eat is not a function</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Animal); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Cat); <span class="hljs-comment">// true</span></code></pre>
<p><strong>优点</strong></p>
<ul>
<li>解决了1中，子类实例共享父类引用属性的问题</li>
<li>创建子类实例时，可以向父类传递参数</li>
<li>可以实现多继承</li>
</ul>
<p><strong>缺点</strong></p>
<ul>
<li>实例并不是父类的实例，只是子类的实例</li>
<li>只能继承父类的实例属性和方法，不能继承原型属性/方法</li>
<li>无法实现函数复用，每个子类都有父类实例函数的副本，影响性能</li>
</ul>
<h4>实例继承</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

// 实例继承
function Cat(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}
var cat = new Cat(); // 或者可以直接var cat = Cat()
console.log(cat.name);
console.log(cat.sleep()); // Tom正在睡觉！
console.log(cat.eat('fish')); // Tom正在吃：fish
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};

<span class="hljs-comment">// 实例继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">new</span> Animal();
  instance.name = name || <span class="hljs-string">'Tom'</span>;
  <span class="hljs-keyword">return</span> instance;
}
<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat(); <span class="hljs-comment">// 或者可以直接var cat = Cat()</span>
<span class="hljs-built_in">console</span>.log(cat.name);
<span class="hljs-built_in">console</span>.log(cat.sleep()); <span class="hljs-comment">// Tom正在睡觉！</span>
<span class="hljs-built_in">console</span>.log(cat.eat(<span class="hljs-string">'fish'</span>)); <span class="hljs-comment">// Tom正在吃：fish</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Animal); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Cat); <span class="hljs-comment">// false</span></code></pre>
<p><strong>优点</strong></p>
<ul><li>不限制调用方式，不管是new Cat()还是Cat(),返回的对象具有相同的效果</li></ul>
<p><strong>缺点</strong></p>
<ul>
<li>实例是父类的实例，不是子类的实例</li>
<li>不支持多继承</li>
</ul>
<h4>组合继承</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
// 组合继承
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep()); // Tom正在睡觉！
console.log(cat.eat('fish')); // Tom正在吃：fish
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};
<span class="hljs-comment">// 组合继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>)</span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Tom'</span>;
}
Cat.prototype = <span class="hljs-keyword">new</span> Animal();
Cat.prototype.constructor = Cat;
<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat();
<span class="hljs-built_in">console</span>.log(cat.name);
<span class="hljs-built_in">console</span>.log(cat.sleep()); <span class="hljs-comment">// Tom正在睡觉！</span>
<span class="hljs-built_in">console</span>.log(cat.eat(<span class="hljs-string">'fish'</span>)); <span class="hljs-comment">// Tom正在吃：fish</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Animal); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Cat); <span class="hljs-comment">// true</span>
</code></pre>
<p><strong>优点</strong></p>
<ul>
<li>弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法</li>
<li>既是子类的实例，也是父类的实例</li>
<li>不存在引用属性共享问题</li>
<li>可传参</li>
<li>函数可复用</li>
</ul>
<p><strong>缺点</strong></p>
<ul><li>调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）</li></ul>
<h4>寄生继承</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ob = {name:&quot;小明&quot;,friends:['小花','小白']};

function object(o){
  function F(){}//创建一个构造函数F
  F.prototype = o;
  return new F();
}

//上面再ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的  

function createOb(o){
   var newob = object(o);//创建对象
   newob.sayname = function(){//增强对象
       console.log(this.name);
   }

   return newob;//指定对象
}

var ob1 = createOb(ob);
ob1.sayname()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ob = {<span class="hljs-attr">name</span>:<span class="hljs-string">"小明"</span>,<span class="hljs-attr">friends</span>:[<span class="hljs-string">'小花'</span>,<span class="hljs-string">'小白'</span>]};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span>(<span class="hljs-params">o</span>)</span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{}<span class="hljs-comment">//创建一个构造函数F</span>
  F.prototype = o;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}

<span class="hljs-comment">//上面再ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的  </span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createOb</span>(<span class="hljs-params">o</span>)</span>{
   <span class="hljs-keyword">var</span> newob = object(o);<span class="hljs-comment">//创建对象</span>
   newob.sayname = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//增强对象</span>
       <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
   }

   <span class="hljs-keyword">return</span> newob;<span class="hljs-comment">//指定对象</span>
}

<span class="hljs-keyword">var</span> ob1 = createOb(ob);
ob1.sayname()</code></pre>
<blockquote>寄生继承原理尚不明白。</blockquote>
<h4>寄生组合继承</h4>
<p>寄生组合继承有两种方式：</p>
<p><em>第一种：利用创建没有实例方法的函数</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

//寄生组合继承
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
  Cat.prototype.constructor = Cat;
})();

var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep()); // Tom正在睡觉！
console.log(cat.eat('fish')); // Tom正在吃：fish
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};

<span class="hljs-comment">//寄生组合继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>)</span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Tom'</span>;
}
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 创建一个没有实例方法的类</span>
  <span class="hljs-keyword">var</span> Super = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
  Super.prototype = Animal.prototype;
  <span class="hljs-comment">//将实例作为子类的原型</span>
  Cat.prototype = <span class="hljs-keyword">new</span> Super();
  Cat.prototype.constructor = Cat;
})();

<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat();
<span class="hljs-built_in">console</span>.log(cat.name);
<span class="hljs-built_in">console</span>.log(cat.sleep()); <span class="hljs-comment">// Tom正在睡觉！</span>
<span class="hljs-built_in">console</span>.log(cat.eat(<span class="hljs-string">'fish'</span>)); <span class="hljs-comment">// Tom正在吃：fish</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Animal); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Cat); <span class="hljs-comment">//true</span>
</code></pre>
<p><em>第二种：利用Object.create函数</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 寄生继承核心方法
function inheritPrototype(Parent, Children){
    var prototype = Object.create(Parent.prototype);
    prototype.constructor = Children;
    Children.prototype = prototype;
}
// 父类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

// 子类
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
inheritPrototype(Animal, Cat)

var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep()); // Tom正在睡觉！
console.log(cat.eat('fish')); // Tom正在吃：fish
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 寄生继承核心方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritPrototype</span>(<span class="hljs-params">Parent, Children</span>)</span>{
    <span class="hljs-keyword">var</span> prototype = <span class="hljs-built_in">Object</span>.create(Parent.prototype);
    prototype.constructor = Children;
    Children.prototype = prototype;
}
<span class="hljs-comment">// 父类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// 属性</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Animal'</span>;
  <span class="hljs-comment">// 实例方法</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在睡觉！'</span>);
  }
}
<span class="hljs-comment">// 原型方法</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'正在吃：'</span> + food);
};

<span class="hljs-comment">// 子类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>)</span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'Tom'</span>;
}
inheritPrototype(Animal, Cat)

<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat();
<span class="hljs-built_in">console</span>.log(cat.name);
<span class="hljs-built_in">console</span>.log(cat.sleep()); <span class="hljs-comment">// Tom正在睡觉！</span>
<span class="hljs-built_in">console</span>.log(cat.eat(<span class="hljs-string">'fish'</span>)); <span class="hljs-comment">// Tom正在吃：fish</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Animal); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(cat <span class="hljs-keyword">instanceof</span> Cat); <span class="hljs-comment">//true</span>
</code></pre>
<p>Object.create其实与以下代码等价</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(o){
    function f(){}
    f.prototype = o;
    return new f();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span><span class="hljs-params">(o)</span></span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">()</span></span>{}
    f.prototype = o;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> f();
}</code></pre>
<p><strong>优点</strong></p>
<ul><li>最完美的继承解决方案</li></ul>
<p><strong>缺点</strong></p>
<ul><li>实现复杂</li></ul>
<h3 id="articleHeader6">解答一下最一开始提出的问题</h3>
<p>看到这里应该对原型链与继承的原理有所了解了，再回头看上面的问题，你也会发现这都是小儿科。<br>第一个问题：instanceof原理？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = []
arr instanceof Array" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = []
arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span></code></pre>
<p>instanceof原理就是利用了原型链，当执行arr instanceof Array时，会从arr的_proto_一层一层往上找，看是否能不能找到Array的prototype。<br>我们知道var arr = [] 其实是var arr = new Array()的语法糖，所以arr的_proto_指向Array的prototype，结果返回true</p>
<p>第二个问题：如何准确判断变量类型?<br>可以使用instanceof帮助我们判断，而不是typeof</p>
<p>第三个问题：如何写一个原型链继承的例子？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo () {
    this.name = 'name'
    this.run = function () {
        console.log(this.name)
    }
}
function Bar () {}
Bar.prototype = new Foo() // 从构造函数Foo中继承
var baz = new Bar()
baz.run() // 打印出 'name'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'name'</span>
    <span class="hljs-keyword">this</span>.run = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Bar</span> (<span class="hljs-params"></span>) </span>{}
Bar.prototype = <span class="hljs-keyword">new</span> Foo() <span class="hljs-comment">// 从构造函数Foo中继承</span>
<span class="hljs-keyword">var</span> baz = <span class="hljs-keyword">new</span> Bar()
baz.run() <span class="hljs-comment">// 打印出 'name'</span></code></pre>
<p>第四个问题：描述new一个对象的过程</p>
<ol>
<li>创建一个新的对象，</li>
<li>获得构造函数的prototype属性，并把prototype赋值给新对象的_proto_,this指向这个新对象</li>
<li>执行构造函数，返回构造函数的内容</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Js基础知识（二） - 原型链与继承精彩的讲解

## 原文链接
[https://segmentfault.com/a/1190000013085956](https://segmentfault.com/a/1190000013085956)


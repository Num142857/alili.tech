---
title: '《javascript高级程序设计》笔记：继承' 
date: 2018-12-26 2:30:14
hidden: true
slug: ovcqxdugn8
categories: [reprint]
---

{{< raw >}}

                    
<p>继承和前面两篇文章中的知识非常相关，如果对<code>函数创建原理</code>和<code>原型链</code>不熟悉，请猛戳：<br><a href="https://segmentfault.com/a/1190000011839528">《javascript高级程序设计》笔记：创建对象</a><br><a href="https://segmentfault.com/a/1190000011880268" target="_blank">《javascript高级程序设计》笔记：原型图解</a></p>
<blockquote><p>继承，通俗的说，就是将自身不存在的属性或方法，通过某种方式为自己所用</p></blockquote>
<p>文章分别介绍原型链继承、call/apply继承（借用构造函数继承）、组合继承、原型式继承、寄生式继承、寄生组合式继承</p>
<h2 id="articleHeader0">1. 原型链继承</h2>
<p>核心：将父类的实例作为子类的原型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(){
  this.property = true;
}
SuperType.prototype.getSuperValue = function(){
  return this.property;
};

function SubType(){
  this.subproperty = false;
}
// 继承自SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
  return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue());//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.property = <span class="hljs-literal">true</span>;
}
SuperType.prototype.getSuperValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.property;
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.subproperty = <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">// 继承自SuperType</span>
SubType.prototype = <span class="hljs-keyword">new</span> SuperType();

SubType.prototype.getSubValue = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.subproperty;
};

<span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">new</span> SubType();
alert(instance.getSuperValue());<span class="hljs-comment">//true</span></code></pre>
<p>简单的原型链分析</p>
<p><span class="img-wrap"><img data-src="/img/bVYasL?w=1326&amp;h=692" src="https://static.alili.tech/img/bVYasL?w=1326&amp;h=692" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在<code>《javascript高级程序设计》笔记：创建对象</code> 的文章中，使用原型创建对象会存在多个实例对引用类型的操作会被篡改的问题，在上面同样存在这个问题，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(){
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
function SubType(){}

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push(&quot;black&quot;);
alert(instance1.colors); //&quot;red,blue,green,black&quot;

var instance2 = new SubType(); 
alert(instance2.colors); //&quot;red,blue,green,black&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"green"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params"></span>)</span>{}

SubType.prototype = <span class="hljs-keyword">new</span> SuperType();

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType();
instance1.colors.push(<span class="hljs-string">"black"</span>);
alert(instance1.colors); <span class="hljs-comment">//"red,blue,green,black"</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType(); 
alert(instance2.colors); <span class="hljs-comment">//"red,blue,green,black"</span></code></pre>
<p>两个实例对象instance1和instance2的colors属性指向相同，改变一个会影响另一个实例的属性</p>
<p>缺陷：<br>（1）原型链继承多个实例的引用类型属性指向相同，存在篡改的可能<br>（2）不能传递参数</p>
<h2 id="articleHeader1">2. 借用构造函数继承</h2>
<p>核心：使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(name){
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}

function SubType(name, age){
  // 继承自SuperType
  SuperType.call(this, name);
  
  this.age = age;
}

var instance1 = new SubType(&quot;Nicholas&quot;, 29);
instance1.colors.push(&quot;black&quot;);
alert(instance1.colors);    //&quot;red,blue,green,black&quot;

var instance2 = new SubType();
alert(instance2.colors);    //&quot;red,blue,green&quot;

alert(instance1.name); // &quot;Nicholas&quot;
alert(instance1.age); // 29" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"green"</span>];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params">name, age</span>)</span>{
  <span class="hljs-comment">// 继承自SuperType</span>
  SuperType.call(<span class="hljs-keyword">this</span>, name);
  
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">"Nicholas"</span>, <span class="hljs-number">29</span>);
instance1.colors.push(<span class="hljs-string">"black"</span>);
alert(instance1.colors);    <span class="hljs-comment">//"red,blue,green,black"</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType();
alert(instance2.colors);    <span class="hljs-comment">//"red,blue,green"</span>

alert(instance1.name); <span class="hljs-comment">// "Nicholas"</span>
alert(instance1.age); <span class="hljs-comment">// 29</span></code></pre>
<p>借用构造函数继承的核心就在于<code>SuperType.call(this, name)</code>，“借调”了SuperType构造函数，这样，SubType的每个实例都会将SuperType中的属性复制一份</p>
<p>缺陷：<br>（1）只能继承父类的实例属性和方法，不能继承原型属性/方法<br>（2）无法实现复用，每个子类都有父类实例函数的副本，影响性能</p>
<h2 id="articleHeader2">3. 组合继承</h2>
<p>核心：结合原型链继承和构造函数继承通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用</p>
<p>其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承，这样，既通过在原型上定义方法实现了函数复用，又能保证每个实例都有它自己的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(name){
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  //继承属性
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType(); 
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType(&quot;Nicholas&quot;, 29);
instance1.colors.push(&quot;black&quot;);
alert(instance1.colors); //&quot;red,blue,green,black&quot;
instance1.sayName(); //&quot;Nicholas&quot;;
instance1.sayAge(); //29

var instance2 = new SubType(&quot;Greg&quot;, 27);
alert(instance2.colors); //&quot;red,blue,green&quot;
instance2.sayName(); //&quot;Greg&quot;;
instance2.sayAge(); //27" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"green"</span>];
}
SuperType.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params">name, age</span>)</span>{
  <span class="hljs-comment">//继承属性</span>
  SuperType.call(<span class="hljs-keyword">this</span>, name);
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-comment">// 继承方法</span>
SubType.prototype = <span class="hljs-keyword">new</span> SuperType(); 
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.age);
};

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">"Nicholas"</span>, <span class="hljs-number">29</span>);
instance1.colors.push(<span class="hljs-string">"black"</span>);
alert(instance1.colors); <span class="hljs-comment">//"red,blue,green,black"</span>
instance1.sayName(); <span class="hljs-comment">//"Nicholas";</span>
instance1.sayAge(); <span class="hljs-comment">//29</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">"Greg"</span>, <span class="hljs-number">27</span>);
alert(instance2.colors); <span class="hljs-comment">//"red,blue,green"</span>
instance2.sayName(); <span class="hljs-comment">//"Greg";</span>
instance2.sayAge(); <span class="hljs-comment">//27</span></code></pre>
<p>图解：</p>
<p><span class="img-wrap"><img data-src="/img/bVYasM?w=1386&amp;h=406" src="https://static.alili.tech/img/bVYasM?w=1386&amp;h=406" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>缺陷：<br>父类中的实例属性和方法既存在于子类的实例中，又存在于子类的原型中，不过仅是内存占用，因此，在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法</p>
<p>这个方法是javascript中最常用的继承模式</p>
<h2 id="articleHeader3">4. 原型式继承</h2>
<p>核心：直接将某个对象直接赋值给构造函数的原型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(obj){
  function F(){}
  F.prototype = obj;
  return new F();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{}
  F.prototype = obj;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}</code></pre>
<p>object()对传入其中的对象执行了一次<code>浅复制</code>，将F的原型直接指向传入的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
  name: &quot;Nicholas&quot;,
  friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]
};

var anotherPerson = object(person);
anotherPerson.name = &quot;Greg&quot;;
anotherPerson.friends.push(&quot;Rob&quot;);

var yetAnotherPerson = object(person);
yetAnotherPerson.name = &quot;Linda&quot;;
yetAnotherPerson.friends.push(&quot;Barbie&quot;);

alert(person.friends);   //&quot;Shelby,Court,Van,Rob,Barbie&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"Nicholas"</span>,
  <span class="hljs-attr">friends</span>: [<span class="hljs-string">"Shelby"</span>, <span class="hljs-string">"Court"</span>, <span class="hljs-string">"Van"</span>]
};

<span class="hljs-keyword">var</span> anotherPerson = object(person);
anotherPerson.name = <span class="hljs-string">"Greg"</span>;
anotherPerson.friends.push(<span class="hljs-string">"Rob"</span>);

<span class="hljs-keyword">var</span> yetAnotherPerson = object(person);
yetAnotherPerson.name = <span class="hljs-string">"Linda"</span>;
yetAnotherPerson.friends.push(<span class="hljs-string">"Barbie"</span>);

alert(person.friends);   <span class="hljs-comment">//"Shelby,Court,Van,Rob,Barbie"</span></code></pre>
<p>缺点：<br>（1）原型链继承多个实例的引用类型属性指向相同，存在篡改的可能<br>（2）无法传递参数</p>
<p>另外，ES5中存在<code>Object.create()</code>的方法，能够代替上面的object方法</p>
<h2 id="articleHeader4">5. 寄生式继承</h2>
<p>核心：在原型式继承的基础上，增强对象，返回构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createAnother(original){ 
  varclone=object(original); // 过调用函数创建一个新对象
  clone.sayHi = function(){ // 以某种方式增强这个对象
    alert(&quot;hi&quot;);
  };
  return clone; // 返回对象
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAnother</span>(<span class="hljs-params">original</span>)</span>{ 
  varclone=object(original); <span class="hljs-comment">// 过调用函数创建一个新对象</span>
  clone.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">// 以某种方式增强这个对象</span>
    alert(<span class="hljs-string">"hi"</span>);
  };
  <span class="hljs-keyword">return</span> clone; <span class="hljs-comment">// 返回对象</span>
}</code></pre>
<p>函数的主要作用是为构造函数新增属性和方法，以增强函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
  name: &quot;Nicholas&quot;,
  friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //&quot;hi&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"Nicholas"</span>,
  <span class="hljs-attr">friends</span>: [<span class="hljs-string">"Shelby"</span>, <span class="hljs-string">"Court"</span>, <span class="hljs-string">"Van"</span>]
};
<span class="hljs-keyword">var</span> anotherPerson = createAnother(person);
anotherPerson.sayHi(); <span class="hljs-comment">//"hi"</span></code></pre>
<p>缺点：<br>（1）原型链继承多个实例的引用类型属性指向相同，存在篡改的可能<br>（2）无法传递参数</p>
<h2 id="articleHeader5">6. 寄生组合式继承</h2>
<p>核心：结合借用构造函数传递参数和寄生模式实现继承</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); //创建对象
  prototype.constructor = subType;                    // 增强对象
  subType.prototype = prototype;                      // 指定对象
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType(&quot;xyc&quot;, 23);
var instance2 = new SubType(&quot;lxy&quot;, 23);

instance1.colors.push(&quot;2&quot;); // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;2&quot;]
instance1.colors.push(&quot;3&quot;); // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;3&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritPrototype</span>(<span class="hljs-params">subType, superType</span>)</span>{
  <span class="hljs-keyword">var</span> prototype = <span class="hljs-built_in">Object</span>.create(superType.prototype); <span class="hljs-comment">//创建对象</span>
  prototype.constructor = subType;                    <span class="hljs-comment">// 增强对象</span>
  subType.prototype = prototype;                      <span class="hljs-comment">// 指定对象</span>
}

<span class="hljs-comment">// 父类初始化实例属性和原型属性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"green"</span>];
}
SuperType.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-comment">// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params">name, age</span>)</span>{
  SuperType.call(<span class="hljs-keyword">this</span>, name);
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-comment">// 将父类原型指向子类</span>
inheritPrototype(SubType, SuperType);

<span class="hljs-comment">// 新增子类原型属性</span>
SubType.prototype.sayAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.age);
}

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">"xyc"</span>, <span class="hljs-number">23</span>);
<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">"lxy"</span>, <span class="hljs-number">23</span>);

instance1.colors.push(<span class="hljs-string">"2"</span>); <span class="hljs-comment">// ["red", "blue", "green", "2"]</span>
instance1.colors.push(<span class="hljs-string">"3"</span>); <span class="hljs-comment">// ["red", "blue", "green", "3"]</span></code></pre>
<p>图解：</p>
<p><span class="img-wrap"><img data-src="/img/bVYasO?w=982&amp;h=432" src="https://static.alili.tech/img/bVYasO?w=982&amp;h=432" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>寄生组合继承集合了前面几种继承优点，几乎避免了上面继承方式的所有缺陷，是执行效率最高也是应用面最广的，就是实现的过程相对繁琐</p>
<p>参考：<br><a href="http://www.cnblogs.com/humin/p/4556820.html" rel="nofollow noreferrer" target="_blank">JS继承的实现方式</a><br><a href="https://segmentfault.com/a/1190000003786904#articleHeader5">面向对象的程序设计之继承</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" rel="nofollow noreferrer" target="_blank">MDN——Object.create()</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：继承

## 原文链接
[https://segmentfault.com/a/1190000011917606](https://segmentfault.com/a/1190000011917606)


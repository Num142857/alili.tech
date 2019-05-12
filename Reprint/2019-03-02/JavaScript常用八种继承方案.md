---
title: 'JavaScript常用八种继承方案' 
date: 2019-03-02 2:30:07
hidden: true
slug: 183cav6qpdb
categories: [reprint]
---

{{< raw >}}

                    
<p>更新：在常用七种继承方案的基础之上增加了ES6的类继承，所以现在变成八种啦，欢迎加高级前端进阶群一起学习（文末）。</p>
<p>--- 2018.10.30</p>
<h4>1、原型链继承</h4>
<p>构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。</p>
<p>继承的本质就是<strong>复制，即重写原型对象，代之以一个新类型的实例</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType(); 

SubType.prototype.getSubValue = function() {
    return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue()); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.property = <span class="hljs-literal">true</span>;
}

SuperType.prototype.getSuperValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.property;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.subproperty = <span class="hljs-literal">false</span>;
}

<span class="hljs-comment">// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype</span>
SubType.prototype = <span class="hljs-keyword">new</span> SuperType(); 

SubType.prototype.getSubValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.subproperty;
}

<span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">new</span> SubType();
<span class="hljs-built_in">console</span>.log(instance.getSuperValue()); <span class="hljs-comment">// true</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016891012?w=800&amp;h=417" src="https://static.alili.tech/img/remote/1460000016891012?w=800&amp;h=417" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"green"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params"></span>)</span>{}

SubType.prototype = <span class="hljs-keyword">new</span> SuperType();

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType();
instance1.colors.push(<span class="hljs-string">"black"</span>);
alert(instance1.colors); <span class="hljs-comment">//"red,blue,green,black"</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType(); 
alert(instance2.colors); <span class="hljs-comment">//"red,blue,green,black"</span></code></pre>
<h4>2、借用构造函数继承</h4>
<p>使用父类的构造函数来增强子类<strong>实例</strong>，等同于复制父类的实例给子类（不使用原型）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function  SuperType(){
    this.color=[&quot;red&quot;,&quot;green&quot;,&quot;blue&quot;];
}
function  SubType(){
    //继承自SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push(&quot;black&quot;);
alert(instance1.color);//&quot;red,green,blue,black&quot;

var instance2 = new SubType();
alert(instance2.color);//&quot;red,green,blue&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">SuperType</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.color=[<span class="hljs-string">"red"</span>,<span class="hljs-string">"green"</span>,<span class="hljs-string">"blue"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">SubType</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//继承自SuperType</span>
    SuperType.call(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType();
instance1.color.push(<span class="hljs-string">"black"</span>);
alert(instance1.color);<span class="hljs-comment">//"red,green,blue,black"</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType();
alert(instance2.color);<span class="hljs-comment">//"red,green,blue"</span></code></pre>
<p>核心代码是<code>SuperType.call(this)</code>，创建子类实例时调用<code>SuperType</code>构造函数，于是<code>SubType</code>的每个实例都会将SuperType中的属性复制一份。</p>
<p>缺点：</p>
<ul>
<li>只能继承父类的<strong>实例</strong>属性和方法，不能继承原型属性/方法</li>
<li>无法实现复用，每个子类都有父类实例函数的副本，影响性能</li>
</ul>
<h4>3、组合继承</h4>
<p>组合上述两种方法就是组合继承。用原型链实现对<strong>原型</strong>属性和方法的继承，用借用构造函数技术来实现<strong>实例</strong>属性的继承。</p>
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
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType(); 
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"green"</span>];
}
SuperType.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params">name, age</span>)</span>{
  <span class="hljs-comment">// 继承属性</span>
  <span class="hljs-comment">// 第二次调用SuperType()</span>
  SuperType.call(<span class="hljs-keyword">this</span>, name);
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-comment">// 继承方法</span>
<span class="hljs-comment">// 构建原型链</span>
<span class="hljs-comment">// 第一次调用SuperType()</span>
SubType.prototype = <span class="hljs-keyword">new</span> SuperType(); 
<span class="hljs-comment">// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType</span>
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
<p><span class="img-wrap"><img data-src="/img/remote/1460000016891013?w=800&amp;h=234" src="https://static.alili.tech/img/remote/1460000016891013?w=800&amp;h=234" alt="" title="" style="cursor: pointer;"></span></p>
<p>缺点：</p>
<ul>
<li>第一次调用<code>SuperType()</code>：给<code>SubType.prototype</code>写入两个属性name，color。</li>
<li>第二次调用<code>SuperType()</code>：给<code>instance1</code>写入两个属性name，color。</li>
</ul>
<p>实例对象<code>instance1</code>上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。</p>
<h4>4、原型式继承</h4>
<p>利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{}
  F.prototype = obj;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}</code></pre>
<p>object()对传入其中的对象执行了一次<code>浅复制</code>，将构造函数F的原型直接指向传入的对象。</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> person = {
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
<p>缺点：</p>
<ul>
<li>原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。</li>
<li>无法传递参数</li>
</ul>
<p>另外，ES5中存在<code>Object.create()</code>的方法，能够代替上面的object方法。</p>
<h4>5、寄生式继承</h4>
<p>核心：在原型式继承的基础上，增强对象，返回构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createAnother(original){
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert(&quot;hi&quot;);
  };
  return clone; // 返回这个对象
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAnother</span>(<span class="hljs-params">original</span>)</span>{
  <span class="hljs-keyword">var</span> clone = object(original); <span class="hljs-comment">// 通过调用 object() 函数创建一个新对象</span>
  clone.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  <span class="hljs-comment">// 以某种方式来增强对象</span>
    alert(<span class="hljs-string">"hi"</span>);
  };
  <span class="hljs-keyword">return</span> clone; <span class="hljs-comment">// 返回这个对象</span>
}</code></pre>
<p>函数的主要作用是为构造函数新增属性和方法，以<strong>增强函数</strong></p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"Nicholas"</span>,
  <span class="hljs-attr">friends</span>: [<span class="hljs-string">"Shelby"</span>, <span class="hljs-string">"Court"</span>, <span class="hljs-string">"Van"</span>]
};
<span class="hljs-keyword">var</span> anotherPerson = createAnother(person);
anotherPerson.sayHi(); <span class="hljs-comment">//"hi"</span></code></pre>
<p>缺点（同原型式继承）：</p>
<ul>
<li>原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。</li>
<li>无法传递参数</li>
</ul>
<h4>6、寄生组合式继承</h4>
<p>结合借用构造函数传递参数和寄生模式实现继承</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritPrototype</span>(<span class="hljs-params">subType, superType</span>)</span>{
  <span class="hljs-keyword">var</span> prototype = <span class="hljs-built_in">Object</span>.create(superType.prototype); <span class="hljs-comment">// 创建对象，创建父类原型的一个副本</span>
  prototype.constructor = subType;                    <span class="hljs-comment">// 增强对象，弥补因重写原型而失去的默认的constructor 属性</span>
  subType.prototype = prototype;                      <span class="hljs-comment">// 指定对象，将新创建的对象赋值给子类的原型</span>
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
<p><span class="img-wrap"><img data-src="/img/remote/1460000016891014" src="https://static.alili.tech/img/remote/1460000016891014" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个例子的高效率体现在它只调用了一次<code>SuperType</code>&nbsp;构造函数，并且因此避免了在<code>SubType.prototype</code>&nbsp;上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用<code>instanceof</code>&nbsp;和<code>isPrototypeOf()</code></p>
<p><strong>这是最成熟的方法，也是现在库实现的方法</strong></p>
<h4>7、混入方式继承多个对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do something
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyClass</span>(<span class="hljs-params"></span>) </span>{
     SuperClass.call(<span class="hljs-keyword">this</span>);
     OtherSuperClass.call(<span class="hljs-keyword">this</span>);
}

<span class="hljs-comment">// 继承一个类</span>
MyClass.prototype = <span class="hljs-built_in">Object</span>.create(SuperClass.prototype);
<span class="hljs-comment">// 混合其它</span>
<span class="hljs-built_in">Object</span>.assign(MyClass.prototype, OtherSuperClass.prototype);
<span class="hljs-comment">// 重新指定constructor</span>
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-comment">// do something</span>
};</code></pre>
<p><code>Object.assign</code>会把  <code>OtherSuperClass</code>原型上的函数拷贝到 <code>MyClass</code>原型上，使 MyClass 的所有实例都可用 OtherSuperClass 的方法。</p>
<h4>8、ES6类继承extends</h4>
<p><code>extends</code>关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。其中<code>constructor</code>表示构造函数，一个类中只能有一个构造函数，有多个会报出<code>SyntaxError</code>错误,如果没有显式指定构造方法，则会添加默认的 <code>constructor</code>方法，使用例子如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    
    // Getter
    get area() {
        return this.calcArea()
    }
    
    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area);
// 输出 200

-----------------------------------------------------------------
// 继承
class Square extends Rectangle {

  constructor(length) {
    super(length, length);
    
    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }
}

const square = new Square(10);
console.log(square.area);
// 输出 100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rectangle</span> </span>{
    <span class="hljs-comment">// constructor</span>
    <span class="hljs-keyword">constructor</span>(height, width) {
        <span class="hljs-keyword">this</span>.height = height;
        <span class="hljs-keyword">this</span>.width = width;
    }
    
    <span class="hljs-comment">// Getter</span>
    get area() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.calcArea()
    }
    
    <span class="hljs-comment">// Method</span>
    calcArea() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.height * <span class="hljs-keyword">this</span>.width;
    }
}

<span class="hljs-keyword">const</span> rectangle = <span class="hljs-keyword">new</span> Rectangle(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);
<span class="hljs-built_in">console</span>.log(rectangle.area);
<span class="hljs-comment">// 输出 200</span>

-----------------------------------------------------------------
<span class="hljs-comment">// 继承</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Square</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Rectangle</span> </span>{

  <span class="hljs-keyword">constructor</span>(length) {
    <span class="hljs-keyword">super</span>(length, length);
    
    <span class="hljs-comment">// 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。</span>
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Square'</span>;
  }

  get area() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.height * <span class="hljs-keyword">this</span>.width;
  }
}

<span class="hljs-keyword">const</span> square = <span class="hljs-keyword">new</span> Square(<span class="hljs-number">10</span>);
<span class="hljs-built_in">console</span>.log(square.area);
<span class="hljs-comment">// 输出 100</span></code></pre>
<p><code>extends</code>继承的核心代码如下，其实现和上述的寄生组合式继承方式一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subType, superType) {
  
    // 创建对象，创建父类原型的一个副本
    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    // 指定对象，将新创建的对象赋值给子类的原型
    subType.prototype = Object.create(superType &amp;&amp; superType.prototype, {
        constructor: {
            value: subType,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    if (superType) {
        Object.setPrototypeOf 
            ? Object.setPrototypeOf(subType, superType) 
            : subType.__proto__ = superType;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subType, superType</span>) </span>{
  
    <span class="hljs-comment">// 创建对象，创建父类原型的一个副本</span>
    <span class="hljs-comment">// 增强对象，弥补因重写原型而失去的默认的constructor 属性</span>
    <span class="hljs-comment">// 指定对象，将新创建的对象赋值给子类的原型</span>
    subType.prototype = <span class="hljs-built_in">Object</span>.create(superType &amp;&amp; superType.prototype, {
        <span class="hljs-attr">constructor</span>: {
            <span class="hljs-attr">value</span>: subType,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
        }
    });
    
    <span class="hljs-keyword">if</span> (superType) {
        <span class="hljs-built_in">Object</span>.setPrototypeOf 
            ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subType, superType) 
            : subType.__proto__ = superType;
    }
}</code></pre>
<h4>总结</h4>
<p>1、函数声明和类声明的区别</p>
<p>函数声明会提升，类声明不会。首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Rectangle(); 
// ReferenceError

class Rectangle {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Rectangle(); 
<span class="hljs-comment">// ReferenceError</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rectangle</span> </span>{}</code></pre>
<p>2、ES5继承和ES6继承的区别</p>
<ul>
<li>ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）.</li>
<li>ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。</li>
</ul>
<blockquote>
<a href="https://segmentfault.com/a/1190000011917606">《javascript高级程序设计》笔记：继承</a>  <br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" rel="nofollow noreferrer" target="_blank">MDN之Object.create()</a>  <br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank">MDN之Class</a>
</blockquote>
<h4>交流</h4>
<p>本人Github链接如下，欢迎各位Star</p>
<p><a href="http://github.com/yygmind/blog" rel="nofollow noreferrer" target="_blank">http://github.com/yygmind/blog</a></p>
<p>我是木易杨，现在是网易高级前端工程师，目前维护了一个高级前端进阶群，欢迎加入。接下来让我带你走进高级前端的世界，在进阶的路上，共勉！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016890954?w=1325&amp;h=897" src="https://static.alili.tech/img/remote/1460000016890954?w=1325&amp;h=897" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript常用八种继承方案

## 原文链接
[https://segmentfault.com/a/1190000016891009](https://segmentfault.com/a/1190000016891009)


---
title: 'JavaScript 继承方式详解' 
date: 2019-02-12 2:30:12
hidden: true
slug: noh8bske32e
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript 继承方式的概念</h2>
<p>js 中实现继承有两种常用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原型链继承（对象间的继承）
类式继承（构造函数间的继承）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>原型链继承（对象间的继承）
类式继承（构造函数间的继承）</code></pre>
<p>JavaScript不是真正的面向对象的语言，想实现继承可以用JS的原型<code>prototype</code>机制或者<code>call</code>和<code>apply</code>方法</p>
<p>在面向对象的语言中，可以使用类来创建一个自定义对象，当然<code>ES6</code>中也引入了<code>class</code>来创建类。在这之前，我们需要使用<code>js</code>的原型来创建自定义对象。</p>
<h2 id="articleHeader1">原型继承与类继承</h2>
<p><code>类继承</code>是在子类型构造函数的内部调用父类型的构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super (){
    this.colors = [&quot;blue&quot;,&quot;red&quot;];
}

function Sub () {
    Super.call(this);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span> <span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"blue"</span>,<span class="hljs-string">"red"</span>];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span> <span class="hljs-params">()</span> </span>{
    Super.call(<span class="hljs-keyword">this</span>);
}
</code></pre>
<p><code>原型式继承</code>是借助已有的对象创建新的对象，将子类的原型指向父类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super (id) {
    this.id = id;
}
Super.prototype.toString = function () {
    return 'Super' + this.id;
}

function Sub (id) {
    this.id = id;
}

Sub.prototype = new Super();  // 这句即原型式继承的核心代码
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span> <span class="hljs-params">(id)</span> </span>{
    <span class="hljs-keyword">this</span>.id = id;
}
Super.prototype.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Super'</span> + <span class="hljs-keyword">this</span>.id;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span> <span class="hljs-params">(id)</span> </span>{
    <span class="hljs-keyword">this</span>.id = id;
}

Sub.prototype = <span class="hljs-keyword">new</span> Super();  <span class="hljs-comment">// 这句即原型式继承的核心代码</span>
</code></pre>
<h2 id="articleHeader2">原型链继承</h2>
<p>为了让子类继承父类的属性和方法，首先需要定义一个构造函数，然后将父类的实例赋值给构造函数的原型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent () {
    this.name = 'Parent';
}

function Child () {
    this.age = 10;
}
Chid.prototype = new Parent();  // Chid继承Parent,形成原型链

var test = new Child();
console.log(test.name) // Parent
console.log(test.age)  // 10    得到被继承的属性

// 继续原型链继承
function Brother () {
    this.weight = 60;
}
Brother.prototype = new Child();
var peter = new Brother();
console.log(peter.name)  //继承了Child和Parent,输出Parent
console.log(peter.age)  // 输出10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Parent'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.age = <span class="hljs-number">10</span>;
}
Chid.prototype = <span class="hljs-keyword">new</span> Parent();  <span class="hljs-comment">// Chid继承Parent,形成原型链</span>

<span class="hljs-keyword">var</span> test = <span class="hljs-keyword">new</span> Child();
<span class="hljs-built_in">console</span>.log(test.name) <span class="hljs-comment">// Parent</span>
<span class="hljs-built_in">console</span>.log(test.age)  <span class="hljs-comment">// 10    得到被继承的属性</span>

<span class="hljs-comment">// 继续原型链继承</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Brother</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.weight = <span class="hljs-number">60</span>;
}
Brother.prototype = <span class="hljs-keyword">new</span> Child();
<span class="hljs-keyword">var</span> peter = <span class="hljs-keyword">new</span> Brother();
<span class="hljs-built_in">console</span>.log(peter.name)  <span class="hljs-comment">//继承了Child和Parent,输出Parent</span>
<span class="hljs-built_in">console</span>.log(peter.age)  <span class="hljs-comment">// 输出10</span></code></pre>
<p>所有的构造函数都继承自<code>Object</code>,它是自动完成继承的并不需要我们手动继承，那么接着看它们的从属关系</p>
<h3 id="articleHeader3">确定原型和实例的关系</h3>
<p>可以通过两种方式确定原型和实例的关系，通过操作符<code>instanceof</code>和<code>isPrototypeof()</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(peter instanceof Object); //true
console.log(test instanceof Brother)  //false,test是brother的父类
console.log(peter instanceof Child) //true
console.log(peter instanceof Parent)  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(peter <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(test <span class="hljs-keyword">instanceof</span> Brother)  <span class="hljs-comment">//false,test是brother的父类</span>
<span class="hljs-built_in">console</span>.log(peter <span class="hljs-keyword">instanceof</span> Child) <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(peter <span class="hljs-keyword">instanceof</span> Parent)  <span class="hljs-comment">//true</span></code></pre>
<p>只要是原型链中出现过的原型，都可以说是改原型链派生的实例的原型。因此，<code>isProtptypeof()</code>方法也会返回<code>true</code></p>
<p>在JS中，被继承的函数成为父类（或者 基类、超类），继承的函数成为子类（派生类）。使用原型继承主要有两个问题，一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型无法给父类型传递参数。</p>
<p>伪类解决引用共享和超类型无法传参的问题，我们可以采用'类式继承'的方式</p>
<h3 id="articleHeader4">类式继承(借用构造函数)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent (age) {
    this.colors = [&quot;blue&quot;,&quot;red&quot;,&quot;green&quot;];
    this.age = age;
}

function Child (age) {
    Parent.call(this,age);
}

var peter = new Child(20);
console.log(peter.age) //20
console.log(peter.colors) //blue,red,green

peter.colors.push(&quot;white&quot;);
console.log(peter.colors) //blue,red,green,white
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span> (<span class="hljs-params">age</span>) </span>{
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"blue"</span>,<span class="hljs-string">"red"</span>,<span class="hljs-string">"green"</span>];
    <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span> (<span class="hljs-params">age</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>,age);
}

<span class="hljs-keyword">var</span> peter = <span class="hljs-keyword">new</span> Child(<span class="hljs-number">20</span>);
<span class="hljs-built_in">console</span>.log(peter.age) <span class="hljs-comment">//20</span>
<span class="hljs-built_in">console</span>.log(peter.colors) <span class="hljs-comment">//blue,red,green</span>

peter.colors.push(<span class="hljs-string">"white"</span>);
<span class="hljs-built_in">console</span>.log(peter.colors) <span class="hljs-comment">//blue,red,green,white</span>
</code></pre>
<p>借用构造函数虽然解决了上面两张问题，但没有原型，所以我们需要<code>原型链+借用构造函数</code>的模式，这种模式成为<strong>组合继承</strong></p>
<h3 id="articleHeader5">组合继承</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent (age) {
    this.colors = [&quot;blue&quot;,&quot;red&quot;,&quot;green&quot;];
    this.age = age;
}

Parent.prototype.run = function () {
    return this.colors + ' is ' +this.age;
}
function Child (age) {
    Parent.call(this,age);  //对象冒充，给父类型传参
}
Child.prototype = new Parent();  //原型链继承

var peter = new Child(20);
console.log(peter.run()); //blue,red,green is 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span> (<span class="hljs-params">age</span>) </span>{
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">"blue"</span>,<span class="hljs-string">"red"</span>,<span class="hljs-string">"green"</span>];
    <span class="hljs-keyword">this</span>.age = age;
}

Parent.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.colors + <span class="hljs-string">' is '</span> +<span class="hljs-keyword">this</span>.age;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span> (<span class="hljs-params">age</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>,age);  <span class="hljs-comment">//对象冒充，给父类型传参</span>
}
Child.prototype = <span class="hljs-keyword">new</span> Parent();  <span class="hljs-comment">//原型链继承</span>

<span class="hljs-keyword">var</span> peter = <span class="hljs-keyword">new</span> Child(<span class="hljs-number">20</span>);
<span class="hljs-built_in">console</span>.log(peter.run()); <span class="hljs-comment">//blue,red,green is 20</span></code></pre>
<p>组合继承是一种比较常用的方法，思路是使用原型链实现对原型属性和方法的继承，借用构造函数来实现对实例属性的继承。这样，既实现了原型上定义方法的函数复用，又保证每个实例都有自己的属性。</p>
<p><code>call()与apply()</code>的用法：调用一个对象的一个方法，用另一个对象替换当前对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="call(thisObj,Object);  // call接收一个对象
apply(thisObj，[argArray])  //apply接收一个数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">call</span>(thisObj,<span class="hljs-keyword">Object</span>);  // <span class="hljs-keyword">call</span>接收一个对象
<span class="hljs-keyword">apply</span>(thisObj，[argArray])  //<span class="hljs-keyword">apply</span>接收一个数组</code></pre>
<h2 id="articleHeader6">原型式继承</h2>
<p>这种继承借助原型并基于已有的对象创建新的对象，同时还不用创建自定义类型的方式成为<code>原型式继承</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function obj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var box = {
        name : 'peter',
        arr : ['blue','red','green']
    };

var b1 = obj(box);
console.log(b1.name) // peter

b1.name = 'jack';
console.log(b1.name) //jack

console.log(b1.arr) //blue,red,green
b1.arr.push('white') //blue,red,green,white

var b2 = obj(box);
console.log(b2.name) // peter
console.log(b1.arr) //blue,red,green" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">obj</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
    F.prototype = o;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}

<span class="hljs-keyword">var</span> box = {
        <span class="hljs-attr">name</span> : <span class="hljs-string">'peter'</span>,
        <span class="hljs-attr">arr</span> : [<span class="hljs-string">'blue'</span>,<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>]
    };

<span class="hljs-keyword">var</span> b1 = obj(box);
<span class="hljs-built_in">console</span>.log(b1.name) <span class="hljs-comment">// peter</span>

b1.name = <span class="hljs-string">'jack'</span>;
<span class="hljs-built_in">console</span>.log(b1.name) <span class="hljs-comment">//jack</span>

<span class="hljs-built_in">console</span>.log(b1.arr) <span class="hljs-comment">//blue,red,green</span>
b1.arr.push(<span class="hljs-string">'white'</span>) <span class="hljs-comment">//blue,red,green,white</span>

<span class="hljs-keyword">var</span> b2 = obj(box);
<span class="hljs-built_in">console</span>.log(b2.name) <span class="hljs-comment">// peter</span>
<span class="hljs-built_in">console</span>.log(b1.arr) <span class="hljs-comment">//blue,red,green</span></code></pre>
<p>原型式继承首先在<code>obj()</code>函数内部创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的新实例。</p>
<h3 id="articleHeader7">寄生式继承</h3>
<p>这种继承方式是把<code>原型式+工厂模式</code>结合起来，目的是为了封装创建的过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function create(o){
        var f = obj(o);
        f.run = function () {
            return this.arr;//同样，会共享引用
        };
        return f;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span><span class="hljs-params">(o)</span></span>{
        <span class="hljs-keyword">var</span> f = obj(o);
        f.run = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.arr;<span class="hljs-comment">//同样，会共享引用</span>
        };
        <span class="hljs-keyword">return</span> f;
    }</code></pre>
<h3 id="articleHeader8">组合式继承的问题</h3>
<p>组合式继承是<code>JS</code>最常用的继承模式，但组合继承的父类型会在使用过程中被调用两次，一次是创建子类型的时候，另一次是在子类型构造函数的内部</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name){
        this.name = name;
        this.arr = ['哥哥','妹妹','父母'];
    }

    Parent.prototype.run = function () {
        return this.name;
    };

    function Child(name,age){
        Parent.call(this,age);//第二次调用
        this.age = age;
    }

    Child.prototype = new Parent();//第一次调用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">(name)</span></span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.arr = [<span class="hljs-string">'哥哥'</span>,<span class="hljs-string">'妹妹'</span>,<span class="hljs-string">'父母'</span>];
    }

    Parent.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span><span class="hljs-params">(name,age)</span></span>{
        Parent.call(<span class="hljs-keyword">this</span>,age);<span class="hljs-comment">//第二次调用</span>
        <span class="hljs-keyword">this</span>.age = age;
    }

    Child.prototype = <span class="hljs-keyword">new</span> Parent();<span class="hljs-comment">//第一次调用</span></code></pre>
<p>以上代码是组合继承，那么<code>寄生组合继承</code>解决了两次调用的问题</p>
<h3 id="articleHeader9">寄生组合继承</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function obj() {
    function F() {}
    F.prototype = o;
    return new F();
}
function create(parent,test) {
    var f = obj(parent.prototype); //创建对象
    f.constructor = test; //增强对象
}
function Parent(name){
        this.name = name;
        this.arr = ['brother','sister','parents'];
    }

Parent.prototype.run = function () {
        return this.name;
    };

function Child(name,age){
        Parent.call(this,name);
        this.age =age;
    }
inheritPrototype(Parent,Child);  //通过这里实现继承

var test = new Child('peter',20);
test.arr.push('new');
console.log(test.arr);  //brother,sister,parents,new
console.log(test.run());  //只共享了方法

var test2 = new Child('jack',22);
console.log(test2.arr);  //引用问题解决
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">obj</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
    F.prototype = o;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params">parent,test</span>) </span>{
    <span class="hljs-built_in">var</span> f = obj(<span class="hljs-built_in">parent</span>.prototype); <span class="hljs-comment">//创建对象</span>
    f.constructor = test; <span class="hljs-comment">//增强对象</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>)</span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.arr = [<span class="hljs-string">'brother'</span>,<span class="hljs-string">'sister'</span>,<span class="hljs-string">'parents'</span>];
    }

Parent.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    };

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name,age</span>)</span>{
        Parent.call(<span class="hljs-keyword">this</span>,name);
        <span class="hljs-keyword">this</span>.age =age;
    }
inheritPrototype(Parent,Child);  <span class="hljs-comment">//通过这里实现继承</span>

<span class="hljs-built_in">var</span> test = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">'peter'</span>,<span class="hljs-number">20</span>);
test.arr.push(<span class="hljs-string">'new'</span>);
<span class="hljs-built_in">console</span>.log(test.arr);  <span class="hljs-comment">//brother,sister,parents,new</span>
<span class="hljs-built_in">console</span>.log(test.run());  <span class="hljs-comment">//只共享了方法</span>

<span class="hljs-built_in">var</span> test2 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">'jack'</span>,<span class="hljs-number">22</span>);
<span class="hljs-built_in">console</span>.log(test2.arr);  <span class="hljs-comment">//引用问题解决</span>
</code></pre>
<h3 id="articleHeader10">call和apply</h3>
<p>call和apply可以用来改变函数中<code>this</code>的指向:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个全局函数
function f () {
    console.log(this.name);
}
// 定义一个全局变量
var name = 'peter';
var obj = {
    name: 'jack';
};

f.apply(window); //apple, 此时this 等于window  相当于window.f()
f.apply(obj);  //jack, 此时this === obj 相当于obj.f()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 定义一个全局函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-comment">// 定义一个全局变量</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">'peter'</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'jack'</span>;
};

f.apply(<span class="hljs-built_in">window</span>); <span class="hljs-comment">//apple, 此时this 等于window  相当于window.f()</span>
f.apply(obj);  <span class="hljs-comment">//jack, 此时this === obj 相当于obj.f()</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 继承方式详解

## 原文链接
[https://segmentfault.com/a/1190000004706922](https://segmentfault.com/a/1190000004706922)


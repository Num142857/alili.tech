---
title: '深入理解JS的面向对象（更新中）' 
date: 2018-12-11 2:30:10
hidden: true
slug: yfyf3fkxn18
categories: [reprint]
---

{{< raw >}}

                    
<p>面向对象是软件开发方法。面向对象的概念和应用已超越了程序设计和软件开发，扩展到如数据库系统、交互式界面、应用结构、应用平台、分布式系统、网络管理结构、CAD技术、人工智能等领域。面向对象是一种对现实世界理解和抽象的方法，是计算机编程技术发展到一定阶段后的产物。<br>JavaScript的面向对象主要包含了两块：1）创建对象 2）继承。接下来，我们将走进JS对象的世界，将依次带你深入了解函数、闭包、原型、原型链，并通过它们，最终实现创建对象和继承。</p>
<h3 id="articleHeader0">创建对象</h3>
<p>如果现在有一个纯牛奶，那么我们创建对象可以这样操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var milk ={
    name:'纯牛奶',
    taste:'pure',
    price:4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> milk ={
    name:<span class="hljs-string">'纯牛奶'</span>,
    taste:<span class="hljs-string">'pure'</span>,
    price:<span class="hljs-number">4</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2STJ?w=670&amp;h=443" src="https://static.alili.tech/img/bV2STJ?w=670&amp;h=443" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>那么如果现在有4种不同口味的牛奶呢？也创建四个不同的对象吗？milk1、milk2、milk3、milk4？若有一万种呢，是否也创建一万个对象？<br>显然，这是不合理的。这里，我们就要引入一个概念——工厂模式。</p>
<h4>工厂模式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createMilk(name,taste,price){
    return {
        name:name,
        taste:taste,
        price:price
    }
}

var milk1 = createMilk('纯牛奶','pure',4);
var milk2 = createMilk('有机奶','organic',4);
var milk3 = createMilk('低脂奶','low-fat',4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createMilk</span><span class="hljs-params">(name,taste,price)</span></span>{
    <span class="hljs-keyword">return</span> {
        name:name,
        taste:taste,
        price:price
    }
}

<span class="hljs-keyword">var</span> milk1 = createMilk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-number">4</span>);
<span class="hljs-keyword">var</span> milk2 = createMilk(<span class="hljs-string">'有机奶'</span>,<span class="hljs-string">'organic'</span>,<span class="hljs-number">4</span>);
<span class="hljs-keyword">var</span> milk3 = createMilk(<span class="hljs-string">'低脂奶'</span>,<span class="hljs-string">'low-fat'</span>,<span class="hljs-number">4</span>);</code></pre>
<p>在这里，我们实用一个函数，传入产品名、口味、价格3个参数，返回一个对象。这样，我们只要调用这个函数，并传入不同的参数，即可构建不同的对象。这就是工厂模式。</p>
<p>工厂模式有优点也有缺点：<br>1）优点：简单易懂、常见且实用。<br>2）缺点：对于如何证明我是一个牛奶这个问题上，则无法证明。//这句如若无法理解的话，可以暂时忽略，继续往下看哦！</p>
<h4>函数</h4>
<p>为了更好的讲解构造函数、原型、原型链等，建议你复习一下函数的一些基础知识，如果你已经对函数有深入的了解，可以选择跳过。戳这里：<a href="https://segmentfault.com/a/1190000013546879?share_user=1030000012913646">JS函数的一些基础知识</a></p>
<h4>构造函数</h4>
<p>还记得我们之前在讲述工厂模式的缺点时，所说的那句“对于如何证明我是一个牛奶这个问题上，则无法证明。”吗？接下来，就是见证奇迹的时刻！</p>
<h5>原生构造函数</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object();
var add = new Function('a','b','return a+b');

console.log(obj instanceof Object);//true
console.log(add instanceof Function);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-keyword">var</span> add = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'return a+b'</span>);

<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(add <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>);<span class="hljs-comment">//true</span></code></pre>
<p>Object和Function都是原生的构造函数，在这里我们就可以使用instanceof来判断是否为它的一个实例——即：证明了我就是一个牛奶哦！！</p>
<p>既然有原生的构造函数，那么我们可以不可以也自己定义构造函数呢？答案是可以的。</p>
<h5>构造函数</h5>
<p>一般来说，我们可以这样定义构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构造函数的函数名常大写
//在这里，我们没有显示的创建对象，没有return语句，却将属性和方法赋值给了this。
function Milk(name,taste,price){
    this.name = name;
    this.taste = taste;
    this.price = price;
}
//new操作符会默认的创建一个新对象，将function的this指向对象，然后将该对象赋值，对象就有了三个属性。
var milk1 = new Milk('纯牛奶','pure',4);
console.log(milk1 instanceof Milk);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//构造函数的函数名常大写</span>
<span class="hljs-comment">//在这里，我们没有显示的创建对象，没有return语句，却将属性和方法赋值给了this。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
<span class="hljs-comment">//new操作符会默认的创建一个新对象，将function的this指向对象，然后将该对象赋值，对象就有了三个属性。</span>
<span class="hljs-keyword">var</span> milk1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(milk1 <span class="hljs-keyword">instanceof</span> Milk);<span class="hljs-comment">//true</span></code></pre>
<h5>构造函数的不足</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Milk(name,taste,price){
    this.name = name;
    this.taste = taste;
    this.price = price;
    this.say = function(){
        console.log('Hello World');
    };
}
var milk1 = new Milk('纯牛奶','pure',4);
var milk2 = new Milk('纯牛奶','pure',4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
    <span class="hljs-keyword">this</span>.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello World'</span>);
    };
}
<span class="hljs-keyword">var</span> milk1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-number">4</span>);
<span class="hljs-keyword">var</span> milk2 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-number">4</span>);</code></pre>
<p>假设我们创建了一个Milk的构造函数，里面除了属性还带有一个say的方法，当我们new了两个对象之后，两个对象milk1和milk2是否都包含了功能相同的say方法呢？<br>这就是构造函数的不足之处：功能相同的函数，重复声明消耗空间！看来，我们的路还没有走到终点。</p>
<h4>原型prototype</h4>
<h5>什么是原型？</h5>
<p>原型是函数的一个属性，是一个对象。如果函数作为构造函数使用，那么这个构造函数的所有实例，都共享这个原型对象。<br><strong>「注」</strong>之前我们回忆函数时，回忆到，函数有三个常见属性：name，length和prototype喔！如果遗忘，可以戳这里：<a href="https://segmentfault.com/a/1190000013546879?share_user=1030000012913646" target="_blank">JS函数的一些基础知识</a>！</p>
<h5>原型详解</h5>
<p>1）constructor<br>原型的constructor是一个对象，我们可以这样简单的验证一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.constructor === Object //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Object</span>.prototype.<span class="hljs-keyword">constructor</span> === <span class="hljs-keyword">Object</span> <span class="hljs-comment">//true</span></code></pre>
<p>2）读写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Milk() {}

Milk.prototype.name = '纯牛奶';
Milk.prototype.taste = 'pure';
Milk.prototype.price = 4;
Milk.prototype.say = function(){
    console.log('Hello World');
};
var milk1 = new Milk();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-title">function</span> <span class="hljs-type">Milk</span>() {}

<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.name = '纯牛奶';
<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.taste = 'pure';
<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.price = 4;
<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.say = function(){
    console.log('<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>');
};
<span class="hljs-title">var</span> milk1 = new <span class="hljs-type">Milk</span>();
</code></pre>
<p>运行的结果如下：<br><span class="img-wrap"><img data-src="/img/bV2SVu?w=429&amp;h=351" src="https://static.alili.tech/img/bV2SVu?w=429&amp;h=351" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过这种方式，可以解决内存问题。但也会因此而共享name，taste，price和say()，尤其是共享name，taste和price，会产生问题。</p>
<p>3）isPrototypeOf<br>我们可以通过isPrototypeOf来进行原型的判定，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Milk() {}

Milk.prototype.name = '纯牛奶';
Milk.prototype.taste = 'pure';
Milk.prototype.price = 4;
Milk.prototype.say = function(){
    console.log('Hello World');
};
var milk1 = new Milk();
console.log(Milk.prototype.isPrototypeOf(milk1));//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-title">function</span> <span class="hljs-type">Milk</span>() {}

<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.name = '纯牛奶';
<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.taste = 'pure';
<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.price = 4;
<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.say = function(){
    console.log('<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>');
};
<span class="hljs-title">var</span> milk1 = new <span class="hljs-type">Milk</span>();
<span class="hljs-title">console</span>.log(<span class="hljs-type">Milk</span>.proto<span class="hljs-keyword">type</span>.isPrototypeOf(milk1));//true</code></pre>
<h5>原型、构造函数和实例之间的关系</h5>
<p><span class="img-wrap"><img data-src="/img/bV40qY?w=1066&amp;h=588" src="https://static.alili.tech/img/bV40qY?w=1066&amp;h=588" alt="图" title="图" style="cursor: pointer; display: inline;"></span></p>
<p>原型是函数的一个属性，是一个对象。如果函数作为构造函数使用，那么这个构造函数的所有实例，都共享这个原型对象。</p>
<h5>原型的不足</h5>
<p>原型的不足，本质上是共享的缺陷。我们可以看如下一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var price = 10;
var priceCopy = price;
priceCopy = 20;
console.log(price,priceCopy);//10,20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">price</span> = <span class="hljs-number">10</span>;
<span class="hljs-built_in">var</span> priceCopy = <span class="hljs-built_in">price</span>;
priceCopy = <span class="hljs-number">20</span>;
console.log(<span class="hljs-built_in">price</span>,priceCopy);//<span class="hljs-number">10</span>,<span class="hljs-number">20</span></code></pre>
<p>我们再看如下一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var taste = ['pure','organic'];
var tasteCopy = taste;
tasteCopy.push('low fat');
console.log(taste,tasteCopy);//[&quot;pure&quot;, &quot;organic&quot;, &quot;low fat&quot;],[&quot;pure&quot;, &quot;organic&quot;, &quot;low fat&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var taste = [<span class="hljs-string">'pure'</span>,<span class="hljs-string">'organic'</span>];
var tasteCopy = taste;
tasteCopy.push(<span class="hljs-string">'low fat'</span>);
console.log(taste,tasteCopy);//[<span class="hljs-string">"pure"</span>, <span class="hljs-string">"organic"</span>, <span class="hljs-string">"low fat"</span>],[<span class="hljs-string">"pure"</span>, <span class="hljs-string">"organic"</span>, <span class="hljs-string">"low fat"</span>]</code></pre>
<p>由此我们可见:</p>
<ul>
<li>对于基本类型，price和priceCopy是在内存中分别挖两块地方存储，因此，priceCopy的值改变的时候，并不影响price的值；</li>
<li>而对于引用类型，name和nameCopy是调用同一个引用，引用同一个数据，当我们在nameCopy添加一个名称的时候，引用的数据就添加了一个值，name也就因此而受到了影响，这就是数据的污染。</li>
</ul>
<p>共享会污染数据类型，因此原型创建对象也会污染数据类型。我们看下面一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Milk(){}
Milk.prototype.taste = ['pure','organic'];

var m1 = new Milk();
var m2 = new Milk();

m2.taste.push('low fat');

console.log('m1',m1.taste);//[&quot;pure&quot;, &quot;organic&quot;, &quot;low fat&quot;]
console.log('m2',m2.taste);//[&quot;pure&quot;, &quot;organic&quot;, &quot;low fat&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params"></span>)</span>{}
Milk.prototype.taste = [<span class="hljs-string">'pure'</span>,<span class="hljs-string">'organic'</span>];

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk();
<span class="hljs-keyword">var</span> m2 = <span class="hljs-keyword">new</span> Milk();

m2.taste.push(<span class="hljs-string">'low fat'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'m1'</span>,m1.taste);<span class="hljs-comment">//["pure", "organic", "low fat"]</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'m2'</span>,m2.taste);<span class="hljs-comment">//["pure", "organic", "low fat"]</span>
</code></pre>
<p>通过这段代码，我们可以清楚的了解到原型创建对象主要的不足具体表现在：</p>
<ul>
<li>原型创建对象会产生共享的问题</li>
<li>不能再额外传递参数进去。</li>
</ul>
<h4>构造函数结合原型</h4>
<p>构造函数有一定的优缺点，原型也有一定的优缺点，如果我们把两者优点结合，将会是一种不错的创建对象的方式。我们看如下的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Milk(name,taste,price){//构造函数独享属性
    this.name = name;
    this.taste = taste;
    this.price = price;
}
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}
var m1 = new Milk('纯牛奶','pure','4');
m1.say();//纯牛奶" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
m1.say();<span class="hljs-comment">//纯牛奶</span></code></pre>
<p>在这段代码中，我们使用构造函数来独享属性，以避免原型创建对象会产生的共享问题，当然，我们也使用原型共享方法，从而达到拒绝功能相同的函数导致的重复声明消耗空间问题。</p>
<h4>构造函数结合原型的一些细节问题</h4>
<p>在学习来构造函数结合原型创建对象的基础之上，我们来关心一些细节性的问题，以便于我们深入了解构造函数结合原型。如，构造函数和原型上的属性是否会覆盖，优先顺序又是什么？再如，如何判断属性是在原型上还是在构造函数之上呢？<br>1）属性的覆盖<br>我们通过如下两段代码，总结关于构造函数结合原型的属性覆盖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1
function Milk(name,taste,price){//构造函数独享属性
    this.name = name;
    this.taste = taste;
    this.price = price;
}
Milk.prototype.name = '牛奶';
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log(m1.name);//纯牛奶" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
Milk.prototype.name = <span class="hljs-string">'牛奶'</span>;
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(m1.name);<span class="hljs-comment">//纯牛奶</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//2
function Milk(name,taste,price){//构造函数独享属性
    //this.name = name;
    this.taste = taste;
    this.price = price;
}
Milk.prototype.name = '牛奶';
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log(m1.name);//牛奶" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-comment">//this.name = name;</span>
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
Milk.prototype.name = <span class="hljs-string">'牛奶'</span>;
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(m1.name);<span class="hljs-comment">//牛奶</span></code></pre>
<p>从两端代码中，我们对比得知，实例上的属性会覆盖原型上的属性。即：会先在实例中查找，如没有，则再在原型上查找。<br>2）属性的判断<br>(1)in操作符<br>我们可以通过如下三段代码，总结关于in操作符的知识，即：只要对象里有值，即无论是在构造函数之上还是在原型之上均返回true，若都不在，则返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1
function Milk(name,taste,price){//构造函数独享属性
    this.name = name;
    this.taste = taste;
    this.price = price;
}
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log('name' in m1);//ture" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'name'</span> <span class="hljs-keyword">in</span> m1);<span class="hljs-comment">//ture</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//2
function Milk(name,taste,price){//构造函数独享属性
    //this.name = name;
    this.taste = taste;
    this.price = price;
}
Milk.prototype.name = '牛奶';
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log('name' in m1);//ture" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-comment">//this.name = name;</span>
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
Milk.prototype.name = <span class="hljs-string">'牛奶'</span>;
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'name'</span> <span class="hljs-keyword">in</span> m1);<span class="hljs-comment">//ture</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//3
function Milk(name,taste,price){//构造函数独享属性
    //this.name = name;
    this.taste = taste;
    this.price = price;
}
//Milk.prototype.name = '牛奶';
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log('name' in m1);//false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-comment">//this.name = name;</span>
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
<span class="hljs-comment">//Milk.prototype.name = '牛奶';</span>
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'name'</span> <span class="hljs-keyword">in</span> m1);<span class="hljs-comment">//false</span>
</code></pre>
<p>(2)hasOwnProperty<br>我们可以通过如下两段代码，总结关于in操作符的知识，即：判断是在实例上还是原型上，挂在实例上返回true，反之false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1
function Milk(name,taste,price){//构造函数独享属性
    this.name = name;
    this.taste = taste;
    this.price = price;
}
//Milk.prototype.name = '牛奶';
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log(m1.hasOwnProperty('name'));//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
<span class="hljs-comment">//Milk.prototype.name = '牛奶';</span>
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(m1.hasOwnProperty(<span class="hljs-string">'name'</span>));<span class="hljs-comment">//true</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//2
function Milk(name,taste,price){//构造函数独享属性
    //this.name = name;
    this.taste = taste;
    this.price = price;
}
Milk.prototype.name = '牛奶';
Milk.prototype.say = function(){//原型共享方法
    console.log(this.name);
}

var m1 = new Milk('纯牛奶','pure','4');
console.log(m1.hasOwnProperty('name'));//false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Milk</span>(<span class="hljs-params">name,taste,price</span>)</span>{<span class="hljs-comment">//构造函数独享属性</span>
    <span class="hljs-comment">//this.name = name;</span>
    <span class="hljs-keyword">this</span>.taste = taste;
    <span class="hljs-keyword">this</span>.price = price;
}
Milk.prototype.name = <span class="hljs-string">'牛奶'</span>;
Milk.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//原型共享方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> m1 = <span class="hljs-keyword">new</span> Milk(<span class="hljs-string">'纯牛奶'</span>,<span class="hljs-string">'pure'</span>,<span class="hljs-string">'4'</span>);
<span class="hljs-built_in">console</span>.log(m1.hasOwnProperty(<span class="hljs-string">'name'</span>));<span class="hljs-comment">//false</span></code></pre>
<h4>小结</h4>
<p>在<em>创建对象</em>这个板块中，我们从工厂模式开始讲起，再到构造函数，接着到原型，最后到比较完善的构造函数结合原型，在接下来的<em>继承</em>板块中，我们将讲述原型链、继承以及最佳方式的相关知识，好好复习！</p>
<h3 id="articleHeader1">继承（更新中）</h3>
<p>当然，最最最最最后，如果您喜欢这片文章，可以疯狂点赞或者收藏喔！！?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解JS的面向对象（更新中）

## 原文链接
[https://segmentfault.com/a/1190000013547498](https://segmentfault.com/a/1190000013547498)


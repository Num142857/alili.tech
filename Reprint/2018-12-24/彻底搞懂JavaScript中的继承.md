---
title: '彻底搞懂JavaScript中的继承' 
date: 2018-12-24 2:30:07
hidden: true
slug: ustp4vr309
categories: [reprint]
---

{{< raw >}}

                    
<p>你应该知道，JavaScript是一门<strong>基于原型链</strong>的语言，而我们今天的主题 -- “继承”就和“原型链”这一概念息息相关。甚至可以说，所谓的“原型链”就是一条“继承链”。有些困惑了吗？接着看下去吧。</p>
<h2 id="articleHeader0">一、构造函数，原型属性与实例对象</h2>
<p>要搞清楚如何在JavaScript中实现继承，我们首先要搞懂<strong>构造函数</strong>，<strong>原型属性</strong>与<strong>实例对象</strong>三者之间的关系，让我们先看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
    var gender = girl // ①
    this.name = name // ②
    this.age = age
}

// ③
Person.prototype.sayName = function() { 
    alert(this.name) 
}

// ④
var kitty = new Person('kitty', 14)

kitty.sayName() // kitty
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name, age)</span> </span>{
    <span class="hljs-keyword">var</span> gender = girl <span class="hljs-comment">// ①</span>
    <span class="hljs-keyword">this</span>.name = name <span class="hljs-comment">// ②</span>
    <span class="hljs-keyword">this</span>.age = age
}

<span class="hljs-comment">// ③</span>
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{ 
    alert(<span class="hljs-keyword">this</span>.name) 
}

<span class="hljs-comment">// ④</span>
<span class="hljs-keyword">var</span> kitty = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'kitty'</span>, <span class="hljs-number">14</span>)

kitty.sayName() <span class="hljs-comment">// kitty</span>
</code></pre>
<p>让我们通过这段代码澄清几个概念：</p>
<ul>
<li>
<code>Person</code>是一个“<strong>构造函数</strong>”（它用来“构造”对象，并且是一个函数），①处<code>gender</code>是该构造函数的“<strong>私有属性</strong>”，②处的语句定义了该构造函数的“<strong>自有属性</strong>”；</li>
<li>③处的<code>prototype</code>是<code>Person</code>的“<strong>原型对象</strong>”（它是实例对象的“原型”，同时它是一个对象，但同时它也是构造函数的“属性”，所以也有人称它为“<strong>原型属性</strong>”），该对象上定义的所有属性（和方法）都会被“实例对象”所“继承”（我们终于看到这两个字了，但是不要心急，我们过一会才会谈论它）；</li>
<li>④处的变量“kitty”的值是构造函数<code>Person</code>的“<strong>实例对象</strong>”（它是由构造函数生成的一个实例，同时，它是一个对象），它可以访问到两种属性，一种是通过构造函数生成的“<strong>自有属性</strong>”，一种是原型对象可以访问的所有属性；</li>
</ul>
<p>对以上这些概念有清楚的认识，才能让你对JavaScript的“继承”与“原型链”的理解更加深刻，所以务必保障你已经搞清楚了他们之间的关系。（如果没有，务必多看几遍，你可以找张纸写写画画，我第一次就是这么做的）</p>
<p>彻底搞清楚了？那让我们继续我们的主题 -- “<strong>继承</strong>”。</p>
<p>你是否觉得奇怪，为什么我们的实例对象可以访问到构造函数原型属性上的属性（真是拗口）？答案是因为“<strong>每一个对象自身都拥有一个隐式的<code>[[proto]]</code>属性，该属性默认是一个指向其构造函数原型属性的指针</strong>”（其实我想说它是一个钩子，在对象创建时默认“勾住”了其构造函数的原型属性，但是我发现emoji居然没有钩子的图标，所以...??‍♂️，不过我还是觉得钩子更形象些...）。</p>
<p>当JavaScript引擎发现一个对象访问一个属性时，会首先查找对象的“<strong>自有属性</strong>”，如果没有找到则会在<code>[[proto]]</code>属性指向的原型属性中继续查找，如果还没有找到的话，你知道其实原型属性也是一个对象，所以它也有一个隐式的<code>[[proto]]</code>属性指向它的原型属性...，正如你所料，如果一直没有找到该属性，JavaScript引擎会一直这样找下去，直到找到最顶部构造函数<code>Object</code>的<code>prototype</code>原型属性，如果还是没有找到，会返回一个<code>undefined</code>值。这个不断查找的过程，有一个形象生动的名字“<strong>攀爬原型链</strong>”。</p>
<p>现在你应该对“原型链”就是“继承链”这一说法有点感觉了吧，让我们暂时休息一下，对两个我们遗漏的知识点补充说明：</p>
<ol>
<li>隐式的<code>[[proto]]</code>属性</li>
<li>原型对象<code>prototype</code>
</li>
</ol>
<h3 id="articleHeader1">（一）隐式的<code>[[proto]]</code>属性</h3>
<p>何为“隐式属性”呢？即是开发者无法访问却确实存在的属性，你可能会问，既然是隐式的，如何证明它的存在呢？问得好，答案是虽然JavaScript语言没有暴露给我们这个属性，但是浏览器却帮助我们可以获取到该属性，在Chorme中，我们可以通过浏览器为对象添加的<code>_proto_</code>属性访问到<code>[[proto]]</code>的值。你可以自己试试在控制台中打印这个属性，证明我没有说谎。</p>
<h3 id="articleHeader2">（二）原型对象<code>prototype</code>
</h3>
<p>还记的我们之前提到JavaScript世界一条重要的概念吗？“<strong>每一个对象自身都拥有一个隐式的<code>[[proto]]</code>属性，该属性默认是一个指向其构造函数原型属性的指针</strong>”。其实与其对应的，还有一条重要的概念我需要在这里告诉你“<strong>几乎所有函数都拥有<code>prototype</code>原型属性</strong>”。这两个概念确实非常重要，因为每当你搞混了构造函数，原型属性，实例对象之间的关系，以及JavaScript世界中的继承规则时，想想这两个概念总能帮助你剥离迷雾，重新发现真相。</p>
<h3 id="articleHeader3">（三）JavaScript世界两个重要概念</h3>
<p>因为他们真的很重要，所以我特别使用一个蓝色开头的列表再写一遍（保持耐心，朋友！）</p>
<ol>
<li>每一个对象自身都拥有一个隐式的<code>[[proto]]</code>属性，该属性默认是一个指向其构造函数原型属性的指针；</li>
<li>几乎所有函数都拥有<code>prototype</code>原型属性；</li>
</ol>
<p>至此，我们搞清楚了<strong>构造函数</strong>，<strong>原型属性</strong>与<strong>实例对象</strong>三者的关系，相信我，理解清楚这三者的关系能让你以更清晰的视角去观察JavaScript的继承世界，而在下一章中，我们将更进一步，直奔主题的阐述在JavaScript世界中如何实现继承，当然，还有背后的原理。</p>
<hr>
<h2 id="articleHeader4">二、在JavaScript世界中实现继承</h2>
<p>既然说了要直奔主题，我们便直接开始对JavaScript世界中对象的继承方式展开说明。不过在那之前，让我们再统一我们对“继承”这一概念的认识：即我们想要一个对象能够访问另一个对象的属性，同时，这个对象还能够添加自己新的属性或是覆盖可访问的另一个对象的属性，我们实现这个目标的方式叫做“继承”。</p>
<p>而在JavaScript世界，实现继承的方式有以下两种：</p>
<ol>
<li>创建一个对象并指定其继承对象（原型对象）；</li>
<li>修改构造函数的原型属性（对象）；</li>
</ol>
<p>看起来很合乎逻辑对吧，我们能够针对“对象”，令一个对象继承另一个对象，也能够转而针对创建对象的“构造函数”，以实现实例对象的继承。但是这里有个陷阱（你可能注意到了），对于一个已经定义的对象，我们无法再改变其继承关系，我们的第一种方式只能在“<strong>创建对象时</strong>”定义对象的继承对象。这是为什么呢？答案是因为“<strong>我们设置一个对象的继承关系，本质上是在操作对象隐式的<code>[[proto]]</code>属性</strong>”，而JavaScript只为我们开通了在对象创建时定义<code>[[proto]]</code>属性的权限，而拒绝让我们在对象定义时再修改或访问这一属性（所以它是“隐式”的）。很遗憾，在对象定义后改变它的继承关系确实是不可能的。</p>
<p>好了，是时候看看JavaScript世界中继承的主角了 -- <code>Object.create()</code></p>
<p>（一）关于<code>Object.create()</code> 和对象继承</p>
<p>正如之前所说，<code>Object.create()</code>函数是JavaScript提供给我们的一个在创建对象时设置对象内部<code>[[proto]]</code>属性的API，相信你已经清楚的知道了，通过修改<code>[[proto]]</code>属性的值，我们就能决定对象所继承的对象，从而以我们想要的方式实现继承。</p>
<p>让我们细致的了解一下<code>Object.create()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = { 
    name: 'tom',
    sayName: function() {
        console.log(this.name)
    }
}
var y = Object.create(x, {
    name: {
        configurable: true,
        enumerable: true,
        value: 'kitty',
        writable: true,
    }
})
y.sayName() // 'kitty'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = { 
    <span class="hljs-attr">name</span>: <span class="hljs-string">'tom'</span>,
    <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
}
<span class="hljs-keyword">var</span> y = <span class="hljs-built_in">Object</span>.create(x, {
    <span class="hljs-attr">name</span>: {
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">'kitty'</span>,
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
    }
})
y.sayName() <span class="hljs-comment">// 'kitty'</span>
</code></pre>
<p>看到了吗，<code>Object.create()</code>函数接收两个参数，第一个参数是创建对象想要继承的<strong>原型对象</strong>，第二个参数是一个<strong>属性描述对象</strong>（不知道什么是属性描述对象？看看我之前的这篇<a href="http://www.cnblogs.com/libinfs/p/7754781.html" rel="nofollow noreferrer" target="_blank">文章</a>），然后会返回一个对象。</p>
<p>让我们谈谈在调用<code>Object.create()</code>时究竟发生了什么：</p>
<ol>
<li>创建了一个空对象，并赋值给相应变量；</li>
<li>将第一个参数对象设置为该对象<code>[[proto]]</code>属性的值；</li>
<li>在该对象上调用<code>defineProperty()</code>方法，并将第二个参数传入该方法中；</li>
</ol>
<p>相信到这里你已经完全明白了如何在创建对象时实现继承了，但这样的方法有很多局限，比如我们只能在创建对象时设置对象的继承对象，又比如这种设置继承的方式是一次性的，我们永远无法依靠这种方式创造出多个有相同继承关系的对象，而对于这种情况，我们理所当然的要请出我们的第二个主角 -- <code>prototype</code>原型对象。</p>
<h3 id="articleHeader5">（二）关于<code>prototype</code> 和构造函数继承</h3>
<p>还记得我们之前反复提及构造函数，原型属性与实例对象的关系吧？我们还强调了“<strong>几乎所有的函数都拥有<code>prototype</code>属性</strong>”，现在就是应用这些知识的时候了，其实说到继承，构造函数生产实例对象的过程本身就是一种天然的继承。实例对象天然的继承着原型对象的所有属性，这其实是JavaScript提供给开发者第二种（也是默认的）设置对象<code>[[proto]]</code>属性的方法。</p>
<p>但是这种”天然的“继承方式缺点在于只存在两层继承：自定义构造函数的<code>prototype</code>对象继承Object构造函数的<code>prototype</code>属性，构造函数的实例对象继承构造函数的<code>prototype</code>属性。而我们有时想要更加灵活，满足需求，甚至是”更长“的原型链（或者说是”继承链“）。这是JavaScript默认的继承模式下无法实现的，但解决方式也很符合直觉，既然我们无法修改对象的<code>[[proto]]</code>属性，我们就去修改<code>[[proto]]</code>属性指向的对象 -- 原型对象。</p>
<p>我们说过原型对象也是一个对象对吧？所以我们就有了以下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(x, y) {
    this.x = x
    this.y = y
}
Foo.prototype.sayX = function() {
    console.log(this.x)
} 
Foo.prototype.sayY = function() {
    console.log(this.y)
}

function Bar(z) {
    this.z = z 
    this.x = 10
}
Bar.prototype = Object.create(Foo.prototype) // 注意这里
Bar.prototype.sayZ = function() {
    console.log(this.z)
}
Bar.prototype.constructor = Bar

var o = new Bar(1)
o.sayX() // 10
o.sayZ() // 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">this</span>.x = x
    <span class="hljs-keyword">this</span>.y = y
}
Foo.prototype.sayX = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x)
} 
Foo.prototype.sayY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.y)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Bar</span>(<span class="hljs-params">z</span>) </span>{
    <span class="hljs-keyword">this</span>.z = z 
    <span class="hljs-keyword">this</span>.x = <span class="hljs-number">10</span>
}
Bar.prototype = <span class="hljs-built_in">Object</span>.create(Foo.prototype) <span class="hljs-comment">// 注意这里</span>
Bar.prototype.sayZ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.z)
}
Bar.prototype.constructor = Bar

<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> Bar(<span class="hljs-number">1</span>)
o.sayX() <span class="hljs-comment">// 10</span>
o.sayZ() <span class="hljs-comment">// 1</span>
</code></pre>
<p>相信你注意到了，我通过修改了构造函数Bar的原型属性，将其值设置为一个继承对象为<code>Foo.prototype</code>的空对象，在之后，我又为在该对象添加了一些属性（注意到我添加的<code>constructor</code>属性了吗？如果你不明白为什么，你应该去了解一下我这么做的理由。）和方法。这样，构造函数Bar的实例对象就会在查询属性时攀爬原型链，从自有属性开始，途径<code>Bar.prototype</code>，<code>Foo.prototype</code>，最终到达<code>Object.prototype</code>。这正是我们想要的！太棒了！</p>
<p>毫不意外的，这种继承的方式被称为”<strong>构造函数继承</strong>“，在JavaScript中是一种关键的实现的继承方法，相信你已经很好的掌握了。</p>
<p>但是慢着，还有一个问题没有解决，让我们回到刚才的代码，看看如果我们在源代码上添加一条<code>o.sayY()</code>会发生什么？答案是控制台会输出<code>undefined</code>。</p>
<p>毫不意外对吧，毕竟我们从来都没有定义过y属性。但是假如我们也想让构造函数Bar的实例对象拥有构造函数Foo的设置的自有属性又该怎么办呢？答案是通过”<strong>构造函数窃取</strong>“技术，这将是我们下一章也是最后一章要讨论的话题。</p>
<h3 id="articleHeader6">（三）构造函数窃取</h3>
<p>如果”窃取“所继承的构造函数的自有属性呢？答案是巧妙的使用<code>.call()</code>和<code>.apply()</code>方法，让我们修改一下之前的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(x, y) {
    this.x = x
    this.y = y
}
Foo.prototype.sayX = function() {
    console.log(this.x)
} 
Foo.prototype.sayY = function() {
    console.log(this.y)
}

function Bar(z) {
    this.z = z 
    this.x = 10
    Foo.call(this, z, z) // 注意这里
}
Bar.prototype = Object.create(Foo.prototype) 
Bar.prototype.sayZ = function() {
    console.log(this.z)
}
Bar.prototype.constructor = Bar

var o = new Bar(1)
o.sayX() // 1
o.sayY() // 1
o.sayZ() // 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">this</span>.x = x
    <span class="hljs-keyword">this</span>.y = y
}
Foo.prototype.sayX = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x)
} 
Foo.prototype.sayY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.y)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Bar</span>(<span class="hljs-params">z</span>) </span>{
    <span class="hljs-keyword">this</span>.z = z 
    <span class="hljs-keyword">this</span>.x = <span class="hljs-number">10</span>
    Foo.call(<span class="hljs-keyword">this</span>, z, z) <span class="hljs-comment">// 注意这里</span>
}
Bar.prototype = <span class="hljs-built_in">Object</span>.create(Foo.prototype) 
Bar.prototype.sayZ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.z)
}
Bar.prototype.constructor = Bar

<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> Bar(<span class="hljs-number">1</span>)
o.sayX() <span class="hljs-comment">// 1</span>
o.sayY() <span class="hljs-comment">// 1</span>
o.sayZ() <span class="hljs-comment">// 1</span>
</code></pre>
<p>Done！我们成功窃取了构造函数Foo的两个自有属性，构造函数Bar的实例对象现在也有了x和y的值！</p>
<p>虽然答案已经一目了然了，但还是让我再解释一下这是怎么做到的：首先我们知道构造函数也是函数，因此我们可以像普通函数一样调用他，让我们以单纯的函数视角看待构造函数Foo，它不过是往<code>this</code>所指的对象上添加了两个属性，然后返回了undefined值，当我们单纯调用该函数时，<code>this</code>的指向为<code>window</code>（不明白为什么指向window，你可以阅读我的这篇<a href="http://www.cnblogs.com/libinfs/p/5753560.html" rel="nofollow noreferrer" target="_blank">文章</a>）。但是通过<code>call()</code>和<code>apply()</code>函数，我们可以人为的改变函数内<code>this</code>指针的指向，所以我们将构造函数内的<code>this</code>传入<code>call()</code>函数中，奇妙的事情发生了，原先为Foo函数实例对象添加的属性现在添加到了Bar函数的实例对象上！</p>
<p>“<strong>构造函数窃取</strong>”，我喜欢“<strong>窃取</strong>”这两个字，确实很巧妙。</p>
<hr>
<p>太棒了 你终于看完了这篇文章，是否彻底搞懂JavaScript中的继承了呢？希望如此。</p>
<p>算是个奖励，我之前有将JavaScript中的继承知识总结为一张思维导图，你可以点击<a href="http://www.cnblogs.com/libinfs/p/6835640.html" rel="nofollow noreferrer" target="_blank">这里</a>查看。知识总是反复记忆才能真正掌握，希望你能常回来看看。加油? ！</p>
<p><br><br><br><br><br><br>?  Hey！喜欢这篇文章吗？别忘了在下方? 点赞让我知道。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
彻底搞懂JavaScript中的继承

## 原文链接
[https://segmentfault.com/a/1190000012181338](https://segmentfault.com/a/1190000012181338)


---
title: 'es6语法快速上手' 
date: 2019-02-09 2:30:58
hidden: true
slug: sgcjxsahbv
categories: [reprint]
---

{{< raw >}}

                    
<p>随着google和firfox以及node6.0对es6的支持，es6语法的定稿使它越来越受到关注，尤其是react项目基本上都是用es6来写的。是时候从es5到es6转变了<br><span class="img-wrap"><img data-src="http://static.xiaomo.info/images/html.png" src="https://static.alili.techhttp://static.xiaomo.info/images/html.png" alt="" title="" style="cursor: pointer;"></span><br>&lt;!--more--&gt;</p>
<h2 id="articleHeader0">一、相关背景介绍</h2>
<p>我们现在大多数人用的语法javascript 其实版本是ecmscript5,也是就es5。这个版本己经很多年了，且完美被各大浏览器所支持。所以很多学js的朋友可以一直分不清楚es5和javscript的关系。javascript是一门编程语言，那么它就会有版本，es5还是es6 就就是它的版本号。最新版es7己经在紧锣密布的进行中，它最新的语法会让我们写代码更新的行云流水。</p>
<h2 id="articleHeader1">二、babel 一个es6的解析器</h2>
<p>在我们正式讲解ES6语法之前，我们得先了解下<a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel。</a></p>
<p>Babel是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。大家可以选择自己习惯的工具来使用使用Babel,我最喜欢的构建工具就是webpack。具体过程可直接在Babel官网查看：</p>
<h2 id="articleHeader2">三、语法</h2>
<p>最常用的ES6特性</p>
<p><code>let</code>, <code>const</code>, <code>class</code>, <code>extends</code>, <code>super</code>, <code>arrow functions</code>, <code>template string</code>, <code>destructuring</code>, <code>default</code>, <code>rest arguments</code><br>这些是ES6最常用的几个语法，基本上学会它们，我们就可以走遍天下都不怕啦！我会用最通俗易懂的语言和例子来讲解它们，保证一看就懂，一学就会。</p>
<h3 id="articleHeader3">1. <code>let, const</code>
</h3>
<p>这两个的用途与<code>var</code>类似，都是用来声明变量的，但在实际运用中他俩都有各自的特殊用途。<br>首先来看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'zach'

while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //obama" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var <span class="hljs-built_in">name</span> = <span class="hljs-string">'zach'</span>

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    var <span class="hljs-built_in">name</span> = <span class="hljs-string">'obama'</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>)  <span class="hljs-comment">//obama</span>
    break
}

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>)  <span class="hljs-comment">//obama</span></code></pre>
<p>使用<code>var</code> 两次输出都是obama，这是因为ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。第一种场景就是你现在看到的内层变量覆盖外层变量。而<code>let</code>则实际上为<code>JavaScript</code>新增了块级作用域。用它所声明的变量，只在<code>let</code>命令所在的代码块内有效。</p>
<p>另外一个<code>var</code>带来的不合理场景就是用来计数的循环变量泄露为全局变量，看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 10</span></code></pre>
<p>上面代码中，变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。而使用let则不会出现这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 6</span></code></pre>
<p>再来看一个更常见的例子，了解下如果不用ES6，而用闭包如何解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var clickBoxs = document.querySelectorAll('.clickBox')
for (var i = 0; i < clickBoxs.length; i++){
    clickBoxs[i].onclick = function(){
        console.log(i)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> clickBoxs = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.clickBox'</span>)
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; clickBoxs.length; i++){
    clickBoxs[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i)
    }
}</code></pre>
<p>我们本来希望的是点击不同的clickBox，显示不同的i，但事实是无论我们点击哪个clickBox，输出的都是5。下面我们来看下，如何用闭包搞定它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function iteratorFactory(i){
    var onclick = function(e){
        console.log(i)
    }
    return onclick;
}
var clickBoxs = document.querySelectorAll('.clickBox')
for (var i = 0; i < clickBoxs.length; i++){
    clickBoxs[i].onclick = iteratorFactory(i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iteratorFactory</span><span class="hljs-params">(i)</span>{</span>
    var onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span>{</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">i</span>)
    }
    <span class="hljs-keyword">return</span> onclick;
}
var clickBoxs = document.querySelectorAll(<span class="hljs-string">'.clickBox'</span>)
<span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; clickBoxs.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++){
    clickBoxs[i].onclick = iteratorFactory(i)
}</code></pre>
<p><code>const</code>也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PI = Math.PI

PI = 23 //Module build failed: SyntaxError: /es6/app.js: &quot;PI&quot; is read-only" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">PI</span> = Math.<span class="hljs-built_in">PI</span>

<span class="hljs-built_in">PI</span> = <span class="hljs-number">23</span> //<span class="hljs-keyword">Module</span> build failed: SyntaxError: /es6/app.js: <span class="hljs-string">"PI"</span> is read-only</code></pre>
<p>当我们尝试去改变用const声明的常量时，浏览器就会报错。<br>const有一个很好的应用场景，就是当我们引用第三方库的时声明的变量，用const来声明可以避免未来不小心重命名而导致出现bug：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const monent = require('moment')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> monent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'moment'</span>)</code></pre>
<h3 id="articleHeader4">2. <code>class</code>, <code>extends</code>, <code>super</code>
</h3>
<p>这三个特性涉及了ES5中最令人头疼的的几个部分：原型、构造函数，继承...你还在为它们复杂难懂的语法而烦恼吗？你还在为指针到底指向哪里而纠结万分吗？</p>
<p>有了ES6我们不再烦恼！</p>
<p>ES6提供了更接近传统语言的写法，引入了Class（类）这个概念。新的class写法让对象原型的写法更加清晰、更像面向对象编程的语法，也更加通俗易懂。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    constructor(){
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-symbol">'anima</span>l'
    }
    says(say){
        console.log(<span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> + ' says ' + say)
    }
}

let animal = <span class="hljs-keyword">new</span> <span class="hljs-type">Animal</span>()
animal.says(<span class="hljs-symbol">'hell</span>o') <span class="hljs-comment">//animal says hello</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
    constructor(){
        <span class="hljs-keyword">super</span>()
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-symbol">'ca</span>t'
    }
}

let cat = <span class="hljs-keyword">new</span> <span class="hljs-type">Cat</span>()
cat.says(<span class="hljs-symbol">'hell</span>o') <span class="hljs-comment">//cat says hello</span></code></pre>
<p>上面代码首先用<code>class</code>定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。简单地说，constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的。</p>
<p><code>Class</code>之间可以通过<code>extends</code>关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。上面定义了一个Cat类，该类通过extends关键字，继承了Animal类的所有属性和方法。</p>
<p><code>super</code>关键字，它指代父类的实例（即父类的this对象）。子类必须在<code>constructor</code>方法中调用<code>super</code>方法，否则新建实例时会报错。这是因为子类没有自己的<code>this</code>对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。</p>
<p><code>ES6</code>的继承机制，实质是先创造父类的实例对象<code>this</code>（所以必须先调用s<code>uper</code>方法），然后再用子类的构造函数修改<code>this</code>。</p>
<p>P.S 如果你写react的话，就会发现以上三个东西在最新版<code>React</code>中出现得很多。创建的每个component都是一个继承<code>React.Component</code>的类。<a href="https://facebook.github.io/react/docs/reusable-components.html" rel="nofollow noreferrer" target="_blank">详见react文档</a></p>
<h3 id="articleHeader5">3. <code>arrow function</code>
</h3>
<p>这个恐怕是ES6最最常用的一个新特性了，用它来写function比原来的写法要简洁清晰很多:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(i){ return i + 1; } //ES5
(i) => i + 1 //ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(i)</span></span>{ <span class="hljs-keyword">return</span> i + <span class="hljs-number">1</span>; } <span class="hljs-comment">//ES5</span>
(i) =&gt; i + <span class="hljs-number">1</span> <span class="hljs-comment">//ES6</span></code></pre>
<p>简直是简单的不像话对吧...<br>如果方程比较复杂，则需要用<code>{}</code>把代码包起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(x, y) {
    x++;
    y--;
    return x + y;
}
(x, y) => {x++; y--; return x+y}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y)</span></span> {
    x++;
    y<span class="hljs-comment">--;</span>
    <span class="hljs-keyword">return</span> x + y;
}
(x, y) =&gt; {x++; y<span class="hljs-comment">--; return x+y}</span></code></pre>
<p>除了看上去更简洁以外，<code>arrow function</code>还有一项超级无敌的功能！<br>长期以来，<code>JavaScript</code>语言的<code>this</code>对象一直是一个令人头痛的问题，在对象方法中使用<code>this</code>，必须非常小心。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        setTimeout(function(){
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}

 var animal = new Animal()
 animal.says('hi')  //undefined says hi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'animal'</span>
    }
    says(say){
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.type + <span class="hljs-string">' says '</span> + say)
        }, <span class="hljs-number">1000</span>)
    }
}

 <span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal()
 animal.says(<span class="hljs-string">'hi'</span>)  <span class="hljs-comment">//undefined says hi</span></code></pre>
<p>运行上面的代码会报错，这是因为<code>setTimeout</code>中的<code>this</code>指向的是全局对象。所以为了让它能够正确的运行，传统的解决方法有两种：</p>
<ol><li><p>第一种是将this传给self,再用self来指代this</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="says(say){
      var self = this;
      setTimeout(function(){
          console.log(self.type + ' says ' + say)
      }, 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>says(say){
      <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(self.type + <span class="hljs-string">' says '</span> + say)
      }, <span class="hljs-number">1000</span>)</code></pre>
<ol><li><p>第二种方法是用bind(this),即</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  says(say){
      setTimeout(function(){
          console.log(this.type + ' says ' + say)
      }.bind(this), 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  says(say){
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.type + <span class="hljs-string">' says '</span> + say)
      }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">1000</span>)</code></pre>
<p>但现在我们有了箭头函数，就不需要这么麻烦了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        setTimeout( () => {
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}
 var animal = new Animal()
 animal.says('hi')  //animal says hi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'animal'</span>
    }
    says(say){
        setTimeout( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.type + <span class="hljs-string">' says '</span> + say)
        }, <span class="hljs-number">1000</span>)
    }
}
 <span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal()
 animal.says(<span class="hljs-string">'hi'</span>)  <span class="hljs-comment">//animal says hi</span></code></pre>
<p>当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。<br>并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。</p>
<h3 id="articleHeader6">4. <code>template string</code>
</h3>
<p>这个东西也是非常有用，当我们要插入大段的html内容到文档中时，传统的写法非常麻烦，所以之前我们通常会引用一些模板工具库，比如mustache等等。</p>
<p>大家可以先看下面一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#result&quot;).append(
  &quot;There are <b>&quot; + basket.count + &quot;</b> &quot; +
  &quot;items in your basket, &quot; +
  &quot;<em>&quot; + basket.onSale +
  &quot;</em> are on sale!&quot;
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smalltalk"><code><span class="hljs-string">$(</span><span class="hljs-comment">"#result"</span>).append(
  <span class="hljs-comment">"There are &lt;b&gt;"</span> + basket.count + <span class="hljs-comment">"&lt;/b&gt; "</span> +
  <span class="hljs-comment">"items in your basket, "</span> +
  <span class="hljs-comment">"&lt;em&gt;"</span> + basket.onSale +
  <span class="hljs-comment">"&lt;/em&gt; are on sale!"</span>
);</code></pre>
<p>我们要用一堆的'+'号来连接文本与变量，而使用ES6的新特性模板字符串``后，我们可以直接这么来写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#result&quot;).append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>$(<span class="hljs-string">"#result"</span>).<span class="hljs-keyword">append</span>(`
  There are &lt;b&gt;<span class="hljs-variable">${basket</span>.<span class="hljs-keyword">count</span>}&lt;/b&gt; items
   <span class="hljs-keyword">in</span> your basket, &lt;em&gt;<span class="hljs-variable">${basket</span>.onSale}&lt;/em&gt;
  are <span class="hljs-keyword">on</span> sale!
`);</code></pre>
<p><a href="https://github.com/reactjs/react-router/blob/latest/examples/passing-props-to-children/app.js" rel="nofollow noreferrer" target="_blank">React Router</a>从第1.0.3版开始也使用ES6语法了，比如这个例子：</p>
<p><code>&lt;Link to={'/taco/${taco.name}'}&gt;{taco.name}&lt;/Link&gt;</code></p>
<h3 id="articleHeader7">5. <code>destructuring</code>
</h3>
<p>ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。</p>
<p>看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cat = 'ken'
let dog = 'lili'
let zoo = {cat: cat, dog: dog}
console.log(zoo)  //Object {cat: &quot;ken&quot;, dog: &quot;lili&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> <span class="hljs-keyword">cat</span> = <span class="hljs-string">'ken'</span>
<span class="hljs-keyword">let</span> dog = <span class="hljs-string">'lili'</span>
<span class="hljs-keyword">let</span> zoo = {<span class="hljs-keyword">ca</span><span class="hljs-variable">t:</span> <span class="hljs-keyword">cat</span>, <span class="hljs-keyword">do</span><span class="hljs-variable">g:</span> dog}
console.<span class="hljs-built_in">log</span>(zoo)  //Object {<span class="hljs-keyword">ca</span><span class="hljs-variable">t:</span> <span class="hljs-string">"ken"</span>, <span class="hljs-keyword">do</span><span class="hljs-variable">g:</span> <span class="hljs-string">"lili"</span>}</code></pre>
<p>用ES6完全可以像下面这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: &quot;ken&quot;, dog: &quot;lili&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> <span class="hljs-keyword">cat</span> = <span class="hljs-string">'ken'</span>
<span class="hljs-keyword">let</span> dog = <span class="hljs-string">'lili'</span>
<span class="hljs-keyword">let</span> zoo = {<span class="hljs-keyword">cat</span>, dog}
console.<span class="hljs-built_in">log</span>(zoo)  //Object {<span class="hljs-keyword">ca</span><span class="hljs-variable">t:</span> <span class="hljs-string">"ken"</span>, <span class="hljs-keyword">do</span><span class="hljs-variable">g:</span> <span class="hljs-string">"lili"</span>}</code></pre>
<p>反过来可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let dog = {type: 'animal', many: 2}
let { type, many} = dog
console.log(type, many)   //animal 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">let</span> dog = {<span class="hljs-class"><span class="hljs-keyword">type</span>: '<span class="hljs-title">animal</span>', <span class="hljs-title">many</span>: 2}</span>
<span class="hljs-keyword">let</span> { <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">many</span>} </span>= dog
console.log(<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">many</span>)   //<span class="hljs-title">animal</span> 2</span></code></pre>
<h3 id="articleHeader8">6. <code>default</code>, <code>rest</code>
</h3>
<p>default很简单，意思就是默认值。大家可以看下面的例子，调用animal()方法时忘了传参数，传统的做法就是加上这一句type = type || 'cat' 来指定默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animal(type){
    type = type || 'cat'  
    console.log(type)
}
animal()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">function</span> animal(<span class="hljs-class"><span class="hljs-keyword">type</span>){</span>
    <span class="hljs-class"><span class="hljs-keyword">type</span> </span>= <span class="hljs-class"><span class="hljs-keyword">type</span> || '<span class="hljs-title">cat</span>'  </span>
    console.log(<span class="hljs-class"><span class="hljs-keyword">type</span>)</span>
}
animal()</code></pre>
<p>如果用ES6我们而已直接这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animal(type = 'cat'){
    console.log(type)
}
animal()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animal</span><span class="hljs-params">(<span class="hljs-keyword">type</span> = <span class="hljs-string">'cat'</span>)</span><span class="hljs-comment">{
    console.log(type)
}</span>
<span class="hljs-title">animal</span><span class="hljs-params">()</span></span></code></pre>
<p>最后一个rest语法也很简单，直接看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //[&quot;cat&quot;, &quot;dog&quot;, &quot;fish&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animals</span><span class="hljs-params">(<span class="hljs-rest_arg">...types</span>)</span></span>{
    console.log(types)
}
animals(<span class="hljs-string">'cat'</span>, <span class="hljs-string">'dog'</span>, <span class="hljs-string">'fish'</span>) <span class="hljs-comment">//["cat", "dog", "fish"]</span></code></pre>
<p>而如果不用ES6的话，我们则得使用ES5的<code>arguments</code>。</p>
<h3 id="articleHeader9">7. <code>import export</code>
</h3>
<p>这两个家伙对应的就是<code>es6</code>自己的<code>module</code>功能。</p>
<p>我们之前写的<code>Javascript</code>一直都没有模块化的体系，无法将一个庞大的js工程拆分成一个个功能相对独立但相互依赖的小工程，再用一种简单的方法把这些小工程连接在一起。</p>
<p>这有可能导致两个问题：</p>
<ol>
<li><p>一方面js代码变得很臃肿，难以维护;</p></li>
<li><p>另一方面我们常常得很注意每个script标签在html中的位置，因为它们通常有依赖关系，顺序错了可能就会出bug;<br>在es6之前为解决上面提到的问题，我们得利用第三方提供的一些方案，主要有两种CommonJS(服务器端)和AMD（浏览器端，如require.js）。</p></li>
</ol>
<p>如果想了解更多AMD，尤其是require.js，可以参看这个教程<br><a href="http://requirejs.org/docs/why.html" rel="nofollow noreferrer" target="_blank">why modules on the web are useful and the mechanisms that can be used on the web today to enable them</a></p>
<p>而现在我们有了es6的module功能，它实现非常简单，可以成为服务器和浏览器通用的模块解决方案。</p>
<blockquote><p>ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。</p></blockquote>
<p>上面的设计思想看不懂也没关系，咱先学会怎么用，等以后用多了、熟练了再去研究它背后的设计思想也不迟！好，那我们就上代码...</p>
<p>传统的写法<br>首先我们回顾下require.js的写法。假设我们有两个js文件: index.js和content.js,现在我们想要在index.js中使用content.js返回的结果，我们要怎么做呢？</p>
<p>首先定义:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//content.js
define('content.js', function(){
    return 'A cat';
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//content.js</span>
define(<span class="hljs-string">'content.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'A cat'</span>;
})</code></pre>
<p>然后require:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
require(['./content.js'], function(animal){
    console.log(animal);   //A cat
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//index.js</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">'./content.js'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">animal</span>)</span>{
    <span class="hljs-built_in">console</span>.log(animal);   <span class="hljs-comment">//A cat</span>
})</code></pre>
<p>那CommonJS是怎么写的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
var animal = require('./content.js')

//content.js
module.exports = 'A cat'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//index.js</span>
<span class="hljs-selector-tag">var</span> animal = require(<span class="hljs-string">'./content.js'</span>)

<span class="hljs-comment">//content.js</span>
module<span class="hljs-selector-class">.exports</span> = <span class="hljs-string">'A cat'</span></code></pre>
<p>ES6的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
import animal from './content'

//content.js
export default 'A cat'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">import</span> animal <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>

<span class="hljs-comment">//content.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'A cat'</span></code></pre>
<p>以上我把三者都列出来了，妈妈再也不用担心我写混淆了...</p>
<h3 id="articleHeader10">8. ES6 module的其他高级用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//content.js

export default 'A cat'    
export function say(){
    return 'Hello!'
}    
export const type = 'dog'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//content.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'A cat'</span>    
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Hello!'</span>
}    
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> type = <span class="hljs-string">'dog'</span></code></pre>
<p>上面可以看出，export命令除了输出变量，还可以输出函数，甚至是类（react的模块基本都是输出类）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js

import { say, type } from './content'  
let says = say()
console.log(`The ${type} says ${says}`)  //The dog says Hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//index.js</span>

<span class="hljs-keyword">import</span> { say, <span class="hljs-keyword">type</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>  
<span class="hljs-keyword">let</span> says = say()
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The <span class="hljs-subst">${type}</span> says <span class="hljs-subst">${says}</span>`</span>)  <span class="hljs-comment">//The dog says Hello</span></code></pre>
<p>这里输入的时候要注意：大括号里面的变量名，必须与被导入模块（content.js）对外接口的名称相同。</p>
<p>如果还希望输入content.js中输出的默认值(default), 可以写在大括号外面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js

import animal, { say, type } from './content'  
let says = say()
console.log(`The ${type} says ${says} to ${animal}`)  
//The dog says Hello to A cat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//index.js</span>

<span class="hljs-keyword">import</span> animal, { say, <span class="hljs-keyword">type</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>  
<span class="hljs-keyword">let</span> says = say()
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The <span class="hljs-subst">${type}</span> says <span class="hljs-subst">${says}</span> to <span class="hljs-subst">${animal}</span>`</span>)  
<span class="hljs-comment">//The dog says Hello to A cat</span></code></pre>
<h3 id="articleHeader11">9. 修改变量名</h3>
<p>此时我们不喜欢type这个变量名，因为它有可能重名，所以我们需要修改一下它的变量名。在es6中可以用as实现一键换名。</p>
<p>//index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import animal, { say, type as animalType } from './content'  
let says = say()
console.log(`The ${animalType} says ${says} to ${animal}`)  
//The dog says Hello to A cat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> animal, { say, <span class="hljs-keyword">type</span> <span class="hljs-keyword">as</span> animalType } <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>  
<span class="hljs-keyword">let</span> says = say()
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The <span class="hljs-subst">${animalType}</span> says <span class="hljs-subst">${says}</span> to <span class="hljs-subst">${animal}</span>`</span>)  
<span class="hljs-comment">//The dog says Hello to A cat</span></code></pre>
<h3 id="articleHeader12">10. 模块的整体加载</h3>
<p>除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //index.js

  import animal, * as content from './content'  
  let says = content.say()
  console.log(`The ${content.type} says ${says} to ${animal}`)  
  //The dog says Hello to A cat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">//index.js</span>

  <span class="hljs-keyword">import</span> animal, * <span class="hljs-keyword">as</span> content <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>  
  <span class="hljs-keyword">let</span> says = content.say()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The <span class="hljs-subst">${content.type}</span> says <span class="hljs-subst">${says}</span> to <span class="hljs-subst">${animal}</span>`</span>)  
  <span class="hljs-comment">//The dog says Hello to A cat</span></code></pre>
<p>通常星号*结合as一起使用比较合适。</p>
<ol><li><p>终极秘籍</p></li></ol>
<p>考虑下面的场景：<br>上面的content.js一共输出了三个变量（default, say, type）,假如我们的实际项目当中只需要用到type这一个变量，其余两个我们暂时不需要。我们可以只输入一个变量：</p>
<p><code>import { type } from './content'</code></p>
<p>由于其他两个变量没有被使用，我们希望代码打包的时候也忽略它们，抛弃它们，这样在大项目中可以显著减少文件的体积。</p>
<p>ES6帮我们实现了！</p>
<p>不过，目前无论是webpack还是browserify都还不支持这一功能...</p>
<p>如果你现在就想实现这一功能的话，可以尝试使用rollup.js</p>
<p>他们把这个功能叫做Tree-shaking，哈哈哈，意思就是打包前让整个文档树抖一抖，把那些并未被依赖或使用的东西统统抖落下去。。。</p>
<p>看看他们官方的解释吧：</p>
<blockquote><p>Normally if you require a module, you import the whole thing. ES2015 lets you just import the bits you need, without mucking around with custom builds. It's a revolution in how we use libraries in JavaScript, and it's happening right now.</p></blockquote>
<p>希望更全面了解es6伙伴们可以去看阮一峰所著的电子书<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6入门</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6语法快速上手

## 原文链接
[https://segmentfault.com/a/1190000005742091](https://segmentfault.com/a/1190000005742091)


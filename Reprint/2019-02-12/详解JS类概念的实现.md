---
title: '详解JS类概念的实现' 
date: 2019-02-12 2:30:12
hidden: true
slug: hvenahtvm4i
categories: [reprint]
---

{{< raw >}}

                    
<p>众所周知，JS并没有类(class)的概念,虽然说ES6开始有了类的概念，但是，这并不是说JS有了像Ruby、Java这些基于类的面向对象语言一样，有了全新的继承模型。ES6中的类，仅仅只是基于现有的原型继承的一种语法糖，下面我们好好分析一下，具体是如何实现的</p>
<h2 id="articleHeader0"><a href="https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1" rel="nofollow noreferrer" target="_blank">面向对象思想</a></h2>
<p>在讲正题之前，我们先来讨论一下各种面试题都可能出现的一个问题，什么是<code>面向对象编程（OOP）</code>?</p>
<ul>
<li><p>类：定义某一事物的抽象特点，包含属性和方法，举个栗子，<code>狗</code>这个类包含狗的一些基础特征，如毛皮颜色，吠叫等能力。</p></li>
<li><p>对象：类的一个实例，还是举个栗子，小明家的白色的狗和小红家红色的狗。</p></li>
<li><p>属性：对象的特征，比如刚提到的狗皮毛的颜色。</p></li>
<li><p>方法：对象的行为，比如刚才提到的狗的吠叫能力。</p></li>
<li><p>封装性：通过限制只有特定类的对象可以访问特定类的成员，一般包含<code>public</code> <code>protected</code> <code>private</code> 三种，不同语言的实现不同。</p></li>
<li><p>继承性：一个类会有<code>子类</code>,这个<code>子类</code>是更具体化的一个抽象，它包含<code>父类</code>的一些属性和方法，并且有可能有不同于<code>父类</code>的属性和方法。</p></li>
<li><p>多态性：多意为‘许多’，态意为‘形态’。不同类可以定义相同的方法或属性。</p></li>
<li><p>抽象性：复杂现实问题转化为类定义的途径，包括以上所有内容。</p></li>
</ul>
<h2 id="articleHeader1">如何实现对象（类）的定义</h2>
<p>由于JS并没有<code>类(class)</code>的概念，更多的时候我们把它叫做<code>对象（function）</code>，然后把<code>对象</code>叫做<code>实例(instance)</code>，跟团队里面的人讨论OOP的时候，经常会有概念上的一些误解，特此说明一下。</p>
<h3 id="articleHeader2">构造函数：一个指明了对象类型的函数，通常我们可以通过构造函数类创建</h3>
<p>在js里面，我们通常都是通过构造函数来创建<code>对象(class)</code>,然后通过<code>new</code>这个关键字来实例化一个对象，如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name){
  this.name = name;
}
var d1 = new Dog(&quot;dodo&quot;);
d1.constructor
// Dog(name){
//  this.name = name;
// }

var d2 = new Dog('do2do');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
}
<span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">"dodo"</span>);
d1.constructor
<span class="hljs-comment">// Dog(name){</span>
<span class="hljs-comment">//  this.name = name;</span>
<span class="hljs-comment">// }</span>

<span class="hljs-keyword">var</span> d2 = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'do2do'</span>);</code></pre>
<p>为什么通过<code>构造函数</code>可以实现<code>对象（class）</code>属性的定义呢？首先，我们必须理解这个语法<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new" rel="nofollow noreferrer" target="_blank"><code>new constructor[([arguments])]</code></a></p>
<p>我们来具体看看当<code>new Dog('name')</code>时，具体做了哪些事情</p>
<ol>
<li><p>一个新实例被创建。它继承自<code>Dog.prototype</code></p></li>
<li><p>构造函数被执行，相应的参数会被传入，同时上下文(<code>this</code>)会指向这个新的实例</p></li>
<li><p>除非明确返回值，否则返回新的实例</p></li>
</ol>
<p>至此，我们实现了OOP里面的类(Dog)、对象(d1,d2)、和属性(name)的概念，<code>d1</code>和<code>d2</code>有相同的<code>name</code>属性，但是值并不相同,即属性是私有的。</p>
<blockquote><p>注: 新创建的实例，都包含一个<code>constructor</code>属性，该属性指向他们的构造函数<code>Dog</code></p></blockquote>
<h3 id="articleHeader3">原型对象(prototype)</h3>
<p>接下来，我们即将讨论如何定义方法，其实，我们完全可以这样定义我们的方法，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name){
  this.name = name;
  this.bark = function(){
    console.log(this.name + &quot; bark&quot;);
  };
}
var d1 = new Dog(&quot;dodo&quot;);
d1.bark();
// dodo bark" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.bark = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" bark"</span>);
  };
}
<span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">"dodo"</span>);
d1.bark();
<span class="hljs-comment">// dodo bark</span></code></pre>
<p>但是，一般我们不推荐这么做，正如我们所知<code>Dog</code>是一个构造函数，每次实例化时，都会执行这个函数，也就是说，<code>bark</code> 这个方法每次都会被定义, 比较浪费内存。但是我们通常可以用<code>constructor</code>和闭包的方式来实现私有属性，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name){
  this.name = name;
  
  // barkCount 是私有属性，因为实例并不知道这个属性
  var barkCount = 0;
  this.bark = function(){
    barkCount ++;
    console.log(this.name + &quot; bark&quot;);
  };
  this.getBarkCount = function(){
    console.log(this.name + &quot; has barked &quot; + barkCount + &quot; times&quot;);
  };
}
var d1 = new Dog(&quot;dodo&quot;);
d1.bark();
d1.bark();
d1.getBarkCount();
// dodo has barked 2 times" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  
  <span class="hljs-comment">// barkCount 是私有属性，因为实例并不知道这个属性</span>
  <span class="hljs-keyword">var</span> barkCount = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.bark = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    barkCount ++;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" bark"</span>);
  };
  <span class="hljs-keyword">this</span>.getBarkCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" has barked "</span> + barkCount + <span class="hljs-string">" times"</span>);
  };
}
<span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">"dodo"</span>);
d1.bark();
d1.bark();
d1.getBarkCount();
<span class="hljs-comment">// dodo has barked 2 times</span></code></pre>
<p>好像扯得有点远，我们回归我们的主角<code>prototype</code>，函数<code>Dog</code>有一个特殊的属性，这个属性就叫原型，如上所述，当用<code>new</code>运算符创建实例时，会把<code>Dog</code>的原型对象的引用复制到新的实例内部的[[Prototype]]属性，即<code>d1.[[Prototype]] = Dog.prototype</code>，因为所有的实例的[[Prototype]]都指向<code>Dog</code>的原型对象，那么，我们就可以很方便的定义我们的方法了，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name){
  this.name = name;
}

Dog.prototype = {
  bark: function(){
    console.log(this.name + &quot; bark&quot;);
  }
};

var d1 = new Dog(&quot;dodo&quot;);
d1.bark();
// dodo bark" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
}

Dog.prototype = {
  <span class="hljs-attr">bark</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" bark"</span>);
  }
};

<span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">"dodo"</span>);
d1.bark();
<span class="hljs-comment">// dodo bark</span></code></pre>
<p>我们可以通过<code>d1.__proto__ == Dog.prototype</code>，来验证我们的想法。用原型对象还有一个好处，由于实例化的对象的[[Prototype]]指向<code>Dog</code>的原型对象，那么我们可以通过添加<code>Dog</code>的原型对象的方法，来添加已经实例化后的实例<code>d1</code>的方法。如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dog.prototype.run = function(){
  console.log(this.name + &quot; is running!&quot;);
}
d1.run();
// dodo is running!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Dog.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" is running!"</span>);
}
d1.run();
<span class="hljs-comment">// dodo is running!</span></code></pre>
<blockquote><p>注：所有对象的<code>__proto__</code>都指向其构造器的<code>prototype</code></p></blockquote>
<h3 id="articleHeader4">原型链</h3>
<p>上面已经描述如何定义一个<code>类</code>，接下来我们将要了解，如何实现<code>类的继承</code>。在此之前，我们先了解js里一个老生常谈的概念：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">原型链</a>：每个对象都有一个指向它的原型（prototype）对象的内部链接。这个原型对象又有自己的原型，直到某个对象的原型为 null 为止（也就是不再有原型指向），组成这条链的最后一环。这种一级一级的链结构就称为原型链</p>
<p>mozilla给出一个挺好的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假定有一个对象 o, 其自身的属性（own properties）有 a 和 b：
// {a: 1, b: 2}
// o 的原型 o.[[Prototype]]有属性 b 和 c：
// {b: 3, c: 4}
// 最后, o.[[Prototype]].[[Prototype]] 是 null.
// 这就是原型链的末尾，即 null，
// 根据定义，null 没有[[Prototype]].
// 综上，整个原型链如下: 
// {a:1, b:2} ---> {b:3, c:4} ---> null

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// o.[[Prototype]]上还有一个'b'属性,但是它不会被访问到.这种情况称为&quot;属性遮蔽 (property shadowing)&quot;.

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看o.[[Prototype]]上有没有.
// c是o.[[Prototype]]的自身属性吗？是的,该属性的值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看o.[[Prototype]]上有没有.
// d是o.[[Prototype]]的自身属性吗？不是，那看看o.[[Prototype]].[[Prototype]]上有没有.
// o.[[Prototype]].[[Prototype]]为null，停止搜索，
// 没有d属性，返回undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 假定有一个对象 o, 其自身的属性（own properties）有 a 和 b：</span>
<span class="hljs-comment">// {a: 1, b: 2}</span>
<span class="hljs-comment">// o 的原型 o.[[Prototype]]有属性 b 和 c：</span>
<span class="hljs-comment">// {b: 3, c: 4}</span>
<span class="hljs-comment">// 最后, o.[[Prototype]].[[Prototype]] 是 null.</span>
<span class="hljs-comment">// 这就是原型链的末尾，即 null，</span>
<span class="hljs-comment">// 根据定义，null 没有[[Prototype]].</span>
<span class="hljs-comment">// 综上，整个原型链如下: </span>
<span class="hljs-comment">// {a:1, b:2} ---&gt; {b:3, c:4} ---&gt; null</span>

<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// 1</span>
<span class="hljs-comment">// a是o的自身属性吗？是的，该属性的值为1</span>

<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// 2</span>
<span class="hljs-comment">// b是o的自身属性吗？是的，该属性的值为2</span>
<span class="hljs-comment">// o.[[Prototype]]上还有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)".</span>

<span class="hljs-built_in">console</span>.log(o.c); <span class="hljs-comment">// 4</span>
<span class="hljs-comment">// c是o的自身属性吗？不是，那看看o.[[Prototype]]上有没有.</span>
<span class="hljs-comment">// c是o.[[Prototype]]的自身属性吗？是的,该属性的值为4</span>

<span class="hljs-built_in">console</span>.log(o.d); <span class="hljs-comment">// undefined</span>
<span class="hljs-comment">// d是o的自身属性吗？不是,那看看o.[[Prototype]]上有没有.</span>
<span class="hljs-comment">// d是o.[[Prototype]]的自身属性吗？不是，那看看o.[[Prototype]].[[Prototype]]上有没有.</span>
<span class="hljs-comment">// o.[[Prototype]].[[Prototype]]为null，停止搜索，</span>
<span class="hljs-comment">// 没有d属性，返回undefined</span></code></pre>
<p>现在我们可以通过我们理解的构造函数和原型对象来实现继承的概念了，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name){
  this.name = name;
}

// 这种写法会修改dog实例的constructor，可以通过Dog.prototype.constructor = Dog来重置
Dog.prototype = {
  bark: function(){
    console.log(this.name + &quot; bark&quot;);
  }
};

// 重置Dog实例的构造函数为本身
Dog.prototype.constructor = Dog;

// Haski 的构造函数
function Haski(name){
  // 继承Dog的构造函数
  Dog.call(this, name);
  // 可以补充更多Haski的属性
  this.type = &quot;Haski&quot;;
};

// 1. 设置Haski的prototype为Dog的实例对象
// 2. 此时Haski的原型链是 Haski -> Dog的实例 -> Dog -> Object
// 3. 此时，Haski包含了Dog的所有属性和方法，而且还有一个指针，指向Dog的原型对象
// 4. 这种做法是不推荐的，下面会改进
Haski.prototype = new Dog();

// 重置Haski实例的构造函数为本身
Haski.prototype.constructor = Haski;

// 可以为子类添加更多的方法
Haski.prototype.say = function(){
  console.log(&quot;I'm &quot; + this.name);
}

var ha = new Haski(&quot;Ha&quot;);
// Ha bark
ha.bark();
// Ha bark
ha.say();
// I'm Ha" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-comment">// 这种写法会修改dog实例的constructor，可以通过Dog.prototype.constructor = Dog来重置</span>
Dog.prototype = {
  <span class="hljs-attr">bark</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" bark"</span>);
  }
};

<span class="hljs-comment">// 重置Dog实例的构造函数为本身</span>
Dog.prototype.constructor = Dog;

<span class="hljs-comment">// Haski 的构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Haski</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-comment">// 继承Dog的构造函数</span>
  Dog.call(<span class="hljs-keyword">this</span>, name);
  <span class="hljs-comment">// 可以补充更多Haski的属性</span>
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">"Haski"</span>;
};

<span class="hljs-comment">// 1. 设置Haski的prototype为Dog的实例对象</span>
<span class="hljs-comment">// 2. 此时Haski的原型链是 Haski -&gt; Dog的实例 -&gt; Dog -&gt; Object</span>
<span class="hljs-comment">// 3. 此时，Haski包含了Dog的所有属性和方法，而且还有一个指针，指向Dog的原型对象</span>
<span class="hljs-comment">// 4. 这种做法是不推荐的，下面会改进</span>
Haski.prototype = <span class="hljs-keyword">new</span> Dog();

<span class="hljs-comment">// 重置Haski实例的构造函数为本身</span>
Haski.prototype.constructor = Haski;

<span class="hljs-comment">// 可以为子类添加更多的方法</span>
Haski.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm "</span> + <span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> ha = <span class="hljs-keyword">new</span> Haski(<span class="hljs-string">"Ha"</span>);
<span class="hljs-comment">// Ha bark</span>
ha.bark();
<span class="hljs-comment">// Ha bark</span>
ha.say();
<span class="hljs-comment">// I'm Ha</span></code></pre>
<blockquote><p>注： 子类在定义prototype时，不可直接使用<code>Haski.prototype = {}</code>定义，这样会重写Haski的原型链，把Haski的原型当做<code>Object</code>的实例，而非<code>Dog</code>的实例</p></blockquote>
<p>但是，当我想找一下<code>ha</code>的原型链时，会发现<code>ha</code>的原型对象指向的是<code>Dog</code>的实例，而且还有一个值为<code>undefined</code>的<code>name</code>属性，在实例化时，name是没必要的, 如下图：</p>
<p><span class="img-wrap"><img data-src="http://ww4.sinaimg.cn/large/785cd1e3jw1f2bmnt5qn4j20d50a4abw.jpg" src="https://static.alili.techhttp://ww4.sinaimg.cn/large/785cd1e3jw1f2bmnt5qn4j20d50a4abw.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>所以，我们需要修改一下我们的实现，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改前
Haski.prototype = new Dog();

// 修改后
Haski.prototype = Object.create(Dog.prototype);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 修改前</span>
Haski.prototype = <span class="hljs-keyword">new</span> Dog();

<span class="hljs-comment">// 修改后</span>
Haski.prototype = <span class="hljs-built_in">Object</span>.create(Dog.prototype);</code></pre>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/785cd1e3jw1f2bp2gl1sij20qs0iogpa.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/785cd1e3jw1f2bp2gl1sij20qs0iogpa.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>注: <code>__proto__</code> 方法已弃用，从 ECMAScript 6 开始, [[Prototype]] 可以用Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问</p></blockquote>
<p>自此，我们已经实现继承的概念，父类有自己的方法，子类继承了父类的属性和方法，而且还可以定义自己的属性和方法。</p>
<h2 id="articleHeader5">ES6 如何实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
// 声明 Dog 类
class Dog {
  // 构造函数
  constructor(name){
    this.name = name;
  }
 
  // 普通方法
  dark(){
    console.log(this.name + &quot;bark&quot;);
  }
 
  // 静态方法，也叫类方法
  static staticMethod(){
    console.log(&quot;I'm static method!&quot;);
  }
}

// 通过`extends`关键字来实现继承
class Haski extends Dog {
  constructor(name){
    // 调用父类的构造函数
    super(name);
    this.type = &quot;Haski&quot;;
  }
  
  // 定义子类方法
  say(){
    console.log(&quot;I'm&quot; + this.name);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-comment">// 声明 Dog 类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
  <span class="hljs-comment">// 构造函数</span>
  <span class="hljs-keyword">constructor</span>(name){
    <span class="hljs-keyword">this</span>.name = name;
  }
 
  <span class="hljs-comment">// 普通方法</span>
  dark(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">"bark"</span>);
  }
 
  <span class="hljs-comment">// 静态方法，也叫类方法</span>
  <span class="hljs-keyword">static</span> staticMethod(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm static method!"</span>);
  }
}

<span class="hljs-comment">// 通过`extends`关键字来实现继承</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Haski</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Dog</span> </span>{
  <span class="hljs-keyword">constructor</span>(name){
    <span class="hljs-comment">// 调用父类的构造函数</span>
    <span class="hljs-keyword">super</span>(name);
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">"Haski"</span>;
  }
  
  <span class="hljs-comment">// 定义子类方法</span>
  say(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm"</span> + <span class="hljs-keyword">this</span>.name);
  }
}</code></pre>
<p>在ES6中，我们只需通过<code>class</code> <code>extends</code> <code>super</code> <code>constructor</code> 即可比较方便的完成原来使用JS比较难理解的实现，我们可以通过babel的解析器，来看看babel是怎么把这些语法糖转成JS的实现的。具体代码可以参考</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (&quot;value&quot; in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(&quot;this hasn't been initialised - super() hasn't been called&quot;); } return call &amp;&amp; (typeof call === &quot;object&quot; || typeof call === &quot;function&quot;) ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== &quot;function&quot; &amp;&amp; superClass !== null) { throw new TypeError(&quot;Super expression must either be null or a function, not &quot; + typeof superClass); } subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(&quot;Cannot call a class as a function&quot;); } }

// 声明 Dog 类

var Dog = function () {
  // 构造函数

  function Dog(name) {
    _classCallCheck(this, Dog);

    this.name = name;
  }

  // 普通方法


  _createClass(Dog, [{
    key: &quot;dark&quot;,
    value: function dark() {
      console.log(this.name + &quot;bark&quot;);
    }

    // 静态方法，也叫类方法

  }], [{
    key: &quot;staticMethod&quot;,
    value: function staticMethod() {
      console.log(&quot;I'm static method!&quot;);
    }
  }]);

  return Dog;
}();

// 通过`extends`关键字来实现继承


var Haski = function (_Dog) {
  _inherits(Haski, _Dog);

  function Haski(name) {
    _classCallCheck(this, Haski);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Haski).call(this, name));
    // 调用父类的构造函数


    _this.type = &quot;Haski&quot;;
    return _this;
  }

  _createClass(Haski, [{
    key: &quot;say&quot;,
    value: function say() {
      console.log(&quot;I'm&quot; + this.name);
    }
  }]);

  return Haski;
}(Dog);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> _createClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{ <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) { <span class="hljs-keyword">var</span> descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>; descriptor.configurable = <span class="hljs-literal">true</span>; <span class="hljs-keyword">if</span> (<span class="hljs-string">"value"</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>; <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor); } } <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{ <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps); <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps); <span class="hljs-keyword">return</span> Constructor; }; }();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{ <span class="hljs-keyword">if</span> (!self) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(<span class="hljs-string">"this hasn't been initialised - super() hasn't been called"</span>); } <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"function"</span>) ? call : self; }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">"function"</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Super expression must either be null or a function, not "</span> + <span class="hljs-keyword">typeof</span> superClass); } subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, { <span class="hljs-attr">constructor</span>: { <span class="hljs-attr">value</span>: subClass, <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span> } }); <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{ <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Cannot call a class as a function"</span>); } }

<span class="hljs-comment">// 声明 Dog 类</span>

<span class="hljs-keyword">var</span> Dog = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 构造函数</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Dog);

    <span class="hljs-keyword">this</span>.name = name;
  }

  <span class="hljs-comment">// 普通方法</span>


  _createClass(Dog, [{
    <span class="hljs-attr">key</span>: <span class="hljs-string">"dark"</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dark</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">"bark"</span>);
    }

    <span class="hljs-comment">// 静态方法，也叫类方法</span>

  }], [{
    <span class="hljs-attr">key</span>: <span class="hljs-string">"staticMethod"</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">staticMethod</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm static method!"</span>);
    }
  }]);

  <span class="hljs-keyword">return</span> Dog;
}();

<span class="hljs-comment">// 通过`extends`关键字来实现继承</span>


<span class="hljs-keyword">var</span> Haski = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Dog</span>) </span>{
  _inherits(Haski, _Dog);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Haski</span>(<span class="hljs-params">name</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Haski);

    <span class="hljs-keyword">var</span> _this = _possibleConstructorReturn(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">Object</span>.getPrototypeOf(Haski).call(<span class="hljs-keyword">this</span>, name));
    <span class="hljs-comment">// 调用父类的构造函数</span>


    _this.type = <span class="hljs-string">"Haski"</span>;
    <span class="hljs-keyword">return</span> _this;
  }

  _createClass(Haski, [{
    <span class="hljs-attr">key</span>: <span class="hljs-string">"say"</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm"</span> + <span class="hljs-keyword">this</span>.name);
    }
  }]);

  <span class="hljs-keyword">return</span> Haski;
}(Dog);</code></pre>
<blockquote><p><code>教是最好的学</code>，我正在尝试把我自己理解的内容分享出来，希望我能讲清楚，如果描述有误，欢迎指正。</p></blockquote>
<h3 id="articleHeader6">参考文献</h3>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript" rel="nofollow noreferrer" target="_blank">Introduction to Object-Oriented JavaScript</a></p></li>
<li><p><a>Classes</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/9772307/declaring-javascript-object-method-in-constructor-function-vs-in-prototype" rel="nofollow noreferrer" target="_blank">Declaring javascript object method in constructor function vs. in prototype </a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript" rel="nofollow noreferrer" target="_blank">Inheritance and the prototype chain</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解JS类概念的实现

## 原文链接
[https://segmentfault.com/a/1190000004700001](https://segmentfault.com/a/1190000004700001)


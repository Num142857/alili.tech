---
title: 'Javascript面向对象与继承' 
date: 2018-12-07 2:30:09
hidden: true
slug: y3r38u85mr
categories: [reprint]
---

{{< raw >}}

                    
<p>众所周知，Javascript是一门面向对象的语言，如果说针对面向对象来发问的话，我会想到两个问题，在js中，类与实例对象是如何创建的，类与实例对象又是如何实现继承的。</p>
<h2 id="articleHeader0">面向对象</h2>
<h3 id="articleHeader1">如何声明一个类</h3>
<p>ES5中，还没有类的概念，而是通过函数来声明；到了ES6，有了class关键字，则通过class来声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // 类的声明
      var Animal = function () {
          this.name = 'Animal';
      };

      
      // es6中class的声明
      class Animal2 {
          constructor () {
              this.name = 'Animal2';
          }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>      <span class="hljs-comment">// 类的声明</span>
      <span class="hljs-keyword">var</span> Animal = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Animal'</span>;
      };

      
      <span class="hljs-comment">// es6中class的声明</span>
      <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal2</span> </span>{
          <span class="hljs-keyword">constructor</span> () {
              <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Animal2'</span>;
          }</code></pre>
<h3 id="articleHeader2">如何创建对象</h3>
<p>1.字面量对象<br>2.显示的构造函数<br>3.Object.create</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // 第一种方式：字面量
      var o1 = {name: 'o1'};
      var o2 = new Object({name: 'o2'});
      // 第二种方式：构造函数
      var M = function (name) { this.name = name; };
      var o3 = new M('o3');
      // 第三种方式：Object.create
      var p = {name: 'p'};
      var o4 = Object.create(p);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>      <span class="hljs-comment">// 第一种方式：字面量</span>
      <span class="hljs-keyword">var</span> o1 = {<span class="hljs-attr">name</span>: <span class="hljs-string">'o1'</span>};
      <span class="hljs-keyword">var</span> o2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>({<span class="hljs-attr">name</span>: <span class="hljs-string">'o2'</span>});
      <span class="hljs-comment">// 第二种方式：构造函数</span>
      <span class="hljs-keyword">var</span> M = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{ <span class="hljs-keyword">this</span>.name = name; };
      <span class="hljs-keyword">var</span> o3 = <span class="hljs-keyword">new</span> M(<span class="hljs-string">'o3'</span>);
      <span class="hljs-comment">// 第三种方式：Object.create</span>
      <span class="hljs-keyword">var</span> p = {<span class="hljs-attr">name</span>: <span class="hljs-string">'p'</span>};
      <span class="hljs-keyword">var</span> o4 = <span class="hljs-built_in">Object</span>.create(p);
</code></pre>
<h2 id="articleHeader3">类与继承</h2>
<p>如何实现继承?<br><strong>继承的本质就是原型链</strong></p>
<h3 id="articleHeader4">借助构造函数实现继承</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /**
       * 借助构造函数实现继承
       */
      function Parent1 () {
          this.name = 'parent1';
      }
      Parent1.prototype.say = function () {

      };
      function Child1 () {
          Parent1.call(this); // 或Parent1.apply(this,arguments)
          this.type = 'child1';
      }
      console.log(new Child1(), new Child1().say());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>      <span class="hljs-comment">/**
       * 借助构造函数实现继承
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent1</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'parent1'</span>;
      }
      Parent1.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

      };
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child1</span> (<span class="hljs-params"></span>) </span>{
          Parent1.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// 或Parent1.apply(this,arguments)</span>
          <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'child1'</span>;
      }
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Child1(), <span class="hljs-keyword">new</span> Child1().say());</code></pre>
<p>重点是这句：Parent1.call(this); 在子类的构造函数里执行父类的构造函数，通过call/apply改变this指向，从而导致父类构造函数执行时的这些属性都会挂载到子类实例上去。<br>问题： 只能继承父类构造函数中声明的实例属性，并没有继承父类原型的属性和方法</p>
<h3 id="articleHeader5">借助原型链实现继承</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /**
       * 借助原型链实现继承
       */
      function Parent2 () {
          this.name = 'parent2';
          this.play = [1, 2, 3];
      }
      function Child2 () {
          this.type = 'child2';
      }
      Child2.prototype = new Parent2();

      var s1 = new Child2();
      var s2 = new Child2();
      console.log(s1.play, s2.play);
      s1.play.push(4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>      <span class="hljs-comment">/**
       * 借助原型链实现继承
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent2</span> </span>() {
          <span class="hljs-built_in">this</span>.name = <span class="hljs-string">'parent2'</span>;
          <span class="hljs-built_in">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child2</span> </span>() {
          <span class="hljs-built_in">this</span>.type = <span class="hljs-string">'child2'</span>;
      }
      Child2.prototype = <span class="hljs-keyword">new</span> <span class="hljs-type">Parent2</span>();

      <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child2</span>();
      <span class="hljs-keyword">var</span> s2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child2</span>();
      console.log(s1.play, s2.play);
      s1.play.push(<span class="hljs-number">4</span>);</code></pre>
<p>重点就是这句： Child2.prototype = new Parent2();  就是说 new 一个父类的实例，然后赋给子类的原型 也就是说 new Child2().__proto__ === Child2.prototype === new Parent2()当我们在new Child2()中找不到属性/方法，顺着原型链就能找到new Parent2()，这样就实现了继承。<br>问题： 原型链中的原型对象是共用的，子类无法通过父类创建私有属性<br>比如当你new两个子类s1、s2的时候，改s1的属性，s2的属性也跟着改变</p>
<h3 id="articleHeader6">组合式继承</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /**
       * 组合方式
       */
      function Parent3 () {
          this.name = 'parent3';
          this.play = [1, 2, 3];
      }
      function Child3 () {
          Parent3.call(this); // 父类构造函数执行了
          this.type = 'child3';
      }
      Child3.prototype = new Parent3(); // 父类构造函数执行了
      var s3 = new Child3(); 
      var s4 = new Child3();
      s3.play.push(4);
      console.log(s3.play, s4.play);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>      <span class="hljs-comment">/**
       * 组合方式
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent3</span> </span>() {
          <span class="hljs-built_in">this</span>.name = <span class="hljs-string">'parent3'</span>;
          <span class="hljs-built_in">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child3</span> </span>() {
          Parent3.call(<span class="hljs-built_in">this</span>); <span class="hljs-comment">// 父类构造函数执行了</span>
          <span class="hljs-built_in">this</span>.type = <span class="hljs-string">'child3'</span>;
      }
      Child3.prototype = <span class="hljs-keyword">new</span> <span class="hljs-type">Parent3</span>(); <span class="hljs-comment">// 父类构造函数执行了</span>
      <span class="hljs-keyword">var</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child3</span>(); 
      <span class="hljs-keyword">var</span> s4 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child3</span>();
      s3.play.push(<span class="hljs-number">4</span>);
      console.log(s3.play, s4.play);</code></pre>
<p>组合式就是原型链+构造函数继承，解决了前两种方法的问题，但也有不足：子类实例化时，父类构造函数执行了两次，所以有了下面的组合继承的优化1</p>
<h3 id="articleHeader7">组合继承的优化1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
       * 组合继承的优化1
       * @type {String}
       */
      function Parent4 () {
          this.name = 'parent4';
          this.play = [1, 2, 3];
      }
      function Child4 () {
          Parent4.call(this);
          this.type = 'child4';
      }
      Child4.prototype = Parent4.prototype;
      var s5 = new Child4();
      var s6 = new Child4();
      console.log(s5, s6);

      console.log(s5 instanceof Child4, s5 instanceof Parent4);
      console.log(s5.constructor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
       * 组合继承的优化1
       * @type {String}
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent4</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'parent4'</span>;
          <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child4</span> (<span class="hljs-params"></span>) </span>{
          Parent4.call(<span class="hljs-keyword">this</span>);
          <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'child4'</span>;
      }
      Child4.prototype = Parent4.prototype;
      <span class="hljs-keyword">var</span> s5 = <span class="hljs-keyword">new</span> Child4();
      <span class="hljs-keyword">var</span> s6 = <span class="hljs-keyword">new</span> Child4();
      <span class="hljs-built_in">console</span>.log(s5, s6);

      <span class="hljs-built_in">console</span>.log(s5 <span class="hljs-keyword">instanceof</span> Child4, s5 <span class="hljs-keyword">instanceof</span> Parent4);
      <span class="hljs-built_in">console</span>.log(s5.constructor);</code></pre>
<p>其实就是把原型链继承的那句 Child4.prototype = new Parent4(); 改为 Child4.prototype = Parent4.prototype;  这样虽然父类构造函数只执行了一次了，但又有了新的问题： 无法判断s5是Child4的实例还是Parent4的实例  因为Child4.prototype.constructor指向了Parent4的实例；如果直接加一句 Child4.prototype.constructor = Child4  也不行，这样Parent4.prototype.constructor也指向Child4，就无法区分父类实例了。</p>
<blockquote>若要判断a是A的实例  用constructor     <br> a.__proto__.constructor === A<br>用instanceof则不准确， instanceof 判断 实例对象的__proto__ 是不是和 构造函数的prototype 是同一个引用。若A 继承 B， B 继承 C  在该原型链上的对象 用instanceof判断都返回ture</blockquote>
<h3 id="articleHeader8">组合继承的优化2(推荐)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
       * 组合继承的优化2
       */
      function Parent5 () {
          this.name = 'parent5';
          this.play = [1, 2, 3];
      }
      function Child5 () {
          Parent5.call(this);
          this.type = 'child5';
      }
      //注意此处,用到了Object.creat(obj)方法，该方法会对传入的obj对象进行浅拷贝
      //这个方法作为一个桥梁，达到父类和子类的一个隔离
      Child5.prototype = Object.create(Parent5.prototype);
      //修改构造函数指向
      Child5.prototype.constructor = Child5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
       * 组合继承的优化2
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent5</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'parent5'</span>;
          <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child5</span> (<span class="hljs-params"></span>) </span>{
          Parent5.call(<span class="hljs-keyword">this</span>);
          <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'child5'</span>;
      }
      <span class="hljs-comment">//注意此处,用到了Object.creat(obj)方法，该方法会对传入的obj对象进行浅拷贝</span>
      <span class="hljs-comment">//这个方法作为一个桥梁，达到父类和子类的一个隔离</span>
      Child5.prototype = <span class="hljs-built_in">Object</span>.create(Parent5.prototype);
      <span class="hljs-comment">//修改构造函数指向</span>
      Child5.prototype.constructor = Child5</code></pre>
<p>构造函数属性继承和建立子类和父类原型的链接</p>
<h3 id="articleHeader9">ES6实现继承</h3>
<p>引入了class、extends、super关键字，在子类构造函数里调用super()方法来调用父类的构造函数。<br>在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Child6 extends Parent6 {
      constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
      }
      toString() {
        return this.color + ' ' + super.toString(); // super代表父类原型，调用父类的toString()
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child6</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Parent6</span> </span>{
      constructor(x, y, color) {
        <span class="hljs-keyword">super</span>(x, y); <span class="hljs-comment">// 调用父类的constructor(x, y)</span>
        <span class="hljs-keyword">this</span>.color = color;
      }
      toString() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.color + ' ' + <span class="hljs-keyword">super</span>.toString(); <span class="hljs-comment">// super代表父类原型，调用父类的toString()</span>
      }
    }</code></pre>
<h4>class实现原理</h4>
<p>Class充当了ES5中构造函数在继承实现过程中的作用<br>有prototype属性，有__proto__属性，这个属性在ES6中的指向有一些主动的修改。<br>同时存在两条继承链：一条实现属性继承，一条实现方法继承。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends B {}
A.__proto__ === B;  //继承属性
A.prototype.__proto__ === B.prototype;  //继承方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">B</span> </span>{}
<span class="hljs-type">A</span>.__proto__ === <span class="hljs-type">B</span>;  <span class="hljs-comment">//继承属性</span>
<span class="hljs-type">A</span>.prototype.__proto__ === <span class="hljs-type">B</span>.prototype;  <span class="hljs-comment">//继承方法</span></code></pre>
<p>ES6的子类的__proto__是父类，子类的原型的__proto__是父类的原型。<br>但是在ES5中 A.__proto__是指向Function.prototype的，因为每一个构造函数其实都是Function这个对象构造的，ES6中子类的__proto__指向父类可以实现属性的继承。</p>
<blockquote>只有函数有prototype属性，只有对象有__proto__属性 ；但函数也有__proto__属性，因为函数也是一个对象，函数的__proto__等于 Function.prototype。</blockquote>
<h4>extends实现原理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//原型连接
Man.prototype = Object.create(Person.prototype); 
// B继承A的静态属性
Object.setPrototypeOf(Man, Person);
//绑定this
Person.call(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>//原型连接
<span class="hljs-type">Man</span>.proto<span class="hljs-keyword">type</span> = <span class="hljs-type">Object</span>.create(<span class="hljs-type">Person</span>.prototype); 
// <span class="hljs-type">B</span>继承<span class="hljs-type">A</span>的静态属性
<span class="hljs-type">Object</span>.setPrototypeOf(<span class="hljs-type">Man</span>, <span class="hljs-type">Person</span>);
//绑定this
<span class="hljs-type">Person</span>.call(this);</code></pre>
<p>前两句实现了原型链上的继承，最后一句实现构造函数上的继承。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript面向对象与继承

## 原文链接
[https://segmentfault.com/a/1190000014206021](https://segmentfault.com/a/1190000014206021)


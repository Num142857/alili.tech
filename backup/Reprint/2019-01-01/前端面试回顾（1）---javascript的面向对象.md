---
title: '前端面试回顾（1）---javascript的面向对象' 
date: 2019-01-01 2:30:07
hidden: true
slug: 266pcbwb5n6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>前一阵面试，过程中发现问到一些很基础的问题时候，自己并不能很流畅的回答出来。或者遇到一些基础知识的应用，由于对这些点理解的不是很深入，拿着笔居然什么都写不出来，于是有了回顾一下这些基础知识的想法。</p>
<p>首先就是面试中经常会问到的，JS是怎么实现继承的，其实问到继承，面试官想问的可能还是你对JS面向对象的理解吧。</p>
<p>这一部分的主要参考资料：《JavaScript高级程序设计》、《JavaScript设计模式》<br>如果有什么错误的地方，也希望看到这篇文章的小伙伴给我指出来，谢谢 ^_^</p>
<h1 id="articleHeader1">一、对象</h1>
<h2 id="articleHeader2">1.1创建对象</h2>
<p>Javascript是一种基于对象（object-based）的语言，你遇到的所有东西几乎都是对象。<br>一个简单的对象创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var People = {
    name : &quot;eavan&quot;,
    age : 24,
    getName : function(){
        alert(this.name);        //eavan
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> People = {
    name : <span class="hljs-string">"eavan"</span>,
    age : <span class="hljs-number">24</span>,
    getName : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-keyword">this</span>.name);        <span class="hljs-comment">//eavan</span>
    }
}
</code></pre>
<p>使用的时候就可以用People.name，获取People这个对象的name属性,或者是People.getName()来得到People的name值。<br>另一种对象创建方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

var People = new Object();
People.name = &quot;eavan&quot;;
People.age = 24;
People.getName = function(){
    alert(this.name);
}
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="javascript"><span class="hljs-keyword">var</span> People = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
People.name = <span class="hljs-string">"eavan"</span>;
People.age = <span class="hljs-number">24</span>;
People.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.name);
}
    </span></code></pre>
<p>这里用到了new，就顺便提一下在使用new的时候发生了什么，其实在使用new的时候，大致可以认为做了这三件事，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var People  = {};                      //我们创建了一个空对象People
People.__proto__ = Object.prototype;   //我们将这个空对象的__proto__成员指向了Object函数对象prototype成员对象
Object.call(People);         //我们将Object函数对象的this指针替换成People，然后再调用Object函数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> People  = {};                      <span class="hljs-comment">//我们创建了一个空对象People</span>
People.__proto__ = <span class="hljs-built_in">Object</span>.prototype;   <span class="hljs-comment">//我们将这个空对象的__proto__成员指向了Object函数对象prototype成员对象</span>
<span class="hljs-built_in">Object</span>.call(People);         <span class="hljs-comment">//我们将Object函数对象的this指针替换成People，然后再调用Object函数</span>
</code></pre>
<h2 id="articleHeader3">1.2封装</h2>
<p>简单来说就是对一些属性的隐藏域暴露，比如私有属性、私有方法、共有属性、共有方法、保护方法等等。而js也能实现私有属性、私有方法、共有属性、共有方法等等这些特性。</p>
<p>像java这样的面向对象的编程语言一般会有一个类的概念，从而实现封装。而javascript中没有类的概念，JS中实现封装主要还是靠函数。</p>
<p>首先声明一个函数保存在一个变量里面。然后在这个函数（类）的内部通过对this变量添加属性或者方法来实现对类添加属相或者方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Person = function(){
    var name = &quot;eavan&quot;;             //私有属性
    function checkName(){};         //私有方法

    this.myName = &quot;gaof&quot;;            //对象共有属性
    this.myFriends = [&quot;aa&quot;,&quot;bb&quot;,&quot;cc&quot;];
    this.copy = function(){}         //对象共有方法

    this.getName = function(){       //构造器方法
        return name;
    };            
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">"eavan"</span>;             <span class="hljs-comment">//私有属性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkName</span><span class="hljs-params">()</span></span>{};         <span class="hljs-comment">//私有方法</span>

    <span class="hljs-keyword">this</span>.myName = <span class="hljs-string">"gaof"</span>;            <span class="hljs-comment">//对象共有属性</span>
    <span class="hljs-keyword">this</span>.myFriends = [<span class="hljs-string">"aa"</span>,<span class="hljs-string">"bb"</span>,<span class="hljs-string">"cc"</span>];
    <span class="hljs-keyword">this</span>.copy = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}         <span class="hljs-comment">//对象共有方法</span>

    <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{       <span class="hljs-comment">//构造器方法</span>
        <span class="hljs-keyword">return</span> name;
    };            
}
</code></pre>
<p>纯构造函数封装数据的问题是：对像this.copy = function(){}这种方法的创建，其实在执行的时候大可不必绑定到特定的对象上去，将其定义到全局变量上也是一样的，而且其过程相当于实例化了一个Function，也大可不必实例化这么多其实干同一件事的方法。而这个小问题的解决可以用原型模式来解决。</p>
<h2 id="articleHeader4">1.3理解原型</h2>
<p>在每创建一个函数的时候，都会生成一个prototype属性，这个属性指向函数的原型对象。而其是用来包含特定类型的所有实例共享的属性和方法。所以，直接添加在原型中的实例和方法，就会被所有实例所共享。</p>
<p>同样还是上面的Person的例子，我们可以为其原型添加新的属性和方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.isChinese = true;                          //类的静态共有属性（对象不能访问）
Person.prototype.sex = &quot;man&quot; ;            //类的共有属性
Person.prototype.frends = [&quot;gao&quot;,&quot;li&quot;,&quot;du&quot;];
Person.prototype.isBoy = function(){};    //类的共有方法
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code>Person.isChinese = <span class="hljs-literal">true</span>;                          <span class="hljs-comment">//类的静态共有属性（对象不能访问）</span>
Person.prototype.sex = <span class="hljs-string">"man"</span> ;            <span class="hljs-comment">//类的共有属性</span>
Person.prototype.frends = [<span class="hljs-string">"gao"</span>,<span class="hljs-string">"li"</span>,<span class="hljs-string">"du"</span>];
Person.prototype.isBoy = function(){};    <span class="hljs-comment">//类的共有方法</span>
</code></pre>
<p>原型封装数据的问题：对绑定在prototype上的引用类型的变量，由于被所有对象所共有，其中某一个对象对该数据进行修改，当别的对象访问该数据的时候，所访问到的值就是被修改后的。<br>比如如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person1 = new Person();
person1.frends.push(&quot;dd&quot;);
console.log(person1.frends);    //[&quot;gao&quot;, &quot;li&quot;, &quot;du&quot;, &quot;dd&quot;]
var person2 = new Person();
person2.frends.push(&quot;ee&quot;);
console.log(person2.frends);     //[&quot;gao&quot;, &quot;li&quot;, &quot;du&quot;, &quot;dd&quot;, &quot;ee&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> person1 = <span class="hljs-built_in">new</span> Person();
person1.frends.<span class="hljs-built_in">push</span>(<span class="hljs-string">"dd"</span>);
console.<span class="hljs-built_in">log</span>(person1.frends);    //[<span class="hljs-string">"gao"</span>, <span class="hljs-string">"li"</span>, <span class="hljs-string">"du"</span>, <span class="hljs-string">"dd"</span>]
<span class="hljs-built_in">var</span> person2 = <span class="hljs-built_in">new</span> Person();
person2.frends.<span class="hljs-built_in">push</span>(<span class="hljs-string">"ee"</span>);
console.<span class="hljs-built_in">log</span>(person2.frends);     //[<span class="hljs-string">"gao"</span>, <span class="hljs-string">"li"</span>, <span class="hljs-string">"du"</span>, <span class="hljs-string">"dd"</span>, <span class="hljs-string">"ee"</span>]</code></pre>
<p>原本希望对person1和person2的friends属性分别添加新的内容，结果二者的friends属性居然是“公用”的！</p>
<p>综上，最常见的方式应该是组合使用构造函数和原型模式，构造函数用于定义实例属性，原型模式用于定义方法和共享的属性。</p>
<p>每个类有三部分构成：第一部分是构造函数内，供实例对象化复制用。第二部分是构造函数外，直接通过点语法添加，供类使用，实例化对象访问不到。第三部分是类的原型中，实例化对象可以通过其原型链间接访问到，也是为所有实例化对象所共用。</p>
<p>在说到对象实例的属性的时候，我们有一个问题，就是在访问一个属性的时候，这个属性是属于实例，还是属于这个实例的原型的呢？</p>
<p>比如还是上面的例子，我们为person2实例增加一个sex属性，这时候访问person2的sex属性时，得到的是我们增加的值。说明为对象实例添加一个属性的时候，这个属性就会屏蔽原型对象中保存的同名属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   person2.sex = &quot;woman&quot;;
    console.log(person1.sex);                //man
    console.log(person2.sex);                //woman
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>   person2.sex = <span class="hljs-string">"woman"</span>;
    console.<span class="hljs-built_in">log</span>(person1.sex);                <span class="hljs-comment">//man</span>
    console.<span class="hljs-built_in">log</span>(person2.sex);                <span class="hljs-comment">//woman</span>
</code></pre>
<p>这个时候我们可以使用hasOwnProperty()方法来检测一个属性是存在于实例中，还是存在于原型中。如果实例中有这个属性，hasOwnProperty()会返回true，而hasOwnProperty()并不会感知到原型中的属性。所以可以用这个方法检测属性到底是存在于实例中还是原型中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(person1.hasOwnProperty(&quot;sex&quot;));        //原型中的属性，返回false
console.log(person2.hasOwnProperty(&quot;sex&quot;));        //实例中的属性，返回true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>console.<span class="hljs-built_in">log</span>(person1.hasOwnProperty(<span class="hljs-string">"sex"</span>));        <span class="hljs-comment">//原型中的属性，返回false</span>
console.<span class="hljs-built_in">log</span>(person2.hasOwnProperty(<span class="hljs-string">"sex"</span>));        <span class="hljs-comment">//实例中的属性，返回true</span>
</code></pre>
<h1 id="articleHeader5">二、继承</h1>
<p>ECMAScript中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。</p>
<h2 id="articleHeader6">2.1 原型链继承</h2>
<p>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super(){
    this.val = true;
    this.arr = [&quot;a&quot;];
}
function Sub(){
        //...
}
Sub.prototype = new Super();

var sub = new Sub();
console.log(sub.val)        //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.val = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-string">"a"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//...</span>
}
Sub.prototype = <span class="hljs-keyword">new</span> Super();

<span class="hljs-keyword">var</span> sub = <span class="hljs-keyword">new</span> Sub();
<span class="hljs-built_in">console</span>.log(sub.val)        <span class="hljs-comment">//true</span>
</code></pre>
<p>以上代码定义了Super和Sub两个类型，继承的核心就一句话：Sub.prototype = new Super() 将父类的一个实例赋给子类的原型。这样子类就能够使用父类实例所拥有的方法和父类原型中的方法。</p>
<p>这种情况要想给子类添加自己的方法或者是覆盖父类中某个方法的时候，一定要在放在替换原型语句后面。否则写在原型上的方法都会丢失。</p>
<p>而且在给子类添加新方法的时候，不能使用字面量的方式添加新方法，这样会导致继承无效。<br>如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Sub.prototype = new Super();
Sub.prototype = {                        //错误的方式
    getVal : function(){
        //...
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Sub.prototype = <span class="hljs-keyword">new</span> Super();
Sub.prototype = {                        <span class="hljs-comment">//错误的方式</span>
    getVal : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//...</span>
    }
}
</code></pre>
<p>以上代码刚刚把Super的实例赋给原型，紧接着又将原信替换成一个对象字面量，导致现在原型包含的是一个Object的实例，并非Super的实例，因此原型链被切断了，Sub和Super已经没有关系了。</p>
<p>原型链的问题：<br>最主要的问题有两个：一是由于引用类型的原型属性会被所有实例所共享，所以通过原型链继承时，原型变成了另一个类型的实例，原先的实例属性也就变成了现在的原型属性，如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super(){
    this.friends = [&quot;peng&quot;,&quot;gao&quot;];
}
function Sub(){
        //...
}
Sub.prototype = new Super();
var sub1 = new Sub();
var sub2 = new Sub();
sub1.friends.push(&quot;du&quot;);
console.log(sub2.friends);            //[&quot;peng&quot;, &quot;gao&quot;, &quot;du&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span></span>(){
    <span class="hljs-built_in">this</span>.friends = [<span class="hljs-string">"peng"</span>,<span class="hljs-string">"gao"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span></span>(){
        <span class="hljs-comment">//...</span>
}
Sub.prototype = <span class="hljs-keyword">new</span> <span class="hljs-type">Super</span>();
<span class="hljs-keyword">var</span> sub1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Sub</span>();
<span class="hljs-keyword">var</span> sub2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Sub</span>();
sub1.friends.push(<span class="hljs-string">"du"</span>);
console.log(sub2.friends);            <span class="hljs-comment">//["peng", "gao", "du"]</span>
</code></pre>
<p>这个例子说明的就是上面的问题，子类的所有实例共享了父类中的引用类型属性。</p>
<p>原型链继承的另一个问题是在创建子类行的实例的时候，没法向父类的构造函数传递参数。</p>
<h2 id="articleHeader7">2.2 构造函数继承</h2>
<p>具体实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super(){
    this.val = true;
    this.arr = [&quot;a&quot;];
}
function Sub(){
       Super.call(this);
}
var sub = new Sub();
console.log(sub.val)        //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.val = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-string">"a"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span>(<span class="hljs-params"></span>)</span>{
       Super.call(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">var</span> sub = <span class="hljs-keyword">new</span> Sub();
<span class="hljs-built_in">console</span>.log(sub.val)        <span class="hljs-comment">//true</span>
</code></pre>
<p>这种模式这是解决了原型链继承中出现的两个问题，它可以传递参数，也没有了子类共享父类引用属性的问题。<br>但这种模式也有他的问题，那就是在父类原型中定义的方法，其实是对子类不可见的。</p>
<h2 id="articleHeader8">2.3组合继承</h2>
<p>既然上述的两种方式各有各自的局限性，将它俩整合到一起是不是会好一点呢，于是就有了组合继承。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super(){
    this.val = true;
    this.arr = [&quot;a&quot;];
}
function Sub(){
       Super.call(this);                    //{2}
}
Sub.prototype = new Super();                //{1}
Sub.prototype.constructor = Sub;            //{3}
var sub = new Sub();
console.log(sub.val)        //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.val = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-string">"a"</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span>(<span class="hljs-params"></span>)</span>{
       Super.call(<span class="hljs-keyword">this</span>);                    <span class="hljs-comment">//{2}</span>
}
Sub.prototype = <span class="hljs-keyword">new</span> Super();                <span class="hljs-comment">//{1}</span>
Sub.prototype.constructor = Sub;            <span class="hljs-comment">//{3}</span>
<span class="hljs-keyword">var</span> sub = <span class="hljs-keyword">new</span> Sub();
<span class="hljs-built_in">console</span>.log(sub.val)        <span class="hljs-comment">//true</span>
</code></pre>
<p>组合继承还有一个要注意的地方：<br>在代码{3}处，将子类原型的constructor属性指向子类的构造函数。因为如果不这么做，子类的原型是父类的一个实例，所以子类原型的constructor属性就丢失了，他会顺着原型链继续往上找，于是就找到了父类的constructor所以它指向的其实是父类。</p>
<p>这种继承方式是使用最多的一种方式。<br>这种继承方式解决了上两种方式的缺点，不会出现共享引用类型的问题，同时父类原型中的方法也被继承了下来。</p>
<p>如果要说起有什么缺点我们发现，在执行代码{1}时，Sub.prototype会得到父类型的val和arr两个属性。他们是Super的实例属性，只不过现在在Sub的原型上。而代码{2}处，在创建Sub实例的时候，调用Super的构造函数，又会在新的对象上创建属性val和arr，于是，这两个属性就屏蔽了原型中两个同名属性。</p>
<h2 id="articleHeader9">2.4寄生组合式继承</h2>
<p>对于上面的问题，我们也有解决办法，不是在子类原型中多了一份父类的属性和方法么，那我原型中就只要父类原型中的属性和方法，这里我们引入了一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inheritObject(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritObject</span><span class="hljs-params">(obj)</span></span>{
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
    F.prototype = obj;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}
</code></pre>
<p>这个方法创建了一个对象临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。</p>
<p>我们可以设想，如果用这个方法拷贝一份父类的原型属性给子类，是不是就避免了上面提到的子类原型中多了一份父类构造函数内的属性。看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super(){
    this.val = 1;
    this.arr = [1];
}
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};

function Sub(){
    Super.call(this);
}
var p = inheritObject(Super.prototype);         //{1}
p.constructor = Sub;                            //{2}
Sub.prototype = p;                              //{3}
 
var sub = new Sub();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.val = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>];
}
Super.prototype.fun1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
Super.prototype.fun2 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span><span class="hljs-params">()</span></span>{
    Super.call(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">var</span> p = inheritObject(Super.prototype);         <span class="hljs-comment">//{1}</span>
p.constructor = Sub;                            <span class="hljs-comment">//{2}</span>
Sub.prototype = p;                              <span class="hljs-comment">//{3}</span>
 
<span class="hljs-keyword">var</span> sub = <span class="hljs-keyword">new</span> Sub();
</code></pre>
<p>基本思路就是：不必为了指定子类型的原型而调用父类的够着函数，我们需要的无非就是父类原型的一个副本而已。本质上就是复制出父类的一个副本，然后再将结果指定给子类型的原型。</p>
<h1 id="articleHeader10">三、多态</h1>
<p>所谓多态，就是同一个方法的多种调用方式，在javascript中，通过arguments对象对传入的参数做判断就可以实现多种调用方式。</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Add(){
    function zero(){
        return 10;
    }
    function one(num){
        return 10 + num;
    }
function    two(num1, num2){
    return num1 + num2;
}
this.add = function(){
    var arg = arguments,
            len = arg.length;
    switch (len){
        case 0:
            return zero();
        case 1:
            return one(arg[0]);
        case 2:
            return two(arg[0], arg[1]);
        }
    }
}
var A = new Add();
console.log(A.add());                //10
console.log(A.add(5));              //15
console.log(A.add(6, 7));          //13
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Add</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zero</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">one</span>(<span class="hljs-params">num</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">10</span> + num;
    }
<span class="hljs-function"><span class="hljs-keyword">function</span>    <span class="hljs-title">two</span>(<span class="hljs-params">num1, num2</span>)</span>{
    <span class="hljs-keyword">return</span> num1 + num2;
}
<span class="hljs-keyword">this</span>.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> arg = <span class="hljs-built_in">arguments</span>,
            len = arg.length;
    <span class="hljs-keyword">switch</span> (len){
        <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
            <span class="hljs-keyword">return</span> zero();
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            <span class="hljs-keyword">return</span> one(arg[<span class="hljs-number">0</span>]);
        <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            <span class="hljs-keyword">return</span> two(arg[<span class="hljs-number">0</span>], arg[<span class="hljs-number">1</span>]);
        }
    }
}
<span class="hljs-keyword">var</span> A = <span class="hljs-keyword">new</span> Add();
<span class="hljs-built_in">console</span>.log(A.add());                <span class="hljs-comment">//10</span>
<span class="hljs-built_in">console</span>.log(A.add(<span class="hljs-number">5</span>));              <span class="hljs-comment">//15</span>
<span class="hljs-built_in">console</span>.log(A.add(<span class="hljs-number">6</span>, <span class="hljs-number">7</span>));          <span class="hljs-comment">//13</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试回顾（1）---javascript的面向对象

## 原文链接
[https://segmentfault.com/a/1190000011061136](https://segmentfault.com/a/1190000011061136)


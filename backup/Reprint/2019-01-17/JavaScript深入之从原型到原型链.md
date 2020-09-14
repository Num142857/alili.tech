---
title: 'JavaScript深入之从原型到原型链' 
date: 2019-01-17 2:30:25
hidden: true
slug: vucj9zrn6q7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列的第一篇，从原型与原型链开始讲起，如果你想知道构造函数的实例的原型，原型的原型，原型的原型的原型是什么，就来看看这篇文章吧。</p></blockquote>
<h2 id="articleHeader0">构造函数创建对象</h2>
<p>我们先使用构造函数创建一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}
var person = new Person();
person.name = 'Kevin';
console.log(person.name) // Kevin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();
person.name = <span class="hljs-string">'Kevin'</span>;
<span class="hljs-built_in">console</span>.log(person.name) <span class="hljs-comment">// Kevin</span></code></pre>
<p>在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。</p>
<p>很简单吧，接下来进入正题：</p>
<h2 id="articleHeader1">prototype</h2>
<p>每个函数都有一个 prototype 属性，就是我们经常在各种例子中看到的那个 prototype ，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}
<span class="hljs-comment">// 虽然写在注释里，但是你要注意：</span>
<span class="hljs-comment">// prototype是函数才会有的属性</span>
Person.prototype.name = <span class="hljs-string">'Kevin'</span>;
<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(person1.name) <span class="hljs-comment">// Kevin</span>
<span class="hljs-built_in">console</span>.log(person2.name) <span class="hljs-comment">// Kevin</span></code></pre>
<p>那这个函数的 prototype 属性到底指向的是什么呢？是这个函数的原型吗？</p>
<p>其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的<strong>实例</strong>的原型，也就是这个例子中的 person1 和 person2 的原型。</p>
<p>那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。</p>
<p>让我们用一张图表示构造函数和实例原型之间的关系：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype1.png" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/prototype1.png" alt="构造函数和实例原型的关系图" title="构造函数和实例原型的关系图" style="cursor: pointer;"></span></p>
<p>在这张图中我们用 Object.prototype 表示实例原型。</p>
<p>那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：</p>
<h2 id="articleHeader2">__proto__</h2>
<p>这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。</p>
<p>为了证明这一点,我们可以在火狐或者谷歌中输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(person.__proto__ === Person.prototype); <span class="hljs-comment">// true</span></code></pre>
<p>于是我们更新下关系图：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype2.png" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/prototype2.png" alt="实例与实例原型的关系图" title="实例与实例原型的关系图" style="cursor: pointer;"></span></p>
<p>既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？</p>
<h2 id="articleHeader3">constructor</h2>
<p>指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor﻿，每个原型都有一个 constructor 属性指向关联的构造函数。</p>
<p>为了验证这一点，我们可以尝试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}
console.log(Person === Person.prototype.constructor); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}
<span class="hljs-built_in">console</span>.log(Person === Person.prototype.constructor); <span class="hljs-comment">// true</span></code></pre>
<p>所以再更新下关系图：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype3.png" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/prototype3.png" alt="实例原型与构造函数的关系图" title="实例原型与构造函数的关系图" style="cursor: pointer;"></span></p>
<p>综上我们已经得出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();

<span class="hljs-built_in">console</span>.log(person.__proto__ == Person.prototype) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(Person.prototype.constructor == Person) <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 顺便学习一个ES5的方法,可以获得对象的原型</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(person) === Person.prototype) <span class="hljs-comment">// true</span></code></pre>
<p>了解了构造函数、实例原型、和实例之间的关系，接下来我们讲讲实例和原型的关系：</p>
<h2 id="articleHeader4">实例与原型</h2>
<p>当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}

Person.prototype.name = 'Kevin';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // Kevin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}

Person.prototype.name = <span class="hljs-string">'Kevin'</span>;

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();

person.name = <span class="hljs-string">'Daisy'</span>;
<span class="hljs-built_in">console</span>.log(person.name) <span class="hljs-comment">// Daisy</span>

<span class="hljs-keyword">delete</span> person.name;
<span class="hljs-built_in">console</span>.log(person.name) <span class="hljs-comment">// Kevin</span></code></pre>
<p>在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。</p>
<p>但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.__proto__ ，也就是 Person.prototype中查找，幸运的是我们找到了  name 属性，结果为 Kevin。</p>
<p>但是万一还没有找到呢？原型的原型又是什么呢？</p>
<h2 id="articleHeader5">原型的原型</h2>
<p>在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
obj.name = <span class="hljs-string">'Kevin'</span>
<span class="hljs-built_in">console</span>.log(obj.name) <span class="hljs-comment">// Kevin</span></code></pre>
<p>所以原型对象是通过 Object 构造函数生成的，结合之前所讲，实例的 __proto__ 指向构造函数的 prototype ，所以我们再更新下关系图：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype4.png" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/prototype4.png" alt="原型的原型关系图" title="原型的原型关系图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">原型链</h2>
<p>那 Object.prototype 的原型呢？</p>
<p>null，不信我们可以打印：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.prototype.__proto__ === null) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.__proto__ === <span class="hljs-literal">null</span>) <span class="hljs-comment">// true</span></code></pre>
<p>所以查到属性的时候查到 Object.prototype 就可以停止查找了。</p>
<p>所以最后一张关系图就是</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png" alt="原型链示意图" title="原型链示意图" style="cursor: pointer;"></span></p>
<p>顺便还要说一下，图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。</p>
<h2 id="articleHeader7">补充</h2>
<p>最后，补充三点大家可能不会注意的地方：</p>
<h3 id="articleHeader8">constructor</h3>
<p>首先是 constructor 属性，我们看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {

}
var person = new Person();
console.log(person.constructor === Person); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{

}
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(person.constructor === Person); <span class="hljs-comment">// true</span></code></pre>
<p>当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person.constructor === Person.prototype.constructor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">person.constructor === Person.prototype.constructor</code></pre>
<h3 id="articleHeader9">__proto__</h3>
<p>其次是 __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。</p>
<h3 id="articleHeader10">真的是继承吗？</h3>
<p>最后是关于继承，前面我们讲到“每一个对象都会从原型‘继承’属性”，实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的JavaScript》中的话，就是：</p>
<p>继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。</p>
<h2 id="articleHeader11">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/3" rel="nofollow noreferrer" target="_blank">JavaScript深入之词法作用域和动态作用域</a></p>
<h2 id="articleHeader12">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之从原型到原型链

## 原文链接
[https://segmentfault.com/a/1190000008959943](https://segmentfault.com/a/1190000008959943)


---
title: '《JavaScript语言精粹 修订版》 读书笔记' 
date: 2019-01-07 2:30:11
hidden: true
slug: cnu5hzcs8r7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>之前看到这篇文章，<a href="https://zhuanlan.zhihu.com/p/23265155?refer=dreawer" rel="nofollow noreferrer" target="_blank">前端网老姚浅谈：怎么学JavaScript？</a>，说到怎么学习JavaScript，那就是<strong>看书、分析源码。</strong><br><strong>10本书读2遍的好处，应该大于一本书读20遍。</strong><br><strong>看书主动学习，看视频是被动学习。</strong><br><strong>看书和分析源码的时机</strong>。但已经工作一年半载时，正是提高的好时候，此时可以去看书了。全面系统的梳理知识点，扫清自己的盲区。如果只是靠项目经验是不够的，通过项目来学习，那&gt;肯定是必须的，工作本身就是一个学习的过程。<br><strong>怎么把一本书看完呢？</strong>很简单，敲。文字加代码都敲。<br>比较认同老姚的说法。去年毕业到现在，我也算是工作一年了，是时候看书查缺补漏了。</blockquote>
<p>于是我就先把这本薄的经典书《JavaScript语言精粹 修订版》<a href="https://book.douban.com/subject/11874748/" rel="nofollow noreferrer" target="_blank">豆瓣读书本书简介</a>（总共10章，除去附录，才100页），读完并记录了一些笔记。基本算是摘抄书本的，自己联想到了一些知识和资料也扩展了一下。总体写下来近一万字。读书笔记还可以分享给别人看。回顾时，书不在身边还可以看看自己的笔记。想想这类经典书记一遍动手敲一遍也是很值得的。不过这读书笔记中可能会有一些错别字，阅读时如果发现欢迎指正。</p>
<h3 id="articleHeader0">第1章 精华</h3>
<p>大多数语言都有精华和糟粕。<code>JavaScript</code>令人诡异的事情是，在对这门语言没有的太多了解，甚至对编程都没有太多了解的情况下，你也能用它来完成工作。<br>看到这里不禁想起：</p>
<blockquote>张鑫旭大牛在<a href="http://www.zhangxinxu.com/wordpress/2017/06/ten-question-about-frontend-zhihu/" rel="nofollow noreferrer" target="_blank">《我对知乎前端相关问题的十问十答》</a><br>非计算机专业背景学习JS要点有这一条：<br>所有继承和原型相关内容跳过，注意，是跳过，不要看！没有这些JS一样可以活得很好，你的日常工作一样玩得飞起，当然，你没忍住看了相关知识也没关系，因为你会发现自己看不懂的；</blockquote>
<p><code>JavaScript</code>的函数是（主要）基于<strong>词法作用域</strong>的顶级对象。</p>
<blockquote>译注：<code>JavaScript</code>中的函数是根据词法来划分作用域的，而不是动态划分作用域的。具体内容参见《<code>JavaScript</code>权威指南》中译第5版相关章节“8.8.1 词法作用域”。<br>JavaScript有非常强大的对象字面量表示法。这种表示法是JSON的灵感来源。<br>原型继承是JavaScript中一个有争议的特性。</blockquote>
<p>《<code>ECMAScript</code>编程语言》第3版定义了<code>JavaScript</code>的标准。<br><a href="http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf" rel="nofollow noreferrer" target="_blank">ES3标准</a><br><strong>扩展：</strong><a href="http://yanhaijing.com/es5/ECMAScript%E8%A7%84%E8%8C%83-%E7%AC%AC%E4%B8%89%E7%89%88_%E4%B8%AD%E6%96%87%E7%89%88.pdf" rel="nofollow noreferrer" target="_blank">颜海镜大牛整理的ES3中文版</a><br><a href="http://yanhaijing.com/es5/#about" rel="nofollow noreferrer" target="_blank">颜海镜大牛整理的ES5中文版</a><br><a href="https://www.w3.org/html/ig/zh/wiki/ES5#.E7.A8.8B.E5.BA.8F" rel="nofollow noreferrer" target="_blank">W3c ES5中文版</a><br><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰大牛的书籍《ES6标准入门2》</a><br>更多内容可参见这篇文章：<a href="https://zhuanlan.zhihu.com/p/27537439" rel="nofollow noreferrer" target="_blank">ECMAScript 2018 标准导读</a></p>
<p>一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>.method = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(name, func)</span></span> {
  this.prototype[<span class="hljs-keyword">name</span>] = func;
  <span class="hljs-keyword">return</span> this;
}</code></pre>
<p>书中贯彻始终都会用到这个<code>method</code>方案，作者将会在第4章解释它。</p>
<h3 id="articleHeader1">第2章 语法</h3>
<p>本章主要用铁路图（语法图）表示语法。<br>主要有：空白、标识符、数字、字符串、语句、表达式、字面量、函数。<br><code>typeof</code> 运算符产生的值有<code>'number'</code>, <code>'string'</code>,<code>'boolean'</code>,<code>'undefined'</code>,<code>'function'</code>,<code>'object'</code>。如果运算数是一个数组或者是<code>null</code>,那么结果是<code>'object'</code>,这其实是不对的。</p>
<h3 id="articleHeader2">第3章 对象</h3>
<p><code>JavaScript</code>简单数据类型包括数字、字符串、布尔值，<code>null</code>值和<code>undefined</code>值。其他所有值都是对象。<br>数组、字符串和布尔值“貌似”对象，因为它们拥有方法（包装对象），但它们是不可变的。<br>对象是属性的容器，其中每个属性都拥有名字和值。属性名可以是包括空字符串在内的所有字符串，属性值可以是除了<code>undefined</code>值之外的任何值。</p>
<p><code>JavaScript</code>包含一种原型链的特性，允许对象继承到另一个对象的属性。正确地使用它能减少对象初始化时的消耗的时间和内存。<br><strong>检索</strong><br><code>.</code>,<code>[]</code>两种检索方式，推荐点<code>.</code>表示法。<br>尝试重<code>undefined</code>的成员属性中取值将会导致<code>TypeError</code>异常，这时可以通过<code>&amp;&amp;</code>来避免错误。<br><strong>更新</strong><br>如果属性名已经存在对象里。那么属性的值会被替换。如果之前没有拥有那个属性名，那么该属性将被扩充到对象中。<br><strong>引用</strong><br>对象通过引用来传递。它们永远不会被复制。<br><strong>原型</strong><br>所有通过对象字面量创建的对象都链接到<code>Object.prototype</code>。<br>创建新对象时，可以选择某个对象作为它的原型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.create !== <span class="hljs-string">'function'</span>) {
  <span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};
    F.prototype = o;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
  };
}</code></pre>
<p>原型连接只有在检索值的时候才被用到。如果尝试去获取对象的某个属性值，但对象没有此属性名，那么<code>JavaScript</code>会试着从原型对象中获取属性值。如果那个原型对象也没有该属性，那么再从它的原型中寻找，依此类推，直到该过程最后达到终点<code>Object.prototype</code>。如果想要的属性完全不存在原型链中，那么结果就是 <code>undefined</code>值。这个过程称为<strong>委托</strong>。<br>原型关系是一种动态的关系。<br><strong>反射</strong><br>原型链上的所有属性都会产生值。有两种方案可以处理掉对象上不需要的属性。<br>①程序检查时丢弃值为函数的属性。但有可能有些值确实是函数，所以该方法不可靠。<br>②使用<code>hasOwnProperty</code>方法，如果是对象拥有独有的属性，则返回<code>true</code>。该方法不会检查原型链。<br><strong>枚举</strong><br>① <code>for in</code>可以遍历一个对象中所有的属性名。但包含函数和一些不关心的原型中属性。而且顺序不确定，可以用 <code>hasOwnProperty</code>方法和<code>typeof</code>排除函数。<br>②<code>for</code> 循环不会出现<code>for in</code>那些情况。<br><strong>删除</strong><br>delete运算符可以用来删除对象的属性。<br><strong>减少全局变量的污染</strong><br>可以把全局性的资源纳入一个名称空间之下。这样做能减少冲突。</p>
<h3 id="articleHeader3">第4章 函数</h3>
<p>函数用于①代码复用②信息隐藏③组合调用。一般来说，所谓编程，就是将一组需求分节成一组函数与数据结构的技能。<br><code>JavaScript</code>的函数就是对象。<br>函数对象连接到<code>Function.prototype</code>(该原型对象本身连接到<code>Object.prototype</code>)。<br>每个函数在创建时会附加两个隐藏属性，函数的上下文和实现函数行为的代码。<br>每个函数对象在创建时也随配有一个<code>prototype</code>属性。它的值是一个拥有<code>constructor</code>属性且值为该函数的对象。<br><strong>函数字面量</strong><br>函数字面量包括4个部分。①保留字<code>function</code>②函数名，可以省略，③一组参数④一组语句。<br>函数字面量可以出现在任何允许表达式出现的地方。一个内部函数除了可以访问自己的参数和变量，同时也可以自由访问把它嵌套在其中的父函数的参数和变量。通过函数字面量创建的函数对象包含一个连接到外部上下文的连接。这被称为<strong>闭包</strong>。<br><strong>调用</strong><br>除了声明时定义的形式参数，每一个函数还接收两个附加的参数：<code>this</code>和<code>argument</code>。在<code>JavaScript</code>中一共有四种调用模式。①方法调用模式，②函数调用模式③构造器调用模式④<code>apply</code>调用模式。</p>
<p>（<code>this</code>指向问题一直困扰很多人。我一般是这样记的，谁调用<code>this</code>就指向谁。）</p>
<p><strong>方法调用模式</strong><br>对象的方法执行,<code>this</code>指向该对象。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myObj = {
  value: 0,
  showValue: function() {
    console.log('value:', this.value);
  }
}
myObj.showValue();  // value: 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> myObj = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">showValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'value:'</span>, <span class="hljs-keyword">this</span>.value);
  }
}
myObj.showValue();  <span class="hljs-comment">// value: 0</span></code></pre>
<p><strong>函数调用模式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = function(a,b) {
    return a + b;
}
add(3,4);  //7
window.add(3,4);  //7
// 这种this被绑定到全局对象（window）。
// 可以理解是window.add(3,4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">add</span> = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span> <span class="hljs-comment">{
    return a + b;
}</span>
<span class="hljs-title">add</span><span class="hljs-params">(3,4)</span>;</span>  <span class="hljs-comment">//7</span>
window.add(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);  <span class="hljs-comment">//7</span>
<span class="hljs-comment">// 这种this被绑定到全局对象（window）。</span>
<span class="hljs-comment">// 可以理解是window.add(3,4);</span></code></pre>
<p>有种简单的办法就是<code>var that = this;</code>把<code>this</code>存储下。<br>例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myObj = {
  value: 0,
  age: 20,
  showValue: function() {
    console.log('value:',this.value);
    var  that = this;
    var showAge = function() {
        // window上没有age，所以是undefined
        console.log('这里的this是window ---age:', this.age);  // undefined
        console.log('age:', that.age);  // 20
     }
     showAge();
  }
}
myObj.showValue();  // 0， undefined，" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> myObj = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>,
  <span class="hljs-attr">showValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'value:'</span>,<span class="hljs-keyword">this</span>.value);
    <span class="hljs-keyword">var</span>  that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> showAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// window上没有age，所以是undefined</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这里的this是window ---age:'</span>, <span class="hljs-keyword">this</span>.age);  <span class="hljs-comment">// undefined</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'age:'</span>, that.age);  <span class="hljs-comment">// 20</span>
     }
     showAge();
  }
}
myObj.showValue();  <span class="hljs-comment">// 0， undefined，</span></code></pre>
<p><strong>构造器调用模式</strong><br><code>JavaScript</code>是一门基于原型继承的语言。<br>如果在一个函数前面带上<code>new</code> 来调用。那么背地利将会创建一个连接到该函数的<code>prototype</code>成员的新对象，同时this会被绑定到那个新对象上。<br><code>new</code> 前缀也会改变<code>return</code> 语句的行为。<br>例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Quo = function (string) {
  this.status = string;
}
Quo.prototype.get_status = function () {
  return this.status; 
}
var myQuo = new Quo('confused'); // 'confused'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> Quo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">string</span>) </span>{
  <span class="hljs-keyword">this</span>.status = <span class="hljs-built_in">string</span>;
}
Quo.prototype.get_status = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.status; 
}
<span class="hljs-built_in">var</span> myQuo = <span class="hljs-keyword">new</span> Quo(<span class="hljs-string">'confused'</span>); <span class="hljs-comment">// 'confused'</span></code></pre>
<p>一个函数，如果创建的目的就是希望结合<code>new</code> 前缀来调用。那么它就被称为构造器函数。按照约定，它们保存在以大写函数命名的变量里。如果调用构造器函数时没有在前面加上<code>new</code>,可能会发生非常糟糕的事情，既没有编译时的警告，也没有运行时广告，所以大写约定非常重要。<br>作者不推荐这种形式的构造器函数。有更好的替代方式。<br><strong>Apply调用模式</strong><br><code>JavaScript</code>是一门函数式的面向对象编程语言，所以对象可以拥有方法。<br><code>apply</code>方法让我们构建一个参数数组传递给调用函数，它也允许我们选择<code>this</code>的值。<br><strong>参数</strong><br><code>arguments</code>，虽然拥有<code>length</code>属性，但不是真正的数组。而是类似数组（<code>array-like</code>）的对象。<br><strong>返回</strong><br><code>return</code> 可用来是函数提前返回。当<code>return</code> 被执行时，函数立即返回而不再执行余下的语句。<br>一个函数总会返回一个值，如果没指定，那就是返回<code>undefined</code>值。<br>如果函数调用时在前面加上了<code>new</code> 前缀，且返回值不是一个对象，则返回<code>this</code>（该新对象）。<br><strong>异常</strong><br><code>JavaScript</code>提供了一套异常处理机制。<br><code>throw</code>语句和<code>try catch</code>,<code>try catch</code>中<code>finally</code>是可选的。<br><strong>扩展类型的功能</strong><br><code>JavaScript</code>允许给语言的基本类型扩充功能。在第3章中我们已经看到，可以通过<code>Object.prototype</code>添加方法，可以让该方法对所有对象都可用。这样的方式对函数、数组、字符串、数字、正则表达式和布尔值同样适用。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.method = function () {
  this.prototype[name]  = func;
  return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.method = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.prototype[name]  = func;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<p>基本类型的原型是公用结构，所以在类库混用时务必小心。一个保险的做法就是只在确认没有该方法时才添加它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.methods = function(name, func) {
  if (!this.prototype[name]) {
      this.prototype[name] = func;
  }
  return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.methods = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, func</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.prototype[name]) {
      <span class="hljs-keyword">this</span>.prototype[name] = func;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<p><strong>递归</strong><br>递归函数就是会直接或间接地调用自身的一种函数。递归是一种强大的编程技术，递归是用一般的方式去解决每一个子问题。书中举了一个<strong>汉诺塔</strong>的例子，是程序设计中经典递归问题。详细说明可以参见 <a href="http://baike.baidu.com/view/191666.htm" rel="nofollow noreferrer" target="_blank">百度百科“汉诺塔”词条</a>。<br>一些语言提供了尾递归优化。尾递归是一种在函数的最后执行调用语句的特殊形式的递归。参见<a href="https://en.wikipedia.org/wiki/Tail_call" rel="nofollow noreferrer" target="_blank">Tail call</a>。 ES6版本扩展了尾递归。参见阮一峰老师的《ES6标准入门》中的<a href="http://es6.ruanyifeng.com/#docs/function#" rel="nofollow noreferrer" target="_blank">尾调用优化</a><br><strong>作用域</strong><br>在编程语言中，作用域控制着变量与参数的可见性和声明周期。<br>书中指出当前<code>JavaScript</code>没有块级作用域。因为没有块级作用域，所以最好的做法是在函数体的顶部声明函数中可能用到的所有变量。不过<code>ES6</code>扩展了有块级作用域。<br><strong>闭包</strong><br>作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量（除了<code>this</code>和<code>arguments</code>）。<br>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;list&quot;>
    <li>0</li>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 点击相应节点时，显示对应的序号。可以使用闭包来解决。
var add_the_handlers = function() {
    var helper = function(i) {
        return function(e) {
            alert(i);
        }
    }
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = helper(i);
    }
}
// 扩展 另外可以用let i = 0，或者把nodes类数组转成数组等方案实现。
// 闭包特性：1、函数内再嵌套函数，2、内部函数可以调用外层的参数和变量，3、参数和变量不会被垃圾回收机制回收。
// 闭包优点 灵活和方便，便于封装。缺点：空间浪费、内存泄露、性能消耗。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 点击相应节点时，显示对应的序号。可以使用闭包来解决。</span>
<span class="hljs-keyword">var</span> add_the_handlers = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> helper = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(i)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
            alert(i);
        }
    }
    <span class="hljs-keyword">var</span> i;
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; nodes.length; i += <span class="hljs-number">1</span>) {
        nodes[i].onclick = helper(i);
    }
}
<span class="hljs-comment">// 扩展 另外可以用let i = 0，或者把nodes类数组转成数组等方案实现。</span>
<span class="hljs-comment">// 闭包特性：1、函数内再嵌套函数，2、内部函数可以调用外层的参数和变量，3、参数和变量不会被垃圾回收机制回收。</span>
<span class="hljs-comment">// 闭包优点 灵活和方便，便于封装。缺点：空间浪费、内存泄露、性能消耗。</span></code></pre>
<p><strong>回调</strong><br>发起异步请求，提供一个当服务器响应到达时随即出发的回调函数。异步函数立即返回，这样客户端就不会被阻塞。<br><strong>模块</strong><br>我们可以使用函数和闭包来构造模块。模块是一个提供接口却隐藏状态与实现的函数或对象。<br>举例：给<code>String</code>添加一个<code>deentityify</code>方法。它的任务是寻找字符串中的<code>HTML</code>字符实体并把它们替换成对应的字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String.method('deentityify', function () {
    // 字符实体表。它映射字符实体的名字到对应的字符。
    var entity = {
        quot: '&quot;',
        lt: '<',
        gt: '>'
    };
    // 返回 deentityify方法
    return function () {
        return this.replace(/&amp;([^&amp;;]+);)/g,
        function (a,b) {
            var r = entity[b];
            return typeof r === 'string'? r : a;
        }
    };
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">String</span>.method(<span class="hljs-string">'deentityify'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 字符实体表。它映射字符实体的名字到对应的字符。</span>
    <span class="hljs-keyword">var</span> entity = {
        <span class="hljs-attr">quot</span>: <span class="hljs-string">'"'</span>,
        <span class="hljs-attr">lt</span>: <span class="hljs-string">'&lt;'</span>,
        <span class="hljs-attr">gt</span>: <span class="hljs-string">'&gt;'</span>
    };
    <span class="hljs-comment">// 返回 deentityify方法</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.replace(<span class="hljs-regexp">/&amp;([^&amp;;]+);)/g</span>,
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a,b</span>) </span>{
            <span class="hljs-keyword">var</span> r = entity[b];
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> r === <span class="hljs-string">'string'</span>? r : a;
        }
    };
}());</code></pre>
<p>模块模式利用了函数作用域和闭包来创建被绑定对象与私有成员的关联，在上面例子中，只有<code>deentityify</code>方法有权访问字符实体表这个数据对象。<br>模块模式的一般形式是：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的特权函数；最后返回这个特权函数，或者把它们保存到一个可以访问的地方。<br>使用模块模式就可以摒弃全局变量的使用。它促进了信息隐藏和其他优秀的设计实践。对于应用程序的封装，或者构造其他单例对象，模块模式非常有效。</p>
<blockquote>单例译注<br>模块模式通常结合单例模式使用。<code>JavaScript</code>的单例就是用对象字面量表示法创建的对象，对象的属性值可以是数值或函数，并且属性值在该对象的生命周期中不会发生变化。更多内容参见：<a href="https://en.wikipedia.org/wiki/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F" rel="nofollow noreferrer" target="_blank">单例模式</a>
</blockquote>
<p><strong>级联</strong><br>有一些方法没有返回值。如果我们让这些方法返回<code>this</code>而不是<code>undefined</code>，就可以启用级联。<br>在一个级联中，我们可以在单独一条语句中依次调用同一个对象的很多方法。比如<code>jQuery</code>获取元素、操作样式、添加事件、添加动画等。<br><strong>柯里化</strong><br>柯里化，是把多参数函数转换为一系列单参数函数并进行调用的技术。更多详情可参见：<a href="https://en.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96" rel="nofollow noreferrer" target="_blank">柯里化</a><br>函数也是值。柯里化允许我们把函数与传递给它的参数相结合，产生一个新的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add1 = add.curry(1);
document.writeln(add1(6));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>var add1 = <span class="hljs-keyword">add</span>.<span class="bash">curry(1);
</span>document.writeln(add1(<span class="hljs-number">6</span>));</code></pre>
<p>JavaScript并没有curry方法，但可以扩展该功能。<br>arguments不是真正的数组，所以使用了Array.prototype.slice方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.method('curry',function(){
    var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
    return function() {
        return that.apply(null, args.concat(slice.apply(arguments)));
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.method(<span class="hljs-string">'curry'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> slice = <span class="hljs-built_in">Array</span>.prototype.slice,
    args = slice.apply(<span class="hljs-built_in">arguments</span>),
    that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> that.apply(<span class="hljs-literal">null</span>, args.concat(slice.apply(<span class="hljs-built_in">arguments</span>)));
    }
});</code></pre>
<p><strong>记忆</strong><br>函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。这种优化称作记忆。<br>比如说，我们想要一个递归函数来计算<code>Fibonacci</code>(斐波那契)数列，它的特点是，前面相邻两项之和等于后一项的值。更多参考：<a href="https://en.wikipedia.org/wiki/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91" rel="nofollow noreferrer" target="_blank">斐波那契</a>。最前面两个数字是0和1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fibonacci = function() {
    return n < 2? n : fibonacci(n-1) + fibonacci(n-2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> fibonacci = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> n &lt; <span class="hljs-number">2</span>? n : fibonacci(n<span class="hljs-number">-1</span>) + fibonacci(n<span class="hljs-number">-2</span>);
}</code></pre>
<p>这样虽然能完成工作，但它做了很多无谓的工作。<br>构造一个带有记忆功能的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var memoizer = function(mome, formula) {
    var recur = function(n) {
        var result = meno[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            meno[n] = result;
        }
        return result;
    };
    return recur;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> memoizer = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mome, formula)</span> </span>{
    <span class="hljs-keyword">var</span> recur = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(n)</span> </span>{
        <span class="hljs-keyword">var</span> result = meno[n];
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> result !== <span class="hljs-string">'number'</span>) {
            result = formula(recur, n);
            meno[n] = result;
        }
        <span class="hljs-keyword">return</span> result;
    };
    <span class="hljs-keyword">return</span> recur;
}</code></pre>
<p>再用这个<code>memoizer</code>函数来定义<code>fibonacci</code>函数，提供其初始的<code>memo</code>数组和<code>formula</code>函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fibonacci = memoizer([0,1],function(recur, n){
    return recur(n-1) + recur (n-2);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var fibonacci = memoizer([<span class="hljs-number">0</span>,<span class="hljs-number">1</span>],function(<span class="hljs-name">recur</span>, n){
    return recur(<span class="hljs-name">n-1</span>) + recur (<span class="hljs-name">n-2</span>)<span class="hljs-comment">;</span>
})</code></pre>
<p>极大的减少了我们的工作量。例如要产生一个记忆的阶乘函数，只需要提供基本的阶乘公式即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var factorial = meoizer([1,1], function(recur, n){
    return n * recur(n-1);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> factorial = meoizer([<span class="hljs-number">1</span>,<span class="hljs-number">1</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(recur, n)</span></span>{
    <span class="hljs-keyword">return</span> n * recur(n<span class="hljs-number">-1</span>);
});</code></pre>
<h3 id="articleHeader4">第5章 继承</h3>
<p><strong>伪类</strong><br><code>JavaScript</code>的原型存在诸多矛盾。它不直接让对象从其他对象继承，反而插入了一个多余的间接层：通过构造器函数产生对象。<br><code>Function</code>构造器产生的函数对象会运行类似这样的一些代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.prototype =  {constructor:this}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.prototype =  {<span class="hljs-keyword">constructor</span>:<span class="hljs-keyword">this</span>}</code></pre>
<p>新函数对象被赋予一个<code>prototype</code>属性，这个<code>prototype</code>对象是存放继承特征的地方。</p>
<p>当采用构造器调用模式，即用<code>new</code>前缀去调用一个函数时，函数执行的方式会被修改。如果<code>new </code>运算符是一个方法而不是一个运算符，它可能像这样执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.method('new',function(){
    // 创建一个新对象，它继承自构造器函数的原型对象。
    var that = Object.create(this.prototype);
    // 调用构造器函数，绑定 -this- 到新对象上。
    var other = this.apply(that,arguments);
    // 如果它的返回值不是一个对象，就返回该新对象。
    return (typeof other === 'object' &amp;&amp; other) || that;
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.method(<span class="hljs-string">'new'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 创建一个新对象，它继承自构造器函数的原型对象。</span>
    <span class="hljs-keyword">var</span> that = <span class="hljs-built_in">Object</span>.create(<span class="hljs-keyword">this</span>.prototype);
    <span class="hljs-comment">// 调用构造器函数，绑定 -this- 到新对象上。</span>
    <span class="hljs-keyword">var</span> other = <span class="hljs-keyword">this</span>.apply(that,<span class="hljs-built_in">arguments</span>);
    <span class="hljs-comment">// 如果它的返回值不是一个对象，就返回该新对象。</span>
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">typeof</span> other === <span class="hljs-string">'object'</span> &amp;&amp; other) || that;
});
</code></pre>
<p>所有构造器函数都约定命名成大写字母。一种更好的备选方案就是根本不使用<code>new</code>。<br><strong>对象说明符</strong><br>就是指传多个参数时，可以直接传递一个对象。<br><strong>原型</strong><br>可以用<code>Object.create</code>方法构造出更多实例来。<br><strong>函数化</strong><br>迄今为止，我们所看到的继承模式的一个弱点就是没法保护隐私。对象的所有属性都是可见的。我们无法得到私有变量和私有函数。<br>幸运的是，我们有一个更好的选择，那就是<strong>应用模块模式</strong>。<br>我们从构造一个生成对象的函数开始。我们以小写字母开头来命名。<br>该函数包括以下四个步骤<br>1、创建一个新对象。<br>2、有选择地私有实例变量和方法。<br>3、给这个新对象扩充方法。<br>4、返回那个新对象。<br>以下是一个函数化构造器的伪代码模板</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var constructor = function (spec, my) {
    var that, 其他的私有实例变量；
    my = my || {};
    把共享的变量和函数添加到my中
    that = 一个新对象
    添加给 that 的特权方法
    return that;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">constructor</span> = <span class="hljs-title">function</span> <span class="hljs-params">(spec, my)</span> <span class="hljs-comment">{
    var that, 其他的私有实例变量；
    my = my || {}</span>;</span>
    把共享的变量和函数添加到my中
    that = 一个新对象
    添加给 that 的特权方法
    return that;
}</code></pre>
<p>函数化模式有很大的灵活性。它相比伪类模式不仅带来的工作更少，还让我们更好的封装和信息隐藏，以及访问父类方法的能力。<br><strong>部件</strong><br>我们可以从一套部件中把对象组装出来。</p>
<h3 id="articleHeader5">第6章 数组</h3>
<p>数组是一段线性分配的内存，它通过整数计算偏移并访问其中的元素。<br>数组是一种性能出色的数据结构。不幸的是，<code>JavaScript</code>没有像此类数组一样的数据结构。<br><strong>数组字面量</strong><br>对象字面量<br>数组继承了<code>Array.prototype</code>大量有用的方法。而对象字面量是继承自<code>Object.prototype</code>。<br>数组有<code>length</code>属性，而对象没有。<br><strong>长度</strong><br>每个数组都有一个<code>length</code>属性。<br>可以直接设置<code>length</code>的值。设置更大的length不会给数组分配更多的空间，而设小导致所有下标大于等于新length的属性被删除。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
arr.length = 1;
console.log(arr) // [1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
arr.length = <span class="hljs-number">1</span>;
console.log(arr) <span class="hljs-comment">// [1]</span></code></pre>
<p>也可以通过<code>length</code>来通过添加值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
arr[arr.length] = 4;
console.log(arr) // [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
arr[arr.length] = <span class="hljs-number">4</span>;
console.log(arr) <span class="hljs-comment">// [1,2,3,4]</span></code></pre>
<p>有时用<code>push</code>方法更方便。<br><strong>删除</strong><br>由于<code>JavaScript</code>的数组也是对象，所以<code>delete</code>运算符可以用来从数组中移出元素。移除后，长度不变，原位置上变成了<code>undefined</code>。<br>可以使用<code>Array.prototype.splice</code>方法删除数组。<br><strong>枚举</strong><br>JS数组就是对象，所以<code>for in</code>语句可以用来遍历数据的所有属性。<br><strong>不过</strong>，<code>for in</code>无法保证属性顺序。并且可能从原型链中得到意外的属性。<br><code>for</code>循环可以避免以上问题。<br><strong>容易混淆的地方</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof [] === &quot;object&quot;; // true
typeof {} === &quot;object&quot;; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">typeof</span> [] === <span class="hljs-string">"object"</span>; <span class="hljs-comment">// true</span>
<span class="hljs-keyword">typeof</span> {} === <span class="hljs-string">"object"</span>; <span class="hljs-comment">// true</span></code></pre>
<p>识别是否是数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法一、
var is_array = function (value) {
  return value &amp;&amp; typeof value === 'object' &amp;&amp; value.constructor === Array;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">// 方法一、</span>
var <span class="hljs-keyword">is</span><span class="hljs-number">_</span>array = <span class="hljs-keyword">function</span> (<span class="hljs-keyword">value</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> &amp;&amp; typeof <span class="hljs-keyword">value</span> === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">value</span>.constructor === Array;
};</code></pre>
<p>但它在识别从不同窗口（window）或帧（frame）里的构造的数组时会失败。<br>有一个更好的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法二、
var is_array = function (value) {
  return Object.prototype.toString.apply(value) === '[object Array]';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 方法二、</span>
<span class="hljs-keyword">var</span> is_array = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.apply(value) === <span class="hljs-string">'[object Array]'</span>;
}</code></pre>
<p><strong>扩展</strong>：<br>ES5 提供了Array.isArray()的方法。不过兼容性是IE9+。<br>要做到兼容，可以用如下方法。MDN上提供的。<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray" rel="nofollow noreferrer" target="_blank">MDN Array.isArray</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法三、
if (!Array.isArray){
  Array.isArray = function(arg){
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 方法三、</span>
<span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray){
  <span class="hljs-built_in">Array</span>.isArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg) === <span class="hljs-string">'[object Array]'</span>;
  };
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [];
// 方法四
arr instanceof Array;
// 方法五
Array.prototype.isPrototypeOf(arr);
// 方法六
Object.getPrototypeOf(arr) === Array.prototype;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [];
<span class="hljs-comment">// 方法四</span>
arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>;
<span class="hljs-comment">// 方法五</span>
<span class="hljs-built_in">Array</span>.prototype.isPrototypeOf(arr);
<span class="hljs-comment">// 方法六</span>
<span class="hljs-built_in">Object</span>.getPrototypeOf(arr) === <span class="hljs-built_in">Array</span>.prototype;</code></pre>
<p>方法四、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof" rel="nofollow noreferrer" target="_blank"><strong>instanceof</strong> 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。</a><br>方法五、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf" rel="nofollow noreferrer" target="_blank"><strong>isPrototypeOf()</strong> 方法用于测试一个对象是否存在于另一个对象的原型链上。</a><br>方法六、[<strong>Object.getPrototypeOf()</strong> 方法返回指定对象的原型（即, 内部[[Prototype]]属性的值）。](<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>小结：除了方法二、三外，面对复杂的环境，其他的都不能准确的判断是否是数组。<br><strong>方法</strong><br><code>JavaScript</code>提供了一套数组可用的方法，这些方法是被存储在Array.prototype中的函数。<br><code>Object.prototype</code>是可以扩充的。<br><code>Array.prototype</code>也是可以扩充的。<br><code>ES5</code>中提供的<code>Object.create</code>方法。这方法用在数组是没有意义的，因为它产生的是一个对象，而不是一个数组，产生的对象将继承这个数组的值和方法，但它没有<code>length</code>特殊属性。<br><strong>指定初始值</strong><br><code>JavaScript</code>的数组通常不会预设值。书中写了一个循环来扩展，生成初始值。<br><strong>扩展：</strong><code>ES6</code>中提供了<code>fill</code>来填充。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="['a','b','c'].fill(0);   // [0,0,0]
new Array(3).fill(0);   // [0,0,0]

// fill方法还可以接受第二、第三个参数，用于指定填充的起始位置和结束位置（不包含）。
new Array(3).fill(0,1,2); // [ ,0, ,]  空位不是undefined。空位没有任何值。ES6则是明确将空位转为undefined。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>[<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>].<span class="hljs-built_in">fill</span>(<span class="hljs-number">0</span>);   <span class="hljs-comment">// [0,0,0]</span>
<span class="hljs-keyword">new</span> <span class="hljs-keyword">Array</span>(<span class="hljs-number">3</span>).<span class="hljs-built_in">fill</span>(<span class="hljs-number">0</span>);   <span class="hljs-comment">// [0,0,0]</span>

<span class="hljs-comment">// fill方法还可以接受第二、第三个参数，用于指定填充的起始位置和结束位置（不包含）。</span>
<span class="hljs-keyword">new</span> <span class="hljs-keyword">Array</span>(<span class="hljs-number">3</span>).<span class="hljs-built_in">fill</span>(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>); <span class="hljs-comment">// [ ,0, ,]  空位不是undefined。空位没有任何值。ES6则是明确将空位转为undefined。</span></code></pre>
<h3 id="articleHeader6">第7章 正则表达式</h3>
<p>正则表达式对字符串中的信息实现查找、替换和提取操作。<br>可处理正则表达式的方法有<code>regexp.exec</code>、<code>regexp.test</code>、<code>string.match</code>、<code>string.search</code>和<code>string.split</code>。通常来说，正则相较于等效的字符串处理有着显著的性能优势。</p>
<p><strong>一个例子</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正则表达式必须写在一行中
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = &quot;http://www.ora.com:80/goodparts?q#fragment&quot;;
var result = parse_url.exec(url);
// ……" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// 正则表达式必须写在一行中</span>
var parse_url = /^<span class="hljs-comment">(?:([A-Za-z]+)</span>:)?<span class="hljs-comment">(\/{0,3})</span><span class="hljs-comment">([0-9.\-A-Za-z]+)</span><span class="hljs-comment">(?::(\d+)</span>)?<span class="hljs-comment">(?:\/([^?#]*)</span>)?<span class="hljs-comment">(?:\?([^#]*)</span>)?<span class="hljs-comment">(?:#(.*)</span>)?$/;
var url = <span class="hljs-string">"http://www.ora.com:80/goodparts?q#fragment"</span>;
var result = parse_url.exec<span class="hljs-comment">(url)</span>;
<span class="hljs-comment">// ……</span></code></pre>
<p>依次匹配到的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url: 'http://www.ora.com:80/goodparts?q#fragment',
scheme: 'http',
slash: '//'
host: 'www.ora.com'
port:'80'
path:'goodparts'
query: 'q'
hash: 'fragment'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">url:</span> <span class="hljs-string">'http://www.ora.com:80/goodparts?q#fragment'</span>,
<span class="hljs-string">scheme:</span> <span class="hljs-string">'http'</span>,
<span class="hljs-string">slash:</span> <span class="hljs-string">'//'</span>
<span class="hljs-string">host:</span> <span class="hljs-string">'www.ora.com'</span>
<span class="hljs-string">port:</span><span class="hljs-string">'80'</span>
<span class="hljs-string">path:</span><span class="hljs-string">'goodparts'</span>
<span class="hljs-string">query:</span> <span class="hljs-string">'q'</span>
<span class="hljs-string">hash:</span> <span class="hljs-string">'fragment'</span></code></pre>
<p>个人扩展：这里推荐 <a href="https://regex101.com/" rel="nofollow noreferrer" target="_blank">在线测试正则表达式的网站regex101</a>，默认是PHP语言，选择JavaScript语言。<br><a href="https://regexper.com/#%5Cd%2B" rel="nofollow noreferrer" target="_blank">在线图形化RegExp工具</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec" rel="nofollow noreferrer" target="_blank">MDN RegExp.prototype.exec()</a><br>大概解释下这个正则，<br>这里的<code>^</code> 起始位置，<code>$</code>结束位置<br><code>()</code> 分组捕获 <code>?:</code>不捕获<br><code>.</code>表示除换行以外的任意单个字符，对于码点大于<code>0xFFFF</code>的<code>Unicode</code>字符，点(<code>.</code>)不能识别（<code>ES6</code>中加<code>u</code>修饰符才可识别），<code>+</code>表示一个或多个，<code>*</code>表示零个或多个，<code>?</code>表示<code>0</code>个或一个。[]表示或者，里面符合一个即可。<br><code>\d</code>表示数字<code>0-9</code>。<br>不严谨的正则表达式是一个常见的安全漏洞的发源地。在执行某些匹配时，嵌套的正则表达式也能导致极其恶劣的性能问题。因此简单是最好的策略。</p>
<p>再看一个 <strong>匹配数字</strong>的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
parse_number.test('1'); // true
parse_number.test('number'); // false
parse_number.test('98.6'); // true
parse_number.test('132.21.86.100'); // false
parse_number.test('123.45E-67'); // true
parse_number.test('123.45D-67'); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>var parse_number = <span class="hljs-regexp">/^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i</span>;
parse_number.test(<span class="hljs-string">'1'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
parse_number.test(<span class="hljs-string">'number'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>
parse_number.test(<span class="hljs-string">'98.6'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
parse_number.test(<span class="hljs-string">'132.21.86.100'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>
parse_number.test(<span class="hljs-string">'123.45E-67'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
parse_number.test(<span class="hljs-string">'123.45D-67'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span></code></pre>
<p><strong>结构</strong><br>有两个方法来创建一个<code>RegExp</code>对象。优先考虑的是正则表达式字面量，还有一种方式是<code>new RegExp('','g')</code>。<br>正则表达式标识：<code>g</code>全局(匹配多次，不同的方法对<code>g</code>标识的处理防范各不相同)，<code>i</code>忽略大小写。<code>m</code>多行<br><strong>元素</strong><br><strong>正则表达式分支</strong><br><code>|</code>表示或，也表示分支 比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'info'.match(/in|int/)  // 匹配成功，[&quot;in&quot;, index: 0, input: &quot;info&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">'info'</span>.<span class="hljs-keyword">match</span>(/in|<span class="hljs-keyword">int</span>/)  // 匹配成功，[<span class="hljs-string">"in"</span>, <span class="hljs-built_in">index</span>: <span class="hljs-number">0</span>, inpu<span class="hljs-variable">t:</span> <span class="hljs-string">"info"</span>]</code></pre>
<p><strong>正则表达式序列</strong><br>一个正则表达式序列饱和一个或多个正则表达式因子。每一个因子能选择是否跟随一个量词，这个量词决定着这个因子被允许出现的次数，若没指定，这个因子则只匹配一次。<br><strong>正则表达式因子</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="\ / [ ] () { } ? + * | . ^ $" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">\ / [ ] () { } ? + * <span class="hljs-string">| . ^ $</span></code></pre>
<p><strong>正则表达式转义</strong><br><code>\</code> 表转义 <code>\f</code> 分页 <code>\n</code> 换行 <code>\r</code>回车 <code>\t</code> 制表<br><code>\u</code> 允许制定一个 Unicode 字符来表示一个十六进制的常量。<br><code>\d</code> 等同于[0-9] D 取反等同于 <code>[^0-9]</code><br><code>\s</code> <code>Unicode</code> 空白符一个不完全子集。 S 与s相反<br><code>\w</code> <code>[0-9A-Z_a-z]</code> W 与其相反 <code>[^0-9A-Z_a-z]</code><br><code>\b</code> 表示 字边界<br><code>\1</code> 表示 分组1所捕获的文本的一个引用，所以它能被再次匹配。<br><code>\2</code> 表示 指向分组2的引用，<code>\3</code> 是表示分组3的引用，以此类推。<br><strong>正则表达式分组</strong><br>捕获型 ()<br>非捕获型<code>?:</code><br>向前正向匹配<code>?=</code><br>有一个<code>(?=</code>前缀。它类似于非捕获类型分组，但在这个组匹配后，文本会倒回到它它开始的地方，实际上并不匹配任何东西。也可以理解为匹配位置。<br>向后负向匹配<br>有一个<code>(?!</code>前缀。它类似于向前正向匹配分组，但只有当它匹配失败时它才继续向前进行匹配。这不是一个好的特性。<br><strong>正则表达式字符集</strong><br>正则表达式字符集是一种指定一组字符的便利方式。例如，要匹配一个元音字母，<code>(?:a|e|i|o|u)</code>,可以方便的写成<code>[aeiou]</code>。<br>类提供另外两个便利：①指定字符范围<br>所以，一组由<code>32</code>个<code>ASCII</code>的特殊组合，可以写成<code>[!-\/:-@\[-</code>{-~]` <br>②类的取反<br>取反</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[^!-\/:-@\[-`{-~]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-name">^!-</span>\/:-@\[<span class="hljs-name"><span class="hljs-builtin-name">-</span></span>`{-~]</code></pre>
<p><strong>正则表达式字符转义</strong><br>字符类内部的转义规则和正则表达式因子的相比稍有不同。下面是在字符类中需要被转义的特殊字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- / [ \ ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">- / <span class="hljs-string">[ \ ]</span></code></pre>
<p><strong>正则表达式量词</strong><br>量词后缀决定正则表达式因子应该被匹配的次数。<br><code>{3}</code>三次<br><code>{3,6}</code> 3、4、5、6次<br><code>{3,}</code>3次或更多次<br><code>?</code>等同于<code>{0,1}</code>，<code>*</code>等同于<code>{0,}</code>，<code>+</code>等同于<code>{1,}</code>。</p>
<h3 id="articleHeader7">第8章 方法</h3>
<h4>Array</h4>
<p><strong>array.concat(item...)</strong><br><code>concat</code> 方法产生一个新数组，它包含一份<code>array</code>的浅复制并把一个或多个参数<code>item</code>附加在其后。如果<code>item</code>是数组，那么每个元素分别被添加。后面有和它功能类似的<code>array.push(item...)</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = ['a','b','c'];
var b = ['x','y','z'];
var c = a.concat(b, true);
// c => ['a','b','c','x','y','z',true]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cal"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];
<span class="hljs-keyword">var</span> b = [<span class="hljs-string">'x'</span>,<span class="hljs-string">'y'</span>,<span class="hljs-string">'z'</span>];
<span class="hljs-keyword">var</span> c = a.concat(b, <span class="hljs-literal">true</span>);
// c =&gt; [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>,<span class="hljs-string">'x'</span>,<span class="hljs-string">'y'</span>,<span class="hljs-string">'z'</span>,<span class="hljs-literal">true</span>]</code></pre>
<p><strong>扩展：</strong> <code>ES6</code> 有更便捷的扩展运算符<code>...</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = ['a','b','c'];
var b = ['x','y','z'];
var c = [...a,true,...b];   // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, true, &quot;x&quot;, &quot;y&quot;, &quot;z&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cal"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];
<span class="hljs-keyword">var</span> b = [<span class="hljs-string">'x'</span>,<span class="hljs-string">'y'</span>,<span class="hljs-string">'z'</span>];
<span class="hljs-keyword">var</span> c = [...a,<span class="hljs-literal">true</span>,...b];   // [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-literal">true</span>, <span class="hljs-string">"x"</span>, <span class="hljs-string">"y"</span>, <span class="hljs-string">"z"</span>]</code></pre>
<p><strong>array.join(separator)</strong><br><code>join</code>方法把一个<code>array</code>构造成一个字符串。<br><code>separator</code> 默认值就是逗号<code>','</code>。<br>如果你想把大量的字符串片段组装成一个字符串，把这些片段放在一个数组中，并用<code>join</code>方法连接起来通常比用<code>+</code>元素运算符连接起来要快。</p>
<blockquote>译注：对于<code>IE6/7</code>，使用join连接大量字符串效率确实优于加号运算符。但目前主流浏览器，包括<code>IE8</code>以后的版本，都对<code>+</code>元素运算符连接字符串做了优化，性能已经显著高于<code>Array.join()</code>。所以目前大多数情况下，建议首选使用+ 连接字符串。更多参看《高性能网站建设进阶指南》中字符串优化相关章节。</blockquote>
<p><strong>array.pop()</strong><br><code>pop</code>方法移除<code>array</code>中的最后一个元素，并返回这个元素。如果<code>array</code>为空，则返回<code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = ['a','b','c'];
var c = a.pop(); // a 是 ['a','b']  c是 'c'
// pop 可以像这样实现。
// 这里的 Array.method()在第一章例子中已经定义了，并且贯穿全书。其实就是相当于Array.prototype
Array.method('pop', function () {
    return this.splice(this.length-1,1)[0];
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];
<span class="hljs-keyword">var</span> c = a.pop(); <span class="hljs-comment">// a 是 ['a','b']  c是 'c'</span>
<span class="hljs-comment">// pop 可以像这样实现。</span>
<span class="hljs-comment">// 这里的 Array.method()在第一章例子中已经定义了，并且贯穿全书。其实就是相当于Array.prototype</span>
<span class="hljs-built_in">Array</span>.method(<span class="hljs-string">'pop'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.splice(<span class="hljs-keyword">this</span>.length<span class="hljs-number">-1</span>,<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
});</code></pre>
<p><strong>array.push(item...)</strong><br>与<code>concat</code>不同的是，它会修改array，如果参数<code>item</code>是数组，它会把参数数组作为单个元素整个添加到数组中。并返回这个<code>array</code>的新长度值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = [4,5,6];
var c = a.push(b,true);
// a 是 [1,2,3,[4,5,6],true]
// c 是 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var b = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
var c = a.push(b,true);
<span class="hljs-comment">// a 是 [1,2,3,[4,5,6],true]</span>
<span class="hljs-comment">// c 是 5</span></code></pre>
<p><code>push</code>可以像这样实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.method('push', function () {
  this.splice.apply(
  this,
  [this.length,0].
  concat(Array.prototype.slice.apply(arguments)));
  return this.length;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.method(<span class="hljs-string">'push'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.splice.apply(
  <span class="hljs-keyword">this</span>,
  [<span class="hljs-keyword">this</span>.length,<span class="hljs-number">0</span>].
  concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>)));
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length;
});</code></pre>
<p><strong>array.reverse()</strong><br><code>reverse</code>反转<code>array</code>元素顺序，并返回<code>array</code>本身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.reverse();
// a 和 b都是 [3,2,1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var b = a.reverse();
<span class="hljs-comment">// a 和 b都是 [3,2,1]</span></code></pre>
<p><strong>array.shift()</strong><br><code>shift</code>移除<code>array</code>的第一个元素并返回这个元素。如果<code>array</code>为空，则返回<code>undefined</code>。<code>shift</code>通常比<code>pop</code>慢的多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var c = a.shift(); // a 是[2,3] , c 是1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var c = a.shift(); <span class="hljs-comment">// a 是[2,3] , c 是1</span></code></pre>
<p><code>shift</code>可以这样实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.method('shift', function(){
    return this.splice(0,1)[0];
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.method(<span class="hljs-string">'shift'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.splice(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
});</code></pre>
<p><strong>array.slice(start[, end])</strong><br><code>slice</code>是对<code>array</code>中的一段做浅复制。<code>end</code>是可选的。默认是<code>array.length</code>,如果两个参数任何一个是负数，<code>array.length</code>会和相加。如果<code>start</code>大于<code>array.length</code>,获得一个<code>[]</code>,字符串也有<code>Sting.slice</code>这个同名方法。<br><strong>array.sort</strong><br>默认不能给一组数字排序。默认把要被排序的元素都视为字符串。<br>幸运的是，可以使用自己的比较函数替换默认的比较函数。<br>比较函数应该接受两个参数，并且如果这两个参数相等则返回0，如果第1个参数应该排列在前面，则返回一个负数，如果第二个参数应该排列在前面，则返回一个正数。<br><code>sort</code>方法是不稳定的。<code>JavaScript</code>的<code>sort</code>方法的稳定性根据不同浏览器的实现而不一致。<br>可参见<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" rel="nofollow noreferrer" target="_blank">MDN sort</a><br><strong>array.splice(start, deleteCount,item...)</strong><br><code>splice</code>方法从array中移除一个或多个元素，并用新的<code>item</code>替换它们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// splice 可以像这样实现
Array.method('splice',function (start, deleteCount) {
    var max = Math.max,
        min = Math.min,
        delta,
        element,
        insertCount = max(arguments.length - 2, 0),
        k = 0,
        len = this.length,
        new_len,
        result = [],
        shift_count;
    start = start || 0;
    if (start < 0) {
        start += len;
    }
    start = max(min(start, len), 0);
    deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0);
    delta = insertCount - deleteCount;
    new_len = len + delta;
    while (k < deleteCount) {
        element = this[start + k];
        if (element !== undefined) {
            result[k] = element;
        }
        k += 1;
    }
    shift_count = len - start - deleteCount;
    if (delta < 0) {
        k = start + insertCount;
        while (shift_count) {
            this[k] = this[k - delta];
            k += 1;
            shift_count -= 1;
        }
        this.length = new_len;
    } else if (delta > 0) {
        k = 1;
        while (shift_count) {
            this[new_len - k] = this[len - k];
            k += 1;
            shift_count -= 1;
        }
        this.length = new_len;
    }
    for (k = 0; k < insertCount; k += 1) {
        this[start + k] = arguments[k + 2];
    }
    return result;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// splice 可以像这样实现</span>
<span class="hljs-keyword">Array</span>.method(<span class="hljs-string">'splice'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(start, deleteCount) {
    <span class="hljs-keyword">var</span> max = Math.max,
        min = Math.min,
        delta,
        element,
        insertCount = max(arguments.length - <span class="hljs-number">2</span>, <span class="hljs-number">0</span>),
        k = <span class="hljs-number">0</span>,
        len = <span class="hljs-built_in">this</span>.length,
        <span class="hljs-keyword">new</span><span class="hljs-type">_len</span>,
        result = [],
        shift_count;
    start = start || <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (start &lt; <span class="hljs-number">0</span>) {
        start += len;
    }
    start = max(min(start, len), <span class="hljs-number">0</span>);
    deleteCount = max(min(typeof deleteCount === <span class="hljs-string">'number'</span> ? deleteCount : <span class="hljs-type">len</span>, len - start), <span class="hljs-number">0</span>);
    delta = insertCount - deleteCount;
    <span class="hljs-keyword">new</span><span class="hljs-type">_len</span> = len + delta;
    <span class="hljs-keyword">while</span> (k &lt; deleteCount) {
        element = <span class="hljs-built_in">this</span>[start + k];
        <span class="hljs-keyword">if</span> (element !== undefined) {
            result[k] = element;
        }
        k += <span class="hljs-number">1</span>;
    }
    shift_count = len - start - deleteCount;
    <span class="hljs-keyword">if</span> (delta &lt; <span class="hljs-number">0</span>) {
        k = start + insertCount;
        <span class="hljs-keyword">while</span> (shift_count) {
            <span class="hljs-built_in">this</span>[k] = <span class="hljs-built_in">this</span>[k - delta];
            k += <span class="hljs-number">1</span>;
            shift_count -= <span class="hljs-number">1</span>;
        }
        <span class="hljs-built_in">this</span>.length = <span class="hljs-keyword">new</span><span class="hljs-type">_len</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (delta &gt; <span class="hljs-number">0</span>) {
        k = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">while</span> (shift_count) {
            <span class="hljs-built_in">this</span>[<span class="hljs-keyword">new</span><span class="hljs-type">_len</span> - k] = <span class="hljs-built_in">this</span>[len - k];
            k += <span class="hljs-number">1</span>;
            shift_count -= <span class="hljs-number">1</span>;
        }
        <span class="hljs-built_in">this</span>.length = <span class="hljs-keyword">new</span><span class="hljs-type">_len</span>;
    }
    <span class="hljs-keyword">for</span> (k = <span class="hljs-number">0</span>; k &lt; insertCount; k += <span class="hljs-number">1</span>) {
        <span class="hljs-built_in">this</span>[start + k] = arguments[k + <span class="hljs-number">2</span>];
    }
    <span class="hljs-keyword">return</span> result;
});</code></pre>
<p><strong>array.unshift(item...)</strong><br><code>unshift</code> 方法像<code>push</code>方法一样，不过是用于把元素添加到数组的开始部分，返回新<code>array</code>的<code>length</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// unshift 可以像这样实现
Array.method('unshift', function(){
    this.splice.apply(this,
    [0,0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// unshift 可以像这样实现</span>
<span class="hljs-built_in">Array</span>.method(<span class="hljs-string">'unshift'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.splice.apply(<span class="hljs-keyword">this</span>,
    [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>].concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>)));
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length;
});</code></pre>
<h4>Function</h4>
<p><strong>function.apply(thisArg,argArray)</strong><br><code>apply</code>方法调用<code>function</code>,传递一个会被绑定到<code>this</code>上的对象和一个可选的数组作为参数。</p>
<h4>Number</h4>
<p><strong>number.toExponential(fractionDigits)</strong><br><code>toExponential</code>方法 把这个<code>number</code>转换成一个指数形式的字符串。可选参数控制其小数点后的数字位数。它的值必须在<code>0~20</code>。</p>
<p><strong>number.toFixed(fractionDigits)</strong><br><code>toFixed</code>方法把这个number转换成一个十进制数形式的字符串。可选参数控制其小数点后的数字位数。它的值必须在0~20。</p>
<p><strong>number.toPrecision(precision)</strong><br><code>toPrecision</code>方法把这个<code>number</code>转换成一个十进制数形式的字符串。可选参数控制数字的精度。它的值必须在<code>0~21</code>。</p>
<p><strong>number.toString(radix)</strong><br>把<code>number</code>转换成字符串。可选参数控制基数。它的值必须是<code>2~36</code>。默认的<code>radix</code>是以<code>10</code>为基数的。<code>radix</code>参数最常用的是整数，但是它可以用任意的数字。</p>
<h4>Object</h4>
<p><strong>object.hasOwnProperty(name)</strong><br>如果这个<code>object</code>包含名为<code>name</code>的属性，那么返回<code>true</code>。原型链中的同名方法不会被检测。这个方法对<code>name</code>就是<code>“hasOwnProperty”</code>时不起作用。</p>
<h4>RegExp</h4>
<p><strong>regexp.exec(string)</strong><br><code>exec</code>是正则中最强大(和最慢）的方法。<br>如果成功匹配，它会返回一个数组。下标为0 的元素包含正则匹配的子字符串。下标为1的则是分组1捕获的文本。下标为2的则是分组2捕获的文本。以此类推。如果匹配失败则返回<code>null</code>。<br><strong>regexp.test(string)</strong><br><code>test</code>是最简单(和最快)的方法。匹配成功，返回<code>true</code>,否则返回<code>false</code>。不要对这个方法使用<code>g</code>标识。<br>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\w+/g;
reg.test('ab'); // true
// 再执行一遍就是false了。
reg.test('ab'); // false
// 再执行一遍就是true了。
reg.test('ab'); // true
// 再执行一遍又是false了，如此反复，所以用g标识后，看起来很诡异。因为每次匹配开始位置变了。
reg.test('ab'); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\w+/<span class="hljs-keyword">g</span>;
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>('ab'); <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 再执行一遍就是false了。</span>
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>('ab'); <span class="hljs-comment">// false</span>
<span class="hljs-comment">// 再执行一遍就是true了。</span>
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>('ab'); <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 再执行一遍又是false了，如此反复，所以用g标识后，看起来很诡异。因为每次匹配开始位置变了。</span>
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>('ab'); <span class="hljs-comment">// false</span></code></pre>
<p><code>test</code>可以像这样实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="RegExp.method('test', function(string){
    return this.exec(string) !== null;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">RegExp</span>.method(<span class="hljs-string">'test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.exec(<span class="hljs-built_in">string</span>) !== <span class="hljs-literal">null</span>;
});</code></pre>
<h4>String</h4>
<p><strong>string.charAt(pos)</strong><br>返回在<code>string</code>中的<code>pos</code>位置处的字符。</p>
<p><strong>string.charCodeAt(pos)</strong><br>与<code>charAt</code>一样，不过返回整数形式表示字符码位。</p>
<p><strong>string.concat(string)</strong><br>很少用，用<code>+</code>号运算符更方便。</p>
<p><strong>string.indexOf(searchString,position)</strong><br>在<code>string</code>中查找第一个参数，如果被找到返回该字符的位置，否则返回<code>-1</code>。<code>position</code>可设置指定位置开始查找。</p>
<p><strong>string.lastIndexOf(searchString,position)</strong><br><code>lastIndexOf</code> 方法和<code>indexOf</code>方法类似，不过它是从末尾开始查找，不是从头开始。</p>
<p><strong>string.localeCompare(that)</strong><br>比较两个字符串。类似于<code>array.sort</code>。</p>
<p><strong>string.match(regexp)</strong><br>如果没有<code>g</code>标识，那么调用<code>string.match(regexp)</code>和调用<code>regexp.exec(string)</code>结果相同。如果带有<code>g</code>标识，那么它生成一个包含所有匹配（除捕获分组之外）的数组。</p>
<p><strong>string.replace(searchValue,replaceValue)</strong><br>对<code>string</code>进行查找和替换操作，并返回一个新的字符串。参数<code>searchvalue</code>可以是一个字符串也可以是一个正则表达式对象。参数<code>replaceValue</code>可以是一个字符串或一个函数。</p>
<p><strong>string.search(regexp)</strong><br>和<code>indexOf</code>类似，不过它接收正则为参数。</p>
<p><strong>string.slice(start, end)</strong><br><code>slice</code>方法复制<code>string</code>的一部分来构造一个新的字符串。如果<code>start</code>参数是负数，它将与<code>string.length</code>相加。<code>end</code>参数是可选的。</p>
<p><strong>string.split(separator,limit)</strong><br>把<code>string</code>分割成片段来创建一个字符串数组。可选参数<code>limit</code>可以限制分割的片段数量。<code>separator</code>参数可以是字符串或者正则。<br><strong>string.substring(start,end)</strong><br>与<code>slice</code>方法一样，不过它不能处理负数参数。<br><strong>string.toLocaleLowerCase()</strong><br>它使用本地化的规则把这个<code>string</code>中的字母转换成小写格式。这个方法主要用在土耳其语上。<br><strong>string.toLocaleUpperCase()</strong><br>它使用本地化的规则把这个<code>string</code>中的字母转换成大写格式。这个方法主要用在土耳其语上。<br><strong>string.toLowerCase()</strong><br>返回新字符串，所有字母转成小写格式。<br><strong>string.toUpperCase()</strong><br>返回新字符串，所有字母转成大写格式。<br><strong>String.fromCharCode(char...)</strong><br>根据一串数字编码返回一个字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = String.fromCharCode(67,97,116) // a是'Cat'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = String.fromCharCode(<span class="hljs-number">67</span>,<span class="hljs-number">97</span>,<span class="hljs-number">116</span>) <span class="hljs-comment">// a是'Cat'</span></code></pre>
<h3 id="articleHeader8">第9章 代码风格</h3>
<p>这一章中，简短的说了一些代码风格。事实证明代码风格在编程中是很重要的。</p>
<h3 id="articleHeader9">第10章 优美的特性</h3>
<p>精简的<code>JavaScript</code>里都是好东西。<br>包括：1、函数是顶级对象；2、基于原型继承的动态作用域；3、对象字面量和数组字面量。</p>
<p>到此，读书笔记已完结。文章有什么不妥之处，欢迎指出~</p>
<h3 id="articleHeader10">关于</h3>
<p>作者：常以<strong>轩辕Rowboat</strong>为名混迹于江湖。前端路上 | PPT爱好者 | 所知甚少，唯善学。<br><a href="https://lxchuan12.github.io/" rel="nofollow noreferrer" target="_blank">个人博客</a><br><a href="https://segmentfault.com/u/lxchuan12">segmentfault个人主页</a><br><a href="https://juejin.im/user/57974dc55bbb500063f522fd/posts" rel="nofollow noreferrer" target="_blank">掘金个人主页</a><br><a href="https://www.zhihu.com/people/lxchuan12/activities" rel="nofollow noreferrer" target="_blank">知乎</a><br><a href="https://github.com/lxchuan12" rel="nofollow noreferrer" target="_blank">github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《JavaScript语言精粹 修订版》 读书笔记

## 原文链接
[https://segmentfault.com/a/1190000010313101](https://segmentfault.com/a/1190000010313101)


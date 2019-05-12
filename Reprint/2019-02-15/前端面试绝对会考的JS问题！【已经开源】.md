---
title: '前端面试绝对会考的JS问题！【已经开源】' 
date: 2019-02-15 2:30:44
hidden: true
slug: rj5gbcdbqpe
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">写在前面</h3>
<p>【前端指南】前端面试库已经开源，正在完善之中</p>
<ul>
<li>[x] <a href="https://github.com/nanhupatar/FEGuide/blob/master/CSS%E9%97%AE%E9%A2%98/css.md" rel="nofollow noreferrer" target="_blank">css问题</a>
</li>
<li>[x] <a href="https://github.com/nanhupatar/FEGuide/blob/master/HTML%E9%97%AE%E9%A2%98/html.md" rel="nofollow noreferrer" target="_blank">html问题</a>
</li>
<li>[x] <a href="https://github.com/nanhupatar/FEGuide/blob/master/javascript%E9%97%AE%E9%A2%98/javascript.md" rel="nofollow noreferrer" target="_blank">javascript问题</a>
</li>
</ul>
<p>github地址   <a href="https://github.com/nanhupatar/FEGuide" rel="nofollow noreferrer" target="_blank">https://github.com/nanhupatar...</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016717265?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000016717265?w=430&amp;h=430" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">JavaScript 的组成</h3>
<p>JavaScript 由以下三部分组成：</p>
<ul>
<li>ECMAScript（核心）：JavaScript 语言基础</li>
<li>DOM（文档对象模型）：规定了访问 HTML 和 XML 的接口</li>
<li>BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法</li>
</ul>
<h3 id="articleHeader2">JS 的基本数据类型和引用数据类型</h3>
<ul>
<li>基本数据类型：undefined、null、boolean、number、string、symbol</li>
<li>引用数据类型：object、array、function</li>
</ul>
<h3 id="articleHeader3">检测浏览器版本版本有哪些方式？</h3>
<ul>
<li>根据 navigator.userAgent // UA.toLowerCase().indexOf('chrome')</li>
<li>根据 window 对象的成员 // 'ActiveXObject' in window</li>
</ul>
<h3 id="articleHeader4">介绍 JS 有哪些内置对象？</h3>
<ul>
<li>数据封装类对象：Object、Array、Boolean、Number、String</li>
<li>其他对象：Function、Arguments、Math、Date、RegExp、Error</li>
<li>ES6 新增对象：Symbol、Map、Set、Promises、Proxy、Reflect</li>
</ul>
<h3 id="articleHeader5">说几条写 JavaScript 的基本规范？</h3>
<ul>
<li>代码缩进，建议使用“四个空格”缩进</li>
<li>代码段使用花括号{}包裹</li>
<li>语句结束使用分号;</li>
<li>变量和函数在使用前进行声明</li>
<li>以大写字母开头命名构造函数，全大写命名常量</li>
<li>规范定义 JSON 对象，补全双引号</li>
<li>用{}和[]声明对象和数组</li>
</ul>
<h3 id="articleHeader6">如何编写高性能的 JavaScript？</h3>
<ul>
<li>遵循严格模式："use strict";</li>
<li>将 js 脚本放在页面底部，加快渲染页面</li>
<li>将 js 脚本将脚本成组打包，减少请求</li>
<li>使用非阻塞方式下载 js 脚本</li>
<li>尽量使用局部变量来保存全局变量</li>
<li>尽量减少使用闭包</li>
<li>使用 window 对象属性方法时，省略 window</li>
<li>尽量减少对象成员嵌套</li>
<li>缓存 DOM 节点的访问</li>
<li>通过避免使用 eval() 和 Function() 构造器</li>
<li>给 setTimeout() 和 setInterval() 传递函数而不是字符串作为参数</li>
<li>尽量使用直接量创建对象和数组</li>
<li>最小化重绘(repaint)和回流(reflow)</li>
</ul>
<h3 id="articleHeader7">DOM 元素 e 的 e.getAttribute(propName)和 e.propName 有什么区别和联系</h3>
<ul>
<li>e.getAttribute()，是标准 DOM 操作文档元素属性的方法，具有通用性可在任意文档上使用，返回元素在源文件中设置的属性</li>
<li>e.propName 通常是在 HTML 文档中访问特定元素的特性，浏览器解析元素后生成对应对象（如 a 标签生成 HTMLAnchorElement），这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用 getAttribute 进行访问</li>
<li>e.getAttribute()返回值是源文件中设置的值，类型是字符串或者 null（有的实现返回""）</li>
<li>e.propName 返回值可能是字符串、布尔值、对象、undefined 等</li>
<li>大部分 attribute 与 property 是一一对应关系，修改其中一个会影响另一个，如 id，title 等属性</li>
<li>一些布尔属性<code>&lt;input hidden/&gt;</code>的检测设置需要 hasAttribute 和 removeAttribute 来完成，或者设置对应 property</li>
<li>像<code>&lt;a href="../index.html"&gt;link&lt;/a&gt;</code>中 href 属性，转换成 property 的时候需要通过转换得到完整 URL</li>
<li>一些 attribute 和 property 不是一一对应如：form 控件中<code>&lt;input value="hello"/&gt;</code>对应的是 defaultValue，修改或设置 value property 修改的是控件当前值，setAttribute 修改 value 属性不会改变 value property</li>
</ul>
<h3 id="articleHeader8">offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别</h3>
<ul>
<li>offsetWidth/offsetHeight 返回值包含 content + padding + border，效果与 e.getBoundingClientRect()相同</li>
<li>clientWidth/clientHeight 返回值只包含 content + padding，如果有滚动条，也不包含滚动条</li>
<li>scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸</li>
</ul>
<h3 id="articleHeader9">描述浏览器的渲染过程，DOM 树和渲染树的区别？</h3>
<p>浏览器的渲染过程：</p>
<ul>
<li>解析 HTML 构建 DOM(DOM 树)，并行请求 css/image/js</li>
<li>CSS 文件下载完成，开始构建 CSSOM(CSS 树)</li>
<li>CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)</li>
<li>布局(Layout)：计算出每个节点在屏幕中的位置</li>
<li>显示(Painting)：通过显卡把页面画到屏幕上</li>
</ul>
<p>DOM 树 和 渲染树 的区别：</p>
<ul>
<li>DOM 树与 HTML 标签一一对应，包括 head 和隐藏元素</li>
<li>渲染树不包括 head 和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的 css 属性</li>
</ul>
<h3 id="articleHeader10">重绘和回流（重排）的区别和关系？</h3>
<ul>
<li>重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘</li>
<li>回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流</li>
<li>注意：JS 获取 Layout 属性值（如：offsetLeft、scrollTop、getComputedStyle 等）也会引起回流。因为浏览器需要通过回流计算最新值</li>
<li>回流必将引起重绘，而重绘不一定会引起回流</li>
</ul>
<h3 id="articleHeader11">如何最小化重绘(repaint)和回流(reflow)？</h3>
<ul>
<li>需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示</li>
<li>需要创建多个 DOM 节点时，使用 DocumentFragment 创建完后一次性的加入 document</li>
<li>缓存 Layout 属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流</li>
<li>尽量避免用 table 布局（table 元素一旦触发回流就会导致 table 里所有的其它元素回流）</li>
<li>避免使用 css 表达式(expression)，因为每次调用都会重新计算值（包括加载页面）</li>
<li>尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color<br>批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx</li>
</ul>
<h3 id="articleHeader12">script 的位置是否会影响首屏显示时间？</h3>
<ul>
<li>在解析 HTML 生成 DOM 过程中，js 文件的下载是并行的，不需要 DOM 处理到 script 节点。因此，script 的位置不影响首屏显示的开始时间。</li>
<li>浏览器解析 HTML 是自上而下的线性过程，script 作为 HTML 的一部分同样遵循这个原则</li>
<li>因此，script 会延迟 DomContentLoad，只显示其上部分首屏内容，从而影响首屏显示的完成时间</li>
</ul>
<h3 id="articleHeader13">解释 JavaScript 中的作用域与变量声明提升？</h3>
<p>JavaScript 作用域：</p>
<ul>
<li>在 Java、C 等语言中，作用域为 for 语句、if 语句或{}内的一块区域，称为作用域；</li>
<li>而在 JavaScript 中，作用域为 function(){}内的区域，称为函数作用域。</li>
</ul>
<p>JavaScript 变量声明提升：</p>
<ul>
<li>在 JavaScript 中，函数声明与变量声明经常被 JavaScript 引擎隐式地提升到当前作用域的顶部。</li>
<li>声明语句中的赋值部分并不会被提升，只有名称被提升</li>
<li>函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明</li>
<li>如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数</li>
</ul>
<h3 id="articleHeader14">介绍 JavaScript 的原型，原型链？有什么特点？</h3>
<p>原型：</p>
<ul>
<li>JavaScript 的所有对象中都包含了一个 [proto] 内部属性，这个属性所对应的就是该对象的原型</li>
<li>JavaScript 的函数对象，除了原型 [proto] 之外，还预置了 prototype 属性</li>
<li>当函数对象作为构造函数创建实例时，该 prototype 属性值将被作为实例对象的原型 [proto]。</li>
</ul>
<p>原型链：</p>
<ul>
<li>当一个对象调用的属性/方法自身不存在时，就会去自己 [proto] 关联的前辈 prototype 对象上去找</li>
<li>如果没找到，就会去该 prototype 原型 [proto] 关联的前辈 prototype 去找。依次类推，直到找到属性/方法或 undefined 为止。从而形成了所谓的“原型链”</li>
</ul>
<p>原型特点：</p>
<ul><li>JavaScript 对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变</li></ul>
<h3 id="articleHeader15">JavaScript 有几种类型的值？，你能画一下他们的内存图吗</h3>
<ul>
<li>原始数据类型（Undefined，Null，Boolean，Number、String）-- 栈</li>
<li>引用数据类型（对象、数组和函数）-- 堆</li>
<li>两种类型的区别是：存储位置不同：</li>
<li>原始数据类型是直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据；</li>
<li>引用数据类型存储在堆(heap)中的对象，占据空间大、大小不固定，如果存储在栈中，将会影响程序运行的性能；</li>
<li>引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。</li>
<li>当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。</li>
</ul>
<h3 id="articleHeader16">JavaScript 如何实现一个类，怎么实例化这个类？</h3>
<ol><li>
<p>构造函数法（this + prototype） -- 用 new 关键字 生成实例对象</p>
<ul><li>缺点：用到了 this 和 prototype，编写复杂，可读性差</li></ul>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function Mobile(name, price){
     this.name = name;
     this.price = price;
   }
   Mobile.prototype.sell = function(){
      alert(this.name + &quot;，售价 $&quot; + this.price);
   }
   var iPhone7 = new Mobile(&quot;iPhone7&quot;, 1000);
   iPhone7.sell();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Mobile</span><span class="hljs-params">(name, price)</span></span>{
     <span class="hljs-keyword">this</span>.name = name;
     <span class="hljs-keyword">this</span>.price = price;
   }
   Mobile.prototype.sell = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      alert(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">"，售价 $"</span> + <span class="hljs-keyword">this</span>.price);
   }
   <span class="hljs-keyword">var</span> iPhone7 = <span class="hljs-keyword">new</span> Mobile(<span class="hljs-string">"iPhone7"</span>, <span class="hljs-number">1000</span>);
   iPhone7.sell();</code></pre>
<ol><li>
<p>Object.create 法 -- 用 Object.create() 生成实例对象</p>
<ul><li>缺点：不能实现私有属性和私有方法，实例对象之间也不能共享数据</li></ul>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Person = {
     firstname: &quot;Mark&quot;,
     lastname: &quot;Yun&quot;,
     age: 25,
     introduce: function(){
         alert('I am ' + Person.firstname + ' ' + Person.lastname);
     }
 };

 var person = Object.create(Person);
 person.introduce();

 // Object.create 要求 IE9+，低版本浏览器可以自行部署：
 if (!Object.create) {
　   Object.create = function (o) {
　　　 function F() {}
　　　 F.prototype = o;
　　　 return new F();
　　};
　}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> Person = {
     <span class="hljs-attr">firstname</span>: <span class="hljs-string">"Mark"</span>,
     <span class="hljs-attr">lastname</span>: <span class="hljs-string">"Yun"</span>,
     <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>,
     <span class="hljs-attr">introduce</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         alert(<span class="hljs-string">'I am '</span> + Person.firstname + <span class="hljs-string">' '</span> + Person.lastname);
     }
 };

 <span class="hljs-keyword">var</span> person = <span class="hljs-built_in">Object</span>.create(Person);
 person.introduce();

 <span class="hljs-comment">// Object.create 要求 IE9+，低版本浏览器可以自行部署：</span>
 <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Object</span>.create) {
　   <span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
　　　 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
　　　 F.prototype = o;
　　　 <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
　　};
　}</code></pre>
<ol><li>
<p>极简主义法（消除 this 和 prototype） -- 调用 createNew() 得到实例对象</p>
<ul><li>优点：容易理解，结构清晰优雅，符合传统的"面向对象编程"的构造</li></ul>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Cat = {
   age: 3, // 共享数据 -- 定义在类对象内，createNew() 外
   createNew: function () {
     var cat = {};
     // var cat = Animal.createNew(); // 继承 Animal 类
     cat.name = &quot;小咪&quot;;
     var sound = &quot;喵喵喵&quot;; // 私有属性--定义在 createNew() 内，输出对象外
     cat.makeSound = function () {
       alert(sound);  // 暴露私有属性
     };
     cat.changeAge = function(num){
       Cat.age = num; // 修改共享数据
     };
     return cat; // 输出对象
   }
 };

 var cat = Cat.createNew();
 cat.makeSound();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code> <span class="hljs-keyword">var</span> <span class="hljs-keyword">Cat</span> = {
   age: 3, <span class="hljs-comment">// 共享数据 -- 定义在类对象内，createNew() 外</span>
   createNew: function () {
     <span class="hljs-keyword">var</span> <span class="hljs-keyword">cat</span> = {};
     <span class="hljs-comment">// var cat = Animal.createNew(); // 继承 Animal 类</span>
     <span class="hljs-keyword">cat</span>.name = <span class="hljs-string">"小咪"</span>;
     <span class="hljs-keyword">var</span> sound = <span class="hljs-string">"喵喵喵"</span>; <span class="hljs-comment">// 私有属性--定义在 createNew() 内，输出对象外</span>
     <span class="hljs-keyword">cat</span>.makeSound = function () {
       alert(sound);  <span class="hljs-comment">// 暴露私有属性</span>
     };
     <span class="hljs-keyword">cat</span>.changeAge = function(num){
       <span class="hljs-keyword">Cat</span>.age = num; <span class="hljs-comment">// 修改共享数据</span>
     };
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">cat</span>; <span class="hljs-comment">// 输出对象</span>
   }
 };

 <span class="hljs-keyword">var</span> <span class="hljs-keyword">cat</span> = <span class="hljs-keyword">Cat</span>.createNew();
 <span class="hljs-keyword">cat</span>.makeSound();</code></pre>
<ol><li>ES6 语法糖 class -- 用 new 关键字 生成实例对象</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     class Point {
       constructor(x, y) {
         this.x = x;
         this.y = y;
       }
       toString() {
         return '(' + this.x + ', ' + this.y + ')';
       }
     }

  var point = new Point(2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>     <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
       <span class="hljs-keyword">constructor</span>(x, y) {
         <span class="hljs-keyword">this</span>.x = x;
         <span class="hljs-keyword">this</span>.y = y;
       }
       toString() {
         <span class="hljs-keyword">return</span> <span class="hljs-string">'('</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">', '</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">')'</span>;
       }
     }

  <span class="hljs-keyword">var</span> point = new Point(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<h3 id="articleHeader17">Javascript 如何实现继承？</h3>
<ol><li>构造函数绑定：使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name,color){
 　Animal.apply(this, arguments);
 　this.name = name;
 　this.color = color;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name,color</span>)</span>{
 　Animal.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
 　<span class="hljs-keyword">this</span>.name = name;
 　<span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}</code></pre>
<ol><li>实例继承：将子对象的 prototype 指向父对象的一个实例</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Cat</span>.proto<span class="hljs-keyword">type</span> = new <span class="hljs-type">Animal</span>();
<span class="hljs-type">Cat</span>.proto<span class="hljs-keyword">type</span>.constructor = <span class="hljs-type">Cat</span>;</code></pre>
<ol><li>拷贝继承：如果把父对象的所有属性和方法，拷贝进子对象</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function extend(Child, Parent) {
　　　var p = Parent.prototype;
　　　var c = Child.prototype;
　　　for (var i in p) {
　　　   c[i] = p[i];
　　　}
　　　c.uber = p;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span><span class="hljs-params">(Child, Parent)</span> </span>{
　　　<span class="hljs-keyword">var</span> p = Parent.prototype;
　　　<span class="hljs-keyword">var</span> c = Child.prototype;
　　　<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> p) {
　　　   c[i] = p[i];
　　　}
　　　c.uber = p;
}</code></pre>
<ol><li>原型继承：将子对象的 prototype 指向父对象的 prototype</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function extend(Child, Parent) {
    var F = function(){};
    　F.prototype = Parent.prototype;
    　Child.prototype = new F();
    　Child.prototype.constructor = Child;
    　Child.uber = Parent.prototype;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span><span class="hljs-params">(Child, Parent)</span> </span>{
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
    　F.prototype = <span class="hljs-keyword">Parent</span>.prototype;
    　Child.prototype = <span class="hljs-keyword">new</span> F();
    　Child.prototype.constructor = Child;
    　Child.uber = <span class="hljs-keyword">Parent</span>.prototype;
}</code></pre>
<ol><li>ES6 语法糖 extends：class ColorPoint extends Point {}</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorPoint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Point</span> </span>{
    constructor(x, y, color) {
        <span class="hljs-keyword">super</span>(x, y); <span class="hljs-comment">// 调用父类的constructor(x, y)</span>
        <span class="hljs-keyword">this</span>.color = color;
    }
    toString() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.color + ' ' + <span class="hljs-keyword">super</span>.toString(); <span class="hljs-comment">// 调用父类的toString()</span>
    }
}</code></pre>
<h3 id="articleHeader18">js 继承方式及其优缺点</h3>
<p>原型链继承的缺点</p>
<ul><li>一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。</li></ul>
<p>借用构造函数（类式继承）</p>
<ul><li>借用构造函数虽然解决了刚才两种问题，但没有原型，则复用无从谈起。所以我们需要原型链+借用构造函数的模式，这种模式称为组合继承</li></ul>
<p>组合式继承</p>
<ul><li>组合式继承是比较常用的一种继承方法，其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。</li></ul>
<h3 id="articleHeader19">javascript 创建对象的几种方式？</h3>
<p>javascript 创建对象简单的说,无非就是使用内置对象或各种自定义对象，当然还可以用 JSON；但写法有很多种，也能混合使用</p>
<ol><li>对象字面量的方式</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person={firstname:&quot;Mark&quot;,lastname:&quot;Yun&quot;,age:25,eyecolor:&quot;black&quot;};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">person={<span class="hljs-string">firstname:</span><span class="hljs-string">"Mark"</span>,<span class="hljs-string">lastname:</span><span class="hljs-string">"Yun"</span>,<span class="hljs-string">age:</span><span class="hljs-number">25</span>,<span class="hljs-string">eyecolor:</span><span class="hljs-string">"black"</span>};</code></pre>
<ol><li>用 function 来模拟无参的构造函数</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Person(){}
    var person=new Person();//定义一个function，如果使用new&quot;实例化&quot;,该function可以看作是一个Class
        person.name=&quot;Mark&quot;;
        person.age=&quot;25&quot;;
        person.work=function(){
        alert(person.name+&quot; hello...&quot;);
    }
person.work();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">()</span></span>{}
    <span class="hljs-keyword">var</span> person=<span class="hljs-keyword">new</span> Person();<span class="hljs-comment">//定义一个function，如果使用new"实例化",该function可以看作是一个Class</span>
        person.name=<span class="hljs-string">"Mark"</span>;
        person.age=<span class="hljs-string">"25"</span>;
        person.work=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(person.name+<span class="hljs-string">" hello..."</span>);
    }
person.work();</code></pre>
<ol><li>用 function 来模拟参构造函数来实现（用 this 关键字定义构造的上下文属性）</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Pet(name,age,hobby){
    this.name=name;//this作用域：当前对象
    this.age=age;
    this.hobby=hobby;
    this.eat=function(){
        alert(&quot;我叫&quot;+this.name+&quot;,我喜欢&quot;+this.hobby+&quot;,是个程序员&quot;);
    }
}
var maidou =new Pet(&quot;麦兜&quot;,25,&quot;coding&quot;);//实例化、创建对象
maidou.eat();//调用eat方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pet</span><span class="hljs-params">(name,age,hobby)</span></span>{
    <span class="hljs-keyword">this</span>.name=name;<span class="hljs-comment">//this作用域：当前对象</span>
    <span class="hljs-keyword">this</span>.age=age;
    <span class="hljs-keyword">this</span>.hobby=hobby;
    <span class="hljs-keyword">this</span>.eat=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-string">"我叫"</span>+<span class="hljs-keyword">this</span>.name+<span class="hljs-string">",我喜欢"</span>+<span class="hljs-keyword">this</span>.hobby+<span class="hljs-string">",是个程序员"</span>);
    }
}
<span class="hljs-keyword">var</span> maidou =<span class="hljs-keyword">new</span> Pet(<span class="hljs-string">"麦兜"</span>,<span class="hljs-number">25</span>,<span class="hljs-string">"coding"</span>);<span class="hljs-comment">//实例化、创建对象</span>
maidou.eat();<span class="hljs-comment">//调用eat方法</span></code></pre>
<ol><li>用工厂方式来创建（内置对象）</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var wcDog =new Object();
     wcDog.name=&quot;旺财&quot;;
     wcDog.age=3;
wcDog.work=function(){
    alert(&quot;我是&quot;+wcDog.name+&quot;,汪汪汪......&quot;);
}
wcDog.work();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> wcDog =<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
     wcDog.name=<span class="hljs-string">"旺财"</span>;
     wcDog.age=<span class="hljs-number">3</span>;
wcDog.work=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"我是"</span>+wcDog.name+<span class="hljs-string">",汪汪汪......"</span>);
}
wcDog.work();</code></pre>
<ol><li>用原型方式来创建</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(){

    }
Dog.prototype.name=&quot;旺财&quot;;
Dog.prototype.eat=function(){
    alert(this.name+&quot;是个吃货&quot;);
}
var wangcai =new Dog();
wangcai.eat();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span><span class="hljs-params">()</span></span>{

    }
Dog.prototype.name=<span class="hljs-string">"旺财"</span>;
Dog.prototype.eat=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"是个吃货"</span>);
}
<span class="hljs-keyword">var</span> wangcai =<span class="hljs-keyword">new</span> Dog();
wangcai.eat();</code></pre>
<ol><li>用混合方式来创建</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Car(name,price){
    this.name=name;
    this.price=price;
}
    Car.prototype.sell=function(){
    alert(&quot;我是&quot;+this.name+&quot;，我现在卖&quot;+this.price+&quot;万元&quot;);
    }
var camry =new Car(&quot;凯美瑞&quot;,27);
camry.sell();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Car</span><span class="hljs-params">(name,price)</span></span>{
    <span class="hljs-keyword">this</span>.name=name;
    <span class="hljs-keyword">this</span>.price=price;
}
    Car.prototype.sell=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-string">"我是"</span>+<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"，我现在卖"</span>+<span class="hljs-keyword">this</span>.price+<span class="hljs-string">"万元"</span>);
    }
<span class="hljs-keyword">var</span> camry =<span class="hljs-keyword">new</span> Car(<span class="hljs-string">"凯美瑞"</span>,<span class="hljs-number">27</span>);
camry.sell();</code></pre>
<h3 id="articleHeader20">Javascript 作用链域?</h3>
<ul>
<li>全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节</li>
<li>如果当前作用域没有找到属性或方法，会向上层作用域查找，直至全局函数，这种形式就是作用域链</li>
</ul>
<h3 id="articleHeader21">谈谈 this 对象的理解</h3>
<ul>
<li>this 总是指向函数的直接调用者</li>
<li>如果有 new 关键字，this 指向 new 出来的实例对象</li>
<li>在事件中，this 指向触发这个事件的对象</li>
<li>IE 下 attachEvent 中的 this 总是指向全局对象 Window</li>
</ul>
<h3 id="articleHeader22">eval 是做什么的？</h3>
<p>eval 的功能是把对应的字符串解析成 JS 代码并运行</p>
<ul>
<li>应该避免使用 eval，不安全，非常耗性能（先解析成 js 语句，再执行）</li>
<li>由 JSON 字符串转换为 JSON 对象的时候可以用 eval('('+ str +')');</li>
</ul>
<h3 id="articleHeader23">什么是 Window 对象? 什么是 Document 对象?</h3>
<ul>
<li>Window 对象表示当前浏览器的窗口，是 JavaScript 的顶级对象。</li>
<li>我们创建的所有对象、函数、变量都是 Window 对象的成员。</li>
<li>Window 对象的方法和属性是在全局范围内有效的。</li>
<li>Document 对象是 HTML 文档的根节点与所有其他节点（元素节点，文本节点，属性节点, 注释节点）</li>
<li>Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问</li>
<li>Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问</li>
</ul>
<h3 id="articleHeader24">介绍 DOM 的发展</h3>
<ul>
<li>DOM：文档对象模型（Document Object Model），定义了访问 HTML 和 XML 文档的标准，与编程语言及平台无关</li>
<li>DOM0：提供了查询和操作 Web 文档的内容 API。未形成标准，实现混乱。如：document.forms['login']</li>
<li>DOM1：W3C 提出标准化的 DOM，简化了对文档中任意部分的访问和操作。如：JavaScript 中的 Document 对象</li>
<li>DOM2：原来 DOM 基础上扩充了鼠标事件等细分模块，增加了对 CSS 的支持。如：getComputedStyle(elem, pseudo)</li>
<li>DOM3：增加了 XPath 模块和加载与保存（Load and Save）模块。如：XPathEvaluator</li>
</ul>
<h3 id="articleHeader25">介绍 DOM0，DOM2，DOM3 事件处理方式区别</h3>
<p>DOM0 级事件处理方式：</p>
<ul>
<li>btn.onclick = func;</li>
<li>btn.onclick = null;</li>
</ul>
<p>DOM2 级事件处理方式：</p>
<ul>
<li>btn.addEventListener('click', func, false);</li>
<li>btn.removeEventListener('click', func, false);</li>
<li>btn.attachEvent("onclick", func);</li>
<li>btn.detachEvent("onclick", func);</li>
</ul>
<p>DOM3 级事件处理方式：</p>
<ul>
<li>eventUtil.addListener(input, "textInput", func);</li>
<li>eventUtil 是自定义对象，textInput 是 DOM3 级事件</li>
</ul>
<h3 id="articleHeader26">事件的三个阶段</h3>
<p>捕获、目标、冒泡</p>
<h3 id="articleHeader27">介绍事件“捕获”和“冒泡”执行顺序和事件的执行次数？</h3>
<p>按照 W3C 标准的事件：首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段</p>
<p>事件执行次数（DOM2-addEventListener）：元素上绑定事件的个数</p>
<ul>
<li>注意 1：前提是事件被确实触发</li>
<li>注意 2：事件绑定几次就算几个事件，即使类型和功能完全一样也不会“覆盖”</li>
</ul>
<p>事件执行顺序：判断的关键是否目标元素</p>
<ul>
<li>非目标元素：根据 W3C 的标准执行：捕获-&gt;目标元素-&gt;冒泡（不依据事件绑定顺序）</li>
<li>目标元素：依据事件绑定顺序：先绑定的事件先执行（不依据捕获冒泡标准）</li>
<li>最终顺序：父元素捕获-&gt;目标元素事件 1-&gt;目标元素事件 2-&gt;子元素捕获-&gt;子元素冒泡-&gt;父元素冒泡</li>
<li>注意：子元素事件执行前提 事件确实“落”到子元素布局区域上，而不是简单的具有嵌套关系</li>
</ul>
<h3 id="articleHeader28">在一个 DOM 上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次，先执行冒泡还是捕获？</h3>
<ul>
<li>该 DOM 上的事件如果被触发，会执行两次（执行次数等于绑定次数）</li>
<li>如果该 DOM 是目标元素，则按事件绑定顺序执行，不区分冒泡/捕获</li>
<li>如果该 DOM 是处于事件流中的非目标元素，则先执行捕获，后执行冒泡</li>
</ul>
<h3 id="articleHeader29">事件的代理/委托</h3>
<p>事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件</p>
<p>优点：</p>
<ul>
<li>可以减少事件注册，节省大量内存占用</li>
<li>可以将事件应用于动态添加的子元素上</li>
</ul>
<p>缺点： 使用不当会造成事件在不应该触发时触发</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ulEl.addEventListener('click', function(e){
    var target = event.target || event.srcElement;
    if(!!target &amp;&amp; target.nodeName.toUpperCase() === &quot;LI&quot;){
        console.log(target.innerHTML);
    }
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>ulEl.addEventListener(<span class="hljs-string">'click'</span>, function(e){
    var <span class="hljs-keyword">target</span> = event.<span class="hljs-keyword">target</span> || event.srcElement;
    <span class="hljs-keyword">if</span>(!!<span class="hljs-keyword">target</span> &amp;&amp; <span class="hljs-keyword">target</span>.nodeName.toUpperCase() === <span class="hljs-string">"LI"</span>){
        console.log(<span class="hljs-keyword">target</span>.innerHTML);
    }
}, <span class="hljs-keyword">false</span>);</code></pre>
<h3 id="articleHeader30">IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？</h3>
<p>IE 只事件冒泡，不支持事件捕获；火狐同时支持件冒泡和事件捕获。</p>
<p>阻止冒泡：</p>
<ul>
<li>取消默认操作: w3c 的方法是 e.preventDefault()，IE 则是使用 e.returnValue = false;</li>
<li>return false javascript 的 return false 只会阻止默认行为，而是用 jQuery 的话则既阻止默认行为又防止对象冒泡。</li>
<li>阻止冒泡 w3c 的方法是 e.stopPropagation()，IE 则是使用 e.cancelBubble = true</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[js] view plaincopy
function stopHandler(event)

    window.event?window.event.cancelBubble=true:event.stopPropagation();

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>[js] <span class="hljs-function">view plaincopy
function <span class="hljs-title">stopHandler</span>(<span class="hljs-params"><span class="hljs-keyword">event</span></span>)

    window.<span class="hljs-keyword">event</span>?window.<span class="hljs-keyword">event</span>.cancelBubble</span>=<span class="hljs-literal">true</span>:<span class="hljs-keyword">event</span>.stopPropagation();

}</code></pre>
<p>参考链接:<a href="http://wiki.jikexueyuan.com/project/brief-talk-js/event-cancellation-and-prevent-bubbles.html" rel="nofollow noreferrer" target="_blank">浅谈 javascript 事件取消和阻止冒泡-开源中国 2015</a></p>
<h3 id="articleHeader31">IE 的事件处理和 W3C 的事件处理有哪些区别？(必考)</h3>
<p>绑定事件</p>
<ul>
<li>W3C: targetEl.addEventListener('click', handler, false);</li>
<li>IE: targetEl.attachEvent('onclick', handler);</li>
</ul>
<p>删除事件</p>
<ul>
<li>W3C: targetEl.removeEventListener('click', handler, false);</li>
<li>IE: targetEl.detachEvent(event, handler);</li>
</ul>
<p>事件对象</p>
<ul>
<li>W3C: var e = arguments.callee.caller.arguments[0]</li>
<li>IE: window.event</li>
</ul>
<p>事件目标</p>
<ul>
<li>W3C: e.target</li>
<li>IE: window.event.srcElement</li>
</ul>
<p>阻止事件默认行为</p>
<ul>
<li>W3C: e.preventDefault()</li>
<li>IE: window.event.returnValue = false'</li>
</ul>
<p>阻止事件传播</p>
<ul>
<li>W3C: e.stopPropagation()</li>
<li>IE: window.event.cancelBubble = true</li>
</ul>
<h3 id="articleHeader32">W3C 事件的 target 与 currentTarget 的区别？</h3>
<ul>
<li>target 只会出现在事件流的目标阶段</li>
<li>currentTarget 可能出现在事件流的任何阶段</li>
<li>当事件流处在目标阶段时，二者的指向相同</li>
<li>当事件流处于捕获或冒泡阶段时：currentTarget 指向当前事件活动的对象(一般为父级)</li>
</ul>
<h3 id="articleHeader33">如何派发事件(dispatchEvent)？（如何进行事件广播？）</h3>
<ul>
<li>W3C: 使用 dispatchEvent 方法</li>
<li>IE: 使用 fireEvent 方法</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fireEvent = function(element, event){
    if (document.createEventObject){
        var mockEvent = document.createEventObject();
        return element.fireEvent('on' + event, mockEvent)
    }else{
        var mockEvent = document.createEvent('HTMLEvents');
        mockEvent.initEvent(event, true, true);
        return !element.dispatchEvent(mockEvent);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fireEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, event</span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.createEventObject){
        <span class="hljs-keyword">var</span> mockEvent = <span class="hljs-built_in">document</span>.createEventObject();
        <span class="hljs-keyword">return</span> element.fireEvent(<span class="hljs-string">'on'</span> + event, mockEvent)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">var</span> mockEvent = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'HTMLEvents'</span>);
        mockEvent.initEvent(event, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);
        <span class="hljs-keyword">return</span> !element.dispatchEvent(mockEvent);
    }
}</code></pre>
<h3 id="articleHeader34">什么是函数节流？介绍一下应用场景和原理？</h3>
<ul>
<li>函数节流(throttle)是指阻止一个函数在很短时间间隔内连续调用。 只有当上一次函数执行后达到规定的时间间隔，才能进行下一次调用。 但要保证一个累计最小调用间隔（否则拖拽类的节流都将无连续效果）</li>
<li>函数节流用于 onresize, onscroll 等短时间内会多次触发的事件</li>
<li>函数节流的原理：使用定时器做时间节流。 当触发一个事件时，先用 setTimout 让这个事件延迟一小段时间再执行。 如果在这个时间间隔内又触发了事件，就 clearTimeout 原来的定时器， 再 setTimeout 一个新的定时器重复以上流程。</li>
</ul>
<p>函数节流简单实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(method, context) {
     clearTimeout(methor.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }， 100); // 两次调用至少间隔 100ms
}
// 调用
window.onresize = function(){
    throttle(myFunc, window);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">method, context</span>) </span>{
     clearTimeout(methor.tId);
     method.tId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         method.call(context);
     }， <span class="hljs-number">100</span>); <span class="hljs-comment">// 两次调用至少间隔 100ms</span>
}
<span class="hljs-comment">// 调用</span>
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    throttle(myFunc, <span class="hljs-built_in">window</span>);
}</code></pre>
<h3 id="articleHeader35">区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”？</h3>
<ul>
<li>客户区坐标：鼠标指针在可视区中的水平坐标(clientX)和垂直坐标(clientY)</li>
<li>页面坐标：鼠标指针在页面布局中的水平坐标(pageX)和垂直坐标(pageY)</li>
<li>屏幕坐标：设备物理屏幕的水平坐标(screenX)和垂直坐标(screenY)</li>
</ul>
<h3 id="articleHeader36">如何获得一个 DOM 元素的绝对位置？</h3>
<ul>
<li>elem.offsetLeft：返回元素相对于其定位父级左侧的距离</li>
<li>elem.offsetTop：返回元素相对于其定位父级顶部的距离</li>
<li>elem.getBoundingClientRect()：返回一个 DOMRect 对象，包含一组描述边框的只读属性，单位像素</li>
</ul>
<h3 id="articleHeader37">分析 ['1', '2', '3'].map(parseInt) 答案是多少？（常考）</h3>
<p>答案:[1, NaN, NaN]</p>
<p>parseInt(string, radix) 第 2 个参数 radix 表示进制。省略 radix 或 radix = 0，则数字将以十进制解析</p>
<p>map 每次为 parseInt 传 3 个参数(elem, index, array)，其中 index 为数组索引</p>
<p>因此，map 遍历 ["1", "2", "3"]，相应 parseInt 接收参数如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('1', 0);  // 1
parseInt('2', 1);  // NaN
parseInt('3', 2);  // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'1'</span>, <span class="hljs-number">0</span>);  <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'2'</span>, <span class="hljs-number">1</span>);  <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'3'</span>, <span class="hljs-number">2</span>);  <span class="hljs-comment">// NaN</span></code></pre>
<p>所以，parseInt 参数 radix 不合法，导致返回值为 NaN</p>
<h3 id="articleHeader38">new 操作符具体干了什么？</h3>
<ul>
<li>创建实例对象，this 变量引用该对象，同时还继承了构造函数的原型</li>
<li>属性和方法被加入到 this 引用的对象中</li>
<li>新创建的对象由 this 所引用，并且最后隐式的返回 this</li>
</ul>
<h3 id="articleHeader39">用原生 JavaScript 的实现过什么功能吗？</h3>
<p>封装选择器、调用第三方 API、设置和获取样式(自由回答)</p>
<h3 id="articleHeader40">解释一下这段代码的意思吗？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [].forEach.call($$(&quot;*&quot;), function(el){
      el.style.outline = &quot;1px solid #&quot; + (~~(Math.random()*(1<<24))).toString(16);
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  [].forEach.call($$(<span class="hljs-string">"*"</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
      el.style.outline = <span class="hljs-string">"1px solid #"</span> + (~~(<span class="hljs-built_in">Math</span>.random()*(<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">24</span>))).toString(<span class="hljs-number">16</span>);
  })</code></pre>
<p>解释：获取页面所有的元素，遍历这些元素，为它们添加 1 像素随机颜色的轮廓(outline)</p>
<ul>
<li><span class="MathJax_Preview"></span><div class="MathJax_Display" style="text-align: center;"><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 2.817em; display: inline-block;"><span style="display: inline-block; position: relative; width: 2.314em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.631em, 1002.32em, 2.822em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="mo" id="MathJax-Span-3" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-4" style="font-family: STIXGeneral-Italic;">s</span><span class="mi" id="MathJax-Span-5" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-6" style="font-family: STIXGeneral-Italic;">l<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.001em;"></span></span><span class="mo" id="MathJax-Span-7" style="font-family: STIXGeneral-Regular;">)</span><span class="texatom" id="MathJax-Span-8"><span class="mrow" id="MathJax-Span-9"><span class="mo" id="MathJax-Span-10" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="texatom" id="MathJax-Span-11"><span class="mrow" id="MathJax-Span-12"><span class="mo" id="MathJax-Span-13" style="font-family: STIXGeneral-Regular;">/</span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.281em; border-left: 0px solid; width: 0px; height: 1.174em;"></span></span></nobr></span></div><script type="math/tex; mode=display" id="MathJax-Element-1">(sel) // </script>函数被许多现代浏览器命令行支持，等价于 document.querySelectorAll(sel)</li>
<li>[].forEach.call(NodeLists) // 使用 call 函数将数组遍历函数 forEach 应到节点元素列表</li>
<li>el.style.outline = "1px solid #333" // 样式 outline 位于盒模型之外，不影响元素布局位置</li>
<li>(1&lt;&lt;24) // parseInt("ffffff", 16) == 16777215 == 2^24 - 1 // 1&lt;&lt;24 == 2^24 == 16777216</li>
<li>Math.random()*(1&lt;&lt;24) // 表示一个位于 0 到 16777216 之间的随机浮点数</li>
<li>
<del>Math.random()*(1&lt;&lt;24) // </del> 作用相当于 parseInt 取整</li>
<li>(~~(Math.random()*(1&lt;&lt;24))).toString(16) // 转换为一个十六进制-</li>
</ul>
<h3 id="articleHeader41">JavaScript 实现异步编程的方法？</h3>
<ul>
<li>回调函数</li>
<li>事件监听</li>
<li>发布/订阅</li>
<li>Promises 对象</li>
<li>Async 函数[ES7]</li>
</ul>
<h3 id="articleHeader42">web 开发中会话跟踪的方法有哪些</h3>
<ul>
<li>cookie</li>
<li>session</li>
<li>url 重写</li>
<li>隐藏 input</li>
<li>ip 地址</li>
</ul>
<h3 id="articleHeader43">什么是闭包（closure），为什么要用它？</h3>
<p>闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域</p>
<p>闭包的特性：</p>
<ul>
<li>函数内再嵌套函数</li>
<li>内部函数可以引用外层的参数和变量</li>
<li>参数和变量不会被垃圾回收机制回收</li>
</ul>
<h3 id="articleHeader44">javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？</h3>
<p>use strict 是一种 ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,使 JS 编码更加规范化的模式,消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为</p>
<h3 id="articleHeader45">如何判断一个对象是否属于某个类？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用instanceof （待完善）
   if(a instanceof Person){
       alert('yes');
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// 使用instanceof （待完善）</span>
   <span class="hljs-keyword">if</span><span class="hljs-comment">(a instanceof Person)</span>{
       alert<span class="hljs-comment">('yes')</span>;
   }</code></pre>
<h3 id="articleHeader46">js 延迟加载的方式有哪些？</h3>
<p>defer 和 async、动态创建 DOM 方式（用得最多）、按需异步载入 js</p>
<h3 id="articleHeader47">defer 和 async</h3>
<p>defer 并行加载 js 文件，会按照页面上 script 标签的顺序执行 async 并行加载 js 文件，下载完成立即执行，不会按照页面上 script 标签的顺序执行</p>
<h3 id="articleHeader48">Ajax 是什么? 如何创建一个 Ajax？</h3>
<p>ajax 的全称：Asynchronous Javascript And XML</p>
<p>异步传输+js+xml</p>
<p>所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验</p>
<ul>
<li>创建 XMLHttpRequest 对象,也就是创建一个异步调用对象</li>
<li>建一个新的 HTTP 请求,并指定该 HTTP 请求的方法、URL 及验证信息</li>
<li>设置响应 HTTP 请求状态变化的函数</li>
<li>发送 HTTP 请求</li>
<li>获取异步调用返回的数据</li>
<li>用 JavaScript 和 DOM 实现局部刷新</li>
</ul>
<h3 id="articleHeader49">同步和异步的区别?</h3>
<ul>
<li>同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作</li>
<li>异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容</li>
</ul>
<h3 id="articleHeader50">documen.write 和 innerHTML 的区别</h3>
<ul>
<li>document.write 只能重绘整个页面</li>
<li>innerHTML 可以重绘页面的一部分</li>
</ul>
<h3 id="articleHeader51">DOM 操作——怎样添加、移除、移动、复制、创建和查找节点?</h3>
<p>创建新节点</p>
<ul>
<li>createDocumentFragment() //创建一个 DOM 片段</li>
<li>createElement() //创建一个具体的元素</li>
<li>createTextNode() //创建一个文本节点</li>
</ul>
<p>添加、移除、替换、插入</p>
<ul>
<li>appendChild()</li>
<li>removeChild()</li>
<li>replaceChild()</li>
<li>insertBefore() //在已有的子节点前插入一个新的子节点</li>
</ul>
<p>查找</p>
<ul>
<li>getElementsByTagName() //通过标签名称</li>
<li>getElementsByName() // 通过元素的 Name 属性的值(IE 容错能力较强，会得到一个数组，其中包括 id 等于 name 值的) * getElementById() //通过元素 Id，唯一性</li>
</ul>
<h3 id="articleHeader52">那些操作会造成内存泄漏？</h3>
<ul>
<li>内存泄漏指任何对象在您不再拥有或需要它之后仍然存在</li>
<li>垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收</li>
<li>setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏</li>
<li>闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）</li>
</ul>
<h3 id="articleHeader53">渐进增强和优雅降级</h3>
<ul>
<li>渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。</li>
<li>优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容</li>
</ul>
<h3 id="articleHeader54">Javascript 垃圾回收方法</h3>
<p>标记清除（mark and sweep）</p>
<ul>
<li>这是 JavaScript 最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”</li>
<li>垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了</li>
</ul>
<p>引用计数(reference counting)</p>
<ul><li>在低版本 IE 中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加 1，如果该变量的值变成了另外一个，则这个值得引用次数减 1，当这个值的引用次数变为 0 的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的空间</li></ul>
<p>参考链接 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management" rel="nofollow noreferrer" target="_blank">内存管理-MDN</a></p>
<h3 id="articleHeader55">用过哪些设计模式？</h3>
<ol><li>工厂模式：</li></ol>
<ul>
<li>主要好处就是可以消除对象间的耦合，通过使用工程方法而不是 new 关键字。将所有实例化的代码集中在一个位置防止代码重复</li>
<li>工厂模式解决了重复实例化的问题 ，但还有一个问题,那就是识别问题，因为根本无法 搞清楚他们到底是哪个对象的实例</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createObject(name,age,profession){//集中实例化的函数var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.profession = profession;
    obj.move = function () {
        return this.name + ' at ' + this.age + ' engaged in ' + this.profession;
    };
    return obj;
}
var test1 = createObject('trigkit4',22,'programmer');//第一个实例var test2 = createObject('mike',25,'engineer');//第二个实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createObject</span><span class="hljs-params">(name,age,profession)</span></span>{<span class="hljs-comment">//集中实例化的函数var obj = new Object();</span>
    obj.name = name;
    obj.age = age;
    obj.profession = profession;
    obj.move = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name + <span class="hljs-string">' at '</span> + <span class="hljs-keyword">this</span>.age + <span class="hljs-string">' engaged in '</span> + <span class="hljs-keyword">this</span>.profession;
    };
    <span class="hljs-keyword">return</span> obj;
}
<span class="hljs-keyword">var</span> test1 = createObject(<span class="hljs-string">'trigkit4'</span>,<span class="hljs-number">22</span>,<span class="hljs-string">'programmer'</span>);<span class="hljs-comment">//第一个实例var test2 = createObject('mike',25,'engineer');//第二个实例</span></code></pre>
<ol><li>构造函数模式</li></ol>
<ul>
<li>使用构造函数的方法 ，即解决了重复实例化的问题 ，又解决了对象识别的问题，该模式与工厂模式的不同之处在于</li>
<li>构造函数方法没有显示的创建对象 (new Object());</li>
<li>直接将属性和方法赋值给 this 对象;</li>
<li>没有 renturn 语句</li>
</ul>
<h3 id="articleHeader56">说说你对闭包的理解</h3>
<p>使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在 js 中，函数即闭包，只有函数才会产生作用域的概念</p>
<p>闭包有三个特性：</p>
<ul>
<li>函数嵌套函数</li>
<li>函数内部可以引用外部的参数和变量</li>
<li>参数和变量不会被垃圾回收机制回收</li>
</ul>
<h3 id="articleHeader57">请解释一下 JavaScript 的同源策略</h3>
<ul>
<li>概念:同源策略是客户端脚本（尤其是 Javascript）的重要的安全度量标准。它最早出自 Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议</li>
<li>指一段脚本只能读取来自同一来源的窗口和文档的属性</li>
</ul>
<h3 id="articleHeader58">为什么要有同源限制？</h3>
<p>我们举例说明：比如一个黑客程序，他利用 Iframe 把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过 Javascript 读取到你的表单中 input 中的内容，这样用户名，密码就轻松到手了。]</p>
<p>缺点: 现在网站的 JS 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge 后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节</p>
<h3 id="articleHeader59">实现一个函数 clone，可以对 JavaScript 中的 5 种主要的数据类型（包括 Number、String、Object、Array、Boolean）进行值复制（常考）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    return cloneObj
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (!isObject(obj)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'obj 不是一个对象！'</span>)
    }

    <span class="hljs-keyword">let</span> isArray = <span class="hljs-built_in">Array</span>.isArray(obj)
    <span class="hljs-keyword">let</span> cloneObj = isArray ? [] : {}
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    <span class="hljs-keyword">return</span> cloneObj
}</code></pre>
<p>注意：for...in 法不支持拷贝 func、date、reg 和 err</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 代理法
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [...obj] : { ...obj }
    Reflect.ownKeys(cloneObj).forEach(key => {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return cloneObj
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 代理法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (!isObject(obj)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'obj 不是一个对象！'</span>)
    }

    <span class="hljs-keyword">let</span> isArray = <span class="hljs-built_in">Array</span>.isArray(obj)
    <span class="hljs-keyword">let</span> cloneObj = isArray ? [...obj] : { ...obj }
    <span class="hljs-built_in">Reflect</span>.ownKeys(cloneObj).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    <span class="hljs-keyword">return</span> cloneObj
}</code></pre>
<h3 id="articleHeader60">说说严格模式的限制</h3>
<ul>
<li>严格模式主要有以下限制：</li>
<li>变量必须声明后再使用</li>
<li>函数的参数不能有同名属性，否则报错</li>
<li>不能使用 with 语句</li>
<li>不能对只读属性赋值，否则报错</li>
<li>不能使用前缀 0 表示八进制数，否则报错</li>
<li>不能删除不可删除的属性，否则报错</li>
<li>不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]</li>
<li>eval 不会在它的外层作用域引入变量</li>
<li>eval 和 arguments 不能被重新赋值</li>
<li>arguments 不会自动反映函数参数的变化</li>
<li>不能使用 arguments.callee</li>
<li>不能使用 arguments.caller</li>
<li>禁止 this 指向全局对象</li>
<li>不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈</li>
<li>增加了保留字（比如 protected、static 和 interface）</li>
</ul>
<h3 id="articleHeader61">如何删除一个 cookie</h3>
<p>将时间设为当前时间往前一点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
date.setDate(date.getDate() - 1);//真正的删除" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">date</span>.setDate(<span class="hljs-built_in">date</span>.getDate() - <span class="hljs-number">1</span>);<span class="hljs-comment">//真正的删除</span></code></pre>
<p>setDate()方法用于设置一个月的某一天</p>
<p>expires 的设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  document.cookie = 'user='+ encodeURIComponent('name')  + ';expires = ' + new Date(0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">'user='</span>+ <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-string">'name'</span>)  + <span class="hljs-string">';expires = '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>)</code></pre>
<h3 id="articleHeader62">编写一个方法 求一个字符串的字节长度</h3>
<p>假设：一个英文字符占用一个字节，一个中文字符占用两个字节</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GetBytes(str){

        var len = str.length;

        var bytes = len;

        for(var i=0; i<len; i++){

            if (str.charCodeAt(i) > 255) bytes++;

        }

        return bytes;

    }

alert(GetBytes(&quot;你好,as&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetBytes</span><span class="hljs-params">(str)</span></span>{

        <span class="hljs-keyword">var</span> len = str.length;

        <span class="hljs-keyword">var</span> bytes = len;

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){

            <span class="hljs-keyword">if</span> (str.charCodeAt(i) &gt; <span class="hljs-number">255</span>) bytes++;

        }

        <span class="hljs-keyword">return</span> bytes;

    }

alert(GetBytes(<span class="hljs-string">"你好,as"</span>));</code></pre>
<h3 id="articleHeader63">请解释什么是事件代理</h3>
<p>事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。使用事件代理的好处是可以提高性能</p>
<h3 id="articleHeader64">attribute 和 property 的区别是什么？</h3>
<ul>
<li>attribute 是 dom 元素在文档中作为 html 标签拥有的属性；</li>
<li>property 就是 dom 元素在 js 中作为对象拥有的属性。</li>
<li>对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的</li>
<li>但是对于自定义的属性来说，他们是不同步的</li>
</ul>
<h3 id="articleHeader65">页面编码和被请求的资源编码如果不一致如何处理？</h3>
<ul>
<li>后端响应头设置 charset</li>
<li>前端页面<code>&lt;meta&gt;</code>设置 charset</li>
</ul>
<h3 id="articleHeader66">把 <code>&lt;script&gt;</code> 放在 <code>&lt;/body&gt;</code> 之前和之后有什么区别？浏览器会如何解析它们？</h3>
<p>按照 HTML 标准，在&lt;/body&gt;结束后出现<code>&lt;script&gt;</code>或任何元素的开始标签，都是解析错误<br>虽然不符合 HTML 标准，但浏览器会自动容错，使实际效果与写在<code>&lt;/body&gt;</code>之前没有区别<br>浏览器的容错机制会忽略<code>&lt;script&gt;</code>之前的&lt;/body&gt;，视作<code>&lt;script&gt;</code>仍在 body 体内。省略<code>&lt;/body&gt;</code>和<code>&lt;/html&gt;</code>闭合标签符合 HTML 标准，服务器可以利用这一标准</p>
<h3 id="articleHeader67">异步加载 JS 的方式有哪些？</h3>
<ul>
<li>设置<code>&lt;script&gt;</code>属性 async="async" （一旦脚本可用，则会异步执行）</li>
<li>动态创建 script DOM：document.createElement('script');</li>
<li>XmlHttpRequest 脚本注入</li>
<li>异步加载库 LABjs</li>
<li>模块加载器 Sea.js</li>
</ul>
<h3 id="articleHeader68">JavaScript 中，调用函数有哪几种方式？</h3>
<ul>
<li>方法调用模式 Foo.foo(arg1, arg2);</li>
<li>函数调用模式 foo(arg1, arg2);</li>
<li>构造器调用模式 (new Foo())(arg1, arg2);</li>
<li>call/applay 调用模式 Foo.foo.call(that, arg1, arg2);</li>
<li>bind 调用模式 Foo.foo.bind(that)(arg1, arg2)();</li>
</ul>
<h3 id="articleHeader69">简单实现 Function.bind 函数？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (!Function.prototype.bind) {
    Function.prototype.bind = function(that) {
      var func = this, args = arguments;
      return function() {
        return func.apply(that, Array.prototype.slice.call(args, 1));
      }
    }
  }
  // 只支持 bind 阶段的默认参数：
  func.bind(that, arg1, arg2)();

  // 不支持以下调用阶段传入的参数：
  func.bind(that)(arg1, arg2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>  <span class="hljs-keyword">if</span> (!<span class="hljs-type">Function</span>.prototype.bind) {
    <span class="hljs-type">Function</span>.prototype.bind = function(that) {
      <span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">this</span>, <span class="hljs-title">args</span> = <span class="hljs-title">arguments</span>;
      <span class="hljs-title">return</span> <span class="hljs-title">function</span><span class="hljs-params">()</span></span> {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">apply</span><span class="hljs-params">(that, Array.prototype.slice.call<span class="hljs-params">(args, <span class="hljs-number">1</span>)</span></span></span>);
      }
    }
  }
  <span class="hljs-comment">// 只支持 bind 阶段的默认参数：</span>
  <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">bind</span><span class="hljs-params">(that, arg1, arg2)</span></span>();

  <span class="hljs-comment">// 不支持以下调用阶段传入的参数：</span>
  <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">bind</span><span class="hljs-params">(that)</span></span>(arg1, arg2);</code></pre>
<h3 id="articleHeader70">列举一下 JavaScript 数组和对象有哪些原生方法</h3>
<ul>
<li>
<p>数组：</p>
<ul>
<li>arr.concat(arr1, arr2, arrn);</li>
<li>arr.join(",");</li>
<li>arr.sort(func);</li>
<li>arr.pop();</li>
<li>arr.push(e1, e2, en);</li>
<li>arr.shift();</li>
<li>unshift(e1, e2, en);</li>
<li>arr.reverse();</li>
<li>arr.slice(start, end);</li>
<li>arr.splice(index, count, e1, e2, en);</li>
<li>arr.indexOf(el);</li>
<li>arr.includes(el); // ES6</li>
</ul>
</li>
<li>
<p>对象：</p>
<ul>
<li>object.hasOwnProperty(prop);</li>
<li>object.propertyIsEnumerable(prop);</li>
<li>object.valueOf();</li>
<li>object.toString();</li>
<li>object.toLocaleString();</li>
<li>Class.prototype.isPropertyOf(object);</li>
</ul>
</li>
</ul>
<h3 id="articleHeader71">Array.splice() 与 Array.splice() 的区别？</h3>
<ul>
<li>
<p>slice -- “读取”数组指定的元素，不会对原数组进行修改</p>
<ul>
<li>语法：arr.slice(start, end)</li>
<li>start 指定选取开始位置（含）</li>
<li>end 指定选取结束位置（不含）</li>
</ul>
</li>
<li>
<p>splice</p>
<ul>
<li>“操作”数组指定的元素，会修改原数组，返回被删除的元素</li>
<li>语法：arr.splice(index, count, [insert Elements])</li>
<li>index 是操作的起始位置</li>
<li>count = 0 插入元素，count &gt; 0 删除元素</li>
<li>[insert Elements] 向数组新插入的元素</li>
</ul>
</li>
</ul>
<h3 id="articleHeader72">JavaScript 对象生命周期的理解？</h3>
<ul>
<li>当创建一个对象时，JavaScript 会自动为该对象分配适当的内存</li>
<li>垃圾回收器定期扫描对象，并计算引用了该对象的其他对象的数量</li>
<li>如果被引用数量为 0，或惟一引用是循环的，那么该对象的内存即可回收</li>
</ul>
<h3 id="articleHeader73">哪些操作会造成内存泄漏？</h3>
<ul>
<li>JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收</li>
<li>未使用 var 声明的全局变量</li>
<li>闭包函数(Closures)</li>
<li>循环引用(两个对象相互引用)</li>
<li>控制台日志(console.log)</li>
<li>移除存在绑定事件的 DOM 元素(IE)</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试绝对会考的JS问题！【已经开源】

## 原文链接
[https://segmentfault.com/a/1190000016712465](https://segmentfault.com/a/1190000016712465)


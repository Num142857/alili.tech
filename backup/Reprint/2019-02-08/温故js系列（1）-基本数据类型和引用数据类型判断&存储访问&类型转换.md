---
title: '温故js系列（1）-基本数据类型和引用数据类型判断&存储访问&类型转换' 
date: 2019-02-08 2:30:40
hidden: true
slug: 2xlooytsq1s
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/2" rel="nofollow noreferrer" target="_blank">数据类型</a></p>
<p>回味，无穷！</p>
<h2 id="articleHeader0">数据类型定义</h2>
<h3 id="articleHeader1">数据类型分类</h3>
<p>基本数据类型：<code>String,boolean,Number,Symbol（ES6新增）,Undefined, Null</code><br>引用数据类型：<code>Object</code><br>基本数据类型中有两个为特殊数据类型： <code>null, undefined</code> <br>js的常见内置对象：<code>Date,Array,Math,Number,Boolean,String,Array,RegExp,Function...</code></p>
<h3 id="articleHeader2">数据类型访问&amp;&amp;复制</h3>
<p>基本数据类型：基本数据类型值指保存在栈内存中的简单数据段。访问方式是按值访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var a</span> = 1;
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuxa?w=291&amp;h=183" src="https://static.alili.tech/img/bVCuxa?w=291&amp;h=183" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>操作的是变量实际保存的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">a</span> = <span class="hljs-number">2</span><span class="hljs-comment">;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuxr?w=289&amp;h=181" src="https://static.alili.tech/img/bVCuxr?w=289&amp;h=181" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>基本类型变量的复制：从一个变量向一个变量复制时，会在栈中创建一个新值，然后把值复制到为新变量分配的位置上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = a;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var b</span> = a;
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuyD?w=292&amp;h=181" src="https://static.alili.tech/img/bVCuyD?w=292&amp;h=181" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="b = 2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-attribute">b</span> = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuyH?w=291&amp;h=183" src="https://static.alili.tech/img/bVCuyH?w=291&amp;h=183" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>引用数据类型：引用数据类型值指保存在堆内存中的对象。也就是，变量中保存的实际上的只是一个指针，这个指针指向内存中的另一个位置，该位置保存着对象。访问方式是按引用访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Object();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuxD?w=578&amp;h=182" src="https://static.alili.tech/img/bVCuxD?w=578&amp;h=182" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当操作时，需要先从栈中读取内存地址，然后再延指针找到保存在堆内存中的值再操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.name = 'xz';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;">a.<span class="hljs-keyword">name</span> = <span class="hljs-string">'xz'</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuyr?w=579&amp;h=177" src="https://static.alili.tech/img/bVCuyr?w=579&amp;h=177" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>引用类型变量的复制：复制的是存储在栈中的指针，将指针复制到栈中未新变量分配的空间中，而这个指针副本和原指针指向存储在堆中的同一个对象；复制操作结束后，两个变量实际上将引用同一个对象。因此，在使用时，改变其中的一个变量的值，将影响另一个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = a;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var b</span> = a;
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuyT?w=577&amp;h=181" src="https://static.alili.tech/img/bVCuyT?w=577&amp;h=181" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="b.sex = 'boy';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">b.sex </span>= <span class="hljs-string">'boy'</span><span class="hljs-comment">;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVCuzt?w=579&amp;h=182" src="https://static.alili.tech/img/bVCuzt?w=579&amp;h=182" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>漏画了，差一条指针。b的引用指针也指向<code>object{sex:'boy'}</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="b.sex;  //'boy'   a.name; //'boy'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">b.sex;  <span class="hljs-regexp">//</span><span class="hljs-string">'boy'</span>   a.name; <span class="hljs-regexp">//</span><span class="hljs-string">'boy'</span></code></pre>
<h3 id="articleHeader3">堆&amp;栈</h3>
<p>两者都是存放临时数据的地方。<br>栈是先进后出的，就像一个桶，后进去的先出来，它下面本来有的东西要等其他出来之后才能出来。<br>堆是在程序运行时，而不是在程序编译时，申请某个大小的内存空间。即动态分配内存，对其访问和对一般内存的访问没有区别。对于堆，我们可以随心所欲的进行增加变量和删除变量，不用遵循次序。<br>栈区（stack） 由编译器自动分配释放   ，存放函数的参数值，局部变量的值等。 <br>堆区（heap）  一般由程序员分配释放，若程序员不释放，程序结束时可能由OS回收。 <br>堆（数据结构）：堆可以被看成是一棵树，如：堆排序； <br>栈（数据结构）：一种先进后出的数据结构。</p>
<h2 id="articleHeader4">数据类型检测</h2>
<h3 id="articleHeader5">Typeof</h3>
<p>typeof操作符是检测基本类型的最佳工具。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;undefined&quot; — 未定义
&quot;boolean&quot;   — 布尔值
&quot;string&quot;    — 字符串
&quot;number&quot;    — 数值
&quot;object&quot;    — 对象或null
&quot;function&quot;  — 函数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-string">"undefined"</span> — 未定义
<span class="hljs-string">"boolean"</span>   — 布尔值
<span class="hljs-string">"string"</span>    — 字符串
<span class="hljs-string">"number"</span>    — 数值
<span class="hljs-string">"object"</span>    — 对象或<span class="hljs-literal">null</span>
<span class="hljs-string">"function"</span>  — 函数
</code></pre>
<h3 id="articleHeader6">Instanceof</h3>
<p>instanceof用于检测引用类型，可以检测到它是什么类型的实例。<br>instanceof 检测一个对象A是不是另一个对象B的实例的原理是：查看对象B的prototype指向的对象是否在对象A的[[prototype]]链上。如果在，则返回true,如果不在则返回false。不过有一个特殊的情况，当对象B的prototype为null将会报错(类似于空指针异常)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sXzaver = new String(&quot;Xzavier&quot;); 
console.log(sXzaver instanceof String);   //  &quot;true&quot;
var aXzaver = [1,2,3]; 
console.log(aXzaver instanceof Array);   //  &quot;true&quot;
检测数组在ECMA Script5中定义了一个新方法Array.isArray()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> sXzaver = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">"Xzavier"</span>); 
<span class="hljs-built_in">console</span>.log(sXzaver <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>);   <span class="hljs-comment">//  "true"</span>
<span class="hljs-keyword">var</span> aXzaver = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]; 
<span class="hljs-built_in">console</span>.log(aXzaver <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);   <span class="hljs-comment">//  "true"</span>
检测数组在ECMA Script5中定义了一个新方法<span class="hljs-built_in">Array</span>.isArray()</code></pre>
<h3 id="articleHeader7">Constructor</h3>
<p>constructor属性返回对创建此对象的数组函数的引用。可以用于检测自定义类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'xz'.constructor == String // true
(123).constructor == Number // true
(true).constructor == Boolean // true
[1,2].constructor == Array // true
({name:'xz'}).constructor == Object // true
(function(){}).constructor == Function // true
(new Date()).constructor == Date // true
(Symbol()).constructor == Symbol // true
(/xz/).constructor == RegExp // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-string">'xz'</span><span class="hljs-selector-class">.constructor</span> == String <span class="hljs-comment">// true</span>
(<span class="hljs-number">123</span>)<span class="hljs-selector-class">.constructor</span> == Number <span class="hljs-comment">// true</span>
(true)<span class="hljs-selector-class">.constructor</span> == Boolean <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>]<span class="hljs-selector-class">.constructor</span> == Array <span class="hljs-comment">// true</span>
({name:<span class="hljs-string">'xz'</span>})<span class="hljs-selector-class">.constructor</span> == Object <span class="hljs-comment">// true</span>
(function(){})<span class="hljs-selector-class">.constructor</span> == Function <span class="hljs-comment">// true</span>
(new Date())<span class="hljs-selector-class">.constructor</span> == Date <span class="hljs-comment">// true</span>
(Symbol())<span class="hljs-selector-class">.constructor</span> == Symbol <span class="hljs-comment">// true</span>
(/xz/)<span class="hljs-selector-class">.constructor</span> == RegExp <span class="hljs-comment">// true</span>
</code></pre>
<p>constructor不适用于null和undefined。除了这些原生的，constructor还可验证自定义类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Xzavier(){}
var xz = new Xzavier();
xz.constructor == Xzavier;  // true 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Xzavier</span><span class="hljs-params">()</span></span>{}
<span class="hljs-keyword">var</span> xz = <span class="hljs-keyword">new</span> Xzavier();
xz.constructor == Xzavier;  <span class="hljs-comment">// true </span>
</code></pre>
<h3 id="articleHeader8">Object.prototype.toString.call(obj)</h3>
<p>推荐使用：Object.prototype.toString.call(obj)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原理：调用从Object继承来的原始的toString()方法

Object.prototype.toString.call('xz'); //&quot;[object String]&quot;
Object.prototype.toString.call(123);  //&quot;[object Number]&quot;
Object.prototype.toString.call(true); //&quot;[object Boolean]&quot;
Object.prototype.toString.call([1,2]); //&quot;[object Array]&quot;
Object.prototype.toString.call({name:'xz'}); //&quot;[object Object]&quot;
Object.prototype.toString.call(function(){}); //&quot;[object Function]&quot;
Object.prototype.toString.call(null); //&quot;[object Null]&quot;
Object.prototype.toString.call(undefined); //&quot;[object Undefined]&quot;
Object.prototype.toString.call(); //&quot;[object Undefined]&quot;
Object.prototype.toString.call(new Date()); //&quot;[object Date]&quot;
Object.prototype.toString.call(/xz/);  //&quot;[object RegExp]&quot;
Object.prototype.toString.call(Symbol()); //&quot;[object Symbol]&quot;

var obj = {name:&quot;Xzavier&quot;, age:23};
var a = [1,2,3];

function isType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
isType(obj);  // &quot;Object&quot; 
isType(a)  // &quot;Array&quot;  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>原理：调用从Object继承来的原始的<span class="hljs-built_in">toString</span>()方法

Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-string">'xz'</span>); <span class="hljs-comment">//"[object String]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-number">123</span>);  <span class="hljs-comment">//"[object Number]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">//"[object Boolean]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>]); <span class="hljs-comment">//"[object Array]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>({<span class="hljs-built_in">name</span>:<span class="hljs-string">'xz'</span>}); <span class="hljs-comment">//"[object Object]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(function(){}); <span class="hljs-comment">//"[object Function]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(null); <span class="hljs-comment">//"[object Null]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(undefined); <span class="hljs-comment">//"[object Undefined]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(); <span class="hljs-comment">//"[object Undefined]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(new <span class="hljs-built_in">Date</span>()); <span class="hljs-comment">//"[object Date]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(/xz/);  <span class="hljs-comment">//"[object RegExp]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(Symbol()); <span class="hljs-comment">//"[object Symbol]"</span>

var obj = {<span class="hljs-built_in">name</span>:<span class="hljs-string">"Xzavier"</span>, age:<span class="hljs-number">23</span>};
var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];

function isType(obj) {
    return Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(obj).slice(<span class="hljs-number">8</span>, -<span class="hljs-number">1</span>);
}
isType(obj);  <span class="hljs-comment">// "Object" </span>
isType(a)  <span class="hljs-comment">// "Array"  </span>
</code></pre>
<h2 id="articleHeader9">数据类型转换</h2>
<h3 id="articleHeader10">隐式转换</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined == null;  // true   
1 == true;  // true  
2 == true;  // false  
0 == false;  // true
0 == '';  // true   
NaN == NaN;  // false  NaN不等于任何值
[] == false;  // true  
[] == ![];  // true
'6' - '3'  // 3
1234 + 'abcd' // &quot;1234abcd&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">undefined</span> <span class="hljs-string">==</span> <span class="hljs-literal">null</span><span class="hljs-string">;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">true</span>   
<span class="hljs-number">1</span> <span class="hljs-string">==</span> <span class="hljs-literal">true</span><span class="hljs-string">;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">true</span>  
<span class="hljs-number">2</span> <span class="hljs-string">==</span> <span class="hljs-literal">true</span><span class="hljs-string">;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">false</span>  
<span class="hljs-number">0</span> <span class="hljs-string">==</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-number">0</span> <span class="hljs-string">==</span> <span class="hljs-string">''</span><span class="hljs-string">;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">true</span>   
<span class="hljs-string">NaN</span> <span class="hljs-string">==</span> <span class="hljs-string">NaN;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">false</span>  <span class="hljs-string">NaN不等于任何值</span>
<span class="hljs-string">[]</span> <span class="hljs-string">==</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span>  <span class="hljs-string">//</span> <span class="hljs-literal">true</span>  
<span class="hljs-string">[]</span> <span class="hljs-string">==</span> <span class="hljs-string">![];</span>  <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">'6'</span> <span class="hljs-bullet">-</span> <span class="hljs-string">'3'</span>  <span class="hljs-string">//</span> <span class="hljs-number">3</span>
<span class="hljs-number">1234</span> <span class="hljs-string">+</span> <span class="hljs-string">'abcd'</span> <span class="hljs-string">//</span> <span class="hljs-string">"1234abcd"</span></code></pre>
<p>1.undefined与null相等，但不恒等（===）<br>2.一个是number一个是string时，会尝试将string转换为number<br>3.隐式转换将boolean转换为number，0或1<br>4.隐式转换将Object转换成number或string，取决于另外一个对比量的类型<br>5.对于0、空字符串的判断，建议使用 “===” 。<br>6.“==”会对不同类型值进行类型转换再判断，“===”则不会。它会先判断两边的值类型，类型不匹配时直接为false。</p>
<h3 id="articleHeader11">显示转换</h3>
<p>显示转换一般指使用Number、String和Boolean三个构造函数，手动将各种类型的值，转换成数字、字符串或者布尔值。</p>
<h4>Number：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number('1234') // 1234
Number('1234abcd') // NaN
Number('') // 0
Number(true) // 1
Number(null) // 0
Number(undefined) // NaN
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">'1234'</span>)</span></span> <span class="hljs-comment">// 1234</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">'1234abcd'</span>)</span></span> <span class="hljs-comment">// NaN</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">''</span>)</span></span> <span class="hljs-comment">// 0</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(true)</span></span> <span class="hljs-comment">// 1</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(null)</span></span> <span class="hljs-comment">// 0</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(undefined)</span></span> <span class="hljs-comment">// NaN</span>
</code></pre>
<h4>String：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String(1234)  // &quot;1234&quot;
String('abcd')  // &quot;abcd&quot;
String(true)  // &quot;true&quot;
String(undefined) // &quot;undefined&quot;
String(null)  // &quot;null&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(<span class="hljs-number">1234</span>)</span></span>  <span class="hljs-comment">// "1234"</span>
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(<span class="hljs-string">'abcd'</span>)</span></span>  <span class="hljs-comment">// "abcd"</span>
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(true)</span></span>  <span class="hljs-comment">// "true"</span>
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(undefined)</span></span> <span class="hljs-comment">// "undefined"</span>
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(null)</span></span>  <span class="hljs-comment">// "null"</span>
</code></pre>
<h4>Boolean:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Boolean(0)  // false
Boolean(undefined)  // false
Boolean(null)  // false
Boolean(NaN)  // false
Boolean('')  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>  <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(undefined)</span></span>  <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(null)</span></span>  <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(NaN)</span></span>  <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(<span class="hljs-string">''</span>)</span></span>  <span class="hljs-comment">// false</span></code></pre>
<p>使用总，!!相当于Boolean：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!!'foo';   // true
!!'';      // false
!!'0';     // true
!!'1';     // true
!!'-1'     // true
!!{};      // true
!!true;    // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code>!!<span class="hljs-string">'foo'</span>;   // true
!!<span class="hljs-string">''</span>;      // false
!!<span class="hljs-string">'0'</span>;     // true
!!<span class="hljs-string">'1'</span>;     // true
!!<span class="hljs-string">'-1'</span>     // true
!!{};      // true
!!true;    // true
</code></pre>
<p>Number、String、Boolean转换对象时主要使用了对象内部的valueOf和toString方法进行转换。</p>
<h4>Number转换对象：</h4>
<p>1.先调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，返回结果。<br>2.如果valueOf返回的还是对象，继续调用对象自身的toString方法。如果toString返回原始类型的值，则对该值使用Number函数，返回结果。<br>3.如果toString返回的还是对象，报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number([1]); //1
转换演变：
[1].valueOf(); // [1];
[1].toString(); // '1';
Number('1'); //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Number</span>([<span class="hljs-number">1</span>]); <span class="hljs-comment">//1</span>
转换演变：
<span class="hljs-selector-attr">[1]</span><span class="hljs-selector-class">.valueOf</span>(); <span class="hljs-comment">// [1];</span>
<span class="hljs-selector-attr">[1]</span><span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">// '1';</span>
<span class="hljs-selector-tag">Number</span>(<span class="hljs-string">'1'</span>); <span class="hljs-comment">//1</span></code></pre>
<h4>String转换对象</h4>
<p>1.先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，返回结果。<br>2.如果toString返回的是对象，继续调用valueOf方法。如果valueOf返回原始类型的值，则对该值使用String函数，返回结果。<br>3.如果valueOf返回的还是对象，报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String([1,2]) //&quot;1,2&quot;
转化演变：
[1,2].toString();  //&quot;1,2&quot;
String(&quot;1,2&quot;);  //&quot;1,2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">String</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>]) <span class="hljs-comment">//"1,2"</span>
转化演变：
<span class="hljs-selector-attr">[1,2]</span><span class="hljs-selector-class">.toString</span>();  <span class="hljs-comment">//"1,2"</span>
<span class="hljs-selector-tag">String</span>(<span class="hljs-string">"1,2"</span>);  <span class="hljs-comment">//"1,2"</span></code></pre>
<h4>Boolean转换对象</h4>
<p>Boolean转换对象很特别，除了以下六个值转换为false，其他都为true</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined  null  false  0(包括+0和-0)  NaN  空字符串('')
Boolean(undefined)   //false
Boolean(null)        //false
Boolean(false)       //false
Boolean(0)           //false
Boolean(NaN)         //false
Boolean('')          //false

Boolean([])          //true
Boolean({})          //true
Boolean(new Date())  //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>undefined  null  false  <span class="hljs-number">0</span>(包括+<span class="hljs-number">0</span>和-<span class="hljs-number">0</span>)  NaN  空字符串(<span class="hljs-string">''</span>)
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(undefined)</span></span>   <span class="hljs-comment">//false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(null)</span></span>        <span class="hljs-comment">//false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(false)</span></span>       <span class="hljs-comment">//false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>           <span class="hljs-comment">//false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(NaN)</span></span>         <span class="hljs-comment">//false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(<span class="hljs-string">''</span>)</span></span>          <span class="hljs-comment">//false</span>

<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">([])</span></span>          <span class="hljs-comment">//true</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">({})</span></span>          <span class="hljs-comment">//true</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(new Date()</span></span>)  <span class="hljs-comment">//true</span>
</code></pre>
<p>写写博客打打球...要代码，要篮球，更要生活。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（1）-基本数据类型和引用数据类型判断&存储访问&类型转换

## 原文链接
[https://segmentfault.com/a/1190000005863067](https://segmentfault.com/a/1190000005863067)


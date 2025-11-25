---
title: 'JavaScript的数据类型及其检测' 
date: 2019-02-13 2:31:22
hidden: true
slug: iaieh127g4r
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016733921" src="https://static.alili.tech/img/remote/1460000016733921" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、JavaScript有几种类型的值？</h2>
<p>Javascript有两种数据类型，分别是基本数据类型和引用数据类型。其中基本数据类型包括Undefined、Null、Boolean、Number、String、Symbol (ES6新增，表示独一无二的值)，而引用数据类型统称为Object对象，主要包括对象、数组和函数。接下来我们分别看下两者的特点。</p>
<h2 id="articleHeader1">二、基本数据类型</h2>
<h3 id="articleHeader2">1.值是不可变的</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'java';
name.toUpperCase(); // 输出 'JAVA'
console.log(name); // 输出  'java'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">name</span> = <span class="hljs-string">'java'</span>;
<span class="hljs-keyword">name</span>.toUpperCase(); <span class="hljs-comment">// 输出 'JAVA'</span>
console.log(<span class="hljs-keyword">name</span>); <span class="hljs-comment">// 输出  'java'</span></code></pre>
<p>由此可得，基本数据类型的值是不可改变的</p>
<h3 id="articleHeader3">2.存放在栈区</h3>
<p>原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。</p>
<h3 id="articleHeader4">3.值的比较</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
var b = true;
console.log(a == b);    // true
console.log(a === b);   // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-literal">true</span>;
<span class="hljs-built_in">console</span>.log(a == b);    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(a === b);   <span class="hljs-comment">// false</span></code></pre>
<p>== : 只进行值的比较,会进行数据类型的转换。<br>=== : 不仅进行值得比较，还要进行数据类型的比较。</p>
<h2 id="articleHeader5">三、引用数据类型</h2>
<h3 id="articleHeader6">1.值是可变的</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a={age:20}；
a.age=21；
console.log(a.age)//21" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> a={age:<span class="hljs-number">20</span>}；
<span class="hljs-selector-tag">a</span>.age=<span class="hljs-number">21</span>；
console.log(<span class="hljs-selector-tag">a</span>.age)<span class="hljs-comment">//21</span></code></pre>
<p>上面代码说明引用类型可以拥有属性和方法，并且是可以动态改变的。</p>
<h3 id="articleHeader7">2.同时保存在栈内存和堆内存</h3>
<p>引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。<strong>当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016733922?w=501&amp;h=348" src="https://static.alili.tech/img/remote/1460000016733922?w=501&amp;h=348" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">3.比较是引用的比较</h3>
<p>当从一个变量向另一个变量赋引用类型的值时，同样也会将存储在变量中的对象的值复制一份放到为新变量分配的空间中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a={age:20};
var b=a;
b.age=21;
console.log(a.age==b.age)//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a={<span class="hljs-attr">age</span>:<span class="hljs-number">20</span>};
<span class="hljs-keyword">var</span> b=a;
b.age=<span class="hljs-number">21</span>;
<span class="hljs-built_in">console</span>.log(a.age==b.age)<span class="hljs-comment">//true</span></code></pre>
<p>上面我们讲到基本类型和引用类型存储于内存的位置不同，引用类型存储在堆中的对象，与此同时，在栈中存储了指针，而这个指针指向正是堆中实体的起始位置。变量a初始化时，a指针指向对象{age:20}的地址，a赋值给b后,b又指向该对象{age:20}的地址，这两个变量指向了同一个对象。因此，改变其中任何一个变量，都会相互影响。<br><span class="img-wrap"><img data-src="/img/remote/1460000016733923" src="https://static.alili.tech/img/remote/1460000016733923" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>此时，如果取消某一个变量对于原对象的引用，不会影响到另一个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a={age:20};
var b=a;
a = 1;
b // {age:20}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a={age:<span class="hljs-number">20</span>};
<span class="hljs-keyword">var</span> b=a;
a = <span class="hljs-number">1</span>;
b <span class="hljs-comment">// {age:20}</span></code></pre>
<p>上面代码中，a和b指向同一个对象，然后a的值变为1，这时不会对b产生影响，b还是指向原来的那个对象。</p>
<h2 id="articleHeader9">四、检验数据类型</h2>
<h3 id="articleHeader10">1.typeof</h3>
<p><strong>typeof返回一个表示数据类型的字符串</strong>，返回结果包括：number、boolean、string、symbol、object、undefined、function等7种数据类型，但不能判断null、array等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof Symbol(); // symbol 有效
typeof ''; // string 有效
typeof 1; // number 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof new Function(); // function 有效
typeof null; //object 无效
typeof [] ; //object 无效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>(); <span class="hljs-comment">// symbol 有效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-string">''</span>; <span class="hljs-comment">// string 有效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-number">1</span>; <span class="hljs-comment">// number 有效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">//boolean 有效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span>; <span class="hljs-comment">//undefined 有效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(); <span class="hljs-comment">// function 有效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">//object 无效</span>
<span class="hljs-keyword">typeof</span> [] ; <span class="hljs-comment">//object 无效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">//object 无效</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(); <span class="hljs-comment">//object 无效</span></code></pre>
<p>数组和对象返回的都是object，这时就需要使用instanceof来判断</p>
<h3 id="articleHeader11">2.instanceof</h3>
<p>instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。<strong>instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[] instanceof Array; //true
{} instanceof Object;//true
new Date() instanceof Date;//true
new RegExp() instanceof RegExp//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>[] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>; <span class="hljs-comment">//true</span>
{} <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>;<span class="hljs-comment">//true</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>;<span class="hljs-comment">//true</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>() <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">RegExp</span><span class="hljs-comment">//true</span></code></pre>
<p>关于数组的类型判断，还可以用ES6新增<strong>Array.isArray()</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.isArray([]);   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Array</span>.isArray([]);   // <span class="hljs-literal">true</span></code></pre>
<p><strong>instanceof 三大弊端</strong>：</p>
<ul><li>对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建的是有一定的区别的</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1 instanceof Number)//false
console.log(new Number(1) instanceof Number)//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Number</span>)<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">1</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Number</span>)<span class="hljs-comment">//true</span></code></pre>
<p>从严格意义上来讲，只有实例创建出来的结果才是标准的对象数据类型值，也是标准的Number这个类的一个实例；对于字面量方式创建出来的结果是基本的数据类型值，不是严谨的实例，但是由于JS的松散特点，导致了可以使用Number.prototype上提供的方法。</p>
<ul><li>只要在当前实例的原型链上，我们用其检测出来的结果都是true。<strong>在类的原型继承中，我们最后检测出来的结果未必准确</strong>。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3];
console.log(arr instanceof Array) // true
console.log(arr instanceof Object);  // true
function fn(){}
console.log(fn instanceof Function)// true
console.log(fn instanceof Object)// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);  <span class="hljs-comment">// true</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-built_in">console</span>.log(fn <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)<span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(fn <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>)<span class="hljs-comment">// true</span></code></pre>
<ul><li>不能检测null 和 undefined</li></ul>
<p><strong>对于特殊的数据类型null和undefined，他们的所属类是Null和Undefined，但是浏览器把这两个类保护起来了，不允许我们在外面访问使用</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016733924?w=617&amp;h=121" src="https://static.alili.tech/img/remote/1460000016733924?w=617&amp;h=121" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">3.严格运算符===</h3>
<p><strong>只能用于判断null和undefined，因为这两种类型的值都是唯一的</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = null
typeof a // &quot;object&quot;
a === null // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>var <span class="hljs-keyword">a</span> = <span class="hljs-literal">null</span>
typeof <span class="hljs-keyword">a</span><span class="hljs-comment"> // "object"</span>
<span class="hljs-keyword">a</span> === <span class="hljs-literal">null</span><span class="hljs-comment"> // true</span></code></pre>
<p>undefined 还可以用typeof来判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = undefined;
typeof b === &quot;undefined&quot; // true
b === undefined // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> b = <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">typeof</span> b === <span class="hljs-string">"undefined"</span> <span class="hljs-comment">// true</span>
b === <span class="hljs-literal">undefined</span> <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader13">4.constructor</h3>
<p>constructor作用和instanceof非常相似。<strong>但constructor检测 Object与instanceof不一样，还可以处理基本数据类型的检测。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aa=[1,2];
console.log(aa.constructor===Array);//true
console.log(aa.constructor===RegExp);//false
console.log((1).constructor===Number);//true
var reg=/^$/;
console.log(reg.constructor===RegExp);//true
console.log(reg.constructor===Object);//false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> aa=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
<span class="hljs-built_in">console</span>.log(aa.constructor===<span class="hljs-built_in">Array</span>);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(aa.constructor===<span class="hljs-built_in">RegExp</span>);<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-number">1</span>).constructor===<span class="hljs-built_in">Number</span>);<span class="hljs-comment">//true</span>
<span class="hljs-keyword">var</span> reg=<span class="hljs-regexp">/^$/</span>;
<span class="hljs-built_in">console</span>.log(reg.constructor===<span class="hljs-built_in">RegExp</span>);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(reg.constructor===<span class="hljs-built_in">Object</span>);<span class="hljs-comment">//false </span></code></pre>
<p><strong>constructor 两大弊端</strong>：</p>
<ul>
<li>null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。</li>
<li>函数的 constructor 是不稳定的，这个主要体现在把类的原型进行重写，在重写的过程中很有可能出现把之前的constructor给覆盖了，这样检测出来的结果就是不准确的</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Fn(){}
Fn.prototype = new Array()
var f = new Fn
console.log(f.constructor)//Array" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>)</span>{}
Fn.prototype = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>()
<span class="hljs-keyword">var</span> f = <span class="hljs-keyword">new</span> Fn
<span class="hljs-built_in">console</span>.log(f.constructor)<span class="hljs-comment">//Array</span></code></pre>
<h3 id="articleHeader14">5.Object.prototype.toString.call()</h3>
<p><strong>Object.prototype.toString.call() 最准确最常用的方式</strong>。首先获取Object原型上的toString方法，让方法执行，让toString方法中的this指向第一个参数的值。</p>
<p><strong>关于toString重要补充说明</strong>：</p>
<ul>
<li>本意是转换为字符串，但是某些toString方法不仅仅是转换为字符串</li>
<li>对于Number、String，Boolean，Array，RegExp、Date、Function原型上的toString方法都是把当前的数据类型转换为字符串的类型（它们的作用仅仅是用来转换为字符串的）</li>
<li>Object上的toString并不是用来转换为字符串的。</li>
</ul>
<p>Object上的toString它的作用是返回当前方法执行的主体（方法中的this）所属类的详细信息即"[object Object]",其中第一个object代表当前实例是对象数据类型的(这个是固定死的)，第二个Object代表的是this所属的类是Object。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call('') ;   // [object <span class="hljs-type">String</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(1) ;    // [object <span class="hljs-type">Number</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(true) ; // [object <span class="hljs-type">Boolean</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(undefined) ; // [object <span class="hljs-type">Undefined</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(null) ; // [object <span class="hljs-type">Null</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(new <span class="hljs-type">Function</span>()) ; // [object <span class="hljs-type">Function</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(new <span class="hljs-type">Date</span>()) ; // [object <span class="hljs-type">Date</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call([]) ; // [object <span class="hljs-type">Array</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(new <span class="hljs-type">RegExp</span>()) ; // [object <span class="hljs-type">RegExp</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(new <span class="hljs-type">Error</span>()) ; // [object <span class="hljs-type">Error</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(document) ; // [object <span class="hljs-type">HTMLDocument</span>]
<span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(window) ; //[object global] window是全局对象global的引用</code></pre>
<p><strong>文章于2018.10.10重新修改，希望对大家有些许帮忙！</strong></p>
<p><strong>如果觉得文章对你有些许帮助，欢迎在<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">我的GitHub博客</a>点赞和关注，感激不尽！</strong></p>
<h3 id="articleHeader15">参考资料</h3>
<p>【文章】[[ JS 进阶 ] 基本类型 引用类型 简单赋值 对象引用](<a href="https://segmentfault.com/a/1190000002789651)">https://segmentfault.com/a/11...</a>（推荐）</p>
<p><a href="https://blog.csdn.net/donggx/article/details/71453103" rel="nofollow noreferrer" target="_blank">JS判断数据类型的三种方法</a></p>
<p><a href="https://github.com/muwenzi/Program-Blog/issues/17" rel="nofollow noreferrer" target="_blank">JS中的数据类型及判断</a></p>
<p><a href="https://juejin.im/entry/5964a1c15188250d8b65ef5f" rel="nofollow noreferrer" target="_blank">Javascript 判断变量类型的陷阱 与 正确的处理方式</a></p>
<p><a href="https://www.cnblogs.com/onepixel/p/5126046.html" rel="nofollow noreferrer" target="_blank">判断JS数据类型的四种方法</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript的数据类型及其检测

## 原文链接
[https://segmentfault.com/a/1190000016733918](https://segmentfault.com/a/1190000016733918)


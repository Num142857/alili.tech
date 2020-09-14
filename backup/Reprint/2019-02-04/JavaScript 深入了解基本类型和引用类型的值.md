---
title: 'JavaScript 深入了解基本类型和引用类型的值' 
date: 2019-02-04 2:30:58
hidden: true
slug: qltictbiv99
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://blog.percymong.com/2016/08/28/javascript-two-data-type/" rel="nofollow noreferrer" target="_blank">原文链接</a></p></blockquote>
<p>一个变量可以存放两种类型的值，基本类型的值（primitive values）和引用类型的值（reference values）。</p>
<p>ES6 引入了一种新的原始数据类型 <strong>Symbol</strong>，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。</p>
<h3 id="articleHeader0">基本类型</h3>
<p>JavaScript 中共有 6 种基本数据类型：<code>Undefined</code>、<code>Null</code>、<code>Boolean</code>、<code>Number</code>、<code>String</code>、<code>Symbol (new in ES 6)</code> ！</p>
<p><strong>约定：</strong><code>基本数据类型</code>与<code>原始数据类型</code>等意。</p>
<p><strong>基本数据类型的值是按值访问的。</strong></p>
<ul>
<li>
<p>基本类型的值是不可变的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;123hello321&quot;;
str.toUpperCase();     // 123HELLO321
console.log(str);      // 123hello321" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"123hello321"</span>;
str.toUpperCase();     <span class="hljs-comment">// 123HELLO321</span>
<span class="hljs-built_in">console</span>.log(str);      <span class="hljs-comment">// 123hello321</span></code></pre>
</li>
<li>
<p>基本类型的比较是它们的值的比较</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
var b = true;
console.log(a == b);    // true
console.log(a === b);   // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-literal">true</span>;
<span class="hljs-built_in">console</span>.log(a == b);    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(a === b);   <span class="hljs-comment">// false</span></code></pre>
<p>上面 a 和 b 的数据类型不同，但是也可以进行值的比较，这是因为在比较之前，自动进行了数据类型的 <code>隐式转换</code>。</p>
<ul>
<li><p><code>==</code> : 只进行值的比较</p></li>
<li><p><code>===</code> : 不仅进行值得比较，还要进行数据类型的比较</p></li>
</ul>
</li>
<li>
<p>基本类型的变量是存放在栈内存（Stack）里的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a,b;
a = &quot;zyj&quot;;
b = a;
console.log(a);   // zyj
console.log(b);   // zyj
a = &quot;呵呵&quot;;       // 改变 a 的值，并不影响 b 的值
console.log(a);   // 呵呵
console.log(b);   // zyj" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a,b;
a = <span class="hljs-string">"zyj"</span>;
b = a;
<span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">// zyj</span>
<span class="hljs-built_in">console</span>.log(b);   <span class="hljs-comment">// zyj</span>
a = <span class="hljs-string">"呵呵"</span>;       <span class="hljs-comment">// 改变 a 的值，并不影响 b 的值</span>
<span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">// 呵呵</span>
<span class="hljs-built_in">console</span>.log(b);   <span class="hljs-comment">// zyj</span></code></pre>
</li>
</ul>
<p>图解如下：栈内存中包括了变量的标识符和变量的值</p>
<p><span class="img-wrap"><img data-src="/img/bVCunf" src="https://static.alili.tech/img/bVCunf" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">引用类型</h3>
<p>除过上面的 6 种基本数据类型外，剩下的就是引用类型了，统称为 <code>Object 类型</code>。细分的话，有：<code>Object 类型</code>、<code>Array 类型</code>、<code>Date 类型</code>、<code>RegExp 类型</code>、<code>Function 类型</code> 等。</p>
<p><strong>引用类型的值是按引用访问的。</strong></p>
<ul>
<li>
<p>引用类型的值是可变的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {name:&quot;zyj&quot;};   // 创建一个对象
obj.name = &quot;percy&quot;;       // 改变 name 属性的值
obj.age = 21;             // 添加 age 属性
obj.giveMeAll = function(){
  return this.name + &quot; : &quot; + this.age;
};                        // 添加 giveMeAll 方法
obj.giveMeAll();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>:<span class="hljs-string">"zyj"</span>};   <span class="hljs-comment">// 创建一个对象</span>
obj.name = <span class="hljs-string">"percy"</span>;       <span class="hljs-comment">// 改变 name 属性的值</span>
obj.age = <span class="hljs-number">21</span>;             <span class="hljs-comment">// 添加 age 属性</span>
obj.giveMeAll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name + <span class="hljs-string">" : "</span> + <span class="hljs-keyword">this</span>.age;
};                        <span class="hljs-comment">// 添加 giveMeAll 方法</span>
obj.giveMeAll();</code></pre>
</li>
<li>
<p>引用类型的比较是引用的比较</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {};    // 新建一个空对象 obj1
var obj2 = {};    // 新建一个空对象 obj2
console.log(obj1 == obj2);    // false
console.log(obj1 === obj2);   // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj1 = {};    <span class="hljs-comment">// 新建一个空对象 obj1</span>
<span class="hljs-keyword">var</span> obj2 = {};    <span class="hljs-comment">// 新建一个空对象 obj2</span>
<span class="hljs-built_in">console</span>.log(obj1 == obj2);    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(obj1 === obj2);   <span class="hljs-comment">// false</span></code></pre>
<p>因为 obj1 和 obj2 分别引用的是存放在堆内存中的2个不同的对象，故变量 obj1 和 obj2 的值（引用地址）也是不一样的！</p>
</li>
<li>
<p>引用类型的值是保存在堆内存（Heap）中的对象（Object）<br> 与其他编程语言不同，JavaScript 不能直接操作对象的内存空间（堆内存）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {name:&quot;percy&quot;};
var b;
b = a;
a.name = &quot;zyj&quot;;
console.log(b.name);    // zyj
b.age = 22;
console.log(a.age);     // 22
var c = {
  name: &quot;zyj&quot;,
  age: 22
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">name</span>:<span class="hljs-string">"percy"</span>};
<span class="hljs-keyword">var</span> b;
b = a;
a.name = <span class="hljs-string">"zyj"</span>;
<span class="hljs-built_in">console</span>.log(b.name);    <span class="hljs-comment">// zyj</span>
b.age = <span class="hljs-number">22</span>;
<span class="hljs-built_in">console</span>.log(a.age);     <span class="hljs-comment">// 22</span>
<span class="hljs-keyword">var</span> c = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"zyj"</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>
};</code></pre>
</li>
</ul>
<p>图解如下：</p>
<ul>
<li><p>栈内存中保存了变量标识符和指向堆内存中该对象的指针</p></li>
<li><p>堆内存中保存了对象的内容</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVCuGx" src="https://static.alili.tech/img/bVCuGx" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">检测类型</h3>
<ul>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof" rel="nofollow noreferrer" target="_blank">typeof</a>：经常用来检测一个变量是不是最基本的数据类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a;
typeof a;    // undefined

a = null;
typeof a;    // object

a = true;
typeof a;    // boolean

a = 666;
typeof a;    // number 

a = &quot;hello&quot;;
typeof a;    // string

a = Symbol();
typeof a;    // symbol

a = function(){}
typeof a;    // function

a = [];
typeof a;    // object
a = {};
typeof a;    // object
a = /aaa/g;
typeof a;    // object   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a;
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// undefined</span>

a = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// object</span>

a = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// boolean</span>

a = <span class="hljs-number">666</span>;
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// number </span>

a = <span class="hljs-string">"hello"</span>;
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// string</span>

a = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// symbol</span>

a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// function</span>

a = [];
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// object</span>
a = {};
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// object</span>
a = <span class="hljs-regexp">/aaa/g</span>;
<span class="hljs-keyword">typeof</span> a;    <span class="hljs-comment">// object   </span></code></pre>
</li>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof" rel="nofollow noreferrer" target="_blank">instanceof</a>：用来判断某个构造函数的 prototype 属性所指向的对象是否存在于另外一个要检测对象的原型链上</p>
<ul><li>
<p>简单说就是判断一个引用类型的变量具体是不是某种类型的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="({}) instanceof Object              // true
([]) instanceof Array               // true
(/aa/g) instanceof RegExp           // true
(function(){}) instanceof Function  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">({}) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>              <span class="hljs-comment">// true</span>
([]) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>               <span class="hljs-comment">// true</span>
(<span class="hljs-regexp">/aa/g</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">RegExp</span>           <span class="hljs-comment">// true</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>  <span class="hljs-comment">// true</span></code></pre>
</li></ul>
</li>
</ul>
<p>更详细的类型检测请看参考资料！</p>
<p>有错误的地方，欢迎大家指出来！</p>
<h3 id="articleHeader3">参考资料</h3>
<ul>
<li><p>【文章】<a href="https://segmentfault.com/a/1190000002789651">[ JS 进阶 ] 基本类型 引用类型 简单赋值 对象引用</a>（推荐）</p></li>
<li><p>【Stack Overflow】<a href="http://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value" rel="nofollow noreferrer" target="_blank">Javascript by reference vs. by value</a></p></li>
<li><p>【文章】[[JS] 让人犯晕的JavaScript变量赋值](<a href="http://hellobug.github.io/blog/javascript-variable-assignment/)" rel="nofollow noreferrer" target="_blank">http://hellobug.github.io/blo...</a></p></li>
<li><p>【文章】<a href="http://harttle.com/2015/09/18/js-type-checking.html" rel="nofollow noreferrer" target="_blank">如何检查JavaScript变量类型？</a>（推荐）</p></li>
<li><p>【文章】<a href="http://www.ruanyifeng.com/blog/2013/11/stack.html" rel="nofollow noreferrer" target="_blank">Stack的三种含义</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 深入了解基本类型和引用类型的值

## 原文链接
[https://segmentfault.com/a/1190000006752076](https://segmentfault.com/a/1190000006752076)


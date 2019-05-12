---
title: '快速掌握JavaScript面试基础知识(一)' 
date: 2018-12-16 2:30:10
hidden: true
slug: kppkwmhtzn
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> 总结了大量JavaScript基本知识点，很有用！</p>
<ul><li>原文: <a href="https://medium.freecodecamp.org/the-definitive-javascript-handbook-for-a-developer-interview-44ffc6aeb54e" rel="nofollow noreferrer" target="_blank">The Definitive JavaScript Handbook for your next developer interview</a>
</li></ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p>根据<a href="https://insights.stackoverflow.com/survey/2017#most-popular-technologies" rel="nofollow noreferrer" target="_blank">StackOverflow调查</a>， 自2014年一来，JavaScript是最流行的编程语言。当然，这也在情理之中，毕竟1/3的开发工作都需要一些JavaScript知识。因此，如果你希望在成为一个开发者，你应该学会这门语言。</p>
<p>这篇博客的主要目的是将所有面试中常见的概念总结，方便你快速去了解。<br>(译者按：鉴于本文内容过长，方便阅读，将分为三篇博客来翻译。)</p>
<h2 id="articleHeader0">类型和类型转换</h2>
<p>在JavaScript中有7个内置类型：<code>null</code>，<code>undefined</code>，<code>boolean</code>，<code>number</code>，<code>string</code>，<code>object</code>，和<code>symbol</code>(ES6)。</p>
<p>除了<code>object</code>以外，其它都叫做基本类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof 0              // number
typeof true           // boolean
typeof 'Hello'        // string
typeof Math           // object
typeof null           // object  !!
typeof Symbol('Hi')   // symbol (New ES6)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span> <span class="hljs-number">0</span>              <span class="hljs-comment">// number</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">true</span>           <span class="hljs-comment">// boolean</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-string">'Hello'</span>        <span class="hljs-comment">// string</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Math</span>           <span class="hljs-comment">// object</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>           <span class="hljs-comment">// object  !!</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'Hi'</span>)   <span class="hljs-comment">// symbol (New ES6)</span></code></pre>
<ul><li>Null vs. Undefined</li></ul>
<p><strong>Undefined</strong>表示未定义。对于没有初始化的变量、函数调用时候未提供的函数参数、缺失的对象属性，它们的默认值就是<code>undefined</code>。如果一个函数没有返回语句，那么默认的返回值也是<code>undefined</code>。</p>
<p><strong>NUll</strong>表示值为空。一个变量我们可以将其赋值为<code>null</code>，表示当前的没有值。</p>
<ul><li>隐式转换</li></ul>
<p>请看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'Joey';
if (name) {
  console.log(name + &quot; doesn't share food!&quot;)  // Joey doesn’t share food!
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'Joey'</span>;
<span class="hljs-keyword">if</span> (name) {
  <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">" doesn't share food!"</span>)  <span class="hljs-comment">// Joey doesn’t share food!</span>
}</code></pre>
<p>在<code>if</code>语句的条件判断中，<code>name</code>从字符串转换为布尔型。在<code>if</code>的代码块中，在控制台将<code>name</code>原原本本打印出来。你知道在什么情况下字符串会转换为真，什么时候为假么？</p>
<p><code>""</code>，<code>0</code>， <code>null</code>，<code>undefined</code>, <code>NaN</code>, <code>false</code> 会自动转换为<code>false</code>。其它的都会转换为真：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Boolean(null)         // false
Boolean('hello')      // true 
Boolean('0')          // true 
Boolean(' ')          // true 
Boolean([])           // true 
Boolean(function(){}) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">null</span>)         <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Boolean</span>(<span class="hljs-string">'hello'</span>)      <span class="hljs-comment">// true </span>
<span class="hljs-built_in">Boolean</span>(<span class="hljs-string">'0'</span>)          <span class="hljs-comment">// true </span>
<span class="hljs-built_in">Boolean</span>(<span class="hljs-string">' '</span>)          <span class="hljs-comment">// true </span>
<span class="hljs-built_in">Boolean</span>([])           <span class="hljs-comment">// true </span>
<span class="hljs-built_in">Boolean</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}) <span class="hljs-comment">// true</span></code></pre>
<p>空数组、对象、函数定义都会自动转换为真。</p>
<ul><li>String &amp; Number之间的转换</li></ul>
<p>第一个你要非常小心的是<code>+</code>操作符。因为它同时用于数字相加和字符串拼接。</p>
<p><code>*</code>,<code>/</code>,<code>-</code>只用于数字运算，当这些操作符和字符串一起使用，那么字符串会被强制转换为数字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + &quot;2&quot; = &quot;12&quot;
&quot;&quot; + 1 + 0 = &quot;10&quot;
&quot;&quot; - 1 + 0 = -1
&quot;-9\n&quot; + 5 = &quot;-9\n5&quot;
&quot;-9\n&quot; - 5 = -14
&quot;2&quot; * &quot;3&quot; = 6
4 + 5 + &quot;px&quot; = &quot;9px&quot;
&quot;$&quot; + 4 + 5 = &quot;$45&quot;
&quot;4&quot; - 2 = 2
&quot;4px&quot; - 2 = NaN
null + 1 = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span> + <span class="hljs-string">"2"</span> = <span class="hljs-string">"12"</span>
<span class="hljs-string">""</span> + <span class="hljs-number">1</span> + <span class="hljs-number">0</span> = <span class="hljs-string">"10"</span>
<span class="hljs-string">""</span> - <span class="hljs-number">1</span> + <span class="hljs-number">0</span> = <span class="hljs-number">-1</span>
<span class="hljs-string">"-9\n"</span> + <span class="hljs-number">5</span> = <span class="hljs-string">"-9\n5"</span>
<span class="hljs-string">"-9\n"</span> - <span class="hljs-number">5</span> = <span class="hljs-number">-14</span>
<span class="hljs-string">"2"</span> * <span class="hljs-string">"3"</span> = <span class="hljs-number">6</span>
<span class="hljs-number">4</span> + <span class="hljs-number">5</span> + <span class="hljs-string">"px"</span> = <span class="hljs-string">"9px"</span>
<span class="hljs-string">"$"</span> + <span class="hljs-number">4</span> + <span class="hljs-number">5</span> = <span class="hljs-string">"$45"</span>
<span class="hljs-string">"4"</span> - <span class="hljs-number">2</span> = <span class="hljs-number">2</span>
<span class="hljs-string">"4px"</span> - <span class="hljs-number">2</span> = <span class="hljs-literal">NaN</span>
<span class="hljs-literal">null</span> + <span class="hljs-number">1</span> = <span class="hljs-number">1</span></code></pre>
<ul><li>== vs. ===</li></ul>
<p>一个广泛被接受的认知就是：<code>==</code>判断值是否相等，<code>===</code>同时判断值是否相等和类型是否相同。但是，这里有些误解。</p>
<p>实际上，<code>==</code>在验证相等性的时候，会对类型不同的值做一个类型转换。<code>===</code>对要判断的值不做类型转换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2 == '2'            // True
2 === '2'           // False
undefined == null   // True
undefined === null  // False" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">2</span> == <span class="hljs-string">'2'</span>            <span class="hljs-comment">// True</span>
<span class="hljs-number">2</span> === <span class="hljs-string">'2'</span>           <span class="hljs-comment">// False</span>
<span class="hljs-literal">undefined</span> == <span class="hljs-literal">null</span>   <span class="hljs-comment">// True</span>
<span class="hljs-literal">undefined</span> === <span class="hljs-literal">null</span>  <span class="hljs-comment">// False</span></code></pre>
<p>类型转换有很多取巧的地方，要注意：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = '0';
console.log(Boolean(a)); // True
let b = false;
console.log(Boolean(b)); // False" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> a = <span class="hljs-string">'0'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Boolean</span>(a)); <span class="hljs-comment">// True</span>
<span class="hljs-keyword">let</span> b = <span class="hljs-literal">false</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Boolean</span>(b)); <span class="hljs-comment">// False</span></code></pre>
<p>你认为下面的相等判断会输出什么值呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a == b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(a == b);</code></pre>
<p>实际上会返回true。知道为什么吗？<br>如果你将一个布尔类型的和非布尔类型的判断，JavaScript会将布尔类型的转换为数字然后再比对。<br>执行过程如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'0' == false   (1)
'0' == 0       (2)
 0  == 0       (3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'0'</span> == <span class="hljs-literal">false</span>   (<span class="hljs-number">1</span>)
<span class="hljs-string">'0'</span> == <span class="hljs-number">0</span>       (<span class="hljs-number">2</span>)
 <span class="hljs-number">0</span>  == <span class="hljs-number">0</span>       (<span class="hljs-number">3</span>)</code></pre>
<p>所以，最终变成了<code>0==0</code>，当然返回true啦。</p>
<p>如果你想看完整的资料，请查看ES5的<a href="http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<p>如果想看cheat sheet, 点击<a href="http://dorey.github.io/JavaScript-Equality-Table/" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>一些比较容易掉坑的比较，我在这里列出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="false == &quot;&quot;  // true
false == []  // true
false == {}  // false
&quot;&quot; == 0      // true
&quot;&quot; == []     // true
&quot;&quot; == {}     // false
0 == []      // true
0 == {}      // false
0 == null    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">false</span> == <span class="hljs-string">""</span>  <span class="hljs-comment">// true</span>
<span class="hljs-literal">false</span> == []  <span class="hljs-comment">// true</span>
<span class="hljs-literal">false</span> == {}  <span class="hljs-comment">// false</span>
<span class="hljs-string">""</span> == <span class="hljs-number">0</span>      <span class="hljs-comment">// true</span>
<span class="hljs-string">""</span> == []     <span class="hljs-comment">// true</span>
<span class="hljs-string">""</span> == {}     <span class="hljs-comment">// false</span>
<span class="hljs-number">0</span> == []      <span class="hljs-comment">// true</span>
<span class="hljs-number">0</span> == {}      <span class="hljs-comment">// false</span>
<span class="hljs-number">0</span> == <span class="hljs-literal">null</span>    <span class="hljs-comment">// false</span></code></pre>
<h2 id="articleHeader1">值 vs. 引用</h2>
<p>对于基本类型的值，赋值是通过值拷贝的形式；比如：<code>null</code>，<code>undefined</code>，<code>boolean</code>，<code>number</code>，<code>string</code>和ES6的<code>symbol</code>。对于复杂类型的值，通过引用拷贝的形式赋值。比如：对象、对象包括数组和函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 2;        // 'a' hold a copy of the value 2.
var b = a;        // 'b' is always a copy of the value in 'a'
b++;
console.log(a);   // 2
console.log(b);   // 3
var c = [1,2,3];
var d = c;        // 'd' is a reference to the shared value
d.push( 4 );      // Mutates the referenced value (object)
console.log(c);   // [1,2,3,4]
console.log(d);   // [1,2,3,4]
/* Compound values are equal by reference */
var e = [1,2,3,4];
console.log(c === d);  // true
console.log(c === e);  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;        <span class="hljs-comment">// 'a' hold a copy of the value 2.</span>
<span class="hljs-keyword">var</span> b = a;        <span class="hljs-comment">// 'b' is always a copy of the value in 'a'</span>
b++;
<span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(b);   <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">var</span> c = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> d = c;        <span class="hljs-comment">// 'd' is a reference to the shared value</span>
d.push( <span class="hljs-number">4</span> );      <span class="hljs-comment">// Mutates the referenced value (object)</span>
<span class="hljs-built_in">console</span>.log(c);   <span class="hljs-comment">// [1,2,3,4]</span>
<span class="hljs-built_in">console</span>.log(d);   <span class="hljs-comment">// [1,2,3,4]</span>
<span class="hljs-comment">/* Compound values are equal by reference */</span>
<span class="hljs-keyword">var</span> e = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
<span class="hljs-built_in">console</span>.log(c === d);  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(c === e);  <span class="hljs-comment">// false</span></code></pre>
<p>如果想对复杂类型的值进行值拷贝，你需要自己去对所有子元素进行拷贝。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const copy = c.slice()    // 'copy' 即使copy和c相同，但是copy指向新的值
console.log(c);           // [1,2,3,4]
console.log(copy);        // [1,2,3,4]
console.log(c === copy);  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> copy = c.slice()    <span class="hljs-comment">// 'copy' 即使copy和c相同，但是copy指向新的值</span>
<span class="hljs-built_in">console</span>.log(c);           <span class="hljs-comment">// [1,2,3,4]</span>
<span class="hljs-built_in">console</span>.log(copy);        <span class="hljs-comment">// [1,2,3,4]</span>
<span class="hljs-built_in">console</span>.log(c === copy);  <span class="hljs-comment">// false</span></code></pre>
<p><em><a href="https://fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>提供实时、专业的错误监控服务，为您的线上代码保驾护航，欢迎大家免费使用！</em></p>
<h2 id="articleHeader2">作用域(Scope)</h2>
<p>作用域值程序的执行环境，它包含了在当前位置可访问的变量和函数。</p>
<p><strong>全局作用域</strong>是最外层的作用域，在函数外面定义的变量属于全局作用域，可以被任何其他子作用域访问。在浏览器中，window对象就是全局作用域。</p>
<p><strong>局部作用域</strong>是在函数内部的作用域。在局部作用域定义的变量只能在该作用域以及其子作用域被访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function outer() {
  let a = 1;
  function inner() {
    let b = 2;
    function innermost() {
      let c = 3;
      console.log(a, b, c);   // 1 2 3
    }
    innermost();
    console.log(a, b);        // 1 2 — 'c' is not defined
  }
  inner();
  console.log(a);             // 1 — 'b' and 'c' are not defined
}
outer();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outer</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> b = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innermost</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">let</span> c = <span class="hljs-number">3</span>;
      <span class="hljs-built_in">console</span>.log(a, b, c);   <span class="hljs-comment">// 1 2 3</span>
    }
    innermost();
    <span class="hljs-built_in">console</span>.log(a, b);        <span class="hljs-comment">// 1 2 — 'c' is not defined</span>
  }
  inner();
  <span class="hljs-built_in">console</span>.log(a);             <span class="hljs-comment">// 1 — 'b' and 'c' are not defined</span>
}
outer();</code></pre>
<p>你可以将作用域想象成一系列不断变小的门。如果一个个子不高的人可以穿过最小的门(局部最小作用域)，那么必然可以穿过任何比它大的门(外部作用域)。</p>
<h2 id="articleHeader3">提升(Hoisting)</h2>
<p>在编译过程中，将<code>var</code>和<code>function</code>的定义移动到他们作用域最前面的行为叫做提升。</p>
<p>整个函数定义会被提升。所以，你可以在函数还未定义之前调用它，而不用担心找不到该函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(toSquare(3));  // 9

function toSquare(n){
  return n*n;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(toSquare(<span class="hljs-number">3</span>));  <span class="hljs-comment">// 9</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toSquare</span>(<span class="hljs-params">n</span>)</span>{
  <span class="hljs-keyword">return</span> n*n;
}</code></pre>
<p>变量只会被部分提升。而且只有变量的声明会被提升，赋值不会动。</p>
<p><code>let</code>和<code>const</code>不会被提升。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{  /* Original code */
  console.log(i);  // undefined
  var i = 10
  console.log(i);  // 10
}

{  /* Compilation phase */
  var i;
  console.log(i);  // undefined
  i = 10
  console.log(i);  // 10
}
// ES6 let &amp; const
{
  console.log(i);  // ReferenceError: i is not defined
  const i = 10
  console.log(i);  // 10
}
{
  console.log(i);  // ReferenceError: i is not defined
  let i = 10
  console.log(i);  // 10
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{  <span class="hljs-comment">/* Original code */</span>
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// undefined</span>
  <span class="hljs-keyword">var</span> i = <span class="hljs-number">10</span>
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 10</span>
}

{  <span class="hljs-comment">/* Compilation phase */</span>
  <span class="hljs-keyword">var</span> i;
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// undefined</span>
  i = <span class="hljs-number">10</span>
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 10</span>
}
<span class="hljs-comment">// ES6 let &amp; const</span>
{
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// ReferenceError: i is not defined</span>
  <span class="hljs-keyword">const</span> i = <span class="hljs-number">10</span>
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 10</span>
}
{
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// ReferenceError: i is not defined</span>
  <span class="hljs-keyword">let</span> i = <span class="hljs-number">10</span>
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 10</span>
}</code></pre>
<h2 id="articleHeader4">函数表达式和函数声明</h2>
<ul><li>函数表达式</li></ul>
<p>一个函数表达式是在函数执行到函数表达式定义的位置才开始创建，并被使用。它不会被提升。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = function(a, b) {
  return a + b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
}</code></pre>
<ul><li>函数声明</li></ul>
<p>函数声明的函数可以在文件中任意位置调用，因为它会被提升。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(a, b) {
  return a + b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
}</code></pre>
<h2 id="articleHeader5">变量：var，let和const</h2>
<p>在ES6之前，只能使用<code>var</code>来声明变量。在一个函数体中声明的变量和函数，周围的作用域内无法访问。在块作用域<code>if</code>和<code>for</code>中声明的变量，可以在<code>if</code>和<code>for</code>的外部被访问。</p>
<p>注意：如果没有使用<code>var</code>,<code>let</code>或则<code>const</code>关键字声明的变量将会绑定到全局作用域上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function greeting() {
  console.log(s) // undefined
  if(true) {
    var s = 'Hi';
    undeclaredVar = 'I am automatically created in global scope';
  }
  console.log(s) // 'Hi'
}
console.log(s);  // Error — ReferenceError: s is not defined
greeting();
console.log(undeclaredVar) // 'I am automatically created in global scope'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">greeting</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(s) <span class="hljs-comment">// undefined</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">var</span> s = <span class="hljs-string">'Hi'</span>;
    undeclaredVar = <span class="hljs-string">'I am automatically created in global scope'</span>;
  }
  <span class="hljs-built_in">console</span>.log(s) <span class="hljs-comment">// 'Hi'</span>
}
<span class="hljs-built_in">console</span>.log(s);  <span class="hljs-comment">// Error — ReferenceError: s is not defined</span>
greeting();
<span class="hljs-built_in">console</span>.log(undeclaredVar) <span class="hljs-comment">// 'I am automatically created in global scope'</span></code></pre>
<p>ES6的<code>let</code>和<code>const</code>都是新引入的关键字。它们不会被提升，而且是块作用域。也就是说被大括号包围起来的区域声明的变量外部将不可访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let g1 = 'global 1'
let g2 = 'global 2'
{   /* Creating a new block scope */
  g1 = 'new global 1'
  let g2 = 'local global 2'
  console.log(g1)   // 'new global 1'
  console.log(g2)   // 'local global 2'
  console.log(g3)   // ReferenceError: g3 is not defined
  let g3 = 'I am not hoisted';
}
console.log(g1)    // 'new global 1'
console.log(g2)    // 'global 2'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> g1 = <span class="hljs-string">'global 1'</span>
<span class="hljs-keyword">let</span> g2 = <span class="hljs-string">'global 2'</span>
{   <span class="hljs-comment">/* Creating a new block scope */</span>
  g1 = <span class="hljs-string">'new global 1'</span>
  <span class="hljs-keyword">let</span> g2 = <span class="hljs-string">'local global 2'</span>
  <span class="hljs-built_in">console</span>.log(g1)   <span class="hljs-comment">// 'new global 1'</span>
  <span class="hljs-built_in">console</span>.log(g2)   <span class="hljs-comment">// 'local global 2'</span>
  <span class="hljs-built_in">console</span>.log(g3)   <span class="hljs-comment">// ReferenceError: g3 is not defined</span>
  <span class="hljs-keyword">let</span> g3 = <span class="hljs-string">'I am not hoisted'</span>;
}
<span class="hljs-built_in">console</span>.log(g1)    <span class="hljs-comment">// 'new global 1'</span>
<span class="hljs-built_in">console</span>.log(g2)    <span class="hljs-comment">// 'global 2'</span></code></pre>
<p>一个常见的误解是：使用<code>const</code>声明的变量，其值不可更改。准确地说它不可以被重新赋值，但是可以更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tryMe = 'initial assignment';
tryMe = 'this has been reassigned';  // TypeError: Assignment to constant variable.
// You cannot reassign but you can change it…
const array = ['Ted', 'is', 'awesome!'];
array[0] = 'Barney';
array[3] = 'Suit up!';
console.log(array);     // [“Barney”, “is”, “awesome!”, “Suit up!”]
const airplane = {};
airplane.wings = 2;
airplane.passengers = 200;
console.log(airplane);   // {passengers: 200, wings: 2}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> tryMe = <span class="hljs-string">'initial assignment'</span>;
tryMe = <span class="hljs-string">'this has been reassigned'</span>;  <span class="hljs-comment">// TypeError: Assignment to constant variable.</span>
<span class="hljs-comment">// You cannot reassign but you can change it…</span>
<span class="hljs-keyword">const</span> array = [<span class="hljs-string">'Ted'</span>, <span class="hljs-string">'is'</span>, <span class="hljs-string">'awesome!'</span>];
array[<span class="hljs-number">0</span>] = <span class="hljs-string">'Barney'</span>;
array[<span class="hljs-number">3</span>] = <span class="hljs-string">'Suit up!'</span>;
<span class="hljs-built_in">console</span>.log(array);     <span class="hljs-comment">// [“Barney”, “is”, “awesome!”, “Suit up!”]</span>
<span class="hljs-keyword">const</span> airplane = {};
airplane.wings = <span class="hljs-number">2</span>;
airplane.passengers = <span class="hljs-number">200</span>;
<span class="hljs-built_in">console</span>.log(airplane);   <span class="hljs-comment">// {passengers: 200, wings: 2}</span></code></pre>
<h2 id="articleHeader6">后续</h2>
<ul><li><a href="https://blog.fundebug.com/2018/01/22/the-definitive-javascript-handbook-for-a-developer-interview-2/" rel="nofollow noreferrer" target="_blank">快速掌握JavaScript面试基础知识(二)</a></li></ul>
<p><span class="img-wrap"><img data-src="/img/bV00GN?w=270&amp;h=370" src="https://static.alili.tech/img/bV00GN?w=270&amp;h=370" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2018/01/15/the-definitive-javascript-handbook-for-a-developer-interview/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2018/01/15/the-definitive-javascript-handbook-for-a-developer-interview/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速掌握JavaScript面试基础知识(一)

## 原文链接
[https://segmentfault.com/a/1190000012939945](https://segmentfault.com/a/1190000012939945)


---
title: 'JavaScript数据类型转换' 
date: 2019-02-14 2:30:37
hidden: true
slug: jv2v4ljh83q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>JavaScript是一门动态语言，所谓的动态语言可以暂时理解为在语言中的一切内容都是不确定的。比如一个变量，这一时刻是个整型，下一时刻可能会变成字符串了。虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。</p>
<p>本文主要介绍数据类型强制转换和自动转换，自动转换是基于强制转换之上。<strong>强制转换主要指使用Number、String和Boolean三个函数，手动将各种类型的值，分布转换成数字、字符串或者布尔值</strong>。</p>
<h2 id="articleHeader1">一、强制转换</h2>
<h3 id="articleHeader2">1、其他的数据类型转换为String</h3>
<h4>方式一：toString()方法</h4>
<ul><li>调用被转换数据类型的toString()方法,该方法不会影响到原变量，它会将转换的结果返回，<strong>但是注意：null和undefined这两个值没有toString，如果调用他们的方法，会报错</strong>。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 123
a.toString()//&quot;123&quot;
var b = null;
b.toString()//&quot;报错&quot;
var c = undefined
c.toString()//&quot;报错&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>
a.<span class="hljs-built_in">toString</span>()<span class="hljs-comment">//"123"</span>
<span class="hljs-keyword">var</span> b = null;
b.<span class="hljs-built_in">toString</span>()<span class="hljs-comment">//"报错"</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">c</span> = undefined
<span class="hljs-built_in">c</span>.<span class="hljs-built_in">toString</span>()<span class="hljs-comment">//"报错"</span></code></pre>
<ul><li>采用 Number 类型的 toString() 方法的基模式，可以用不同的基输出数字，例如二进制的基是 2，八进制的基是 8，十六进制的基是 16</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iNum = 10;
alert(iNum.toString(2));        //输出 &quot;1010&quot;
alert(iNum.toString(8));        //输出 &quot;12&quot;
alert(iNum.toString(16));       //输出 &quot;A&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var iNum = <span class="hljs-number">10</span><span class="hljs-comment">;</span>
alert(<span class="hljs-name">iNum</span>.toString(<span class="hljs-number">2</span>))<span class="hljs-comment">;        //输出 "1010"</span>
alert(<span class="hljs-name">iNum</span>.toString(<span class="hljs-number">8</span>))<span class="hljs-comment">;        //输出 "12"</span>
alert(<span class="hljs-name">iNum</span>.toString(<span class="hljs-number">16</span>))<span class="hljs-comment">;       //输出 "A"</span></code></pre>
<h4>方式二：String()函数</h4>
<ul><li>使用String()函数做强制类型转换时，对于Number和Boolean实际上就是调用的toString()方法,</li></ul>
<p>但是对于null和undefined，就不会调用toString()方法,它会将null直接转换为"null",将undefined 直接转换为"undefined"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = null
String(a)//&quot;null&quot;
var b = undefined
String(b)//&quot;undefined&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = null
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(a)</span></span><span class="hljs-comment">//"null"</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = undefined
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">(b)</span></span><span class="hljs-comment">//"undefined"</span></code></pre>
<ul><li>String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String({a: 1}) // &quot;[object Object]&quot;
String([1, 2, 3]) // &quot;1,2,3&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">({a: <span class="hljs-number">1</span>})</span></span> <span class="hljs-comment">// "[object Object]"</span>
<span class="hljs-function"><span class="hljs-title">String</span><span class="hljs-params">([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])</span></span> <span class="hljs-comment">// "1,2,3"</span></code></pre>
<h3 id="articleHeader3">2、其他的数据类型转换为Number</h3>
<h4>方式一：使用Number()函数</h4>
<p>下面分成两种情况讨论，一种是参数是原始类型的值，另一种是参数是对象</p>
<p><strong>(1)原始类型值</strong></p>
<p>①字符串转数字</p>
<p>Ⅰ 如果是纯数字的字符串，则直接将其转换为数字</p>
<p>Ⅱ 如果字符串中有非数字的内容，则转换为NaN </p>
<p>Ⅲ 如果字符串是一个空串或者是一个全是空格的字符串，则转换为0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number('324') // 324
Number('324abc') // NaN
Number('') // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">'324'</span>)</span></span> <span class="hljs-comment">// 324</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">'324abc'</span>)</span></span> <span class="hljs-comment">// NaN</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">''</span>)</span></span> <span class="hljs-comment">// 0</span></code></pre>
<p>②布尔值转数字:true转成1,false转成0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(true) // 1
Number(false) // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(true)</span></span> <span class="hljs-comment">// 1</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(false)</span></span> <span class="hljs-comment">// 0</span></code></pre>
<p>③undefined转数字:转成NaN</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(undefined) // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(undefined)</span></span> <span class="hljs-comment">// NaN</span></code></pre>
<p>④null转数字：转成0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(null) // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(null)</span></span> <span class="hljs-comment">// 0</span></code></pre>
<p>⑤Number() 接受数值作为参数，此时它既能识别负的十六进制，也能识别0开头的八进制，返回值永远是十进制值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(3.15);    //3.15
Number(023);     //19
Number(0x12);    //18
Number(-0x12);   //-18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Number</span>(<span class="hljs-number">3.15</span>);    <span class="hljs-comment">//3.15</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-number">023</span>);     <span class="hljs-comment">//19</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-number">0x12</span>);    <span class="hljs-comment">//18</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-number">-0x12</span>);   <span class="hljs-comment">//-18</span></code></pre>
<p><strong>(2)对象</strong></p>
<p>简单的规则是，Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">({a: <span class="hljs-number">1</span>})</span></span> <span class="hljs-comment">// NaN</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])</span></span> <span class="hljs-comment">// NaN</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">([<span class="hljs-number">5</span>])</span></span> <span class="hljs-comment">// 5</span></code></pre>
<h4>方式二：parseInt() &amp; parseFloat()</h4>
<p>这种方式专门用来对付字符串，parseInt()一个字符串转换为一个整数,可以将一个字符串中的有效的整数内容取出来，然后转换为Number。parseFloat()把一个字符串转换为一个浮点数。parseFloat()作用和parseInt()类似，不同的是它可以获得有效的小数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(parseInt('.21'));        //NaN
console.log(parseInt(&quot;10.3&quot;));        //10
console.log(parseFloat('.21'));      //0.21
console.log(parseFloat('.d1'));       //NaN
console.log(parseFloat(&quot;10.11.33&quot;));  //10.11
console.log(parseFloat(&quot;4.3years&quot;));  //4.3
console.log(parseFloat(&quot;He40.3&quot;));    //NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'.21'</span>));        <span class="hljs-comment">//NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"10.3"</span>));        <span class="hljs-comment">//10</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">'.21'</span>));      <span class="hljs-comment">//0.21</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">'.d1'</span>));       <span class="hljs-comment">//NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"10.11.33"</span>));  <span class="hljs-comment">//10.11</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"4.3years"</span>));  <span class="hljs-comment">//4.3</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"He40.3"</span>));    <span class="hljs-comment">//NaN</span></code></pre>
<p>parseInt()在没有第二个参数时默认以十进制转换数值，有第二个参数时，以第二个参数为基数转换数值，如果基数有误返回NaN</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(parseInt(&quot;13&quot;));          //13
console.log(parseInt(&quot;11&quot;,2));        //3
console.log(parseInt(&quot;17&quot;,8));        //15
console.log(parseInt(&quot;1f&quot;,16));       //31" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"13"</span>));          <span class="hljs-comment">//13</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"11"</span>,<span class="hljs-number">2</span>));        <span class="hljs-comment">//3</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"17"</span>,<span class="hljs-number">8</span>));        <span class="hljs-comment">//15</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"1f"</span>,<span class="hljs-number">16</span>));       <span class="hljs-comment">//31</span></code></pre>
<p><strong>两者的区别：Number函数将字符串转为数值，要比parseInt函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('42 cats') // 42
Number('42 cats') // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">parseInt</span><span class="hljs-params">(<span class="hljs-string">'42 cats'</span>)</span></span> <span class="hljs-comment">// 42</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">'42 cats'</span>)</span></span> <span class="hljs-comment">// NaN</span></code></pre>
<p>上面代码中，parseInt逐个解析字符，而Number函数整体转换字符串的类型。<br>另外，对空字符串的处理也不一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(&quot;   &quot;);     //0    
parseInt(&quot;   &quot;);   //NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Number</span>(<span class="hljs-string">"   "</span>);     <span class="hljs-comment">//0    </span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"   "</span>);   <span class="hljs-comment">//NaN</span></code></pre>
<h3 id="articleHeader4">3、其他的数据类型转换为Boolean</h3>
<p>它的转换规则相对简单：<strong>只有空字符串("")、null、undefined、+0、-0 和 NaN 转为布尔型是 false，其他的都是 true，空数组、空对象转换为布尔类型也是 true,甚至连false对应的布尔对象new Boolean(false)也是true</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(undefined)</span></span> <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(null)</span></span> <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span> <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(NaN)</span></span> <span class="hljs-comment">// false</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(<span class="hljs-string">''</span>)</span></span> <span class="hljs-comment">// false</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">({})</span></span> <span class="hljs-comment">// true</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">([])</span></span> <span class="hljs-comment">// true</span>
<span class="hljs-function"><span class="hljs-title">Boolean</span><span class="hljs-params">(new Boolean(false)</span></span>) <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader5">二、自动转换</h2>
<p>遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见。</p>
<h3 id="articleHeader6">1.自动转换为布尔值</h3>
<p>JavaScript 遇到预期为布尔值的地方(比如if语句的条件部分),就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用Boolean函数。</p>
<p>逻辑运算符!如果对非布尔值进行运算，则会将其转换为布尔值，然后再取反。<br>所以我们可以利用该特点，来将一个其他的数据类型转换为布尔值，<br><strong>可以为一个任意数据类型取两次反，来将其转换为布尔值，原理和Boolean()函数一样。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ('abc') {
  console.log('hello')
}  // &quot;hello&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span> (<span class="hljs-string">'abc'</span>) {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'hello'</span>)
}  // <span class="hljs-string">"hello"</span></code></pre>
<h3 id="articleHeader7">2.自动转换为数值</h3>
<p><strong>算数运算符(+ - * /)跟非Number类型的值进行运算时，会将这些值转换为Number，然后在运算，除了字符串的加法运算</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true + 1 // 2
2 + null // 2
undefined + 1 // NaN
2 + NaN // NaN 任何值和NaN做运算都得NaN
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-literal">true</span> + <span class="hljs-number">1</span> <span class="hljs-comment">// 2</span>
<span class="hljs-number">2</span> + <span class="hljs-literal">null</span> <span class="hljs-comment">// 2</span>
<span class="hljs-literal">undefined</span> + <span class="hljs-number">1</span> <span class="hljs-comment">// NaN</span>
<span class="hljs-number">2</span> + <span class="hljs-literal">NaN</span> <span class="hljs-comment">// NaN 任何值和NaN做运算都得NaN</span>
<span class="hljs-string">'5'</span> - <span class="hljs-string">'2'</span> <span class="hljs-comment">// 3</span>
<span class="hljs-string">'5'</span> * <span class="hljs-string">'2'</span> <span class="hljs-comment">// 10</span>
<span class="hljs-literal">true</span> - <span class="hljs-number">1</span>  <span class="hljs-comment">// 0</span>
<span class="hljs-string">'1'</span> - <span class="hljs-number">1</span>   <span class="hljs-comment">// 0</span>
<span class="hljs-string">'5'</span> * []    <span class="hljs-comment">// 0</span>
<span class="hljs-literal">false</span> / <span class="hljs-string">'5'</span> <span class="hljs-comment">// 0</span>
<span class="hljs-string">'abc'</span> - <span class="hljs-number">1</span>   <span class="hljs-comment">// NaN</span></code></pre>
<p><strong>一元运算符也会把运算子转成数值。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>+<span class="hljs-string">'abc'</span> <span class="hljs-comment">// NaN</span>
-<span class="hljs-string">'abc'</span> <span class="hljs-comment">// NaN</span>
+<span class="hljs-literal">true</span> <span class="hljs-comment">// 1</span>
-<span class="hljs-literal">false</span> <span class="hljs-comment">// 0</span></code></pre>
<h3 id="articleHeader8">3.自动转换为字符串</h3>
<p>字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'5' + 1 // '51'
'5' + true // &quot;5true&quot;
'5' + false // &quot;5false&quot;
'5' + {} // &quot;5[object Object]&quot;
'5' + [] // &quot;5&quot;
'5' + function (){} // &quot;5function (){}&quot;
'5' + undefined // &quot;5undefined&quot;
'5' + null // &quot;5null&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-string">'5'</span> + <span class="hljs-number">1</span> <span class="hljs-regexp">//</span> <span class="hljs-string">'51'</span>
<span class="hljs-string">'5'</span> + true <span class="hljs-regexp">//</span> <span class="hljs-string">"5true"</span>
<span class="hljs-string">'5'</span> + false <span class="hljs-regexp">//</span> <span class="hljs-string">"5false"</span>
<span class="hljs-string">'5'</span> + {} <span class="hljs-regexp">//</span> <span class="hljs-string">"5[object Object]"</span>
<span class="hljs-string">'5'</span> + [] <span class="hljs-regexp">//</span> <span class="hljs-string">"5"</span>
<span class="hljs-string">'5'</span> + <span class="hljs-keyword">function</span> (){} <span class="hljs-regexp">//</span> <span class="hljs-string">"5function (){}"</span>
<span class="hljs-string">'5'</span> + undefined <span class="hljs-regexp">//</span> <span class="hljs-string">"5undefined"</span>
<span class="hljs-string">'5'</span> + null <span class="hljs-regexp">//</span> <span class="hljs-string">"5null"</span></code></pre>
<h2 id="articleHeader9">三、总结</h2>
<h3 id="articleHeader10">1. 强制转换的各种情况</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016845340?w=700&amp;h=298" src="https://static.alili.tech/img/remote/1460000016845340?w=700&amp;h=298" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">2. 自动转换的的各种情况</h3>
<ul>
<li>只有空字符串("")、null、undefined、+0、-0 和 NaN 转为布尔型是 false，其他的都是 true</li>
<li>除了加法运算符（+）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。一元运算符也会把运算子转成数值。</li>
<li>字符串的自动转换，主要发生在字符串的加法运算时。</li>
</ul>
<h2 id="articleHeader12">参考文章</h2>
<h3 id="articleHeader13"><a href="https://blog.csdn.net/Faremax/article/details/76714294" rel="nofollow noreferrer" target="_blank">透彻研究Javascript类型转换</a></h3>
<h3 id="articleHeader14"><a href="https://javascript.ruanyifeng.com/grammar/conversion.html" rel="nofollow noreferrer" target="_blank">javasript标准参考教程</a></h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数据类型转换

## 原文链接
[https://segmentfault.com/a/1190000016845337](https://segmentfault.com/a/1190000016845337)


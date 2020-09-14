---
title: '温故js系列（9）-相等==&严格相等===&代码里的那些判断' 
date: 2019-02-05 2:30:09
hidden: true
slug: kayk26a059d
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/10" rel="nofollow noreferrer" target="_blank">==========</a></p>
<h2 id="articleHeader0">JavaScript-判断</h2>
<p>代码中，多多少少会有判断语句。业务越复杂，逻辑就越复杂，判断就越多</p>
<h3 id="articleHeader1">比较判断</h3>
<p>比较判断是比较两个值，返回一个布尔值，表示是否满足比较条件。JavaScript一共提供了8个比较运算符，参考我另一篇文章：<a href="https://segmentfault.com/a/1190000005927342#articleHeader3">JavaScript-运算符浅析</a>。</p>
<p>这里主要说一下严格相等运算符和相等运算符的区别：</p>
<p><code>==</code>相等运算符比较两个值的时候会判断两个值的类型，如果不是同一类型，会强制转换为同一类型进行比较（类型转换参考温故js系列第一篇文章： <a href="https://segmentfault.com/a/1190000005863067" target="_blank">类型转换</a>）。</p>
<p>而<code>===</code>比较两个值的时候先判断两个值的类型，如果不是同一类型，直接返回false，值类型相同再进行值的比较。</p>
<p>所以，从性能上来说，<code>==</code>会比<code>===</code>多走一条类型转换的路，稍逊一点。从结果上来说，有时候类型转换会给你带来你不想要的比较结果。 这也就是为什么都推崇使用<code>===</code>的原因。当然，<code>==</code>在合适的业务场景下使用也是必要的。</p>
<h4>严格相等运算符===</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        判断                        返回
两个值类型不同                       false
两个值都是null/undefined/true/false  true      
两个值其中之一为NaN                  false
两个值都为数值且值相等                true
两个值都为字符串且值相等              true
两个值都指向同一个引用类型            true

1 === &quot;1&quot; // false
true === true // true
undefined === undefined // true
null === null // true
1 === 1 // true
NaN === NaN  // false
+0 === -0 // true
({} === {}) // false
[] === [] // false
(function (){} === function (){}) // false
var v1 = {};
var v2 = v1;  //两个值引用同一个对象
v1 === v2 // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>        <span class="hljs-string">判断</span>                        <span class="hljs-string">返回</span>
<span class="hljs-string">两个值类型不同</span>                       <span class="hljs-literal">false</span>
<span class="hljs-string">两个值都是null/undefined/true/false</span>  <span class="hljs-literal">true</span>      
<span class="hljs-string">两个值其中之一为NaN</span>                  <span class="hljs-literal">false</span>
<span class="hljs-string">两个值都为数值且值相等</span>                <span class="hljs-literal">true</span>
<span class="hljs-string">两个值都为字符串且值相等</span>              <span class="hljs-literal">true</span>
<span class="hljs-string">两个值都指向同一个引用类型</span>            <span class="hljs-literal">true</span>

<span class="hljs-number">1</span> <span class="hljs-string">===</span> <span class="hljs-string">"1"</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-literal">true</span> <span class="hljs-string">===</span> <span class="hljs-literal">true</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">undefined</span> <span class="hljs-string">===</span> <span class="hljs-string">undefined</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-literal">null</span> <span class="hljs-string">===</span> <span class="hljs-literal">null</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-number">1</span> <span class="hljs-string">===</span> <span class="hljs-number">1</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">NaN</span> <span class="hljs-string">===</span> <span class="hljs-string">NaN</span>  <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">+0</span> <span class="hljs-string">===</span> <span class="hljs-bullet">-0</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">({}</span> <span class="hljs-string">===</span> <span class="hljs-string">{})</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">[]</span> <span class="hljs-string">===</span> <span class="hljs-string">[]</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">(function</span> <span class="hljs-string">(){}</span> <span class="hljs-string">===</span> <span class="hljs-string">function</span> <span class="hljs-string">(){})</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">var</span> <span class="hljs-string">v1</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>
<span class="hljs-string">var</span> <span class="hljs-string">v2</span> <span class="hljs-string">=</span> <span class="hljs-string">v1;</span>  <span class="hljs-string">//两个值引用同一个对象</span>
<span class="hljs-string">v1</span> <span class="hljs-string">===</span> <span class="hljs-string">v2</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span></code></pre>
<p>严格相等运算符有一个对应的严格不相等运算符（!==），两者的运算结果正好相反</p>
<h4>相等运算符==</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="规则： 

if 相等运算符比较相同类型的数据时，同严格相等运算符
else if 相等运算符比较不同类型的数据时：
原始类型的数据会转换成数值类型，把字符串和布尔值都转为数值，再进行比较
null == undefined  返回true
一个是对象，另一个是数字或者字符串，把对象转成基本类型值再比较
else false

123 == 123; //true
'123' == 123; //true，'123'会转成成数值123
false == 0; //true，false 转成数值就是0
'a' == 'A'; //false，转换后的编码不一样
123 == {}; //false，执行toString()或valueOf()会改变
123 == NaN; //false，只要有NaN，都是false
{} == {}; //false，比较的是他们的地址，每个新创建对象的引用地址都不同

null == undefined //true
'NaN' == NaN //false
123 == NaN //false
NaN == NaN //false
false == 0 //true
true == 1 //true
true == 2 //false
undefined == 0 //false
null == 0 //false
'123' == 123 //true
'123' === 123 //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>规则： 

<span class="hljs-keyword">if</span> 相等运算符比较相同类型的数据时，同严格相等运算符
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> 相等运算符比较不同类型的数据时：
原始类型的数据会转换成数值类型，把字符串和布尔值都转为数值，再进行比较
<span class="hljs-literal">null</span> == <span class="hljs-literal">undefined</span>  返回<span class="hljs-literal">true</span>
一个是对象，另一个是数字或者字符串，把对象转成基本类型值再比较
<span class="hljs-keyword">else</span> <span class="hljs-literal">false</span>

<span class="hljs-number">123</span> == <span class="hljs-number">123</span>; <span class="hljs-comment">//true</span>
<span class="hljs-string">'123'</span> == <span class="hljs-number">123</span>; <span class="hljs-comment">//true，'123'会转成成数值123</span>
<span class="hljs-literal">false</span> == <span class="hljs-number">0</span>; <span class="hljs-comment">//true，false 转成数值就是0</span>
<span class="hljs-string">'a'</span> == <span class="hljs-string">'A'</span>; <span class="hljs-comment">//false，转换后的编码不一样</span>
<span class="hljs-number">123</span> == {}; <span class="hljs-comment">//false，执行toString()或valueOf()会改变</span>
<span class="hljs-number">123</span> == <span class="hljs-literal">NaN</span>; <span class="hljs-comment">//false，只要有NaN，都是false</span>
{} == {}; <span class="hljs-comment">//false，比较的是他们的地址，每个新创建对象的引用地址都不同</span>

<span class="hljs-literal">null</span> == <span class="hljs-literal">undefined</span> <span class="hljs-comment">//true</span>
<span class="hljs-string">'NaN'</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">//false</span>
<span class="hljs-number">123</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">NaN</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">false</span> == <span class="hljs-number">0</span> <span class="hljs-comment">//true</span>
<span class="hljs-literal">true</span> == <span class="hljs-number">1</span> <span class="hljs-comment">//true</span>
<span class="hljs-literal">true</span> == <span class="hljs-number">2</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">undefined</span> == <span class="hljs-number">0</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">null</span> == <span class="hljs-number">0</span> <span class="hljs-comment">//false</span>
<span class="hljs-string">'123'</span> == <span class="hljs-number">123</span> <span class="hljs-comment">//true</span>
<span class="hljs-string">'123'</span> === <span class="hljs-number">123</span> <span class="hljs-comment">//false</span></code></pre>
<p>相等运算符有一个对应的不相等运算符（!=），两者的运算结果正好相反</p>
<h3 id="articleHeader2">!!判断</h3>
<p>!!相当于Boolean，写代码时用!!转化为Boolean类型做判断非常好用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!!'xzavier';   // true
!!'';          // false
!!'0';         // true
!!'1';         // true
!!'-1'         // true
!!0            // false
!!undefined    // false
!!null         // false
!!NaN          // false
!!{};          // true
!!{name:'xz'}  // true
!![];          // true
!![1,2,3];     // true
!!true;        // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code>!!<span class="hljs-string">'xzavier'</span>;   // true
!!<span class="hljs-string">''</span>;          // false
!!<span class="hljs-string">'0'</span>;         // true
!!<span class="hljs-string">'1'</span>;         // true
!!<span class="hljs-string">'-1'</span>         // true
!!<span class="hljs-number">0</span>            // false
!!undefined    // false
!!null         // false
!!NaN          // false
!!{};          // true
!!{name:'xz'}  // true
!![];          // true
!![<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];     // true
!!true;        // true</code></pre>
<h3 id="articleHeader3">!判断</h3>
<p>取反运算符 ! 用于将布尔值变为相反值，即true变成false，false变成true。对于非布尔值的数据，取反运算符会自动将其转为布尔值。规则是，以下六个值取反后为true，其他值取反后都为false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined  null  false  0(包括+0和-0)  NaN  空字符串('')

!undefined    // true
!null         // true
!false        // true
!0            // true
!NaN          // true
!&quot;&quot;           // true    
!54           // false
!'hello'      // false
![]           // false
![1,2,3]      // false
!{}           // false
!{name:'xz'}  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">undefined</span>  <span class="hljs-literal">null</span>  <span class="hljs-literal">false</span>  <span class="hljs-number">0</span><span class="hljs-string">(包括+0和-0)</span>  <span class="hljs-string">NaN</span>  <span class="hljs-string">空字符串('')</span>

<span class="hljs-string">!undefined</span>    <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">!null</span>         <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">!false</span>        <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">!0</span>            <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">!NaN</span>          <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">!""</span>           <span class="hljs-string">//</span> <span class="hljs-literal">true</span>    
<span class="hljs-string">!54</span>           <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">!'hello'</span>      <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">![]</span>           <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">![1,2,3]</span>      <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">!{}</span>           <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">!{name:'xz'}</span>  <span class="hljs-string">//</span> <span class="hljs-literal">false</span></code></pre>
<h3 id="articleHeader4">[]和{}判断</h3>
<p>对于[]和{}，我们在业务代码中肯定会对其做判断，如上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!!{};          // true
!!{name:'xz'}  // true
!![];          // true
!![1,2,3];     // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code>!!{};          // true
!!{name:'xz'}  // true
!![];          // true
!![<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];     // true</code></pre>
<p>不能用!!和!做判断，对于数组，我们用它的length属性做判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].length       // 0 false
[1,2,3].length  // 3 true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>[]<span class="hljs-selector-class">.length</span>       <span class="hljs-comment">// 0 false</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]<span class="hljs-selector-class">.length</span>  <span class="hljs-comment">// 3 true</span></code></pre>
<p>对象的话，可以采用jQuery的方法$.isEmptyObject(obj)，也可以js封装一个方法，就模仿jQuery 写一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isEmptyObject(obj) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
isEmptyObject({});  //true
isEmptyObject({name: 'xzavier'});  false  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject</span><span class="hljs-params">(obj)</span> </span>{
    <span class="hljs-keyword">var</span> name;
    <span class="hljs-keyword">for</span> ( name <span class="hljs-keyword">in</span> obj ) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
isEmptyObject({});  <span class="hljs-comment">//true</span>
isEmptyObject({name: <span class="hljs-string">'xzavier'</span>});  <span class="hljs-literal">false</span>  </code></pre>
<p>推荐一个工具库underscore，它也有个方法isEmpty(object)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require('underscore');
_.isEmpty({});  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>const <span class="hljs-number">_</span> = <span class="hljs-keyword">require</span>(<span class="hljs-string">'underscore'</span>);
<span class="hljs-number">_</span>.isEmpty({});  <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span></code></pre>
<h3 id="articleHeader5">&amp;&amp;判断</h3>
<p>用在条件表达式中，规则是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="num1 &amp;&amp; num2
true    true    true
true    false   false
false   true    false
false   false   false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">num1</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-string">num2</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">true</span>    <span class="hljs-literal">true</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">true</span>    <span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>
</code></pre>
<p>用在语句中，规则是 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = expression1 &amp;&amp; expression2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">result = expressio<span class="hljs-symbol">n1</span> &amp;&amp; expressio<span class="hljs-symbol">n2</span></code></pre>
<p>如果expression1的计算结果为false，则result为expression1。否则result为expression2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1 - 1) &amp;&amp; ( x += 1)  // 0
(2 > 1) &amp;&amp; ( 5 + 5)   // 10
(2 + 1) &amp;&amp; ( 5 + 5)   // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">1</span> - <span class="hljs-number">1</span>) &amp;&amp; ( x += <span class="hljs-number">1</span>)  <span class="hljs-comment">// 0</span>
(<span class="hljs-number">2</span> &gt; <span class="hljs-number">1</span>) &amp;&amp; ( <span class="hljs-number">5</span> + <span class="hljs-number">5</span>)   <span class="hljs-comment">// 10</span>
(<span class="hljs-number">2</span> + <span class="hljs-number">1</span>) &amp;&amp; ( <span class="hljs-number">5</span> + <span class="hljs-number">5</span>)   <span class="hljs-comment">// 10</span></code></pre>
<h3 id="articleHeader6">||判断</h3>
<p>用在条件表达式中，规则是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="num1 || num2
true    true     true
true    false    true
false   true     true
false   false    false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">num1</span> <span class="hljs-string">||</span> <span class="hljs-string">num2</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">true</span>     <span class="hljs-literal">true</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">false</span>    <span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">true</span>     <span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>    <span class="hljs-literal">false</span></code></pre>
<p>用在语句中，规则是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果第一个运算子的布尔值为true，则返回第一个运算子的值，且不再对第二个运算子求值
如果第一个运算子的布尔值为false，则返回第二个运算子的值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>如果第一个运算子的布尔值为<span class="hljs-literal">true</span>，则返回第一个运算子的值，且不再对第二个运算子求值
如果第一个运算子的布尔值为<span class="hljs-literal">false</span>，则返回第二个运算子的值</code></pre>
<p>||运算符一般在业务代码中做条件表达式判断和容错处理，我们在取数据时取不到的情况下，又不能影响后面的业务代码，就需要进行容错。||就是一个非常好的容错写法，相当于提供一个备用数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = undefined || backup_data;  //请求出错，数据为undefined时，就去备用数据backup_data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> data = <span class="hljs-literal">undefined</span> || backup_data;  <span class="hljs-comment">//请求出错，数据为undefined时，就去备用数据backup_data</span></code></pre>
<h3 id="articleHeader7">三目判断</h3>
<p>规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="condition ? expression1 : expression2;

function absN(xzavier) {
    return xzavier > 0 ? xzavier : -xzavier;
}
absN(-123);  //123
absN(123);  //123
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>condition ? expression1 : <span class="hljs-type">expression2</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title">absN</span>(xzavier) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">xzavier</span> &gt; <span class="hljs-number">0</span> ? xzavier : -<span class="hljs-type">xzavier</span>;
}
absN(-<span class="hljs-number">123</span>);  //<span class="hljs-number">123</span>
absN(<span class="hljs-number">123</span>);  //<span class="hljs-number">123</span>
</code></pre>
<p>如果第一个表达式的布尔值为true，则返回第二个表达式的值，否则返回第三个表达式的值。</p>
<p>判断暂时写到这儿，判断是我们代码生涯中时时刻刻接触的，更多的attention在接触研究过会更新于此...</p>
<p>休息一刻，约好要去打篮球了。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（9）-相等==&严格相等===&代码里的那些判断

## 原文链接
[https://segmentfault.com/a/1190000006672446](https://segmentfault.com/a/1190000006672446)


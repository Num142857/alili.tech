---
title: 'JavaScript 数组操作方法小结' 
date: 2019-02-15 2:30:44
hidden: true
slug: t2mci6htsdn
categories: [reprint]
---

{{< raw >}}

                    
<p>ECMAScript为操作已经包含在数组中的项提供了很多方法。这里本人总结一下自己对这些方法的理解，如此之多的方法中，我首先已<strong>是否会改变原数组</strong>做为分类标准，逐个解释一下每一个方法。</p>
<h2 id="articleHeader0">一、不会改变原数组</h2>
<h3 id="articleHeader1">1. concat()</h3>
<p>使用方法：<code>array.concat(array2,array3,...,arrayX)</code><br>返回值： <strong>返回一个新的数组</strong></p>
<p><code>concat()</code>方法用于连接两个或多个数组。该方法不会改变现有的数组，仅会返回被连接数组的一个副本。<br>在没有传递参数的情况下，它只是复制当前数组并返回副本；如果传递的值不是数组，这些值就会简单地添加到结果数组的末尾。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1,2,3];
var arr2 = arr1.concat(4,[5,6]);

console.log(arr1);  // [ 1, 2, 3 ]
console.log(arr2);  // [ 1, 2, 3, 4, 5, 6 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var arr2 = arr1.concat(<span class="hljs-number">4</span>,[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]);

console.log(arr1);  <span class="hljs-comment">// [ 1, 2, 3 ]</span>
console.log(arr2);  <span class="hljs-comment">// [ 1, 2, 3, 4, 5, 6 ]</span></code></pre>
<h3 id="articleHeader2">2. join()</h3>
<p>使用方法：<code>array.join(separator)</code><br>返回值： <strong>返回一个字符串</strong></p>
<p><code>join()</code>方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的，默认使用','号分割，不改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1,2,3];
var arr2 = arr1.join();

console.log(arr1);  // [ 1, 2, 3 ]
console.log(arr2);  // 1,2,3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> arr2 = arr1.join();

<span class="hljs-built_in">console</span>.log(arr1);  <span class="hljs-comment">// [ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(arr2);  <span class="hljs-comment">// 1,2,3</span></code></pre>
<blockquote>之前接触过一个功能是需要生成多个连续的<code>*</code>，一开始是直接使用<code>for</code>循环可以做到，后面了解了<code>join()</code>方法后，发现其实一句话就可以弄好了。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr3 = &quot;&quot;;
for(let i = 0; i < 15; i ++) {
    arr3 = arr3 + &quot;*&quot;;
}
console.log(arr3);  // ***************

var arr4 = new Array(16).join(&quot;*&quot;);
console.log(arr4);  // ***************" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr3 = <span class="hljs-string">""</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i ++) {
    arr3 = arr3 + <span class="hljs-string">"*"</span>;
}
<span class="hljs-built_in">console</span>.log(arr3);  <span class="hljs-comment">// ***************</span>

<span class="hljs-keyword">var</span> arr4 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">16</span>).join(<span class="hljs-string">"*"</span>);
<span class="hljs-built_in">console</span>.log(arr4);  <span class="hljs-comment">// ***************</span></code></pre>
<h3 id="articleHeader3">3. slice()</h3>
<p>使用方法：<code>array.slice(start, end)</code><br>返回值： <strong>返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素</strong></p>
<p><code>slice()</code>接受一或两个参数，即要返回项的起始和结束位置。<br>在只有一个参数的情况下，<code>slice()</code>方法返回从该参数指定位置到当前数组末尾的所有项；<br>如果有两个参数，改方法返回起始和结束位置之间的项——但不包括结束位置的项。<br>如果参数为负数，规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1,2,3,4,5,6];
var arr2 = arr1.slice(1);
var arr3 = arr1.slice(2,4);
var arr4 = arr1.slice(-4,-2);  // 等价于 arr1.slice(2,4);

console.log(arr1);  // [ 1, 2, 3, 4, 5, 6 ]
console.log(arr2);  // [ 2, 3, 4, 5, 6 ]
console.log(arr3);  // [ 3, 4 ]
console.log(arr4);  // [ 3, 4 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
var arr2 = arr1.slice(<span class="hljs-number">1</span>);
var arr3 = arr1.slice(<span class="hljs-number">2</span>,<span class="hljs-number">4</span>);
var arr4 = arr1.slice(<span class="hljs-number">-4</span>,<span class="hljs-number">-2</span>);  <span class="hljs-comment">// 等价于 arr1.slice(2,4);</span>

console.log(arr1);  <span class="hljs-comment">// [ 1, 2, 3, 4, 5, 6 ]</span>
console.log(arr2);  <span class="hljs-comment">// [ 2, 3, 4, 5, 6 ]</span>
console.log(arr3);  <span class="hljs-comment">// [ 3, 4 ]</span>
console.log(arr4);  <span class="hljs-comment">// [ 3, 4 ]</span></code></pre>
<blockquote>对于伪数组转换为标准数据就用到了这个方法</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Array.prototype.slice.call(arguments)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">    Array<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.slice</span><span class="hljs-selector-class">.call</span>(arguments)</code></pre>
<h3 id="articleHeader4">4. some()</h3>
<p>使用方法：<code>array.some(function(currentValue,index,arr),thisValue)</code><br>返回值： <strong>布尔值</strong></p>
<p><strong>或</strong>  ==&gt;  <code>some()</code>对数组中的每一项运行给定的函数，如果该函数对任一项返回true，剩余的元素不会再执行检测；如果没有满足条件的元素，则返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compare(item, index, arr){
    return item > 10;
}

[2, 5, 8, 1, 4].some(compare);  // false
[20, 5, 8, 1, 4].some(compare);  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function compare(item, index, arr){
    return item &gt; <span class="hljs-number">10</span>;
}

[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].some(compare);  <span class="hljs-comment">// false</span>
[<span class="hljs-number">20</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].some(compare);  <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader5">5. every()</h3>
<p>使用方法：<code>array.every(function(currentValue,index,arr),thisValue)</code><br>返回值： <strong>布尔值</strong></p>
<p><strong>和</strong>  ==&gt;  <code>every()</code>对数组中的每一项运行给定的函数，如果该函数对每一项返回true，剩余的元素不会再执行检测；如果其中有一个没有满足条件的元素，则返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compare(item, index, arr){
    return item > 10;
}

[20, 50, 80, 11, 40].every(compare);  // true
[20, 50, 80, 10, 40].every(compare);  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function compare(item, index, arr){
    return item &gt; <span class="hljs-number">10</span>;
}

[<span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">80</span>, <span class="hljs-number">11</span>, <span class="hljs-number">40</span>].every(compare);  <span class="hljs-comment">// true</span>
[<span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">80</span>, <span class="hljs-number">10</span>, <span class="hljs-number">40</span>].every(compare);  <span class="hljs-comment">// false</span></code></pre>
<h3 id="articleHeader6">5. filter()</h3>
<p>使用方法：<code>array.filter(function(currentValue,index,arr), thisValue)</code><br>返回值： <strong>返回数组</strong></p>
<p><code>filter()</code>方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。<br>对数组的每一项都运行给定的函数，返回结果为true的项组成的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function filterArr(item, index, arr){
    return item > 4;
}

[2, 5, 8, 1, 4].filter(filterArr);  // [5,8]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function filterArr(item, index, arr){
    return item &gt; <span class="hljs-number">4</span>;
}

[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].filter(filterArr);  <span class="hljs-comment">// [5,8]</span></code></pre>
<h3 id="articleHeader7">6. find() —— ES6新增的方法</h3>
<p>使用方法：<code>array.find(function(currentValue, index, arr),thisValue)</code><br>返回值： <strong>返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 <code>undefined</code></strong></p>
<p><code>find()</code>方法传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。</p>
<p><code>filter()</code>和<code>find()</code>方法的区别：</p>
<ul>
<li>
<code>filter()</code>方法是对数组的每一项都进行检查，最后返回结果为true的<strong>数组</strong>；而<code>find()</code>方法当找到符合的元素时，立刻返回该<strong>元素</strong>，之后的元素不再进行检查；</li>
<li>
<code>filter()</code>方法如果没有找到符合的元素返回空的数组；而<code>find()</code>方法没有找到符合的元素则返回<code>undefined</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function filterArr(item, index, arr){
    return item > 4;
}

[2, 5, 8, 1, 4].filter(filterArr);  // [5,8]
[2, 5, 8, 1, 4].find(filterArr); // 5

function findArr(item, index, arr){
    return item > 10;
}

[2, 5, 8, 1, 4].filter(findArr);  // []
[2, 5, 8, 1, 4].find(findArr); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function filterArr(item, index, arr){
    return item &gt; <span class="hljs-number">4</span>;
}

[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].filter(filterArr);  <span class="hljs-comment">// [5,8]</span>
[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].find(filterArr); <span class="hljs-comment">// 5</span>

function findArr(item, index, arr){
    return item &gt; <span class="hljs-number">10</span>;
}

[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].filter(findArr);  <span class="hljs-comment">// []</span>
[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].find(findArr); <span class="hljs-comment">// undefined</span></code></pre>
<h3 id="articleHeader8">7. map()</h3>
<p>使用方法：<code>array.map(function(currentValue,index,arr), thisValue)</code><br>返回值： <strong>返回数组</strong></p>
<p><code>map()</code>方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mapArr(item, index, arr){
    return item * 4;
}

[2, 5, 8, 1, 4].map(mapArr);  // [8,20,32,4,16]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function mapArr(item, index, arr){
    return item * <span class="hljs-number">4</span>;
}

[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].map(mapArr);  <span class="hljs-comment">// [8,20,32,4,16]</span></code></pre>
<blockquote>经常笔试和面试都会考到的一道题 ——实现一个<code>map</code>数组方法，以下是本人自己写的一个方法</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2, 4, 8, 6, 1];

Array.prototype.myMap = function (fn, thisValue) {
    var arr = this,
        len = arr.length,
        tmp = 0,
        result = [];
    thisValue = thisValue || null;
    for (var i = 0; i < len; i++) {
        var item = arr[i],
            index = i;
        tmp = fn.call(thisValue, item, index, arr);
        result.push(tmp);
    }
    return result
}

function mapArr(item, index, arr) {
    return item * 4;
}
arr.myMap(mapArr)   // [8, 16, 32, 24, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>, <span class="hljs-number">1</span>];

<span class="hljs-built_in">Array</span>.prototype.myMap = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, thisValue</span>) </span>{
    <span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">this</span>,
        len = arr.length,
        tmp = <span class="hljs-number">0</span>,
        result = [];
    thisValue = thisValue || <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> item = arr[i],
            index = i;
        tmp = fn.call(thisValue, item, index, arr);
        result.push(tmp);
    }
    <span class="hljs-keyword">return</span> result
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapArr</span>(<span class="hljs-params">item, index, arr</span>) </span>{
    <span class="hljs-keyword">return</span> item * <span class="hljs-number">4</span>;
}
arr.myMap(mapArr)   <span class="hljs-comment">// [8, 16, 32, 24, 4]</span></code></pre>
<h3 id="articleHeader9">8.     forEach()</h3>
<p>使用方法：<code>array.forEach(function(currentValue, index, arr), thisValue)</code><br>返回值： <strong>undefined</strong></p>
<p><code>forEach()</code> 方法用于调用数组的每个元素，并将元素传递给回调函数。这个方法没有返回值。<br>本质上与使用<code>for</code>循环迭代数组一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var items = [1, 2, 4, 7, 3];
var copy = [];

items.forEach(function(item,index){
  copy.push(item*index);
})

console.log(items);  // [ 1, 2, 4, 7, 3 ]
console.log(copy);  // [ 0, 2, 8, 21, 12 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> items = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> <span class="hljs-keyword">copy</span> = [];

items.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item,<span class="hljs-keyword">index</span>)</span><span class="hljs-comment">{
  copy.push(item*index);
}</span>)

<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(items)</span>;</span>  <span class="hljs-comment">// [ 1, 2, 4, 7, 3 ]</span>
console.log(<span class="hljs-keyword">copy</span>);  <span class="hljs-comment">// [ 0, 2, 8, 21, 12 ]</span></code></pre>
<h3 id="articleHeader10">9.     reduce() 与 reduceRight()</h3>
<p>使用方法：<code>array.reduce(function(total, currentValue, currentIndex, arr), initialValue)</code><br>返回值： <strong>返回计算结果</strong></p>
<table>
<thead><tr>
<th align="left">参数</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>function(total,currentValue, index,arr)</code></td>
<td align="left">必需。用于执行每个数组元素的函数。</td>
</tr>
<tr>
<td align="left"><code>initialValue</code></td>
<td align="left">可选。传递给函数的初始值</td>
</tr>
</tbody>
</table>
<p><strong>函数参数</strong></p>
<table>
<thead><tr>
<th align="left">参数</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>total</code></td>
<td align="left">必需。初始值, 或者计算结束后的返回值。</td>
</tr>
<tr>
<td align="left"><code>currentValue</code></td>
<td align="left">必需。当前元素</td>
</tr>
<tr>
<td align="left"><code>currentIndex</code></td>
<td align="left">可选。当前元素的索引</td>
</tr>
<tr>
<td align="left"><code>arr</code></td>
<td align="left">可选。当前元素所属的数组对象。</td>
</tr>
</tbody>
</table>
<p>这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。其中，<code>reduce()</code>方法中数组的第一项开始，逐个遍历到最后；而<code>reduceRight()</code>则从数组的最后一项开始，向前遍历到第一项。</p>
<p>如果没有设置<code>initialValue</code>，<code>total</code>的值为数组第一项，<code>currentValue</code>为数组第二项。<br>如果设置了<code>initialValue</code>，则<code>total</code>的值就是<code>initialValue</code>，<code>currentValue</code>为数组第一项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [65, 44, 12, 4];
 
function getSum(total,currentValue, index,arr) {
    return total + currentValue;
}

var res = numbers.reduce(getSum);

console.log(numbers);  // [ 65, 44, 12, 4 ]
console.log(res);  //  125

var numbers = [65, 44, 12, 4];
 
function getSum(total,currentValue, index,arr) {
    return total + currentValue;
}

var res = numbers.reduce(getSum, 10);  // 初始值设置为10，所以最终结果也相应的加10

console.log(res);  //  135" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">65</span>, <span class="hljs-number">44</span>, <span class="hljs-number">12</span>, <span class="hljs-number">4</span>];
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span>(<span class="hljs-params">total,currentValue, index,arr</span>) </span>{
    <span class="hljs-keyword">return</span> total + currentValue;
}

<span class="hljs-keyword">var</span> res = numbers.reduce(getSum);

<span class="hljs-built_in">console</span>.log(numbers);  <span class="hljs-comment">// [ 65, 44, 12, 4 ]</span>
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">//  125</span>

<span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">65</span>, <span class="hljs-number">44</span>, <span class="hljs-number">12</span>, <span class="hljs-number">4</span>];
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span>(<span class="hljs-params">total,currentValue, index,arr</span>) </span>{
    <span class="hljs-keyword">return</span> total + currentValue;
}

<span class="hljs-keyword">var</span> res = numbers.reduce(getSum, <span class="hljs-number">10</span>);  <span class="hljs-comment">// 初始值设置为10，所以最终结果也相应的加10</span>

<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">//  135</span></code></pre>
<blockquote>具体<code>reduce()</code>方法用得好是能起到很大的作用的，对于批量修改从后台获取的数据十分有用，可以参考<a href="https://www.baidu.com/link?url=vMk5maTi16A9DbQYqHWcIIx-1VOxpF0_nfCj9g3vqDbyHdz5ojfOCu7vXrkTHdkHx88OO3F21C5VvC3GdSs5YK&amp;wd=&amp;eqid=f840630400006f50000000065bced457" rel="nofollow noreferrer" target="_blank">JS进阶篇--JS数组reduce()方法详解及高级技巧</a>
</blockquote>
<h3 id="articleHeader11">10. indexOf() 和 lastIndexOf()</h3>
<p>使用方法：<code>array.indexOf(item,start)</code><br>返回值： <strong>元素在数组中的位置,如果没与搜索到则返回 -1</strong></p>
<p><code>indexOf()</code> 和 <code>lastIndexOf()</code> 方法都接收两个参数：要查找的项和（可选）查找起点位置的索引。<br>其中，<code>indexOf()</code>方法从数组开头开始向后查找；<code>lastIndexOf()</code> 方法从数组末尾开始向前查找。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = [1,2,3,4,5,4,3,2,1];

console.log(n.indexOf(4));  // 3
console.log(n.lastIndexOf(4));  // 5

console.log(n.indexOf(4,4));  // 5
console.log(n.lastIndexOf(4,4));  // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var n = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>];

console.log(n.indexOf(<span class="hljs-number">4</span>));  <span class="hljs-comment">// 3</span>
console.log(n.lastIndexOf(<span class="hljs-number">4</span>));  <span class="hljs-comment">// 5</span>

console.log(n.indexOf(<span class="hljs-number">4</span>,<span class="hljs-number">4</span>));  <span class="hljs-comment">// 5</span>
console.log(n.lastIndexOf(<span class="hljs-number">4</span>,<span class="hljs-number">4</span>));  <span class="hljs-comment">// 3</span></code></pre>
<blockquote>
<code>indexOf()</code>可以使用在数组去重中，如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = [1, 2, 3, 4, 5, 4, 3, 2, 1];
function fn(arr) {
    var result = [],
        len = arr.length;
    for (var i = 0; i < len; i++) {
        var item = arr[i];
        if (result.indexOf(item) < 0) {
            result.push(item);
        }
   }
    return result;
}
console.log(fn(n));  // [1, 2, 3, 4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> n = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> result = [],
        len = arr.length;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> item = arr[i];
        <span class="hljs-keyword">if</span> (result.indexOf(item) &lt; <span class="hljs-number">0</span>) {
            result.push(item);
        }
   }
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-built_in">console</span>.log(fn(n));  <span class="hljs-comment">// [1, 2, 3, 4, 5]</span></code></pre>
<h2 id="articleHeader12">二、会改变原数组</h2>
<h3 id="articleHeader13">1. push()</h3>
<p>使用方法：<code>array.push(item1, item2, ..., itemX)</code><br>返回值： <strong>返回新数组的长度</strong></p>
<p><code>push() </code>方法可向数组的末尾添加一个或多个元素，并返回新的长度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr= [65, 44, 12, 4];
var arr1 = arr.push(2,5);

console.log(arr); // [ 65, 44, 12, 4, 2, 5 ]
console.log(arr1); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr= [<span class="hljs-number">65</span>, <span class="hljs-number">44</span>, <span class="hljs-number">12</span>, <span class="hljs-number">4</span>];
var arr1 = arr.push(<span class="hljs-number">2</span>,<span class="hljs-number">5</span>);

console.log(arr); <span class="hljs-comment">// [ 65, 44, 12, 4, 2, 5 ]</span>
console.log(arr1); <span class="hljs-comment">// 6</span></code></pre>
<h3 id="articleHeader14">2. pop()</h3>
<p>使用方法：<code>array.pop()</code><br>返回值： <strong>数组原来的最后一个元素的值（移除的元素）</strong></p>
<p><code>pop()</code>方法用于删除并返回数组的最后一个元素。返回最后一个元素，会改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [65, 44, 12, 4];
var arr1 = arr.pop();

console.log(arr); // [ 65, 44, 12 ]
console.log(arr1); //  4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">65</span>, <span class="hljs-number">44</span>, <span class="hljs-number">12</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">var</span> arr1 = arr.pop();

<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [ 65, 44, 12 ]</span>
<span class="hljs-built_in">console</span>.log(arr1); <span class="hljs-comment">//  4</span></code></pre>
<h3 id="articleHeader15">3. unshift()</h3>
<p>使用方法：<code>array.unshift(item1,item2, ..., itemX)</code><br>返回值： <strong>返回新数组的长度</strong></p>
<p><code>unshift() </code>方法可向数组的开头添加一个或更多元素，并返回新的长度。返回新长度，改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [65, 44, 12, 4];
var arr1 = arr.unshift(1);

console.log(arr); // [ 1, 65, 44, 12, 4 ]
console.log(arr1); //  5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">65</span>, <span class="hljs-number">44</span>, <span class="hljs-number">12</span>, <span class="hljs-number">4</span>];
var arr1 = arr.unshift(<span class="hljs-number">1</span>);

console.log(arr); <span class="hljs-comment">// [ 1, 65, 44, 12, 4 ]</span>
console.log(arr1); <span class="hljs-comment">//  5</span></code></pre>
<h3 id="articleHeader16">4. shift()</h3>
<p>使用方法：<code>array.shift()</code><br>返回值： <strong>数组原来的第一个元素的值（移除的元素）</strong></p>
<p><code>shift() </code>方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。返回第一个元素，改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [65, 44, 12, 4];
var arr1 = arr.shift();

console.log(arr); // [ 44, 12, 4 ]
console.log(arr1); //   65" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">65</span>, <span class="hljs-number">44</span>, <span class="hljs-number">12</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">var</span> arr1 = arr.shift();

<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [ 44, 12, 4 ]</span>
<span class="hljs-built_in">console</span>.log(arr1); <span class="hljs-comment">//   65</span></code></pre>
<h3 id="articleHeader17">5. sort()</h3>
<p>使用方法：<code>array.sort(sortfunction)</code><br>返回值： <strong>返回排序后的数组（默认升序）</strong></p>
<p><code>sort() </code>法用于对数组的元素进行排序。<br>排序顺序可以是字母或数字，并按升序或降序。<br>默认排序顺序为按字母升序。<br><strong>P.S 由于排序是按照 Unicode code 位置排序，所以在排序数字的时候，会出现"10"在"5"的前面，所以使用数字排序，你必须通过一个函数作为参数来调用。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [0, 1, 5, 10, 15];
values.sort();
console.log(values);  // [ 0, 1, 10, 15, 5 ]

values.sort(function(a, b){
  return a - b;
})
console.log(values);  //  [0, 1, 5, 10, 15 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">values</span> = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
<span class="hljs-built_in">values</span>.<span class="hljs-built_in">sort</span>();
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">values</span>);  // [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">5</span> ]

<span class="hljs-built_in">values</span>.<span class="hljs-built_in">sort</span>(function(a, b){
  <span class="hljs-built_in">return</span> a - b;
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">values</span>);  //  [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span> ]</code></pre>
<h3 id="articleHeader18">6. reverse()</h3>
<p>使用方法：<code>array.reverse()</code><br>返回值： <strong>返回颠倒后的数组</strong></p>
<p><code>reverse() </code>方法用于颠倒数组中元素的顺序。返回的是颠倒后的数组，会改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [0, 1, 5, 10, 15];
values.reverse();
console.log(values);  // [ 15, 10, 5, 1, 0 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var values = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
values.reverse();
console.log(values);  <span class="hljs-comment">// [ 15, 10, 5, 1, 0 ]</span></code></pre>
<h3 id="articleHeader19">7. fill() —— ES6新增的方法</h3>
<p>使用方法：<code>array.fill(value, start, end)</code><br>返回值： <strong>返回新的被替换的数组</strong></p>
<p><code>fill()</code>方法用于将一个固定值替换数组的元素。</p>
<table>
<thead><tr>
<th align="left">参数</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">value</td>
<td align="left">必需。填充的值。</td>
</tr>
<tr>
<td align="left">start</td>
<td align="left">可选。开始填充位置。</td>
</tr>
<tr>
<td align="left">end</td>
<td align="left">可选。停止填充位置(不包含) (默认为 array.length)</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [0, 1, 5, 10, 15];
values.fill(2);
console.log(values);  // [ 2, 2, 2, 2, 2 ]

values = [0, 1, 5, 10, 15];
values.fill(2,3,4);
console.log(values);  // [ 0, 1, 5, 2, 15 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var values = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
values.fill(<span class="hljs-number">2</span>);
console.log(values);  <span class="hljs-comment">// [ 2, 2, 2, 2, 2 ]</span>

values = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
values.fill(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);
console.log(values);  <span class="hljs-comment">// [ 0, 1, 5, 2, 15 ]</span></code></pre>
<h3 id="articleHeader20">8. splice()</h3>
<p>使用方法：<code>array.splice(index,howmany,item1,.....,itemX)</code><br>返回值： <strong>如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组</strong></p>
<p><code>splice()</code>有多种用法：</p>
<ol>
<li>
<strong>删除:</strong> 可以删除任意数量的项，只需要指定2个参数：要删除的第一项的位置和要删除的项数。<code>splice(0,2) // 会删除数组中前两项</code>
</li>
<li>
<strong>插入:</strong> 可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。<code>splice(2,0,1,4) // 会从数组位置2的地方插入1和4</code>
</li>
<li>
<strong>替换:</strong> 可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需提供3个参数：起始位置、要删除的项数和要插入的项。插入的项不必与删除的项数相等。<code>splice(2,3,1,4) // 会从数组位置2删除两项，然后再从位置2的地方插入1和4</code>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 删除
var values = [4,8,0,3,7];
var remove = values.splice(3,1);
console.log(values);  // [ 4, 8, 0, 7 ]
console.log(remove);  // [ 3 ]    删除第四项
// 插入
remove = values.splice(2,0,1,2);
console.log(values);  // [ 4, 8, 1, 2, 0, 7 ]
console.log(remove);  // []  从位置2开始插入两项，由于没有删除所有返回空函数
// 替换
remove = values.splice(2,2,6,9,10);
console.log(values);  // [ 4, 8, 6, 9, 10, 0, 7 ]
console.log(remove);  // [ 1, 2 ]  从位置2开始删除两项，同时插入三项" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 删除</span>
var values = [<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">7</span>];
var remove = values.splice(<span class="hljs-number">3</span>,<span class="hljs-number">1</span>);
console.log(values);  <span class="hljs-comment">// [ 4, 8, 0, 7 ]</span>
console.log(remove);  <span class="hljs-comment">// [ 3 ]    删除第四项</span>
<span class="hljs-comment">// 插入</span>
remove = values.splice(<span class="hljs-number">2</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);
console.log(values);  <span class="hljs-comment">// [ 4, 8, 1, 2, 0, 7 ]</span>
console.log(remove);  <span class="hljs-comment">// []  从位置2开始插入两项，由于没有删除所有返回空函数</span>
<span class="hljs-comment">// 替换</span>
remove = values.splice(<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">6</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>);
console.log(values);  <span class="hljs-comment">// [ 4, 8, 6, 9, 10, 0, 7 ]</span>
console.log(remove);  <span class="hljs-comment">// [ 1, 2 ]  从位置2开始删除两项，同时插入三项</span></code></pre>
<h3 id="articleHeader21">9. copyWithin() —— ES6新增的方法</h3>
<p>使用方法：<code>array.copyWithin(target, start, end)</code><br>返回值： <strong>返回新复制的数组</strong></p>
<p><code>copyWithin()</code>方法选择数组的某个下标，从该位置开始复制数组元素，默认从0开始复制。也可以指定要复制的元素范围。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fruits = [1,2,3,4,5,6];
fruits.copyWithin(1);  // [ 1, 1, 2, 3, 4, 5 ]   从下标为1的元素开始，复制数组

fruits.copyWithin(3, 0, 3);  // [ 1, 2, 3, 1, 2, 3 ]  从下标为3的元素开始，复制数组坐标为0到2的数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var fruits = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
fruits.copyWithin(<span class="hljs-number">1</span>);  <span class="hljs-comment">// [ 1, 1, 2, 3, 4, 5 ]   从下标为1的元素开始，复制数组</span>

fruits.copyWithin(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">// [ 1, 2, 3, 1, 2, 3 ]  从下标为3的元素开始，复制数组坐标为0到2的数组</span></code></pre>
<h2 id="articleHeader22">三、其他</h2>
<h3 id="articleHeader23">1. form() —— ES6新增的方法</h3>
<p>使用方法：<code>Array.from(object, mapFunction, thisValue)</code><br>返回值： <strong>数组对象</strong></p>
<p><code>from()</code> 方法用于字符串、拥有 <code>length</code> 属性的对象(<code>伪数组</code>)或可迭代的对象(<code>Set/Map</code>)来返回一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myArr = Array.from(&quot;RUNOOB&quot;);
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
var s1 = Array.from(s);
var m1 = Array.from(m);

console.log(myArr);  // [ &quot;R&quot;, &quot;U&quot;, &quot;N&quot;, &quot;O&quot;, &quot;O&quot;, &quot;B&quot; ]
console.log(s1);  // [ &quot;A&quot;, &quot;B&quot;, &quot;C&quot; ]
console.log(m1);  // [ [ 1, &quot;x&quot; ], [ 2, &quot;y&quot; ], [ 3, &quot;z&quot; ]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var myArr = <span class="hljs-symbol">Array</span>.from(<span class="hljs-string">"RUNOOB"</span>);
var s = new <span class="hljs-symbol">Set</span>([<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]);
var m = new <span class="hljs-symbol">Map</span>([[<span class="hljs-number">1</span>, <span class="hljs-string">'x'</span>], [<span class="hljs-number">2</span>, <span class="hljs-string">'y'</span>], [<span class="hljs-number">3</span>, <span class="hljs-string">'z'</span>]]);
var s1 = <span class="hljs-symbol">Array</span>.from(s);
var m1 = <span class="hljs-symbol">Array</span>.from(m);

console.log(myArr);  // [ <span class="hljs-string">"R"</span>, <span class="hljs-string">"U"</span>, <span class="hljs-string">"N"</span>, <span class="hljs-string">"O"</span>, <span class="hljs-string">"O"</span>, <span class="hljs-string">"B"</span> ]
console.log(s1);  // [ <span class="hljs-string">"A"</span>, <span class="hljs-string">"B"</span>, <span class="hljs-string">"C"</span> ]
console.log(m1);  // [ [ <span class="hljs-number">1</span>, <span class="hljs-string">"x"</span> ], [ <span class="hljs-number">2</span>, <span class="hljs-string">"y"</span> ], [ <span class="hljs-number">3</span>, <span class="hljs-string">"z"</span> ]]</code></pre>
<blockquote>对于伪数组转换为标准数据除了<code>Array.prototype.slice.call(arguments)</code>，还可以使用以下方法：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(){
     var arg = Array.from(arguments);
     arg.push(5);
     console.log(arg);  // [ 1, 2, 3, 4, 5 ]
}
test(1,2,3,4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">var</span> arg = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>);
     arg.push(<span class="hljs-number">5</span>);
     <span class="hljs-built_in">console</span>.log(arg);  <span class="hljs-comment">// [ 1, 2, 3, 4, 5 ]</span>
}
test(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);</code></pre>
<blockquote>还可以结合<code>new Set()</code>进行数组的去重</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> function dedupe(array){
return Array.from(new Set(array));
}
dedupe([1,1,2,3]) //[1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dedupe</span>(<span class="hljs-params">array</span>)</span>{
<span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(array));
}
dedupe([<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment">//[1,2,3]</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 数组操作方法小结

## 原文链接
[https://segmentfault.com/a/1190000016780133](https://segmentfault.com/a/1190000016780133)


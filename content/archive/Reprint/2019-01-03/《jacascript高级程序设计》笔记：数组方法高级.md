---
title: '《jacascript高级程序设计》笔记：数组方法高级' 
date: 2019-01-03 2:30:11
hidden: true
slug: b0gvhpsem1c
categories: [reprint]
---

{{< raw >}}

                    
<p>这一章节主要记录的是ES5的方法，在低版本浏览器上存在一定的兼容，但是主流手机上使用大可放心。</p>
<h2 id="articleHeader0">位置方法</h2>
<blockquote><p>ECMAScript 5 为数组实例添加了两个位置方法:indexOf()和 lastIndexOf()。</p></blockquote>
<p>1.<strong>参数</strong>: 要查找的项和(可选的)表示查找起点位置的索引。<br>2.indexOf()方法从数组的开头(位置0)开始向后查找，lastIndexOf()方法则从数组的末尾开始向前查找<br>3.两个方法都返回要查找的项在数组中的位置，或者在<strong>没找到的情况下返回-1</strong>。<br>4.在比较第一个参数与数组中的每一项时，会使用<strong>全等操作符</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4));        //3

alert(numbers.lastIndexOf(4)); //5
alert(numbers.indexOf(4, 4));     //5
alert(numbers.lastIndexOf(4, 4)); //3

var person = { name: &quot;Nicholas&quot; };
var people = [{ name: &quot;Nicholas&quot; }];
var morePeople = [person];
alert(people.indexOf(person));     //-1
alert(morePeople.indexOf(person)); //0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>];
alert(numbers.indexOf(<span class="hljs-number">4</span>));        <span class="hljs-comment">//3</span>

alert(numbers.lastIndexOf(<span class="hljs-number">4</span>)); <span class="hljs-comment">//5</span>
alert(numbers.indexOf(<span class="hljs-number">4</span>, <span class="hljs-number">4</span>));     <span class="hljs-comment">//5</span>
alert(numbers.lastIndexOf(<span class="hljs-number">4</span>, <span class="hljs-number">4</span>)); <span class="hljs-comment">//3</span>

<span class="hljs-keyword">var</span> person = { name: <span class="hljs-string">"Nicholas"</span> };
<span class="hljs-keyword">var</span> people = [{ name: <span class="hljs-string">"Nicholas"</span> }];
<span class="hljs-keyword">var</span> morePeople = [person];
alert(people.indexOf(person));     <span class="hljs-comment">//-1</span>
alert(morePeople.indexOf(person)); <span class="hljs-comment">//0</span></code></pre>
<h2 id="articleHeader1">迭代方法</h2>
<p><strong>声明</strong>：以下方法参数都是function类型，默认有传参，方法中的function回调支持3个参数，第1个是遍历的数组内容；第2个是对应的数组索引，第3个是数组本身</p>
<p><strong>1.forEach()方法</strong><br>【遍历】遍历数组，没有返回值！没有返回值！没有返回值！重要的事情说三遍<br>forEach()方法几乎可以代替for的用法，如果对数组的返回或跳出没有要求</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2 ,3, 4].forEach(function(value, index, arr){
    console.log(value); // 当前值
    console.log(index); // 当前索引
    console.log(arr); // 指向当前数组
});

// 等同于
var array = [1, 2, 3, 4];
for (var k = 0, length = array.length; k < length; k++) {
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span> ,<span class="hljs-number">3</span>, <span class="hljs-number">4</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, index, arr)</span>{</span>
    console.<span class="hljs-built_in">log</span>(value); <span class="hljs-comment">// 当前值</span>
    console.<span class="hljs-built_in">log</span>(index); <span class="hljs-comment">// 当前索引</span>
    console.<span class="hljs-built_in">log</span>(arr); <span class="hljs-comment">// 指向当前数组</span>
});

<span class="hljs-comment">// 等同于</span>
var array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">for</span> (var k = <span class="hljs-number">0</span>, <span class="hljs-built_in">length</span> = array.<span class="hljs-built_in">length</span>; k &lt; <span class="hljs-built_in">length</span>; k++) {
    <span class="hljs-comment">//...</span>
}</code></pre>
<p>用法虽然简单，但在低版本的浏览器上存在兼容，下面提供一个兼容性的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对于古董浏览器，如IE6-IE8

if (typeof Array.prototype.forEach != &quot;function&quot;) {
  Array.prototype.forEach = function (fn, context) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (typeof fn === &quot;function&quot; &amp;&amp; Object.prototype.hasOwnProperty.call(this, k)) {
        fn.call(context, this[k], k, this);
      }
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 对于古董浏览器，如IE6-IE8</span>

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.forEach != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.forEach = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span> &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(<span class="hljs-keyword">this</span>, k)) {
        fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>);
      }
    }
  };
}</code></pre>
<p><strong>2.map()方法</strong></p>
<p>【映射】对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组，<strong>返回的数组长度一定与原数组长度相同，常用来改造某一数组</strong>，例如对某段数组进行筛选或插入新的元素</p>
<p>基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 含有return
[1, 2, 3, 4].map(function (item) {
  return item * item; // [1, 4, 9, 16]
});

// 不含return
[1, 2, 3, 4].map(function (item) {
  item * item; // [undefined, undefined, undefined, undefined]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 含有return</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].map(function (item) {
  return item * item; <span class="hljs-comment">// [1, 4, 9, 16]</span>
});

<span class="hljs-comment">// 不含return</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].map(function (item) {
  item * item; <span class="hljs-comment">// [undefined, undefined, undefined, undefined]</span>
});</code></pre>
<p>用于筛选某一段数组，返回符合要求对元素组成的新数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = [
  {name: &quot;佟丽娅&quot;, &quot;email&quot;: &quot;zhang@email.com&quot;},
  {name: &quot;赵丽颖&quot;,   &quot;email&quot;: &quot;jiang@email.com&quot;},
  {name: &quot;肉巴&quot;,  &quot;email&quot;: &quot;li@email.com&quot;}
];

var emails = users.map(function (user) { return user.email; });
// [&quot;zhang@email.com&quot;, &quot;jiang@email.com&quot;, &quot;li@email.com&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>var users = [
  {name: <span class="hljs-string">"佟丽娅"</span>, <span class="hljs-string">"email"</span>: <span class="hljs-string">"zhang@email.com"</span>},
  {name: <span class="hljs-string">"赵丽颖"</span>,   <span class="hljs-string">"email"</span>: <span class="hljs-string">"jiang@email.com"</span>},
  {name: <span class="hljs-string">"肉巴"</span>,  <span class="hljs-string">"email"</span>: <span class="hljs-string">"li@email.com"</span>}
];

var emails = users.map(function (user) { <span class="hljs-keyword">return</span> user.email; });
<span class="hljs-regexp">//</span> [<span class="hljs-string">"zhang@email.com"</span>, <span class="hljs-string">"jiang@email.com"</span>, <span class="hljs-string">"li@email.com"</span>]</code></pre>
<p>用于插入新的元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = [
  {name: &quot;佟丽娅&quot;, &quot;email&quot;: &quot;tongliya@email.com&quot;},
  {name: &quot;赵丽颖&quot;,   &quot;email&quot;: &quot;zhaoliying@email.com&quot;},
  {name: &quot;肉巴&quot;,  &quot;email&quot;: &quot;dilireba@email.com&quot;}
];
users.map(function(v){
    v.enName = v.email.slice(0, v.email.indexOf('@'));
    return v
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var users = [
  {name: <span class="hljs-string">"佟丽娅"</span>, <span class="hljs-string">"email"</span>: <span class="hljs-string">"tongliya@email.com"</span>},
  {name: <span class="hljs-string">"赵丽颖"</span>,   <span class="hljs-string">"email"</span>: <span class="hljs-string">"zhaoliying@email.com"</span>},
  {name: <span class="hljs-string">"肉巴"</span>,  <span class="hljs-string">"email"</span>: <span class="hljs-string">"dilireba@email.com"</span>}
];
users.<span class="hljs-keyword">map</span>(<span class="hljs-keyword">function</span>(v){
    v.enName = v.email.slice(<span class="hljs-number">0</span>, v.email.indexOf(<span class="hljs-string">'@'</span>));
    return v
})</code></pre>
<p>兼容性写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Array.prototype.map != &quot;function&quot;) {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === &quot;function&quot;) {
      for (var k = 0, length = this.length; k < length; k++) {      
         arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.map != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.map = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {      
         arr.push(fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>));
      }
    }
    <span class="hljs-keyword">return</span> arr;
  };
}</code></pre>
<p><strong>3.filter()方法</strong></p>
<p>【筛选】对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组<br>与map()方法的用法较为相似，但是仅返回满足要求的项，<strong>返回的新的数组一定是原数组中的元素，且数组长度小于等于原数组长度</strong></p>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0, 1, 2, 3].filter(function(item) {
    return item; // [1, 2, 3]
});

var users = [
  {name: &quot;佟丽娅&quot;, &quot;email&quot;: &quot;tongliya@email.com&quot;, age: 24},
  {name: &quot;赵丽颖&quot;,   &quot;email&quot;: &quot;zhaoliying@email.com&quot;, age: 18},
  {name: &quot;肉巴&quot;,  &quot;email&quot;: &quot;dilireba@email.com&quot;, age: 17}
];
users.map(function(v){
    return v.age > 18// {name: &quot;佟丽娅&quot;, email: &quot;tongliya@email.com&quot;, age: 24}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].filter(<span class="hljs-keyword">function</span>(<span class="hljs-literal">item</span>) {
    return item; // [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
});

var users = [
  {name: <span class="hljs-string">"佟丽娅"</span>, <span class="hljs-string">"email"</span>: <span class="hljs-string">"tongliya@email.com"</span>, age: <span class="hljs-number">24</span>},
  {name: <span class="hljs-string">"赵丽颖"</span>,   <span class="hljs-string">"email"</span>: <span class="hljs-string">"zhaoliying@email.com"</span>, age: <span class="hljs-number">18</span>},
  {name: <span class="hljs-string">"肉巴"</span>,  <span class="hljs-string">"email"</span>: <span class="hljs-string">"dilireba@email.com"</span>, age: <span class="hljs-number">17</span>}
];
users.<span class="hljs-keyword">map</span>(<span class="hljs-keyword">function</span>(v){
    return v.age &gt; <span class="hljs-number">18</span>// {name: <span class="hljs-string">"佟丽娅"</span>, email: <span class="hljs-string">"tongliya@email.com"</span>, age: <span class="hljs-number">24</span>}
})</code></pre>
<p>兼容性写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Array.prototype.filter != &quot;function&quot;) {
  Array.prototype.filter = function (fn, context) {
    var arr = [];
    if (typeof fn === &quot;function&quot;) {
       for (var k = 0, length = this.length; k < length; k++) {
          fn.call(context, this[k], k, this) &amp;&amp; arr.push(this[k]);
       }
    }
    return arr;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.filter != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.filter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
       <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
          fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>) &amp;&amp; arr.push(<span class="hljs-keyword">this</span>[k]);
       }
    }
    <span class="hljs-keyword">return</span> arr;
  };
}</code></pre>
<p><strong>every()方法</strong></p>
<p>【全满足返回true】对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true</p>
<p>基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数组中所有项满足要求时返回true，否则为false
[1,2,3,4,5,6,7].every(function(v){
    return v > 2; // false
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 数组中所有项满足要求时返回true，否则为false</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>].every(function(v){
    return v &gt; <span class="hljs-number">2</span>; <span class="hljs-comment">// false</span>
})</code></pre>
<p>兼容性写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Array.prototype.every != &quot;function&quot;) {
  Array.prototype.every = function (fn, context) {
    var passed = true;
    if (typeof fn === &quot;function&quot;) {
       for (var k = 0, length = this.length; k < length; k++) {
          if (passed === false) break;
          passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.every != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.every = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
    <span class="hljs-keyword">var</span> passed = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
       <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
          <span class="hljs-keyword">if</span> (passed === <span class="hljs-literal">false</span>) <span class="hljs-keyword">break</span>;
          passed = !!fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>);
      }
    }
    <span class="hljs-keyword">return</span> passed;
  };
}</code></pre>
<p><strong>some()方法</strong></p>
<p>【某项满足返回true】对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true</p>
<p>基本写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数组中某一项满足要求时返回true，否则为false
[1,2,3,4,5,6,7].some(function(v){
    return v > 2; // true
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 数组中某一项满足要求时返回true，否则为false</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>].some(function(v){
    return v &gt; <span class="hljs-number">2</span>; <span class="hljs-comment">// true</span>
})</code></pre>
<p>兼容性写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Array.prototype.some != &quot;function&quot;) {
  Array.prototype.some = function (fn, context) {
    var passed = false;
    if (typeof fn === &quot;function&quot;) {
         for (var k = 0, length = this.length; k < length; k++) {
          if (passed === true) break;
          passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.some != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.some = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
    <span class="hljs-keyword">var</span> passed = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
         <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
          <span class="hljs-keyword">if</span> (passed === <span class="hljs-literal">true</span>) <span class="hljs-keyword">break</span>;
          passed = !!fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>);
      }
    }
    <span class="hljs-keyword">return</span> passed;
  };
}</code></pre>
<h2 id="articleHeader2">归并方法</h2>
<p>归并方法包括reduce()和reduceRight()两种，写法同上面的方式相似。函数接受4个参数：之前值、当前值、索引值以及数组本身。initialValue参数可选，表示初始值。若指定，则当作最初使用的previous值；如果缺省，则使用数组的第一个元素作为previous初始值，同时current往后排一位，相比有initialValue值少一次迭代</p>
<p><strong>1.reduce()方法</strong></p>
<p>基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = [1, 2, 3, 4].reduce(function (previous, current, index, array) {
  return previous + current;
});

console.log(sum); // 10

// 执行过程
// 初始设置
previous = initialValue = 1, current = 2
// 第一次迭代
previous = (1 + 2) =  3, current = 3
// 第二次迭代
previous = (3 + 3) =  6, current = 4
// 第三次迭代
previous = (6 + 4) =  10, current = undefined (退出)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var sum = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].reduce(function (previous, current, index, array) {
  return previous + current;
});

console.log(sum); <span class="hljs-comment">// 10</span>

<span class="hljs-comment">// 执行过程</span>
<span class="hljs-comment">// 初始设置</span>
previous = initialValue = <span class="hljs-number">1</span>, current = <span class="hljs-number">2</span>
<span class="hljs-comment">// 第一次迭代</span>
previous = (<span class="hljs-number">1</span> + <span class="hljs-number">2</span>) =  <span class="hljs-number">3</span>, current = <span class="hljs-number">3</span>
<span class="hljs-comment">// 第二次迭代</span>
previous = (<span class="hljs-number">3</span> + <span class="hljs-number">3</span>) =  <span class="hljs-number">6</span>, current = <span class="hljs-number">4</span>
<span class="hljs-comment">// 第三次迭代</span>
previous = (<span class="hljs-number">6</span> + <span class="hljs-number">4</span>) =  <span class="hljs-number">10</span>, current = undefined (退出)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = [1, 2, 3, 4].reduce(function (previous, current, index, array) {
  return previous + current;
}, 10);

console.log(sum); // 20
// 执行过程
// 初始设置
initialValue = 10, previous = 1, current = 2
// 第一次迭代
previous = (10 + 1) =  11, current = 2
// 第二次迭代
previous = (11 + 2) =  13, current = 3
// 第三次迭代
previous = (13 + 3) =  16, current = 4
// 第四次迭代
previous = (16 + 4) =  20, current = undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var sum = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].reduce(function (previous, current, index, array) {
  return previous + current;
}, <span class="hljs-number">10</span>);

console.log(sum); <span class="hljs-comment">// 20</span>
<span class="hljs-comment">// 执行过程</span>
<span class="hljs-comment">// 初始设置</span>
initialValue = <span class="hljs-number">10</span>, previous = <span class="hljs-number">1</span>, current = <span class="hljs-number">2</span>
<span class="hljs-comment">// 第一次迭代</span>
previous = (<span class="hljs-number">10</span> + <span class="hljs-number">1</span>) =  <span class="hljs-number">11</span>, current = <span class="hljs-number">2</span>
<span class="hljs-comment">// 第二次迭代</span>
previous = (<span class="hljs-number">11</span> + <span class="hljs-number">2</span>) =  <span class="hljs-number">13</span>, current = <span class="hljs-number">3</span>
<span class="hljs-comment">// 第三次迭代</span>
previous = (<span class="hljs-number">13</span> + <span class="hljs-number">3</span>) =  <span class="hljs-number">16</span>, current = <span class="hljs-number">4</span>
<span class="hljs-comment">// 第四次迭代</span>
previous = (<span class="hljs-number">16</span> + <span class="hljs-number">4</span>) =  <span class="hljs-number">20</span>, current = undefined</code></pre>
<p>数组扁平化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matrix = [
  [1, 2],
  [3, 4],
  [5, 6]
];

// 二维数组扁平化
var flatten = matrix.reduce(function (previous, current) {
  return previous.concat(current);
});

console.log(flatten); // [1, 2, 3, 4, 5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> matrix = [
  [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">5</span>, <span class="hljs-number">6</span>]
];

<span class="hljs-comment">// 二维数组扁平化</span>
<span class="hljs-keyword">var</span> flatten = matrix.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">previous, current</span>) </span>{
  <span class="hljs-keyword">return</span> previous.concat(current);
});

<span class="hljs-built_in">console</span>.log(flatten); <span class="hljs-comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>
<p>兼容写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Array.prototype.reduce != &quot;function&quot;) {
  Array.prototype.reduce = function (callback, initialValue ) {
     var previous = initialValue, k = 0, length = this.length;
     if (typeof initialValue === &quot;undefined&quot;) {
        previous = this[0];
        k = 1;
     }
     
    if (typeof callback === &quot;function&quot;) {
      for (k; k < length; k++) {
         this.hasOwnProperty(k) &amp;&amp; (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.reduce != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.reduce = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback, initialValue </span>) </span>{
     <span class="hljs-keyword">var</span> previous = initialValue, k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length;
     <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> initialValue === <span class="hljs-string">"undefined"</span>) {
        previous = <span class="hljs-keyword">this</span>[<span class="hljs-number">0</span>];
        k = <span class="hljs-number">1</span>;
     }
     
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">"function"</span>) {
      <span class="hljs-keyword">for</span> (k; k &lt; length; k++) {
         <span class="hljs-keyword">this</span>.hasOwnProperty(k) &amp;&amp; (previous = callback(previous, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>));
      }
    }
    <span class="hljs-keyword">return</span> previous;
  };
}</code></pre>
<p><strong>2.reduceRight()方法</strong></p>
<p>与reduce()方法相同，只是执行顺序是从右往左</p>
<p>兼容性写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Array.prototype.reduceRight != &quot;function&quot;) {
  Array.prototype.reduceRight = function (callback, initialValue ) {
    var length = this.length, k = length - 1, previous = initialValue;
    if (typeof initialValue === &quot;undefined&quot;) {
        previous = this[length - 1];
        k--;
    }
    if (typeof callback === &quot;function&quot;) {
       for (k; k > -1; k-=1) {          
          this.hasOwnProperty(k) &amp;&amp; (previous = callback(previous, this[k], k, this));
       }
    }
    return previous;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.reduceRight != <span class="hljs-string">"function"</span>) {
  <span class="hljs-built_in">Array</span>.prototype.reduceRight = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback, initialValue </span>) </span>{
    <span class="hljs-keyword">var</span> length = <span class="hljs-keyword">this</span>.length, k = length - <span class="hljs-number">1</span>, previous = initialValue;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> initialValue === <span class="hljs-string">"undefined"</span>) {
        previous = <span class="hljs-keyword">this</span>[length - <span class="hljs-number">1</span>];
        k--;
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">"function"</span>) {
       <span class="hljs-keyword">for</span> (k; k &gt; <span class="hljs-number">-1</span>; k-=<span class="hljs-number">1</span>) {          
          <span class="hljs-keyword">this</span>.hasOwnProperty(k) &amp;&amp; (previous = callback(previous, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>));
       }
    }
    <span class="hljs-keyword">return</span> previous;
  };
}</code></pre>
<p>参考：<a href="http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/#every" rel="nofollow noreferrer" target="_blank">ES5中新增的Array方法详细说明</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《jacascript高级程序设计》笔记：数组方法高级

## 原文链接
[https://segmentfault.com/a/1190000010779315](https://segmentfault.com/a/1190000010779315)


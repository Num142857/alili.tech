---
title: 'JavaScript数组迭代（遍历）方法' 
date: 2019-01-11 2:30:07
hidden: true
slug: 7dqldu9id15
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>ES5和ES6中新增了不少东西，对于数组而言，新增了不少迭代方法，让我们可以抛弃<code>for</code>循环，更方便的写JS代码。</p>
<h2 id="articleHeader1">正文</h2>
<p>ES5和ES6中新增的的数组迭代方法如下：</p>
<ul>
<li><p>forEach</p></li>
<li><p>map</p></li>
<li><p>filter</p></li>
<li><p>some</p></li>
<li><p>every</p></li>
<li><p>reduce / reduceRight</p></li>
<li><p>find / findIndex</p></li>
</ul>
<p>其中，find / findIndex是ES6新增的，其余都是ES5新增的。所以这些方法对低版本IE都不兼容。<br>接下来我们看看这些方法如何使用并在低版本IE进行兼容。</p>
<h3 id="articleHeader2">forEach</h3>
<p>forEach方法是这些方法里面最基本的一个方法，它的作用是<strong>对数组的每个元素执行一次提供的函数</strong>。<br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3];

arr.forEach(function (element, index, array) {
  console.log(element, index, array)
})

//output
1 0 [1, 2, 3]
2 1 [1, 2, 3]
3 2 [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

arr.forEach(function (element, index, array) {
  console.log(element, index, array)
})

<span class="hljs-comment">//output</span>
<span class="hljs-number">1</span> <span class="hljs-number">0</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="hljs-number">2</span> <span class="hljs-number">1</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="hljs-number">3</span> <span class="hljs-number">2</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]</code></pre>
<p>forEach方法中的callback函数会被依次传入三个参数：</p>
<ul>
<li><p>数组当前项的值</p></li>
<li><p>数组当前项的索引</p></li>
<li><p>数组对象本身</p></li>
</ul>
<p>forEach方法还可以传入第二个参数，这个参数是可选的。<strong>如果给forEach传递了第二个参数，callback函数里的<code>this</code>将指向这个参数。</strong>如果没有传入第二个参数，则<code>this</code>指向全局对象（在浏览器是为window），严格模式下是<code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3];
var obj = {name: 'zhang'};

arr.forEach(function (element, index, array) {
  console.log(element, index, array, this)
}, obj)

// output
1 0 [1, 2, 3] {name: &quot;zhang&quot;}
2 1 [1, 2, 3] {name: &quot;zhang&quot;}
3 2 [1, 2, 3] {name: &quot;zhang&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>: <span class="hljs-string">'zhang'</span>};

arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-built_in">console</span>.log(element, index, array, <span class="hljs-keyword">this</span>)
}, obj)

<span class="hljs-comment">// output</span>
<span class="hljs-number">1</span> <span class="hljs-number">0</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>] {<span class="hljs-attr">name</span>: <span class="hljs-string">"zhang"</span>}
<span class="hljs-number">2</span> <span class="hljs-number">1</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>] {<span class="hljs-attr">name</span>: <span class="hljs-string">"zhang"</span>}
<span class="hljs-number">3</span> <span class="hljs-number">2</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>] {<span class="hljs-attr">name</span>: <span class="hljs-string">"zhang"</span>}</code></pre>
<p>下面我们用forEach写一个稍显完整的例子了，数组求和：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = 0;

[1, 2, 3].forEach(function (element, index, array) {
  console.log(array[index] == element); // true
  sum += item;
});

console.log(sum); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>var <span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>;

[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element, index, array)</span> {</span>
  console.<span class="hljs-built_in">log</span>(array[index] == element); <span class="hljs-comment">// true</span>
  <span class="hljs-built_in">sum</span> += item;
});

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">sum</span>); <span class="hljs-comment">// 6</span></code></pre>
<p>最后我们对低版本IE进行一下拓展，是这个方法就有更好的兼容性,代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.forEach = Array.prototype.forEach || function(fn, context){
  for (var k = 0, length = this.length; k < length; k++) {
    if (typeof fn === &quot;function&quot; &amp;&amp; Object.prototype.hasOwnProperty.call(this, k)) {
      fn.call(context, this[k], k, this);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.forEach = <span class="hljs-built_in">Array</span>.prototype.forEach || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, context</span>)</span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span> &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(<span class="hljs-keyword">this</span>, k)) {
      fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>);
    }
  }
}</code></pre>
<h3 id="articleHeader3">map</h3>
<p>map方法的作用就是将原数组按照一定的规则映射成一个新的数组。再将其返回，<strong>是返回一个新的数组，而不是将原数组直接改变</strong>。使用方法和参数都跟forEach相似。<br>下面是一个数值求平方的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [1, 2, 3];

var arrayOfSquares = data.map(function (element) {
  return element * element;
});

console.log(arrayOfSquares); //[1, 4, 9]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

<span class="hljs-keyword">var</span> arrayOfSquares = data.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">return</span> element * element;
});

<span class="hljs-built_in">console</span>.log(arrayOfSquares); <span class="hljs-comment">//[1, 4, 9]</span></code></pre>
<p>callback需要有return值，如果没有，就像下面这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [1, 2, 3];

var arrayOfSquares = data.map(function (element) {
  element * element;
});

console.log(arrayOfSquares); // [undefined, undefined, undefined]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

<span class="hljs-keyword">var</span> arrayOfSquares = data.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
  element * element;
});

<span class="hljs-built_in">console</span>.log(arrayOfSquares); <span class="hljs-comment">// [undefined, undefined, undefined]</span></code></pre>
<p>最后我们对map方法进行一下拓展：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.map = Array.prototype.map || function (fn, context) {
  var arr = [];
  if (typeof fn === &quot;function&quot;) {
    for (var k = 0, length = this.length; k < length; k++) {      
      arr.push(fn.call(context, this[k], k, this));
    }
  }
  return arr;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.map = <span class="hljs-built_in">Array</span>.prototype.map || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">var</span> arr = [];
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {      
      arr.push(fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>));
    }
  }
  <span class="hljs-keyword">return</span> arr;
};</code></pre>
<h3 id="articleHeader4">filter</h3>
<p>filter为“过滤”、“筛选”的意思。指数组filter后，返回过滤后的新数组。用法和参数跟map差不多。<br><strong>与map方法不同的是，filter方法的callback函数需要返回弱等于<code>true</code>或<code>false</code>的值。如果为<code>true</code>，则通过，否则，不通过。</strong><br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [0, 1, 2, 3];

var newArr = arr.filter(function (element, index, array) {
  return e;
})

var newArr2 = arr.filter(function (element, index, array) {
  return e>=2; 
})

console.log(newArr); // [1, 2, 3]
console.log(newArr2); // [2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(element, index, array) {
  <span class="hljs-keyword">return</span> e;
})

<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr2</span> = arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(element, index, array) {
  <span class="hljs-keyword">return</span> e&gt;=<span class="hljs-number">2</span>; 
})

console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// [1, 2, 3]</span>
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr2</span>); <span class="hljs-comment">// [2, 3]</span></code></pre>
<p>下面是对filter方法的拓展：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.filter = Array.prototype.filter || function (fn, context) {
  var arr = [];
  if (typeof fn === &quot;function&quot;) {
    for (var k = 0, length = this.length; k < length; k++) {
      fn.call(context, this[k], k, this) &amp;&amp; arr.push(this[k]);
    }
  }
  return arr;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.filter = <span class="hljs-built_in">Array</span>.prototype.filter || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">var</span> arr = [];
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
      fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>) &amp;&amp; arr.push(<span class="hljs-keyword">this</span>[k]);
    }
  }
  <span class="hljs-keyword">return</span> arr;
};</code></pre>
<h3 id="articleHeader5">some</h3>
<p>some方法是只要数组中的某个值，符合你给定的判断条件就返回<code>true</code>；否则，返回<code>false</code>。用法和参数跟前面的方法一样。<br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isBigEnough(element, index, array) {
  return element >= 4;
}
var passed = [1, 2, 3].some(isBigEnough);
var passed2 = [1, 2, 3, 4].some(isBigEnough);

console.log(passed); // false
console.log(passed2); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isBigEnough</span>(<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-keyword">return</span> element &gt;= <span class="hljs-number">4</span>;
}
<span class="hljs-keyword">var</span> passed = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].some(isBigEnough);
<span class="hljs-keyword">var</span> passed2 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].some(isBigEnough);

<span class="hljs-built_in">console</span>.log(passed); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(passed2); <span class="hljs-comment">// true</span></code></pre>
<p>下面是some方法的拓展：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.some = Array.prototype.some || function (fn, context) {
  var passed = false;
  if (typeof fn === &quot;function&quot;) {
       for (var k = 0, length = this.length; k < length; k++) {
      if (passed === true) break;
      passed = !!fn.call(context, this[k], k, this);
    }
  }
  return passed;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.some = <span class="hljs-built_in">Array</span>.prototype.some || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">var</span> passed = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
       <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
      <span class="hljs-keyword">if</span> (passed === <span class="hljs-literal">true</span>) <span class="hljs-keyword">break</span>;
      passed = !!fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>);
    }
  }
  <span class="hljs-keyword">return</span> passed;
};</code></pre>
<h3 id="articleHeader6">every</h3>
<p>every方法与some方法相对，every方法是数组中的所有值都符合你给定的判断条件的时候才会返回<code>true</code>，否则就返回<code>false</code>。<br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isBigEnough(element, index, array) {
  return element >= 3;
}
var passed = [2, 3, 4].every(isBigEnough);
var passed2 = [3, 4, 5].every(isBigEnough);

console.log(passed); // false
console.log(passed2); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isBigEnough</span>(<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-keyword">return</span> element &gt;= <span class="hljs-number">3</span>;
}
<span class="hljs-keyword">var</span> passed = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].every(isBigEnough);
<span class="hljs-keyword">var</span> passed2 = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].every(isBigEnough);

<span class="hljs-built_in">console</span>.log(passed); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(passed2); <span class="hljs-comment">// true</span></code></pre>
<p>every方法拓展如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.every = Array.prototype.every || function (fn, context) {
  var passed = true;
  if (typeof fn === &quot;function&quot;) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (passed === false) break;
      passed = !!fn.call(context, this[k], k, this);
    }
  }
  return passed;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.every = <span class="hljs-built_in">Array</span>.prototype.every || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">var</span> passed = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
      <span class="hljs-keyword">if</span> (passed === <span class="hljs-literal">false</span>) <span class="hljs-keyword">break</span>;
      passed = !!fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>);
    }
  }
  <span class="hljs-keyword">return</span> passed;
};</code></pre>
<h3 id="articleHeader7">reduce / reduceRight</h3>
<p>reduce / reduceRight 方法比上面的几种方法要复杂一些；它的语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="array.reduce(callback,[initialValue])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">array</span><span class="hljs-selector-class">.reduce</span>(<span class="hljs-selector-tag">callback</span>,<span class="hljs-selector-attr">[initialValue]</span>)</code></pre>
<p>其中<code>callback</code>可以依次接受四个参数：</p>
<ul>
<li><p><code>accumulator</code>上一次调用回调返回的值，或者是提供的初始值（<code>initialValue</code>）</p></li>
<li><p><code>currentValue</code>数组中正在处理的元素</p></li>
<li><p><code>currentIndex</code>数组中正在处理的元素索引，如果提供了<code>initialValue</code> ，从0开始；否则从1开始。</p></li>
<li><p><code>array</code>数组对象本身</p></li>
</ul>
<p>reduce / reduceRight 方法中，第二个参数（<code>initialValue</code>）是可选的；其值用于第一次调用<code>callback</code>的第一个参数。<br>我们先来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = [1, 2, 3].reduce(function(a, b) {
    return a + b;
});
console.log(sum); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>var <span class="hljs-built_in">sum</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span> {</span>
    <span class="hljs-keyword">return</span> a + b;
});
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">sum</span>); <span class="hljs-comment">// 6</span></code></pre>
<p>下面我们来看看reduce是如何运行的<br>例如执行下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = [0,1,2,3,4].reduce(function(accumulator, currentValue, currentIndex, array){
  console.log(accumulator, currentValue, currentIndex, array)
  return accumulator + currentValue;
});
console.log(sum);

// output
0 1 1 [0, 1, 2, 3, 4]
1 2 2 [0, 1, 2, 3, 4]
3 3 3 [0, 1, 2, 3, 4]
6 4 4 [0, 1, 2, 3, 4]
10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var sum = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].reduce(function(accumulator, currentValue, currentIndex, array){
  console.log(accumulator, currentValue, currentIndex, array)
  return accumulator + currentValue;
});
console.log(sum);

<span class="hljs-comment">// output</span>
<span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">2</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">3</span> <span class="hljs-number">3</span> <span class="hljs-number">3</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">6</span> <span class="hljs-number">4</span> <span class="hljs-number">4</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">10</span></code></pre>
<p>从上面的输出结果可以看出<code>callback</code>被调用四次，每次调用的参数和返回值如下表：</p>
<table>
<thead><tr>
<th align="center">callback</th>
<th align="center">accumulator</th>
<th align="center">currentValue</th>
<th align="center">currentIndex</th>
<th align="center">array</th>
<th align="center">return</th>
</tr></thead>
<tbody>
<tr>
<td align="center">第一次调用</td>
<td align="center">0</td>
<td align="center">1</td>
<td align="center">1</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">1</td>
</tr>
<tr>
<td align="center">第二次调用</td>
<td align="center">1</td>
<td align="center">2</td>
<td align="center">2</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">3</td>
</tr>
<tr>
<td align="center">第三次调用</td>
<td align="center">3</td>
<td align="center">3</td>
<td align="center">3</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">6</td>
</tr>
<tr>
<td align="center">第四次调用</td>
<td align="center">6</td>
<td align="center">4</td>
<td align="center">4</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">10</td>
</tr>
</tbody>
</table>
<p>上面是没有传入第二个参数（<code>initialValue</code>）的情况，那传入第二个参数又是怎么样的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = [0,1,2,3,4].reduce(function(accumulator, currentValue, currentIndex, array){
  console.log(accumulator, currentValue, currentIndex, array)
  return accumulator + currentValue;
}, 10);
console.log(sum);

// output
10 0 0 [0, 1, 2, 3, 4]
10 1 1 [0, 1, 2, 3, 4]
11 2 2 [0, 1, 2, 3, 4]
13 3 3 [0, 1, 2, 3, 4]
16 4 4 [0, 1, 2, 3, 4]
20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var sum = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].reduce(function(accumulator, currentValue, currentIndex, array){
  console.log(accumulator, currentValue, currentIndex, array)
  return accumulator + currentValue;
}, <span class="hljs-number">10</span>);
console.log(sum);

<span class="hljs-comment">// output</span>
<span class="hljs-number">10</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">10</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">11</span> <span class="hljs-number">2</span> <span class="hljs-number">2</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">13</span> <span class="hljs-number">3</span> <span class="hljs-number">3</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">16</span> <span class="hljs-number">4</span> <span class="hljs-number">4</span> [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-number">20</span></code></pre>
<p>传入第二个参数后<code>callback</code>调用了五次，每次调用的参数和返回值如下表：</p>
<table>
<thead><tr>
<th align="center">callback</th>
<th align="center">accumulator</th>
<th align="center">currentValue</th>
<th align="center">currentIndex</th>
<th align="center">array</th>
<th align="center">return</th>
</tr></thead>
<tbody>
<tr>
<td align="center">第一次调用</td>
<td align="center">10</td>
<td align="center">0</td>
<td align="center">0</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">10</td>
</tr>
<tr>
<td align="center">第二次调用</td>
<td align="center">10</td>
<td align="center">1</td>
<td align="center">1</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">11</td>
</tr>
<tr>
<td align="center">第三次调用</td>
<td align="center">11</td>
<td align="center">2</td>
<td align="center">2</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">13</td>
</tr>
<tr>
<td align="center">第四次调用</td>
<td align="center">13</td>
<td align="center">3</td>
<td align="center">3</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">16</td>
</tr>
<tr>
<td align="center">第五次调用</td>
<td align="center">16</td>
<td align="center">4</td>
<td align="center">4</td>
<td align="center">[0, 1, 2, 3, 4]</td>
<td align="center">20</td>
</tr>
</tbody>
</table>
<p>从上面的情况可以看出：不提供<code>initialValue</code> ，reduce方法会从索引1的地方开始执行<code>callback</code>方法，跳过第一个索引。提供 <code>initialValue</code>，从索引0开始。<br>同时，是否提供<code>initialValue</code>对于回调函数第一次执行时，<code>accumulator</code>和<code>currentValue</code>的取值有两种情况：调用reduce时提供<code>initialValue</code>，<code>accumulator</code>取值为<code>initialValue</code>，<code>currentValue</code>取数组中的第一个值；没有提供<code>initialValue</code> ，<code>accumulator</code>取数组中的第一个值，<code>currentValue</code>取数组中的第二个值。</p>
<p>reduceRight与reduce类似，不同之处在于它是从最后一个值开始计算的。</p>
<p>那么我们该如何拓展一个reduce / reduceRight方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.reduce = Array.prototype.reduce || function (callback, initialValue ) {
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


Array.prototype.reduceRight = Array.prototype.reduceRight || function (callback, initialValue ) {
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
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">Array</span>.prototype.reduce = <span class="hljs-keyword">Array</span>.prototype.reduce || <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(<span class="hljs-keyword">callback</span>, initialValue ) {
  <span class="hljs-keyword">var</span> previous = initialValue, k = <span class="hljs-number">0</span>, length = <span class="hljs-built_in">this</span>.length;
  <span class="hljs-keyword">if</span> (typeof initialValue === <span class="hljs-string">"undefined"</span>) {
    previous = <span class="hljs-built_in">this</span>[<span class="hljs-number">0</span>];
    k = <span class="hljs-number">1</span>;
  }
     
  <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">callback</span> === <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">for</span> (k; k &lt; length; k++) {
      <span class="hljs-built_in">this</span>.hasOwnProperty(k) &amp;&amp; (previous = <span class="hljs-keyword">callback</span>(previous, <span class="hljs-built_in">this</span>[k], k, <span class="hljs-built_in">this</span>));
    }
  }
  <span class="hljs-keyword">return</span> previous;
};


<span class="hljs-keyword">Array</span>.prototype.reduceRight = <span class="hljs-keyword">Array</span>.prototype.reduceRight || <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(<span class="hljs-keyword">callback</span>, initialValue ) {
    <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">this</span>.length, k = length - <span class="hljs-number">1</span>, previous = initialValue;
    <span class="hljs-keyword">if</span> (typeof initialValue === <span class="hljs-string">"undefined"</span>) {
        previous = <span class="hljs-built_in">this</span>[length - <span class="hljs-number">1</span>];
        k--;
    }
    <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">callback</span> === <span class="hljs-string">"function"</span>) {
       <span class="hljs-keyword">for</span> (k; k &gt; <span class="hljs-number">-1</span>; k-=<span class="hljs-number">1</span>) {          
          <span class="hljs-built_in">this</span>.hasOwnProperty(k) &amp;&amp; (previous = <span class="hljs-keyword">callback</span>(previous, <span class="hljs-built_in">this</span>[k], k, <span class="hljs-built_in">this</span>));
       }
    }
    <span class="hljs-keyword">return</span> previous;
  };</code></pre>
<h3 id="articleHeader8">find / findIndex</h3>
<p>find方法用于找出第一个符合条件的数组成员。它的参数跟forEach方法是一样的；所有数组成员依次执行回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。<br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = [1, 5, 10, 15].find(function(element, index, array) {
  return element > 9;
});
var value2 = [1, 5, 10, 15].find(function(element, index, array) {
  return element > 20;
});

console.log(value); // 10
console.log(value2); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>var value = [1, 5, 10, <span class="hljs-number">15</span>].find(<span class="hljs-keyword">function</span>(<span class="hljs-keyword">element</span>, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">array</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">element</span> &gt; <span class="hljs-number">9</span>;
});
var value2 = [1, 5, 10, <span class="hljs-number">15</span>].find(<span class="hljs-keyword">function</span>(<span class="hljs-keyword">element</span>, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">array</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">element</span> &gt; <span class="hljs-number">20</span>;
});

console.log(value); // 10
console.<span class="hljs-built_in">log</span>(value2); // undefined</code></pre>
<p>findIndex方法和find相似；不过它返回数组中符合条件的元素的索引。如果所有成员都不符合条件，则返回-1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = [1, 5, 10, 15].findIndex(function(element, index, array) {
  return element > 9;
});
var value2 = [1, 5, 10, 15].findIndex(function(element, index, array) {
  return element > 20;
});

console.log(value); // 2
console.log(value2); // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> value = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>].findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(element, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">array</span>)</span> <span class="hljs-comment">{
  return element &gt; 9;
}</span>);</span>
<span class="hljs-keyword">var</span> value2 = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>].findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(element, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">array</span>)</span> <span class="hljs-comment">{
  return element &gt; 20;
}</span>);</span>

console.log(value); <span class="hljs-comment">// 2</span>
console.log(value2); <span class="hljs-comment">// -1</span></code></pre>
<p>对于不支持find / findIndex方法的浏览器，我们可以自己实现一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.find = Array.prototype.find || function (fn, context) {
  if (typeof fn === &quot;function&quot;) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (fn.call(context, this[k], k, this)) {
        return this[k];
      }
    }
  }
  return undefined;
};


Array.prototype.findIndex = Array.prototype.findIndex || function (fn, context) {
  if (typeof fn === &quot;function&quot;) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (fn.call(context, this[k], k, this)) {
        return k;
      }
    }
  }
  return -1;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.find = <span class="hljs-built_in">Array</span>.prototype.find || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
      <span class="hljs-keyword">if</span> (fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[k];
      }
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
};


<span class="hljs-built_in">Array</span>.prototype.findIndex = <span class="hljs-built_in">Array</span>.prototype.findIndex || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn === <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>, length = <span class="hljs-keyword">this</span>.length; k &lt; length; k++) {
      <span class="hljs-keyword">if</span> (fn.call(context, <span class="hljs-keyword">this</span>[k], k, <span class="hljs-keyword">this</span>)) {
        <span class="hljs-keyword">return</span> k;
      }
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
};</code></pre>
<h2 id="articleHeader9">最后</h2>
<p>上面的兼容实现不知道对不对，欢迎大家指正。<br>参考资料：<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank"></a><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数组迭代（遍历）方法

## 原文链接
[https://segmentfault.com/a/1190000009943551](https://segmentfault.com/a/1190000009943551)


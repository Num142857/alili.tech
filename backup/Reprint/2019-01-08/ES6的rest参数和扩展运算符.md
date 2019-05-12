---
title: 'ES6的rest参数和扩展运算符' 
date: 2019-01-08 2:30:11
hidden: true
slug: 3napn9ekbg2
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>rest参数</strong>和<strong>扩展运算符</strong>都是<code>ES6</code>新增的特性。<br><strong>rest参数</strong>的形式为：<code>...变量名</code>；<strong>扩展运算符</strong>是三个点（<code>...</code>）。</p>
<h2 id="articleHeader0">rest参数</h2>
<p>rest参数用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}

add(1, 2, 3) // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-rest_arg">...values</span>)</span> </span>{
  let sum = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> val of values) {
    sum += val;
  }
  <span class="hljs-keyword">return</span> sum;
}

add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// 6</span></code></pre>
<p>传递给 add 函数的一组参数值，被整合成了数组 values。</p>
<p>下面是一个 rest 参数代替arguments变量的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// arguments变量的写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortNumbers</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>).sort();
}

<span class="hljs-comment">// rest参数的写法</span>
<span class="hljs-keyword">const</span> sortNumbers = <span class="hljs-function">(<span class="hljs-params">...numbers</span>) =&gt;</span> numbers.sort();</code></pre>
<p><strong>rest参数和arguments对象的区别</strong></p>
<ul>
<li><p>rest参数只包含那些没有对应形参的实参；而 arguments 对象包含了传给函数的所有实参。</p></li>
<li><p>arguments 对象不是一个真实的数组；而rest参数是真实的 Array 实例，也就是说你能够在它上面直接使用所有的数组方法。</p></li>
<li><p>arguments 对象对象还有一些附加的属性 (比如callee属性)。</p></li>
</ul>
<p>另外，使用rest参数时应注意一下两点：</p>
<ul><li><p>rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(a, ...b, c) { ... } // 报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">(a, <span class="hljs-rest_arg">...b</span>, c)</span> </span>{ ... } <span class="hljs-comment">// 报错</span></code></pre>
<ul><li><p>函数的length属性，不包括 rest 参数。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a)</span> </span>{}).length  <span class="hljs-comment">// 1</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...a</span>)</span> </span>{}).length  <span class="hljs-comment">// 0</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, <span class="hljs-rest_arg">...b</span>)</span> </span>{}).length  <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader1">扩展运算符</h2>
<p>扩展运算符可以看做是 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(...[1, 2, 3]) // 1 2 3

console.log(1, ...[2, 3, 4], 5) //1 2 3 4 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(...[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]) <span class="hljs-comment">// 1 2 3</span>

console.log(<span class="hljs-number">1</span>, ...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-number">5</span>) <span class="hljs-comment">//1 2 3 4 5</span></code></pre>
<h3 id="articleHeader2">扩展运算符的应用</h3>
<h4>普通的函数调用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">push</span><span class="hljs-params">(array, <span class="hljs-rest_arg">...items</span>)</span> </span>{
  array.push(...items);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(x, y)</span> </span>{
  <span class="hljs-keyword">return</span> x + y;
}

<span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">4</span>, <span class="hljs-number">38</span>];
add(...numbers) <span class="hljs-comment">// 42</span></code></pre>
<p>上面代码中，<code>array.push(...items)</code>和<code>add(...numbers)</code>这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。</p>
<h4>替代 apply 方法调用函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// ES5 的写法</span>
Math.max.apply(null, [<span class="hljs-number">14</span>, <span class="hljs-number">3</span>, <span class="hljs-number">77</span>])

<span class="hljs-comment">// ES6 的写法</span>
Math.max(...[<span class="hljs-number">14</span>, <span class="hljs-number">3</span>, <span class="hljs-number">77</span>])

<span class="hljs-comment">// 等同于</span>
Math.max(<span class="hljs-number">14</span>, <span class="hljs-number">3</span>, <span class="hljs-number">77</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// ES5 的写法</span>
var arr1 = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
var arr2 = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
Array.prototype.push.apply(arr1, arr2);

<span class="hljs-comment">// ES6 的写法</span>
var arr1 = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
var arr2 = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
arr1.push(...arr2);</code></pre>
<h4>合并数组</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3)  // [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]  // [ 'a', 'b', 'c', 'd', 'e' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr1 = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>];
var arr2 = [<span class="hljs-string">'c'</span>];
var arr3 = [<span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>];

// <span class="hljs-symbol">ES5</span>的合并数组
arr1.concat(arr2, arr3)  // [ <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span> ]

// <span class="hljs-symbol">ES6</span>的合并数组
[...arr1, ...arr2, ...arr3]  // [ <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span> ]</code></pre>
<h4>与解构赋值结合</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = [&quot;foo&quot;];
first  // &quot;foo&quot;
rest   // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>const [<span class="hljs-built_in">first</span>, ...<span class="hljs-built_in">rest</span>] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-built_in">first</span> // <span class="hljs-number">1</span>
<span class="hljs-built_in">rest</span>  // [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]

const [<span class="hljs-built_in">first</span>, ...<span class="hljs-built_in">rest</span>] = [];
<span class="hljs-built_in">first</span> // undefined
<span class="hljs-built_in">rest</span>  // []

const [<span class="hljs-built_in">first</span>, ...<span class="hljs-built_in">rest</span>] = [<span class="hljs-string">"foo"</span>];
<span class="hljs-built_in">first</span>  // <span class="hljs-string">"foo"</span>
<span class="hljs-built_in">rest</span>   // []</code></pre>
<p>如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [...butLast, last] = [1, 2, 3, 4, 5];  // 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];  // 报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const [...butLast, last] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];  <span class="hljs-comment">// 报错</span>

const [first, ...middle, last] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];  <span class="hljs-comment">// 报错</span></code></pre>
<h4>将字符串转为数组</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hello';

// ES5  
var arr1 = str.split('');  // [ &quot;h&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot; ] 

// ES6  
var arr2 = [...str];  // [ &quot;h&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot; ] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var str = <span class="hljs-string">'hello'</span>;

<span class="hljs-regexp">//</span> ES5  
var arr1 = str.split(<span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span> [ <span class="hljs-string">"h"</span>, <span class="hljs-string">"e"</span>, <span class="hljs-string">"l"</span>, <span class="hljs-string">"l"</span>, <span class="hljs-string">"o"</span> ] 

<span class="hljs-regexp">//</span> ES6  
var arr2 = [...str];  <span class="hljs-regexp">//</span> [ <span class="hljs-string">"h"</span>, <span class="hljs-string">"e"</span>, <span class="hljs-string">"l"</span>, <span class="hljs-string">"l"</span>, <span class="hljs-string">"o"</span> ] </code></pre>
<h4>实现了 Iterator 接口的对象</h4>
<p>任何 <a href="http://es6.ruanyifeng.com/#docs/iterator" rel="nofollow noreferrer" target="_blank">Iterator</a> 接口的对象，都可以用扩展运算符转为真正的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var nodeList = document.querySelectorAll('div');
var array = [...nodeList];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var nodeList = document.querySelectorAll('div');
var<span class="hljs-built_in"> array </span>= [...node<span class="hljs-class">List];</span></code></pre>
<p>上面代码中，<code>querySelectorAll</code>方法返回的是一个<code>nodeList</code>对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于<code>NodeList</code>对象实现了 <code>Iterator</code> 。</p>
<h2 id="articleHeader3">总结</h2>
<p>从上面的例子可以看出，rest参数使用场景应该稍少一些，主要是处理不定数量参数，可以避免arguments对象的使用。而扩展运算符的应用就比较广了，在实际项目中灵活应用，能写出更精简的代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6的rest参数和扩展运算符

## 原文链接
[https://segmentfault.com/a/1190000010222698](https://segmentfault.com/a/1190000010222698)


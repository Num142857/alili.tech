---
title: 'JavaScript 特殊对象 Array-Like Objects 详解' 
date: 2019-02-08 2:30:41
hidden: true
slug: gbnicl61u0s
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章拖了有两周，今天来跟大家聊聊 JavaScript 中一类特殊的对象 -&gt; Array-Like Objects。</p>
<p>（本文节选自 underscore 源码解读系列文章，完整版请关注 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis</a>）</p>
<h3 id="articleHeader0">Array-Like</h3>
<p>JavaScript 中一切皆为对象，那么什么是 Array-Like Objects？顾名思义，就是像数组的对象，当然，数组本身就是对象嘛！稍微有点基础的同学，一定知道 arguments 就是 Array-Like Objects 的一种，能像数组一样用 <code>[]</code> 去访问 arguments 的元素，有 <code>length</code> 属性，但是却不能用一些数组的方法，如 push，pop，等等。</p>
<p>那么，什么样的元素是 Array-Like Objects？我们来看看 underscore 中对其的定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function(collection) {
  var length = getLength(collection);
  return typeof length == 'number' &amp;&amp; length >= 0 &amp;&amp; length <= MAX_ARRAY_INDEX;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> MAX_ARRAY_INDEX = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> getLength = property(<span class="hljs-string">'length'</span>);
<span class="hljs-keyword">var</span> isArrayLike = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">collection</span>) </span>{
  <span class="hljs-keyword">var</span> length = getLength(collection);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> length == <span class="hljs-string">'number'</span> &amp;&amp; length &gt;= <span class="hljs-number">0</span> &amp;&amp; length &lt;= MAX_ARRAY_INDEX;
};</code></pre>
<p>很简单，不是数组，但是有 <code>length</code> 属性，且属性值为非负 Number 类型即可。至于 <code>length</code> 属性的值，underscore 给出了一个上限值 MAX_ARRAY_INDEX，其实是 MAX_SAFE_INTEGER（感谢 @HangYang 同学指出） ，因为这是 JavaScript 中能精确表示的最大数字。</p>
<p>想想还有什么同时能满足以上条件的？NodeList，HTML Collections，仔细想想，甚至还有字符串，或者拥有 <code>length</code> 属性的对象，函数（length 属性值为形参数量），等等。</p>
<h3 id="articleHeader1">Array-Like to Array</h3>
<p>有的时候，需要将 Array-Like Objects 转为 Array 类型，使之能用数组的一些方法，一个非常简单粗暴并且兼容性良好的方法是新建个数组，然后循环存入数据。</p>
<p>我们以 arguments 为例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
  // Uncaught TypeError: arguments.push is not a function
  // arguments.push(4);

  var arr = [];
  for (var i = 0, len = arguments.length; i < len; i++)
    arr[i] = arguments[i];

  arr.push(4); // [1, 2, 3, 4]
}

fn(1, 2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// Uncaught TypeError: arguments.push is not a function</span>
  <span class="hljs-comment">// arguments.push(4);</span>

  <span class="hljs-keyword">var</span> arr = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++)
    arr[i] = <span class="hljs-built_in">arguments</span>[i];

  arr.push(<span class="hljs-number">4</span>); <span class="hljs-comment">// [1, 2, 3, 4]</span>
}

fn(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>但是这不是最优雅的，更优雅的解法大家一定都知道了，use Array.prototype.slice（IE9- 会有问题）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
  var arr = Array.prototype.slice.call(arguments);
  arr.push(4); // arr -> [1, 2, 3, 4]
}

fn(1, 2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
  arr.push(<span class="hljs-number">4</span>); <span class="hljs-comment">// arr -&gt; [1, 2, 3, 4]</span>
}

fn(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>或者可以用 <code>[]</code> 代替  Array.prototype 节省几个字节。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
  var arr = [].slice.call(arguments);
  arr.push(4); // arr -> [1, 2, 3, 4]
}

fn(1, 2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> arr = [].slice.call(<span class="hljs-built_in">arguments</span>);
  arr.push(<span class="hljs-number">4</span>); <span class="hljs-comment">// arr -&gt; [1, 2, 3, 4]</span>
}

fn(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>如果非得追求性能，用 <code>[]</code> 会新建个数组，性能肯定不及前者，但是由于引擎的优化，这点差异基本可以忽略不计了（所以很多框架用的就是后者）。</p>
<p>为什么这样可以转换？我们简单了解下，主要的原因是 slice 方法只需要参数有 length 属性即可。首先，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" rel="nofollow noreferrer" target="_blank">slice</a> 方法得到的结果是一个 <strong>新的数组</strong>，通过 Array.prototype.slice.call 传入的参数（假设为 a），如果没有 length 属性，或者 length 属性值不是 Number 类型，或者为负，那么直接返回一个空数组，否则返回 a[0]-a[length-1] 组成的数组。(具体可以看下 v8 源码 <a href="https://github.com/v8/v8/blob/master/src/js/array.js#L621-L660" rel="nofollow noreferrer" target="_blank">https://github.com/v8/v8/blob/master/src/js/array.js#L621-L660</a>）</p>
<p>当然，ES6 提供了更简便的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;helloworld&quot;;
var arr = Array.from(str); 
// [&quot;h&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot;, &quot;w&quot;, &quot;o&quot;, &quot;r&quot;, &quot;l&quot;, &quot;d&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"helloworld"</span>;
<span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">Array</span>.from(str); 
<span class="hljs-comment">// ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]</span></code></pre>
<p>小结下，如果要把 Array-Like Objects 转为 Array，首选 Array.prototype.slice，但是由于 IE 下 Array.prototype.slice.call(nodes) 会抛出错误（because a DOM NodeList is not a JavaScript object），所以兼容的写法如下。（但还有一点要注意的是，如果是 arguments 转为 Array，最好别用 Array.prototype.slice，V8 下会很慢，具体可以看下 <a href="http://www.jstips.co/zh_cn/avoid-modifying-or-passing-arguments-into-other-functions-it-kills-optimization/" rel="nofollow noreferrer" target="_blank">避免修改和传递 arguments 给其他方法 — 影响优化</a> ）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function nodeListToArray(nodes){
  var arr, length;

  try {
    // works in every browser except IE
    arr = [].slice.call(nodes);
    return arr;
  } catch(err){
    // slower, but works in IE
    arr = [];
    length = nodes.length;

    for(var i = 0; i < length; i++){
       arr.push(nodes[i]);
     }  

    return arr;
  }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nodeListToArray</span>(<span class="hljs-params">nodes</span>)</span>{
  <span class="hljs-keyword">var</span> arr, length;

  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// works in every browser except IE</span>
    arr = [].slice.call(nodes);
    <span class="hljs-keyword">return</span> arr;
  } <span class="hljs-keyword">catch</span>(err){
    <span class="hljs-comment">// slower, but works in IE</span>
    arr = [];
    length = nodes.length;

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length; i++){
       arr.push(nodes[i]);
     }  

    <span class="hljs-keyword">return</span> arr;
  }
} </code></pre>
<h3 id="articleHeader2">Others</h3>
<p>很多时候，某个方法你以为接收的参数是数组，其实类数组也是可以的。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" rel="nofollow noreferrer" target="_blank">Function.prototype.apply()</a> 函数接收的第二个参数，其实也可以是类数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {0: 4, length: 2};
var arr = [1, 2, 3];
Array.prototype.push.apply(arr, obj);
console.log(arr); // [1, 2, 3, 4, undefined]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {<span class="hljs-number">0</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>};
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">Array</span>.prototype.push.apply(arr, obj);
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [1, 2, 3, 4, undefined]</span></code></pre>
<h3 id="articleHeader3">Read More</h3>
<ul>
<li><p><a href="http://xahlee.info/js/js_convert_array-like.html" rel="nofollow noreferrer" target="_blank">How to convert a array-like object to array?</a></p></li>
<li><p><a href="http://www.nfriedly.com/techblog/2009/06/advanced-javascript-objects-arrays-and-array-like-objects/" rel="nofollow noreferrer" target="_blank">Advanced Javascript: Objects, Arrays, and Array-Like objects</a></p></li>
<li><p><a href="http://www.2ality.com/2013/05/quirk-array-like-objects.html" rel="nofollow noreferrer" target="_blank">JavaScript quirk 8: array-like objects</a></p></li>
<li><p><a href="http://www.planabc.net/2010/01/06/arguments_to_array/" rel="nofollow noreferrer" target="_blank">如何将函数的实际参数转换成数组</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work" rel="nofollow noreferrer" target="_blank">how does Array.prototype.slice.call() work?</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 特殊对象 Array-Like Objects 详解

## 原文链接
[https://segmentfault.com/a/1190000005800697](https://segmentfault.com/a/1190000005800697)


---
title: 'JavaScript数组去重—ES6的两种方式' 
date: 2018-12-26 2:30:14
hidden: true
slug: 0pqotp6b1dta
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>JavaScript数组去重这个问题，经常出现在面试题中，以前也写过一篇数组去重的<a href="http://blog.csdn.net/fe_dev/article/details/72843989" rel="nofollow noreferrer" target="_blank">文章</a>，（<a href="http://blog.csdn.net/fe_dev/article/details/72843989" rel="nofollow noreferrer" target="_blank">JavaScript 数组去重的多种方法原理详解</a>）但感觉代码还是有点不够简单，今天和大家再说两种方法，代码可是足够的少了。</p>
<h3 id="articleHeader1">解释</h3>
<h4>方法一：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    const res = new Map();
    return arr.filter((a) => !res.has(a) &amp;&amp; res.set(a, 1))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> !res.has(a) &amp;&amp; res.set(a, <span class="hljs-number">1</span>))
}</code></pre>
<p>就这么短，就可以了，我们来解释一下为什么。   </p>
<p><strong>Map对象</strong></p>
<blockquote>Map是ES6 提供的新的数据结构。 <br>Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。</blockquote>
<p>下表列出了 Map 对象的方法。</p>
<table>
<thead><tr>
<th align="left">方法</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">clear</td>
<td align="left">删除所有的键/值对，没有返回值。</td>
</tr>
<tr>
<td align="left">delete</td>
<td align="left">删除某个键，返回true。如果删除失败，返回false。</td>
</tr>
<tr>
<td align="left">forEach</td>
<td align="left">对每个元素执行指定操作。</td>
</tr>
<tr>
<td align="left">get</td>
<td align="left">返回Map对象key相对应的value值。</td>
</tr>
<tr>
<td align="left">has</td>
<td align="left">返回一个布尔值，表示某个键是否在当前 Map 对象之中。</td>
</tr>
<tr>
<td align="left">set</td>
<td align="left">给Map对象设置key/value 键/值对。</td>
</tr>
</tbody>
</table>
<p>Map对象还有一个size属性，他返回Map对象的键/值对的数量。</p>
<p><strong>数组的 filter() 方法</strong></p>
<blockquote>filter() 方法创建一个新的数组，新数组中的元素 是 通过检查 指定数组 中 符合条件的所有元素。</blockquote>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="array.filter(function(currentValue,index,arr), thisValue)  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">array</span>.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(currentValue,<span class="hljs-keyword">index</span>,arr)</span>, <span class="hljs-title">thisValue</span>)  </span></code></pre>
<p><strong>参数说明：</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXVY9?w=738&amp;h=325" src="https://static.alili.tech/img/bVXVY9?w=738&amp;h=325" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>箭头函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return arr.filter((a) => !res.has(a) &amp;&amp; res.set(a, 1))
//上面的代码可以改成这样
return arr.filter(function(a){
    return !res.has(a) &amp;&amp; res.set(a, 1);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> !res.has(a) &amp;&amp; res.set(a, <span class="hljs-number">1</span>))
<span class="hljs-comment">//上面的代码可以改成这样</span>
<span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">return</span> !res.has(a) &amp;&amp; res.set(a, <span class="hljs-number">1</span>);
});</code></pre>
<blockquote>1、箭头函数写代码拥有更加简洁的语法；<br> 2、不会绑定this。</blockquote>
<p>了解更多，点<a href="http://www.cnblogs.com/fundebug/p/6904753.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p><strong>方法一 分析</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    //定义常量 res,值为一个Map对象实例
    const res = new Map();
    
    //返回arr数组过滤后的结果，结果为一个数组
    //过滤条件是，如果res中没有某个键，就设置这个键的值为1
    return arr.filter((a) => !res.has(a) &amp;&amp; res.set(a, 1))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-comment">//定义常量 res,值为一个Map对象实例</span>
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
    
    <span class="hljs-comment">//返回arr数组过滤后的结果，结果为一个数组</span>
    <span class="hljs-comment">//过滤条件是，如果res中没有某个键，就设置这个键的值为1</span>
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> !res.has(a) &amp;&amp; res.set(a, <span class="hljs-number">1</span>))
}</code></pre>
<h4>方法二：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    return Array.from(new Set(arr))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr))
}</code></pre>
<p>这个方法的代码量更少，简直不可思议。   <br><strong>数组的 from方法</strong></p>
<blockquote>Array.from() 方法从一个类似数组或可迭代的对象(包括 Array，Map，Set，String，TypedArray，arguments 对象等等) 中创建一个新的数组实例</blockquote>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.from(arrayLike[, mapFn[, thisArg]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Array</span><span class="hljs-selector-class">.from</span>(<span class="hljs-selector-tag">arrayLike</span><span class="hljs-selector-attr">[, mapFn[, thisArg]</span>])</code></pre>
<table>
<thead><tr>
<th align="left">参数</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">arrayLike</td>
<td align="left">必需，想要转换成真实数组的类数组对象或可迭代的对象。</td>
</tr>
<tr>
<td align="left">mapFn</td>
<td align="left">可选，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。</td>
</tr>
<tr>
<td align="left">thisArg</td>
<td align="left">可选，执行 mapFn 函数时 this 的值。</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bar = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
Array.from(bar);
// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]

Array.from('foo');
// [&quot;f&quot;, &quot;o&quot;, &quot;o&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>const bar = [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>];
<span class="hljs-symbol">Array</span>.from(bar);
// [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]

<span class="hljs-symbol">Array</span>.from(<span class="hljs-string">'foo'</span>);
// [<span class="hljs-string">"f"</span>, <span class="hljs-string">"o"</span>, <span class="hljs-string">"o"</span>]</code></pre>
<p><strong>Set对象</strong></p>
<blockquote>Set 对象允许你存储任何类型的 唯一值 ，无论是原始值或者是对象引用。 <br> Set对象是值的集合，你可以按照插入的顺序迭代它的元素。<br> Set中的元素只会出现一次，即 Set 中的元素是唯一的。</blockquote>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Set([iterable]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cos"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-keyword">Set</span>([iterable])<span class="hljs-comment">;</span></code></pre>
<p><strong>参数：</strong>   <br>iterable，如果传递一个可迭代对象(包括 Array，Map，Set，String，TypedArray，arguments 对象等等)，它的所有元素将被添加到新的 Set中。如果不指定此参数或其值为null，则新的 Set为空。   </p>
<p>下表列出了 Set 对象的方法。</p>
<table>
<thead><tr>
<th align="left">方法</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">add</td>
<td align="left">添加某个值，返回Set对象本身。</td>
</tr>
<tr>
<td align="left">clear</td>
<td align="left">删除所有的键/值对，没有返回值。</td>
</tr>
<tr>
<td align="left">delete</td>
<td align="left">删除某个键，返回true。如果删除失败，返回false。</td>
</tr>
<tr>
<td align="left">forEach</td>
<td align="left">对每个元素执行指定操作。</td>
</tr>
<tr>
<td align="left">has</td>
<td align="left">返回一个布尔值，表示某个键是否在当前 Set 对象之中。</td>
</tr>
</tbody>
</table>
<p>Set对象和Map对象一样，都有一个size属性，他返回Set对象的值的个数。  </p>
<p><strong>方法二 分析</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    //通过Set对象，对数组去重，结果又返回一个Set对象
    //通过from方法，将Set对象转为数组
    return Array.from(new Set(arr))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-comment">//通过Set对象，对数组去重，结果又返回一个Set对象</span>
    <span class="hljs-comment">//通过from方法，将Set对象转为数组</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr))
}</code></pre>
<h3 id="articleHeader2">总结</h3>
<p>这次说的两个方法，真的很简单，主要就是靠ES6里的新东西，难度不大，代码简单，主要就是多用用就好了。</p>
<hr>
<p>经人提醒，再补充一种，<code>[...new Set(arr)]</code>   </p>
<p><span class="img-wrap"><img data-src="/img/bVbhgHP?w=181&amp;h=59" src="https://static.alili.tech/img/bVbhgHP?w=181&amp;h=59" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>不懂 <code> ...</code>  的朋友，可以看这里 <a href="http://www.cnblogs.com/wangyunhui/p/7511615.html" rel="nofollow noreferrer" target="_blank">js扩展运算符</a></p>
<h3 id="articleHeader3">参考</h3>
<p>ES6新特性：Javascript中的Map和WeakMap对象<br><a href="http://www.cnblogs.com/diligenceday/p/5484130.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/dilige...</a>    <br>Set和Map数据结构<br><a href="http://es6.ruanyifeng.com/#docs/set-map" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a>  <br>MDN<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>   <br>Array filter()  <br><a href="http://www.runoob.com/jsref/jsref-filter.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/jsref/j...</a><br>Array.from()  <br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>   <br>JavaScript初学者必看“箭头函数” <br><a href="http://www.cnblogs.com/fundebug/p/6904753.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fundeb...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数组去重—ES6的两种方式

## 原文链接
[https://segmentfault.com/a/1190000011861891](https://segmentfault.com/a/1190000011861891)


---
title: 'JavaScript专题之如何求数组的最大值和最小值' 
date: 2019-01-08 2:30:11
hidden: true
slug: j4fc1ijtte
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScritpt 专题系列第八篇，讲解多种方式求数组的最大值和最小值</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>取出数组中的最大值或者最小值是开发中常见的需求，但你能想出几种方法来实现这个需求呢？</p>
<h2 id="articleHeader1">Math.max</h2>
<p>JavaScript 提供了 Math.max 函数返回一组数中的最大值，用法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.max([value1[,value2, ...]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.max([value1[,value2, ...]])</code></pre>
<p>值得注意的是：</p>
<ol>
<li><p>如果有任一参数不能被转换为数值，则结果为 NaN。</p></li>
<li><p>max 是 Math 的静态方法，所以应该像这样使用：Math.max()，而不是作为 Math 实例的方法 (简单的来说，就是不使用 new )</p></li>
<li><p>如果没有参数，则结果为 <code>-Infinity</code> (注意是负无穷大)</p></li>
</ol>
<p>而我们需要分析的是：</p>
<p>1.如果任一参数不能被转换为数值，这就意味着如果参数可以被转换成数字，就是可以进行比较的，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.max(true, 0) // 1
Math.max(true, '2', null) // 2
Math.max(1, undefined) // NaN
Math.max(1, {}) // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Math</span>.max(<span class="hljs-literal">true</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">Math</span>.max(<span class="hljs-literal">true</span>, <span class="hljs-string">'2'</span>, <span class="hljs-literal">null</span>) <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">Math</span>.max(<span class="hljs-number">1</span>, <span class="hljs-literal">undefined</span>) <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">Math</span>.max(<span class="hljs-number">1</span>, {}) <span class="hljs-comment">// NaN</span></code></pre>
<p>2.如果没有参数，则结果为 -Infinity，对应的，Math.min 函数，如果没有参数，则结果为 Infinity，所以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var min = Math.min();
var max = Math.max();
console.log(min > max);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> min = <span class="hljs-built_in">Math</span>.min();
<span class="hljs-keyword">var</span> max = <span class="hljs-built_in">Math</span>.max();
<span class="hljs-built_in">console</span>.log(min &gt; max);</code></pre>
<p>了解了 Math.max 方法，我们以求数组最大值的为例，思考有哪些方法可以实现这个需求。</p>
<h2 id="articleHeader2">原始方法</h2>
<p>最最原始的方法，莫过于循环遍历一遍：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [6, 4, 1, 8, 2, 11, 23];

var result = arr[0];
for (var i = 1; i < arr.length; i++) {
    result =  Math.max(result, arr[i]);
}
console.log(result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">23</span>];

<span class="hljs-keyword">var</span> result = arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; arr.length; i++) {
    result =  <span class="hljs-built_in">Math</span>.max(result, arr[i]);
}
<span class="hljs-built_in">console</span>.log(result);</code></pre>
<h2 id="articleHeader3">reduce</h2>
<p>既然是通过遍历数组求出一个最终值，那么我们就可以使用 reduce 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [6, 4, 1, 8, 2, 11, 23];

function max(prev, next) {
    return Math.max(prev, next);
}
console.log(arr.reduce(max));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">23</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">max</span>(<span class="hljs-params">prev, next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max(prev, next);
}
<span class="hljs-built_in">console</span>.log(arr.reduce(max));</code></pre>
<h2 id="articleHeader4">排序</h2>
<p>如果我们先对数组进行一次排序，那么最大值就是最后一个值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [6, 4, 1, 8, 2, 11, 23];

arr.sort(function(a,b){return a - b;});
console.log(arr[arr.length - 1])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">23</span>];

arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{<span class="hljs-keyword">return</span> a - b;});
<span class="hljs-built_in">console</span>.log(arr[arr.length - <span class="hljs-number">1</span>])</code></pre>
<h2 id="articleHeader5">eval</h2>
<p>Math.max 支持传多个参数来进行比较，那么我们如何将一个数组转换成参数传进 Math.max 函数呢？eval 便是一种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [6, 4, 1, 8, 2, 11, 23];

var max = eval(&quot;Math.max(&quot; + arr + &quot;)&quot;);
console.log(max)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">23</span>];

<span class="hljs-keyword">var</span> max = <span class="hljs-built_in">eval</span>(<span class="hljs-string">"Math.max("</span> + arr + <span class="hljs-string">")"</span>);
<span class="hljs-built_in">console</span>.log(max)</code></pre>
<h2 id="articleHeader6">apply</h2>
<p>使用 apply 是另一种。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max.apply(null, arr))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">23</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-literal">null</span>, arr))</code></pre>
<h2 id="articleHeader7">ES6 ...</h2>
<p>使用 ES6 的扩展运算符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max(...arr))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">23</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.max(...arr))</code></pre>
<p>有更多的方法欢迎留言哈~</p>
<h2 id="articleHeader8">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之如何求数组的最大值和最小值

## 原文链接
[https://segmentfault.com/a/1190000010250128](https://segmentfault.com/a/1190000010250128)


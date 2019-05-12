---
title: '30s js代码片段 翻译' 
date: 2018-12-18 2:30:11
hidden: true
slug: xie47l8wsb9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这是对 github 上<a href="https://github.com/Chalarangelo/30-seconds-of-code" rel="nofollow noreferrer" target="_blank">30s代码片段</a>的翻译整理，由于作者的文档是通过脚本生成的，也就懒得去提pull了，整理了放到博客上供大家学习参考，后续会持续跟进翻译。</blockquote>
<h2 id="articleHeader0">Array</h2>
<h3 id="articleHeader1">Array concatenation (合并参数)</h3>
<p>使用 <code>Array.concat()</code> 来连接参数中的任何数组或值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayConcat = (arr, ...args) => arr.concat(...args);
// arrayConcat([1], 2, [3], [[4]]) -> [1,2,3,[4]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arrayConcat = <span class="hljs-function">(<span class="hljs-params">arr, ...args</span>) =&gt;</span> arr.concat(...args);
<span class="hljs-comment">// arrayConcat([1], 2, [3], [[4]]) -&gt; [1,2,3,[4]]</span></code></pre>
<h3 id="articleHeader2">Array difference (取数组不同项)</h3>
<p>以 <code>b</code> 创建 <code>Set</code>，然后使用 <code>Array.filter()</code> 过滤，只保留 <code>b</code> 中不包含的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); };
// difference([1,2,3], [1,2]) -> [3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> difference = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> { <span class="hljs-keyword">const</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(b); <span class="hljs-keyword">return</span> a.filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> !s.has(x)); };
<span class="hljs-comment">// difference([1,2,3], [1,2]) -&gt; [3]</span></code></pre>
<h3 id="articleHeader3">Array intersection (取数组相同项)</h3>
<p>以 <code>b</code> 创建 <code>Set</code>，然后使用 <code>Array.filter()</code> 过滤，只保留 <code>b</code> 中包含的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); };
// intersection([1,2,3], [4,3,2]) -> [2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> intersection = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> { <span class="hljs-keyword">const</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(b); <span class="hljs-keyword">return</span> a.filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> s.has(x)); };
<span class="hljs-comment">// intersection([1,2,3], [4,3,2]) -&gt; [2,3]</span></code></pre>
<h3 id="articleHeader4">Array union (合并数组去重)</h3>
<p>用 <code>a</code> 和 <code>b</code> 的所有值创建一个 <code>Set</code> 并转换成一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const union = (a, b) => Array.from(new Set([...a, ...b]));
// union([1,2,3], [4,3,2]) -> [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> union = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...a, ...b]));
<span class="hljs-comment">// union([1,2,3], [4,3,2]) -&gt; [1,2,3,4]</span></code></pre>
<h3 id="articleHeader5">Average of array of numbers (通过数组取平均值)</h3>
<p>使用 <code>Array.reduce()</code> 将每个值添加到一个累加器，用值 <code>0</code> 初始化，除以数组的长度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> average = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">acc, val</span>) =&gt;</span> acc + val, <span class="hljs-number">0</span>) / arr.length;
<span class="hljs-comment">// average([1,2,3]) -&gt; 2</span></code></pre>
<h3 id="articleHeader6">Chunk array (数组切块)</h3>
<p>使用 <code>Array.from()</code> 创建一个满足块的数量的新的数组。<br>使用 <code>Array.slice()</code> 将新数组的每个元素映射到 <code>size</code> 长度的块。<br>如果原始数组不能均匀分割，最后的块将包含剩余的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> chunk = <span class="hljs-function">(<span class="hljs-params">arr, size</span>) =&gt;</span>
  <span class="hljs-built_in">Array</span>.from({<span class="hljs-attr">length</span>: <span class="hljs-built_in">Math</span>.ceil(arr.length / size)}, (v, i) =&gt; arr.slice(i * size, i * size + size));
<span class="hljs-comment">// chunk([1,2,3,4,5], 2) -&gt; [[1,2],[3,4],5]</span></code></pre>
<h3 id="articleHeader7">Compact (压缩)</h3>
<p>使用 <code>Array.filter()</code> 去过滤掉假值（<code>false</code>, <code>null</code>, <code>0</code>, <code>""</code>, <code>undefined</code> 和 <code>NaN</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compact = (arr) => arr.filter(v => v);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> compact = <span class="hljs-function">(<span class="hljs-params">arr</span>) =&gt;</span> arr.filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v);
<span class="hljs-comment">// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -&gt; [ 1, 2, 3, 'a', 's', 34 ]</span></code></pre>
<h3 id="articleHeader8">Count occurrences of a value in array (计算数组中指定值出现的次数)</h3>
<p>使用 <code>Array.reduce()</code> 去迭代数组，当值相同时，递增计数器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> countOccurrences = <span class="hljs-function">(<span class="hljs-params">arr, value</span>) =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> v === value ? a + <span class="hljs-number">1</span> : a + <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
<span class="hljs-comment">// countOccurrences([1,1,2,1,2,3], 1) -&gt; 3</span></code></pre>
<h3 id="articleHeader9">Deep flatten array (深度展开数组)</h3>
<p>使用递归。<br>使用 <code>Array.reduce()</code> 获取所有不是数组的值，并将数组展开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const deepFlatten = arr =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> deepFlatten = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span>
  arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> a.concat(<span class="hljs-built_in">Array</span>.isArray(v) ? deepFlatten(v) : v), []);
<span class="hljs-comment">// deepFlatten([1,[2],[[3],4],5]) -&gt; [1,2,3,4,5]</span></code></pre>
<h3 id="articleHeader10">Drop elements in array (删除数组中的元素)</h3>
<p>循环访问数组，使用 <code>Array.shift()</code> 删除数组的第一个元素，直到函数的返回值为 <code>true</code>，返回其余的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dropElements = (arr, func) => {
  while (arr.length > 0 &amp;&amp; !func(arr[0])) arr.shift();
  return arr;
};
// dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dropElements = <span class="hljs-function">(<span class="hljs-params">arr, func</span>) =&gt;</span> {
  <span class="hljs-keyword">while</span> (arr.length &gt; <span class="hljs-number">0</span> &amp;&amp; !func(arr[<span class="hljs-number">0</span>])) arr.shift();
  <span class="hljs-keyword">return</span> arr;
};
<span class="hljs-comment">// dropElements([1, 2, 3, 4], n =&gt; n &gt;= 3) -&gt; [3,4]</span></code></pre>
<h3 id="articleHeader11">Fill array (填充数组)</h3>
<p>使用 <code>Array.map()</code> 将 <code>start</code>（包含）和 <code>end</code>（不包含）之间的值映射为 <code>value</code>。<br>省略 <code>start</code> 将从第一个元素开始／省略 <code>end</code> 将在数组最后结束。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fillArray = (arr, value, start = 0, end = arr.length) =>
  arr.map((v, i) => i >= start &amp;&amp; i < end ? value : v);
// fillArray([1,2,3,4],'8',1,3) -> [1,'8','8',4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fillArray = <span class="hljs-function">(<span class="hljs-params">arr, value, start = <span class="hljs-number">0</span>, end = arr.length</span>) =&gt;</span>
  arr.map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> i &gt;= start &amp;&amp; i &lt; end ? value : v);
<span class="hljs-comment">// fillArray([1,2,3,4],'8',1,3) -&gt; [1,'8','8',4]</span></code></pre>
<h3 id="articleHeader12">Filter out non-unique values in an array (过滤掉数组中重复的值)</h3>
<p>使用 <code>Array.filter()</code> 保证数组仅包含唯一值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> filterNonUnique = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.filter(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> arr.indexOf(i) === arr.lastIndexOf(i));
<span class="hljs-comment">// filterNonUnique([1,2,2,3,4,4,5]) -&gt; [1,3,5]</span></code></pre>
<h3 id="articleHeader13">Flatten array up to depth (展开指定深度的数组)</h3>
<p>使用递归去递减深度。<br>使用 <code>Array.reduce()</code> 和 <code>Array.concat()</code> 来合并元素或数组。<br>基本情况下，当深度为 <code>1</code> 时停止递归。<br>省略第二个参数，展开深度为 <code>1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const flattenDepth = (arr, depth = 1) =>
  depth != 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), [])
  : arr.reduce((a, v) => a.concat(v), []);
// flattenDepth([1,[2],[[[3],4],5]], 2) -> [1,2,[3],4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> flattenDepth = <span class="hljs-function">(<span class="hljs-params">arr, depth = <span class="hljs-number">1</span></span>) =&gt;</span>
  depth != <span class="hljs-number">1</span> ? arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> a.concat(<span class="hljs-built_in">Array</span>.isArray(v) ? flattenDepth(v, depth - <span class="hljs-number">1</span>) : v), [])
  : arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> a.concat(v), []);
<span class="hljs-comment">// flattenDepth([1,[2],[[[3],4],5]], 2) -&gt; [1,2,[3],4,5]</span></code></pre>
<h3 id="articleHeader14">Flatten array (拼合数组)</h3>
<p>使用 <code>Array.reduce()</code> 来获取内部所有元素并用 <code>concat()</code> 合并它们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> flatten = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> a.concat(v), []);
<span class="hljs-comment">// flatten([1,[2],3,4]) -&gt; [1,2,3,4]</span></code></pre>
<h3 id="articleHeader15">Get max value from array (获取数组中的最大值)</h3>
<p>使用 <code>Math.max()</code> 配合 <code>...</code> 扩展运算符去获取数组中的最大值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arrayMax = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">Math</span>.max(...arr);
<span class="hljs-comment">// arrayMax([10, 1, 5]) -&gt; 10</span></code></pre>
<h3 id="articleHeader16">Get min value from array (获取数组中的最小值)</h3>
<p>使用 <code>Math.max()</code> 配合 <code>...</code> 扩展运算符去获取数组中的最小值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arrayMin = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">Math</span>.min(...arr);
<span class="hljs-comment">// arrayMin([10, 1, 5]) -&gt; 1</span></code></pre>
<h3 id="articleHeader17">Group by (条件分组)</h3>
<p>使用 <code>Array.map()</code> 将数组的值映射到函数或属性名称。<br>使用 <code>Array.reduce()</code> 创建一个对象，其中的键是从映射的结果中产生的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const groupBy = (arr, func) =>
  arr.map(typeof func === 'function' ? func : val => val[func])
    .reduce((acc, val, i) => { acc[val] = (acc[val] || []).concat(arr[i]); return acc; }, {});
// groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> groupBy = <span class="hljs-function">(<span class="hljs-params">arr, func</span>) =&gt;</span>
  arr.map(<span class="hljs-keyword">typeof</span> func === <span class="hljs-string">'function'</span> ? func : <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> val[func])
    .reduce(<span class="hljs-function">(<span class="hljs-params">acc, val, i</span>) =&gt;</span> { acc[val] = (acc[val] || []).concat(arr[i]); <span class="hljs-keyword">return</span> acc; }, {});
<span class="hljs-comment">// groupBy([6.1, 4.2, 6.3], Math.floor) -&gt; {4: [4.2], 6: [6.1, 6.3]}</span>
<span class="hljs-comment">// groupBy(['one', 'two', 'three'], 'length') -&gt; {3: ['one', 'two'], 5: ['three']}</span></code></pre>
<h3 id="articleHeader18">Head of list (获取数组的首个元素)</h3>
<p>使用 <code>arr[0]</code> 返回传递数组的第一个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const head = arr => arr[0];
// head([1,2,3]) -> 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> head = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr[<span class="hljs-number">0</span>];
<span class="hljs-comment">// head([1,2,3]) -&gt; 1</span></code></pre>
<h3 id="articleHeader19">Initial of list</h3>
<p>使用 <code>arr,slice(0, -1)</code> 去返回去除最后一个元素的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> initial = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>);
<span class="hljs-comment">// initial([1,2,3]) -&gt; [1,2]</span></code></pre>
<h3 id="articleHeader20">Initialize array with range (使用指定范围来定义数组)</h3>
<p>使用 <code>Array(end-start)</code> 创建一个所需长度的数组，使用 <code>Array.map()</code> 来填充范围中的所需值。<br>你可以省略<code>start</code>，默认值为 <code>0</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end - start)).map((v, i) => i + start);
// initializeArrayRange(5) -> [0,1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> initializeArrayRange = <span class="hljs-function">(<span class="hljs-params">end, start = <span class="hljs-number">0</span></span>) =&gt;</span>
  <span class="hljs-built_in">Array</span>.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">Array</span>(end - start)).map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> i + start);
<span class="hljs-comment">// initializeArrayRange(5) -&gt; [0,1,2,3,4]</span></code></pre>
<h3 id="articleHeader21">Initialize array with values (使用指定值来定义数组)</h3>
<p>使用 <code>Array(n)</code> 创建一个所需长度的数组，使用 <code>fill(v)</code> 去填充所需要的值。<br>亦可以省略 <code>value</code>，默认值为 <code>0</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initializeArray = (n, value = 0) => Array(n).fill(value);
// initializeArray(5, 2) -> [2,2,2,2,2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> initializeArray = <span class="hljs-function">(<span class="hljs-params">n, value = <span class="hljs-number">0</span></span>) =&gt;</span> <span class="hljs-built_in">Array</span>(n).fill(value);
<span class="hljs-comment">// initializeArray(5, 2) -&gt; [2,2,2,2,2]</span></code></pre>
<h3 id="articleHeader22">Last of list (获取数组的结尾)</h3>
<p>使用 <code>arr.slice(-1)[0]</code> 获得给定数组的最后一个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const last = arr => arr.slice(-1)[0];
// last([1,2,3]) -> 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> last = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.slice(<span class="hljs-number">-1</span>)[<span class="hljs-number">0</span>];
<span class="hljs-comment">// last([1,2,3]) -&gt; 3</span></code></pre>
<h3 id="articleHeader23">Median of array of numbers (获取数组的中间值)</h3>
<p>找到数组的中间，使用 <code>Array.sort()</code> 对值进行排序。<br>如果长度是奇数，则返回中点处的数字，否则返回两个中间数字的平均值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const median = arr => {
  const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> median = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> mid = <span class="hljs-built_in">Math</span>.floor(arr.length / <span class="hljs-number">2</span>), nums = arr.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
  <span class="hljs-keyword">return</span> arr.length % <span class="hljs-number">2</span> !== <span class="hljs-number">0</span> ? nums[mid] : (nums[mid - <span class="hljs-number">1</span>] + nums[mid]) / <span class="hljs-number">2</span>;
};
<span class="hljs-comment">// median([5,6,50,1,-5]) -&gt; 5</span>
<span class="hljs-comment">// median([0,10,-2,7]) -&gt; 3.5</span></code></pre>
<h3 id="articleHeader24">Nth element of array (获取数组的第 N 个元素)</h3>
<p>使用 <code>Array.slice()</code> 得到一个包含第一个元素的数组。<br>如果索引超出范围，则返回 <code>[]</code>。（译者注：超过索引返回 <code>undefind</code>）<br>省略第二个参数 <code>n</code> 来获取数组的第一个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const nth = (arr, n=0) => (n>0? arr.slice(n,n+1) : arr.slice(n))[0];
// nth(['a','b','c'],1) -> 'b'
// nth(['a','b','b']-2) -> 'a'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> nth = <span class="hljs-function">(<span class="hljs-params">arr, n=<span class="hljs-number">0</span></span>) =&gt;</span> (n&gt;<span class="hljs-number">0</span>? arr.slice(n,n+<span class="hljs-number">1</span>) : arr.slice(n))[<span class="hljs-number">0</span>];
<span class="hljs-comment">// nth(['a','b','c'],1) -&gt; 'b'</span>
<span class="hljs-comment">// nth(['a','b','b']-2) -&gt; 'a'</span></code></pre>
<h3 id="articleHeader25">Pick (挑选)</h3>
<p>使用 <code>Array.reduce()</code> 去过滤／挑选存在于 obj 中的 key 值，并转换回相应的键值对的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj &amp;&amp; (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
// pick(object, ['a', 'c'])['a'] -> 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> pick = <span class="hljs-function">(<span class="hljs-params">obj, arr</span>) =&gt;</span>
  arr.reduce(<span class="hljs-function">(<span class="hljs-params">acc, curr</span>) =&gt;</span> (curr <span class="hljs-keyword">in</span> obj &amp;&amp; (acc[curr] = obj[curr]), acc), {});
<span class="hljs-comment">// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -&gt; { 'a': 1, 'c': 3 }</span>
<span class="hljs-comment">// pick(object, ['a', 'c'])['a'] -&gt; 1</span></code></pre>
<h3 id="articleHeader26">Shuffle array (随机数组)</h3>
<p>使用 <code>Array.sort()</code> 在比较器中使用 <code>Math.random()</code> 重新排序元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> shuffle = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.sort(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>);
<span class="hljs-comment">// shuffle([1,2,3]) -&gt; [2,3,1]</span></code></pre>
<h3 id="articleHeader27">Similarity between arrays (获取数组的交集)</h3>
<p>使用 <code>filter()</code> 移除不是 <code>values</code> 的一部分的值，使用 <code>includes()</code> 确定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> similarity = <span class="hljs-function">(<span class="hljs-params">arr, values</span>) =&gt;</span> arr.filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> values.includes(v));
<span class="hljs-comment">// similarity([1,2,3], [1,2,4]) -&gt; [1,2]</span></code></pre>
<h3 id="articleHeader28">Sum of array of numbers (数组的总和)</h3>
<p>使用 <code>Array.reduce()</code> 去迭代值并计算累计器，初始值为 <code>0</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sum = arr => arr.reduce((acc, val) => acc + val, 0);
// sum([1,2,3,4]) -> 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sum = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">acc, val</span>) =&gt;</span> acc + val, <span class="hljs-number">0</span>);
<span class="hljs-comment">// sum([1,2,3,4]) -&gt; 10</span></code></pre>
<h3 id="articleHeader29">Tail of list (列表的尾巴)</h3>
<p>如果数组的长度大于1，则返回 <code>arr.slice(1)</code>，否则返回整个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> tail = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.length &gt; <span class="hljs-number">1</span> ? arr.slice(<span class="hljs-number">1</span>) : arr;
<span class="hljs-comment">// tail([1,2,3]) -&gt; [2,3]</span>
<span class="hljs-comment">// tail([1]) -&gt; [1]</span></code></pre>
<h3 id="articleHeader30">Take (抽取)</h3>
<p>使用 <code>Array.slice()</code> 从头开始创建 <code>n</code> 个元素的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const take = (arr, n = 1) => arr.slice(0, n);
// take([1, 2, 3], 5) -> [1, 2, 3]
// take([1, 2, 3], 0) -> []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> take = <span class="hljs-function">(<span class="hljs-params">arr, n = <span class="hljs-number">1</span></span>) =&gt;</span> arr.slice(<span class="hljs-number">0</span>, n);
<span class="hljs-comment">// take([1, 2, 3], 5) -&gt; [1, 2, 3]</span>
<span class="hljs-comment">// take([1, 2, 3], 0) -&gt; []</span></code></pre>
<h3 id="articleHeader31">Unique values of array (数组去重)</h3>
<p>使用ES6 <code>Set</code> 和 <code>...rest</code> 运算符去除所有重复的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> unique = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> [...new <span class="hljs-built_in">Set</span>(arr)];
<span class="hljs-comment">// unique([1,2,2,3,4,4,5]) -&gt; [1,2,3,4,5]</span></code></pre>
<h2 id="articleHeader32">Browser</h2>
<h3 id="articleHeader33">Bottom visible (底部可见即滚动至底部)</h3>
<p>使用 <code>scrollY</code>，<code>scrollHeight</code> 和 <code>clientHeight</code> 来确定页面的底部是否可见。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bottomVisible = _ =>
  document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
// bottomVisible() -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> bottomVisible = <span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span>
  <span class="hljs-built_in">document</span>.documentElement.clientHeight + <span class="hljs-built_in">window</span>.scrollY &gt;= (<span class="hljs-built_in">document</span>.documentElement.scrollHeight || <span class="hljs-built_in">document</span>.documentElement.clientHeight);
<span class="hljs-comment">// bottomVisible() -&gt; true</span></code></pre>
<h3 id="articleHeader34">Current URL (当前链接地址)</h3>
<p>使用 <code>window.location.href</code> 来获取当前链接地址。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> currentUrl = <span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">window</span>.location.href;
<span class="hljs-comment">// currentUrl() -&gt; 'https://google.com'</span></code></pre>
<h3 id="articleHeader35">Element is visible in viewport (元素在视窗中可见)</h3>
<p>使用 <code>Element.getBoundingClientRect()</code> 和 <code>window.inner(Width|Height)</code> 值来确定给定的元素在视口中是否可见。<br>第二个参数用来指定元素是否要求完全可见，指定 <code>true</code> 即部分可见，默认为全部可见。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  return partiallyVisible
    ? ((top > 0 &amp;&amp; top < innerHeight) || (bottom > 0 &amp;&amp; bottom < innerHeight)) &amp;&amp;
      ((left > 0 &amp;&amp; left < innerWidth) || (right > 0 &amp;&amp; right < innerWidth))
    : top >= 0 &amp;&amp; left >= 0 &amp;&amp; bottom <= innerHeight &amp;&amp; right <= innerWidth;
};
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
// elementIsVisibleInViewport(el) -> false (not fully visible)
// elementIsVisibleInViewport(el, true) -> true (partially visible)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> elementIsVisibleInViewport = <span class="hljs-function">(<span class="hljs-params">el, partiallyVisible = <span class="hljs-literal">false</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { top, left, bottom, right } = el.getBoundingClientRect();
  <span class="hljs-keyword">return</span> partiallyVisible
    ? ((top &gt; <span class="hljs-number">0</span> &amp;&amp; top &lt; innerHeight) || (bottom &gt; <span class="hljs-number">0</span> &amp;&amp; bottom &lt; innerHeight)) &amp;&amp;
      ((left &gt; <span class="hljs-number">0</span> &amp;&amp; left &lt; innerWidth) || (right &gt; <span class="hljs-number">0</span> &amp;&amp; right &lt; innerWidth))
    : top &gt;= <span class="hljs-number">0</span> &amp;&amp; left &gt;= <span class="hljs-number">0</span> &amp;&amp; bottom &lt;= innerHeight &amp;&amp; right &lt;= innerWidth;
};
<span class="hljs-comment">// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}</span>
<span class="hljs-comment">// elementIsVisibleInViewport(el) -&gt; false (not fully visible)</span>
<span class="hljs-comment">// elementIsVisibleInViewport(el, true) -&gt; true (partially visible)</span></code></pre>
<h3 id="articleHeader36">Get scroll position (获取滚动位置)</h3>
<p>如果存在，使用 <code>pageXOffset</code> 和 <code>pageYOffset</code>，否则使用 <code>scrollLeft</code> 和 <code>scrollTop</code>。<br>你可以省略 <code>el</code>，默认使用 <code>window</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getScrollPos = (el = window) =>
  ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
// getScrollPos() -> {x: 0, y: 200}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getScrollPos = <span class="hljs-function">(<span class="hljs-params">el = <span class="hljs-built_in">window</span></span>) =&gt;</span>
  ({<span class="hljs-attr">x</span>: (el.pageXOffset !== <span class="hljs-literal">undefined</span>) ? el.pageXOffset : el.scrollLeft,
    <span class="hljs-attr">y</span>: (el.pageYOffset !== <span class="hljs-literal">undefined</span>) ? el.pageYOffset : el.scrollTop});
<span class="hljs-comment">// getScrollPos() -&gt; {x: 0, y: 200}</span></code></pre>
<h3 id="articleHeader37">Redirect to URL (URL 重定向)</h3>
<p>使用 <code>window.location.href</code> 或者 <code>window.location.replace()</code> 去重定向到 <code>url</code>。<br>第二个参数用来控制模拟链接点击（<code>true</code> - 默认）还是 HTTP 重定向（<code>false</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> redirect = <span class="hljs-function">(<span class="hljs-params">url, asLink = <span class="hljs-literal">true</span></span>) =&gt;</span>
  asLink ? <span class="hljs-built_in">window</span>.location.href = url : <span class="hljs-built_in">window</span>.location.replace(url);
<span class="hljs-comment">// redirect('https://google.com')</span></code></pre>
<h3 id="articleHeader38">Scroll to top (滚动至顶部)</h3>
<p>使用 <code>document.documentElement.scrollTop</code> 或 <code>document.body.scrollTop</code> 获取到顶端的距离。<br>从顶部滚动一小部分距离。 使用 <code>window.requestAnimationFrame（）</code> 实现滚动动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> scrollToTop = <span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> c = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop;
  <span class="hljs-keyword">if</span> (c &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">window</span>.requestAnimationFrame(scrollToTop);
    <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, c - c / <span class="hljs-number">8</span>);
  }
};
<span class="hljs-comment">// scrollToTop()</span></code></pre>
<h2 id="articleHeader39">Date</h2>
<h3 id="articleHeader40">Get days difference between dates (获取两个日期间的差距)</h3>
<p>计算两个 <code>Date</code> 对象之间的差距（以天为单位）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date(&quot;2017-12-13&quot;), new Date(&quot;2017-12-22&quot;)) -> 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getDaysDiffBetweenDates = <span class="hljs-function">(<span class="hljs-params">dateInitial, dateFinal</span>) =&gt;</span> (dateFinal - dateInitial) / (<span class="hljs-number">1000</span> * <span class="hljs-number">3600</span> * <span class="hljs-number">24</span>);
<span class="hljs-comment">// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -&gt; 9</span></code></pre>
<h2 id="articleHeader41">Function</h2>
<h3 id="articleHeader42">Chain asynchronous functions (链式异步函数)</h3>
<p>循环遍历包含异步事件的函数数组，当每个异步事件完成时调用 <code>next</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); };
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> chainAsync = <span class="hljs-function"><span class="hljs-params">fns</span> =&gt;</span> { <span class="hljs-keyword">let</span> curr = <span class="hljs-number">0</span>; <span class="hljs-keyword">const</span> next = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> fns[curr++](next); next(); };
<span class="hljs-comment">/*
chainAsync([
  next =&gt; { console.log('0 seconds'); setTimeout(next, 1000); },
  next =&gt; { console.log('1 second');  setTimeout(next, 1000); },
  next =&gt; { console.log('2 seconds'); }
])
*/</span></code></pre>
<h3 id="articleHeader43">Curry (函数柯里化)</h3>
<p>使用递归。<br>如果提供的参数（<code>args</code>）的数量足够，则调用传递的函数 <code>fn</code>，否则返回一个柯里化函数 <code>fn</code>，等待传入剩下的参数。<br>如果你想要一个接受参数数量可变的函数（一个可变参数函数，例如<code>Math.min()</code>），你可以选择将参数个数传递给第二个参数 <code>arity</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length
    ? fn(...args)
    : curry.bind(null, fn, arity, ...args);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> curry = <span class="hljs-function">(<span class="hljs-params">fn, arity = fn.length, ...args</span>) =&gt;</span>
  arity &lt;= args.length
    ? fn(...args)
    : curry.bind(<span class="hljs-literal">null</span>, fn, arity, ...args);
<span class="hljs-comment">// curry(Math.pow)(2)(10) -&gt; 1024</span>
<span class="hljs-comment">// curry(Math.min, 3)(10)(50)(2) -&gt; 2</span></code></pre>
<h3 id="articleHeader44">Pipe (管道)</h3>
<p>使用 <code>Array.reduce()</code> 让值在函数间流通。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pipe = (...funcs) => arg => funcs.reduce((acc, func) => func(acc), arg);
// pipe(btoa, x => x.toUpperCase())(&quot;Test&quot;) -> &quot;VGVZDA==&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> pipe = <span class="hljs-function">(<span class="hljs-params">...funcs</span>) =&gt;</span> arg =&gt; funcs.reduce(<span class="hljs-function">(<span class="hljs-params">acc, func</span>) =&gt;</span> func(acc), arg);
<span class="hljs-comment">// pipe(btoa, x =&gt; x.toUpperCase())("Test") -&gt; "VGVZDA=="</span></code></pre>
<h3 id="articleHeader45">Promisify (promise转化)</h3>
<p>使用 currying 返回一个函数，返回一个调用原始函数的 <code>Promise</code>。<br>使用 <code>...rest</code> 运算符传入所有参数。</p>
<p><em>In Node 8+, you can use <a href="https://nodejs.org/api/util.html#util_util_promisify_original" rel="nofollow noreferrer" target="_blank"><code>util.promisify</code></a></em></p>
<p><em>Node 8 版本以上，你可以使用 <a href="https://nodejs.org/api/util.html#util_util_promisify_original" rel="nofollow noreferrer" target="_blank"><code>util.promisify</code></a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promisify = func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        err ? reject(err) : resolve(result))
    );
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promisify = <span class="hljs-function"><span class="hljs-params">func</span> =&gt;</span>
  (...args) =&gt;
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span>
      func(...args, (err, result) =&gt;
        err ? reject(err) : resolve(result))
    );
<span class="hljs-comment">// const delay = promisify((d, cb) =&gt; setTimeout(cb, d))</span>
<span class="hljs-comment">// delay(2000).then(() =&gt; console.log('Hi!')) -&gt; Promise resolves after 2s</span></code></pre>
<h3 id="articleHeader46">Run promises in series (队列运行promise)</h3>
<p>使用 <code>Array.reduce()</code> 通过创建一个 promise 链来运行一系列 promise，每个 promise 在解析时返回下一个 promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> series = <span class="hljs-function"><span class="hljs-params">ps</span> =&gt;</span> ps.reduce(<span class="hljs-function">(<span class="hljs-params">p, next</span>) =&gt;</span> p.then(next), <span class="hljs-built_in">Promise</span>.resolve());
<span class="hljs-comment">// const delay = (d) =&gt; new Promise(r =&gt; setTimeout(r, d))</span>
<span class="hljs-comment">// series([() =&gt; delay(1000), () =&gt; delay(2000)]) -&gt; executes each promise sequentially, taking a total of 3 seconds to complete</span></code></pre>
<h3 id="articleHeader47">Sleep (睡眠)</h3>
<p>通过返回一个 <code>Promise</code> 延迟执行 <code>async</code> 函数，把它放到睡眠状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sleep = <span class="hljs-function"><span class="hljs-params">ms</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, ms));
<span class="hljs-comment">/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/</span></code></pre>
<h2 id="articleHeader48">Math</h2>
<h3 id="articleHeader49">Collatz algorithm (考拉兹算法)</h3>
<p>如果 <code>n</code> 是偶数，返回 <code>n/2</code>，否则返回 <code>3n+1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const collatz = n => (n % 2 == 0) ? (n / 2) : (3 * n + 1);
// collatz(8) --> 4
// collatz(5) --> 16" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> collatz = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> (n % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>) ? (n / <span class="hljs-number">2</span>) : (<span class="hljs-number">3</span> * n + <span class="hljs-number">1</span>);
<span class="hljs-comment">// collatz(8) --&gt; 4</span>
<span class="hljs-comment">// collatz(5) --&gt; 16</span></code></pre>
<h3 id="articleHeader50">Distance between two points (两点间的距离)</h3>
<p>使用 <code>Matg.hypot()</code> 来计算两点间的欧式距离。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> distance = <span class="hljs-function">(<span class="hljs-params">x0, y0, x1, y1</span>) =&gt;</span> <span class="hljs-built_in">Math</span>.hypot(x1 - x0, y1 - y0);
<span class="hljs-comment">// distance(1,1, 2,3) -&gt; 2.23606797749979</span></code></pre>
<h3 id="articleHeader51">Divisible by number (可否被整除)</h3>
<p>使用模运算符（<code>％</code>）来检查余数是否等于 <code>0</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isDivisible = <span class="hljs-function">(<span class="hljs-params">dividend, divisor</span>) =&gt;</span> dividend % divisor === <span class="hljs-number">0</span>;
<span class="hljs-comment">// isDivisible(6,3) -&gt; true</span></code></pre>
<h3 id="articleHeader52">Even or odd number (偶数或奇数)</h3>
<p>使用模运算符（<code>%</code>）来计算一个数为偶数还是奇数。<br>返回 <code>true</code> 为偶数，返回 <code>false</code> 则为奇数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isEven = num => num % 2 === 0;
// isEven(3) -> false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isEven = <span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> num % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>;
<span class="hljs-comment">// isEven(3) -&gt; false</span></code></pre>
<h3 id="articleHeader53">Factorial (阶乘)</h3>
<p>使用递归。<br>如果 <code>n</code> 小于或等于 <code>1</code>，返回 <code>1</code>。<br>其它情况，则返回 <code>n</code> 和 <code>n-1</code> 的阶乘的积。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> factorial = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n &lt;= <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : n * factorial(n - <span class="hljs-number">1</span>);
<span class="hljs-comment">// factorial(6) -&gt; 720</span></code></pre>
<h3 id="articleHeader54">Fibonacci array generator (斐波纳契数组生成器)</h3>
<p>创建一个指定长度的空数组，初始化前两个值（<code>0</code>和<code>1</code>）。<br>使用 <code>Array.reduce()</code> 将最后两个值的总和添加到数组中（前两个除外）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fibonacci = n =>
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fibonacci = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span>
  <span class="hljs-built_in">Array</span>(n).fill(<span class="hljs-number">0</span>).reduce(<span class="hljs-function">(<span class="hljs-params">acc, val, i</span>) =&gt;</span> acc.concat(i &gt; <span class="hljs-number">1</span> ? acc[i - <span class="hljs-number">1</span>] + acc[i - <span class="hljs-number">2</span>] : i), []);
<span class="hljs-comment">// fibonacci(5) -&gt; [0,1,1,2,3]</span></code></pre>
<h3 id="articleHeader55">Greatest common divisor (GCD) (最大公约数)(译者注：使用辗转相乘法)</h3>
<p>使用递归。<br>基本情况是如果 <code>y</code> 等于 <code>0</code>，则返回 <code>x</code>。<br>其它情况下，返回 <code>y</code> 与 <code>x/y</code> 的最大公约数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const gcd = (x, y) => !y ? x : gcd(y, x % y);
// gcd (8, 36) -> 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> gcd = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> !y ? x : gcd(y, x % y);
<span class="hljs-comment">// gcd (8, 36) -&gt; 4</span></code></pre>
<h3 id="articleHeader56">Hamming distance (汉明距离)</h3>
<p>使用 异或 运算符（<code>^</code>）去查找两个数值间的位差，使用 <code>toString(2)</code> 转换为二进制值，使用 <code>match(/1/g)</code> 计算并返回字符串中 <code>1</code> 的数量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;
// hammingDistance(2,3) -> 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> hammingDistance = <span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span>
  ((num1 ^ num2).toString(<span class="hljs-number">2</span>).match(<span class="hljs-regexp">/1/g</span>) || <span class="hljs-string">''</span>).length;
<span class="hljs-comment">// hammingDistance(2,3) -&gt; 1</span></code></pre>
<h3 id="articleHeader57">Percentile (百分位数)</h3>
<p>使用百分比公式计算给定数组中有多少个数小于或等于给定值。</p>
<p>使用Array.reduce()计算值的下面有多少个数是相同的值, 并应用百分比公式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const percentile = (arr, val) => 
  100 * arr.reduce((acc,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> percentile = <span class="hljs-function">(<span class="hljs-params">arr, val</span>) =&gt;</span> 
  <span class="hljs-number">100</span> * arr.reduce(<span class="hljs-function">(<span class="hljs-params">acc,v</span>) =&gt;</span> acc + (v &lt; val ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>) + (v === val ? <span class="hljs-number">0.5</span> : <span class="hljs-number">0</span>), <span class="hljs-number">0</span>) / arr.length;
<span class="hljs-comment">// percentile([1,2,3,4,5,6,7,8,9,10], 6) -&gt; 55</span></code></pre>
<h3 id="articleHeader58">Powerset (幂集)</h3>
<p>使用 <code>Array.reduce()</code> 与 <code>Array.map()</code> 结合来迭代元素并将其组合成一个包含所有组合的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> powerset = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span>
  arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> a.concat(a.map(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> [v].concat(r))), [[]]);
<span class="hljs-comment">// powerset([1,2]) -&gt; [[], [1], [2], [2,1]]</span></code></pre>
<h3 id="articleHeader59">Round number to n digits (取小数点后 n 位)</h3>
<p>使用 <code>Math.round()</code> 和字符串模板将数字四舍五入到指定的位数。<br>省略第二个参数，<code>decimals</code> 将四舍五入到一个整数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const round = (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
// round(1.005, 2) -> 1.01" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> round = <span class="hljs-function">(<span class="hljs-params">n, decimals=<span class="hljs-number">0</span></span>) =&gt;</span> <span class="hljs-built_in">Number</span>(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Math</span>.round(<span class="hljs-string">`<span class="hljs-subst">${n}</span>e<span class="hljs-subst">${decimals}</span>`</span>)}</span>e-<span class="hljs-subst">${decimals}</span>`</span>);
<span class="hljs-comment">// round(1.005, 2) -&gt; 1.01</span></code></pre>
<h3 id="articleHeader60">Standard deviation (标准差)</h3>
<p>Use <code>Array.reduce()</code> to calculate the mean, variance and the sum of the variance of the values, the variance of the values, then<br>determine the standard deviation.<br>You can omit the second argument to get the sample standard deviation or set it to <code>true</code> to get the population standard deviation.</p>
<p>使用 <code>Array.reduce()</code> 来计算平均值，方差以及方差之和，然后确定标准偏差。<br>您可以省略第二个参数来获取样本标准差或将其设置为 <code>true</code> 以获得总体标准差。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
       .reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1))
  );
};
// standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample)
// standardDeviation([10,2,38,23,38,23,21], true) -> 12.29899614287479 (population)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> standardDeviation = <span class="hljs-function">(<span class="hljs-params">arr, usePopulation = <span class="hljs-literal">false</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> mean = arr.reduce(<span class="hljs-function">(<span class="hljs-params">acc, val</span>) =&gt;</span> acc + val, <span class="hljs-number">0</span>) / arr.length;
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.sqrt(
    arr.reduce(<span class="hljs-function">(<span class="hljs-params">acc, val</span>) =&gt;</span> acc.concat(<span class="hljs-built_in">Math</span>.pow(val - mean, <span class="hljs-number">2</span>)), [])
       .reduce(<span class="hljs-function">(<span class="hljs-params">acc, val</span>) =&gt;</span> acc + val, <span class="hljs-number">0</span>) / (arr.length - (usePopulation ? <span class="hljs-number">0</span> : <span class="hljs-number">1</span>))
  );
};
<span class="hljs-comment">// standardDeviation([10,2,38,23,38,23,21]) -&gt; 13.284434142114991 (sample)</span>
<span class="hljs-comment">// standardDeviation([10,2,38,23,38,23,21], true) -&gt; 12.29899614287479 (population)</span></code></pre>
<h2 id="articleHeader61">Media (媒体)</h2>
<h3 id="articleHeader62">Speech synthesis (experimental) 语音合成(试验功能)</h3>
<p>使用 <code>SpeechSynthesisUtterance.voice</code> 和 <code>indow.speechSynthesis.getVoices()</code> 将消息转换为语音。<br>使用 <code>window.speechSynthesis.speak()</code> 来播放消息。</p>
<p>了解更多关于 <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance" rel="nofollow noreferrer" target="_blank">SpeechSynthesisUtterance interface of the Web Speech API</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const speak = message => {
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};
// speak('Hello, World') -> plays the message" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> speak = <span class="hljs-function"><span class="hljs-params">message</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> msg = <span class="hljs-keyword">new</span> SpeechSynthesisUtterance(message);
  msg.voice = <span class="hljs-built_in">window</span>.speechSynthesis.getVoices()[<span class="hljs-number">0</span>];
  <span class="hljs-built_in">window</span>.speechSynthesis.speak(msg);
};
<span class="hljs-comment">// speak('Hello, World') -&gt; plays the message</span></code></pre>
<h2 id="articleHeader63">Object (对象)</h2>
<h3 id="articleHeader64">Object from key-value pairs (键值对创建对象)</h3>
<p>使用 <code>Array.reduce()</code> 创建和组合键值对。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> objectFromPairs = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> (a[v[<span class="hljs-number">0</span>]] = v[<span class="hljs-number">1</span>], a), {});
<span class="hljs-comment">// objectFromPairs([['a',1],['b',2]]) -&gt; {a: 1, b: 2}</span></code></pre>
<h3 id="articleHeader65">Object to key-value pairs (对象生成键值对)</h3>
<p>使用 <code>Object.keys()</code> 和 <code>Array.map()</code> 去遍历对象的键并生成一个包含键值对的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
// objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> objectToPairs = <span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> <span class="hljs-built_in">Object</span>.keys(obj).map(<span class="hljs-function"><span class="hljs-params">k</span> =&gt;</span> [k, obj[k]]);
<span class="hljs-comment">// objectToPairs({a: 1, b: 2}) -&gt; [['a',1],['b',2]])</span></code></pre>
<h3 id="articleHeader66">Shallow clone object (浅拷贝对象)</h3>
<p>使用 <code>...spread</code> 扩展运算符将目标对象的属性添加到拷贝对象中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const shallowClone = obj => ({ ...obj });
/*
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b -> false
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> shallowClone = <span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> ({ ...obj });
<span class="hljs-comment">/*
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b -&gt; false
*/</span></code></pre>
<h2 id="articleHeader67">String (字符串)</h2>
<h3 id="articleHeader68">Anagrams of string (with duplicates) (字符串异位(和重复))</h3>
<p>使用递归。<br>遍历给定字符串中的每个字母，用其余字母创建所有部分字母。<br>使用 <code>Array.map()</code> 将字母与每个部分字母组合，然后使用 <code>Array.reduce()</code> 将所有字母组合到一个数组中。<br>当给定字符串数量等与 <code>2</code> 或 <code>1</code> 时做简单处理。＝</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> anagrams = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (str.length &lt;= <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> str.length === <span class="hljs-number">2</span> ? [str, str[<span class="hljs-number">1</span>] + str[<span class="hljs-number">0</span>]] : [str];
  <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).reduce(<span class="hljs-function">(<span class="hljs-params">acc, letter, i</span>) =&gt;</span>
    acc.concat(anagrams(str.slice(<span class="hljs-number">0</span>, i) + str.slice(i + <span class="hljs-number">1</span>)).map(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> letter + val)), []);
};
<span class="hljs-comment">// anagrams('abc') -&gt; ['abc','acb','bac','bca','cab','cba']</span></code></pre>
<h3 id="articleHeader69">Capitalize first letter of every word (所有单词的第一个字母大写)</h3>
<p>使用 <code>replace()</code> 去查找单词的第一个字母并使用 <code>toUpperCase()</code> 改为大写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> capitalizeEveryWord = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str.replace(<span class="hljs-regexp">/\b[a-z]/g</span>, char =&gt; char.toUpperCase());
<span class="hljs-comment">// capitalizeEveryWord('hello world!') -&gt; 'Hello World!'</span></code></pre>
<h3 id="articleHeader70">Capitalize first letter (单词的第一个字母大写)</h3>
<p>使用 <code>slice(0,1)</code> 和 <code>toUpperCase()</code> 将首字母大写，使用 <code>slice(1)</code> 得到字符串的其余部分。<br>忽略 <code>lowerRest</code> 参数以保持字符串的其余部分不变，或者将其设置为 <code>true</code> 以转换为小写字母。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// capitalize('myName', true) -> 'Myname'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> capitalize = <span class="hljs-function">(<span class="hljs-params">str, lowerRest = <span class="hljs-literal">false</span></span>) =&gt;</span>
  str.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase() + (lowerRest ? str.slice(<span class="hljs-number">1</span>).toLowerCase() : str.slice(<span class="hljs-number">1</span>));
<span class="hljs-comment">// capitalize('myName', true) -&gt; 'Myname'</span></code></pre>
<h3 id="articleHeader71">Check for palindrome (检查回文)</h3>
<p>使用 <code>toLowerCase()</code> 转换字符串并用 <code>replace()</code> 删除其中的非字母数字字符。<br>然后，使用 <code>split('')</code> 分散为单个字符，再使用 <code>reverse()</code> 和 <code>join('')</code> 倒序合并后与原字符进行比较。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g,'');
  return s === s.split('').reverse().join('');
}
// palindrome('taco cat') -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> palindrome = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> s = str.toLowerCase().replace(<span class="hljs-regexp">/[\W_]/g</span>,<span class="hljs-string">''</span>);
  <span class="hljs-keyword">return</span> s === s.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>);
}
<span class="hljs-comment">// palindrome('taco cat') -&gt; true</span></code></pre>
<h3 id="articleHeader72">Reverse a string (反转一个字符串)</h3>
<p>使用数组解构和 <code>Array.reverse()</code> 来反转字符串中字符的顺序。<br>使用 <code>join('')</code> 组合字符获得一个字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> reverseString = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> [...str].reverse().join(<span class="hljs-string">''</span>);
<span class="hljs-comment">// reverseString('foobar') -&gt; 'raboof'</span></code></pre>
<h3 id="articleHeader73">Sort characters in string (alphabetical) 字符串排序（按字母顺序排列）</h3>
<p>使用 <code>split('')</code> 切割字符串，使用 <code>Array.sort</code> 通过 <code>localeCompare()</code> 去排序，再使用 <code>join('')</code> 组合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sortCharactersInString = str =>
  str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sortCharactersInString = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span>
  str.split(<span class="hljs-string">''</span>).sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.localeCompare(b)).join(<span class="hljs-string">''</span>);
<span class="hljs-comment">// sortCharactersInString('cabbage') -&gt; 'aabbceg'</span></code></pre>
<h3 id="articleHeader74">Truncate a String (字符串截断)</h3>
<p>确定字符串的长度是否大于 <code>num</code>。<br>将字符串截断为所需的长度，在末尾或原始字符串后附加 <code>...</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const truncate = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
// truncate('boomerang', 7) -> 'boom...'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> truncate = <span class="hljs-function">(<span class="hljs-params">str, num</span>) =&gt;</span>
  str.length &gt; num ? str.slice(<span class="hljs-number">0</span>, num &gt; <span class="hljs-number">3</span> ? num - <span class="hljs-number">3</span> : num) + <span class="hljs-string">'...'</span> : str;
<span class="hljs-comment">// truncate('boomerang', 7) -&gt; 'boom...'</span></code></pre>
<h2 id="articleHeader75">Utility (效率工具)</h2>
<h3 id="articleHeader76">Escape regular expression (转义正则表达式)</h3>
<p>使用 <code>replace()</code> 去转义特殊字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&amp;');
// escapeRegExp('(test)') -> \\(test\\)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> escapeRegExp = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str.replace(<span class="hljs-regexp">/[.*+?^${}()|[\]\\]/g</span>, <span class="hljs-string">'\\$&amp;'</span>);
<span class="hljs-comment">// escapeRegExp('(test)') -&gt; \\(test\\)</span></code></pre>
<h3 id="articleHeader77">Get native type of value (获取值的原始类型)</h3>
<p>返回值的构造函数名称的小写字符，值为 <code>undefined</code> 或 <code>null</code> 时则返回 <code>undefined</code> 或 <code>null</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
// getType(new Set([1,2,3])) -> &quot;set&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getType = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span>
  v === <span class="hljs-literal">undefined</span> ? <span class="hljs-string">'undefined'</span> : v === <span class="hljs-literal">null</span> ? <span class="hljs-string">'null'</span> : v.constructor.name.toLowerCase();
<span class="hljs-comment">// getType(new Set([1,2,3])) -&gt; "set"</span></code></pre>
<h3 id="articleHeader78">Is array (是否是数组)</h3>
<p>使用 <code>Array.isArray()</code> 去检查值是否为数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isArray = val => !!val &amp;&amp; Array.isArray(val);
// isArray(null) -> false
// isArray([1]) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isArray = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> !!val &amp;&amp; <span class="hljs-built_in">Array</span>.isArray(val);
<span class="hljs-comment">// isArray(null) -&gt; false</span>
<span class="hljs-comment">// isArray([1]) -&gt; true</span></code></pre>
<h3 id="articleHeader79">Is boolean (是否为布尔值)</h3>
<p>使用 <code>typeof</code> 去检查值是否为原始布尔值类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isBoolean = val => typeof val === 'boolean';
// isBoolean(null) -> false
// isBoolean(false) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isBoolean = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'boolean'</span>;
<span class="hljs-comment">// isBoolean(null) -&gt; false</span>
<span class="hljs-comment">// isBoolean(false) -&gt; true</span></code></pre>
<h3 id="articleHeader80">Is function (是否为函数)</h3>
<p>使用 <code>typeof</code> 去检查值是否为函数原始类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isFunction = val => val &amp;&amp; typeof val === 'function';
// isFunction('x') -> false
// isFunction(x => x) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isFunction = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> val &amp;&amp; <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span>;
<span class="hljs-comment">// isFunction('x') -&gt; false</span>
<span class="hljs-comment">// isFunction(x =&gt; x) -&gt; true</span></code></pre>
<h3 id="articleHeader81">Is number (是否为数值)</h3>
<p>使用 <code>typeof</code> 去检查值是否为数值原始类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isNumber = val => typeof val === 'number';
// isNumber('1') -> false
// isNumber(1) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isNumber = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'number'</span>;
<span class="hljs-comment">// isNumber('1') -&gt; false</span>
<span class="hljs-comment">// isNumber(1) -&gt; true</span></code></pre>
<h3 id="articleHeader82">Is string (是否为字符串)</h3>
<p>使用 <code>typeof</code> 去检查值是否为字符串原始类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isString = val => typeof val === 'string';
// isString(10) -> false
// isString('10') -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isString = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'string'</span>;
<span class="hljs-comment">// isString(10) -&gt; false</span>
<span class="hljs-comment">// isString('10') -&gt; true</span></code></pre>
<h3 id="articleHeader83">Is symbol (是否为 symbol 类型)</h3>
<p>使用 <code>typeof</code> 去检查值是否为 symbol 原始类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isSymbol = val => typeof val === 'symbol';
// isSymbol('x') -> false
// isSymbol(Symbol('x')) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isSymbol = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'symbol'</span>;
<span class="hljs-comment">// isSymbol('x') -&gt; false</span>
<span class="hljs-comment">// isSymbol(Symbol('x')) -&gt; true</span></code></pre>
<h3 id="articleHeader84">Measure time taken by function (测量函数的耗时)</h3>
<p>使用 <code>console.time()</code> 和 <code>console.timeEnd()</code> 来测量开始和结束时间之间的差异，以确定回调执行的时间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};
// timeTaken(() => Math.pow(2, 10)) -> 1024
// (logged): timeTaken: 0.02099609375ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> timeTaken = <span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'timeTaken'</span>);
  <span class="hljs-keyword">const</span> r = callback();
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'timeTaken'</span>);
  <span class="hljs-keyword">return</span> r;
};
<span class="hljs-comment">// timeTaken(() =&gt; Math.pow(2, 10)) -&gt; 1024</span>
<span class="hljs-comment">// (logged): timeTaken: 0.02099609375ms</span></code></pre>
<h3 id="articleHeader85">Number to array of digits (数值转换为数组)</h3>
<p>将数值转换为字符串，使用 <code>split()</code> 分割为数组。<br>再使用 <code>Array.map()</code> 和 <code>parseInt()</code> 将每个值转换为整数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const digitize = n => (''+n).split('').map(i => parseInt(i));
// digitize(2334) -> [2, 3, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> digitize = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> (<span class="hljs-string">''</span>+n).split(<span class="hljs-string">''</span>).map(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> <span class="hljs-built_in">parseInt</span>(i));
<span class="hljs-comment">// digitize(2334) -&gt; [2, 3, 3, 4]</span></code></pre>
<h3 id="articleHeader86">Ordinal suffix of number （数值增加序号后缀）</h3>
<p>Use the modulo operator (<code>%</code>) to find values of single and tens digits.<br>Find which ordinal pattern digits match.<br>If digit is found in teens pattern, use teens ordinal.</p>
<p>使用模运算符（<code>％</code>）来查找单位数和十位数的值。<br>查找数字匹配哪些序号模式。<br>如果数字在十几的模式中找到，请使用的十几的序数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const toOrdinalSuffix = num => {
  const int = parseInt(num), digits = [(int % 10), (int % 100)],
    ordinals = ['st', 'nd', 'rd', 'th'], oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) &amp;&amp; !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
};
// toOrdinalSuffix(&quot;123&quot;) -> &quot;123rd&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> toOrdinalSuffix = <span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> int = <span class="hljs-built_in">parseInt</span>(num), digits = [(int % <span class="hljs-number">10</span>), (int % <span class="hljs-number">100</span>)],
    ordinals = [<span class="hljs-string">'st'</span>, <span class="hljs-string">'nd'</span>, <span class="hljs-string">'rd'</span>, <span class="hljs-string">'th'</span>], oPattern = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>],
    tPattern = [<span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>];
  <span class="hljs-keyword">return</span> oPattern.includes(digits[<span class="hljs-number">0</span>]) &amp;&amp; !tPattern.includes(digits[<span class="hljs-number">1</span>]) ? int + ordinals[digits[<span class="hljs-number">0</span>] - <span class="hljs-number">1</span>] : int + ordinals[<span class="hljs-number">3</span>];
};
<span class="hljs-comment">// toOrdinalSuffix("123") -&gt; "123rd"</span></code></pre>
<h3 id="articleHeader87">Random integer in range (指定范围内的随机整数)</h3>
<p>使用 <code>Math.random()</code> 去生成一个在指定范围内的随机数，使用 <code>Math.floor()</code> 将其转换为整数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> randomIntegerInRange = <span class="hljs-function">(<span class="hljs-params">min, max</span>) =&gt;</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (max - min + <span class="hljs-number">1</span>)) + min;
<span class="hljs-comment">// randomIntegerInRange(0, 5) -&gt; 2</span></code></pre>
<h3 id="articleHeader88">Random number in range (指定范围内的随机数)</h3>
<p>使用 <code>Math.random()</code> 去生成一个在指定范围内的随机数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> randomInRange = <span class="hljs-function">(<span class="hljs-params">min, max</span>) =&gt;</span> <span class="hljs-built_in">Math</span>.random() * (max - min) + min;
<span class="hljs-comment">// randomInRange(2,10) -&gt; 6.0211363285087005</span></code></pre>
<h3 id="articleHeader89">RGB to hexadecimal (RGB转十六进制)</h3>
<p>使用按位左移运算符（<code>&lt;&lt;</code>）和 <code>toString(16)</code> 将 RGB 参数转换为十六进制，然后使用 <code>padStart(6, '0')</code> 去获取6位数的十六进制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rgbToHex = <span class="hljs-function">(<span class="hljs-params">r, g, b</span>) =&gt;</span> ((r &lt;&lt; <span class="hljs-number">16</span>) + (g &lt;&lt; <span class="hljs-number">8</span>) + b).toString(<span class="hljs-number">16</span>).padStart(<span class="hljs-number">6</span>, <span class="hljs-string">'0'</span>);
<span class="hljs-comment">// rgbToHex(255, 165, 1) -&gt; 'ffa501'</span></code></pre>
<h3 id="articleHeader90">Swap values of two variables (交换两个变量的值)</h3>
<p>使用数组解构来交换两个变量之间的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[varA, varB] = [varB, varA];
// [x, y] = [y, x]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[varA, varB] = [varB, varA];
<span class="hljs-comment">// [x, y] = [y, x]</span></code></pre>
<h3 id="articleHeader91">URL parameters （URL参数）</h3>
<p>使用 <code>match()</code> 和一个合适的正则去获取所有键值对，使用 <code>Array.reduce()</code> 合并到一个对象中。<br>允许将 <code>location.search</code> 作为参数传递。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getUrlParameters = url =>
  url.match(/([^?=&amp;]+)(=([^&amp;]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
// getUrlParameters('http://url.com/page?name=Adam&amp;surname=Smith') -> {name: 'Adam', surname: 'Smith'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getUrlParameters = <span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span>
  url.match(<span class="hljs-regexp">/([^?=&amp;]+)(=([^&amp;]*))/g</span>).reduce(
    <span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> (a[v.slice(<span class="hljs-number">0</span>, v.indexOf(<span class="hljs-string">'='</span>))] = v.slice(v.indexOf(<span class="hljs-string">'='</span>) + <span class="hljs-number">1</span>), a), {}
  );
<span class="hljs-comment">// getUrlParameters('http://url.com/page?name=Adam&amp;surname=Smith') -&gt; {name: 'Adam', surname: 'Smith'}</span></code></pre>
<h3 id="articleHeader92">UUID generator （UUID生成器）</h3>
<p>使用 <code>crypto</code> API 生成符合 <a href="https://www.ietf.org/rfc/rfc4122.txt" rel="nofollow noreferrer" target="_blank">RFC4122</a> 版本4的UUID。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const uuid = _ =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] &amp; 15 >> c / 4).toString(16)
  );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> uuid = <span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span>
  ([<span class="hljs-number">1e7</span>] + <span class="hljs-number">-1e3</span> + <span class="hljs-number">-4e3</span> + <span class="hljs-number">-8e3</span> + <span class="hljs-number">-1e11</span>).replace(<span class="hljs-regexp">/[018]/g</span>, c =&gt;
    (c ^ crypto.getRandomValues(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(<span class="hljs-number">1</span>))[<span class="hljs-number">0</span>] &amp; <span class="hljs-number">15</span> &gt;&gt; c / <span class="hljs-number">4</span>).toString(<span class="hljs-number">16</span>)
  );
<span class="hljs-comment">// uuid() -&gt; '7982fcfe-5721-4632-bede-6000885be57d'</span></code></pre>
<h3 id="articleHeader93">Validate email （校验邮箱）</h3>
<p>Use a regular experssion to check if the email is valid.<br>Returns <code>true</code> if email is valid, <code>false</code> if not.</p>
<p>使用正则表达式去检验邮箱格式。<br>返回 <code>true</code> 表示邮箱格式正确，<code>false</code> 则不正确。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const validateEmail = str =>
  /^(([^<>()\[\]\\.,;:\s@&quot;]+(\.[^<>()\[\]\\.,;:\s@&quot;]+)*)|(&quot;.+&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
// validateEmail(mymail@gmail.com) -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> validateEmail = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span>
  /^(([^<span class="xml"><span class="hljs-tag">&lt;&gt;</span>()\[\]\\.,;:\s@"]+(\.[^<span class="hljs-tag">&lt;&gt;</span>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
// validateEmail(mymail@gmail.com) -&gt; true</span></code></pre>
<h3 id="articleHeader94">Validate number （校验数值）</h3>
<p>使用 <code>!isNaN</code> 和 <code>parseFloat()</code> 来检查参数是否是一个数字（或允许转换为数值）。<br>使用 <code>isFinite()</code> 来检查数字是否是有限的。<br>使用 Number() 来检查数值转换是否成立。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const validateNumber = n => !isNaN(parseFloat(n)) &amp;&amp; isFinite(n) &amp;&amp; Number(n) == n;
// validateNumber('10') -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> validateNumber = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> !<span class="hljs-built_in">isNaN</span>(<span class="hljs-built_in">parseFloat</span>(n)) &amp;&amp; <span class="hljs-built_in">isFinite</span>(n) &amp;&amp; <span class="hljs-built_in">Number</span>(n) == n;
<span class="hljs-comment">// validateNumber('10') -&gt; true</span></code></pre>
<h3 id="articleHeader95">Value or default （值或默认值）</h3>
<p>默认返回 <code>value</code> 如果 <code>value</code> 为假，则返回默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const valueOrDefault = (value, d) => value || d;
// valueOrDefault(NaN, 30) -> 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> valueOrDefault = <span class="hljs-function">(<span class="hljs-params">value, d</span>) =&gt;</span> value || d;
<span class="hljs-comment">// valueOrDefault(NaN, 30) -&gt; 30</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
30s js代码片段 翻译

## 原文链接
[https://segmentfault.com/a/1190000012800677](https://segmentfault.com/a/1190000012800677)


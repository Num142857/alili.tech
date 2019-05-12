---
title: '快速获取json键值对的key名和快速根据value分组' 
date: 2018-12-15 2:30:11
hidden: true
slug: 417vgg93ot4
categories: [reprint]
---

{{< raw >}}

                    
<p>最近项目中后台给返回的数据很复杂，需要各种遍历，组合，其中Object.keys(obj)和通过封装的groupBy这两个方法带给了我极大的便利</p>
<h2 id="articleHeader0">Object.keys(obj)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Array 对象 */ 
let arr = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
console.log(Object.keys(arr)); 
// ['0', '1', '2']

/* Object 对象 */ 
let obj = { foo: &quot;bar&quot;, baz: 42 }, 
console.log(Object.keys(obj));

// [&quot;foo&quot;,&quot;baz&quot;]

/* 类数组 对象 */ 
let obj = { 0 : &quot;a&quot;, 1 : &quot;b&quot;, 2 : &quot;c&quot;};
console.log(Object.keys(obj)); 
// ['0', '1', '2']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* Array 对象 */</span> 
<span class="hljs-keyword">let</span> arr = [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(arr)); 
<span class="hljs-comment">// ['0', '1', '2']</span>

<span class="hljs-comment">/* Object 对象 */</span> 
<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"bar"</span>, <span class="hljs-attr">baz</span>: <span class="hljs-number">42</span> }, 
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(obj));

<span class="hljs-comment">// ["foo","baz"]</span>

<span class="hljs-comment">/* 类数组 对象 */</span> 
<span class="hljs-keyword">let</span> obj = { <span class="hljs-number">0</span> : <span class="hljs-string">"a"</span>, <span class="hljs-number">1</span> : <span class="hljs-string">"b"</span>, <span class="hljs-number">2</span> : <span class="hljs-string">"c"</span>};
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(obj)); 
<span class="hljs-comment">// ['0', '1', '2']</span></code></pre>
<h2 id="articleHeader1">groupBy方法以及用到的reduce详解</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    var val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}

var myList = [
  {time: '12:00', location: 'mall'    },
  {time: '9:00',  location: 'store'   },
  {time: '9:00',  location: 'mall'    },
  {time: '12:00', location: 'store'   },
  {time: '12:00', location: 'market'  },
];

var byTime = myList.groupBy('time');

byTime = {
    '9:00': [
      {time: '9:00',  location: 'store' },
      {time: '9:00',  location: 'mall'  },
    ],
    '12:00': [
      {time: '12:00', location: 'mall'  },
      {time: '12:00', location: 'store' },
      {time: '12:00', location: 'market'}
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>Array.prototype.groupBy = function(prop) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.reduce(function(groups, item) {
    var val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    <span class="hljs-keyword">return</span> groups;
  }, {});
}

var myList = [
  {<span class="hljs-string">time:</span> <span class="hljs-string">'12:00'</span>, <span class="hljs-string">location:</span> <span class="hljs-string">'mall'</span>    },
  {<span class="hljs-string">time:</span> <span class="hljs-string">'9:00'</span>,  <span class="hljs-string">location:</span> <span class="hljs-string">'store'</span>   },
  {<span class="hljs-string">time:</span> <span class="hljs-string">'9:00'</span>,  <span class="hljs-string">location:</span> <span class="hljs-string">'mall'</span>    },
  {<span class="hljs-string">time:</span> <span class="hljs-string">'12:00'</span>, <span class="hljs-string">location:</span> <span class="hljs-string">'store'</span>   },
  {<span class="hljs-string">time:</span> <span class="hljs-string">'12:00'</span>, <span class="hljs-string">location:</span> <span class="hljs-string">'market'</span>  },
];

var byTime = myList.groupBy(<span class="hljs-string">'time'</span>);

byTime = {
    <span class="hljs-string">'9:00'</span>: [
      {<span class="hljs-string">time:</span> <span class="hljs-string">'9:00'</span>,  <span class="hljs-string">location:</span> <span class="hljs-string">'store'</span> },
      {<span class="hljs-string">time:</span> <span class="hljs-string">'9:00'</span>,  <span class="hljs-string">location:</span> <span class="hljs-string">'mall'</span>  },
    ],
    <span class="hljs-string">'12:00'</span>: [
      {<span class="hljs-string">time:</span> <span class="hljs-string">'12:00'</span>, <span class="hljs-string">location:</span> <span class="hljs-string">'mall'</span>  },
      {<span class="hljs-string">time:</span> <span class="hljs-string">'12:00'</span>, <span class="hljs-string">location:</span> <span class="hljs-string">'store'</span> },
      {<span class="hljs-string">time:</span> <span class="hljs-string">'12:00'</span>, <span class="hljs-string">location:</span> <span class="hljs-string">'market'</span>}
    ]
}</code></pre>
<h3 id="articleHeader2">reduce</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var total = [0, 1, 2, 3].reduce(function(sum, value) {
  return sum + value;
}, 0);
// total is 6

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var total = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].reduce(function(sum, value) {
  return sum + value;
}, <span class="hljs-number">0</span>);
<span class="hljs-comment">// total is 6</span>

var flattened = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(function(a, b) {
  return a.concat(b);
}, []);
<span class="hljs-comment">// flattened is [0, 1, 2, 3, 4, 5]</span></code></pre>
<h3 id="articleHeader3">参数</h3>
<p>callback<br>执行数组中每个值的函数，包含四个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="accumulator
累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。

currentValue
数组中正在处理的元素。

currentIndex
数组中正在处理的当前元素的索引。如果提供了initialValue，则索引号为0，否则为索引为1。

array
调用reduce的数组
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>accumulator
累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。

currentValue
数组中正在处理的元素。

currentIndex
数组中正在处理的当前元素的索引。如果提供了initialValue，则索引号为0，否则为索引为1。
<span class="hljs-built_in">
array
</span>调用reduce的数组
</code></pre>
<p>initialValue<br>[可选] 用作第一个调用 callback的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    var val = item[prop];    // 取出time 例如 9：00
    groups[val] = groups[val] || [];  // 每一次取出groups中的9：00对象，如果存在（覆盖一次），如果是12：00对象则赋值新数组
    groups[val].push(item);
    return groups;
  }, {});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.groupBy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prop</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">groups, item</span>) </span>{
    <span class="hljs-keyword">var</span> val = item[prop];    <span class="hljs-comment">// 取出time 例如 9：00</span>
    groups[val] = groups[val] || [];  <span class="hljs-comment">// 每一次取出groups中的9：00对象，如果存在（覆盖一次），如果是12：00对象则赋值新数组</span>
    groups[val].push(item);
    <span class="hljs-keyword">return</span> groups;
  }, {});
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速获取json键值对的key名和快速根据value分组

## 原文链接
[https://segmentfault.com/a/1190000013084751](https://segmentfault.com/a/1190000013084751)


---
title: 'javascript数组的几个常用姿势' 
date: 2018-12-16 2:30:10
hidden: true
slug: byjqaynyr9h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文将分享几个在项目中常用的数组方法~</p>
<p>原文地址: <a href="https://github.com/webfansplz/blog/issues/4" rel="nofollow noreferrer" target="_blank">https://github.com/webfansplz...</a></p>
<p>不定期有干货更新哦,欢迎watch,star!</p>
<h2 id="articleHeader1">1.数组排序</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const sortAry = [1, 5, 4, 3, 2, 6, 7];

  1.按数组元素大小从小到大进行排序

  sortAry.sort((a, b) => a - b); //[1, 2, 3, 4, 5, 6, 7]

  2.按数组元素大小从大到小进行排序

  sortAry.sort((a, b) => b - a); //[7, 6, 5, 4, 3, 2, 1]

  const sortId = [
    { id: 3, name: &quot;c&quot; },
    { id: 1, name: &quot;a&quot; },
    { id: 2, name: &quot;b&quot; }
  ];

  3. 按数组元素的id从小到大进行排序

  sortId.sort((a, b) => a.id - b.id);

  //[{ id: 1, name: &quot;a&quot;},{id: 2, name: &quot;b&quot;},{id: 3, name: &quot;c&quot;}]

  4.按数组元素的id从大到小进行排序

  sortId.sort((a, b) => b.id - a.id); 
  
  //[{ id: 3, name: &quot;c&quot; },{ id: 2, name: &quot;b&quot; },{ id: 1, name: &quot;a&quot; }]
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  const sortAry = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];

  <span class="hljs-number">1.</span>按数组元素大小从小到大进行排序

  sortAry.sort(<span class="hljs-function"><span class="hljs-params">(a, b)</span> =&gt;</span> a - b); <span class="hljs-regexp">//</span>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>]

  <span class="hljs-number">2.</span>按数组元素大小从大到小进行排序

  sortAry.sort(<span class="hljs-function"><span class="hljs-params">(a, b)</span> =&gt;</span> b - a); <span class="hljs-regexp">//</span>[<span class="hljs-number">7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>]

  const sortId = [
    { id: <span class="hljs-number">3</span>, name: <span class="hljs-string">"c"</span> },
    { id: <span class="hljs-number">1</span>, name: <span class="hljs-string">"a"</span> },
    { id: <span class="hljs-number">2</span>, name: <span class="hljs-string">"b"</span> }
  ];

  <span class="hljs-number">3.</span> 按数组元素的id从小到大进行排序

  sortId.sort(<span class="hljs-function"><span class="hljs-params">(a, b)</span> =&gt;</span> a.id - b.id);

  <span class="hljs-regexp">//</span>[{ id: <span class="hljs-number">1</span>, name: <span class="hljs-string">"a"</span>},{id: <span class="hljs-number">2</span>, name: <span class="hljs-string">"b"</span>},{id: <span class="hljs-number">3</span>, name: <span class="hljs-string">"c"</span>}]

  <span class="hljs-number">4.</span>按数组元素的id从大到小进行排序

  sortId.sort(<span class="hljs-function"><span class="hljs-params">(a, b)</span> =&gt;</span> b.id - a.id); 
  
  <span class="hljs-regexp">//</span>[{ id: <span class="hljs-number">3</span>, name: <span class="hljs-string">"c"</span> },{ id: <span class="hljs-number">2</span>, name: <span class="hljs-string">"b"</span> },{ id: <span class="hljs-number">1</span>, name: <span class="hljs-string">"a"</span> }]
};
</code></pre>
<h2 id="articleHeader2">2.数组去重</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const uniqAry = ary => Array.from(new Set(ary));

  const uniqAry2 = ary => ary.filter((v, k) => ary.indexOf(v) == k);

  const ary = [1, 2, 1, 2, 3, 4, 3];

  uniqAry(ary)   //[1,2,3,4]

  uniqAry2(ary)  //[1,2,3,4]
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">const</span> uniqAry = <span class="hljs-function"><span class="hljs-params">ary</span> =&gt;</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(ary));

  <span class="hljs-keyword">const</span> uniqAry2 = <span class="hljs-function"><span class="hljs-params">ary</span> =&gt;</span> ary.filter(<span class="hljs-function">(<span class="hljs-params">v, k</span>) =&gt;</span> ary.indexOf(v) == k);

  <span class="hljs-keyword">const</span> ary = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>];

  uniqAry(ary)   <span class="hljs-comment">//[1,2,3,4]</span>

  uniqAry2(ary)  <span class="hljs-comment">//[1,2,3,4]</span>
  
</code></pre>
<h2 id="articleHeader3">3.数组深拷贝</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const copyAry = [1, 2, 3, 4];
 
 const ary = [].slice.apply(copyAry);

 ary.push(5);

 console.log(ary);     //[1, 2, 3, 4, 5]

 console.log(copyAry); //[1, 2, 3, 4]

 const ary2 = JSON.parse(JSON.stringify(copyAry));

 ary2.push(5);

 console.log(ary2);   //[1, 2, 3, 4, 5]

 console.log(copyAry); //[1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">const</span> copyAry = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
 
 <span class="hljs-keyword">const</span> ary = [].slice.apply(copyAry);

 ary.push(<span class="hljs-number">5</span>);

 <span class="hljs-built_in">console</span>.log(ary);     <span class="hljs-comment">//[1, 2, 3, 4, 5]</span>

 <span class="hljs-built_in">console</span>.log(copyAry); <span class="hljs-comment">//[1, 2, 3, 4]</span>

 <span class="hljs-keyword">const</span> ary2 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(copyAry));

 ary2.push(<span class="hljs-number">5</span>);

 <span class="hljs-built_in">console</span>.log(ary2);   <span class="hljs-comment">//[1, 2, 3, 4, 5]</span>

 <span class="hljs-built_in">console</span>.log(copyAry); <span class="hljs-comment">//[1, 2, 3, 4]</span></code></pre>
<h2 id="articleHeader4">4.数组等份分割</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ary = [1, 2, 3, 4, 5, 6, 7];

const splitAry = (ary, size) => {
  let i = Math.ceil(ary.length / size),
    count = 0,
    box = [];
  while (count < i) {
    let s = count * size;
    box.push(ary.slice(s, s + size));
    count++;
  }
  return box;
};

console.log(splitAry(ary, 3)); //[[1,2,3],[4,5,6],[7]]

console.log(splitAry(ary,2)); // [[1,2],[3,4],[5,6],[7]]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> ary = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];

<span class="hljs-keyword">const</span> splitAry = (ary, <span class="hljs-built_in">size</span>) =&gt; {
  let i = Math.<span class="hljs-built_in">ceil</span>(ary.length / <span class="hljs-built_in">size</span>),
    count = <span class="hljs-number">0</span>,
    <span class="hljs-built_in">box</span> = [];
  <span class="hljs-keyword">while</span> (count &lt; i) {
    let s = count * <span class="hljs-built_in">size</span>;
    <span class="hljs-built_in">box</span>.push(ary.slice(s, s + <span class="hljs-built_in">size</span>));
    count++;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">box</span>;
};

console.<span class="hljs-built_in">log</span>(splitAry(ary, <span class="hljs-number">3</span>)); <span class="hljs-comment">//[[1,2,3],[4,5,6],[7]]</span>

console.<span class="hljs-built_in">log</span>(splitAry(ary,<span class="hljs-number">2</span>)); <span class="hljs-comment">// [[1,2],[3,4],[5,6],[7]]</span>
</code></pre>
<h2 id="articleHeader5">5.数组扁平化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//二维数组扁平化

const ary = [[1, 2], [3, 4], [5, 6]];

const flatten = ary => ary.reduce((a, b) => [...a, ...b]);

console.log(flatten(ary)); //[1, 2, 3, 4, 5, 6]

//多维数组扁平化

const ary2 = [[1, [2, 3]], [4, [5, [6, 7]]]];

const flattenS = ary =>
  ary.reduce((a, b) => a.concat(Array.isArray(b) ? flattenS(b) : b), []);

console.log(flattenS(ary2)); //[1, 2, 3, 4, 5, 6, 7]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//二维数组扁平化</span>

<span class="hljs-keyword">const</span> ary = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>], [<span class="hljs-number">5</span>, <span class="hljs-number">6</span>]];

<span class="hljs-keyword">const</span> flatten = <span class="hljs-function"><span class="hljs-params">ary</span> =&gt;</span> ary.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> [...a, ...b]);

<span class="hljs-built_in">console</span>.log(flatten(ary)); <span class="hljs-comment">//[1, 2, 3, 4, 5, 6]</span>

<span class="hljs-comment">//多维数组扁平化</span>

<span class="hljs-keyword">const</span> ary2 = [[<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]], [<span class="hljs-number">4</span>, [<span class="hljs-number">5</span>, [<span class="hljs-number">6</span>, <span class="hljs-number">7</span>]]]];

<span class="hljs-keyword">const</span> flattenS = <span class="hljs-function"><span class="hljs-params">ary</span> =&gt;</span>
  ary.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.concat(<span class="hljs-built_in">Array</span>.isArray(b) ? flattenS(b) : b), []);

<span class="hljs-built_in">console</span>.log(flattenS(ary2)); <span class="hljs-comment">//[1, 2, 3, 4, 5, 6, 7]</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript数组的几个常用姿势

## 原文链接
[https://segmentfault.com/a/1190000012922728](https://segmentfault.com/a/1190000012922728)


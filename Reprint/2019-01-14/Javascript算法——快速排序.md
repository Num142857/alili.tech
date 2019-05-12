---
title: 'Javascript算法——快速排序' 
date: 2019-01-14 2:30:07
hidden: true
slug: q6x9ubu3jf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>常见的内部排序算法有：插入排序、<a href="https://segmentfault.com/a/1190000009461832">希尔排序</a>、<a href="https://segmentfault.com/a/1190000009366805" target="_blank">选择排序</a>、冒泡排序、<a href="https://segmentfault.com/a/1190000008866524">归并排序</a>、快速排序、堆排序、基数排序等。这里主要介绍<code>快速排序</code>。</blockquote>
<p>一图胜千言：</p>
<p><span class="img-wrap"><img data-src="/img/bVNIpc?w=554&amp;h=337" src="https://static.alili.tech/img/bVNIpc?w=554&amp;h=337" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1. 算法介绍</h3>
<h4>1.1 算法描述</h4>
<p>快速排序由于排序效率在同为O(N*logN)的几种排序方法中效率较高，因此经常被采用，再加上快速排序思想----分治法也确实实用。快速排序是一种既不浪费空间又可以快一点的排序算法。</p>
<h4>1.2 算法步骤</h4>
<ul>
<li>先从数列中取出一个数作为“基准”。</li>
<li>分区过程：将比这个“基准”大的数全放到“基准”的右边，小于或等于“基准”的数全放到“基准”的左边。</li>
<li>再对左右区间重复第二步，直到各区间只有一个数。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNImv?w=280&amp;h=214" src="https://static.alili.tech/img/bVNImv?w=280&amp;h=214" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>1.3 算法实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var quickSort = function(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
    var pivot = arr.splice(pivotIndex, 1)[0];  //基准数
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">var</span> <span class="hljs-built_in">quickSort</span> = function(arr) {
    <span class="hljs-keyword">if</span> (arr.length &lt;= <span class="hljs-number">1</span>) { <span class="hljs-keyword">return</span> arr; }
    <span class="hljs-keyword">var</span> pivotIndex = <span class="hljs-type">Math</span>.floor(arr.length / <span class="hljs-number">2</span>);   <span class="hljs-comment">//基准位置（理论上可任意选取）</span>
    <span class="hljs-keyword">var</span> pivot = arr.splice(pivotIndex, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];  <span class="hljs-comment">//基准数</span>
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">left</span> = [];
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">right</span> = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
        <span class="hljs-keyword">if</span> (arr[i] &lt; pivot) {
            <span class="hljs-keyword">left</span>.push(arr[i]);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">right</span>.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">left</span>).concat([pivot], <span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">right</span>));  <span class="hljs-comment">//链接左数组、基准数构成的数组、右数组</span>
};
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript算法——快速排序

## 原文链接
[https://segmentfault.com/a/1190000009426421](https://segmentfault.com/a/1190000009426421)


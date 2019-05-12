---
title: 'Javascript算法——希尔排序' 
date: 2019-01-14 2:30:07
hidden: true
slug: g1rximw304f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>常见的内部排序算法有：插入排序、希尔排序、<a href="https://segmentfault.com/a/1190000009366805">选择排序</a>、冒泡排序、<a href="https://segmentfault.com/a/1190000008866524" target="_blank">归并排序</a>、<a href="https://segmentfault.com/a/1190000009426421">快速排序</a>、堆排序、基数排序等。这里主要介绍<code>希尔排序</code>。</blockquote>
<p>一图胜千言：</p>
<p><span class="img-wrap"><img data-src="/img/bVNIpc?w=554&amp;h=337" src="https://static.alili.tech/img/bVNIpc?w=554&amp;h=337" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1. 算法介绍</h3>
<h4>1.1 算法描述</h4>
<p>希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。<br>希尔排序是基于插入排序的以下两点性质而提出改进方法的：</p>
<ul>
<li>插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；</li>
<li>但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；</li>
</ul>
<p>希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录<code>基本有序</code>时，再对全体记录进行依次直接插入排序。</p>
<p><span class="img-wrap"><img data-src="/img/bVNRxY?w=542&amp;h=383" src="https://static.alili.tech/img/bVNRxY?w=542&amp;h=383" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>1.2 算法步骤</h4>
<ul>
<li>选择一个增量序列 t1，t2，……，tk，其中 ti &gt; tj, tk = 1；</li>
<li>按增量序列个数 k，对序列进行 k 趟排序；</li>
<li>每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。</li>
</ul>
<h4>1.3 算法实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap = gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 &amp;&amp; arr[j] > temp; j -= gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shellSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> len = arr.length,
        temp,
        gap = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">while</span>(gap &lt; len/<span class="hljs-number">3</span>) {          <span class="hljs-comment">//动态定义间隔序列</span>
        gap = gap*<span class="hljs-number">3</span>+<span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">for</span> (gap; gap &gt; <span class="hljs-number">0</span>; gap = <span class="hljs-built_in">Math</span>.floor(gap/<span class="hljs-number">3</span>)) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = gap; i &lt; len; i++) {
            temp = arr[i];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i-gap; j &gt;= <span class="hljs-number">0</span> &amp;&amp; arr[j] &gt; temp; j -= gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    <span class="hljs-keyword">return</span> arr;
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript算法——希尔排序

## 原文链接
[https://segmentfault.com/a/1190000009461832](https://segmentfault.com/a/1190000009461832)


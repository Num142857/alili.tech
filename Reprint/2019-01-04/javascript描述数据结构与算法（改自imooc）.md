---
title: 'javascript描述数据结构与算法（改自imooc）' 
date: 2019-01-04 2:30:10
hidden: true
slug: h7cvmncoktm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">javascript描述数据结构与算法</h1>
<h2 id="articleHeader1">起因</h2>
<p>作为一个前端程序员常用的数据结构和算法是要懂得怎么去实现的。一直以来想学算法，买了书却一直看不下去。直到前一个月面试挂在基础算法的问题，就决定每天学一点算法。正好看到<strong>imooc</strong>的算法实战教程，主要是我看算法书很懵逼才找了视频来学习，每3，4天一章，一边看视频一边过一遍书，就这样啃完了。<br>如果你跟我一样看书看不下去，强烈推荐你看视频。视频里是用c++实现的，但是讲师在课程里用各种动画很容易就看懂了。<br>另外，基础算法能引申出来很多高级算法，至于你还想再深入学习，就得靠自己了。</p>
<h2 id="articleHeader2">js实现算法目录</h2>
<p>运行环境：我是用node来运行的，你也可以直接用浏览器。</p>
<table>
<thead><tr>
<th align="left">算法学习目录</th>
<th align="center"> </th>
</tr></thead>
<tbody>
<tr>
<td align="left"><strong>排序基础(3种)</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">选择排序-Selection Sort</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/01-Selection-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">使用模板(泛型)编写算法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/02-Selection-Sort-Using-Template/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">随机生成算法测试用例</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/03-Selection-Sort-Generate-Test-Cases/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">测试算法的性能</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/04-Selection-Sort-Detect-Performance/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">插入排序法-Insertion Sort</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/05-Insertion-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">插入排序法的改进</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/06-Insertion-Sort-Advance/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">冒泡排序法及其优化-Bubble Sort</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/01-Sorting-Basic/07-Bubble-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>高级排序算法(3种)</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">希尔排序法-Shell Sort</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/01-Shell-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">归并排序法的实现与优化</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/02-Merge-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">自底向上的归并排序算法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/03-Merge-Sort-Bottom-Up/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">快速排序法 - Quick Sort</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/04-Quick-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">随机化快速排序法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/05-Quick-Sort-Deal-With-Nearly-Ordered-Array/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">双路快速排序法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/06-Quick-Sort-Deal-With-Identical-Keys/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">三路快速排序法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/07-Quick-Sort-Three-Ways/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">归并排序和快速排序的衍生问题</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/02-Sorting-Advance/08-Derivative-problem/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>堆</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">最大堆</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/03-Heap/01-Max-Heap-Class-Basic/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">堆排序</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/03-Heap/02-Heap-Sort/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">索引堆-优先队列</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/03-Heap/05-Index-Heap/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">最小堆</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/03-Heap/06-Min-Heap/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>树</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">二分查找法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/04-Binary-Search-Tree/01-Binary-Search/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">BST的实现</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/04-Binary-Search-Tree/02-Binary-Search-Tree-Basics/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>并查集</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">Quick Find</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/05-Union-Find/01-Quick-Find/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">Quick Union</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/05-Union-Find/02-Quick-Union/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">基于size的优化</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/05-Union-Find/03-Optimize-by-Size/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">基于rank的优化</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/05-Union-Find/04-Optimize-by-Rank/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">Path Compression</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/05-Union-Find/05-Path-Compression/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>图</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">图的表示(较完整)</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/06-Graph-Basics/01-Graph-Representation/denseGraph.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>最小生成树</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">有权图的表示</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/07-Minimum-Span-Trees/01-Weighted-Graph/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">Lazy Prim</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/07-Minimum-Span-Trees/02-Lazy-Prim/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">Prim算法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/07-Minimum-Span-Trees/03-Prim/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left">Kruskal算法</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/07-Minimum-Span-Trees/04-Kruskal/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
<tr>
<td align="left"><strong>最小生成树</strong></td>
<td align="center"> </td>
</tr>
<tr>
<td align="left">Dijkstra算法的实现</td>
<td align="center"><a href="https://github.com/sinner77/play-with-algorithm/blob/master/08-Shortest-Path/Dijkstra/main.js" rel="nofollow noreferrer" target="_blank">js源码</a></td>
</tr>
</tbody>
</table>
<blockquote>
<p>大家在实现这些算法的时候目录不用分得这么细，我是看完了整套视频才知道的。</p>
<p>算法可能实现的有些生硬或不优雅，然后我就结合&lt;&lt;数据结构与算法JavaScript&gt;&gt;一书给出另外一些实现方法。小弟渣渣水平，还望大佬莫喷呀。</p>
</blockquote>
<p><a href="http://coding.imooc.com/class/71.html" rel="nofollow noreferrer" target="_blank">imooc算法视频地址</a><br><a href="https://github.com/liuyubobobo/Play-with-Algorithms" rel="nofollow noreferrer" target="_blank">讲师给的c++,java版本</a><br><a href="https://github.com/sinner77/play-with-algorithm" rel="nofollow noreferrer" target="_blank">改写后的javascript版本</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript描述数据结构与算法（改自imooc）

## 原文链接
[https://segmentfault.com/a/1190000010681228](https://segmentfault.com/a/1190000010681228)


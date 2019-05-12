---
title: 'javascript数据结构与算法 --- 高级排序算法' 
date: 2018-12-15 2:30:11
hidden: true
slug: ek87hmt9y1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">高级排序算法总结</h1>
<ol>
<li>
<p>希尔排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function shellsort(array, gaps) {
      for (var g = 0; g < gaps.length; g++) {
        for (var i = gaps[g]; i < array.length; i++) {
          var temp = array[i];
          for (var j = i; (j >= gaps[g]) &amp;&amp; (temp < array[j-gaps[g]]);j -= gaps[g]) {
            array[j] = array[j - gaps[g]];
          }
          array[j] = temp;
        }
        console.log(array);
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shellsort</span>(<span class="hljs-params">array, gaps</span>) </span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> g = <span class="hljs-number">0</span>; g &lt; gaps.length; g++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = gaps[g]; i &lt; array.length; i++) {
          <span class="hljs-keyword">var</span> temp = array[i];
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i; (j &gt;= gaps[g]) &amp;&amp; (temp &lt; array[j-gaps[g]]);j -= gaps[g]) {
            array[j] = array[j - gaps[g]];
          }
          array[j] = temp;
        }
        <span class="hljs-built_in">console</span>.log(array);
      }
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="间隔序列 gaps可以动态定义，不过对于大部分的实际应用场景，算法要用到的间隔序列可以提前定义好,有一些公开定义的间隔序列，使用它们会得到不同的结果。例如Marcin Ciura 在2001 的论文“Best Increments for theAverage Case of Shell Sort”中的间隔序列[701, 301, 132, 57, 23, 10, 4, 1],下一节将介绍具有动态间隔序列的希尔排序." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">间隔序列 gaps可以动态定义，不过对于大部分的实际应用场景，算法要用到的间隔序列可以提前定义好,有一些公开定义的间隔序列，使用它们会得到不同的结果。例如Marcin Ciura 在<span class="hljs-number">2001</span> 的论文“Best Increments for theAverage Case of Shell Sort”中的间隔序列[<span class="hljs-number">701</span>, <span class="hljs-number">301</span>, <span class="hljs-number">132</span>, <span class="hljs-number">57</span>, <span class="hljs-number">23</span>, <span class="hljs-number">10</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>],下一节将介绍具有动态间隔序列的希尔排序.</code></pre>
</li>
<li>
<p>动态间隔序列希尔排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function dynOrdShellsort(array) {
      var N = array.length;
      var h = 1;
      while (h < N/3) {h = 3 * h + 1;
      }
      while (h >= 1) {
        for (var i = h; i < N; i++) {
          for (var j = i; j >= h &amp;&amp; array[j] < array[j-h]; j -= h) {
            // swap(array, j, j-h);
            [array[j], array[j-h]] = [array[j-h], array[j]];
          }
        }h = (h-1)/3;
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dynOrdShellsort</span>(<span class="hljs-params">array</span>) </span>{
      <span class="hljs-keyword">var</span> N = array.length;
      <span class="hljs-keyword">var</span> h = <span class="hljs-number">1</span>;
      <span class="hljs-keyword">while</span> (h &lt; N/<span class="hljs-number">3</span>) {h = <span class="hljs-number">3</span> * h + <span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">while</span> (h &gt;= <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = h; i &lt; N; i++) {
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i; j &gt;= h &amp;&amp; array[j] &lt; array[j-h]; j -= h) {
            <span class="hljs-comment">// swap(array, j, j-h);</span>
            [array[j], array[j-h]] = [array[j-h], array[j]];
          }
        }h = (h<span class="hljs-number">-1</span>)/<span class="hljs-number">3</span>;
      }
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在《算法（第 4 版）》（人邮版）的合著者 Robert Sedgewick 定义了一个   shellsort() 函数，在这个函数中可以通过一个公式来对希尔排序用到的间隔序列进行动态计算。Sedgewick 的算法是通过上面的代码片段来决定初始间隔值的,并添加到外层 for 循环." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">在《算法（第 <span class="hljs-number">4</span> 版）》（人邮版）的合著者 Robert Sedgewick 定义了一个   shellsort() 函数，在这个函数中可以通过一个公式来对希尔排序用到的间隔序列进行动态计算。Sedgewick 的算法是通过上面的代码片段来决定初始间隔值的,并添加到外层 <span class="hljs-keyword">for</span> 循环.</code></pre>
</li>
<li>
<p>归并排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let mergeSort = (function () {
      function mergeSort(arr) {
        if (arr.length < 2) {
          return;
        }
        var step = 1;
        var left, right;
        while (step < arr.length) {
          left = 0;
          right = step;
          while (right + step <= arr.length) {
            mergeArrays(arr, left, left+step, right, right+step);
            left = right + step;
            right = left + step;
          }
          if (right < arr.length) {
            mergeArrays(arr, left, left+step, right, arr.length);
          }
          step *= 2;
        }
      }
      function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
        var rightArr = new Array(stopRight - startRight + 1);
        var leftArr = new Array(stopLeft - startLeft + 1);
        k = startRight;
        for (var i = 0; i < (rightArr.length-1); ++i) {
          rightArr[i] = arr[k];
          ++k;
        }
        k = startLeft;
        for (var i = 0; i < (leftArr.length-1); ++i) {
          leftArr[i] = arr[k];
          ++k;
        }
        rightArr[rightArr.length-1] = Infinity; // 哨兵值
        leftArr[leftArr.length-1] = Infinity; // 哨兵值
        var m = 0;
        var n = 0;
        for (var k = startLeft; k < stopRight; ++k) {
          if (leftArr[m] <= rightArr[n]) {
            arr[k] = leftArr[m];
            m++;
          }
          else {
            arr[k] = rightArr[n];
            n++;
          }
        }
        // console.log(&quot;left array - &quot;, leftArr);
        // console.log(&quot;right array - &quot;, rightArr);
      }
      return mergeSort;
    })()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">let</span> mergeSort = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeSort</span>(<span class="hljs-params">arr</span>) </span>{
        <span class="hljs-keyword">if</span> (arr.length &lt; <span class="hljs-number">2</span>) {
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">var</span> step = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">var</span> left, right;
        <span class="hljs-keyword">while</span> (step &lt; arr.length) {
          left = <span class="hljs-number">0</span>;
          right = step;
          <span class="hljs-keyword">while</span> (right + step &lt;= arr.length) {
            mergeArrays(arr, left, left+step, right, right+step);
            left = right + step;
            right = left + step;
          }
          <span class="hljs-keyword">if</span> (right &lt; arr.length) {
            mergeArrays(arr, left, left+step, right, arr.length);
          }
          step *= <span class="hljs-number">2</span>;
        }
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeArrays</span>(<span class="hljs-params">arr, startLeft, stopLeft, startRight, stopRight</span>) </span>{
        <span class="hljs-keyword">var</span> rightArr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(stopRight - startRight + <span class="hljs-number">1</span>);
        <span class="hljs-keyword">var</span> leftArr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(stopLeft - startLeft + <span class="hljs-number">1</span>);
        k = startRight;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; (rightArr.length<span class="hljs-number">-1</span>); ++i) {
          rightArr[i] = arr[k];
          ++k;
        }
        k = startLeft;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; (leftArr.length<span class="hljs-number">-1</span>); ++i) {
          leftArr[i] = arr[k];
          ++k;
        }
        rightArr[rightArr.length<span class="hljs-number">-1</span>] = <span class="hljs-literal">Infinity</span>; <span class="hljs-comment">// 哨兵值</span>
        leftArr[leftArr.length<span class="hljs-number">-1</span>] = <span class="hljs-literal">Infinity</span>; <span class="hljs-comment">// 哨兵值</span>
        <span class="hljs-keyword">var</span> m = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">var</span> n = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = startLeft; k &lt; stopRight; ++k) {
          <span class="hljs-keyword">if</span> (leftArr[m] &lt;= rightArr[n]) {
            arr[k] = leftArr[m];
            m++;
          }
          <span class="hljs-keyword">else</span> {
            arr[k] = rightArr[n];
            n++;
          }
        }
        <span class="hljs-comment">// console.log("left array - ", leftArr);</span>
        <span class="hljs-comment">// console.log("right array - ", rightArr);</span>
      }
      <span class="hljs-keyword">return</span> mergeSort;
    })()</code></pre>
</li>
<li>
<p>快速排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function qSort(arr){
      if (arr.length == 0) {
        return [];
      }
      var left = [];
      var right = [];
      var pivot = arr[0];
      for (var i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      return qSort(left).concat(pivot, qSort(right));
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">qSort</span>(<span class="hljs-params">arr</span>)</span>{
      <span class="hljs-keyword">if</span> (arr.length == <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> [];
      }
      <span class="hljs-keyword">var</span> left = [];
      <span class="hljs-keyword">var</span> right = [];
      <span class="hljs-keyword">var</span> pivot = arr[<span class="hljs-number">0</span>];
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (arr[i] &lt; pivot) {
          left.push(arr[i]);
        } <span class="hljs-keyword">else</span> {
          right.push(arr[i]);
        }
      }
      <span class="hljs-keyword">return</span> qSort(left).concat(pivot, qSort(right));
    }</code></pre>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript数据结构与算法 --- 高级排序算法

## 原文链接
[https://segmentfault.com/a/1190000013091608](https://segmentfault.com/a/1190000013091608)


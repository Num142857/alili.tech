---
title: '温故js系列（2）-快速排序&插入排序&选择排序&冒泡排序算法&优化' 
date: 2019-02-07 2:30:16
hidden: true
slug: jci399h5mx
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/3" rel="nofollow noreferrer" target="_blank">排序算法</a></p>
<h2 id="articleHeader0">JavaScript-排序算法及简易优化</h2>
<h3 id="articleHeader1">快速排序</h3>
<p>原理：在待排序序列中选一个分割元素，将待排序序列分隔成独立的子序列，子序列1里的元素比分割元素元素都小（大），子序列2反之，递归进行此操作，以达到子序列都有序。最后将子序列用concat方法连接起来即是排序好的序列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr){
    if(arr.length <= 1){
        return arr;
    }    
    var num = Math.floor(arr.length/2);
    var numValue = arr.splice(num,1);

    var left = [];
    var right = [];
    for(var i = 0;i<arr.length;i++){
        if(arr[i] < numValue){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(numValue,quickSort(right));

}
console.log(quickSort([1,45,43,4,56,7,20,1]));
//[1, 1, 4, 7, 20, 43, 45, 56]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function quickSort(arr){
    <span class="hljs-keyword">if</span>(arr.<span class="hljs-built_in">length</span> &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-built_in">return</span> arr;
    }    
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">num</span> = Math.<span class="hljs-built_in">floor</span>(arr.<span class="hljs-built_in">length</span>/<span class="hljs-number">2</span>);
    <span class="hljs-built_in">var</span> numValue = arr.<span class="hljs-built_in">splice</span>(<span class="hljs-built_in">num</span>,<span class="hljs-number">1</span>);

    <span class="hljs-built_in">var</span> left = [];
    <span class="hljs-built_in">var</span> right = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>;i&lt;arr.<span class="hljs-built_in">length</span>;i++){
        <span class="hljs-keyword">if</span>(arr[i] &lt; numValue){
            left.<span class="hljs-built_in">push</span>(arr[i]);
        }<span class="hljs-keyword">else</span>{
            right.<span class="hljs-built_in">push</span>(arr[i]);
        }
    }
    <span class="hljs-built_in">return</span> quickSort(left).<span class="hljs-built_in">concat</span>(numValue,quickSort(right));

}
console.<span class="hljs-built_in">log</span>(quickSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>]));
//[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-number">20</span>, <span class="hljs-number">43</span>, <span class="hljs-number">45</span>, <span class="hljs-number">56</span>]</code></pre>
<p>优化：当待排序序列长度N &lt; 10时，使用插入排序，可以加速排序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    if(arr.length < 10){
        insertSort(arr);
    }    
    var num = Math.floor(arr.length/2);
    var numValue = arr.splice(num,1);

    var left = [];
    var right = [];
    for(var i = 0;i<arr.length;i++){
        if(arr[i] < numValue){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(numValue,quickSort(right));

}
console.log(quickSort([1,3,4,645,43,4,56,333,44,564,7,20,1]));
//[1, 1, 3, 4, 4, 7, 20, 43, 44, 56, 333, 564, 645]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function quickSort(arr){
    <span class="hljs-keyword">if</span>(arr.<span class="hljs-built_in">length</span> &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-built_in">return</span> arr;
    }
    <span class="hljs-keyword">if</span>(arr.<span class="hljs-built_in">length</span> &lt; <span class="hljs-number">10</span>){
        insertSort(arr);
    }    
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">num</span> = Math.<span class="hljs-built_in">floor</span>(arr.<span class="hljs-built_in">length</span>/<span class="hljs-number">2</span>);
    <span class="hljs-built_in">var</span> numValue = arr.<span class="hljs-built_in">splice</span>(<span class="hljs-built_in">num</span>,<span class="hljs-number">1</span>);

    <span class="hljs-built_in">var</span> left = [];
    <span class="hljs-built_in">var</span> right = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>;i&lt;arr.<span class="hljs-built_in">length</span>;i++){
        <span class="hljs-keyword">if</span>(arr[i] &lt; numValue){
            left.<span class="hljs-built_in">push</span>(arr[i]);
        }<span class="hljs-keyword">else</span>{
            right.<span class="hljs-built_in">push</span>(arr[i]);
        }
    }
    <span class="hljs-built_in">return</span> quickSort(left).<span class="hljs-built_in">concat</span>(numValue,quickSort(right));

}
console.<span class="hljs-built_in">log</span>(quickSort([<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">645</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">333</span>,<span class="hljs-number">44</span>,<span class="hljs-number">564</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>]));
//[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-number">20</span>, <span class="hljs-number">43</span>, <span class="hljs-number">44</span>, <span class="hljs-number">56</span>, <span class="hljs-number">333</span>, <span class="hljs-number">564</span>, <span class="hljs-number">645</span>]
</code></pre>
<h3 id="articleHeader2">插入排序</h3>
<p>原理：通过构建有序序列，对于未排序元素，在已排序序列中从后向前扫描，找到相应位置并插入。一般可以将第一个元素作为有序序列，用未排序的元素与之相比，插入，直到排序完毕。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertSort(arr){
    var len = arr.length;
    if(len <= 1){
        return arr;
    }
    for(var i = 1;i<len;i++){
        var tmp = arr[i];
        var j = i;   
        while(arr[j-1] > tmp){
            arr[j] = arr[j-1];
            --j;
        }
        arr[j] = tmp;
    }
    return arr;
}
console.log(insertSort([1,45,43,4,56,7,20,1]));
//[1, 1, 4, 7, 20, 43, 45, 56]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insertSort</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">if</span>(len &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;i&lt;len;i++){
        <span class="hljs-keyword">var</span> tmp = arr[i];
        <span class="hljs-keyword">var</span> j = i;   
        <span class="hljs-keyword">while</span>(arr[j<span class="hljs-number">-1</span>] &gt; tmp){
            arr[j] = arr[j<span class="hljs-number">-1</span>];
            --j;
        }
        arr[j] = tmp;
    }
    <span class="hljs-keyword">return</span> arr;
}
<span class="hljs-built_in">console</span>.log(insertSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>]));
<span class="hljs-comment">//[1, 1, 4, 7, 20, 43, 45, 56]</span></code></pre>
<p>优化：二分插入排序，在有序序列中使用二分查找法查找一个插入位置，减少元素比较次数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function binaryInsertSort(arr){
    var len = arr.length;
    if(len <= 1){
        return arr;
    }
    for (var i = 1; i < len; i++) {
        var tmp = arr[i], left = 0, right = i - 1;
        while (left <= right) {
              var index = parseInt((left + right) / 2);
              if (tmp < arr[index]) {
                  right = index - 1;
              } else {
                left = index + 1;
              }
        }
        for (var j = i - 1; j >= left; j--) {
              arr[j + 1] = arr[j];
        }
        arr[left] = tmp;
      }
    return arr;
}
console.log(binaryInsertSort([1,45,43,4,56,7,20,1,2,3,4,56,3]));
//[1, 1, 2, 3, 3, 4, 4, 7, 20, 43, 45, 56, 56]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>function binaryInsertSort(arr){
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">if</span>(len &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> tmp = arr[i], <span class="hljs-keyword">left</span> = <span class="hljs-number">0</span>, <span class="hljs-keyword">right</span> = i - <span class="hljs-number">1</span>;
        <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span> &lt;= <span class="hljs-keyword">right</span>) {
              <span class="hljs-keyword">var</span> index = parseInt((<span class="hljs-keyword">left</span> + <span class="hljs-keyword">right</span>) / <span class="hljs-number">2</span>);
              <span class="hljs-keyword">if</span> (tmp &lt; arr[index]) {
                  <span class="hljs-keyword">right</span> = index - <span class="hljs-number">1</span>;
              } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">left</span> = index + <span class="hljs-number">1</span>;
              }
        }
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i - <span class="hljs-number">1</span>; j &gt;= <span class="hljs-keyword">left</span>; j--) {
              arr[j + <span class="hljs-number">1</span>] = arr[j];
        }
        arr[<span class="hljs-keyword">left</span>] = tmp;
      }
    <span class="hljs-keyword">return</span> arr;
}
console.log(binaryInsertSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">3</span>]));
<span class="hljs-comment">//[1, 1, 2, 3, 3, 4, 4, 7, 20, 43, 45, 56, 56]</span>
</code></pre>
<h3 id="articleHeader3">选择排序</h3>
<p>原理：在待排序序列中找到最小（大）元素，放在序列的起始位置，然后，再从剩余元素中寻找最小（大）元素，然后放到已排序序列的末尾。重复，直到所有元素均排序完毕。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.selectionSort = Array.prototype.selectionSort || function(){
    var len = this.length;
    if(len <= 1){
        return this;
    }    
    var min,tmp;
    for(var i = 0;i<len;i++){
        min = i;
        for(var j = i+1;j<len;j++){
            if(this[j] < this[min]){
                min = j;
            }
        }
        if(i != min){
            tmp = this[i];
            this[i] = this[min];
            this[min] = tmp;
        }
    }
    return this;
}
console.log([1,45,43,4,56,7,20,1].selectionSort());
//[1, 1, 4, 7, 20, 43, 45, 56]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.selectionSort = Array.prototype.selectionSort || function(){
    <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">this</span>.length;
    <span class="hljs-keyword">if</span>(len &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }    
    <span class="hljs-keyword">var</span> min,tmp;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt;len;i++){
        min = i;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = i+<span class="hljs-number">1</span>;j&lt;len;j++){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>[j] &lt; <span class="hljs-keyword">this</span>[min]){
                min = j;
            }
        }
        <span class="hljs-keyword">if</span>(i != min){
            tmp = <span class="hljs-keyword">this</span>[i];
            <span class="hljs-keyword">this</span>[i] = <span class="hljs-keyword">this</span>[min];
            <span class="hljs-keyword">this</span>[min] = tmp;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
console.log([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>].selectionSort());
<span class="hljs-comment">//[1, 1, 4, 7, 20, 43, 45, 56]</span></code></pre>
<p>优化：堆排序，在直接选择排序中，为了从序列中选出关键字最小（最大）的记录，必须进行n-1次比较，接着在剩下序列中选出最小（最大）的元素，又需要做n-2次比较。但是，在n-2次比较中，有的比较可能在前面的n-1次比较中已经做过，但由于前一趟排序时未保留这些比较结果，所以后一趟排序时又重复执行了这些比较操作。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。堆排序可通过树形结构保存部分比较结果，可减少比较次数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function heapSort(arr) { 
     function swap(arr, i, j) {
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
    }
 
     function maxHeapify(arr, index, heapSize) {
          var iMax,iLeft,iRight;
          while (true) {
               iMax = index;
               iLeft = 2 * index + 1;
               iRight = 2 * (index + 1);
 
               if (iLeft < heapSize &amp;&amp; arr[index] < arr[iLeft]) {
                iMax = iLeft;
               }
 
               if (iRight < heapSize &amp;&amp; arr[iMax] < arr[iRight]) {
                iMax = iRight;
               }
 
               if (iMax != index) {    
                swap(arr, iMax, index);
                index = iMax;
               } else {
                    break;
               }
          }
     }
 
     function buildMaxHeap(arr) {
          var i,iParent = Math.floor(arr.length / 2) - 1;
 
          for (i = iParent; i >= 0; i--) {
               maxHeapify(arr, i, arr.length);
          }
     }
 
     function sort(arr) {
          buildMaxHeap(arr);
 
          for (var i = arr.length - 1; i > 0; i--) {
               swap(arr, 0, i);
               maxHeapify(arr, 0, i);
          }
          return arr;
     }
 
     return sort(arr);
}
console.log(heapSort([1,45,43,4,56,7,20,1,2,3,4,56,3]));
//[1, 1, 2, 3, 3, 4, 4, 7, 20, 43, 45, 56, 56]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">heapSort</span>(<span class="hljs-params">arr</span>) </span>{ 
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swap</span>(<span class="hljs-params">arr, i, j</span>) </span>{
          <span class="hljs-keyword">var</span> temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
    }
 
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">maxHeapify</span>(<span class="hljs-params">arr, index, heapSize</span>) </span>{
          <span class="hljs-keyword">var</span> iMax,iLeft,iRight;
          <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
               iMax = index;
               iLeft = <span class="hljs-number">2</span> * index + <span class="hljs-number">1</span>;
               iRight = <span class="hljs-number">2</span> * (index + <span class="hljs-number">1</span>);
 
               <span class="hljs-keyword">if</span> (iLeft &lt; heapSize &amp;&amp; arr[index] &lt; arr[iLeft]) {
                iMax = iLeft;
               }
 
               <span class="hljs-keyword">if</span> (iRight &lt; heapSize &amp;&amp; arr[iMax] &lt; arr[iRight]) {
                iMax = iRight;
               }
 
               <span class="hljs-keyword">if</span> (iMax != index) {    
                swap(arr, iMax, index);
                index = iMax;
               } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">break</span>;
               }
          }
     }
 
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildMaxHeap</span>(<span class="hljs-params">arr</span>) </span>{
          <span class="hljs-keyword">var</span> i,iParent = <span class="hljs-built_in">Math</span>.floor(arr.length / <span class="hljs-number">2</span>) - <span class="hljs-number">1</span>;
 
          <span class="hljs-keyword">for</span> (i = iParent; i &gt;= <span class="hljs-number">0</span>; i--) {
               maxHeapify(arr, i, arr.length);
          }
     }
 
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sort</span>(<span class="hljs-params">arr</span>) </span>{
          buildMaxHeap(arr);
 
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = arr.length - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i--) {
               swap(arr, <span class="hljs-number">0</span>, i);
               maxHeapify(arr, <span class="hljs-number">0</span>, i);
          }
          <span class="hljs-keyword">return</span> arr;
     }
 
     <span class="hljs-keyword">return</span> sort(arr);
}
<span class="hljs-built_in">console</span>.log(heapSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">3</span>]));
<span class="hljs-comment">//[1, 1, 2, 3, 3, 4, 4, 7, 20, 43, 45, 56, 56]</span>
</code></pre>
<h3 id="articleHeader4">冒泡排序</h3>
<p>原理：从第一个元素开始，一次比较两个元素，如果arr[n]大于arr[n+1]，就交换。重复遍历直到没有再需要交换，排序完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort(arr){
    var len = arr.length;
    if(len <= 1){
        return arr;
    }
    var tmp;
    for(var i = 0;i<len;i++){
        for(var j =0;j<len-1-i;j++){
            if(arr[j+1] < arr[j]){
                tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([1,45,43,4,56,7,20,1]));
//[1, 1, 4, 7, 20, 43, 45, 56]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function bubbleSort(arr){
    var len = arr.length;
    if(len &lt;= <span class="hljs-number">1</span>){
        return arr;
    }
    var tmp;
    for(var i = <span class="hljs-number">0</span>;i&lt;len;i++){
        for(var j =<span class="hljs-number">0</span>;j&lt;len<span class="hljs-number">-1</span>-i;j++){
            if(arr[j+<span class="hljs-number">1</span>] &lt; arr[j]){
                tmp = arr[j];
                arr[j] = arr[j+<span class="hljs-number">1</span>];
                arr[j+<span class="hljs-number">1</span>] = tmp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>]));
<span class="hljs-comment">//[1, 1, 4, 7, 20, 43, 45, 56]</span>
</code></pre>
<p>优化：上面代码中，里面一层循环在某次扫描中没有发生交换，说明此时数组已经全部排好序，后面的步骤就无需再执行了。因此，增加一个标记，每次发生交换，就标记，如果某次循环完没有标记，则说明已经完成排序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort(arr)  {  
    var len = arr.length;
    if(len <= 1){
        return arr;
    }
    var bSwaped = true;  
    for (var i = 0; i < len -1; i++)  {  
        // 每次先重置为false  
        bSwaped = false;  
        for (var j = len - 1; j > i ; j--)  {  
            if (arr[j-1] > arr[j])  {  
                var temp = arr[j-1];  
                arr[j-1] = arr[j];  
                arr[j] = temp;  
  
                bSwaped = true;  
            }  
        }  
        // 如果上一次扫描没有发生交换，则说明数组已经全部有序，退出循环  
        if (!bSwaped){
            break;
        }              
    }  
    return arr;
}  
console.log(bubbleSort([1,45,43,4,56,7,20,1]));
//[1, 1, 4, 7, 20, 43, 45, 56]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code>function bubbleSort(arr)  {  
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">len</span> = arr.length;
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">len</span> &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">var</span> bSwaped = <span class="hljs-literal">true</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span> <span class="hljs-number">-1</span>; i++)  {  
        <span class="hljs-comment">// 每次先重置为false  </span>
        bSwaped = <span class="hljs-literal">false</span>;  
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-built_in">len</span> - <span class="hljs-number">1</span>; j &gt; i ; j--)  {  
            <span class="hljs-keyword">if</span> (arr[j<span class="hljs-number">-1</span>] &gt; arr[j])  {  
                <span class="hljs-keyword">var</span> temp = arr[j<span class="hljs-number">-1</span>];  
                arr[j<span class="hljs-number">-1</span>] = arr[j];  
                arr[j] = temp;  
  
                bSwaped = <span class="hljs-literal">true</span>;  
            }  
        }  
        <span class="hljs-comment">// 如果上一次扫描没有发生交换，则说明数组已经全部有序，退出循环  </span>
        <span class="hljs-keyword">if</span> (!bSwaped){
            <span class="hljs-keyword">break</span>;
        }              
    }  
    <span class="hljs-keyword">return</span> arr;
}  
console.log(bubbleSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>]));
<span class="hljs-comment">//[1, 1, 4, 7, 20, 43, 45, 56]</span>
</code></pre>
<p>在上一步优化的基础上进一步思考：如果R[0..i]已是有序区间，上次的扫描区间是R[i..n]，记上次扫描时最后一次发生交换的位置是lastSwapPos，那么lastSwapPos会在在i与n之间，所以R[i..lastSwapPos]区间是有序的，否则这个区间也会发生交换；所以下次扫描区间就可以由R[i..n]缩减到[lastSwapPos..n] :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort(arr){ 
    var len = arr.length;
    if(len <= 1){
        return arr;
    } 
    var lastSwapPos = 0, lastSwapPosTemp = 0;  
    for (var i = 0; i < len - 1; i++){  
        lastSwapPos = lastSwapPosTemp;  
        for (var j = len - 1; j > lastSwapPos; j--){  
            if (arr[j - 1] > arr[j]){  
                var temp = arr[j - 1];  
                arr[j - 1] = arr[j];  
                arr[j] = temp;  
  
                lastSwapPosTemp = j;  
            }  
        }  
        if (lastSwapPos == lastSwapPosTemp){
            break;
        }                         
    }  
    return arr;
}
console.log(bubbleSort([1,45,43,4,56,7,20,1]));
//[1, 1, 4, 7, 20, 43, 45, 56]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code>function bubbleSort(arr){ 
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">len</span> = arr.length;
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">len</span> &lt;= <span class="hljs-number">1</span>){
        <span class="hljs-keyword">return</span> arr;
    } 
    <span class="hljs-keyword">var</span> lastSwapPos = <span class="hljs-number">0</span>, lastSwapPosTemp = <span class="hljs-number">0</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span> - <span class="hljs-number">1</span>; i++){  
        lastSwapPos = lastSwapPosTemp;  
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-built_in">len</span> - <span class="hljs-number">1</span>; j &gt; lastSwapPos; j--){  
            <span class="hljs-keyword">if</span> (arr[j - <span class="hljs-number">1</span>] &gt; arr[j]){  
                <span class="hljs-keyword">var</span> temp = arr[j - <span class="hljs-number">1</span>];  
                arr[j - <span class="hljs-number">1</span>] = arr[j];  
                arr[j] = temp;  
  
                lastSwapPosTemp = j;  
            }  
        }  
        <span class="hljs-keyword">if</span> (lastSwapPos == lastSwapPosTemp){
            <span class="hljs-keyword">break</span>;
        }                         
    }  
    <span class="hljs-keyword">return</span> arr;
}
console.log(bubbleSort([<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,<span class="hljs-number">43</span>,<span class="hljs-number">4</span>,<span class="hljs-number">56</span>,<span class="hljs-number">7</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>]));
<span class="hljs-comment">//[1, 1, 4, 7, 20, 43, 45, 56]</span>
</code></pre>
<p>这一些列优化都需要测速才知道有没有优化成功，只是简单的测试一两个数组是不容易看出来的。我们可以造一些很大的数据去测试，再用一个比较简单的测试时间的方法，随机创建10万个数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [];
var num = 0;
for(var i = 0; i < 100000; i++){
    num = Math.floor(Math.random()*100000);
    arr.push(num);
}
console.time(&quot;testTime&quot;);
bubbleSort(arr);
console.timeEnd(&quot;testTime&quot;);
==> testTime: 21900.684ms （比较数目越多，差距越大，更好对比）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = [];
<span class="hljs-built_in">var</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
    <span class="hljs-built_in">num</span> = Math.<span class="hljs-built_in">floor</span>(Math.<span class="hljs-built_in">random</span>()*<span class="hljs-number">100000</span>);
    arr.<span class="hljs-built_in">push</span>(<span class="hljs-built_in">num</span>);
}
console.<span class="hljs-built_in">time</span>(<span class="hljs-string">"testTime"</span>);
bubbleSort(arr);
console.timeEnd(<span class="hljs-string">"testTime"</span>);
==&gt; testTime: <span class="hljs-number">21900.</span>684ms （比较数目越多，差距越大，更好对比）
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（2）-快速排序&插入排序&选择排序&冒泡排序算法&优化

## 原文链接
[https://segmentfault.com/a/1190000005893632](https://segmentfault.com/a/1190000005893632)


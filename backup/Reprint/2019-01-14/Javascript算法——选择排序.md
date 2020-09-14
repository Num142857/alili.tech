---
title: 'Javascript算法——选择排序' 
date: 2019-01-14 2:30:07
hidden: true
slug: lh3etl87o7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>常见的内部排序算法有：插入排序、<a href="https://segmentfault.com/a/1190000009461832">希尔排序</a>、选择排序、冒泡排序、<a href="https://segmentfault.com/a/1190000008866524" target="_blank">归并排序</a>、<a href="https://segmentfault.com/a/1190000009366805">快速排序</a>、堆排序、基数排序等。这里主要介绍<code>选择排序</code>。</blockquote>
<p>一图胜千言：</p>
<p><span class="img-wrap"><img data-src="/img/bVNIpc?w=554&amp;h=337" src="https://static.alili.tech/img/bVNIpc?w=554&amp;h=337" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1. 选择排序</h3>
<h4>1.1 算法描述</h4>
<p>选择排序是一种简单直观的排序算法，无论什么数据进去都是O(n2) 的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。通俗来说就是你们中间谁最小谁就出列，站到队列的最后边，然后继续对着剩余的无序数组说你们中间谁最小谁就出列，站到队列的最后边，一直到最后一个，继续站到最后边，这样数组就有了顺序，从小到大。</p>
<h4>1.2 算法步骤</h4>
<ul>
<li>在未排序序列中找到最小（大）元素，存放到排序序列的起始位置</li>
<li>从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。</li>
<li>重复第二步，直到所有元素均排序完毕。</li>
</ul>
<p>图片描述</p>
<h4>1.3 算法实现</h4>
<p><strong>javascript语言实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectionSort</span><span class="hljs-params">(arr)</span> </span>{
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> minIndex, temp;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len - <span class="hljs-number">1</span>; i++) {
        minIndex = i;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; len; j++) {
            <span class="hljs-keyword">if</span> (arr[j] &lt; arr[minIndex]) {     <span class="hljs-comment">// 寻找最小的数</span>
                minIndex = j;                 <span class="hljs-comment">// 将最小数的索引保存</span>
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    <span class="hljs-keyword">return</span> arr;
}
</code></pre>
<p><strong>python语言实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="def selectionSort(arr):
    for i in range(len(arr)-1):
        for j in range(i+1, len(arr)):
            if arr[j] < arr[i]:
                arr[i], arr[j] = arr[j], arr[i]
    return arr
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">selectionSort</span><span class="hljs-params">(arr)</span></span>:
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> range(len(arr)-<span class="hljs-number">1</span>):
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> range(i+<span class="hljs-number">1</span>, len(arr)):
            <span class="hljs-keyword">if</span> arr[j] &lt; arr[i]:
                arr[i], arr[j] = arr[j], arr[i]
    <span class="hljs-keyword">return</span> arr
</code></pre>
<p><strong>java语言实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public static void selectSort(int[] numbers){
    int size = numbers.length; //数组长度
    int temp = 0 ; //中间变量

    for(int i = 0 ; i < size ; i++){
        int k = i;   //待确定的位置
        //选择出应该在第i个位置的数
        for(int j = size -1 ; j > i ; j--){
          if(numbers[j] < numbers[k]){
              k = j;
          }
        }
        //交换两个数
        temp = numbers[i];
        numbers[i] = numbers[k];
        numbers[k] = temp;
     }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> selectSort(<span class="hljs-keyword">int</span>[] numbers){
    <span class="hljs-keyword">int</span> <span class="hljs-built_in">size</span> = numbers.length; <span class="hljs-comment">//数组长度</span>
    <span class="hljs-keyword">int</span> temp = <span class="hljs-number">0</span> ; <span class="hljs-comment">//中间变量</span>

    <span class="hljs-built_in">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span> ; i &lt; <span class="hljs-built_in">size</span> ; i++){
        <span class="hljs-keyword">int</span> k = i;   <span class="hljs-comment">//待确定的位置</span>
        <span class="hljs-comment">//选择出应该在第i个位置的数</span>
        <span class="hljs-built_in">for</span>(<span class="hljs-keyword">int</span> j = <span class="hljs-built_in">size</span> <span class="hljs-number">-1</span> ; j &gt; i ; j--){
          <span class="hljs-built_in">if</span>(numbers[j] &lt; numbers[k]){
              k = j;
          }
        }
        <span class="hljs-comment">//交换两个数</span>
        temp = numbers[i];
        numbers[i] = numbers[k];
        numbers[k] = temp;
     }
}

</code></pre>
<p><strong>go语言实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func selectionSort(arr []int) []int {
    length := len(arr)
    for i := 0; i < length-1; i++ {
        min := i
        for j := i + 1; j < length; j++ {
            if arr[min] > arr[j] {
                min = j
            }
        }
        arr[i], arr[min] = arr[min], arr[i]
    }
    return arr
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs glsl"><code>func selectionSort(arr []<span class="hljs-type">int</span>) []<span class="hljs-type">int</span> {
    <span class="hljs-built_in">length</span> := len(arr)
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">length</span><span class="hljs-number">-1</span>; i++ {
        <span class="hljs-built_in">min</span> := i
        <span class="hljs-keyword">for</span> j := i + <span class="hljs-number">1</span>; j &lt; <span class="hljs-built_in">length</span>; j++ {
            <span class="hljs-keyword">if</span> arr[<span class="hljs-built_in">min</span>] &gt; arr[j] {
                <span class="hljs-built_in">min</span> = j
            }
        }
        arr[i], arr[<span class="hljs-built_in">min</span>] = arr[<span class="hljs-built_in">min</span>], arr[i]
    }
    <span class="hljs-keyword">return</span> arr
}

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript算法——选择排序

## 原文链接
[https://segmentfault.com/a/1190000009366805](https://segmentfault.com/a/1190000009366805)


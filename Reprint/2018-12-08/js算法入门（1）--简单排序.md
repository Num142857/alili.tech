---
title: 'js算法入门（1）--简单排序' 
date: 2018-12-08 2:30:30
hidden: true
slug: sa7bszl2ne9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>从上大学开始，算法与数据结构这东西我是一直心心念念，奈何又懒又蠢，这么基础科目一直没啥成效。但是如鲠在喉，如果再不学的话可能就成为一块心病了。所以虽然和现在工作没啥关系但还是决定学一下基础，聊以自慰。</p>
<h2 id="articleHeader1">2.排序</h2>
<h3 id="articleHeader2">2.1简单选择排序</h3>
<p>对于一个有n个元素的数组a(下标从0开始)，进行n趟操作，每趟从待排部分[i,n)中i<strong>选择</strong>i最小的元素，令其与a[i]进行交互，总复杂度为O（n^2）:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = [5, 2, 4, 6, 3, 1];
    //select sort
    function selectSort(a) {
        var n = a.length;
        for (var i = 0; i < n; i++) {//n次操作，即所谓的趟
            var k = i;//设最小值的下标为i
            console.log(i)
            for (var j = i + 1; j < n; j++) {//每趟待排序部分
                if (a[j] < a[k]) {//若求倒序则改为>
                    k = j;//更新最小值的下标
                }
            }
            //交换
            var temp = a[i];
            a[i] = a[k];
            a[k] = temp;
        }
        return a;
    }
    console.log(selectSort(a));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> a = [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>];
    <span class="hljs-comment">//select sort</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectSort</span>(<span class="hljs-params">a</span>) </span>{
        <span class="hljs-keyword">var</span> n = a.length;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {<span class="hljs-comment">//n次操作，即所谓的趟</span>
            <span class="hljs-keyword">var</span> k = i;<span class="hljs-comment">//设最小值的下标为i</span>
            <span class="hljs-built_in">console</span>.log(i)
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; n; j++) {<span class="hljs-comment">//每趟待排序部分</span>
                <span class="hljs-keyword">if</span> (a[j] &lt; a[k]) {<span class="hljs-comment">//若求倒序则改为&gt;</span>
                    k = j;<span class="hljs-comment">//更新最小值的下标</span>
                }
            }
            <span class="hljs-comment">//交换</span>
            <span class="hljs-keyword">var</span> temp = a[i];
            a[i] = a[k];
            a[k] = temp;
        }
        <span class="hljs-keyword">return</span> a;
    }
    <span class="hljs-built_in">console</span>.log(selectSort(a));</code></pre>
<h3 id="articleHeader3">2.2简单插入排序</h3>
<p>这里的插入排序指的是直接插入排序。插入排序的过程就是将待插元素一个个插入初始有序部分的过程。而直接插入排序就是把未排序的序列里的第一位数与前面的有序数列进行比较，凡是比它大的都向后移动一位，直到找到正确的位置进行交换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertSort(a){
        var n=a.length;
        for(var i =1;i<n;i++){//从序列第二个值开始，比较n-1趟
            var temp = a[i];//保存要进行排序的值
            var j=i;
            while(j>0&amp;&amp;temp<a[j-1]){//和前一个值进行比较
                a[j]=a[j-1];//若小于前一个值，则将前一个值向后移动一个位置
                j--;//这时前一个值的位置空出来了，下次交换则在前一个值的位置上进行
            }
           a[j]=temp;//将缓存的进行排序的值放到正确的位置

        }
        return a;
    }
    console.dir(insertSort(a));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insertSort</span>(<span class="hljs-params">a</span>)</span>{
        <span class="hljs-keyword">var</span> n=a.length;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i =<span class="hljs-number">1</span>;i&lt;n;i++){<span class="hljs-comment">//从序列第二个值开始，比较n-1趟</span>
            <span class="hljs-keyword">var</span> temp = a[i];<span class="hljs-comment">//保存要进行排序的值</span>
            <span class="hljs-keyword">var</span> j=i;
            <span class="hljs-keyword">while</span>(j&gt;<span class="hljs-number">0</span>&amp;&amp;temp&lt;a[j<span class="hljs-number">-1</span>]){<span class="hljs-comment">//和前一个值进行比较</span>
                a[j]=a[j<span class="hljs-number">-1</span>];<span class="hljs-comment">//若小于前一个值，则将前一个值向后移动一个位置</span>
                j--;<span class="hljs-comment">//这时前一个值的位置空出来了，下次交换则在前一个值的位置上进行</span>
            }
           a[j]=temp;<span class="hljs-comment">//将缓存的进行排序的值放到正确的位置</span>

        }
        <span class="hljs-keyword">return</span> a;
    }
    <span class="hljs-built_in">console</span>.dir(insertSort(a));</code></pre>
<p><strong>其实很像倒着来的冒泡排序</strong></p>
<h2 id="articleHeader4">参考书目</h2>
<p><a href="https://book.douban.com/subject/26827295/" rel="nofollow noreferrer" target="_blank">《算法笔记》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js算法入门（1）--简单排序

## 原文链接
[https://segmentfault.com/a/1190000014077236](https://segmentfault.com/a/1190000014077236)


---
title: 'Just for fun——迅速写完快速排序' 
date: 2018-12-25 2:30:11
hidden: true
slug: hzcmvlqrgz9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">快速排序</h1>
<p>快速排序的话，应用了<strong>分治</strong>的思想，选取一个中间值，把小于它的值放左边，大于它的值放右边，然后再对这两个分组应用同样的方法，递归下去。</p>
<h1 id="articleHeader1">挖坑</h1>
<p><strong>挖坑</strong>是自己快速回忆实现这个算法的形象叫法。<br>如果现在有数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[-1, 2, 4, 7, 8, -7, 6, 20]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-number">-1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">-7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">20</span>]</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYChk?w=1173&amp;h=184" src="https://static.alili.tech/img/bVYChk?w=1173&amp;h=184" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>挖出第一个位置的值，存起来，现在有一个空的坑位了，需要填上</h4>
<p><span class="img-wrap"><img data-src="/img/bVYChr?w=1264&amp;h=379" src="https://static.alili.tech/img/bVYChr?w=1264&amp;h=379" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>刚开始的时候，i指向初始的位置，j指向末尾的位置，现在i指向的地方有坑位，j开始往前走，遇到的数如果比中间值（这里是-1）小的话，把当前j指向位置的数挖掉，给i上的位置填补上，现在j的位置是空的</h4>
<p><span class="img-wrap"><img data-src="/img/bVYCh4?w=1292&amp;h=414" src="https://static.alili.tech/img/bVYCh4?w=1292&amp;h=414" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>那现在i（+1之后）开始活动了，向前跑，如果碰到i指向位置的值比中间值（这里是-1）大，则把当前i指向位置的数挖掉，给j的位置补上，然后重复j运动的过程</h4>
<p><span class="img-wrap"><img data-src="/img/bVYCiD?w=1275&amp;h=375" src="https://static.alili.tech/img/bVYCiD?w=1275&amp;h=375" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>以上过程最终i和j会相遇（跳出循环点），那里正好有个空的坑位给中间值</h4>
<p><span class="img-wrap"><img data-src="/img/bVYCjn?w=1301&amp;h=351" src="https://static.alili.tech/img/bVYCjn?w=1301&amp;h=351" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>然后应用分治策略，对剩下的两个分组使用同样的手段</h4>
<h2 id="articleHeader2">实现</h2>
<h3 id="articleHeader3">Java实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
  * 快速排序
  * @param arr int[] 排序数组
  * @param start int 开始位置
  * @param end int 结尾位置
  */
private static void quickSort(int[] arr, int start, int end) {
    if(end - start == 1) {
        if(arr[start] > arr[end]) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
        }
    } else if (end - start > 1) {
        int middle = arr[start];
        int i = start;
        int j = end;
        while (i != j &amp;&amp; i <= end &amp;&amp; j >= start) {
            while (arr[j] >= middle &amp;&amp; j > i) {
                j--;
            }
            if(j > i) {
                arr[i] = arr[j];
                i++;
            }
            while (arr[i] <= middle &amp;&amp; i < j) {
                i++;
            }
            if(i < j) {
                arr[j] = arr[i];
                j--;
            }
        }
        arr[i] = middle;
        quickSort(arr, start, i - 1);
        quickSort(arr, i + 1, end);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>/**
  * 快速排序
  * @param arr <span class="hljs-built_in">int</span>[] 排序数组
  * @param start <span class="hljs-built_in">int</span> 开始位置
  * @param <span class="hljs-keyword">end</span> <span class="hljs-built_in">int</span> 结尾位置
  */
private <span class="hljs-keyword">static</span> <span class="hljs-built_in">void</span> quickSort(<span class="hljs-built_in">int</span>[] arr, <span class="hljs-built_in">int</span> start, <span class="hljs-built_in">int</span> <span class="hljs-keyword">end</span>) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">end</span> - start == <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">if</span>(arr[start] &gt; arr[<span class="hljs-keyword">end</span>]) {
            <span class="hljs-built_in">int</span> temp = arr[start];
            arr[start] = arr[<span class="hljs-keyword">end</span>];
            arr[<span class="hljs-keyword">end</span>] = temp;
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">end</span> - start &gt; <span class="hljs-number">1</span>) {
        <span class="hljs-built_in">int</span> middle = arr[start];
        <span class="hljs-built_in">int</span> i = start;
        <span class="hljs-built_in">int</span> j = <span class="hljs-keyword">end</span>;
        <span class="hljs-keyword">while</span> (i != j &amp;&amp; i &lt;= <span class="hljs-keyword">end</span> &amp;&amp; j &gt;= start) {
            <span class="hljs-keyword">while</span> (arr[j] &gt;= middle &amp;&amp; j &gt; i) {
                j--;
            }
            <span class="hljs-keyword">if</span>(j &gt; i) {
                arr[i] = arr[j];
                i++;
            }
            <span class="hljs-keyword">while</span> (arr[i] &lt;= middle &amp;&amp; i &lt; j) {
                i++;
            }
            <span class="hljs-keyword">if</span>(i &lt; j) {
                arr[j] = arr[i];
                j--;
            }
        }
        arr[i] = middle;
        quickSort(arr, start, i - <span class="hljs-number">1</span>);
        quickSort(arr, i + <span class="hljs-number">1</span>, <span class="hljs-keyword">end</span>);
    }
}</code></pre>
<h3 id="articleHeader4">Javascript的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [2, -1, -2, 100, 5];

function quickSort(arr, start, end) {
    if(end - start === 1) {
        if(arr[start] > arr[end]) {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
        }
    } else if (end - start > 1) {
        let middle = arr[start];
        let i = start;
        let j = end;
        while (i !== j &amp;&amp; i <= end &amp;&amp; j >= start) {
            while (arr[j] >= middle &amp;&amp; j > i) {
                j--;
            }
            if(j > i) {
                arr[i] = arr[j];
                i++;
            }
            while (arr[i] <= middle &amp;&amp; i < j) {
                i++;
            }
            if(i < j) {
                arr[j] = arr[i];
                j--;
            }
        }
        arr[i] = middle;
        quickSort(arr, start, i - 1);
        quickSort(arr, i + 1, end);
    }
}

quickSort(arr, 0, arr.length - 1);
console.log(arr);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let arr = [<span class="hljs-number">2</span>, -<span class="hljs-number">1</span>, -<span class="hljs-number">2</span>, <span class="hljs-number">100</span>, <span class="hljs-number">5</span>]<span class="hljs-comment">;</span>

function quickSort(arr, start, end) {
    if(end - start === <span class="hljs-number">1</span>) {
        if(arr[start] &gt; arr[end]) {
            let temp = arr[start]<span class="hljs-comment">;</span>
            arr[start] = arr[end]<span class="hljs-comment">;</span>
            arr[end] = temp<span class="hljs-comment">;</span>
        }
    } else if (end - start &gt; <span class="hljs-number">1</span>) {
        let middle = arr[start]<span class="hljs-comment">;</span>
        let i = start<span class="hljs-comment">;</span>
        let <span class="hljs-keyword">j </span>= end<span class="hljs-comment">;</span>
        while (i !== <span class="hljs-keyword">j </span>&amp;&amp; i &lt;= end &amp;&amp; <span class="hljs-keyword">j </span>&gt;= start) {
            while (arr[<span class="hljs-keyword">j] </span>&gt;= middle &amp;&amp; <span class="hljs-keyword">j </span>&gt; i) {
                <span class="hljs-keyword">j--;
</span>            }
            if(<span class="hljs-keyword">j </span>&gt; i) {
                arr[i] = arr[<span class="hljs-keyword">j];
</span>                i++<span class="hljs-comment">;</span>
            }
            while (arr[i] &lt;= middle &amp;&amp; i &lt; <span class="hljs-keyword">j) </span>{
                i++<span class="hljs-comment">;</span>
            }
            if(i &lt; <span class="hljs-keyword">j) </span>{
                arr[<span class="hljs-keyword">j] </span>= arr[i]<span class="hljs-comment">;</span>
                <span class="hljs-keyword">j--;
</span>            }
        }
        arr[i] = middle<span class="hljs-comment">;</span>
        quickSort(arr, start, i - <span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
        quickSort(arr, i + <span class="hljs-number">1</span>, end)<span class="hljs-comment">;</span>
    }
}

quickSort(arr, <span class="hljs-number">0</span>, arr.length - <span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
console.log(arr)<span class="hljs-comment">;</span>
</code></pre>
<h3 id="articleHeader5">PHP的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

$arr = [2, -1, -2, 100, 5];


function quickSort(&amp;$arr, $start, $end) {
    if($end - $start === 1) {
        if($arr[$start] > $arr[$end]) {
            $temp = $arr[$start];
            $arr[$start] = $arr[$end];
            $arr[$end] = $temp;
        }
    } elseif ($end - $start > 1) {
        $middle = $arr[$start];
        $i = $start;
        $j = $end;
        while ($i !== $j &amp;&amp; $i <= $end &amp;&amp; $j >= $start) {
            while ($arr[$j] >= $middle &amp;&amp; $j > $i) {
                $j--;
            }
            if($j > $i) {
                $arr[$i] = $arr[$j];
                $i++;
            }
            while ($arr[$i] <= $middle &amp;&amp; $i < $j) {
                $i++;
            }
            if($i < $j) {
                $arr[$j] = $arr[$i];
                $j--;
            }
        }
        $arr[$i] = $middle;
        quickSort($arr, $start, $i - 1);
        quickSort($arr, $i + 1, $end);
    }
}

quickSort($arr, 0, count($arr) - 1);
print_r($arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

$arr = [<span class="hljs-number">2</span>, <span class="hljs-number">-1</span>, <span class="hljs-number">-2</span>, <span class="hljs-number">100</span>, <span class="hljs-number">5</span>];


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">quickSort</span><span class="hljs-params">(&amp;$arr, $start, $end)</span> </span>{
    <span class="hljs-keyword">if</span>($end - $start === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">if</span>($arr[$start] &gt; $arr[$end]) {
            $temp = $arr[$start];
            $arr[$start] = $arr[$end];
            $arr[$end] = $temp;
        }
    } <span class="hljs-keyword">elseif</span> ($end - $start &gt; <span class="hljs-number">1</span>) {
        $middle = $arr[$start];
        $i = $start;
        $j = $end;
        <span class="hljs-keyword">while</span> ($i !== $j &amp;&amp; $i &lt;= $end &amp;&amp; $j &gt;= $start) {
            <span class="hljs-keyword">while</span> ($arr[$j] &gt;= $middle &amp;&amp; $j &gt; $i) {
                $j--;
            }
            <span class="hljs-keyword">if</span>($j &gt; $i) {
                $arr[$i] = $arr[$j];
                $i++;
            }
            <span class="hljs-keyword">while</span> ($arr[$i] &lt;= $middle &amp;&amp; $i &lt; $j) {
                $i++;
            }
            <span class="hljs-keyword">if</span>($i &lt; $j) {
                $arr[$j] = $arr[$i];
                $j--;
            }
        }
        $arr[$i] = $middle;
        quickSort($arr, $start, $i - <span class="hljs-number">1</span>);
        quickSort($arr, $i + <span class="hljs-number">1</span>, $end);
    }
}

quickSort($arr, <span class="hljs-number">0</span>, count($arr) - <span class="hljs-number">1</span>);
print_r($arr);</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Just for fun——迅速写完快速排序

## 原文链接
[https://segmentfault.com/a/1190000012024678](https://segmentfault.com/a/1190000012024678)


---
title: 'JavaScript实现冒泡排序' 
date: 2018-12-07 2:30:10
hidden: true
slug: lwoe50t4hij
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>对数组进行 冒泡排序 算是比较简单的，冒泡排序也是容易理解的一种排序算法了，在面试的时候，很可能就会问到。</p>
<h3 id="articleHeader1">实现原理</h3>
<blockquote>数组中有 <code>n</code> 个数，比较每相邻两个数，如果前者大于后者，就把两个数交换位置；这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过 <code>n-1</code>（数组的 length - 1） 轮，就完成了所有数的排序。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV7DXR?w=228&amp;h=244" src="https://static.alili.tech/img/bV7DXR?w=228&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好的，我们先来实现找数组中的最大数，并把他放到数组最后。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3,4,1,2];
// 遍历数组，次数就是arr.length - 1
for (var i = 0; i < arr.length - 1; i++) {
    // 如果前一个数 大于 后一个数 就交换两数位置
    if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
}
console.log(arr)  // [3, 1, 2, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
<span class="hljs-comment">// 遍历数组，次数就是arr.length - 1</span>
for (var i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
    <span class="hljs-comment">// 如果前一个数 大于 后一个数 就交换两数位置</span>
    if (arr[i] &gt; arr[i + <span class="hljs-number">1</span>]) {
        var temp = arr[i];
        arr[i] = arr[i + <span class="hljs-number">1</span>];
        arr[i + <span class="hljs-number">1</span>] = temp;
    }
}
console.log(arr)  <span class="hljs-comment">// [3, 1, 2, 4]</span></code></pre>
<p>我们能找到数组中最大的数，放到最后，这样重复 <code>arr.length - 1 </code> 次，便可以实现数组按从小到大的顺序排好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3,4,1,2];
// 遍历数组，次数就是arr.length - 1
for (var j = 0; j < arr.length - 1; j++) {
    // 这里 i < arr.length - 1 ，要思考思考合适吗？我们下面继续说
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
}
console.log(arr)  // [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
<span class="hljs-comment">// 遍历数组，次数就是arr.length - 1</span>
for (var j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span>; j++) {
    <span class="hljs-comment">// 这里 i &lt; arr.length - 1 ，要思考思考合适吗？我们下面继续说</span>
    for (var i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
        if (arr[i] &gt; arr[i + <span class="hljs-number">1</span>]) {
            var temp = arr[i];
            arr[i] = arr[i + <span class="hljs-number">1</span>];
            arr[i + <span class="hljs-number">1</span>] = temp;
        }
    }
}
console.log(arr)  <span class="hljs-comment">// [1,2,3,4]</span></code></pre>
<p>虽然上面的代码已经实现冒泡排序了，但就像注释中提到的，内层 for 循环的次数写成，<code>i &lt; arr.length - 1</code> ，是不是合适呢？<br>我们想一下，当第一次，找到最大数，放到最后，那么下一次，遍历的时候，是不是就不能把最后一个数算上了呢？因为他就是最大的了，不会出现，前一个数比后一个数大，要交换位置的情况，所以内层 for 循环的次数，改成 <code>i &lt; arr.length - 1 -j</code> ，才合适，看下面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3, 4, 1, 2];
function bubbleSort (arr) {
  for (var j = 0; j < arr.length - 1; j++) {
    // 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数
    for (var i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}
bubbleSort(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span> <span class="hljs-params">(arr)</span> </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span>; j++) {
    <span class="hljs-comment">// 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span> - j; i++) {
      <span class="hljs-keyword">if</span> (arr[i] &gt; arr[i + <span class="hljs-number">1</span>]) {
        <span class="hljs-keyword">var</span> temp = arr[i];
        arr[i] = arr[i + <span class="hljs-number">1</span>];
        arr[i + <span class="hljs-number">1</span>] = temp;
      }
    }
  }
  <span class="hljs-keyword">return</span> arr;
}
bubbleSort(arr);</code></pre>
<p>我们想下这个情况，当原数组是，<br><code>arr = [1,2,4,3];</code><br>在经过第一轮冒泡排序之后，数组就变成了<br><code>arr = [1,2,3,4];</code> <br>此时，数组已经排序完成了，但是按上面的代码来看，数组还会继续排序，所以我们加一个标志位，如果某次循环完后，没有任何两数进行交换，就将标志位 设置为 true，表示排序完成，这样我们就可以减少不必要的排序，提高性能。</p>
<h3 id="articleHeader2">完整代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3, 4, 1, 2];
function bubbleSort (arr) {
  var max = arr.length - 1;
  for (var j = 0; j < max; j++) {
    // 声明一个变量，作为标志位
    var done = true;
    for (var i = 0; i < max - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return arr;
}
bubbleSort(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span> <span class="hljs-params">(arr)</span> </span>{
  <span class="hljs-keyword">var</span> max = arr.length - <span class="hljs-number">1</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; max; j++) {
    <span class="hljs-comment">// 声明一个变量，作为标志位</span>
    <span class="hljs-keyword">var</span> done = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; max - j; i++) {
      <span class="hljs-keyword">if</span> (arr[i] &gt; arr[i + <span class="hljs-number">1</span>]) {
        <span class="hljs-keyword">var</span> temp = arr[i];
        arr[i] = arr[i + <span class="hljs-number">1</span>];
        arr[i + <span class="hljs-number">1</span>] = temp;
        done = <span class="hljs-literal">false</span>;
      }
    }
    <span class="hljs-keyword">if</span> (done) {
      <span class="hljs-keyword">break</span>;
    }
  }
  <span class="hljs-keyword">return</span> arr;
}
bubbleSort(arr);</code></pre>
<h3 id="articleHeader3">性能</h3>
<p><strong>时间复杂度：</strong> <code>平均时间复杂度O(n*n) 、最好情况O(n)、最差情况O(n*n)</code><br><strong>空间复杂度：</strong> O(1) <br><strong>稳定性：</strong>稳定</p>
<p>时间复杂度指的是一个算法执行所耗费的时间<br>空间复杂度指运行完一个程序所需内存的大小<br>稳定指，如果a=b,a在b的前面，排序后a仍然在b的前面<br>不稳定指，如果a=b，a在b的前面，排序后可能会交换位置</p>
<h3 id="articleHeader4">总结</h3>
<p>1、外层 for 循环控制循环次数<br>2、内层 for 循环进行两数交换，找每次的最大数，排到最后<br>3、设置一个标志位，减少不必要的循环</p>
<p>好的，下一篇文章，来实现下冒泡排序的可视化，把冒泡排序的过程展示出来。<br><a href="https://segmentfault.com/a/1190000014176104">JavaScript实现冒泡排序 可视化</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="前端简单说" title="前端简单说" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript实现冒泡排序

## 原文链接
[https://segmentfault.com/a/1190000014175918](https://segmentfault.com/a/1190000014175918)


---
title: '深入浅出 JavaScript 的 Array.prototype.sort 排序算法' 
date: 2019-01-04 2:30:10
hidden: true
slug: s3rezmy2dw9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">本文要解决的问题</h2>
<blockquote>
<p>1、找出 <code>Array.prototype.sort</code> 使用的什么排序算法</p>
<p>2、用一种直观的方式展示 <code>Array.prototype.sort</code> 的时间复杂度，看看它有多快？</p>
<p>3、实际开发中要注意的问题</p>
</blockquote>
<h2 id="articleHeader1">
<code>Array.prototype.sort</code> 各浏览器的算法实现</h2>
<p><a href="http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11" rel="nofollow noreferrer" target="_blank">ECMAScript 5.1</a></p>
<p><a href="http://www.ecma-international.cma-262/6.0/#sec-array.prototype.sort" rel="nofollow noreferrer" target="_blank">ECMAScript 6.0</a></p>
<p><a href="http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort" rel="nofollow noreferrer" target="_blank">ECMAScript 草案</a></p>
<p>看完上面三个规范中 <code>Array.prototype.sort</code> 部分，我们会发现 <code>ECMAScript</code> 不同版本规范对 <code>Array.prototype.sort</code> 的定义中没有要求用什么样的排序方式实现 <code>sort()</code> 方法，也没有要求是否要采用稳定排序算法（下文会解释什么是稳定排序算法）。</p>
<p>因此各浏览器都给出自己的实现方式：</p>
<p>表格内容部分来自于<a href="https://zh.wikipedia.org/wiki/JavaScript%E5%BC%95%E6%93%8E" rel="nofollow noreferrer" target="_blank">维基百科</a></p>
<table>
<thead><tr>
<th>浏览器</th>
<th>使用的 JavaScript 引擎</th>
<th>排序算法</th>
<th>源码地址</th>
</tr></thead>
<tbody>
<tr>
<td>Google Chrome</td>
<td>V8</td>
<td>插入排序和快速排序</td>
<td><a href="https://github.com/v8/v8/blob/master/src/js/array.js#L768" rel="nofollow noreferrer" target="_blank"><code>sort</code> 源码实现</a></td>
</tr>
<tr>
<td>Mozilla Firefox</td>
<td>SpiderMonkey</td>
<td>归并排序</td>
<td><a href="https://github.com/mozilla/gecko-dev/blob/master/js/src/jsarray.cpp" rel="nofollow noreferrer" target="_blank"><code>sort</code> 源码实现</a></td>
</tr>
<tr>
<td>Safari</td>
<td>Nitro（JavaScriptCore ）</td>
<td>归并排序和桶排序</td>
<td><a href="https://github.com/WebKit/webkit/blob/master/Source/JavaScriptCore/builtins/ArrayPrototype.js#L423" rel="nofollow noreferrer" target="_blank"><code>sort</code> 源码实现 </a></td>
</tr>
<tr>
<td>Microsoft Edge 和 IE(9+)</td>
<td>Chakra</td>
<td>快速排序</td>
<td><a href="https://github.com/Microsoft/ChakraCore/blob/master/lib/Common/DataStructures/QuickSort.h" rel="nofollow noreferrer" target="_blank"> <code>sort</code> 源码实现</a></td>
</tr>
</tbody>
</table>
<h3 id="articleHeader2">源码分析</h3>
<p><code>V8</code> 引擎的一段注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// In-place QuickSort algorithm.
// For short (length <= 10) arrays, insertion sort is used for efficiency." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// In-place QuickSort algorithm.</span>
<span class="hljs-comment">// For short (length &lt;= 10) arrays, insertion sort is used for efficiency.</span></code></pre>
<p><code>Google Chrome</code> 对 <code>sort</code> 做了特殊处理，对于长度 <code>&lt;= 10</code> 的数组使用的是插入排序(稳定排序算法) ，<code>&gt;10</code> 的数组使用的是快速排序。快速排序是不稳定的排序算法。</p>
<p>但是很明显比我们常见的快速排序要复杂得多，不过核心算法还是快速排序。算法复杂的原因在于 <code>v8</code> 出于性能考虑进行了很多优化。</p>
<p>再看 <code>safari</code> <code>Nitro</code> 引擎的一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof comparator == &quot;function&quot;)
  comparatorSort(array, length, comparator);
else if (comparator === null || comparator === @undefined)
  stringSort(array, length);

  省略....

function stringSort(array, length)
{
  var valueCount = compact(array, length);

  var strings = @newArrayWithSize(valueCount);
  for (var i = 0; i < valueCount; ++i)
      strings[i] = { string: @toString(array[i]), value: array[i] };

  bucketSort(array, 0, strings, 0);
}

  省略....

function comparatorSort(array, length, comparator)
{
  var valueCount = compact(array, length);
  mergeSort(array, valueCount, comparator);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> comparator == <span class="hljs-string">"function"</span>)
  comparatorSort(array, length, comparator);
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (comparator === <span class="hljs-literal">null</span> || comparator === @<span class="hljs-literal">undefined</span>)
  stringSort(array, length);

  省略....

function stringSort(array, length)
{
  <span class="hljs-keyword">var</span> valueCount = compact(array, length);

  <span class="hljs-keyword">var</span> strings = @newArrayWithSize(valueCount);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; valueCount; ++i)
      strings[i] = { <span class="hljs-attr">string</span>: @toString(array[i]), <span class="hljs-attr">value</span>: array[i] };

  bucketSort(array, <span class="hljs-number">0</span>, strings, <span class="hljs-number">0</span>);
}

  省略....

function comparatorSort(array, length, comparator)
{
  <span class="hljs-keyword">var</span> valueCount = compact(array, length);
  mergeSort(array, valueCount, comparator);
}</code></pre>
<p>默认使用的桶排序，如果 <code>sort</code> 传入的自定义函数作为参数，就是用归并排序（稳定排序算法）</p>
<p><code>Firefox</code> 源码就不贴了，上面的表格有源码地址，使用的稳定排序算法 — 归并算法。<br><code>Microsoft Edge</code> 和 <code>IE(9+)</code> 使用的不稳定排序算法 - 快速排序。<br>但是 IE（6、7、8）使用的稳定算法。</p>
<h3 id="articleHeader3">各种算法的对比</h3>
<table>
<thead><tr>
<th>排序类型</th>
<th>平均情况</th>
<th>最好情况</th>
<th>最坏情况</th>
<th>辅助空间</th>
<th colspan="2">稳定性</th>
</tr></thead>
<tbody>
<tr>
<td>快速排序</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>O(n²)</td>
<td>O(nlogn)</td>
<td>不稳定</td>
</tr>
<tr>
<td>归并排序</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>O(n)</td>
<td>稳定</td>
</tr>
<tr>
<td>插入排序</td>
<td>O(n²)</td>
<td>O(n)</td>
<td>O(n²)</td>
<td>O(1)</td>
<td>稳定</td>
</tr>
<tr>
<td>桶排序</td>
<td>O(n+k)</td>
<td>O(n+k)</td>
<td>O(n²)</td>
<td>O(n+k)</td>
<td>(不)稳定</td>
</tr>
</tbody>
</table>
<p>注: 桶排序的稳定性取决于桶内排序的稳定性, 因此其稳定性不确定。</p>
<p><strong>算法时间复杂度</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在进行算法分析时，语句总的执行次数T(n)是关于问题规模n的函数，
进而分析T(n)随着n的变化情况并确定T(n)的数量级。
算法的时间复杂度，也就是算法的时间度量，记作：T(n)=O(f(n))。
它表示随问题规模n的增大，算法执行时间的增长率和f(n)的增长率相同，
称作算法的时间复杂度，简称为时间复杂度。
其中f(n)是问题规模n的某个函数。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>在进行算法分析时，语句总的执行次数<span class="hljs-built_in">T</span>(<span class="hljs-built_in">n</span>)是关于问题规模<span class="hljs-built_in">n</span>的函数，
进而分析<span class="hljs-built_in">T</span>(<span class="hljs-built_in">n</span>)随着<span class="hljs-built_in">n</span>的变化情况并确定<span class="hljs-built_in">T</span>(<span class="hljs-built_in">n</span>)的数量级。
算法的时间复杂度，也就是算法的时间度量，记作：<span class="hljs-built_in">T</span>(<span class="hljs-built_in">n</span>)=O(f(<span class="hljs-built_in">n</span>))。
它表示随问题规模<span class="hljs-built_in">n</span>的增大，算法执行时间的增长率和f(<span class="hljs-built_in">n</span>)的增长率相同，
称作算法的时间复杂度，简称为时间复杂度。
其中f(<span class="hljs-built_in">n</span>)是问题规模<span class="hljs-built_in">n</span>的某个函数。
</code></pre>
<p><strong>常用的时间复杂度所耗费的时间从小到大依次是</strong></p>
<p>O(1) &lt; O(logn) &lt; O(n) &lt; O(nlogn) &lt; O(n²) &lt; O(n³) &lt; O(2^n) &lt; O(n!) &lt; O(n^n)</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010648745" src="https://static.alili.tech/img/remote/1460000010648745" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://bigocheatsheet.com/" rel="nofollow noreferrer" target="_blank">图片来源</a></p>
<p>算法的时间复杂度与运行时间有一些常见的比例关系 <a href="http://www.cnblogs.com/gaochundong/p/complexity_of_algorithms.html" rel="nofollow noreferrer" target="_blank">查看图表来源</a></p>
<table>
<thead><tr>
<th>复杂度</th>
<th>10</th>
<th>20</th>
<th>50</th>
<th>100</th>
<th>1,000</th>
<th>10,000</th>
<th>100,000</th>
</tr></thead>
<tbody>
<tr>
<td>O(1)</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
</tr>
<tr>
<td>O(log(n))</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
</tr>
<tr>
<td>O(n)</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
</tr>
<tr>
<td>O(n*log(n))</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
</tr>
<tr>
<td>O(n²)</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>2 s</td>
<td colspan="2">3-4 min</td>
</tr>
<tr>
<td>O(n³)</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>20 s</td>
<td>5 hours</td>
<td>231 days</td>
</tr>
<tr>
<td>O(2^n)</td>
<td>&lt; 1s</td>
<td>&lt; 1s</td>
<td>260 days</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
</tr>
<tr>
<td>O(n!)</td>
<td>&lt; 1s</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
</tr>
<tr>
<td>O(n^n)</td>
<td>3-4 min</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
<td>hangs</td>
</tr>
</tbody>
</table>
<p><strong>维基百科关于算法稳定性的解释</strong></p>
<blockquote><p>当相等的元素是无法分辨的，比如像是整数，稳定性并不是一个问题。然而，假设以下的数对将要以他们的第一个数字来排序。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(4, 1)  (3, 1)  (3, 7)（5, 6）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-number">4</span>, <span class="hljs-number">1</span>)  (<span class="hljs-number">3</span>, <span class="hljs-number">1</span>)  (<span class="hljs-number">3</span>, <span class="hljs-number">7</span>)（<span class="hljs-number">5</span>, <span class="hljs-number">6</span>）</code></pre>
<p>在这个状况下，有可能产生两种不同的结果，一个是让相等键值的纪录维持相对的次序，而另外一个则没有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(3, 1)  (3, 7)  (4, 1)  (5, 6)  (维持次序）
(3, 7)  (3, 1)  (4, 1)  (5, 6) （次序被改变）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">3</span>, <span class="hljs-number">1</span>)  (<span class="hljs-name">3</span>, <span class="hljs-number">7</span>)  (<span class="hljs-name">4</span>, <span class="hljs-number">1</span>)  (<span class="hljs-name">5</span>, <span class="hljs-number">6</span>)  (<span class="hljs-name">维持次序）</span>
(<span class="hljs-name">3</span>, <span class="hljs-number">7</span>)  (<span class="hljs-name">3</span>, <span class="hljs-number">1</span>)  (<span class="hljs-name">4</span>, <span class="hljs-number">1</span>)  (<span class="hljs-name">5</span>, <span class="hljs-number">6</span>) （次序被改变）</code></pre>
<p><strong>想看自己浏览器排序算法的稳定性？</strong> <a href="http://ofb.net/~sethml/is-sort-stable.html" rel="nofollow noreferrer" target="_blank">点我</a></p>
<h2 id="articleHeader4">各种排序算法实现有多快？</h2>
<p>我们先通过这个<a href="http://math.hws.edu/eck/js/sorting/xSortLab.html" rel="nofollow noreferrer" target="_blank">在线网站</a>大体测试一下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010649491" src="https://static.alili.tech/img/remote/1460000010649491" alt="" title="" style="cursor: pointer;"></span></p>
<p>对一个有 10000 个元素的数组，快速排序 &gt; 归并排序 &gt;&gt;&gt; 插入排序<br>而且插入排序大于 1s 了。</p>
<p>对于一个只有 10 个元素的数组，插入排序 &gt; 快速排序<br>这也说明了为什么 <code>chrome</code> 在小于等于 10 个元素的小数组使用插入排序的原因了。</p>
<h2 id="articleHeader5">浏览器的实现不同有什么影响</h2>
<p>排序算法不稳定有什么影响</p>
<p>举个例子：</p>
<p>某市的机动车牌照拍卖系统，最终中标的规则为：</p>
<p>1、按价格进行倒排序；</p>
<p>2、相同价格则按照竞标顺位（即价格提交时间）进行正排序。</p>
<p>排序若是在前端进行，那么采用快速排序的浏览器中显示的中标者很可能是不符合预期的。</p>
<p><strong>解决办法</strong></p>
<p><a href="http://ued.ctrip.com/blog/array-prototype-sort-differences-in-different-browsers-and-solution.html" rel="nofollow noreferrer" target="_blank">Array.prototype.sort 在不同浏览器中的差异和解决办法</a></p>
<p>大体的思路就是，自己写一个稳定的排序函数，以保持各浏览器的一致性。</p>
<h2 id="articleHeader6">工具</h2>
<p>1、<a href="http://math.hws.edu/eck/js/sorting/xSortLab.html" rel="nofollow noreferrer" target="_blank">在线排序算法对比网站</a><br>2、<a href="http://jsdo.it/norahiko/oxIy/fullscreen" rel="nofollow noreferrer" target="_blank">排序算法视觉图</a></p>
<h2 id="articleHeader7">扩展阅读</h2>
<p>1、<a href="http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html?bsh2" rel="nofollow noreferrer" target="_blank">快速排序（Quicksort）的Javascript实现</a><br>2、<a href="http://louiszhai.github.io/2016/12/23/sort/#" rel="nofollow noreferrer" target="_blank">JS中可能用得到的全部的排序算法</a><br>3、<a href="http://www.cnblogs.com/tsingke/p/5347660.html" rel="nofollow noreferrer" target="_blank">7 种常用的排序算法-可视化</a><br>4、<a href="http://www.iteye.com/topic/1138374" rel="nofollow noreferrer" target="_blank">深入了解javascript的sort方法</a><br>5、<a href="http://www.qcyoung.com/2016/12/18/JavaScript%20%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%B1%87%E6%80%BB/" rel="nofollow noreferrer" target="_blank">JavaScript 排序算法汇总</a></p>
<h2 id="articleHeader8">参考文档</h2>
<p><a href="http://efe.baidu.com/blog/talk-about-sort-in-front-end/" rel="nofollow noreferrer" target="_blank">聊聊前端排序的那些事</a><br><a href="https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95#.E7.A9.A9.E5.AE.9A.E6.80.A7" rel="nofollow noreferrer" target="_blank">排序算法</a><br><a href="http://www.qcyoung.com/2016/12/18/JavaScript%20%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%B1%87%E6%80%BB/" rel="nofollow noreferrer" target="_blank">JavaScript排序算法汇总</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出 JavaScript 的 Array.prototype.sort 排序算法

## 原文链接
[https://segmentfault.com/a/1190000010648740](https://segmentfault.com/a/1190000010648740)


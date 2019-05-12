---
title: '处理for-in用在数组上时候出现的诡异现象的问题' 
date: 2019-01-02 2:30:09
hidden: true
slug: 22dz06pd45s
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">问题复现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a', 'b', 'c'];
var sid = ['Go'];
for (var key in arr) {
    sid[key + 1] = arr[key];
}
console.log(sid)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-keyword">var</span> sid = [<span class="hljs-string">'Go'</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> arr) {
    sid[key + <span class="hljs-number">1</span>] = arr[key];
}
<span class="hljs-built_in">console</span>.log(sid)</code></pre>
<p>很简单的问题，最后的输出结果却是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ 'Go', , , , , , , , , , , 'b', , , , , , , , , , 'c' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[ <span class="hljs-string">'Go'</span>, , , , , , , , , , , <span class="hljs-string">'b'</span>, , , , , , , , , , <span class="hljs-string">'c'</span> ]</code></pre>
<h3 id="articleHeader1">问题分析</h3>
<p>通过上面的输入结果我们可以发现这么几个问题：</p>
<ol>
<li><p><code>sid</code>里面多了很多空项，<code>length</code>明显的增多了</p></li>
<li><p><code>arr[0]</code>的值在<code>sid</code>中没有出现</p></li>
</ol>
<h4>问题1：<code>sid</code>里面多了很多空项，<code>length</code>明显的增多了</h4>
<p>略过痛苦的分析步骤直接来重点内容：<br>通过打印<code>key + 1</code>我们可以找到问题的关键。通过打印我们可以得到如下信息。<br>在第一次循环的时候<code>key + 1</code>的值为<code>01</code>，此后依次为：<code>11</code>,<code>21</code>。<br>通过这个我们可以判断: <strong>这个<code>key</code>其实是一个<code>String</code>类型的</strong>。<br>所以上面的步骤相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sid['01'] = arr[0];
sid['11'] = arr[1];
sid['21'] = arr[2];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">sid[<span class="hljs-string">'01'</span>] = arr[<span class="hljs-number">0</span>];
sid[<span class="hljs-string">'11'</span>] = arr[<span class="hljs-number">1</span>];
sid[<span class="hljs-string">'21'</span>] = arr[<span class="hljs-number">2</span>];</code></pre>
<p>究其原因，我只能在浅层面作出解释：<br>这可能是因为<code>for-in</code>一般是用于对象的（狭义的对象），而对象的属性是一个<code>String</code>类型，所以<code>for-in</code>的参数<code>key</code>被定义为一个<code>String</code>类型。这并没有考虑过数组的属性名（下标）不是<code>String</code>类型，而是一个<code>Number</code>类型的情况。所以就出现了上面的问题。此外在<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in" rel="nofollow noreferrer" target="_blank">MDN的js语法</a>关于<code>for-in</code>这块出现过这样的提示：</p>
<blockquote><p>Note: for..in 不应该被用来迭代一个下标顺序很重要的 Array .</p></blockquote>
<p>可能就包含这种情况吧。</p>
<h4>问题2：<code>arr[0]</code>的值在<code>sid</code>中没有出现</h4>
<p><code>arr[0]</code>的值其实通过<code>sid['01']</code>可以取到。<br>此外，在<code>node</code>下打印<code>sid</code>的时候可能与在<code>console</code>中打印出现不同的结果。</p>
<h3 id="articleHeader2">问题解决</h3>
<p>对于数组的遍历，最好使用：<code>forEach</code>,<code>map</code>,<code>some</code>,<code>filter</code>,<code>find</code>等方法。尤其是是这种牵扯到数组下标的尽量不要使用<code>for-in</code>来处理，如果非要使用可以做如下处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a', 'b', 'c'];
var sid = ['Go'];
for (var key in arr) {
    sid[parseInt(key) + 1] = arr[key];
}
console.log(sid)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-keyword">var</span> sid = [<span class="hljs-string">'Go'</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> arr) {
    sid[<span class="hljs-built_in">parseInt</span>(key) + <span class="hljs-number">1</span>] = arr[key];
}
<span class="hljs-built_in">console</span>.log(sid)</code></pre>
<p>以避免如上的问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
处理for-in用在数组上时候出现的诡异现象的问题

## 原文链接
[https://segmentfault.com/a/1190000010974835](https://segmentfault.com/a/1190000010974835)


---
title: 'js数组操作大全' 
date: 2019-01-10 2:30:08
hidden: true
slug: sv2zzes3lh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">栈方法</h2>
<p>栈是一种LIFO（Last-In-First-Out,后进先出）的数据结构。</p>
<ul>
<li>
<strong>push：</strong> 接受任意数量的参数，逐个添加至数组的末尾，返回修改后数组的长度</li>
<li>
<strong>pop：</strong> 从数组末尾一处最后一项，减少数组length,返回被移除的项</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如：
var arr = [];
arr.push('a', 'b');   //2
arr.pop();   //b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>如：
var arr = [];
arr.<span class="hljs-keyword">push</span>(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>);   <span class="hljs-comment">//2</span>
arr.<span class="hljs-keyword">pop</span>();   <span class="hljs-comment">//b</span></code></pre>
<h2 id="articleHeader1">队列方法</h2>
<p>队列是一种FIFO（First-In-First-Out）的数据结构</p>
<ul>
<li>
<strong>shift:</strong> 移除数组的第一项，，length减1，返回被移除项</li>
<li>
<strong>unshift:</strong> 添加任意项至数组的前端，并返回数组长度</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如：
var arr = ['a', 'b'];
arr.shift();   //a
arr.unshift('c', 'd');   //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>如：
<span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>];
arr.shift();   <span class="hljs-comment">//a</span>
arr.unshift(<span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>);   <span class="hljs-comment">//3</span></code></pre>
<h2 id="articleHeader2">重排序方法</h2>
<ul>
<li>
<strong>reverse：</strong> 反转原数组的顺序</li>
<li>
<strong>sort: </strong> 按升序排序数组项。此方法会先调用每个数组项的toString()，然后比较得到的字符串来确定排序。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如：
var arr = [1,4,12,3];
arr.reverse(); //[3,12,4,1]
arr.sort();    //[1,12,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>如：
var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">12</span>,<span class="hljs-number">3</span>];
arr.reverse(); <span class="hljs-comment">//[3,12,4,1]</span>
arr.sort();    <span class="hljs-comment">//[1,12,3,4]</span></code></pre>
<p>sort可以接受一个比较函数作为参数。比较函数接收两个参数，如果第一个参数应该位于第二个之前，返回负值，如果相等返回0，否则返回正数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如：
var compare = function (v1, v2) {
    if(v1 < v2){
        return -1;
    }else if (v1 === v2) {
        return 0;
    } else{
        return 1;
    }
};

arr.sort(compare);   //[1,3,4,12]   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>如：
<span class="hljs-keyword">var</span> compare = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(v1, v2)</span> </span>{
    <span class="hljs-keyword">if</span>(v1 &lt; v2){
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (v1 === v2) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    } <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    }
};

arr.sort(compare);   <span class="hljs-comment">//[1,3,4,12]   </span></code></pre>
<h2 id="articleHeader3">操作方法</h2>
<ul>
<li>
<strong>concat:</strong>  该方法溴铵创建当前数组的一个副本，然后将参数添加至副本的末尾，返回新创建的副本数组</li>
<li>
<strong>slice：</strong>  该方法基于数组中的一个或多个项创建新的数组。接受两个参数，及返回项的起始位置和结束位置</li>
<li>
<strong>splice：</strong> <br><strong>删除：</strong> 提供2个参数：起始位置，要删除的项数。 <br><strong>添加：</strong> 提供3个参数：起始位置，0（要删除的项），要插入的项<br><strong>替换：</strong> 提供3个参数： 起始位置，要删除的项数，要插入的任意数量的项</li>
</ul>
<hr>
<p>注意，concat、slice不会改变原数组的值，都返回一个新的数组。splice改变了原来的数组，都返回一个数组，如果是删除，则返回被删除的项，如果没有删除任何项，则返回空数组</p>
<h2 id="articleHeader4">位置方法</h2>
<ul>
<li><strong>indexOf:</strong></li>
<li><strong>lastIndexOf:</strong></li>
</ul>
<h2 id="articleHeader5">迭代方法</h2>
<ul>
<li><strong>every:</strong></li>
<li><strong>filter:</strong></li>
<li><strong>foreach:</strong></li>
<li><strong>map:</strong></li>
<li><strong>some:</strong></li>
</ul>
<h2 id="articleHeader6">归并方法</h2>
<ul>
<li><strong>reduce:</strong></li>
<li><strong>reduceRigth:</strong></li>
</ul>
<hr>
<p>关注作者吧~</p>
<p><span class="img-wrap"><img data-src="/img/bVTRS4?w=129&amp;h=129" src="https://static.alili.tech/img/bVTRS4?w=129&amp;h=129" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js数组操作大全

## 原文链接
[https://segmentfault.com/a/1190000009988697](https://segmentfault.com/a/1190000009988697)


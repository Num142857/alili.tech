---
title: '用Set为数组去重' 
date: 2019-01-16 2:30:08
hidden: true
slug: dq9drsomcv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Set简介</h2>
<p><code>Set</code>是ES6中新的对象，今日偶然接触,发现利用它可以迅速为数组去重，<strong>只需要两行代码</strong>！</p>
<blockquote><p>集合（Set）对象允许你存储任意类型的唯一值（不能重复），无论它是原始值或者是对象引用。</p></blockquote>
<h3 id="articleHeader1">使用示例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add(&quot;some text&quot;);

mySet.has(1); // true
mySet.has(3); // false, 3还没有被添加到set中
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has(&quot;Some Text&quot;.toLowerCase()); // true

mySet.size; // 3

mySet.delete(5); // 从set中移除5
mySet.has(5);    // false, 5已经被移除

mySet.size; // 2, 我们刚刚移除了一个值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> mySet = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Set</span>();

<span class="hljs-title">mySet</span>.<span class="hljs-title">add</span>(<span class="hljs-number">1</span>);
<span class="hljs-title">mySet</span>.<span class="hljs-title">add</span>(<span class="hljs-number">5</span>);
<span class="hljs-title">mySet</span>.<span class="hljs-title">add</span>("some text");

<span class="hljs-title">mySet</span>.<span class="hljs-title">has</span>(<span class="hljs-number">1</span>); <span class="hljs-comment">// true</span>
<span class="hljs-title">mySet</span>.<span class="hljs-title">has</span>(<span class="hljs-number">3</span>); <span class="hljs-comment">// false, 3还没有被添加到set中</span>
<span class="hljs-title">mySet</span>.<span class="hljs-title">has</span>(<span class="hljs-number">5</span>);              <span class="hljs-comment">// true</span>
<span class="hljs-title">mySet</span>.<span class="hljs-title">has</span>(<span class="hljs-type">Math</span>.sqrt(<span class="hljs-number">25</span>));  <span class="hljs-comment">// true</span>
<span class="hljs-title">mySet</span>.<span class="hljs-title">has</span>("<span class="hljs-type">Some</span> <span class="hljs-type">Text</span>".toLowerCase()); <span class="hljs-comment">// true</span>

<span class="hljs-title">mySet</span>.<span class="hljs-title">size</span>; <span class="hljs-comment">// 3</span>

<span class="hljs-title">mySet</span>.<span class="hljs-title">delete</span>(<span class="hljs-number">5</span>); <span class="hljs-comment">// 从set中移除5</span>
<span class="hljs-title">mySet</span>.<span class="hljs-title">has</span>(<span class="hljs-number">5</span>);    <span class="hljs-comment">// false, 5已经被移除</span>

<span class="hljs-title">mySet</span>.<span class="hljs-title">size</span>; <span class="hljs-comment">// 2, 我们刚刚移除了一个值</span></span></code></pre>
<p>简单来说，<code>Set</code>于<code>Array</code>的区别在于：<code>Array</code>中允许出现重复的元素，例如<code>[1,2,2,3]</code>；而<code>Set</code>中的所有元素都是唯一的，只能是<code>{1,2,3}</code>。利用这一特性，我们就可以迅速地去掉数组中重复的元素。</p>
<h2 id="articleHeader2">数组去重</h2>
<p>废话不多说，直接看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,2,3,4] // 需要去重的数组

var set = new Set(arr) // {1,2,3,4}
var newArr = Array.from(set) // 再把set转变成array

console.log(newArr) // [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>] <span class="hljs-comment">// 需要去重的数组</span>

<span class="hljs-keyword">var</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Set</span>(arr) <span class="hljs-comment">// {1,2,3,4}</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = <span class="hljs-keyword">Array</span>.from(<span class="hljs-keyword">set</span>) <span class="hljs-comment">// 再把set转变成array</span>

console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>) <span class="hljs-comment">// [1,2,3,4]</span></code></pre>
<p>当然数组去重的方法有许许多多，只是刚才被set爽到了，所以才写下这篇文章。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Set为数组去重

## 原文链接
[https://segmentfault.com/a/1190000009122238](https://segmentfault.com/a/1190000009122238)


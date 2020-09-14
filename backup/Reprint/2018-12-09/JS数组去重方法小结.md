---
title: 'JS数组去重方法小结' 
date: 2018-12-09 2:30:08
hidden: true
slug: a2b69jmmlof
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JS数组去重</h2>
<p>看了网上很多数组去重方法，用的比较常见的大概就几种，今天想自己来做一个总结。<br><a href="https://www.cnblogs.com/rongy/p/6597014.html" rel="nofollow noreferrer" target="_blank">部分内容参考该博客</a></p>
<hr>
<p>1 . 在原数组上操作（基本方法）<br>  思路：利用循环嵌套，判断数组中每个元素与其后面的元素是否相等，如果相等，就使用splice方法删掉后面的元素，注意j--。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dedupe2(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dedupe2</span><span class="hljs-params">(arr)</span> </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; arr.length; j++) {
            <span class="hljs-keyword">if</span> (arr[i] == arr[j]) {
                arr.splice(j, <span class="hljs-number">1</span>);
                j--;
            }
        }
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre>
<p>2 . 数组去重后返回一个新数组</p>
<p>思路：新建一个数组，遍历需要去重的数组，使用indexOf判断新数组中是否包含之前数组中每一项，不包含就push进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dedupe1(arr) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newarr.indexOf(arr[i]) == -1) {
            newarr.push(arr[i]);
        }
    }
    return newarr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dedupe1</span></span>(arr) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">arr</span> = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">arr</span>.indexOf(arr[i]) == <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">new</span><span class="hljs-type">arr</span>.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">arr</span>;
}</code></pre>
<p>3 . 利用对象的属性去重<br>  思路：每次从数组中取出一个元素，到对象中去访问这个属性，如果能访问到就说明重复。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dedupe3(arr) {
    var newarr = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            newarr.push(arr[i]);
            obj[arr[i]] = 1;
        }
    }
    return newarr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dedupe3</span></span>(arr) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">arr</span> = [];
    <span class="hljs-keyword">var</span> obj = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (!obj[arr[i]]) {
            <span class="hljs-keyword">new</span><span class="hljs-type">arr</span>.push(arr[i]);
            obj[arr[i]] = <span class="hljs-number">1</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">arr</span>;
}</code></pre>
<p>4 . 利用ES6中的Set数据结构和扩展运算符（参考ES6标准入门）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...new Set([array])];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-name">...new</span> Set([<span class="hljs-name">array</span>])]<span class="hljs-comment">;</span></code></pre>
<p>5 . 还是利用ES6中的Set</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dedupe4(arr) {
    return Array.from(new Set(arr));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dedupe4</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr));
}</code></pre>
<hr>
<p>当然，数组去重的方法还有很多很多很多，例如常用的先排序后去重，但是我看了一些帖子，发现其中存在一些问题，排序时是用到了sort方法，但是并没有给sort方法一个正确的排序函数，默认情况下sort方法比较的是字符串，因此会出现一些问题。还有就是sort方法返回的数组也是排序后的数组，某些情况下可能不符合要求。</p>
<p>以上只是个人的一个小总结，代码都是经过测试后的，有问题请指正，也欢迎大家补充，谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS数组去重方法小结

## 原文链接
[https://segmentfault.com/a/1190000013965432](https://segmentfault.com/a/1190000013965432)


---
title: 'JavaScript专题之深浅拷贝' 
date: 2019-01-09 2:30:11
hidden: true
slug: oknv8gevrsn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第六篇，讲解深浅拷贝的技巧和以及实现深浅拷贝的思路</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>拷贝也是面试经典呐！</p>
<h2 id="articleHeader1">数组的浅拷贝</h2>
<p>如果是数组，我们可以利用数组的一些方法比如：slice、concat 返回一个新数组的特性来实现拷贝。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // [&quot;old&quot;, 1, true, null, undefined]
console.log(new_arr) // [&quot;new&quot;, 1, true, null, undefined]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'old'</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">undefined</span>];

<span class="hljs-keyword">var</span> new_arr = arr.concat();

new_arr[<span class="hljs-number">0</span>] = <span class="hljs-string">'new'</span>;

<span class="hljs-built_in">console</span>.log(arr) <span class="hljs-comment">// ["old", 1, true, null, undefined]</span>
<span class="hljs-built_in">console</span>.log(new_arr) <span class="hljs-comment">// ["new", 1, true, null, undefined]</span></code></pre>
<p>用 slice 可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var new_arr = arr.slice();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> new_arr = arr.slice();</code></pre>
<p>但是如果数组嵌套了对象或者数组的话，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [{old: 'old'}, ['old']];

var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [{<span class="hljs-attr">old</span>: <span class="hljs-string">'old'</span>}, [<span class="hljs-string">'old'</span>]];

<span class="hljs-keyword">var</span> new_arr = arr.concat();

arr[<span class="hljs-number">0</span>].old = <span class="hljs-string">'new'</span>;
arr[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>] = <span class="hljs-string">'new'</span>;

<span class="hljs-built_in">console</span>.log(arr) <span class="hljs-comment">// [{old: 'new'}, ['new']]</span>
<span class="hljs-built_in">console</span>.log(new_arr) <span class="hljs-comment">// [{old: 'new'}, ['new']]</span></code></pre>
<p>我们会发现，无论是新数组还是旧数组都发生了变化，也就是说使用 concat 方法，克隆的并不彻底。</p>
<p>如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。</p>
<p>我们把这种复制引用的拷贝方法称之为浅拷贝，与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。</p>
<p>所以我们可以看出使用 concat 和 slice 是一种浅拷贝。</p>
<h2 id="articleHeader2">数组的深拷贝</h2>
<p>那如何深拷贝一个数组呢？这里介绍一个技巧，不仅适用于数组还适用于对象！那就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

var new_arr = JSON.parse( JSON.stringify(arr) );

console.log(new_arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'old'</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">true</span>, [<span class="hljs-string">'old1'</span>, <span class="hljs-string">'old2'</span>], {<span class="hljs-attr">old</span>: <span class="hljs-number">1</span>}]

<span class="hljs-keyword">var</span> new_arr = <span class="hljs-built_in">JSON</span>.parse( <span class="hljs-built_in">JSON</span>.stringify(arr) );

<span class="hljs-built_in">console</span>.log(new_arr);</code></pre>
<p>是一个简单粗暴的好方法，就是有一个问题，不能拷贝函数，我们做个试验：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [function(){
    console.log(a)
}, {
    b: function(){
        console.log(b)
    }
}]

var new_arr = JSON.parse(JSON.stringify(arr));

console.log(new_arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(a)
}, {
    <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(b)
    }
}]

<span class="hljs-keyword">var</span> new_arr = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(arr));

<span class="hljs-built_in">console</span>.log(new_arr);</code></pre>
<p>我们会发现 new_arr 变成了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010150239" src="https://static.alili.tech/img/remote/1460000010150239" alt="不能拷贝函数" title="不能拷贝函数" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">浅拷贝的实现</h2>
<p>以上三个方法 concat、slice、JSON.stringify 都算是技巧类，可以根据实际项目情况选择使用，接下来我们思考下如何实现一个对象或者数组的浅拷贝。</p>
<p>想一想，好像很简单，遍历对象，然后把属性和属性值都放在一个新的对象不就好了~</p>
<p>嗯，就是这么简单，注意几个小点就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> shallowCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// 只拷贝对象</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">// 根据obj的类型判断是新建一个数组还是对象</span>
    <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
    <span class="hljs-comment">// 遍历obj，并且判断是obj的属性才拷贝</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    <span class="hljs-keyword">return</span> newObj;
}</code></pre>
<h2 id="articleHeader4">深拷贝的实现</h2>
<p>那如何实现一个深拷贝呢？说起来也好简单，我们在拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数不就好了~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> deepCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
            newObj[key] = <span class="hljs-keyword">typeof</span> obj[key] === <span class="hljs-string">'object'</span> ? deepCopy(obj[key]) : obj[key];
        }
    }
    <span class="hljs-keyword">return</span> newObj;
}</code></pre>
<h2 id="articleHeader5">性能问题</h2>
<p>尽管使用深拷贝会完全的克隆一个新对象，不会产生副作用，但是深拷贝因为使用递归，性能会不如浅拷贝，在开发中，还是要根据实际情况进行选择。</p>
<h2 id="articleHeader6">下期预告</h2>
<p>难道到这里就结束了？是的。然而本篇实际上是一个铺垫，我们真正要看的是 jquery 的 extend 函数的实现，下一篇，我们会讲一讲如何从零实现一个 jquery 的 extend 函数。</p>
<h2 id="articleHeader7">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之深浅拷贝

## 原文链接
[https://segmentfault.com/a/1190000010150234](https://segmentfault.com/a/1190000010150234)


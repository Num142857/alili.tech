---
title: 'JavaScript专题之学underscore在数组中查找指定元素' 
date: 2019-01-07 2:30:10
hidden: true
slug: djpjoqkdej8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript专题系列第十篇，讲解如何从数组中查找指定元素，并且跟着 undersocre 实现 findIndex 和 findLastIndex、sortedIndex、indexOf 和 lastIndexOf</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在开发中，我们经常会遇到在数组中查找指定元素的需求，可能大家觉得这个需求过于简单，然而如何优雅的去实现一个 findIndex 和 findLastIndex、indexOf 和 lastIndexOf 方法却是很少人去思考的。本文就带着大家一起参考着 underscore 去实现这些方法。</p>
<p>在实现前，先看看 ES6 的 findIndex 方法，让大家了解 findIndex 的使用方法。</p>
<h2 id="articleHeader1">findIndex</h2>
<p>ES6 对数组新增了 findIndex 方法，它会返回数组中满足提供的函数的第一个元素的索引，否则返回 -1。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isBigEnough(element) {
  return element >= 15;
}

[12, 5, 8, 130, 44].findIndex(isBigEnough);  // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isBigEnough</span>(<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">return</span> element &gt;= <span class="hljs-number">15</span>;
}

[<span class="hljs-number">12</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">130</span>, <span class="hljs-number">44</span>].findIndex(isBigEnough);  <span class="hljs-comment">// 3</span></code></pre>
<p>findIndex 会找出第一个大于 15 的元素的下标，所以最后返回 3。</p>
<p>是不是很简单，其实，我们自己去实现一个 findIndex 也很简单。</p>
<h2 id="articleHeader2">实现findIndex</h2>
<p>思路自然很明了，遍历一遍，返回符合要求的值的下标即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findIndex(array, predicate, context) {
    for (var i = 0; i < array.length; i++) {
        if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
}

console.log(findIndex([1, 2, 3, 4], function(item, i, array){
    if (item == 3) return true;
})) // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findIndex</span>(<span class="hljs-params">array, predicate, context</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; array.length; i++) {
        <span class="hljs-keyword">if</span> (predicate.call(context, array[i], i, array)) <span class="hljs-keyword">return</span> i;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
}

<span class="hljs-built_in">console</span>.log(findIndex([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, i, array</span>)</span>{
    <span class="hljs-keyword">if</span> (item == <span class="hljs-number">3</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
})) <span class="hljs-comment">// 2</span></code></pre>
<h2 id="articleHeader3">findLastIndex</h2>
<p>findIndex 是正序查找，但正如 indexOf 还有一个对应的 lastIndexOf 方法，我们也想写一个倒序查找的 findLastIndex 函数。实现自然也很简单，只要修改下循环即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findLastIndex(array, predicate, context) {
    var length = array.length;
    for (var i = length; i >= 0; i--) {
        if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
}

console.log(findLastIndex([1, 2, 3, 4], function(item, index, array){
    if (item == 1) return true;
})) // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findLastIndex</span>(<span class="hljs-params">array, predicate, context</span>) </span>{
    <span class="hljs-keyword">var</span> length = array.length;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = length; i &gt;= <span class="hljs-number">0</span>; i--) {
        <span class="hljs-keyword">if</span> (predicate.call(context, array[i], i, array)) <span class="hljs-keyword">return</span> i;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
}

<span class="hljs-built_in">console</span>.log(findLastIndex([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, array</span>)</span>{
    <span class="hljs-keyword">if</span> (item == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
})) <span class="hljs-comment">// 0</span></code></pre>
<h2 id="articleHeader4">createIndexFinder</h2>
<p>然而问题在于，findIndex 和 findLastIndex 其实有很多重复的部分，如何精简冗余的内容呢？这便是我们要学习的地方，日后面试问到此类问题，也是加分的选项。</p>
<p>underscore 的思路就是利用传参的不同，返回不同的函数。这个自然是简单，但是如何根据参数的不同，在同一个循环中，实现正序和倒序遍历呢？</p>
<p>让我们直接模仿 underscore 的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createIndexFinder(dir) {
    return function(array, predicate, context) {

        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;

        for (; index >= 0 &amp;&amp; index < length; index += dir) {
            if (predicate.call(context, array[index], index, array)) return index;
        }

        return -1;
    }
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIndexFinder</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, predicate, context</span>) </span>{

        <span class="hljs-keyword">var</span> length = array.length;
        <span class="hljs-keyword">var</span> index = dir &gt; <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : length - <span class="hljs-number">1</span>;

        <span class="hljs-keyword">for</span> (; index &gt;= <span class="hljs-number">0</span> &amp;&amp; index &lt; length; index += dir) {
            <span class="hljs-keyword">if</span> (predicate.call(context, array[index], index, array)) <span class="hljs-keyword">return</span> index;
        }

        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }
}

<span class="hljs-keyword">var</span> findIndex = createIndexFinder(<span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> findLastIndex = createIndexFinder(<span class="hljs-number">-1</span>);</code></pre>
<h2 id="articleHeader5">sortedIndex</h2>
<p>findIndex 和 findLastIndex 的需求算是结束了，但是又来了一个新需求：在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。</p>
<p>假设该函数命名为 sortedIndex，效果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sortedIndex([10, 20, 30], 25); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">sortedIndex([<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>], <span class="hljs-number">25</span>); <span class="hljs-comment">// 2</span></code></pre>
<p>也就是说如果，注意是如果，25 按照此下标插入数组后，数组变成 [10, 20, 25, 30]，数组依然是有序的状态。</p>
<p>那么这个又该如何实现呢？</p>
<p>既然是有序的数组，那我们就不需要遍历，大可以使用二分查找法，确定值的位置。让我们尝试着去写一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function sortedIndex(array, obj) {

    var low = 0, high = array.length;

    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (array[mid] < obj) low = mid + 1;
        else high = mid;
    }

    return high;
};

console.log(sortedIndex([10, 20, 30, 40, 50], 35)) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortedIndex</span>(<span class="hljs-params">array, obj</span>) </span>{

    <span class="hljs-keyword">var</span> low = <span class="hljs-number">0</span>, high = array.length;

    <span class="hljs-keyword">while</span> (low &lt; high) {
        <span class="hljs-keyword">var</span> mid = <span class="hljs-built_in">Math</span>.floor((low + high) / <span class="hljs-number">2</span>);
        <span class="hljs-keyword">if</span> (array[mid] &lt; obj) low = mid + <span class="hljs-number">1</span>;
        <span class="hljs-keyword">else</span> high = mid;
    }

    <span class="hljs-keyword">return</span> high;
};

<span class="hljs-built_in">console</span>.log(sortedIndex([<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>], <span class="hljs-number">35</span>)) <span class="hljs-comment">// 3</span></code></pre>
<p>现在的方法虽然能用，但通用性不够，比如我们希望能处理这样的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
    return stooge.age
});

console.log(result) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// stooges 配角 比如 三个臭皮匠 The Three Stooges</span>
<span class="hljs-keyword">var</span> stooges = [{<span class="hljs-attr">name</span>: <span class="hljs-string">'stooge1'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">10</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'stooge2'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>}];

<span class="hljs-keyword">var</span> result = sortedIndex(stooges, {<span class="hljs-attr">name</span>: <span class="hljs-string">'stooge3'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stooge</span>)</span>{
    <span class="hljs-keyword">return</span> stooge.age
});

<span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 1</span></code></pre>
<p>所以我们还需要再加上一个参数 iteratee 函数对数组的每一个元素进行处理，一般这个时候，还会涉及到 this 指向的问题，所以我们再传一个 context 来让我们可以指定 this，那么这样一个函数又该如何写呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function cb(fn, context) {
    return function(obj) {
        return fn ? fn.call(context, obj) : obj;
    }
}

function sortedIndex(array, obj, iteratee, context) {

    iteratee = cb(iteratee, context)

    var low = 0, high = array.length;
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
        else high = mid;
    }
    return high;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cb</span>(<span class="hljs-params">fn, context</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">return</span> fn ? fn.call(context, obj) : obj;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortedIndex</span>(<span class="hljs-params">array, obj, iteratee, context</span>) </span>{

    iteratee = cb(iteratee, context)

    <span class="hljs-keyword">var</span> low = <span class="hljs-number">0</span>, high = array.length;
    <span class="hljs-keyword">while</span> (low &lt; high) {
        <span class="hljs-keyword">var</span> mid = <span class="hljs-built_in">Math</span>.floor((low + high) / <span class="hljs-number">2</span>);
        <span class="hljs-keyword">if</span> (iteratee(array[mid]) &lt; iteratee(obj)) low = mid + <span class="hljs-number">1</span>;
        <span class="hljs-keyword">else</span> high = mid;
    }
    <span class="hljs-keyword">return</span> high;
};</code></pre>
<h2 id="articleHeader6">indexOf</h2>
<p>sortedIndex 也完成了，现在我们尝试着去写一个 indexOf 和 lastIndexOf 函数，学习 findIndex 和 FindLastIndex 的方式，我们写一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function createIndexOfFinder(dir) {
    return function(array, item){
        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 &amp;&amp; index < length; index += dir) {
            if (array[index] === item) return index;
        }
        return -1;
    }
}

var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);

var result = indexOf([1, 2, 3, 4, 5], 2);

console.log(result) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIndexOfFinder</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, item</span>)</span>{
        <span class="hljs-keyword">var</span> length = array.length;
        <span class="hljs-keyword">var</span> index = dir &gt; <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : length - <span class="hljs-number">1</span>;
        <span class="hljs-keyword">for</span> (; index &gt;= <span class="hljs-number">0</span> &amp;&amp; index &lt; length; index += dir) {
            <span class="hljs-keyword">if</span> (array[index] === item) <span class="hljs-keyword">return</span> index;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }
}

<span class="hljs-keyword">var</span> indexOf = createIndexOfFinder(<span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> lastIndexOf = createIndexOfFinder(<span class="hljs-number">-1</span>);

<span class="hljs-keyword">var</span> result = indexOf([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], <span class="hljs-number">2</span>);

<span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader7">fromIndex</h2>
<p>但是即使是数组的 indexOf 方法也可以多传递一个参数 fromIndex，从 MDN 中看到 fromIndex 的讲究可有点多：</p>
<blockquote><p>设定开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0。</p></blockquote>
<p>再看看 lastIndexOf 的 fromIndex：</p>
<blockquote><p>从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。</p></blockquote>
<p>按照这么多的规则，我们尝试着去写第二版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function createIndexOfFinder(dir) {

    return function(array, item, idx){
        var length = array.length;
        var i = 0;

        if (typeof idx == &quot;number&quot;) {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            }
            else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        }

        for (idx = dir > 0 ? i : length - 1; idx >= 0 &amp;&amp; idx < length; idx += dir) {
            if (array[idx] === item) return idx;
        }
        return -1;
    }
}

var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIndexOfFinder</span>(<span class="hljs-params">dir</span>) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, item, idx</span>)</span>{
        <span class="hljs-keyword">var</span> length = array.length;
        <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> idx == <span class="hljs-string">"number"</span>) {
            <span class="hljs-keyword">if</span> (dir &gt; <span class="hljs-number">0</span>) {
                i = idx &gt;= <span class="hljs-number">0</span> ? idx : <span class="hljs-built_in">Math</span>.max(length + idx, <span class="hljs-number">0</span>);
            }
            <span class="hljs-keyword">else</span> {
                length = idx &gt;= <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.min(idx + <span class="hljs-number">1</span>, length) : idx + length + <span class="hljs-number">1</span>;
            }
        }

        <span class="hljs-keyword">for</span> (idx = dir &gt; <span class="hljs-number">0</span> ? i : length - <span class="hljs-number">1</span>; idx &gt;= <span class="hljs-number">0</span> &amp;&amp; idx &lt; length; idx += dir) {
            <span class="hljs-keyword">if</span> (array[idx] === item) <span class="hljs-keyword">return</span> idx;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }
}

<span class="hljs-keyword">var</span> indexOf = createIndexOfFinder(<span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> lastIndexOf = createIndexOfFinder(<span class="hljs-number">-1</span>);</code></pre>
<h2 id="articleHeader8">优化</h2>
<p>到此为止，已经很接近原生的 indexOf 函数了，但是 underscore 在此基础上还做了两点优化。</p>
<p>第一个优化是支持查找 NaN。</p>
<p>因为 NaN 不全等于 NaN，所以原生的 indexOf 并不能找出 NaN 的下标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, NaN].indexOf(NaN) // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>, <span class="hljs-literal">NaN</span>].indexOf(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// -1</span></code></pre>
<p>那么我们该如何实现这个功能呢？</p>
<p>就是从数组中找到符合条件的值的下标嘛，不就是我们最一开始写的 findIndex 吗？</p>
<p>我们来写一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
function createIndexOfFinder(dir, predicate) {

    return function(array, item, idx){

        if () { ... }

        // 判断元素是否是 NaN
        if (item !== item) {
            // 在截取好的数组中查找第一个满足isNaN函数的元素的下标
            idx = predicate(array.slice(i, length), isNaN)
            return idx >= 0 ? idx + i: -1;
        }

        for () { ... }
    }
}

var indexOf = createIndexOfFinder(1, findIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIndexOfFinder</span>(<span class="hljs-params">dir, predicate</span>) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, item, idx</span>)</span>{

        <span class="hljs-keyword">if</span> () { ... }

        <span class="hljs-comment">// 判断元素是否是 NaN</span>
        <span class="hljs-keyword">if</span> (item !== item) {
            <span class="hljs-comment">// 在截取好的数组中查找第一个满足isNaN函数的元素的下标</span>
            idx = predicate(array.slice(i, length), <span class="hljs-built_in">isNaN</span>)
            <span class="hljs-keyword">return</span> idx &gt;= <span class="hljs-number">0</span> ? idx + i: <span class="hljs-number">-1</span>;
        }

        <span class="hljs-keyword">for</span> () { ... }
    }
}

<span class="hljs-keyword">var</span> indexOf = createIndexOfFinder(<span class="hljs-number">1</span>, findIndex);
<span class="hljs-keyword">var</span> lastIndexOf = createIndexOfFinder(<span class="hljs-number">-1</span>, findLastIndex);</code></pre>
<p>第二个优化是支持对有序的数组进行更快的二分查找。</p>
<p>如果 indexOf 第三个参数不传开始搜索的下标值，而是一个布尔值 true，就认为数组是一个排好序的数组，这时候，就会采用更快的二分法进行查找，这个时候，可以利用我们写的 sortedIndex 函数。</p>
<p>在这里直接给最终的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第四版
function createIndexOfFinder(dir, predicate, sortedIndex) {

    return function(array, item, idx){
        var length = array.length;
        var i = 0;

        if (typeof idx == &quot;number&quot;) {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            }
            else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        }
        else if (sortedIndex &amp;&amp; idx &amp;&amp; length) {
            idx = sortedIndex(array, item);
            // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
            return array[idx] === item ? idx : -1;
        }

        // 判断是否是 NaN
        if (item !== item) {
            idx = predicate(array.slice(i, length), isNaN)
            return idx >= 0 ? idx + i: -1;
        }

        for (idx = dir > 0 ? i : length - 1; idx >= 0 &amp;&amp; idx < length; idx += dir) {
            if (array[idx] === item) return idx;
        }
        return -1;
    }
}

var indexOf = createIndexOfFinder(1, findIndex, sortedIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第四版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIndexOfFinder</span>(<span class="hljs-params">dir, predicate, sortedIndex</span>) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, item, idx</span>)</span>{
        <span class="hljs-keyword">var</span> length = array.length;
        <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> idx == <span class="hljs-string">"number"</span>) {
            <span class="hljs-keyword">if</span> (dir &gt; <span class="hljs-number">0</span>) {
                i = idx &gt;= <span class="hljs-number">0</span> ? idx : <span class="hljs-built_in">Math</span>.max(length + idx, <span class="hljs-number">0</span>);
            }
            <span class="hljs-keyword">else</span> {
                length = idx &gt;= <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.min(idx + <span class="hljs-number">1</span>, length) : idx + length + <span class="hljs-number">1</span>;
            }
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sortedIndex &amp;&amp; idx &amp;&amp; length) {
            idx = sortedIndex(array, item);
            <span class="hljs-comment">// 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值</span>
            <span class="hljs-keyword">return</span> array[idx] === item ? idx : <span class="hljs-number">-1</span>;
        }

        <span class="hljs-comment">// 判断是否是 NaN</span>
        <span class="hljs-keyword">if</span> (item !== item) {
            idx = predicate(array.slice(i, length), <span class="hljs-built_in">isNaN</span>)
            <span class="hljs-keyword">return</span> idx &gt;= <span class="hljs-number">0</span> ? idx + i: <span class="hljs-number">-1</span>;
        }

        <span class="hljs-keyword">for</span> (idx = dir &gt; <span class="hljs-number">0</span> ? i : length - <span class="hljs-number">1</span>; idx &gt;= <span class="hljs-number">0</span> &amp;&amp; idx &lt; length; idx += dir) {
            <span class="hljs-keyword">if</span> (array[idx] === item) <span class="hljs-keyword">return</span> idx;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }
}

<span class="hljs-keyword">var</span> indexOf = createIndexOfFinder(<span class="hljs-number">1</span>, findIndex, sortedIndex);
<span class="hljs-keyword">var</span> lastIndexOf = createIndexOfFinder(<span class="hljs-number">-1</span>, findLastIndex);</code></pre>
<p>值得注意的是：在 underscore 的实现中，只有 indexOf 是支持有序数组使用二分查找，lastIndexOf 并不支持。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之学underscore在数组中查找指定元素

## 原文链接
[https://segmentfault.com/a/1190000010356043](https://segmentfault.com/a/1190000010356043)


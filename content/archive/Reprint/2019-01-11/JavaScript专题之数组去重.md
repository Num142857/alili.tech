---
title: 'JavaScript专题之数组去重' 
date: 2019-01-11 2:30:08
hidden: true
slug: 2xw87tktubt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第三篇，讲解各种数组去重方法，并且跟着 underscore 写一个 unique API</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>数组去重方法老生常谈，既然是常谈，我也来谈谈。</p>
<h2 id="articleHeader1">双层循环</h2>
<p>也许我们首先想到的是使用 indexOf 来循环判断一遍，但在这个方法之前，让我们先看看最原始的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 1, '1', '1'];

function unique(array) {
    // res用来存储结果
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if (array[i] === res[j]) {
                break;
            }
        }
        // 如果array[i]是唯一的，那么执行完循环，j等于resLen
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}

console.log(unique(array)); // [1, &quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-comment">// res用来存储结果</span>
    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, arrayLen = array.length; i &lt; arrayLen; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, resLen = res.length; j &lt; resLen; j++ ) {
            <span class="hljs-keyword">if</span> (array[i] === res[j]) {
                <span class="hljs-keyword">break</span>;
            }
        }
        <span class="hljs-comment">// 如果array[i]是唯一的，那么执行完循环，j等于resLen</span>
        <span class="hljs-keyword">if</span> (j === resLen) {
            res.push(array[i])
        }
    }
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-built_in">console</span>.log(unique(array)); <span class="hljs-comment">// [1, "1"]</span></code></pre>
<p>在这个方法中，我们使用循环嵌套，最外层循环 array，里面循环 res，如果 array[i] 的值跟 res[j] 的值相等，就跳出循环，如果都不等于，说明元素是唯一的，这时候 j 的值就会等于 res 的长度，根据这个特点进行判断，将值添加进 res。</p>
<p>看起来很简单吧，之所以要讲一讲这个方法，是因为——————兼容性好！</p>
<h2 id="articleHeader2">indexOf</h2>
<p>我们可以用 indexOf 简化内层的循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

console.log(unique(array));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = array.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> current = array[i];
        <span class="hljs-keyword">if</span> (res.indexOf(current) === <span class="hljs-number">-1</span>) {
            res.push(current)
        }
    }
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-built_in">console</span>.log(unique(array));</code></pre>
<h2 id="articleHeader3">排序后去重</h2>
<p>试想我们先将要去重的数组使用 sort 方法排序后，相同的值就会被排在一起，然后我们就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进 res，让我们写个 demo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

console.log(unique(array));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">var</span> sortedArray = array.concat().sort();
    <span class="hljs-keyword">var</span> seen;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = sortedArray.length; i &lt; len; i++) {
        <span class="hljs-comment">// 如果是第一个元素或者相邻的元素不相同</span>
        <span class="hljs-keyword">if</span> (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-built_in">console</span>.log(unique(array));</code></pre>
<p>如果我们对一个已经排好序的数组去重，这种方法效率肯定高于使用 indexOf。</p>
<h2 id="articleHeader4">unique API</h2>
<p>知道了这两种方法后，我们可以去尝试写一个名为 unique 的工具函数，我们根据一个参数 isSorted 判断传入的数组是否是已排序的，如果为 true，我们就判断相邻元素是否相同，如果为 false，我们就使用 indexOf 进行判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array1 = [1, 2, '1', 2, 1];
var array2 = [1, 1, '1', 2, 2];

// 第一版
function unique(array, isSorted) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }        
    }
    return res;
}

console.log(unique(array1)); // [1, 2, &quot;1&quot;]
console.log(unique(array2, true)); // [1, &quot;1&quot;, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">'1'</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> array2 = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>];

<span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array, isSorted</span>) </span>{
    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">var</span> seen = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = array.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> value = array[i];
        <span class="hljs-keyword">if</span> (isSorted) {
            <span class="hljs-keyword">if</span> (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.indexOf(value) === <span class="hljs-number">-1</span>) {
            res.push(value);
        }        
    }
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-built_in">console</span>.log(unique(array1)); <span class="hljs-comment">// [1, 2, "1"]</span>
<span class="hljs-built_in">console</span>.log(unique(array2, <span class="hljs-literal">true</span>)); <span class="hljs-comment">// [1, "1", 2]</span></code></pre>
<h2 id="articleHeader5">优化</h2>
<p>尽管 unqique 已经可以试下去重功能，但是为了让这个 API 更加强大，我们来考虑一个需求：</p>
<p>新需求：字母的大小写视为一致，比如'a'和'A'，保留一个就可以了！</p>
<p>虽然我们可以先处理数组中的所有数据，比如将所有的字母转成小写，然后再传入unique函数，但是有没有方法可以省掉处理数组的这一遍循环，直接就在去重的循环中做呢？让我们去完成这个需求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array3 = [1, 1, 'a', 'A', 2, 2];

// 第二版
// iteratee 英文释义：迭代 重复
function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }        
    }
    return res;
}

console.log(unique(array3, false, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
})); // [1, &quot;a&quot;, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array3 = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'A'</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>];

<span class="hljs-comment">// 第二版</span>
<span class="hljs-comment">// iteratee 英文释义：迭代 重复</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array, isSorted, iteratee</span>) </span>{
    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">var</span> seen = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = array.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> value = array[i];
        <span class="hljs-keyword">var</span> computed = iteratee ? iteratee(value, i, array) : value;
        <span class="hljs-keyword">if</span> (isSorted) {
            <span class="hljs-keyword">if</span> (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (iteratee) {
            <span class="hljs-keyword">if</span> (seen.indexOf(computed) === <span class="hljs-number">-1</span>) {
                seen.push(computed);
                res.push(value);
            }
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.indexOf(value) === <span class="hljs-number">-1</span>) {
            res.push(value);
        }        
    }
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-built_in">console</span>.log(unique(array3, <span class="hljs-literal">false</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> item == <span class="hljs-string">'string'</span> ? item.toLowerCase() : item
})); <span class="hljs-comment">// [1, "a", 2]</span></code></pre>
<p>在这一版也是最后一版的实现中，函数传递三个参数：</p>
<p>array：表示要去重的数组，必填</p>
<p>isSorted：表示函数传入的数组是否已排过序，如果为 true，将会采用更快的方法进行去重</p>
<p>iteratee：传入一个函数，可以对每个元素进行重新的计算，然后根据处理的结果进行去重</p>
<p>至此，我们已经仿照着 underscore 的思路写了一个 unique 函数，具体可以查看 <a href="https://github.com/jashkenas/underscore/blob/master/underscore.js#L562" rel="nofollow noreferrer" target="_blank">Github</a>。</p>
<h2 id="articleHeader6">filter</h2>
<p>ES5 提供了 filter 方法，我们可以用来简化外层循环：</p>
<p>比如使用 indexOf 的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

console.log(unique(array));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> res = array.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, array</span>)</span>{
        <span class="hljs-keyword">return</span> array.indexOf(item) === index;
    })
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-built_in">console</span>.log(unique(array));</code></pre>
<p>排序去重的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 1, 1, '1'];

function unique(array) {
    return array.concat().sort().filter(function(item, index, array){
        return !index || item !== array[index - 1]
    })
}

console.log(unique(array));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">return</span> array.concat().sort().filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, array</span>)</span>{
        <span class="hljs-keyword">return</span> !index || item !== array[index - <span class="hljs-number">1</span>]
    })
}

<span class="hljs-built_in">console</span>.log(unique(array));</code></pre>
<h2 id="articleHeader7">Object 键值对</h2>
<p>去重的方法众多，尽管我们已经跟着 underscore 写了一个 unqiue API，但是让我们看看其他的方法拓展下视野：</p>
<p>这种方法是利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}

console.log(unique(array)); // [1, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> obj = {};
    <span class="hljs-keyword">return</span> array.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, array</span>)</span>{
        <span class="hljs-keyword">return</span> obj.hasOwnProperty(item) ? <span class="hljs-literal">false</span> : (obj[item] = <span class="hljs-literal">true</span>)
    })
}

<span class="hljs-built_in">console</span>.log(unique(array)); <span class="hljs-comment">// [1, 2]</span></code></pre>
<p>我们可以发现，是有问题的，因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值，这是因为对象的键值只能是字符串，所以我们可以使用 <code>typeof item + item</code> 拼成字符串作为 key 值来避免这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

console.log(unique(array)); // [1, 2, &quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> obj = {};
    <span class="hljs-keyword">return</span> array.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, array</span>)</span>{
        <span class="hljs-keyword">return</span> obj.hasOwnProperty(<span class="hljs-keyword">typeof</span> item + item) ? <span class="hljs-literal">false</span> : (obj[<span class="hljs-keyword">typeof</span> item + item] = <span class="hljs-literal">true</span>)
    })
}

<span class="hljs-built_in">console</span>.log(unique(array)); <span class="hljs-comment">// [1, 2, "1"]</span></code></pre>
<h2 id="articleHeader8">ES6</h2>
<p>随着 ES6 的到来，去重的方法又有了进展，比如我们可以使用 Set 和 Map 数据结构，以 Set 为例，ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。</p>
<p>是不是感觉就像是为去重而准备的？让我们来写一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 1, 1, '1'];

function unique(array) {
   return Array.from(new Set(array));
}

console.log(unique(array)); // [1, 2, &quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
   <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(array));
}

<span class="hljs-built_in">console</span>.log(unique(array)); <span class="hljs-comment">// [1, 2, "1"]</span></code></pre>
<p>甚至可以再简化下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(array) {
    return [...new Set(array)];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">return</span> [...new <span class="hljs-built_in">Set</span>(array)];
}</code></pre>
<p>还可以再简化下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var unique = (a) => [...new Set(a)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> unique = <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> [...new <span class="hljs-built_in">Set</span>(a)]</code></pre>
<p>此外，如果用 Map 的话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique (arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) &amp;&amp; seen.set(a, 1))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span> (<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">const</span> seen = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> !seen.has(a) &amp;&amp; seen.set(a, <span class="hljs-number">1</span>))
}</code></pre>
<h2 id="articleHeader9">JavaScript 的进化</h2>
<p>我们可以看到，去重方法从原始的 14 行代码到 ES6 的 1 行代码，其实也说明了 JavaScript 这门语言在不停的进步，相信以后的开发也会越来越高效。</p>
<h2 id="articleHeader10">特殊类型比较</h2>
<p>去重的方法就到此结束了，然而要去重的元素类型可能是多种多样，除了例子中简单的 1 和 '1' 之外，其实还有 null、undefined、NaN、对象等，那么对于这些元素，之前的这些方法的去重结果又是怎样呢？</p>
<p>在此之前，先让我们先看几个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str1 = <span class="hljs-string">'1'</span>;
<span class="hljs-keyword">var</span> str2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'1'</span>);

<span class="hljs-built_in">console</span>.log(str1 == str2); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(str1 === str2); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> == <span class="hljs-literal">null</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> === <span class="hljs-literal">null</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span> == <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span> === <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> == <span class="hljs-literal">NaN</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/a/</span> == <span class="hljs-regexp">/a/</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/a/</span> === <span class="hljs-regexp">/a/</span>); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log({} == {}); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log({} === {}); <span class="hljs-comment">// false</span></code></pre>
<p>那么，对于这样一个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'1'</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'1'</span>), <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'1'</span>), /a/, /a/, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>];</code></pre>
<p>以上各种方法去重的结果到底是什么样的呢？</p>
<p>我特地整理了一个列表，我们重点关注下对象和 NaN 的去重情况：</p>
<table class="table table-bordered table-striped table-condensed">
<tbody><tr>
<th>方法</th>  
        <th>结果</th>  
        <th>说明</th>  
    </tr>
<tr>
<td>for循环</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]</td>
        <td>对象和 NaN 不去重</td>
    </tr>
<tr>
<td>indexOf</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]</td>
        <td>对象和 NaN 不去重</td>
    </tr>
<tr>
<td>sort</td>  
        <td>[/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]</td>
        <td>对象和 NaN 不去重 数字 1 也不去重</td>
    </tr>
<tr>
<td>filter + indexOf</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/]</td>
        <td>对象不去重 NaN 会被忽略掉</td>
    </tr>
<tr>
<td>filter + sort</td>  
        <td>[/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]</td>
        <td>对象和 NaN 不去重 数字 1 不去重</td>
    </tr>
<tr>
<td>优化后的键值对方法</td>  
        <td>[1, "1", null, undefined, String, /a/, NaN]</td>
        <td>全部去重</td>
    </tr>
<tr>
<td>Set</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/, NaN]</td>
        <td>对象不去重 NaN 去重</td>
    </tr>
</tbody></table>
<p>想了解为什么会出现以上的结果，看两个 demo 便能明白：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo1
var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// demo1</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-literal">NaN</span>];
arr.indexOf(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// -1</span></code></pre>
<p>indexOf 底层还是使用 === 进行判断，因为 NaN ==== NaN的结果为 false，所以使用 indexOf 查找不到 NaN 元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo2
function unique(array) {
   return Array.from(new Set(array));
}
console.log(unique([NaN, NaN])) // [NaN]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// demo2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
   <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(array));
}
<span class="hljs-built_in">console</span>.log(unique([<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>])) <span class="hljs-comment">// [NaN]</span></code></pre>
<p>Set 认为尽管 NaN === NaN 为 false，但是这两个元素是重复的。</p>
<h2 id="articleHeader11">写在最后</h2>
<p>虽然去重的结果有所不同，但更重要的是让我们知道在合适的场景要选择合适的方法。</p>
<h2 id="articleHeader12">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之数组去重

## 原文链接
[https://segmentfault.com/a/1190000009867515](https://segmentfault.com/a/1190000009867515)


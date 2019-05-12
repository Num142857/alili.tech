---
title: 'JavaScript专题之数组扁平化' 
date: 2019-01-07 2:30:11
hidden: true
slug: 9j7eodud07j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第九篇，讲解如何实现数组的扁平化，并解析 underscore 的 _.flatten 源码</p></blockquote>
<h2 id="articleHeader0">扁平化</h2>
<p>数组的扁平化，就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。</p>
<p>举个例子，假设有个名为 flatten 的函数可以做到数组扁平化，效果就会如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, [2, [3, 4]]];
console.log(flatten(arr)) // [1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]];
<span class="hljs-built_in">console</span>.log(flatten(arr)) <span class="hljs-comment">// [1, 2, 3, 4]</span></code></pre>
<p>知道了效果是什么样的了，我们可以去尝试着写这个 flatten 函数了</p>
<h2 id="articleHeader1">递归</h2>
<p>我们最一开始能想到的莫过于循环数组元素，如果还是一个数组，就递归调用该方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法 1
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        }
        else {
            result.push(arr[i])
        }
    }
    return result;
}


console.log(flatten(arr))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方法 1</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        }
        <span class="hljs-keyword">else</span> {
            result.push(arr[i])
        }
    }
    <span class="hljs-keyword">return</span> result;
}


<span class="hljs-built_in">console</span>.log(flatten(arr))</code></pre>
<h2 id="articleHeader2">toString</h2>
<p>如果数组的元素都是数字，那么我们可以考虑使用 toString 方法，因为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, [2, [3, 4]]].toString() // &quot;1,2,3,4&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]].toString() <span class="hljs-comment">// "1,2,3,4"</span></code></pre>
<p>调用 toString 方法，返回了一个逗号分隔的扁平的字符串，这时候我们再 split，然后转成数字不就可以实现扁平化了吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法2
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.toString().split(',').map(function(item){
        return +item
    })
}

console.log(flatten(arr))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方法2</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.toString().split(<span class="hljs-string">','</span>).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
        <span class="hljs-keyword">return</span> +item
    })
}

<span class="hljs-built_in">console</span>.log(flatten(arr))</code></pre>
<p>然而这种方法使用的场景却非常有限，如果数组是 [1, '1', 2, '2'] 的话，这种方法就会产生错误的结果。</p>
<h2 id="articleHeader3">reduce</h2>
<p>既然是对数组进行处理，最终返回一个值，我们就可以考虑使用 reduce 来简化代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法3
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

console.log(flatten(arr))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方法3</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, next</span>)</span>{
        <span class="hljs-keyword">return</span> prev.concat(<span class="hljs-built_in">Array</span>.isArray(next) ? flatten(next) : next)
    }, [])
}

<span class="hljs-built_in">console</span>.log(flatten(arr))</code></pre>
<h2 id="articleHeader4">...</h2>
<p>ES6 增加了扩展运算符，用于取出参数对象的所有可遍历属性，拷贝到当前对象之中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, [2, [3, 4]]];
console.log([].concat(...arr)); // [1, 2, [3, 4]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]];
<span class="hljs-built_in">console</span>.log([].concat(...arr)); <span class="hljs-comment">// [1, 2, [3, 4]]</span></code></pre>
<p>我们用这种方法只可以扁平一层，但是顺着这个方法一直思考，我们可以写出这样的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法4
var arr = [1, [2, [3, 4]]];

function flatten(arr) {

    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

console.log(flatten(arr))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方法4</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">arr</span>) </span>{

    <span class="hljs-keyword">while</span> (arr.some(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">Array</span>.isArray(item))) {
        arr = [].concat(...arr);
    }

    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-built_in">console</span>.log(flatten(arr))</code></pre>
<h2 id="articleHeader5">undercore</h2>
<p>那么如何写一个抽象的扁平函数，来方便我们的开发呢，所有又到了我们抄袭 underscore 的时候了~</p>
<p>在这里直接给出源码和注释，但是要注意，这里的 flatten 函数并不是最终的 _.flatten，为了方便多个 API 进行调用，这里对扁平进行了更多的配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, output) {

    // 递归使用的时候会用到output
    output = output || [];
    var idx = output.length;

    for (var i = 0, len = input.length; i < len; i++) {

        var value = input[i];
        // 如果是数组，就进行处理
        if (Array.isArray(value)) {
            // 如果是只扁平一层，遍历该数组，依此填入 output
            if (shallow) {
                var j = 0, len = value.length;
                while (j < len) output[idx++] = value[j++];
            }
            // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
            else {
                flatten(value, shallow, strict, output);
                idx = output.length;
            }
        }
        // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
        else if (!strict){
            output[idx++] = value;
        }
    }

    return output;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">input, shallow, strict, output</span>) </span>{

    <span class="hljs-comment">// 递归使用的时候会用到output</span>
    output = output || [];
    <span class="hljs-keyword">var</span> idx = output.length;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = input.length; i &lt; len; i++) {

        <span class="hljs-keyword">var</span> value = input[i];
        <span class="hljs-comment">// 如果是数组，就进行处理</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
            <span class="hljs-comment">// 如果是只扁平一层，遍历该数组，依此填入 output</span>
            <span class="hljs-keyword">if</span> (shallow) {
                <span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, len = value.length;
                <span class="hljs-keyword">while</span> (j &lt; len) output[idx++] = value[j++];
            }
            <span class="hljs-comment">// 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output</span>
            <span class="hljs-keyword">else</span> {
                flatten(value, shallow, strict, output);
                idx = output.length;
            }
        }
        <span class="hljs-comment">// 不是数组，根据 strict 的值判断是跳过不处理还是放入 output</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!strict){
            output[idx++] = value;
        }
    }

    <span class="hljs-keyword">return</span> output;

}</code></pre>
<p>解释下 strict，在代码里我们可以看出，当遍历数组元素时，如果元素不是数组，就会对 strict 取反的结果进行判断，如果设置 strict 为 true，就会跳过不进行任何处理，这意味着可以过滤非数组的元素，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, [3, 4]];
console.log(flatten(arr, true, true)); // [3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]];
<span class="hljs-built_in">console</span>.log(flatten(arr, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>)); <span class="hljs-comment">// [3, 4]</span></code></pre>
<p>那么设置 strict 到底有什么用呢？不急，我们先看下 shallow 和 strct 各种值对应的结果：</p>
<ul>
<li><p>shallow true + strict false ：正常扁平一层</p></li>
<li><p>shallow false + strict false ：正常扁平所有层</p></li>
<li><p>shallow true + strict true ：去掉非数组元素</p></li>
<li><p>shallow false + strict true ： 返回一个[]</p></li>
</ul>
<p>我们看看 underscore 中哪些方法调用了 flatten 这个基本函数：</p>
<h2 id="articleHeader6">_.flatten</h2>
<p>首先就是 _.flatten：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, shallow</span>) </span>{
    <span class="hljs-keyword">return</span> flatten(array, shallow, <span class="hljs-literal">false</span>);
};</code></pre>
<p>在正常的扁平中，我们并不需要去掉非数组元素。</p>
<h2 id="articleHeader7">_.union</h2>
<p>接下来是 _.union：</p>
<p>该函数传入多个数组，然后返回传入的数组的并集，</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
=> [1, 2, 3, 101, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.union([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">101</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">1</span>]);
=&gt; [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">101</span>, <span class="hljs-number">10</span>]</code></pre>
<p>如果传入的参数并不是数组，就会将该参数跳过：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.union([1, 2, 3], [101, 2, 1, 10], 4, 5);
=> [1, 2, 3, 101, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.union([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">101</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>], <span class="hljs-number">4</span>, <span class="hljs-number">5</span>);
=&gt; [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">101</span>, <span class="hljs-number">10</span>]</code></pre>
<p>为了实现这个效果，我们可以将传入的所有数组扁平化，然后去重，因为只能传入数组，这时候我们直接设置 strict 为 true，就可以跳过传入的非数组的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 关于 unique 可以查看《JavaScript专题之数组去重》[](https://github.com/mqyqingfeng/Blog/issues/27)
function unique(array) {
   return Array.from(new Set(array));
}

_.union = function() {
    return unique(flatten(arguments, true, true));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 关于 unique 可以查看《JavaScript专题之数组去重》[](https://github.com/mqyqingfeng/Blog/issues/27)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
   <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(array));
}

_.union = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> unique(flatten(<span class="hljs-built_in">arguments</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>));
}</code></pre>
<h2 id="articleHeader8">_.difference</h2>
<p>是不是感觉折腾 strict 有点用处了，我们再看一个 _.difference：</p>
<p>语法为：</p>
<blockquote><p>_.difference(array, *others)</p></blockquote>
<p>效果是取出来自 array 数组，并且不存在于多个 other 数组的元素。跟 _.union 一样，都会排除掉不是数组的元素。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.difference([1, 2, 3, 4, 5], [5, 2, 10], [4], 3);
=> [1, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.difference([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">10</span>], [<span class="hljs-number">4</span>], <span class="hljs-number">3</span>);
=&gt; [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>]</code></pre>
<p>实现方法也很简单，扁平 others 的数组，筛选出 array 中不在扁平化数组中的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function difference(array, ...rest) {

    rest = flatten(rest, true, true);

    return array.filter(function(item){
        return rest.indexOf(item) === -1;
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">difference</span>(<span class="hljs-params">array, ...rest</span>) </span>{

    rest = flatten(rest, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);

    <span class="hljs-keyword">return</span> array.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
        <span class="hljs-keyword">return</span> rest.indexOf(item) === <span class="hljs-number">-1</span>;
    })
}</code></pre>
<p>注意，以上实现的细节并不是完全按照 underscore，具体细节的实现感兴趣可以<a href="https://github.com/jashkenas/underscore/blob/master/underscore.js#L528" rel="nofollow noreferrer" target="_blank">查看源码</a>。</p>
<h2 id="articleHeader9">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之数组扁平化

## 原文链接
[https://segmentfault.com/a/1190000010287443](https://segmentfault.com/a/1190000010287443)


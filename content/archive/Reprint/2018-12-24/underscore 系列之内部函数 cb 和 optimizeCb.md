---
title: 'underscore 系列之内部函数 cb 和 optimizeCb' 
date: 2018-12-24 2:30:07
hidden: true
slug: 8j2tbvmo3iu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>仅看 cb 和 optimizeCb 两个函数的名字，你可能想不到这是用来做什么的，尽管你可能想到 cb 是 callback 的缩写。</p>
<p>如果直接讲解源码，你可能想不明白为什么要这么写，所以我们从 _.map 函数开始讲起。</p>
<h2 id="articleHeader1">_.map</h2>
<p>_.map 类似于 <code>Array.prototype.map</code>，但更加健壮和完善。我们看下 _.map 的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 简化过，这里仅假设 obj 是数组
_.map = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var length = obj.length, results = Array(length);
    for (var index = 0; index < length; index++) {
        results[index] = iteratee(obj[index], index, obj);
    }

    return results;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 简化过，这里仅假设 obj 是数组</span>
_.map = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj, iteratee, context</span>) </span>{
    iteratee = cb(iteratee, context);

    <span class="hljs-keyword">var</span> length = obj.length, results = <span class="hljs-built_in">Array</span>(length);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; length; index++) {
        results[index] = iteratee(obj[index], index, obj);
    }

    <span class="hljs-keyword">return</span> results;
};</code></pre>
<p>map 方法除了传入要处理的数组之外，还有两个参数 iteratee 和 context，类似于 <code>Array.prototype.map</code> 中的其他两个参数，其中 iteratee 表示处理函数，context 表示指定的执行上下文，即 this 的值。</p>
<p>然后在源码中，我们看到，我们将 iteratee 和 context 传入一个 cb 函数，然后覆盖掉 iteratee 函数，然后将这个函数用作最终的处理函数。</p>
<p>实际上，需要这么麻烦吗？不就是使用 iteratee 函数处理每次迭代的值吗？不就是通过 context 指定 this 的值吗？我们可以直接这样写呐：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.map = function (obj, iteratee, context) {
    var length = obj.length, results = Array(length);
    for (var index = 0; index < length; index++) {
        results[index] = iteratee.call(context, obj[index], index, obj);
    }
    return results;
};

// [2, 3, 4]
console.log(_.map([1, 2, 3], function(item){
    return item + 1;
})) 

// [2, 3, 4]
console.log(_.map([1, 2, 3], function(item){
    return item + this.value;
}, {value: 1})) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.map = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj, iteratee, context</span>) </span>{
    <span class="hljs-keyword">var</span> length = obj.length, results = <span class="hljs-built_in">Array</span>(length);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; length; index++) {
        results[index] = iteratee.call(context, obj[index], index, obj);
    }
    <span class="hljs-keyword">return</span> results;
};

<span class="hljs-comment">// [2, 3, 4]</span>
<span class="hljs-built_in">console</span>.log(_.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
    <span class="hljs-keyword">return</span> item + <span class="hljs-number">1</span>;
})) 

<span class="hljs-comment">// [2, 3, 4]</span>
<span class="hljs-built_in">console</span>.log(_.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
    <span class="hljs-keyword">return</span> item + <span class="hljs-keyword">this</span>.value;
}, {<span class="hljs-attr">value</span>: <span class="hljs-number">1</span>})) </code></pre>
<p>你看看也没有什么问题呐，可是，万一 iteratee 我们不传入一个函数呢？比如我们什么也不传，或者传入一个对象，又或者传入一个字符串、数字呢？</p>
<p>如果用我们的方法自然是会报错的，那 underscore 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 underscore

// 什么也不传
var result = _.map([1,2,3]); // [1, 2, 3]

// 传入一个对象
var result = _.map([{name:'Kevin'}, {name: 'Daisy', age: 18}], {name: 'Daisy'}); // [false, true]

var result = _.map([{name: 'Kevin'}, {name: 'Daisy'}], 'name'); // ['Kevin', 'daisy']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用 underscore</span>

<span class="hljs-comment">// 什么也不传</span>
<span class="hljs-keyword">var</span> result = _.map([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]); <span class="hljs-comment">// [1, 2, 3]</span>

<span class="hljs-comment">// 传入一个对象</span>
<span class="hljs-keyword">var</span> result = _.map([{<span class="hljs-attr">name</span>:<span class="hljs-string">'Kevin'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>}], {<span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>}); <span class="hljs-comment">// [false, true]</span>

<span class="hljs-keyword">var</span> result = _.map([{<span class="hljs-attr">name</span>: <span class="hljs-string">'Kevin'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>}], <span class="hljs-string">'name'</span>); <span class="hljs-comment">// ['Kevin', 'daisy']</span></code></pre>
<p>我们会发现，underscore 竟然还能根据传入的值的类型不同，实现的效果不同。我们总结下：</p>
<ol>
<li>当 iteratee 不传时，返回一个相同的数组。</li>
<li>当 iteratee 为一个函数，正常处理。</li>
<li>当 iteratee 为一个对象，返回元素是否匹配指定的对象。</li>
<li>当 iteratee 为字符串，返回元素对应的属性值的集合。</li>
</ol>
<p>由此，我们可以推测在 underscore 的 cb 函数中，有对 iteratee 值类型的判断，然后根据不同的类型，返回不同的 iteratee 函数。</p>
<h2 id="articleHeader2">cb</h2>
<p>所以我们来看看 cb 函数的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cb = function(value, context, argCount) {
    
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);

    if (value == null) return _.identity;

    if (_.isFunction(value)) return optimizeCb(value, context, argCount);

    if (_.isObject(value) &amp;&amp; !_.isArray(value)) return _.matcher(value);

    return _.property(value);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cb = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, context, argCount</span>) </span>{
    
    <span class="hljs-keyword">if</span> (_.iteratee !== builtinIteratee) <span class="hljs-keyword">return</span> _.iteratee(value, context);

    <span class="hljs-keyword">if</span> (value == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> _.identity;

    <span class="hljs-keyword">if</span> (_.isFunction(value)) <span class="hljs-keyword">return</span> optimizeCb(value, context, argCount);

    <span class="hljs-keyword">if</span> (_.isObject(value) &amp;&amp; !_.isArray(value)) <span class="hljs-keyword">return</span> _.matcher(value);

    <span class="hljs-keyword">return</span> _.property(value);
};</code></pre>
<p>这一看就牵扯到了 8 个函数！不要害怕，我们一个一个看。</p>
<h2 id="articleHeader3">_.iteratee</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (_.iteratee !== builtinIteratee) <span class="hljs-keyword">return</span> _.iteratee(value, context);</code></pre>
<p>我们看看 _.iteratee 的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.iteratee = builtinIteratee = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, context</span>) </span>{
    <span class="hljs-keyword">return</span> cb(value, context, <span class="hljs-literal">Infinity</span>);
};</code></pre>
<p>因为 <code>_.iteratee = builtinIteratee</code> 的缘故，<code>_.iteratee !== builtinIteratee</code> 值为 false，所以正常情况下 <code>_.iteratee(value, context)</code> 并不会执行。</p>
<p>但是如果我们在外部修改了 _.iteratee 函数，结果便会为 true，cb 函数直接返回 <code>_.iteratee(value, context)</code>。</p>
<p>这个意思其实是说用我们自定义的 _.iteratee 函数来处理 value 和 context。</p>
<p>试想我们并不需要现在 _.map 这么强大的功能，我只希望当 value 是一个函数，就用该函数处理数组元素，如果不是函数，就直接返回当前元素，我们可以这样修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <title>underscore map</title>
</head>
<body>
    <script src=&quot;../vender/underscore.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
    _.iteratee = function(value, context) {
        if (typeof value === 'function') {
            return function(...rest) {
                return value.call(context, ...rest)
            };
        }
        return function(value) {
            return value;
        };
    };

    // 如果 map 的第二个参数不是函数，就返回该元素
    console.log(_.map([1, 2, 3], 'name')); // [1, 2, 3]

    // 如果 map 的第二个参数是函数，就使用该函数处理数组元素
    var result = _.map([1, 2, 3], function(item) {
        return item + 1;
    });

    console.log(result); // [2, 3, 4]
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>underscore map<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../vender/underscore.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    _.iteratee = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, context)</span> </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...rest</span>)</span> </span>{
                <span class="hljs-keyword">return</span> value.call(context, ...rest)
            };
        }
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> </span>{
            <span class="hljs-keyword">return</span> value;
        };
    };

    <span class="hljs-comment">// 如果 map 的第二个参数不是函数，就返回该元素</span>
    console.log(_.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-string">'name'</span>)); <span class="hljs-comment">// [1, 2, 3]</span>

    <span class="hljs-comment">// 如果 map 的第二个参数是函数，就使用该函数处理数组元素</span>
    <span class="hljs-keyword">var</span> result = _.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span> </span>{
        <span class="hljs-keyword">return</span> item + <span class="hljs-number">1</span>;
    });

    console.log(result); <span class="hljs-comment">// [2, 3, 4]</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>当然更多的情况是自定义对不同的 value 使用不同的处理函数，值得注意的是，underscore 中的多个函数都是用了 cb 函数，而因为 cb 函数使用了 _.iteratee 函数，如果你修改这个函数，其实会影响多个函数，这些函数基本都属于集合函数，具体包括 map、find、filter、reject、every、some、max、min、sortBy、groupBy、indexBy、countBy、sortedIndex、partition、和 unique。</p>
<h2 id="articleHeader4">_.identity</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (value == null) return _.identity;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (value == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> _.identity;</code></pre>
<p>让我们看看 _.identity 的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.identity = function(value) {
    return value;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.identity = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value;
};</code></pre>
<p>这也就是为什么当 map 的第二个参数什么都不传的时候，结果会是一个相同数组的原因。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.map([1,2,3]); // [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">_.map([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]); <span class="hljs-comment">// [1, 2, 3]</span></code></pre>
<p>如果直接看这个函数，可能觉得没有什么用，但用在这里，却又十分的合适。</p>
<h2 id="articleHeader5">optimizeCb</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (_.isFunction(value)) return optimizeCb(value, context, argCount);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (_.isFunction(value)) <span class="hljs-keyword">return</span> optimizeCb(value, context, argCount);</code></pre>
<p>当 value 是一个函数的时候，就传入 optimizeCb 函数，我们来看看 optimizeCb 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var optimizeCb = function(func, context, argCount) {
    // 如果没有传入 context，就返回 func 函数
    if (context === void 0) return func;
    switch (argCount) {
        case 1:
            return function(value) {
                return func.call(context, value);
            };
        case null:
        case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function() {
        return func.apply(context, arguments);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> optimizeCb = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func, context, argCount</span>) </span>{
    <span class="hljs-comment">// 如果没有传入 context，就返回 func 函数</span>
    <span class="hljs-keyword">if</span> (context === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> func;
    <span class="hljs-keyword">switch</span> (argCount) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
                <span class="hljs-keyword">return</span> func.call(context, value);
            };
        <span class="hljs-keyword">case</span> <span class="hljs-literal">null</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index, collection</span>) </span>{
                <span class="hljs-keyword">return</span> func.call(context, value, index, collection);
            };
        <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">accumulator, value, index, collection</span>) </span>{
                <span class="hljs-keyword">return</span> func.call(context, accumulator, value, index, collection);
            };
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> func.apply(context, <span class="hljs-built_in">arguments</span>);
    };
};</code></pre>
<p>也许你会好奇，为什么我要对 argCount 进行判断呢？就不能直接返回吗？比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var optimizeCb = function(func, context) {
    // 如果没有传入 context，就返回 func 函数
    if (context === void 0) return func;
    return function() {
        return func.apply(context, arguments);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> optimizeCb = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func, context</span>) </span>{
    <span class="hljs-comment">// 如果没有传入 context，就返回 func 函数</span>
    <span class="hljs-keyword">if</span> (context === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> func;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> func.apply(context, <span class="hljs-built_in">arguments</span>);
    };
};</code></pre>
<p>当然没有问题，但为什么 underscore 要这样做呢？其实就是为了避免使用 arguments，提高一点性能而已，如果不是写一个库，其实还真是没有必要做到这点。</p>
<p>而为什么当参数是 3 个时候，参数名称分别是 value, index, collection ，又为什么没有参数为 2 的情况呢？其实这都是根据 underscore 函数用到的情况，没有函数用到两个参数，于是就省略了，像 map 函数就会用到 3 个参数，就根据这三个参数的名字起了这里的变量名啦。</p>
<h2 id="articleHeader6">_.matcher</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (_.isObject(value) &amp;&amp; !_.isArray(value)) return _.matcher(value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (_.isObject(value) &amp;&amp; !_.isArray(value)) <span class="hljs-keyword">return</span> _.matcher(value);</code></pre>
<p>这段就是用来处理当 map 的第二个参数是对象的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 传入一个对象
var result = _.map([{name:'Kevin'}, {name: 'Daisy', age: 18}], {name: 'Daisy'}); // [false, true]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 传入一个对象</span>
<span class="hljs-keyword">var</span> result = _.map([{<span class="hljs-attr">name</span>:<span class="hljs-string">'Kevin'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>}], {<span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>}); <span class="hljs-comment">// [false, true]</span></code></pre>
<p>如果 value 是一个对象，并且不是数组，就使用 _.matcher 函数。看看各个函数的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var nativeIsArray = Array.isArray;

_.isArray = nativeIsArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

_.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' &amp;&amp; !!obj;
};


// extend 函数可以参考 《JavaScript 专题之手写一个 jQuery 的 extend》
_.matcher = function(attrs) {
    attrs = _.extend({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
};

// 该函数判断 attr 对象中的键值是否在 object 中有并且相等

// var stooge = {name: 'moe', age: 32};
// _.isMatch(stooge, {age: 32}); => true

// 其中 _.keys 相当于 Object.keys
_.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
        var key = keys[i];
        if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> nativeIsArray = <span class="hljs-built_in">Array</span>.isArray;

_.isArray = nativeIsArray || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj) === <span class="hljs-string">'[object Array]'</span>;
};

_.isObject = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> type = <span class="hljs-keyword">typeof</span> obj;
    <span class="hljs-keyword">return</span> type === <span class="hljs-string">'function'</span> || type === <span class="hljs-string">'object'</span> &amp;&amp; !!obj;
};


<span class="hljs-comment">// extend 函数可以参考 《JavaScript 专题之手写一个 jQuery 的 extend》</span>
_.matcher = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">attrs</span>) </span>{
    attrs = _.extend({}, attrs);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> _.isMatch(obj, attrs);
    };
};

<span class="hljs-comment">// 该函数判断 attr 对象中的键值是否在 object 中有并且相等</span>

<span class="hljs-comment">// var stooge = {name: 'moe', age: 32};</span>
<span class="hljs-comment">// _.isMatch(stooge, {age: 32}); =&gt; true</span>

<span class="hljs-comment">// 其中 _.keys 相当于 Object.keys</span>
_.isMatch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">object, attrs</span>) </span>{
    <span class="hljs-keyword">var</span> keys = _.keys(attrs), length = keys.length;
    <span class="hljs-keyword">if</span> (object == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> !length;
    <span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>(object);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
        <span class="hljs-keyword">var</span> key = keys[i];
        <span class="hljs-keyword">if</span> (attrs[key] !== obj[key] || !(key <span class="hljs-keyword">in</span> obj)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
};</code></pre>
<h2 id="articleHeader7">_.property</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return _.property(value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> _.property(value);</code></pre>
<p>这个就是处理当 value 是基本类型的值的时候，返回元素对应的属性值的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = _.map([{name: 'Kevin'}, {name: 'Daisy'}], 'name'); // ['Kevin', 'daisy']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> result = _.map([{<span class="hljs-attr">name</span>: <span class="hljs-string">'Kevin'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>}], <span class="hljs-string">'name'</span>); <span class="hljs-comment">// ['Kevin', 'daisy']</span></code></pre>
<p>我们看下源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.property = function(path) {
    // 如果不是数组
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
        return deepGet(obj, path);
    };
};

var shallowProperty = function(key) {
    return function(obj) {
        return obj == null ? void 0 : obj[key];
    };
};

// 根据路径取出深层次的值
var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
        if (obj == null) return void 0;
        obj = obj[path[i]];
    }
    return length ? obj : void 0;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.property = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-comment">// 如果不是数组</span>
    <span class="hljs-keyword">if</span> (!_.isArray(path)) {
      <span class="hljs-keyword">return</span> shallowProperty(path);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">return</span> deepGet(obj, path);
    };
};

<span class="hljs-keyword">var</span> shallowProperty = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">return</span> obj == <span class="hljs-literal">null</span> ? <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> : obj[key];
    };
};

<span class="hljs-comment">// 根据路径取出深层次的值</span>
<span class="hljs-keyword">var</span> deepGet = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, path</span>) </span>{
    <span class="hljs-keyword">var</span> length = path.length;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
        <span class="hljs-keyword">if</span> (obj == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
        obj = obj[path[i]];
    }
    <span class="hljs-keyword">return</span> length ? obj : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
};</code></pre>
<p>我们好像发现了新大陆，原来 value 还可以传一个数组，用来取深层次的值，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person1 = {
    child: {
        nickName: 'Kevin'
    }
}

var person2 = {
    child: {
        nickName: 'Daisy'
    }
}

var result = _.map([person1, person2], ['child', 'nickName']); 
console.log(result) // ['Kevin', 'daisy']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> person1 = {
    <span class="hljs-attr">child</span>: {
        <span class="hljs-attr">nickName</span>: <span class="hljs-string">'Kevin'</span>
    }
}

<span class="hljs-keyword">var</span> person2 = {
    <span class="hljs-attr">child</span>: {
        <span class="hljs-attr">nickName</span>: <span class="hljs-string">'Daisy'</span>
    }
}

<span class="hljs-keyword">var</span> result = _.map([person1, person2], [<span class="hljs-string">'child'</span>, <span class="hljs-string">'nickName'</span>]); 
<span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// ['Kevin', 'daisy']</span></code></pre>
<h2 id="articleHeader8">最后</h2>
<p>如果你想学习 underscore 的源码，在分析集合相关的函数时一定会接触 cb 和 optimizeCb 函数，先掌握这两个函数，会帮助你更好更快的解读源码。</p>
<h2 id="articleHeader9">underscore 系列</h2>
<p>underscore 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>underscore 系列预计写八篇左右，重点介绍 underscore 中的代码架构、链式调用、内部函数、模板引擎等内容，旨在帮助大家阅读源码，以及写出自己的 undercore。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
underscore 系列之内部函数 cb 和 optimizeCb

## 原文链接
[https://segmentfault.com/a/1190000012209493](https://segmentfault.com/a/1190000012209493)


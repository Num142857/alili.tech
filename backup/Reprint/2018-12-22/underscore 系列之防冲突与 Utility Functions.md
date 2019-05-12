---
title: 'underscore 系列之防冲突与 Utility Functions' 
date: 2018-12-22 2:30:10
hidden: true
slug: xlk7mmnk49
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">防冲突</h2>
<p>underscore 使用 _ 作为函数的挂载对象，如果页面中已经存在了 <code>_</code> 对象，underscore 就会覆盖该对象，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = {value: 1 }

// 引入 underscore 后
console.log(_.value); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _ = {<span class="hljs-attr">value</span>: <span class="hljs-number">1</span> }

<span class="hljs-comment">// 引入 underscore 后</span>
<span class="hljs-built_in">console</span>.log(_.value); <span class="hljs-comment">// undefined</span></code></pre>
<p>所以 underscore 提供了 noConflict 功能，可以放弃 underscore 的控制变量 <code>_</code>，返回 underscore 对象的引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = {value: 1 }

// 引入 underscore 后

// 放弃 &quot;_&quot;，使用 &quot;$&quot;
var $ = _.noConflict();

console.log(_.value); // 1

// 使用 underscore 的方法
$.each([1, 2, 3], alert);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _ = {<span class="hljs-attr">value</span>: <span class="hljs-number">1</span> }

<span class="hljs-comment">// 引入 underscore 后</span>

<span class="hljs-comment">// 放弃 "_"，使用 "$"</span>
<span class="hljs-keyword">var</span> $ = _.noConflict();

<span class="hljs-built_in">console</span>.log(_.value); <span class="hljs-comment">// 1</span>

<span class="hljs-comment">// 使用 underscore 的方法</span>
$.each([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], alert);</code></pre>
<p>那么 noConflict 函数是如何实现的呢？</p>
<p>首先，在 underscore 执行的时候，会储存之前的 <code>_</code> 对象，然后当执行 noConflict 函数的时候，再将之前储存的 <code>_</code> 对象赋给全局对象，最后返回 underscore 对象。这样，我们就可以利用返回的 underscore 对象使用 underscore 提供的各种方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 源码一开始的时候便储存之前的 _ 对象
var previousUnderscore = root._;

_.noConflict = function() {
    root._ = previousUnderscore;
    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 源码一开始的时候便储存之前的 _ 对象</span>
<span class="hljs-keyword">var</span> previousUnderscore = root._;

_.noConflict = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    root._ = previousUnderscore;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>是的，就是这么简单。你可以轻松为你的函数库添加防冲突功能。</p>
<p>接下来我们看 underscore 中的一些功能函数。</p>
<h2 id="articleHeader1">_.identity</h2>
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
<p>看起来匪夷所思的一个函数，传入一个值，然后返回该值，为什么不直接使用该值呢？</p>
<p>还记得我们在<a href="https://github.com/mqyqingfeng/Blog/issues/58" rel="nofollow noreferrer" target="_blank">《underscore 系列之内部函数 cb 和 optimizeCb》</a>中接触过这个函数吗？</p>
<p>如果我们自己编写了一个 <code>_.map</code> 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.map = function(arr, iteratee){
    return arr.map(iteratee)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, iteratee</span>)</span>{
    <span class="hljs-keyword">return</span> arr.map(iteratee)
}</code></pre>
<p>然而当我们这样使用 <code>_.map([1, 2, 3])</code> 时便会报错，因为我们没有传入 iteratee 函数，然而使用 underscore 却没有问题，结果是返回一个相同的新数组，原因就在于当 iteratee 为 undefined 的时候，underscore 视为传入了 <code>_.identity</code> 函数。就相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.map = function(arr, iteratee){
    if (!iteratee) iteratee = _.identity
    return arr.map(iteratee)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, iteratee</span>)</span>{
    <span class="hljs-keyword">if</span> (!iteratee) iteratee = _.identity
    <span class="hljs-keyword">return</span> arr.map(iteratee)
}</code></pre>
<p>简而言之，如果我们想要复制一个数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var clonedArr = [1, 2, 3].map(_.identity) // [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> clonedArr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(_.identity) <span class="hljs-comment">// [1, 2, 3]</span></code></pre>
<h2 id="articleHeader2">_.constant</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.constant = function(value) {
    return function() {
        return value;
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.constant = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> value;
    };
};</code></pre>
<p>该函数传入一个 value，然后返回一个返回该 value 的函数，这又有什么用呢？我们来看个 demo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;
var getValue = _.constant(value);

value = 2;

getValue(); // 1
getValue(); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> getValue = _.constant(value);

value = <span class="hljs-number">2</span>;

getValue(); <span class="hljs-comment">// 1</span>
getValue(); <span class="hljs-comment">// 1</span></code></pre>
<p>这很容易让人想到 ES6 的 const，我一开始以为就是用来表示 ES6 的 const ，后来看了这个函数起源的 issue，才发现并非如此，它其实像下面的 _.noop 函数一样可以作为默认函数使用。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.select(collection, filterFunction || function() { return true; })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">_.select(collection, filterFunction || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; })</code></pre>
<p>我们根据 filterFunction 筛选 collection 中符合条件的元素，如果没有传 filterFunction，我们就返回所有的元素，如果有 <code>_.constant</code> 函数，我们可以将其简化为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.select(collection, filterFunction || _.constant(true))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">_.select(collection, filterFunction || _.constant(<span class="hljs-literal">true</span>))</code></pre>
<p>尽管没有什么大的改变，但是语义更加明确。</p>
<h2 id="articleHeader3">_.noop</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.noop = function(){};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">_.noop = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};</code></pre>
<p>一个空函数，看起来依旧没什么用……</p>
<p>noop 函数可以用于作为默认值，这样就可以省去是否存在的判断，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不使用 noop
function a(value, callback){
    // 每次使用 callback 都要判断一次
    _.isFunction(callback) &amp;&amp; callback()
}

// 使用 noop
function a(value, callback) {
    // 判断一次
    if(!_.isFunction(callback)) callback = _.noop;

    // 以后都可以直接使用
    callback()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 不使用 noop</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params">value, callback</span>)</span>{
    <span class="hljs-comment">// 每次使用 callback 都要判断一次</span>
    _.isFunction(callback) &amp;&amp; callback()
}

<span class="hljs-comment">// 使用 noop</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params">value, callback</span>) </span>{
    <span class="hljs-comment">// 判断一次</span>
    <span class="hljs-keyword">if</span>(!_.isFunction(callback)) callback = _.noop;

    <span class="hljs-comment">// 以后都可以直接使用</span>
    callback()
}</code></pre>
<h2 id="articleHeader4">deepGet</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
        if (obj == null) return void 0;
        obj = obj[path[i]];
    }
    return length ? obj : void 0;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> deepGet = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, path</span>) </span>{
    <span class="hljs-keyword">var</span> length = path.length;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
        <span class="hljs-keyword">if</span> (obj == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
        obj = obj[path[i]];
    }
    <span class="hljs-keyword">return</span> length ? obj : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
};</code></pre>
<p>deepGet 用于获得对象深层次的值。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { 
    value: { 
        deepValue: 2
    } 
}

console.log(deepGet(obj, ['value', 'deepValue']))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = { 
    <span class="hljs-attr">value</span>: { 
        <span class="hljs-attr">deepValue</span>: <span class="hljs-number">2</span>
    } 
}

<span class="hljs-built_in">console</span>.log(deepGet(obj, [<span class="hljs-string">'value'</span>, <span class="hljs-string">'deepValue'</span>]))</code></pre>
<p>使用这个函数，可以避免深层次取值时，因为没有其中的一个属性，导致的报错。</p>
<h2 id="articleHeader5">shallowProperty</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> shallowProperty = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> obj == <span class="hljs-literal">null</span> ? <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> : obj[key];
    };
};</code></pre>
<p>shallowProperty 也是用于获取对象的属性，也许你会好奇在开发中，直接使用<code>.</code> 不就可以获取对象的属性了，为什么还要写成这样呢？我们来举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取 arr 所有元素的 name 属性
var arr = [
    {
        value: 1,
        name: 'Kevin'
    },
    {
        value: 2,
        name: 'Daisy'
    }
]

// 普通方式
var names = arr.map(function(item){
    return item.name;
})

// 使用 shallowProperty
var names = arr.map(shallowProperty('name'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取 arr 所有元素的 name 属性</span>
<span class="hljs-keyword">var</span> arr = [
    {
        <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Kevin'</span>
    },
    {
        <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Daisy'</span>
    }
]

<span class="hljs-comment">// 普通方式</span>
<span class="hljs-keyword">var</span> names = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
    <span class="hljs-keyword">return</span> item.name;
})

<span class="hljs-comment">// 使用 shallowProperty</span>
<span class="hljs-keyword">var</span> names = arr.map(shallowProperty(<span class="hljs-string">'name'</span>))</code></pre>
<h2 id="articleHeader6">_.property</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.property = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">if</span> (!_.isArray(path)) {
      <span class="hljs-keyword">return</span> shallowProperty(path);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> deepGet(obj, path);
    };
};</code></pre>
<p><code>_.property</code> 结合了 deepGet 和 shallowProperty，可以获取元素深层次的值。上面一个例子也可以写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var names = arr.map(_.property('name'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> names = arr.map(_.property(<span class="hljs-string">'name'</span>))</code></pre>
<h2 id="articleHeader7">_.propertyOf</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.propertyOf = function(obj) {
    if (obj == null) {
        return function(){};
    }
    return function(path) {
        return !Array.isArray(path) ? obj[path] : deepGet(obj, path);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.propertyOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (obj == <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
        <span class="hljs-keyword">return</span> !<span class="hljs-built_in">Array</span>.isArray(path) ? obj[path] : deepGet(obj, path);
    };
};</code></pre>
<p><code>_.property</code> 返回一个函数，这个函数返回任何传入的对象的指定属性。 </p>
<p><code>_.propertyOf</code> 与 <code>_.property</code> 相反。需要一个对象，并返回一个函数，这个函数将返回一个提供的属性的值。 </p>
<p>我们写个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取 person 对象的所有属性值
var person = {
    name: 'Kevin',
    age: '18'
};

// 普通方式
var values = Object.keys(person).map((key) => person[key]); // [&quot;Kevin&quot;, &quot;18&quot;]

// 使用 _.propertyOf
var values = Object.keys(person).map(_.propertyOf(person)); // [&quot;Kevin&quot;, &quot;18&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取 person 对象的所有属性值</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Kevin'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-string">'18'</span>
};

<span class="hljs-comment">// 普通方式</span>
<span class="hljs-keyword">var</span> values = <span class="hljs-built_in">Object</span>.keys(person).map(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> person[key]); <span class="hljs-comment">// ["Kevin", "18"]</span>

<span class="hljs-comment">// 使用 _.propertyOf</span>
<span class="hljs-keyword">var</span> values = <span class="hljs-built_in">Object</span>.keys(person).map(_.propertyOf(person)); <span class="hljs-comment">// ["Kevin", "18"</span></code></pre>
<h2 id="articleHeader8">_.random</h2>
<p>返回一个 min 和 max 之间的随机整数。如果你只传递一个参数，那么将返回 0 和这个参数之间的整数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.random = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">min, max</span>) </span>{
    <span class="hljs-keyword">if</span> (max == <span class="hljs-literal">null</span>) {
      max = min;
      min = <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">return</span> min + <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (max - min + <span class="hljs-number">1</span>));
  };</code></pre>
<p>注意：该随机值有可能是 min 或 max。</p>
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
underscore 系列之防冲突与 Utility Functions

## 原文链接
[https://segmentfault.com/a/1190000012432529](https://segmentfault.com/a/1190000012432529)


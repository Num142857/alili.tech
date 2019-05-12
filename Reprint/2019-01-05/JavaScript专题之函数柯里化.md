---
title: 'JavaScript专题之函数柯里化' 
date: 2019-01-05 2:30:10
hidden: true
slug: klunat2lxvm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十三篇，讲解函数柯里化以及如何实现一个 curry 函数</p></blockquote>
<h2 id="articleHeader0">定义</h2>
<p>维基百科中对柯里化 (Currying) 的定义为：</p>
<blockquote><p>In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.</p></blockquote>
<p>翻译成中文：</p>
<p>在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// 执行 add 函数，一次传入两个参数即可</span>
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span>

<span class="hljs-comment">// 假设有一个 curry 函数可以做到柯里化</span>
<span class="hljs-keyword">var</span> addCurry = curry(add);
addCurry(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span></code></pre>
<h2 id="articleHeader1">用途</h2>
<p>我们会讲到如何写出这个 curry 函数，并且会将这个 curry 函数写的很强大，但是在编写之前，我们需要知道柯里化到底有什么用？</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 示意而已
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', &quot;name=kevin&quot;)
ajax('POST', 'www.test2.com', &quot;name=kevin&quot;)
ajax('POST', 'www.test3.com', &quot;name=kevin&quot;)

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', &quot;name=kevin&quot;);

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest(&quot;name=kevin&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 示意而已</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">type, url, data</span>) </span>{
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(type, url, <span class="hljs-literal">true</span>);
    xhr.send(data);
}

<span class="hljs-comment">// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余</span>
ajax(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'www.test.com'</span>, <span class="hljs-string">"name=kevin"</span>)
ajax(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'www.test2.com'</span>, <span class="hljs-string">"name=kevin"</span>)
ajax(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'www.test3.com'</span>, <span class="hljs-string">"name=kevin"</span>)

<span class="hljs-comment">// 利用 curry</span>
<span class="hljs-keyword">var</span> ajaxCurry = curry(ajax);

<span class="hljs-comment">// 以 POST 类型请求数据</span>
<span class="hljs-keyword">var</span> post = ajaxCurry(<span class="hljs-string">'POST'</span>);
post(<span class="hljs-string">'www.test.com'</span>, <span class="hljs-string">"name=kevin"</span>);

<span class="hljs-comment">// 以 POST 类型请求来自于 www.test.com 的数据</span>
<span class="hljs-keyword">var</span> postFromTest = post(<span class="hljs-string">'www.test.com'</span>);
postFromTest(<span class="hljs-string">"name=kevin"</span>);</code></pre>
<p>想想 jQuery 虽然有 $.ajax 这样通用的方法，但是也有 $.get 和 $.post 的语法糖。(当然 jQuery 底层是否是这样做的，我就没有研究了)。</p>
<p>curry 的这种用途可以理解为：参数复用。本质上是降低通用性，提高适用性。</p>
<p>可是即便如此，是不是依然感觉没什么用呢？</p>
<p>如果我们仅仅是把参数一个一个传进去，意义可能不大，但是如果我们是把柯里化后的函数传给其他函数比如 map 呢？</p>
<p>举个例子：</p>
<p>比如我们有这样一段数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = [{name: 'kevin'}, {name: 'daisy'}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> person = [{<span class="hljs-attr">name</span>: <span class="hljs-string">'kevin'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'daisy'</span>}]</code></pre>
<p>如果我们要获取所有的 name 值，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = person.map(function (item) {
    return item.name;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = person.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">return</span> item.name;
})</code></pre>
<p>不过如果我们有 curry 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var prop = curry(function (key, obj) {
    return obj[key]
});

var name = person.map(prop('name'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> prop = curry(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, obj</span>) </span>{
    <span class="hljs-keyword">return</span> obj[key]
});

<span class="hljs-keyword">var</span> name = person.map(prop(<span class="hljs-string">'name'</span>))</code></pre>
<p>我们为了获取 name 属性还要再编写一个 prop 函数，是不是又麻烦了些？</p>
<p>但是要注意，prop 函数编写一次后，以后可以多次使用，实际上代码从原本的三行精简成了一行，而且你看代码是不是更加易懂了？</p>
<p><code>person.map(prop('name'))</code> 就好像直白的告诉你：person 对象遍历(map)获取(prop) name 属性。</p>
<p>是不是感觉有点意思了呢？</p>
<h2 id="articleHeader2">第一版</h2>
<p>未来我们会接触到更多有关柯里化的应用，不过那是未来的事情了，现在我们该编写这个 curry 函数了。</p>
<p>一个经常会看到的 curry 函数的实现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> newArgs = args.concat([].slice.call(<span class="hljs-built_in">arguments</span>));
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, newArgs);
    };
};</code></pre>
<p>我们可以这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b;
}

var addCurry = curry(add, 1, 2);
addCurry() // 3
//或者
var addCurry = curry(add, 1);
addCurry(2) // 3
//或者
var addCurry = curry(add);
addCurry(1, 2) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-keyword">var</span> addCurry = curry(add, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
addCurry() <span class="hljs-comment">// 3</span>
<span class="hljs-comment">//或者</span>
<span class="hljs-keyword">var</span> addCurry = curry(add, <span class="hljs-number">1</span>);
addCurry(<span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span>
<span class="hljs-comment">//或者</span>
<span class="hljs-keyword">var</span> addCurry = curry(add);
addCurry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span></code></pre>
<p>已经有柯里化的感觉了，但是还没有达到要求，不过我们可以把这个函数用作辅助函数，帮助我们写真正的 curry 函数。</p>
<h2 id="articleHeader3">第二版</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {

    length = length || fn.length;

    var slice = Array.prototype.slice;

    return function() {
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sub_curry</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, args.concat([].slice.call(<span class="hljs-built_in">arguments</span>)));
    };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn, length</span>) </span>{

    length = length || fn.length;

    <span class="hljs-keyword">var</span> slice = <span class="hljs-built_in">Array</span>.prototype.slice;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length &lt; length) {
            <span class="hljs-keyword">var</span> combined = [fn].concat(slice.call(<span class="hljs-built_in">arguments</span>));
            <span class="hljs-keyword">return</span> curry(sub_curry.apply(<span class="hljs-keyword">this</span>, combined), length - <span class="hljs-built_in">arguments</span>.length);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
    };
}</code></pre>
<p>我们验证下这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = curry(function(a, b, c) {
    return [a, b, c];
});

fn(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
fn(&quot;a&quot;, &quot;b&quot;)(&quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
fn(&quot;a&quot;)(&quot;b&quot;)(&quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
fn(&quot;a&quot;)(&quot;b&quot;, &quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fn = curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-keyword">return</span> [a, b, c];
});

fn(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span>
fn(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>)(<span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span>
fn(<span class="hljs-string">"a"</span>)(<span class="hljs-string">"b"</span>)(<span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span>
fn(<span class="hljs-string">"a"</span>)(<span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span></code></pre>
<p>效果已经达到我们的预期，然而这个 curry 函数的实现好难理解呐……</p>
<p>为了让大家更好的理解这个 curry 函数，我给大家写个极简版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sub_curry(fn){
    return function(){
        return fn()
    }
}

function curry(fn, length){
    length = length || 4;
    return function(){
        if (length > 1) {
            return curry(sub_curry(fn), --length)
        }
        else {
            return fn()
        }
    }
}

var fn0 = function(){
    console.log(1)
}

var fn1 = curry(fn0)

fn1()()()() // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sub_curry</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> fn()
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn, length</span>)</span>{
    length = length || <span class="hljs-number">4</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (length &gt; <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">return</span> curry(sub_curry(fn), --length)
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fn()
        }
    }
}

<span class="hljs-keyword">var</span> fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}

<span class="hljs-keyword">var</span> fn1 = curry(fn0)

fn1()()()() <span class="hljs-comment">// 1</span></code></pre>
<p>大家先从理解这个 curry 函数开始。</p>
<p>当执行 fn1() 时，函数返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curry(sub_curry(fn0))
// 相当于
curry(function(){
    return fn0()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">curry(sub_curry(fn0))
<span class="hljs-comment">// 相当于</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> fn0()
})</code></pre>
<p>当执行 fn1()() 时，函数返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curry(sub_curry(function(){
    return fn0()
}))
// 相当于
curry(function(){
    return (function(){
        return fn0()
    })()
})
// 相当于
curry(function(){
    return fn0()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">curry(sub_curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> fn0()
}))
<span class="hljs-comment">// 相当于</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> fn0()
    })()
})
<span class="hljs-comment">// 相当于</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> fn0()
})</code></pre>
<p>当执行 fn1()()() 时，函数返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 跟 fn1()() 的分析过程一样
curry(function(){
    return fn0()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 跟 fn1()() 的分析过程一样</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> fn0()
})</code></pre>
<p>当执行 fn1()()()() 时，因为此时 length &gt; 2 为 false，所以执行 fn()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn()
// 相当于
(function(){
    return fn0()
})()
// 相当于
fn0()
// 执行 fn0 函数，打印 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fn()
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> fn0()
})()
<span class="hljs-comment">// 相当于</span>
fn0()
<span class="hljs-comment">// 执行 fn0 函数，打印 1</span></code></pre>
<p>再回到真正的 curry 函数，我们以下面的例子为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn0 = function(a, b, c, d) {
    return [a, b, c, d];
}

var fn1 = curry(fn0);

fn1(&quot;a&quot;, &quot;b&quot;)(&quot;c&quot;)(&quot;d&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, c, d</span>) </span>{
    <span class="hljs-keyword">return</span> [a, b, c, d];
}

<span class="hljs-keyword">var</span> fn1 = curry(fn0);

fn1(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>)(<span class="hljs-string">"c"</span>)(<span class="hljs-string">"d"</span>)</code></pre>
<p>当执行 fn1("a", "b") 时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn1(&quot;a&quot;, &quot;b&quot;)
// 相当于
curry(fn0)(&quot;a&quot;, &quot;b&quot;)
// 相当于
curry(sub_curry(fn0, &quot;a&quot;, &quot;b&quot;))
// 相当于
// 注意 ... 只是一个示意，表示该函数执行时传入的参数会作为 fn0 后面的参数传入
curry(function(...){
    return fn0(&quot;a&quot;, &quot;b&quot;, ...)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fn1(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>)
<span class="hljs-comment">// 相当于</span>
curry(fn0)(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>)
<span class="hljs-comment">// 相当于</span>
curry(sub_curry(fn0, <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>))
<span class="hljs-comment">// 相当于</span>
<span class="hljs-comment">// 注意 ... 只是一个示意，表示该函数执行时传入的参数会作为 fn0 后面的参数传入</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...</span>)</span>{
    <span class="hljs-keyword">return</span> fn0(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, ...)
})</code></pre>
<p>当执行 fn1("a", "b")("c") 时，函数返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curry(sub_curry(function(...){
    return fn0(&quot;a&quot;, &quot;b&quot;, ...)
}), &quot;c&quot;)
// 相当于
curry(function(...){
    return (function(...) {return fn0(&quot;a&quot;, &quot;b&quot;, ...)})(&quot;c&quot;)
})
// 相当于
curry(function(...){
     return fn0(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, ...)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">curry(sub_curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...</span>)</span>{
    <span class="hljs-keyword">return</span> fn0(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, ...)
}), <span class="hljs-string">"c"</span>)
<span class="hljs-comment">// 相当于</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...</span>)</span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...</span>) </span>{<span class="hljs-keyword">return</span> fn0(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, ...)})(<span class="hljs-string">"c"</span>)
})
<span class="hljs-comment">// 相当于</span>
curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...</span>)</span>{
     <span class="hljs-keyword">return</span> fn0(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, ...)
})</code></pre>
<p>当执行 fn1("a", "b")("c")("d") 时，此时 arguments.length &lt; length 为 false ，执行 fn(arguments)，相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(...){
    return fn0(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, ...)
})(&quot;d&quot;)
// 相当于
fn0(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...</span>)</span>{
    <span class="hljs-keyword">return</span> fn0(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, ...)
})(<span class="hljs-string">"d"</span>)
<span class="hljs-comment">// 相当于</span>
fn0(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"d"</span>)</code></pre>
<p>函数执行结束。</p>
<p>所以，其实整段代码又很好理解：</p>
<p>sub_curry 的作用就是用函数包裹原函数，然后给原函数传入之前的参数，当执行 fn0(...)(...) 的时候，执行包裹函数，返回原函数，然后再调用 sub_curry 再包裹原函数，然后将新的参数混合旧的参数再传入原函数，直到函数参数的数目达到要求为止。</p>
<p>如果要明白 curry 函数的运行原理，大家还是要动手写一遍，尝试着分析执行步骤。</p>
<h2 id="articleHeader4">更易懂的实现</h2>
<p>当然了，如果你觉得还是无法理解，你可以选择下面这种实现方式，可以实现同样的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function curry(fn, args) {
    length = fn.length;

    args = args || [];

    return function() {

        var _args = args.slice(0),

            arg, i;

        for (i = 0; i < arguments.length; i++) {

            arg = arguments[i];

            _args.push(arg);

        }
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}


var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

fn(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
fn(&quot;a&quot;, &quot;b&quot;)(&quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
fn(&quot;a&quot;)(&quot;b&quot;)(&quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
fn(&quot;a&quot;)(&quot;b&quot;, &quot;c&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn, args</span>) </span>{
    length = fn.length;

    args = args || [];

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-keyword">var</span> _args = args.slice(<span class="hljs-number">0</span>),

            arg, i;

        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {

            arg = <span class="hljs-built_in">arguments</span>[i];

            _args.push(arg);

        }
        <span class="hljs-keyword">if</span> (_args.length &lt; length) {
            <span class="hljs-keyword">return</span> curry.call(<span class="hljs-keyword">this</span>, fn, _args);
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, _args);
        }
    }
}


<span class="hljs-keyword">var</span> fn = curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-built_in">console</span>.log([a, b, c]);
});

fn(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span>
fn(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>)(<span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span>
fn(<span class="hljs-string">"a"</span>)(<span class="hljs-string">"b"</span>)(<span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span>
fn(<span class="hljs-string">"a"</span>)(<span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span></code></pre>
<p>或许大家觉得这种方式更好理解，又能实现一样的效果，为什么不直接就讲这种呢？</p>
<p>因为想给大家介绍各种实现的方法嘛，不能因为难以理解就不给大家介绍呐~</p>
<h3 id="articleHeader5">第三版</h3>
<p>curry 函数写到这里其实已经很完善了，但是注意这个函数的传参顺序必须是从左到右，根据形参的顺序依次传入，如果我不想根据这个顺序传呢？</p>
<p>我们可以创建一个占位符，比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

fn(&quot;a&quot;, _, &quot;c&quot;)(&quot;b&quot;) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fn = curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-built_in">console</span>.log([a, b, c]);
});

fn(<span class="hljs-string">"a"</span>, _, <span class="hljs-string">"c"</span>)(<span class="hljs-string">"b"</span>) <span class="hljs-comment">// ["a", "b", "c"]</span></code></pre>
<p>我们直接看第三版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
function curry(fn, args, holes) {
    length = fn.length;

    args = args || [];

    holes = holes || [];

    return function() {

        var _args = args.slice(0),
            _holes = holes.slice(0),
            argsLen = args.length,
            holesLen = holes.length,
            arg, i, index = 0;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
            if (arg === _ &amp;&amp; holesLen) {
                index++
                if (index > holesLen) {
                    _args.push(arg);
                    _holes.push(argsLen - 1 + index - holesLen)
                }
            }
            // 处理类似 fn(1)(_) 这种情况
            else if (arg === _) {
                _args.push(arg);
                _holes.push(argsLen + i);
            }
            // 处理类似 fn(_, 2)(1) 这种情况
            else if (holesLen) {
                // fn(_, 2)(_, 3)
                if (index >= holesLen) {
                    _args.push(arg);
                }
                // fn(_, 2)(1) 用参数 1 替换占位符
                else {
                    _args.splice(_holes[index], 1, arg);
                    _holes.splice(index, 1)
                }
            }
            else {
                _args.push(arg);
            }

        }
        if (_holes.length || _args.length < length) {
            return curry.call(this, fn, _args, _holes);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

var _ = {};

var fn = curry(function(a, b, c, d, e) {
    console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
fn(1, 2, 3, 4, 5);
fn(_, 2, 3, 4, 5)(1);
fn(1, _, 3, 4, 5)(2);
fn(1, _, 3)(_, 4)(2)(5);
fn(1, _, _, 4)(_, 3)(2)(5);
fn(_, 2)(_, _, 4)(1)(3)(5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn, args, holes</span>) </span>{
    length = fn.length;

    args = args || [];

    holes = holes || [];

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-keyword">var</span> _args = args.slice(<span class="hljs-number">0</span>),
            _holes = holes.slice(<span class="hljs-number">0</span>),
            argsLen = args.length,
            holesLen = holes.length,
            arg, i, index = <span class="hljs-number">0</span>;

        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
            arg = <span class="hljs-built_in">arguments</span>[i];
            <span class="hljs-comment">// 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标</span>
            <span class="hljs-keyword">if</span> (arg === _ &amp;&amp; holesLen) {
                index++
                <span class="hljs-keyword">if</span> (index &gt; holesLen) {
                    _args.push(arg);
                    _holes.push(argsLen - <span class="hljs-number">1</span> + index - holesLen)
                }
            }
            <span class="hljs-comment">// 处理类似 fn(1)(_) 这种情况</span>
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (arg === _) {
                _args.push(arg);
                _holes.push(argsLen + i);
            }
            <span class="hljs-comment">// 处理类似 fn(_, 2)(1) 这种情况</span>
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (holesLen) {
                <span class="hljs-comment">// fn(_, 2)(_, 3)</span>
                <span class="hljs-keyword">if</span> (index &gt;= holesLen) {
                    _args.push(arg);
                }
                <span class="hljs-comment">// fn(_, 2)(1) 用参数 1 替换占位符</span>
                <span class="hljs-keyword">else</span> {
                    _args.splice(_holes[index], <span class="hljs-number">1</span>, arg);
                    _holes.splice(index, <span class="hljs-number">1</span>)
                }
            }
            <span class="hljs-keyword">else</span> {
                _args.push(arg);
            }

        }
        <span class="hljs-keyword">if</span> (_holes.length || _args.length &lt; length) {
            <span class="hljs-keyword">return</span> curry.call(<span class="hljs-keyword">this</span>, fn, _args, _holes);
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, _args);
        }
    }
}

<span class="hljs-keyword">var</span> _ = {};

<span class="hljs-keyword">var</span> fn = curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, c, d, e</span>) </span>{
    <span class="hljs-built_in">console</span>.log([a, b, c, d, e]);
});

<span class="hljs-comment">// 验证 输出全部都是 [1, 2, 3, 4, 5]</span>
fn(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>);
fn(_, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)(<span class="hljs-number">1</span>);
fn(<span class="hljs-number">1</span>, _, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)(<span class="hljs-number">2</span>);
fn(<span class="hljs-number">1</span>, _, <span class="hljs-number">3</span>)(_, <span class="hljs-number">4</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">5</span>);
fn(<span class="hljs-number">1</span>, _, _, <span class="hljs-number">4</span>)(_, <span class="hljs-number">3</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">5</span>);
fn(_, <span class="hljs-number">2</span>)(_, _, <span class="hljs-number">4</span>)(<span class="hljs-number">1</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">5</span>)</code></pre>
<h2 id="articleHeader6">写在最后</h2>
<p>至此，我们已经实现了一个强大的 curry 函数，可是这个 curry 函数符合柯里化的定义吗？柯里化可是将一个多参数的函数转换成多个单参数的函数，但是现在我们不仅可以传入一个参数，还可以一次传入两个参数，甚至更多参数……这看起来更像一个柯里化 (curry) 和偏函数 (partial application) 的综合应用，可是什么又是偏函数呢？下篇文章会讲到。</p>
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
JavaScript专题之函数柯里化

## 原文链接
[https://segmentfault.com/a/1190000010608477](https://segmentfault.com/a/1190000010608477)


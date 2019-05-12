---
title: 'JavaScript专题之从零实现jQuery的extend' 
date: 2019-01-08 2:30:11
hidden: true
slug: c2v3fcgdg15
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScritp 专题系列第七篇，讲解如何从零实现一个 jQuery 的 extend 函数</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>jQuery 的 extend 是 jQuery 中应用非常多的一个函数，今天我们一边看 jQuery 的 extend 的特性，一边实现一个 extend!</p>
<h2 id="articleHeader1">extend 基本用法</h2>
<p>先来看看 extend 的功能，引用 jQuery 官网：</p>
<blockquote><p>Merge the contents of two or more objects together into the first object.</p></blockquote>
<p>翻译过来就是，合并两个或者更多的对象的内容到第一个对象中。</p>
<p>让我们看看 extend 的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.extend( target [, object1 ] [, objectN ] )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">jQuery.extend( target [, object1 ] [, objectN ] )</code></pre>
<p>第一个参数 target，表示要拓展的目标，我们就称它为目标对象吧。</p>
<p>后面的参数，都传入对象，内容都会复制到目标对象中，我们就称它们为待复制对象吧。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b3: 4 },
//    c: 3,
//    d: 4
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: { <span class="hljs-attr">b1</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b2</span>: <span class="hljs-number">2</span> }
};

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">b</span>: { <span class="hljs-attr">b1</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">b3</span>: <span class="hljs-number">4</span> },
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
};

<span class="hljs-keyword">var</span> obj3 = {
    <span class="hljs-attr">d</span>: <span class="hljs-number">4</span>
}

<span class="hljs-built_in">console</span>.log($.extend(obj1, obj2, obj3));

<span class="hljs-comment">// {</span>
<span class="hljs-comment">//    a: 1,</span>
<span class="hljs-comment">//    b: { b1: 3, b3: 4 },</span>
<span class="hljs-comment">//    c: 3,</span>
<span class="hljs-comment">//    d: 4</span>
<span class="hljs-comment">// }</span></code></pre>
<p>当两个对象出现相同字段的时候，后者会覆盖前者，而不会进行深层次的覆盖。</p>
<h2 id="articleHeader2">extend 第一版</h2>
<p>结合着上篇写得 <a href="https://github.com/mqyqingfeng/Blog/issues/32" rel="nofollow noreferrer" target="_blank">《JavaScript专题之深浅拷贝》</a>，我们尝试着自己写一个 extend 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function extend() {
    var name, options, src, copy;
    var length = arguments.length;
    var i = 1;
    var target = arguments[0];

    for (; i < length; i++) {
        options = arguments[i];
        if (options != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> name, options, src, copy;
    <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length;
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> target = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];

    <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
        options = <span class="hljs-built_in">arguments</span>[i];
        <span class="hljs-keyword">if</span> (options != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> options) {
                src = target[name];
                copy = options[name];
                <span class="hljs-keyword">if</span> (copy !== <span class="hljs-literal">undefined</span>){
                    target[name] = copy;
                }
            }
        }
    }

    <span class="hljs-keyword">return</span> target;
};</code></pre>
<h2 id="articleHeader3">extend 深拷贝</h2>
<p>那如何进行深层次的复制呢？jQuery v1.1.4 加入了一个新的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.extend( [deep], target, object1 [, objectN ] )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">jQuery.extend( [deep], target, object1 [, objectN ] )</code></pre>
<p>也就是说，函数的第一个参数可以传一个布尔值，如果为 true，我们就会进行深拷贝，false 依然当做浅拷贝，这个时候，target 就往后移动到第二个参数。</p>
<p>还是举这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(true, obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b2: 2, b3: 4 },
//    c: 3,
//    d: 4
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: { <span class="hljs-attr">b1</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b2</span>: <span class="hljs-number">2</span> }
};

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">b</span>: { <span class="hljs-attr">b1</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">b3</span>: <span class="hljs-number">4</span> },
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
};

<span class="hljs-keyword">var</span> obj3 = {
    <span class="hljs-attr">d</span>: <span class="hljs-number">4</span>
}

<span class="hljs-built_in">console</span>.log($.extend(<span class="hljs-literal">true</span>, obj1, obj2, obj3));

<span class="hljs-comment">// {</span>
<span class="hljs-comment">//    a: 1,</span>
<span class="hljs-comment">//    b: { b1: 3, b2: 2, b3: 4 },</span>
<span class="hljs-comment">//    c: 3,</span>
<span class="hljs-comment">//    d: 4</span>
<span class="hljs-comment">// }</span></code></pre>
<p>因为采用了深拷贝，会遍历到更深的层次进行添加和覆盖。</p>
<h2 id="articleHeader4">extend 第二版</h2>
<p>我们来实现深拷贝的功能，值得注意的是：</p>
<ol>
<li><p>需要根据第一个参数的类型，确定 target 和要合并的对象的下标起始值。</p></li>
<li><p>如果是深拷贝，根据 copy 的类型递归 extend。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function extend() {
    // 默认不进行深拷贝
    var deep = false;
    var name, options, src, copy;
    var length = arguments.length;
    // 记录要复制的对象的下标
    var i = 1;
    // 第一个参数不传布尔值的情况下，target默认是第一个参数
    var target = arguments[0] || {};
    // 如果第一个参数是布尔值，第二个参数是才是target
    if (typeof target == 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if (typeof target !== 'object') {
        target = {}
    }

    // 循环遍历要复制的对象们
    for (; i < length; i++) {
        // 获取当前对象
        options = arguments[i];
        // 要求不能为空 避免extend(a,,b)这种情况
        if (options != null) {
            for (name in options) {
                // 目标属性值
                src = target[name];
                // 要复制的对象的属性值
                copy = options[name];

                if (deep &amp;&amp; copy &amp;&amp; typeof copy == 'object') {
                    // 递归调用
                    target[name] = extend(deep, src, copy);
                }
                else if (copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 默认不进行深拷贝</span>
    <span class="hljs-keyword">var</span> deep = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">var</span> name, options, src, copy;
    <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length;
    <span class="hljs-comment">// 记录要复制的对象的下标</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;
    <span class="hljs-comment">// 第一个参数不传布尔值的情况下，target默认是第一个参数</span>
    <span class="hljs-keyword">var</span> target = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] || {};
    <span class="hljs-comment">// 如果第一个参数是布尔值，第二个参数是才是target</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target == <span class="hljs-string">'boolean'</span>) {
        deep = target;
        target = <span class="hljs-built_in">arguments</span>[i] || {};
        i++;
    }
    <span class="hljs-comment">// 如果target不是对象，我们是无法进行复制的，所以设为{}</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">'object'</span>) {
        target = {}
    }

    <span class="hljs-comment">// 循环遍历要复制的对象们</span>
    <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
        <span class="hljs-comment">// 获取当前对象</span>
        options = <span class="hljs-built_in">arguments</span>[i];
        <span class="hljs-comment">// 要求不能为空 避免extend(a,,b)这种情况</span>
        <span class="hljs-keyword">if</span> (options != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> options) {
                <span class="hljs-comment">// 目标属性值</span>
                src = target[name];
                <span class="hljs-comment">// 要复制的对象的属性值</span>
                copy = options[name];

                <span class="hljs-keyword">if</span> (deep &amp;&amp; copy &amp;&amp; <span class="hljs-keyword">typeof</span> copy == <span class="hljs-string">'object'</span>) {
                    <span class="hljs-comment">// 递归调用</span>
                    target[name] = extend(deep, src, copy);
                }
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (copy !== <span class="hljs-literal">undefined</span>){
                    target[name] = copy;
                }
            }
        }
    }

    <span class="hljs-keyword">return</span> target;
};</code></pre>
<p>在实现上，核心的部分还是跟上篇实现的深浅拷贝函数一致，如果要复制的对象的属性值是一个对象，就递归调用 extend。不过 extend 的实现中，多了很多细节上的判断，比如第一个参数是否是布尔值，target 是否是一个对象，不传参数时的默认值等。</p>
<p>接下来，我们看几个 jQuery 的 extend 使用效果：</p>
<h2 id="articleHeader5">target 是函数</h2>
<p>在我们的实现中，<code>typeof target</code> 必须等于 <code>object</code>，我们才会在这个 <code>target</code> 基础上进行拓展，然而我们用 <code>typeof</code> 判断一个函数时，会返回<code>function</code>，也就是说，我们无法在一个函数上进行拓展！</p>
<p>什么，我们还能在一个函数上进行拓展！！</p>
<p>当然啦，毕竟函数也是一种对象嘛，让我们看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {}

a.target = 'b';

console.log(a.target); // b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{}

a.target = <span class="hljs-string">'b'</span>;

<span class="hljs-built_in">console</span>.log(a.target); <span class="hljs-comment">// b</span></code></pre>
<p>实际上，在 underscore 的实现中，underscore 的各种方法便是挂在了函数上！</p>
<p>所以在这里我们还要判断是不是函数，这时候我们便可以使用<a href="https://github.com/mqyqingfeng/Blog/issues/28" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断(上)》</a>中写得 isFunction 函数</p>
<p>我们这样修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof target !== &quot;object&quot; &amp;&amp; !isFunction(target)) {
    target = {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">"object"</span> &amp;&amp; !isFunction(target)) {
    target = {};
}</code></pre>
<h2 id="articleHeader6">类型不一致</h2>
<p>其实我们实现的方法有个小 bug ，不信我们写个 demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
    a: 1,
    b: {
        c: 2
    }
}

var obj2 = {
    b: {
        c: [5],

    }
}

var d = extend(true, obj1, obj2)
console.log(d);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>
    }
}

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">c</span>: [<span class="hljs-number">5</span>],

    }
}

<span class="hljs-keyword">var</span> d = extend(<span class="hljs-literal">true</span>, obj1, obj2)
<span class="hljs-built_in">console</span>.log(d);</code></pre>
<p>我们预期会返回这样一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    a: 1,
    b: {
        c: [5]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">c</span>: [<span class="hljs-number">5</span>]
    }
}</code></pre>
<p>然而返回了这样一个对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    a: 1,
    b: {
        c: {
            0: 5
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">c</span>: {
            <span class="hljs-number">0</span>: <span class="hljs-number">5</span>
        }
    }
}</code></pre>
<p>让我们细细分析为什么会导致这种情况：</p>
<p>首先我们在函数的开始写一个 console 函数比如：console.log(1)，然后以上面这个 demo 为例，执行一下，我们会发现 1 打印了三次，这就是说 extend 函数执行了三遍，让我们捋一捋这三遍传入的参数：</p>
<p>第一遍执行到递归调用时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var src = { c: 2 };
var copy = { c: [5]};

target[name] = extend(true, src, copy);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> src = { <span class="hljs-attr">c</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">var</span> copy = { <span class="hljs-attr">c</span>: [<span class="hljs-number">5</span>]};

target[name] = extend(<span class="hljs-literal">true</span>, src, copy);
</code></pre>
<p>第二遍执行到递归调用时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var src = 2;
var copy = [5];

target[name] = extend(true, src, copy);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> src = <span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> copy = [<span class="hljs-number">5</span>];

target[name] = extend(<span class="hljs-literal">true</span>, src, copy);
</code></pre>
<p>第三遍进行最终的赋值，因为 src 是一个基本类型，我们默认使用一个空对象作为目标值，所以最终的结果就变成了对象的属性！</p>
<p>为了解决这个问题，我们需要对目标属性值和待复制对象的属性值进行判断：</p>
<p>判断目标属性值跟要复制的对象的属性值类型是否一致:</p>
<ul>
<li><p>如果待复制对象属性值类型为数组，目标属性值类型不为数组的话，目标属性值就设为 []</p></li>
<li><p>如果待复制对象属性值类型为对象，目标属性值类型不为对象的话，目标属性值就设为 {}</p></li>
</ul>
<p>结合着<a href="https://github.com/mqyqingfeng/Blog/issues/30" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断(下)》</a>中的 isPlainObject 函数，我们可以对类型进行更细致的划分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var clone, copyIsArray;

...

if (deep &amp;&amp; copy &amp;&amp; (isPlainObject(copy) ||
        (copyIsArray = Array.isArray(copy)))) {

    if (copyIsArray) {
        copyIsArray = false;
        clone = src &amp;&amp; Array.isArray(src) ? src : [];

    } else {
        clone = src &amp;&amp; isPlainObject(src) ? src : {};
    }

    target[name] = extend(deep, clone, copy);

} else if (copy !== undefined) {
    target[name] = copy;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> clone, copyIsArray;

...

if (deep &amp;&amp; copy &amp;&amp; (isPlainObject(copy) ||
        (copyIsArray = <span class="hljs-built_in">Array</span>.isArray(copy)))) {

    <span class="hljs-keyword">if</span> (copyIsArray) {
        copyIsArray = <span class="hljs-literal">false</span>;
        clone = src &amp;&amp; <span class="hljs-built_in">Array</span>.isArray(src) ? src : [];

    } <span class="hljs-keyword">else</span> {
        clone = src &amp;&amp; isPlainObject(src) ? src : {};
    }

    target[name] = extend(deep, clone, copy);

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (copy !== <span class="hljs-literal">undefined</span>) {
    target[name] = copy;
}</code></pre>
<h2 id="articleHeader7">循环引用</h2>
<p>实际上，我们还可能遇到一个循环引用的问题，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {name : b};
var b = {name : a}
var c = extend(a, b);
console.log(c);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">name</span> : b};
<span class="hljs-keyword">var</span> b = {<span class="hljs-attr">name</span> : a}
<span class="hljs-keyword">var</span> c = extend(a, b);
<span class="hljs-built_in">console</span>.log(c);</code></pre>
<p>我们会得到一个可以无限展开的对象，类似于这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010183870" src="https://static.alili.tech/img/remote/1460000010183870" alt="循环引用对象" title="循环引用对象" style="cursor: pointer;"></span></p>
<p>为了避免这个问题，我们需要判断要复制的对象属性是否等于 target，如果等于，我们就跳过：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
src = target[name];
copy = options[name];

if (target === copy) {
    continue;
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
src = target[name];
copy = options[name];

<span class="hljs-keyword">if</span> (target === copy) {
    <span class="hljs-keyword">continue</span>;
}
...</code></pre>
<p>如果加上这句，结果就会是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{name: undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">{<span class="hljs-attr">name</span>: <span class="hljs-literal">undefined</span>}</code></pre>
<h2 id="articleHeader8">最终代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function extend() {
    // 默认不进行深拷贝
    var deep = false;
    var name, options, src, copy, clone, copyIsArray;
    var length = arguments.length;
    // 记录要复制的对象的下标
    var i = 1;
    // 第一个参数不传布尔值的情况下，target 默认是第一个参数
    var target = arguments[0] || {};
    // 如果第一个参数是布尔值，第二个参数是 target
    if (typeof target == 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为 {}
    if (typeof target !== &quot;object&quot; &amp;&amp; !isFunction(target)) {
        target = {};
    }

    // 循环遍历要复制的对象们
    for (; i < length; i++) {
        // 获取当前对象
        options = arguments[i];
        // 要求不能为空 避免 extend(a,,b) 这种情况
        if (options != null) {
            for (name in options) {
                // 目标属性值
                src = target[name];
                // 要复制的对象的属性值
                copy = options[name];

                // 解决循环引用
                if (target === copy) {
                    continue;
                }

                // 要递归的对象必须是 plainObject 或者数组
                if (deep &amp;&amp; copy &amp;&amp; (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                    // 要复制的对象属性值类型需要与目标属性值相同
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src &amp;&amp; Array.isArray(src) ? src : [];

                    } else {
                        clone = src &amp;&amp; isPlainObject(src) ? src : {};
                    }

                    target[name] = extend(deep, clone, copy);

                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 默认不进行深拷贝</span>
    <span class="hljs-keyword">var</span> deep = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">var</span> name, options, src, copy, clone, copyIsArray;
    <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length;
    <span class="hljs-comment">// 记录要复制的对象的下标</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;
    <span class="hljs-comment">// 第一个参数不传布尔值的情况下，target 默认是第一个参数</span>
    <span class="hljs-keyword">var</span> target = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] || {};
    <span class="hljs-comment">// 如果第一个参数是布尔值，第二个参数是 target</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target == <span class="hljs-string">'boolean'</span>) {
        deep = target;
        target = <span class="hljs-built_in">arguments</span>[i] || {};
        i++;
    }
    <span class="hljs-comment">// 如果target不是对象，我们是无法进行复制的，所以设为 {}</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">"object"</span> &amp;&amp; !isFunction(target)) {
        target = {};
    }

    <span class="hljs-comment">// 循环遍历要复制的对象们</span>
    <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
        <span class="hljs-comment">// 获取当前对象</span>
        options = <span class="hljs-built_in">arguments</span>[i];
        <span class="hljs-comment">// 要求不能为空 避免 extend(a,,b) 这种情况</span>
        <span class="hljs-keyword">if</span> (options != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> options) {
                <span class="hljs-comment">// 目标属性值</span>
                src = target[name];
                <span class="hljs-comment">// 要复制的对象的属性值</span>
                copy = options[name];

                <span class="hljs-comment">// 解决循环引用</span>
                <span class="hljs-keyword">if</span> (target === copy) {
                    <span class="hljs-keyword">continue</span>;
                }

                <span class="hljs-comment">// 要递归的对象必须是 plainObject 或者数组</span>
                <span class="hljs-keyword">if</span> (deep &amp;&amp; copy &amp;&amp; (isPlainObject(copy) ||
                        (copyIsArray = <span class="hljs-built_in">Array</span>.isArray(copy)))) {
                    <span class="hljs-comment">// 要复制的对象属性值类型需要与目标属性值相同</span>
                    <span class="hljs-keyword">if</span> (copyIsArray) {
                        copyIsArray = <span class="hljs-literal">false</span>;
                        clone = src &amp;&amp; <span class="hljs-built_in">Array</span>.isArray(src) ? src : [];

                    } <span class="hljs-keyword">else</span> {
                        clone = src &amp;&amp; isPlainObject(src) ? src : {};
                    }

                    target[name] = extend(deep, clone, copy);

                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (copy !== <span class="hljs-literal">undefined</span>) {
                    target[name] = copy;
                }
            }
        }
    }

    <span class="hljs-keyword">return</span> target;
};</code></pre>
<h2 id="articleHeader9">思考题</h2>
<p>如果觉得看明白了上面的代码，想想下面两个 demo 的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log(a) // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = extend(<span class="hljs-literal">true</span>, [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// ???</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
    value: {
        3: 1
    }
}

var obj2 = {
    value: [5, 6, 7],

}

var b = extend(true, obj1, obj2) // ???
var c = extend(true, obj2, obj1) // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">value</span>: {
        <span class="hljs-number">3</span>: <span class="hljs-number">1</span>
    }
}

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">value</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>],

}

<span class="hljs-keyword">var</span> b = extend(<span class="hljs-literal">true</span>, obj1, obj2) <span class="hljs-comment">// ???</span>
<span class="hljs-keyword">var</span> c = extend(<span class="hljs-literal">true</span>, obj2, obj1) <span class="hljs-comment">// ???</span></code></pre>
<h2 id="articleHeader10">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之从零实现jQuery的extend

## 原文链接
[https://segmentfault.com/a/1190000010183865](https://segmentfault.com/a/1190000010183865)


---
title: 'JavaScript深入之call和apply的模拟实现' 
date: 2019-01-15 2:30:12
hidden: true
slug: zfkbnbx0x4e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第十篇，通过call和apply的模拟实现，带你揭开call和apply改变this的真相</p></blockquote>
<h2 id="articleHeader0">call</h2>
<p>一句话介绍 call：</p>
<blockquote><p>call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。</p></blockquote>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

bar.call(foo); <span class="hljs-comment">// 1</span></code></pre>
<p>注意两点：</p>
<ol>
<li><p>call 改变了 this 的指向，指向到 foo</p></li>
<li><p>bar 函数执行了</p></li>
</ol>
<h2 id="articleHeader1">模拟实现第一步</h2>
<p>那么我们该怎么模拟实现这两个效果呢？</p>
<p>试想当调用 call 的时候，把 foo 对象改造成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value)
    }
};

foo.bar(); <span class="hljs-comment">// 1</span></code></pre>
<p>这个时候 this 就指向了 foo，是不是很简单呢？</p>
<p>但是这样却给 foo 对象本身添加了一个属性，这可不行呐！</p>
<p>不过也不用担心，我们用 delete 再删除它不就好了~</p>
<p>所以我们模拟的步骤可以分为：</p>
<ol>
<li><p>将函数设为对象的属性</p></li>
<li><p>执行该函数</p></li>
<li><p>删除该函数</p></li>
</ol>
<p>以上个例子为例，就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一步</span>
foo.fn = bar
<span class="hljs-comment">// 第二步</span>
foo.fn()
<span class="hljs-comment">// 第三步</span>
<span class="hljs-keyword">delete</span> foo.fn</code></pre>
<p>fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓。</p>
<p>根据这个思路，我们可以尝试着去写第一版的 <strong>call2</strong> 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-built_in">Function</span>.prototype.call2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-comment">// 首先要获取调用call的函数，用this可以获取</span>
    context.fn = <span class="hljs-keyword">this</span>;
    context.fn();
    <span class="hljs-keyword">delete</span> context.fn;
}

<span class="hljs-comment">// 测试一下</span>
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

bar.call2(foo); <span class="hljs-comment">// 1</span></code></pre>
<p>正好可以打印 1 哎！是不是很开心！(～￣▽￣)～</p>
<h2 id="articleHeader2">模拟实现第二步</h2>
<p>最一开始也讲了，call 函数还能给定参数执行函数。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
// kevin
// 18
// 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-built_in">console</span>.log(name)
    <span class="hljs-built_in">console</span>.log(age)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

bar.call(foo, <span class="hljs-string">'kevin'</span>, <span class="hljs-number">18</span>);
<span class="hljs-comment">// kevin</span>
<span class="hljs-comment">// 18</span>
<span class="hljs-comment">// 1</span>
</code></pre>
<p>注意：传入的参数并不确定，这可咋办？</p>
<p>不急，我们可以从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里。</p>
<p>比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以上个例子为例，此时的arguments为：
// arguments = {
//      0: foo,
//      1: 'kevin',
//      2: 18,
//      length: 3
// }
// 因为arguments是类数组对象，所以可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}

// 执行后 args为 [foo, 'kevin', 18]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 以上个例子为例，此时的arguments为：</span>
<span class="hljs-comment">// arguments = {</span>
<span class="hljs-comment">//      0: foo,</span>
<span class="hljs-comment">//      1: 'kevin',</span>
<span class="hljs-comment">//      2: 18,</span>
<span class="hljs-comment">//      length: 3</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// 因为arguments是类数组对象，所以可以用for循环</span>
<span class="hljs-keyword">var</span> args = [];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
    args.push(<span class="hljs-string">'arguments['</span> + i + <span class="hljs-string">']'</span>);
}

<span class="hljs-comment">// 执行后 args为 [foo, 'kevin', 18]</span></code></pre>
<p>不定长的参数问题解决了，我们接着要把这个参数数组放到要执行的函数的参数里面去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将数组里的元素作为多个参数放进函数的形参里
context.fn(args.join(','))
// (O_o)??
// 这个方法肯定是不行的啦！！！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 将数组里的元素作为多个参数放进函数的形参里</span>
context.fn(args.join(<span class="hljs-string">','</span>))
<span class="hljs-comment">// (O_o)??</span>
<span class="hljs-comment">// 这个方法肯定是不行的啦！！！</span></code></pre>
<p>也许有人想到用 ES6 的方法，不过 call 是 ES3 的方法，我们为了模拟实现一个 ES3 的方法，要用到ES6的方法，好像……，嗯，也可以啦。但是我们这次用 eval 方法拼成一个函数，类似于这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eval('context.fn(' + args +')')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn('</span> + args +<span class="hljs-string">')'</span>)</code></pre>
<p>这里 args 会自动调用 Array.toString() 这个方法。</p>
<p>所以我们的第二版克服了两个大问题，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-built_in">Function</span>.prototype.call2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    context.fn = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> args = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
        args.push(<span class="hljs-string">'arguments['</span> + i + <span class="hljs-string">']'</span>);
    }
    <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn('</span> + args +<span class="hljs-string">')'</span>);
    <span class="hljs-keyword">delete</span> context.fn;
}

<span class="hljs-comment">// 测试一下</span>
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-built_in">console</span>.log(name)
    <span class="hljs-built_in">console</span>.log(age)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

bar.call2(foo, <span class="hljs-string">'kevin'</span>, <span class="hljs-number">18</span>); 
<span class="hljs-comment">// kevin</span>
<span class="hljs-comment">// 18</span>
<span class="hljs-comment">// 1</span></code></pre>
<p>(๑•̀ㅂ•́)و✧</p>
<h2 id="articleHeader3">模拟实现第三步</h2>
<p>模拟代码已经完成 80%，还有两个小点要注意：</p>
<p><strong>1.this 参数可以传 null，当为 null 的时候，视为指向 window</strong></p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var value = 1;

function bar() {
    console.log(this.value);
}

bar.call(null); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

bar.call(<span class="hljs-literal">null</span>); <span class="hljs-comment">// 1</span></code></pre>
<p>虽然这个例子本身不使用 call，结果依然一样。</p>
<p><strong>2.函数是可以有返回值的！</strong></p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var obj = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(obj, 'kevin', 18));
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.value,
        <span class="hljs-attr">name</span>: name,
        <span class="hljs-attr">age</span>: age
    }
}

<span class="hljs-built_in">console</span>.log(bar.call(obj, <span class="hljs-string">'kevin'</span>, <span class="hljs-number">18</span>));
<span class="hljs-comment">// Object {</span>
<span class="hljs-comment">//    value: 1,</span>
<span class="hljs-comment">//    name: 'kevin',</span>
<span class="hljs-comment">//    age: 18</span>
<span class="hljs-comment">// }</span></code></pre>
<p>不过都很好解决，让我们直接看第三版也就是最后一版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-built_in">Function</span>.prototype.call2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">var</span> context = context || <span class="hljs-built_in">window</span>;
    context.fn = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> args = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
        args.push(<span class="hljs-string">'arguments['</span> + i + <span class="hljs-string">']'</span>);
    }

    <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn('</span> + args +<span class="hljs-string">')'</span>);

    <span class="hljs-keyword">delete</span> context.fn
    <span class="hljs-keyword">return</span> result;
}

<span class="hljs-comment">// 测试一下</span>
<span class="hljs-keyword">var</span> value = <span class="hljs-number">2</span>;

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.value,
        <span class="hljs-attr">name</span>: name,
        <span class="hljs-attr">age</span>: age
    }
}

bar.call(<span class="hljs-literal">null</span>); <span class="hljs-comment">// 2</span>

<span class="hljs-built_in">console</span>.log(bar.call2(obj, <span class="hljs-string">'kevin'</span>, <span class="hljs-number">18</span>));
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// Object {</span>
<span class="hljs-comment">//    value: 1,</span>
<span class="hljs-comment">//    name: 'kevin',</span>
<span class="hljs-comment">//    age: 18</span>
<span class="hljs-comment">// }</span></code></pre>
<p>到此，我们完成了 call 的模拟实现，给自己一个赞 ｂ（￣▽￣）ｄ</p>
<h2 id="articleHeader4">apply的模拟实现</h2>
<p>apply 的实现跟 call 类似，在这里直接给代码，代码来自于知乎 @郑航的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Function</span>.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, arr</span>) </span>{
    <span class="hljs-keyword">var</span> context = <span class="hljs-built_in">Object</span>(context) || <span class="hljs-built_in">window</span>;
    context.fn = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> result;
    <span class="hljs-keyword">if</span> (!arr) {
        result = context.fn();
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> args = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
            args.push(<span class="hljs-string">'arr['</span> + i + <span class="hljs-string">']'</span>);
        }
        result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn('</span> + args + <span class="hljs-string">')'</span>)
    }

    <span class="hljs-keyword">delete</span> context.fn
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h2 id="articleHeader5">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/12" rel="nofollow noreferrer" target="_blank">JavaScript深入之bind的模拟实现</a></p>
<h2 id="articleHeader6">重要参考</h2>
<p><a href="https://www.zhihu.com/question/35787390" rel="nofollow noreferrer" target="_blank">知乎问题 不能使用call、apply、bind，如何用 js 实现 call 或者 apply 的功能？</a></p>
<h2 id="articleHeader7">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之call和apply的模拟实现

## 原文链接
[https://segmentfault.com/a/1190000009257663](https://segmentfault.com/a/1190000009257663)


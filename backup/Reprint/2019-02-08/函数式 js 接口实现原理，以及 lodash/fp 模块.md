---
title: '函数式 js 接口实现原理，以及 lodash/fp 模块' 
date: 2019-02-08 2:30:41
hidden: true
slug: teu32c7z8r
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">函数式 js 接口</h3>
<p>之前在 youtube 上看到一个技术视频，讲“underscore.js的接口为什么不好用”，以及什么样的接口更好用。演讲者是 lodash.js 的作者，他提出了一种“全面函数式”的 js 接口设计模式。大概类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 传统接口
_.map([1, 2, 3], function (el) {return el * 2}); // return [2, 4, 6]

// 函数式接口
var fn = _.map([1, 2, 3]); // return a function
fn(function (el) {return el * 2}); // return [2, 4, 6];

// 或者
_.map([1, 2, 3])(function (el) {return el * 2}); // return [2, 4, 6];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 传统接口</span>
_.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> </span>{<span class="hljs-keyword">return</span> el * <span class="hljs-number">2</span>}); <span class="hljs-comment">// return [2, 4, 6]</span>

<span class="hljs-comment">// 函数式接口</span>
<span class="hljs-keyword">var</span> fn = _.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// return a function</span>
fn(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> </span>{<span class="hljs-keyword">return</span> el * <span class="hljs-number">2</span>}); <span class="hljs-comment">// return [2, 4, 6];</span>

<span class="hljs-comment">// 或者</span>
_.map([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> </span>{<span class="hljs-keyword">return</span> el * <span class="hljs-number">2</span>}); <span class="hljs-comment">// return [2, 4, 6];</span></code></pre>
<p>找到一点感觉没有？其实就是函数式编程语言中广泛存在的“科里化”函数。当实参填满形参表的时候，执行结算返回结果，否则返回一个临时函数，继续接受实参。</p>
<p>看到这个写法眼前一亮，感觉有大规模简化代码的潜力。当时实际试了一下发下很多地方用不了，因为之前写的代码受 jQuery 影响，有很多这样的接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foobar.attribute(name); // 读属性
foobar.attribute(name, newValue); // 写属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>foobar.attribute(<span class="hljs-keyword">name</span>); <span class="hljs-comment">// 读属性</span>
foobar.attribute(<span class="hljs-keyword">name</span>, newValue); <span class="hljs-comment">// 写属性</span></code></pre>
<p>这样的接口是按照上述方法 curry 化会使得读属性变得不可能，根本原因是参数数量不同时 attribute 函数的语义根本不一样。使用 jQuery 的时候感觉这种写法非常爽，后来就跟着这么写，但是目前看来这样的接口设计是有问题的。</p>
<p>言归正传，今天聊聊这样的接口如何实现，以及 lodash 中的 fp 模块。</p>
<h3 id="articleHeader1">实现原理</h3>
<p>说到底就是个 currying 的问题，currying 在很多语言中是内置功能，但是 js 没有，所以我们要实现一个 currying 工具函数。首先贴一个最简易的 currying 实现，它的功能非常简单，输入一个函数 fn1 和部分实参，返回一个保存部分实参，继续接收实参的函数 fn2，调用fn2，它会合并实参数组，并调用 fn1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 函数柯里化
 * @param fn 输入函数
 * @return 柯里化后的函数
 */
var curry = function (fn) {
    if (!isFunction(fn)) {
        return;
    }

    var args = slice(arguments, 1);
 
    return function () {
        return fn.apply(this, args.concat(slice(arguments, 0)));
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * 函数柯里化
 * @param fn 输入函数
 * @return 柯里化后的函数
 */</span>
<span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">if</span> (!isFunction(fn)) {
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> args = slice(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
 
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, args.concat(slice(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">0</span>)));
    }
}</code></pre>
<p>isFunction 和 slice 大家都知道我就不贴了。看一下如何调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b;
}

addOne = curry(add, 1);

addOne(2); // return 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> <span class="hljs-comment">{
    return a + b;
}</span>

<span class="hljs-title">addOne</span> = <span class="hljs-title">curry</span><span class="hljs-params">(<span class="hljs-keyword">add</span>, 1)</span>;</span>

addOne(<span class="hljs-number">2</span>); <span class="hljs-comment">// return 3</span></code></pre>
<p>有时候我们需要输入的部分实参是数组列表形式，所以我们包装一下刚才的 curry 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 函数柯里化
 * @param fn 输入函数
 * @param arr 参数列表
 * @return 柯里化后的函数
 */
var curryApply = function (fn, arr) {
    if (!isFunction(fn)) {
        return;
    }

    var args = arr.slice(0);
    args.unshift(fn);
    return curry.apply(this, args);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * 函数柯里化
 * <span class="hljs-doctag">@param</span> fn 输入函数
 * <span class="hljs-doctag">@param</span> arr 参数列表
 * <span class="hljs-doctag">@return</span> 柯里化后的函数
 */</span>
<span class="hljs-keyword">var</span> curryApply = function (fn, arr) {
    <span class="hljs-keyword">if</span> (!isFunction(fn)) {
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> args = arr.slice(<span class="hljs-number">0</span>);
    args.unshift(fn);
    <span class="hljs-keyword">return</span> curry.apply(<span class="hljs-keyword">this</span>, args);
}</code></pre>
<p>上面的 curry 函数有个问题，就是连续多次补充实参，我们还需要封装一个支持连续调用的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 自动柯里化
 * @param fn 输入函数
 * @param n 输入函数参数个数
 * @return 柯里化后的函数
 */
var autoCurry = function (fn, n) {
    if (!isFunction(fn)) {
        return;
    }

    function retFn() {
        var len = arguments.length;
        var args = slice(arguments, 0);
        var nextn = n - len;
 
        if (nextn > 0) {
            return autoCurry(curryApply(retFn, args), nextn);
        }
    
        return fn.apply(this, args);
    }
    
    return retFn;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * 自动柯里化
 * @param fn 输入函数
 * @param n 输入函数参数个数
 * @return 柯里化后的函数
 */</span>
<span class="hljs-keyword">var</span> autoCurry = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, n</span>) </span>{
    <span class="hljs-keyword">if</span> (!isFunction(fn)) {
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">retFn</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> len = <span class="hljs-built_in">arguments</span>.length;
        <span class="hljs-keyword">var</span> args = slice(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">0</span>);
        <span class="hljs-keyword">var</span> nextn = n - len;
 
        <span class="hljs-keyword">if</span> (nextn &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> autoCurry(curryApply(retFn, args), nextn);
        }
    
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, args);
    }
    
    <span class="hljs-keyword">return</span> retFn;
}</code></pre>
<p>autoCurry 使用的递归的方法，输出函数可以可以通过简单调用的方式连续补充实参，当实参和预设的参数数量相等时，执行输入函数。使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compute(a, b, c) {
    return (a + b) * c;
}

var curryedCompute = autoCurry(compute, 3);

compute(1, 2, 3); // return 9
curryedCompute(1)(2)(3); // return 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function compute(a, b, c) {
    return (a + b) * c;
}

var curryedCompute = autoCurry(compute, <span class="hljs-number">3</span>);

compute(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// return 9</span>
curryedCompute(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>); <span class="hljs-comment">// return 9</span></code></pre>
<p>大家如果使用 node.js 的话，可能知道 npm 中有个 curry 模块，实现的功能是一样的，不同的是当你不输入参数个数 n 时，curry 模块 会使用 Function 对象的 length 属性作为预设的 n 值。</p>
<h3 id="articleHeader2">lodash/fp</h3>
<p>到这里实现原理就讲清楚了。本着不造轮子的原则，如果大家想尝试一下函数式风格的基础 js 库的话，建议使用 lodash/fp 这个模块。大家都知道 lodash 是 underscore 的 better implemention，而 lodash/fp 就是科里化的 lodash。与简单的 currying 不同的是，为了方便使用，lodash/fp 的设计者调换了一些接口的参数顺序，比如开头提到的 _.map 接口，如果简单 currying 的话第一个参数应该是数组[1, 2, 3]，但是大多数时候，我们想要持有的是一个算法，用这个算法处理不同的数据。所以我们希望暂存的实际上是第二个参数 fn，所以 lodash/fp 的接口是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The `lodash/map` iteratee receives three arguments:
// (value, index|key, collection)
_.map(['6', '8', '10'], parseInt);
// → [6, NaN, 2]

// The `lodash/fp/map` iteratee is capped at one argument:
// (value)
fp.map(parseInt)(['6', '8', '10']);
// → [6, 8, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// The `lodash/map` iteratee receives three arguments:</span>
<span class="hljs-comment">// (value, index|key, collection)</span>
_.<span class="hljs-built_in">map</span>([<span class="hljs-string">'6'</span>, <span class="hljs-string">'8'</span>, <span class="hljs-string">'10'</span>], <span class="hljs-built_in">parseInt</span>);
<span class="hljs-comment">// → [6, NaN, 2]</span>

<span class="hljs-comment">// The `lodash/fp/map` iteratee is capped at one argument:</span>
<span class="hljs-comment">// (value)</span>
fp.<span class="hljs-built_in">map</span>(<span class="hljs-built_in">parseInt</span>)([<span class="hljs-string">'6'</span>, <span class="hljs-string">'8'</span>, <span class="hljs-string">'10'</span>]);
<span class="hljs-comment">// → [6, 8, 10]</span></code></pre>
<p>关于 lodash/fp 更详细的说明，请看：<a href="https://github.com/lodash/lodash/wiki/FP-Guide" rel="nofollow noreferrer" target="_blank">https://github.com/lodash/lodash/wiki/FP-Guide</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
函数式 js 接口实现原理，以及 lodash/fp 模块

## 原文链接
[https://segmentfault.com/a/1190000005760112](https://segmentfault.com/a/1190000005760112)


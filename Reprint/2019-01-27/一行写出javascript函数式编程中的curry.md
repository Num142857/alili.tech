---
title: '一行写出javascript函数式编程中的curry' 
date: 2019-01-27 2:30:59
hidden: true
slug: ch8km2kvy5n
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学习javascript函数式编程，对其中大名鼎鼎的curry十分感兴趣，curry函数可以接受一个函数，我们暂且称之为原始函数，返回的也是一个函数，柯里化函数，这个返回的柯里化函数功能十分强大，他在执行的过程中，不断的返回一个贮存了传入参数的函数，直到触发了原始函数执行的条件。这么说比较概括，那么就举个例子来说明一下：</p>
<p>原始函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var add = (x, y) => x + y
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    var add = <span class="hljs-function"><span class="hljs-params">(x, y)</span> =&gt;</span> x + y
</code></pre>
<p>柯里化函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var curryAdd = curry(add)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>    var curryAdd = curry(<span class="hljs-keyword">add</span><span class="bash">)
</span></code></pre>
<p>这个add需要两个参数，但是我们的curryAdd执行可以传入更少的参数，当传入的参数少于add需要的参数的时候，add函数并不会执行，curryAdd就会将这个参数记下来，并且返回另外一个函数，这个函数可以继续执行传入参数，我们会有一个变量专门记录传入参数的情况，如果传入参数的总数等于add需要参数的总数，我们就激活了原始参数执行，就会返回我们想要的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 此时只传入了一个参数 根据判断返回的是一个函数
    var add2 = curryAdd(2)
    // add2 = function(...) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-comment">// 此时只传入了一个参数 根据判断返回的是一个函数</span>
    <span class="hljs-selector-tag">var</span> add2 = curryAdd(<span class="hljs-number">2</span>)
    <span class="hljs-comment">// add2 = function(...) {}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 此时累计传入了两个参数 等于了add需要参数的总和 所以返回的是一个结果
    // 相当于执行了add(2)(3)
    var result = add2(3)
    // result = 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>    // 此时累计传入了两个参数 等于了<span class="hljs-keyword">add</span><span class="bash">需要参数的总和 所以返回的是一个结果
</span>    // 相当于执行了<span class="hljs-keyword">add</span><span class="bash">(2)(3)
</span>    var result = add2(<span class="hljs-number">3</span>)
    // result = <span class="hljs-number">5</span></code></pre>
<p>还是很不错的是吧，好吧，我们的目的是为了写出这个神奇curry函数，而且还要一行写出来，不要着急，先分析一下怎么去写，然后再一步步的优化。</p>
<p>那根据上面的描述，我们看一下curry函数需要什么，首先需要一个变量，用来存下来原始函数的参数个数，我们知道function有一个属性为length，对就是它，我们用limit存下来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var curry = function(fn) {
         var limit = fn.length
         ...
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-selector-tag">var</span> curry = function(fn) {
         <span class="hljs-selector-tag">var</span> limit = fn<span class="hljs-selector-class">.length</span>
         ...
    }</code></pre>
<p>curry函数要返回一个函数, 这个函数是要执行的，那么问题就是，我们要判断这个函数的执行是否激活了原始函数的执行，问题就出现在传入的参数上面。返回函数还是结果？这的确是一个问题，<br>我们先写返回结果的情况，当传入的参数等于原始函数需要的参数时，我们执行原始函数fn</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var curry = function(fn) {
         var limit = fn.length
         return function (...args) {
             if (args.length >= limit) {
                 return fn.apply(null, args)
             }
         }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
         <span class="hljs-keyword">var</span> limit = fn.length
         <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
             <span class="hljs-keyword">if</span> (args.length &gt;= limit) {
                 <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>, args)
             }
         }
    }</code></pre>
<p>否则呢 我们就要返回一个贮存了参数的函数，这里有两点，一是参数的传入历史我们要记录下来，二是这个返回的函数需要做些什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var curry = function(fn) {
         var limit = fn.length
         return function (...args) {
             if (args.length >= limit) {
                 return fn.apply(null, args)
             } else {
                 return function(...args2) {
                     
                 }
             }
         }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
         <span class="hljs-keyword">var</span> limit = fn.length
         <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
             <span class="hljs-keyword">if</span> (args.length &gt;= limit) {
                 <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>, args)
             } <span class="hljs-keyword">else</span> {
                 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args2</span>)</span> </span>{
                     
                 }
             }
         }
    }</code></pre>
<p>看出来了吧 我们只需要把返回函数执行的参数累加起来就达到了记录参数传入情况的目的，于是我们想到了concat 对 args.concat(args2), 依次类推，我们返回的函数要做的就是重复做上面的事情，也就是参数为args的函数要做的事情，所以他需要一个名字，不然我们没法执行，我们叫它judgeCurry<br>所以正如我们所说的，要么返回一个函数，要么执行原始函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var curry = function(fn) {
         var limit = fn.length
         return function judgeCurry (...args) {
             if (args.length >= limit) {
                 return fn.apply(null, args)
             } else {
                 return function(...args2) {
                     return judgeCurry.apply(null, args.concat(args2))                                     
                 }
             }
         }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
         <span class="hljs-keyword">var</span> limit = fn.length
         <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">judgeCurry</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
             <span class="hljs-keyword">if</span> (args.length &gt;= limit) {
                 <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>, args)
             } <span class="hljs-keyword">else</span> {
                 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args2</span>)</span> </span>{
                     <span class="hljs-keyword">return</span> judgeCurry.apply(<span class="hljs-literal">null</span>, args.concat(args2))                                     
                 }
             }
         }
    }</code></pre>
<p>我们终于写完了这个神奇的curry函数，它真的很强大，配合compose，那真是一个字，爽。<br>我们的目的还是一行把上面那个函数写出来，一行写？怎么写？对了，用ES6啊，于是一番折腾</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var currySingle = fn => judgeCurry = (...args) => args.length >= fn.length ? fn.apply(null, args) : (...args2) => judgeCurry.apply(null, args.concat(args2))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">var</span> currySingle = fn =&gt; judgeCurry = (...<span class="hljs-built_in">args</span>) =&gt; <span class="hljs-built_in">args</span>.<span class="hljs-built_in">length</span> &gt;= fn.<span class="hljs-built_in">length</span> ? fn.<span class="hljs-built_in">apply</span>(null, <span class="hljs-built_in">args</span>) : (...args2) =&gt; judgeCurry.<span class="hljs-built_in">apply</span>(null, <span class="hljs-built_in">args</span>.<span class="hljs-built_in">concat</span>(args2))</code></pre>
<p>好，我们看一下哪有问题，对了，就是我们为了不用limit参数，用了就得赋值，赋值就不能一行搞定了，就会变成这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var currySingle = fn => {
        var limit = fn.length
        var judgeCurry = null
        return judgeCurry = (...args) => args.length >= limit ? fn.apply(null, args) : (...args2) => judgeCurry.apply(null, args.concat(args2))
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> currySingle = fn =&gt; {
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">limit</span> = fn.<span class="hljs-built_in">length</span>
        <span class="hljs-built_in">var</span> judgeCurry = null
        <span class="hljs-built_in">return</span> judgeCurry = (...<span class="hljs-built_in">args</span>) =&gt; <span class="hljs-built_in">args</span>.<span class="hljs-built_in">length</span> &gt;= <span class="hljs-built_in">limit</span> ? fn.<span class="hljs-built_in">apply</span>(null, <span class="hljs-built_in">args</span>) : (...args2) =&gt; judgeCurry.<span class="hljs-built_in">apply</span>(null, <span class="hljs-built_in">args</span>.<span class="hljs-built_in">concat</span>(args2))
    }</code></pre>
<p>需要判断参数的时候不断的对fn.length求值，但是fn.length的值是确定的，我们不想每次都求值，但又不想用limit怎么办，有什么办法呢？你一定想到了，立即执行函数！！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var currySingle = fn => ((limit) => judgeCurry = (...args) => args.length >= limit ? fn.apply(null, args) : (...args2) => judgeCurry.apply(null, args.concat(args2)))(fn.length)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">    var currySingle = fn =&gt; ((<span class="hljs-name">limit</span>) =&gt; judgeCurry = (...args) =&gt; args.length &gt;= limit ? fn.apply(<span class="hljs-name">null</span>, args) : (...args2) =&gt; judgeCurry.apply(<span class="hljs-name">null</span>, args.concat(<span class="hljs-name">args2</span>)))(<span class="hljs-name">fn</span>.length)</code></pre>
<p>不得不感叹javascript的神奇，终于，我们就一行将这个神奇的curry写出来了。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一行写出javascript函数式编程中的curry

## 原文链接
[https://segmentfault.com/a/1190000008248646](https://segmentfault.com/a/1190000008248646)


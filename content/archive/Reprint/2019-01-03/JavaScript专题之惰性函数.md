---
title: 'JavaScript专题之惰性函数' 
date: 2019-01-03 2:30:11
hidden: true
slug: lvz12yiepqj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十五篇，讲解惰性函数</p></blockquote>
<h2 id="articleHeader0">需求</h2>
<p>我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。</p>
<h2 id="articleHeader1">解决一：普通方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var t;
function foo() {
    if (t) return t;
    t = new Date()
    return t;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> t;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (t) <span class="hljs-keyword">return</span> t;
    t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    <span class="hljs-keyword">return</span> t;
}</code></pre>
<p>问题有两个，一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断。</p>
<h2 id="articleHeader2">解决二：闭包</h2>
<p>我们很容易想到用闭包避免污染全局变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = (function() {
    var t;
    return function() {
        if (t) return t;
        t = new Date();
        return t;
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> t;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (t) <span class="hljs-keyword">return</span> t;
        t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">return</span> t;
    }
})();</code></pre>
<p>然而还是没有解决调用时都必须进行一次判断的问题。</p>
<h2 id="articleHeader3">解决三：函数对象</h2>
<p>函数也是一种对象，利用这个特性，我们也可以解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    if (foo.t) return foo.t;
    foo.t = new Date();
    return foo.t;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (foo.t) <span class="hljs-keyword">return</span> foo.t;
    foo.t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">return</span> foo.t;
}</code></pre>
<p>依旧没有解决调用时都必须进行一次判断的问题。</p>
<h2 id="articleHeader4">解决四：惰性函数</h2>
<p>不错，惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> t;
    };
    <span class="hljs-keyword">return</span> foo();
};</code></pre>
<h2 id="articleHeader5">更多应用</h2>
<p>DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 简化写法
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 简化写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span> (<span class="hljs-params">type, el, fn</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
        el.addEventListener(type, fn, <span class="hljs-literal">false</span>);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.attachEvent){
        el.attachEvent(<span class="hljs-string">'on'</span> + type, fn);
    }
}</code></pre>
<p>问题在于我们每当使用一次 addEvent 时都会进行一次判断。</p>
<p>利用惰性函数，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span> (<span class="hljs-params">type, el, fn</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
        addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, el, fn</span>) </span>{
            el.addEventListener(type, fn, <span class="hljs-literal">false</span>);
        }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.attachEvent){
        addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, el, fn</span>) </span>{
            el.attachEvent(<span class="hljs-string">'on'</span> + type, fn);
        }
    }
}</code></pre>
<p>当然我们也可以使用闭包的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = (function(){
    if (window.addEventListener) {
        return function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> addEvent = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, el, fn</span>) </span>{
            el.addEventListener(type, fn, <span class="hljs-literal">false</span>);
        }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.attachEvent){
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, el, fn</span>) </span>{
            el.attachEvent(<span class="hljs-string">'on'</span> + type, fn);
        }
    }
})();</code></pre>
<p>当我们每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变的时候，想想是否可以考虑使用惰性函数。</p>
<h2 id="articleHeader6">重要参考</h2>
<p><a href="http://peter.michaux.ca/articles/lazy-function-definition-pattern" rel="nofollow noreferrer" target="_blank">Lazy Function Definition Pattern</a></p>
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
JavaScript专题之惰性函数

## 原文链接
[https://segmentfault.com/a/1190000010783034](https://segmentfault.com/a/1190000010783034)


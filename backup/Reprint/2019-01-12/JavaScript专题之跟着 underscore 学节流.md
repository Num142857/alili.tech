---
title: 'JavaScript专题之跟着 underscore 学节流' 
date: 2019-01-12 2:30:24
hidden: true
slug: emp4o4yhp9u
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第二篇，讲解节流，带你从零实现一个 underscore 的 throttle 函数</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/22" rel="nofollow noreferrer" target="_blank">《JavaScript专题之跟着underscore学防抖》</a>中，我们了解了为什么要限制事件的频繁触发，以及如何做限制：</p>
<ol>
<li><p>debounce 防抖</p></li>
<li><p>throttle 节流</p></li>
</ol>
<p>今天重点讲讲节流的实现。</p>
<h2 id="articleHeader1">节流</h2>
<p>节流的原理很简单：</p>
<p>如果你持续触发事件，每隔一段时间，只执行一次事件。</p>
<p>根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。<br>我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。</p>
<p>关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。</p>
<h2 id="articleHeader2">使用时间戳</h2>
<p>让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。</p>
<p>看了这个表述，是不是感觉已经可以写出代码了…… 让我们来写第一版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">func, wait</span>) </span>{
    <span class="hljs-keyword">var</span> context, args;
    <span class="hljs-keyword">var</span> previous = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        context = <span class="hljs-keyword">this</span>;
        args = <span class="hljs-built_in">arguments</span>;
        <span class="hljs-keyword">if</span> (now - previous &gt; wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}</code></pre>
<p>例子依然是用讲 debounce 中的例子，如果你要使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="container.onmousemove = throttle(getUserAction, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">container.onmousemove = throttle(getUserAction, <span class="hljs-number">1000</span>);</code></pre>
<p>效果演示如下：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/throttle/throttle1.gif" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/throttle/throttle1.gif" alt="使用时间戳" title="使用时间戳" style="cursor: pointer;"></span></p>
<p>我们可以看到：当鼠标移入的时候，事件立刻执行，每过 1s 会执行一次，如果在 4.2s 停止触发，以后不会再执行事件。</p>
<h2 id="articleHeader3">使用定时器</h2>
<p>接下来，我们讲讲第二种实现方式，使用定时器。</p>
<p>当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">func, wait</span>) </span>{
    <span class="hljs-keyword">var</span> timeout;
    <span class="hljs-keyword">var</span> previous = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        context = <span class="hljs-keyword">this</span>;
        args = <span class="hljs-built_in">arguments</span>;
        <span class="hljs-keyword">if</span> (!timeout) {
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                timeout = <span class="hljs-literal">null</span>;
                func.apply(context, args)
            }, wait)
        }

    }
}</code></pre>
<p>为了让效果更加明显，我们设置 wait 的时间为 3s，效果演示如下：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/throttle/throttle2.gif" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/throttle/throttle2.gif" alt="使用定时器" title="使用定时器" style="cursor: pointer;"></span></p>
<p>我们可以看到：当鼠标移入的时候，事件不会立刻执行，晃了 3s 后终于执行了一次，此后每 3s 执行一次，当数字显示为 3 的时候，立刻移出鼠标，相当于大约 9.2s 的时候停止触发，但是依然会在第 12s 的时候执行一次事件。</p>
<p>所以比较两个方法：</p>
<ol>
<li><p>第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行</p></li>
<li><p>第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件</p></li>
</ol>
<h2 id="articleHeader4">双剑合璧</h2>
<p>那我们想要一个什么样的呢？</p>
<p>有人就说了：我想要一个有头有尾的！就是鼠标移入能立刻执行，停止触发的时候还能再执行一次！</p>
<p>所以我们综合两者的优势，然后双剑合璧，写一版代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
function throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">func, wait</span>) </span>{
    <span class="hljs-keyword">var</span> timeout, context, args, result;
    <span class="hljs-keyword">var</span> previous = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">var</span> later = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        previous = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        timeout = <span class="hljs-literal">null</span>;
        func.apply(context, args)
    };

    <span class="hljs-keyword">var</span> throttled = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-comment">//下次触发 func 剩余的时间</span>
        <span class="hljs-keyword">var</span> remaining = wait - (now - previous);
        context = <span class="hljs-keyword">this</span>;
        args = <span class="hljs-built_in">arguments</span>;
         <span class="hljs-comment">// 如果没有剩余的时间了或者你改了系统时间</span>
        <span class="hljs-keyword">if</span> (remaining &lt;= <span class="hljs-number">0</span> || remaining &gt; wait) {
            <span class="hljs-keyword">if</span> (timeout) {
                clearTimeout(timeout);
                timeout = <span class="hljs-literal">null</span>;
            }
            previous = now;
            func.apply(context, args);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    <span class="hljs-keyword">return</span> throttled;
}</code></pre>
<p>效果演示如下：</p>
<p><span class="img-wrap"><img data-src="https://github.com/mqyqingfeng/Blog/raw/master/Images/throttle/throttle3.gif" src="https://static.alili.techhttps://github.com/mqyqingfeng/Blog/raw/master/Images/throttle/throttle3.gif" alt="throttle3" title="throttle3" style="cursor: pointer;"></span></p>
<p>我们可以看到：鼠标移入，事件立刻执行，晃了 3s，事件再一次执行，当数字变成 3 的时候，也就是 6s 后，我们立刻移出鼠标，停止触发事件，9s 的时候，依然会再执行一次事件。</p>
<h2 id="articleHeader5">优化</h2>
<p>但是我有时也希望无头有尾，或者有头无尾，这个咋办？</p>
<p>那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:</p>
<p>leading：false 表示禁用第一次执行<br>trailing: false 表示禁用停止触发的回调</p>
<p>我们来改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第四版
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous &amp;&amp; options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout &amp;&amp; options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第四版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">func, wait, options</span>) </span>{
    <span class="hljs-keyword">var</span> timeout, context, args, result;
    <span class="hljs-keyword">var</span> previous = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (!options) options = {};

    <span class="hljs-keyword">var</span> later = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        previous = options.leading === <span class="hljs-literal">false</span> ? <span class="hljs-number">0</span> : <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        timeout = <span class="hljs-literal">null</span>;
        func.apply(context, args);
        <span class="hljs-keyword">if</span> (!timeout) context = args = <span class="hljs-literal">null</span>;
    };

    <span class="hljs-keyword">var</span> throttled = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-keyword">if</span> (!previous &amp;&amp; options.leading === <span class="hljs-literal">false</span>) previous = now;
        <span class="hljs-keyword">var</span> remaining = wait - (now - previous);
        context = <span class="hljs-keyword">this</span>;
        args = <span class="hljs-built_in">arguments</span>;
        <span class="hljs-keyword">if</span> (remaining &lt;= <span class="hljs-number">0</span> || remaining &gt; wait) {
            <span class="hljs-keyword">if</span> (timeout) {
                clearTimeout(timeout);
                timeout = <span class="hljs-literal">null</span>;
            }
            previous = now;
            func.apply(context, args);
            <span class="hljs-keyword">if</span> (!timeout) context = args = <span class="hljs-literal">null</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!timeout &amp;&amp; options.trailing !== <span class="hljs-literal">false</span>) {
            timeout = setTimeout(later, remaining);
        }
    };
    <span class="hljs-keyword">return</span> throttled;
}</code></pre>
<h2 id="articleHeader6">取消</h2>
<p>在 debounce 的实现中，我们加了一个 cancel 方法，throttle 我们也加个 cancel 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第五版 非完整代码，完整代码请查看最后的演示代码链接
...
throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第五版 非完整代码，完整代码请查看最后的演示代码链接</span>
...
throttled.cancel = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    clearTimeout(timeout);
    previous = <span class="hljs-number">0</span>;
    timeout = <span class="hljs-literal">null</span>;
}
...</code></pre>
<h2 id="articleHeader7">注意</h2>
<p>我们要注意 underscore 的实现中有这样一个问题：</p>
<p>那就是 <code>leading：false</code> 和 <code>trailing: false</code> 不能同时设置。</p>
<p>如果同时设置的话，比如当你将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，所以只要再过了设置的时间，再移入的话，就会立刻执行，就违反了 leading: false，bug 就出来了，所以，这个 throttle 只有三种用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="container.onmousemove = throttle(getUserAction, 1000);
container.onmousemove = throttle(getUserAction, 1000, {
    leading: false
});
container.onmousemove = throttle(getUserAction, 1000, {
    trailing: false
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">container.onmousemove = throttle(getUserAction, <span class="hljs-number">1000</span>);
container.onmousemove = throttle(getUserAction, <span class="hljs-number">1000</span>, {
    <span class="hljs-attr">leading</span>: <span class="hljs-literal">false</span>
});
container.onmousemove = throttle(getUserAction, <span class="hljs-number">1000</span>, {
    <span class="hljs-attr">trailing</span>: <span class="hljs-literal">false</span>
});</code></pre>
<p>至此我们已经完整实现了一个 underscore 中的 throttle 函数，恭喜，撒花！</p>
<h2 id="articleHeader8">演示代码</h2>
<p>相关的代码可以在 <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/throttle" rel="nofollow noreferrer" target="_blank">Github 博客仓库</a> 中找到</p>
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
JavaScript专题之跟着 underscore 学节流

## 原文链接
[https://segmentfault.com/a/1190000009831691](https://segmentfault.com/a/1190000009831691)


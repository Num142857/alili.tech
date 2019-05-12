---
title: 'JavaScript专题之跟着underscore学防抖' 
date: 2019-01-13 2:30:11
hidden: true
slug: 63ihc1gvycq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第一篇，讲解防抖，带你从零实现一个 underscore 的 debounce 函数</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在前端开发中会遇到一些频繁的事件触发，比如：</p>
<ol>
<li><p>window 的 resize、scroll</p></li>
<li><p>mousedown、mousemove</p></li>
<li><p>keyup、keydown<br>……</p></li>
</ol>
<p>为此，我们举个示例代码来了解事件如何频繁的触发：</p>
<p>我们写个 <code>index.html</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cmn-Hans&quot;>

<head>
    <meta charset=&quot;utf-8&quot;>
    <meta http-equiv=&quot;x-ua-compatible&quot; content=&quot;IE=edge, chrome=1&quot;>
    <title>debounce</title>
    <style>
        #container{
            width: 100%; height: 200px; line-height: 200px; text-align: center; color: #fff; background-color: #444; font-size: 30px;
        }
    </style>
</head>

<body>
    <div id=&quot;container&quot;></div>
    <script src=&quot;debounce.js&quot;></script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cmn-Hans"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"x-ua-compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge, chrome=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>debounce<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#container</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">text-align</span>: center; <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#444</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"debounce.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>debounce.js</code> 文件的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = getUserAction;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserAction</span>(<span class="hljs-params"></span>) </span>{
    container.innerHTML = count++;
};

container.onmousemove = getUserAction;</code></pre>
<p>我们来看看效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009638651?w=799&amp;h=202" src="https://static.alili.tech/img/remote/1460000009638651?w=799&amp;h=202" alt="debounce" title="debounce" style="cursor: pointer; display: inline;"></span></p>
<p>从左边滑到右边就触发了 165 次 getUserAction 函数！</p>
<p>因为这个例子很简单，所以浏览器完全反应的过来，可是如果是复杂的回调函数或是 ajax 请求呢？假设 1 秒触发了 60 次，每个回调就必须在 1000 / 60 = 16.67ms 内完成，否则就会有卡顿出现。</p>
<p>为了解决这个问题，一般有两种解决方案：</p>
<ol>
<li><p>debounce 防抖</p></li>
<li><p>throttle 节流</p></li>
</ol>
<h2 id="articleHeader1">防抖</h2>
<p>今天重点讲讲防抖的实现。</p>
<p>防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!</p>
<h2 id="articleHeader2">第一版</h2>
<p>根据这段表述，我们可以写第一版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func, wait</span>) </span>{
    <span class="hljs-keyword">var</span> timeout;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}</code></pre>
<p>如果我们要使用它，以最一开始的例子为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="container.onmousemove = debounce(getUserAction, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">container.onmousemove = debounce(getUserAction, <span class="hljs-number">1000</span>);</code></pre>
<p>现在随你怎么移动，反正你移动完 1000ms 内不再触发，我才执行事件。看看使用效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824633?w=867&amp;h=197" src="https://static.alili.tech/img/remote/1460000009824633?w=867&amp;h=197" alt="debounce 第一版" title="debounce 第一版" style="cursor: pointer; display: inline;"></span></p>
<p>顿时就从 165 次降低成了 1 次!</p>
<p>棒棒哒，我们接着完善它。</p>
<h2 id="articleHeader3">this</h2>
<p>如果我们在 <code>getUserAction</code> 函数中 <code>console.log(this)</code>，在不使用 <code>debounce</code> 函数的时候，<code>this</code> 的值为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>但是如果使用我们的 debounce 函数，this 就会指向 Window 对象！</p>
<p>所以我们需要将 this 指向正确的对象。</p>
<p>我们修改下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context)
        }, wait);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func, wait</span>) </span>{
    <span class="hljs-keyword">var</span> timeout;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;

        clearTimeout(timeout)
        timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            func.apply(context)
        }, wait);
    }
}</code></pre>
<p>现在 this 已经可以正确指向了。让我们看下个问题：</p>
<h2 id="articleHeader4">event 对象</h2>
<p>JavaScript 在事件处理函数中会提供事件对象 event，我们修改下 getUserAction 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUserAction(e) {
    console.log(e);
    container.innerHTML = count++;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserAction</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e);
    container.innerHTML = count++;
};</code></pre>
<p>如果我们不使用 debouce 函数，这里会打印 MouseEvent 对象，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009638652?w=1214&amp;h=66" src="https://static.alili.tech/img/remote/1460000009638652?w=1214&amp;h=66" alt="MouseEvent" title="MouseEvent" style="cursor: pointer; display: inline;"></span></p>
<p>但是在我们实现的 debounce 函数中，却只会打印 undefined!</p>
<p>所以我们再修改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func, wait</span>) </span>{
    <span class="hljs-keyword">var</span> timeout;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;

        clearTimeout(timeout)
        timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            func.apply(context, args)
        }, wait);
    }
}</code></pre>
<p>到此为止，我们修复了两个小问题：</p>
<ol>
<li><p>this 指向</p></li>
<li><p>event 对象</p></li>
</ol>
<h2 id="articleHeader5">立刻执行</h2>
<p>这个时候，代码已经很是完善了，但是为了让这个函数更加完善，我们接下来思考一个新的需求。</p>
<p>这个需求就是：</p>
<p>我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。</p>
<p>想想这个需求也是很有道理的嘛，那我们加个 immediate 参数判断是否是立刻执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第四版
function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第四版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func, wait, immediate</span>) </span>{

    <span class="hljs-keyword">var</span> timeout, result;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;

        <span class="hljs-keyword">if</span> (timeout) clearTimeout(timeout);
        <span class="hljs-keyword">if</span> (immediate) {
            <span class="hljs-comment">// 如果已经执行过，不再执行</span>
            <span class="hljs-keyword">var</span> callNow = !timeout;
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                timeout = <span class="hljs-literal">null</span>;
            }, wait)
            <span class="hljs-keyword">if</span> (callNow) func.apply(context, args)
        }
        <span class="hljs-keyword">else</span> {
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                func.apply(context, args)
            }, wait);
        }
    }
}</code></pre>
<p>再来看看使用效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824634?w=867&amp;h=197" src="https://static.alili.tech/img/remote/1460000009824634?w=867&amp;h=197" alt="debounce 第四版" title="debounce 第四版" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">返回值</h2>
<p>此时注意一点，就是 getUserAction 函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第五版
function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第五版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func, wait, immediate</span>) </span>{

    <span class="hljs-keyword">var</span> timeout, result;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;

        <span class="hljs-keyword">if</span> (timeout) clearTimeout(timeout);
        <span class="hljs-keyword">if</span> (immediate) {
            <span class="hljs-comment">// 如果已经执行过，不再执行</span>
            <span class="hljs-keyword">var</span> callNow = !timeout;
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                timeout = <span class="hljs-literal">null</span>;
            }, wait)
            <span class="hljs-keyword">if</span> (callNow) result = func.apply(context, args)
        }
        <span class="hljs-keyword">else</span> {
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                func.apply(context, args)
            }, wait);
        }
        <span class="hljs-keyword">return</span> result;
    }
}</code></pre>
<h2 id="articleHeader7">取消</h2>
<p>最后我们再思考一个小需求，我希望能取消 debounce 函数，比如说我 debounce 的时间间隔是 10 秒钟，immediate 为 true，这样的话，我只有等 10 秒后才能重新触发事件，现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行啦，是不是很开心？</p>
<p>为了这个需求，我们写最后一版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第六版
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第六版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func, wait, immediate</span>) </span>{

    <span class="hljs-keyword">var</span> timeout, result;

    <span class="hljs-keyword">var</span> debounced = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;

        <span class="hljs-keyword">if</span> (timeout) clearTimeout(timeout);
        <span class="hljs-keyword">if</span> (immediate) {
            <span class="hljs-comment">// 如果已经执行过，不再执行</span>
            <span class="hljs-keyword">var</span> callNow = !timeout;
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                timeout = <span class="hljs-literal">null</span>;
            }, wait)
            <span class="hljs-keyword">if</span> (callNow) result = func.apply(context, args)
        }
        <span class="hljs-keyword">else</span> {
            timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                func.apply(context, args)
            }, wait);
        }
        <span class="hljs-keyword">return</span> result;
    };

    debounced.cancel = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        clearTimeout(timeout);
        timeout = <span class="hljs-literal">null</span>;
    };

    <span class="hljs-keyword">return</span> debounced;
}</code></pre>
<p>那么该如何使用这个 cancel 函数呢？依然是以上面的 demo 为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    container.innerHTML = count++;
};

var setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById(&quot;button&quot;).addEventListener('click', function(){
    setUseAction.cancel();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserAction</span>(<span class="hljs-params">e</span>) </span>{
    container.innerHTML = count++;
};

<span class="hljs-keyword">var</span> setUseAction = debounce(getUserAction, <span class="hljs-number">10000</span>, <span class="hljs-literal">true</span>);

container.onmousemove = setUseAction;

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"button"</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    setUseAction.cancel();
})</code></pre>
<p>演示效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009638653?w=487&amp;h=227" src="https://static.alili.tech/img/remote/1460000009638653?w=487&amp;h=227" alt="debounce-cancel" title="debounce-cancel" style="cursor: pointer; display: inline;"></span></p>
<p>至此我们已经完整实现了一个 underscore 中的 debounce 函数，恭喜，撒花！</p>
<h2 id="articleHeader8">演示代码</h2>
<p>相关的代码可以在 <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/debounce" rel="nofollow noreferrer" target="_blank">Github 博客仓库</a> 中找到</p>
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
JavaScript专题之跟着underscore学防抖

## 原文链接
[https://segmentfault.com/a/1190000009638648](https://segmentfault.com/a/1190000009638648)


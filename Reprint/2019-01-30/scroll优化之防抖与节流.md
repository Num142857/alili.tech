---
title: 'scroll优化之防抖与节流' 
date: 2019-01-30 2:30:23
hidden: true
slug: cihunhi5kqp
categories: [reprint]
---

{{< raw >}}

                    
<p>这个优化方案是参照 <a href="http://www.cnblogs.com/coco1s/p/5499469.html" rel="nofollow noreferrer" target="_blank">【前端性能】高性能滚动 scroll 及页面渲染优化</a></p>
<p>在这里简单的把两个方式写出来，以便快速了解。。</p>
<p>第一种：防抖（也就是滚动结束才执行）</p>
<p>演示：<br><span class="img-wrap"><img data-src="/img/bVG5f5?w=448&amp;h=340" src="https://static.alili.tech/img/bVG5f5?w=448&amp;h=340" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>闭包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    延时执行
    @param fn function
    @param wait number
    @return function
*/
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 500));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
    延时执行
    @param fn function
    @param wait number
    @return function
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn, wait</span>) </span>{
    <span class="hljs-keyword">var</span> timeout = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(timeout !== <span class="hljs-literal">null</span>) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
<span class="hljs-comment">// 处理函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.random()); 
}
<span class="hljs-comment">// 滚动事件</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, debounce(handle, <span class="hljs-number">500</span>));</code></pre>
<p>直接写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timeout = null;
window.addEventListener('scroll', function() {
    if(timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(function() {
        var scrollTop = this.scrollY;
        console.log(scrollTop);
    }.bind(this), 500);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> timeout = <span class="hljs-literal">null</span>;
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(timeout !== <span class="hljs-literal">null</span>) clearTimeout(timeout);
    timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> scrollTop = <span class="hljs-keyword">this</span>.scrollY;
        <span class="hljs-built_in">console</span>.log(scrollTop);
    }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">500</span>);
});</code></pre>
<p>第二个是节流（Throttling）滚动的过程中间隔执行，例如滚动加载图片效果，不可能等到滚动结束才执行加载函数数吧，所以这里可以做一个间隔执行。。</p>
<p>演示：<br><span class="img-wrap"><img data-src="/img/bVG5ta?w=448&amp;h=340" src="https://static.alili.tech/img/bVG5ta?w=448&amp;h=340" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>闭包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    节流函数
    @param fn function
    @param wait number
    @param maxTimeLong number
    @return function
*/
function throttling(fn, wait, maxTimelong) {
    var timeout = null,
        startTime = Date.parse(new Date);

    return function() {
        if(timeout !== null) clearTimeout(timeout);
        var curTime = Date.parse(new Date);
        if(curTime-startTime>=maxTimelong) {
            fn();
            startTime = curTime;
        } else {
            timeout = setTimeout(fn, wait);
        }
    }
}

function handle() {
    console.log(Math.random()); 
}

window.addEventListener('scroll', throttling(handle, 300, 1000));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
    节流函数
    @param fn function
    @param wait number
    @param maxTimeLong number
    @return function
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttling</span>(<span class="hljs-params">fn, wait, maxTimelong</span>) </span>{
    <span class="hljs-keyword">var</span> timeout = <span class="hljs-literal">null</span>,
        startTime = <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(timeout !== <span class="hljs-literal">null</span>) clearTimeout(timeout);
        <span class="hljs-keyword">var</span> curTime = <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>);
        <span class="hljs-keyword">if</span>(curTime-startTime&gt;=maxTimelong) {
            fn();
            startTime = curTime;
        } <span class="hljs-keyword">else</span> {
            timeout = setTimeout(fn, wait);
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.random()); 
}

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, throttling(handle, <span class="hljs-number">300</span>, <span class="hljs-number">1000</span>));</code></pre>
<p>直接写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timeout = null,
    startTime = Date.parse(new Date); // 开始时间

function handle() {
    console.log(Math.random()); 
}

window.addEventListener('scroll', function() {
    if(timeout !== null) clearTimeout(timeout);
    var curTime = Date.parse(new Date); // 当前时间
    if(curTime-startTime>=1000) { // 时间差>=1秒直接执行
        handle();
        startTime = curTime;
    } else { // 否则延时执行，像滚动了一下，差值<1秒的那种也要执行
        timeout = setTimeout(handle, 300);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> timeout = <span class="hljs-literal">null</span>,
    startTime = <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>); <span class="hljs-comment">// 开始时间</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.random()); 
}

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(timeout !== <span class="hljs-literal">null</span>) clearTimeout(timeout);
    <span class="hljs-keyword">var</span> curTime = <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>); <span class="hljs-comment">// 当前时间</span>
    <span class="hljs-keyword">if</span>(curTime-startTime&gt;=<span class="hljs-number">1000</span>) { <span class="hljs-comment">// 时间差&gt;=1秒直接执行</span>
        handle();
        startTime = curTime;
    } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 否则延时执行，像滚动了一下，差值&lt;1秒的那种也要执行</span>
        timeout = setTimeout(handle, <span class="hljs-number">300</span>);
    }
});</code></pre>
<p>诸如此类事件的还有resize事件都可以使用这两种方式,当然使用哪一种，还要看项目需求了。。谢谢关注~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
scroll优化之防抖与节流

## 原文链接
[https://segmentfault.com/a/1190000007676390](https://segmentfault.com/a/1190000007676390)


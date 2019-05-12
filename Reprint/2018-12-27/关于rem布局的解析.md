---
title: '关于rem布局的解析' 
date: 2018-12-27 2:30:12
hidden: true
slug: rc7t740bam7
categories: [reprint]
---

{{< raw >}}

                    
<p>前一段时间群里有人问我rem相关的问题,一直想整理一下,可是都忘记了.今天终于抽出时间来整理一下相关知识点!<br>说到rem就要谈到移动端布局,现在很多人在移动端布局上面还是用px,我们先来谈谈px;px:像素(Pixel),相对单位长度,px相对于屏幕分辨率而言的.<br>我们为什么使用rem,rem的诞生也是webapp的推动,rem完美解决了webapp的屏幕适应问题,大家都知道移动端设备屏幕大小各异,像素也是各个不同的,那么webapp使用px就相当鸡肋,因为大家都知道px是像素,由屏幕的分辨率决定,用px在很大程度上影响webapp的美观.<br>下面介绍如何使用rem,首先我们得设置rem的初始值,然后我们每个尺寸按照这个初始值进行换算得出rem值进行布局.<br>1.媒体查询</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
    font-size : 20px;
}
@media only screen and (min-width: 401px){
    html {
        font-size: 25px !important;
    }
}
@media only screen and (min-width: 428px){
    html {
        font-size: 26.75px !important;
    }
}
@media only screen and (min-width: 481px){
    html {
        font-size: 30px !important; 
    }
}
@media only screen and (min-width: 569px){
    html {
        font-size: 35px !important; 
    }
}
@media only screen and (min-width: 641px){
    html {
        font-size: 40px !important; 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size </span>: <span class="hljs-number">20px</span>;
}
@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">401px</span>){
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">25px</span> <span class="hljs-meta">!important</span>;
    }
}
@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">428px</span>){
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">26.75px</span> <span class="hljs-meta">!important</span>;
    }
}
@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">481px</span>){
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span> <span class="hljs-meta">!important</span>; 
    }
}
@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">569px</span>){
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">35px</span> <span class="hljs-meta">!important</span>; 
    }
}
@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">641px</span>){
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span> <span class="hljs-meta">!important</span>; 
    }
}</code></pre>
<p>2.自动设置html的font-size</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" (function (doc, win) {   
            var docEl = doc.documentElement,   
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',   
            recalc = function () {   
            var clientWidth = docEl.clientWidth;   
            if (!clientWidth) return;   
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';   
        };   
        if (!doc.addEventListener) return;   
        win.addEventListener(resizeEvt, recalc, false);   
        doc.addEventListener('DOMContentLoaded', recalc, false);   
        })(document, window);   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code> (<span class="hljs-name">function</span> (<span class="hljs-name">doc</span>, win) {   
            var docEl = doc.documentElement,   
            resizeEvt = <span class="hljs-symbol">'orientationchange</span>' in window ? <span class="hljs-symbol">'orientationchange</span>' : <span class="hljs-symbol">'resize</span>',   
            recalc = function () {   
            var clientWidth = docEl.clientWidth<span class="hljs-comment">;   </span>
            if (<span class="hljs-name">!clientWidth</span>) return<span class="hljs-comment">;   </span>
            docEl.style.fontSize = <span class="hljs-number">20</span> * (<span class="hljs-name">clientWidth</span> / <span class="hljs-number">320</span>) + <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;   </span>
        }<span class="hljs-comment">;   </span>
        if (<span class="hljs-name">!doc.addEventListener</span>) return<span class="hljs-comment">;   </span>
        win.addEventListener(<span class="hljs-name">resizeEvt</span>, recalc, false)<span class="hljs-comment">;   </span>
        doc.addEventListener(<span class="hljs-symbol">'DOMContentLoaded</span>', recalc, false)<span class="hljs-comment">;   </span>
        })(<span class="hljs-name">document</span>, window)<span class="hljs-comment">;   </span></code></pre>
<p>3.designWidth:设计稿的实际宽度值，需要根据实际设置,maxWidth:制作稿的最大宽度值，需要根据实际设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(designWidth, maxWidth) {
    var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement(&quot;style&quot;),
    tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width>maxWidth &amp;&amp; (width=maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement(&quot;div&quot;);
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener(&quot;resize&quot;, function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener(&quot;pageshow&quot;, function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === &quot;complete&quot;) {
        doc.body.style.fontSize = &quot;16px&quot;;
    } else {
        doc.addEventListener(&quot;DOMContentLoaded&quot;, function(e) {
            doc.body.style.fontSize = &quot;16px&quot;;
        }, false);
    }
})(750, 750);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">designWidth</span>, maxWidth) {
    var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement(<span class="hljs-string">"style"</span>),
    tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || <span class="hljs-number">540</span><span class="hljs-comment">;</span>
        width&gt;maxWidth &amp;&amp; (<span class="hljs-name">width=maxWidth</span>)<span class="hljs-comment">;</span>
        var rem = width * <span class="hljs-number">100</span> / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (<span class="hljs-name">docEl.firstElementChild</span>) {
        docEl.firstElementChild.appendChild(<span class="hljs-name">remStyle</span>)<span class="hljs-comment">;</span>
    } else {
        var wrap = doc.createElement(<span class="hljs-string">"div"</span>)<span class="hljs-comment">;</span>
        wrap.appendChild(<span class="hljs-name">remStyle</span>)<span class="hljs-comment">;</span>
        doc.write(<span class="hljs-name">wrap.innerHTML</span>)<span class="hljs-comment">;</span>
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行<span class="hljs-number">2</span>次；
    refreshRem()<span class="hljs-comment">;</span>

    win.addEventListener(<span class="hljs-string">"resize"</span>, function() {
        clearTimeout(<span class="hljs-name">tid</span>)<span class="hljs-comment">; //防止执行两次</span>
        tid = setTimeout(<span class="hljs-name">refreshRem</span>, <span class="hljs-number">300</span>)<span class="hljs-comment">;</span>
    }, <span class="hljs-literal">false</span>)<span class="hljs-comment">;</span>

    win.addEventListener(<span class="hljs-string">"pageshow"</span>, function(<span class="hljs-name">e</span>) {
        if (<span class="hljs-name">e.persisted</span>) { // 浏览器后退的时候重新计算
            clearTimeout(<span class="hljs-name">tid</span>)<span class="hljs-comment">;</span>
            tid = setTimeout(<span class="hljs-name">refreshRem</span>, <span class="hljs-number">300</span>)<span class="hljs-comment">;</span>
        }
    }, <span class="hljs-literal">false</span>)<span class="hljs-comment">;</span>

    if (<span class="hljs-name">doc.readyState</span> === <span class="hljs-string">"complete"</span>) {
        doc.body.style.fontSize = <span class="hljs-string">"16px"</span><span class="hljs-comment">;</span>
    } else {
        doc.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>, function(<span class="hljs-name">e</span>) {
            doc.body.style.fontSize = <span class="hljs-string">"16px"</span><span class="hljs-comment">;</span>
        }, <span class="hljs-literal">false</span>)<span class="hljs-comment">;</span>
    }
})(<span class="hljs-number">750</span>, <span class="hljs-number">750</span>)<span class="hljs-comment">;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于rem布局的解析

## 原文链接
[https://segmentfault.com/a/1190000011831345](https://segmentfault.com/a/1190000011831345)


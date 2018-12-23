---
title: '移动端(手机端)页面自适应解决方案—rem布局篇' 
date: 2018-12-24 2:30:07
hidden: true
slug: lz0of5ks33
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">移动端(手机端)页面自适应解决方案—rem布局</h2>
<p>假设设计妹妹给我们的设计稿尺寸为750 * 1340。结合网易、淘宝移动端首页html元素上的动态font-size属性、设计稿尺寸、前端与设计之间协作流程一般分为下面两种：</p>
<h3 id="articleHeader1">一、网易做法：</h3>
<p>引入：页面开头处引入下面这段代码，用于动态计算font-size</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        dpr = 1,
        scale = 1 / dpr,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        // 乘以100，px : rem = 100 : 1
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalc()
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">doc</span>, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(<span class="hljs-name"><span class="hljs-builtin-name">/</span></span>\(<span class="hljs-name">i</span>[<span class="hljs-name">^</span><span class="hljs-comment">;]+;( U;)? CPU.+Mac OS X/),</span>
        dpr = isIOS ? Math.min(<span class="hljs-name">win.devicePixelRatio</span>, <span class="hljs-number">3</span>) : <span class="hljs-number">1</span>,
        dpr = window.top === window.self ? dpr : <span class="hljs-number">1</span>, //被iframe引用时，禁止缩放
        dpr = <span class="hljs-number">1</span>,
        scale = <span class="hljs-number">1</span> / dpr,
        resizeEvt = <span class="hljs-symbol">'orientationchange</span>' in window ? <span class="hljs-symbol">'orientationchange</span>' : <span class="hljs-symbol">'resize</span>'<span class="hljs-comment">;</span>
    docEl.dataset.dpr = dpr<span class="hljs-comment">;</span>
    var metaEl = doc.createElement(<span class="hljs-symbol">'meta</span>')<span class="hljs-comment">;</span>
    metaEl.name = <span class="hljs-symbol">'viewport</span>'<span class="hljs-comment">;</span>
    metaEl.content = <span class="hljs-symbol">'initial-scale=</span>' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale<span class="hljs-comment">;</span>
    docEl.firstElementChild.appendChild(<span class="hljs-name">metaEl</span>)<span class="hljs-comment">;</span>
    var recalc = function() {
        var width = docEl.clientWidth<span class="hljs-comment">;</span>
        if (<span class="hljs-name">width</span> / dpr &gt; <span class="hljs-number">750</span>) {
            width = <span class="hljs-number">750</span> * dpr<span class="hljs-comment">;</span>
        }
        // 乘以100，px : rem = <span class="hljs-number">100</span> : <span class="hljs-number">1</span>
        docEl.style.fontSize = <span class="hljs-number">100</span> * (<span class="hljs-name">width</span> / <span class="hljs-number">750</span>) + <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;</span>
    }<span class="hljs-comment">;</span>
    recalc()
    if (<span class="hljs-name">!doc.addEventListener</span>) return<span class="hljs-comment">;</span>
    win.addEventListener(<span class="hljs-name">resizeEvt</span>, recalc, false)<span class="hljs-comment">;</span>
})(<span class="hljs-name">document</span>, window)<span class="hljs-comment">;</span></code></pre>
<h4>使用：</h4>
<p>未引入前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    width: 750px;
    height: 640px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">750px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">640px</span>;
}</code></pre>
<p>引入后：除以100并将px换成rem</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    width: 7.5rem;
    height: 6.4rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7.5rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6.4rem</span>;
}</code></pre>
<p>换算的依据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 乘以100，px : rem = 100 : 1
var recalc = function() {
    var width = docEl.clientWidth;
    if (width / dpr > 750) {
        width = 750 * dpr;
    }
    // 乘以100，px : rem = 100 : 1
    docEl.style.fontSize = 100 * (width / 750) + 'px';
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// 乘以<span class="hljs-number">100</span>，px : <span class="hljs-built_in">rem</span> = <span class="hljs-number">100</span> : <span class="hljs-number">1</span>
<span class="hljs-built_in">var</span> recalc = function() {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">width</span> = docEl.clientWidth;
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">width</span> / dpr &gt; <span class="hljs-number">750</span>) {
        <span class="hljs-built_in">width</span> = <span class="hljs-number">750</span> * dpr;
    }
    // 乘以<span class="hljs-number">100</span>，px : <span class="hljs-built_in">rem</span> = <span class="hljs-number">100</span> : <span class="hljs-number">1</span>
    docEl.<span class="hljs-built_in">style</span>.fontSize = <span class="hljs-number">100</span> * (<span class="hljs-built_in">width</span> / <span class="hljs-number">750</span>) + 'px';
};</code></pre>
<h3 id="articleHeader2">二、淘宝做法（推荐做法，尤其是app内嵌页面）：</h3>
<p>引入：页面开头处引入下面这段代码，用于动态计算font-size，或者单独放入一个文件，引入文件也可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";
(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name=&quot;viewport&quot;]');
    var flexibleEl = doc.querySelector('meta[name=&quot;flexible&quot;]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr &amp;&amp; !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 &amp;&amp; (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 &amp;&amp; (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        // 适配平板
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' &amp;&amp; d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' &amp;&amp; d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code><span class="hljs-comment">;</span>
(<span class="hljs-name">function</span>(<span class="hljs-name">win</span>, lib) {
    var doc = win.document<span class="hljs-comment">;</span>
    var docEl = doc.documentElement<span class="hljs-comment">;</span>
    var metaEl = doc.querySelector(<span class="hljs-symbol">'meta</span>[<span class="hljs-name">name=</span><span class="hljs-string">"viewport"</span>]')<span class="hljs-comment">;</span>
    var flexibleEl = doc.querySelector(<span class="hljs-symbol">'meta</span>[<span class="hljs-name">name=</span><span class="hljs-string">"flexible"</span>]')<span class="hljs-comment">;</span>
    var dpr = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    var scale = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    var tid<span class="hljs-comment">;</span>
    var flexible = lib.flexible || (<span class="hljs-name">lib.flexible</span> = {})<span class="hljs-comment">;</span>

    if (<span class="hljs-name">metaEl</span>) {
        var match = metaEl.getAttribute(<span class="hljs-symbol">'content</span>').match(<span class="hljs-name">/initial</span>\-scale=([\d\.]+)/)<span class="hljs-comment">;</span>
        if (<span class="hljs-name">match</span>) {
            scale = parseFloat(<span class="hljs-name">match</span>[<span class="hljs-name">1</span>])<span class="hljs-comment">;</span>
            dpr = parseInt(<span class="hljs-name">1</span> / scale)<span class="hljs-comment">;</span>
        }
    } else if (<span class="hljs-name">flexibleEl</span>) {
        var content = flexibleEl.getAttribute(<span class="hljs-symbol">'content</span>')<span class="hljs-comment">;</span>
        if (<span class="hljs-name">content</span>) {
            var initialDpr = content.match(<span class="hljs-name">/initial</span>\-dpr=([\d\.]+)/)<span class="hljs-comment">;</span>
            var maximumDpr = content.match(<span class="hljs-name">/maximum</span>\-dpr=([\d\.]+)/)<span class="hljs-comment">;</span>
            if (<span class="hljs-name">initialDpr</span>) {
                dpr = parseFloat(<span class="hljs-name">initialDpr</span>[<span class="hljs-name">1</span>])<span class="hljs-comment">;</span>
                scale = parseFloat((<span class="hljs-name">1</span> / dpr).toFixed(<span class="hljs-name">2</span>))<span class="hljs-comment">;</span>
            }
            if (<span class="hljs-name">maximumDpr</span>) {
                dpr = parseFloat(<span class="hljs-name">maximumDpr</span>[<span class="hljs-name">1</span>])<span class="hljs-comment">;</span>
                scale = parseFloat((<span class="hljs-name">1</span> / dpr).toFixed(<span class="hljs-name">2</span>))<span class="hljs-comment">;</span>
            }
        }
    }

    if (<span class="hljs-name">!dpr</span> &amp;&amp; !scale) {
        var isAndroid = win.navigator.appVersion.match(<span class="hljs-name">/android/gi</span>)<span class="hljs-comment">;</span>
        var isIPhone = win.navigator.appVersion.match(<span class="hljs-name">/iphone/gi</span>)<span class="hljs-comment">;</span>
        var devicePixelRatio = win.devicePixelRatio<span class="hljs-comment">;</span>
        if (<span class="hljs-name">isIPhone</span>) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (<span class="hljs-name">devicePixelRatio</span> &gt;= <span class="hljs-number">3</span> &amp;&amp; (<span class="hljs-name">!dpr</span> || dpr &gt;= <span class="hljs-number">3</span>)) {
                dpr = <span class="hljs-number">3</span><span class="hljs-comment">;</span>
            } else if (<span class="hljs-name">devicePixelRatio</span> &gt;= <span class="hljs-number">2</span> &amp;&amp; (<span class="hljs-name">!dpr</span> || dpr &gt;= <span class="hljs-number">2</span>)) {
                dpr = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
            } else {
                dpr = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
        }
        scale = <span class="hljs-number">1</span> / dpr<span class="hljs-comment">;</span>
    }

    docEl.setAttribute(<span class="hljs-symbol">'data-dpr</span>', dpr)<span class="hljs-comment">;</span>
    if (<span class="hljs-name">!metaEl</span>) {
        metaEl = doc.createElement(<span class="hljs-symbol">'meta</span>')<span class="hljs-comment">;</span>
        metaEl.setAttribute(<span class="hljs-symbol">'name</span>', <span class="hljs-symbol">'viewport</span>')<span class="hljs-comment">;</span>
        metaEl.setAttribute(<span class="hljs-symbol">'content</span>', <span class="hljs-symbol">'initial-scale=</span>' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')<span class="hljs-comment">;</span>
        if (<span class="hljs-name">docEl.firstElementChild</span>) {
            docEl.firstElementChild.appendChild(<span class="hljs-name">metaEl</span>)<span class="hljs-comment">;</span>
        } else {
            var wrap = doc.createElement(<span class="hljs-symbol">'div</span>')<span class="hljs-comment">;</span>
            wrap.appendChild(<span class="hljs-name">metaEl</span>)<span class="hljs-comment">;</span>
            doc.write(<span class="hljs-name">wrap.innerHTML</span>)<span class="hljs-comment">;</span>
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width<span class="hljs-comment">;</span>
        // 适配平板
        if (<span class="hljs-name">width</span> / dpr &gt; <span class="hljs-number">540</span>) {
            width = <span class="hljs-number">540</span> * dpr<span class="hljs-comment">;</span>
        }
        var rem = width / <span class="hljs-number">10</span><span class="hljs-comment">;</span>
        docEl.style.fontSize = rem + <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;</span>
        flexible.rem = win.rem = rem<span class="hljs-comment">;</span>
    }

    win.addEventListener(<span class="hljs-symbol">'resize</span>', function() {
        clearTimeout(<span class="hljs-name">tid</span>)<span class="hljs-comment">;</span>
        tid = setTimeout(<span class="hljs-name">refreshRem</span>, <span class="hljs-number">300</span>)<span class="hljs-comment">;</span>
    }, false)<span class="hljs-comment">;</span>
    win.addEventListener(<span class="hljs-symbol">'pageshow</span>', function(<span class="hljs-name">e</span>) {
        if (<span class="hljs-name">e.persisted</span>) {
            clearTimeout(<span class="hljs-name">tid</span>)<span class="hljs-comment">;</span>
            tid = setTimeout(<span class="hljs-name">refreshRem</span>, <span class="hljs-number">300</span>)<span class="hljs-comment">;</span>
        }
    }, false)<span class="hljs-comment">;</span>

    if (<span class="hljs-name">doc.readyState</span> === <span class="hljs-symbol">'complete</span>') {
        doc.body.style.fontSize = <span class="hljs-number">12</span> * dpr + <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;</span>
    } else {
        doc.addEventListener(<span class="hljs-symbol">'DOMContentLoaded</span>', function(<span class="hljs-name">e</span>) {
            doc.body.style.fontSize = <span class="hljs-number">12</span> * dpr + <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;</span>
        }, false)<span class="hljs-comment">;</span>
    }


    refreshRem()<span class="hljs-comment">;</span>

    flexible.dpr = win.dpr = dpr<span class="hljs-comment">;</span>
    flexible.refreshRem = refreshRem<span class="hljs-comment">;</span>
    flexible.rem2px = function(<span class="hljs-name">d</span>) {
        var val = parseFloat(<span class="hljs-name">d</span>) * this.rem<span class="hljs-comment">;</span>
        if (<span class="hljs-name">typeof</span> d === <span class="hljs-symbol">'string</span>' &amp;&amp; d.match(<span class="hljs-name">/rem$/</span>)) {
            val += <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;</span>
        }
        return val<span class="hljs-comment">;</span>
    }
    flexible.px2rem = function(<span class="hljs-name">d</span>) {
        var val = parseFloat(<span class="hljs-name">d</span>) / this.rem<span class="hljs-comment">;</span>
        if (<span class="hljs-name">typeof</span> d === <span class="hljs-symbol">'string</span>' &amp;&amp; d.match(<span class="hljs-name">/px$/</span>)) {
            val += <span class="hljs-symbol">'rem</span>'<span class="hljs-comment">;</span>
        }
        return val<span class="hljs-comment">;</span>
    }

})(<span class="hljs-name">window</span>, window[<span class="hljs-symbol">'lib</span>'] || (<span class="hljs-name">window</span>[<span class="hljs-symbol">'lib</span>'] = {}))<span class="hljs-comment">;</span></code></pre>
<h4>使用：</h4>
<p>未引入前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    width: 750px;
    height: 640px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">750px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">640px</span>;
}</code></pre>
<p>引入后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-size-base: 75;
body {
    width: 750rem/@font-size-base;
    height: 640rem/@font-size-base;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@font-size-base:</span> <span class="hljs-number">75</span>;
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">750rem</span>/<span class="hljs-variable">@font-size-base</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">640rem</span>/<span class="hljs-variable">@font-size-base</span>;
}</code></pre>
<p>换算依据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    // 适配平板
    if (width / dpr > 540) {
        width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function refreshRem() {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">width</span> = docEl.getBoundingClientRect().<span class="hljs-built_in">width</span>;
    // 适配平板
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">width</span> / dpr &gt; <span class="hljs-number">540</span>) {
        <span class="hljs-built_in">width</span> = <span class="hljs-number">540</span> * dpr;
    }
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">rem</span> = <span class="hljs-built_in">width</span> / <span class="hljs-number">10</span>;
    docEl.<span class="hljs-built_in">style</span>.fontSize = <span class="hljs-built_in">rem</span> + 'px';
    flexible.<span class="hljs-built_in">rem</span> = win.<span class="hljs-built_in">rem</span> = <span class="hljs-built_in">rem</span>;
}</code></pre>
<p>这边是用的less，如果您没有用less，就需要手动计算，当然也可以转化为px : rem = 100 : 1。<br>如果想转化为px : rem = 100 : 1，可以修改上面的refreshRem函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    // 适配平板
    if (width / dpr > 750) {
      width = 750 * dpr
    }
    var rem = 100 * (width / 750)
    docEl.style.fontSize = rem + 'px'
    flexible.rem = win.rem = rem;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function refreshRem() {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">width</span> = docEl.getBoundingClientRect().<span class="hljs-built_in">width</span>
    // 适配平板
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">width</span> / dpr &gt; <span class="hljs-number">750</span>) {
      <span class="hljs-built_in">width</span> = <span class="hljs-number">750</span> * dpr
    }
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">rem</span> = <span class="hljs-number">100</span> * (<span class="hljs-built_in">width</span> / <span class="hljs-number">750</span>)
    docEl.<span class="hljs-built_in">style</span>.fontSize = <span class="hljs-built_in">rem</span> + 'px'
    flexible.<span class="hljs-built_in">rem</span> = win.<span class="hljs-built_in">rem</span> = <span class="hljs-built_in">rem</span>;
}
</code></pre>
<p>使用：</p>
<p>未引入前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    width: 750px;
    height: 640px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">750px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">640px</span>;
}</code></pre>
<p>引入后：除以100并将px换成rem</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    width: 7.5rem;
    height: 6.4rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7.5rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6.4rem</span>;
}</code></pre>
<p>换算依据就是上面修改的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    // 适配平板
    if (width / dpr > 750) {
      width = 750 * dpr
    }
    var rem = 100 * (width / 750)
    docEl.style.fontSize = rem + 'px'
    flexible.rem = win.rem = rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function refreshRem() {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">width</span> = docEl.getBoundingClientRect().<span class="hljs-built_in">width</span>
    // 适配平板
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">width</span> / dpr &gt; <span class="hljs-number">750</span>) {
      <span class="hljs-built_in">width</span> = <span class="hljs-number">750</span> * dpr
    }
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">rem</span> = <span class="hljs-number">100</span> * (<span class="hljs-built_in">width</span> / <span class="hljs-number">750</span>)
    docEl.<span class="hljs-built_in">style</span>.fontSize = <span class="hljs-built_in">rem</span> + 'px'
    flexible.<span class="hljs-built_in">rem</span> = win.<span class="hljs-built_in">rem</span> = <span class="hljs-built_in">rem</span>;
}</code></pre>
<p>具体实现原理请参照：<a href="http://www.cnblogs.com/lyzg/p/4877277.html" rel="nofollow noreferrer" target="_blank">从网易与淘宝的font-size思考前端设计稿与工作流</a>，写的很不错！</p>
<p>希望对需要的朋友有所帮助！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端(手机端)页面自适应解决方案—rem布局篇

## 原文链接
[https://segmentfault.com/a/1190000012225828](https://segmentfault.com/a/1190000012225828)


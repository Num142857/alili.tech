---
title: 'Material Design for Bootstrap' 
date: 2019-02-09 2:30:58
hidden: true
slug: tj355jtn1oq
categories: [reprint]
---

{{< raw >}}

                    
<p>简单几行代码，就可以给bs框架添加Material Design风格</p>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVx7b9?w=336&amp;h=83" src="https://static.alili.tech/img/bVx7b9?w=336&amp;h=83" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>demo: <a href="http://jsoncode.github.io/materialDesign/" rel="nofollow noreferrer" target="_blank">http://jsoncode.github.io/mat...</a></p>
<p>这是常见的btn加了Material Design效果<br>这里采用的是bootstrap4</p>
<p>引入：bs.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;css/bootstrap.min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/bootstrap.min.css"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;btn btn-secondary&quot; type=&quot;button&quot; materialDesign>Material Design for Bootstrap</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"btn btn-secondary"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span> materialDesign&gt;<span class="hljs-type">Material</span> <span class="hljs-type">Design</span> <span class="hljs-keyword">for</span> <span class="hljs-type">Bootstrap</span>&lt;/button&gt;</code></pre>
<p>你可能看到上面多了一个materialDesign属性，对，等下我们就通过这个属性来实现material Design效果</p>
<p>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[materialDesign] {
    display: inline-block;
    letter-spacing: .8px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.animate-hand{
    height: 134px;
    width: 134px;
    display: block;
    position: absolute;
    background: currentColor;
    opacity: 0.6;
    border-radius: 100%;
    -webkit-transform: scale(0);
    transform: scale(0);
    z-index: 0;
}
.animate-hand.animate {
    -webkit-animation: ripple .5s linear;
    animation: ripple .5s linear;
}

@-webkit-keyframes ripple {
    100% {
        opacity: 0;
        -webkit-transform: scale(4.5);
        transform: scale(4.5);
    }
}

@keyframes ripple {
    100% {
        opacity: 0;
        -webkit-transform: scale(4.5);
        transform: scale(4.5);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[materialDesign]</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">8px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">-webkit-user-select</span>: none;
    <span class="hljs-attribute">-moz-user-select</span>: none;
    <span class="hljs-attribute">-ms-user-select</span>: none;
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.animate-hand</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">134px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">134px</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">background</span>: currentColor;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.6</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale</span>(0);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.animate-hand</span><span class="hljs-selector-class">.animate</span> {
    <span class="hljs-attribute">-webkit-animation</span>: ripple .<span class="hljs-number">5s</span> linear;
    <span class="hljs-attribute">animation</span>: ripple .<span class="hljs-number">5s</span> linear;
}

@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> ripple {
    100% {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale</span>(4.5);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(4.5);
    }
}

@<span class="hljs-keyword">keyframes</span> ripple {
    100% {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale</span>(4.5);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(4.5);
    }
}
</code></pre>
<p>js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    for (var i = 0, btn; btn = document.querySelectorAll('[materialDesign]')[i++];) {
        btn.addEventListener('click', function(e) {
            var tag = this;
            if (this.getAttribute('materialDesign') === undefined) {
                tag = this.parentNode;
            }
            var div = tag.querySelector(&quot;.animate-hand&quot;);
            if (!div) {
                div = document.createElement(&quot;div&quot;);
                tag.appendChild(div);
            }
            div.className = 'animate-hand';
            var x = e.pageX;
            var y = e.pageY;
            var left = tag.offsetLeft;
            var top = tag.offsetTop;
            var height = div.offsetHeight;
            var width = div.offsetWidth;
            div.className = &quot;&quot;;

            div.style.left = x - left - width / 2 + &quot;px&quot;;
            div.style.top = y - top - height / 2 + &quot;px&quot;;
            div.className = &quot;animate-hand animate&quot;;
        });
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, btn; btn = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'[materialDesign]'</span>)[i++];) {
        btn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> tag = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.getAttribute(<span class="hljs-string">'materialDesign'</span>) === <span class="hljs-literal">undefined</span>) {
                tag = <span class="hljs-keyword">this</span>.parentNode;
            }
            <span class="hljs-keyword">var</span> div = tag.querySelector(<span class="hljs-string">".animate-hand"</span>);
            <span class="hljs-keyword">if</span> (!div) {
                div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
                tag.appendChild(div);
            }
            div.className = <span class="hljs-string">'animate-hand'</span>;
            <span class="hljs-keyword">var</span> x = e.pageX;
            <span class="hljs-keyword">var</span> y = e.pageY;
            <span class="hljs-keyword">var</span> left = tag.offsetLeft;
            <span class="hljs-keyword">var</span> top = tag.offsetTop;
            <span class="hljs-keyword">var</span> height = div.offsetHeight;
            <span class="hljs-keyword">var</span> width = div.offsetWidth;
            div.className = <span class="hljs-string">""</span>;

            div.style.left = x - left - width / <span class="hljs-number">2</span> + <span class="hljs-string">"px"</span>;
            div.style.top = y - top - height / <span class="hljs-number">2</span> + <span class="hljs-string">"px"</span>;
            div.className = <span class="hljs-string">"animate-hand animate"</span>;
        });
    }
})();</code></pre>
<p>搞定，只要在任意一个标签上添加materialDesign属性，即可实现该效果</p>
<p>更多特效后续上传。</p>
<hr>
<p>第二次修改：<br>源码已放到github：<a href="https://github.com/jsoncode/materialDesign" rel="nofollow noreferrer" target="_blank">https://github.com/jsoncode/m...</a></p>
<blockquote>由于无法解决touch事件不能获取焦点标签的坐标位置，所以只能用click事件，而不能用touch类事件<br>防止click事件的滥用，改用mousedown事件</blockquote>
<h1 id="articleHeader0">核心js：</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    'use strict';
    document.addEventListener(&quot;DOMContentLoaded&quot;, DOMContentLoaded, false);
    function DOMContentLoaded() {
        for (var i = 0, btn; btn = document.querySelectorAll('[materialDesign]')[i++];) {
            btn.addEventListener('mousedown', materialDesignBg);
        }
    }
    function materialDesignBg(e) {
        e.preventDefault();
        e.stopPropagation();
        var tag = this;
        var div = tag.querySelector(&quot;.animate-hand&quot;);
        if (!div) {
            div = document.createElement(&quot;div&quot;);
        }
        div.className = 'animate-hand';
        tag.insertBefore(div, tag.firstElementChild);

        var scale = Math.round(tag.offsetWidth / 100) || 1;
        var left = e.layerX;
        var top = e.layerY;

        div.style.left = left + &quot;px&quot;;
        div.style.top = top + &quot;px&quot;;
        scale = scale > 6 ? 6 : scale;
        div.className = &quot;animate-hand animate ripple_&quot; + (e.changedTouches ? scale + 1 : scale);
        if (tag.nodeName != 'A' &amp;&amp; tag.getAttribute(&quot;href&quot;)) {
            location.href = tag.getAttribute(&quot;href&quot;);
        }
        return false;
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    'use strict'</span>;
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>, DOMContentLoaded, <span class="hljs-literal">false</span>);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DOMContentLoaded</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, btn; btn = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'[materialDesign]'</span>)[i++];) {
            btn.addEventListener(<span class="hljs-string">'mousedown'</span>, materialDesignBg);
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">materialDesignBg</span>(<span class="hljs-params">e</span>) </span>{
        e.preventDefault();
        e.stopPropagation();
        <span class="hljs-keyword">var</span> tag = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> div = tag.querySelector(<span class="hljs-string">".animate-hand"</span>);
        <span class="hljs-keyword">if</span> (!div) {
            div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
        }
        div.className = <span class="hljs-string">'animate-hand'</span>;
        tag.insertBefore(div, tag.firstElementChild);

        <span class="hljs-keyword">var</span> scale = <span class="hljs-built_in">Math</span>.round(tag.offsetWidth / <span class="hljs-number">100</span>) || <span class="hljs-number">1</span>;
        <span class="hljs-keyword">var</span> left = e.layerX;
        <span class="hljs-keyword">var</span> top = e.layerY;

        div.style.left = left + <span class="hljs-string">"px"</span>;
        div.style.top = top + <span class="hljs-string">"px"</span>;
        scale = scale &gt; <span class="hljs-number">6</span> ? <span class="hljs-number">6</span> : scale;
        div.className = <span class="hljs-string">"animate-hand animate ripple_"</span> + (e.changedTouches ? scale + <span class="hljs-number">1</span> : scale);
        <span class="hljs-keyword">if</span> (tag.nodeName != <span class="hljs-string">'A'</span> &amp;&amp; tag.getAttribute(<span class="hljs-string">"href"</span>)) {
            location.href = tag.getAttribute(<span class="hljs-string">"href"</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
})();</code></pre>
<p>样式持续更新，也可以根据自己喜欢的样式重新定义bootstrap</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Material Design for Bootstrap

## 原文链接
[https://segmentfault.com/a/1190000005708521](https://segmentfault.com/a/1190000005708521)


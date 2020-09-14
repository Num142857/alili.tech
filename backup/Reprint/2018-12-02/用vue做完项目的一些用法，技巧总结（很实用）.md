---
title: '用vue做完项目的一些用法，技巧总结（很实用）' 
date: 2018-12-02 2:30:15
hidden: true
slug: 27y7qd61mhg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一.vue.js 添加 fastclick的支持</h2>
<p>fastclick：处理移动端click事件300毫秒延迟</p>
<h4>1) 安装</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install fastclick -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> fastclick -S
</code></pre>
<h4>2) 引入</h4>
<p>之后，在main.js中引入，并绑定到body</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import FastClick from 'fastclick

FastClick.attach(document.body);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> FastClick from 'fastclick

FastClick.attach(document.body);</span>

</code></pre>
<h2 id="articleHeader1">二.引用border.css解决1px边框问题，以为是border.css代码，如果有需要可以加我扣扣(449245882):</h2>
<h4>1) boder.css</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@charset &quot;utf-8&quot;;
.border,
.border-top,
.border-right,
.border-bottom,
.border-left,
.border-topbottom,
.border-rightleft,
.border-topleft,
.border-rightbottom,
.border-topright,
.border-bottomleft {
    position: relative;
 }
.border::before,
.border-top::before,
.border-right::before,
.border-bottom::before,
.border-left::before,
.border-topbottom::before,
.border-topbottom::after,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::before,
.border-topleft::after,
.border-rightbottom::before,
.border-rightbottom::after,
.border-topright::before,
.border-topright::after,
.border-bottomleft::before,

.border-bottomleft::after {
    content: &quot;\0020&quot;;
    overflow: hidden;
    position: absolute;
}

/* border
 * 因，边框是由伪元素区域遮盖在父级
 * 故，子级若有交互，需要对子级设置
 * 定位 及 z轴
 */
 
 .border::before {
    box-sizing: border-box;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #eaeaea;
    transform-origin: 0 0;
}

.border-top::before,
.border-bottom::before,
.border-topbottom::before,
.border-topbottom::after,
.border-topleft::before,
.border-rightbottom::after,
.border-topright::before,
.border-bottomleft::before {
    left: 0;
    width: 100%;
    height: 1px;
}

.border-right::before,
.border-left::before,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::after,
.border-rightbottom::before,
.border-topright::after,
.border-bottomleft::after {
    top: 0;
    width: 1px;
    height: 100%;
}
.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before {
    border-top: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-right::before,
.border-rightbottom::before,
.border-rightleft::before,
.border-topright::after {
    border-right: 1px solid #eaeaea;
    transform-origin: 100% 0;
}
.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::before {
    border-bottom: 1px solid #eaeaea;
    transform-origin: 0 100%;
}
.border-left::before,
.border-topleft::after,
.border-rightleft::after,
.border-bottomleft::after {
    border-left: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before {
    top: 0;
}
.border-right::before,
.border-rightleft::after,
.border-rightbottom::before,
.border-topright::after {
    right: 0;
}
.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::after {
    bottom: 0;
}
.border-left::before,
.border-rightleft::before,
.border-topleft::after,
.border-bottomleft::before {
    left: 0;
}
@media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {
    /* 默认值，无需重置 */
}
@media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {
    .border::before {
        width: 200%;
        height: 200%;
        transform: scale(.5);
    }
    .border-top::before,
    .border-bottom::before,
    .border-topbottom::before,
    .border-topbottom::after,
    .border-topleft::before,
    .border-rightbottom::after,
    .border-topright::before,
    .border-bottomleft::before {
        transform: scaleY(.5);
    }
    .border-right::before,
    .border-left::before,
    .border-rightleft::before,
    .border-rightleft::after,
    .border-topleft::after,
    .border-rightbottom::before,
    .border-topright::after,
    .border-bottomleft::after {
        transform: scaleX(.5);
    }
}
@media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {
    .border::before {
        width: 300%;
        height: 300%;
        transform: scale(.33333);
    }
    .border-top::before,
    .border-bottom::before,
    .border-topbottom::before,
    .border-topbottom::after,
    .border-topleft::before,
    .border-rightbottom::after,
    .border-topright::before,
    .border-bottomleft::before {
        transform: scaleY(.33333);
    }
    .border-right::before,
    .border-left::before,
    .border-rightleft::before,
    .border-rightleft::after,
    .border-topleft::after,
    .border-rightbottom::before,
    .border-topright::after,
    .border-bottomleft::after {
        transform: scaleX(.33333);
    }
}
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">charset</span> <span class="hljs-string">"utf-8"</span>;
<span class="hljs-selector-class">.border</span>,
<span class="hljs-selector-class">.border-top</span>,
<span class="hljs-selector-class">.border-right</span>,
<span class="hljs-selector-class">.border-bottom</span>,
<span class="hljs-selector-class">.border-left</span>,
<span class="hljs-selector-class">.border-topbottom</span>,
<span class="hljs-selector-class">.border-rightleft</span>,
<span class="hljs-selector-class">.border-topleft</span>,
<span class="hljs-selector-class">.border-rightbottom</span>,
<span class="hljs-selector-class">.border-topright</span>,
<span class="hljs-selector-class">.border-bottomleft</span> {
    <span class="hljs-attribute">position</span>: relative;
 }
<span class="hljs-selector-class">.border</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-top</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-right</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-bottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-left</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::before</span>,

<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\0020"</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-comment">/* border
 * 因，边框是由伪元素区域遮盖在父级
 * 故，子级若有交互，需要对子级设置
 * 定位 及 z轴
 */</span>
 
 <span class="hljs-selector-class">.border</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eaeaea</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.border-top</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-bottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
}

<span class="hljs-selector-class">.border-right</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-left</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.border-top</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eaeaea</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.border-right</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eaeaea</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.border-bottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eaeaea</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.border-left</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eaeaea</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.border-top</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.border-right</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.border-bottom</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.border-left</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}
@<span class="hljs-keyword">media</span> (max--moz-device-pixel-ratio: <span class="hljs-number">1.49</span>), (-webkit-max-device-pixel-ratio: <span class="hljs-number">1.49</span>), (max-device-pixel-ratio: <span class="hljs-number">1.49</span>), (max-resolution: <span class="hljs-number">143dpi</span>), (max-resolution: <span class="hljs-number">1.49dppx</span>) {
    <span class="hljs-comment">/* 默认值，无需重置 */</span>
}
@<span class="hljs-keyword">media</span> (min--moz-device-pixel-ratio: <span class="hljs-number">1.5</span>) and (max--moz-device-pixel-ratio: <span class="hljs-number">2.49</span>), (-webkit-min-device-pixel-ratio: <span class="hljs-number">1.5</span>) and (-webkit-max-device-pixel-ratio: <span class="hljs-number">2.49</span>), (min-device-pixel-ratio: <span class="hljs-number">1.5</span>) and (max-device-pixel-ratio: <span class="hljs-number">2.49</span>), (min-resolution: <span class="hljs-number">144dpi</span>) and (max-resolution: <span class="hljs-number">239dpi</span>), (min-resolution: <span class="hljs-number">1.5dppx</span>) and (max-resolution: <span class="hljs-number">2.49dppx</span>) {
    <span class="hljs-selector-class">.border</span><span class="hljs-selector-pseudo">::before</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200%</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(.5);
    }
    <span class="hljs-selector-class">.border-top</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-bottom</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::before</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(.5);
    }
    <span class="hljs-selector-class">.border-right</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-left</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(.5);
    }
}
@<span class="hljs-keyword">media</span> (min--moz-device-pixel-ratio: <span class="hljs-number">2.5</span>), (-webkit-min-device-pixel-ratio: <span class="hljs-number">2.5</span>), (min-device-pixel-ratio: <span class="hljs-number">2.5</span>), (min-resolution: <span class="hljs-number">240dpi</span>), (min-resolution: <span class="hljs-number">2.5dppx</span>) {
    <span class="hljs-selector-class">.border</span><span class="hljs-selector-pseudo">::before</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300%</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(.33333);
    }
    <span class="hljs-selector-class">.border-top</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-bottom</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-topbottom</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::before</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(.33333);
    }
    <span class="hljs-selector-class">.border-right</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-left</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-rightleft</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-topleft</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-rightbottom</span><span class="hljs-selector-pseudo">::before</span>,
    <span class="hljs-selector-class">.border-topright</span><span class="hljs-selector-pseudo">::after</span>,
    <span class="hljs-selector-class">.border-bottomleft</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(.33333);
    }
}
 
</code></pre>
<h4>2) 使用方法</h4>
<p>比如需要在 div 上加上一个底部1px的边框，可以这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;borter-bottom&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"borter-bottom"</span>&gt;</code></pre>
<p>对应其它的边框，可以查看css编写。</p>
<h2 id="articleHeader2">三.给路径加别名</h2>
<p>当项目比较复杂，文件层级多的时候，我们引入文件可能需要这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &quot;../../../../components&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-keyword">import</span> <span class="hljs-string">"../../../../components"</span>
</code></pre>
<p>这样写其实很不方便的，也不好定位，vue 给我们提供别，首先设置别名是在webpack.base.conf.js 的文件中设置。找到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve('src/components')
    }
  },
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
      <span class="hljs-string">'components'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/components'</span>)
    }
  },
  </code></pre>
<p>设置的时候就可以写成我上面的 resolve('src/components') 。在引入这个文件下面的文件时，直接components/**就可以了。</p>
<p>但对于样式的图片的别名，如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components')
}

<template>
  <img src=&quot;assets/images/logo.jpg&quot; />
</template>
<script>
import 'assets/css/style.css'
</script>
<style>
.logo {
  background: url(asset/images/bg.jpg)
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>alias: {
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components')
}

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"assets/images/logo.jpg"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> <span class="hljs-string">'assets/css/style.css'</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.logo</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(asset/images/bg.jpg)
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>上面的代码, 你会发现只有引入style.css是成功的, 图片地址和背景图片地址都会解析失。</p>
<p>经过各种搜索找原因(这时候, 你会发现百度搜索这些技术型的内容, 真是垃圾中的战斗机), 最终还是找到原因了...<br>vue-html-loader and css-loader translates non-root URLs to relative paths. In order to treat it like a module path, prefix it with ~<br>就是要在别名前面加一个~</p>
<h4>最终代码写成:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components')
}
<template>
    <img src=&quot;~assets/images/logo.jpg&quot; />
</template>
<script>
import 'assets/css/style.css'
</script>
<style>
.logo {
    background: url(~asset/images/bg.jpg)
}
</style>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>alias: {
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components')
}
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"~assets/images/logo.jpg"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> <span class="hljs-string">'assets/css/style.css'</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.logo</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(~asset/images/bg.jpg)
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

</code></pre>
<p>意思就是: 告诉加载器它是一个模块，而不是相对路径</p>
<blockquote>注意: 只有在template中的静态文件地址和style中的静态文件地址需要加~, 在script里的, 别名定义成什么就写什么</blockquote>
<h2 id="articleHeader3">四.使用 keep-alive 优化体验</h2>
<p>为了增加用户体验，我们可以使用 keep-alive 来进行页面的缓存，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive >
  <router-view/>
</keep-alive>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;keep-alive &gt;</span>
  <span class="hljs-section">&lt;router-view/&gt;</span>
<span class="hljs-section">&lt;/keep-alive&gt;</span>
</code></pre>
<p>但有时候我们可能要针对某个页面缓存或者不缓存，我们可以使用vue 提供的两个属性</p>
<blockquote>include - 字符串或正则表达式。只有匹配的组件会被缓存。<br> exclude - 字符串或正则表达式。任何匹配的组件都不会被缓存。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 逗号分隔字符串 -->
<keep-alive include=&quot;a,b&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include=&quot;/a|b/&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include=&quot;['a', 'b']&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 逗号分隔字符串 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">"a,b"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 正则表达式 (使用 `v-bind`) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">"/a|b/"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 数组 (使用 `v-bind`) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">"['a', 'b']"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
</code></pre>
<p>匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。</p>
<h2 id="articleHeader4">五.router-link  tag用法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li>子item</li>
    <li>子item</li>
    <li>子item</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>子item<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>子item<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>子item<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>如上，假如我们需求是点击Li 标签进行跳转，我们可能就会在li 标签上注册一个点击事件，用js时行动态跳转，但假如我们只在li时行跳转呢？你可能会想到 router-link ，但是ul 下只能是 li标签，这时 router-link 就提供了一个 tag 属性，例如 &lt;li&gt;。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;/foo&quot; tag=&quot;li&quot;>foo</router-link>
<!-- 渲染结果 -->
<li>foo</li>




" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/foo"</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"li"</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 渲染结果 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>




</code></pre>
<blockquote>愿你成为终身学习者</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue做完项目的一些用法，技巧总结（很实用）

## 原文链接
[https://segmentfault.com/a/1190000014698856](https://segmentfault.com/a/1190000014698856)


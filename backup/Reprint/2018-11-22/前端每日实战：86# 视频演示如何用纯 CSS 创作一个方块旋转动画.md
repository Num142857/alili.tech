---
title: '前端每日实战：86# 视频演示如何用纯 CSS 创作一个方块旋转动画' 
date: 2018-11-22 2:30:10
hidden: true
slug: l3t9kwkii4p
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbd765?w=400&amp;h=301" src="https://static.alili.tech/img/bVbd765?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/gjgyWm" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/gjgyWm</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/gjgyWm" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/czDMNsw" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/czDMNsw</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 4 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre><p>&#x753B;&#x51FA;&#x5BB9;&#x5668;&#x4E2D;&#x5FC3;&#x7684;&#x65B9;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader{
    width: 10em;
    height: 10em;
    border: 0.25em solid white;
    font-size: 10px;
    border-radius: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.25em</span> solid white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5BB9;&#x5668;&#x56DB;&#x5468;&#x7684;&#x65B9;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader,
.loader span {
    position: absolute;
}

.loader span:nth-child(1) {
    top: 5em;
    left: 5em;
}

.loader span:nth-child(2) {
    top: -5em;
    left: 5em;
}

.loader span:nth-child(3) {
    top: 5em;
    left: -5em;
}

.loader span:nth-child(4) {
    top: -5em;
    left: -5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">5em</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">5em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">5em</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">5em</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">5em</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">5em</span>;
}</code></pre><p>&#x7ED9;&#x65B9;&#x5757;&#x4E0A;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader,
.loader span {
    mix-blend-mode: screen;
}

.loader {
    background-color: gold;
}

.loader span:nth-child(1) {
    background-color: dodgerblue;
}

.loader span:nth-child(2) {
    background-color: hotpink;  
}

.loader span:nth-child(3) {
    background-color: mediumpurple;
}

.loader span:nth-child(4) {
    background-color: limegreen;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">mix-blend-mode</span>: screen;
}

<span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">background-color</span>: gold;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">background-color</span>: dodgerblue;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">background-color</span>: hotpink;  
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">background-color</span>: mediumpurple;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">background-color</span>: limegreen;
}</code></pre><p>&#x4E3A;&#x5BB9;&#x5668;&#x6574;&#x4F53;&#x589E;&#x52A0;&#x65CB;&#x8F6C;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    animation: rotating 2s linear infinite;
}

@keyframes rotating {
    to {
        transform: rotate(1turn);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">animation</span>: rotating <span class="hljs-number">2s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> rotating {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn);
    }
}</code></pre><p>&#x4E3A;&#x5BB9;&#x5668;&#x56DB;&#x5468;&#x7684;&#x65B9;&#x5757;&#x589E;&#x52A0;&#x53CD;&#x5411;&#x65CB;&#x8F6C;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: de-rotating 4s linear infinite;
}

@keyframes de-rotating {
    from, to {
        transform: rotate(0deg) scale(0.5);
    }

    50% {
        transform: rotate(-180deg) scale(1.2);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: de-rotating <span class="hljs-number">4s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> de-rotating {
    <span class="hljs-selector-tag">from</span>, <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg) <span class="hljs-built_in">scale</span>(0.5);
    }

    50% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-180deg) <span class="hljs-built_in">scale</span>(1.2);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x5728;&#x9875;&#x9762;&#x5916;&#x90E8;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：86# 视频演示如何用纯 CSS 创作一个方块旋转动画

## 原文链接
[https://segmentfault.com/a/1190000015721771](https://segmentfault.com/a/1190000015721771)


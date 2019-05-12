---
title: '前端每日实战：90# 视频演示如何用 CSS 和 D3 创作一个无尽的六边形空间' 
date: 2018-11-21 2:30:10
hidden: true
slug: au32k54ds7m
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbekEK?w=400&amp;h=302" src="https://static.alili.tech/img/bVbekEK?w=400&amp;h=302" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/NBvrWL" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/NBvrWL</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/NBvrWL" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/czD3PhM" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/czD3PhM</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 1 &#x4E2A;&#x5185;&#x542B; 5 &#x4E2A; <code>&lt;span&gt;</code> &#x7684; <code>&lt;div&gt;</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;hexagons&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hexagons&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, gold, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, gold, black);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5706;&#x5F62;&#x7684;&#x5916;&#x5C42;&#x5BB9;&#x5668;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 20em;
    height: 20em;
    font-size: 20px;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x5728;&#x516D;&#x8FB9;&#x5F62;&#x5BB9;&#x5668;&#x4E2D;&#x753B;&#x51FA; 1 &#x4E2A;&#x77E9;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hexagons {
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hexagons span {
    position: absolute;
    width: calc(20em / 1.732);
    height: inherit;
    background-color: currentColor;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hexagons</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(20em / 1.732);
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">background-color</span>: currentColor;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x518D;&#x521B;&#x5EFA; 2 &#x4E2A;&#x76F8;&#x540C;&#x5927;&#x5C0F;&#x7684;&#x77E9;&#x5F62;&#xFF0C;&#x4E00;&#x8D77;&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x516D;&#x8FB9;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hexagons span:before,
.hexagons span:after {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: currentColor;
}

.hexagons span:before {
    transform: rotate(60deg);
}

.hexagons span:after {
    transform: rotate(-60deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:before</span>,
<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">background-color</span>: currentColor;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(60deg);
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-60deg);
}</code></pre><p>&#x8BA9;&#x516D;&#x8FB9;&#x5F62;&#x7684;&#x989C;&#x8272;&#x4EA4;&#x9519;&#x5448;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hexagons span:nth-child(odd) {
    color: gold;
}

.hexagons span:nth-child(even) {
    color: #222;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">color</span>: gold;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#222</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x53D8;&#x91CF;&#xFF0C;&#x8BA9;&#x516D;&#x8FB9;&#x5F62;&#x9010;&#x6E10;&#x7F29;&#x5C0F;&#xFF0C;&#x5C0F;&#x516D;&#x8FB9;&#x5F62;&#x91CD;&#x53E0;&#x5728;&#x5927;&#x516D;&#x8FB9;&#x5F62;&#x7684;&#x4E0A;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hexagons span {
    transform: scale(var(--scale)) ;
}

.hexagons span:nth-child(1) {
    --scale: 1;
}

.hexagons span:nth-child(2) {
    --scale: calc(1 * 0.9);
}

.hexagons span:nth-child(3) {
    --scale: calc(1 * 0.9 * 0.9);
}

.hexagons span:nth-child(4) {
    --scale: calc(1 * 0.9 * 0.9 * 0.9);
}

.hexagons span:nth-child(5) {
    --scale: calc(1 * 0.9 * 0.9 * 0.9 * 0.9);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(var(--scale)) ;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--scale</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--scale</span>: <span class="hljs-built_in">calc</span>(1 * 0.9);
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--scale</span>: <span class="hljs-built_in">calc</span>(1 * 0.9 * 0.9);
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--scale</span>: <span class="hljs-built_in">calc</span>(1 * 0.9 * 0.9 * 0.9);
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--scale</span>: <span class="hljs-built_in">calc</span>(1 * 0.9 * 0.9 * 0.9 * 0.9);
}</code></pre><p>&#x518D;&#x8BBE;&#x7F6E;&#x53D8;&#x91CF;&#xFF0C;&#x8BA9;&#x516D;&#x8FB9;&#x5F62;&#x4F9D;&#x6B21;&#x503E;&#x659C;&#x4E0D;&#x540C;&#x7684;&#x89D2;&#x5EA6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hexagons span {
    transform: scale(var(--scale)) rotate(calc(var(--n) * 6deg));
}

.hexagons span:nth-child(1) {
    --n: 1;
}

.hexagons span:nth-child(2) {
    --n: 2;
}

.hexagons span:nth-child(3) {
    --n: 3;
}

.hexagons span:nth-child(4) {
    --n: 4;
}

.hexagons span:nth-child(5) {
    --n: 5;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(var(--scale)) <span class="hljs-built_in">rotate</span>(calc(var(--n) * <span class="hljs-number">6deg</span>));
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.hexagons</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hexagons {
    animation: twist 0.5s linear infinite;
}

@keyframes twist {
    from {
        transform: rotate(0deg) scale(1);
    }

    to {
        transform: rotate(calc(6deg * -2)) scale(1.25);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hexagons</span> {
    <span class="hljs-attribute">animation</span>: twist <span class="hljs-number">0.5s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> twist {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg) <span class="hljs-built_in">scale</span>(1);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(calc(6deg * -2)) <span class="hljs-built_in">scale</span>(1.25);
    }
}</code></pre><p>&#x9690;&#x85CF;&#x5BB9;&#x5668;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6765;&#x6279;&#x91CF;&#x521B;&#x5EFA;&#x516D;&#x8FB9;&#x5F62;&#x3002;<br>&#x5F15;&#x5165; d3 &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7528; d3 &#x521B;&#x5EFA;&#x516D;&#x8FB9;&#x5F62;&#x7684; dom &#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT = 5;

d3.select(&apos;.hexagons&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT))
    .enter()
    .append(&apos;span&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COUNT = <span class="hljs-number">5</span>;

d3.select(<span class="hljs-string">&apos;.hexagons&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>);</code></pre><p>&#x7528; d3 &#x4E3A;&#x516D;&#x8FB9;&#x5F62;&#x7684; --n &#x548C; --scale &#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.hexagons&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT))
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;--scale&apos;, (d) =&gt; Math.pow(0.9, d))
    .style(&apos;--n&apos;, (d) =&gt; d + 1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.hexagons&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;--scale&apos;</span>, (d) =&gt; <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">0.9</span>, d))
    .style(<span class="hljs-string">&apos;--n&apos;</span>, (d) =&gt; d + <span class="hljs-number">1</span>);</code></pre><p>&#x5220;&#x9664;&#x6389; html &#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x516D;&#x8FB9;&#x5F62; dom &#x5143;&#x7D20;&#xFF0C;&#x548C; css &#x6587;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x516D;&#x8FB9;&#x5F62;&#x7684;&#x6570;&#x91CF;&#x6539;&#x4E3A; 100 &#x4E2A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT = 100;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> COUNT = <span class="hljs-number">100</span>;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：90# 视频演示如何用 CSS 和 D3 创作一个无尽的六边形空间

## 原文链接
[https://segmentfault.com/a/1190000015770017](https://segmentfault.com/a/1190000015770017)


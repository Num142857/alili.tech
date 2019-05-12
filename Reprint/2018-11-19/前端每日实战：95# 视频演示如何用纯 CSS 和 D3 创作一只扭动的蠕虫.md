---
title: '前端每日实战：95# 视频演示如何用纯 CSS 和 D3 创作一只扭动的蠕虫' 
date: 2018-11-19 2:32:04
hidden: true
slug: c0h1edwhmya
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeCtr?w=400&amp;h=301" src="https://static.alili.tech/img/bVbeCtr?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/QBQJMg" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/QBQJMg</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/QBQJMg" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/c9mydU8" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/c9mydU8</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 3 &#x500B;&#x5143;&#x7D20;&#xFF0C;&#x4EE3;&#x8868;&#x8815;&#x866B;&#x7684; 3 &#x4E2A;&#x4F53;&#x8282;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;worm&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;worm&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#222</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x8815;&#x866B;&#x6700;&#x5927;&#x7684;&#x4F53;&#x8282;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".worm {
    display: flex;
    align-items: center;
    justify-content: center;
}

.worm span {
    position: absolute;
    width: 90vmin;
    height: 90vmin;
    background-color: hsl(336, 100%, 19%);
    border-radius: 50%;
    border: 3px solid;
    border-color: hsl(336, 100%, 36%);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.worm</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">90vmin</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(336, 100%, 19%);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-built_in">hsl</span>(336, 100%, 36%);
}</code></pre><p>&#x5B9A;&#x4E49; css &#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".worm {
    --particles: 3;
}

.worm span:nth-child(1) {
    --n: 1;
}

.worm span:nth-child(2) {
    --n: 2;
}

.worm span:nth-child(3) {
    --n: 3;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.worm</span> {
    <span class="hljs-attribute">--particles</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x5B9A;&#x4E49;&#x4F53;&#x8282;&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x753B;&#x51FA;&#x5176;&#x4ED6;&#x4F53;&#x8282;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".worm span {
    --diameter: calc(100vmin - var(--n) * 90vmin / var(--particles));
    width: var(--diameter);
    height: var(--diameter);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">--diameter</span>: <span class="hljs-built_in">calc</span>(100vmin - var(--n) * <span class="hljs-number">90vmin</span> / <span class="hljs-built_in">var</span>(--particles));
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--diameter);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--diameter);
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x5B9A;&#x4E49;&#x4F53;&#x8282;&#x7684;&#x989C;&#x8272;&#xFF0C;&#x4F7F;&#x5B83;&#x4EEC;&#x663E;&#x5F97;&#x6709;&#x5C42;&#x6B21;&#x611F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".worm span {
    background-color: hsl(336, 100%, calc((19 + var(--n) * 3) * 1%));
    border-color: hsl(336, 100%, calc((36 + var(--n) * 1) * 1%));
    box-shadow: 0 0 33px rgba(0, 0, 0, 0.3);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(336, 100%, calc((19 + var(--n) * <span class="hljs-number">3</span>) * <span class="hljs-number">1%</span>));
    <span class="hljs-attribute">border-color</span>: <span class="hljs-built_in">hsl</span>(336, 100%, calc((36 + var(--n) * <span class="hljs-number">1</span>) * <span class="hljs-number">1%</span>));
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">33px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
}</code></pre><p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".worm span {
    animation: rotating 4s infinite cubic-bezier(0.6, -0.5, 0.3, 1.5);
}

@keyframes rotating {
    from {
        transform-origin: 0%;
    }

    to {
        transform: rotate(1turn);
        transform-origin: 0% 50%;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: rotating <span class="hljs-number">4s</span> infinite <span class="hljs-built_in">cubic-bezier</span>(0.6, -0.5, 0.3, 1.5);
}

@<span class="hljs-keyword">keyframes</span> rotating {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0%</span>;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn);
        <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0%</span> <span class="hljs-number">50%</span>;
    }
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".worm span {
    animation-delay: calc(1s - var(--n) * 100ms);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.worm</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(1s - var(--n) * <span class="hljs-number">100ms</span>);
}</code></pre><p>&#x9690;&#x85CF;&#x9875;&#x9762;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6279;&#x91CF;&#x5904;&#x7406; dom &#x5143;&#x7D20;&#x3002;<br>&#x5F15;&#x5165; d3 &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7528; d3 &#x4E3A; --particles &#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_PARTICLES = 3;

d3.select(&apos;.worm&apos;)
    .style(&apos;--particles&apos;, COUNT_OF_PARTICLES);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COUNT_OF_PARTICLES = <span class="hljs-number">3</span>;

d3.select(<span class="hljs-string">&apos;.worm&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles&apos;</span>, COUNT_OF_PARTICLES);</code></pre><p>&#x7528; d3 &#x521B;&#x5EFA; dom &#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.worm&apos;)
    .style(&apos;--particles&apos;, COUNT_OF_PARTICLES)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(&apos;span&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.worm&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles&apos;</span>, COUNT_OF_PARTICLES)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>);</code></pre><p>&#x7528; d3 &#x4E3A; dom &#x5143;&#x7D20;&#x7684; --n &#x5C5E;&#x6027;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.worm&apos;)
    .style(&apos;--particles&apos;, COUNT_OF_PARTICLES)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;--n&apos;, (d) =&gt; d + 1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.worm&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles&apos;</span>, COUNT_OF_PARTICLES)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;--n&apos;</span>, (d) =&gt; d + <span class="hljs-number">1</span>);</code></pre><p>&#x5220;&#x9664;&#x6389; html &#x6587;&#x4EF6;&#x4E2D;&#x58F0;&#x660E; dom &#x5143;&#x7D20;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5220;&#x9664;&#x6389; css &#x6587;&#x4EF6;&#x4E2D;&#x58F0;&#x660E; --particles &#x548C; --n &#x53D8;&#x91CF;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x628A; dom &#x5143;&#x7D20;&#x6570;&#x8BBE;&#x7F6E;&#x4E3A; 12 &#x4E2A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_PARTICLES = 12;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> COUNT_OF_PARTICLES = <span class="hljs-number">12</span>;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：95# 视频演示如何用纯 CSS 和 D3 创作一只扭动的蠕虫

## 原文链接
[https://segmentfault.com/a/1190000015838476](https://segmentfault.com/a/1190000015838476)


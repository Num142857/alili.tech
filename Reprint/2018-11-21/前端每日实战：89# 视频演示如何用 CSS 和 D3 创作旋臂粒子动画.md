---
title: '前端每日实战：89# 视频演示如何用 CSS 和 D3 创作旋臂粒子动画' 
date: 2018-11-21 2:30:10
hidden: true
slug: 340bvd96ke4
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbegVG?w=400&amp;h=300" src="https://static.alili.tech/img/bVbegVG?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/xJrOqd" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/xJrOqd</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/xJrOqd" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cr6Vetm" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cr6Vetm</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 6 &#x4E2A; &#x5185;&#x542B; <code>&lt;span&gt;</code> &#x7684; <code>&lt;div&gt;</code> &#x5143;&#x7D20;&#xFF0C;&#x6BCF;&#x4E2A; <code>&lt;div&gt;</code> &#x5143;&#x7D20;&#x4EE3;&#x8868; 1 &#x4E2A;&#x7C92;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;section class=&quot;container&quot;&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
&lt;/section&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
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
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 70vmin;
    height: 70vmin;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">70vmin</span>;
}</code></pre><p>&#x5728;&#x5BB9;&#x5668;&#x4E2D;&#x5B9A;&#x4F4D; <code>&lt;div&gt;</code>&#xFF0C;&#x5E76;&#x5728; <code>&lt;div&gt;</code> &#x4E2D;&#x7528; <code>&lt;span&gt;</code> &#x753B;&#x51FA;&#x7C92;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container div {
    position: absolute;
    width: 10vmin;
    height: 10vmin;
}

.container div span {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-color: limegreen;
    transform: translateX(300%);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10vmin</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: limegreen;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(300%);
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x5B9A;&#x4E49;&#x7C92;&#x5B50;&#x7684;&#x65CB;&#x8F6C;&#x89D2;&#x5EA6;&#xFF0C;&#x5176;&#x4E2D; --particles-per-circle &#x6BCF;&#x5708;&#x7684;&#x7C92;&#x5B50;&#x6570;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x5708;&#x6709; 3 &#x4E2A;&#x7C92;&#x5B50;&#xFF0C;&#x6240;&#x4EE5;&#x5708;&#x4E2D;&#x6709; 3 &#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x6BCF;&#x4E2A;&#x4F4D;&#x7F6E;&#x6709; 2 &#x4E2A;&#x7C92;&#x5B50;&#x91CD;&#x53E0;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x6B64;&#x65F6;&#x770B;&#x8D77;&#x6765;&#x662F;&#x53EA;&#x6709; 3 &#x4E2A;&#x7C92;&#x5B50;&#x7684;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    --particles-per-circle: 3;
}

.container div {
    transform: rotate(calc(var(--n) / var(--particles-per-circle) * -360deg));
}

.container div:nth-child(1) {
    --n: 1;
}

.container div:nth-child(2) {
    --n: 2;
}

.container div:nth-child(3) {
    --n: 3;
}

.container div:nth-child(4) {
    --n: 4;
}

.container div:nth-child(5) {
    --n: 5;
}

.container div:nth-child(6) {
    --n: 6;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">--particles-per-circle</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(calc(var(--n) / <span class="hljs-built_in">var</span>(--particles-per-circle) * -<span class="hljs-number">360deg</span>));
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x7C92;&#x5B50;&#x4ECE;&#x4E2D;&#x5FC3;&#x5411;&#x5916;&#x4FA7;&#x7684;&#x8FD0;&#x52A8;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container div span {
    animation: move 2s linear infinite;
}

@keyframes move {
    from {
        transform: translateX(0) scale(0);
    }

    70% {
        transform: translateX(210%) scale(0.55);
    }

    to {
        transform: translateX(300%) scale(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: move <span class="hljs-number">2s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> move {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">scale</span>(0);
    }

    70% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(210%) <span class="hljs-built_in">scale</span>(0.55);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(300%) <span class="hljs-built_in">scale</span>(0);
    }
}</code></pre><p>&#x518D;&#x589E;&#x52A0;&#x8FD0;&#x52A8;&#x65F6;&#x8BA9;&#x7C92;&#x5B50;&#x53D8;&#x8272;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6CBF;&#x8272;&#x76F8;&#x73AF;&#x53D6;&#x4E86; 10 &#x4E2A;&#x989C;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container div span {
    animation: 
        move 2s linear infinite,
        change-color 2s linear infinite;
}

@keyframes change-color {
    0%, 100% {
        background-color: hsl(calc(0 / 100 * 360deg), 80%, 55%);
    }

    10% {
        background-color: hsl(calc(10 / 100 * 360deg), 80%, 55%);
    }

    20% {
        background-color: hsl(calc(20 / 100 * 360deg), 80%, 55%);
    }

    30% {
        background-color: hsl(calc(30 / 100 * 360deg), 80%, 55%);
    }

    40% {
        background-color: hsl(calc(40 / 100 * 360deg), 80%, 55%);
    }

    50% {
        background-color: hsl(calc(50 / 100 * 360deg), 80%, 55%);
    }

    60% {
        background-color: hsl(calc(60 / 100 * 360deg), 80%, 55%);
    }

    70% {
        background-color: hsl(calc(70 / 100 * 360deg), 80%, 55%);
    }

    80% {
        background-color: hsl(calc(80 / 100 * 360deg), 80%, 55%);
    }

    90% {
        background-color: hsl(calc(90 / 100 * 360deg), 80%, 55%);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: 
        move <span class="hljs-number">2s</span> linear infinite,
        change-color <span class="hljs-number">2s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> change-color {
    0%, 100% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(0 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    10% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(10 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    20% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(20 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    30% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(30 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    40% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(40 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    50% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(50 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    60% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(60 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    70% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(70 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    80% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(80 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }

    90% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(calc(90 / 100 * 360deg), <span class="hljs-number">80%</span>, <span class="hljs-number">55%</span>);
    }
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x770B;&#x5230; 6 &#x4E2A;&#x7C92;&#x5B50;&#x9646;&#x7EED;&#x51FA;&#x73B0;&#x4E86;&#x3002;&#x5176;&#x4E2D; --circles &#x8868;&#x793A;&#x5708;&#x6570;&#xFF1B;--particles &#x8868;&#x793A;&#x7C92;&#x5B50;&#x6570;&#xFF0C;&#x5B83;&#x7B49;&#x4E8E;&#x6BCF;&#x5708;&#x7684;&#x7C92;&#x5B50;&#x6570;&#x4E0E;&#x5708;&#x6570;&#x7684;&#x79EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    --circles: 2;
    --particles: calc(var(--particles-per-circle) * var(--circles));
}

.container div span {
    animation-delay: calc(var(--n) / var(--particles) * -2s);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">--circles</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">--particles</span>: <span class="hljs-built_in">calc</span>(var(--particles-per-circle) * <span class="hljs-built_in">var</span>(--circles));
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(var(--n) / <span class="hljs-built_in">var</span>(--particles) * -<span class="hljs-number">2s</span>);
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6765;&#x6279;&#x91CF;&#x521B;&#x5EFA;&#x7C92;&#x5B50;&#x3002;<br>&#x5F15;&#x5165; d3 &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7528; d3 &#x4E3A; css &#x7684; --particles-per-circle &#x548C; --circles &#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PARTICLES_PER_CIRCLE = 3;
const CIRCLES = 2;

d3.select(&apos;.container&apos;)
    .style(&apos;--particles-per-circle&apos;, PARTICLES_PER_CIRCLE)
    .style(&apos;--circles&apos;, CIRCLES);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PARTICLES_PER_CIRCLE = <span class="hljs-number">3</span>;
<span class="hljs-keyword">const</span> CIRCLES = <span class="hljs-number">2</span>;

d3.select(<span class="hljs-string">&apos;.container&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles-per-circle&apos;</span>, PARTICLES_PER_CIRCLE)
    .style(<span class="hljs-string">&apos;--circles&apos;</span>, CIRCLES);</code></pre><p>&#x7528; d3 &#x521B;&#x5EFA;&#x7C92;&#x5B50; dom &#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_PARTICLES = PARTICLES_PER_CIRCLE * CIRCLES;

d3.select(&apos;.container&apos;)
    .style(&apos;--particles-per-circle&apos;, PARTICLES_PER_CIRCLE)
    .style(&apos;--circles&apos;, CIRCLES)
    .selectAll(&apos;div&apos;)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(&apos;div&apos;)
    .append(&apos;span&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COUNT_OF_PARTICLES = PARTICLES_PER_CIRCLE * CIRCLES;

d3.select(<span class="hljs-string">&apos;.container&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles-per-circle&apos;</span>, PARTICLES_PER_CIRCLE)
    .style(<span class="hljs-string">&apos;--circles&apos;</span>, CIRCLES)
    .selectAll(<span class="hljs-string">&apos;div&apos;</span>)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(<span class="hljs-string">&apos;div&apos;</span>)
    .append(<span class="hljs-string">&apos;span&apos;</span>);</code></pre><p>&#x7528; d3 &#x4E3A;&#x7C92;&#x5B50;&#x5143;&#x7D20;&#x7684; --n &#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.container&apos;)
    .style(&apos;--particles-per-circle&apos;, PARTICLES_PER_CIRCLE)
    .style(&apos;--circles&apos;, CIRCLES)
    .selectAll(&apos;div&apos;)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(&apos;div&apos;)
    .style(&apos;--n&apos;, (d) =&gt; d + 1)
    .append(&apos;span&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.container&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles-per-circle&apos;</span>, PARTICLES_PER_CIRCLE)
    .style(<span class="hljs-string">&apos;--circles&apos;</span>, CIRCLES)
    .selectAll(<span class="hljs-string">&apos;div&apos;</span>)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(<span class="hljs-string">&apos;div&apos;</span>)
    .style(<span class="hljs-string">&apos;--n&apos;</span>, (d) =&gt; d + <span class="hljs-number">1</span>)
    .append(<span class="hljs-string">&apos;span&apos;</span>);</code></pre><p>&#x5220;&#x9664;&#x6389; dom &#x4E2D;&#x7684;&#x7C92;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x4EE5;&#x53CA;&#x7528; css &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x8C03;&#x6574;&#x6BCF;&#x5708;&#x7684;&#x7C92;&#x5B50;&#x6570;&#x548C;&#x5708;&#x6570;&#xFF0C;&#x5F62;&#x6210;&#x65CB;&#x81C2;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PARTICLES_PER_CIRCLE = 14;
const CIRCLES = 4;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PARTICLES_PER_CIRCLE = <span class="hljs-number">14</span>;
<span class="hljs-keyword">const</span> CIRCLES = <span class="hljs-number">4</span>;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：89# 视频演示如何用 CSS 和 D3 创作旋臂粒子动画

## 原文链接
[https://segmentfault.com/a/1190000015755660](https://segmentfault.com/a/1190000015755660)


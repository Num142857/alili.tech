---
title: '前端每日实战：81# 视频演示如何用纯 CSS 创作一个变色旋转动画' 
date: 2018-11-22 11:48:10
hidden: true
slug: qduk2r7hz6
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdQPp?w=400&amp;h=302" src="https://static.alili.tech/img/bVbdQPp?w=400&amp;h=302" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/ejZWKL" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/ejZWKL</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/ejZWKL" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cawq6cB" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cawq6cB</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 9 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
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
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 30em;
    height: 30em;
    font-size: 12px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x4E2D;&#x7EBF;&#x6761;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    color: lime;
}

.container span {
    position: absolute;
    width: 5em;
    height: 5em;
    border-style: solid;
    border-width: 1em 1em 0 0;
    border-color: currentColor transparent;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">color</span>: lime;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">1em</span> <span class="hljs-number">1em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-color</span>: currentColor transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x8BA9;&#x7EBF;&#x6761;&#x5728;&#x5BB9;&#x5668;&#x4E2D;&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: flex;
    align-items: center;
    justify-content: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre><p>&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#xFF0C;&#x4F7F;&#x7EBF;&#x6761;&#x4ECE;&#x4E2D;&#x5FC3;&#x5411;&#x5916;&#x4FA7;&#x9010;&#x6E10;&#x5EF6;&#x4F38;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container span {
    --diameter: calc(5em + (var(--n) - 1) * 3em);
    width: var(--diameter);
    height: var(--diameter);
}

.container span:nth-child(1) {
    --n: 1;
}

.container span:nth-child(2) {
    --n: 2;
}

.container span:nth-child(3) {
    --n: 3;
}

.container span:nth-child(4) {
    --n: 4;
}

.container span:nth-child(5) {
    --n: 5;
}

.container span:nth-child(6) {
    --n: 6;
}

.container span:nth-child(7) {
    --n: 7;
}

.container span:nth-child(8) {
    --n: 8;
}

.container span:nth-child(9) {
    --n: 9;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">--diameter</span>: <span class="hljs-built_in">calc</span>(5em + (var(--n) - <span class="hljs-number">1</span>) * <span class="hljs-number">3em</span>);
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--diameter);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--diameter);
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">7</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">8</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(9)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">9</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x8BA9;&#x7EBF;&#x6761;&#x65CB;&#x8F6C;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container span {
    animation: rotating linear infinite;
    animation-duration: calc(5s / (9 - var(--n) + 1));
}

@keyframes rotating {
    to {
        transform: rotate(1turn);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: rotating linear infinite;
    <span class="hljs-attribute">animation-duration</span>: <span class="hljs-built_in">calc</span>(5s / (9 - var(--n) + <span class="hljs-number">1</span>));
}

@<span class="hljs-keyword">keyframes</span> rotating {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn);
    }
}</code></pre><p>&#x5B9A;&#x4E49;&#x6539;&#x53D8;&#x989C;&#x8272;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x4EE5;&#x8272;&#x76F8;&#x73AF;&#x4E00;&#x5468; 360 &#x5EA6;&#x4E3A; 100%&#xFF0C;--percent &#x53D8;&#x91CF;&#x662F;&#x6307;&#x4F4D;&#x4E8E;&#x8FD9;&#x4E2A; 100% &#x7684;&#x54EA;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes change-color {
    0%, 100% {
        --percent: 0;
    }

    10% {
        --percent: 10;
    }

    20% {
        --percent: 20;
    }

    30% {
        --percent: 30;
    }

    40% {
        --percent: 40;
    }

    50% {
        --percent: 50;
    }

    60% {
        --percent: 60;
    }

    70% {
        --percent: 70;
    }

    80% {
        --percent: 80;
    }

    90% {
        --percent: 90;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> change-color {
    0%, 100% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">0</span>;
    }

    10% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">10</span>;
    }

    20% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">20</span>;
    }

    30% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">30</span>;
    }

    40% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">40</span>;
    }

    50% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">50</span>;
    }

    60% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">60</span>;
    }

    70% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">70</span>;
    }

    80% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">80</span>;
    }

    90% {
        <span class="hljs-attribute">--percent</span>: <span class="hljs-number">90</span>;
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x6539;&#x53D8;&#x989C;&#x8272;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#x5E94;&#x7528;&#x5230;&#x5BB9;&#x5668;&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    --deg: calc(var(--percent) / 100 * 360deg);
    color: hsl(var(--deg), 100%, 50%);
    animation: change-color 5s linear infinite;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">--deg</span>: <span class="hljs-built_in">calc</span>(var(--percent) / <span class="hljs-number">100</span> * <span class="hljs-number">360deg</span>);
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">hsl</span>(var(--deg), <span class="hljs-number">100%</span>, <span class="hljs-number">50%</span>);
    <span class="hljs-attribute">animation</span>: change-color <span class="hljs-number">5s</span> linear infinite;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：81# 视频演示如何用纯 CSS 创作一个变色旋转动画

## 原文链接
[https://segmentfault.com/a/1190000015655171](https://segmentfault.com/a/1190000015655171)


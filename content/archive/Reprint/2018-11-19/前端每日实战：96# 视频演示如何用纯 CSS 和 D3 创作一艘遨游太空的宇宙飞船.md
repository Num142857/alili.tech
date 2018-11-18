---
title: '前端每日实战：96# 视频演示如何用纯 CSS 和 D3 创作一艘遨游太空的宇宙飞船' 
date: 2018-11-19 2:30:10
hidden: true
slug: qsc0xou170m
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeGrB?w=400&amp;h=301" src="https://static.alili.tech/img/bVbeGrB?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/oMqNmv" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/oMqNmv</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/oMqNmv" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cm48rta" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cm48rta</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;<code>spacecraft</code> &#x8868;&#x793A;&#x98DE;&#x8239;&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 1 &#x4E2A;&#x8868;&#x793A;&#x5C3E;&#x5180;&#x7684;&#x5143;&#x7D20; <code>fins</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;spacecraft&quot;&gt;
    &lt;div class=&quot;fins&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;spacecraft&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fins&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(black, midnightblue);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(black, midnightblue);
}</code></pre><p>&#x753B;&#x51FA;&#x98DE;&#x8239;&#x7684;&#x8239;&#x8231;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".spacecraft {
    width: 7em;
    height: 11em;
    font-size: 16px;
    background: 
        linear-gradient(whitesmoke, darkgray);
    border-radius: 50% / 70% 70% 5% 5%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.spacecraft</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">11em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">linear-gradient</span>(whitesmoke, darkgray);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> / <span class="hljs-number">70%</span> <span class="hljs-number">70%</span> <span class="hljs-number">5%</span> <span class="hljs-number">5%</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x98DE;&#x8239;&#x5C3E;&#x90E8;&#x7684;&#x706B;&#x7130;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".spacecraft::before {
    content: &apos;&apos;;
    position: absolute;
    width: 6em;
    height: 2em;
    background-color: #444;
    border-radius: 20%;
    top: 10em;
    left: 0.5em;
    z-index: -1;
}

.spacecraft::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 4em;
    height: 4em;
    background: gold;
    top: 10em;
    left: 1.5em;
    border-radius: 80% 0 50% 45% / 50% 0 80% 45%;
    transform: rotate(135deg);
    border: 0.5em solid orange;
    z-index: -2;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.spacecraft</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#444</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">20%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.spacecraft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background</span>: gold;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">80%</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">45%</span> / <span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">80%</span> <span class="hljs-number">45%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(135deg);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.5em</span> solid orange;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">2</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x98DE;&#x8239;&#x4E24;&#x4FA7;&#x7684;&#x5C3E;&#x5180;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fins::before,
.fins::after {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 6em;
    background: linear-gradient(tomato, darkred);
    top: 7em;
}

.fins::before {
    left: -2em;
    border-radius: 3em 0 50% 100%;
}

.fins::after {
    right: -2em;
    border-radius: 0 3em 100% 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fins</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.fins</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(tomato, darkred);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">7em</span>;
}

<span class="hljs-selector-class">.fins</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3em</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.fins</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">3em</span> <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;
}</code></pre><p>&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x98DE;&#x8239;&#x7684;&#x8237;&#x7A97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".spacecraft {
    background: 
        radial-gradient(
            circle at 3.5em 5em,
            transparent 1.5em,
            lightslategray 1.5em, lightslategray 2em,
            transparent 2em
        ),
        radial-gradient(
            circle at 3.3em 5.2em,
            deepskyblue 1.4em,
            transparent 1.6em
        ),
        radial-gradient(
            circle at 3.5em 5em,
            white 1.5em,
            transparent 1.5em
        ),
        linear-gradient(whitesmoke, darkgray);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.spacecraft</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 3.5em 5em,
            transparent 1.5em,
            lightslategray 1.5em, lightslategray 2em,
            transparent 2em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 3.3em 5.2em,
            deepskyblue 1.4em,
            transparent 1.6em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 3.5em 5em,
            white 1.5em,
            transparent 1.5em
        ),
        <span class="hljs-built_in">linear-gradient</span>(whitesmoke, darkgray);
}</code></pre><p>&#x589E;&#x52A0;&#x98DE;&#x8239;&#x706B;&#x7130;&#x55B7;&#x5C04;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".spacecraft::after {
    animation: flame-spout 0.3s infinite;
}

@keyframes flame-spout {
    0%, 100% {
        filter: opacity(0.1);
    }

    50% {
        filter: opacity(1);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.spacecraft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: flame-spout <span class="hljs-number">0.3s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> flame-spout {
    0%, 100% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.1);
    }

    50% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x753B;&#x661F;&#x7A7A;&#x3002;<br>&#x5728; dom &#x4E2D;&#x589E;&#x52A0; <code>stars</code> &#x5BB9;&#x5668;&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x8868;&#x793A;&#x661F;&#x661F;&#x7684; 4 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stars&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;div class=&quot;rocket&quot;&gt;
    &lt;div class=&quot;fins&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stars&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rocket&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fins&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5B9A;&#x4E49;&#x661F;&#x661F;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stars span {
    position: absolute;
    width: 2px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    top: calc(50% - 7em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(50% - 7em);
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x4F7F;&#x661F;&#x661F;&#x5206;&#x5E03;&#x5728;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x7684;&#x4E0D;&#x540C;&#x4F4D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stars span {
    left: calc(var(--left) * 1vw);
}

.stars span:nth-child(1) {
    --left: 20;
}

.stars span:nth-child(2) {
    --left: 40;
}

.stars span:nth-child(3) {
    --left: 60;
}

.stars span:nth-child(4) {
    --left: 80;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(var(--left) * <span class="hljs-number">1vw</span>);
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--left</span>: <span class="hljs-number">20</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--left</span>: <span class="hljs-number">40</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--left</span>: <span class="hljs-number">60</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--left</span>: <span class="hljs-number">80</span>;
}
</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x661F;&#x661F;&#x7684;&#x5C3A;&#x5BF8;&#x548C;&#x4E0D;&#x900F;&#x660E;&#x5EA6;&#xFF0C;&#x4F7F;&#x6BCF;&#x9897;&#x661F;&#x661F;&#x770B;&#x8D77;&#x6765;&#x7A0D;&#x6709;&#x5DEE;&#x5F02;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stars span {
    width: calc(var(--size) * 1px);
    height: calc(var(--size) * 4px);
    filter: opacity(var(--opacity));
}

.stars span:nth-child(1) {
    --size: 0.8;
    --opacity: 0.5;
}

.stars span:nth-child(2) {
    --size: 1.25;
    --opacity: 0.6;
}

.stars span:nth-child(3) {
    --size: 1.5;
    --opacity: 0.7;
}

.stars span:nth-child(4) {
    --size: 2;
    --opacity: 0.8;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--size) * <span class="hljs-number">1px</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(var(--size) * <span class="hljs-number">4px</span>);
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(var(--opacity));
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--size</span>: <span class="hljs-number">0.8</span>;
    <span class="hljs-attribute">--opacity</span>: <span class="hljs-number">0.5</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--size</span>: <span class="hljs-number">1.25</span>;
    <span class="hljs-attribute">--opacity</span>: <span class="hljs-number">0.6</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--size</span>: <span class="hljs-number">1.5</span>;
    <span class="hljs-attribute">--opacity</span>: <span class="hljs-number">0.7</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--size</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">--opacity</span>: <span class="hljs-number">0.8</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x661F;&#x661F;&#x4ECE;&#x592A;&#x7A7A;&#x4E2D;&#x98D8;&#x8FC7;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stars span {
    top: -5vh;
    animation: star-move linear infinite;
}

@keyframes star-move {
    to {
        top: 100vh;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">5vh</span>;
    <span class="hljs-attribute">animation</span>: star-move linear infinite;
}

@<span class="hljs-keyword">keyframes</span> star-move {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100vh</span>;
    }
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x7684;&#x65F6;&#x957F;&#x548C;&#x5EF6;&#x65F6;&#x65F6;&#x95F4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stars span {
    animation-duration: calc(var(--duration) * 1s);
    animation-delay: calc(var(--delay) * 1s);
}

.stars span:nth-child(1) {
    --duration: 1;
    --delay: -0.05;
}

.stars span:nth-child(2) {
    --duration: 1.5;
    --delay: -0.1;
}

.stars span:nth-child(3) {
    --duration: 2;
    --delay: -0.15;
}

.stars span:nth-child(4) {
    --duration: 2.5;
    --delay: -0.2;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-duration</span>: <span class="hljs-built_in">calc</span>(var(--duration) * <span class="hljs-number">1s</span>);
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(var(--delay) * <span class="hljs-number">1s</span>);
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--duration</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">--delay</span>: -<span class="hljs-number">0.05</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--duration</span>: <span class="hljs-number">1.5</span>;
    <span class="hljs-attribute">--delay</span>: -<span class="hljs-number">0.1</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--duration</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">--delay</span>: -<span class="hljs-number">0.15</span>;
}

<span class="hljs-selector-class">.stars</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--duration</span>: <span class="hljs-number">2.5</span>;
    <span class="hljs-attribute">--delay</span>: -<span class="hljs-number">0.2</span>;
}</code></pre><p>&#x9690;&#x85CF;&#x5C4F;&#x5E55;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6279;&#x91CF;&#x5904;&#x7406;&#x8868;&#x793A;&#x661F;&#x661F;&#x7684; dom &#x5143;&#x7D20;&#x548C; css &#x53D8;&#x91CF;&#x3002;<br>&#x5F15;&#x5165; d3 &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7528; d3 &#x521B;&#x5EFA;&#x8868;&#x793A;&#x661F;&#x661F;&#x7684; dom &#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_STARS = 4;

d3.select(&apos;.stars&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_STARS))
    .enter()
    .append(&apos;span&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COUNT_OF_STARS = <span class="hljs-number">4</span>;

d3.select(<span class="hljs-string">&apos;.stars&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_STARS))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>);</code></pre><p>&#x7528; d3 &#x4E3A; css &#x53D8;&#x91CF; <code>--left</code>, <code>--size</code>, <code>--opacity</code> &#x8D4B;&#x503C;&#xFF0C;<code>--left</code> &#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#x662F; 1 &#x5230; 100&#xFF0C;<code>--size</code> &#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#x662F; 1 &#x5230; 2.5&#xFF0C;&apos;--opacity&apos; &#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#x662F; 0.5 &#x5230; 0.8&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.stars&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_STARS))
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;--left&apos;, () =&gt; Math.ceil(Math.random() * 100))
    .style(&apos;--size&apos;, () =&gt; Math.random() * 1.5 + 1)
    .style(&apos;--opacity&apos;, () =&gt; Math.random() * 0.3 + 0.5);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.stars&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_STARS))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;--left&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">100</span>))
    .style(<span class="hljs-string">&apos;--size&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1.5</span> + <span class="hljs-number">1</span>)
    .style(<span class="hljs-string">&apos;--opacity&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">0.3</span> + <span class="hljs-number">0.5</span>);</code></pre><p>&#x7528; d3 &#x4E3A; css &#x53D8;&#x91CF; <code>--duration</code> &#x548C; <code>--delay</code> &#x8D4B;&#x503C;&#xFF0C;<code>--duration</code> &#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#x662F; 1 &#x5230; 3&#xFF0C;<code>--delay</code> &#x7684;&#x53D6;&#x503C;&#x662F;&#x4F9D;&#x6B21;&#x51CF;&#x5C11; 0.05&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.stars&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_STARS))
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;--left&apos;, () =&gt; Math.ceil(Math.random() * 100))
    .style(&apos;--size&apos;, () =&gt; Math.random() * 1.5 + 1)
    .style(&apos;--opacity&apos;, () =&gt; Math.random() * 0.3 + 0.5)
    .style(&apos;--duration&apos;, () =&gt; Math.random() * 2 + 1)
    .style(&apos;--delay&apos;, (d) =&gt; d * -0.05);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.stars&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_STARS))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;--left&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">100</span>))
    .style(<span class="hljs-string">&apos;--size&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1.5</span> + <span class="hljs-number">1</span>)
    .style(<span class="hljs-string">&apos;--opacity&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">0.3</span> + <span class="hljs-number">0.5</span>)
    .style(<span class="hljs-string">&apos;--duration&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2</span> + <span class="hljs-number">1</span>)
    .style(<span class="hljs-string">&apos;--delay&apos;</span>, (d) =&gt; d * <span class="hljs-number">-0.05</span>);</code></pre><p>&#x522A;&#x9664;&#x6389; html &#x6587;&#x4EF6;&#x4E2D;&#x76F8;&#x5173;&#x7684; dom &#x58F0;&#x660E;&#x548C; css &#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x661F;&#x661F;&#x7684;&#x6570;&#x91CF;&#x589E;&#x52A0;&#x5230; 30 &#x9897;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_STARS = 30;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> COUNT_OF_STARS = <span class="hljs-number">30</span>;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：96# 视频演示如何用纯 CSS 和 D3 创作一艘遨游太空的宇宙飞船

## 原文链接
[https://segmentfault.com/a/1190000015853738](https://segmentfault.com/a/1190000015853738)


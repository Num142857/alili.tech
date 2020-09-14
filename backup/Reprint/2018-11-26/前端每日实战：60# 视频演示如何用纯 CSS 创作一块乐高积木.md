---
title: '前端每日实战：60# 视频演示如何用纯 CSS 创作一块乐高积木' 
date: 2018-11-26 2:30:10
hidden: true
slug: xncww46manq
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcEtZ?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcEtZ?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/qKKqrv" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qKKqrv</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qKKqrv" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cWm3Vub" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cWm3Vub</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x4E00;&#x7EC4; 3 &#x4E2A;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;brick&quot;&gt;
    &lt;div class=&quot;sides&quot;&gt;
        &lt;span class=&apos;front&apos;&gt;&lt;/span&gt;
        &lt;span class=&apos;right&apos;&gt;&lt;/span&gt;
        &lt;span class=&quot;top&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;brick&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sides&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;front&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;right&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;top&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, white, skyblue);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, white, skyblue);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".brick {
    width: 40em;
    height: 30em;
    font-size: 10px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.brick</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x79EF;&#x6728;&#x7684;&#x6B63;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".brick {
    position: relative;
}

.sides .front {
    position: absolute;
    width: 9em;
    height: 6.8em;
    background-color: #237fbd;
    top: 19em;
    left: 7em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.brick</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.sides</span> <span class="hljs-selector-class">.front</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">9em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6.8em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#237fbd</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">19em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">7em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x79EF;&#x6728;&#x7684;&#x53F3;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sides &gt; * {
    position: absolute;
    background-color: #237fbd;
}

.sides .right {
    width: 18em;
    height: 6.8em;
    filter: brightness(0.8);
    top: 19em;
    left: calc(7em + 9em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sides</span> &gt; * {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#237fbd</span>;
}

<span class="hljs-selector-class">.sides</span> <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6.8em</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">brightness</span>(0.8);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">19em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(7em + 9em);
}</code></pre><p>&#x753B;&#x51FA;&#x79EF;&#x6728;&#x7684;&#x9876;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sides .top {
    width: 18em;
    height: 10.4em;
    filter: brightness(1.2);
    top: calc(19em - 10.4em);
    left: calc(7em + 9em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sides</span> <span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10.4em</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">brightness</span>(1.2);
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(19em - 10.4em);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(7em + 9em);
}</code></pre><p>&#x628A;&#x4EE5;&#x4E0A; 3 &#x4E2A;&#x9762;&#x7EC4;&#x5408;&#x6210;&#x7ACB;&#x65B9;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sides .front {
    transform-origin: right;
    transform: skewY(30deg);
}

.sides .right {
    transform-origin: left;
    transform: skewY(-30deg);
}

.sides .top {
    transform-origin: left bottom;
    transform: rotate(-60deg) skewY(30deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sides</span> <span class="hljs-selector-class">.front</span> {
    <span class="hljs-attribute">transform-origin</span>: right;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skewY</span>(30deg);
}

<span class="hljs-selector-class">.sides</span> <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">transform-origin</span>: left;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skewY</span>(-30deg);
}

<span class="hljs-selector-class">.sides</span> <span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">transform-origin</span>: left bottom;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-60deg) <span class="hljs-built_in">skewY</span>(30deg);
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x753B;&#x79EF;&#x6728;&#x7684;&#x51F8;&#x7C92;&#x3002;</p><p>&#x5728; dom &#x4E2D;&#x589E;&#x52A0; 8 &#x4E2A;&#x51F8;&#x7C92;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;brick&quot;&gt;
    &lt;div class=&quot;sides&quot;&gt;
        &lt;span class=&apos;front&apos;&gt;&lt;/span&gt;
        &lt;span class=&apos;right&apos;&gt;&lt;/span&gt;
        &lt;span class=&quot;top&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;studs&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;brick&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sides&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;front&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;right&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;top&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;studs&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".studs span:nth-child(1) {
    --n: 1;
}

.studs span:nth-child(3) {
    --n: 3;
}

.studs span:nth-child(5) {
    --n: 5;
}

.studs span:nth-child(7) {
    --n: 7;
}

.studs span:nth-child(2) {
    --n: 2;
}

.studs span:nth-child(4) {
    --n: 4;
}

.studs span:nth-child(6) {
    --n: 6;
}

.studs span:nth-child(8) {
    --n: 8;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">7</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
}

<span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">8</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5DE6;&#x4FA7;&#x7684;&#x51F8;&#x7C92;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".studs span:nth-child(odd) {
    top: calc(4.6em + (var(--n) - 1) / 2 * 2.6em);
    left: calc(23.3em - (var(--n) - 1) / 2 * 4.6em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(4.6em + (var(--n) - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span> * <span class="hljs-number">2.6em</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(23.3em - (var(--n) - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span> * <span class="hljs-number">4.6em</span>);
}</code></pre><p>&#x753B;&#x51FA;&#x53F3;&#x4FA7;&#x7684;&#x51F8;&#x7C92;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".studs span:nth-child(even) {
    top: calc(6.9em + (var(--n) - 2) / 2 * 2.6em);
    left: calc(27.9em - (var(--n) - 2) / 2 * 4.6em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(6.9em + (var(--n) - <span class="hljs-number">2</span>) / <span class="hljs-number">2</span> * <span class="hljs-number">2.6em</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(27.9em - (var(--n) - <span class="hljs-number">2</span>) / <span class="hljs-number">2</span> * <span class="hljs-number">4.6em</span>);
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x753B;&#x51FA;&#x51F8;&#x7C92;&#x7684;&#x9876;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".studs span::before {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: 2em;
    background-color: #4cb7ff;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.studs</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4cb7ff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：60# 视频演示如何用纯 CSS 创作一块乐高积木

## 原文链接
[https://segmentfault.com/a/1190000015369542](https://segmentfault.com/a/1190000015369542)


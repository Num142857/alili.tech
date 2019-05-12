---
title: '前端每日实战：64# 视频演示如何用纯 CSS 绘制一个足球场' 
date: 2018-11-26 2:30:09
hidden: true
slug: mj8a2d1xv1m
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcPd9?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcPd9?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/BVqXwJ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/BVqXwJ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/BVqXwJ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cKbw4Tg" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cKbw4Tg</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x573A;&#x5730;&#xFF0C;&#x573A;&#x5730;&#x4E2D;&#x518D;&#x5305;&#x542B;&#x4E2D;&#x7EBF;&#x3001;&#x4E2D;&#x70B9;&#x3001;&#x4E2D;&#x5708;&#x3001;&#x7981;&#x533A;&#x3001;&#x7F5A;&#x7403;&#x70B9;&#x3001;&#x7F5A;&#x7403;&#x5F27;&#x3001;&#x7403;&#x95E8;&#x533A;&#x3001;&#x89D2;&#x7403;&#x533A;&#x7B49;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;field&quot;&gt;
        &lt;span class=&quot;halfway-line&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;centre-circle&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;centre-mark&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;penalty-area&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;penalty-mark&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;penalty-arc&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;goal-area&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;corner-arc&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;field&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;halfway-line&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;centre-circle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;centre-mark&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-area&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-mark&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-arc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;goal-area&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;corner-arc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(sandybrown, maroon);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(sandybrown, maroon);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 120em;
    height: 80em;
    background-color: green;
    font-size: 5px;
}

.container span {
    display: block;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">120em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80em</span>;
    <span class="hljs-attribute">background-color</span>: green;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">5px</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">display</span>: block;
}</code></pre><p>&#x5B9A;&#x4E49;&#x7EBF;&#x578B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    --line: 0.3em solid white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">--line</span>: <span class="hljs-number">0.3em</span> solid white;
}</code></pre><p>&#x753B;&#x51FA;&#x573A;&#x5730;&#x8FB9;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    padding: 5em;
}

.field {
    width: inherit;
    height: inherit;
    border: var(--line);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5em</span>;
}

<span class="hljs-selector-class">.field</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--line);
}</code></pre><p>&#x753B;&#x51FA;&#x4E2D;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".halfway-line {
    width: calc(120em / 2);
    height: 80em;
    border-right: var(--line);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.halfway-line</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(120em / 2);
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-built_in">var</span>(--line);
}</code></pre><p>&#x753B;&#x51FA;&#x4E2D;&#x5708;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".field {
    position: relative;
}

.centre-circle {
    width: 20em;
    height: 20em;
    border: var(--line);
    border-radius: 50%;
    position: absolute;
    top: calc((80em - 20em) / 2);
    left: calc((120em - 20em - 0.3em) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.field</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.centre-circle</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--line);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>((80em - 20em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((120em - 20em - 0.3em) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x753B;&#x51FA;&#x4E2D;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".centre-mark {
    width: 2em;
    height: 2em;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: calc(80em / 2 - 1em);
    left: calc(120em / 2 - 1em + 0.3em / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.centre-mark</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(80em / 2 - 1em);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(120em / 2 - 1em + 0.3em / 2);
}</code></pre><p>&#x753B;&#x51FA;&#x7981;&#x533A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".penalty-area {
    width: 18em;
    height: 44em;
    border: var(--line);
    position: absolute;
    top: calc((80em - 44em) / 2);
    left: -0.3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.penalty-area</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">44em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--line);
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>((80em - 44em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">0.3em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x7F5A;&#x7403;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".penalty-mark {
    width: 2em;
    height: 2em;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: calc(80em / 2 - 1em);
    left: calc(12em - 1em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.penalty-mark</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(80em / 2 - 1em);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(12em - 1em);
}</code></pre><p>&#x753B;&#x51FA;&#x7F5A;&#x7403;&#x5F27;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".penalty-arc {
    width: 20em;
    height: 20em;
    border: var(--line);
    border-radius: 50%;
    position: absolute;
    top: calc((80em - 20em) / 2);
    left: calc(12em - 20em / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.penalty-arc</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--line);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>((80em - 20em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(12em - 20em / 2);
}</code></pre><p>&#x9690;&#x85CF;&#x7F5A;&#x7403;&#x5F27;&#x5DE6;&#x4FA7;&#x5F27;&#x7EBF;&#xFF0C;&#x53EA;&#x7559;&#x53F3;&#x4FA7;&#x5F27;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".field {
    z-index: 1;
}

.penalty-area {
    background-color: green;
}

.penalty-arc {
    z-index: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.field</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.penalty-area</span> {
    <span class="hljs-attribute">background-color</span>: green;
}

<span class="hljs-selector-class">.penalty-arc</span> {
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x7403;&#x95E8;&#x533A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".goal-area {
    width: 6em;
    height: 20em;
    border: var(--line);
    position: absolute;
    top: calc((80em - 20em) / 2);
    left: -0.3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.goal-area</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--line);
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>((80em - 20em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">0.3em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x89D2;&#x7403;&#x533A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".field {
    overflow: hidden;
}

.corner-arc::before,
.corner-arc::after {
    content: &apos;&apos;;
    position: absolute;
    width: 5em;
    height: 5em;
    border: 0.3em solid white;
    border-radius: 50%;
    --offset: calc(-5em / 2 - 0.3em);
    left: var(--offset);
}

.corner-arc::before {
    top: var(--offset);
}

.corner-arc::after {
    bottom: var(--offset);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.field</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.corner-arc</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.corner-arc</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.3em</span> solid white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">--offset</span>: <span class="hljs-built_in">calc</span>(-5em / 2 - 0.3em);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">var</span>(--offset);
}

<span class="hljs-selector-class">.corner-arc</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">var</span>(--offset);
}

<span class="hljs-selector-class">.corner-arc</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">var</span>(--offset);
}</code></pre><p>&#x628A; dom &#x4E2D;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x590D;&#x5236;&#x51FA;&#x4E00;&#x4EFD;&#xFF0C;&#x5DE6;&#x53F3;&#x4E24;&#x4FA7;&#x5404;&#x4E00;&#x4EFD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;field&quot;&gt;
        &lt;div class=&quot;left&quot;&gt;
            &lt;span class=&quot;halfway-line&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;centre-circle&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;centre-mark&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;penalty-area&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;penalty-mark&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;penalty-arc&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;goal-area&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;corner-arc&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class=&quot;right&quot;&gt;
            &lt;span class=&quot;halfway-line&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;centre-circle&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;centre-mark&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;penalty-area&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;penalty-mark&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;penalty-arc&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;goal-area&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;corner-arc&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;field&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;halfway-line&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;centre-circle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;centre-mark&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-area&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-mark&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-arc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;goal-area&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;corner-arc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;halfway-line&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;centre-circle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;centre-mark&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-area&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-mark&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;penalty-arc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;goal-area&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;corner-arc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x53F3;&#x4FA7;&#x7684;&#x6837;&#x5F0F;&#x4E0E;&#x5DE6;&#x4FA7;&#x76F8;&#x540C;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x6C34;&#x5E73;&#x7FFB;&#x8F6C;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".right {
    position: absolute;
    top: 0;
    left: 50%;
    transform: rotateY(180deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(180deg);
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：64# 视频演示如何用纯 CSS 绘制一个足球场

## 原文链接
[https://segmentfault.com/a/1190000015410847](https://segmentfault.com/a/1190000015410847)


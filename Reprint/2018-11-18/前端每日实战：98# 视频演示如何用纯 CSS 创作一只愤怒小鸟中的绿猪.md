---
title: '前端每日实战：98# 视频演示如何用纯 CSS 创作一只愤怒小鸟中的绿猪' 
date: 2018-11-18 3:32:07
hidden: true
slug: 8ormp1r2j99
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeUYJ?w=400&amp;h=300" src="https://static.alili.tech/img/bVbeUYJ?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/VBGWqX" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/VBGWqX</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/VBGWqX" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cVweZAr" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cVweZAr</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 3 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x8033;&#x6735;&#x3001;&#x773C;&#x775B;&#x3001;&#x9F3B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;pig&quot;&gt;
    &lt;span class=&quot;ears&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;eyes&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;nose&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pig&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ears&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;eyes&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;nose&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: skyblue;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x5171;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x540E;&#x9762;&#x6709;&#x591A;&#x5904;&#x7528;&#x5230;&#x4F2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pig::before,
.pig::after,
.pig *::before,
.pig *::after {
    content: &apos;&apos;;
    position: absolute;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pig</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.pig</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.pig</span> *<span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.pig</span> *<span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pig {
    width: 12em;
    height: 10em;
    font-size: 20px;
    background-color: #50a032;
    border: 0.2em solid #2b4d13;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pig</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#50a032</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid <span class="hljs-number">#2b4d13</span>;
}</code></pre><p>&#x7528;&#x5706;&#x89D2;&#x5C5E;&#x6027;&#x753B;&#x51FA;&#x5934;&#x90E8;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pig {
    border-radius: 50% 50% 50% 50% / 55% 60% 40% 45%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pig</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> / <span class="hljs-number">55%</span> <span class="hljs-number">60%</span> <span class="hljs-number">40%</span> <span class="hljs-number">45%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x9F3B;&#x5B50;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pig {
    position: relative;
}

.nose {
    position: absolute;
    width: 4.6em;
    height: 4em;
    background-color: #82b923;
    border: 0.1em solid #1d3c07;
    border-radius: 50% 50% 45% 45% / 55% 55% 45% 45%;
    top: 3em;
    left: 4.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pig</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.nose</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4.6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#82b923</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.1em</span> solid <span class="hljs-number">#1d3c07</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">45%</span> <span class="hljs-number">45%</span> / <span class="hljs-number">55%</span> <span class="hljs-number">55%</span> <span class="hljs-number">45%</span> <span class="hljs-number">45%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">4.2em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x9F3B;&#x5B54;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nose::before,
.nose::after {
    width: 1.2em;
    background-color: #0f2d00;
    border-radius: 50%;
    top: 1.4em;
}

.nose::before {
    left: 0.8em;
    height: 1.8em;
}

.nose::after {
    right: 0.8em;
    height: 1.6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.nose</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.nose</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0f2d00</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.4em</span>;
}

<span class="hljs-selector-class">.nose</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.8em</span>;
}

<span class="hljs-selector-class">.nose</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.6em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x773C;&#x775B;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes::before,
.eyes::after {
    width: 2.8em;
    height: 2.8em;
    background: white;
    border-radius: 50%;
    border: 0.1em solid #193c09;
    top: 3.6em;
}

.eyes::before {
    left: 0.8em;
}

.eyes::after {
    right: 0.3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2.8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.8em</span>;
    <span class="hljs-attribute">background</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.1em</span> solid <span class="hljs-number">#193c09</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3.6em</span>;
}

<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.8em</span>;
}

<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0.3em</span>;
}</code></pre><p>&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x773C;&#x73E0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes::before,
.eyes::after {
    background: 
        radial-gradient(
            circle at var(--eyeball-left) 1.5em,
            black 0.4em,
            transparent 0.4em
        ),
        white;
}

.eyes::before {
    --eyeball-left: 1em;
}

.eyes::after {
    --eyeball-left: 1.9em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            circle at var(--eyeball-left) <span class="hljs-number">1.5em</span>,
            black <span class="hljs-number">0.4em</span>,
            transparent <span class="hljs-number">0.4em</span>
        ),
        white;
}

<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">--eyeball-left</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">--eyeball-left</span>: <span class="hljs-number">1.9em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5185;&#x8033;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ears::before,
.ears::after {
    width: 0.8em;
    height: 0.9em;
    background-color: #2f6317;
    border: 0.1em solid #1d3a0d;
    border-radius: 45% 45% 45% 45% / 55% 45% 55% 45%;
}

.ears::before {
    top: 0.3em;
    left: 1.3em;
}

.ears::after {
    top: -1.1em;
    right: 5.8em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.9em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#2f6317</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.1em</span> solid <span class="hljs-number">#1d3a0d</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">45%</span> <span class="hljs-number">45%</span> <span class="hljs-number">45%</span> <span class="hljs-number">45%</span> / <span class="hljs-number">55%</span> <span class="hljs-number">45%</span> <span class="hljs-number">55%</span> <span class="hljs-number">45%</span>;
}

<span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.3em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1.3em</span>;
}

<span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">1.1em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">5.8em</span>;
}</code></pre><p>&#x7528;&#x9634;&#x5F71;&#x753B;&#x51FA;&#x5916;&#x8033;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ears::before {
    color: #50a032;
    box-shadow: 
        0.4em 0.7em 0 -0.2em,
        -0.2em 0.7em 0 -0.1em,
        -0.6em 0.5em 0 -0.2em,
        -0.1em -0.2em 0 0.4em,
        -0.1em -0.2em 0 0.6em #2b4d13;
    transform: rotate(-40deg);
}

.ears::after {
    color: #5cb739;
    box-shadow: 
        0.3em 0.6em 0 -0.2em,
        -0.1em 0.6em 0 -0.1em,
        -0.6em 0.6em 0 -0.2em,
        -0.1em -0.2em 0 0.4em,
        -0.1em -0.2em 0 0.6em #2b4d13;
    transform: rotate(-6deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#50a032</span>;
    <span class="hljs-attribute">box-shadow</span>: 
        <span class="hljs-number">0.4em</span> <span class="hljs-number">0.7em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.2em</span>,
        -<span class="hljs-number">0.2em</span> <span class="hljs-number">0.7em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.1em</span>,
        -<span class="hljs-number">0.6em</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.2em</span>,
        -<span class="hljs-number">0.1em</span> -<span class="hljs-number">0.2em</span> <span class="hljs-number">0</span> <span class="hljs-number">0.4em</span>,
        -<span class="hljs-number">0.1em</span> -<span class="hljs-number">0.2em</span> <span class="hljs-number">0</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">#2b4d13</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-40deg);
}

<span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#5cb739</span>;
    <span class="hljs-attribute">box-shadow</span>: 
        <span class="hljs-number">0.3em</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.2em</span>,
        -<span class="hljs-number">0.1em</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.1em</span>,
        -<span class="hljs-number">0.6em</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.2em</span>,
        -<span class="hljs-number">0.1em</span> -<span class="hljs-number">0.2em</span> <span class="hljs-number">0</span> <span class="hljs-number">0.4em</span>,
        -<span class="hljs-number">0.1em</span> -<span class="hljs-number">0.2em</span> <span class="hljs-number">0</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">#2b4d13</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-6deg);
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x7709;&#x6BDB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pig::before,
.pig::after {
    width: 1.4em;
    height: 1em;
    border-top: 0.5em solid #0f2d00;
    top: 2.3em;
    border-radius: 50% 50% 0 0 / 40% 40% 0 0;
}

.pig::before {
    left: 1.2em;
    transform: rotate(-20deg);
}

.pig::after {
    right: 1em;
    transform: rotate(25deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pig</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.pig</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1.4em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">0.5em</span> solid <span class="hljs-number">#0f2d00</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">2.3em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">40%</span> <span class="hljs-number">40%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.pig</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-20deg);
}

<span class="hljs-selector-class">.pig</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(25deg);
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x8BBE;&#x7F6E;&#x9634;&#x5F71;&#xFF0C;&#x589E;&#x52A0;&#x7ACB;&#x4F53;&#x6548;&#x679C;&#x3002;<br>&#x4E3A;&#x5934;&#x90E8;&#x589E;&#x52A0;&#x9634;&#x5F71;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pig {
    box-shadow: 
        inset -1.5em 1em 1.5em -0.5em rgba(255, 255, 255, 0.3),
        inset 0.5em -0.5em 0.8em 0.2em rgba(0, 0, 0, 0.2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pig</span> {
    <span class="hljs-attribute">box-shadow</span>: 
        inset -<span class="hljs-number">1.5em</span> <span class="hljs-number">1em</span> <span class="hljs-number">1.5em</span> -<span class="hljs-number">0.5em</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.3),
        inset <span class="hljs-number">0.5em</span> -<span class="hljs-number">0.5em</span> <span class="hljs-number">0.8em</span> <span class="hljs-number">0.2em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2);
}</code></pre><p>&#x4E3A;&#x9F3B;&#x5B50;&#x589E;&#x52A0;&#x9634;&#x5F71;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nose {
    box-shadow: -0.1em 0.5em 0.2em 0.1em rgba(68, 132, 36, 0.6);
}

.nose::before,
.nose::after {
    box-shadow: inset -0.3em -0.2em 0.1em -0.1em #2d6b1f;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.nose</span> {
    <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">0.1em</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">0.2em</span> <span class="hljs-number">0.1em</span> <span class="hljs-built_in">rgba</span>(68, 132, 36, 0.6);
}

<span class="hljs-selector-class">.nose</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.nose</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-shadow</span>: inset -<span class="hljs-number">0.3em</span> -<span class="hljs-number">0.2em</span> <span class="hljs-number">0.1em</span> -<span class="hljs-number">0.1em</span> <span class="hljs-number">#2d6b1f</span>;
}</code></pre><p>&#x4E3A;&#x773C;&#x775B;&#x589E;&#x52A0;&#x9634;&#x5F71;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes::before,
.eyes::after {
    box-shadow: 
        inset 0.3em -0.6em 0.5em -0.2em rgba(0, 0, 0, 0.3),
        -0.1em 0.5em 0.2em 0.1em rgba(68, 132, 36, 0.6);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-shadow</span>: 
        inset <span class="hljs-number">0.3em</span> -<span class="hljs-number">0.6em</span> <span class="hljs-number">0.5em</span> -<span class="hljs-number">0.2em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3),
        -<span class="hljs-number">0.1em</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">0.2em</span> <span class="hljs-number">0.1em</span> <span class="hljs-built_in">rgba</span>(68, 132, 36, 0.6);
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：98# 视频演示如何用纯 CSS 创作一只愤怒小鸟中的绿猪

## 原文链接
[https://segmentfault.com/a/1190000015909608](https://segmentfault.com/a/1190000015909608)


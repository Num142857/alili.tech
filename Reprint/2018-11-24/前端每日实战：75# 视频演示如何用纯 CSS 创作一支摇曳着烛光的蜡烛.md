---
title: '前端每日实战：75# 视频演示如何用纯 CSS 创作一支摇曳着烛光的蜡烛' 
date: 2018-11-24 2:30:09
hidden: true
slug: 5brisye3q5
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdxru?w=500&amp;h=500" src="https://static.alili.tech/img/bVbdxru?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/LBPvON" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/LBPvON</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/LBPvON" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cBEvpTL" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cBEvpTL</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 4 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x5149;&#x6655;&#x3001;&#x706B;&#x7130;&#x548C;&#x706F;&#x82AF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;candle&quot;&gt;
    &lt;span class=&quot;glow&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;flames&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;thread&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;candle&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;glow&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flames&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;thread&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: black;
}</code></pre><p>&#x753B;&#x51FA;&#x8721;&#x70DB;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".candle {
    width: 15em;
    height: 30em;
    font-size: 10px;
    background: linear-gradient(
        orange,
        darkorange,
        sienna,
        saddlebrown 50%,
        rgba(0, 0, 0, 0.6)
    );
    box-shadow: 
        inset 2em -3em 5em rgba(0, 0, 0, 0.4),
        inset -2em 0 5em rgba(0, 0, 0, 0.4);
    border-radius: 10em / 4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.candle</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        orange,
        darkorange,
        sienna,
        saddlebrown 50%,
        rgba(0, 0, 0, 0.6)
    );
    <span class="hljs-attribute">box-shadow</span>: 
        inset <span class="hljs-number">2em</span> -<span class="hljs-number">3em</span> <span class="hljs-number">5em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4),
        inset -<span class="hljs-number">2em</span> <span class="hljs-number">0</span> <span class="hljs-number">5em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10em</span> / <span class="hljs-number">4em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x8721;&#x70DB;&#x7684;&#x9876;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".candle {
    position: relative;
}

.candle::before {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: 5em;
    border: 0.2em solid darkorange;
    border-radius: 50%;
    box-sizing: border-box;
    background: radial-gradient(
        #444,
        orange,
        saddlebrown,
        sienna,
        darkorange
    );
    filter: opacity(0.7);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.candle</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.candle</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid darkorange;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(
        #444,
        orange,
        saddlebrown,
        sienna,
        darkorange
    );
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.7);
}</code></pre><p>&#x753B;&#x51FA;&#x8721;&#x70DB;&#x7684;&#x706F;&#x82AF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".candle {
    display: flex;
    justify-content: center;
}

.thread {
    position: absolute;
    width: 0.6em;
    height: 3.6em;
    top: -1.8em;
    background: linear-gradient(
        #111,
        black,
        orange 90%
    );
    border-radius: 40% 40% 0 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.candle</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.thread</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3.6em</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">1.8em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        #111,
        black,
        orange 90%
    );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">40%</span> <span class="hljs-number">40%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x8721;&#x70DB;&#x7684;&#x5185;&#x7130;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flames {
    position: absolute;
    width: 2.4em;
}

.flames::before {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: 6em;
    background-color: royalblue;
    top: -4.8em;
    border-radius: 50% 50% 35% 35%;
    border: 0.2em solid dodgerblue;
    box-sizing: border-box;
    filter: opacity(0.7);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flames</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2.4em</span>;
}

<span class="hljs-selector-class">.flames</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">background-color</span>: royalblue;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">4.8em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">35%</span> <span class="hljs-number">35%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid dodgerblue;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.7);
}</code></pre><p>&#x753B;&#x51FA;&#x8721;&#x70DB;&#x7684;&#x5916;&#x7130;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flames::after {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: 12em;
    top: -12em;
    background: linear-gradient(white 80%, transparent);
    border-radius: 50% 50% 20% 20%;
    box-shadow: 0 -0.6em 0.4em darkorange;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flames</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">12em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(white 80%, transparent);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">20%</span> <span class="hljs-number">20%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> -<span class="hljs-number">0.6em</span> <span class="hljs-number">0.4em</span> darkorange;
}</code></pre><p>&#x753B;&#x51FA;&#x5149;&#x6655;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".glow {
    position: absolute;
    width: 10em;
    height: 18em;
    background-color: orangered;
    border-radius: 50%;
    top: -16.5em;
    filter: blur(6em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.glow</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">background-color</span>: orangered;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">16.5em</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(6em);
}</code></pre><p>&#x4E3A;&#x5916;&#x7130;&#x589E;&#x52A0;&#x6447;&#x66F3;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer-flame {
    animation: 
        enlarge 5s linear infinite,
        move 6s linear infinite;
}

@keyframes move {
    0%, 100% {
        transform: rotate(-2deg);
    }

    50% {
        transform: rotate(2deg);
    }
}

@keyframes enlarge {
    0%, 100% {
        height: 12em;
        top: -12em;
    }

    50% {
        height: 14em;
        top: -13em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.outer-flame</span> {
    <span class="hljs-attribute">animation</span>: 
        enlarge <span class="hljs-number">5s</span> linear infinite,
        move <span class="hljs-number">6s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> move {
    0%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-2deg);
    }

    50% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(2deg);
    }
}

@<span class="hljs-keyword">keyframes</span> enlarge {
    0%, 100% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">12em</span>;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">12em</span>;
    }

    50% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">14em</span>;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">13em</span>;
    }
}</code></pre><p>&#x4E3A;&#x5149;&#x6655;&#x589E;&#x52A0;&#x95EA;&#x70C1;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".glow {
    animation: blink 100ms infinite;
}

@keyframes blink {
    to {
        filter: blur(6em) opacity(0.8);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.glow</span> {
    <span class="hljs-attribute">animation</span>: blink <span class="hljs-number">100ms</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> blink {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(6em) <span class="hljs-built_in">opacity</span>(0.8);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4F7F;&#x8721;&#x70DB;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".candle {
    top: 10em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.candle</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10em</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：75# 视频演示如何用纯 CSS 创作一支摇曳着烛光的蜡烛

## 原文链接
[https://segmentfault.com/a/1190000015580809](https://segmentfault.com/a/1190000015580809)


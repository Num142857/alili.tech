---
title: '前端每日实战：37# 视频演示如何把握好 transition 和 animation 的时序，创作描边按钮特效' 
date: 2018-11-29 9:33:05
hidden: true
slug: 0a9k7or2lm2c
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWLf?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWLf?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/mKdzZM" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/mKdzZM</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/mKdzZM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cgnk6Sb" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cgnk6Sb</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x6807;&#x51C6;&#x7684;&#x5BFC;&#x822A;&#x6A21;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;nav&gt;
    &lt;ul&gt;
        &lt;li&gt;Home&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x6587;&#x672C;&#x548C;&#x6309;&#x94AE;&#x8FB9;&#x6846;&#x6837;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul {
    padding: 0;
}

nav ul li {
    color: white;
    list-style-type: none;
    font-size: 32px;
    font-family: sans-serif;
    text-transform: uppercase;
    width: 12em;
    height: 4em;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    line-height: 4em;
    letter-spacing: 0.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">list-style-type</span>: none;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.2);
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.2em</span>;
}</code></pre>
<p>&#x7528; before &#x4F2A;&#x5143;&#x7D20;&#x5B9A;&#x4E49;&#x4E0A;&#x8FB9;&#x6846;&#x548C;&#x53F3;&#x8FB9;&#x6846;&#xFF0C;&#x5176;&#x4E2D;&#x8FB9;&#x6846;&#x989C;&#x8272;&#x56E0;&#x4F1A;&#x591A;&#x6B21;&#x88AB;&#x7528;&#x5230;&#xFF0C;&#x6240;&#x4EE5;&#x91C7;&#x7528;&#x53D8;&#x91CF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --color: dodgerblue;
}

nav ul li::before {
    content: &apos;&apos;;
    position: absolute;;
    width: 0;
    height: 0;
    visibility: hidden;
    top: 0;
    left: 0;
    border-top: 1px solid var(--color);
    border-right: 1px solid var(--color);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--color</span>: dodgerblue;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">var</span>(--color);
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">var</span>(--color);
}</code></pre>
<p>&#x7C7B;&#x4F3C;&#x5730;&#xFF0C;&#x7528; after &#x4F2A;&#x5143;&#x7D20;&#x5B9A;&#x4E49;&#x53F3;&#x8FB9;&#x6846;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li::after {
    content: &apos;&apos;;
    position: absolute;;
    width: 0;
    height: 0;
    visibility: hidden;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid var(--color);
    border-left: 1px solid var(--color);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">var</span>(--color);
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">var</span>(--color);
}</code></pre>
<p>&#x8BBE;&#x8BA1;&#x8FB9;&#x6846;&#x5165;&#x573A;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x6309;&#x4E0A;&#x3001;&#x53F3;&#x3001;&#x4E0B;&#x3001;&#x5DE6;&#x7684;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x663E;&#x793A;&#x8FB9;&#x6846;&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x8C03;&#x6574;&#x52A8;&#x753B;&#x7684;&#x901F;&#x5EA6;&#x8BBE;&#x7F6E;&#x4E86;&#x4E0E;&#x65F6;&#x95F4;&#x76F8;&#x5173;&#x7684;&#x53D8;&#x91CF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --time-slot-length: 0.1s;
    --t1x: var(--time-slot-length);
    --t2x: calc(var(--time-slot-length) * 2);
    --t3x: calc(var(--time-slot-length) * 3);
    --t4x: calc(var(--time-slot-length) * 4);
}

nav ul li:hover::before,
nav ul li:hover::after {
    width: 100%;
    height: 100%;
    visibility: visible;
}

nav ul li:hover::before {
    transition:
        visibility 0s,
        width linear var(--t1x),
        height linear var(--t1x) var(--t1x);
}

nav ul li:hover::after {
    transition: 
        visibility 0s var(--t2x),
        width linear var(--t1x) var(--t2x),
        height linear var(--t1x) var(--t3x);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--time-slot-length</span>: <span class="hljs-number">0.1s</span>;
    --t1<span class="hljs-attribute">x</span>: <span class="hljs-built_in">var</span>(--time-slot-length);
    --t2<span class="hljs-attribute">x</span>: <span class="hljs-built_in">calc</span>(var(--time-slot-length) * <span class="hljs-number">2</span>);
    --t3<span class="hljs-attribute">x</span>: <span class="hljs-built_in">calc</span>(var(--time-slot-length) * <span class="hljs-number">3</span>);
    --t4<span class="hljs-attribute">x</span>: <span class="hljs-built_in">calc</span>(var(--time-slot-length) * <span class="hljs-number">4</span>);
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">visibility</span>: visible;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">transition</span>:
        visibility <span class="hljs-number">0s</span>,
        width linear <span class="hljs-built_in">var</span>(--t1x),
        height linear <span class="hljs-built_in">var</span>(--t1x) <span class="hljs-built_in">var</span>(--t1x);
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transition</span>: 
        visibility <span class="hljs-number">0s</span> <span class="hljs-built_in">var</span>(--t2x),
        width linear <span class="hljs-built_in">var</span>(--t1x) <span class="hljs-built_in">var</span>(--t2x),
        height linear <span class="hljs-built_in">var</span>(--t1x) <span class="hljs-built_in">var</span>(--t3x);
}</code></pre>
<p>&#x8BBE;&#x8BA1;&#x8FB9;&#x6846;&#x51FA;&#x573A;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x4E0E;&#x5165;&#x573A;&#x7684;&#x987A;&#x5E8F;&#x76F8;&#x53CD;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li::before {
    transition:
        height linear var(--t1x) var(--t2x),
        width linear var(--t1x) var(--t3x),
        visibility 0s var(--t4x);
}

nav ul li::after {
    transition:
        height linear var(--t1x),
        width linear var(--t1x) var(--t1x),
        visibility 0s var(--t2x);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">transition</span>:
        height linear <span class="hljs-built_in">var</span>(--t1x) <span class="hljs-built_in">var</span>(--t2x),
        width linear <span class="hljs-built_in">var</span>(--t1x) <span class="hljs-built_in">var</span>(--t3x),
        visibility <span class="hljs-number">0s</span> <span class="hljs-built_in">var</span>(--t4x);
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transition</span>:
        height linear <span class="hljs-built_in">var</span>(--t1x),
        width linear <span class="hljs-built_in">var</span>(--t1x) <span class="hljs-built_in">var</span>(--t1x),
        visibility <span class="hljs-number">0s</span> <span class="hljs-built_in">var</span>(--t2x);
}</code></pre>
<p>&#x8BA9;&#x6309;&#x94AE;&#x6587;&#x5B57;&#x5728;&#x63CF;&#x8FB9;&#x671F;&#x95F4;&#x53D8;&#x8272;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li {
    transition: var(--t4x);
}

nav ul li:hover {
    color: var(--color);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-built_in">var</span>(--t4x);
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--color);
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x5728;&#x63CF;&#x8FB9;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x5728;&#x6309;&#x94AE;&#x56DB;&#x5468;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x8109;&#x51B2;&#x52A8;&#x753B;&#xFF0C;&#x52A0;&#x5F3A;&#x52A8;&#x611F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li:hover {
    animation: pulse ease-out 1s var(--t4x);
}

@keyframes pulse {
    from {
        box-shadow: 0 0 rgba(30, 144, 255, 0.4);
    }

    to {
        box-shadow: 0 0 0 1em rgba(30, 144, 255, 0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: pulse ease-out <span class="hljs-number">1s</span> <span class="hljs-built_in">var</span>(--t4x);
}

@<span class="hljs-keyword">keyframes</span> pulse {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(30, 144, 255, 0.4);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1em</span> <span class="hljs-built_in">rgba</span>(30, 144, 255, 0);
    }
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：37# 视频演示如何把握好 transition 和 animation 的时序，创作描边按钮特效

## 原文链接
[https://segmentfault.com/a/1190000015089396](https://segmentfault.com/a/1190000015089396)


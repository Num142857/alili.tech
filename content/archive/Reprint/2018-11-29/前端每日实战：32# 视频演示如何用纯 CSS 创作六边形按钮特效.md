---
title: '前端每日实战：32# 视频演示如何用纯 CSS 创作六边形按钮特效' 
date: 2018-11-29 9:33:05
hidden: true
slug: pmom1bqbyvq
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWKT?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWKT?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/xjoOeM" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/xjoOeM</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/xjoOeM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/c/cQ74NAJ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cQ74NAJ</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49;dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x53EA;&#x5305;&#x542B; 1 &#x4E2A;&#x6309;&#x94AE;&#xFF1A;</p>
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
<p>&#x5B9A;&#x4E49;&#x6309;&#x94AE;&#x6837;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav {
    --h: 3em;
}

nav ul {
    padding: 0;
}

nav ul li {
    list-style-type: none;
    width: calc(var(--h) * 1.732);
    height: var(--h);
    background-color: #333;
    color: white;
    font-family: sans-serif;
    text-align: center;
    line-height: var(--h);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">3em</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">list-style-type</span>: none;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--h) * <span class="hljs-number">1.732</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--h);
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-built_in">var</span>(--h);
}</code></pre>
<p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x589E;&#x52A0;2&#x4E2A;&#x503E;&#x659C;&#x7684;&#x77E9;&#x5F62;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li {
    position: relative;
}

nav ul li::before,
nav ul li::after {
    content: &apos;&apos;;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    background-color: #333;
}

nav ul li::before{
    transform: rotate(60deg) translateX(calc(var(--h) * -2));
}

nav ul li::after{
    transform: rotate(-60deg) translateX(calc(var(--h) * 2));
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(60deg) <span class="hljs-built_in">translateX</span>(calc(var(--h) * -<span class="hljs-number">2</span>));
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-60deg) <span class="hljs-built_in">translateX</span>(calc(var(--h) * <span class="hljs-number">2</span>));
}</code></pre>
<p>&#x589E;&#x52A0;&#x9F20;&#x6807;&#x5212;&#x8FC7;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li::before,
nav ul li::after {
    z-index: -1;
    filter: opacity(0);
    transition: 0.3s;
}

nav ul li:hover::before {
    filter: opacity(1);
    transform: rotate(60deg) translateX(0);
}

nav ul li:hover::after {
    filter: opacity(1);
    transform: rotate(-60deg) translateX(0);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(60deg) <span class="hljs-built_in">translateX</span>(0);
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-60deg) <span class="hljs-built_in">translateX</span>(0);
}</code></pre>
<p>dom &#x4E2D;&#x589E;&#x52A0;&#x51E0;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x7EC4;&#x6309;&#x94AE;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;nav&gt;
    &lt;ul&gt;
        &lt;li&gt;Home&lt;/li&gt;
        &lt;li&gt;Products&lt;/li&gt;
        &lt;li&gt;Services&lt;/li&gt;
        &lt;li&gt;Contact&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Products<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Services<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>&#x6309;&#x94AE;&#x4E4B;&#x95F4;&#x4E3A;&#x9F20;&#x6807;&#x5212;&#x8FC7;&#x6548;&#x679C;&#x7559;&#x51FA;&#x8FB9;&#x8DDD;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li {
    margin: 2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">2em</span>;
}</code></pre>
<p>&#x518D;&#x589E;&#x52A0;&#x4E24;&#x7EC4;&#x6309;&#x94AE;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;nav&gt;
    &lt;ul&gt;
        &lt;li&gt;Home&lt;/li&gt;
        &lt;li&gt;Products&lt;/li&gt;
        &lt;li&gt;Services&lt;/li&gt;
        &lt;li&gt;Contact&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
&lt;nav&gt;
    &lt;ul&gt;
        &lt;li&gt;Home&lt;/li&gt;
        &lt;li&gt;Products&lt;/li&gt;
        &lt;li&gt;Services&lt;/li&gt;
        &lt;li&gt;Contact&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
&lt;nav&gt;
    &lt;ul&gt;
        &lt;li&gt;Home&lt;/li&gt;
        &lt;li&gt;Product Vs&lt;/li&gt;
        &lt;li&gt;Services&lt;/li&gt;
        &lt;li&gt;Contact&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Products<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Services<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Products<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Services<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Product Vs<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Services<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x5C1D;&#x8BD5;&#x4E00;&#x4E9B;&#x53D8;&#x5316;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav {
    --h: 3em;
}

nav:nth-child(1) {
    --rate: 1.5;
    --bgcolor: black;
}

nav:nth-child(2) {
    --rate: 1.732;
    --bgcolor: brown;
}

nav:nth-child(3) {
    --rate: 2;
    --bgcolor: green;
}

nav ul li {
    width: calc(var(--h) * var(--rate));
    background-color: var(--bgcolor);
}

nav ul li::before,
nav ul li::after {
    background-color: var(--bgcolor);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">3em</span>;
}

<span class="hljs-selector-tag">nav</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--rate</span>: <span class="hljs-number">1.5</span>;
    <span class="hljs-attribute">--bgcolor</span>: black;
}

<span class="hljs-selector-tag">nav</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--rate</span>: <span class="hljs-number">1.732</span>;
    <span class="hljs-attribute">--bgcolor</span>: brown;
}

<span class="hljs-selector-tag">nav</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--rate</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">--bgcolor</span>: green;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--h) * <span class="hljs-built_in">var</span>(--rate));
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--bgcolor);
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--bgcolor);
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：32# 视频演示如何用纯 CSS 创作六边形按钮特效

## 原文链接
[https://segmentfault.com/a/1190000015020964](https://segmentfault.com/a/1190000015020964)


---
title: '前端每日实战：91# 视频演示如何用纯 CSS 创作一个行驶中的火车 loader' 
date: 2018-11-20 2:30:10
hidden: true
slug: 7s4ejf8zqzf
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeos6?w=400&amp;h=300" src="https://static.alili.tech/img/bVbeos6?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/RBLWzJ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/RBLWzJ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/RBLWzJ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cawN3f9" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cawN3f9</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;<code>train</code> &#x4EE3;&#x8868;&#x706B;&#x8F66;&#xFF0C;<code>track</code> &#x4EE3;&#x8868;&#x94C1;&#x8F68;&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x7684; 3 &#x4E2A; <code>&lt;span&gt;</code> &#x4EE3;&#x8868; 3 &#x6839;&#x6795;&#x6728;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;div class=&quot;train&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;track&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;train&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;track&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#666, #333);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#666, #333);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 8em;
    height: 10em;
    font-size: 20px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre><p>&#x5148;&#x753B;&#x706B;&#x8F66;&#x3002;<br>&#x753B;&#x51FA;&#x706B;&#x8F66;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".train {
    width: 6em;
    height: 6em;
    color: #444;
    background: #bbb4ab;
    border-radius: 1em;
    position: relative;
    left: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.train</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#444</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#bbb4ab</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1em</span>;
}</code></pre><p>&#x7528; ::before &#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x8F66;&#x7A97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".train::before {
    content: &apos;&apos;;
    position: absolute;
    width: 80%;
    height: 2.3em;
    background-color: currentColor;
    border-radius: 0.4em;
    top: 1.2em;
    left: 10%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.train</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.3em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10%</span>;
}</code></pre><p>&#x518D;&#x7528; ::after &#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x8F66;&#x7A97;&#x4E0A;&#x7684;&#x4FE1;&#x53F7;&#x706F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".train::after {
    content: &apos;&apos;;
    position: absolute;
    width: 25%;
    height: 0.4em;
    background-color: currentColor;
    border-radius: 0.3em;
    top: 0.4em;
    left: calc((100% - 25%) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.train</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.3em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((100% - 25%) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x5229;&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x8F66;&#x706F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".train {
    background: 
        radial-gradient(circle at 20% 80%, currentColor 0.6em, transparent 0.6em),
        radial-gradient(circle at 80% 80%, currentColor 0.6em, transparent 0.6em),
        #bbb;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.train</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(circle at 20% 80%, currentColor 0.6em, transparent 0.6em),
        <span class="hljs-built_in">radial-gradient</span>(circle at 80% 80%, currentColor 0.6em, transparent 0.6em),
        <span class="hljs-number">#bbb</span>;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x753B;&#x94C1;&#x8F68;&#x548C;&#x6795;&#x6728;&#x3002;<br>&#x5B9A;&#x4E49;&#x94C1;&#x8F68;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x6BD4;&#x706B;&#x8F66;&#x7A0D;&#x5BBD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track {
    width: 8em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x94C1;&#x8F68;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track {
    position: relative;
}

.track::before,
.track::after {
    content: &apos;&apos;;
    position: absolute;
    width: 0.3em;
    height: 4em;
    background-color: #bbb;
    border-radius: 0.4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#bbb</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.4em</span>;
}</code></pre><p>&#x628A;&#x94C1;&#x8F68;&#x5206;&#x522B;&#x653E;&#x7F6E;&#x5728;&#x4E24;&#x4FA7;&#xFF0C;&#x5E76;&#x5F62;&#x6210;&#x8FD1;&#x5927;&#x8FDC;&#x5C0F;&#x7684;&#x89C6;&#x89C9;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track::before,
.track::after {
    transform-origin: bottom;
}

.track::before {
    left: 0;
    transform: skewX(-27deg);
}

.track::after {
    right: 0;
    transform: skewX(27deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transform-origin</span>: bottom;
}

<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skewX</span>(-27deg);
}

<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skewX</span>(27deg);
}</code></pre><p>&#x753B;&#x51FA;&#x6795;&#x6728;&#xFF0C;&#x8FD9;&#x662F;&#x8DDD;&#x79BB;&#x89C2;&#x5BDF;&#x8005;&#x6700;&#x8FD1;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x76EE;&#x524D; 3 &#x6839;&#x6795;&#x6728;&#x662F;&#x91CD;&#x53E0;&#x5728;&#x4E00;&#x8D77;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track span {
    width: inherit;
    height: 0.3em;
    background-color: #bbb;
    position: absolute;
    top: 4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.3em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#bbb</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">4em</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x94C1;&#x8F68;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track span {
    animation: track-animate 1s linear infinite;
}

@keyframes track-animate {
    0% {
        transform: translateY(-0.5em) scaleX(0.9);
        filter: opacity(0);
    }

    10%, 90% {
        filter: opacity(1);
    }

    100% {
        transform: translateY(-4em) scaleX(0.5);
        filter: opacity(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: track-animate <span class="hljs-number">1s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> track-animate {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-0.5em) <span class="hljs-built_in">scaleX</span>(0.9);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }

    10%, 90% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-4em) <span class="hljs-built_in">scaleX</span>(0.5);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }
}</code></pre><p>&#x4E3A;&#x53E6;&#x5916; 2 &#x6839;&#x6795;&#x6728;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x4F7F;&#x94C1;&#x8F68;&#x770B;&#x8D77;&#x6765;&#x5C31;&#x50CF;&#x6C38;&#x8FDC;&#x8D70;&#x4E0D;&#x5B8C;&#x7684;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track span:nth-child(2) {
    animation-delay: -0.33s;
}

.track span:nth-child(3) {
    animation-delay: -0.66s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">0.33s</span>;
}

<span class="hljs-selector-class">.track</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">0.66s</span>;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x706B;&#x8F66;&#x589E;&#x52A0;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x5C31;&#x50CF;&#x5728;&#x884C;&#x9A76;&#x4E2D;&#x5FAE;&#x5FAE;&#x6643;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".train {
    animation: train-animate 1.5s infinite ease-in-out;
}

@keyframes train-animate {
    0%, 100% {
        transform: rotate(0deg);
    }

    25%, 75% {
        transform: rotate(0.5deg);
    }

    50% {
        transform: rotate(-0.5deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.train</span> {
    <span class="hljs-attribute">animation</span>: train-animate <span class="hljs-number">1.5s</span> infinite ease-in-out;
}

@<span class="hljs-keyword">keyframes</span> train-animate {
    0%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    25%, 75% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0.5deg);
    }

    50% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-0.5deg);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：91# 视频演示如何用纯 CSS 创作一个行驶中的火车 loader

## 原文链接
[https://segmentfault.com/a/1190000015784640](https://segmentfault.com/a/1190000015784640)


---
title: '前端每日实战：138# 视频演示如何用纯 CSS 创作一张 iPhone 价格信息图'
hidden: true
categories: reprint
slug: 2c951dd
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbhdbh?w=400&amp;h=300" src="https://static.alili.tech/img/bVbhdbh?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/OorLGZ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/OorLGZ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/OorLGZ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cRB22cV" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cRB22cV</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 3 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;<code>h1</code> &#x662F;&#x56FE;&#x8868;&#x6807;&#x9898;&#xFF0C;<code>.back</code> &#x8868;&#x793A;&#x80CC;&#x666F;&#x5899;&#xFF0C;<code>.side</code> &#x8868;&#x793A;&#x4FA7;&#x8FB9;&#x5899;&#xFF0C;<code>.back</code> &#x548C; <code>.side</code> &#x4E2D;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x65E0;&#x5E8F;&#x5217;&#x8868;&#xFF0C;&#x80CC;&#x666F;&#x5899;&#x5C55;&#x793A;&#x4EF7;&#x683C;&#xFF0C;&#x4FA7;&#x8FB9;&#x5899;&#x5C55;&#x793A;&#x540D;&#x79F0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;wall&quot;&gt;
    &lt;h1&gt;iPhone Price Comparison&lt;/h1&gt;
    &lt;div class=&quot;back&quot;&gt;
        &lt;ul&gt;
            &lt;li class=&quot;xs-max&quot;&gt;&lt;span&gt;$1099 ~ $1449&lt;/span&gt;&lt;/li&gt;
            &lt;li class=&quot;xs&quot;&gt;&lt;span&gt;$999 ~ $1349&lt;/span&gt;&lt;/li&gt;
            &lt;li class=&quot;xr&quot;&gt;&lt;span&gt;$749 ~ $899&lt;/span&gt;&lt;/li&gt;
            &lt;li class=&quot;x&quot;&gt;&lt;span&gt;$999 ~ $1149&lt;/span&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class=&quot;side&quot;&gt;
        &lt;ul&gt;
            &lt;li class=&quot;xs-max&quot;&gt;iPhone XS Max&lt;/li&gt;
            &lt;li class=&quot;xs&quot;&gt;iPhone XS&lt;/li&gt;
            &lt;li class=&quot;xr&quot;&gt;iPhone XR&lt;/li&gt;
            &lt;li class=&quot;x&quot;&gt;iPhone X&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wall&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>iPhone Price Comparison<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;back&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;xs-max&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>$1099 ~ $1449<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;xs&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>$999 ~ $1349<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;xr&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>$749 ~ $899<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;x&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>$999 ~ $1149<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;side&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;xs-max&quot;</span>&gt;</span>iPhone XS Max<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;xs&quot;</span>&gt;</span>iPhone XS<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;xr&quot;</span>&gt;</span>iPhone XR<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;x&quot;</span>&gt;</span>iPhone X<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(lightblue, skyblue);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(lightblue, skyblue);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wall {
    width: 60em;
    height: 40em;
    border: 1em solid rgba(255, 255, 255, 0.5);
    border-radius: 2em;
    font-size: 10px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1em</span> solid <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
}</code></pre><p>&#x7528; grid &#x5E03;&#x5C40;&#xFF0C;&#x628A;&#x5BB9;&#x5668;&#x5206;&#x6210; 2 &#x90E8;&#x5206;&#xFF0C;&#x5DE6;&#x4FA7;80%&#x4E3A;&#x80CC;&#x666F;&#x5899;&#xFF0C;&#x53F3;&#x4FA7;20%&#x4E3A;&#x4FA7;&#x8FB9;&#x5899;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wall {
    display: grid;
    grid-template-columns: 0 4fr 1fr;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">0</span> <span class="hljs-number">4</span>fr <span class="hljs-number">1</span>fr;
}</code></pre><p>&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x5899;&#x548C;&#x4FA7;&#x8FB9;&#x5899;&#x7684;&#x80CC;&#x666F;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".back {
    background: linear-gradient(
        to right,
        #555,
        #ddd
    );
}

.side {
    background: 
        radial-gradient(
            at 0% 50%,
            /* tomato 25%,
            yellow 90% */
            rgba(0, 0, 0, 0.2) 25%,
            rgba(0, 0, 0, 0) 90%
        ),
        linear-gradient(
            to right,
            #ddd,
            #ccc
        )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.back</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        to right,
        #555,
        #ddd
    );
}

<span class="hljs-selector-class">.side</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            at 0% 50%,
            /* tomato 25%,
            yellow 90% */
            rgba(0, 0, 0, 0.2) <span class="hljs-number">25%</span>,
            <span class="hljs-built_in">rgba</span>(0, 0, 0, 0) <span class="hljs-number">90%</span>
        ),
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            #ddd,
            #ccc
        )
}</code></pre><p>&#x7528; flex &#x5E03;&#x5C40;&#x8BBE;&#x7F6E;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;&#xFF0C;&#x5217;&#x8868;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".back,
.side {
    display: flex;
    align-items: center;
}

.back {
    justify-content: flex-end;
}

ul {
    list-style-type: none;
    padding: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.back</span>,
<span class="hljs-selector-class">.side</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
}

<span class="hljs-selector-class">.back</span> {
    <span class="hljs-attribute">justify-content</span>: flex-end;
}

<span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">list-style-type</span>: none;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x6807;&#x9898;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 {
    position: relative;
    width: 20em;
    margin: 1em;
    color: white;
    font-family: sans-serif;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-family</span>: sans-serif;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5217;&#x8868;&#x9879;&#x7684;&#x9AD8;&#x5EA6;&#x548C;&#x989C;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".back ul {
    width: 75%;
}

.side ul {
    width: 100%;
}

ul li {
    height: 5em;
    background-color: var(--c);
}

ul li:nth-child(1) {
    --c: tomato;
}

ul li:nth-child(2) {
    --c: coral;
}

ul li:nth-child(3) {
    --c: lightsalmon;
}

ul li:nth-child(4) {
    --c: deepskyblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">75%</span>;
}

<span class="hljs-selector-class">.side</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--c);
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--c</span>: tomato;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--c</span>: coral;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--c</span>: lightsalmon;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--c</span>: deepskyblue;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6574;&#x4F53;&#x5E03;&#x5C40;&#x5B8C;&#x6210;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x8BBE;&#x7F6E;&#x5DE6;&#x4FA7;&#x80CC;&#x666F;&#x5899;&#x7684;&#x6A2A;&#x6761;&#x6837;&#x5F0F;&#x3002;<br>&#x6A2A;&#x6761;&#x7684;&#x5BBD;&#x5EA6;&#x6839;&#x636E;&#x4E0E;&#x5546;&#x54C1;&#x7684;&#x4E0A;&#x9650;&#x552E;&#x4EF7; <code>--high-price</code> &#x6210;&#x6B63;&#x6BD4;&#xFF0C;&#x4EE5;&#x6700;&#x8D35;&#x7684;&#x552E;&#x4EF7; <code>--max-price</code> &#x4F5C;&#x4E3A;&#x5168;&#x957F;&#xFF0C;&#x5176;&#x4ED6;&#x6A2A;&#x6761;&#x7684;&#x5BBD;&#x5EA6;&#x4E3A;&#x4E0A;&#x9650;&#x552E;&#x4EF7;&#x4E0E;&#x6700;&#x9AD8;&#x552E;&#x4EF7;&#x7684;&#x767E;&#x5206;&#x6BD4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul {
    display: flex;
    flex-direction: column;
}

.back ul {
    align-items: flex-end;
}

ul {
    --max-price: 1449;
}

ul li.xs-max {
    --high-price: 1449;
}

ul li.xs {
    --high-price: 1349;
}

ul li.xr {
    --high-price: 899;
}

ul li.x {
    --high-price: 1149;
}

.back ul li {
    width: calc(var(--high-price) / var(--max-price) * 100%);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
}

<span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">align-items</span>: flex-end;
}

<span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">--max-price</span>: <span class="hljs-number">1449</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xs-max</span> {
    <span class="hljs-attribute">--high-price</span>: <span class="hljs-number">1449</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xs</span> {
    <span class="hljs-attribute">--high-price</span>: <span class="hljs-number">1349</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xr</span> {
    <span class="hljs-attribute">--high-price</span>: <span class="hljs-number">899</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.x</span> {
    <span class="hljs-attribute">--high-price</span>: <span class="hljs-number">1149</span>;
}

<span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--high-price) / <span class="hljs-built_in">var</span>(--max-price) * <span class="hljs-number">100%</span>);
}</code></pre><p>&#x5728;&#x6A2A;&#x6761;&#x4E2D;&#x533A;&#x5206;&#x8D77;&#x552E;&#x4EF7; <code>--low-price</code> &#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x6BD4;&#x8D77;&#x552E;&#x4EF7;&#x9AD8;&#x7684;&#x533A;&#x57DF;&#x586B;&#x5145;&#x66F4;&#x6DF1;&#x7684;&#x989C;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul li.xs-max {
    --low-price: 1099;
    --c2: orangered;
}

ul li.xs {
    --low-price: 999;
    --c2: tomato;
}

ul li.xr {
    --low-price: 749;
    --c2: coral;
}

ul li.x {
    --low-price: 999;
    --c2: dodgerblue;
}

.back ul li {
    --percent: calc(var(--low-price) / var(--high-price) * 100%);
    background: linear-gradient(
        to left,
        var(--c) var(--percent),
        var(--c2) var(--percent)
    );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xs-max</span> {
    <span class="hljs-attribute">--low-price</span>: <span class="hljs-number">1099</span>;
    --c2: orangered;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xs</span> {
    <span class="hljs-attribute">--low-price</span>: <span class="hljs-number">999</span>;
    --c2: tomato;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xr</span> {
    <span class="hljs-attribute">--low-price</span>: <span class="hljs-number">749</span>;
    --c2: coral;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.x</span> {
    <span class="hljs-attribute">--low-price</span>: <span class="hljs-number">999</span>;
    --c2: dodgerblue;
}

<span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">--percent</span>: <span class="hljs-built_in">calc</span>(var(--low-price) / <span class="hljs-built_in">var</span>(--high-price) * <span class="hljs-number">100%</span>);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        to left,
        var(--c) <span class="hljs-built_in">var</span>(--percent),
        <span class="hljs-built_in">var</span>(--c2) <span class="hljs-built_in">var</span>(--percent)
    );
}</code></pre><p>&#x5728;&#x6A2A;&#x7EBF;&#x7684;&#x9876;&#x7AEF;&#x753B;&#x51FA;&#x4E00;&#x4E2A;&#x5411;&#x5DE6;&#x7684;&#x4E09;&#x89D2;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".back ul li {
    position: relative;
}

.back ul li::before {
    content: &apos;&apos;;
    position: absolute;
    width: 0;
    height: 0;
    transform: translateX(-3em);
    border-right: 3em solid var(--c2);
    border-top: 2.5em solid transparent;
    border-bottom: 2.5em solid transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-3em);
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">3em</span> solid <span class="hljs-built_in">var</span>(--c2);
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">2.5em</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">2.5em</span> solid transparent;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x4EF7;&#x683C;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".back ul li span {
    position: absolute;
    width: 95%;
    text-align: right;
    color: white;
    font-size: 1.25em;
    line-height: 4em;
    font-family: sans-serif;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">95%</span>;
    <span class="hljs-attribute">text-align</span>: right;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.25em</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
}</code></pre><p>&#x4E3A;&#x5404;&#x6A2A;&#x6761;&#x589E;&#x52A0;&#x9634;&#x5F71;&#xFF0C;&#x589E;&#x5F3A;&#x7ACB;&#x4F53;&#x611F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul li.xs-max {
    z-index: 5;
}

ul li.xs {
    z-index: 4;
}

ul li.xr {
    z-index: 3;
}

ul li.x {
    z-index: 2;
}

.back ul li {
    filter: drop-shadow(0 1em 1em rgba(0, 0, 0, 0.3));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xs-max</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xs</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.xr</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.x</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">drop-shadow</span>(0 1em 1em rgba(0, 0, 0, 0.3));
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x80CC;&#x666F;&#x5899;&#x7684;&#x6A2A;&#x6761;&#x5B8C;&#x6210;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x8BBE;&#x7F6E;&#x4FA7;&#x8FB9;&#x5899;&#x7684;&#x6837;&#x5F0F;&#x3002;<br>&#x4E3A;&#x4E86;&#x5236;&#x9020;&#x7ACB;&#x4F53;&#x6548;&#x679C;&#xFF0C;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4FA7;&#x8FB9;&#x5899;&#x7684;&#x666F;&#x6DF1;&#xFF0C;&#x5E76;&#x4F7F;&#x5217;&#x8868;&#x503E;&#x659C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".side {
    perspective: 1000px;
}

.side ul {
    transform-origin: left;
    transform: rotateY(-75deg) scaleX(4);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.side</span> {
    <span class="hljs-attribute">perspective</span>: <span class="hljs-number">1000px</span>;
}

<span class="hljs-selector-class">.side</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">transform-origin</span>: left;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-75deg) <span class="hljs-built_in">scaleX</span>(4);
}</code></pre><p>&#x8BBE;&#x7F6E;&#x4FA7;&#x8FB9;&#x5899;&#x7684;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wall {
    overflow: hidden;
}

.side ul li {
    padding-right: 30%;
    text-align: right;
    color: white;
    font-family: sans-serif;
    line-height: 5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.side</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">30%</span>;
    <span class="hljs-attribute">text-align</span>: right;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">5em</span>;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x9759;&#x6001;&#x89C6;&#x89C9;&#x6548;&#x679C;&#x5B8C;&#x6210;&#x3002;&#x6700;&#x540E;&#x589E;&#x52A0;&#x5165;&#x573A;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul li {
    animation: show 1s linear forwards;
    transform-origin: right;
    transform: scaleX(0);
}

@keyframes show {
    to {
        transform: scaleX(1);
    }
}

.back ul li {
    animation-delay: 1s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">animation</span>: show <span class="hljs-number">1s</span> linear forwards;
    <span class="hljs-attribute">transform-origin</span>: right;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

@<span class="hljs-keyword">keyframes</span> show {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    }
}

<span class="hljs-selector-class">.back</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">1s</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：138# 视频演示如何用纯 CSS 创作一张 iPhone 价格信息图

## 原文链接
[https://segmentfault.com/a/1190000016456282](https://segmentfault.com/a/1190000016456282)


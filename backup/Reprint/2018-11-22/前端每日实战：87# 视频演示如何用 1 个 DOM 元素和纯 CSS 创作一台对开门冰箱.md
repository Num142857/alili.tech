---
title: '前端每日实战：87# 视频演示如何用 1 个 DOM 元素和纯 CSS 创作一台对开门冰箱' 
date: 2018-11-22 2:30:10
hidden: true
slug: 0bjha4ymtpkq
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbd9tL?w=400&amp;h=300" src="https://static.alili.tech/img/bVbd9tL?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/EpWagM" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/EpWagM</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/EpWagM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cZwGRTL" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cZwGRTL</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709; 1 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;fridge&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fridge&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(floralwhite, wheat);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(floralwhite, wheat);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge {
    width: 24em;
    height: 38em;
    font-size: 10px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">24em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">38em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x51B0;&#x7BB1;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge {
    border-top: 1em solid #333;
    border-bottom: 1em solid #333;
    background: silver;
    border-radius: 4em / 0.5em;
    box-shadow: 0 0.5em 1em -0.5em rgba(0, 0, 0, 0.5);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span> {
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1em</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1em</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">background</span>: silver;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4em</span> / <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">1em</span> -<span class="hljs-number">0.5em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
}</code></pre><p>&#x7528;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x51B0;&#x7BB1;&#x7684;&#x91D1;&#x5C5E;&#x8868;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge {
    background:
        linear-gradient(
            to right,
            darkgray,
            lightgray 10%,
            silver 40%, silver 80%,
            darkgray 90%,
            dimgray
        );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span> {
    <span class="hljs-attribute">background</span>:
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            darkgray,
            lightgray 10%,
            silver 40%, silver 80%,
            darkgray 90%,
            dimgray
        );
}</code></pre><p>&#x518D;&#x7528;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x51B0;&#x7BB1;&#x7684;&#x628A;&#x624B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge {
    background:
        linear-gradient(
            to right,
            transparent 40%,
            gray 40%,
            silver 41%,
            dimgray 43%,
            transparent 43%, transparent 48%,
            gray 48%,
            silver 49%,
            dimgray 51%,
            transparent 51%
        ) no-repeat center / 100% 90%, /* handles */
        linear-gradient(
            to right,
            darkgray,
            lightgray 10%,
            silver 40%, silver 80%,
            darkgray 90%,
            dimgray
        );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span> {
    <span class="hljs-attribute">background</span>:
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            transparent 40%,
            gray 40%,
            silver 41%,
            dimgray 43%,
            transparent 43%, transparent 48%,
            gray 48%,
            silver 49%,
            dimgray 51%,
            transparent 51%
        ) no-repeat center / <span class="hljs-number">100%</span> <span class="hljs-number">90%</span>, <span class="hljs-comment">/* handles */</span>
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            darkgray,
            lightgray 10%,
            silver 40%, silver 80%,
            darkgray 90%,
            dimgray
        );
}</code></pre><p>&#x5728;&#x51B0;&#x7BB1;&#x8868;&#x9762;&#x7684;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x4E2D;&#x52A0;&#x753B;&#x95E8;&#x7F1D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge {
    background:
        linear-gradient(
            to right,
            transparent 40%,
            gray 40%,
            silver 41%,
            dimgray 43%,
            transparent 43%, transparent 48%,
            gray 48%,
            silver 49%,
            dimgray 51%,
            transparent 51%
        ) no-repeat center / 100% 90%, /* handles */
        linear-gradient(
            to right,
            darkgray,
            lightgray 10%,
            silver 40%, silver 45%,
            black 45%, black 46%,
            silver 46%, silver 80%,
            darkgray 90%,
            dimgray
        );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span> {
    <span class="hljs-attribute">background</span>:
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            transparent 40%,
            gray 40%,
            silver 41%,
            dimgray 43%,
            transparent 43%, transparent 48%,
            gray 48%,
            silver 49%,
            dimgray 51%,
            transparent 51%
        ) no-repeat center / <span class="hljs-number">100%</span> <span class="hljs-number">90%</span>, <span class="hljs-comment">/* handles */</span>
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            darkgray,
            lightgray 10%,
            silver 40%, silver 45%,
            black 45%, black 46%,
            silver 46%, silver 80%,
            darkgray 90%,
            dimgray
        );
}</code></pre><p>&#x7528; before &#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x996E;&#x6C34;&#x673A;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::before {
    content: &apos;&apos;;
    position: absolute;
    width: 6em;
    height: 7.5em;
    background: black;
    top: calc((100% - 7.5em) / 2);
    left: 2.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5em</span>;
    <span class="hljs-attribute">background</span>: black;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>((100% - 7.5em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2.5em</span>;
}</code></pre><p>&#x7528;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x996E;&#x6C34;&#x673A;&#x7684;&#x6321;&#x677F;&#xFF0C;&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x996E;&#x6C34;&#x673A;&#x7684;&#x51FA;&#x6C34;&#x53E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::before {
    background: 
        radial-gradient(
            circle at 50% 22%,
            black, black 1em,
            transparent 1em
        ),
        linear-gradient(
            transparent 25%,
            #222 25%
        ) no-repeat center top / 94% 98%,
        black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 50% 22%,
            black, black 1em,
            transparent 1em
        ),
        <span class="hljs-built_in">linear-gradient</span>(
            transparent 25%,
            #222 25%
        ) no-repeat center top / <span class="hljs-number">94%</span> <span class="hljs-number">98%</span>,
        black;
}</code></pre><p>&#x518D;&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA; 4 &#x4E2A; led &#x706F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::before {
    background: 
        radial-gradient(
            circle at 88% 10%,
            limegreen, limegreen 0.2em,
            transparent 0.2em
        ),
        radial-gradient(
            circle at 75% 10%,
            hotpink, hotpink 0.2em,
            transparent 0.2em
        ),
        radial-gradient(
            circle at 25% 10%,
            dodgerblue, dodgerblue 0.2em,
            transparent 0.2em
        ),
        radial-gradient(
            circle at 12% 10%,
            gold, gold 0.2em,
            transparent 0.2em
        ),
        radial-gradient(
            circle at 50% 22%,
            black, black 1em,
            transparent 1em
        ),
        linear-gradient(
            transparent 25%,
            #222 25%
        ) no-repeat center top / 94% 98%,
        black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 88% 10%,
            limegreen, limegreen 0.2em,
            transparent 0.2em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 75% 10%,
            hotpink, hotpink 0.2em,
            transparent 0.2em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 25% 10%,
            dodgerblue, dodgerblue 0.2em,
            transparent 0.2em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 12% 10%,
            gold, gold 0.2em,
            transparent 0.2em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 50% 22%,
            black, black 1em,
            transparent 1em
        ),
        <span class="hljs-built_in">linear-gradient</span>(
            transparent 25%,
            #222 25%
        ) no-repeat center top / <span class="hljs-number">94%</span> <span class="hljs-number">98%</span>,
        black;
}</code></pre><p>&#x7528; after &#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x676F;&#x5B50;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::after {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 3em;
    background: deepskyblue;
    bottom: calc((100% - 7.5em) / 2);
    left: calc(2.5em + (6em - 2em) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">background</span>: deepskyblue;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>((100% - 7.5em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(2.5em + (6em - 2em) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x7A0D;&#x7A0D;&#x4FEE;&#x6574;&#x676F;&#x5B50;&#x7684;&#x5F62;&#x72B6;&#xFF0C;&#x4F7F;&#x5176;&#x9876;&#x5927;&#x5E95;&#x5C0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::after {
    clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(0 0, 100% 0, 90% 100%, 10% 100%);
}</code></pre><p>&#x8BA9;&#x676F;&#x5B50;&#x9876;&#x90E8;&#x7684;&#x989C;&#x8272;&#x53D8;&#x6D45;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x597D;&#x50CF;&#x676F;&#x91CC;&#x6709;&#x6C34;&#x7684;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::after {
    background:
        linear-gradient(
            to bottom,
            lightskyblue 25%,
            transparent 25%
        ),
        deepskyblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background</span>:
        <span class="hljs-built_in">linear-gradient</span>(
            to bottom,
            lightskyblue 25%,
            transparent 25%
        ),
        deepskyblue;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x7ED9;&#x6C34;&#x91CC;&#x52A0;&#x4E9B;&#x6C14;&#x6CE1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fridge::after {
    background:
        radial-gradient(
            circle at 35% 40%,
            lightblue, lightblue 0.1em,
            transparent 0.4em
        ),
        radial-gradient(
            circle at 65% 60%,
            lightblue, lightblue 0.1em,
            transparent 0.3em
        ),
        radial-gradient(
            circle at 45% 80%,
            lightblue, lightblue 0.1em,
            transparent 0.2em
        ),
        linear-gradient(
            to bottom,
            lightskyblue 25%,
            transparent 25%
        ),
        deepskyblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fridge</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background</span>:
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 35% 40%,
            lightblue, lightblue 0.1em,
            transparent 0.4em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 65% 60%,
            lightblue, lightblue 0.1em,
            transparent 0.3em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 45% 80%,
            lightblue, lightblue 0.1em,
            transparent 0.2em
        ),
        <span class="hljs-built_in">linear-gradient</span>(
            to bottom,
            lightskyblue 25%,
            transparent 25%
        ),
        deepskyblue;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：87# 视频演示如何用 1 个 DOM 元素和纯 CSS 创作一台对开门冰箱

## 原文链接
[https://segmentfault.com/a/1190000015727020](https://segmentfault.com/a/1190000015727020)


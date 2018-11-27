---
title: '前端每日实战：49# 视频演示如何用纯 CSS 创作一支诱人的冰棍' 
date: 2018-11-28 2:30:11
hidden: true
slug: xp5mz8j7dad
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcblP?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcblP?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/vrxzMw" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/vrxzMw</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/vrxzMw" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cnpZEAZ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cnpZEAZ</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;ice-lolly&quot;&gt;
    &lt;div class=&quot;flavors&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;stick&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ice-lolly&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flavors&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stick&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: darkslategray;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: darkslategray;
}</code></pre><p>&#x7ED8;&#x5236;&#x51FA;&#x51B0;&#x68CD;&#x7684;&#x5916;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flavors {
    width: 19em;
    height: 26em;
    font-size: 10px;
    border-radius: 8em 8em 1em 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flavors</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">19em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">26em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8em</span> <span class="hljs-number">8em</span> <span class="hljs-number">1em</span> <span class="hljs-number">1em</span>;
}</code></pre><p>&#x7ED9;&#x51B0;&#x68CD;&#x4E0A;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flavors {
    position: relative;
    overflow: hidden;
}

.flavors::before {
    content: &apos;&apos;;
    position: absolute;
    width: 140%;
    height: 120%;
    background: linear-gradient(
        hotpink 0%,
        hotpink 25%,
        deepskyblue 25%,
        deepskyblue 50%,
        gold 50%,
        gold 75%,
        lightgreen 75%,
        lightgreen 100%);
    z-index: -1;
    left: -20%;
    transform: rotate(-25deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flavors</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.flavors</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">140%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">120%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        hotpink 0%,
        hotpink 25%,
        deepskyblue 25%,
        deepskyblue 50%,
        gold 50%,
        gold 75%,
        lightgreen 75%,
        lightgreen 100%);
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">20%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-25deg);
}</code></pre><p>&#x6765;&#x4E00;&#x70B9;&#x5149;&#x7167;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flavors::after {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 17em;
    background-color: rgba(255, 255, 255, 0.5);
    left: 2em;
    bottom: 2em;
    border-radius: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flavors</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">17em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5);
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x51B0;&#x68CD;&#x7B77;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stick {
    position: relative;
    width: 6em;
    height: 8em;
    background-color: sandybrown;
    left: calc(50% - 6em / 2);
    border-radius: 0 0 3em 3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stick</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">background-color</span>: sandybrown;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(50% - 6em / 2);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">3em</span> <span class="hljs-number">3em</span>;
}</code></pre><p>&#x7ED9;&#x51B0;&#x68CD;&#x7B77;&#x5B50;&#x52A0;&#x4E00;&#x70B9;&#x9634;&#x5F71;&#xFF0C;&#x589E;&#x52A0;&#x7ACB;&#x4F53;&#x611F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stick::after {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: 2.5em;
    background-color: sienna;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stick</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">background-color</span>: sienna;
}</code></pre><p>&#x8BA9;&#x51B0;&#x68CD;&#x7684;&#x8272;&#x5F69;&#x6EDA;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flavors::before {
    animation: moving 100s linear infinite;
}

@keyframes moving {
    to {
        background-position: 0 1000vh;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flavors</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: moving <span class="hljs-number">100s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> moving {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">1000vh</span>;
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x589E;&#x52A0;&#x4EA4;&#x4E92;&#x6548;&#x679C;&#xFF0C;&#x5F53;&#x9F20;&#x6807;&#x60AC;&#x505C;&#x65F6;&#x624D;&#x64AD;&#x653E;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flavors::before {
    animation-play-state: paused;
}

.ice-lolly:hover .flavors::before {
    animation-play-state: running;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flavors</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation-play-state</span>: paused;
}

<span class="hljs-selector-class">.ice-lolly</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.flavors</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation-play-state</span>: running;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：49# 视频演示如何用纯 CSS 创作一支诱人的冰棍

## 原文链接
[https://segmentfault.com/a/1190000015257561](https://segmentfault.com/a/1190000015257561)


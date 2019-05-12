---
title: '前端每日实战：73# 视频演示如何用纯 CSS 创作一只卡通狐狸' 
date: 2018-11-24 2:30:10
hidden: true
slug: ox8t2to1vf
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdtFZ?w=500&amp;h=500" src="https://static.alili.tech/img/bVbdtFZ?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/OEKZed" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/OEKZed</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/OEKZed" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cvEm3uq" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cvEm3uq</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5373;&#x5934;&#x548C;&#x5C3E;&#x5DF4;&#xFF0C;<code>&lt;head&gt;</code> &#x518D;&#x5305;&#x542B; 4 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x8868;&#x793A;&#x8138;&#x988A;&#x3001;&#x773C;&#x775B;&#x3001;&#x8033;&#x6735;&#x548C;&#x9F3B;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;fox&quot;&gt;
    &lt;div class=&quot;head&quot;&gt;
        &lt;span class=&quot;faces&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;eyes&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;ears&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;nose&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;tail&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fox&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;head&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;faces&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;eyes&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ears&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;nose&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tail&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    --bc: teal;
    background-color: var(--bc);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">--bc</span>: teal;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--bc);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox {
    width: 7em;
    height: 9em;
    font-size: 30px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">9em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5706;&#x5F62;&#x7684;&#x5934;&#x90E8;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox {
    --c: chocolate;
    position: relative;
    color: var(--c);
}

.fox .head {
    position: absolute;
    width: 6em;
    height: 6em;
    background-color: currentColor;
    border-radius: 50%;
    right: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> {
    <span class="hljs-attribute">--c</span>: chocolate;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--c);
}

<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.head</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x53F6;&#x7247;&#x5F62;&#x7684;&#x8138;&#x988A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .faces::before,
.fox .faces::after {
    content: &apos;&apos;;
    position: absolute;
    width: 3em;
    height: 3em;
    background-color: white;
    border-radius: 0 100% 0 100%;
    top: 3em;
}

.fox .faces::after {
    right: 0;
    transform: rotate(-90deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.faces</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.faces</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3em</span>;
}

<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.faces</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-90deg);
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x773C;&#x775B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .eyes::before,
.fox .eyes::after {
    content: &apos;&apos;;
    position: absolute;
    border: 0.3em solid;
    border-color: black black transparent transparent;
    border-radius: 50%;
    top: 4.5em;
}

.fox .eyes::before {
    left: 1em;
}

.fox .eyes::after {
    right: 1em;
    transform: rotate(-90deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.3em</span> solid;
    <span class="hljs-attribute">border-color</span>: black black transparent transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">4.5em</span>;
}

<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-90deg);
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x8033;&#x6735;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .ears::before,
.fox .ears::after {
    width: 3em;
    height: 3em;
    background-color: currentColor;
    filter: brightness(1.25);
    border-radius: 0 100% 0 0;
    z-index: -1;
}

.fox .ears::after {
    right: 0;
    transform: rotate(-90deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">brightness</span>(1.25);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.ears</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-90deg);
}</code></pre><p>&#x753B;&#x51FA;&#x5706;&#x5F62;&#x7684;&#x9F3B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .nose{
    position: absolute;
    width: 1em;
    height: 1em;
    background-color: black;
    border-radius: 50%;
    top: calc(6em - 1em / 2);
    right: calc((6em - 1em) / 2);
    transform: scale(0.9);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.nose</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(6em - 1em / 2);
    <span class="hljs-attribute">right</span>: <span class="hljs-built_in">calc</span>((6em - 1em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.9);
}</code></pre><p>&#x753B;&#x51FA;&#x5706;&#x5F62;&#x7684;&#x5C3E;&#x5DF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .tail{
    width: 7em;
    height: 7em;
    background-color: currentColor;
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    bottom: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.tail</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x53BB;&#x6389;&#x5C3E;&#x5DF4;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x6247;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .tail::before {
    content: &apos;&apos;;
    position: absolute;
    width: calc(7em / 2);
    height: calc(7em / 2);
    background-color: var(--bc);
    border-radius: 100% 0 0 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.tail</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(7em / 2);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(7em / 2);
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--bc);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x5C3E;&#x5DF4;&#x5C16;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox .tail{
    overflow: hidden;
}

.fox .tail::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    border-radius: 0 0 100% 0;
    background: white;
    bottom: calc(7em / 2 - 1em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.tail</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.fox</span> <span class="hljs-selector-class">.tail</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: white;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(7em / 2 - 1em);
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x589E;&#x52A0;&#x9F20;&#x6807;&#x60AC;&#x505C;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fox {
    transition: 1s;
}

.fox:hover {
    --c: lightblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fox</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">1s</span>;
}

<span class="hljs-selector-class">.fox</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">--c</span>: lightblue;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：73# 视频演示如何用纯 CSS 创作一只卡通狐狸

## 原文链接
[https://segmentfault.com/a/1190000015566332](https://segmentfault.com/a/1190000015566332)


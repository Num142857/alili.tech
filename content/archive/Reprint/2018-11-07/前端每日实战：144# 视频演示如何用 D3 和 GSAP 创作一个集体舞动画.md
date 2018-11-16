---
title: '前端每日实战：144# 视频演示如何用 D3 和 GSAP 创作一个集体舞动画'
hidden: true
categories: [reprint]
slug: ced39d61
date: 2018-11-07 02:30:13
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbht5j?w=400&amp;h=301" src="https://static.alili.tech/img/bVbht5j?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/gdVObN" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/gdVObN</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/gdVObN" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/caRLack" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/caRLack</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5B50;&#x5BB9;&#x5668;&#xFF0C;<code>.horizontal</code> &#x4EE3;&#x8868;&#x6C34;&#x5E73;&#x7684;&#x7EBF;&#x6BB5;&#xFF0C;<code>.vertical</code> &#x4EE3;&#x8868;&#x5782;&#x76F4;&#x7684;&#x7EBF;&#x6BB5;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B50;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 4 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;horizontal&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;vertical&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;vertical&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
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
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF0C;&#x5176;&#x4E2D; <code>--side-length</code> &#x662F;&#x65B9;&#x9635;&#x7684;&#x6BCF;&#x4E00;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x6570;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    --side-length: 2;
    position: relative;
    width: calc(40px * calc(var(--side-length)));
    height: calc(40px * calc(var(--side-length)));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">--side-length</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(40px * calc(var(--side-length)));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(40px * calc(var(--side-length)));
}</code></pre><p>&#x7528; grid &#x5E03;&#x5C40;&#x6392;&#x5217;&#x5B50;&#x5143;&#x7D20;&#xFF0C;4 &#x4E2A;&#x5143;&#x7D20;&#x6392;&#x5217;&#x6210; 2 * 2 &#x7684;&#x65B9;&#x9635;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container .horizontal,
.container .vertical {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(var(--side-length), 1fr);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.horizontal</span>,
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.vertical</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(var(--side-length), <span class="hljs-number">1</span>fr);
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#xFF0C;<code>.horizontal</code> &#x5185;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x662F;&#x6A2A;&#x6761;&#xFF0C;<code>.vertical</code> &#x5185;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x662F;&#x7AD6;&#x6761;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container .horizontal span {
    width: 40px;
    height: 10px;
    background: #fff;
    margin: 15px 0;
}

.container .vertical span {
    width: 10px;
    height: 40px;
    background: #fff;
    margin: 0 15px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.horizontal</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.vertical</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">15px</span>;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x9759;&#x6001;&#x5E03;&#x5C40;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6279;&#x91CF;&#x5904;&#x7406;&#x5B50;&#x5143;&#x7D20;&#x3002;<br>&#x5F15;&#x5165; d3 &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x5220;&#x9664;&#x6389; html &#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5B50;&#x5143;&#x7D20; dom &#x8282;&#x70B9;&#xFF0C;&#x5220;&#x9664;&#x6389; css &#x6587;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684; css &#x53D8;&#x91CF;&#x3002;<br>&#x5B9A;&#x4E49;&#x65B9;&#x9635;&#x6BCF;&#x4E00;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x6570;&#x91CF;&#xFF0C;&#x5E76;&#x628A;&#x8FD9;&#x4E2A;&#x6570;&#x503C;&#x8D4B;&#x7ED9; css &#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SIDE_LENGTH = 2;

let container = d3.select(&apos;.container&apos;)
    .style(&apos;--side-length&apos;, SIDE_LENGTH);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> SIDE_LENGTH = <span class="hljs-number">2</span>;

<span class="hljs-keyword">let</span> container = d3.select(<span class="hljs-string">&apos;.container&apos;</span>)
    .style(<span class="hljs-string">&apos;--side-length&apos;</span>, SIDE_LENGTH);</code></pre><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6DFB;&#x52A0; <code>span</code> &#x5B50;&#x5143;&#x7D20;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x6DFB;&#x52A0;&#x6A2A;&#x5411;&#x548C;&#x7AD6;&#x5411;&#x7684;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function appendSpan(selector) {
    container.select(selector)
    .selectAll(&apos;span&apos;)
    .data(d3.range(SIDE_LENGTH * SIDE_LENGTH))
    .enter()
    .append(&apos;span&apos;);
}

appendSpan(&apos;.horizontal&apos;);
appendSpan(&apos;.vertical&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appendSpan</span>(<span class="hljs-params">selector</span>) </span>{
    container.select(selector)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(SIDE_LENGTH * SIDE_LENGTH))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>);
}

appendSpan(<span class="hljs-string">&apos;.horizontal&apos;</span>);
appendSpan(<span class="hljs-string">&apos;.vertical&apos;</span>);</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x5E03;&#x5C40;&#x5DF2;&#x6539;&#x4E3A;&#x52A8;&#x6001;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4FEE;&#x6539; <code>SIDE_LENGTH</code> &#x7684;&#x503C;&#x6765;&#x521B;&#x5EFA;&#x4E0D;&#x540C;&#x8FB9;&#x957F;&#x7684;&#x65B9;&#x9635;&#xFF0C;&#x6BD4;&#x5982;&#x4EE5;&#x4E0B;&#x8BED;&#x53E5;&#x5C06;&#x521B;&#x5EFA; 5 * 5 &#x7684;&#x65B9;&#x9635;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SIDE_LENGTH = 5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> SIDE_LENGTH = <span class="hljs-number">5</span>;</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7528; GSAP &#x521B;&#x5EFA;&#x52A8;&#x753B;&#x3002;&#xFF08;&#x6CE8;&#xFF1A;&#x56E0; scrimba &#x5728;&#x4F7F;&#x7528; gsap &#x65F6;&#x4F1A;&#x5D29;&#x6E83;&#xFF0C;&#x6240;&#x4EE5;&#x89C6;&#x9891;&#x6F14;&#x793A;&#x91C7;&#x7528; css &#x52A8;&#x753B;&#xFF0C;&#x4F46; codepen &#x548C; github &#x5747;&#x91C7;&#x7528; gsap &#x52A8;&#x753B;&#xFF09;<br>&#x5F15;&#x5165; GSAP &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x58F0;&#x660E;&#x52A8;&#x753B;&#x53D8;&#x91CF; <code>animation</code>&#xFF0C;&#x58F0;&#x660E;&#x4EE3;&#x8868; dom &#x5143;&#x7D20;&#x7684;&#x53D8;&#x91CF; <code>$horizontalSpan</code> &#x548C; <code>$verticalSpan</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animation = new TimelineMax({repeat: -1});
let $horizontalSpan = &apos;.container .horizontal span&apos;;
let $verticalSpan = &apos;.container .vertical span&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> animation = <span class="hljs-keyword">new</span> TimelineMax({<span class="hljs-attr">repeat</span>: <span class="hljs-number">-1</span>});
<span class="hljs-keyword">let</span> $horizontalSpan = <span class="hljs-string">&apos;.container .horizontal span&apos;</span>;
<span class="hljs-keyword">let</span> $verticalSpan = <span class="hljs-string">&apos;.container .vertical span&apos;</span>;</code></pre><p>&#x5148;&#x521B;&#x5EFA;&#x6A2A;&#x6761;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x5171;&#x5206;&#x6210; 4 &#x6B65;&#xFF0C;&#x6BCF;&#x4E2A; <code>to</code> &#x8BED;&#x53E5;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6B65;&#x9AA4;&#x7684;&#x540D;&#x79F0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.to($horizontalSpan, 1, {rotation: 45}, &apos;step1&apos;)
    .to($horizontalSpan, 1, {x: &apos;-10px&apos;, y: &apos;-10px&apos;}, &apos;step2&apos;)
    .to($horizontalSpan, 1, {rotation: 0, x: &apos;0&apos;, y: &apos;0&apos;, scaleY: 2, scaleX: 0.5}, &apos;step3&apos;)
    .to($horizontalSpan, 1, {rotation: 90, scaleY: 1, scaleX: 1}, &apos;step4&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.to($horizontalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">rotation</span>: <span class="hljs-number">45</span>}, <span class="hljs-string">&apos;step1&apos;</span>)
    .to($horizontalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-10px&apos;</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-10px&apos;</span>}, <span class="hljs-string">&apos;step2&apos;</span>)
    .to($horizontalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">rotation</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>}, <span class="hljs-string">&apos;step3&apos;</span>)
    .to($horizontalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">rotation</span>: <span class="hljs-number">90</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>}, <span class="hljs-string">&apos;step4&apos;</span>)</code></pre><p>&#x518D;&#x521B;&#x5EFA;&#x7AD6;&#x6761;&#x7684;&#x52A8;&#x753B;&#xFF0C;<code>to</code> &#x8BED;&#x53E5;&#x7684;&#x6B65;&#x9AA4;&#x540D;&#x79F0;&#x4E0E;&#x6A2A;&#x6761;&#x7684;&#x6B65;&#x9AA4;&#x540D;&#x79F0;&#x76F8;&#x540C;&#xFF0C;&#x4EE5;&#x4FBF;&#x4E0E;&#x6A2A;&#x6761;&#x4FDD;&#x6301;&#x52A8;&#x753B;&#x540C;&#x6B65;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.to($verticalSpan, 1, {rotation: 45}, &apos;step1&apos;)
    .to($verticalSpan, 1, {x: &apos;10px&apos;, y: &apos;10px&apos;}, &apos;step2&apos;)
    .to($verticalSpan, 1, {x: &apos;0&apos;, y: &apos;0&apos;, scaleX: 2, scaleY: 0.5}, &apos;step3&apos;)
    .to($verticalSpan, 1, {rotation: 90, scaleX: 1, scaleY: 1}, &apos;step4&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.to($verticalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">rotation</span>: <span class="hljs-number">45</span>}, <span class="hljs-string">&apos;step1&apos;</span>)
    .to($verticalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;10px&apos;</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">&apos;10px&apos;</span>}, <span class="hljs-string">&apos;step2&apos;</span>)
    .to($verticalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>}, <span class="hljs-string">&apos;step3&apos;</span>)
    .to($verticalSpan, <span class="hljs-number">1</span>, {<span class="hljs-attr">rotation</span>: <span class="hljs-number">90</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>}, <span class="hljs-string">&apos;step4&apos;</span>);</code></pre><p>&#x5728;&#x52A8;&#x753B;&#x7684;&#x672B;&#x5C3E;&#x7528;&#x65F6;&#x95F4;&#x5C3A;&#x5EA6;&#x7F29;&#x653E;&#x51FD;&#x6570;&#x8BA9;&#x52A8;&#x753B;&#x64AD;&#x653E;&#x901F;&#x5EA6;&#x52A0;&#x5FEB;&#x4E00;&#x500D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.timeScale(2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">animation.timeScale(<span class="hljs-number">2</span>);</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x65B9;&#x9635;&#x7684;&#x8FB9;&#x957F;&#x6539;&#x4E3A; 10&#xFF0C;&#x65B9;&#x9635;&#x8D8A;&#x5927;&#x5C31;&#x8D8A;&#x6709;&#x6C14;&#x52BF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SIDE_LENGTH = 10;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> SIDE_LENGTH = <span class="hljs-number">10</span>;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：144# 视频演示如何用 D3 和 GSAP 创作一个集体舞动画

## 原文链接
[https://segmentfault.com/a/1190000016521212](https://segmentfault.com/a/1190000016521212)


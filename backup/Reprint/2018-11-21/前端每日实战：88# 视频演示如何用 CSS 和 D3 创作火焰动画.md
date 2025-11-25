---
title: '前端每日实战：88# 视频演示如何用 CSS 和 D3 创作火焰动画' 
date: 2018-11-21 2:30:10
hidden: true
slug: 7m7utpiyox3
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbec4L?w=400&amp;h=300" src="https://static.alili.tech/img/bVbec4L?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/xJdVxx" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/xJdVxx</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/xJdVxx" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cP6LRSk" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cP6LRSk</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 3 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x4EE3;&#x8868;&#x7EC4;&#x6210;&#x706B;&#x7130;&#x7684; 1 &#x4E2A;&#x706B;&#x82D7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;flame&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flame&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(black, maroon);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(black, maroon);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flame {
    width: 10em;
    height: 12em;
    font-size: 24px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flame</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x706B;&#x82D7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flame {
    position: relative;
}

.flame span {
    position: absolute;
    width: 5em;
    height: 5em;
    background: radial-gradient(
        orangered 20%,
        rgba(255, 69, 0, 0) 70%
    );
    border-radius: 50%;
    bottom: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flame</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(
        orangered 20%,
        rgba(255, 69, 0, 0) <span class="hljs-number">70%</span>
    );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x753B;&#x51FA;&#x591A;&#x4E2A;&#x706B;&#x82D7;&#xFF0C;&#x5176;&#x4E2D; --particles &#x662F;&#x706B;&#x82D7;&#x7684;&#x6570;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flame {
    --particles: 3;
}

.flame span {
    left: calc((var(--n) - 1) * 5em / var(--particles));
}

.flame span:nth-child(1) {
  --n: 1;
}

.flame span:nth-child(2) {
  --n: 2;
}

.flame span:nth-child(3) {
  --n: 3;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flame</span> {
    <span class="hljs-attribute">--particles</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((var(--n) - <span class="hljs-number">1</span>) * <span class="hljs-number">5em</span> / <span class="hljs-built_in">var</span>(--particles));
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}</code></pre><p>&#x4FEE;&#x6539;&#x6DF7;&#x5408;&#x6A21;&#x5F0F;&#xFF0C;&#x4F7F;&#x706B;&#x82D7;&#x91CD;&#x53E0;&#x7684;&#x90E8;&#x5206;&#x53D8;&#x4EAE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flame span {
    mix-blend-mode: screen;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">mix-blend-mode</span>: screen;
}</code></pre><p>&#x589E;&#x52A0;&#x706B;&#x7130;&#x5347;&#x817E;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flame span {
    animation: rise 1s ease-in infinite;
}

@keyframes rise {
    from {
        transform: translateY(0) scale(1);
        filter: opacity(0);
    }
    
    25% {
        filter: opacity(1);
    }
    
    to {
        transform: translateY(-10em) scale(0);
        filter: opacity(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: rise <span class="hljs-number">1s</span> ease-in infinite;
}

@<span class="hljs-keyword">keyframes</span> rise {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0) <span class="hljs-built_in">scale</span>(1);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }
    
    25% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }
    
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-10em) <span class="hljs-built_in">scale</span>(0);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x706B;&#x82D7;&#x5347;&#x8D77;&#x7684;&#x5EF6;&#x65F6;&#x65F6;&#x95F4;&#xFF0C;&#x4F7F;&#x706B;&#x82D7;&#x9646;&#x7EED;&#x5347;&#x8D77;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flame span {
    animation-delay: calc(var(--rnd) * 1s);
}

.flame span:nth-child(1) {
  --n: 1;
  --rnd: 0.1234;
}

.flame span:nth-child(2) {
  --n: 2;
  --rnd: 0.3456;
}

.flame span:nth-child(3) {
  --n: 3;
  --rnd: 0.6789;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(var(--rnd) * <span class="hljs-number">1s</span>);
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">--rnd</span>: <span class="hljs-number">0.1234</span>;
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">--rnd</span>: <span class="hljs-number">0.3456</span>;
}

<span class="hljs-selector-class">.flame</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
  <span class="hljs-attribute">--rnd</span>: <span class="hljs-number">0.6789</span>;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6765;&#x6279;&#x91CF;&#x5904;&#x7406; dom&#x3002;<br>&#x5F15;&#x7528; d3 &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7528; d3 &#x4E3A; css &#x4E2D;&#x7684; --particles &#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_PARTICLES = 3;

d3.select(&apos;.flame&apos;)
    .style(&apos;--particles&apos;, COUNT_OF_PARTICLES);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COUNT_OF_PARTICLES = <span class="hljs-number">3</span>;

d3.select(<span class="hljs-string">&apos;.flame&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles&apos;</span>, COUNT_OF_PARTICLES);</code></pre><p>&#x7528; d3 &#x521B;&#x5EFA; dom &#x4E2D;&#x7684;&#x706B;&#x82D7;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.flame&apos;)
    .style(&apos;--particles&apos;, COUNT_OF_PARTICLES)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(&apos;span&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.flame&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles&apos;</span>, COUNT_OF_PARTICLES)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>);</code></pre><p>&#x7528; d3 &#x4E3A;&#x706B;&#x82D7;&#x5143;&#x7D20;&#x7684; css &#x4E2D;&#x7684; --n &#x548C; --rnd &#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.flame&apos;)
    .style(&apos;--particles&apos;, COUNT_OF_PARTICLES)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;--n&apos;, (d) =&gt; d + 1)
    .style(&apos;--rnd&apos;, () =&gt; Math.random());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.flame&apos;</span>)
    .style(<span class="hljs-string">&apos;--particles&apos;</span>, COUNT_OF_PARTICLES)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT_OF_PARTICLES))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;--n&apos;</span>, (d) =&gt; d + <span class="hljs-number">1</span>)
    .style(<span class="hljs-string">&apos;--rnd&apos;</span>, () =&gt; <span class="hljs-built_in">Math</span>.random());</code></pre><p>&#x5220;&#x9664;&#x6389; dom &#x4E2D;&#x7684;&#x706B;&#x82D7;&#x5143;&#x7D20;&#xFF0C;&#x5220;&#x9664;&#x6389; css &#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x706B;&#x82D7;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E3A; 100 &#x4E2A;&#xFF0C;&#x5F62;&#x6210;&#x706B;&#x7130;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT_OF_PARTICLES = 100;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> COUNT_OF_PARTICLES = <span class="hljs-number">100</span>;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：88# 视频演示如何用 CSS 和 D3 创作火焰动画

## 原文链接
[https://segmentfault.com/a/1190000015740846](https://segmentfault.com/a/1190000015740846)


---
title: '前端每日实战：133# 视频演示如何用 CSS 和 GSAP 创作有多个关键帧的连续动画'
hidden: true
categories: [reprint]
slug: 5d7851a5
date: 2018-11-10 02:30:10
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbgOQt?w=400&amp;h=302" src="https://static.alili.tech/img/bVbgOQt?w=400&amp;h=302" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/eLMKJG" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/eLMKJG</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/eLMKJG" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cdDRmH9" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cdDRmH9</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 10 &#x4E2A; <code>div</code> &#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x6BCF;&#x4E2A; <code>div</code> &#x4E2D;&#x5305;&#x542B; 1 &#x4E2A; <code>span</code> &#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;figure class=&quot;container&quot;&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
    &lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightyellow;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: lightyellow;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x7684;&#x5C3A;&#x5BF8;&#x548C;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 400px;
    height: 400px;
    background: linear-gradient(45deg, tomato, gold);
    border-radius: 3%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(45deg, tomato, gold);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
}</code></pre><p>&#x753B;&#x51FA;&#x5BB9;&#x5668;&#x91CC;&#x7684; 1 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5B83;&#x6709;&#x4E00;&#x4E2A;&#x5916;&#x58F3; <code>div</code>&#xFF0C;&#x91CC;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x767D;&#x8272;&#x7684;&#x5C0F;&#x65B9;&#x5757; <code>span</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    position: relative;
}

.container div {
    position: absolute;
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container div span {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">background-color</span>: white;
}</code></pre><p>&#x4E3A;&#x5BB9;&#x5668;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5B9A;&#x4E49;&#x4E0B;&#x6807;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x8BA9;&#x5143;&#x7D20;&#x7684;&#x5916;&#x58F3;&#x4F9D;&#x6B21;&#x65CB;&#x8F6C;&#xFF0C;&#x56F4;&#x5408;&#x6210;&#x4E00;&#x4E2A;&#x5706;&#x5F62;&#xFF0C;&#x5176;&#x4E2D; <code>outline</code> &#x662F;&#x8F85;&#x52A9;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container div {
    outline: 1px dashed black;
    transform: rotate(calc((var(--n) - 1) * 36deg));
}

.container div:nth-child(1) { --n: 1; }
.container div:nth-child(2) { --n: 2; }
.container div:nth-child(3) { --n: 3; }
.container div:nth-child(4) { --n: 4; }
.container div:nth-child(5) { --n: 5; }
.container div:nth-child(6) { --n: 6; }
.container div:nth-child(7) { --n: 7; }
.container div:nth-child(8) { --n: 8; }
.container div:nth-child(9) { --n: 9; }
.container div:nth-child(10) { --n: 10; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">1px</span> dashed black;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(calc((var(--n) - <span class="hljs-number">1</span>) * <span class="hljs-number">36deg</span>));
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(1)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(2)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(3)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(4)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(5)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(6)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(7)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">7</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(8)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">8</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(9)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">9</span>; }
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(10)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">10</span>; }</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x7ED8;&#x5236;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5F00;&#x59CB;&#x5199;&#x52A8;&#x753B;&#x811A;&#x672C;&#x3002;<br>&#x5F15;&#x5165; GSAP &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x4EE3;&#x8868;&#x5B50;&#x5143;&#x7D20;&#x9009;&#x62E9;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let elements = &apos;.container div span&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> elements = <span class="hljs-string">&apos;.container div span&apos;</span>;</code></pre><p>&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x7EBF;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animation = new TimelineMax();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> animation = <span class="hljs-keyword">new</span> TimelineMax();</code></pre><p>&#x5148;&#x8BBE;&#x5B9A;&#x5165;&#x573A;&#x65B9;&#x5F0F;&#x4E3A;&#x7531;&#x5C0F;&#xFF08;&#x7B2C;1&#x5E27;&#xFF09;&#x53D8;&#x5927;&#xFF08;&#x7B2C;2&#x5E27;&#xFF09;&#xFF0C;&#x5176;&#x4E2D;&#x5E76;&#x6CA1;&#x6709;&#x7B2C; 2 &#x5E27;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5B83;&#x662F;&#x9690;&#x542B;&#x5728;&#x8BED;&#x4E49;&#x4E2D;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>});</code></pre><p>&#x8BA9;&#x5B50;&#x5143;&#x7D20;&#x53D8;&#x6210;&#x7AD6;&#x957F;&#x6761;&#xFF0C;&#x5411;&#x56DB;&#x5468;&#x6563;&#x5F00;&#xFF08;&#x7B2C;3&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>});</code></pre><p>&#x8BA9;&#x7AD6;&#x957F;&#x6761;&#x65CB;&#x8F6C;&#x7740;&#x53D8;&#x6210;&#x5C0F;&#x65B9;&#x5757;&#xFF08;&#x7B2C;4&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>});</code></pre><p>&#x8BA9;&#x5C0F;&#x65B9;&#x5757;&#x53D8;&#x6210;&#x6A2A;&#x957F;&#x6761;&#xFF0C;&#x56F4;&#x6210;&#x4E00;&#x4E2A;&#x5706;&#x5F62;&#xFF08;&#x7B2C;5&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>});</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x56E0; scrimba &#x5728;&#x5F55;&#x5236;&#x8FC7;&#x591A;&#x5E27;&#x65F6;&#x4F1A;&#x5D29;&#x6E83;&#xFF0C;&#x6240;&#x4EE5;&#x7B2C; 6 &#x5E27;&#x81F3;&#x7B2C; 11 &#x5E27;&#x6CA1;&#x6709;&#x5728;&#x89C6;&#x9891;&#x4E2D;&#x4F53;&#x73B0;&#x3002;<br>&#x8BA9;&#x5706;&#x5F62;&#x5411;&#x5185;&#x6536;&#x655B;&#xFF0C;&#x540C;&#x65F6;&#x7EBF;&#x6761;&#x53D8;&#x7EC6;&#xFF08;&#x7B2C;6&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>});</code></pre><p>&#x8BA9;&#x7EBF;&#x6761;&#x5411;&#x5DE6;&#x6446;&#x52A8;&#xFF08;&#x7B2C;7&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>});</code></pre><p>&#x518D;&#x8BA9;&#x7EBF;&#x6761;&#x5411;&#x53F3;&#x6446;&#x52A8;&#xFF08;&#x7B2C;8&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>});</code></pre><p>&#x518D;&#x628A;&#x6A2A;&#x7EBF;&#x53D8;&#x4E3A;&#x7AD6;&#x7EBF;&#xFF0C;&#x9020;&#x578B;&#x4E0E;&#x7B2C; 3 &#x5E27;&#x76F8;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x7EBF;&#x66F4;&#x7EC6;&#xFF0C;&#x66F4;&#x5411;&#x5185;&#x6536;&#x655B;&#xFF08;&#x7B2C;9&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;})
    .to(elements, 1, {x: &apos;0&apos;, scaleX: 0.1, scaleY: 1});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>});</code></pre><p>&#x518D;&#x628A;&#x7AD6;&#x7EBF;&#x53D8;&#x4E3A;&#x6A2A;&#x7EBF;&#xFF0C;&#x9020;&#x578B;&#x4E0E;&#x7B2C; 5 &#x5E27;&#x76F8;&#x4F3C;&#xFF0C;&#x4F46;&#x7EBF;&#x77ED;&#x4E00;&#x4E9B;&#xFF08;&#x7B2C;10&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;})
    .to(elements, 1, {x: &apos;0&apos;, scaleX: 0.1, scaleY: 1})
    .to(elements, 1, {scaleX: 0.5, scaleY: 0.1})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})</code></pre><p>&#x6A2A;&#x7EBF;&#x7A0D;&#x5411;&#x5916;&#x6269;&#x6563;&#xFF0C;&#x53D8;&#x4E3A;&#x5706;&#x70B9;&#xFF08;&#x7B2C;11&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;})
    .to(elements, 1, {x: &apos;0&apos;, scaleX: 0.1, scaleY: 1})
    .to(elements, 1, {scaleX: 0.5, scaleY: 0.1})
    .to(elements, 1, {y: &apos;-80px&apos;, scaleY: 0.5, borderRadius: &apos;50%&apos;});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-80px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;50%&apos;</span>});</code></pre><p>&#x8BA9;&#x5706;&#x70B9;&#x53D8;&#x5F62;&#x4E3A;&#x7AD6;&#x7EBF;&#xFF0C;&#x5E76;&#x5411;&#x5185;&#x6536;&#x7F29;&#xFF0C;&#x8FD9;&#x4E2A;&#x53D8;&#x5316;&#x7684;&#x8DDD;&#x79BB;&#x957F;&#xFF0C;&#x6240;&#x4EE5;&#x52A8;&#x753B;&#x65F6;&#x95F4;&#x4E5F;&#x8981;&#x957F;&#x4E00;&#x4E9B;&#xFF08;&#x7B2C;12&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;})
    .to(elements, 1, {x: &apos;0&apos;, scaleX: 0.1, scaleY: 1})
    .to(elements, 1, {scaleX: 0.5, scaleY: 0.1})
    .to(elements, 1, {y: &apos;-80px&apos;, scaleY: 0.5, borderRadius: &apos;50%&apos;})
    .to(elements, 1, {y: &apos;-10px&apos;, scaleX: 0.1, scaleY: 0.5, borderRadius: &apos;0%&apos;, rotation: 0});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-80px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;50%&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-10px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;0%&apos;</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">0</span>});</code></pre><p>&#x8BA9;&#x7AD6;&#x7EBF;&#x4ECE;&#x4E2D;&#x5FC3;&#x5411;&#x5916;&#x5FEB;&#x901F;&#x6269;&#x6563;&#xFF0C;&#x6269;&#x6563;&#x524D;&#x7A0D;&#x505C;&#x7247;&#x523B;&#xFF0C;&#x597D;&#x50CF;&#x7EBF;&#x6761;&#x90FD;&#x88AB;&#x53D1;&#x5C04;&#x51FA;&#x4E00;&#x6837;&#xFF08;&#x7B2C;13&#x5E27;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;})
    .to(elements, 1, {x: &apos;0&apos;, scaleX: 0.1, scaleY: 1})
    .to(elements, 1, {scaleX: 0.5, scaleY: 0.1})
    .to(elements, 1, {y: &apos;-80px&apos;, scaleY: 0.5, borderRadius: &apos;50%&apos;})
    .to(elements, 1, {y: &apos;-10px&apos;, scaleX: 0.1, scaleY: 0.5, borderRadius: &apos;0%&apos;, rotation: 0})
    .to(elements, 1, {y: &apos;-300px&apos;, delay: 0.5});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-80px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;50%&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-10px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;0%&apos;</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-300px&apos;</span>, <span class="hljs-attr">delay</span>: <span class="hljs-number">0.5</span>});</code></pre><p>&#x7528;&#x65F6;&#x95F4;&#x5C3A;&#x5EA6;&#x7F29;&#x653E;&#x51FD;&#x6570;&#x8BA9;&#x52A8;&#x753B;&#x64AD;&#x653E;&#x901F;&#x5EA6;&#x52A0;&#x5FEB;&#x4E00;&#x500D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(elements, 1, {scale: 0})
    .to(elements, 1, {y: &apos;-100px&apos;, scaleX: 0.25})
    .to(elements, 1, {scaleY: 0.25, rotation: 180})
    .to(elements, 1, {scaleX: 1})
    .to(elements, 1, {y: &apos;-60px&apos;, scaleY: 0.1})
    .to(elements, 1, {x: &apos;-30px&apos;})
    .to(elements, 1, {x: &apos;30px&apos;})
    .to(elements, 1, {x: &apos;0&apos;, scaleX: 0.1, scaleY: 1})
    .to(elements, 1, {scaleX: 0.5, scaleY: 0.1})
    .to(elements, 1, {y: &apos;-80px&apos;, scaleY: 0.5, borderRadius: &apos;50%&apos;})
    .to(elements, 1, {y: &apos;-10px&apos;, scaleX: 0.1, scaleY: 0.5, borderRadius: &apos;0%&apos;, rotation: 0})
    .to(elements, 1, {y: &apos;-300px&apos;, delay: 0.5})
    .timeScale(2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-100px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.25</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.25</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">180</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-60px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;-30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;30px&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">x</span>: <span class="hljs-string">&apos;0&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.1</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-80px&apos;</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;50%&apos;</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-10px&apos;</span>, <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.1</span>, <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&apos;0%&apos;</span>, <span class="hljs-attr">rotation</span>: <span class="hljs-number">0</span>})
    .to(elements, <span class="hljs-number">1</span>, {<span class="hljs-attr">y</span>: <span class="hljs-string">&apos;-300px&apos;</span>, <span class="hljs-attr">delay</span>: <span class="hljs-number">0.5</span>})
    .timeScale(<span class="hljs-number">2</span>);</code></pre><p>&#x4FEE;&#x6539;&#x58F0;&#x660E;&#x65F6;&#x95F4;&#x7EBF;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F7F;&#x52A8;&#x753B;&#x91CD;&#x590D;&#x64AD;&#x653E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animation = new TimelineMax({repeat: -1, repeatDelay: 1});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> animation = <span class="hljs-keyword">new</span> TimelineMax({<span class="hljs-attr">repeat</span>: <span class="hljs-number">-1</span>, <span class="hljs-attr">repeatDelay</span>: <span class="hljs-number">1</span>});</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x52A8;&#x753B;&#x5B8C;&#x6210;&#x3002;<br>&#x9690;&#x85CF;&#x5BB9;&#x5668;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5E76;&#x5220;&#x6389;&#x8F85;&#x52A9;&#x7EBF;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    overflow: hidden;
}

.container div {
    /* outline: 1px dashed black; */
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-comment">/* outline: 1px dashed black; */</span>
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x88C5;&#x9970;&#x4E00;&#x4E0B;&#x9875;&#x9762;&#x7684;&#x89D2;&#x843D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    overflow: hidden;
}

body::before,
body::after {
    content: &apos;&apos;;
    position: absolute;
    width: 60vmin;
    height: 60vmin;
    border-radius: 50%;
    background: radial-gradient(
        transparent 25%,
        gold 25%, gold 50%,
        tomato 50%
    );
}

body::before {
    left: -30vmin;
    bottom: -30vmin;
}

body::after {
    right: -30vmin;
    top: -30vmin;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60vmin</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(
        transparent 25%,
        gold 25%, gold 50%,
        tomato 50%
    );
}

<span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">30vmin</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">30vmin</span>;
}

<span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">30vmin</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">30vmin</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：133# 视频演示如何用 CSS 和 GSAP 创作有多个关键帧的连续动画

## 原文链接
[https://segmentfault.com/a/1190000016362691](https://segmentfault.com/a/1190000016362691)


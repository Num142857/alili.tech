---
title: '前端每日实战：134# 视频演示如何用 CSS 和 GSAP 创作一个树枝发芽的 loader'
hidden: true
categories: [reprint]
slug: 59ba80a0
date: 2018-11-10 02:30:10
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbgSKa?w=400&amp;h=302" src="https://static.alili.tech/img/bVbgSKa?w=400&amp;h=302" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/LJmpXZ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/LJmpXZ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/LJmpXZ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cdD8WHV" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cdD8WHV</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;<code>branch</code> &#x4EE3;&#x8868;&#x679D;&#xFF0C;<code>leaves</code> &#x4EE3;&#x8868;&#x53F6;&#xFF0C;&#x53F6;&#x6709; 6 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x4EE3;&#x8868; 6 &#x4E2A;&#x53F6;&#x7247;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;figure class=&quot;sapling&quot;&gt;
    &lt;div class=&quot;branch&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;leaves&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sapling&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;branch&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;leaves&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sapling {
    position: relative;
    width: 5em;
    height: 17.5em;
    font-size: 10px;
    display: flex;
    justify-content: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sapling</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">17.5em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre><p>&#x753B;&#x51FA;&#x6811;&#x679D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".branch {
    position: absolute;
    width: 0.2em;
    height: inherit;
    border-radius: 25%;
    background: burlywood;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.branch</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">background</span>: burlywood;
}</code></pre><p>&#x5B9A;&#x4E49;&#x6811;&#x53F6;&#x5BB9;&#x5668;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E3A;&#x53F6;&#x7247;&#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x5747;&#x5300;&#x5206;&#x5E03;&#xFF0C;&#x5E76;&#x4E14;&#x4ECE;&#x4E0B;&#x5230;&#x4E0A;&#x6392;&#x5217;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".leaves {
    position: absolute;
    width: inherit;
    height: 15em;
    top: 1em;
    display: flex;
    flex-direction: column-reverse;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.leaves</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column-reverse;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x53F6;&#x7247;&#x7684;&#x5C3A;&#x5BF8;&#x548C;&#x548C;&#x80CC;&#x666F;&#x989C;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".leaves span {
    width: 2.5em;
    height: 2.5em;
    background-color: limegreen;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.leaves</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">background-color</span>: limegreen;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5DE6;&#x53F3;&#x53F6;&#x7247;&#x7684;&#x5404;&#x81EA;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".leaves span:nth-child(odd) {
    border-bottom-left-radius: 3em;
    border-top-right-radius: 3em;
    transform-origin: right bottom;
    align-self: flex-start;
}

.leaves span:nth-child(even) {
    border-bottom-right-radius: 3em;
    border-top-left-radius: 3em;
    transform-origin: left bottom;
    align-self: flex-end;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.leaves</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">border-bottom-left-radius</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">transform-origin</span>: right bottom;
    <span class="hljs-attribute">align-self</span>: flex-start;
}

<span class="hljs-selector-class">.leaves</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">transform-origin</span>: left bottom;
    <span class="hljs-attribute">align-self</span>: flex-end;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x9759;&#x6001;&#x6548;&#x679C;&#x7ED8;&#x5236;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5F00;&#x59CB;&#x5199;&#x52A8;&#x753B;&#x811A;&#x672C;&#x3002;<br>&#x5F15;&#x5165; GSAP &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x7EBF;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animation = new TimelineMax();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> animation = <span class="hljs-keyword">new</span> TimelineMax();</code></pre><p>&#x589E;&#x52A0;&#x6811;&#x679D;&#x7684;&#x5165;&#x573A;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x5E76;&#x4E3A;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6807;&#x7B7E; <code>branch</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(&apos;.branch&apos;, 4, {scaleY: 0, ease: Power1.easeOut}, &apos;branch&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">animation.from(<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-number">4</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-string">&apos;branch&apos;</span>);</code></pre><p>&#x589E;&#x52A0;&#x6811;&#x53F6;&#x7684;&#x5165;&#x573A;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x5B83;&#x7684;&#x53C2;&#x6570;&#x4E2D;&#x6709; 3 &#x4E2A; <code>0.5</code>&#xFF0C;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x7684;&#x542B;&#x4E49;&#x5206;&#x522B;&#x662F;&#x52A8;&#x753B;&#x65F6;&#x957F;&#x3001;&#x591A;&#x4E2A;&#x53F6;&#x7247;&#x52A8;&#x753B;&#x7684;&#x95F4;&#x9694;&#x65F6;&#x957F;&#x3001;&#x76F8;&#x5BF9; <code>branch</code> &#x6807;&#x7B7E;&#x52A8;&#x753B;&#x7684;&#x5EF6;&#x8FDF;&#x65F6;&#x95F4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(&apos;.branch&apos;, 4, {scaleY: 0, ease: Power1.easeOut}, &apos;branch&apos;)
    .staggerFrom(&apos;.leaves span&apos;, 0.5, {scale: 0, ease: Power1.easeOut}, 0.5, 0.5, &apos;branch&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-number">4</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-string">&apos;branch&apos;</span>)
    .staggerFrom(<span class="hljs-string">&apos;.leaves span&apos;</span>, <span class="hljs-number">0.5</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-string">&apos;branch&apos;</span>);</code></pre><p>&#x589E;&#x52A0;&#x53F6;&#x7247;&#x53D8;&#x9EC4;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(&apos;.branch&apos;, 4, {scaleY: 0, ease: Power1.easeOut}, &apos;branch&apos;)
    .staggerFrom(&apos;.leaves span&apos;, 0.5, {scale: 0, ease: Power1.easeOut}, 0.5, 0.5, &apos;branch&apos;)
    .to([&apos;.branch&apos;, &apos;.leaves span&apos;], 3, {backgroundColor: &apos;yellow&apos;});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-number">4</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-string">&apos;branch&apos;</span>)
    .staggerFrom(<span class="hljs-string">&apos;.leaves span&apos;</span>, <span class="hljs-number">0.5</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-string">&apos;branch&apos;</span>)
    .to([<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-string">&apos;.leaves span&apos;</span>], <span class="hljs-number">3</span>, {<span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&apos;yellow&apos;</span>});</code></pre><p>&#x589E;&#x52A0;&#x6DE1;&#x51FA;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.from(&apos;.branch&apos;, 4, {scaleY: 0, ease: Power1.easeOut}, &apos;branch&apos;)
    .staggerFrom(&apos;.leaves span&apos;, 0.5, {scale: 0, ease: Power1.easeOut}, 0.5, 0.5, &apos;branch&apos;)
    .to([&apos;.branch&apos;, &apos;.leaves span&apos;], 3, {backgroundColor: &apos;yellow&apos;})
    .to([&apos;.branch&apos;, &apos;.leaves span&apos;], 1, {autoAlpha: 0});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">animation.from(<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-number">4</span>, {<span class="hljs-attr">scaleY</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-string">&apos;branch&apos;</span>)
    .staggerFrom(<span class="hljs-string">&apos;.leaves span&apos;</span>, <span class="hljs-number">0.5</span>, {<span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">ease</span>: Power1.easeOut}, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-string">&apos;branch&apos;</span>)
    .to([<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-string">&apos;.leaves span&apos;</span>], <span class="hljs-number">3</span>, {<span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&apos;yellow&apos;</span>})
    .to([<span class="hljs-string">&apos;.branch&apos;</span>, <span class="hljs-string">&apos;.leaves span&apos;</span>], <span class="hljs-number">1</span>, {<span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>});</code></pre><p>&#x4FEE;&#x6539;&#x58F0;&#x660E;&#x65F6;&#x95F4;&#x7EBF;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F7F;&#x52A8;&#x753B;&#x91CD;&#x590D;&#x64AD;&#x653E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animation = new TimelineMax({repeat: -1, repeatDelay: 0.5});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> animation = <span class="hljs-keyword">new</span> TimelineMax({<span class="hljs-attr">repeat</span>: <span class="hljs-number">-1</span>, <span class="hljs-attr">repeatDelay</span>: <span class="hljs-number">0.5</span>});</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：134# 视频演示如何用 CSS 和 GSAP 创作一个树枝发芽的 loader

## 原文链接
[https://segmentfault.com/a/1190000016377676](https://segmentfault.com/a/1190000016377676)


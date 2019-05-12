---
title: '前端每日实战：47# 视频演示如何用纯 CSS 创作一个蝴蝶标本展示框' 
date: 2018-11-29 2:30:09
hidden: true
slug: 1ooonb28g02
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbb5Tn?w=500&amp;h=500" src="https://static.alili.tech/img/bVbb5Tn?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/xzgZzQ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/xzgZzQ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/xzgZzQ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cN7EncL" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cN7EncL</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x8868;&#x793A;&#x6574;&#x53EA;&#x8774;&#x8776;&#xFF0C;&#x56E0;&#x4E3A;&#x8774;&#x8776;&#x662F;&#x5BF9;&#x79F0;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5206;&#x4E3A;&#x5DE6;&#x53F3;&#x4E24;&#x8FB9;&#xFF0C;&#x6BCF;&#x8FB9;&#x6709; 3 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;butterfly&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;butterfly&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
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
    background: linear-gradient(gray, lightyellow, gray);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(gray, lightyellow, gray);
}</code></pre><p>&#x5B9A;&#x4E49;&#x8774;&#x8776;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly {
    position: relative;
    width: 10em;
    height: 10em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
}</code></pre><p>&#x5148;&#x753B;&#x5DE6;&#x534A;&#x8FB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly .left {
    position: absolute;
    width: inherit;
    height: inherit;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
}</code></pre><p>&#x7528;&#x7B2C; 1 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x7FC5;&#x8180;&#x7684;&#x4E0A;&#x534A;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly span {
    position: absolute;
    border-radius: 50%;
}

.butterfly span:nth-child(1) {
    width: 5em;
    height: 7em;
    background-color: gold;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">background-color</span>: gold;
}</code></pre><p>&#x7528;&#x7B2C; 2 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x7FC5;&#x8180;&#x7684;&#x4E0B;&#x534A;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly span:nth-child(2) {
    width: 5.5em;
    height: 3.5em;
    background-color: orangered;
    top: 5em;
    left: -2.5em;
    filter: opacity(0.6);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3.5em</span>;
    <span class="hljs-attribute">background-color</span>: orangered;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.6);
}</code></pre><p>&#x7528;&#x7B2C; 3 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x89E6;&#x89D2;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly span:nth-child(3) {
    width: 6em;
    height: 6em;
    border-right: 0.3em solid orangered;
    top: -0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.3em</span> solid orangered;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.5em</span>;
}</code></pre><p>&#x628A;&#x5DE6;&#x534A;&#x8FB9;&#x590D;&#x5236;&#x4E00;&#x4EFD;&#x5230;&#x53F3;&#x534A;&#x8FB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly .right {
    position: absolute;
    width: inherit;
    height: inherit;
}

.butterfly .right {
    transform: rotateY(180deg) rotate(-90deg);
    top: 0.4em;
    left: 0.4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
}

<span class="hljs-selector-class">.butterfly</span> <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(180deg) <span class="hljs-built_in">rotate</span>(-90deg);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.4em</span>;
}</code></pre><p>&#x628A;&#x6807;&#x672C;&#x88C5;&#x5230;&#x5C55;&#x793A;&#x6846;&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly::before {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    top: -2.5em;
    left: -8em;
    width: 24em;
    height: 18em;
    background-color: black;
      border: 0.2em inset silver;
}

.butterfly::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 40em;
    height: 30em;
    background-color: lightyellow;
    top: -9em;
    left: -16em;
    border: 2em solid burlywood;
    border-radius: 3em;
    box-shadow: 
        0 0.3em 2em 0.4em rgba(0, 0, 0, 0.3),
        inset 0.4em 0.4em 0.1em 0.5em rgba(0, 0, 0, .4);
    z-index: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">8em</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">24em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">background-color</span>: black;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> inset silver;
}

<span class="hljs-selector-class">.butterfly</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">background-color</span>: lightyellow;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">9em</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">16em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2em</span> solid burlywood;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">box-shadow</span>: 
        <span class="hljs-number">0</span> <span class="hljs-number">0.3em</span> <span class="hljs-number">2em</span> <span class="hljs-number">0.4em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3),
        inset <span class="hljs-number">0.4em</span> <span class="hljs-number">0.4em</span> <span class="hljs-number">0.1em</span> <span class="hljs-number">0.5em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, .4);
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8C03;&#x6574;&#x4E00;&#x4E0B;&#x56E0;&#x56FE;&#x6848;&#x503E;&#x659C;&#x5F15;&#x8D77;&#x7684;&#x4F4D;&#x79FB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".butterfly {
    transform: translateX(1em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.butterfly</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(1em);
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：47# 视频演示如何用纯 CSS 创作一个蝴蝶标本展示框

## 原文链接
[https://segmentfault.com/a/1190000015236585](https://segmentfault.com/a/1190000015236585)


---
title: '前端每日实战：48# 视频演示如何用纯 CSS 创作一盘传统蚊香' 
date: 2018-11-29 2:30:08
hidden: true
slug: tq4be6b31a
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbb8AY?w=500&amp;h=500" src="https://static.alili.tech/img/bVbb8AY?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/BVpvMz" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/BVpvMz</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/BVpvMz" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cZ8Ebf7" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cZ8Ebf7</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 8 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;coil&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;coil&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, midnightblue, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, midnightblue, black);
}</code></pre><p>&#x753B;&#x51FA;&#x7EB9;&#x9999;&#x76D8;&#x8981;&#x7528;&#x7684;&#x6846;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil {
    position: relative;
    display: flex;
    justify-content: center;
}

.coil span {
    position: absolute;
    width: calc((var(--n) * 2 - 1) * 1em);
    height: calc((var(--n) - 0.5) * 1em);
    border: 1em solid darkgreen;
}

.coil span:nth-child(1) {
    --n: 1;
}

.coil span:nth-child(2) {
    --n: 2;
}

.coil span:nth-child(3) {
    --n: 3;
}

.coil span:nth-child(4) {
    --n: 4;
}

.coil span:nth-child(5) {
    --n: 5;
}

.coil span:nth-child(6) {
    --n: 6;
}

.coil span:nth-child(7) {
    --n: 7;
}

.coil span:nth-child(8) {
    --n: 8;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>((var(--n) * <span class="hljs-number">2</span> - <span class="hljs-number">1</span>) * <span class="hljs-number">1em</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>((var(--n) - <span class="hljs-number">0.5</span>) * <span class="hljs-number">1em</span>);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1em</span> solid darkgreen;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">7</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">8</span>;
}</code></pre><p>&#x628A;&#x4E00;&#x534A;&#x6846;&#x7EBF;&#x653E;&#x7F6E;&#x5230;&#x4E0A;&#x65B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil span:nth-child(odd) {
    align-self: flex-end;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">align-self</span>: flex-end;
}</code></pre><p>&#x5220;&#x9664;&#x6389;&#x4E0A;&#x65B9;&#x6846;&#x7EBF;&#x7684;&#x4E0B;&#x8FB9;&#x6846;&#xFF0C;&#x548C;&#x4E0B;&#x65B9;&#x6846;&#x7EBF;&#x7684;&#x4E0A;&#x8FB9;&#x6846;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil span:nth-child(odd) {
    border-bottom: none;
}

.coil span:nth-child(even) {
    border-top: none;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">border-bottom</span>: none;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">border-top</span>: none;
}</code></pre><p>&#x5BF9;&#x9F50;&#x4E0A;&#x4E0B;&#x8FB9;&#x6846;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil span:nth-child(even) {
    transform: translateX(-1em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-1em);
}</code></pre><p>&#x628A;&#x8FB9;&#x6846;&#x6539;&#x4E3A;&#x66F2;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil span:nth-child(odd) {
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}

.coil span:nth-child(even) {
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">100%</span> <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.coil</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> / <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span> <span class="hljs-number">100%</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x868A;&#x9999;&#x6700;&#x4E2D;&#x95F4;&#x7684;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil::before {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    background-color: darkgreen;
    border-radius: 50%;
    left: -1.5em;
    top: -0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: darkgreen;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.5em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x868A;&#x9999;&#x7684;&#x71C3;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    top: -0.5em;
    background-color: darkred;
    left: -9.5em;
    z-index: -1;
    transform: scale(0.9);
    box-shadow: 0 0 1em white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">background-color</span>: darkred;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">9.5em</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.9);
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1em</span> white;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x71C3;&#x70B9;&#x589E;&#x52A0;&#x95EA;&#x52A8;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coil::after {
    animation: blink 1s linear infinite alternate;
}

@keyframes blink {
    to {
        box-shadow: 0 0 0 white;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coil</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: blink <span class="hljs-number">1s</span> linear infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> blink {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> white;
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：48# 视频演示如何用纯 CSS 创作一盘传统蚊香

## 原文链接
[https://segmentfault.com/a/1190000015246974](https://segmentfault.com/a/1190000015246974)


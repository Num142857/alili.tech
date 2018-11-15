---
title: '前端每日实战：158# 视频演示如何用纯 CSS 创作一个雨伞 toggle 控件'
hidden: true
categories: reprint
slug: 1354bf86
date: 2018-11-03 10:03:44
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbikQw?w=400&amp;h=301" src="https://static.alili.tech/img/bVbikQw?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/pxLbjv" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/pxLbjv</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/pxLbjv" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cMV8euJ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cMV8euJ</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668; <code>.umbralla</code> &#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;<code>.canopy</code> &#x4EE3;&#x8868;&#x4F1E;&#x76D6;&#xFF0C;<code>.shaft</code> &#x4F1E;&#x67C4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;figure class=&quot;umbralla&quot;&gt;
    &lt;div class=&quot;canopy&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;shaft&quot;&gt;&lt;/div&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;umbralla&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;canopy&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;shaft&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(skyblue, lightblue);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(skyblue, lightblue);
}</code></pre><p>&#x8BBE;&#x7F6E;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x5171;&#x6709;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella *::before,
.umbrella *::after {
    content: &apos;&apos;;
    position: absolute;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> *<span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.umbrella</span> *<span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
}</code></pre><p>&#x5148;&#x753B;&#x51FA;&#x96E8;&#x4F1E;&#x6253;&#x5F00;&#x7684;&#x6837;&#x5B50;&#x3002;<br>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF0C;&#x5176;&#x4E2D; <code>font-size</code> &#x7684;&#x5C5E;&#x6027;&#x503C;&#x540E;&#x9762;&#x8FD8;&#x8981;&#x7528;&#x5230;&#xFF0C;&#x6240;&#x4EE5;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --font-size: 10px;
}

.umbrella {
    position: relative;
    width: 25em;
    height: 26em;
    font-size: var(--font-size);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--font-size</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.umbrella</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">26em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--font-size);
}</code></pre><p>&#x5B9A;&#x4E49;&#x4F1E;&#x76D6;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .canopy {
    position: absolute;
    width: inherit;
    height: 5.5em;
    top: 2.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">2.5em</span>;
}</code></pre><p>&#x7528; <code>::before</code> &#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x4F1E;&#x76D6;&#x7684;&#x4E0A;&#x534A;&#x90E8;&#x5206;&#xFF0C;&#x65B9;&#x6CD5;&#x5148;&#x753B;&#x4E00;&#x4E2A;&#x534A;&#x5706;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x4E0A;&#x538B;&#x7F29;&#x5B83;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .canopy::before {
    width: inherit;
    height: 12.5em;
    background: rgb(100, 100, 100);
    border-radius: 12.5em 12.5em 0 0;
    transform: scaleY(0.4);
    top: -4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">12.5em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(100, 100, 100);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">12.5em</span> <span class="hljs-number">12.5em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.4);
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">4em</span>;
}</code></pre><p>&#x7528; <code>::after</code> &#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x4F1E;&#x76D6;&#x7684;&#x4E0B;&#x534A;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .canopy::after {
    width: inherit;
    height: 1.5em;
    background-color: #333;
    top: 4em;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x4F1E;&#x67C4;&#x7684;&#x957F;&#x6746;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .shaft {
    position: absolute;
    width: 0.8em;
    height: 18em;
    background-color: rgba(100, 100, 100, 0.7);
    top: 5.5em;
    left: calc((100% - 0.8em) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.shaft</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100, 100, 100, 0.7);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((100% - 0.8em) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x4F1E;&#x6746;&#x9876;&#x90E8;&#x9732;&#x51FA;&#x4F1E;&#x76D6;&#x7684;&#x5C16;&#x5934;&#xFF0C;&#x65B9;&#x6CD5;&#x548C;&#x753B;&#x4F1E;&#x76D6;&#x4E0A;&#x534A;&#x90E8;&#x5206;&#x7C7B;&#x4F3C;&#xFF0C;&#x5148;&#x753B;&#x51FA;&#x534A;&#x5706;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x4E0A;&#x538B;&#x7F29;&#x5B83;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .shaft::before {
    width: 6em;
    height: 3em;
    background-color: rgba(100, 100, 100, 0.7);
    left: calc((100% - 6em) / 2);
    top: -5.5em;
    border-radius: 6em 6em 0 0;
    transform: scaleX(0.1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.shaft</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100, 100, 100, 0.7);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((100% - 6em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6em</span> <span class="hljs-number">6em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0.1);
}</code></pre><p>&#x753B;&#x51FA;&#x96E8;&#x4F1E;&#x7684;&#x94A9;&#x5F62;&#x628A;&#x624B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .shaft::after {
    box-sizing: border-box;
    width: 4em;
    height: 2.5em;
    border: 1em solid #333;
    top: 100%;
    left: calc(50% - 4em + 1em / 2);
    border-radius: 0 0 2.5em 2.5em;
    border-top: none;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.shaft</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1em</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(50% - 4em + 1em / 2);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2.5em</span> <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">border-top</span>: none;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x5B8C;&#x6210;&#x4E86;&#x96E8;&#x4F1E;&#x6253;&#x5F00;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x901A;&#x8FC7;&#x53D8;&#x5F62;&#x753B;&#x51FA;&#x96E8;&#x4F1E;&#x5408;&#x4E0A;&#x65F6;&#x7684;&#x6837;&#x5B50;&#x3002;<br>&#x5148;&#x628A;&#x4F1E;&#x76D6;&#x7684;&#x5408;&#x4E0A;&#xFF0C;&#x65B9;&#x6CD5;&#x662F;&#x5728;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x4E0A;&#x538B;&#x7F29;&#xFF0C;&#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x4E0A;&#x62C9;&#x4F38;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .canopy {
    transform-origin: top;
    transform: scale(0.08, 4);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span> {
    <span class="hljs-attribute">transform-origin</span>: top;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.08, 4);
}</code></pre><p>&#x9690;&#x85CF;&#x4F1E;&#x76D6;&#x7684;&#x4E0B;&#x534A;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella .canopy::after {
    transform: scaleY(0);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
}</code></pre><p>&#x8BA9;&#x4F1E;&#x503E;&#x659C;&#xFF0C;&#x56E0;&#x4E3A;&#x7AD6;&#x7740;&#x7684;&#x4F1E;&#x6709;&#x70B9;&#x5446;&#x677F;&#xFF0C;&#x6240;&#x4EE5;&#x589E;&#x52A0;&#x4E00;&#x70B9;&#x53D8;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella {
    transform: rotate(-30deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-30deg);
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x96E8;&#x4F1E;&#x5408;&#x4E0A;&#x65F6;&#x7684;&#x6837;&#x5B50;&#x4E5F;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x628A;&#x5B83;&#x53D8;&#x4E3A; toggle &#x63A7;&#x4EF6;&#x4E86;&#x3002;<br>&#x5728; dom &#x4E2D;&#x589E;&#x52A0;&#x4E00;&#x4E2A; <code>checkbox</code> &#x63A7;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;checkbox&quot; class=&quot;toggle&quot;&gt;
&lt;figure class=&quot;umbrella&quot;&gt;
    &lt;!-- &#x7565; --&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toggle&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;umbrella&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x7565; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E;&#x63A7;&#x4EF6;&#x4E0E;&#x96E8;&#x4F1E;&#x4E00;&#x6837;&#x5927;&#xFF0C;&#x5E76;&#x7F6E;&#x4E8E;&#x96E8;&#x4F1E;&#x56FE;&#x5C42;&#x7684;&#x4E0A;&#x5C42;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle {
    position: absolute;
    filter: opacity(0);
    width: 25em;
    height: 26em;
    font-size: var(--font-size);
    cursor: pointer;
    z-index: 2;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">26em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--font-size);
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
}</code></pre><p><code>checkbox</code> &#x63A7;&#x4EF6;&#x7684;&#x672A;&#x9009;&#x4E2D;&#x72B6;&#x6001;&#x5BF9;&#x5E94;&#x96E8;&#x4F1E;&#x5408;&#x4E0A;&#x65F6;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x76EE;&#x524D;&#x96E8;&#x4F1E;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x8981;&#x6307;&#x5B9A;&#x63A7;&#x4EF6;&#x88AB;&#x9009;&#x4E2D;&#x72B6;&#x6001;&#x5BF9;&#x5E94;&#x7684;&#x96E8;&#x4F1E;&#x6253;&#x5F00;&#x65F6;&#x7684;&#x6837;&#x5B50;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x56E0;&#x4E3A;&#x5408;&#x4E0A;&#x96E8;&#x4F1E;&#x662F;&#x5BF9;&#x51E0;&#x4E2A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x53D8;&#x5F62;&#x5F97;&#x5230;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8F6C;&#x6362;&#x5230;&#x96E8;&#x4F1E;&#x6253;&#x5F00;&#x72B6;&#x6001;&#x5C31;&#x662F;&#x53D6;&#x6D88;&#x53D8;&#x5F62;&#x3002;<br>&#x5148;&#x8BA9;&#x4F1E;&#x6B63;&#x8FC7;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle:checked ~ .umbrella {
    transform: rotate(0deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-class">.umbrella</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
}</code></pre><p>&#x7136;&#x540E;&#x628A;&#x4F1E;&#x76D6;&#x6253;&#x5F00;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle:checked ~ .umbrella .canopy {
    transform: scale(1, 1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1, 1);
}</code></pre><p>&#x518D;&#x663E;&#x793A;&#x51FA;&#x4F1E;&#x76D6;&#x7684;&#x4E0B;&#x534A;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle:checked ~ .umbrella .canopy::after {
    transform: scaleY(1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1);
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BBE;&#x7F6E;&#x4EE5;&#x4E0A;&#x51E0;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7F13;&#x52A8;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".umbrella,
.umbrella .canopy,
.umbrella .canopy::after {
    transition: 0.3s cubic-bezier(0.5, -0.25, 0.5, 1.25);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.umbrella</span>,
<span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span>,
<span class="hljs-selector-class">.umbrella</span> <span class="hljs-selector-class">.canopy</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span> <span class="hljs-built_in">cubic-bezier</span>(0.5, -0.25, 0.5, 1.25);
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：158# 视频演示如何用纯 CSS 创作一个雨伞 toggle 控件

## 原文链接
[https://segmentfault.com/a/1190000016724029](https://segmentfault.com/a/1190000016724029)


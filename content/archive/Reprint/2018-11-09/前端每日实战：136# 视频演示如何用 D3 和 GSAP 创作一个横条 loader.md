---
title: '前端每日实战：136# 视频演示如何用 D3 和 GSAP 创作一个横条 loader'
reprint: true
categories: reprint
abbrlink: cf919b62
date: 2018-11-09 02:30:06
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/bVbg0gq?w=400&amp;h=305" src="https://static.alili.tech/img/bVbg0gq?w=400&amp;h=305" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/pOZKWJ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/pOZKWJ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/pOZKWJ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cVB48Ur" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cVB48Ur</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 1 &#x4E2A; <code>span</code> &#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
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
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 40em;
    height: 1em;
    font-size: 10px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x4E2D; <code>span</code> &#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5F69;&#x8272;&#x7EC6;&#x957F;&#x6761;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    position: relative;
}

.loader span {
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: hsl(24, 100%, 65%);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(24, 100%, 65%);
}</code></pre><p>&#x5F15;&#x5165; d3.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x5220;&#x9664;&#x6389; dom &#x4E2D;&#x7684; <code>span</code> &#x5143;&#x7D20;&#xFF0C;&#x6539;&#x7528; d3 &#x521B;&#x5EFA;&#xFF0C;&#x5176;&#x4E2D;&#x5E38;&#x91CF; <code>COUNT</code> &#x662F;&#x7EC6;&#x957F;&#x6761;&#x7684;&#x6570;&#x91CF;&#xFF0C;&#x56E0;&#x4E3A; <code>d3.range()</code> &#x751F;&#x6210;&#x7684;&#x6570;&#x636E;&#x662F;&#x4ECE; 0 &#x5F00;&#x59CB;&#x7684;&#x6570;&#x5217;&#xFF0C;&#x6240;&#x4EE5;&#x628A;&#x6570;&#x636E;&#x4FEE;&#x6B63;&#x4E3A;&#x4EE5;&#x65E5;&#x5E38;&#x4E60;&#x60EF;&#x7684;&#x4ECE; 1 &#x5F00;&#x59CB;&#x7684;&#x6570;&#x5217;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT = 1;

d3.select(&apos;.loader&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT).map(d =&gt; d + 1))
    .enter()
    .append(&apos;span&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COUNT = <span class="hljs-number">1</span>;

d3.select(<span class="hljs-string">&apos;.loader&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> d + <span class="hljs-number">1</span>))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)</code></pre><p>&#x5220;&#x9664;&#x6389; css &#x4E2D;&#x8BBE;&#x7F6E; <code>span</code> &#x5143;&#x7D20; <code>background-color</code> &#x5C5E;&#x6027;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6539;&#x7528; d3 &#x8BBE;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.loader&apos;)
    .selectAll(&apos;span&apos;)
    .data(d3.range(COUNT).map(d =&gt; d + 1))
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;background-color&apos;, `hsl(24, 100%, 65%)`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.loader&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(d3.range(COUNT).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> d + <span class="hljs-number">1</span>))
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;background-color&apos;</span>, <span class="hljs-string">`hsl(24, 100%, 65%)`</span>)</code></pre><p>&#x628A;&#x7EC6;&#x957F;&#x6761;&#x7684;&#x6570;&#x91CF;&#x6539;&#x4E3A; 2 &#x4E2A;&#xFF0C;&#x989C;&#x8272;&#x6539;&#x4E3A;&#x52A8;&#x6001;&#x751F;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HUE_DEG = 12;
const COUNT = 2;

d3.select(&apos;.loader&apos;)
    /* ...&#x7565; */
    .style(&apos;background-color&apos;, (d) =&gt; `hsl(${d * HUE_DEG}, 100%, 65%)`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HUE_DEG = <span class="hljs-number">12</span>;
<span class="hljs-keyword">const</span> COUNT = <span class="hljs-number">2</span>;

d3.select(<span class="hljs-string">&apos;.loader&apos;</span>)
    <span class="hljs-comment">/* ...&#x7565; */</span>
    .style(<span class="hljs-string">&apos;background-color&apos;</span>, (d) =&gt; <span class="hljs-string">`hsl(<span class="hljs-subst">${d * HUE_DEG}</span>, 100%, 65%)`</span>)</code></pre><p>&#x518D;&#x8FDB;&#x4E00;&#x6B65;&#xFF0C;&#x628A;&#x989C;&#x8272;&#x6539;&#x4E3A;&#x5F69;&#x8272;&#x6761;&#x548C;&#x9ED1;&#x8272;&#x6761;&#x95F4;&#x9694;&#x51FA;&#x73B0;&#xFF0C;&#x8BF7;&#x6CE8;&#x610F;&#x867D;&#x7136;&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D; hue &#x7684;&#x503C;&#x662F;&#x6309; 12 &#x9012;&#x589E;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x770B;&#x5230;&#x7684;&#x7684;&#x6548;&#x679C;&#x662F;&#x5F69;&#x8272;&#x957F;&#x6761;&#x95F4;&#x7684; hue &#x76F8;&#x5DEE; 24&#xFF0C;&#x56E0;&#x4E3A;&#x5176;&#x4E2D;&#x5939;&#x6742;&#x7740;&#x9ED1;&#x8272;&#x957F;&#x6761;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.loader&apos;)
    /* ...&#x7565; */
    .style(&apos;background-color&apos;, (d) =&gt; d % 2 !== 0
        ? `hsl(${d * HUE_DEG}, 100%, 65%)`
        : &apos;black&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.loader&apos;</span>)
    <span class="hljs-comment">/* ...&#x7565; */</span>
    .style(<span class="hljs-string">&apos;background-color&apos;</span>, (d) =&gt; d % <span class="hljs-number">2</span> !== <span class="hljs-number">0</span>
        ? <span class="hljs-string">`hsl(<span class="hljs-subst">${d * HUE_DEG}</span>, 100%, 65%)`</span>
        : <span class="hljs-string">&apos;black&apos;</span>);</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684; dom &#x7ED3;&#x6784;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;span style=&quot;background-color: rgb(255, 77, 77);&quot;&gt;&lt;/span&gt;
    &lt;span style=&quot;background-color: black;&quot;&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-color: rgb(255, 77, 77);&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-color: black;&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5F15;&#x5165; gsap &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x589E;&#x52A0;&#x957F;&#x6761;&#x7531;&#x4E2D;&#x5FC3;&#x5411;&#x4E24;&#x4FA7;&#x4F38;&#x5C55;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animation = new TimelineMax({repeat: -1});
animation.staggerFrom(&apos;.loader span&apos;, 0.5, {scaleX: 0}, 0.4)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> animation = <span class="hljs-keyword">new</span> TimelineMax({<span class="hljs-attr">repeat</span>: <span class="hljs-number">-1</span>});
animation.staggerFrom(<span class="hljs-string">&apos;.loader span&apos;</span>, <span class="hljs-number">0.5</span>, {<span class="hljs-attr">scaleX</span>: <span class="hljs-number">0</span>}, <span class="hljs-number">0.4</span>)</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x957F;&#x6761;&#x7684;&#x6570;&#x91CF;&#x6539;&#x4E3A; 30 &#x4E2A;&#xFF0C;&#x5B83;&#x662F;&#x7528;&#x6574;&#x5708;&#x8272;&#x76F8;&#x73AF;&#x7684; 360 &#x5EA6;&#x9664;&#x4EE5; hue &#x95F4;&#x9694;&#x5F97;&#x5230;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COUNT = 360 / HUE_DEG;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> COUNT = <span class="hljs-number">360</span> / HUE_DEG;</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：136# 视频演示如何用 D3 和 GSAP 创作一个横条 loader

## 原文链接
[https://segmentfault.com/a/1190000016406581](https://segmentfault.com/a/1190000016406581)


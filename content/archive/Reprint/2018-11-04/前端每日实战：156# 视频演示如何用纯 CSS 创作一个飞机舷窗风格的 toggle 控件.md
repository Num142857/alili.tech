---
title: '前端每日实战：156# 视频演示如何用纯 CSS 创作一个飞机舷窗风格的 toggle 控件'
reprint: true
categories: reprint
abbrlink: f9c09913
date: 2018-11-04 02:30:10
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/bVbibIK?w=400&amp;h=301" src="https://static.alili.tech/img/bVbibIK?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/jeaOrw" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/jeaOrw</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/jeaOrw" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cdZVGSD" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cdZVGSD</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;<code>.windows</code> &#x5BB9;&#x5668;&#x8868;&#x793A;&#x8237;&#x7A97;&#xFF0C;&#x5B83;&#x7684;&#x5B50;&#x5143;&#x7D20; <code>.curtain</code> &#x8868;&#x793A;&#x7A97;&#x5E18;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;figure class=&quot;window&quot;&gt;
    &lt;div class=&quot;curtain&quot;&gt;&lt;/div&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;window&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;curtain&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
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
}</code></pre><p>&#x8BBE;&#x7F6E;&#x8237;&#x7A97;&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x56E0;&#x4E3A;&#x540E;&#x9762;&#x8FD8;&#x4F1A;&#x7528;&#x5230;&#x5B57;&#x53F7;&#xFF0C;&#x6240;&#x4EE5;&#x5B57;&#x53F7;&#x7528;&#x53D8;&#x91CF;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --font-size: 10px;
}

.window {
    position: relative;
    box-sizing: border-box;
    width: 25em;
    height: 35em;
    font-size: var(--font-size);
    background-color: #d9d9d9;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--font-size</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.window</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">35em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--font-size);
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d9d9d9</span>;
}</code></pre><p>&#x7528;&#x9634;&#x5F71;&#x753B;&#x51FA;&#x539A;&#x7A97;&#x6846;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window {
    border-radius: 5em;
    box-shadow: 
        inset 0 0 8em rgba(0, 0, 0, 0.2),
        0 0 0 0.4em #808080,
        0 0 0 4em whitesmoke,
        0 0 0 4.4em #808080,
        0 2em 4em 4em rgba(0, 0, 0, 0.1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">box-shadow</span>: 
        inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2),
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0.4em</span> <span class="hljs-number">#808080</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4em</span> whitesmoke,
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4.4em</span> <span class="hljs-number">#808080</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">2em</span> <span class="hljs-number">4em</span> <span class="hljs-number">4em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.1);
}</code></pre><p>&#x8BBE;&#x7F6E;&#x7A97;&#x5E18;&#x6837;&#x5F0F;&#xFF0C;&#x548C;&#x7A97;&#x53E3;&#x5C3A;&#x5BF8;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x4E0D;&#x62C9;&#x5230;&#x5E95;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window .curtain {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 5em;
    box-shadow:
        0 0 0 0.5em #808080,
        0 0 3em rgba(0, 0, 0, 0.4);
    background-color: whitesmoke;
    left: 0;
    top: -5%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.curtain</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">box-shadow</span>:
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">#808080</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">3em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
    <span class="hljs-attribute">background-color</span>: whitesmoke;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">5%</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x5728;&#x7A97;&#x5E18;&#x4E0A;&#x753B;&#x51FA;&#x6307;&#x793A;&#x706F;&#xFF0C;&#x5F53;&#x7A97;&#x5E18;&#x5173;&#x95ED;&#x65F6;&#x4EAE;&#x7EA2;&#x8272;&#x5149;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window .curtain::before {
    content: &apos;&apos;;
    position: absolute;
    width: 40%;
    height: 0.8em;
    background-color: #808080;
    left: 30%;
    bottom: 1.6em;
    border-radius: 0.4em;
}

.window .curtain::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1.6em;
    height: 0.8em;
    background-image: radial-gradient(orange, orangered);
    bottom: 1.6em;
    border-radius: 0.4em;
    left: calc((100% - 1.6em) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.curtain</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#808080</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">30%</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1.6em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.4em</span>;
}

<span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.curtain</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1.6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">radial-gradient</span>(orange, orangered);
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1.6em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((100% - 1.6em) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x4EE5;&#x4E0A;&#x662F;&#x8237;&#x7A97;&#x5173;&#x95ED;&#x65F6;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7ED8;&#x5236;&#x8237;&#x7A97;&#x6253;&#x5F00;&#x65F6;&#x7684;&#x6548;&#x679C;&#x3002;<br>&#x5148;&#x5728; dom &#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; <code>checkbox</code>&#xFF0C;&#x5F53;&#x5B83;&#x88AB; <code>checked</code> &#x65F6;&#x5373;&#x8868;&#x793A;&#x8237;&#x7A97;&#x88AB;&#x6253;&#x5F00;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;checkbox&quot; class=&quot;toggle&quot;&gt;
&lt;figure class=&quot;window&quot;&gt;
    &lt;div class=&quot;handle&quot;&gt;&lt;/div&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toggle&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;window&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;handle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x9690;&#x85CF; <code>checkbox</code>&#xFF0C;&#x7528; <code>opacity(0)</code> &#x53EF;&#x4EE5;&#x4F7F;&#x5143;&#x7D20;&#x5728;&#x4E0D;&#x53EF;&#x89C1;&#x7684;&#x72B6;&#x6001;&#x4E0B;&#x4ECD;&#x53EF;&#x4EA4;&#x4E92;&#xFF0C;&#x628A;&#x5B83;&#x7684;&#x5C3A;&#x5BF8;&#x8BBE;&#x7F6E;&#x5F97;&#x5230;&#x8237;&#x7A97;&#x4E00;&#x6837;&#x5927;&#xFF0C;&#x5E76;&#x4E14;&#x56FE;&#x5C42;&#x5728;&#x8237;&#x7A97;&#x4E4B;&#x4E0A;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x6548;&#x679C;&#x5C31;&#x662F;&#x70B9;&#x51FB;&#x8237;&#x7A97;&#x65F6;&#x5B9E;&#x9645;&#x662F;&#x70B9;&#x51FB;&#x4E86; <code>checkbox</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle {
    position: absolute;
    filter: opacity(0);
    width: 25em;
    height: 35em;
    font-size: var(--font-size);
    cursor: pointer;
    z-index: 2;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">35em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--font-size);
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
}</code></pre><p>&#x5F53;&#x8237;&#x7A97;&#x6253;&#x5F00;&#x65F6;&#xFF0C;<code>.curtain</code> &#x8981;&#x5411;&#x4E0A;&#x79FB;&#x52A8;&#xFF0C;&#x5E76;&#x4E14;&#x6307;&#x793A;&#x706F;&#x4EAE;&#x7EFF;&#x8272;&#x5149;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window .curtain {
    transition: 0.5s ease-in-out;
}

.toggle:checked ~ .window .curtain {
    top: -90%;
}

.toggle:checked ~ .window .curtain::after {
    background-image: radial-gradient(lightgreen, limegreen);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.curtain</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.5s</span> ease-in-out;
}

<span class="hljs-selector-class">.toggle</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.curtain</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">90%</span>;
}

<span class="hljs-selector-class">.toggle</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.curtain</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">radial-gradient</span>(lightgreen, limegreen);
}</code></pre><p>&#x9690;&#x85CF;&#x8D85;&#x51FA;&#x7A97;&#x6237;&#x7684;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7ED8;&#x5236;&#x8237;&#x7A97;&#x5916;&#x7684;&#x98CE;&#x666F;&#x3002;<br>&#x5728; dom &#x4E2D;&#x589E;&#x52A0;&#x8868;&#x793A;&#x4E91;&#x6735;&#x7684; <code>.clouds</code> &#x5143;&#x7D20;&#xFF0C;&#x5176;&#x4E2D;&#x7684; 5 &#x4E2A; <code>&lt;span&gt;</code> &#x5B50;&#x5143;&#x7D20;&#x5206;&#x522B;&#x8868;&#x793A; 1 &#x6735;&#x767D;&#x4E91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;checkbox&quot; class=&quot;toggle&quot;&gt;
&lt;figure class=&quot;window&quot;&gt;
    &lt;div class=&quot;curtain&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;clouds&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/figure&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toggle&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;window&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;curtain&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clouds&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre><p>&#x7528;&#x4E91;&#x6735;&#x5BB9;&#x5668;&#x753B;&#x51FA;&#x7A97;&#x5916;&#x7684;&#x84DD;&#x5929;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window .clouds {
    position: relative;
    width: 20em;
    height: 30em;
    background-color: deepskyblue;
    box-shadow: 0 0 0 0.4em #808080;
    left: calc((100% - 20em) / 2);
    top: calc((100% - 30em) / 2);
    border-radius: 7em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.clouds</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">background-color</span>: deepskyblue;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0.4em</span> <span class="hljs-number">#808080</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((100% - 20em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>((100% - 30em) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">7em</span>;
}</code></pre><p>&#x6BCF;&#x6735;&#x4E91;&#x7531; 3 &#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF0C;&#x5148;&#x753B;&#x9762;&#x79EF;&#x6700;&#x5927;&#x7684;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clouds span {
    position: absolute;
    width: 10em;
    height: 4em;
    background-color: white;
    top: 20%;
    border-radius: 4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">20%</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4em</span>;
}</code></pre><p>&#x518D;&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B; 2 &#x4E2A;&#x7A81;&#x8D77;&#x7684;&#x5706;&#x5F27;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clouds span::before,
.clouds span::after {
    content: &apos;&apos;;
    position: absolute;
    width: 4em;
    height: 4em;
    background-color: white;
    border-radius: 50%;
}

.clouds span::before {
    top: -2em;
    left: 2em;
}

.clouds span::after {
    top: -1em;
    right: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">2em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2em</span>;
}

<span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">1em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">1em</span>;
}</code></pre><p>&#x589E;&#x52A0;&#x4E91;&#x6735;&#x98D8;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clouds span {
    animation: move 4s linear infinite;
}

@keyframes move {
    from {
        left: -150%;
    }

    to {
        left: 150%;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: move <span class="hljs-number">4s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> move {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">150%</span>;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">150%</span>;
    }
}</code></pre><p>&#x4F7F;&#x6BCF;&#x6735;&#x4E91;&#x7684;&#x5927;&#x5C0F;&#x3001;&#x4F4D;&#x7F6E;&#x6709;&#x4E00;&#x4E9B;&#x53D8;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clouds span:nth-child(2) {
    top: 40%;
    animation-delay: -1s;
}

.clouds span:nth-child(3) {
    top: 60%;
    animation-delay: -0.5s;
}

.clouds span:nth-child(4) {
    top: 20%;
    transform: scale(2);
    animation-delay: -1.5s;
}

.clouds span:nth-child(5) {
    top: 70%;
    transform: scale(1.5);
    animation-delay: -3s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">40%</span>;
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">1s</span>;
}

<span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">60%</span>;
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">0.5s</span>;
}

<span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">20%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">1.5s</span>;
}

<span class="hljs-selector-class">.clouds</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">70%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.5);
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">3s</span>;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x5BB9;&#x5668;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".window .clouds {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.window</span> <span class="hljs-selector-class">.clouds</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：156# 视频演示如何用纯 CSS 创作一个飞机舷窗风格的 toggle 控件

## 原文链接
[https://segmentfault.com/a/1190000016688955](https://segmentfault.com/a/1190000016688955)


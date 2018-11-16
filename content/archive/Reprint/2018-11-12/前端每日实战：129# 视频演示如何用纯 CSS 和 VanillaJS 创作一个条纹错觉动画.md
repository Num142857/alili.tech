---
title: '前端每日实战：129# 视频演示如何用纯 CSS 和 VanillaJS 创作一个条纹错觉动画'
hidden: true
categories: [reprint]
slug: b411e50e
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbgztX?w=400&amp;h=293" src="https://static.alili.tech/img/bVbgztX?w=400&amp;h=293" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/qMPQPx" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qMPQPx</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qMPQPx" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cMGa4TQ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cMGa4TQ</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868; 2 &#x6761;&#x8F68;&#x9053;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;span class=&apos;track&apos;&gt;&lt;/span&gt;
    &lt;span class=&apos;track&apos;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;track&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;track&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #999;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#999</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#x548C;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    font-size: 30px;
    width: calc(13em + 0.5em);
    height: 8em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(13em + 0.5em);
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">justify-content</span>: space-between;
}</code></pre><p>&#x5B9A;&#x4E49; 2 &#x4E2A;&#x8272;&#x503C;&#xFF0C;&#x4E00;&#x4E2A;&#x4EAE;&#x7684;&#x548C;&#x4E00;&#x4E2A;&#x6697;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    --dark: #222;
    --light: #ddd;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">--dark</span>: <span class="hljs-number">#222</span>;
    <span class="hljs-attribute">--light</span>: <span class="hljs-number">#ddd</span>;
}</code></pre><p>&#x753B;&#x51FA; 2 &#x6761;&#x8F68;&#x9053;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track {
    width: inherit;
    height: 2em;
    border: 1px solid var(--dark);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">var</span>(--dark);
}</code></pre><p>&#x4E3A; 2 &#x6761;&#x8F68;&#x9053;&#x7684;&#x80CC;&#x666F;&#x56FE;&#x6848;&#xFF0C;&#x56FE;&#x6848;&#x662F;&#x660E;&#x6697;&#x76F8;&#x95F4;&#x7684;&#x6761;&#x7EB9;&#xFF0C;&#x4F46;&#x7B2C; 2 &#x6761;&#x8F68;&#x9053;&#x8981;&#x9519;&#x534A;&#x4E2A;&#x683C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track {
    background: linear-gradient(
        90deg,
        var(--dark) 50%,
        var(--light) 50%
    );
    background-size: 1em;
}

.track:nth-child(2) {
    background-position: 0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        90deg,
        var(--dark) <span class="hljs-number">50%</span>,
        <span class="hljs-built_in">var</span>(--light) <span class="hljs-number">50%</span>
    );
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0.5em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA; 2 &#x4E2A;&#x77E9;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track {
    position: relative;
    display: flex;
    align-items: center;
}

.track::before {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 0.8em;
    background-color: var(--light);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
}

<span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.8em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--light);
}</code></pre><p>&#x8BA9;&#x8FD9; 2 &#x4E2A;&#x77E9;&#x5F62;&#x5728;&#x8F68;&#x9053;&#x4E0A;&#x5F80;&#x590D;&#x79FB;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track::before {
    animation: move 5s linear infinite alternate;
}

@keyframes move {
    from {
        left: 0;
    }
    
    to {
        left: calc(100% - 2em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: move <span class="hljs-number">5s</span> linear infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> move {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(100% - 2em);
    }
}</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x4E24;&#x4E2A;&#x77E9;&#x5F62;&#x770B;&#x8D77;&#x6765;&#x662F;&#x4E00;&#x5148;&#x4E00;&#x540E;&#x5730;&#x524D;&#x8FDB;&#x7684;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x5B83;&#x4EEC;&#x662F;&#x5728;&#x540C;&#x4E00;&#x65F6;&#x523B;&#x5F00;&#x59CB;&#x5E76;&#x4E14;&#x4EE5;&#x76F8;&#x540C;&#x7684;&#x901F;&#x5EA6;&#x5728;&#x79FB;&#x52A8;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x63ED;&#x79D8;&#x771F;&#x76F8;&#x3002;</p><p>&#x5728; dom &#x4E2D;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x4F5C;&#x4E3A;&#x6309;&#x94AE;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;span class=&apos;track&apos;&gt;&lt;/span&gt;
    &lt;span class=&apos;track&apos;&gt;&lt;/span&gt;
    &lt;span class=&quot;toggle&quot;&gt;Show me the truth&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;track&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;track&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toggle&quot;</span>&gt;</span>Show me the truth<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E;&#x6309;&#x94AE;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle {
    order: -1;
    width: 10em;
    height: 2em;
    border: 2px solid var(--dark);
    border-radius: 0.2em;
    font-size: 0.5em;
    font-family: sans-serif;
    font-weight: bold;
    color: black;
    text-align: center;
    line-height: 2em;
    cursor: pointer;
    user-select: none;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span> {
    <span class="hljs-attribute">order</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">var</span>(--dark);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">color</span>: black;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">user-select</span>: none;
}</code></pre><p>&#x4E3A;&#x6309;&#x94AE;&#x8BBE;&#x7F6E;&#x4E0E;&#x8F68;&#x9053;&#x98CE;&#x683C;&#x7C7B;&#x4F3C;&#x7684;&#x80CC;&#x666F;&#xFF0C;&#x4EE5;&#x53CA;&#x9F20;&#x6807;&#x60AC;&#x505C;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toggle {
    background-image: linear-gradient(to right, #ddd 50%, #999 50%);
    background-size: 1em;
    transition: 0.5s;
}

.toggle:hover {
    background-position: 5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toggle</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to right, #ddd 50%, #999 50%);
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.5s</span>;
}

<span class="hljs-selector-class">.toggle</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">5em</span>;
}</code></pre><p>&#x589E;&#x52A0;&#x4E00;&#x6BB5;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x811A;&#x672C;&#xFF0C;&#x4E3A;&#x8F68;&#x9053;&#x5143;&#x7D20;&#x5207;&#x6362;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let $toggle = document.getElementsByClassName(&apos;toggle&apos;)[0]
let $tracks = Array.from(document.getElementsByClassName(&apos;track&apos;))

$toggle.addEventListener(&apos;click&apos;, function() {
    $tracks.forEach(track =&gt; track.classList.toggle(&apos;highlights&apos;))
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> $toggle = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;toggle&apos;</span>)[<span class="hljs-number">0</span>]
<span class="hljs-keyword">let</span> $tracks = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;track&apos;</span>))

$toggle.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $tracks.forEach(<span class="hljs-function"><span class="hljs-params">track</span> =&gt;</span> track.classList.toggle(<span class="hljs-string">&apos;highlights&apos;</span>))
})</code></pre><p>&#x7EC8;&#x4E8E;&#xFF0C;&#x8C1C;&#x5E95;&#x5C31;&#x5728;&#x5207;&#x6362;&#x6837;&#x5F0F;&#x4E4B;&#x540E;&#x88AB;&#x63ED;&#x6653;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".track::before {
    box-sizing: border-box;
    border: solid var(--dark);
    border-width: 0;
}

.track.highlights::before {
    background-color: white;
    border-width: 0.1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.track</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-built_in">var</span>(--dark);
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.track</span><span class="hljs-selector-class">.highlights</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0.1em</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：129# 视频演示如何用纯 CSS 和 VanillaJS 创作一个条纹错觉动画

## 原文链接
[https://segmentfault.com/a/1190000016303635](https://segmentfault.com/a/1190000016303635)


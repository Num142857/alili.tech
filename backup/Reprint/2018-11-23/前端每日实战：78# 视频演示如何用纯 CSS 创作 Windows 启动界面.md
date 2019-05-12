---
title: '前端每日实战：78# 视频演示如何用纯 CSS 创作 Windows 启动界面' 
date: 2018-11-23 2:30:10
hidden: true
slug: 2u1zeljqf8g
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdKXz?w=400&amp;h=247" src="https://static.alili.tech/img/bVbdKXz?w=400&amp;h=247" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/WKQdpx" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/WKQdpx</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/WKQdpx" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cgzaEH9" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cgzaEH9</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868; logo &#x548C;&#x8FDB;&#x5EA6;&#x6761;&#xFF0C;logo &#x53C8;&#x5305;&#x542B; 3 &#x6BB5;&#x6587;&#x5B57;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;windows-boot&quot;&gt;
    &lt;div class=&quot;logo&quot;&gt;
        &lt;p class=&quot;ms&quot;&gt;Microsoft&lt;/p&gt;
        &lt;p class=&quot;win&quot;&gt;Windows&lt;/p&gt;
        &lt;p class=&quot;pro&quot;&gt;Professional&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;bar&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;windows-boot&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ms&quot;</span>&gt;</span>Microsoft<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;win&quot;</span>&gt;</span>Windows<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pro&quot;</span>&gt;</span>Professional<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bar&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
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
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".windows-boot {
    width: 21.5em;
    height: 15em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.windows-boot</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">21.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">15em</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x6BB5;&#x843D;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo p {
    color: white;
    font-family: sans-serif;
    margin: 0;
    padding: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B57;&#x53F7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo .ms {
    font-size: 1.6em;
}

.logo .win {
    font-size: 4.2em;
}

.logo .pro {
    font-size: 3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.ms</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.6em</span>;
}

<span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.win</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">4.2em</span>;
}

<span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.pro</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3em</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x7C97;&#x7EC6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo .ms {
    font-weight: lighter;
}

.logo .win {
    font-weight: bold;
}

.logo .pro {
    font-weight: lighter;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.ms</span> {
    <span class="hljs-attribute">font-weight</span>: lighter;
}

<span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.win</span> {
    <span class="hljs-attribute">font-weight</span>: bold;
}

<span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.pro</span> {
    <span class="hljs-attribute">font-weight</span>: lighter;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x884C;&#x9AD8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo .ms {
    line-height: 1em;
}

.logo .win {
    line-height: 86%;
}

.logo .pro {
    line-height: 1em;
    padding-left: 0.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.ms</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.win</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">86%</span>;
}

<span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.pro</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">0.2em</span>;
}</code></pre><p>&#x5728; &quot;Microsoft&quot; &#x540E;&#x9762;&#x589E;&#x52A0;&#x5546;&#x6807;&#x7248;&#x6743;&#x7B26;&#x53F7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo .ms::after {
    content: &apos;\00a9&apos;;
    font-size: 0.625em;
    vertical-align: top;
    position: relative;
    top: -0.3em;
    left: 0.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.ms</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;\00a9&apos;</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.625em</span>;
    <span class="hljs-attribute">vertical-align</span>: top;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.3em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.2em</span>;
}</code></pre><p>&#x5728; &quot;Windows&quot; &#x540E;&#x9762;&#x589E;&#x52A0; &quot;xp&quot;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo .win::after {
    content: &apos;XP&apos;;
    font-size: 0.5em;
    vertical-align: top;
    position: relative;
    top: -0.4em;
    color: tomato;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> <span class="hljs-selector-class">.win</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;XP&apos;</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">vertical-align</span>: top;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">color</span>: tomato;
}</code></pre><p>&#x5B9A;&#x4E49;&#x8FDB;&#x5EA6;&#x6761;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bar {
    width: 15em;
    height: 1em;
    border: 0.2em solid silver;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bar</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid silver;
}</code></pre><p>&#x589E;&#x52A0; logo &#x548C;&#x8FDB;&#x5EA6;&#x6761;&#x7684;&#x95F4;&#x8DDD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".windows-xp-loader {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.windows-xp-loader</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">justify-content</span>: space-between;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x8FDB;&#x5EA6;&#x6761;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bar {
    border-radius: 0.7em;
    position: relative;
    padding: 0.2em;
}

.bar::before {
    content: &apos;&apos;;
    position: absolute;
    width: 3em;
    height: 70%;
    background-color: dodgerblue;
    border-radius: 0.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bar</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.7em</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.2em</span>;
}

<span class="hljs-selector-class">.bar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">70%</span>;
    <span class="hljs-attribute">background-color</span>: dodgerblue;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2em</span>;
}</code></pre><p>&#x7528;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x8BBE;&#x7F6E;&#x8FDB;&#x5EA6;&#x6761;&#x4E2D;&#x84DD;&#x8272;&#x8272;&#x5757;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bar::before {
    background: 
        linear-gradient(
            to right,
            transparent 30%,
            black 30%, black 35%,
            transparent 35%, transparent 65%,
            black 65%, black 70%,
            transparent 70%
        ),
        linear-gradient(
            blue 0%,
            royalblue 17%,
            deepskyblue 32%, deepskyblue 45%,
            royalblue 60%,
            blue 100%
        );
    filter: brightness(1.2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">linear-gradient</span>(
            to right,
            transparent 30%,
            black 30%, black 35%,
            transparent 35%, transparent 65%,
            black 65%, black 70%,
            transparent 70%
        ),
        <span class="hljs-built_in">linear-gradient</span>(
            blue 0%,
            royalblue 17%,
            deepskyblue 32%, deepskyblue 45%,
            royalblue 60%,
            blue 100%
        );
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">brightness</span>(1.2);
}</code></pre><p>&#x589E;&#x52A0;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bar::before {
    animation: run 2s linear infinite;
}

@keyframes run {
    from {
        transform: translateX(-3em);
    }

    to {
        transform: translateX(15em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: run <span class="hljs-number">2s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> run {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-3em);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(15em);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x8FDB;&#x5EA6;&#x6761;&#x4E4B;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bar {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bar</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：78# 视频演示如何用纯 CSS 创作 Windows 启动界面

## 原文链接
[https://segmentfault.com/a/1190000015632759](https://segmentfault.com/a/1190000015632759)


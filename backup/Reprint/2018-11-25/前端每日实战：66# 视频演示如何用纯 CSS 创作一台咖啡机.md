---
title: '前端每日实战：66# 视频演示如何用纯 CSS 创作一台咖啡机' 
date: 2018-11-25 2:30:07
hidden: true
slug: 7d6spmtvjeu
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcWxG?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWxG?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/rKPLMW" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/rKPLMW</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/rKPLMW" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/c6NzPfK" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/c6NzPfK</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x673A;&#x4F53;&#x3001;&#x51FA;&#x6C34;&#x53E3;&#x3001;&#x5496;&#x5561;&#x676F;&#x3001;&#x6309;&#x94AE;&#x548C;&#x5496;&#x5561;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;coffee-machine&quot;&gt;
    &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;spout&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;cup&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;button&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;coffee&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;coffee-machine&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;body&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;spout&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cup&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;button&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;coffee&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right bottom, sandybrown, darkred);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right bottom, sandybrown, darkred);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coffee-machine {
    width: 15em;
    height: 15em;
    background-color: white;
    font-size: 20px;
    border-radius: 50%;
    border: 2em solid white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coffee-machine</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2em</span> solid white;
}</code></pre><p>&#x753B;&#x51FA;&#x673A;&#x4F53;&#x7684;&#x5916;&#x6846;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coffee-machine {
    position: relative;
    display: flex;
    justify-content: center;
}

.body {
    position: absolute;
    width: 8em;
    height: 12em;
    background-color: sandybrown;
    border-radius: 1.2em;
    top: 1.5em;
    border-right: 0.6em solid peru;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coffee-machine</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">background-color</span>: sandybrown;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.6em</span> solid peru;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x673A;&#x4F53;&#x7684;&#x4E2D;&#x95F4;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body::after {
    content: &apos;&apos;;
    position: absolute;
    width: 8em;
    height: 8em;
    background-color: darkslategray;
    top: 2em;
    border-right: 0.6em solid black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">background-color</span>: darkslategray;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.6em</span> solid black;
}</code></pre><p>&#x753B;&#x51FA;&#x51FA;&#x6C34;&#x53E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".spout {
    position: absolute;
    width: 3em;
    height: 1em;
    background-color: white;
    top: 3.5em;
    border-radius: 0.5em;
    border-right: 0.5em solid silver;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.spout</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.5em</span> solid silver;
}</code></pre><p>&#x753B;&#x51FA;&#x5496;&#x5561;&#x676F;&#x7684;&#x676F;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cup {
    position: absolute;
    width: 3em;
    height: 2em;
    background-color: white;
    bottom: 3.5em;
    border-radius: 0 0 1.4em 1.4em;
    border-right: 0.5em solid silver;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cup</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">3.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1.4em</span> <span class="hljs-number">1.4em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.5em</span> solid silver;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x5496;&#x5561;&#x676F;&#x7684;&#x628A;&#x624B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cup::after {
    content: &apos;&apos;;
    position: absolute;
    width: 0.6em;
    height: 0.6em;
    border: 0.3em solid silver;
    border-radius: 50%;
    right: -1.2em;
    top: 0.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cup</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.6em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.3em</span> solid silver;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.2em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x6309;&#x94AE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    background-color: tomato;
    border-radius: 50%;
    bottom: 2em;
    right: 4.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.button</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">background-color</span>: tomato;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">4.5em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5496;&#x5561;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coffee::before,
.coffee::after {
    content: &apos;&apos;;
    position: absolute;
    width: 0.7em;
    height: 5em;
    background-color: chocolate;
    top: 4.5em;
    left: calc((15em - 0.7em) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coffee</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.coffee</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">background-color</span>: chocolate;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">4.5em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((15em - 0.7em) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6DA6;&#x8272;&#x4E00;&#x4E0B;&#x3002;</p><p>&#x4E3A;&#x5496;&#x5561;&#x673A;&#x589E;&#x52A0;&#x5149;&#x5F71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coffee-machine {
    z-index: 1;
}

.coffee-machine::before,
.coffee-machine::after {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 2em;
    border: 0.3em solid transparent;
    z-index: 2;
    border-radius: 50%;
    border-left-color: white;
    left: 3.8em;
}

.coffee-machine::before {
    top: 1.8em;
    transform: rotate(40deg);
}

.coffee-machine::after {
    bottom: 1.8em;
    transform: rotate(-40deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coffee-machine</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.coffee-machine</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.coffee-machine</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.3em</span> solid transparent;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: white;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">3.8em</span>;
}

<span class="hljs-selector-class">.coffee-machine</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.8em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(40deg);
}

<span class="hljs-selector-class">.coffee-machine</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1.8em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-40deg);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5496;&#x5561;&#x6D41;&#x52A8;&#x7684;&#x524D;&#x534A;&#x6BB5;&#x52A8;&#x753B;&#xFF0C;&#x5373;&#x5496;&#x5561;&#x4ECE;&#x51FA;&#x6C34;&#x53E3;&#x6D41;&#x5230;&#x676F;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coffee::before {
    animation: 2s linear infinite;
    animation-name: pouring-before;
    transform-origin: top;
}

@keyframes pouring-before {
    0%, 20% {
        transform: scaleY(0);
    }

    30%, 100% {
        transform: scaleY(1);
    }

    70%, 100% {
        visibility: hidden;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coffee</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: <span class="hljs-number">2s</span> linear infinite;
    <span class="hljs-attribute">animation-name</span>: pouring-before;
    <span class="hljs-attribute">transform-origin</span>: top;
}

@<span class="hljs-keyword">keyframes</span> pouring-before {
    0%, 20% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
    }

    30%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1);
    }

    70%, 100% {
        <span class="hljs-attribute">visibility</span>: hidden;
    }
}</code></pre><p>&#x5B9A;&#x4E49;&#x5496;&#x5561;&#x6D41;&#x52A8;&#x7684;&#x540E;&#x534A;&#x6BB5;&#x52A8;&#x753B;&#xFF0C;&#x5373;&#x51FA;&#x6C34;&#x53E3;&#x505C;&#x6B62;&#x6D41;&#x51FA;&#x5496;&#x5561;&#xFF0C;&#x5269;&#x4F59;&#x5496;&#x5561;&#x6D41;&#x5230;&#x676F;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".coffee::after {
    animation: 2s linear infinite;
    animation-name: pouring-after;
    transform-origin: bottom;
}

@keyframes pouring-after {
    0%, 70% {
        visibility: hidden;
        transform: scaleY(1);
    }

    80%, 100% {
        transform: scaleY(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.coffee</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: <span class="hljs-number">2s</span> linear infinite;
    <span class="hljs-attribute">animation-name</span>: pouring-after;
    <span class="hljs-attribute">transform-origin</span>: bottom;
}

@<span class="hljs-keyword">keyframes</span> pouring-after {
    0%, 70% {
        <span class="hljs-attribute">visibility</span>: hidden;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1);
    }

    80%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：66# 视频演示如何用纯 CSS 创作一台咖啡机

## 原文链接
[https://segmentfault.com/a/1190000015438963](https://segmentfault.com/a/1190000015438963)


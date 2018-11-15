---
title: '前端每日实战：142# 视频演示如何用 CSS 的 Grid 布局创作一枚小鸡邮票'
reprint: true
categories: reprint
abbrlink: 1de39bf4
date: 2018-11-07 02:30:14
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/bVbhqIw?w=400&amp;h=300" src="https://static.alili.tech/img/bVbhqIw?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/mGZbmQ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/mGZbmQ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/mGZbmQ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cWMPaha" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cWMPaha</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x8868;&#x793A;&#x90AE;&#x7968;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stamp&quot;&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stamp&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: teal;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stamp {
    position: relative;
    width: 57em;
    height: 71em;
    font-size: 5px;
    padding: 5em;
    background-color: white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stamp</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">57em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">71em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">background-color</span>: white;
}</code></pre><p>&#x7528;&#x91CD;&#x590D;&#x80CC;&#x666F;&#x7ED8;&#x5236;&#x51FA;&#x90AE;&#x7968;&#x7684;&#x9F7F;&#x5B54;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stamp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.stamp::after,
.stamp::before {
    content: &apos;&apos;;
    width: 100%;
    height: 100%;
    position: absolute;
    background: 
        radial-gradient(circle, teal 50%, transparent 50%),
        radial-gradient(circle, teal 50%, transparent 50%);
    background-size: 3.5em 3.5em;
}

.stamp::before {
    top: 1.5em;
    background-repeat: repeat-y;
    background-position: -3% 0, 103% 0;
}

.stamp::after {
    left: 1.5em;
    background-repeat: repeat-x;
    background-position: 0 -2.5%, 0 102.5%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stamp</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.stamp</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.stamp</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(circle, teal 50%, transparent 50%),
        <span class="hljs-built_in">radial-gradient</span>(circle, teal 50%, transparent 50%);
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">3.5em</span> <span class="hljs-number">3.5em</span>;
}

<span class="hljs-selector-class">.stamp</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">background-repeat</span>: repeat-y;
    <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">3%</span> <span class="hljs-number">0</span>, <span class="hljs-number">103%</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.stamp</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">background-repeat</span>: repeat-x;
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> -<span class="hljs-number">2.5%</span>, <span class="hljs-number">0</span> <span class="hljs-number">102.5%</span>;
}</code></pre><p>&#x5728; html &#x6587;&#x4EF6;&#x4E2D;&#x589E;&#x52A0;&#x5C0F;&#x9E21;&#x7684; dom &#x5143;&#x7D20;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x5206;&#x522B;&#x8868;&#x793A;&#x5934;&#x90E8;&#x3001;&#x5599;&#x3001;&#x8EAB;&#x4F53;&#x3001;&#x5C3E;&#x5DF4;&#x3001;&#x817F;&#x3001;&#x722A;&#x5B50;&#x3001;&#x592A;&#x9633;&#x3001;&#x6854;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stamp&quot;&gt;
    &lt;div class=&quot;rooster&quot;&gt;
        &lt;span class=&quot;head&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;beak&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;tail&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;leg&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;foot&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;sun&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;orange-stuff&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stamp&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rooster&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;head&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;beak&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;body&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tail&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;leg&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;foot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sun&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;orange-stuff&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E; grid &#x5E03;&#x5C40;&#x7684;&#x884C;&#x5217;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rooster {
    display: grid;
    grid-template-columns: 22.5em 13em 1.75em 14.5em 4.5em;
    grid-template-rows: 12.5em 14.5em 15em 8em 5.5em;
    background-color: wheat;
    padding: 2em;
    margin-top: -2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rooster</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">22.5em</span> <span class="hljs-number">13em</span> <span class="hljs-number">1.75em</span> <span class="hljs-number">14.5em</span> <span class="hljs-number">4.5em</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">12.5em</span> <span class="hljs-number">14.5em</span> <span class="hljs-number">15em</span> <span class="hljs-number">8em</span> <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">background-color</span>: wheat;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">2em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x5934;&#x90E8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".head {
    grid-column: 4;
    grid-row: 2;
    background-color: burlywood;
    border-top-left-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.head</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">background-color</span>: burlywood;
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5C0F;&#x9E21;&#x7684;&#x773C;&#x775B;&#x548C;&#x8138;&#x4E0A;&#x7684;&#x7EA2;&#x6655;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".head {
    position: relative;
}

.head::after {
    content: &apos;&apos;;
    position: absolute;
    width: 2.8em;
    height: 2.8em;
    border-radius: 50%;
    background-color: black;
    right: 30%;
    box-shadow: 2em 4em 4em rgba(255, 100, 0, 0.5);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.head</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.head</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2.8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.8em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">30%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2em</span> <span class="hljs-number">4em</span> <span class="hljs-number">4em</span> <span class="hljs-built_in">rgba</span>(255, 100, 0, 0.5);
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x5599;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".beak {
    grid-column: 5;
    grid-row: 2;
    height: 4.5em;
    background-color: darkorange;
    border-bottom-right-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.beak</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4.5em</span>;
    <span class="hljs-attribute">background-color</span>: darkorange;
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x8EAB;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body {
    grid-column: 2 / 5;
    grid-row: 3;
    width: 30em;
    background-color: saddlebrown;
    border-radius: 0 0 15em 15em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span> / <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">background-color</span>: saddlebrown;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">15em</span> <span class="hljs-number">15em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#xFF0C;&#x901A;&#x8FC7;&#x9634;&#x5F71;&#x753B;&#x51FA;&#x7FC5;&#x8180;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body {
    position: relative;
    overflow: hidden;
}

.body::after {
    content: &apos;&apos;;
    position: absolute;
    width: 20em;
    height: 10em;
    border-radius: inherit;
    box-shadow: 4em 2em 4em rgba(0, 0, 0, 0.3);
    left: calc((30em - 20em) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">border-radius</span>: inherit;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">4em</span> <span class="hljs-number">2em</span> <span class="hljs-number">4em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((30em - 20em) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x5C3E;&#x5DF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tail {
    grid-column: 1;
    grid-row: 1 / 3;
    height: 22.5em;
    background-color: burlywood;
    align-self: end;
    border-top-left-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.tail</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">22.5em</span>;
    <span class="hljs-attribute">background-color</span>: burlywood;
    <span class="hljs-attribute">align-self</span>: end;
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x817F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".leg {
    grid-column: 4;
    grid-row: 4;
    width: 8em;
    background-color: burlywood;
    border-bottom-right-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.leg</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">background-color</span>: burlywood;
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x5C0F;&#x722A;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".foot {
    grid-column: 4;
    grid-row: 5;
    width: 5.5em;
    background-color: darkorange;
    border-top-right-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.foot</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">5</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">background-color</span>: darkorange;
    <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x592A;&#x9633;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sun {
    grid-column: 3 / 5;
    grid-row: 1;
    width: 17em;
    --h: calc(17em / 2);
    height: var(--h);
    background-color: darkorange;
    border-radius: 0 0 var(--h) var(--h);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sun</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span> / <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">17em</span>;
    <span class="hljs-attribute">--h</span>: <span class="hljs-built_in">calc</span>(17em / 2);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--h);
    <span class="hljs-attribute">background-color</span>: darkorange;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">var</span>(--h) <span class="hljs-built_in">var</span>(--h);
}</code></pre><p>&#x753B;&#x51FA;&#x5706;&#x5F62;&#x7684;&#x6854;&#x5B50;&#x548C;&#x534A;&#x5706;&#x5F62;&#x7684;&#x53F6;&#x7247;&#xFF0C;&#x6CE8;&#x610F;&#x6B64;&#x5904;&#x53F6;&#x7247;&#x7684;&#x753B;&#x6CD5;&#x4E0E;&#x524D;&#x9762;&#x753B;&#x534A;&#x5706;&#x5F62;&#x7684;&#x753B;&#x6CD5;&#x4E0D;&#x540C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".orange-stuff {
    grid-column: 1;
    grid-row: 3 / 6;
    width: 16em;
    height: 16em;
    background-color: darkorange;
    align-self: end;
    justify-self: end;
    border-radius: 50%;
    position: relative;
}

.orange-stuff::before {
    content: &apos;&apos;;
    position: absolute;
    width: 8em;
    height: 8em;
    background: linear-gradient(45deg, transparent 50%, saddlebrown 50%);
    border-radius: 50%;
    top: -6.8em;
    left: 10%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.orange-stuff</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span> / <span class="hljs-number">6</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">background-color</span>: darkorange;
    <span class="hljs-attribute">align-self</span>: end;
    <span class="hljs-attribute">justify-self</span>: end;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.orange-stuff</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(45deg, transparent 50%, saddlebrown 50%);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">6.8em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10%</span>;
}</code></pre><p>&#x5728; dom &#x4E2D;&#x518D;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x6587;&#x672C;&#xFF0C;&#x5305;&#x62EC;&#x6807;&#x9898;&#x3001;&#x4F5C;&#x8005;&#x548C;&#x9762;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stamp&quot;&gt;
    &lt;div class=&quot;puppy&quot;&gt;
        &lt;!-- &#x7565; --&gt;
    &lt;/div&gt;
    &lt;p class=&quot;text&quot;&gt;
        &lt;span class=&quot;title&quot;&gt;Rooster&lt;/span&gt;
        &lt;span class=&quot;author&quot;&gt;comehope&lt;/span&gt;
        &lt;span class=&quot;face-value&quot;&gt;120&lt;/span&gt;
    &lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stamp&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;puppy&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x7565; --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Rooster<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;author&quot;</span>&gt;</span>comehope<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;face-value&quot;</span>&gt;</span>120<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E;&#x6807;&#x9898;&#x7684;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    position: relative;
    width: calc(100% + 2em * 2);
    height: 6em;
    font-family: sans-serif;
}

.text .title {
    position: absolute;
    font-size: 6em;
    font-weight: bold;
    color: brown;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(100% + 2em * 2);
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
}

<span class="hljs-selector-class">.text</span> <span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">color</span>: brown;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x4F5C;&#x8005;&#x7684;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text .author {
    position: absolute;
    font-size: 3em;
    bottom: -1.2em;
    color: dimgray;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> <span class="hljs-selector-class">.author</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">color</span>: dimgray;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x9762;&#x503C;&#x7684;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text .face-value {
    position: absolute;
    font-size: 14em;
    right: 0;
    line-height: 0.9em;
    color: darkcyan;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> <span class="hljs-selector-class">.face-value</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">0.9em</span>;
    <span class="hljs-attribute">color</span>: darkcyan;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;!</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：142# 视频演示如何用 CSS 的 Grid 布局创作一枚小鸡邮票

## 原文链接
[https://segmentfault.com/a/1190000016508267](https://segmentfault.com/a/1190000016508267)


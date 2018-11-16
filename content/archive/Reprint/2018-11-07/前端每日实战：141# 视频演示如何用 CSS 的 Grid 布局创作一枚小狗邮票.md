---
title: '前端每日实战：141# 视频演示如何用 CSS 的 Grid 布局创作一枚小狗邮票'
hidden: true
categories: [reprint]
slug: ba962cf6
date: 2018-11-07 02:30:15
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbhqjK?w=400&amp;h=300" src="https://static.alili.tech/img/bVbhqjK?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/BOeEYV" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/BOeEYV</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/BOeEYV" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cPQ3vcq" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cPQ3vcq</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x8868;&#x793A;&#x90AE;&#x7968;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stamp&quot;&gt;
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
    width: 40.5em;
    height: 71em;
    font-size: 6px;
    padding: 5em;
    background-color: white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.stamp</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">71em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">6px</span>;
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
    background: radial-gradient(circle, teal 50%, transparent 50%),
    radial-gradient(circle, teal 50%, transparent 50%);
    background-size: 3.5em 3.5em;
}

.stamp::before {
    top: 1.5em;
    background-repeat: repeat-y;
    background-position: -4.5% 0, 104.5% 0;
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
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, teal 50%, transparent 50%),
    <span class="hljs-built_in">radial-gradient</span>(circle, teal 50%, transparent 50%);
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">3.5em</span> <span class="hljs-number">3.5em</span>;
}

<span class="hljs-selector-class">.stamp</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">background-repeat</span>: repeat-y;
    <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">4.5%</span> <span class="hljs-number">0</span>, <span class="hljs-number">104.5%</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.stamp</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">background-repeat</span>: repeat-x;
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> -<span class="hljs-number">2.5%</span>, <span class="hljs-number">0</span> <span class="hljs-number">102.5%</span>;
}</code></pre><p>&#x5728; html &#x6587;&#x4EF6;&#x4E2D;&#x589E;&#x52A0;&#x5C0F;&#x72D7;&#x7684; dom &#x5143;&#x7D20;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x5206;&#x522B;&#x8868;&#x793A;&#x8033;&#x6735;&#x3001;&#x5934;&#x90E8;&#x3001;&#x773C;&#x775B;&#x3001;&#x820C;&#x5934;&#x3001;&#x8EAB;&#x4F53;&#x3001;&#x5C3E;&#x5DF4;&#x548C;&#x722A;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stamp&quot;&gt;
    &lt;div class=&quot;puppy&quot;&gt;
        &lt;span class=&quot;ear&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;head&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;eyes&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;tongue&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;tail&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;foot&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stamp&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;puppy&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;head&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;eyes&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tongue&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;body&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tail&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;foot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E; grid &#x5E03;&#x5C40;&#x7684;&#x884C;&#x5217;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".puppy {
    display: grid;
    grid-template-columns: 10em 22.5em 8em;
    grid-template-rows: 21em 12.5em 3.75em 22.5em;
    background-color: tan;
    padding: 2em;
    margin-top: -1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.puppy</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">10em</span> <span class="hljs-number">22.5em</span> <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">21em</span> <span class="hljs-number">12.5em</span> <span class="hljs-number">3.75em</span> <span class="hljs-number">22.5em</span>;
    <span class="hljs-attribute">background-color</span>: tan;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">1em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5C0F;&#x72D7;&#x7684;&#x5934;&#x90E8;&#xFF0C;&#x8DE8;&#x7B2C;1&#x5217;&#x548C;&#x7B2C;2&#x5217;&#x3001;&#x7B2C;2&#x884C;&#x548C;&#x7B2C;3&#x884C;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x534A;&#x5706;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".head {
    grid-column: 1 / 3;
    grid-row: 2 / 4;
    border-bottom-left-radius: calc(12.5em + 3.75em);
    border-bottom-right-radius: calc(12.5em + 3.75em);
    background-color: bisque;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.head</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span> / <span class="hljs-number">4</span>;
    <span class="hljs-attribute">border-bottom-left-radius</span>: <span class="hljs-built_in">calc</span>(12.5em + 3.75em);
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-built_in">calc</span>(12.5em + 3.75em);
    <span class="hljs-attribute">background-color</span>: bisque;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x9F3B;&#x5B50;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x6247;&#x5F62;&#xFF0C;&#x591A;&#x4F59;&#x7684;&#x90E8;&#x5206;&#x88AB;&#x9690;&#x85CF;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".head {
    position: relative;
    overflow: hidden;
}

.head::before {
    content: &apos;&apos;;
    position: absolute;
    width: 7em;
    height: 7em;
    border-bottom-right-radius: 100%;
    background-color: sienna;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.head</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.head</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background-color</span>: sienna;
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x773C;&#x6655;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
    position: relative;
    height: 10.5em;
    width: 21em;
    border-radius: 0 0 10.5em 10.5em;
    background-color: sienna;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">justify-self</span>: end;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10.5em</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">21em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10.5em</span> <span class="hljs-number">10.5em</span>;
    <span class="hljs-attribute">background-color</span>: sienna;
}</code></pre><p>&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x773C;&#x73E0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes {
    background-image: radial-gradient(
        circle at 37% 33%,
        black 1.4em,
        transparent 1.4em
    );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">radial-gradient</span>(
        circle at 37% 33%,
        black 1.4em,
        transparent 1.4em
    );
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x8033;&#x6735;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ear {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    width: 10.5em;
    border-radius: 21em 0 0 21em;
    background-color: sienna;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ear</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">justify-self</span>: end;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">21em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">21em</span>;
    <span class="hljs-attribute">background-color</span>: sienna;
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x820C;&#x5934;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tongue {
    grid-column: 1;
    grid-row: 3;
    width: 5.5em;
    height: 5.5em;
    background-color: indianred;
    border-bottom-left-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.tongue</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">background-color</span>: indianred;
    <span class="hljs-attribute">border-bottom-left-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x6247;&#x5F62;&#x7684;&#x8EAB;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body {
    grid-column: 2;
    grid-row: 4;
    background-color: sienna;
    border-top-left-radius: 100%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">background-color</span>: sienna;
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">100%</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#xFF0C;&#x901A;&#x8FC7;&#x9634;&#x5F71;&#x753B;&#x51FA;&#x4E2D;&#x8E72;&#x7740;&#x7684;&#x817F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body {
    position: relative;
    overflow: hidden;
}

.body::after {
    content: &apos;&apos;;
    position: absolute;
    height: 50%;
    width: 100%;
    border-radius: 11.25em 11.25em 0 0;
    box-shadow: 2em 0 4em rgba(0, 0, 0, 0.3);
    bottom: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">11.25em</span> <span class="hljs-number">11.25em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2em</span> <span class="hljs-number">0</span> <span class="hljs-number">4em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x5C3E;&#x5DF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tail {
    grid-column: 1;
    grid-row: 4;
    justify-self: end;
    align-self: end;
    height: 17.5em;
    width: 8.75em;
    background-color: bisque;
    border-radius: 17.5em 0 0 17.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.tail</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">justify-self</span>: end;
    <span class="hljs-attribute">align-self</span>: end;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">17.5em</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8.75em</span>;
    <span class="hljs-attribute">background-color</span>: bisque;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">17.5em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">17.5em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x534A;&#x5706;&#x5F62;&#x7684;&#x5C0F;&#x722A;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".foot {
    grid-column: 3;
    grid-row: 4;
    align-self: end;
    height: 4em;
    background-color: bisque;
    border-radius: 4em 4em 0 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.foot</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">align-self</span>: end;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background-color</span>: bisque;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4em</span> <span class="hljs-number">4em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre><p>&#x5728; dom &#x4E2D;&#x518D;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x6587;&#x672C;&#xFF0C;&#x5305;&#x62EC;&#x6807;&#x9898;&#x3001;&#x4F5C;&#x8005;&#x548C;&#x9762;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;stamp&quot;&gt;
    &lt;div class=&quot;puppy&quot;&gt;
        &lt;!-- &#x7565; --&gt;
    &lt;/div&gt;
    &lt;p class=&quot;text&quot;&gt;
        &lt;span class=&quot;title&quot;&gt;Puppy&lt;/span&gt;
        &lt;span class=&quot;author&quot;&gt;comehope&lt;/span&gt;
        &lt;span class=&quot;face-value&quot;&gt;80&lt;/span&gt;
    &lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stamp&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;puppy&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x7565; --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Puppy<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;author&quot;</span>&gt;</span>comehope<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;face-value&quot;</span>&gt;</span>80<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
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
    color: sienna;
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
    <span class="hljs-attribute">color</span>: sienna;
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
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：141# 视频演示如何用 CSS 的 Grid 布局创作一枚小狗邮票

## 原文链接
[https://segmentfault.com/a/1190000016506733](https://segmentfault.com/a/1190000016506733)


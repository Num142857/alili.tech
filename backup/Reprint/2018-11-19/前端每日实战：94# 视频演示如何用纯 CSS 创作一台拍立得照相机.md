---
title: '前端每日实战：94# 视频演示如何用纯 CSS 创作一台拍立得照相机' 
date: 2018-11-19 2:32:04
hidden: true
slug: 41w5ibujb8o
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbezK4?w=400&amp;h=300" src="https://static.alili.tech/img/bVbezK4?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/YjYgey" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/YjYgey</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/YjYgey" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cpQpGtQ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cpQpGtQ</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x955C;&#x5934;&#x548C;&#x7167;&#x7247;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;camera&quot;&gt;
    &lt;span class=&quot;lens&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;picture&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;camera&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;lens&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;picture&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to left bottom, linen, tan);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to left bottom, linen, tan);
}</code></pre><p>&#x753B;&#x51FA;&#x76F8;&#x673A;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".camera {
    width: 20em;
    height: 23em;
    font-size: 10px;
    background: 
        linear-gradient(
            blanchedalmond, blanchedalmond 10em,
            wheat 10em, wheat 14em,
            tan 14em
        );
    border-radius: 2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.camera</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">23em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">linear-gradient</span>(
            blanchedalmond, blanchedalmond 10em,
            wheat 10em, wheat 14em,
            tan 14em
        );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x955C;&#x5934;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".camera {
    position: relative;
}

.lens {
    position: absolute;
    width: 8em;
    height: 8em;
    background: 
        radial-gradient(
            cadetblue 2em,
            #555 2em, #555 2.5em,
            #333 2.5em, #333 4em
        );
    border-radius: 50%;
    top: 3em;
    left: 6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.camera</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.lens</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            cadetblue 2em,
            #555 2em, #555 2.5em,
            #333 2.5em, #333 4em
        );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">6em</span>;
}</code></pre><p>&#x7528;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x4E0B;&#x65B9;&#x7167;&#x7247;&#x7684;&#x51FA;&#x53E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".camera {
    background: 
        linear-gradient(
            transparent 18em,
            #333 18em, #333 19.5em,
            transparent 19.5em
        ) no-repeat center / 80% 100%,
        linear-gradient(
            blanchedalmond, blanchedalmond 10em,
            wheat 10em, wheat 14em,
            tan 14em
        );
    border-radius: 2em;
    position: relative;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.camera</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">linear-gradient</span>(
            transparent 18em,
            #333 18em, #333 19.5em,
            transparent 19.5em
        ) no-repeat center / <span class="hljs-number">80%</span> <span class="hljs-number">100%</span>,
        <span class="hljs-built_in">linear-gradient</span>(
            blanchedalmond, blanchedalmond 10em,
            wheat 10em, wheat 14em,
            tan 14em
        );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">position</span>: relative;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x4FEE;&#x9970;&#x7EC6;&#x8282;&#x3002;<br>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x76F8;&#x673A;&#x7684;&#x53D6;&#x666F;&#x5668;&#x548C;&#x95EA;&#x5149;&#x706F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".camera::before {
    content: &apos;&apos;;
    position: absolute;
    width: 4.5em;
    height: 2em;
    background-color: #333;
    border-radius: 0.5em;
    top: 1.5em;
    left: 1.5em;
}

.camera::after {
    content: &apos;&apos;;
    position: absolute;
    width: 3em;
    height: 3em;
    background-color: #333;
    background-image: radial-gradient(
        teal 10%,
        #333 30%,
        transparent 40%
    );
    right: 1.5em;
    top: 1.5em;
    border-radius: 0.3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.camera</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1.5em</span>;
}

<span class="hljs-selector-class">.camera</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">radial-gradient</span>(
        teal 10%,
        #333 30%,
        transparent 40%
    );
    <span class="hljs-attribute">right</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.3em</span>;
}</code></pre><p>&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x76F8;&#x673A;&#x4E0A;&#x7684;&#x6309;&#x94AE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".camera {
    background: 
        radial-gradient(
            circle at 17em 7em,
            black 0.8em,
            darkgray 0.8em, darkgray 1em,
            transparent 1em
        ),
        radial-gradient(
            circle at 3.6em 7em,
            tomato 1em,
            darkgray 1em, darkgray 1.2em,
            transparent 1.2em
        ),
        linear-gradient(
            transparent 18em,
            #333 18em, #333 19.5em,
            transparent 18em
        ) no-repeat center / 80% 100%,
        linear-gradient(
            blanchedalmond, blanchedalmond 10em,
            wheat 10em, wheat 14em,
            tan 14em
        );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.camera</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 17em 7em,
            black 0.8em,
            darkgray 0.8em, darkgray 1em,
            transparent 1em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 3.6em 7em,
            tomato 1em,
            darkgray 1em, darkgray 1.2em,
            transparent 1.2em
        ),
        <span class="hljs-built_in">linear-gradient</span>(
            transparent 18em,
            #333 18em, #333 19.5em,
            transparent 18em
        ) no-repeat center / <span class="hljs-number">80%</span> <span class="hljs-number">100%</span>,
        <span class="hljs-built_in">linear-gradient</span>(
            blanchedalmond, blanchedalmond 10em,
            wheat 10em, wheat 14em,
            tan 14em
        );
}</code></pre><p>&#x7528;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#x753B;&#x51FA;&#x955C;&#x5934;&#x4E0A;&#x7684;&#x5149;&#x5F71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lens {
    background: 
        radial-gradient(
            circle at 60% 45%,
            khaki 0.1em,
            transparent 0.3em
        ),
        radial-gradient(
            circle at 50% 40%,
            khaki 0.3em,
            transparent 0.5em
        ),
        radial-gradient(
            cadetblue 2em,
            #555 2em, #555 2.5em,
            #333 2.5em, #333 4em
        );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lens</span> {
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 60% 45%,
            khaki 0.1em,
            transparent 0.3em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            circle at 50% 40%,
            khaki 0.3em,
            transparent 0.5em
        ),
        <span class="hljs-built_in">radial-gradient</span>(
            cadetblue 2em,
            #555 2em, #555 2.5em,
            #333 2.5em, #333 4em
        );
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x5236;&#x4F5C;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;<br>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x6A21;&#x62DF;&#x5FEB;&#x95E8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lens::before,
.lens::after {
    content: &apos;&apos;;
    position: absolute;
    width: 5em;
    height: 0.1em;
    background-color: #333;
}

.lens::before {
    top: 1em;
}

.lens::after {
    bottom: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lens</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.lens</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.1em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
}

<span class="hljs-selector-class">.lens</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.lens</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
}</code></pre><p>&#x589E;&#x52A0;&#x5FEB;&#x95E8;&#x5F00;&#x5408;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lens::before,
.lens::after {
    animation: take-a-photo 3s infinite;
}

@keyframes take-a-photo {
    10% {
        height: calc(50% - 1em);
    }

    20% {
        height: 0.1em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lens</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.lens</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: take-a-photo <span class="hljs-number">3s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> take-a-photo {
    10% {
        <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(50% - 1em);
    }

    20% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0.1em</span>;
    }
}</code></pre><p>&#x753B;&#x51FA;&#x7167;&#x7247;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".picture {
    position: absolute;
    width: inherit;
    height: 13em;
    top: 18em;
}

.picture::before {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 15em;
    height: 15em;
    background: #555;
    left: 2.5em;
    border: solid linen;
    border-width: 0 1em 2em 1em;
    bottom: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.picture</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">13em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">18em</span>;
}

<span class="hljs-selector-class">.picture</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#555</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">border</span>: solid linen;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">1em</span> <span class="hljs-number">2em</span> <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x589E;&#x52A0;&#x6253;&#x5370;&#x7167;&#x7247;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".picture {
    height: 0em;
    overflow: hidden;
    animation: print 3s infinite;
}

@keyframes print {
    30% {
        height: 0em;
    }

    80%, 100% {
        height: 13em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.picture</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0em</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">animation</span>: print <span class="hljs-number">3s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> print {
    30% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0em</span>;
    }

    80%, 100% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">13em</span>;
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x76F8;&#x673A;&#x5411;&#x4E0A;&#x632A;&#x4E00;&#x70B9;&#xFF0C;&#x4FDD;&#x6301;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".camera {
    transform: translateY(-3em);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.camera</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-3em);
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：94# 视频演示如何用纯 CSS 创作一台拍立得照相机

## 原文链接
[https://segmentfault.com/a/1190000015828039](https://segmentfault.com/a/1190000015828039)


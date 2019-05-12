---
title: '前端每日实战：51# 视频演示如何用纯 CSS 创作一个雷达扫描动画' 
date: 2018-11-28 2:30:10
hidden: true
slug: adpac1jdppl
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbch1C?w=500&amp;h=500" src="https://static.alili.tech/img/bVbch1C?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/VdbGvr" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/VdbGvr</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/VdbGvr" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cky6wfa" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cky6wfa</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;radar&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radar&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, silver, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, silver, black);
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x80CC;&#x666F;&#x4E3A;&#x9ED1;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar {
    width: 8em;
    height: 8em;
    font-size: 32px;
    background: 
        linear-gradient(black, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">background</span>: 
        <span class="hljs-built_in">linear-gradient</span>(black, black);
}</code></pre><p>&#x5728;&#x80CC;&#x666F;&#x4E0A;&#x753B;&#x51FA; 4 &#x4E2A;&#x540C;&#x5FC3;&#x5706;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar {
    background: 
            repeating-radial-gradient(
                transparent 0, 
                transparent 0.95em, 
                darkgreen 0.95em, 
                darkgreen 1em),
            linear-gradient(black, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span> {
    <span class="hljs-attribute">background</span>: 
            <span class="hljs-built_in">repeating-radial-gradient</span>(
                transparent 0, 
                transparent 0.95em, 
                darkgreen 0.95em, 
                darkgreen 1em),
            <span class="hljs-built_in">linear-gradient</span>(black, black);
}</code></pre><p>&#x5728;&#x80CC;&#x666F;&#x4E0A;&#x518D;&#x753B;&#x51FA;&#x5341;&#x5B57;&#x5750;&#x6807;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar {
    background: 
            linear-gradient(
                90deg,
                transparent 49.75%,
                darkgreen 49.75%,
                darkgreen 50.25%,
                transparent 50.25%),
            linear-gradient(
                transparent 49.75%,
                darkgreen 49.75%,
                darkgreen 50.25%,
                transparent 50.25%),
            repeating-radial-gradient(
                transparent 0, 
                transparent 0.95em, 
                darkgreen 0.95em, 
                darkgreen 1em),
            linear-gradient(black, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span> {
    <span class="hljs-attribute">background</span>: 
            <span class="hljs-built_in">linear-gradient</span>(
                90deg,
                transparent 49.75%,
                darkgreen 49.75%,
                darkgreen 50.25%,
                transparent 50.25%),
            <span class="hljs-built_in">linear-gradient</span>(
                transparent 49.75%,
                darkgreen 49.75%,
                darkgreen 50.25%,
                transparent 50.25%),
            <span class="hljs-built_in">repeating-radial-gradient</span>(
                transparent 0, 
                transparent 0.95em, 
                darkgreen 0.95em, 
                darkgreen 1em),
            <span class="hljs-built_in">linear-gradient</span>(black, black);
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x9762;&#x79EF;&#x7B49;&#x4E8E;&#x5BB9;&#x5668;&#x9762;&#x79EF;&#x56DB;&#x5206;&#x4E4B;&#x4E00;&#x7684;&#x6B63;&#x65B9;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar {
    position: relative;
}

.radar::before {
    content: &apos;&apos;;
    position: absolute;
    width: calc(8em / 2);
    height: calc(8em / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.radar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(8em / 2);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(8em / 2);
}</code></pre><p>&#x628A;&#x6B63;&#x65B9;&#x5F62;&#x53D8;&#x4E3A;&#x6709;&#x62D6;&#x5C3E;&#x6548;&#x679C;&#x7684;&#x6247;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar::before {
    background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 192, 0, 1) 100%
        );
    border-radius: 100% 0 0 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
            45deg,
            rgba(0, 0, 0, 0) <span class="hljs-number">50%</span>,
            <span class="hljs-built_in">rgba</span>(0, 192, 0, 1) <span class="hljs-number">100%</span>
        );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre><p>&#x628A;&#x5BB9;&#x5668;&#x6539;&#x4E3A;&#x5706;&#x5F62;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar {
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x4E3A;&#x5BB9;&#x5668;&#x589E;&#x52A0;&#x4E00;&#x70B9;&#x8FB9;&#x8DDD;&#xFF0C;&#x4EE5;&#x4FBF;&#x6E05;&#x6670;&#x5730;&#x5C55;&#x793A;&#x6700;&#x5916;&#x4FA7;&#x7684;&#x540C;&#x5FC3;&#x5706;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar {
    width: calc(8em + 1.5em);
    height: calc(8em + 1.5em);
}

.radar::before {
    top: calc(1.5em / 2);
    left: calc(1.5em / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(8em + 1.5em);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(8em + 1.5em);
}

<span class="hljs-selector-class">.radar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(1.5em / 2);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(1.5em / 2);
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x62D6;&#x5C3E;&#x589E;&#x52A0;&#x8F6C;&#x52A8;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radar::before {
    animation: scanning 5s linear infinite;
    transform-origin: 100% 100%;
}

@keyframes scanning {
    to {
        transform: rotate(360deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.radar</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: scanning <span class="hljs-number">5s</span> linear infinite;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">100%</span>;
}

@<span class="hljs-keyword">keyframes</span> scanning {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：51# 视频演示如何用纯 CSS 创作一个雷达扫描动画

## 原文链接
[https://segmentfault.com/a/1190000015283286](https://segmentfault.com/a/1190000015283286)


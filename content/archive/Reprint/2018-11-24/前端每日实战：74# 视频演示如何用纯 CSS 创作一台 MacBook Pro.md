---
title: '前端每日实战：74# 视频演示如何用纯 CSS 创作一台 MacBook Pro' 
date: 2018-11-24 2:30:10
hidden: true
slug: ml07s8y5fse
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdugI?w=500&amp;h=500" src="https://static.alili.tech/img/bVbdugI?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/MXNNyR" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/MXNNyR</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/MXNNyR" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cyEPrue" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cyEPrue</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x5C4F;&#x5E55;&#x548C;&#x5E95;&#x5EA7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;macbook&quot;&gt;
    &lt;span class=&quot;screen&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;base&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;macbook&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;screen&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;base&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, white, gray);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, white, gray);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".macbook {
    width: 50em;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.macbook</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre><p>&#x753B;&#x51FA;&#x5C4F;&#x5E55;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".screen {
    width: 40em;
    height: calc(40em * 0.667);
    background-color: black;
    border-radius: 3% 3% 0 0 / 5%;
    border: 0.2em solid silver;
    border-bottom: none;
    position: relative;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.screen</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(40em * 0.667);
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3%</span> <span class="hljs-number">3%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">5%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid silver;
    <span class="hljs-attribute">border-bottom</span>: none;
    <span class="hljs-attribute">position</span>: relative;
}</code></pre><p>&#x753B;&#x51FA;&#x5C4F;&#x5E55;&#x4E0A;&#x7684;&#x5149;&#x5F71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".screen {
    position: relative;
}

.screen::before {
    content: &apos;&apos;;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(
        circle at right bottom,
        rgba(255, 255, 255, 0.4) 75%,
        rgba(255, 255, 255, 0.6) 75%
    );
    margin: 4.3% 3.2%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.screen</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.screen</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(
        circle at right bottom,
        rgba(255, 255, 255, 0.4) <span class="hljs-number">75%</span>,
        <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.6) <span class="hljs-number">75%</span>
    );
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">4.3%</span> <span class="hljs-number">3.2%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5E95;&#x5EA7;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".base {
    position: relative;
}

.base {
    width: inherit;
    height: 1.65em;
    background: linear-gradient(
        white,
        white 55%,
        #999 60%,
        #222 90%,
        rgba(0, 0, 0, 0.1) 100%
    );
    border-radius: 0 0 10% 10% / 0 0 50% 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.base</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.base</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.65em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        white,
        white 55%,
        #999 60%,
        #222 90%,
        rgba(0, 0, 0, 0.1) <span class="hljs-number">100%</span>
    );
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10%</span> <span class="hljs-number">10%</span> / <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>;
}</code></pre><p>&#x4E3A;&#x5E95;&#x5EA7;&#x589E;&#x52A0;&#x5149;&#x7167;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".base::before {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: 55%;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(255, 255, 255, 0.8) 1%,
        rgba(0, 0, 0, 0.4) 4%,
        transparent 15%,
        rgba(255, 255, 255, 0.8) 50%,
        transparent calc(100% - 15%),
        rgba(0, 0, 0, 0.4), calc(100% - 4%),
        rgba(255, 255, 255, 0.8) calc(100% - 1%),
        rgba(0, 0, 0, 0.5) 100%
    );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.base</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">55%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(
        to right,
        rgba(0, 0, 0, 0.5) <span class="hljs-number">0%</span>,
        <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8) <span class="hljs-number">1%</span>,
        <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4) <span class="hljs-number">4%</span>,
        transparent <span class="hljs-number">15%</span>,
        <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8) <span class="hljs-number">50%</span>,
        transparent <span class="hljs-built_in">calc</span>(100% - 15%),
        <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4), <span class="hljs-built_in">calc</span>(100% - 4%),
        <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8) <span class="hljs-built_in">calc</span>(100% - 1%),
        <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5) <span class="hljs-number">100%</span>
    );
}</code></pre><p>&#x753B;&#x51FA;&#x5E95;&#x5EA7;&#x4E0A;&#x7528;&#x4E8E;&#x6380;&#x5F00;&#x5C4F;&#x5E55;&#x7684;&#x7F3A;&#x53E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".base::after {
    content: &apos;&apos;;
    position: absolute;
    width: 7em;
    height: 0.7em;
    background-color: #ddd;
    left: calc(50% - 7em / 2);
    box-shadow: 
        inset -0.5em -0.1em 0.3em rgba(0, 0, 0, 0.2),
        inset 0.5em 0.1em 0.3em rgba(0, 0, 0, 0.2);
    border-radius: 0 0 7% 7% / 0 0 95% 95%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.base</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.7em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(50% - 7em / 2);
    <span class="hljs-attribute">box-shadow</span>: 
        inset -<span class="hljs-number">0.5em</span> -<span class="hljs-number">0.1em</span> <span class="hljs-number">0.3em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2),
        inset <span class="hljs-number">0.5em</span> <span class="hljs-number">0.1em</span> <span class="hljs-number">0.3em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">7%</span> <span class="hljs-number">7%</span> / <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">95%</span> <span class="hljs-number">95%</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：74# 视频演示如何用纯 CSS 创作一台 MacBook Pro

## 原文链接
[https://segmentfault.com/a/1190000015568609](https://segmentfault.com/a/1190000015568609)


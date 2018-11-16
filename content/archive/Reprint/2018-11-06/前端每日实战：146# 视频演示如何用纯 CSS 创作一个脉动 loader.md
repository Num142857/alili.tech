---
title: '前端每日实战：146# 视频演示如何用纯 CSS 创作一个脉动 loader'
hidden: true
categories: [reprint]
slug: 470c27fa
date: 2018-11-06 15:28:31
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbhzSl?w=400&amp;h=300" src="https://static.alili.tech/img/bVbhzSl?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/wYvGwr" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/wYvGwr</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/wYvGwr" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cnMgQTr" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cnMgQTr</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 10 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#eee 70%, pink);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#eee 70%, pink);
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x662F;&#x7C89;&#x8272;&#x80CC;&#x666F;&#x5E76;&#x63CF;&#x8FB9;&#x7684;&#x4E00;&#x4E2A;&#x5706;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 6em;
    height: 6em;
    padding: 3em;
    font-size: 10px;
    background-color: pink;
    border-radius: 50%;
    border: 0.8em solid hotpink;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>: pink;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.8em</span> solid hotpink;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#x4E3A;&#x6A2A;&#x5411;&#x5E73;&#x94FA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    display: flex;
    align-items: center;
    justify-content: space-between;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: space-between;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader &gt; span {
    width: 0.5em;
    height: 50%;
    background-color: deeppink;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: deeppink;
}</code></pre><p>&#x589E;&#x52A0;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader &gt; span {
    transform: scaleY(0.05) translateX(-0.5em);
    animation: span-animate 1.5s infinite ease-in-out;
}

@keyframes span-animate {
    0%, 100% {
        transform: scaleY(0.05) translateX(-0.5em);
    }
    15% {
        transform: scaleY(1.2) translateX(1em);
    }
    90%, 100% {
        background-color: hotpink;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.05) <span class="hljs-built_in">translateX</span>(-0.5em);
    <span class="hljs-attribute">animation</span>: span-animate <span class="hljs-number">1.5s</span> infinite ease-in-out;
}

@<span class="hljs-keyword">keyframes</span> span-animate {
    0%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.05) <span class="hljs-built_in">translateX</span>(-0.5em);
    }
    15% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1.2) <span class="hljs-built_in">translateX</span>(1em);
    }
    90%, 100% {
        <span class="hljs-attribute">background-color</span>: hotpink;
    }
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#xFF0C;&#x8BA9;&#x5B50;&#x5143;&#x7D20;&#x4F9D;&#x6B21;&#x64AD;&#x653E;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader &gt; span {
    animation-delay: calc(var(--n) * 0.05s);
}

.loader &gt; span:nth-child(1) { --n: 1; }
.loader &gt; span:nth-child(2) { --n: 2; }
.loader &gt; span:nth-child(3) { --n: 3; }
.loader &gt; span:nth-child(4) { --n: 4; }
.loader &gt; span:nth-child(5) { --n: 5; }
.loader &gt; span:nth-child(6) { --n: 6; }
.loader &gt; span:nth-child(7) { --n: 7; }
.loader &gt; span:nth-child(8) { --n: 8; }
.loader &gt; span:nth-child(9) { --n: 9; }
.loader &gt; span:nth-child(10) { --n: 10; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(var(--n) * <span class="hljs-number">0.05s</span>);
}

<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">7</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">8</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(9)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">9</span>; }
<span class="hljs-selector-class">.loader</span> &gt; <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(10)</span> { <span class="hljs-attribute">--n</span>: <span class="hljs-number">10</span>; }</code></pre><p>&#x589E;&#x52A0;&#x5BB9;&#x5668;&#x52A8;&#x753B;&#xFF0C;&#x52A0;&#x5F3A;&#x8109;&#x52A8;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    animation: loader-animate 1.5s infinite ease-in-out;
}

@keyframes loader-animate {
    45%, 55% {
        transform: scale(1.05);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">animation</span>: loader-animate <span class="hljs-number">1.5s</span> infinite ease-in-out;
}

@<span class="hljs-keyword">keyframes</span> loader-animate {
    45%, 55% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.05);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：146# 视频演示如何用纯 CSS 创作一个脉动 loader

## 原文链接
[https://segmentfault.com/a/1190000016543472](https://segmentfault.com/a/1190000016543472)


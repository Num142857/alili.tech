---
title: '前端每日实战：39# 视频演示如何用纯 CSS 创作一个表达怀念童年心情的条纹彩虹心特效' 
date: 2018-11-29 9:27:39
hidden: true
slug: ptvjtho5rpr
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbDbK?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbDbK?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/QxbmxJ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/QxbmxJ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/QxbmxJ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cepNzTW" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cepNzTW</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 9 &#x4E2A; &lt;span&gt;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;heart&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;heart&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, navy, black);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, navy, black);
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".heart {
    width: 14em;
    height: 11em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.heart</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">14em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">11em</span>;
}</code></pre>
<p>&#x5E03;&#x5C40;&#x5BB9;&#x5668;&#x4E2D;&#x7684;&#x7AD6;&#x6761;&#x7EB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".heart {
    display: flex;
    justify-content: space-between;
}

.heart span {
    width: 1em;
    background-color: lightblue;
    border-radius: 0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.heart</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-between;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: lightblue;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span>;
}</code></pre>
<p>&#x4E3A;&#x7AD6;&#x6761;&#x7EB9;&#x914D;&#x8272;&#xFF0C;&#x6761;&#x7EB9;&#x7684;&#x6837;&#x5F0F;&#x662F;&#x5DE6;&#x53F3;&#x5BF9;&#x79F0;&#x7684;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".heart span {
    background-color: var(--c);
}

.heart span:nth-child(1),
.heart span:nth-child(9) {
    --c: orangered;
}

.heart span:nth-child(2),
.heart span:nth-child(8) {
    --c: gold;
}

.heart span:nth-child(3),
.heart span:nth-child(7) {
    --c: limegreen;
}

.heart span:nth-child(4),
.heart span:nth-child(6) {
    --c: dodgerblue;
}

.heart span:nth-child(5) {
    --c: mediumpurple;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--c);
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(9)</span> {
    <span class="hljs-attribute">--c</span>: orangered;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--c</span>: gold;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--c</span>: limegreen;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--c</span>: dodgerblue;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--c</span>: mediumpurple;
}</code></pre>
<p>&#x4E3A;&#x7AD6;&#x6761;&#x7EB9;&#x8BBE;&#x7F6E;&#x9AD8;&#x5EA6;&#xFF0C;&#x7EC4;&#x6210;&#x5FC3;&#x5F62;&#x56FE;&#x6848;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".heart span {
    height: var(--h);
    position: relative;
    top: var(--t);
}

.heart span:nth-child(1),
.heart span:nth-child(9) {
    --h: 3em;
    --t: 2.2em;
}

.heart span:nth-child(2),
.heart span:nth-child(8) {
    --h: 6em;
    --t: 0.6em;
}

.heart span:nth-child(3),
.heart span:nth-child(7) {
    --h: 8em;
    --t: 0;
}

.heart span:nth-child(4),
.heart span:nth-child(6) {
    --h: 9em;
    --t: 0.8em;
}

.heart span:nth-child(5) {
    --h: 9.4em;
    --t: 1.6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--h);
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">var</span>(--t);
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(9)</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">--t</span>: <span class="hljs-number">2.2em</span>;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">--t</span>: <span class="hljs-number">0.6em</span>;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">--t</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span>,
<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">9em</span>;
    <span class="hljs-attribute">--t</span>: <span class="hljs-number">0.8em</span>;
}

<span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--h</span>: <span class="hljs-number">9.4em</span>;
    <span class="hljs-attribute">--t</span>: <span class="hljs-number">1.6em</span>;
}</code></pre>
<p>&#x8BBE;&#x7F6E;&#x4F4D;&#x79FB;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".heart span {
    animation: beating 5s infinite;
}

@keyframes beating{
    0%, 30% {
        top: var(--t);
        height: var(--h);
    }

    60%, 70% {
        top: 25%;
        height: 50%;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.heart</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: beating <span class="hljs-number">5s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> beating{
    0%, 30% {
        <span class="hljs-attribute">top</span>: <span class="hljs-built_in">var</span>(--t);
        <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--h);
    }

    60%, 70% {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">25%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x52A8;&#x753B;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x6761;&#x7EB9;&#x8BBE;&#x7F6E;&#x53BB;&#x8272;&#x3001;&#x6A21;&#x7CCA;&#x548C;&#x53D8;&#x7A84;&#x6548;&#x679C;&#xFF0C;&#x52A0;&#x5F3A;&#x4E0E;&#x5F69;&#x8272;&#x6761;&#x7EB9;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x6BD4;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes beating{
    0%, 30% {
        background-color: var(--c);
        filter: blur(0);
        width: 1em;
    }

    60%, 70% {
        background-color: lightblue;
        filter: blur(5px);
        width: 0.1em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> beating{
    0%, 30% {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--c);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(0);
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    }

    60%, 70% {
        <span class="hljs-attribute">background-color</span>: lightblue;
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(5px);
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0.1em</span>;
    }
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：39# 视频演示如何用纯 CSS 创作一个表达怀念童年心情的条纹彩虹心特效

## 原文链接
[https://segmentfault.com/a/1190000015126240](https://segmentfault.com/a/1190000015126240)


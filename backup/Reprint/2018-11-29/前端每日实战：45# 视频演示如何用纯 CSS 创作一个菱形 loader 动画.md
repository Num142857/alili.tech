---
title: '前端每日实战：45# 视频演示如何用纯 CSS 创作一个菱形 loader 动画' 
date: 2018-11-29 9:27:38
hidden: true
slug: h7in4no8il
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbYsU?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbYsU?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/eKzjqK" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/eKzjqK</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/eKzjqK" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/c8eyJUE" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/c8eyJUE</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 9 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
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
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
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
  background-color: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">background-color</span>: black;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x548C;&#x5B50;&#x5143;&#x7D20;&#x5C3A;&#x5BF8;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5927;&#x6B63;&#x65B9;&#x5F62;&#x91CC;&#x5305;&#x542B; 9 &#x4E2A;&#x5C0F;&#x6B63;&#x65B9;&#x5F62;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 10em;
    height: 10em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 1fr);
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">0.5em</span>;
}</code></pre>
<p>&#x628A;&#x56FE;&#x6848;&#x8C03;&#x6574;&#x4E3A;&#x5927;&#x83F1;&#x5F62;&#x4E2D;&#x5305;&#x542B; 9 &#x4E2A;&#x5C0F;&#x83F1;&#x5F62;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    transform: rotate(45deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
}</code></pre>
<p>&#x4EE5;&#x7AD6;&#x5411;&#x7684;&#x5C0F;&#x83F1;&#x5F62;&#x4E3A;&#x5355;&#x4F4D;&#xFF0C;&#x4E3A;&#x5C0F;&#x83F1;&#x5F62;&#x5757;&#x4E0A;&#x8272;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    background-color: var(--c);
}

.loader span:nth-child(7) {
    --c: tomato;
}

.loader span:nth-child(4),
.loader span:nth-child(8) {
    --c: gold;
}

.loader span:nth-child(1),
.loader span:nth-child(5),
.loader span:nth-child(9) {
    --c: limegreen;
}

.loader span:nth-child(2),
.loader span:nth-child(6) {
    --c: dodgerblue;
}

.loader span:nth-child(3) {
    --c: mediumpurple;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--c);
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--c</span>: tomato;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--c</span>: gold;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(9)</span> {
    <span class="hljs-attribute">--c</span>: limegreen;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--c</span>: dodgerblue;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--c</span>: mediumpurple;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: blinking 2s linear infinite;
    animation-delay: var(--d);
    transform: scale(0);
}

@keyframes blinking {
    0%, 100% {
        transform: scale(0);
    }

    40%, 80% {
        transform: scale(1);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: blinking <span class="hljs-number">2s</span> linear infinite;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">var</span>(--d);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
}

@<span class="hljs-keyword">keyframes</span> blinking {
    0%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
    }

    40%, 80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x5C0F;&#x83F1;&#x5F62;&#x8BBE;&#x7F6E;&#x65F6;&#x5EF6;&#xFF0C;&#x589E;&#x5F3A;&#x52A8;&#x611F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:nth-child(7) {
    --d: 0s;
}

.loader span:nth-child(4),
.loader span:nth-child(8) {
    --d: 0.2s;
}

.loader span:nth-child(1),
.loader span:nth-child(5),
.loader span:nth-child(9) {
    --d: 0.4s;
}

.loader span:nth-child(2),
.loader span:nth-child(6) {
    --d: 0.6s;
}

.loader span:nth-child(3) {
    --d: 0.8s;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0s</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(8)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0.2s</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(9)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0.4s</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>,
<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0.6s</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0.8s</span>;
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：45# 视频演示如何用纯 CSS 创作一个菱形 loader 动画

## 原文链接
[https://segmentfault.com/a/1190000015208027](https://segmentfault.com/a/1190000015208027)


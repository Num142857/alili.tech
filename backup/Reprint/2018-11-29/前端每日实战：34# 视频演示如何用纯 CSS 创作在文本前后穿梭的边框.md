---
title: '前端每日实战：34# 视频演示如何用纯 CSS 创作在文本前后穿梭的边框' 
date: 2018-11-29 9:33:05
hidden: true
slug: 71vzmlbaqk4
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbyr9?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbyr9?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/qYepNv" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qYepNv</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qYepNv" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cQ73Vt8" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cQ73Vt8</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x6587;&#x672C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;warning&quot;&gt;ERROR 404&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;warning&quot;</span>&gt;</span>ERROR 404<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
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
  background-color: rgb(20%, 20%, 20%);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(20%, 20%, 20%);
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".warning {
    color: whitesmoke;
    font-size: 100px;
    font-family: sans-serif;
    font-weight: bold;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.warning</span> {
    <span class="hljs-attribute">color</span>: whitesmoke;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x5B9A;&#x4E49;&#x8FB9;&#x6846;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".warning {
    position: relative;
    padding: 0.6em 0.4em;
}

.warning::before,
.warning::after {
    content: &apos;&apos;;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0.2em solid;
    box-sizing: border-box;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.warning</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.6em</span> <span class="hljs-number">0.4em</span>;
}

<span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p>&#x628A;&#x8FB9;&#x6846;&#x5206;&#x4E3A;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x62FC;&#x5728;&#x4E00;&#x8D77;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".warning::before,
.warning::after {
    border: 0.2em solid transparent;
    color: orangered;
}

.warning::before {
    border-top-color: currentColor;
    border-right-color: currentColor;
}

.warning::after {
    border-bottom-color: currentColor;
    border-left-color: currentColor;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.2em</span> solid transparent;
    <span class="hljs-attribute">color</span>: orangered;
}

<span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">border-top-color</span>: currentColor;
    <span class="hljs-attribute">border-right-color</span>: currentColor;
}

<span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">border-bottom-color</span>: currentColor;
    <span class="hljs-attribute">border-left-color</span>: currentColor;
}</code></pre>
<p>&#x628A;&#x4E0A;&#x8FB9;&#x6846;&#x548C;&#x53F3;&#x8FB9;&#x6846;&#x4E0B;&#x6C89;&#x4E00;&#x5C42;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".warning::before {
    z-index: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}</code></pre>
<p>&#x4E3A;&#x4E0B;&#x8FB9;&#x6846;&#x548C;&#x5728;&#x8FB9;&#x6846;&#x52A0;&#x4E0A;&#x9634;&#x5F71;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".warning::after {
    box-shadow: 0.3em 0.3em 0.3em rgba(20%, 20%, 20%, 0.8);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0.3em</span> <span class="hljs-number">0.3em</span> <span class="hljs-number">0.3em</span> <span class="hljs-built_in">rgba</span>(20%, 20%, 20%, 0.8);
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x8FB9;&#x6846;&#x8F6C;&#x8D77;&#x6765;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".warning::before,
.warning::after {
    animation: rotating 10s infinite;
}

@keyframes rotating {
    to {
        transform: rotate(360deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.warning</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: rotating <span class="hljs-number">10s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> rotating {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
    }
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：34# 视频演示如何用纯 CSS 创作在文本前后穿梭的边框

## 原文链接
[https://segmentfault.com/a/1190000015045700](https://segmentfault.com/a/1190000015045700)


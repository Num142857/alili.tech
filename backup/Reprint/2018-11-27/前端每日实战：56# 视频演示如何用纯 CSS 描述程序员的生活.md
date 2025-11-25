---
title: '前端每日实战：56# 视频演示如何用纯 CSS 描述程序员的生活' 
date: 2018-11-27 2:30:13
hidden: true
slug: keqojdamg7
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcqOs?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcqOs?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/YvYVvY" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/YvYVvY</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/YvYVvY" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cN6L9SZ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cN6L9SZ</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 6 &#x4E2A;&#x6BB5;&#x843D;&#xFF0C;&#x6BCF;&#x4E2A;&#x6BB5;&#x843D; 1 &#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;code&quot;&gt;
    &lt;p&gt;function repeat() {&lt;/p&gt;
    &lt;p&gt;  eat();&lt;/p&gt;
    &lt;p&gt;  sleep();&lt;/p&gt;
    &lt;p&gt;  code();&lt;/p&gt;
    &lt;p&gt;  repeat();&lt;/p&gt;
    &lt;p&gt;}&lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;code&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>function repeat() {<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>  eat();<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>  sleep();<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>  code();<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>  repeat();<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
}</code></pre><p>&#x4EE3;&#x7801;&#x5E03;&#x5C40;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".code {
    background-color: silver;
    padding: 1em 0;
    font-size: 24px;
    font-family: monospace;
    border-radius: 0.5em;
}

.code p {
    white-space: pre;
    padding: 0 1em;
    margin: 0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.code</span> {
    <span class="hljs-attribute">background-color</span>: silver;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">font-family</span>: monospace;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span>;
}

<span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">white-space</span>: pre;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.5em</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".code p:not(:last-child) {
    animation: step 2s infinite;
}

@keyframes step {
    0%, 25% {
        color: white;
        background-color: dodgerblue;
    }

    26%, 100% {
        color: black;
        background-color: transparent;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:last-child)</span> {
    <span class="hljs-attribute">animation</span>: step <span class="hljs-number">2s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> step {
    0%, 25% {
        <span class="hljs-attribute">color</span>: white;
        <span class="hljs-attribute">background-color</span>: dodgerblue;
    }

    26%, 100% {
        <span class="hljs-attribute">color</span>: black;
        <span class="hljs-attribute">background-color</span>: transparent;
    }
}
</code></pre><p>&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x63CF;&#x8FF0;&#x5355;&#x6B65;&#x6267;&#x884C;&#x7684;&#x573A;&#x666F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".code p:not(:last-child) {
    animation-delay: var(--d);
}

.code p:nth-child(2) {
    --d: 0s;
}

.code p:nth-child(3) {
    --d: 0.5s;
}

.code p:nth-child(4) {
    --d: 1s;
}

.code p:nth-child(1),
.code p:nth-child(5) {
    --d: 1.5s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:last-child)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">var</span>(--d);
}

<span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0s</span>;
}

<span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">0.5s</span>;
}

<span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">1s</span>;
}

<span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(1)</span>,
<span class="hljs-selector-class">.code</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--d</span>: <span class="hljs-number">1.5s</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：56# 视频演示如何用纯 CSS 描述程序员的生活

## 原文链接
[https://segmentfault.com/a/1190000015316996](https://segmentfault.com/a/1190000015316996)


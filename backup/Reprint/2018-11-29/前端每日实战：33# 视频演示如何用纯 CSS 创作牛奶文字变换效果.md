---
title: '前端每日实战：33# 视频演示如何用纯 CSS 创作牛奶文字变换效果' 
date: 2018-11-29 9:33:05
hidden: true
slug: eorsnhc7fw
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbyss?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbyss?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/MGNWOm" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/MGNWOm</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/MGNWOm" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cvPryA6" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cvPryA6</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; DOM&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x6BB5;&#x6587;&#x672C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;p&gt;Explorer&lt;/p&gt;
    &lt;p&gt;Discovery&lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Explorer<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Discovery<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
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
<p>&#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x6837;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    color: white;
    font-size: 100px;
    font-weight: bold;
    font-family: sans-serif;
    text-transform: uppercase;
    text-align: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<p>&#x8BA9; 2 &#x6BB5;&#x6587;&#x672C;&#x91CD;&#x53E0;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    margin: 0;
}

p:nth-child(1) {
    transform: translateY(50%);
}

p:nth-child(2) {
    transform: translateY(-50%);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(50%);
}

<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#xFF0C;&#x8BA9; 2 &#x6BB5;&#x6587;&#x672C;&#x4EA4;&#x66FF;&#x663E;&#x793A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    animation: show-hide 10s infinite;
    filter: opacity(0);
}

p:nth-child(1) {
    animation-direction: normal;
}

p:nth-child(2) {
    animation-direction: reverse;
}

@keyframes show-hide {
    0% {
        filter: opacity(0);
    }

    25% {
        filter: opacity(1);
    }

    40% {
        filter: opacity(1);
    }

    50% {
        filter: opacity(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">animation</span>: show-hide <span class="hljs-number">10s</span> infinite;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
}

<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">animation-direction</span>: normal;
}

<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">animation-direction</span>: reverse;
}

@<span class="hljs-keyword">keyframes</span> show-hide {
    0% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }

    25% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    40% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    50% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }
}</code></pre>
<p>&#x589E;&#x52A0;&#x5B57;&#x95F4;&#x8DDD;&#x7684;&#x53D8;&#x5316;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes show-hide {
    0% {
        filter: opacity(0);
        letter-spacing: -0.8em;
    }

    25% {
        filter: opacity(1);
    }

    40% {
        filter: opacity(1);
    }

    50% {
        filter: opacity(0);
        letter-spacing: 0.24em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> show-hide {
    0% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">letter-spacing</span>: -<span class="hljs-number">0.8em</span>;
    }

    25% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    40% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    50% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.24em</span>;
    }
}</code></pre>
<p>&#x589E;&#x52A0;&#x6587;&#x672C;&#x6A21;&#x7CCA;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes show-hide {
    0% {
        filter: opacity(0) blur(0.08em);
        letter-spacing: -0.8em;
    }

    25% {
        filter: opacity(1) blur(0.08em);
    }

    40% {
        filter: opacity(1) blur(0.24em);
    }

    50% {
        filter: opacity(0) blur(0.24em);
        letter-spacing: 0.24em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> show-hide {
    0% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0) <span class="hljs-built_in">blur</span>(0.08em);
        <span class="hljs-attribute">letter-spacing</span>: -<span class="hljs-number">0.8em</span>;
    }

    25% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1) <span class="hljs-built_in">blur</span>(0.08em);
    }

    40% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1) <span class="hljs-built_in">blur</span>(0.24em);
    }

    50% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0) <span class="hljs-built_in">blur</span>(0.24em);
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.24em</span>;
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x5BB9;&#x5668;&#x8BBE;&#x7F6E;&#x5BF9;&#x6BD4;&#x5EA6;&#x6EE4;&#x955C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    filter: contrast(10);
    background-color: black;
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">contrast</span>(10);
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：33# 视频演示如何用纯 CSS 创作牛奶文字变换效果

## 原文链接
[https://segmentfault.com/a/1190000015037234](https://segmentfault.com/a/1190000015037234)


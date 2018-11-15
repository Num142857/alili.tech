---
title: '前端每日实战：130# 视频演示如何用 CSS 在线字体和 D3 创作一个 Google & googol 信息图'
reprint: true
categories: reprint
abbrlink: 8d1ac2c5
date: 2018-11-11 02:30:07
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/bVbgD94?w=400&amp;h=300" src="https://static.alili.tech/img/bVbgD94?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/xaPZye" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/xaPZye</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/xaPZye" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cwkpGf9" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cwkpGf9</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709; 1 &#x4E2A;&#x7A7A;&#x5143;&#x7D20;&#xFF0C;&#x5176;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x6587;&#x672C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5F15;&#x5165;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#xFF0C;<a href="https://en.wikipedia.org/wiki/Product_Sans" rel="nofollow noreferrer" target="_blank">Product Sans</a> &#x662F; Google &#x4E13;&#x95E8;&#x4E3A;&#x54C1;&#x724C;&#x63A8;&#x5E7F;&#x521B;&#x5EFA;&#x7684;&#x65E0;&#x886C;&#x7EBF;&#x5B57;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import url(&quot;https://fonts.googleapis.com/css?family=Product+Sans&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">@<span class="hljs-keyword">import</span> url(<span class="hljs-string">&quot;https://fonts.googleapis.com/css?family=Product+Sans&quot;</span>);</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
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
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x5236;&#x4F5C; logo&#xFF0C;&#x6CE8;&#x610F; <code>content</code> &#x7684;&#x5185;&#x5BB9;&#x4E0D;&#x662F; <code>&quot;Google&quot;</code>&#xFF0C;&#x800C;&#x662F; <code>&quot;google_logo&quot;</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo::before {
    content: &apos;google_logo&apos;;
    font-size: 10vw;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;google_logo&apos;</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10vw</span>;
}
</code></pre><p>&#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#xFF0C;&#x91C7;&#x7528;&#x521A;&#x624D;&#x5F15;&#x5165;&#x7684;&#x5728;&#x7EBF;&#x5B57;&#x4F53;&#xFF0C;&#x521A;&#x624D;&#x9875;&#x9762;&#x4E0A;&#x7684; <code>&quot;google_logo&quot;</code> &#x6587;&#x5B57;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x4E86;&#x5355;&#x8272;&#x7684; logo &#x56FE;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    font-family: &apos;product sans&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&apos;product sans&apos;</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x989C;&#x8272;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --blue: #4285f4;
    --red: #ea4335;
    --yellow: #fbbc05;
    --green: #34a853;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--blue</span>: <span class="hljs-number">#4285f4</span>;
    <span class="hljs-attribute">--red</span>: <span class="hljs-number">#ea4335</span>;
    <span class="hljs-attribute">--yellow</span>: <span class="hljs-number">#fbbc05</span>;
    <span class="hljs-attribute">--green</span>: <span class="hljs-number">#34a853</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x6587;&#x5B57;&#x906E;&#x7F69;&#x6548;&#x679C;&#xFF0C;&#x4E3A;&#x6587;&#x5B57;&#x4E0A;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo::before {
    background-image: linear-gradient(
        to right,
        var(--blue) 0%, var(--blue) 26.5%, 
        var(--red) 26.5%, var(--red) 43.5%, 
        var(--yellow) 43.5%, var(--yellow) 61.5%,
        var(--blue) 61.5%, var(--blue) 78.5%, 
        var(--green) 78.5%, var(--green) 84.5%, 
        var(--red) 84.5%, var(--red) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(
        to right,
        var(--blue) <span class="hljs-number">0%</span>, <span class="hljs-built_in">var</span>(--blue) <span class="hljs-number">26.5%</span>, 
        <span class="hljs-built_in">var</span>(--red) <span class="hljs-number">26.5%</span>, <span class="hljs-built_in">var</span>(--red) <span class="hljs-number">43.5%</span>, 
        <span class="hljs-built_in">var</span>(--yellow) <span class="hljs-number">43.5%</span>, <span class="hljs-built_in">var</span>(--yellow) <span class="hljs-number">61.5%</span>,
        <span class="hljs-built_in">var</span>(--blue) <span class="hljs-number">61.5%</span>, <span class="hljs-built_in">var</span>(--blue) <span class="hljs-number">78.5%</span>, 
        <span class="hljs-built_in">var</span>(--green) <span class="hljs-number">78.5%</span>, <span class="hljs-built_in">var</span>(--green) <span class="hljs-number">84.5%</span>, 
        <span class="hljs-built_in">var</span>(--red) <span class="hljs-number">84.5%</span>, <span class="hljs-built_in">var</span>(--red) <span class="hljs-number">100%</span>
    );
    <span class="hljs-attribute">-webkit-background-clip</span>: text;
    <span class="hljs-attribute">-webkit-text-fill-color</span>: transparent;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;Google logo &#x5236;&#x4F5C;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5236;&#x4F5C; googol &#x4FE1;&#x606F;&#xFF0C;&#x8BF4;&#x660E; Google &#x7684;&#x540D;&#x5B57;&#x6765;&#x6E90;&#x4E8E;&#x542B;&#x4E49;&#x662F; 1 &#x540E;&#x9762;&#x8DDF; 100 &#x4E2A;&#x96F6;&#x7684;&#x5927;&#x6570;&#x7684;&#x5355;&#x8BCD; googol&#x3002;</p><p>&#x5728; dom &#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x884C;&#x8BF4;&#x660E;&#x6587;&#x672C;&#x548C;&#x5BB9;&#x7EB3;&#x6570;&#x5B57;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 5 &#x4E2A;&#x6570;&#x5B57;&#xFF0C;&#x5728;&#x6BCF;&#x4E2A;&#x6570;&#x5B57;&#x7684;&#x5185;&#x8054;&#x6837;&#x5F0F;&#x4E2D;&#x6307;&#x5B9A;&#x4E86;&#x989C;&#x8272;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p class=&quot;desc&quot;&gt;The name of Google originated from a misspelling of the word &quot;googol&quot;, the number 1 followed by 100 zeros.&lt;/p&gt; 
&lt;div class=&quot;zeros&quot;&gt;
    &lt;span style=&quot;--c:var(--blue);&quot;&gt;1&lt;/span&gt;
    &lt;span style=&quot;--c:var(--red);&quot;&gt;0&lt;/span&gt;
    &lt;span style=&quot;--c:var(--yellow);&quot;&gt;0&lt;/span&gt;
    &lt;span style=&quot;--c:var(--blue);&quot;&gt;0&lt;/span&gt;
    &lt;span style=&quot;--c:var(--green);&quot;&gt;0&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;desc&quot;</span>&gt;</span>The name of Google originated from a misspelling of the word &quot;googol&quot;, the number 1 followed by 100 zeros.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;zeros&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;--c:var(--blue);&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;--c:var(--red);&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;--c:var(--yellow);&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;--c:var(--blue);&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;--c:var(--green);&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E;&#x8BF4;&#x660E;&#x6587;&#x672C;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".desc {
    font-size: 1.5vw;
    font-weight: normal;
    color: dimgray;
    margin-top: 2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.desc</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5vw</span>;
    <span class="hljs-attribute">font-weight</span>: normal;
    <span class="hljs-attribute">color</span>: dimgray;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">2em</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x6570;&#x5B57;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".zeros {
    font-size: 3vw;
    font-weight: bold;
    margin-top: 0.2em;
    text-align: center;
    width: 25.5em;
    word-wrap: break-word;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.zeros</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3vw</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25.5em</span>;
    <span class="hljs-attribute">word-wrap</span>: break-word;
}</code></pre><p>&#x4E3A;&#x6570;&#x5B57;&#x4E0A;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".zeros span {
    color: var(--c);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.zeros</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--c);
}</code></pre><p>&#x5FAE;&#x8C03;&#x6570;&#x5B57; <code>&quot;1&quot;</code> &#x7684;&#x8FB9;&#x8DDD;&#xFF0C;&#x8BA9;&#x5B83;&#x4E0D;&#x8981;&#x548C;&#x540E;&#x9762;&#x7684; <code>&quot;0&quot;</code> &#x9760;&#x5F97;&#x592A;&#x7D27;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".zeros span:nth-child(1) {
    margin-right: 0.2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.zeros</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">0.2em</span>;
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x9759;&#x6001;&#x5E03;&#x5C40;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7528; d3 &#x6279;&#x91CF;&#x5904;&#x7406;&#x6570;&#x5B57;&#x3002;</p><p>&#x5F15;&#x5165; d3 &#x5E93;&#xFF0C;&#x5E76;&#x5220;&#x9664;&#x6389; dom &#x4E2D; <code>.zeros</code> &#x7684;&#x6570;&#x5B57;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://d3js.org/d3.v5.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://d3js.org/d3.v5.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6700;&#x7EC8;&#x6211;&#x4EEC;&#x4F1A;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x663E;&#x793A; 100 &#x4E2A; <code>0</code>&#xFF0C;&#x6BCF;&#x4E2A; <code>0</code> &#x7684;&#x989C;&#x8272;&#x90FD;&#x4E0D;&#x540C;&#xFF0C;&#x5E76;&#x4E14;&#x4E3A;&#x4E86;&#x7F8E;&#x89C2;&#xFF0C;&#x76F8;&#x90BB;&#x6570;&#x5B57;&#x7684;&#x989C;&#x8272;&#x4E5F;&#x8981;&#x4E0D;&#x540C;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;&#x5148;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x989C;&#x8272;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x4ECE; Google logo &#x914D;&#x8272;&#x7684; 4 &#x79CD;&#x989C;&#x8272;&#x4E2D;&#x53D6;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x989C;&#x8272;&#xFF0C;&#x5E76;&#x4E14;&#x6709;&#x4E00;&#x4E2A;&#x8868;&#x793A;&#x88AB;&#x6392;&#x9664;&#x989C;&#x8272;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5F53;&#x6307;&#x5B9A;&#x7684;&#x6B64;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x5C31;&#x4ECE; 4 &#x4E2A;&#x53EF;&#x9009;&#x7684;&#x989C;&#x8272;&#x4E2D;&#x53BB;&#x6389;&#x8FD9;&#x4E2A;&#x989C;&#x8272;&#xFF0C;&#x7136;&#x540E;&#x4ECE;&#x5269;&#x4E0B;&#x7684; 3 &#x4E2A;&#x989C;&#x8272;&#x4E2D;&#x968F;&#x673A;&#x53D6;&#x4E00;&#x4E2A;&#x989C;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getColor(excludedColor) {
    let colors = new Set([&apos;blue&apos;, &apos;red&apos;, &apos;yellow&apos;, &apos;green&apos;])
    colors.delete(excludedColor)
    return Array.from(colors)[Math.floor(d3.randomUniform(0, colors.size)())]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getColor</span>(<span class="hljs-params">excludedColor</span>) </span>{
    <span class="hljs-keyword">let</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;blue&apos;</span>, <span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;yellow&apos;</span>, <span class="hljs-string">&apos;green&apos;</span>])
    colors.delete(excludedColor)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(colors)[<span class="hljs-built_in">Math</span>.floor(d3.randomUniform(<span class="hljs-number">0</span>, colors.size)())]
}</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x5B9A;&#x4E49; 2 &#x4E2A;&#x5E38;&#x91CF;&#xFF0C;<code>ZEROS</code> &#x662F;&#x5B58;&#x50A8; 100 &#x4E2A; <code>0</code> &#x7684;&#x6570;&#x7EC4;&#xFF0C;<code>ONE</code> &#x662F;&#x5B58;&#x50A8;&#x6570;&#x5B57; <code>1</code> &#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x6709; 2 &#x4E2A;&#x5C5E;&#x6027;&#xFF0C;<code>number</code> &#x8868;&#x793A;&#x5B83;&#x7684;&#x6570;&#x503C;&#x662F; 1&#xFF0C;<code>color</code> &#x8868;&#x793A;&#x5B83;&#x7684;&#x989C;&#x8272;&#x662F;&#x84DD;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ZEROS = d3.range(100).map(x=&gt;0)
const ONE = {number: 1, color: &apos;blue&apos;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ZEROS = d3.range(<span class="hljs-number">100</span>).map(<span class="hljs-function"><span class="hljs-params">x</span>=&gt;</span><span class="hljs-number">0</span>)
<span class="hljs-keyword">const</span> ONE = {<span class="hljs-attr">number</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;blue&apos;</span>}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x901A;&#x8FC7;&#x7528; <code>reduce</code> &#x51FD;&#x6570;&#x904D;&#x5386; <code>ZEROS</code> &#x6570;&#x7EC4;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4; <code>numbers</code>&#xFF0C;&#x5B83;&#x6709; 101 &#x4E2A;&#x5143;&#x7D20;&#xFF08;1 &#x4EE5;&#x53CA;&#x8DDF;&#x968F;&#x5B83;&#x7684; 100 &#x4E2A; 0&#xFF09;&#xFF0C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F; 1 &#x4E2A;&#x5305;&#x542B; <code>number</code> &#x548C; <code>color</code> &#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numbers = ZEROS.reduce(function (numberObjects, d) {
    numberObjects.push({
        number: d,
        color: getColor(numberObjects[numberObjects.length - 1].color)
    })
    return numberObjects
}, [ONE])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> numbers = ZEROS.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">numberObjects, d</span>) </span>{
    numberObjects.push({
        <span class="hljs-attr">number</span>: d,
        <span class="hljs-attr">color</span>: getColor(numberObjects[numberObjects.length - <span class="hljs-number">1</span>].color)
    })
    <span class="hljs-keyword">return</span> numberObjects
}, [ONE])</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x4EE5; <code>numbers</code> &#x4E3A;&#x6570;&#x636E;&#x6E90;&#xFF0C;&#x7528; d3 &#x6279;&#x91CF;&#x521B;&#x5EFA;&#x51FA; dom &#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x628A;&#x989C;&#x8272;&#x4FE1;&#x606F;&#x5199;&#x5728;&#x884C;&#x5185;&#x6837;&#x5F0F;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d3.select(&apos;.zeros&apos;)
    .selectAll(&apos;span&apos;)
    .data(numberObjects)
    .enter()
    .append(&apos;span&apos;)
    .style(&apos;--c&apos;, (d)=&gt;`var(--${d.color})`)
    .text((d)=&gt;d.number)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">d3.select(<span class="hljs-string">&apos;.zeros&apos;</span>)
    .selectAll(<span class="hljs-string">&apos;span&apos;</span>)
    .data(numberObjects)
    .enter()
    .append(<span class="hljs-string">&apos;span&apos;</span>)
    .style(<span class="hljs-string">&apos;--c&apos;</span>, (d)=&gt;<span class="hljs-string">`var(--<span class="hljs-subst">${d.color}</span>)`</span>)
    .text(<span class="hljs-function">(<span class="hljs-params">d</span>)=&gt;</span>d.number)</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x5FAE;&#x8C03;&#x4E00;&#x4E0B;&#x5185;&#x5BB9;&#x7684;&#x8FB9;&#x8DDD;&#xFF0C;&#x4F7F;&#x6574;&#x4E2A;&#x5185;&#x5BB9;&#x5C45;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo {
    margin-top: -10vh;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> {
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">10vh</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：130# 视频演示如何用 CSS 在线字体和 D3 创作一个 Google & googol 信息图

## 原文链接
[https://segmentfault.com/a/1190000016321619](https://segmentfault.com/a/1190000016321619)


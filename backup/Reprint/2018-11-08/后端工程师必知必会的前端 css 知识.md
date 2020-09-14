---
title: 后端工程师必知必会的前端 css 知识
hidden: true
categories: [reprint]
slug: 27056ced
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p>&#x540E;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x867D;&#x7136;&#x5927;&#x90E8;&#x5206;&#x5DE5;&#x4F5C;&#x90FD;&#x662F;&#x8DDF;&#x670D;&#x52A1;&#x5668;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x5E93;&#x6253;&#x4EA4;&#x9053;&#xFF0C;&#x4F46;&#x6709;&#x65F6;&#x4E5F;&#x9700;&#x8981;&#x5199;&#x4E00;&#x4E9B;&#x524D;&#x7AEF;&#x4EE3;&#x7801;&#x3002;</p><p>&#x6709;&#x4E9B;&#x516C;&#x53F8;&#x7684;OAM&#x540E;&#x53F0;&#x57FA;&#x672C;&#x662F;&#x7531;&#x540E;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x627F;&#x5305;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x524D;&#x7AEF;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x662F;&#x5FC5;&#x987B;&#x8981;&#x638C;&#x63E1;&#x7684;&#xFF1B;&#x5C31;&#x7B97;&#x5F00;&#x53D1;&#x4E2D;&#x4E0D;&#x76F4;&#x63A5;&#x5199;&#x524D;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x4E86;&#x89E3;&#x524D;&#x7AEF;&#x77E5;&#x8BC6;&#x80FD;&#x8BA9;&#x6211;&#x4EEC;&#x8DDF;&#x524D;&#x7AEF;&#x5C0F;&#x4F19;&#x4F34;&#x66F4;&#x6109;&#x5FEB;&#x7684;&#x4EA4;&#x6D41;&#x3002;</p><p>Js&#x5BF9;&#x4E8E;&#x540E;&#x7AEF;&#x5C0F;&#x4F19;&#x4F34;&#x6765;&#x8BF4;&#x4E0D;&#x7B97;&#x96BE;&#x70B9;&#xFF0C;&#x80FD;&#x591F;&#x987A;&#x624B;&#x7684;&#x4F7F;&#x7528;&#xFF08;&#x5F53;&#x7136;&#x5341;&#x5206;&#x4F9D;&#x8D56; jQuery&#xFF09;&#xFF0C;&#x6D89;&#x53CA;&#x5230; css &#x5C31;&#x4F1A;&#x6709;&#x70B9;&#x61F5;&#x903C;&#x4E86;&#x3002;</p><p>&#x540E;&#x53F0;&#x5F00;&#x53D1;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x7528;&#x5230;&#x592A;&#x96BE;&#x7684;&#x524D;&#x7AEF;&#x6280;&#x5DE7;&#xFF0C;&#x80FD;&#x591F;&#x5728;&#x5B8C;&#x6210;&#x6B63;&#x786E;&#x5E03;&#x5C40;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x518D;&#x7A0D;&#x5FAE;&#x505A;&#x4E00;&#x4E9B;&#x7F8E;&#x5316;&#xFF0C;&#x5C31;&#x5DF2;&#x7ECF;&#x591F;&#x7528;&#x4E86;&#x3002;</p><p>&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x6709;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x6837;&#x4F8B;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x90E8;&#x5206;&#x524D;&#x7F6E;&#x7684; css &#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".green {
    background-color: lightseagreen;
}
.red {
    background-color: orangered;
}
.container {
    border: 1px solid #0000f1;
}
.w100 {
    width: 100px;
    height: 100px;
}
.w50 {
    width: 50px;
    height: 50px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.green</span> {
    <span class="hljs-attribute">background-color</span>: lightseagreen;
}
<span class="hljs-selector-class">.red</span> {
    <span class="hljs-attribute">background-color</span>: orangered;
}
<span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#0000f1</span>;
}
<span class="hljs-selector-class">.w100</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.w50</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}</code></pre><h2 id="articleHeader0">&#x628A;&#x5143;&#x7D20;&#x653E;&#x5230;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#x4E0A;</h2><h3 id="articleHeader1">1&#xFF09;&#x6587;&#x6863;&#x6D41;</h3><p>&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x628A; html &#x5143;&#x7D20;&#x6309;&#x7167;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#xFF0C;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x4F9D;&#x6B21;&#x6392;&#x653E;&#x3002;</p><p>Html &#x4E2D;&#x5168;&#x90E8;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x76D2;&#x6A21;&#x578B;&#xFF0C;&#x76D2;&#x5B50;&#x4F1A;&#x5360;&#x7528;&#x4E00;&#x5B9A;&#x7684;&#x7A7A;&#x95F4;&#xFF0C;&#x4F9D;&#x6B21;&#x6392;&#x653E;&#x5728;HTML&#x4E2D;&#xFF0C;&#x5F62;&#x6210;&#x4E86;&#x6587;&#x6863;&#x6D41;&#x3002;</p><p>&#x67D0;&#x4E9B;&#x7279;&#x6B8A;&#x7684; css &#x6837;&#x5F0F;&#x4F1A;&#x628A;&#x5143;&#x7D20;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#x3002;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#x540E;&#xFF0C;&#x5728;&#x6587;&#x6863;&#x6D41;&#x4E2D;&#x7684;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x5C06;&#x5FFD;&#x7565;&#x8BE5;&#x5143;&#x7D20;&#x5E76;&#x586B;&#x8865;&#x5176;&#x539F;&#x5148;&#x7684;&#x7A7A;&#x95F4;&#x3002;</p><h4>1.1&#xFF09;<code>float</code> &#x6D6E;&#x52A8;&#x65B9;&#x5F0F;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;</h4><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;red w50&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w50&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfEy?w=267&amp;h=278" src="https://static.alili.tech/img/bVbhfEy?w=267&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x7ED9;&#x4E2D;&#x95F4;&#x7684;&#x7EA2;&#x8272;&#x5757;&#x6DFB;&#x52A0;&#x6D6E;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .float {
        float: left;
    }
&lt;/style&gt;
&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;red w50 float&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.float</span> {
        <span class="hljs-attribute">float</span>: left;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w50 float&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfFd?w=193&amp;h=231" src="https://static.alili.tech/img/bVbhfFd?w=193&amp;h=231" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x7EA2;&#x8272;&#x5757;&#x5728;&#x539F;&#x6765;&#x7684;&#x884C;&#x5185;&#x5411;&#x5DE6;&#x6D6E;&#x52A8;&#x5E76;&#x8131;&#x79BB;&#x4E86;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x7EFF;&#x8272;&#x5757;&#x9876;&#x4E0A;&#x6765;&#x4E86;&#x3002;</p><p><strong><code>float</code></strong>&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7528;&#x6CD5;&#xFF0C;&#x4F46;<code>float</code>&#x4E00;&#x822C;&#x4E0D;&#x5E38;&#x7528;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x591A;&#x505A;&#x8BA8;&#x8BBA;&#x3002;</p><h4>1.2&#xFF09;&#x4F7F;&#x7528;&#x5B9A;&#x4F4D;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;</h4><p>&#x5982;&#x679C;&#x7ED9;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86; <code>position</code> &#x5C5E;&#x6027;&#xFF0C;&#x4E14;&#x8BE5;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x662F; <code>absolute</code> &#x6216;&#x8005; <code>fixed</code>&#xFF0C;&#x5219;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6587;&#x6863;&#x6D41;&#x3002;</p><p>&#x8131;&#x79BB;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;red w50 &quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;red w50 &quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w50 &quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w50 &quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfHE?w=291&amp;h=415" src="https://static.alili.tech/img/bVbhfHE?w=291&amp;h=415" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8131;&#x79BB;&#x540E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .fixed {
        position: fixed;
    }
    .absolute {
        position: absolute;
    }
&lt;/style&gt;
&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;red w50 fixed&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;red w50 absolute&quot;&gt;

    &lt;/div&gt;
    &lt;div class=&quot;green w100&quot;&gt;

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.fixed</span> {
        <span class="hljs-attribute">position</span>: fixed;
    }
    <span class="hljs-selector-class">.absolute</span> {
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w50 fixed&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w50 absolute&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfH4?w=241&amp;h=321" src="https://static.alili.tech/img/bVbhfH4?w=241&amp;h=321" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x867D;&#x7136;&#x4E24;&#x4E2A;&#x7EA2;&#x8272;&#x5757;&#x8FD8;&#x5728;&#x539F;&#x6765;&#x7684;&#x5751;&#x4E0A;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x5B83;&#x4EEC;&#x5DF2;&#x7ECF;&#x4E0D;&#x5360;&#x6587;&#x6863;&#x6D41;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4E0B;&#x9762;&#x7684;&#x4E24;&#x4E2A;&#x7EFF;&#x8272;&#x5757;&#x90FD;&#x4E0A;&#x6765;&#x4E86;&#x3002;</p><h4>1.3&#xFF09;<code>display: none</code></h4><p>&#x8BBE;&#x7F6E; <code>display</code> &#x5C5E;&#x6027;&#x4E3A; <code>none</code>&#xFF0C;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x5E76;&#x4E0D;&#x5728;&#x9875;&#x9762;&#x5C55;&#x793A;&#x4E86;&#x3002;</p><h3 id="articleHeader2">2&#xFF09;<code>display</code> &#x6837;&#x5F0F;</h3><p><code>display</code> &#x6837;&#x5F0F;&#x51B3;&#x5B9A;&#x4E86;&#x5143;&#x7D20;&#x7684;&#x5C55;&#x73B0;&#x5F62;&#x5F0F;&#x3002;</p><p><code>display</code> &#x6709;&#x5F88;&#x591A;&#x53D6;&#x503C;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684; <code>none</code> &#x503C;&#x8868;&#x793A;&#x4E0D;&#x5728;&#x9875;&#x9762;&#x5C55;&#x793A;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x540E;&#x7AEF;&#x5C0F;&#x4F19;&#x4F34;&#x6765;&#x8BF4;&#xFF0C;&#x9664;&#x4E86; <code>none</code> &#x5916;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x518D;&#x4E86;&#x89E3;&#x4E09;&#x4E2A;&#x503C;&#x5C31;&#x8DB3;&#x591F;&#x7528;&#x4E86;&#xFF0C;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x662F; <code>block</code>&#xFF0C;<code>inline-block</code>&#xFF0C;<code>inline</code>&#x3002;</p><h4>2.1&#xFF09;<code>block</code> &#x5757;&#x5143;&#x7D20;</h4><p>&#x5757;&#x5143;&#x7D20;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5C55;&#x793A;&#x65F6;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x4EE5;&#x65B0;&#x884C;&#x6765;&#x5F00;&#x59CB;&#xFF08;&#x548C;&#x7ED3;&#x675F;&#xFF09;&#x3002;</p><p>&#x5E38;&#x89C1;&#x7684;&#xFF08;display &#x9ED8;&#x8BA4;&#x4E3A; block&#xFF09;&#x5757;&#x5143;&#x7D20;&#x6709; <code>&lt;h1&gt;...&lt;h6&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;table&gt;, &lt;div&gt;, &lt;pre&gt;</code>&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;green&quot;&gt;
        &#x54C8;&#x54C8;
    &lt;/div&gt;
    &lt;h1 class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/h1&gt;
    &lt;p class=&quot;green&quot;&gt;
        &#x563F;&#x563F;
    &lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;green&quot;</span>&gt;
        &#x54C8;&#x54C8;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;h1 <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;&#x5475;&#x5475;&lt;/h1&gt;
    &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;green&quot;</span>&gt;
        &#x563F;&#x563F;
    &lt;/p&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x6548;&#x679C;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfOs?w=412&amp;h=230" src="https://static.alili.tech/img/bVbhfOs?w=412&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E09;&#x4E2A;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x5404;&#x5360;&#x4E00;&#x884C;&#x3002;&#x540C;&#x65F6;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;&#x8FD9;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#x4E0B;&#x4E4B;&#x95F4;&#x6709;&#x95F4;&#x8DDD;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; <code>p</code> <code>h1-h6</code> &#x6807;&#x7B7E;&#x9ED8;&#x8BA4;&#x662F;&#x6709; <code>margin-top</code> <code>margin-bottom</code> &#x7684;&#x3002;</p><p>&#x540C;&#x65F6;<strong>&#x53EF;&#x4EE5;&#x7ED9;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x9AD8;&#x5BBD;</strong>&#xFF0C;&#x5BBD;&#x5EA6;&#x672A;&#x8BBE;&#x7F6E;&#x65F6;&#x9ED8;&#x8BA4;&#x662F; <code>100%</code>&#x3002;</p><h4>2.2&#xFF09;<code>inline</code> &#x5143;&#x7D20;</h4><p>&#x884C;&#x5185;&#xFF08;<code>inline</code>&#xFF09;&#x5143;&#x7D20;&#x4F1A;&#x5728;&#x4E00;&#x884C;&#x5185;&#x4ECE;&#x5DE6;&#x5411;&#x53F3;&#x6392;&#x5E03;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x884C;&#x6392;&#x6EE1;&#x4E86;&#xFF0C;&#x4F1A;&#x5F80;&#x4E0B;&#x4E00;&#x884C;&#x5806;&#x53E0;&#x3002;</p><p>&#x5E38;&#x89C1;&#x7684;&#x884C;&#x5185;&#x5143;&#x7D20;&#x6709; <code>span label b i sub sup</code>&#xFF0C;&#x7B49;&#x6587;&#x672C;&#x683C;&#x5F0F;&#x5316;&#x6807;&#x7B7E;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;p&gt;
        &lt;span class=&quot;green w100&quot;&gt;&#x54C8;&#x54C8;&lt;/span&gt;
        &lt;label class=&quot;red w100&quot;&gt;&#x54C8;&#x54C8;&lt;/label&gt;
        &lt;b class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/b&gt;
        &lt;i class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/i&gt;
        &lt;sub class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sub&gt;
        &lt;sup class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sup&gt;
        &lt;span class=&quot;green w100&quot;&gt;&#x54C8;&#x54C8;&lt;/span&gt;
        &lt;label class=&quot;red w100&quot;&gt;&#x54C8;&#x54C8;&lt;/label&gt;
        &lt;b class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/b&gt;
        &lt;i class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/i&gt;
        &lt;sub class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sub&gt;
        &lt;sup class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sup&gt;
        &lt;span class=&quot;green w100&quot;&gt;&#x54C8;&#x54C8;&lt;/span&gt;
        &lt;label class=&quot;red w100&quot;&gt;&#x54C8;&#x54C8;&lt;/label&gt;
        &lt;b class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/b&gt;
        &lt;i class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/i&gt;
        &lt;sub class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sub&gt;
        &lt;sup class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sup&gt;
        &lt;span class=&quot;green w100&quot;&gt;&#x54C8;&#x54C8;&lt;/span&gt;
        &lt;label class=&quot;red w100&quot;&gt;&#x54C8;&#x54C8;&lt;/label&gt;
        &lt;b class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/b&gt;
        &lt;i class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/i&gt;
        &lt;sub class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sub&gt;
        &lt;sup class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sup&gt;
        &lt;span class=&quot;green w100&quot;&gt;&#x54C8;&#x54C8;&lt;/span&gt;
        &lt;label class=&quot;red w100&quot;&gt;&#x54C8;&#x54C8;&lt;/label&gt;
        &lt;b class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/b&gt;
        &lt;i class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/i&gt;
        &lt;sub class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sub&gt;&lt;sup class=&quot;red w100&quot;&gt;&#x5475;&#x5475;&lt;/sup&gt;
    &lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;container&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sup</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sup</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sup</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sup</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">sup</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x5475;&#x5475;<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre><p>&#x6548;&#x679C;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfS6?w=767&amp;h=108" src="https://static.alili.tech/img/bVbhfS6?w=767&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x7EC6;&#x5FC3;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x90FD;&#x8BBE;&#x7F6E;&#x4E86; <code>w100</code> &#x8FD9;&#x4E2A;&#x7C7B;&#xFF0C;&#x4F46;&#x662F;&#x9AD8;&#x5BBD;&#x90FD;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;<strong>&#x884C;&#x5185;&#x5143;&#x7D20;&#x4E0D;&#x80FD;&#x8BBE;&#x7F6E;&#x9AD8;&#x5BBD;&#xFF0C;&#x53EA;&#x4F1A;&#x6839;&#x636E;&#x5185;&#x5BB9;&#x7684;&#x9AD8;&#x5BBD;&#x81EA;&#x9002;&#x5E94;</strong>&#x3002;</p><p>ps:&#x6BCF;&#x4E2A;&#x884C;&#x5185;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x7684;&#x7A7A;&#x683C;&#x662F;&#x56E0;&#x4E3A;&#x5728;&#x7F16;&#x8F91;&#x524D;&#x91CC;&#x4E24;&#x4E2A;&#x6807;&#x7B7E;&#x4E4B;&#x95F4;&#x6709;&#x4E2A;&#x56DE;&#x8F66;&#x4EE5;&#x53CA;&#x591A;&#x4E2A; tab&#xFF08;&#x7A7A;&#x683C;&#xFF09;&#xFF0C;&#x8FD9;&#x4E9B;&#x4E0D;&#x53EF;&#x89C1;&#x5B57;&#x7B26;&#x88AB;&#x5F53;&#x6210;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;&#x5C55;&#x793A;&#x4E86;&#x3002;&#x6700;&#x540E;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x95F4;&#x9694;&#xFF0C;&#x6240;&#x4EE5;&#x4E2D;&#x95F4;&#x6CA1;&#x6709;&#x7A7A;&#x683C;&#x3002;</p><h4>2.3&#xFF09;<code>inline-block</code> &#x884C;&#x5185;&#x5757;</h4><p>&#x884C;&#x5185;&#x5757;&#x5143;&#x7D20;&#x65E2;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x9AD8;&#x5BBD;&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x50CF;&#x884C;&#x5185;&#x5143;&#x7D20;&#x4E00;&#x6837;&#x5E76;&#x6392;&#x6392;&#x5217;&#x3002;</p><p>&#x5E38;&#x89C1;&#x7684;&#x884C;&#x5185;&#x5757;&#x5143;&#x7D20;&#x6709; <code>img input button select</code>&#x7B49;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;
    &lt;img src=&quot;init.png&quot; class=&quot;red w100&quot;&gt;
    &lt;input class=&quot;green w50&quot;&gt;
    &lt;button class=&quot;red w100&quot;&gt;&#x54C8;&#x54C8;&lt;/button&gt;
    &lt;select class=&quot;green w100&quot;&gt;
        &lt;option&gt;1&lt;/option&gt;
    &lt;/select&gt;
&lt;/p&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;init.png&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w50&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red w100&quot;</span>&gt;</span>&#x54C8;&#x54C8;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;green w100&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhfVh?w=516&amp;h=210" src="https://static.alili.tech/img/bVbhfVh?w=516&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>2.4&#xFF09;<code>display</code>&#x5C0F;&#x7ED3;</h4><p>&#x5404;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x9ED8;&#x8BA4;&#x7684; <code>display</code> &#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED9;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; <code>display</code> &#x5C5E;&#x6027;&#x8986;&#x76D6;&#x9ED8;&#x8BA4;&#x7684;&#x5C5E;&#x6027;&#x3002;<br>&#x6BD4;&#x5982;&#x7ED9; <code>div</code> &#x8BBE;&#x7F6E; <code>display: inline-block</code>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8BA9;&#x5757;&#x513F;&#x5E76;&#x6392;&#x6392;&#x5217;&#x4E86;&#x3002;&#x7ED9; <code>span</code> &#x8BBE;&#x7F6E; <code>display:inline-block</code>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x9AD8;&#x5BBD;&#x4E86;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span style=&quot;display: block&quot; class=&quot;red&quot;&gt;&#x6211;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x662F;p&#x6807;&#x7B7E;&#x4E86;&lt;/span&gt;

&lt;div&gt;
    &lt;p style=&quot;display: inline&quot;&gt;&#x9999;&#x8549;&lt;/p&gt;
    &lt;p style=&quot;display: inline&quot;&gt;&#x6A59;&#x5B50;&lt;/p&gt;
    &lt;p style=&quot;display: inline&quot;&gt;&#x5927;&#x1F34A;&lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: block&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red&quot;</span>&gt;</span>&#x6211;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x662F;p&#x6807;&#x7B7E;&#x4E86;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline&quot;</span>&gt;</span>&#x9999;&#x8549;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline&quot;</span>&gt;</span>&#x6A59;&#x5B50;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline&quot;</span>&gt;</span>&#x5927;&#x1F34A;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgKo?w=410&amp;h=82" src="https://static.alili.tech/img/bVbhgKo?w=410&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">3&#xFF09;<code>position</code> &#x6837;&#x5F0F;</h3><p><code>position</code> &#x51B3;&#x5B9A;&#x4E86;&#x5143;&#x7D20;&#x7684;&#x5B9A;&#x4F4D;&#x65B9;&#x5F0F;&#x3002;</p><table><thead><tr><th>position</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td><code>static</code></td><td>&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5143;&#x7D20;&#x6846;&#x6B63;&#x5E38;&#x751F;&#x6210;&#x3002;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;&#x6846;&#xFF0C;&#x4F5C;&#x4E3A;&#x6587;&#x6863;&#x6D41;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x884C;&#x5185;&#x5143;&#x7D20;&#x5219;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x884C;&#x6846;&#xFF0C;&#x7F6E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x4E2D;&#x3002;</td></tr><tr><td><code>relative</code></td><td>&#x5143;&#x7D20;&#x6846;&#x504F;&#x79FB;&#x67D0;&#x4E2A;&#x8DDD;&#x79BB;&#x3002;&#x5143;&#x7D20;&#x4ECD;&#x4FDD;&#x6301;&#x5176;&#x672A;&#x5B9A;&#x4F4D;&#x524D;&#x7684;&#x5F62;&#x72B6;&#xFF0C;&#x5B83;&#x539F;&#x672C;&#x6240;&#x5360;&#x7684;&#x7A7A;&#x95F4;&#x4ECD;&#x4FDD;&#x7559;&#x3002;</td></tr><tr><td><code>absolute</code></td><td>&#x5143;&#x7D20;&#x6846;&#x4ECE;&#x6587;&#x6863;&#x6D41;&#x5B8C;&#x5168;&#x5220;&#x9664;&#xFF0C;&#x5E76;&#x76F8;&#x5BF9;&#x4E8E;&#x5176;&#x5305;&#x542B;&#x5757;&#xFF08;&#x79BB;&#x5B83;&#x6700;&#x8FD1;&#x7684;&#x5DF2;&#x7ECF;&#x5B9A;&#x4F4D;--&#x975E;<code>static</code>&#x5B9A;&#x4F4D;&#x7684;&#x7956;&#x5148;&#x5143;&#x7D20;&#xFF09;&#x5B9A;&#x4F4D;&#x3002;&#x5305;&#x542B;&#x5757;&#x53EF;&#x80FD;&#x662F;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6216;&#x8005;&#x662F;&#x521D;&#x59CB;&#x5305;&#x542B;&#x5757;&#x3002;&#x5143;&#x7D20;&#x539F;&#x5148;&#x5728;&#x6B63;&#x5E38;&#x6587;&#x6863;&#x6D41;&#x4E2D;&#x6240;&#x5360;&#x7684;&#x7A7A;&#x95F4;&#x4F1A;&#x5173;&#x95ED;&#xFF0C;&#x5C31;&#x597D;&#x50CF;&#x5143;&#x7D20;&#x539F;&#x6765;&#x4E0D;&#x5B58;&#x5728;&#x4E00;&#x6837;&#x3002;&#x5143;&#x7D20;&#x5B9A;&#x4F4D;&#x540E;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5757;&#x7EA7;&#x6846;&#xFF0C;&#x800C;&#x4E0D;&#x8BBA;&#x539F;&#x6765;&#x5B83;&#x5728;&#x6B63;&#x5E38;&#x6D41;&#x4E2D;&#x751F;&#x6210;&#x4F55;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6846;</td></tr><tr><td><code>fixed</code></td><td>&#x5143;&#x7D20;&#x6846;&#x7684;&#x8868;&#x73B0;&#x7C7B;&#x4F3C;&#x4E8E;&#x5C06; <code>position</code> &#x8BBE;&#x7F6E;&#x4E3A; <code>absolute</code>&#xFF0C;&#x4E0D;&#x8FC7;&#x5176;&#x5305;&#x542B;&#x5757;&#x662F;&#x89C6;&#x7A97;&#x672C;&#x8EAB;&#x3002;&#xFF08;&#x7F51;&#x7AD9;&#x7684;&#x201C;&#x8054;&#x7CFB;&#x5BA2;&#x670D;&#x201D;&#x6309;&#x94AE;&#x4E00;&#x822C;&#x662F; <code>fixed</code> &#x5B9A;&#x4F4D;&#xFF09;</td></tr></tbody></table><p>&#x8BBE;&#x7F6E;&#x5B9A;&#x4F4D;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E; <code>top right left bottom</code> &#x6837;&#x5F0F;&#x6765;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p><p>&#x5176;&#x4E2D;&#xFF0C;<code>relative</code> &#x5B9A;&#x4F4D;&#x7684; <code>top right left bottom</code> &#x503C;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x5176;&#x539F;&#x6765;&#x4F4D;&#x7F6E;&#x7684;&#x504F;&#x79FB;&#x3002;<br><code>absolute fixed</code> &#x5B9A;&#x4F4D;&#x7684; <code>top right left bottom</code> &#x503C;&#x662F;&#x8DDD;&#x79BB;&#x5176;&#x5305;&#x542B;&#x5757;&#x5185;&#x8FB9;&#x6846;&#x7684;&#x8DDD;&#x79BB;&#x3002;</p><p>&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container relative&quot;&gt;
    &lt;div class=&quot;red&quot; style=&quot;height: 200px&quot;&gt;
        &lt;div class=&quot;green absolute w100&quot; style=&quot;right: 10px; bottom: 20px&quot;&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;green relative&quot; style=&quot;height: 300px; width: 500px; margin: 0 auto; top: -20px; border: 5px solid red&quot;&gt;
        &lt;div class=&quot;red absolute w100&quot; style=&quot;right: 10px; bottom: 20px&quot;&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;container relative&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;red&quot;</span> style=<span class="hljs-string">&quot;height: 200px&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;green absolute w100&quot;</span> style=<span class="hljs-string">&quot;right: 10px; bottom: 20px&quot;</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;green relative&quot;</span> style=<span class="hljs-string">&quot;height: 300px; width: 500px; margin: 0 auto; top: -20px; border: 5px solid red&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;red absolute w100&quot;</span> style=<span class="hljs-string">&quot;right: 10px; bottom: 20px&quot;</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgwJ?w=772&amp;h=531" src="https://static.alili.tech/img/bVbhgwJ?w=772&amp;h=531" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader4">&#x628A;&#x9875;&#x9762;&#x8C03;&#x6574;&#x7684;&#x597D;&#x770B;&#x4E00;&#x4E9B;</h2><h4>&#x4F7F;&#x7528; <code>calc</code> &#x4E0E;&#x767E;&#x5206;&#x6BD4;&#x81EA;&#x9002;&#x5E94;&#x5BBD;&#x5EA6;</h4><p>&#x5728;&#x505A;&#x540E;&#x53F0;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x7ECF;&#x5E38;&#x4F1A;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x573A;&#x666F;&#xFF1A;&#x5DE6;&#x4FA7;&#x83DC;&#x5355;&#x5BBD;&#x5EA6;&#x4E0D;&#x53D8;&#xFF0C;&#x53F3;&#x4FA7;&#x9762;&#x677F;&#x8DDF;&#x968F;&#x6D4F;&#x89C8;&#x5668;&#x5BBD;&#x5EA6;&#x53D8;&#x5316;&#x3002;</p><p>&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6; 100%&#xFF0C;&#x5DE6;&#x4FA7;&#x83DC;&#x5355;&#x5BBD;&#x5EA6;&#x56FA;&#x5B9A;&#xFF0C;&#x53F3;&#x4FA7;&#x9762;&#x677F;&#x5BBD;&#x5EA6;&#x4E3A; <code>calc(100% - (&#x4E24;&#x4E2A;&#x5757;&#x7684;&#x5185;&#x5916;&#x8FB9;&#x8DDD;&#x8FB9;&#x6846;&#x4E4B;&#x548C;+&#x5DE6;&#x4FA7;&#x5BBD;&#x5EA6;))</code></p><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container relative&quot; style=&quot;width: 100%&quot;&gt;
    &lt;div style=&quot;display: inline-block; width: 100px; height: 200px&quot; class=&quot;red&quot;&gt;

    &lt;/div&gt;
    &lt;div style=&quot;display: inline-block; width: calc(100% - 106px); height: 200px&quot; class=&quot;red&quot;&gt;

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container relative&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width: 100%&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline-block; width: 100px; height: 200px&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline-block; width: calc(100% - 106px); height: 200px&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgyk?w=723&amp;h=227" src="https://static.alili.tech/img/bVbhgyk?w=723&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4><code>vertical-align:top</code> &#x884C;&#x5185;&#x5757;&#x5E38;&#x7528;&#x7684;&#x4E0A;&#x4E0B;&#x5BF9;&#x9F50;</h4><p>&#x5728;&#x5199;&#x8868;&#x5355;&#x6216;&#x8005;&#x67D0;&#x4E9B;&#x7279;&#x6B8A;&#x5E03;&#x5C40;&#x65F6;&#xFF0C;&#x591A;&#x4E2A;&#x5E76;&#x5217;&#x7684;&#x884C;&#x5185;&#x5757;&#x53EF;&#x80FD;&#x9AD8;&#x5EA6;&#x4E0D;&#x4E00;&#xFF0C;&#x901A;&#x5E38;&#x6765;&#x8BF4;&#xFF0C;&#x628A;&#x4ED6;&#x4EEC;&#x9876;&#x90E8;&#x5BF9;&#x9F50;&#x662F;&#x6BD4;&#x8F83;&#x597D;&#x770B;&#x7684;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container relative&quot; style=&quot;width: 100%&quot;&gt;
    &lt;div style=&quot;display: inline-block; width: 100px; height: 100px; vertical-align: top&quot; class=&quot;red&quot;&gt;

    &lt;/div&gt;
    &lt;div style=&quot;display: inline-block; width: calc(100% - 106px); height: 200px&quot; class=&quot;red&quot;&gt;

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container relative&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width: 100%&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline-block; width: 100px; height: 100px; vertical-align: top&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display: inline-block; width: calc(100% - 106px); height: 200px&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgyS?w=722&amp;h=221" src="https://static.alili.tech/img/bVbhgyS?w=722&amp;h=221" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4><code>box-shadow</code> &#x8BA9;&#x5757;&#x53D8;&#x5F97;&#x66F4;&#x6709;&#x7ACB;&#x4F53;&#x611F;</h4><p>&#x5728;&#x4F7F;&#x7528;&#x9762;&#x677F;&#x3001;&#x6309;&#x94AE;&#x3001;&#x8F93;&#x5165;&#x6846;&#x7B49;&#x53EF;&#x4EA4;&#x4E92;&#x5185;&#x5BB9;&#x6216;&#x5927;&#x5757;&#x5185;&#x5BB9;&#x65F6;&#xFF0C;&#x8BBE;&#x7F6E;&#x9002;&#x5F53;&#x7684;&#x76D2;&#x9634;&#x5F71;&#x6548;&#x679C;&#x80FD;&#x591F;&#x589E;&#x52A0;&#x9875;&#x9762;&#x7ACB;&#x4F53;&#x611F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.panel {
    width: 180px;
    height: 100px;
    box-shadow: 0px 0px 8px red;
}
&lt;/style&gt;
&lt;div class=&quot;container relative&quot; style=&quot;width: 100%; border: none; padding: 10px&quot;&gt;

    &lt;div class=&quot;panel&quot; style=&quot;padding: 10px&quot;&gt;
        &lt;h3&gt;&#x5185;&#x5BB9;&#x4ECB;&#x7ECD;&lt;/h3&gt;
    &lt;/div&gt;

&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.panel</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">8px</span> red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container relative&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width: 100%; border: none; padding: 10px&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;panel&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;padding: 10px&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x5185;&#x5BB9;&#x4ECB;&#x7ECD;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgD8?w=255&amp;h=157" src="https://static.alili.tech/img/bVbhgD8?w=255&amp;h=157" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4><code>transition</code> &#x589E;&#x52A0;&#x7528;&#x6237;&#x4F53;&#x9A8C;</h4><p><code>transition</code> &#x80FD;&#x591F;&#x8BA9;&#x4E0D;&#x540C;&#x72B6;&#x6001;&#x4E4B;&#x524D;&#x7684;&#x6837;&#x5F0F;&#x53D8;&#x5316;&#x6709;&#x4E2A;&#x6E10;&#x53D8;&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x4E5F;&#x662F;&#x5E38;&#x7528;&#x7684;&#x4F18;&#x5316;&#x624B;&#x6BB5;&#x3002;</p><p>&#x5E38;&#x4E0E; hover &#x540C;&#x65F6;&#x4F7F;&#x7528;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.button{
    background-color: red;
    color: white;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;

    transition: background-color .3s;
}

.button:hover {
    background-color: darkolivegreen;
}
&lt;/style&gt;
&lt;div class=&quot;container relative&quot; style=&quot;width: 100%&quot;&gt;
    &lt;button class=&quot;button&quot;&gt;&#x70B9;&#x6211;&lt;/button&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.button</span>{
    <span class="hljs-attribute">background-color</span>: red;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;

    <span class="hljs-attribute">transition</span>: background-color .<span class="hljs-number">3s</span>;
}

<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">background-color</span>: darkolivegreen;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container relative&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width: 100%&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;button&quot;</span>&gt;</span>&#x70B9;&#x6211;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF08;&#x539F;&#x8C05;&#x8FD9;&#x91CC;&#x6CA1;&#x6709; gif&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgBd?w=70&amp;h=51" src="https://static.alili.tech/img/bVbhgBd?w=70&amp;h=51" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/bVbhgBg?w=74&amp;h=58" src="https://static.alili.tech/img/bVbhgBg?w=74&amp;h=58" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/bVbhgBj?w=72&amp;h=59" src="https://static.alili.tech/img/bVbhgBj?w=72&amp;h=59" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h4><code>border-radius</code> &#x7684;&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;</h4><p><code>border-radius</code> &#x9664;&#x4E86;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x7B80;&#x5355;&#x7684;&#x5706;&#x89D2;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5355;&#x72EC;&#x4E3A;&#x4E0D;&#x540C;&#x7684;&#x89D2;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x5F27;&#x5EA6;&#xFF1B;&#x6240;&#x6709;&#x89D2;&#x8BBE;&#x7F6E; 50% &#x8FD8;&#x80FD;&#x5B9E;&#x73B0;&#x692D;&#x5706;&#xFF08;&#x6216;&#x8005;&#x5706;&#x5F62;&#xFF09;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;h6 class=&quot;inline&quot;&gt;&#x5C0F;&#x5706;&#x70B9;&lt;/h6&gt;
&lt;div class=&quot;inline&quot; style=&quot;width: 6px; height: 6px; border-radius: 50%; background-color: red&quot;&gt;
&lt;/div&gt;

&lt;div class=&quot;red&quot; style=&quot;border-top-left-radius: 50px; border-bottom-right-radius: 50px; width: 100px; height: 50px&quot;&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;h6 <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;inline&quot;</span>&gt;&#x5C0F;&#x5706;&#x70B9;&lt;/h6&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;inline&quot;</span> style=<span class="hljs-string">&quot;width: 6px; height: 6px; border-radius: 50%; background-color: red&quot;</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;red&quot;</span> style=<span class="hljs-string">&quot;border-top-left-radius: 50px; border-bottom-right-radius: 50px; width: 100px; height: 50px&quot;</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhgFO?w=150&amp;h=133" src="https://static.alili.tech/img/bVbhgFO?w=150&amp;h=133" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader5">&#x629B;&#x5F03;jQuery&#xFF0C;&#x62E5;&#x62B1; vue</h2><p><strong>&#x81F3;&#x5C11;&#x80FD;&#x63D0;&#x9AD8;&#x4E00;&#x500D;&#x7684;&#x5DE5;&#x4F5C;&#x6548;&#x7387;&#x548C;N&#x500D;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x3002;</strong></p><p>&#x4EE5;&#x4E0A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
后端工程师必知必会的前端 css 知识

## 原文链接
[https://segmentfault.com/a/1190000016470000](https://segmentfault.com/a/1190000016470000)


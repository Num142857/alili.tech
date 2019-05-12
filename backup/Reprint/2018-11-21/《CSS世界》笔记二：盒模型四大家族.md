---
title: '《CSS世界》笔记二：盒模型四大家族' 
date: 2018-11-21 2:30:10
hidden: true
slug: aqu274xgoa6
categories: [reprint]
---

{{< raw >}}
<p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015689406">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E00;&#xFF1A;&#x6D41;/&#x5143;&#x7D20;/&#x5C3A;&#x5BF8;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015913922" target="_blank">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E09;&#xFF1A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4E0E;&#x5BF9;&#x9F50;</a></p><h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x5728;&#x8BFB;&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B2C;&#x56DB;&#x7AE0;&#x4E4B;&#x524D;&#xFF0C;&#x7C97;&#x6D45;&#x7684;&#x8BA4;&#x4E3A;&#x76D2;&#x6A21;&#x578B;&#x65E0;&#x975E;&#x662F;<code>margin/border/padding/content</code>&#x800C;&#x5DF2;&#xFF0C;&#x518D;&#x591A;&#x65E0;&#x975E;&#x5728;&#x4E0D;&#x540C;<code>box-sizing</code>&#x4E0B;&#x7684;&#x8868;&#x73B0;&#x4E0D;&#x540C;&#x800C;&#x5DF2;&#xFF1B;&#x4F46;&#x662F;&#x4E66;&#x4E2D;&#x8BB0;&#x5F55;&#x7684;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x4E0E;&#x975E;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x3001;<code>content</code>&#x7684;&#x4E00;&#x4E9B;&#x7528;&#x6CD5;&#x3001;<code>margin</code>&#x5408;&#x5E76;&#x7B49;&#x7B49;&#xFF0C;&#x8BA9;&#x6211;&#x5BF9;&#x201C;&#x76D2;&#x6A21;&#x578B;&#x56DB;&#x5927;&#x5BB6;&#x65CF;&#x201D;&#x6709;&#x4E86;&#x5168;&#x65B0;&#x7684;&#x8BA4;&#x8BC6;</p><h2 id="articleHeader1">&#x4E00;&#x3001;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x4E0E;&#x975E;&#x66FF;&#x6362;&#x5143;&#x7D20;</h2><blockquote>&#x6839;&#x636E;&#x201C;&#x5916;&#x5728;&#x76D2;&#x5B50;&#x201D;&#x662F;&#x5185;&#x8054;&#x8FD8;&#x662F;&#x5757;&#x7EA7;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x5143;&#x7D20;&#x5206;&#x4E3A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x548C;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x6839;&#x636E;&#x662F;&#x5426;&#x5177;&#x6709;&#x53EF;&#x66FF;&#x6362;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x628A;&#x5143;&#x7D20;&#x5206;&#x4E3A;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x548C;&#x975E;&#x66FF;&#x6362;&#x5143;&#x7D20;</blockquote><h3 id="articleHeader2">1.1 &#x66FF;&#x6362;&#x5143;&#x7D20;&#x5B9A;&#x4E49;</h3><p><strong>&#x901A;&#x8FC7;&#x4FEE;&#x6539;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#x5448;&#x73B0;&#x7684;&#x5185;&#x5BB9;&#x5C31;&#x53EF;&#x4EE5;&#x88AB;&#x66FF;&#x6362;&#x7684;&#x5143;&#x7D20;&#x5C31;&#x79F0;&#x4E3A;&#x201C;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x201D;</strong>&#xFF0C;&#x5E38;&#x89C1;&#x7684;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x6709;&#xFF1A;<code>&lt;img&gt;</code>&#x3001;<code>&lt;object&gt;</code>&#x3001;<code>&lt;video&gt;</code>&#x3001;<code>&lt;iframe&gt;</code>&#x6216;&#x8005;&#x8868;&#x5355;&#x5143;&#x7D20;<code>&lt;textarea&gt;</code>&#x548C;<code>&lt;input&gt;</code></p><h3 id="articleHeader3">1.2 &#x66FF;&#x6362;&#x5143;&#x7D20;&#x7684;&#x7279;&#x70B9;</h3><ol><li>&#x5185;&#x5BB9;&#x7684;&#x5916;&#x89C2;&#x4E0D;&#x53D7;&#x9875;&#x9762;&#x4E0A;&#x7684; CSS &#x7684;&#x5F71;&#x54CD;&#xFF1B;&#x5982;&#x5355;&#x590D;&#x9009;&#x6846;&#x7684;&#x5185;&#x95F4;&#x8DDD;&#x3001;&#x80CC;&#x666F;&#x8272;&#x7B49;&#x6837;&#x5F0F;</li><li>&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x5C3A;&#x5BF8;&#xFF1B;&#x5982;<code>&lt;video&gt;</code>&#x3001;<code>&lt;img&gt;</code>&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x5C3A;&#x5BF8;</li><li>&#x5728;&#x5F88;&#x591A; CSS &#x5C5E;&#x6027;&#x4E0A;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4E00;&#x5957;&#x8868;&#x73B0;&#x89C4;&#x5219;&#xFF1B;<strong><code>vertical-align</code>&#x4E2D;&#xFF0C;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x9ED8;&#x8BA4;&#x4E3A;<code>baseline</code>&#xFF08;&#x5B57;&#x6BCD;x&#x4E0B;&#x8FB9;&#x7F18;&#xFF09;&#xFF0C;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x5C31;&#x88AB;&#x786C;&#x751F;&#x751F;&#x5B9A;&#x4E49;&#x6210;&#x4E86;&#x5143;&#x7D20;&#x7684;&#x4E0B;&#x8FB9;&#x7F18;</strong></li></ol><h3 id="articleHeader4">1.3 &#x66FF;&#x6362;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x8BA1;&#x7B97;&#x89C4;&#x5219;</h3><p>&#x66FF;&#x6362;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x4ECE;&#x5185;&#x800C;&#x5916;&#x5206;&#x4E3A; 3 &#x7C7B;&#xFF1A;&#x56FA;&#x6709;&#x5C3A;&#x5BF8;&#x3001;HTML &#x5C3A;&#x5BF8;&#x548C; CSS &#x5C3A;&#x5BF8;</p><ol><li><strong>&#x56FA;&#x6709;&#x5C3A;&#x5BF8;</strong>&#x6307;&#x7684;&#x662F;&#x66FF;&#x6362;&#x5185;&#x5BB9;&#x539F;&#x672C;&#x7684;&#x5C3A;&#x5BF8;&#xFF1B;&#x4F8B;&#x5982;&#xFF0C;&#x56FE;&#x7247;&#x3001;&#x89C6;&#x9891;&#x3001;input&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x6587;&#x4EF6;&#x5B58;&#x5728;&#x7684;&#x65F6; &#x5019;&#xFF0C;&#x90FD;&#x662F;&#x6709;&#x7740;&#x81EA;&#x5DF1;&#x7684;&#x5BBD;&#x5EA6;&#x548C;&#x9AD8;&#x5EA6;&#x7684;&#xFF1B;</li><li><strong>HTML &#x5C3A;&#x5BF8;</strong>&#xFF0C;&#x201C;HTML &#x5C3A;&#x5BF8;&#x201D;&#x53EA;&#x80FD;&#x901A;&#x8FC7;<code>HTML</code>&#x539F;&#x751F;&#x5C5E;&#x6027;&#x6539;&#x53D8;&#xFF0C;&#x8FD9;&#x4E9B;<code>HTML</code>&#x539F;&#x751F;&#x5C5E;&#x6027;&#x5305;&#x62EC;<code>&lt;img&gt;</code>&#x7684;<code>width</code>&#x548C;<code>height</code>&#x5C5E;&#x6027;&#x3001;<code>&lt;input&gt;</code> &#x7684;<code>size</code>&#x5C5E;&#x6027;&#x3001;<code>&lt;textarea&gt;</code>&#x7684;<code>cols</code> &#x548C; <code>rows</code> &#x5C5E;&#x6027;</li><li><strong>CSS &#x5C3A;&#x5BF8;</strong>&#x7279;&#x6307;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; CSS &#x7684;<code>width</code>&#x548C;<code>height</code>&#x6216;&#x8005;<code>max-width/min-width</code>&#x548C;<code>max-height/min-height</code>&#x8BBE;&#x7F6E;&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x5BF9;&#x5E94;&#x76D2;&#x5C3A;&#x5BF8;&#x4E2D;&#x7684;<code>content box</code></li></ol><p><span class="img-wrap"><img data-src="/img/bVbemux?w=560&amp;h=374" src="https://static.alili.tech/img/bVbemux?w=560&amp;h=374" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><strong>&#x5C3A;&#x5BF8;&#x8BA1;&#x7B97;&#x4F18;&#x5148;&#x7EA7;: CSS &#x5C3A;&#x5BF8; &gt; HTML &#x5C3A;&#x5BF8; &gt; &#x56FA;&#x6709;&#x5C3A;&#x5BF8;</strong></p><h3 id="articleHeader5">1.4 &#x66FF;&#x6362;&#x5143;&#x7D20;&#x4E0E;&#x666E;&#x901A;&#x5143;&#x7D20;&#x7684;&#x8F6C;&#x6362;&#xFF08;&#x7406;&#x8BBA;&#x4E0A;&#xFF09;</h3><p><strong>&#x731C;&#x60F3;1</strong>&#xFF1A;html&#x4E2D;src&#x5C5E;&#x6027;&#xFF0C;img/video&#x53BB;&#x6389;src&#x5C5E;&#x6027;&#x540E;&#x4E5F;&#x5C31;&#x6210;&#x4E86;&#x666E;&#x901A;&#x5143;&#x7D20;<br><strong>&#x731C;&#x60F3;2</strong>&#xFF1A;css&#x4E2D;&#x7684;content&#x5C5E;&#x6027;&#xFF0C;&#x666E;&#x901A;&#x5143;&#x7D20;&#x901A;&#x8FC7;content&#x5C5E;&#x6027;&#x4E5F;&#x53EF;&#x4EE5;&#x5C55;&#x793A;&#x5143;&#x7D20;&#x4E2D;&#x539F;&#x672C;&#x6CA1;&#x6709;&#x7684;&#x6587;&#x5B57;&#x6216;&#x56FE;&#x7247;</p><h2 id="articleHeader6">&#x4E8C;&#x3001;content&#x5C5E;&#x6027;</h2><p>&#x6CE8;&#x610F;&#xFF0C;<code>content</code>&#x5C5E;&#x6027;&#x4E0D;&#x4EC5;&#x80FD;&#x7528;&#x4E8E;::before/::after&#x4E2D;&#xFF0C;&#x8FD8;&#x80FD;&#x7528;&#x4E8E;&#x5143;&#x7D20;&#x4E2D;&#xFF0C;&#x4E0D;&#x8FC7;&#x6709;&#x4E00;&#x5B9A;&#x517C;&#x5BB9;&#x6027;&#x3002;</p><blockquote>&#x5728; Chrome &#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x652F;&#x6301; content &#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#x4EC5;&#x5728;::before/::after &#x4F2A;&#x5143;&#x7D20; &#x4E2D;&#x624D;&#x6709;&#x652F;&#x6301;</blockquote><p>&#x6848;&#x4F8B;1&#xFF1A;<a href="http://demo.cssworld.cn/4/1-2.php" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x56FE;&#x7247;&#x5185;&#x5BB9;&#x751F;&#x6210;&#x6280;&#x672F;</a></p><p><span class="img-wrap"><img data-src="/img/bVbemuS?w=492&amp;h=378" src="https://static.alili.tech/img/bVbemuS?w=492&amp;h=378" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><strong>&#x539F;&#x7406;</strong>&#xFF1A;<strong>img&#x6807;&#x7B7E;&#x6709;src&#x65F6;&#x4E0D;&#x652F;&#x6301;&#x4F2A;&#x7C7B;&#xFF0C;&#x6CA1;&#x6709;src&#x65F6;&#x652F;&#x6301;&#x4F2A;&#x7C7B;</strong>&#xFF1B;&#x56FE;&#x7247;&#x6CA1;&#x6709;src&#x65F6;&#xFF0C;<code>::before</code>&#x548C;<code>::after</code>&#x53EF;&#x4EE5;&#x751F;&#x6548;&#xFF1B;&#x7ED9;&#x56FE;&#x7247;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>src</code>&#x5730;&#x5740;&#x65F6;&#xFF0C;&#x56FE;&#x7247;&#x4ECE;&#x666E;&#x901A;&#x5143;&#x7D20;&#x53D8;&#x6210;&#x66FF;&#x6362;&#x5143;&#x7D20;&#xFF0C;&#x539F;&#x672C;&#x90FD;&#x8FD8;&#x652F;&#x6301;&#x7684;<code>::before</code>&#x548C;<code>::after</code>&#x6B64;&#x65F6;&#x5168;&#x90E8;&#x65E0;&#x6548;</p><p>&#x6848;&#x4F8B;2&#xFF1A;content &#x5F15;&#x5165;&#x56FE;&#x7247;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img { content: url(1.jpg); }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">content</span>: <span class="hljs-built_in">url</span>(1.jpg); }</code></pre><p>&#x6848;&#x4F8B;3&#xFF1A;<a href="http://demo.cssworld.cn/4/1-4.php" rel="nofollow noreferrer" target="_blank">hover &#x5B9E;&#x73B0;&#x56FE;&#x7247;&#x66FF;&#x6362;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img src=&quot;laugh.png&quot;&gt;

img:hover {
    content: url(laugh-tear.png);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;<span class="hljs-selector-tag">laugh</span><span class="hljs-selector-class">.png</span>&quot;&gt;

<span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">url</span>(laugh-tear.png);
}</code></pre><p>&#x6848;&#x4F8B;4&#xFF1A;<a href="http://demo.cssworld.cn/4/1-5.php" rel="nofollow noreferrer" target="_blank">&#x4F18;&#x96C5;&#x5B9E;&#x73B0;h1&#x7684;SEO</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;h1&gt;&#x300A;CSS &#x4E16;&#x754C;&#x300B;&lt;/h1&gt;
h1 {
    width: 180px;
    height: 36px;
    background: url(logo.png); /* &#x9690;&#x85CF;&#x6587;&#x5B57; */
    text-indent: -999px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">h1</span>&gt;&#x300A;<span class="hljs-selector-tag">CSS</span> &#x4E16;&#x754C;&#x300B;&lt;/<span class="hljs-selector-tag">h1</span>&gt;
<span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">36px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(logo.png); <span class="hljs-comment">/* &#x9690;&#x85CF;&#x6587;&#x5B57; */</span>
    <span class="hljs-attribute">text-indent</span>: -<span class="hljs-number">999px</span>;
}</code></pre><p>&#x6848;&#x4F8B;5&#xFF1A;<a href="http://demo.cssworld.cn/4/1-9.php" rel="nofollow noreferrer" target="_blank">&#x52A0;&#x8F7D;&#x4E2D;&#x52A8;&#x753B;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x4E2D;&lt;dot&gt;...&lt;/dot&gt;

dot {
    display: inline-block;
    height: 1em;
    line-height: 1;
    text-align: left;
    vertical-align: -.25em;
    overflow: hidden;
}
dot::before {
    display: block;
    content: &apos;...\A..\A.&apos;;
    white-space: pre-wrap;
    animation: dot 3s infinite step-start both;
}
@keyframes dot {
    33% { transform: translateY(-2em); }
    66% { transform: translateY(-1em); }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x4E2D;&lt;<span class="hljs-selector-tag">dot</span>&gt;...&lt;/<span class="hljs-selector-tag">dot</span>&gt;

<span class="hljs-selector-tag">dot</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">text-align</span>: left;
    <span class="hljs-attribute">vertical-align</span>: -.<span class="hljs-number">25em</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-tag">dot</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;...\A..\A.&apos;</span>;
    <span class="hljs-attribute">white-space</span>: pre-wrap;
    <span class="hljs-attribute">animation</span>: dot <span class="hljs-number">3s</span> infinite step-start both;
}
@<span class="hljs-keyword">keyframes</span> dot {
    33% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-2em); }
    66% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-1em); }
}</code></pre><p>&#x539F;&#x7406;&#xFF1A;content&#x4E2D;&#x6709;&#x4E09;&#x884C;&#x5185;&#x5BB9;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x2018;...&#x2019;&#xFF0C;&#x2018;..&#x2019;&#xFF0C;&#x2018;.&#x2019;&#xFF1B;&#x52A8;&#x753B;&#x4F4D;&#x79FB;dot&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x7684;&#x6548;&#x679C;</p><p>&#x6848;&#x4F8B;6&#xFF1A;<a href="http://demo.cssworld.cn/4/1-18.php" rel="nofollow noreferrer" target="_blank">&#x8BA1;&#x6570;&#x5668;(&#x4E86;&#x89E3;)</a></p><h2 id="articleHeader7">&#x4E09;&#x3001;padding&#x5C5E;&#x6027;</h2><ol><li><strong>padding &#x5BF9;&#x5185;&#x8054;&#x5143;&#x7D20;&#x6C34;&#x5E73;&#x548C;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x4E0A;&#x5747;&#x6709;&#x5F71;&#x54CD;</strong></li><li><strong>padding &#x5BBD;&#x9AD8;&#x767E;&#x5206;&#x6BD4;&#x90FD;&#x662F;&#x57FA;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x8BA1;&#x7B97;</strong></li></ol><blockquote>&#x5F88;&#x591A;&#x5F88;&#x591A;&#x7684;&#x524D;&#x7AEF;&#x540C;&#x4E8B;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x8BA4;&#x8BC6;:<strong>&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684; padding &#x53EA;&#x4F1A;&#x5F71;&#x54CD;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#xFF0C;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5782;&#x76F4;&#x65B9;&#x5411;</strong>&#x3002;&#x8FD9;&#x79CD;&#x8BA4;&#x77E5;&#x662F;&#x4E0D;&#x51C6;&#x786E;&#x7684;&#xFF0C;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684; padding &#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x540C;&#x6837;&#x4F1A;&#x5F71;&#x54CD;&#x5E03;&#x5C40;&#xFF0C;&#x5F71;&#x54CD;&#x89C6;&#x89C9;&#x8868;&#x73B0;&#x3002; &#x53EA;&#x662F;&#x56E0;&#x4E3A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x53EF;&#x89C6;&#x5BBD;&#x5EA6;&#x548C;&#x53EF;&#x89C6;&#x9AD8;&#x5EA6;&#x7684;&#x8BF4;&#x6CD5;(clientHeight &#x548C; clientWidth &#x6C38;&#x8FDC;&#x662F; 0)&#xFF0C;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x7684;&#x884C;&#x4E3A;&#x8868;&#x73B0;&#x5B8C;&#x5168;&#x53D7; line-height &#x548C; vertical-align &#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x89C6;&#x89C9;&#x4E0A;&#x5E76;&#x6CA1;&#x6709;&#x6539;&#x53D8;&#x548C;&#x4E0A;&#x4E00;&#x884C;&#x4E0B;&#x4E00;&#x884C;&#x5185;&#x5BB9;&#x7684;&#x95F4;&#x8DDD;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x7ED9;&#x6211;&#x4EEC;&#x7684;&#x611F;&#x89C9;&#x5C31;&#x4F1A;&#x662F;&#x5782;&#x76F4; padding &#x6CA1;&#x6709;&#x8D77;&#x4F5C;&#x7528;&#x3002;</blockquote><p>&#x6848;&#x4F8B;1&#xFF1A;<a href="http://demo.cssworld.cn/4/2-1.php" rel="nofollow noreferrer" target="_blank">&#x589E;&#x5927;&#x70B9;&#x51FB;&#x533A;&#x57DF;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { padding: .25em 0; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">padding</span>: .<span class="hljs-number">25em</span> <span class="hljs-number">0</span>; }</code></pre><p>&#x6848;&#x4F8B;2&#xFF1A;<a href="http://demo.cssworld.cn/4/2-2.php" rel="nofollow noreferrer" target="_blank">&#x4EFB;&#x610F;&#x9AD8;&#x5EA6;&#x7684;&#x5206;&#x9694;&#x7B26;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;a href=&quot;&quot;&gt;&#x767B;&#x5F55;&lt;/a&gt;&lt;a href=&quot;&quot;&gt;&#x6CE8;&#x518C;&lt;/a&gt;

a + a:before {
    content: &quot;&quot;;
    font-size: 0;
    padding: 10px 3px 1px;
    margin-left: 6px;
    border-left: 1px solid gray;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">href</span>=&quot;&quot;&gt;&#x767B;&#x5F55;&lt;/<span class="hljs-selector-tag">a</span>&gt;&lt;<span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">href</span>=&quot;&quot;&gt;&#x6CE8;&#x518C;&lt;/<span class="hljs-selector-tag">a</span>&gt;

<span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">3px</span> <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">6px</span>;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid gray;
}</code></pre><p>&#x6848;&#x4F8B;3&#xFF1A;<a href="http://demo.cssworld.cn/4/2-3.php" rel="nofollow noreferrer" target="_blank">&#x7B49;&#x6BD4;&#x4F8B;&#x76D2;&#x5B50;</a></p><p>&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;&#xFF0C;&#x5982;&#x7F51;&#x9875;banner&#x7B49;&#x6BD4;&#x4F8B;&#x5927;&#x5C0F;&#x56FE;&#x7247;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x77E9;&#x5F62; */
div { padding: 50%; }
/* &#x6B63;&#x65B9;&#x5F62; */
div { padding: 25% 50%; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* &#x77E9;&#x5F62; */</span>
<span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">padding</span>: <span class="hljs-number">50%</span>; }
<span class="hljs-comment">/* &#x6B63;&#x65B9;&#x5F62; */</span>
<span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">padding</span>: <span class="hljs-number">25%</span> <span class="hljs-number">50%</span>; }</code></pre><p>&#x6848;&#x4F8B;4&#xFF1A;<a href="http://demo.cssworld.cn/4/2-4.php" rel="nofollow noreferrer" target="_blank">&#x56FE;&#x5F62;&#x7ED8;&#x5236;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x83DC;&#x5355; */
.icon-menu {
    display: inline-block;
    width: 140px; height: 10px;
    padding: 35px 0;
    /* &#x9ED8;&#x8BA4;border-color:currentColor; */
    border-top: 10px solid;
    border-bottom: 10px solid;
    /* &#x6838;&#x5FC3; */
    background-color: currentColor;
    background-clip: content-box;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* &#x83DC;&#x5355; */</span>
<span class="hljs-selector-class">.icon-menu</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">140px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">35px</span> <span class="hljs-number">0</span>;
    <span class="hljs-comment">/* &#x9ED8;&#x8BA4;border-color:currentColor; */</span>
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">10px</span> solid;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">10px</span> solid;
    <span class="hljs-comment">/* &#x6838;&#x5FC3; */</span>
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">background-clip</span>: content-box;
}</code></pre><h2 id="articleHeader8">&#x56DB;&#x3001;margin&#x5C5E;&#x6027;</h2><p>margin&#x7279;&#x70B9;&#xFF1A;</p><ol><li>&#x4E0E;padding&#x4E0D;&#x540C;&#xFF0C;margin&#x53EF;&#x4EE5;&#x4E3A;&#x8D1F;&#x503C;&#xFF1B;</li><li>&#x4E0E;padding&#x76F8;&#x540C;&#xFF0C;margin&#x7684;&#x767E;&#x5206;&#x6BD4;&#x4E5F;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;width</li></ol><h3 id="articleHeader9">4.1 margin&#x8D1F;&#x503C;&#x5E94;&#x7528;</h3><p>&#xFF08;1&#xFF09;&#x589E;&#x5927;&#x76D2;&#x5B50;&#x5C3A;&#x5BF8;</p><p><strong>&#x53EA;&#x6709;&#x5143;&#x7D20;&#x662F;&#x201C;&#x5145;&#x5206;&#x5229;&#x7528;&#x53EF;&#x7528;&#x7A7A;&#x95F4;&#x201D;&#x72B6;&#x6001;&#x7684;&#x65F6;&#x5019;&#xFF0C;margin &#x624D;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x7684;&#x53EF;&#x89C6;&#x5C3A;&#x5BF8;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x65E0;&#x6CD5;&#x6539;&#x53D8;&#x5C3A;&#x5BF8; */
.father {
    width: 300px;
    margin: 0 -20px;
}

/* .son &#x5C3A;&#x5BF8;&#x53D8;&#x5316; */
&lt;div class=&quot;father&quot;&gt;
    &lt;div class=&quot;son&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

.father { width: 300px; }
.son { margin: 0 -20px; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* &#x65E0;&#x6CD5;&#x6539;&#x53D8;&#x5C3A;&#x5BF8; */</span>
<span class="hljs-selector-class">.father</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> -<span class="hljs-number">20px</span>;
}

<span class="hljs-comment">/* .son &#x5C3A;&#x5BF8;&#x53D8;&#x5316; */</span>
&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">father</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">son</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.father</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>; }
<span class="hljs-selector-class">.son</span> { <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> -<span class="hljs-number">20px</span>; }</code></pre><p>&#xFF08;2&#xFF09;<a href="http://demo.cssworld.cn/4/3-2.php" rel="nofollow noreferrer" target="_blank">&#x7ECF;&#x5178;&#x65E0;&#x517C;&#x5BB9;&#x4E24;&#x680F;&#x5E03;&#x5C40;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".column-box {
    overflow: hidden;
}
.column-left,
.column-right {
    margin-bottom: -9999px;
    padding-bottom: 9999px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.column-box</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.column-left</span>,
<span class="hljs-selector-class">.column-right</span> {
    <span class="hljs-attribute">margin-bottom</span>: -<span class="hljs-number">9999px</span>;
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">9999px</span>;
}</code></pre><p>&#x5E03;&#x5C40;&#x539F;&#x7406;&#xFF1A;</p><blockquote>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x4E0A;&#x4E0B;&#x8DDD;&#x79BB;&#x662F; 0&#xFF0C;&#x4E00;&#x65E6; margin-bottom:-9999px &#x5C31;&#x610F;&#x5473;&#x7740;&#x540E;&#x9762;&#x6240;&#x6709;&#x5143;&#x7D20;&#x548C;&#x4E0A;&#x9762;&#x5143; &#x7D20;&#x7684;&#x7A7A;&#x95F4;&#x8DDD;&#x79BB;&#x53D8;&#x6210;&#x4E86;-9999px&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x540E;&#x9762;&#x5143;&#x7D20;&#x90FD;&#x5F80;&#x4E0A;&#x79FB;&#x52A8;&#x4E86; 9999px&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x795E;&#x6765;&#x4E00;&#x7B14; padding-bottom:9999px &#x589E;&#x52A0;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#xFF0C;&#x8FD9;&#x6B63;&#x8D1F;&#x4E00;&#x62B5;&#x6D88;&#xFF0C;&#x5BF9;&#x5E03;&#x5C40;&#x5C42;&#x5E76;&#x65E0;&#x5F71;&#x54CD;&#xFF0C;&#x4F46;&#x5374;&#x5E26;&#x6765;&#x4E86;&#x6211;&#x4EEC; &#x9700;&#x8981;&#x7684;&#x4E1C;&#x897F;&#x2014; &#x89C6;&#x89C9;&#x5C42;&#x591A;&#x4E86; 9999px &#x9AD8;&#x5EA6;&#x7684;&#x53EF;&#x4F7F;&#x7528;&#x7684;&#x80CC;&#x666F;&#x8272;</blockquote><h3 id="articleHeader10">4.2 margin&#x5408;&#x5E76;</h3><p><strong>&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x5916;&#x8FB9;&#x8DDD;(margin-top)&#x4E0E;&#x4E0B;&#x5916;&#x8FB9;&#x8DDD;(margin-bottom)&#x6709;&#x65F6;&#x4F1A;&#x5408;&#x5E76;&#x4E3A;&#x5355;&#x4E2A;&#x5916;&#x8FB9;&#x8DDD;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x73B0;&#x8C61;&#x79F0;&#x4E3A;&#x201C;margin &#x5408;&#x5E76;&#x201D;</strong>&#x3002;<br>&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#xFF1A;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x548C;&#x4EC5;&#x53D1;&#x751F;&#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x4E0A;</p><p><strong>margin&#x5408;&#x5E76;&#x7684;3&#x79CD;&#x573A;&#x666F;</strong></p><p>&#xFF08;1&#xFF09;&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x5143;&#x7D20; margin &#x5408;&#x5E76;&#x3002;&#x8FD9;&#x662F; margin &#x5408;&#x5E76;&#x4E2D;&#x6700;&#x5E38;&#x89C1;&#x3001;&#x6700;&#x57FA;&#x672C;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x7B2C;&#x4E00;&#x884C;&lt;/p&gt;
&lt;p&gt;&#x7B2C;&#x4E8C;&#x884C;&lt;/p&gt;

p { margin: 1em 0; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">p</span>&gt;&#x7B2C;&#x4E00;&#x884C;&lt;/<span class="hljs-selector-tag">p</span>&gt;
&lt;<span class="hljs-selector-tag">p</span>&gt;&#x7B2C;&#x4E8C;&#x884C;&lt;/<span class="hljs-selector-tag">p</span>&gt;

<span class="hljs-selector-tag">p</span> { <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> <span class="hljs-number">0</span>; }</code></pre><p>&#xFF08;2&#xFF09;&#x7236;&#x7EA7;&#x548C;&#x7B2C;&#x4E00;&#x4E2A;/&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;father&quot;&gt;
    &lt;div class=&quot;son&quot; style=&quot;margin-top:80px;&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div class=&quot;father&quot; style=&quot;margin-top:80px;&quot;&gt;
    &lt;div class=&quot;son&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!-- &#x8FD9;&#x79CD;&#x60C5;&#x5F62;&#x4E5F;&#x53EA;&#x8868;&#x73B0;&#x4E3A;&#x4E0A;&#x8FB9;&#x8DDD;80px&#xFF0C;margin&#x53D1;&#x751F;&#x4E86;&#x5408;&#x5E76; --&gt;
&lt;div class=&quot;father&quot; style=&quot;margin-top:80px;&quot;&gt;
    &lt;div class=&quot;son&quot; style=&quot;margin-top:80px;&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;father&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;son&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin-top:80px;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;father&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin-top:80px;&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;son&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x8FD9;&#x79CD;&#x60C5;&#x5F62;&#x4E5F;&#x53EA;&#x8868;&#x73B0;&#x4E3A;&#x4E0A;&#x8FB9;&#x8DDD;80px&#xFF0C;margin&#x53D1;&#x751F;&#x4E86;&#x5408;&#x5E76; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;father&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin-top:80px;&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;son&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin-top:80px;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#xFF08;3&#xFF09;&#x7A7A;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x7684; margin &#x5408;&#x5E76;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".father { overflow: hidden; }
.son { margin: 1em 0; }

&lt;div class=&quot;father&quot;&gt;
    &lt;div class=&quot;son&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.father</span> { <span class="hljs-attribute">overflow</span>: hidden; }
<span class="hljs-selector-class">.son</span> { <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> <span class="hljs-number">0</span>; }

&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">father</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">son</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;</code></pre><p>&#x6B64;&#x65F6;<code>.father</code>&#x6240;&#x5728;&#x7684;&#x8FD9;&#x4E2A;&#x7236;&#x7EA7;<code>&lt;div&gt;</code>&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x4EC5;&#x4EC5;&#x662F; 1em&#xFF0C;&#x56E0;&#x4E3A;<code>.son</code>&#x8FD9;&#x4E2A;&#x7A7A;<code>&lt;div&gt;</code>&#x5143;&#x7D20;&#x7684; <code>margin-top</code>&#x548C;<code>margin-bottom</code>&#x5408;&#x5E76;&#x5728;&#x4E00;&#x8D77;&#x4E86;</p><p><strong>&#x5982;&#x4F55;&#x963B;&#x6B62;margin&#x53D1;&#x751F;&#x5408;&#x5E76;&#xFF1F;</strong></p><p>&#x5BF9;&#x4E8E; margin-top &#x5408;&#x5E76;&#xFF0C;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x64CD;&#x4F5C;(&#x6EE1;&#x8DB3;&#x4E00;&#x4E2A;&#x6761;&#x4EF6;&#x5373;&#x53EF;):</p><ul><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E3A;&#x5757;&#x72B6;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#x5143;&#x7D20;;</li><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; border-top &#x503C;;</li><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; padding-top &#x503C;;</li><li>&#x7236;&#x5143;&#x7D20;&#x548C;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x6DFB;&#x52A0;&#x5185;&#x8054;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5206;&#x9694;&#x3002;</li></ul><p>&#x5BF9;&#x4E8E; margin-bottom &#x5408;&#x5E76;&#xFF0C;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x64CD;&#x4F5C;(&#x6EE1;&#x8DB3;&#x4E00;&#x4E2A;&#x6761;&#x4EF6;&#x5373;&#x53EF;):</p><ul><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E3A;&#x5757;&#x72B6;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#x5143;&#x7D20;;</li><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; border-bottom &#x503C;;</li><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; padding-bottom &#x503C;;</li><li>&#x7236;&#x5143;&#x7D20;&#x548C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x6DFB;&#x52A0;&#x5185;&#x8054;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5206;&#x9694;;</li><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; height&#x3001;min-height &#x6216; max-height&#x3002;</li></ul><p><strong>margin &#x5408;&#x5E76;&#x7684;&#x8BA1;&#x7B97;&#x89C4;&#x5219;</strong>&#xFF1A;</p><p>&#x201C;&#x6B63;&#x6B63;&#x53D6;&#x5927;&#x503C;&#x201D;&#x201C;&#x6B63;&#x8D1F;&#x503C;&#x76F8;&#x52A0;&#x201D;&#x201C;&#x8D1F;&#x8D1F;&#x6700;&#x8D1F;&#x503C;&#x201D;</p><h3 id="articleHeader11">4.3 margin:auto&#x6DF1;&#x5165;</h3><p>margin:auto &#x7684;&#x586B;&#x5145;&#x89C4;&#x5219;&#x5982;&#x4E0B;<br>(1)&#x5982;&#x679C;&#x4E00;&#x4FA7;&#x5B9A;&#x503C;&#xFF0C;&#x4E00;&#x4FA7; auto&#xFF0C;&#x5219; auto &#x4E3A;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x5927;&#x5C0F;&#x3002;<br>(2)&#x5982;&#x679C;&#x4E24;&#x4FA7;&#x5747;&#x662F; auto&#xFF0C;&#x5219;&#x5E73;&#x5206;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x3002;</p><p><a href="http://demo.cssworld.cn/4/3-4.php" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x4FA7;auto&#x5E94;&#x7528;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;father&quot;&gt;
    &lt;div class=&quot;son&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

.father {
    width: 300px;
}
.son {
    width: 200px;
    margin-right: 80px;
    margin-left: auto;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">father</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">son</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.father</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
}
<span class="hljs-selector-class">.son</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">margin-left</span>: auto;
}</code></pre><p><a href="http://demo.cssworld.cn/4/3-5.php" rel="nofollow noreferrer" target="_blank">&#x4E24;&#x4FA7;auto&#xFF0C;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".father {
    width: 300px; height: 150px;
    background-color: #f0f3f9;
    position:relative;
}
.son {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 200px; height: 100px;
    background-color: #cd0000;
    margin: auto;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.father</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f3f9</span>;
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.son</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#cd0000</span>;
    <span class="hljs-attribute">margin</span>: auto;
}</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;</p><blockquote><strong>display &#x8BA1;&#x7B97;&#x503C; inline &#x7684;&#x975E;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4; margin &#x662F;&#x65E0;&#x6548;&#x7684;&#x3002;&#x5BF9;&#x4E8E;&#x5185;&#x8054;&#x66FF;&#x6362;&#x5143;&#x7D20;&#xFF0C; &#x5782;&#x76F4; margin &#x6709;&#x6548;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709; margin &#x5408;&#x5E76;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x56FE;&#x7247;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x53D1;&#x751F; margin &#x5408;&#x5E76;&#x3002;</strong></blockquote><h2 id="articleHeader12">&#x4E94;&#x3001;border&#x5C5E;&#x6027;</h2><p>&#x51E0;&#x4E2A;&#x7279;&#x70B9;&#xFF1A;</p><ol><li>border&#x5C5E;&#x6027;&#x503C;&#x4E0D;&#x652F;&#x6301;&#x767E;&#x5206;&#x6BD4;</li><li>border-style &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;none</li><li>border-color &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;currentColor</li></ol><p>&#x5E94;&#x7528;1&#xFF1A;<a href="http://demo.cssworld.cn/4/4-1.php" rel="nofollow noreferrer" target="_blank">&#x56FE;&#x7247;&#x4E0A;&#x4F20;hover&#x53D8;&#x8272;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".add {
    color: #ccc;
    border: 2px dashed;
}
.add:before {
    border-top: 10px solid;
}
.add:after {
    border-left: 10px solid;
}
/* hover&#x53D8;&#x8272; */
.add:hover {
    color: #06C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.add</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> dashed;
}
<span class="hljs-selector-class">.add</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">10px</span> solid;
}
<span class="hljs-selector-class">.add</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">10px</span> solid;
}
<span class="hljs-comment">/* hover&#x53D8;&#x8272; */</span>
<span class="hljs-selector-class">.add</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#06C</span>;
}</code></pre><p>&#x5E94;&#x7528;2&#xFF1A;<a href="http://demo.cssworld.cn/4/4-2.php" rel="nofollow noreferrer" target="_blank">&#x4F18;&#x96C5;&#x589E;&#x52A0;&#x70B9;&#x51FB;&#x533A;&#x57DF;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* box-sizing&#x975E;border-box&#x65F6; */
.icon-clear {
    width: 16px;
    height: 16px;
    border: 11px solid transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* box-sizing&#x975E;border-box&#x65F6; */</span>
<span class="hljs-selector-class">.icon-clear</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">11px</span> solid transparent;
}</code></pre><p>&#x5E94;&#x7528;3&#xFF1A;&#x4E09;&#x89D2;&#x5F62;&#x7ED8;&#x5236;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    width: 0;
    border: 10px solid;
    border-color: #f30 transparent transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#f30</span> transparent transparent;
}</code></pre><p>border&#x80FD;&#x6784;&#x6210;&#x4E09;&#x89D2;&#x5F62;&#x548C;&#x68AF;&#x5F62;&#x7684;&#x539F;&#x7406;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbemvH?w=312&amp;h=134" src="https://static.alili.tech/img/bVbemvH?w=312&amp;h=134" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x901A;&#x8FC7;&#x6539;&#x53D8;width/height&#x4EE5;&#x53CA;border-width&#x5728;&#x4E0D;&#x540C;&#x65B9;&#x4F4D;&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x4E09;&#x89D2;&#x5F62;&#x7684;&#x503E;&#x89D2;&#x65B9;&#x4F4D;&#x548C;&#x5C3A;&#x5BF8;</p><p>&#x5E94;&#x7528;4&#xFF1A;<a href="http://demo.cssworld.cn/4/4-4.php" rel="nofollow noreferrer" target="_blank">border&#x7B49;&#x9AD8;&#x5E03;&#x5C40;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    border-left: 150px solid #333;
    background-color: #f0f3f9;
}
.box &gt; nav {
    width: 150px;
    margin-left: -150px;
    float: left;
}
.box &gt; section {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">150px</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f3f9</span>;
}
<span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">nav</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">150px</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">section</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>border&#x7B49;&#x9AD8;&#x5E03;&#x5C40;&#x7684;&#x5C40;&#x9650;&#x6027;&#xFF1A;</p><ol><li>&#x7531;&#x4E8E; border &#x4E0D;&#x652F;&#x6301;&#x767E;&#x5206;&#x6BD4;&#x5BBD;&#x5EA6;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x9002;&#x5408;&#x81F3;&#x5C11;&#x4E00;&#x680F;&#x662F;&#x5B9A;&#x5BBD;&#x7684;&#x5E03;&#x5C40;</li><li>&#x7B49;&#x9AD8;&#x5E03;&#x5C40;&#x7684;&#x680F;&#x76EE;&#x6709;&#x9650;&#x5236;&#x3002;&#x57FA;&#x672C;&#x4E0A;&#xFF0C;border &#x7B49; &#x9AD8;&#x5E03;&#x5C40;&#x53EA;&#x80FD;&#x6EE1;&#x8DB3; 2~3 &#x680F;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x9664;&#x975E;&#x6B63;&#x597D;&#x662F;&#x7B49;&#x6BD4;&#x4F8B;&#x7684;&#xFF0C;&#x90A3;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; border-style:double &#x5B9E;&#x73B0;&#x6700;&#x591A; 7 &#x680F;&#x5E03;&#x5C40;</li></ol><p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015689406">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E00;&#xFF1A;&#x6D41;/&#x5143;&#x7D20;/&#x5C3A;&#x5BF8;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015913922" target="_blank">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E09;&#xFF1A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4E0E;&#x5BF9;&#x9F50;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《CSS世界》笔记二：盒模型四大家族

## 原文链接
[https://segmentfault.com/a/1190000015777141](https://segmentfault.com/a/1190000015777141)


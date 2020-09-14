---
title: '《CSS世界》笔记三：内联元素与对齐' 
date: 2018-11-18 2:30:10
hidden: true
slug: tsqd1z0oq8f
categories: [reprint]
---

{{< raw >}}
<p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015777141">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E8C;&#xFF1A;&#x76D2;&#x6A21;&#x578B;&#x56DB;&#x5927;&#x5BB6;&#x65CF;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015940907" target="_blank">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x56DB;&#xFF1A;&#x6D41;&#x7684;&#x4FDD;&#x62A4;&#x4E0E;&#x7834;&#x574F;</a></p><h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x5728;&#x9875;&#x9762;&#x5E03;&#x5C40;&#x4E2D;&#xFF0C;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x5BF9;&#x9F50;&#x662F;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x548C;&#x57FA;&#x7840;&#x7684;&#x5E03;&#x5C40;&#x9700;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5F80;&#x5F80;&#x4F1A;&#x56E0;&#x4E3A;&#x5782;&#x76F4;&#x5BF9;&#x9F50;&#x4E2D;&#x7684;1px&#xFF0C;2px&#x800C;&#x5934;&#x75BC;&#x4E0D;&#x5DF2;&#x3002;&#x5728;&#x8FD9;&#x4E00;&#x7BC7;&#x535A;&#x5BA2;&#xFF08;&#x300A;css&#x4E16;&#x754C;&#x300B;&#x7B2C;&#x4E94;&#x7AE0;&#xFF09;&#x4E2D;&#xFF0C;&#x5F20;&#x5927;&#x5927;&#x4ECE;&#x6DF1;&#x5C42;&#x6B21;&#x89E3;&#x91CA;&#x4E86;&#x5782;&#x76F4;&#x5BF9;&#x9F50;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x5E76;&#x4E3A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x5BF9;&#x9F50;&#x63D0;&#x4F9B;&#x4E86;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#x3002;</p><h2 id="articleHeader1">&#x4E00;&#x3001;&#x57FA;&#x672C;&#x6982;&#x5FF5;</h2><p>&#xFF08;1&#xFF09;<strong>&#x57FA;&#x7EBF;(baseline)</strong>&#xFF1A;&#x5B57;&#x6BCD; x &#x7684;&#x4E0B;&#x8FB9;&#x7F18;(&#x7EBF;)&#x5C31;&#x662F;&#x57FA;&#x7EBF;</p><p>&#xFF08;2&#xFF09;<strong>x-height</strong>&#xFF1A;&#x5C0F;&#x5199;&#x5B57;&#x6BCD; x &#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x672F;&#x8BED;&#x63CF;&#x8FF0;&#x5C31;&#x662F;&#x57FA;&#x7EBF;&#x548C;&#x7B49;&#x5206;&#x7EBF;(mean line)(&#x4E5F;&#x79F0;&#x4F5C;&#x4E2D;&#x7EBF;&#xFF0C;midline)&#x4E4B;&#x95F4;&#x7684;&#x8DDD;&#x79BB;</p><p><span class="img-wrap"><img data-src="/img/bVbeV3m?w=844&amp;h=274" src="https://static.alili.tech/img/bVbeV3m?w=844&amp;h=274" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ascender height: &#x4E0A;&#x884C;&#x7EBF;&#x9AD8;&#x5EA6;
cap height: &#x5927;&#x5199;&#x5B57;&#x6BCD;&#x9AD8;&#x5EA6;
median: &#x4E2D;&#x7EBF;
descender height: &#x4E0B;&#x884C;&#x7EBF;&#x9AD8;&#x5EA6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>ascender <span class="hljs-string">height:</span> &#x4E0A;&#x884C;&#x7EBF;&#x9AD8;&#x5EA6;
cap <span class="hljs-string">height:</span> &#x5927;&#x5199;&#x5B57;&#x6BCD;&#x9AD8;&#x5EA6;
<span class="hljs-string">median:</span> &#x4E2D;&#x7EBF;
descender <span class="hljs-string">height:</span> &#x4E0B;&#x884C;&#x7EBF;&#x9AD8;&#x5EA6;</code></pre><p>&#xFF08;3&#xFF09;<strong>middle&#x7EBF;</strong>&#xFF1A;<code>vertical-align:middle;</code> &#x4E2D;middle&#x6307;&#x7684;&#x662F;&#x57FA;&#x7EBF;&#x5F80;&#x4E0A;1/2 x-height&#x9AD8;&#x5EA6;&#xFF08;&#x8FD1;&#x4F3C;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF09;</p><p>&#xFF08;4&#xFF09;<strong>&#x5355;&#x4F4D;ex</strong>&#xFF1A;CSS&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x76F8;&#x5BF9;&#x5355;&#x4F4D;&#xFF0C;&#x6307;&#x7684;&#x662F;&#x5C0F;&#x5199;&#x5B57;&#x6BCD; x &#x7684;&#x9AD8;&#x5EA6;<br>&#x7528;&#x6CD5;&#xFF1A;<a href="http://demo.cssworld.cn/5/1-1.php" rel="nofollow noreferrer" target="_blank">&#x4E0D;&#x53D7;&#x5B57;&#x4F53;&#x548C;&#x5B57;&#x53F7;&#x5F71;&#x54CD;&#x7684;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x5BF9;&#x9F50;&#x6548;&#x679C;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(arrow.png) no-repeat center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.icon-arrow</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1ex</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(arrow.png) no-repeat center;
}</code></pre><h2 id="articleHeader2">&#x4E8C;&#x3001;&#x884C;&#x9AD8;line-height</h2><blockquote>&#x5BF9;&#x4E8E;&#x975E;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x7684;&#x7EAF;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x5176;&#x53EF;&#x89C6;&#x9AD8;&#x5EA6;&#x5B8C;&#x5168;&#x7531; line-height &#x51B3;&#x5B9A;&#xFF0C;&#x901A;&#x4FD7;&#x7684;&#x8BF4;&#xFF0C;&#x7EAF;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x53EF;&#x89C6;&#x9AD8;&#x5EA6;&#x4E0D;&#x53D7;padding&#x3001;margin&#x3001;border &#x5C5E;&#x6027;&#x7684;&#x5F71;&#x54CD;&#xFF08;&#x8FD9;&#x4E2A;&#x6211;&#x4EEC;&#x5728;<a href="https://segmentfault.com/a/1190000015777141">&#x4E0A;&#x4E00;&#x7BC7;&#x535A;&#x5BA2;</a>&#x4E5F;&#x6709;&#x8BF4;&#x660E;&#xFF09;</blockquote><h3 id="articleHeader3">2.1 &#x884C;&#x8DDD;</h3><p>&#x4E00;&#x4E2A;&#x516C;&#x5F0F;&#xFF1A;<code>&#x884C;&#x8DDD; = line-height - font-size</code></p><p>&#x4E0A;&#x4E0B;&#x884C;&#x8DDD;&#x5206;&#x914D;&#x89C4;&#x5219;&#xFF1A;<strong>&#x5F53;&#x884C;&#x8DDD;&#x4E3A;&#x5076;&#x6570;&#x65F6;&#xFF0C;&#x4E0A;&#x4E0B;&#x884C;&#x8DDD;&#x5E73;&#x5206;&#xFF1B;&#x5F53;&#x884C;&#x8DDD;&#x4E3A;&#x57FA;&#x6570;&#x65F6;&#xFF0C;&#x4E0A;&#x8FB9;&#x8DDD;&#x5411;&#x4E0A;&#x53D6;&#x6574;&#xFF0C;&#x4E0B;&#x8FB9;&#x8DDD;&#x5411;&#x4E0B;&#x53D6;&#x6574;</strong>&#xFF1B;&#x56E0;&#x4E3A;&#x7EDD;&#x5927;&#x591A;&#x6570;&#x5B57;&#x4F53;&#x90FD;&#x662F;&#x504F;&#x4E0B;&#x7684;</p><p><span class="img-wrap"><img data-src="/img/bVbeV3D?w=1118&amp;h=498" src="https://static.alili.tech/img/bVbeV3D?w=1118&amp;h=498" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader4">2.2 line-height&#x5B9E;&#x73B0;&#x5C45;&#x4E2D;</h3><p><strong>&#x8BEF;&#x533A;</strong>&#xFF1A;&#x5E76;&#x975E;&#x662F;<code>line-height=height</code>&#x5B9E;&#x73B0;&#x4E86;&#x5355;&#x884C;&#x6587;&#x672C;&#x7684;&#x5C45;&#x4E2D;&#xFF0C;line-height&#x5355;&#x72EC;&#x4F5C;&#x7528;&#x5373;&#x53EF;&#x5B9E;&#x73B0;</p><p>&#x5E94;&#x7528;&#xFF1A;<a href="http://demo.cssworld.cn/5/2-4.php" rel="nofollow noreferrer" target="_blank">&#x5229;&#x7528;line-height&#x5B9E;&#x73B0;&#x591A;&#x884C;&#x6587;&#x672C;&#x5C45;&#x4E2D;&#x5BF9;&#x9F50;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box&quot;&gt;
    &lt;div class=&quot;content&quot;&gt;&#x57FA;&#x4E8E;&#x884C;&#x9AD8;&#x5B9E;&#x73B0;&#x7684;...&lt;/div&gt;
&lt;/div&gt;

/* &#x8FD1;&#x4F3C;&#x5C45;&#x4E2D;&#x5BF9;&#x9F50; */
.box {
    width: 280px;
    line-height: 120px;
    background-color: #f0f3f9;
    margin: auto;
}
.content {
    display: inline-block;
    line-height: 20px;
    margin: 0 20px;
    text-align: left;
    vertical-align: middle;
}

/* &#x7EDD;&#x5BF9;&#x5C45;&#x4E2D; */
.box {
    font-size: 0;
}
.box .content {
    font-size: initial;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">box</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">content</span>&quot;&gt;&#x57FA;&#x4E8E;&#x884C;&#x9AD8;&#x5B9E;&#x73B0;&#x7684;...&lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-comment">/* &#x8FD1;&#x4F3C;&#x5C45;&#x4E2D;&#x5BF9;&#x9F50; */</span>
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">280px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">120px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f3f9</span>;
    <span class="hljs-attribute">margin</span>: auto;
}
<span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">text-align</span>: left;
    <span class="hljs-attribute">vertical-align</span>: middle;
}

<span class="hljs-comment">/* &#x7EDD;&#x5BF9;&#x5C45;&#x4E2D; */</span>
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">font-size</span>: initial;
}</code></pre><p>&#x539F;&#x7406;&#xFF1A;<br>&#x8FD1;&#x4F3C;&#x5C45;&#x4E2D;&#xFF1A;<code>.box</code>&#x884C;&#x9AD8;&#x4E3A;120&#xFF0C;<code>.content</code>&#x884C;&#x9AD8;&#x4E3A;20&#xFF0C;&#x201C;&#x5E7D;&#x7075;&#x7A7A;&#x767D;&#x8282;&#x70B9;&#x201D;&#x5728;<code>.content</code>&#x524D;&#x6491;&#x8D77;&#x4E86;&#x6574;&#x4E2A;&#x5185;&#x5BB9;&#x533A;&#x57DF;</p><p>&#x7EDD;&#x5BF9;&#x5C45;&#x4E2D;&#xFF1A;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x7531;&#x4E8E;middle&#xFF08;&#x57FA;&#x7EBF;&#x5F80;&#x4E0A;1/2 x-height&#x9AD8;&#x5EA6;&#xFF09;&#x4E3A;&#x8FD1;&#x4F3C;&#x5C45;&#x4E2D;&#xFF0C;&#x7531;&#x4E8E;x-height&#x53D7;&#x5230;font-size&#x7684;&#x5F71;&#x54CD;&#xFF0C;font-size&#x4E3A;0&#x65F6;&#x53EF;&#x7406;&#x89E3;&#x4E3A;&#x7EDD;&#x5BF9;&#x5C45;&#x4E2D;</p><h3 id="articleHeader5">2.3 line-height&#x7684;&#x5C5E;&#x6027;&#x503C;</h3><blockquote>line-height &#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x662F; normal&#xFF0C;&#x8FD8;&#x652F;&#x6301;&#x6570;&#x503C;&#x3001;&#x767E;&#x5206;&#x6BD4;&#x503C;&#x4EE5;&#x53CA;&#x957F;&#x5EA6;&#x503C;</blockquote><p>&#x9ED8;&#x8BA4;&#x503C;normal&#x5728;&#x4E0D;&#x540C;&#x5B57;&#x4F53;&#x4E0B;&#x7684;&#x89E3;&#x6790;&#x4E0D;&#x540C;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x4E00;&#x822C;&#x4F1A;&#x91CD;&#x7F6E;line-height</p><p><strong>&#x91CD;&#x70B9;</strong>&#xFF1A;</p><p>&#x5047;&#x8BBE; font-size = 14px;</p><p>&#x6570;&#x503C;&#xFF1A;line-height: 1.5; ==&gt; line-height &#x8BA1;&#x7B97;&#x503C;&#x662F; 1.5*14px=21px</p><p>&#x767E;&#x5206;&#x6BD4;&#x503C;&#xFF1A;line-height: 150%; ==&gt; line-height &#x8BA1;&#x7B97;&#x503C;&#x662F; 150%*14px=21px</p><p>&#x957F;&#x5EA6;&#x503C;&#xFF1A;line-height:21px</p><blockquote>&#x4E4D;&#x4E00;&#x770B;&#xFF0C;&#x4F3C;&#x4E4E; line-height:1.5&#x3001;line-height:150%&#x548C; line-height:1.5em &#x8FD9;3&#x79CD;&#x7528;&#x6CD5;&#x662F;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x6700;&#x7EC8;&#x7684;&#x884C;&#x9AD8;&#x5927;&#x5C0F;&#x90FD;&#x662F;&#x548C; font-size&#x8BA1;&#x7B97;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;line-height:1.5&#x548C;&#x53E6;&#x5916;&#x4E24;&#x4E2A;&#x6709;&#x4E00;&#x70B9;&#x513F;&#x4E0D;&#x540C;&#xFF0C;&#x90A3;&#x5C31;&#x662F;<strong>&#x7EE7;&#x627F;&#x7EC6;&#x8282;&#x6709;&#x6240;&#x5DEE;&#x522B;</strong>&#x3002;<strong>&#x5982;&#x679C;&#x4F7F;&#x7528;&#x6570;&#x503C;&#x4F5C;&#x4E3A; line-height &#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x7EE7;&#x627F;&#x7684;&#x90FD;&#x662F;&#x8FD9;&#x4E2A;&#x503C;;&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x767E;&#x5206;&#x6BD4;&#x503C;&#x6216;&#x8005;&#x957F;&#x5EA6;&#x503C;&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x6240;&#x6709; &#x7684;&#x5B50;&#x5143;&#x7D20;&#x7EE7;&#x627F;&#x7684;&#x662F;&#x6700;&#x7EC8;&#x7684;&#x8BA1;&#x7B97;&#x503C;</strong></blockquote><p>&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF1A;<strong>&#x57FA;&#x672C;&#x4E0A;&#x5404;&#x5927;&#x7AD9;&#x70B9;&#x90FD;&#x662F;&#x4F7F;&#x7528;&#x6570;&#x503C;&#x4F5C;&#x4E3A;&#x5168;&#x5C40;&#x7684; line-height &#x503C;</strong></p><h2 id="articleHeader6">&#x4E09;&#x3001;vertical-align&#x5C5E;&#x6027;&#xFF08;&#x91CD;&#x70B9;&#xFF09;</h2><p>vertical-align &#x4F5C;&#x7528;&#x7684;&#x524D;&#x63D0;&#x6761;&#x4EF6;&#x662F;&#xFF1A;<strong>&#x53EA;&#x80FD;&#x5E94;&#x7528;&#x4E8E;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4EE5;&#x53CA;display&#x503C;&#x4E3A;table-cell&#x7684;&#x5143;&#x7D20;</strong>&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6D6E;&#x52A8;&#x548C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x4F1A;&#x8BA9;&#x5143;&#x7D20;&#x5757;&#x72B6;&#x5316;&#x4E5F;&#x4F1A;&#x4F7F;vertical-align&#x5931;&#x6548;</p><h3 id="articleHeader7">3.1 &#x5C5E;&#x6027;&#x503C;</h3><p>&#x56DB;&#x7C7B;&#x5C5E;&#x6027;&#x503C;&#xFF1A;</p><ul><li>&#x7EBF;&#x7C7B;&#xFF0C;&#x5982; baseline(&#x9ED8;&#x8BA4;&#x503C;)&#x3001;top&#x3001;middle&#x3001;bottom;</li><li>&#x6587;&#x672C;&#x7C7B;&#xFF0C;&#x5982; text-top&#x3001;text-bottom;</li><li>&#x4E0A;&#x6807;&#x4E0B;&#x6807;&#x7C7B;&#xFF0C;&#x5982; sub&#x3001;super;</li><li>&#x6570;&#x503C;&#x767E;&#x5206;&#x6BD4;&#x7C7B;&#xFF0C;&#x5982; 20px&#x3001;2em&#x3001;20%&#x7B49;;</li></ul><blockquote>&#x6839;&#x636E;&#x8BA1;&#x7B97;&#x503C;&#x7684;&#x4E0D;&#x540C;&#xFF0C;<strong>&#x76F8;&#x5BF9;&#x4E8E;&#x57FA;&#x7EBF;</strong>&#x5F80;&#x4E0A;&#x6216;&#x5F80;&#x4E0B;&#x504F;&#x79FB;&#xFF0C;&#x5230;&#x5E95;&#x662F;&#x5F80;&#x4E0A;&#x8FD8;&#x662F;&#x5F80;&#x4E0B;&#x53D6;&#x51B3;&#x4E8E;<code>vertical-align</code>&#x7684;&#x8BA1;&#x7B97;&#x503C;&#x662F;&#x6B63;&#x503C;&#x8FD8;&#x662F;&#x8D1F;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x8D1F;&#x503C;&#xFF0C;&#x5F80;&#x4E0B;&#x504F;&#x79FB;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x6B63;&#x503C;&#xFF0C;&#x5F80;&#x4E0A;&#x504F;&#x79FB;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vertical-align:baseline &#x7B49;&#x540C;&#x4E8E; vertical-align:0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code style="word-break:break-word;white-space:initial"><span class="hljs-symbol">vertical</span>-<span class="hljs-meta">align</span>:<span class="hljs-keyword">baseline </span>&#x7B49;&#x540C;&#x4E8E; vertical-<span class="hljs-meta">align</span>:<span class="hljs-number">0</span></code></pre><p>vertical-align&#x7684;&#x767E;&#x5206;&#x6BD4;&#xFF1A;<strong>margin &#x548C; padding &#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x5BBD;&#x5EA6;&#x8BA1;&#x7B97;&#x7684;&#xFF0C;line-height &#x662F;&#x76F8;&#x5BF9;&#x4E8E; font-size &#x8BA1;&#x7B97;&#x7684;&#xFF0C;&#x800C;&#x8FD9;&#x91CC;&#x7684; vertical-align &#x5C5E;&#x6027;&#x7684;&#x767E;&#x5206;&#x6BD4;&#x503C;&#x5219;&#x662F;&#x76F8;&#x5BF9;&#x4E8E; line-height &#x7684;&#x8BA1;&#x7B97;&#x503C;&#x8BA1;&#x7B97;&#x7684;</strong></p><h3 id="articleHeader8">3.2 vertical-align&#x76F8;&#x5173;&#x95EE;&#x9898;&#x53CA;&#x89E3;&#x51B3;</h3><p>&#xFF08;1&#xFF09;<strong>&#x6848;&#x4F8B;&#x4E00;</strong>&#xFF1A;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;&#x91CC;&#x9762;&#x82E5;&#x6709;&#x56FE;&#x7247;&#xFF0C;&#x5219;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x57FA;&#x672C;&#x4E0A;&#x90FD;&#x8981;&#x6BD4;&#x56FE;&#x7247;&#x7684;&#x9AD8;&#x5EA6;&#x9AD8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box&quot;&gt;
    &lt;img src=&quot;mm1.jpg&quot;&gt;
&lt;/div&gt;

.box {
    border: 1px solid #ccc;
}
.box &gt; img {
    height: 96px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">box</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;<span class="hljs-selector-tag">mm1</span><span class="hljs-selector-class">.jpg</span>&quot;&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">96px</span>;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeV3T?w=1276&amp;h=312" src="https://static.alili.tech/img/bVbeV3T?w=1276&amp;h=312" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x539F;&#x56E0;&#xFF1A;&#x95F4;&#x9699;&#x4EA7;&#x751F;&#x7684;&#x4E09;&#x5927;&#x5143;&#x51F6;&#x5C31;&#x662F;&#x201C;&#x5E7D;&#x7075;&#x7A7A;&#x767D;&#x8282;&#x70B9;&#x201D;&#x3001;<code>line-height</code>&#x548C;<code>vertical-align</code>&#x5C5E;&#x6027;&#xFF1B;&#x56FE;&#x7247;&#x524D;&#x653E;&#x7F6E;&#x5C0F;&#x5199;&#x7684;x&#xFF0C;&#x4F1A;&#x53D1;&#x73B0;&#x56FE;&#x7247;&#x7684;&#x57FA;&#x7EBF;&#x662F;&#x5143;&#x7D20;&#x5E95;&#x90E8;&#xFF0C;&#x4E0E;&#x201C;&#x5E7D;&#x7075;&#x7A7A;&#x767D;&#x8282;&#x70B9;&#x201D;&#x7684;&#x57FA;&#x7EBF;&#xFF08;&#x5C0F;&#x5199;x&#x4E0B;&#x8FB9;&#x7F18;&#xFF09;&#x5BF9;&#x9F50;&#xFF1B;</p><p><a href="http://demo.cssworld.cn/5/3-5.php" rel="nofollow noreferrer" target="_blank">&#x89E3;&#x51B3;&#x65B9;&#x6CD5;</a>&#xFF1A;</p><ol><li>&#x56FE;&#x7247;&#x5757;&#x72B6;&#x5316;&#xFF1A;&#x53EF;&#x4EE5;&#x4E00;&#x53E3;&#x6C14;&#x5E72;&#x6389;&#x201C;&#x5E7D;&#x7075;&#x7A7A;&#x767D;&#x8282;&#x70B9;&#x201D;&#x3001;<code>line-height</code>&#x548C;<code>vertical-align</code></li><li><code>line-height:0;</code></li><li><code>font-size: 0;</code></li><li>&#x5E72;&#x6389;&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;&#xFF1A;<code>vertical-align</code>&#x7684;&#x503C;&#x4E3A;<code>top&#x3001;middle&#x3001;bottom</code>&#x4E2D;&#x7684;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x7684;</li></ol><p>&#xFF08;2&#xFF09;<strong>&#x6848;&#x4F8B;&#x4E8C;</strong>&#xFF1A;&#x4F7F;&#x7528;<code>text-align: justify;</code>&#x5B9E;&#x73B0;<strong>&#x6587;&#x5B57;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;</strong></p><p><code>text-align: justify;</code>&#x591A;&#x7528;&#x4E8E;&#x6587;&#x5B57;&#x6392;&#x7248;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x7279;&#x6027;&#xFF1A;<strong>&#x4E0D;&#x4F1A;&#x5BF9;&#x6700;&#x540E;&#x4E00;&#x884C;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;</strong>&#xFF0C;&#x56E0;&#x6B64;&#x5355;&#x884C;&#x6587;&#x672C;&#x65F6;&#x82E5;&#x8981;&#x5BF9;&#x9F50;&#x9700;&#x8981;&#x4EBA;&#x4E3A;&#x6362;&#x884C;</p><p>&#x8865;&#x5145;<code>text-align: justify;</code>&#x7684;&#x7528;&#x6CD5;&#x6848;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;form&quot;&gt;
    &lt;label for=&quot;name&quot;&gt;&#x59D3;&#x540D;&lt;/label&gt;&lt;input id=&quot;name&quot; type=&quot;text&quot;&gt;&lt;br&gt;
    &lt;label for=&quot;tel&quot;&gt;&#x8054;&#x7CFB;&#x65B9;&#x5F0F;&lt;/label&gt;&lt;input id=&quot;tel&quot; type=&quot;text&quot;&gt;
&lt;/div&gt;

$font-size: 14px;
$line-height: 1.5;

.form {
    background-color: #eee;
    width: $font-size * 5 + 150px;
}
label {
    display: inline-block;
    text-align: justify;
    width: $font-size * 5;
    height: $font-size * $line-height;
    overflow: hidden;
    vertical-align: bottom;
    margin-right: 10px;
}
label:after {
    content: &apos;&apos;;
    width: 100%;
    display: inline-block;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="scss hljs"><code class="scss">&lt;<span class="hljs-selector-tag">div</span> class=&quot;<span class="hljs-selector-tag">form</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">label</span> for=&quot;name&quot;&gt;&#x59D3;&#x540D;&lt;/<span class="hljs-selector-tag">label</span>&gt;&lt;<span class="hljs-selector-tag">input</span> id=&quot;name&quot; type=&quot;text&quot;&gt;&lt;<span class="hljs-selector-tag">br</span>&gt;
    &lt;<span class="hljs-selector-tag">label</span> for=&quot;tel&quot;&gt;&#x8054;&#x7CFB;&#x65B9;&#x5F0F;&lt;/<span class="hljs-selector-tag">label</span>&gt;&lt;<span class="hljs-selector-tag">input</span> id=&quot;tel&quot; type=&quot;text&quot;&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-variable">$font-size</span>: <span class="hljs-number">14px</span>;
<span class="hljs-variable">$line-height</span>: <span class="hljs-number">1.5</span>;

<span class="hljs-selector-class">.form</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-variable">$font-size</span> * <span class="hljs-number">5</span> + <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-tag">label</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">text-align</span>: justify;
    <span class="hljs-attribute">width</span>: <span class="hljs-variable">$font-size</span> * <span class="hljs-number">5</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-variable">$font-size</span> * <span class="hljs-variable">$line-height</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">vertical-align</span>: bottom;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">label</span>:after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeV30?w=732&amp;h=178" src="https://static.alili.tech/img/bVbeV30?w=732&amp;h=178" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#xFF08;3&#xFF09;<strong>&#x6848;&#x4F8B;&#x4E09;</strong>&#xFF1A;&#x4F7F;&#x7528;<code>text-align: justify;</code>&#x5B9E;&#x73B0;<strong><a href="http://demo.cssworld.cn/5/3-6.php" rel="nofollow noreferrer" target="_blank">&#x5217;&#x8868;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;</a></strong></p><p>&#x4E3A;&#x4E86;&#x8BA9;&#x6700;&#x540E;&#x4E00;&#x884C;&#x4E5F;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5360;&#x4F4D;&#x5143;&#x7D20;&#x5B9E;&#x73B0;&#x6362;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box&quot;&gt;
    &lt;img src=&quot;1.jpg&quot; width=&quot;96&quot;&gt;
    &lt;img src=&quot;1.jpg&quot; width=&quot;96&quot;&gt;
    &lt;img src=&quot;1.jpg&quot; width=&quot;96&quot;&gt;
    &lt;img src=&quot;1.jpg&quot; width=&quot;96&quot;&gt;
    &lt;i class=&quot;justify-fix&quot;&gt;&lt;/i&gt;
    &lt;i class=&quot;justify-fix&quot;&gt;&lt;/i&gt;
    &lt;i class=&quot;justify-fix&quot;&gt;&lt;/i&gt;
&lt;/div&gt;

.box {
    text-align: justify;
}
.justify-fix {
    display: inline-block;
    width: 96px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">box</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;1<span class="hljs-selector-class">.jpg</span>&quot; <span class="hljs-selector-tag">width</span>=&quot;96&quot;&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;1<span class="hljs-selector-class">.jpg</span>&quot; <span class="hljs-selector-tag">width</span>=&quot;96&quot;&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;1<span class="hljs-selector-class">.jpg</span>&quot; <span class="hljs-selector-tag">width</span>=&quot;96&quot;&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;1<span class="hljs-selector-class">.jpg</span>&quot; <span class="hljs-selector-tag">width</span>=&quot;96&quot;&gt;
    &lt;<span class="hljs-selector-tag">i</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">justify-fix</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">i</span>&gt;
    &lt;<span class="hljs-selector-tag">i</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">justify-fix</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">i</span>&gt;
    &lt;<span class="hljs-selector-tag">i</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">justify-fix</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">i</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">text-align</span>: justify;
}
<span class="hljs-selector-class">.justify-fix</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">96px</span>;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeV39?w=756&amp;h=422" src="https://static.alili.tech/img/bVbeV39?w=756&amp;h=422" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x6B64;&#x65F6;&#xFF0C;<a href="http://demo.cssworld.cn/5/3-6.php" rel="nofollow noreferrer" target="_blank">&#x5143;&#x7D20;&#x5E95;&#x90E8;&#x6709;&#x5F88;&#x5927;&#x7684;&#x95F4;&#x9699;</a>&#x3002;&#x4EA7;&#x751F;&#x7684;&#x539F;&#x56E0;&#x65E0;&#x975E;&#x662F;vertical-align&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x4F1A;&#x8BBE;&#x7F6E;<code>line-height:0;</code>&#xFF0C;&#x4F46;&#x662F;&#x5E76;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;</p><blockquote><strong>&#x4E00;&#x4E2A; inline-block &#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;<code>overflow</code>&#x4E0D;&#x662F;<code>visible</code>&#xFF0C;&#x5219;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x5C31;&#x662F;&#x5176; margin &#x5E95;&#x8FB9;&#x7F18;;&#x5426;&#x5219;&#x5176;&#x57FA;&#x7EBF;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x91CC;&#x9762;&#x6700;&#x540E;&#x4E00;&#x884C;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x3002;</strong></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;dib-baseline&quot;&gt;&lt;/span&gt;
&lt;span class=&quot;dib-baseline&quot;&gt;x-baseline&lt;/span&gt;


.dib-baseline {
    display: inline-block;
    width: 150px; height: 150px;
    border: 1px solid #cad5eb;
    background-color: #f0f3f9;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">span</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">dib-baseline</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">span</span>&gt;
&lt;<span class="hljs-selector-tag">span</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">dib-baseline</span>&quot;&gt;<span class="hljs-selector-tag">x-baseline</span>&lt;/<span class="hljs-selector-tag">span</span>&gt;


<span class="hljs-selector-class">.dib-baseline</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#cad5eb</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f3f9</span>;
}</code></pre><p>&#x5B9E;&#x9645;&#x5C55;&#x793A;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeV4e?w=606&amp;h=392" src="https://static.alili.tech/img/bVbeV4e?w=606&amp;h=392" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x7EC8;&#x89E3;&#x51B3;&#xFF1A;</p><ol><li>font-size: 0;</li><li>line-height: 0; &#x4E14;&#x5728;&#x5360;&#x4F4D;&#x5143;&#x7D20;&#x4E2D;&#x6DFB;&#x52A0;&#x7A7A;&#x683C;<code>&lt;i class=&quot;justify-fix&quot;&gt;&amp;nbsp;&lt;/i&gt;</code></li></ol><h2 id="articleHeader9">&#x56DB;&#x3001;&#x6269;&#x5C55;&#x6848;&#x4F8B;</h2><h3 id="articleHeader10">4.1 <a href="http://demo.cssworld.cn/5/3-7.php" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;20px&#x56FE;&#x6807;&#x5BF9;&#x9F50;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;</a></h3><blockquote><strong>&#x4E00;&#x4E2A; inline-block &#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005; overflow &#x4E0D;&#x662F; visible&#xFF0C; &#x5219;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x5C31;&#x662F;&#x5176; margin &#x5E95;&#x8FB9;&#x7F18;;&#x5426;&#x5219;&#x5176;&#x57FA;&#x7EBF;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x91CC;&#x9762;&#x6700;&#x540E;&#x4E00;&#x884C;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x3002;</strong></blockquote><p>&#x57FA;&#x4E8E;&#x4E0A;&#x9762;&#x7684;&#x7406;&#x8BBA;&#xFF0C;&#x6709;&#x4E0B;&#x9762;&#x51E0;&#x4E2A;&#x8981;&#x70B9;&#xFF1A;</p><ol><li>&#x56FE;&#x6807;&#x9AD8;&#x5EA6;&#x548C;&#x5F53;&#x524D;&#x884C;&#x9AD8;&#x90FD;&#x662F; 20px</li><li>&#x56FE;&#x6807;&#x6807;&#x7B7E;&#x91CC;&#x9762;&#x6C38;&#x8FDC;&#x6709;&#x5B57;&#x7B26;&#xFF0C;&#x53EF;&#x4EE5;&#x501F;&#x52A9;:before &#x6216;:after &#x4F2A;&#x5143;&#x7D20;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;&#x5B57;&#x7B26;&#x8F7B;&#x677E;&#x641E;&#x5B9A;</li><li>&#x56FE;&#x6807; CSS &#x4E0D;&#x4F7F;&#x7528; overflow:hidden &#x4FDD;&#x8BC1;&#x57FA;&#x7EBF;&#x4E3A;&#x91CC;&#x9762;&#x5B57;&#x7B26;&#x7684;&#x57FA;&#x7EBF;&#xFF0C;&#x4F46;&#x662F;&#x8981;&#x8BA9;&#x91CC;&#x9762;&#x6F5C;&#x5728;&#x7684;&#x5B57;&#x7B26;&#x4E0D;&#x53EF;&#x89C1;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon {
    display: inline-block;
    width: 20px; height: 20px;
    background: url(sprite.png) no-repeat center;
    white-space: nowrap;
    letter-spacing: -1em;
    text-indent: -999em;
}
.icon:before {
    content: &apos;\3000&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.icon</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(sprite.png) no-repeat center;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">letter-spacing</span>: -<span class="hljs-number">1em</span>;
    <span class="hljs-attribute">text-indent</span>: -<span class="hljs-number">999em</span>;
}
<span class="hljs-selector-class">.icon</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;\3000&apos;</span>;
}</code></pre><h3 id="articleHeader11">4.2 <a href="http://demo.cssworld.cn/5/3-10.php" rel="nofollow noreferrer" target="_blank">&#x65E0;&#x517C;&#x5BB9;&#x7684;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x5F39;&#x6846;</a></h3><p>&#x5229;&#x7528;&#x4E4B;&#x524D;&#x63D0;&#x5230;&#x7684;&#x7EDD;&#x5BF9;&#x5C45;&#x4E2D;&#x7684;&#x77E5;&#x8BC6;<code>vertical-align:middle; font-size:0;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;dialog&quot;&gt;&lt;/dialog&gt;
&lt;/div&gt;

.container {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.5);
    text-align: center;
    font-size: 0;
    white-space: nowrap;
    overflow: auto;
}
.container:after {
    content: &apos;&apos;;
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
.dialog {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    font-size: 14px;
    white-space: normal;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">container</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">dialog</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">dialog</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.5);
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">overflow</span>: auto;
}
<span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.dialog</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-attribute">text-align</span>: left;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">white-space</span>: normal;
}</code></pre><h2 id="articleHeader12">&#x4E94;&#x3001;&#x603B;&#x7ED3;</h2><ol><li>&#x5185;&#x8054;&#x5143;&#x7D20;&#x5404;&#x79CD;&#x7EBF; &amp; &#x884C;&#x9AD8;&#x8BA1;&#x7B97;&#x53CA;&#x5206;&#x914D;&#x89C4;&#x5219;&#xFF1B;</li><li>&#x5229;&#x7528;line-height&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x591A;&#x6587;&#x672C;&#x5C45;&#x4E2D; &amp; line-height &#x5404;&#x5C5E;&#x6027;&#x503C;&#x533A;&#x522B;</li><li>vertical-align&#x53D6;&#x503C;&#x5BF9;&#x5782;&#x76F4;&#x5BF9;&#x9F50;&#x7684;&#x5F71;&#x54CD;&#x53CA;&#x89E3;&#x51B3;&#x65B9;&#x5F0F;</li><li>justify &#x5B9E;&#x73B0;&#x6587;&#x5B57;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;&#x548C;&#x5217;&#x8868;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;</li></ol><p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015777141">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E8C;&#xFF1A;&#x76D2;&#x6A21;&#x578B;&#x56DB;&#x5927;&#x5BB6;&#x65CF;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015940907" target="_blank">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x56DB;&#xFF1A;&#x6D41;&#x7684;&#x4FDD;&#x62A4;&#x4E0E;&#x7834;&#x574F;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《CSS世界》笔记三：内联元素与对齐

## 原文链接
[https://segmentfault.com/a/1190000015913922](https://segmentfault.com/a/1190000015913922)


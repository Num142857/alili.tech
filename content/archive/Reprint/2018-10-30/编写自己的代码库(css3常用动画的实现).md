---
title: 编写自己的代码库(css3常用动画的实现)
hidden: true
categories: [reprint]
slug: '520099e8'
date: 2018-10-30 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x5728;&#x6708;&#x521D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53D1;&#x4E86;<a href="https://segmentfault.com/a/1190000010427231">CSS3&#x70ED;&#x8EAB;&#x5B9E;&#x6218;--&#x8FC7;&#x6E21;&#x4E0E;&#x52A8;&#x753B;&#xFF08;&#x5B9E;&#x73B0;&#x70AB;&#x9177;&#x4E0B;&#x62C9;&#xFF0C;&#x624B;&#x98CE;&#x7434;&#xFF0C;&#x65E0;&#x7F1D;&#x6EDA;&#x52A8;&#xFF09;</a>&#x3002;js&#x7684;&#x4EE3;&#x7801;&#x5E93;&#x4E5F;&#x53D1;&#x8FC7;&#x4E24;&#x6B21;&#xFF0C;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;&#x3002;&#x4E4B;&#x524D;&#x4E5F;&#x5199;&#x4E86;css3&#x7684;&#x70ED;&#x8EAB;&#x5B9E;&#x6218;&#xFF0C;&#x65E2;&#x7136;&#x70ED;&#x8EAB;&#x5B8C;&#x4E86;&#xFF0C;&#x662F;&#x65F6;&#x5019;&#x5F00;&#x59CB;&#x5C01;&#x88C5;css3&#x7684;&#x4EE3;&#x7801;&#x5E93;&#x4E86;&#xFF0C;&#x76F8;&#x6BD4;&#x8D77;js&#x7684;&#x4EE3;&#x7801;&#x5E93;&#xFF0C;css3&#x7684;&#x4EE3;&#x7801;&#x5E93;&#x7684;&#x903B;&#x8F91;&#x6027;&#x5C31;&#x66F4;&#x52A0;&#x7B80;&#x5355;&#x4E86;&#xFF01;&#x53EF;&#x4EE5;&#x8BF4;&#x53EA;&#x8981;&#x6253;&#x4E0A;&#x6CE8;&#x91CA;&#x548C;&#x4E00;&#x5F20;&#x6548;&#x679C;&#x56FE;&#x5C31;&#x53EF;&#x4EE5;&#x8BA9;&#x5927;&#x5BB6;&#x660E;&#x767D;&#x4E86;&#x5176;&#x4E2D;&#x7684;&#x539F;&#x7406;&#x4E86;&#xFF01;<br>&#x6211;&#x5199;&#x4EE3;&#x7801;&#x5E93;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x52A8;&#x753B;&#x6548;&#x679C;&#x4E3B;&#x8981;&#x662F;&#x53C2;&#x8003;&#x4E86;&#x4E09;&#x4E2A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#xFF0C;<a href="http://nec.netease.com/library/category/#animation" rel="nofollow noreferrer" target="_blank">nec</a>&#xFF0C;<a href="https://ianlunn.github.io/Hover/" rel="nofollow noreferrer" target="_blank">hover.css</a>&#xFF0C;<a href="https://daneden.github.io/animate.css/" rel="nofollow noreferrer" target="_blank">animate.css</a>&#x8FD9;&#x4E09;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x8D28;&#x91CF;&#x975E;&#x5E38;&#x7684;&#x9AD8;&#xFF0C;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x53BB;&#x4E86;&#x89E3;&#x3002;<br>&#x6E90;&#x7801;&#x5DF2;&#x7ECF;&#x653E;&#x5230;github&#x4E0A;&#x9762;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#xFF0C;&#x4E5F;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;star&#x4E00;&#x4E0B;&#xFF01;<a href="https://github.com/chenhuiYj/ec-css" rel="nofollow noreferrer" target="_blank">ec-css</a>&#x3002;</p><blockquote>&#x6211;&#x6307;&#x51FA;&#x8FD9;&#x4E09;&#x4E2A;&#x5E93;&#x5E76;&#x4E0D;&#x662F;&#x53EB;&#x5927;&#x5BB6;&#x53BB;&#x62FF;&#x522B;&#x4EBA;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7A0D;&#x5FAE;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x62F7;&#x8D1D;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E0A;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x8BF4;&#x662F;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x3002;&#x6211;&#x662F;&#x8BA9;&#x5927;&#x5BB6;&#x53BB;&#x770B;&#x522B;&#x4EBA;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5B66;&#x4E60;&#x522B;&#x4EBA;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x6216;&#x8005;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7528;&#x81EA;&#x5DF1;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#xFF0C;&#x5F53;&#x7136;&#x5982;&#x679C;&#x628A;&#x522B;&#x4EBA;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x589E;&#x5220;&#x6539;&#x67E5;&#x5230;&#x9762;&#x76EE;&#x5168;&#x975E;&#x7684;&#x5730;&#x6B65;&#xFF0C;&#x8FD9;&#x4E2A;&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E86;&#xFF01;&#x5F3A;&#x8C03;&#x4E00;&#x70B9;&#xFF0C;&#x4E0D;&#x8981;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x522B;&#x4EBA;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x653E;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E0A;&#xFF0C;&#x7136;&#x540E;&#x8BF4;&#x662F;&#x81EA;&#x5DF1;&#x5F00;&#x53D1;&#x7684;&#xFF0C;&#x8FD9;&#x662F;&#x4E0D;&#x5C0A;&#x91CD;&#x522B;&#x4EBA;&#x7684;&#x6210;&#x679C;&#xFF0C;&#x5BF9;&#x81EA;&#x5DF1;&#x7684;&#x6280;&#x672F;&#x6C34;&#x5E73;&#x63D0;&#x5347;&#x7684;&#x5E2E;&#x52A9;&#x4E5F;&#x8F83;&#x5C11;&#x3002;&#x6211;&#x5199;&#x6587;&#x7AE0;&#xFF0C;&#x867D;&#x7136;&#x4E5F;&#x4F1A;&#x7ED9;&#x51FA;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x7684;&#x76EE;&#x7684;&#x662F;&#x63D0;&#x4F9B;&#x5927;&#x5BB6;&#x53C2;&#x8003;&#x7684;&#xFF0C;&#x5E0C;&#x671B;&#x7ED9;&#x8BA9;&#x5927;&#x5BB6;&#x5B66;&#x4E60;&#x5230;&#x77E5;&#x8BC6;&#x6216;&#x8005;&#x53D1;&#x6563;&#x601D;&#x7EF4;&#xFF0C;&#x5199;&#x51FA;&#x66F4;&#x597D;&#x7684;&#x4F5C;&#x54C1;&#x3002;&#x4E4B;&#x524D;&#x4E5F;&#x8BF4;&#x8FC7;&#xFF0C;<strong><code>&#x6211;&#x5199;&#x6587;&#x7AE0;&#x7684;&#x76EE;&#x7684;&#x662F;&#x6388;&#x4EBA;&#x4EE5;&#x6E14;&#xFF0C;&#x4E0D;&#x662F;&#x6388;&#x4EBA;&#x4EE5;&#x9C7C;</code></strong>&#x3002;</blockquote><h2 id="articleHeader1">&#x58F0;&#x660E;</h2><p>1.&#x4E0B;&#x9762;&#x5C06;&#x4F1A;&#x770B;&#x5230;&#x5F88;&#x591A;&#x4E2A;<span class="img-wrap"><img data-src="/img/bVSnzd?w=107&amp;h=45" src="https://static.alili.tech/img/bVSnzd?w=107&amp;h=45" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span>&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x4E3E;&#x884C;&#xFF0C;&#x90FD;&#x662F;span&#x6807;&#x7B7E;&#xFF0C;&#x6837;&#x5F0F;&#x90FD;&#x662F;&#x7ED9;&#x51FA;&#x7684;css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="span{
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: inline-block;
        color: #333;
        background: #ccc;
        min-width: 80px;
        padding: 0 10px;
        margin: 10px;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">span</span>{
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">min-width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    }</code></pre><p>2.&#x5173;&#x4E8E;class&#x547D;&#x540D;&#x65B9;&#x5F0F;&#xFF0C;l&#x4EE3;&#x8868;left&#xFF0C;r&#x4EE3;&#x8868;right&#xFF0C;t&#x4EE3;&#x8868;top&#xFF0C;b&#x4EE3;&#x8868;bottom&#xFF0C;c&#x4EE3;&#x8868;center&#xFF0C;m&#x4EE3;&#x8868;middle&#x3002;&#x5207;&#x8BB0;</p><blockquote>&#x6587;&#x7AE0;&#x6BD4;&#x8F83;&#x957F;&#xFF0C;&#x4F46;&#x662F;&#x8BF4;&#x5F97;&#x5C31;&#x662F;&#x4E24;&#x70B9;&#xFF0C;&#x5927;&#x5BB6;&#x770B;&#x5F97;&#x4E5F;&#x5E94;&#x8BE5;&#x4F1A;&#x5F88;&#x5FEB;<br>1.&#x5199;&#x51FA;&#x4E00;&#x4E9B;hover&#x52A8;&#x753B;&#x548C;&#x9884;&#x8BBE;&#x52A8;&#x753B;&#x7684;&#x8FD0;&#x884C;&#x6548;&#x679C;&#xFF0C;&#x5E76;&#x4E14;&#x8D34;&#x51FA;&#x4EE3;&#x7801;<br>2.&#x53D1;&#x73B0;&#x51E0;&#x4E2A;&#x52A8;&#x753B;&#x7EC4;&#x5408;&#xFF0C;&#x548C;&#x52A0;&#x4E0A;&#x65E0;&#x9650;&#x52A8;&#x753B;&#xFF0C;&#x53CD;&#x5411;&#x52A8;&#x753B;&#xFF0C;&#x4F1A;&#x6709;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5E76;&#x4E14;&#x7EE7;&#x7EED;&#x7814;&#x7A76;&#xFF0C;&#x770B;&#x4E0B;&#x80FD;&#x4E0D;&#x80FD;&#x7814;&#x7A76;&#x51FA;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x4E1C;&#x897F;&#xFF01;</blockquote><h2 id="articleHeader2">2.hover&#x52A8;&#x753B;</h2><p>&#x8BF4;&#x4E86;&#x90A3;&#x4E48;&#x591A;&#xFF0C;&#x662F;&#x65F6;&#x5019;&#x8FDB;&#x5165;&#x6B63;&#x6587;&#x4E86;&#xFF0C;</p><p>&#x9996;&#x5148;&#x662F;hover&#x52A8;&#x753B;&#xFF0C;&#x5173;&#x4E8E;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x6211;&#x89E3;&#x91CA;&#x4E0B;&#xFF0C;&#x5C31;&#x662F;&#x9F20;&#x6807;&#x79FB;&#x4E0A;&#x53BB;&#x89E6;&#x53D1;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x5C31;&#x662F;&#x89E6;&#x53D1;&#x4E86;&#x9F20;&#x6807;&#x7684;hover&#x4E8B;&#x4EF6;&#x65F6;&#x80FD;&#x770B;&#x5230;&#x7684;&#x52A8;&#x753B;&#xFF01;&#x4E0B;&#x9762;&#xFF0C;&#x6309;&#x7167;&#x7C7B;&#x578B;&#xFF0C;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x7684;&#x5199;&#xFF01;</p><h3 id="articleHeader3">2-1.&#x7B80;&#x5355;&#x52A8;&#x753B;</h3><h4>2-1-1&#x5927;&#x5C0F;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSnFG?w=307&amp;h=114" src="https://static.alili.tech/img/bVSnFG?w=307&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-big&quot;&gt;big&lt;/span&gt;
&lt;span class=&quot;ech-small&quot;&gt;small&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-big&quot;</span>&gt;</span>big<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-small&quot;</span>&gt;</span>small<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-big,.ech-small {
    transition: all .4s;
}
.ech-big:hover{
    transform: scale(1.2);
}
.ech-small:hover{
    transform: scale(.9);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-big</span>,<span class="hljs-selector-class">.ech-small</span> {
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-big</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.2);
}
<span class="hljs-selector-class">.ech-small</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(.9);
}
</code></pre><h4>2-1-2&#x5F62;&#x72B6;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSnHb?w=941&amp;h=132" src="https://static.alili.tech/img/bVSnHb?w=941&amp;h=132" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-skew-l&quot;&gt;skew-l&lt;/span&gt;
&lt;span class=&quot;ech-skew-r&quot;&gt;skew-r&lt;/span&gt;
&lt;span class=&quot;ech-skew-l-t&quot;&gt;skew-l-t&lt;/span&gt;
&lt;span class=&quot;ech-skew-r-t&quot;&gt;skew-r-t&lt;/span&gt;
&lt;span class=&quot;ech-skew-l-b&quot;&gt;skew-l-b&lt;/span&gt;
&lt;span class=&quot;ech-skew-r-b&quot;&gt;skew-r-b&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-skew-l&quot;</span>&gt;</span>skew-l<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-skew-r&quot;</span>&gt;</span>skew-r<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-skew-l-t&quot;</span>&gt;</span>skew-l-t<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-skew-r-t&quot;</span>&gt;</span>skew-r-t<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-skew-l-b&quot;</span>&gt;</span>skew-l-b<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-skew-r-b&quot;</span>&gt;</span>skew-r-b<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-skew-l, .ech-skew-r, .ech-skew-l-t, .ech-skew-r-b, .ech-skew-l-b, .ech-skew-r-t{
    transition: all .4s;
}
.ech-skew-r-t, .ech-skew-l-t {
    transform-origin: 0 100%;
}
.ech-skew-r-b, .ech-skew-l-b {
    transform-origin: 100% 0;
}
.ech-skew-l:hover {
    transform: skew(-15deg);
}
.ech-skew-r:hover {
    transform: skew(15deg);
}
.ech-skew-l-t:hover {
    transform: skew(-15deg);
}
.ech-skew-r-t:hover {
    transform: skew(15deg);
}
.ech-skew-l-b:hover {
    transform: skew(15deg);
}
.ech-skew-r-b:hover {
    transform: skew(-15deg);
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-skew-l</span>, <span class="hljs-selector-class">.ech-skew-r</span>, <span class="hljs-selector-class">.ech-skew-l-t</span>, <span class="hljs-selector-class">.ech-skew-r-b</span>, <span class="hljs-selector-class">.ech-skew-l-b</span>, <span class="hljs-selector-class">.ech-skew-r-t</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-skew-r-t</span>, <span class="hljs-selector-class">.ech-skew-l-t</span> {
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.ech-skew-r-b</span>, <span class="hljs-selector-class">.ech-skew-l-b</span> {
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.ech-skew-l</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-15deg);
}
<span class="hljs-selector-class">.ech-skew-r</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(15deg);
}
<span class="hljs-selector-class">.ech-skew-l-t</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-15deg);
}
<span class="hljs-selector-class">.ech-skew-r-t</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(15deg);
}
<span class="hljs-selector-class">.ech-skew-l-b</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(15deg);
}
<span class="hljs-selector-class">.ech-skew-r-b</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-15deg);
}

</code></pre><h4>2-1-3&#x65CB;&#x8F6C;&#x89D2;&#x5EA6;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSnIG?w=1285&amp;h=145" src="https://static.alili.tech/img/bVSnIG?w=1285&amp;h=145" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-grow-rotate-l&quot;&gt;grow-rotate-l&lt;/span&gt;
&lt;span class=&quot;ech-grow-rotate-r&quot;&gt;grow-rotate-r&lt;/span&gt;
&lt;span class=&quot;ech-rotate5&quot;&gt;rotate5&lt;/span&gt;
&lt;span class=&quot;ech-rotate15&quot;&gt;rotate15&lt;/span&gt;
&lt;span class=&quot;ech-rotate30&quot;&gt;rotate30&lt;/span&gt;
&lt;span class=&quot;ech-rotate60&quot;&gt;rotate60&lt;/span&gt;
&lt;span class=&quot;ech-rotate90&quot;&gt;rotate90&lt;/span&gt;
&lt;span class=&quot;ech-rotate180&quot;&gt;rotate180&lt;/span&gt;
&lt;span class=&quot;ech-rotate360&quot;&gt;rotate360&lt;/span&gt;
&lt;span class=&quot;ech-rotate-5&quot;&gt;rotate-5&lt;/span&gt;
&lt;span class=&quot;ech-rotate-15&quot;&gt;rotate-15&lt;/span&gt;
&lt;span class=&quot;ech-rotate-30&quot;&gt;rotate-30&lt;/span&gt;
&lt;span class=&quot;ech-rotate-60&quot;&gt;rotate-60&lt;/span&gt;
&lt;span class=&quot;ech-rotate-90&quot;&gt;rotate-90&lt;/span&gt;
&lt;span class=&quot;ech-rotate-180&quot;&gt;rotate-180&lt;/span&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-grow-rotate-l&quot;</span>&gt;</span>grow-rotate-l<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-grow-rotate-r&quot;</span>&gt;</span>grow-rotate-r<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate5&quot;</span>&gt;</span>rotate5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate15&quot;</span>&gt;</span>rotate15<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate30&quot;</span>&gt;</span>rotate30<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate60&quot;</span>&gt;</span>rotate60<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate90&quot;</span>&gt;</span>rotate90<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate180&quot;</span>&gt;</span>rotate180<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate360&quot;</span>&gt;</span>rotate360<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate-5&quot;</span>&gt;</span>rotate-5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate-15&quot;</span>&gt;</span>rotate-15<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate-30&quot;</span>&gt;</span>rotate-30<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate-60&quot;</span>&gt;</span>rotate-60<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate-90&quot;</span>&gt;</span>rotate-90<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rotate-180&quot;</span>&gt;</span>rotate-180<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-grow-rotate-l,.ech-grow-rotate-r, .ech-rotate5, .ech-rotate15, .ech-rotate30, .ech-rotate60, .ech-rotate90, .ech-rotate180, .ech-rotate360, .ech-rotate-5,.ech-rotate-15, .ech-rotate-30, .ech-rotate-60, .ech-rotate-90, .ech-rotate-180{
transition: all .4s;
}
.ech-grow-rotate-l:hover {
    transform: scale(1.1) rotate(4deg);
}
.ech-grow-rotate-r:hover {
    transform: scale(1.1) rotate(-4deg);
}
.ech-rotate-5:hover {
    transform: rotate(-5deg);
}
.ech-rotate-15:hover {
    transform: rotate(-15deg);
}

.ech-rotate-30:hover {
    transform: rotate(-30deg);
}

.ech-rotate-60:hover {
    transform: rotate(-60deg);
}

.ech-rotate-90:hover {
    transform: rotate(-90deg);
}

.ech-rotate-180:hover {
    transform: rotate(-180deg);
}
.ech-rotate5:hover {
    transform: rotate(5deg);
}
.ech-rotate15:hover {
    transform: rotate(15deg);
}

.ech-rotate30:hover {
    transform: rotate(30deg);
}

.ech-rotate60:hover {
    transform: rotate(60deg);
}

.ech-rotate90:hover {
    transform: rotate(90deg);
}

.ech-rotate180:hover {
    transform: rotate(180deg);
}

.ech-rotate360:hover {
    transform: rotate(360deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-grow-rotate-l</span>,<span class="hljs-selector-class">.ech-grow-rotate-r</span>, <span class="hljs-selector-class">.ech-rotate5</span>, <span class="hljs-selector-class">.ech-rotate15</span>, <span class="hljs-selector-class">.ech-rotate30</span>, <span class="hljs-selector-class">.ech-rotate60</span>, <span class="hljs-selector-class">.ech-rotate90</span>, <span class="hljs-selector-class">.ech-rotate180</span>, <span class="hljs-selector-class">.ech-rotate360</span>, <span class="hljs-selector-class">.ech-rotate-5</span>,<span class="hljs-selector-class">.ech-rotate-15</span>, <span class="hljs-selector-class">.ech-rotate-30</span>, <span class="hljs-selector-class">.ech-rotate-60</span>, <span class="hljs-selector-class">.ech-rotate-90</span>, <span class="hljs-selector-class">.ech-rotate-180</span>{
<span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-grow-rotate-l</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1) <span class="hljs-built_in">rotate</span>(4deg);
}
<span class="hljs-selector-class">.ech-grow-rotate-r</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1) <span class="hljs-built_in">rotate</span>(-4deg);
}
<span class="hljs-selector-class">.ech-rotate-5</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
}
<span class="hljs-selector-class">.ech-rotate-15</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-15deg);
}

<span class="hljs-selector-class">.ech-rotate-30</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-30deg);
}

<span class="hljs-selector-class">.ech-rotate-60</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-60deg);
}

<span class="hljs-selector-class">.ech-rotate-90</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-90deg);
}

<span class="hljs-selector-class">.ech-rotate-180</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-180deg);
}
<span class="hljs-selector-class">.ech-rotate5</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
}
<span class="hljs-selector-class">.ech-rotate15</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
}

<span class="hljs-selector-class">.ech-rotate30</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(30deg);
}

<span class="hljs-selector-class">.ech-rotate60</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(60deg);
}

<span class="hljs-selector-class">.ech-rotate90</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg);
}

<span class="hljs-selector-class">.ech-rotate180</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
}

<span class="hljs-selector-class">.ech-rotate360</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
}</code></pre><h4>2-1-4&#x4F4D;&#x79FB;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSo0y?w=570&amp;h=111" src="https://static.alili.tech/img/bVSo0y?w=570&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-t&quot;&gt;up&lt;/span&gt;
&lt;span class=&quot;ech-b&quot;&gt;bottom&lt;/span&gt;
&lt;span class=&quot;ech-l&quot;&gt;left&lt;/span&gt;
&lt;span class=&quot;ech-r&quot;&gt;right&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">&quot;ech-t&quot;</span>&gt;up&lt;/span&gt;
&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">&quot;ech-b&quot;</span>&gt;<span class="hljs-attribute">bottom</span>&lt;/span&gt;
&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">&quot;ech-l&quot;</span>&gt;<span class="hljs-attribute">left</span>&lt;/span&gt;
&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">&quot;ech-r&quot;</span>&gt;<span class="hljs-attribute">right</span>&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-t,.ech-bottom,.ech-top,.ech-right{
    transition: all .4s;
}
.ech-t:hover {
    transform: translate3d(0, -10px, 0);
}
.ech-b:hover {
    transform: translate3d(0, 10px, 0);
}
.ech-l:hover {
    transform: translate3d(-10px, 0, 0);
}
.ech-r:hover {
    transform: translate3d(10px, 0, 0);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-t</span>,<span class="hljs-selector-class">.ech-bottom</span>,<span class="hljs-selector-class">.ech-top</span>,<span class="hljs-selector-class">.ech-right</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-t</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, -10px, 0);
}
<span class="hljs-selector-class">.ech-b</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 10px, 0);
}
<span class="hljs-selector-class">.ech-l</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-10px, 0, 0);
}
<span class="hljs-selector-class">.ech-r</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(10px, 0, 0);
}
</code></pre><h4>2-1-5&#x8FB9;&#x6846;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSo2M?w=570&amp;h=111" src="https://static.alili.tech/img/bVSo2M?w=570&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-border&quot;&gt;border&lt;/span&gt;
&lt;span class=&quot;ech-border-in&quot;&gt;border-in&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">&quot;ech-border&quot;</span>&gt;<span class="hljs-attribute">border</span>&lt;/span&gt;
&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">&quot;ech-border-in&quot;</span>&gt;<span class="hljs-attribute">border</span>-in&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-border,.ech-border-in{
    transition: all .4s;
}
.ech-border:hover {
    box-shadow: 0 0 0 4px #09f, 0 0 1px transparent;
}

.ech-border-in:hover {
    box-shadow: inset 0 0 0 4px #09f, 0 0 1px transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-border</span>,<span class="hljs-selector-class">.ech-border-in</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-border</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">#09f</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> transparent;
}

<span class="hljs-selector-class">.ech-border-in</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">#09f</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> transparent;
}</code></pre><h4>2-1-6&#x9634;&#x5F71;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSo3O?w=570&amp;h=111" src="https://static.alili.tech/img/bVSo3O?w=570&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>(gif&#x56FE;&#x770B;&#x5F97;&#x6548;&#x679C;&#x592A;&#x96BE;&#x770B;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x53BB;github&#x4E0B;&#x8F7D;&#x770B;)</p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-shadow&quot;&gt;shadow&lt;/span&gt;
&lt;span class=&quot;ech-shadow-in&quot;&gt;shadow-in&lt;/span&gt;
&lt;span class=&quot;ech-shadow-write&quot;&gt;shadow-write&lt;/span&gt;
&lt;span class=&quot;ech-shadow-big&quot;&gt;shadow-big&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-shadow&quot;</span>&gt;shadow&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-shadow-in&quot;</span>&gt;shadow-<span class="hljs-keyword">in</span>&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-shadow-write&quot;</span>&gt;shadow-write&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-shadow-big&quot;</span>&gt;shadow-big&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-shadow,.ech-shadow-in,.ech-shadow-write,.ech-shadow-big{
    transition: all .4s;
}
.ech-shadow:hover {
    box-shadow: 0 0 10px #333;
}   
.ech-shadow-in:hover {
    box-shadow: inset 0 0 10px #333;
}
.ech-shadow-write:hover {
    box-shadow: inset 0 0 20px #fff;
}
.ech-shadow-big:hover {
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-shadow</span>,<span class="hljs-selector-class">.ech-shadow-in</span>,<span class="hljs-selector-class">.ech-shadow-write</span>,<span class="hljs-selector-class">.ech-shadow-big</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-shadow</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#333</span>;
}   
<span class="hljs-selector-class">.ech-shadow-in</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-class">.ech-shadow-write</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.ech-shadow-big</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> -<span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1);
}</code></pre><h4>2-1-7&#x900F;&#x660E;&#x5EA6;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSo45?w=570&amp;h=111" src="https://static.alili.tech/img/bVSo45?w=570&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-fade-out&quot;&gt;fade-out&lt;/span&gt;
&lt;span class=&quot;ech-fade-in&quot;&gt;fade-in&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-out&quot;</span>&gt;fade-<span class="hljs-keyword">out</span>&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-in&quot;</span>&gt;fade-<span class="hljs-keyword">in</span>&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-fade-out,.ech-fade-in{
    transition: all .4s;
}
.ech-fade-out:hover {
    opacity: .6;
}

.ech-fade-in {
    opacity: .5;
}

.ech-fade-in:hover {
    opacity: 1;
}    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-fade-out</span>,<span class="hljs-selector-class">.ech-fade-in</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-fade-out</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">6</span>;
}

<span class="hljs-selector-class">.ech-fade-in</span> {
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.ech-fade-in</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}    </code></pre><h4>2-1-8&#x5706;&#x89D2;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSo5k?w=570&amp;h=111" src="https://static.alili.tech/img/bVSo5k?w=570&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-rectangle&quot;&gt;rectangle&lt;/span&gt;
&lt;span class=&quot;ech-radius&quot;&gt;radius&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-rectangle&quot;</span>&gt;</span>rectangle<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-radius&quot;</span>&gt;</span>radius<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-radius,.ech-rectangle{
    transition: all .4s;
}
.ech-radius {
    border-radius: 10px;
}

.ech-radius:hover {
    border-radius: 0;
}

.ech-rectangle:hover {
    border-radius: 10px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-radius</span>,<span class="hljs-selector-class">.ech-rectangle</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
}
<span class="hljs-selector-class">.ech-radius</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.ech-radius</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.ech-rectangle</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}
</code></pre><h3 id="articleHeader4">2-2.&#x989C;&#x8272;&#x52A8;&#x753B;&#x6548;&#x679C;</h3><p>&#x8FD9;&#x90E8;&#x5206;&#x7684;&#x52A8;&#x753B;&#x4E3B;&#x8981;&#x662F;&#x5229;&#x7528;:before&#x548C;:after&#x8FDB;&#x884C;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x5927;&#x5BB6;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5207;&#x8BB0;:before&#x548C;:after&#x6CA1;&#x6709;&#x88AB;&#x5360;&#x7528;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x663E;&#x793A;&#x4E0D;&#x6B63;&#x5E38;</p><h4>2-2-1.&#x989C;&#x8272;&#x5757;&#x53D8;&#x5316;</h4><p><span class="img-wrap"><img data-src="/img/bVSo6h?w=1166&amp;h=153" src="https://static.alili.tech/img/bVSo6h?w=1166&amp;h=153" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x56E0;&#x4E3A;&#x8FD9;&#x5757;&#x5185;&#x5BB9;&#x5F88;&#x50CF;&#xFF0C;&#x6211;&#x5C31;&#x4E00;&#x5927;&#x5757;&#x4E00;&#x8D77;&#x8BF4;&#xFF0C;&#x5927;&#x5BB6;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x8981;&#x7559;&#x795E;&#x6CE8;&#x610F;&#x3002;&#x770B;&#x4EE3;&#x7801;&#x770B;&#x4E0D;&#x660E;&#x767D;&#xFF0C;&#x76F4;&#x63A5;&#x5728;github&#x4E0B;&#x8F7D;&#xFF0C;&#x7136;&#x540E;&#x8FD0;&#x884C;&#x6587;&#x4EF6;&#xFF0C;&#x8FB9;&#x8C03;&#x8BD5;&#x8FB9;&#x770B;&#x6548;&#x679C;&#xFF01;&#x8FD9;&#x6837;&#x5927;&#x5BB6;&#x5C31;&#x5F88;&#x5BB9;&#x6613;&#x660E;&#x767D;&#x4E86;&#xFF01;</p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-fade&quot;&gt;fade&lt;/span&gt;
&lt;span class=&quot;ech-fade-t&quot;&gt;fade-t&lt;/span&gt;
&lt;span class=&quot;ech-fade-b&quot;&gt;fade-b&lt;/span&gt;
&lt;span class=&quot;ech-fade-l&quot;&gt;fade-l&lt;/span&gt;
&lt;span class=&quot;ech-fade-r&quot;&gt;fade-r&lt;/span&gt;
&lt;span class=&quot;ech-bounce-t&quot;&gt;bounce-t&lt;/span&gt;
&lt;span class=&quot;ech-bounce-b&quot;&gt;bounce-b&lt;/span&gt;
&lt;span class=&quot;ech-bounce-l&quot;&gt;bounce-l&lt;/span&gt;
&lt;span class=&quot;ech-bounce-r&quot;&gt;bounce-r&lt;/span&gt;
&lt;span class=&quot;ech-fade-c-out&quot;&gt;fade-c-out&lt;/span&gt;
&lt;span class=&quot;ech-fade-c-in&quot;&gt;fade-c-in&lt;/span&gt;
&lt;span class=&quot;ech-fade-m-out&quot;&gt;fade-m-out&lt;/span&gt;
&lt;span class=&quot;ech-fade-m-in&quot;&gt;fade-m-in&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade&quot;</span>&gt;fade&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-t&quot;</span>&gt;fade-t&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-b&quot;</span>&gt;fade-b&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-l&quot;</span>&gt;fade-l&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-r&quot;</span>&gt;fade-r&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-bounce-t&quot;</span>&gt;bounce-t&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-bounce-b&quot;</span>&gt;bounce-b&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-bounce-l&quot;</span>&gt;bounce-l&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-bounce-r&quot;</span>&gt;bounce-r&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-c-out&quot;</span>&gt;fade-c-<span class="hljs-keyword">out</span>&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-c-in&quot;</span>&gt;fade-c-<span class="hljs-keyword">in</span>&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-m-out&quot;</span>&gt;fade-m-<span class="hljs-keyword">out</span>&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-fade-m-in&quot;</span>&gt;fade-m-<span class="hljs-keyword">in</span>&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;*/
.ech-fade, .ech-fade-t, .ech-fade-b, .ech-fade-l, .ech-fade-r, .ech-fade-c-in, .ech-fade-m-in, .ech-fade-m-out, .ech-fade-c-out, .ech-bounce-t, .ech-bounce-b, .ech-bounce-r, .ech-bounce-l {
    position: relative;
    transition: all .3s;
    z-index: 1;
}
/*&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;:before&#x548C;:after&#x8BBE;&#x7F6E;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;*/
.ech-fade:before, .ech-fade-t:before, .ech-fade-b:before, .ech-fade-l:before, .ech-fade-r:before, .ech-fade-c-in:before, .ech-fade-m-in:before, .ech-fade-m-out:before, .ech-fade-c-in:after, .ech-fade-m-in:after, .ech-fade-c-out:before {
    position: absolute;
    transition: all .3s;
    content: &quot;&quot;;
    display: block;
    background: #09f;
    z-index: -1;
    width: 100%;
    height: 100%;
}
/*&#x5F39;&#x8DF3;&#x5143;&#x7D20;:before&#x548C;:after&#x8BBE;&#x7F6E;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x548C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;*/
.ech-bounce-t:before, .ech-bounce-b:before, .ech-bounce-r:before, .ech-bounce-l:before {
    transition: all .3s;
    transition-timing-function: cubic-bezier(0.52, 1.7, 0.5, 0.4);
    position: absolute;
    content: &quot;&quot;;
    display: block;
    background: #09f;
    z-index: -1;
    width: 100%;
    height: 100%;
}

/*&#x80CC;&#x666F;&#x989C;&#x8272;&#x548C;&#x6587;&#x5B57;&#x53D8;&#x5316;*/
.ech-fade:before {
    top: 0;
    left: 0;
    transform: scaleX(1);
    opacity: 0;
}

.ech-fade:hover:before {
    opacity: 1;
}

/*&#x989C;&#x8272;&#x4ECE;&#x5DE6;&#x81F3;&#x53F3;&#x53D8;&#x5316;*/
.ech-fade-l:before, .ech-bounce-l:before {
    top: 0;
    right: 0;
    transform-origin: 0 50%;
    transform: scaleX(0);
}
/*&#x989C;&#x8272;&#x4ECE;&#x53F3;&#x81F3;&#x5DE6;&#x53D8;&#x5316;*/
.ech-fade-r:before, .ech-bounce-r:before {
    top: 0;
    left: 0;
    transform-origin: 100% 50%;
    transform: scaleX(0);
}

/*&#x989C;&#x8272;&#x4ECE;&#x4E0A;&#x5F80;&#x4E0B;&#x53D8;&#x5316;*/
.ech-fade-t:before, .ech-bounce-t:before {
    bottom: 0;
    left: 0;
    transform-origin: 50% 0;
    transform: scaleY(0);
}
/*&#x989C;&#x8272;&#x4ECE;&#x4E0B;&#x5F80;&#x4E0A;&#x53D8;&#x5316;*/
.ech-fade-b:before, .ech-bounce-b:before {
    top: 0;
    left: 0;
    transform-origin: 50% 100%;
    transform: scaleY(0);
}

/*&#x989C;&#x8272;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x51FA;&#x53BB;*/
.ech-fade-m-out:before {
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transform: scaleY(0);
}

/*&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x51FA;&#x53BB;*/
.ech-fade-c-out:before {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transform: scaleX(0);
}

.ech-fade-c-out:hover:before {
    transform: scaleX(1);
}

/*&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x8FDB;&#x6765;*/
.ech-fade-c-in:before {
    top: 0;
    left: 0;
    transform-origin: 0 50%;
    transform: scaleX(0);
}

.ech-fade-c-in:after {
    top: 0;
    right: 0;
    transform-origin: 100% 50%;
    transform: scaleX(0);
}

/*&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x8FDB;&#x6765;*/
.ech-fade-m-in:before {
    top: 0;
    left: 0;
    transform-origin: 50% 0;
    transform: scaleY(0);
}

.ech-fade-m-in:after {
    bottom: 0;
    left: 0;
    transform-origin: 50% 100%;
    transform: scaleY(0);
}
/*&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6587;&#x5B57;&#x989C;&#x8272;&#x53D8;&#x5316;*/
.ech-fade:hover, .ech-fade-t:hover, .ech-fade-b:hover, .ech-fade-l:hover, .ech-fade-r:hover, .ech-fade-c-in:hover, .ech-fade-m-in:hover, .ech-fade-m-out:hover, .ech-fade-c-out:hover, .ech-bounce-t:hover, .ech-bounce-b:hover, .ech-bounce-r:hover, .ech-bounce-l:hover {
    color: #fff;
}
/*&#x5782;&#x76F4;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;&#xFF08;&#x4E00;&#x534A;&#xFF09;*/
.ech-fade-m-in:hover:before, .ech-fade-m-in:hover:after {
    transform: scaleY(.51);
}
/*&#x5782;&#x76F4;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;*/
.ech-fade-t:hover:before, .ech-fade-b:hover:before, .ech-fade-m-out:hover:before, .ech-bounce-b:hover:before, .ech-bounce-t:hover:before {
    transform: scaleY(1);
}
/*&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;&#xFF08;&#x4E00;&#x534A;&#xFF09;*/
.ech-fade-c-in:hover:before, .ech-fade-c-in:hover:after {
    transform: scaleX(.51);
}
/*&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;*/
.ech-fade-l:hover:before, .ech-fade-r:hover:before,.ech-fade-c-out:hover:before, .ech-bounce-l:hover:before, .ech-bounce-r:hover:before {
    transform: scaleX(1);
}    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/*&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;*/</span>
<span class="hljs-selector-class">.ech-fade</span>, <span class="hljs-selector-class">.ech-fade-t</span>, <span class="hljs-selector-class">.ech-fade-b</span>, <span class="hljs-selector-class">.ech-fade-l</span>, <span class="hljs-selector-class">.ech-fade-r</span>, <span class="hljs-selector-class">.ech-fade-c-in</span>, <span class="hljs-selector-class">.ech-fade-m-in</span>, <span class="hljs-selector-class">.ech-fade-m-out</span>, <span class="hljs-selector-class">.ech-fade-c-out</span>, <span class="hljs-selector-class">.ech-bounce-t</span>, <span class="hljs-selector-class">.ech-bounce-b</span>, <span class="hljs-selector-class">.ech-bounce-r</span>, <span class="hljs-selector-class">.ech-bounce-l</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-comment">/*&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;:before&#x548C;:after&#x8BBE;&#x7F6E;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;*/</span>
<span class="hljs-selector-class">.ech-fade</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-t</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-b</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-l</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-m-out</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-fade-c-out</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-comment">/*&#x5F39;&#x8DF3;&#x5143;&#x7D20;:before&#x548C;:after&#x8BBE;&#x7F6E;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x548C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;*/</span>
<span class="hljs-selector-class">.ech-bounce-t</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-b</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-l</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">transition-timing-function</span>: <span class="hljs-built_in">cubic-bezier</span>(0.52, 1.7, 0.5, 0.4);
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-comment">/*&#x80CC;&#x666F;&#x989C;&#x8272;&#x548C;&#x6587;&#x5B57;&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.ech-fade</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-comment">/*&#x989C;&#x8272;&#x4ECE;&#x5DE6;&#x81F3;&#x53F3;&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade-l</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-l</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}
<span class="hljs-comment">/*&#x989C;&#x8272;&#x4ECE;&#x53F3;&#x81F3;&#x5DE6;&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-r</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

<span class="hljs-comment">/*&#x989C;&#x8272;&#x4ECE;&#x4E0A;&#x5F80;&#x4E0B;&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade-t</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-t</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
}
<span class="hljs-comment">/*&#x989C;&#x8272;&#x4ECE;&#x4E0B;&#x5F80;&#x4E0A;&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade-b</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-b</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
}

<span class="hljs-comment">/*&#x989C;&#x8272;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x51FA;&#x53BB;*/</span>
<span class="hljs-selector-class">.ech-fade-m-out</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
}

<span class="hljs-comment">/*&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x51FA;&#x53BB;*/</span>
<span class="hljs-selector-class">.ech-fade-c-out</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

<span class="hljs-selector-class">.ech-fade-c-out</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
}

<span class="hljs-comment">/*&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x8FDB;&#x6765;*/</span>
<span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

<span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

<span class="hljs-comment">/*&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x8FDB;&#x6765;*/</span>
<span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
}

<span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
}
<span class="hljs-comment">/*&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6587;&#x5B57;&#x989C;&#x8272;&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-t</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-b</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-l</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-r</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-m-out</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-fade-c-out</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-bounce-t</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-bounce-b</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-bounce-r</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-bounce-l</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-comment">/*&#x5782;&#x76F4;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;&#xFF08;&#x4E00;&#x534A;&#xFF09;*/</span>
<span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-m-in</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(.51);
}
<span class="hljs-comment">/*&#x5782;&#x76F4;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade-t</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-b</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-m-out</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-b</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-t</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1);
}
<span class="hljs-comment">/*&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;&#xFF08;&#x4E00;&#x534A;&#xFF09;*/</span>
<span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-c-in</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(.51);
}
<span class="hljs-comment">/*&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x8FDB;&#x6765;&#x7684;:before&#x53D8;&#x5316;*/</span>
<span class="hljs-selector-class">.ech-fade-l</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-fade-r</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>,<span class="hljs-selector-class">.ech-fade-c-out</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-l</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-bounce-r</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
}    </code></pre><h4>2-2-2.&#x989C;&#x8272;&#x4E0A;&#x4E0B;&#x5212;&#x7EBF;&#x53D8;&#x5316;</h4><p>&#x8FD9;&#x91CC;&#x4E5F;&#x662F;&#x4E00;&#x5927;&#x5757;&#x4E00;&#x8D77;&#x8BF4;&#xFF0C;&#x770B;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x4F1A;&#x66F4;&#x4E71;&#xFF0C;&#x6240;&#x4EE5;&#x5927;&#x5BB6;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x8981;&#x66F4;&#x52A0;&#x7559;&#x795E;&#x6CE8;&#x610F;&#x3002;&#x770B;&#x4EE3;&#x7801;&#x770B;&#x4E0D;&#x660E;&#x767D;&#xFF0C;&#x76F4;&#x63A5;&#x5728;github&#x4E0B;&#x8F7D;&#xFF0C;&#x7136;&#x540E;&#x8FD0;&#x884C;&#x6587;&#x4EF6;&#xFF0C;&#x8FB9;&#x8C03;&#x8BD5;&#x8FB9;&#x770B;&#x6548;&#x679C;&#xFF01;&#x8FD9;&#x6837;&#x5927;&#x5BB6;&#x5C31;&#x5F88;&#x5BB9;&#x6613;&#x660E;&#x767D;&#x4E86;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVSo9M?w=1170&amp;h=118" src="https://static.alili.tech/img/bVSo9M?w=1170&amp;h=118" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-overline-l&quot;&gt;overline-l&lt;/span&gt;
&lt;span class=&quot;ech-overline-r&quot;&gt;overline-r&lt;/span&gt;
&lt;span class=&quot;ech-underline-l&quot;&gt;underline-l&lt;/span&gt;
&lt;span class=&quot;ech-underline-r&quot;&gt;underline-r&lt;/span&gt;
&lt;span class=&quot;ech-underline-c&quot;&gt;underline-c&lt;/span&gt;
&lt;span class=&quot;ech-underline-c-out&quot;&gt;underline-c-out&lt;/span&gt;
&lt;span class=&quot;ech-overline-c&quot;&gt;overline-c&lt;/span&gt;
&lt;span class=&quot;ech-overline-c-out&quot;&gt;overline-c-out&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-overline-l&quot;</span>&gt;overline-l&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-overline-r&quot;</span>&gt;overline-r&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-underline-l&quot;</span>&gt;underline-l&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-underline-r&quot;</span>&gt;underline-r&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-underline-c&quot;</span>&gt;underline-c&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-underline-c-out&quot;</span>&gt;underline-c-<span class="hljs-keyword">out</span>&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-overline-c&quot;</span>&gt;overline-c&lt;/span&gt;
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;ech-overline-c-out&quot;</span>&gt;overline-c-<span class="hljs-keyword">out</span>&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x4E0A;&#x5212;&#x7EBF;&#x548C;&#x4E0B;&#x5212;&#x7EBF;&#x53D8;&#x5316; &#x5F53;&#x524D;&#x5143;&#x7D20;&#x6837;&#x5F0F;&#x8BBE;&#x7F6E;&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;*/
.ech-overline-r, .ech-overline-l, .ech-underline-r, .ech-underline-l, .ech-underline-c, .ech-overline-c, .ech-underline-c-out, .ech-overline-c-out{
    position: relative;
    transition: all .3s;
    z-index: 1;
}
/*&#x521D;&#x59CB;&#x5316;:after:before&#x5927;&#x5C0F;&#x548C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;*/
.ech-overline-r:before, .ech-overline-l:before, .ech-underline-l:before, .ech-underline-r:before, .ech-underline-c:before, .ech-overline-c:before, .ech-underline-c:after, .ech-overline-c:after, .ech-underline-c-out:before, .ech-overline-c-out:before {
    position: absolute;
    transition: all .3s;
    content: &quot;&quot;;
    display: block;
    background: #09f;
    z-index: -1;
    height: 4px;
    width: 100%;
    transform: scaleX(0);
}

/*&#x4E0A;&#x5212;&#x7EBF; &#x5DE6;&#x53F3;&#x51FA;&#x6765;*/
.ech-overline-r:before {
    top: 0;
    left: 0;
    transform-origin: 100% 50%;
}

.ech-overline-l:before {
    top: 0;
    right: 0;
    transform-origin: 0 50%;
}

/*&#x4E0B;&#x5212;&#x7EBF; &#x5DE6;&#x53F3;&#x51FA;&#x6765;*/
.ech-underline-r:before {
    bottom: 0;
    left: 0;
    transform-origin: 100% 50%;

}

.ech-underline-l:before {
    bottom: 0;
    right: 0;
    transform-origin: 0% 50%;
}

/**&#x4E0A;&#x5212;&#x7EBF; &#x4E0B;&#x5212;&#x7EBF; &#x5C45;&#x4E2D;&#x8FDB;&#x6765;**/
.ech-overline-c:before {
    top: 0;
    transform-origin: 0 50%;
}

.ech-overline-c:after {
    top: 0;
    transform-origin: 100% 50%;
}

.ech-underline-c:before {
    bottom: 0;
    transform-origin: 0 50%;
}

.ech-underline-c:after {
    bottom: 0;
    transform-origin: 100% 50%;
}

.ech-overline-c:before, .ech-underline-c:before {
    left: 0;
}

.ech-overline-c:after, .ech-underline-c:after {
    right: 0;
}

/*&#x4E0A;&#x5212;&#x7EBF; &#x4E0B;&#x5212;&#x7EBF;-&#x5C45;&#x4E2D;&#x51FA;&#x53BB; */
.ech-overline-c-out:before {
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.ech-underline-c-out:before {
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
/*hover&#x6548;&#x679C;*/
.ech-overline-c:hover:after, .ech-overline-c:hover:before, .ech-underline-c:hover:after, .ech-underline-c:hover:before {
    transform: scaleX(.51);
}

.ech-overline-l:hover:before, .ech-overline-r:hover:before, .ech-underline-l:hover:before, .ech-underline-r:hover:before, .ech-underline-c-out:hover:before, .ech-overline-c-out:hover:before {
    transform: scaleX(1);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/*&#x4E0A;&#x5212;&#x7EBF;&#x548C;&#x4E0B;&#x5212;&#x7EBF;&#x53D8;&#x5316; &#x5F53;&#x524D;&#x5143;&#x7D20;&#x6837;&#x5F0F;&#x8BBE;&#x7F6E;&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;*/</span>
<span class="hljs-selector-class">.ech-overline-r</span>, <span class="hljs-selector-class">.ech-overline-l</span>, <span class="hljs-selector-class">.ech-underline-r</span>, <span class="hljs-selector-class">.ech-underline-l</span>, <span class="hljs-selector-class">.ech-underline-c</span>, <span class="hljs-selector-class">.ech-overline-c</span>, <span class="hljs-selector-class">.ech-underline-c-out</span>, <span class="hljs-selector-class">.ech-overline-c-out</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-comment">/*&#x521D;&#x59CB;&#x5316;:after:before&#x5927;&#x5C0F;&#x548C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;*/</span>
<span class="hljs-selector-class">.ech-overline-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-overline-l</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-l</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-underline-c-out</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-overline-c-out</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

<span class="hljs-comment">/*&#x4E0A;&#x5212;&#x7EBF; &#x5DE6;&#x53F3;&#x51FA;&#x6765;*/</span>
<span class="hljs-selector-class">.ech-overline-r</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.ech-overline-l</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-comment">/*&#x4E0B;&#x5212;&#x7EBF; &#x5DE6;&#x53F3;&#x51FA;&#x6765;*/</span>
<span class="hljs-selector-class">.ech-underline-r</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;

}

<span class="hljs-selector-class">.ech-underline-l</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0%</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-comment">/**&#x4E0A;&#x5212;&#x7EBF; &#x4E0B;&#x5212;&#x7EBF; &#x5C45;&#x4E2D;&#x8FDB;&#x6765;**/</span>
<span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-comment">/*&#x4E0A;&#x5212;&#x7EBF; &#x4E0B;&#x5212;&#x7EBF;-&#x5C45;&#x4E2D;&#x51FA;&#x53BB; */</span>
<span class="hljs-selector-class">.ech-overline-c-out</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}

<span class="hljs-selector-class">.ech-underline-c-out</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}
<span class="hljs-comment">/*hover&#x6548;&#x679C;*/</span>
<span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-overline-c</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-class">.ech-underline-c</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(.51);
}

<span class="hljs-selector-class">.ech-overline-l</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-overline-r</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-l</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-r</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-underline-c-out</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-overline-c-out</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
}
</code></pre><h4>2-2-3&#x7BAD;&#x5934;&#x52A8;&#x753B;</h4><p><span class="img-wrap"><img data-src="/img/bVSrrY?w=990&amp;h=117" src="https://static.alili.tech/img/bVSrrY?w=990&amp;h=117" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-arrow-l&quot;&gt;arrow-l&lt;/span&gt;
&lt;span class=&quot;ech-arrow-r&quot;&gt;arrow-r&lt;/span&gt;
&lt;span class=&quot;ech-arrow-t&quot;&gt;arrow-t&lt;/span&gt;
&lt;span class=&quot;ech-arrow-b&quot;&gt;arrow-b&lt;/span&gt;
&lt;span class=&quot;ech-arrow-l-move&quot;&gt;arrow-l&lt;/span&gt;
&lt;span class=&quot;ech-arrow-r-move&quot;&gt;arrow-r&lt;/span&gt;
&lt;span class=&quot;ech-arrow-t-move&quot;&gt;arrow-t&lt;/span&gt;
&lt;span class=&quot;ech-arrow-b-move&quot;&gt;arrow-b&lt;/span&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-l&quot;</span>&gt;</span>arrow-l<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-r&quot;</span>&gt;</span>arrow-r<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-t&quot;</span>&gt;</span>arrow-t<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-b&quot;</span>&gt;</span>arrow-b<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-l-move&quot;</span>&gt;</span>arrow-l<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-r-move&quot;</span>&gt;</span>arrow-r<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-t-move&quot;</span>&gt;</span>arrow-t<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-arrow-b-move&quot;</span>&gt;</span>arrow-b<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-arrow-l, .ech-arrow-r, .ech-arrow-t, .ech-arrow-b, .ech-arrow-l-move, .ech-arrow-r-move, .ech-arrow-t-move, .ech-arrow-b-move{
    position: relative;
    transition: all .3s;
    z-index: 1;
}
/*&#x521D;&#x59CB;&#x5316;&#x7BAD;&#x5934;&#x6837;&#x5F0F;*/
.ech-arrow-l:before, .ech-arrow-r:before, .ech-arrow-t:before, .ech-arrow-b:before, .ech-arrow-l-move:before, .ech-arrow-r-move:before, .ech-arrow-t-move:before, .ech-arrow-b-move:before {
    position: absolute;
    transition: all .3s;
    content: &quot;&quot;;
    display: block;
    z-index: -1;
    border-style: solid;
    margin: auto;
    width: 0;
    height: 0;
}

.ech-arrow-l:before, .ech-arrow-l-move:before {
    left: 0;
    top: 0;
    bottom: 0;
    border-width: 10px 10px 10px 0;
    border-color: transparent #ccc transparent transparent;
}

.ech-arrow-r:before, .ech-arrow-r-move:before {
    right: 0;
    top: 0;
    bottom: 0;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent #ccc;
}

.ech-arrow-t:before, .ech-arrow-t-move:before {
    left: 0;
    top: 0;
    right: 0;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #ccc transparent;
}

.ech-arrow-b:before, .ech-arrow-b-move:before {
    left: 0;
    bottom: 0;
    right: 0;
    border-width: 10px 10px 0 10px;
    border-color: #ccc transparent transparent transparent;
}

.ech-arrow-l-move, .ech-arrow-r-move, .ech-arrow-t-move, .ech-arrow-b-move {
    transition: transform .3s;
}
/*hover&#x6548;&#x679C;*/
.ech-arrow-l-move:hover {
    transform: translateX(10px);
}

.ech-arrow-r-move:hover {
    transform: translateX(-10px);
}

.ech-arrow-t-move:hover {
    transform: translateY(10px);
}

.ech-arrow-b-move:hover {
    transform: translateY(-10px);
}

.ech-arrow-l-move:hover:before, .ech-arrow-l:hover:before {
    transform: translateX(-10px);
}

.ech-arrow-r-move:hover:before, .ech-arrow-r:hover:before {
    transform: translateX(10px);
}

.ech-arrow-t-move:hover:before, .ech-arrow-t:hover:before {
    transform: translateY(-10px);
}

.ech-arrow-b-move:hover:before, .ech-arrow-b:hover:before {
    transform: translateY(10px);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-arrow-l</span>, <span class="hljs-selector-class">.ech-arrow-r</span>, <span class="hljs-selector-class">.ech-arrow-t</span>, <span class="hljs-selector-class">.ech-arrow-b</span>, <span class="hljs-selector-class">.ech-arrow-l-move</span>, <span class="hljs-selector-class">.ech-arrow-r-move</span>, <span class="hljs-selector-class">.ech-arrow-t-move</span>, <span class="hljs-selector-class">.ech-arrow-b-move</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-comment">/*&#x521D;&#x59CB;&#x5316;&#x7BAD;&#x5934;&#x6837;&#x5F0F;*/</span>
<span class="hljs-selector-class">.ech-arrow-l</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-t</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-b</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-l-move</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-r-move</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-t-move</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-b-move</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.ech-arrow-l</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-l-move</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-color</span>: transparent <span class="hljs-number">#ccc</span> transparent transparent;
}

<span class="hljs-selector-class">.ech-arrow-r</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-r-move</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-color</span>: transparent transparent transparent <span class="hljs-number">#ccc</span>;
}

<span class="hljs-selector-class">.ech-arrow-t</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-t-move</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-color</span>: transparent transparent <span class="hljs-number">#ccc</span> transparent;
}

<span class="hljs-selector-class">.ech-arrow-b</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-b-move</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#ccc</span> transparent transparent transparent;
}

<span class="hljs-selector-class">.ech-arrow-l-move</span>, <span class="hljs-selector-class">.ech-arrow-r-move</span>, <span class="hljs-selector-class">.ech-arrow-t-move</span>, <span class="hljs-selector-class">.ech-arrow-b-move</span> {
    <span class="hljs-attribute">transition</span>: transform .<span class="hljs-number">3s</span>;
}
<span class="hljs-comment">/*hover&#x6548;&#x679C;*/</span>
<span class="hljs-selector-class">.ech-arrow-l-move</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(10px);
}

<span class="hljs-selector-class">.ech-arrow-r-move</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
}

<span class="hljs-selector-class">.ech-arrow-t-move</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(10px);
}

<span class="hljs-selector-class">.ech-arrow-b-move</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-10px);
}

<span class="hljs-selector-class">.ech-arrow-l-move</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-l</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
}

<span class="hljs-selector-class">.ech-arrow-r-move</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-r</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(10px);
}

<span class="hljs-selector-class">.ech-arrow-t-move</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-t</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-10px);
}

<span class="hljs-selector-class">.ech-arrow-b-move</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.ech-arrow-b</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(10px);
}
</code></pre><h3 id="articleHeader5">2-3&#x8F83;&#x590D;&#x6742;&#x52A8;&#x753B;</h3><p>2-1&#x548C;2-2&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x90FD;&#x662F;&#x5229;&#x7528;&#x8FC7;&#x6E21;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E00;&#x5757;&#x5C31;&#x662F;&#x5229;&#x7528;&#x52A8;&#x753B;&#x6765;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF01;&#x533A;&#x522B;&#x5C31;&#x662F;hover&#x7684;&#x5199;&#x6CD5;&#x662F;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x52A8;&#x753B;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x96BE;&#x5EA6;&#x5C31;&#x5728;&#x4E8E;&#x521B;&#x610F;&#x3002;</p><h4>2-3-1&#x95EA;&#x70C1;&#x6548;&#x679C;</h4><p><span class="img-wrap"><img data-src="/img/bVSro8?w=242&amp;h=107" src="https://static.alili.tech/img/bVSro8?w=242&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-flash&quot;&gt;flash&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-flash&quot;</span>&gt;</span>flash<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-flash:hover {
    animation: flash .5s ease;
}

@keyframes flash {
    0%, 50%, 100% {
        opacity: 1;
    }
    25%, 75% {
        opacity: 0;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-flash</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: flash .<span class="hljs-number">5s</span> ease;
}

@<span class="hljs-keyword">keyframes</span> flash {
    0%, 50%, 100% {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    }
    25%, 75% {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
}
</code></pre><h4>2-3-2&#x95F9;&#x949F;&#x632F;&#x94C3;&#x6548;&#x679C;</h4><p><span class="img-wrap"><img data-src="/img/bVSroW?w=242&amp;h=107" src="https://static.alili.tech/img/bVSroW?w=242&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-shake-time&quot;&gt;shake-time&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;ech-shake-time&quot;</span>&gt;shake-<span class="hljs-built_in">time</span>&lt;/span&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x4EFF;&#x95F9;&#x949F;&#x632F;&#x94C3;&#x6548;&#x679C;*/
.ech-shake-time:hover {
    animation: shake-time 1s ease;
}

@keyframes shake-time {
    0% {
        transform: scale(1);
    }
    10%, 20% {
        transform: scale(0.9) rotate(-3deg);
    }
    30%, 50%, 70%, 90% {
        transform: scale(1.1) rotate(3deg);
    }
    40%, 60%, 80% {
        transform: scale(1.1) rotate(-3deg);
    }
    100% {
        transform: scale(1) rotate(0);
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/*&#x4EFF;&#x95F9;&#x949F;&#x632F;&#x94C3;&#x6548;&#x679C;*/</span>
<span class="hljs-selector-class">.ech-shake-time</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: shake-time <span class="hljs-number">1s</span> ease;
}

@<span class="hljs-keyword">keyframes</span> shake-time {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
    }
    10%, 20% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.9) <span class="hljs-built_in">rotate</span>(-3deg);
    }
    30%, 50%, 70%, 90% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1) <span class="hljs-built_in">rotate</span>(3deg);
    }
    40%, 60%, 80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1) <span class="hljs-built_in">rotate</span>(-3deg);
    }
    100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1) <span class="hljs-built_in">rotate</span>(0);
    }
}
</code></pre><h4>2-3-3&#x6447;&#x6446;&#x6548;&#x679C;</h4><p><span class="img-wrap"><img data-src="/img/bVSrpo?w=454&amp;h=116" src="https://static.alili.tech/img/bVSrpo?w=454&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-wobble-c&quot;&gt;wobble-c&lt;/span&gt;
&lt;span class=&quot;ech-wobble-t&quot;&gt;wobble-t&lt;/span&gt;
&lt;span class=&quot;ech-wobble-b&quot;&gt;wobble-b&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-wobble-c&quot;</span>&gt;</span>wobble-c<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-wobble-t&quot;</span>&gt;</span>wobble-t<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-wobble-b&quot;</span>&gt;</span>wobble-b<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-wobble-t, .ech-skew-r-t, .ech-skew-l-t {
    transform-origin: 0 100%;
}

.ech-wobble-b, .ech-skew-r-b, .ech-skew-l-b {
    transform-origin: 100% 0;
}

.ech-wobble-c:hover, .ech-wobble-t:hover,.ech-wobble-b:hover {
    animation: wobble-x 1s ease-in-out;
}
@keyframes wobble-x {
    16.65% {
        -webkit-transform: skew(-12deg);
        transform: skew(-12deg);
    }
    33.3% {
        -webkit-transform: skew(10deg);
        transform: skew(10deg);
    }
    49.95% {
        -webkit-transform: skew(-6deg);
        transform: skew(-6deg);
    }
    66.6% {
        -webkit-transform: skew(4deg);
        transform: skew(4deg);
    }
    83.25% {
        -webkit-transform: skew(-2deg);
        transform: skew(-2deg);
    }
    100% {
        -webkit-transform: skew(0);
        transform: skew(0);
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-wobble-t</span>, <span class="hljs-selector-class">.ech-skew-r-t</span>, <span class="hljs-selector-class">.ech-skew-l-t</span> {
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.ech-wobble-b</span>, <span class="hljs-selector-class">.ech-skew-r-b</span>, <span class="hljs-selector-class">.ech-skew-l-b</span> {
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.ech-wobble-c</span><span class="hljs-selector-pseudo">:hover</span>, <span class="hljs-selector-class">.ech-wobble-t</span><span class="hljs-selector-pseudo">:hover</span>,<span class="hljs-selector-class">.ech-wobble-b</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: wobble-x <span class="hljs-number">1s</span> ease-in-out;
}
@<span class="hljs-keyword">keyframes</span> wobble-x {
    16<span class="hljs-selector-class">.65</span>% {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(-12deg);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-12deg);
    }
    33<span class="hljs-selector-class">.3</span>% {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(10deg);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(10deg);
    }
    49<span class="hljs-selector-class">.95</span>% {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(-6deg);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-6deg);
    }
    66<span class="hljs-selector-class">.6</span>% {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(4deg);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(4deg);
    }
    83<span class="hljs-selector-class">.25</span>% {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(-2deg);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-2deg);
    }
    100% {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(0);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(0);
    }
}
</code></pre><h4>2-3-4&#x6447;&#x6643;&#x6548;&#x679C;</h4><p><span class="img-wrap"><img data-src="/img/bVSrpw?w=288&amp;h=102" src="https://static.alili.tech/img/bVSrpw?w=288&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-swing&quot;&gt;swing&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-swing&quot;</span>&gt;</span>swing<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-swing:hover {
    animation: swing .5s ease alternate;
}

@keyframes swing {
    20% {
        transform: rotate(15deg);
    }
    40% {
        transform: rotate(-10deg);
    }
    60% {
        transform: rotate(5deg);
    }
    80% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0);
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-swing</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: swing .<span class="hljs-number">5s</span> ease alternate;
}

@<span class="hljs-keyword">keyframes</span> swing {
    20% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
    }
    40% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-10deg);
    }
    60% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
    }
    80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
    }
    100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0);
    }
}
</code></pre><h4>2-3-5&#x6296;&#x52A8;&#x6548;&#x679C;</h4><p><span class="img-wrap"><img data-src="/img/bVSrp1?w=288&amp;h=102" src="https://static.alili.tech/img/bVSrp1?w=288&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-shake&quot;&gt;shake&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-shake&quot;</span>&gt;</span>shake<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-shake:hover {
    animation: shake .5s ease;
}

@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-shake</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: shake .<span class="hljs-number">5s</span> ease;
}

@<span class="hljs-keyword">keyframes</span> shake {
    0%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
    }
    10%, 30%, 50%, 70%, 90% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
    }
    20%, 40%, 60%, 80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(10px);
    }
}
</code></pre><h4>2-3-6&#x5F39;&#x8DF3;&#x6548;&#x679C;</h4><p><span class="img-wrap"><img data-src="/img/bVSrqm?w=288&amp;h=102" src="https://static.alili.tech/img/bVSrqm?w=288&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span class=&quot;ech-bounce&quot;&gt;bounce&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ech-bounce&quot;</span>&gt;</span>bounce<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ech-bounce:hover {
    animation: bounce 1s ease;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.ech-bounce</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">animation</span>: bounce <span class="hljs-number">1s</span> ease;
}

@<span class="hljs-keyword">keyframes</span> bounce {
    0%, 20%, 50%, 80%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0);
    }
    40% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-30px);
    }
    60% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-15px);
    }
}

</code></pre><h2 id="articleHeader6">3.&#x9884;&#x8BBE;&#x52A8;&#x753B;</h2><p>&#x53D7;&#x9650;&#x4E8E;&#x7BC7;&#x5E45;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x6211;&#x4E5F;&#x4E0D;&#x60F3;&#x5206;&#x5F00;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;&#x5199;&#x3002;&#x5173;&#x4E8E;&#x8FD9;&#x4E2A;&#x9884;&#x8BBE;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x5C31;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x4E00;&#x4E0B;&#xFF0C;&#x5199;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x76F4;&#x63A5;&#x7ED9;&#x4E00;&#x4E2A;&#x5927;&#x6982;&#x7684;&#x64CD;&#x4F5C;&#x6F14;&#x793A;&#xFF0C;&#x548C;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#xFF01;&#x53CD;&#x6B63;&#x5199;&#x6CD5;&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x6BD4;&#x8F83;&#x5355;&#x4E00;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x6539;&#x4E00;&#x4E2A;&#x7C7B;&#x540D;&#x800C;&#x5DF2;&#x3002;&#x96BE;&#x7684;&#x662F;&#x52A8;&#x753B;&#x7684;&#x4E00;&#x4E9B;&#x7F16;&#x5199;&#xFF0C;&#x8FD9;&#x4E2A;&#x9700;&#x8981;&#x521B;&#x610F;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x4E0A;&#x7F51;&#x53C2;&#x8003;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVStn8?w=514&amp;h=400" src="https://static.alili.tech/img/bVStn8?w=514&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#xFF08;&#x4E0D;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#xFF0C;gif&#x622A;&#x5927;&#x56FE;&#x653E;&#x4E0D;&#x4E0A;&#x6765;&#xFF0C;&#x5C31;&#x653E;&#x4E86;&#x5F20;&#x5C0F;&#x7684;&#xFF0C;&#x5927;&#x5BB6;&#x7ED3;&#x679C;&#x4E0B;&#x9762;&#x7684;jpg&#x4E00;&#x8D77;&#x770B;&#x628A;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x7684;&#x6309;&#x94AE;&#xFF0C;&#x5C55;&#x793A;&#x52A8;&#x753B;&#xFF0C;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;github&#x4E0B;&#x9762;&#x4E0B;&#x8F7D;&#x4EE3;&#x7801;&#x770B;&#x4E0B;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVStoy?w=1248&amp;h=945" src="https://static.alili.tech/img/bVStoy?w=1248&amp;h=945" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong><code>&#xFF08;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x8FD9;&#x91CC;&#x8D34;&#x51FA;&#xFF0C;&#x4F46;&#x662F;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x7A0D;&#x5FAE;&#x770B;&#x4E00;&#x4E0B;&#xFF0C;&#x8FC7;&#x4E00;&#x4E0B;&#x5C31;&#x597D;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x53EA;&#x770B;&#x4EE3;&#x7801;&#x662F;&#x4F1A;&#x61F5;&#x903C;&#x7684;&#xFF0C;&#x8981;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x770B;&#x8C03;&#x8BD5;&#x4E00;&#x8FB9;&#x770B;&#xFF0C;&#x8FD9;&#x6837;&#x4F1A;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x7684;&#x660E;&#x767D;&#xFF09;</code></strong></p><p>html&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;demo&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;ec-css2.css&quot;&gt;
    &lt;style&gt;
        .big {
            width: 500px;
            height: 500px;
            border: 1px solid #ccc;
            margin: 100px auto 0 auto;
        }

        #demo {
            width: 200px;
            height: 100px;
            margin: 200px auto;
            background: #09f;
        }

        .btn-box {
            margin: 0 auto 100px auto;
            max-width: 1200px;
            font-size: 0;
        }

        .btn-box a {
            font-size: 16px;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 6px;
            color: #333;
            background: #ccc;
            margin: 0 0 10px 10px;
        }
        .btn-box .cur{
            background: #09f;
            color: #fff;
        }
        .an-type{
            width: 500px;
            height: 100px;
            margin: 0 auto;
        }
        .an-type a{
            font-size: 16px;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 6px;
            color: #333;
            background: #ccc;
            margin: 0 10px 10px 0;
        }
        .an-type .cur{
            background: #09f;
            color: #fff;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;big&quot;&gt;
    &lt;div class=&quot;&quot; id=&quot;demo&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;an-type&quot;&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-infinite&quot; id=&quot;infinite&quot;&gt;infinite&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-alternate&quot; id=&quot;alternate&quot;&gt;alternate&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; id=&quot;stop&quot;&gt;stop&lt;/a&gt;
&lt;/div&gt;
&lt;div class=&quot;btn-box&quot;&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce&quot; class=&quot;an-a&quot;&gt;bounce&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-in-b&quot; class=&quot;an-a&quot;&gt;bounce-in-b&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-in-l&quot; class=&quot;an-a&quot;&gt;bounce-in-l&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-in-t&quot; class=&quot;an-a&quot;&gt;bounce-in-t&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-in-r&quot; class=&quot;an-a&quot;&gt;bounce-in-r&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-out-b&quot; class=&quot;an-a&quot;&gt;bounce-out-b&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-out-l&quot; class=&quot;an-a&quot;&gt;bounce-out-l&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-out-t&quot; class=&quot;an-a&quot;&gt;bounce-out-t&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-bounce-out-r&quot; class=&quot;an-a&quot;&gt;bounce-out-r&lt;/a&gt;
    &lt;br/&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-wobble&quot; class=&quot;an-a&quot;&gt;wobble&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-wobble-t&quot; class=&quot;an-a&quot;&gt;wobble-t&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-wobble-b&quot; class=&quot;an-a&quot;&gt;wobble-b&lt;/a&gt;
    &lt;br/&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-in&quot; class=&quot;an-a&quot;&gt;fade-in&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-in-t&quot; class=&quot;an-a&quot;&gt;fade-in-t&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-in-b&quot; class=&quot;an-a&quot;&gt;fade-in-b&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-in-l&quot; class=&quot;an-a&quot;&gt;fade-in-l&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-in-r&quot; class=&quot;an-a&quot;&gt;fade-in-r&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-out&quot; class=&quot;an-a&quot;&gt;fade-out&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-out-t&quot; class=&quot;an-a&quot;&gt;fade-out-t&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-out-b&quot; class=&quot;an-a&quot;&gt;fade-out-b&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-out-l&quot; class=&quot;an-a&quot;&gt;fade-out-l&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-fade-out-r&quot; class=&quot;an-a&quot;&gt;fade-out-r&lt;/a&gt;
    &lt;br/&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-in&quot; class=&quot;an-a&quot;&gt;rotate-in&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-in-rb&quot; class=&quot;an-a&quot;&gt;rotate-in-rb&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-in-rt&quot; class=&quot;an-a&quot;&gt;rotate-in-rt&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-in-lb&quot; class=&quot;an-a&quot;&gt;rotate-in-lb&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-in-lt&quot; class=&quot;an-a&quot;&gt;rotate-in-lt&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-out&quot; class=&quot;an-a&quot;&gt;rotate-out&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-out-rb&quot; class=&quot;an-a&quot;&gt;rotate-out-rb&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-out-rt&quot; class=&quot;an-a&quot;&gt;rotate-out-rt&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-out-lb&quot; class=&quot;an-a&quot;&gt;rotate-out-lb&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rotate-out-lt&quot; class=&quot;an-a&quot;&gt;rotate-out-lt&lt;/a&gt;
    &lt;br/&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-flip-in-x&quot; class=&quot;an-a&quot;&gt;flip-in-x&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-flip-in-y&quot; class=&quot;an-a&quot;&gt;flip-in-y&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-flip-out-x&quot; class=&quot;an-a&quot;&gt;flip-out-x&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-flip-out-y&quot; class=&quot;an-a&quot;&gt;flip-out-y&lt;/a&gt;
    &lt;br/&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-light-speed-in&quot; class=&quot;an-a&quot;&gt;light-speed-in&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-light-speed-out&quot; class=&quot;an-a&quot;&gt;light-speed-out&lt;/a&gt;
    &lt;br/&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-shake-time&quot; class=&quot;an-a&quot;&gt;shake-time&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-flash&quot; class=&quot;an-a&quot;&gt;flash&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rubber-band&quot; class=&quot;an-a&quot;&gt;rubber-band&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-rubber-band-fast&quot; class=&quot;an-a&quot;&gt;rubber-band-fast&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-swing&quot; class=&quot;an-a&quot;&gt;swing&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-shake&quot; class=&quot;an-a&quot;&gt;shake&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-pulse-shrink&quot; class=&quot;an-a&quot;&gt;pulse-shrink&lt;/a&gt;
    &lt;a href=&quot;javascripr:;&quot; data-class=&quot;ec-pulse&quot; class=&quot;an-a&quot;&gt;pulse&lt;/a&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;ec-do.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    window.onload = function () {
        var oDivDemo = document.getElementById(&quot;demo&quot;),
        oDivBox = document.getElementsByClassName(&quot;btn-box&quot;)[0],
        oAan=oDivBox.getElementsByTagName(&quot;a&quot;),
        oInfinite=document.getElementById(&quot;infinite&quot;),_infinite=false,
        oAlternate=document.getElementById(&quot;alternate&quot;),_alternate=false,
        oStop=document.getElementById(&quot;stop&quot;);
        oStop.addEventListener(&quot;click&quot;,function(){
            oDivDemo.className=&quot;&quot;;
            _infinite=false;
            _alternate=false;
            ecDo.removeClass(oInfinite,&quot;cur&quot;);
            ecDo.removeClass(oAlternate,&quot;cur&quot;);
            ecDo.removeClass(oAan,&quot;cur&quot;);
        })
        oInfinite.addEventListener(&quot;click&quot;,function(){
            _infinite=!_infinite;
            if(_infinite){
                ecDo.addClass(oInfinite,&quot;cur&quot;)
                ecDo.addClass(oDivDemo,&quot;ec-infinite&quot;);
            }
            else{
                ecDo.removeClass(oInfinite,&quot;cur&quot;)
                ecDo.removeClass(oDivDemo,&quot;ec-infinite&quot;);
            }
        })
        oAlternate.addEventListener(&quot;click&quot;,function(){
            _alternate=!_alternate;
            if(_alternate){
                ecDo.addClass(oAlternate,&quot;cur&quot;)
                ecDo.addClass(oDivDemo,&quot;ec-alternate&quot;);
            }
            else{
                ecDo.removeClass(oAlternate,&quot;cur&quot;)
                ecDo.removeClass(oDivDemo,&quot;ec-alternate&quot;);
            }
        })
        oDivBox.addEventListener(&quot;click&quot;, function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement, _class = &quot;&quot;;
            if (target.nodeName.toLowerCase() === &apos;a&apos;) {
                ecDo.addClass(target,&quot;cur&quot;);
                ecDo.removeClass(ecDo.siblings(target,&quot;a&quot;),&quot;cur&quot;)
                _class =target.getAttribute(&quot;data-class&quot;);
                oDivDemo.className = &quot;&quot;;
                setTimeout(function () {
                    ecDo.addClass(oDivDemo,_class);
                    if(_infinite){
                        ecDo.addClass(oDivDemo,&quot;ec-infinite&quot;);
                    }
                    else{
                        ecDo.removeClass(oDivDemo,&quot;ec-infinite&quot;);
                    }
                    if(_alternate){
                        ecDo.addClass(oDivDemo,&quot;ec-alternate&quot;);
                    }
                    else{
                        ecDo.removeClass(oDivDemo,&quot;ec-alternate&quot;);
                    }
                }, 50)
            }
        })
    }
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;reset.css&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;ec-css2.css&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.big</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">0</span> auto;
        }

        <span class="hljs-selector-id">#demo</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span> auto;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        }

        <span class="hljs-selector-class">.btn-box</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto <span class="hljs-number">100px</span> auto;
            <span class="hljs-attribute">max-width</span>: <span class="hljs-number">1200px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.btn-box</span> <span class="hljs-selector-tag">a</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-class">.btn-box</span> <span class="hljs-selector-class">.cur</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        }
        <span class="hljs-selector-class">.an-type</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        }
        <span class="hljs-selector-class">.an-type</span> <span class="hljs-selector-tag">a</span>{
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.an-type</span> <span class="hljs-selector-class">.cur</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;big&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-type&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-infinite&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;infinite&quot;</span>&gt;</span>infinite<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-alternate&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;alternate&quot;</span>&gt;</span>alternate<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>stop<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn-box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-in-b&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-in-b<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-in-l&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-in-l<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-in-t&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-in-t<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-in-r&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-in-r<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-out-b&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-out-b<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-out-l&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-out-l<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-out-t&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-out-t<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-bounce-out-r&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>bounce-out-r<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-wobble&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>wobble<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-wobble-t&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>wobble-t<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-wobble-b&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>wobble-b<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-in&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-in<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-in-t&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-in-t<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-in-b&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-in-b<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-in-l&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-in-l<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-in-r&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-in-r<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-out&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-out<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-out-t&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-out-t<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-out-b&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-out-b<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-out-l&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-out-l<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-fade-out-r&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>fade-out-r<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-in&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-in<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-in-rb&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-in-rb<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-in-rt&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-in-rt<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-in-lb&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-in-lb<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-in-lt&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-in-lt<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-out&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-out<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-out-rb&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-out-rb<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-out-rt&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-out-rt<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-out-lb&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-out-lb<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rotate-out-lt&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rotate-out-lt<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-flip-in-x&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>flip-in-x<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-flip-in-y&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>flip-in-y<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-flip-out-x&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>flip-out-x<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-flip-out-y&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>flip-out-y<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-light-speed-in&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>light-speed-in<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-light-speed-out&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>light-speed-out<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-shake-time&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>shake-time<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-flash&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>flash<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rubber-band&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rubber-band<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-rubber-band-fast&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>rubber-band-fast<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-swing&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>swing<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-shake&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>shake<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-pulse-shrink&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>pulse-shrink<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascripr:;&quot;</span> <span class="hljs-attr">data-class</span>=<span class="hljs-string">&quot;ec-pulse&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;an-a&quot;</span>&gt;</span>pulse<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;ec-do.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> oDivDemo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;demo&quot;</span>),
        oDivBox = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&quot;btn-box&quot;</span>)[<span class="hljs-number">0</span>],
        oAan=oDivBox.getElementsByTagName(<span class="hljs-string">&quot;a&quot;</span>),
        oInfinite=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;infinite&quot;</span>),_infinite=<span class="hljs-literal">false</span>,
        oAlternate=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;alternate&quot;</span>),_alternate=<span class="hljs-literal">false</span>,
        oStop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
        oStop.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            oDivDemo.className=<span class="hljs-string">&quot;&quot;</span>;
            _infinite=<span class="hljs-literal">false</span>;
            _alternate=<span class="hljs-literal">false</span>;
            ecDo.removeClass(oInfinite,<span class="hljs-string">&quot;cur&quot;</span>);
            ecDo.removeClass(oAlternate,<span class="hljs-string">&quot;cur&quot;</span>);
            ecDo.removeClass(oAan,<span class="hljs-string">&quot;cur&quot;</span>);
        })
        oInfinite.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            _infinite=!_infinite;
            <span class="hljs-keyword">if</span>(_infinite){
                ecDo.addClass(oInfinite,<span class="hljs-string">&quot;cur&quot;</span>)
                ecDo.addClass(oDivDemo,<span class="hljs-string">&quot;ec-infinite&quot;</span>);
            }
            <span class="hljs-keyword">else</span>{
                ecDo.removeClass(oInfinite,<span class="hljs-string">&quot;cur&quot;</span>)
                ecDo.removeClass(oDivDemo,<span class="hljs-string">&quot;ec-infinite&quot;</span>);
            }
        })
        oAlternate.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            _alternate=!_alternate;
            <span class="hljs-keyword">if</span>(_alternate){
                ecDo.addClass(oAlternate,<span class="hljs-string">&quot;cur&quot;</span>)
                ecDo.addClass(oDivDemo,<span class="hljs-string">&quot;ec-alternate&quot;</span>);
            }
            <span class="hljs-keyword">else</span>{
                ecDo.removeClass(oAlternate,<span class="hljs-string">&quot;cur&quot;</span>)
                ecDo.removeClass(oDivDemo,<span class="hljs-string">&quot;ec-alternate&quot;</span>);
            }
        })
        oDivBox.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> e = e || <span class="hljs-built_in">window</span>.event;
            <span class="hljs-keyword">var</span> target = e.target || e.srcElement, _class = <span class="hljs-string">&quot;&quot;</span>;
            <span class="hljs-keyword">if</span> (target.nodeName.toLowerCase() === <span class="hljs-string">&apos;a&apos;</span>) {
                ecDo.addClass(target,<span class="hljs-string">&quot;cur&quot;</span>);
                ecDo.removeClass(ecDo.siblings(target,<span class="hljs-string">&quot;a&quot;</span>),<span class="hljs-string">&quot;cur&quot;</span>)
                _class =target.getAttribute(<span class="hljs-string">&quot;data-class&quot;</span>);
                oDivDemo.className = <span class="hljs-string">&quot;&quot;</span>;
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    ecDo.addClass(oDivDemo,_class);
                    <span class="hljs-keyword">if</span>(_infinite){
                        ecDo.addClass(oDivDemo,<span class="hljs-string">&quot;ec-infinite&quot;</span>);
                    }
                    <span class="hljs-keyword">else</span>{
                        ecDo.removeClass(oDivDemo,<span class="hljs-string">&quot;ec-infinite&quot;</span>);
                    }
                    <span class="hljs-keyword">if</span>(_alternate){
                        ecDo.addClass(oDivDemo,<span class="hljs-string">&quot;ec-alternate&quot;</span>);
                    }
                    <span class="hljs-keyword">else</span>{
                        ecDo.removeClass(oDivDemo,<span class="hljs-string">&quot;ec-alternate&quot;</span>);
                    }
                }, <span class="hljs-number">50</span>)
            }
        })
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x52A8;&#x753B;&#x6548;&#x679C;*/
.ec-bounce-in-l {
    animation: bounce-in-l 1s ease;
}
@keyframes bounce-in-l {
    0%, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        transform: translate3d(-3000px, 0, 0)
    }
    60% {
        opacity: 1;
        transform: translate3d(25px, 0, 0)
    }
    75% {
        transform: translate3d(-10px, 0, 0)
    }
    90% {
        transform: translate3d(5px, 0, 0)
    }
    to {
        -webkit-transform: none;
        transform: none
    }
}
.ec-bounce-in-r {
    animation: bounce-in-r 1s ease;
}
@keyframes bounce-in-r {
    0%, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        transform: translate3d(3000px, 0, 0)
    }
    60% {
        opacity: 1;
        transform: translate3d(-25px, 0, 0)
    }
    75% {
        transform: translate3d(10px, 0, 0)
    }
    90% {
        transform: translate3d(-5px, 0, 0)
    }
    to {
        -webkit-transform: none;
        transform: none
    }
}
.ec-bounce-in-b{
    animation: bounce-in-b 1s;
}
.ec-bounce-in-t{
    animation: bounce-in-t 1s;
}
@keyframes bounce-in-t {
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        transform: translate3d(0, -3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, 25px, 0);
    }

    75% {
        transform: translate3d(0, -10px, 0);
    }

    90% {
        transform: translate3d(0, 5px, 0);
    }

    to {
        transform: none;
    }
}
@keyframes bounce-in-b{
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, -25px, 0);
    }

    75% {
        transform: translate3d(0, 10px, 0);
    }

    90% {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: none;
    }
}
@keyframes bounce-out-b {
    20% {
        transform: translate3d(0, 10px, 0);
    }

    40%, 45% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(0, 2000px, 0);
    }
}

.ec-bounce-out-b {
    animation: bounce-out-b 1s;
}

@keyframes bounce-out-l {
    20% {
        opacity: 1;
        transform: translate3d(20px, 0, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(-2000px, 0, 0);
    }
}

.ec-bounce-out-l {
    animation: bounce-out-l 1s;
}

@keyframes bounce-out-r {
    20% {
        opacity: 1;
        transform: translate3d(-20px, 0, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(2000px, 0, 0);
    }
}

.ec-bounce-out-r {
    animation: bounce-out-r 1s;
}

@keyframes bounce-out-t {
    20% {
        transform: translate3d(0, -10px, 0);
    }

    40%, 45% {
        opacity: 1;
        transform: translate3d(0, 20px, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(0, -2000px, 0);
    }
}

.ec-bounce-out-t {
    animation: bounce-out-t 1s;
}

/*&#x5FC3;&#x8DF3;&#x6548;&#x679C;*/
.ec-pulse {
    animation: pulse 1s linear;
}
.ec-pulse-shrink {
    animation: pulse .5s linear;
}
@keyframes pulse {
    25% {
        transform: scale(1.1);
    }
    75% {
        transform: scale(0.9);
    }
}
.ec-flash {
    animation: flash .5s ease;
}
/*&#x6447;&#x6446;*/
.ec-swing {
    animation: swing .5s ease;
}
@keyframes swing {
    20% {
        transform: rotate(15deg);
    }
    40% {
        transform: rotate(-10deg);
    }
    60% {
        transform: rotate(5deg);
    }
    80% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0);
    }
}
/*&#x6447;&#x6446;*/
.ec-wobble-t{
    transform-origin: 0 100%;
}

.ec-wobble-b{
    transform-origin: 100% 0;
}

.ec-wobble,.ec-wobble-t,.ec-wobble-b {
    animation: wobblex 1s ease-in-out;
}

@keyframes wobblex {
    16.65% {
        -webkit-transform: skew(-12deg);
        transform: skew(-12deg);
    }
    33.3% {
        -webkit-transform: skew(10deg);
        transform: skew(10deg);
    }
    49.95% {
        -webkit-transform: skew(-6deg);
        transform: skew(-6deg);
    }
    66.6% {
        -webkit-transform: skew(4deg);
        transform: skew(4deg);
    }
    83.25% {
        -webkit-transform: skew(-2deg);
        transform: skew(-2deg);
    }
    100% {
        -webkit-transform: skew(0);
        transform: skew(0);
    }
}
/*&#x95EA;&#x70C1;*/
@keyframes flash {
    0%, 50%, 100% {
        opacity: 1;
    }
    25%, 75% {
        opacity: 0;
    }
}
.ec-rubber-band {
    animation: rubber-band 1s;
}
.ec-rubber-band-fast {
    animation: rubber-band .5s;
}
@keyframes rubber-band {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, .95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
/*&#x4EFF;&#x95F9;&#x949F;&#x632F;&#x94C3;&#x6548;&#x679C;*/
.ec-shake-time{
    animation: shake-time 1s ease;
}

@keyframes shake-time {
    0% {
        transform: scale(1);
    }
    10%, 20% {
        transform: scale(0.9) rotate(-3deg);
    }
    30%, 50%, 70%, 90% {
        transform: scale(1.1) rotate(3deg);
    }
    40%, 60%, 80% {
        transform: scale(1.1) rotate(-3deg);
    }
    100% {
        transform: scale(1) rotate(0);
    }
}

/*&#x5F39;&#x8DF3;&#x53D8;&#x5316;*/
.ec-bounce{
    animation: bounce 1s ease;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

/*&#x9707;&#x52A8;*/
.ec-shake {
    animation: shake .5s ease;
}

@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}
/*&#x900F;&#x660E;&#x5EA6;&#x8FDB;&#x5165;*/
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.ec-fade-in {
    animation: fade-in 1s;
}

@keyframes ec-fade-in-b {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-b {
    animation: ec-fade-in-b 1s;
}

@keyframes ec-fade-in-l {
    from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-l {
    animation: ec-fade-in-l 1s;
}

@keyframes ec-fade-in-r {
    from {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-r {
    animation: ec-fade-in-r 1s;
}

@keyframes ec-fade-in-t {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-t {
    animation: ec-fade-in-t 1s;
}

@keyframes ec-fade-out {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.ec-fade-out {
    animation: ec-fade-out 1s;
}

@keyframes ec-fade-out-b {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
}

.ec-fade-out-b {
    animation: ec-fade-out-b 1s;
}

@keyframes ec-fade-out-l {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
}

.ec-fade-out-l {
    animation: ec-fade-out-l 1s;
}


@keyframes ec-fade-out-r {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
}

.ec-fade-out-r {
    animation: ec-fade-out-r 1s;
}

@keyframes ec-fade-out-t {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
}

.ec-fade-out-t {
    animation: ec-fade-out-t 1s;
}
/*&#x65CB;&#x8F6C;&#x8FDB;&#x51FA;*/
@keyframes rotate-in{
    0%{opacity:0;transform:rotate(-200deg);}
    100%{opacity:1;transform:rotate(0);}
}
.ec-rotate-in {
    animation: rotate-in 1s;
}
@keyframes rotate-in-lt{
    0%{transform-origin:left bottom;transform:rotate(-90deg);opacity:0;}
    100%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-lt {
    animation: rotate-in-lt 1s;
}
@keyframes rotate-in-lb{
    0%{transform-origin:left bottom;transform:rotate(90deg);opacity:0;}
    100%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-lb {
    animation: rotate-in-lb 1s;
}
@keyframes rotate-in-rt{
    0%{transform-origin:right bottom;transform:rotate(90deg);opacity:0;}
    100%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-rt {
    animation: rotate-in-rt 1s;
}
@keyframes rotate-in-rb{
    0%{transform-origin:right bottom;transform:rotate(-90deg);opacity:0;}
    100%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-rb {
    animation: rotate-in-rb 1s;
}

.ec-rotate-out {
    animation: rotate-out 1s;
}
@keyframes rotate-out{
    0%{transform-origin:center center;transform:rotate(0);opacity:1;}
    100%{transform-origin:center center;transform:rotate(200deg);opacity:0;}
}
.ec-rotate-out-lt {
    animation: rotate-out-lt 1s;
}
@keyframes rotate-out-lt{
    0%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:left bottom;transform:rotate(-90deg);opacity:0;}
}
.ec-rotate-out-lb {
    animation: rotate-out-lb 1s;
}
@keyframes rotate-out-lb{
    0%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:left bottom;transform:rotate(90deg);opacity:0;}
}
.ec-rotate-out-rt {
    animation: rotate-out-rt 1s;
}
@keyframes rotate-out-rt{
    0%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:right bottom;transform:rotate(90deg);opacity:0;}
}
.ec-rotate-out-rb {
    animation: rotate-out-rb 1s;
}
@keyframes rotate-out-rb{
    0%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:right bottom;transform:rotate(-90deg);opacity:0;}
}
/*&#x7FFB;&#x8F6C;&#x8FDB;&#x51FA;*/
@keyframes flip-in-x {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}

.ec-flip-in-x {
    animation: flip-in-x 1s;
}

@keyframes flip-in-y {
    from {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}

.ec-flip-in-y {
    animation: flip-in-y 1s;
}

@keyframes flip-out-x {
    from {
        transform: perspective(400px);
    }

    30% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        opacity: 1;
    }

    to {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        opacity: 0;
    }
}

.ec-flip-out-x {
    animation: flip-out-x 1s;
}

@keyframes flip-out-y {
    from {
        transform: perspective(400px);
    }

    30% {
        transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
        opacity: 1;
    }

    to {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        opacity: 0;
    }
}

.ec-flip-out-y {
    animation: flip-out-y 1s;
}

@keyframes light-speed-in {
    from {
        transform: translate3d(100%, 0, 0) skewX(-30deg);
        opacity: 0;
    }

    60% {
        transform: skewX(20deg);
        opacity: 1;
    }

    80% {
        transform: skewX(-5deg);
        opacity: 1;
    }

    to {
        transform: none;
        opacity: 1;
    }
}

.ec-light-speed-in {
    animation: light-speed-in 1s ease-out;
}

@keyframes light-speed-out {
    from {
        opacity: 1;
    }

    to {
        transform: translate3d(100%, 0, 0) skewX(30deg);
        opacity: 0;
    }
}

.ec-light-speed-out {
    animation: light-speed-out ease-in 1s;
}
/*&#x65E0;&#x9650;&#x6B21;&#x6570;&#x6267;&#x884C;&#x52A8;&#x753B;*/
.ec-infinite{
    animation-iteration-count: infinite;
}

.ec-alternate {
    animation-direction: alternate;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre><code>/*&#x52A8;&#x753B;&#x6548;&#x679C;*/
.ec-bounce-in-l {
    animation: bounce-in-l 1s ease;
}
@keyframes bounce-in-l {
    0%, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        transform: translate3d(-3000px, 0, 0)
    }
    60% {
        opacity: 1;
        transform: translate3d(25px, 0, 0)
    }
    75% {
        transform: translate3d(-10px, 0, 0)
    }
    90% {
        transform: translate3d(5px, 0, 0)
    }
    to {
        -webkit-transform: none;
        transform: none
    }
}
.ec-bounce-in-r {
    animation: bounce-in-r 1s ease;
}
@keyframes bounce-in-r {
    0%, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        transform: translate3d(3000px, 0, 0)
    }
    60% {
        opacity: 1;
        transform: translate3d(-25px, 0, 0)
    }
    75% {
        transform: translate3d(10px, 0, 0)
    }
    90% {
        transform: translate3d(-5px, 0, 0)
    }
    to {
        -webkit-transform: none;
        transform: none
    }
}
.ec-bounce-in-b{
    animation: bounce-in-b 1s;
}
.ec-bounce-in-t{
    animation: bounce-in-t 1s;
}
@keyframes bounce-in-t {
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        transform: translate3d(0, -3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, 25px, 0);
    }

    75% {
        transform: translate3d(0, -10px, 0);
    }

    90% {
        transform: translate3d(0, 5px, 0);
    }

    to {
        transform: none;
    }
}
@keyframes bounce-in-b{
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, -25px, 0);
    }

    75% {
        transform: translate3d(0, 10px, 0);
    }

    90% {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: none;
    }
}
@keyframes bounce-out-b {
    20% {
        transform: translate3d(0, 10px, 0);
    }

    40%, 45% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(0, 2000px, 0);
    }
}

.ec-bounce-out-b {
    animation: bounce-out-b 1s;
}

@keyframes bounce-out-l {
    20% {
        opacity: 1;
        transform: translate3d(20px, 0, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(-2000px, 0, 0);
    }
}

.ec-bounce-out-l {
    animation: bounce-out-l 1s;
}

@keyframes bounce-out-r {
    20% {
        opacity: 1;
        transform: translate3d(-20px, 0, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(2000px, 0, 0);
    }
}

.ec-bounce-out-r {
    animation: bounce-out-r 1s;
}

@keyframes bounce-out-t {
    20% {
        transform: translate3d(0, -10px, 0);
    }

    40%, 45% {
        opacity: 1;
        transform: translate3d(0, 20px, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(0, -2000px, 0);
    }
}

.ec-bounce-out-t {
    animation: bounce-out-t 1s;
}

/*&#x5FC3;&#x8DF3;&#x6548;&#x679C;*/
.ec-pulse {
    animation: pulse 1s linear;
}
.ec-pulse-shrink {
    animation: pulse .5s linear;
}
@keyframes pulse {
    25% {
        transform: scale(1.1);
    }
    75% {
        transform: scale(0.9);
    }
}
.ec-flash {
    animation: flash .5s ease;
}
/*&#x6447;&#x6446;*/
.ec-swing {
    animation: swing .5s ease;
}
@keyframes swing {
    20% {
        transform: rotate(15deg);
    }
    40% {
        transform: rotate(-10deg);
    }
    60% {
        transform: rotate(5deg);
    }
    80% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0);
    }
}
/*&#x6447;&#x6446;*/
.ec-wobble-t{
    transform-origin: 0 100%;
}

.ec-wobble-b{
    transform-origin: 100% 0;
}

.ec-wobble,.ec-wobble-t,.ec-wobble-b {
    animation: wobblex 1s ease-in-out;
}

@keyframes wobblex {
    16.65% {
        -webkit-transform: skew(-12deg);
        transform: skew(-12deg);
    }
    33.3% {
        -webkit-transform: skew(10deg);
        transform: skew(10deg);
    }
    49.95% {
        -webkit-transform: skew(-6deg);
        transform: skew(-6deg);
    }
    66.6% {
        -webkit-transform: skew(4deg);
        transform: skew(4deg);
    }
    83.25% {
        -webkit-transform: skew(-2deg);
        transform: skew(-2deg);
    }
    100% {
        -webkit-transform: skew(0);
        transform: skew(0);
    }
}
/*&#x95EA;&#x70C1;*/
@keyframes flash {
    0%, 50%, 100% {
        opacity: 1;
    }
    25%, 75% {
        opacity: 0;
    }
}
.ec-rubber-band {
    animation: rubber-band 1s;
}
.ec-rubber-band-fast {
    animation: rubber-band .5s;
}
@keyframes rubber-band {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, .95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
/*&#x4EFF;&#x95F9;&#x949F;&#x632F;&#x94C3;&#x6548;&#x679C;*/
.ec-shake-time{
    animation: shake-time 1s ease;
}

@keyframes shake-time {
    0% {
        transform: scale(1);
    }
    10%, 20% {
        transform: scale(0.9) rotate(-3deg);
    }
    30%, 50%, 70%, 90% {
        transform: scale(1.1) rotate(3deg);
    }
    40%, 60%, 80% {
        transform: scale(1.1) rotate(-3deg);
    }
    100% {
        transform: scale(1) rotate(0);
    }
}

/*&#x5F39;&#x8DF3;&#x53D8;&#x5316;*/
.ec-bounce{
    animation: bounce 1s ease;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

/*&#x9707;&#x52A8;*/
.ec-shake {
    animation: shake .5s ease;
}

@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}
/*&#x900F;&#x660E;&#x5EA6;&#x8FDB;&#x5165;*/
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.ec-fade-in {
    animation: fade-in 1s;
}

@keyframes ec-fade-in-b {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-b {
    animation: ec-fade-in-b 1s;
}

@keyframes ec-fade-in-l {
    from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-l {
    animation: ec-fade-in-l 1s;
}

@keyframes ec-fade-in-r {
    from {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-r {
    animation: ec-fade-in-r 1s;
}

@keyframes ec-fade-in-t {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.ec-fade-in-t {
    animation: ec-fade-in-t 1s;
}

@keyframes ec-fade-out {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.ec-fade-out {
    animation: ec-fade-out 1s;
}

@keyframes ec-fade-out-b {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
}

.ec-fade-out-b {
    animation: ec-fade-out-b 1s;
}

@keyframes ec-fade-out-l {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
}

.ec-fade-out-l {
    animation: ec-fade-out-l 1s;
}


@keyframes ec-fade-out-r {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
}

.ec-fade-out-r {
    animation: ec-fade-out-r 1s;
}

@keyframes ec-fade-out-t {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
}

.ec-fade-out-t {
    animation: ec-fade-out-t 1s;
}
/*&#x65CB;&#x8F6C;&#x8FDB;&#x51FA;*/
@keyframes rotate-in{
    0%{opacity:0;transform:rotate(-200deg);}
    100%{opacity:1;transform:rotate(0);}
}
.ec-rotate-in {
    animation: rotate-in 1s;
}
@keyframes rotate-in-lt{
    0%{transform-origin:left bottom;transform:rotate(-90deg);opacity:0;}
    100%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-lt {
    animation: rotate-in-lt 1s;
}
@keyframes rotate-in-lb{
    0%{transform-origin:left bottom;transform:rotate(90deg);opacity:0;}
    100%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-lb {
    animation: rotate-in-lb 1s;
}
@keyframes rotate-in-rt{
    0%{transform-origin:right bottom;transform:rotate(90deg);opacity:0;}
    100%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-rt {
    animation: rotate-in-rt 1s;
}
@keyframes rotate-in-rb{
    0%{transform-origin:right bottom;transform:rotate(-90deg);opacity:0;}
    100%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
}
.ec-rotate-in-rb {
    animation: rotate-in-rb 1s;
}

.ec-rotate-out {
    animation: rotate-out 1s;
}
@keyframes rotate-out{
    0%{transform-origin:center center;transform:rotate(0);opacity:1;}
    100%{transform-origin:center center;transform:rotate(200deg);opacity:0;}
}
.ec-rotate-out-lt {
    animation: rotate-out-lt 1s;
}
@keyframes rotate-out-lt{
    0%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:left bottom;transform:rotate(-90deg);opacity:0;}
}
.ec-rotate-out-lb {
    animation: rotate-out-lb 1s;
}
@keyframes rotate-out-lb{
    0%{transform-origin:left bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:left bottom;transform:rotate(90deg);opacity:0;}
}
.ec-rotate-out-rt {
    animation: rotate-out-rt 1s;
}
@keyframes rotate-out-rt{
    0%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:right bottom;transform:rotate(90deg);opacity:0;}
}
.ec-rotate-out-rb {
    animation: rotate-out-rb 1s;
}
@keyframes rotate-out-rb{
    0%{transform-origin:right bottom;transform:rotate(0);opacity:1;}
    100%{transform-origin:right bottom;transform:rotate(-90deg);opacity:0;}
}
/*&#x7FFB;&#x8F6C;&#x8FDB;&#x51FA;*/
@keyframes flip-in-x {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}

.ec-flip-in-x {
    animation: flip-in-x 1s;
}

@keyframes flip-in-y {
    from {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}

.ec-flip-in-y {
    animation: flip-in-y 1s;
}

@keyframes flip-out-x {
    from {
        transform: perspective(400px);
    }

    30% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        opacity: 1;
    }

    to {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        opacity: 0;
    }
}

.ec-flip-out-x {
    animation: flip-out-x 1s;
}

@keyframes flip-out-y {
    from {
        transform: perspective(400px);
    }

    30% {
        transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
        opacity: 1;
    }

    to {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        opacity: 0;
    }
}

.ec-flip-out-y {
    animation: flip-out-y 1s;
}

@keyframes light-speed-in {
    from {
        transform: translate3d(100%, 0, 0) skewX(-30deg);
        opacity: 0;
    }

    60% {
        transform: skewX(20deg);
        opacity: 1;
    }

    80% {
        transform: skewX(-5deg);
        opacity: 1;
    }

    to {
        transform: none;
        opacity: 1;
    }
}

.ec-light-speed-in {
    animation: light-speed-in 1s ease-out;
}

@keyframes light-speed-out {
    from {
        opacity: 1;
    }

    to {
        transform: translate3d(100%, 0, 0) skewX(30deg);
        opacity: 0;
    }
}

.ec-light-speed-out {
    animation: light-speed-out ease-in 1s;
}
/*&#x65E0;&#x9650;&#x6B21;&#x6570;&#x6267;&#x884C;&#x52A8;&#x753B;*/
.ec-infinite{
    animation-iteration-count: infinite;
}

.ec-alternate {
    animation-direction: alternate;
}</code></pre><h2 id="articleHeader7">4.&#x672A;&#x77E5;&#x63A2;&#x7D22;</h2><p>&#x597D;&#x4E86;&#xFF0C;&#x8BF4;&#x5B8C;&#x4E86;hover&#x52A8;&#x753B;&#x548C;&#x9884;&#x8BBE;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53D1;&#x73B0;&#x4E86;&#x8FD9;&#x6837;&#x4E00;&#x4E9B;&#x597D;&#x73A9;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x6211;&#x4E5F;&#x51C6;&#x5907;&#x7EE7;&#x7EED;&#x7814;&#x7A76;&#xFF0C;&#x4E5F;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x73A9;&#x4E0B;&#xFF0C;&#x8BF4;&#x4E0D;&#x5B9A;&#x54EA;&#x5929;&#x505A;&#x51FA;&#x4E86;&#x4E86;&#x4E0D;&#x8D77;&#x7684;&#x4E1C;&#x897F;&#xFF01;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x6817;&#x5B50;&#xFF01;</p><blockquote>&#x4E0B;&#x9762;&#x8BF4;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x4E0D;&#x5206;hover&#x52A8;&#x753B;&#x548C;&#x9884;&#x8BBE;&#x52A8;&#x753B;&#xFF0C;&#x5927;&#x5BB6;&#x6CE8;&#x610F;</blockquote><h3 id="articleHeader8">4-1.&#x65E0;&#x9650;&#x6267;&#x884C;&#x52A8;&#x753B;</h3><p>&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x52A0;&#x4E0A;&#x65E0;&#x9650;&#x6267;&#x884C;&#xFF0C;&#x4E00;&#x822C;&#x4F1A;&#x51FA;&#x73B0;&#x5F88;&#x53CB;&#x597D;&#x7684;&#x6548;&#x679C;&#xFF0C;</p><p><span class="img-wrap"><img data-src="/img/bVStuB?w=310&amp;h=73" src="https://static.alili.tech/img/bVStuB?w=310&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4F46;&#x662F;&#x6709;&#x4E9B;&#x65F6;&#x5019;&#x7684;&#x6548;&#x679C;&#x5DEE;&#x5F3A;&#x4EBA;&#x610F;</p><p><span class="img-wrap"><img data-src="/img/bVStr3?w=541&amp;h=414" src="https://static.alili.tech/img/bVStr3?w=541&amp;h=414" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader9">4-2.&#x53CD;&#x5411;&#x52A8;&#x753B;</h3><p>&#x5728;4-1&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x52A0;&#x4E0A;&#x65B9;&#x5411;&#x6267;&#x884C;&#x52A8;&#x753B;&#xFF0C;&#x4E5F;&#x4F1A;&#x6709;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x6548;&#x679C;</p><p>&#x6CA1;&#x52A0;&#x53CD;&#x5411;&#x52A8;&#x753B;&#x6548;&#x679C;<br><span class="img-wrap"><img data-src="/img/bVStt2?w=548&amp;h=555" src="https://static.alili.tech/img/bVStt2?w=548&amp;h=555" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x52A0;&#x4E0A;&#x53CD;&#x5411;&#x52A8;&#x753B;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVStt3?w=548&amp;h=555" src="https://static.alili.tech/img/bVStt3?w=548&amp;h=555" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader10">4-3.&#x7EC4;&#x5408;&#x6548;&#x679C;</h3><p>&#x9634;&#x5F71;&#x6548;&#x679C;&#x548C;&#x5176;&#x5B83;&#x6548;&#x679C;&#x7684;&#x7EC4;&#x5408;&#xFF0C;(gif&#x770B;&#x4E0D;&#x51FA;&#x9634;&#x5F71;&#x6548;&#x679C;&#xFF0C;&#x54CE;&#x3002;&#x3002;)<br><span class="img-wrap"><img data-src="/img/bVStvV?w=406&amp;h=83" src="https://static.alili.tech/img/bVStvV?w=406&amp;h=83" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x7684;&#x51E0;&#x4E2A;&#x7684;&#x6817;&#x5B50;<br>css&#x4EE3;&#x7801;&#x4E0D;&#x53D8;&#xFF0C;&#x533A;&#x522B;&#x662F;html&#x4EE3;&#x7801;&#xFF0C;&#x591A;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;&#x7C7B;&#x540D;<br><span class="img-wrap"><img data-src="/img/bVStxe?w=587&amp;h=137" src="https://static.alili.tech/img/bVStxe?w=587&amp;h=137" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x51E0;&#x4E2A;&#x662F;&#x6211;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#x5019;&#x53D1;&#x73B0;&#x7684;&#x6817;&#x5B50;&#xFF0C;&#x8FD9;&#x4E2A;&#x6211;&#x4F1A;&#x7EE7;&#x7EED;&#x7814;&#x7A76;&#xFF0C;&#x4E5F;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x80FD;&#x7814;&#x7A76;&#xFF0C;&#x7814;&#x7A76;&#x51FA;&#x4EC0;&#x4E48;&#x597D;&#x73A9;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6216;&#x8005;&#x52A8;&#x753B;&#x5199;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x5206;&#x4EAB;&#xFF01;</p><h2 id="articleHeader11">5.&#x9E21;&#x808B;&#x9009;&#x62E9;</h2><p><strong>&#x5728;&#x5199;css3&#x4EE3;&#x7801;&#x5E93;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4E5F;&#x53D1;&#x73B0;&#x5C01;&#x88C5;css3&#x7684;&#x4E00;&#x4E2A;&#x9E21;&#x808B;&#x60C5;&#x51B5;&#x3002;</strong></p><p>1.css3&#x7684;&#x6548;&#x679C;&#x592A;&#x8FC7;&#x4E8E;&#x7075;&#x6D3B;&#xFF0C;&#x591A;&#x6837;&#xFF0C;&#x5C01;&#x88C5;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x51FA;&#x73B0;&#x4F17;&#x53E3;&#x96BE;&#x8C03;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4EE5;&#x53CA;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x6548;&#x679C;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x6548;&#x679C;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x4F46;&#x5C31;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x662F;&#x8BF4;&#x5C01;&#x88C5;&#x7684;&#x5E93;&#x5E76;&#x4E0D;&#x9002;&#x5408;&#x7528;&#x5728;&#x9879;&#x76EE;&#x4E0A;&#x3002;</p><p>2.&#x8FD8;&#x6709;&#x4E00;&#x70B9;&#x5728;&#x4E8E;&#xFF0C;css3&#x6548;&#x679C;&#x57FA;&#x672C;&#x4E0A;&#x6BCF;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x90FD;&#x662F;&#x6709;&#x7528;&#x5230;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x5E38;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5E73;&#x5E38;&#x9879;&#x76EE;&#x8981;&#x7528;&#x5230;&#x7684;css3&#x6548;&#x679C;&#x6700;&#x591A;&#x4E5F;&#x5C31;10&#x4E2A;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x4E0D;&#x96BE;&#xFF0C;&#x624B;&#x5199;&#x5F88;&#x5FEB;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#xFF0C;&#x6839;&#x672C;&#x6CA1;&#x5FC5;&#x8981;&#x53BB;&#x5F15;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x6216;&#x8005;&#x5E93;&#x3002;</p><p><strong>&#x4F46;&#x662F;&#x6700;&#x540E;&#x6211;&#x8FD8;&#x662F;&#x575A;&#x6301;&#x5199;&#x4E0B;&#x53BB;&#x4E86;&#xFF0C;&#x539F;&#x56E0;&#x5982;&#x4E0B;</strong></p><p>1.&#x5982;&#x679C;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#xFF0C;&#x5BF9;&#x52A8;&#x753B;&#x6548;&#x679C;&#x7684;&#x8981;&#x6C42;&#x57FA;&#x672C;&#x4E0D;&#x4F1A;&#x8FBE;&#x5230;&#x975E;&#x5E38;&#x7684;&#x4E25;&#x683C;&#x7684;&#x5730;&#x6B65;&#xFF0C;&#x6211;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x591A;&#x5F15;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x589E;&#x52A0;&#x6211;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x538B;&#x7F29;&#x8FC7;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x53EF;&#x80FD;&#x53EA;&#x6709;10K&#x5DE6;&#x53F3;&#xFF0C;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x3002;</p><p>2.&#x5C31;&#x7B97;&#x5728;&#x9879;&#x76EE;&#x7528;&#x4E0D;&#x4E0A;&#xFF0C;&#x6211;&#x4E5F;&#x53EF;&#x4EE5;&#x5F53;&#x4F5C;&#x662F;&#x7EC3;&#x624B;&#xFF0C;&#x5B66;&#x4E60;&#x7684;&#x4F5C;&#x7528;&#x3002;&#x5982;&#x679C;&#x4EE5;&#x540E;&#x9879;&#x76EE;&#x9700;&#x8981;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x5373;&#x4F7F;&#x52A8;&#x753B;&#x6548;&#x679C;&#x8DDF;&#x6211;&#x5C01;&#x88C5;&#x7684;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x6211;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x7740;&#x6765;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x3002;</p><p>3.&#x5C31;&#x7B97;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x6CA1;&#x4F7F;&#x7528;&#x4E0A;&#x8FD9;&#x4E2A;&#x5E93;&#xFF0C;&#x4E07;&#x4E00;&#x6709;&#x4E9B;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x5199;&#x8FC7;&#xFF0C;&#x4F46;&#x662F;&#x5FD8;&#x4E86;&#x600E;&#x4E48;&#x5199;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x56DE;&#x5934;&#x770B;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#xFF01;</p><p>4.&#x5982;&#x679C;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x77E5;&#x9053;&#x653E;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x597D;&#xFF0C;&#x8FD9;&#x4E2A;&#x5E93;&#xFF0C;&#x4E5F;&#x80FD;&#x8D77;&#x5230;&#x4E00;&#x5B9A;&#x7684;&#x53C2;&#x8003;&#x4F5C;&#x7528;&#xFF01;</p><p>5.&#x73B0;&#x5728;&#x591A;&#x5199;&#x51E0;&#x4E2A;&#xFF0C;&#x8BF4;&#x4E0D;&#x5B9A;&#x8D77;&#x5230;&#x4E00;&#x4E2A;&#x53D1;&#x6563;&#x601D;&#x7EF4;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x5199;&#x4E86;&#x8FD9;&#x4E9B;&#x6548;&#x679C;&#xFF0C;&#x60F3;&#x5230;&#x4E86;&#x53E6;&#x4E00;&#x4E9B;&#x6548;&#x679C;&#x600E;&#x4E48;&#x5199;&#xFF0C;&#x6216;&#x8005;&#x60F3;&#x5230;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x53EF;&#x4EE5;&#x5199;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x975E;&#x5E38;&#x597D;&#x7684;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x548C;&#x6536;&#x83B7;&#xFF01;</p><h2 id="articleHeader12">6.&#x5C0F;&#x7ED3;</h2><p>&#x597D;&#x4E86;&#xFF0C;css3&#x7684;&#x4EE3;&#x7801;&#x5E93;&#x5C01;&#x88C5;&#x5230;&#x8FD9;&#x91CC;&#x5C31;&#x5DEE;&#x4E0D;&#x591A;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x80FD;&#x770B;&#x5B8C;&#x5168;&#x7BC7;&#xFF0C;&#x4F60;&#x5DF2;&#x7ECF;&#x662F;&#x52C7;&#x58EB;&#x4E86;&#xFF0C;&#x8BC1;&#x660E;&#x4F60;&#x5F88;&#x6709;&#x8010;&#x5FC3;&#xFF0C;&#x770B;&#x5B8C;&#x9A6C;&#x4E0A;&#x638C;&#x63E1;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x4E8E;&#x5927;&#x5BB6;&#x6765;&#x8BF4;&#x95EE;&#x9898;&#x4E0D;&#x5927;&#xFF0C;&#x6BD5;&#x7ADF;&#x4E0D;&#x662F;&#x4EC0;&#x4E48;&#x903B;&#x8F91;&#x6027;&#x5F3A;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x6211;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#x867D;&#x7136;&#x90FD;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x4EE5;&#x540E;&#x80AF;&#x5B9A;&#x4E5F;&#x662F;&#x8981;&#x4FEE;&#x6539;&#x5B8C;&#x5584;&#x7684;(&#x81F3;&#x5C11;&#x770B;&#x6E90;&#x7801;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x81EA;&#x5DF1;&#x770B;&#x5F97;&#x90FD;&#x6709;&#x70B9;&#x4E71;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x65F6;&#x4E4B;&#x95F4;&#x53C8;&#x4E0D;&#x77E5;&#x9053;&#x8BE5;&#x5982;&#x679C;&#x6574;&#x7406;&#xFF0C;&#x5C31;&#x5148;&#x653E;&#x4E0A;&#x53BB;&#x4E86;)&#x3002;&#x8BDD;&#x8BF4;&#x56DE;&#x6765;&#xFF0C;&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x7684;&#x6848;&#x4F8B;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x5230;&#x5927;&#x5BB6;&#xFF0C;&#x6700;&#x7406;&#x60F3;&#x5C31;&#x662F;&#x80FD;&#x8D77;&#x5230;&#x53D1;&#x6563;&#x601D;&#x7EF4;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x6211;&#x7684;&#x6848;&#x4F8B;&#xFF0C;&#x80FD;&#x8BA9;&#x5927;&#x5BB6;&#x77E5;&#x9053;&#x5176;&#x5B83;&#x7684;&#x4E00;&#x4E9B;&#x52A8;&#x753B;&#x600E;&#x4E48;&#x505A;&#xFF0C;&#x6216;&#x8005;&#x60F3;&#x5230;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x770B;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;web&#x524D;&#x7AEF;&#x8FD9;&#x4E00;&#x884C;&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#x5C31;&#x662F;&#x591A;&#x7EC3;&#xFF0C;&#x5927;&#x5BB6;&#x9664;&#x4E86;&#x770B;&#x522B;&#x4EBA;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x535A;&#x5BA2;&#x4E4B;&#x5916;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x591A;&#x7EC3;&#xFF0C;&#x591A;&#x5199;&#xFF0C;&#x8FD9;&#x6837;&#x8FDB;&#x6B65;&#x624D;&#x4F1A;&#x66F4;&#x5FEB;&#xFF0C;&#x77E5;&#x8BC6;&#x624D;&#x4F1A;&#x8BB0;&#x5F97;&#x66F4;&#x7262;&#x3002;<br>&#x6700;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#x6216;&#x8005;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#x3002;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x968F;&#x65F6;&#x7ED9;&#x60A8;&#x5B9D;&#x8D35;&#x7684;&#x5EFA;&#x8BAE;&#x6211;&#xFF01;&#x9879;&#x76EE;&#x6211;&#x4E5F;&#x653E;&#x5230;github&#x4E0A;&#x9762;&#x4E86;&#xFF01;&#x6709;&#x9700;&#x8981;&#x7684;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x4E0B;&#xFF0C;star&#x4E0B;<a href="https://github.com/chenhuiYj/ec-css" rel="nofollow noreferrer" target="_blank">ec-css</a>&#xFF01;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写自己的代码库(css3常用动画的实现)

## 原文链接
[https://segmentfault.com/a/1190000010640099](https://segmentfault.com/a/1190000010640099)


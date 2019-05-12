---
title: '《CSS世界》笔记四：流的保护与破坏' 
date: 2018-11-17 14:34:54
hidden: true
slug: 5kro5ic43cg
categories: [reprint]
---

{{< raw >}}
<p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015913922">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E09;&#xFF1A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4E0E;&#x5BF9;&#x9F50;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015960615" target="_blank">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E94;&#xFF1A;CSS&#x5C42;&#x53E0;&#x89C4;&#x5219;&#x53CA;&#x5143;&#x7D20;&#x9690;&#x85CF;</a></p><h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x539F;&#x672C;&#x535A;&#x5BA2;&#x540D;&#x4E3A;&#x201C;&#x6D6E;&#x52A8;&#x4E0E;&#x5B9A;&#x4F4D;&#x201D;&#xFF0C;&#x4F46;&#x662F;&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B2C;&#x516D;&#x7AE0;&#x8282;&#x7684;&#x5185;&#x5BB9;&#x4E0D;&#x4EC5;&#x6709;&#x6D6E;&#x52A8;&#x5B9A;&#x4F4D;&#xFF0C;&#x5F88;&#x5927;&#x4E00;&#x90E8;&#x5206;&#x7BC7;&#x5E45;&#x90FD;&#x5728;&#x8BB2;BFC&#x548C;overflow&#x3002;&#x66F4;&#x5438;&#x5F15;&#x4EBA;&#x7684;&#x662F;&#xFF0C;&#x4F5C;&#x8005;&#x5C06;float/absolute/relative&#x5F62;&#x5BB9;&#x4E3A;&#x201C;&#x9B54;&#x754C;&#x4E09;&#x5144;&#x5F1F;&#x201D;&#xFF0C;&#x5C06;&#x539F;&#x672C;&#x67AF;&#x71E5;&#x7684;&#x7406;&#x8BBA;&#x77E5;&#x8BC6;&#x786C;&#x751F;&#x751F;&#x53D8;&#x6210;&#x4E86;&#x7384;&#x5E7B;&#x5C0F;&#x8BF4;&#x3002;</p><blockquote><code>absolute</code>&#x548C;<code>float</code>&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x201C;&#x540C;&#x7236;&#x5F02;&#x6BCD;&#x201D;&#x7684;&#x5144;&#x5F1F;&#x5173;&#x7CFB;&#x3002;&#x5B83;&#x4EEC;&#x7684;&#x7236;&#x4EB2;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x4EBA;&#xFF0C;&#x662F;CSS&#x4E16;&#x754C;&#x7684;&#x5927;&#x9B54;&#x738B;&#xFF0C;&#x5C5E;&#x4E8E;&#x9B54;&#x754C;;&#x4F46;&#x6BCD;&#x4EB2;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x4EBA;&#xFF0C;<code>absolute</code>&#x7684;&#x6BCD;&#x4EB2;&#x6765;&#x81EA;&#x9B54;&#x754C;&#xFF0C;&#x800C; <code>float</code>&#x7684;&#x6BCD;&#x4EB2;&#x6765;&#x81EA;&#x4EBA;&#x754C;<p>&#x5982;&#x679C;&#x8BF4;<code>float</code>&#x548C;<code>absolute</code>&#x662F;&#x540C;&#x7236;&#x5F02;&#x6BCD;&#x7684;&#x5144;&#x5F1F;&#x5173;&#x7CFB;&#xFF0C;&#x90A3;&#x4E48;<code>relative</code>&#x5219;&#x662F;<code>absolute</code>&#x7684;&#x4EB2;&#x5927;&#x54E5;</p><p>&#x5F53;&#x5E74;&#x9B54;&#x754C;&#x5723;&#x6BCD;<code>position</code>&#x751F;&#x4E86;&#x597D;&#x51E0;&#x4E2A;&#x513F;&#x5B50;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x6CD5;&#x529B;&#x5F88;&#x5F3A;&#x4E5F;&#x5F88;&#x9738;&#x9053;&#x7684;<code>absolute</code>&#xFF0C;&#x8003;&#x8651;&#x5230;&#x65E5;&#x540E;<code>absolute</code>&#x4F1A;&#x627E;<code>float</code>&#x7684;&#x9EBB;&#x70E6;&#x800C;&#x53BB;&#x6B63;&#x5E38;&#x6D41;&#x4E16;&#x754C;&#xFF0C;&#x4EE5;&#x5176;&#x4E2A;&#x6027;&#x548C;&#x9738;&#x9053;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x4E00;&#x5B9A;&#x4F1A;&#x5F71;&#x54CD;&#x6B63;&#x5E38;&#x6D41;&#x4E16;&#x754C;&#x7684;&#x79E9;&#x5E8F;&#xFF0C;&#x4E8E;&#x662F;&#x5723;&#x6BCD;<code>position</code>&#x8BA9;&#x5176;&#x6027;&#x683C;&#x6566;&#x5B9E;&#x7684;&#x5927;&#x513F;&#x5B50;<code>relative</code>&#x76F4;&#x63A5;&#x5728;&#x6B63;&#x5E38;&#x6D41;&#x4E16;&#x754C;&#x751F;&#x6D3B;&#xFF0C;&#x5E2E;&#x5FD9;&#x76EF;&#x7740;<code>absolute</code>&#xFF0C;&#x4E0D;&#x8981;&#x8BA9;<code>absolute</code>&#x8FD9;&#x4E2A;&#x5C0F;&#x9B54;&#x9B3C;&#x5230;&#x5904;&#x60F9;&#x662F;&#x751F;&#x975E;</p></blockquote><h2 id="articleHeader1">&#x4E00;&#x3001;&#x6D6E;&#x52A8;float&#x4E0E;BFC</h2><h3 id="articleHeader2">1.1 &#x6D6E;&#x52A8;</h3><p><strong>&#x6D6E;&#x52A8;&#x672C;&#x8D28;&#xFF1A;&#x5B9E;&#x73B0;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6548;&#x679C;</strong></p><p>&#x73B0;&#x9636;&#x6BB5;&#x4F7F;&#x7528;&#x6D6E;&#x52A8;&#x4E00;&#x822C;&#x662F;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x76D2;&#x5B50;&#x6C34;&#x5E73;&#x663E;&#x793A;&#xFF08;&#x5DE6;&#x53F3;&#x4E24;&#x680F;&#x5E03;&#x5C40;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x5F80;&#x5F80;&#x4F1A;&#x9020;&#x6210;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7236;&#x76D2;&#x5B50;&#x7684;&#x584C;&#x9677;&#xFF1B;&#x90A3;&#x4E48;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x7684;&#x5F71;&#x54CD;&#x5462;&#xFF1F;</p><p>&#x7F51;&#x4E0A;&#x968F;&#x610F;&#x767E;&#x5EA6;&#x5373;&#x53EF;&#x67E5;&#x8BE2;&#x5230;<a href="https://segmentfault.com/a/1190000010160251">&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x7684;&#x65B9;&#x6CD5;</a>&#xFF1A;</p><ol><li>&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;overflow&#x5C5E;&#x6027;&#x6765;&#x6E05;&#x9664;&#x6D6E;&#x52A8;</li><li>&#x4F7F;&#x7528;&#x989D;&#x5916;&#x6807;&#x7B7E;&#x6CD5;</li><li>&#x4F2A;&#x5143;&#x7D20;&#x6E05;&#x9664;</li></ol><p>&#x4E0A;&#x9762;2&#x3001;3&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x7528;clear&#x8FDB;&#x884C;&#x6E05;&#x9664;&#xFF0C;&#x800C;<strong>clear&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x5C5E;&#x6027;&#x672C;&#x8D28;</strong>&#xFF1A;clear &#x5C5E;&#x6027;&#x662F;&#x8BA9;&#x81EA;&#x8EAB;&#x4E0D;&#x80FD;&#x548C;<strong>&#x524D;&#x9762;&#x7684;&#x6D6E;&#x52A8;&#x5143;&#x7D20;</strong>&#x76F8;&#x90BB;&#xFF0C;&#x4ECE;&#x800C;&#x505A;&#x5230;&#x4E86;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x7684;&#x6548;&#x679C;&#x3002;&#x4F8B;&#x5B50;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ul&gt;li*7 */

li {
    width: 20px;
    height: 20px;
    background-color: #ccc;
    margin: 5px;
    float: left;
}
li:nth-of-type(3) {
    clear: both;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* ul&gt;li*7 */</span>

<span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span> {
    <span class="hljs-attribute">clear</span>: both;
}</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe2zQ?w=592&amp;h=172" src="https://static.alili.tech/img/bVbe2zQ?w=592&amp;h=172" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x800C;&#x201C;&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;overflow&#x5C5E;&#x6027;&#x201D;&#x7684;&#x65B9;&#x5F0F;&#x5219;&#x662F;&#x5229;&#x7528;&#x4E86;BFC&#x7684;&#x7279;&#x6027;&#xFF08;&#x4E0B;&#x9762;&#x5C06;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;&#xFF09;</p><h3 id="articleHeader3">1.2 &#x7ED3;&#x754C;BFC</h3><p><code>BFC</code>&#x5168;&#x79F0;&#x4E3A;<code>block formatting context</code>&#xFF0C;&#x4E2D;&#x6587;&#x4E3A;&#x201C;&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#x201D;&#x3002;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x8FD8;&#x6709;<code>IFC</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>inline formatting context</code>&#xFF0C;&#x4E2D;&#x6587;&#x4E3A;&#x201C;&#x5185;&#x8054;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x201D;</p><blockquote><strong>BFC&#x8868;&#x73B0;&#x539F;&#x5219;</strong>&#xFF1A;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5177;&#x6709; BFC&#xFF0C;&#x5185;&#x90E8;&#x5B50;&#x5143;&#x7D20;&#x518D;&#x600E;&#x4E48;&#x7FFB;&#x6C5F;&#x5012;&#x6D77;&#x3001;&#x7FFB;&#x4E91;&#x8986;&#x96E8;&#xFF0C;&#x90FD;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5916;&#x90E8;&#x7684;&#x5143;&#x7D20;&#x3002;&#x6240;&#x4EE5;&#xFF0C;BFC &#x5143;&#x7D20;&#x662F;<strong>&#x4E0D;&#x53EF;&#x80FD;&#x53D1;&#x751F; margin &#x91CD;&#x53E0;</strong>&#x7684;&#xFF0C;&#x56E0;&#x4E3A; margin &#x91CD;&#x53E0;&#x662F;&#x4F1A;&#x5F71;&#x54CD;&#x5916;&#x9762;&#x7684;&#x5143;&#x7D20;&#x7684;&#xFF1B;BFC &#x5143;&#x7D20;<strong>&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x6E05;&#x9664;&#x6D6E;&#x52A8;</strong>&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x4E0D;&#x6E05;&#x9664;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x6D6E;&#x52A8;&#x5219;&#x7236;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x584C;&#x9677;&#xFF0C;&#x5FC5;&#x7136;&#x4F1A;&#x5F71;&#x54CD;&#x540E;&#x9762;&#x5143;&#x7D20;&#x5E03;&#x5C40;&#x548C;&#x5B9A;&#x4F4D;&#xFF0C;&#x8FD9;&#x663E;&#x7136;&#x6709;&#x8FDD; BFC &#x5143;&#x7D20;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5916;&#x90E8;&#x5143;&#x7D20;&#x7684;&#x8BBE;&#x5B9A;</blockquote><p><strong>&#x5982;&#x4F55;&#x89E6;&#x53D1;BFC&#xFF1A;</strong></p><ol><li><code>&lt;html&gt;</code>&#x6839;&#x5143;&#x7D20;</li><li>float &#x7684;&#x503C;&#x4E0D;&#x4E3A; none</li><li>overflow &#x7684;&#x503C;&#x4E3A; auto&#x3001;scroll &#x6216; hidden</li><li>display &#x7684;&#x503C;&#x4E3A; table-cell&#x3001;table-caption &#x548C; inline-block &#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;</li><li>position &#x7684;&#x503C;&#x4E0D;&#x4E3A; relative &#x548C; static</li></ol><p>&#x56E0;&#x6B64;&#xFF1A;&#x53EA;&#x8981;&#x6EE1;&#x8DB3;&#x4E0A;&#x9762;&#x4EFB;&#x4F55;&#x4E00;&#x6761;&#xFF08;&#x89E6;&#x53D1;&#x4E86;BFC&#xFF09;&#xFF0C;&#x5143;&#x7D20;&#x5C31;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;margin&#x91CD;&#x53E0;&#x548C;float&#x5E26;&#x6765;&#x7684;&#x201C;&#x9AD8;&#x5EA6;&#x584C;&#x9677;&#x201D;&#x95EE;&#x9898;</p><p>&#x5F20;&#x5927;&#x5927;&#x5E03;&#x62C9;&#x5E03;&#x62C9;&#x7528;&#x4E86;&#x5927;&#x91CF;&#x7684;&#x7BC7;&#x5E45;&#x5BF9;&#x6BD4;&#x4E86;&#x5B9E;&#x73B0;BFC&#x7684;&#x5404;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x6700;&#x540E;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#xFF1A;<code>overflow&#xFF1A;hidden</code><strong>&#x662F;&#x89E6;&#x53D1;BFC&#x6700;&#x7406;&#x60F3;&#x526F;&#x4F5C;&#x7528;&#x6700;&#x5C0F;&#x7684;&#x65B9;&#x5F0F;</strong></p><h3 id="articleHeader4">1.3 float+BFC&#x5B9E;&#x73B0;&#x5065;&#x58EE;&#x7684;&#x4E24;&#x680F;&#x5E03;&#x5C40;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;father&quot;&gt;
    &lt;img src=&quot;1.jpg&quot;&gt;
    &lt;p class=&quot;bfc&quot;&gt;&#x6211;&#x662F;&#x5E05;&#x54E5;&#xFF0C;&#x597D;&#x5DE7;&#x554A;&#xFF0C;&#x6211;&#x4E5F;&#x662F;&#x5E05;&#x54E5;&#xFF0C;&#x539F;&#x6765;&#x770B;&#x8FD9;&#x7BC7;&#x535A;&#x5BA2;&#x7684;&#x4EBA;&#x90FD;&#x662F;&#x5E05;&#x54E5;~&lt;/p&gt;
&lt;/div&gt;

.father {
    max-width: 200px;
    border: 1px solid #444;
}
.father img {
    float:left;
    width: 60px;
    margin-right: 10px;
}
.bfc {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">father</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;1<span class="hljs-selector-class">.jpg</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">p</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">bfc</span>&quot;&gt;&#x6211;&#x662F;&#x5E05;&#x54E5;&#xFF0C;&#x597D;&#x5DE7;&#x554A;&#xFF0C;&#x6211;&#x4E5F;&#x662F;&#x5E05;&#x54E5;&#xFF0C;&#x539F;&#x6765;&#x770B;&#x8FD9;&#x7BC7;&#x535A;&#x5BA2;&#x7684;&#x4EBA;&#x90FD;&#x662F;&#x5E05;&#x54E5;~&lt;/<span class="hljs-selector-tag">p</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.father</span> {
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#444</span>;
}
<span class="hljs-selector-class">.father</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.bfc</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5C55;&#x793A;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe2Ab?w=772&amp;h=368" src="https://static.alili.tech/img/bVbe2Ab?w=772&amp;h=368" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x539F;&#x7406;&#xFF1A;&#x5229;&#x7528;BFC&#x7684;&#x7ED3;&#x754C;&#x7279;&#x6027;&#x907F;&#x514D;&#x4E86;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#xFF08;&#x6D6E;&#x52A8;&#xFF09;&#xFF0C;&#x5B9E;&#x73B0;&#x5DE6;&#x4FA7;&#x56FA;&#x5B9A;&#xFF0C;&#x53F3;&#x4FA7;&#x81EA;&#x9002;&#x5E94;&#x7684;&#x4E24;&#x680F;&#x5E03;&#x5C40;</p><h2 id="articleHeader5">&#x4E8C;&#x3001;overflow&#x5C5E;&#x6027;</h2><p>&#x518D;&#x6B21;&#x58F0;&#x660E;&#xFF1A;<strong>overflow:hidden&#x662F;&#x89E6;&#x53D1;BFC&#x7684;&#x6700;&#x4F73;&#x7ED3;&#x754C;</strong></p><h3 id="articleHeader6">2.1 overflow&#x4E0E;&#x6EDA;&#x52A8;&#x6761;</h3><p><strong>&#x6EDA;&#x52A8;&#x6761;&#x76F8;&#x5173;&#x77E5;&#x8BC6;</strong></p><blockquote><strong>&#x79FB;&#x52A8;&#x7AEF;</strong>&#x7684;&#x5C4F;&#x5E55;&#x5C3A;&#x5BF8;&#x672C;&#x8EAB;&#x5C31;&#x6709;&#x9650;&#xFF0C;<strong>&#x6EDA;&#x52A8;&#x6761;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x60AC;&#x6D6E;&#x6A21;&#x5F0F;</strong>&#xFF0C;&#x4E0D;&#x4F1A;&#x5360;&#x636E;&#x53EF;&#x7528;&#x5BBD;&#x5EA6;&#xFF0C;&#x4F46;&#x662F;&#x5728;<strong>PC&#x7AEF;</strong>&#xFF0C;&#x5C24;&#x5176;Windows&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x4E0B;&#xFF0C;&#x51E0;&#x4E4E;&#x6240;&#x6709;&#x6D4F;&#x89C8;&#x5668;&#x7684;<strong>&#x6EDA;&#x52A8;&#x680F;&#x90FD;&#x4F1A;&#x5360;&#x636E;&#x5BBD;&#x5EA6;</strong>&#xFF0C;&#x800C;&#x4E14;&#x8FD9;&#x4E2A;&#x5BBD;&#x5EA6;<strong>&#x5927;&#x5C0F;&#x662F;&#x56FA;&#x5B9A;&#x7684;</strong></blockquote><p><strong>&#x5982;&#x4F55;&#x83B7;&#x53D6;&#x6D4F;&#x89C8;&#x5668;&#x6EDA;&#x52A8;&#x680F;&#x5BBD;&#x5EA6;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box&quot;&gt;
    &lt;div id=&quot;in&quot; class=&quot;in&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

.box { width: 400px; overflow: scroll; }

console.log(400 - document.getElementById(&quot;in&quot;).clientWidth);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">box</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">id</span>=&quot;<span class="hljs-selector-tag">in</span>&quot; <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">in</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.box</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>; <span class="hljs-attribute">overflow</span>: scroll; }

<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(400 <span class="hljs-selector-tag">-</span> <span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(&quot;<span class="hljs-selector-tag">in</span>&quot;)<span class="hljs-selector-class">.clientWidth</span>);</code></pre><p><strong>&#x81EA;&#x5B9A;&#x4E49;&#x6EDA;&#x52A8;&#x6761;&#x5C5E;&#x6027;</strong>&#xFF1A;</p><ul><li>&#x6574;&#x4F53;&#x90E8;&#x5206;&#xFF0C;::-webkit-scrollbar;</li><li>&#x4E24;&#x7AEF;&#x6309;&#x94AE;&#xFF0C;::-webkit-scrollbar-button;</li><li>&#x5916;&#x5C42;&#x8F68;&#x9053;&#xFF0C;::-webkit-scrollbar-track;</li><li>&#x5185;&#x5C42;&#x8F68;&#x9053;&#xFF0C;::-webkit-scrollbar-track-piece;</li><li>&#x6EDA;&#x52A8;&#x6ED1;&#x5757;&#xFF0C;::-webkit-scrollbar-thumb;</li><li>&#x8FB9;&#x89D2;&#xFF0C;::-webkit-scrollbar-corner&#x3002;</li></ul><p>&#x5E73;&#x65F6;&#x5F00;&#x53D1;&#x4E2D;<strong>&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::-webkit-scrollbar { /* &#x8840;&#x69FD;&#x5BBD;&#x5EA6; */
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-thumb { /* &#x62D6;&#x52A8;&#x6761; */
    background-color: rgba(0,0,0,.3);
    border-radius: 6px;
}
::-webkit-scrollbar-track { /* &#x80CC;&#x666F;&#x69FD; */
    background-color: #ddd;
    border-radius: 6px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">::-webkit-scrollbar</span> { <span class="hljs-comment">/* &#x8840;&#x69FD;&#x5BBD;&#x5EA6; */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
}
<span class="hljs-selector-pseudo">::-webkit-scrollbar-thumb</span> { <span class="hljs-comment">/* &#x62D6;&#x52A8;&#x6761; */</span>
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.3);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
}
<span class="hljs-selector-pseudo">::-webkit-scrollbar-track</span> { <span class="hljs-comment">/* &#x80CC;&#x666F;&#x69FD; */</span>
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
}</code></pre><p><strong>&#x5C0F;&#x6280;&#x5DE7;</strong>&#xFF1A;&#x5904;&#x7406;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x6761;&#x6643;&#x52A8;&#x95EE;&#x9898;&#xFF08;&#x4E00;&#x822C;&#x51FA;&#x73B0;&#x5728;&#x52A0;&#x8F7D;&#x6570;&#x636E;&#x540E;&#x8D85;&#x8FC7;&#x4E00;&#x5C4F;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
    overflow-y: scroll; /* for IE8 */
}
:root {
    overflow-y: auto;
    overflow-x: hidden;
}
:root body {
    position: absolute;
}
body {
    width: 100vw;
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">overflow-y</span>: scroll; <span class="hljs-comment">/* for IE8 */</span>
}
<span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">overflow-y</span>: auto;
    <span class="hljs-attribute">overflow-x</span>: hidden;
}
<span class="hljs-selector-pseudo">:root</span> <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">position</span>: absolute;
}
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><h3 id="articleHeader7">2.2 overflow&#x4E0E;&#x6587;&#x672C;&#x6EA2;&#x51FA;&#x70B9;&#x70B9;&#x70B9;</h3><p>&#x5355;&#x884C;&#x6587;&#x672C;&#x6EA2;&#x51FA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ell {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ell</span> {
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x591A;&#x884C;&#x6587;&#x672C;&#x6EA2;&#x51FA;&#xFF08;&#x6B64;&#x5904;&#x4E3A;2&#x884C;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ell-rows-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ell-rows-2</span> {
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">2</span>;
}</code></pre><h3 id="articleHeader8">2.3 overflow&#x4E0E;&#x951A;&#x70B9;&#x5B9A;&#x4F4D;</h3><p>&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x53EF;&#x4EE5;&#x89E6;&#x53D1;&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x884C;&#x4E3A;&#x7684;&#x53D1;&#x751F;&#xFF1A;</p><p>&#xFF08;1&#xFF09;<strong>URL&#x5730;&#x5740;&#x4E2D;&#x7684;&#x951A;&#x94FE;&#x4E0E;&#x951A;&#x70B9;&#x5143;&#x7D20;&#x5BF9;&#x5E94;&#x5E76;&#x6709;&#x4EA4;&#x4E92;&#x884C;&#x4E3A;;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;a href=&quot;#1&quot;&gt;&#x53D1;&#x5C55;&#x5386;&#x7A0B;&gt;&lt;/a&gt;

&lt;h2 id=&quot;1&quot;&gt;&#x53D1;&#x5C55;&#x5386;&#x7A0B;&lt;/h2&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#1&quot;</span>&gt;</span>&#x53D1;&#x5C55;&#x5386;&#x7A0B;&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>&#x53D1;&#x5C55;&#x5386;&#x7A0B;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></code></pre><p>&#x5229;&#x7528;&#x4E0A;&#x9762;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x70B9;&#x51FB;a&#x6807;&#x7B7E;&#xFF0C;&#x80FD;&#x591F;&#x4F7F;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x5230;h2&#x5904;</p><p>&#xFF08;2&#xFF09;focus &#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#xFF0C;<strong>&#x53EF;focus&#x7684;&#x951A;&#x70B9;&#x5143;&#x7D20;&#x5904;&#x4E8E;focus&#x72B6;&#x6001;</strong></p><p><strong>&#x201C;focus &#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x201D;&#x6307;&#x7684;&#x662F;&#x7C7B;&#x4F3C;&#x94FE;&#x63A5;&#x6216;&#x8005;&#x6309;&#x94AE;&#x3001;&#x8F93;&#x5165;&#x6846;&#x7B49;&#x53EF;&#x4EE5;&#x88AB; focus &#x7684;&#x5143;&#x7D20;&#x5728;&#x88AB; focus &#x65F6;&#x53D1;&#x751F;&#x7684;&#x9875;&#x9762;&#x91CD;&#x5B9A;&#x4F4D;&#x73B0;&#x8C61;</strong>&#x3002;&#x4E3E;&#x4E2A;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5728; PC &#x7AEF;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; Tab &#x5FEB;&#x901F;&#x5B9A;&#x4F4D;&#x53EF; focus &#x7684;&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7684;&#x5143;&#x7D20;&#x6B63;&#x597D;&#x5728;&#x5C4F;&#x5E55;&#x4E4B;&#x5916;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x91CD;&#x5B9A;&#x4F4D;&#xFF0C;&#x5C06;&#x8FD9;&#x4E2A;&#x5C4F;&#x5E55;&#x4E4B;&#x5916;&#x7684;&#x5143;&#x7D20;&#x5B9A;&#x4F4D;&#x5230;&#x5C4F;&#x5E55;&#x4E4B;&#x4E2D;</p><p>&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x7684;&#x4E24;&#x4E2A;&#x5C0F;&#x6848;&#x4F8B;&#xFF0C;&#x4EE5;&#x4F9B;&#x53C2;&#x8003;&#xFF1A;</p><ol><li><a href="https://codepen.io/lxyc/pen/NBOoGr" rel="nofollow noreferrer" target="_blank">&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#xFF1A;&#x8FD4;&#x56DE;&#x9875;&#x9762;&#x9876;&#x90E8;</a><button class="btn btn-xs btn-default ml10 preview" data-url="lxyc/pen/NBOoGr" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></li><li><a href="http://demo.cssworld.cn/6/4-2.php" rel="nofollow noreferrer" target="_blank">&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#xFF1A;&#x7B80;&#x6613;tab&#x5207;&#x6362;</a></li></ol><p>&#x6CE8;&#x610F;&#xFF01;&#x6CE8;&#x610F;&#xFF01;&#x6CE8;&#x610F;&#xFF01;<strong>&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86; overflow:hidden &#x58F0;&#x660E;&#xFF0C;&#x91CC;&#x9762;&#x5185;&#x5BB9;&#x9AD8;&#x5EA6;&#x6EA2;&#x51FA;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6EDA;&#x52A8;&#x4F9D;&#x7136;&#x5B58;&#x5728;&#xFF0C;&#x4EC5;&#x4EC5;&#x6EDA;&#x52A8;&#x6761;&#x4E0D;&#x5B58;&#x5728;!</strong>&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x80FD;&#x7528;&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x6216;&#x8005;js&#x63A7;&#x5236;&#x6EDA;&#x52A8;</p><h2 id="articleHeader9">&#x4E09;&#x3001;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;absolute</h2><h3 id="articleHeader10">3.1 absolute&#x7684;&#x5305;&#x542B;&#x5757;</h3><p>&#xFF08;1&#xFF09;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF1A;&#x76F8;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x4E2A;position&#x4E0D;&#x4E3A;static&#x7684;&#x7956;&#x5148;&#x5143;&#x7D20;&#xFF0C;&#x76F4;&#x5230;html</p><p>&#xFF08;2&#xFF09;&#x884C;&#x5185;&#x5143;&#x7D20;&#xFF1A;</p><ol><li>&#x5355;&#x884C;&#xFF1A;&#x5047;&#x8BBE;&#x7ED9;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x524D;&#x540E;&#x5404;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5BBD;&#x5EA6;&#x4E3A; 0 &#x7684;&#x5185;&#x8054;&#x76D2;&#x5B50;(inline box)&#xFF0C;&#x5219;&#x8FD9;&#x4E24;&#x4E2A;&#x5185;&#x8054;&#x76D2;&#x5B50;&#x7684; padding box &#x5916;&#x9762;&#x7684;&#x5305;&#x56F4;&#x76D2;&#x5C31;&#x662F;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x201C;&#x5305;&#x542B;&#x5757;&#x201D;</li><li>&#x591A;&#x884C;&#xFF1A;&#x672A;&#x5B9A;&#x4E49;&#x884C;&#x4E3A;&#xFF0C;&#x6211;&#x4EEC;&#x4EE5;chrome&#x8868;&#x73B0;&#x4E3A;&#x4E3B;(<strong>&#x7531;&#x7B2C;&#x4E00;&#x884C;&#x5F00;&#x5934;&#x548C;&#x6700;&#x540E;&#x4E00;&#x884C;&#x7ED3; &#x5C3E;&#x7684;&#x5185;&#x8054;&#x76D2;&#x5B50;&#x5171;&#x540C;&#x51B3;&#x5B9A;</strong>)</li></ol><p>&#x76F4;&#x63A5;&#x770B;&#x6982;&#x5FF5;&#x4E00;&#x822C;&#x662F;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#xFF0C;&#x4E0A;&#x56FE;&#x5427;(&#x7EA2;&#x8272;&#x865A;&#x7EBF;&#x533A;&#x57DF;&#x4E3A;&#x5305;&#x542B;&#x5757;)</p><p><span class="img-wrap"><img data-src="/img/bVbe2As?w=1172&amp;h=228" src="https://static.alili.tech/img/bVbe2As?w=1172&amp;h=228" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><strong>&#x6848;&#x4F8B;&#xFF1A;</strong>&#x57FA;&#x4E8E;&#x884C;&#x5185;&#x5143;&#x7D20;&#x5B9A;&#x4F4D;&#x7684;tips&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;tip icon&quot; data-title=&quot;&#x5220;&#x9664;&quot;&gt;&lt;/div&gt;

.icon {
    margin: 50px 0 0 50px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(http://demo.cssworld.cn/images/6/delete.png) no-repeat center;
}

.tip {
    position: relative;
    &amp;::before,
    &amp;::after {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        visibility: hidden;
    }
    &amp;::before {
        content: attr(data-title);
        top: -33px;
        padding: 2px 10px 3px;
        line-height: 18px;
        border-radius: 2px;
        background-color: #333;
        text-align: left;
        color: #fff;
        font-size: 12px;
        /* &#x5FC5;&#x987B;&#x52A0;&#xFF0C;&#x5426;&#x5219;&#x4E00;&#x67F1;&#x64CE;&#x5929; */
        white-space: nowrap;
    }
    &amp;::after {
        content: &quot;&quot;;
        border: 6px solid transparent;
        border-top-color: #333;
        top: -10px;
    }
    &amp;:hover::before,
    &amp;:hover::after {
        transition: visibility .1s .1s;
        visibility: visible;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="scss hljs"><code class="scss">&lt;<span class="hljs-selector-tag">div</span> class=&quot;tip <span class="hljs-attribute">icon</span>&quot; data-<span class="hljs-selector-tag">title</span>=&quot;&#x5220;&#x9664;&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.icon</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: url(http://demo.cssworld.cn/images/<span class="hljs-number">6</span>/delete.png) no-repeat center;
}

<span class="hljs-selector-class">.tip</span> {
    <span class="hljs-attribute">position</span>: relative;
    &amp;::before,
    &amp;::after {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">transform</span>: translateX(-<span class="hljs-number">50%</span>);
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">visibility</span>: hidden;
    }
    &amp;::before {
        <span class="hljs-attribute">content</span>: attr(data-title);
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">33px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">2px</span> <span class="hljs-number">10px</span> <span class="hljs-number">3px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">18px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-comment">/* &#x5FC5;&#x987B;&#x52A0;&#xFF0C;&#x5426;&#x5219;&#x4E00;&#x67F1;&#x64CE;&#x5929; */</span>
        <span class="hljs-attribute">white-space</span>: nowrap;
    }
    &amp;::after {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">6px</span> solid transparent;
        <span class="hljs-attribute">border-top-color</span>: <span class="hljs-number">#333</span>;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>;
    }
    &amp;:hover::before,
    &amp;:hover::after {
        <span class="hljs-attribute">transition</span>: visibility .<span class="hljs-number">1s</span> .<span class="hljs-number">1s</span>;
        <span class="hljs-attribute">visibility</span>: visible;
    }
}</code></pre><p>&#x6700;&#x7EC8;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe2AK?w=322&amp;h=180" src="https://static.alili.tech/img/bVbe2AK?w=322&amp;h=180" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader11">3.2 absolute&#x65E0;&#x4F9D;&#x8D56;&#x5B9A;&#x4F4D;</h3><p>&#x6CE8;&#x610F;&#xFF1A;<strong>absolute &#x662F;&#x975E;&#x5E38;&#x72EC;&#x7ACB;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x5176;&#x6837;&#x5F0F;&#x548C;&#x884C;&#x4E3A;&#x8868;&#x73B0;&#x4E0D;&#x4F9D;&#x8D56;&#x5176;&#x4ED6;&#x4EFB;&#x4F55; CSS &#x5C5E;&#x6027;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;</strong>&#xFF0C;&#x6B63;&#x662F;&#x57FA;&#x4E8E;&#x8FD9;&#x4E00;&#x70B9;&#x624D;&#x6709;&#x4E86;&#x65E0;&#x4F9D;&#x8D56;&#x5B9A;&#x4F4D;&#x7684;&#x5F3A;&#x5927;</p><p>&#x9996;&#x5148;&#x601D;&#x8003;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x6807;&#x51C6;&#x6D41;&#x5143;&#x7D20;&#x540E;&#x9762;&#x63A5;&#x7740;&#x4E00;&#x4E2A;absolute&#x5143;&#x7D20;&#xFF08;&#x672A;&#x8BBE;&#x7F6E;left&#x7B49;&#x65B9;&#x4F4D;&#x5C5E;&#x6027;&#xFF09;&#xFF0C;&#x6B64;&#x65F6;&#x5982;&#x4F55;&#x663E;&#x793A;&#xFF1F;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x540E;&#x53C8;&#x63A5;&#x7740;&#x4E00;&#x4E2A;&#x6807;&#x51C6;&#x6D41;&#x5143;&#x7D20;&#xFF0C;&#x6B64;&#x65F6;&#x53C8;&#x8BE5;&#x5982;&#x4F55;&#x663E;&#x793A;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;demo&quot;&gt;
    &#x54C8;&#x54C8;&#xFF0C;&#x6211;&#x5728;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x524D;&#x9762;
    &lt;span class=&quot;poa&quot;&gt;&lt;/span&gt;
    &#x5450;&#xFF01;&#x6211;&#x8FD8;&#x5728;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x540E;&#x9762;&#x5462;
&lt;/div&gt;

.poa {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 0, 0, .5);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">demo</span>&quot;&gt;
    &#x54C8;&#x54C8;&#xFF0C;&#x6211;&#x5728;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x524D;&#x9762;
    &lt;<span class="hljs-selector-tag">span</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">poa</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">span</span>&gt;
    &#x5450;&#xFF01;&#x6211;&#x8FD8;&#x5728;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x540E;&#x9762;&#x5462;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.poa</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(255, 0, 0, .5);
}</code></pre><p>&#x5C55;&#x793A;&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe2AQ?w=982&amp;h=124" src="https://static.alili.tech/img/bVbe2AQ?w=982&amp;h=124" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4EC5;&#x8BBE;&#x7F6E;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x65F6;&#xFF0C;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x4ECD;&#x4F1A;&#x4FDD;&#x6301;&#x5728;html&#x7ED3;&#x6784;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E14;&#x4E0D;&#x5360;&#x636E;&#x7A7A;&#x95F4;&#x3002;&#x7531;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;margin&#x76F8;&#x5BF9;&#x4E8E;&#x539F;&#x59CB;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x8BE5;&#x5143;&#x7D20;&#x4EE5;&#x5B9E;&#x73B0;&#x5404;&#x79CD;&#x529F;&#x80FD;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x51E0;&#x4E2A;&#x6848;&#x4F8B;&#xFF1A;</p><p>&#xFF08;1&#xFF09;<strong>&#x6848;&#x4F8B;1</strong>&#xFF1A;<a href="http://demo.cssworld.cn/6/5-5.php" rel="nofollow noreferrer" target="_blank">&#x7B80;&#x5355;&#x56FE;&#x6807;&#x5B9A;&#x4F4D;</a></p><p><span class="img-wrap"><img data-src="/img/bVbe2AR?w=1198&amp;h=120" src="https://static.alili.tech/img/bVbe2AR?w=1198&amp;h=120" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-hot {
    position: absolute;
    width: 28px;
    height: 11px;
    margin: -6px 0 0 2px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.icon-hot</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">28px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">11px</span>;
    <span class="hljs-attribute">margin</span>: -<span class="hljs-number">6px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2px</span>;
}</code></pre><p>&#xFF08;2&#xFF09;<strong>&#x6848;&#x4F8B;2</strong>&#xFF1A;<a href="http://demo.cssworld.cn/6/5-6.php" rel="nofollow noreferrer" target="_blank">&#x6821;&#x9A8C;&#x8868;&#x5355;</a></p><p><span class="img-wrap"><img data-src="/img/bVbe2AS?w=1208&amp;h=470" src="https://static.alili.tech/img/bVbe2AS?w=1208&amp;h=470" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x90AE;&#x7BB1;&#x62A5;&#x9519;&#x5C0F;&#x56FE;&#x6807; */
.icon-warn {
    position: absolute;
    margin-left: -18px;
    width: 16px; height: 20px;
    background: url(/images/6/warn.gif) no-repeat center;
}

/* &#x5B9A;&#x4F4D;&#x5728;&#x76D2;&#x5B50;&#x5916;&#x90E8;&#x7684;&#x7EA2;&#x8272;&#x661F;&#x53F7; */
.regist-star {
    position: absolute;
    margin-left: -1em;
    font-family: simsun;
    color: #f30;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* &#x90AE;&#x7BB1;&#x62A5;&#x9519;&#x5C0F;&#x56FE;&#x6807; */</span>
<span class="hljs-selector-class">.icon-warn</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">18px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(/images/6/warn.gif) no-repeat center;
}

<span class="hljs-comment">/* &#x5B9A;&#x4F4D;&#x5728;&#x76D2;&#x5B50;&#x5916;&#x90E8;&#x7684;&#x7EA2;&#x8272;&#x661F;&#x53F7; */</span>
<span class="hljs-selector-class">.regist-star</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">1em</span>;
    <span class="hljs-attribute">font-family</span>: simsun;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#f30</span>;
}</code></pre><p>&#xFF08;3&#xFF09;<strong>&#x6848;&#x4F8B;3</strong>&#xFF1A;<a href="http://demo.cssworld.cn/6/5-7.php" rel="nofollow noreferrer" target="_blank">input&#x4E2D;&#x7684;icon&#x548C;&#x4E0B;&#x62C9;</a></p><p><span class="img-wrap"><img data-src="/img/bVbe2AV?w=582&amp;h=512" src="https://static.alili.tech/img/bVbe2AV?w=582&amp;h=512" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x641C;&#x7D22;&#x6309;&#x94AE;&#x7684;&#x65E0;&#x4F9D;&#x8D56;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D; */
.search-btn {
    width: 20px; height: 20px;
    border: 9px solid #fff;
    background: #ddd url(search.png) no-repeat center;
    position: absolute; margin: 1px 0 0 -40px;
}

/* &#x4E0B;&#x62C9;&#x5217;&#x8868;&#x7684;&#x65E0;&#x4F9D;&#x8D56;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D; */
.search-datalist {
    position: absolute;
    width: 248px;
    border: 1px solid #e6e8e9;
    background-color: #fff;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* &#x641C;&#x7D22;&#x6309;&#x94AE;&#x7684;&#x65E0;&#x4F9D;&#x8D56;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D; */</span>
<span class="hljs-selector-class">.search-btn</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">9px</span> solid <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span> <span class="hljs-built_in">url</span>(search.png) no-repeat center;
    <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">margin</span>: <span class="hljs-number">1px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">40px</span>;
}

<span class="hljs-comment">/* &#x4E0B;&#x62C9;&#x5217;&#x8868;&#x7684;&#x65E0;&#x4F9D;&#x8D56;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D; */</span>
<span class="hljs-selector-class">.search-datalist</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">248px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#e6e8e9</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
}</code></pre><h3 id="articleHeader12">3.3 absolute + text-align&#x7528;&#x6CD5;</h3><p><a href="http://demo.cssworld.cn/6/5-8.php" rel="nofollow noreferrer" target="_blank"><strong>text-align &#x5C45;&#x7136;&#x53EF;&#x4EE5;&#x6539;&#x53D8; absolute &#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;</strong></a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&lt;img src=&quot;1.jpg&quot;&gt;&lt;/p&gt;

p { text-align: center; }
img { position: absolute; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">p</span>&gt;&lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;1<span class="hljs-selector-class">.jpg</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">p</span>&gt;

<span class="hljs-selector-tag">p</span> { <span class="hljs-attribute">text-align</span>: center; }
<span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">position</span>: absolute; }</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe2A0?w=702&amp;h=290" src="https://static.alili.tech/img/bVbe2A0?w=702&amp;h=290" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x539F;&#x7406;&#xFF1A;img&#x524D;&#x7684;&#x201C;&#x5E7D;&#x7075;&#x7A7A;&#x767D;&#x8282;&#x70B9;&#x201D;&#x53D7;<code>text-align:center;</code>&#x7684;&#x5F71;&#x54CD;&#x5C45;&#x4E2D;&#xFF0C;&#x56FE;&#x7247;&#x7684;&#x201C;&#x65E0;&#x4F9D;&#x8D56;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x201D;&#x5728;&#x201C;&#x5E7D;&#x7075;&#x7A7A;&#x767D;&#x8282;&#x70B9;&#x201D;&#x540E;&#x9762;</p><p><strong>&#x6848;&#x4F8B;</strong>&#xFF1A;<a href="http://demo.cssworld.cn/6/5-10.php" rel="nofollow noreferrer" target="_blank">text-align&#x5B9E;&#x73B0;&#x7684;&#x53F3;&#x5916;&#x4FA7;&#x5B9A;&#x4F4D;</a></p><p><span class="img-wrap"><img data-src="/img/bVbe2A3?w=928&amp;h=406" src="https://static.alili.tech/img/bVbe2A3?w=928&amp;h=406" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;constr&quot;&gt;
    &lt;div class=&quot;alignright&quot;&gt;
        &lt;span class=&quot;follow&quot;&gt;
            &lt;img src=&quot;circle.png&quot;&gt;
            &lt;img src=&quot;backtop.png&quot;&gt;
        &lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;

.constrcons {
    width: 80%;
    margin: auto;
    background-color: #f0f3f9;
}
.alignright {
    height: 0;
    text-align: right;
    overflow: hidden;
}
.alignright:before {
    content: &quot;\2002&quot;;
}

.follow {
    position: fixed;
    bottom: 100px;
    z-index: 1;
}
.follow &gt; img {
    display: block;
    margin: 10px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">constr</span>&quot;&gt;
    &lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">alignright</span>&quot;&gt;
        &lt;<span class="hljs-selector-tag">span</span> <span class="hljs-selector-tag">class</span>=&quot;<span class="hljs-selector-tag">follow</span>&quot;&gt;
            &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;<span class="hljs-selector-tag">circle</span><span class="hljs-selector-class">.png</span>&quot;&gt;
            &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">src</span>=&quot;<span class="hljs-selector-tag">backtop</span><span class="hljs-selector-class">.png</span>&quot;&gt;
        &lt;/<span class="hljs-selector-tag">span</span>&gt;
    &lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;/<span class="hljs-selector-tag">div</span>&gt;

<span class="hljs-selector-class">.constrcons</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f3f9</span>;
}
<span class="hljs-selector-class">.alignright</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">text-align</span>: right;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.alignright</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;\2002&quot;</span>;
}

<span class="hljs-selector-class">.follow</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.follow</span> &gt; <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
}</code></pre><p>&#x4F18;&#x52BF;&#xFF1A;icon&#x76F8;&#x5BF9;&#x4E8E;&#x4E3B;&#x4F53;&#x5185;&#x5BB9;&#x5B9A;&#x4F4D;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;html</p><h3 id="articleHeader13">3.4 absolute + clip&#x7528;&#x6CD5;</h3><p><strong>&#x526A;&#x88C1;&#x5C5E;&#x6027; clip</strong> &#x8981;&#x60F3;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;<strong>&#x5143;&#x7D20;&#x5FC5;&#x987B;&#x662F;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x6216;&#x8005;&#x56FA;&#x5B9A;&#x5B9A;&#x4F4D;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F; position &#x5C5E;&#x6027;&#x503C;&#x5FC5;&#x987B;&#x662F; absolute &#x6216;&#x8005; fixed</p><p><strong>&#x6700;&#x4F73;&#x53EF;&#x8BBF;&#x95EE;&#x6027;&#x9690;&#x85CF;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clip {
    position: absolute;
    clip: rect(0 0 0 0);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clip</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">clip</span>: <span class="hljs-built_in">rect</span>(0 0 0 0);
}</code></pre><blockquote>&#x91C7;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x9690;&#x85CF;&#x7684;&#x5143;&#x7D20;&#x539F;&#x672C;&#x7684;&#x884C;&#x4E3A;&#x7279;&#x6027;&#x4E5F;&#x5F88;&#x597D;&#x7528;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x88AB; focus&#xFF0C;&#x800C;&#x4E14;&#x975E;&#x5E38;&#x96BE;&#x5F97;&#x7684;&#x662F;&#x5C31;&#x5730;&#x526A;&#x88C1;&#xFF0C;&#x56E0;&#x4E3A;&#x5C5E;&#x4E8E;&#x201C;&#x65E0;&#x4F9D;&#x8D56;&#x7684;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x201D;</blockquote><h3 id="articleHeader14">3.5 absolute&#x6D41;&#x4F53;&#x7279;&#x6027;</h3><p><strong>&#x5F53; absolute &#x9047;&#x5230; left/top/right/bottom &#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;absolute &#x5143;&#x7D20;&#x624D;&#x771F;&#x6B63;&#x53D8;&#x6210;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;</strong></p><p>absolute<strong>&#x6D41;&#x4F53;&#x7279;&#x6027;</strong>&#x7684;&#x6761;&#x4EF6;&#x662F;&#xFF1A;<strong>&#x5BF9;&#x7ACB;&#x65B9;&#x5411;&#x540C;&#x65F6;&#x53D1;&#x751F;&#x5B9A;&#x4F4D;&#x7684;&#x65F6;&#x5019;</strong></p><ul><li>&#x5982;&#x679C;&#x8BBE;&#x7F6E;<code>left:0; right:0;</code>&#x8868;&#x73B0;&#x4E3A;&#x683C;&#x5F0F;&#x5316;&#x5BBD;&#x5EA6;&#xFF0C;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x4FDD;&#x6301;&#x6D41;&#x52A8;&#x6027;</li><li>&#x5982;&#x679C;&#x8BBE;&#x7F6E;<code>top:0; bottom:0;</code>&#x8868;&#x73B0;&#x4E3A;&#x683C;&#x5F0F;&#x5316;&#x9AD8;&#x5EA6;&#xFF0C;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x4FDD;&#x6301;&#x6D41;&#x52A8;&#x6027;</li></ul><p>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x7684;<code>margin:auto</code>&#x7684;&#x586B;&#x5145;&#x89C4;&#x5219;&#x548C;&#x666E;&#x901A;&#x6D41;&#x4F53;&#x5143;&#x7D20;&#x7684;&#x4E00;&#x6A21;&#x4E00;&#x6837;:</p><ul><li>&#x5982;&#x679C;&#x4E00;&#x4FA7;&#x5B9A;&#x503C;&#xFF0C;&#x4E00;&#x4FA7; auto&#xFF0C;auto &#x4E3A;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x5927;&#x5C0F;;</li><li>&#x5982;&#x679C;&#x4E24;&#x4FA7;&#x5747;&#x662F; auto&#xFF0C;&#x5219;&#x5E73;&#x5206;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x3002;</li></ul><p>&#x6848;&#x4F8B;&#xFF1A;<a href="https://codepen.io/lxyc/pen/pZxZeq" rel="nofollow noreferrer" target="_blank">&#x5229;&#x7528;absolute&#x7684;&#x6D41;&#x4F53;&#x7279;&#x6027;&#x5B9E;&#x73B0;&#x5143;&#x7D20;&#x7684;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;</a><button class="btn btn-xs btn-default ml10 preview" data-url="lxyc/pen/pZxZeq" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".element {
    width: 300px;
    height: 200px;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.element</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}</code></pre><h2 id="articleHeader15">&#x56DB;&#x3001;&#x603B;&#x7ED3;</h2><ul><li>&#x6D6E;&#x52A8;float&#x4EE5;&#x53CA;clear&#x5C5E;&#x6027;</li><li>BFC&#x89E6;&#x53D1;&#x6761;&#x4EF6;&#x53CA;&#x5229;&#x7528;BFC&#x5B9E;&#x73B0;&#x66F4;&#x4E3A;&#x5065;&#x58EE;&#x7684;&#x5E03;&#x5C40;</li><li>overflow&#x5C5E;&#x6027;</li><li>&#x5185;&#x8054;&#x76D2;&#x5B50;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;&#x5305;&#x542B;&#x5757;</li><li>absolute&#x65E0;&#x4F9D;&#x8D56;&#x5B9A;&#x4F4D;</li><li>absolute&#x88C1;&#x526A;&#x53CA;&#x6D41;&#x4F53;&#x7279;&#x6027;</li></ul><p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015913922">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E09;&#xFF1A;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4E0E;&#x5BF9;&#x9F50;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015960615" target="_blank">&#x300A;CSS&#x4E16;&#x754C;&#x300B;&#x7B14;&#x8BB0;&#x4E94;&#xFF1A;CSS&#x5C42;&#x53E0;&#x89C4;&#x5219;&#x53CA;&#x5143;&#x7D20;&#x9690;&#x85CF;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《CSS世界》笔记四：流的保护与破坏

## 原文链接
[https://segmentfault.com/a/1190000015940907](https://segmentfault.com/a/1190000015940907)


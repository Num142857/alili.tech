---
title: 前端系列——查找字符串B的字符任意一种组合是否是字符串A的子串
reprint: true
categories: reprint
abbrlink: ff1459e3
date: 2018-11-07 02:30:13
---

{{% raw %}}
<h3 id="articleHeader0">&#x9898;&#x76EE;&#x8981;&#x6C42;</h3><p>&#x8FD9;&#x9053;&#x7B97;&#x6CD5;&#x9898;&#x5728;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x4E2D;&#x53EF;&#x80FD;&#x9047;&#x5230;&#xFF0C;&#x636E;&#x8BF4;&#x67D0;&#x6761;&#x51FA;&#x8FC7;&#x8FD9;&#x9898;&#x3002;</p><blockquote>&#x67E5;&#x627E;&#x5B57;&#x7B26;&#x4E32;B&#x7684;&#x5B57;&#x7B26;&#x4EFB;&#x610F;&#x4E00;&#x79CD;&#x7EC4;&#x5408;&#x662F;&#x5426;&#x662F;&#x5B57;&#x7B26;&#x4E32;A&#x7684;&#x5B50;&#x4E32;&#x3002;<br>&#x4F8B;&#x5982; A=abc123&#xFF0C;B=cba&#xFF0C;&#x5219;B&#x7684;&#x5176;&#x4E2D;&#x4E00;&#x79CD;&#x7EC4;&#x5408;abc&#x662F;A&#x7684;&#x5B50;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;true&#x3002;</blockquote><h3 id="articleHeader1">&#x7B97;&#x6CD5;&#x601D;&#x8DEF;</h3><p>&#x9898;&#x76EE;&#x7684;&#x51FA;&#x5904;&#x5DF2;&#x7ECF;&#x65E0;&#x4ECE;&#x8003;&#x7A76;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4ECE;JavaScript&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x5C01;&#x88C5;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x51FD;&#x6570;&#x3002;</p><h4>&#x7A77;&#x4E3E;</h4><p>&#x4E00;&#x5F00;&#x59CB;&#x770B;&#x5230;&#x8FD9;&#x9053;&#x9898;&#xFF0C;&#x4F60;&#x4F1A;&#x60F3;&#x5230;&#x4EC0;&#x4E48;&#xFF1F;<br>&#x6211;&#x60F3;&#x5230;&#x7684;&#x662F;&#x5148;&#x5217;&#x4E3E;&#x51FA;B&#x7684;&#x6240;&#x6709;&#x6392;&#x5217;&#x7EC4;&#x5408;&#xFF0C;&#x5B58;&#x5230;&#x6570;&#x7EC4;&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x904D;&#x5386;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x7EC4;&#x5408;&#x5305;&#x542B;&#x5728;A&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#x3002;<br>&#x5982;&#x679C;&#x4ECE;&#x9898;&#x76EE;&#x7ED9;&#x51FA;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x7A77;&#x4E3E;&#xFF0C;&#x4E00;&#x5171;6&#x79CD;&#x7EC4;&#x5408;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x7A77;&#x4E3E;&#x51FA;&#x6765;&#xFF0C;&#x4F46;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x957F;&#x5EA6;&#x975E;&#x5E38;&#x5927;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;<br>&#x6240;&#x4EE5;&#xFF0C;&#x7A77;&#x4E3E;&#x7684;&#x529E;&#x6CD5;&#x88AB;&#x6211;&#x6392;&#x9664;&#x4E86;&#x3002;</p><h4>&#x6807;&#x8BB0;&#x5220;&#x9664;&#x6CD5;</h4><p>&#x8FD9;&#x540D;&#x5B57;&#x542C;&#x8D77;&#x6765;&#x5F88;&#x5947;&#x602A;&#xFF0C;&#x600E;&#x4E48;&#x4E2A;&#x601D;&#x8DEF;&#x5462;&#xFF1F;</p><p>1&#x3001;A&#x7684;&#x6392;&#x5E8F;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x53D8;&#x7684;&#xFF0C;&#x65E2;&#x7136;&#x53EF;&#x53D8;&#x7684;&#x6211;&#x4EEC;&#x5F88;&#x96BE;&#x4E0B;&#x624B;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x4ECE;&#x4E0D;&#x53D8;&#x7684;&#x5730;&#x65B9;&#x5165;&#x624B;&#xFF0C;&#x4EE5;&#x4E0D;&#x53D8;&#x5E94;&#x4E07;&#x53D8;&#x3002;</p><p>2&#x3001;&#x770B;&#x5B57;&#x7B26;&#x4E32;&#x53EF;&#x80FD;&#x4E0D;&#x592A;&#x4E60;&#x60EF;&#xFF0C;&#x6211;&#x628A;A&#x548C;B&#x90FD;&#x8F6C;&#x6362;&#x6210;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = A.split(&apos;&apos;) // [a, b, c, 1, 2, 3]
let b = B.split(&apos;&apos;) // [c, b, a]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a = A.split(<span class="hljs-string">&apos;&apos;</span>) <span class="hljs-comment">// [a, b, c, 1, 2, 3]</span>
<span class="hljs-keyword">let</span> b = B.split(<span class="hljs-string">&apos;&apos;</span>) <span class="hljs-comment">// [c, b, a]</span></code></pre><p>3&#x3001;&#x5148;&#x8FC7;&#x6EE4;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5982;&#x679C;a&#x6216;&#x8005;b&#x4E3A;&#x7A7A;&#xFF0C;&#x90A3;&#x4E48;&#x4E0D;&#x9700;&#x8981;&#x6BD4;&#x8F83;&#xFF0C;&#x8FD4;&#x56DE;false&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (a.length === 0 || b.length === 0) {
    return false
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (a.length === <span class="hljs-number">0</span> || b.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}</code></pre><p>4&#x3001;&#x53EA;&#x770B;&#x6570;&#x7EC4;b&#xFF0C;&#x53EF;&#x4EE5;&#x6709;6&#x79CD;&#x6392;&#x5217;&#x7EC4;&#x5408;&#xFF0C;[c,b,a]&#xFF0C;[a,b,c]&#xFF0C;[a,c,b]&#xFF0C;[b,a,c]&#xFF0C;[b,c,a]&#xFF0C;[c,a,b]&#x3002;&#x8FD8;&#x8BB0;&#x5F97;&#x7B2C;1&#x6B65;&#x8BF4;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x7BA1;b&#x6709;&#x591A;&#x5C11;&#x79CD;&#x7EC4;&#x5408;&#xFF0C;&#x90FD;&#x4ECE;a&#x5165;&#x624B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a = [a, b, c, 1, 2, 3]
for (let j = 0; j &lt; a.length; j++) { 

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// a = [a, b, c, 1, 2, 3]</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; a.length; j++) { 

}</code></pre><p>5&#x3001;&#x904D;&#x5386;a&#x6709;&#x4EC0;&#x4E48;&#x4F5C;&#x7528;&#x5462;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4E3A;&#x5927;&#x5BB6;&#x63ED;&#x6653;&#x4F55;&#x4E3A;&#x6807;&#x8BB0;&#x5220;&#x9664;&#x6CD5;&#xFF0C;&#x5141;&#x8BB8;&#x6211;&#x5C0F;&#x5C0F;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x8BE5;&#x65B9;&#x6CD5;&#xFF0C;&#x5206;&#x4E3A;2&#x4E2A;&#x6838;&#x5FC3;&#xFF0C;&#x201C;&#x6807;&#x8BB0;&#x201D;&#x548C;&#x201C;&#x5220;&#x9664;&#x201D;&#xFF0C;&#x201C;&#x6807;&#x8BB0;&#x201D;&#x662F;&#x6307;&#x6807;&#x8BB0;&#x5F53;&#x524D;&#x6570;&#x7EC4;a&#x904D;&#x5386;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x201C;&#x5220;&#x9664;&#x201D;&#x662F;&#x6307;&#x5220;&#x9664;&#x6570;&#x7EC4;b&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;</p><p>&#x8FD9;&#x6837;&#x8BF4;&#x53EF;&#x80FD;&#x4E0D;&#x592A;&#x61C2;&#xFF0C;&#x5148;&#x4E0D;&#x770B;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x7528;&#x6570;&#x7EC4;&#x6765;&#x6A21;&#x62DF;&#x4E00;&#x4E0B;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x521D;&#x59CB;&#x5316;&#x7684;&#x503C;
a = [a, b, c, 1, 2, 3]
b = [c, b, a]
==================================================
&#x5F53;&#x904D;&#x5386;a&#x7684;&#x65F6;&#x5019;&#xFF0C;j&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x904D;&#x5386;&#x5230;a.length-1&#x7ED3;&#x675F;
==================================================
j = 0 // &#x7ED9;a&#x91CC;&#x7684;&#x5B57;&#x7B26;&#x52A0;&apos;&apos;&#xFF0C;&#x505A;&#x4E2A;&#x6807;&#x8BB0;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x4E0B;&#x6807;&#x4F4D;&#x7F6E;
a = [&apos;a&apos;, b, c, 1, 2, 3]
==================================================
&#x7136;&#x540E;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6570;&#x7EC4;b&#x5B58;&#x5728;&#x5F53;&#x524D;&#x7684;&#x5B57;&#x7B26;&apos;a&apos;&#xFF0C;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;
b = [c, b]
==================================================
j = 1 // &#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x7B26;
a = [a, &apos;b&apos;, c, 1, 2, 3] // &#x6807;&#x8BB0;
b = [b] // &#x5220;&#x9664;
==================================================
j = 1 // &#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E09;&#x4E2A;&#x5B57;&#x7B26;
a = [a, b, &apos;c&apos;, 1, 2, 3] // &#x6807;&#x8BB0;
b = [] // &#x5220;&#x9664;
==================================================
&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x770B;&#x5230;b&#x6570;&#x7EC4;&#x53D8;&#x6210;&#x7A7A;&#x4E86;&#xFF0C;&#x5219;&#x8BC1;&#x660E;b&#x7684;&#x4EFB;&#x610F;&#x4E00;&#x79CD;&#x6392;&#x5217;&#x5B58;&#x5728;&#x4E8E;a&#x4E2D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code>&#x521D;&#x59CB;&#x5316;&#x7684;&#x503C;
a = [a, b, c, 1, 2, 3]
b = [c, b, a]
==================================================
&#x5F53;&#x904D;&#x5386;a&#x7684;&#x65F6;&#x5019;&#xFF0C;j&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x904D;&#x5386;&#x5230;a.length-1&#x7ED3;&#x675F;
==================================================
j = 0 // &#x7ED9;a&#x91CC;&#x7684;&#x5B57;&#x7B26;&#x52A0;&apos;<span class="hljs-emphasis">&apos;&#xFF0C;&#x505A;&#x4E2A;&#x6807;&#x8BB0;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x4E0B;&#x6807;&#x4F4D;&#x7F6E;
a = [&apos;</span>a&apos;, b, c, 1, 2, 3]
==================================================
&#x7136;&#x540E;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6570;&#x7EC4;b&#x5B58;&#x5728;&#x5F53;&#x524D;&#x7684;&#x5B57;&#x7B26;&apos;a&apos;&#xFF0C;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;
b = [c, b]
==================================================
j = 1 // &#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x7B26;
a = [a, <span class="hljs-emphasis">&apos;b&apos;</span>, c, 1, 2, 3] // &#x6807;&#x8BB0;
b = [b] // &#x5220;&#x9664;
==================================================
j = 1 // &#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E09;&#x4E2A;&#x5B57;&#x7B26;
a = [a, b, &apos;c&apos;, 1, 2, 3] // &#x6807;&#x8BB0;
b = [] // &#x5220;&#x9664;
==================================================
&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x770B;&#x5230;b&#x6570;&#x7EC4;&#x53D8;&#x6210;&#x7A7A;&#x4E86;&#xFF0C;&#x5219;&#x8BC1;&#x660E;b&#x7684;&#x4EFB;&#x610F;&#x4E00;&#x79CD;&#x6392;&#x5217;&#x5B58;&#x5728;&#x4E8E;a&#x4E2D;</code></pre><p>6&#x3001;&#x4E0A;&#x4E00;&#x6B65;&#x63CF;&#x8FF0;&#x7684;&#x60C5;&#x51B5;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x521A;&#x597D;&#x5728;A&#x5B57;&#x7B26;&#x4E2D;&#x5B58;&#x5728;&#x4E0D;&#x95F4;&#x65AD;&#x7684;&#x5B57;&#x7B26;&#x7EC4;&#x5408;&#x3002;&#x6211;&#x4EEC;&#x628A;A&#x6539;&#x4E00;&#x4E0B;&#xFF0C;&#x53D8;&#x6210; A = a1b2c3abc&#x3002;&#x5373;&#x4F7F;&#x53D8;&#x590D;&#x6742;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x4F9D;&#x65E7;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6807;&#x8BB0;&#x5220;&#x9664;&#x53D1;&#x6765;&#x505A;&#xFF0C;&#x53EA;&#x662F;&#x7A0D;&#x5FAE;&#x505A;&#x4E00;&#x70B9;&#x5904;&#x7406;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x521D;&#x59CB;&#x5316;&#x7684;&#x503C;
a = [a, 1, b, 2, c, 3, a, b, c]
b = [c, b, a]
==================================================
&#x5F53;&#x904D;&#x5386;a&#x7684;&#x65F6;&#x5019;&#xFF0C;j&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x904D;&#x5386;&#x5230;a.length-1&#x7ED3;&#x675F;
==================================================
j = 0 // &#x7ED9;a&#x91CC;&#x7684;&#x5B57;&#x7B26;&#x52A0;&apos;&apos;&#xFF0C;&#x505A;&#x4E2A;&#x6807;&#x8BB0;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x4E0B;&#x6807;&#x4F4D;&#x7F6E;
a = [&apos;a&apos;, 1, b, 2, c, 3, a, b, c]
==================================================
&#x7136;&#x540E;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6570;&#x7EC4;b&#x5B58;&#x5728;&#x5F53;&#x524D;&#x7684;&#x5B57;&#x7B26;&apos;a&apos;&#xFF0C;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;
b = [c, b]
==================================================
j = 1 // &#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x7B26;
a = [a, &apos;1&apos;, b, 2, c, 3, a, b, c] // &#x6807;&#x8BB0;
// &#x7A81;&#x7136;&#x53D1;&#x73B0;&#x7B2C;2&#x4E2A;&#x5B57;&#x7B26;&#x662F;1&#xFF0C;&#x73B0;&#x5728;&#x8BE5;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x628A;&#x6570;&#x7EC4;b&#x6062;&#x590D;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x5373;&#x53EF;

b = [c, b, a] // &#x6062;&#x590D;&#x521D;&#x59CB;&#x72B6;&#x6001; 
==================================================
&#x63A5;&#x4E0B;&#x6765;&#x7EE7;&#x7EED;&#x904D;&#x5386;&#xFF0C;&#x91CD;&#x590D;&#x4E0A;&#x9762;&#x7684;&#x5904;&#x7406;&#x6B65;&#x9AA4;&#xFF0C;&#x76F4;&#x5230;&#x6570;&#x7EC4;b&#x4E3A;&#x7A7A;&#x6216;&#x8005;&#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5B8C;&#x6210;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code>&#x521D;&#x59CB;&#x5316;&#x7684;&#x503C;
a = [a, 1, b, 2, c, 3, a, b, c]
b = [c, b, a]
==================================================
&#x5F53;&#x904D;&#x5386;a&#x7684;&#x65F6;&#x5019;&#xFF0C;j&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x904D;&#x5386;&#x5230;a.length-1&#x7ED3;&#x675F;
==================================================
j = 0 // &#x7ED9;a&#x91CC;&#x7684;&#x5B57;&#x7B26;&#x52A0;&apos;<span class="hljs-emphasis">&apos;&#xFF0C;&#x505A;&#x4E2A;&#x6807;&#x8BB0;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x4E0B;&#x6807;&#x4F4D;&#x7F6E;
a = [&apos;</span>a&apos;, 1, b, 2, c, 3, a, b, c]
==================================================
&#x7136;&#x540E;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6570;&#x7EC4;b&#x5B58;&#x5728;&#x5F53;&#x524D;&#x7684;&#x5B57;&#x7B26;&apos;a&apos;&#xFF0C;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;
b = [c, b]
==================================================
j = 1 // &#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x7B26;
a = [a, <span class="hljs-emphasis">&apos;1&apos;</span>, b, 2, c, 3, a, b, c] // &#x6807;&#x8BB0;
<span class="hljs-comment">// &#x7A81;&#x7136;&#x53D1;&#x73B0;&#x7B2C;2&#x4E2A;&#x5B57;&#x7B26;&#x662F;1&#xFF0C;&#x73B0;&#x5728;&#x8BE5;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x628A;&#x6570;&#x7EC4;b&#x6062;&#x590D;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x5373;&#x53EF;</span>

b = [c, b, a] // &#x6062;&#x590D;&#x521D;&#x59CB;&#x72B6;&#x6001; 
==================================================
&#x63A5;&#x4E0B;&#x6765;&#x7EE7;&#x7EED;&#x904D;&#x5386;&#xFF0C;&#x91CD;&#x590D;&#x4E0A;&#x9762;&#x7684;&#x5904;&#x7406;&#x6B65;&#x9AA4;&#xFF0C;&#x76F4;&#x5230;&#x6570;&#x7EC4;b&#x4E3A;&#x7A7A;&#x6216;&#x8005;&#x6570;&#x7EC4;a&#x904D;&#x5386;&#x5B8C;&#x6210;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</code></pre><p>7&#x3001;JavaScript&#x4EE3;&#x7801;&#x5B9E;&#x73B0;<br>&#x4E0B;&#x9762;&#x662F;&#x7B2C;6&#x6B65;&#x8BF4;&#x660E;&#x7684;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF0C;&#x4ECE;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4E0D;&#x7BA1;B&#x5B57;&#x7B26;&#x6709;&#x591A;&#x5C11;&#x6392;&#x5217;&#x7EC4;&#x5408;&#xFF0C;&#x6211;&#x4EEC;&#x59CB;&#x7EC8;&#x53EA;&#x9700;&#x8981;&#x904D;&#x5386;A&#x7684;&#x6240;&#x6709;&#x5B57;&#x7B26;&#x5373;&#x53EF;&#xFF0C;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x4E5F;&#x662F;&#x7528;&#x7A7A;&#x95F4;&#x6362;&#x65F6;&#x95F4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x904D;&#x5386;&#x6570;&#x7EC4; a
    for (let j = 0; j &lt; a.length; j++) {
        // &#x6570;&#x7EC4; b&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;
        if (b.length &gt; 0) {
            // &#x6570;&#x7EC4;a&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;
            if (b.indexOf(a[j]) &gt; -1) {
                // &#x5220;&#x9664;b&#x6570;&#x7EC4;&#x4E2D;&#x5339;&#x914D;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x5143;&#x7D20;
                b.splice(b.indexOf(a[j]), 1)
                if (b.length === 0) {
                    // &#x5982;&#x679C;&#x6570;&#x7EC4;b&#x5168;&#x90E8;&#x88AB;&#x5220;&#x9664;&#x4E86;&#xFF0C;&#x5219;&#x8BC1;&#x660E;b&#x662F;a&#x7684;&#x5B50;&#x4E32;
                    return true
                }
            } else {
                // &#x6570;&#x7EC4;b&#x4E0D;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6062;&#x590D;b&#x6570;&#x7EC4;
                b = B.split(&apos;&apos;)
            }
        } else {
            // &#x6570;&#x7EC4; b&#x4E3A;&#x7A7A;&#x8FD4;&#x56DE;true
            return true
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x904D;&#x5386;&#x6570;&#x7EC4; a</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; a.length; j++) {
        <span class="hljs-comment">// &#x6570;&#x7EC4; b&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;</span>
        <span class="hljs-keyword">if</span> (b.length &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// &#x6570;&#x7EC4;a&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;</span>
            <span class="hljs-keyword">if</span> (b.indexOf(a[j]) &gt; <span class="hljs-number">-1</span>) {
                <span class="hljs-comment">// &#x5220;&#x9664;b&#x6570;&#x7EC4;&#x4E2D;&#x5339;&#x914D;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x5143;&#x7D20;</span>
                b.splice(b.indexOf(a[j]), <span class="hljs-number">1</span>)
                <span class="hljs-keyword">if</span> (b.length === <span class="hljs-number">0</span>) {
                    <span class="hljs-comment">// &#x5982;&#x679C;&#x6570;&#x7EC4;b&#x5168;&#x90E8;&#x88AB;&#x5220;&#x9664;&#x4E86;&#xFF0C;&#x5219;&#x8BC1;&#x660E;b&#x662F;a&#x7684;&#x5B50;&#x4E32;</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// &#x6570;&#x7EC4;b&#x4E0D;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6062;&#x590D;b&#x6570;&#x7EC4;</span>
                b = B.split(<span class="hljs-string">&apos;&apos;</span>)
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// &#x6570;&#x7EC4; b&#x4E3A;&#x7A7A;&#x8FD4;&#x56DE;true</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
    }</code></pre><h3 id="articleHeader2">&#x603B;&#x7ED3;</h3><p>&#x4E0E;&#x5176;&#x4ED6;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x7684;&#x4EA4;&#x6D41;&#x4E2D;&#xFF0C;&#x6211;&#x8FD8;&#x4E86;&#x89E3;&#x5230;&#x4E86;&#x5176;&#x4ED6;&#x7684;&#x89E3;&#x9898;&#x601D;&#x8DEF;&#xFF0C;&#x6709;&#x4E9B;&#x5F88;&#x6709;&#x8DA3;&#xFF0C;&#x6BD4;&#x5982;&#x8003;&#x8651;&#x4F7F;&#x7528;Map&#x6216;Set&#x3001;&#x6ED1;&#x5757;&#x533A;&#x95F4;&#x6BD4;&#x8F83;&#x7B49;&#xFF0C;&#x4E0D;&#x8FC7;&#x6211;&#x6CA1;&#x6709;&#x53BB;&#x7528;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x8FC7;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4E0B;&#x9762;&#x7559;&#x8A00;&#x4EA4;&#x6D41;&#x3002;</p><h3 id="articleHeader3">&#x5B8C;&#x6574;&#x6E90;&#x7801;</h3><p>&#x8BC4;&#x8BBA;&#x533A;&#x6709;&#x4EBA;&#x6307;&#x51FA;&#x4E0D;&#x80FD;&#x8986;&#x76D6;&#x67D0;&#x4E9B;&#x573A;&#x666F;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x5BF9;&#x4E0A;&#x9762;&#x7684;&#x5177;&#x4F53;&#x8FC7;&#x7A0B;&#x505A;&#x4E86;&#x6539;&#x8FDB;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x6539;&#x8FDB;&#x540E;&#x7684;&#x6E90;&#x7801;&#x3002;<br>&#x589E;&#x52A0;&#x4E86;2&#x4E2A;&#x5B57;&#x6BB5;&#xFF0C;isBack&#x548C;isRestart&#xFF0C;isRestart&#x7528;&#x6765;&#x6807;&#x8BB0;&#x662F;&#x5426;&#x91CD;&#x65B0;&#x5728;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x904D;&#x5386;&#xFF0C;isBack&#x5224;&#x65AD;&#x662F;&#x5426;&#x5BF9;&#x6570;&#x7EC4;&#x904D;&#x5386;&#x7684;&#x4E0B;&#x6807;&#x8FDB;&#x884C;&#x56DE;&#x9000;&#x4E00;&#x4E2A;&#x5355;&#x4F4D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var A = &apos;abc123&apos;
  , B = &apos;cba&apos;
function interface(A, B) {
    // &#x5C06;A&#x548C;B&#x8F6C;&#x6210;&#x6570;&#x7EC4;
    let a = A.split(&apos;&apos;)
    let b = B.split(&apos;&apos;)
    if (a.length === 0 || b.length === 0) {
        return false
    }
    let isBack = false, isRestart = 0
    // &#x904D;&#x5386;&#x6570;&#x7EC4; a
    for (let j = 0; j &lt; a.length; j++) {
        // &#x6570;&#x7EC4; b&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;
        if (b.length &gt; 0) {
            isBack = false
            // &#x6570;&#x7EC4;a&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;
            if (b.indexOf(a[j]) &gt; -1) {
                // &#x5220;&#x9664;b&#x6570;&#x7EC4;&#x4E2D;&#x5339;&#x914D;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x5143;&#x7D20;
                b.splice(b.indexOf(a[j]), 1)
                if (b.length === 0) {
                    // &#x5982;&#x679C;&#x6570;&#x7EC4;b&#x5168;&#x90E8;&#x88AB;&#x5220;&#x9664;&#x4E86;&#xFF0C;&#x5219;&#x8BC1;&#x660E;b&#x662F;a&#x7684;&#x5B50;&#x4E32;
                    return true
                }
            } else {
                if (isRestart !== 0) {
                    isBack = false
                } else {
                    isBack = true
                }
                // &#x6570;&#x7EC4;b&#x4E0D;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6062;&#x590D;b&#x6570;&#x7EC4;
                b = B.split(&apos;&apos;)
                if (isBack) {
                    j -= 1
                    isRestart = 0
                }
                isRestart++
            }
        } else {
            // &#x6570;&#x7EC4; b&#x4E3A;&#x7A7A;&#x8FD4;&#x56DE;true
            return true
        }
    }
    return false
}
interface(A, B)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> A = <span class="hljs-string">&apos;abc123&apos;</span>
  , B = <span class="hljs-string">&apos;cba&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">interface</span>(<span class="hljs-params">A, B</span>) </span>{
    <span class="hljs-comment">// &#x5C06;A&#x548C;B&#x8F6C;&#x6210;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">let</span> a = A.split(<span class="hljs-string">&apos;&apos;</span>)
    <span class="hljs-keyword">let</span> b = B.split(<span class="hljs-string">&apos;&apos;</span>)
    <span class="hljs-keyword">if</span> (a.length === <span class="hljs-number">0</span> || b.length === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">let</span> isBack = <span class="hljs-literal">false</span>, isRestart = <span class="hljs-number">0</span>
    <span class="hljs-comment">// &#x904D;&#x5386;&#x6570;&#x7EC4; a</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; a.length; j++) {
        <span class="hljs-comment">// &#x6570;&#x7EC4; b&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;</span>
        <span class="hljs-keyword">if</span> (b.length &gt; <span class="hljs-number">0</span>) {
            isBack = <span class="hljs-literal">false</span>
            <span class="hljs-comment">// &#x6570;&#x7EC4;a&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;</span>
            <span class="hljs-keyword">if</span> (b.indexOf(a[j]) &gt; <span class="hljs-number">-1</span>) {
                <span class="hljs-comment">// &#x5220;&#x9664;b&#x6570;&#x7EC4;&#x4E2D;&#x5339;&#x914D;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x5143;&#x7D20;</span>
                b.splice(b.indexOf(a[j]), <span class="hljs-number">1</span>)
                <span class="hljs-keyword">if</span> (b.length === <span class="hljs-number">0</span>) {
                    <span class="hljs-comment">// &#x5982;&#x679C;&#x6570;&#x7EC4;b&#x5168;&#x90E8;&#x88AB;&#x5220;&#x9664;&#x4E86;&#xFF0C;&#x5219;&#x8BC1;&#x660E;b&#x662F;a&#x7684;&#x5B50;&#x4E32;</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">if</span> (isRestart !== <span class="hljs-number">0</span>) {
                    isBack = <span class="hljs-literal">false</span>
                } <span class="hljs-keyword">else</span> {
                    isBack = <span class="hljs-literal">true</span>
                }
                <span class="hljs-comment">// &#x6570;&#x7EC4;b&#x4E0D;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;b&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6062;&#x590D;b&#x6570;&#x7EC4;</span>
                b = B.split(<span class="hljs-string">&apos;&apos;</span>)
                <span class="hljs-keyword">if</span> (isBack) {
                    j -= <span class="hljs-number">1</span>
                    isRestart = <span class="hljs-number">0</span>
                }
                isRestart++
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// &#x6570;&#x7EC4; b&#x4E3A;&#x7A7A;&#x8FD4;&#x56DE;true</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}
interface(A, B)
</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端系列——查找字符串B的字符任意一种组合是否是字符串A的子串

## 原文链接
[https://segmentfault.com/a/1190000016516441](https://segmentfault.com/a/1190000016516441)


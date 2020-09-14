---
title: javascript数值转换
hidden: true
categories: [reprint]
slug: c29893f1
date: 2018-11-10 02:30:10
---

{{< raw >}}
<blockquote>&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#x51FD;&#x6570;&#x5C06;&#x975E;&#x6570;&#x503C;&#x8F6C;&#x6362;&#x4E3A;&#x6570;&#x503C;&#xFF1A;Number() &#x3001;parseInt()&#x548C; parseFloat()</blockquote><h2 id="articleHeader0">Number()&#x7684;&#x8F6C;&#x6362;&#x89C4;&#x5219;</h2><ol><li><p>Boolean&#x503C; true&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x4E3A;1 false&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x4E3A;0</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var correct = true
Number(correct)
1
var error = false
Number(error)
0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> correct = true
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(correct)</span></span>
<span class="hljs-number">1</span>
<span class="hljs-selector-tag">var</span> error = false
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(error)</span></span>
<span class="hljs-number">0</span></code></pre></li><li><p>&#x6570;&#x5B57;&#x503C; &#x4F20;&#x5165;&#x4EC0;&#x4E48;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sales = 10
Number(sales)
10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> sales = <span class="hljs-number">10</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(sales)</span></span>
<span class="hljs-number">10</span></code></pre></li><li><p>null &#x503C;&#xFF0C;&#x8FD4;&#x56DE; 0</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arg = null
Number(arg)
0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> arg = null
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(arg)</span></span>
<span class="hljs-number">0</span></code></pre></li><li><p>undefined&#xFF0C;&#x8FD4;&#x56DE; NaN</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vara = undefined
Number(vara)
NaN" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> vara = undefined
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(vara)</span></span>
NaN</code></pre></li><li><p>&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x9075;&#x5FAA;&#x4E0B;&#x5217;&#x89C4;&#x5219;:</p><p>&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x53EA;&#x5305;&#x542B;&#x6570;&#x5B57;&#xFF08;&#x5305;&#x62EC;&#x524D;&#x9762;&#x5E26;&#x6B63;&#x53F7;&#x6216;&#x8D1F;&#x53F7;&#x7684;&#x60C5;&#x51B5;&#xFF09;&#xFF0C;&#x5219;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x5341;&#x8FDB;&#x5236;&#x6570;&#x503C;&#xFF0C;&#x5373;&quot;1&quot;<br>&#x4F1A;&#x53D8;&#x6210; 1&#xFF0C;&quot;123&quot;&#x4F1A;&#x53D8;&#x6210; 123&#xFF0C;&#x800C;&quot;011&quot;&#x4F1A;&#x53D8;&#x6210; 11&#xFF08;&#x6CE8;&#x610F;&#xFF1A;&#x524D;&#x5BFC;&#x7684;&#x96F6;&#x88AB;&#x5FFD;&#x7565;&#x4E86;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &apos;1&apos;
Number(str)
1
var str1 = &apos;011&apos;
Number(str1)
11
var str2 = &apos;+1&apos;
Number(str2)
1
var str3 = &apos;-001&apos;
Number(str3)
-1
var str4 = &apos;-121&apos;
Number(str4)
-121" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> str = <span class="hljs-string">&apos;1&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str)</span></span>
<span class="hljs-number">1</span>
<span class="hljs-selector-tag">var</span> str1 = <span class="hljs-string">&apos;011&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str1)</span></span>
<span class="hljs-number">11</span>
<span class="hljs-selector-tag">var</span> str2 = <span class="hljs-string">&apos;+1&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str2)</span></span>
<span class="hljs-number">1</span>
<span class="hljs-selector-tag">var</span> str3 = <span class="hljs-string">&apos;-001&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str3)</span></span>
-<span class="hljs-number">1</span>
<span class="hljs-selector-tag">var</span> str4 = <span class="hljs-string">&apos;-121&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str4)</span></span>
-<span class="hljs-number">121</span></code></pre><p>&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x5305;&#x542B;&#x6709;&#x6548;&#x7684;&#x6D6E;&#x70B9;&#x683C;&#x5F0F;&#xFF0C;&#x5982;&quot;1.1&quot;&#xFF0C;&#x5219;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x5BF9;&#x5E94;&#x7684;&#x6D6E;&#x70B9;&#x6570;&#x503C;&#xFF08;&#x540C;&#x6837;&#xFF0C;&#x4E5F;&#x4F1A;&#x5FFD;<br>&#x7565;&#x524D;&#x5BFC;&#x96F6;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &apos;1.1&apos;
Number(str)
1.1
var str1 = &apos;+1.1&apos;
Number(str1)
1.1
var str2 = &apos;-01.1&apos;
Number(str2)
-1.1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> str = <span class="hljs-string">&apos;1.1&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str)</span></span>
<span class="hljs-number">1.1</span>
<span class="hljs-selector-tag">var</span> str1 = <span class="hljs-string">&apos;+1.1&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str1)</span></span>
<span class="hljs-number">1.1</span>
<span class="hljs-selector-tag">var</span> str2 = <span class="hljs-string">&apos;-01.1&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str2)</span></span>
-<span class="hljs-number">1.1</span></code></pre><p>&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x5305;&#x542B;&#x6709;&#x6548;&#x7684;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x683C;&#x5F0F;&#xFF0C;&#x4F8B;&#x5982;&quot;0xf&quot;&#xFF0C;&#x5219;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x76F8;&#x540C;&#x5927;&#x5C0F;&#x7684;&#x5341;&#x8FDB;&#x5236;&#x6574;<br>&#x6570;&#x503C;</p><p>&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x7A7A;&#x7684;&#xFF08;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5B57;&#x7B26;&#xFF09;&#xFF0C;&#x5219;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A; 0</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &apos;&apos;
Number(str)
0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> str = <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str)</span></span>
<span class="hljs-number">0</span></code></pre><p>&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x5305;&#x542B;&#x9664;&#x4E0A;&#x8FF0;&#x683C;&#x5F0F;&#x4E4B;&#x5916;&#x7684;&#x5B57;&#x7B26;&#xFF0C;&#x5219;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A; NaN</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &apos;adfsfdsa&apos;
Number(str)
NaN" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> str = <span class="hljs-string">&apos;adfsfdsa&apos;</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(str)</span></span>
NaN</code></pre></li><li>&#x5982;&#x679C;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684; valueOf()&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x4F9D;&#x7167;&#x524D;&#x9762;&#x7684;&#x89C4;&#x5219;&#x8F6C;&#x6362;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x3002;&#x5982;&#x679C;&#x8F6C;&#x6362;&#x7684;&#x7ED3;&#x679C;&#x662F; NaN&#xFF0C;&#x5219;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684; toString()&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6B21;&#x4F9D;&#x7167;&#x524D;&#x9762;&#x7684;&#x89C4;&#x5219;&#x8F6C;&#x6362;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x503C;</li></ol><h2 id="articleHeader1">parseInt()&#x8F6C;&#x6362;&#x89C4;&#x5219;</h2><blockquote>&#x7531;&#x4E8E; Number()&#x51FD;&#x6570;&#x5728;&#x8F6C;&#x6362;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#x800C;&#x4E14;&#x4E0D;&#x591F;&#x5408;&#x7406;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x5904;&#x7406;&#x6574;&#x6570;&#x7684;&#x65F6;&#x5019;&#x66F4;&#x5E38;&#x7528;&#x7684;&#x662F;<br>parseInt()&#x51FD;&#x6570;&#x3002;parseInt()&#x51FD;&#x6570;&#x5728;&#x8F6C;&#x6362;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x662F;&#x770B;&#x5176;&#x662F;&#x5426;&#x7B26;&#x5408;&#x6570;&#x503C;&#x6A21;&#x5F0F;&#x3002;&#x5B83;&#x4F1A;&#x5FFD;&#x7565;&#x5B57;<br>&#x7B26;&#x4E32;&#x524D;&#x9762;&#x7684;&#x7A7A;&#x683C;&#xFF0C;&#x76F4;&#x81F3;&#x627E;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x683C;&#x5B57;&#x7B26;&#x3002;&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E0D;&#x662F;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#xFF0C;parseInt()<br>&#x5C31;&#x4F1A;&#x8FD4;&#x56DE; NaN&#xFF1B;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x7528; parseInt()&#x8F6C;&#x6362;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x4F1A;&#x8FD4;&#x56DE; NaN&#xFF08;Number()&#x5BF9;&#x7A7A;&#x5B57;&#x7B26;&#x8FD4;&#x56DE; 0&#xFF09;&#x3002;&#x5982;<br>&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x662F;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#xFF0C;parseInt()&#x4F1A;&#x7EE7;&#x7EED;&#x89E3;&#x6790;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x7B26;&#xFF0C;&#x76F4;&#x5230;&#x89E3;&#x6790;&#x5B8C;&#x6240;&#x6709;&#x540E;&#x7EED;&#x5B57;&#x7B26;&#x6216;&#x8005;&#x9047;&#x5230;&#x4E86;<br>&#x4E00;&#x4E2A;&#x975E;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&quot;1234blue&quot;&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x4E3A; 1234&#xFF0C;&#x56E0;&#x4E3A;&quot;blue&quot;&#x4F1A;&#x88AB;&#x5B8C;&#x5168;&#x5FFD;&#x7565;&#x3002;&#x7C7B;&#x4F3C;&#x5730;&#xFF0C;&quot;22.5&quot;<br>&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x4E3A; 22&#xFF0C;&#x56E0;&#x4E3A;&#x5C0F;&#x6570;&#x70B9;&#x5E76;&#x4E0D;&#x662F;&#x6709;&#x6548;&#x7684;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6307;&#x5B9A;&#x57FA;&#x6570;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x8F6C;&#x6362;&#x7684;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x3002;&#x4F8B;&#x5982;&#xFF1A;
var num1 = parseInt(&quot;10&quot;, 2); //2 &#xFF08;&#x6309;&#x4E8C;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;
var num2 = parseInt(&quot;10&quot;, 8); //8 &#xFF08;&#x6309;&#x516B;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;
var num3 = parseInt(&quot;10&quot;, 10); //10 &#xFF08;&#x6309;&#x5341;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;
var num4 = parseInt(&quot;10&quot;, 16); //16 &#xFF08;&#x6309;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x6307;&#x5B9A;&#x57FA;&#x6570;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x8F6C;&#x6362;&#x7684;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x3002;&#x4F8B;&#x5982;&#xFF1A;
<span class="hljs-keyword">var</span> num1 = <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">//2 &#xFF08;&#x6309;&#x4E8C;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;</span>
<span class="hljs-keyword">var</span> num2 = <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-number">8</span>); <span class="hljs-comment">//8 &#xFF08;&#x6309;&#x516B;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;</span>
<span class="hljs-keyword">var</span> num3 = <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-number">10</span>); <span class="hljs-comment">//10 &#xFF08;&#x6309;&#x5341;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;</span>
<span class="hljs-keyword">var</span> num4 = <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-number">16</span>); <span class="hljs-comment">//16 &#xFF08;&#x6309;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF09;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x89E3;&#x6790;&#x7684;&#x90FD;&#x662F;&#x5341;&#x8FDB;&#x5236;&#x6570;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x59CB;&#x7EC8;&#x5C06; 10 &#x4F5C;&#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;
&#x975E;&#x5E38;&#x5FC5;&#x8981;&#x7684;&#x3002;**" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code>*<span class="hljs-strong">*&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x89E3;&#x6790;&#x7684;&#x90FD;&#x662F;&#x5341;&#x8FDB;&#x5236;&#x6570;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x59CB;&#x7EC8;&#x5C06; 10 &#x4F5C;&#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;
&#x975E;&#x5E38;&#x5FC5;&#x8981;&#x7684;&#x3002;*</span><span class="hljs-strong">*</span></code></pre><h2 id="articleHeader2">parseFloat()&#x8F6C;&#x6362;&#x89C4;&#x5219;</h2><blockquote>&#x4E0E; parseInt()&#x51FD;&#x6570;&#x7C7B;&#x4F3C;&#xFF0C;parseFloat()&#x4E5F;&#x662F;&#x4ECE;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#xFF08;&#x4F4D;&#x7F6E; 0&#xFF09;&#x5F00;&#x59CB;&#x89E3;&#x6790;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x3002;&#x800C;&#x4E14;<br>&#x4E5F;&#x662F;&#x4E00;&#x76F4;&#x89E3;&#x6790;&#x5230;&#x5B57;&#x7B26;&#x4E32;&#x672B;&#x5C3E;&#xFF0C;&#x6216;&#x8005;&#x89E3;&#x6790;&#x5230;&#x9047;&#x89C1;&#x4E00;&#x4E2A;&#x65E0;&#x6548;&#x7684;&#x6D6E;&#x70B9;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#x4E3A;&#x6B62;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x7B2C;<br>&#x4E00;&#x4E2A;&#x5C0F;&#x6570;&#x70B9;&#x662F;&#x6709;&#x6548;&#x7684;&#xFF0C;&#x800C;&#x7B2C;&#x4E8C;&#x4E2A;&#x5C0F;&#x6570;&#x70B9;&#x5C31;&#x662F;&#x65E0;&#x6548;&#x7684;&#x4E86;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x540E;&#x9762;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5C06;&#x88AB;&#x5FFD;&#x7565;&#x3002;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;<br>&quot;22.34.5&quot;&#x5C06;&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x4E3A; 22.34&#x3002;<br>&#x9664;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;&#x5C0F;&#x6570;&#x70B9;&#x6709;&#x6548;&#x4E4B;&#x5916;&#xFF0C;parseFloat()&#x4E0E; parseInt()&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x5B83;&#x59CB;&#x7EC8;&#x90FD;&#x4F1A;&#x5FFD;&#x7565;&#x524D;&#x5BFC;<br>&#x7684;&#x96F6;&#x3002;parseFloat()&#x53EF;&#x4EE5;&#x8BC6;&#x522B;&#x524D;&#x9762;&#x8BA8;&#x8BBA;&#x8FC7;&#x7684;&#x6240;&#x6709;&#x6D6E;&#x70B9;&#x6570;&#x503C;&#x683C;&#x5F0F;&#xFF0C;&#x4E5F;&#x5305;&#x62EC;&#x5341;&#x8FDB;&#x5236;&#x6574;&#x6570;&#x683C;&#x5F0F;&#x3002;&#x4F46;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x683C;<br>&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5219;&#x59CB;&#x7EC8;&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x6210; 0&#x3002;&#x7531;&#x4E8E; parseFloat()&#x53EA;&#x89E3;&#x6790;&#x5341;&#x8FDB;&#x5236;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x6CA1;&#x6709;&#x7528;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x6307;&#x5B9A;&#x57FA;<br>&#x6570;&#x7684;&#x7528;&#x6CD5;&#x3002;&#x6700;&#x540E;&#x8FD8;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF1A;&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x5305;&#x542B;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x89E3;&#x6790;&#x4E3A;&#x6574;&#x6570;&#x7684;&#x6570;&#xFF08;&#x6CA1;&#x6709;&#x5C0F;&#x6570;&#x70B9;&#xFF0C;&#x6216;&#x8005;&#x5C0F;&#x6570;&#x70B9;&#x540E;<br>&#x90FD;&#x662F;&#x96F6;&#xFF09;&#xFF0C;parseFloat()&#x4F1A;&#x8FD4;&#x56DE;&#x6574;&#x6570;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num1 = parseFloat(&quot;1234blue&quot;); //1234 &#xFF08;&#x6574;&#x6570;&#xFF09;
var num2 = parseFloat(&quot;0xA&quot;); //0 
var num3 = parseFloat(&quot;22.5&quot;); //22.5 
var num4 = parseFloat(&quot;22.34.5&quot;); //22.34 
var num5 = parseFloat(&quot;0908.5&quot;); //908.5 
var num6 = parseFloat(&quot;3.125e7&quot;); //31250000 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> num1 = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">&quot;1234blue&quot;</span>); <span class="hljs-comment">//1234 &#xFF08;&#x6574;&#x6570;&#xFF09;</span>
<span class="hljs-keyword">var</span> num2 = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">&quot;0xA&quot;</span>); <span class="hljs-comment">//0 </span>
<span class="hljs-keyword">var</span> num3 = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">&quot;22.5&quot;</span>); <span class="hljs-comment">//22.5 </span>
<span class="hljs-keyword">var</span> num4 = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">&quot;22.34.5&quot;</span>); <span class="hljs-comment">//22.34 </span>
<span class="hljs-keyword">var</span> num5 = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">&quot;0908.5&quot;</span>); <span class="hljs-comment">//908.5 </span>
<span class="hljs-keyword">var</span> num6 = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">&quot;3.125e7&quot;</span>); <span class="hljs-comment">//31250000 </span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript数值转换

## 原文链接
[https://segmentfault.com/a/1190000016381518](https://segmentfault.com/a/1190000016381518)


---
title: '​前端教学讲义：JS基础' 
date: 2018-11-23 2:30:10
hidden: true
slug: 0e8jqdo1y3gm
categories: [reprint]
---

{{< raw >}}
<p>&#x8BB2;&#x4E49;&#x5185;&#x5BB9;&#xFF1A;JS &#x8BDE;&#x751F;&#x7684;&#x80CC;&#x666F;&#x3001;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x3001;&#x8FD0;&#x7B97;&#x7B26;</p><p>&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;&#x53EA;&#x6D89;&#x53CA; ES5 &#x6807;&#x51C6;&#xFF0C;ES6 &#x589E;&#x52A0;&#x7684;&#x65B0;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x5728;&#x7F51;&#x4E0A;&#x67E5;&#x627E;&#x5230;&#x3002;</p><h2 id="articleHeader0">JS &#x8BDE;&#x751F;&#x7684;&#x80CC;&#x666F;</h2><p>&#x4E0A;&#x4E16;&#x7EAA; 90 &#x5E74;&#x4EE3;&#x7F51;&#x666F;&#x516C;&#x53F8;&#x5F00;&#x53D1;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x72EC;&#x6B65;&#x5929;&#x4E0B;</p><p>&#x4E00;&#x4E2A;&#x53EB;&#x505A; Brendan Eich &#x7684;&#x5DE5;&#x7A0B;&#x5E08;&#x53D7;&#x547D;&#x4E8E;&#x5F00;&#x53D1;&#x4E00;&#x6B3E;&#x811A;&#x672C;&#x8BED;&#x8A00;&#xFF0C;&#x6765;&#x589E;&#x5F3A;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x529F;&#x80FD;&#x3002;</p><p>&#x8FD9;&#x540D;&#x5DE5;&#x7A0B;&#x5E08;&#x82B1;&#x8D39;&#x4E86; 10 &#x5929;&#x65F6;&#x95F4;&#x8BBE;&#x8BA1;&#x51FA;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#xFF0C;&#x540D;&#x53EB; LiveScript&#x3002;</p><p>&#x540E;&#x6765;&#x56E0;&#x4E3A;&#x5F53;&#x65F6; Java &#x6B63;&#x7EA2;&#xFF0C;&#x516C;&#x53F8;&#x5C06;&#x5176;&#x6539;&#x540D;&#x4E3A; JavaScript&#xFF0C;&#x6240;&#x4EE5; JS &#x548C; Java &#x5176;&#x5B9E;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#x3002;</p><p>&#x8FD9;&#x540D;&#x5DE5;&#x7A0B;&#x5E08;&#x5728;&#x8BBE;&#x8BA1;&#x8BED;&#x8A00;&#x4E4B;&#x521D;&#x6709;&#x51E0;&#x4E2A;&#x76EE;&#x6807;</p><ul><li>&#x7B80;&#x5355;&#x6613;&#x7528;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x4E13;&#x4E1A;&#x7684;&#x8BA1;&#x7B97;&#x673A;&#x77E5;&#x8BC6;&#x5C31;&#x80FD;&#x4F7F;&#x7528;</li><li>&#x56E0;&#x4E3A;&#x4E2A;&#x4EBA;&#x7684;&#x559C;&#x7231;&#xFF0C;&#x6240;&#x4EE5;&#x589E;&#x52A0;&#x5BF9;&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x7684;&#x652F;&#x6301;</li><li>&#x56E0;&#x4E3A;&#x516C;&#x53F8;&#x538B;&#x529B;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x8981;&#x652F;&#x6301;&#x9762;&#x5411;&#x5BF9;&#x8C61;</li></ul><p>&#x540E;&#x6765; JS &#x56E0;&#x4E3A;&#x5E02;&#x573A;&#x8BA4;&#x540C;&#xFF0C;&#x6253;&#x8D25;&#x4E86; VBScript&#xFF0C;Java plugin &#x7B49;&#x4E00;&#x7CFB;&#x5217;&#x589E;&#x5F3A;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x6210;&#x4E86;&#x4E8B;&#x5B9E;&#x6807;&#x51C6;&#x3002;</p><p>&#x7F51;&#x666F;&#x516C;&#x53F8;&#x5012;&#x95ED;&#x4E4B;&#x540E;&#xFF0C;JS &#x7684;&#x6807;&#x51C6;&#x5236;&#x5B9A;&#x7531; ECMA&#xFF08;&#x6B27;&#x6D32;&#x7535;&#x8111;&#x5236;&#x9020;&#x5546;&#x534F;&#x4F1A;&#xFF09;&#x5236;&#x5B9A;&#xFF0C;&#x6240;&#x4EE5;&#x53C8;&#x53EB;&#x505A; ECMAScript&#xFF0C; &#x65B0;&#x7684;&#x6807;&#x51C6;&#x53EB;&#x505A; ES6&#x3001;ES7&#x3001;ES2018 &#x2026; &#x6BCF;&#x5E74;&#x4F1A;&#x6536;&#x96C6;&#x5404;&#x79CD;&#x8BED;&#x8A00;&#x89C4;&#x8303;&#x5EFA;&#x8BAE;&#xFF0C;&#x901A;&#x8FC7; &#x8349;&#x6848;&#x3001;stage1&#x3001;stage2 &#x7B49;&#x51E0;&#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x5E76;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6709;&#x5B9E;&#x73B0;&#x540E;&#x4F1A;&#x6210;&#x4E3A;&#x6B63;&#x5F0F;&#x6807;&#x51C6;&#x3002;</p><p>&#x6240;&#x4EE5; JS &#x5177;&#x6709;&#x4EE5;&#x4E0B;&#x7279;&#x70B9;&#xFF1A;</p><ul><li>&#x5411;&#x4E0B;&#x517C;&#x5BB9;&#xFF0C;&#x5305;&#x62EC;&#x517C;&#x5BB9; bug&#xFF08;typeof null&#xFF0C;&#x5927;&#x6570;&#xFF09;</li><li>&#x5947;&#x602A;&#x3001;&#x8E69;&#x811A;&#x7684;&#x89C4;&#x8303;&#xFF0C;&#x4ECE;&#x6280;&#x672F;&#x4E0A;&#x6765;&#x8BF4;&#x7F3A;&#x70B9;&#x5F88;&#x591A;</li><li>&#x8FD0;&#x7528;&#x573A;&#x666F;&#x5E7F;&#x6CDB;</li><li>&#x8FED;&#x4EE3;&#x901F;&#x5EA6;&#x5FEB;&#xFF0C;</li></ul><p>&#x4F1A;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x4F7F;&#x7528;&#x8FD8;&#x5728;&#x8349;&#x6848;&#x9636;&#x6BB5;&#x7684;&#x65B0;&#x8BED;&#x6CD5;</p><p>&#x53D8;&#x79CD;&#x3001;&#x8D85;&#x96C6;&#x3001;&#x5B50;&#x96C6; &#x5F88;&#x591A;&#xFF08;coffee script, typescript, Action Script, flow, AssembleScript)</p><h2 id="articleHeader1">&#x57FA;&#x672C;&#x7C7B;&#x578B;</h2><p>JS &#x4E2D;&#x7684;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#xFF1A;</p><ul><li>undefined</li><li>null</li><li>Boolean</li><li>Number</li><li>String</li></ul><p>&#x53E6;&#x5916;&#x6709;&#x4E09;&#x79CD;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF1A;</p><ul><li>Function</li><li>Array</li><li>Object</li></ul><p>&#x548C; Java &#x4E00;&#x6837;&#xFF0C;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x90FD;&#x662F;&#x57FA;&#x4E8E; Object&#xFF08;&#x9664;&#x4E86; undefined ?)</p><p>&#x901A;&#x8FC7; &#x300C;var&#x300D;&#x5173;&#x952E;&#x5B57;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x65B9;&#x6CD5;&#x548C;&#x5927;&#x591A;&#x6570;&#x8BED;&#x8A00;&#x4E00;&#x6837;&#x3002;</p><p>JS &#x662F;&#x52A8;&#x6001;&#x8BED;&#x8A00;&#xFF0C;&#x53D8;&#x91CF;&#x4E0D;&#x7528;&#x533A;&#x5206;&#x7C7B;&#x578B;&#xFF0C;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x4E4B;&#x95F4;&#x7684;&#x53D8;&#x91CF;&#x53EF;&#x4EE5;&#x76F8;&#x4E92;&#x8D4B;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 1&#xFF1B;
var bar;
var a, b, c;
bar = foo = &#x201C;abcd&#x201D;
undefined &#x548C; null" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>&#xFF1B;
<span class="hljs-keyword">var</span> bar;
<span class="hljs-keyword">var</span> a, b, c;
bar = foo = &#x201C;abcd&#x201D;
<span class="hljs-literal">undefined</span> &#x548C; <span class="hljs-literal">null</span></code></pre><p>&#x5F53;&#x4E00;&#x4E2A;&#x503C;&#x6CA1;&#x6709;&#x521D;&#x59CB;&#x503C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A; undefined&#x3002;</p><p>undefined &#x5728; JS &#x4E2D;&#x662F;&#x4E2A;&#x8BED;&#x8A00;&#x8BBE;&#x8BA1;&#x7684;&#x7F3A;&#x9677;&#x4F8B;&#x5B50;&#x3002;</p><p>undefined &#x7684;&#x884C;&#x4E3A;&#x5728;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x548C; null &#x4E00;&#x6837;&#xFF0C;&#x90FD;&#x662F;&#x4E0D;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x5728; typeof &#x7684;&#x65F6;&#x5019;&#x7ED3;&#x679C;&#x4E0D;&#x540C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var und;
var nl = null;
typeof und === &#x2019;undefined&#x2019;
typeof nl == &#x2018;object&#x2019;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> und;
<span class="hljs-keyword">var</span> nl = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">typeof</span> und === &#x2019;<span class="hljs-literal">undefined</span>&#x2019;
<span class="hljs-keyword">typeof</span> nl == &#x2018;object&#x2019;</code></pre><h2 id="articleHeader2">&#x6570;&#x5B57;</h2><p>Boolean&#xFF0C; Number&#xFF0C;String &#x7684;&#x884C;&#x4E3A;&#x548C;&#x5927;&#x591A;&#x6570;&#x8BED;&#x8A00;&#x4E00;&#x6837;&#x3002;</p><p>&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x58F0;&#x660E;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3001;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x58F0;&#x660E;&#xFF0C;&#x4E09;&#x8005;&#x6CA1;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 123
var a = new Number(123)
var a = Number(123)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">123</span>)
<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Number</span>(<span class="hljs-number">123</span>)</code></pre><p>&#x5728; JS &#x4E2D; &#x6570;&#x5B57;&#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#x662F; -253 - 1 &#x5230; 253 - 1&#xFF0C;&#x8303;&#x56F4;&#x5C0F;&#x4E8E; long &#x578B;&#xFF0C;&#x5E76;&#x4E14;&#x8BA1;&#x7B97;&#x65F6;&#x6709;&#x7CBE;&#x5EA6;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.2 / 0.2
// 5.999999999999999" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.2</span> / <span class="hljs-number">0.2</span>
<span class="hljs-comment">// 5.999999999999999</span></code></pre><p>&#x58F0;&#x660E;&#x6570;&#x5B57;&#x7684;&#x65B9;&#x5F0F;&#x548C;&#x5176;&#x5B83;&#x8BED;&#x8A00;&#x7C7B;&#x4F3C;&#xFF0C;&#x79D1;&#x5B66;&#x8BA1;&#x6570;&#x6CD5;&#x3001;&#x516B;&#x8FDB;&#x5236;&#x3001;&#x5341;&#x516D;&#x8FDB;&#x5236;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1e3
// 1000
var a = 0o12
// 10
var a = 0xa
// 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1e3</span>
<span class="hljs-comment">// 1000</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">0o12</span>
<span class="hljs-comment">// 10</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">0xa</span>
<span class="hljs-comment">// 10</span></code></pre><p>&#x901A;&#x8FC7; &#x300C;toString&#x300D;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;&#x8FDB;&#x5236;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1000
a.toString(10)
// &#x201C;1000&#x201D;
a.toString(8)
// &#x201C;1750&#x201D;
a.toString(16)
// &#x201C;3e8&#x201D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1000</span>
a.toString(<span class="hljs-number">10</span>)
<span class="hljs-comment">// &#x201C;1000&#x201D;</span>
a.toString(<span class="hljs-number">8</span>)
<span class="hljs-comment">// &#x201C;1750&#x201D;</span>
a.toString(<span class="hljs-number">16</span>)
<span class="hljs-comment">// &#x201C;3e8&#x201D;</span></code></pre><p>&#x5728; JS &#x4E2D;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x6570;&#x5B57;&#xFF0C;NaN &#x548C; Infinity&#x3002;</p><p>&#x5F53;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x8F6C;&#x6362;&#x6210;&#x6570;&#x5B57;&#x5931;&#x8D25;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x8FD4;&#x56DE; NaN&#xFF0C;&#x4F46;&#x662F; NaN &#x7684;&#x7C7B;&#x578B;&#x4F9D;&#x7136;&#x662F; number&#x3002;</p><p>NaN &#x548C;&#x4EFB;&#x4F55;&#x6570;&#x5B57;&#x8BA1;&#x7B97;&#x540E;&#xFF0C;&#x7ED3;&#x679C;&#x90FD;&#x662F; NaN&#x3002;</p><p>&#x5F53;&#x6570;&#x5B57;&#x9664;&#x4EE5; 0 &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x8FD4;&#x56DE; Infinity&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(undefined)
// NaN
Number(null) // &#x6211;&#x4E5F;&#x5F88;&#x8D39;&#x89E3;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48; null &#x8F6C;&#x6362;&#x6210;&#x6570;&#x5B57;&#x5C31;&#x662F; 0
// 0 
Number(&quot;asdf&quot;)
// NaN
10 / 0
//Infinity" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Number</span>(<span class="hljs-literal">undefined</span>)
<span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-literal">null</span>) <span class="hljs-comment">// &#x6211;&#x4E5F;&#x5F88;&#x8D39;&#x89E3;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48; null &#x8F6C;&#x6362;&#x6210;&#x6570;&#x5B57;&#x5C31;&#x662F; 0</span>
<span class="hljs-comment">// 0 </span>
<span class="hljs-built_in">Number</span>(<span class="hljs-string">&quot;asdf&quot;</span>)
<span class="hljs-comment">// NaN</span>
<span class="hljs-number">10</span> / <span class="hljs-number">0</span>
<span class="hljs-comment">//Infinity</span></code></pre><h2 id="articleHeader3">&#x5B57;&#x7B26;&#x4E32;</h2><p>&#x5728; JS &#x4E2D;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x53EF;&#x53D8;&#x957F;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; &#x300C;+&#x300D; &#x64CD;&#x4F5C;&#x7B26;&#x505A;&#x62FC;&#x63A5;&#x3002;</p><p>&#x5B57;&#x7B26;&#x4E32;&#x5728;&#x5185;&#x5BB9;&#x4E2D;&#x5E94;&#x8BE5;&#x662F;&#x53CC;&#x5B57;&#x8282;&#x50A8;&#x5B58;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7D22;&#x5F15;&#x8BBF;&#x95EE;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6BCF;&#x4E2A; byte&#x3002;</p><p>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7F16;&#x7801;&#x683C;&#x5F0F;&#x6839;&#x636E;&#x7F51;&#x9875;&#x7684;&#x7F16;&#x7801;&#x683C;&#x5F0F;&#x800C;&#x8BBE;&#x7F6E;&#xFF08;&#x5728; node &#x4E2D;&#x9ED8;&#x8BA4;&#x662F; UTF8&#xFF1F;)</p><p>&#x5728; JS &#x4E2D;&#xFF0C;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x901A;&#x8FC7;&#x5355;&#x5F15;&#x53F7;&#x6216;&#x8005;&#x53CC;&#x5F15;&#x53F7;&#x90FD;&#x53EF;&#x4EE5;&#xFF0C;&#x4E8C;&#x8005;&#x6CA1;&#x6709;&#x533A;&#x522B;&#x3002;&#x901A;&#x5E38;&#x4E60;&#x60EF;&#x662F;&#x901A;&#x8FC7;&#x5355;&#x5F15;&#x53F7;&#x8BBF;&#x95EE;&#xFF0C;&#x56E0;&#x4E3A;&#x53EF;&#x4EE5;&#x5C11;&#x6309;&#x4E00;&#x4E2A; shift&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = &#x2018;123&#x2019;
var b = &#x201C;123&#x201D;
a == b
a[0]  // &#x901A;&#x8FC7;&#x7D22;&#x5F15;&#x8BBF;&#x95EE;&#x7684;&#x7ED3;&#x679C;&#x4ECD;&#x7136;&#x662F;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;
// &#x201C;1&#x201D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = &#x2018;<span class="hljs-number">123</span>&#x2019;
<span class="hljs-keyword">var</span> b = &#x201C;<span class="hljs-number">123</span>&#x201D;
a == b
a[<span class="hljs-number">0</span>]  <span class="hljs-comment">// &#x901A;&#x8FC7;&#x7D22;&#x5F15;&#x8BBF;&#x95EE;&#x7684;&#x7ED3;&#x679C;&#x4ECD;&#x7136;&#x662F;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-comment">// &#x201C;1&#x201D;</span></code></pre><h2 id="articleHeader4">&#x51FD;&#x6570;</h2><p>&#x51FD;&#x6570;&#x5728; JS &#x4E2D;&#x662F;&#x4E00;&#x7B49;&#x516C;&#x6C11;&#xFF0C;&#x53EF;&#x4EE5;&#x8D4B;&#x503C;&#x7ED9;&#x53D8;&#x91CF;&#xFF0C;&#x6709;&#x4E24;&#x79CD;&#x58F0;&#x660E;&#x65B9;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function plus(a, b) { return a + b}
var plus = function(a, b) { return a + b }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus</span>(<span class="hljs-params">a, b</span>) </span>{ <span class="hljs-keyword">return</span> a + b}
<span class="hljs-keyword">var</span> plus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{ <span class="hljs-keyword">return</span> a + b }</code></pre><p>&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#x5176;&#x5B9E;&#x662F;&#x5C06;&#x4E00;&#x4E2A;&#x300C;&#x533F;&#x540D;&#x51FD;&#x6570;&#x300D;&#x590D;&#x5236;&#x7ED9;&#x4E86;&#x53D8;&#x91CF; plus&#x3002;</p><p>&#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x5728;&#x4F7F;&#x7528;&#x4E0A;&#x6CA1;&#x592A;&#x5927;&#x533A;&#x522B;&#xFF0C;&#x9664;&#x4E86;&#x5728;&#x300C;&#x58F0;&#x660E;&#x524D;&#x7F6E;&#x300D;&#x7684;&#x573A;&#x666F;&#x4E0B;&#x4F1A;&#x6709;&#x70B9;&#x533A;&#x522B;</p><p>&#x533F;&#x540D;&#x51FD;&#x6570;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x53EB;&#x505A;&#x300C;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x300D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(a, b){ return a + b })(10, 20)
// 30" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>)</span>{ <span class="hljs-keyword">return</span> a + b })(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)
<span class="hljs-comment">// 30</span></code></pre><p>&#x51FD;&#x6570;&#x53EA;&#x4F1A;&#x5C06; return &#x58F0;&#x660E;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x58F0;&#x660E; return &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE; undefined</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function plus (a, b) { a + b }
plus(1, 2)
// undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus</span> (<span class="hljs-params">a, b</span>) </span>{ a + b }
plus(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
<span class="hljs-comment">// undefined</span></code></pre><p>&#x51FD;&#x6570;&#x548C;&#x4F5C;&#x7528;&#x57DF;<br>&#x51FD;&#x6570;&#x548C;&#x53D8;&#x91CF;&#x4E00;&#x6837;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x58F0;&#x660E;&#x3001;&#x4F7F;&#x7528;&#xFF0C;</p><p>&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x72EC;&#x7ACB;&#x51FA;&#x4E86;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x5D4C;&#x5957;&#x3002;</p><p>&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x672C;&#x8EAB;&#x4E5F;&#x5728;&#x7236;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(b) {
    var a = 10
    // &#x8FD9;&#x91CC;&#x5C5E;&#x4E8E; foo &#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5185;&#x90E8;&#x6709; bar, b, a &#x4E09;&#x4E2A;&#x53D8;&#x91CF;
    function bar() {
        var c = 20;
        return a + b + c // &#x8FD9;&#x91CC;&#x5C5E;&#x4E8E; bar &#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x56E0;&#x4E3A;&#x5728; foo &#x4E4B;&#x5185;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; a &#x548C; b
    }
    // &#x8FD9;&#x91CC;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE; c
    return bar();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">b</span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C5E;&#x4E8E; foo &#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5185;&#x90E8;&#x6709; bar, b, a &#x4E09;&#x4E2A;&#x53D8;&#x91CF;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> c = <span class="hljs-number">20</span>;
        <span class="hljs-keyword">return</span> a + b + c <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C5E;&#x4E8E; bar &#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x56E0;&#x4E3A;&#x5728; foo &#x4E4B;&#x5185;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; a &#x548C; b</span>
    }
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE; c</span>
    <span class="hljs-keyword">return</span> bar();
}</code></pre><p>&#x7531;&#x4E8E; JS &#x5728;&#x8BBE;&#x8BA1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6015;&#x7528;&#x6237;&#x4E0D;&#x7406;&#x89E3;&#x53D8;&#x91CF;&#x9700;&#x8981;&#x5148;&#x58F0;&#x660E;&#x518D;&#x4F7F;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x53D8;&#x91CF;&#x4F1A;&#x6709;&#x300C;&#x58F0;&#x660E;&#x524D;&#x7F6E;&#x300D;&#xFF0C;&#x5E2E;&#x52A9;&#x5927;&#x5BB6;&#x63D0;&#x524D;&#x58F0;&#x660E;&#x6240;&#x9700;&#x8981;&#x7684;&#x53D8;&#x91CF;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x7528;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x6765;&#x89E3;&#x91CA;&#x4EC0;&#x4E48;&#x53EB;&#x300C;&#x58F0;&#x660E;&#x524D;&#x7F6E;&#x300D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    console.log(fn, foo);
    function fn(a, b){ return a + b };
    var foo = 1234;
    console.log(fn, foo);
})()
// function (a, b){ return a + b } undefined
// function (a, b){ return a + b } 1234" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(fn, foo);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">a, b</span>)</span>{ <span class="hljs-keyword">return</span> a + b };
    <span class="hljs-keyword">var</span> foo = <span class="hljs-number">1234</span>;
    <span class="hljs-built_in">console</span>.log(fn, foo);
})()
<span class="hljs-comment">// function (a, b){ return a + b } undefined</span>
<span class="hljs-comment">// function (a, b){ return a + b } 1234</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    function fn(a, b){ return a + b };
    var foo;
    console.log(fn, foo);&#x2022;
    foo = 1234;
    console.log(fn, foo);
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">a, b</span>)</span>{ <span class="hljs-keyword">return</span> a + b };
    <span class="hljs-keyword">var</span> foo;
    <span class="hljs-built_in">console</span>.log(fn, foo);&#x2022;
    foo = <span class="hljs-number">1234</span>;
    <span class="hljs-built_in">console</span>.log(fn, foo);
})()</code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7528;&#x533F;&#x540D;&#x51FD;&#x6570;&#x8D4B;&#x503C;&#x7ED9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x6709;&#x4E0B;&#x9762;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    console.log(fn, foo);
    var fn = function(a, b){ return a + b };
    var foo = 1234;
    console.log(fn, foo);
})()

// undefined undefined
// function (a, b){ return a + b } 1234" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(fn, foo);
    <span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>)</span>{ <span class="hljs-keyword">return</span> a + b };
    <span class="hljs-keyword">var</span> foo = <span class="hljs-number">1234</span>;
    <span class="hljs-built_in">console</span>.log(fn, foo);
})()

<span class="hljs-comment">// undefined undefined</span>
<span class="hljs-comment">// function (a, b){ return a + b } 1234</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    var fn, foo;
    console.log(fn, foo);
    fn = function(a, b) { return a + b};
    foo = 1234;
    console.log(fn, foo);
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> fn, foo;
    <span class="hljs-built_in">console</span>.log(fn, foo);
    fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{ <span class="hljs-keyword">return</span> a + b};
    foo = <span class="hljs-number">1234</span>;
    <span class="hljs-built_in">console</span>.log(fn, foo);
})()</code></pre><h2 id="articleHeader5">&#x6570;&#x7EC4;</h2><p>&#x5728; JS &#x4E2D;&#x6570;&#x7EC4;&#x662F;&#x53EF;&#x53D8;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x6570;&#x7EC4;&#x5185;&#x53EF;&#x4EE5;&#x653E;&#x4EFB;&#x4F55;&#x503C;&#x3002;</p><p>&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#x662F;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x52A0;&#x4E00;&#x3002;</p><p>&#x5982;&#x679C;&#x8BBF;&#x95EE;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5C06;&#x4F1A;&#x8FD4;&#x56DE; unfined</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [];
array[0] = 1;
array[2] = &#x201C;1234&#x201D;;
array[4] = function(){};
// [1, undefined, &#x201C;1234&#x201D;, function(){}]
array[1]
// undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [];
array[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>;
array[<span class="hljs-number">2</span>] = &#x201C;<span class="hljs-number">1234</span>&#x201D;;
array[<span class="hljs-number">4</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-comment">// [1, undefined, &#x201C;1234&#x201D;, function(){}]</span>
array[<span class="hljs-number">1</span>]
<span class="hljs-comment">// undefined</span></code></pre><p>js &#x6570;&#x7EC4;&#x4E2D;&#x81EA;&#x5E26;&#x4E86;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#xFF0C;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x5BF9;&#x6570;&#x7EC4;&#x505A;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4; map&#xFF0C; reduce &#x7B49;&#x7B49;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(function(d) { return d + 1 })
// [2, 3, 4]
[1, 2, 3].reduce(function(r, d) { return r + d }, 0)
// 6" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d</span>) </span>{ <span class="hljs-keyword">return</span> d + <span class="hljs-number">1</span> })
<span class="hljs-comment">// [2, 3, 4]</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r, d</span>) </span>{ <span class="hljs-keyword">return</span> r + d }, <span class="hljs-number">0</span>)
<span class="hljs-comment">// 6</span></code></pre><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; delete &#x5173;&#x952E;&#x8BCD;&#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x5C06;&#x7D22;&#x5F15;&#x7684;&#x4F4D;&#x7F6E;&#x8BBE;&#x7F6E;&#x6210; undefined</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 3]
delete array[1]
// [1, undefined, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="hljs-keyword">delete</span> array[<span class="hljs-number">1</span>]
<span class="hljs-comment">// [1, undefined, 3]</span></code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x4E2D;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x7F29;&#x77ED;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x7528;&#x5230; splice&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 3]
array.splice(1, 1)
console.log(array)
// [1, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
array.splice(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>)
<span class="hljs-built_in">console</span>.log(array)
<span class="hljs-comment">// [1, 3]</span></code></pre><p>&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;&#x8FD8;&#x6709; slice, forEach, find, every, includes &#x7B49;&#x7B49;</p><h2 id="articleHeader6">&#x5BF9;&#x8C61;</h2><p>&#x548C; java &#x4E00;&#x6837;&#xFF0C;&#x5BF9;&#x8C61;&#xFF08;Object&#xFF09; &#x662F;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x7684;&#x57FA;&#x7C7B;&#x3002;&#x5B83;&#x7C7B;&#x4F3C; JSON &#x91CC;&#x7684;&#x952E;&#x503C;&#x5BF9;&#x7ED3;&#x6784;&#x4F53;&#xFF0C;&#x53EF;&#x4EE5;&#x52A8;&#x6001;&#x7684;&#x6302;&#x8F7D;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#x3002;</p><p>&#x58F0;&#x660E;&#x7684;&#x65B9;&#x6CD5;&#x6709;&#x4E24;&#x79CD;&#xFF0C;{} &#x548C; new</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}
var b = new Object()
a.num = 1
a.str = &quot;1234&quot;
console.log(a)
// { num: 1, str: &quot;1234&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {}
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>()
a.num = <span class="hljs-number">1</span>
a.str = <span class="hljs-string">&quot;1234&quot;</span>
<span class="hljs-built_in">console</span>.log(a)
<span class="hljs-comment">// { num: 1, str: &quot;1234&quot;}</span></code></pre><p>&#x5BF9;&#x8C61;&#xFF08;Object&#xFF09;&#x6709;&#x70B9;&#x7C7B;&#x4F3C; Java &#x91CC;&#x7684; HashMap&#xFF0C;&#x4F46; Key &#x53EA;&#x80FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7D22;&#x5F15;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8BBF;&#x95EE;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x952E;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x548C;&#x70B9;&#x64CD;&#x4F5C;&#x7B26;&#x662F;&#x4E00;&#x6837;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5F53;&#x952E;&#x540D;&#x7531;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x7684;&#x5B57;&#x7B26;&#x7EC4;&#x6210;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7D22;&#x5F15;&#x65B9;&#x5F0F;&#x8BBF;&#x95EE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {value: 1234}
console.log(obj[&quot;value&quot;])
// 1234" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">value</span>: <span class="hljs-number">1234</span>}
<span class="hljs-built_in">console</span>.log(obj[<span class="hljs-string">&quot;value&quot;</span>])
<span class="hljs-comment">// 1234</span></code></pre><p>&#x8FD9;&#x6837;&#x58F0;&#x660E;&#x6216;&#x8005;&#x8BBF;&#x95EE;&#x4F1A;&#x62A5;&#x9519;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { some-value: 1234 }
obj.some-value" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = { some-value: <span class="hljs-number">1234</span> }
obj.some-value</code></pre><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BA9;&#x7F16;&#x8BD1;&#x5668;&#x77E5;&#x9053; some-value &#x662F;&#x4E00;&#x4E2A;&#x952E;&#x540D;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x5C06;&#x5B83;&#x4EEC;&#x7528;&#x5F15;&#x53F7;&#x62EC;&#x8D77;&#x6765;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { &quot;some-value&quot;: 1234 }
obj[&quot;some-value&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = { <span class="hljs-string">&quot;some-value&quot;</span>: <span class="hljs-number">1234</span> }
obj[<span class="hljs-string">&quot;some-value&quot;</span>]</code></pre><p>&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#x6302;&#x8F7D;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; this &#x6765;&#x8BBF;&#x95EE;&#x5BF9;&#x8C61;&#x5185;&#x7684;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#xFF0C;this &#x4E5F;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x300C;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x300D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn () { console.log(this.value) }
var obj = { fn: fn, value: 1234 }
obj.fn() // &#x6B64;&#x65F6; fn &#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F; obj
// 1234

var otherObj = { fn: fn, value: &quot;abcd&quot;}
otherObj.fn() // &#x6B64;&#x65F6; fn &#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F; otherObj
// &quot;abcd&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value) }
<span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">fn</span>: fn, <span class="hljs-attr">value</span>: <span class="hljs-number">1234</span> }
obj.fn() <span class="hljs-comment">// &#x6B64;&#x65F6; fn &#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F; obj</span>
<span class="hljs-comment">// 1234</span>

<span class="hljs-keyword">var</span> otherObj = { <span class="hljs-attr">fn</span>: fn, <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;abcd&quot;</span>}
otherObj.fn() <span class="hljs-comment">// &#x6B64;&#x65F6; fn &#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F; otherObj</span>
<span class="hljs-comment">// &quot;abcd&quot;</span></code></pre><p>&#x7531;&#x4E8E;&#x51FD;&#x6570;&#x548C;&#x6570;&#x7EC4;&#x662F;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x7684;&#x57FA;&#x7C7B;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x50CF;&#x5BF9;&#x8C61;&#x4E00;&#x6837;&#x968F;&#x610F;&#x7684;&#x6269;&#x5C55;&#x5C5E;&#x6027;&#x3002;</p><p>&#x4F46;&#x662F;&#x5B57;&#x9762;&#x91CF;&#xFF08;&#x5982;&#x6570;&#x5B57;&#x3001;&#x5E03;&#x5C14;&#x503C;&#x3001;&#x5B57;&#x7B26;&#x4E32;&#x3001;null&#x3001;undefined&#xFF09; &#x662F;&#x4E0D;&#x80FD;&#x968F;&#x610F;&#x6269;&#x5C55;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function plus(a, b) { return a + b}
plus.value = 1234
plus(12, plus.value)
// 1246
 
var array = []
array.value = 1234
console.log(array.value)
// 1234
 
var a = true;
a.value = 1234
console.log(a.value)
// undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus</span>(<span class="hljs-params">a, b</span>) </span>{ <span class="hljs-keyword">return</span> a + b}
plus.value = <span class="hljs-number">1234</span>
plus(<span class="hljs-number">12</span>, plus.value)
<span class="hljs-comment">// 1246</span>
 
<span class="hljs-keyword">var</span> array = []
array.value = <span class="hljs-number">1234</span>
<span class="hljs-built_in">console</span>.log(array.value)
<span class="hljs-comment">// 1234</span>
 
<span class="hljs-keyword">var</span> a = <span class="hljs-literal">true</span>;
a.value = <span class="hljs-number">1234</span>
<span class="hljs-built_in">console</span>.log(a.value)
<span class="hljs-comment">// undefined</span></code></pre><h2 id="articleHeader7">&#x8FD0;&#x7B97;&#x7B26;</h2><p>JS &#x7684;&#x8FD0;&#x7B97;&#x7B26;&#x548C;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x57FA;&#x672C;&#x7C7B;&#x4F3C;&#xFF0C;&#x5C31;+-*%/&#x8FD9;&#x4E9B;&#xFF0C;&#x5916;&#x52A0;&#x4E00;&#x4E9B;&#x4E8C;&#x8FDB;&#x5236;&#x64CD;&#x4F5C;&#x7B26;&#x3002;</p><p>&#x4F46;&#x56E0;&#x4E3A; JS &#x5F31;&#x7C7B;&#x578B;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6709;&#x4E9B;&#x573A;&#x666F;&#x662F;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x6CA1;&#x6709;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x52A0;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1+&quot;2&quot;
// &quot;12&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span>+<span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-comment">// &quot;12&quot;</span></code></pre><p>&#x8FD9;&#x79CD;&#x573A;&#x666F;&#x8FD8;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#xFF0C;&#x6570;&#x5B57;&#x548C;&#x5B57;&#x7B26;&#x4E32;&#x76F8;&#x52A0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6570;&#x5B57;&#x901A;&#x8FC7;&#x8C03;&#x7528; toString &#x88AB;&#x8F6C;&#x6362;&#x6210;&#x4E86;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + {}
// &quot;1[object Object]&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span> + {}
<span class="hljs-comment">// &quot;1[object Object]&quot;</span></code></pre><p>&#x6570;&#x5B57;&#x548C;&#x5BF9;&#x8C61;&#x76F8;&#x52A0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x5B57;&#x90FD;&#x8C03;&#x7528;&#x4E86; toString&#xFF0C;&#x88AB;&#x8F6C;&#x6362;&#x6210;&#x4E86;&#x5B57;&#x7B26;&#x4E32;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{} + []
// 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{} + []
<span class="hljs-comment">// 0</span></code></pre><p>&#x4F46;&#x662F;&#x7A7A;&#x5BF9;&#x8C61;&#x548C;&#x7A7A;&#x6570;&#x7EC4;&#x76F8;&#x52A0;&#x7ED3;&#x679C;&#x5374;&#x662F; 0&#xFF0C;&#x6211;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}
if (obj) console.log(&quot;obj is true&quot;)
// &quot;obj is true&quot;

obj == true
// false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {}
<span class="hljs-keyword">if</span> (obj) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;obj is true&quot;</span>)
<span class="hljs-comment">// &quot;obj is true&quot;</span>

obj == <span class="hljs-literal">true</span>
<span class="hljs-comment">// false</span></code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;obj &#x662F;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;&#xFF0C;&#x5728; if &#x6761;&#x4EF6;&#x5224;&#x65AD;&#x4E2D;&#x88AB;&#x5F53;&#x4F5C;&#x771F;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x548C; true &#x5BF9;&#x6BD4;&#x7684;&#x65F6;&#x5019;&#x5374;&#x8FD4;&#x56DE; false&#x3002;</p><p>JS &#x7684;&#x9690;&#x5F0F;&#x8F6C;&#x6362;&#x89C4;&#x5219;&#x5F88;&#x8BE1;&#x5F02;&#xFF0C;&#x5F88;&#x591A;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x65E9;&#x671F;&#x7248;&#x672C;&#x4E2D;&#x9519;&#x8BEF;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x91CC;&#x6CA1;&#x5FC5;&#x8981;&#x7EC6;&#x7A76;&#x8F6C;&#x6362;&#x89C4;&#x5219;&#x662F;&#x4EC0;&#x4E48;&#x3002;</p><p>&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x8BB0;&#x4F4F;&#x4EE5;&#x540E;&#x7528;&#x4E25;&#x683C;&#x76F8;&#x7B49;&#x7B26;&#xFF08;===&#xFF09;&#x4F5C;&#x5BF9;&#x6BD4;&#xFF0C;&#x907F;&#x514D;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x53D8;&#x91CF;&#x76F8;&#x4E92;&#x8FD0;&#x7B97;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;1&quot; == 1
// true

&quot;1&quot; === 1
// false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-string">&quot;1&quot;</span> == <span class="hljs-number">1</span>
<span class="hljs-comment">// true</span>

<span class="hljs-string">&quot;1&quot;</span> === <span class="hljs-number">1</span>
<span class="hljs-comment">// false</span></code></pre><h2 id="articleHeader8">&#x5FAA;&#x73AF;</h2><p>JS &#x7684;&#x5FAA;&#x73AF;&#x548C;&#x5176;&#x5B83;&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x90FD;&#x662F; for&#xFF0C; do..while &#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4E0D;&#x7528; for &#x4F5C;&#x5FAA;&#x73AF;&#xFF0C;&#x800C;&#x662F;&#x7528;&#x6570;&#x7EC4;&#x65B9;&#x6CD5; forEach&#xFF0C;map&#xFF08;&#x56E0;&#x4E3A; for &#x5199;&#x8D77;&#x6765;&#x5F88;&#x9EBB;&#x70E6;&#xFF0C;&#x800C;&#x4E14;&#x8FD8;&#x9700;&#x8981;&#x5355;&#x72EC;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].forEach(function(value) {
  return value + 1;
})
// [2, 3, 4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> value + <span class="hljs-number">1</span>;
})
<span class="hljs-comment">// [2, 3, 4]</span></code></pre><p>&#x53E6;&#x5916;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; for...in &#x6765;&#x904D;&#x5386;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1, b:2, c: 3}
for (var key in obj) {
  console.log(key)
}
// &quot;a&quot;
// &quot;b&quot;
// &quot;c&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
  <span class="hljs-built_in">console</span>.log(key)
}
<span class="hljs-comment">// &quot;a&quot;</span>
<span class="hljs-comment">// &quot;b&quot;</span>
<span class="hljs-comment">// &quot;c&quot;</span></code></pre><p>&#x4F46;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4E5F;&#x4E0D;&#x8FD9;&#x4E48;&#x7528;&#xFF0C;&#x800C;&#x662F;&#x7528; Object.keys &#x53D6;&#x5F97;&#x5305;&#x542B;&#x5BF9;&#x8C61;&#x6240;&#x6709;&#x952E;&#x7684;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1, b:2, c: 3}
Object.keys(obj)
// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
 
Object.keys(obj).forEach(console.log)
// &quot;a&quot;
// &quot;b&quot;
// &quot;c&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>}
<span class="hljs-built_in">Object</span>.keys(obj)
<span class="hljs-comment">// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span>
 
<span class="hljs-built_in">Object</span>.keys(obj).forEach(<span class="hljs-built_in">console</span>.log)
<span class="hljs-comment">// &quot;a&quot;</span>
<span class="hljs-comment">// &quot;b&quot;</span>
<span class="hljs-comment">// &quot;c&quot;</span></code></pre><h2 id="articleHeader9">&#x8BFE;&#x540E;&#x4E60;&#x9898;</h2><p>&#x7B2C;&#x4E00;&#x9898;&#xFF1A;JS &#x7684;&#x8FD0;&#x7528;&#x9886;&#x57DF;&#x90FD;&#x6709;&#x54EA;&#x4E9B;&#xFF0C;&#x4F5C;&#x4E3A;&#x5F31;&#x7C7B;&#x578B;&#x7684;&#x8BED;&#x8A00;&#x6267;&#x884C;&#x6548;&#x7387;&#x5982;&#x4F55;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;</p><p>&#x7B2C;&#x4E8C;&#x9898;&#xFF1A;typeof &#x5173;&#x952E;&#x5B57;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x6709;&#x51E0;&#x79CD;&#x7ED3;&#x679C;?</p><p>&#x7B2C;&#x4E09;&#x9898;&#xFF1A;&#x4E0B;&#x9762;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  0: &quot;a&quot;,
  1: &quot;b&quot;,
  2: &quot;c&quot;
}

[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-number">0</span>: <span class="hljs-string">&quot;a&quot;</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">&quot;b&quot;</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">&quot;c&quot;</span>
}

[<span class="hljs-string">&quot;a&quot;</span>,<span class="hljs-string">&quot;b&quot;</span>,<span class="hljs-string">&quot;c&quot;</span>]</code></pre><p>&#x7B2C;&#x56DB;&#x9898;&#xFF1A;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x4F1A;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;this &#x6307;&#x5411;&#x54EA;&#x91CC;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn () { console.log(this.value) }
fn()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value) }
fn()</code></pre><p>&#x7B2C;&#x4E94;&#x9898;&#xFF1A;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x5982;&#x4F55;&#x88AB;&#x56DE;&#x6536;&#x7684;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
​前端教学讲义：JS基础

## 原文链接
[https://segmentfault.com/a/1190000015620727](https://segmentfault.com/a/1190000015620727)


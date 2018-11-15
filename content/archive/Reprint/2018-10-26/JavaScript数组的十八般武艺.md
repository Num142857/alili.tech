---
title: JavaScript数组的十八般武艺
hidden: true
categories: reprint
slug: d91c2ca5
date: 2018-10-26 02:30:12
---

{{< raw >}}
<p>&#x7EF4;&#x62A4;&#x4E86;&#x4E00;&#x4E2A;&#x6301;&#x7EED;&#x66F4;&#x65B0;&#x7684;github&#x7B14;&#x8BB0;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;&#xFF0C;&#x8BDA;&#x610F;&#x4E4B;&#x4F5C;&#xFF08;&#x672C;&#x6765;&#x5C31;&#x662F;&#x5199;&#x7ED9;&#x81EA;&#x5DF1;&#x770B;&#x7684;&#x2026;&#x2026;&#xFF09;&#x94FE;&#x63A5;&#x5730;&#x5740;&#xFF1A;<a href="https://qiqihaobenben.github.io/Front-End-Basics/" rel="nofollow noreferrer" target="_blank">Front-End-Basics</a></p><p>&#x6B64;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x5730;&#x5740;&#xFF1A;<a href="https://qiqihaobenben.github.io/Front-End-Basics/JavaScript/utility/fe-algorithm/array" rel="nofollow noreferrer" target="_blank">JavaScript&#x7684;&#x6570;&#x7EC4;</a></p><p>&#x57FA;&#x7840;&#x7B14;&#x8BB0;&#x7684;github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/qiqihaobenben/Front-End-Basics" rel="nofollow noreferrer" target="_blank">https://github.com/qiqihaobenben/Front-End-Basics</a> ,&#x53EF;&#x4EE5;watch,&#x4E5F;&#x53EF;&#x4EE5;star&#x3002;</p><hr><p>&#x6B63;&#x6587;&#x5F00;&#x59CB;</p><hr><h2 id="articleHeader0">&#x6570;&#x7EC4;</h2><blockquote>&#x6570;&#x7EC4;&#x662F;&#x503C;&#x7684;&#x6709;&#x5E8F;&#x96C6;&#x5408;&#xFF0C;&#x6BCF;&#x4E2A;&#x503C;&#x53EB;&#x505A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x4EE5;&#x6570;&#x5B57;&#x8868;&#x793A;&#xFF0C;&#x79F0;&#x4E3A;&#x7D22;&#x5F15;&#x3002;</blockquote><ul><li>JavaScript&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;&#x662F;&#x57FA;&#x4E8E;&#x96F6;&#x7684;32&#x4F4D;&#x6570;&#x503C;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7D22;&#x5F15;&#x4E3A;0&#xFF0C;&#x6570;&#x7EC4;&#x6700;&#x5927;&#x80FD;&#x5BB9;&#x7EB3;4294967295&#xFF08;&#x5373;2^32-1&#xFF09;&#x4E2A;&#x5143;&#x7D20;&#x3002;</li><li>JavaScript&#x6570;&#x7EC4;&#x662F;&#x52A8;&#x6001;&#x7684;&#xFF0C;&#x6839;&#x636E;&#x9700;&#x8981;&#x5B83;&#x4EEC;&#x4F1A;&#x589E;&#x957F;&#x6216;&#x7F29;&#x51CF;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x521B;&#x5EFA;&#x6570;&#x7EC4;&#x65F6;&#x65E0;&#x9700;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x5927;&#x5C0F;&#x6216;&#x8005;&#x5728;&#x6570;&#x7EC4;&#x5927;&#x5C0F;&#x53D8;&#x5316;&#x65F6;&#x65E0;&#x9700;&#x91CD;&#x65B0;&#x5206;&#x914D;&#x7A7A;&#x95F4;&#x3002;</li><li>JavaScript&#x6570;&#x7EC4;&#x53EF;&#x80FD;&#x662F;&#x7A00;&#x758F;&#x7684;&#xFF0C;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x4E0D;&#x4E00;&#x5B9A;&#x8981;&#x8FDE;&#x7EED;&#x7684;&#xFF0C;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x53EF;&#x4EE5;&#x6709;&#x7A7A;&#x7F3A;&#x3002;</li><li>&#x6BCF;&#x4E2A;JavaScript&#x6570;&#x7EC4;&#x90FD;&#x6709;&#x4E00;&#x4E2A;length&#x5C5E;&#x6027;&#xFF0C;&#x9488;&#x5BF9;&#x975E;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF0C;&#x8BE5;&#x5C5E;&#x6027;&#x5C31;&#x662F;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x4E2A;&#x6570;&#x3002;&#x9488;&#x5BF9;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF0C;length&#x6BD4;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x90FD;&#x8981;&#x5927;&#x3002;</li></ul><h2 id="articleHeader1">&#x521B;&#x5EFA;&#x6570;&#x7EC4;</h2><h3 id="articleHeader2">1&#x3001;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;(&#x5B57;&#x9762;&#x91CF;)&#x521B;&#x5EFA;&#x6570;&#x7EC4;&#x3002;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var empty = [];     //&#x6CA1;&#x6709;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;
var arr = [1.1, true, &quot;a&quot;,];    //3&#x4E2A;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x5143;&#x7D20;&#x548C;&#x7ED3;&#x5C3E;&#x7684;&#x9017;&#x53F7;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">empty</span> = [];     <span class="hljs-comment">//&#x6CA1;&#x6709;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1.1</span>, <span class="hljs-keyword">true</span>, <span class="hljs-string">&quot;a&quot;</span>,];    <span class="hljs-comment">//3&#x4E2A;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x5143;&#x7D20;&#x548C;&#x7ED3;&#x5C3E;&#x7684;&#x9017;&#x53F7;</span></code></pre><p>&#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;&#x4E2D;&#x7684;&#x503C;&#x4E5F;&#x4E0D;&#x4E00;&#x5B9A;&#x5FC5;&#x987B;&#x662F;&#x5E38;&#x91CF;&#xFF0C;&#x5B83;&#x4EEC;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var number = 1;
var list = [number, number+1, number+2];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> list = [<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>+<span class="hljs-number">1</span>, <span class="hljs-built_in">number</span>+<span class="hljs-number">2</span>];</code></pre><p>&#x5982;&#x679C;&#x7701;&#x7565;&#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x7701;&#x7565;&#x7684;&#x5143;&#x7D20;&#x7528;empty&#x8868;&#x793A;&#xFF08;&#x5C31;&#x662F;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#xFF09;&#xFF0C;&#x8BBF;&#x95EE;&#x7684;&#x8BDD;&#x4F1A;&#x8FD4;&#x56DE;undefined&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var count = [1,,3];     // &#x6570;&#x7EC4;&#x6253;&#x5370;&#x51FA;&#x6765;&#x662F;(3) [1, empty, 3], count[1] === undefined&#x662F;true&#x3002;
var undefs = [,,];      // &#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;&#x8BED;&#x6CD5;&#x5141;&#x8BB8;&#x6709;&#x53EF;&#x9009;&#x7684;&#x7ED3;&#x5C3E;&#x7684;&#x9017;&#x53F7;&#xFF0C;&#x987E;[,,]&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x800C;&#x975E;&#x4E09;&#x4E2A;&#xFF0C;undefs.length &#x662F; 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code>var count = <span class="hljs-string">[1,,3]</span>;     // &#x6570;&#x7EC4;&#x6253;&#x5370;&#x51FA;&#x6765;&#x662F;(<span class="hljs-number">3</span>) <span class="hljs-string">[1, empty, 3]</span>, count<span class="hljs-string">[1]</span> === undefined&#x662F;true&#x3002;
var undefs = <span class="hljs-string">[,,]</span>;      // &#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;&#x8BED;&#x6CD5;&#x5141;&#x8BB8;&#x6709;&#x53EF;&#x9009;&#x7684;&#x7ED3;&#x5C3E;&#x7684;&#x9017;&#x53F7;&#xFF0C;&#x987E;<span class="hljs-string">[,,]</span>&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x800C;&#x975E;&#x4E09;&#x4E2A;&#xFF0C;undefs.length &#x662F; <span class="hljs-number">2</span></code></pre><h3 id="articleHeader3">2&#x3001;&#x6784;&#x9020;&#x51FD;&#x6570;Array()&#x521B;&#x5EFA;&#x6570;&#x7EC4;</h3><p>&#x8C03;&#x7528;&#x65F6;&#x6CA1;&#x6709;&#x53C2;&#x6570;&#xFF0C;&#x7B49;&#x540C;&#x4E8E;[]&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x7684;&#x7A7A;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>();</code></pre><p>&#x8C03;&#x7528;&#x65F6;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#x53C2;&#x6570;&#xFF0C;&#x5B83;&#x6307;&#x5B9A;&#x957F;&#x5EA6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(10)     // (10) [empty &#xD7; 10]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-number">10</span>)     <span class="hljs-comment">// (10) [empty &#xD7; 10]</span></code></pre><p>&#x663E;&#x5F0F;&#x6307;&#x5B9A;&#x4E24;&#x4E2A;&#x6216;&#x8005;&#x591A;&#x4E2A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x6216;&#x8005;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x4E00;&#x4E2A;&#x975E;&#x6570;&#x503C;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(1,2,3,&quot;one&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">&quot;one&quot;</span>);</code></pre><h3 id="articleHeader4">3&#x3001;ES6&#x7684;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;</h3><p>&#xFF08;1&#xFF09;<code>Array.of()</code> &#x8FD4;&#x56DE;&#x7531;&#x6240;&#x6709;&#x53C2;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x8003;&#x8651;&#x53C2;&#x6570;&#x7684;&#x6570;&#x91CF;&#x6216;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x53C2;&#x6570;&#x5C31;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4; <b>(ES6&#x65B0;&#x589E;)</b></p><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p>elementN &#x4EFB;&#x610F;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C06;&#x6309;&#x987A;&#x5E8F;&#x6210;&#x4E3A;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><p>of() &#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x4E0A;&#x8FF0;&#x6784;&#x9020;&#x5668;&#x56E0;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x540C;&#xFF0C;&#x5BFC;&#x81F4;&#x7684;&#x884C;&#x4E3A;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x95EE;&#x9898;(&#x53C2;&#x6570;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#x65F6;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F1A;&#x628A;&#x5B83;&#x5F53;&#x6210;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.of(1,2,3); // [1,2,3]
Array.of(1,{a:1},null,undefined) // [1, {a:1}, null, undefined]

// &#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#x53C2;&#x6570;&#x65F6;
let B = new Array(3);   // (3) [empty &#xD7; 3]
let C = Array.of(3);    // [3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.of(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">// [1,2,3]</span>
<span class="hljs-built_in">Array</span>.of(<span class="hljs-number">1</span>,{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>},<span class="hljs-literal">null</span>,<span class="hljs-literal">undefined</span>) <span class="hljs-comment">// [1, {a:1}, null, undefined]</span>

<span class="hljs-comment">// &#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#x53C2;&#x6570;&#x65F6;</span>
<span class="hljs-keyword">let</span> B = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>);   <span class="hljs-comment">// (3) [empty &#xD7; 3]</span>
<span class="hljs-keyword">let</span> C = <span class="hljs-built_in">Array</span>.of(<span class="hljs-number">3</span>);    <span class="hljs-comment">// [3]</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x65B0;&#x7684; Array &#x5B9E;&#x4F8B;&#x3002;</b></p><p><br></p><p>&#xFF08;2&#xFF09;<code>Array.from()</code>&#x4ECE;&#x4E00;&#x4E2A;&#x7C7B;&#x6570;&#x7EC4;&#x6216;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4; <b>(ES6&#x65B0;&#x589E;)</b></p><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><ul><li>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x60F3;&#x8981;&#x8F6C;&#x6362;&#x6210;&#x6570;&#x7EC4;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x6216;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;</li><li>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF1A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;map&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x5C06;&#x5904;&#x7406;&#x540E;&#x7684;&#x503C;&#x653E;&#x5165;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#x3002;</li><li>&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF1A;&#x7ED1;&#x5B9A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;this&#x5BF9;&#x8C61;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6709;length&#x5C5E;&#x6027;&#x7684;&#x7C7B;&#x6570;&#x7EC4;
Array.from({length&#xFF1A;5},(v,i) =&gt; i)     //[0, 1, 2, 3, 4]

// &#x90E8;&#x7F72;&#x4E86;Iterator&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784; &#x6BD4;&#x5982;:&#x5B57;&#x7B26;&#x4E32;&#x3001;Set&#x3001;NodeList&#x5BF9;&#x8C61;
Array.from(&apos;hello&apos;)    // [&apos;h&apos;,&apos;e&apos;,&apos;l&apos;,&apos;l&apos;,&apos;o&apos;]
Array.from(new Set([&apos;a&apos;,&apos;b&apos;]))   // [&apos;a&apos;,&apos;b&apos;]

// &#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x751F;&#x6210;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5F15;&#x7528;&#x4E0D;&#x540C;&#xFF0C;&#x4FEE;&#x6539;&#x65B0;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;
let arr1 = [1,2,3]
let arr2 = Array.from(arr);
arr2[1] = 4;
console.log(arr1,arr2)
//[1, 2, 3] [1, 4, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// &#x6709;length&#x5C5E;&#x6027;&#x7684;&#x7C7B;&#x6570;&#x7EC4;</span>
<span class="hljs-built_in">Array</span>.from({length&#xFF1A;<span class="hljs-number">5</span>},<span class="hljs-function">(<span class="hljs-params">v,i</span>) =&gt;</span> i)     <span class="hljs-comment">//[0, 1, 2, 3, 4]</span>

<span class="hljs-comment">// &#x90E8;&#x7F72;&#x4E86;Iterator&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784; &#x6BD4;&#x5982;:&#x5B57;&#x7B26;&#x4E32;&#x3001;Set&#x3001;NodeList&#x5BF9;&#x8C61;</span>
<span class="hljs-built_in">Array</span>.from(<span class="hljs-string">&apos;hello&apos;</span>)    <span class="hljs-comment">// [&apos;h&apos;,&apos;e&apos;,&apos;l&apos;,&apos;l&apos;,&apos;o&apos;]</span>
<span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> Set([<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>]))   <span class="hljs-comment">// [&apos;a&apos;,&apos;b&apos;]</span>

<span class="hljs-comment">// &#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x751F;&#x6210;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5F15;&#x7528;&#x4E0D;&#x540C;&#xFF0C;&#x4FEE;&#x6539;&#x65B0;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">let</span> arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-keyword">let</span> arr2 = <span class="hljs-built_in">Array</span>.from(arr);
arr2[<span class="hljs-number">1</span>] = <span class="hljs-number">4</span>;
<span class="hljs-built_in">console</span>.log(arr1,arr2)
<span class="hljs-comment">//[1, 2, 3] [1, 4, 3]</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x65B0;&#x7684; Array &#x5B9E;&#x4F8B;&#x3002;</b></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6570;&#x7EC4;&#x5408;&#x5E76;&#x53BB;&#x91CD;
function combine(){
    let arr = [].concat.apply([], arguments);  //&#x6CA1;&#x6709;&#x53BB;&#x91CD;&#x590D;&#x7684;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x4E4B;&#x540E;&#x7528;Set&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x7279;&#x6027;&#x6765;&#x53BB;&#x91CD;
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x6570;&#x7EC4;&#x5408;&#x5E76;&#x53BB;&#x91CD;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combine</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> arr = [].concat.apply([], <span class="hljs-built_in">arguments</span>);  <span class="hljs-comment">//&#x6CA1;&#x6709;&#x53BB;&#x91CD;&#x590D;&#x7684;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x4E4B;&#x540E;&#x7528;Set&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x7279;&#x6027;&#x6765;&#x53BB;&#x91CD;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr));
}

<span class="hljs-keyword">var</span> m = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>], n = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(combine(m,n));</code></pre><p><br></p><h2 id="articleHeader5">&#x6570;&#x7EC4;&#x65B9;&#x6CD5;</h2><p><span class="img-wrap"><img data-src="/img/bVbeUyP?w=1777&amp;h=818" src="https://static.alili.tech/img/bVbeUyP?w=1777&amp;h=818" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader6"><b>1&#x3001;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;</b></h3><h4>1. push() &#x65B9;&#x6CD5;&#x5728;&#x6570;&#x7EC4;&#x7684;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;<strong>&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;</strong></h4><p>&#x53C2;&#x6570;: item1, item2, ..., itemX ,&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x7684;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3];
let length = arr.push(&apos;&#x672B;&#x5C3E;1&apos;,&apos;&#x672B;&#x5C3E;2&apos;);     // &#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x957F;&#x5EA6;
console.log(arr,length)
// [1, 2, 3, &quot;&#x672B;&#x5C3E;1&quot;, &quot;&#x672B;&#x5C3E;2&quot;] 5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-built_in">let</span> <span class="hljs-built_in">length</span> = arr.<span class="hljs-built_in">push</span>(&apos;&#x672B;&#x5C3E;<span class="hljs-number">1</span>&apos;,&apos;&#x672B;&#x5C3E;<span class="hljs-number">2</span>&apos;);     // &#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x957F;&#x5EA6;
console.<span class="hljs-built_in">log</span>(arr,<span class="hljs-built_in">length</span>)
// [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">&quot;&#x672B;&#x5C3E;1&quot;</span>, <span class="hljs-string">&quot;&#x672B;&#x5C3E;2&quot;</span>] <span class="hljs-number">5</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;</b></p><p><br></p><h4>2. pop() &#x65B9;&#x6CD5;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x51CF;&#x5C0F;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x5E76;<strong>&#x8FD4;&#x56DE;&#x5B83;&#x5220;&#x9664;&#x7684;&#x503C;</strong>&#x3002;</h4><p>&#x53C2;&#x6570;&#xFF1A;&#x65E0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7EC4;&#x5408;&#x4F7F;&#x7528;push()&#x548C;pop()&#x80FD;&#x591F;&#x7528;JavaScript&#x6570;&#x7EC4;&#x5B9E;&#x73B0;&#x5148;&#x8FDB;&#x540E;&#x51FA;&#x7684;&#x6808;
let stack = [];
stack.push(1,2) // &#x8FD4;&#x56DE;&#x957F;&#x5EA6;2&#xFF0C;&#x8FD9;&#x65F6;stack&#x7684;&#x503C;&#x662F;[1,2]
stack.pop()     // &#x8FD4;&#x56DE;&#x5220;&#x9664;&#x7684;&#x503C;2&#xFF0C;&#x8FD9;&#x65F6;stack&#x7684;&#x503C;&#x662F;[1]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-comment">//&#x7EC4;&#x5408;&#x4F7F;&#x7528;push()&#x548C;pop()&#x80FD;&#x591F;&#x7528;JavaScript&#x6570;&#x7EC4;&#x5B9E;&#x73B0;&#x5148;&#x8FDB;&#x540E;&#x51FA;&#x7684;&#x6808;</span>
let <span class="hljs-built_in">stack</span> = [];
<span class="hljs-built_in">stack</span>.push(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>) <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x957F;&#x5EA6;2&#xFF0C;&#x8FD9;&#x65F6;stack&#x7684;&#x503C;&#x662F;[1,2]</span>
<span class="hljs-built_in">stack</span>.pop()     <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5220;&#x9664;&#x7684;&#x503C;2&#xFF0C;&#x8FD9;&#x65F6;stack&#x7684;&#x503C;&#x662F;[1]</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;(&#x5F53;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#x65F6;&#x8FD4;&#x56DE;undefined)&#x3002;</b></p><p><br></p><h4>3. unshift() &#x65B9;&#x6CD5;&#x5728;&#x6570;&#x7EC4;&#x7684;&#x5934;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x5C06;&#x5DF2;&#x5B58;&#x5728;&#x7684;&#x5143;&#x7D20;&#x79FB;&#x52A8;&#x5230;&#x66F4;&#x9AD8;&#x7D22;&#x5F15;&#x7684;&#x4F4D;&#x7F6E;&#x6765;&#x83B7;&#x5F97;&#x8DB3;&#x591F;&#x7684;&#x7A7A;&#x95F4;&#xFF0C;&#x6700;&#x540E;<strong>&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x65B0;&#x7684;&#x957F;&#x5EA6;</strong>&#x3002;</h4><p>&#x53C2;&#x6570;: item1, item2, ..., itemX ,&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x5F00;&#x5934;&#x7684;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [3,4,5];
let length = arr.unshift(1,2);  // &#x8FD4;&#x56DE;&#x957F;&#x5EA6;&#x662F;5
console.log(arr, length)
//[1, 2, 3, 4, 5] 5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let arr = [<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
let length = arr.unshift(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x957F;&#x5EA6;&#x662F;5</span>
console.log(arr, length)
<span class="hljs-comment">//[1, 2, 3, 4, 5] 5</span></code></pre><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> &#x5F53;&#x8C03;&#x7528;unshift()&#x6DFB;&#x52A0;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x53C2;&#x6570;&#x65F6;&#x4E00;&#x6B21;&#x6027;&#x63D2;&#x5165;&#x7684;&#xFF0C;&#x800C;&#x975E;&#x4E00;&#x6B21;&#x4E00;&#x4E2A;&#x5730;&#x63D2;&#x5165;&#x3002;&#x5C31;&#x50CF;&#x662F;&#x4E0A;&#x4F8B;&#x6DFB;&#x52A0;1&#x548C;2&#xFF0C;&#x4ED6;&#x4EEC;&#x63D2;&#x5165;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x987A;&#x5E8F;&#x8DDF;&#x53C2;&#x6570;&#x5217;&#x8868;&#x4E2D;&#x7684;&#x987A;&#x5E8F;&#x4E00;&#x81F4;&#xFF0C;&#x800C;&#x4E0D;&#x662F;[2,1,3,4,5]&#x3002;</p><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;</b></p><p><br></p><h4>4. shift() &#x65B9;&#x6CD5;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5E76;&#x5C06;&#x5176;&#x8FD4;&#x56DE;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x6240;&#x6709;&#x968F;&#x540E;&#x7684;&#x5143;&#x7D20;&#x4E0B;&#x79FB;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x6765;&#x586B;&#x8865;&#x6570;&#x7EC4;&#x5934;&#x90E8;&#x7684;&#x7A7A;&#x7F3A;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;<strong>&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;</strong></h4><p>&#x53C2;&#x6570;: &#x65E0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3];
let item = arr.shift(); // &#x8FD4;&#x56DE;&#x5220;&#x9664;&#x7684;&#x503C;1
console.log(arr, item)
// [2, 3] 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> item = arr.shift(); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5220;&#x9664;&#x7684;&#x503C;1</span>
console.<span class="hljs-built_in">log</span>(arr, item)
<span class="hljs-comment">// [2, 3] 1</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;; &#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#x5219;&#x8FD4;&#x56DE;undefined &#x3002;</b></p><p><br></p><h4>5. splice() &#x65B9;&#x6CD5;&#x662F;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x63D2;&#x5165;&#x6216;&#x5220;&#x9664;&#x5143;&#x7D20;&#x7684;&#x901A;&#x7528;&#x65B9;&#x6CD5;</h4><p><strong>&#x8BED;&#x6CD5;</strong><br><code>array.splice(start[, deleteCount[, item1[, item2[, ...]]]])</code></p><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>start</code>&#x200B;</p><p>&#x6307;&#x5B9A;&#x4FEE;&#x6539;&#x7684;&#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#xFF08;&#x4ECE;0&#x8BA1;&#x6570;&#xFF09;&#x3002;&#x5982;&#x679C;&#x8D85;&#x51FA;&#x4E86;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x4ECE;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x5F00;&#x59CB;&#x6DFB;&#x52A0;&#x5185;&#x5BB9;&#xFF1B;&#x5982;&#x679C;&#x662F;&#x8D1F;&#x503C;&#xFF0C;&#x5219;&#x8868;&#x793A;&#x4ECE;&#x6570;&#x7EC4;&#x672B;&#x4F4D;&#x5F00;&#x59CB;&#x7684;&#x7B2C;&#x51E0;&#x4F4D;&#xFF08;&#x4ECE;-1&#x8BA1;&#x6570;&#xFF09;&#xFF1B;&#x82E5;&#x53EA;&#x4F7F;&#x7528;start&#x53C2;&#x6570;&#x800C;&#x4E0D;&#x4F7F;&#x7528;deleteCount&#x3001;item&#xFF0C;&#x5982;&#xFF1A;array.splice(start) &#xFF0C;&#x8868;&#x793A;&#x5220;&#x9664;[start&#xFF0C;end]&#x7684;&#x5143;&#x7D20;&#x3002;</p><p><code>deleteCount</code> (&#x53EF;&#x9009;)</p><p>&#x6574;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x8981;&#x79FB;&#x9664;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x4E2A;&#x6570;&#x3002;&#x5982;&#x679C; deleteCount &#x662F; 0&#xFF0C;&#x5219;&#x4E0D;&#x79FB;&#x9664;&#x5143;&#x7D20;&#x3002;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x81F3;&#x5C11;&#x5E94;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x5143;&#x7D20;&#x3002;&#x5982;&#x679C; deleteCount &#x5927;&#x4E8E;start &#x4E4B;&#x540E;&#x7684;&#x5143;&#x7D20;&#x7684;&#x603B;&#x6570;&#xFF0C;&#x5219;&#x4ECE; start &#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x5C06;&#x88AB;&#x5220;&#x9664;&#xFF08;&#x542B;&#x7B2C; start &#x4F4D;&#xFF09;&#x3002;<br>&#x5982;&#x679C;deleteCount&#x88AB;&#x7701;&#x7565;&#xFF0C;&#x5219;&#x5176;&#x76F8;&#x5F53;&#x4E8E;(arr.length - start)&#x3002;</p><p><code>item1, item2, ...</code> (&#x53EF;&#x9009;)</p><p>&#x8981;&#x6DFB;&#x52A0;&#x8FDB;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;,&#x4ECE;start &#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x6307;&#x5B9A;&#xFF0C;&#x5219; splice() &#x5C06;&#x53EA;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x3002;</p><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x7531;&#x88AB;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x7EC4;&#x6210;&#x7684;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;&#x5982;&#x679C;&#x53EA;&#x5220;&#x9664;&#x4E86;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x53EA;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;&#x3002;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// start&#x4E0D;&#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6;(&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x662F;&#x8FDE;&#x7EED;&#x7684;)
let arr = [1,2,3,4,5];
arr.splice(2)   // arr&#x662F;[1,2]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[3,4,5]
arr.splice(1,1) // arr&#x662F;[1]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[2]
arr.splice(0,3) // arr&#x662F;[]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[1],&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x6570;&#x7EC4;&#x4ECE;&#x7B2C;0&#x4F4D;&#x5F00;&#x59CB;&#x4E0D;&#x591F;3&#x4F4D;&#xFF0C;&#x6240;&#x4EE5;&#x662F;&#x5220;&#x9664;&#x4ECE;0&#x5F00;&#x59CB;&#x5230;&#x6700;&#x540E;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;

// start&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;(&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x662F;&#x8FDE;&#x7EED;&#x7684;)
let arr = [1,2,3,4,5];
arr.splice(5)   // arr&#x662F;[1,2,3,4,5]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[]
arr.splice(5,3,6) // arr&#x662F;[1,2,3,4,5,6]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[]
arr.splice(5,3,7) // arr&#x662F;[1,2,3,4,5,7] &#x8FD4;&#x56DE;&#x503C;&#x662F;[6]

// start&#x662F;&#x8D1F;&#x6570;(&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x662F;&#x8FDE;&#x7EED;&#x7684;)
let arr = [1,2,3,4,5];
arr.splice(-3,2); // arr&#x662F;[1,2,5], &#x8FD4;&#x56DE;&#x503C;&#x662F;[3,4]
arr.splice(-4); // arr&#x662F;[],&#x8FD4;&#x56DE;&#x503C;&#x662F;[1,2,5]

// &#x63D2;&#x5165;&#x6570;&#x7EC4;&#x65F6;&#xFF0C;&#x662F;&#x63D2;&#x5165;&#x6570;&#x7EC4;&#x672C;&#x8EAB;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6570;&#x7EC4;&#x5143;&#x7D20;
let arr = [1,4,5];
arr.splice(1,0,[2,3])   // arr&#x662F;[1,[2,3],4,5]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">// start&#x4E0D;&#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6;(&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x662F;&#x8FDE;&#x7EED;&#x7684;)</span>
let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.splice(<span class="hljs-number">2</span>)   <span class="hljs-comment">// arr&#x662F;[1,2]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[3,4,5]</span>
arr.splice(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>) <span class="hljs-comment">// arr&#x662F;[1]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[2]</span>
arr.splice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>) <span class="hljs-comment">// arr&#x662F;[]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[1],&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x6570;&#x7EC4;&#x4ECE;&#x7B2C;0&#x4F4D;&#x5F00;&#x59CB;&#x4E0D;&#x591F;3&#x4F4D;&#xFF0C;&#x6240;&#x4EE5;&#x662F;&#x5220;&#x9664;&#x4ECE;0&#x5F00;&#x59CB;&#x5230;&#x6700;&#x540E;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;</span>

<span class="hljs-comment">// start&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;(&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x662F;&#x8FDE;&#x7EED;&#x7684;)</span>
let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.splice(<span class="hljs-number">5</span>)   <span class="hljs-comment">// arr&#x662F;[1,2,3,4,5]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[]</span>
arr.splice(<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>) <span class="hljs-comment">// arr&#x662F;[1,2,3,4,5,6]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[]</span>
arr.splice(<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">7</span>) <span class="hljs-comment">// arr&#x662F;[1,2,3,4,5,7] &#x8FD4;&#x56DE;&#x503C;&#x662F;[6]</span>

<span class="hljs-comment">// start&#x662F;&#x8D1F;&#x6570;(&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x662F;&#x8FDE;&#x7EED;&#x7684;)</span>
let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.splice(<span class="hljs-number">-3</span>,<span class="hljs-number">2</span>); <span class="hljs-comment">// arr&#x662F;[1,2,5], &#x8FD4;&#x56DE;&#x503C;&#x662F;[3,4]</span>
arr.splice(<span class="hljs-number">-4</span>); <span class="hljs-comment">// arr&#x662F;[],&#x8FD4;&#x56DE;&#x503C;&#x662F;[1,2,5]</span>

<span class="hljs-comment">// &#x63D2;&#x5165;&#x6570;&#x7EC4;&#x65F6;&#xFF0C;&#x662F;&#x63D2;&#x5165;&#x6570;&#x7EC4;&#x672C;&#x8EAB;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6570;&#x7EC4;&#x5143;&#x7D20;</span>
let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.splice(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,[<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])   <span class="hljs-comment">// arr&#x662F;[1,[2,3],4,5]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[]</span></code></pre><p><br></p><h4>6. sort() &#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x6392;&#x5E8F;&#x5E76;<strong>&#x8FD4;&#x56DE;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x6570;&#x7EC4;</strong></h4><p>&#x53C2;&#x6570;&#xFF1A;</p><p><code>compareFunction</code> (&#x53EF;&#x9009;) &#x7528;&#x6765;&#x6307;&#x5B9A;&#x6309;&#x67D0;&#x79CD;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x6392;&#x5217;&#x7684;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x7701;&#x7565;&#xFF0C;&#x5143;&#x7D20;&#x6309;&#x7167;&#x8F6C;&#x6362;&#x4E3A;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5404;&#x4E2A;&#x5B57;&#x7B26;&#x7684;Unicode&#x4F4D;&#x70B9;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#x3002;<br>&#x5982;&#x679C;&#x6307;&#x660E;&#x4E86; compareFunction &#xFF0C;&#x90A3;&#x4E48;&#x6570;&#x7EC4;&#x4F1A;&#x6309;&#x7167;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x6392;&#x5E8F;&#x3002;&#x5373; a &#x548C; b &#x662F;&#x4E24;&#x4E2A;&#x5C06;&#x8981;&#x88AB;&#x6BD4;&#x8F83;&#x7684;&#x5143;&#x7D20;&#xFF1A;</p><ul><li>&#x5982;&#x679C; compareFunction(a, b) &#x5C0F;&#x4E8E; 0 &#xFF0C;&#x90A3;&#x4E48; a &#x4F1A;&#x88AB;&#x6392;&#x5217;&#x5230; b &#x4E4B;&#x524D;&#xFF1B;</li><li>&#x5982;&#x679C; compareFunction(a, b) &#x7B49;&#x4E8E; 0 &#xFF0C; a &#x548C; b &#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;&#x4E0D;&#x53D8;&#x3002;&#x5907;&#x6CE8;&#xFF1A; ECMAScript &#x6807;&#x51C6;&#x5E76;&#x4E0D;&#x4FDD;&#x8BC1;&#x8FD9;&#x4E00;&#x884C;&#x4E3A;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x4F1A;&#x9075;&#x5B88;&#xFF08;&#x4F8B;&#x5982; Mozilla &#x5728; 2003 &#x5E74;&#x4E4B;&#x524D;&#x7684;&#x7248;&#x672C;&#xFF09;&#xFF1B;</li><li>&#x5982;&#x679C; compareFunction(a, b) &#x5927;&#x4E8E; 0 &#xFF0C; b &#x4F1A;&#x88AB;&#x6392;&#x5217;&#x5230; a &#x4E4B;&#x524D;&#x3002;</li><li>compareFunction(a, b) &#x5FC5;&#x987B;&#x603B;&#x662F;&#x5BF9;&#x76F8;&#x540C;&#x7684;&#x8F93;&#x5165;&#x8FD4;&#x56DE;&#x76F8;&#x540C;&#x7684;&#x6BD4;&#x8F83;&#x7ED3;&#x679C;&#xFF0C;&#x5426;&#x5219;&#x6392;&#x5E8F;&#x7684;&#x7ED3;&#x679C;&#x5C06;&#x662F;&#x4E0D;&#x786E;&#x5B9A;&#x7684;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stringArray = [&quot;Blue&quot;, &quot;Humpback&quot;, &quot;Beluga&quot;];
var numberArray = [40, 1, 5, 200];
function compareNumbers(a, b){
  return a - b;
}
console.log(&apos;stringArray:&apos; + stringArray.join());
console.log(&apos;Sorted:&apos; + stringArray.sort());

console.log(&apos;numberArray:&apos; + numberArray.join());
// &#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6570;&#x5B57;&#x5E76;&#x4E0D;&#x4F1A;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x8BBE;&#x60F3;&#x7684;&#x90A3;&#x6837;&#x6392;&#x5E8F;
console.log(&apos;Sorted without a compare function:&apos;+ numberArray.sort());
console.log(&apos;Sorted with compareNumbers:&apos;+ numberArray.sort(compareNumbers));

//&#x6253;&#x5370;&#x5982;&#x4E0B;
// stringArray: Blue,Humpback,Beluga
// Sorted: Beluga,Blue,Humpback

// numberArray: 40,1,5,200
// Sorted without a compare function: 1,200,40,5
// Sorted with compareNumbers: 1,5,40,200" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> stringArray = [<span class="hljs-string">&quot;Blue&quot;</span>, <span class="hljs-string">&quot;Humpback&quot;</span>, <span class="hljs-string">&quot;Beluga&quot;</span>];
<span class="hljs-keyword">var</span> numberArray = [<span class="hljs-number">40</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">200</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compareNumbers</span>(<span class="hljs-params">a, b</span>)</span>{
  <span class="hljs-keyword">return</span> a - b;
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;stringArray:&apos;</span> + stringArray.join());
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Sorted:&apos;</span> + stringArray.sort());

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;numberArray:&apos;</span> + numberArray.join());
<span class="hljs-comment">// &#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6570;&#x5B57;&#x5E76;&#x4E0D;&#x4F1A;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x8BBE;&#x60F3;&#x7684;&#x90A3;&#x6837;&#x6392;&#x5E8F;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Sorted without a compare function:&apos;</span>+ numberArray.sort());
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Sorted with compareNumbers:&apos;</span>+ numberArray.sort(compareNumbers));

<span class="hljs-comment">//&#x6253;&#x5370;&#x5982;&#x4E0B;</span>
<span class="hljs-comment">// stringArray: Blue,Humpback,Beluga</span>
<span class="hljs-comment">// Sorted: Beluga,Blue,Humpback</span>

<span class="hljs-comment">// numberArray: 40,1,5,200</span>
<span class="hljs-comment">// Sorted without a compare function: 1,200,40,5</span>
<span class="hljs-comment">// Sorted with compareNumbers: 1,5,40,200</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x8FD4;&#x56DE;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x539F;&#x6570;&#x7EC4;&#x5DF2;&#x7ECF;&#x88AB;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x6570;&#x7EC4;&#x4EE3;&#x66FF;&#x3002;</b></p><p><br></p><h4>7. reverse() &#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x98A0;&#x5012;&#x987A;&#x5E8F;&#xFF0C;&#x8FD4;&#x56DE;&#x9006;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x3002;</h4><p>&#x53C2;&#x6570;: &#x65E0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3];
arr.reverse()   // arr&#x662F;[3,2,1]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[3,2,1]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
arr.reverse()   <span class="hljs-comment">// arr&#x662F;[3,2,1]&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;[3,2,1]</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x8FD4;&#x56DE;&#x987A;&#x5E8F;&#x98A0;&#x5012;&#x540E;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x539F;&#x6570;&#x7EC4;&#x5DF2;&#x7ECF;&#x88AB;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x6570;&#x7EC4;&#x4EE3;&#x66FF;&#x3002;</b></p><p><br></p><h4>8. copyWithin() &#x65B9;&#x6CD5;&#x6D45;&#x590D;&#x5236;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x5230;&#x540C;&#x4E00;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x5B83;&#xFF0C;&#x800C;&#x4E0D;&#x4FEE;&#x6539;&#x5176;&#x5927;&#x5C0F;&#x3002; <b>(ES6&#x65B0;&#x589E;)</b></h4><p><strong>&#x8BED;&#x6CD5;&#xFF1A;</strong><br><code>arr.copyWithin(target[, start[, end]])</code></p><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>target</code></p><p>0 &#x4E3A;&#x57FA;&#x5E95;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x590D;&#x5236;&#x5E8F;&#x5217;&#x5230;&#x8BE5;&#x4F4D;&#x7F6E;&#x3002;&#x5982;&#x679C;&#x662F;&#x8D1F;&#x6570;&#xFF0C;target &#x5C06;&#x4ECE;&#x672B;&#x5C3E;&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x3002;</p><p>&#x5982;&#x679C; target &#x5927;&#x4E8E;&#x7B49;&#x4E8E; arr.length&#xFF0C;&#x5C06;&#x4F1A;&#x4E0D;&#x53D1;&#x751F;&#x62F7;&#x8D1D;&#x3002;&#x5982;&#x679C; target &#x5728; start &#x4E4B;&#x540E;&#xFF0C;&#x590D;&#x5236;&#x7684;&#x5E8F;&#x5217;&#x5C06;&#x88AB;&#x4FEE;&#x6539;&#x4EE5;&#x7B26;&#x5408; arr.length&#x3002;</p><p><code>start</code></p><p>0 &#x4E3A;&#x57FA;&#x5E95;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5F00;&#x59CB;&#x590D;&#x5236;&#x5143;&#x7D20;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#x3002;&#x5982;&#x679C;&#x662F;&#x8D1F;&#x6570;&#xFF0C;start &#x5C06;&#x4ECE;&#x672B;&#x5C3E;&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x3002;</p><p>&#x5982;&#x679C; start &#x88AB;&#x5FFD;&#x7565;&#xFF0C;copyWithin &#x5C06;&#x4F1A;&#x4ECE;0&#x5F00;&#x59CB;&#x590D;&#x5236;&#x3002;</p><p><code>end</code></p><p>0 &#x4E3A;&#x57FA;&#x5E95;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5F00;&#x59CB;&#x590D;&#x5236;&#x5143;&#x7D20;&#x7684;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x3002;copyWithin &#x5C06;&#x4F1A;&#x62F7;&#x8D1D;&#x5230;&#x8BE5;&#x4F4D;&#x7F6E;&#xFF0C;<strong>&#x4F46;&#x4E0D;&#x5305;&#x62EC; end &#x8FD9;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x5143;&#x7D20;</strong>&#x3002;&#x5982;&#x679C;&#x662F;&#x8D1F;&#x6570;&#xFF0C; end &#x5C06;&#x4ECE;&#x672B;&#x5C3E;&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x3002;</p><p>&#x5982;&#x679C; end &#x88AB;&#x5FFD;&#x7565;&#xFF0C;copyWithin &#x5C06;&#x4F1A;&#x590D;&#x5236;&#x5230; arr.length&#x3002;</p><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x6539;&#x53D8;&#x4E86;&#x7684;&#x6570;&#x7EC4;&#x3002;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3, 4, 5].copyWithin(-2);
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]


// copyWithin &#x51FD;&#x6570;&#x662F;&#x8BBE;&#x8BA1;&#x4E3A;&#x901A;&#x7528;&#x7684;&#xFF0C;&#x5176;&#x4E0D;&#x8981;&#x6C42;&#x5176; this &#x503C;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;
[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-attr">[1, 2, 3, 4, 5]</span><span class="hljs-selector-class">.copyWithin</span>(-<span class="hljs-number">2</span>);
<span class="hljs-comment">// [1, 2, 3, 1, 2]</span>

<span class="hljs-selector-attr">[1, 2, 3, 4, 5]</span><span class="hljs-selector-class">.copyWithin</span>(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>);
<span class="hljs-comment">// [4, 5, 3, 4, 5]</span>

<span class="hljs-selector-attr">[1, 2, 3, 4, 5]</span><span class="hljs-selector-class">.copyWithin</span>(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>);
<span class="hljs-comment">// [4, 2, 3, 4, 5]</span>

<span class="hljs-selector-attr">[1, 2, 3, 4, 5]</span><span class="hljs-selector-class">.copyWithin</span>(-<span class="hljs-number">2</span>, -<span class="hljs-number">3</span>, -<span class="hljs-number">1</span>);
<span class="hljs-comment">// [1, 2, 3, 3, 4]</span>


<span class="hljs-comment">// copyWithin &#x51FD;&#x6570;&#x662F;&#x8BBE;&#x8BA1;&#x4E3A;&#x901A;&#x7528;&#x7684;&#xFF0C;&#x5176;&#x4E0D;&#x8981;&#x6C42;&#x5176; this &#x503C;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</span>
<span class="hljs-selector-attr">[]</span><span class="hljs-selector-class">.copyWithin</span><span class="hljs-selector-class">.call</span>({<span class="hljs-attribute">length</span>: <span class="hljs-number">5</span>, <span class="hljs-number">3</span>: <span class="hljs-number">1</span>}, <span class="hljs-selector-tag">0</span>, <span class="hljs-selector-tag">3</span>);
<span class="hljs-comment">// {0: 1, 3: 1, length: 5}</span></code></pre><p><br></p><h4>9. fill() &#x65B9;&#x6CD5;&#x7528;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x503C;&#x586B;&#x5145;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x4ECE;&#x8D77;&#x59CB;&#x7D22;&#x5F15;&#x5230;&#x7EC8;&#x6B62;&#x7D22;&#x5F15;&#x5185;&#x7684;&#x5168;&#x90E8;&#x5143;&#x7D20;&#x3002; <b>(ES6&#x65B0;&#x589E;)</b></h4><p><strong>&#x8BED;&#x6CD5;:</strong><br><code>arr.fill(value[, start[, end]])</code></p><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>value</code> &#x7528;&#x6765;&#x586B;&#x5145;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;</p><p><code>start</code> (&#x53EF;&#x9009;) &#x8D77;&#x59CB;&#x7D22;&#x5F15;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#x3002;</p><p><code>end</code> (&#x53EF;&#x9009;) &#x7EC8;&#x6B62;&#x7D22;&#x5F15;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A; this.length&#x3002;</p><p>&#x5982;&#x679C; start &#x662F;&#x4E2A;&#x8D1F;&#x6570;, &#x5219;&#x5F00;&#x59CB;&#x7D22;&#x5F15;&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x8BA1;&#x7B97;&#x6210;&#x4E3A; length+start, &#x5176;&#x4E2D; length &#x662F; this &#x5BF9;&#x8C61;&#x7684; length &#x5C5E;&#x6027;&#x503C;. &#x5982;&#x679C; end &#x662F;&#x4E2A;&#x8D1F;&#x6570;, &#x5219;&#x7ED3;&#x675F;&#x7D22;&#x5F15;&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x8BA1;&#x7B97;&#x6210;&#x4E3A; length+end&#x3002;</p><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4FEE;&#x6539;&#x540E;&#x7684;&#x6570;&#x7EC4;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]

//fill &#x65B9;&#x6CD5;&#x6545;&#x610F;&#x88AB;&#x8BBE;&#x8BA1;&#x6210;&#x901A;&#x7528;&#x65B9;&#x6CD5;, &#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x8981;&#x6C42; this &#x662F;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>);               <span class="hljs-comment">// [4, 4, 4]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, <span class="hljs-number">1</span>);            <span class="hljs-comment">// [1, 4, 4]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>);         <span class="hljs-comment">// [1, 4, 3]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);         <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>);         <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, -<span class="hljs-number">3</span>, -<span class="hljs-number">2</span>);       <span class="hljs-comment">// [4, 2, 3]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, NaN, NaN);     <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>);         <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-selector-tag">Array</span>(<span class="hljs-number">3</span>)<span class="hljs-selector-class">.fill</span>(<span class="hljs-number">4</span>);                <span class="hljs-comment">// [4, 4, 4]</span>

<span class="hljs-comment">//fill &#x65B9;&#x6CD5;&#x6545;&#x610F;&#x88AB;&#x8BBE;&#x8BA1;&#x6210;&#x901A;&#x7528;&#x65B9;&#x6CD5;, &#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x8981;&#x6C42; this &#x662F;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</span>
<span class="hljs-selector-attr">[]</span><span class="hljs-selector-class">.fill</span><span class="hljs-selector-class">.call</span>({ <span class="hljs-attribute">length</span>: <span class="hljs-number">3</span> }, <span class="hljs-selector-tag">4</span>);  <span class="hljs-comment">// {0: 4, 1: 4, 2: 4, length: 3}</span></code></pre><p><br></p><h3 id="articleHeader7"><b>2&#x3001;&#x4E0D;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;</b></h3><h4>1. slice() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4ECE;&#x5F00;&#x59CB;&#x5230;&#x7ED3;&#x675F;&#xFF08;&#x4E0D;&#x5305;&#x62EC;&#x7ED3;&#x675F;&#xFF09;&#x9009;&#x62E9;&#x7684;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x90E8;&#x5206;<strong>&#x6D45;&#x62F7;&#x8D1D;</strong>&#x5230;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;&#x4E14;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x4FEE;&#x6539;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>begin</code> (&#x53EF;&#x9009;)</p><p>&#x4ECE;&#x8BE5;&#x7D22;&#x5F15;&#x5904;&#x5F00;&#x59CB;&#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#xFF08;&#x4ECE;0&#x5F00;&#x59CB;&#xFF09;&#x3002;</p><p><strong>&#x5982;&#x679C;&#x8BE5;&#x53C2;&#x6570;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x5219;&#x8868;&#x793A;&#x4ECE;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5012;&#x6570;&#x7B2C;&#x51E0;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x63D0;&#x53D6;</strong>&#xFF0C;slice(-2)&#x8868;&#x793A;&#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF08;&#x5305;&#x542B;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF09;&#x3002;</p><p>&#x5982;&#x679C;&#x7701;&#x7565; begin&#xFF0C;&#x5219; slice &#x4ECE;&#x7D22;&#x5F15; 0 &#x5F00;&#x59CB;&#x3002;</p><p><code>end</code> (&#x53EF;&#x9009;)</p><p>&#x5728;&#x8BE5;&#x7D22;&#x5F15;&#x5904;&#x7ED3;&#x675F;&#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#xFF08;&#x4ECE;0&#x5F00;&#x59CB;&#xFF09;&#x3002;</p><p>slice&#x4F1A;&#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7D22;&#x5F15;&#x4ECE; begin &#x5230; end &#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#xFF08;<strong>&#x5305;&#x542B;begin&#xFF0C;&#x4F46;&#x4E0D;&#x5305;&#x542B;end</strong>&#xFF09;&#x3002;<br>slice(1,4) &#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x76F4;&#x5230;&#x7B2C;&#x56DB;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20; &#xFF08;&#x7D22;&#x5F15;&#x4E3A; 1, 2, 3&#x7684;&#x5143;&#x7D20;&#xFF09;&#x3002;</p><p><strong>&#x5982;&#x679C;&#x8BE5;&#x53C2;&#x6570;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C; &#x5219;&#x5B83;&#x8868;&#x793A;&#x5728;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5012;&#x6570;&#x7B2C;&#x51E0;&#x4E2A;&#x5143;&#x7D20;&#x7ED3;&#x675F;&#x62BD;&#x53D6;</strong>&#x3002; slice(-2,-1)&#x8868;&#x793A;&#x62BD;&#x53D6;&#x4E86;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF08;&#x4E0D;&#x5305;&#x542B;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53EA;&#x6709;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#xFF09;&#x3002;</p><p>&#x5982;&#x679C; end &#x88AB;&#x7701;&#x7565;&#xFF0C;&#x5219;slice &#x4F1A;&#x4E00;&#x76F4;&#x63D0;&#x53D6;&#x5230;&#x539F;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x3002;</p><p><strong>&#x5982;&#x679C; end &#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;slice &#x4E5F;&#x4F1A;&#x4E00;&#x76F4;&#x63D0;&#x53D6;&#x5230;&#x539F;&#x6570;&#x7EC4;&#x672B;&#x5C3E;</strong>&#x3002;</p><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4E00;&#x4E2A;&#x542B;&#x6709;&#x63D0;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x65B0;&#x6570;&#x7EC4;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3,4,5];
let arr1 = arr.slice(1,3); // arr&#x662F;[1,2,3,4,5]&#xFF0C; arr1&#x662F;[2,3]
let arr2 = arr.slice(-2,-1);  // arr&#x662F;[1,2,3,4,5], arr2&#x662F;[4]
// &#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#x5728;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x540E;&#x9762;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x6570;&#x7EC4;&#x662F;&#x7A7A;
let arr3 = arr.slice(-2, -3); // arr&#x662F;[1,2,3,4,5], arr3&#x662F;[]
let arr4 = arr.slice(2, 1); // arr&#x662F;[1,2,3,4,5], arr4&#x662F;[]

//&#x5982;&#x679C;&#x5143;&#x7D20;&#x662F;&#x4E2A;&#x5BF9;&#x8C61;&#x5F15;&#x7528; &#xFF08;&#x4E0D;&#x662F;&#x5B9E;&#x9645;&#x7684;&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;slice &#x4F1A;&#x62F7;&#x8D1D;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x5230;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x3002;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x90FD;&#x5F15;&#x7528;&#x4E86;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x5982;&#x679C;&#x88AB;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x65B0;&#x7684;&#x548C;&#x539F;&#x6765;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x3002;
let arr = [{name: &apos;xiaoming&apos;}];
let arr1 = arr.slice(); // arr&#x662F;[{name: xiaoming}]&#xFF0C;arr1&#x662F;[{name: &apos;xiaoming&apos;}]
arr1[0].name = &apos;xiaogang&apos;; // arr&#x662F;[{name: &apos;xiaogang&apos;}]&#xFF0C;arr1&#x662F;[{name: &apos;xiaogang&apos;}]

// &#x5BF9;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x6570;&#x5B57;&#x53CA;&#x5E03;&#x5C14;&#x503C;&#x6765;&#x8BF4;&#xFF08;&#x4E0D;&#x662F; String&#x3001;Number &#x6216;&#x8005; Boolean &#x5BF9;&#x8C61;&#xFF09;&#xFF0C;slice &#x4F1A;&#x62F7;&#x8D1D;&#x8FD9;&#x4E9B;&#x503C;&#x5230;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x3002;&#x5728;&#x522B;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x4FEE;&#x6539;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x6570;&#x5B57;&#x6216;&#x662F;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5C06;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x53E6;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;
let arr = [1,2,3];
let arr1 = arr.slice(); // arr&#x662F;[1,2,3]&#xFF0C;arr1&#x662F;[1,2,3]
arr1[1] = &quot;two&quot;; // arr&#x662F;[1,2,3]&#xFF0C;arr1&#x662F;[1,&quot;two&quot;,3]

// &#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x5411;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x4EFB;&#x4E00;&#x4E2D;&#x6DFB;&#x52A0;&#x4E86;&#x65B0;&#x5143;&#x7D20;&#xFF08;&#x7B80;&#x5355;&#x6216;&#x8005;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF09;&#xFF0C;&#x5219;&#x53E6;&#x4E00;&#x4E2A;&#x4E0D;&#x4F1A;&#x53D7;&#x5230;&#x5F71;&#x54CD;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
let arr1 = arr.slice(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>); // arr&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]&#xFF0C; arr1&#x662F;[<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
let arr2 = arr.slice(<span class="hljs-number">-2</span>,<span class="hljs-number">-1</span>);  // arr&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>], arr2&#x662F;[<span class="hljs-number">4</span>]
// &#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#x5728;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x540E;&#x9762;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x6570;&#x7EC4;&#x662F;&#x7A7A;
let arr3 = arr.slice(<span class="hljs-number">-2</span>, <span class="hljs-number">-3</span>); // arr&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>], arr3&#x662F;[]
let arr4 = arr.slice(<span class="hljs-number">2</span>, <span class="hljs-number">1</span>); // arr&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>], arr4&#x662F;[]

//&#x5982;&#x679C;&#x5143;&#x7D20;&#x662F;&#x4E2A;&#x5BF9;&#x8C61;&#x5F15;&#x7528; &#xFF08;&#x4E0D;&#x662F;&#x5B9E;&#x9645;&#x7684;&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;slice &#x4F1A;&#x62F7;&#x8D1D;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x5230;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x3002;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x90FD;&#x5F15;&#x7528;&#x4E86;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x5982;&#x679C;&#x88AB;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x65B0;&#x7684;&#x548C;&#x539F;&#x6765;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x3002;
let arr = [{name: <span class="hljs-string">&apos;xiaoming&apos;</span>}];
let arr1 = arr.slice(); // arr&#x662F;[{name: xiaoming}]&#xFF0C;arr1&#x662F;[{name: <span class="hljs-string">&apos;xiaoming&apos;</span>}]
arr1[<span class="hljs-number">0</span>].name = <span class="hljs-string">&apos;xiaogang&apos;</span>; // arr&#x662F;[{name: <span class="hljs-string">&apos;xiaogang&apos;</span>}]&#xFF0C;arr1&#x662F;[{name: <span class="hljs-string">&apos;xiaogang&apos;</span>}]

// &#x5BF9;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x6570;&#x5B57;&#x53CA;&#x5E03;&#x5C14;&#x503C;&#x6765;&#x8BF4;&#xFF08;&#x4E0D;&#x662F; <span class="hljs-symbol">String</span>&#x3001;<span class="hljs-symbol">Number</span> &#x6216;&#x8005; <span class="hljs-symbol">Boolean</span> &#x5BF9;&#x8C61;&#xFF09;&#xFF0C;slice &#x4F1A;&#x62F7;&#x8D1D;&#x8FD9;&#x4E9B;&#x503C;&#x5230;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x3002;&#x5728;&#x522B;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x4FEE;&#x6539;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x6570;&#x5B57;&#x6216;&#x662F;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5C06;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x53E6;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;
let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
let arr1 = arr.slice(); // arr&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]&#xFF0C;arr1&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
arr1[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;two&quot;</span>; // arr&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]&#xFF0C;arr1&#x662F;[<span class="hljs-number">1</span>,<span class="hljs-string">&quot;two&quot;</span>,<span class="hljs-number">3</span>]

// &#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x5411;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x4EFB;&#x4E00;&#x4E2D;&#x6DFB;&#x52A0;&#x4E86;&#x65B0;&#x5143;&#x7D20;&#xFF08;&#x7B80;&#x5355;&#x6216;&#x8005;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF09;&#xFF0C;&#x5219;&#x53E6;&#x4E00;&#x4E2A;&#x4E0D;&#x4F1A;&#x53D7;&#x5230;&#x5F71;&#x54CD;&#x3002;</code></pre><p><br></p><h4>2. join() &#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#xFF08;&#x6216;&#x4E00;&#x4E2A;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF09;&#x4E2D;&#x6240;&#x6709;&#x5143;&#x7D20;&#x90FD;&#x8F6C;&#x5316;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x5E76;&#x8FDE;&#x63A5;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x8FD4;&#x56DE;&#x6700;&#x540E;&#x751F;&#x6210;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>separator</code> &#xFF08;&#x53EF;&#x9009;&#xFF09;<br>&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x5206;&#x9694;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x3002;<br>&#x5982;&#x679C;&#x6709;(separator)&#xFF0C;&#x5C06;&#x5206;&#x9694;&#x7B26;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x3002;<br>&#x5982;&#x679C;&#x7701;&#x7565;()&#xFF0C;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7528;&#x9017;&#x53F7;&#x5206;&#x9694;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A; &quot;,&quot;&#x3002;<br>&#x5982;&#x679C;separator&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;(&quot;&quot;)&#xFF0C;&#x5219;&#x6240;&#x6709;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x90FD;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5B57;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let num = [1,2,3];
let str1 = num.join(); // 1,2,3
let str2 = num.join(&apos;, &apos;) // 1, 2, 3
let str3 = num.join(&apos;&apos;) // 123

//&#x6240;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x88AB;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x518D;&#x7528;&#x4E00;&#x4E2A;&#x5206;&#x9694;&#x7B26;&#x5C06;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x4E32;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x3002;&#x5982;&#x679C;&#x5143;&#x7D20;&#x662F;undefined &#x6216;&#x8005;null&#xFF0C; &#x5219;&#x4F1A;&#x8F6C;&#x5316;&#x6210;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x3002;
let num = [1,null,3];
let str1 = num.join(); // 1,,3

//&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x4F1A;&#x5C06;&#x91CC;&#x9762;&#x7684;&#x6570;&#x7EC4;&#x4E5F;&#x8C03;&#x7528;join()
let num = [[1,2],3];
let str1 = num.join(&apos;-&apos;); // 1,2-3

// &#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x8F6C;&#x4E3A;[object Object]&#x5B57;&#x7B26;&#x4E32;
let num = [{num: 1},2,3];
let str1 = num.join(&apos;-&apos;); // [object Object]-2-3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">let</span> num = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> str1 = num.<span class="hljs-keyword">join</span>(); <span class="hljs-comment">// 1,2,3</span>
<span class="hljs-keyword">let</span> str2 = num.<span class="hljs-keyword">join</span>(<span class="hljs-string">&apos;, &apos;</span>) <span class="hljs-comment">// 1, 2, 3</span>
<span class="hljs-keyword">let</span> str3 = num.<span class="hljs-keyword">join</span>(<span class="hljs-string">&apos;&apos;</span>) <span class="hljs-comment">// 123</span>

<span class="hljs-comment">//&#x6240;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x88AB;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x518D;&#x7528;&#x4E00;&#x4E2A;&#x5206;&#x9694;&#x7B26;&#x5C06;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x4E32;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x3002;&#x5982;&#x679C;&#x5143;&#x7D20;&#x662F;undefined &#x6216;&#x8005;null&#xFF0C; &#x5219;&#x4F1A;&#x8F6C;&#x5316;&#x6210;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</span>
<span class="hljs-keyword">let</span> num = [<span class="hljs-number">1</span>,<span class="hljs-literal">null</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> str1 = num.<span class="hljs-keyword">join</span>(); <span class="hljs-comment">// 1,,3</span>

<span class="hljs-comment">//&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x4F1A;&#x5C06;&#x91CC;&#x9762;&#x7684;&#x6570;&#x7EC4;&#x4E5F;&#x8C03;&#x7528;join()</span>
<span class="hljs-keyword">let</span> num = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> str1 = num.<span class="hljs-keyword">join</span>(<span class="hljs-string">&apos;-&apos;</span>); <span class="hljs-comment">// 1,2-3</span>

<span class="hljs-comment">// &#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x8F6C;&#x4E3A;[object Object]&#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-keyword">let</span> num = [{num: <span class="hljs-number">1</span>},<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> str1 = num.<span class="hljs-keyword">join</span>(<span class="hljs-string">&apos;-&apos;</span>); <span class="hljs-comment">// [object Object]-2-3</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4E00;&#x4E2A;&#x6240;&#x6709;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x8FDE;&#x63A5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x5982;&#x679C; arr.length &#x4E3A;0&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;</b></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6241;&#x5E73;&#x5316;&#x7B80;&#x5355;&#x7684;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = arr.join().split(&apos;,&apos;); // [&quot;11&quot;, &quot;22&quot;, &quot;33&quot;, &quot;44&quot;, &quot;55&quot;, &quot;66&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>// &#x6241;&#x5E73;&#x5316;&#x7B80;&#x5355;&#x7684;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;
const arr = [<span class="hljs-number">11</span>, [<span class="hljs-number">22</span>, <span class="hljs-number">33</span>], [<span class="hljs-number">44</span>, <span class="hljs-number">55</span>], <span class="hljs-number">66</span>];
const flatArr = arr.join().split(<span class="hljs-string">&apos;,&apos;</span>); // [<span class="hljs-string">&quot;11&quot;</span>, <span class="hljs-string">&quot;22&quot;</span>, <span class="hljs-string">&quot;33&quot;</span>, <span class="hljs-string">&quot;44&quot;</span>, <span class="hljs-string">&quot;55&quot;</span>, <span class="hljs-string">&quot;66&quot;</span>]</code></pre><p><br></p><h4>3. toString() &#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x8F6C;&#x5316;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;(&#x5982;&#x6709;&#x5FC5;&#x8981;&#x5C06;&#x8C03;&#x7528;&#x5143;&#x7D20;&#x7684;toString()&#x65B9;&#x6CD5;)&#x5E76;&#x4E14;&#x8F93;&#x51FA;&#x7528;&#x9017;&#x53F7;&#x5206;&#x5272;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5217;&#x8868;&#x3002;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x8868;&#x793A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong> &#x65E0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3].toString(); // 1,2,3
[1,[2,&apos;c&apos;]].toString(); //1,2,c
// &#x4EE5;&#x4E0A;&#x4E0E;&#x4E0D;&#x4F7F;&#x7528;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#x8C03;&#x7528;join()&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;

// &#x4EE5;&#x4E0B;&#x7684;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x8981;&#x8DDF;&#x4E0B;&#x9762;&#x7684;toLocaleString&#x5BF9;&#x7167;&#x770B;
[{a:1},1,new Date()].toString() //&quot;[object Object],1,Sat Jul 07 2018 18:43:45 GMT+0800 (&#x4E2D;&#x56FD;&#x6807;&#x51C6;&#x65F6;&#x95F4;)&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-attr">[1,2,3]</span><span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">// 1,2,3</span>
<span class="hljs-selector-attr">[1,[2,&apos;c&apos;]</span>]<span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">//1,2,c</span>
<span class="hljs-comment">// &#x4EE5;&#x4E0A;&#x4E0E;&#x4E0D;&#x4F7F;&#x7528;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#x8C03;&#x7528;join()&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;</span>

<span class="hljs-comment">// &#x4EE5;&#x4E0B;&#x7684;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x8981;&#x8DDF;&#x4E0B;&#x9762;&#x7684;toLocaleString&#x5BF9;&#x7167;&#x770B;</span>
<span class="hljs-selector-attr">[{a:1},1,new Date()]</span><span class="hljs-selector-class">.toString</span>() <span class="hljs-comment">//&quot;[object Object],1,Sat Jul 07 2018 18:43:45 GMT+0800 (&#x4E2D;&#x56FD;&#x6807;&#x51C6;&#x65F6;&#x95F4;)&quot;</span></code></pre><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> &#x5F53;&#x6570;&#x7EC4;&#x548C;&#x5B57;&#x7B26;&#x4E32;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#xFF0C;js &#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3]+&apos;abc&apos;  //1,2,3abc" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]+&apos;abc&apos;  <span class="hljs-comment">//1,2,3abc</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x8868;&#x793A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;</b></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6241;&#x5E73;&#x5316;&#x7B80;&#x5355;&#x7684;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = arr.toString().split(&apos;,&apos;); // [&quot;11&quot;, &quot;22&quot;, &quot;33&quot;, &quot;44&quot;, &quot;55&quot;, &quot;66&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>// &#x6241;&#x5E73;&#x5316;&#x7B80;&#x5355;&#x7684;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;
const arr = [<span class="hljs-number">11</span>, [<span class="hljs-number">22</span>, <span class="hljs-number">33</span>], [<span class="hljs-number">44</span>, <span class="hljs-number">55</span>], <span class="hljs-number">66</span>];
const flatArr = arr.toString().split(<span class="hljs-string">&apos;,&apos;</span>); // [<span class="hljs-string">&quot;11&quot;</span>, <span class="hljs-string">&quot;22&quot;</span>, <span class="hljs-string">&quot;33&quot;</span>, <span class="hljs-string">&quot;44&quot;</span>, <span class="hljs-string">&quot;55&quot;</span>, <span class="hljs-string">&quot;66&quot;</span>]</code></pre><p><br></p><h4>4. toLocaleString() &#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5C06;&#x4F7F;&#x7528;&#x5404;&#x81EA;&#x7684; toLocaleString &#x65B9;&#x6CD5;&#x8F6C;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x4E32;&#x5C06;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7279;&#x5B9A;&#x8BED;&#x8A00;&#x73AF;&#x5883;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x4F8B;&#x5982;&#x4E00;&#x4E2A;&#x9017;&#x53F7; &quot;,&quot;&#xFF09;&#x9694;&#x5F00;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;(&#x8FD8;&#x6709;&#x5F85;&#x8003;&#x8BC1;,&#x6211;&#x8BD5;&#x4E86;&#x4E00;&#x4E0B;&#x6CA1;&#x7528;&#xFF0C;&#x770B;&#x4E86;&#x4E00;&#x4E0B;ECMA&#x7684;&#x5B98;&#x7F51;&#xFF0C;&#x786E;&#x5B9E;&#x662F;&#x6807;&#x6CE8;&#x6709;&#x4E24;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#x7684;)</strong></p><p><code>locales</code> &#xFF08;&#x53EF;&#x9009;&#xFF09; &#x5E26;&#x6709;BCP 47&#x8BED;&#x8A00;&#x6807;&#x8BB0;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;</p><p><code>options</code> &#xFF08;&#x53EF;&#x9009;&#xFF09; &#x4E00;&#x4E2A;&#x53EF;&#x914D;&#x7F6E;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5C06;&#x4F1A;&#x4F7F;&#x7528;&#x5404;&#x81EA;&#x7684; toLocaleString &#x65B9;&#x6CD5;&#xFF1A;
// Object: Object.prototype.toLocaleString()
// Number: Number.prototype.toLocaleString()
// Date: Date.prototype.toLocaleString()

let prices = [&apos;&#xFFE5;7&apos;, 500, 8123, 12];

// &#x4E0D;&#x5E26;&#x53C2;&#x6570;
prices.toLocaleString(); // &quot;&#xFFE5;7,500,8,123,12&quot;

//&#x5E26;&#x53C2;&#x6570;
prices.toLocaleString(&apos;ja-JP&apos;, { style: &apos;currency&apos;, currency: &apos;JPY&apos; }); // &quot;&#xFFE5;7,500,8,123,12&quot;
//MDN&#x4E0A;&#x7684;&#x4E3E;&#x4F8B;&#x4E2D;&#x8BF4;&#x662F; &quot;&#xFFE5;7,&#xFFE5;500,&#xFFE5;8,123,&#xFFE5;12&quot;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x548C;Node&#x4E2D;&#x9A8C;&#x8BC1;&#x4E86;&#x8FD4;&#x56DE;&#x7684;&#x90FD;&#x662F; &quot;&#xFFE5;7,500,8,123,12&quot; &#x554A;&#xFF01;

// &#x4EE5;&#x4E0B;&#x7684;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x8981;&#x8DDF;&#x4E0A;&#x9762;&#x7684;toString&#x5BF9;&#x7167;&#x770B;
[{a:1},1,new Date()].toLocaleString() //&quot;[object Object],1,2018/7/7 &#x4E0B;&#x5348;6:45:00&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5C06;&#x4F1A;&#x4F7F;&#x7528;&#x5404;&#x81EA;&#x7684; toLocaleString &#x65B9;&#x6CD5;&#xFF1A;
<span class="hljs-regexp">//</span> Object: Object.prototype.toLocaleString()
<span class="hljs-regexp">//</span> Number: Number.prototype.toLocaleString()
<span class="hljs-regexp">//</span> Date: Date.prototype.toLocaleString()

let prices = [<span class="hljs-string">&apos;&#xFFE5;7&apos;</span>, <span class="hljs-number">500</span>, <span class="hljs-number">8123</span>, <span class="hljs-number">12</span>];

<span class="hljs-regexp">//</span> &#x4E0D;&#x5E26;&#x53C2;&#x6570;
prices.toLocaleString(); <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;&#xFFE5;7,500,8,123,12&quot;</span>

<span class="hljs-regexp">//</span>&#x5E26;&#x53C2;&#x6570;
prices.toLocaleString(<span class="hljs-string">&apos;ja-JP&apos;</span>, { style: <span class="hljs-string">&apos;currency&apos;</span>, currency: <span class="hljs-string">&apos;JPY&apos;</span> }); <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;&#xFFE5;7,500,8,123,12&quot;</span>
<span class="hljs-regexp">//</span>MDN&#x4E0A;&#x7684;&#x4E3E;&#x4F8B;&#x4E2D;&#x8BF4;&#x662F; <span class="hljs-string">&quot;&#xFFE5;7,&#xFFE5;500,&#xFFE5;8,123,&#xFFE5;12&quot;</span>&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x548C;Node&#x4E2D;&#x9A8C;&#x8BC1;&#x4E86;&#x8FD4;&#x56DE;&#x7684;&#x90FD;&#x662F; <span class="hljs-string">&quot;&#xFFE5;7,500,8,123,12&quot;</span> &#x554A;&#xFF01;

<span class="hljs-regexp">//</span> &#x4EE5;&#x4E0B;&#x7684;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x8981;&#x8DDF;&#x4E0A;&#x9762;&#x7684;toString&#x5BF9;&#x7167;&#x770B;
[{a:<span class="hljs-number">1</span>},<span class="hljs-number">1</span>,new Date()].toLocaleString() <span class="hljs-regexp">//</span><span class="hljs-string">&quot;[object Object],1,2018/7/7 &#x4E0B;&#x5348;6:45:00&quot;</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x8868;&#x793A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</b></p><p><br></p><h4>5. concat() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5408;&#x5E76;&#x4E24;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6570;&#x7EC4;&#x3002;&#x6B64;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x66F4;&#x6539;&#x73B0;&#x6709;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#x3002;</h4><p>&#x5B83;&#x7684;&#x5143;&#x7D20;&#x5305;&#x62EC;&#x8C03;&#x7528;concat()&#x7684;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x548C;concat()&#x7684;&#x6BCF;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x8981;&#x6CE8;&#x610F;&#xFF0C;concat()&#x4E0D;&#x4F1A;&#x9012;&#x5F52;&#x6241;&#x5E73;&#x5316;&#x6570;&#x7EC4;&#x7684;&#x6570;&#x7EC4;&#xFF0C;concat()&#x4E5F;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x8C03;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>valueN</code> &#xFF08;&#x53EF;&#x9009;&#xFF09; &#x5C06;(&#x591A;&#x4E2A;)&#x6570;&#x7EC4;&#x548C;/&#x6216;&#x503C;&#x8FDE;&#x63A5;&#x6210;&#x65B0;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3].concat([4,5,6],[7,8,9]) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

[&apos;a&apos;,&apos;b&apos;,&apos;c&apos;].concat(1,[2,3],[[4,5]]) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, 1, 2, 3, [4,5]]

// concat&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;this&#x6216;&#x4EFB;&#x4F55;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x63D0;&#x4F9B;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6D45;&#x62F7;&#x8D1D;,&#x6240;&#x4EE5;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x548C;&#x65B0;&#x6570;&#x7EC4;&#x90FD;&#x5F15;&#x7528;&#x76F8;&#x540C;&#x7684;&#x5BF9;&#x8C61;&#x3002; &#x5982;&#x679C;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;&#x65B0;&#x6570;&#x7EC4;&#x548C;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x90FD;&#x4F1A;&#x53D8;&#x3002;
let obj = {a: 1};
let arr1 = [2,obj];
let arr2 = [1].concat(arr1);
console.log(arr1,arr2) //[2,{a:1}],[1,2,{a:1}]

//&#x8BB0;&#x5F55;&#x4E0B;&#x4E0A;&#x9762;&#x7684;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E4B;&#x540E;&#x4FEE;&#x6539;obj
obj.a = 2;
console.log(arr1,arr2) ////[2,{a:2}],[1,2,{a:2}]

// &#x8BF4;&#x4E86;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x800C;&#x4E14;&#x539F;&#x6570;&#x7EC4;&#x4E5F;&#x4E0D;&#x6539;&#x53D8;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x5B83;&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x7EC4;&#x7684;&#x6D45;&#x62F7;&#x8D1D;&#x529F;&#x80FD;
let num1 = [1,2,3];
//&#x7B2C;&#x4E00;&#x79CD;
let num2 = num1.concat();
//&#x7B2C;&#x4E8C;&#x79CD;
let num2 = [].concat(num1);
num2[0] = &apos;a&apos;;
console.log(num1,num2); // [1, 2, 3] [&quot;a&quot;, 2, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs openscad"><code>[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].<span class="hljs-built_in">concat</span>([<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>],[<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9]</span>

[&apos;a&apos;,&apos;b&apos;,&apos;c&apos;].<span class="hljs-built_in">concat</span>(<span class="hljs-number">1</span>,[<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],[[<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]]) <span class="hljs-comment">// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, 1, 2, 3, [4,5]]</span>

<span class="hljs-comment">// concat&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;this&#x6216;&#x4EFB;&#x4F55;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x63D0;&#x4F9B;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6D45;&#x62F7;&#x8D1D;,&#x6240;&#x4EE5;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x548C;&#x65B0;&#x6570;&#x7EC4;&#x90FD;&#x5F15;&#x7528;&#x76F8;&#x540C;&#x7684;&#x5BF9;&#x8C61;&#x3002; &#x5982;&#x679C;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;&#x65B0;&#x6570;&#x7EC4;&#x548C;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x90FD;&#x4F1A;&#x53D8;&#x3002;</span>
<span class="hljs-built_in">let</span> obj = {a: <span class="hljs-number">1</span>};
<span class="hljs-built_in">let</span> arr1 = [<span class="hljs-number">2</span>,obj];
<span class="hljs-built_in">let</span> arr2 = [<span class="hljs-number">1</span>].<span class="hljs-built_in">concat</span>(arr1);
console.<span class="hljs-built_in">log</span>(arr1,arr2) <span class="hljs-comment">//[2,{a:1}],[1,2,{a:1}]</span>

<span class="hljs-comment">//&#x8BB0;&#x5F55;&#x4E0B;&#x4E0A;&#x9762;&#x7684;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E4B;&#x540E;&#x4FEE;&#x6539;obj</span>
obj.a = <span class="hljs-number">2</span>;
console.<span class="hljs-built_in">log</span>(arr1,arr2) <span class="hljs-comment">////[2,{a:2}],[1,2,{a:2}]</span>

<span class="hljs-comment">// &#x8BF4;&#x4E86;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x800C;&#x4E14;&#x539F;&#x6570;&#x7EC4;&#x4E5F;&#x4E0D;&#x6539;&#x53D8;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x5B83;&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x7EC4;&#x7684;&#x6D45;&#x62F7;&#x8D1D;&#x529F;&#x80FD;</span>
<span class="hljs-built_in">let</span> num1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-comment">//&#x7B2C;&#x4E00;&#x79CD;</span>
<span class="hljs-built_in">let</span> num2 = num1.<span class="hljs-built_in">concat</span>();
<span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x79CD;</span>
<span class="hljs-built_in">let</span> num2 = [].<span class="hljs-built_in">concat</span>(num1);
num2[<span class="hljs-number">0</span>] = &apos;a&apos;;
console.<span class="hljs-built_in">log</span>(num1,num2); <span class="hljs-comment">// [1, 2, 3] [&quot;a&quot;, 2, 3]</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x65B0;&#x7684; Array &#x5B9E;&#x4F8B;</b></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// concat &#x548C;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x6241;&#x5E73;&#x5316;&#x6570;&#x7EC4;
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr); // [11, 22, 33, 44, 55, 66]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">// concat &#x548C;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x6241;&#x5E73;&#x5316;&#x6570;&#x7EC4;</span>
const arr = [<span class="hljs-number">11</span>, [<span class="hljs-number">22</span>, <span class="hljs-number">33</span>], [<span class="hljs-number">44</span>, <span class="hljs-number">55</span>], <span class="hljs-number">66</span>];
const flatArr = [].concat(...arr); <span class="hljs-comment">// [11, 22, 33, 44, 55, 66]</span></code></pre><p><br></p><h4>6. isArray() &#x7528;&#x4E8E;&#x786E;&#x5B9A;&#x4F20;&#x9012;&#x7684;&#x503C;&#x662F;&#x5426;&#x662F;&#x4E00;&#x4E2A; Array&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>obj</code> &#x9700;&#x8981;&#x68C0;&#x6D4B;&#x7684;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0B;&#x9762;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x90FD;&#x8FD4;&#x56DE; true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// &#x8FD9;&#x91CC;&#x6CE8;&#x610F;&#xFF1A;Array.prototype &#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;,&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#x4E0D;&#x662F;&#x7D22;&#x5F15;&#x7684;&#x6570;&#x7EC4;&#x3002;[constructor: &#x192;, concat: &#x192;, find: &#x192;, findIndex: &#x192;, pop: &#x192;, &#x2026;]
Array.isArray(Array.prototype);

// &#x4E0B;&#x9762;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x90FD;&#x8FD4;&#x56DE; false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray(&apos;Array&apos;);
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x90FD;&#x8FD4;&#x56DE; true</span>
<span class="hljs-built_in">Array</span>.isArray([]);
<span class="hljs-built_in">Array</span>.isArray([<span class="hljs-number">1</span>]);
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>());
<span class="hljs-comment">// &#x8FD9;&#x91CC;&#x6CE8;&#x610F;&#xFF1A;Array.prototype &#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;,&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#x4E0D;&#x662F;&#x7D22;&#x5F15;&#x7684;&#x6570;&#x7EC4;&#x3002;[constructor: &#x192;, concat: &#x192;, find: &#x192;, findIndex: &#x192;, pop: &#x192;, &#x2026;]</span>
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-built_in">Array</span>.prototype);

<span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x90FD;&#x8FD4;&#x56DE; false</span>
<span class="hljs-built_in">Array</span>.isArray();
<span class="hljs-built_in">Array</span>.isArray({});
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-literal">null</span>);
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-literal">undefined</span>);
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-number">17</span>);
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-string">&apos;Array&apos;</span>);
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-literal">true</span>);
<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-literal">false</span>);
<span class="hljs-built_in">Array</span>.isArray({ <span class="hljs-attr">__proto__</span>: <span class="hljs-built_in">Array</span>.prototype });</code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x5982;&#x679C;&#x5BF9;&#x8C61;&#x662F; Array&#xFF0C;&#x5219;&#x4E3A;true; &#x5426;&#x5219;&#x4E3A;false&#x3002;</b></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5224;&#x65AD;&#x6570;&#x7EC4;&#x7684;&#x5386;&#x7A0B;
// step one: &#x4F7F;&#x7528;constructor
var a = [1];
console.log(a.constructor === Array) // true
// &#x4F46;&#x662F;&#x539F;&#x578B;&#x7684;contructor&#x5C5E;&#x6027;&#x662F;&#x53EF;&#x4EE5;&#x88AB;&#x6539;&#x5199;&#x7684;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x662F;&#x8981;&#x628A;&#x7EE7;&#x627F;&#x8FC7;&#x6765;&#x7684;prototype&#x7684;constructor&#x6539;&#x5199;&#x6210;&#x6211;&#x4EEC;&#x5F53;&#x524D;&#x7684;
var a = [1];
a.__proto__.constructor = &apos;1&apos;;
console.log(a.constructor === Array) // false

// step two : &#x4F7F;&#x7528;instanceof
var a = [1];
console.log(a instanceof Array) // true
//&#x4F46;&#x662F;instanceof&#x4E0D;&#x80FD;&#x68C0;&#x6D4B;iframes&#x7684;&#x6570;&#x7EC4;
var iframe = document.createElement(&apos;iframe&apos;);
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

arr instanceof Array; // false

// step three :&#x4E07;&#x65E0;&#x4E00;&#x5931;&#x7684;Object.prototype.toString.call
Array.isArray = function(arg) {
  return Object.prototype.toString.call(arg) === &apos;[object Array]&apos;;
};

// step four : Array.isArray()

var iframe = document.createElement(&apos;iframe&apos;);
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

Array.isArray(arr);  // true,&#x4E5F;&#x53EF;&#x4EE5;&#x68C0;&#x6D4B;iframes&#x7684;&#x6570;&#x7EC4;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5224;&#x65AD;&#x6570;&#x7EC4;&#x7684;&#x5386;&#x7A0B;</span>
<span class="hljs-comment">// step one: &#x4F7F;&#x7528;constructor</span>
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>];
<span class="hljs-built_in">console</span>.log(a.constructor === <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// true</span>
<span class="hljs-comment">// &#x4F46;&#x662F;&#x539F;&#x578B;&#x7684;contructor&#x5C5E;&#x6027;&#x662F;&#x53EF;&#x4EE5;&#x88AB;&#x6539;&#x5199;&#x7684;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x662F;&#x8981;&#x628A;&#x7EE7;&#x627F;&#x8FC7;&#x6765;&#x7684;prototype&#x7684;constructor&#x6539;&#x5199;&#x6210;&#x6211;&#x4EEC;&#x5F53;&#x524D;&#x7684;</span>
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>];
a.__proto__.constructor = <span class="hljs-string">&apos;1&apos;</span>;
<span class="hljs-built_in">console</span>.log(a.constructor === <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// false</span>

<span class="hljs-comment">// step two : &#x4F7F;&#x7528;instanceof</span>
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>];
<span class="hljs-built_in">console</span>.log(a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// true</span>
<span class="hljs-comment">//&#x4F46;&#x662F;instanceof&#x4E0D;&#x80FD;&#x68C0;&#x6D4B;iframes&#x7684;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;iframe&apos;</span>);
<span class="hljs-built_in">document</span>.body.appendChild(iframe);
xArray = <span class="hljs-built_in">window</span>.frames[<span class="hljs-built_in">window</span>.frames.length<span class="hljs-number">-1</span>].Array;
<span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> xArray(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">// [1,2,3]</span>

arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>; <span class="hljs-comment">// false</span>

<span class="hljs-comment">// step three :&#x4E07;&#x65E0;&#x4E00;&#x5931;&#x7684;Object.prototype.toString.call</span>
<span class="hljs-built_in">Array</span>.isArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg) === <span class="hljs-string">&apos;[object Array]&apos;</span>;
};

<span class="hljs-comment">// step four : Array.isArray()</span>

<span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;iframe&apos;</span>);
<span class="hljs-built_in">document</span>.body.appendChild(iframe);
xArray = <span class="hljs-built_in">window</span>.frames[<span class="hljs-built_in">window</span>.frames.length<span class="hljs-number">-1</span>].Array;
<span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> xArray(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">// [1,2,3]</span>

<span class="hljs-built_in">Array</span>.isArray(arr);  <span class="hljs-comment">// true,&#x4E5F;&#x53EF;&#x4EE5;&#x68C0;&#x6D4B;iframes&#x7684;&#x6570;&#x7EC4;</span>
</code></pre><p><br></p><h3 id="articleHeader8"><b>3&#x3001;&#x6570;&#x7EC4;&#x904D;&#x5386;&#x3001;&#x6620;&#x5C04;&#x3001;&#x8FC7;&#x6EE4;&#x3001;&#x68C0;&#x6D4B;&#x3001;&#x7B80;&#x5316;&#x7B49;&#x65B9;&#x6CD5;</b></h3><p>&#x4ECB;&#x7ECD;&#x65B9;&#x6CD5;&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x5BF9;&#x8FD9;&#x4E9B;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;&#x505A;&#x4E00;&#x4E2A;&#x6982;&#x8FF0;&#xFF1A;</p><ul><li>&#x9996;&#x5148;&#xFF0C;&#x5927;&#x591A;&#x6570;&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#xFF08;&#x6216;&#x4E00;&#x4E9B;&#x5143;&#x7D20;&#xFF09;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x8BE5;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x662F;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF0C;&#x5BF9;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#x3002;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8C03;&#x7528;&#x63D0;&#x4F9B;&#x7684;&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x3001;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x548C;&#x6570;&#x7EC4;&#x672C;&#x8EAB;&#x3002;&#x901A;&#x5E38;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x503C;&#xFF0C;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x540E;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x3002;</li><li>&#x5927;&#x591A;&#x6570;&#x65B9;&#x6CD5;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x53EF;&#x9009;&#x7684;&#x3002;&#x5982;&#x679C;&#x6709;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x8C03;&#x7528;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x88AB;&#x770B;&#x505A;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5373;&#x5F53;&#x6267;&#x884C;&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x65F6;&#x7528;&#x4F5C;this&#x7684;&#x503C;(&#x53C2;&#x8003;&#x5BF9;&#x8C61;)&#x3002;</li><li>&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x65B9;&#x6CD5;&#x5904;&#x7406;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x65B9;&#x5F0F;&#x4E5F;&#x4E0D;&#x4E00;&#x6837;&#x3002;</li></ul><p><strong>&#x4E0B;&#x9762;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x89C4;&#x5219;&#xFF1A;</strong></p><ol><li>&#x5BF9;&#x4E8E;&#x7A7A;&#x6570;&#x7EC4;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;</li><li>&#x5BF9;&#x4E8E;&#x5DF2;&#x5728;&#x8FED;&#x4EE3;&#x8FC7;&#x7A0B;&#x4E2D;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;&#x7A7A;&#x5143;&#x7D20;&#x4F1A;&#x8DF3;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>&#x904D;&#x5386;&#x6B21;&#x6570;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x524D;&#x5C31;&#x4F1A;&#x786E;&#x5B9A;&#xFF0C;&#x518D;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x3002;</li><li>&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F20;&#x9012;&#x7ED9; callback &#x7684;&#x503C;&#x662F;&#x904D;&#x5386;&#x5230;&#x4ED6;&#x4EEC;&#x90A3;&#x4E00;&#x523B;&#x7684;&#x503C;&#x3002;</li><li>&#x5DF2;&#x5220;&#x9664;&#x7684;&#x9879;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&#x3002;&#x5982;&#x679C;&#x5DF2;&#x8BBF;&#x95EE;&#x7684;&#x5143;&#x7D20;&#x5728;&#x8FED;&#x4EE3;&#x65F6;&#x88AB;&#x5220;&#x9664;&#x4E86;(&#x4F8B;&#x5982;&#x4F7F;&#x7528; shift()) &#xFF0C;&#x4E4B;&#x540E;&#x7684;&#x5143;&#x7D20;&#x5C06;&#x88AB;&#x8DF3;&#x8FC7;</li></ol><p><br></p><h4>1. forEach() &#x65B9;&#x6CD5;&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#xFF0C;&#x4E3A;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x8C03;&#x7528;&#x6307;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>callback</code> &#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li><code>currentValue(&#x5F53;&#x524D;&#x503C;)</code> &#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;</li><li><code>index(&#x7D22;&#x5F15;)</code> &#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;</li><li><code>array</code> forEach()&#x65B9;&#x6CD5;&#x6B63;&#x5728;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x7EC4;&#x3002;</li></ol><p><code>thisArg</code> &#xFF08;&#x53EF;&#x9009;&#xFF09; &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;&#x7528;&#x4F5C;this&#x7684;&#x503C;(&#x53C2;&#x8003;&#x5BF9;&#x8C61;)&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;undefined</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>forEach&#x65E0;&#x6CD5;&#x4E2D;&#x9014;&#x9000;&#x51FA;&#x5FAA;&#x73AF;&#xFF0C;&#x53EA;&#x80FD;&#x7528;return&#x9000;&#x51FA;&#x672C;&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x63D0;&#x524D;&#x7EC8;&#x6B62;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;forEach&#x65B9;&#x6CD5;&#x653E;&#x5728;try&#x5757;&#x4E2D;&#xFF0C;&#x5E76;&#x80FD;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x5F02;&#x5E38;&#xFF0C;&#x4F46;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x63A8;&#x8350;&#x7684;&#x3002;</li><li>&#x5B83;&#x4E0E;&#x4E4B;&#x540E;&#x4F1A;&#x8BF4;&#x5230;&#x7684;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0D;&#x540C;&#xFF0C;&#x603B;&#x662F;&#x8FD4;&#x56DE; undefined&#x503C;,&#x5373;&#x4F7F;&#x4F60;return&#x4E86;&#x4E00;&#x4E2A;&#x503C;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1&#x3001; &#x7A7A;&#x5143;&#x7D20;&#x4E0D;&#x904D;&#x5386;,undefined&#x548C;null&#x662F;&#x4F1A;&#x904D;&#x5386;&#x7684;&#x3002;
let numberArr = [1,2,,3];
numberArr.forEach(function (value,index,array) {
  console.log(value,index,array)
})
//&#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF0C;&#x53EF;&#x89C1;&#x7A7A;&#x5143;&#x7D20;&#x662F;&#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x7684;
//1 0 [1, 2, empty, 3]
//2 1 [1, 2, empty, 3]
//3 3 [1, 2, empty, 3]

let nullArr = [1,2,null,3];
nullArr.forEach(function (value,index,array) {
  console.log(value,index,array)
})
//&#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF0C;null&#x662F;&#x4F1A;&#x904D;&#x5386;&#x7684;
//1 0 (4) [1, 2, null, 3]
//2 1 (4) [1, 2, null, 3]
//null 2 (4) [1, 2, null, 3]
//3 3 (4) [1, 2, null, 3]

//2&#x3001;&#x5DF2;&#x5220;&#x9664;&#x7684;&#x9879;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&#x3002;&#x5982;&#x679C;&#x5DF2;&#x8BBF;&#x95EE;&#x7684;&#x5143;&#x7D20;&#x5728;&#x8FED;&#x4EE3;&#x65F6;&#x88AB;&#x5220;&#x9664;&#x4E86;,&#x4E4B;&#x540E;&#x7684;&#x5143;&#x7D20;&#x5C06;&#x88AB;&#x8DF3;&#x8FC7;
let numberArr = [1,2,3];
numberArr.forEach(function (value,index,array) {
  if(index === 0) {
    delete numberArr[2]; //&#x5220;&#x9664;&#x7B2C;&#x4E09;&#x9879;
    //&#x6216;&#x8005;numberArr.pop()
  }
  console.log(value,index,array)
})
//&#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF1A;
// 1 0 (3) [1, 2, empty]
// 2 1 (3) [1, 2, empty]


let numberArr1 = [1,2,3,4];
numberArr1.forEach(function (value,index,array) {
  if(index === 1) {
    numberArr1.shift() //&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x9879;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x9879;
  }
  console.log(value,index,array)
})
// &#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;,&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x9879;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x9879;&#xFF0C;&#x4F1A;&#x8DF3;&#x8FC7;&#x7B2C;&#x4E09;&#x9879;
// 1 0 (4) [1, 2, 3, 4]
// 2 1 (3) [2, 3, 4]
// 4 2 (3) [2, 3, 4]

// 3&#x3001;forEach &#x904D;&#x5386;&#x7684;&#x8303;&#x56F4;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528; callback &#x524D;&#x5C31;&#x4F1A;&#x786E;&#x5B9A;&#x3002;&#x8C03;&#x7528;forEach &#x540E;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x9879;&#x4E0D;&#x4F1A;&#x88AB; callback &#x8BBF;&#x95EE;&#x5230;&#x3002;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F20;&#x9012;&#x7ED9; callback &#x7684;&#x503C;&#x662F; forEach &#x904D;&#x5386;&#x5230;&#x4ED6;&#x4EEC;&#x90A3;&#x4E00;&#x523B;&#x7684;&#x503C;&#x3002;
let arr = [1,2,3];
arr.forEach(function (value,index,array) {
  if(index === 0) {
    arr.push(&apos;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&apos;)
    arr[2] = 4;
  }
  console.log(value,index,array)
})
// 1 0 (4) [1, 2, 4, &quot;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&quot;]
// 2 1 (4) [1, 2, 4, &quot;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&quot;]
// 4 2 (4) [1, 2, 4, &quot;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&quot;]

// 4&#x3001;&#x4F7F;&#x7528;thisArg&#x53C2;&#x6570; &#x548C; &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4F7F;&#x7528;thisArg
let arr = [1,2,3];
let obj = {arr: &apos;thisArg&apos;}
arr.forEach(function () {
  console.log(this.arr)
},obj)
// &#x6253;&#x5370;&#x4E09;&#x6B21; &apos;thisArg&apos;

let arr = [1,2,3];
let obj = {arr: &apos;thisArg&apos;}
arr.forEach(() =&gt; {
  console.log(this.arr)
},obj)
// &#x6253;&#x5370;&#x4E09;&#x6B21; undefined

// 5&#x3001;forEach&#x65E0;&#x6CD5;&#x4E2D;&#x9014;&#x9000;&#x51FA;&#x5FAA;&#x73AF;&#xFF0C;&#x53EA;&#x80FD;&#x7528;return&#x9000;&#x51FA;&#x672C;&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x56DE;&#x8C03;
let arr = [1,2,3];
let result = arr.forEach((value) =&gt; {
  if(value == 2) {
    return value;
  }
  console.log(value)
})
console.log(result) // undefined &#xFF0C;&#x5373;&#x4F7F;&#x4E2D;&#x95F4;return vlaue&#xFF0C;&#x4E5F;&#x8FD8;&#x662F;undefined
//&#x6253;&#x5370;value&#x7684;&#x503C;&#x5982;&#x4E0B;&#xFF0C;&#x8BF4;&#x660E;return &#x5E76;&#x4E0D;&#x80FD;&#x7EC8;&#x6B62;&#x5FAA;&#x73AF;
// 1
// 3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// 1&#x3001; &#x7A7A;&#x5143;&#x7D20;&#x4E0D;&#x904D;&#x5386;,undefined&#x548C;null&#x662F;&#x4F1A;&#x904D;&#x5386;&#x7684;&#x3002;</span>
<span class="hljs-keyword">let</span> numberArr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,,<span class="hljs-number">3</span>];
numberArr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value,index,array</span>) </span>{
  <span class="hljs-built_in">console</span>.log(value,index,array)
})
<span class="hljs-comment">//&#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF0C;&#x53EF;&#x89C1;&#x7A7A;&#x5143;&#x7D20;&#x662F;&#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x7684;</span>
<span class="hljs-comment">//1 0 [1, 2, empty, 3]</span>
<span class="hljs-comment">//2 1 [1, 2, empty, 3]</span>
<span class="hljs-comment">//3 3 [1, 2, empty, 3]</span>

<span class="hljs-keyword">let</span> nullArr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-literal">null</span>,<span class="hljs-number">3</span>];
nullArr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value,index,array</span>) </span>{
  <span class="hljs-built_in">console</span>.log(value,index,array)
})
<span class="hljs-comment">//&#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF0C;null&#x662F;&#x4F1A;&#x904D;&#x5386;&#x7684;</span>
<span class="hljs-comment">//1 0 (4) [1, 2, null, 3]</span>
<span class="hljs-comment">//2 1 (4) [1, 2, null, 3]</span>
<span class="hljs-comment">//null 2 (4) [1, 2, null, 3]</span>
<span class="hljs-comment">//3 3 (4) [1, 2, null, 3]</span>

<span class="hljs-comment">//2&#x3001;&#x5DF2;&#x5220;&#x9664;&#x7684;&#x9879;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&#x3002;&#x5982;&#x679C;&#x5DF2;&#x8BBF;&#x95EE;&#x7684;&#x5143;&#x7D20;&#x5728;&#x8FED;&#x4EE3;&#x65F6;&#x88AB;&#x5220;&#x9664;&#x4E86;,&#x4E4B;&#x540E;&#x7684;&#x5143;&#x7D20;&#x5C06;&#x88AB;&#x8DF3;&#x8FC7;</span>
<span class="hljs-keyword">let</span> numberArr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
numberArr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value,index,array</span>) </span>{
  <span class="hljs-keyword">if</span>(index === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">delete</span> numberArr[<span class="hljs-number">2</span>]; <span class="hljs-comment">//&#x5220;&#x9664;&#x7B2C;&#x4E09;&#x9879;</span>
    <span class="hljs-comment">//&#x6216;&#x8005;numberArr.pop()</span>
  }
  <span class="hljs-built_in">console</span>.log(value,index,array)
})
<span class="hljs-comment">//&#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF1A;</span>
<span class="hljs-comment">// 1 0 (3) [1, 2, empty]</span>
<span class="hljs-comment">// 2 1 (3) [1, 2, empty]</span>


<span class="hljs-keyword">let</span> numberArr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
numberArr1.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value,index,array</span>) </span>{
  <span class="hljs-keyword">if</span>(index === <span class="hljs-number">1</span>) {
    numberArr1.shift() <span class="hljs-comment">//&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x9879;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x9879;</span>
  }
  <span class="hljs-built_in">console</span>.log(value,index,array)
})
<span class="hljs-comment">// &#x6253;&#x5370;&#x4FE1;&#x606F;&#x5982;&#x4E0B;,&#x904D;&#x5386;&#x5230;&#x7B2C;&#x4E8C;&#x9879;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x9879;&#xFF0C;&#x4F1A;&#x8DF3;&#x8FC7;&#x7B2C;&#x4E09;&#x9879;</span>
<span class="hljs-comment">// 1 0 (4) [1, 2, 3, 4]</span>
<span class="hljs-comment">// 2 1 (3) [2, 3, 4]</span>
<span class="hljs-comment">// 4 2 (3) [2, 3, 4]</span>

<span class="hljs-comment">// 3&#x3001;forEach &#x904D;&#x5386;&#x7684;&#x8303;&#x56F4;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528; callback &#x524D;&#x5C31;&#x4F1A;&#x786E;&#x5B9A;&#x3002;&#x8C03;&#x7528;forEach &#x540E;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x9879;&#x4E0D;&#x4F1A;&#x88AB; callback &#x8BBF;&#x95EE;&#x5230;&#x3002;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F20;&#x9012;&#x7ED9; callback &#x7684;&#x503C;&#x662F; forEach &#x904D;&#x5386;&#x5230;&#x4ED6;&#x4EEC;&#x90A3;&#x4E00;&#x523B;&#x7684;&#x503C;&#x3002;</span>
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value,index,array</span>) </span>{
  <span class="hljs-keyword">if</span>(index === <span class="hljs-number">0</span>) {
    arr.push(<span class="hljs-string">&apos;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&apos;</span>)
    arr[<span class="hljs-number">2</span>] = <span class="hljs-number">4</span>;
  }
  <span class="hljs-built_in">console</span>.log(value,index,array)
})
<span class="hljs-comment">// 1 0 (4) [1, 2, 4, &quot;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&quot;]</span>
<span class="hljs-comment">// 2 1 (4) [1, 2, 4, &quot;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&quot;]</span>
<span class="hljs-comment">// 4 2 (4) [1, 2, 4, &quot;&#x65B0;&#x589E;&#x7684;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x5230;&quot;]</span>

<span class="hljs-comment">// 4&#x3001;&#x4F7F;&#x7528;thisArg&#x53C2;&#x6570; &#x548C; &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4F7F;&#x7528;thisArg</span>
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> obj = {<span class="hljs-attr">arr</span>: <span class="hljs-string">&apos;thisArg&apos;</span>}
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.arr)
},obj)
<span class="hljs-comment">// &#x6253;&#x5370;&#x4E09;&#x6B21; &apos;thisArg&apos;</span>

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> obj = {<span class="hljs-attr">arr</span>: <span class="hljs-string">&apos;thisArg&apos;</span>}
arr.forEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.arr)
},obj)
<span class="hljs-comment">// &#x6253;&#x5370;&#x4E09;&#x6B21; undefined</span>

<span class="hljs-comment">// 5&#x3001;forEach&#x65E0;&#x6CD5;&#x4E2D;&#x9014;&#x9000;&#x51FA;&#x5FAA;&#x73AF;&#xFF0C;&#x53EA;&#x80FD;&#x7528;return&#x9000;&#x51FA;&#x672C;&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x56DE;&#x8C03;</span>
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> result = arr.forEach(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span>(value == <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">return</span> value;
  }
  <span class="hljs-built_in">console</span>.log(value)
})
<span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// undefined &#xFF0C;&#x5373;&#x4F7F;&#x4E2D;&#x95F4;return vlaue&#xFF0C;&#x4E5F;&#x8FD8;&#x662F;undefined</span>
<span class="hljs-comment">//&#x6253;&#x5370;value&#x7684;&#x503C;&#x5982;&#x4E0B;&#xFF0C;&#x8BF4;&#x660E;return &#x5E76;&#x4E0D;&#x80FD;&#x7EC8;&#x6B62;&#x5FAA;&#x73AF;</span>
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 3</span>
</code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> undefined</b></p><p><br></p><h4>2. map() &#x65B9;&#x6CD5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x5176;&#x7ED3;&#x679C;&#x662F;&#x8BE5;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x8C03;&#x7528;&#x4E00;&#x4E2A;callback&#x51FD;&#x6570;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong>(&#x4E4B;&#x524D;&#x8BF4;&#x8FC7;&#xFF0C;&#x5927;&#x591A;&#x8BF4;&#x65B9;&#x6CD5;&#x90FD;&#x4F1A;&#x662F;&#x8FD9;&#x6837;&#x4E00;&#x4E9B;&#x53C2;&#x6570;)</p><p><code>callback</code> &#x751F;&#x6210;&#x65B0;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x7528;&#x4E09;&#x4E2A;&#x53C2; &#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x8DDF;forEach()&#x7684;&#x51FD;&#x6570;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;map()&#x7684;&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><ol><li><code>currentValue</code> callback &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;</li><li><code>index</code> callback &#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;</li><li><code>array</code> callback &#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;map &#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x3002;</li></ol><p><code>thisArg</code> (&#x53EF;&#x9009;) &#x6267;&#x884C; callback &#x51FD;&#x6570;&#x65F6; &#x4F7F;&#x7528;&#x7684;this &#x503C;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> map() &#x8FD4;&#x56DE;&#x7684;&#x662F;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x5B83;&#x4E0D;&#x4FEE;&#x6539;&#x8C03;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x5982;&#x679C;&#x662F;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x4E5F;&#x662F;&#x76F8;&#x540C;&#x65B9;&#x5F0F;&#x7684;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF1A;&#x5B83;&#x5177;&#x6709;&#x76F8;&#x540C;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x76F8;&#x540C;&#x7D22;&#x5F15;&#x7684;&#x7F3A;&#x5931;&#x5143;&#x7D20;(&#x56E0;&#x4E3A;&#x7A7A;&#x503C;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;&#x51FD;&#x6570;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let number = [1,2,3];
let doubles = number.map(function (value) {
  return value * 2;
})
console.log(number, doubles)
// [1,2,3] [2,4,6]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">number</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> doubles = <span class="hljs-built_in">number</span>.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">number</span>, doubles)
<span class="hljs-comment">// [1,2,3] [2,4,6]</span>
</code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x7ED3;&#x679C;</b></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b><br>&#x4E0D;&#x8981;&#x7528; map &#x4EE3;&#x66FF; forEach,map &#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5360;&#x7528;&#x5185;&#x5B58;&#x3002;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x7528; map &#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x90A3;&#x4F60;&#x5C31;&#x5E94;&#x5F53;&#x4F7F;&#x7528; forEach</p><p><br></p><h4>3. filter() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x662F;&#x8C03;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x4E2A;&#x5B50;&#x96C6;&#x3002;&#x4F20;&#x5165;&#x7684;&#x51FD;&#x6570;&#x65F6;&#x7528;&#x6765;&#x903B;&#x8F91;&#x5224;&#x5B9A;&#x7684;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x8FD4;&#x56DE; true &#x6216; false,&#x5982;&#x679C;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;true&#x6216;&#x80FD;&#x8F6C;&#x5316;&#x4E3A;true&#x7684;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x4F20;&#x9012;&#x7ED9;&#x5224;&#x65AD;&#x51FD;&#x6570;&#x7684;&#x5143;&#x7D20;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x5B50;&#x96C6;&#x7684;&#x6210;&#x5458;&#xFF0C;&#x5B83;&#x5C06;&#x88AB;&#x6DFB;&#x52A0;&#x5012;&#x4E00;&#x4E2A;&#x4F5C;&#x4E3A;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>callback</code> &#x7528;&#x6765;&#x6D4B;&#x8BD5;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x51FD;&#x6570;&#x3002;&#x8C03;&#x7528;&#x65F6;&#x4F7F;&#x7528;&#x53C2;&#x6570; (element, index, array)&#x3002;&#x8FD4;&#x56DE;true&#x8868;&#x793A;&#x4FDD;&#x7559;&#x8BE5;&#x5143;&#x7D20;&#xFF08;&#x901A;&#x8FC7;&#x6D4B;&#x8BD5;&#xFF09;&#xFF0C;false&#x5219;&#x4E0D;&#x4FDD;&#x7559;&#x3002;&#x5B83;&#x63A5;&#x53D7;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li><code>element</code> &#x5F53;&#x524D;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x5904;&#x7406;&#x7684;&#x5143;&#x7D20;</li><li><code>index</code>&#xFF08;&#x53EF;&#x9009;&#xFF09; &#x6B63;&#x5728;&#x5904;&#x7406;&#x5143;&#x7D20;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7D22;&#x5F15;</li><li><code>array</code>&#xFF08;&#x53EF;&#x9009;&#xFF09;&#x8C03;&#x7528;&#x4E86;filter&#x7B5B;&#x9009;&#x5668;&#x7684;&#x6570;&#x7EC4;</li></ol><p><code>thisArg</code>&#xFF08;&#x53EF;&#x9009;&#xFF09;&#x53EF;&#x9009;&#x3002;&#x6267;&#x884C; callback &#x65F6;&#x7684;&#x7528;&#x4E8E; this &#x7684;&#x503C;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>callback &#x53EA;&#x4F1A;&#x5728;&#x5DF2;&#x7ECF;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x4E0A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5BF9;&#x4E8E;&#x90A3;&#x4E9B;&#x5DF2;&#x7ECF;&#x88AB;&#x5220;&#x9664;&#x6216;&#x8005;&#x4ECE;&#x672A;&#x88AB;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;filter()&#x4F1A;&#x8DF3;&#x8FC7;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x4E2D;&#x7F3A;&#x5C11;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5B83;&#x7684;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x603B;&#x662F;&#x7A20;&#x5BC6;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x538B;&#x7F29;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x7684;&#x7A7A;&#x7F3A;&#x3002;</li><li>filter &#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x5B83;&#x8FD4;&#x56DE;&#x8FC7;&#x6EE4;&#x540E;&#x7684;&#x65B0;&#x6570;&#x7EC4;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let number = [1,2,3,4,5,6];
let small = number.filter((value) =&gt; {
  return value &lt; 4;
})
console.log(number,small)
// &#x6253;&#x5370; [1, 2, 3, 4, 5, 6] [1, 2, 3]


//&#x538B;&#x7F29;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x7684;&#x7A7A;&#x7F3A;
let arr = [1,2,3,,5];
let arr1 = arr.filter(() =&gt; true);
console.log(arr,arr1)
// &#x6253;&#x5370; [1, 2, 3, empty, 5] [1, 2, 3, 5]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">number</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
<span class="hljs-keyword">let</span> small = <span class="hljs-built_in">number</span>.filter(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> value &lt; <span class="hljs-number">4</span>;
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">number</span>,small)
<span class="hljs-comment">// &#x6253;&#x5370; [1, 2, 3, 4, 5, 6] [1, 2, 3]</span>


<span class="hljs-comment">//&#x538B;&#x7F29;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x7684;&#x7A7A;&#x7F3A;</span>
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,,<span class="hljs-number">5</span>];
<span class="hljs-keyword">let</span> arr1 = arr.filter(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-built_in">console</span>.log(arr,arr1)
<span class="hljs-comment">// &#x6253;&#x5370; [1, 2, 3, empty, 5] [1, 2, 3, 5]</span>
</code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x901A;&#x8FC7;&#x6D4B;&#x8BD5;&#x7684;&#x5143;&#x7D20;&#x7684;&#x96C6;&#x5408;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x901A;&#x8FC7;&#x6D4B;&#x8BD5;&#x5219;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;&#x3002;</b></p><p><br></p><h4>4. every() &#x65B9;&#x6CD5;&#x6D4B;&#x8BD5;&#x6570;&#x7EC4;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x90FD;&#x901A;&#x8FC7;&#x4E86;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#x7684;&#x6D4B;&#x8BD5;&#x3002;&#x5F53;&#x4E14;&#x4EC5;&#x5F53;&#x9488;&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8C03;&#x7528;&#x5224;&#x5B9A;&#x51FD;&#x6570;&#x90FD;&#x8FD4;&#x56DE;true&#xFF0C;&#x5B83;&#x624D;&#x8FD4;&#x56DE;true&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>callback</code> &#x7528;&#x6765;&#x6D4B;&#x8BD5;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x51FD;&#x6570;&#x3002;</p><p><code>thisArg</code> &#x6267;&#x884C; callback &#x65F6;&#x4F7F;&#x7528;&#x7684; this &#x503C;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>every &#x65B9;&#x6CD5;&#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x4E00;&#x6B21; callback &#x51FD;&#x6570;&#xFF0C;callback &#x53EA;&#x4F1A;&#x4E3A;&#x90A3;&#x4E9B;&#x5DF2;&#x7ECF;&#x88AB;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x8C03;&#x7528;&#x3002;&#x4E0D;&#x4F1A;&#x4E3A;&#x90A3;&#x4E9B;&#x88AB;&#x5220;&#x9664;&#x6216;&#x4ECE;&#x6765;&#x6CA1;&#x88AB;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x8C03;&#x7528;&#x3002;every &#x65B9;&#x6CD5;&#x5728;callback&#x7B2C;&#x4E00;&#x6B21;&#x8FD4;&#x56DE;false&#x540E;&#x5C31;&#x8FD4;&#x56DE;false&#xFF0C;&#x7136;&#x540E;&#x7EC8;&#x6B62;&#x904D;&#x5386;&#x3002;&#x4F46;&#x5982;&#x679C;callback&#x4E00;&#x76F4;&#x8FD4;&#x56DE;true&#xFF0C;&#x5B83;&#x5C06;&#x4F1A;&#x904D;&#x5386;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x6700;&#x7EC8;&#x8FD4;&#x56DE;true&#x3002;</li><li>&#x7A7A;&#x6570;&#x7EC4;&#x4E0A;&#x8C03;&#x7528;every&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE; true&#xFF0C;&#x56E0;&#x4E3A;&#x7A7A;&#x6570;&#x7EC4;&#x6CA1;&#x6709;&#x5143;&#x7D20;&#xFF0C;&#x6240;&#x4EE5;&#x7A7A;&#x6570;&#x7EC4;&#x4E2D;&#x6240;&#x6709;&#x5143;&#x7D20;&#x90FD;&#x7B26;&#x5408;&#x7ED9;&#x5B9A;&#x7684;&#x6761;&#x4EF6;</li><li>every &#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [12,34,5,23,44];
let num = 0;
let result = arr.every(function (element, index, array) {
  num++;
  return element &gt; 10;
})
console.log(result,num) // &#x6253;&#x5370; false 3
// &#x53EF;&#x89C1;&#x53D1;&#x73B0;5&#x8FD9;&#x4E2A;&#x5C0F;&#x4E8E;10&#x7684;&#x5143;&#x7D20;&#x540E;&#xFF0C;&#x904D;&#x5386;&#x7ACB;&#x5373;&#x7EC8;&#x6B62;&#xFF0C;num&#x4E3A;3

let arr = [12,34,,23,44];
let num = 0;
let result = arr.every(function (element, index, array) {
  num++;
  return element &gt; 10;
})
console.log(result,num) // &#x6253;&#x5370; true 4
// &#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x4F4D;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5;num&#x4E3A;4

let result = [].every(function (element, index, array) {
  return element &gt; 10;
})

console.log(result) // &#x6253;&#x5370; true

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> arr = [<span class="hljs-number">12</span>,<span class="hljs-number">34</span>,<span class="hljs-number">5</span>,<span class="hljs-number">23</span>,<span class="hljs-number">44</span>];
<span class="hljs-built_in">let</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">0</span>;
<span class="hljs-built_in">let</span> result = arr.<span class="hljs-built_in">every</span>(function (element, index, <span class="hljs-built_in">array</span>) {
  <span class="hljs-built_in">num</span>++;
  <span class="hljs-built_in">return</span> element &gt; <span class="hljs-number">10</span>;
})
console.<span class="hljs-built_in">log</span>(result,<span class="hljs-built_in">num</span>) // &#x6253;&#x5370; <span class="hljs-literal">false</span> <span class="hljs-number">3</span>
// &#x53EF;&#x89C1;&#x53D1;&#x73B0;<span class="hljs-number">5</span>&#x8FD9;&#x4E2A;&#x5C0F;&#x4E8E;<span class="hljs-number">10</span>&#x7684;&#x5143;&#x7D20;&#x540E;&#xFF0C;&#x904D;&#x5386;&#x7ACB;&#x5373;&#x7EC8;&#x6B62;&#xFF0C;<span class="hljs-built_in">num</span>&#x4E3A;<span class="hljs-number">3</span>

<span class="hljs-built_in">let</span> arr = [<span class="hljs-number">12</span>,<span class="hljs-number">34</span>,,<span class="hljs-number">23</span>,<span class="hljs-number">44</span>];
<span class="hljs-built_in">let</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">0</span>;
<span class="hljs-built_in">let</span> result = arr.<span class="hljs-built_in">every</span>(function (element, index, <span class="hljs-built_in">array</span>) {
  <span class="hljs-built_in">num</span>++;
  <span class="hljs-built_in">return</span> element &gt; <span class="hljs-number">10</span>;
})
console.<span class="hljs-built_in">log</span>(result,<span class="hljs-built_in">num</span>) // &#x6253;&#x5370; <span class="hljs-literal">true</span> <span class="hljs-number">4</span>
// &#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x4F4D;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5;<span class="hljs-built_in">num</span>&#x4E3A;<span class="hljs-number">4</span>

<span class="hljs-built_in">let</span> result = [].<span class="hljs-built_in">every</span>(function (element, index, <span class="hljs-built_in">array</span>) {
  <span class="hljs-built_in">return</span> element &gt; <span class="hljs-number">10</span>;
})

console.<span class="hljs-built_in">log</span>(result) // &#x6253;&#x5370; <span class="hljs-literal">true</span>

</code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5F53;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x624D;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false</b></p><p><br></p><h4>5. some() &#x65B9;&#x6CD5;&#x6D4B;&#x8BD5;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x67D0;&#x4E9B;&#x5143;&#x7D20;&#x662F;&#x5426;&#x901A;&#x8FC7;&#x7531;&#x63D0;&#x4F9B;&#x7684;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x7684;&#x6D4B;&#x8BD5;&#x3002;&#x5F53;&#x6570;&#x7EC4;&#x4E2D;&#x81F3;&#x5C11;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8C03;&#x7528;&#x5224;&#x5B9A;&#x51FD;&#x6570;&#x8FD4;&#x56DE;true&#xFF0C;&#x5B83;&#x5C31;&#x8FD4;&#x56DE;true&#xFF0C;&#x5F53;&#x4E14;&#x4EC5;&#x5F53;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8C03;&#x7528;&#x5224;&#x5B9A;&#x51FD;&#x6570;&#x90FD;&#x8FD4;&#x56DE;false&#xFF0C;&#x5B83;&#x624D;&#x8FD4;&#x56DE;false&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>callback</code> &#x7528;&#x6765;&#x6D4B;&#x8BD5;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x51FD;&#x6570;</p><p><code>thisArg</code> &#x53EF;&#x9009; &#x6267;&#x884C; callback &#x65F6;&#x4F7F;&#x7528;&#x7684; this &#x503C;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>some &#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x4E00;&#x6B21; callback &#x51FD;&#x6570;&#xFF0C;&#x76F4;&#x5230;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x4F7F;&#x5F97; callback &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x201C;&#x771F;&#x503C;&#x201D;&#xFF0C;&#x8FD9;&#x65F6;&#xFF0C;some &#x5C06;&#x4F1A;&#x7ACB;&#x5373;&#x8FD4;&#x56DE; true&#x3002;&#x5426;&#x5219;&#xFF0C;some &#x8FD4;&#x56DE; false&#x3002;callback &#x53EA;&#x4F1A;&#x5728;&#x90A3;&#x4E9B;&#x201D;&#x6709;&#x503C;&#x201C;&#x7684;&#x7D22;&#x5F15;&#x4E0A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4E0D;&#x4F1A;&#x5728;&#x90A3;&#x4E9B;&#x88AB;&#x5220;&#x9664;&#x6216;&#x4ECE;&#x6765;&#x672A;&#x88AB;&#x8D4B;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x4E0A;&#x8C03;&#x7528;&#x3002;</li><li>some &#x88AB;&#x8C03;&#x7528;&#x65F6;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x3002;</li><li>&#x7A7A;&#x6570;&#x7EC4;&#x8C03;&#x7528;some&#xFF0C;&#x8FD4;&#x56DE;false</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#x8BF4;&#x660E;
function isBiggerThan10(element, index, array) {
  return element &gt; 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

// &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8DDF;includes&#x65B9;&#x6CD5;&#x7C7B;&#x4F3C;&#x7684;&#x529F;&#x80FD;
let arr = [1,2,3];
function include(value) {
  return arr.some((element) =&gt; {
    return element === value;
  })
}
include(2) // true
include(4) // false

let result = [].some(function (element, index, array) {
  return element &gt; 10;
})

console.log(result) // &#x6253;&#x5370; false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#x8BF4;&#x660E;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isBiggerThan10</span>(<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-keyword">return</span> element &gt; <span class="hljs-number">10</span>;
}

[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].some(isBiggerThan10);  <span class="hljs-comment">// false</span>
[<span class="hljs-number">12</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].some(isBiggerThan10); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8DDF;includes&#x65B9;&#x6CD5;&#x7C7B;&#x4F3C;&#x7684;&#x529F;&#x80FD;</span>
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">include</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> arr.some(<span class="hljs-function">(<span class="hljs-params">element</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> element === value;
  })
}
include(<span class="hljs-number">2</span>) <span class="hljs-comment">// true</span>
include(<span class="hljs-number">4</span>) <span class="hljs-comment">// false</span>

<span class="hljs-keyword">let</span> result = [].some(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-keyword">return</span> element &gt; <span class="hljs-number">10</span>;
})

<span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// &#x6253;&#x5370; false</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x53EA;&#x8981;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x771F;&#x503C;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x4E3A;false</b></p><p><br></p><h4>6. reduce() &#x548C; reduceRight() &#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#x6307;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#x5C06;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x7EC4;&#x5408;&#xFF0C;&#x751F;&#x6210;&#x5355;&#x4E2A;&#x503C;&#x3002;&#x8FD9;&#x5728;&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x4E2D;&#x662F;&#x5E38;&#x89C1;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x79F0;&#x4E3A;&#x201C;&#x6CE8;&#x5165;&#x201D;&#x548C;&#x201C;&#x6298;&#x53E0;&#x201D;&#x3002;reduceRight() &#x548C; reduce() &#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;reduceRight() &#x6309;&#x7167;&#x6570;&#x7EC4;&#x7D22;&#x5F15;&#x4ECE;&#x9AD8;&#x5230;&#x4F4E;&#xFF08;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#xFF09;&#x5904;&#x7406;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4ECE;&#x4F4E;&#x5230;&#x9AD8;&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>callback</code> &#x6267;&#x884C;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x503C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5305;&#x542B;&#x56DB;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li><code>accumulator</code> &#x7D2F;&#x52A0;&#x5668;&#x7D2F;&#x52A0;&#x56DE;&#x8C03;&#x7684;&#x8FD4;&#x56DE;&#x503C;; &#x5B83;&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x7D2F;&#x79EF;&#x503C;&#xFF0C;&#x6216;initialValue&#xFF08;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF09;&#x3002;</li><li><code>currentValue</code> &#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li><code>currentIndex</code> (&#x53EF;&#x9009;) &#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002; &#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;initialValue&#xFF0C;&#x5219;&#x7D22;&#x5F15;&#x53F7;&#x4E3A;0&#xFF0C;&#x5426;&#x5219;&#x4E3A;&#x7D22;&#x5F15;&#x4E3A;1&#x3002;</li><li><code>array</code> (&#x53EF;&#x9009;) &#x8C03;&#x7528;reduce&#x7684;&#x6570;&#x7EC4;</li></ol><p><code>initialValue</code> (&#x53EF;&#x9009;) &#x7528;&#x4F5C;&#x7B2C;&#x4E00;&#x4E2A;&#x8C03;&#x7528; callback&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x503C;&#x3002; &#x5982;&#x679C;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x5219;&#x5C06;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002; &#x5728;&#x6CA1;&#x6709;&#x521D;&#x59CB;&#x503C;&#x7684;&#x7A7A;&#x6570;&#x7EC4;&#x4E0A;&#x8C03;&#x7528; reduce &#x5C06;&#x62A5;&#x9519;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>reduce&#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4F9D;&#x6B21;&#x6267;&#x884C;callback&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x6570;&#x7EC4;&#x4E2D;&#x88AB;&#x5220;&#x9664;&#x6216;&#x4ECE;&#x672A;&#x88AB;&#x8D4B;&#x503C;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7B2C;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x65F6;&#xFF0C;accumulator &#x548C;currentValue&#x7684;&#x53D6;&#x503C;&#x6709;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x8C03;&#x7528;reduce&#x65F6;&#x63D0;&#x4F9B;initialValue&#xFF0C;accumulator&#x53D6;&#x503C;&#x4E3A;initialValue&#xFF0C;currentValue&#x53D6;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#xFF1B;&#x6CA1;&#x6709;&#x63D0;&#x4F9B; initialValue&#xFF0C;accumulator&#x53D6;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;currentValue&#x53D6;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x503C;&#x3002;&#x5373;&#xFF1A;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;initialValue&#xFF0C;reduce &#x4F1A;&#x4ECE;&#x7D22;&#x5F15;1&#x7684;&#x5730;&#x65B9;&#x5F00;&#x59CB;&#x6267;&#x884C; callback &#x65B9;&#x6CD5;&#xFF0C;&#x8DF3;&#x8FC7;&#x7B2C;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;&#x3002;&#x5982;&#x679C;&#x63D0;&#x4F9B;initialValue&#xFF0C;&#x4ECE;&#x7D22;&#x5F15;0&#x5F00;&#x59CB;&#x3002;</li><li>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#x4E14;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;initialValue&#xFF0C;&#x4F1A;&#x629B;&#x51FA;TypeError &#x3002;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF08;&#x65E0;&#x8BBA;&#x4F4D;&#x7F6E;&#x5982;&#x4F55;&#xFF09;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;initialValue&#xFF0C; &#x6216;&#x8005;&#x6709;&#x63D0;&#x4F9B;initialValue&#x4F46;&#x662F;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#xFF0C;&#x90A3;&#x4E48;&#x6B64;&#x552F;&#x4E00;&#x503C;&#x5C06;&#x88AB;&#x8FD4;&#x56DE;<strong>&#x5E76;&#x4E14;callback&#x4E0D;&#x4F1A;&#x88AB;&#x6267;&#x884C;</strong>&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3,4,5];
let sum = arr.reduce((x,y) =&gt; x + y,0);
console.log(sum) // 15

// &#x770B;&#x4E00;&#x4E0B;initialValue&#x4F20;&#x548C;&#x4E0D;&#x4F20;&#x7684;&#x533A;&#x522B;
let arr = [1,2,3,4,5];
arr.reduce(function (accumulator,currentValue,currentIndex,arr) {
  console.log(currentIndex)
  return accumulator + currentValue;
})
// 1,2,3,4,5 &#x6CA1;&#x4F20;&#x5165;initialValue&#xFF0C;&#x7D22;&#x5F15;&#x662F;&#x4ECE;1&#x5F00;&#x59CB;
arr.reduce(function (accumulator,currentValue,currentIndex,arr) {
  console.log(currentIndex)
  return accumulator + currentValue;
},10)
// 0,1,2,3,4,5 &#x4F20;&#x5165;initialValue&#xFF0C;&#x7D22;&#x5F15;&#x4ECE;0&#x5F00;&#x59CB;

// &#x5E94;&#x7528;&#x5230;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x5C55;&#x5F00;
let arr = [[0, 1], [2, 3], [4, 5]].reduce(
  (a, b) =&gt; a.concat(b)
);
console.log(arr)
// [0, 1, 2, 3, 4, 5]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">let</span> sum = arr.reduce(<span class="hljs-function">(<span class="hljs-params">x,y</span>) =&gt;</span> x + y,<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(sum) <span class="hljs-comment">// 15</span>

<span class="hljs-comment">// &#x770B;&#x4E00;&#x4E0B;initialValue&#x4F20;&#x548C;&#x4E0D;&#x4F20;&#x7684;&#x533A;&#x522B;</span>
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">accumulator,currentValue,currentIndex,arr</span>) </span>{
  <span class="hljs-built_in">console</span>.log(currentIndex)
  <span class="hljs-keyword">return</span> accumulator + currentValue;
})
<span class="hljs-comment">// 1,2,3,4,5 &#x6CA1;&#x4F20;&#x5165;initialValue&#xFF0C;&#x7D22;&#x5F15;&#x662F;&#x4ECE;1&#x5F00;&#x59CB;</span>
arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">accumulator,currentValue,currentIndex,arr</span>) </span>{
  <span class="hljs-built_in">console</span>.log(currentIndex)
  <span class="hljs-keyword">return</span> accumulator + currentValue;
},<span class="hljs-number">10</span>)
<span class="hljs-comment">// 0,1,2,3,4,5 &#x4F20;&#x5165;initialValue&#xFF0C;&#x7D22;&#x5F15;&#x4ECE;0&#x5F00;&#x59CB;</span>

<span class="hljs-comment">// &#x5E94;&#x7528;&#x5230;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x5C55;&#x5F00;</span>
<span class="hljs-keyword">let</span> arr = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(
  <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.concat(b)
);
<span class="hljs-built_in">console</span>.log(arr)
<span class="hljs-comment">// [0, 1, 2, 3, 4, 5]</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x51FD;&#x6570;&#x7D2F;&#x8BA1;&#x5904;&#x7406;&#x7684;&#x7ED3;&#x679C;</b></p><p><br></p><h4>7. indexof() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x53EF;&#x4EE5;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x7ED9;&#x5B9A;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;-1&#x3002;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>searchElement</code> &#x8981;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;</p><p><code>fromIndex</code> &#xFF08;&#x53EF;&#x9009;&#xFF09;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#x7684;&#x4F4D;&#x7F6E;&#x3002;<br>&#x5982;&#x679C;&#x8BE5;&#x7D22;&#x5F15;&#x503C;&#x5927;&#x4E8E;&#x6216;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x4E0D;&#x4F1A;&#x5728;&#x6570;&#x7EC4;&#x91CC;&#x67E5;&#x627E;&#xFF0C;&#x8FD4;&#x56DE;-1&#x3002;</p><p>&#x5982;&#x679C;&#x8BE5;&#x7D22;&#x5F15;&#x503C;&#x662F;&#x8D1F;&#x503C;&#xFF0C;&#x4EE3;&#x8868;&#x76F8;&#x5BF9;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x7684;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x5373;-1&#x8868;&#x793A;&#x4ECE;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#xFF0C;-2&#x8868;&#x793A;&#x4ECE;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#xFF0C;<strong>&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x5E76;&#x4E0D;&#x6539;&#x53D8;&#x5176;&#x67E5;&#x627E;&#x987A;&#x5E8F;&#xFF0C;&#x67E5;&#x627E;&#x987A;&#x5E8F;&#x4ECD;&#x7136;&#x662F;&#x4ECE;&#x524D;&#x5411;&#x540E;&#x67E5;&#x8BE2;&#x6570;&#x7EC4;&#x3002;</strong></p><p>&#x5982;&#x679C;&#x8BE5;&#x7D22;&#x5F15;&#x503C;&#x662F;&#x8D1F;&#x503C;&#xFF0C;&#x5176;&#x7EDD;&#x5BF9;&#x503C;&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x90FD;&#x5C06;&#x4F1A;&#x88AB;&#x67E5;&#x8BE2;&#x3002;&#x5176;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> indexOf &#x4F7F;&#x7528;&#x4E25;&#x683C;&#x76F8;&#x7B49;&#xFF08;&#x5373; ===&#xFF09;&#x6BD4;&#x8F83; searchElement &#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;&#x800C;&#x4E14;indexOf()&#x4E0D;&#x80FD;&#x8BC6;&#x522B; <code>NaN</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let array = [2, 5, 9];
array.indexOf(2)     // 0
array.indexOf(7)     // -1
array.indexOf(9, 2)  // 2
array.indexOf(9, 3)  // -1
array.indexOf(2, -1) // -1
array.indexOf(2, -3) // 0
array.indexOf(2, -4) // 0

let array1 = [1,2,NaN];
array1.indexOf(NaN) // -1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let array = [<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>];
array.indexOf(<span class="hljs-number">2</span>)     <span class="hljs-comment">// 0</span>
array.indexOf(<span class="hljs-number">7</span>)     <span class="hljs-comment">// -1</span>
array.indexOf(<span class="hljs-number">9</span>, <span class="hljs-number">2</span>)  <span class="hljs-comment">// 2</span>
array.indexOf(<span class="hljs-number">9</span>, <span class="hljs-number">3</span>)  <span class="hljs-comment">// -1</span>
array.indexOf(<span class="hljs-number">2</span>, <span class="hljs-number">-1</span>) <span class="hljs-comment">// -1</span>
array.indexOf(<span class="hljs-number">2</span>, <span class="hljs-number">-3</span>) <span class="hljs-comment">// 0</span>
array.indexOf(<span class="hljs-number">2</span>, <span class="hljs-number">-4</span>) <span class="hljs-comment">// 0</span>

let array1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,NaN];
array1.indexOf(NaN) <span class="hljs-comment">// -1</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x9996;&#x4E2A;&#x88AB;&#x627E;&#x5230;&#x7684;&#x5143;&#x7D20;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7D22;&#x5F15;&#x4F4D;&#x7F6E;; &#x82E5;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5219;&#x8FD4;&#x56DE; -1</b></p><p><br></p><h4>8. lastIndexOf() &#x8DDF;indexOf()&#x67E5;&#x627E;&#x65B9;&#x5411;&#x76F8;&#x53CD;&#xFF0C;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x5143;&#x7D20;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x8FD4;&#x56DE; -1&#x3002;&#x4ECE;&#x6570;&#x7EC4;&#x7684;&#x540E;&#x9762;&#x5411;&#x524D;&#x67E5;&#x627E;&#xFF0C;&#x4ECE; fromIndex &#x5904;&#x5F00;&#x59CB;</h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p>searchElement &#x8981;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;</p><p>fromIndex &#xFF08;&#x53EF;&#x9009;&#xFF09;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#x51CF; 1&#xFF0C;&#x5373;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x90FD;&#x88AB;&#x67E5;&#x627E;&#x3002;<br>&#x5982;&#x679C;&#x8BE5;&#x503C;&#x5927;&#x4E8E;&#x6216;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x4F1A;&#x88AB;&#x67E5;&#x627E;&#x3002;<br>&#x5982;&#x679C;&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x5C06;&#x5176;&#x89C6;&#x4E3A;&#x4ECE;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x5411;&#x524D;&#x7684;&#x504F;&#x79FB;&#x3002;&#x5373;&#x4F7F;&#x8BE5;&#x503C;&#x4E3A;&#x8D1F;&#xFF0C;&#x6570;&#x7EC4;&#x4ECD;&#x7136;&#x4F1A;&#x88AB;&#x4ECE;&#x540E;&#x5411;&#x524D;&#x67E5;&#x627E;&#x3002;<br>&#x5982;&#x679C;&#x8BE5;&#x503C;&#x4E3A;&#x8D1F;&#x65F6;&#xFF0C;&#x5176;&#x7EDD;&#x5BF9;&#x503C;&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE; -1&#xFF0C;&#x5373;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x67E5;&#x627E;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> lastIndexOf &#x4F7F;&#x7528;&#x4E25;&#x683C;&#x76F8;&#x7B49;&#xFF08;&#x5373; ===&#xFF09;&#x6BD4;&#x8F83; searchElement &#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;&#x800C;&#x4E14;lastIndexOf()&#x4E0D;&#x80FD;&#x8BC6;&#x522B; <code>NaN</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let array = [2,5,9,2];
array.lastIndexOf(9) // 2
array.lastIndexOf(&apos;9&apos;) // -1 &#x4E25;&#x683C;&#x76F8;&#x7B49;
array.lastIndexOf(7) // -1
array.lastIndexOf(2,4) // 3
array.lastIndexOf(2,3) // 3
array.lastIndexOf(2,2) // 0
array.lastIndexOf(2,-1) // 3
array.lastIndexOf(2,-2) // 0
array.lastIndexOf(2,-4) // 0
array.lastIndexOf(2,-5) // -1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let array = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">9</span>,<span class="hljs-number">2</span>];
array.lastIndexOf(<span class="hljs-number">9</span>) <span class="hljs-comment">// 2</span>
array.lastIndexOf(&apos;<span class="hljs-number">9</span>&apos;) <span class="hljs-comment">// -1 &#x4E25;&#x683C;&#x76F8;&#x7B49;</span>
array.lastIndexOf(<span class="hljs-number">7</span>) <span class="hljs-comment">// -1</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">4</span>) <span class="hljs-comment">// 3</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>) <span class="hljs-comment">// 3</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">2</span>) <span class="hljs-comment">// 0</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">-1</span>) <span class="hljs-comment">// 3</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">-2</span>) <span class="hljs-comment">// 0</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">-4</span>) <span class="hljs-comment">// 0</span>
array.lastIndexOf(<span class="hljs-number">2</span>,<span class="hljs-number">-5</span>) <span class="hljs-comment">// -1</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x6570;&#x7EC4;&#x4E2D;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x672A;&#x627E;&#x5230;&#x8FD4;&#x56DE;-1</b></p><p><br></p><h4>9. includes() &#x65B9;&#x6CD5;&#x7528;&#x6765;&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x6839;&#x636E;&#x60C5;&#x51B5;&#xFF0C;&#x5982;&#x679C;&#x5305;&#x542B;&#x5219;&#x8FD4;&#x56DE; true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#x3002; <b>ES7&#x65B0;&#x589E;</b></h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong></p><p><code>searchElement</code> &#x9700;&#x8981;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;&#x503C;&#x3002;</p><p><code>fromIndex</code> &#xFF08;&#x53EF;&#x9009;&#xFF09; &#x4ECE;&#x8BE5;&#x7D22;&#x5F15;&#x5904;&#x5F00;&#x59CB;&#x67E5;&#x627E; searchElement&#x3002;&#x9ED8;&#x8BA4;&#x4E3A; 0&#x3002;&#x5982;&#x679C;&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x5219;&#x6309;&#x5347;&#x5E8F;&#x4ECE; array.length + fromIndex &#x7684;&#x7D22;&#x5F15;&#x5F00;&#x59CB;&#x641C;&#x7D22;&#x3002;&#x8D1F;&#x503C;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x6570;&#x7EC4;&#x5EA6;&#xFF0C;&#x4ECE;0&#x5F00;&#x59CB;&#x641C;&#x7D22;&#x3002;</p><p>&#x5982;&#x679C;fromIndex &#x5927;&#x4E8E;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6; &#xFF0C;&#x5219;&#x8FD4;&#x56DE; false &#x3002;&#x8BE5;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x641C;&#x7D22;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><p>includes&#x89E3;&#x51B3;&#x4E86;&#x4E24;&#x4E2A;indexOf&#x7684;&#x95EE;&#x9898;:</p><ol><li>indexOf&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x8BC6;&#x522B;NaN</li><li>indexOf&#x65B9;&#x6CD5;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5305;&#x542B;&#x67D0;&#x4E2A;&#x503C;&#x4E0D;&#x591F;&#x8BED;&#x4E49;&#x5316;&#xFF0C;&#x9700;&#x8981;&#x5224;&#x65AD;&#x662F;&#x5426;&#x4E0D;&#x7B49;&#x4E8E;-1&#xFF0C;&#x8868;&#x8FBE;&#x4E0D;&#x591F;&#x76F4;&#x89C2;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, 3].includes(3, -4); // true
[1, 2, NaN].includes(NaN); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">2</span>);     <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">4</span>);     <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>, <span class="hljs-number">-1</span>); <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>, <span class="hljs-number">-4</span>); <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, NaN].includes(NaN); <span class="hljs-comment">// true</span></code></pre><p><b><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong> &#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x6839;&#x636E;&#x60C5;&#x51B5;&#xFF0C;&#x5982;&#x679C;&#x5305;&#x542B;&#x5219;&#x8FD4;&#x56DE; true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#x3002;</b></p><p><br></p><h4>10. find() &#x548C; findIndex() find &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x4E2D;&#x6EE1;&#x8DB3;&#x63D0;&#x4F9B;&#x7684;&#x6D4B;&#x8BD5;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;&#x5426;&#x5219;&#x8FD4;&#x56DE; undefined&#x3002;findIndex &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x4E2D;&#x6EE1;&#x8DB3;&#x63D0;&#x4F9B;&#x7684;&#x6D4B;&#x8BD5;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x5426;&#x5219;&#x8FD4;&#x56DE;-1&#x3002;<b>(ES6&#x65B0;&#x589E;)</b></h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong> &#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x8DDF;&#x5176;&#x4ED6;&#x7684;&#x65B9;&#x6CD5;&#x7C7B;&#x4F3C;</p><p><code>callback</code> &#x5728;&#x6570;&#x7EC4;&#x6BCF;&#x4E00;&#x9879;&#x4E0A;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x6536; 3 &#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li><code>element</code> &#x5F53;&#x524D;&#x904D;&#x5386;&#x5230;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li><code>index</code> &#x5F53;&#x524D;&#x904D;&#x5386;&#x5230;&#x7684;&#x7D22;&#x5F15;&#x3002;</li><li><code>array</code> &#x6570;&#x7EC4;&#x672C;&#x8EAB;&#x3002;</li></ol><p><code>thisArg</code> &#x53EF;&#x9009;&#xFF0C;&#x6307;&#x5B9A; callback &#x7684; this &#x53C2;&#x6570;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x5143;&#x7D20;&#x6267;&#x884C;&#x4E00;&#x6B21; callback &#x51FD;&#x6570;&#xFF0C;&#x76F4;&#x81F3;&#x6709;&#x4E00;&#x4E2A; callback &#x8FD4;&#x56DE; true&#x3002;<strong>&#x5728;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x5373;&#x4F7F;&#x5BF9;&#x4E8E;&#x6570;&#x7EC4;&#x4E2D;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x6761;&#x76EE;&#x7684;&#x7D22;&#x5F15;&#x4E5F;&#x4F1A;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</strong> &#x8FD9;&#x610F;&#x5473;&#x7740;&#x5BF9;&#x4E8E;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x6765;&#x8BF4;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x6548;&#x7387;&#x8981;&#x4F4E;&#x4E8E;&#x90A3;&#x4E9B;&#x53EA;&#x904D;&#x5386;&#x6709;&#x503C;&#x7684;&#x7D22;&#x5F15;&#x7684;&#x65B9;&#x6CD5;&#x3002;</li><li>&#x5F53;&#x627E;&#x5230;&#x4E00;&#x4E2A;callback&#x5224;&#x65AD;&#x4E3A;true&#x7684;&#x5143;&#x7D20;&#xFF0C;find&#x65B9;&#x6CD5;&#x4F1A;&#x7ACB;&#x5373;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE; undefined&#x3002;findIndex&#x4F1A;&#x7ACB;&#x5373;&#x8FD4;&#x56DE;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x5982;&#x679C;&#x56DE;&#x8C03;&#x4ECE;&#x4E0D;&#x8FD4;&#x56DE;&#x771F;&#x503C;&#xFF0C;&#x6216;&#x8005;&#x6570;&#x7EC4;&#x7684;length&#x4E3A;0&#xFF0C;&#x5219;findIndex&#x8FD4;&#x56DE;-1&#x3002;</li><li>&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x6240;&#x8C03;&#x7528;&#x7684;&#x6570;&#x7EC4;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// find
let a = [1, 4, -5, 10].find((n) =&gt; n &lt; 0); // &#x8FD4;&#x56DE;&#x5143;&#x7D20;-5
let b = [1, 4, -5, 10,NaN].find((n) =&gt; Object.is(NaN, n));  // &#x8FD4;&#x56DE;&#x5143;&#x7D20;NaN
// findIndex
let a = [1, 4, -5, 10].findIndex((n) =&gt; n &lt; 0); // &#x8FD4;&#x56DE;&#x7D22;&#x5F15;2
let b = [1, 4, -5, 10,NaN].findIndex((n) =&gt; isNaN(n));  // &#x8FD4;&#x56DE;&#x7D22;&#x5F15;4

// &#x7A00;&#x758F;&#x6570;&#x7EC4;
let a =[1,,3,4];
let index = 0;
a.find((n) =&gt; {
  console.log(index++) //0,1,2 &#x7B2C;&#x4E8C;&#x6B21;&#x662F;empty&#x4E5F;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#xFF0C;&#x800C;&#x4E14;&#x8FD4;&#x56DE;&#x4E3A;true&#xFF0C;&#x7ACB;&#x5373;&#x9000;&#x51FA; 
  return n === 3;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// find</span>
<span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>].find(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n &lt; <span class="hljs-number">0</span>); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5143;&#x7D20;-5</span>
<span class="hljs-keyword">let</span> b = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>,<span class="hljs-literal">NaN</span>].find(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, n));  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5143;&#x7D20;NaN</span>
<span class="hljs-comment">// findIndex</span>
<span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>].findIndex(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n &lt; <span class="hljs-number">0</span>); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x7D22;&#x5F15;2</span>
<span class="hljs-keyword">let</span> b = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>,<span class="hljs-literal">NaN</span>].findIndex(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> <span class="hljs-built_in">isNaN</span>(n));  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x7D22;&#x5F15;4</span>

<span class="hljs-comment">// &#x7A00;&#x758F;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">let</span> a =[<span class="hljs-number">1</span>,,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>;
a.find(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(index++) <span class="hljs-comment">//0,1,2 &#x7B2C;&#x4E8C;&#x6B21;&#x662F;empty&#x4E5F;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#xFF0C;&#x800C;&#x4E14;&#x8FD4;&#x56DE;&#x4E3A;true&#xFF0C;&#x7ACB;&#x5373;&#x9000;&#x51FA; </span>
  <span class="hljs-keyword">return</span> n === <span class="hljs-number">3</span>;
})</code></pre><p><b><br><strong>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;</strong></b></p><ol><li>find &#x65B9;&#x6CD5;&#xFF0C;&#x5F53;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x901A;&#x8FC7; callback &#x7684;&#x6D4B;&#x8BD5;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE; undefined&#x3002;</li><li>findIndex&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x4E2D;&#x6EE1;&#x8DB3;&#x63D0;&#x4F9B;&#x7684;&#x6D4B;&#x8BD5;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x5426;&#x5219;&#x8FD4;&#x56DE;-1&#x3002;</li></ol><p></p><p><b>&#x77E5;&#x8BC6;&#x70B9;</b><br>&#x4E0D;&#x8981;&#x7528; find() &#x4EE3;&#x66FF; some(),&#x901A;&#x5E38;&#x6DF7;&#x7528;&#x662F;&#x8FD9;&#x79CD;&#x573A;&#x666F;&#xFF0C;find &#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x503C;&#xFF0C;&#x76F4;&#x63A5;&#x62FF;&#x8FD9;&#x4E2A;&#x503C;&#x505A; if &#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x503C;&#x4E5F;&#x6709;&#x53EF;&#x80FD;&#x6070;&#x597D;&#x4E3A; 0&#x3002;<br>find &#x662F;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x503C;&#x540E;&#x5BF9;&#x5176;&#x8FDB;&#x4E00;&#x6B65;&#x5904;&#x7406;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#x7684;&#x60C5;&#x51B5;&#xFF1B;some &#x624D;&#x662F;&#x68C0;&#x67E5;&#x5B58;&#x5728;&#x6027;&#xFF1B;&#x4E24;&#x8005;&#x4E0D;&#x53EF;&#x6DF7;&#x7528;&#x3002;</p><p><br></p><h4>11. keys() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Array&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x5B83;&#x5305;&#x542B;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x7D22;&#x5F15;&#x7684;&#x952E;&#x3002; <b>(ES6&#x65B0;&#x589E;)</b></h4><h4>12. values() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Array&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x5B83;&#x5305;&#x542B;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x7D22;&#x5F15;&#x7684;&#x503C;&#x3002; <b>(ES6&#x65B0;&#x589E;)</b></h4><h4>13. @@iterator &#x5C5E;&#x6027;&#x548C; values() &#x5C5E;&#x6027;&#x7684;&#x521D;&#x59CB;&#x503C;&#x5747;&#x4E3A;&#x540C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x3002;&#x6570;&#x7EC4;&#x7684; iterator &#x65B9;&#x6CD5;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x4E0E; values() &#x8FD4;&#x56DE;&#x503C;&#x76F8;&#x540C;,&#x8C03;&#x7528;&#x8BED;&#x6CD5;&#x662F; <code>arr[Symbol.iterator]()</code> <b>(ES6&#x65B0;&#x589E;)</b></h4><h4>14. entries() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Array&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x7D22;&#x5F15;&#x7684;&#x952E;/&#x503C;&#x5BF9;&#x3002; <b>(ES6&#x65B0;&#x589E;)</b></h4><p><strong>&#x53C2;&#x6570;&#xFF1A;</strong> &#x90FD;&#x662F;&#x65E0;&#x3002;</p><p><b>&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Array &#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#x3002;</b></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key of [&apos;a&apos;, &apos;b&apos;].keys()) {
  console.log(key);
}
// 0
// 1

for (let value of [&apos;a&apos;, &apos;b&apos;].values()) {
  console.log(value);
}
// &apos;a&apos;
// &apos;b&apos;

for (let value of [&apos;a&apos;, &apos;b&apos;][Symbol.iterator]()) {
  console.log(value);
}
// &apos;a&apos;
// &apos;b&apos;

for (let [key, value] of [&apos;a&apos;, &apos;b&apos;].entries()) {
  console.log(key, value);
}
// 0 &quot;a&quot;
// 1 &quot;b&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].keys()) {
  console.log(key);
}
<span class="hljs-comment">// 0</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].values()) {
  console.log(<span class="hljs-keyword">value</span>);
}
<span class="hljs-comment">// &apos;a&apos;</span>
<span class="hljs-comment">// &apos;b&apos;</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>][Symbol.iterator]()) {
  console.log(<span class="hljs-keyword">value</span>);
}
<span class="hljs-comment">// &apos;a&apos;</span>
<span class="hljs-comment">// &apos;b&apos;</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, <span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].entries()) {
  console.log(key, <span class="hljs-keyword">value</span>);
}
<span class="hljs-comment">// 0 &quot;a&quot;</span>
<span class="hljs-comment">// 1 &quot;b&quot;</span></code></pre><p><br></p><h2 id="articleHeader9">&#x6269;&#x5C55;&#x51E0;&#x4E2A;&#x6982;&#x5FF5;</h2><h4>1&#x3001;&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;&#x548C;&#x5BF9;&#x8C61;key&#x6709;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#xFF1F;</h4><p>&#x6570;&#x7EC4;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x7279;&#x6B8A;&#x5F62;&#x5F0F;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x62EC;&#x53F7;&#x8BBF;&#x95EE;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x548C;&#x4F7F;&#x7528;&#x65B9;&#x62EC;&#x53F7;&#x8BBF;&#x95EE;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#x3002;JavaScript&#x5C06;&#x6307;&#x5B9A;&#x7684;&#x6570;&#x5B57;&#x7D22;&#x5F15;&#x503C;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#x2014;&#x2014;&#x7D22;&#x5F15;1&#x53D8;&#x6210;&quot;1&quot;&#x2014;&#x2014;&#x7136;&#x540E;&#x5C06;&#x5176;&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x540D;&#x6765;&#x4F7F;&#x7528;&#x3002;&#x6570;&#x7EC4;&#x7684;&#x7279;&#x522B;&#x4E4B;&#x5904;&#x5728;&#x4E8E;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x5C0F;&#x4E8E;2^32&#x7684;&#x975E;&#x8D1F;&#x6574;&#x6570;&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x540D;&#x65F6;&#x6570;&#x7EC4;&#x4F1A;&#x81EA;&#x52A8;&#x7EF4;&#x62A4;&#x5176;length&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7D22;&#x5F15;&#x5230;&#x5C5E;&#x6027;&#x540D;&#x7684;&#x8F6C;&#x5316;
let arr = [1,2,3];
console.log(arr[1]) // 2
console.log(arr[&quot;1&quot;]) // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">// &#x7D22;&#x5F15;&#x5230;&#x5C5E;&#x6027;&#x540D;&#x7684;&#x8F6C;&#x5316;</span>
let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
console.log(arr[<span class="hljs-number">1</span>]) <span class="hljs-comment">// 2</span>
console.log(arr[<span class="hljs-string">&quot;1&quot;</span>]) <span class="hljs-comment">// 2</span></code></pre><p><br></p><p>&#x6240;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x90FD;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x4E3A;&#x5176;&#x521B;&#x5EFA;&#x4EFB;&#x610F;&#x540D;&#x5B57;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x8FC7;&#xFF0C;&#x53EA;&#x6709;&#x5728;&#x5C0F;&#x4E8E;2^32&#x7684;&#x975E;&#x8D1F;&#x6574;&#x6570;&#x624D;&#x662F;&#x7D22;&#x5F15;&#xFF0C;&#x6570;&#x7EC4;&#x624D;&#x4F1A;&#x6839;&#x636E;&#x9700;&#x8981;&#x66F4;&#x65B0;length&#x3002;&#x4E8B;&#x5B9E;&#x4E0A;&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;&#x4EC5;&#x4EC5;&#x662F;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x540D;&#x7684;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7C7B;&#x578B;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;JavaScript&#x6570;&#x7EC4;&#x6CA1;&#x6709;&#x201C;&#x8D8A;&#x754C;&#x201D;&#x9519;&#x8BEF;&#x7684;&#x6982;&#x5FF5;&#x3002;&#x5F53;&#x67E5;&#x8BE2;&#x4EFB;&#x4F55;&#x5BF9;&#x8C61;&#x4E2D;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x53EA;&#x4F1A;&#x5F97;&#x5230;undefined</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [];
arr[&quot;a&quot;] = 1;
console.log(arr,arr.length) // arr&#x662F;[a:1] length&#x662F;0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arr = [];
arr[<span class="hljs-string">&quot;a&quot;</span>] = <span class="hljs-number">1</span>;
console.<span class="hljs-built_in">log</span>(arr,arr.length) <span class="hljs-comment">// arr&#x662F;[a:1] length&#x662F;0</span></code></pre><p><br></p><p>&#x5BF9;&#x4E8E;&#x4F7F;&#x7528;&#x8D1F;&#x6570;&#x6216;&#x975E;&#x6574;&#x6570;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x6570;&#x503C;&#x4F1A;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x540D;&#x6765;&#x7528;&#xFF0C;&#x5F53;&#x65F6;&#x53EA;&#x80FD;&#x5F53;&#x505A;&#x5E38;&#x89C4;&#x7684;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x975E;&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [];
arr[-1.23] = 0;
console.log(arr,arr.length) // arr&#x662F;[-1.23: 0] length&#x662F;0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> arr = [];
arr[-<span class="hljs-number">1.23</span>] = <span class="hljs-number">0</span>;
console.<span class="hljs-built_in">log</span>(arr,arr.<span class="hljs-built_in">length</span>) // arr&#x662F;[-<span class="hljs-number">1.23</span>: <span class="hljs-number">0</span>] <span class="hljs-built_in">length</span>&#x662F;<span class="hljs-number">0</span></code></pre><p><br></p><p>&#x4F7F;&#x7528;&#x975E;&#x8D1F;&#x6574;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x4E00;&#x4E2A;&#x8DDF;&#x6574;&#x6570;&#x76F8;&#x7B49;&#x7684;&#x6D6E;&#x70B9;&#x6570;&#x65F6;&#xFF0C;&#x5B83;&#x5C31;&#x5F53;&#x505A;&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;&#x800C;&#x975E;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [];
arr[&quot;100&quot;] = &apos;a&apos;;
console.log(arr,arr.length) // arr &#x662F;[empty &#xD7; 100, &quot;a&quot;]&#xFF0C;length &#x662F;101

let arr1 = [];
arr1[1.0000] = &apos;b&apos;;
console.log(arr1,arr1.length) // arr &#x662F;[empty, &quot;b&quot;]&#xFF0C;length &#x662F;2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> arr = [];
arr[<span class="hljs-string">&quot;100&quot;</span>] = &apos;a&apos;;
console.<span class="hljs-built_in">log</span>(arr,arr.<span class="hljs-built_in">length</span>) // arr &#x662F;[empty &#xD7; <span class="hljs-number">100</span>, <span class="hljs-string">&quot;a&quot;</span>]&#xFF0C;<span class="hljs-built_in">length</span> &#x662F;<span class="hljs-number">101</span>

<span class="hljs-built_in">let</span> arr1 = [];
arr1[<span class="hljs-number">1.0000</span>] = &apos;b&apos;;
console.<span class="hljs-built_in">log</span>(arr1,arr1.<span class="hljs-built_in">length</span>) // arr &#x662F;[empty, <span class="hljs-string">&quot;b&quot;</span>]&#xFF0C;<span class="hljs-built_in">length</span> &#x662F;<span class="hljs-number">2</span></code></pre><h4>2&#x3001;&#x7A00;&#x758F;&#x6570;&#x7EC4;</h4><blockquote>&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x5C31;&#x662F;&#x5305;&#x542B;&#x4ECE;0&#x5F00;&#x59CB;&#x7684;&#x4E0D;&#x8FDE;&#x7EED;&#x7D22;&#x5F15;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x901A;&#x5E38;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x503C;&#x4EE3;&#x8868;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x4E2A;&#x6570;&#x3002;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x662F;&#x7A00;&#x758F;&#x7684;&#xFF0C;length&#x5C5E;&#x6027;&#x503C;&#x5927;&#x4E8E;&#x5143;&#x7D20;&#x7684;&#x4E2A;&#x6570;</blockquote><p>&#x8DB3;&#x591F;&#x7A00;&#x758F;&#x7684;&#x6570;&#x7EC4;&#x901A;&#x5E38;&#x5728;&#x5B9E;&#x73B0;&#x4E0A;&#x6BD4;&#x7A20;&#x5BC6;&#x7684;&#x6570;&#x7EC4;&#x66F4;&#x6162;&#xFF0C;&#x66F4;&#x8017;&#x5185;&#x5B58;&#xFF0C;&#x5728;&#x8FD9;&#x6837;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x67E5;&#x627E;&#x5143;&#x7D20;&#x6240;&#x7528;&#x7684;&#x65F6;&#x95F4;&#x5C31;&#x53D8;&#x5F97;&#x8DDF;&#x5E38;&#x89C4;&#x5BF9;&#x8C61;&#x7684;&#x67E5;&#x627E;&#x65F6;&#x95F4;&#x4E00;&#x6837;&#x957F;&#x4E86;&#xFF0C;&#x5931;&#x53BB;&#x4E86;&#x6027;&#x80FD;&#x7684;&#x4F18;&#x52BF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a1 = [,,]; // &#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;&#xFF0C;&#x8BE5;&#x6570;&#x7EC4;&#x662F;[empty &#xD7; 2]
0 in a1 // false: a1&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6CA1;&#x6709;&#x5143;&#x7D20;

let a2 = new Array(3); //[empty &#xD7; 3],&#x8BE5;&#x6570;&#x7EC4;&#x6839;&#x672C;&#x6CA1;&#x6709;&#x5143;&#x7D20;
0 in a2 // false: a2&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6CA1;&#x6709;&#x5143;&#x7D20;

let a3 = [undefined];
0 in a3 // true: a3&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6709;&#x4E00;&#x4E2A;&#x503C;&#x4E3A;undefined&#x7684;&#x5143;&#x7D20;

let a4 = [,undefined];
0 in a4 // fasle: a4&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6CA1;&#x6709;&#x5143;&#x7D20;
1 in a4 // true: a4&#x5728;&#x7D22;&#x5F15;1&#x5904;&#x6709;&#x4E00;&#x4E2A;&#x503C;&#x4E3A;undefined&#x7684;&#x5143;&#x7D20;
console.log(a4[0],a4[1]) // undefined undefined,&#x53EF;&#x89C1;&#x6570;&#x7EC4;&#x8BBF;&#x95EE;&#x8FD4;&#x56DE;undefined,&#x53EF;&#x80FD;&#x662F;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4E3A;undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> a1 = [,,]; <span class="hljs-comment">// &#x6570;&#x7EC4;&#x76F4;&#x63A5;&#x91CF;&#xFF0C;&#x8BE5;&#x6570;&#x7EC4;&#x662F;[empty &#xD7; 2]</span>
<span class="hljs-number">0</span> <span class="hljs-keyword">in</span> a1 <span class="hljs-comment">// false: a1&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6CA1;&#x6709;&#x5143;&#x7D20;</span>

<span class="hljs-keyword">let</span> a2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>); <span class="hljs-comment">//[empty &#xD7; 3],&#x8BE5;&#x6570;&#x7EC4;&#x6839;&#x672C;&#x6CA1;&#x6709;&#x5143;&#x7D20;</span>
<span class="hljs-number">0</span> <span class="hljs-keyword">in</span> a2 <span class="hljs-comment">// false: a2&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6CA1;&#x6709;&#x5143;&#x7D20;</span>

<span class="hljs-keyword">let</span> a3 = [<span class="hljs-literal">undefined</span>];
<span class="hljs-number">0</span> <span class="hljs-keyword">in</span> a3 <span class="hljs-comment">// true: a3&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6709;&#x4E00;&#x4E2A;&#x503C;&#x4E3A;undefined&#x7684;&#x5143;&#x7D20;</span>

<span class="hljs-keyword">let</span> a4 = [,<span class="hljs-literal">undefined</span>];
<span class="hljs-number">0</span> <span class="hljs-keyword">in</span> a4 <span class="hljs-comment">// fasle: a4&#x5728;&#x7D22;&#x5F15;0&#x5904;&#x6CA1;&#x6709;&#x5143;&#x7D20;</span>
<span class="hljs-number">1</span> <span class="hljs-keyword">in</span> a4 <span class="hljs-comment">// true: a4&#x5728;&#x7D22;&#x5F15;1&#x5904;&#x6709;&#x4E00;&#x4E2A;&#x503C;&#x4E3A;undefined&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-built_in">console</span>.log(a4[<span class="hljs-number">0</span>],a4[<span class="hljs-number">1</span>]) <span class="hljs-comment">// undefined undefined,&#x53EF;&#x89C1;&#x6570;&#x7EC4;&#x8BBF;&#x95EE;&#x8FD4;&#x56DE;undefined,&#x53EF;&#x80FD;&#x662F;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4E3A;undefined</span></code></pre><h4>3&#x3001;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;</h4><blockquote>&#x62E5;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x503C;length&#x5C5E;&#x6027;&#x548C;&#x5BF9;&#x5E94;&#x975E;&#x8D1F;&#x6574;&#x6570;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x770B;&#x505A;&#x4E00;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x7EC4;</blockquote><p>&#x6570;&#x7EC4;&#x8DDF;&#x7C7B;&#x6570;&#x7EC4;&#x76F8;&#x6BD4;&#x6709;&#x4EE5;&#x4E0B;&#x4E0D;&#x540C;&#xFF1A;</p><ol><li>&#x5F53;&#x6709;&#x65B0;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x65F6;&#xFF0C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;length&#x5C5E;&#x6027;</li><li>&#x8BBE;&#x7F6E;length&#x4E3A;&#x4E00;&#x4E2A;&#x8F83;&#x5C0F;&#x503C;&#x5C06;&#x622A;&#x65AD;&#x6570;&#x7EC4;</li><li>&#x4ECE;Array.prototype&#x4E2D;&#x7EE7;&#x627F;&#x4E86;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;</li><li>&#x5176;&#x7C7B;&#x5C5E;&#x6027;&#x4E3A;&apos;Array&apos;</li></ol><p>JavaScript &#x6570;&#x7EC4;&#x6709;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#x7279;&#x610F;&#x5B9A;&#x4E49;&#x901A;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x4ED6;&#x4EEC;&#x4E0D;&#x4EC5;&#x5E94;&#x7528;&#x5728;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#x800C;&#x4E14;&#x5728;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x4E0A;&#x90FD;&#x80FD;&#x6B63;&#x786E;&#x5DE5;&#x4F5C;&#xFF0C;JavaScript&#x6743;&#x5A01;&#x6307;&#x5357;&#x4E00;&#x4E66;&#x8BF4;&#x7684;&#x662F;&#xFF1A;ES5&#x4E2D;&#x6240;&#x6709;&#x7684;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x901A;&#x7528;&#x7684;&#xFF0C;ES3&#x4E2D;&#x9664;&#x4E86;toString()&#x548C;toLocaleString()&#x610F;&#x5916;&#x6240;&#x6709;&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x901A;&#x7528;&#x7684;&#x3002;</p><p>&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x663E;&#x7136;&#x6CA1;&#x6709;&#x7EE7;&#x627F;&#x81EA;Array.prototype&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x4EEC;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x8FC7;&#x53EF;&#x4EE5;&#x95F4;&#x63A5;&#x5730;&#x4F7F;&#x7528;Function.call&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7C7B;&#x6570;&#x7EC4;&#x5E94;&#x7528;&#x901A;&#x7528;&#x65B9;&#x6CD5;
let arrayLike = {0: &apos;name&apos;, 1: &apos;age&apos;, 2: &apos;address&apos;, length: 3 }
Array.prototype.join.call(arrayLike,&apos;*&apos;) // &quot;name*age*address&quot;

// &#x8FD8;&#x8BB0;&#x5F97;&#x5F53;&#x521D;&#x83B7;&#x53D6;&#x7684;DOM&#x5143;&#x7D20;&#x600E;&#x4E48;&#x8F6C;&#x5316;&#x6210;&#x6570;&#x7EC4;&#x4E48;&#xFF1F;
functon toArray (DOM) {
  return Array.prototype.slice.call(DOM);
}

//&#x5BF9;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x4E5F;&#x53EF;&#x4EE5;&#x7684;
let htmlCollection = document.getElementsByTagName(&apos;h2&apos;);
let arr1 = Array.prototype.map.call(htmlCollection,function (ele,index){return ele});
console.log(Array.isArray(arr1)) // true

// &#x8FD8;&#x6709;&#x8FD9;&#x6837;
let arrayLike = {0: &apos;name&apos;, 1: &apos;age&apos;, 2: &apos;address&apos;, length: 3 }
let arr2  = Array.prototype.concat.apply([],arrayLike);
console.log(arr) //[&quot;name&quot;, &quot;age&quot;, &quot;address&quot;]

// ES6&#x73B0;&#x5728;&#x8FD9;&#x6837;
let arrayLike = {0: &apos;name&apos;, 1: &apos;age&apos;, 2: &apos;address&apos;, length: 3 }
let arr3 = Array.from(arrayLike);
console.log(arr3) // [&quot;name&quot;, &quot;age&quot;, &quot;address&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x7C7B;&#x6570;&#x7EC4;&#x5E94;&#x7528;&#x901A;&#x7528;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">let</span> arrayLike = {<span class="hljs-number">0</span>: <span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-number">1</span>: <span class="hljs-string">&apos;age&apos;</span>, <span class="hljs-number">2</span>: <span class="hljs-string">&apos;address&apos;</span>, <span class="hljs-attr">length</span>: <span class="hljs-number">3</span> }
<span class="hljs-built_in">Array</span>.prototype.join.call(arrayLike,<span class="hljs-string">&apos;*&apos;</span>) <span class="hljs-comment">// &quot;name*age*address&quot;</span>

<span class="hljs-comment">// &#x8FD8;&#x8BB0;&#x5F97;&#x5F53;&#x521D;&#x83B7;&#x53D6;&#x7684;DOM&#x5143;&#x7D20;&#x600E;&#x4E48;&#x8F6C;&#x5316;&#x6210;&#x6570;&#x7EC4;&#x4E48;&#xFF1F;</span>
functon toArray (DOM) {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.prototype.slice.call(DOM);
}

<span class="hljs-comment">//&#x5BF9;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x4E5F;&#x53EF;&#x4EE5;&#x7684;</span>
<span class="hljs-keyword">let</span> htmlCollection = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;h2&apos;</span>);
<span class="hljs-keyword">let</span> arr1 = <span class="hljs-built_in">Array</span>.prototype.map.call(htmlCollection,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ele,index</span>)</span>{<span class="hljs-keyword">return</span> ele});
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Array</span>.isArray(arr1)) <span class="hljs-comment">// true</span>

<span class="hljs-comment">// &#x8FD8;&#x6709;&#x8FD9;&#x6837;</span>
<span class="hljs-keyword">let</span> arrayLike = {<span class="hljs-number">0</span>: <span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-number">1</span>: <span class="hljs-string">&apos;age&apos;</span>, <span class="hljs-number">2</span>: <span class="hljs-string">&apos;address&apos;</span>, <span class="hljs-attr">length</span>: <span class="hljs-number">3</span> }
<span class="hljs-keyword">let</span> arr2  = <span class="hljs-built_in">Array</span>.prototype.concat.apply([],arrayLike);
<span class="hljs-built_in">console</span>.log(arr) <span class="hljs-comment">//[&quot;name&quot;, &quot;age&quot;, &quot;address&quot;]</span>

<span class="hljs-comment">// ES6&#x73B0;&#x5728;&#x8FD9;&#x6837;</span>
<span class="hljs-keyword">let</span> arrayLike = {<span class="hljs-number">0</span>: <span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-number">1</span>: <span class="hljs-string">&apos;age&apos;</span>, <span class="hljs-number">2</span>: <span class="hljs-string">&apos;address&apos;</span>, <span class="hljs-attr">length</span>: <span class="hljs-number">3</span> }
<span class="hljs-keyword">let</span> arr3 = <span class="hljs-built_in">Array</span>.from(arrayLike);
<span class="hljs-built_in">console</span>.log(arr3) <span class="hljs-comment">// [&quot;name&quot;, &quot;age&quot;, &quot;address&quot;]</span></code></pre><h4>4&#x3001; JavaScript&#x6570;&#x7EC4;&#x7684;&#x8FDB;&#x5316;&#x2014;&#x2014;&#x7C7B;&#x578B;&#x5316;&#x6570;&#x7EC4;&#x7684;&#x5F15;&#x5165;</h4><p>&#x5148;&#x8BF4;&#x4E00;&#x4E0B;&#x666E;&#x904D;&#x610F;&#x4E49;&#x4E0A;&#x7684;Array,&#x6570;&#x7EC4;&#x662F;&#x4E00;&#x4E32; <strong>&#x8FDE;&#x7EED;</strong> &#x7684;&#x5185;&#x5B58;&#x4F4D;&#x7F6E;&#xFF0C;&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x67D0;&#x4E9B;&#x503C;&#x3002;JavaScript &#x4E2D;&#x7684;&#x6570;&#x7EC4;&#x662F;&#x54C8;&#x5E0C;&#x6620;&#x5C04;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x5982;&#x94FE;&#x8868;,&#x4E0A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5305;&#x542B;&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x5F15;&#x7528;&#x3002;&#x8FD9;&#x6837;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x4E2D;&#x6570;&#x7EC4;&#x7684;&#x53D6;&#x503C;&#x662F;&#x6839;&#x636E;&#x5185;&#x5B58;&#x4F4D;&#x7F6E;&#x8FDB;&#x884C;&#x6570;&#x5B66;&#x8BA1;&#x7B97;&#x5C31;&#x80FD;&#x627E;&#x5230;&#xFF0C;&#x800C;&#x5728;JavaScript&#x4E2D;&#x5C31;&#x9700;&#x8981;&#x904D;&#x5386;&#x94FE;&#x8868;&#x4E4B;&#x7C7B;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x6570;&#x7EC4;&#x8D8A;&#x957F;&#xFF0C;&#x904D;&#x5386;&#x94FE;&#x8868;&#x8DDF;&#x6570;&#x636E;&#x8BA1;&#x7B97;&#x76F8;&#x6BD4;&#x5C31;&#x8D8A;&#x6162;&#x3002;</p><p>&#x73B0;&#x4EE3; JavaScript &#x5F15;&#x64CE;&#x662F;&#x4F1A;&#x7ED9;&#x6570;&#x7EC4;&#x5206;&#x914D;&#x8FDE;&#x7EED;&#x5185;&#x5B58;&#x7684; &#x2014;&#x2014; &#x5982;&#x679C;&#x6570;&#x7EC4;&#x662F;&#x540C;&#x8D28;&#x7684;&#xFF08;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7C7B;&#x578B;&#x76F8;&#x540C;&#xFF09;&#x3002;&#x6240;&#x4EE5;&#x5728;&#x5199;&#x4EE3;&#x7801;&#x65F6;&#x4FDD;&#x8BC1;&#x6570;&#x7EC4;&#x540C;&#x8D28;&#xFF0C;&#x4EE5;&#x4FBF; JIT&#xFF08;&#x5373;&#x65F6;&#x7F16;&#x8BD1;&#x5668;&#xFF09;&#x80FD;&#x591F;&#x4F7F;&#x7528; c &#x7F16;&#x8BD1;&#x5668;&#x5F0F;&#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x6CD5;&#x8BFB;&#x53D6;&#x5143;&#x7D20;&#x662F;&#x4E00;&#x79CD;&#x4F18;&#x96C5;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x4E0D;&#x8FC7;&#xFF0C;&#x4E00;&#x65E6;&#x4F60;&#x60F3;&#x8981;&#x5728;&#x67D0;&#x4E2A;&#x540C;&#x8D28;&#x6570;&#x7EC4;&#x4E2D;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x5143;&#x7D20;&#xFF0C;JIT &#x5C06;&#x89E3;&#x6784;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x6309;&#x7167;&#x65E7;&#x6709;&#x7684;&#x65B9;&#x5F0F;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x3002;</p><p>ES6 &#x589E;&#x52A0;&#x4E86; ArrayBuffer&#xFF0C; &#x63D0;&#x4F9B;&#x4E00;&#x5757;&#x8FDE;&#x7EED;&#x5185;&#x5B58;&#x4F9B;&#x6211;&#x4EEC;&#x968F;&#x610F;&#x64CD;&#x4F5C;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x5185;&#x5B58;&#x8FD8;&#x662F;&#x592A;&#x590D;&#x6742;&#x3001;&#x504F;&#x5E95;&#x5C42;&#x3002;&#x4E8E;&#x662F;&#x4FBF;&#x6709;&#x4E86;&#x5904;&#x7406; ArrayBuffer &#x7684;&#x89C6;&#x56FE;&#xFF08;View&#xFF09;&#x3002;</p><p><code>ArrayBuffer</code> &#x5BF9;&#x8C61;&#x7528;&#x6765;&#x8868;&#x793A;&#x901A;&#x7528;&#x7684;&#x3001;&#x56FA;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x539F;&#x59CB;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x7F13;&#x51B2;&#x533A;&#x3002;ArrayBuffer &#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x662F;&#x8981;&#x901A;&#x8FC7;&#x7C7B;&#x578B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x6216; DataView &#x5BF9;&#x8C61;&#x6765;&#x64CD;&#x4F5C;&#xFF0C;&#x5B83;&#x4EEC;&#x4F1A;&#x5C06;&#x7F13;&#x51B2;&#x533A;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x8868;&#x793A;&#x4E3A;&#x7279;&#x5B9A;&#x7684;&#x683C;&#x5F0F;&#xFF0C;&#x5E76;&#x901A;&#x8FC7;&#x8FD9;&#x4E9B;&#x683C;&#x5F0F;&#x6765;&#x8BFB;&#x5199;&#x7F13;&#x51B2;&#x533A;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8BED;&#x6CD5;: new ArrayBuffer(length)

&#x53C2;&#x6570;
length:&#x8981;&#x521B;&#x5EFA;&#x7684; ArrayBuffer &#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;&#x5B57;&#x8282;&#x3002;

&#x8FD4;&#x56DE;&#x503C;:&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x5927;&#x5C0F;&#x7684; ArrayBuffer &#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x5185;&#x5BB9;&#x88AB;&#x521D;&#x59CB;&#x5316;&#x4E3A; 0&#x3002;

&#x5F02;&#x5E38;:&#x5982;&#x679C; length &#x5927;&#x4E8E; Number.MAX_SAFE_INTEGER&#xFF08;&gt;= 2 ** 53&#xFF09;&#x6216;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x5219;&#x629B;&#x51FA;&#x4E00;&#x4E2A;  RangeError  &#x5F02;&#x5E38;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x8BED;&#x6CD5;: <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(length)

&#x53C2;&#x6570;
length:&#x8981;&#x521B;&#x5EFA;&#x7684; <span class="hljs-built_in">ArrayBuffer</span> &#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;&#x5B57;&#x8282;&#x3002;

&#x8FD4;&#x56DE;&#x503C;:&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x5927;&#x5C0F;&#x7684; <span class="hljs-built_in">ArrayBuffer</span> &#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x5185;&#x5BB9;&#x88AB;&#x521D;&#x59CB;&#x5316;&#x4E3A; <span class="hljs-number">0</span>&#x3002;

&#x5F02;&#x5E38;:&#x5982;&#x679C; length &#x5927;&#x4E8E; <span class="hljs-built_in">Number</span>.MAX_SAFE_INTEGER&#xFF08;&gt;= <span class="hljs-number">2</span> ** <span class="hljs-number">53</span>&#xFF09;&#x6216;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x5219;&#x629B;&#x51FA;&#x4E00;&#x4E2A;  <span class="hljs-built_in">RangeError</span>  &#x5F02;&#x5E38;&#x3002;</code></pre><p><code>&#x7C7B;&#x578B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;</code> &#x4E00;&#x4E2A;TypedArray &#x5BF9;&#x8C61;&#x63CF;&#x8FF0;&#x4E00;&#x4E2A;&#x5E95;&#x5C42;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x7F13;&#x5B58;&#x533A;&#x7684;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;(array-like)&#x89C6;&#x56FE;&#x3002;&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x6CA1;&#x6709;&#x540D;&#x4E3A; TypedArray&#x7684;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;&#x7684; TypedArray&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x76F8;&#x53CD;&#xFF0C;&#x6709;&#x8BB8;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0B;&#x9762;&#x4F1A;&#x5217;&#x51FA;&#x8FD9;&#x4E9B;&#x9488;&#x5BF9;&#x7279;&#x5B9A;&#x5143;&#x7D20;&#x7C7B;&#x578B;&#x7684;&#x7C7B;&#x578B;&#x5316;&#x6570;&#x7EC4;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new TypedArray(); // ES2017&#x4E2D;&#x65B0;&#x589E;
new TypedArray(length);
new TypedArray(typedArray);
new TypedArray(object);
new TypedArray(buffer [, byteOffset [, length]]);

TypedArray()&#x6307;&#x7684;&#x662F;&#x4EE5;&#x4E0B;&#x7684;&#x5176;&#x4E2D;&#x4E4B;&#x4E00;&#xFF1A;

Int8Array();//8&#x4F4D;&#x4E8C;&#x8FDB;&#x5236;&#x5E26;&#x7B26;&#x53F7;&#x6574;&#x6570; -2^7~(2^7) - 1,&#x5927;&#x5C0F;1&#x4E2A;&#x5B57;&#x8282;
Uint8Array();//8&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x6570; 0~(2^8) - 1,&#x5927;&#x5C0F;1&#x4E2A;&#x5B57;&#x8282;
Int16Array();//16&#x4F4D;&#x4E8C;&#x8FDB;&#x5236;&#x5E26;&#x7B26;&#x53F7;&#x6574;&#x6570; -2^15~(2^15)-1,&#x5927;&#x5C0F;2&#x4E2A;&#x5B57;&#x8282;
Uint16Array();//16&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x6570; 0~(2^16) - 1,&#x5927;&#x5C0F;2&#x4E2A;&#x5B57;&#x8282;
Int32Array();//    32&#x4F4D;&#x4E8C;&#x8FDB;&#x5236;&#x5E26;&#x7B26;&#x53F7;&#x6574;&#x6570; -2^31~(2^31)-1,&#x5927;&#x5C0F;4&#x4E2A;&#x5B57;&#x8282;
Uint32Array();//32&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x6570; 0~(2^32) - 1,&#x5927;&#x5C0F;4&#x4E2A;&#x5B57;&#x8282;
Float32Array();//32&#x4F4D;IEEE&#x6D6E;&#x70B9;&#x6570;,&#x5927;&#x5C0F;4&#x4E2A;&#x5B57;&#x8282;
Float64Array(); //64&#x4F4D;IEEE&#x6D6E;&#x70B9;&#x6570;,&#x5927;&#x5C0F;8&#x4E2A;&#x5B57;&#x8282;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code><span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">TypedArray</span>(); <span class="hljs-comment">// ES2017&#x4E2D;&#x65B0;&#x589E;</span>
<span class="hljs-title">new</span> <span class="hljs-title">TypedArray</span>(length);
<span class="hljs-title">new</span> <span class="hljs-title">TypedArray</span>(typedArray);
<span class="hljs-title">new</span> <span class="hljs-title">TypedArray</span>(object);
<span class="hljs-title">new</span> <span class="hljs-title">TypedArray</span>(buffer [, byteOffset [, length]]);

<span class="hljs-title">TypedArray</span>()&#x6307;&#x7684;&#x662F;&#x4EE5;&#x4E0B;&#x7684;&#x5176;&#x4E2D;&#x4E4B;&#x4E00;&#xFF1A;

<span class="hljs-title">Int8Array</span>();<span class="hljs-comment">//8&#x4F4D;&#x4E8C;&#x8FDB;&#x5236;&#x5E26;&#x7B26;&#x53F7;&#x6574;&#x6570; -2^7~(2^7) - 1,&#x5927;&#x5C0F;1&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Uint8Array</span>();<span class="hljs-comment">//8&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x6570; 0~(2^8) - 1,&#x5927;&#x5C0F;1&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Int16Array</span>();<span class="hljs-comment">//16&#x4F4D;&#x4E8C;&#x8FDB;&#x5236;&#x5E26;&#x7B26;&#x53F7;&#x6574;&#x6570; -2^15~(2^15)-1,&#x5927;&#x5C0F;2&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Uint16Array</span>();<span class="hljs-comment">//16&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x6570; 0~(2^16) - 1,&#x5927;&#x5C0F;2&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Int32Array</span>();<span class="hljs-comment">//    32&#x4F4D;&#x4E8C;&#x8FDB;&#x5236;&#x5E26;&#x7B26;&#x53F7;&#x6574;&#x6570; -2^31~(2^31)-1,&#x5927;&#x5C0F;4&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Uint32Array</span>();<span class="hljs-comment">//32&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x6570; 0~(2^32) - 1,&#x5927;&#x5C0F;4&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Float32Array</span>();<span class="hljs-comment">//32&#x4F4D;IEEE&#x6D6E;&#x70B9;&#x6570;,&#x5927;&#x5C0F;4&#x4E2A;&#x5B57;&#x8282;</span>
<span class="hljs-title">Float64Array</span>(); <span class="hljs-comment">//64&#x4F4D;IEEE&#x6D6E;&#x70B9;&#x6570;,&#x5927;&#x5C0F;8&#x4E2A;&#x5B57;&#x8282;</span></span></code></pre><p>&#x5E94;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var buffer = new ArrayBuffer(8);
var view   = new Int32Array(buffer);
view[0] = 100;
console.log(view)// [100,0],&#x4E00;&#x4E2A;&#x516B;&#x4E2A;&#x5B57;&#x8282;&#xFF0C;Int32Array&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5927;&#x5C0F;&#x662F;4&#x4E2A;&#x5B57;&#x8282;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x80FD;&#x653E;&#x4E0B;&#x4E24;&#x4E2A;&#x5143;&#x7D20;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> buffer = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">8</span>);
<span class="hljs-keyword">var</span> view   = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Int32Array</span>(buffer);
view[<span class="hljs-number">0</span>] = <span class="hljs-number">100</span>;
<span class="hljs-built_in">console</span>.log(view)<span class="hljs-comment">// [100,0],&#x4E00;&#x4E2A;&#x516B;&#x4E2A;&#x5B57;&#x8282;&#xFF0C;Int32Array&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5927;&#x5C0F;&#x662F;4&#x4E2A;&#x5B57;&#x8282;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x80FD;&#x653E;&#x4E0B;&#x4E24;&#x4E2A;&#x5143;&#x7D20;</span></code></pre><h3 id="articleHeader10">&#x53C2;&#x8003;&#x548C;&#x94FE;&#x63A5;</h3><ol><li>&#x300A;JavaScript&#x6743;&#x5A01;&#x6307;&#x5357;&#x300B;&#x6570;&#x7EC4;&#x90E8;&#x5206;</li><li><a href="http://louiszhai.github.io/2015/12/18/traverse/" rel="nofollow noreferrer" target="_blank">&#x8BE6;&#x89E3;JS&#x904D;&#x5386;</a></li><li><a href="https://segmentfault.com/a/1190000012463583">&#x7ED9;&#x521D;&#x5B66;&#x8005;&#xFF1A;JavaScript &#x4E2D;&#x6570;&#x7EC4;&#x64CD;&#x4F5C;&#x6CE8;&#x610F;&#x70B9;</a></li><li><a href="https://hufangyun.com/2017/array-learn/" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x6B21;&#x638C;&#x63E1; JavaScript ES5 &#x5230; ES8 &#x6570;&#x7EC4;&#x5185;&#x5BB9;</a></li><li><a href="https://juejin.im/post/5b0903b26fb9a07a9d70c7e0" rel="nofollow noreferrer" target="_blank">&#x3010;&#x5E72;&#x8D27;&#x3011;js &#x6570;&#x7EC4;&#x8BE6;&#x7EC6;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x53CA;&#x89E3;&#x6790;&#x5408;&#x96C6;</a></li><li><a href="http://www.wemlion.com/post/javascript-array-evolution-performance/" rel="nofollow noreferrer" target="_blank">&#x3010;&#x8BD1;&#x3011;&#x6DF1;&#x5165; JavaScript &#x6570;&#x7EC4;&#xFF1A;&#x8FDB;&#x5316;&#x4E0E;&#x6027;&#x80FD;</a></li></ol><h2 id="articleHeader11">&#x5F69;&#x86CB;</h2><h4>&#x5F69;&#x86CB;&#x5C31;&#x662F;&#x5173;&#x6CE8;&#x5947;&#x821E;&#x5468;&#x520A;&#x554A;&#xFF0C;&#x6587;&#x7AE0;&#x5199;&#x5F97;&#x597D;&#xFF0C;&#x60F3;&#x8BA9;&#x66F4;&#x591A;&#x4EBA;&#x770B;&#x5230;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x53EF;&#x4EE5;&#x627E;&#x6211;&#x6295;&#x7A3F;&#x554A;&#x3002;</h4><p><span class="img-wrap"><img data-src="/img/bVbeYst?w=600&amp;h=207" src="https://static.alili.tech/img/bVbeYst?w=600&amp;h=207" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数组的十八般武艺

## 原文链接
[https://segmentfault.com/a/1190000015908109](https://segmentfault.com/a/1190000015908109)


---
title: 'JavaScript数据结构01 - 数组' 
date: 2018-11-21 2:30:10
hidden: true
slug: g1l1a5qkvnr
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x521B;&#x5EFA;&#x6570;&#x7EC4;</h2><h4>1.1 &#x4F7F;&#x7528;Array&#x6784;&#x9020;&#x51FD;&#x6570;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = new Array(); // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;
var arr2 = new Array(10);   // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;20&#x9879;&#x7684;&#x6570;&#x7EC4;
var arr3 = new Array(&apos;liu&apos;, &apos;wang&apos;, &apos;li&apos;);  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;3&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6570;&#x7EC4;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(); <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> arr2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-number">10</span>);   <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;20&#x9879;&#x7684;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> arr3 = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-string">&apos;liu&apos;</span>, <span class="hljs-string">&apos;wang&apos;</span>, <span class="hljs-string">&apos;li&apos;</span>);  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;3&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6570;&#x7EC4;</span></code></pre><h4>1.2 &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x5B57;&#x9762;&#x91CF;&#x8868;&#x793A;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [];  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;
var arr2 = [10];    // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;1&#x9879;&#x7684;&#x6570;&#x7EC4;
var arr3 = [&apos;liu&apos;, &apos;wang&apos;, &apos;li&apos;];   // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;3&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6570;&#x7EC4;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> arr1 = [];  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> arr2 = [<span class="hljs-number">10</span>];    <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;1&#x9879;&#x7684;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> arr3 = [<span class="hljs-string">&apos;liu&apos;</span>, <span class="hljs-string">&apos;wang&apos;</span>, <span class="hljs-string">&apos;li&apos;</span>];   <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5305;&#x542B;3&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6570;&#x7EC4;</span></code></pre><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x5E38;&#x7528;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;</h2><table><thead><tr><th>&#x65B9;&#x6CD5;&#x540D;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>join</td><td>&#x628A;&#x6570;&#x7EC4;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x653E;&#x5165;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5143;&#x7D20;&#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x7684;&#x5206;&#x9694;&#x7B26;&#x8FDB;&#x884C;&#x5206;&#x9694;</td></tr><tr><td>pop</td><td>&#x5220;&#x9664;&#x5E76;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</td></tr><tr><td>push</td><td>&#x5411;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x66F4;&#x591A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;</td></tr><tr><td>shift</td><td>&#x5220;&#x9664;&#x5E76;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</td></tr><tr><td>unshift</td><td>&#x5411;&#x6570;&#x7EC4;&#x7684;&#x5F00;&#x5934;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x66F4;&#x591A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;</td></tr><tr><td>slice</td><td>&#x4ECE;&#x67D0;&#x4E2A;&#x5DF2;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;</td></tr><tr><td>indexOf</td><td>&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x4E0E;&#x7ED9;&#x5B9A;&#x53C2;&#x6570;&#x76F8;&#x7B49;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5219;&#x8FD4;&#x56DE;-1</td></tr><tr><td>lastIndexOf</td><td>&#x8FD4;&#x56DE;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x641C;&#x7D22;&#x5230;&#x7684;&#x4E0E;&#x7ED9;&#x5B9A;&#x53C2;&#x6570;&#x76F8;&#x7B49;&#x7684;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x91CC;&#x7684;&#x6700;&#x5927;&#x7684;&#x503C;&#xFF0C;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5219;&#x8FD4;&#x56DE;-1</td></tr><tr><td>sort</td><td>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6392;&#x5E8F;</td></tr><tr><td>splice</td><td>&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x5411;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;</td></tr><tr><td>toString</td><td>&#x628A;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</td></tr><tr><td>toLocaleString</td><td>&#x628A;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x672C;&#x5730;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</td></tr><tr><td>valueOf</td><td>&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x59CB;&#x503C;</td></tr><tr><td>forEach</td><td>&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x8FD0;&#x884C;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;</td></tr><tr><td>concat</td><td>&#x8FDE;&#x63A5;2&#x4E2A;&#x6216;&#x66F4;&#x591A;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</td></tr><tr><td>every</td><td>&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x8FD0;&#x884C;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x51FD;&#x6570;&#x5BF9;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x8FD4;&#x56DE;true&#xFF0C;&#x5219;&#x8FD4;&#x56DE;true</td></tr><tr><td>some</td><td>&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x8FD0;&#x884C;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x4EFB;&#x4E00;&#x9879;&#x8FD4;&#x56DE;true&#xFF0C;&#x5219;&#x8FD4;&#x56DE;true</td></tr><tr><td>filter</td><td>&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x8FD0;&#x884C;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x8BE5;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE;true&#x7684;&#x9879;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;</td></tr><tr><td>reverse</td><td>&#x98A0;&#x5012;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;</td></tr><tr><td>map</td><td>&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x8FD0;&#x884C;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x6BCF;&#x6B21;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;&#x7ED3;&#x679C;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;</td></tr><tr><td>reduce</td><td>&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x7D2F;&#x52A0;&#x5668;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x503C;&#xFF08;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF09;&#x5F00;&#x59CB;&#x7F29;&#x51CF;&#xFF0C;&#x6700;&#x7EC8;&#x8BA1;&#x7B97;&#x4E3A;&#x4E00;&#x4E2A;&#x503C;</td></tr><tr><td>reduceRight</td><td>&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x7D2F;&#x52A0;&#x5668;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x503C;&#xFF08;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#xFF09;&#x5F00;&#x59CB;&#x7F29;&#x51CF;&#xFF0C;&#x6700;&#x7EC8;&#x8BA1;&#x7B97;&#x4E3A;&#x4E00;&#x4E2A;&#x503C;</td></tr></tbody></table><p><strong>PS&#xFF1A;&#x539F;&#x59CB;&#x503C;&#x662F;&#x6307;&#x56FA;&#x5B9A;&#x800C;&#x7B80;&#x5355;&#x7684;&#x503C;&#xFF0C;&#x5B58;&#x653E;&#x5728;&#x6808;&#x4E2D;&#x7684;&#x7B80;&#x5355;&#x6570;&#x636E;&#x6BB5;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x503C;&#x76F4;&#x63A5;&#x5B58;&#x50A8;&#x5728;&#x53D8;&#x91CF;&#x8BBF;&#x95EE;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</strong></p><p>JavaScript&#x4E2D;&#x6709;&#x4E94;&#x79CD;&#x539F;&#x59CB;&#x7C7B;&#x578B;&#xFF0C;&#x4E5F;&#x53EB;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#xFF1A;<br><br><strong>Number&#x3001;String&#x3001;Boolean&#x3001;Undefined&#x3001;Null</strong></p><h2 id="articleHeader2">&#x4E09;&#x3001;&#x6F14;&#x793A;&#x5B9E;&#x4F8B;</h2><h4>3.1 join</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>join()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x653E;&#x5165;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;<br><br>&#x5143;&#x7D20;&#x662F;&#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x7684;&#x5206;&#x9694;&#x7B26;&#x8FDB;&#x884C;&#x5206;&#x9694;&#x7684;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.join(separator)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>seperator</td><td>&#x53EF;&#x9009;&#x3002;&#x6307;&#x5B9A;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x5982;&#x679C;&#x7701;&#x7565;&#x8BE5;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x4F7F;&#x7528;&#x9017;&#x53F7;&#x4F5C;&#x4E3A;&#x5206;&#x9694;&#x7B26;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x901A;&#x8FC7;&#x628A; arrayObject &#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x4E32;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#xFF0C;&#x5728;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x63D2;&#x5165; separator &#x5B57;&#x7B26;&#x4E32;&#x800C;&#x751F;&#x6210;&#x7684;&#x3002;<br></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

var str1 = arr.join();
var str2 = arr.join(&apos;&apos;);
var str3 = arr.join(&apos; &apos;);
var str4 = arr.join(&apos;-&apos;);

console.log(str1);  // &quot;Geroge,John,Thomas&quot;
console.log(str2);  // &quot;GerogeJohnThomas&quot;
console.log(str3);  // &quot;Geroge John Thomas&quot;
console.log(str4);  // &quot;Geroge-John-Thomas&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

<span class="hljs-keyword">var</span> str1 = arr.join();
<span class="hljs-keyword">var</span> str2 = arr.join(<span class="hljs-string">&apos;&apos;</span>);
<span class="hljs-keyword">var</span> str3 = arr.join(<span class="hljs-string">&apos; &apos;</span>);
<span class="hljs-keyword">var</span> str4 = arr.join(<span class="hljs-string">&apos;-&apos;</span>);

<span class="hljs-built_in">console</span>.log(str1);  <span class="hljs-comment">// &quot;Geroge,John,Thomas&quot;</span>
<span class="hljs-built_in">console</span>.log(str2);  <span class="hljs-comment">// &quot;GerogeJohnThomas&quot;</span>
<span class="hljs-built_in">console</span>.log(str3);  <span class="hljs-comment">// &quot;Geroge John Thomas&quot;</span>
<span class="hljs-built_in">console</span>.log(str4);  <span class="hljs-comment">// &quot;Geroge-John-Thomas&quot;</span></code></pre><h4>3.2 pop</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>pop()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5220;&#x9664;&#x5E76;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.pop()</blockquote><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>arrayObject &#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;<br></p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>pop() &#x65B9;&#x6CD5;&#x5C06;&#x5220;&#x9664; arrayObject &#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x628A;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x51CF; 1&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x5B83;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x5DF2;&#x7ECF;&#x4E3A;&#x7A7A;&#xFF0C;&#x5219; pop() &#x4E0D;&#x6539;&#x53D8;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE; undefined &#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

console.log(arr);           // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.pop());     // &quot;Thomas&quot;
console.log(arr);           // [&quot;Geroge&quot;, &quot;Thomas&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = <span class="hljs-built_in">new</span> Array(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

console.<span class="hljs-built_in">log</span>(arr);           // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">pop</span>());     // <span class="hljs-string">&quot;Thomas&quot;</span>
console.<span class="hljs-built_in">log</span>(arr);           // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]</code></pre><h4>3.3 push</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>push()&#x65B9;&#x6CD5;&#x53EF;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.push(newElement1, newElement2, ..., newElementX)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>newElement1</td><td>&#x5FC5;&#x9700;&#x3002;&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</td></tr><tr><td>newElement2</td><td>&#x53EF;&#x9009;&#x3002;&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;</td></tr><tr><td>newElementX</td><td>&#x53EF;&#x9009;&#x3002;&#x53EF;&#x6DFB;&#x52A0;&#x591A;&#x4E2A;&#x5143;&#x7D20;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>&#x628A;&#x6307;&#x5B9A;&#x7684;&#x503C;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x540E;&#x7684;&#x65B0;&#x957F;&#x5EA6;&#x3002;<br></p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>push() &#x65B9;&#x6CD5;&#x53EF;&#x628A;&#x5B83;&#x7684;&#x53C2;&#x6570;&#x987A;&#x5E8F;&#x6DFB;&#x52A0;&#x5230; arrayObject &#x7684;&#x5C3E;&#x90E8;&#x3002;&#x5B83;&#x76F4;&#x63A5;&#x4FEE;&#x6539; arrayObject&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x3002;push() &#x65B9;&#x6CD5;&#x548C; pop() &#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x63D0;&#x4F9B;&#x7684;&#x5148;&#x8FDB;&#x540E;&#x51FA;&#x6808;&#x7684;&#x529F;&#x80FD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

console.log(arr);                           // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.push(&quot;James&quot;));             // 4
console.log(arr);                           // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;]
console.log(arr.push(&quot;Peter&quot;, &quot;Sara&quot;));     // 6
console.log(arr);                           // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Peter&quot;, &quot;Sara&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = <span class="hljs-built_in">new</span> Array(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

console.<span class="hljs-built_in">log</span>(arr);                           // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">push</span>(<span class="hljs-string">&quot;James&quot;</span>));             // <span class="hljs-number">4</span>
console.<span class="hljs-built_in">log</span>(arr);                           // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">push</span>(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;Sara&quot;</span>));     // <span class="hljs-number">6</span>
console.<span class="hljs-built_in">log</span>(arr);                           // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;Sara&quot;</span>]</code></pre><h4>3.4 shift</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>shift()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4ECE;&#x5176;&#x4E2D;&#x5220;&#x9664;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.shift()</blockquote><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>&#x6570;&#x7EC4;&#x539F;&#x6765;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;<br></p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x662F;&#x7A7A;&#x7684;&#xFF0C;&#x90A3;&#x4E48; shift() &#x65B9;&#x6CD5;&#x5C06;&#x4E0D;&#x8FDB;&#x884C;&#x4EFB;&#x4F55;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD4;&#x56DE; undefined &#x503C;&#x3002;&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x521B;&#x5EFA;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x539F;&#x6709;&#x7684; arrayObject&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

console.log(arr);           // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.shift());   // &quot;Geroge&quot;
console.log(arr);           // [&quot;John&quot;, &quot;Thomas&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = <span class="hljs-built_in">new</span> Array(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

console.<span class="hljs-built_in">log</span>(arr);           // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.shift());   // <span class="hljs-string">&quot;Geroge&quot;</span>
console.<span class="hljs-built_in">log</span>(arr);           // [<span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]</code></pre><h4>3.5 unshift</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>unshift()&#x65B9;&#x6CD5;&#x53EF;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x5F00;&#x5934;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.unshift(newElement1, newElement2, ..., newElementX)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>newElement1</td><td>&#x5FC5;&#x9700;&#x3002;&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x5F00;&#x5934;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</td></tr><tr><td>newElement2</td><td>&#x53EF;&#x9009;&#x3002;&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x5F00;&#x5934;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;</td></tr><tr><td>newElementX</td><td>&#x53EF;&#x9009;&#x3002;&#x53EF;&#x6DFB;&#x52A0;&#x591A;&#x4E2A;&#x5143;&#x7D20;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>arrayObject &#x7684;&#x65B0;&#x957F;&#x5EA6;&#x3002;<br></p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>unshift() &#x65B9;&#x6CD5;&#x5C06;&#x628A;&#x5B83;&#x7684;&#x53C2;&#x6570;&#x63D2;&#x5165; arrayObject &#x7684;&#x5934;&#x90E8;&#xFF0C;&#x5E76;&#x5C06;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x5143;&#x7D20;&#x987A;&#x6B21;&#x5730;&#x79FB;&#x5230;&#x8F83;&#x9AD8;&#x7684;&#x4E0B;&#x6807;&#x5904;&#xFF0C;&#x4EE5;&#x4FBF;&#x7559;&#x51FA;&#x7A7A;&#x95F4;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5C06;&#x6210;&#x4E3A;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20; 0&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5B83;&#x5C06;&#x6210;&#x4E3A;&#x65B0;&#x7684;&#x5143;&#x7D20; 1&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;</p><p>&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;unshift() &#x65B9;&#x6CD5;&#x4E0D;&#x521B;&#x5EFA;&#x65B0;&#x7684;&#x521B;&#x5EFA;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x539F;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

console.log(arr);                               // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.unshift(&quot;James&quot;));              // 4
console.log(arr);                               // [&quot;James&quot;, &quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.unshift(&quot;Peter&quot;, &quot;Sara&quot;));      // 6
console.log(arr);                               // [&quot;Peter&quot;, &quot;Sara&quot;, &quot;James&quot;, &quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = <span class="hljs-built_in">new</span> Array(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

console.<span class="hljs-built_in">log</span>(arr);                               // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.unshift(<span class="hljs-string">&quot;James&quot;</span>));              // <span class="hljs-number">4</span>
console.<span class="hljs-built_in">log</span>(arr);                               // [<span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.unshift(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;Sara&quot;</span>));      // <span class="hljs-number">6</span>
console.<span class="hljs-built_in">log</span>(arr);                               // [<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;Sara&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]</code></pre><h4>3.6 slice</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>slice()&#x65B9;&#x6CD5;&#x53EF;&#x4ECE;&#x5DF2;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x8FD4;&#x56DE;&#x9009;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x3002;slice()&#x65B9;&#x6CD5;&#x4E0D;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.slice(start, end)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>start</td><td>&#x5FC5;&#x9700;&#x3002;&#x89C4;&#x5B9A;&#x4ECE;&#x4F55;&#x5904;&#x5F00;&#x59CB;&#x9009;&#x53D6;&#x3002;<br>&#x5982;&#x679C;&#x662F;&#x8D1F;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x89C4;&#x5B9A;&#x4ECE;&#x6570;&#x7EC4;&#x5C3E;&#x90E8;&#x5F00;&#x59CB;&#x7B97;&#x8D77;&#x7684;&#x4F4D;&#x7F6E;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;-1&#x6307;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;-2&#x6307;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;</td></tr><tr><td>end</td><td>&#x53EF;&#x9009;&#x3002;&#x89C4;&#x5B9A;&#x4ECE;&#x4F55;&#x5904;&#x7ED3;&#x675F;&#x9009;&#x53D6;&#x3002;<br>&#x8BE5;&#x53C2;&#x6570;&#x662F;&#x6570;&#x7EC4;&#x7247;&#x65AD;&#x7ED3;&#x675F;&#x5904;&#x7684;&#x6570;&#x7EC4;&#x4E0B;&#x6807;&#x3002;<br>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6307;&#x5B9A;&#x8BE5;&#x53C2;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5207;&#x5206;&#x7684;&#x6570;&#x7EC4;&#x5305;&#x542B;&#x4ECE;start&#x5230;&#x6570;&#x7EC4;&#x7ED3;&#x675F;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;<br>&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8D1F;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x89C4;&#x5B9A;&#x7684;&#x662F;&#x4ECE;&#x6570;&#x7EC4;&#x5C3E;&#x90E8;&#x5F00;&#x59CB;&#x7B97;&#x8D77;&#x7684;&#x5143;&#x7D20;&#x3002;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5305;&#x542B;&#x4ECE; start &#x5230; end &#xFF08;&#x4E0D;&#x5305;&#x62EC;&#x8BE5;&#x5143;&#x7D20;&#xFF09;&#x7684; arrayObject &#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;<br></p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x5E76;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B50;&#x6570;&#x7EC4;&#x3002;&#x5982;&#x679C;&#x60F3;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4E00;&#x6BB5;&#x5143;&#x7D20;&#xFF0C;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x65B9;&#x6CD5; Array.splice()&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(6);
arr[0] = &quot;George&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = &quot;James&quot;;
arr[4] = &quot;Adrew&quot;;
arr[5] = &quot;Martin&quot;;

console.log(arr);                   // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]
console.log(arr.slice(0));          // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]
console.log(arr.slice(1));          // [&quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]
console.log(arr.slice(1, 3));       // [&quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.slice(1, -2));      // [&quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;]
console.log(arr.slice(-1, -2));     // []
console.log(arr.slice(-2, -1));     // [&quot;Adrew&quot;]
console.log(arr);                   // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>var arr = new <span class="hljs-symbol">Array</span>(<span class="hljs-number">6</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;George&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">&quot;James&quot;</span>;
arr[<span class="hljs-number">4</span>] = <span class="hljs-string">&quot;Adrew&quot;</span>;
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">&quot;Martin&quot;</span>;

console.log(arr);                   // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]
console.log(arr.slice(<span class="hljs-number">0</span>));          // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]
console.log(arr.slice(<span class="hljs-number">1</span>));          // [<span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]
console.log(arr.slice(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>));       // [<span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.log(arr.slice(<span class="hljs-number">1</span>, <span class="hljs-number">-2</span>));      // [<span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>]
console.log(arr.slice(<span class="hljs-number">-1</span>, <span class="hljs-number">-2</span>));     // []
console.log(arr.slice(<span class="hljs-number">-2</span>, <span class="hljs-number">-1</span>));     // [<span class="hljs-string">&quot;Adrew&quot;</span>]
console.log(arr);                   // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]</code></pre><h4>3.7 indexOf</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>indexOf()&#x65B9;&#x6CD5;&#x53EF;&#x8FD4;&#x56DE;&#x67D0;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x9996;&#x6B21;&#x51FA;&#x73B0;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x4ECE;&#x5DE6;&#x5F80;&#x53F3;&#x627E;&#xFF0C;&#x627E;&#x4E0D;&#x5230;&#x8FD4;&#x56DE;-1&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.indexOf(searchValue, fromIndex)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>searchValue</td><td>&#x5FC5;&#x9700;&#x3002;&#x89C4;&#x5B9A;&#x9700;&#x68C0;&#x7D22;&#x7684;&#x503C;&#x3002;</td></tr><tr><td>fromIndex</td><td>&#x53EF;&#x9009;&#x7684;&#x6574;&#x6570;&#x53C2;&#x6570;&#xFF0C;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#x7684;&#x4F4D;&#x7F6E;&#x3002;<br>&#x5982;&#x679C;&#x8BE5;&#x7D22;&#x5F15;&#x503C;&#x5927;&#x4E8E;&#x6216;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x4E0D;&#x4F1A;&#x5728;&#x6570;&#x7EC4;&#x91CC;&#x67E5;&#x627E;&#xFF0C;&#x8FD4;&#x56DE;-1&#x3002;<br>&#x5982;&#x679C;&#x53C2;&#x6570;&#x4E2D;&#x63D0;&#x4F9B;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x8D1F;&#x503C;&#xFF0C;&#x5219;&#x5C06;&#x5176;&#x4F5C;&#x4E3A;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x7684;&#x4E00;&#x4E2A;&#x62B5;&#x6D88;&#xFF0C;<br>&#x5373;-1&#x8868;&#x793A;&#x4ECE;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#xFF0C;-2&#x8868;&#x793A;&#x4ECE;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x67E5;&#x627E; &#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;&#x53C2;&#x6570;&#x4E2D;&#x63D0;&#x4F9B;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x8D1F;&#x503C;&#xFF0C;&#x5E76;&#x4E0D;&#x6539;&#x53D8;&#x5176;&#x67E5;&#x627E;&#x987A;&#x5E8F;&#xFF0C;<br>&#x67E5;&#x627E;&#x987A;&#x5E8F;&#x4ECD;&#x7136;&#x662F;&#x4ECE;&#x524D;&#x5411;&#x540E;&#x67E5;&#x8BE2;&#x6570;&#x7EC4;&#x3002;&#x5982;&#x679C;&#x62B5;&#x6D88;&#x540E;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x4ECD;&#x5C0F;&#x4E8E;0&#xFF0C;<br>&#x5219;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x90FD;&#x5C06;&#x4F1A;&#x88AB;&#x67E5;&#x8BE2;&#x3002;&#x5176;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0</td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(6);
arr[0] = &quot;George&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = &quot;James&quot;;
arr[4] = &quot;Adrew&quot;;
arr[5] = &quot;Martin&quot;;

console.log(arr.indexOf(&apos;Thomas&apos;));             // 2
console.log(arr.indexOf(&apos;Thomas&apos;, 2));          // 2
console.log(arr.indexOf(&apos;Thomas&apos;, 3));          // -1
console.log(arr.indexOf(&apos;Thomas&apos;, -4));         // 2
console.log(arr.indexOf(&apos;Thomas&apos;, -3));         // -1
console.log(arr.indexOf(&apos;Peter&apos;));              // -1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">6</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;George&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">&quot;James&quot;</span>;
arr[<span class="hljs-number">4</span>] = <span class="hljs-string">&quot;Adrew&quot;</span>;
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">&quot;Martin&quot;</span>;

<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">&apos;Thomas&apos;</span>));             <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">2</span>));          <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">3</span>));          <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">-4</span>));         <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">-3</span>));         <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">&apos;Peter&apos;</span>));              <span class="hljs-comment">// -1</span></code></pre><h4>3.8 lastIndexOf</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>lastIndexOf()&#x65B9;&#x6CD5;&#x53EF;&#x8FD4;&#x56DE;&#x67D0;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x9996;&#x6B21;&#x51FA;&#x73B0;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x4ECE;&#x53F3;&#x5F80;&#x5DE6;&#x627E;&#xFF0C;&#x627E;&#x4E0D;&#x5230;&#x8FD4;&#x56DE;-1&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.indexOf(searchValue, fromIndex)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>searchValue</td><td>&#x5FC5;&#x9700;&#x3002;&#x89C4;&#x5B9A;&#x9700;&#x68C0;&#x7D22;&#x7684;&#x503C;&#x3002;</td></tr><tr><td>fromIndex</td><td>&#x53EF;&#x9009;&#x7684;&#x6574;&#x6570;&#x53C2;&#x6570;&#xFF0C;&#x4ECE;&#x6B64;&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x9006;&#x5411;&#x67E5;&#x627E;&#x3002;<br>&#x9ED8;&#x8BA4;&#x4E3A;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#x51CF; 1&#xFF0C;&#x5373;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x90FD;&#x88AB;&#x67E5;&#x627E;&#x3002;<br>&#x5982;&#x679C;&#x8BE5;&#x503C;&#x5927;&#x4E8E;&#x6216;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x4F1A;&#x88AB;&#x67E5;&#x627E;&#x3002;<br>&#x5982;&#x679C;&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x5C06;&#x5176;&#x89C6;&#x4E3A;&#x4ECE;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x5411;&#x524D;&#x7684;&#x504F;&#x79FB;&#x3002;<br>&#x5373;&#x4F7F;&#x8BE5;&#x503C;&#x4E3A;&#x8D1F;&#xFF0C;&#x6570;&#x7EC4;&#x4ECD;&#x7136;&#x4F1A;&#x88AB;&#x4ECE;&#x540E;&#x5411;&#x524D;&#x67E5;&#x627E;&#x3002;<br>&#x5982;&#x679C;&#x8BE5;&#x503C;&#x4E3A;&#x8D1F;&#x65F6;&#xFF0C;&#x5176;&#x7EDD;&#x5BF9;&#x503C;&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE; -1&#xFF0C;&#x5373;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x67E5;&#x627E;</td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(6);
arr[0] = &quot;George&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = &quot;James&quot;;
arr[4] = &quot;Adrew&quot;;
arr[5] = &quot;Martin&quot;;

console.log(arr.lastIndexOf(&apos;Thomas&apos;));             // 2
console.log(arr.lastIndexOf(&apos;Thomas&apos;, 2));          // 2
console.log(arr.lastIndexOf(&apos;Thomas&apos;, 3));          // 2
console.log(arr.lastIndexOf(&apos;Thomas&apos;, 1));          // -1
console.log(arr.lastIndexOf(&apos;Thomas&apos;, -4));         // 2
console.log(arr.lastIndexOf(&apos;Thomas&apos;, -3));         // 2
console.log(arr.lastIndexOf(&apos;Peter&apos;));              // -1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">6</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;George&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">&quot;James&quot;</span>;
arr[<span class="hljs-number">4</span>] = <span class="hljs-string">&quot;Adrew&quot;</span>;
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">&quot;Martin&quot;</span>;

<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Thomas&apos;</span>));             <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">2</span>));          <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">3</span>));          <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">1</span>));          <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">-4</span>));         <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Thomas&apos;</span>, <span class="hljs-number">-3</span>));         <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">&apos;Peter&apos;</span>));              <span class="hljs-comment">// -1</span></code></pre><h4>3.9 sort</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>sort()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.sort(sortby)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>sortby</td><td>&#x53EF;&#x9009;&#x3002;&#x89C4;&#x5B9A;&#x6392;&#x5E8F;&#x987A;&#x5E8F;&#x3002;&#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;&#x3002;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x5F15;&#x7528;&#x3002;&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x6570;&#x7EC4;&#x5728;&#x539F;&#x6570;&#x7EC4;&#x4E0A;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x4E0D;&#x751F;&#x6210;&#x526F;&#x672C;&#x3002;<br></p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x5982;&#x679C;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#x65F6;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x53C2;&#x6570;&#xFF0C;&#x5C06;&#x6309;&#x5B57;&#x6BCD;&#x987A;&#x5E8F;&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x8BF4;&#x7684;&#x66F4;&#x7CBE;&#x786E;&#x70B9;&#xFF0C;&#x662F;&#x6309;&#x7167;&#x5B57;&#x7B26;&#x7F16;&#x7801;&#x7684;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#x3002;&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x4E00;&#x70B9;&#xFF0C;&#x9996;&#x5148;&#x5E94;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x5982;&#x6709;&#x5FC5;&#x8981;&#xFF09;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x6BD4;&#x8F83;&#x3002;</p><p>&#x5982;&#x679C;&#x60F3;&#x6309;&#x7167;&#x5176;&#x4ED6;&#x6807;&#x51C6;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x8981;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x8BF4;&#x660E;&#x8FD9;&#x4E24;&#x4E2A;&#x503C;&#x7684;&#x76F8;&#x5BF9;&#x987A;&#x5E8F;&#x7684;&#x6570;&#x5B57;&#x3002;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x5177;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;a&#x548C;b&#xFF0C;&#x5176;&#x8FD4;&#x56DE;&#x503C;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x82E5;a&#x5C0F;&#x4E8E;b&#xFF0C;&#x5728;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x6570;&#x7EC4;&#x4E2D;a&#x5E94;&#x8BE5;&#x51FA;&#x73B0;&#x5728;b&#x4E4B;&#x524D;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5C0F;&#x4E8E;0&#x7684;&#x503C;&#x3002;</li><li>&#x82E5;a&#x7B49;&#x4E8E;b&#xFF0C;&#x5219;&#x8FD4;&#x56DE;0&#x3002;</li><li>&#x82E5;a&#x5927;&#x4E8E;b&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;0&#x7684;&#x503C;&#x3002;</li></ul><p>&#x5373;&#x987A;&#x5E8F; return a - b; &#x5012;&#x5E8F; return b - a;</p><p>a&#x5728;b&#x524D;&#x8FD4;&#x56DE;&#x8D1F;&#x6570;&#xFF0C;a&#x5728;b&#x540E;&#x8FD4;&#x56DE;&#x6B63;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(6);
arr[0] = &quot;10&quot;;
arr[1] = &quot;5&quot;;
arr[2] = &quot;40&quot;;
arr[3] = &quot;25&quot;;
arr[4] = &quot;1000&quot;;
arr[5] = &quot;1&quot;;

console.log(arr);           // [&quot;10&quot;, &quot;5&quot;, &quot;40&quot;, &quot;25&quot;, &quot;1000&quot;, &quot;1&quot;]
console.log(arr.sort());    // [&quot;1&quot;, &quot;10&quot;, &quot;1000&quot;, &quot;25&quot;, &quot;40&quot;, &quot;5&quot;]
console.log(arr);           // [&quot;1&quot;, &quot;10&quot;, &quot;1000&quot;, &quot;25&quot;, &quot;40&quot;, &quot;5&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>var arr = new <span class="hljs-symbol">Array</span>(<span class="hljs-number">6</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;10&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;5&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;40&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">&quot;25&quot;</span>;
arr[<span class="hljs-number">4</span>] = <span class="hljs-string">&quot;1000&quot;</span>;
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">&quot;1&quot;</span>;

console.log(arr);           // [<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-string">&quot;1&quot;</span>]
console.log(arr.sort());    // [<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>]
console.log(arr);           // [<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>]</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(6);
arr[0] = &quot;10&quot;;
arr[1] = &quot;5&quot;;
arr[2] = &quot;40&quot;;
arr[3] = &quot;25&quot;;
arr[4] = &quot;1000&quot;;
arr[5] = &quot;1&quot;;

function orderNumber (a, b) {
    return a - b;
}

function descOrderNumber (a, b) {
    return b - a;
}

console.log(arr);                           // [&quot;10&quot;, &quot;5&quot;, &quot;40&quot;, &quot;25&quot;, &quot;1000&quot;, &quot;1&quot;]
console.log(arr.sort(orderNumber));         // [&quot;1&quot;, &quot;5&quot;, &quot;10&quot;, &quot;25&quot;, &quot;40&quot;, &quot;1000&quot;]
console.log(arr.sort(descOrderNumber));     // [&quot;1000&quot;, &quot;40&quot;, &quot;25&quot;, &quot;10&quot;, &quot;5&quot;, &quot;1&quot;]
console.log(arr);                           // [&quot;1000&quot;, &quot;40&quot;, &quot;25&quot;, &quot;10&quot;, &quot;5&quot;, &quot;1&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>var arr = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Array</span>(<span class="hljs-number">6</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;10&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;5&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;40&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">&quot;25&quot;</span>;
arr[<span class="hljs-number">4</span>] = <span class="hljs-string">&quot;1000&quot;</span>;
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">&quot;1&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title">orderNumber</span> (a, b) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> - b;
}

<span class="hljs-keyword">function</span> <span class="hljs-title">descOrderNumber</span> (a, b) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">b</span> - a;
}

console.log(arr);                           // [<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-string">&quot;1&quot;</span>]
console.log(arr.sort(orderNumber));         // [<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;1000&quot;</span>]
console.log(arr.sort(descOrderNumber));     // [<span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;1&quot;</span>]
console.log(arr);                           // [<span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-string">&quot;40&quot;</span>, <span class="hljs-string">&quot;25&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;1&quot;</span>]</code></pre><h4>3.10 splice</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>splice()&#x65B9;&#x6CD5;&#x5411;/&#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x6DFB;&#x52A0;/&#x5220;&#x9664;&#x9879;&#x76EE;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x88AB;&#x5220;&#x9664;&#x7684;&#x9879;&#x76EE;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.splice(index, howmany, item1, ......, itemX)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>index</td><td>&#x5FC5;&#x9700;&#x3002;&#x6574;&#x6570;&#xFF0C;&#x89C4;&#x5B9A;&#x6DFB;&#x52A0;/&#x5220;&#x9664;&#x9879;&#x76EE;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F7F;&#x7528;&#x8D1F;&#x6570;&#x53EF;&#x4ECE;&#x6570;&#x7EC4;&#x7ED3;&#x5C3E;&#x5904;&#x89C4;&#x5B9A;&#x4F4D;&#x7F6E;&#x3002;</td></tr><tr><td>howmany</td><td>&#x5FC5;&#x9700;&#x3002;&#x8981;&#x5220;&#x9664;&#x7684;&#x9879;&#x76EE;&#x6570;&#x91CF;&#x3002;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;0&#xFF0C;&#x5219;&#x4E0D;&#x4F1A;&#x5220;&#x9664;&#x9879;&#x76EE;&#x3002;</td></tr><tr><td>item1,......,itemX</td><td>&#x53EF;&#x9009;&#x3002;&#x5411;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x7684;&#x65B0;&#x9879;&#x76EE;&#x3002;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><table><thead><tr><th>&#x7C7B;&#x578B;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>Array</td><td>&#x5305;&#x542B;&#x88AB;&#x5220;&#x9664;&#x9879;&#x76EE;&#x7684;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;&#x3002;</td></tr></tbody></table><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>splice()&#x65B9;&#x6CD5;&#x53EF;&#x5220;&#x9664;&#x4ECE;index&#x5904;&#x5F00;&#x59CB;&#x7684;0&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x7528;&#x53C2;&#x6570;&#x5217;&#x8868;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x503C;&#x6765;&#x66FF;&#x6362;&#x90A3;&#x4E9B;&#x88AB;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x3002;&#x5982;&#x679C;&#x4ECE;arrayObject&#x4E2D;&#x5220;&#x9664;&#x4E86;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x542B;&#x6709;&#x88AB;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(6);
arr[0] = &quot;George&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = &quot;James&quot;;
arr[4] = &quot;Adrew&quot;;
arr[5] = &quot;Martin&quot;;

console.log(arr);                                   // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]  
console.log(arr.splice(1, 1, &apos;Peter&apos;, &apos;Sara&apos;));     // [&quot;John&quot;]
console.log(arr);                                   // [&quot;Geroge&quot;, &quot;Peter&quot;, &quot;Sara&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]
console.log(arr.splice(1, 0, &apos;Ella&apos;));              // []
console.log(arr);                                   // [&quot;Geroge&quot;, &quot;Ella&quot;, &quot;Peter&quot;, &quot;Sara&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>var arr = new <span class="hljs-symbol">Array</span>(<span class="hljs-number">6</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;George&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">&quot;James&quot;</span>;
arr[<span class="hljs-number">4</span>] = <span class="hljs-string">&quot;Adrew&quot;</span>;
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">&quot;Martin&quot;</span>;

console.log(arr);                                   // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]  
console.log(arr.splice(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">&apos;Peter&apos;</span>, <span class="hljs-string">&apos;Sara&apos;</span>));     // [<span class="hljs-string">&quot;John&quot;</span>]
console.log(arr);                                   // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;Sara&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]
console.log(arr.splice(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;Ella&apos;</span>));              // []
console.log(arr);                                   // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;Ella&quot;</span>, <span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;Sara&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;James&quot;</span>, <span class="hljs-string">&quot;Adrew&quot;</span>, <span class="hljs-string">&quot;Martin&quot;</span>]</code></pre><h4>3.11 toString</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>toString()&#x65B9;&#x6CD5;&#x53EF;&#x628A;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.toString()</blockquote><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>arrayObject&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8868;&#x793A;&#x3002;&#x8FD4;&#x56DE;&#x503C;&#x4E0E;&#x6CA1;&#x6709;&#x53C2;&#x6570;&#x7684;join()&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x76F8;&#x540C;&#x3002;</p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x5F53;&#x6570;&#x7EC4;&#x7528;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x73AF;&#x5883;&#x65F6;&#xFF0C;JavaScript&#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x4E00;&#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x4F46;&#x662F;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x9700;&#x8981;&#x663E;&#x5F0F;&#x5730;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(4);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = 20;

console.log(arr.toString());    // &quot;Geroge,John,Thomas,20&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var arr = new Array(<span class="hljs-number">4</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-number">20</span>;

console.log(arr.toString());    <span class="hljs-comment">// &quot;Geroge,John,Thomas,20&quot;</span></code></pre><h4>3.12 toLocaleString</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>toLocaleString()&#x65B9;&#x6CD5;&#x53EF;&#x628A;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x672C;&#x5730;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.toLocaleString()</blockquote><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>arrayObject&#x7684;&#x672C;&#x5730;&#x5B57;&#x7B26;&#x4E32;&#x8868;&#x793A;&#x3002;</p><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x9996;&#x5148;&#x8C03;&#x7528;&#x6BCF;&#x4E2A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684; toLocaleString() &#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;&#x5730;&#x533A;&#x7279;&#x5B9A;&#x7684;&#x5206;&#x9694;&#x7B26;&#x628A;&#x751F;&#x6210;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(4);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = 20;

console.log(arr.toLocaleString());    // &quot;Geroge,John,Thomas,20&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var arr = new Array(<span class="hljs-number">4</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-number">20</span>;

console.log(arr.toLocaleString());    <span class="hljs-comment">// &quot;Geroge,John,Thomas,20&quot;</span></code></pre><h4>3.13 valueOf</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>valueOf()&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;Array&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x59CB;&#x503C;&#x3002;&#x8BE5;&#x539F;&#x59CB;&#x503C;&#x7531;Array&#x5BF9;&#x8C61;&#x6D3E;&#x751F;&#x7684;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x7EE7;&#x627F;&#x3002;valueOf(&#xFF09;&#x65B9;&#x6CD5;&#x901A;&#x5E38;&#x7531;JavaScript&#x5728;&#x540E;&#x53F0;&#x81EA;&#x52A8;&#x8C03;&#x7528;&#xFF0C;&#x5E76;&#x4E0D;&#x663E;&#x5F0F;&#x5730;&#x51FA;&#x73B0;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.valueOf()</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(4);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;
arr[3] = 20;

console.log(arr.valueOf());    // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;, 20]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>var arr = new <span class="hljs-symbol">Array</span>(<span class="hljs-number">4</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;
arr[<span class="hljs-number">3</span>] = <span class="hljs-number">20</span>;

console.log(arr.valueOf());    // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-number">20</span>]</code></pre><h4>3.14 forEach</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>forEach()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x5C06;&#x5143;&#x7D20;&#x4F20;&#x9012;&#x7ED9;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;forEach()&#x5BF9;&#x4E8E;&#x7A7A;&#x6570;&#x7EC4;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.forEach(function (value, index, arr) {}, thisValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function(currentValue, index, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>index: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>thisValue</td><td>&#x53EF;&#x9009;&#x3002;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x503C;&#x4E00;&#x822C;&#x7528;&apos;this&apos;&#x503C;&#x3002;<br>&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x7A7A;&#xFF0C;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x628A;&apos;undefined&apos;&#x4F1A;&#x4F20;&#x9012;&#x7ED9;&apos;this&apos;&#x503C;&#xFF0C;&#x666E;&#x901A;&#x6A21;&#x5F0F;&#x4E0B;&#x4F20;&#x5165;&apos;window&apos;&#x3002;</td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;Geroge&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

arr.forEach(function (value, index, arr) {
    console.log(value);     // &quot;Geroge&quot; &quot;John&quot; &quot;Thomas&quot;
    console.log(index);     // 0        1      2
    console.log(arr);       // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
    console.log(this);      // window
});

arr.forEach(function (value, index, arr) {
    console.log(value);     // &quot;Geroge&quot; &quot;John&quot; &quot;Thomas&quot;
    console.log(index);     // 0        1      2
    console.log(arr);       // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
    console.log(this);      // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
}, arr);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs monkey"><code>var arr = <span class="hljs-keyword">new</span> Array(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;Geroge&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (</span>value, index, arr) {
    console.<span class="hljs-built_in">log</span>(value);     // <span class="hljs-string">&quot;Geroge&quot;</span> <span class="hljs-string">&quot;John&quot;</span> <span class="hljs-string">&quot;Thomas&quot;</span>
    console.<span class="hljs-built_in">log</span>(index);     // <span class="hljs-number">0</span>        <span class="hljs-number">1</span>      <span class="hljs-number">2</span>
    console.<span class="hljs-built_in">log</span>(arr);       // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
    console.<span class="hljs-built_in">log</span>(this);      // window
});

arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (</span>value, index, arr) {
    console.<span class="hljs-built_in">log</span>(value);     // <span class="hljs-string">&quot;Geroge&quot;</span> <span class="hljs-string">&quot;John&quot;</span> <span class="hljs-string">&quot;Thomas&quot;</span>
    console.<span class="hljs-built_in">log</span>(index);     // <span class="hljs-number">0</span>        <span class="hljs-number">1</span>      <span class="hljs-number">2</span>
    console.<span class="hljs-built_in">log</span>(arr);       // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
    console.<span class="hljs-built_in">log</span>(this);      // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
}, arr);
</code></pre><h4>3.15 concat</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>concat()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6570;&#x7EC4;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x73B0;&#x6709;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x4EC5;&#x4EC5;&#x4F1A;&#x8FD4;&#x56DE;&#x88AB;&#x8FDE;&#x63A5;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.concat(arrayX,arrayX,......,arrayX)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>arrayX</td><td>&#x5FC5;&#x9700;&#x3002;&#x8BE5;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x4F53;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x591A;&#x4E2A;&#x3002;</td></tr></tbody></table><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br></p><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x8BE5;&#x6570;&#x7EC4;&#x662F;&#x901A;&#x8FC7;&#x628A;&#x6240;&#x6709;arrayX&#x53C2;&#x6570;&#x6DFB;&#x52A0;&#x5230;arrayObject&#x4E2D;&#x751F;&#x6210;&#x7684;&#x3002;&#x5982;&#x679C;&#x8981;&#x8FDB;&#x884C;concat()&#x64CD;&#x4F5C;&#x7684;&#x53C2;&#x6570;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x90A3;&#x4E48;&#x6DFB;&#x52A0;&#x7684;&#x662F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1, 2, 3];

console.log(a.concat(4, 5, [6, 7], 8, 9));  // [1, 2, 3, 4, 5, 6, 7, 8, 9]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

console.log(a.concat(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, [<span class="hljs-number">6</span>, <span class="hljs-number">7</span>], <span class="hljs-number">8</span>, <span class="hljs-number">9</span>));  <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9]</span></code></pre><h4>3.16 every</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>every()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x90FD;&#x7B26;&#x5408;&#x6307;&#x5B9A;&#x6761;&#x4EF6;&#xFF08;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x63D0;&#x4F9B;&#xFF09;&#x3002;<br>every()&#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#xFF1A;</p><ul><li>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x68C0;&#x6D4B;&#x5230;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0D;&#x6EE1;&#x8DB3;&#xFF0C;&#x5219;&#x6574;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x8FD4;&#x56DE;false&#xFF0C;&#x4E14;&#x5269;&#x4F59;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x518D;&#x8FDB;&#x884C;&#x68C0;&#x6D4B;&#x3002;</li><li>&#x5982;&#x679C;&#x6240;&#x6709;&#x5143;&#x7D20;&#x90FD;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;true&#x3002;</li></ul><p>&#x6CE8;&#x610F;&#xFF1A;every()&#x4E0D;&#x4F1A;&#x5BF9;&#x7A7A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x68C0;&#x6D4B;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;every()&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.every(function (currentValue, index, arr) {}, thisValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function (currentValue, index, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>index: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>thisValue</td><td>&#x53EF;&#x9009;&#x3002;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x8BE5;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x65F6;&#x4F7F;&#x7528;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x3002;<br></td></tr></tbody></table><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x6709;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;false&#xFF0C;&#x5219;&#x6574;&#x4E2A;every()&#x8FD4;&#x56DE;&#x503C;&#x4E3A;false&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x540E;&#x7EED;&#x5176;&#x4ED6;&#x9879;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br>&#x7A7A;&#x6570;&#x7EC4;&#x7684;every()&#x76F4;&#x63A5;&#x8FD4;&#x56DE;true&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ages = [10, 20, 24, 32, 40];

var result = ages.every(function (value, index, arr) {
    return value &gt; 25;
});

console.log(result);    // false

ages = [];
result = ages.every(function (value, index, arr) {
    return value &gt; 25;
});

console.log(result);    // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> ages = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">24</span>, <span class="hljs-number">32</span>, <span class="hljs-number">40</span>];

<span class="hljs-keyword">var</span> <span class="hljs-keyword">result</span> = ages.every(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    return value &gt; 25;
}</span>);</span>

console.log(<span class="hljs-keyword">result</span>);    <span class="hljs-comment">// false</span>

ages = [];
<span class="hljs-keyword">result</span> = ages.every(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    return value &gt; 25;
}</span>);</span>

console.log(<span class="hljs-keyword">result</span>);    <span class="hljs-comment">// true</span></code></pre><h4>3.17 some</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>some()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x6EE1;&#x8DB3;&#x6307;&#x5B9A;&#x6761;&#x4EF6;&#xFF08;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x63D0;&#x4F9B;&#xFF09;&#x3002;<br>every()&#x65B9;&#x6CD5;&#x4F1A;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><ul><li>&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#xFF0C;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x8FD4;&#x56DE;true&#xFF0C;&#x5269;&#x4F59;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x518D;&#x6267;&#x884C;&#x68C0;&#x6D4B;&#x3002;</li><li>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;false&#x3002;</li></ul><p>&#x6CE8;&#x610F;&#xFF1A;some()&#x4E0D;&#x4F1A;&#x5BF9;&#x7A7A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x68C0;&#x6D4B;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;some()&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.some(function (currentValue, index, arr) {}, thisValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function (currentValue, index, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>index: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>thisValue</td><td>&#x53EF;&#x9009;&#x3002;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x8BE5;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x65F6;&#x4F7F;&#x7528;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x3002;<br></td></tr></tbody></table><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x6709;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;true&#xFF0C;&#x5219;&#x6574;&#x4E2A;some()&#x8FD4;&#x56DE;&#x503C;&#x4E3A;true&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x540E;&#x7EED;&#x5176;&#x4ED6;&#x9879;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br>&#x7A7A;&#x6570;&#x7EC4;&#x7684;some()&#x76F4;&#x63A5;&#x8FD4;&#x56DE;false&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ages = [10, 20, 24, 32, 40];

var result = ages.some(function (value, index, arr) {
    return value &gt; 25;
});

console.log(result);    // true

ages = [];
result = ages.some(function (value, index, arr) {
    return value &gt; 25;
});

console.log(result);    // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> ages = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">24</span>, <span class="hljs-number">32</span>, <span class="hljs-number">40</span>];

<span class="hljs-keyword">var</span> <span class="hljs-keyword">result</span> = ages.some(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    return value &gt; 25;
}</span>);</span>

console.log(<span class="hljs-keyword">result</span>);    <span class="hljs-comment">// true</span>

ages = [];
<span class="hljs-keyword">result</span> = ages.some(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    return value &gt; 25;
}</span>);</span>

console.log(<span class="hljs-keyword">result</span>);    <span class="hljs-comment">// false</span></code></pre><h4>3.18 filter</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>filter()&#x65B9;&#x6CD5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x65B0;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x662F;&#x901A;&#x8FC7;&#x68C0;&#x67E5;&#x6307;&#x5B9A;&#x6570;&#x7EC4;&#x4E2D;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF1A;filter()&#x4E0D;&#x4F1A;&#x5BF9;&#x7A7A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x68C0;&#x6D4B;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;filter()&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.filter(function (currentValue, index, arr) {}, thisValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function (currentValue, index, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>index: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>thisValue</td><td>&#x53EF;&#x9009;&#x3002;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x8BE5;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x65F6;&#x4F7F;&#x7528;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x3002;<br></td></tr></tbody></table><p><strong>&#x8BF4;&#x660E;</strong><br></p><p>&#x5C06;&#x6240;&#x6709;&#x8FD4;&#x56DE;true&#x7684;&#x6570;&#x7EC4;&#x9879;&#x53D6;&#x51FA;&#x6765;&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ages = [10, 20, 24, 32, 40];

var result = ages.filter(function (value, index, arr) {
    return value &gt; 25;
});

console.log(result);    // [32, 40]
console.log(ages);      // [10, 20, 24, 32, 40]

ages = [];
result = ages.filter(function (value, index, arr) {
    return value &gt; 25;
});

console.log(result);    // []" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> ages = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">24</span>, <span class="hljs-number">32</span>, <span class="hljs-number">40</span>];

<span class="hljs-keyword">var</span> <span class="hljs-keyword">result</span> = ages.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    return value &gt; 25;
}</span>);</span>

console.log(<span class="hljs-keyword">result</span>);    <span class="hljs-comment">// [32, 40]</span>
console.log(ages);      <span class="hljs-comment">// [10, 20, 24, 32, 40]</span>

ages = [];
<span class="hljs-keyword">result</span> = ages.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    return value &gt; 25;
}</span>);</span>

console.log(<span class="hljs-keyword">result</span>);    <span class="hljs-comment">// []</span></code></pre><h4>3.19 reverse</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>reverse()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x98A0;&#x5012;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;&#x3002;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.reverse()</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(3);
arr[0] = &quot;George&quot;;
arr[1] = &quot;John&quot;;
arr[2] = &quot;Thomas&quot;;

console.log(arr);               // [&quot;Geroge&quot;, &quot;John&quot;, &quot;Thomas&quot;]
console.log(arr.reverse());     // [&quot;Thomas&quot;, &quot;John&quot;, &quot;Geroge&quot;]
console.log(arr);               // [&quot;Thomas&quot;, &quot;John&quot;, &quot;Geroge&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = <span class="hljs-built_in">new</span> Array(<span class="hljs-number">3</span>);
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;George&quot;</span>;
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">&quot;John&quot;</span>;
arr[<span class="hljs-number">2</span>] = <span class="hljs-string">&quot;Thomas&quot;</span>;

console.<span class="hljs-built_in">log</span>(arr);               // [<span class="hljs-string">&quot;Geroge&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Thomas&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">reverse</span>());     // [<span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Geroge&quot;</span>]
console.<span class="hljs-built_in">log</span>(arr);               // [<span class="hljs-string">&quot;Thomas&quot;</span>, <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Geroge&quot;</span>]</code></pre><h4>3.20 map</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>map()&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x4E3A;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x5904;&#x7406;&#x540E;&#x7684;&#x503C;&#x3002;map()&#x65B9;&#x6CD5;&#x6309;&#x7167;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x5904;&#x7406;&#x5143;&#x7D20;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF1A;map()&#x4E0D;&#x4F1A;&#x5BF9;&#x7A7A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x68C0;&#x6D4B;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;map()&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.map(function (currentValue, index, arr) {}, thisValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function (currentValue, index, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>index: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>thisValue</td><td>&#x53EF;&#x9009;&#x3002;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x8BE5;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x65F6;&#x4F7F;&#x7528;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x3002;<br></td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [65, 20, 11, 5];

var arr = numbers.map(function (value, index, arr) {
    return value * 2;
})

console.log(numbers);   // [65, 20, 11, 5]
console.log(arr);       // [130, 40, 22, 10]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">65</span>, <span class="hljs-number">20</span>, <span class="hljs-number">11</span>, <span class="hljs-number">5</span>];

<span class="hljs-keyword">var</span> arr = numbers.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, arr</span>) </span>{
    <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
})

<span class="hljs-built_in">console</span>.log(numbers);   <span class="hljs-comment">// [65, 20, 11, 5]</span>
<span class="hljs-built_in">console</span>.log(arr);       <span class="hljs-comment">// [130, 40, 22, 10]</span></code></pre><h4>3.21 reduce</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>reduce()&#x65B9;&#x6CD5;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x7D2F;&#x52A0;&#x5668;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x503C;&#xFF08;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF09;&#x5F00;&#x59CB;&#x7F29;&#x51CF;&#xFF0C;&#x6700;&#x7EC8;&#x8BA1;&#x7B97;&#x4E3A;&#x4E00;&#x4E2A;&#x503C;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF1A;reduce()&#x5BF9;&#x4E8E;&#x7A7A;&#x6570;&#x7EC4;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.reduce(function (total, currentValue, currentIndex, arr) {}, initialValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function (total, currentValue, currentIndex, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;<br>total: &#x5FC5;&#x9700;&#x3002;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x6216;&#x8005;&#x8BA1;&#x7B97;&#x7ED3;&#x675F;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>currentIndex: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>initialValue</td><td>&#x53EF;&#x9009;&#x3002;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x521D;&#x59CB;&#x503C;&#x3002;<br></td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [15, 2, 1, 7];

var total = numbers.reduce(function (total, currentValue) {
    console.log(total);             // 15 17 18 25
    console.log(currentValue);      // 2  1  7
    return total + currentValue;
});

console.log(total);                 // 25
console.log(numbers);               // [15, 2, 1, 7]

total = numbers.reduce(function (total, currentValue) {
    console.log(total);             // 20 35 37 38 45
    console.log(currentValue);      // 15 2  1  7
    return total + currentValue;
}, 20);

console.log(total);                 // 45
console.log(numbers);               // [15, 2, 1, 7]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> numbers = [15, 2, 1, 7];

<span class="hljs-keyword">var</span> <span class="hljs-keyword">total</span> = numbers.reduce(function (<span class="hljs-keyword">total</span>, currentValue) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);             <span class="hljs-comment">// 15 17 18 25</span>
    console.<span class="hljs-built_in">log</span>(currentValue);      <span class="hljs-comment">// 2  1  7</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">total</span> + currentValue;
});

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);                 <span class="hljs-comment">// 25</span>
console.<span class="hljs-built_in">log</span>(numbers);               <span class="hljs-comment">// [15, 2, 1, 7]</span>

<span class="hljs-keyword">total</span> = numbers.reduce(function (<span class="hljs-keyword">total</span>, currentValue) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);             <span class="hljs-comment">// 20 35 37 38 45</span>
    console.<span class="hljs-built_in">log</span>(currentValue);      <span class="hljs-comment">// 15 2  1  7</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">total</span> + currentValue;
}, 20);

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);                 <span class="hljs-comment">// 45</span>
console.<span class="hljs-built_in">log</span>(numbers);               <span class="hljs-comment">// [15, 2, 1, 7]</span></code></pre><h4>3.22 reduceRight</h4><p><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong><br></p><p>reduceRight()&#x65B9;&#x6CD5;&#x7684;&#x529F;&#x80FD;&#x548C;reduce()&#x529F;&#x80FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;reduceRight()&#x4ECE;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x5411;&#x524D;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6570;&#x7EC4;&#x9879;&#x505A;&#x7D2F;&#x52A0;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF1A;reduceRight()&#x5BF9;&#x4E8E;&#x7A7A;&#x6570;&#x7EC4;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x3002;</p><p><strong>&#x8BED;&#x6CD5;</strong><br></p><blockquote>arrayObject.reduceRight(function (total, currentValue, currentIndex, arr) {}, initialValue)</blockquote><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>function (total, currentValue, currentIndex, arr)</td><td>&#x5FC5;&#x9700;&#x3002;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;<br>total: &#x5FC5;&#x9700;&#x3002;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x6216;&#x8005;&#x8BA1;&#x7B97;&#x7ED3;&#x675F;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;<br>currentValue: &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br>currentIndex: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;<br>arr: &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</td></tr><tr><td>initialValue</td><td>&#x53EF;&#x9009;&#x3002;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x521D;&#x59CB;&#x503C;&#x3002;<br></td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [15, 2, 1, 7];

var total = numbers.reduceRight(function (total, currentValue) {
    console.log(total);             // 7 8 10 25
    console.log(currentValue);      // 1 2 15
    return total + currentValue;
});

console.log(total);                 // 25
console.log(numbers);               // [15, 2, 1, 7]

total = numbers.reduceRight(function (total, currentValue) {
    console.log(total);             // 20 27 28 30 45
    console.log(currentValue);      // 7  1  2  15
    return total + currentValue;
}, 20);

console.log(total);                 // 45
console.log(numbers);               // [15, 2, 1, 7]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> numbers = [15, 2, 1, 7];

<span class="hljs-keyword">var</span> <span class="hljs-keyword">total</span> = numbers.reduceRight(function (<span class="hljs-keyword">total</span>, currentValue) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);             <span class="hljs-comment">// 7 8 10 25</span>
    console.<span class="hljs-built_in">log</span>(currentValue);      <span class="hljs-comment">// 1 2 15</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">total</span> + currentValue;
});

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);                 <span class="hljs-comment">// 25</span>
console.<span class="hljs-built_in">log</span>(numbers);               <span class="hljs-comment">// [15, 2, 1, 7]</span>

<span class="hljs-keyword">total</span> = numbers.reduceRight(function (<span class="hljs-keyword">total</span>, currentValue) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);             <span class="hljs-comment">// 20 27 28 30 45</span>
    console.<span class="hljs-built_in">log</span>(currentValue);      <span class="hljs-comment">// 7  1  2  15</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">total</span> + currentValue;
}, 20);

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>);                 <span class="hljs-comment">// 45</span>
console.<span class="hljs-built_in">log</span>(numbers);               <span class="hljs-comment">// [15, 2, 1, 7]</span></code></pre><h2 id="articleHeader3">&#x7ED3;&#x675F;</h2><p>&#x672C;&#x6587;&#x4F1A;&#x540C;&#x6B65;&#x5230;&#x6211;&#x7684;<a href="https://blog.liuxuan.site" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a>&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5230;&#x6211;&#x7684;<a href="https://github.com/leocoder351/data-structure" rel="nofollow noreferrer" target="_blank">github&#x4ED3;&#x5E93;&#x67E5;&#x770B;</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#x6B22;&#x8FCE;&#x70B9;&#x4E00;&#x4E2A;Star~~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数据结构01 - 数组

## 原文链接
[https://segmentfault.com/a/1190000015765638](https://segmentfault.com/a/1190000015765638)


---
title: 'ES6精华：数值扩展' 
date: 2018-11-26 2:30:09
hidden: true
slug: eza9zu3zwws
categories: [reprint]
---

{{< raw >}}
<p><code>ES6</code>&#x4E3A;&#x6570;&#x503C;&#x589E;&#x52A0;&#x4E86;&#x4E9B;&#x5E38;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x8BA1;&#x7B97;&#x66F4;&#x4E3A;&#x7B80;&#x4FBF;&#x5B89;&#x5168;&#x3002;&#x672C;&#x7BC7;&#x6982;&#x62EC;&#x4E86;&#x8FD9;&#x4E2D;&#x7684;&#x7CBE;&#x534E;&#x77E5;&#x8BC6;&#x3002;</p><h2 id="articleHeader0">1 &#x57FA;&#x7840;</h2><h3 id="articleHeader1">1.1 &#x6781;&#x503C;</h3><p>JS&#x91C7;&#x7528;<code>IEEE 754</code>&#x6807;&#x51C6;&#x7684;64&#x4F4D;&#x53CC;&#x7CBE;&#x5EA6;&#x683C;&#x5F0F;&#x5B58;&#x50A8;&#x6570;&#x503C;&#x3002;<br>&#x6570;&#x503C;&#x7684;&#x7CBE;&#x5EA6;&#x6700;&#x591A;&#x53EF;&#x8FBE;&#x5230;<code>53</code>&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x4F4D;&#xFF08;1&#x4E2A;&#x9690;&#x85CF;&#x4F4D;&#x548C;52&#x4E2A;&#x6709;&#x6548;&#x4F4D;&#xFF09;&#x3002;<br>&#x5982;&#x679C;&#x6570;&#x503C;&#x7684;&#x7CBE;&#x5EA6;&#x8D85;&#x8FC7;&#x6B64;&#x9650;&#x5EA6;&#xFF0C;&#x7B2C;<code>54</code>&#x4F4D;&#x53CA;&#x540E;&#x9762;&#x7684;&#x4F1A;&#x88AB;&#x4E22;&#x5F03;&#x3002;</p><p>&#x6570;&#x503C;&#x7684;&#x6781;&#x503C;&#x5206;&#x4E3A;&#x4E24;&#x79CD;&#xFF1A;&#x53EF;&#x8868;&#x793A;&#x7684;&#x6781;&#x503C;&#x548C;&#x53EF;&#x7CBE;&#x786E;&#x8BA1;&#x7B97;&#x7684;&#x6781;&#x503C;&#xFF08;&#x6D6E;&#x70B9;&#x578B;&#x4E0D;&#x7B97;&#xFF09;&#x3002;<br>&#x53EF;&#x8868;&#x793A;&#x7684;&#x6781;&#x503C;&#xFF1A;<code>[5e-324, 1.7976931348623157e+308]</code>&#x3002;<br>&#x53EF;&#x7CBE;&#x786E;&#x8BA1;&#x7B97;&#x7684;&#x6781;&#x503C;&#xFF1A;<code>[1 - Math.pow(2, 53), Math.pow(2, 53) - 1]</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8D85;&#x8FC7;&#x7CBE;&#x5EA6;&#x7684;&#x6570;&#x503C;&#x53EF;&#x6B63;&#x786E;&#x663E;&#x793A;&#xFF0C;&#x4F46;&#x7531;&#x5176;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x53EF;&#x80FD;&#x4E0D;&#x51C6;&#x786E;&#x3002;

let num = 9007199254741002;
console.log( num ); // 9007199254741002
console.log( num + 1 ); // 9007199254741004
console.log( num + 3 ); // 9007199254741004

let n1 = Math.pow(2, 53) - 1 + 1 + 1;
let n2 = Math.pow(2, 53) - 1 + 1 + 2;
console.log(n1 === n2); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x8D85;&#x8FC7;&#x7CBE;&#x5EA6;&#x7684;&#x6570;&#x503C;&#x53EF;&#x6B63;&#x786E;&#x663E;&#x793A;&#xFF0C;&#x4F46;&#x7531;&#x5176;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x53EF;&#x80FD;&#x4E0D;&#x51C6;&#x786E;&#x3002;

<span class="hljs-keyword">let</span> num = <span class="hljs-number">9007199254741002</span>;
<span class="hljs-built_in">console</span>.log( num ); <span class="hljs-comment">// 9007199254741002</span>
<span class="hljs-built_in">console</span>.log( num + <span class="hljs-number">1</span> ); <span class="hljs-comment">// 9007199254741004</span>
<span class="hljs-built_in">console</span>.log( num + <span class="hljs-number">3</span> ); <span class="hljs-comment">// 9007199254741004</span>

<span class="hljs-keyword">let</span> n1 = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> n2 = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;
<span class="hljs-built_in">console</span>.log(n1 === n2); <span class="hljs-comment">// true</span></code></pre><p>&#x5BF9;&#x4E8E;&#x6574;&#x6570;&#xFF0C;&#x6700;&#x591A;&#x80FD;&#x7CBE;&#x786E;&#x663E;&#x793A;<code>16</code>&#x4E2A;&#x5341;&#x8FDB;&#x5236;&#x4F4D;&#xFF0C;&#x8D85;&#x8FC7;&#x4F1A;&#x88AB;&#x622A;&#x65AD;&#x3002;<br>&#x5BF9;&#x4E8E;&#x5C0F;&#x6570;&#xFF0C;&#x6700;&#x591A;&#x80FD;&#x7CBE;&#x786E;&#x663E;&#x793A;&#x5C0F;&#x6570;&#x70B9;&#x540E;<code>16</code>&#x4E2A;&#x5341;&#x8FDB;&#x5236;&#x4F4D;&#xFF0C;&#x8D85;&#x8FC7;&#x4F1A;&#x88AB;&#x622A;&#x65AD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8D85;&#x8FC7;&#x7684;&#x4F4D;&#x6570;&#x4F1A;&#x88AB;&#x622A;&#x65AD;&#x3002;

console.log( 3.000000000000001 === 3 ); // false
console.log( 3.0000000000000001 === 3 ); // true
console.log( 0.123456789123456891 ); // 0.1234567891234569" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x8D85;&#x8FC7;&#x7684;&#x4F4D;&#x6570;&#x4F1A;&#x88AB;&#x622A;&#x65AD;&#x3002;

<span class="hljs-built_in">console</span>.log( <span class="hljs-number">3.000000000000001</span> === <span class="hljs-number">3</span> ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-number">3.0000000000000001</span> === <span class="hljs-number">3</span> ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-number">0.123456789123456891</span> ); <span class="hljs-comment">// 0.1234567891234569</span></code></pre><h3 id="articleHeader2">1.2 &#x8FDB;&#x5236;</h3><p>&#x4E8C;&#x8FDB;&#x5236;&#xFF1A;<code>0b100</code>&#x6216;<code>0B</code>&#x3002;<br>&#x516B;&#x8FDB;&#x5236;&#xFF1A;<code>0o100</code>&#x6216;<code>0O</code>&#x6216;<code>0100</code>&#x3002;<br>&#x5341;&#x516D;&#x8FDB;&#x5236;&#xFF1A;<code>0x100</code>&#x6216;<code>0X100</code>&#x3002;<br>&#x6CE8;&#x610F;&#xFF0C;&#x53EF;&#x5FFD;&#x7565;<code>0100</code>&#x683C;&#x5F0F;&#x8868;&#x516B;&#x8FDB;&#x5236;&#xFF0C;&#x56E0;&#x4E3A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x4E0D;&#x5141;&#x8BB8;&#x4F7F;&#x7528;&#x3002;</p><p><strong>&#x8FDB;&#x5236;&#x95F4;&#x7684;&#x8F6C;&#x5316;</strong><br>&#x4F7F;&#x7528;&#x8FDB;&#x5236;&#x7684;&#x5B8C;&#x6574;&#x683C;&#x5F0F;&#xFF0C;&#x901A;&#x8FC7;<code>toString</code>&#x5728;&#x4E0D;&#x540C;&#x8FDB;&#x5236;&#x95F4;&#x8F6C;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( (10).toString(2) ); // 1010
console.log( (0b100).toString(8) ); // 4
console.log( (&apos;0o100&apos;).toString(16) ); // 40" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( (<span class="hljs-number">10</span>).toString(<span class="hljs-number">2</span>) ); <span class="hljs-comment">// 1010</span>
<span class="hljs-built_in">console</span>.log( (<span class="hljs-number">0b100</span>).toString(<span class="hljs-number">8</span>) ); <span class="hljs-comment">// 4</span>
<span class="hljs-built_in">console</span>.log( (<span class="hljs-string">&apos;0o100&apos;</span>).toString(<span class="hljs-number">16</span>) ); <span class="hljs-comment">// 40</span></code></pre><p>&#x4F7F;&#x7528;&#x8FDB;&#x5236;&#x7684;&#x503C;&#xFF0C;&#x901A;&#x8FC7;<code>parseInt</code>&#x5C06;&#x5176;&#x5B83;&#x8FDB;&#x5236;&#x8F6C;&#x6362;&#x6210;&#x5341;&#x8FDB;&#x5236;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( parseInt(100, 2) ); // 4
console.log( parseInt(100, 8) ); // 64
console.log( parseInt(&apos;100&apos;, 16) ); // 256" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">parseInt</span>(<span class="hljs-number">100</span>, <span class="hljs-number">2</span>) ); <span class="hljs-comment">// 4</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">parseInt</span>(<span class="hljs-number">100</span>, <span class="hljs-number">8</span>) ); <span class="hljs-comment">// 64</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&apos;100&apos;</span>, <span class="hljs-number">16</span>) ); <span class="hljs-comment">// 256</span></code></pre><p>&#x4F7F;&#x7528;&#x8FDB;&#x5236;&#x7684;&#x5B8C;&#x6574;&#x683C;&#x5F0F;&#xFF0C;&#x901A;&#x8FC7;<code>Number</code>&#x5C06;&#x5176;&#x5B83;&#x8FDB;&#x5236;&#x8F6C;&#x5316;&#x6210;&#x5341;&#x8FDB;&#x5236;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( Number(0b100) ); // 4
console.log( Number(&apos;0o100&apos;) ); // 64
console.log( Number(&apos;0x100&apos;) ); // 256" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>(<span class="hljs-number">0b100</span>) ); <span class="hljs-comment">// 4</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>(<span class="hljs-string">&apos;0o100&apos;</span>) ); <span class="hljs-comment">// 64</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>(<span class="hljs-string">&apos;0x100&apos;</span>) ); <span class="hljs-comment">// 256</span></code></pre><h2 id="articleHeader3">2 Number</h2><p>&#x5B8C;&#x6574;&#x7684;API&#x5217;&#x8868;&#xFF1A;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;</a>&#x3002;<br>&#x6B64;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x4F1A;&#x9ED8;&#x8BA4;&#x8F6C;&#x5316;&#x671F;&#x5F85;&#x4E3A;&#x6570;&#x503C;&#x7C7B;&#x578B;&#x800C;&#x5B9E;&#x9645;&#x4E0D;&#x662F;&#x7684;&#x53C2;&#x6570;&#x3002;</p><h3 id="articleHeader4">2.1 &#x6A21;&#x5757;&#x5316;</h3><p>&#x5C06;&#x5168;&#x5C40;&#x65B9;&#x6CD5;<code>isFinite() &amp; isNaN()</code>&#xFF0C;&#x653E;&#x5230;&#x4E86;<code>Number</code>&#x6A21;&#x5757;&#x4E0B;&#x3002;<br>&#x4E24;&#x8005;&#x552F;&#x4E00;&#x7684;&#x5DEE;&#x522B;&#x662F;&#xFF0C;&#x5168;&#x5C40;&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x4F1A;&#x9ED8;&#x8BA4;&#x8F6C;&#x5316;&#x975E;&#x6570;&#x503C;&#x53C2;&#x6570;&#xFF0C;<code>Number</code>&#x6A21;&#x5757;&#x4E0B;&#x7684;&#x4E0D;&#x4F1A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( isNaN(&apos;NaN&apos;) ); // true
- &#x7B49;&#x4EF7;&#x4E8E;
console.log( isNaN(Number(&apos;NaN&apos;)) );

&#x53EA;&#x8981;&#x4E0D;&#x662F; NaN &#xFF0C;&#x5219;&#x4E3A; false &#x3002;&#x66F4;&#x4E3A;&#x4E25;&#x683C;&#x4E25;&#x8C28;&#x3002;
console.log( Number.isNaN(&apos;NaN&apos;) ); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">isNaN</span>(<span class="hljs-string">&apos;NaN&apos;</span>) ); <span class="hljs-comment">// true</span>
- &#x7B49;&#x4EF7;&#x4E8E;
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">isNaN</span>(<span class="hljs-built_in">Number</span>(<span class="hljs-string">&apos;NaN&apos;</span>)) );

&#x53EA;&#x8981;&#x4E0D;&#x662F; <span class="hljs-literal">NaN</span> &#xFF0C;&#x5219;&#x4E3A; <span class="hljs-literal">false</span> &#x3002;&#x66F4;&#x4E3A;&#x4E25;&#x683C;&#x4E25;&#x8C28;&#x3002;
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">&apos;NaN&apos;</span>) ); <span class="hljs-comment">// false</span></code></pre><h3 id="articleHeader5">2.2 &#x6574;&#x6570;</h3><p>&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;&#x5E38;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#x4E3A;&#x5B89;&#x5168;&#x8BA1;&#x7B97;&#x670D;&#x52A1;&#x3002;</p><p><strong>isInteger()</strong><br>&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#x662F;&#x5426;&#x4E3A;&#x6574;&#x6570;&#x3002;&#x975E;&#x6570;&#x76F4;&#x63A5;&#x4E3A;<code>false</code>&#x3002;<br>&#x5728;JS&#x4E2D;&#xFF0C;&#x6574;&#x6570;&#x548C;&#x6D6E;&#x70B9;&#x6570;&#x7684;&#x50A8;&#x5B58;&#x65B9;&#x5F0F;&#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;<code>25</code>&#x548C;<code>25.0</code>&#x88AB;&#x89C6;&#x4E3A;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( Number.isInteger(&apos;25&apos;) ); // false
console.log( Number.isInteger(25.0) ); // true
console.log( Number.isInteger(3.0000000000000002) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-string">&apos;25&apos;</span>) ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">25.0</span>) ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">3.0000000000000002</span>) ); <span class="hljs-comment">// true</span></code></pre><p><strong>isSafeInteger()</strong><br>&#x5224;&#x65AD;&#x6574;&#x578B;&#x6570;&#x503C;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x5B89;&#x5168;&#x533A;&#x95F4;&#x5185;&#x3002;&#x975E;&#x6574;&#x578B;&#x5373;&#x4E3A;<code>false</code>&#x3002;<br>&#x6574;&#x578B;&#x6570;&#x503C;&#x5B89;&#x5168;&#x533A;&#x95F4;&#xFF1A;<code>[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]</code>&#x3002;<br>&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x7B97;&#x5F0F;&#x53CA;&#x5176;&#x7ED3;&#x679C;&#x662F;&#x5426;&#x5B89;&#x5168;&#xFF0C;&#x9700;&#x8981;&#x9A8C;&#x8BC1;&#x5B83;&#x7684;&#x5404;&#x4E2A;&#x9879;&#x4EE5;&#x53CA;&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isTrusty(9007199254740993, 990, 9007199254740993 - 990); // &#x62A5;&#x9519;

function isTrusty(left, right, result) {
  if (Number.isSafeInteger(left)
    &amp;&amp; Number.isSafeInteger(right)
    &amp;&amp; Number.isSafeInteger(result)) {
    return result;
  }
  throw new RangeError(&apos;Operation cannot be trusted!&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">isTrusty(<span class="hljs-number">9007199254740993</span>, <span class="hljs-number">990</span>, <span class="hljs-number">9007199254740993</span> - <span class="hljs-number">990</span>); <span class="hljs-comment">// &#x62A5;&#x9519;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isTrusty</span>(<span class="hljs-params">left, right, result</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Number</span>.isSafeInteger(left)
    &amp;&amp; <span class="hljs-built_in">Number</span>.isSafeInteger(right)
    &amp;&amp; <span class="hljs-built_in">Number</span>.isSafeInteger(result)) {
    <span class="hljs-keyword">return</span> result;
  }
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">&apos;Operation cannot be trusted!&apos;</span>);
}</code></pre><h3 id="articleHeader6">2.3 &#x8BEF;&#x5DEE;</h3><p>JS&#x80FD;&#x8BC6;&#x522B;&#x7684;&#x6700;&#x5C0F;&#x7CBE;&#x5EA6;&#x4E3A;<code>Number.EPSILON</code>&#xFF0C;&#x5373;<code>Math.pow(2, -52)</code>&#x3002;<br>&#x5982;&#x679C;&#x8BEF;&#x5DEE;&#x5C0F;&#x4E8E;&#x6B64;&#x7CBE;&#x5EA6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x8FD9;&#x70B9;&#x8BEF;&#x5DEE;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#xFF0C;&#x5373;&#x4E0D;&#x5B58;&#x5728;&#x8BEF;&#x5DEE;&#x4E86;&#x3002;<br>&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x8BA1;&#x7B97;&#x7684;&#x5BB9;&#x9519;&#x8BEF;&#x5DEE;&#xFF0C;&#x4EE5;&#x5BF9;&#x6BD4;&#x4E24;&#x4E2A;&#x6D6E;&#x70B9;&#x6570;&#x5E94;&#x4E0D;&#x5E94;&#x8BE5;&#x76F8;&#x540C;&#x7B49;&#x7B49;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( 0.1 + 0.2 ); // 0.30000000000000004
console.log( (0.1 + 0.2) === 0.3 ); // false
console.log( isEqualInErrorRange(0.1 + 0.2, 0.3) ); // true

function isEqualInErrorRange(left, right) {
  return Math.abs(left - right) &lt; Number.EPSILON;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> ); <span class="hljs-comment">// 0.30000000000000004</span>
<span class="hljs-built_in">console</span>.log( (<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>) === <span class="hljs-number">0.3</span> ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( isEqualInErrorRange(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>) ); <span class="hljs-comment">// true</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEqualInErrorRange</span>(<span class="hljs-params">left, right</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.abs(left - right) &lt; <span class="hljs-built_in">Number</span>.EPSILON;
}</code></pre><p>&#x8BBE;&#x5B9A;&#x9700;&#x8981;&#x7CBE;&#x786E;&#x7684;&#x4F4D;&#x6570;&#xFF0C;&#x5C06;&#x6D6E;&#x70B9;&#x578B;&#x8F6C;&#x5316;&#x6210;&#x6574;&#x578B;&#xFF0C;&#x6765;&#x8F83;&#x4E3A;&#x5B89;&#x5168;&#x7684;&#x8BA1;&#x7B97;&#x6D6E;&#x70B9;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( countFloat(0.1, 0.2, &apos;+&apos;, 14) ); // 0.3

function countFloat(a, b, sign, num) {
  let res;
  let times = Math.pow(10, num);
  let _a = Math.floor(a * times);
  let _b = Math.floor(b * times);
  
  switch (sign) {
    case &apos;-&apos;:
      res = isTrusty(_a, _b, _a - _b);
      break;
    case &apos;+&apos;:
      res = isTrusty(_a, _b, _a + _b);
      break;
    case &apos;/&apos;:
      res = isTrusty(_a, _b, _a / _b);
      break;
    case &apos;*&apos;:
      res = isTrusty(_a, _b, _a * _b);
      break;
  }
  
  return res / times;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( countFloat(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-string">&apos;+&apos;</span>, <span class="hljs-number">14</span>) ); <span class="hljs-comment">// 0.3</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countFloat</span>(<span class="hljs-params">a, b, sign, num</span>) </span>{
  <span class="hljs-keyword">let</span> res;
  <span class="hljs-keyword">let</span> times = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, num);
  <span class="hljs-keyword">let</span> _a = <span class="hljs-built_in">Math</span>.floor(a * times);
  <span class="hljs-keyword">let</span> _b = <span class="hljs-built_in">Math</span>.floor(b * times);
  
  <span class="hljs-keyword">switch</span> (sign) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;-&apos;</span>:
      res = isTrusty(_a, _b, _a - _b);
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;+&apos;</span>:
      res = isTrusty(_a, _b, _a + _b);
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;/&apos;</span>:
      res = isTrusty(_a, _b, _a / _b);
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;*&apos;</span>:
      res = isTrusty(_a, _b, _a * _b);
      <span class="hljs-keyword">break</span>;
  }
  
  <span class="hljs-keyword">return</span> res / times;
}</code></pre><h2 id="articleHeader7">3 Math</h2><p>&#x5B8C;&#x6574;&#x7684;API&#x5217;&#x8868;&#xFF1A;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;</a>&#x3002;<br>&#x6B64;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F1A;&#x9ED8;&#x8BA4;&#x8C03;&#x7528;<code>Number()</code>&#x8F6C;&#x5316;&#xFF0C;&#x671F;&#x5F85;&#x4E3A;&#x6570;&#x503C;&#x7C7B;&#x578B;&#x800C;&#x5B9E;&#x9645;&#x4E0D;&#x662F;&#x7684;&#x53C2;&#x6570;&#x3002;<br>&#x6B64;&#x6A21;&#x5757;&#x65B0;&#x589E;&#x4E86;&#x4E9B;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x5B9E;&#x73B0;&#x7684;&#x7B80;&#x6613;&#x65B9;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x67E5;&#x624B;&#x518C;&#x4F1A;&#x66F4;&#x6709;&#x6548;&#xFF0C;&#x5C31;&#x4E0D;&#x5217;&#x4E3E;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：数值扩展

## 原文链接
[https://segmentfault.com/a/1190000015386211](https://segmentfault.com/a/1190000015386211)


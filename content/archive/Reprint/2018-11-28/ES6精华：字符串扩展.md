---
title: 'ES6精华：字符串扩展' 
date: 2018-11-28 2:30:11
hidden: true
slug: omdk3hqws4l
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1 &#x56DB;&#x5B57;&#x8282;&#x5B57;&#x7B26;</h2><p><code>ES6</code>&#x5927;&#x5E45;&#x589E;&#x5F3A;&#x4E86;&#x5BF9;4&#x5B57;&#x8282;&#xFF08;32&#x4F4D;&#xFF09;&#x5B57;&#x7B26;&#x7684;&#x652F;&#x6301;&#x3002;</p><blockquote><code>JS</code>&#x5185;&#x90E8;&#x4F7F;&#x7528;<code>UTF-16</code>&#x7F16;&#x7801;&#x89C4;&#x5219;&#xFF08;&#x7F51;&#x9875;&#x901A;&#x5E38;&#x4E3A;<code>UTF-8</code>&#xFF09;&#x3002;<br>1&#x5B57;&#x7B26;&#x56FA;&#x5B9A;&#x4E3A;2&#x5B57;&#x8282;&#xFF0C;1&#x5B57;&#x8282;&#x4E3A;8&#x4F4D;&#xFF08;&#x4E8C;&#x8FDB;&#x5236;&#xFF09;&#xFF0C;&#x5176;&#x7801;&#x70B9;&#x5C0F;&#x4E8E;<code>0xFFFF</code>&#x3002;<br>&#x6709;&#x4E9B;&#x7B26;&#x53F7;&#x7684;&#x7801;&#x70B9;&#x5927;&#x4E8E;<code>0xFFFF</code>&#xFF0C;&#x9700;4&#x5B57;&#x8282;&#x8868;&#x793A;&#xFF0C;&#x5373;&#x5E38;&#x8BF4;&#x7684;32&#x4F4D;<code>UTF-16</code>&#x5B57;&#x7B26;&#x3002;</blockquote><h3 id="articleHeader1">1.1 &#x8868;&#x793A;&#x65B9;&#x6CD5;</h3><p>&#x65B0;&#x589E;&#x4E00;&#x79CD;&#x8868;&#x793A;&#x5B57;&#x7B26;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;<code>\u{20BB7}</code>&#x3002;<br>&#x7528;<code>{}</code>&#x5C06;&#x7801;&#x70B9;&#x62EC;&#x8D77;&#xFF0C;&#x4F7F;&#x5176;&#x53EF;&#x76F4;&#x63A5;&#x8868;&#x793A;&#x8D85;&#x8FC7;<code>0xFFFF</code>&#x7684;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str1 = &apos;&#x20BB7;&apos;; // &#x975E;&#x5409;&#xFF0C;&#x867D;&#x4E5F;&#x8BFB;&#x4F5C; j&#xED; &#x3002;
let str2 = &apos;\u{20BB7}&apos;;
let str3 = &apos;\uD842\uDFB7&apos;;

console.log(str1 === str2); // true
console.log(str2 === str3); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> str1 = <span class="hljs-string">&apos;&#x20BB7;&apos;</span>; <span class="hljs-comment">// &#x975E;&#x5409;&#xFF0C;&#x867D;&#x4E5F;&#x8BFB;&#x4F5C; j&#xED; &#x3002;</span>
<span class="hljs-keyword">let</span> str2 = <span class="hljs-string">&apos;\u{20BB7}&apos;</span>;
<span class="hljs-keyword">let</span> str3 = <span class="hljs-string">&apos;\uD842\uDFB7&apos;</span>;

<span class="hljs-built_in">console</span>.log(str1 === str2); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(str2 === str3); <span class="hljs-comment">// true</span></code></pre><p>4&#x5B57;&#x8282;&#x5B57;&#x7B26;&#x7684;&#x4E24;&#x79CD;&#x8868;&#x793A;&#x6709;&#x56FA;&#x5B9A;&#x7684;&#x8F6C;&#x5316;&#x89C4;&#x5219;&#xFF0C;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;&#x76F8;&#x52A0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c = 0x20BB7;
let ch = 0xD842;
let cl = 0xDFB7;

console.log( H(Number(c)) === ch ); // true
console.log( L(Number(c)) === cl ); // true

function H(c) {
  return Math.floor((c - 0x10000) / 0x400) + 0xD800;
}
function L(c) {
  return (c - 0x10000) % 0x400 + 0xDC00;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> c = <span class="hljs-number">0x20BB7</span>;
<span class="hljs-keyword">let</span> ch = <span class="hljs-number">0xD842</span>;
<span class="hljs-keyword">let</span> cl = <span class="hljs-number">0xDFB7</span>;

<span class="hljs-built_in">console</span>.log( H(<span class="hljs-built_in">Number</span>(c)) === ch ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( L(<span class="hljs-built_in">Number</span>(c)) === cl ); <span class="hljs-comment">// true</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">H</span>(<span class="hljs-params">c</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor((c - <span class="hljs-number">0x10000</span>) / <span class="hljs-number">0x400</span>) + <span class="hljs-number">0xD800</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">L</span>(<span class="hljs-params">c</span>) </span>{
  <span class="hljs-keyword">return</span> (c - <span class="hljs-number">0x10000</span>) % <span class="hljs-number">0x400</span> + <span class="hljs-number">0xDC00</span>;
}</code></pre><h3 id="articleHeader2">1.2 codePoint &#x7CFB;&#x5217;</h3><p><strong>codePointAt &amp; charCodeAt</strong><br>&#x4F7F;&#x7528;<code>.codePointAt(0)</code>&#x6B63;&#x786E;&#x8BFB;&#x53D6;&#x5230;&#x5B8C;&#x6574;&#x7684;4&#x5B57;&#x8282;&#x5B57;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = &apos;&#x20BB7;&apos;;

console.log( str.charCodeAt(0) ); // 55362&#xFF0C;&#x5373; \uD842 &#x3002;
console.log( str.charCodeAt(1) ); // 57271&#xFF0C;&#x5373; \uDFB7 &#x3002;
console.log( str.codePointAt(0) ); // 134071&#xFF0C;&#x5373; \u{20BB7} &#xFF0C;&#x5373; &#x20BB7;&#x3002;
console.log( str.codePointAt(1) ); // 57271&#xFF0C;&#x5373; \uDFB7 &#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;&#x20BB7;&apos;</span>;

<span class="hljs-built_in">console</span>.log( str.charCodeAt(<span class="hljs-number">0</span>) ); <span class="hljs-comment">// 55362&#xFF0C;&#x5373; \uD842 &#x3002;</span>
<span class="hljs-built_in">console</span>.log( str.charCodeAt(<span class="hljs-number">1</span>) ); <span class="hljs-comment">// 57271&#xFF0C;&#x5373; \uDFB7 &#x3002;</span>
<span class="hljs-built_in">console</span>.log( str.codePointAt(<span class="hljs-number">0</span>) ); <span class="hljs-comment">// 134071&#xFF0C;&#x5373; \u{20BB7} &#xFF0C;&#x5373; &#x20BB7;&#x3002;</span>
<span class="hljs-built_in">console</span>.log( str.codePointAt(<span class="hljs-number">1</span>) ); <span class="hljs-comment">// 57271&#xFF0C;&#x5373; \uDFB7 &#x3002;</span></code></pre><p><strong>fromCodePoint &amp; fromCharCode</strong><br>&#x4F7F;&#x7528;<code>String.fromCodePoint()</code>&#x6B63;&#x786E;&#x8BFB;&#x53D6;&#x5927;&#x4E8E;<code>0xFFFF</code>&#x7684;32&#x4F4D;&#x5B57;&#x7B26;&#x7684;&#x7801;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( String.fromCharCode(0x20BB7) ); // &#x89E3;&#x6790;&#x4E0D;&#x6210;&#x529F;&#xFF0C;&#x5DF2;&#x8D85;&#x8FC7; 0xFFFF &#x3002;
console.log( String.fromCodePoint(0x20BB7) ); // &apos;&#x20BB7;&apos;&#xFF0C;&#x5373;&apos;\u{20BB7}&apos;&#x3002;

console.log( String.fromCharCode(0xD842) + String.fromCharCode(0xDFB7) ); // &apos;&#x20BB7;&apos;&#xFF0C;&#x5373; &apos;\uD842\uDFB7&apos; &#x3002;
console.log( String.fromCodePoint(0xD842) + String.fromCodePoint(0xDFB7) ); // &apos;&#x20BB7;&apos;&#xFF0C;&#x5373; &apos;\uD842\uDFB7&apos; &#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-number">0x20BB7</span>) ); <span class="hljs-comment">// &#x89E3;&#x6790;&#x4E0D;&#x6210;&#x529F;&#xFF0C;&#x5DF2;&#x8D85;&#x8FC7; 0xFFFF &#x3002;</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">String</span>.fromCodePoint(<span class="hljs-number">0x20BB7</span>) ); <span class="hljs-comment">// &apos;&#x20BB7;&apos;&#xFF0C;&#x5373;&apos;\u{20BB7}&apos;&#x3002;</span>

<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-number">0xD842</span>) + <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-number">0xDFB7</span>) ); <span class="hljs-comment">// &apos;&#x20BB7;&apos;&#xFF0C;&#x5373; &apos;\uD842\uDFB7&apos; &#x3002;</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">String</span>.fromCodePoint(<span class="hljs-number">0xD842</span>) + <span class="hljs-built_in">String</span>.fromCodePoint(<span class="hljs-number">0xDFB7</span>) ); <span class="hljs-comment">// &apos;&#x20BB7;&apos;&#xFF0C;&#x5373; &apos;\uD842\uDFB7&apos; &#x3002;</span></code></pre><h3 id="articleHeader3">1.3 &#x5E38;&#x7528;&#x65B9;&#x6CD5;&#x96C6;</h3><p><strong>&#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;32&#x4F4D;&#x5B57;&#x7B26;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(is32Bit(&apos;a&apos;)); // false
console.log(is32Bit(&apos;&#x20BB7;&apos;)); // true

function is32Bit(s) {
  return s.codePointAt(0) &gt; 0xFFFF;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(is32Bit(<span class="hljs-string">&apos;a&apos;</span>)); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(is32Bit(<span class="hljs-string">&apos;&#x20BB7;&apos;</span>)); <span class="hljs-comment">// true</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is32Bit</span>(<span class="hljs-params">s</span>) </span>{
  <span class="hljs-keyword">return</span> s.codePointAt(<span class="hljs-number">0</span>) &gt; <span class="hljs-number">0xFFFF</span>;
}</code></pre><p><strong>&#x83B7;&#x53D6;&#x6B63;&#x786E;&#x7684;&#x5B57;&#x7B26;&#x957F;&#x5EA6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = &apos;a&#x20BB7;b&apos;;

console.log( getStringLength1(str) ); // 3
console.log( getStringLength2(str) ); // 3

function getStringLength1(str) {
  let res = str.match(/[\s\S]/gu);
  return res ? res.length : 0;
}
function getStringLength2(str) {
  let res = 0;
  for (let c of str) { res++; } // &#x6B64;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x8BC6;&#x522B;32&#x4F4D;&#x5B57;&#x7B26;&#x3002;
  return res;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;a&#x20BB7;b&apos;</span>;

<span class="hljs-built_in">console</span>.log( getStringLength1(str) ); <span class="hljs-comment">// 3</span>
<span class="hljs-built_in">console</span>.log( getStringLength2(str) ); <span class="hljs-comment">// 3</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStringLength1</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">let</span> res = str.match(<span class="hljs-regexp">/[\s\S]/gu</span>);
  <span class="hljs-keyword">return</span> res ? res.length : <span class="hljs-number">0</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStringLength2</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> c <span class="hljs-keyword">of</span> str) { res++; } <span class="hljs-comment">// &#x6B64;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x8BC6;&#x522B;32&#x4F4D;&#x5B57;&#x7B26;&#x3002;</span>
  <span class="hljs-keyword">return</span> res;
}</code></pre><p><strong>&#x904D;&#x5386;&#x65B9;&#x6CD5;</strong><br><code>ES5</code>&#x7531;&#x4E8E;&#x4E0D;&#x80FD;&#x6B63;&#x786E;&#x7684;&#x8BC6;&#x522B;32&#x4F4D;&#x5B57;&#x7B26;&#xFF0C;&#x904D;&#x5386;&#x5B58;&#x5728;&#x9690;&#x60A3;&#x3002;<br><code>ES6</code>&#x53EF;&#x4EE5;&#x914D;&#x5408;<code>for of</code>&#x548C;<code>codePointAt</code>&#x66F4;&#x4E3A;&#x6B63;&#x786E;&#x7684;&#x904D;&#x5386;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;a &#x20BB7; b&#x3002;

let str = &apos;a&#x20BB7;b&apos;;
for (let c of str) {
  console.log( String.fromCodePoint( c.codePointAt(0) ) );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;a &#x20BB7; b&#x3002;

<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;a&#x20BB7;b&apos;</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> c <span class="hljs-keyword">of</span> str) {
  <span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">String</span>.fromCodePoint( c.codePointAt(<span class="hljs-number">0</span>) ) );
}</code></pre><h2 id="articleHeader4">2 &#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</h2><blockquote>&#x5728;&#x73B0;&#x884C;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4E00;&#x822C;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4EE3;&#x66FF;&#x5355;&#x53CC;&#x5F15;&#x53F7;&#x4F5C;&#x4E3A;&#x5B9A;&#x4E49;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x7EDF;&#x4E00;&#x89C4;&#x8303;&#x3002;</blockquote><p>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x662F;<code>ES6</code>&#x65B0;&#x589E;&#x7684;&#x5B9A;&#x4E49;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4F7F;&#x7528;<code></code>` <code>&#x66FF;&#x4EE3;</code>&apos;&apos;<code>&#x6216;</code>&quot;&quot;`&#x3002;<br>&#x5176;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x7A7A;&#x683C;&#x3001;&#x7F29;&#x8FDB;&#x548C;&#x6362;&#x884C;&#x7B49;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x90FD;&#x4F1A;&#x88AB;&#x4FDD;&#x7559;&#x5728;&#x8F93;&#x51FA;&#x4E4B;&#x4E2D;&#x3002;<br>&#x5176;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>${}</code>&#x5305;&#x88F9;&#x6709;&#x5F85;&#x6267;&#x884C;&#x7684;&#x4EFB;&#x610F;<code>JS</code>&#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x53E6;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = &apos;Wmaker&apos;;
let str = `
&lt;div class=&quot;header&quot;&gt;
  &lt;p&gt;My name is ${ name }.&lt;/p&gt;
&lt;/div&gt;
`;

console.log(str);
// &#x8F93;&#x51FA;&#xFF1A;
// 
// &lt;div class=&quot;header&quot;&gt;
//   &lt;p&gt;My name is Wmaker.&lt;/p&gt;
// &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> name = <span class="hljs-string">&apos;Wmaker&apos;</span>;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">`
&lt;div class=&quot;header&quot;&gt;
  &lt;p&gt;My name is <span class="hljs-subst">${ name }</span>.&lt;/p&gt;
&lt;/div&gt;
`</span>;

<span class="hljs-built_in">console</span>.log(str);
<span class="hljs-comment">// &#x8F93;&#x51FA;&#xFF1A;</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// &lt;div class=&quot;header&quot;&gt;</span>
<span class="hljs-comment">//   &lt;p&gt;My name is Wmaker.&lt;/p&gt;</span>
<span class="hljs-comment">// &lt;/div&gt;</span></code></pre><h3 id="articleHeader5">2.1 &#x6807;&#x7B7E;&#x6A21;&#x677F;</h3><p>&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x662F;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x5F62;&#x5F0F;&#xFF1A;<code>fn`string`</code>&#x3002;</p><p>&#x5B9E;&#x9645;&#x4F20;&#x5165;<code>fn</code>&#x7684;&#x53C2;&#x6570;&#x6709;&#x4E09;&#x7C7B;&#x3002;<br>&#x4E00;&#x662F;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4F1A;&#x4EE5;<code>/${([\s\S]+?)}/g</code>&#x4E3A;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x62C6;&#x5206;&#x5F62;&#x6210;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x3002;<br>&#x4E8C;&#x662F;&#x5C06;&#x5404;&#x4E2A;<code>${}</code>&#xFF08;&#x8F93;&#x51FA;&#x53D8;&#x91CF;&#xFF09;&#x4F5C;&#x4E3A;&#x4F9D;&#x6B21;&#x7684;&#x53C2;&#x6570;&#x3002;<br>&#x4E09;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#x7684;<code>raw</code>&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x7A0D;&#x540E;&#x5206;&#x6790;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let words = &apos;hi&apos;;
let name = &apos;Wmaker&apos;;

say`Say ${words} to ${name}`;
// --- &#x7B49;&#x4EF7;&#x4E8E;
say.apply(null, [
  [&apos;Say &apos;, &apos; to &apos;, &apos;&apos;],
  &apos;hi&apos;,
  &apos;Wmaker&apos;
]);

function say() {
  console.log(arguments);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> words = <span class="hljs-string">&apos;hi&apos;</span>;
<span class="hljs-keyword">let</span> name = <span class="hljs-string">&apos;Wmaker&apos;</span>;

say<span class="hljs-string">`Say <span class="hljs-subst">${words}</span> to <span class="hljs-subst">${name}</span>`</span>;
<span class="hljs-comment">// --- &#x7B49;&#x4EF7;&#x4E8E;</span>
say.apply(<span class="hljs-literal">null</span>, [
  [<span class="hljs-string">&apos;Say &apos;</span>, <span class="hljs-string">&apos; to &apos;</span>, <span class="hljs-string">&apos;&apos;</span>],
  <span class="hljs-string">&apos;hi&apos;</span>,
  <span class="hljs-string">&apos;Wmaker&apos;</span>
]);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>);
}</code></pre><p><strong>raw&#x5C5E;&#x6027;</strong><br>&#x5176;&#x662F;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x53D6;&#x5F97;&#x8F6C;&#x4E49;&#x4E4B;&#x524D;&#x7684;&#x539F;&#x59CB;&#x6A21;&#x677F;&#x800C;&#x8BBE;&#x8BA1;&#x7684;&#x3002;<br>&#x5176;&#x662F;&#x4E0E;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x57FA;&#x672C;&#x76F8;&#x540C;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x91CC;&#x9762;&#x7684;&#x9879;&#x90FD;&#x662F;&#x8F6C;&#x4E49;&#x4E4B;&#x524D;&#x7684;&#xFF08;&#x76F8;&#x5F53;&#x518D;&#x6B21;&#x8F6C;&#x4E49;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn`1\n2`;
// --- &#x7B49;&#x4EF7;
fn.apply(null, [&apos;1&#x21B5;2&apos;, raw:[&apos;1\n2&apos;]]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">fn<span class="hljs-string">`1\n2`</span>;
<span class="hljs-comment">// --- &#x7B49;&#x4EF7;</span>
fn.apply(<span class="hljs-literal">null</span>, [<span class="hljs-string">&apos;1&#x21B5;2&apos;</span>, <span class="hljs-attr">raw</span>:[<span class="hljs-string">&apos;1\n2&apos;</span>]]);</code></pre><p><strong>&#x5B9E;&#x9645;&#x5E94;&#x7528;</strong><br>&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x7684;&#x4F18;&#x52BF;&#x5728;&#x4E8E;&#xFF0C;&#x4E0D;&#x540C;&#x573A;&#x666F;&#x4E0D;&#x540C;&#x53C2;&#x6570;&#x90FD;&#x53EF;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x7F16;&#x8BD1;&#x6A21;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let words = &apos;hi&apos;;
let name = &apos;Wmaker&apos;;

compileTemplate`&lt;p&gt;Say ${words} to ${name}.&lt;/p&gt;`; // &amp;lt;p&amp;gt;Say hi to Wmaker.&amp;lt;/p&amp;gt;
compileTemplate`&lt;p&gt;Hi ${name}!&lt;/p&gt;`; // &amp;lt;p&amp;gt;Hi Wmaker!&amp;lt;/p&amp;gt;

function compileTemplate() {
  let strs = arguments[0];
  let vars = Array.prototype.slice.call(arguments, 1);
  let res = transformHTML(strs[0]);

  vars.forEach((item, i) =&gt; {
    res += item + transformHTML(strs[i+1]);
  });
  
  console.log(res);

  function transformHTML(s) {
    return s.replace(/&amp;/g, &quot;&amp;amp;&quot;)
      .replace(/&lt;/g, &quot;&amp;lt;&quot;)
      .replace(/&gt;/g, &quot;&amp;gt;&quot;);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> words = <span class="hljs-string">&apos;hi&apos;</span>;
<span class="hljs-keyword">let</span> name = <span class="hljs-string">&apos;Wmaker&apos;</span>;

compileTemplate<span class="hljs-string">`&lt;p&gt;Say <span class="hljs-subst">${words}</span> to <span class="hljs-subst">${name}</span>.&lt;/p&gt;`</span>; <span class="hljs-comment">// &amp;lt;p&amp;gt;Say hi to Wmaker.&amp;lt;/p&amp;gt;</span>
compileTemplate<span class="hljs-string">`&lt;p&gt;Hi <span class="hljs-subst">${name}</span>!&lt;/p&gt;`</span>; <span class="hljs-comment">// &amp;lt;p&amp;gt;Hi Wmaker!&amp;lt;/p&amp;gt;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compileTemplate</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> strs = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">let</span> vars = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">let</span> res = transformHTML(strs[<span class="hljs-number">0</span>]);

  vars.forEach(<span class="hljs-function">(<span class="hljs-params">item, i</span>) =&gt;</span> {
    res += item + transformHTML(strs[i+<span class="hljs-number">1</span>]);
  });
  
  <span class="hljs-built_in">console</span>.log(res);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transformHTML</span>(<span class="hljs-params">s</span>) </span>{
    <span class="hljs-keyword">return</span> s.replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">&quot;&amp;amp;&quot;</span>)
      .replace(<span class="hljs-regexp">/&lt;/g</span>, <span class="hljs-string">&quot;&amp;lt;&quot;</span>)
      .replace(<span class="hljs-regexp">/&gt;/g</span>, <span class="hljs-string">&quot;&amp;gt;&quot;</span>);
  }
}</code></pre><h2 id="articleHeader6">3 &#x65B0;&#x589E;&#x51FD;&#x6570;</h2><p>&#x8FD9;&#x91CC;&#x53EA;&#x5217;&#x4E3E;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x65B9;&#x5F0F;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x770B;&#xFF1A;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" rel="nofollow noreferrer" target="_blank">String API</a>&#x3002;</p><h3 id="articleHeader7">3.1 normalize()</h3><p>&#x65B9;&#x6CD5;&#x4F1A;&#x6309;&#x7167;&#x4E00;&#x79CD;&#x6307;&#x5B9A;&#x7684;<code>Unicode</code>&#x6B63;&#x89C4;&#x5F62;&#x5F0F;&#x5C06;&#x5F53;&#x524D;&#x5B57;&#x7B26;&#x4E32;&#x6B63;&#x89C4;&#x5316;&#x3002;<br>&#x6709;&#x4E9B;&#x5B57;&#x7B26;&#x6709;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x8868;&#x793A;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x4E14;&#x5176;&#x8868;&#x793A;&#x4E0D;&#x7B49;&#x4EF7;&#xFF0C;&#x867D;&#x7136;&#x5728;&#x7ED3;&#x679C;&#x4E0A;&#x7B49;&#x4EF7;&#x3002;<br>&#x6BD4;&#x5982;&#x6709;&#x4E9B;&#x8BED;&#x8A00;&#x6709;&#x8BED;&#x8C03;&#x7B26;&#x53F7;&#x548C;&#x91CD;&#x97F3;&#x7B26;&#x53F7;&#x1D1;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5E26;&#x91CD;&#x97F3;&#x7B26;&#x53F7;&#x7684;&#x5B57;&#x7B26;&#x548C;&#x539F;&#x5B57;&#x7B26;&#x4E0E;&#x91CD;&#x97F3;&#x7B26;&#x4E24;&#x79CD;&#x8868;&#x793A;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s1 = &apos;\u01D1&apos;; // &apos;&#x1D1;&apos;
let s2 = &apos;\u004F\u030C&apos;; // &apos;&#x1D1;&apos;

console.log(s1 === s2); // false
console.log(s1.normalize() === s2.normalize()); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> s1 = <span class="hljs-string">&apos;\u01D1&apos;</span>; <span class="hljs-comment">// &apos;&#x1D1;&apos;</span>
<span class="hljs-keyword">let</span> s2 = <span class="hljs-string">&apos;\u004F\u030C&apos;</span>; <span class="hljs-comment">// &apos;&#x1D1;&apos;</span>

<span class="hljs-built_in">console</span>.log(s1 === s2); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(s1.normalize() === s2.normalize()); <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader8">3.2 padStart() &amp; padEnd()</h3><p>&#x4ECE;&#x5934;/&#x5C3E;&#x90E8;&#x8865;&#x5168;&#x5B57;&#x7B26;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5BF9;&#x586B;&#x5145;&#x7269;&#x7684;&#x6001;&#x5EA6;&#x662F;&#x591A;&#x5219;&#x91CD;&#x590D;&#x5C11;&#x5219;&#x88C1;&#x526A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E3A;&#x6570;&#x503C;&#x8865;&#x5168;&#x6307;&#x5B9A;&#x4F4D;&#x6570;&#x3002;
&apos;1&apos;.padStart(5, &apos;0&apos;); // &quot;00001&quot;

&#x63D0;&#x793A;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#x3002;
&apos;12&apos;.padStart(10, &apos;YYYY-MM-DD&apos;); // &quot;YYYY-MM-12&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E3A;&#x6570;&#x503C;&#x8865;&#x5168;&#x6307;&#x5B9A;&#x4F4D;&#x6570;&#x3002;
<span class="hljs-string">&apos;1&apos;</span>.padStart(<span class="hljs-number">5</span>, <span class="hljs-string">&apos;0&apos;</span>); <span class="hljs-comment">// &quot;00001&quot;</span>

&#x63D0;&#x793A;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#x3002;
<span class="hljs-string">&apos;12&apos;</span>.padStart(<span class="hljs-number">10</span>, <span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>); <span class="hljs-comment">// &quot;YYYY-MM-12&quot;</span></code></pre><h3 id="articleHeader9">3.3 String.raw()</h3><p>&#x7528;&#x6765;&#x5145;&#x5F53;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x659C;&#x6760;&#x90FD;&#x88AB;&#x8F6C;&#x4E49;&#x4E14;&#x53D8;&#x91CF;&#x5DF2;&#x88AB;&#x66FF;&#x6362;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = &apos;Wmaker&apos;;
let str = String.raw`
&lt;div class=\&quot;header\&quot;&gt;
  &lt;h2&gt;${name}&lt;/h2&gt;
&lt;/div&gt;
`;

console.log(str);
// &#x8F93;&#x51FA;&#xFF1A;
// 
// &lt;div class=\&quot;header\&quot;&gt;
//   &lt;h2&gt;Wmaker&lt;/h2&gt;
// &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> name = <span class="hljs-string">&apos;Wmaker&apos;</span>;
<span class="hljs-keyword">let</span> str = <span class="hljs-built_in">String</span>.raw<span class="hljs-string">`
&lt;div class=\&quot;header\&quot;&gt;
  &lt;h2&gt;<span class="hljs-subst">${name}</span>&lt;/h2&gt;
&lt;/div&gt;
`</span>;

<span class="hljs-built_in">console</span>.log(str);
<span class="hljs-comment">// &#x8F93;&#x51FA;&#xFF1A;</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// &lt;div class=\&quot;header\&quot;&gt;</span>
<span class="hljs-comment">//   &lt;h2&gt;Wmaker&lt;/h2&gt;</span>
<span class="hljs-comment">// &lt;/div&gt;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：字符串扩展

## 原文链接
[https://segmentfault.com/a/1190000015271030](https://segmentfault.com/a/1190000015271030)


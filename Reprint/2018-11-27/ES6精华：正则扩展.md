---
title: 'ES6精华：正则扩展' 
date: 2018-11-27 2:30:12
hidden: true
slug: gsis47w6axg
categories: [reprint]
---

{{< raw >}}
<p>&#x672C;&#x7BC7;&#x6982;&#x62EC;&#x4E86;<code>ES6</code>&#x4E2D;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x65B0;&#x589E;&#x90E8;&#x5206;&#x7684;&#x7CBE;&#x534E;&#x8981;&#x70B9;&#xFF08;&#x6700;&#x597D;&#x6709;<code>ES5</code>&#x7684;&#x57FA;&#x7840;&#xFF09;&#x3002;</p><h2 id="articleHeader0">1 u &#x6807;&#x5FD7;</h2><p>&#x4F7F;&#x6B63;&#x5219;&#x5904;&#x4E8E;<code>Unicode</code>&#x6A21;&#x5F0F;&#x3002;<br>&#x5173;&#x4E8E;<code>ES6</code>&#x7684;&#x5B57;&#x7B26;&#x6269;&#x5C55;&#x77E5;&#x8BC6;&#xFF0C;&#x53EF;&#x67E5;&#x770B;<a href="https://segmentfault.com/a/1190000015271030">&#x8FD9;&#x91CC;</a>&#x3002;</p><h3 id="articleHeader1">1.1 &#x56DB;&#x5B57;&#x8282;&#x5B57;&#x7B26;</h3><p>&#x5904;&#x4E8E;<code>Unicode</code>&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x6B63;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x6B63;&#x786E;&#x8BC6;&#x522B;32&#x4F4D;&#xFF08;&#x56DB;&#x5B57;&#x8282;&#xFF09;&#x5B57;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c = &apos;\uD83D\uDC2A&apos;; // 32&#x4F4D;&#x5B57;&#x7B26;&#xFF1A;&#x20BB7;&#x3002;
console.log( /^\S$/.test(c) ); // false&#xFF0C;&#x89C6;&#x4E3A;&#x4E24;&#x5B57;&#x7B26;&#x3002;
console.log( /^\S$/u.test(c) ); // true&#xFF0C;&#x6B63;&#x786E;&#x8BC6;&#x522B;&#xFF0C;&#x89C6;&#x4E3A;&#x4E00;&#x5B57;&#x7B26;&#x3002;

console.log( /\uD83D/.test(c) ); // true
console.log( /\uD83D/u.test(c) ); // false

console.log( /&#x20BB7;{2}/.test(&apos;&#x20BB7;&#x20BB7;&apos;) ); // false&#xFF0C;&#x5176;&#x7B49;&#x4EF7;&#x4E8E;&#x4E0B;&#x8005;&#x3002;
console.log( /\uD83D\uDC2A{2}/.test(&apos;\uD83D\uDC2A\uDC2A&apos;) ); // true
console.log( /&#x20BB7;{2}/u.test(&apos;&#x20BB7;&#x20BB7;&apos;) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> c = <span class="hljs-string">&apos;\uD83D\uDC2A&apos;</span>; <span class="hljs-comment">// 32&#x4F4D;&#x5B57;&#x7B26;&#xFF1A;&#x20BB7;&#x3002;</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/^\S$/</span>.test(c) ); <span class="hljs-comment">// false&#xFF0C;&#x89C6;&#x4E3A;&#x4E24;&#x5B57;&#x7B26;&#x3002;</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/^\S$/u</span>.test(c) ); <span class="hljs-comment">// true&#xFF0C;&#x6B63;&#x786E;&#x8BC6;&#x522B;&#xFF0C;&#x89C6;&#x4E3A;&#x4E00;&#x5B57;&#x7B26;&#x3002;</span>

<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/\uD83D/</span>.test(c) ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/\uD83D/u</span>.test(c) ); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/&#x20BB7;{2}/</span>.test(<span class="hljs-string">&apos;&#x20BB7;&#x20BB7;&apos;</span>) ); <span class="hljs-comment">// false&#xFF0C;&#x5176;&#x7B49;&#x4EF7;&#x4E8E;&#x4E0B;&#x8005;&#x3002;</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/\uD83D\uDC2A{2}/</span>.test(<span class="hljs-string">&apos;\uD83D\uDC2A\uDC2A&apos;</span>) ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/&#x20BB7;{2}/u</span>.test(<span class="hljs-string">&apos;&#x20BB7;&#x20BB7;&apos;</span>) ); <span class="hljs-comment">// true</span></code></pre><p>&#x5904;&#x4E8E;<code>Unicode</code>&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x6B63;&#x5219;&#xFF0C;&#x652F;&#x6301;&#x5E26;<code>{}</code>&#x7684;<code>Unicode</code>&#x8868;&#x793A;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( /\u{20BB7}/.test(&apos;&#x20BB7;&apos;) ); // false
console.log( /\u{20BB7}/u.test(&apos;&#x20BB7;&apos;) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/\u{20BB7}/</span>.test(<span class="hljs-string">&apos;&#x20BB7;&apos;</span>) ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/\u{20BB7}/u</span>.test(<span class="hljs-string">&apos;&#x20BB7;&apos;</span>) ); <span class="hljs-comment">// true</span></code></pre><p>&#x5904;&#x4E8E;<code>Unicode</code>&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x6B63;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6B63;&#x786E;&#x957F;&#x5EA6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( stringLength(&apos;&#x20BB7;&#x20BB7;&apos;) ); // 2

function stringLength(str) {
  let res = str.match(/[\s\S]/gu);
  return res ? res.length : 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( stringLength(<span class="hljs-string">&apos;&#x20BB7;&#x20BB7;&apos;</span>) ); <span class="hljs-comment">// 2</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stringLength</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">let</span> res = str.match(<span class="hljs-regexp">/[\s\S]/gu</span>);
  <span class="hljs-keyword">return</span> res ? res.length : <span class="hljs-number">0</span>;
}</code></pre><h3 id="articleHeader2">1.2 &#x975E;&#x89C4;&#x8303;&#x5B57;&#x7B26;</h3><p>&#x5904;&#x4E8E;<code>Unicode</code>&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x6B63;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x8BC6;&#x522B;&#x4E00;&#x4E9B;&#x975E;&#x89C4;&#x8303;&#x5B57;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let k1 = &apos;\u004B&apos;; // &#x89C4;&#x8303;&#x7684; K &#x3002;
let k2 = &apos;\u212A&apos;; // &#x975E;&#x89C4;&#x8303;&#x7684; K &#x3002;
console.log( /[a-z]/i.test(k2) ); // false
console.log( /[a-z]/ui.test(k2) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> k1 = <span class="hljs-string">&apos;\u004B&apos;</span>; <span class="hljs-comment">// &#x89C4;&#x8303;&#x7684; K &#x3002;</span>
<span class="hljs-keyword">let</span> k2 = <span class="hljs-string">&apos;\u212A&apos;</span>; <span class="hljs-comment">// &#x975E;&#x89C4;&#x8303;&#x7684; K &#x3002;</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/[a-z]/i</span>.test(k2) ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/[a-z]/ui</span>.test(k2) ); <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader3">1.3 &#x5C5E;&#x6027;&#x7C7B;</h3><p><code>Unicode</code>&#x5B57;&#x7B26;&#x90FD;&#x6709;&#x67D0;&#x4E9B;&#x5C5E;&#x6027;&#xFF08;&#x7C7B;&#x522B;&#xFF09;&#xFF0C;&#x6BD4;&#x5982;3&#x3001;&#x2162; &#x90FD;&#x5C5E;&#x4E8E; <code>Number</code>&#x3002;<br>&#x7ED3;&#x5408;<code>u</code>&#x6807;&#x5FD7;&#xFF0C;<code>\p{&#x5C5E;&#x6027;&#x540D;=&#x5C5E;&#x6027;&#x503C;}</code>&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5339;&#x914D;&#x5C5E;&#x4E8E;&#x67D0;&#x4E00;&#x7C7B;&#x67D0;&#x4E00;&#x79CD;&#x503C;&#x7684;&#x5B57;&#x7B26;&#x3002;<br>&#x5BF9;&#x4E8E;&#x4E00;&#x822C;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>\p{&#x5C5E;&#x6027;&#x540D;}</code>&#x6216;<code>\p{&#x5C5E;&#x6027;&#x503C;}</code>&#xFF08;&#x53E6;&#x5916;&#xFF0C;&#x5927;&#x5199;<code>P</code>&#x8868;&#x5426;&#x5B9A;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\p{Number}/u; // &#x5339;&#x914D;&#x5C5E;&#x4E8E; Number &#x5C5E;&#x6027;&#x7684;&#x5B57;&#x7B26;&#x3002;
console.log( reg.test(&apos;3&apos;) ); // true
console.log( reg.test(&apos;&#x325B;&apos;) ); // true
console.log( reg.test(&apos;&#x2162;&apos;) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\p{Number}/u</span>; <span class="hljs-comment">// &#x5339;&#x914D;&#x5C5E;&#x4E8E; Number &#x5C5E;&#x6027;&#x7684;&#x5B57;&#x7B26;&#x3002;</span>
<span class="hljs-built_in">console</span>.log( reg.test(<span class="hljs-string">&apos;3&apos;</span>) ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( reg.test(<span class="hljs-string">&apos;&#x325B;&apos;</span>) ); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log( reg.test(<span class="hljs-string">&apos;&#x2162;&apos;</span>) ); <span class="hljs-comment">// true</span></code></pre><h2 id="articleHeader4">2 y &#x6807;&#x5FD7;</h2><p>&#x4F7F;&#x6B63;&#x5219;&#x5904;&#x4E8E;<code>Sticky</code>&#xFF08;&#x7C98;&#x8FDE;&#xFF09;&#x6A21;&#x5F0F;&#x3002;<br>&#x5B83;&#x786E;&#x4FDD;&#x4E86;&#x6BCF;&#x6B21;&#x67E5;&#x627E;&#x7684;&#x5F00;&#x59CB;&#xFF0C;&#x90FD;&#x662F;&#x7D27;&#x63A5;&#x4E0A;&#x6B21;&#x67E5;&#x627E;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x4E0D;&#x4F1A;&#x8DF3;&#x8FC7;&#x4E2D;&#x95F4;&#x4E0D;&#x5339;&#x914D;&#x7684;&#x5B57;&#x7B26;&#x3002;<br>&#x5176;&#x672C;&#x8D28;&#x662F;&#x5728;&#x6BCF;&#x6B21;&#x67E5;&#x627E;&#x4E2D;&#x52A0;&#x4E86;<code>^</code>&#x5339;&#x914D;&#x5F00;&#x5934;&#x7684;&#x6A21;&#x5F0F;&#xFF0C;&#x4F7F;&#x6574;&#x4E2A;&#x5B57;&#x7B26;&#x8FDB;&#x884C;&#x4E25;&#x683C;&#x7684;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;&#x7684;&#x68C0;&#x67E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( &apos;a1a&apos;.match(/a/g).length ); // 2
console.log( &apos;a1a&apos;.match(/a/gy).length ); // 1

console.log( &apos;1a1a&apos;.match(/a/g).length ); // 2
console.log( &apos;1a1a&apos;.match(/a/gy) ); // null

&#x6A21;&#x62DF; Sticky &#x6A21;&#x5F0F;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;&#x3002;
let str = &apos;a1a&apos;;
let res = /^a/.exec(str);
while (res) {
  str = str.slice(res.index + res[0].length)
  res = /^a/.exec(str);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-string">&apos;a1a&apos;</span>.match(<span class="hljs-regexp">/a/g</span>).length ); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-string">&apos;a1a&apos;</span>.match(<span class="hljs-regexp">/a/gy</span>).length ); <span class="hljs-comment">// 1</span>

<span class="hljs-built_in">console</span>.log( <span class="hljs-string">&apos;1a1a&apos;</span>.match(<span class="hljs-regexp">/a/g</span>).length ); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-string">&apos;1a1a&apos;</span>.match(<span class="hljs-regexp">/a/gy</span>) ); <span class="hljs-comment">// null</span>

&#x6A21;&#x62DF; Sticky &#x6A21;&#x5F0F;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;&#x3002;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;a1a&apos;</span>;
<span class="hljs-keyword">let</span> res = <span class="hljs-regexp">/^a/</span>.exec(str);
<span class="hljs-keyword">while</span> (res) {
  str = str.slice(res.index + res[<span class="hljs-number">0</span>].length)
  res = <span class="hljs-regexp">/^a/</span>.exec(str);
}</code></pre><p>&#x5BF9;&#x4E8E;&#x6B63;&#x5219;&#x5BF9;&#x8C61;&#xFF0C;<code>y</code>&#x4F1A;&#x50CF;<code>g</code>&#x6807;&#x5FD7;&#x4E00;&#x6837;&#x8BBE;&#x7F6E;&#x5176;<code>lastIndex</code>&#xFF08;&#x7C7B;&#x4F3C;&#x5168;&#x5C40;&#x6027;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = null;

reg = /a/y;
reg.exec(&apos;aaa&apos;);
console.log( reg.lastIndex ); // 1
reg.exec(&apos;aaa&apos;);
console.log( reg.lastIndex ); // 2

reg = /a/y;
&apos;aaa&apos;.match(reg);
console.log( reg.lastIndex ); // 1
&apos;aaa&apos;.match(reg);
console.log( reg.lastIndex ); // 2

reg = /a/y;
&apos;aaa&apos;.replace(reg);
console.log( reg.lastIndex ); // 1
&apos;aaa&apos;.replace(reg);
console.log( reg.lastIndex ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> reg = <span class="hljs-literal">null</span>;

reg = <span class="hljs-regexp">/a/y</span>;
reg.exec(<span class="hljs-string">&apos;aaa&apos;</span>);
<span class="hljs-built_in">console</span>.log( reg.lastIndex ); <span class="hljs-comment">// 1</span>
reg.exec(<span class="hljs-string">&apos;aaa&apos;</span>);
<span class="hljs-built_in">console</span>.log( reg.lastIndex ); <span class="hljs-comment">// 2</span>

reg = <span class="hljs-regexp">/a/y</span>;
<span class="hljs-string">&apos;aaa&apos;</span>.match(reg);
<span class="hljs-built_in">console</span>.log( reg.lastIndex ); <span class="hljs-comment">// 1</span>
<span class="hljs-string">&apos;aaa&apos;</span>.match(reg);
<span class="hljs-built_in">console</span>.log( reg.lastIndex ); <span class="hljs-comment">// 2</span>

reg = <span class="hljs-regexp">/a/y</span>;
<span class="hljs-string">&apos;aaa&apos;</span>.replace(reg);
<span class="hljs-built_in">console</span>.log( reg.lastIndex ); <span class="hljs-comment">// 1</span>
<span class="hljs-string">&apos;aaa&apos;</span>.replace(reg);
<span class="hljs-built_in">console</span>.log( reg.lastIndex ); <span class="hljs-comment">// 2</span></code></pre><h2 id="articleHeader5">3 s &#x6807;&#x5FD7;</h2><p>&#x4F7F;&#x6B63;&#x5219;&#x5904;&#x4E8E;<code>dotAll</code>&#x6A21;&#x5F0F;&#xFF0C;&#x5373;<code>.</code>&#x4EE3;&#x8868;&#x5168;&#x90E8;&#x5B57;&#x7B26;&#xFF08;&#x4E4B;&#x524D;&#x4E0D;&#x5305;&#x62EC;&#x884C;&#x7EC8;&#x6B62;&#x7B26;<code>\r</code>, <code>\n</code>&#x7B49;&#xFF09;&#x3002;<br>&#x4E5F;&#x6709;&#x5176;&#x5B83;&#x53EF;&#x4EE5;&#x8868;&#x793A;&#x5168;&#x90E8;&#x5B57;&#x7B26;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;<code>[^]</code>, <code>[\s\S]</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( /./.test(&apos;\n&apos;) ); // false
console.log( /./s.test(&apos;\n&apos;) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/./</span>.test(<span class="hljs-string">&apos;\n&apos;</span>) ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-regexp">/./</span>s.test(<span class="hljs-string">&apos;\n&apos;</span>) ); <span class="hljs-comment">// true</span></code></pre><p>&#x8868;&#x793A;&#x5168;&#x90E8;&#x5B57;&#x7B26;&#x4E0E;&#x8868;&#x793A;&#x884C;&#x7684;&#x9996;&#x5C3E;&#x5E76;&#x4E0D;&#x51B2;&#x7A81;&#xFF0C;&#x4F46;&#x5728;<code>mg</code>&#x53CC;&#x91CD;&#x6A21;&#x5F0F;&#x4E0B;&#x8981;&#x660E;&#x786E;&#x662F;&#x5426;&#x4F7F;&#x7528;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = `Hello!`;
console.log( str.match(/^.*$/g) ); // [&quot;Hello!&quot;]
console.log( str.match(/^.*$/gs) ); // [&quot;Hello!&quot;]

let str1 = `
  a.
  b.
`;
console.log( str1.match(/^.*$/mg) ); // [&quot;&quot;, &quot;  a.&quot;, &quot;  b.&quot;, &quot;&quot;]
console.log( str1.match(/^.*$/msg) ); // [&quot;&#x21B5;  a.&#x21B5;  b.&#x21B5;&quot;, &quot;&quot;]
console.log( str1.match(/^.*?$/msg) ); // . &#x7684;&#x5339;&#x914D;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF0C;[&quot;&quot;, &quot;  a.&quot;, &quot;  b.&quot;, &quot;&quot;]&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> str = <span class="hljs-string">`Hello!`</span>;
<span class="hljs-built_in">console</span>.log( str.match(<span class="hljs-regexp">/^.*$/g</span>) ); <span class="hljs-comment">// [&quot;Hello!&quot;]</span>
<span class="hljs-built_in">console</span>.log( str.match(<span class="hljs-regexp">/^.*$/g</span>s) ); <span class="hljs-comment">// [&quot;Hello!&quot;]</span>

<span class="hljs-keyword">let</span> str1 = <span class="hljs-string">`
  a.
  b.
`</span>;
<span class="hljs-built_in">console</span>.log( str1.match(<span class="hljs-regexp">/^.*$/mg</span>) ); <span class="hljs-comment">// [&quot;&quot;, &quot;  a.&quot;, &quot;  b.&quot;, &quot;&quot;]</span>
<span class="hljs-built_in">console</span>.log( str1.match(<span class="hljs-regexp">/^.*$/m</span>sg) ); <span class="hljs-comment">// [&quot;&#x21B5;  a.&#x21B5;  b.&#x21B5;&quot;, &quot;&quot;]</span>
<span class="hljs-built_in">console</span>.log( str1.match(<span class="hljs-regexp">/^.*?$/m</span>sg) ); <span class="hljs-comment">// . &#x7684;&#x5339;&#x914D;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF0C;[&quot;&quot;, &quot;  a.&quot;, &quot;  b.&quot;, &quot;&quot;]&#x3002;</span></code></pre><p>&#x8865;&#x5145;&#xFF1A;&#x8D2A;&#x5A6A;&#x4E0E;&#x975E;&#x8D2A;&#x5A6A;&#x6027;&#x3002;<br>&#x5BF9;&#x4E8E;&#x91CF;&#x8BCD;&#xFF0C;&#x6BD4;&#x5982;<code>+, {1, 3}</code>&#xFF0C;&#x5176;&#x524D;&#x8005;&#x7684;&#x5339;&#x914D;&#x4F1A;&#x5C3D;&#x53EF;&#x80FD;&#x8FBE;&#x5230;&#x6B64;&#x533A;&#x95F4;&#x7684;&#x6700;&#x5927;&#x503C;&#xFF0C;&#x4E3A;&#x8D2A;&#x5A6A;&#x6027;&#x3002;<br>&#x5982;&#x679C;&#x5728;&#x91CF;&#x8BCD;&#x540E;&#x9762;&#x52A0;&#x4E0A;<code>?</code>&#xFF0C;&#x610F;&#x5473;&#x7740;&#x5176;&#x524D;&#x8005;&#x7684;&#x5339;&#x914D;&#x4E3A;&#x6B64;&#x533A;&#x95F4;&#x7684;&#x6700;&#x5C0F;&#x503C;&#xFF0C;&#x53EF;&#x4E3A;0&#xFF0C;&#x4E3A;&#x975E;&#x8D2A;&#x5A6A;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( &apos;1234&apos;.match(/(\d*)(\d*)/) ); // [&quot;1234&quot;, &quot;1234&quot;, &quot;&quot;]
console.log( &apos;1234&apos;.match(/(\d*?)(\d*)/) ); // [&quot;1234&quot;, &quot;&quot;, &quot;1234&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( <span class="hljs-string">&apos;1234&apos;</span>.match(<span class="hljs-regexp">/(\d*)(\d*)/</span>) ); <span class="hljs-comment">// [&quot;1234&quot;, &quot;1234&quot;, &quot;&quot;]</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-string">&apos;1234&apos;</span>.match(<span class="hljs-regexp">/(\d*?)(\d*)/</span>) ); <span class="hljs-comment">// [&quot;1234&quot;, &quot;&quot;, &quot;1234&quot;]</span></code></pre><h2 id="articleHeader6">4 &#x540E;&#x884C;&#x65AD;&#x8A00;</h2><p>&#x7ED3;&#x5408;&#x5DF2;&#x6709;&#x7684;&#x5148;&#x884C;&#x65AD;&#x8A00;&#x4E00;&#x8D77;&#x770B;&#x3002;<br>&#x5148;&#x884C;&#x80AF;&#x5B9A;/&#x5426;&#x5B9A;&#x65AD;&#x8A00;&#xFF1A;<code>x(?=y) / x(?!y)</code>&#x3002;<br>&#x540E;&#x884C;&#x80AF;&#x5B9A;/&#x5426;&#x5B9A;&#x65AD;&#x8A00;&#xFF1A;<code>(?&lt;=y)x / (?&lt;!y)x</code>&#x3002;<br>&#x5148;&#x627E;<code>x</code>&#x90E8;&#x5206;&#xFF0C;&#x518D;&#x770B;&#x662F;&#x5426;&#x6EE1;&#x8DB3;&#x5176;&#x524D;/&#x540E;&#x6761;&#x4EF6;&#x3002;&#x5339;&#x914D;&#x7684;&#x7ED3;&#x679C;&#x4EC5;&#x4EC5;&#x662F;<code>x</code>&#x90E8;&#x5206;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x6761;&#x4EF6;&#x90E8;&#x5206;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- &#x5148;&#x884C;&#x65AD;&#x8A00;
let str = &apos;The price is $12.&apos;;
let reg = /\$(?=(\d+))/;
console.log( str.match(reg) ); // [&quot;$&quot;, &quot;12&quot;]&#xFF0C;$&#x662F;&#x6574;&#x4E2A;&#x6B63;&#x5219;&#x5339;&#x914D;&#x7684;&#xFF0C;122&#x662F;&#x5B50;&#x7EC4;&#x7684;&#x3002;

--- &#x540E;&#x884C;&#x65AD;&#x8A00;
let str = &apos;The percentage is 57%&apos;;
let reg = /(?&lt;=(\d+))%/;
console.log( str.match(reg) ); // [&quot;%&quot;, &quot;57&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- &#x5148;&#x884C;&#x65AD;&#x8A00;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;The price is $12.&apos;</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\$(?=(\d+))/</span>;
<span class="hljs-built_in">console</span>.log( str.match(reg) ); <span class="hljs-comment">// [&quot;$&quot;, &quot;12&quot;]&#xFF0C;$&#x662F;&#x6574;&#x4E2A;&#x6B63;&#x5219;&#x5339;&#x914D;&#x7684;&#xFF0C;122&#x662F;&#x5B50;&#x7EC4;&#x7684;&#x3002;</span>

--- &#x540E;&#x884C;&#x65AD;&#x8A00;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;The percentage is 57%&apos;</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/(?&lt;=(\d+))%/</span>;
<span class="hljs-built_in">console</span>.log( str.match(reg) ); <span class="hljs-comment">// [&quot;%&quot;, &quot;57&quot;]</span></code></pre><p>&#x540E;&#x884C;&#x65AD;&#x8A00;&#x7684;&#x6761;&#x4EF6;&#x8BED;&#x53E5;&#xFF08;()&#x91CC;&#x7684;&#xFF09;&#x7684;&#x67E5;&#x627E;&#x987A;&#x5E8F;&#x662F;&#x4ECE;&#x53F3;&#x5411;&#x5DE6;&#xFF08;&#x9006;&#x5E8F;&#xFF09;&#x5339;&#x914D;&#x3002;<br>&#x4F46;&#x662F;&#x5176;&#x4E2D;&#x7684;&#x5B50;&#x6A21;&#x5F0F;&#x7684;&#x9ED8;&#x8BA4;&#x547D;&#x540D;&#x5E8F;&#x53F7;&#xFF0C;&#x4F9D;&#x65E7;&#x662F;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x7B97;&#x7684;&#xFF08;&#x53EF;&#x53C2;&#x8003;&#x4E0B;&#x9762;&#x5185;&#x5BB9;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E24;&#x4E2A;&#x5B50;&#x7EC4;&#x90FD;&#x662F;&#x8D2A;&#x5A6A;&#x7684;&#xFF0C;`(\d+a)`&#x83B7;&#x5F97;&#x7684;&#x6570;&#x5B57;&#x591A;&#xFF0C;&#x8BF4;&#x660E;&#x5176;&#x5148;&#x88AB;&#x5339;&#x914D;&#x7684;&#x3002;
let str = &apos;123a%&apos;;
let reg = /(?&lt;=(\d+)(\d+a))%/;
str.match(reg); // [&quot;%&quot;, &quot;1&quot;, &quot;23a&quot;]&#xFF0C;23a &#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x5339;&#x914D;&#x7EC4; (\d+a) &#x7684;&#x7ED3;&#x679C;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E24;&#x4E2A;&#x5B50;&#x7EC4;&#x90FD;&#x662F;&#x8D2A;&#x5A6A;&#x7684;&#xFF0C;<span class="hljs-string">`(\d+a)`</span>&#x83B7;&#x5F97;&#x7684;&#x6570;&#x5B57;&#x591A;&#xFF0C;&#x8BF4;&#x660E;&#x5176;&#x5148;&#x88AB;&#x5339;&#x914D;&#x7684;&#x3002;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;123a%&apos;</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/(?&lt;=(\d+)(\d+a))%/</span>;
str.match(reg); <span class="hljs-comment">// [&quot;%&quot;, &quot;1&quot;, &quot;23a&quot;]&#xFF0C;23a &#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x5339;&#x914D;&#x7EC4; (\d+a) &#x7684;&#x7ED3;&#x679C;&#x3002;</span></code></pre><h2 id="articleHeader7">5 &#x5177;&#x540D;&#x7EC4;</h2><p>&#x4E4B;&#x524D;&#x7684;&#x7EC4;&#xFF08;&#x5B50;&#x6A21;&#x5F0F;&#xFF09;&#x90FD;&#x6CA1;&#x6709;&#x5177;&#x4F53;&#x540D;&#x5B57;&#xFF0C;&#x5B83;&#x4EEC;&#x662F;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x4ECE;1&#x5F00;&#x59CB;&#x88AB;&#x547D;&#x540D;&#x3002;<br>&#x73B0;&#x5728;&#x5141;&#x8BB8;&#x4E3A;&#x6BCF;&#x4E00;&#x4E2A;&#x7EC4;&#x5339;&#x914D;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#xFF0C;&#x65E2;&#x4FBF;&#x4E8E;&#x9605;&#x8BFB;&#x4EE3;&#x7801;&#xFF0C;&#x53C8;&#x4FBF;&#x4E8E;&#x5F15;&#x7528;&#x3002;<br>&#x4E00;&#x65E6;&#x4F7F;&#x7528;&#x4E86;&#x5177;&#x540D;&#x7EC4;&#xFF0C;&#x5339;&#x914D;&#x7684;&#x7ED3;&#x679C;&#x4E2D;<code>groups</code>&#x5C5E;&#x6027;&#x4FBF;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x76F8;&#x5E94;&#x7ED3;&#x679C;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = &apos;1234&apos;;
let reg = /(?&lt;one&gt;\d+)(?&lt;two&gt;\d+)/;
console.log( reg.exec(str).groups ); // {one: &quot;123&quot;, two: &quot;4&quot;}
console.log( str.match(reg).groups ); // {one: &quot;123&quot;, two: &quot;4&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;1234&apos;</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/(?&lt;one&gt;\d+)(?&lt;two&gt;\d+)/</span>;
<span class="hljs-built_in">console</span>.log( reg.exec(str).groups ); <span class="hljs-comment">// {one: &quot;123&quot;, two: &quot;4&quot;}</span>
<span class="hljs-built_in">console</span>.log( str.match(reg).groups ); <span class="hljs-comment">// {one: &quot;123&quot;, two: &quot;4&quot;}</span></code></pre><p>&#x6B63;&#x5219;&#x4E2D;&#x5F15;&#x7528;&#x5339;&#x914D;&#x7ED3;&#x679C;&#x7684;&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#x3002;<br>&#x7B2C;&#x4E00;&#x79CD;&#x662F;&#x4E0A;&#x9762;&#x793A;&#x4F8B;&#x6240;&#x793A;&#x7684;&#xFF0C;&#x642D;&#x914D;&#x5177;&#x540D;&#x7EC4;&#x5728;&#x7ED3;&#x679C;&#x4E2D;&#x5F15;&#x7528;&#x3002;<br>&#x7B2C;&#x4E8C;&#x79CD;&#x662F;&#x5728;<code>replace</code>&#x65F6;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x4F7F;&#x7528;<code>$n</code>&#x6216;<code>$&lt;name&gt;</code>&#x5728;&#x66FF;&#x6362;&#x5B57;&#x7B26;&#x4E2D;&#x66FF;&#x4EE3;&#x5339;&#x914D;&#x3002;<br>&#x7B2C;&#x4E09;&#x79CD;&#x662F;&#x76F4;&#x63A5;&#x5728;&#x6B63;&#x5219;&#x4E2D;&#x66FF;&#x4EE3;&#x4E4B;&#x524D;&#x7EC4;&#x7684;&#x5339;&#x914D;&#xFF0C;&#x4F7F;&#x7528;<code>\n</code>&#x6216;<code>\&lt;name&gt;</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- &#x7B2C;&#x4E8C;&#x79CD;
let str = &apos;a,b-c&apos;;
let reg = /([,-])/g;
console.log( str.replace(reg, &apos; $1 &apos;) ); // a , b - c

--- &#x7B2C;&#x4E09;&#x79CD;
let reg = /(?&lt;one&gt;\d{3})\d+\k&lt;one&gt;/;
console.log( reg.test(&apos;111211&apos;) ); // false
console.log( reg.test(&apos;1112111&apos;) ); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- &#x7B2C;&#x4E8C;&#x79CD;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;a,b-c&apos;</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/([,-])/g</span>;
<span class="hljs-built_in">console</span>.log( str.replace(reg, <span class="hljs-string">&apos; $1 &apos;</span>) ); <span class="hljs-comment">// a , b - c</span>

--- &#x7B2C;&#x4E09;&#x79CD;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/(?&lt;one&gt;\d{3})\d+\k&lt;one&gt;/</span>;
<span class="hljs-built_in">console</span>.log( reg.test(<span class="hljs-string">&apos;111211&apos;</span>) ); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( reg.test(<span class="hljs-string">&apos;1112111&apos;</span>) ); <span class="hljs-comment">// true</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：正则扩展

## 原文链接
[https://segmentfault.com/a/1190000015328138](https://segmentfault.com/a/1190000015328138)


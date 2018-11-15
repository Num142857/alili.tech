---
title: 那些必会用到的 ES6 精粹
reprint: true
categories: reprint
abbrlink: 79d6b9a4
date: 2018-11-08 02:30:09
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016460782" src="https://static.alili.tech/img/remote/1460000016460782" alt="" title="" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x6700;&#x65B0;&#x7684; ECMAScript &#x90FD;&#x5DF2;&#x7ECF;&#x5230;&#x53D1;&#x5E03;&#x5230; 2018 &#x7248;&#x4E86;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x6709;&#x7684;&#x6001;&#x5EA6;&#x662F;&#xFF1A; Stay hungry ! Stay young &#xFF01;</p><p>&#x4ECE;&#x63A5;&#x89E6; vue &#x5230;&#x5DE5;&#x4F5C;&#x4E2D;&#x7528;&#x5230; vue &#x5C06;&#x8FD1; 2 &#x5E74;&#x4E86;&#xFF0C;&#x5728;&#x5F00;&#x53D1; vue &#x9879;&#x76EE;&#x4E2D;&#x7528;&#x5230;&#x4E86;&#x5F88;&#x591A; es6 &#x7684; api &#xFF0C;es6 &#x7ED9;&#x6211;&#x7684;&#x5F00;&#x53D1;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x5927;&#x4FBF;&#x5229;&#x3002;</p><p>&#x672C;&#x6587;&#x53EA;&#x603B;&#x7ED3;&#x5C0F;&#x6C6A;&#x5728;&#x5DE5;&#x4F5C;&#x548C;&#x9762;&#x8BD5;&#x4E2D;&#x7ECF;&#x5E38;&#x9047;&#x5230;&#x7684; ES6 &#x53CA;&#x4E4B;&#x540E;&#x7684;&#x65B0; api &#x3002;</p><p>&#x6709;&#x7A7A;&#x5C31;&#x5F97;&#x591A;&#x603B;&#x7ED3;&#xFF0C;&#x4E00;&#x8FB9;&#x603B;&#x7ED3;&#xFF0C;&#x4E00;&#x8FB9;&#x91CD;&#x6E29;&#x5B66;&#x4E60;&#xFF01;&#xFF01;&#xFF01;</p><h1 id="articleHeader1">&#x6B63;&#x6587;</h1><h2 id="articleHeader2">1 let &#x548C; const</h2><p>let &#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0E; const &#x547D;&#x4EE4;&#x76F8;&#x540C;&#xFF1A;&#x53EA;&#x5728;&#x58F0;&#x660E;&#x6240;&#x5728;&#x7684;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x6709;&#x6548;&#x3002;&#x4E14;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347; &#x3002;</p><h4>1.1 let</h4><p>let &#x6240;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 123
a = 456 // &#x6B63;&#x786E;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;

let b = [123]
b = [456] // &#x6B63;&#x786E;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>let <span class="hljs-selector-tag">a</span> = <span class="hljs-number">123</span>
<span class="hljs-selector-tag">a</span> = <span class="hljs-number">456</span> <span class="hljs-comment">// &#x6B63;&#x786E;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;</span>

let <span class="hljs-selector-tag">b</span> = [<span class="hljs-number">123</span>]
<span class="hljs-selector-tag">b</span> = [<span class="hljs-number">456</span>] <span class="hljs-comment">// &#x6B63;&#x786E;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;</span></code></pre><h4>1.2 const</h4><p>const &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53EA;&#x8BFB;&#x7684;&#x5E38;&#x91CF;&#x3002;&#x4E00;&#x65E6;&#x58F0;&#x660E;&#xFF0C;&#x5E38;&#x91CF;&#x7684;&#x503C;&#x5C31;&#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x3002;</p><p>&#x7B80;&#x5355;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF08;&#x6570;&#x503C;&#x3001;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x5E03;&#x5C14;&#x503C;&#xFF09;&#xFF0C;&#x4E0D;&#x53EF;&#x4EE5;&#x53D8;&#x52A8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 123
a = 456 // &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x53EF;&#x6539;&#x53D8;

const b = [123]
b = [456] // &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x53EF;&#x4EE5;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#xFF0C;&#x4E0D;&#x53EF;&#x6539;&#x53D8;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>const <span class="hljs-selector-tag">a</span> = <span class="hljs-number">123</span>
<span class="hljs-selector-tag">a</span> = <span class="hljs-number">456</span> <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x53EF;&#x6539;&#x53D8;</span>

const <span class="hljs-selector-tag">b</span> = [<span class="hljs-number">123</span>]
<span class="hljs-selector-tag">b</span> = [<span class="hljs-number">456</span>] <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x53EF;&#x4EE5;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#xFF0C;&#x4E0D;&#x53EF;&#x6539;&#x53D8;</span></code></pre><p>&#x590D;&#x5408;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF08;&#x4E3B;&#x8981;&#x662F;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#xFF09;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B50;&#x53D8;&#x52A8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [123]
a.push(456) // &#x6210;&#x529F;

const b = {}
b.name = &apos;demo&apos;  // &#x6210;&#x529F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>const <span class="hljs-selector-tag">a</span> = [<span class="hljs-number">123</span>]
<span class="hljs-selector-tag">a</span>.push(<span class="hljs-number">456</span>) <span class="hljs-comment">// &#x6210;&#x529F;</span>

const <span class="hljs-selector-tag">b</span> = {}
<span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.name</span> = <span class="hljs-string">&apos;demo&apos;</span>  <span class="hljs-comment">// &#x6210;&#x529F;</span></code></pre><h2 id="articleHeader3">1.3 &#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span>;
}

a <span class="hljs-comment">// ReferenceError: a is not defined.</span>
b <span class="hljs-comment">// 1</span></code></pre><p>&#x6240;&#x4EE5; for&#x5FAA;&#x73AF;&#x7684;&#x8BA1;&#x6570;&#x5668;&#xFF0C;&#x5C31;&#x5F88;&#x5408;&#x9002;&#x4F7F;&#x7528; let &#x547D;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [];
for (let i = 0; i &lt; 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 6</span></code></pre><h2 id="articleHeader4">1.4 &#x63A8;&#x8350;</h2><p>&#x5BF9;&#x4E8E; &#x6570;&#x503C;&#x3001;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x5E03;&#x5C14;&#x503C; &#x7ECF;&#x5E38;&#x4F1A;&#x53D8;&#x7684;&#xFF0C;&#x7528; let &#x58F0;&#x660E;&#x3002;</p><p>&#x5BF9;&#x8C61;&#x3001;&#x6570;&#x7EC4;&#x548C;&#x51FD;&#x6570;&#x7528; const &#x6765;&#x58F0;&#x660E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5982;&#x7ECF;&#x5E38;&#x7528;&#x5230;&#x7684;&#x5BFC;&#x51FA; &#x51FD;&#x6570;
export const funA = function(){
    // ....
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x5982;&#x7ECF;&#x5E38;&#x7528;&#x5230;&#x7684;&#x5BFC;&#x51FA; &#x51FD;&#x6570;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> funA = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// ....</span>
}</code></pre><h2 id="articleHeader5">2 &#x89E3;&#x6784;&#xFF08;Destructuring&#xFF09;</h2><h4>2.1 &#x6570;&#x7EC4;</h4><p>&#x4E00;&#x6B21;&#x6027;&#x58F0;&#x660E;&#x591A;&#x4E2A;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a, b, c] = [1, 2, 3];
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> [a, b, c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
console.<span class="hljs-built_in">log</span>(a) <span class="hljs-comment">// 1</span>
console.<span class="hljs-built_in">log</span>(b) <span class="hljs-comment">// 2</span>
console.<span class="hljs-built_in">log</span>(c) <span class="hljs-comment">// 3</span></code></pre><p>&#x7ED3;&#x5408;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [head, ...tail] = [1, 2, 3, 4];
console.log(head) // 1
console.log(tail) // [2, 3, 4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let [head, ...tail] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
console.log(head) <span class="hljs-comment">// 1</span>
console.log(tail) <span class="hljs-comment">// [2, 3, 4]</span></code></pre><p>&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x5141;&#x8BB8;&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [foo = true] = [];
foo // true

let [x, y = &apos;b&apos;] = [&apos;a&apos;];
// x=&apos;a&apos;, y=&apos;b&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> [foo = <span class="hljs-literal">true</span>] = [];
foo // <span class="hljs-literal">true</span>

<span class="hljs-built_in">let</span> [x, y = <span class="hljs-string">&apos;b&apos;</span>] = [<span class="hljs-string">&apos;a&apos;</span>];
// x=<span class="hljs-string">&apos;a&apos;</span>, y=<span class="hljs-string">&apos;b&apos;</span></code></pre><h4>2.2 &#x5BF9;&#x8C61;</h4><p>&#x89E3;&#x6784;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { a, b } = { a: &quot;aaa&quot;, b: &quot;bbb&quot; };
a // &quot;aaa&quot;
b // &quot;bbb&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code><span class="hljs-symbol">let</span> { a, <span class="hljs-keyword">b </span>} = { a: <span class="hljs-string">&quot;aaa&quot;</span>, <span class="hljs-keyword">b: </span><span class="hljs-string">&quot;bbb&quot;</span> }<span class="hljs-comment">;</span>
a // <span class="hljs-string">&quot;aaa&quot;</span>
<span class="hljs-keyword">b </span>// <span class="hljs-string">&quot;bbb&quot;</span></code></pre><p>&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x53D8;&#x91CF;&#x7684;&#x53D6;&#x503C;&#x7531;&#x5B83; <strong>&#x6392;&#x5217;&#x7684;&#x4F4D;&#x7F6E;</strong> &#x51B3;&#x5B9A;&#xFF1B;&#x800C;&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;&#x53D8;&#x91CF;&#x5FC5;&#x987B;&#x4E0E; <strong>&#x5C5E;&#x6027;</strong> &#x540C;&#x540D;&#xFF0C;&#x624D;&#x80FD;&#x53D6;&#x5230;&#x6B63;&#x786E;&#x7684;&#x503C;&#x3002;</p><p>&#x5BF9;&#x8C61;&#x7684;&#x89E3;&#x6784;&#x4E5F;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {x = 3} = {};
x // 3

let {x, y = 5} = {x: 1};
x // 1
y // 5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> {x = <span class="hljs-number">3</span>} = {};
x // <span class="hljs-number">3</span>

<span class="hljs-keyword">let</span> {x, y = <span class="hljs-number">5</span>} = {x: <span class="hljs-number">1</span>};
x // <span class="hljs-number">1</span>
y // <span class="hljs-number">5</span></code></pre><h4>2.3 &#x5B57;&#x7B26;&#x4E32;</h4><p>&#x5B57;&#x7B26;&#x4E32;&#x4E5F;&#x53EF;&#x4EE5;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x88AB;&#x8F6C;&#x6362;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [a, b, c, d, e] = &apos;hello&apos;;
a // &quot;h&quot;
b // &quot;e&quot;
c // &quot;l&quot;
d // &quot;l&quot;
e // &quot;o&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code>const [a, b, c, d, e] = <span class="hljs-string">&apos;hello&apos;</span>;
a <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;h&quot;</span>
b <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;e&quot;</span>
c <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;l&quot;</span>
d <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;l&quot;</span>
e <span class="hljs-regexp">//</span> <span class="hljs-string">&quot;o&quot;</span></code></pre><h4>2.4 &#x7528;&#x9014;</h4><ol><li>&#x4EA4;&#x6362;&#x53D8;&#x91CF;&#x7684;&#x503C;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = 1;
let y = 2;

[x, y] = [y, x];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">y</span> = <span class="hljs-number">2</span>;

[x, y] = [y, x];</code></pre><ol><li>&#x4ECE;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x503C;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;

function example() {
  let [a, b, c] = [1, 2, 3]
  return  [a, b, c] 
}
let [a, b, c] = example();

// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> [a, b, c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
  <span class="hljs-keyword">return</span>  [a, b, c] 
}
<span class="hljs-keyword">let</span> [a, b, c] = example();

<span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">foo</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-number">2</span>
  };
}
<span class="hljs-keyword">let</span> { foo, bar } = example();</code></pre><ol><li>&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x503C;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function funA (a = 1, b = 2){
      return a + b;
}

funA(3) // 5 &#x56E0;&#x4E3A; a &#x662F; 3, b &#x662F; 2
funA(3&#xFF0C;3) // 6 &#x56E0;&#x4E3A; a &#x662F; 3, b &#x662F; 3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funA</span> <span class="hljs-params">(a = 1, b = 2)</span><span class="hljs-comment">{
      return a + b;
}</span>

<span class="hljs-title">funA</span><span class="hljs-params">(3)</span> <span class="hljs-comment">// 5 &#x56E0;&#x4E3A; a &#x662F; 3, b &#x662F; 2</span>
<span class="hljs-title">funA</span><span class="hljs-params">(3&#xFF0C;3)</span> <span class="hljs-comment">// 6 &#x56E0;&#x4E3A; a &#x662F; 3, b &#x662F; 3</span>
</span></code></pre><ol><li>&#x8F93;&#x5165;&#x6A21;&#x5757;&#x7684;&#x6307;&#x5B9A;&#x65B9;&#x6CD5;</li></ol><p>&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x5F80;&#x5F80;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x8F93;&#x5165;&#x54EA;&#x4E9B;&#x65B9;&#x6CD5;&#x3002;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x4F7F;&#x5F97;&#x8F93;&#x5165;&#x8BED;&#x53E5;&#x975E;&#x5E38;&#x6E05;&#x6670;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { SourceMapConsumer, SourceNode } = require(&quot;source-map&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> { SourceMapConsumer, SourceNode } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;source-map&quot;</span>);</code></pre><p>&#x5728; utils.js &#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const function A (){
    console.log(&apos;A&apos;)
}

export const function B (){
   console.log(&apos;B&apos;)
}

export const function C (){
     console.log(&apos;C&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;A&apos;</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span> (<span class="hljs-params"></span>)</span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;B&apos;</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span> (<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;C&apos;</span>)
}</code></pre><p>&#x5728; &#x7EC4;&#x4EF6;&#x4E2D;&#x5F15;&#x7528;&#x65F6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { A, B, C } from &quot;./utils.js&quot; 

//&#x8C03;&#x7528;
A() // &#x8F93;&#x51FA; A 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>import { A, B, C } from <span class="hljs-string">&quot;./utils.js&quot;</span> 

<span class="hljs-comment">//&#x8C03;&#x7528;</span>
<span class="hljs-function"><span class="hljs-title">A</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// &#x8F93;&#x51FA; A </span>
</code></pre><h2 id="articleHeader6">3. &#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#xFF08;template string&#xFF09;</h2><p>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#xFF08;template string&#xFF09;&#x7528;&#x53CD;&#x5F15;&#x53F7;&#xFF08;`&#xFF09;&#x6807;&#x8BC6;&#x3002;</p><h4>3.1 &#x7EAF;&#x5B57;&#x7B26;&#x4E32;</h4><p>&#x6240;&#x6709;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x7A7A;&#x683C;&#x548C;&#x6362;&#x884C;&#xFF0C;&#x90FD;&#x662F;&#x88AB;&#x4FDD;&#x7559;&#x7684;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`&#x8F93;&#x51FA;&#x503C;&#x4E3A; N, 

&#x6362;&#x884C;`)
// &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A; N

&#x6362;&#x884C;&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>console.log(`&#x8F93;&#x51FA;&#x503C;&#x4E3A; N, 

&#x6362;&#x884C;`)
<span class="hljs-comment">// &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A; N</span>

&#x6362;&#x884C;<span class="hljs-string">&quot;</span></code></pre><h4>3.2 &#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x52A0;&#x53D8;&#x91CF;</h4><p>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x5D4C;&#x5165;&#x53D8;&#x91CF;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x53D8;&#x91CF;&#x540D;&#x5199;&#x5728; ${ } &#x4E4B;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = 1;
let y = 2;

console.log(`&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;${x}`) // &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;1&quot;
console.log(`&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;${x + y}`) // &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;3&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> y = <span class="hljs-number">2</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;<span class="hljs-subst">${x}</span>`</span>) <span class="hljs-comment">// &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;1&quot;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;<span class="hljs-subst">${x + y}</span>`</span>) <span class="hljs-comment">// &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;3&quot;</span></code></pre><h4>3.3 &#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4E4B;&#x4E2D;&#x8FD8;&#x80FD;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x3002;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
  return &quot;Hello World&quot;;
}

console.log(`&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;${fn()}`) // &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;Hello World&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Hello World&quot;</span>;
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;<span class="hljs-subst">${fn()}</span>`</span>) <span class="hljs-comment">// &quot;&#x8F93;&#x51FA;&#x503C;&#x4E3A;&#xFF1A;Hello World&quot;</span></code></pre><h2 id="articleHeader7">4. &#x5B57;&#x7B26;&#x4E32;&#x51FD;&#x6570;&#x6269;&#x5C55;</h2><ul><li>includes()&#xFF1A;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x662F;&#x5426;&#x627E;&#x5230;&#x4E86;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x3002;</li><li>startsWith()&#xFF1A;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5728;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5934;&#x90E8;&#x3002;</li><li>endsWith()&#xFF1A;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5728;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5C3E;&#x90E8;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s = &apos;Hello world!&apos;;

s.startsWith(&apos;Hello&apos;) // true
s.endsWith(&apos;!&apos;) // true
s.includes(&apos;o&apos;) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code>let s = <span class="hljs-string">&apos;Hello world!&apos;</span>;

s.<span class="hljs-keyword">startsWith</span>(<span class="hljs-string">&apos;Hello&apos;</span>) <span class="hljs-comment">// true</span>
s.<span class="hljs-keyword">endsWith</span>(<span class="hljs-string">&apos;!&apos;</span>) <span class="hljs-comment">// true</span>
s.includes(<span class="hljs-string">&apos;o&apos;</span>) <span class="hljs-comment">// true</span></code></pre><p>&#x8FD9;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x652F;&#x6301;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x5F00;&#x59CB;&#x641C;&#x7D22;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s = &apos;Hello world!&apos;;

s.startsWith(&apos;world&apos;, 6) // true
s.endsWith(&apos;Hello&apos;, 5) // true
s.includes(&apos;Hello&apos;, 6) // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code>let s = <span class="hljs-string">&apos;Hello world!&apos;</span>;

s.<span class="hljs-keyword">startsWith</span>(<span class="hljs-string">&apos;world&apos;</span>, <span class="hljs-number">6</span>) <span class="hljs-comment">// true</span>
s.<span class="hljs-keyword">endsWith</span>(<span class="hljs-string">&apos;Hello&apos;</span>, <span class="hljs-number">5</span>) <span class="hljs-comment">// true</span>
s.includes(<span class="hljs-string">&apos;Hello&apos;</span>, <span class="hljs-number">6</span>) <span class="hljs-comment">// false</span></code></pre><h2 id="articleHeader8">5. &#x6570;&#x503C;&#x6269;&#x5C55;</h2><h4>5.1 &#x6307;&#x6570;&#x8FD0;&#x7B97;&#x7B26;</h4><p>ES2016 &#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;&#x6307;&#x6570;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;**&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2 ** 2 // 4
2 ** 3 // 8" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs basic"><code><span class="hljs-symbol">2 </span>** <span class="hljs-number">2</span> // <span class="hljs-number">4</span>
<span class="hljs-symbol">2 </span>** <span class="hljs-number">3</span> // <span class="hljs-number">8</span></code></pre><p>&#x8FD9;&#x4E2A;&#x8FD0;&#x7B97;&#x7B26;&#x7684;&#x4E00;&#x4E2A;&#x7279;&#x70B9;&#x662F;&#x53F3;&#x7ED3;&#x5408;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5E38;&#x89C1;&#x7684;&#x5DE6;&#x7ED3;&#x5408;&#x3002;&#x591A;&#x4E2A;&#x6307;&#x6570;&#x8FD0;&#x7B97;&#x7B26;&#x8FDE;&#x7528;&#x65F6;&#xFF0C;&#x662F;&#x4ECE;&#x6700;&#x53F3;&#x8FB9;&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x76F8;&#x5F53;&#x4E8E; 2 ** (3 ** 2)
2 ** 3 ** 2
// 512" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">// &#x76F8;&#x5F53;&#x4E8E; 2 ** (3 ** 2)</span>
<span class="hljs-number">2</span> ** <span class="hljs-number">3</span> ** <span class="hljs-number">2</span>
<span class="hljs-comment">// 512</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x9996;&#x5148;&#x8BA1;&#x7B97;&#x7684;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x6307;&#x6570;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x3002;</p><p>&#x6307;&#x6570;&#x8FD0;&#x7B97;&#x7B26;&#x53EF;&#x4EE5;&#x4E0E;&#x7B49;&#x53F7;&#x7ED3;&#x5408;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8D4B;&#x503C;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;**=&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1.5;
a **= 2;
// &#x7B49;&#x540C;&#x4E8E; a = a * a;

let b = 4;
b **= 3;
// &#x7B49;&#x540C;&#x4E8E; b = b * b * b;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let a = <span class="hljs-number">1.5</span>;
a **= <span class="hljs-number">2</span>;
<span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E; a = a * a;</span>

let b = <span class="hljs-number">4</span>;
b **= <span class="hljs-number">3</span>;
<span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E; b = b * b * b;</span></code></pre><h2 id="articleHeader9">6. &#x51FD;&#x6570;&#x7684;&#x6269;&#x5C55;</h2><p>&#x9664;&#x4E86;&#x5728;&#x89E3;&#x6784;&#x4E2D;&#x8BF4;&#x5230;&#x7684;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x8FD8;&#x6709;&#x4E0D;&#x5C11;&#x7ECF;&#x5E38;&#x4F1A;&#x7528;&#x5230;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><h4>6. 1 rest &#x53C2;&#x6570;</h4><p>ES6 &#x5F15;&#x5165; rest &#x53C2;&#x6570;&#xFF08;&#x5F62;&#x5F0F;&#x4E3A;...&#x53D8;&#x91CF;&#x540D;&#xFF09;&#xFF0C;&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x7684;&#x591A;&#x4F59;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528; arguments &#x5BF9;&#x8C61;&#x4E86;&#x3002;rest &#x53C2;&#x6570;&#x642D;&#x914D;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8BE5;&#x53D8;&#x91CF;&#x5C06;&#x591A;&#x4F59;&#x7684;&#x53C2;&#x6570;&#x653E;&#x5165;&#x6570;&#x7EC4;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(...values) {
  let sum = 0;

  for (let val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-rest_arg">...values</span>)</span> </span>{
  let sum = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">for</span> (let val of values) {
    sum += val;
  }

  <span class="hljs-keyword">return</span> sum;
}

add(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// 10</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7684; add &#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x6C42;&#x548C;&#x51FD;&#x6570;&#xFF0C;&#x5229;&#x7528; rest &#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x8BE5;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x4EFB;&#x610F;&#x6570;&#x76EE;&#x7684;&#x53C2;&#x6570;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF0C;rest &#x53C2;&#x6570;&#x4E4B;&#x540E;&#x4E0D;&#x80FD;&#x518D;&#x6709;&#x5176;&#x4ED6;&#x53C2;&#x6570;&#xFF08;&#x5373;&#x53EA;&#x80FD;&#x662F;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF09;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x62A5;&#x9519;
function f(a, ...b, c) {
  // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x62A5;&#x9519;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">(a, <span class="hljs-rest_arg">...b</span>, c)</span> </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre><h4>6.2 &#x7BAD;&#x5934;&#x51FD;&#x6570;</h4><p>ES6 &#x5141;&#x8BB8;&#x4F7F;&#x7528;&#x201C;&#x7BAD;&#x5934;&#x201D;&#xFF08;=&gt;&#xFF09;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const f = v =&gt; v;
console.log(&apos;&#x8F93;&#x51FA;&#x503C;:&apos;, f(3)) // &#x8F93;&#x51FA;&#x503C;: 3
// &#x7B49;&#x540C;&#x4E8E;
const f = function (v) {
  return v;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> f = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8F93;&#x51FA;&#x503C;:&apos;</span>, f(<span class="hljs-number">3</span>)) <span class="hljs-comment">// &#x8F93;&#x51FA;&#x503C;: 3</span>
<span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;</span>
<span class="hljs-keyword">const</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{
  <span class="hljs-keyword">return</span> v;
};</code></pre><p>&#x5982;&#x679C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0D;&#x9700;&#x8981;&#x53C2;&#x6570;&#x6216;&#x9700;&#x8981;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x5706;&#x62EC;&#x53F7;&#x4EE3;&#x8868;&#x53C2;&#x6570;&#x90E8;&#x5206;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B49;&#x540C;&#x4E8E;
const f = function () { return 5 };

const sum = (num1, num2) =&gt; num1 + num2;
// &#x7B49;&#x540C;&#x4E8E;
const sum = function(num1, num2) {
  return num1 + num2;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;</span>
<span class="hljs-keyword">const</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">5</span> };

<span class="hljs-keyword">const</span> sum = <span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span> num1 + num2;
<span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;</span>
<span class="hljs-keyword">const</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num1, num2</span>) </span>{
  <span class="hljs-keyword">return</span> num1 + num2;
};</code></pre><p>&#x5982;&#x679C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x90E8;&#x5206;&#x591A;&#x4E8E;&#x4E00;&#x6761;&#x8BED;&#x53E5;&#xFF0C;&#x5C31;&#x8981;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5C06;&#x5B83;&#x4EEC;&#x62EC;&#x8D77;&#x6765;&#xFF0C;&#x5E76;&#x4E14;&#x4F7F;&#x7528; return &#x8BED;&#x53E5;&#x8FD4;&#x56DE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sum = (num1, num2) =&gt; { return num1 + num2; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial">const sum = <span class="hljs-function"><span class="hljs-params">(num1, num2)</span> =&gt;</span> { <span class="hljs-keyword">return</span> num1 + num2; }</code></pre><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x4E00;&#x4E2A;&#x7528;&#x5904;&#x662F;&#x7B80;&#x5316;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const square = n =&gt; n * n;

// &#x6B63;&#x5E38;&#x51FD;&#x6570;&#x5199;&#x6CD5;
[1,2,3].map(function (x) {
  return x * x;
});

// &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5199;&#x6CD5;
[1,2,3].map(x =&gt; x * x);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> square = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n * n;

<span class="hljs-comment">// &#x6B63;&#x5E38;&#x51FD;&#x6570;&#x5199;&#x6CD5;</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x * x;
});

<span class="hljs-comment">// &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5199;&#x6CD5;</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x * x);</code></pre><p><strong>&#x6CE8;&#x610F;: &#x51FD;&#x6570;&#x4F53;&#x5185;&#x7684; this &#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x65F6;&#x6240;&#x5728;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4F7F;&#x7528;&#x65F6;&#x6240;&#x5728;&#x7684;&#x5BF9;&#x8C61;&#x3002;</strong></p><p>this &#x5BF9;&#x8C61;&#x7684;&#x6307;&#x5411;&#x662F;&#x53EF;&#x53D8;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x5B83;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  setTimeout(() =&gt; {
    console.log(&apos;id:&apos;, this.id);
  }, 100);
}

let id = 21;

foo.call({ id: 42 });
// id: 42" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;id:&apos;</span>, <span class="hljs-keyword">this</span>.id);
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-keyword">let</span> id = <span class="hljs-number">21</span>;

foo.call({ <span class="hljs-attr">id</span>: <span class="hljs-number">42</span> });
<span class="hljs-comment">// id: 42</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;setTimeout &#x7684;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x5B9A;&#x4E49;&#x751F;&#x6548;&#x662F;&#x5728; foo &#x51FD;&#x6570;&#x751F;&#x6210;&#x65F6;&#xFF0C;&#x800C;&#x5B83;&#x7684;&#x771F;&#x6B63;&#x6267;&#x884C;&#x8981;&#x7B49;&#x5230; 100 &#x6BEB;&#x79D2;&#x540E;&#x3002;&#x5982;&#x679C;&#x662F;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF0C;&#x6267;&#x884C;&#x65F6; this &#x5E94;&#x8BE5;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;window&#xFF0C;&#x8FD9;&#x65F6;&#x5E94;&#x8BE5;&#x8F93;&#x51FA; 21&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5BFC;&#x81F4; this &#x603B;&#x662F;&#x6307;&#x5411;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x751F;&#x6548;&#x65F6;&#x6240;&#x5728;&#x7684;&#x5BF9;&#x8C61;&#xFF08;&#x672C;&#x4F8B;&#x662F;{ id: 42}&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x8F93;&#x51FA;&#x7684;&#x662F; 42&#x3002;</p><h2 id="articleHeader10">7. &#x6570;&#x7EC4;&#x7684;&#x6269;&#x5C55;</h2><p>&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;spread&#xFF09;&#x662F;&#x4E09;&#x4E2A;&#x70B9;&#xFF08;...&#xFF09;&#x3002;&#x5B83;&#x597D;&#x6BD4; rest &#x53C2;&#x6570;&#x7684;&#x9006;&#x8FD0;&#x7B97;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x8F6C;&#x4E3A;&#x7528;&#x9017;&#x53F7;&#x5206;&#x9694;&#x7684;&#x53C2;&#x6570;&#x5E8F;&#x5217;&#x3002;</p><h4>7.1 &#x6570;&#x7EC4;&#x5408;&#x5E76;&#x7684;&#x65B0;&#x5199;&#x6CD5;&#x3002;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr1 = [&apos;a&apos;, &apos;b&apos;];
const arr2 = [&apos;c&apos;];
const arr3 = [&apos;d&apos;, &apos;e&apos;];

// ES5 &#x7684;&#x5408;&#x5E76;&#x6570;&#x7EC4;
arr1.concat(arr2, arr3);
// [ &apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;, &apos;e&apos; ]

// ES6 &#x7684;&#x5408;&#x5E76;&#x6570;&#x7EC4;
[...arr1, ...arr2, ...arr3]
// [ &apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;, &apos;e&apos; ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>const arr1 = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>];
const arr2 = [<span class="hljs-string">&apos;c&apos;</span>];
const arr3 = [<span class="hljs-string">&apos;d&apos;</span>, <span class="hljs-string">&apos;e&apos;</span>];

// <span class="hljs-symbol">ES5</span> &#x7684;&#x5408;&#x5E76;&#x6570;&#x7EC4;
arr1.concat(arr2, arr3);
// [ <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>, <span class="hljs-string">&apos;e&apos;</span> ]

// <span class="hljs-symbol">ES6</span> &#x7684;&#x5408;&#x5E76;&#x6570;&#x7EC4;
[...arr1, ...arr2, ...arr3]
// [ <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>, <span class="hljs-string">&apos;e&apos;</span> ]</code></pre><h4>7.2 &#x51FD;&#x6570;&#x8C03;&#x7528;&#x3002;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x, y) {
  return x + y;
}

const numbers = [4, 4];
add(...numbers) // 8" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(x, y)</span> </span>{
  <span class="hljs-keyword">return</span> x + y;
}

<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">4</span>, <span class="hljs-number">4</span>];
add(...numbers) <span class="hljs-comment">// 8</span></code></pre><h4>7.3 &#x590D;&#x5236;&#x6570;&#x7EC4;&#x7684;&#x7B80;&#x4FBF;&#x5199;&#x6CD5;&#x3002;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a1 = [1, 2];
// &#x5199;&#x6CD5;&#x4E00;
const a2 = [...a1];
a2[0] = 2;
a1 // [1, 2]
// &#x5199;&#x6CD5;&#x4E8C;
const [...a2] = a1;
a2[0] = 2;
a1 // [1, 2]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>const a1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E00;</span>
const a2 = [...a1];
a2[<span class="hljs-number">0</span>] = <span class="hljs-number">2</span>;
a1 <span class="hljs-comment">// [1, 2]</span>
<span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E8C;</span>
const [...a2] = a1;
a2[<span class="hljs-number">0</span>] = <span class="hljs-number">2</span>;
a1 <span class="hljs-comment">// [1, 2]</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#xFF0C;a2 &#x90FD;&#x662F; a1 &#x7684;&#x514B;&#x9686;&#xFF0C;&#x4E14;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x539F;&#x6765;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><h4>7.4 &#x5C06;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#x3002;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...&apos;hello&apos;]
// [ &quot;h&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot; ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>[...<span class="hljs-string">&apos;hello&apos;</span>]
// [ <span class="hljs-string">&quot;h&quot;</span>, <span class="hljs-string">&quot;e&quot;</span>, <span class="hljs-string">&quot;l&quot;</span>, <span class="hljs-string">&quot;l&quot;</span>, <span class="hljs-string">&quot;o&quot;</span> ]</code></pre><h4>7.5 &#x6570;&#x7EC4;&#x5B9E;&#x4F8B;&#x7684; entries()&#xFF0C;keys() &#x548C; values()</h4><p>&#x7528; for...of &#x5FAA;&#x73AF;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#x662F; keys() &#x662F;&#x5BF9;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x3001;values() &#x662F;&#x5BF9;&#x952E;&#x503C;&#x7684;&#x904D;&#x5386;&#xFF0C;entries() &#x662F;&#x5BF9;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index of [&apos;a&apos;, &apos;b&apos;].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of [&apos;a&apos;, &apos;b&apos;].values()) {
  console.log(elem);
}
// &apos;a&apos;
// &apos;b&apos;

for (let [index, elem] of [&apos;a&apos;, &apos;b&apos;].entries()) {
  console.log(index, elem);
}
// 0 &quot;a&quot;
// 1 &quot;b&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].keys()) {
  <span class="hljs-built_in">console</span>.log(index);
}
<span class="hljs-comment">// 0</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> elem <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].values()) {
  <span class="hljs-built_in">console</span>.log(elem);
}
<span class="hljs-comment">// &apos;a&apos;</span>
<span class="hljs-comment">// &apos;b&apos;</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [index, elem] <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].entries()) {
  <span class="hljs-built_in">console</span>.log(index, elem);
}
<span class="hljs-comment">// 0 &quot;a&quot;</span>
<span class="hljs-comment">// 1 &quot;b&quot;</span></code></pre><h4>7.6 includes()</h4><p>Array.prototype.includes &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x67D0;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5305;&#x542B;&#x7ED9;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x4E0E;&#x5B57;&#x7B26;&#x4E32;&#x7684; includes &#x65B9;&#x6CD5;&#x7C7B;&#x4F3C;&#x3002;ES2016 &#x5F15;&#x5165;&#x4E86;&#x8BE5;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">2</span>)     <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">4</span>)     <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, NaN].includes(NaN) <span class="hljs-comment">// true</span></code></pre><p>&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x8868;&#x793A;&#x641C;&#x7D22;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; 0&#x3002;&#x5982;&#x679C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x5219;&#x8868;&#x793A;&#x5012;&#x6570;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x65F6;&#x5B83;&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF08;&#x6BD4;&#x5982;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A; -4&#xFF0C;&#x4F46;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x4E3A; 3 &#xFF09;&#xFF0C;&#x5219;&#x4F1A;&#x91CD;&#x7F6E;&#x4E3A;&#x4ECE; 0 &#x5F00;&#x59CB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>, <span class="hljs-number">-1</span>); <span class="hljs-comment">// true</span></code></pre><h2 id="articleHeader11">8. &#x5BF9;&#x8C61;&#x7684;&#x6269;&#x5C55;</h2><h4>8.1 &#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5; &#x7684;&#x7B80;&#x6D01;&#x8868;&#x793A;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let birth = &apos;2000/01/01&apos;;

const Person = {

  name: &apos;&#x5F20;&#x4E09;&apos;,

  //&#x7B49;&#x540C;&#x4E8E;birth: birth
  birth,

  // &#x7B49;&#x540C;&#x4E8E;hello: function ()...
  hello() { console.log(&apos;&#x6211;&#x7684;&#x540D;&#x5B57;&#x662F;&apos;, this.name); }

};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> birth = <span class="hljs-string">&apos;2000/01/01&apos;</span>;

<span class="hljs-keyword">const</span> Person = {

  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>,

  <span class="hljs-comment">//&#x7B49;&#x540C;&#x4E8E;birth: birth</span>
  birth,

  <span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;hello: function ()...</span>
  hello() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x7684;&#x540D;&#x5B57;&#x662F;&apos;</span>, <span class="hljs-keyword">this</span>.name); }

};</code></pre><h4>8.2 Object.assign()</h4><p>Object.assign&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x7684;&#x5408;&#x5E76;&#xFF0C;&#x5C06;&#x6E90;&#x5BF9;&#x8C61;&#xFF08;source&#xFF09;&#x7684;&#x6240;&#x6709;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#xFF0C;&#x590D;&#x5236;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF08;target&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">target</span> = { a: 1 };

<span class="hljs-keyword">const</span> source1 = { b: 2 };
<span class="hljs-keyword">const</span> source2 = { c: 3 };

Object.assign(<span class="hljs-keyword">target</span>, source1, source2);
<span class="hljs-keyword">target</span> <span class="hljs-comment">// {a:1, b:2, c:3}</span></code></pre><p>Object.assign&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6E90;&#x5BF9;&#x8C61;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF0C;&#x5982;&#x679C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E0E;&#x6E90;&#x5BF9;&#x8C61;&#x6709;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x591A;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x6709;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x540E;&#x9762;&#x7684;&#x5C5E;&#x6027;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;&#x5C5E;&#x6027;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">target</span> = { a: 1, b: 1 };

<span class="hljs-keyword">const</span> source1 = { b: 2, c: 2 };
<span class="hljs-keyword">const</span> source2 = { c: 3 };

Object.assign(<span class="hljs-keyword">target</span>, source1, source2);
<span class="hljs-keyword">target</span> <span class="hljs-comment">// {a:1, b:2, c:3}</span></code></pre><p>Object.assign &#x65B9;&#x6CD5;&#x5B9E;&#x884C;&#x7684;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> obj1 = <span class="hljs-comment">{a: {b: 1}</span>};
<span class="hljs-keyword">const</span> obj2 = <span class="hljs-keyword">Object</span>.assign(<span class="hljs-comment">{}</span>, obj1);

obj1.a.b = <span class="hljs-number">2</span>;
obj2.a.b <span class="hljs-comment">// 2</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6E90;&#x5BF9;&#x8C61; obj1 &#x7684; a &#x5C5E;&#x6027;&#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;Object.assign &#x62F7;&#x8D1D;&#x5F97;&#x5230;&#x7684;&#x662F;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x3002;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x4EFB;&#x4F55;&#x53D8;&#x5316;&#xFF0C;&#x90FD;&#x4F1A;&#x53CD;&#x6620;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E0A;&#x9762;&#x3002;</p><h2 id="articleHeader12">9. Set</h2><p>ES6 &#x63D0;&#x4F9B;&#x4E86;&#x65B0;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784; Set&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F;&#x6210;&#x5458;&#x7684;&#x503C;&#x90FD;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x91CD;&#x590D;&#x7684;&#x503C;&#x3002;</p><p>Set &#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x751F;&#x6210; Set &#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x57FA;&#x672C;&#x7528;&#x6CD5;
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x =&gt; s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4


// &#x53BB;&#x9664;&#x6570;&#x7EC4;&#x7684;&#x91CD;&#x590D;&#x6210;&#x5458;
const array = [1, 1, 2, 3, 4, 4]
[...new Set(array)]
// [1, 2, 3, 4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">// &#x57FA;&#x672C;&#x7528;&#x6CD5;</span>
const s = new Set();

[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>].forEach(x =&gt; s.add(x));

for (let i of s) {
  console.log(i);
}
<span class="hljs-comment">// 2 3 5 4</span>


<span class="hljs-comment">// &#x53BB;&#x9664;&#x6570;&#x7EC4;&#x7684;&#x91CD;&#x590D;&#x6210;&#x5458;</span>
const array = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]
[...new Set(array)]
<span class="hljs-comment">// [1, 2, 3, 4]</span></code></pre><h2 id="articleHeader13">10. Promise &#x5BF9;&#x8C61;</h2><p>Promise &#x662F;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x4E00;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p><p>Promise &#x5BF9;&#x8C61;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF1A;pending&#xFF08;&#x8FDB;&#x884C;&#x4E2D;&#xFF09;&#x3001;fulfilled&#xFF08;&#x5DF2;&#x6210;&#x529F;&#xFF09;&#x548C;rejected&#xFF08;&#x5DF2;&#x5931;&#x8D25;&#xFF09;&#x3002;</p><p>Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x6539;&#x53D8;&#xFF0C;&#x53EA;&#x6709;&#x4E24;&#x79CD;&#x53EF;&#x80FD;&#xFF1A;&#x4ECE; pending &#x53D8;&#x4E3A; fulfilled &#x548C;&#x4ECE; pending &#x53D8;&#x4E3A;<br>rejected&#x3002;&#x53EA;&#x8981;&#x8FD9;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x53D1;&#x751F;&#xFF0C;&#x72B6;&#x6001;&#x5C31;&#x51DD;&#x56FA;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#x4E86;&#xFF0C;&#x4F1A;&#x4E00;&#x76F4;&#x4FDD;&#x6301;&#x8FD9;&#x4E2A;&#x7ED3;&#x679C;&#xFF0C;&#x8FD9;&#x65F6;&#x5C31;&#x79F0;&#x4E3A; resolved&#xFF08;&#x5DF2;&#x5B9A;&#x578B;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const someAsyncThing = function(flag) {
  return new Promise(function(resolve, reject) {
    if(flag){
        resolve(&apos;ok&apos;);
    }else{
        reject(&apos;error&apos;)
    }
  });
};

someAsyncThing(true).then((data)=&gt; {
  console.log(&apos;data:&apos;,data); // &#x8F93;&#x51FA; &apos;ok&apos;
}).catch((error)=&gt;{
  console.log(&apos;error:&apos;, error); // &#x4E0D;&#x6267;&#x884C;
})

someAsyncThing(false).then((data)=&gt; {
  console.log(&apos;data:&apos;,data); // &#x4E0D;&#x6267;&#x884C;
}).catch((error)=&gt;{
  console.log(&apos;error:&apos;, error); // &#x8F93;&#x51FA; &apos;error&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> someAsyncThing = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">flag</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">if</span>(flag){
        resolve(<span class="hljs-string">&apos;ok&apos;</span>);
    }<span class="hljs-keyword">else</span>{
        reject(<span class="hljs-string">&apos;error&apos;</span>)
    }
  });
};

someAsyncThing(<span class="hljs-literal">true</span>).then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;data:&apos;</span>,data); <span class="hljs-comment">// &#x8F93;&#x51FA; &apos;ok&apos;</span>
}).catch(<span class="hljs-function">(<span class="hljs-params">error</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error:&apos;</span>, error); <span class="hljs-comment">// &#x4E0D;&#x6267;&#x884C;</span>
})

someAsyncThing(<span class="hljs-literal">false</span>).then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;data:&apos;</span>,data); <span class="hljs-comment">// &#x4E0D;&#x6267;&#x884C;</span>
}).catch(<span class="hljs-function">(<span class="hljs-params">error</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error:&apos;</span>, error); <span class="hljs-comment">// &#x8F93;&#x51FA; &apos;error&apos;</span>
})</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;someAsyncThing &#x51FD;&#x6570;&#x6210;&#x529F;&#x8FD4;&#x56DE; &#x2018;OK&#x2019;, &#x5931;&#x8D25;&#x8FD4;&#x56DE; &#x2018;error&#x2019;, &#x53EA;&#x6709;&#x5931;&#x8D25;&#x65F6;&#x624D;&#x4F1A;&#x88AB; catch &#x6355;&#x6349;&#x5230;&#x3002;</p><p>&#x6700;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x53D1;&#x8D77;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;
    fetch(&apos;/api/todos&apos;)
      .then(res =&gt; res.json())
      .then(data =&gt; ({ data }))
      .catch(err =&gt; ({ err }));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x53D1;&#x8D77;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;</span>
    fetch(<span class="hljs-string">&apos;/api/todos&apos;</span>)
      .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> ({ data }))
      .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> ({ err }));</code></pre><p>&#x6765;&#x770B;&#x4E00;&#x9053;&#x6709;&#x610F;&#x601D;&#x7684;&#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i&lt;10000 ; i++ ) {
    i == 9999 &amp;&amp; resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}, <span class="hljs-number">0</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">executor</span>(<span class="hljs-params">resolve</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span> ; i&lt;<span class="hljs-number">10000</span> ; i++ ) {
    i == <span class="hljs-number">9999</span> &amp;&amp; resolve();
  }
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);</code></pre><p>&#x8FD9;&#x9053;&#x9898;&#x5E94;&#x8BE5;&#x8003;&#x5BDF; JavaScript &#x7684;&#x8FD0;&#x884C;&#x673A;&#x5236;&#x7684;&#x3002;<br>&#x9996;&#x5148;&#x5148;&#x78B0;&#x5230;&#x4E00;&#x4E2A; setTimeout&#xFF0C;&#x4E8E;&#x662F;&#x4F1A;&#x5148;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#xFF0C;&#x5728;&#x5B9A;&#x65F6;&#x7ED3;&#x675F;&#x540E;&#x5C06;&#x4F20;&#x9012;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x653E;&#x5230;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x91CC;&#x9762;&#xFF0C;&#x56E0;&#x6B64;&#x5F00;&#x59CB;&#x80AF;&#x5B9A;&#x4E0D;&#x4F1A;&#x8F93;&#x51FA; 1 &#x3002;<br>&#x7136;&#x540E;&#x662F;&#x4E00;&#x4E2A; Promise&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x51FD;&#x6570;&#x662F;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5E94;&#x8BE5;&#x76F4;&#x63A5;&#x8F93;&#x51FA; 2 3 &#x3002;<br>&#x7136;&#x540E;&#xFF0C;Promise &#x7684; then &#x5E94;&#x5F53;&#x4F1A;&#x653E;&#x5230;&#x5F53;&#x524D; tick &#x7684;&#x6700;&#x540E;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x5728;&#x5F53;&#x524D; tick &#x4E2D;&#x3002;<br>&#x56E0;&#x6B64;&#xFF0C;&#x5E94;&#x5F53;&#x5148;&#x8F93;&#x51FA; 5&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8F93;&#x51FA; 4 &#x3002;<br>&#x6700;&#x540E;&#x5728;&#x5230;&#x4E0B;&#x4E00;&#x4E2A; tick&#xFF0C;&#x5C31;&#x662F; 1 &#x3002;<br>&#x7B54;&#x6848;&#xFF1A;<code>&#x201C;2 3 5 4 1&#x201D;</code></p><h2 id="articleHeader14">11. async &#x51FD;&#x6570;</h2><p>ES2017 &#x6807;&#x51C6;&#x5F15;&#x5165;&#x4E86; async &#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x5F97;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x3002;</p><p>async &#x51FD;&#x6570;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x666E;&#x901A;&#x51FD;&#x6570;&#x524D;&#x9762;&#x52A0;&#x4E0A; async&#xFF0C;&#x8868;&#x793A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x8981;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#x8BED;&#x53E5;&#x524D;&#x9762;&#x52A0;&#x4E0A; await&#xFF0C;&#x8868;&#x793A;&#x540E;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x9700;&#x8981;&#x7B49;&#x5F85;&#x3002;async &#x662F; Generator &#x7684;&#x8BED;&#x6CD5;&#x7CD6;</p><ul><li><ol><li>async &#x51FD;&#x6570;&#x5185;&#x90E8; return &#x8BED;&#x53E5;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#xFF0C;&#x4F1A;&#x6210;&#x4E3A; then &#x65B9;&#x6CD5;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x3002;</li></ol></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
  return &apos;hello world&apos;;
}

f().then(v =&gt; console.log(v))
// &quot;hello world&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;hello world&apos;</span>;
}

f().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v))
<span class="hljs-comment">// &quot;hello world&quot;</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570; f &#x5185;&#x90E8; return &#x547D;&#x4EE4;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#xFF0C;&#x4F1A;&#x88AB; then &#x65B9;&#x6CD5;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x5230;&#x3002;</p><ul><li><ol><li>async &#x51FD;&#x6570;&#x5185;&#x90E8;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x8FD4;&#x56DE;&#x7684; Promise &#x5BF9;&#x8C61;&#x53D8;&#x4E3A; reject &#x72B6;&#x6001;&#x3002;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB; catch &#x65B9;&#x6CD5;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x5230;&#x3002;</li></ol></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
  throw new Error(&apos;&#x51FA;&#x9519;&#x4E86;&apos;);
}

f().then(
  result =&gt; console.log(result),
  error =&gt; console.log(error)
)
// Error: &#x51FA;&#x9519;&#x4E86;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;&#x51FA;&#x9519;&#x4E86;&apos;</span>);
}

f().then(
  <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(result),
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(error)
)
<span class="hljs-comment">// Error: &#x51FA;&#x9519;&#x4E86;</span></code></pre><ul><li><ol><li>async &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x5FC5;&#x987B;&#x7B49;&#x5230;&#x5185;&#x90E8;&#x6240;&#x6709; await &#x547D;&#x4EE4;&#x540E;&#x9762;&#x7684; Promise &#x5BF9;&#x8C61;&#x6267;&#x884C;&#x5B8C;&#xFF0C;&#x624D;&#x4F1A;&#x53D1;&#x751F;&#x72B6;&#x6001;&#x6539;&#x53D8;&#xFF0C;&#x9664;&#x975E;&#x9047;&#x5230; return &#x8BED;&#x53E5;&#x6216;&#x8005;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x53EA;&#x6709; async &#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6267;&#x884C;&#x5B8C;&#xFF0C;&#x624D;&#x4F1A;&#x6267;&#x884C; then &#x65B9;&#x6CD5;&#x6307;&#x5B9A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</li></ol></li></ul><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/&lt;title&gt;([\s\S]+)&lt;\/title&gt;/i)[1];
}
getTitle(&apos;https://tc39.github.io/ecma262/&apos;).then(console.log(&apos;&#x5B8C;&#x6210;&apos;))
// &quot;ECMAScript 2017 Language Specification&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTitle</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-built_in">url</span>);
  <span class="hljs-keyword">let</span> html = <span class="hljs-keyword">await</span> response.text();
  <span class="hljs-keyword">return</span> html.match(<span class="hljs-regexp">/&lt;title&gt;([\s\S]+)&lt;\/title&gt;/i</span>)[<span class="hljs-number">1</span>];
}
getTitle(<span class="hljs-string">&apos;https://tc39.github.io/ecma262/&apos;</span>).then(<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5B8C;&#x6210;&apos;</span>))
<span class="hljs-comment">// &quot;ECMAScript 2017 Language Specification&quot;</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570; getTitle &#x5185;&#x90E8;&#x6709;&#x4E09;&#x4E2A;&#x64CD;&#x4F5C;&#xFF1A;&#x6293;&#x53D6;&#x7F51;&#x9875;&#x3001;&#x53D6;&#x51FA;&#x6587;&#x672C;&#x3001;&#x5339;&#x914D;&#x9875;&#x9762;&#x6807;&#x9898;&#x3002;&#x53EA;&#x6709;&#x8FD9;&#x4E09;&#x4E2A;&#x64CD;&#x4F5C;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#xFF0C;&#x624D;&#x4F1A;&#x6267;&#x884C; then &#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x7684; console.log&#x3002;</p><ul><li><ol><li>&#x5728; vue &#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x8981;&#x5148;&#x83B7;&#x53D6; token &#xFF0C;&#x4E4B;&#x540E;&#x518D;&#x7528; token &#x6765;&#x8BF7;&#x6C42;&#x7528;&#x6237;&#x6570;&#x636E;&#x4EC0;&#x4E48;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B50;&#x7528;&#xFF1A;</li></ol></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
        getToken() {
            return new Promise((resolve, reject) =&gt; {
                this.$http.post(&apos;/token&apos;)
                    .then(res =&gt; {
                        if (res.data.code === 200) {
                           resolve(res.data.data)
                        } else {
                            reject()
                        }
                    })
                    .catch(error =&gt; {
                        console.error(error);
                    });
            })
       },
       getUserInfo(token) {
            return new Promise((resolve, reject) =&gt; {
                this.$http.post(&apos;/userInfo&apos;,{
                        token: token
                    })
                    .then(res =&gt; {
                        if (res.data.code === 200) {
                           resolve(res.data.data)
                        } else {
                            reject()
                        }
                    })
                    .catch(error =&gt; {
                        console.error(error);
                    });
            })
       },
       async initData() {
            let token = await this.getToken()
            this.userInfo = this.getUserInfo(token)
       },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>methods:{
        getToken() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">&apos;/token&apos;</span>)
                    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                        <span class="hljs-keyword">if</span> (res.data.code === <span class="hljs-number">200</span>) {
                           resolve(res.data.data)
                        } <span class="hljs-keyword">else</span> {
                            reject()
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                        <span class="hljs-built_in">console</span>.error(error);
                    });
            })
       },
       getUserInfo(token) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">&apos;/userInfo&apos;</span>,{
                        <span class="hljs-attr">token</span>: token
                    })
                    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                        <span class="hljs-keyword">if</span> (res.data.code === <span class="hljs-number">200</span>) {
                           resolve(res.data.data)
                        } <span class="hljs-keyword">else</span> {
                            reject()
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                        <span class="hljs-built_in">console</span>.error(error);
                    });
            })
       },
       <span class="hljs-keyword">async</span> initData() {
            <span class="hljs-keyword">let</span> token = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getToken()
            <span class="hljs-keyword">this</span>.userInfo = <span class="hljs-keyword">this</span>.getUserInfo(token)
       },
}</code></pre><h2 id="articleHeader15">12. import &#x548C; export</h2><p>import &#x5BFC;&#x5165;&#x6A21;&#x5757;&#x3001;export &#x5BFC;&#x51FA;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// example2.js  // &#x5BFC;&#x51FA;&#x9ED8;&#x8BA4;, &#x6709;&#x4E14;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;
export default const example2 = {
  name : &apos;my name&apos;,
  age : &apos;my age&apos;,
  getName  = function(){  return &apos;my name&apos; }
}
//&#x5168;&#x90E8;&#x5BFC;&#x5165; // &#x540D;&#x5B57;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;
import people from &apos;./example2.js&apos;

-------------------&#x6211;&#x662F;&#x4E00;&#x6761;&#x534E;&#x4E3D;&#x7684;&#x5206;&#x754C;&#x7EBF;---------------------------

// example1.js // &#x90E8;&#x5206;&#x5BFC;&#x51FA;
export let name  = &apos;my name&apos;
export let age  = &apos;my age&apos;
export let getName  = function(){ return &apos;my name&apos;}

// &#x5BFC;&#x5165;&#x90E8;&#x5206; // &#x540D;&#x5B57;&#x5FC5;&#x987B;&#x548C; &#x5B9A;&#x4E49;&#x7684;&#x540D;&#x5B57;&#x4E00;&#x6837;&#x3002;
import  {name, age} from &apos;./example1.js&apos;

//&#x6709;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF0C;&#x5373;&#x5141;&#x8BB8;&#x4F60;&#x5C06;&#x6574;&#x4E2A;&#x6A21;&#x5757;&#x5F53;&#x4F5C;&#x5355;&#x4E00;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x5BFC;&#x5165;
//&#x8BE5;&#x6A21;&#x5757;&#x7684;&#x6240;&#x6709;&#x5BFC;&#x51FA;&#x90FD;&#x4F1A;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x5B58;&#x5728;
import * as example from &quot;./example1.js&quot;
console.log(example.name)
console.log(example.age)
console.log(example.getName())

-------------------&#x6211;&#x662F;&#x4E00;&#x6761;&#x534E;&#x4E3D;&#x7684;&#x5206;&#x754C;&#x7EBF;---------------------------

// example3.js  // &#x6709;&#x5BFC;&#x51FA;&#x9ED8;&#x8BA4;, &#x6709;&#x4E14;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#xFF0C;// &#x53C8;&#x6709;&#x90E8;&#x5206;&#x5BFC;&#x51FA;
export default const example3 = {
  birthday : &apos;2018 09 20&apos;
}
export let name  = &apos;my name&apos;
export let age  = &apos;my age&apos;
export let getName  = function(){ return &apos;my name&apos;}

// &#x5BFC;&#x5165;&#x9ED8;&#x8BA4;&#x4E0E;&#x90E8;&#x5206;
import example3, {name, age} from &apos;./example1.js&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// example2.js  // &#x5BFC;&#x51FA;&#x9ED8;&#x8BA4;, &#x6709;&#x4E14;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">const</span> example2 = {
  <span class="hljs-attr">name</span> : <span class="hljs-string">&apos;my name&apos;</span>,
  <span class="hljs-attr">age</span> : <span class="hljs-string">&apos;my age&apos;</span>,
  getName  = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;my name&apos;</span> }
}
<span class="hljs-comment">//&#x5168;&#x90E8;&#x5BFC;&#x5165; // &#x540D;&#x5B57;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;</span>
<span class="hljs-keyword">import</span> people <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./example2.js&apos;</span>

-------------------&#x6211;&#x662F;&#x4E00;&#x6761;&#x534E;&#x4E3D;&#x7684;&#x5206;&#x754C;&#x7EBF;---------------------------

<span class="hljs-comment">// example1.js // &#x90E8;&#x5206;&#x5BFC;&#x51FA;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> name  = <span class="hljs-string">&apos;my name&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> age  = <span class="hljs-string">&apos;my age&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> getName  = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;my name&apos;</span>}

<span class="hljs-comment">// &#x5BFC;&#x5165;&#x90E8;&#x5206; // &#x540D;&#x5B57;&#x5FC5;&#x987B;&#x548C; &#x5B9A;&#x4E49;&#x7684;&#x540D;&#x5B57;&#x4E00;&#x6837;&#x3002;</span>
<span class="hljs-keyword">import</span>  {name, age} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./example1.js&apos;</span>

<span class="hljs-comment">//&#x6709;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF0C;&#x5373;&#x5141;&#x8BB8;&#x4F60;&#x5C06;&#x6574;&#x4E2A;&#x6A21;&#x5757;&#x5F53;&#x4F5C;&#x5355;&#x4E00;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x5BFC;&#x5165;</span>
<span class="hljs-comment">//&#x8BE5;&#x6A21;&#x5757;&#x7684;&#x6240;&#x6709;&#x5BFC;&#x51FA;&#x90FD;&#x4F1A;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x5B58;&#x5728;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> example <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./example1.js&quot;</span>
<span class="hljs-built_in">console</span>.log(example.name)
<span class="hljs-built_in">console</span>.log(example.age)
<span class="hljs-built_in">console</span>.log(example.getName())

-------------------&#x6211;&#x662F;&#x4E00;&#x6761;&#x534E;&#x4E3D;&#x7684;&#x5206;&#x754C;&#x7EBF;---------------------------

<span class="hljs-comment">// example3.js  // &#x6709;&#x5BFC;&#x51FA;&#x9ED8;&#x8BA4;, &#x6709;&#x4E14;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#xFF0C;// &#x53C8;&#x6709;&#x90E8;&#x5206;&#x5BFC;&#x51FA;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">const</span> example3 = {
  <span class="hljs-attr">birthday</span> : <span class="hljs-string">&apos;2018 09 20&apos;</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> name  = <span class="hljs-string">&apos;my name&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> age  = <span class="hljs-string">&apos;my age&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> getName  = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;my name&apos;</span>}

<span class="hljs-comment">// &#x5BFC;&#x5165;&#x9ED8;&#x8BA4;&#x4E0E;&#x90E8;&#x5206;</span>
<span class="hljs-keyword">import</span> example3, {name, age} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./example1.js&apos;</span>
</code></pre><p>&#x603B;&#x7ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x5F53;&#x7528; export default people &#x5BFC;&#x51FA;&#x65F6;&#xFF0C;&#x5C31;&#x7528; import people &#x5BFC;&#x5165;&#xFF08;&#x4E0D;&#x5E26;&#x5927;&#x62EC;&#x53F7;&#xFF09;

2.&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x6709;&#x4E14;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A; export default&#x3002;&#x4F46;&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A; export&#x3002;

3.&#x5F53;&#x7528; export name &#x65F6;&#xFF0C;&#x5C31;&#x7528; import { name }&#x5BFC;&#x5165;&#xFF08;&#x8BB0;&#x5F97;&#x5E26;&#x4E0A;&#x5927;&#x62EC;&#x53F7;&#xFF09;

4.&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x65E2;&#x6709;&#x4E00;&#x4E2A; export default people, &#x53C8;&#x6709;&#x591A;&#x4E2A; export name &#x6216;&#x8005; export age &#x65F6;&#xFF0C;&#x5BFC;&#x5165;&#x5C31;&#x7528; import people, { name, age } 

5.&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x51FA;&#x73B0; n &#x591A;&#x4E2A; export &#x5BFC;&#x51FA;&#x5F88;&#x591A;&#x6A21;&#x5757;&#xFF0C;&#x5BFC;&#x5165;&#x65F6;&#x9664;&#x4E86;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528; import * as example
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-number">1.</span>&#x5F53;&#x7528; <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> people &#x5BFC;&#x51FA;&#x65F6;&#xFF0C;&#x5C31;&#x7528; <span class="hljs-keyword">import</span> people &#x5BFC;&#x5165;&#xFF08;&#x4E0D;&#x5E26;&#x5927;&#x62EC;&#x53F7;&#xFF09;

<span class="hljs-number">2.</span>&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x6709;&#x4E14;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A; <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>&#x3002;&#x4F46;&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A; <span class="hljs-keyword">export</span>&#x3002;

<span class="hljs-number">3.</span>&#x5F53;&#x7528; <span class="hljs-keyword">export</span> name &#x65F6;&#xFF0C;&#x5C31;&#x7528; <span class="hljs-keyword">import</span> { name }&#x5BFC;&#x5165;&#xFF08;&#x8BB0;&#x5F97;&#x5E26;&#x4E0A;&#x5927;&#x62EC;&#x53F7;&#xFF09;

<span class="hljs-number">4.</span>&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x65E2;&#x6709;&#x4E00;&#x4E2A; <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> people, &#x53C8;&#x6709;&#x591A;&#x4E2A; <span class="hljs-keyword">export</span> name &#x6216;&#x8005; <span class="hljs-keyword">export</span> age &#x65F6;&#xFF0C;&#x5BFC;&#x5165;&#x5C31;&#x7528; <span class="hljs-keyword">import</span> people, { name, age } 

<span class="hljs-number">5.</span>&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x51FA;&#x73B0; n &#x591A;&#x4E2A; <span class="hljs-keyword">export</span> &#x5BFC;&#x51FA;&#x5F88;&#x591A;&#x6A21;&#x5757;&#xFF0C;&#x5BFC;&#x5165;&#x65F6;&#x9664;&#x4E86;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528; <span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> example
</code></pre><h2 id="articleHeader16">13. Class</h2><p>&#x5BF9;&#x4E8E; Class &#xFF0C;&#x5C0F;&#x6C6A;&#x7528;&#x5728; react &#x4E2D;&#x8F83;&#x591A;&#x3002;</p><h4>13.1&#x57FA;&#x672C;&#x7528;&#x6CD5;&#xFF1A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B9A;&#x4E49;&#x7C7B;
class FunSum {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  sum() {
    console.log( this.x +this.y&apos;)
  }
}

// &#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x662F;&#x76F4;&#x63A5;&#x5BF9;&#x7C7B;&#x4F7F;&#x7528;new&#x547D;&#x4EE4;&#xFF0C;&#x8DDF;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x7528;&#x6CD5;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#x3002;
let f = new FunSum(10, 20);
f.sum() // 30" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code><span class="hljs-comment">//&#x5B9A;&#x4E49;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FunSum</span> {</span>
  constructor(x, y) {
    <span class="hljs-literal">this</span>.x = x;
    <span class="hljs-literal">this</span>.y = y;
  }
  sum() {
    console.log( <span class="hljs-literal">this</span>.x +<span class="hljs-literal">this</span>.y&apos;)
  }
}

<span class="hljs-comment">// &#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x662F;&#x76F4;&#x63A5;&#x5BF9;&#x7C7B;&#x4F7F;&#x7528;new&#x547D;&#x4EE4;&#xFF0C;&#x8DDF;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x7528;&#x6CD5;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#x3002;</span>
<span class="hljs-keyword">let</span> f = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">FunSum</span>(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);
<span class="hljs-title">f</span>.<span class="hljs-title">sum</span>() <span class="hljs-comment">// 30</span></span></code></pre><h4>13.2 &#x7EE7;&#x627F;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + &apos; &apos; + super.toString(); // &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;toString()
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorPoint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Point</span> </span>{
  constructor(x, y, color) {
    <span class="hljs-keyword">super</span>(x, y); <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;constructor(x, y)</span>
    <span class="hljs-keyword">this</span>.color = color;
  }

  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.color + &apos; &apos; + <span class="hljs-keyword">super</span>.toString(); <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;toString()</span>
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;constructor &#x65B9;&#x6CD5;&#x548C; toString &#x65B9;&#x6CD5;&#x4E4B;&#x4E2D;&#xFF0C;&#x90FD;&#x51FA;&#x73B0;&#x4E86;super&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x5B83;&#x5728;&#x8FD9;&#x91CC;&#x8868;&#x793A;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x65B0;&#x5EFA;&#x7236;&#x7C7B;&#x7684; this &#x5BF9;&#x8C61;&#x3002;</p><p>&#x5B50;&#x7C7B;&#x5FC5;&#x987B;&#x5728; constructor &#x65B9;&#x6CD5;&#x4E2D;&#x8C03;&#x7528; super &#x65B9;&#x6CD5;&#xFF0C;&#x5426;&#x5219;&#x65B0;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5B50;&#x7C7B;&#x81EA;&#x5DF1;&#x7684; this &#x5BF9;&#x8C61;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x901A;&#x8FC7;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5B8C;&#x6210;&#x5851;&#x9020;&#xFF0C;&#x5F97;&#x5230;&#x4E0E;&#x7236;&#x7C7B;&#x540C;&#x6837;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x52A0;&#x5DE5;&#xFF0C;&#x52A0;&#x4E0A;&#x5B50;&#x7C7B;&#x81EA;&#x5DF1;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;<strong>&#x5982;&#x679C;&#x4E0D;&#x8C03;&#x7528; super &#x65B9;&#x6CD5;&#xFF0C;&#x5B50;&#x7C7B;&#x5C31;&#x5F97;&#x4E0D;&#x5230; this &#x5BF9;&#x8C61;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{ <span class="hljs-comment">/* ... */</span> }

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorPoint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Point</span> </span>{
  constructor() {
  }
}

let cp = <span class="hljs-keyword">new</span> <span class="hljs-type">ColorPoint</span>(); <span class="hljs-comment">// ReferenceError</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;ColorPoint &#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B; Point&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8C03;&#x7528; super &#x65B9;&#x6CD5;&#xFF0C;&#x5BFC;&#x81F4;&#x65B0;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x62A5;&#x9519;&#x3002;</p><h1 id="articleHeader17">&#x6700;&#x540E;</h1><p>&#x603B;&#x7ED3;&#x548C;&#x5199;&#x535A;&#x5BA2;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x5B66;&#x4E60;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x4EAB;&#x53D7;&#x7684;&#x8FC7;&#x7A0B; &#xFF01;&#xFF01;&#xFF01;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x9762;&#x8BD5;&#x548C;&#x5DE5;&#x4F5C;&#x4E2D;&#x7528;&#x5230; ES6 &#x7CBE;&#x7CB9;&#x51E0;&#x4E4E;&#x90FD;&#x5728;&#x8FD9;&#x4E86;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x8BE5;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5230;&#x6211;&#x7684; github star &#x4E00;&#x4E0B;&#xFF0C;&#x8C22;&#x8C22;&#x3002;<br><a href="https://github.com/biaochenxuying/blog" rel="nofollow noreferrer" target="_blank">github &#x5730;&#x5740;</a></p><p>&#x6587;&#x7AE0;&#x5F88;&#x591A;&#x5185;&#x5BB9;&#x53C2;&#x8003;&#x4E86;&#xFF1A;<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x6807;&#x51C6;&#x5165;&#x95E8;</a></p><p>&#x5982;&#x679C;&#x4F60;&#x662F; JavaScript &#x8BED;&#x8A00;&#x7684;&#x521D;&#x5B66;&#x8005;&#xFF0C;&#x5EFA;&#x8BAE;&#x5148;&#x770B; <a href="https://wangdoc.com/javascript/" rel="nofollow noreferrer" target="_blank">&#x300A;JavaScript &#x8BED;&#x8A00;&#x5165;&#x95E8;&#x6559;&#x7A0B;&#x300B;</a></p><p>&#x4F60;&#x4EE5;&#x4E3A;&#x672C;&#x6587;&#x5C31;&#x8FD9;&#x4E48;&#x7ED3;&#x675F;&#x4E86; ? <strong>&#x7CBE;&#x5F69;&#x5728;&#x540E;&#x9762; &#xFF01;&#xFF01;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016460783" src="https://static.alili.tech/img/remote/1460000016460783" alt="" title="" style="cursor:pointer"></span></p><p>&#x5BF9; &#x5168;&#x6808;&#x5F00;&#x53D1; &#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x626B;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;</p><p>&#x6211;&#x4F1A;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x6709;&#x4EF7;&#x503C;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><blockquote>&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;BiaoChenXuYing<br>&#x5206;&#x4EAB; &#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x3001;&#x540E;&#x7AEF;&#x5F00;&#x53D1; &#x7B49;&#x76F8;&#x5173;&#x7684;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x70ED;&#x70B9;&#x8D44;&#x6E90;&#xFF0C;&#x5168;&#x6808;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x6210;&#x957F;&#x4E4B;&#x8DEF;&#x3002;</blockquote><p>&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#x5E76;&#x56DE;&#x590D; <strong>&#x798F;&#x5229;</strong> &#x4FBF;&#x514D;&#x8D39;&#x9001;&#x4F60;&#x89C6;&#x9891;&#x8D44;&#x6E90;&#xFF0C;&#x7EDD;&#x5BF9;&#x5E72;&#x8D27;&#x3002;</p><p>&#x798F;&#x5229;&#x8BE6;&#x60C5;&#x8BF7;&#x70B9;&#x51FB;&#xFF1A; <a href="https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&amp;mid=2247483711&amp;idx=1&amp;sn=1ffb576159805e92fc57f5f1120fce3a&amp;chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&amp;token=1560489745&amp;lang=zh_CN#rd" rel="nofollow noreferrer" target="_blank">&#x514D;&#x8D39;&#x8D44;&#x6E90;&#x5206;&#x4EAB;--Python&#x3001;Java&#x3001;Linux&#x3001;Go&#x3001;node&#x3001;vue&#x3001;react&#x3001;javaScript</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016505245" src="https://static.alili.tech/img/remote/1460000016505245" alt="BiaoChenXuYing" title="BiaoChenXuYing" style="cursor:pointer"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
那些必会用到的 ES6 精粹

## 原文链接
[https://segmentfault.com/a/1190000016460779](https://segmentfault.com/a/1190000016460779)


---
title: 'Set & Map：新生的数据集合及其弱引用衍生' 
date: 2018-11-17 14:34:54
hidden: true
slug: zr267wmwtoe
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>ES6&#x65B0;&#x589E;&#x4E86;&#x4E24;&#x79CD;&#x57FA;&#x672C;&#x7684;&#x539F;&#x751F;&#x6570;&#x636E;&#x96C6;&#x5408;&#xFF1A;<code>Set</code>&#x548C;<code>Map</code>&#xFF08;&#x52A0;&#x4E0A;<code>Array</code>&#x548C;<code>Object</code>&#x73B0;&#x5728;&#x5171;&#x6709;&#x56DB;&#x79CD;&#xFF09;&#xFF0C;&#x4EE5;&#x53CA;&#x7531;&#x4E24;&#x8005;&#x884D;&#x751F;&#x51FA;&#x7684;&#x5F31;&#x5F15;&#x7528;&#x96C6;&#x5408;&#xFF1A;<code>WeakSet</code>&#x548C;<code>WeakMap</code>&#x3002;&#x4ECE;&#x67D0;&#x4E2A;&#x4E0D;&#x65E0;&#x72ED;&#x9698;&#x7684;&#x89D2;&#x5EA6;&#x770B;&#xFF08;&#x4E0D;&#x65E0;&#x72ED;&#x9698;&#xFF1F;&#x5230;&#x5E95;&#x6709;&#x591A;&#x72ED;&#x9698;&#x591A;&#x4E0D;&#x72ED;&#x9698;&#x5462;&#xFF1F;&#xFF09;&#xFF0C;<code>Set</code>&#x66F4;&#x4E3A;&#x7C7B;&#x4F3C;<code>Array</code>&#x96C6;&#x5408;&#x7684;&#x67D0;&#x79CD;&#x63D0;&#x5347;&#xFF0C;&#x800C;<code>Map</code>&#x5219;&#x4E3A;<code>Object</code>&#x96C6;&#x5408;&#x7684;&#x589E;&#x5F3A;&#xFF0C;&#x867D;&#x7136;&#x4E24;&#x7C7B;&#x5728;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x4E0D;&#x76F8;&#x540C;&#x3002;</p><h2 id="articleHeader1">1 Set</h2><p>&#x5176;&#x672C;&#x8EAB;&#x662F;&#x751F;&#x6210;<code>Set</code>&#x5B9E;&#x4F8B;&#xFF08;&#x6570;&#x636E;&#x96C6;&#x5408;&#xFF09;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF08;&#x6216;&#x5177;&#x6709;<code>iterable</code>&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF09;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x7528;&#x6765;&#x521D;&#x59CB;&#x5316;&#x3002;&#x5B58;&#x50A8;&#x7684;&#x7ED3;&#x6784;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x8FC7;&#x6210;&#x5458;&#x7684;&#x503C;&#x5728;&#x96C6;&#x5408;&#x4E2D;&#x90FD;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x91CD;&#x590D;&#x503C;&#x3002;&#x5B9E;&#x9645;&#x7684;&#x5B58;&#x50A8;&#x987A;&#x5E8F;&#xFF08;&#x4E5F;&#x662F;&#x904D;&#x5386;&#x987A;&#x5E8F;&#xFF09;&#x4E0E;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x4E00;&#x81F4;&#xFF0C;&#x884C;&#x4E3A;&#x7684;&#x7ED3;&#x679C;&#x548C;&#x6570;&#x7EC4;&#x76F8;&#x540C;&#x3002;</p><p>&#x5176;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E2D;&#x6CA1;&#x6709;&#x952E;&#x540D;&#xFF0C;&#x4F46;&#x4E3A;&#x4E86;&#x548C;<code>Map</code>&#x7EDF;&#x4E00;&#xFF0C;&#x4E5F;&#x53EF;&#x8BA4;&#x4E3A;&#x952E;&#x540D;&#x548C;&#x5065;&#x503C;&#x662F;&#x540C;&#x4E00;&#x503C;&#xFF08;&#x4F1A;&#x5728;&#x904D;&#x5386;&#x5C0F;&#x8282;&#x4E2D;&#x4ECB;&#x7ECD;&#xFF09;&#x3002;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x7684;&#x76F8;&#x7B49;&#x5224;&#x65AD;&#x89C4;&#x5219;&#xFF0C;&#x9664;&#x4E86;&#x8BA4;&#x4E3A;<code>NaN</code>&#x7B49;&#x4E8E;<code>NaN</code>&#xFF0C;&#x4E0E;&#x5168;&#x7B49;&#x4E8E;&#x4E00;&#x81F4;&#x3002;&#x5229;&#x7528;<code>Set</code>&#x4E2D;&#x6CA1;&#x6709;&#x91CD;&#x590D;&#x503C;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x3002;&#x6700;&#x540E;&#x4E00;&#x70B9;&#xFF0C;&#x5176;&#x5B9E;&#x4F8B;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6807;&#x7B7E;&#x4E3A;<code>[Object Set]</code>&#x2014;&#x2014;&#x5389;&#x5BB3;&#x5566;&#xFF0C;&#x90FD;&#x81EA;&#x7ACB;&#x4E86;&#x95E8;&#x6237;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2]);
console.log(...set); // 1 2
console.log({}.toString.call(set)); // [Object Set]

let o = {};
[...new Set([1, 2, 2])]; // [1, 2]
[...new Set([1, NaN, NaN])]; // [1, NaN]
[...new Set([1, o, o])]; // [1, o]
[...new Set([1, {}, {}])]; // [1, {}, {}]

F(1, {}, 1); // [1, {}]&#xFF0C;&#x53EF;&#x89E3;&#x6790;&#x5E26;&#x904D;&#x5386;&#x5668;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;
function F() {
  console.log([...new Set(arguments)]);
}

let o = { length: 0 };
[...new Set(o)]; // &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x80FD;&#x81EA;&#x52A8;&#x89E3;&#x6790;&#x4E0D;&#x5E26;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;

// &#x4F5C;&#x4E3A;&#x7B80;&#x5355;&#x7684;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x91CD;&#x590D;&#x503C;&#x7684;&#x65B9;&#x6CD5;&#x3002;
removeDuplicateValues([1, 2, 2, 3]); // [1, 2, 3]
function removeDuplicateValues(arr) {
  return [...new Set(arr)];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]);
<span class="hljs-built_in">console</span>.log(...set); <span class="hljs-comment">// 1 2</span>
<span class="hljs-built_in">console</span>.log({}.toString.call(set)); <span class="hljs-comment">// [Object Set]</span>

<span class="hljs-keyword">let</span> o = {};
[...new <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>])]; <span class="hljs-comment">// [1, 2]</span>
[...new <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>])]; <span class="hljs-comment">// [1, NaN]</span>
[...new <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, o, o])]; <span class="hljs-comment">// [1, o]</span>
[...new <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, {}, {}])]; <span class="hljs-comment">// [1, {}, {}]</span>

F(<span class="hljs-number">1</span>, {}, <span class="hljs-number">1</span>); <span class="hljs-comment">// [1, {}]&#xFF0C;&#x53EF;&#x89E3;&#x6790;&#x5E26;&#x904D;&#x5386;&#x5668;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log([...new <span class="hljs-built_in">Set</span>(<span class="hljs-built_in">arguments</span>)]);
}

<span class="hljs-keyword">let</span> o = { <span class="hljs-attr">length</span>: <span class="hljs-number">0</span> };
[...new <span class="hljs-built_in">Set</span>(o)]; <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x80FD;&#x81EA;&#x52A8;&#x89E3;&#x6790;&#x4E0D;&#x5E26;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;</span>

<span class="hljs-comment">// &#x4F5C;&#x4E3A;&#x7B80;&#x5355;&#x7684;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x91CD;&#x590D;&#x503C;&#x7684;&#x65B9;&#x6CD5;&#x3002;</span>
removeDuplicateValues([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeDuplicateValues</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">return</span> [...new <span class="hljs-built_in">Set</span>(arr)];
}</code></pre><p><strong>&#x5173;&#x4E8E;&#x76F8;&#x7B49;&#x7684;&#x5C0F;&#x77E5;&#x8BC6;</strong><br>&#x4E24;&#x503C;&#x662F;&#x5426;&#x76F8;&#x7B49;&#x4E00;&#x822C;&#x6307;&#x7684;&#x662F;&#x662F;&#x5426;&#x5168;&#x7B49;&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x4E24;&#x4E2A;&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;<code>NaN &amp; NaN</code>&#x548C;<code>-0 &amp; +0</code>&#x3002;&#x5728;&#x5168;&#x7B49;&#x4E2D;&#xFF0C;<code>NaN</code>&#x4E0D;&#x7B49;&#x4E8E;<code>NaN</code>&#xFF0C;<code>-0</code>&#x7B49;&#x4E8E;<code>+0</code>&#x90FD;&#x4E3A;&#x96F6;&#x3002;&#x4F46;&#x8FD9;&#x4E24;&#x79CD;&#x8BA4;&#x5B9A;&#x5728;&#x67D0;&#x4E9B;&#x573A;&#x5408;&#x4E2D;&#x4E0D;&#x592A;&#x63A5;&#x5730;&#x6C14;&#xFF0C;&#x4E3A;&#x6B64;ES6&#x7ED9;&#x51FA;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x4E24;&#x503C;&#x662F;&#x5426;&#x76F8;&#x7B49;&#x65B9;&#x6CD5;<code>Object.is()</code>&#x4E2D;&#xFF0C;&#x8BA4;&#x5B9A;<code>NaN</code>&#x7B49;&#x4E8E;<code>NaN</code>&#xFF0C;<code>-0</code>&#x4E0D;&#x7B49;&#x4E8E;<code>+0</code>&#x3002;</p><p>0&#x9664;&#x4EE5;1&#x4E3A;&#x6B63;&#x96F6;&#xFF0C;0&#x9664;&#x4EE5;&#x8D1F;1&#x4E3A;&#x8D1F;&#x96F6;&#xFF0C;&#x4E24;&#x8005;&#x5728;&#x751F;&#x6210;&#x4E0A;&#x65B9;&#x5F0F;&#x4E0A;&#x770B;&#x7684;&#x786E;&#x4E0D;&#x5E94;&#x8BE5;&#x76F8;&#x7B49;&#x3002;</p><p>&#x975E;&#x6570;<code>NaN</code>&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x662F;&#x6570;&#x5B57;&#x7684;&#x6570;&#x5B57;(&#x7C7B;&#x578B;&#x4F9D;&#x65E7;&#x4E3A;&#x6570;&#x5B57;&#x578B;)&#xFF0C;&#x6CA1;&#x6709;&#x5177;&#x4F53;&#x7684;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x4E24;&#x4E2A;<code>NaN</code>&#x662F;&#x4E0D;&#x76F8;&#x7B49;&#x7684;&#x3002;&#x4E0D;&#x8FC7;&#x5728;&#x7528;<code>NaN</code>&#x4F5C;&#x4E3A;&#x6620;&#x5C04;&#x4E2D;&#x7684;&#x952E;&#x65F6;&#xFF0C;&#x5B83;&#x5E94;&#x8BE5;&#x4EE3;&#x6307;&#x8FD9;&#x4E00;&#x7C7B;&#x578B;&#x800C;&#x4E0D;&#x662F;&#x5177;&#x4F53;&#x7684;&#x4E2A;&#x4F53;&#x3002;&#x5426;&#x8005;&#x6211;&#x5148;&#x8BBE;&#x7F6E;&#x4EE3;&#x7801;<code>NaN</code>&#x6307;&#x5411;&#x8C82;&#x8749;&#xFF0C;&#x518D;&#x8BBE;&#x7F6E;<code>NaN</code>&#x6307;&#x4EE3;&#x897F;&#x65BD;&#xFF0C;&#x665A;&#x4E0A;&#x5BBD;&#x8863;&#x89E3;&#x5E26;&#x540E;&#x53D1;&#x73B0;&#x4EC6;&#x4EBA;&#x7ADF;&#x5C06;&#x4E24;&#x4EBA;&#x540C;&#x65F6;&#x5B89;&#x7F6E;&#x5728;&#x88AB;&#x7A9D;&#x4E4B;&#x4E2D;&#xFF0C;&#x7B11;&#x76C8;&#x76C8;&#x6C34;&#x7075;&#x7075;&#x7684;&#x3002;&#x8FD9;&#xFF0C;&#x8BA9;&#x6211;&#x5982;&#x4F55;&#x662F;&#x597D;&#xFF01;</p><h2 id="articleHeader2">2 Map</h2><p>&#x5176;&#x672C;&#x8EAB;&#x662F;&#x751F;&#x6210;<code>Map</code>&#x5B9E;&#x4F8B;&#xFF08;&#x6570;&#x636E;&#x96C6;&#x5408;&#xFF09;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x6216;&#x5177;&#x6709;<code>iterable</code>&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF09;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x7528;&#x6765;&#x521D;&#x59CB;&#x5316;&#x3002;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#xFF0C;&#x952E;&#x503C;&#x5BF9;&#x662F;&#x5305;&#x542B;&#x4E24;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x524D;&#x8005;&#x4E3A;&#x952E;&#x540D;&#x540E;&#x8005;&#x4E3A;&#x952E;&#x503C;&#x3002;&#x5176;&#x5B58;&#x50A8;&#x7684;&#x7ED3;&#x6784;&#x7C7B;&#x4F3C;<code>Object</code>&#xFF0C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x91CD;&#x590D;&#x7684;&#x952E;&#x540D;&#xFF0C;&#x4E4B;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x76F8;&#x7B49;&#x5224;&#x5B9A;&#x65B9;&#x6CD5;&#x4E0E;<code>Set</code>&#x4E00;&#x81F4;&#x3002;&#x5176;&#x5B9E;&#x4F8B;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6807;&#x7B7E;&#x4E3A;<code>[Object Map]</code>&#x3002;</p><p>&#x5176;&#x4E0E;&#x5BF9;&#x8C61;&#x4E3B;&#x8981;&#x6709;&#x4E24;&#x70B9;&#x4E0D;&#x540C;&#x3002;&#x4E00;&#x662F;&#x952E;&#x540D;&#xFF0C;&#x5BF9;&#x8C61;&#x7684;&#x952E;&#x540D;&#x53EA;&#x80FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;<code>Symbol</code>&#x503C;&#xFF0C;&#x800C;<code>Map</code>&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x4E3A;&#x5B8C;&#x5584;&#x7684;&#x503C;&#x5BF9;&#x503C;&#x7684;<code>Hash</code>&#x7ED3;&#x6784;&#x3002;&#x4E8C;&#x662F;&#x904D;&#x5386;&#x987A;&#x5E8F;&#xFF0C;&#x5BF9;&#x8C61;&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;&#x5927;&#x81F4;&#x4E3A;&#x5148;&#x6570;&#x503C;&#x518D;&#x5B57;&#x7B26;&#x4E32;&#x540E;<code>Symbol</code>&#x503C;&#xFF08;&#x4F1A;&#x5728;&#x904D;&#x5386;&#x5C0F;&#x8282;&#x4E2D;&#x4ECB;&#x7ECD;&#xFF09;&#xFF0C;&#x800C;<code>Map</code>&#x662F;&#x7B80;&#x5355;&#x7684;&#x4E0E;&#x5B58;&#x50A8;&#x987A;&#x5E8F;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#xFF0C;&#x8FD9;&#x5728;&#x5B9E;&#x9645;&#x64CD;&#x4F5C;&#x4E2D;&#x6BD4;&#x8F83;&#x6709;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map([[1, &apos;one&apos;], [2, &apos;two&apos;]]);
console.log(...map); // [1,&apos;one&apos;] [2, &apos;two&apos;]
console.log({}.toString.call(map)); // [Object Map]

let o = {};
[...new Map([[o, 1], [o, 2]])]; // [[o, 2]]
[...new Map([[{}, 1], [{}, 2]])]; // [[{}, 2], [{}, 2]]
[...new Map([[null, 1], [undefined, 2]])]; // [[null, 1], [undefined, 2]]

let o = {
  0: [1, &apos;1&apos;],
  1: [2, &apos;2&apos;],
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
[...new Map(o)]; // [[1, &apos;1&apos;], [2, &apos;2&apos;]]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-number">1</span>, <span class="hljs-string">&apos;one&apos;</span>], [<span class="hljs-number">2</span>, <span class="hljs-string">&apos;two&apos;</span>]]);
<span class="hljs-built_in">console</span>.log(...map); <span class="hljs-comment">// [1,&apos;one&apos;] [2, &apos;two&apos;]</span>
<span class="hljs-built_in">console</span>.log({}.toString.call(map)); <span class="hljs-comment">// [Object Map]</span>

<span class="hljs-keyword">let</span> o = {};
[...new <span class="hljs-built_in">Map</span>([[o, <span class="hljs-number">1</span>], [o, <span class="hljs-number">2</span>]])]; <span class="hljs-comment">// [[o, 2]]</span>
[...new <span class="hljs-built_in">Map</span>([[{}, <span class="hljs-number">1</span>], [{}, <span class="hljs-number">2</span>]])]; <span class="hljs-comment">// [[{}, 2], [{}, 2]]</span>
[...new <span class="hljs-built_in">Map</span>([[<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>], [<span class="hljs-literal">undefined</span>, <span class="hljs-number">2</span>]])]; <span class="hljs-comment">// [[null, 1], [undefined, 2]]</span>

<span class="hljs-keyword">let</span> o = {
  <span class="hljs-number">0</span>: [<span class="hljs-number">1</span>, <span class="hljs-string">&apos;1&apos;</span>],
  <span class="hljs-number">1</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">&apos;2&apos;</span>],
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>,
  [<span class="hljs-built_in">Symbol</span>.iterator]: <span class="hljs-built_in">Array</span>.prototype[<span class="hljs-built_in">Symbol</span>.iterator]
};
[...new <span class="hljs-built_in">Map</span>(o)]; <span class="hljs-comment">// [[1, &apos;1&apos;], [2, &apos;2&apos;]]</span></code></pre><h2 id="articleHeader3">3 &#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</h2><p>&#x5173;&#x4E8E;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" rel="nofollow noreferrer" target="_blank"><code>Set</code></a>&#x548C;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="nofollow noreferrer" target="_blank"><code>Map</code></a>&#x7684;&#x5B8C;&#x5584;<code>API</code>&#x8BF7;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x67E5;&#x770B;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x4F1A;&#x5C06;<code>Set</code>&#x4E0E;<code>Map</code>&#x653E;&#x7F6E;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5728;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x548C;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x4E0A;&#x8FDB;&#x884C;&#x5F02;&#x540C;&#x6027;&#x8BF4;&#x660E;&#xFF0C;&#x65B9;&#x4FBF;&#x533A;&#x5206;&#x548C;&#x8BB0;&#x5FC6;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x4E3A;&#x4E86;&#x5728;&#x65B9;&#x6CD5;&#x64CD;&#x4F5C;&#x4E0A;&#x7EDF;&#x4E00;<code>Set</code>&#x4E0E;<code>Map</code>&#xFF0C;&#x5982;<code>Set</code>&#x5C0F;&#x8282;&#x4E2D;&#x63D0;&#x53CA;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;<code>Set</code>&#x662F;&#x952E;&#x540D;&#x4E0E;&#x952E;&#x503C;&#x4E3A;&#x540C;&#x4E00;&#x503C;&#x7684;&#x5B58;&#x5728;&#xFF08;JS&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x505A;&#x7684;&#xFF09;&#x3002;</p><h3 id="articleHeader4">3.1 &#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</h3><p><strong>&#x4E24;&#x8005;&#x90FD;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</strong><br>&#x5224;&#x65AD;(<code>has</code>)&#xFF0C;&#x4F20;&#x5165;&#x952E;&#x540D;&#xFF0C;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#x3002;<br>&#x5220;&#x9664;(<code>delete</code>)&#xFF0C;&#x4F20;&#x5165;&#x952E;&#x540D;&#xFF0C;&#x6709;&#x4E14;&#x6210;&#x529F;&#x5220;&#x9664;&#x4E3A;<code>true</code>&#xFF0C;&#x5426;&#x5219;&#x4E3A;<code>false</code>&#x3002;<br>&#x6E05;&#x7A7A;(<code>clear</code>)&#xFF0C;&#x65E0;&#x9700;&#x4F20;&#x53C2;&#xFF0C;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><p><strong><code>Set</code>&#x72EC;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</strong><br>&#x65B0;&#x589E;(<code>add</code>)&#xFF0C;&#x4F20;&#x5165;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x3002;<br>&#x6CA1;&#x6709;&#x76F8;&#x5E94;&#x7684;&#x83B7;&#x53D6;&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x83B7;&#x53D6;&#x9700;&#x4F20;&#x5165;&#x7684;&#x503C;&#x5C31;&#x662F;&#x5E94;&#x6240;&#x4F20;&#x51FA;&#x7684;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();

set.add(1).add(NaN); // set.size &#x4E3A; 2&#x3002;
set.has(NaN); // true
set.delete(NaN); // true
set.has(NaN); // false
set.delete(2); // false
set.clear();

console.log(...set); // &#x5B83;&#x53D8;&#x5F97;&#x4E00;&#x65E0;&#x6240;&#x6709;&#xFF0C;&#x53EA;&#x5269;&#x4E00;&#x5177;&#x7A7A;&#x58F3;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();

set.add(<span class="hljs-number">1</span>).add(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// set.size &#x4E3A; 2&#x3002;</span>
set.has(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span>
set.delete(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span>
set.has(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// false</span>
set.delete(<span class="hljs-number">2</span>); <span class="hljs-comment">// false</span>
set.clear();

<span class="hljs-built_in">console</span>.log(...set); <span class="hljs-comment">// &#x5B83;&#x53D8;&#x5F97;&#x4E00;&#x65E0;&#x6240;&#x6709;&#xFF0C;&#x53EA;&#x5269;&#x4E00;&#x5177;&#x7A7A;&#x58F3;&#x3002;</span></code></pre><p><strong><code>Map</code>&#x72EC;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</strong><br>&#x65B0;&#x589E;(<code>set</code>)&#xFF0C;&#x4F20;&#x5165;&#x952E;&#x540D;&#x548C;&#x952E;&#x503C;&#xFF0C;&#x6709;&#x5219;&#x66F4;&#x65B0;&#x6CA1;&#x5219;&#x65B0;&#x589E;&#xFF0C;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x3002;<br>&#x83B7;&#x53D6;(<code>get</code>)&#xFF0C;&#x4F20;&#x5165;&#x952E;&#x540D;&#xFF0C;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x503C;&#x6CA1;&#x6709;&#x5219;&#x4E3A;<code>undefined</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = [1, 2, 3];
let map = new Map();

map.set(o, 1).set(o, 2); // map.size &#x4E3A; 1
map.has(o); // true
map.get(o); // 2
map.get([1, 2, 3]); // undefined
map.delete(o); // true
map.clear();

console.log(...map); // &#x5B83;&#x518D;&#x6B21;&#x4E00;&#x65E0;&#x6240;&#x6709;&#xFF0C;&#x53EA;&#x5269;&#x6108;&#x53D1;&#x9965;&#x6E34;&#x7684;&#x517D;&#x5FC3;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> o = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();

map.set(o, <span class="hljs-number">1</span>).set(o, <span class="hljs-number">2</span>); <span class="hljs-comment">// map.size &#x4E3A; 1</span>
map.has(o); <span class="hljs-comment">// true</span>
map.get(o); <span class="hljs-comment">// 2</span>
map.get([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// undefined</span>
map.delete(o); <span class="hljs-comment">// true</span>
map.clear();

<span class="hljs-built_in">console</span>.log(...map); <span class="hljs-comment">// &#x5B83;&#x518D;&#x6B21;&#x4E00;&#x65E0;&#x6240;&#x6709;&#xFF0C;&#x53EA;&#x5269;&#x6108;&#x53D1;&#x9965;&#x6E34;&#x7684;&#x517D;&#x5FC3;&#x3002;</span></code></pre><h3 id="articleHeader5">3.2 &#x904D;&#x5386;&#x65B9;&#x6CD5;</h3><p>&#x8FD4;&#x56DE;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;(<code>keys</code>)&#x3002;<br>&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;(<code>values</code>)&#x3002;<br>&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;(<code>entries</code>)&#xFF0C;&#x952E;&#x503C;&#x5BF9;&#x4E3A;<code>[&#x952E;&#x540D;, &#x952E;&#x503C;]</code>&#x3002;<br>&#x904D;&#x5386;&#x6BCF;&#x4E2A;&#x6210;&#x5458;(<code>forEach</code>)&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E0E;<code>Array</code>&#x7684;&#x65B9;&#x6CD5;&#x76F8;&#x540C;&#x3002;</p><p>&#x56E0;&#x4E3A;<code>Set</code>&#x7684;&#x952E;&#x540D;&#x548C;&#x952E;&#x503C;&#x76F8;&#x540C;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x53EA;&#x4F7F;&#x7528;<code>values</code>&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5168;&#x90E8;&#x503C;&#x3002;&#x800C;<code>Map</code>&#x5219;&#x6839;&#x636E;&#x76F8;&#x5E94;&#x9700;&#x6C42;&#x83B7;&#x53D6;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3]);
let map = new Map([[1, &apos;one&apos;], [null, NaN]]);

[...set.values()]; // [1, 2, 3]
[...set.keys()]; // [1, 2, 3]
[...set.entries()]; // [[1, 1], [2, 2], [3, 3]]

[...map.values()]; // [&apos;one&apos;, NaN]
[...map.keys()]; // [1, null]
[...map.entries()]; // [[1, &apos;one&apos;], [null, NaN]]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-number">1</span>, <span class="hljs-string">&apos;one&apos;</span>], [<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>]]);

[...set.values()]; <span class="hljs-comment">// [1, 2, 3]</span>
[...set.keys()]; <span class="hljs-comment">// [1, 2, 3]</span>
[...set.entries()]; <span class="hljs-comment">// [[1, 1], [2, 2], [3, 3]]</span>

[...map.values()]; <span class="hljs-comment">// [&apos;one&apos;, NaN]</span>
[...map.keys()]; <span class="hljs-comment">// [1, null]</span>
[...map.entries()]; <span class="hljs-comment">// [[1, &apos;one&apos;], [null, NaN]]</span></code></pre><p>&#x4E24;&#x8005;&#x7684;<code>forEach</code>&#x65B9;&#x6CD5;&#x4E0E;&#x6570;&#x7EC4;&#x7684;&#x4E0D;&#x540C;&#x70B9;&#x5728;&#x4E8E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x524D;&#x8005;&#x4E3A;&#x8BE5;&#x9879;&#x7684;&#x952E;&#x540D;&#x540E;&#x8005;&#x4E3A;&#x8BE5;&#x9879;&#x7684;&#x5E8F;&#x53F7;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3]);
let map = new Map([[1, &apos;one&apos;], [null, NaN]]);

set.forEach((v, i) =&gt; console.log(i)); // 1, 2, 3
map.forEach((v, i) =&gt; console.log(i)); // 1, null
[1, 2, 3].forEach((v, i) =&gt; console.log(i)); // 0, 1, 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-number">1</span>, <span class="hljs-string">&apos;one&apos;</span>], [<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>]]);

set.forEach(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(i)); <span class="hljs-comment">// 1, 2, 3</span>
map.forEach(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(i)); <span class="hljs-comment">// 1, null</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].forEach(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(i)); <span class="hljs-comment">// 0, 1, 2</span></code></pre><p><strong>&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;</strong><br>&#x4E0D;&#x540C;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x9762;&#x5411;&#x7684;&#x6570;&#x636E;&#x79CD;&#x7C7B;&#x4E0D;&#x540C;&#xFF0C;&#x4F46;&#x603B;&#x7684;&#x8BF4;&#x5176;&#x904D;&#x5386;&#x987A;&#x5E8F;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;&#x5148;&#x627E;&#x5230;&#x5176;&#x4E2D;&#x53EF;&#x8F6C;&#x5316;&#x6210;&#x6570;&#x503C;&#x7684;&#x5C5E;&#x6027;&#x5E76;&#x6309;&#x5347;&#x5E8F;&#x904D;&#x5386;&#xFF0C;&#x518D;&#x904D;&#x5386;&#x5B57;&#x7B26;&#x4E32;&#x5C5E;&#x6027;&#x6309;&#x52A0;&#x5165;&#x65F6;&#x95F4;&#x7684;&#x524D;&#x540E;&#xFF0C;&#x6700;&#x540E;&#x904D;&#x5386;<code>Symbol</code>&#x503C;&#x6309;&#x52A0;&#x5165;&#x65F6;&#x95F4;&#x7684;&#x524D;&#x540E;&#x3002;<code>Map</code>&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;&#x5373;&#x5176;&#x88AB;&#x63D2;&#x5165;&#x65F6;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x55EF;&#xFF0C;&#x603B;&#x6709;&#x4E9B;&#x8272;&#x54AA;&#x54AA;&#x7684;&#x5473;&#x9053;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  &apos;0&apos;: 0,
  1: 1,
  &apos;b&apos;: 2,
  &apos;a&apos;: 3,
  [Symbol(2)]: 4,
  [Symbol(1)]: 5
};

Reflect.ownKeys(obj); // [&quot;0&quot;, &quot;1&quot;, &quot;b&quot;, &quot;a&quot;, Symbol(2), Symbol(1)]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-string">&apos;0&apos;</span>: <span class="hljs-number">0</span>,
  <span class="hljs-number">1</span>: <span class="hljs-number">1</span>,
  <span class="hljs-string">&apos;b&apos;</span>: <span class="hljs-number">2</span>,
  <span class="hljs-string">&apos;a&apos;</span>: <span class="hljs-number">3</span>,
  [<span class="hljs-built_in">Symbol</span>(<span class="hljs-number">2</span>)]: <span class="hljs-number">4</span>,
  [<span class="hljs-built_in">Symbol</span>(<span class="hljs-number">1</span>)]: <span class="hljs-number">5</span>
};

<span class="hljs-built_in">Reflect</span>.ownKeys(obj); <span class="hljs-comment">// [&quot;0&quot;, &quot;1&quot;, &quot;b&quot;, &quot;a&quot;, Symbol(2), Symbol(1)]</span></code></pre><h2 id="articleHeader6">4 &#x5F31;&#x5F15;&#x7528;&#x96C6;&#x5408;</h2><p>&#x5F31;&#x5F15;&#x7528;&#x96C6;&#x5408;<code>WeakSet</code>&#x548C;<code>WeakMap</code>&#x662F;&#x7531;<code>Set</code>&#x548C;<code>Map</code>&#x5206;&#x522B;&#x884D;&#x751F;&#x51FA;&#x7684;&#xFF0C;&#x5176;&#x4E0E;&#x672C;&#x4F53;&#x7684;&#x5F02;&#x540C;&#x70B9;&#x4E00;&#x81F4;&#xFF0C;&#x56E0;&#x6B64;&#x53EA;&#x5BF9;<code>WeakMap</code>&#x8FDB;&#x884C;&#x8BF4;&#x660E;&#x3002;</p><p>&#x5728;JS&#x7684;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x4E2D;&#xFF0C;&#x5BF9;&#x8C61;&#x4F1A;&#x5728;&#x6CA1;&#x6709;&#x5F15;&#x7528;&#x65F6;&#xFF08;&#x53EF;&#x610F;&#x4E3A;&#x4F7F;&#x7528;&#xFF09;&#x88AB;&#x56DE;&#x6536;&#x3002;&#x8FD9;&#x8BF4;&#x660E;&#x7740;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x4E2A;&#x6570;&#x636E;&#x96C6;&#x5408;&#xFF08;&#x6570;&#x7EC4;&#x3001;&#x5BF9;&#x8C61;&#x3001;<code>Set</code>&#x6216;<code>Map</code>&#xFF09;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x67D0;&#x5BF9;&#x8C61;&#xFF08;&#x5728;&#x4F7F;&#x7528;&#x5B83;&#xFF09;&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x6B64;&#x6570;&#x636E;&#x96C6;&#x5408;&#x88AB;&#x56DE;&#x6536;&#x4E4B;&#x524D;&#x8BE5;&#x5BF9;&#x8C61;&#x90FD;&#x4E0D;&#x80FD;&#x88AB;&#x56DE;&#x6536;&#x3002;&#x8FD9;&#x5F88;&#x5BB9;&#x6613;&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#xFF08;&#x4E13;&#x6709;&#x540D;&#x8BCD;&#xFF0C;&#x53EF;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x4E3A;&#x5185;&#x5B58;&#x88AB;&#x6CA1;&#x7528;&#x7684;&#x6570;&#x636E;&#x5360;&#x636E;&#xFF09;&#x3002;</p><p>&#x5F31;&#x5F15;&#x7528;&#x96C6;&#x5408;&#x7684;&#x8BBE;&#x8BA1;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x5F31;&#x5F15;&#x7528;&#x987E;&#x540D;&#x601D;&#x4E49;&#x662F;&#x6307;&#x867D;&#x7136;&#x67D0;&#x5BF9;&#x8C61;&#x88AB;&#x6B64;&#x96C6;&#x5408;&#x5F15;&#x7528;&#x4E86;&#xFF0C;&#x4F46;&#x8BE5;&#x5F15;&#x7528;&#x4E0D;&#x88AB;&#x5F15;&#x64CE;&#x4FDD;&#x62A4;&#xFF0C;&#x4E0D;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x88C5;&#x7F6E;&#x8003;&#x8651;&#x5728;&#x5185;&#xFF0C;&#x8BE5;&#x56DE;&#x6536;&#x65F6;&#x5C31;&#x5F97;&#x4E56;&#x4E56;&#x7684;&#x88AB;&#x56DE;&#x6536;&#x3002;&#x90A3;&#x4E9B;&#x88AB;&#x60EF;&#x6210;&#x7578;&#x5F62;&#x7684;&#x5BB6;&#x4F19;&#x4EEC;&#xFF0C;&#x8981;&#x77E5;&#x9053;&#xFF0C;&#x5988;&#x5988;&#x7684;&#x6000;&#x62B1;&#x53EF;&#x4E0D;&#x662F;&#x4E2A;&#x4E07;&#x5168;&#x7684;&#x5730;&#x65B9;&#x54E6;&#xFF0C;&#x552F;&#x6709;&#x6B7B;&#x795E;&#x7684;&#x624D;&#x662F;&#x3002;</p><p><code>WeakMap</code>&#x7684;&#x884C;&#x4E3A;&#x4E0E;<code>Map</code>&#x9664;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#x4E0D;&#x540C;&#x5916;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x81F4;&#x7684;&#x3002;<br><code>WeakMap</code>&#x7684;&#x952E;&#x540D;&#x53EA;&#x80FD;&#x662F;&#x5BF9;&#x8C61;&#xFF08;&#x4E0D;&#x5305;&#x62EC;<code>null</code>&#xFF09;&#xFF0C;&#x5426;&#x8005;&#x62A5;&#x9519;&#x3002;&#x5982;&#x679C;&#x80FD;&#x653E;&#x5165;&#x666E;&#x901A;&#x7C7B;&#x578B;&#xFF0C;&#x90A3;&#x6709;&#x4EC0;&#x4E48;&#x610F;&#x4E49;&#x5462;&#xFF1F;<br><code>WeakMap</code>&#x7684;&#x952E;&#x540D;&#x662F;&#x52A8;&#x6001;&#x4E0D;&#x5B9A;&#x7684;&#xFF0C;&#x4E0D;&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F1A;&#x88AB;&#x56DE;&#x6536;&#x3002;&#x952E;&#x540D;&#x6307;&#x4EE3;&#x7684;&#x5BF9;&#x8C61;&#x88AB;&#x56DE;&#x6536;&#x540E;&#xFF0C;&#x8BE5;&#x9879;&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x6D88;&#x9664;&#x3002;<br>&#x56E0;&#x4E3A;&#x9879;&#x6570;&#x7684;&#x52A8;&#x6001;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x88AB;&#x904D;&#x5386;&#xFF08;&#x6CA1;&#x6709;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x6CA1;&#x6709;<code>size</code>&#x5C5E;&#x6027;&#xFF0C;&#x6CA1;&#x6709;<code>cealr</code>&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = {};
let wm = new WeakMap();

wm.set(1, 1); // &#x62A5;&#x9519;&#xFF0C;1 &#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x3002;
wm.set(o, 1);
wm.has(o); // true
wm.get(o); // 1
wm.delete(o); // true

&apos;size&apos; in wm; // false
&apos;clear&apos; in wm; // false
&apos;values&apos; in wm; // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> o = {};
<span class="hljs-keyword">let</span> wm = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();

wm.set(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;1 &#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x3002;</span>
wm.set(o, <span class="hljs-number">1</span>);
wm.has(o); <span class="hljs-comment">// true</span>
wm.get(o); <span class="hljs-comment">// 1</span>
wm.delete(o); <span class="hljs-comment">// true</span>

<span class="hljs-string">&apos;size&apos;</span> <span class="hljs-keyword">in</span> wm; <span class="hljs-comment">// false</span>
<span class="hljs-string">&apos;clear&apos;</span> <span class="hljs-keyword">in</span> wm; <span class="hljs-comment">// false</span>
<span class="hljs-string">&apos;values&apos;</span> <span class="hljs-keyword">in</span> wm; <span class="hljs-comment">// false</span></code></pre><p>&#x5F31;&#x5F15;&#x7528;&#x96C6;&#x5408;&#x7684;&#x4F18;&#x70B9;&#x5728;&#x4E8E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4EFB;&#x610F;&#x4E3A;&#x5176;&#x6CE8;&#x518C;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x3002;&#x5178;&#x578B;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x662F;&#x5C06;<code>DOM</code>&#x4E0E;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#x3002;&#x4E00;&#x4E9B;&#x8981;&#x5728;<code>DOM</code>&#x4E2D;&#x7ED1;&#x5B9A;&#x6570;&#x636E;&#x7684;&#x5E93;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;<code>d3</code>&#xFF0C;&#x4F1A;&#x76F4;&#x63A5;&#x5728;<code>DOM</code>&#x5BF9;&#x8C61;&#x4E0A;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x4FDD;&#x5B58;&#x3002;&#x4F46;&#x5728;&#x65E5;&#x5E38;&#x7EC4;&#x5EFA;&#x5355;&#x9875;&#x9762;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x60F3;&#x5C06;<code>DOM</code>&#x4E0E;&#x6570;&#x636E;&#x8054;&#x7CFB;&#x5728;&#x4E00;&#x8D77;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x663E;&#x7136;&#x4F1A;&#x4F18;&#x5148;&#x9009;&#x7528;&#x6570;&#x636E;&#x6620;&#x5C04;&#x7684;&#x65B9;&#x5F0F;&#x3002;&#x800C;&#x5F31;&#x5F15;&#x7528;&#x96C6;&#x5408;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x66F4;&#x52A0;&#x4F18;&#x5316;&#x4E86;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x5728;&#x4E0B;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x6BCF;&#x6B21;&#x70B9;&#x51FB;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x540E;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x5E2E;&#x4E86;&#x76F8;&#x5E94;&#x6570;&#x636E;&#x9879;&#x7684;<code>li</code>&#x6807;&#x7B7E;&#xFF0C;&#x5E76;&#x5C06;&#x8BE5;&#x6807;&#x7B7E;&#x4E0E;&#x76F8;&#x5E94;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#x3002;&#x5728;&#x8FD9;&#x4E00;&#x7CFB;&#x5217;&#x8F6E;&#x56DE;&#x5B58;&#x50A8;&#x7ED1;&#x5B9A;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;<code>WeakMap</code>&#x7684;&#x5F31;&#x5F15;&#x7528;&#x7279;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x5DF2;&#x7ECF;&#x88AB;&#x5220;&#x9664;&#x7684;<code>DOM</code>&#x5143;&#x7D20;&#x3002;&#x6BCF;&#x6B21;&#x53EA;&#x9700;&#x8FDB;&#x884C;&#x76F8;&#x540C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x65B9;&#x4FBF;&#x5B89;&#x5FC3;&#xFF0C;&#x7701;&#x65F6;&#x7701;&#x529B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button onclick=&quot;requestData()&quot;&gt;Request Data&lt;/button&gt;

&lt;ul id=&quot;container&quot;&gt;&lt;/ul&gt;

&lt;script&gt;
  &quot;use strict&quot;;

  let wmap = new WeakMap();
  let container = document.querySelector(&apos;#container&apos;);
  
  function requestData() {
    container.innerHTML = &apos;&apos;;

    [0, 0, 0].map(() =&gt; Math.random()).forEach(d =&gt; {
      let li = document.createElement(&apos;li&apos;);
      li.innerHTML = `
        &lt;button onclick=&quot;showMes(this)&quot;&gt;Show Message&lt;/button&gt;
        &lt;button onclick=&quot;deleteItem(this)&quot;&gt;Delete Item&lt;/button&gt;
      `;
      wmap.set(li, d);
      container.appendChild(li);
    });
  }

  function showMes(that) {
    let li = that.parentNode;
    li.innerHTML = wmap.get(li);
  }
  function deleteItem(that) {
    let li = that.parentNode;
    container.removeChild(li);
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;requestData()&quot;</span>&gt;</span>Request Data<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-meta">
  &quot;use strict&quot;</span>;

  <span class="hljs-keyword">let</span> wmap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
  <span class="hljs-keyword">let</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#container&apos;</span>);
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestData</span>(<span class="hljs-params"></span>) </span>{
    container.innerHTML = <span class="hljs-string">&apos;&apos;</span>;

    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>].map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Math</span>.random()).forEach(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;li&apos;</span>);
      li.innerHTML = <span class="hljs-string">`
        &lt;button onclick=&quot;showMes(this)&quot;&gt;Show Message&lt;/button&gt;
        &lt;button onclick=&quot;deleteItem(this)&quot;&gt;Delete Item&lt;/button&gt;
      `</span>;
      wmap.set(li, d);
      container.appendChild(li);
    });
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showMes</span>(<span class="hljs-params">that</span>) </span>{
    <span class="hljs-keyword">let</span> li = that.parentNode;
    li.innerHTML = wmap.get(li);
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deleteItem</span>(<span class="hljs-params">that</span>) </span>{
    <span class="hljs-keyword">let</span> li = that.parentNode;
    container.removeChild(li);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader7">&#x5EF6;&#x4F38;&#x9605;&#x8BFB;</h2><p><a href="https://segmentfault.com/a/1190000015072149">ES6&#x7CBE;&#x534E;&#xFF1A;Symbol</a><br><a href="https://segmentfault.com/a/1190000015244917" target="_blank">ES6&#x7CBE;&#x534E;&#xFF1A;&#x89E3;&#x6784;&#x8D4B;&#x503C;</a><br><a href="https://segmentfault.com/a/1190000015352725">ES6&#x7CBE;&#x534E;&#xFF1A;&#x51FD;&#x6570;&#x6269;&#x5C55;</a><br><a href="https://segmentfault.com/a/1190000015581013" target="_blank">ES6&#x7CBE;&#x534E;&#xFF1A;Proxy &amp; Reflect</a><br><a href="https://segmentfault.com/a/1190000015701263">Iterator&#xFF1A;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x96C6;&#x5408;&#x7684;&#x7EDF;&#x4E00;&#x63A5;&#x53E3;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Set & Map：新生的数据集合及其弱引用衍生

## 原文链接
[https://segmentfault.com/a/1190000015953853](https://segmentfault.com/a/1190000015953853)


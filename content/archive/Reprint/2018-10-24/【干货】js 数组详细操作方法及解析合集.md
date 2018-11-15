---
title: 【干货】js 数组详细操作方法及解析合集
reprint: true
categories: reprint
abbrlink: 72838ac1
date: 2018-10-24 08:17:54
---

{{% raw %}}

                    
<p><span class="img-wrap"><img src="http://ww1.sinaimg.cn/large/005Y4rCogy1frtrbx8b69j30n20cyh3q.jpg"  alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<p>&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6570;&#x7EC4;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x975E;&#x5E38;&#x591A;&#xFF0C;&#x5E73;&#x65E5;&#x4E2D;&#x4E5F;&#x6D89;&#x53CA;&#x5230;&#x5F88;&#x591A;&#x6570;&#x7EC4;&#x7684;<code>api</code>/&#x76F8;&#x5173;&#x64CD;&#x4F5C;&#xFF0C;&#x4E00;&#x76F4;&#x4E5F;&#x6CA1;&#x6709;&#x5BF9;&#x8FD9;&#x5757;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x4E00;&#x5757;&#x6574;&#x7406;&#x603B;&#x7ED3;&#xFF0C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x5C31;&#x7B97;&#x7528;&#x8FC7;&#x51E0;&#x6B21;&#x8FD9;&#x4E2A;<code>api</code>&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#x4E5F;&#x5F88;&#x5BB9;&#x6613;&#x5FD8;&#x8BB0;&#xFF0C;&#x8FD8;&#x662F;&#x8981;&#x8C37;&#x6B4C;&#x4E00;&#x4E0B;&#x3002;&#x6240;&#x4EE5;&#x5C31;&#x5E0C;&#x671B;&#x5BF9;&#x8FD9;&#x5757;&#x5185;&#x5BB9;&#x6709;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x7CFB;&#x7EDF;&#x6027;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x5728;&#x8FD9;&#x80CC;&#x666F;&#x4E0B;&#xFF0C;&#x5C31;&#x6709;&#x4E86;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x5982;&#x679C;&#x559C;&#x6B22;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x70B9;&#x6CE2;&#x8D5E;/&#x5173;&#x6CE8;&#xFF0C;&#x652F;&#x6301;&#x4E00;&#x4E0B;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x770B;&#x5B8C;&#x672C;&#x6587;&#x53EF;&#x4EE5;&#x6709;&#x6240;&#x6536;&#x83B7;&#x3002;</p>
<blockquote>&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF1A;<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a>
</blockquote>
<hr>
<h2 id="articleHeader1">&#x672C;&#x6587;&#x7BC7;&#x5E45;&#x8F83;&#x957F;&#xFF0C;&#x5EFA;&#x8BAE;&#x70B9;&#x8D5E;&#x4FDD;&#x5B58;&#x518D;&#x770B;&#xFF0C;&#x4E5F;&#x4FBF;&#x4E8E;&#x65E5;&#x540E;&#x7FFB;&#x9605;&#x3002;</h2>
<hr>
<h3 id="articleHeader2">&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x5B57;&#x9762;&#x91CF;&#x65B9;&#x5F0F;:
    // &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x6700;&#x5E38;&#x7528;&#x7684;&#xFF0C;&#x5728;&#x521D;&#x59CB;&#x5316;&#x6570;&#x7EC4;&#x7684;&#x65F6;&#x5019; &#x76F8;&#x5F53;&#x65B9;&#x4FBF;
    var a = [3, 11, 8];  // [3,11,8];
    // &#x6784;&#x9020;&#x5668;:
    // &#x5B9E;&#x9645;&#x4E0A; new Array === Array,&#x52A0;&#x4E0D;&#x52A0;new &#x4E00;&#x70B9;&#x5F71;&#x54CD;&#x90FD;&#x6CA1;&#x6709;&#x3002;
    var a = Array(); // [] 
    var a = Array(3); // [undefined,undefined,undefined]
    var a = Array(3,11,8); // [ 3,11,8 ]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code>    <span class="hljs-comment">// &#x5B57;&#x9762;&#x91CF;&#x65B9;&#x5F0F;:</span>
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x6700;&#x5E38;&#x7528;&#x7684;&#xFF0C;&#x5728;&#x521D;&#x59CB;&#x5316;&#x6570;&#x7EC4;&#x7684;&#x65F6;&#x5019; &#x76F8;&#x5F53;&#x65B9;&#x4FBF;</span>
    <span class="hljs-keyword">var</span> a = [<span class="hljs-number">3</span>, <span class="hljs-number">11</span>, <span class="hljs-number">8</span>];  <span class="hljs-comment">// [3,11,8];</span>
    <span class="hljs-comment">// &#x6784;&#x9020;&#x5668;:</span>
    <span class="hljs-comment">// &#x5B9E;&#x9645;&#x4E0A; new Array === Array,&#x52A0;&#x4E0D;&#x52A0;new &#x4E00;&#x70B9;&#x5F71;&#x54CD;&#x90FD;&#x6CA1;&#x6709;&#x3002;</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-keyword">Array</span>(); <span class="hljs-comment">// [] </span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-keyword">Array</span>(<span class="hljs-number">3</span>); <span class="hljs-comment">// [undefined,undefined,undefined]</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-keyword">Array</span>(<span class="hljs-number">3</span>,<span class="hljs-number">11</span>,<span class="hljs-number">8</span>); <span class="hljs-comment">// [ 3,11,8 ]</span>
</code></pre>
<h4>ES6 Array.of()  &#x8FD4;&#x56DE;&#x7531;&#x6240;&#x6709;&#x53C2;&#x6570;&#x503C;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;&#x8FD4;&#x56DE;&#x7531;&#x6240;&#x6709;&#x53C2;&#x6570;&#x503C;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x76EE;&#x7684;&#xFF1A;Array.of() &#x51FA;&#x73B0;&#x7684;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x4E0A;&#x8FF0;&#x6784;&#x9020;&#x5668;&#x56E0;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x540C;&#xFF0C;&#x5BFC;&#x81F4;&#x7684;&#x884C;&#x4E3A;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x95EE;&#x9898;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = Array.of(3, 11, 8); // [3,11,8]
    let a = Array.of(3); // [3]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ceylon"><code>    <span class="hljs-keyword">let</span> a = Array.<span class="hljs-keyword">of</span>(<span class="hljs-number">3</span>, <span class="hljs-number">11</span>, <span class="hljs-number">8</span>); <span class="hljs-comment">// [3,11,8]</span>
    <span class="hljs-keyword">let</span> a = Array.<span class="hljs-keyword">of</span>(<span class="hljs-number">3</span>); <span class="hljs-comment">// [3]</span>
</code></pre>
<h4>ES6 Arrary.from() &#x5C06;&#x4E24;&#x7C7B;&#x5BF9;&#x8C61;&#x8F6C;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;&#x7528;&#x4E8E;&#x5C06;&#x4E24;&#x7C7B;&#x5BF9;&#x8C61;&#x8F6C;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x4E0D;&#x6539;&#x53D8;&#x539F;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF09;&#x3002;</p>
<p>&#x53C2;&#x6570;&#xFF1A;</p>
<p>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;(&#x5FC5;&#x9700;):&#x8981;&#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x6B63;&#x6570;&#x7EC4;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p>
<p>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;(&#x53EF;&#x9009;): &#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;map&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x5C06;&#x5904;&#x7406;&#x540E;&#x7684;&#x503C;&#x653E;&#x5165;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;(&#x53EF;&#x9009;): &#x7528;&#x6765;&#x7ED1;&#x5B9A;this&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 1. &#x5BF9;&#x8C61;&#x62E5;&#x6709;length&#x5C5E;&#x6027;
    let obj = {0: &apos;a&apos;, 1: &apos;b&apos;, 2:&apos;c&apos;, length: 3};
    let arr = Array.from(obj); // [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;];
    // 2. &#x90E8;&#x7F72;&#x4E86; Iterator&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784; &#x6BD4;&#x5982;:&#x5B57;&#x7B26;&#x4E32;&#x3001;Set&#x3001;NodeList&#x5BF9;&#x8C61;
    let arr = Array.from(&apos;hello&apos;); // [&apos;h&apos;,&apos;e&apos;,&apos;l&apos;,&apos;l&apos;,&apos;o&apos;]
    let arr = Array.from(new Set([&apos;a&apos;,&apos;b&apos;])); // [&apos;a&apos;,&apos;b&apos;]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs julia"><code>    // <span class="hljs-number">1.</span> &#x5BF9;&#x8C61;&#x62E5;&#x6709;length&#x5C5E;&#x6027;
    <span class="hljs-keyword">let</span> obj = {<span class="hljs-number">0</span>: <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-number">1</span>: <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-number">2</span>:<span class="hljs-string">&apos;c&apos;</span>, length: <span class="hljs-number">3</span>};
    <span class="hljs-keyword">let</span> arr = <span class="hljs-built_in">Array</span>.from(obj); // [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>];
    // <span class="hljs-number">2.</span> &#x90E8;&#x7F72;&#x4E86; Iterator&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784; &#x6BD4;&#x5982;:&#x5B57;&#x7B26;&#x4E32;&#x3001;Set&#x3001;NodeList&#x5BF9;&#x8C61;
    <span class="hljs-keyword">let</span> arr = <span class="hljs-built_in">Array</span>.from(&apos;hello&apos;); // [<span class="hljs-string">&apos;h&apos;</span>,<span class="hljs-string">&apos;e&apos;</span>,<span class="hljs-string">&apos;l&apos;</span>,<span class="hljs-string">&apos;l&apos;</span>,<span class="hljs-string">&apos;o&apos;</span>]
    <span class="hljs-keyword">let</span> arr = <span class="hljs-built_in">Array</span>.from(new <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>])); // [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>]
</code></pre>
<hr>
<h2 id="articleHeader3">&#x65B9;&#x6CD5;:</h2>
<p>&#x6570;&#x7EC4;&#x539F;&#x578B;&#x63D0;&#x4F9B;&#x4E86;&#x975E;&#x5E38;&#x591A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x91CC;&#x5206;&#x4E3A;&#x4E09;&#x7C7B;&#x6765;&#x8BB2;&#xFF0C;&#x4E00;&#x7C7B;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x503C;&#xFF0C;&#x4E00;&#x7C7B;&#x662F;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x4EE5;&#x53CA;&#x6570;&#x7EC4;&#x7684;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x3002;</p>
<h3 id="articleHeader4">&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;(9&#x4E2A;):</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = [1,2,3];
    ES5:
     a.splice()/ a.sort() / a.pop()/ a.shift()/  a.push()/ a.unshift()/ a.reverse()
    ES6:
    a.copyWithin() / a.fill
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs aspectj"><code>    let a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    ES5:
     a.splice()/ a.sort() / a.pop()/ a.shift()/  a.push()/ a.unshift()/ a.reverse()
    ES6:
    a.copyWithin() / a.fill
</code></pre>
<p>&#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x80FD;&#x591F;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8981;&#x6CE8;&#x610F;&#x907F;&#x514D;&#x5728;&#x5FAA;&#x73AF;&#x904D;&#x5386;&#x4E2D;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x6BD4;&#x5982;: &#x6539;&#x53D8;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5BFC;&#x81F4;&#x904D;&#x5386;&#x7684;&#x957F;&#x5EA6;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#x3002;</p>
<h4>splice() &#x6DFB;&#x52A0;/&#x5220;&#x9664;&#x6570;&#x7EC4;&#x5143;&#x7D20;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A; splice() &#x65B9;&#x6CD5;<strong>&#x5411;/&#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x6DFB;&#x52A0;/&#x5220;&#x9664;</strong>&#x9879;&#x76EE;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x88AB;&#x5220;&#x9664;&#x7684;&#x9879;&#x76EE;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A; <code>array.splice(index,howmany,item1,.....,itemX)</code></p>
<p>&#x53C2;&#x6570;:</p>
<ol>
<li>index&#xFF1A;&#x5FC5;&#x9700;&#x3002;&#x6574;&#x6570;&#xFF0C;&#x89C4;&#x5B9A;&#x6DFB;&#x52A0;/&#x5220;&#x9664;&#x9879;&#x76EE;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F7F;&#x7528;&#x8D1F;&#x6570;&#x53EF;&#x4ECE;&#x6570;&#x7EC4;&#x7ED3;&#x5C3E;&#x5904;&#x89C4;&#x5B9A;&#x4F4D;&#x7F6E;&#x3002;</li>
<li>howmany&#xFF1A;&#x5FC5;&#x9700;&#x3002;&#x8981;&#x5220;&#x9664;&#x7684;&#x9879;&#x76EE;&#x6570;&#x91CF;&#x3002;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A; 0&#xFF0C;&#x5219;&#x4E0D;&#x4F1A;&#x5220;&#x9664;&#x9879;&#x76EE;&#x3002;</li>
<li>item1, ..., itemX&#xFF1A; &#x53EF;&#x9009;&#x3002;&#x5411;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x7684;&#x65B0;&#x9879;&#x76EE;&#x3002;</li>
</ol>
<p>&#x8FD4;&#x56DE;&#x503C;: &#x5982;&#x679C;&#x6709;&#x5143;&#x7D20;&#x88AB;&#x5220;&#x9664;,&#x8FD4;&#x56DE;&#x5305;&#x542B;&#x88AB;&#x5220;&#x9664;&#x9879;&#x76EE;&#x7684;&#x65B0;&#x6570;&#x7EC4;&#x3002;</p>
<p>eg1:&#x5220;&#x9664;&#x5143;&#x7D20;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = [1, 2, 3, 4, 5, 6, 7];
    let item = a.splice(0, 3); // [1,2,3]
    console.log(a); // [4,5,6,7]
    // &#x4ECE;&#x6570;&#x7EC4;&#x4E0B;&#x6807;0&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;
    let item = a.splice(-1, 3); // [7]
    // &#x4ECE;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x56E0;&#x4E3A;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x5220;&#x9664;&#x4E86;7
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    let a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
    let item = a.splice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// [1,2,3]</span>
    console.log(a); <span class="hljs-comment">// [4,5,6,7]</span>
    <span class="hljs-comment">// &#x4ECE;&#x6570;&#x7EC4;&#x4E0B;&#x6807;0&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;</span>
    let item = a.splice(<span class="hljs-number">-1</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// [7]</span>
    <span class="hljs-comment">// &#x4ECE;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x56E0;&#x4E3A;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x5220;&#x9664;&#x4E86;7</span>
</code></pre>
<p>eg2: &#x5220;&#x9664;&#x5E76;&#x6DFB;&#x52A0;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     let a = [1, 2, 3, 4, 5, 6, 7];
    let item = a.splice(0,3,&apos;&#x6DFB;&#x52A0;&apos;); // [1,2,3]
    console.log(a); // [&apos;&#x6DFB;&#x52A0;&apos;,4,5,6,7]
    // &#x4ECE;&#x6570;&#x7EC4;&#x4E0B;&#x6807;0&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&apos;&#x6DFB;&#x52A0;&apos;
     let b = [1, 2, 3, 4, 5, 6, 7];
    let item = b.splice(-2,3,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;); // [6,7]
    console.log(b); // [1,2,3,4,5,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;]
    // &#x4ECE;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&apos;&#x6DFB;&#x52A0;1&apos;&#x3001;&apos;&#x6DFB;&#x52A0;2&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>     let a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
    let item = a.splice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,&apos;&#x6DFB;&#x52A0;&apos;); <span class="hljs-comment">// [1,2,3]</span>
    console.log(a); <span class="hljs-comment">// [&apos;&#x6DFB;&#x52A0;&apos;,4,5,6,7]</span>
    <span class="hljs-comment">// &#x4ECE;&#x6570;&#x7EC4;&#x4E0B;&#x6807;0&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&apos;&#x6DFB;&#x52A0;&apos;</span>
     let b = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
    let item = b.splice(<span class="hljs-number">-2</span>,<span class="hljs-number">3</span>,&apos;&#x6DFB;&#x52A0;<span class="hljs-number">1</span>&apos;,&apos;&#x6DFB;&#x52A0;<span class="hljs-number">2</span>&apos;); <span class="hljs-comment">// [6,7]</span>
    console.log(b); <span class="hljs-comment">// [1,2,3,4,5,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;]</span>
    <span class="hljs-comment">// &#x4ECE;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;3&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&apos;&#x6DFB;&#x52A0;1&apos;&#x3001;&apos;&#x6DFB;&#x52A0;2&apos;</span>
</code></pre>
<p>eg3: &#x4E0D;&#x5220;&#x9664;&#x53EA;&#x6DFB;&#x52A0;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = [1, 2, 3, 4, 5, 6, 7];
    let item = a.splice(0,0,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;); // [] &#x6CA1;&#x6709;&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;
    console.log(a); // [&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;,1,2,3,4,5,6,7]
    let b = [1, 2, 3, 4, 5, 6, 7];
    let item = b.splice(-1,0,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;); // [] &#x6CA1;&#x6709;&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;
    console.log(b); // [1,2,3,4,5,6,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;,7] &#x5728;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x5143;&#x7D20;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    let a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
    let item = a.splice(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,&apos;&#x6DFB;&#x52A0;<span class="hljs-number">1</span>&apos;,&apos;&#x6DFB;&#x52A0;<span class="hljs-number">2</span>&apos;); <span class="hljs-comment">// [] &#x6CA1;&#x6709;&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;</span>
    console.log(a); <span class="hljs-comment">// [&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;,1,2,3,4,5,6,7]</span>
    let b = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
    let item = b.splice(<span class="hljs-number">-1</span>,<span class="hljs-number">0</span>,&apos;&#x6DFB;&#x52A0;<span class="hljs-number">1</span>&apos;,&apos;&#x6DFB;&#x52A0;<span class="hljs-number">2</span>&apos;); <span class="hljs-comment">// [] &#x6CA1;&#x6709;&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;</span>
    console.log(b); <span class="hljs-comment">// [1,2,3,4,5,6,&apos;&#x6DFB;&#x52A0;1&apos;,&apos;&#x6DFB;&#x52A0;2&apos;,7] &#x5728;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x5143;&#x7D20;</span>
</code></pre>
<p>&#x4ECE;&#x4E0A;&#x8FF0;&#x4E09;&#x4E2A;&#x6817;&#x5B50;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;:</p>
<ol>
<li>&#x6570;&#x7EC4;&#x5982;&#x679C;&#x5143;&#x7D20;&#x4E0D;&#x591F;&#xFF0C;&#x4F1A;&#x5220;&#x9664;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E3A;&#x6B62;</li>
<li>&#x64CD;&#x4F5C;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5305;&#x62EC;&#x5F00;&#x59CB;&#x7684;&#x90A3;&#x4E2A;&#x5143;&#x7D20;</li>
<li>&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5F88;&#x591A;&#x4E2A;&#x5143;&#x7D20;</li>
<li>&#x6DFB;&#x52A0;&#x662F;&#x5728;&#x5F00;&#x59CB;&#x7684;&#x5143;&#x7D20;&#x524D;&#x9762;&#x6DFB;&#x52A0;&#x7684;</li>
</ol>
<h4>sort() &#x6570;&#x7EC4;&#x6392;&#x5E8F;</h4>
<p>&#x5B9A;&#x4E49;: sort()&#x65B9;&#x6CD5;&#x5BF9;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x53C2;&#x6570;&#x53EF;&#x9009;: &#x89C4;&#x5B9A;&#x6392;&#x5E8F;&#x987A;&#x5E8F;&#x7684;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x3002;  </p>
<p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;sort()&#x65B9;&#x6CD5;&#x6CA1;&#x6709;&#x4F20;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x9ED8;&#x8BA4;&#x6309;&#x5B57;&#x6BCD;&#x5347;&#x5E8F;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5143;&#x7D20;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;<code>toString()</code>&#x65B9;&#x6CD5;&#x5C06;&#x5143;&#x7D20;&#x8F6C;&#x5316;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x7684;Unicode(&#x4E07;&#x56FD;&#x7801;)&#x4F4D;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6BD4;&#x8F83;&#x5B57;&#x7B26;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x5B57;&#x7B26;&#x4E32;&#x6392;&#x5217; &#x770B;&#x8D77;&#x6765;&#x5F88;&#x6B63;&#x5E38;
    var a = [&quot;Banana&quot;, &quot;Orange&quot;, &quot;Apple&quot;, &quot;Mango&quot;];
    a.sort(); // [&quot;Apple&quot;,&quot;Banana&quot;,&quot;Mango&quot;,&quot;Orange&quot;]
    // &#x6570;&#x5B57;&#x6392;&#x5E8F;&#x7684;&#x65F6;&#x5019; &#x56E0;&#x4E3A;&#x8F6C;&#x6362;&#x6210;Unicode&#x5B57;&#x7B26;&#x4E32;&#x4E4B;&#x540E;&#xFF0C;&#x6709;&#x4E9B;&#x6570;&#x5B57;&#x4F1A;&#x6BD4;&#x8F83;&#x5927;&#x4F1A;&#x6392;&#x5728;&#x540E;&#x9762; &#x8FD9;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;
    var    a = [10, 1, 3, 20,25,8];
    console.log(a.sort()) // [1,10,20,25,3,8];
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-comment">// &#x5B57;&#x7B26;&#x4E32;&#x6392;&#x5217; &#x770B;&#x8D77;&#x6765;&#x5F88;&#x6B63;&#x5E38;</span>
    var a = [<span class="hljs-string">&quot;Banana&quot;</span>, <span class="hljs-string">&quot;Orange&quot;</span>, <span class="hljs-string">&quot;Apple&quot;</span>, <span class="hljs-string">&quot;Mango&quot;</span>];
    a.sort(); <span class="hljs-comment">// [&quot;Apple&quot;,&quot;Banana&quot;,&quot;Mango&quot;,&quot;Orange&quot;]</span>
    <span class="hljs-comment">// &#x6570;&#x5B57;&#x6392;&#x5E8F;&#x7684;&#x65F6;&#x5019; &#x56E0;&#x4E3A;&#x8F6C;&#x6362;&#x6210;Unicode&#x5B57;&#x7B26;&#x4E32;&#x4E4B;&#x540E;&#xFF0C;&#x6709;&#x4E9B;&#x6570;&#x5B57;&#x4F1A;&#x6BD4;&#x8F83;&#x5927;&#x4F1A;&#x6392;&#x5728;&#x540E;&#x9762; &#x8FD9;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;</span>
    var    a = [<span class="hljs-number">10</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">20</span>,<span class="hljs-number">25</span>,<span class="hljs-number">8</span>];
    console.log(a.sort()) <span class="hljs-comment">// [1,10,20,25,3,8];</span>
</code></pre>
<p><strong>&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x7684;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</strong></p>
<p>sort&#x7684;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x6709;&#x4E24;&#x4E2A;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;&#x8981;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x63A5;&#x6536;&#x8FD9;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6570;&#x7EC4;&#x4E2D;&#x4E24;&#x4E2A;&#x8981;&#x6BD4;&#x8F83;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x7528; a &#x548C; b &#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x5C06;&#x8981;&#x6BD4;&#x8F83;&#x7684;&#x5143;&#x7D20;&#xFF1A;</p>
<ul>
<li>&#x82E5;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;&lt;0&#xFF0C;&#x90A3;&#x4E48;a&#x5C06;&#x6392;&#x5230;b&#x7684;&#x524D;&#x9762;;</li>
<li>&#x82E5;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;=0&#xFF0C;&#x90A3;&#x4E48;a &#x548C; b &#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;&#x4E0D;&#x53D8;&#xFF1B;</li>
<li>&#x82E5;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;&gt;0&#xFF0C;&#x90A3;&#x4E48;b &#x6392;&#x5728;a &#x5C06;&#x7684;&#x524D;&#x9762;&#xFF1B;</li>
</ul>
<p>&#x5BF9;&#x4E8E;sort()&#x65B9;&#x6CD5;&#x66F4;&#x6DF1;&#x5C42;&#x7EA7;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x4EE5;&#x53CA;&#x5904;&#x7406;&#x673A;&#x5236;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;<a href="https://juejin.im/entry/59f7f3346fb9a04514635552" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x4E86;&#x89E3;javascript&#x7684;sort&#x65B9;&#x6CD5;</a></p>
<p><strong>sort&#x6392;&#x5E8F;&#x5E38;&#x89C1;&#x7528;&#x6CD5;</strong>&#xFF1A;</p>
<ol>
<li>&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4E3A;&#x6570;&#x5B57;&#x7684;&#x5347;&#x5E8F;&#x3001;&#x964D;&#x5E8F;:<p>var array =  [10, 1, 3, 4,20,4,25,8];<br>// &#x5347;&#x5E8F; a-b &lt; 0   a&#x5C06;&#x6392;&#x5230;b&#x7684;&#x524D;&#x9762;&#xFF0C;&#x6309;&#x7167;a&#x7684;&#x5927;&#x5C0F;&#x6765;&#x6392;&#x5E8F;&#x7684; <br>// &#x6BD4;&#x5982;&#x88AB;&#x51CF;&#x6570;a&#x662F;10&#xFF0C;&#x51CF;&#x6570;&#x662F;20  10-20 &lt; 0   &#x88AB;&#x51CF;&#x6570;a(10)&#x5728;&#x51CF;&#x6570;b(20)&#x524D;&#x9762;   <br>array.sort(function(a,b){<br>  return a-b;<br>});<br>console.log(array); // [1,3,4,4,8,10,20,25];<br>// &#x964D;&#x5E8F; &#x88AB;&#x51CF;&#x6570;&#x548C;&#x51CF;&#x6570;&#x8C03;&#x6362;&#x4E86;  20-10&gt;0 &#x88AB;&#x51CF;&#x6570;b(20)&#x5728;&#x51CF;&#x6570;a(10)&#x7684;&#x524D;&#x9762;<br>array.sort(function(a,b){<br>  return b-a;<br>});<br>console.log(array); // [25,20,10,8,4,4,3,1];</p>
</li>
<li>
<p>&#x6570;&#x7EC4;&#x591A;&#x6761;&#x4EF6;&#x6392;&#x5E8F;</p>
<p>var array = [{id:10,age:2},{id:5,age:4},{id:6,age:10},{id:9,age:6},{id:2,age:8},{id:10,age:9}];</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="array.sort(function(a,b){
    if(a.id === b.id){// &#x5982;&#x679C;id&#x7684;&#x503C;&#x76F8;&#x7B49;&#xFF0C;&#x6309;&#x7167;age&#x7684;&#x503C;&#x964D;&#x5E8F;
        return b.age - a.age
    }else{ // &#x5982;&#x679C;id&#x7684;&#x503C;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x6309;&#x7167;id&#x7684;&#x503C;&#x5347;&#x5E8F;
        return a.id - b.id
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">array</span>.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span></span>{
    <span class="hljs-keyword">if</span>(a.id === b.id){<span class="hljs-comment">// &#x5982;&#x679C;id&#x7684;&#x503C;&#x76F8;&#x7B49;&#xFF0C;&#x6309;&#x7167;age&#x7684;&#x503C;&#x964D;&#x5E8F;</span>
        <span class="hljs-keyword">return</span> b.age - a.age
    }<span class="hljs-keyword">else</span>{ <span class="hljs-comment">// &#x5982;&#x679C;id&#x7684;&#x503C;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x6309;&#x7167;id&#x7684;&#x503C;&#x5347;&#x5E8F;</span>
        <span class="hljs-keyword">return</span> a.id - b.id
    }
})</code></pre>
<p>// [{&quot;id&quot;:2,&quot;age&quot;:8},{&quot;id&quot;:5,&quot;age&quot;:4},{&quot;id&quot;:6,&quot;age&quot;:10},{&quot;id&quot;:9,&quot;age&quot;:6},{&quot;id&quot;:10,&quot;age&quot;:9},{&quot;id&quot;:10,&quot;age&quot;:2}]</p>
</li>
<li>&#x81EA;&#x5B9A;&#x4E49;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#xFF0C;&#x5929;&#x7A7A;&#x624D;&#x662F;&#x4F60;&#x7684;&#x6781;&#x9650;</li>
</ol>
<p>&#x7C7B;&#x4F3C;&#x7684;&#xFF1A;<strong>&#x8FD0;&#x7528;&#x597D;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5199;&#x51FA;&#x4EFB;&#x610F;&#x7B26;&#x5408;&#x81EA;&#x5DF1;&#x9700;&#x6C42;&#x7684;&#x6BD4;&#x8F83;&#x51FD;&#x6570;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var array = [{name:&apos;Koro1&apos;},{name:&apos;Koro1&apos;},{name:&apos;OB&apos;},{name:&apos;Koro1&apos;},{name:&apos;OB&apos;},{name:&apos;OB&apos;}];
    array.sort(function(a,b){
        if(a.name === &apos;Koro1&apos;){// &#x5982;&#x679C;name&#x662F;&apos;Koro1&apos; &#x8FD4;&#x56DE;-1 &#xFF0C;-1&lt;0 a&#x6392;&#x5728;b&#x7684;&#x524D;&#x9762;
            return -1
        }else{ // &#x5982;&#x679C;&#x4E0D;&#x662F;&#x7684;&#x8BDD;&#xFF0C;a&#x6392;&#x5728;b&#x7684;&#x540E;&#x9762;
          return 1
        }
    })
    // [{&quot;name&quot;:&quot;Koro1&quot;},{&quot;name&quot;:&quot;Koro1&quot;},{&quot;name&quot;:&quot;Koro1&quot;},{&quot;name&quot;:&quot;OB&quot;},{&quot;name&quot;:&quot;OB&quot;},{&quot;name&quot;:&quot;OB&quot;}] 
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>    var <span class="hljs-keyword">array</span> = [{name:<span class="hljs-string">&apos;Koro1&apos;</span>},{name:<span class="hljs-string">&apos;Koro1&apos;</span>},{name:<span class="hljs-string">&apos;OB&apos;</span>},{name:<span class="hljs-string">&apos;Koro1&apos;</span>},{name:<span class="hljs-string">&apos;OB&apos;</span>},{name:<span class="hljs-string">&apos;OB&apos;</span>}];
    <span class="hljs-keyword">array</span>.sort(<span class="hljs-keyword">function</span>(a,b){
        if(a.name === <span class="hljs-string">&apos;Koro1&apos;</span>){// &#x5982;&#x679C;name&#x662F;<span class="hljs-string">&apos;Koro1&apos;</span> &#x8FD4;&#x56DE;-<span class="hljs-number">1</span> &#xFF0C;-<span class="hljs-number">1</span>&lt;<span class="hljs-number">0</span> a&#x6392;&#x5728;b&#x7684;&#x524D;&#x9762;
            return -<span class="hljs-number">1</span>
        }else{ // &#x5982;&#x679C;&#x4E0D;&#x662F;&#x7684;&#x8BDD;&#xFF0C;a&#x6392;&#x5728;b&#x7684;&#x540E;&#x9762;
          return <span class="hljs-number">1</span>
        }
    })
    // [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;Koro1&quot;</span>},{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;Koro1&quot;</span>},{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;Koro1&quot;</span>},{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;OB&quot;</span>},{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;OB&quot;</span>},{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;OB&quot;</span>}] 
</code></pre>
<h4>pop() &#x5220;&#x9664;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x540E;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</h4>
<p>&#x5B9A;&#x4E49;: pop() &#x65B9;&#x6CD5;&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x540E;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p>
<p>&#x53C2;&#x6570;: &#x65E0;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let  a =  [1,2,3];
    let item = a.pop();  // 3
    console.log(a); // [1,2]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gauss"><code>    <span class="hljs-keyword">let</span>  a =  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-keyword">let</span> item = a.<span class="hljs-keyword">pop</span>();  <span class="hljs-comment">// 3</span>
    console.<span class="hljs-built_in">log</span>(a); <span class="hljs-comment">// [1,2]</span>
</code></pre>
<h4>shift() &#x5220;&#x9664;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</h4>
<p>&#x5B9A;&#x4E49;: shift()&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p>
<p>&#x53C2;&#x6570;: &#x65E0;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let  a =  [1,2,3];
    let item = a.shift();  // 1
    console.log(a); // [2,3]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gauss"><code>    <span class="hljs-keyword">let</span>  a =  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-keyword">let</span> item = a.shift();  <span class="hljs-comment">// 1</span>
    console.<span class="hljs-built_in">log</span>(a); <span class="hljs-comment">// [2,3]</span>
</code></pre>
<h4>push() &#x5411;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x5143;&#x7D20;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;push() &#x65B9;&#x6CD5;&#x53EF;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;</p>
<p>&#x53C2;&#x6570;:  item1, item2, ..., itemX ,&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x7684;&#x5143;&#x7D20;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let  a =  [1,2,3];
    let item = a.push(&apos;&#x672B;&#x5C3E;&apos;);  // 4
    console.log(a); // [1,2,3,&apos;&#x672B;&#x5C3E;&apos;]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gauss"><code>    <span class="hljs-keyword">let</span>  a =  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-keyword">let</span> item = a.<span class="hljs-keyword">push</span>(&apos;&#x672B;&#x5C3E;&apos;);  <span class="hljs-comment">// 4</span>
    console.<span class="hljs-built_in">log</span>(a); <span class="hljs-comment">// [1,2,3,&apos;&#x672B;&#x5C3E;&apos;]</span>
</code></pre>
<h4>unshift()</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;unshift() &#x65B9;&#x6CD5;&#x53EF;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x5F00;&#x5934;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x66F4;&#x591A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;</p>
<p>&#x53C2;&#x6570;:  item1, item2, ..., itemX ,&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x5F00;&#x5934;&#x7684;&#x5143;&#x7D20;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let  a =  [1,2,3];
    let item = a.unshift(&apos;&#x5F00;&#x5934;&apos;);  // 4
    console.log(a); // [&apos;&#x5F00;&#x5934;&apos;,1,2,3]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">let</span>  a =  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-keyword">let</span> item = a.unshift(<span class="hljs-string">&apos;&#x5F00;&#x5934;&apos;</span>);  <span class="hljs-comment">// 4</span>
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// [&apos;&#x5F00;&#x5934;&apos;,1,2,3]</span>
</code></pre>
<h4>reverse() &#x98A0;&#x5012;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;</h4>
<p>&#x5B9A;&#x4E49;: reverse() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x98A0;&#x5012;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;&#x3002;</p>
<p>&#x53C2;&#x6570;: &#x65E0;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let  a =  [1,2,3];
    a.reverse();  
    console.log(a); // [3,2,1]

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    let  a =  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    a.reverse();  
    console.log(a); <span class="hljs-comment">// [3,2,1]</span>

</code></pre>
<h4>ES6: copyWithin() &#x6307;&#x5B9A;&#x4F4D;&#x7F6E;&#x7684;&#x6210;&#x5458;&#x590D;&#x5236;&#x5230;&#x5176;&#x4ED6;&#x4F4D;&#x7F6E;</h4>
<p>&#x5B9A;&#x4E49;: &#x5728;&#x5F53;&#x524D;&#x6570;&#x7EC4;&#x5185;&#x90E8;&#xFF0C;&#x5C06;&#x6307;&#x5B9A;&#x4F4D;&#x7F6E;&#x7684;&#x6210;&#x5458;&#x590D;&#x5236;&#x5230;&#x5176;&#x4ED6;&#x4F4D;&#x7F6E;,&#x5E76;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.copyWithin(target, start = 0, end = this.length)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs arduino"><code>    <span class="hljs-keyword">array</span>.copyWithin(target, start = <span class="hljs-number">0</span>, <span class="hljs-built_in">end</span> = <span class="hljs-keyword">this</span>.length)
</code></pre>
<p>&#x53C2;&#x6570;:</p>
<p>&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6570;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x8F6C;&#x4E3A;&#x6570;&#x503C;.</p>
<ol>
<li>target&#xFF08;&#x5FC5;&#x9700;&#xFF09;&#xFF1A;&#x4ECE;&#x8BE5;&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x66FF;&#x6362;&#x6570;&#x636E;&#x3002;&#x5982;&#x679C;&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x5012;&#x6570;&#x3002;</li>
<li>start&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF1A;&#x4ECE;&#x8BE5;&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x8BFB;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; 0&#x3002;&#x5982;&#x679C;&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x5012;&#x6570;&#x3002;</li>
<li>end&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF1A;&#x5230;&#x8BE5;&#x4F4D;&#x7F6E;&#x524D;&#x505C;&#x6B62;&#x8BFB;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x9ED8;&#x8BA4;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x3002;&#x4F7F;&#x7528;&#x8D1F;&#x6570;&#x53EF;&#x4ECE;&#x6570;&#x7EC4;&#x7ED3;&#x5C3E;&#x5904;&#x89C4;&#x5B9A;&#x4F4D;&#x7F6E;&#x3002;</li>
</ol>
<p>&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;(MDN): chrome 45,Edge 12,Firefox32,Opera 32,Safari 9, IE &#x4E0D;&#x652F;&#x6301;</p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // -2&#x76F8;&#x5F53;&#x4E8E;3&#x53F7;&#x4F4D;&#xFF0C;-1&#x76F8;&#x5F53;&#x4E8E;4&#x53F7;&#x4F4D;
        [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
        // [4, 2, 3, 4, 5]
        var a=[&apos;OB1&apos;,&apos;Koro1&apos;,&apos;OB2&apos;,&apos;Koro2&apos;,&apos;OB3&apos;,&apos;Koro3&apos;,&apos;OB4&apos;,&apos;Koro4&apos;,&apos;OB5&apos;,&apos;Koro5&apos;]
        // 2&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x88AB;&#x66FF;&#x6362;,3&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x8BFB;&#x53D6;&#x8981;&#x66FF;&#x6362;&#x7684; 5&#x4F4D;&#x7F6E;&#x524D;&#x9762;&#x505C;&#x6B62;&#x66FF;&#x6362;
        a.copyWithin(2,3,5)
        // [&quot;OB1&quot;,&quot;Koro1&quot;,&quot;Koro2&quot;,&quot;OB3&quot;,&quot;OB3&quot;,&quot;Koro3&quot;,&quot;OB4&quot;,&quot;Koro4&quot;,&quot;OB5&quot;,&quot;Koro5&quot;] 
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs awk"><code>        <span class="hljs-regexp">//</span> -<span class="hljs-number">2</span>&#x76F8;&#x5F53;&#x4E8E;<span class="hljs-number">3</span>&#x53F7;&#x4F4D;&#xFF0C;-<span class="hljs-number">1</span>&#x76F8;&#x5F53;&#x4E8E;<span class="hljs-number">4</span>&#x53F7;&#x4F4D;
        [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].copyWithin(<span class="hljs-number">0</span>, -<span class="hljs-number">2</span>, -<span class="hljs-number">1</span>)
        <span class="hljs-regexp">//</span> [<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
        var a=[<span class="hljs-string">&apos;OB1&apos;</span>,<span class="hljs-string">&apos;Koro1&apos;</span>,<span class="hljs-string">&apos;OB2&apos;</span>,<span class="hljs-string">&apos;Koro2&apos;</span>,<span class="hljs-string">&apos;OB3&apos;</span>,<span class="hljs-string">&apos;Koro3&apos;</span>,<span class="hljs-string">&apos;OB4&apos;</span>,<span class="hljs-string">&apos;Koro4&apos;</span>,<span class="hljs-string">&apos;OB5&apos;</span>,<span class="hljs-string">&apos;Koro5&apos;</span>]
        <span class="hljs-regexp">//</span> <span class="hljs-number">2</span>&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x88AB;&#x66FF;&#x6362;,<span class="hljs-number">3</span>&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x8BFB;&#x53D6;&#x8981;&#x66FF;&#x6362;&#x7684; <span class="hljs-number">5</span>&#x4F4D;&#x7F6E;&#x524D;&#x9762;&#x505C;&#x6B62;&#x66FF;&#x6362;
        a.copyWithin(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>)
        <span class="hljs-regexp">//</span> [<span class="hljs-string">&quot;OB1&quot;</span>,<span class="hljs-string">&quot;Koro1&quot;</span>,<span class="hljs-string">&quot;Koro2&quot;</span>,<span class="hljs-string">&quot;OB3&quot;</span>,<span class="hljs-string">&quot;OB3&quot;</span>,<span class="hljs-string">&quot;Koro3&quot;</span>,<span class="hljs-string">&quot;OB4&quot;</span>,<span class="hljs-string">&quot;Koro4&quot;</span>,<span class="hljs-string">&quot;OB5&quot;</span>,<span class="hljs-string">&quot;Koro5&quot;</span>] 
</code></pre>
<p>&#x4ECE;&#x4E0A;&#x8FF0;&#x6817;&#x5B50;:</p>
<ol>
<li>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5F00;&#x59CB;&#x88AB;&#x66FF;&#x6362;&#x7684;&#x5143;&#x7D20;&#x4F4D;&#x7F6E;</li>
<li>&#x8981;&#x66FF;&#x6362;&#x6570;&#x636E;&#x7684;&#x4F4D;&#x7F6E;&#x8303;&#x56F4;:&#x4ECE;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5F00;&#x59CB;&#x8BFB;&#x53D6;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x524D;&#x9762;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x505C;&#x6B62;&#x8BFB;&#x53D6;</li>
<li>&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;</li>
<li><strong>&#x8BFB;&#x4E86;&#x51E0;&#x4E2A;&#x5143;&#x7D20;&#x5C31;&#x4ECE;&#x5F00;&#x59CB;&#x88AB;&#x66FF;&#x6362;&#x7684;&#x5730;&#x65B9;&#x66FF;&#x6362;&#x51E0;&#x4E2A;&#x5143;&#x7D20;</strong></li>
</ol>
<h4>ES6: fill() &#x586B;&#x5145;&#x6570;&#x7EC4;</h4>
<p>&#x5B9A;&#x4E49;:  &#x4F7F;&#x7528;&#x7ED9;&#x5B9A;&#x503C;&#xFF0C;&#x586B;&#x5145;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x53C2;&#x6570;:</p>
<p>&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;(&#x5FC5;&#x987B;): &#x8981;&#x586B;&#x5145;&#x6570;&#x7EC4;&#x7684;&#x503C;</p>
<p>&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;(&#x53EF;&#x9009;): &#x586B;&#x5145;&#x7684;&#x5F00;&#x59CB;&#x4F4D;&#x7F6E;,&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0</p>
<p>&#x7B2C;&#x4E09;&#x4E2A;&#x5143;&#x7D20;(&#x53EF;&#x9009;)&#xFF1A;&#x586B;&#x5145;&#x7684;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x4E3A;<code>this.length</code></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7" rel="nofollow noreferrer" target="_blank">MDN&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;].fill(7)
    // [7, 7, 7]
    [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;].fill(7, 1, 2)
    // [&apos;a&apos;, 7, &apos;c&apos;]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs prolog"><code>    [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>].fill(<span class="hljs-number">7</span>)
    // [<span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]
    [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>].fill(<span class="hljs-number">7</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
    // [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&apos;c&apos;</span>]
</code></pre>
<hr>
<h3 id="articleHeader5">&#x4E0D;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;(8&#x4E2A;):</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ES5&#xFF1A;
    slice&#x3001;join&#x3001;toLocateString&#x3001;toStrigin&#x3001;cancat&#x3001;indexOf&#x3001;lastIndexOf&#x3001;
    ES7&#xFF1A;
    includes
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code>    ES5&#xFF1A;
    slice&#x3001;<span class="hljs-keyword">join</span>&#x3001;toLocateString&#x3001;toStrigin&#x3001;cancat&#x3001;indexOf&#x3001;lastIndexOf&#x3001;
    ES7&#xFF1A;
    <span class="hljs-keyword">includes</span>
</code></pre>
<h4>slice() &#x6D45;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A; &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4ECE;&#x5F00;&#x59CB;&#x5230;&#x7ED3;&#x675F;&#xFF08;&#x4E0D;&#x5305;&#x62EC;&#x7ED3;&#x675F;&#xFF09;&#x9009;&#x62E9;&#x7684;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x6D45;&#x62F7;&#x8D1D;&#x5230;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF0C;&#x4E14;&#x539F;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x4FEE;&#x6539;&#x3002;</p>
<p><strong>&#x6CE8;&#x610F;</strong>&#xFF1A;&#x5B57;&#x7B26;&#x4E32;&#x4E5F;&#x6709;&#x4E00;&#x4E2A;slice() &#x65B9;&#x6CD5;&#x662F;&#x7528;&#x6765;&#x63D0;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#xFF0C;&#x4E0D;&#x8981;&#x5F04;&#x6DF7;&#x4E86;&#x3002;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.slice(begin, end);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>    <span class="hljs-keyword">array</span>.slice(<span class="hljs-keyword">begin</span>, <span class="hljs-keyword">end</span>);
</code></pre>
<p>&#x53C2;&#x6570;: </p>
<p>begin(&#x53EF;&#x9009;): &#x7D22;&#x5F15;&#x6570;&#x503C;,&#x63A5;&#x53D7;&#x8D1F;&#x503C;&#xFF0C;&#x4ECE;&#x8BE5;&#x7D22;&#x5F15;&#x5904;&#x5F00;&#x59CB;&#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;,&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#x3002;</p>
<p>end(&#x53EF;&#x9009;):&#x7D22;&#x5F15;&#x6570;&#x503C;(&#x4E0D;&#x5305;&#x62EC;),&#x63A5;&#x53D7;&#x8D1F;&#x503C;&#xFF0C;&#x5728;&#x8BE5;&#x7D22;&#x5F15;&#x5904;&#x524D;&#x7ED3;&#x675F;&#x63D0;&#x53D6;&#x539F;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;&#x6570;&#x7EC4;&#x672B;&#x5C3E;(&#x5305;&#x62EC;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;)&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a= [&apos;hello&apos;,&apos;world&apos;];
    let b=a.slice(0,1); // [&apos;hello&apos;]
    a[0]=&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;;
    console.log(a,b); // [&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;,&apos;world&apos;] [&apos;hello&apos;]
    b[0]=&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x7684;&#x6570;&#x7EC4;&apos;;
     console.log(a,b); // [&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;,&apos;world&apos;] [&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x7684;&#x6570;&#x7EC4;&apos;]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs prolog"><code>    let a= [<span class="hljs-string">&apos;hello&apos;</span>,<span class="hljs-string">&apos;world&apos;</span>];
    let b=a.slice(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>); // [<span class="hljs-string">&apos;hello&apos;</span>]
    a[<span class="hljs-number">0</span>]=<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;</span>;
    console.log(a,b); // [<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;</span>,<span class="hljs-string">&apos;world&apos;</span>] [<span class="hljs-string">&apos;hello&apos;</span>]
    b[<span class="hljs-number">0</span>]=<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x7684;&#x6570;&#x7EC4;&apos;</span>;
     console.log(a,b); // [<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;</span>,<span class="hljs-string">&apos;world&apos;</span>] [<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x7684;&#x6570;&#x7EC4;&apos;</span>]
</code></pre>
<p>&#x5982;&#x4E0A;&#xFF1A;&#x65B0;&#x6570;&#x7EC4;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#xFF0C;<strong>&#x5143;&#x7D20;&#x662F;&#x7B80;&#x5355;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x6539;&#x53D8;&#x4E4B;&#x540E;&#x4E0D;&#x4F1A;&#x4E92;&#x76F8;&#x5E72;&#x6270;</strong>&#x3002;</p>
<p>&#x5982;&#x679C;&#x662F;<strong>&#x590D;&#x6742;&#x6570;&#x636E;&#x7C7B;&#x578B;(&#x5BF9;&#x8C61;,&#x6570;&#x7EC4;)&#x7684;&#x8BDD;&#xFF0C;&#x6539;&#x53D8;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#xFF0C;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a= [{name:&apos;OBKoro1&apos;}];
    let b=a.slice();
    console.log(b,a); // [{&quot;name&quot;:&quot;OBKoro1&quot;}]  [{&quot;name&quot;:&quot;OBKoro1&quot;}]
    // a[0].name=&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;;
    // console.log(b,a); // [{&quot;name&quot;:&quot;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&quot;}] [{&quot;name&quot;:&quot;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&quot;}]
    // b[0].name=&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&apos;,b[0].koro=&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&apos;;
    //  [{&quot;name&quot;:&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;,&quot;koro&quot;:&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;}] [{&quot;name&quot;:&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;,&quot;koro&quot;:&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;}]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs prolog"><code>    let a= [{name:<span class="hljs-string">&apos;OBKoro1&apos;</span>}];
    let b=a.slice();
    console.log(b,a); // [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;OBKoro1&quot;</span>}]  [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;OBKoro1&quot;</span>}]
    // a[<span class="hljs-number">0</span>].name=<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&apos;</span>;
    // console.log(b,a); // [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&quot;</span>}] [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&quot;</span>}]
    // b[<span class="hljs-number">0</span>].name=<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&apos;</span>,b[<span class="hljs-number">0</span>].koro=<span class="hljs-string">&apos;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&apos;</span>;
    //  [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;</span>,<span class="hljs-string">&quot;koro&quot;</span>:<span class="hljs-string">&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;</span>}] [{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;</span>,<span class="hljs-string">&quot;koro&quot;</span>:<span class="hljs-string">&quot;&#x6539;&#x53D8;&#x62F7;&#x8D1D;&#x6570;&#x7EC4;&quot;</span>}]
</code></pre>
<p>&#x539F;&#x56E0;&#x5728;&#x5B9A;&#x4E49;&#x4E0A;&#x9762;&#x8BF4;&#x8FC7;&#x4E86;&#x7684;&#xFF1A;slice()&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x5BF9;&#x4E8E;&#x590D;&#x6742;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x62F7;&#x8D1D;&#x7684;&#x53EA;&#x662F;&#x6307;&#x5411;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x6307;&#x9488;&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x8BBA;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x8FD8;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x90FD;&#x662F;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x6570;&#x636E;&#x3002;</p>
<h4>join()  &#x6570;&#x7EC4;&#x8F6C;&#x5B57;&#x7B26;&#x4E32;</h4>
<p>&#x5B9A;&#x4E49;:  join() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x7684;&#x5206;&#x9694;&#x7B26;&#x8FDB;&#x884C;&#x5206;&#x9694;&#x653E;&#x5165;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD4;&#x56DE;&#x751F;&#x6210;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.join(str)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code>    <span class="hljs-built_in">array</span>.<span class="hljs-keyword">join</span>(str)
</code></pre>
<p>&#x53C2;&#x6570;:</p>
<p>str(&#x53EF;&#x9009;): &#x6307;&#x5B9A;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x9017;&#x53F7;&#x4F5C;&#x4E3A;&#x5206;&#x9694;&#x7B26;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a= [&apos;hello&apos;,&apos;world&apos;];
    let str=a.join(); // &apos;hello,world&apos;
    let str2=a.join(&apos;+&apos;); // &apos;hello+world&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-keyword">let</span> a= [<span class="hljs-string">&apos;hello&apos;</span>,<span class="hljs-string">&apos;world&apos;</span>];
    <span class="hljs-keyword">let</span> str=a.<span class="hljs-keyword">join</span>(); <span class="hljs-comment">// &apos;hello,world&apos;</span>
    <span class="hljs-keyword">let</span> str2=a.<span class="hljs-keyword">join</span>(<span class="hljs-string">&apos;+&apos;</span>); <span class="hljs-comment">// &apos;hello+world&apos;</span>
</code></pre>
<p>&#x4F7F;&#x7528;join&#x65B9;&#x6CD5;&#x6216;&#x8005;&#x4E0B;&#x6587;&#x8BF4;&#x5230;&#x7684;toString&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5F53;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x4E5F;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x662F;&#x5BF9;&#x8C61;&#x65F6;&#x4F1A;&#x51FA;&#x73B0;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#xFF1F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a= [[&apos;OBKoro1&apos;,&apos;23&apos;],&apos;test&apos;];
    let str1=a.join(); // OBKoro1,23,test
    let b= [{name:&apos;OBKoro1&apos;,age:&apos;23&apos;},&apos;test&apos;];
    let str2 = b.join(); // [object Object],test
    // &#x5BF9;&#x8C61;&#x8F6C;&#x5B57;&#x7B26;&#x4E32;&#x63A8;&#x8350;JSON.stringify(obj);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-keyword">let</span> a= [[<span class="hljs-string">&apos;OBKoro1&apos;</span>,<span class="hljs-string">&apos;23&apos;</span>],<span class="hljs-string">&apos;test&apos;</span>];
    <span class="hljs-keyword">let</span> str1=a.<span class="hljs-keyword">join</span>(); <span class="hljs-comment">// OBKoro1,23,test</span>
    <span class="hljs-keyword">let</span> b= [{name:<span class="hljs-string">&apos;OBKoro1&apos;</span>,age:<span class="hljs-string">&apos;23&apos;</span>},<span class="hljs-string">&apos;test&apos;</span>];
    <span class="hljs-keyword">let</span> str2 = b.<span class="hljs-keyword">join</span>(); <span class="hljs-comment">// [object Object],test</span>
    <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x8F6C;&#x5B57;&#x7B26;&#x4E32;&#x63A8;&#x8350;JSON.stringify(obj);</span>
</code></pre>
<p>&#x6240;&#x4EE5;&#xFF0C;<code>join()/toString()</code>&#x65B9;&#x6CD5;&#x5728;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x662F;&#x6570;&#x7EC4;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x5C06;&#x91CC;&#x9762;&#x7684;&#x6570;&#x7EC4;&#x4E5F;&#x8C03;&#x7528;<code>join()/toString()</code>,&#x5982;&#x679C;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#xFF0C;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x8F6C;&#x4E3A;<code>[object Object]</code>&#x5B57;&#x7B26;&#x4E32;&#x3002;</p>
<h4>toLocaleString() &#x6570;&#x7EC4;&#x8F6C;&#x5B57;&#x7B26;&#x4E32;</h4>
<p>&#x5B9A;&#x4E49;: &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8868;&#x793A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x7531;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7684; toLocaleString() &#x8FD4;&#x56DE;&#x503C;&#x7ECF;&#x8C03;&#x7528; join() &#x65B9;&#x6CD5;&#x8FDE;&#x63A5;&#xFF08;&#x7531;&#x9017;&#x53F7;&#x9694;&#x5F00;&#xFF09;&#x7EC4;&#x6210;&#x3002;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.toLocaleString()
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>    <span class="hljs-keyword">array</span>.toLocaleString()
</code></pre>
<p>&#x53C2;&#x6570;&#xFF1A;&#x65E0;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a=[{name:&apos;OBKoro1&apos;},23,&apos;abcd&apos;,new Date()];
    let str=a.toLocaleString(); // [object Object],23,abcd,2018/5/28 &#x4E0B;&#x5348;1:52:20 
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">let</span> a=[{<span class="hljs-attr">name</span>:<span class="hljs-string">&apos;OBKoro1&apos;</span>},<span class="hljs-number">23</span>,<span class="hljs-string">&apos;abcd&apos;</span>,<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()];
    <span class="hljs-keyword">let</span> str=a.toLocaleString(); <span class="hljs-comment">// [object Object],23,abcd,2018/5/28 &#x4E0B;&#x5348;1:52:20 </span>
</code></pre>
<p>&#x5982;&#x4E0A;&#x8FF0;&#x6817;&#x5B50;&#xFF1A;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x7684;<code>toLocaleString</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#x7684;<code>toLocaleString</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x8C61;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684;<code>toLocaleString</code>,Date&#x8C03;&#x7528;Date&#x7684;<code>toLocaleString</code>&#x3002;</p>
<h4>toString() &#x6570;&#x7EC4;&#x8F6C;&#x5B57;&#x7B26;&#x4E32; &#x4E0D;&#x63A8;&#x8350;</h4>
<p>&#x5B9A;&#x4E49;: toString() &#x65B9;&#x6CD5;&#x53EF;&#x628A;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x7531;&#x9017;&#x53F7;&#x94FE;&#x63A5;&#x8D77;&#x6765;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.toString()
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>    <span class="hljs-keyword">array</span>.toString()
</code></pre>
<p>&#x53C2;&#x6570;: &#x65E0;&#x3002;</p>
<p>&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x6548;&#x679C;&#x548C;join&#x65B9;&#x6CD5;&#x4E00;&#x6837;&#xFF0C;&#x90FD;&#x662F;&#x7528;&#x4E8E;&#x6570;&#x7EC4;&#x8F6C;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4E0E;join&#x65B9;&#x6CD5;&#x76F8;&#x6BD4;&#x6CA1;&#x6709;&#x4F18;&#x52BF;&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x3002;</p>
<p><strong>&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;</strong>&#xFF1A;&#x5F53;&#x6570;&#x7EC4;&#x548C;&#x5B57;&#x7B26;&#x4E32;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#xFF0C;js &#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   let b= [ &apos;toString&apos;,&apos;&#x6F14;&#x793A;&apos;].toString(); // toString,&#x6F14;&#x793A;
   let a= [&apos;&#x8C03;&#x7528;toString&apos;,&apos;&#x8FDE;&#x63A5;&#x5728;&#x6211;&#x540E;&#x9762;&apos;]+&apos;&#x5566;&#x5566;&#x5566;&apos;; // &#x8C03;&#x7528;toString,&#x8FDE;&#x63A5;&#x5728;&#x6211;&#x540E;&#x9762;&#x5566;&#x5566;&#x5566;

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ceylon"><code>   <span class="hljs-keyword">let</span> b= [ <span class="hljs-string">&apos;toString&apos;</span>,<span class="hljs-string">&apos;&#x6F14;&#x793A;&apos;</span>].toString(); <span class="hljs-comment">// toString,&#x6F14;&#x793A;</span>
   <span class="hljs-keyword">let</span> a= [<span class="hljs-string">&apos;&#x8C03;&#x7528;toString&apos;</span>,<span class="hljs-string">&apos;&#x8FDE;&#x63A5;&#x5728;&#x6211;&#x540E;&#x9762;&apos;</span>]+<span class="hljs-string">&apos;&#x5566;&#x5566;&#x5566;&apos;</span>; <span class="hljs-comment">// &#x8C03;&#x7528;toString,&#x8FDE;&#x63A5;&#x5728;&#x6211;&#x540E;&#x9762;&#x5566;&#x5566;&#x5566;</span>

</code></pre>
<h4>cancat</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A; &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5408;&#x5E76;&#x4E24;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var newArr =oldArray.concat(arrayX,arrayX,......,arrayX)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs clean"><code>    var newArr =oldArray.concat(arrayX,arrayX,......,arrayX)
</code></pre>
<p>&#x53C2;&#x6570;&#xFF1A;</p>
<p>arrayX&#xFF08;&#x5FC5;&#x987B;&#xFF09;&#xFF1A;&#x8BE5;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x4F53;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x591A;&#x4E2A;&#x3002;</p>
<p>eg1:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = [1, 2, 3];
    let b = [4, 5, 6];
    //&#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;
    let newVal=a.concat(b); // [1,2,3,4,5,6]
    // &#x8FDE;&#x63A5;&#x4E09;&#x4E2A;&#x6570;&#x7EC4;
    let c = [7, 8, 9]
    let newVal2 = a.concat(b, c); // [1,2,3,4,5,6,7,8,9]
    // &#x6DFB;&#x52A0;&#x5143;&#x7D20;
    let newVal3 = a.concat(&apos;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&apos;,b, c,&apos;&#x518D;&#x52A0;&#x4E00;&#x4E2A;&apos;); 
    // [1,2,3,&quot;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&quot;,4,5,6,7,8,9,&quot;&#x518D;&#x52A0;&#x4E00;&#x4E2A;&quot;]
   // &#x5408;&#x5E76;&#x5D4C;&#x5957;&#x6570;&#x7EC4;  &#x4F1A;&#x6D45;&#x62F7;&#x8D1D;&#x5D4C;&#x5957;&#x6570;&#x7EC4;
   let d = [1,2 ];
   let f = [3,[4]];
   let newVal4 = d.concat(f); // [1,2,3,[4]]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    let a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    let b = [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];
    <span class="hljs-comment">//&#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;</span>
    let newVal=a.concat(b); <span class="hljs-comment">// [1,2,3,4,5,6]</span>
    <span class="hljs-comment">// &#x8FDE;&#x63A5;&#x4E09;&#x4E2A;&#x6570;&#x7EC4;</span>
    let c = [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>]
    let newVal2 = a.concat(b, c); <span class="hljs-comment">// [1,2,3,4,5,6,7,8,9]</span>
    <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x5143;&#x7D20;</span>
    let newVal3 = a.concat(&apos;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&apos;,b, c,&apos;&#x518D;&#x52A0;&#x4E00;&#x4E2A;&apos;); 
    <span class="hljs-comment">// [1,2,3,&quot;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&quot;,4,5,6,7,8,9,&quot;&#x518D;&#x52A0;&#x4E00;&#x4E2A;&quot;]</span>
   <span class="hljs-comment">// &#x5408;&#x5E76;&#x5D4C;&#x5957;&#x6570;&#x7EC4;  &#x4F1A;&#x6D45;&#x62F7;&#x8D1D;&#x5D4C;&#x5957;&#x6570;&#x7EC4;</span>
   let d = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span> ];
   let f = [<span class="hljs-number">3</span>,[<span class="hljs-number">4</span>]];
   let newVal4 = d.concat(f); <span class="hljs-comment">// [1,2,3,[4]]</span>
</code></pre>
<p><strong>ES6&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;<code>...</code>&#x5408;&#x5E76;&#x6570;&#x7EC4;</strong>&#xFF1A;</p>
<p>&#x56E0;&#x4E3A;ES6&#x7684;&#x8BED;&#x6CD5;&#x66F4;&#x7B80;&#x6D01;&#x6613;&#x61C2;&#xFF0C;&#x6240;&#x4EE5;&#x73B0;&#x5728;&#x5408;&#x5E76;&#x6570;&#x7EC4;&#x6211;&#x5927;&#x90E8;&#x5206;&#x91C7;&#x7528;<code>...</code>&#x6765;&#x5904;&#x7406;&#xFF0C;<code>...</code>&#x8FD0;&#x7B97;&#x7B26;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;<code>cancat</code>&#x7684;&#x6BCF;&#x4E2A;&#x6817;&#x5B50;&#xFF0C;&#x4E14;&#x66F4;&#x7B80;&#x6D01;&#x548C;&#x5177;&#x6709;&#x9AD8;&#x5EA6;&#x81EA;&#x5B9A;&#x4E49;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4F4D;&#x7F6E;&#x7684;&#x6548;&#x679C;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = [2, 3, 4, 5]
    let b = [ 4,...a, 4, 4]
    console.log(a,b); //  [2, 3, 4, 5] [4,2,3,4,5,4,4]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    let a = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
    let b = [ <span class="hljs-number">4</span>,...a, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]
    console.log(a,b); <span class="hljs-comment">//  [2, 3, 4, 5] [4,2,3,4,5,4,4]</span>
</code></pre>
<p>&#x66F4;&#x591A;&#x5173;&#x4E8E;&#x6269;&#x5C55;&#x7B26;&#x7684;&#x8BE6;&#x7EC6;&#x5185;&#x5BB9;&#x79FB;&#x6B65;&#x962E;&#x4E00;&#x5CF0;&#x5927;&#x795E;&#x7684;<a href="http://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8;</a></p>
<h4>indexOf() &#x67E5;&#x627E;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5B58;&#x5728;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x4E0B;&#x6807;</h4>
<p>&#x5B9A;&#x4E49;: &#x8FD4;&#x56DE;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x53EF;&#x4EE5;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x7ED9;&#x5B9A;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;-1&#x3002;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.indexOf(searchElement,fromIndex)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>    <span class="hljs-keyword">array</span>.indexOf(searchElement,fromIndex)
</code></pre>
<p>&#x53C2;&#x6570;:</p>
<p>searchElement(&#x5FC5;&#x987B;):&#x88AB;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;</p>
<p>fromIndex(&#x53EF;&#x9009;):&#x5F00;&#x59CB;&#x67E5;&#x627E;&#x7684;&#x4F4D;&#x7F6E;(&#x4E0D;&#x80FD;&#x5927;&#x4E8E;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;-1)&#xFF0C;&#x63A5;&#x53D7;&#x8D1F;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#x3002;</p>
<p>&#x4E25;&#x683C;&#x76F8;&#x7B49;&#x7684;&#x641C;&#x7D22;:</p>
<p>&#x6570;&#x7EC4;&#x7684;indexOf&#x641C;&#x7D22;&#x8DDF;&#x5B57;&#x7B26;&#x4E32;&#x7684;indexOf&#x4E0D;&#x4E00;&#x6837;,&#x6570;&#x7EC4;&#x7684;indexOf&#x4F7F;&#x7528;&#x4E25;&#x683C;&#x76F8;&#x7B49;<code>===</code>&#x641C;&#x7D22;&#x5143;&#x7D20;&#xFF0C;&#x5373;<strong>&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x8981;&#x5B8C;&#x5168;&#x5339;&#x914D;</strong>&#x624D;&#x80FD;&#x641C;&#x7D22;&#x6210;&#x529F;&#x3002;</p>
<p><strong>&#x6CE8;&#x610F;</strong>&#xFF1A;indexOf()&#x4E0D;&#x80FD;&#x8BC6;&#x522B;<code>NaN</code></p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a=[&apos;&#x5566;&#x5566;&apos;,2,4,24,NaN]
    console.log(a.indexOf(&apos;&#x5566;&apos;));  // -1 
    console.log(a.indexOf(&apos;NaN&apos;));  // -1 
    console.log(a.indexOf(&apos;&#x5566;&#x5566;&apos;)); // 0

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>    let <span class="hljs-keyword">a</span>=[<span class="hljs-string">&apos;&#x5566;&#x5566;&apos;</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">24</span>,NaN]
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">a</span>.indexOf(<span class="hljs-string">&apos;&#x5566;&apos;</span>)); <span class="hljs-comment"> // -1 </span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">a</span>.indexOf(<span class="hljs-string">&apos;NaN&apos;</span>)); <span class="hljs-comment"> // -1 </span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">a</span>.indexOf(<span class="hljs-string">&apos;&#x5566;&#x5566;&apos;</span>));<span class="hljs-comment"> // 0</span>

</code></pre>
<p>&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;</p>
<ol>
<li><a href="https://juejin.im/post/5aad40e4f265da237f1e12ed#heading-10" rel="nofollow noreferrer" target="_blank">&#x6570;&#x7EC4;&#x53BB;&#x91CD;</a></li>
<li>&#x6839;&#x636E;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x7EC4;&#x4E0B;&#x6807;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x503C;&#x7B49;&#x3002;</li>
<li>&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#x3002;</li>
</ol>
<h4>lastIndexOf() &#x67E5;&#x627E;&#x6307;&#x5B9A;&#x5143;&#x7D20;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;</h4>
<p>&#x5B9A;&#x4E49;:  &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x5143;&#x7D20;,&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x8FD4;&#x56DE; -1&#x3002;&#xFF08;&#x4ECE;&#x6570;&#x7EC4;&#x540E;&#x9762;&#x5F80;&#x524D;&#x67E5;&#x627E;&#xFF09;</p>
<p>&#x8BED;&#x6CD5;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    arr.lastIndexOf(searchElement,fromIndex)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">arr</span><span class="hljs-selector-class">.lastIndexOf</span>(<span class="hljs-selector-tag">searchElement</span>,<span class="hljs-selector-tag">fromIndex</span>)
</code></pre>
<p>&#x53C2;&#x6570;: </p>
<p>searchElement(&#x5FC5;&#x987B;): &#x88AB;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;</p>
<p>fromIndex(&#x53EF;&#x9009;): &#x9006;&#x5411;&#x67E5;&#x627E;&#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;-1&#xFF0C;&#x5373;&#x67E5;&#x627E;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x5173;&#x4E8E;fromIndex&#x6709;&#x4E09;&#x4E2A;&#x89C4;&#x5219;:</p>
<ol>
<li>&#x6B63;&#x503C;&#x3002;&#x5982;&#x679C;&#x8BE5;&#x503C;&#x5927;&#x4E8E;&#x6216;&#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x4F1A;&#x88AB;&#x67E5;&#x627E;&#x3002;</li>
<li>&#x8D1F;&#x503C;&#x3002;&#x5C06;&#x5176;&#x89C6;&#x4E3A;&#x4ECE;&#x6570;&#x7EC4;&#x672B;&#x5C3E;&#x5411;&#x524D;&#x7684;&#x504F;&#x79FB;&#x3002;(&#x6BD4;&#x5982;-2&#xFF0C;&#x4ECE;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x5F80;&#x524D;&#x67E5;&#x627E;)</li>
<li>&#x8D1F;&#x503C;&#x3002;&#x5176;&#x7EDD;&#x5BF9;&#x503C;&#x5927;&#x4E8E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x5219;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE; -1&#xFF0C;&#x5373;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x67E5;&#x627E;&#x3002;<p>let a=[&apos;OB&apos;,4,&apos;Koro1&apos;,1,2,&apos;Koro1&apos;,3,4,5,&apos;Koro1&apos;]; // &#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x4E3A;10<br>// let b=a.lastIndexOf(&apos;Koro1&apos;,4); // &#x4ECE;&#x4E0B;&#x6807;4&#x5F00;&#x59CB;&#x5F80;&#x524D;&#x627E; &#x8FD4;&#x56DE;&#x4E0B;&#x6807;2<br>// let b=a.lastIndexOf(&apos;Koro1&apos;,100); //  &#x5927;&#x4E8E;&#x6216;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6; &#x67E5;&#x627E;&#x6574;&#x4E2A;&#x6570;&#x7EC4; &#x8FD4;&#x56DE;9<br>// let b=a.lastIndexOf(&apos;Koro1&apos;,-11); // -1 &#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x67E5;&#x627E;<br>let b=a.lastIndexOf(&apos;Koro1&apos;,-9); // &#x4ECE;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;4&#x5F80;&#x524D;&#x67E5;&#x627E;&#xFF0C;&#x6CA1;&#x6709;&#x627E;&#x5230; &#x8FD4;&#x56DE;-1</p>
</li>
</ol>
<h4>ES7 includes() &#x67E5;&#x627E;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5305;&#x542B;&#x67D0;&#x4E2A;&#x5143;&#x7D20; &#x8FD4;&#x56DE;&#x5E03;&#x5C14;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A; &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x67D0;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5305;&#x542B;&#x7ED9;&#x5B9A;&#x7684;&#x503C;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.includes(searchElement,fromIndex=0)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>    <span class="hljs-keyword">array</span>.includes(searchElement,fromIndex=<span class="hljs-number">0</span>)
</code></pre>
<p>&#x53C2;&#x6570;&#xFF1A;</p>
<p>searchElement(&#x5FC5;&#x987B;):&#x88AB;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;</p>
<p>fromIndex(&#x53EF;&#x9009;):&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#xFF0C;&#x53C2;&#x6570;&#x8868;&#x793A;&#x641C;&#x7D22;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x63A5;&#x53D7;&#x8D1F;&#x503C;&#x3002;&#x6B63;&#x503C;&#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x6570;&#x7EC4;&#x4E0D;&#x4F1A;&#x88AB;&#x641C;&#x7D22;&#xFF0C;&#x8FD4;&#x56DE;false&#x3002;&#x8D1F;&#x503C;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x6570;&#x7EC4;&#x5EA6;&#xFF0C;&#x91CD;&#x7F6E;&#x4ECE;0&#x5F00;&#x59CB;&#x641C;&#x7D22;&#x3002;</p>
<p><strong>includes&#x65B9;&#x6CD5;&#x662F;&#x4E3A;&#x4E86;&#x5F25;&#x8865;indexOf&#x65B9;&#x6CD5;&#x7684;&#x7F3A;&#x9677;&#x800C;&#x51FA;&#x73B0;&#x7684;:</strong></p>
<ol>
<li>indexOf&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x8BC6;&#x522B;<code>NaN</code>
</li>
<li>indexOf&#x65B9;&#x6CD5;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5305;&#x542B;&#x67D0;&#x4E2A;&#x503C;&#x4E0D;&#x591F;&#x8BED;&#x4E49;&#x5316;&#xFF0C;&#x9700;&#x8981;&#x5224;&#x65AD;&#x662F;&#x5426;&#x4E0D;&#x7B49;&#x4E8E;<code>-1</code>&#xFF0C;&#x8868;&#x8FBE;&#x4E0D;&#x591F;&#x76F4;&#x89C2;</li>
</ol>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a=[&apos;OB&apos;,&apos;Koro1&apos;,1,NaN];
    // let b=a.includes(NaN); // true &#x8BC6;&#x522B;NaN
    // let b=a.includes(&apos;Koro1&apos;,100); // false &#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6; &#x4E0D;&#x641C;&#x7D22;
    // let b=a.includes(&apos;Koro1&apos;,-3);  // true &#x4ECE;&#x5012;&#x6570;&#x7B2C;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x641C;&#x7D22; 
    // let b=a.includes(&apos;Koro1&apos;,-100);  // true &#x8D1F;&#x503C;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x641C;&#x7D22;&#x6574;&#x4E2A;&#x6570;&#x7EC4;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs bash"><code>    <span class="hljs-built_in">let</span> a=[<span class="hljs-string">&apos;OB&apos;</span>,<span class="hljs-string">&apos;Koro1&apos;</span>,1,NaN];
    // <span class="hljs-built_in">let</span> b=a.includes(NaN); // <span class="hljs-literal">true</span> &#x8BC6;&#x522B;NaN
    // <span class="hljs-built_in">let</span> b=a.includes(<span class="hljs-string">&apos;Koro1&apos;</span>,100); // <span class="hljs-literal">false</span> &#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6; &#x4E0D;&#x641C;&#x7D22;
    // <span class="hljs-built_in">let</span> b=a.includes(<span class="hljs-string">&apos;Koro1&apos;</span>,-3);  // <span class="hljs-literal">true</span> &#x4ECE;&#x5012;&#x6570;&#x7B2C;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x641C;&#x7D22; 
    // <span class="hljs-built_in">let</span> b=a.includes(<span class="hljs-string">&apos;Koro1&apos;</span>,-100);  // <span class="hljs-literal">true</span> &#x8D1F;&#x503C;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x641C;&#x7D22;&#x6574;&#x4E2A;&#x6570;&#x7EC4;
</code></pre>
<p>&#x517C;&#x5BB9;&#x6027;(MDN): chrome47, Firefox 43,Edge 14,Opera 34, Safari 9,IE &#x672A;&#x5B9E;&#x73B0;&#x3002;</p>
<hr>
<h3 id="articleHeader6">&#x904D;&#x5386;&#x65B9;&#x6CD5;(12&#x4E2A;):</h3>
<p>js&#x4E2D;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5E76;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;&#x603B;&#x5171;&#x6709;12&#x4E2A;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ES5&#xFF1A;
    forEach&#x3001;every &#x3001;some&#x3001; filter&#x3001;map&#x3001;reduce&#x3001;reduceRight&#x3001;
    ES6&#xFF1A;
    find&#x3001;findIndex&#x3001;keys&#x3001;values&#x3001;entries
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code>    ES5&#xFF1A;
    forEach&#x3001;every &#x3001;some&#x3001; <span class="hljs-built_in">filter</span>&#x3001;<span class="hljs-keyword">map</span>&#x3001;reduce&#x3001;reduceRight&#x3001;
    ES6&#xFF1A;
    <span class="hljs-keyword">find</span>&#x3001;findIndex&#x3001;<span class="hljs-built_in">keys</span>&#x3001;<span class="hljs-built_in">values</span>&#x3001;entries
</code></pre>
<h4>&#x5173;&#x4E8E;&#x904D;&#x5386;&#xFF1A;</h4>
<ul>
<li>&#x5173;&#x4E8E;&#x904D;&#x5386;&#x7684;&#x6548;&#x7387;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x7BC7;<a href="http://louiszhai.github.io/2015/12/18/traverse/#%E6%B5%8B%E8%AF%95%E5%90%84%E6%96%B9%E6%B3%95%E6%95%88%E7%8E%87" rel="nofollow noreferrer" target="_blank">&#x8BE6;&#x89E3;JS&#x904D;&#x5386;</a>
</li>
<li>&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x5728;&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4FEE;&#x6539;&#x540E;&#x9762;&#x8981;&#x904D;&#x5386;&#x7684;&#x503C;</li>
<li>&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x5728;&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x4FEE;&#x6539;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#xFF08;&#x5220;&#x9664;/&#x6DFB;&#x52A0;&#xFF09;</li>
</ul>
<h4>forEach</h4>
<p>&#x5B9A;&#x4E49;: &#x6309;&#x5347;&#x5E8F;&#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x542B;&#x6709;&#x6548;&#x503C;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.forEach(function(currentValue, index, arr), thisValue)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code>    <span class="hljs-keyword">array</span>.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(currentValue, <span class="hljs-keyword">index</span>, arr)</span>, <span class="hljs-title">thisValue</span>)
</span></code></pre>
<p>&#x53C2;&#x6570;: </p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    2. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    3. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>thisValue(&#x53EF;&#x9009;):  &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<code>undefined</code></p>
<p><strong>&#x5173;&#x4E8E;forEach()&#x4F60;&#x8981;&#x77E5;&#x9053;</strong>&#xFF1A;</p>
<ul>
<li>&#x65E0;&#x6CD5;&#x4E2D;&#x9014;&#x9000;&#x51FA;&#x5FAA;&#x73AF;&#xFF0C;&#x53EA;&#x80FD;&#x7528;<code>return</code>&#x9000;&#x51FA;&#x672C;&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x56DE;&#x8C03;&#x3002;</li>
<li>&#x5B83;&#x603B;&#x662F;&#x8FD4;&#x56DE; undefined&#x503C;,&#x5373;&#x4F7F;&#x4F60;return&#x4E86;&#x4E00;&#x4E2A;&#x503C;&#x3002;</li>
</ul>
<h4>&#x4E0B;&#x9762;&#x7C7B;&#x4F3C;&#x8BED;&#x6CD5;&#x540C;&#x6837;&#x9002;&#x7528;&#x8FD9;&#x4E9B;&#x89C4;&#x5219;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1. &#x5BF9;&#x4E8E;&#x7A7A;&#x6570;&#x7EC4;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;
    2. &#x5BF9;&#x4E8E;&#x5DF2;&#x5728;&#x8FED;&#x4EE3;&#x8FC7;&#x7A0B;&#x4E2D;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;&#x7A7A;&#x5143;&#x7D20;&#x4F1A;&#x8DF3;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;
    3. &#x904D;&#x5386;&#x6B21;&#x6570;&#x518D;&#x7B2C;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x524D;&#x5C31;&#x4F1A;&#x786E;&#x5B9A;&#xFF0C;&#x518D;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x3002;
    4. &#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F20;&#x9012;&#x7ED9; callback &#x7684;&#x503C;&#x662F;&#x904D;&#x5386;&#x5230;&#x4ED6;&#x4EEC;&#x90A3;&#x4E00;&#x523B;&#x7684;&#x503C;&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-number">1.</span> &#x5BF9;&#x4E8E;&#x7A7A;&#x6570;&#x7EC4;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;
    <span class="hljs-number">2.</span> &#x5BF9;&#x4E8E;&#x5DF2;&#x5728;&#x8FED;&#x4EE3;&#x8FC7;&#x7A0B;&#x4E2D;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;&#x7A7A;&#x5143;&#x7D20;&#x4F1A;&#x8DF3;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;
    <span class="hljs-number">3.</span> &#x904D;&#x5386;&#x6B21;&#x6570;&#x518D;&#x7B2C;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x524D;&#x5C31;&#x4F1A;&#x786E;&#x5B9A;&#xFF0C;&#x518D;&#x6DFB;&#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&#x3002;
    <span class="hljs-number">4.</span> &#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F20;&#x9012;&#x7ED9; callback &#x7684;&#x503C;&#x662F;&#x904D;&#x5386;&#x5230;&#x4ED6;&#x4EEC;&#x90A3;&#x4E00;&#x523B;&#x7684;&#x503C;&#x3002;

</code></pre>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let a = [1, 2, ,3]; // &#x6700;&#x540E;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x7A7A;&#x7684;&#xFF0C;&#x4E0D;&#x4F1A;&#x904D;&#x5386;(undefined&#x3001;null&#x4F1A;&#x904D;&#x5386;)
    let obj = { name: &apos;OBKoro1&apos; };
    let result = a.forEach(function (value, index, array) { 
      a[3] = &apos;&#x6539;&#x53D8;&#x5143;&#x7D20;&apos;;
      a.push(&apos;&#x6DFB;&#x52A0;&#x5230;&#x5C3E;&#x7AEF;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&apos;)
      console.log(value, &apos;forEach&#x4F20;&#x9012;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&apos;); // &#x5206;&#x522B;&#x6253;&#x5370; 1 ,2 ,&#x6539;&#x53D8;&#x5143;&#x7D20;
      console.log(this.name); // OBKoro1 &#x6253;&#x5370;&#x4E09;&#x6B21; this&#x7ED1;&#x5B9A;&#x5728;obj&#x5BF9;&#x8C61;&#x4E0A;
      // break; // break&#x4F1A;&#x62A5;&#x9519;
      return value; // return&#x53EA;&#x80FD;&#x7ED3;&#x675F;&#x672C;&#x6B21;&#x56DE;&#x8C03; &#x4F1A;&#x6267;&#x884C;&#x4E0B;&#x6B21;&#x56DE;&#x8C03;
      console.log(&apos;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;return &#x4F1A;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x56DE;&#x8C03;&apos;)
    }, obj);
    console.log(result); // &#x5373;&#x4F7F;return&#x4E86;&#x4E00;&#x4E2A;&#x503C;,&#x4E5F;&#x8FD8;&#x662F;&#x8FD4;&#x56DE;undefined
    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E5F;&#x63A5;&#x53D7;&#x63A5;&#x5934;&#x51FD;&#x6570;&#x5199;&#x6CD5;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, ,<span class="hljs-number">3</span>]; <span class="hljs-comment">// &#x6700;&#x540E;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x7A7A;&#x7684;&#xFF0C;&#x4E0D;&#x4F1A;&#x904D;&#x5386;(undefined&#x3001;null&#x4F1A;&#x904D;&#x5386;)</span>
    <span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;OBKoro1&apos;</span> };
    <span class="hljs-keyword">let</span> result = a.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, array</span>) </span>{ 
      a[<span class="hljs-number">3</span>] = <span class="hljs-string">&apos;&#x6539;&#x53D8;&#x5143;&#x7D20;&apos;</span>;
      a.push(<span class="hljs-string">&apos;&#x6DFB;&#x52A0;&#x5230;&#x5C3E;&#x7AEF;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x904D;&#x5386;&apos;</span>)
      <span class="hljs-built_in">console</span>.log(value, <span class="hljs-string">&apos;forEach&#x4F20;&#x9012;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&apos;</span>); <span class="hljs-comment">// &#x5206;&#x522B;&#x6253;&#x5370; 1 ,2 ,&#x6539;&#x53D8;&#x5143;&#x7D20;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name); <span class="hljs-comment">// OBKoro1 &#x6253;&#x5370;&#x4E09;&#x6B21; this&#x7ED1;&#x5B9A;&#x5728;obj&#x5BF9;&#x8C61;&#x4E0A;</span>
      <span class="hljs-comment">// break; // break&#x4F1A;&#x62A5;&#x9519;</span>
      <span class="hljs-keyword">return</span> value; <span class="hljs-comment">// return&#x53EA;&#x80FD;&#x7ED3;&#x675F;&#x672C;&#x6B21;&#x56DE;&#x8C03; &#x4F1A;&#x6267;&#x884C;&#x4E0B;&#x6B21;&#x56DE;&#x8C03;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;return &#x4F1A;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x56DE;&#x8C03;&apos;</span>)
    }, obj);
    <span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// &#x5373;&#x4F7F;return&#x4E86;&#x4E00;&#x4E2A;&#x503C;,&#x4E5F;&#x8FD8;&#x662F;&#x8FD4;&#x56DE;undefined</span>
    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E5F;&#x63A5;&#x53D7;&#x63A5;&#x5934;&#x51FD;&#x6570;&#x5199;&#x6CD5;</span>
</code></pre>
<h4>every &#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x90FD;&#x7B26;&#x5408;&#x5224;&#x65AD;&#x6761;&#x4EF6;</h4>
<p>&#x5B9A;&#x4E49;: &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x90FD;&#x7B26;&#x5408;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x7684;&#x6761;&#x4EF6;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.every(function(currentValue, index, arr), thisValue)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code>    <span class="hljs-keyword">array</span>.every(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(currentValue, <span class="hljs-keyword">index</span>, arr)</span>, <span class="hljs-title">thisValue</span>)
</span></code></pre>
<p>&#x53C2;&#x6570;:(&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8BED;&#x6CD5;&#x90FD;&#x7C7B;&#x4F3C;)</p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    2. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    3. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>thisValue(&#x53EF;&#x9009;):  &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<code>undefined</code></p>
<p>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x503C;&#x89C4;&#x5219;:</p>
<ol>
<li>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x68C0;&#x6D4B;&#x5230;<strong>&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0D;&#x6EE1;&#x8DB3;&#xFF0C;&#x5219;&#x6574;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x8FD4;&#x56DE; false</strong>&#xFF0C;&#x4E14;&#x5269;&#x4F59;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x518D;&#x8FDB;&#x884C;&#x68C0;&#x6D4B;&#x3002;</li>
<li>&#x5982;&#x679C;&#x6240;&#x6709;&#x5143;&#x7D20;<strong>&#x90FD;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; true</strong>&#x3002;=</li>
</ol>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function isBigEnough(element, index, array) { 
      return element &gt;= 10; // &#x5224;&#x65AD;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x90FD;&#x5927;&#x4E8E;10
    }
    let result = [12, 5, 8, 130, 44].every(isBigEnough);   // false
    let result = [12, 54, 18, 130, 44].every(isBigEnough); // true
    // &#x63A5;&#x53D7;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5199;&#x6CD5; 
    [12, 5, 8, 130, 44].every(x =&gt; x &gt;= 10); // false
    [12, 54, 18, 130, 44].every(x =&gt; x &gt;= 10); // true
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    function isBigEnough(element, index, array) { 
      return element &gt;= <span class="hljs-number">10</span>; <span class="hljs-comment">// &#x5224;&#x65AD;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x662F;&#x5426;&#x90FD;&#x5927;&#x4E8E;10</span>
    }
    let result = [<span class="hljs-number">12</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">130</span>, <span class="hljs-number">44</span>].every(isBigEnough);   <span class="hljs-comment">// false</span>
    let result = [<span class="hljs-number">12</span>, <span class="hljs-number">54</span>, <span class="hljs-number">18</span>, <span class="hljs-number">130</span>, <span class="hljs-number">44</span>].every(isBigEnough); <span class="hljs-comment">// true</span>
    <span class="hljs-comment">// &#x63A5;&#x53D7;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5199;&#x6CD5; </span>
    [<span class="hljs-number">12</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">130</span>, <span class="hljs-number">44</span>].every(x =&gt; x &gt;= <span class="hljs-number">10</span>); <span class="hljs-comment">// false</span>
    [<span class="hljs-number">12</span>, <span class="hljs-number">54</span>, <span class="hljs-number">18</span>, <span class="hljs-number">130</span>, <span class="hljs-number">44</span>].every(x =&gt; x &gt;= <span class="hljs-number">10</span>); <span class="hljs-comment">// true</span>
</code></pre>
<h4>some &#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x662F;&#x5426;&#x6709;&#x6EE1;&#x8DB3;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x7684;&#x5143;&#x7D20;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x662F;&#x5426;&#x6709;&#x6EE1;&#x8DB3;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x7684;&#x5143;&#x7D20;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.some(function(currentValue, index, arr), thisValue)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code>    <span class="hljs-keyword">array</span>.some(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(currentValue, <span class="hljs-keyword">index</span>, arr)</span>, <span class="hljs-title">thisValue</span>)
</span></code></pre>
<p>&#x53C2;&#x6570;:(&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8BED;&#x6CD5;&#x90FD;&#x7C7B;&#x4F3C;)</p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    2. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    3. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>thisValue(&#x53EF;&#x9009;):  &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<code>undefined</code></p>
<p>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x503C;&#x89C4;&#x5219;&#xFF1A;</p>
<ol>
<li>&#x5982;&#x679C;<strong>&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#xFF0C;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x8FD4;&#x56DE;true</strong>, &#x5269;&#x4F59;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x518D;&#x6267;&#x884C;&#x68C0;&#x6D4B;&#x3002;</li>
<li>&#x5982;&#x679C;<strong>&#x6CA1;&#x6709;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;false</strong>&#x3002;<p>function isBigEnough(element, index, array) {<br>  return (element &gt;= 10); //&#x6570;&#x7EC4;&#x4E2D;&#x662F;&#x5426;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5927;&#x4E8E; 10<br>}<br>let result = [2, 5, 8, 1, 4].some(isBigEnough); // false<br>let result = [12, 5, 8, 1, 4].some(isBigEnough); // true</p>
</li>
</ol>
<h4>filter &#x8FC7;&#x6EE4;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x6570;&#x7EC4;</h4>
<p>&#x5B9A;&#x4E49;: &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;, &#x5176;&#x5305;&#x542B;&#x901A;&#x8FC7;&#x6240;&#x63D0;&#x4F9B;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x7684;&#x6D4B;&#x8BD5;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002; </p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let new_array = arr.filter(function(currentValue, index, arr), thisArg)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code>    let <span class="hljs-keyword">new</span><span class="hljs-type">_array</span> = arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(currentValue, index, arr), thisArg)
</code></pre>
<p>&#x53C2;&#x6570;:(&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8BED;&#x6CD5;&#x90FD;&#x7C7B;&#x4F3C;)</p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    2. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    3. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>thisValue(&#x53EF;&#x9009;):  &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<code>undefined</code></p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     let a = [32, 33, 16, 40];
    let result = a.filter(function (value, index, array) {
      return value &gt;= 18; // &#x8FD4;&#x56DE;a&#x6570;&#x7EC4;&#x4E2D;&#x6240;&#x6709;&#x5927;&#x4E8E;18&#x7684;&#x5143;&#x7D20;
    });
    console.log(result,a);// [32,33,40] [32,33,16,40]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>     <span class="hljs-keyword">let</span> a = [<span class="hljs-number">32</span>, <span class="hljs-number">33</span>, <span class="hljs-number">16</span>, <span class="hljs-number">40</span>];
    <span class="hljs-keyword">let</span> result = a.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, array</span>) </span>{
      <span class="hljs-keyword">return</span> value &gt;= <span class="hljs-number">18</span>; <span class="hljs-comment">// &#x8FD4;&#x56DE;a&#x6570;&#x7EC4;&#x4E2D;&#x6240;&#x6709;&#x5927;&#x4E8E;18&#x7684;&#x5143;&#x7D20;</span>
    });
    <span class="hljs-built_in">console</span>.log(result,a);<span class="hljs-comment">// [32,33,40] [32,33,16,40]</span>
</code></pre>
<h4>map &#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x6570;&#x7EC4;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x5176;&#x7ED3;&#x679C;&#x662F;&#x8BE5;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x63D0;&#x4F9B;&#x7684;&#x51FD;&#x6570;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x3002;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let new_array = arr.map(function(currentValue, index, arr), thisArg)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code>    let <span class="hljs-keyword">new</span><span class="hljs-type">_array</span> = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(currentValue, index, arr), thisArg)
</code></pre>
<p>&#x53C2;&#x6570;:(&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8BED;&#x6CD5;&#x90FD;&#x7C7B;&#x4F3C;)</p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    2. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    3. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>thisValue(&#x53EF;&#x9009;):  &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<code>undefined</code></p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [&apos;1&apos;,&apos;2&apos;,&apos;3&apos;,&apos;4&apos;];
let result = a.map(function (value, index, array) {
  return value + &apos;&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&apos;
});
console.log(result, a); 
// [&quot;1&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;,&quot;2&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;,&quot;3&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;,&quot;4&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;] [&quot;1&quot;,&quot;2&quot;,&quot;3&quot;,&quot;4&quot;]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> a = [<span class="hljs-string">&apos;1&apos;</span>,<span class="hljs-string">&apos;2&apos;</span>,<span class="hljs-string">&apos;3&apos;</span>,<span class="hljs-string">&apos;4&apos;</span>];
<span class="hljs-keyword">let</span> result = a.<span class="hljs-keyword">map</span>(<span class="hljs-keyword">function</span> (<span class="hljs-keyword">value</span>, index, <span class="hljs-keyword">array</span>) {
  return value + <span class="hljs-string">&apos;&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&apos;</span>
});
console.log(result, a); 
// [<span class="hljs-string">&quot;1&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;</span>,<span class="hljs-string">&quot;2&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;</span>,<span class="hljs-string">&quot;3&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;</span>,<span class="hljs-string">&quot;4&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x5143;&#x7D20;&quot;</span>] [<span class="hljs-string">&quot;1&quot;</span>,<span class="hljs-string">&quot;2&quot;</span>,<span class="hljs-string">&quot;3&quot;</span>,<span class="hljs-string">&quot;4&quot;</span>]
</code></pre>
<h4>reduce &#x4E3A;&#x6570;&#x7EC4;&#x63D0;&#x4F9B;&#x7D2F;&#x52A0;&#x5668;&#xFF0C;&#x5408;&#x5E76;&#x4E3A;&#x4E00;&#x4E2A;&#x503C;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;reduce() &#x65B9;&#x6CD5;&#x5BF9;&#x7D2F;&#x52A0;&#x5668;&#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#xFF08;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF09;&#x5E94;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6700;&#x7EC8;&#x5408;&#x5E76;&#x4E3A;&#x4E00;&#x4E2A;&#x503C;&#x3002;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code>    <span class="hljs-keyword">array</span>.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(total, currentValue, currentIndex, arr)</span>, <span class="hljs-title">initialValue</span>)
</span></code></pre>
<p>&#x53C2;&#x6570;&#xFF1A;</p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. total(&#x5FC5;&#x987B;)&#xFF0C;&#x521D;&#x59CB;&#x503C;, &#x6216;&#x8005;&#x4E0A;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x8FD4;&#x56DE;&#x7684;&#x503C;
    2. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    3. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    4. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">total</span>(&#x5FC5;&#x987B;)&#xFF0C;&#x521D;&#x59CB;&#x503C;, &#x6216;&#x8005;&#x4E0A;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x8FD4;&#x56DE;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">4</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>initialValue(&#x53EF;&#x9009;): &#x6307;&#x5B9A;&#x7B2C;&#x4E00;&#x6B21;&#x56DE;&#x8C03; &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p>
<p>&#x56DE;&#x8C03;&#x7B2C;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x65F6;:</p>
<ul>
<li>&#x5982;&#x679C; initialValue &#x5728;&#x8C03;&#x7528; reduce &#x65F6;&#x88AB;&#x63D0;&#x4F9B;&#xFF0C;&#x90A3;&#x4E48;&#x7B2C;&#x4E00;&#x4E2A; total &#x5C06;&#x7B49;&#x4E8E; initialValue&#xFF0C;&#x6B64;&#x65F6; currentValue &#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#xFF1B;</li>
<li>&#x5982;&#x679C; initialValue &#x672A;&#x88AB;&#x63D0;&#x4F9B;&#xFF0C;&#x90A3;&#x4E48; total &#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;currentValue &#x7B49;&#x4E8E;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x503C;&#x3002;&#x6B64;&#x65F6;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#xFF0C;&#x90A3;&#x4E48;&#x5C06;&#x629B;&#x51FA; TypeError&#x3002;</li>
<li>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x63D0;&#x4F9B; initialValue&#xFF0C;&#x6216;&#x63D0;&#x4F9B;&#x4E86; initialValue &#x4F46;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#xFF0C;&#x90A3;&#x4E48;&#x56DE;&#x8C03;&#x4E0D;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#xFF0C;&#x6570;&#x7EC4;&#x7684;&#x552F;&#x4E00;&#x503C;&#x5C06;&#x88AB;&#x8FD4;&#x56DE;&#x3002;</li>
</ul>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x6570;&#x7EC4;&#x6C42;&#x548C; 
    let sum = [0, 1, 2, 3].reduce(function (a, b) {
      return a + b;
    }, 0);
    // 6
    // &#x5C06;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x8F6C;&#x5316;&#x4E3A;&#x4E00;&#x7EF4; &#x5C06;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x5C55;&#x5F00;
    let flattened = [[0, 1], [2, 3], [4, 5]].reduce(
      (a, b) =&gt; a.concat(b),
      []
    );
     // [0, 1, 2, 3, 4, 5]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-comment">// &#x6570;&#x7EC4;&#x6C42;&#x548C; </span>
    let sum = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].reduce(function (a, b) {
      return a + b;
    }, <span class="hljs-number">0</span>);
    <span class="hljs-comment">// 6</span>
    <span class="hljs-comment">// &#x5C06;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x8F6C;&#x5316;&#x4E3A;&#x4E00;&#x7EF4; &#x5C06;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x5C55;&#x5F00;</span>
    let flattened = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(
      (a, b) =&gt; a.concat(b),
      []
    );
     <span class="hljs-comment">// [0, 1, 2, 3, 4, 5]</span>
</code></pre>
<h4>reduceRight  &#x4ECE;&#x53F3;&#x81F3;&#x5DE6;&#x7D2F;&#x52A0;</h4>
<p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9664;&#x4E86;&#x4E0E;reduce&#x6267;&#x884C;&#x65B9;&#x5411;&#x76F8;&#x53CD;&#x5916;&#xFF0C;&#x5176;&#x4ED6;&#x5B8C;&#x5168;&#x4E0E;&#x5176;&#x4E00;&#x81F4;&#xFF0C;&#x8BF7;&#x53C2;&#x8003;&#x4E0A;&#x8FF0; reduce &#x65B9;&#x6CD5;&#x4ECB;&#x7ECD;&#x3002;</p>
<h4>ES6&#xFF1A;find()&amp; findIndex() &#x6839;&#x636E;&#x6761;&#x4EF6;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x6210;&#x5458;</h4>
<p>find()&#x5B9A;&#x4E49;&#xFF1A;&#x7528;&#x4E8E;&#x627E;&#x51FA;&#x7B2C;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6570;&#x7EC4;&#x6210;&#x5458;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x8BE5;&#x6210;&#x5458;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6210;&#x5458;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;undefined&#x3002;</p>
<p>findIndex()&#x5B9A;&#x4E49;&#xFF1A;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6570;&#x7EC4;&#x6210;&#x5458;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5982;&#x679C;&#x6240;&#x6709;&#x6210;&#x5458;&#x90FD;&#x4E0D;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;-1&#x3002;</p>
<p>&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let new_array = arr.find(function(currentValue, index, arr), thisArg)
     let new_array = arr.findIndex(function(currentValue, index, arr), thisArg)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code>    let <span class="hljs-keyword">new</span><span class="hljs-type">_array</span> = arr.find(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(currentValue, index, arr), thisArg)
     let <span class="hljs-keyword">new</span><span class="hljs-type">_array</span> = arr.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(currentValue, index, arr), thisArg)
</code></pre>
<p>&#x53C2;&#x6570;:(&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8BED;&#x6CD5;&#x90FD;&#x7C7B;&#x4F3C;)</p>
<p>function(&#x5FC5;&#x987B;): &#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
    1. currentValue(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    2. index(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    3. arr(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-selector-tag">1</span>. <span class="hljs-selector-tag">currentValue</span>(&#x5FC5;&#x987B;),&#x6570;&#x7EC4;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x503C;
    <span class="hljs-selector-tag">2</span>. <span class="hljs-selector-tag">index</span>(&#x53EF;&#x9009;), &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x503C;
    <span class="hljs-selector-tag">3</span>. <span class="hljs-selector-tag">arr</span>(&#x53EF;&#x9009;),&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;
</code></pre>
<p>thisValue(&#x53EF;&#x9009;):  &#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x65F6;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<code>undefined</code></p>
<p>&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x53EF;&#x4EE5;&#x8BC6;&#x522B;<code>NaN</code>,&#x5F25;&#x8865;&#x4E86;<code>indexOf</code>&#x7684;&#x4E0D;&#x8DB3;.</p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // find
        let a = [1, 4, -5, 10].find((n) =&gt; n &lt; 0); // &#x8FD4;&#x56DE;&#x5143;&#x7D20;-5
        let b = [1, 4, -5, 10,NaN].find((n) =&gt; Object.is(NaN, n));  // &#x8FD4;&#x56DE;&#x5143;&#x7D20;NaN
        // findIndex
        let a = [1, 4, -5, 10].findIndex((n) =&gt; n &lt; 0); // &#x8FD4;&#x56DE;&#x7D22;&#x5F15;2
        let b = [1, 4, -5, 10,NaN].findIndex((n) =&gt; Object.is(NaN, n));  // &#x8FD4;&#x56DE;&#x7D22;&#x5F15;4

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-comment">// find</span>
        <span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>].find(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n &lt; <span class="hljs-number">0</span>); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5143;&#x7D20;-5</span>
        <span class="hljs-keyword">let</span> b = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>,<span class="hljs-literal">NaN</span>].find(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, n));  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5143;&#x7D20;NaN</span>
        <span class="hljs-comment">// findIndex</span>
        <span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>].findIndex(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n &lt; <span class="hljs-number">0</span>); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x7D22;&#x5F15;2</span>
        <span class="hljs-keyword">let</span> b = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">-5</span>, <span class="hljs-number">10</span>,<span class="hljs-literal">NaN</span>].findIndex(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, n));  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x7D22;&#x5F15;4</span>

</code></pre>
<p>&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;(MDN):Chrome 45,Firefox 25,Opera 32, Safari 8, Edge yes,</p>
<h4>ES6 keys()&amp;values()&amp;entries() &#x904D;&#x5386;&#x952E;&#x540D;&#x3001;&#x904D;&#x5386;&#x952E;&#x503C;&#x3001;&#x904D;&#x5386;&#x952E;&#x540D;+&#x952E;&#x503C;</h4>
<p>&#x5B9A;&#x4E49;&#xFF1A;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Array Iterator &#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x8C61;&#x6839;&#x636E;&#x65B9;&#x6CD5;&#x4E0D;&#x540C;&#x5305;&#x542B;&#x4E0D;&#x540C;&#x7684;&#x503C;&#x3002;</p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    array.keys()
    array.values()
    array.entries()
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">array</span>.keys()
    <span class="hljs-built_in">array</span>.<span class="hljs-built_in">values</span>()
    <span class="hljs-built_in">array</span>.entries()
</code></pre>
<p>&#x53C2;&#x6570;&#xFF1A;&#x65E0;&#x3002;</p>
<p>&#x904D;&#x5386;&#x6817;&#x5B50;(&#x6458;&#x81EA;<a href="http://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-entries%EF%BC%8Ckeys-%E5%92%8C-values" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8;</a>)&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    for (let index of [&apos;a&apos;, &apos;b&apos;].keys()) {
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
    // 1 &quot;b&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">of</span> [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>].keys()) {
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
    <span class="hljs-comment">// 1 &quot;b&quot;</span>
</code></pre>
<p>&#x5728;<code>for..of</code>&#x4E2D;&#x5982;&#x679C;&#x904D;&#x5386;&#x4E2D;&#x9014;&#x8981;&#x9000;&#x51FA;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>break</code>&#x9000;&#x51FA;&#x5FAA;&#x73AF;&#x3002;</p>
<p>&#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528;<code>for...of</code>&#x5FAA;&#x73AF;&#xFF0C;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x8C03;&#x7528;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x7684;next&#x65B9;&#x6CD5;&#xFF0C;&#x8FDB;&#x884C;&#x904D;&#x5386;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let letter = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, &apos;a&apos;]
    console.log(entries.next().value); // [1, &apos;b&apos;]
    console.log(entries.next().value); // [2, &apos;c&apos;]


" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>    <span class="hljs-keyword">let</span> letter = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>];
    <span class="hljs-keyword">let</span> entries = letter.entries();
    console.log(entries.<span class="hljs-keyword">next</span>().<span class="hljs-keyword">value</span>); // [<span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>]
    console.log(entries.<span class="hljs-keyword">next</span>().<span class="hljs-keyword">value</span>); // [<span class="hljs-number">1</span>, <span class="hljs-string">&apos;b&apos;</span>]
    console.log(entries.<span class="hljs-keyword">next</span>().<span class="hljs-keyword">value</span>); // [<span class="hljs-number">2</span>, <span class="hljs-string">&apos;c&apos;</span>]


</code></pre>
<p>entries()&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;(MDN):Chrome 38, Firefox 28,Opera 25,Safari 7.1</p>
<p>keys()&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;(MDN):Chrome 38, Firefox 28,Opera 25,Safari 8,</p>
<p><strong>&#x6CE8;&#x610F;</strong>:&#x76EE;&#x524D;&#x53EA;&#x6709;Safari 9&#x652F;&#x6301;,&#xFF0C;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#x672A;&#x5B9E;&#x73B0;&#xFF0C;babel&#x8F6C;&#x7801;&#x5668;&#x4E5F;&#x8FD8;&#x672A;&#x5B9E;&#x73B0;</p>
<hr>
<h2 id="articleHeader7">&#x7ED3;&#x8BED;</h2>
<p>&#x547C;~&#x7EC8;&#x4E8E;&#x5199;&#x597D;&#x4E86;&#xFF0C;&#x65AD;&#x65AD;&#x7EED;&#x7EED;&#xFF0C;&#x4E0A;&#x73ED;&#x4E5F;&#x5077;&#x5077;&#x5212;&#x6C34;&#x7684;&#x5199;&#x4E86;&#x51E0;&#x5929;&#xFF0C;&#x867D;&#x8BF4;&#x5F88;&#x8F9B;&#x82E6;&#xFF0C;&#x4F46;&#x662F;&#x73B0;&#x5728;&#x5BF9;&#x6570;&#x7EC4;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#xFF0C;&#x6574;&#x4F53;&#x6E05;&#x6670;&#x4E86;&#x5F88;&#x591A;&#xFF0C;&#x5404;&#x4E2A;API&#x4E5F;&#x7406;&#x89E3;&#x7684;&#x66F4;&#x597D;&#x4E00;&#x70B9;&#x4E86;&#xFF0C;&#x6536;&#x83B7;&#x9887;&#x591A;&#xFF0C;&#x6587;&#x7AE0;&#x5982;&#x6709;&#x4E0D;&#x6B63;&#x786E;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x5404;&#x4F4D;&#x5927;&#x4F6C;&#x97AD;&#x7B56;&#xFF01;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x770B;&#x5B8C;&#x53EF;&#x4EE5;&#x6709;&#x6240;&#x6536;&#x83B7;&#xFF0C;&#x559C;&#x6B22;&#x7684;&#x8BDD;&#xFF0C;&#x8D76;&#x7D27;&#x70B9;&#x6CE2;<del>&#x8BA2;&#x9605;</del>&#x5173;&#x6CE8;/&#x559C;&#x6B22;&#x3002;</p>
<h3 id="articleHeader8">&#x5E0C;&#x671B;&#x770B;&#x5B8C;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x70B9;&#x4E2A;&#x559C;&#x6B22;/&#x5173;&#x6CE8;&#xFF0C;&#x60A8;&#x7684;&#x652F;&#x6301;&#x662F;&#x5BF9;&#x6211;&#x6700;&#x5927;&#x7684;&#x9F13;&#x52B1;&#x3002;</h3>
<p><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;</a></strong>&#xFF0C;&#x5982;&#x9700;&#x8F6C;&#x8F7D;&#xFF0C;&#x8BF7;&#x653E;&#x4E0A;&#x539F;&#x6587;&#x94FE;&#x63A5;&#x5E76;&#x7F72;&#x540D;&#x3002;&#x7801;&#x5B57;&#x4E0D;&#x6613;&#xFF0C;<strong>&#x611F;&#x8C22;</strong>&#x652F;&#x6301;&#xFF01;&#x672C;&#x4EBA;&#x5199;&#x6587;&#x7AE0;&#x672C;&#x7740;&#x4EA4;&#x6D41;&#x8BB0;&#x5F55;&#x7684;&#x5FC3;&#x6001;&#xFF0C;&#x5199;&#x7684;&#x4E0D;&#x597D;&#x4E4B;&#x5904;&#xFF0C;&#x4E0D;&#x6495;&#x903C;&#xFF0C;&#x4F46;&#x662F;&#x6B22;&#x8FCE;&#x6307;&#x70B9;&#x3002;</p>
<p>&#x5982;&#x679C;&#x559C;&#x6B22;&#x672C;&#x6587;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x8BA2;&#x9605;&#x53F7;&#xFF0C;&#x6F2B;&#x6F2B;&#x6280;&#x672F;&#x8DEF;&#xFF0C;&#x671F;&#x5F85;&#x672A;&#x6765;&#x5171;&#x540C;&#x5B66;&#x4E60;&#x6210;&#x957F;&#x3002;</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&amp;h=344&amp;f=jpeg&amp;s=8317" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1frtrbx8b69j30n20cyh3q.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x4EE5;&#x4E0A;2018.5.30</p>
<h3 id="articleHeader9">&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</h3>
<p><a href="http://es6.ruanyifeng.com/#docs/array" rel="nofollow noreferrer" target="_blank">ECMAScript6 &#x5165;&#x95E8; &#x6570;&#x7EC4;&#x7684;&#x6269;&#x5C55;</a></p>
<p><a href="https://blog.csdn.net/aiynmimi/article/details/78667555" rel="nofollow noreferrer" target="_blank">JavaScript Array&#x6570;&#x7EC4;&#x76F8;&#x5173;&#x6C47;&#x603B;</a></p>
<p><a href="https://juejin.im/entry/59f7f3346fb9a04514635552" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x4E86;&#x89E3;javascript&#x7684;sort&#x65B9;&#x6CD5;</a></p>
<p><a href="https://juejin.im/post/5902d56e1b69e60058c634d6#heading-6" rel="nofollow noreferrer" target="_blank">&#x3010;&#x6DF1;&#x5EA6;&#x957F;&#x6587;&#x3011;JavaScript&#x6570;&#x7EC4;&#x6240;&#x6709;API&#x5168;&#x89E3;&#x5BC6;</a></p>
<p><a href="http://louiszhai.github.io/2015/12/18/traverse/#%E6%B5%8B%E8%AF%95%E5%90%84%E6%96%B9%E6%B3%95%E6%95%88%E7%8E%87" rel="nofollow noreferrer" target="_blank">&#x8BE6;&#x89E3;JS&#x904D;&#x5386;</a></p>
<p><a href="http://zxhfighter.github.io/blog/javascript/2013/02/27/how-to-judge-a-variable-is-a-array.html" rel="nofollow noreferrer" target="_blank">&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x662F;&#x5426;&#x4E3A;&#x6570;&#x7EC4;</a></p>
<p><a href="https://www.zhihu.com/question/19863166" rel="nofollow noreferrer" target="_blank">&#x5728; JavaScript &#x4E2D;&#xFF0C;&#x5982;&#x4F55;&#x6C42;&#x51FA;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x4EA4;&#x96C6;&#x548C;&#x5DEE;&#x96C6;&#xFF1F;</a></p>

                
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【干货】js 数组详细操作方法及解析合集

## 原文链接
[https://segmentfault.com/a/1190000015111104](https://segmentfault.com/a/1190000015111104)


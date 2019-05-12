---
title: '深入理解 Javascript 之 JS的解析与执行过程' 
date: 2018-11-18 2:30:09
hidden: true
slug: 8gmh2v2es5h
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">js&#x7684;&#x89E3;&#x6790;&#x4E0E;&#x6267;&#x884C;&#x8FC7;&#x7A0B;</h1><p><span class="img-wrap"><img data-src="/img/bVbe2UQ?w=1744&amp;h=782" src="https://static.alili.tech/img/bVbe2UQ?w=1744&amp;h=782" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(a);
function a(){ alter(2); }
alert(a);
var a = 1
alert(a);
var a = 3;
alert(a);
function a(){ alter(4); }
alert(a);
a();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">alert(a);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ alter(<span class="hljs-number">2</span>); }
alert(a);
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
alert(a);
<span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
alert(a);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ alter(<span class="hljs-number">4</span>); }
alert(a);
a();</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x7B2C;&#x4E00;&#x4E2A; alert(a)  &#x5F39;&#x51FA; function a(){ alter(4); } &#x51FD;&#x6570;&#x4F53;
- &#x7B2C;&#x4E8C;&#x4E2A; alter(a)  &#x5F39;&#x51FA; function a(){ alter(4); } &#x51FD;&#x6570;&#x4F53;
- &#x7B2C;&#x4E09;&#x4E2A; alter(a)  &#x5F39;&#x51FA; 1
- &#x7B2C;&#x56DB;&#x4E2A; alter(a)  &#x5F39;&#x51FA; 3
- &#x7B2C;&#x4E94;&#x4E2A; alter(a)  &#x5F39;&#x51FA; 3
- &#x6700;&#x540E;&#x4E00;&#x884C;&#x62A5;&#x9519; a is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">- &#x7B2C;&#x4E00;&#x4E2A; alert(a)  &#x5F39;&#x51FA; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ alter(<span class="hljs-number">4</span>); } &#x51FD;&#x6570;&#x4F53;
- &#x7B2C;&#x4E8C;&#x4E2A; alter(a)  &#x5F39;&#x51FA; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ alter(<span class="hljs-number">4</span>); } &#x51FD;&#x6570;&#x4F53;
- &#x7B2C;&#x4E09;&#x4E2A; alter(a)  &#x5F39;&#x51FA; <span class="hljs-number">1</span>
- &#x7B2C;&#x56DB;&#x4E2A; alter(a)  &#x5F39;&#x51FA; <span class="hljs-number">3</span>
- &#x7B2C;&#x4E94;&#x4E2A; alter(a)  &#x5F39;&#x51FA; <span class="hljs-number">3</span>
- &#x6700;&#x540E;&#x4E00;&#x884C;&#x62A5;&#x9519; a is not a <span class="hljs-function"><span class="hljs-keyword">function</span></span></code></pre><ul><li>&#x6267;&#x884C;&#x5206;&#x6790;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;1&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;
// &#x7B2C;2&#x884C;&#xFF0C;&#x9047;&#x5230; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;
a = function a(){ alter(2); }
// &#x7B2C;3&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;
// &#x7B2C;4&#x884C;&#xFF0C;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57; var &#xFF0C; &#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;
a = undefined
// &#x7B2C;5&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;
// &#x7B2C;6&#x884C;&#xFF0C;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57; var &#xFF0C; &#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;
a = undefined
// &#x7B2C;8&#x884C;&#xFF0C;&#x9047;&#x5230; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;
a = function a(){ alter(4); }
// &#x7B2C;9&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;
// &#x7B2C;10&#x884C;&#xFF0C;a() &#x51FD;&#x6570;&#x8C03;&#x7528;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;1&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;</span>
<span class="hljs-comment">// &#x7B2C;2&#x884C;&#xFF0C;&#x9047;&#x5230; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;</span>
a = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ alter(<span class="hljs-number">2</span>); }
<span class="hljs-comment">// &#x7B2C;3&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;</span>
<span class="hljs-comment">// &#x7B2C;4&#x884C;&#xFF0C;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57; var &#xFF0C; &#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;</span>
a = <span class="hljs-literal">undefined</span>
<span class="hljs-comment">// &#x7B2C;5&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;</span>
<span class="hljs-comment">// &#x7B2C;6&#x884C;&#xFF0C;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57; var &#xFF0C; &#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;</span>
a = <span class="hljs-literal">undefined</span>
<span class="hljs-comment">// &#x7B2C;8&#x884C;&#xFF0C;&#x9047;&#x5230; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;</span>
a = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ alter(<span class="hljs-number">4</span>); }
<span class="hljs-comment">// &#x7B2C;9&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x952E;&#x5B57; &#xFF0C; &#x4E0D;&#x89E3;&#x6790;</span>
<span class="hljs-comment">// &#x7B2C;10&#x884C;&#xFF0C;a() &#x51FD;&#x6570;&#x8C03;&#x7528;</span></code></pre><blockquote>&#x6B64;&#x65F6;&#x8FD9;&#x91CC;&#x6709;4&#x4E2A;&#x540C;&#x540D;&#x53D8;&#x91CF; a &#xFF0C;&#x4F9D;&#x5FAA;&#x89C4;&#x5219;&#x662F;&#xFF1A;function &#x4F18;&#x5148;&#x4E0E; var, &#x540C;&#x540D;&#x7684;&#x540E;&#x9762;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;<br>&#x56E0;&#x6B64;&#xFF0C;a = function a(){ alter(2); } &#x66FF;&#x6362;&#x6389;&#x4E0B;&#x9762;&#x7684;2&#x4E2A; a = undefined &#xFF0C;a = function a(){ alter(4); } &#x53C8;&#x66FF;&#x6362;&#x6389; a = function a(){ alter(2); } ,&#x6700;&#x7EC8;&#x53EA;&#x5269;&#x4E0B; a = function a(){ alter(4); }</blockquote><hr><p><strong>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#x54E6;</strong></p><h2 id="articleHeader1">&#x4E00;&#x3001; &#x5168;&#x5C40;&#x9884;&#x5904;&#x7406;&#x548C;&#x6267;&#x884C;</h2><h3 id="articleHeader2">1.1&#x3001;&#x5168;&#x5C40;&#x9884;&#x5904;&#x7406;&#x9636;&#x6BB5;</h3><hr><p><strong>&#x5B9E;&#x4F8B;0</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 5;
var b ;
function xxx(){
  // &#x7528;&#x58F0;&#x660E;&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;
}
var fun = function () {
  // &#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;
}
c = 5;  // &#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x4F1A;&#x52A0;&#x5165;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
<span class="hljs-keyword">var</span> b ;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xxx</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// &#x7528;&#x58F0;&#x660E;&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;</span>
}
<span class="hljs-keyword">var</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// &#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;</span>
}
c = <span class="hljs-number">5</span>;  <span class="hljs-comment">// &#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x4F1A;&#x52A0;&#x5165;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;</span></code></pre><blockquote>&#x5047;&#x8BBE;&#x5168;&#x5C40;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E0A;&#x8BC9;&#x7684;&#x5185;&#x5BB9;</blockquote><ul><li>&#x9996;&#x5148;js&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5BF9;&#x8C61;<code>LexicalEnviroment</code>,&#x5168;&#x5C40;&#x4E0B;&#x7B49;&#x540C;&#x4E8E;&#x6211;&#x4EEC;&#x7684;<code>window</code>&#xFF1B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;
LexicalEnviroment{
  a: undefined
  b: undefined
  xxx: &#x8BE5;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;
  fun: undefined
}

// &#x8FD9;&#x91CC;&#x6709;&#x7740;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x7684;&#x77E5;&#x8BC6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x521B;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;</span>
LexicalEnviroment{
  <span class="hljs-attr">a</span>: <span class="hljs-literal">undefined</span>
  b: <span class="hljs-literal">undefined</span>
  xxx: &#x8BE5;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;
  fun: <span class="hljs-literal">undefined</span>
}

<span class="hljs-comment">// &#x8FD9;&#x91CC;&#x6709;&#x7740;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x7684;&#x77E5;&#x8BC6;</span></code></pre><hr><p><strong>&#x5B9E;&#x4F8B;1</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f(); // ff
g(); // &#x62A5;&#x9519;&#xFF1A; g is not a function

function f(){
  console.log(&apos;ff&apos;);
}
var g = function() {
  // 
}

// &#x3010;&#x89E3;&#x6790;&#x3011;
// &#x56E0;&#x4E3A;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x4E2D;f&#x5B58;&#x5728;&#x5F15;&#x7528;&#xFF0C;g&#x786E;&#x5B9E;&#x662F;undefined&#xFF0C;&#x56E0;&#x6B64;&#x5F53;&#x5728;&#x4E3A;g&#x8D4B;&#x503C;&#x4E4B;&#x524D;&#x8C03;&#x7528;g&#x4F1A;&#x62A5;&#x9519;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">f(); <span class="hljs-comment">// ff</span>
g(); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF1A; g is not a function</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ff&apos;</span>);
}
<span class="hljs-keyword">var</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// </span>
}

<span class="hljs-comment">// &#x3010;&#x89E3;&#x6790;&#x3011;</span>
<span class="hljs-comment">// &#x56E0;&#x4E3A;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x4E2D;f&#x5B58;&#x5728;&#x5F15;&#x7528;&#xFF0C;g&#x786E;&#x5B9E;&#x662F;undefined&#xFF0C;&#x56E0;&#x6B64;&#x5F53;&#x5728;&#x4E3A;g&#x8D4B;&#x503C;&#x4E4B;&#x524D;&#x8C03;&#x7528;g&#x4F1A;&#x62A5;&#x9519;&#x3002;</span></code></pre><hr><p><strong>&#x5B9E;&#x4F8B;2</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a); // undefined
console.log(b); // &#x62A5;&#x9519;&#xFF1A; b is not defined
var a = 1;
b = 4;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF1A; b is not defined</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
b = <span class="hljs-number">4</span>;
</code></pre><hr><p><strong>&#x5B9E;&#x4F8B;3 &#x53D8;&#x91CF;&#x91CD;&#x540D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5904;&#x7406;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x51B2;&#x7A81; =&gt; &#x8986;&#x76D6;
alert(f);
var f = 0;
function f() {
  cosole.log(&apos;f&apos;);
}
// &#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF1A; &#x5F39;&#x51FA;&#x4E00;&#x4E2A;f&#x51FD;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;


// &#x5904;&#x7406;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x51B2;&#x7A81;  =&gt; &#x5FFD;&#x7565;
alert(f);
function f() {
  cosole.log(&apos;f&apos;);
}
var f = 0;
// &#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF1A; &#x5F39;&#x51FA;&#x4E00;&#x4E2A;f&#x51FD;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;

// &#x3010;&#x89E3;&#x6790;&#x3011;
//  &#x53EF;&#x89C1;&#x4E0D;&#x662F;&#x6839;&#x636E;&#x6700;&#x540E;&#x51FA;&#x73B0;&#x7684;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5904;&#x7406;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x51B2;&#x7A81; =&gt; &#x8986;&#x76D6;</span>
alert(f);
<span class="hljs-keyword">var</span> f = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  cosole.log(<span class="hljs-string">&apos;f&apos;</span>);
}
<span class="hljs-comment">// &#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF1A; &#x5F39;&#x51FA;&#x4E00;&#x4E2A;f&#x51FD;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>


<span class="hljs-comment">// &#x5904;&#x7406;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x51B2;&#x7A81;  =&gt; &#x5FFD;&#x7565;</span>
alert(f);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  cosole.log(<span class="hljs-string">&apos;f&apos;</span>);
}
<span class="hljs-keyword">var</span> f = <span class="hljs-number">0</span>;
<span class="hljs-comment">// &#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF1A; &#x5F39;&#x51FA;&#x4E00;&#x4E2A;f&#x51FD;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>

<span class="hljs-comment">// &#x3010;&#x89E3;&#x6790;&#x3011;</span>
<span class="hljs-comment">//  &#x53EF;&#x89C1;&#x4E0D;&#x662F;&#x6839;&#x636E;&#x6700;&#x540E;&#x51FA;&#x73B0;&#x7684;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;</span></code></pre><hr><h3 id="articleHeader3">1.2&#x3001;&#x5168;&#x5C40;&#x6267;&#x884C;&#x9636;&#x6BB5;</h3><p><strong>&#x5B9E;&#x4F8B; 4</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(a);
alert(b);
alert(f);
alert(g);


var a = 5;
b = 6;
alert(b);
function f() {
  console.log(&apos;f&apos;);
}
var g = function () {
  console.log(&apos;g);
}
alert(g);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">alert(a);
alert(b);
alert(f);
alert(g);


<span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
b = <span class="hljs-number">6</span>;
alert(b);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;f&apos;</span>);
}
<span class="hljs-keyword">var</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;g);
}
alert(g);
</span></code></pre><ul><li>&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x5982;&#x4E0B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. &#x6784;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;
2. &#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;
{
  f: function () {console.log(&apos;f&apos;)}
  a: undefined
  g: undefined
}
3. &#x5F00;&#x59CB;&#x6267;&#x884C;
4. alert(a); // undefined
5. alert(b); // &#x62A5;&#x9519;&#xFF1A; b is not defined
6. alert(f); // function () {console.log(&apos;f&apos;)}
7. alert(g); // undefined
8. a = 5;  b = 6                                  [window&#x4E0B;&#x7684;&#x53D8;&#x91CF;&#x8D4B;&#x503C;]
9. alert(b); // 6
10. g = function () {console.log(&apos;g);}            [window&#x4E0B;&#x7684;&#x53D8;&#x91CF;&#x8D4B;&#x503C;]
11. alert(g); // function () {console.log(&apos;g);}

// &#x6700;&#x540E;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;&#xFF08;window&#xFF09;
{
  f: function () {console.log(&apos;f&apos;)}
  a: 5
  g: function () {console.log(&apos;g);}   
  b: 6
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> &#x6784;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;
<span class="hljs-number">2.</span> &#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;
{
  <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;f&apos;</span>)}
  a: <span class="hljs-literal">undefined</span>
  g: <span class="hljs-literal">undefined</span>
}
<span class="hljs-number">3.</span> &#x5F00;&#x59CB;&#x6267;&#x884C;
<span class="hljs-number">4.</span> alert(a); <span class="hljs-comment">// undefined</span>
<span class="hljs-number">5.</span> alert(b); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF1A; b is not defined</span>
<span class="hljs-number">6.</span> alert(f); <span class="hljs-comment">// function () {console.log(&apos;f&apos;)}</span>
<span class="hljs-number">7.</span> alert(g); <span class="hljs-comment">// undefined</span>
<span class="hljs-number">8.</span> a = <span class="hljs-number">5</span>;  b = <span class="hljs-number">6</span>                                  [<span class="hljs-built_in">window</span>&#x4E0B;&#x7684;&#x53D8;&#x91CF;&#x8D4B;&#x503C;]
<span class="hljs-number">9.</span> alert(b); <span class="hljs-comment">// 6</span>
<span class="hljs-number">10.</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;g);}            [window&#x4E0B;&#x7684;&#x53D8;&#x91CF;&#x8D4B;&#x503C;]
11. alert(g); // function () {console.log(&apos;</span>g);}

<span class="hljs-comment">// &#x6700;&#x540E;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;&#xFF08;window&#xFF09;</span>
{
  <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;f&apos;</span>)}
  a: <span class="hljs-number">5</span>
  g: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;g);}   
  b: 6
}</span></code></pre><hr><h2 id="articleHeader4">&#x4E8C;&#x3001; &#x51FD;&#x6570;&#x9884;&#x5904;&#x7406;&#x548C;&#x6267;&#x884C;</h2><h3 id="articleHeader5">2.1&#x3001;&#x51FD;&#x6570;&#x9884;&#x5904;&#x7406;&#x9636;&#x6BB5; + &#x6267;&#x884C;&#x9636;&#x6BB5;</h3><p><strong>&#x5B9E;&#x4F8B; 5</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(a, b) {
  alert(a);
  alert(b);

  var b = 10;
  function a() {
    //
  }
}

f(1,2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">a, b</span>) </span>{
  alert(a);
  alert(b);

  <span class="hljs-keyword">var</span> b = <span class="hljs-number">10</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//</span>
  }
}

f(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);</code></pre><ul><li>&#x6267;&#x884C;&#x5206;&#x6790;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 1. &#x6784;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;
2. &#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;
{
  a: &#x6700;&#x521D;&#x662F;1&#xFF0C; &#x56E0;&#x4E3A;&#x51B2;&#x7A81;&#xFF0C;&#x6700;&#x540E;&#x53D8;&#x6210;&#x4E86; &#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528; function a() {// }
  b: 2

}
3. &#x5F00;&#x59CB;&#x6267;&#x884C;
4. alert(a); // function a() {// }
5. alert(b); // 2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> <span class="hljs-number">1.</span> &#x6784;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;
<span class="hljs-number">2.</span> &#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x5982;&#x4E0B;
{
  <span class="hljs-attr">a</span>: &#x6700;&#x521D;&#x662F;<span class="hljs-number">1</span>&#xFF0C; &#x56E0;&#x4E3A;&#x51B2;&#x7A81;&#xFF0C;&#x6700;&#x540E;&#x53D8;&#x6210;&#x4E86; &#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-comment">// }</span>
  b: <span class="hljs-number">2</span>

}
<span class="hljs-number">3.</span> &#x5F00;&#x59CB;&#x6267;&#x884C;
<span class="hljs-number">4.</span> alert(a); <span class="hljs-comment">// function a() {// }</span>
<span class="hljs-number">5.</span> alert(b); <span class="hljs-comment">// 2</span>
</code></pre><hr><p><strong>&#x5B9E;&#x4F8B; 6</strong></p><ul><li>&#x51FD;&#x6570;&#x5185;&#x90E8;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7528;var&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4F1A;&#x6210;&#x4E3A;&#x6700;&#x5916;&#x90E8;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x7684;&#x53D8;&#x91CF;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x4E86;&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function a() {
  function b() {
    c = 100;
  }
  b();
}

a();

// window.c === 100" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>) </span>{
    c = <span class="hljs-number">100</span>;
  }
  b();
}

a();

<span class="hljs-comment">// window.c === 100</span></code></pre><hr>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 JS的解析与执行过程

## 原文链接
[https://segmentfault.com/a/1190000015940119](https://segmentfault.com/a/1190000015940119)


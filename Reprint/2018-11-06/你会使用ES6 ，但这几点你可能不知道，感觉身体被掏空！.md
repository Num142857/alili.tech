---
title: 你会使用ES6 ，但这几点你可能不知道，感觉身体被掏空！
hidden: true
categories: [reprint]
slug: e3b25d5a
date: 2018-11-06 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">let &#x7684;&#x4F7F;&#x7528;</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053; <strong>let</strong> &#x4E3B;&#x8981;&#x6709;&#x4E09;&#x4E2A;&#x7279;&#x6027;&#xFF1A;</p><ol><li>let &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5757;&#x7EA7;&#x7684; (es5&#x4E2D;&#x53EA;&#x6709;&#x5168;&#x5C40;&#x548C;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;)</li><li>let &#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x5DF2;&#x5B58;&#x5728;&#x7684;&#x53D8;&#x91CF;&#xFF1B;</li><li>let &#x6709;&#x6682;&#x65F6;&#x6B7B;&#x533A;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x3002;</li></ol><p>&#x6211;&#x4EEC;&#x65E9;&#x671F;&#x9762;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7ECF;&#x5E38;&#x4F1A;&#x8003;&#x7684;&#x4E00;&#x9053;&#x9898;&#x76EE;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE3;&#x7801;&#x6BB5;1
var liList = document.querySelectorAll(&apos;li&apos;) // &#x5171;5&#x4E2A;li
for( var i=0; i&lt;liList.length; i++){
  liList[i].onclick = function(){
    console.log(i)
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4EE3;&#x7801;&#x6BB5;1</span>
<span class="hljs-keyword">var</span> liList = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>) <span class="hljs-comment">// &#x5171;5&#x4E2A;li</span>
<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;liList.length; i++){
  liList[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(i)
  }
}
</code></pre><p>&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#x4F9D;&#x6B21;&#x70B9;&#x51FB; li &#x4F1A;&#x6253;&#x5370;&#x51FA; 5 &#x4E2A; 5&#x3002;&#x5982;&#x679C;&#x628A; var i &#x6539;&#x6210; let i&#xFF0C;&#x5C31;&#x4F1A;&#x5206;&#x522B;&#x6253;&#x5370;&#x51FA; 0&#x3001;1&#x3001;2&#x3001;3&#x3001;4&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE3;&#x7801;&#x6BB5;2
var liList = document.querySelectorAll(&apos;li&apos;) // &#x5171;5&#x4E2A;li
for( let i=0; i&lt;liList.length; i++){
  liList[i].onclick = function(){
    console.log(i)
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4EE3;&#x7801;&#x6BB5;2</span>
<span class="hljs-keyword">var</span> liList = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>) <span class="hljs-comment">// &#x5171;5&#x4E2A;li</span>
<span class="hljs-keyword">for</span>( <span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;liList.length; i++){
  liList[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(i)
  }
}
</code></pre><p>&#x7136;&#x800C;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0; for( let i=0; i&lt;liList.length; i++)&#xFF0C;&#x8FD9;&#x6837;&#x58F0;&#x660E; i &#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x54EA;&#x4E2A;&#xFF1F;&#x8FD9;&#x8FB9;&#x76F4;&#x63A5;&#x8DDF;&#x4F60;&#x8BF4;&#x5427;&#xFF0C;i &#x7684;&#x4F5C;&#x7528;&#x57DF;&#x53EA;&#x5728;for()&#x62EC;&#x53F7;&#x91CC;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x4EE3;&#x7801;&#x4E2D;&#x4F9D;&#x7136;&#x53EA;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E2A; i&#xFF0C;&#x5728; for &#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x540E;&#xFF0C;i &#x7684;&#x503C;&#x8FD8;&#x662F;&#x4F1A;&#x53D8;&#x6210; 5 &#x624D;&#x5BF9;&#x3002;&#x8FD9;&#x91CC;&#x53EF;&#x80FD;&#x5C31;&#x8BF4;&#x660E;&#x6709;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x4EBA;&#x5BF9; let &#x7406;&#x89E3;&#x6709;&#x8BEF;&#x4E86;&#x3002;</p><p>&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x65B9;&#x65B9;&#x8001;&#x5E08;&#x5927;&#x4F6C;&#x53BB;&#x770B; MDN &#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x53D1;&#x73B0;&#x9E21;&#x8D3C;&#x7684; MDN &#x5DE7;&#x5999;&#x5730;&#x907F;&#x5F00;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5B83;&#x7684;&#x4F8B;&#x5B50;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhGY2?w=720&amp;h=348" src="https://static.alili.tech/img/bVbhGY2?w=720&amp;h=348" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5B83;&#x76F4;&#x63A5;&#x5728;&#x53E6;&#x5916;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E2A; j &#x6765;&#x4FDD;&#x5B58;&#xFF0C; &#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x7528; i &#x5462;&#xFF1F;<strong>MDN &#x4E3A;&#x4E86;&#x7B80;&#x5316;&#x77E5;&#x8BC6;&#xFF0C;&#x9690;&#x7792;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;</strong></p><p>&#x7ECF;&#x8FC7;&#x6211;&#x4EEC;&#x65B9;&#x65B9;&#x8001;&#x5E08;&#x5927;&#x4F6C;&#x9965;&#x6E34;&#x7CBE;&#x795E;&#xFF0C;&#x4E0D;&#x65AD;&#x7684;&#x67E5;&#x8D44;&#x6599;&#xFF0C;&#x6700;&#x540E;&#x4ED6;&#x603B;&#x7ED3;&#x8FD9;&#x4E48;&#x51E0;&#x53E5;&#x81EA;&#x5DF1;&#x7684;&#x7406;&#x89E3;&#xFF1A;</p><ol><li>for( let i = 0; i&lt; 5; i++) &#x8FD9;&#x53E5;&#x8BDD;&#x7684;&#x5706;&#x62EC;&#x53F7;&#x4E4B;&#x95F4;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x9690;&#x85CF;&#x7684;&#x4F5C;&#x7528;&#x57DF;</li><li>for( let i = 0; i&lt; 5; i++) { &#x5FAA;&#x73AF;&#x4F53; } &#x5728;&#x6BCF;&#x6B21;&#x6267;&#x884C;&#x5FAA;&#x73AF;&#x4F53;&#x4E4B;&#x524D;&#xFF0C;JS &#x5F15;&#x64CE;&#x4F1A;&#x628A; i &#x5728;&#x5FAA;&#x73AF;&#x4F53;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x91CD;&#x65B0;&#x58F0;&#x660E;&#x53CA;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x6B21;&#x3002;</li></ol><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6BB5;2&#x53EF;&#x4EE5;&#x8FD1;&#x4F3C;&#x8FD1;&#x4F3C;&#x8FD1;&#x4F3C;&#x5730;&#x7406;&#x89E3;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE3;&#x7801;&#x6BB5;3
var liList = document.querySelectorAll(&apos;li&apos;) // &#x5171;5&#x4E2A;li
for( let i=0; i&lt;liList.length; i++){
  let i = &#x9690;&#x85CF;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x7684;i // &#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;
  liList[i].onclick = function(){
    console.log(i)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// &#x4EE3;&#x7801;&#x6BB5;3</span>
<span class="hljs-selector-tag">var</span> liList = document.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>) <span class="hljs-comment">// &#x5171;5&#x4E2A;li</span>
<span class="hljs-function"><span class="hljs-title">for</span><span class="hljs-params">( let i=<span class="hljs-number">0</span>; i&lt;liList.length; i++)</span></span>{
  let <span class="hljs-selector-tag">i</span> = &#x9690;&#x85CF;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x7684;<span class="hljs-selector-tag">i</span> <span class="hljs-comment">// &#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;</span>
  liList[i]<span class="hljs-selector-class">.onclick</span> = function(){
    console.log(i)
  }
}</code></pre><p>&#x90A3;&#x6837;&#x7684;&#x8BDD;&#xFF0C;5 &#x6B21;&#x5FAA;&#x73AF;&#xFF0C;&#x5C31;&#x4F1A;&#x6709; 5 &#x4E2A;&#x4E0D;&#x540C;&#x7684; i&#xFF0C;console.log &#x51FA;&#x6765;&#x7684; i &#x5F53;&#x7136;&#x4E5F;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x503C;&#x3002;</p><p>&#x518D;&#x52A0;&#x4E0A;&#x9690;&#x85CF;&#x4F5C;&#x7528;&#x57DF;&#x91CC;&#x7684; i&#xFF0C;&#x4E00;&#x5171;&#x6709; 6 &#x4E2A; i&#x3002;</p><p>&#x8FD9;&#x5C31;&#x662F; MDN &#x52A0;&#x90A3;&#x53E5; let j = i &#x7684;&#x539F;&#x56E0;&#xFF1A;&#x65B9;&#x4FBF;&#x65B0;&#x4EBA;&#x7406;&#x89E3;&#x3002;</p><p>&#x603B;&#x5F97;&#x6765;&#x8BF4;&#x5C31;&#x662F; let/const &#x5728;&#x4E0E; for &#x4E00;&#x8D77;&#x7528;&#x65F6;&#xFF0C;&#x4F1A;&#x6709;&#x4E00;&#x4E2A; perIterationBindings &#x7684;&#x6982;&#x5FF5;&#xFF08;&#x4E00;&#x79CD;&#x8BED;&#x6CD5;&#x7CD6;&#xFF09;&#x3002;</p><h4>let &#x5230;&#x5E95;&#x6709;&#x6CA1;&#x6709;&#x63D0;&#x5347;</h4><p>&#x4E4B;&#x524D;&#x6211;&#x5199;&#x8FC7;&#x4E00;&#x7BC7; <a href="https://segmentfault.com/a/1190000014856034">&#x300A;&#x4F60;&#x4E00;&#x5EA6;&#x6A21;&#x7CCA;&#x7684;javascript&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x8BE6;&#x89E3;&#x300B;</a>&#xFF0C; &#x8BF4;&#x5230;js&#x5728;&#x4E00;&#x6BB5;&lt;script&gt;&#x6216;&#x8005;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x5C31;&#x662F;js&#x4F1A;&#x5148;&#x628A;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x90FD; &#x62FF;&#x51FA;&#x6765;&#xFF0C;&#x5E76;&#x521D;&#x59CB;&#x5316;&#x4E3A; undefined,&#x8FD9;&#x5C31;&#x89E3;&#x91CA;&#x4E86;&#x4E3A;&#x4EC0;&#x4E48;&#x5728; var x = 1 &#x4E4B;&#x524D; console.log(x) &#x4F1A;&#x5F97;&#x5230; undefined&#x3002;</p><p>&#x90A3;let &#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x4F1A;&#x662F;&#x600E;&#x4E48;&#x6837;&#x7684;&#x5462;&#xFF1F;&#x5047;&#x8BBE;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let x = 1
  x = 2
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>{
  <span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">1</span>
  <span class="hljs-attr">x</span> = <span class="hljs-number">2</span>
}</code></pre><p>&#x6211;&#x4EEC;&#x53EA;&#x770B; {} &#x91CC;&#x9762;&#x7684;&#x8FC7;&#x7A0B;&#xFF1A;</p><ol><li>&#x627E;&#x5230;&#x6240;&#x6709;&#x7528; let &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5728;&#x73AF;&#x5883;&#x4E2D;&#x300C;&#x521B;&#x5EFA;&#x300D;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;</li><li>&#x5F00;&#x59CB;&#x6267;&#x884C;&#x4EE3;&#x7801;<strong>&#xFF08;&#x6CE8;&#x610F;&#x73B0;&#x5728;&#x8FD8;&#x6CA1;&#x6709;&#x521D;&#x59CB;&#x5316;&#xFF09;</strong></li><li>&#x6267;&#x884C; x = 1&#xFF0C;&#x5C06; x &#x300C;&#x521D;&#x59CB;&#x5316;&#x300D;&#x4E3A; 1&#xFF08;&#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x6B21;&#x8D4B;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7801;&#x662F; let x&#xFF0C;&#x5C31;&#x5C06; x &#x521D;&#x59CB;&#x5316;&#x4E3A; undefined&#xFF09;</li><li>&#x6267;&#x884C; x = 2&#xFF0C;&#x5BF9; x &#x8FDB;&#x884C;&#x300C;&#x8D4B;&#x503C;&#x300D;</li></ol><p>&#x8FD9;&#x5C31;&#x89E3;&#x91CA;&#x4E86;&#x4E3A;&#x4EC0;&#x4E48;&#x5728; let x &#x4E4B;&#x524D;&#x4F7F;&#x7528; x &#x4F1A;&#x62A5;&#x9519;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = &apos;global&apos;
{
  console.log(x) // Uncaught ReferenceError: x is not defined
  let x = 1
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> x = <span class="hljs-string">&apos;global&apos;</span>
{
  <span class="hljs-built_in">console</span>.log(x) <span class="hljs-comment">// Uncaught ReferenceError: x is not defined</span>
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>
}
</code></pre><p>&#x539F;&#x56E0;&#x6709;&#x4E24;&#x4E2A;&#xFF1A;</p><ol><li>console.log(x) &#x4E2D;&#x7684; x &#x6307;&#x7684;&#x662F;&#x4E0B;&#x9762;&#x7684; x&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x7684; x</li><li>&#x6267;&#x884C; log &#x65F6; x &#x8FD8;&#x6CA1;&#x300C;&#x521D;&#x59CB;&#x5316;&#x300D;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684;&#x6682;&#x65F6;&#x6B7B;&#x533A;&#xFF09;</li></ol><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x660E;&#x767D;&#x4E86; let &#x5230;&#x5E95;&#x6709;&#x6CA1;&#x6709;&#x63D0;&#x5347;&#xFF1A;</p><ol><li>let &#x7684;&#x300C;&#x521B;&#x5EFA;&#x300D;&#x8FC7;&#x7A0B;&#x88AB;&#x63D0;&#x5347;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x521D;&#x59CB;&#x5316;&#x6CA1;&#x6709;&#x63D0;&#x5347;&#x3002;</li><li>var &#x7684;&#x300C;&#x521B;&#x5EFA;&#x300D;&#x548C;&#x300C;&#x521D;&#x59CB;&#x5316;&#x300D;&#x90FD;&#x88AB;&#x63D0;&#x5347;&#x4E86;&#x3002;</li><li>function &#x7684;&#x300C;&#x521B;&#x5EFA;&#x300D;&#x300C;&#x521D;&#x59CB;&#x5316;&#x300D;&#x548C;&#x300C;&#x8D4B;&#x503C;&#x300D;&#x90FD;&#x88AB;&#x63D0;&#x5347;&#x4E86;&#x3002;</li></ol><h2 id="articleHeader1">get &#x4E0E; set &#x7684;&#x65B9;&#x6CD5;</h2><ol><li>Get&#x6307;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;&#x65F6;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;</li><li>Set&#x6307;&#x5199;&#x5165;&#x5C5E;&#x6027;&#x65F6;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;</li></ol><p>&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x9053;&#x9898;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;&#x6709;&#x6CA1;&#x6709;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x540C;&#x65F6;&#x6EE1;&#x8DB3;&#x4E0B;&#x5217;&#x6761;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a === 1 &amp;&amp; a === 2 &amp;&amp; a ===3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>a === <span class="hljs-number">1</span> &amp;&amp; a === <span class="hljs-number">2</span> &amp;&amp; a ===<span class="hljs-number">3</span>
</code></pre><p>&#x6709;&#x7684;&#x4EBA;&#x53EF;&#x80FD;&#x4F1A;&#x89C9;&#x5F97;&#x8FD9;&#x600E;&#x4E48;&#x53EF;&#x80FD;&#x53D8;&#x6210;&#x7ACB;&#x5462;&#xFF0C;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x4E24;&#x4E2A;&#x503C;&#xFF1F;&#x8FD9;&#x8FB9;&#x5C31;&#x8981;&#x5F15;&#x5165;&#x6211;&#x4EEC;set&#x7684;&#x65B9;&#x6CD5;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;window,&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;a ,&#x5982;&#x4E0B;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 0;

Object.defineProperty(window, &apos;a&apos;,{
    get:function() {
        i += 1;
        return i;
    },
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;

<span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">window</span>, <span class="hljs-string">&apos;a&apos;</span>,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        i += <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> i;
    },
})
</code></pre><p>&#x901A;&#x8FC7;&#x5728;window&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;a,&#x7136;&#x540E;&#x6BCF;&#x6B21;&#x8BBF;&#x95EE;a&#x7684; i &#x7684;&#x503C;&#x4F1A;&#x52A0;&#x4F5C;&#x4E3A;a&#x7684;&#x503C;&#x8FD4;&#x56DE;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhI3M?w=542&amp;h=108" src="https://static.alili.tech/img/bVbhI3M?w=542&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x9664;&#x4E86;&#x9762;&#x8BD5;&#x611F;&#x89C9;&#x6CA1;&#x5565;&#x8F6F;&#x7528;&#xFF0C;&#x4F46;&#x8FD9;&#x80FD;&#x544A;&#x8BC9;&#x4F60; get, set&#x6709;&#x4EC0;&#x4E48;&#x7528;&#x3002;</p><h2 id="articleHeader2">Symbol&#x7684;&#x5DE7;&#x7528;</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF1A;ES 6 &#x5F15;&#x5165;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B; Symbol&#xFF0C; Symbol &#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#xFF08;&#x4F46;&#x5E76;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF09;&#x3002;</p><p>&#x5047;&#x5982;&#x73B0;&#x5728;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E2A;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x53EA;&#x80FD;&#x81EA;&#x5DF1;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#xFF0C;&#x5916;&#x90E8;&#x8C03;&#x7528;&#x4E0D;&#x5230;&#xFF0C;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528; Symbol&#x6765;&#x505A;&#xFF1A;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let a = Symbol();
    let obj = {
        name: &apos;&#x5C0F;&#x667A;&apos;,
        age: 18,
        [a]: &apos;&#x8FD9;&#x4E2A;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&apos;
    }
    window.obj = obj;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-built_in">Symbol</span>();
    <span class="hljs-keyword">let</span> obj = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5C0F;&#x667A;&apos;</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>,
        [a]: <span class="hljs-string">&apos;&#x8FD9;&#x4E2A;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&apos;</span>
    }
    <span class="hljs-built_in">window</span>.obj = obj;
}
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhJNj?w=836&amp;h=286" src="https://static.alili.tech/img/bVbhJNj?w=836&amp;h=286" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x4E0B;&#xFF0C;&#x6211;&#x6709;&#x5728;&#x5916;&#x90E8;&#x65E0;&#x8BED;&#x4F60;&#x600E;&#x4E48;&#x7528;&#xFF0C;&#x90FD;&#x662F;&#x8C03;&#x7528;&#x4E0D;&#x5230; &#x201C;&#x8FD9;&#x4E2A;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x201D;,&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x8BF4;&#x8FD9;&#x4E2A;&#x6709;&#x5565;&#x7528;&#xFF0C;&#x6211;&#x53EA;&#x80FD;&#x56DE;&#x7B54;&#x4F60;&#x88C5;x&#x7528;&#x7684;&#xFF0C;&#x9762;&#x8BD5;&#x53EF;&#x80FD;&#x4E5F;&#x4F1A;&#x95EE;&#x4F60; &#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5F04;&#x4E00;&#x4E2A;&#x9690;&#x85CF;&#x5C5E;&#x6027;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x5C31;&#x662F; Symbol ,&#x6EE1;&#x5A5A;&#x6EE1;&#x5A5A;&#x6EE1;&#x5A5A;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#xFF0C;&#x5C31;&#x662F; Symbol &#x7684;&#x7B80;&#x8FF0;&#xFF0C;&#x66F4;&#x8BE6;&#x7EC6;&#x66F4;&#x6743;&#x5A01;&#x7684;&#x77E5;&#x8BC6;&#x53C2;&#x8003;&#x4E0B;&#x9762;&#x7684;&#x81EA;&#x5B66;&#x94FE;&#x63A5;&#x3002;</p><p><a href="https://link.zhihu.com/?target=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" rel="nofollow noreferrer" target="_blank">MDN&#xFF1A; Symbol - JavaScript</a><br><a href="https://link.zhihu.com/?target=http://es6.ruanyifeng.com/#docs/symbol" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;&#xFF1A;ECMAScript 6&#x5165;&#x95E8;</a></p><p><strong>&#x53C2;&#x8003;&#xFF1A;</strong></p><blockquote><a href="https://zhuanlan.zhihu.com/p/28140450" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7528;&#x4E86;&#x4E24;&#x4E2A;&#x6708;&#x7684;&#x65F6;&#x95F4;&#x624D;&#x7406;&#x89E3; let</a></blockquote><p><strong>&#x4E00;&#x4E2A;&#x7B28;&#x7B28;&#x7684;&#x7801;&#x519C;&#xFF0C;&#x6211;&#x7684;&#x4E16;&#x754C;&#x53EA;&#x80FD;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbg32a?w=258&amp;h=258" src="https://static.alili.tech/img/bVbg32a?w=258&amp;h=258" alt="" title="" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你会使用ES6 ，但这几点你可能不知道，感觉身体被掏空！

## 原文链接
[https://segmentfault.com/a/1190000016587961](https://segmentfault.com/a/1190000016587961)


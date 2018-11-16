---
title: 深入浅出Javascript闭包
hidden: true
categories: [reprint]
slug: 1c8afc86
date: 2018-11-05 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x5F15;&#x5B50;</h2><p>&#x95ED;&#x5305;&#xFF08;closure&#xFF09;&#x662F; Javascript &#x8BED;&#x8A00;&#x7684;&#x4E00;&#x4E2A;&#x96BE;&#x70B9;&#xFF0C;&#x9762;&#x8BD5;&#x65F6;&#x5E38;&#x88AB;&#x95EE;&#x53CA;&#xFF0C;&#x4E5F;&#x662F;&#x5B83;&#x7684;&#x7279;&#x8272;&#xFF0C;&#x5F88;&#x591A;&#x9AD8;&#x7EA7;&#x5E94;&#x7528;&#x90FD;&#x8981;&#x4F9D;&#x9760;&#x95ED;&#x5305;&#x5B9E;&#x73B0;&#x3002;&#x672C;&#x6587;&#x5C3D;&#x53EF;&#x80FD;&#x7528;&#x7B80;&#x5355;&#x6613;&#x61C2;&#x7684;&#x8BDD;&#xFF0C;&#x8BB2;&#x6E05;&#x695A;&#x95ED;&#x5305;&#x7684;&#x6982;&#x5FF5;&#x3001;&#x4F5C;&#x7528;&#x53CA;&#x5176;&#x5E38;&#x89C1;&#x7684;&#x9762;&#x8BD5;&#x9898;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016657656?w=1255&amp;h=617" src="https://static.alili.tech/img/remote/1460000016657656?w=1255&amp;h=617" alt="&#x672C;&#x6587;&#x6846;&#x67B6;&#x56FE;" title="&#x672C;&#x6587;&#x6846;&#x67B6;&#x56FE;" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = 999;
function f1() {
console.log(n);
}
f1() // 999" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> n = <span class="hljs-number">999</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-built_in">console</span>.log(n);
}
f1() <span class="hljs-comment">// 999</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570;f1&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5168;&#x5C40;&#x53D8;&#x91CF;n&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x65E0;&#x6CD5;&#x8BFB;&#x53D6;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1() {
var n = 999;
}
console.log(n)
// Uncaught ReferenceError: n is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">var</span> n = <span class="hljs-number">999</span>;
}
<span class="hljs-built_in">console</span>.log(n)
<span class="hljs-comment">// Uncaught ReferenceError: n is not defined</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570;f1&#x5185;&#x90E8;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;n&#xFF0C;&#x51FD;&#x6570;&#x5916;&#x662F;&#x65E0;&#x6CD5;&#x8BFB;&#x53D6;&#x7684;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x65F6;&#x9700;&#x8981;&#x5F97;&#x5230;&#x51FD;&#x6570;&#x5185;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x3002;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x662F;&#x529E;&#x4E0D;&#x5230;&#x7684;&#xFF0C;&#x53EA;&#x6709;&#x901A;&#x8FC7;&#x53D8;&#x901A;&#x65B9;&#x6CD5;&#x624D;&#x80FD;&#x5B9E;&#x73B0;&#x3002;&#x90A3;&#x5C31;&#x662F;&#x5728;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#xFF0C;&#x518D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1() {
var n = 999;
function f2() {
  console.log(n); // 999
 }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">var</span> n = <span class="hljs-number">999</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(n); <span class="hljs-comment">// 999</span>
 }
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570;f2&#x5C31;&#x5728;&#x51FD;&#x6570;f1&#x5185;&#x90E8;&#xFF0C;&#x8FD9;&#x65F6;f1&#x5185;&#x90E8;&#x7684;&#x6240;&#x6709;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#xFF0C;&#x5BF9;f2&#x90FD;&#x662F;&#x53EF;&#x89C1;&#x7684;&#x3002;&#x65E2;&#x7136;f2&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;f1&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#xFF0C;&#x90A3;&#x4E48;&#x53EA;&#x8981;&#x628A;f2&#x4F5C;&#x4E3A;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5C31;&#x53EF;&#x4EE5;&#x5728;f1&#x5916;&#x90E8;&#x8BFB;&#x53D6;&#x5B83;&#x7684;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x4E86;&#x5417;&#xFF01;</p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x95ED;&#x5305;&#x662F;&#x4EC0;&#x4E48;</h2><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5BF9;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function f1(){
   var a = 999;
   function f2(){
    console.log(a);
   }
   return f2; // f1&#x8FD4;&#x56DE;&#x4E86;f2&#x7684;&#x5F15;&#x7528;
   }
   var result = f1(); // result&#x5C31;&#x662F;f2&#x51FD;&#x6570;&#x4E86;
   result();  // &#x6267;&#x884C;result&#xFF0C;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x6CA1;&#x6709;a&#x7684;&#x5B9A;&#x4E49;&#xFF0C;
         //&#x4F46;&#x662F;&#x51FD;&#x6570;&#x95ED;&#x5305;&#xFF0C;&#x80FD;&#x591F;&#x628A;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E00;&#x8D77;&#x8BB0;&#x4F4F;&#xFF0C;&#x8F93;&#x51FA;999            " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">var</span> a = <span class="hljs-number">999</span>;
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(a);
   }
   <span class="hljs-keyword">return</span> f2; <span class="hljs-comment">// f1&#x8FD4;&#x56DE;&#x4E86;f2&#x7684;&#x5F15;&#x7528;</span>
   }
   <span class="hljs-keyword">var</span> result = f1(); <span class="hljs-comment">// result&#x5C31;&#x662F;f2&#x51FD;&#x6570;&#x4E86;</span>
   result();  <span class="hljs-comment">// &#x6267;&#x884C;result&#xFF0C;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x6CA1;&#x6709;a&#x7684;&#x5B9A;&#x4E49;&#xFF0C;</span>
         <span class="hljs-comment">//&#x4F46;&#x662F;&#x51FD;&#x6570;&#x95ED;&#x5305;&#xFF0C;&#x80FD;&#x591F;&#x628A;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E00;&#x8D77;&#x8BB0;&#x4F4F;&#xFF0C;&#x8F93;&#x51FA;999            </span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570;f1&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5C31;&#x662F;&#x51FD;&#x6570;f2&#xFF0C;&#x7531;&#x4E8E;f2&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;f1&#x7684;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x5916;&#x90E8;&#x83B7;&#x5F97;f1&#x7684;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x4E86;&#x3002;</p><p>&#x95ED;&#x5305;&#x5C31;&#x662F;&#x51FD;&#x6570;f2&#xFF0C;&#x5373;&#x80FD;&#x591F;&#x8BFB;&#x53D6;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;&#x3002;&#x7531;&#x4E8E;&#x5728;JavaScript&#x8BED;&#x8A00;&#x4E2D;&#xFF0C;&#x53EA;&#x6709;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x5B50;&#x51FD;&#x6570;&#x624D;&#x80FD;&#x8BFB;&#x53D6;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x628A;&#x95ED;&#x5305;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x6210;&#x201C;&#x5B9A;&#x4E49;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x51FD;&#x6570;&#x201D;&#x3002;<strong>&#x95ED;&#x5305;&#x6700;&#x5927;&#x7684;&#x7279;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x5B83;&#x53EF;&#x4EE5;&#x201C;&#x8BB0;&#x4F4F;&#x201D;&#x8BDE;&#x751F;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x6BD4;&#x5982;f2&#x8BB0;&#x4F4F;&#x4E86;&#x5B83;&#x8BDE;&#x751F;&#x7684;&#x73AF;&#x5883;f1&#xFF0C;&#x6240;&#x4EE5;&#x4ECE;f2&#x53EF;&#x4EE5;&#x5F97;&#x5230;f1&#x7684;&#x5185;&#x90E8;&#x53D8;&#x91CF;</strong>&#x3002;&#x5728;&#x672C;&#x8D28;&#x4E0A;&#xFF0C;&#x95ED;&#x5305;&#x5C31;&#x662F;&#x5C06;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x548C;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x7684;&#x4E00;&#x5EA7;&#x6865;&#x6881;&#x3002;</p><h4>&#x90A3;&#x5230;&#x5E95;&#x4EC0;&#x4E48;&#x662F;&#x95ED;&#x5305;&#x5462;&#xFF1F;</h4><p><strong>&#x5F53;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BB0;&#x4F4F;&#x5E76;&#x8BBF;&#x95EE;&#x6240;&#x5728;&#x7684;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5373;&#x4F7F;&#x51FD;&#x6570;&#x662F;&#x5728;&#x5F53;&#x524D;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#x4E4B;&#x5916;&#x6267;&#x884C;&#xFF0C;&#x8FD9;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x95ED;&#x5305;&#x3002;</strong> ----&#x300A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Javascript&#x4E0A;&#x5377;&#x300B;</p><p>&#x6211;&#x4E2A;&#x4EBA;&#x7406;&#x89E3;&#xFF0C;<strong>&#x95ED;&#x5305;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x51FD;&#x6570;(&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x4E0D;&#x80FD;&#x51FD;&#x6570;&#x518D;&#x5957;&#x51FD;&#x6570;)</strong>,&#x91CC;&#x9762;&#x7684;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5916;&#x9762;&#x51FD;&#x6570;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5916;&#x9762;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x662F;&#x8FD9;&#x4E2A;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x3002;</p><h2 id="articleHeader2">&#x4E09;&#x3001;&#x95ED;&#x5305;&#x7684;&#x7279;&#x6027;</h2><p><strong>&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x662F;&#x95ED;&#x5305;&#xFF0C;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x5929;&#x751F;&#x90FD;&#x80FD;&#x591F;&#x8BB0;&#x5FC6;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x65F6;&#x6240;&#x5904;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x73AF;&#x5883;</strong>&#x3002;&#x628A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4ECE;&#x5B83;&#x5B9A;&#x4E49;&#x7684;&#x90A3;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x632A;&#x8D70;&#xFF0C;&#x8FD0;&#x884C;&#x3002;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C45;&#x7136;&#x80FD;&#x591F;&#x8BB0;&#x5FC6;&#x4F4F;&#x5B9A;&#x4E49;&#x65F6;&#x7684;&#x90A3;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#x3002;<strong>&#x4E0D;&#x7BA1;&#x51FD;&#x6570;&#x8D70;&#x5230;&#x54EA;&#x91CC;&#xFF0C;&#x5B9A;&#x4E49;&#x65F6;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x5E26;&#x5230;&#x4E86;&#x54EA;&#x91CC;</strong>&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x7528;&#x4E24;&#x4E2A;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4F8B;&#x9898;1
var inner;
function outer(){
var a=250;
inner=function(){
alert(a);//&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x867D;&#x7136;&#x5728;&#x5916;&#x9762;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x80FD;&#x591F;&#x8BB0;&#x5FC6;&#x4F4F;&#x5B9A;&#x4E49;&#x65F6;&#x7684;&#x90A3;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;a&#x662F;250
  }
}
outer();
var a=300;
inner();//&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5728;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x627E;&#x95ED;&#x5305;&#x91CC;&#x9762;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x4F1A;&#x7406;&#x4F1A;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">//&#x4F8B;&#x9898;1</span>
<span class="hljs-keyword">var</span> inner;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outer</span><span class="hljs-params">()</span></span>{
<span class="hljs-keyword">var</span> a=<span class="hljs-number">250</span>;
inner=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
alert(a);<span class="hljs-comment">//&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x867D;&#x7136;&#x5728;&#x5916;&#x9762;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x80FD;&#x591F;&#x8BB0;&#x5FC6;&#x4F4F;&#x5B9A;&#x4E49;&#x65F6;&#x7684;&#x90A3;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;a&#x662F;250</span>
  }
}
outer();
<span class="hljs-keyword">var</span> a=<span class="hljs-number">300</span>;
inner();<span class="hljs-comment">//&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5728;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x627E;&#x95ED;&#x5305;&#x91CC;&#x9762;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x4F1A;&#x7406;&#x4F1A;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x3002;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4F8B;&#x9898;2
function outer(x){
  function inner(y){
  console.log(x+y);
  }
return inner;
}
var inn=outer(3);//&#x6570;&#x5B57;3&#x4F20;&#x5165;outer&#x51FD;&#x6570;&#x540E;&#xFF0C;inner&#x51FD;&#x6570;&#x4E2D;x&#x4FBF;&#x4F1A;&#x8BB0;&#x4F4F;&#x8FD9;&#x4E2A;&#x503C;
inn(5);//&#x5F53;inner&#x51FD;&#x6570;&#x518D;&#x4F20;&#x5165;5&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x4F1A;&#x5BF9;y&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x540E;&#x5F39;&#x51FA;8" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x4F8B;&#x9898;2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outer</span>(<span class="hljs-params">x</span>)</span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params">y</span>)</span>{
  <span class="hljs-built_in">console</span>.log(x+y);
  }
<span class="hljs-keyword">return</span> inner;
}
<span class="hljs-keyword">var</span> inn=outer(<span class="hljs-number">3</span>);<span class="hljs-comment">//&#x6570;&#x5B57;3&#x4F20;&#x5165;outer&#x51FD;&#x6570;&#x540E;&#xFF0C;inner&#x51FD;&#x6570;&#x4E2D;x&#x4FBF;&#x4F1A;&#x8BB0;&#x4F4F;&#x8FD9;&#x4E2A;&#x503C;</span>
inn(<span class="hljs-number">5</span>);<span class="hljs-comment">//&#x5F53;inner&#x51FD;&#x6570;&#x518D;&#x4F20;&#x5165;5&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x4F1A;&#x5BF9;y&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x540E;&#x5F39;&#x51FA;8</span></code></pre><h2 id="articleHeader3">&#x56DB;&#x3001;&#x95ED;&#x5305;&#x7684;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;</h2><p>&#x6808;&#x5185;&#x5B58;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#xFF0C;&#x5373;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5305;&#x62EC;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x548C;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;,&#x90A3;&#x4ED6;&#x4EEC;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x91CA;&#x653E;&#x5185;&#x5B58;&#x7684;&#xFF1F;</p><ul><li><strong>&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;----&#x53EA;&#x6709;&#x5F53;&#x9875;&#x9762;&#x5173;&#x95ED;&#x7684;&#x65F6;&#x5019;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x624D;&#x4F1A;&#x9500;&#x6BC1;</strong></li><li><strong>&#x79C1;&#x6709;&#x7684;&#x4F5C;&#x7528;&#x57DF;----&#x53EA;&#x6709;&#x51FD;&#x6570;&#x6267;&#x884C;&#x624D;&#x4F1A;&#x4EA7;&#x751F;</strong></li></ul><p><strong>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x51FD;&#x6570;&#x6267;&#x884C;&#x4F1A;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x79C1;&#x6709;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5F53;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x90FD;&#x4F1A;&#x4E3B;&#x52A8;&#x7684;&#x8FDB;&#x884C;&#x91CA;&#x653E;&#x548C;&#x9500;&#x6BC1;&#x3002;&#x4F46;&#x5F53;&#x9047;&#x5230;&#x51FD;&#x6570;&#x6267;&#x884C;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x51FD;&#x6570;&#x7684;&#x5916;&#x9762;&#x88AB;&#x4E00;&#x4E2A;&#x5176;&#x4ED6;&#x7684;&#x4E1C;&#x897F;&#x7ED9;&#x63A5;&#x6536;&#x4E86;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x4E00;&#x822C;&#x5F62;&#x6210;&#x7684;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#x90FD;&#x4E0D;&#x4F1A;&#x9500;&#x6BC1;</strong>&#x3002;</p><p>&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
var num=100;
return function(){
  }
}
var f=fn();//fn&#x6267;&#x884C;&#x5F62;&#x6210;&#x7684;&#x8FD9;&#x4E2A;&#x79C1;&#x6709;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x9500;&#x6BC1;&#x4E86;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span></span>{
<span class="hljs-keyword">var</span> num=<span class="hljs-number">100</span>;
<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  }
}
<span class="hljs-keyword">var</span> f=fn();<span class="hljs-comment">//fn&#x6267;&#x884C;&#x5F62;&#x6210;&#x7684;&#x8FD9;&#x4E2A;&#x79C1;&#x6709;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x9500;&#x6BC1;&#x4E86;</span></code></pre><p>&#x4E5F;&#x5C31;&#x662F;&#x50CF;&#x4E0A;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;fn&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#x4F1A;&#x88AB;&#x4E00;&#x76F4;&#x5360;&#x7528;&#x7684;&#xFF0C;&#x53D1;&#x751F;&#x4E86;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x3002;<strong>&#x6240;&#x8C13;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x6307;&#x4EFB;&#x4F55;&#x5BF9;&#x8C61;&#x5728;&#x60A8;&#x4E0D;&#x518D;&#x62E5;&#x6709;&#x6216;&#x9700;&#x8981;&#x5B83;&#x4E4B;&#x540E;&#x4ECD;&#x7136;&#x5B58;&#x5728;&#x3002;&#x95ED;&#x5305;&#x4E0D;&#x80FD;&#x6EE5;&#x7528;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#xFF0C;&#x5F71;&#x54CD;&#x7F51;&#x9875;&#x7684;&#x6027;&#x80FD;&#x3002;&#x95ED;&#x5305;&#x4F7F;&#x7528;&#x5B8C;&#x4E86;&#x540E;&#xFF0C;&#x8981;&#x7ACB;&#x5373;&#x91CA;&#x653E;&#x8D44;&#x6E90;&#xFF0C;&#x5C06;&#x5F15;&#x7528;&#x53D8;&#x91CF;&#x6307;&#x5411;null</strong>&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x770B;&#x4E0B;&#x6709;&#x5173;&#x4E8E;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x7684;&#x4E00;&#x9053;&#x7ECF;&#x5178;&#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function&#xA0;outer(){
  var&#xA0;num=0;//&#x5185;&#x90E8;&#x53D8;&#x91CF;
  return&#xA0;function&#xA0;add(){//&#x901A;&#x8FC7;return&#x8FD4;&#x56DE;add&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;outer&#x51FD;&#x6570;&#x5916;&#x8BBF;&#x95EE;&#x4E86;
  num++;//&#x5185;&#x90E8;&#x51FD;&#x6570;&#x6709;&#x5F15;&#x7528;&#xFF0C;&#x4F5C;&#x4E3A;add&#x51FD;&#x6570;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x4E86;
  console.log(num);
  };
 }
  var&#xA0;func1=outer();
  func1();//&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x8C03;&#x7528;add&#x51FD;&#x6570;&#xFF0C;&#xA0;&#x8F93;&#x51FA;1
  func1();//&#x8F93;&#x51FA;2 &#x56E0;&#x4E3A;outer&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#x4F1A;&#x4E00;&#x76F4;&#x88AB;&#x5360;&#x7528;
  var&#xA0;func2=outer();
  func2();//&#xA0;&#x8F93;&#x51FA;1&#xA0;&#xA0;&#x6BCF;&#x6B21;&#x91CD;&#x65B0;&#x5F15;&#x7528;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x95ED;&#x5305;&#x662F;&#x5168;&#x65B0;&#x7684;&#x3002;
  func2();//&#xA0;&#x8F93;&#x51FA;2&#xA0;&#xA0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span>&#xA0;<span class="hljs-title">outer</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span>&#xA0;num=<span class="hljs-number">0</span>;<span class="hljs-comment">//&#x5185;&#x90E8;&#x53D8;&#x91CF;</span>
  <span class="hljs-keyword">return</span>&#xA0;<span class="hljs-function"><span class="hljs-keyword">function</span>&#xA0;<span class="hljs-title">add</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//&#x901A;&#x8FC7;return&#x8FD4;&#x56DE;add&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;outer&#x51FD;&#x6570;&#x5916;&#x8BBF;&#x95EE;&#x4E86;</span>
  num++;<span class="hljs-comment">//&#x5185;&#x90E8;&#x51FD;&#x6570;&#x6709;&#x5F15;&#x7528;&#xFF0C;&#x4F5C;&#x4E3A;add&#x51FD;&#x6570;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x4E86;</span>
  <span class="hljs-built_in">console</span>.log(num);
  };
 }
  <span class="hljs-keyword">var</span>&#xA0;func1=outer();
  func1();<span class="hljs-comment">//&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x8C03;&#x7528;add&#x51FD;&#x6570;&#xFF0C;&#xA0;&#x8F93;&#x51FA;1</span>
  func1();<span class="hljs-comment">//&#x8F93;&#x51FA;2 &#x56E0;&#x4E3A;outer&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#x4F1A;&#x4E00;&#x76F4;&#x88AB;&#x5360;&#x7528;</span>
  <span class="hljs-keyword">var</span>&#xA0;func2=outer();
  func2();<span class="hljs-comment">//&#xA0;&#x8F93;&#x51FA;1&#xA0;&#xA0;&#x6BCF;&#x6B21;&#x91CD;&#x65B0;&#x5F15;&#x7528;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x95ED;&#x5305;&#x662F;&#x5168;&#x65B0;&#x7684;&#x3002;</span>
  func2();<span class="hljs-comment">//&#xA0;&#x8F93;&#x51FA;2&#xA0;&#xA0;</span></code></pre><h2 id="articleHeader4">&#x4E94;&#x3001;&#x95ED;&#x5305;&#x7684;&#x4F5C;&#x7528;</h2><p>1.<strong>&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x53D8;&#x91CF;</strong>&#x3002;</p><p>2.<strong>&#x53EF;&#x4EE5;&#x4F7F;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x957F;&#x671F;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x6BD4;&#x8F83;&#x957F;</strong>&#x3002;&#x56E0;&#x6B64;&#x4E0D;&#x80FD;&#x6EE5;&#x7528;&#x95ED;&#x5305;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x9020;&#x6210;&#x7F51;&#x9875;&#x7684;&#x6027;&#x80FD;&#x95EE;&#x9898;</p><p>3.<strong>&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5B9E;&#x73B0;JS&#x6A21;&#x5757;</strong>&#x3002;</p><p><strong>JS&#x6A21;&#x5757;:&#x5177;&#x6709;&#x7279;&#x5B9A;&#x529F;&#x80FD;&#x7684;js&#x6587;&#x4EF6;,&#x5C06;&#x6240;&#x6709;&#x7684;&#x6570;&#x636E;&#x548C;&#x529F;&#x80FD;&#x90FD;&#x5C01;&#x88C5;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5185;&#x90E8;(&#x79C1;&#x6709;&#x7684;),&#x53EA;&#x5411;&#x5916;&#x66B4;&#x9732;&#x4E00;&#x4E2A;&#x5305;&#x4FE1;n&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#x6216;&#x51FD;&#x6570;,&#x6A21;&#x5757;&#x7684;&#x4F7F;&#x7528;&#x8005;,&#x53EA;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x6A21;&#x5757;&#x66B4;&#x9732;&#x7684;&#x5BF9;&#x8C61;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x5E94;&#x7684;&#x529F;&#x80FD;</strong>&#x3002;</p><p>&#x5177;&#x4F53;&#x8BF7;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html&#x6587;&#x4EF6;
&lt;script type=&quot;text/javascript&quot; src=&quot;myModule.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  myModule2.doSomething()
  myModule2.doOtherthing()
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>//index.html&#x6587;&#x4EF6;
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;myModule.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="undefined">
  myModule2.doSomething()
  myModule2.doOtherthing()
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//myModule.js&#x6587;&#x4EF6;
(function () {
  var msg = &apos;Beijing&apos;//&#x79C1;&#x6709;&#x6570;&#x636E;
  //&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;
  function doSomething() {
    console.log(&apos;doSomething() &apos;+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log(&apos;doOtherthing() &apos;+msg.toLowerCase())
  }
  //&#x5411;&#x5916;&#x66B4;&#x9732;&#x5BF9;&#x8C61;(&#x7ED9;&#x5916;&#x90E8;&#x4F7F;&#x7528;&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;)
  window.myModule2 = {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//myModule.js&#x6587;&#x4EF6;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> msg = <span class="hljs-string">&apos;Beijing&apos;</span><span class="hljs-comment">//&#x79C1;&#x6709;&#x6570;&#x636E;</span>
  <span class="hljs-comment">//&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;doSomething() &apos;</span>+msg.toUpperCase())
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doOtherthing</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;doOtherthing() &apos;</span>+msg.toLowerCase())
  }
  <span class="hljs-comment">//&#x5411;&#x5916;&#x66B4;&#x9732;&#x5BF9;&#x8C61;(&#x7ED9;&#x5916;&#x90E8;&#x4F7F;&#x7528;&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;)</span>
  <span class="hljs-built_in">window</span>.myModule2 = {
    <span class="hljs-attr">doSomething</span>: doSomething,
    <span class="hljs-attr">doOtherthing</span>: doOtherthing
  }
})()</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016657657?w=551&amp;h=127" src="https://static.alili.tech/img/remote/1460000016657657?w=551&amp;h=127" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader5">&#x516D;&#x3001;&#x95ED;&#x5305;&#x7684;&#x8FD0;&#x7528;</h2><p>&#x6211;&#x4EEC;&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x9700;&#x6C42;: &#x70B9;&#x51FB;&#x67D0;&#x4E2A;&#x6309;&#x94AE;, &#x63D0;&#x793A;&quot;&#x70B9;&#x51FB;&#x7684;&#x662F;&#x7B2C;n&#x4E2A;&#x6309;&#x94AE;&quot;,&#x4E8E;&#x662F;&#x6572;&#x51FA;&#x5982;&#x4E0B;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".....
&lt;button&gt;&#x6D4B;&#x8BD5;1&lt;/button&gt;
&lt;button&gt;&#x6D4B;&#x8BD5;2&lt;/button&gt;
&lt;button&gt;&#x6D4B;&#x8BD5;3&lt;/button&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  var btns = document.getElementsByTagName(&apos;button&apos;)
  //&#x904D;&#x5386;&#x52A0;&#x76D1;&#x542C;
   var btns = document.getElementsByTagName(&apos;button&apos;)
    for (var i = 0; i &lt; btns.length; i++) {
      btns[i].onclick = function () {
        console.log(&apos;&#x7B2C;&apos; + (i + 1) + &apos;&#x4E2A;&apos;)
      }
    }
&lt;/script&gt;  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>.....
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x6D4B;&#x8BD5;1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x6D4B;&#x8BD5;2<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x6D4B;&#x8BD5;3<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btns = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;button&apos;</span>)
  <span class="hljs-comment">//&#x904D;&#x5386;&#x52A0;&#x76D1;&#x542C;</span>
   <span class="hljs-keyword">var</span> btns = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;button&apos;</span>)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; btns.length; i++) {
      btns[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7B2C;&apos;</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">&apos;&#x4E2A;&apos;</span>)
      }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  </code></pre><p>&#x4E07;&#x4E07;&#x6CA1;&#x60F3;&#x5230;&#xFF0C;&#x70B9;&#x51FB;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x540E;&#x53F0;&#x90FD;&#x662F;&#x5F39;&#x51FA;&#x201C;&#x7B2C;&#x56DB;&#x4E2A;&#x201D;,&#x8FD9;&#x662F;&#x56E0;&#x4E3A;i&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;,&#x6267;&#x884C;&#x5230;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x65F6;&#xFF0C;&#x6B64;&#x65F6;i&#x7684;&#x503C;&#x4E3A;3&#x3002;&#x90A3;&#x8BE5;&#x5982;&#x4F55;&#x4FEE;&#x6539;&#xFF0C;&#x6700;&#x7B80;&#x5355;&#x7684;&#x662F;&#x7528;let&#x58F0;&#x660E;i</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" for (let i = 0; i &lt; btns.length; i++) {
      btns[i].onclick = function () {
        console.log(&apos;&#x7B2C;&apos; + (i + 1) + &apos;&#x4E2A;&apos;)
      }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; btns.length; i++) {
      btns[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7B2C;&apos;</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">&apos;&#x4E2A;&apos;</span>)
      }
    }</code></pre><p>&#x53E6;&#x5916;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4FEE;&#x6539;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   for (var i = 0; i &lt; btns.length; i++) {
      (function (j) {
        btns[j].onclick = function (i) {
          console.log(&apos;&#x7B2C;&apos; + (i + 1) + &apos;&#x4E2A;&apos;)
        }
      })(i)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>   for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; btns.length; i++) {</span>
      (<span class="hljs-name">function</span> (<span class="hljs-name">j</span>) {
        btns[j].onclick = function (<span class="hljs-name">i</span>) {
          console.log(&apos;&#x7B2C;&apos; + (<span class="hljs-name">i</span> + <span class="hljs-number">1</span>) + &apos;&#x4E2A;&apos;)
        }
      })(<span class="hljs-name">i</span>)
    }</code></pre><p><strong>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;GitHub&#x535A;&#x5BA2;</a>&#x70B9;&#x8D5E;&#x548C;&#x5173;&#x6CE8;&#xFF0C;&#x611F;&#x6FC0;&#x4E0D;&#x5C3D;&#xFF01;</strong></p><p>ps:&#x6587;&#x7AE0;&#x4E8E;2018.10.06&#x91CD;&#x65B0;&#x4FEE;&#x6539;,&#x5E0C;&#x671B;&#x5BF9;&#x4F60;&#x4EEC;&#x6709;&#x6240;&#x6536;&#x83B7;&#xFF01;</p><h2 id="articleHeader6">&#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><p><a href="https://wangdoc.com/javascript/types/function.html#%E9%97%AD%E5%8C%85" rel="nofollow noreferrer" target="_blank">Javascript&#x6559;&#x7A0B;</a></p><p><a href="https://book.douban.com/subject/26351021/" rel="nofollow noreferrer" target="_blank">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Javascript&#x4E0A;&#x5377;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出Javascript闭包

## 原文链接
[https://segmentfault.com/a/1190000016657653](https://segmentfault.com/a/1190000016657653)


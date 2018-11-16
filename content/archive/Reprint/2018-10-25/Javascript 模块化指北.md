---
title: Javascript 模块化指北
hidden: true
categories: [reprint]
slug: ab0d478c
date: 2018-10-25 09:08:15
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x968F;&#x7740; Web &#x6280;&#x672F;&#x7684;&#x84EC;&#x52C3;&#x53D1;&#x5C55;&#x548C;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x8BBE;&#x65BD;&#x65E5;&#x76CA;&#x5B8C;&#x5584;&#xFF0C;&#x524D;&#x7AEF;&#x9886;&#x57DF;&#x9010;&#x6E10;&#x4ECE;&#x6D4F;&#x89C8;&#x5668;&#x6269;&#x5C55;&#x81F3;&#x670D;&#x52A1;&#x7AEF;&#xFF08;Node.js&#xFF09;&#xFF0C;&#x684C;&#x9762;&#x7AEF;&#xFF08;PC&#x3001;Android&#x3001;iOS&#xFF09;&#xFF0C;&#x4E43;&#x81F3;&#x4E8E;&#x7269;&#x8054;&#x7F51;&#x8BBE;&#x5907;&#xFF08;IoT&#xFF09;&#xFF0C;&#x5176;&#x4E2D; JavaScript &#x627F;&#x8F7D;&#x7740;&#x8FD9;&#x4E9B;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x6838;&#x5FC3;&#x90E8;&#x5206;&#xFF0C;&#x968F;&#x7740;&#x5176;&#x89C4;&#x6A21;&#x5316;&#x548C;&#x590D;&#x6742;&#x5EA6;&#x7684;&#x6210;&#x500D;&#x589E;&#x957F;&#xFF0C;&#x5176;&#x8F6F;&#x4EF6;&#x5DE5;&#x7A0B;&#x4F53;&#x7CFB;&#x4E5F;&#x968F;&#x4E4B;&#x5EFA;&#x7ACB;&#x8D77;&#x6765;&#xFF08;&#x534F;&#x540C;&#x5F00;&#x53D1;&#x3001;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x3001;&#x9700;&#x6C42;&#x548C;&#x7F3A;&#x9677;&#x7BA1;&#x7406;&#x7B49;&#xFF09;&#xFF0C;&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7A0B;&#x7684;&#x9700;&#x6C42;&#x65E5;&#x76CA;&#x8FEB;&#x5207;&#x3002;</p><p>JavaScript &#x5BF9;&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7A0B;&#x7684;&#x652F;&#x6301;&#x5C1A;&#x672A;&#x5F62;&#x6210;&#x89C4;&#x8303;&#xFF0C;&#x96BE;&#x4EE5;&#x582A;&#x6B64;&#x91CD;&#x4EFB;&#xFF1B;&#x4E00;&#x65F6;&#x95F4;&#xFF0C;&#x6C5F;&#x6E56;&#x4FA0;&#x58EB;&#x633A;&#x8EAB;&#x800C;&#x51FA;&#xFF0C;&#x4E00;&#x8DEF;&#x62AB;&#x8346;&#x65A9;&#x68D8;&#xFF0C;&#x4ECE;&#x5200;&#x8015;&#x706B;&#x79CD;&#x8FC7;&#x6E21;&#x5230;&#x9762;&#x5411;&#x672A;&#x6765;&#x7684;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;&#xFF1B;</p><p>&lt;!-- more --&gt;</p><h2 id="articleHeader1">&#x6982;&#x5FF5;</h2><p>&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7A0B;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x7EC4;&#x5408;&#x4E00;&#x4E9B;__&#x76F8;&#x5BF9;&#x72EC;&#x7ACB;&#x53EF;&#x590D;&#x7528;&#x7684;&#x6A21;&#x5757;__&#x6765;&#x8FDB;&#x884C;&#x529F;&#x80FD;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x5176;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x4E24;&#x90E8;&#x5206;&#x662F;__&#x5B9A;&#x4E49;&#x6A21;&#x5757;__&#x548C;__&#x5F15;&#x5165;&#x6A21;&#x5757;__&#xFF1B;</p><ul><li>&#x5B9A;&#x4E49;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x5185;&#x90E8;&#x7684;&#x6267;&#x884C;&#x903B;&#x8F91;&#x662F;&#x4E0D;&#x88AB;&#x5916;&#x90E8;&#x611F;&#x77E5;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x5BFC;&#x51FA;&#xFF08;&#x66B4;&#x9732;&#xFF09;&#x51FA;&#x90E8;&#x5206;&#x65B9;&#x6CD5;&#x548C;&#x6570;&#x636E;&#xFF1B;</li><li>&#x5F15;&#x5165;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x540C;&#x6B65; / &#x5F02;&#x6B65;&#x53BB;&#x52A0;&#x8F7D;&#x5F85;&#x5F15;&#x5165;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6267;&#x884C;&#x5E76;&#x83B7;&#x53D6;&#x5230;&#x5176;&#x66B4;&#x9732;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x6570;&#x636E;&#xFF1B;</li></ul><h2 id="articleHeader2">&#x5200;&#x8015;&#x706B;&#x79CD;</h2><p>&#x5C3D;&#x7BA1; JavaScript &#x8BED;&#x8A00;&#x5C42;&#x9762;&#x5E76;&#x672A;&#x63D0;&#x4F9B;&#x6A21;&#x5757;&#x5316;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x4F46;&#x5229;&#x7528;&#x5176;&#x53EF;__&#x9762;&#x5411;&#x5BF9;&#x8C61;__&#x7684;&#x8BED;&#x8A00;&#x7279;&#x6027;&#xFF0C;&#x5916;&#x52A0;__&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;__&#x52A0;&#x6301;&#xFF0C;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x6A21;&#x5757;&#x5316;&#x7684;&#x67B6;&#x6784;&#xFF1B;&#x7ECF;&#x5178;&#x7684;&#x4E00;&#x4E2A;&#x6848;&#x4F8B;&#x662F;&#x5229;&#x7528;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x6A21;&#x5F0F;&#x53BB;&#x5B9E;&#x73B0;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x8F83;&#x597D;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x53EA;&#x66B4;&#x9732;&#x90E8;&#x5206;&#x4FE1;&#x606F;&#x7ED9;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x7684;&#x5730;&#x65B9;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Define a module
var moduleA = (function ($, doc) {
  var methodA = function() {};
  var dataA = {};
  return {
    methodA: methodA,
    dataA: dataA
 &#xA0;};
})(jQuery, document);

// Use a module
var result = moduleA.mehodA();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Define a module</span>
<span class="hljs-keyword">var</span> moduleA = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$, doc</span>) </span>{
  <span class="hljs-keyword">var</span> methodA = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
  <span class="hljs-keyword">var</span> dataA = {};
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">methodA</span>: methodA,
    <span class="hljs-attr">dataA</span>: dataA
 &#xA0;};
})(jQuery, <span class="hljs-built_in">document</span>);

<span class="hljs-comment">// Use a module</span>
<span class="hljs-keyword">var</span> result = moduleA.mehodA();</code></pre><p>&#x76F4;&#x89C2;&#x6765;&#x770B;&#xFF0C;&#x901A;&#x8FC7;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF08;IIFE&#xFF09;&#x6765;&#x58F0;&#x660E;&#x4F9D;&#x8D56;&#x4EE5;&#x53CA;&#x5BFC;&#x51FA;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x4E0E;&#x5F53;&#x4E0B;&#x7684;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;&#x5E76;&#x65E0;&#x5DE8;&#x5927;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x53EF;&#x672C;&#x8D28;&#x4E0A;&#x5374;&#x6709;&#x5343;&#x5DEE;&#x4E07;&#x522B;&#xFF0C;&#x65E0;&#x6CD5;&#x6EE1;&#x8DB3;&#x7684;&#x4E00;&#x4E9B;&#x91CD;&#x8981;&#x7684;&#x7279;&#x6027;&#xFF1B;</p><ul><li>&#x5B9A;&#x4E49;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x58F0;&#x660E;&#x7684;&#x4F9D;&#x8D56;&#x4E0D;&#x662F;&#x5F3A;&#x5236;&#x81EA;&#x52A8;&#x5F15;&#x5165;&#x7684;&#xFF0C;&#x5373;&#x5728;&#x5B9A;&#x4E49;&#x8BE5;&#x6A21;&#x5757;&#x4E4B;&#x524D;&#xFF0C;&#x5FC5;&#x987B;&#x624B;&#x52A8;&#x5F15;&#x5165;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#x4EE3;&#x7801;&#xFF1B;</li><li>&#x5B9A;&#x4E49;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x5176;&#x4EE3;&#x7801;&#x5C31;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#xFF0C;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF1B;</li><li>&#x8DE8;&#x6587;&#x4EF6;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x6A21;&#x5757;&#x6302;&#x8F7D;&#x5230;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF08;window&#xFF09;&#x4E0A;&#xFF1B;</li></ul><h2 id="articleHeader3">AMD &amp; CMD &#x4E8C;&#x5206;&#x5929;&#x4E0B;</h2><blockquote>&#x9898;&#x5916;&#x8BDD;&#xFF1A;&#x7531;&#x4E8E;&#x5E74;&#x4EE3;&#x4E45;&#x8FDC;&#xFF0C;&#x8FD9;&#x4E24;&#x79CD;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;&#x9010;&#x6E10;&#x6DE1;&#x51FA;&#x5386;&#x53F2;&#x821E;&#x53F0;&#xFF0C;&#x5177;&#x4F53;&#x7279;&#x6027;&#x4E0D;&#x518D;&#x7EC6;&#x804A;&#xFF1B;</blockquote><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x201D;&#x5200;&#x8015;&#x706B;&#x79CD;&#x201D;&#x65F6;&#x4EE3;&#x5B58;&#x7559;&#x7684;&#x9700;&#x6C42;&#xFF0C;AMD &#x548C; CMD &#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;&#x95EE;&#x4E16;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7A0B;&#x7684;&#x9700;&#x6C42;&#xFF0C;__&#x5176;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x539F;&#x7406;&#x662F;&#x901A;&#x8FC7;&#x52A8;&#x6001;&#x52A0;&#x8F7D; script &#x548C;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#xFF1B;__</p><p>AMD &#x548C; CMD &#x6700;&#x5177;&#x4EE3;&#x8868;&#x7684;&#x4E24;&#x4E2A;&#x4F5C;&#x54C1;&#x5206;&#x522B;&#x5BF9;&#x5E94; require.js &#x548C; sea.js&#xFF1B;&#x5176;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x4F9D;&#x8D56;&#x58F0;&#x660E;&#x548C;&#x4F9D;&#x8D56;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x673A;&#xFF0C;&#x5176;&#x4E2D; require.js &#x9ED8;&#x8BA4;&#x5728;&#x58F0;&#x660E;&#x65F6;&#x6267;&#x884C;&#xFF0C; sea.js &#x63A8;&#x5D07;&#x61D2;&#x52A0;&#x8F7D;&#x548C;&#x6309;&#x9700;&#x4F7F;&#x7528;&#xFF1B;&#x53E6;&#x5916;&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F;&#xFF0C;CMD &#x89C4;&#x8303;&#x7684;&#x5199;&#x6CD5;&#x548C; CommonJS &#x6781;&#x4E3A;&#x76F8;&#x8FD1;&#xFF0C;&#x53EA;&#x9700;&#x7A0D;&#x4F5C;&#x4FEE;&#x6539;&#xFF0C;&#x5C31;&#x80FD;&#x5728; CommonJS &#x4E2D;&#x4F7F;&#x7528;&#x3002;&#x53C2;&#x8003;&#x4E0B;&#x9762;&#x7684; Case &#x66F4;&#x6709;&#x52A9;&#x4E8E;&#x7406;&#x89E3;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// AMD
define([&apos;./a&apos;,&apos;./b&apos;], function (moduleA, moduleB) {
 &#xA0;// &#x4F9D;&#x8D56;&#x524D;&#x7F6E;
  moduleA.mehodA();
  console.log(moduleB.dataB);
  // &#x5BFC;&#x51FA;&#x6570;&#x636E;
  return {};
});
 
// CMD
define(function (requie, exports, module) {
 &#xA0;// &#x4F9D;&#x8D56;&#x5C31;&#x8FD1;
 &#xA0;var moduleA = require(&apos;./a&apos;);
&#xA0; moduleA.mehodA();     

  // &#x6309;&#x9700;&#x52A0;&#x8F7D;
 &#xA0;if (needModuleB) {
 &#xA0; &#xA0;var moduleB = requie(&apos;./b&apos;);
 &#xA0; &#xA0;moduleB.methodB();
 &#xA0;}
  // &#x5BFC;&#x51FA;&#x6570;&#x636E;
  exports = {};
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// AMD</span>
define([<span class="hljs-string">&apos;./a&apos;</span>,<span class="hljs-string">&apos;./b&apos;</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">moduleA, moduleB</span>) </span>{
 &#xA0;<span class="hljs-comment">// &#x4F9D;&#x8D56;&#x524D;&#x7F6E;</span>
  moduleA.mehodA();
  <span class="hljs-built_in">console</span>.log(moduleB.dataB);
  <span class="hljs-comment">// &#x5BFC;&#x51FA;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">return</span> {};
});
 
<span class="hljs-comment">// CMD</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">requie, exports, module</span>) </span>{
 &#xA0;<span class="hljs-comment">// &#x4F9D;&#x8D56;&#x5C31;&#x8FD1;</span>
 &#xA0;<span class="hljs-keyword">var</span> moduleA = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./a&apos;</span>);
&#xA0; moduleA.mehodA();     

  <span class="hljs-comment">// &#x6309;&#x9700;&#x52A0;&#x8F7D;</span>
 &#xA0;<span class="hljs-keyword">if</span> (needModuleB) {
 &#xA0; &#xA0;<span class="hljs-keyword">var</span> moduleB = requie(<span class="hljs-string">&apos;./b&apos;</span>);
 &#xA0; &#xA0;moduleB.methodB();
 &#xA0;}
  <span class="hljs-comment">// &#x5BFC;&#x51FA;&#x6570;&#x636E;</span>
  exports = {};
});</code></pre><h2 id="articleHeader4">CommonJS</h2><p>2009 &#x5E74; ty &#x53D1;&#x5E03; Node.js &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#xFF0C;CommonJS &#x4F5C;&#x4E3A;&#x5176;&#x4E2D;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x7279;&#x6027;&#x4E4B;&#x4E00;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;&#x4E0B;&#x7684;&#x573A;&#x666F;&#xFF1B;&#x5386;&#x5E74;&#x6765;&#x7684;&#x8003;&#x5BDF;&#x548C;&#x65F6;&#x95F4;&#x7684;&#x6D17;&#x793C;&#xFF0C;&#x4EE5;&#x53CA;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5316;&#x5BF9;&#x5176;&#x7684;&#x5145;&#x5206;&#x652F;&#x6301;&#xFF0C;CommonJS &#x88AB;&#x5E7F;&#x6CDB;&#x8FD0;&#x7528;&#x4E8E; Node.js &#x548C;&#x6D4F;&#x89C8;&#x5668;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Core Module
const cp = require(&apos;child_process&apos;);
// Npm Module
const axios = require(&apos;axios&apos;);
// Custom Module
const foo = require(&apos;./foo&apos;);

module.exports = { axios };
exports.foo = foo;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Core Module</span>
<span class="hljs-keyword">const</span> cp = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;child_process&apos;</span>);
<span class="hljs-comment">// Npm Module</span>
<span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;axios&apos;</span>);
<span class="hljs-comment">// Custom Module</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./foo&apos;</span>);

<span class="hljs-built_in">module</span>.exports = { axios };
exports.foo = foo;</code></pre><h3 id="articleHeader5">&#x89C4;&#x8303;</h3><ul><li>module (Object): &#x6A21;&#x5757;&#x672C;&#x8EAB;</li><li>exports (*): &#x6A21;&#x5757;&#x7684;&#x5BFC;&#x51FA;&#x90E8;&#x5206;&#xFF0C;&#x5373;&#x66B4;&#x9732;&#x51FA;&#x6765;&#x7684;&#x5185;&#x5BB9;</li><li>require (Function): &#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x83B7;&#x5F97;&#x76EE;&#x6807;&#x6A21;&#x5757;&#x7684;&#x5BFC;&#x51FA;&#x503C;&#xFF08;&#x57FA;&#x7840;&#x7C7B;&#x578B;&#x4E3A;&#x590D;&#x5236;&#xFF0C;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x4E3A;&#x6D45;&#x62F7;&#x8D1D;&#xFF09;&#xFF0C;&#x53EF;&#x4EE5;&#x52A0;&#x8F7D;&#x5185;&#x7F6E;&#x6A21;&#x5757;&#x3001;npm &#x6A21;&#x5757;&#x548C;&#x81EA;&#x5B9A;&#x4E49;&#x6A21;&#x5757;</li></ul><h3 id="articleHeader6">&#x5B9E;&#x73B0;</h3><p>1&#x3001;&#x6A21;&#x5757;&#x5B9A;&#x4E49;</p><p>&#x9ED8;&#x8BA4;&#x4EFB;&#x610F; .node .js .json &#x6587;&#x4EF6;&#x90FD;&#x662F;&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684;&#x6A21;&#x5757;&#xFF1B;</p><p>2&#x3001;&#x5F15;&#x5165;&#x6A21;&#x5757;</p><p>&#x9996;&#x5148;&#x4ECE;&#x7F13;&#x5B58;&#xFF08;require.cache&#xFF09;&#x4F18;&#x5148;&#x8BFB;&#x53D6;&#x6A21;&#x5757;&#xFF0C;&#x5982;&#x679C;&#x672A;&#x547D;&#x4E2D;&#x7F13;&#x5B58;&#xFF0C;&#x5219;&#x8FDB;&#x884C;&#x8DEF;&#x5F84;&#x5206;&#x6790;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x7167;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x6A21;&#x5757;&#x5904;&#x7406;&#xFF1A;</p><ul><li>&#x5185;&#x7F6E;&#x6A21;&#x5757;&#xFF0C;&#x76F4;&#x63A5;&#x4ECE;&#x5185;&#x5B58;&#x52A0;&#x8F7D;&#xFF1B;</li><li>&#x5916;&#x90E8;&#x6A21;&#x5757;&#xFF0C;&#x9996;&#x5148;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x5BFB;&#x5740;&#x5B9A;&#x4F4D;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x7F16;&#x8BD1;&#x548C;&#x6267;&#x884C;&#xFF0C;&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x5BFC;&#x51FA;&#x503C;&#xFF1B;</li></ul><p>&#x5176;&#x4E2D;&#x5728;&#x7F16;&#x8BD1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;Node&#x5BF9;&#x83B7;&#x53D6;&#x7684;JavaScript&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x4E86;&#x5934;&#x5C3E;&#x5305;&#x88C5;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (exports, require, module, __filename, __dirname) {
    var circle = require(&apos;./circle.js&apos;);
    console.log(&apos;The area of a circle of radius 4 is &apos; + circle.area(4));
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports, require, module, __filename, __dirname</span>) </span>{
    <span class="hljs-keyword">var</span> circle = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./circle.js&apos;</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;The area of a circle of radius 4 is &apos;</span> + circle.area(<span class="hljs-number">4</span>));
});</code></pre><h3 id="articleHeader7">&#x7279;&#x6027;&#x603B;&#x7ED3;</h3><ul><li>&#x540C;&#x6B65;&#x6267;&#x884C;&#x6A21;&#x5757;&#x58F0;&#x660E;&#x548C;&#x5F15;&#x5165;&#x903B;&#x8F91;&#xFF0C;&#x5206;&#x6790;&#x4E00;&#x4E9B;&#x590D;&#x6742;&#x7684;&#x4F9D;&#x8D56;&#x5F15;&#x7528;&#xFF08;&#x5982;&#x5FAA;&#x73AF;&#x4F9D;&#x8D56;&#xFF09;&#x65F6;&#x9700;&#x6CE8;&#x610F;&#xFF1B;</li><li>&#x7F13;&#x5B58;&#x673A;&#x5236;&#xFF0C;&#x6027;&#x80FD;&#x66F4;&#x4F18;&#xFF0C;&#x540C;&#x65F6;&#x9650;&#x5236;&#x4E86;&#x5185;&#x5B58;&#x5360;&#x7528;&#xFF1B;</li><li>Module &#x6A21;&#x5757;&#x53EF;&#x4F9B;&#x6539;&#x9020;&#x7684;&#x7075;&#x6D3B;&#x5EA6;&#x9AD8;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x5B9A;&#x5236;&#x9700;&#x6C42;&#xFF08;&#x5982;&#x70ED;&#x66F4;&#x65B0;&#x3001;&#x4EFB;&#x610F;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x6A21;&#x5757;&#x652F;&#x6301;&#xFF09;&#xFF1B;</li></ul><h2 id="articleHeader8">ES Module&#xFF08;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#xFF09;</h2><p>ES Module &#x662F;&#x8BED;&#x8A00;&#x5C42;&#x9762;&#x7684;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;&#xFF0C;&#x7531; ES 2015 &#x63D0;&#x51FA;&#xFF0C;&#x5176;&#x89C4;&#x8303;&#x4E0E; CommonJS &#x6BD4;&#x4E4B; &#xFF0C;&#x5BFC;&#x51FA;&#x7684;&#x503C;&lt;span data-type=&quot;color&quot; style=&quot;color:rgb(26, 26, 26)&quot;&gt;&lt;span data-type=&quot;background&quot; style=&quot;background-color:rgb(255, 255, 255)&quot;&gt;&#x90FD;&#x53EF;&#x4EE5;&#x770B;&#x6210;&#x662F;&#x4E00;&#x4E2A;&#x5177;&#x5907;&#x591A;&#x4E2A;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&lt;/span&gt;&lt;/span&gt;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E92;&#x76F8;&#x517C;&#x5BB9;&#xFF1B;&#x4F46;&#x5199;&#x6CD5;&#x4E0A; ES Module &#x66F4;&#x7B80;&#x6D01;&#xFF0C;&#x4E0E; Python &#x63A5;&#x8FD1;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fs from &apos;fs&apos;;
import color from &apos;color&apos;;
import service, { getArticles&#xA0;} from &apos;../service&apos;; 

export default service;
export const getArticles = getArticles;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;fs&apos;</span>;
<span class="hljs-keyword">import</span> color <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;color&apos;</span>;
<span class="hljs-keyword">import</span> service, { getArticles&#xA0;} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../service&apos;</span>; 

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> service;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getArticles = getArticles;</code></pre><p>&#x4E3B;&#x8981;&#x5DEE;&#x5F02;&#x5728;&#x4E8E;&#xFF1A;</p><ul><li>ES Module &#x4F1A;&#x5BF9;&lt;span data-type=&quot;color&quot; style=&quot;color:rgb(26, 26, 26)&quot;&gt;&lt;span data-type=&quot;background&quot; style=&quot;background-color:rgb(255, 255, 255)&quot;&gt;&#x9759;&#x6001;&#x4EE3;&#x7801;&#x5206;&#x6790;&#xFF0C;&#x5373;&#x5728;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x65F6;&#x8FDB;&#x884C;&#x6A21;&#x5757;&#x7684;&#x52A0;&#x8F7D;&#xFF0C;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x4E4B;&#x524D;&#x5C31;&#x5DF2;&#x7ECF;&#x786E;&#x5B9A;&#x4E86;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#xFF08;&#x53EF;&#x89E3;&#x51B3;&#x5FAA;&#x73AF;&#x5F15;&#x7528;&#x7684;&#x95EE;&#x9898;&#xFF09;&#xFF1B;&lt;/span&gt;&lt;/span&gt;</li><li>ES Module &#x5173;&#x952E;&#x5B57;&#xFF1A;<code>import</code> <code>export</code> &#x4EE5;&#x53CA;&#x72EC;&#x6709;&#x7684; <code>default</code> &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x786E;&#x5B9A;&#x9ED8;&#x8BA4;&#x7684;&#x5BFC;&#x51FA;&#x503C;&#xFF1B;</li><li>&lt;span data-type=&quot;color&quot; style=&quot;color:rgb(26, 26, 26)&quot;&gt;&lt;span data-type=&quot;background&quot; style=&quot;background-color:rgb(255, 255, 255)&quot;&gt;ES Module &#x4E2D;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x65B9;&#x6CD5;&#x662F;&#x5F3A;&#x7ED1;&#x5B9A;&#x7684;&#xFF0C;&#x5305;&#x62EC;&#x57FA;&#x7840;&#x7C7B;&#x578B;&#xFF1B;&lt;/span&gt;&lt;/span&gt;</li></ul><h2 id="articleHeader9">UMD</h2><p>&#x901A;&#x8FC7;&#x4E00;&#x5C42;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x6765;&#x517C;&#x5BB9;&#x5404;&#x79CD;&#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x517C;&#x5BB9; AMD / CMD / CommonJS &#x7B49;&#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;&#xFF0C;&#x8D34;&#x4E0A;&#x4EE3;&#x7801;&#x80DC;&#x8FC7;&#x5343;&#x8A00;&#x4E07;&#x8BED;&#xFF0C;&#x9700;&#x8981;&#x7279;&#x522B;&#x6CE8;&#x610F;&#x7684;&#x662F; ES Module &#x7531;&#x4E8E;&#x4F1A;&#x5BF9;&#x9759;&#x6001;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5206;&#x6790;&#xFF0C;&#x6545;&#x8FD9;&#x79CD;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x65B9;&#x6848;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#xFF0C;&#x6B64;&#x65F6;&#x901A;&#x8FC7; CommonJS &#x8FDB;&#x884C;&#x517C;&#x5BB9;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (global, factory) {
 &#xA0;if (typeof exports === &apos;object&apos;) {   
 &#xA0; &#xA0;module.exports = factory();
  } else if (typeof define === &apos;function&apos; &amp;&amp; define.amd) {
 &#xA0; &#xA0;define(factory);
 &#xA0;} else {
 &#xA0; &#xA0;this.eventUtil = factory();
 &#xA0;}
})(this, function (exports) {
 &#x200B; // Define Module
 &#xA0;Object.defineProperty(exports, &quot;__esModule&quot;, {
    value: true
  });
  exports.default = 42;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">global, factory</span>) </span>{
 &#xA0;<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">&apos;object&apos;</span>) {   
 &#xA0; &#xA0;<span class="hljs-built_in">module</span>.exports = factory();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; define.amd) {
 &#xA0; &#xA0;define(factory);
 &#xA0;} <span class="hljs-keyword">else</span> {
 &#xA0; &#xA0;<span class="hljs-keyword">this</span>.eventUtil = factory();
 &#xA0;}
})(<span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports</span>) </span>{
 &#x200B; <span class="hljs-comment">// Define Module</span>
 &#xA0;<span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
  });
  exports.default = <span class="hljs-number">42</span>;
});</code></pre><h2 id="articleHeader10">&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x4E2D;&#x7684;&#x5B9E;&#x73B0;</h2><p>&#x4E3A;&#x4E86;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E2D;&#x8FD0;&#x884C;&#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x9700;&#x8981;&#x501F;&#x52A9;&#x4E00;&#x4E9B;&#x6A21;&#x5757;&#x5316;&#x6253;&#x5305;&#x7684;&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x6253;&#x5305;&#xFF08; &#x4EE5; webpack &#x4E3A;&#x4F8B;&#xFF09;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x9879;&#x76EE;&#x5165;&#x53E3;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x5148;&#x5FEB;&#x901F;&#x5730;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#x8F6C;&#x6362;&#x6210;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x7684;&#x5BF9;&#x5E94;&#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;&#x7684;&#x5B9E;&#x73B0;&#xFF1B;</p><h3 id="articleHeader11">&#x6A21;&#x5757;&#x5316;&#x7684;&#x57FA;&#x7840;</h3><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4ECB;&#x7ECD;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5BF9;&#x5176;&#x89C4;&#x8303;&#x548C;&#x5B9E;&#x73B0;&#x6709;&#x4E86;&#x4E00;&#x5B9A;&#x7684;&#x4E86;&#x89E3;&#xFF1B;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x8981;&#x5B9E;&#x73B0; CommonJS &#x89C4;&#x8303;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5B9E;&#x73B0; module / exports / require / global &#x8FD9;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x7531;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x662F;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x7684;&#xFF0C;&#x56E0;&#x6B64; require &#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x5B9A;&#x4F4D;&#x9700;&#x8981;&#x6539;&#x9020;&#x4E3A;&#x52A0;&#x8F7D;&#x5BF9;&#x5E94;&#x7684; JS &#x7247;&#x6BB5;&#xFF08;webpack &#x91C7;&#x7528;&#x7684;&#x65B9;&#x5F0F;&#x4E3A;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x5B9E;&#x73B0;&#x4F9D;&#x8D56;&#x7684;&#x5F15;&#x5165;&#xFF09;&#x3002;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A;<a href="https://github.com/ruanyf/tiny-browser-require" rel="nofollow noreferrer" target="_blank">tiny-browser-require</a>&#x3002;</p><p>webpack &#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x5FEB;&#x7167;&#x5982;&#x4E0B;&#xFF0C;&#x6CE8;&#x610F;&#x770B;&#x6CE8;&#x91CA;&#x4E2D;&#x7684;&#x65F6;&#x5E8F;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {
 &#xA0;// The module cache
 &#xA0;var installedModules = {};
 &#xA0;// The require function
 &#xA0;function __webpack_require__(moduleId) {}
  return __webpack_require__(0); // ---&gt; 0
})
({
 &#xA0;0: function (module, exports, __webpack_require__) {
 &#xA0; &#xA0;// Define module A
 &#xA0; &#xA0;var moduleB = __webpack_require__(1); // ---&gt; 1
 &#xA0;},
 &#xA0;1: function (module, exports, __webpack_require__) {
 &#xA0; &#xA0;// Define module B
 &#xA0; &#xA0;exports = {}; // ---&gt; 2
 &#xA0;}
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{
 &#xA0;<span class="hljs-comment">// The module cache</span>
 &#xA0;<span class="hljs-keyword">var</span> installedModules = {};
 &#xA0;<span class="hljs-comment">// The require function</span>
 &#xA0;<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{}
  <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>); <span class="hljs-comment">// ---&gt; 0</span>
})
({
 &#xA0;<span class="hljs-number">0</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
 &#xA0; &#xA0;<span class="hljs-comment">// Define module A</span>
 &#xA0; &#xA0;<span class="hljs-keyword">var</span> moduleB = __webpack_require__(<span class="hljs-number">1</span>); <span class="hljs-comment">// ---&gt; 1</span>
 &#xA0;},
 &#xA0;<span class="hljs-number">1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
 &#xA0; &#xA0;<span class="hljs-comment">// Define module B</span>
 &#xA0; &#xA0;exports = {}; <span class="hljs-comment">// ---&gt; 2</span>
 &#xA0;}
});</code></pre><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;ES Module &#x7684;&#x5904;&#x7406;&#x540C; CommonJS &#x76F8;&#x5DEE;&#x65E0;&#x51E0;&#xFF0C;&#x53EA;&#x662F;&#x5728;&#x5B9A;&#x4E49;&#x6A21;&#x5757;&#x548C;&#x5F15;&#x5165;&#x6A21;&#x5757;&#x65F6;&#x4F1A;&#x53BB;&#x5904;&#x7406; __esModule &#x6807;&#x8BC6;&#xFF0C;&#x4ECE;&#x800C;&#x517C;&#x5BB9;&#x5176;&#x5728;&#x8BED;&#x6CD5;&#x4E0A;&#x7684;&#x5DEE;&#x5F02;&#x3002;</p><h3 id="articleHeader12">&#x5F02;&#x6B65;&#x548C;&#x6269;&#x5C55;</h3><p>1&#x3001;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x7F51;&#x7EDC;&#x8D44;&#x6E90;&#x53D7;&#x5230;&#x8F83;&#x5927;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x56E0;&#x6B64;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x6587;&#x4EF6;&#x5982;&#x679C;&#x4F53;&#x79EF;&#x5DE8;&#x5927;&#xFF0C;&#x5BF9;&#x9875;&#x9762;&#x6027;&#x80FD;&#x7684;&#x635F;&#x8017;&#x6781;&#x5927;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x5BF9;&#x6784;&#x5EFA;&#x7684;&#x76EE;&#x6807;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x62C6;&#x5206;&#xFF0C;&#x540C;&#x65F6;&#x6A21;&#x5757;&#x4E5F;&#x9700;&#x8981;&#x652F;&#x6301;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#xFF1B;</p><p>webpack &#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5; require.ensure() &#x548C; import() &#xFF08;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#xFF09;&#x8FDB;&#x884C;&#x6A21;&#x5757;&#x7684;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#xFF0C;&#x81F3;&#x4E8E;&#x5176;&#x4E2D;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x8DDF;&#x4E0A;&#x9762;&#x63D0;&#x53CA;&#x7684; AMD &amp; CMD &#x6240;&#x89C1;&#x7565;&#x540C;&#xFF0C;import() &#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;&#x6240;&#x505A;&#x7684;&#x5DE5;&#x4F5C;&#x65E0;&#x975E;&#x4E5F;&#x662F;&#x52A8;&#x6001;&#x65B0;&#x589E; script &#x6807;&#x7B7E;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7; onload / onerror &#x4E8B;&#x4EF6;&#x8FDB;&#x4E00;&#x6B65;&#x5904;&#x7406;&#x3002;</p><p>2&#x3001;&#x7531;&#x4E8E; require &#x51FD;&#x6570;&#x662F;&#x5B8C;&#x5168;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x6A21;&#x5757;&#x5316;&#x4E2D;&#x5B9E;&#x73B0;&#x66F4;&#x591A;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#x901A;&#x8FC7;&#x4FEE;&#x6539; require.resolve &#x6216; Module._extensions &#x6269;&#x5C55;&#x652F;&#x6301;&#x7684;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#xFF0C;&#x4F7F;&#x5F97; css / .jsx / .vue / &#x56FE;&#x7247;&#x7B49;&#x6587;&#x4EF6;&#x4E5F;&#x80FD;&#x4E3A;&#x6A21;&#x5757;&#x5316;&#x6240;&#x4F7F;&#x7528;&#xFF1B;</p><h2 id="articleHeader13">&#x9644;&#x5F55;1&#xFF1A;&#x7279;&#x6027;&#x4E00;&#x89C8;&#x8868;</h2><table><thead><tr><th>&#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;</th><th>&#x52A0;&#x8F7D;&#x65B9;&#x5F0F;</th><th>&#x52A0;&#x8F7D;&#x65F6;&#x673A;</th><th>&#x8FD0;&#x884C;&#x73AF;&#x5883;</th><th>&#x5907;&#x6CE8;</th></tr></thead><tbody><tr><td>AMD</td><td>&#x5F02;&#x6B65;</td><td>&#x8FD0;&#x884C;&#x65F6;</td><td>&#x6D4F;&#x89C8;&#x5668;</td><td></td></tr><tr><td>CMD</td><td>&#x5F02;&#x6B65;</td><td>&#x8FD0;&#x884C;&#x65F6;</td><td>&#x6D4F;&#x89C8;&#x5668;</td><td></td></tr><tr><td>CommonJS</td><td>&#x540C;&#x6B65;/&#x5F02;&#x6B65;</td><td>&#x8FD0;&#x884C;&#x65F6;</td><td>&#x6D4F;&#x89C8;&#x5668; / Node</td><td></td></tr><tr><td>ES Module</td><td>&#x540C;&#x6B65;/&#x5F02;&#x6B65;</td><td>&#x7F16;&#x8BD1;&#x9636;&#x6BB5;</td><td>&#x6D4F;&#x89C8;&#x5668; / Node</td><td>&#x901A;&#x8FC7; import() &#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;</td></tr></tbody></table><h2 id="articleHeader14">&#x9644;&#x5F55;2&#xFF1A;&#x53C2;&#x8003;</h2><ul><li>AMD &#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;: <a href="https://github.com/amdjs/amdjs-api/wiki/AMD" rel="nofollow noreferrer" target="_blank">https://github.com/amdjs/amdjs-api/wiki/AMD</a></li><li>CMD &#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x89C4;&#x8303;&#xFF1A;<a href="https://github.com/seajs/seajs/issues/242" rel="nofollow noreferrer" target="_blank">https://github.com/seajs/seajs/issues/242</a></li><li>webpack &#x6A21;&#x5757;&#x76F8;&#x5173;&#x6587;&#x6863;: <a href="https://webpack.js.org/concepts/modules/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/concepts/modules/</a></li><li>&#x6D4F;&#x89C8;&#x5668;&#x52A0;&#x8F7D; CommonJS &#x6A21;&#x5757;&#x7684;&#x539F;&#x7406;&#x4E0E;&#x5B9E;&#x73B0;&#xFF1A;<a href="http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript 模块化指北

## 原文链接
[https://segmentfault.com/a/1190000016276287](https://segmentfault.com/a/1190000016276287)


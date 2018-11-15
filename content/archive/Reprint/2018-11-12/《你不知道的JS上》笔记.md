---
title: 《你不知道的JS上》笔记
reprint: true
categories: reprint
abbrlink: 10c9f0c7
date: 2018-11-12 02:30:05
---

{{% raw %}}
<h2 id="articleHeader0">JS&#x662F;&#x7F16;&#x8BD1;&#x578B;&#x8BED;&#x8A00;</h2><p>&#x7F16;&#x8BD1;&#x53D1;&#x751F;&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x524D;&#x51E0;&#x5FAE;&#x79D2;,&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x5C31;&#x662F;js&#x5728;&#x6267;&#x884C;&#x524D;&#x8981;&#x8FDB;&#x884C;&#x7F16;&#x8BD1;&#xFF0C;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x53D1;&#x751F;&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x524D;&#x51E0;&#x5FAE;&#x5999;&#xFF0C;&#x751A;&#x81F3;&#x66F4;&#x77ED;&#x3002;</p><h4>&#x7F16;&#x8BD1;&#x7684;&#x6B65;&#x9AA4;</h4><ol><li>&#x8BCD;&#x6CD5;&#x5206;&#x6790;<br>&#x4EE5;var a = 2 &#x4E3A;&#x4F8B;&#xFF0C;&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#x4F1A;&#x5C06;&#x5176;&#x5206;&#x6210;&#x4E09;&#x4E2A;&#x6709;&#x610F;&#x4E49;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x5373;&#x8BCD;&#x6CD5;&#x5355;&#x5143;&#x3002;</li><li>&#x8BED;&#x6CD5;&#x5206;&#x6790;<br>&#x5C06;&#x8BCD;&#x6CD5;&#x5355;&#x5143;&#x7EC4;&#x5408;&#x751F;&#x6210;&#x4EE3;&#x8868;&#x4E86;&#x7A0B;&#x5E8F;&#x8BED;&#x6CD5;&#x7684;&#x7ED3;&#x6784;&#x7684;&#x6811;&#xFF0C;&#x5373;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x4E66;&#xFF08;AST&#xFF09;&#x3002;</li><li>&#x4EE3;&#x7801;&#x751F;&#x6210;<br>&#x5C06;AST&#x751F;&#x6210;&#x53EF;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5373;&#x5C06;AST&#x8F6C;&#x5316;&#x6210;&#x4E00;&#x7EC4;&#x673A;&#x5668;&#x6307;&#x4EE4;&#x3002;&#x200B;&#x200B;&#x200B;</li></ol><h2 id="articleHeader1">LHS RHS</h2><p>&#x5982;&#x679C;&#x67E5;&#x627E;&#x7684;&#x76EE;&#x7684;&#x662F;&#x5BF9;&#x53D8;&#x91CF;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4F1A;&#x4F7F;&#x7528; LHS &#x67E5;&#x8BE2;;&#x5982;&#x679C;&#x76EE;&#x7684;&#x662F;&#x83B7;&#x53D6;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x5C31;&#x4F1A;&#x4F7F;&#x7528; RHS &#x67E5;&#x8BE2;&#x3002;</p><h4>&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;</h4><p>&#x51B3;&#x5B9A;&#x4E8E;&#x4F60;&#x5728;&#x5199;&#x4EE3;&#x7801;&#x65F6;&#x7684;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;</p><h4>&#x4F18;&#x5316;</h4><p>&#x4F9D;&#x8D56;&#x4E8E;&#x8BCD;&#x6CD5;&#x7684;&#x9759;&#x6001;&#x5206;&#x6790;</p><h4>eval with &#x4F1A;&#x521B;&#x5EFA;&#x65B0;&#x7684;&#x4F5C;&#x7528;&#x57DF;</h4><p>&#x5728;&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#x9636;&#x6BB5;&#xFF0C;&#x65E0;&#x6CD5;&#x77E5;&#x9053;eval with&#x4F1A;&#x5BF9;&#x4F5C;&#x7528;&#x57DF;&#x505A;&#x600E;&#x6837;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x6B64;&#x65F6;&#x5F15;&#x64CE;&#x4E0D;&#x518D;&#x5BF9;&#x4F5C;&#x7528;&#x57DF;&#x8FDB;&#x884C;&#x4EFB;&#x4F55;&#x4F18;&#x5316;</p><h2 id="articleHeader2">&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;</h2><h4>&#x51FD;&#x6570;&#x58F0;&#x660E; &#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</h4><p>&#x533A;&#x5206;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x548C;&#x8868;&#x8FBE;&#x5F0F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x770B; function &#x5173;&#x952E;&#x5B57;&#x51FA;&#x73B0;&#x5728;&#x58F0;&#x660E;&#x4E2D;&#x7684;&#x4F4D;<br>&#x7F6E;(&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x662F;&#x6574;&#x4E2A;&#x58F0;&#x660E;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;)&#x3002;&#x5982;&#x679C; function &#x662F;&#x58F0;&#x660E;&#x4E2D;<br>&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x8BCD;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x58F0;&#x660E;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><h4>let</h4><ol><li>&#x9690;&#x5F0F;&#x7684;&#x751F;&#x6210;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;</li><li>&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;</li></ol><h2 id="articleHeader3">&#x63D0;&#x5347;</h2><h4>&#x539F;&#x56E0;</h4><p>&#x53D8;&#x91CF;&#xFF08;&#x5305;&#x62EC;&#x51FD;&#x6570;&#x5728;&#x5185;&#xFF09;&#x7684;&#x6240;&#x6709;&#x58F0;&#x660E;&#x90FD;&#x4F1A;&#x4F18;&#x5148;&#x6267;&#x884C;&#xFF0C;&#x53EA;&#x6709;&#x58F0;&#x660E;&#x672C;&#x8EAB;&#x4F1A;&#x63D0;&#x5347;&#xFF0C;&#x800C;&#x8D4B;&#x503C;&#x6216;&#x5176;&#x4ED6;&#x8FD0;&#x884C;&#x903B;&#x8F91;&#x4F1A;&#x7559;&#x5728;&#x539F;&#x4F4D;&#x7F6E;</p><h4>&#x8FC7;&#x7A0B;</h4><p>&#x8FD9;&#x610F;&#x5473;&#x7740;&#x65E0;&#x8BBA;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x7684;&#x58F0;&#x660E;&#x51FA;&#x73B0;&#x5728;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#xFF0C;&#x90FD;&#x5C06;&#x5728;&#x4EE3;&#x7801;&#x672C;&#x8EAB;&#x88AB;&#x6267;&#x884C;&#x524D;&#x9996;&#x5148;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;<br>&#x53EF;&#x4EE5;&#x5C06;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5F62;&#x8C61;&#x5730;&#x60F3;&#x8C61;&#x6210;&#x6240;&#x6709;&#x7684;&#x58F0;&#x660E;(&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;)&#x90FD;&#x4F1A;&#x88AB;&#x201C;&#x79FB;&#x52A8;&#x201D;&#x5230;&#x5404;&#x81EA;&#x4F5C;&#x7528;&#x57DF;&#x7684;<br>&#x6700;&#x9876;&#x7AEF;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x88AB;&#x79F0;&#x4E3A;&#x63D0;&#x5347;&#x3002;<br>&#x58F0;&#x660E;&#x672C;&#x8EAB;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x800C;&#x5305;&#x62EC;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8D4B;&#x503C;&#x5728;&#x5185;&#x7684;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#x5E76;&#x4E0D;&#x4F1A;&#x63D0;&#x5347;&#x3002;</p><h2 id="articleHeader4">&#x95ED;&#x5305;</h2><h4>&#x5B9A;&#x4E49;</h4><p>&#x5F53;&#x51FD;&#x6570;&#x80FD;&#x591F;&#x8BB0;&#x4F4F;&#x6216;&#x8BBF;&#x95EE;&#x6240;&#x5728;&#x7684;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x53CA;&#x65F6;&#x662F;&#x88AB;&#x4F5C;&#x7528;&#x57DF;&#x5916;&#x8C03;&#x7528;&#xFF0C;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x95ED;&#x5305;</p><h4>&#x6A21;&#x5757;</h4><ol><li>&#x73B0;&#x4EE3;&#x6A21;&#x5757;&#x673A;&#x5236;</li><li>&#x672A;&#x6765;&#x7684;&#x6A21;&#x5757;&#x673A;&#x5236;</li></ol><h2 id="articleHeader5">&#x5173;&#x4E8E;this</h2><h4>&#x7ED1;&#x5B9A;&#x65F6;&#x95F4;&#x70B9;</h4><p>&#x662F;&#x5728;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x65F6;&#x7ED1;&#x5B9A;&#x7684;&#xFF0C;&#x800C;&#x975E;&#x5B9A;&#x4E49;&#x65F6;&#x3002;&#x5B83;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x53D6;&#x51B3;&#x4E8E;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#x7684;&#x5404;&#x79CD;&#x6761;&#x4EF6;&#xFF0C;&#x548C;&#x5728;&#x54EA;&#x91CC;&#x5B9A;&#x4E49;&#x7684;&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x53EA;&#x53D6;&#x51B3;&#x4E8E;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x3002;</p><h4>&#x7ED1;&#x5B9A;&#x8FC7;&#x7A0B;</h4><p>&#x5F53;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#x91CC;&#x5305;&#x542B;&#x4E86;&#x51FD;&#x6570;&#x5728;&#x54EA;&#x91CC;&#x6CA1;&#x8C03;&#x7528;&#xFF08;&#x8C03;&#x7528;&#x6808;&#xFF09;&#xFF0C;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53C2;&#x6570;&#x7B49;&#x3002;this&#x4F5C;&#x4E3A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7528;&#x5230;&#x3002;</p><h4>&#x7ED1;&#x5B9A;&#x7C7B;&#x578B;</h4><ol><li><p>&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;<br>&#x5373;&#x7ED1;&#x5B9A;&#x5230;&#x5168;&#x5C40;&#xFF0C;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x56DE;&#x7ED1;&#x5B9A;&#x5230;undefined&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log( this.a );
}
var a = 2;
(function(){
  &quot;use strict&quot;;
   foo(); // 2
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
}
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">  &quot;use strict&quot;</span>;
   foo(); <span class="hljs-comment">// 2</span>
})()</code></pre></li><li><p>&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;<br>&#x5373;&#x7ED1;&#x5B9A;&#x5230;&#x6700;&#x9876;&#x5C42;&#xFF08;&#x6216;&#x6700;&#x8FD1;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#xFF09;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun() {
  console.log(this.a)
}
var obj2 = {
  a: 3,
 fun: fun,
}
var obj1 = {
  a: 2,
  obj2: obj2,
}
obj1.obj2.fun() // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span> {
  console.log(<span class="hljs-keyword">this</span>.a)
}
<span class="hljs-keyword">var</span> obj2 = {
  a: <span class="hljs-number">3</span>,
 <span class="hljs-function"><span class="hljs-keyword">fun</span>: <span class="hljs-keyword">fun</span>,</span>
}
<span class="hljs-keyword">var</span> obj1 = {
  a: <span class="hljs-number">2</span>,
  obj2: obj2,
}
obj1.obj2.<span class="hljs-keyword">fun</span>() <span class="hljs-comment">// 3</span></code></pre></li><li>&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;<br>&#x5373;&#x7528;call&#x6216;apply&#x624B;&#x52A8;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;</li><li>bind&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;</li><li><p>new&#x7ED1;&#x5B9A;&#xFF08;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;</p><ol><li>&#x4E0D;&#x5B58;&#x5728;<br>&#x5176;&#x5B9E;&#x5728;js&#x4E2D;&#x4E0D;&#x5B58;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x6240;&#x8BF4;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x666E;&#x901A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x7528;new&#x88AB;&#x201C;&#x6784;&#x9020;&#x8C03;&#x7528;&#x201D;&#x800C;&#x5DF2;&#x3002;</li><li><p>new&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;?</p><ol><li>&#x521B;&#x5EFA;(&#x6216;&#x8005;&#x8BF4;&#x6784;&#x9020;)&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x3002;</li><li>&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x6267;&#x884C;[[&#x539F;&#x578B;]]&#x8FDE;&#x63A5;&#x3002;</li><li>&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x4F1A;&#x7ED1;&#x5B9A;&#x5230;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;this&#x3002;</li><li>&#x5982;&#x679C;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;new&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4F1A;&#x81EA;&#x52A8;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x3002;</li></ol></li></ol></li><li>&#x7BAD;&#x5934;&#x51FD;&#x6570; =&gt;</li></ol><h2 id="articleHeader6">&#x5BF9;&#x8C61;</h2><h4>&#x5185;&#x7F6E;&#x5BF9;&#x8C61;</h4><p>&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x5728;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#xFF08;&#x6BD4;&#x5982;&#x8BF4;&#x83B7;&#x53D6;&#x957F;&#x5EA6;&#xFF09;&#xFF0C;&#x4F1A;&#x88AB;&#x5F15;&#x64CE;&#x9ED8;&#x8BA4;&#x8F6C;&#x6210;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;&#x800C;&#x8FDB;&#x884C;&#x65B9;&#x6CD5;&#x7684;&#x8C03;&#x7528;&#x3002;<br>&#x57FA;&#x7840;&#x7C7B;&#x578B;&#x5E76;&#x4E0D;&#x662F;&#x7EE7;&#x627F;&#x81EA;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#x200B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var strPrimitive = &quot;I am a string&quot;;
    typeof strPrimitive; // &quot;string&quot;
    strPrimitive instanceof String; // false
    var strObject = new String( &quot;I am a string&quot; );
    typeof strObject; // &quot;object&quot;
    strObject instanceof String; // true
    Object.prototype.toString.call( strObject ); // [object String] " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> strPrimitive = <span class="hljs-string">&quot;I am a string&quot;</span>;
    <span class="hljs-keyword">typeof</span> strPrimitive; <span class="hljs-comment">// &quot;string&quot;</span>
    strPrimitive <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>; <span class="hljs-comment">// false</span>
    <span class="hljs-keyword">var</span> strObject = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>( <span class="hljs-string">&quot;I am a string&quot;</span> );
    <span class="hljs-keyword">typeof</span> strObject; <span class="hljs-comment">// &quot;object&quot;</span>
    strObject <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>; <span class="hljs-comment">// true</span>
    <span class="hljs-built_in">Object</span>.prototype.toString.call( strObject ); <span class="hljs-comment">// [object String] </span></code></pre><h4>null</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof null === Object; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span> === <span class="hljs-built_in">Object</span>; </code></pre><p>&#x539F;&#x7406;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x5BF9;&#x8C61;&#x5728;&#x5E95;&#x5C42;&#x90FD;&#x8868;&#x793A;&#x4E3A;&#x4E8C;&#x8FDB;&#x5236;&#xFF0C;&#x5728; JavaScript &#x4E2D;&#x4E8C;&#x8FDB;&#x5236;&#x524D;&#x4E09;&#x4F4D;&#x90FD;&#x4E3A; 0 &#x7684;&#x8BDD;&#x4F1A;&#x88AB;&#x5224;<br>&#x65AD;&#x4E3A; object &#x7C7B;&#x578B;&#xFF0C;null &#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x8868;&#x793A;&#x662F;&#x5168; 0&#xFF0C;&#x81EA;&#x7136;&#x524D;&#x4E09;&#x4F4D;&#x4E5F;&#x662F; 0&#xFF0C;&#x6240;&#x4EE5;&#x6267;&#x884C; typeof &#x65F6;&#x4F1A;&#x8FD4;&#x56DE;&#x201C;object&#x201D;</p><h4>&#x62F7;&#x8D1D;</h4><ol><li>&#x6D45;&#x62F7;&#x8D1D;<br>Object.assign({}, obj)</li><li>&#x6DF1;&#x62F7;&#x8D1D;<br>JSON.stringify</li></ol><h4>&#x5C5E;&#x6027;&#x63CF;&#x8FF0;&#x7B26;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getOwnPropertyDescriptor(myObj, &apos;a&apos;)
defineProperty
Object.defineProperty(myObj, &apos;a&apos;, {
  value: 2,            
  &#x200B;writable: true,
  configurable: true, 
  enumerable: true 
&#x200B;})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">getOwnPropertyDescriptor(myObj,</span> <span class="hljs-string">&apos;a&apos;</span><span class="hljs-string">)</span>
<span class="hljs-string">defineProperty</span>
<span class="hljs-string">Object.defineProperty(myObj,</span> <span class="hljs-string">&apos;a&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>            
  <span class="hljs-string">&#x200B;writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> 
<span class="hljs-attr">  enumerable:</span> <span class="hljs-literal">true</span> 
<span class="hljs-string">&#x200B;})</span></code></pre><h4>Getter &#x3001;Setter</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  get a() {
    return this._a_
  },
  set a(val) {
   this._a_ = val * 5
  }
}
obj.a = 10
console.log(obj.a) // 50
&#x200B;
var obj2 = {}
Object.defineProperty(obj2, &apos;a&apos;, {
  get: function() {
    return this._a_
  },
  set: function(val) {
    this._a_ = val * 2
  }
})
obj2.a = 15
console.log(obj2.a) // 30" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-keyword">get</span> a() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._a_
  },
  <span class="hljs-keyword">set</span> a(<span class="hljs-keyword">val</span>) {
   <span class="hljs-keyword">this</span>._a_ = <span class="hljs-keyword">val</span> * <span class="hljs-number">5</span>
  }
}
obj.a = <span class="hljs-number">10</span>
console.log(obj.a) <span class="hljs-comment">// 50</span>
&#x200B;
<span class="hljs-keyword">var</span> obj2 = {}
Object.defineProperty(obj2, <span class="hljs-string">&apos;a&apos;</span>, {
  <span class="hljs-keyword">get</span>: function() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._a_
  },
  <span class="hljs-keyword">set</span>: function(<span class="hljs-keyword">val</span>) {
    <span class="hljs-keyword">this</span>._a_ = <span class="hljs-keyword">val</span> * <span class="hljs-number">2</span>
  }
})
obj2.a = <span class="hljs-number">15</span>
console.log(obj2.a) <span class="hljs-comment">// 30</span></code></pre><h4>&#x5B58;&#x5728;&#x6027;</h4><ol><li>in<br>&apos;a&apos; in obj1 &#x4F1A;&#x68C0;&#x67E5;obj&#x53CA;&#x5176;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x662F;&#x5426;&#x6709;&apos;a&apos;</li><li>hasOwnProperty<br>&#x4E0D;&#x4F1A;&#x68C0;&#x67E5;&#x539F;&#x578B;&#x94FE;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x53EF;&#x4EE5;Object.prototype.hasOwnProperty.call(myObj, &apos;a&apos;)</li></ol><h2 id="articleHeader7">&#x539F;&#x578B;&#xFF08;prototype)</h2><h4>constructor</h4><p>&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;O&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF08;&#x7684;&#x5F15;&#x7528;&#xFF09;&#x3002;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;prototype&#x5BF9;&#x8C61;&#x90FD;&#x6709;&#x4E00;&#x4E2A;constructor&#x5C5E;&#x6027;&#xFF0C;&#x6307;&#x5411;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E5F;&#x6709;&#x4E00;&#x4E2A;constructor&#x5C5E;&#x6027;&#xFF0C;&#x9ED8;&#x8BA4;&#x8C03;&#x7528;prototype&#x5BF9;&#x8C61;&#x7684;constructor&#x5C5E;&#x6027;&#x200B;<br>&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Test() {
  this.name = &apos;test&apos;
}
var test = new Test()
console.log(test.constructor === Test) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;test&apos;</span>
}
<span class="hljs-keyword">var</span> test = <span class="hljs-keyword">new</span> Test()
<span class="hljs-built_in">console</span>.log(test.constructor === Test) <span class="hljs-comment">// true</span></code></pre><h4>&#x7C7B;constructor</h4><p>&#x6784;&#x9020;&#x51FD;&#x6570; constructor &#x662F;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x548C;&#x521D;&#x59CB;&#x5316;&#x7C7B;&#x4E2D;&#x521B;&#x5EFA;&#x7684;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x65B9;&#x6CD5;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Polygon {
    constructor() {
        this.name = &quot;Polygon&quot;;
    }
}
class Square extends Polygon {
    constructor() {
        super();
    }
}
class Rectangle {}
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true
let newInstance = new Square();
console.log(newInstance.name); //Polygon&#x200B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Polygon</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;Polygon&quot;</span>;
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Square</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Polygon</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rectangle</span> </span>{}
<span class="hljs-built_in">Object</span>.setPrototypeOf(Square.prototype, Rectangle.prototype);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(Square.prototype) === Polygon.prototype); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(Square.prototype) === Rectangle.prototype); <span class="hljs-comment">//true</span>
<span class="hljs-keyword">let</span> newInstance = <span class="hljs-keyword">new</span> Square();
<span class="hljs-built_in">console</span>.log(newInstance.name); <span class="hljs-comment">//Polygon&#x200B;</span></code></pre><h4><strong>proto</strong></h4><p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;__proto__&#x6307;&#x5411;&#x751F;&#x6210;&#x6539;&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;<br>&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|function Test() {
  this.name = &apos;test&apos;
}
Test.prototype = {
  color: &apos;red&apos;
}
var test = new Test()
console.log(test.__proto__ === Test.prototype) // true
console.log(test.__proto__)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>|function <span class="hljs-keyword">Test</span>() {
  this.name = &apos;<span class="hljs-keyword">test</span>&apos;
}
<span class="hljs-keyword">Test</span>.prototype = {
  color: &apos;red&apos;
}
<span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span> = new <span class="hljs-keyword">Test</span>()
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>.__proto__ === <span class="hljs-keyword">Test</span>.prototype) <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>.__proto__)</code></pre><h4>Object.create</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
something: function() {
  console.log( &quot;Tell me something good...&quot; );
}
};
var bar = Object.create( foo ); 
bar.something(); // Tell me something good...
Object.create(..) &#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;(bar)&#x5E76;&#x628A;&#x5B83;&#x5173;&#x8054;&#x5230;&#x6211;&#x4EEC;&#x6307;&#x5B9A;&#x7684;&#x5BF9;&#x8C61;(foo)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = {
<span class="hljs-attr">something</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-string">&quot;Tell me something good...&quot;</span> );
}
};
<span class="hljs-keyword">var</span> bar = <span class="hljs-built_in">Object</span>.create( foo ); 
bar.something(); <span class="hljs-comment">// Tell me something good...</span>
<span class="hljs-built_in">Object</span>.create(..) &#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;(bar)&#x5E76;&#x628A;&#x5B83;&#x5173;&#x8054;&#x5230;&#x6211;&#x4EEC;&#x6307;&#x5B9A;&#x7684;&#x5BF9;&#x8C61;(foo)</code></pre><p>&#x8FD9;&#x6837; &#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5145;&#x5206;&#x53D1;&#x6325; [[Prototype]]<br>&#x673A;&#x5236;&#x7684;&#x5A01;&#x529B;(&#x59D4;&#x6258;)&#x5E76;&#x4E14;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x9EBB;&#x70E6;<br>(&#x6BD4;&#x5982;&#x4F7F; &#x7528; new &#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4F1A;&#x751F;&#x6210; .prototype &#x548C; .constructor &#x5F15;&#x7528;)&#x3002;<br>&#x200B;</p><h2 id="articleHeader8">&#x7EE7;&#x627F;</h2><h4>&#x539F;&#x578B;&#x7EE7;&#x627F;</h4><p>&#x7F3A;&#x70B9;<br>&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x4F1A;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5F15;&#x7528;<br>&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
  this.names = [1, 2, 3]
}
function Child() {
  
}
Child.prototype = new Parent()
var child1 = new Child()
var child2 = new Child()
child1.names.push(4)
console.log(child1.names) // [1,2, 3,4]
console.log(child2.names) // [1,2, 3,4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.names = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params"></span>) </span>{
  
}
Child.prototype = <span class="hljs-keyword">new</span> Parent()
<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child()
<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child()
child1.names.push(<span class="hljs-number">4</span>)
<span class="hljs-built_in">console</span>.log(child1.names) <span class="hljs-comment">// [1,2, 3,4]</span>
<span class="hljs-built_in">console</span>.log(child2.names) <span class="hljs-comment">// [1,2, 3,4]</span></code></pre><h4>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</h4><p>&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
  this.names = [1, 2, 3]
  this.getName = function () {
    console.log(this.name)
  }
}
function Child() {
  Parent.call(this)
}
var child1 = new Child()
var child2 = new Child()
child1.names.push(4)
console.log(child1.names)
console.log(child2.names)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.names = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
  <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params"></span>) </span>{
  Parent.call(<span class="hljs-keyword">this</span>)
}
<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child()
<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child()
child1.names.push(<span class="hljs-number">4</span>)
<span class="hljs-built_in">console</span>.log(child1.names)
<span class="hljs-built_in">console</span>.log(child2.names)</code></pre><p>&#x7F3A;&#x70B9;<br>&#x6BCF;&#x4E2A;&#x5B50;&#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x5B9E;&#x4F8B;&#x5316;&#x65B9;&#x6CD5;&#x4E00;&#x6B21;&#xFF0C;&#x5185;&#x5B58;&#x7206;&#x70B8;</p><h4>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#xFF08;&#x6700;&#x5E38;&#x7528;&#xFF09;</h4><p>&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
  this.names = [1, 2, 3]
}
Parent.prototype.getName = function () {
  console.log(this.names)
}
function Child() {
  Parent.call(this)
}
Child.prototype = new Parent()
var child1 = new Child()
var child2 = new Child()
child1.names.push(4)
child1.getName()
child2.getName()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.names = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
}
Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.names)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params"></span>) </span>{
  Parent.call(<span class="hljs-keyword">this</span>)
}
Child.prototype = <span class="hljs-keyword">new</span> Parent()
<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child()
<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child()
child1.names.push(<span class="hljs-number">4</span>)
child1.getName()
child2.getName()</code></pre><p>&#x7F3A;&#x70B9;</p><ol><li>&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x4E0A;&#x6709;&#x4E00;&#x4EFD;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4E8C;&#x8005;&#x91CD;&#x590D;&#x9020;&#x6210;&#x5185;&#x5B58;&#x6D6A;&#x8D39;</li><li>&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x4E86;&#x4E24;&#x6B21;&#x200B;</li></ol><h4>&#x5BC4;&#x751F;&#x5F0F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h4><p>&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
  this.names = [1, 2, 3]
}
Parent.prototype.getName = function () {
  console.log(this.names)
}
function Child() {
  Parent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
var child1 = new Child()
var child2 = new Child()
child1.names.push(4)
child1.getName()
child2.getName()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.names = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
}
Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.names)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params"></span>) </span>{
  Parent.call(<span class="hljs-keyword">this</span>)
}
Child.prototype = <span class="hljs-built_in">Object</span>.create(Parent.prototype)
<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child()
<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child()
child1.names.push(<span class="hljs-number">4</span>)
child1.getName()
child2.getName()</code></pre><p>&#x4F18;&#x70B9;<br>&#x5C5E;&#x6027;&#x4E0D;&#x4F1A;&#x518D;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x91CD;&#x590D;</p><h2 id="articleHeader9">&#x884C;&#x4E3A;&#x59D4;&#x6258;</h2><p>js&#x4E2D;&#x7684;&#x7EE7;&#x627F;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5728;&#x5BF9;&#x8C61;&#x95F4;&#x5EFA;&#x7ACB;&#x5173;&#x8054;&#x5173;&#x7CFB;&#xFF0C;&#x800C;&#x884C;&#x4E3A;&#x59D4;&#x6258;&#x5C31;&#x662F;&#x5EFA;&#x7ACB;&#x8FD9;&#x79CD;&#x5173;&#x8054;&#x5173;&#x7CFB;&#x7684;&#x7EBD;&#x5E26;&#x3002;</p><h4>(&quot;&#x539F;&#x578B;&quot;)&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x98CE;&#x683C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function () {
  return &quot;I am&quot; + this.me;
};
function Bar(who) {
  Foo.call(this,who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function () {
  alert(&quot;Hello,&quot; + this.identify() + &apos;.&apos;);
};
var b1 = new Bar(&quot;b1&quot;);
var b2 = new Bar(&quot;b2&quot;);
b1.speak();
b2.speak();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params">who</span>) </span>{
  <span class="hljs-keyword">this</span>.me = who;
}
Foo.prototype.identify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;I am&quot;</span> + <span class="hljs-keyword">this</span>.me;
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Bar</span>(<span class="hljs-params">who</span>) </span>{
  Foo.call(<span class="hljs-keyword">this</span>,who);
}
Bar.prototype = <span class="hljs-built_in">Object</span>.create(Foo.prototype);
Bar.prototype.speak = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  alert(<span class="hljs-string">&quot;Hello,&quot;</span> + <span class="hljs-keyword">this</span>.identify() + <span class="hljs-string">&apos;.&apos;</span>);
};
<span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> Bar(<span class="hljs-string">&quot;b1&quot;</span>);
<span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> Bar(<span class="hljs-string">&quot;b2&quot;</span>);
b1.speak();
b2.speak();</code></pre><h4>&#x5BF9;&#x8C61;&#x5173;&#x8054;&#x98CE;&#x683C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo = {
  init:function (who) {
    this.me = who;
  },
  identify:function () {
    return &quot;I am&quot; + this.name
  }
};
Bar = Object.create(Foo);
Bar.speak = function () {
  alert(&quot;hello,&quot; + this.identify() + &apos;.&apos;);
};
var b3 = Object.create(Bar);
b3.init(&quot;b3&quot;);
var b4 = Object.create(Bar);
b4.init(&quot;b4&quot;);
b1.speak();
b2.speak();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>Foo = {
  <span class="hljs-attr">init</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">who</span>) </span>{
    <span class="hljs-keyword">this</span>.me = who;
  },
  <span class="hljs-attr">identify</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;I am&quot;</span> + <span class="hljs-keyword">this</span>.name
  }
};
Bar = <span class="hljs-built_in">Object</span>.create(Foo);
Bar.speak = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  alert(<span class="hljs-string">&quot;hello,&quot;</span> + <span class="hljs-keyword">this</span>.identify() + <span class="hljs-string">&apos;.&apos;</span>);
};
<span class="hljs-keyword">var</span> b3 = <span class="hljs-built_in">Object</span>.create(Bar);
b3.init(<span class="hljs-string">&quot;b3&quot;</span>);
<span class="hljs-keyword">var</span> b4 = <span class="hljs-built_in">Object</span>.create(Bar);
b4.init(<span class="hljs-string">&quot;b4&quot;</span>);
b1.speak();
b2.speak();</code></pre><p>&#x200B;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《你不知道的JS上》笔记

## 原文链接
[https://segmentfault.com/a/1190000016297759](https://segmentfault.com/a/1190000016297759)

